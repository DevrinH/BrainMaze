document.addEventListener("DOMContentLoaded", () => {
    // Check which tab is active by looking for the 'active' class on the tab elements
    const actTab = document.querySelector("#act-tab");
    const isActTabActive = actTab && actTab.classList.contains("active");
    console.log("ACT tab element:", actTab);
    console.log("Is ACT tab active?", isActTabActive);

    // Only proceed if the ACT tab is active
    if (!isActTabActive) {
        console.log("ACT tab is not active, skipping ACT progress container update.");
        return;
    }

    let storedResults = localStorage.getItem("actTestResults");
    console.log("Retrieved actTestResults from localStorage:", storedResults);

    let results = storedResults ? JSON.parse(storedResults) : {};
    console.log("Parsed actTestResults:", results);

    const progressItems = document.querySelectorAll("#act-progress-container .progress-item");
    console.log("Found progress items:", progressItems.length);

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

            bar.style.width = `${percentage}%`;
            text.innerHTML = `${percentage}% <span class="arrow">→</span>`;
            console.log(`Updated ${category} - Bar width: ${bar.style.width}, Text: ${text.innerHTML}`);
        } else {
            console.log(`No data found for category ${category}`);
        }
    });

    document.getElementById("act-progress-container").classList.remove("hidden");
    console.log("ACT progress container made visible in ACT section");
});