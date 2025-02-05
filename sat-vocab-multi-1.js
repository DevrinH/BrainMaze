const explanation = [
    {
        explanation: "Answer: B) Intended for or understood by a small, specialized group <br/>Explanation:<br/>The word esoteric refers to something that is highly specialized and not easily understood by the general public. In the sentence, the professor’s lectures were difficult for most students to comprehend, implying that they contained specialized knowledge. While A suggests the opposite meaning, C and D describe aspects that are not necessarily related to esoteric content.",
      
    },
    {
        explanation: "Answer: A) Honest and straightforward Explanation:The word candid means truthful, direct, and unfiltered in speech or expression. In the sentence, James initially hesitated but then provided a full and open account, indicating sincerity. B and C suggest a lack of clarity or openness, which contradicts the meaning of candid, while D implies embellishment rather than honesty.",
       
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
        
        question: "The professor’s lectures were so esoteric that only a handful of students could truly comprehend the material.<br/><br/>Question: <br/>Which of the following best defines esoteric? ",
       
        answers: [
            { text: " Popular and widely understood", correct: false},
            { text: " Intended for or understood by a small, specialized group", correct: true},
            { text: " Boring and monotonous", correct: false},
            { text: "Outdated and irrelevant", correct: false},
        ]
    },
    {
        question: "Despite his initial reluctance, James eventually gave a candid account of the incident, revealing all the details without hesitation.<br/><br/>Question: <br/> Which of the following best defines candid? ",
       
        answers: [
            { text: " Honest and straightforward", correct: false},
            { text: "Vague and uncertain", correct: true},
            { text: " Reserved and secretive", correct: false},
            { text: "Exaggerated and dramatic.", correct: false},
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
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
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
    clearInterval(timer); // Ensure no duplicate timers are running
    elapsedTime = 0; // Reset time at the start
    timer = setInterval(() => {
        elapsedTime++;  // Increment time first to avoid display lag

        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime % 60;

        // Format the timer display (MM:SS)
        let formattedTime = 
            (minutes < 10 ? "0" : "") + minutes + ":" + 
            (seconds < 10 ? "0" : "") + seconds;
        
        if (ele) {
            ele.innerHTML = formattedTime;
        }
    }, 1000);
}

function showScore() {
    resetState();
    clearInterval(timer); // Stop the timer
    
    // Ensure elapsedTime is still correct
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;
    let formattedTime = `${minutes} minutes and ${seconds} seconds`;

    questionElement.innerHTML = `Score: ${score} out of ${questions.length} (${(score / questions.length) * 100}%)!<br/>Time: ${formattedTime}`;
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
        localStorage.setItem("readingScore", score);  // Store score
        localStorage.setItem("readingTime", elapsedTime);  // Store time in seconds
    }
}

function startQuiz() {
    elapsedTime = 0;  // Ensure timer starts fresh
    startTimer();  // Start the timer when quiz begins
    showQuestion();
}

nextButton.addEventListener("click", handleNextButton);
startQuiz();








nextButton.addEventListener("click", handleNextButton);

startQuiz();