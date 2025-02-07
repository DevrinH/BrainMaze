const questions = [
    {
        
        question: " Which of the following is the greatest in value?",
       
        answers: [
            { text: "5/2", correct: false},
            { text: "2.5", correct: false},
            { text: "2.556", correct: false},
            { text: "8/3", correct: true},
        ]
    },
    {
        question: " The United Nations High Seas Treaty is a multilateral agreement that provides unprecedented protection for ocean areas that have no particular legal jurisdiction. Overfishing, seabed mining, and other exploitative measures will be blocked by the new ________ marine protected areas to be established with the support of multiple countries. Negotiated at the United Nations New York headquarters, the treaty was agreed upon by global ambassadors of marine affairs and foreign affairs.<br/>Which choice completes the text so that it conforms to the conventions of Standard English?",
       
        answers: [
            { text: "treaty. Enabling", correct: false},
            { text: "treaty, enabling", correct: true},
            { text: "treaty; enabling", correct: false},
            { text: "treaty — enabling", correct: false},
        ]
    },   
    {
        question: "Cats possess a remarkable ability that often goes unnoticed — their exceptional night vision. This unique trait is owed to the intricate structure of their eyes; cats' retinas are equipped with a higher percentage of rod cells — specialized photoreceptor cells sensitive to low light, compared to humans. This adaptation enables them to perceive objects in light levels six times dimmer than what a human requires to see clearly. As the sun sets and darkness envelops the landscape, these crepuscular creatures (animals more active during twilight hours) come alive, effortlessly navigating their surroundings with precision. <br/> Which choice best states the main idea of the text?",
        answers: [
            { text: "Cats’ retinas are more sensitive to low light, allowing them to see clearly in dimmer surroundings.", correct: false},
            { text: "Cats owe their night vision to their retinas which contain more rod cells than humans, enabling them to see in dim light levels.", correct: true},
            { text: "Crepuscular animals like cats are naturally more active during low light hours and hence require night vision to help them navigate better.", correct: false},
            { text: "A higher number of rod cells makes a cat’s retina more sensitive to light.", correct: false},
        ]
    },
    {
        question: "A group of scientists were studying the growth of bacteria. It is their hope that they will be able to induce the bacteria to grow and metabolize oil as a food source. They have taken three samples of Escherichia coli and are growing them on nutrient agar plates. The scientists used three conditions to test the E. coli bacteria. The first group was grown at 37°C on plain nutrient agar plates. The second group was grown at 37°C on plain nutrient agar plates with a 5% oil solution. The third group was grown at 37°C on plain nutrient agar plates with a 20% oil solution.",
        answers: [
            { text: "The type of bacteria used.", correct: false},
            { text: "The nutrient agar.", correct: false},
            { text: "The number of days the bacteria grew.", correct: false},
            { text: "The nutrient agar with oil.", correct: true},
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


