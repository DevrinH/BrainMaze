document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the last RLA score from localStorage
    const rlaScore = localStorage.getItem("rlaScore");
    const scoreDisplay = document.getElementById("rla-score");

    // Update the score display if a score exists
    if (rlaScore && scoreDisplay) {
        scoreDisplay.textContent = `Last Score: ${rlaScore}/200`;
    }
});