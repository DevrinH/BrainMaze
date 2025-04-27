document.addEventListener("DOMContentLoaded", () => {
    function updateProgress(source) {
        console.log(`updateProgress called from: ${source}`);

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

    // Commented out to avoid conflicts with user-profile.html
    /*
    document.addEventListener("DOMContentLoaded", () => updateProgress("DOMContentLoaded"));

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
    */
});