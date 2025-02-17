const startingMinutes = 8;
const countdownEl = document.getElementById('countdown');


let time = startingMinutes * 60;
let refreshIntervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time === 0) { 
        clearInterval(refreshIntervalId);
        endQuiz();
    } else {
        time--; 
    }
}

// Function to handle quiz timeout
function endQuiz() {
    resetState();  // Clear previous questions and buttons
    showScore();   // Display final score

    // ✅ Ensure "Next" button is properly shown
    nextButton.style.display = "block";  
    nextButton.textContent = "Try Again";  
    nextButton.onclick = restartQuiz;  // Restart the quiz when clicked
}

// Function to restart the quiz
function restartQuiz() {
    time = startingMinutes * 60;  // Reset timer
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    nextButton.style.display = "none"; // Hide the button after clicking
    fetchQuestions();  // Reload questions
    updateCountdown(); // Restart countdown
}

// Automatically end test after 8 minutes
setTimeout(endQuiz, 480000);

updateCountdown();


const questionsData = {
    1: [
        { question: "The museum, which houses ancient artifacts from various civilizations, attract thousands of visitors every year.<br/>Which choice best corrects the underlined portion?", options: ["atracts", "attract", "have attracted", "are attracting"], answer: "attracts" },
        { question: "She was so engrossed in her book that she barely noticed when someone set next to her on the bench.<br/>Which choice best corrects the underlined portion?", options: ["set", "has set", "sits", "sat"], answer: "sat" },
        { question: "In order to successfully complete the project, the team must cooperate together and communicate effectively.<br/>Which choice best corrects the underlined portion?", options: ["cooperate together and talk efficiently", "cooperate alongside one another and communicate effectively", "cooperating together and communicating effectively","cooperate and communicate effectively"], answer: "cooperate and communicate effectively" },
        { question: "Bees play a crucial role in pollination, transferring pollen between flowers to facilitate plant reproduction. Without bees, many crops would struggle to produce fruit, leading to significant food shortages.<br/>What is the main idea of the passage?", options: ["Bees are dangerous insects that harm crops.", "Bees are essential for plant reproduction and food production.","Many plants can reproduce without pollination.", "Bees only pollinate flowers in specific regions."], answer: "Bees are essential for plant reproduction and food production.",  },
        { question: "The scientist's theory was initially met with skepticism, but over time, the evidence became incontrovertible.<br/>In this context, 'incontrovertible' most nearly means:", options: ["debatable", "complicated", "undeniable","confusing"], answer: "undeniable" },
        { question: "Lena carefully wrapped the gift in bright paper, tied a ribbon around it, and wrote a heartfelt note before placing it on the table with a smile.", options: ["She is unsure about whether the gift is appropriate.", "She regrets buying the gift.", "She is worried the recipient won’t like the gift.","She is excited about giving the gift."], answer: "She is excited about giving the gift." },
        { question: "What is the value of x in the equation 3x + 5 = 14?", options: ["2", "3", "4","5"], answer: "3" },
        { question: "A store is offering a 20% discount on a jacket that originally costs $50. What is the sale price of the jacket?", options: ["$30", "35", "$40","$45"], answer: "$40" },
        { question: "A rectangle has a length of 8 units and a width of 5 units. What is its area?", options: ["13 square units", "30 square units", "40 square units","80 square units"], answer:  "40 square units" }
        
        
    ],
    2: [
        { question: "The group of students ___ planning a trip to the museum next week.", options: ["is","are", "were", "have been"], answer: "is" },
        { question: "After the storm, the hikers had to find an ___ route because their usual path was blocked.", options: ["alternating", "alternate","alteration", "alternative"], answer: "alternative" },
        { question: "The scientist conducted an experiment in order to test out a new hypothesis. Which choice best improves the sentence?", options: ["The scientist conducted an experiment to test a new hypothesis.", "The scientist conducted an experiment for testing out a new hypothesis.", "The scientist did an experiment to test a new hypothesis.","The scientist performed an experiment in order to test out a new hypothesis."], answer: "The scientist conducted an experiment to test a new hypothesis." },
        { question: "What is the main idea of the passage? 'Marie Curie’s groundbreaking research on radioactivity not only earned her two Nobel Prizes but also paved the way for advancements in medicine and energy. Her discoveries laid the foundation for modern cancer treatments and nuclear power generation.'", options: ["Marie Curie won two Nobel Prizes but faced many challenges.", "Marie Curie’s research significantly impacted medicine and energy.", "The dangers of radioactivity were unknown during Marie Curie’s time.","Marie Curie was the only scientist working on radioactivity."], answer: "Marie Curie’s research significantly impacted medicine and energy." },
        { question: "In this context, 'acquiesced' most nearly means: 'Despite his initial reluctance, James ultimately acquiesced to his friend’s request to join the debate team.'", options: ["refused", "suggested", "criticized", "agreed"], answer: "agreed" },
        { question: "What can be inferred about Sarah? 'As she stood at the edge of the diving board, Sarah took a deep breath, her hands trembling slightly. Below, the water shimmered in the sunlight, both inviting and intimidating.'", options: ["She is an experienced diver.", "She is nervous about jumping.", "She prefers swimming to diving.","She is afraid of the water."], answer: "She is nervous about jumping." },
        { question: "What is the value of x in the equation 4x - 6 = 10?", options: ["2", "3", "4","5"], answer: "5" },
        { question: "If 2/3 of a number is 12, what is the number?", options: ["16", "18", "20","24"], answer: "18" },
        { question: "A triangle has a base of 10 units and a height of 6 units. What is its area?", options: ["20 square units", "30 square units", "40 square units","60 square units"], answer: "30 square units" },
        
    ],
    3: [
        { question: "The collection of rare books ___ stored in a temperature-controlled room.", options: ["are", "is", "were","have been"], answer: "is" },
        { question: "To complete the science project, students must submit a report ___ their findings.", options: ["describing", "describes", "descriptive","description"], answer: "describing" },
        { question: "Which choice best improves the sentence? 'The manager carefully analyzed the data before to make a decision.'", options: ["before to deciding.", "before he make a decision.", "before making a decision.","before to make decision."], answer: "before making a decision." },
        { question: "What is the main idea of the passage? 'The Wright brothers revolutionized transportation by successfully inventing the first powered aircraft. Their innovations laid the foundation for modern aviation and changed how people travel around the world.'", options: ["The Wright brothers flew the longest flight in history.", "The Wright brothers only made minor contributions to aviation.", "The Wright brothers' airplane was never successful.","The Wright brothers' work led to modern aviation."], answer: "The Wright brothers' work led to modern aviation." },
        { question: "In this context, 'apprehensive' most nearly means: 'As the roller coaster climbed to its highest point, Jake felt apprehensive about the upcoming drop.'", options: ["nervous", "excited", "angry","confused"], answer: "nervous" },
        { question: "What can be inferred about Lisa? 'Lisa glanced at her watch and quickened her pace, weaving through the crowded streets as she clutched the invitation tightly in her hand.'", options: ["She is lost in an unfamiliar place.", "She is afraid of the crowd.", "She is running late for an event.","She forgot her invitation."], answer: "She is running late for an event." },
        { question: "Solve for x: 5x + 3 = 18", options: ["2", "3", "4","5"], answer: "3" },
        { question: "A rectangular garden has a length of 12 feet and a width of 5 feet. What is its area?", options: ["17 square feet", "24 square feet", "60 square feet","120 square feet"], answer: "60 square feet" },
        { question: "A book originally costs $30 and is on sale for 25% off. What is the sale price?", options: ["$20", "$22.50", "$25","$27"], answer: "$22.50" },
    ],
    4: [ 
        // Writing Questions
        { 
            question: "Which choice best maintains the sentence’s style and tone?\nThe scientist conducted an experiment to investigate the **stuff** found in ocean water.",
            options: ["A) stuff", "B) substances", "C) junk", "D) gunk"],
            answer: "B) substances"
        },
        { 
            question: "Which choice best combines the sentences?\nThe dog was barking. It saw a squirrel in the yard.",
            options: [
                "A) The dog, barking, saw a squirrel in the yard.",
                "B) The dog was barking because it saw a squirrel in the yard.",
                "C) The dog, seeing a squirrel in the yard, it was barking.",
                "D) The dog saw a squirrel in the yard and it barking."
            ],
            answer: "B) The dog was barking because it saw a squirrel in the yard."
        },
        { 
            question: "Which option corrects the error in the following sentence?\nNeither of the candidates **are** prepared for the debate.",
            options: ["A) No change", "B) is", "C) were", "D) have been"],
            answer: "B"
        },
        
        // Reading Questions
        { 
            question: "Based on the passage, what is the main purpose of the first paragraph?",
            options: [
                "A) To introduce a character's dilemma",
                "B) To provide background information",
                "C) To summarize the entire passage",
                "D) To describe a setting in detail"
            ],
            answer: "A"
        },
        { 
            question: "Which choice best supports the idea that the protagonist is feeling uncertain?",
            options: [
                "A) 'He stepped forward confidently, ready for the challenge.'",
                "B) 'She hesitated at the door, her hand hovering over the handle.'",
                "C) 'The town was quiet, its streets empty and calm.'",
                "D) 'They laughed as they walked together down the path.'"
            ],
            answer: "B"
        },
        { 
            question: "What can be inferred about the author’s tone in the passage?",
            options: [
                "A) Sarcastic", 
                "B) Neutral", 
                "C) Nostalgic", 
                "D) Excited"
            ],
            answer: "C"
        },
        
        // Math Questions
        { 
            question: "If 3x + 5 = 20, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "A"
        },
        { 
            question: "A rectangle has a length of 10 and a width of 4. What is its perimeter?",
            options: ["A) 28", "B) 30", "C) 36", "D) 40"],
            answer: "A"
        },
        { 
            question: "The function f(x) = 2x^2 - 3x + 4 is evaluated at x = 3. What is f(3)?",
            options: ["A) 13", "B) 16", "C) 19", "D) 22"],
            answer: "A"
        }
    ]
    ,
    5: [ 
        // Writing Questions
        { 
            question: "Which choice best maintains the sentence’s clarity and precision?\nThe scientist conducted an experiment to observe the **things** that influence plant growth.",
            options: ["A) things", "B) factors", "C) stuff", "D) elements"],
            answer: "B"
        },
        { 
            question: "Which choice best combines the sentences?\nThe cat was asleep. The loud noise woke it up.",
            options: [
                "A) The cat, asleep, woke up because of the loud noise.",
                "B) The cat was asleep, but it woke up due to the loud noise.",
                "C) The cat was asleep, it woke up when hearing a loud noise.",
                "D) The loud noise woke the cat up while it was asleep."
            ],
            answer: "B"
        },
        { 
            question: "Which option corrects the error in the following sentence?\nEach of the players **have** a unique skill set.",
            options: ["A) No change", "B) has", "C) were", "D) are"],
            answer: "B"
        },
        
        // Reading Questions
        { 
            question: "What is the main idea of the passage's first paragraph?",
            options: [
                "A) It introduces a conflict.",
                "B) It provides historical context.",
                "C) It summarizes the main argument.",
                "D) It describes the protagonist’s emotions."
            ],
            answer: "A"
        },
        { 
            question: "Which choice best supports the idea that the character is feeling nervous?",
            options: [
                "A) 'She smiled brightly, waving to her friends.'",
                "B) 'He tapped his foot rapidly and glanced around the room.'",
                "C) 'The sun set slowly, casting long shadows across the field.'",
                "D) 'They ran quickly, laughing as they went.'"
            ],
            answer: "B"
        },
        { 
            question: "Which word best describes the tone of the passage?",
            options: [
                "A) Hopeful", 
                "B) Melancholy", 
                "C) Indifferent", 
                "D) Enthusiastic"
            ],
            answer: "B"
        },
        
        // Math Questions
        { 
            question: "Solve for x: 4x - 7 = 21",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "C"
        },
        { 
            question: "A triangle has side lengths of 5 and 12. If the hypotenuse is 13, what type of triangle is it?",
            options: ["A) Acute", "B) Right", "C) Obtuse", "D) Equilateral"],
            answer: "B"
        },
        { 
            question: "The function g(x) = 3x^2 - 4x + 5 is evaluated at x = 2. What is g(2)?",
            options: ["A) 7", "B) 9", "C) 11", "D) 13"],
            answer: "B"
        }
    ],
    6: [
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" }
    ],
    7: [
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" }
    ],
    8: [
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" }
    ],
    9: [
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" }
    ],
    10: [
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" }
    ],
    11: [
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" },
        { question: "Q", options: ["A", "A", "A","A"], answer: "A" }
    ]
};

