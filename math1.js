let readScore = localStorage.getItem("readingScore");
let readingWritingScore = Number(readScore);

setTimeout(function() {

    showScore();
    
    }, 902000);
    
    const startingMinutes = 15;
    const countdownEl = document.getElementById('countdown');
    
    let time = startingMinutes * 60; //minutes * 60 seconds
    let refreshIntervalId = setInterval(updateCountdown, 1000);
    
    function updateCountdown(){
    
        const minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        const contdownEl = document.getElementById("f1"); 
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        time--;
    
        if (time < 0) { //stop the setInterval whe time = 0 for avoid negative time
            clearInterval(refreshIntervalId);
                        }
    
    
    
    };
    
updateCountdown();

const questions = [
    {
        
        question: "Maria is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% is applied to the room rate, and an additional onetime untaxed fee of $5.00 is charged by the hotel. Which of the following represents Maria’s total charge, in dollars, for staying x nights?",
       
        answers: [
            { text: "1.08(99.95 + 5)x", correct: false},
            { text: "1.08(99.95x + 5)", correct: false},
            { text: "(99.95 + 0.08x) + 5", correct: false},
            { text: "1.08(99.95x) + 5", correct: true},
        ]
    },
    {
        question: " x² + y² = 153<br/> y = −4x <br/><br/>If (x, y) is a solution to the system of equations above, what is the value of x²?",
       
        answers: [
            { text: "21", correct: false},
            { text: "9", correct: true},
            { text: "-9", correct: false},
            { text: "7", correct: false},
        ]
    },   
    {
        question: "The function f is defined by f(x) = 2x³ + 3x² + cx + 8, where c is a constant. In the xy-plane, the graph of f intersects the x-axis at the three points (−4, 0), (1/2, 0), and (p, 0). What is the value of c?",
        answers: [
            { text: "-18", correct: true},
            { text: "-2", correct: false},
            { text: "5", correct: false},
            { text: "9", correct: false},
        ]
    },
    {
        question: "A researcher wanted to know if there is an association between exercise and sleep for the population of 16-year-olds in the United States. She obtained survey responses from a random sample of 2000 United States 16-year-olds and found convincing evidence of a positive association between exercise and sleep. Which of the following conclusions is well supported by the data?",
        answers: [
            { text: "Using exercise and sleep as defined by the study, an increase in sleep is caused by an increase of exercise for 16-year-olds in the world.", correct: false},
            { text: "Using exercise and sleep as defined by the study, an increase in sleep is caused by an increase of exercise for 16-year-olds in the United States.", correct: false},
            { text: "There is a positive association between exercise and sleep for 16-year-olds in the world.", correct: false},
            { text: "There is a positive association between exercise and sleep for 16-year-olds in the United States.", correct: true},
        ]
    }

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let mathScore = 0;  //score

function startQuiz(){
    currentQuestionIndex = 0;
    mathScore = 0;  //score
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
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
        mathScore++; //score
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

function showScore(){
    resetState();
    questionElement.innerHTML = `Your math score is ${mathScore} out of ${questions.length} and your reading and writing score was ${readingWritingScore}!`; //score
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    return true;
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
function mathlink(){

    location.href = "https://www.brainsmaze.com/";

}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length && time > 0){
        handleNextButton();
        
    }else{
        
        mathlink(); 
    }
});


startQuiz();