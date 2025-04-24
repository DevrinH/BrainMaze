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

        // Load data from localStorage
        let previousProgress = JSON.parse(localStorage.getItem("previousTestResults")) || {};
        let storedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};

        console.log(`${examType} Previous Progress:`, previousProgress);
        console.log(`${examType} Stored Progress:`, storedProgress);

        // Initialize storedProgress for all categories if not present
        categories.forEach(category => {
            if (!storedProgress[category]) {
                storedProgress[category] = { correct: 0, incorrect: 0 };
            }
        });

        // Update progress bars and arrows
        categories.forEach(category => {
            const correct = storedProgress[category]?.correct || 0;
            const incorrect = storedProgress[category]?.incorrect || 0;
            const total = correct + incorrect;
            const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

            const progressBar = document.getElementById(`${category}-bar`);
            const progressText = document.getElementById(`${category}-text`);

            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
                console.log(`Set ${category}-bar width to ${percentage}%`);
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

            // Update previousProgress for the next comparison
            previousProgress[category] = { percentage };
        });

        localStorage.setItem("previousTestResults", JSON.stringify(previousProgress));
        console.log(`${examType} Updated Previous Progress:`, previousProgress);
    }

    // Function to update progress for all sections, even if hidden
    function updateAllProgress() {
        console.log("Updating progress for all sections...");
        updateProgressBars("ACT", "actProgress", actCategories);
        updateProgressBars("SAT", "satProgress", satCategories);
    }

    // Function to check and show/hide progress containers based on active section
    function updateActiveSectionVisibility() {
        const actSection = document.querySelector("#line-chart-act");
        const satSection = document.querySelector("#line-chart-sat");

        const isActSectionActive = actSection && !actSection.classList.contains("hidden");
        const isSatSectionActive = satSection && !satSection.classList.contains("hidden");

        console.log("Is ACT section active?", isActSectionActive);
        console.log("Is SAT section active?", isSatSectionActive);

        const actProgressContainer = document.getElementById("act-progress-container");
        const satProgressContainer = document.getElementById("sat-progress-container");

        if (isActSectionActive && actProgressContainer) {
            actProgressContainer.classList.remove("hidden");
            console.log("ACT progress container made visible");
        } else if (actProgressContainer) {
            actProgressContainer.classList.add("hidden");
        }

        if (isSatSectionActive && satProgressContainer) {
            satProgressContainer.classList.remove("hidden");
            console.log("SAT progress container made visible");
        } else if (satProgressContainer) {
            satProgressContainer.classList.add("hidden");
        }
    }

    // Initial update for all sections on page load
    updateAllProgress();
    updateActiveSectionVisibility();

    // Listen for tab switches (GED/SAT/ACT buttons)
    document.querySelectorAll(".button-30").forEach(button => {
        button.addEventListener("click", () => {
            console.log("Tab switched - Updating visibility...");
            setTimeout(() => {
                updateActiveSectionVisibility();
            }, 500); // Increased delay to 500ms
        });
    });
});