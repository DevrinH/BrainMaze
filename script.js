const questions = [
    {
        
        question: " The recovery of southern sea otters appears to have taken an upturn, according to results from the annual California sea otter survey released by the U.S. Geological Survey. Yet despite an overall increase in sea otter abundance, sharks have been “taking a bite” out of the portion of the population that could fuel expansion into new areas.<br/><br/>“There’s much more to the story here than the main finding would suggest,” said Dr. Tim Tinker, a research ecologist who leads the USGS sea otter research program. “We are looking into various factors that may be affecting the survey results, including a boom in urchin abundance from Big Sur to Monterey that may explain the uptick in numbers in the range center, and high levels of shark bite mortality that are likely responsible for continued declines at the north and south ends of the range.<br/><br/>This year’s survey results suggest an increasing trend over the last five years of almost 2 percent per year and the population index, a statistical representation of the entire population calculated as the three-year running average of census counts, has climbed to 3,054 from 2,711 in 2010. The growth is accounted for by an unexpected jump in numbers in the center of the sea otter’s range, an area that spans from Monterey south to Cambria.<br/><br/>While the population index continues to trend upward, the northern and southern subsets of the population continue a five-year decline, dropping 2 percent and 3.4 percent per year, respectively, numbers consistent with increased shark bite induced mortality in these same areas.<br/><br/>Since the 1980s, USGS scientists have computed the annual population index and evaluated trends in the southern sea otter, “Enhydra lutris nereis,” a federally listed threatened species found in California. For southern sea otters to be considered for removal from threatened species listing under the Endangered Species Act, the population index would have to exceed 3,090 for three consecutive years.<br/><br/>Question:<br/>The passage characterizes the main finding of the 2015 sea otter survey conducted by the US Geological Survey as",
       
        answers: [
            { text: "initially promising, because it shows that the southern sea otter will not become an endangered species.", correct: false},
            { text: "very significant, because it validates the recent efforts of sea otter conservation groups working along the California coast.", correct: false},
            { text: "ultimately inconclusive, because it does not incorporate data from sea otter population surveys conducted before 2010.", correct: false},
            { text: "somewhat misleading, because it does not make it clear that the southern sea otter population trends varied throughout the range.", correct: true},
        ]
    },
    {
        question: "I like big boats?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },   
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "I like big boats?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
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
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
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


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();