const startingMinutes = 64;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60;
let refreshIntervalId = setInterval(updateCountdown, 1000);
let categoryStats = {}; // Tracks correct/incorrect per category

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time === 0) { 
        clearInterval(refreshIntervalId);
        endQuiz();
    } else {
        time--; 
    }
}

function endQuiz() {
    resetState();
    showScore();
}

setTimeout(endQuiz, 3840000);
updateCountdown();

const questions = [
    {
        question: "Question goes here?", 
        answers: [
            { text: "A) Answer", correct: false }, 
            { text: "B) Answer.", correct: true },
            { text: "C) Answer.", correct: false },
            { text: "D) Answer.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },
 {
            question: "Question goes here?", 
            answers: [
                { text: "A) Answer", correct: false }, 
                { text: "B) Answer.", correct: true },
                { text: "C) Answer.", correct: false },
                { text: "D) Answer.", correct: false },
            ],
            type: "reading",
            difficulty: "easy",
            category: "inference"
        },
        {
            question: "Question goes here?", 
            answers: [
                { text: "A) Answer", correct: false }, 
                { text: "B) Answer.", correct: true },
                { text: "C) Answer.", correct: false },
                { text: "D) Answer.", correct: false },
            ],
            type: "reading",
            difficulty: "easy",
            category: "inference"
        }
];

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};
    
    selectedQuestions = selectRandomQuestions(questions, Math.min(questions.length, 2));

    nextButton.innerHTML = "Next";
    showQuestion();
}
function selectRandomQuestions(questionPool, count) {
    let shuffled = questionPool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    updateProgressBar();
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let category = currentQuestion.category;
    let questionDifficulty = currentQuestion.difficulty;

    if (!categoryStats[category]) {
        categoryStats[category] = { correct: 0, incorrect: 0 };
    }

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        categoryStats[category].correct++;
        
        if (questionDifficulty === "easy") score += 1;
        else if (questionDifficulty === "medium") score += 2;
        else if (questionDifficulty === "hard") score += 3;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats[category].incorrect++;
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    localStorage.setItem("readingScore", scaledScore);
    localStorage.setItem("categoryStats", JSON.stringify(categoryStats));

    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = scaledScore;
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";

    document.getElementById("progress-bar").style.width = "100%";
    updateCategoryProgress();
}

function updateCategoryProgress() {
    Object.keys(categoryStats).forEach(category => {
        let correct = categoryStats[category].correct;
        let incorrect = categoryStats[category].incorrect;
        let total = correct + incorrect;
        let progress = total > 0 ? (correct / total) * 100 : 0;

        let progressBar = document.getElementById(`progress-${category}`);
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) {
        handleNextButton();
    } else {
        mathlink();
    }
});

function mathlink() {
    location.href = "https://www.brainjelli.com/math.html";
}

document.addEventListener("DOMContentLoaded", function () {
    startQuiz();
});


