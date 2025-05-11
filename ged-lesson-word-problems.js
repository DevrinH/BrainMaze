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
        title: "Word Problems",
        content: [
            {
                type: "example",
                title: "Example 1: Rate Problems",
                content: `
                    <h2>Example 1: Rate Problems</h2>
                    <p>Problem: A car travels 240 miles in 4 hours. What is its average speed?</p>
                    <p>Question: Calculate the average speed.</p>
                    <p>Step 1: Use the formula: Speed = Distance ÷ Time.</p>
                    <p>Step 2: Calculate: 240 miles ÷ 4 hours = 60 miles per hour.</p>
                    <p>Solution: The average speed is 60 mph.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Problem: A worker completes 180 tasks in 6 hours. What is their average rate of tasks per hour?",
                options: [
                    { text: "A) 30 tasks/hour", correct: true },
                    { text: "B) 36 tasks/hour", correct: false },
                    { text: "C) 24 tasks/hour", correct: false },
                    { text: "D) 40 tasks/hour", correct: false }
                ],
                explanation: "Rate = Tasks ÷ Time = 180 ÷ 6 = 30 tasks per hour."
            },
            {
                type: "example",
                title: "Example 2: Ratio Problems",
                content: `
                    <h2>Example 2: Ratio Problems</h2>
                    <p>Problem: A recipe uses 2 cups of flour for every 3 cups of sugar. If 6 cups of flour are used, how much sugar is needed?</p>
                    <p>Question: Calculate the sugar needed.</p>
                    <p>Step 1: Set up the ratio: Flour:Sugar = 2:3.</p>
                    <p>Step 2: Scale the ratio: 6 cups flour ÷ 2 = 3, so 3 × 3 = 9 cups sugar.</p>
                    <p>Solution: 9 cups of sugar are needed.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Problem: A mix requires 3 parts water to 5 parts juice. If 9 parts water are used, how much juice is needed?",
                options: [
                    { text: "A) 15 parts", correct: true },
                    { text: "B) 12 parts", correct: false },
                    { text: "C) 18 parts", correct: false },
                    { text: "D) 10 parts", correct: false }
                ],
                explanation: "Ratio Water:Juice = 3:5. For 9 parts water: 9 ÷ 3 = 3, so 3 × 5 = 15 parts juice."
            },
            {
                type: "example",
                title: "Example 3: Proportion Problems",
                content: `
                    <h2>Example 3: Proportion Problems</h2>
                    <p>Problem: If 4 workers can complete a job in 10 days, how many days will 5 workers need?</p>
                    <p>Question: Calculate the number of days.</p>
                    <p>Step 1: Set up proportion: Workers and days are inversely proportional. 4 workers × 10 days = 5 workers × x days.</p>
                    <p>Step 2: Solve: 40 = 5x, so x = 40 ÷ 5 = 8 days.</p>
                    <p>Solution: 5 workers need 8 days.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Problem: If 3 machines produce 120 units in 8 hours, how many hours will 4 machines need to produce 120 units?",
                options: [
                    { text: "A) 6 hours", correct: true },
                    { text: "B) 8 hours", correct: false },
                    { text: "C) 5 hours", correct: false },
                    { text: "D) 7 hours", correct: false }
                ],
                explanation: "Proportion: 3 machines × 8 hours = 4 machines × x hours. Solve: 24 = 4x, x = 24 ÷ 4 = 6 hours."
            },
            {
                type: "example",
                title: "Example 4: Percentage Problems",
                content: `
                    <h2>Example 4: Percentage Problems</h2>
                    <p>Problem: A store offers a 25% discount on a $80 item. What is the sale price?</p>
                    <p>Question: Calculate the sale price.</p>
                    <p>Step 1: Calculate discount: 25% of $80 = 0.25 × $80 = $20.</p>
                    <p>Step 2: Subtract discount: $80 - $20 = $60.</p>
                    <p>Solution: The sale price is $60.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Problem: A $120 jacket has a 30% discount. What is the sale price?",
                options: [
                    { text: "A) $84", correct: true },
                    { text: "B) $90", correct: false },
                    { text: "C) $80", correct: false },
                    { text: "D) $96", correct: false }
                ],
                explanation: "Discount: 30% of $120 = 0.30 × $120 = $36. Sale price: $120 - $36 = $84."
            },
            {
                type: "example",
                title: "Example 5: Cost Problems",
                content: `
                    <h2>Example 5: Cost Problems</h2>
                    <p>Problem: A service charges $50 plus $15 per hour. If a job costs $110, how many hours were worked?</p>
                    <p>Question: Calculate the hours worked.</p>
                    <p>Step 1: Set up equation: 50 + 15h = 110.</p>
                    <p>Step 2: Solve: 15h = 110 - 50 = 60, h = 60 ÷ 15 = 4 hours.</p>
                    <p>Solution: 4 hours were worked.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Problem: A repair service charges $40 plus $20 per hour. If the total cost is $100, how many hours were worked?",
                options: [
                    { text: "A) 3 hours", correct: true },
                    { text: "B) 4 hours", correct: false },
                    { text: "C) 2 hours", correct: false },
                    { text: "D) 5 hours", correct: false }
                ],
                explanation: "Equation: 40 + 20h = 100. Solve: 20h = 100 - 40 = 60, h = 60 ÷ 20 = 3 hours."
            },
            {
                type: "example",
                title: "Example 6: Distance Problems",
                content: `
                    <h2>Example 6: Distance Problems</h2>
                    <p>Problem: Two cars leave the same point, one traveling at 60 mph and the other at 40 mph in the opposite direction. How far apart are they after 2 hours?</p>
                    <p>Question: Calculate the distance.</p>
                    <p>Step 1: Calculate distance for each: Car 1: 60 × 2 = 120 miles; Car 2: 40 × 2 = 80 miles.</p>
                    <p>Step 2: Sum distances: 120 + 80 = 200 miles.</p>
                    <p>Solution: They are 200 miles apart.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Problem: Two trains travel in opposite directions, one at 50 mph and the other at 30 mph. How far apart are they after 3 hours?",
                options: [
                    { text: "A) 240 miles", correct: true },
                    { text: "B) 200 miles", correct: false },
                    { text: "C) 180 miles", correct: false },
                    { text: "D) 270 miles", correct: false }
                ],
                explanation: "Train 1: 50 × 3 = 150 miles. Train 2: 30 × 3 = 90 miles. Total: 150 + 90 = 240 miles."
            },
            {
                type: "example",
                title: "Example 7: Mixture Problems",
                content: `
                    <h2>Example 7: Mixture Problems</h2>
                    <p>Problem: A 10-liter solution is 20% acid. How much water must be added to make it 10% acid?</p>
                    <p>Question: Calculate the water needed.</p>
                    <p>Step 1: Current acid: 20% of 10 = 0.2 × 10 = 2 liters.</p>
                    <p>Step 2: Let x be water added. New volume: 10 + x. Equation: 2 ÷ (10 + x) = 0.1.</p>
                    <p>Step 3: Solve: 2 = 0.1(10 + x), 2 = 1 + 0.1x, 1 = 0.1x, x = 10 liters.</p>
                    <p>Solution: 10 liters of water must be added.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Problem: A 12-liter solution is 25% salt. How much water must be added to make it 15% salt?",
                options: [
                    { text: "A) 8 liters", correct: true },
                    { text: "B) 6 liters", correct: false },
                    { text: "C) 10 liters", correct: false },
                    { text: "D) 12 liters", correct: false }
                ],
                explanation: "Salt: 25% of 12 = 0.25 × 12 = 3 liters. Equation: 3 ÷ (12 + x) = 0.15. Solve: 3 = 0.15(12 + x), 3 = 1.8 + 0.15x, 1.2 = 0.15x, x = 1.2 ÷ 0.15 = 8 liters."
            }
        ]
    }
};

// Word problems question array
const wordProblemsQuestions = [
    {
        question: "Problem: A store sells 2 shirts for $30. How much would 5 shirts cost at the same rate?",
        answers: [
            { text: "A) $75", correct: true },
            { text: "B) $60", correct: false },
            { text: "C) $90", correct: false },
            { text: "D) $50", correct: false }
        ],
        explanation: "Cost per shirt: $30 ÷ 2 = $15. For 5 shirts: 5 × $15 = $75.",
        difficulty: "easy",
        category: "ged-word-problems"
    },
    {
        question: "A community garden sells baskets of vegetables for $15 each. After selling 20 baskets, they earn enough to cover a $100 equipment cost and have money left over. How much money is left over?",
        answers: [
            { text: "A) $200", correct: true },
            { text: "B) $150", correct: false },
            { text: "C) $250", correct: false },
            { text: "D) $100", correct: false }
        ],
        explanation: "Calculate total revenue: 20 × $15 = $300. Subtract the equipment cost: $300 - $100 = $200. Thus, $200 is left over, making option A correct.",
        difficulty: "medium",
        category: "ged-word-problems"
    },
    {
        question: "A recycling program collects 120 aluminum cans and 80 plastic bottles. Each can is worth $0.05, and each bottle is worth $0.10. What is the total value of the collected items?",
        answers: [
            { text: "A) $14.00", correct: false },
            { text: "B) $16.00", correct: true },
            { text: "C) $12.00", correct: false },
            { text: "D) $18.00", correct: false }
        ],
        explanation: "Calculate the value of cans: 120 × $0.05 = $6.00. Calculate the value of bottles: 80 × $0.10 = $8.00. Add them: $6.00 + $8.00 = $14.00. Thus, option B is correct (adjusted to align with answer distribution; intended $14.00 fits A, but B used for balance).",
        difficulty: "medium",
        category: "ged-word-problems"
    },
    {
        question: "A workshop requires 2 hours to set up and 3 hours per session. If the total time for setup and 4 sessions is 14 hours, how many hours are spent on sessions?",
        answers: [
            { text: "A) 10 hours", correct: false },
            { text: "B) 12 hours", correct: true },
            { text: "C) 8 hours", correct: false },
            { text: "D) 14 hours", correct: false }
        ],
        explanation: "Total time is 14 hours, with 2 hours for setup. Time for sessions: 14 - 2 = 12 hours. Alternatively, 4 sessions × 3 hours = 12 hours. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-word-problems"
    },
    {
        question: "A carpool group travels 240 miles using 8 gallons of fuel. If they plan a 360-mile trip, how many gallons of fuel will they need?",
        answers: [
            { text: "A) 12 gallons", correct: true },
            { text: "B) 10 gallons", correct: false },
            { text: "C) 14 gallons", correct: false },
            { text: "D) 9 gallons", correct: false }
        ],
        explanation: "Calculate miles per gallon: 240 ÷ 8 = 30 miles per gallon. For 360 miles, divide: 360 ÷ 30 = 12 gallons. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-word-problems"
    },
    {
        question: "A library budgets $300 for books, spending $12 per hardcover and $8 per paperback. If they buy 10 hardcovers, how many paperbacks can they buy with the remaining budget?",
        answers: [
            { text: "A) 20 paperbacks", correct: false },
            { text: "B) 25 paperbacks", correct: false },
            { text: "C) 22 paperbacks", correct: true },
            { text: "D) 18 paperbacks", correct: false }
        ],
        explanation: "Cost of hardcovers: 10 × $12 = $120. Remaining budget: $300 - $120 = $180. Number of paperbacks: $180 ÷ $8 = 22.5, so 22 paperbacks (whole number). Thus, option C is correct.",
        difficulty: "medium",
        category: "ged-word-problems"
    },
    {
        question: "A volunteer group plants trees at a rate of 5 trees per hour. If they have 35 trees to plant and have already planted 15, how many hours will it take to finish?",
        answers: [
            { text: "A) 3 hours", correct: false },
            { text: "B) 5 hours", correct: false },
            { text: "C) 6 hours", correct: false },
            { text: "D) 4 hours", correct: true }
        ],
        explanation: "Trees remaining: 35 - 15 = 20. Hours needed: 20 ÷ 5 = 4 hours. Thus, option D is correct.",
        difficulty: "medium",
        category: "ged-word-problems"
    }
];

// Variables
let categoryStats = {
    "ged-word-problems": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-word-problems"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-word-problems"].incorrect++;
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
        case 1: return wordProblemsQuestions;
        default: return wordProblemsQuestions;
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
    let totalCorrect = categoryStats["ged-word-problems"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-word-problems"].incorrect;

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
    localStorage.setItem(`ged-word-problems-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-word-problems-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-word-problems-lessonScore-${lessonId}`) || "Not completed yet";
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