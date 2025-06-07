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
        title: "Geometry",
        content: [
            {
                type: "example",
                title: "Example 1: Area of Polygons",
                content: `
                    <h2>Example 1: Area of Polygons</h2>
                    <p>Passage: The area of a rectangle is calculated as length × width. A rectangular garden measures 10 ft by 6 ft.</p>
                    <p>Question: What is the area of the garden?</p>
                    <p>Step 1: Identify formula: Area = length × width.</p>
                    <p>Step 2: Substitute: Area = 10 ft × 6 ft = 60 ft².</p>
                    <p>Solution: The area of the garden is 60 square feet.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a farmer in Millville planned to plant crops in a rectangular field measuring 8 meters by 5 meters. To determine the planting area, the farmer used the formula for the area of a rectangle, which is length multiplied by width, ensuring efficient use of the land.",
                question: "What is the area of the field?",
                options: [
                    { text: "A) 40 square meters", correct: true },
                    { text: "B) 26 square meters", correct: false },
                    { text: "C) 13 square meters", correct: false },
                    { text: "D) 80 square meters", correct: false }
                ],
                explanation: "Area = length × width = 8 m × 5 m = 40 m², making A correct."
            },
            {
                type: "example",
                title: "Example 2: Perimeter and Circumference",
                content: `
                    <h2>Example 2: Perimeter and Circumference</h2>
                    <p>Passage: The circumference of a circle is calculated as C = πd, where d is the diameter. A circular fountain has a diameter of 4 ft.</p>
                    <p>Question: What is the circumference of the fountain? (Use π ≈ 3.14)</p>
                    <p>Step 1: Identify formula: C = πd.</p>
                    <p>Step 2: Substitute: C = 3.14 × 4 ft ≈ 12.56 ft.</p>
                    <p>Solution: The circumference is approximately 12.56 feet.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a park designer in Greenvale planned a circular walking path around a pond with a diameter of 10 meters. The circumference of a circle is found using C = πd, where d is the diameter, to determine the path’s length for construction materials.",
                question: "What is the circumference of the path? (Use π ≈ 3.14)",
                options: [
                    { text: "A) 31.4 meters", correct: true },
                    { text: "B) 15.7 meters", correct: false },
                    { text: "C) 62.8 meters", correct: false },
                    { text: "D) 10 meters", correct: false }
                ],
                explanation: "C = πd = 3.14 × 10 m = 31.4 m, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Volume of Solids",
                content: `
                    <h2>Example 3: Volume of Solids</h2>
                    <p>Passage: The volume of a rectangular prism is V = length × width × height. A storage box measures 3 ft by 2 ft by 4 ft.</p>
                    <p>Question: What is the volume of the box?</p>
                    <p>Step 1: Identify formula: V = length × width × height.</p>
                    <p>Step 2: Substitute: V = 3 ft × 2 ft × 4 ft = 24 ft³.</p>
                    <p>Solution: The volume is 24 cubic feet.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a warehouse manager in Clearwater needed to calculate the storage capacity of a rectangular container measuring 5 meters long, 3 meters wide, and 2 meters high. The volume of a rectangular prism is calculated as length × width × height to determine storage space.",
                question: "What is the volume of the container?",
                options: [
                    { text: "A) 15 cubic meters", correct: false },
                    { text: "B) 30 cubic meters", correct: true },
                    { text: "C) 60 cubic meters", correct: false },
                    { text: "D) 10 cubic meters", correct: false }
                ],
                explanation: "V = length × width × height = 5 m × 3 m × 2 m = 30 m³, making B correct."
            },
            {
                type: "example",
                title: "Example 4: Pythagorean Theorem",
                content: `
                    <h2>Example 4: Pythagorean Theorem</h2>
                    <p>Passage: The Pythagorean theorem, a² + b² = c², applies to right triangles, where c is the hypotenuse. A triangle has legs of 3 ft and 4 ft.</p>
                    <p>Question: What is the length of the hypotenuse?</p>
                    <p>Step 1: Identify formula: a² + b² = c².</p>
                    <p>Step 2: Substitute: 3² + 4² = c²; 9 + 16 = 25; c = √25 = 5 ft.</p>
                    <p>Solution: The hypotenuse is 5 feet.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a carpenter in Millville built a ramp forming a right triangle with legs of 6 meters and 8 meters. The Pythagorean theorem, a² + b² = c², is used to find the hypotenuse, the ramp’s diagonal length, ensuring structural stability.",
                question: "What is the length of the ramp’s hypotenuse?",
                options: [
                    { text: "A) 10 meters", correct: true },
                    { text: "B) 14 meters", correct: false },
                    { text: "C) 48 meters", correct: false },
                    { text: "D) 7 meters", correct: false }
                ],
                explanation: "a² + b² = c²; 6² + 8² = 36 + 64 = 100; c = √100 = 10 m, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Angles and Parallel Lines",
                content: `
                    <h2>Example 5: Angles and Parallel Lines</h2>
                    <p>Passage: When parallel lines are cut by a transversal, alternate interior angles are equal. If one angle is 70°, its alternate interior angle is also 70°.</p>
                    <p>Question: What is the measure of the alternate interior angle to a 70° angle?</p>
                    <p>Step 1: Identify rule: Alternate interior angles are equal.</p>
                    <p>Step 2: Apply: If one angle is 70°, the alternate is 70°.</p>
                    <p>Solution: The alternate interior angle is 70°.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, a surveyor in Greenvale mapped a road layout where parallel lines were intersected by a transversal. One corresponding angle measured 120°. Corresponding angles formed by parallel lines and a transversal are equal, aiding in accurate mapping.",
                question: "What is the measure of the corresponding angle to a 120° angle?",
                options: [
                    { text: "A) 60°", correct: false },
                    { text: "B) 180°", correct: false },
                    { text: "C) 120°", correct: true },
                    { text: "D) 90°", correct: false }
                ],
                explanation: "Corresponding angles are equal, so the angle is 120°, making C correct."
            },
            {
                type: "example",
                title: "Example 6: Coordinate Geometry",
                content: `
                    <h2>Example 6: Coordinate Geometry</h2>
                    <p>Passage: The distance between points (x₁, y₁) and (x₂, y₂) is d = √[(x₂ - x₁)² + (y₂ - y₁)²]. Points are at (1, 2) and (4, 6).</p>
                    <p>Question: What is the distance between the points?</p>
                    <p>Step 1: Identify formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²].</p>
                    <p>Step 2: Substitute: d = √[(4 - 1)² + (6 - 2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5.</p>
                    <p>Solution: The distance is 5 units.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a city planner in Clearwater plotted two points on a grid for a new park: (2, 3) and (6, 6). The distance formula, d = √[(x₂ - x₁)² + (y₂ - y₁)²], helps calculate the straight-line distance to plan pathways efficiently.",
                question: "What is the distance between the points?",
                options: [
                    { text: "A) 5 units", correct: true },
                    { text: "B) 7 units", correct: false },
                    { text: "C) 3 units", correct: false },
                    { text: "D) 9 units", correct: false }
                ],
                explanation: "d = √[(6 - 2)² + (6 - 3)²] = √[4² + 3²] = √[16 + 9] = √25 = 5 units, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Similarity and Congruence",
                content: `
                    <h2>Example 7: Similarity and Congruence</h2>
                    <p>Passage: Similar triangles have equal angles and proportional sides. If triangle ABC has sides 3, 4, 5 cm and triangle DEF has sides 6, 8, 10 cm, they are similar.</p>
                    <p>Question: Why are triangles ABC and DEF similar?</p>
                    <p>Step 1: Check proportions: 3/6 = 4/8 = 5/10 = 1/2.</p>
                    <p>Step 2: Confirm: Proportional sides and equal angles indicate similarity.</p>
                    <p>Solution: Triangles ABC and DEF are similar because their sides are proportional.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, a designer in Millville compared two triangular logos. Triangle XYZ has sides 9 cm, 12 cm, and 15 cm, while triangle PQR has sides 3 cm, 4 cm, and 5 cm. Similar triangles have proportional sides and equal angles, ensuring consistent design scaling.",
                question: "Why are triangles XYZ and PQR similar?",
                options: [
                    { text: "A) Equal side lengths", correct: false },
                    { text: "B) Different angles", correct: false },
                    { text: "C) Proportional sides", correct: true },
                    { text: "D) Identical areas", correct: false }
                ],
                explanation: "Proportions: 9/3 = 12/4 = 15/5 = 3; proportional sides indicate similarity, making C correct."
            }
        ]
    }
};

// Geometry question array
const geometryQuestions = [
    {
        passage: "In 2023, a homeowner in Millville wanted to tile a rectangular patio measuring 12 feet by 8 feet. To calculate the number of tiles needed, the area of a rectangle is found by multiplying its length by its width, providing the total surface area to cover.",
        question: "What is the area of the patio?",
        answers: [
            { text: "A) 96 square feet", correct: true },
            { text: "B) 40 square feet", correct: false },
            { text: "C) 20 square feet", correct: false },
            { text: "D) 192 square feet", correct: false }
        ],
        explanation: "Area = length × width = 12 ft × 8 ft = 96 ft², making A correct.",
        difficulty: "easy",
        category: "ged-geometry"
    },
    {
        passage: "In 2024, a landscaper in Greenvale designed a circular flower bed with a diameter of 6 meters. To determine the length of edging needed, the circumference of a circle is calculated using the formula C = πd, where d is the diameter, ensuring precise material estimates.",
        question: "What is the circumference of the flower bed? (Use π ≈ 3.14)",
        answers: [
            { text: "A) 9.42 meters", correct: false },
            { text: "B) 18.84 meters", correct: true },
            { text: "C) 28.26 meters", correct: false },
            { text: "D) 6 meters", correct: false }
        ],
        explanation: "C = πd = 3.14 × 6 m = 18.84 m, making B correct.",
        difficulty: "medium",
        category: "ged-geometry"
    },
    {
        passage: "In 2023, a storage company in Clearwater offered a rectangular prism-shaped unit measuring 4 meters long, 3 meters wide, and 2 meters high. The volume of a rectangular prism, calculated as length × width × height, determines the storage capacity for clients.",
        question: "What is the volume of the storage unit?",
        answers: [
            { text: "A) 24 cubic meters", correct: true },
            { text: "B) 12 cubic meters", correct: false },
            { text: "C) 48 cubic meters", correct: false },
            { text: "D) 9 cubic meters", correct: false }
        ],
        explanation: "V = length × width × height = 4 m × 3 m × 2 m = 24 m³, making A correct.",
        difficulty: "medium",
        category: "ged-geometry"
    },
    {
        passage: "In 2024, an architect in Millville designed a right-angled triangular support with legs measuring 5 feet and 12 feet. The Pythagorean theorem, a² + b² = c², is used to calculate the hypotenuse, ensuring the support’s diagonal length meets safety standards.",
        question: "What is the length of the hypotenuse?",
        answers: [
            { text: "A) 7 feet", correct: false },
            { text: "B) 13 feet", correct: true },
            { text: "C) 17 feet", correct: false },
            { text: "D) 10 feet", correct: false }
        ],
        explanation: "a² + b² = c²; 5² + 12² = 25 + 144 = 169; c = √169 = 13 ft, making B correct.",
        difficulty: "medium",
        category: "ged-geometry"
    },
    {
        passage: "In 2023, a city planner in Greenvale analyzed a street grid where parallel lines were intersected by a transversal, forming a vertical angle of 85°. Vertical angles, formed by intersecting lines, are equal, aiding in designing consistent road alignments.",
        question: "What is the measure of the vertical angle to an 85° angle?",
        answers: [
            { text: "A) 95°", correct: false },
            { text: "B) 180°", correct: false },
            { text: "C) 85°", correct: true },
            { text: "D) 90°", correct: false }
        ],
        explanation: "Vertical angles are equal, so the angle is 85°, making C correct.",
        difficulty: "medium",
        category: "ged-geometry"
    },
    {
        passage: "In 2024, a surveyor in Clearwater marked two points for a fence line at (3, 1) and (7, 4) on a coordinate grid. The distance formula, d = √[(x₂ - x₁)² + (y₂ - y₁)²], calculates the straight-line distance to ensure accurate fencing measurements.",
        question: "What is the distance between the points?",
        answers: [
            { text: "A) 3 units", correct: false },
            { text: "B) 5 units", correct: true },
            { text: "C) 7 units", correct: false },
            { text: "D) 4 units", correct: false }
        ],
        explanation: "d = √[(7 - 3)² + (4 - 1)²] = √[4² + 3²] = √[16 + 9] = √25 = 5 units, making B correct.",
        difficulty: "medium",
        category: "ged-geometry"
    },
    {
        passage: "In 2023, an artist in Millville created two triangular designs. Triangle LMN has sides 4 cm, 5 cm, and 6 cm, while triangle RST has sides 8 cm, 10 cm, and 12 cm. Similar triangles have proportional sides and equal angles, ensuring proportional scaling in artwork.",
        question: "Why are triangles LMN and RST similar?",
        answers: [
            { text: "A) Equal side lengths", correct: false },
            { text: "B) Different angles", correct: false },
            { text: "C) Identical areas", correct: false },
            { text: "D) Proportional sides", correct: true }
        ],
        explanation: "Proportions: 4/8 = 5/10 = 6/12 = 1/2; proportional sides indicate similarity, making D correct.",
        difficulty: "medium",
        category: "ged-geometry"
    }
];

// Variables
let categoryStats = {
    "ged-geometry": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-geometry"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-geometry"].incorrect++;
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
        case 1: return geometryQuestions;
        default: return geometryQuestions;
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
    let totalCorrect = categoryStats["ged-geometry"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-geometry"].incorrect;

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
    localStorage.setItem(`ged-geometry-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-geometry-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-geometry-lessonScore-${lessonId}`) || "Not completed yet";
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