const questions = [
    {
        
        question: " Question 1 1<br>21<br>21<br>21<br>21<br>21<br>21<br>21<br>21<br>2",
       
        answers: [
            { text: "initially promising, because it shows that the southern sea otter will not become an endangered species.", correct: false},
            { text: "very significant, because it validates the recent efforts of sea otter conservation groups working along the California coast.", correct: false},
            { text: "ultimately inconclusive, because it does not incorporate data from sea otter population surveys conducted before 2010.", correct: false},
            { text: "somewhat misleading, because it does not make it clear that the southern sea otter population trends varied throughout the range.", correct: true},
        ]
    },
    {
        question: " Question 2 ",
       
        answers: [
            { text: "The first sentence of the first paragraph (“The recovery … Survey”)", correct: false},
            { text: "The first sentence of the second paragraph (“There’s … program”)", correct: true},
            { text: "The fourth paragraph (“While … areas”)", correct: false},
            { text: "The fifth paragraph (“Since … years”)", correct: false},
        ]
    },   
    {
        question: "",
        answers: [
            { text: "stimulate", correct: true},
            { text: "reinforce", correct: false},
            { text: "support", correct: false},
            { text: "provide", correct: false},
        ]
    },
    {
        question: "",
        answers: [
            { text: "provide hypotheses that would explain the results of an ongoing study.", correct: false},
            { text: "discredit the findings of a controversial experiment.", correct: false},
            { text: "suggest an alternative interpretation of a surprising discovery.", correct: false},
            { text: "encourage further study of sea otters to resolve a discrepancy.", correct: true},
        ]
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

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} a percentage of ${(score/questions.length)*100}%!`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
       

    }
}

function endtimer(){
    if(currentQuestionIndex === 3){
        
        console.log("nada")
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
        
    }else{
    
        startQuiz();
    }
});


startQuiz();
