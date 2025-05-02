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

    // Timed Math Test Score
    const mathScore = localStorage.getItem("mathScore");
    const mathScoreDisplay = document.getElementById("math-score");
    if (mathScore && mathScoreDisplay) {
        mathScoreDisplay.textContent = `Last Score: ${mathScore}/200`;
    }

    // Untimed Math Test Score
    const mathUntimedScore = localStorage.getItem("mathUntimedScore");
    const mathUntimedScoreDisplay = document.getElementById("math-untimed-score");
    if (mathUntimedScore && mathUntimedScoreDisplay) {
        mathUntimedScoreDisplay.textContent = `Last Score: ${mathUntimedScore}/200`;
    }

    // Timed Science Test Score
    const scienceScore = localStorage.getItem("scienceScore");
    const scienceScoreDisplay = document.getElementById("science-score");
    if (scienceScore && scienceScoreDisplay) {
        scienceScoreDisplay.textContent = `Last Score: ${scienceScore}/200`;
    }

    // Untimed Science Test Score
    const scienceUntimedScore = localStorage.getItem("scienceUntimedScore");
    const scienceUntimedScoreDisplay = document.getElementById("science-untimed-score");
    if (scienceUntimedScore && scienceUntimedScoreDisplay) {
        scienceUntimedScoreDisplay.textContent = `Last Score: ${scienceUntimedScore}/200`;
    }

    // Timed Social Studies Test Score
    const socialStudiesScore = localStorage.getItem("socialStudiesScore");
    const socialStudiesScoreDisplay = document.getElementById("social-studies-score");
    if (socialStudiesScore && socialStudiesScoreDisplay) {
        socialStudiesScoreDisplay.textContent = `Last Score: ${socialStudiesScore}/200`;
    }

    // Untimed Social Studies Test Score
    const socialStudiesUntimedScore = localStorage.getItem("socialStudiesUntimedScore");
    const socialStudiesUntimedScoreDisplay = document.getElementById("social-studies-untimed-score");
    if (socialStudiesUntimedScore && socialStudiesUntimedScoreDisplay) {
        socialStudiesUntimedScoreDisplay.textContent = `Last Score: ${socialStudiesUntimedScore}/200`;
    }
});