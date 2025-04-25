// sat-untimed-test.js

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let userResponses = [];
let categoryStats = {};
let isMathTest = false;
let questionsProcessed = new Set();

const passageElement = document.getElementById("passage");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-test-btn");
const continueButton = document.getElementById("continue-btn");
const questionContainer = document.getElementById("question-container");
const breakMessage = document.getElementById("break-message");
const introContainer = document.getElementById("sat-intro-container");

const categoryMapping = {
    "inferences": "inferences",
    "command of evidence": "command-of-evidence",
    "algebra": "algebra",
    "advanced math": "advanced-math"
};

const readingWritingQuestions = [
    {
        passage: "The following passage is adapted from a 19th-century novel. The narrator describes a young woman named Clara who has recently moved to a small village. Clara was known for her reserved nature, often spending her days reading in the garden. However, she had a keen interest in the village's history, frequently asking the elders about past events. One elder remarked, 'Clara's curiosity about our traditions is refreshing—she listens more than she speaks, which is rare for someone her age.'",
        question: "What can be inferred about Clara's personality based on the passage?",
        answers: [
            { text: "She is outgoing and talkative.", correct: false },
            { text: "She is curious and reserved.", correct: true },
            { text: "She is disinterested in the village.", correct: false },
            { text: "She is impatient and impulsive.", correct: false }
        ],
        category: "inferences",
        difficulty: "easy"
    },
    {
        passage: "The following passage is adapted from a 19th-century novel. The narrator describes a young woman named Clara who has recently moved to a small village. Clara was known for her reserved nature, often spending her days reading in the garden. However, she had a keen interest in the village's history, frequently asking the elders about past events. One elder remarked, 'Clara's curiosity about our traditions is refreshing—she listens more than she speaks, which is rare for someone her age.'",
        question: "What can be inferred about the elder's opinion of younger people in general?",
        answers: [
            { text: "They are typically more curious than Clara.", correct: false },
            { text: "They often speak more than they listen.", correct: true },
            { text: "They are uninterested in traditions.", correct: false },
            { text: "They are disrespectful to elders.", correct: false }
        ],
        category: "inferences",
        difficulty: "medium"
    },
    {
        passage: "The following passage is adapted from a 20th-century essay on environmental conservation. The author writes, 'The rapid deforestation in the region has led to a 30% decline in local bird populations over the past decade. Studies show that these birds play a critical role in seed dispersal, which supports forest regeneration. Without intervention, the forest ecosystem may collapse within the next 20 years.'",
        question: "Which of the following statements from the passage best supports the claim that deforestation threatens the forest ecosystem?",
        answers: [
            { text: "The rapid deforestation in the region has led to a 30% decline in local bird populations over the past decade.", correct: false },
            { text: "Studies show that these birds play a critical role in seed dispersal, which supports forest regeneration.", correct: true },
            { text: "Without intervention, the forest ecosystem may collapse within the next 20 years.", correct: false },
            { text: "The author writes, 'The rapid deforestation in the region has led to a 30% decline in local bird populations.'", correct: false }
        ],
        category: "command of evidence",
        difficulty: "medium"
    },
    {
        passage: "The following passage is adapted from a 20th-century essay on environmental conservation. The author writes, 'The rapid deforestation in the region has led to a 30% decline in local bird populations over the past decade. Studies show that these birds play a critical role in seed dispersal, which supports forest regeneration. Without intervention, the forest ecosystem may collapse within the next 20 years.'",
        question: "Which of the following pieces of evidence from the passage most directly supports the idea that deforestation has measurable impacts?",
        answers: [
            { text: "The rapid deforestation in the region has led to a 30% decline in local bird populations over the past decade.", correct: true },
            { text: "Studies show that these birds play a critical role in seed dispersal, which supports forest regeneration.", correct: false },
            { text: "Without intervention, the forest ecosystem may collapse within the next 20 years.", correct: false },
            { text: "The author writes, 'The rapid deforestation in the region has led to a 30% decline in local bird populations.'", correct: false }
        ],
        category: "command of evidence",
        difficulty: "medium"
    }
];

