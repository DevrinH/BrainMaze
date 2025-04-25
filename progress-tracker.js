document.addEventListener("DOMContentLoaded", () => {
    let isUpdating = false;

    function updateProgress(source) {
        if (isUpdating) {
            console.log(`updateProgress skipped (already running) from: ${source}`);
            return;
        }
        isUpdating = true;

        console.log(`updateProgress called from: ${source}`);

        let storedResults = localStorage.getItem("actTestResults");
        console.log("Retrieved actTestResults from localStorage:", storedResults);

        let results = storedResults ? JSON.parse(storedResults) : {};
        console.log("Parsed actTestResults:", results);
        console.log("All ACT categories and their scores:", JSON.stringify(results, null, 2));

        const actSection = document.querySelector("#line-chart-act");
        const isActSectionActive = actSection && !actSection.classList.contains("hidden");
        console.log("ACT section element:", actSection);
        console.log("Is ACT section active?", isActSectionActive);

        if (!isActSectionActive) {
            console.log("ACT section is not active, skipping ACT progress container update.");
            isUpdating = false;
            return;
        }

        const progressItems = document.querySelectorAll("#act-progress-container .progress-item");
        console.log("Found progress items:", progressItems.length);

        let historicalProgress = JSON.parse(localStorage.getItem("actHistoricalProgress")) || {};
        // Initialize historicalProgress for all categories
        progressItems.forEach(item => {
            const category = item.dataset.category;
            if (!historicalProgress[category]) {
                historicalProgress[category] = { percentage: 0 };
            }
        });
        console.log("Loaded actHistoricalProgress before update:", historicalProgress);

        let newProgress = {};

        progressItems.forEach(item => {
            const category = item.dataset.category;
            console.log(`Processing category: ${category}`);

            const bar = document.getElementById(`${category}-bar`);
            const text = document.getElementById(`${category}-text`);
            console.log(`Bar element for ${category}:`, bar);
            console.log(`Text element for ${category}:`, text);

            let percentage = 0;
            if (results[category]) {
                const { correct, incorrect } = results[category];
                console.log(`Category ${category} stats - Correct: ${correct}, Incorrect: ${incorrect}`);

                const total = correct + incorrect;
                percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
                console.log(`Calculated percentage for ${category}: ${percentage}%`);
            } else {
                console.log(`No data found for category ${category}`);
            }

            newProgress[category] = { percentage };

            if (bar) {
                bar.style.width = `${percentage}%`;
            } else {
                console.warn(`Bar element not found for ${category}`);
            }

            if (text) {
                let previousPercentage = Number(historicalProgress[category]?.percentage) || 0;
                console.log(`Category: ${category}, Previous Percentage: ${previousPercentage}, Current Percentage: ${percentage}`);

                let arrow = "→";
                let arrowColor = "#4e5163";

                if (percentage > previousPercentage) {
                    arrow = "↑";
                    arrowColor = "green";
                    console.log(`Category: ${category}, Arrow Set to ↑ (Increased)`);
                } else if (percentage < previousPercentage) {
                    arrow = "↓";
                    arrowColor = "red";
                    console.log(`Category: ${category}, Arrow Set to ↓ (Decreased)`);
                } else {
                    console.log(`Category: ${category}, Arrow Set to → (No Change)`);
                }

                text.innerHTML = `${percentage}% <span class="arrow" style="color:${arrowColor};">${arrow}</span>`;
                text.offsetHeight;
            } else {
                console.warn(`Text element not found for ${category}`);
            }
            console.log(`Updated ${category} - Bar width: ${bar?.style.width || "not found"}, Text: ${text?.innerHTML || "not found"}`);
        });

        console.log("Saving actHistoricalProgress:", newProgress);
        localStorage.setItem("actHistoricalProgress", JSON.stringify(newProgress));
        console.log("Updated actHistoricalProgress:", JSON.parse(localStorage.getItem("actHistoricalProgress")));

        const actProgressContainer = document.getElementById("act-progress-container");
        if (actProgressContainer) {
            actProgressContainer.classList.remove("hidden");
            console.log("ACT progress container made visible in ACT section");
        } else {
            console.error("ACT progress container not found");
        }

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
                const isActSectionActive = actSection && !actSection.classList.contains("hidden");
                console.log("Button clicked - Is ACT section active?", isActSectionActive);

                if (isActSectionActive) {
                    updateProgress("tabSwitch");
                }
            }, 100);
        });
    });
});