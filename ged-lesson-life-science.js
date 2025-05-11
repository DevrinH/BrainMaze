// Ensure scores display on page load by calling showScore
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || 1;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    1: {
        title: "Life Science",
        content: [
            {
                type: "example",
                title: "Example 1: Cell Structure",
                content: `
                    <h2>Example 1: Cell Structure</h2>
                    <p>Passage: Cells are the basic units of life. Plant cells contain chloroplasts, which enable photosynthesis, while animal cells lack chloroplasts but have mitochondria for energy production.</p>
                    <p>Question: What is the role of chloroplasts in plant cells?</p>
                    <p>Step 1: Identify key information: Chloroplasts are in plant cells and linked to photosynthesis.</p>
                    <p>Step 2: Recall: Photosynthesis converts sunlight into energy.</p>
                    <p>Solution: Chloroplasts enable photosynthesis in plant cells.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: Mitochondria, found in both plant and animal cells, are organelles that produce energy through cellular respiration. What is the primary function of mitochondria?",
                options: [
                    { text: "A) Produce energy", correct: true },
                    { text: "B) Store nutrients", correct: false },
                    { text: "C) Synthesize proteins", correct: false },
                    { text: "D) Protect the cell", correct: false }
                ],
                explanation: "The passage states mitochondria produce energy through cellular respiration, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Ecosystems",
                content: `
                    <h2>Example 2: Ecosystems</h2>
                    <p>Passage: In a forest ecosystem, producers like trees create energy via photosynthesis. Consumers, such as deer, eat plants, while decomposers, like fungi, break down dead matter.</p>
                    <p>Question: What role do decomposers play?</p>
                    <p>Step 1: Identify decomposers: Fungi break down dead matter.</p>
                    <p>Step 2: Determine function: Breaking down dead matter recycles nutrients.</p>
                    <p>Solution: Decomposers recycle nutrients by breaking down dead matter.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: In a pond ecosystem, algae are producers, fish are consumers, and bacteria are decomposers. What is the role of producers?",
                options: [
                    { text: "A) Create energy through photosynthesis", correct: true },
                    { text: "B) Consume other organisms", correct: false },
                    { text: "C) Break down waste", correct: false },
                    { text: "D) Regulate water temperature", correct: false }
                ],
                explanation: "Producers, like algae, create energy via photosynthesis, as implied by their role in the ecosystem."
            },
            {
                type: "example",
                title: "Example 3: Genetics",
                content: `
                    <h2>Example 3: Genetics</h2>
                    <p>Passage: Genes carry instructions for traits. Dominant alleles mask recessive ones. If a plant has one dominant allele (T) for tallness and one recessive (t) for shortness, it will be tall.</p>
                    <p>Question: Why is the plant tall?</p>
                    <p>Step 1: Analyze alleles: T (dominant) and t (recessive).</p>
                    <p>Step 2: Apply rule: Dominant allele (T) determines the trait.</p>
                    <p>Solution: The plant is tall because it has a dominant allele (T).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: In pea plants, round seeds (R) are dominant over wrinkled seeds (r). A plant with genotype Rr has what seed shape?",
                options: [
                    { text: "A) Round", correct: true },
                    { text: "B) Wrinkled", correct: false },
                    { text: "C) Mixed", correct: false },
                    { text: "D) Oval", correct: false }
                ],
                explanation: "The dominant allele (R) masks the recessive (r), so the plant has round seeds."
            },
            {
                type: "example",
                title: "Example 4: Human Biology",
                content: `
                    <h2>Example 4: Human Biology</h2>
                    <p>Passage: The respiratory system delivers oxygen to the blood. Air enters through the lungs, where alveoli exchange oxygen for carbon dioxide, which is exhaled.</p>
                    <p>Question: What is the role of alveoli?</p>
                    <p>Step 1: Identify function: Alveoli exchange oxygen for carbon dioxide.</p>
                    <p>Step 2: Clarify: This gas exchange supports respiration.</p>
                    <p>Solution: Alveoli exchange oxygen and carbon dioxide in the lungs.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: The circulatory system transports nutrients and oxygen via blood vessels. The heart pumps blood to all body parts. What is the heart’s primary function?",
                options: [
                    { text: "A) Pump blood", correct: true },
                    { text: "B) Produce oxygen", correct: false },
                    { text: "C) Filter waste", correct: false },
                    { text: "D) Store nutrients", correct: false }
                ],
                explanation: "The passage states the heart pumps blood, making A the correct answer."
            },
            {
                type: "example",
                title: "Example 5: Evolution",
                content: `
                    <h2>Example 5: Evolution</h2>
                    <p>Passage: Natural selection drives evolution. Organisms with traits suited to their environment, like camouflage in prey, are more likely to survive and reproduce.</p>
                    <p>Question: Why does camouflage increase survival?</p>
                    <p>Step 1: Analyze trait: Camouflage helps prey avoid predators.</p>
                    <p>Step 2: Link to survival: Avoiding predators increases survival odds.</p>
                    <p>Solution: Camouflage increases survival by helping prey avoid predators.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: Birds with stronger beaks can access more food sources, increasing their survival in harsh environments. Why do stronger beaks aid survival?",
                options: [
                    { text: "A) They allow access to more food", correct: true },
                    { text: "B) They attract mates", correct: false },
                    { text: "C) They improve flight", correct: false },
                    { text: "D) They reduce disease", correct: false }
                ],
                explanation: "Stronger beaks provide more food access, enhancing survival, as stated in the passage."
            },
            {
                type: "example",
                title: "Example 6: Photosynthesis",
                content: `
                    <h2>Example 6: Photosynthesis</h2>
                    <p>Passage: Photosynthesis in plants uses sunlight, carbon dioxide, and water to produce glucose and oxygen. This process occurs in chloroplasts.</p>
                    <p>Question: What are the products of photosynthesis?</p>
                    <p>Step 1: Identify outputs: The passage lists glucose and oxygen.</p>
                    <p>Step 2: Confirm: These are the end products of the process.</p>
                    <p>Solution: The products of photosynthesis are glucose and oxygen.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: During photosynthesis, plants convert sunlight energy into chemical energy, producing glucose and releasing oxygen. What is one product of photosynthesis?",
                options: [
                    { text: "A) Oxygen", correct: true },
                    { text: "B) Nitrogen", correct: false },
                    { text: "C) Carbon dioxide", correct: false },
                    { text: "D) Water", correct: false }
                ],
                explanation: "The passage specifies oxygen as a product of photosynthesis, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Food Chains",
                content: `
                    <h2>Example 7: Food Chains</h2>
                    <p>Passage: In a food chain, energy flows from producers to consumers. For example, grass (producer) is eaten by rabbits (primary consumer), which are eaten by foxes (secondary consumer).</p>
                    <p>Question: What is the role of rabbits in this food chain?</p>
                    <p>Step 1: Identify position: Rabbits eat grass and are eaten by foxes.</p>
                    <p>Step 2: Classify: Rabbits are primary consumers, as they eat producers.</p>
                    <p>Solution: Rabbits are primary consumers in the food chain.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: In a marine food chain, phytoplankton are producers, zooplankton are primary consumers, and small fish are secondary consumers. What is the role of zooplankton?",
                options: [
                    { text: "A) Primary consumers", correct: true },
                    { text: "B) Producers", correct: false },
                    { text: "C) Secondary consumers", correct: false },
                    { text: "D) Decomposers", correct: false }
                ],
                explanation: "Zooplankton eat phytoplankton (producers), making them primary consumers."
            }
        ]
    }
};

// Life science question array
const lifeScienceQuestions = [
    {
        question: "Passage: DNA contains genetic instructions. During cell division, DNA replicates to ensure each new cell has identical genetic material. What is the purpose of DNA replication?",
        answers: [
            { text: "A) Ensure identical genetic material in new cells", correct: true },
            { text: "B) Produce energy for cells", correct: false },
            { text: "C) Break down nutrients", correct: false },
            { text: "D) Protect cells from damage", correct: false }
        ],
        explanation: "The passage states DNA replicates to ensure each new cell has identical genetic material, making A correct.",
        difficulty: "easy",
        category: "ged-life-science"
    },
    {
        question: "Which process in plants uses sunlight to convert carbon dioxide and water into glucose and oxygen?",
        answers: [
            { text: "A) Photosynthesis", correct: true },
            { text: "B) Respiration", correct: false },
            { text: "C) Transpiration", correct: false },
            { text: "D) Fermentation", correct: false }
        ],
        explanation: "Photosynthesis is the process in plants that uses sunlight to convert carbon dioxide and water into glucose and oxygen. Respiration breaks down glucose for energy, transpiration involves water loss, and fermentation occurs in low-oxygen conditions. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-life-science"
    },
    {
        question: "What is the primary source of energy for Earth's climate system?",
        answers: [
            { text: "A) Geothermal heat", correct: false },
            { text: "B) Solar radiation", correct: true },
            { text: "C) Ocean currents", correct: false },
            { text: "D) Atmospheric pressure", correct: false }
        ],
        explanation: "Solar radiation from the sun is the primary source of energy for Earth's climate system, driving weather patterns and temperature changes. Geothermal heat, ocean currents, and atmospheric pressure play roles but are not the primary source. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-life-science"
    },
    {
        question: "Which structure in a cell contains the genetic material and controls cell activities?",
        answers: [
            { text: "A) Mitochondrion", correct: false },
            { text: "B) Nucleus", correct: true },
            { text: "C) Ribosome", correct: false },
            { text: "D) Cytoplasm", correct: false }
        ],
        explanation: "The nucleus contains the cell's genetic material (DNA) and controls cell activities by regulating gene expression. Mitochondria produce energy, ribosomes synthesize proteins, and cytoplasm is the cell's fluid medium. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-life-science"
    },
    {
        question: "What is the role of decomposers in an ecosystem?",
        answers: [
            { text: "A) Break down dead organic matter and recycle nutrients", correct: true },
            { text: "B) Produce energy through photosynthesis", correct: false },
            { text: "C) Consume primary producers for energy", correct: false },
            { text: "D) Regulate population sizes of predators", correct: false }
        ],
        explanation: "Decomposers, like fungi and bacteria, break down dead organic matter, recycling nutrients back into the ecosystem. Photosynthesis is done by producers, consumers eat producers, and population regulation is not their role. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-life-science"
    },
    {
        question: "Which process allows organisms to maintain a stable internal environment despite external changes?",
        answers: [
            { text: "A) Adaptation", correct: false },
            { text: "B) Evolution", correct: false },
            { text: "C) Homeostasis", correct: true },
            { text: "D) Natural selection", correct: false }
        ],
        explanation: "Homeostasis is the process by which organisms maintain a stable internal environment, such as regulating temperature or pH. Adaptation and evolution occur over generations, and natural selection drives evolution. Thus, option C is correct.",
        difficulty: "medium",
        category: "ged-life-science"
    },
    {
        question: "What type of symbiotic relationship occurs when one species benefits and the other is neither harmed nor helped?",
        answers: [
            { text: "A) Mutualism", correct: false },
            { text: "B) Parasitism", correct: false },
            { text: "C) Predation", correct: false },
            { text: "D) Commensalism", correct: true }
        ],
        explanation: "Commensalism is a symbiotic relationship where one species benefits and the other is unaffected. Mutualism benefits both, parasitism harms one, and predation involves one consuming another. Thus, option D is correct.",
        difficulty: "medium",
        category: "ged-life-science"
    }
];

// Variables
let categoryStats = {
    "ged-life-science": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "1"; // Default as string to match lessons object keys
let progressSteps = 0;
let totalSteps = 0; // Set dynamically in startLesson
let isQuizPhase = false;
let showingQuizTransition = false; // Flag for quiz transition
let currentQuestionIndex = 0;

// Progress bar update function
function updateProgressBar(step) {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const percentage = totalSteps > 0 ? (step / totalSteps) * 100 : 0;
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
        console.log(`Progress updated: ${step}/${totalSteps} (${percentage}%)`);
    } else {
        console.error("Progress bar element not found!");
    }
}

// DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || '1'; // Ensure string
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    showScore();
    updateProgressBar(0);
});

// Start lesson
function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        currentItemIndex = 0;
        isQuizPhase = false;
        showingQuizTransition = false;
        totalSteps = lessons[currentLesson].content.length + getQuizQuestions(currentLesson).length;
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        progressSteps = 1;
        updateProgressBar(progressSteps);
        showItem();
    } else {
        console.error("Start lesson button not found!");
    }
}

// Show lesson item
function showItem() {
    console.log("Showing item for lesson:", currentLesson, "index:", currentItemIndex);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons && lessons[currentLesson] && lessons[currentLesson].content[currentItemIndex]) {
        const item = lessons[currentLesson].content[currentItemIndex];
        lessonContent.innerHTML = '';
        if (item.type === "example") {
            lessonContent.innerHTML = `
                <div class="question-row">
                    <div class="passage-text">${extractPassage(item.content)}</div>
                    <div class="right-column">
                        <div class="question-text">${item.content.replace(extractPassage(item.content), '')}</div>
                    </div>
                </div>
            `;
            const nextButton = document.getElementById('next-item');
            if (nextButton) {
                nextButton.classList.add('btn', 'next-btn');
                nextButton.addEventListener('click', nextItem, { once: true });
            } else {
                console.error("Next button not found in example!");
            }
        } else if (item.type === "question") {
            const passage = extractPassage(item.question);
            lessonContent.innerHTML = `
                <div class="question-row">
                    <div class="passage-text">${passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question.replace(passage, '')}</div>
                        <div class="answer-choices" id="answer-buttons"></div>
                        <button id="submit-answer" class="btn next-btn" style="display: none;">Next</button>
                    </div>
                </div>
            `;
            const answerButtons = document.getElementById('answer-buttons');
            item.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.innerHTML = option.text;
                button.classList.add("btn");
                button.dataset.correct = option.correct;
                button.addEventListener("click", () => selectAnswer(button, item));
                answerButtons.appendChild(button);
            });
        }
        progressSteps = currentItemIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("No more lesson content, proceeding to quiz transition");
        showQuizTransition();
    }
}

// Extract passage from content
function extractPassage(content) {
    const passageMatch = content.match(/Passage:.*?['"].*?['"]/i) || content.match(/<p>Passage:.*?<\/p>/i);
    return passageMatch ? passageMatch[0] : "";
}

// Handle answer selection
function selectAnswer(selectedBtn, item) {
    const answerButtons = document.querySelectorAll('#answer-buttons .btn');
    const submitButton = document.getElementById('submit-answer');
    const rightColumn = document.querySelector('.right-column');

    answerButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
    });

    if (selectedBtn.dataset.correct === "true") {
        selectedBtn.classList.add("correct");
        categoryStats["ged-life-science"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-life-science"].incorrect++;
        const explanationDiv = document.createElement("div");
        explanationDiv.classList.add("explanation");
        explanationDiv.innerHTML = item.explanation;
        rightColumn.appendChild(explanationDiv);
    }

    submitButton.style.display = 'inline-block';
    submitButton.addEventListener('click', () => {
        if (!isQuizPhase) {
            nextItem();
        } else {
            nextQuizItem();
        }
    }, { once: true });
}

// Next lesson item
function nextItem() {
    currentItemIndex++;
    console.log("nextItem called, currentItemIndex:", currentItemIndex);
    if (currentItemIndex < lessons[currentLesson].content.length) {
        showItem();
    } else if (!showingQuizTransition) {
        showQuizTransition();
    }
}

// Show quiz transition screen
function showQuizTransition() {
    console.log("Showing quiz transition for lesson:", currentLesson);
    showingQuizTransition = true;
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent) {
        lessonContent.innerHTML = `
            <div class="transition-box">
                <div class="centered-content">
                    <h2>Lesson Complete!</h2>
                    <p>Now it's time for the quiz.</p>
                    <button id="start-quiz-btn" class="btn next-btn">Next</button>
                </div>
            </div>
        `;
        const startQuizBtn = document.getElementById('start-quiz-btn');
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                showingQuizTransition = false;
                showQuiz();
            }, { once: true });
        } else {
            console.error("Start quiz button not found in transition!");
        }
        progressSteps = lessons[currentLesson].content.length;
        updateProgressBar(progressSteps);
    } else {
        console.error("Lesson content element not found for quiz transition!");
    }
}

// Start quiz
function showQuiz() {
    console.log("Starting quiz for lesson:", currentLesson);
    isQuizPhase = true;
    currentQuestionIndex = 0;
    let quizQuestions = getQuizQuestions(currentLesson);
    progressSteps = lessons[currentLesson].content.length + 1;
    updateProgressBar(progressSteps);
    showNextQuizQuestion(quizQuestions);
}

// Get quiz questions based on lesson
function getQuizQuestions(lessonId) {
    switch (parseInt(lessonId)) {
        case 1: return lifeScienceQuestions;
        default: return lifeScienceQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        const passage = extractPassage(question.question);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question.replace(passage, '')}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="btn next-btn" style="display: none;">Next</button>
                </div>
            </div>
        `;
        const answerButtons = document.getElementById('answer-buttons');
        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            button.dataset.correct = answer.correct;
            button.addEventListener("click", () => selectAnswer(button, question));
            answerButtons.appendChild(button);
        });
        progressSteps = lessons[currentLesson].content.length + currentQuestionIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("Quiz complete, showing final score");
        showFinalScore();
    }
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
}

