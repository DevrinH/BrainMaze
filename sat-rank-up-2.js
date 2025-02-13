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
        question: "QThe museum, which houses ancient artifacts from various civilizations, attract thousands of visitors every year.<br/>Which choice best corrects the underlined portion?",
        answers: [
            { text: "attract", correct: false },
            { text: "attracts", correct: true },
            { text: "have attracted", correct: false },
            { text: " are attracting", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "She was so engrossed in her book that she barely noticed when someone set next to her on the bench.<br/>Which choice best corrects the underlined portion?",
        answers: [
            { text: "set", correct: false },
            { text: "sat", correct: true },
            { text: "has set", correct: false },
            { text: "sits", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "In order to successfully complete the project, the team must cooperate together and communicate effectively.<br/>Which choice best corrects the underlined portion?",
        answers: [
            { text: " cooperate and communicate effectively", correct: true },
            { text: "cooperate together and talk efficiently", correct: false },
            { text: "cooperate alongside one another and communicate effectively", correct: false },
            { text: "cooperating together and communicating effectively", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "Bees play a crucial role in pollination, transferring pollen between flowers to facilitate plant reproduction. Without bees, many crops would struggle to produce fruit, leading to significant food shortages.<br/>What is the main idea of the passage?",
        answers: [
            { text: "Bees are dangerous insects that harm crops.", correct: false },
            { text: "Bees are essential for plant reproduction and food production.", correct: true },
            { text: "Many plants can reproduce without pollination.", correct: false },
            { text: "Bees only pollinate flowers in specific regions.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "The scientist's theory was initially met with skepticism, but over time, the evidence became incontrovertible.<br/>In this context, 'incontrovertible' most nearly means:",
        answers: [
            { text: "debatable", correct: false },
            { text: "debatable", correct: true },
            { text: "complicated", correct: false },
            { text: "confusing", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },    
    {
        question: "Lena carefully wrapped the gift in bright paper, tied a ribbon around it, and wrote a heartfelt note before placing it on the table with a smile.",
        answers: [
            { text: "She is excited about giving the gift.", correct: true },
            { text: "She is unsure about whether the gift is appropriate.", correct: false },
            { text: "She regrets buying the gift.", correct: false },
            { text: "She is worried the recipient won’t like the gift.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },    
    {
        question: "What is the value of x in the equation 3x + 5 = 14?",
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
        question: "A store is offering a 20% discount on a jacket that originally costs $50. What is the sale price of the jacket?",
        answers: [
            { text: "$30", correct: false },
            { text: "$35", correct: false },
            { text: "$40", correct: true },
            { text: "$45", correct: false },
        ],
        type: "math",
        difficulty: "easy"
    },
    {
        question: "A rectangle has a length of 8 units and a width of 5 units. What is its area?",
        answers: [
            { text: "13 square units", correct: false },
            { text: "30 square units", correct: false },
            { text: "40 square units", correct: true },
            { text: "80 square units", correct: false },
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
    localStorage.setItem("level2Score", percentageScore);

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
        localStorage.setItem("level2Score", percentageScore); // Save Level 2 score

        // Check if the user qualifies to unlock Level 3
        if (percentageScore >= 75) {
            localStorage.setItem("level3Unlocked", "true"); // Unlock Level 3 permanently
        }

        ranklink(); // Move to the next page
    }
});


startQuiz();