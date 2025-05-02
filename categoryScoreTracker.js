document.addEventListener("DOMContentLoaded", () => {
    // Timed RLA Test Score
    const rlaScore = localStorage.getItem("rlaScore");
    const rlaScoreDisplay = document.getElementById("rla-score");
    if (rlaScore && rlaScoreDisplay) {
        rlaScoreDisplay.textContent = `Last Score: ${rlaScore}/200`;
    }

    // Untimed RLA Test Score
    const rlaUntimedScore = localStorage.getItem("rlaUntimedScore");
    const rlaUntimedScoreDisplay = document.getElementById("rla-untimed-score");
    if (rlaUntimedScore && rlaUntimedScoreDisplay) {
        rlaUntimedScoreDisplay.textContent = `Last Score: ${rlaUntimedScore}/200`;
    }
});