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
        title: "Economics",
        content: [
            {
                type: "example",
                title: "Example 1: Supply and Demand",
                content: `
                    <h2>Example 1: Supply and Demand</h2>
                    <p>Passage: Supply and demand determine prices in a market economy. When demand for a product increases and supply remains constant, prices rise.</p>
                    <p>Question: What happens to prices when demand increases and supply is constant?</p>
                    <p>Step 1: Identify principle: Supply and demand affect prices.</p>
                    <p>Step 2: Apply: Increased demand with constant supply causes prices to rise.</p>
                    <p>Solution: Prices rise when demand increases and supply is constant.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: In a market, if the supply of a good decreases while demand stays constant, prices increase. What happens to prices if supply decreases and demand is unchanged?",
                options: [
                    { text: "A) Prices increase", correct: true },
                    { text: "B) Prices decrease", correct: false },
                    { text: "C) Prices stay the same", correct: false },
                    { text: "D) Prices fluctuate randomly", correct: false }
                ],
                explanation: "The passage states that decreasing supply with constant demand increases prices, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Market Structures",
                content: `
                    <h2>Example 2: Market Structures</h2>
                    <p>Passage: Market structures include monopolies, where one firm controls the market, and perfect competition, where many firms offer similar products. Monopolies often lead to higher prices due to lack of competition.</p>
                    <p>Question: Why do monopolies often lead to higher prices?</p>
                    <p>Step 1: Identify cause: Lack of competition in monopolies.</p>
                    <p>Step 2: Explain: Without competitors, firms can set higher prices.</p>
                    <p>Solution: Monopolies lead to higher prices due to lack of competition.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: In perfect competition, many firms compete, keeping prices low. Why do prices tend to be low in perfect competition?",
                options: [
                    { text: "A) High competition", correct: true },
                    { text: "B) Single firm control", correct: false },
                    { text: "C) Government regulation", correct: false },
                    { text: "D) Low demand", correct: false }
                ],
                explanation: "The passage states many firms compete in perfect competition, keeping prices low, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Economic Systems",
                content: `
                    <h2>Example 3: Economic Systems</h2>
                    <p>Passage: Economic systems include market, command, and mixed economies. In a market economy, individuals make production and consumption decisions, guided by supply and demand.</p>
                    <p>Question: Who makes production decisions in a market economy?</p>
                    <p>Step 1: Identify decision-makers: Individuals in a market economy.</p>
                    <p>Step 2: Confirm: Decisions are guided by supply and demand.</p>
                    <p>Solution: Individuals make production decisions in a market economy.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: In a command economy, the government controls production and prices, unlike a market economy. Who controls production in a command economy?",
                options: [
                    { text: "A) Government", correct: true },
                    { text: "B) Individuals", correct: false },
                    { text: "C) Corporations", correct: false },
                    { text: "D) Consumers", correct: false }
                ],
                explanation: "The passage states the government controls production in a command economy, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Fiscal Policy",
                content: `
                    <h2>Example 4: Fiscal Policy</h2>
                    <p>Passage: Fiscal policy involves government spending and taxation to influence the economy. During a recession, increased spending can stimulate economic growth.</p>
                    <p>Question: How can fiscal policy stimulate economic growth during a recession?</p>
                    <p>Step 1: Identify tool: Increased government spending.</p>
                    <p>Step 2: Explain: Spending boosts economic activity.</p>
                    <p>Solution: Fiscal policy stimulates growth through increased government spending.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: Fiscal policy uses taxation to manage economic conditions. Reducing taxes can increase consumer spending. What can reducing taxes achieve?",
                options: [
                    { text: "A) Increase consumer spending", correct: true },
                    { text: "B) Decrease government revenue", correct: false },
                    { text: "C) Raise interest rates", correct: false },
                    { text: "D) Limit exports", correct: false }
                ],
                explanation: "The passage states reducing taxes increases consumer spending, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Monetary Policy",
                content: `
                    <h2>Example 5: Monetary Policy</h2>
                    <p>Passage: Monetary policy, managed by the Federal Reserve, controls money supply and interest rates. Lowering interest rates encourages borrowing and investment.</p>
                    <p>Question: What does lowering interest rates encourage?</p>
                    <p>Step 1: Identify effect: Encourages borrowing and investment.</p>
                    <p>Step 2: Confirm: Lower rates make loans cheaper.</p>
                    <p>Solution: Lowering interest rates encourages borrowing and investment.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: The Federal Reserve raises interest rates to slow inflation. What is the purpose of raising interest rates?",
                options: [
                    { text: "A) Slow inflation", correct: true },
                    { text: "B) Increase borrowing", correct: false },
                    { text: "C) Boost exports", correct: false },
                    { text: "D) Reduce taxes", correct: false }
                ],
                explanation: "The passage states raising interest rates slows inflation, making A correct."
            },
            {
                type: "example",
                title: "Example 6: International Trade",
                content: `
                    <h2>Example 6: International Trade</h2>
                    <p>Passage: International trade involves importing and exporting goods. A trade deficit occurs when a country imports more than it exports, affecting its economy.</p>
                    <p>Question: What is a trade deficit?</p>
                    <p>Step 1: Define: Imports exceed exports.</p>
                    <p>Step 2: Confirm: This imbalance impacts the economy.</p>
                    <p>Solution: A trade deficit occurs when imports exceed exports.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: A trade surplus happens when a country exports more than it imports, boosting its economy. What is a trade surplus?",
                options: [
                    { text: "A) Exports exceed imports", correct: true },
                    { text: "B) Imports exceed exports", correct: false },
                    { text: "C) Equal imports and exports", correct: false },
                    { text: "D) No trade activity", correct: false }
                ],
                explanation: "The passage states a trade surplus is when exports exceed imports, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Gross Domestic Product (GDP)",
                content: `
                    <h2>Example 7: Gross Domestic Product (GDP)</h2>
                    <p>Passage: GDP measures a country’s economic output. It includes goods and services produced within a nation. Rising GDP indicates economic growth.</p>
                    <p>Question: What does rising GDP indicate?</p>
                    <p>Step 1: Identify indicator: Rising GDP shows economic growth.</p>
                    <p>Step 2: Confirm: It reflects increased production.</p>
                    <p>Solution: Rising GDP indicates economic growth.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: GDP tracks the value of goods and services. A declining GDP suggests an economic downturn. What does a declining GDP indicate?",
                options: [
                    { text: "A) Economic downturn", correct: true },
                    { text: "B) Economic growth", correct: false },
                    { text: "C) Stable economy", correct: false },
                    { text: "D) Increased exports", correct: false }
                ],
                explanation: "The passage states a declining GDP suggests an economic downturn, making A correct."
            }
        ]
    }
};

// Economics question array
const economicsQuestions = [
    {
        question: "Passage: Opportunity cost is the value of the next best alternative forgone when making a decision. Choosing to produce more cars may reduce truck production. What is the opportunity cost of producing more cars?",
        answers: [
            { text: "A) Reduced truck production", correct: true },
            { text: "B) Increased car production", correct: false },
            { text: "C) Higher car prices", correct: false },
            { text: "D) Lower truck demand", correct: false }
        ],
        explanation: "The passage states choosing more cars reduces truck production, which is the opportunity cost, making A correct.",
        difficulty: "easy",
        category: "ged-economics"
    },
    {
        question: "What is the primary effect of an increase in the supply of a good, assuming demand remains constant?",
        answers: [
            { text: "A) The price of the good decreases", correct: true },
            { text: "B) The price of the good increases", correct: false },
            { text: "C) The demand for the good increases", correct: false },
            { text: "D) The quantity demanded decreases", correct: false }
        ],
        explanation: "When the supply of a good increases and demand remains constant, the market experiences a surplus, leading to a decrease in the price of the good. Increased supply does not directly affect demand or reduce quantity demanded, and it does not increase price. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        question: "What is the main purpose of a tariff imposed on imported goods?",
        answers: [
            { text: "A) To reduce government spending", correct: false },
            { text: "B) To protect domestic industries from foreign competition", correct: true },
            { text: "C) To decrease the price of imported goods", correct: false },
            { text: "D) To increase consumer demand for imports", correct: false }
        ],
        explanation: "A tariff is a tax on imported goods designed to protect domestic industries by making foreign goods more expensive, encouraging consumers to buy local products. It does not reduce government spending, lower import prices, or increase import demand. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        question: "In a market economy, what primarily determines the price of a good or service?",
        answers: [
            { text: "A) Government regulations", correct: false },
            { text: "B) Supply and demand", correct: true },
            { text: "C) Production costs alone", correct: false },
            { text: "D) Consumer income levels", correct: false }
        ],
        explanation: "In a market economy, the price of a good or service is primarily determined by the interaction of supply and demand. Government regulations, production costs, and consumer income may influence price but are not the primary determinants. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        question: "What is an example of a fiscal policy action to stimulate economic growth during a recession?",
        answers: [
            { text: "A) Increasing government spending on infrastructure", correct: true },
            { text: "B) Raising interest rates", correct: false },
            { text: "C) Reducing the money supply", correct: false },
            { text: "D) Increasing export tariffs", correct: false }
        ],
        explanation: "Fiscal policy to stimulate economic growth during a recession often involves increasing government spending, such as on infrastructure, to boost demand. Raising interest rates and reducing money supply are monetary policies that slow growth, and tariffs hinder trade. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        question: "What is the term for the total value of all goods and services produced within a country in a given period?",
        answers: [
            { text: "A) Net exports", correct: false },
            { text: "B) Consumer price index", correct: false },
            { text: "C) Gross domestic product", correct: true },
            { text: "D) Trade deficit", correct: false }
        ],
        explanation: "Gross domestic product (GDP) measures the total value of all goods and services produced within a country over a specific period. Net exports are part of GDP, the consumer price index measures inflation, and a trade deficit reflects import-export imbalance. Thus, option C is correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        question: "What happens to unemployment rates during an economic boom, assuming other factors remain constant?",
        answers: [
            { text: "A) Unemployment rates increase", correct: false },
            { text: "B) Unemployment rates remain unchanged", correct: false },
            { text: "C) Unemployment rates fluctuate randomly", correct: false },
            { text: "D) Unemployment rates decrease", correct: true }
        ],
        explanation: "During an economic boom, increased economic activity typically leads to more job opportunities, reducing unemployment rates. Unemployment does not increase, remain unchanged, or fluctuate randomly under these conditions. Thus, option D is correct.",
        difficulty: "medium",
        category: "ged-economics"
    }
];

// Variables
let categoryStats = {
    "ged-economics": { correct: 0, incorrect: 0 }
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
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/Passage:.*?(\.(?=\s*What|\s*Which|\s*Why|\s*How)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
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
        categoryStats["ged-economics"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-economics"].incorrect++;
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
        case 1: return economicsQuestions;
        default: return economicsQuestions;
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
    let totalCorrect = categoryStats["ged-economics"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-economics"].incorrect;

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
    localStorage.setItem(`ged-economics-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-economics-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-economics-lessonScore-${lessonId}`) || "Not completed yet";
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