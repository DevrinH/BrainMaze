document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the last RLA score from localStorage
    const rlaScore = localStorage.getItem("rlaScore");
    const scoreDisplay = document.getElementById("rla-score");

    // Update the score display if a score exists
    if (rlaScore && scoreDisplay) {
        scoreDisplay.textContent = `Last Score: ${rlaScore}/200`;
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the last RLA Untimed score from localStorage
    const rlaUntimedScore = localStorage.getItem("rlaUntimedScore");
    const scoreDisplay = document.getElementById("rla-untimed-score");

    // Update the score display if a score exists
    if (rlaUntimedScore && scoreDisplay) {
        scoreDisplay.textContent = `Last Score: ${rlaUntimedScore}/200`;
    }
});