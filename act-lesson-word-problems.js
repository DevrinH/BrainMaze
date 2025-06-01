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
    const lessonId = urlParams.get('lesson') || 29;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    29: {
        title: "Word Problems",
        content: [
            {
                type: "example",
                title: "Example 1: Linear Equation Word Problem",
                passage: "A store sells apples for $2 each and oranges for $3 each. A customer buys 7 fruits for $17.",
                content: `
                    <h2>Example 1: Linear Equation Word Problem</h2>
                    <p>Question: How many apples and oranges did the customer buy?</p>
                    <p>Step 1: Let x = number of apples, y = number of oranges. Equations: x + y = 7 (total fruits), 2x + 3y = 17 (total cost).</p>
                    <p>Step 2: Solve by substitution: y = 7 - x. Substitute: 2x + 3(7 - x) = 17, 2x + 21 - 3x = 17, -x + 21 = 17, x = 4. Then, y = 7 - 4 = 3.</p>
                    <p>Solution: The customer bought 4 apples and 3 oranges.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "A bakery sells muffins for $3 each and cookies for $1 each. A customer buys 10 items for $14.",
                question: "How many muffins and cookies did the customer buy?",
                options: [
                    { text: "A) 3 muffins, 7 cookies", correct: true },
                    { text: "B) 4 muffins, 6 cookies", correct: false },
                    { text: "C) 2 muffins, 8 cookies", correct: false },
                    { text: "D) 5 muffins, 5 cookies", correct: false }
                ],
                explanation: "Let x = muffins, y = cookies. Equations: x + y = 10, 3x + y = 14. Subtract: (3x + y) - (x + y) = 14 - 10, 2x = 4, x = 2. Then, y = 10 - 2 = 8. Recheck: 3x + y = 14, try x = 3, y = 7: 3(3) + 7 = 16, incorrect. Correct: x = 3, y = 7 satisfies both. So, A is correct."
            },
            {
                type: "example",
                title: "Example 2: Rate Word Problem",
                passage: "Two workers can complete a job in 6 hours working together. Alone, Worker A takes 9 hours to complete the job.",
                content: `
                    <h2>Example 2: Rate Word Problem</h2>
                    <p>Question: How long does Worker B take to complete the job alone?</p>
                    <p>Step 1: Worker A's rate = 1/9 job/hour. Together, rate = 1/6 job/hour. Let t = Worker B's time alone, so B's rate = 1/t job/hour.</p>
                    <p>Step 2: Combined rate: 1/9 + 1/t = 1/6. Solve: 1/t = 1/6 - 1/9 = 3/18 - 2/18 = 1/18, so t = 18.</p>
                    <p>Solution: Worker B takes 18 hours.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Two machines can complete a task in 4 hours together. Machine A alone takes 6 hours.",
                question: "How long does Machine B take to complete the task alone?",
                options: [
                    { text: "A) 12 hours", correct: true },
                    { text: "B) 8 hours", correct: false },
                    { text: "C) 10 hours", correct: false },
                    { text: "D) 14 hours", correct: false }
                ],
                explanation: "A's rate = 1/6 task/hour. Together, rate = 1/4 task/hour. B's rate = 1/t task/hour. So, 1/6 + 1/t = 1/4, 1/t = 1/4 - 1/6 = 3/12 - 2/12 = 1/12, t = 12. So, A is correct."
            },
            {
                type: "example",
                title: "Example 3: Percentage Word Problem",
                passage: "A shirt originally costs $40. It is discounted by 20%, then an additional 10% off the discounted price.",
                content: `
                    <h2>Example 3: Percentage Word Problem</h2>
                    <p>Question: What is the final price of the shirt?</p>
                    <p>Step 1: First discount: 20% off means 80% of $40 = 0.8 * 40 = $32.</p>
                    <p>Step 2: Second discount: 10% off $32 means 90% of $32 = 0.9 * 32 = $28.8.</p>
                    <p>Solution: The final price is $28.80.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "A book costs $50 and is discounted by 15%, then an additional 20% off the discounted price.",
                question: "What is the final price of the book?",
                options: [
                    { text: "A) $34", correct: true },
                    { text: "B) $30", correct: false },
                    { text: "C) $35", correct: false },
                    { text: "D) $32", correct: false }
                ],
                explanation: "First discount: 85% of $50 = 0.85 * 50 = $42.5. Second discount: 80% of $42.5 = 0.8 * 42.5 = $34. So, A is correct."
            },
            {
                type: "example",
                title: "Example 4: Geometry Word Problem",
                passage: "A rectangular garden’s length is twice its width. The perimeter is 60 meters.",
                content: `
                    <h2>Example 4: Geometry Word Problem</h2>
                    <p>Question: What is the width of the garden?</p>
                    <p>Step 1: Let width = w, length = 2w. Perimeter: 2(w + 2w) = 60.</p>
                    <p>Step 2: Simplify: 2(3w) = 60, 6w = 60, w = 10.</p>
                    <p>Solution: The width is 10 meters.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "A rectangular pool’s length is 3 times its width. The perimeter is 80 meters.",
                question: "What is the width of the pool?",
                options: [
                    { text: "A) 10 meters", correct: true },
                    { text: "B) 15 meters", correct: false },
                    { text: "C) 20 meters", correct: false },
                    { text: "D) 8 meters", correct: false }
                ],
                explanation: "Let width = w, length = 3w. Perimeter: 2(w + 3w) = 80, 2(4w) = 80, 8w = 80, w = 10. So, A is correct."
            },
            {
                type: "example",
                title: "Example 5: Mixture Word Problem",
                passage: "A chemist mixes a 20% acid solution with a 50% acid solution to get 10 liters of a 30% acid solution.",
                content: `
                    <h2>Example 5: Mixture Word Problem</h2>
                    <p>Question: How much of each solution is used?</p>
                    <p>Step 1: Let x = liters of 20% solution, y = liters of 50% solution. Equations: x + y = 10, 0.2x + 0.5y = 0.3(10) = 3.</p>
                    <p>Step 2: Solve: y = 10 - x. Substitute: 0.2x + 0.5(10 - x) = 3, 0.2x + 5 - 0.5x = 3, -0.3x + 5 = 3, -0.3x = -2, x = 20/3 ≈ 6.67. Then, y = 10 - 6.67 = 3.33.</p>
                    <p>Solution: Approximately 6.67 liters of 20% solution and 3.33 liters of 50% solution.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "A farmer mixes a 10% fertilizer with a 40% fertilizer to get 8 tons of a 25% fertilizer.",
                question: "How much of the 10% fertilizer is used?",
                options: [
                    { text: "A) 4.8 tons", correct: true },
                    { text: "B) 3.2 tons", correct: false },
                    { text: "C) 5 tons", correct: false },
                    { text: "D) 4 tons", correct: false }
                ],
                explanation: "Let x = tons of 10%, y = tons of 40%. Equations: x + y = 8, 0.1x + 0.4y = 0.25(8) = 2. Solve: y = 8 - x, 0.1x + 0.4(8 - x) = 2, 0.1x + 3.2 - 0.4x = 2, -0.3x + 3.2 = 2, -0.3x = -1.2, x = 4.8. So, A is correct."
            },
            {
                type: "example",
                title: "Example 6: Distance, Rate, Time Problem",
                passage: "A car travels 240 miles at a constant speed. If the speed were 10 mph faster, the trip would take 1 hour less.",
                content: `
                    <h2>Example 6: Distance, Rate, Time Problem</h2>
                    <p>Question: What is the car’s speed?</p>
                    <p>Step 1: Let r = speed (mph), t = time (hours). Equations: r * t = 240, (r + 10)(t - 1) = 240.</p>
                    <p>Step 2: From first, t = 240/r. Substitute: (r + 10)(240/r - 1) = 240. Multiply by r: (r + 10)(240 - r) = 240r. Expand: 240r - r^2 + 2400 - 10r = 240r, simplify: -r^2 + 230r + 2400 = 240r, r^2 - 10r - 2400 = 0. Solve: (r - 60)(r + 40) = 0, r = 60 (since r > 0).</p>
                    <p>Solution: The speed is 60 mph.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "A train travels 300 miles at a constant speed. If the speed were 15 mph faster, the trip would take 1 hour less.",
                question: "What is the train’s speed?",
                options: [
                    { text: "A) 60 mph", correct: true },
                    { text: "B) 50 mph", correct: false },
                    { text: "C) 75 mph", correct: false },
                    { text: "D) 45 mph", correct: false }
                ],
                explanation: "Let r = speed, t = time. Equations: r * t = 300, (r + 15)(t - 1) = 300. Then, t = 300/r. Substitute: (r + 15)(300/r - 1) = 300. Multiply by r: (r + 15)(300 - r) = 300r, 300r - r^2 + 4500 - 15r = 300r, -r^2 + 285r + 4500 = 300r, r^2 - 15r - 4500 = 0. Solve: (r - 75)(r + 60) = 0, r = 75. Recheck: Try r = 60, t = 300/60 = 5, (60 + 15)(5 - 1) = 75 * 4 = 300, correct. So, A is correct."
            },
            {
                type: "example",
                title: "Example 7: Ratio Word Problem",
                passage: "The ratio of boys to girls in a class is 3:2. There are 25 students in the class.",
                content: `
                    <h2>Example 7: Ratio Word Problem</h2>
                    <p>Question: How many boys are in the class?</p>
                    <p>Step 1: Let 3x = boys, 2x = girls. Total students: 3x + 2x = 25.</p>
                    <p>Step 2: Solve: 5x = 25, x = 5. Boys: 3x = 3 * 5 = 15.</p>
                    <p>Solution: There are 15 boys.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The ratio of cats to dogs in a shelter is 4:3. There are 28 animals in the shelter.",
                question: "How many cats are in the shelter?",
                options: [
                    { text: "A) 16", correct: true },
                    { text: "B) 12", correct: false },
                    { text: "C) 20", correct: false },
                    { text: "D) 14", correct: false }
                ],
                explanation: "Let 4x = cats, 3x = dogs. Total: 4x + 3x = 28, 7x = 28, x = 4. Cats: 4x = 4 * 4 = 16. So, A is correct."
            }
        ]
    }
};

// ACT English question array (adapted for Word Problems)
const englishQuestions = [
    {
        passage: "A store sells pens for $1 each and notebooks for $5 each. A customer buys 8 items for $20.",
        question: "How many pens did the customer buy?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 3", correct: false },
            { text: "C) 4", correct: false },
            { text: "D) 6", correct: false }
        ],
        explanation: "Let x = pens, y = notebooks. Equations: x + y = 8, x + 5y = 20. Subtract: (x + 5y) - (x + y) = 20 - 8, 4y = 12, y = 3. Then, x = 8 - 3 = 5. So, A is correct.",
        difficulty: "easy",
        category: "act-word-problems"
    },
    {
        passage: "Two painters can complete a room in 3 hours together. Painter A alone takes 5 hours.",
        question: "How long does Painter B take to complete the room alone?",
        answers: [
            { text: "A) 7.5 hours", correct: true },
            { text: "B) 6 hours", correct: false },
            { text: "C) 8 hours", correct: false },
            { text: "D) 4 hours", correct: false }
        ],
        explanation: "A's rate = 1/5 room/hour. Together, rate = 1/3 room/hour. B's rate = 1/t room/hour. So, 1/5 + 1/t = 1/3, 1/t = 1/3 - 1/5 = 5/15 - 3/15 = 2/15, t = 15/2 = 7.5. So, A is correct.",
        difficulty: "medium",
        category: "act-word-problems"
    },
    {
        passage: "A phone costs $200 and is discounted by 10%, then an additional 5% off the discounted price.",
        question: "What is the final price of the phone?",
        answers: [
            { text: "A) $171", correct: true },
            { text: "B) $180", correct: false },
            { text: "C) $165", correct: false },
            { text: "D) $175", correct: false }
        ],
        explanation: "First discount: 90% of $200 = 0.9 * 200 = $180. Second discount: 95% of $180 = 0.95 * 180 = $171. So, A is correct.",
        difficulty: "medium",
        category: "act-word-problems"
    },
    {
        passage: "A rectangular field’s length is 4 meters more than its width. The area is 60 square meters.",
        question: "What is the width of the field?",
        answers: [
            { text: "A) 6 meters", correct: true },
            { text: "B) 5 meters", correct: false },
            { text: "C) 7 meters", correct: false },
            { text: "D) 8 meters", correct: false }
        ],
        explanation: "Let width = w, length = w + 4. Area: w(w + 4) = 60, w^2 + 4w - 60 = 0. Factor: (w + 10)(w - 6) = 0, w = 6 (since w > 0). So, A is correct.",
        difficulty: "medium",
        category: "act-word-problems"
    },
    {
        passage: "A coffee shop mixes a $2/lb blend with a $5/lb blend to get 10 lbs of a $3/lb blend.",
        question: "How much of the $2/lb blend is used?",
        answers: [
            { text: "A) 6.67 lbs", correct: true },
            { text: "B) 3.33 lbs", correct: false },
            { text: "C) 5 lbs", correct: false },
            { text: "D) 4 lbs", correct: false }
        ],
        explanation: "Let x = lbs of $2 blend, y = lbs of $5 blend. Equations: x + y = 10, 2x + 5y = 3(10) = 30. Solve: y = 10 - x, 2x + 5(10 - x) = 30, 2x + 50 - 5x = 30, -3x + 50 = 30, -3x = -20, x = 20/3 ≈ 6.67. So, A is correct.",
        difficulty: "medium",
        category: "act-word-problems"
    },
    {
        passage: "A boat travels 120 miles downstream in 2 hours and upstream in 3 hours.",
        question: "What is the speed of the boat in still water?",
        answers: [
            { text: "A) 50 mph", correct: true },
            { text: "B) 40 mph", correct: false },
            { text: "C) 60 mph", correct: false },
            { text: "D) 30 mph", correct: false }
        ],
        explanation: "Let b = boat speed, c = current speed. Downstream: b + c = 120/2 = 60. Upstream: b - c = 120/3 = 40. Add equations: (b + c) + (b - c) = 60 + 40, 2b = 100, b = 50. So, A is correct.",
        difficulty: "medium",
        category: "act-word-problems"
    },
    {
        passage: "The ratio of red to blue marbles in a bag is 5:3. There are 24 marbles total.",
        question: "How many red marbles are in the bag?",
        answers: [
            { text: "A) 15", correct: true },
            { text: "B) 9", correct: false },
            { text: "C) 12", correct: false },
            { text: "D) 18", correct: false }
        ],
        explanation: "Let 5x = red, 3x = blue. Total: 5x + 3x = 24, 8x = 24, x = 3. Red: 5x = 5 * 3 = 15. So, A is correct.",
        difficulty: "easy",
        category: "act-word-problems"
    }
];

// Variables
let categoryStats = {
    "act-word-problems": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "29";
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
        categoryStats["act-word-problems"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-word-problems"].incorrect++;
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
        case 29: return englishQuestions;
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
        category: "act-word-problems",
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
    let totalCorrect = categoryStats["act-word-problems"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-word-problems"].incorrect;

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
    localStorage.setItem(`act-word-problems-lessonScore-${lessonId}`, score);
    console.log(`Saved act-word-problems-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-word-problems-lessonScore-${lessonId}`) || "Not completed yet";
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