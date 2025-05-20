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
    const lessonId = urlParams.get('lesson') || 17;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    17: {
        title: "Data Representation",
        content: [
            {
                type: "example",
                title: "Example 1: Interpreting a Table",
                passage: "A table shows the average rainfall in City A: January (2 inches), February (3 inches), March (5 inches).",
                content: `
                    <h2>Example 1: Interpreting a Table</h2>
                    <p>Question: What trend does the rainfall data show?</p>
                    <p>Step 1: Analyze the data: Compare rainfall across months (2, 3, 5 inches).</p>
                    <p>Step 2: Apply rule: Trends in tables are identified by comparing values over time.</p>
                    <p>Solution: The rainfall in City A increases from January to March.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "A table lists daily temperatures: Monday (60°F), Tuesday (65°F), Wednesday (70°F).",
                question: "What trend does the temperature data show?",
                options: [
                    { text: "A) Increasing temperature", correct: true },
                    { text: "B) Decreasing temperature", correct: false },
                    { text: "C) Constant temperature", correct: false },
                    { text: "D) No clear trend", correct: false }
                ],
                explanation: "Temperatures rise from 60°F to 70°F, indicating an increasing trend, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Analyzing a Graph",
                passage: "A line graph shows a company’s sales: 2020 ($100,000), 2021 ($120,000), 2022 ($110,000).",
                content: `
                    <h2>Example 2: Analyzing a Graph</h2>
                    <p>Question: What does the graph imply about sales performance?</p>
                    <p>Step 1: Analyze the data: Sales rise from 2020 to 2021, then dip in 2022.</p>
                    <p>Step 2: Apply rule: Graphs show trends or fluctuations over time.</p>
                    <p>Solution: Sales peaked in 2021 but declined slightly in 2022, suggesting inconsistent growth.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "A line graph shows student enrollment: 2019 (500), 2020 (550), 2021 (520).",
                question: "What does the graph imply about enrollment?",
                options: [
                    { text: "A) It peaked in 2020 but declined in 2021.", correct: true },
                    { text: "B) It increased steadily each year.", correct: false },
                    { text: "C) It remained constant.", correct: false },
                    { text: "D) It decreased steadily.", correct: false }
                ],
                explanation: "Enrollment rose to 550 in 2020 then fell to 520 in 2021, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Identifying Relationships",
                passage: "A scatter plot shows hours studied vs. test scores: more hours correlate with higher scores.",
                content: `
                    <h2>Example 3: Identifying Relationships</h2>
                    <p>Question: What relationship does the scatter plot show?</p>
                    <p>Step 1: Analyze the plot: More hours studied align with higher scores.</p>
                    <p>Step 2: Apply rule: Scatter plots reveal correlations between variables.</p>
                    <p>Solution: The scatter plot shows a positive correlation between study hours and test scores.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "A scatter plot shows exercise time vs. heart rate: more exercise correlates with lower resting heart rates.",
                question: "What relationship does the scatter plot show?",
                options: [
                    { text: "A) Negative correlation between exercise and heart rate", correct: true },
                    { text: "B) Positive correlation between exercise and heart rate", correct: false },
                    { text: "C) No correlation between variables", correct: false },
                    { text: "D) Constant heart rate regardless of exercise", correct: false }
                ],
                explanation: "More exercise lowers heart rate, indicating a negative correlation, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Understanding Data Summaries",
                passage: "A report summarizes survey results: 60% of respondents prefer online learning, 30% prefer in-person, 10% are undecided.",
                content: `
                    <h2>Example 4: Understanding Data Summaries</h2>
                    <p>Question: What does the summary imply about learning preferences?</p>
                    <p>Step 1: Analyze percentages: 60% is the majority, 30% and 10% are smaller.</p>
                    <p>Step 2: Apply rule: Summaries highlight dominant trends or preferences.</p>
                    <p>Solution: The summary implies a strong preference for online learning among respondents.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "A survey summary states: 70% support recycling programs, 20% oppose, 10% are neutral.",
                question: "What does the summary imply about recycling support?",
                options: [
                    { text: "A) Most support recycling programs.", correct: true },
                    { text: "B) Most oppose recycling programs.", correct: false },
                    { text: "C) Opinions are evenly split.", correct: false },
                    { text: "D) Few have an opinion on recycling.", correct: false }
                ],
                explanation: "70% supporting recycling indicates majority support, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Drawing Conclusions",
                passage: "A bar graph shows car sales by color: Blue (40%), Red (30%), White (20%), Other (10%).",
                content: `
                    <h2>Example 5: Drawing Conclusions</h2>
                    <p>Question: What conclusion can be drawn about car color preferences?</p>
                    <p>Step 1: Analyze the data: Blue has the highest percentage, followed by red and white.</p>
                    <p>Step 2: Apply rule: Bar graphs show relative quantities to infer preferences.</p>
                    <p>Solution: Blue is the most popular car color, followed by red and white.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "A bar graph shows pet ownership: Dogs (50%), Cats (30%), Birds (15%), Other (5%).",
                question: "What conclusion can be drawn about pet preferences?",
                options: [
                    { text: "A) Dogs are the most popular pet.", correct: true },
                    { text: "B) Cats are the most popular pet.", correct: false },
                    { text: "C) Birds are equally popular as dogs.", correct: false },
                    { text: "D) Most own other pets.", correct: false }
                ],
                explanation: "50% for dogs indicates they are most popular, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Making Predictions",
                passage: "A line graph shows a town’s population: 2018 (10,000), 2019 (10,500), 2020 (11,000).",
                content: `
                    <h2>Example 6: Making Predictions</h2>
                    <p>Question: Based on the trend, what can be predicted for 2021 population?</p>
                    <p>Step 1: Analyze the trend: Population increases by 500 each year.</p>
                    <p>Step 2: Apply rule: Consistent trends in graphs allow predictions.</p>
                    <p>Solution: The population in 2021 is likely around 11,500, continuing the upward trend.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "A line graph shows a store’s revenue: 2021 ($50,000), 2022 ($55,000), 2023 ($60,000).",
                question: "Based on the trend, what can be predicted for 2024 revenue?",
                options: [
                    { text: "A) Around $65,000", correct: true },
                    { text: "B) Around $50,000", correct: false },
                    { text: "C) Around $55,000", correct: false },
                    { text: "D) Around $60,000", correct: false }
                ],
                explanation: "Revenue increases by $5,000 yearly, predicting $65,000 for 2024, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Comparing Data Sets",
                passage: "Two tables show test scores: Class A (mean: 85, range: 70-95) and Class B (mean: 80, range: 65-90).",
                content: `
                    <h2>Example 7: Comparing Data Sets</h2>
                    <p>Question: What does the comparison of means and ranges imply?</p>
                    <p>Step 1: Analyze data: Class A has a higher mean and wider range.</p>
                    <p>Step 2: Apply rule: Comparing data sets reveals performance differences.</p>
                    <p>Solution: Class A performs slightly better on average but with more variability than Class B.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Two tables show sales: Store X (mean: $1,000, range: $800-$1,200) and Store Y (mean: $900, range: $850-$950).",
                question: "What does the comparison of means and ranges imply?",
                options: [
                    { text: "A) Store X has higher but more variable sales.", correct: true },
                    { text: "B) Store Y has higher and more variable sales.", correct: false },
                    { text: "C) Both have identical sales patterns.", correct: false },
                    { text: "D) Store X has lower sales overall.", correct: false }
                ],
                explanation: "Store X’s higher mean and wider range indicate higher but variable sales, making A correct."
            }
        ]
    }
};

// ACT English question array (adapted for Data Representation)
const englishQuestions = [
    {
        passage: "A table shows plant growth: Week 1 (2 cm), Week 2 (5 cm), Week 3 (9 cm).",
        question: "What trend does the plant growth data show?",
        answers: [
            { text: "A) Increasing growth rate", correct: true },
            { text: "B) Decreasing growth rate", correct: false },
            { text: "C) Constant growth rate", correct: false },
            { text: "D) No clear trend", correct: false }
        ],
        explanation: "Growth increases from 2 cm to 9 cm, indicating an increasing trend, making A correct.",
        difficulty: "easy",
        category: "act-data-representation"
    },
    {
        passage: "A line graph shows a city’s air quality index: 2020 (80), 2021 (75), 2022 (70).",
        question: "What does the graph imply about air quality?",
        answers: [
            { text: "A) It improved over time.", correct: true },
            { text: "B) It worsened over time.", correct: false },
            { text: "C) It remained constant.", correct: false },
            { text: "D) It fluctuated randomly.", correct: false }
        ],
        explanation: "The index decreases from 80 to 70, implying improved air quality, making A correct.",
        difficulty: "medium",
        category: "act-data-representation"
    },
    {
        passage: "A scatter plot shows coffee consumption vs. productivity: higher coffee intake correlates with higher productivity.",
        question: "What relationship does the scatter plot show?",
        answers: [
            { text: "A) Positive correlation between coffee and productivity", correct: true },
            { text: "B) Negative correlation between coffee and productivity", correct: false },
            { text: "C) No correlation between variables", correct: false },
            { text: "D) Constant productivity regardless of coffee", correct: false }
        ],
        explanation: "Higher coffee intake aligns with higher productivity, indicating a positive correlation, making A correct.",
        difficulty: "medium",
        category: "act-data-representation"
    },
    {
        passage: "A survey summary reports: 55% prefer electric cars, 35% prefer gas cars, 10% are undecided.",
        question: "What does the summary imply about car preferences?",
        answers: [
            { text: "A) Most prefer electric cars.", correct: true },
            { text: "B) Most prefer gas cars.", correct: false },
            { text: "C) Preferences are evenly split.", correct: false },
            { text: "D) Few have a preference.", correct: false }
        ],
        explanation: "55% favoring electric cars indicates majority preference, making A correct.",
        difficulty: "easy",
        category: "act-data-representation"
    },
    {
        passage: "A bar graph shows fruit sales: Apples (40%), Oranges (25%), Bananas (20%), Other (15%).",
        question: "What conclusion can be drawn about fruit preferences?",
        answers: [
            { text: "A) Apples are the most popular fruit.", correct: true },
            { text: "B) Oranges are the most popular fruit.", correct: false },
            { text: "C) Bananas are equally popular as apples.", correct: false },
            { text: "D) Most prefer other fruits.", correct: false }
        ],
        explanation: "40% for apples indicates they are most popular, making A correct.",
        difficulty: "medium",
        category: "act-data-representation"
    },
    {
        passage: "A line graph shows a school’s budget: 2020 ($200,000), 2021 ($220,000), 2022 ($240,000).",
        question: "Based on the trend, what can be predicted for 2023 budget?",
        answers: [
            { text: "A) Around $260,000", correct: true },
            { text: "B) Around $200,000", correct: false },
            { text: "C) Around $220,000", correct: false },
            { text: "D) Around $240,000", correct: false }
        ],
        explanation: "The budget increases by $20,000 yearly, predicting $260,000 for 2023, making A correct.",
        difficulty: "medium",
        category: "act-data-representation"
    },
    {
        passage: "Two tables show quiz scores: Group 1 (mean: 90, range: 80-100) and Group 2 (mean: 85, range: 75-95).",
        question: "What does the comparison of means and ranges imply?",
        answers: [
            { text: "A) Group 1 has higher but more variable scores.", correct: true },
            { text: "B) Group 2 has higher and more variable scores.", correct: false },
            { text: "C) Both have identical score patterns.", correct: false },
            { text: "D) Group 1 has lower scores overall.", correct: false }
        ],
        explanation: "Group 1’s higher mean and wider range indicate higher but variable scores, making A correct.",
        difficulty: "medium",
        category: "act-data-representation"
    }
];

// Variables
let categoryStats = {
    "act-data-representation": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "17";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
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
                <div class="question-row reading-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.content}</div>
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
                <div class="question-row reading-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question}</div>
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

// Extract passage from content (for compatibility, though not used)
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
        categoryStats["act-data-representation"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-data-representation"].incorrect++;
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
        case 17: return englishQuestions;
        default: return englishQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row reading-section">
                <div class="passage-text">${question.passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question}</div>
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
        exam: "ACT",
        type: "lesson",
        lessonId: currentLesson,
        category: "act-data-representation",
        title: lessons[currentLesson].title,
        timestamp: new Date().toISOString()
    };
    let completions = JSON.parse(localStorage.getItem("lessonCompletions") || "[]");
    completions = completions.filter(comp => !(comp.exam === "ACT" && comp.lessonId === currentLesson));
    completions.push(completionData);
    localStorage.setItem("lessonCompletions", JSON.stringify(completions));
    localStorage.setItem("lastActivity", JSON.stringify(completionData));
    console.log("Saved lesson completion:", completionData);
}

// Show final score
function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["act-data-representation"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-data-representation"].incorrect;

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
    if (finalScoreElement) finalScoreElement.classList.add('hide');

    console.log("Stored lessonCompletions:", localStorage.getItem("lessonCompletions"));
    console.log("Stored actTestResults:", localStorage.getItem("actTestResults"));
    console.log("Stored lastActivity:", localStorage.getItem("lastActivity"));

    document.getElementById('continue-button').addEventListener('click', () => {
        saveLessonCompletion();
        console.log("Redirecting to user profile after saving completion");
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

// Record test results
function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("actTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("actTestResults", JSON.stringify(results));
    console.log("Final stored actTestResults:", results);
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
    localStorage.setItem(`act-data-representation-lessonScore-${lessonId}`, score);
    console.log(`Saved act-data-representation-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-data-representation-lessonScore-${lessonId}`) || "Not completed yet";
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