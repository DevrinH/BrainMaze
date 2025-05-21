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
    const lessonId = urlParams.get('lesson') || 20;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    20: {
        title: "Algebra",
        content: [
            {
                type: "example",
                title: "Example 1: Solving Linear Equations",
                passage: "Solve the equation: 2x + 3 = 11.",
                content: `
                    <h2>Example 1: Solving Linear Equations</h2>
                    <p>Question: What is the value of x?</p>
                    <p>Step 1: Subtract 3 from both sides: 2x + 3 - 3 = 11 - 3, so 2x = 8.</p>
                    <p>Step 2: Divide both sides by 2: 2x / 2 = 8 / 2, so x = 4.</p>
                    <p>Solution: The value of x is 4.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Solve the equation: 3x - 5 = 10.",
                question: "What is the value of x?",
                options: [
                    { text: "A) 5", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) 10", correct: false },
                    { text: "D) 15", correct: false }
                ],
                explanation: "Add 5 to both sides: 3x = 15. Divide by 3: x = 5. So, A is correct."
            },
            {
                type: "example",
                title: "Example 2: Simplifying Expressions",
                passage: "Simplify the expression: 2x + 3x - 5 + 7.",
                content: `
                    <h2>Example 2: Simplifying Expressions</h2>
                    <p>Question: What is the simplified form of the expression?</p>
                    <p>Step 1: Combine like terms for x: 2x + 3x = 5x.</p>
                    <p>Step 2: Combine constants: -5 + 7 = 2.</p>
                    <p>Solution: The simplified expression is 5x + 2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Simplify the expression: 4x - 2x + 6 - 3.",
                question: "What is the simplified form?",
                options: [
                    { text: "A) 2x + 3", correct: true },
                    { text: "B) 2x - 3", correct: false },
                    { text: "C) 6x + 3", correct: false },
                    { text: "D) 4x + 3", correct: false }
                ],
                explanation: "Combine like terms: 4x - 2x = 2x, 6 - 3 = 3. So, 2x + 3, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Solving Systems of Equations",
                passage: "Solve the system: x + y = 5, x - y = 1.",
                content: `
                    <h2>Example 3: Solving Systems of Equations</h2>
                    <p>Question: What are the values of x and y?</p>
                    <p>Step 1: Add the equations: (x + y) + (x - y) = 5 + 1, so 2x = 6, x = 3.</p>
                    <p>Step 2: Substitute x = 3 into x + y = 5: 3 + y = 5, so y = 2.</p>
                    <p>Solution: The values are x = 3, y = 2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Solve the system: 2x + y = 7, x + y = 4.",
                question: "What are the values of x and y?",
                options: [
                    { text: "A) x = 3, y = 1", correct: true },
                    { text: "B) x = 2, y = 2", correct: false },
                    { text: "C) x = 1, y = 3", correct: false },
                    { text: "D) x = 4, y = 0", correct: false }
                ],
                explanation: "Subtract equations: (2x + y) - (x + y) = 7 - 4, so x = 3. Substitute: 3 + y = 4, y = 1. So, A is correct."
            },
            {
                type: "example",
                title: "Example 4: Working with Functions",
                passage: "Given the function f(x) = 2x + 3, find f(4).",
                content: `
                    <h2>Example 4: Working with Functions</h2>
                    <p>Question: What is the value of f(4)?</p>
                    <p>Step 1: Substitute x = 4 into the function: f(4) = 2(4) + 3.</p>
                    <p>Step 2: Simplify: 2(4) = 8, 8 + 3 = 11.</p>
                    <p>Solution: The value of f(4) is 11.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Given the function g(x) = 3x - 2, find g(5).",
                question: "What is the value of g(5)?",
                options: [
                    { text: "A) 13", correct: true },
                    { text: "B) 15", correct: false },
                    { text: "C) 10", correct: false },
                    { text: "D) 17", correct: false }
                ],
                explanation: "Substitute x = 5: g(5) = 3(5) - 2 = 15 - 2 = 13. So, A is correct."
            },
            {
                type: "example",
                title: "Example 5: Solving Inequalities",
                passage: "Solve the inequality: 3x - 6 > 9.",
                content: `
                    <h2>Example 5: Solving Inequalities</h2>
                    <p>Question: What is the solution set for x?</p>
                    <p>Step 1: Add 6 to both sides: 3x - 6 + 6 > 9 + 6, so 3x > 15.</p>
                    <p>Step 2: Divide by 3: x > 5.</p>
                    <p>Solution: The solution set is x > 5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Solve the inequality: 2x + 4 < 12.",
                question: "What is the solution set for x?",
                options: [
                    { text: "A) x < 4", correct: true },
                    { text: "B) x < 6", correct: false },
                    { text: "C) x > 4", correct: false },
                    { text: "D) x > 6", correct: false }
                ],
                explanation: "Subtract 4: 2x < 8. Divide by 2: x < 4. So, A is correct."
            },
            {
                type: "example",
                title: "Example 6: Polynomial Operations",
                passage: "Multiply the polynomials: (x + 2)(x - 3).",
                content: `
                    <h2>Example 6: Polynomial Operations</h2>
                    <p>Question: What is the product?</p>
                    <p>Step 1: Use the FOIL method: First: x * x = x^2; Outer: x * -3 = -3x; Inner: 2 * x = 2x; Last: 2 * -3 = -6.</p>
                    <p>Step 2: Combine like terms: x^2 - 3x + 2x - 6 = x^2 - x - 6.</p>
                    <p>Solution: The product is x^2 - x - 6.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Multiply the polynomials: (x + 1)(x + 4).",
                question: "What is the product?",
                options: [
                    { text: "A) x^2 + 5x + 4", correct: true },
                    { text: "B) x^2 + 4x + 4", correct: false },
                    { text: "C) x^2 + 5x + 5", correct: false },
                    { text: "D) x^2 + 3x + 4", correct: false }
                ],
                explanation: "FOIL: x * x = x^2, x * 4 = 4x, 1 * x = x, 1 * 4 = 4. Combine: x^2 + 4x + x + 4 = x^2 + 5x + 4. So, A is correct."
            },
            {
                type: "example",
                title: "Example 7: Word Problems with Algebra",
                passage: "A car travels 60 miles in x hours. If its speed is 30 miles per hour, find x.",
                content: `
                    <h2>Example 7: Word Problems with Algebra</h2>
                    <p>Question: What is the value of x?</p>
                    <p>Step 1: Use the formula distance = speed * time: 60 = 30 * x.</p>
                    <p>Step 2: Solve for x: x = 60 / 30 = 2.</p>
                    <p>Solution: The value of x is 2 hours.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "A store sells x shirts at $15 each, earning $45. Find x.",
                question: "What is the value of x?",
                options: [
                    { text: "A) 3", correct: true },
                    { text: "B) 4", correct: false },
                    { text: "C) 5", correct: false },
                    { text: "D) 6", correct: false }
                ],
                explanation: "Set up: 15x = 45. Solve: x = 45 / 15 = 3. So, A is correct."
            }
        ]
    }
};

// ACT English question array (adapted for Algebra)
const englishQuestions = [
    {
        passage: "Solve the equation: 4x + 7 = 19.",
        question: "What is the value of x?",
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 5", correct: false },
            { text: "D) 6", correct: false }
        ],
        explanation: "Subtract 7: 4x = 12. Divide by 4: x = 3. So, A is correct.",
        difficulty: "easy",
        category: "act-algebra"
    },
    {
        passage: "Simplify the expression: 5x - 3 + 2x + 8.",
        question: "What is the simplified form?",
        answers: [
            { text: "A) 7x + 5", correct: true },
            { text: "B) 7x - 5", correct: false },
            { text: "C) 10x + 5", correct: false },
            { text: "D) 5x + 5", correct: false }
        ],
        explanation: "Combine like terms: 5x + 2x = 7x, -3 + 8 = 5. So, 7x + 5, making A correct.",
        difficulty: "medium",
        category: "act-algebra"
    },
    {
        passage: "Solve the system: x + 2y = 8, x - y = 2.",
        question: "What are the values of x and y?",
        answers: [
            { text: "A) x = 4, y = 2", correct: true },
            { text: "B) x = 2, y = 3", correct: false },
            { text: "C) x = 3, y = 2", correct: false },
            { text: "D) x = 4, y = 3", correct: false }
        ],
        explanation: "Subtract equations: (x + 2y) - (x - y) = 8 - 2, so 3y = 6, y = 2. Substitute: x - 2 = 2, x = 4. So, A is correct.",
        difficulty: "medium",
        category: "act-algebra"
    },
    {
        passage: "Given the function h(x) = x^2 - 4, find h(3).",
        question: "What is the value of h(3)?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 7", correct: false },
            { text: "C) 9", correct: false },
            { text: "D) 13", correct: false }
        ],
        explanation: "Substitute x = 3: h(3) = 3^2 - 4 = 9 - 4 = 5. So, A is correct.",
        difficulty: "medium",
        category: "act-algebra"
    },
    {
        passage: "Solve the inequality: 5 - 2x < 1.",
        question: "What is the solution set for x?",
        answers: [
            { text: "A) x > 2", correct: true },
            { text: "B) x < 2", correct: false },
            { text: "C) x > -2", correct: false },
            { text: "D) x < -2", correct: false }
        ],
        explanation: "Subtract 5: -2x < -4. Divide by -2 (reverse inequality): x > 2. So, A is correct.",
        difficulty: "medium",
        category: "act-algebra"
    },
    {
        passage: "Multiply the polynomials: (2x - 1)(x + 3).",
        question: "What is the product?",
        answers: [
            { text: "A) 2x^2 + 5x - 3", correct: true },
            { text: "B) 2x^2 + 6x - 3", correct: false },
            { text: "C) 2x^2 + 5x + 3", correct: false },
            { text: "D) 2x^2 - 5x - 3", correct: false }
        ],
        explanation: "FOIL: 2x * x = 2x^2, 2x * 3 = 6x, -1 * x = -x, -1 * 3 = -3. Combine: 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3. So, A is correct.",
        difficulty: "medium",
        category: "act-algebra"
    },
    {
        passage: "A rectangle’s length is 3 more than its width w. If the perimeter is 26, find w.",
        question: "What is the value of w?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 6", correct: false },
            { text: "C) 7", correct: false },
            { text: "D) 8", correct: false }
        ],
        explanation: "Length = w + 3. Perimeter: 2(w + (w + 3)) = 26. Simplify: 2(2w + 3) = 26, 4w + 6 = 26, 4w = 20, w = 5. So, A is correct.",
        difficulty: "medium",
        category: "act-algebra"
    }
];

// Variables
let categoryStats = {
    "act-algebra": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "20";
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
        categoryStats["act-algebra"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-algebra"].incorrect++;
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
        case 20: return englishQuestions;
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
        category: "act-algebra",
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
    let totalCorrect = categoryStats["act-algebra"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-algebra"].incorrect;

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
    localStorage.setItem(`act-algebra-lessonScore-${lessonId}`, score);
    console.log(`Saved act-algebra-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-algebra-lessonScore-${lessonId}`) || "Not completed yet";
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