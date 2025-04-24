// Global variables
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {}; // Tracks stats for the current section
let results = localStorage.getItem("actResults");
results = results ? JSON.parse(results) : {};
let refreshIntervalId;
let time;
let userResponses = [];
let currentSection = "english";
let categoryScores = {};

// Section-specific responses
let englishResponses = [];
let mathResponses = [];
let readingResponses = [];
let scienceResponses = [];

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionCategory = currentQuestion.category.toLowerCase().replace(/\s+/g, "-");
    let questionDifficulty = currentQuestion.difficulty;

    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    const correctAnswer = currentQuestion.answers.find(ans => ans.correct).text;

    const safePassage = currentQuestion.passage || "No passage provided";
    const safeQuestion = currentQuestion.question || "No question provided";
    const responseQuestion = currentSection === "math" ? safeQuestion : safePassage + "<br/><br/>" + safeQuestion;

    console.log("Creating user response:", currentSection, ":", {
        question: responseQuestion,
        userAnswer: selectedBtn.innerHTML,
        correctAnswer: correctAnswer,
        wasCorrect: isCorrect
    });

    const response = {
        section: currentSection,
        question: responseQuestion,
        userAnswer: selectedBtn.innerHTML,
        correctAnswer: correctAnswer,
        wasCorrect: isCorrect
    };

    if (currentSection === "english") {
        englishResponses.push(response);
    } else if (currentSection === "math") {
        mathResponses.push(response);
    } else if (currentSection === "reading") {
        readingResponses.push(response);
    } else if (currentSection === "science") {
        scienceResponses.push(response);
    }

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        if (questionDifficulty === "easy") {
            score += 1;
        } else if (questionDifficulty === "medium") {
            score += 2;
        } else if (questionDifficulty === "hard") {
            score += 3;
        }
        categoryStats[questionCategory].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats[questionCategory].incorrect++;
    }

    // Save the results after each answer
    recordTestResults();

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.disabled = false;
}

function recordTestResults() {
    let storedResults = localStorage.getItem("actTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};

    if (typeof results !== "object" || Array.isArray(results)) {
        results = {};
    }

    // Update actTestResults with the current categoryStats
    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }

        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }

    localStorage.setItem("actTestResults", JSON.stringify(results));
    console.log("Updated actTestResults:", results);
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function startQuiz(questions) {
    if (!questions || questions.length === 0) {
        console.error("No questions available for", currentSection);
        return;
    }
    const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
    if (missingPassages.length > 0 && currentSection !== "math") {
        console.warn(`Warning: ${missingPassages.length} questions in ${currentSection} lack a valid passage`);
    }
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {}; // Reset categoryStats at the start of a new section
    selectedQuestions = questions;
    nextButton.innerHTML = "Next";

    // Reset layout classes
    document.querySelector(".question-row").classList.remove("score-display");

    // Add section-specific class
    const questionRow = document.querySelector(".question-row");
    questionRow.classList.remove("english-section", "math-section", "reading-section", "science-section");
    questionRow.classList.add(`${currentSection}-section`);

    showQuestion();
}

// Update section-ending functions to reset categoryStats after each section
function endEnglishSection() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
    categoryStats = {}; // Reset at the end of the section
}

function endMathSection() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
    categoryStats = {}; // Reset at the end of the section
}

function endReadingSection() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
    categoryStats = {}; // Reset at the end of the section
}

function endScienceSection() {
    clearInterval(refreshIntervalId);
    resetState();
    showFinalScore();
    categoryStats = {}; // Reset at the end of the section
}