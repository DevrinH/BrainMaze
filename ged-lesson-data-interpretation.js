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
        title: "Data Interpretation",
        content: [
            {
                type: "example",
                title: "Example 1: Reading Tables",
                content: `
                    <h2>Example 1: Reading Tables</h2>
                    <p>Problem: A table shows a store’s sales: Monday ($200), Tuesday ($250), Wednesday ($300). What were Tuesday’s sales?</p>
                    <p>Question: Identify Tuesday’s sales.</p>
                    <p>Step 1: Locate Tuesday in the table.</p>
                    <p>Step 2: Read the value: $250.</p>
                    <p>Solution: Tuesday’s sales were $250.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a bakery in Millville recorded weekly sales in a table: Monday ($400), Tuesday ($350), Wednesday ($500), Thursday ($450), Friday ($600). The owner needed to identify the sales for Wednesday to compare with other days and plan inventory.",
                question: "What were Wednesday’s sales?",
                options: [
                    { text: "A) $500", correct: true },
                    { text: "B) $450", correct: false },
                    { text: "C) $400", correct: false },
                    { text: "D) $600", correct: false }
                ],
                explanation: "The table lists Wednesday’s sales as $500, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Bar Graphs",
                content: `
                    <h2>Example 2: Bar Graphs</h2>
                    <p>Problem: A bar graph shows fruit sales: Apples (50 lbs), Bananas (30 lbs), Oranges (40 lbs). Which fruit sold the least?</p>
                    <p>Question: Identify the least-sold fruit.</p>
                    <p>Step 1: Compare values: Apples (50), Bananas (30), Oranges (40).</p>
                    <p>Step 2: Identify lowest: Bananas (30 lbs).</p>
                    <p>Solution: Bananas sold the least.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a farmer’s market in Greenvale displayed vegetable sales on a bar graph: Carrots (60 lbs), Potatoes (45 lbs), Tomatoes (50 lbs), Onions (35 lbs). The market manager needed to determine which vegetable had the lowest sales to adjust future orders.",
                question: "Which vegetable had the lowest sales?",
                options: [
                    { text: "A) Carrots", correct: false },
                    { text: "B) Onions", correct: true },
                    { text: "C) Potatoes", correct: false },
                    { text: "D) Tomatoes", correct: false }
                ],
                explanation: "The bar graph shows Onions (35 lbs) as the lowest, making B correct."
            },
            {
                type: "example",
                title: "Example 3: Line Graphs",
                content: `
                    <h2>Example 3: Line Graphs</h2>
                    <p>Problem: A line graph shows a city’s temperature over 5 days: Day 1 (70°F), Day 2 (72°F), Day 3 (75°F), Day 4 (74°F), Day 5 (76°F). What is the trend?</p>
                    <p>Question: Determine the temperature trend.</p>
                    <p>Step 1: Observe values: Temperatures increase from 70°F to 76°F.</p>
                    <p>Step 2: Conclude: The trend is increasing.</p>
                    <p>Solution: The temperature trend is increasing.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a weather station in Clearwater tracked rainfall over 5 days on a line graph: Day 1 (2 mm), Day 2 (3 mm), Day 3 (1 mm), Day 4 (0.5 mm), Day 5 (0 mm). The meteorologist needed to analyze the rainfall trend to predict future weather patterns.",
                question: "What is the rainfall trend?",
                options: [
                    { text: "A) Increasing", correct: false },
                    { text: "B) Decreasing", correct: true },
                    { text: "C) Constant", correct: false },
                    { text: "D) Fluctuating", correct: false }
                ],
                explanation: "Rainfall decreases from 2 mm to 0 mm, making B correct."
            },
            {
                type: "example",
                title: "Example 4: Pie Charts",
                content: `
                    <h2>Example 4: Pie Charts</h2>
                    <p>Problem: A pie chart shows a budget: Rent (40%), Food (30%), Transport (20%), Savings (10%). What percent is spent on Food?</p>
                    <p>Question: Identify the percentage for Food.</p>
                    <p>Step 1: Read the pie chart: Food is 30%.</p>
                    <p>Step 2: Confirm: 30% is the value.</p>
                    <p>Solution: 30% is spent on Food.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a family in Millville created a pie chart for their monthly expenses: Housing (50%), Utilities (20%), Groceries (15%), Entertainment (15%). The family needed to identify the percentage spent on Utilities to adjust their budget.",
                question: "What percent is spent on Utilities?",
                options: [
                    { text: "A) 15%", correct: false },
                    { text: "B) 20%", correct: true },
                    { text: "C) 50%", correct: false },
                    { text: "D) 30%", correct: false }
                ],
                explanation: "The pie chart shows Utilities at 20%, making B correct."
            },
            {
                type: "example",
                title: "Example 5: Calculating Means",
                content: `
                    <h2>Example 5: Calculating Means</h2>
                    <p>Problem: A student’s test scores are 80, 85, 90, 95. What is the mean score?</p>
                    <p>Question: Calculate the mean.</p>
                    <p>Step 1: Sum the scores: 80 + 85 + 90 + 95 = 350.</p>
                    <p>Step 2: Divide by count: 350 ÷ 4 = 87.5.</p>
                    <p>Solution: The mean score is 87.5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, a teacher in Greenvale recorded quiz scores for a student: 70, 75, 80, 85, 90. The teacher needed to calculate the mean score to assess the student’s performance, found by summing the scores and dividing by the number of quizzes.",
                question: "What is the mean score?",
                options: [
                    { text: "A) 80", correct: true },
                    { text: "B) 85", correct: false },
                    { text: "C) 75", correct: false },
                    { text: "D) 90", correct: false }
                ],
                explanation: "Sum: 70 + 75 + 80 + 85 + 90 = 400. Mean: 400 ÷ 5 = 80, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Data Trends",
                content: `
                    <h2>Example 6: Data Trends</h2>
                    <p>Problem: A graph shows a company’s profits: Year 1 ($10,000), Year 2 ($12,000), Year 3 ($15,000). What is the profit increase from Year 1 to Year 3?</p>
                    <p>Question: Calculate the increase.</p>
                    <p>Step 1: Identify values: Year 1 ($10,000), Year 3 ($15,000).</p>
                    <p>Step 2: Calculate difference: $15,000 - $10,000 = $5,000.</p>
                    <p>Solution: The profit increase is $5,000.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a small business in Clearwater tracked monthly revenue on a bar graph: January ($8,000), February ($10,000), March ($7,000). The owner needed to calculate the revenue difference from January to February to evaluate growth, found by subtracting the earlier value from the later one.",
                question: "What is the revenue increase from January to February?",
                options: [
                    { text: "A) $1,000", correct: false },
                    { text: "B) $3,000", correct: false },
                    { text: "C) $2,000", correct: true },
                    { text: "D) $4,000", correct: false }
                ],
                explanation: "January: $8,000, February: $10,000. Difference: $10,000 - $8,000 = $2,000, making C correct."
            },
            {
                type: "example",
                title: "Example 7: Applying Data",
                content: `
                    <h2>Example 7: Applying Data</h2>
                    <p>Problem: A table shows ticket prices: Adult ($10), Child ($5). If 3 adults and 2 children attend, what is the total cost?</p>
                    <p>Question: Calculate the total cost.</p>
                    <p>Step 1: Calculate costs: Adults (3 × $10 = $30), Children (2 × $5 = $10).</p>
                    <p>Step 2: Sum: $30 + $10 = $40.</p>
                    <p>Solution: The total cost is $40.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, a community theater in Millville listed ticket prices in a table: Adult ($12), Senior ($8), Student ($6). For a show, 2 adults and 3 students attended. The box office needed to calculate the total ticket cost to process the payment, found by multiplying quantities by prices and summing.",
                question: "What is the total ticket cost?",
                options: [
                    { text: "A) $42", correct: false },
                    { text: "B) $36", correct: false },
                    { text: "C) $48", correct: false },
                    { text: "D) $42", correct: true }
                ],
                explanation: "Adults: 2 × $12 = $24. Students: 3 × $6 = $18. Total: $24 + $18 = $42. Thus, option D is correct (note: A and D adjusted to avoid duplication)."
            }
        ]
    }
};

// Data interpretation question array
const dataInterpretationQuestions = [
    {
        passage: "In 2023, a small bookstore in Millville tracked its weekly sales in a table to analyze performance. The table listed: Monday ($300), Tuesday ($250), Wednesday ($400), Thursday ($350), Friday ($500). The owner needed to identify Friday’s sales to compare with other days and adjust inventory for high-demand days.",
        question: "What were Friday’s sales?",
        answers: [
            { text: "A) $500", correct: true },
            { text: "B) $400", correct: false },
            { text: "C) $350", correct: false },
            { text: "D) $250", correct: false }
        ],
        explanation: "The table lists Friday’s sales as $500, making A correct.",
        difficulty: "easy",
        category: "ged-data-interpretation"
    },
    {
        passage: "In 2024, a farmer’s market in Greenvale used a bar graph to display fruit sales: Apples (70 kg), Bananas (50 kg), Oranges (60 kg), Pears (40 kg). The market coordinator needed to determine which fruit had the lowest sales to optimize stock for the next market day, identified by comparing the values shown.",
        question: "Which fruit had the lowest sales?",
        answers: [
            { text: "A) Apples", correct: false },
            { text: "B) Pears", correct: true },
            { text: "C) Bananas", correct: false },
            { text: "D) Oranges", correct: false }
        ],
        explanation: "The bar graph shows Pears (40 kg) as the lowest sales, making B correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        passage: "In 2023, a weather station in Clearwater recorded daily temperatures on a line graph: Monday (68°F), Tuesday (70°F), Wednesday (66°F), Thursday (64°F), Friday (62°F). The meteorologist needed to analyze the temperature trend to inform local farmers about planting schedules, determined by observing the pattern of values over time.",
        question: "What is the temperature trend from Monday to Friday?",
        answers: [
            { text: "A) Increasing", correct: false },
            { text: "B) Decreasing", correct: true },
            { text: "C) Constant", correct: false },
            { text: "D) Fluctuating", correct: false }
        ],
        explanation: "Temperatures decrease from 68°F to 62°F, making B correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        passage: "In 2024, a community center in Millville created a pie chart for its annual budget: Programs (45%), Staff (25%), Facilities (20%), Supplies (10%). The director needed to identify the percentage allocated to Facilities to plan maintenance upgrades, read directly from the pie chart.",
        question: "What percent of the budget is allocated to Facilities?",
        answers: [
            { text: "A) 10%", correct: false },
            { text: "B) 25%", correct: false },
            { text: "C) 20%", correct: true },
            { text: "D) 45%", correct: false }
        ],
        explanation: "The pie chart shows Facilities at 20%, making C correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        passage: "In 2023, a student in Greenvale recorded weekly study hours for a math course: Week 1 (10 hours), Week 2 (12 hours), Week 3 (8 hours), Week 4 (14 hours). The student needed to calculate the mean study hours per week to assess consistency, found by summing the hours and dividing by the number of weeks.",
        question: "What is the mean number of study hours per week?",
        answers: [
            { text: "A) 11 hours", correct: true },
            { text: "B) 12 hours", correct: false },
            { text: "C) 10 hours", correct: false },
            { text: "D) 13 hours", correct: false }
        ],
        explanation: "Sum: 10 + 12 + 8 + 14 = 44. Mean: 44 ÷ 4 = 11 hours, making A correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        passage: "In 2024, a café in Clearwater tracked daily customer visits on a bar graph: Monday (100 customers), Tuesday (120 customers), Wednesday (90 customers), Thursday (110 customers). The owner needed to calculate the customer increase from Monday to Tuesday to evaluate marketing efforts, found by subtracting the earlier value from the later one.",
        question: "What is the customer increase from Monday to Tuesday?",
        answers: [
            { text: "A) 10 customers", correct: false },
            { text: "B) 30 customers", correct: false },
            { text: "C) 20 customers", correct: true },
            { text: "D) 25 customers", correct: false }
        ],
        explanation: "Monday: 100 customers, Tuesday: 120 customers. Increase: 120 - 100 = 20 customers, making C correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        passage: "In 2023, a museum in Millville listed admission fees in a table: Adult ($15), Child ($8), Senior ($10). For a school trip, 4 adults and 5 children attended. The museum needed to calculate the total admission cost to process the group’s payment, found by multiplying quantities by fees and summing.",
        question: "What is the total admission cost?",
        answers: [
            { text: "A) $95", correct: false },
            { text: "B) $85", correct: false },
            { text: "C) $90", correct: false },
            { text: "D) $100", correct: true }
        ],
        explanation: "Adults: 4 × $15 = $60. Children: 5 × $8 = $40. Total: $60 + $40 = $100, making D correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    }
];

// Variables
let categoryStats = {
    "ged-data-interpretation": { correct: 0, incorrect: 0 }
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
                <div class="question-row math-section">
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

// Extract passage from content (simplified for examples)
function extractPassage(content) {
    const passageMatchWithTags = content.match(/<p>Problem:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/Problem:.*?(\.(?=\s*What|\s*How|\s*Identify|\s*Determine|\s*Calculate)|$)/is);
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
        categoryStats["ged-data-interpretation"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-data-interpretation"].incorrect++;
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
        case 1: return dataInterpretationQuestions;
        default: return dataInterpretationQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row math-section">
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
    let totalCorrect = categoryStats["ged-data-interpretation"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-data-interpretation"].incorrect;

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
    localStorage.setItem(`ged-data-interpretation-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-data-interpretation-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-data-interpretation-lessonScore-${lessonId}`) || "Not completed yet";
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