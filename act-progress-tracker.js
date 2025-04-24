document.addEventListener("DOMContentLoaded", () => {
    // Load stored data
    let actTestResults = JSON.parse(localStorage.getItem("actTestResults")) || {};
    let previousProgress = JSON.parse(localStorage.getItem("previousTestResults")) || {};
    let storedProgress = JSON.parse(localStorage.getItem("actProgress")) || {};

    console.log("Retrieved actTestResults from localStorage:", actTestResults);
    console.log("Retrieved previousTestResults from localStorage:", previousProgress);
    console.log("Retrieved actProgress from localStorage:", storedProgress);

    // Sync actProgress with actTestResults (in case the test was interrupted)
    Object.keys(actTestResults).forEach(category => {
        if (!storedProgress[category]) {
            storedProgress[category] = { correct: 0, incorrect: 0 };
        }
        storedProgress[category].correct = Number(actTestResults[category]?.correct || 0);
        storedProgress[category].incorrect = Number(actTestResults[category]?.incorrect || 0);
    });

    // Save updated actProgress
    localStorage.setItem("actProgress", JSON.stringify(storedProgress));
    console.log("Synced actProgress with actTestResults:", storedProgress);

    // Check if the ACT section is active
    const actSection = document.querySelector("#line-chart-act");
    const isActSectionActive = actSection && !actSection.classList.contains("hidden");
    console.log("ACT section element:", actSection);
    console.log("Is ACT section active?", isActSectionActive);

    if (!isActSectionActive) {
        console.log("ACT section is not active, skipping progress update.");
        return;
    }

    // Update progress bars
    const progressItems = document.querySelectorAll("#act-progress-container .progress-item");
    console.log("Found progress items:", progressItems.length);

    progressItems.forEach(item => {
        const category = item.dataset.category;
        console.log(`Processing category: ${category}`);

        const bar = document.getElementById(`${category}-bar`);
        const text = document.getElementById(`${category}-text`);
        console.log(`Bar element for ${category}:`, bar);
        console.log(`Text element for ${category}:`, text);

        if (storedProgress[category]) {
            const { correct, incorrect } = storedProgress[category];
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

                text.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
            } else {
                console.warn(`Text element not found for ${category}`);
            }
            console.log(`Updated ${category} - Bar width: ${bar?.style.width || "not found"}, Text: ${text?.innerHTML || "not found"}`);

            // Update previousProgress for future comparisons
            previousProgress[category] = { percentage };
        } else {
            console.log(`No data found for category ${category}`);
        }
    });

    // Save updated previousProgress
    localStorage.setItem("previousTestResults", JSON.stringify(previousProgress));
    console.log("Updated previousTestResults:", previousProgress);

    // Ensure the ACT progress container is visible
    const actProgressContainer = document.getElementById("act-progress-container");
    if (actProgressContainer) {
        actProgressContainer.classList.remove("hidden");
        console.log("ACT progress container made visible");
    } else {
        console.error("ACT progress container not found");
    }
});

// Handle tab switches
document.querySelectorAll(".button-30").forEach(button => {
    button.addEventListener("click", () => {
        setTimeout(() => {
            const actSection = document.querySelector("#line-chart-act");
            const isActSectionActive = actSection && !actSection.classList.contains("hidden");
            console.log("Button clicked - Is ACT section active?", isActSectionActive);

            if (isActSectionActive) {
                let storedProgress = JSON.parse(localStorage.getItem("actProgress")) || {};
                let previousProgress = JSON.parse(localStorage.getItem("previousTestResults")) || {};

                const progressItems = document.querySelectorAll("#act-progress-container .progress-item");
                progressItems.forEach(item => {
                    const category = item.dataset.category;
                    const bar = document.getElementById(`${category}-bar`);
                    const text = document.getElementById(`${category}-text`);

                    if (storedProgress[category]) {
                        const { correct, incorrect } = storedProgress[category];
                        const total = correct + incorrect;
                        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

                        if (bar) bar.style.width = `${percentage}%`;
                        if (text) {
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

                            text.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                        }
                        console.log(`Updated ${category} after tab switch - Bar width: ${bar?.style.width || "not found"}, Text: ${text?.innerHTML || "not found"}`);
                    }
                });

                const actProgressContainer = document.getElementById("act-progress-container");
                if (actProgressContainer) {
                    actProgressContainer.classList.remove("hidden");
                    console.log("ACT progress container made visible after tab switch");
                }
            }
        }, 100);
    });
});