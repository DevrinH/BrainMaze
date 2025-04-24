document.addEventListener("DOMContentLoaded", () => {
    // Retrieve ACT test results from localStorage and log them regardless of active section
    let storedResults = localStorage.getItem("actTestResults");
    console.log("Retrieved actTestResults from localStorage:", storedResults);

    let results = storedResults ? JSON.parse(storedResults) : {};
    console.log("Parsed actTestResults:", results);
    console.log("All ACT categories and their scores:", JSON.stringify(results, null, 2));

    // Check if the ACT section is active by looking for the 'hidden' class on line-chart-act
    const actSection = document.querySelector("#line-chart-act");
    const isActSectionActive = actSection && !actSection.classList.contains("hidden");
    console.log("ACT section element:", actSection);
    console.log("Is ACT section active?", isActSectionActive);

    // Only proceed with updating progress bars if the ACT section is active
    if (!isActSectionActive) {
        console.log("ACT section is not active, skipping ACT progress container update.");
        return;
    }

    // Get all progress items in the ACT progress container
    const progressItems = document.querySelectorAll("#act-progress-container .progress-item");
    console.log("Found progress items:", progressItems.length);

    // Update each progress item
    progressItems.forEach(item => {
        const category = item.dataset.category;
        console.log(`Processing category: ${category}`);

        const bar = document.getElementById(`${category}-bar`);
        const text = document.getElementById(`${category}-text`);
        console.log(`Bar element for ${category}:`, bar);
        console.log(`Text element for ${category}:`, text);

        if (results[category]) {
            const { correct, incorrect } = results[category];
            console.log(`Category ${category} stats - Correct: ${correct}, Incorrect: ${incorrect}`);

            const total = correct + incorrect;
            const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
            console.log(`Calculated percentage for ${category}: ${percentage}%`);

            if (bar) {
                bar.style.width = `${percentage}%`;
            } else {
                console.warn(`Bar element not found for ${category}`);
            }

            if (text) {
                text.innerHTML = `${percentage}% <span class="arrow">→</span>`;
            } else {
                console.warn(`Text element not found for ${category}`);
            }
            console.log(`Updated ${category} - Bar width: ${bar?.style.width || "not found"}, Text: ${text?.innerHTML || "not found"}`);
        } else {
            console.log(`No data found for category ${category}`);
        }
    });

    // Ensure the ACT progress container is visible
    const actProgressContainer = document.getElementById("act-progress-container");
    if (actProgressContainer) {
        actProgressContainer.classList.remove("hidden");
        console.log("ACT progress container made visible in ACT section");
    } else {
        console.error("ACT progress container not found");
    }
});

// Listen for changes in the active section (when user clicks GED/SAT/ACT buttons)
document.querySelectorAll(".button-30").forEach(button => {
    button.addEventListener("click", () => {
        // Log actTestResults again on every tab switch, regardless of active section
        let storedResults = localStorage.getItem("actTestResults");
        let results = storedResults ? JSON.parse(storedResults) : {};
        console.log("Tab switched - Retrieved actTestResults from localStorage:", storedResults);
        console.log("Tab switched - Parsed actTestResults:", results);
        console.log("Tab switched - All ACT categories and their scores:", JSON.stringify(results, null, 2));

        // Re-run the progress update logic after a short delay to ensure DOM updates
        setTimeout(() => {
            const actSection = document.querySelector("#line-chart-act");
            const isActSectionActive = actSection && !actSection.classList.contains("hidden");
            console.log("Button clicked - Is ACT section active?", isActSectionActive);

            if (isActSectionActive) {
                // Trigger the progress update logic
                const progressItems = document.querySelectorAll("#act-progress-container .progress-item");

                progressItems.forEach(item => {
                    const category = item.dataset.category;
                    const bar = document.getElementById(`${category}-bar`);
                    const text = document.getElementById(`${category}-text`);

                    if (results[category]) {
                        const { correct, incorrect } = results[category];
                        const total = correct + incorrect;
                        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

                        if (bar) bar.style.width = `${percentage}%`;
                        if (text) text.innerHTML = `${percentage}% <span class="arrow">→</span>`;
                        console.log(`Updated ${category} after tab switch - Bar width: ${bar?.style.width || "not found"}, Text: ${text?.innerHTML || "not found"}`);
                    }
                });

                const actProgressContainer = document.getElementById("act-progress-container");
                if (actProgressContainer) {
                    actProgressContainer.classList.remove("hidden");
                    console.log("ACT progress container made visible after tab switch");
                }
            }
        }, 100); // Small delay to ensure DOM updates are applied
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Load stored progress for ACT
    let previousProgress = JSON.parse(localStorage.getItem("previousTestResults")) || {};
    let currentTestResults = JSON.parse(localStorage.getItem("testResults")) || {};
    let storedProgress = JSON.parse(localStorage.getItem("actProgress")) || {};

    console.log("ACT Previous Progress:", previousProgress);
    console.log("ACT Current Test Results:", currentTestResults);
    console.log("ACT Stored Progress Before Update:", storedProgress);

    // Accumulate results over multiple tests for ACT
    Object.keys(currentTestResults).forEach(category => {
        if (!storedProgress[category]) {
            storedProgress[category] = { correct: 0, incorrect: 0 };
        }

        // Ensure values are treated as numbers
        let newCorrect = Number(currentTestResults[category]?.correct || 0);
        let newIncorrect = Number(currentTestResults[category]?.incorrect || 0);

        storedProgress[category].correct += newCorrect;
        storedProgress[category].incorrect += newIncorrect;
    });

    // Save updated ACT progress
    localStorage.setItem("actProgress", JSON.stringify(storedProgress));
    console.log("Updated ACT Stored Progress:", storedProgress);

    // Update ACT progress bars and arrows
    function updateActProgressBars() {
        console.log("Updating ACT progress bars with data:", storedProgress);

        Object.keys(storedProgress).forEach(category => {
            const correct = storedProgress[category]?.correct || 0;
            const incorrect = storedProgress[category]?.incorrect || 0;
            const total = correct + incorrect;
            const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

            // Update progress bar
            const progressBar = document.getElementById(`${category}-bar`);
            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
            } else {
                console.warn(`ACT Progress bar not found: ${category}-bar`);
            }

            // Update progress text and arrow
            const progressText = document.getElementById(`${category}-text`);
            if (progressText) {
                let previousPercentage = previousProgress[category]?.percentage || 0;
                let arrow = "→";
                let arrowColor = "#4e5163";

                if (percentage > previousPercentage) {
                    arrow = "↑";
                    arrowColor = "green";
                } else if (percentage < previousPercentage) {
                    arrow = "↓";
                    arrowColor = "red";
                }

                progressText.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
            } else {
                console.warn(`ACT Progress text not found: ${category}-text`);
            }

            // Store current progress for future reference
            previousProgress[category] = { percentage };
        });

        // Save updated previous progress
        localStorage.setItem("previousTestResults", JSON.stringify(previousProgress));
    }

    updateActProgressBars();
});