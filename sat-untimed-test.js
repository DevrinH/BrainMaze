document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const satIntroContainer = document.getElementById("sat-intro-container");
    const startTestButton = document.getElementById("start-test-btn");
    const continueButton = document.getElementById("continue-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let results = localStorage.getItem("satResults");
    results = results ? JSON.parse(results) : {};
    let currentSection = "reading";
    let readingScore = 0, writingScore = 0, mathScore = 0;

    // SAT-specific questions
    const readingQuestions = [
        {
            passage: "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades...",
            question: "What is the primary reason Clara is drawn to the house on Maple Street?",
            answers: [
                { text: "A) She wants to prove the house is haunted.", correct: false },
                { text: "B) She is researching Eliza Hawthorne’s life.", correct: true },
                { text: "C) She plans to renovate the property.", correct: false },
                { text: "D) She is following a family tradition.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "sat-reading-main-idea"
        },
    ];

    const writingQuestions = [
        {
            passage: "The community center buzzed with anticipation as the robotics team unveiled their project...",
            question: "Which punctuation correctly completes the sentence 'Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass'?",
            answers: [
                { text: "A) Aisha the team’s coder had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                { text: "B) Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: true },
                { text: "C) Aisha the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                { text: "D) Aisha, the team’s coder had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false }
            ],
            type: "writing",
            difficulty: "easy",
            category: "sat-writing-conventions"
        },
    ];

    const mathNoCalcQuestions = [
        {
            passage: "",
            question: "What is the value of x in the equation 3x + 7 = 22?",
            answers: [
                { text: "4", correct: false },
                { text: "5", correct: true },
                { text: "6", correct: false },
                { text: "7", correct: false }
            ],
            difficulty: "medium",
            category: "sat-math-algebra"
        },
    ];

    const mathWithCalcQuestions = [
        {
            passage: "",
            question: "If f(x) = x^2 + 3x - 4, what is f(2)?",
            answers: [
                { text: "8", correct: false },
                { text: "4", correct: false },
                { text: "6", correct: true },
                { text: "10", correct: false }
            ],
            difficulty: "medium",
            category: "sat-math-functions"
        },
    ];

    function startTest() {
        if (!satIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        satIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startReadingSection();
    }

    let readingResponses = [];
    let writingResponses = [];
    let mathNoCalcResponses = [];
    let mathWithCalcResponses = [];

    function startReadingSection() {
        currentSection = "reading";
        readingResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(readingQuestions);
    }

    function startWritingSection() {
        currentSection = "writing";
        writingResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(writingQuestions);
    }

    function startMathNoCalcSection() {
        currentSection = "math-no-calc";
        mathNoCalcResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.innerHTML = "";
        startQuiz(mathNoCalcQuestions);
    }

    function startMathWithCalcSection() {
        currentSection = "math-with-calc";
        mathWithCalcResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.innerHTML = "";
        startQuiz(mathWithCalcQuestions);
    }

    function endReadingSection() {
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endWritingSection() {
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathNoCalcSection() {
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathWithCalcSection() {
        resetState();
        showFinalScore();
    }

    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for", currentSection);
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0 && currentSection !== "math-no-calc" && currentSection !== "math-with-calc") {
            console.warn(`Warning: ${missingPassages.length} questions in ${currentSection} lack a valid passage`);
        }
        currentQuestionIndex = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        // Reset layout classes
        document.querySelector(".question-row").classList.remove("score-display");

        // Add section-specific class
        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("reading-section", "writing-section", "math-no-calc", "math-with-calc");
        questionRow.classList.add(`${currentSection}-section`);

        showQuestion();
    }

    // The rest of the functions (showQuestion, resetState, selectAnswer, showScore, etc.)
    // remain largely unchanged, except for replacing ACT references with SAT ones.

    // Initialize the test by showing the intro message
    showIntroMessage();
});