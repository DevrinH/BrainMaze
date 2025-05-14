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
                passage: "In 2023, a popular smartphone model saw a surge in consumer demand in Millville due to new features, but production remained limited. In a market economy, supply and demand dictate pricing, so when demand increases while supply stays constant, prices typically rise.",
                question: "What happens to prices if demand increases and supply is unchanged?",
                options: [
                    { text: "A) Prices increase", correct: true },
                    { text: "B) Prices decrease", correct: false },
                    { text: "C) Prices stay the same", correct: false },
                    { text: "D) Prices fluctuate randomly", correct: false }
                ],
                explanation: "The passage states that increasing demand with constant supply increases prices, making A correct."
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
                passage: "In Greenvale’s coffee market in 2024, numerous cafes offered similar products, creating a competitive environment. In perfect competition, many firms vie for customers, which keeps prices low as businesses strive to attract buyers with affordable offerings.",
                question: "Why do prices tend to be low in perfect competition?",
                options: [
                    { text: "A) Single firm control", correct: false },
                    { text: "B) High competition", correct: true },
                    { text: "C) Government regulation", correct: false },
                    { text: "D) Low demand", correct: false }
                ],
                explanation: "The passage states many firms compete in perfect competition, keeping prices low, making B correct."
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
                passage: "In 2023, Clearwater’s economy was analyzed to understand its structure. In a command economy, unlike a market economy, the government centrally controls production and prices, directing resources to meet state priorities rather than individual consumer preferences.",
                question: "Who controls production in a command economy?",
                options: [
                    { text: "A) Individuals", correct: false },
                    { text: "B) Government", correct: true },
                    { text: "C) Corporations", correct: false },
                    { text: "D) Consumers", correct: false }
                ],
                explanation: "The passage states the government controls production in a command economy, making B correct."
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
                passage: "In 2024, Millville’s government implemented fiscal policy to counter an economic slowdown. By reducing taxes, policymakers aimed to increase consumer spending, as fiscal policy uses taxation adjustments to stimulate economic activity and encourage growth during challenging times.",
                question: "What can reducing taxes achieve?",
                options: [
                    { text: "A) Decrease government revenue", correct: false },
                    { text: "B) Increase consumer spending", correct: true },
                    { text: "C) Raise interest rates", correct: false },
                    { text: "D) Limit exports", correct: false }
                ],
                explanation: "The passage states reducing taxes increases consumer spending, making B correct."
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
                passage: "In 2023, the Federal Reserve in Greenvale adjusted monetary policy to address rising prices. By raising interest rates, the central bank aimed to slow inflation, as higher rates reduce borrowing and spending, helping stabilize the economy.",
                question: "What is the purpose of raising interest rates?",
                options: [
                    { text: "A) Increase borrowing", correct: false },
                    { text: "B) Slow inflation", correct: true },
                    { text: "C) Boost exports", correct: false },
                    { text: "D) Reduce taxes", correct: false }
                ],
                explanation: "The passage states raising interest rates slows inflation, making B correct."
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
                passage: "In 2024, Clearwater’s trade data showed a favorable balance due to strong manufacturing exports. A trade surplus occurs when a country exports more than it imports, boosting economic growth by increasing revenue from foreign markets.",
                question: "What is a trade surplus?",
                options: [
                    { text: "A) Imports exceed exports", correct: false },
                    { text: "B) Equal imports and exports", correct: false },
                    { text: "C) Exports exceed imports", correct: true },
                    { text: "D) No trade activity", correct: false }
                ],
                explanation: "The passage states a trade surplus is when exports exceed imports, making C correct."
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
                passage: "In 2023, Millville’s economic analysts noted a decline in the value of goods and services produced domestically. A declining GDP suggests an economic downturn, signaling reduced economic activity and potential challenges for businesses and workers.",
                question: "What does a declining GDP indicate?",
                options: [
                    { text: "A) Economic growth", correct: false },
                    { text: "B) Stable economy", correct: false },
                    { text: "C) Increased exports", correct: false },
                    { text: "D) Economic downturn", correct: true }
                ],
                explanation: "The passage states a declining GDP suggests an economic downturn, making D correct."
            }
        ]
    }
};

