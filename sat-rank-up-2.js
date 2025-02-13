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
        question: "The group of students ___ planning a trip to the museum next week.",
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
        question: "After the storm, the hikers had to find an ___ route because their usual path was blocked.",
        answers: [
            { text: "alternative", correct: true },
            { text: "alternating", correct: false },
            { text: "alternate", correct: false },
            { text: "alteration", correct: false },
        ],
        type: "writing",
        difficulty: "easy"
    },
    {
        question: 'The scientist conducted an experiment in order to test out a new hypothesis. Which choice best improves the sentence?',
        answers: [
            { text: "The scientist conducted an experiment for testing out a new hypothesis.", correct: false },
            { text: "The scientist did an experiment to test a new hypothesis.", correct: false },
            { text: "The scientist conducted an experiment to test a new hypothesis.", correct: true },
            { text: "The scientist performed an experiment in order to test out a new hypothesis.", correct: false },
        ],
        type: "writing",
        difficulty: "easy"
    },
    {
        question: "What is the main idea of the passage? 'Marie Curie’s groundbreaking research on radioactivity not only earned her two Nobel Prizes but also paved the way for advancements in medicine and energy. Her discoveries laid the foundation for modern cancer treatments and nuclear power generation.'",
        answers: [
            { text: "Marie Curie won two Nobel Prizes but faced many challenges.", correct: false },
            { text: "Marie Curie’s research significantly impacted medicine and energy.", correct: true },
            { text: "The dangers of radioactivity were unknown during Marie Curie’s time.", correct: false },
            { text: "Marie Curie was the only scientist working on radioactivity.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "In this context, 'acquiesced' most nearly means: 'Despite his initial reluctance, James ultimately acquiesced to his friend’s request to join the debate team.'",
        answers: [
            { text: "refused", correct: false },
            { text: "agreed", correct: true },
            { text: "suggested", correct: false },
            { text: "criticized", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "What can be inferred about Sarah? 'As she stood at the edge of the diving board, Sarah took a deep breath, her hands trembling slightly. Below, the water shimmered in the sunlight, both inviting and intimidating.'",
        answers: [
            { text: "She is an experienced diver.", correct: false },
            { text: "She is nervous about jumping.", correct: true },
            { text: "She prefers swimming to diving.", correct: false },
            { text: "She is afraid of the water.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "What is the value of x in the equation 4x - 6 = 10?",
        answers: [
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "4", correct: false },
            { text: "5", correct: true },
        ],
        type: "math",
        difficulty: "easy"
    },
    {
        question: "If 2/3 of a number is 12, what is the number?",
        answers: [
            { text: "16", correct: false },
            { text: "18", correct: true },
            { text: "20", correct: false },
            { text: "24", correct: false },
        ],
        type: "math",
        difficulty: "easy"
    },
    {
        question: "A triangle has a base of 10 units and a height of 6 units. What is its area?",
        answers: [
            { text: "20 square units", correct: false },
            { text: "30 square units", correct: true },
            { text: "40 square units", correct: false },
            { text: "60 square units", correct: false },
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
        
        // Ensure score is saved before moving to the next level
        localStorage.setItem("level2Score", percentageScore);
        console.log("Level 2 Score Saved:", percentageScore); // Debugging check

        // Unlock Level 3 if score is 75% or higher
        if (percentageScore >= 75) {
            localStorage.setItem("level3Unlocked", "true");
            console.log("Level 3 Unlocked!"); // Debugging check
        }

        // Delay redirection slightly to ensure localStorage is updated
        setTimeout(() => {
            ranklink();
        }, 500); // 0.5 second delay to allow storage to save
    }
});


startQuiz();