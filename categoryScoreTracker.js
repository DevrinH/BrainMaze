document.addEventListener("DOMContentLoaded", () => {
    // Timed RLA Test Score (GED)
    const rlaScore = localStorage.getItem("rlaScore");
    const rlaScoreDisplay = document.getElementById("rla-score");
    if (rlaScore && rlaScoreDisplay) {
        rlaScoreDisplay.textContent = `Last Score: ${rlaScore}/200`;
    }

    // Untimed RLA Test Score (GED)
    const rlaUntimedScore = localStorage.getItem("rlaUntimedScore");
    const rlaUntimedScoreDisplay = document.getElementById("rla-untimed-score");
    if (rlaUntimedScore && rlaUntimedScoreDisplay) {
        rlaUntimedScoreDisplay.textContent = `Last Score: ${rlaUntimedScore}/200`;
    }

    // Timed Math Test Score (GED)
    const mathScore = localStorage.getItem("mathScore");
    const mathScoreDisplay = document.getElementById("math-score");
    if (mathScore && mathScoreDisplay) {
        mathScoreDisplay.textContent = `Last Score: ${mathScore}/200`;
    }

    // Untimed Math Test Score (GED)
    const mathUntimedScore = localStorage.getItem("mathUntimedScore");
    const mathUntimedScoreDisplay = document.getElementById("math-untimed-score");
    if (mathUntimedScore && mathUntimedScoreDisplay) {
        mathUntimedScoreDisplay.textContent = `Last Score: ${mathUntimedScore}/200`;
    }

    // Timed Science Test Score (GED)
    const scienceScore = localStorage.getItem("scienceScore");
    const scienceScoreDisplay = document.getElementById("science-score");
    if (scienceScore && scienceScoreDisplay) {
        scienceScoreDisplay.textContent = `Last Score: ${scienceScore}/200`;
    }

    // Untimed Science Test Score (GED)
    const scienceUntimedScore = localStorage.getItem("scienceUntimedScore");
    const scienceUntimedScoreDisplay = document.getElementById("science-untimed-score");
    if (scienceUntimedScore && scienceUntimedScoreDisplay) {
        scienceUntimedScoreDisplay.textContent = `Last Score: ${scienceUntimedScore}/200`;
    }

    // Timed Social Studies Test Score (GED)
    const socialStudiesScore = localStorage.getItem("socialStudiesScore");
    const socialStudiesScoreDisplay = document.getElementById("social-studies-score");
    if (socialStudiesScore && socialStudiesScoreDisplay) {
        socialStudiesScoreDisplay.textContent = `Last Score: ${socialStudiesScore}/200`;
    }

    // Untimed Social Studies Test Score (GED)
    const socialStudiesUntimedScore = localStorage.getItem("socialStudiesUntimedScore");
    const socialStudiesUntimedScoreDisplay = document.getElementById("social-studies-untimed-score");
    if (socialStudiesUntimedScore && socialStudiesUntimedScoreDisplay) {
        socialStudiesUntimedScoreDisplay.textContent = `Last Score: ${socialStudiesUntimedScore}/200`;
    }

    // Timed Reading and Writing Test Score (SAT)
    const readingScore = localStorage.getItem("readingScore");
    const readingScoreDisplay = document.getElementById("reading-score");
    if (readingScore && readingScoreDisplay) {
        readingScoreDisplay.textContent = `Last Score: ${readingScore}/800`;
    }

    // Untimed Reading and Writing Test Score (SAT)
    const readingUntimedScore = localStorage.getItem("readingUntimedScore");
    const readingUntimedScoreDisplay = document.getElementById("reading-untimed-score");
    if (readingUntimedScore && readingUntimedScoreDisplay) {
        readingUntimedScoreDisplay.textContent = `Last Score: ${readingUntimedScore}/800`;
    }

    // Timed Math Test Score (SAT)
    const satMathScore = localStorage.getItem("satMathScore");
    const satMathScoreDisplay = document.getElementById("sat-math-score");
    if (satMathScore && satMathScoreDisplay) {
        satMathScoreDisplay.textContent = `Last Score: ${satMathScore}/800`;
    }

    // Untimed Math Test Score (SAT)
    const satMathUntimedScore = localStorage.getItem("satMathUntimedScore");
    const satMathUntimedScoreDisplay = document.getElementById("sat-math-untimed-score");
    if (satMathUntimedScore && satMathUntimedScoreDisplay) {
        satMathUntimedScoreDisplay.textContent = `Last Score: ${satMathUntimedScore}/800`;
    }

    // Timed English Test Score (ACT)
    const englishScore = localStorage.getItem("englishScore");
    const englishScoreDisplay = document.getElementById("act-english-score");
    if (englishScore && englishScoreDisplay) {
        englishScoreDisplay.textContent = `Last Score: ${englishScore}/36`;
    }

    // Untimed English Test Score (ACT)
    const englishUntimedScore = localStorage.getItem("englishUntimedScore");
    const englishUntimedScoreDisplay = document.getElementById("act-english-untimed-score");
    if (englishUntimedScore && englishUntimedScoreDisplay) {
        englishUntimedScoreDisplay.textContent = `Last Score: ${englishUntimedScore}/36`;
    }

    // Timed Math Test Score (ACT)
    const actMathScore = localStorage.getItem("actMathScore");
    const actMathScoreDisplay = document.getElementById("act-math-score");
    if (actMathScore && actMathScoreDisplay) {
        actMathScoreDisplay.textContent = `Last Score: ${actMathScore}/36`;
    }
});