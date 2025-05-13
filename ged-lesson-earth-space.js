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
        title: "Earth and Space Science",
        content: [
            {
                type: "example",
                title: "Example 1: Rock Cycle",
                content: `
                    <h2>Example 1: Rock Cycle</h2>
                    <p>Passage: The rock cycle describes how rocks transform. Igneous rocks form from cooled magma, sedimentary rocks from compressed sediments, and metamorphic rocks from heat and pressure altering existing rocks.</p>
                    <p>Question: How do metamorphic rocks form?</p>
                    <p>Step 1: Identify process: Heat and pressure alter existing rocks.</p>
                    <p>Step 2: Confirm: This distinguishes metamorphic rocks from igneous and sedimentary.</p>
                    <p>Solution: Metamorphic rocks form from heat and pressure altering existing rocks.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: Sedimentary rocks form when sediments, like sand or mud, are compressed over time. How do sedimentary rocks form?",
                options: [
                    { text: "A) Compression of sediments", correct: true },
                    { text: "B) Cooling of magma", correct: false },
                    { text: "C) Heat and pressure", correct: false },
                    { text: "D) Chemical reactions", correct: false }
                ],
                explanation: "The passage states sedimentary rocks form from compressed sediments, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Plate Tectonics",
                content: `
                    <h2>Example 2: Plate Tectonics</h2>
                    <p>Passage: Earth’s crust is divided into tectonic plates. When plates collide, they form mountains; when they diverge, they create rift valleys.</p>
                    <p>Question: What happens when tectonic plates diverge?</p>
                    <p>Step 1: Identify action: Plates diverging.</p>
                    <p>Step 2: Recall result: Divergence creates rift valleys.</p>
                    <p>Solution: When tectonic plates diverge, they create rift valleys.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: Tectonic plate collisions can cause earthquakes and form mountains. What is one result of plate collisions?",
                options: [
                    { text: "A) Earthquakes", correct: true },
                    { text: "B) Rift valleys", correct: false },
                    { text: "C) Ocean currents", correct: false },
                    { text: "D) Glaciers", correct: false }
                ],
                explanation: "The passage lists earthquakes as a result of plate collisions, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Weather Patterns",
                content: `
                    <h2>Example 3: Weather Patterns</h2>
                    <p>Passage: Weather is driven by the atmosphere. High-pressure systems bring clear skies, while low-pressure systems often cause clouds and precipitation.</p>
                    <p>Question: What weather is associated with low-pressure systems?</p>
                    <p>Step 1: Identify system: Low-pressure systems.</p>
                    <p>Step 2: Link to weather: They cause clouds and precipitation.</p>
                    <p>Solution: Low-pressure systems are associated with clouds and precipitation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: High-pressure systems in the atmosphere lead to stable, clear weather conditions. What weather is typical of high-pressure systems?",
                options: [
                    { text: "A) Clear skies", correct: true },
                    { text: "B) Heavy rain", correct: false },
                    { text: "C) Strong winds", correct: false },
                    { text: "D) Fog", correct: false }
                ],
                explanation: "The passage states high-pressure systems bring clear weather, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Solar System",
                content: `
                    <h2>Example 4: Solar System</h2>
                    <p>Passage: The solar system consists of the Sun and orbiting bodies. Planets like Earth orbit the Sun due to gravitational pull, completing one orbit in a year.</p>
                    <p>Question: Why do planets orbit the Sun?</p>
                    <p>Step 1: Identify force: Gravitational pull.</p>
                    <p>Step 2: Explain: Gravity keeps planets in orbit.</p>
                    <p>Solution: Planets orbit the Sun due to gravitational pull.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: Moons orbit planets due to gravitational attraction, similar to planets orbiting the Sun. Why do moons orbit planets?",
                options: [
                    { text: "A) Gravitational attraction", correct: true },
                    { text: "B) Magnetic fields", correct: false },
                    { text: "C) Atmospheric pressure", correct: false },
                    { text: "D) Thermal energy", correct: false }
                ],
                explanation: "The passage attributes moon orbits to gravitational attraction, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Earth’s Layers",
                content: `
                    <h2>Example 5: Earth’s Layers</h2>
                    <p>Passage: Earth has layers: the crust, mantle, outer core, and inner core. The mantle, made of semi-fluid rock, drives plate tectonics through convection currents.</p>
                    <p>Question: What drives plate tectonics?</p>
                    <p>Step 1: Identify layer: Mantle.</p>
                    <p>Step 2: Determine process: Convection currents in semi-fluid rock.</p>
                    <p>Solution: Convection currents in the mantle drive plate tectonics.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: The outer core, a liquid layer of molten iron, generates Earth’s magnetic field through its movement. What generates Earth’s magnetic field?",
                options: [
                    { text: "A) Outer core movement", correct: true },
                    { text: "B) Mantle convection", correct: false },
                    { text: "C) Crustal shifts", correct: false },
                    { text: "D) Inner core rotation", correct: false }
                ],
                explanation: "The passage states the outer core’s movement generates the magnetic field, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Water Cycle",
                content: `
                    <h2>Example 6: Water Cycle</h2>
                    <p>Passage: The water cycle describes water movement on Earth. Evaporation turns liquid water into vapor, which condenses into clouds and falls as precipitation.</p>
                    <p>Question: What process turns liquid water into vapor?</p>
                    <p>Step 1: Identify process: Evaporation.</p>
                    <p>Step 2: Confirm: Evaporation converts liquid to vapor.</p>
                    <p>Solution: Evaporation turns liquid water into vapor.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: In the water cycle, condensation forms clouds from water vapor, leading to precipitation like rain. What does condensation produce?",
                options: [
                    { text: "A) Clouds", correct: true },
                    { text: "B) Vapor", correct: false },
                    { text: "C) Ice", correct: false },
                    { text: "D) Rivers", correct: false }
                ],
                explanation: "The passage states condensation forms clouds, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Universe Expansion",
                content: `
                    <h2>Example 7: Universe Expansion</h2>
                    <p>Passage: The universe is expanding, as evidenced by the redshift of light from distant galaxies. This suggests galaxies are moving away from each other.</p>
                    <p>Question: What does redshift indicate?</p>
                    <p>Step 1: Identify evidence: Redshift of light from galaxies.</p>
                    <p>Step 2: Link to phenomenon: Redshift shows galaxies are moving away.</p>
                    <p>Solution: Redshift indicates galaxies are moving away from each other.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: The Big Bang theory suggests the universe began expanding from a single point. Evidence includes the redshift of galaxy light. What does redshift support?",
                options: [
                    { text: "A) Universe expansion", correct: true },
                    { text: "B) Galaxy formation", correct: false },
                    { text: "C) Star contraction", correct: false },
                    { text: "D) Black hole creation", correct: false }
                ],
                explanation: "The passage links redshift to universe expansion, making A correct."
            }
        ]
    }
};

// Earth and space science question array
const earthSpaceQuestions = [
    {
        question: "Passage: Earth’s atmosphere is layered. The troposphere, closest to the surface, contains most weather phenomena, while the stratosphere holds the ozone layer. Where do most weather phenomena occur?",
        answers: [
            { text: "A) Troposphere", correct: true },
            { text: "B) Stratosphere", correct: false },
            { text: "C) Mesosphere", correct: false },
            { text: "D) Thermosphere", correct: false }
        ],
        explanation: "The passage states the troposphere contains most weather phenomena, making A correct.",
        difficulty: "easy",
        category: "ged-earth-space"
    },
    {
        question: "Passage: Igneous rocks, such as basalt, form when magma cools and solidifies, either on Earth’s surface or below it. What process forms igneous rocks?",
        answers: [
            { text: "A) Cooling and solidification of magma", correct: true },
            { text: "B) Compression of sediments", correct: false },
            { text: "C) Heat and pressure alteration", correct: false },
            { text: "D) Evaporation of minerals", correct: false }
        ],
        explanation: "The passage states igneous rocks form from cooling and solidifying magma. Compression forms sedimentary rocks, heat and pressure form metamorphic rocks, and evaporation is unrelated, making A correct.",
        difficulty: "medium",
        category: "ged-earth-space"
    },
    {
        question: "Passage: Transform plate boundaries occur where tectonic plates slide past each other, often causing earthquakes due to friction. What is a common result of transform plate boundaries?",
        answers: [
            { text: "A) Mountain formation", correct: false },
            { text: "B) Earthquakes", correct: true },
            { text: "C) Rift valley creation", correct: false },
            { text: "D) Volcanic eruptions", correct: false }
        ],
        explanation: "The passage notes transform boundaries cause earthquakes due to sliding friction. Mountains and volcanoes are linked to convergent boundaries, and rift valleys to divergent boundaries, making B correct.",
        difficulty: "medium",
        category: "ged-earth-space"
    },
    {
        question: "Passage: The water cycle includes precipitation, where water falls as rain or snow, replenishing Earth’s surface water. What role does precipitation play in the water cycle?",
        answers: [
            { text: "A) Converts vapor to liquid", correct: false },
            { text: "B) Replenishes surface water", correct: true },
            { text: "C) Heats the atmosphere", correct: false },
            { text: "D) Forms groundwater vapor", correct: false }
        ],
        explanation: "The passage states precipitation replenishes surface water. Condensation converts vapor to liquid, precipitation doesn’t heat the atmosphere, and groundwater isn’t vapor, making B correct.",
        difficulty: "medium",
        category: "ged-earth-space"
    },
    {
        question: "Passage: Earth’s inner core, a solid ball of iron and nickel, is under immense pressure, contributing to the planet’s magnetic field through its interaction with the liquid outer core. What is the inner core primarily composed of?",
        answers: [
            { text: "A) Liquid magma", correct: false },
            { text: "B) Sedimentary rock", correct: false },
            { text: "C) Iron and nickel", correct: true },
            { text: "D) Gaseous elements", correct: false }
        ],
        explanation: "The passage states the inner core is a solid ball of iron and nickel. It’s not liquid magma, sedimentary rock, or gas, making C correct.",
        difficulty: "medium",
        category: "ged-earth-space"
    },
    {
        question: "Passage: The solar system’s gas giants, like Jupiter, have strong gravitational fields that allow them to retain thick atmospheres and numerous moons. Why do gas giants have many moons?",
        answers: [
            { text: "A) Due to their proximity to the Sun", correct: false },
            { text: "B) Due to their rocky composition", correct: false },
            { text: "C) Due to their weak magnetic fields", correct: false },
            { text: "D) Due to their strong gravitational fields", correct: true }
        ],
        explanation: "The passage attributes gas giants’ numerous moons to strong gravitational fields. They are far from the Sun, gaseous not rocky, and have strong magnetic fields, making D correct.",
        difficulty: "medium",
        category: "ged-earth-space"
    },
    {
        question: "Passage: Doppler shifts in galaxy light provide evidence for universe expansion. Blue shift indicates objects moving closer, while redshift shows movement away. What does a blue shift in a galaxy’s light suggest?",
        answers: [
            { text: "A) The galaxy is moving away", correct: false },
            { text: "B) The galaxy is stationary", correct: false },
            { text: "C) The galaxy is moving closer", correct: true },
            { text: "D) The galaxy is contracting", correct: false }
        ],
        explanation: "The passage states blue shift indicates objects moving closer, unlike redshift for moving away. It doesn’t suggest stationary or contracting galaxies, making C correct.",
        difficulty: "medium",
        category: "ged-earth-space"
    }
];

// Variables
let categoryStats = {
    "ged-earth-space": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-earth-space"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-earth-space"].incorrect++;
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
        case 1: return earthSpaceQuestions;
        default: return earthSpaceQuestions;
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
    let totalCorrect = categoryStats["ged-earth-space"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-earth-space"].incorrect;

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
    localStorage.setItem(`ged-earth-space-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-earth-space-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-earth-space-lessonScore-${lessonId}`) || "Not completed yet";
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