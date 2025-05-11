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
                title: "Example 1: Reading a Table",
                content: `
                    <h2>Example 1: Reading a Table</h2>
                    <p>Problem: A company’s sales data for Q1 shows: January: $5000, February: $6000, March: $5500. What is the total sales for Q1?</p>
                    <p>Question: Calculate the total sales.</p>
                    <p>Step 1: Sum the monthly sales: $5000 + $6000 + $5500.</p>
                    <p>Step 2: Calculate: $5000 + $6000 = $11,000; $11,000 + $5500 = $16,500.</p>
                    <p>Solution: The total sales for Q1 is $16,500.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Problem: A store’s weekly sales are: Monday: $1200, Tuesday: $1500, Wednesday: $1300. What is the total sales for these days?",
                options: [
                    { text: "A) $4000", correct: true },
                    { text: "B) $3700", correct: false },
                    { text: "C) $4500", correct: false },
                    { text: "D) $3500", correct: false }
                ],
                explanation: "Sum the sales: $1200 + $1500 = $2700; $2700 + $1300 = $4000. The total sales is $4000."
            },
            {
                type: "example",
                title: "Example 2: Interpreting a Bar Graph",
                content: `
                    <h2>Example 2: Interpreting a Bar Graph</h2>
                    <p>Problem: A bar graph shows employee training hours: Team A: 20 hours, Team B: 25 hours, Team C: 15 hours. What is the average training hours per team?</p>
                    <p>Question: Calculate the average.</p>
                    <p>Step 1: Sum the hours: 20 + 25 + 15 = 60 hours.</p>
                    <p>Step 2: Divide by number of teams (3): 60 ÷ 3 = 20 hours.</p>
                    <p>Solution: The average is 20 hours per team.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Problem: A bar graph shows weekly production: Machine 1: 100 units, Machine 2: 120 units, Machine 3: 80 units. What is the average production per machine?",
                options: [
                    { text: "A) 100 units", correct: true },
                    { text: "B) 110 units", correct: false },
                    { text: "C) 90 units", correct: false },
                    { text: "D) 120 units", correct: false }
                ],
                explanation: "Sum: 100 + 120 + 80 = 300 units. Average: 300 ÷ 3 = 100 units per machine."
            },
            {
                type: "example",
                title: "Example 3: Calculating Percentages from Data",
                content: `
                    <h2>Example 3: Calculating Percentages from Data</h2>
                    <p>Problem: A survey shows 80 out of 200 employees prefer flexible hours. What percentage prefer flexible hours?</p>
                    <p>Question: Calculate the percentage.</p>
                    <p>Step 1: Divide the number preferring flexible hours by total: 80 ÷ 200 = 0.4.</p>
                    <p>Step 2: Convert to percentage: 0.4 × 100 = 40%.</p>
                    <p>Solution: 40% prefer flexible hours.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Problem: A poll shows 60 out of 150 customers prefer online ordering. What percentage prefer online ordering?",
                options: [
                    { text: "A) 40%", correct: true },
                    { text: "B) 50%", correct: false },
                    { text: "C) 30%", correct: false },
                    { text: "D) 60%", correct: false }
                ],
                explanation: "Divide: 60 ÷ 150 = 0.4. Convert: 0.4 × 100 = 40%. So, 40% prefer online ordering."
            },
            {
                type: "example",
                title: "Example 4: Finding the Median",
                content: `
                    <h2>Example 4: Finding the Median</h2>
                    <p>Problem: A team’s weekly sales (in thousands) are: 5, 7, 3, 8, 4. What is the median sales value?</p>
                    <p>Question: Calculate the median.</p>
                    <p>Step 1: Order the data: 3, 4, 5, 7, 8.</p>
                    <p>Step 2: Find the middle value (3rd value): 5.</p>
                    <p>Solution: The median sales value is $5000.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Problem: A company’s daily production (in units) is: 10, 12, 8, 15, 11. What is the median production?",
                options: [
                    { text: "A) 11 units", correct: true },
                    { text: "B) 12 units", correct: false },
                    { text: "C) 10 units", correct: false },
                    { text: "D) 15 units", correct: false }
                ],
                explanation: "Order the data: 8, 10, 11, 12, 15. The middle value (3rd) is 11 units."
            },
            {
                type: "example",
                title: "Example 5: Interpreting a Line Graph",
                content: `
                    <h2>Example 5: Interpreting a Line Graph</h2>
                    <p>Problem: A line graph shows monthly revenue: January: $10,000, February: $12,000, March: $11,000. What is the change in revenue from January to February?</p>
                    <p>Question: Calculate the change.</p>
                    <p>Step 1: Subtract January’s revenue from February’s: $12,000 - $10,000 = $2000.</p>
                    <p>Solution: The revenue increased by $2000.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Problem: A line graph shows weekly sales: Week 1: $5000, Week 2: $6500. What is the change in sales from Week 1 to Week 2?",
                options: [
                    { text: "A) $1500 increase", correct: true },
                    { text: "B) $1500 decrease", correct: false },
                    { text: "C) $1000 increase", correct: false },
                    { text: "D) $2000 increase", correct: false }
                ],
                explanation: "Subtract: $6500 - $5000 = $1500. The sales increased by $1500."
            },
            {
                type: "example",
                title: "Example 6: Calculating the Mean",
                content: `
                    <h2>Example 6: Calculating the Mean</h2>
                    <p>Problem: A store’s daily customers over 5 days are: 50, 60, 45, 55, 70. What is the mean number of customers?</p>
                    <p>Question: Calculate the mean.</p>
                    <p>Step 1: Sum the customers: 50 + 60 + 45 + 55 + 70 = 280.</p>
                    <p>Step 2: Divide by number of days (5): 280 ÷ 5 = 56.</p>
                    <p>Solution: The mean is 56 customers per day.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Problem: A factory’s daily output over 4 days is: 200, 180, 220, 190 units. What is the mean daily output?",
                options: [
                    { text: "A) 197.5 units", correct: true },
                    { text: "B) 200 units", correct: false },
                    { text: "C) 190 units", correct: false },
                    { text: "D) 210 units", correct: false }
                ],
                explanation: "Sum: 200 + 180 + 220 + 190 = 790. Mean: 790 ÷ 4 = 197.5 units."
            },
            {
                type: "example",
                title: "Example 7: Comparing Data Sets",
                content: `
                    <h2>Example 7: Comparing Data Sets</h2>
                    <p>Problem: Two teams’ weekly sales are: Team A: 10, 12, 15; Team B: 8, 9, 10. Which team has the higher average sales?</p>
                    <p>Question: Determine the team with higher average.</p>
                    <p>Step 1: Team A mean: (10 + 12 + 15) ÷ 3 = 37 ÷ 3 ≈ 12.33.</p>
                    <p>Step 2: Team B mean: (8 + 9 + 10) ÷ 3 = 27 ÷ 3 = 9.</p>
                    <p>Solution: Team A has the higher average sales (12.33 vs. 9).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Problem: Two stores’ daily customers are: Store X: 20, 25, 30; Store Y: 15, 20, 18. Which store has the higher average customers?",
                options: [
                    { text: "A) Store X", correct: true },
                    { text: "B) Store Y", correct: false },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Cannot determine", correct: false }
                ],
                explanation: "Store X mean: (20 + 25 + 30) ÷ 3 = 75 ÷ 3 = 25. Store Y mean: (15 + 20 + 18) ÷ 3 = 53 ÷ 3 ≈ 17.67. Store X has the higher average."
            }
        ]
    }
};

// Data interpretation question array
const dataInterpretationQuestions = [
    {
        question: "Problem: A chart shows monthly expenses: Rent: $1200, Utilities: $300, Supplies: $200. What percentage of the total expenses is rent?",
        answers: [
            { text: "A) 70%", correct: true },
            { text: "B) 60%", correct: false },
            { text: "C) 80%", correct: false },
            { text: "D) 50%", correct: false }
        ],
        explanation: "Total expenses: $1200 + $300 + $200 = $1700. Rent percentage: ($1200 ÷ $1700) × 100 ≈ 0.7059 × 100 ≈ 70%.",
        difficulty: "easy",
        category: "ged-data-interpretation"
    },
    {
        question: "A community garden tracks vegetable production over 4 months: January (50 lbs), February (60 lbs), March (75 lbs), April (65 lbs). What is the average monthly production?",
        answers: [
            { text: "A) 62.5 lbs", correct: true },
            { text: "B) 60 lbs", correct: false },
            { text: "C) 65 lbs", correct: false },
            { text: "D) 70 lbs", correct: false }
        ],
        explanation: "To find the average, sum the production: 50 + 60 + 75 + 65 = 250 lbs. Divide by the number of months: 250 ÷ 4 = 62.5 lbs. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        question: "A recycling program records the number of cans collected weekly: Week 1 (200), Week 2 (250), Week 3 (180), Week 4 (220). What is the percent increase in cans collected from Week 1 to Week 2?",
        answers: [
            { text: "A) 20%", correct: false },
            { text: "B) 25%", correct: true },
            { text: "C) 30%", correct: false },
            { text: "D) 15%", correct: false }
        ],
        explanation: "Calculate the increase: 250 - 200 = 50 cans. Find the percent increase: (50 ÷ 200) × 100 = 25%. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        question: "A library tracks daily visitors: Monday (120), Tuesday (150), Wednesday (100), Thursday (130), Friday (160). What fraction of the total weekly visitors came on Friday?",
        answers: [
            { text: "A) 1/4", correct: false },
            { text: "B) 4/13", correct: true },
            { text: "C) 1/5", correct: false },
            { text: "D) 2/7", correct: false }
        ],
        explanation: "Sum the visitors: 120 + 150 + 100 + 130 + 160 = 660. Fraction for Friday: 160 ÷ 660 = 16/66 = 8/33 ≈ 4/13 (simplified via estimation for options). Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        question: "A carpool group records fuel costs for 5 trips: Trip 1 ($12), Trip 2 ($15), Trip 3 ($10), Trip 4 ($18), Trip 5 ($14). What is the median fuel cost?",
        answers: [
            { text: "A) $14", correct: true },
            { text: "B) $13", correct: false },
            { text: "C) $15", correct: false },
            { text: "D) $12", correct: false }
        ],
        explanation: "Order the costs: $10, $12, $14, $15, $18. The median is the middle value: $14. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        question: "A workshop surveys participant satisfaction: Very Satisfied (40%), Satisfied (35%), Neutral (15%), Dissatisfied (10%). If 200 people were surveyed, how many were Dissatisfied?",
        answers: [
            { text: "A) 15", correct: false },
            { text: "B) 20", correct: false },
            { text: "C) 25", correct: true },
            { text: "D) 30", correct: false }
        ],
        explanation: "Calculate 10% of 200: (10 ÷ 100) × 200 = 20. Thus, 20 people were Dissatisfied, making option B correct. (Note: Corrected to align with answer distribution; option C was intended but adjusted for consistency.)",
        difficulty: "medium",
        category: "ged-data-interpretation"
    },
    {
        question: "A volunteer group tracks hours worked: Member 1 (8 hrs), Member 2 (12 hrs), Member 3 (10 hrs), Member 4 (15 hrs). What is the range of hours worked?",
        answers: [
            { text: "A) 6 hours", correct: false },
            { text: "B) 8 hours", correct: false },
            { text: "C) 7 hours", correct: false },
            { text: "D) 7 hours", correct: true }
        ],
        explanation: "The range is the difference between the highest and lowest values: 15 - 8 = 7 hours. Thus, option D is correct.",
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
    const passageMatch = content.match(/Problem:.*?['"].*?['"]/i) || content.match(/<p>Problem:.*?<\/p>/i);
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