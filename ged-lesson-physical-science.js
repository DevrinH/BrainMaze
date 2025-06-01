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
                passage: "In 2023, a train in Millville traveled 300 kilometers in 5 hours during a regional test run. Engineers needed to calculate the train’s speed to evaluate performance, using the formula speed equals distance divided by time to ensure efficient scheduling.",
                question: "What is the train’s speed?",
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
                passage: "In 2024, a physics experiment in Greenvale studied a roller coaster. At the top of a hill, the coaster has high potential energy, which transforms into kinetic energy as it descends, per the law of energy conservation. This transformation powers the coaster’s motion through the track.",
                question: "What happens to the potential energy during descent?",
                options: [
                    { text: "A) Increases", correct: false },
                    { text: "B) Converts to kinetic energy", correct: true },
                    { text: "C) Remains constant", correct: false },
                    { text: "D) Is destroyed", correct: false }
                ],
                explanation: "Potential energy transforms into kinetic energy, making B correct."
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
                passage: "In 2023, a materials study in Clearwater examined liquids, which have a fixed volume but take the shape of their container due to loosely packed particles. This property allows liquids to flow and adapt, unlike solids with tightly packed particles. The study aimed to improve liquid-based cooling systems.",
                question: "Why do liquids conform to container shapes?",
                options: [
                    { text: "A) Fixed particle arrangement", correct: false },
                    { text: "B) Loosely packed particles", correct: true },
                    { text: "C) High particle density", correct: false },
                    { text: "D) Rigid particle bonds", correct: false }
                ],
                explanation: "Liquids’ shape adaptability is due to loosely packed particles, making B correct."
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
                passage: "In 2024, a chemistry lab in Millville studied the reaction of hydrogen (H₂) with oxygen (O₂) to form water (H₂O). This reaction, used in fuel cells, converts chemical energy into electrical energy, producing a single product critical for clean energy applications.",
                question: "What is the product of this reaction?",
                options: [
                    { text: "A) Carbon dioxide", correct: false },
                    { text: "B) Nitrogen", correct: false },
                    { text: "C) Water", correct: true },
                    { text: "D) Oxygen", correct: false }
                ],
                explanation: "The reaction produces water (H₂O), making C correct."
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
                passage: "In 2023, a physics class in Greenvale applied Newton’s Second Law, which states force equals mass times acceleration (F = ma). Students calculated the force needed to accelerate a 10 kg cart at 2 m/s² to understand motion dynamics in a hands-on experiment.",
                question: "What is the force required?",
                options: [
                    { text: "A) 12 N", correct: false },
                    { text: "B) 5 N", correct: false },
                    { text: "C) 20 N", correct: true },
                    { text: "D) 30 N", correct: false }
                ],
                explanation: "Using F = ma: F = 10 kg × 2 m/s² = 20 N, making C correct."
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
                passage: "In 2024, a study in Clearwater explored sound waves, which require a medium like air or water to travel, unlike light waves that can move through a vacuum. This property affects how sound is used in communication systems, such as underwater sonar. The study aimed to improve signal clarity in dense media.",
                question: "Why can’t sound waves travel through a vacuum?",
                options: [
                    { text: "A) They are electromagnetic waves", correct: false },
                    { text: "B) They carry matter", correct: false },
                    { text: "C) They have low frequency", correct: false },
                    { text: "D) They are mechanical waves", correct: true }
                ],
                explanation: "Sound waves are mechanical and require a medium, making D correct."
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
                passage: "In 2023, a chemical engineering experiment in Millville demonstrated that in a reaction, 50 g of reactants produce 50 g of products, per the law of conservation of mass. This principle ensures that the total mass remains constant, critical for designing efficient industrial processes.",
                question: "Why is the mass of products equal to the mass of reactants?",
                options: [
                    { text: "A) Mass is created", correct: false },
                    { text: "B) Mass is destroyed", correct: false },
                    { text: "C) Mass is conserved", correct: true },
                    { text: "D) Energy is transformed", correct: false }
                ],
                explanation: "The law of conservation of mass ensures mass equality, making C correct."
            }
        ]
    }
};

