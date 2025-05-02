document.addEventListener("DOMContentLoaded", () => {
    const rlaScore = localStorage.getItem("rlaScore");
    const scoreDisplay = document.getElementById("rla-score");
    const scoreHistory = JSON.parse(localStorage.getItem("gedScoreHistory")) || {};

    if (rlaScore && scoreDisplay) {
        // Find the most recent date with an RLA score
        const latestDate = Object.keys(scoreHistory)
            .filter(date => scoreHistory[date].rla)
            .sort()
            .pop();
        const displayText = latestDate
            ? `Last Score: ${rlaScore}/200 (Taken: ${latestDate})`
            : `Last Score: ${rlaScore}/200`;
        scoreDisplay.textContent = displayText;
    }
});