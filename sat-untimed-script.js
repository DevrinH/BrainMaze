const explanation = [
    {
        explanation: "The author acknowledges both the benefits and concerns associated with AI, indicating a balanced and cautiously optimistic perspective.",
      
    },
    {
        explanation: "The passage describes how the highway increased business activity (a benefit) but also led some residents to feel that the town’s peaceful atmosphere had been lost (a drawback). This suggests a mixed impact, making choice B the best answer.",
       
    },
    {
        explanation: "Which is the largest desert in the world?",
       
    },
    {
        explanation: "Which is the smallest continent in the world?",

    }  
];

const questions = [
    {
        
        question: "The rapid advancement of artificial intelligence (AI) has led to significant changes in various industries. While some experts highlight the efficiency and innovation brought by AI, others express concerns about potential job displacement and ethical considerations.<br/>The author's attitude toward artificial intelligence can best be described as: ",
       
        answers: [
            { text: "Uncritically supportive", correct: false},
            { text: "Cautiously optimistic ", correct: true},
            { text: " Indifferent.", correct: false},
            { text: "Overwhelmingly negative", correct: false},
        ]
    },
    {
        question: "The small town had long been known for its quiet charm, but the recent construction of a major highway nearby brought unexpected changes. Local businesses saw an increase in customers, yet some longtime residents lamented the loss of the town’s peaceful atmosphere.<br/>Question: <br/> Which choice best describes the impact of the highway on the town? ",
       
        answers: [
            { text: "It caused local businesses to struggle.", correct: false},
            { text: "It led to both benefits and drawbacks for the town.", correct: true},
            { text: " It was overwhelmingly positive for all residents.", correct: false},
            { text: "It had no significant effect on the town’s character.", correct: false},
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
        question: "The impression that the town meetings of Colonial New England were free, democratic, and civilized is far too simplistic. For one thing, those who could vote did not include women, Black people, American Indians, and White men who did <mark>not own property. In the seventeenth century it was not 'the people' who ran the town meetings; it was the town selectmen.</mark> However, in early colonial Dedham, Massachusetts, there was a time when the townsfolk themselves actually made all the big decisions at town meetings. A great and noble experiment, it lasted all of three years and was abandoned by 1639, soon after the town was established. <br/><br/>Question:<br/>In the highlighted portions('In…selectmen'), the author distinguishes between the",
        answers: [
            { text: "objectively summarizes crucial events in a typical town", correct: true},
            { text: "earliest colonizers and the earliest inhabitants", correct: false},
            { text: "rural population and the population of towns", correct: false},
            { text: "agricultural labor force and an aristocratic class", correct: false},
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

let currentExplanationIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let explanationElement = document.getElementById("explanation"); //explain

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

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    explanationElement.style.display = "none";  // Hide explanation
    explanationElement.textContent = "";  // Clear explanation text
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        explanationElement.textContent = explanation[currentQuestionIndex].explanation; // Fix this line
    }
    
    explanationElement.style.display = "block"; // Show explanation

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
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
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
        localStorage.setItem("readingScore", score);  // Move storage here
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}


nextButton.addEventListener("click", handleNextButton);

startQuiz();