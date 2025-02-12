const startingMinutes = 8;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60; 
let refreshIntervalId = setInterval(updateCountdown, 1000);

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

// End quiz when timer runs out
function endQuiz() {
    resetState();
    showScore();
}

// Automatically stop test after 64 minutes
setTimeout(endQuiz, 480000);

updateCountdown();

const questions = [
    {
        question: "Q1",
        answers: [
            { text: "for having a life cycle that extends for as long as seventeen years before emerging from underground ", correct: false},
            { text: "because its life cycle extends as long as seventeen years before it emerges from underground", correct: false},
            { text: "in that its life cycle, extending for as long as seventeen years, ends with it emerging from underground", correct: false},
            { text: "because it has a life cycle that extends up to seventeen years before emerging from underground", correct: true},
        ],
        type: "writing",
        difficulty: "hard"
    },
    {
        question: "Q2?",
        answers: [
            { text: "pointing out the lack of accountability among those responsible for oversight ", correct: false},
            { text: "pointed out the lack of accountability among those responsible for oversight", correct: true},
            { text: "in addition, it pointed out how there was a lack of accountability among those responsible for oversight", correct: false},
            { text: "pointed out that a lack of accountability existed among those responsible for oversight", correct: false},
        ],
        type: "writing",
        difficulty: "hard"
    },
    {
        question: "Q3",
        answers: [
            { text: "for having a life cycle that extends for as long as seventeen years before emerging from underground ", correct: false},
            { text: "because its life cycle extends as long as seventeen years before it emerges from underground", correct: false},
            { text: "in that its life cycle, extending for as long as seventeen years, ends with it emerging from underground", correct: false},
            { text: "because it has a life cycle that extends up to seventeen years before emerging from underground", correct: true},
        ],
        type: "writing",
        difficulty: "hard"
    },
    {
        question: "Q4?",
        answers: [
            { text: "pointing out the lack of accountability among those responsible for oversight ", correct: false},
            { text: "pointed out the lack of accountability among those responsible for oversight", correct: true},
            { text: "in addition, it pointed out how there was a lack of accountability among those responsible for oversight", correct: false},
            { text: "pointed out that a lack of accountability existed among those responsible for oversight", correct: false},
        ],
        type: "writing",
        difficulty: "hard"
    },
    {
        question: "Q5?",
        answers: [
            { text: "pointing out the lack of accountability among those responsible for oversight ", correct: false},
            { text: "pointed out the lack of accountability among those responsible for oversight", correct: true},
            { text: "in addition, it pointed out how there was a lack of accountability among those responsible for oversight", correct: false},
            { text: "pointed out that a lack of accountability existed among those responsible for oversight", correct: false},
        ],
        type: "writing",
        difficulty: "hard"
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const nextLevelButton = document.getElementById("next-level");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;

    selectedQuestions = questions; // Use all questions for now

    nextButton.innerHTML = "Next";
    nextLevelButton.disabled = true; // Ensure button is disabled at start
    showQuestion();
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

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        score += 1; 
    } else {
        selectedBtn.classList.add("incorrect");
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

    let totalQuestions = selectedQuestions.length;
    let accuracy = (correctAnswers / totalQuestions) * 100;
    
    questionElement.innerHTML = `Score: ${score} / ${totalQuestions} <br/> Accuracy: ${accuracy.toFixed(2)}%`;

    nextButton.innerHTML = accuracy >= 80 ? "Continue to Next Level" : "Retry";
    nextButton.style.display = "block";

    document.getElementById("progress-bar").style.width = "100%";

    if (accuracy >= 80) {
        nextLevelButton.disabled = false; // Enable the next level button
    } else {
        nextLevelButton.disabled = true;  // Keep it disabled
    }
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
    if (!nextLevelButton.disabled) {
        location.href = "https://www.brainjelli.com/math.html";
    }
}

startQuiz();