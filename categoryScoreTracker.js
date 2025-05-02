document.addEventListener("DOMContentLoaded", () => {
    const scoreHistory = JSON.parse(localStorage.getItem("gedScoreHistory")) || {};

    // Timed RLA Test Score
    const rlaScore = localStorage.getItem("rlaScore");
    const rlaScoreDisplay = document.getElementById("rla-score");
    if (rlaScore && rlaScoreDisplay) {
        const latestDate = Object.keys(scoreHistory)
            .filter(date => scoreHistory[date].rla)
            .sort()
            .pop();
        const displayText = latestDate
            ? `Last Score: ${rlaScore}/200 (Taken: ${latestDate})`
            : `Last Score: ${rlaScore}/200`;
        rlaScoreDisplay.textContent = displayText;
    }

    // Untimed RLA Test Score
    const rlaUntimedScore = localStorage.getItem("rlaUntimedScore");
    const rlaUntimedScoreDisplay = document.getElementById("rla-untimed-score");
    if (rlaUntimedScore && rlaUntimedScoreDisplay) {
        const latestDate = Object.keys(scoreHistory)
            .filter(date => scoreHistory[date].rlaUntimed)
            .sort()
            .pop();
        const displayText = latestDate
            ? `Last Score: ${rlaUntimedScore}/200 (Taken: ${latestDate})`
            : `Last Score: ${rlaUntimedScore}/200`;
        rlaUntimedScoreDisplay.textContent = displayText;
    }

    // Timed Math Test Score
    const mathScore = localStorage.getItem("mathScore");
    const mathScoreDisplay = document.getElementById("math-score");
    if (mathScore && mathScoreDisplay) {
        const latestDate = Object.keys(scoreHistory)
            .filter(date => scoreHistory[date].math)
            .sort()
            .pop();
        const displayText = latestDate
            ? `Last Score: ${mathScore}/200 (Taken: ${latestDate})`
            : `Last Score: ${mathScore}/200`;
        mathScoreDisplay.textContent = displayText;
    }

    // Untimed Math Test Score
    const mathUntimedScore = localStorage.getItem("mathUntimedScore");
    const mathUntimedScoreDisplay = document.getElementById("math-untimed-score");
    if (mathUntimedScore && mathUntimedScoreDisplay) {
        const latestDate = Object.keys(scoreHistory)
            .filter(date => scoreHistory[date].mathUntimed)
            .sort()
            .pop();
        const displayText = latestDate
            ? `Last Score: ${mathUntimedScore}/200 (Taken: ${latestDate})`
            : `Last Score: ${mathUntimedScore}/200`;
        mathUntimedScoreDisplay.textContent = displayText;
    }
});