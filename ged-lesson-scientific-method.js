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
                passage: "In 2023, a research team in Millville proposed a hypothesis to study cognitive performance: 'Increasing water intake improves memory in students.' The team planned to measure water consumption and memory test scores to evaluate this claim in a controlled classroom setting.",
                question: "Why is this hypothesis testable?",
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
                passage: "In 2024, a laboratory in Greenvale conducted an experiment to test how temperature affects enzyme activity. Temperature was varied as the independent variable, enzyme activity was measured as the dependent variable, and pH was kept constant as a controlled variable to ensure reliable results.",
                question: "What is the independent variable?",
                options: [
                    { text: "A) Enzyme activity", correct: false },
                    { text: "B) Temperature", correct: true },
                    { text: "C) pH", correct: false },
                    { text: "D) Time", correct: false }
                ],
                explanation: "The passage states temperature is the independent variable, manipulated to observe its effect, making B correct."
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
                passage: "In 2023, a clinical trial in Clearwater tested whether a new drug lowers blood pressure. Two groups received either the drug or a placebo, and were matched for weight and diet to ensure comparable baseline conditions. This setup was critical for accurate results.",
                question: "Why match the groups for weight and diet?",
                options: [
                    { text: "A) To increase blood pressure", correct: false },
                    { text: "B) To vary the drug dose", correct: false },
                    { text: "C) To control variables", correct: true },
                    { text: "D) To measure weight", correct: false }
                ],
                explanation: "Matching weight and diet controls these variables to isolate the drug’s effect, making C correct."
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
                passage: "In 2024, a botanical study in Millville investigated how light intensity affects photosynthesis rates. The researcher measured oxygen production daily and checked light intensity hourly to maintain stable conditions throughout the experiment, ensuring accurate data collection.",
                question: "Why check light intensity hourly?",
                options: [
                    { text: "A) To vary light intensity", correct: false },
                    { text: "B) To measure oxygen", correct: false },
                    { text: "C) To change photosynthesis rates", correct: false },
                    { text: "D) To maintain it as a controlled variable", correct: true }
                ],
                explanation: "Hourly checks ensure light intensity remains consistent, controlling it, making D correct."
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
                passage: "In 2023, an agricultural experiment in Greenvale tested whether a new fertilizer increases flower size. The fertilized group had a mean flower diameter of 5 cm, compared to 3 cm for the control group. The study aimed to inform farming practices with reliable data.",
                question: "What does the data suggest?",
                options: [
                    { text: "A) Fertilizer decreases flower size", correct: false },
                    { text: "B) Fertilizer increases flower size", correct: true },
                    { text: "C) Fertilizer has no effect", correct: false },
                    { text: "D) Flower size is unrelated to fertilizer", correct: false }
                ],
                explanation: "Larger mean diameter (5 cm vs. 3 cm) suggests fertilizer increases flower size, making B correct."
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
                passage: "In 2024, an environmental study in Clearwater tested water pH’s effect on fish health. At pH 6, fish showed stress; at pH 7, fish were healthy; at pH 8, stress reappeared. The study provided insights for maintaining aquatic ecosystems under varying conditions.",
                question: "What conclusion can be drawn?",
                options: [
                    { text: "A) Fish health improves at pH 6", correct: false },
                    { text: "B) pH has no effect on fish health", correct: false },
                    { text: "C) Fish health is optimal at pH 7", correct: true },
                    { text: "D) Fish health is best at pH 8", correct: false }
                ],
                explanation: "Healthiest fish at pH 7 suggests optimal conditions, making C correct."
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
                passage: "In 2023, a health study in Millville examined the effect of diet on cholesterol levels. The study was repeated with different groups, producing similar results each time. This repetition was crucial to validate the findings for broader application in dietary guidelines.",
                question: "Why repeat the study?",
                options: [
                    { text: "A) To change the diet", correct: false },
                    { text: "B) To measure cholesterol differently", correct: false },
                    { text: "C) To reduce participant numbers", correct: false },
                    { text: "D) To confirm reliability", correct: true }
                ],
                explanation: "Replication confirms consistent results, ensuring reliability, making D correct."
            }
        ]
    }
};

