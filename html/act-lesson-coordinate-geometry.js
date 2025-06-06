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
    const lessonId = urlParams.get('lesson') || 22;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    22: {
        title: "Coordinate Geometry",
        content: [
            {
                type: "example",
                title: "Example 1: Plotting Points",
                passage: "Plot the point A(3, -2) on the coordinate plane.",
                content: `
                    <h2>Example 1: Plotting Points</h2>
                    <p>Question: What are the coordinates of point A?</p>
                    <p>Step 1: Identify the coordinates: x = 3 (horizontal), y = -2 (vertical).</p>
                    <p>Step 2: Apply rule: Move 3 units right and 2 units down from the origin (0,0).</p>
                    <p>Solution: Point A is at (3, -2).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Plot the point B(-4, 5) on the coordinate plane.",
                question: "What are the coordinates of point B?",
                options: [
                    { text: "A) (-4, 5)", correct: true },
                    { text: "B) (4, -5)", correct: false },
                    { text: "C) (-4, -5)", correct: false },
                    { text: "D) (4, 5)", correct: false }
                ],
                explanation: "The coordinates are x = -4 (left 4 units), y = 5 (up 5 units). So, A is correct."
            },
            {
                type: "example",
                title: "Example 2: Calculating Distance",
                passage: "Find the distance between points A(1, 2) and B(4, 6).",
                content: `
                    <h2>Example 2: Calculating Distance</h2>
                    <p>Question: What is the distance between A and B?</p>
                    <p>Step 1: Use the distance formula: d = sqrt((x2 - x1)^2 + (y2 - y1)^2).</p>
                    <p>Step 2: Substitute: x1 = 1, y1 = 2, x2 = 4, y2 = 6. So, d = sqrt((4 - 1)^2 + (6 - 2)^2) = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5.</p>
                    <p>Solution: The distance is 5 units.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Find the distance between points C(0, 1) and D(3, 5).",
                question: "What is the distance between C and D?",
                options: [
                    { text: "A) 5", correct: true },
                    { text: "B) 4", correct: false },
                    { text: "C) 6", correct: false },
                    { text: "D) 7", correct: false }
                ],
                explanation: "Distance formula: d = sqrt((3 - 0)^2 + (5 - 1)^2) = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5. So, A is correct."
            },
            {
                type: "example",
                title: "Example 3: Finding Slope",
                passage: "Find the slope of the line through points A(2, 3) and B(5, 7).",
                content: `
                    <h2>Example 3: Finding Slope</h2>
                    <p>Question: What is the slope of the line?</p>
                    <p>Step 1: Use the slope formula: m = (y2 - y1) / (x2 - x1).</p>
                    <p>Step 2: Substitute: x1 = 2, y1 = 3, x2 = 5, y2 = 7. So, m = (7 - 3) / (5 - 2) = 4 / 3.</p>
                    <p>Solution: The slope is 4/3.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Find the slope of the line through points C(-1, 2) and D(3, 8).",
                question: "What is the slope of the line?",
                options: [
                    { text: "A) 3/2", correct: true },
                    { text: "B) 2/3", correct: false },
                    { text: "C) 1/2", correct: false },
                    { text: "D) 2", correct: false }
                ],
                explanation: "Slope: m = (8 - 2) / (3 - (-1)) = 6 / 4 = 3/2. So, A is correct."
            },
            {
                type: "example",
                title: "Example 4: Equation of a Line",
                passage: "Find the equation of the line through point (2, 1) with slope 3.",
                content: `
                    <h2>Example 4: Equation of a Line</h2>
                    <p>Question: What is the equation in slope-intercept form (y = mx + b)?</p>
                    <p>Step 1: Use point-slope form: y - y1 = m(x - x1). Substitute: y - 1 = 3(x - 2).</p>
                    <p>Step 2: Simplify to slope-intercept: y - 1 = 3x - 6, y = 3x - 6 + 1, y = 3x - 5.</p>
                    <p>Solution: The equation is y = 3x - 5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Find the equation of the line through point (1, 4) with slope -2.",
                question: "What is the equation in slope-intercept form?",
                options: [
                    { text: "A) y = -2x + 6", correct: true },
                    { text: "B) y = -2x + 4", correct: false },
                    { text: "C) y = 2x + 6", correct: false },
                    { text: "D) y = -2x - 6", correct: false }
                ],
                explanation: "Point-slope: y - 4 = -2(x - 1). Simplify: y - 4 = -2x + 2, y = -2x + 6. So, A is correct."
            },
            {
                type: "example",
                title: "Example 5: Midpoint Formula",
                passage: "Find the midpoint of the segment with endpoints A(1, 3) and B(5, 7).",
                content: `
                    <h2>Example 5: Midpoint Formula</h2>
                    <p>Question: What are the coordinates of the midpoint?</p>
                    <p>Step 1: Use the midpoint formula: M = ((x1 + x2)/2, (y1 + y2)/2).</p>
                    <p>Step 2: Substitute: x1 = 1, x2 = 5, y1 = 3, y2 = 7. So, M = ((1 + 5)/2, (3 + 7)/2) = (6/2, 10/2) = (3, 5).</p>
                    <p>Solution: The midpoint is (3, 5).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Find the midpoint of the segment with endpoints C(2, -1) and D(6, 3).",
                question: "What are the coordinates of the midpoint?",
                options: [
                    { text: "A) (4, 1)", correct: true },
                    { text: "B) (4, 2)", correct: false },
                    { text: "C) (3, 1)", correct: false },
                    { text: "D) (5, 1)", correct: false }
                ],
                explanation: "Midpoint: M = ((2 + 6)/2, (-1 + 3)/2) = (8/2, 2/2) = (4, 1). So, A is correct."
            },
            {
                type: "example",
                title: "Example 6: Parallel and Perpendicular Lines",
                passage: "The line y = 2x + 3 is parallel to another line through point (1, 4). Find the equation of the parallel line.",
                content: `
                    <h2>Example 6: Parallel and Perpendicular Lines</h2>
                    <p>Question: What is the equation of the parallel line?</p>
                    <p>Step 1: Parallel lines have the same slope. The slope of y = 2x + 3 is 2.</p>
                    <p>Step 2: Use point-slope form at (1, 4): y - 4 = 2(x - 1). Simplify: y - 4 = 2x - 2, y = 2x + 2.</p>
                    <p>Solution: The equation is y = 2x + 2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The line y = -3x + 1 is perpendicular to another line through point (2, 5). Find the equation of the perpendicular line.",
                question: "What is the equation of the perpendicular line?",
                options: [
                    { text: "A) y = (1/3)x + 13/3", correct: true },
                    { text: "B) y = 3x + 5", correct: false },
                    { text: "C) y = (1/3)x + 5", correct: false },
                    { text: "D) y = -3x + 11", correct: false }
                ],
                explanation: "Perpendicular slope to -3 is 1/3. Point-slope at (2, 5): y - 5 = (1/3)(x - 2). Simplify: y - 5 = (1/3)x - 2/3, y = (1/3)x - 2/3 + 5 = (1/3)x + 13/3. So, A is correct."
            },
            {
                type: "example",
                title: "Example 7: Coordinate Geometry Word Problem",
                passage: "A rectangle has vertices at A(0, 0), B(4, 0), and C(4, 3). Find the coordinates of the fourth vertex D.",
                content: `
                    <h2>Example 7: Coordinate Geometry Word Problem</h2>
                    <p>Question: What are the coordinates of vertex D?</p>
                    <p>Step 1: A rectangle has opposite sides equal. A(0, 0) to B(4, 0) is horizontal; C(4, 3) to D(x, y) is horizontal.</p>
                    <p>Step 2: B(4, 0) to C(4, 3) is vertical, so D(x, y) to A(0, 0) is vertical. Thus, D is at (0, 3).</p>
                    <p>Solution: The coordinates of D are (0, 3).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "A rectangle has vertices at P(1, 2), Q(5, 2), and R(5, 6). Find the coordinates of the fourth vertex S.",
                question: "What are the coordinates of vertex S?",
                options: [
                    { text: "A) (1, 6)", correct: true },
                    { text: "B) (1, 5)", correct: false },
                    { text: "C) (5, 1)", correct: false },
                    { text: "D) (6, 2)", correct: false }
                ],
                explanation: "P(1, 2) to Q(5, 2) is horizontal; R(5, 6) to S(x, y) is horizontal. Q(5, 2) to R(5, 6) is vertical, so S to P is vertical. Thus, S is at (1, 6). So, A is correct."
            }
        ]
    }
};

// ACT English question array (adapted for Coordinate Geometry)
const englishQuestions = [
    {
        passage: "Plot the point E(-2, 3) on the coordinate plane.",
        question: "What are the coordinates of point E?",
        answers: [
            { text: "A) (-2, 3)", correct: true },
            { text: "B) (2, -3)", correct: false },
            { text: "C) (-2, -3)", correct: false },
            { text: "D) (2, 3)", correct: false }
        ],
        explanation: "The coordinates are x = -2 (left 2 units), y = 3 (up 3 units). So, A is correct.",
        difficulty: "easy",
        category: "act-coordinate-geometry"
    },
    {
        passage: "Find the distance between points F(2, 3) and G(6, 6).",
        question: "What is the distance between F and G?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 6", correct: false },
            { text: "D) 7", correct: false }
        ],
        explanation: "Distance: d = sqrt((6 - 2)^2 + (6 - 3)^2) = sqrt(4^2 + 3^2) = sqrt(16 + 9) = sqrt(25) = 5. So, A is correct.",
        difficulty: "medium",
        category: "act-coordinate-geometry"
    },
    {
        passage: "Find the slope of the line through points H(1, 4) and I(4, 10).",
        question: "What is the slope of the line?",
        answers: [
            { text: "A) 2", correct: true },
            { text: "B) 3", correct: false },
            { text: "C) 1/2", correct: false },
            { text: "D) 4", correct: false }
        ],
        explanation: "Slope: m = (10 - 4) / (4 - 1) = 6 / 3 = 2. So, A is correct.",
        difficulty: "medium",
        category: "act-coordinate-geometry"
    },
    {
        passage: "Find the equation of the line through point (0, 5) with slope 1/2.",
        question: "What is the equation in slope-intercept form?",
        answers: [
            { text: "A) y = (1/2)x + 5", correct: true },
            { text: "B) y = (1/2)x - 5", correct: false },
            { text: "C) y = 2x + 5", correct: false },
            { text: "D) y = x + 5", correct: false }
        ],
        explanation: "Point-slope: y - 5 = (1/2)(x - 0). Simplify: y = (1/2)x + 5. So, A is correct.",
        difficulty: "medium",
        category: "act-coordinate-geometry"
    },
    {
        passage: "Find the midpoint of the segment with endpoints J(-3, 2) and K(1, 4).",
        question: "What are the coordinates of the midpoint?",
        answers: [
            { text: "A) (-1, 3)", correct: true },
            { text: "B) (1, 3)", correct: false },
            { text: "C) (-1, 2)", correct: false },
            { text: "D) (0, 3)", correct: false }
        ],
        explanation: "Midpoint: M = ((-3 + 1)/2, (2 + 4)/2) = (-2/2, 6/2) = (-1, 3). So, A is correct.",
        difficulty: "medium",
        category: "act-coordinate-geometry"
    },
    {
        passage: "The line y = x - 2 is parallel to another line through point (3, 1). Find the equation of the parallel line.",
        question: "What is the equation of the parallel line?",
        answers: [
            { text: "A) y = x - 2", correct: true },
            { text: "B) y = x + 2", correct: false },
            { text: "C) y = -x + 4", correct: false },
            { text: "D) y = x - 1", correct: false }
        ],
        explanation: "Slope of y = x - 2 is 1. Point-slope at (3, 1): y - 1 = 1(x - 3), y = x - 3 + 1 = x - 2. So, A is correct.",
        difficulty: "medium",
        category: "act-coordinate-geometry"
    },
    {
        passage: "A triangle has vertices at A(0, 0), B(2, 0), and C(2, 4). Find the area of the triangle.",
        question: "What is the area of the triangle?",
        answers: [
            { text: "A) 4 square units", correct: true },
            { text: "B) 8 square units", correct: false },
            { text: "C) 6 square units", correct: false },
            { text: "D) 10 square units", correct: false }
        ],
        explanation: "Base AB = 2 units, height from C to x-axis = 4 units. Area = (1/2) * base * height = (1/2) * 2 * 4 = 4. So, A is correct.",
        difficulty: "medium",
        category: "act-coordinate-geometry"
    }
];

// Variables
let categoryStats = {
    "act-coordinate-geometry": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "22";
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
        categoryStats["act-coordinate-geometry"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-coordinate-geometry"].incorrect++;
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
        case 22: return englishQuestions;
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
        category: "act-coordinate-geometry",
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
    let totalCorrect = categoryStats["act-coordinate-geometry"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-coordinate-geometry"].incorrect;

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
    localStorage.setItem(`act-coordinate-geometry-lessonScore-${lessonId}`, score);
    console.log(`Saved act-coordinate-geometry-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-coordinate-geometry-lessonScore-${lessonId}`) || "Not completed yet";
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