// Economics question array
const economicsQuestions = [
    {
        passage: "In 2023, a Millville factory faced a decision to allocate resources to produce more cars, which meant reducing truck production. Opportunity cost represents the value of the next best alternative forgone, such as the lost truck output in this scenario.",
        question: "What is the opportunity cost of producing more cars?",
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
        passage: "In 2024, Greenvale consumers noticed rising prices for everyday goods like groceries and fuel. Inflation, the general increase in price levels, reduces purchasing power, eroding savings and increasing living costs as money buys less over time.",
        question: "What is a consequence of high inflation?",
        answers: [
            { text: "A) Increased savings value", correct: false },
            { text: "B) Reduced purchasing power", correct: true },
            { text: "C) Lower living costs", correct: false },
            { text: "D) Stable prices", correct: false }
        ],
        explanation: "The passage states high inflation reduces purchasing power, making B correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        passage: "During an economic downturn in Clearwater in 2023, many workers lost jobs as businesses cut back. Cyclical unemployment, which rises during recessions due to reduced demand, reflects the percentage of the labor force actively seeking work but unemployed.",
        question: "What causes cyclical unemployment to increase?",
        answers: [
            { text: "A) Economic downturns", correct: true },
            { text: "B) Higher wages", correct: false },
            { text: "C) Increased labor force participation", correct: false },
            { text: "D) Technological advances", correct: false }
        ],
        explanation: "The passage states cyclical unemployment rises during economic downturns, making A correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        passage: "In 2024, Millville’s government imposed tariffs on imported electronics to protect local manufacturers. Tariffs, taxes on imports, raise the cost of foreign goods, often leading to higher consumer prices as domestic alternatives may also increase in price.",
        question: "What is one effect of tariffs?",
        answers: [
            { text: "A) Lower import prices", correct: false },
            { text: "B) Reduced domestic production", correct: false },
            { text: "C) Higher consumer prices", correct: true },
            { text: "D) Decreased government revenue", correct: false }
        ],
        explanation: "The passage states tariffs raise consumer prices, making C correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        passage: "In 2023, Greenvale’s economists used the Consumer Price Index (CPI) to monitor price changes for a basket of goods and services. A rising CPI indicates increasing prices, serving as a key measure of inflation affecting household budgets.",
        question: "What does a rising CPI measure?",
        answers: [
            { text: "A) Unemployment rate", correct: false },
            { text: "B) Inflation", correct: true },
            { text: "C) Economic growth", correct: false },
            { text: "D) Trade balance", correct: false }
        ],
        explanation: "The passage states a rising CPI measures inflation, making B correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        passage: "During an economic boom in Clearwater in 2024, local businesses reported higher sales as residents spent more freely. Consumer behavior, particularly increased spending during prosperous times, drives demand, fueling market growth and economic expansion.",
        question: "What drives demand during economic booms?",
        answers: [
            { text: "A) Reduced consumer confidence", correct: false },
            { text: "B) Higher interest rates", correct: false },
            { text: "C) Increased consumer spending", correct: true },
            { text: "D) Lower wages", correct: false }
        ],
        explanation: "The passage states increased consumer spending drives demand during economic booms, making C correct.",
        difficulty: "medium",
        category: "ged-economics"
    },
    {
        passage: "In 2024, Millville’s labor market was tight, with low unemployment rates. In such conditions, firms compete for workers, leading to higher wages as businesses offer better pay to attract and retain employees, reflecting supply and demand dynamics.",
        question: "What causes higher wages in a tight labor market?",
        answers: [
            { text: "A) High unemployment", correct: false },
            { text: "B) Low demand for workers", correct: false },
            { text: "C) Increased labor supply", correct: false },
            { text: "D) Firms competing for workers", correct: true }
        ],
        explanation: "The passage states firms competing for workers in a tight labor market leads to higher wages, making D correct.",
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
        console.error("Start lesson button not found!");
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
            lessonContent.innerHTML = `
                <div class="question-row social-studies-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question}</div>
                        <div class="answer-choices" id="answer-buttons"></div>
                        <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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

// Extract passage from content (simplified for examples and questions)
function extractPassage(content) {
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/In.*?(\.(?=\s*The\s|\s*This\s)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
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
                    <button id="start-quiz-btn" class="next-btn">Next</button>
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
        lessonContent.innerHTML = `
            <div class="question-row social-studies-section">
                <div class="passage-text">${question.passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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