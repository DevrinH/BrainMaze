const startingMinutes = 8;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60;
let refreshIntervalId;
let quizEnded = false; // Prevents multiple calls

function startTimer() {
    clearInterval(refreshIntervalId); // ✅ Clears any existing interval before starting a new one
    quizEnded = false; // ✅ Reset flag when the quiz restarts
    time = startingMinutes * 60; // ✅ Reset timer correctly
    refreshIntervalId = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time <= 0) { 
        clearInterval(refreshIntervalId);
        endQuiz();
    } else {
        time--; 
    }
}

function endQuiz() {
    if (quizEnded) return; // Prevent multiple calls
    quizEnded = true;
    
    clearInterval(refreshIntervalId);
    showScore();
}

function restartQuiz() {
    startTimer(); // ✅ Restart timer properly
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    nextButton.style.display = "none"; // Hide the button after clicking
    fetchQuestions();  // Reload questions
}

// ✅ Start timer when quiz loads
startTimer();

const questionsData = {
    1: [
        { question: "The museum, which houses ancient artifacts from various civilizations, attract thousands of visitors every year.<br/>Which choice best corrects the underlined portion?", options: ["attracts", "attract", "have attracted", "are attracting"], answer: "attracts" },
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
            answer: "B) is"
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
            answer: "A) To introduce a character's dilemma"
        },
        { 
            question: "Which choice best supports the idea that the protagonist is feeling uncertain?",
            options: [
                "A) 'He stepped forward confidently, ready for the challenge.'",
                "B) 'She hesitated at the door, her hand hovering over the handle.'",
                "C) 'The town was quiet, its streets empty and calm.'",
                "D) 'They laughed as they walked together down the path.'"
            ],
            answer: "B) 'She hesitated at the door, her hand hovering over the handle.'"
        },
        { 
            question: "What can be inferred about the author’s tone in the passage?",
            options: [
                "A) Sarcastic", 
                "B) Neutral", 
                "C) Nostalgic", 
                "D) Excited"
            ],
            answer: "C) Nostalgic"
        },
        
        // Math Questions
        { 
            question: "If 3x + 5 = 20, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "A) 5"
        },
        { 
            question: "A rectangle has a length of 10 and a width of 4. What is its perimeter?",
            options: ["A) 28", "B) 30", "C) 36", "D) 40"],
            answer: "A) 28"
        },
        { 
            question: "The function f(x) = 2x^2 - 3x + 4 is evaluated at x = 3. What is f(3)?",
            options: ["A) 13", "B) 16", "C) 19", "D) 22"],
            answer: "A) 13"
        }
    ]
    ,
    5: [ 
        // Writing Questions
        { 
            question: "Which choice best maintains the sentence’s clarity and precision?\nThe scientist conducted an experiment to observe the **things** that influence plant growth.",
            options: ["A) things", "B) factors", "C) stuff", "D) elements"],
            answer: "B) factors"
        },
        { 
            question: "Which choice best combines the sentences?\nThe cat was asleep. The loud noise woke it up.",
            options: [
                "A) The cat, asleep, woke up because of the loud noise.",
                "B) The cat was asleep, but it woke up due to the loud noise.",
                "C) The cat was asleep, it woke up when hearing a loud noise.",
                "D) The loud noise woke the cat up while it was asleep."
            ],
            answer: "B) The cat was asleep, but it woke up due to the loud noise."
        },
        { 
            question: "Which option corrects the error in the following sentence?\nEach of the players **have** a unique skill set.",
            options: ["A) No change", "B) has", "C) were", "D) are"],
            answer: "B) has"
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
            answer: "A) It introduces a conflict."
        },
        { 
            question: "Which choice best supports the idea that the character is feeling nervous?",
            options: [
                "A) 'She smiled brightly, waving to her friends.'",
                "B) 'He tapped his foot rapidly and glanced around the room.'",
                "C) 'The sun set slowly, casting long shadows across the field.'",
                "D) 'They ran quickly, laughing as they went.'"
            ],
            answer: "B) 'He tapped his foot rapidly and glanced around the room.'"
        },
        { 
            question: "Which word best describes the tone of the passage?",
            options: [
                "A) Hopeful", 
                "B) Melancholy", 
                "C) Indifferent", 
                "D) Enthusiastic"
            ],
            answer: "B) Melancholy"
        },
        
        // Math Questions
        { 
            question: "Solve for x: 4x - 7 = 21",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "C) 7"
        },
        { 
            question: "A triangle has side lengths of 5 and 12. If the hypotenuse is 13, what type of triangle is it?",
            options: ["A) Acute", "B) Right", "C) Obtuse", "D) Equilateral"],
            answer: "B) Right"
        },
        { 
            question: "The function g(x) = 3x^2 - 4x + 5 is evaluated at x = 2. What is g(2)?",
            options: ["A) 7", "B) 9", "C) 11", "D) 13"],
            answer: "B) 9"
        }
    ],
    6: [ 
        // Writing Questions
        { 
            question: "Which choice best improves the clarity of the sentence?\nThe manager explained the policy to the employees **in a way that was clear and easy to understand**.",
            options: ["A) in a way that was clear and easy to understand", "B) clearly and understandably", "C) in an understandable and clear way", "D) in a manner that was both clear and understandable"],
            answer: "B) clearly and understandably"
        },
        { 
            question: "Which option correctly uses a semicolon?\nThe concert was amazing; the band played all their best songs.",
            options: ["A) No change", "B) The concert was amazing, the band played all their best songs.", "C) The concert was amazing; and the band played all their best songs.", "D) The concert was amazing the band played all their best songs."],
            answer: "A) No change"
        },
        { 
            question: "Which revision improves the sentence's conciseness?\nAt this point in time, the company is experiencing growth.",
            options: ["A) No change", "B) The company is currently experiencing growth.", "C) The company is growing.", "D) The company, at this time, is growing."],
            answer: "C) The company is growing."
        },
        
        // Reading Questions
        { 
            question: "What is the author’s primary purpose in the passage?",
            options: [
                "A) To entertain the reader with a fictional story.",
                "B) To inform the reader about a historical event.",
                "C) To persuade the reader to adopt a viewpoint.",
                "D) To describe a scientific process."
            ],
            answer: "B) To inform the reader about a historical event."
        },
        { 
            question: "Which sentence best supports the claim that technology has improved communication?",
            options: [
                "A) Many people use smartphones daily.",
                "B) Emails allow people to communicate instantly across the globe.",
                "C) Some prefer handwritten letters over digital messages.",
                "D) Reading books is a great way to gain knowledge."
            ],
            answer: "B) Emails allow people to communicate instantly across the globe."
        },
        { 
            question: "Based on the passage, what can be inferred about the protagonist’s decision?",
            options: [
                "A) It was made impulsively.",
                "B) It was carefully considered.",
                "C) It was influenced by external pressure.",
                "D) It was entirely unexpected."
            ],
            answer: "B) It was carefully considered."
        },
        
        // Math Questions
        { 
            question: "Solve for x: 5x + 3 = 18",
            options: ["A) 3", "B) 4", "C) 5", "D) 6"],
            answer: "A) 3"
        },
        { 
            question: "A rectangle has a length of 10 and a width of 4. What is its area?",
            options: ["A) 20", "B) 30", "C) 40", "D) 50"],
            answer: "C) 40"
        },
        { 
            question: "If f(x) = 2x^2 - 3x + 4, what is f(3)?",
            options: ["A) 13", "B) 16", "C) 19", "D) 22"],
            answer: "A) 13"
        }
    ],
    7:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe scientist conducted an experiment **that was testing** the effects of temperature on plant growth.",
            options: ["A) that was testing", "B) testing", "C) which tested", "D) No change"],
            answer: "B) testing"
        },
        {  
            question: "Which option corrects the grammatical error?\nNeither of the solutions **are** effective in solving the issue.",
            options: ["A) are", "B) have been", "C) is", "D) were"],
            answer: "C) is"
        },
        {  
            question: "Which revision improves sentence conciseness?\nDue to the fact that we arrived late, we missed the beginning of the movie.",
            options: ["A) Due to the fact that", "B) Because", "C) Owing to the fact that", "D) On account of the fact that"],
            answer: "B) Because"
        },
        
        // Reading Questions
        {  
            question: "What is the main purpose of the passage?",
            options: [
                "A) To argue against a popular belief.",
                "B) To explain a complex process.",
                "C) To narrate a personal experience.",
                "D) To analyze a historical event."
            ],
            answer: "B) To explain a complex process."
        },
        {  
            question: "Which statement best supports the author's claim about climate change?",
            options: [
                "A) The Earth's climate has changed throughout history.",
                "B) Many scientists believe climate change is a pressing issue.",
                "C) Rising global temperatures have been linked to increased natural disasters.",
                "D) Some people deny the existence of climate change."
            ],
            answer: "C) Rising global temperatures have been linked to increased natural disasters."
        },
        {  
            question: "What can be inferred about the character's decision in the passage?",
            options: [
                "A) It was influenced by fear.",
                "B) It was a result of careful planning.",
                "C) It was made under pressure.",
                "D) It was entirely spontaneous."
            ],
            answer: "B) It was a result of careful planning."
        },
        
        // Math Questions
        {  
            question: "If 3x - 5 = 16, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "C) 7"
        },
        {  
            question: "A triangle has sides of length 5, 12, and 13. What is its area?",
            options: ["A) 25", "B) 30", "C) 35", "D) 40"],
            answer: "B) 30"
        },
        {  
            question: "If g(x) = x^2 - 4x + 7, what is g(5)?",
            options: ["A) 12", "B) 13", "C) 14", "D) 15"],
            answer: "A) 12"
        }
    ]
    ,
    8: [  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe manager explained the policy **in a way that was clear and easy to understand** to the employees.",
            options: ["A) in a way that was clear and easy to understand", "B) clearly and understandably", "C) with clarity and ease of understanding", "D) No change"],
            answer: "B) clearly and understandably"
        },
        {  
            question: "Which option corrects the grammatical error?\nEach of the team members **have** a role in the project.",
            options: ["A) have", "B) has", "C) having", "D) had"],
            answer: "B) has"
        },
        {  
            question: "Which revision improves sentence conciseness?\nIn spite of the fact that he was late, he was still allowed to take the test.",
            options: ["A) In spite of the fact that", "B) Although", "C) Due to the fact that", "D) Despite of the fact that"],
            answer: "B) Although"
        },
        
        // Reading Questions
        {  
            question: "What is the main idea of the passage?",
            options: [
                "A) To criticize a common misconception.",
                "B) To provide insight into a scientific discovery.",
                "C) To share a personal perspective on a historical event.",
                "D) To describe the challenges of technological advancement."
            ],
            answer: "B) To provide insight into a scientific discovery."
        },
        {  
            question: "Which sentence best supports the author's argument about renewable energy?",
            options: [
                "A) Solar panels require sunlight to generate power.",
                "B) The transition to renewable energy has economic benefits.",
                "C) Many people are unaware of how wind turbines work.",
                "D) Fossil fuels have been used for centuries."
            ],
            answer: "B) The transition to renewable energy has economic benefits."
        },
        {  
            question: "What can be inferred about the protagonist’s decision in the passage?",
            options: [
                "A) It was motivated by a sense of duty.",
                "B) It was made impulsively.",
                "C) It was encouraged by external pressure.",
                "D) It was entirely accidental."
            ],
            answer: "A) It was motivated by a sense of duty."
        },
        
        // Math Questions
        {  
            question: "If 4x + 3 = 19, what is the value of x?",
            options: ["A) 3", "B) 4", "C) 5", "D) 6"],
            answer: "C) 4"
        },
        {  
            question: "A circle has a radius of 7. What is its area? (Use \u03C0 ≈ 3.14)",
            options: ["A) 144.13", "B) 153.86", "C) 156.24", "D) 162.50"],
            answer: "B) 153.86"
        },
        {  
            question: "If f(x) = 2x^2 - 3x + 4, what is f(3)?",
            options: ["A) 13", "B) 14", "C) 15", "D) 16"],
            answer: "C) 15"
        }
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

