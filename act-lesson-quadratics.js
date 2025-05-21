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
    const lessonId = urlParams.get('lesson') || 26;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    26: {
        title: "Quadratics",
        content: [
            {
                type: "example",
                title: "Example 1: Factoring Quadratics",
                passage: "Solve the quadratic equation: x^2 - 5x + 6 = 0.",
                content: `
                    <h2>Example 1: Factoring Quadratics</h2>
                    <p>Question: What are the solutions for x?</p>
                    <p>Step 1: Factor the quadratic: Find numbers that multiply to 6 and add to -5. These are -2 and -3.</p>
                    <p>Step 2: Write as (x - 2)(x - 3) = 0. Set each factor to zero: x - 2 = 0, x = 2; x - 3 = 0, x = 3.</p>
                    <p>Solution: The solutions are x = 2 and x = 3.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Solve the quadratic equation: x^2 + 3x - 10 = 0.",
                question: "What are the solutions for x?",
                options: [
                    { text: "A) x = 2, x = -5", correct: true },
                    { text: "B) x = -2, x = 5", correct: false },
                    { text: "C) x = 3, x = -10", correct: false },
                    { text: "D) x = -3, x = 10", correct: false }
                ],
                explanation: "Factor: Numbers multiply to -10 and add to 3: 5 and -2. So, (x + 5)(x - 2) = 0. Solutions: x = -5, x = 2. So, A is correct."
            },
            {
                type: "example",
                title: "Example 2: Quadratic Formula",
                passage: "Solve the quadratic equation: 2x^2 - 4x - 3 = 0.",
                content: `
                    <h2>Example 2: Quadratic Formula</h2>
                    <p>Question: What are the solutions for x?</p>
                    <p>Step 1: Use the quadratic formula: x = [-b ± sqrt(b^2 - 4ac)] / (2a), where a = 2, b = -4, c = -3.</p>
                    <p>Step 2: Calculate: Discriminant = (-4)^2 - 4(2)(-3) = 16 + 24 = 40. So, x = [4 ± sqrt(40)] / 4 = [4 ± 2*sqrt(10)] / 4 = [2 ± sqrt(10)] / 2.</p>
                    <p>Solution: The solutions are x = (2 + sqrt(10))/2 and x = (2 - sqrt(10))/2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Solve the quadratic equation: 3x^2 + 6x - 2 = 0.",
                question: "What are the solutions for x?",
                options: [
                    { text: "A) x = (-3 ± sqrt(15))/3", correct: true },
                    { text: "B) x = (-6 ± sqrt(12))/6", correct: false },
                    { text: "C) x = (3 ± sqrt(15))/3", correct: false },
                    { text: "D) x = (-3 ± sqrt(12))/6", correct: false }
                ],
                explanation: "Quadratic formula: a = 3, b = 6, c = -2. Discriminant = 6^2 - 4(3)(-2) = 36 + 24 = 60. So, x = [-6 ± sqrt(60)] / 6 = [-6 ± 2*sqrt(15)] / 6 = [-3 ± sqrt(15)] / 3. So, A is correct."
            },
            {
                type: "example",
                title: "Example 3: Completing the Square",
                passage: "Solve the quadratic equation: x^2 + 4x - 5 = 0.",
                content: `
                    <h2>Example 3: Completing the Square</h2>
                    <p>Question: What are the solutions for x?</p>
                    <p>Step 1: Move constant: x^2 + 4x = 5. Complete the square: Half of 4 is 2, square it: 2^2 = 4. Add 4 to both sides: x^2 + 4x + 4 = 5 + 4.</p>
                    <p>Step 2: Factor: (x + 2)^2 = 9. Take square root: x + 2 = ±3. Solve: x = 3 - 2 = 1, x = -3 - 2 = -5.</p>
                    <p>Solution: The solutions are x = 1 and x = -5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Solve the quadratic equation: x^2 - 6x + 2 = 0.",
                question: "What are the solutions for x?",
                options: [
                    { text: "A) x = 3 ± sqrt(7)", correct: true },
                    { text: "B) x = 3 ± sqrt(11)", correct: false },
                    { text: "C) x = 6 ± sqrt(7)", correct: false },
                    { text: "D) x = -3 ± sqrt(7)", correct: false }
                ],
                explanation: "Complete the square: x^2 - 6x = -2. Half of -6 is -3, square it: (-3)^2 = 9. Add 9: x^2 - 6x + 9 = -2 + 9, (x - 3)^2 = 7. Square root: x - 3 = ±sqrt(7), x = 3 ± sqrt(7). So, A is correct."
            },
            {
                type: "example",
                title: "Example 4: Finding the Vertex",
                passage: "Find the vertex of the quadratic function: f(x) = x^2 - 4x + 3.",
                content: `
                    <h2>Example 4: Finding the Vertex</h2>
                    <p>Question: What are the coordinates of the vertex?</p>
                    <p>Step 1: Vertex x-coordinate: x = -b / (2a), where a = 1, b = -4. So, x = -(-4) / (2 * 1) = 4 / 2 = 2.</p>
                    <p>Step 2: Find y-coordinate: f(2) = 2^2 - 4(2) + 3 = 4 - 8 + 3 = -1.</p>
                    <p>Solution: The vertex is (2, -1).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Find the vertex of the quadratic function: f(x) = 2x^2 + 8x + 5.",
                question: "What are the coordinates of the vertex?",
                options: [
                    { text: "A) (-2, -3)", correct: true },
                    { text: "B) (2, 5)", correct: false },
                    { text: "C) (-2, 5)", correct: false },
                    { text: "D) (2, -3)", correct: false }
                ],
                explanation: "Vertex x: x = -b / (2a), a = 2, b = 8. So, x = -8 / (2 * 2) = -2. Then, f(-2) = 2(-2)^2 + 8(-2) + 5 = 8 - 16 + 5 = -3. Vertex is (-2, -3). So, A is correct."
            },
            {
                type: "example",
                title: "Example 5: Graphing Quadratics",
                passage: "Describe the graph of the quadratic function: f(x) = -x^2 + 2x + 3.",
                content: `
                    <h2>Example 5: Graphing Quadratics</h2>
                    <p>Question: What is the direction of the parabola and its vertex?</p>
                    <p>Step 1: Since a = -1 (negative), the parabola opens downward.</p>
                    <p>Step 2: Vertex x: x = -b / (2a), b = 2, a = -1. So, x = -2 / (2 * -1) = 1. Then, f(1) = -(1)^2 + 2(1) + 3 = -1 + 2 + 3 = 4.</p>
                    <p>Solution: The parabola opens downward with vertex at (1, 4).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Describe the graph of the quadratic function: f(x) = x^2 - 6x + 8.",
                question: "What is the direction of the parabola and its vertex?",
                options: [
                    { text: "A) Opens upward, vertex at (3, -1)", correct: true },
                    { text: "B) Opens downward, vertex at (3, -1)", correct: false },
                    { text: "C) Opens upward, vertex at (-3, 8)", correct: false },
                    { text: "D) Opens downward, vertex at (3, 8)", correct: false }
                ],
                explanation: "a = 1 (positive), so parabola opens upward. Vertex x: x = -(-6) / (2 * 1) = 3. Then, f(3) = 3^2 - 6(3) + 8 = 9 - 18 + 8 = -1. Vertex is (3, -1). So, A is correct."
            },
            {
                type: "example",
                title: "Example 6: Finding Roots",
                passage: "Find the roots of the quadratic function: f(x) = x^2 - 4.",
                content: `
                    <h2>Example 6: Finding Roots</h2>
                    <p>Question: What are the roots of f(x)?</p>
                    <p>Step 1: Set f(x) = 0: x^2 - 4 = 0.</p>
                    <p>Step 2: Factor: (x - 2)(x + 2) = 0. Solve: x = 2, x = -2.</p>
                    <p>Solution: The roots are x = 2 and x = -2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Find the roots of the quadratic function: f(x) = x^2 - 9.",
                question: "What are the roots of f(x)?",
                options: [
                    { text: "A) x = 3, x = -3", correct: true },
                    { text: "B) x = 9, x = -9", correct: false },
                    { text: "C) x = 3, x = 3", correct: false },
                    { text: "D) x = -3, x = -3", correct: false }
                ],
                explanation: "Set f(x) = 0: x^2 - 9 = 0. Factor: (x - 3)(x + 3) = 0. Solve: x = 3, x = -3. So, A is correct."
            },
            {
                type: "example",
                title: "Example 7: Quadratic Word Problem",
                passage: "A ball is thrown with height modeled by h(t) = -16t^2 + 32t + 5, where t is time in seconds.",
                content: `
                    <h2>Example 7: Quadratic Word Problem</h2>
                    <p>Question: What is the maximum height of the ball?</p>
                    <p>Step 1: The maximum height occurs at the vertex. For h(t) = -16t^2 + 32t + 5, a = -16, b = 32. Vertex t = -b / (2a) = -32 / (2 * -16) = 1.</p>
                    <p>Step 2: Calculate height: h(1) = -16(1)^2 + 32(1) + 5 = -16 + 32 + 5 = 21.</p>
                    <p>Solution: The maximum height is 21 feet.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "A projectile’s height is modeled by h(t) = -16t^2 + 48t + 4, where t is time in seconds.",
                question: "What is the maximum height of the projectile?",
                options: [
                    { text: "A) 40 feet", correct: true },
                    { text: "B) 36 feet", correct: false },
                    { text: "C) 48 feet", correct: false },
                    { text: "D) 52 feet", correct: false }
                ],
                explanation: "Vertex t = -b / (2a), a = -16, b = 48. So, t = -48 / (2 * -16) = 1.5. Then, h(1.5) = -16(1.5)^2 + 48(1.5) + 4 = -16(2.25) + 72 + 4 = -36 + 72 + 4 = 40. So, A is correct."
            }
        ]
    }
};

// ACT English question array (adapted for Quadratics)
const englishQuestions = [
    {
        passage: "Solve the quadratic equation: x^2 - 7x + 12 = 0.",
        question: "What are the solutions for x?",
        answers: [
            { text: "A) x = 3, x = 4", correct: true },
            { text: "B) x = -3, x = -4", correct: false },
            { text: "C) x = 7, x = -12", correct: false },
            { text: "D) x = -7, x = 12", correct: false }
        ],
        explanation: "Factor: Numbers multiply to 12 and add to -7: -3 and -4. So, (x - 3)(x - 4) = 0. Solutions: x = 3, x = 4. So, A is correct.",
        difficulty: "easy",
        category: "act-quadratics"
    },
    {
        passage: "Solve the quadratic equation: x^2 + 2x - 8 = 0.",
        question: "What are the solutions for x?",
        answers: [
            { text: "A) x = 2, x = -4", correct: true },
            { text: "B) x = -2, x = 4", correct: false },
            { text: "C) x = 1, x = -8", correct: false },
            { text: "D) x = -1, x = 8", correct: false }
        ],
        explanation: "Factor: Numbers multiply to -8 and add to 2: 4 and -2. So, (x + 4)(x - 2) = 0. Solutions: x = -4, x = 2. So, A is correct.",
        difficulty: "easy",
        category: "act-quadratics"
    },
    {
        passage: "Solve the quadratic equation: 4x^2 - 4x + 1 = 0.",
        question: "What are the solutions for x?",
        answers: [
            { text: "A) x = 1/2", correct: true },
            { text: "B) x = 1", correct: false },
            { text: "C) x = -1/2", correct: false },
            { text: "D) x = 2", correct: false }
        ],
        explanation: "Quadratic formula: a = 4, b = -4, c = 1. Discriminant = (-4)^2 - 4(4)(1) = 16 - 16 = 0. So, x = [-(-4) ± sqrt(0)] / (2 * 4) = 4 / 8 = 1/2. Single solution. So, A is correct.",
        difficulty: "medium",
        category: "act-quadratics"
    },
    {
        passage: "Find the vertex of the quadratic function: f(x) = x^2 + 4x - 5.",
        question: "What are the coordinates of the vertex?",
        answers: [
            { text: "A) (-2, -9)", correct: true },
            { text: "B) (2, -5)", correct: false },
            { text: "C) (-2, 5)", correct: false },
            { text: "D) (4, -5)", correct: false }
        ],
        explanation: "Vertex x: x = -b / (2a), a = 1, b = 4. So, x = -4 / (2 * 1) = -2. Then, f(-2) = (-2)^2 + 4(-2) - 5 = 4 - 8 - 5 = -9. Vertex is (-2, -9). So, A is correct.",
        difficulty: "medium",
        category: "act-quadratics"
    },
    {
        passage: "Describe the graph of the quadratic function: f(x) = -2x^2 + 4x + 1.",
        question: "What is the direction of the parabola and its vertex?",
        answers: [
            { text: "A) Opens downward, vertex at (1, 3)", correct: true },
            { text: "B) Opens upward, vertex at (1, 3)", correct: false },
            { text: "C) Opens downward, vertex at (-1, 1)", correct: false },
            { text: "D) Opens upward, vertex at (-1, 1)", correct: false }
        ],
        explanation: "a = -2 (negative), so parabola opens downward. Vertex x: x = -4 / (2 * -2) = 1. Then, f(1) = -2(1)^2 + 4(1) + 1 = -2 + 4 + 1 = 3. Vertex is (1, 3). So, A is correct.",
        difficulty: "medium",
        category: "act-quadratics"
    },
    {
        passage: "Find the roots of the quadratic function: f(x) = x^2 - 16.",
        question: "What are the roots of f(x)?",
        answers: [
            { text: "A) x = 4, x = -4", correct: true },
            { text: "B) x = 16, x = -16", correct: false },
            { text: "C) x = 8, x = -8", correct: false },
            { text: "D) x = 4, x = 4", correct: false }
        ],
        explanation: "Set f(x) = 0: x^2 - 16 = 0. Factor: (x - 4)(x + 4) = 0. Solve: x = 4, x = -4. So, A is correct.",
        difficulty: "easy",
        category: "act-quadratics"
    },
    {
        passage: "A rectangular garden’s length is 3 meters more than its width. The area is 40 square meters.",
        question: "What is the width of the garden?",
        answers: [
            { text: "A) 5 meters", correct: true },
            { text: "B) 8 meters", correct: false },
            { text: "C) 4 meters", correct: false },
            { text: "D) 6 meters", correct: false }
        ],
        explanation: "Let width = w, length = w + 3. Area: w(w + 3) = 40, w^2 + 3w - 40 = 0. Factor: (w + 8)(w - 5) = 0. Solutions: w = -8 (invalid), w = 5. So, A is correct.",
        difficulty: "medium",
        category: "act-quadratics"
    }
];

// Variables
let categoryStats = {
    "act-quadratics": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "26";
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
        categoryStats["act-quadratics"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-quadratics"].incorrect++;
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
        case 26: return englishQuestions;
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
        category: "act-quadratics",
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
    let totalCorrect = categoryStats["act-quadratics"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-quadratics"].incorrect;

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
    localStorage.setItem(`act-quadratics-lessonScore-${lessonId}`, score);
    console.log(`Saved act-quadratics-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-quadratics-lessonScore-${lessonId}`) || "Not completed yet";
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