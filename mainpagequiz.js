const questions = [
    {
        
        question: " Which of the following is the greatest in value?",
       
        answers: [
            { text: "5/2", correct: false},
            { text: "2.5", correct: false},
            { text: "2.555", correct: false},
            { text: "8/3", correct: true},
        ]
    },
    {
        question: "The new space telescope, designed to detect distant exoplanets, has already made groundbreaking discoveries. By analyzing atmospheric compositions, it can determine whether a planet might support life, ________ crucial data for future interstellar research.<br/>Which choice completes the text so that it conforms to the conventions of Standard English?",
       
        answers: [
            { text: "providing", correct: true },
            { text: "provides", correct: false },
            { text: "it provides", correct: false },
            { text: "which provides", correct: false }
        ]
    },   
    {
        question: "Historians often debate the extent to which technological advancements drive societal change. While some argue that new inventions merely reflect existing social needs, others contend that technology actively reshapes the way societies function. For instance, the printing press not only responded to a growing demand for books but also fueled a surge in literacy, transformed religious discourse, and altered political landscapes. Similarly, the rise of the internet has not just accommodated communication but has fundamentally changed how people interact, work, and access information. <br/> Which choice best states the main idea of the text?",
        answers: [
            { text: "Technological advancements primarily emerge as responses to preexisting societal needs.", correct: false },
            { text: "The printing press and the internet illustrate how technology influences society beyond its initial purpose.", correct: true },
            { text: "Inventions such as the printing press and the internet were inevitable given societal demands at the time.", correct: false },
            { text: "The main function of technology is to facilitate communication and information sharing.", correct: false }
        ]
    },
    {
        question: "A team of researchers is studying the effect of different light wavelengths on plant growth. They set up three groups of the same species of plants and expose them to different conditions. The first group is placed under white light, the second group under blue light, and the third group under red light. All plants are given the same amount of water, nutrients, and temperature conditions. After four weeks, the researchers measure the height of each plant.<br/>What is the independent variable in the experiment above?",
        answers: [
            { text: "The species of plant used.", correct: false },
            { text: "The amount of water given.", correct: false },
            { text: "The type of light the plants were exposed to.", correct: true },
            { text: "The duration of the experiment.", correct: false }
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
    nextButton.innerHTML = "Try Again";
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