// Save lesson completion
function saveLessonCompletion() {
    const completionData = {
        exam: "GED",
        type: "lesson",
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("lastActivity", JSON.stringify(completionData));
    console.log("Saved lesson completion:", completionData);
}

// Show final score
function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["ged-life-science"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-life-science"].incorrect;

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    logFinalScore(totalCorrect, totalAttempted);
    saveScore(currentLesson, score);

    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <div class="score-box">
            <div class="centered-content">
                <h2>Final Score</h2>
                <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
                <p>Your score: ${percentage}%</p>
                <button id="continue-button" class="btn continue-btn">Continue</button>
            </div>
        </div>
    `;
    const finalScoreElement = document.getElementById('final-score');
    if (finalScoreElement) finalScoreElement.classList.add('hide'); // Hide if exists
    document.getElementById('continue-button').addEventListener('click', () => {
        saveLessonCompletion();
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

// Record test results
function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("gedTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("gedTestResults", JSON.stringify(results));
    console.log("Final stored gedTestResults:", results);
    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

// Log final score
function logFinalScore(totalCorrect, totalAttempted) {
    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    localStorage.setItem("finalScore", JSON.stringify({
        correct: totalCorrect,
        attempted: totalAttempted,
        percentage: percentage,
        lesson: currentLesson
    }));
    console.log("Final score logged:", { totalCorrect, totalAttempted, percentage, lesson: currentLesson });
}

// Save score
function saveScore(lessonId, score) {
    localStorage.setItem(`ged-life-science-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-life-science-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-life-science-lessonScore-${lessonId}`) || "Not completed yet";
}

// Show score on page load
function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        const score = getScore(currentLesson);
        scoreDisplay.innerHTML = `Previous Score for Lesson ${currentLesson}: ${score}`;
    } else {
        console.log("Score display element not found, skipping showScore");
    }
}