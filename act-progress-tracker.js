document.addEventListener("DOMContentLoaded", () => {
    // Check if the ACT section is active by looking for the 'hidden' class on line-chart-act
    const actSection = document.querySelector("#line-chart-act");
    const isActSectionActive = actSection && !actSection.classList.contains("hidden");
    console.log("ACT section element:", actSection);
    console.log("Is ACT section active?", isActSectionActive);

    // Only proceed if the ACT section is active
    if (!isActSectionActive) {
        console.log("ACT section is not active, skipping ACT progress container update.");
        return;
    }

    // Retrieve ACT test results from localStorage
    let storedResults = localStorage.getItem("actTestResults");
    console.log("Retrieved actTestResults from localStorage:", storedResults);

    let results = storedResults ? JSON.parse(storedResults) : {};
    console.log("Parsed actTestResults:", results);

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
        // Re-run the progress update logic after a short delay to ensure DOM updates
        setTimeout(() => {
            const actSection = document.querySelector("#line-chart-act");
            const isActSectionActive = actSection && !actSection.classList.contains("hidden");
            console.log("Button clicked - Is ACT section active?", isActSectionActive);

            if (isActSectionActive) {
                // Trigger the progress update logic
                let storedResults = localStorage.getItem("actTestResults");
                let results = storedResults ? JSON.parse(storedResults) : {};
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