const mathQuestions = [
    {
        passage: "",
        question: "Solve for x: 2x + 3 = 7",
        answers: [
            { text: "x = 1", correct: false },
            { text: "x = 2", correct: true },
            { text: "x = 3", correct: false },
            { text: "x = 4", correct: false }
        ],
        category: "algebra",
        difficulty: "easy"
    },
    {
        passage: "",
        question: "Solve the system of equations: y = 2x + 1, y = x + 3",
        answers: [
            { text: "x = 1, y = 3", correct: false },
            { text: "x = 2, y = 5", correct: true },
            { text: "x = 3, y = 7", correct: false },
            { text: "x = 0, y = 1", correct: false }
        ],
        category: "algebra",
        difficulty: "medium"
    },
    {
        passage: "",
        question: "What is the value of sin(π/3)?",
        answers: [
            { text: "1/2", correct: false },
            { text: "√2/2", correct: false },
            { text: "√3/2", correct: true },
            { text: "1", correct: false }
        ],
        category: "advanced math",
        difficulty: "hard"
    },
    {
        passage: "",
        question: "If f(x) = x² + 2x + 1, what is f(2)?",
        answers: [
            { text: "5", correct: false },
            { text: "7", correct: false },
            { text: "9", correct: true },
            { text: "11", correct: false }
        ],
        category: "advanced math",
        difficulty: "hard"
    }
];

function startReadingWritingTest() {
    isMathTest = false;
    userResponses = [];
    categoryStats = {};
    questionsProcessed.clear();
    localStorage.removeItem("testResults");
    startQuiz(readingWritingQuestions, 1, 3, 0);
}

function startMathTest() {
    isMathTest = true;
    userResponses = [];
    categoryStats = {};
    questionsProcessed.clear();
    startQuiz(mathQuestions, 1, 1, 2);
}

function startQuiz(questions, easyCount, mediumCount, hardCount) {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    selectedQuestions = [];

    const easyQuestions = questions.filter(q => q.difficulty === "easy").slice(0, easyCount);
    const mediumQuestions = questions.filter(q => q.difficulty === "medium").slice(0, mediumCount);
    const hardQuestions = questions.filter(q => q.difficulty === "hard").slice(0, hardCount);

    selectedQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    console.log("Selected questions:", selectedQuestions);

    introContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    passageElement.innerHTML = currentQuestion.passage;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    nextButton.disabled = true;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionCategory = currentQuestion.category.toLowerCase().replace(/\s+/g, "-");
    let questionDifficulty = currentQuestion.difficulty;

    questionCategory = categoryMapping[questionCategory] || questionCategory;

    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    const correctAnswer = currentQuestion.answers.find(ans => ans.correct).text;
    userResponses.push({
        question: currentQuestion.passage + "<br/><br/>" + currentQuestion.question,
        userAnswer: selectedBtn.innerHTML,
        correctAnswer: correctAnswer,
        wasCorrect: isCorrect
    });

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

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.classList.remove("hide");
    nextButton.disabled = false;
}

