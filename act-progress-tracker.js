document.addEventListener("DOMContentLoaded", () => {
    // Define categories for ACT and SAT
    const actCategories = [
        "act-conventions-of-standard-english",
        "act-knowledge-of-language",
        "act-production-of-writing",
        "act-algebra",
        "act-functions",
        "act-coordinate-geometry",
        "act-data-representation",
        "act-research-summary",
        "act-conflicting-viewpoints"
    ];

    const satCategories = [
        "algebra",
        "geometry",
        "data-analysis",
        "reading-comprehension",
        "vocabulary"
    ];

    // Function to update progress bars for a given exam type
    function updateProgressBars(examType, progressKey, categories) {
        console.log(`Updating ${examType} progress bars...`);

        let previousProgress = JSON.parse(localStorage.getItem("previousTestResults")) || {};
        let storedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
        let currentTestResults = JSON.parse(localStorage.getItem("testResults")) || {};

        console.log(`${examType} Previous Progress:`, previousProgress);
        console.log(`${examType} Stored Progress:`, storedProgress);
        console.log(`${examType} Current Test Results:`, currentTestResults);

        // Initialize storedProgress for all categories if not present
        categories.forEach(category => {
            if (!storedProgress[category]) {
                storedProgress[category] = { correct: 0, incorrect: 0 };
            }
        });

        // Accumulate new test results into storedProgress (already done in act-timed-test.js, but kept for consistency)
        Object.keys(currentTestResults).forEach(category => {
            if (categories.includes(category)) {
                let newCorrect = Number(currentTestResults[category]?.correct || 0);
                let newIncorrect = Number(currentTestResults[category]?.incorrect || 0);
                storedProgress[category].correct += newCorrect;
                storedProgress[category].incorrect += newIncorrect;
            }
        });

        localStorage.setItem(progressKey, JSON.stringify(storedProgress));
        console.log(`${examType} Updated Stored Progress:`, storedProgress);

        let updatedPreviousProgress = { ...previousProgress };
        categories.forEach(category => {
            const correct = storedProgress[category]?.correct || 0;
            const incorrect = storedProgress[category]?.incorrect || 0;
            const total = correct + incorrect;
            const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

            const progressBar = document.getElementById(`${category}-bar`);
            const progressText = document.getElementById(`${category}-text`);

            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
            } else {
                console.warn(`${examType} Progress bar not found: ${category}-bar`);
            }

            if (progressText) {
                let previousPercentage = Number(previousProgress[category]?.percentage || 0);
                let arrow = "→";
                let arrowColor = "#4e5163";

                if (total > 0) {
                    if (previousPercentage === 0 && percentage > 0) {
                        arrow = "↑"; // First test with data
                        arrowColor = "green";
                    } else if (percentage > previousPercentage) {
                        arrow = "↑";
                        arrowColor = "green";
                    } else if (percentage < previousPercentage) {
                        arrow = "↓";
                        arrowColor = "red";
                    }
                }

                progressText.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                console.log(`Updated ${category} - Percentage: ${percentage}%, Previous: ${previousPercentage}%, Arrow: ${arrow}`);
            } else {
                console.warn(`${examType} Progress text not found: ${category}-text`);
            }

            updatedPreviousProgress[category] = { percentage };
        });

        localStorage.setItem("previousTestResults", JSON.stringify(updatedPreviousProgress));
        console.log(`${examType} Updated Previous Progress:`, updatedPreviousProgress);

        localStorage.removeItem("testResults");
    }

    // Function to check and update progress based on active section
    function updateActiveSectionProgress() {
        const actSection = document.querySelector("#line-chart-act");
        const satSection = document.querySelector("#line-chart-sat");

        const isActSectionActive = actSection && !actSection.classList.contains("hidden");
        const isSatSectionActive = satSection && !satSection.classList.contains("hidden");

        console.log("Is ACT section active?", isActSectionActive);
        console.log("Is SAT section active?", isSatSectionActive);

        if (isActSectionActive) {
            updateProgressBars("ACT", "actProgress", actCategories);
            const actProgressContainer = document.getElementById("act-progress-container");
            if (actProgressContainer) {
                actProgressContainer.classList.remove("hidden");
                console.log("ACT progress container made visible");
            }
        }

        if (isSatSectionActive) {
            updateProgressBars("SAT", "satProgress", satCategories);
            const satProgressContainer = document.getElementById("sat-progress-container");
            if (satProgressContainer) {
                satProgressContainer.classList.remove("hidden");
                console.log("SAT progress container made visible");
            }
        }
    }

    // Initial update on page load
    updateActiveSectionProgress();

    // Listen for tab switches (GED/SAT/ACT buttons)
    document.querySelectorAll(".button-30").forEach(button => {
        button.addEventListener("click", () => {
            console.log("Tab switched - Checking active section...");
            setTimeout(() => {
                updateActiveSectionProgress();
            }, 100); // Delay to ensure DOM updates
        });
    });
});