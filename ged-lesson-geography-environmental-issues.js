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
        title: "Geography and Environmental Issues",
        content: [
            {
                type: "example",
                title: "Example 1: Physical Geography",
                content: `
                    <h2>Example 1: Physical Geography</h2>
                    <p>Passage: Physical geography studies natural features like mountains, rivers, and climates. Plate tectonics shape landscapes by causing earthquakes and forming mountain ranges.</p>
                    <p>Question: How do plate tectonics influence landscapes?</p>
                    <p>Step 1: Identify process: Plate tectonics cause earthquakes and form mountains.</p>
                    <p>Step 2: Confirm: These actions shape natural features.</p>
                    <p>Solution: Plate tectonics influence landscapes by causing earthquakes and forming mountain ranges.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a geological survey in Millville examined the region’s volcanic landscape. Physical geography studies landforms like volcanoes, which are formed by tectonic activity as molten rock erupts from beneath the Earth’s crust, shaping dramatic natural features.",
                question: "What forms volcanoes?",
                options: [
                    { text: "A) Tectonic activity", correct: true },
                    { text: "B) Ocean currents", correct: false },
                    { text: "C) Wind erosion", correct: false },
                    { text: "D) Human construction", correct: false }
                ],
                explanation: "The passage states volcanoes are formed by tectonic activity, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Human Geography",
                content: `
                    <h2>Example 2: Human Geography</h2>
                    <p>Passage: Human geography examines how people interact with their environment. Urbanization, the growth of cities, often leads to increased resource consumption.</p>
                    <p>Question: What is one effect of urbanization?</p>
                    <p>Step 1: Identify effect: Increased resource consumption.</p>
                    <p>Step 2: Confirm: City growth demands more resources.</p>
                    <p>Solution: One effect of urbanization is increased resource consumption.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, Greenvale’s population grew rapidly as people migrated to urban centers, a focus of human geography. This migration to cities often strains infrastructure, such as transportation and water systems, due to increased demand from growing populations.",
                question: "What can urban migration cause?",
                options: [
                    { text: "A) Reduced population", correct: false },
                    { text: "B) Strained infrastructure", correct: true },
                    { text: "C) Decreased resource use", correct: false },
                    { text: "D) More rural development", correct: false }
                ],
                explanation: "The passage states urban migration can strain infrastructure, making B correct."
            },
            {
                type: "example",
                title: "Example 3: Climate Change",
                content: `
                    <h2>Example 3: Climate Change</h2>
                    <p>Passage: Climate change, driven by greenhouse gas emissions, causes rising global temperatures and extreme weather. Burning fossil fuels is a major contributor.</p>
                    <p>Question: What is a major cause of climate change?</p>
                    <p>Step 1: Identify cause: Greenhouse gas emissions from burning fossil fuels.</p>
                    <p>Step 2: Confirm: This drives temperature rise and weather changes.</p>
                    <p>Solution: A major cause of climate change is burning fossil fuels.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, Clearwater’s environmental researchers studied climate change impacts. Rising sea levels, driven by melting ice caps due to carbon dioxide emissions from fossil fuel combustion, threaten coastal communities, highlighting the urgent need for emission reductions.",
                question: "What contributes to sea level rise?",
                options: [
                    { text: "A) Increased rainfall", correct: false },
                    { text: "B) Melting ice caps", correct: true },
                    { text: "C) Soil erosion", correct: false },
                    { text: "D) Urban expansion", correct: false }
                ],
                explanation: "The passage states melting ice caps cause sea level rise, making B correct."
            },
            {
                type: "example",
                title: "Example 4: Resource Management",
                content: `
                    <h2>Example 4: Resource Management</h2>
                    <p>Passage: Resource management ensures sustainable use of water, forests, and minerals. Overfishing depletes fish stocks, threatening ecosystems and economies.</p>
                    <p>Question: What is a consequence of overfishing?</p>
                    <p>Step 1: Identify consequence: Depletes fish stocks.</p>
                    <p>Step 2: Confirm: This harms ecosystems and economies.</p>
                    <p>Solution: Overfishing depletes fish stocks, threatening ecosystems and economies.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, Millville’s forestry department emphasized sustainable resource management to combat deforestation. The clearing of forests for agriculture destroys habitats, disrupting ecosystems and endangering wildlife, which underscores the need for conservation policies.",
                question: "What does deforestation cause?",
                options: [
                    { text: "A) Increased fish stocks", correct: false },
                    { text: "B) Habitat destruction", correct: true },
                    { text: "C) Reduced urbanization", correct: false },
                    { text: "D) Lower emissions", correct: false }
                ],
                explanation: "The passage states deforestation destroys habitats, making B correct."
            },
            {
                type: "example",
                title: "Example 5: Environmental Policies",
                content: `
                    <h2>Example 5: Environmental Policies</h2>
                    <p>Passage: Environmental policies, like the Clean Air Act, reduce pollution by regulating emissions from industries. These policies aim to protect public health and ecosystems.</p>
                    <p>Question: What is the purpose of environmental policies like the Clean Air Act?</p>
                    <p>Step 1: Identify purpose: Reduce pollution to protect health and ecosystems.</p>
                    <p>Step 2: Confirm: Regulations target emissions for these goals.</p>
                    <p>Solution: The purpose is to reduce pollution and protect public health and ecosystems.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, Greenvale implemented policies inspired by the Endangered Species Act to protect local wildlife. This act focuses on preserving biodiversity by safeguarding habitats, ensuring the survival of threatened species and maintaining ecological balance.",
                question: "What does the Endangered Species Act aim to protect?",
                options: [
                    { text: "A) Industrial output", correct: false },
                    { text: "B) Urban development", correct: false },
                    { text: "C) Biodiversity", correct: true },
                    { text: "D) Fossil fuel use", correct: false }
                ],
                explanation: "The passage states the Endangered Species Act protects biodiversity, making C correct."
            },
            {
                type: "example",
                title: "Example 6: Population Distribution",
                content: `
                    <h2>Example 6: Population Distribution</h2>
                    <p>Passage: Population distribution is uneven, with dense populations near coasts and rivers due to access to water and trade. Rural areas often have sparse populations.</p>
                    <p>Question: Why do coastal areas have dense populations?</p>
                    <p>Step 1: Identify reason: Access to water and trade.</p>
                    <p>Step 2: Confirm: These factors support dense populations.</p>
                    <p>Solution: Coastal areas have dense populations due to access to water and trade.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, Clearwater’s demographic study revealed dense populations in fertile river valleys. These areas attract large populations due to agricultural opportunities, as rich soils and water access support farming, fostering economic and social development.",
                question: "Why do river valleys have large populations?",
                options: [
                    { text: "A) Sparse resources", correct: false },
                    { text: "B) Harsh climates", correct: false },
                    { text: "C) Agricultural opportunities", correct: true },
                    { text: "D) Limited trade", correct: false }
                ],
                explanation: "The passage states river valleys attract populations due to agricultural opportunities, making C correct."
            },
            {
                type: "example",
                title: "Example 7: Deforestation",
                content: `
                    <h2>Example 7: Deforestation</h2>
                    <p>Passage: Deforestation, the clearing of forests for agriculture or urban development, contributes to climate change by releasing stored carbon and reducing oxygen production.</p>
                    <p>Question: How does deforestation contribute to climate change?</p>
                    <p>Step 1: Identify mechanism: Releases stored carbon and reduces oxygen production.</p>
                    <p>Step 2: Confirm: These actions increase greenhouse gases.</p>
                    <p>Solution: Deforestation contributes to climate change by releasing carbon and reducing oxygen production.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, Millville’s environmentalists raised concerns about deforestation in nearby forests. The clearing of trees for agriculture disrupts ecosystems by removing animal habitats, altering water cycles, and contributing to biodiversity loss, threatening long-term ecological stability.",
                question: "What is one impact of deforestation?",
                options: [
                    { text: "A) Increased oxygen production", correct: false },
                    { text: "B) Reduced carbon emissions", correct: false },
                    { text: "C) Enhanced water cycles", correct: false },
                    { text: "D) Habitat removal", correct: true }
                ],
                explanation: "The passage states deforestation removes animal habitats, making D correct."
            }
        ]
    }
};

// Geography and environmental issues question array
const geographyEnvironmentalQuestions = [
    {
        passage: "In 2023, Millville invested heavily in solar and wind farms to power its growing urban areas. Renewable energy sources, such as solar and wind, reduce reliance on fossil fuels, significantly decreasing greenhouse gas emissions and supporting sustainable development.",
        question: "What is a benefit of renewable energy?",
        answers: [
            { text: "A) Decreased emissions", correct: true },
            { text: "B) Increased deforestation", correct: false },
            { text: "C) Higher fossil fuel use", correct: false },
            { text: "D) Reduced biodiversity", correct: false }
        ],
        explanation: "The passage states renewable energy decreases greenhouse gas emissions, making A correct.",
        difficulty: "easy",
        category: "ged-geography-environmental-issues"
    },
    {
        passage: "In 2024, a volcanic eruption in Greenvale released massive ash clouds, studied by local geographers. Volcanic eruptions, driven by tectonic plate movements, emit ash and gases that can temporarily cool the planet by blocking sunlight, impacting global climate patterns.",
        question: "What is a climatic effect of volcanic eruptions?",
        answers: [
            { text: "A) Permanent temperature increase", correct: false },
            { text: "B) Temporary global cooling", correct: true },
            { text: "C) Increased sea level rise", correct: false },
            { text: "D) Reduced atmospheric carbon", correct: false }
        ],
        explanation: "The passage explains volcanic eruptions cause temporary cooling by blocking sunlight, making B correct.",
        difficulty: "medium",
        category: "ged-geography-environmental-issues"
    },
    {
        passage: "In 2023, Clearwater’s rapid urban expansion into surrounding forests alarmed environmentalists. Urban sprawl, the spread of cities into natural areas, often leads to habitat loss as forests and wetlands are converted for housing and infrastructure, threatening local wildlife.",
        question: "What is a primary environmental impact of urban sprawl?",
        answers: [
            { text: "A) Increased agricultural output", correct: false },
            { text: "B) Reduced urban population density", correct: false },
            { text: "C) Loss of natural habitats", correct: true },
            { text: "D) Enhanced water conservation", correct: false }
        ],
        explanation: "The passage states urban sprawl leads to habitat loss, making C correct.",
        difficulty: "medium",
        category: "ged-geography-environmental-issues"
    },
    {
        passage: "In 2024, Millville joined global efforts under the Paris Agreement, a 2015 treaty uniting countries to combat climate change. The agreement focuses on limiting global warming by reducing greenhouse gas emissions through coordinated international commitments and policies.",
        question: "What is the primary goal of the Paris Agreement?",
        answers: [
            { text: "A) Promote industrial growth", correct: false },
            { text: "B) Regulate international trade", correct: false },
            { text: "C) Limit global warming", correct: true },
            { text: "D) Expand urban areas", correct: false }
        ],
        explanation: "The passage highlights the Paris Agreement’s aim to limit global warming, making C correct.",
        difficulty: "medium",
        category: "ged-geography-environmental-issues"
    },
    {
        passage: "In 2023, Greenvale’s coastal communities faced growing risks from climate change. Coastal regions, densely populated due to marine resources and trade routes, are vulnerable to sea level rise, which threatens infrastructure and livelihoods in low-lying areas.",
        question: "Why are coastal populations particularly at risk from climate change?",
        answers: [
            { text: "A) Reliance on agriculture", correct: false },
            { text: "B) Vulnerability to sea level rise", correct: true },
            { text: "C) Inland location", correct: false },
            { text: "D) Limited trade opportunities", correct: false }
        ],
        explanation: "The passage notes coastal vulnerability to sea level rise, making B correct.",
        difficulty: "medium",
        category: "ged-geography-environmental-issues"
    },
    {
        passage: "In 2024, Clearwater’s farmers overused groundwater for irrigation, raising concerns about sustainability. Overexploitation of groundwater depletes aquifers, reducing future water availability and causing land subsidence, which damages infrastructure and agricultural productivity.",
        question: "What is a consequence of overexploiting groundwater?",
        answers: [
            { text: "A) Increased forest cover", correct: false },
            { text: "B) Aquifer depletion", correct: true },
            { text: "C) Enhanced soil fertility", correct: false },
            { text: "D) Improved water quality", correct: false }
        ],
        explanation: "The passage states overexploitation causes aquifer depletion, making B correct.",
        difficulty: "medium",
        category: "ged-geography-environmental-issues"
    },
    {
        passage: "In 2023, Millville’s conservationists campaigned against deforestation in the Amazon rainforest. Deforestation releases stored carbon, contributing to global warming, and disrupts indigenous communities’ livelihoods by destroying ecosystems critical to their survival and cultural practices.",
        question: "How does Amazon deforestation contribute to climate change?",
        answers: [
            { text: "A) Reducing greenhouse gas emissions", correct: false },
            { text: "B) Releasing stored carbon", correct: true },
            { text: "C) Increasing oxygen production", correct: false },
            { text: "D) Improving air quality", correct: false }
        ],
        explanation: "The passage explains deforestation releases stored carbon, contributing to global warming, making B correct.",
        difficulty: "medium",
        category: "ged-geography-environmental-issues"
    }
];

// Variables
let categoryStats = {
    "ged-geography-environmental-issues": { correct: 0, incorrect: 0 }
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
                <div class="question-row social-studies-section">
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
        categoryStats["ged-geography-environmental-issues"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-geography-environmental-issues"].incorrect++;
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
        case 1: return geographyEnvironmentalQuestions;
        default: return geographyEnvironmentalQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row social-studies-section">
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
    let totalCorrect = categoryStats["ged-geography-environmental-issues"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-geography-environmental-issues"].incorrect;

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
    localStorage.setItem(`ged-geography-environmental-issues-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-geography-environmental-issues-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-geography-environmental-issues-lessonScore-${lessonId}`) || "Not completed yet";
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