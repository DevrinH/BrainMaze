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
        title: "Basic Arithmetic",
        content: [
            {
                type: "example",
                title: "Example 1: Addition and Subtraction",
                content: `
                    <h2>Example 1: Addition and Subtraction</h2>
                    <p>Problem: A company spends $450 on supplies and $275 on equipment. Later, they return $125 worth of supplies. What is the net cost?</p>
                    <p>Question: Calculate the net cost.</p>
                    <p>Step 1: Add total expenses: $450 + $275 = $725.</p>
                    <p>Step 2: Subtract the return: $725 - $125 = $600.</p>
                    <p>Solution: The net cost is $600.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Problem: A worker earns $320 in one week and $280 the next. They spend $150 on expenses. What is their net earnings?",
                options: [
                    { text: "A) $450", correct: true },
                    { text: "B) $600", correct: false },
                    { text: "C) $300", correct: false },
                    { text: "D) $750", correct: false }
                ],
                explanation: "Add earnings: $320 + $280 = $600. Subtract expenses: $600 - $150 = $450. The net earnings are $450."
            },
            {
                type: "example",
                title: "Example 2: Multiplication",
                content: `
                    <h2>Example 2: Multiplication</h2>
                    <p>Problem: A store sells 15 boxes of pens daily, with each box containing 12 pens. How many pens are sold in a week (7 days)?</p>
                    <p>Question: Calculate the total pens sold.</p>
                    <p>Step 1: Multiply daily boxes by pens per box: 15 × 12 = 180 pens/day.</p>
                    <p>Step 2: Multiply by days: 180 × 7 = 1260 pens.</p>
                    <p>Solution: 1260 pens are sold in a week.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Problem: A factory produces 25 widgets per hour, with each widget requiring 4 screws. How many screws are needed in 8 hours?",
                options: [
                    { text: "A) 800", correct: true },
                    { text: "B) 200", correct: false },
                    { text: "C) 100", correct: false },
                    { text: "D) 400", correct: false }
                ],
                explanation: "Widgets per hour: 25. Screws per widget: 4. Screws per hour: 25 × 4 = 100. For 8 hours: 100 × 8 = 800 screws."
            },
            {
                type: "example",
                title: "Example 3: Division",
                content: `
                    <h2>Example 3: Division</h2>
                    <p>Problem: A budget of $1200 is divided equally among 5 departments. How much does each department receive?</p>
                    <p>Question: Calculate the amount per department.</p>
                    <p>Step 1: Divide total budget by number of departments: $1200 ÷ 5 = $240.</p>
                    <p>Solution: Each department receives $240.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Problem: A total of $900 is split equally among 6 employees. How much does each employee receive?",
                options: [
                    { text: "A) $150", correct: true },
                    { text: "B) $180", correct: false },
                    { text: "C) $120", correct: false },
                    { text: "D) $200", correct: false }
                ],
                explanation: "Divide total amount by number of employees: $900 ÷ 6 = $150. Each employee receives $150."
            },
            {
                type: "example",
                title: "Example 4: Working with Fractions",
                content: `
                    <h2>Example 4: Working with Fractions</h2>
                    <p>Problem: A project is 2/3 complete after 4 days. How many days are needed to complete the entire project?</p>
                    <p>Question: Calculate the total days required.</p>
                    <p>Step 1: Set up proportion: 2/3 of project takes 4 days, so 1/3 takes 4 ÷ 2 = 2 days.</p>
                    <p>Step 2: Total project (3/3): 2 × 3 = 6 days.</p>
                    <p>Solution: The project takes 6 days to complete.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Problem: A task is 3/4 complete after 9 hours. How many hours are needed to finish the entire task?",
                options: [
                    { text: "A) 12 hours", correct: true },
                    { text: "B) 15 hours", correct: false },
                    { text: "C) 9 hours", correct: false },
                    { text: "D) 18 hours", correct: false }
                ],
                explanation: "3/4 of task takes 9 hours, so 1/4 takes 9 ÷ 3 = 3 hours. Total task (4/4): 3 × 4 = 12 hours."
            },
            {
                type: "example",
                title: "Example 5: Working with Decimals",
                content: `
                    <h2>Example 5: Working with Decimals</h2>
                    <p>Problem: An item costs $12.99, and a 7% sales tax is applied. What is the total cost?</p>
                    <p>Question: Calculate the total cost.</p>
                    <p>Step 1: Calculate tax: $12.99 × 0.07 = $0.9093 ≈ $0.91.</p>
                    <p>Step 2: Add tax to cost: $12.99 + $0.91 = $13.90.</p>
                    <p>Solution: The total cost is $13.90.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Problem: A product costs $24.50, with a 5% sales tax. What is the total cost?",
                options: [
                    { text: "A) $25.73", correct: true },
                    { text: "B) $26.00", correct: false },
                    { text: "C) $25.50", correct: false },
                    { text: "D) $24.95", correct: false }
                ],
                explanation: "Tax: $24.50 × 0.05 = $1.225 ≈ $1.23. Total: $24.50 + $1.23 = $25.73."
            },
            {
                type: "example",
                title: "Example 6: Calculating Percentages",
                content: `
                    <h2>Example 6: Calculating Percentages</h2>
                    <p>Problem: A store offers a 20% discount on a $50 item. What is the sale price?</p>
                    <p>Question: Calculate the sale price.</p>
                    <p>Step 1: Calculate discount: $50 × 0.20 = $10.</p>
                    <p>Step 2: Subtract discount: $50 - $10 = $40.</p>
                    <p>Solution: The sale price is $40.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Problem: A $75 jacket has a 15% discount. What is the sale price?",
                options: [
                    { text: "A) $63.75", correct: true },
                    { text: "B) $60.00", correct: false },
                    { text: "C) $65.50", correct: false },
                    { text: "D) $70.00", correct: false }
                ],
                explanation: "Discount: $75 × 0.15 = $11.25. Sale price: $75 - $11.25 = $63.75."
            },
            {
                type: "example",
                title: "Example 7: Combining Arithmetic Operations",
                content: `
                    <h2>Example 7: Combining Arithmetic Operations</h2>
                    <p>Problem: A worker earns $15 per hour for 20 hours and spends 1/4 of their earnings on supplies. How much money remains?</p>
                    <p>Question: Calculate the remaining amount.</p>
                    <p>Step 1: Calculate earnings: $15 × 20 = $300.</p>
                    <p>Step 2: Calculate spending: $300 × 1/4 = $75.</p>
                    <p>Step 3: Subtract: $300 - $75 = $225.</p>
                    <p>Solution: $225 remains.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Problem: An employee earns $12 per hour for 25 hours and spends 1/5 of their earnings on expenses. How much money remains?",
                options: [
                    { text: "A) $240", correct: true },
                    { text: "B) $250", correct: false },
                    { text: "C) $225", correct: false },
                    { text: "D) $260", correct: false }
                ],
                explanation: "Earnings: $12 × 25 = $300. Expenses: $300 × 1/5 = $60. Remaining: $300 - $60 = $240."
            }
        ]
    }
};

// Basic arithmetic question array
const basicArithmeticQuestions = [
    {
        question: "Problem: A store sells a $120 item with a 10% discount and adds a 6% sales tax on the discounted price. What is the final cost?",
        answers: [
            { text: "A) $114.48", correct: true },
            { text: "B) $120.00", correct: false },
            { text: "C) $108.00", correct: false },
            { text: "D) $127.20", correct: false }
        ],
        explanation: "Discount: $120 × 0.10 = $12. Discounted price: $120 - $12 = $108. Tax: $108 × 0.06 = $6.48. Final cost: $108 + $6.48 = $114.48.",
        difficulty: "easy",
        category: "ged-basic-arithmetic"
    }
];

// Variables
let categoryStats = {
    "ged-basic-arithmetic": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-basic-arithmetic"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-basic-arithmetic"].incorrect++;
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
        case 1: return basicArithmeticQuestions;
        default: return basicArithmeticQuestions;
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
    let totalCorrect = categoryStats["ged-basic-arithmetic"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-basic-arithmetic"].incorrect;

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
    localStorage.setItem(`ged-basic-arithmetic-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-basic-arithmetic-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-basic-arithmetic-lessonScore-${lessonId}`) || "Not completed yet";
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