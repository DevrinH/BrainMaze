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
    const lessonId = urlParams.get('lesson') || 28;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    28: {
        title: "Complex Numbers",
        content: [
            {
                type: "example",
                title: "Example 1: Simplifying Powers of i",
                passage: "Simplify i^7, where i is the imaginary unit with i^2 = -1.",
                content: `
                    <h2>Example 1: Simplifying Powers of i</h2>
                    <p>Question: What is the value of i^7?</p>
                    <p>Step 1: Use the cyclic pattern of i: i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1, repeating every 4 powers.</p>
                    <p>Step 2: Divide the exponent by 4: 7 ÷ 4 = 1 remainder 3. So, i^7 = i^(4*1 + 3) = (i^4)^1 * i^3 = 1 * (-i) = -i.</p>
                    <p>Solution: i^7 = -i.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Simplify i^9, where i is the imaginary unit with i^2 = -1.",
                question: "What is the value of i^9?",
                options: [
                    { text: "A) i", correct: true },
                    { text: "B) -i", correct: false },
                    { text: "C) 1", correct: false },
                    { text: "D) -1", correct: false }
                ],
                explanation: "i^9 = i^(4*2 + 1) = (i^4)^2 * i^1 = 1^2 * i = i. So, A is correct."
            },
            {
                type: "example",
                title: "Example 2: Adding Complex Numbers",
                passage: "Add the complex numbers (3 + 2i) and (1 - 4i).",
                content: `
                    <h2>Example 2: Adding Complex Numbers</h2>
                    <p>Question: What is the sum of (3 + 2i) and (1 - 4i)?</p>
                    <p>Step 1: Add real parts and imaginary parts separately.</p>
                    <p>Step 2: Real: 3 + 1 = 4. Imaginary: 2i - 4i = -2i. So, (3 + 2i) + (1 - 4i) = 4 - 2i.</p>
                    <p>Solution: The sum is 4 - 2i.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Add the complex numbers (5 - i) and (-2 + 3i).",
                question: "What is the sum of (5 - i) and (-2 + 3i)?",
                options: [
                    { text: "A) 3 + 2i", correct: true },
                    { text: "B) 3 - 2i", correct: false },
                    { text: "C) 7 + 2i", correct: false },
                    { text: "D) 7 - 4i", correct: false }
                ],
                explanation: "Real: 5 + (-2) = 3. Imaginary: -i + 3i = 2i. So, (5 - i) + (-2 + 3i) = 3 + 2i. So, A is correct."
            },
            {
                type: "example",
                title: "Example 3: Multiplying Complex Numbers",
                passage: "Multiply the complex numbers (2 + i) and (3 - i).",
                content: `
                    <h2>Example 3: Multiplying Complex Numbers</h2>
                    <p>Question: What is the product of (2 + i) and (3 - i)?</p>
                    <p>Step 1: Use the distributive property (FOIL): (2 + i)(3 - i) = 2*3 + 2*(-i) + i*3 + i*(-i).</p>
                    <p>Step 2: Simplify: 6 - 2i + 3i - i^2. Since i^2 = -1, -i^2 = 1. Combine: 6 + 1 + (-2i + 3i) = 7 + i.</p>
                    <p>Solution: The product is 7 + i.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Multiply the complex numbers (1 + 2i) and (2 - i).",
                question: "What is the product of (1 + 2i) and (2 - i)?",
                options: [
                    { text: "A) 4 + 3i", correct: true },
                    { text: "B) 4 - 3i", correct: false },
                    { text: "C) 0 + 3i", correct: false },
                    { text: "D) 2 + 3i", correct: false }
                ],
                explanation: "FOIL: (1 + 2i)(2 - i) = 1*2 + 1*(-i) + 2i*2 + 2i*(-i) = 2 - i + 4i - 2i^2. Since i^2 = -1, -2i^2 = 2. Combine: 2 + 2 + (-i + 4i) = 4 + 3i. So, A is correct."
            },
            {
                type: "example",
                title: "Example 4: Dividing Complex Numbers",
                passage: "Divide the complex number (3 + i) by (1 + i).",
                content: `
                    <h2>Example 4: Dividing Complex Numbers</h2>
                    <p>Question: What is the quotient of (3 + i) / (1 + i)?</p>
                    <p>Step 1: Multiply numerator and denominator by the conjugate of the denominator (1 - i): (3 + i)(1 - i) / (1 + i)(1 - i).</p>
                    <p>Step 2: Numerator: (3 + i)(1 - i) = 3 - 3i + i - i^2 = 3 - 2i + 1 = 4 - 2i. Denominator: (1 + i)(1 - i) = 1 - i^2 = 1 - (-1) = 2. So, (4 - 2i) / 2 = 2 - i.</p>
                    <p>Solution: The quotient is 2 - i.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Divide the complex number (2 + i) by (1 - i).",
                question: "What is the quotient of (2 + i) / (1 - i)?",
                options: [
                    { text: "A) 1/2 + 3/2i", correct: true },
                    { text: "B) 1/2 - 3/2i", correct: false },
                    { text: "C) 2 + i", correct: false },
                    { text: "D) 2 - i", correct: false }
                ],
                explanation: "Multiply by conjugate (1 + i): (2 + i)(1 + i) / (1 - i)(1 + i). Numerator: (2 + i)(1 + i) = 2 + 2i + i + i^2 = 2 + 3i - 1 = 1 + 3i. Denominator: 1 - i^2 = 1 - (-1) = 2. So, (1 + 3i) / 2 = 1/2 + 3/2i. So, A is correct."
            },
            {
                type: "example",
                title: "Example 5: Solving Quadratic with Complex Roots",
                passage: "Solve the quadratic equation: x^2 + 2x + 5 = 0.",
                content: `
                    <h2>Example 5: Solving Quadratic with Complex Roots</h2>
                    <p>Question: What are the solutions for x?</p>
                    <p>Step 1: Use the quadratic formula: x = [-b ± sqrt(b^2 - 4ac)] / (2a), where a = 1, b = 2, c = 5.</p>
                    <p>Step 2: Discriminant: 2^2 - 4(1)(5) = 4 - 20 = -16. So, x = [-2 ± sqrt(-16)] / 2 = [-2 ± 4i] / 2 = -1 ± 2i.</p>
                    <p>Solution: The solutions are x = -1 + 2i and x = -1 - 2i.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Solve the quadratic equation: x^2 - 4x + 13 = 0.",
                question: "What are the solutions for x?",
                options: [
                    { text: "A) x = 2 ± 3i", correct: true },
                    { text: "B) x = 2 ± i", correct: false },
                    { text: "C) x = 4 ± 3i", correct: false },
                    { text: "D) x = -2 ± 3i", correct: false }
                ],
                explanation: "Quadratic formula: a = 1, b = -4, c = 13. Discriminant: (-4)^2 - 4(1)(13) = 16 - 52 = -36. So, x = [4 ± sqrt(-36)] / 2 = [4 ± 6i] / 2 = 2 ± 3i. So, A is correct."
            },
            {
                type: "example",
                title: "Example 6: Complex Conjugate",
                passage: "Find the conjugate of the complex number 3 - 5i.",
                content: `
                    <h2>Example 6: Complex Conjugate</h2>
                    <p>Question: What is the conjugate of 3 - 5i?</p>
                    <p>Step 1: The conjugate of a + bi is a - bi.</p>
                    <p>Step 2: For 3 - 5i, change the sign of the imaginary part: 3 - (-5i) = 3 + 5i.</p>
                    <p>Solution: The conjugate is 3 + 5i.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Find the conjugate of the complex number -2 + 7i.",
                question: "What is the conjugate of -2 + 7i?",
                options: [
                    { text: "A) -2 - 7i", correct: true },
                    { text: "B) 2 + 7i", correct: false },
                    { text: "C) -2 + 7i", correct: false },
                    { text: "D) 2 - 7i", correct: false }
                ],
                explanation: "Conjugate of -2 + 7i is -2 - 7i. So, A is correct."
            },
            {
                type: "example",
                title: "Example 7: Complex Numbers in Quadratics",
                passage: "A quadratic equation x^2 - 2x + k = 0 has one root 1 + 2i.",
                content: `
                    <h2>Example 7: Complex Numbers in Quadratics</h2>
                    <p>Question: What is the value of k?</p>
                    <p>Step 1: Complex roots are conjugates. If 1 + 2i is a root, so is 1 - 2i.</p>
                    <p>Step 2: Sum of roots: (1 + 2i) + (1 - 2i) = 2. Product of roots: (1 + 2i)(1 - 2i) = 1 - 4i^2 = 1 - 4(-1) = 5. For x^2 - 2x + k, sum = -b/a = 2, product = c/a = k/1 = k. So, k = 5.</p>
                    <p>Solution: k = 5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "A quadratic equation x^2 + 4x + k = 0 has one root -2 + i.",
                question: "What is the value of k?",
                options: [
                    { text: "A) 5", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) 6", correct: false }
                ],
                explanation: "Other root is -2 - i. Sum: (-2 + i) + (-2 - i) = -4. Product: (-2 + i)(-2 - i) = 4 - i^2 = 4 - (-1) = 5. For x^2 + 4x + k, sum = -b/a = -4, product = k/1 = k = 5. So, A is correct."
            }
        ]
    }
};

// ACT English question array (adapted for Complex Numbers)
const englishQuestions = [
    {
        passage: "Simplify i^10, where i is the imaginary unit with i^2 = -1.",
        question: "What is the value of i^10?",
        answers: [
            { text: "A) -1", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) i", correct: false },
            { text: "D) -i", correct: false }
        ],
        explanation: "i^10 = i^(4*2 + 2) = (i^4)^2 * i^2 = 1^2 * (-1) = -1. So, A is correct.",
        difficulty: "easy",
        category: "act-complex-numbers"
    },
    {
        passage: "Add the complex numbers (4 + 3i) and (-1 + 2i).",
        question: "What is the sum of (4 + 3i) and (-1 + 2i)?",
        answers: [
            { text: "A) 3 + 5i", correct: true },
            { text: "B) 5 + 5i", correct: false },
            { text: "C) 3 - 5i", correct: false },
            { text: "D) 5 - i", correct: false }
        ],
        explanation: "Real: 4 + (-1) = 3. Imaginary: 3i + 2i = 5i. So, (4 + 3i) + (-1 + 2i) = 3 + 5i. So, A is correct.",
        difficulty: "easy",
        category: "act-complex-numbers"
    },
    {
        passage: "Multiply the complex numbers (3 + i) and (2 + i).",
        question: "What is the product of (3 + i) and (2 + i)?",
        answers: [
            { text: "A) 5 + 5i", correct: true },
            { text: "B) 7 + i", correct: false },
            { text: "C) 5 - i", correct: false },
            { text: "D) 7 - i", correct: false }
        ],
        explanation: "FOIL: (3 + i)(2 + i) = 6 + 3i + 2i + i^2 = 6 + 5i - 1 = 5 + 5i. So, A is correct.",
        difficulty: "medium",
        category: "act-complex-numbers"
    },
    {
        passage: "Divide the complex number (1 + i) by (1 - i).",
        question: "What is the quotient of (1 + i) / (1 - i)?",
        answers: [
            { text: "A) i", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) -i", correct: false },
            { text: "D) -1", correct: false }
        ],
        explanation: "Multiply by conjugate (1 + i): (1 + i)(1 + i) / (1 - i)(1 + i) = (1 + 2i + i^2) / (1 - i^2) = (1 + 2i - 1) / (1 - (-1)) = 2i / 2 = i. So, A is correct.",
        difficulty: "medium",
        category: "act-complex-numbers"
    },
    {
        passage: "Solve the quadratic equation: x^2 + 1 = 0.",
        question: "What are the solutions for x?",
        answers: [
            { text: "A) x = i, x = -i", correct: true },
            { text: "B) x = 1, x = -1", correct: false },
            { text: "C) x = 2i, x = -2i", correct: false },
            { text: "D) x = 0", correct: false }
        ],
        explanation: "x^2 + 1 = 0, x^2 = -1, x = ±sqrt(-1) = ±i. So, A is correct.",
        difficulty: "easy",
        category: "act-complex-numbers"
    },
    {
        passage: "Find the conjugate of the complex number 6 - 3i.",
        question: "What is the conjugate of 6 - 3i?",
        answers: [
            { text: "A) 6 + 3i", correct: true },
            { text: "B) -6 + 3i", correct: false },
            { text: "C) 6 - 3i", correct: false },
            { text: "D) -6 - 3i", correct: false }
        ],
        explanation: "Conjugate of 6 - 3i is 6 + 3i. So, A is correct.",
        difficulty: "easy",
        category: "act-complex-numbers"
    },
    {
        passage: "A quadratic equation x^2 - 6x + k = 0 has one root 3 + 2i.",
        question: "What is the value of k?",
        answers: [
            { text: "A) 13", correct: true },
            { text: "B) 9", correct: false },
            { text: "C) 11", correct: false },
            { text: "D) 15", correct: false }
        ],
        explanation: "Other root is 3 - 2i. Sum: (3 + 2i) + (3 - 2i) = 6. Product: (3 + 2i)(3 - 2i) = 9 - 4i^2 = 9 - 4(-1) = 13. For x^2 - 6x + k, sum = -b/a = 6, product = k/1 = k = 13. So, A is correct.",
        difficulty: "medium",
        category: "act-complex-numbers"
    }
];

// Variables
let categoryStats = {
    "act-complex-numbers": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "28";
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
        categoryStats["act-complex-numbers"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-complex-numbers"].incorrect++;
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
        case 28: return englishQuestions;
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
        category: "act-complex-numbers",
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
    let totalCorrect = categoryStats["act-complex-numbers"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-complex-numbers"].incorrect;

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
    localStorage.setItem(`act-complex-numbers-lessonScore-${lessonId}`, score);
    console.log(`Saved act-complex-numbers-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-complex-numbers-lessonScore-${lessonId}`) || "Not completed yet";
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