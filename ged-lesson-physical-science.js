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
        title: "Physical Science",
        content: [
            {
                type: "example",
                title: "Example 1: Motion and Speed",
                content: `
                    <h2>Example 1: Motion and Speed</h2>
                    <p>Passage: Speed is the distance an object travels per unit of time. A car traveling 120 miles in 2 hours has a speed calculated as distance divided by time.</p>
                    <p>Question: What is the car’s speed?</p>
                    <p>Step 1: Identify formula: Speed = Distance ÷ Time.</p>
                    <p>Step 2: Calculate: 120 miles ÷ 2 hours = 60 miles per hour.</p>
                    <p>Solution: The car’s speed is 60 mph.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: A train travels 300 kilometers in 5 hours. Speed is distance divided by time. What is the train’s speed?",
                options: [
                    { text: "A) 60 km/h", correct: true },
                    { text: "B) 50 km/h", correct: false },
                    { text: "C) 75 km/h", correct: false },
                    { text: "D) 45 km/h", correct: false }
                ],
                explanation: "Speed = 300 km ÷ 5 hours = 60 km/h, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Energy Conservation",
                content: `
                    <h2>Example 2: Energy Conservation</h2>
                    <p>Passage: Energy cannot be created or destroyed, only transferred or transformed. In a pendulum, potential energy at the highest point converts to kinetic energy at the lowest point.</p>
                    <p>Question: What happens to the pendulum’s potential energy as it swings down?</p>
                    <p>Step 1: Identify energy types: Potential energy (high point), kinetic energy (low point).</p>
                    <p>Step 2: Apply conservation: Potential energy transforms into kinetic energy.</p>
                    <p>Solution: The pendulum’s potential energy converts to kinetic energy as it swings down.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: A roller coaster at the top of a hill has high potential energy, which transforms into kinetic energy as it descends. What happens to the potential energy during descent?",
                options: [
                    { text: "A) Converts to kinetic energy", correct: true },
                    { text: "B) Increases", correct: false },
                    { text: "C) Remains constant", correct: false },
                    { text: "D) Is destroyed", correct: false }
                ],
                explanation: "The passage states potential energy transforms into kinetic energy, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Properties of Matter",
                content: `
                    <h2>Example 3: Properties of Matter</h2>
                    <p>Passage: Matter exists in states: solid, liquid, gas. A solid has a fixed shape and volume due to tightly packed particles, unlike a liquid, which takes the shape of its container.</p>
                    <p>Question: Why does a solid maintain its shape?</p>
                    <p>Step 1: Identify key property: Solids have fixed shape and volume.</p>
                    <p>Step 2: Explain: Tightly packed particles resist movement.</p>
                    <p>Solution: A solid maintains its shape due to tightly packed particles.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: Liquids have a fixed volume but take the shape of their container because their particles are less tightly packed than in solids. Why do liquids conform to container shapes?",
                options: [
                    { text: "A) Loosely packed particles", correct: true },
                    { text: "B) Fixed particle arrangement", correct: false },
                    { text: "C) High particle density", correct: false },
                    { text: "D) Rigid particle bonds", correct: false }
                ],
                explanation: "The passage attributes liquids’ shape adaptability to less tightly packed particles, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Chemical Reactions",
                content: `
                    <h2>Example 4: Chemical Reactions</h2>
                    <p>Passage: In a chemical reaction, reactants form products. For example, burning methane (CH₄) with oxygen (O₂) produces carbon dioxide (CO₂) and water (H₂O).</p>
                    <p>Question: What are the products of burning methane?</p>
                    <p>Step 1: Identify reaction: Methane + Oxygen → Products.</p>
                    <p>Step 2: List products: Carbon dioxide (CO₂) and water (H₂O).</p>
                    <p>Solution: The products are carbon dioxide and water.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: The reaction of hydrogen (H₂) with oxygen (O₂) forms water (H₂O). What is the product of this reaction?",
                options: [
                    { text: "A) Water", correct: true },
                    { text: "B) Carbon dioxide", correct: false },
                    { text: "C) Nitrogen", correct: false },
                    { text: "D) Oxygen", correct: false }
                ],
                explanation: "The passage specifies water (H₂O) as the product, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Newton’s Laws",
                content: `
                    <h2>Example 5: Newton’s Laws</h2>
                    <p>Passage: Newton’s First Law states that an object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.</p>
                    <p>Question: Why does a book on a table remain at rest?</p>
                    <p>Step 1: Apply Newton’s First Law: Objects at rest stay at rest without external force.</p>
                    <p>Step 2: Analyze: No external force acts on the book.</p>
                    <p>Solution: The book remains at rest because no external force acts on it.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: Newton’s Second Law states that force equals mass times acceleration (F = ma). If a 10 kg object accelerates at 2 m/s², what is the force?",
                options: [
                    { text: "A) 20 N", correct: true },
                    { text: "B) 12 N", correct: false },
                    { text: "C) 5 N", correct: false },
                    { text: "D) 30 N", correct: false }
                ],
                explanation: "Using F = ma: F = 10 kg × 2 m/s² = 20 N, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Waves",
                content: `
                    <h2>Example 6: Waves</h2>
                    <p>Passage: Waves transfer energy without transferring matter. Sound waves are mechanical, requiring a medium like air, while light waves are electromagnetic and can travel through a vacuum.</p>
                    <p>Question: Why can light waves travel through a vacuum?</p>
                    <p>Step 1: Identify wave type: Light waves are electromagnetic.</p>
                    <p>Step 2: Apply property: Electromagnetic waves don’t need a medium.</p>
                    <p>Solution: Light waves travel through a vacuum because they are electromagnetic.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: Sound waves require a medium, such as air or water, to travel. Why can’t sound waves travel through a vacuum?",
                options: [
                    { text: "A) They are mechanical waves", correct: true },
                    { text: "B) They are electromagnetic waves", correct: false },
                    { text: "C) They carry matter", correct: false },
                    { text: "D) They have low frequency", correct: false }
                ],
                explanation: "The passage states sound waves are mechanical and require a medium, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Conservation of Mass",
                content: `
                    <h2>Example 7: Conservation of Mass</h2>
                    <p>Passage: The law of conservation of mass states that mass is neither created nor destroyed in a chemical reaction. In burning wood, the mass of reactants (wood and oxygen) equals the mass of products (ash, gases).</p>
                    <p>Question: Why does the mass remain constant in burning wood?</p>
                    <p>Step 1: Apply law: Mass is conserved in chemical reactions.</p>
                    <p>Step 2: Explain: Reactants’ mass equals products’ mass.</p>
                    <p>Solution: The mass remains constant because mass is conserved in the reaction.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: In a reaction, 50 g of reactants produce 50 g of products, per the law of conservation of mass. Why is the mass of products equal to the mass of reactants?",
                options: [
                    { text: "A) Mass is conserved", correct: true },
                    { text: "B) Mass is created", correct: false },
                    { text: "C) Mass is destroyed", correct: false },
                    { text: "D) Mass is transformed", correct: false }
                ],
                explanation: "The passage states the law of conservation of mass ensures mass equality, making A correct."
            }
        ]
    }
};

// Physical science question array
const physicalScienceQuestions = [
    {
        passage: "Passage: Work is done when a force moves an object over a distance (Work = Force × Distance).",
        question: "If a 5 N force moves an object 3 meters, what is the work done?",
        answers: [
            { text: "A) 15 J", correct: true },
            { text: "B) 10 J", correct: false },
            { text: "C) 20 J", correct: false },
            { text: "D) 8 J", correct: false }
        ],
        explanation: "Using Work = Force × Distance: Work = 5 N × 3 m = 15 J, making A correct.",
        difficulty: "easy",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: Newton’s Third Law states that for every action, there is an equal and opposite reaction. When a rocket launches, it expels gas downward, and the rocket moves upward.",
        question: "What causes the rocket to move upward?",
        answers: [
            { text: "A) The equal and opposite reaction to gas expulsion", correct: true },
            { text: "B) The rocket’s weight", correct: false },
            { text: "C) The increase in air pressure", correct: false },
            { text: "D) The decrease in fuel mass", correct: false }
        ],
        explanation: "Newton’s Third Law indicates the rocket moves upward due to the equal and opposite reaction to gas expelled downward. Weight, air pressure, and fuel mass are not the primary causes, making A correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: In chemical reactions, a catalyst increases the reaction rate without being consumed. For example, enzymes catalyze reactions in living organisms.",
        question: "What is the role of a catalyst in a chemical reaction?",
        answers: [
            { text: "A) It is consumed to produce products", correct: false },
            { text: "B) It speeds up the reaction without being consumed", correct: true },
            { text: "C) It changes the reaction’s products", correct: false },
            { text: "D) It slows down the reaction", correct: false }
        ],
        explanation: "The passage states a catalyst increases the reaction rate without being consumed, as with enzymes. It doesn’t get consumed, alter products, or slow reactions, making B correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: Kinetic energy is the energy of motion, calculated as KE = ½ mv², where m is mass and v is velocity.",
        question: "If a 2 kg object moves at 3 m/s, what is its kinetic energy?",
        answers: [
            { text: "A) 6 J", correct: false },
            { text: "B) 9 J", correct: true },
            { text: "C) 12 J", correct: false },
            { text: "D) 18 J", correct: false }
        ],
        explanation: "Using KE = ½ mv²: KE = ½ × 2 kg × (3 m/s)² = ½ × 2 × 9 = 9 J, making B correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: Gases have no fixed shape or volume, as their particles move freely and are widely spaced compared to solids and liquids.",
        question: "Why do gases lack a fixed shape?",
        answers: [
            { text: "A) Their particles are tightly packed", correct: false },
            { text: "B) Their particles have fixed positions", correct: false },
            { text: "C) Their particles move freely", correct: true },
            { text: "D) Their particles are dense", correct: false }
        ],
        explanation: "The passage states gases lack fixed shape because their particles move freely. They are not tightly packed, fixed, or dense, making C correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: According to the conservation of mass, the mass of reactants equals the mass of products in a chemical reaction. In a closed system, no mass is lost or gained.",
        question: "If 20 g of reactants are used in a closed system reaction, what is the mass of the products?",
        answers: [
            { text: "A) 10 g", correct: false },
            { text: "B) 15 g", correct: false },
            { text: "C) 25 g", correct: false },
            { text: "D) 20 g", correct: true }
        ],
        explanation: "The passage states that in a closed system, the mass of products equals the reactants’ mass due to conservation of mass. Thus, 20 g of reactants produce 20 g of products, making D correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: Acceleration is the rate of change of velocity, calculated as a = Δv ÷ t, where Δv is the change in velocity and t is time.",
        question: "If a car’s velocity changes from 10 m/s to 30 m/s in 5 seconds, what is its acceleration?",
        answers: [
            { text: "A) 2 m/s²", correct: false },
            { text: "B) 3 m/s²", correct: false },
            { text: "C) 4 m/s²", correct: true },
            { text: "D) 6 m/s²", correct: false }
        ],
        explanation: "Using a = Δv ÷ t: Δv = 30 m/s - 10 m/s = 20 m/s; a = 20 m/s ÷ 5 s = 4 m/s², making C correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: Newton’s First Law states that an object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by an external force.",
        question: "Why does a hockey puck slide across ice with nearly constant velocity?",
        answers: [
            { text: "A) No significant external force acts on it", correct: true },
            { text: "B) A constant force pushes it", correct: false },
            { text: "C) Its mass increases", correct: false },
            { text: "D) Its velocity decreases", correct: false }
        ],
        explanation: "Newton’s First Law states an object in motion maintains constant velocity unless acted upon by an external force. On ice, friction is minimal, so no significant force alters the puck’s motion, making A correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: In a chemical reaction, the activation energy is the minimum energy required to start the reaction, often lowered by catalysts.",
        question: "What effect does a catalyst have on the activation energy of a chemical reaction?",
        answers: [
            { text: "A) It increases the activation energy", correct: false },
            { text: "B) It lowers the activation energy", correct: true },
            { text: "C) It eliminates the activation energy", correct: false },
            { text: "D) It has no effect on the activation energy", correct: false }
        ],
        explanation: "The passage states catalysts lower the activation energy, speeding up the reaction. They don’t increase, eliminate, or leave it unchanged, making B correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: Potential energy is stored energy based on position, calculated as PE = mgh, where m is mass, g is gravitational acceleration (9.8 m/s²), and h is height.",
        question: "What is the potential energy of a 4 kg object at a height of 5 meters?",
        answers: [
            { text: "A) 98 J", correct: false },
            { text: "B) 196 J", correct: true },
            { text: "C) 245 J", correct: false },
            { text: "D) 392 J", correct: false }
        ],
        explanation: "Using PE = mgh: PE = 4 kg × 9.8 m/s² × 5 m = 196 J, making B correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: The frequency of a wave determines its pitch for sound or color for light, with higher frequencies producing higher pitches or bluer light.",
        question: "What does a higher frequency wave produce in sound?",
        answers: [
            { text: "A) Louder sound", correct: false },
            { text: "B) Lower pitch", correct: false },
            { text: "C) Higher pitch", correct: true },
            { text: "D) Slower speed", correct: false }
        ],
        explanation: "The passage states higher frequencies produce higher pitches in sound. Amplitude affects loudness, frequency doesn’t lower pitch or change speed, making C correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: Solids have a fixed shape and volume because their particles vibrate in fixed positions, unlike liquids or gases.",
        question: "Why do solids maintain a fixed volume?",
        answers: [
            { text: "A) Their particles are widely spaced", correct: false },
            { text: "B) Their particles move freely", correct: false },
            { text: "C) Their particles are loosely packed", correct: false },
            { text: "D) Their particles vibrate in fixed positions", correct: true }
        ],
        explanation: "The passage states solids maintain fixed shape and volume because particles vibrate in fixed positions, unlike liquids or gases, making D correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "Passage: Newton’s Second Law states that acceleration is inversely proportional to mass (a = F/m), meaning a larger mass requires more force to achieve the same acceleration.",
        question: "If a 15 kg object experiences a 45 N force, what is its acceleration?",
        answers: [
            { text: "A) 2 m/s²", correct: false },
            { text: "B) 3 m/s²", correct: true },
            { text: "C) 4 m/s²", correct: false },
            { text: "D) 5 m/s²", correct: false }
        ],
        explanation: "Using a = F/m: a = 45 N ÷ 15 kg = 3 m/s², making B correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    }
];

// Variables
let categoryStats = {
    "ged-physical-science": { correct: 0, incorrect: 0 }
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
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/Passage:.*?(\.(?=\s*What|\s*Which|\s*Why|\s*How)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
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
        categoryStats["ged-physical-science"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-physical-science"].incorrect++;
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
        case 1: return physicalScienceQuestions;
        default: return physicalScienceQuestions;
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
    let totalCorrect = categoryStats["ged-physical-science"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-physical-science"].incorrect;

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
    localStorage.setItem(`ged-physical-science-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-physical-science-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-physical-science-lessonScore-${lessonId}`) || "Not completed yet";
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