// Physical science question array
const physicalScienceQuestions = [
    {
        passage: "In 2023, a physics experiment in Millville measured work, defined as force moving an object over a distance (Work = Force × Distance). A student applied a 5 N force to move an object 3 meters. The experiment aimed to calculate the work done to understand energy transfer in mechanical systems.",
        question: "What is the work done?",
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
        passage: "In 2024, a rocket launch study in Greenvale applied Newton’s Third Law, which states that for every action, there is an equal and opposite reaction. The action of expelling gas downward propels the rocket upward. This principle was tested to optimize fuel efficiency in space missions, ensuring accurate trajectory calculations.",
        question: "What is the reaction force in a rocket launch?",
        answers: [
            { text: "A) Gas expelled downward", correct: false },
            { text: "B) Rocket moving upward", correct: true },
            { text: "C) Gravitational pull", correct: false },
            { text: "D) Air resistance", correct: false }
        ],
        explanation: "The reaction to gas expulsion downward is the rocket moving upward, making B correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "In 2023, a chemical plant in Clearwater conducted a reaction where sodium (Na) and chlorine (Cl₂) combined to form sodium chloride (NaCl). The law of conservation of mass ensured that the total mass of reactants equaled the mass of products, a critical principle for maintaining efficiency in industrial chemical processes.",
        question: "Why does the mass remain constant in this reaction?",
        answers: [
            { text: "A) Mass is created", correct: false },
            { text: "B) Mass is destroyed", correct: false },
            { text: "C) Law of conservation of mass", correct: true },
            { text: "D) Energy is transformed", correct: false }
        ],
        explanation: "The law of conservation of mass ensures mass equality, making C correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "In 2024, a cycling event in Millville tracked a cyclist who traveled 24 kilometers in 2 hours. The event organizers calculated the cyclist’s speed using the formula speed equals distance divided by time to assess performance and plan future races with accurate timing.",
        question: "What is the cyclist’s speed?",
        answers: [
            { text: "A) 10 km/h", correct: false },
            { text: "B) 12 km/h", correct: true },
            { text: "C) 14 km/h", correct: false },
            { text: "D) 8 km/h", correct: false }
        ],
        explanation: "Speed = 24 km ÷ 2 hours = 12 km/h, making B correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "In 2023, a materials science study in Greenvale analyzed gases, which have no fixed shape or volume and expand to fill their container due to widely spaced particles. This property was studied to improve gas storage systems for renewable energy applications, ensuring safe and efficient containment.",
        question: "Why do gases expand to fill a container?",
        answers: [
            { text: "A) Tightly packed particles", correct: false },
            { text: "B) Fixed particle bonds", correct: false },
            { text: "C) Widely spaced particles", correct: true },
            { text: "D) High particle density", correct: false }
        ],
        explanation: "Gas expansion is due to widely spaced particles, making C correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "In 2024, an environmental study in Clearwater examined energy conservation in a hydroelectric dam. Water’s potential energy transforms into kinetic energy as it falls, then into electrical energy via turbines. This process supports renewable energy production, reducing reliance on fossil fuels for sustainable power generation.",
        question: "What is the final energy form in a hydroelectric dam?",
        answers: [
            { text: "A) Potential energy", correct: false },
            { text: "B) Kinetic energy", correct: false },
            { text: "C) Thermal energy", correct: false },
            { text: "D) Electrical energy", correct: true }
        ],
        explanation: "The final form is electrical energy, making D correct.",
        difficulty: "medium",
        category: "ged-physical-science"
    },
    {
        passage: "In 2023, an acoustics study in Millville explored wave frequency, which determines the pitch of sound or the color of light. Higher frequency sound waves produce higher-pitched sounds, a property used to design better audio systems for clear communication in various environments.",
        question: "What does higher frequency affect in sound waves?",
        answers: [
            { text: "A) Loudness", correct: false },
            { text: "B) Speed", correct: false },
            { text: "C) Wavelength", correct: false },
            { text: "D) Pitch", correct: true }
        ],
        explanation: "Higher frequency produces higher pitch, making D correct.",
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
            lessonContent.innerHTML = `
                <div class="question-row science-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question}</div>
                        <div class="answer-choices" id="answer-buttons"></div>
                        <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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
                    <button id="start-quiz-btn" class="next-btn">Next</button>
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
        lessonContent.innerHTML = `
            <div class="question-row science-section">
                <div class="passage-text">${question.passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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