document.addEventListener("DOMContentLoaded", () => {
    // Check which exam section is active
    const activeExamElement = document.querySelector(".active-exam"); // Adjust selector based on your HTML
    const activeExam = activeExamElement ? activeExamElement.dataset.exam : null;
    console.log("Active exam section:", activeExam);

    // Only proceed if the active exam is ACT
    if (activeExam !== "act") {
        console.log("Not in ACT section, skipping ACT progress container update.");
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