// Scientific method and experimental design question array
const scientificMethodQuestions = [
    {
        passage: "In 2023, a research team in Millville designed an experiment to study the effect of a new vitamin supplement on energy levels. The control group received a placebo to serve as a baseline, while the experimental group received the vitamin, ensuring a clear comparison of energy outcomes.",
        question: "What is the role of the control group?",
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
        passage: "In 2024, a study in Greenvale hypothesized that increased humidity improves seed germination rates. The experiment compared germination in high and low humidity environments, measuring seed sprouting percentages. This setup allowed researchers to test the hypothesis under controlled conditions.",
        question: "Why is this hypothesis testable?",
        answers: [
            { text: "A) It avoids specifying variables", correct: false },
            { text: "B) It links measurable variables like humidity and germination rate", correct: true },
            { text: "C) It is based on unmeasurable outcomes", correct: false },
            { text: "D) It requires no experimental setup", correct: false }
        ],
        explanation: "The hypothesis links humidity (manipulable) and germination rate (measurable), making it testable, so B is correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        passage: "In 2023, an agricultural study in Clearwater tested whether a new fertilizer enhances corn yield. The scientist measured corn yield in fertilized and unfertilized fields, controlling for soil type and water amount to isolate the fertilizer’s effect on crop production.",
        question: "What is the dependent variable in this experiment?",
        answers: [
            { text: "A) Fertilizer amount", correct: false },
            { text: "B) Soil type", correct: false },
            { text: "C) Corn yield", correct: true },
            { text: "D) Water amount", correct: false }
        ],
        explanation: "The dependent variable is the outcome measured, which is corn yield, making C correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        passage: "In 2024, a health experiment in Millville tested how exercise frequency affects blood oxygen levels. Groups exercised 0, 3, or 5 days a week, with diets kept similar across groups to ensure the exercise variable was isolated. This control was critical for valid results.",
        question: "Why is diet controlled?",
        answers: [
            { text: "A) To increase blood oxygen levels", correct: false },
            { text: "B) To isolate the effect of exercise frequency", correct: true },
            { text: "C) To vary the independent variable", correct: false },
            { text: "D) To measure diet’s effect", correct: false }
        ],
        explanation: "Controlling diet isolates exercise’s effect on oxygen levels, making B correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        passage: "In 2023, a psychology study in Greenvale examined noise levels’ impact on concentration. Participants’ focus scores were recorded under quiet, moderate, and loud conditions, with noise levels checked every 10 minutes to maintain consistency throughout the testing period.",
        question: "Why check noise levels frequently?",
        answers: [
            { text: "A) To vary noise as the independent variable", correct: false },
            { text: "B) To measure concentration", correct: false },
            { text: "C) To ensure consistent noise conditions", correct: true },
            { text: "D) To change focus scores", correct: false }
        ],
        explanation: "Frequent checks ensure noise levels remain consistent, making C correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        passage: "In 2024, a nutritional study in Clearwater tested whether sugar intake affects reaction time. The sugar group had a mean reaction time of 0.4 seconds, compared to 0.6 seconds for the no-sugar group, suggesting a potential link between diet and cognitive performance.",
        question: "What conclusion can be drawn from this data?",
        answers: [
            { text: "A) Sugar intake improves reaction time", correct: true },
            { text: "B) Sugar intake slows reaction time", correct: false },
            { text: "C) Sugar intake has no effect", correct: false },
            { text: "D) Reaction time is unrelated to diet", correct: false }
        ],
        explanation: "Faster reaction time (0.4 vs. 0.6 seconds) suggests sugar improves reaction time, making A correct.",
        difficulty: "medium",
        category: "ged-scientific-method-and-experimental-design"
    },
    {
        passage: "In 2023, a medical study in Millville investigated sleep duration’s effect on memory performance. The study was repeated across multiple groups, yielding similar results each time. This repetition strengthened the findings, supporting their use in health recommendations.",
        question: "What does this replication achieve?",
        answers: [
            { text: "A) It changes the independent variable", correct: false },
            { text: "B) It reduces the sample size", correct: false },
            { text: "C) It increases result reliability", correct: true },
            { text: "D) It simplifies data collection", correct: false }
        ],
        explanation: "Replication increases the reliability of the findings, making C correct.",
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