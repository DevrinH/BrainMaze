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
    const lessonId = urlParams.get('lesson') || 25;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    25: {
        title: "Trigonometry",
        content: [
            {
                type: "example",
                title: "Example 1: Sine Ratio in Right Triangle",
                passage: "In a right triangle, the angle theta is 30 degrees, and the side opposite theta is 5 units. The hypotenuse is 10 units.",
                content: `
                    <h2>Example 1: Sine Ratio in Right Triangle</h2>
                    <p>Question: What is sin(theta)?</p>
                    <p>Step 1: Use the sine ratio: sin(theta) = opposite / hypotenuse.</p>
                    <p>Step 2: Substitute: sin(30) = 5 / 10 = 0.5.</p>
                    <p>Solution: sin(theta) = 0.5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In a right triangle, the angle theta is 45 degrees, and the side opposite theta is 4 units. The hypotenuse is 4 * sqrt(2) units.",
                question: "What is sin(theta)?",
                options: [
                    { text: "A) 1/sqrt(2)", correct: true },
                    { text: "B) sqrt(2)/2", correct: false },
                    { text: "C) 1/2", correct: false },
                    { text: "D) 2/sqrt(2)", correct: false }
                ],
                explanation: "sin(theta) = opposite / hypotenuse = 4 / (4 * sqrt(2)) = 1 / sqrt(2). So, A is correct."
            },
            {
                type: "example",
                title: "Example 2: Cosine Ratio",
                passage: "In a right triangle, the angle theta is 60 degrees, and the side adjacent to theta is 3 units. The hypotenuse is 6 units.",
                content: `
                    <h2>Example 2: Cosine Ratio</h2>
                    <p>Question: What is cos(theta)?</p>
                    <p>Step 1: Use the cosine ratio: cos(theta) = adjacent / hypotenuse.</p>
                    <p>Step 2: Substitute: cos(60) = 3 / 6 = 0.5.</p>
                    <p>Solution: cos(theta) = 0.5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In a right triangle, the angle theta is 30 degrees, and the side adjacent to theta is 5 * sqrt(3) units. The hypotenuse is 10 units.",
                question: "What is cos(theta)?",
                options: [
                    { text: "A) sqrt(3)/2", correct: true },
                    { text: "B) 1/2", correct: false },
                    { text: "C) 1/sqrt(3)", correct: false },
                    { text: "D) 2/sqrt(3)", correct: false }
                ],
                explanation: "cos(theta) = adjacent / hypotenuse = (5 * sqrt(3)) / 10 = sqrt(3) / 2. So, A is correct."
            },
            {
                type: "example",
                title: "Example 3: Tangent Ratio",
                passage: "In a right triangle, the angle theta is 45 degrees, with opposite and adjacent sides both 3 units.",
                content: `
                    <h2>Example 3: Tangent Ratio</h2>
                    <p>Question: What is tan(theta)?</p>
                    <p>Step 1: Use the tangent ratio: tan(theta) = opposite / adjacent.</p>
                    <p>Step 2: Substitute: tan(45) = 3 / 3 = 1.</p>
                    <p>Solution: tan(theta) = 1.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In a right triangle, the angle theta is 30 degrees, with opposite side 4 units and adjacent side 4 * sqrt(3) units.",
                question: "What is tan(theta)?",
                options: [
                    { text: "A) 1/sqrt(3)", correct: true },
                    { text: "B) sqrt(3)/1", correct: false },
                    { text: "C) 1/2", correct: false },
                    { text: "D) 2/sqrt(3)", correct: false }
                ],
                explanation: "tan(theta) = opposite / adjacent = 4 / (4 * sqrt(3)) = 1 / sqrt(3). So, A is correct."
            },
            {
                type: "example",
                title: "Example 4: Solving for a Side",
                passage: "In a right triangle, angle theta is 30 degrees, and the hypotenuse is 12 units.",
                content: `
                    <h2>Example 4: Solving for a Side</h2>
                    <p>Question: What is the length of the side opposite theta?</p>
                    <p>Step 1: Use the sine ratio: sin(30) = opposite / hypotenuse = 0.5.</p>
                    <p>Step 2: Solve: 0.5 = opposite / 12, opposite = 0.5 * 12 = 6.</p>
                    <p>Solution: The opposite side is 6 units.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In a right triangle, angle theta is 45 degrees, and the hypotenuse is 8 units.",
                question: "What is the length of the side opposite theta?",
                options: [
                    { text: "A) 4 * sqrt(2) units", correct: true },
                    { text: "B) 4 units", correct: false },
                    { text: "C) 8 units", correct: false },
                    { text: "D) 2 * sqrt(2) units", correct: false }
                ],
                explanation: "sin(45) = 1/sqrt(2) = opposite / 8. Solve: opposite = (1/sqrt(2)) * 8 = 8/sqrt(2) = 4 * sqrt(2). So, A is correct."
            },
            {
                type: "example",
                title: "Example 5: Pythagorean Identity",
                passage: "If sin(theta) = 3/5 in a right triangle, find cos(theta).",
                content: `
                    <h2>Example 5: Pythagorean Identity</h2>
                    <p>Question: What is cos(theta)?</p>
                    <p>Step 1: Use the identity: sin^2(theta) + cos^2(theta) = 1.</p>
                    <p>Step 2: Substitute: (3/5)^2 + cos^2(theta) = 1, 9/25 + cos^2(theta) = 1, cos^2(theta) = 16/25, cos(theta) = 4/5 (positive in right triangle).</p>
                    <p>Solution: cos(theta) = 4/5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "If cos(theta) = 5/13 in a right triangle, find sin(theta).",
                question: "What is sin(theta)?",
                options: [
                    { text: "A) 12/13", correct: true },
                    { text: "B) 5/12", correct: false },
                    { text: "C) 13/12", correct: false },
                    { text: "D) 12/5", correct: false }
                ],
                explanation: "sin^2(theta) + cos^2(theta) = 1. Substitute: sin^2(theta) + (5/13)^2 = 1, sin^2(theta) + 25/169 = 1, sin^2(theta) = 144/169, sin(theta) = 12/13. So, A is correct."
            },
            {
                type: "example",
                title: "Example 6: Angle of Elevation",
                passage: "A person 100 meters from a tree measures the angle of elevation to the top as 30 degrees.",
                content: `
                    <h2>Example 6: Angle of Elevation</h2>
                    <p>Question: What is the height of the tree? (Use tan(30) ≈ 0.577)</p>
                    <p>Step 1: Use tangent: tan(30) = height / distance.</p>
                    <p>Step 2: Solve: 0.577 = height / 100, height = 0.577 * 100 ≈ 57.7.</p>
                    <p>Solution: The tree is approximately 57.7 meters tall.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "A ladder 10 meters long leans against a wall, making a 60-degree angle with the ground.",
                question: "How high up the wall does the ladder reach? (Use sin(60) ≈ 0.866)",
                options: [
                    { text: "A) 8.66 meters", correct: true },
                    { text: "B) 5 meters", correct: false },
                    { text: "C) 10 meters", correct: false },
                    { text: "D) 7.5 meters", correct: false }
                ],
                explanation: "sin(60) = height / hypotenuse. Solve: 0.866 = height / 10, height = 0.866 * 10 = 8.66. So, A is correct."
            },
            {
                type: "example",
                title: "Example 7: Solving for an Angle",
                passage: "In a right triangle, the opposite side is 6 units, and the adjacent side is 8 units.",
                content: `
                    <h2>Example 7: Solving for an Angle</h2>
                    <p>Question: What is the angle theta? (Use tan^-1(0.75) ≈ 37 degrees)</p>
                    <p>Step 1: Use tangent: tan(theta) = opposite / adjacent = 6 / 8 = 0.75.</p>
                    <p>Step 2: Find the angle: theta = tan^-1(0.75) ≈ 37 degrees.</p>
                    <p>Solution: The angle theta is approximately 37 degrees.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In a right triangle, the opposite side is 5 units, and the hypotenuse is 13 units.",
                question: "What is the angle theta opposite the 5-unit side? (Use sin^-1(5/13) ≈ 23 degrees)",
                options: [
                    { text: "A) 23 degrees", correct: true },
                    { text: "B) 30 degrees", correct: false },
                    { text: "C) 45 degrees", correct: false },
                    { text: "D) 60 degrees", correct: false }
                ],
                explanation: "sin(theta) = opposite / hypotenuse = 5 / 13. Theta = sin^-1(5/13) ≈ 23 degrees. So, A is correct."
            }
        ]
    }
};

// ACT English question array (adapted for Trigonometry)
const englishQuestions = [
    {
        passage: "In a right triangle, the angle theta is 60 degrees, and the side opposite theta is 9 units. The hypotenuse is 6 * sqrt(3) units.",
        question: "What is sin(theta)?",
        answers: [
            { text: "A) sqrt(3)/2", correct: true },
            { text: "B) 1/2", correct: false },
            { text: "C) 2/sqrt(3)", correct: false },
            { text: "D) 1/sqrt(3)", correct: false }
        ],
        explanation: "sin(theta) = opposite / hypotenuse = 9 / (6 * sqrt(3)) = 9 / (6 * sqrt(3)) = 3 / (2 * sqrt(3)) * sqrt(3) / sqrt(3) = sqrt(3) / 2. So, A is correct.",
        difficulty: "easy",
        category: "act-trigonometry"
    },
    {
        passage: "In a right triangle, the angle theta is 45 degrees, and the side adjacent to theta is 7 units. The hypotenuse is 7 * sqrt(2) units.",
        question: "What is cos(theta)?",
        answers: [
            { text: "A) 1/sqrt(2)", correct: true },
            { text: "B) sqrt(2)/2", correct: false },
            { text: "C) 1/2", correct: false },
            { text: "D) 2/sqrt(2)", correct: false }
        ],
        explanation: "cos(theta) = adjacent / hypotenuse = 7 / (7 * sqrt(2)) = 1 / sqrt(2). So, A is correct.",
        difficulty: "medium",
        category: "act-trigonometry"
    },
    {
        passage: "In a right triangle, the angle theta is 60 degrees, with opposite side 6 units and adjacent side 2 * sqrt(3) units.",
        question: "What is tan(theta)?",
        answers: [
            { text: "A) sqrt(3)", correct: true },
            { text: "B) 1/sqrt(3)", correct: false },
            { text: "C) 2/sqrt(3)", correct: false },
            { text: "D) 1/2", correct: false }
        ],
        explanation: "tan(theta) = opposite / adjacent = 6 / (2 * sqrt(3)) = 3 / sqrt(3) = sqrt(3). So, A is correct.",
        difficulty: "medium",
        category: "act-trigonometry"
    },
    {
        passage: "In a right triangle, angle theta is 30 degrees, and the side adjacent to theta is 12 units.",
        question: "What is the length of the hypotenuse? (Use cos(30) ≈ 0.866)",
        answers: [
            { text: "A) 13.86 units", correct: true },
            { text: "B) 12 units", correct: false },
            { text: "C) 14 units", correct: false },
            { text: "D) 10 units", correct: false }
        ],
        explanation: "cos(30) = adjacent / hypotenuse. Solve: 0.866 = 12 / h, h = 12 / 0.866 ≈ 13.86. So, A is correct.",
        difficulty: "medium",
        category: "act-trigonometry"
    },
    {
        passage: "If sin(theta) = 8/17 in a right triangle, find cos(theta).",
        question: "What is cos(theta)?",
        answers: [
            { text: "A) 15/17", correct: true },
            { text: "B) 8/15", correct: false },
            { text: "C) 17/15", correct: false },
            { text: "D) 15/8", correct: false }
        ],
        explanation: "sin^2(theta) + cos^2(theta) = 1. Substitute: (8/17)^2 + cos^2(theta) = 1, 64/289 + cos^2(theta) = 1, cos^2(theta) = 225/289, cos(theta) = 15/17. So, A is correct.",
        difficulty: "medium",
        category: "act-trigonometry"
    },
    {
        passage: "A person 50 meters from a pole measures the angle of elevation to the top as 45 degrees.",
        question: "What is the height of the pole? (Use tan(45) = 1)",
        answers: [
            { text: "A) 50 meters", correct: true },
            { text: "B) 25 meters", correct: false },
            { text: "C) 75 meters", correct: false },
            { text: "D) 100 meters", correct: false }
        ],
        explanation: "tan(45) = height / distance. Solve: 1 = height / 50, height = 50. So, A is correct.",
        difficulty: "medium",
        category: "act-trigonometry"
    },
    {
        passage: "In a right triangle, the opposite side is 7 units, and the adjacent side is 24 units.",
        question: "What is the angle theta? (Use tan^-1(7/24) ≈ 16 degrees)",
        answers: [
            { text: "A) 16 degrees", correct: true },
            { text: "B) 30 degrees", correct: false },
            { text: "C) 45 degrees", correct: false },
            { text: "D) 60 degrees", correct: false }
        ],
        explanation: "tan(theta) = opposite / adjacent = 7 / 24. Theta = tan^-1(7/24) ≈ 16 degrees. So, A is correct.",
        difficulty: "medium",
        category: "act-trigonometry"
    }
];

// Variables
let categoryStats = {
    "act-trigonometry": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "25";
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
        categoryStats["act-trigonometry"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-trigonometry"].incorrect++;
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
        case 25: return englishQuestions;
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
        category: "act-trigonometry",
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
    let totalCorrect = categoryStats["act-trigonometry"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-trigonometry"].incorrect;

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
    localStorage.setItem(`act-trigonometry-lessonScore-${lessonId}`, score);
    console.log(`Saved act-trigonometry-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-trigonometry-lessonScore-${lessonId}`) || "Not completed yet";
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