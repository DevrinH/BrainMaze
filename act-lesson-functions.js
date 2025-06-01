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
    const lessonId = urlParams.get('lesson') || 21;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    21: {
        title: "Functions",
        content: [
            {
                type: "example",
                title: "Example 1: Evaluating Functions",
                passage: "Given the function f(x) = 3x + 2, find f(5).",
                content: `
                    <h2>Example 1: Evaluating Functions</h2>
                    <p>Question: What is the value of f(5)?</p>
                    <p>Step 1: Substitute x = 5 into the function: f(5) = 3(5) + 2.</p>
                    <p>Step 2: Simplify: 3(5) = 15, 15 + 2 = 17.</p>
                    <p>Solution: The value of f(5) is 17.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Given the function g(x) = 2x - 4, find g(3).",
                question: "What is the value of g(3)?",
                options: [
                    { text: "A) 2", correct: true },
                    { text: "B) 4", correct: false },
                    { text: "C) 6", correct: false },
                    { text: "D) 8", correct: false }
                ],
                explanation: "Substitute x = 3: g(3) = 2(3) - 4 = 6 - 4 = 2. So, A is correct."
            },
            {
                type: "example",
                title: "Example 2: Function Notation",
                passage: "The function h(x) = x^2 + 1 represents the height of a ball x seconds after being thrown. Find h(2).",
                content: `
                    <h2>Example 2: Function Notation</h2>
                    <p>Question: What is the height of the ball after 2 seconds?</p>
                    <p>Step 1: Substitute x = 2 into h(x) = x^2 + 1: h(2) = 2^2 + 1.</p>
                    <p>Step 2: Simplify: 2^2 = 4, 4 + 1 = 5.</p>
                    <p>Solution: The height after 2 seconds is 5 units.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "The function f(x) = x^2 - 3 models a particle’s position x seconds after starting. Find f(4).",
                question: "What is the position after 4 seconds?",
                options: [
                    { text: "A) 13", correct: true },
                    { text: "B) 15", correct: false },
                    { text: "C) 16", correct: false },
                    { text: "D) 19", correct: false }
                ],
                explanation: "Substitute x = 4: f(4) = 4^2 - 3 = 16 - 3 = 13. So, A is correct."
            },
            {
                type: "example",
                title: "Example 3: Finding Domain",
                passage: "Determine the domain of the function f(x) = 1 / (x - 2).",
                content: `
                    <h2>Example 3: Finding Domain</h2>
                    <p>Question: What is the domain of f(x)?</p>
                    <p>Step 1: Identify restrictions: The denominator x - 2 cannot be zero, so x ≠ 2.</p>
                    <p>Step 2: Apply rule: The domain includes all real numbers except where the function is undefined.</p>
                    <p>Solution: The domain is all real numbers except x = 2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Determine the domain of the function g(x) = 1 / (x + 3).",
                question: "What is the domain of g(x)?",
                options: [
                    { text: "A) All real numbers except x = -3", correct: true },
                    { text: "B) All real numbers except x = 3", correct: false },
                    { text: "C) All real numbers", correct: false },
                    { text: "D) Only positive real numbers", correct: false }
                ],
                explanation: "The denominator x + 3 ≠ 0, so x ≠ -3. The domain is all real numbers except x = -3, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Analyzing Graphs",
                passage: "The graph of f(x) = 2x + 1 is a line. Find the y-intercept.",
                content: `
                    <h2>Example 4: Analyzing Graphs</h2>
                    <p>Question: What is the y-intercept of f(x)?</p>
                    <p>Step 1: The y-intercept occurs when x = 0. Substitute x = 0: f(0) = 2(0) + 1.</p>
                    <p>Step 2: Simplify: f(0) = 1.</p>
                    <p>Solution: The y-intercept is 1.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "The graph of h(x) = -3x + 4 is a line. Find the y-intercept.",
                question: "What is the y-intercept of h(x)?",
                options: [
                    { text: "A) 4", correct: true },
                    { text: "B) -3", correct: false },
                    { text: "C) 3", correct: false },
                    { text: "D) -4", correct: false }
                ],
                explanation: "Set x = 0: h(0) = -3(0) + 4 = 4. The y-intercept is 4, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Function Composition",
                passage: "Given f(x) = x + 3 and g(x) = 2x, find (f o g)(2).",
                content: `
                    <h2>Example 5: Function Composition</h2>
                    <p>Question: What is the value of (f o g)(2)?</p>
                    <p>Step 1: Compute g(2): g(2) = 2(2) = 4.</p>
                    <p>Step 2: Substitute into f: (f o g)(2) = f(g(2)) = f(4) = 4 + 3 = 7.</p>
                    <p>Solution: The value of (f o g)(2) is 7.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Given f(x) = x - 1 and g(x) = x^2, find (f o g)(3).",
                question: "What is the value of (f o g)(3)?",
                options: [
                    { text: "A) 8", correct: true },
                    { text: "B) 9", correct: false },
                    { text: "C) 7", correct: false },
                    { text: "D) 10", correct: false }
                ],
                explanation: "Compute g(3): g(3) = 3^2 = 9. Then f(9) = 9 - 1 = 8. So, A is correct."
            },
            {
                type: "example",
                title: "Example 6: Finding Zeros",
                passage: "Find the zero of the function f(x) = x - 5.",
                content: `
                    <h2>Example 6: Finding Zeros</h2>
                    <p>Question: What is the zero of f(x)?</p>
                    <p>Step 1: Set f(x) = 0: x - 5 = 0.</p>
                    <p>Step 2: Solve: x = 5.</p>
                    <p>Solution: The zero of f(x) is x = 5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Find the zero of the function g(x) = 2x + 6.",
                question: "What is the zero of g(x)?",
                options: [
                    { text: "A) x = -3", correct: true },
                    { text: "B) x = 3", correct: false },
                    { text: "C) x = -6", correct: false },
                    { text: "D) x = 6", correct: false }
                ],
                explanation: "Set g(x) = 0: 2x + 6 = 0, 2x = -6, x = -3. So, A is correct."
            },
            {
                type: "example",
                title: "Example 7: Function Word Problem",
                passage: "A company’s profit is modeled by P(x) = -x^2 + 100x, where x is units sold. Find P(10).",
                content: `
                    <h2>Example 7: Function Word Problem</h2>
                    <p>Question: What is the profit when 10 units are sold?</p>
                    <p>Step 1: Substitute x = 10: P(10) = -(10)^2 + 100(10).</p>
                    <p>Step 2: Simplify: -(10)^2 = -100, 100(10) = 1000, -100 + 1000 = 900.</p>
                    <p>Solution: The profit is 900 dollars.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "A car’s distance is modeled by d(t) = 60t, where t is hours driven. Find d(2).",
                question: "What is the distance after 2 hours?",
                options: [
                    { text: "A) 120 miles", correct: true },
                    { text: "B) 60 miles", correct: false },
                    { text: "C) 180 miles", correct: false },
                    { text: "D) 240 miles", correct: false }
                ],
                explanation: "Substitute t = 2: d(2) = 60(2) = 120. So, A is correct."
            }
        ]
    }
};

// ACT English question array (adapted for Functions)
const englishQuestions = [
    {
        passage: "Given the function f(x) = 4x + 1, find f(2).",
        question: "What is the value of f(2)?",
        answers: [
            { text: "A) 9", correct: true },
            { text: "B) 7", correct: false },
            { text: "C) 8", correct: false },
            { text: "D) 10", correct: false }
        ],
        explanation: "Substitute x = 2: f(2) = 4(2) + 1 = 8 + 1 = 9. So, A is correct.",
        difficulty: "easy",
        category: "act-functions"
    },
    {
        passage: "The function g(x) = x^2 + 2 models a projectile’s height x seconds after launch. Find g(3).",
        question: "What is the height after 3 seconds?",
        answers: [
            { text: "A) 11", correct: true },
            { text: "B) 9", correct: false },
            { text: "C) 12", correct: false },
            { text: "D) 15", correct: false }
        ],
        explanation: "Substitute x = 3: g(3) = 3^2 + 2 = 9 + 2 = 11. So, A is correct.",
        difficulty: "medium",
        category: "act-functions"
    },
    {
        passage: "Determine the domain of the function h(x) = 1 / (x - 4).",
        question: "What is the domain of h(x)?",
        answers: [
            { text: "A) All real numbers except x = 4", correct: true },
            { text: "B) All real numbers except x = -4", correct: false },
            { text: "C) All real numbers", correct: false },
            { text: "D) Only negative real numbers", correct: false }
        ],
        explanation: "The denominator x - 4 ≠ 0, so x ≠ 4. The domain is all real numbers except x = 4, making A correct.",
        difficulty: "medium",
        category: "act-functions"
    },
    {
        passage: "The graph of f(x) = x - 2 is a line. Find the x-intercept.",
        question: "What is the x-intercept of f(x)?",
        answers: [
            { text: "A) 2", correct: true },
            { text: "B) -2", correct: false },
            { text: "C) 0", correct: false },
            { text: "D) 1", correct: false }
        ],
        explanation: "Set f(x) = 0: x - 2 = 0, x = 2. The x-intercept is 2, making A correct.",
        difficulty: "medium",
        category: "act-functions"
    },
    {
        passage: "Given f(x) = 3x and g(x) = x + 2, find (g o f)(1).",
        question: "What is the value of (g o f)(1)?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 3", correct: false },
            { text: "C) 6", correct: false },
            { text: "D) 9", correct: false }
        ],
        explanation: "Compute f(1): f(1) = 3(1) = 3. Then g(3) = 3 + 2 = 5. So, A is correct.",
        difficulty: "medium",
        category: "act-functions"
    },
    {
        passage: "Find the zero of the function f(x) = x + 7.",
        question: "What is the zero of f(x)?",
        answers: [
            { text: "A) x = -7", correct: true },
            { text: "B) x = 7", correct: false },
            { text: "C) x = 0", correct: false },
            { text: "D) x = -1", correct: false }
        ],
        explanation: "Set f(x) = 0: x + 7 = 0, x = -7. So, A is correct.",
        difficulty: "easy",
        category: "act-functions"
    },
    {
        passage: "A store’s revenue is modeled by R(x) = 50x - x^2, where x is items sold. Find R(5).",
        question: "What is the revenue when 5 items are sold?",
        answers: [
            { text: "A) 225 dollars", correct: true },
            { text: "B) 250 dollars", correct: false },
            { text: "C) 200 dollars", correct: false },
            { text: "D) 275 dollars", correct: false }
        ],
        explanation: "Substitute x = 5: R(5) = 50(5) - 5^2 = 250 - 25 = 225. So, A is correct.",
        difficulty: "medium",
        category: "act-functions"
    }
];

// Variables
let categoryStats = {
    "act-functions": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "21";
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
        categoryStats["act-functions"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-functions"].incorrect++;
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
        case 21: return englishQuestions;
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
        category: "act-functions",
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
    let totalCorrect = categoryStats["act-functions"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-functions"].incorrect;

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
    localStorage.setItem(`act-functions-lessonScore-${lessonId}`, score);
    console.log(`Saved act-functions-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-functions-lessonScore-${lessonId}`) || "Not completed yet";
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