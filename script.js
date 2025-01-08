const questions = [
    {

    question: "Which is the largest anmal in the world?"
    answers:[
    {text:"Shark", Correct: false},
    {text:"Blue whale", Correct: true},
    {text:"Elephant", Correct: false},
    {text:"Giraffe", Correct: false},
            ]
    },
    {
        question: "Which is the largest anmal in the world?"
        answers:[
        {text:"Shark", Correct: false},
        {text:"Blue whale", Correct: true},
        {text:"Elephant", Correct: false},
        {text:"Giraffe", Correct: false},
                ]  
    },      
    {

        question: "Which is the largest desert in the world?"
        answers:[
        {text:"Kalahari", Correct: false},
        {text:"Gobi", Correct: false},
        {text:"Sahara", Correct: false},
        {text:"Antartica", Correct: true},
                ]
        },
        {
            question: "Which is the smallest continent in the world?"
            answers:[
            {text:"Asia", Correct: false},
            {text:"Australia", Correct: true},
            {text:"Arctic", Correct: false},
            {text:"Africa", Correct: false},
                    ]  
        } 
];

const questionElement = document.getElementByI("question");
const answerButton = document.getElementByI("answer-button");
const nextButton = document.getElementByI("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startSattesttimed(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
questionElement.innerHTML = questionNo + "." + currentQuestion.question;

currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);

});
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }



}


startSattesttimed();