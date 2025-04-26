document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired. Script is running...");

    // Function to update progress bars and arrows for both ACT and SAT
    let progressUpdatedByMainScript = false;

    function updateProgress() {
        if (progressUpdatedByMainScript) {
            console.log("Progress already updated by main script, skipping progress-tracker.js update.");
            return;
        }

        console.log("updateProgress called from: DOMContentLoaded");

        // Process ACT progress
        let actTestResults = localStorage.getItem("actTestResults");
        console.log("Retrieved actTestResults from localStorage:", actTestResults);

        let parsedActResults = actTestResults ? JSON.parse(actTestResults) : {};
        console.log("Parsed actTestResults:", parsedActResults);
        console.log("All ACT categories and their scores:", parsedActResults);

        let actSection = document.getElementById("line-chart-act");
        console.log("ACT section element:", actSection);
        console.log("Is ACT section active?", actSection && !actSection.classList.contains("hidden"));

        if (actSection && !actSection.classList.contains("hidden")) {
            let progressItems = actSection.querySelectorAll(".progress-item");
            console.log("Found ACT progress items:", progressItems.length);

            let historicalProgress = JSON.parse(localStorage.getItem("actHistoricalProgress")) || {};
            let actProgress = JSON.parse(localStorage.getItem("actProgress")) || {};
            console.log("Loaded actHistoricalProgress before update:", historicalProgress);
            console.log("Loaded actProgress before update:", actProgress);

            // Accumulate ACT test results into actProgress
            Object.keys(parsedActResults).forEach(category => {
                if (!actProgress[category]) {
                    actProgress[category] = { correct: 0, incorrect: 0 };
                }
                actProgress[category].correct += Number(parsedActResults[category]?.correct || 0);
                actProgress[category].incorrect += Number(parsedActResults[category]?.incorrect || 0);
                console.log(`Category: ${category}, Updated ACT progress - Correct: ${actProgress[category].correct}, Incorrect: ${actProgress[category].incorrect}`);
            });

            localStorage.setItem("actProgress", JSON.stringify(actProgress));
            console.log("Updated actProgress:", actProgress);

            // Clear actTestResults after processing to prevent double-counting
            localStorage.removeItem("actTestResults");
            console.log("Cleared actTestResults from localStorage");

            progressItems.forEach(item => {
                let category = item.querySelector(".progress-label").textContent.toLowerCase().replace(/\s+/g, "-");
                console.log("Processing ACT category:", category);

                let progressBarElement = document.getElementById(`${category}-bar`);
                let progressTextElement = document.getElementById(`${category}-text`);
                console.log(`Bar element for ${category}:`, progressBarElement);
                console.log(`Text element for ${category}:`, progressTextElement);

                let categoryData = parsedActResults[category] || actProgress[category] || { correct: 0, incorrect: 0 };
                let total = categoryData.correct + categoryData.incorrect;
                let percentage = total > 0 ? Math.round((categoryData.correct / total) * 100) : 0;

                if (!categoryData) {
                    console.log(`No data found for category ${category}`);
                }

                if (progressBarElement) {
                    progressBarElement.style.width = `${percentage}%`;
                } else {
                    console.warn(`Progress bar element not found for category ${category}. Expected ID: ${category}-bar`);
                }

                if (progressTextElement) {
                    let previousPercentage = historicalProgress[category]?.percentage || 0;
                    console.log(`ACT Category: ${category}, Previous Percentage: ${previousPercentage}, Current Percentage: ${percentage}`);

                    let arrow = "→";
                    let increased = percentage > previousPercentage;
                    let decreased = percentage < previousPercentage;
                    if (increased) {
                        arrow = "↑";
                    } else if (decreased) {
                        arrow = "↓";
                    }

                    if (increased) {
                        console.log(`ACT Category: ${category}, Arrow Set to ↑ (Increased)`);
                    } else if (decreased) {
                        console.log(`ACT Category: ${category}, Arrow Set to ↓ (Decreased)`);
                    } else {
                        console.log(`ACT Category: ${category}, Arrow Set to → (No Change)`);
                    }

                    let arrowColor = increased ? "green" : decreased ? "red" : "#4e5163";
                    progressTextElement.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                    console.log(`Updated ACT ${category} - Bar width: ${percentage}%, Text: ${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`);
                } else {
                    console.log(`Text element not found for ${category}`);
                }

                historicalProgress[category] = { percentage };
            });

            console.log("Saving actHistoricalProgress:", historicalProgress);
            localStorage.setItem("actHistoricalProgress", JSON.stringify(historicalProgress));
            console.log("Updated actHistoricalProgress:", historicalProgress);

            actSection.style.display = "block";
            console.log("ACT progress container made visible in ACT section");
        }

        // Process SAT progress
        let satTestResults = localStorage.getItem("satTestResults");
        console.log("Retrieved satTestResults from localStorage:", satTestResults);

        let parsedSatResults = satTestResults ? JSON.parse(satTestResults) : {};
        console.log("Parsed satTestResults:", parsedSatResults);
        console.log("All SAT categories and their scores:", parsedSatResults);

        let satSection = document.getElementById("line-chart-sat");
        console.log("SAT section element:", satSection);
        console.log("Is SAT section active?", satSection && !satSection.classList.contains("hidden"));

        if (satSection && !satSection.classList.contains("hidden")) {
            let progressItems = satSection.querySelectorAll(".progress-item");
            console.log("Found SAT progress items:", progressItems.length);

            let historicalProgress = JSON.parse(localStorage.getItem("satHistoricalProgress")) || {};
            let satProgress = JSON.parse(localStorage.getItem("satProgress")) || {};
            console.log("Loaded satHistoricalProgress before update:", historicalProgress);
            console.log("Loaded satProgress before update:", satProgress);

            // Accumulate SAT test results into satProgress
            Object.keys(parsedSatResults).forEach(category => {
                if (!satProgress[category]) {
                    satProgress[category] = { correct: 0, incorrect: 0 };
                }
                satProgress[category].correct += Number(parsedSatResults[category]?.correct || 0);
                satProgress[category].incorrect += Number(parsedSatResults[category]?.incorrect || 0);
                console.log(`Category: ${category}, Updated SAT progress - Correct: ${satProgress[category].correct}, Incorrect: ${satProgress[category].incorrect}`);
            });

            localStorage.setItem("satProgress", JSON.stringify(satProgress));
            console.log("Updated satProgress:", satProgress);

            // Clear satTestResults after processing to prevent double-counting
            localStorage.removeItem("satTestResults");
            console.log("Cleared satTestResults from localStorage");

            progressItems.forEach(item => {
                let category = item.querySelector(".progress-label").textContent.toLowerCase().replace(/\s+/g, "-");
                console.log("Processing SAT category:", category);

                let progressBarElement = document.getElementById(`${category}-bar`);
                let progressTextElement = document.getElementById(`${category}-text`);
                console.log(`Bar element for ${category}:`, progressBarElement);
                console.log(`Text element for ${category}:`, progressTextElement);

                let categoryData = parsedSatResults[category] || satProgress[category] || { correct: 0, incorrect: 0 };
                let total = categoryData.correct + categoryData.incorrect;
                let percentage = total > 0 ? Math.round((categoryData.correct / total) * 100) : 0;

                if (!categoryData) {
                    console.log(`No data found for category ${category}`);
                }

                if (progressBarElement) {
                    progressBarElement.style.width = `${percentage}%`;
                } else {
                    console.warn(`Progress bar element not found for category ${category}. Expected ID: ${category}-bar`);
                }

                if (progressTextElement) {
                    let previousPercentage = historicalProgress[category]?.percentage || 0;
                    console.log(`SAT Category: ${category}, Previous Percentage: ${previousPercentage}, Current Percentage: ${percentage}`);

                    let arrow = "→";
                    let increased = percentage > previousPercentage;
                    let decreased = percentage < previousPercentage;
                    if (increased) {
                        arrow = "↑";
                    } else if (decreased) {
                        arrow = "↓";
                    }

                    if (increased) {
                        console.log(`SAT Category: ${category}, Arrow Set to ↑ (Increased)`);
                    } else if (decreased) {
                        console.log(`SAT Category: ${category}, Arrow Set to ↓ (Decreased)`);
                    } else {
                        console.log(`SAT Category: ${category}, Arrow Set to → (No Change)`);
                    }

                    let arrowColor = increased ? "green" : decreased ? "red" : "#4e5163";
                    progressTextElement.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                    console.log(`Updated SAT ${category} - Bar width: ${percentage}%, Text: ${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`);
                } else {
                    console.log(`Text element not found for ${category}`);
                }

                historicalProgress[category] = { percentage };
            });

            console.log("Saving satHistoricalProgress:", historicalProgress);
            localStorage.setItem("satHistoricalProgress", JSON.stringify(historicalProgress));
            console.log("Updated satHistoricalProgress:", historicalProgress);

            satSection.style.display = "block";
            console.log("SAT progress container made visible in SAT section");
        }
    }

    document.addEventListener("DOMContentLoaded", updateProgress);

    // Check last activity and show the corresponding exam
    function showLastExam() {
        const lastActivity = JSON.parse(localStorage.getItem("lastActivity"));
        let activeExam = "line-chart-sat"; // Default to SAT

        if (lastActivity && lastActivity.exam) {
            switch (lastActivity.exam) {
                case "SAT":
                    showSAT();
                    activeExam = "line-chart-sat";
                    break;
                case "ACT":
                    showACT();
                    activeExam = "line-chart-act";
                    break;
                case "GED":
                    showGED();
                    activeExam = "line-chart-ged";
                    break;
                default:
                    showSAT();
            }
            if (lastActivity.type === "test") {
                showTests();
            } else if (lastActivity.type === "lesson") {
                showLessons();
            }
        } else {
            showSAT();
        }
        return activeExam;
    }

    // Run showLastExam
    const activeExam = showLastExam();
    console.log("Active Exam after showLastExam:", activeExam);

    // Add event listeners for tab switching
    document.getElementById("act-tab").addEventListener("click", function() {
        console.log("ACT tab clicked");
        document.getElementById("line-chart-act").classList.remove("hidden");
        document.getElementById("line-chart-sat").classList.add("hidden");
        updateProgress();
    });

    document.getElementById("sat-tab").addEventListener("click", function() {
        console.log("SAT tab clicked");
        document.getElementById("line-chart-sat").classList.remove("hidden");
        document.getElementById("line-chart-act").classList.add("hidden");
        updateProgress();
    });
});