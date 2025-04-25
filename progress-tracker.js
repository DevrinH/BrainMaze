document.addEventListener("DOMContentLoaded", () => {
    function updateProgress() {
        let storedResults = localStorage.getItem("actTestResults");
        console.log("Retrieved actTestResults from localStorage:", storedResults);

        let results = storedResults ? JSON.parse(storedResults) : {};
        console.log("Parsed actTestResults:", results);
        console.log("All ACT categories and their scores:", JSON.stringify(results, null, 2));

        const categoryMapping = {
            "act-english": [
                "act-conventions-of-standard-english", "act-knowledge-of-language", "act-production-of-writing"
            ],
            "act-math": [
                "act-algebra", "act-functions", "act-coordinate-geometry", "act-systems-of-equations",
                "act-geometry", "act-trigonometry", "act-quadratics", "act-logarithms",
                "act-complex-numbers", "act-word-problems", "act-probability", "act-sequences"
            ],
            "act-reading": [
                "act-main-idea", "act-authors-purpose", "act-inference", "act-character-motivation",
                "act-vocabulary-in-context", "act-character-development", "act-symbolism",
                "act-literary-device", "act-theme", "act-detail", "act-relationship",
                "act-implication", "act-comparison"
            ],
            "act-science": [
                "act-data-representation", "act-research-summary", "act-conflicting-viewpoints"
            ]
        };

        let transformedResults = {};
        let hasOldCategories = false;
        Object.keys(categoryMapping).forEach(oldCategory => {
            if (results[oldCategory]) {
                hasOldCategories = true;
                const newCategories = categoryMapping[oldCategory];
                newCategories.forEach(newCategory => {
                    transformedResults[newCategory] = results[oldCategory];
                });
            }
        });

        const finalResults = hasOldCategories ? transformedResults : results;
        console.log("Final results after transformation:", finalResults);

        const actSection = document.querySelector("#line-chart-act");
        const isActSectionActive = actSection && !actSection.classList.contains("hidden");
        console.log("ACT section element:", actSection);
        console.log("Is ACT section active?", isActSectionActive);

        if (!isActSectionActive) {
            console.log("ACT section is not active, skipping ACT progress container update.");
            return;
        }

        const progressItems = document.querySelectorAll("#act-progress-container .progress-item");
        console.log("Found progress items:", progressItems.length);

        let historicalProgress = JSON.parse(localStorage.getItem("actHistoricalProgress")) || {};
        let newProgress = {};

        progressItems.forEach(item => {
            const category = item.dataset.category;
            console.log(`Processing category: ${category}`);

            const bar = document.getElementById(`${category}-bar`);
            const text = document.getElementById(`${category}-text`);
            console.log(`Bar element for ${category}:`, bar);
            console.log(`Text element for ${category}:`, text);

            if (finalResults[category]) {
                const { correct, incorrect } = finalResults[category];
                console.log(`Category ${category} stats - Correct: ${correct}, Incorrect: ${incorrect}`);

                const total = correct + incorrect;
                const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
                console.log(`Calculated percentage for ${category}: ${percentage}%`);

                newProgress[category] = { percentage };

                if (bar) {
                    bar.style.width = `${percentage}%`;
                } else {
                    console.warn(`Bar element not found for ${category}`);
                }

                if (text) {
                    let previousPercentage = historicalProgress[category]?.percentage || 0;
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
                } else {
                    console.warn(`Text element not found for ${category}`);
                }
                console.log(`Updated ${category} - Bar width: ${bar?.style.width || "not found"}, Text: ${text?.innerHTML || "not found"}`);
            } else {
                console.log(`No data found for category ${category}`);
                newProgress[category] = { percentage: 0 };
            }
        });

        localStorage.setItem("actHistoricalProgress", JSON.stringify(newProgress));
        console.log("Updated actHistoricalProgress:", newProgress);

        const actProgressContainer = document.getElementById("act-progress-container");
        if (actProgressContainer) {
            actProgressContainer.classList.remove("hidden");
            console.log("ACT progress container made visible in ACT section");
        } else {
            console.error("ACT progress container not found");
        }
    }

    // Run the update immediately
    updateProgress();

    // Reapply updates after a short delay to ensure they stick
    setTimeout(updateProgress, 1000);

    document.querySelectorAll(".button-30").forEach(button => {
        button.addEventListener("click", () => {
            setTimeout(() => {
                const actSection = document.querySelector("#line-chart-act");
                const isActSectionActive = actSection && !actSection.classList.contains("hidden");
                console.log("Button clicked - Is ACT section active?", isActSectionActive);

                if (isActSectionActive) {
                    updateProgress();
                }
            }, 500);
        });
    });
});