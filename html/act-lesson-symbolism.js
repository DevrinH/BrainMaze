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
    const lessonId = urlParams.get('lesson') || 10;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    10: {
        title: "Symbolism",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying a Symbol",
                passage: "In the story, the old oak tree stood tall, its branches sheltering the village through every storm.",
                content: `
                    <h2>Example 1: Identifying a Symbol</h2>
                    <p>Question: What does the oak tree symbolize in the passage?</p>
                    <p>Step 1: Analyze context: The tree shelters the village consistently.</p>
                    <p>Step 2: Apply rule: Symbols are objects with deeper meanings tied to the narrative.</p>
                    <p>Solution: The oak tree symbolizes strength and protection for the village.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The novel describes a river that flows steadily, guiding travelers to safety.",
                question: "What does the river likely symbolize?",
                options: [
                    { text: "A) Guidance and hope", correct: true },
                    { text: "B) Danger and chaos", correct: false },
                    { text: "C) Isolation and fear", correct: false },
                    { text: "D) Wealth and power", correct: false }
                ],
                explanation: "Guiding travelers suggests the river symbolizes guidance and hope, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Interpreting Symbolic Meaning",
                passage: "The character clutched a faded locket, a reminder of her lost family.",
                content: `
                    <h2>Example 2: Interpreting Symbolic Meaning</h2>
                    <p>Question: What does the locket symbolize?</p>
                    <p>Step 1: Analyze context: The locket is tied to lost family and emotional attachment.</p>
                    <p>Step 2: Apply rule: Symbols reflect themes or emotions through context.</p>
                    <p>Solution: The locket symbolizes memory and enduring love for her family.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "He wore a tattered scarf, a keepsake from his childhood home.",
                question: "What does the scarf symbolize?",
                options: [
                    { text: "A) Nostalgia and connection to the past", correct: true },
                    { text: "B) Wealth and status", correct: false },
                    { text: "C) Fear and uncertainty", correct: false },
                    { text: "D) Freedom and adventure", correct: false }
                ],
                explanation: "A childhood keepsake suggests nostalgia, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Symbolism and Theme",
                passage: "The story’s broken clock tower loomed over the town, its hands frozen at midnight.",
                content: `
                    <h2>Example 3: Symbolism and Theme</h2>
                    <p>Question: How does the clock tower symbolize the story’s theme?</p>
                    <p>Step 1: Analyze context: A broken, frozen clock suggests stagnation.</p>
                    <p>Step 2: Apply rule: Symbols often reinforce the central theme.</p>
                    <p>Solution: The clock tower symbolizes a theme of time standing still or a town stuck in the past.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "A wilted rose lay on the grave, central to the poem’s imagery.",
                question: "How does the rose symbolize the poem’s theme?",
                options: [
                    { text: "A) Loss and faded love", correct: true },
                    { text: "B) Growth and renewal", correct: false },
                    { text: "C) Wealth and beauty", correct: false },
                    { text: "D) Strength and resilience", correct: false }
                ],
                explanation: "A wilted rose on a grave suggests loss, aligning with a theme of faded love, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Symbolism Through Actions",
                passage: "The character burned her old letters in the fire, watching the ashes rise.",
                content: `
                    <h2>Example 4: Symbolism Through Actions</h2>
                    <p>Question: What does burning the letters symbolize?</p>
                    <p>Step 1: Analyze action: Burning letters implies letting go of the past.</p>
                    <p>Step 2: Apply rule: Symbolic actions reflect emotional or thematic shifts.</p>
                    <p>Solution: Burning the letters symbolizes release or closure from past connections.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "He tore down the old family portrait, scattering its pieces.",
                question: "What does tearing down the portrait symbolize?",
                options: [
                    { text: "A) Rejection of family ties", correct: true },
                    { text: "B) Celebration of family", correct: false },
                    { text: "C) Desire for new art", correct: false },
                    { text: "D) Respect for tradition", correct: false }
                ],
                explanation: "Tearing and scattering suggests rejection, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Symbolism and Emotion",
                passage: "The storm raged outside as the character sat alone, staring at a flickering candle.",
                content: `
                    <h2>Example 5: Symbolism and Emotion</h2>
                    <p>Question: What does the candle symbolize in this context?</p>
                    <p>Step 1: Analyze context: A storm and solitude contrast with a flickering candle.</p>
                    <p>Step 2: Apply rule: Symbols often reflect characters’ emotional states.</p>
                    <p>Solution: The candle symbolizes fragile hope or resilience amidst turmoil.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In despair, she clutched a single blooming flower during the bleak winter.",
                question: "What does the flower symbolize?",
                options: [
                    { text: "A) Hope in difficult times", correct: true },
                    { text: "B) Despair and loss", correct: false },
                    { text: "C) Wealth in winter", correct: false },
                    { text: "D) Fear of change", correct: false }
                ],
                explanation: "Clutching a flower in despair suggests hope, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Contextual Symbolism",
                passage: "In the war-torn city, a white dove flew over the ruins, noticed by survivors.",
                content: `
                    <h2>Example 6: Contextual Symbolism</h2>
                    <p>Question: What does the white dove symbolize?</p>
                    <p>Step 1: Analyze context: A war-torn setting contrasts with a dove, a common peace symbol.</p>
                    <p>Step 2: Apply rule: Context shapes a symbol’s meaning.</p>
                    <p>Solution: The white dove symbolizes peace or hope for recovery.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Amid the protest, a child released a red balloon into the sky.",
                question: "What does the red balloon likely symbolize?",
                options: [
                    { text: "A) Freedom or aspiration", correct: true },
                    { text: "B) Conflict and anger", correct: false },
                    { text: "C) Fear and retreat", correct: false },
                    { text: "D) Wealth and luxury", correct: false }
                ],
                explanation: "Releasing a balloon in a protest suggests freedom or hope, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Symbolism and Narrative Role",
                passage: "The character’s journey ended at a crossroads, where she chose a path under a starry sky.",
                content: `
                    <h2>Example 7: Symbolism and Narrative Role</h2>
                    <p>Question: What does the crossroads symbolize?</p>
                    <p>Step 1: Analyze context: A journey’s end at a crossroads implies a decision point.</p>
                    <p>Step 2: Apply rule: Symbols enhance narrative turning points.</p>
                    <p>Solution: The crossroads symbolizes a critical life choice or transition.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The story closed with the hero standing before a locked gate, key in hand.",
                question: "What does the locked gate symbolize?",
                options: [
                    { text: "A) Opportunity or challenge", correct: true },
                    { text: "B) Failure and defeat", correct: false },
                    { text: "C) Wealth and reward", correct: false },
                    { text: "D) Isolation and despair", correct: false }
                ],
                explanation: "A gate with a key suggests potential or a challenge, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "The poem featured a raven perched on a barren tree, watching silently.",
        question: "What does the raven likely symbolize?",
        answers: [
            { text: "A) Mystery or foreboding", correct: true },
            { text: "B) Joy and vitality", correct: false },
            { text: "C) Wealth and success", correct: false },
            { text: "D) Peace and harmony", correct: false }
        ],
        explanation: "A silent raven on a barren tree suggests ominous mystery, making A correct.",
        difficulty: "easy",
        category: "act-symbolism"
    },
    {
        passage: "She kept a cracked mirror, reflecting her struggles over the years.",
        question: "What does the cracked mirror symbolize?",
        answers: [
            { text: "A) Brokenness or hardship", correct: true },
            { text: "B) Beauty and confidence", correct: false },
            { text: "C) Wealth and luxury", correct: false },
            { text: "D) Clarity and truth", correct: false }
        ],
        explanation: "Reflecting struggles suggests the mirror symbolizes hardship, making A correct.",
        difficulty: "medium",
        category: "act-symbolism"
    },
    {
        passage: "The novel’s abandoned lighthouse stood dark, no longer guiding ships.",
        question: "How does the lighthouse symbolize the story’s theme?",
        answers: [
            { text: "A) Loss of direction or hope", correct: true },
            { text: "B) Strength and guidance", correct: false },
            { text: "C) Adventure and discovery", correct: false },
            { text: "D) Prosperity and growth", correct: false }
        ],
        explanation: "A dark lighthouse suggests a theme of lost guidance, making A correct.",
        difficulty: "medium",
        category: "act-symbolism"
    },
    {
        passage: "The character shattered his old trophy, leaving its pieces behind.",
        question: "What does shattering the trophy symbolize?",
        answers: [
            { text: "A) Moving on from past achievements", correct: true },
            { text: "B) Celebrating past victories", correct: false },
            { text: "C) Desire for new trophies", correct: false },
            { text: "D) Respect for old successes", correct: false }
        ],
        explanation: "Shattering and leaving pieces suggests letting go, making A correct.",
        difficulty: "medium",
        category: "act-symbolism"
    },
    {
        passage: "In grief, he stared at a single star shining through the night sky.",
        question: "What does the star symbolize?",
        answers: [
            { text: "A) Hope or remembrance", correct: true },
            { text: "B) Despair or loneliness", correct: false },
            { text: "C) Wealth or fame", correct: false },
            { text: "D) Fear or danger", correct: false }
        ],
        explanation: "A shining star in grief suggests hope or memory, making A correct.",
        difficulty: "medium",
        category: "act-symbolism"
    },
    {
        passage: "In the ruined village, a single green sprout emerged from the rubble.",
        question: "What does the green sprout symbolize?",
        answers: [
            { text: "A) Renewal or resilience", correct: true },
            { text: "B) Destruction or loss", correct: false },
            { text: "C) Wealth or prosperity", correct: false },
            { text: "D) Fear or retreat", correct: false }
        ],
        explanation: "A sprout in rubble suggests renewal, making A correct.",
        difficulty: "easy",
        category: "act-symbolism"
    },
    {
        passage: "The story ended with her standing at a fork in the road, uncertain.",
        question: "What does the fork in the road symbolize?",
        answers: [
            { text: "A) A pivotal decision", correct: true },
            { text: "B) A completed journey", correct: false },
            { text: "C) A safe destination", correct: false },
            { text: "D) A lost opportunity", correct: false }
        ],
        explanation: "Uncertainty at a fork suggests a decision point, making A correct.",
        difficulty: "medium",
        category: "act-symbolism"
    }
];

// Variables
let categoryStats = {
    "act-symbolism": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "10";
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
        categoryStats["act-symbolism"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-symbolism"].incorrect++;
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
        case 10: return englishQuestions;
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
        category: "act-symbolism",
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
    let totalCorrect = categoryStats["act-symbolism"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-symbolism"].incorrect;

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
    localStorage.setItem(`act-symbolism-lessonScore-${lessonId}`, score);
    console.log(`Saved act-symbolism-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-symbolism-lessonScore-${lessonId}`) || "Not completed yet";
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