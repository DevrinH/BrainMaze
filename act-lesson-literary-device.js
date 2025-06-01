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
    const lessonId = urlParams.get('lesson') || 11;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    11: {
        title: "Literary Device",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying a Metaphor",
                passage: "Her heart was a locked vault, guarding secrets from the world.",
                content: `
                    <h2>Example 1: Identifying a Metaphor</h2>
                    <p>Question: What literary device is used in the passage?</p>
                    <p>Step 1: Analyze the phrase: Comparing a heart to a vault without 'like' or 'as'.</p>
                    <p>Step 2: Apply rule: A metaphor directly equates two unlike things.</p>
                    <p>Solution: The passage uses a metaphor, comparing the heart to a locked vault to suggest secrecy.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "His mind was a sharp blade, cutting through complex problems.",
                question: "What literary device is used?",
                options: [
                    { text: "A) Metaphor", correct: true },
                    { text: "B) Simile", correct: false },
                    { text: "C) Personification", correct: false },
                    { text: "D) Alliteration", correct: false }
                ],
                explanation: "Comparing the mind to a blade without 'like' or 'as' is a metaphor, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Analyzing a Simile",
                passage: "The storm raged like an angry beast, shaking the village.",
                content: `
                    <h2>Example 2: Analyzing a Simile</h2>
                    <p>Question: What is the effect of the simile in the passage?</p>
                    <p>Step 1: Identify the simile: The storm is compared to a beast using 'like'.</p>
                    <p>Step 2: Apply rule: Similes create vivid imagery to enhance tone or emotion.</p>
                    <p>Solution: The simile emphasizes the storm’s ferocity, creating a menacing tone.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Her laughter sparkled like stars in the night sky.",
                question: "What is the effect of the simile?",
                options: [
                    { text: "A) It conveys joy and brightness.", correct: true },
                    { text: "B) It suggests sadness and darkness.", correct: false },
                    { text: "C) It implies confusion and chaos.", correct: false },
                    { text: "D) It highlights anger and tension.", correct: false }
                ],
                explanation: "Comparing laughter to sparkling stars suggests joy and brightness, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Recognizing Personification",
                passage: "The wind whispered secrets through the ancient trees.",
                content: `
                    <h2>Example 3: Recognizing Personification</h2>
                    <p>Question: What literary device is used, and what is its effect?</p>
                    <p>Step 1: Analyze the phrase: The wind is given human ability to whisper.</p>
                    <p>Step 2: Apply rule: Personification attributes human traits to non-human things.</p>
                    <p>Solution: Personification makes the wind seem alive, creating a mysterious, intimate mood.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "The old house groaned under the weight of its memories.",
                question: "What literary device is used?",
                options: [
                    { text: "A) Personification", correct: true },
                    { text: "B) Metaphor", correct: false },
                    { text: "C) Simile", correct: false },
                    { text: "D) Irony", correct: false }
                ],
                explanation: "The house groaning like a human is personification, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Understanding Irony",
                passage: "The fire station burned down while the crew was away.",
                content: `
                    <h2>Example 4: Understanding Irony</h2>
                    <p>Question: What type of irony is present, and what is its effect?</p>
                    <p>Step 1: Analyze the situation: A fire station burning is unexpected.</p>
                    <p>Step 2: Apply rule: Situational irony occurs when outcomes contradict expectations.</p>
                    <p>Solution: Situational irony highlights the absurdity, evoking surprise or humor.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "The thief was robbed of his stolen goods that night.",
                question: "What type of irony is present?",
                options: [
                    { text: "A) Situational irony", correct: true },
                    { text: "B) Verbal irony", correct: false },
                    { text: "C) Dramatic irony", correct: false },
                    { text: "D) Metaphor", correct: false }
                ],
                explanation: "A thief being robbed is an unexpected outcome, indicating situational irony, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Identifying Alliteration",
                passage: "The silvery stream sparkled softly in the sunlight.",
                content: `
                    <h2>Example 5: Identifying Alliteration</h2>
                    <p>Question: What literary device is used, and what is its effect?</p>
                    <p>Step 1: Analyze the phrase: Repeated 's' sounds stand out.</p>
                    <p>Step 2: Apply rule: Alliteration repeats initial consonant sounds for rhythm.</p>
                    <p>Solution: Alliteration enhances the musicality, creating a soothing, flowing effect.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The bitter breeze blew briskly through the barren branches.",
                question: "What literary device is used?",
                options: [
                    { text: "A) Alliteration", correct: true },
                    { text: "B) Personification", correct: false },
                    { text: "C) Simile", correct: false },
                    { text: "D) Irony", correct: false }
                ],
                explanation: "Repeated 'b' sounds indicate alliteration, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Analyzing Imagery",
                passage: "The crimson sunset bled across the horizon, casting shadows over the silent valley.",
                content: `
                    <h2>Example 6: Analyzing Imagery</h2>
                    <p>Question: What is the effect of the imagery in the passage?</p>
                    <p>Step 1: Analyze description: Vivid colors and actions evoke a scene.</p>
                    <p>Step 2: Apply rule: Imagery uses sensory details to create mood or atmosphere.</p>
                    <p>Solution: The imagery creates a dramatic, melancholic mood, enhancing the scene’s emotional depth.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Golden wheat swayed under a sapphire sky, buzzing with life.",
                question: "What is the effect of the imagery?",
                options: [
                    { text: "A) It evokes a vibrant, lively atmosphere.", correct: true },
                    { text: "B) It creates a dark, ominous mood.", correct: false },
                    { text: "C) It suggests chaos and confusion.", correct: false },
                    { text: "D) It conveys a sense of loss.", correct: false }
                ],
                explanation: "Bright colors and buzzing life suggest vibrancy, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Recognizing Foreshadowing",
                passage: "A single crow circled above the village, its caw echoing before the storm arrived.",
                content: `
                    <h2>Example 7: Recognizing Foreshadowing</h2>
                    <p>Question: What literary device is used, and what does it suggest?</p>
                    <p>Step 1: Analyze context: A crow and storm hint at trouble.</p>
                    <p>Step 2: Apply rule: Foreshadowing hints at future events.</p>
                    <p>Solution: Foreshadowing suggests an impending conflict or disaster.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Dark clouds gathered as the hero entered the abandoned castle.",
                question: "What literary device is used, and what does it suggest?",
                options: [
                    { text: "A) Foreshadowing, hinting at danger", correct: true },
                    { text: "B) Metaphor, comparing clouds to heroes", correct: false },
                    { text: "C) Alliteration, emphasizing sound", correct: false },
                    { text: "D) Simile, describing the castle", correct: false }
                ],
                explanation: "Dark clouds before entering suggest danger, indicating foreshadowing, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "Her dreams soared like a kite in the boundless sky.",
        question: "What literary device is used?",
        answers: [
            { text: "A) Simile", correct: true },
            { text: "B) Metaphor", correct: false },
            { text: "C) Personification", correct: false },
            { text: "D) Irony", correct: false }
        ],
        explanation: "Comparing dreams to a kite using 'like' is a simile, making A correct.",
        difficulty: "easy",
        category: "act-literary-device"
    },
    {
        passage: "The moon wept silver tears over the silent valley.",
        question: "What literary device is used?",
        answers: [
            { text: "A) Personification", correct: true },
            { text: "B) Simile", correct: false },
            { text: "C) Alliteration", correct: false },
            { text: "D) Foreshadowing", correct: false }
        ],
        explanation: "The moon weeping like a human is personification, making A correct.",
        difficulty: "medium",
        category: "act-literary-device"
    },
    {
        passage: "The weather forecaster predicted clear skies, but a storm hit that afternoon.",
        question: "What type of irony is present?",
        answers: [
            { text: "A) Situational irony", correct: true },
            { text: "B) Verbal irony", correct: false },
            { text: "C) Dramatic irony", correct: false },
            { text: "D) Metaphor", correct: false }
        ],
        explanation: "The unexpected storm contradicts the prediction, indicating situational irony, making A correct.",
        difficulty: "medium",
        category: "act-literary-device"
    },
    {
        passage: "Sleek shadows slithered silently across the stone wall.",
        question: "What literary device is used?",
        answers: [
            { text: "A) Alliteration", correct: true },
            { text: "B) Simile", correct: false },
            { text: "C) Irony", correct: false },
            { text: "D) Imagery", correct: false }
        ],
        explanation: "Repeated 's' sounds indicate alliteration, making A correct.",
        difficulty: "easy",
        category: "act-literary-device"
    },
    {
        passage: "The icy wind howled, clawing at the traveler’s worn coat.",
        question: "What is the effect of the imagery?",
        answers: [
            { text: "A) It creates a harsh, threatening atmosphere.", correct: true },
            { text: "B) It evokes a calm, peaceful mood.", correct: false },
            { text: "C) It suggests warmth and comfort.", correct: false },
            { text: "D) It conveys joy and excitement.", correct: false }
        ],
        explanation: "Howling wind and clawing suggest a threatening mood, making A correct.",
        difficulty: "medium",
        category: "act-literary-device"
    },
    {
        passage: "A single red leaf fell slowly before the autumn winds arrived.",
        question: "What literary device is used, and what does it suggest?",
        answers: [
            { text: "A) Foreshadowing, hinting at change", correct: true },
            { text: "B) Metaphor, comparing leaves to winds", correct: false },
            { text: "C) Personification, giving leaves human traits", correct: false },
            { text: "D) Simile, describing the fall", correct: false }
        ],
        explanation: "A falling leaf before winds suggests coming change, indicating foreshadowing, making A correct.",
        difficulty: "medium",
        category: "act-literary-device"
    },
    {
        passage: "Life is a winding river, carving paths through uncharted lands.",
        question: "What literary device is used?",
        answers: [
            { text: "A) Metaphor", correct: true },
            { text: "B) Simile", correct: false },
            { text: "C) Alliteration", correct: false },
            { text: "D) Irony", correct: false }
        ],
        explanation: "Comparing life to a river without 'like' or 'as' is a metaphor, making A correct.",
        difficulty: "easy",
        category: "act-literary-device"
    }
];

// Variables
let categoryStats = {
    "act-literary-device": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "11";
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
        categoryStats["act-literary-device"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-literary-device"].incorrect++;
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
        case 11: return englishQuestions;
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
        category: "act-literary-device",
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
    let totalCorrect = categoryStats["act-literary-device"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-literary-device"].incorrect;

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
    localStorage.setItem(`act-literary-device-lessonScore-${lessonId}`, score);
    console.log(`Saved act-literary-device-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-literary-device-lessonScore-${lessonId}`) || "Not completed yet";
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