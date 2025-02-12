const startingMinutes = 8;
const countdownEl = document.getElementById("countdown");

let time = startingMinutes * 60;
let refreshIntervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time === 0) {
        clearInterval(refreshIntervalId);
        endQuiz();
    } else {
        time--;
    }
}

// Automatically stop test after 8 minutes
setTimeout(endQuiz, 480000);

const questions = [
    {
        question: "Q1",
        answers: [
            { text: "Wrong Answer", correct: false },
            { text: "Right Answer", correct: true },
            { text: "Wrong Answer", correct: false },
            { text: "Wrong Answer", correct: false }
        ]
    },
    {
        question: "Q2?",
        answers: [
            { text: "Wrong Answer", correct: false },
            { text: "Right Answer", correct: true },
            { text: "Wrong Answer", correct: false },
            { text: "Wrong Answer", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    nextButton.style.display = "none"; // Hide "Next" button initially
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });

    updateProgressBar();
}

function resetState() {
    nextButton.style.display = "none"; // Hide "Next" button until an answer is selected
    answerButtons.innerHTML = ""; // Clear old answer buttons
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Show correct answer after selection
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block"; // Show "Next" button after answering
}

function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let totalQuestions = questions.length;
    let accuracy = (correctAnswers / totalQuestions) * 100;

    questionElement.innerHTML = `Score: ${score} / ${totalQuestions} <br/> Accuracy: ${accuracy.toFixed(2)}%`;

    nextButton.innerHTML = accuracy >= 80 ? "Continue to Next Level" : "Retry";
    nextButton.style.display = "block";

    document.getElementById("progress-bar").style.width = "100%";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

// ✅ FIX: Now, the next button properly advances the quiz.
nextButton.addEventListener("click", handleNextButton);

startQuiz();