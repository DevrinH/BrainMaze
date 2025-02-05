const explanation = [
    {
        explanation: "The author acknowledges both the benefits and concerns associated with AI, indicating a balanced and cautiously optimistic perspective.",
      
    },
    {
        explanation: "The passage describes how the highway increased business activity (a benefit) but also led some residents to feel that the town’s peaceful atmosphere had been lost (a drawback). This suggests a mixed impact, making choice B the best answer.",
       
    },
    {
        explanation: "(The passage highlights the library's role in preserving manuscripts and fostering advancements in various fields, indicating its function as a cultural and educational institution.)",
       
    },
    {
        explanation: "(The passage emphasizes that access to parks and gardens significantly enhances residents' mental well-being.)",

    },  
    {
        explanation: "The passage focuses on how monarch butterflies rely on environmental cues for migration and how climate change has disrupted their patterns. It also warns that continued disruptions could threaten their population. Answer choice D captures this key idea, making it the best choice. <br/> A is incorrect because the passage suggests that monarchs are struggling with climate disruptions rather than easily adapting.<br/>B is incorrect because the passage does not state that scientists have found solutions to prevent these disruptions.<br/>C is incorrect because the passage emphasizes environmental factors rather than physical strength as the primary influence on migration.",

    },
    {
        explanation: "The passage discusses how innovations in transportation—from steam engines to modern autonomous vehicles—have historically transformed human civilization and continue to drive change. Answer choice A accurately captures this theme.<br/>B is incorrect because the passage does not claim railroads are the most significant innovation; it discusses multiple advancements.<br/>C is incorrect because the passage suggests that transportation continues to evolve rather than being finalized.<br/>D is incorrect because, while efficiency is mentioned, the passage does not state that reducing costs has always been the primary goal.",

    } 
];

const questions = [
    {
        
        question: "The rapid advancement of artificial intelligence (AI) has led to significant changes in various industries. While some experts highlight the efficiency and innovation brought by AI, others express concerns about potential job displacement and ethical considerations.<br/><br/>Question: <br/>The author's attitude toward artificial intelligence can best be described as: ",
       
        answers: [
            { text: "Uncritically supportive", correct: false},
            { text: "Cautiously optimistic ", correct: true},
            { text: " Indifferent.", correct: false},
            { text: "Overwhelmingly negative", correct: false},
        ]
    },
    {
        question: "The small town had long been known for its quiet charm, but the recent construction of a major highway nearby brought unexpected changes. Local businesses saw an increase in customers, yet some longtime residents lamented the loss of the town’s peaceful atmosphere.<br/><br/>Question: <br/> Which choice best describes the impact of the highway on the town? ",
       
        answers: [
            { text: "It caused local businesses to struggle.", correct: false},
            { text: "It led to both benefits and drawbacks for the town.", correct: true},
            { text: " It was overwhelmingly positive for all residents.", correct: false},
            { text: "It had no significant effect on the town’s character.", correct: false},
        ]
    },   
    {
        question: "The ancient city of Alexandria was renowned for its vast library, which attracted scholars from across the world. This center of learning not only preserved countless manuscripts but also fostered significant advancements in science, philosophy, and literature.<br/><br/>Question:<br/>Based on the passage, the Library of Alexandria is best described as:",
        answers: [
            { text: "A commercial hub for international traders", correct: false},
            { text: "A military fortress protecting the city", correct: false},
            { text: " A cultural institution promoting knowledge", correct: true,},
            { text: "A political center for governmental affairs", correct: false},
        ]
    },
    {
        question: "The recent study on urban green spaces revealed that access to parks and gardens significantly enhances residents' mental well-being. The researchers found that individuals living near these areas reported lower stress levels and improved mood compared to those without such access.<br/><br/>Question:<br/>According to the passage, what is the primary benefit of urban green spaces for residents?",
        answers: [
            { text: " Increased physical activity", correct: false},
            { text: "Enhanced mental well-being", correct: true},
            { text: "Improved air quality", correct: false},
            { text: "Greater social interaction", correct: false},
        ]
    },
    {
        question: "For decades, researchers have studied the migration patterns of monarch butterflies, which travel thousands of miles each year between North America and central Mexico. These delicate creatures rely on environmental cues, such as temperature and sunlight, to navigate their journey. However, recent changes in climate patterns have disrupted their migration, causing delays and shifts in their usual routes. Scientists warn that if these disruptions continue, monarch populations may decline significantly, threatening the stability of ecosystems that depend on them for pollination. <br/><br/>Question:<br/>Which statement best summarizes the central idea of the passage?",
        answers: [
            { text: "Monarch butterflies are resilient creatures that can easily adapt to changes in their migration patterns.", correct: false},
            { text: " Scientists have successfully found ways to prevent disruptions in monarch butterfly migration despite climate change.", correct: false},
            { text: "The migration of monarch butterflies is primarily determined by their physical strength rather than environmental factors.", correct: false},
            { text: "The annual migration of monarch butterflies is influenced by climate factors, which may pose a threat to their population", correct: true},
        ]
    },
    {
        question: "Throughout history, innovations in transportation have reshaped human civilization. The invention of the steam engine in the 18th century led to the expansion of railroads, allowing goods and people to travel faster than ever before. In the 20th century, the development of automobiles and airplanes further revolutionized travel, shrinking distances and connecting societies in unprecedented ways. Today, advancements in electric and autonomous vehicles promise to transform transportation yet again, raising questions about efficiency, sustainability, and the future of mobility. <br/><br/>Question:<br/>Which choice best expresses the main idea of the passage?",
        answers: [
            { text: "Technological advancements in transportation have continuously shaped human society and will continue to do so.", correct: false},
            { text: "Railroads remain the most significant innovation in transportation history.", correct: false},
            { text: "The development of automobiles and airplanes has eliminated the need for future advancements in transportation.", correct: false},
            { text: "The primary goal of transportation innovations has always been to reduce travel costs rather than increase efficiency.", correct: true},
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
var timer;
var elapsedTime = 0;  // Track elapsed time separately
var ele = document.getElementById('timer');

function startTimer() {
    elapsedTime = 0; // Reset time at the start
    timer = setInterval(() => {
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime % 60;

        // Format the timer display (MM:SS)
        let formattedTime = 
            (minutes < 10 ? "0" : "") + minutes + ":" + 
            (seconds < 10 ? "0" : "") + seconds;
        
        ele.innerHTML = formattedTime;
        elapsedTime++;  // Increment time
    }, 1000);
}

function showScore() {
    resetState();
    clearInterval(timer); // Stop the timer
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;
    let formattedTime = `${minutes} minutes and ${seconds} seconds`;

    questionElement.innerHTML = `You scored ${score} out of ${questions.length} (${(score / questions.length) * 100}%)!<br/>Time it took you: ${formattedTime}`;
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
        clearInterval(timer);  // Stop timer before showing score
        showScore();
        localStorage.setItem("readingScore", score);  // Move storage here
    }
}
function startQuiz() {
    elapsedTime = 0;  // Ensure timer starts fresh
    startTimer();  // Start the timer when quiz begins
    showQuestion();
}
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}








nextButton.addEventListener("click", handleNextButton);

startQuiz();