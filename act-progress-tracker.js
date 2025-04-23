document.addEventListener("DOMContentLoaded", () => {
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

            bar.style.width = `${percentage}%`;
            text.innerHTML = `${percentage}% <span class="arrow">→</span>`;
        }
    });

    document.getElementById("act-progress-container").classList.remove("hidden");
});