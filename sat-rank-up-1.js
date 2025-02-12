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
        question: "Q1",
        answers: [
            { text: "Some bird species are capable of navigating vast distances without any visual guidance.", correct: false },
            { text: "Scientists have discovered that birds use Earth’s magnetic field to navigate long migrations.", correct: true },
            { text: "Bird migration patterns are unpredictable and vary based on seasonal factors.", correct: false },
            { text: "Birds use special proteins in their eyes to see at night and avoid getting lost.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "Q2",
        answers: [
            { text: "She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "She is eager to impress others and makes a confident entrance into the event.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "Q3",
        answers: [
            { text: "Green spaces in cities contribute to environmental and social well-being, but they face competition from urban development.", correct: true },
            { text: "City residents should prioritize parks and gardens over commercial expansion.", correct: false },
            { text: "Urban development should be halted to preserve more land for parks and gardens.", correct: false },
            { text: "Parks are primarily designed to reduce air pollution rather than serve a social purpose.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "Q4",
        answers: [
            { text: "Streetcars initially shaped urban expansion but later declined due to the popularity of automobiles.", correct: true },
            { text: "The decline of streetcars in the 20th century was due to a lack of public interest in public transportation.", correct: false },
            { text: "Modern cities have rejected streetcars in favor of more efficient transportation systems.", correct: false },
            { text: "Electric streetcars were not widely used in the 20th century and only gained popularity recently.", correct: false },
        ],
        type: "reading",
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
    localStorage.setItem("level1Score", percentageScore);

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
    continueButton.innerHTML = "Continue Anyway";
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






nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length && time > 0){
        handleNextButton();
        
    }else{
        localStorage.setItem("level1Score", Math.round((score / questions.length) * 100));
        mathlink(); 
    }
});


startQuiz();
