const questionsData = {
    1: [
        { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 5 + 3?", options: ["7", "8", "9"], answer: "8" }
    ],
    2: [
        { question: "What is 10 - 2?", options: ["6", "8", "9"], answer: "8" },
        { question: "What is 4 x 3?", options: ["11", "12", "13"], answer: "12" }
    ],
    3: [
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 9 + 6?", options: ["14", "15", "16"], answer: "15" }
    ]
};

// Get the current level from localStorage (default to 1 if not set)
const currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;
const questions = questionsData[currentLevel]; // Load questions for the current level

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (option === currentQuestion.answer) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });

    updateProgressBar(); // Update progress bar
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
        score++;
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
    resetState();
    let percentageScore = Math.round((score / questions.length) * 100); // Calculate percentage score
    localStorage.setItem(`level${currentLevel}Score`, percentageScore); // Save dynamically per level

    if (percentageScore >= 75) {
        questionElement.innerHTML = `🎉 Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>✅ Great job! You can move on to the next section.`;
        localStorage.setItem(`level${currentLevel + 1}Unlocked`, "true"); // Unlock next level
    } else {
        questionElement.innerHTML = `❌ Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>⚠️ You need at least 75% to move on.<br>Would you like to try again or continue anyway?`;
    }

    // Create "Try Again" Button
    const tryAgainButton = document.createElement("button");
    tryAgainButton.innerHTML = "Try Again";
    tryAgainButton.classList.add("btn");
    tryAgainButton.onclick = () => startQuiz();

    // Create "Continue Anyway" Button
    const continueButton = document.createElement("button");
    continueButton.innerHTML = "Continue";
    continueButton.classList.add("btn");
    continueButton.onclick = () => location.href = "https://www.brainjelli.com/sat-rank-up-landing.html";

    // Display buttons
    answerButtons.appendChild(tryAgainButton);
    answerButtons.appendChild(continueButton);
    
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

function ranklink() {
    location.href = "https://www.brainjelli.com/sat-rank-up-landing.html";
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        ranklink(); // Ensure this points to the correct URL
    }
});

startQuiz();