// Get the current level from localStorage (default to 1 if not set)
const currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;
const questions = questionsData[currentLevel]; // Load questions for the current level

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    // Reset timer
    clearInterval(refreshIntervalId); // Stop previous interval
    time = startingMinutes * 60; // Reset time
    refreshIntervalId = setInterval(updateCountdown, 1000); // Restart timer

    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (option === currentQuestion.answer) {
            button.dataset.correct = "true";
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
}

// Handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disable all buttons without highlighting the correct one
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    let percentageScore = Math.round((score / questions.length) * 100); // Calculate percentage score
    localStorage.setItem(`level${currentLevel}Score`, percentageScore); // Save dynamically per level

    if (percentageScore >= 75) {
        questionElement.innerHTML = `🎉 Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>✅ Great job! You can move on to the next section.`;
        localStorage.setItem(`level${currentLevel + 1}Unlocked`, "true"); // Unlock next level
    } else {
        questionElement.innerHTML = `❌ Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>⚠️ You need at least 75% to move on.<br>Would you like to try again or continue anyway?`;
    }

    // Create "Try Again" Button
    const tryAgainButton = document.createElement("button");
    tryAgainButton.innerHTML = "Try Again";
    tryAgainButton.classList.add("btn");
    tryAgainButton.onclick = () => startQuiz();
    updateCountdown();

    // Create "Continue Anyway" Button
    const continueButton = document.createElement("button");
    continueButton.innerHTML = "Continue";
    continueButton.classList.add("btn");
    continueButton.onclick = () => location.href = "https://www.brainjelli.com/sat-rank-up-landing.html";

    // Display buttons
    answerButtons.appendChild(tryAgainButton);
    answerButtons.appendChild(continueButton);
    
    document.getElementById("progress-bar").style.width = "100%";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function ranklink() {
    location.href = "https://www.brainjelli.com/sat-rank-up-landing.html";
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        ranklink(); // Ensure this points to the correct URL
    }
});

startQuiz();