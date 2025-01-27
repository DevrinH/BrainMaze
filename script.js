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
        
        question: " The recovery of southern sea otters appears to have taken an upturn, according to results from the annual California sea otter survey released by the U.S. Geological Survey. Yet despite an overall increase in sea otter abundance, sharks have been “taking a bite” out of the portion of the population that could fuel expansion into new areas.<br/><br/>“There’s much more to the story here than the main finding would suggest,” said Dr. Tim Tinker, a research ecologist who leads the USGS sea otter research program. “We are looking into various factors that may be affecting the survey results, including a boom in urchin abundance from Big Sur to Monterey that may explain the uptick in numbers in the range center, and high levels of shark bite mortality that are likely responsible for continued declines at the north and south ends of the range.<br/><br/>This year’s survey results suggest an increasing trend over the last five years of almost 2 percent per year and the population index, a statistical representation of the entire population calculated as the three-year running average of census counts, has climbed to 3,054 from 2,711 in 2010. The growth is accounted for by an unexpected jump in numbers in the center of the sea otter’s range, an area that spans from Monterey south to Cambria.<br/><br/>While the population index continues to trend upward, the northern and southern subsets of the population continue a five-year decline, dropping 2 percent and 3.4 percent per year, respectively, numbers consistent with increased shark bite induced mortality in these same areas.<br/><br/>Since the 1980s, USGS scientists have computed the annual population index and evaluated trends in the southern sea otter, “Enhydra lutris nereis,” a federally listed threatened species found in California. For southern sea otters to be considered for removal from threatened species listing under the Endangered Species Act, the population index would have to exceed 3,090 for three consecutive years.<br/><br/>Question:<br/>The passage characterizes the main finding of the 2015 sea otter survey conducted by the US Geological Survey as",
       
        answers: [
            { text: "initially promising, because it shows that the southern sea otter will not become an endangered species.", correct: false},
            { text: "very significant, because it validates the recent efforts of sea otter conservation groups working along the California coast.", correct: false},
            { text: "ultimately inconclusive, because it does not incorporate data from sea otter population surveys conducted before 2010.", correct: false},
            { text: "somewhat misleading, because it does not make it clear that the southern sea otter population trends varied throughout the range.", correct: true},
        ]
    },
    {
        question: " The recovery of southern sea otters appears to have taken an upturn, according to results from the annual California sea otter survey released by the U.S. Geological Survey. Yet despite an overall increase in sea otter abundance, sharks have been “taking a bite” out of the portion of the population that could fuel expansion into new areas.<br/><br/>“There’s much more to the story here than the main finding would suggest,” said Dr. Tim Tinker, a research ecologist who leads the USGS sea otter research program. “We are looking into various factors that may be affecting the survey results, including a boom in urchin abundance from Big Sur to Monterey that may explain the uptick in numbers in the range center, and high levels of shark bite mortality that are likely responsible for continued declines at the north and south ends of the range.<br/><br/>This year’s survey results suggest an increasing trend over the last five years of almost 2 percent per year and the population index, a statistical representation of the entire population calculated as the three-year running average of census counts, has climbed to 3,054 from 2,711 in 2010. The growth is accounted for by an unexpected jump in numbers in the center of the sea otter’s range, an area that spans from Monterey south to Cambria.<br/><br/>While the population index continues to trend upward, the northern and southern subsets of the population continue a five-year decline, dropping 2 percent and 3.4 percent per year, respectively, numbers consistent with increased shark bite induced mortality in these same areas.<br/><br/>Since the 1980s, USGS scientists have computed the annual population index and evaluated trends in the southern sea otter, “Enhydra lutris nereis,” a federally listed threatened species found in California. For southern sea otters to be considered for removal from threatened species listing under the Endangered Species Act, the population index would have to exceed 3,090 for three consecutive years.<br/><br/>Question:<br/>Which choice provides the best evidence for the answer to the previous question? <br/>Previous questions:<br/>The passage characterizes the main finding of the 2015 sea otter survey conducted by the US Geological Survey as",
       
        answers: [
            { text: "The first sentence of the first paragraph (“The recovery … Survey”)", correct: false},
            { text: "The first sentence of the second paragraph (“There’s … program”)", correct: true},
            { text: "The fourth paragraph (“While … areas”)", correct: false},
            { text: "The fifth paragraph (“Since … years”)", correct: false},
        ]
    },   
    {
        question: "The recovery of southern sea otters appears to have taken an upturn, according to results from the annual California sea otter survey released by the U.S. Geological Survey. Yet despite an overall increase in sea otter abundance, sharks have been “taking a bite” out of the portion of the population that could fuel expansion into new areas.<br/><br/>“There’s much more to the story here than the main finding would suggest,” said Dr. Tim Tinker, a research ecologist who leads the USGS sea otter research program. “We are looking into various factors that may be affecting the survey results, including a boom in urchin abundance from Big Sur to Monterey that may explain the uptick in numbers in the range center, and high levels of shark bite mortality that are likely responsible for continued declines at the north and south ends of the range.<br/><br/>This year’s survey results suggest an increasing trend over the last five years of almost 2 percent per year and the population index, a statistical representation of the entire population calculated as the three-year running average of census counts, has climbed to 3,054 from 2,711 in 2010. The growth is accounted for by an unexpected jump in numbers in the center of the sea otter’s range, an area that spans from Monterey south to Cambria.<br/><br/>While the population index continues to trend upward, the northern and southern subsets of the population continue a five-year decline, dropping 2 percent and 3.4 percent per year, respectively, numbers consistent with increased shark bite induced mortality in these same areas.<br/><br/>Since the 1980s, USGS scientists have computed the annual population index and evaluated trends in the southern sea otter, “Enhydra lutris nereis,” a federally listed threatened species found in California. For southern sea otters to be considered for removal from threatened species listing under the Endangered Species Act, the population index would have to exceed 3,090 for three consecutive years.<br/><br/>Question:<br/>As used at the end of the first paragraph, “fuel” most nearly means",
        answers: [
            { text: "stimulate", correct: true},
            { text: "reinforce", correct: false},
            { text: "support", correct: false},
            { text: "provide", correct: false},
        ]
    },
    {
        question: "The recovery of southern sea otters appears to have taken an upturn, according to results from the annual California sea otter survey released by the U.S. Geological Survey. Yet despite an overall increase in sea otter abundance, sharks have been “taking a bite” out of the portion of the population that could fuel expansion into new areas.<br/><br/>“There’s much more to the story here than the main finding would suggest,” said Dr. Tim Tinker, a research ecologist who leads the USGS sea otter research program. “We are looking into various factors that may be affecting the survey results, including a boom in urchin abundance from Big Sur to Monterey that may explain the uptick in numbers in the range center, and high levels of shark bite mortality that are likely responsible for continued declines at the north and south ends of the range.<br/><br/>This year’s survey results suggest an increasing trend over the last five years of almost 2 percent per year and the population index, a statistical representation of the entire population calculated as the three-year running average of census counts, has climbed to 3,054 from 2,711 in 2010. The growth is accounted for by an unexpected jump in numbers in the center of the sea otter’s range, an area that spans from Monterey south to Cambria.<br/><br/>While the population index continues to trend upward, the northern and southern subsets of the population continue a five-year decline, dropping 2 percent and 3.4 percent per year, respectively, numbers consistent with increased shark bite induced mortality in these same areas.<br/><br/>Since the 1980s, USGS scientists have computed the annual population index and evaluated trends in the southern sea otter, “Enhydra lutris nereis,” a federally listed threatened species found in California. For southern sea otters to be considered for removal from threatened species listing under the Endangered Species Act, the population index would have to exceed 3,090 for three consecutive years.<br/><br/>Question:<br/>The author most likely includes Dr. Tinker's comments in the second paragraph of Passage 2 in order to",
        answers: [
            { text: "provide hypotheses that would explain the results of an ongoing study.", correct: false},
            { text: "discredit the findings of a controversial experiment.", correct: false},
            { text: "suggest an alternative interpretation of a surprising discovery.", correct: false},
            { text: "encourage further study of sea otters to resolve a discrepancy.", correct: true},
        ]
    },
    {
        question: "The impression that the town meetings of Colonial New England were free, democratic, and civilized is far too simplistic. For one thing, those who could vote did not include women, Black people, Line5 American Indians, and White men who did not own property. In the seventeenth century it was not 'the people' who ran the town meetings; it was the town selectmen. However, in early colonial Dedham, Line10 Massachusetts, there was a time when the townsfolk themselves actually made all the big decisions at town meetings. A great and noble experiment, it lasted all of three years and was abandoned by 1639, soon Line15 after the town was established. <br/><br/>Question:<br/>In lines 7-9 ('In…selectmen'), the author distinguishes between the",
        answers: [
            { text: "general population and a small group", correct: true},
            { text: "earliest colonizers and the earliest inhabitants", correct: false},
            { text: "rural population and the population of towns", correct: false},
            { text: "agricultural labor force and an aristocratic class", correct: false},
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

    location.href = "https://www.brainsmaze.com/math.html";

}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length && time > 0){
        handleNextButton();
        
    }else{
        localStorage.setItem("readingScore", score); 
        mathlink(); 
    }
});


startQuiz();
