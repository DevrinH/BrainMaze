const startingMinutes = 8;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60; // No need for "+1", ensures exactly 64 minutes
let refreshIntervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time === 0) { 
        clearInterval(refreshIntervalId);
        endQuiz();  // ✅ Stops quiz when timer hits zero
    } else {
        time--; 
    }
}

// Function to handle quiz timeout
function endQuiz() {
    resetState();  // Removes answer buttons
    showScore();   // Shows final score immediately
}

// Automatically end test after 64 minutes (3,840,000 ms)
setTimeout(endQuiz, 480000);

updateCountdown();


const questionsData = {
    1: [
        { question: "The museum, which houses ancient artifacts from various civilizations, attract thousands of visitors every year.<br/>Which choice best corrects the underlined portion?", options: ["atracts", "attract", "have attracted", "are attracting"], answer: "attracts" },
        { question: "She was so engrossed in her book that she barely noticed when someone set next to her on the bench.<br/>Which choice best corrects the underlined portion?", options: ["set", "has set", "sits", "sat"], answer: "sat" },
        { question: "In order to successfully complete the project, the team must cooperate together and communicate effectively.<br/>Which choice best corrects the underlined portion?", options: ["cooperate together and talk efficiently", "cooperate alongside one another and communicate effectively", "cooperating together and communicating effectively","cooperate and communicate effectively"], answer: "cooperate and communicate effectively" },
        { question: "Bees play a crucial role in pollination, transferring pollen between flowers to facilitate plant reproduction. Without bees, many crops would struggle to produce fruit, leading to significant food shortages.<br/>What is the main idea of the passage?", options: ["Bees are dangerous insects that harm crops.", "Bees are essential for plant reproduction and food production.","Many plants can reproduce without pollination.", "Bees only pollinate flowers in specific regions."], answer: "Bees are essential for plant reproduction and food production.",  },
        { question: "The scientist's theory was initially met with skepticism, but over time, the evidence became incontrovertible.<br/>In this context, 'incontrovertible' most nearly means:", options: ["debatable", "complicated", "undeniable","confusing"], answer: "undeniable" },
        { question: "Lena carefully wrapped the gift in bright paper, tied a ribbon around it, and wrote a heartfelt note before placing it on the table with a smile.", options: ["She is unsure about whether the gift is appropriate.", "She regrets buying the gift.", "She is worried the recipient won’t like the gift.","She is excited about giving the gift."], answer: "She is excited about giving the gift." },
        { question: "What is the value of x in the equation 3x + 5 = 14?", options: ["2", "3", "4","5"], answer: "3" },
        { question: "A store is offering a 20% discount on a jacket that originally costs $50. What is the sale price of the jacket?", options: ["$30", "35", "$40","$45"], answer: "$40" },
        { question: "A rectangle has a length of 8 units and a width of 5 units. What is its area?", options: ["13 square units", "30 square units", "40 square units","80 square units"], answer:  "40 square units" }
        
        
    ],
    2: [
        { question: "The group of students ___ planning a trip to the museum next week.", options: ["is","are", "were", "have been"], answer: "is" },
        { question: "After the storm, the hikers had to find an ___ route because their usual path was blocked.", options: ["alternating", "alternate","alteration", "alternative"], answer: "alternative" },
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        
    ],
    3: [
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 9 + 6?", options: ["14", "15", "16"], answer: "15" }
    ],
    4: [
        { question: "What is 16 / 4?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is 9 + 6?", options: ["14", "15", "16"], answer: "15" }
    ],
    5: [
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