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
    const lessonId = urlParams.get('lesson') || 8;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    8: {
        title: "Character Motivation",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying Character Motivation",
                passage: "Despite the rain, Javier ran to deliver the letter before the post office closed.",
                content: `
                    <h2>Example 1: Identifying Character Motivation</h2>
                    <p>Question: What motivates Javier’s actions?</p>
                    <p>Step 1: Analyze actions: Running in the rain shows urgency.</p>
                    <p>Step 2: Apply rule: Motivation is the driving force behind a character’s actions.</p>
                    <p>Solution: Javier is motivated by the importance of delivering the letter on time.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Clara skipped her favorite show to help her brother with homework.",
                question: "What motivates Clara’s actions?",
                options: [
                    { text: "A) A desire to support her brother", correct: true },
                    { text: "B) A dislike for the show", correct: false },
                    { text: "C) A need for attention", correct: false },
                    { text: "D) A lack of interest in homework", correct: false }
                ],
                explanation: "Skipping a favorite show to help suggests a priority to support family, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Motivation from Dialogue",
                passage: "‘I’ll make her proud,’ Mia whispered, practicing her piano piece late into the night.",
                content: `
                    <h2>Example 2: Motivation from Dialogue</h2>
                    <p>Question: What motivates Mia’s practice?</p>
                    <p>Step 1: Analyze dialogue: ‘Make her proud’ indicates a personal goal.</p>
                    <p>Step 2: Apply rule: Dialogue reveals a character’s underlying intentions.</p>
                    <p>Solution: Mia is motivated by a desire to earn someone’s pride or approval.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "‘I won’t give up,’ Leo said, retrying the experiment after multiple failures.",
                question: "What motivates Leo’s persistence?",
                options: [
                    { text: "A) Determination to succeed", correct: true },
                    { text: "B) Fear of criticism", correct: false },
                    { text: "C) Desire for a break", correct: false },
                    { text: "D) Indifference to results", correct: false }
                ],
                explanation: "The dialogue shows resolve, indicating determination, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Motivation from Relationships",
                passage: "Despite their rivalry, Sam offered to tutor his competitor before the debate.",
                content: `
                    <h2>Example 3: Motivation from Relationships</h2>
                    <p>Question: What motivates Sam’s offer?</p>
                    <p>Step 1: Analyze context: Helping a rival suggests a value beyond competition.</p>
                    <p>Step 2: Apply rule: Relationships can drive actions that defy expectations.</p>
                    <p>Solution: Sam is motivated by a sense of sportsmanship or respect for his competitor.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "After a fight, Nora wrote a heartfelt letter to her estranged friend.",
                question: "What motivates Nora’s actions?",
                options: [
                    { text: "A) A desire to reconcile with her friend", correct: true },
                    { text: "B) A need to express anger", correct: false },
                    { text: "C) A wish to end the friendship", correct: false },
                    { text: "D) A desire for attention", correct: false }
                ],
                explanation: "A heartfelt letter post-fight suggests a reconciliatory motive, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Emotional Motivation",
                passage: "Frustrated, Elena tore up her failed drawing and started over.",
                content: `
                    <h2>Example 4: Emotional Motivation</h2>
                    <p>Question: What motivates Elena’s actions?</p>
                    <p>Step 1: Analyze emotion: Frustration drives her to destroy and restart.</p>
                    <p>Step 2: Apply rule: Emotions can prompt decisive or impulsive actions.</p>
                    <p>Solution: Elena is motivated by frustration and a desire to improve her work.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Overjoyed, Tim hugged his teammate after scoring the winning goal.",
                question: "What motivates Tim’s reaction?",
                options: [
                    { text: "A) Excitement from the victory", correct: true },
                    { text: "B) Anger at the game", correct: false },
                    { text: "C) Indifference to the score", correct: false },
                    { text: "D) Sadness over the match", correct: false }
                ],
                explanation: "Hugging in joy suggests excitement from winning, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Inferring Subtle Motivations",
                passage: "Ava nodded politely but left the meeting early without explanation.",
                content: `
                    <h2>Example 5: Inferring Subtle Motivations</h2>
                    <p>Question: What might motivate Ava’s early departure?</p>
                    <p>Step 1: Analyze behavior: Polite nodding but leaving suggests a hidden reason.</p>
                    <p>Step 2: Apply rule: Subtle actions imply unstated personal motives.</p>
                    <p>Solution: Ava may be motivated by discomfort or an urgent personal matter.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Eli agreed to the plan but kept checking his watch during the discussion.",
                question: "What might motivate Eli’s behavior?",
                options: [
                    { text: "A) Impatience or a conflicting priority", correct: true },
                    { text: "B) Enthusiasm for the plan", correct: false },
                    { text: "C) Confidence in the discussion", correct: false },
                    { text: "D) Desire to lead the group", correct: false }
                ],
                explanation: "Checking the watch suggests impatience or another priority, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Motivation from Context",
                passage: "In a famine-stricken town, Rosa shared her last loaf of bread with a neighbor.",
                content: `
                    <h2>Example 6: Motivation from Context</h2>
                    <p>Question: What motivates Rosa’s actions?</p>
                    <p>Step 1: Analyze context: Famine implies scarcity, making sharing significant.</p>
                    <p>Step 2: Apply rule: Context drives altruistic or survival-based motives.</p>
                    <p>Solution: Rosa is motivated by compassion or community solidarity.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "During a flood, Omar carried his neighbor’s belongings to safety.",
                question: "What motivates Omar’s actions?",
                options: [
                    { text: "A) A desire to help others in crisis", correct: true },
                    { text: "B) A need for personal gain", correct: false },
                    { text: "C) A fear of the flood", correct: false },
                    { text: "D) A wish to avoid responsibility", correct: false }
                ],
                explanation: "Helping in a crisis suggests altruism, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Complex Motivations",
                passage: "Though terrified, Liam stood up to the bully to protect his younger sibling.",
                content: `
                    <h2>Example 7: Complex Motivations</h2>
                    <p>Question: What motivates Liam’s actions?</p>
                    <p>Step 1: Analyze conflict: Fear suggests hesitation, but action shows courage.</p>
                    <p>Step 2: Apply rule: Complex motives balance fear with duty or loyalty.</p>
                    <p>Solution: Liam is motivated by a protective instinct for his sibling, overcoming fear.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Despite her exhaustion, Zoe worked through the night to meet her team’s deadline.",
                question: "What motivates Zoe’s actions?",
                options: [
                    { text: "A) Responsibility to her team", correct: true },
                    { text: "B) Desire for personal rest", correct: false },
                    { text: "C) Fear of failure", correct: false },
                    { text: "D) Indifference to the deadline", correct: false }
                ],
                explanation: "Working despite exhaustion shows team duty, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "Tara declined the social event to finish her painting.",
        question: "What motivates Tara’s actions?",
        answers: [
            { text: "A) Dedication to her art", correct: true },
            { text: "B) Dislike for socializing", correct: false },
            { text: "C) Fear of the event", correct: false },
            { text: "D) Lack of interest in painting", correct: false }
        ],
        explanation: "Choosing painting over socializing suggests artistic dedication, making A correct.",
        difficulty: "easy",
        category: "act-character-motivation"
    },
    {
        passage: "‘I’ll earn their respect,’ Nina said, volunteering for the toughest task.",
        question: "What motivates Nina’s actions?",
        answers: [
            { text: "A) Desire to gain respect", correct: true },
            { text: "B) Fear of the task", correct: false },
            { text: "C) Need for rest", correct: false },
            { text: "D) Wish to avoid work", correct: false }
        ],
        explanation: "The dialogue indicates a drive for respect, making A correct.",
        difficulty: "medium",
        category: "act-character-motivation"
    },
    {
        passage: "After a misunderstanding, Luke called his friend to clarify things.",
        question: "What motivates Luke’s actions?",
        answers: [
            { text: "A) Desire to restore the friendship", correct: true },
            { text: "B) Need to argue further", correct: false },
            { text: "C) Indifference to the misunderstanding", correct: false },
            { text: "D) Wish to ignore the friend", correct: false }
        ],
        explanation: "Calling to clarify suggests a restorative motive, making A correct.",
        difficulty: "medium",
        category: "act-character-motivation"
    },
    {
        passage: "Upset, Maya left the room when her idea was ignored.",
        question: "What motivates Maya’s reaction?",
        answers: [
            { text: "A) Feeling dismissed or undervalued", correct: true },
            { text: "B) Excitement about her idea", correct: false },
            { text: "C) Indifference to the discussion", correct: false },
            { text: "D) Joy at being ignored", correct: false }
        ],
        explanation: "Leaving when upset suggests feeling dismissed, making A correct.",
        difficulty: "easy",
        category: "act-character-motivation"
    },
    {
        passage: "Finn smiled but declined to join the committee, citing a busy schedule.",
        question: "What might motivate Finn’s refusal?",
        answers: [
            { text: "A) Overcommitment or personal priorities", correct: true },
            { text: "B) Enthusiasm for the committee", correct: false },
            { text: "C) Desire to lead the committee", correct: false },
            { text: "D) Confidence in the committee", correct: false }
        ],
        explanation: "Citing a busy schedule suggests competing priorities, making A correct.",
        difficulty: "medium",
        category: "act-character-motivation"
    },
    {
        passage: "In a power outage, Lila lit candles for her frightened neighbors.",
        question: "What motivates Lila’s actions?",
        answers: [
            { text: "A) Compassion for her neighbors", correct: true },
            { text: "B) Desire for recognition", correct: false },
            { text: "C) Fear of the dark", correct: false },
            { text: "D) Need to conserve candles", correct: false }
        ],
        explanation: "Helping frightened neighbors shows compassion, making A correct.",
        difficulty: "medium",
        category: "act-character-motivation"
    },
    {
        passage: "Though nervous, Kai spoke at the rally to support the cause.",
        question: "What motivates Kai’s actions?",
        answers: [
            { text: "A) Passion for the cause", correct: true },
            { text: "B) Desire to avoid attention", correct: false },
            { text: "C) Fear of speaking", correct: false },
            { text: "D) Indifference to the cause", correct: false }
        ],
        explanation: "Speaking despite nerves suggests passion, making A correct.",
        difficulty: "medium",
        category: "act-character-motivation"
    }
];

// Variables
let categoryStats = {
    "act-character-motivation": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "8";
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
        categoryStats["act-character-motivation"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-character-motivation"].incorrect++;
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
        case 8: return englishQuestions;
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
        category: "act-character-motivation",
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
    let totalCorrect = categoryStats["act-character-motivation"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-character-motivation"].incorrect;

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
    localStorage.setItem(`act-character-motivation-lessonScore-${lessonId}`, score);
    console.log(`Saved act-character-motivation-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-character-motivation-lessonScore-${lessonId}`) || "Not completed yet";
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