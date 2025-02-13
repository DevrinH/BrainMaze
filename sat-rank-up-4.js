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


const questions = [
    {
        question: "The collection of rare books ___ stored in a temperature-controlled room.",
        answers: [
            { text: "are", correct: false },
            { text: "is", correct: true },
            { text: "were", correct: false },
            { text: "have been", correct: false },
        ],
        type: "writing",
        difficulty: "easy"
    },
    {
        question: "To complete the science project, students must submit a report ___ their findings.",
        answers: [
            { text: "describing", correct: true },
            { text: "describes", correct: false },
            { text: "descriptive", correct: false },
            { text: "description", correct: false },
        ],
        type: "writing",
        difficulty: "easy"
    },
    {
        question: "Which choice best improves the sentence? 'The manager carefully analyzed the data before to make a decision.'",
        answers: [
            { text: "before making a decision.", correct: true },
            { text: "before to deciding.", correct: false },
            { text: "before he make a decision.", correct: false },
            { text: "before to make decision.", correct: false },
        ],
        type: "writing",
        difficulty: "easy"
    },
    {
        question: "What is the main idea of the passage? 'The Wright brothers revolutionized transportation by successfully inventing the first powered aircraft. Their innovations laid the foundation for modern aviation and changed how people travel around the world.'",
        answers: [
            { text: "The Wright brothers' work led to modern aviation.", correct: true },
            { text: "The Wright brothers flew the longest flight in history.", correct: false },
            { text: "The Wright brothers only made minor contributions to aviation.", correct: false },
            { text: "The Wright brothers' airplane was never successful.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "In this context, 'apprehensive' most nearly means: 'As the roller coaster climbed to its highest point, Jake felt apprehensive about the upcoming drop.'",
        answers: [
            { text: "nervous", correct: true },
            { text: "excited", correct: false },
            { text: "angry", correct: false },
            { text: "confused", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "What can be inferred about Lisa? 'Lisa glanced at her watch and quickened her pace, weaving through the crowded streets as she clutched the invitation tightly in her hand.'",
        answers: [
            { text: "She is running late for an event.", correct: true },
            { text: "She is lost in an unfamiliar place.", correct: false },
            { text: "She is afraid of the crowd.", correct: false },
            { text: "She forgot her invitation.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "Solve for x: 5x + 3 = 18",
        answers: [
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
        ],
        type: "math",
        difficulty: "easy"
    },
    {
        question: "A rectangular garden has a length of 12 feet and a width of 5 feet. What is its area?",
        answers: [
            { text: "17 square feet", correct: false },
            { text: "24 square feet", correct: false },
            { text: "60 square feet", correct: true },
            { text: "120 square feet", correct: false },
        ],
        type: "math",
        difficulty: "easy"
    },
    {
        question: "A book originally costs $30 and is on sale for 25% off. What is the sale price?",
        answers: [
            { text: "$20", correct: false },
            { text: "$22.50", correct: true },
            { text: "$25", correct: false },
            { text: "$27", correct: false },
        ],
        type: "math",
        difficulty: "easy"
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
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

    updateProgressBar(); // Update progress bar
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    let percentageScore = Math.round((score / questions.length) * 100); // ✅ Rounds to the nearest whole number

    // Save percentage score in localStorage
    localStorage.setItem("level3Score", percentageScore);

    if (percentageScore >= 75) {
        questionElement.innerHTML = `🎉 Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>✅ Great job! You can move on to the next section.`;
    } else {
        questionElement.innerHTML = `❌ Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>⚠️ You need at least 75% to move on.<br>Would you like to try again or continue anyway?`;
    }

    // Create "Try Again" Button
    const tryAgainButton = document.createElement("button");
    tryAgainButton.innerHTML = "Try Again";
    tryAgainButton.classList.add("btn");
    tryAgainButton.onclick = () => startQuiz(); // Restart the quiz

    // Create "Continue Anyway" Button
    const continueButton = document.createElement("button");
    continueButton.innerHTML = "Continue";
    continueButton.classList.add("btn");
    continueButton.onclick = () => ranklink(); // Move to the next section

    // Display buttons
    answerButtons.appendChild(tryAgainButton);
    answerButtons.appendChild(continueButton);
    
    document.getElementById("progress-bar").style.width = "100%";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length && time > 0){
        showQuestion();
    }else{
        showScore();
        endtimer();
        clearInterval(refreshIntervalId);
    }
}

function endtimer(){
    if(currentQuestionIndex === 3){
        
        console.log("nada")
    }
}
function ranklink(){

    location.href = "https://www.brainjelli.com/sat-rank-up-landing.html";

}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}






nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length && time > 0) {
        handleNextButton();
    } else {
        let percentageScore = Math.round((score / questions.length) * 100);
        localStorage.setItem("level3Score", percentageScore); // Save Level 2 score

        // Check if the user qualifies to unlock Level 3
        if (percentageScore >= 75) {
            localStorage.setItem("level5Unlocked", "true"); // Unlock Level 3 permanently
        }

        ranklink(); // Move to the next page
    }
});


startQuiz();