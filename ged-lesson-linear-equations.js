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
        title: "Linear Equations",
        content: [
            {
                type: "example",
                title: "Example 1: Solving a Linear Equation",
                content: `
                    <h2>Example 1: Solving a Linear Equation</h2>
                    <p>Problem: Solve for x in the equation 2x + 5 = 11.</p>
                    <p>Question: What is the value of x?</p>
                    <p>Step 1: Isolate the term with x: Subtract 5 from both sides: 2x + 5 - 5 = 11 - 5, so 2x = 6.</p>
                    <p>Step 2: Solve for x: Divide both sides by 2: 2x ÷ 2 = 6 ÷ 2, so x = 3.</p>
                    <p>Solution: x = 3.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Problem: Solve for y in the equation 3y - 7 = 8.",
                options: [
                    { text: "A) y = 5", correct: true },
                    { text: "B) y = 3", correct: false },
                    { text: "C) y = 7", correct: false },
                    { text: "D) y = 1", correct: false }
                ],
                explanation: "Add 7 to both sides: 3y - 7 + 7 = 8 + 7, so 3y = 15. Divide by 3: 3y ÷ 3 = 15 ÷ 3, so y = 5."
            },
            {
                type: "example",
                title: "Example 2: Slope-Intercept Form",
                content: `
                    <h2>Example 2: Slope-Intercept Form</h2>
                    <p>Problem: Convert the equation 2x + y = 4 to slope-intercept form (y = mx + b).</p>
                    <p>Question: What is the slope-intercept form?</p>
                    <p>Step 1: Isolate y: Subtract 2x from both sides: y = -2x + 4.</p>
                    <p>Step 2: Identify slope (m) and y-intercept (b): m = -2, b = 4.</p>
                    <p>Solution: The slope-intercept form is y = -2x + 4.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Problem: Convert the equation 3x - y = 6 to slope-intercept form.",
                options: [
                    { text: "A) y = 3x - 6", correct: true },
                    { text: "B) y = -3x + 6", correct: false },
                    { text: "C) y = 3x + 6", correct: false },
                    { text: "D) y = -3x - 6", correct: false }
                ],
                explanation: "Isolate y: Subtract 3x from both sides: -y = -3x + 6. Multiply by -1: y = 3x - 6."
            },
            {
                type: "example",
                title: "Example 3: Finding the Slope",
                content: `
                    <h2>Example 3: Finding the Slope</h2>
                    <p>Problem: Find the slope of the line passing through points (1, 2) and (3, 6).</p>
                    <p>Question: What is the slope?</p>
                    <p>Step 1: Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁).</p>
                    <p>Step 2: Substitute: m = (6 - 2) / (3 - 1) = 4 / 2 = 2.</p>
                    <p>Solution: The slope is 2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Problem: Find the slope of the line passing through points (2, 3) and (4, 7).",
                options: [
                    { text: "A) 2", correct: true },
                    { text: "B) 1", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) 0.5", correct: false }
                ],
                explanation: "Slope formula: m = (7 - 3) / (4 - 2) = 4 / 2 = 2."
            },
            {
                type: "example",
                title: "Example 4: Graphing a Linear Equation",
                content: `
                    <h2>Example 4: Graphing a Linear Equation</h2>
                    <p>Problem: Graph the equation y = 2x + 1 by finding two points.</p>
                    <p>Question: What are two points on the line?</p>
                    <p>Step 1: Choose x-values, e.g., x = 0: y = 2(0) + 1 = 1. Point: (0, 1).</p>
                    <p>Step 2: Choose x = 1: y = 2(1) + 1 = 3. Point: (1, 3).</p>
                    <p>Solution: Two points are (0, 1) and (1, 3).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Problem: Find two points on the line y = -x + 4.",
                options: [
                    { text: "A) (0, 4) and (1, 3)", correct: true },
                    { text: "B) (0, 4) and (1, 5)", correct: false },
                    { text: "C) (0, 3) and (1, 4)", correct: false },
                    { text: "D) (0, 4) and (1, 4)", correct: false }
                ],
                explanation: "For x = 0: y = -0 + 4 = 4, so (0, 4). For x = 1: y = -1 + 4 = 3, so (1, 3)."
            },
            {
                type: "example",
                title: "Example 5: Solving Systems of Equations (Substitution)",
                content: `
                    <h2>Example 5: Solving Systems of Equations (Substitution)</h2>
                    <p>Problem: Solve the system: y = x + 2 and 2x + y = 8.</p>
                    <p>Question: What is the solution (x, y)?</p>
                    <p>Step 1: Substitute y = x + 2 into 2x + y = 8: 2x + (x + 2) = 8.</p>
                    <p>Step 2: Simplify: 3x + 2 = 8, so 3x = 6, x = 2.</p>
                    <p>Step 3: Find y: y = 2 + 2 = 4.</p>
                    <p>Solution: (x, y) = (2, 4).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Problem: Solve the system: y = 2x - 1 and x + y = 5.",
                options: [
                    { text: "A) (2, 3)", correct: true },
                    { text: "B) (1, 4)", correct: false },
                    { text: "C) (3, 2)", correct: false },
                    { text: "D) (4, 1)", correct: false }
                ],
                explanation: "Substitute y = 2x - 1 into x + y = 5: x + (2x - 1) = 5, so 3x - 1 = 5, 3x = 6, x = 2. Then y = 2(2) - 1 = 3. Solution: (2, 3)."
            },
            {
                type: "example",
                title: "Example 6: Word Problems with Linear Equations",
                content: `
                    <h2>Example 6: Word Problems with Linear Equations</h2>
                    <p>Problem: A company charges $50 plus $10 per hour for a service. If the total cost is $90, how many hours were used?</p>
                    <p>Question: Calculate the number of hours.</p>
                    <p>Step 1: Set up equation: 50 + 10h = 90.</p>
                    <p>Step 2: Solve: 10h = 90 - 50 = 40, so h = 40 ÷ 10 = 4.</p>
                    <p>Solution: 4 hours were used.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Problem: A rental company charges $30 plus $5 per hour. If the total cost is $45, how many hours were rented?",
                options: [
                    { text: "A) 3 hours", correct: true },
                    { text: "B) 4 hours", correct: false },
                    { text: "C) 2 hours", correct: false },
                    { text: "D) 5 hours", correct: false }
                ],
                explanation: "Equation: 30 + 5h = 45. Solve: 5h = 45 - 30 = 15, h = 15 ÷ 5 = 3 hours."
            },
            {
                type: "example",
                title: "Example 7: Systems of Equations (Elimination)",
                content: `
                    <h2>Example 7: Systems of Equations (Elimination)</h2>
                    <p>Problem: Solve the system: 2x + y = 7 and x - y = 2.</p>
                    <p>Question: What is the solution (x, y)?</p>
                    <p>Step 1: Add equations to eliminate y: (2x + y) + (x - y) = 7 + 2, so 3x = 9, x = 3.</p>
                    <p>Step 2: Substitute x = 3 into x - y = 2: 3 - y = 2, so y = 1.</p>
                    <p>Solution: (x, y) = (3, 1).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Problem: Solve the system: x + y = 5 and x - y = 1.",
                options: [
                    { text: "A) (3, 2)", correct: true },
                    { text: "B) (2, 3)", correct: false },
                    { text: "C) (4, 1)", correct: false },
                    { text: "D) (1, 4)", correct: false }
                ],
                explanation: "Add equations: (x + y) + (x - y) = 5 + 1, so 2x = 6, x = 3. Substitute into x + y = 5: 3 + y = 5, y = 2. Solution: (3, 2)."
            }
        ]
    }
};

// Linear equations question array
const linearEquationsQuestions = [
    {
        question: "Problem: A worker’s weekly pay is $200 plus $15 per hour. If they earn $305 for the week, how many hours did they work?",
        answers: [
            { text: "A) 7 hours", correct: true },
            { text: "B) 8 hours", correct: false },
            { text: "C) 6 hours", correct: false },
            { text: "D) 9 hours", correct: false }
        ],
        explanation: "Equation: 200 + 15h = 305. Solve: 15h = 305 - 200 = 105, h = 105 ÷ 15 = 7 hours.",
        difficulty: "easy",
        category: "ged-linear-equations"
    }
];

// Variables
let categoryStats = {
    "ged-linear-equations": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-linear-equations"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-linear-equations"].incorrect++;
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
        case 1: return linearEquationsQuestions;
        default: return linearEquationsQuestions;
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
    let totalCorrect = categoryStats["ged-linear-equations"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-linear-equations"].incorrect;

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
    localStorage.setItem(`ged-linear-equations-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-linear-equations-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-linear-equations-lessonScore-${lessonId}`) || "Not completed yet";
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