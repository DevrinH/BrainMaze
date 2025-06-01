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
        title: "Algebra",
        content: [
            {
                type: "example",
                title: "Example 1: Solving Linear Equations",
                content: `
                    <h2>Example 1: Solving Linear Equations</h2>
                    <p>Passage: A linear equation in one variable can be solved by isolating the variable. Solve: 2x + 5 = 11.</p>
                    <p>Question: What is the value of x?</p>
                    <p>Step 1: Subtract 5 from both sides: 2x = 6.</p>
                    <p>Step 2: Divide both sides by 2: x = 3.</p>
                    <p>Solution: The value of x is 3.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a small business owner in Millville calculated their monthly expenses using a linear equation. The equation 3x + 7 = 22 represented costs, where x is the number of supplies purchased. Solving this equation by isolating x helps determine the supply count.",
                question: "What is the value of x?",
                options: [
                    { text: "A) 5", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) 7", correct: false },
                    { text: "D) 10", correct: false }
                ],
                explanation: "Subtract 7: 3x = 15; divide by 3: x = 5, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Graphing Linear Equations",
                content: `
                    <h2>Example 2: Graphing Linear Equations</h2>
                    <p>Passage: A linear equation in slope-intercept form is y = mx + b, where m is the slope and b is the y-intercept. For y = 2x + 3, the slope is 2 and the y-intercept is 3.</p>
                    <p>Question: What is the slope of y = 2x + 3?</p>
                    <p>Step 1: Identify form: y = mx + b.</p>
                    <p>Step 2: Read slope: m = 2.</p>
                    <p>Solution: The slope is 2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a data analyst in Greenvale modeled sales growth with the equation y = 4x - 1, where y is revenue and x is time in months. The slope-intercept form, y = mx + b, reveals the slope, which indicates the rate of revenue increase per month.",
                question: "What is the slope of y = 4x - 1?",
                options: [
                    { text: "A) -1", correct: false },
                    { text: "B) 4", correct: true },
                    { text: "C) 1", correct: false },
                    { text: "D) 0", correct: false }
                ],
                explanation: "In y = mx + b, m = 4, making B correct."
            },
            {
                type: "example",
                title: "Example 3: Systems of Equations",
                content: `
                    <h2>Example 3: Systems of Equations</h2>
                    <p>Passage: A system of equations can be solved by substitution. Solve: y = x + 2 and 2x + y = 7.</p>
                    <p>Question: What is the value of x?</p>
                    <p>Step 1: Substitute y = x + 2 into 2x + y = 7: 2x + (x + 2) = 7.</p>
                    <p>Step 2: Simplify: 3x + 2 = 7; 3x = 5; x = 5/3.</p>
                    <p>Solution: The value of x is 5/3.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a store manager in Clearwater used a system of equations to balance inventory: y = 2x + 1 (items in stock) and x + y = 7 (total items). Solving by substitution, substituting y into the second equation, determines the number of one item type, x.",
                question: "What is the value of x?",
                options: [
                    { text: "A) 2", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) 1", correct: false },
                    { text: "D) 4", correct: false }
                ],
                explanation: "Substitute y = 2x + 1 into x + y = 7: x + (2x + 1) = 7; 3x + 1 = 7; 3x = 6; x = 2, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Quadratic Equations",
                content: `
                    <h2>Example 4: Quadratic Equations</h2>
                    <p>Passage: A quadratic equation ax² + bx + c = 0 can be solved by factoring. Solve: x² - 5x + 6 = 0.</p>
                    <p>Question: What are the solutions for x?</p>
                    <p>Step 1: Factor: (x - 2)(x - 3) = 0.</p>
                    <p>Step 2: Set each factor to zero: x - 2 = 0, x = 2; x - 3 = 0, x = 3.</p>
                    <p>Solution: The solutions are x = 2 and x = 3.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, an engineer in Millville modeled a projectile’s path with the quadratic equation x² - 7x + 12 = 0 to find where it lands (x). Factoring the equation ax² + bx + c = 0 identifies the x-values where the projectile hits the ground.",
                question: "What are the solutions for x?",
                options: [
                    { text: "A) x = 2, x = 5", correct: false },
                    { text: "B) x = 3, x = 4", correct: true },
                    { text: "C) x = 1, x = 6", correct: false },
                    { text: "D) x = 2, x = 6", correct: false }
                ],
                explanation: "Factor: x² - 7x + 12 = (x - 3)(x - 4) = 0; x = 3, x = 4, making B correct."
            },
            {
                type: "example",
                title: "Example 5: Exponents and Polynomials",
                content: `
                    <h2>Example 5: Exponents and Polynomials</h2>
                    <p>Passage: The product rule for exponents states a^m × a^n = a^(m+n). Simplify: x^3 × x^2.</p>
                    <p>Question: What is the simplified expression?</p>
                    <p>Step 1: Apply rule: x^3 × x^2 = x^(3+2).</p>
                    <p>Step 2: Simplify: x^(3+2) = x^5.</p>
                    <p>Solution: The simplified expression is x^5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, a scientist in Greenvale modeled bacterial growth using exponential expressions. To combine growth rates, the product rule for exponents, a^m × a^n = a^(m+n), was applied to simplify x^4 × x^3, representing total growth over time periods.",
                question: "What is the simplified expression?",
                options: [
                    { text: "A) x^12", correct: false },
                    { text: "B) x^7", correct: true },
                    { text: "C) x^1", correct: false },
                    { text: "D) x^9", correct: false }
                ],
                explanation: "x^4 × x^3 = x^(4+3) = x^7, making B correct."
            },
            {
                type: "example",
                title: "Example 6: Inequalities",
                content: `
                    <h2>Example 6: Inequalities</h2>
                    <p>Passage: To solve an inequality, isolate the variable, reversing the inequality sign when multiplying/dividing by a negative number. Solve: -3x + 6 > 12.</p>
                    <p>Question: What is the solution for x?</p>
                    <p>Step 1: Subtract 6: -3x > 6.</p>
                    <p>Step 2: Divide by -3, reverse sign: x < -2.</p>
                    <p>Solution: The solution is x < -2.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a budget planner in Clearwater set a financial limit using the inequality 4x - 8 ≤ 12, where x represents weekly expenses. Solving this inequality by isolating x determines the maximum allowable expenses to stay within budget.",
                question: "What is the solution for x?",
                options: [
                    { text: "A) x ≤ 5", correct: true },
                    { text: "B) x ≤ 3", correct: false },
                    { text: "C) x ≥ 5", correct: false },
                    { text: "D) x ≥ 1", correct: false }
                ],
                explanation: "Add 8: 4x ≤ 20; divide by 4: x ≤ 5, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Functions and Relations",
                content: `
                    <h2>Example 7: Functions and Relations</h2>
                    <p>Passage: A function f(x) assigns one output to each input. For f(x) = 2x - 1, evaluate f(3).</p>
                    <p>Question: What is f(3)?</p>
                    <p>Step 1: Substitute x = 3: f(3) = 2(3) - 1.</p>
                    <p>Step 2: Simplify: f(3) = 6 - 1 = 5.</p>
                    <p>Solution: f(3) = 5.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, a researcher in Millville used the function f(x) = 3x + 2 to model data points, where x is the input variable and f(x) is the output. Evaluating the function at a specific value, such as x = 4, helps predict outcomes for analysis.",
                question: "What is f(4)?",
                options: [
                    { text: "A) 10", correct: false },
                    { text: "B) 12", correct: false },
                    { text: "C) 14", correct: true },
                    { text: "D) 8", correct: false }
                ],
                explanation: "f(4) = 3(4) + 2 = 12 + 2 = 14, making C correct."
            }
        ]
    }
};

// Algebra question array
const algebraQuestions = [
    {
        passage: "In 2023, a freelancer in Millville used a linear equation to calculate hours worked. The equation 5x + 10 = 30 represented total earnings, where x is hours worked. Solving this linear equation by isolating x determines the number of hours needed.",
        question: "What is the value of x?",
        answers: [
            { text: "A) 4", correct: true },
            { text: "B) 6", correct: false },
            { text: "C) 2", correct: false },
            { text: "D) 8", correct: false }
        ],
        explanation: "Subtract 10: 5x = 20; divide by 5: x = 4, making A correct.",
        difficulty: "easy",
        category: "ged-algebra"
    },
    {
        passage: "In 2024, a marketing firm in Greenvale used the equation y = -2x + 5 to predict advertising costs, where y is cost and x is campaign duration. The slope-intercept form, y = mx + b, shows the slope, indicating the rate of cost change per unit time.",
        question: "What is the slope of y = -2x + 5?",
        answers: [
            { text: "A) 5", correct: false },
            { text: "B) -2", correct: true },
            { text: "C) 2", correct: false },
            { text: "D) -5", correct: false }
        ],
        explanation: "In y = mx + b, m = -2, making B correct.",
        difficulty: "medium",
        category: "ged-algebra"
    },
    {
        passage: "In 2023, a retailer in Clearwater balanced two product types using a system of equations: y = x + 3 and 3x + y = 15. Substituting y from the first equation into the second solves for x, determining the quantity of one product type.",
        question: "What is the value of x?",
        answers: [
            { text: "A) 6", correct: false },
            { text: "B) 3", correct: true },
            { text: "C) 4", correct: false },
            { text: "D) 2", correct: false }
        ],
        explanation: "Substitute y = x + 3 into 3x + y = 15: 3x + (x + 3) = 15; 4x + 3 = 15; 4x = 12; x = 3, making B correct.",
        difficulty: "medium",
        category: "ged-algebra"
    },
    {
        passage: "In 2024, a physicist in Millville analyzed a motion equation x² - 8x + 15 = 0 to find time points (x) of an object’s position. Factoring the quadratic equation ax² + bx + c = 0 yields solutions where the object reaches a specific point.",
        question: "What are the solutions for x?",
        answers: [
            { text: "A) x = 3, x = 5", correct: true },
            { text: "B) x = 2, x = 6", correct: false },
            { text: "C) x = 1, x = 7", correct: false },
            { text: "D) x = 4, x = 4", correct: false }
        ],
        explanation: "Factor: x² - 8x + 15 = (x - 3)(x - 5) = 0; x = 3, x = 5, making A correct.",
        difficulty: "medium",
        category: "ged-algebra"
    },
    {
        passage: "In 2023, a tech company in Greenvale simplified a computational model using the exponent rule a^m × a^n = a^(m+n). To combine terms x^5 × x^2, the rule was applied to streamline calculations for processing power over time intervals.",
        question: "What is the simplified expression?",
        answers: [
            { text: "A) x^10", correct: false },
            { text: "B) x^3", correct: false },
            { text: "C) x^7", correct: true },
            { text: "D) x^5", correct: false }
        ],
        explanation: "x^5 × x^2 = x^(5+2) = x^7, making C correct.",
        difficulty: "medium",
        category: "ged-algebra"
    },
    {
        passage: "In 2024, a financial advisor in Clearwater used the inequality -2x + 4 ≥ 0 to set a client’s investment threshold, where x represents investment amounts. Solving this by isolating x determines the minimum investment to meet the target.",
        question: "What is the solution for x?",
        answers: [
            { text: "A) x ≥ 2", correct: false },
            { text: "B) x ≤ -2", correct: false },
            { text: "C) x ≤ 2", correct: true },
            { text: "D) x ≥ -2", correct: false }
        ],
        explanation: "Subtract 4: -2x ≥ -4; divide by -2, reverse sign: x ≤ 2, making C correct.",
        difficulty: "medium",
        category: "ged-algebra"
    },
    {
        passage: "In 2023, a data scientist in Millville modeled temperature changes with the function f(x) = -x + 6, where x is time and f(x) is temperature. Evaluating the function at x = 2 predicts the temperature at that specific time point.",
        question: "What is f(2)?",
        answers: [
            { text: "A) 8", correct: false },
            { text: "B) 6", correct: false },
            { text: "C) 2", correct: false },
            { text: "D) 4", correct: true }
        ],
        explanation: "f(2) = -2 + 6 = 4, making D correct.",
        difficulty: "medium",
        category: "ged-algebra"
    }
];

// Variables
let categoryStats = {
    "ged-algebra": { correct: 0, incorrect: 0 }
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
        console.error("Start lesson button not found!");
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
            lessonContent.innerHTML = `
                <div class="question-row math-section">
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

// Extract passage from content (simplified for examples and questions)
function extractPassage(content) {
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/In.*?(\.(?=\s*The\s|\s*This\s)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
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
        categoryStats["ged-algebra"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-algebra"].incorrect++;
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
        case 1: return algebraQuestions;
        default: return algebraQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row math-section">
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
    let totalCorrect = categoryStats["ged-algebra"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-algebra"].incorrect;

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
    localStorage.setItem(`ged-algebra-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-algebra-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-algebra-lessonScore-${lessonId}`) || "Not completed yet";
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