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
    const lessonId = urlParams.get('lesson') || 18;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    18: {
        title: "Research Summary",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying the Hypothesis",
                passage: "A study tested whether caffeine improves memory. Researchers gave half the participants coffee and the other half a placebo, then tested recall.",
                content: `
                    <h2>Example 1: Identifying the Hypothesis</h2>
                    <p>Question: What is the hypothesis of the study?</p>
                    <p>Step 1: Analyze the study’s purpose: It tests caffeine’s effect on memory.</p>
                    <p>Step 2: Apply rule: The hypothesis is the proposed explanation being tested.</p>
                    <p>Solution: The hypothesis is that caffeine improves memory recall.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "A study examined if exercise reduces stress. Participants were split into exercise and non-exercise groups, then stress levels were measured.",
                question: "What is the hypothesis of the study?",
                options: [
                    { text: "A) Exercise reduces stress levels.", correct: true },
                    { text: "B) Exercise increases stress levels.", correct: false },
                    { text: "C) Stress levels affect exercise.", correct: false },
                    { text: "D) Exercise has no effect on stress.", correct: false }
                ],
                explanation: "The study tests if exercise reduces stress, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Understanding Methods",
                passage: "Researchers studied plant growth under different lights. They grew plants under red, blue, and white lights, measuring height after 4 weeks.",
                content: `
                    <h2>Example 2: Understanding Methods</h2>
                    <p>Question: What method did the researchers use to compare plant growth?</p>
                    <p>Step 1: Analyze the setup: Plants were exposed to different light colors, and height was measured.</p>
                    <p>Step 2: Apply rule: Methods describe how variables are tested.</p>
                    <p>Solution: The method involved growing plants under red, blue, and white lights and measuring their height after 4 weeks.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "A study tested diet’s effect on cholesterol. Participants followed low-fat or high-fat diets, and cholesterol was measured after 6 months.",
                question: "What method did the researchers use to compare cholesterol levels?",
                options: [
                    { text: "A) Assigning low-fat or high-fat diets and measuring cholesterol after 6 months", correct: true },
                    { text: "B) Measuring cholesterol before assigning diets", correct: false },
                    { text: "C) Using only one diet type for all participants", correct: false },
                    { text: "D) Testing cholesterol daily for 6 months", correct: false }
                ],
                explanation: "The method involves assigning diets and measuring cholesterol after 6 months, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Interpreting Results",
                passage: "A study on sleep found that participants sleeping 8 hours scored 85% on a cognitive test, while those sleeping 4 hours scored 70%.",
                content: `
                    <h2>Example 3: Interpreting Results</h2>
                    <p>Question: What do the results suggest about sleep and cognitive performance?</p>
                    <p>Step 1: Analyze data: 8-hour sleepers scored higher than 4-hour sleepers.</p>
                    <p>Step 2: Apply rule: Results show the outcome of the tested variable.</p>
                    <p>Solution: The results suggest that more sleep (8 hours) improves cognitive performance compared to less sleep (4 hours).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "A study on hydration found that athletes drinking water hourly ran 10% faster than those drinking every 2 hours.",
                question: "What do the results suggest about hydration and running speed?",
                options: [
                    { text: "A) More frequent hydration improves running speed.", correct: true },
                    { text: "B) Less frequent hydration improves running speed.", correct: false },
                    { text: "C) Hydration has no effect on running speed.", correct: false },
                    { text: "D) Running speed affects hydration.", correct: false }
                ],
                explanation: "Hourly hydration led to faster running, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Drawing Conclusions",
                passage: "A study tested music’s effect on focus. Students studying with classical music completed tasks 20% faster than those in silence.",
                content: `
                    <h2>Example 4: Drawing Conclusions</h2>
                    <p>Question: What conclusion can be drawn from the study?</p>
                    <p>Step 1: Analyze results: Classical music led to faster task completion.</p>
                    <p>Step 2: Apply rule: Conclusions summarize findings and their implications.</p>
                    <p>Solution: Classical music enhances focus, leading to faster task completion.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "A study on sunlight exposure found that workers with more window access reported 15% higher job satisfaction.",
                question: "What conclusion can be drawn from the study?",
                options: [
                    { text: "A) Sunlight exposure increases job satisfaction.", correct: true },
                    { text: "B) Sunlight exposure decreases job satisfaction.", correct: false },
                    { text: "C) Job satisfaction affects sunlight exposure.", correct: false },
                    { text: "D) Windows have no effect on workers.", correct: false }
                ],
                explanation: "More sunlight led to higher satisfaction, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Identifying Limitations",
                passage: "A study on meditation’s effect on anxiety used only young adults, finding a 25% anxiety reduction after 8 weeks.",
                content: `
                    <h2>Example 5: Identifying Limitations</h2>
                    <p>Question: What is a limitation of the study?</p>
                    <p>Step 1: Analyze the study: It only included young adults.</p>
                    <p>Step 2: Apply rule: Limitations are constraints on generalizing results.</p>
                    <p>Solution: The limitation is that results may not apply to other age groups.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "A study on diet and weight loss used only female participants, finding a 10% weight reduction after 12 weeks.",
                question: "What is a limitation of the study?",
                options: [
                    { text: "A) Results may not apply to males.", correct: true },
                    { text: "B) The study lasted too long.", correct: false },
                    { text: "C) Weight loss was not measured.", correct: false },
                    { text: "D) The diet was ineffective.", correct: false }
                ],
                explanation: "Using only females limits applicability to males, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Analyzing Implications",
                passage: "A study found that daily reading improved vocabulary by 30% in children, based on a 6-month trial.",
                content: `
                    <h2>Example 6: Analyzing Implications</h2>
                    <p>Question: What is an implication of the study’s findings?</p>
                    <p>Step 1: Analyze results: Reading improves vocabulary significantly.</p>
                    <p>Step 2: Apply rule: Implications suggest broader applications or actions.</p>
                    <p>Solution: The implication is that encouraging daily reading could enhance children’s language skills.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "A study found that walking 30 minutes daily lowered blood pressure by 10% in adults over 3 months.",
                question: "What is an implication of the study’s findings?",
                options: [
                    { text: "A) Daily walking could improve cardiovascular health.", correct: true },
                    { text: "B) Walking has no health benefits.", correct: false },
                    { text: "C) Blood pressure increases with walking.", correct: false },
                    { text: "D) Only adults benefit from walking.", correct: false }
                ],
                explanation: "Lowered blood pressure suggests cardiovascular benefits, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Comparing Studies",
                passage: "Study A tested vitamin C on colds, finding a 20% symptom reduction. Study B used zinc, finding a 15% reduction.",
                content: `
                    <h2>Example 7: Comparing Studies</h2>
                    <p>Question: What does comparing the studies imply about treatments?</p>
                    <p>Step 1: Analyze results: Vitamin C (20%) outperforms zinc (15%).</p>
                    <p>Step 2: Apply rule: Comparing studies reveals relative effectiveness.</p>
                    <p>Solution: Vitamin C may be more effective than zinc in reducing cold symptoms.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Study X tested yoga for stress, finding a 30% reduction. Study Y used meditation, finding a 25% reduction.",
                question: "What does comparing the studies imply about stress treatments?",
                options: [
                    { text: "A) Yoga may be more effective than meditation.", correct: true },
                    { text: "B) Meditation is more effective than yoga.", correct: false },
                    { text: "C) Both are equally effective.", correct: false },
                    { text: "D) Neither reduces stress.", correct: false }
                ],
                explanation: "Yoga’s 30% reduction outperforms meditation’s 25%, making A correct."
            }
        ]
    }
};

// ACT English question array (adapted for Research Summary)
const englishQuestions = [
    {
        passage: "A study tested if music aids memory. Participants listened to music or silence during learning, then took a recall test.",
        question: "What is the hypothesis of the study?",
        answers: [
            { text: "A) Music improves memory recall.", correct: true },
            { text: "B) Music hinders memory recall.", correct: false },
            { text: "C) Silence improves memory recall.", correct: false },
            { text: "D) Music has no effect on memory.", correct: false }
        ],
        explanation: "The study tests music’s effect on memory, implying improvement, making A correct.",
        difficulty: "easy",
        category: "act-research-summary"
    },
    {
        passage: "A study on soil types grew crops in sandy and clay soils, measuring yield after 10 weeks.",
        question: "What method did the researchers use to compare crop yields?",
        answers: [
            { text: "A) Growing crops in sandy and clay soils, measuring yield after 10 weeks", correct: true },
            { text: "B) Measuring yield before planting crops", correct: false },
            { text: "C) Using one soil type for all crops", correct: false },
            { text: "D) Testing yield daily for 10 weeks", correct: false }
        ],
        explanation: "The method involves different soils and measuring yield after 10 weeks, making A correct.",
        difficulty: "medium",
        category: "act-research-summary"
    },
    {
        passage: "A study on screen time found that teens with 2 hours daily scored 80% on focus tests, while those with 6 hours scored 65%.",
        question: "What do the results suggest about screen time and focus?",
        answers: [
            { text: "A) Less screen time improves focus.", correct: true },
            { text: "B) More screen time improves focus.", correct: false },
            { text: "C) Screen time has no effect on focus.", correct: false },
            { text: "D) Focus affects screen time.", correct: false }
        ],
        explanation: "Lower screen time led to higher focus scores, making A correct.",
        difficulty: "medium",
        category: "act-research-summary"
    },
    {
        passage: "A study on journaling found that daily writers reported 20% higher emotional well-being than non-writers.",
        question: "What conclusion can be drawn from the study?",
        answers: [
            { text: "A) Journaling improves emotional well-being.", correct: true },
            { text: "B) Journaling decreases emotional well-being.", correct: false },
            { text: "C) Emotional well-being affects journaling.", correct: false },
            { text: "D) Journaling has no effect on well-being.", correct: false }
        ],
        explanation: "Higher well-being with journaling suggests improvement, making A correct.",
        difficulty: "easy",
        category: "act-research-summary"
    },
    {
        passage: "A study on fish diets used only freshwater species, finding a 15% growth increase with protein supplements.",
        question: "What is a limitation of the study?",
        answers: [
            { text: "A) Results may not apply to saltwater fish.", correct: true },
            { text: "B) The study duration was too short.", correct: false },
            { text: "C) Growth was not measured.", correct: false },
            { text: "D) The diet was ineffective.", correct: false }
        ],
        explanation: "Using only freshwater fish limits applicability to saltwater species, making A correct.",
        difficulty: "medium",
        category: "act-research-summary"
    },
    {
        passage: "A study found that 10 minutes of daily stretching reduced muscle pain by 25% in office workers.",
        question: "What is an implication of the study’s findings?",
        answers: [
            { text: "A) Daily stretching could reduce workplace discomfort.", correct: true },
            { text: "B) Stretching increases muscle pain.", correct: false },
            { text: "C) Muscle pain affects stretching.", correct: false },
            { text: "D) Stretching has no workplace benefits.", correct: false }
        ],
        explanation: "Reduced pain suggests workplace benefits, making A correct.",
        difficulty: "medium",
        category: "act-research-summary"
    },
    {
        passage: "Study 1 tested green tea on fatigue, finding a 20% energy increase. Study 2 used coffee, finding a 15% increase.",
        question: "What does comparing the studies imply about energy treatments?",
        answers: [
            { text: "A) Green tea may be more effective than coffee.", correct: true },
            { text: "B) Coffee is more effective than green tea.", correct: false },
            { text: "C) Both are equally effective.", correct: false },
            { text: "D) Neither increases energy.", correct: false }
        ],
        explanation: "Green tea’s 20% increase outperforms coffee’s 15%, making A correct.",
        difficulty: "medium",
        category: "act-research-summary"
    }
];

// Variables
let categoryStats = {
    "act-research-summary": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "18";
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
        categoryStats["act-research-summary"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-research-summary"].incorrect++;
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
        case 18: return englishQuestions;
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
        category: "act-research-summary",
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
    let totalCorrect = categoryStats["act-research-summary"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-research-summary"].incorrect;

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
    localStorage.setItem(`act-research-summary-lessonScore-${lessonId}`, score);
    console.log(`Saved act-research-summary-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-research-summary-lessonScore-${lessonId}`) || "Not completed yet";
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