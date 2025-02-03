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
        
        question: "Throughout history, innovations in transportation have reshaped human civilization. The invention of the steam engine in the 18th century led to the expansion of railroads, allowing goods and people to travel faster than ever before. In the 20th century, the development of automobiles and airplanes further revolutionized travel, shrinking distances and connecting societies in unprecedented ways. Today, advancements in electric and autonomous vehicles promise to transform transportation yet again, raising questions about efficiency, sustainability, and the future of mobility.<br/><br/>Question:<br/>Which statement best summarizes the central idea of the passage?",
       
        answers: [
            { text: " Technological advancements in transportation have continuously shaped human society and will continue to do so.", correct: false},
            { text: "Railroads remain the most significant innovation in transportation history.", correct: true},
            { text: " The development of automobiles and airplanes has eliminated the need for future advancements in transportation.", correct: false},
            { text: "The primary goal of transportation innovations has always been to reduce travel costs rather than increase efficiency.", correct: false},
        ]
    },
    {
        question: "For decades, researchers have studied the migration patterns of monarch butterflies, which travel thousands of miles each year between North America and central Mexico. These delicate creatures rely on environmental cues, such as temperature and sunlight, to navigate their journey. However, recent changes in climate patterns have disrupted their migration, causing delays and shifts in their usual routes. Scientists warn that if these disruptions continue, monarch populations may decline significantly, threatening the stability of ecosystems that depend on them for pollination.<br/><br/>Question:<br/>Which choice provides the best evidence for the answer to the previous question? <br/>Previous questions:<br/>The passage characterizes the main finding of the 2015 sea otter survey conducted by the US Geological Survey as",
       
        answers: [
            { text: "Monarch butterflies are resilient creatures that can easily adapt to changes in their migration patterns.", correct: false},
            { text: "The annual migration of monarch butterflies is influenced by climate factors, which may pose a threat to their population.", correct: true},
            { text: "Scientists have successfully found ways to prevent disruptions in monarch butterfly migration despite climate change.", correct: false},
            { text: "The migration of monarch butterflies is primarily determined by their physical strength rather than environmental factors.", correct: false},
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
        question: "The study of space has fascinated humans for centuries, leading to groundbreaking discoveries about the universe. In the mid-20th century, the space race between the United States and the Soviet Union led to rapid advancements in space exploration, culminating in the Apollo 11 moon landing. Today, private companies are playing a larger role in space travel, developing reusable rockets and planning future missions to Mars. While space exploration continues to push technological boundaries, some critics argue that resources should be directed toward pressing issues on Earth instead.<br/><br/>Question:<br/>Which choice best summarizes the central idea of the passage?",
        answers: [
            { text: "Space exploration has evolved from government-led initiatives to significant private sector involvement, sparking both enthusiasm and debate.", correct: true},
            { text: "The Apollo 11 moon landing remains the most important event in space exploration history, with little progress made since.", correct: false},
            { text: " The primary goal of space exploration has always been to establish human colonies on other planets.", correct: false},
            { text: "Governments no longer invest in space exploration due to the dominance of private companies.", correct: false},
        ]
    },
    {
        question: "The impression that the town meetings of Colonial New England were free, democratic, and civilized is far too simplistic. For one thing, those who could vote did not include women, Black people, American Indians, and White men who did not own property. In the seventeenth century it was not 'the people' who ran the town meetings; it was the town selectmen. However, in early colonial Dedham, Massachusetts, there was a time when the townsfolk themselves actually made all the big decisions at town meetings. <mark>A great and noble experiment,</mark> it lasted all of three years and was abandoned by 1639, soon Line15 after the town was established. <br/><br/>Question:<br/>The author describes the 'experiment' in a tone that",
        answers: [
            { text: "general population and a small group", correct: false},
            { text: "enthusiastically reveals a startling discovery", correct: false},
            { text: "mildly scolds historians who support inaccurate interpretations", correct: false},
            { text: "gently mocks false notions about town meetings", correct: true},
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
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} (${(score / questions.length) * 100}%)!`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    
    // Set progress bar to 100% when finished
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
function mathlink(){

    location.href = "https://www.brainjelli.com/math.html";

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
        localStorage.setItem("readingScore", score); 
        mathlink(); 
    }
});


startQuiz();