function handleNextButton() {
    const questionId = `${isMathTest ? 'math' : 'reading'}-${currentQuestionIndex}`;
    if (!questionsProcessed.has(questionId)) {
        recordTestResults();
        questionsProcessed.add(questionId);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else if (!isMathTest) {
        showBreakMessage();
    } else {
        showFinalScore();
    }
}

function recordTestResults() {
    let storedResults = JSON.parse(localStorage.getItem("testResults")) || {};

    if (typeof storedResults !== "object" || Array.isArray(storedResults)) {
        storedResults = {};
    }

    console.log("Before updating testResults:", storedResults);

    for (let category in categoryStats) {
        if (!storedResults[category]) {
            storedResults[category] = { correct: 0, incorrect: 0 };
        }
        storedResults[category].correct = categoryStats[category].correct || 0;
        storedResults[category].incorrect = categoryStats[category].incorrect || 0;
        console.log(`Updated ${category} in testResults: correct=${storedResults[category].correct}, incorrect=${storedResults[category].incorrect}`);
    }

    localStorage.setItem("testResults", JSON.stringify(storedResults));
    console.log("After updating testResults:", storedResults);
}

function showBreakMessage() {
    let maxPossibleScore = (1 * 1) + (3 * 2) + (0 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    localStorage.setItem("readingScore", scaledScore);

    questionContainer.classList.add("hide");
    breakMessage.classList.remove("hide");
    saveHistoricalProgress();
}

function handleContinueButton() {
    breakMessage.classList.add("hide");
    startMathTest();
}

function showFinalScore() {
    resetState();

    let maxPossibleScore = (1 * 1) + (1 * 2) + (2 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    let readingScore = parseInt(localStorage.getItem("readingScore") || 0, 10);
    let mathScore = scaledScore;
    localStorage.setItem("mathScore", mathScore);

    let totalSATScore = readingScore + mathScore;

    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = { reading: readingScore, math: mathScore, total: totalSATScore };
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    questionContainer.classList.remove("hide");
    passageElement.innerHTML = "";
    questionElement.innerHTML = `<p><strong>Reading and Writing SAT Score:</strong> ${readingScore} / 800</p>
                                <p><strong>Math SAT Score:</strong> ${mathScore} / 800</p>
                                <p><strong>Total SAT Score:</strong> ${totalSATScore} / 1600</p>`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Review Incorrect Answers";
    nextButton.classList.remove("hide");
    nextButton.classList.add("centered-btn");

    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", showExplanations);

    saveHistoricalProgress();
}

function saveHistoricalProgress() {
    let storedResults = JSON.parse(localStorage.getItem("testResults")) || {};
    let satHistoricalProgress = JSON.parse(localStorage.getItem("satHistoricalProgress")) || {};
    let satPreviousProgress = JSON.parse(localStorage.getItem("satPreviousProgress")) || {};

    console.log("testResults in saveHistoricalProgress:", storedResults);

    Object.keys(satHistoricalProgress).forEach(category => {
        satPreviousProgress[category] = satHistoricalProgress[category];
    });
    localStorage.setItem("satPreviousProgress", JSON.stringify(satPreviousProgress));

    Object.keys(categoryMapping).forEach(originalCategory => {
        const mappedCategory = categoryMapping[originalCategory];
        const correct = storedResults[mappedCategory]?.correct || 0;
        const incorrect = storedResults[mappedCategory]?.incorrect || 0;
        const total = correct + incorrect;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        satHistoricalProgress[mappedCategory] = { percentage };
        console.log(`Updated ${mappedCategory} in satHistoricalProgress: ${percentage}% (correct=${correct}, incorrect=${inactive})`);
    });

    localStorage.setItem("satHistoricalProgress", JSON.stringify(satHistoricalProgress));
}

function showExplanations() {
    resetState();
    passageElement.innerHTML = "";
    questionElement.innerHTML = "";

    if (userResponses.length === 0) {
        questionElement.innerHTML = "No incorrect answers to review.";
        return;
    }

    const incorrectResponses = userResponses.filter(response => !response.wasCorrect);

    if (incorrectResponses.length === 0) {
        questionElement.innerHTML = "No incorrect answers to review.";
        return;
    }

    incorrectResponses.forEach((response, index) => {
        const explanationDiv = document.createElement("div");
        explanationDiv.classList.add("explanation");
        explanationDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${response.question}</p>
            <p><strong>Your Answer:</strong> ${response.userAnswer} <span class="incorrect">Incorrect</span></p>
            <p><strong>Correct Answer:</strong> ${response.correctAnswer}</p>
            <hr>
        `;
        questionElement.appendChild(explanationDiv);
    });
}

startButton.addEventListener("click", startReadingWritingTest);
nextButton.addEventListener("click", handleNextButton);
continueButton.addEventListener("click", handleContinueButton);