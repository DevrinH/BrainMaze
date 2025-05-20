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
    const lessonId = urlParams.get('lesson') || 9;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    9: {
        title: "Vocabulary in Context",
        content: [
            {
                type: "example",
                title: "Example 1: Determining Word Meaning",
                passage: "The politician’s decision to ignore the evidence was deemed utterly futile by analysts.",
                content: `
                    <h2>Example 1: Determining Word Meaning</h2>
                    <p>Question: What does "futile" mean in this context?</p>
                    <p>Step 1: Analyze context: Ignoring evidence is ineffective or pointless.</p>
                    <p>Step 2: Apply rule: Context clues like "ignore" and "analysts" suggest a negative outcome.</p>
                    <p>Solution: "Futile" means ineffective or useless in this context.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The chef’s attempt to revive the old recipe was considered futile by critics.",
                question: "What does 'futile' mean in this context?",
                options: [
                    { text: "A) Pointless", correct: true },
                    { text: "B) Successful", correct: false },
                    { text: "C) Delicious", correct: false },
                    { text: "D) Creative", correct: false }
                ],
                explanation: "The critical tone suggests the attempt failed, so 'futile' means pointless, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Identifying Synonyms",
                passage: "The explorer’s audacious journey through the jungle amazed the audience.",
                content: `
                    <h2>Example 2: Identifying Synonyms</h2>
                    <p>Question: Which word is a synonym for 'audacious' in this context?</p>
                    <p>Step 1: Analyze context: The journey amazed, implying boldness.</p>
                    <p>Step 2: Apply rule: Synonyms match the word’s meaning in the sentence.</p>
                    <p>Solution: 'Audacious' means bold, so a synonym is 'daring.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Her audacious speech challenged the committee’s outdated views.",
                question: "Which word is a synonym for 'audacious'?",
                options: [
                    { text: "A) Bold", correct: true },
                    { text: "B) Timid", correct: false },
                    { text: "C) Polite", correct: false },
                    { text: "D) Confusing", correct: false }
                ],
                explanation: "Challenging outdated views suggests boldness, so 'audacious' means bold, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Understanding Connotations",
                passage: "The critic described the novel’s plot as intricate, weaving complex themes seamlessly.",
                content: `
                    <h2>Example 3: Understanding Connotations</h2>
                    <p>Question: What is the connotation of 'intricate' in this context?</p>
                    <p>Step 1: Analyze context: 'Weaving complex themes seamlessly' is positive.</p>
                    <p>Step 2: Apply rule: Connotation reflects the emotional tone of the word.</p>
                    <p>Solution: 'Intricate' has a positive connotation, implying skillful complexity.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "The artist’s intricate designs captivated the gallery visitors.",
                question: "What is the connotation of 'intricate'?",
                options: [
                    { text: "A) Positive, suggesting skillful detail", correct: true },
                    { text: "B) Negative, suggesting confusion", correct: false },
                    { text: "C) Neutral, suggesting simplicity", correct: false },
                    { text: "D) Negative, suggesting failure", correct: false }
                ],
                explanation: "Captivating designs suggest skillful detail, so 'intricate' is positive, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Context Clues for Phrases",
                passage: "The team’s decision to forge ahead despite setbacks inspired their supporters.",
                content: `
                    <h2>Example 4: Context Clues for Phrases</h2>
                    <p>Question: What does 'forge ahead' mean in this context?</p>
                    <p>Step 1: Analyze context: Inspiring despite setbacks suggests progress.</p>
                    <p>Step 2: Apply rule: Context clues clarify idiomatic phrases.</p>
                    <p>Solution: 'Forge ahead' means to continue determinedly.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "She decided to forge ahead with her plan, despite the risks.",
                question: "What does 'forge ahead' mean?",
                options: [
                    { text: "A) Proceed with determination", correct: true },
                    { text: "B) Give up entirely", correct: false },
                    { text: "C) Delay the plan", correct: false },
                    { text: "D) Ignore the risks", correct: false }
                ],
                explanation: "Continuing despite risks suggests determination, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Tone Through Word Choice",
                passage: "The speaker’s scathing remarks about the policy shocked the audience.",
                content: `
                    <h2>Example 5: Tone Through Word Choice</h2>
                    <p>Question: What tone does 'scathing' convey?</p>
                    <p>Step 1: Analyze context: Shocking remarks suggest harsh criticism.</p>
                    <p>Step 2: Apply rule: Word choice shapes the tone of a passage.</p>
                    <p>Solution: 'Scathing' conveys a harshly critical or biting tone.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The review’s scathing critique of the film disappointed its fans.",
                question: "What tone does 'scathing' convey?",
                options: [
                    { text: "A) Harshly critical", correct: true },
                    { text: "B) Mildly supportive", correct: false },
                    { text: "C) Neutral and factual", correct: false },
                    { text: "D) Playfully humorous", correct: false }
                ],
                explanation: "Disappointing critique suggests harshness, so 'scathing' is critical, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Choosing the Best Word",
                passage: "The scientist’s discovery was hailed as a monumental achievement in biology.",
                content: `
                    <h2>Example 6: Choosing the Best Word</h2>
                    <p>Question: Which word could replace 'monumental' to maintain the meaning?</p>
                    <p>Step 1: Analyze context: 'Hailed' and 'achievement' suggest great significance.</p>
                    <p>Step 2: Apply rule: Replacement words must fit the context and tone.</p>
                    <p>Solution: 'Monumental' means significant, so 'landmark' fits the context.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The athlete’s monumental effort led to a record-breaking performance.",
                question: "Which word could replace 'monumental'?",
                options: [
                    { text: "A) Remarkable", correct: true },
                    { text: "B) Minor", correct: false },
                    { text: "C) Average", correct: false },
                    { text: "D) Weak", correct: false }
                ],
                explanation: "Record-breaking suggests great effort, so 'monumental' means remarkable, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Inferring Meaning from Context",
                passage: "The diplomat’s tactful response diffused the tense negotiation.",
                content: `
                    <h2>Example 7: Inferring Meaning from Context</h2>
                    <p>Question: What does 'tactful' mean in this context?</p>
                    <p>Step 1: Analyze context: Diffusing tension suggests careful communication.</p>
                    <p>Step 2: Apply rule: Context clues reveal nuanced meanings.</p>
                    <p>Solution: 'Tactful' means diplomatic or sensitive in this context.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Her tactful reply calmed the upset customer.",
                question: "What does 'tactful' mean?",
                options: [
                    { text: "A) Sensitive and diplomatic", correct: true },
                    { text: "B) Harsh and direct", correct: false },
                    { text: "C) Confusing and vague", correct: false },
                    { text: "D) Careless and blunt", correct: false }
                ],
                explanation: "Calming suggests careful communication, so 'tactful' means sensitive, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "The experiment’s results were deemed negligible by the research team.",
        question: "What does 'negligible' mean in this context?",
        answers: [
            { text: "A) Insignificant", correct: true },
            { text: "B) Crucial", correct: false },
            { text: "C) Promising", correct: false },
            { text: "D) Complex", correct: false }
        ],
        explanation: "The research team’s dismissal suggests 'negligible' means insignificant, making A correct.",
        difficulty: "easy",
        category: "act-vocabulary-in-context"
    },
    {
        passage: "The author’s lucid prose clarified the complex topic for readers.",
        question: "Which word is a synonym for 'lucid'?",
        answers: [
            { text: "A) Clear", correct: true },
            { text: "B) Confusing", correct: false },
            { text: "C) Lengthy", correct: false },
            { text: "D) Dull", correct: false }
        ],
        explanation: "Clarifying a complex topic suggests 'lucid' means clear, making A correct.",
        difficulty: "medium",
        category: "act-vocabulary-in-context"
    },
    {
        passage: "The politician’s evasive answers frustrated the reporters.",
        question: "What is the connotation of 'evasive'?",
        answers: [
            { text: "A) Negative, suggesting avoidance", correct: true },
            { text: "B) Positive, suggesting clarity", correct: false },
            { text: "C) Neutral, suggesting honesty", correct: false },
            { text: "D) Positive, suggesting confidence", correct: false }
        ],
        explanation: "Frustrating reporters suggests 'evasive' has a negative connotation, making A correct.",
        difficulty: "medium",
        category: "act-vocabulary-in-context"
    },
    {
        passage: "The team decided to hold fast to their strategy despite criticism.",
        question: "What does 'hold fast' mean?",
        answers: [
            { text: "A) Remain committed", correct: true },
            { text: "B) Abandon quickly", correct: false },
            { text: "C) Revise immediately", correct: false },
            { text: "D) Ignore completely", correct: false }
        ],
        explanation: "Continuing despite criticism suggests 'hold fast' means remain committed, making A correct.",
        difficulty: "medium",
        category: "act-vocabulary-in-context"
    },
    {
        passage: "The critic’s derisive comments about the play upset the cast.",
        question: "What tone does 'derisive' convey?",
        answers: [
            { text: "A) Mocking and scornful", correct: true },
            { text: "B) Supportive and kind", correct: false },
            { text: "C) Neutral and objective", correct: false },
            { text: "D) Curious and questioning", correct: false }
        ],
        explanation: "Upsetting the cast suggests 'derisive' is mocking, making A correct.",
        difficulty: "medium",
        category: "act-vocabulary-in-context"
    },
    {
        passage: "The invention was lauded as a pivotal advancement in technology.",
        question: "Which word could replace 'pivotal'?",
        answers: [
            { text: "A) Crucial", correct: true },
            { text: "B) Minor", correct: false },
            { text: "C) Temporary", correct: false },
            { text: "D) Obsolete", correct: false }
        ],
        explanation: "Lauded advancement suggests 'pivotal' means crucial, making A correct.",
        difficulty: "easy",
        category: "act-vocabulary-in-context"
    },
    {
        passage: "The manager’s candid feedback helped the team improve.",
        question: "What does 'candid' mean?",
        answers: [
            { text: "A) Honest and direct", correct: true },
            { text: "B) Vague and unclear", correct: false },
            { text: "C) Harsh and critical", correct: false },
            { text: "D) Secretive and guarded", correct: false }
        ],
        explanation: "Helping improve suggests 'candid' means honest, making A correct.",
        difficulty: "medium",
        category: "act-vocabulary-in-context"
    }
];

// Variables
let categoryStats = {
    "act-vocabulary-in-context": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "9";
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
                </div
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
        categoryStats["act-vocabulary-in-context"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-vocabulary-in-context"].incorrect++;
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
        case 9: return englishQuestions;
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
        category: "act-vocabulary-in-context",
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
    let totalCorrect = categoryStats["act-vocabulary-in-context"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-vocabulary-in-context"].incorrect;

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
    localStorage.setItem(`act-vocabulary-in-context-lessonScore-${lessonId}`, score);
    console.log(`Saved act-vocabulary-in-context-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-vocabulary-in-context-lessonScore-${lessonId}`) || "Not completed yet";
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