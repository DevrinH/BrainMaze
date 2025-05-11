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
        title: "Scientific Method and Experimental Design",
        content: [
            {
                type: "example",
                title: "Example 1: Formulating a Hypothesis",
                content: `
                    <h2>Example 1: Formulating a Hypothesis</h2>
                    <p>Passage: The scientific method begins with a hypothesis, a testable statement. To study plant growth, a scientist hypothesizes: "Plants grow taller with more sunlight."</p>
                    <p>Question: What makes this hypothesis testable?</p>
                    <p>Step 1: Identify components: The hypothesis links sunlight (variable) to plant height (measurable outcome).</p>
                    <p>Step 2: Confirm testability: Sunlight can be varied, and height can be measured.</p>
                    <p>Solution: The hypothesis is testable because it involves measurable variables (sunlight and plant height).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: A scientist hypothesizes: 'Increasing water intake improves memory in students.' Why is this hypothesis testable?",
                options: [
                    { text: "A) It involves measurable variables", correct: true },
                    { text: "B) It is a general statement", correct: false },
                    { text: "C) It avoids variables", correct: false },
                    { text: "D) It is unmeasurable", correct: false }
                ],
                explanation: "Water intake and memory can be measured, making the hypothesis testable, so A is correct."
            },
            {
                type: "example",
                title: "Example 2: Identifying Variables",
                content: `
                    <h2>Example 2: Identifying Variables</h2>
                    <p>Passage: In an experiment testing fertilizer’s effect on crop yield, fertilizer amount is the independent variable, crop yield is the dependent variable, and soil type is a controlled variable.</p>
                    <p>Question: What is the dependent variable?</p>
                    <p>Step 1: Define dependent variable: The outcome measured in the experiment.</p>
                    <p>Step 2: Identify: Crop yield is measured to see the effect of fertilizer.</p>
                    <p>Solution: The dependent variable is crop yield.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: An experiment tests how temperature affects enzyme activity. Temperature is the independent variable, enzyme activity is the dependent variable, and pH is controlled. What is the independent variable?",
                options: [
                    { text: "A) Temperature", correct: true },
                    { text: "B) Enzyme activity", correct: false },
                    { text: "C) pH", correct: false },
                    { text: "D) Time", correct: false }
                ],
                explanation: "The passage states temperature is the independent variable, manipulated to observe its effect, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Designing Experiments",
                content: `
                    <h2>Example 3: Designing Experiments</h2>
                    <p>Passage: To test if exercise improves heart rate, a scientist measures heart rates of two groups: one exercising daily and one not exercising. The groups are matched for age and health.</p>
                    <p>Question: Why match the groups for age and health?</p>
                    <p>Step 1: Identify purpose: Control variables to isolate exercise’s effect.</p>
                    <p>Step 2: Explain: Matching age and health reduces their influence on heart rate.</p>
                    <p>Solution: Matching age and health controls variables to isolate exercise’s effect.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: To test if a new drug lowers blood pressure, two groups receive either the drug or a placebo. Groups are matched for weight and diet. Why match for weight and diet?",
                options: [
                    { text: "A) To control variables", correct: true },
                    { text: "B) To increase blood pressure", correct: false },
                    { text: "C) To vary the drug dose", correct: false },
                    { text: "D) To measure weight", correct: false }
                ],
                explanation: "Matching weight and diet controls these variables to isolate the drug’s effect, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Collecting Data",
                content: `
                    <h2>Example 4: Collecting Data</h2>
                    <p>Passage: In an experiment on soil pH and plant growth, a scientist measures plant height weekly and records soil pH daily to ensure consistency.</p>
                    <p>Question: Why measure soil pH daily?</p>
                    <p>Step 1: Identify purpose: Ensure soil pH remains constant as a controlled variable.</p>
                    <p>Step 2: Explain: Daily checks verify consistency, preventing pH changes from affecting results.</p>
                    <p>Solution: Daily soil pH measurements ensure consistency as a controlled variable.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: To study light intensity’s effect on photosynthesis, a scientist measures oxygen production and checks light intensity hourly. Why check light intensity hourly?",
                options: [
                    { text: "A) To maintain it as a controlled variable", correct: true },
                    { text: "B) To measure oxygen", correct: false },
                    { text: "C) To vary light intensity", correct: false },
                    { text: "D) To change photosynthesis rates", correct: false }
                ],
                explanation: "Hourly checks ensure light intensity remains consistent, controlling it, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Analyzing Data",
                content: `
                    <h2>Example 5: Analyzing Data</h2>
                    <p>Passage: A scientist tests if caffeine improves reaction time. Data shows the caffeine group has a mean reaction time of 0.3 seconds, compared to 0.5 seconds for the control group.</p>
                    <p>Question: What does the data suggest?</p>
                    <p>Step 1: Compare means: 0.3 seconds (caffeine) vs. 0.5 seconds (control).</p>
                    <p>Step 2: Interpret: Faster reaction time suggests caffeine improves performance.</p>
                    <p>Solution: The data suggests caffeine improves reaction time.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: An experiment tests if a fertilizer increases flower size. The fertilized group has a mean flower diameter of 5 cm, compared to 3 cm for the control group. What does the data suggest?",
                options: [
                    { text: "A) Fertilizer increases flower size", correct: true },
                    { text: "B) Fertilizer decreases flower size", correct: false },
                    { text: "C) Fertilizer has no effect", correct: false },
                    { text: "D) Flower size is unrelated to fertilizer", correct: false }
                ],
                explanation: "Larger mean diameter (5 cm vs. 3 cm) suggests fertilizer increases flower size, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Drawing Conclusions",
                content: `
                    <h2>Example 6: Drawing Conclusions</h2>
                    <p>Passage: An experiment tests if temperature affects bacterial growth. At 20°C, growth is slow; at 37°C, growth is rapid; at 50°C, no growth occurs.</p>
                    <p>Question: What conclusion can be drawn?</p>
                    <p>Step 1: Analyze data: Growth varies with temperature, peaking at 37°C.</p>
                    <p>Step 2: Conclude: Bacterial growth is optimal at 37°C.</p>
                    <p>Solution: Bacterial growth is optimal at 37°C.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: An experiment tests water pH’s effect on fish health. At pH 6, fish show stress; at pH 7, fish are healthy; at pH 8, stress reappears. What conclusion can be drawn?",
                options: [
                    { text: "A) Fish health is optimal at pH 7", correct: true },
                    { text: "B) Fish health improves at pH 6", correct: false },
                    { text: "C) Fish health is best at pH 8", correct: false },
                    { text: "D) pH has no effect on fish health", correct: false }
                ],
                explanation: "Healthiest fish at pH 7 suggests optimal conditions, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Replication and Validity",
                content: `
                    <h2>Example 7: Replication and Validity</h2>
                    <p>Passage: To ensure valid results, experiments are repeated. A study on sleep’s effect on memory is replicated with similar groups, yielding consistent results.</p>
                    <p>Question: Why replicate the experiment?</p>
                    <p>Step 1: Identify purpose: Replication confirms results.</p>
                    <p>Step 2: Explain: Consistent results across trials increase reliability.</p>
                    <p>Solution: Replication ensures valid and reliable results.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: A study on diet’s effect on cholesterol is repeated with different groups, producing similar results. Why repeat the study?",
                options: [
                    { text: "A) To confirm reliability", correct: true },
                    { text: "B) To change the diet", correct: false },
                    { text: "C) To measure cholesterol differently", correct: false },
                    { text: "D) To reduce participant numbers", correct: false }
                ],
                explanation: "Replication confirms consistent results, ensuring reliability, making A correct."
            }
        ]
    }
};

// Scientific method and experimental design question array
const scientificMethodQuestions = [
    {
        question: "Passage: In an experiment, the control group receives no treatment to serve as a baseline. In a study on a new vitamin’s effect on energy, the control group receives a placebo. What is the role of the control group?",
        answers: [
            { text: "A) Provide a baseline for comparison", correct: true },
            { text: "B) Receive the treatment", correct: false },
            { text: "C) Vary the independent variable", correct: false },
            { text: "D) Change the dependent variable", correct: false }
        ],
        explanation: "The passage states the control group serves as a baseline, making A correct.",
        difficulty: "easy",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        question: "A researcher tests the effect of sunlight on plant growth by placing one group of plants in full sunlight and another in shade. What is the independent variable in this experiment?",
        answers: [
            { text: "A) Amount of sunlight", correct: true },
            { text: "B) Plant growth rate", correct: false },
            { text: "C) Type of plant", correct: false },
            { text: "D) Amount of water", correct: false }
        ],
        explanation: "The independent variable is the factor manipulated by the researcher, which is the amount of sunlight in this experiment. Plant growth rate is the dependent variable, while plant type and water amount are potential controlled variables. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        question: "In an experiment, a scientist hypothesizes that fertilizer increases tomato yield. Which step of the scientific method involves testing this hypothesis?",
        answers: [
            { text: "A) Forming a conclusion", correct: false },
            { text: "B) Conducting an experiment", correct: true },
            { text: "C) Making observations", correct: false },
            { text: "D) Developing a hypothesis", correct: false }
        ],
        explanation: "Testing a hypothesis involves conducting an experiment to collect data and evaluate the hypothesis. Forming a conclusion follows data analysis, observations precede hypothesis development, and developing a hypothesis is the initial step. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        question: "A student tests how temperature affects bacterial growth, using three petri dishes at 20°C, 30°C, and 40°C. What is the dependent variable in this experiment?",
        answers: [
            { text: "A) Temperature", correct: false },
            { text: "B) Bacterial growth", correct: true },
            { text: "C) Petri dish size", correct: false },
            { text: "D) Type of bacteria", correct: false }
        ],
        explanation: "The dependent variable is the factor measured in response to the independent variable, which is bacterial growth in this case. Temperature is the independent variable, while petri dish size and bacteria type are controlled variables. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        question: "A researcher studies the effect of pH on enzyme activity and keeps temperature and enzyme concentration constant. What is the purpose of keeping these factors constant?",
        answers: [
            { text: "A) To isolate the effect of pH on enzyme activity", correct: true },
            { text: "B) To increase enzyme activity", correct: false },
            { text: "C) To simplify the hypothesis", correct: false },
            { text: "D) To reduce the need for data analysis", correct: false }
        ],
        explanation: "Keeping temperature and enzyme concentration constant isolates the effect of pH, ensuring that changes in enzyme activity are due to pH alone. The other options do not accurately describe the purpose of controlling variables. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        question: "In an experiment, a scientist observes that plants watered with rainwater grow taller than those watered with tap water. What is the next step in the scientific method?",
        answers: [
            { text: "A) Publish the results", correct: false },
            { text: "B) Form a conclusion", correct: false },
            { text: "C) Develop a hypothesis", correct: true },
            { text: "D) Conduct additional experiments", correct: false }
        ],
        explanation: "After making observations, the next step in the scientific method is to develop a hypothesis to explain the observation (e.g., rainwater promotes taller plant growth). Conducting experiments follows hypothesis formation, while conclusions and publishing come later. Thus, option C is correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        question: "A researcher designs an experiment to test the effect of light color on photosynthesis rate. They use red, blue, and green lights but notice the light intensity varies. How could this affect the experiment?",
        answers: [
            { text: "A) It simplifies the data collection", correct: false },
            { text: "B) It increases the sample size", correct: false },
            { text: "C) It reduces the need for controls", correct: false },
            { text: "D) It introduces a confounding variable", correct: true }
        ],
        explanation: "Varying light intensity introduces a confounding variable, as it could affect photosynthesis rate alongside light color, making it hard to isolate the effect of color. The other options do not describe the impact of this issue. Thus, option D is correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    }
];

// Variables
let categoryStats = {
    "ged-scientific-method-and-experimental-design": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-scientific-method-and-experimental-design"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-scientific-method-and-experimental-design"].incorrect++;
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
        case 1: return scientificMethodQuestions;
        default: return scientificMethodQuestions;
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
    let totalCorrect = categoryStats["ged-scientific-method-and-experimental-design"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-scientific-method-and-experimental-design"].incorrect;

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
    localStorage.setItem(`ged-scientific-method-and-experimental-design-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-scientific-method-and-experimental-design-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-scientific-method-and-experimental-design-lessonScore-${lessonId}`) || "Not completed yet";
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