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
    const lessonId = urlParams.get('lesson') || 15;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    15: {
        title: "Implication",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying Implied Meaning",
                passage: "Lila stared at the empty chair across the table, her eyes glistening with unshed tears.",
                content: `
                    <h2>Example 1: Identifying Implied Meaning</h2>
                    <p>Question: What does Lila’s behavior imply?</p>
                    <p>Step 1: Analyze context: An empty chair and glistening eyes suggest emotional weight.</p>
                    <p>Step 2: Apply rule: Implied meanings are inferred from subtle cues, not stated directly.</p>
                    <p>Solution: Lila’s behavior implies grief or longing for someone missing.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Mark clenched his fists as his rival smirked across the room.",
                question: "What does Mark’s behavior imply?",
                options: [
                    { text: "A) Anger or frustration", correct: true },
                    { text: "B) Joy or amusement", correct: false },
                    { text: "C) Indifference or boredom", correct: false },
                    { text: "D) Confidence or pride", correct: false }
                ],
                explanation: "Clenching fists in response to a smirk suggests anger, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Inferring Consequences",
                passage: "The mayor ignored the scientist’s warning about the dam’s cracks, focusing on the festival.",
                content: `
                    <h2>Example 2: Inferring Consequences</h2>
                    <p>Question: What does the mayor’s inaction imply for the town?</p>
                    <p>Step 1: Analyze action: Ignoring a warning about a dam suggests negligence.</p>
                    <p>Step 2: Apply rule: Implications include potential outcomes of actions or inactions.</p>
                    <p>Solution: The mayor’s inaction implies a risk of flooding or disaster for the town.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "The captain dismissed reports of a storm, ordering the ship to sail.",
                question: "What does the captain’s decision imply for the ship?",
                options: [
                    { text: "A) Danger from the storm", correct: true },
                    { text: "B) A safe journey", correct: false },
                    { text: "C) A faster voyage", correct: false },
                    { text: "D) Improved crew morale", correct: false }
                ],
                explanation: "Dismissing a storm warning implies risk, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Inferring Motivation",
                passage: "Despite her fear, Clara whispered encouragement to her trembling friend.",
                content: `
                    <h2>Example 3: Inferring Motivation</h2>
                    <p>Question: What does Clara’s action imply about her motivation?</p>
                    <p>Step 1: Analyze action: Encouraging despite fear shows selflessness.</p>
                    <p>Step 2: Apply rule: Implied motivations are inferred from actions in context.</p>
                    <p>Solution: Clara’s action implies a motivation to support her friend over personal fear.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Ignoring his exhaustion, Tom carried his teammate’s gear up the hill.",
                question: "What does Tom’s action imply about his motivation?",
                options: [
                    { text: "A) Duty to help his teammate", correct: true },
                    { text: "B) Desire for personal gain", correct: false },
                    { text: "C) Indifference to exhaustion", correct: false },
                    { text: "D) Fear of the hill", correct: false }
                ],
                explanation: "Carrying gear despite exhaustion suggests duty, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Understanding Subtext",
                passage: "‘Fine,’ she said sharply, slamming the door as she left the meeting.",
                content: `
                    <h2>Example 4: Understanding Subtext</h2>
                    <p>Question: What does the subtext of her response imply?</p>
                    <p>Step 1: Analyze tone and action: ‘Fine’ with sharp tone and slamming suggests anger.</p>
                    <p>Step 2: Apply rule: Subtext reveals unstated emotions or attitudes.</p>
                    <p>Solution: The subtext implies she is angry or frustrated, despite saying ‘Fine.’</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "‘Sure,’ he muttered, avoiding eye contact and shuffling away.",
                question: "What does the subtext of his response imply?",
                options: [
                    { text: "A) Reluctance or discomfort", correct: true },
                    { text: "B) Enthusiasm or agreement", correct: false },
                    { text: "C) Confidence or excitement", correct: false },
                    { text: "D) Joy or amusement", correct: false }
                ],
                explanation: "Muttering and avoiding eye contact suggest reluctance, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Implication in Narrative",
                passage: "The traveler left a single rose on the grave before vanishing into the fog.",
                content: `
                    <h2>Example 5: Implication in Narrative</h2>
                    <p>Question: What does the traveler’s action imply for the narrative?</p>
                    <p>Step 1: Analyze action: Leaving a rose and vanishing suggests emotional weight.</p>
                    <p>Step 2: Apply rule: Implied actions foreshadow or reveal narrative depth.</p>
                    <p>Solution: The action implies a personal loss or secret, foreshadowing a deeper backstory.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The stranger dropped a locket in the alley, hurrying away as voices approached.",
                question: "What does the stranger’s action imply for the narrative?",
                options: [
                    { text: "A) A hidden past or mystery", correct: true },
                    { text: "B) A casual stroll", correct: false },
                    { text: "C) A public announcement", correct: false },
                    { text: "D) A lack of urgency", correct: false }
                ],
                explanation: "Dropping a locket and hurrying suggest a mystery, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Implication in Arguments",
                passage: "The article praised urban gardens but noted their high maintenance costs.",
                content: `
                    <h2>Example 6: Implication in Arguments</h2>
                    <p>Question: What does the mention of costs imply for the argument?</p>
                    <p>Step 1: Analyze detail: High costs qualify the praise.</p>
                    <p>Step 2: Apply rule: Implied drawbacks balance or challenge main claims.</p>
                    <p>Solution: The mention of costs implies a challenge to implementing urban gardens widely.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The report endorsed renewable energy but highlighted its initial expense.",
                question: "What does the mention of expense imply for the argument?",
                options: [
                    { text: "A) A barrier to adopting renewable energy", correct: true },
                    { text: "B) A minor benefit of renewable energy", correct: false },
                    { text: "C) A reason to avoid renewable energy entirely", correct: false },
                    { text: "D) A guarantee of renewable energy success", correct: false }
                ],
                explanation: "Highlighting expense suggests a challenge, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Implication Through Tone",
                passage: "The politician smiled warmly, but his voice trembled when addressing the scandal.",
                content: `
                    <h2>Example 7: Implication Through Tone</h2>
                    <p>Question: What does the trembling voice imply?</p>
                    <p>Step 1: Analyze tone: Smiling contrasts with trembling, suggesting unease.</p>
                    <p>Step 2: Apply rule: Tone implies unstated emotions or truths.</p>
                    <p>Solution: The trembling voice implies nervousness or guilt about the scandal.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "She laughed lightly, but her hands shook as she spoke of the accident.",
                question: "What does her shaking hands imply?",
                options: [
                    { text: "A) Anxiety or trauma", correct: true },
                    { text: "B) Happiness or excitement", correct: false },
                    { text: "C) Confidence or calm", correct: false },
                    { text: "D) Indifference or boredom", correct: false }
                ],
                explanation: "Shaking hands while discussing an accident suggest anxiety, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "He nodded politely but glanced at his watch during her speech.",
        question: "What does his behavior imply?",
        answers: [
            { text: "A) Impatience or disinterest", correct: true },
            { text: "B) Enthusiasm or focus", correct: false },
            { text: "C) Confusion or uncertainty", correct: false },
            { text: "D) Respect or admiration", correct: false }
        ],
        explanation: "Glancing at a watch suggests impatience, making A correct.",
        difficulty: "easy",
        category: "act-implication"
    },
    {
        passage: "The company ignored the safety report, prioritizing production quotas.",
        question: "What does the company’s decision imply for worker safety?",
        answers: [
            { text: "A) Increased risk to workers", correct: true },
            { text: "B) Improved safety measures", correct: false },
            { text: "C) No change in safety", correct: false },
            { text: "D) Guaranteed worker protection", correct: false }
        ],
        explanation: "Ignoring safety reports implies risk, making A correct.",
        difficulty: "medium",
        category: "act-implication"
    },
    {
        passage: "Despite the chaos, she calmly organized supplies for the survivors.",
        question: "What does her action imply about her motivation?",
        answers: [
            { text: "A) Duty to help others", correct: true },
            { text: "B) Fear of the chaos", correct: false },
            { text: "C) Desire for recognition", correct: false },
            { text: "D) Indifference to survivors", correct: false }
        ],
        explanation: "Calm organization in chaos suggests duty, making A correct.",
        difficulty: "medium",
        category: "act-implication"
    },
    {
        passage: "‘Okay,’ he said with a sigh, turning away from the argument.",
        question: "What does the subtext of his response imply?",
        answers: [
            { text: "A) Resignation or frustration", correct: true },
            { text: "B) Agreement or enthusiasm", correct: false },
            { text: "C) Confidence or joy", correct: false },
            { text: "D) Curiosity or interest", correct: false }
        ],
        explanation: "Sighing and turning away suggest resignation, making A correct.",
        difficulty: "easy",
        category: "act-implication"
    },
    {
        passage: "The hero left a carved symbol on the wall before fleeing the city.",
        question: "What does the hero’s action imply for the narrative?",
        answers: [
            { text: "A) A clue or future return", correct: true },
            { text: "B) A casual departure", correct: false },
            { text: "C) A public celebration", correct: false },
            { text: "D) A lack of purpose", correct: false }
        ],
        explanation: "Carving a symbol suggests a narrative clue, making A correct.",
        difficulty: "medium",
        category: "act-implication"
    },
    {
        passage: "The proposal touted recycling but admitted its limited infrastructure.",
        question: "What does the mention of infrastructure imply for the argument?",
        answers: [
            { text: "A) A challenge to widespread recycling", correct: true },
            { text: "B) A benefit of recycling", correct: false },
            { text: "C) A guarantee of success", correct: false },
            { text: "D) An irrelevant detail", correct: false }
        ],
        explanation: "Limited infrastructure suggests a barrier, making A correct.",
        difficulty: "medium",
        category: "act-implication"
    },
    {
        passage: "She spoke confidently, but her eyes darted nervously around the room.",
        question: "What does her nervous glance imply?",
        answers: [
            { text: "A) Hidden anxiety or unease", correct: true },
            { text: "B) Confidence or excitement", correct: false },
            { text: "C) Boredom or disinterest", correct: false },
            { text: "D) Joy or amusement", correct: false }
        ],
        explanation: "Nervous glances contradict confidence, implying anxiety, making A correct.",
        difficulty: "medium",
        category: "act-implication"
    }
];

// Variables
let categoryStats = {
    "act-implication": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "15";
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
        categoryStats["act-implication"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-implication"].incorrect++;
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
        case 15: return englishQuestions;
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
        category: "act-implication",
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
    let totalCorrect = categoryStats["act-implication"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-implication"].incorrect;

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
    localStorage.setItem(`act-implication-lessonScore-${lessonId}`, score);
    console.log(`Saved act-implication-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-implication-lessonScore-${lessonId}`) || "Not completed yet";
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