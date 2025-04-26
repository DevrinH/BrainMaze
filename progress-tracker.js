document.addEventListener("DOMContentLoaded", () => {
    let isUpdating = false;
    let progressUpdatedByMainScript = false;

    function updateProgress(source) {
        if (progressUpdatedByMainScript) {
            console.log("Progress already updated by main script, skipping progress-tracker.js update.");
            return;
        }

        if (isUpdating) {
            console.log(`updateProgress skipped (already running) from: ${source}`);
            return;
        }
        isUpdating = true;

        console.log(`updateProgress called from: ${source}`);

        // Define exam types and their configurations
        const examConfigs = {
            "ACT": {
                sectionId: "line-chart-act",
                progressContainerId: "act-progress-container",
                testResultsKey: "actTestResults",
                progressKey: "actProgress",
                historicalProgressKey: "actHistoricalProgress"
            },
            "SAT": {
                sectionId: "line-chart-sat",
                progressContainerId: "sat-progress-container",
                testResultsKey: "satTestResults",
                progressKey: "satProgress",
                historicalProgressKey: "satHistoricalProgress"
            }
            // GED will be added later
        };

        // Process each exam type
        Object.keys(examConfigs).forEach(examType => {
            const config = examConfigs[examType];
            console.log(`Processing ${examType} progress...`);

            // Load test results and progress data
            let storedResults = localStorage.getItem(config.testResultsKey);
            console.log(`Retrieved ${examType} testResults from localStorage:`, storedResults);

            let results = storedResults ? JSON.parse(storedResults) : {};
            console.log(`Parsed ${examType} testResults:`, results);
            console.log(`All ${examType} categories and their scores:`, JSON.stringify(results, null, 2));

            // Check if the section is active
            const section = document.querySelector(`#${config.sectionId}`);
            const isSectionActive = section && !section.classList.contains("hidden");
            console.log(`${examType} section element:`, section);
            console.log(`Is ${examType} section active?`, isSectionActive);

            if (!isSectionActive) {
                console.log(`${examType} section is not active, skipping ${examType} progress container update.`);
                return;
            }

            const progressItems = document.querySelectorAll(`#${config.progressContainerId} .progress-item`);
            console.log(`Found ${examType} progress items:`, progressItems.length);

            let historicalProgress = JSON.parse(localStorage.getItem(config.historicalProgressKey)) || {};
            let storedProgress = JSON.parse(localStorage.getItem(config.progressKey)) || {};

            // Initialize historicalProgress and storedProgress for all categories
            progressItems.forEach(item => {
                const category = item.dataset.category;
                if (!historicalProgress[category]) {
                    historicalProgress[category] = { percentage: 0 };
                }
                if (!storedProgress[category]) {
                    storedProgress[category] = { correct: 0, incorrect: 0 };
                }
            });
            console.log(`Loaded ${examType} historicalProgress before update:`, historicalProgress);
            console.log(`Loaded ${examType} progress before update:`, storedProgress);

            // Accumulate test results into storedProgress
            Object.keys(results).forEach(category => {
                if (!storedProgress[category]) {
                    storedProgress[category] = { correct: 0, incorrect: 0 };
                }
                storedProgress[category].correct += Number(results[category]?.correct || 0);
                storedProgress[category].incorrect += Number(results[category]?.incorrect || 0);
                console.log(`Category: ${category}, Updated ${examType} progress - Correct: ${storedProgress[category].correct}, Incorrect: ${storedProgress[category].incorrect}`);
            });

            // Save updated progress
            localStorage.setItem(config.progressKey, JSON.stringify(storedProgress));
            console.log(`Updated ${examType} progress:`, storedProgress);

            let newProgress = {};

            progressItems.forEach(item => {
                const category = item.dataset.category;
                console.log(`Processing ${examType} category: ${category}`);

                const bar = document.getElementById(`${category}-bar`);
                const text = document.getElementById(`${category}-text`);
                console.log(`Bar element for ${category}:`, bar);
                console.log(`Text element for ${category}:`, text);

                let percentage = 0;
                if (storedProgress[category]) {
                    const { correct, incorrect } = storedProgress[category];
                    console.log(`Category ${category} stats - Correct: ${correct}, Incorrect: ${incorrect}`);

                    const total = correct + incorrect;
                    percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
                    console.log(`Calculated percentage for ${category}: ${percentage}%`);
                } else {
                    console.log(`No data found for ${examType} category ${category}`);
                }

                newProgress[category] = { percentage };

                if (bar) {
                    bar.style.width = `${percentage}%`;
                } else {
                    console.warn(`Bar element not found for ${category}`);
                }

                if (text) {
                    let previousPercentage = Number(historicalProgress[category]?.percentage) || 0;
                    console.log(`${examType} Category: ${category}, Previous Percentage: ${previousPercentage}, Current Percentage: ${percentage}`);

                    let arrow = "→";
                    let arrowColor = "#4e5163";

                    if (percentage > previousPercentage) {
                        arrow = "↑";
                        arrowColor = "green";
                        console.log(`${examType} Category: ${category}, Arrow Set to ↑ (Increased)`);
                    } else if (percentage < previousPercentage) {
                        arrow = "↓";
                        arrowColor = "red";
                        console.log(`${examType} Category: ${category}, Arrow Set to ↓ (Decreased)`);
                    } else {
                        console.log(`${examType} Category: ${category}, Arrow Set to → (No Change)`);
                    }

                    text.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                    text.offsetHeight;
                } else {
                    console.warn(`Text element not found for ${category}`);
                }
                console.log(`Updated ${examType} ${category} - Bar width: ${bar?.style.width || "not found"}, Text: ${text?.innerHTML || "not found"}`);
            });

            console.log(`Saving ${examType} historicalProgress:`, newProgress);
            localStorage.setItem(config.historicalProgressKey, JSON.stringify(newProgress));
            console.log(`Updated ${examType} historicalProgress:`, JSON.parse(localStorage.getItem(config.historicalProgressKey)));

            const progressContainer = document.getElementById(config.progressContainerId);
            if (progressContainer) {
                progressContainer.classList.remove("hidden");
                console.log(`${examType} progress container made visible in ${examType} section`);
            } else {
                console.error(`${examType} progress container not found`);
            }
        });

        isUpdating = false;
    }

    updateProgress("DOMContentLoaded");

    window.addEventListener("testSubmitted", () => {
        console.log("Test submitted, updating progress...");
        updateProgress("testSubmitted");
    });

    document.querySelectorAll(".button-30").forEach(button => {
        button.addEventListener("click", () => {
            setTimeout(() => {
                const actSection = document.querySelector("#line-chart-act");
                const satSection = document.querySelector("#line-chart-sat");
                const isActSectionActive = actSection && !actSection.classList.contains("hidden");
                const isSatSectionActive = satSection && !satSection.classList.contains("hidden");
                console.log("Button clicked - Is ACT section active?", isActSectionActive);
                console.log("Button clicked - Is SAT section active?", isSatSectionActive);

                if (isActSectionActive || isSatSectionActive) {
                    updateProgress("tabSwitch");
                }
            }, 100);
        });
    });
});