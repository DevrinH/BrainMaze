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
    const lessonId = urlParams.get('lesson') || 2;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    2: {
        title: "Knowledge of Language",
        content: [
            {
                type: "example",
                title: "Example 1: Word Choice (Precision)",
                passage: "A recent study described the scientist’s discovery as a major breakthrough because it transformed the field of biology.",
                content: `
                    <h2>Example 1: Word Choice (Precision)</h2>
                    <p>Question: In the passage, which word could replace "major" to be more precise?</p>
                    <p>Step 1: Evaluate context: The discovery "transformed the field," suggesting significant impact.</p>
                    <p>Step 2: Apply rule: Choose precise words. "Groundbreaking" conveys a specific, transformative impact, while "major" is vague.</p>
                    <p>Solution: Replace "major" with "groundbreaking." The discovery was groundbreaking.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The chef’s new dish was described as very good by critics, delighting guests at the event.",
                question: "Which word could replace 'very good' to be more precise?",
                options: [
                    { text: "A) delicious", correct: true },
                    { text: "B) nice", correct: false },
                    { text: "C) great", correct: false },
                    { text: "D) fine", correct: false }
                ],
                explanation: "'Delicious' specifically describes the dish’s taste, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Tone Consistency",
                passage: "The academic journal’s analysis was rigorous, but its conclusion was described as totally off-base.",
                content: `
                    <h2>Example 2: Tone Consistency</h2>
                    <p>Question: Which phrase in the passage matches the formal tone of 'rigorous'?</p>
                    <p>Step 1: Identify tone: 'Rigorous' suggests a formal, scholarly style.</p>
                    <p>Step 2: Apply rule: Maintain consistent tone. 'Erroneous' is formal, while 'totally off-base' is informal.</p>
                    <p>Solution: Replace 'totally off-base' with 'erroneous.' The conclusion was erroneous.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "The lecture was insightful, but the speaker’s delivery was said to be a total flop by attendees.",
                question: "Which word maintains the formal tone of 'insightful'?",
                options: [
                    { text: "A) faltered", correct: true },
                    { text: "B) total flop", correct: false },
                    { text: "C) messed up", correct: false },
                    { text: "D) bombed", correct: false }
                ],
                explanation: "'Faltered' matches the formal tone of 'insightful,' making A correct."
            },
            {
                type: "example",
                title: "Example 3: Transitions",
                passage: "The experiment failed to produce results. The team learned valuable lessons that informed future research.",
                content: `
                    <h2>Example 3: Transitions</h2>
                    <p>Question: Which transition best connects the two sentences in the passage?</p>
                    <p>Step 1: Analyze relationship: The second sentence contrasts the failure with a positive outcome.</p>
                    <p>Step 2: Apply rule: Use contrast transitions like 'however' for opposing ideas.</p>
                    <p>Solution: Add 'However,' after the first sentence: The experiment failed. However, the team learned valuable lessons.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "The project fell behind schedule. The team still met the final deadline.",
                question: "Which transition best connects the sentences?",
                options: [
                    { text: "A) Nevertheless", correct: true },
                    { text: "B) Thus", correct: false },
                    { text: "C) And", correct: false },
                    { text: "D) So", correct: false }
                ],
                explanation: "'Nevertheless' highlights the contrast between delay and success, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Conciseness",
                passage: "The meeting was planned to occur at 3 p.m. in the afternoon at the conference center.",
                content: `
                    <h2>Example 4: Conciseness</h2>
                    <p>Question: How can the sentence be made more concise?</p>
                    <p>Step 1: Identify redundancy: '3 p.m.' implies 'in the afternoon,' and 'at the conference center' may be unnecessary.</p>
                    <p>Step 2: Apply rule: Remove redundant phrases.</p>
                    <p>Solution: The meeting was planned for 3 p.m.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "She returned back to her hometown in the month of July last year.",
                question: "How can the sentence be made more concise?",
                options: [
                    { text: "A) She returned to her hometown in July.", correct: true },
                    { text: "B) She went back to her hometown last year.", correct: false },
                    { text: "C) She returned back home in July.", correct: false },
                    { text: "D) She returned to her hometown last year.", correct: false }
                ],
                explanation: "'Back' and 'in the month of' are redundant; A is the most concise."
            },
            {
                type: "example",
                title: "Example 5: Word Choice (Context)",
                passage: "The politician’s decision to ignore scientific evidence was considered unwise by analysts.",
                content: `
                    <h2>Example 5: Word Choice (Context)</h2>
                    <p>Question: Which word better fits the context to replace 'unwise'?</p>
                    <p>Step 1: Analyze context: Ignoring evidence suggests deliberate refusal.</p>
                    <p>Step 2: Apply rule: Choose a word matching the behavior. 'Obstinate' implies stubborn refusal, while 'unwise' is broader.</p>
                    <p>Solution: Replace 'unwise' with 'obstinate.' The decision was obstinate.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The athlete continued competing despite a serious injury, an effort called risky by coaches.",
                question: "Which word best replaces 'risky' in this context?",
                options: [
                    { text: "A) courageous", correct: true },
                    { text: "B) reckless", correct: false },
                    { text: "C) foolish", correct: false },
                    { text: "D) bold", correct: false }
                ],
                explanation: "Continuing despite injury suggests bravery; 'courageous' fits best, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Style Consistency",
                passage: "The novel’s prose was described as elegant and refined, but its dialogue was super chill.",
                content: `
                    <h2>Example 6: Style Consistency</h2>
                    <p>Question: Which phrase maintains the style of 'elegant and refined'?</p>
                    <p>Step 1: Identify style: 'Elegant and refined' suggests a formal tone.</p>
                    <p>Step 2: Apply rule: Match the style. 'Conversational' is neutral, while 'super chill' is informal.</p>
                    <p>Solution: Replace 'super chill' with 'conversational.' The dialogue was conversational.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The article’s analysis was meticulous, but its conclusion was described as kinda shaky.",
                question: "Which phrase matches the style of 'meticulous'?",
                options: [
                    { text: "A) somewhat uncertain", correct: true },
                    { text: "B) kinda shaky", correct: false },
                    { text: "C) totally off", correct: false },
                    { text: "D) pretty weak", correct: false }
                ],
                explanation: "'Somewhat uncertain' maintains the formal style of 'meticulous,' making A correct."
            },
            {
                type: "example",
                title: "Example 7: Avoiding Redundancy",
                passage: "The project was entirely completed and fully finished by the deadline.",
                content: `
                    <h2>Example 7: Avoiding Redundancy</h2>
                    <p>Question: How can the sentence be improved?</p>
                    <p>Step 1: Identify redundancy: 'Entirely completed' and 'fully finished' repeat the same idea.</p>
                    <p>Step 2: Apply rule: Use one clear term.</p>
                    <p>Solution: The project was completed by the deadline.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The event was absolutely critical and completely necessary for success.",
                question: "How can the sentence be improved?",
                options: [
                    { text: "A) The event was critical for success.", correct: true },
                    { text: "B) The event was absolutely necessary.", correct: false },
                    { text: "C) The event was completely critical.", correct: false },
                    { text: "D) The event was necessary and critical.", correct: false }
                ],
                explanation: "'Absolutely critical' and 'completely necessary' are redundant; 'critical' alone is sufficient, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "A critic described the author’s argument as okay because it was supported by strong evidence.",
        question: "Which word could replace 'okay' to be more precise?",
        answers: [
            { text: "A) persuasive", correct: true },
            { text: "B) nice", correct: false },
            { text: "C) good", correct: false },
            { text: "D) fine", correct: false }
        ],
        explanation: "'Persuasive' conveys the strength of the argument’s evidence, making A correct.",
        difficulty: "easy",
        category: "act-knowledge-of-language"
    },
    {
        passage: "The presentation was thorough, but the speaker’s closing remarks were said to have totally bombed.",
        question: "Which word maintains the formal tone of 'thorough'?",
        answers: [
            { text: "A) stumbled", correct: true },
            { text: "B) totally bombed", correct: false },
            { text: "C) flopped", correct: false },
            { text: "D) crashed", correct: false }
        ],
        explanation: "'Stumbled' matches the formal tone of 'thorough,' making A correct.",
        difficulty: "medium",
        category: "act-knowledge-of-language"
    },
    {
        passage: "The team missed the deadline. They delivered a high-quality product.",
        question: "Which transition best connects the sentences?",
        answers: [
            { text: "A) Yet", correct: true },
            { text: "B) Also", correct: false },
            { text: "C) And", correct: false },
            { text: "D) So", correct: false }
        ],
        explanation: "'Yet' contrasts the missed deadline with the positive outcome, making A correct.",
        difficulty: "medium",
        category: "act-knowledge-of-language"
    },
    {
        passage: "The company plans to expand its operations in the near future very soon.",
        question: "How can the sentence be made more concise?",
        answers: [
            { text: "A) The company plans to expand soon.", correct: true },
            { text: "B) The company will expand in the future.", correct: false },
            { text: "C) The company plans to expand very soon.", correct: false },
            { text: "D) The company will expand its operations.", correct: false }
        ],
        explanation: "'In the near future very soon' is redundant; 'soon' is concise, making A correct.",
        difficulty: "easy",
        category: "act-knowledge-of-language"
    },
    {
        passage: "The manager’s refusal to adapt to new technology was called careless by the team.",
        question: "Which word best replaces 'careless' in this context?",
        answers: [
            { text: "A) inflexible", correct: true },
            { text: "B) negligent", correct: false },
            { text: "C) unwise", correct: false },
            { text: "D) reckless", correct: false }
        ],
        explanation: "Refusing to adapt suggests rigidity; 'inflexible' fits best, making A correct.",
        difficulty: "medium",
        category: "act-knowledge-of-language"
    },
    {
        passage: "The essay’s tone was scholarly, but its examples were described as way too casual.",
        question: "Which phrase matches the style of 'scholarly'?",
        answers: [
            { text: "A) slightly informal", correct: true },
            { text: "B) way too casual", correct: false },
            { text: "C) super relaxed", correct: false },
            { text: "D) totally laid-back", correct: false }
        ],
        explanation: "'Slightly informal' aligns with the formal 'scholarly' tone, making A correct.",
        difficulty: "medium",
        category: "act-knowledge-of-language"
    },
    {
        passage: "The task was fully completed and entirely finished by the team.",
        question: "How can the sentence be improved?",
        answers: [
            { text: "A) The task was completed.", correct: true },
            { text: "B) The task was fully finished.", correct: false },
            { text: "C) The task was entirely completed.", correct: false },
            { text: "D) The task was done and completed.", correct: false }
        ],
        explanation: "'Fully completed' and 'entirely finished' are redundant; 'completed' is sufficient, making A correct.",
        difficulty: "easy",
        category: "act-knowledge-of-language"
    }
];

// Variables
let categoryStats = {
    "act-knowledge-of-language": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "2";
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
        categoryStats["act-knowledge-of-language"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-knowledge-of-language"].incorrect++;
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
        case 2: return englishQuestions;
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
        category: "act-knowledge-of-language",
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
    let totalCorrect = categoryStats["act-knowledge-of-language"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-knowledge-of-language"].incorrect;

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
    localStorage.setItem(`act-knowledge-of-language-lessonScore-${lessonId}`, score);
    console.log(`Saved act-knowledge-of-language-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-knowledge-of-language-lessonScore-${lessonId}`) || "Not completed yet";
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