let quizTimeout; // Declare globally to allow clearing

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    clearInterval(refreshIntervalId); // Stop any existing timer
    clearTimeout(quizTimeout); // ✅ Clear any previous timeout

    time = startingMinutes * 60; // Reset time
    quizTimeout = setTimeout(endQuiz, time * 1000); // ✅ Set timeout dynamically

    refreshIntervalId = setInterval(updateCountdown, 1000); // Restart countdown
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
    resetState(); // ✅ Clears the previous question before adding buttons

    let percentageScore = Math.round((score / questions.length) * 100); 
    localStorage.setItem(`level${currentLevel}Score`, percentageScore);

    if (percentageScore >= 75) {
        questionElement.innerHTML = `🎉 Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>✅ Great job! You can move on to the next section.`;
        localStorage.setItem(`level${currentLevel + 1}Unlocked`, "true");
    } else {
        questionElement.innerHTML = `❌ Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>⚠️ You need at least 75% to move on.<br>Would you like to try again or continue anyway?`;
    }

    // ✅ Create "Try Again" Button
    const tryAgainButton = document.createElement("button");
    tryAgainButton.innerHTML = "Try Again";
    tryAgainButton.classList.add("btn");
    tryAgainButton.onclick = () => startQuiz();

    // ✅ Create "Continue Anyway" Button
    const continueButton = document.createElement("button");
    continueButton.innerHTML = "Continue";
    continueButton.classList.add("btn");
    continueButton.onclick = () => location.href = "https://www.brainjelli.com/sat-rank-up-landing.html";

    // ✅ Append buttons AFTER clearing state
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