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
    const lessonId = urlParams.get('lesson') || 7;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    7: {
        title: "Character Motivation",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying Character Motivation",
                passage: "Lila stayed up all night studying for the exam, ignoring her friends’ invitations.",
                content: `
                    <h2>Example 1: Identifying Character Motivation</h2>
                    <p>Question: What motivates Lila’s actions?</p>
                    <p>Step 1: Analyze actions: Lila prioritizes studying over socializing.</p>
                    <p>Step 2: Apply rule: Motivation is the reason behind a character’s choices.</p>
                    <p>Solution: Lila is motivated by a desire to succeed academically.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Mark practiced his speech repeatedly, despite his nervousness.",
                question: "What motivates Mark’s actions?",
                options: [
                    { text: "A) A desire to perform well", correct: true },
                    { text: "B) A fear of public speaking", correct: false },
                    { text: "C) A need to impress friends", correct: false },
                    { text: "D) A lack of preparation", correct: false }
                ],
                explanation: "Repeated practice despite nervousness suggests a goal to perform well, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Inferring Motivation from Dialogue",
                passage: "‘I’ll prove them wrong,’ Sara said, training harder after the team’s doubts.",
                content: `
                    <h2>Example 2: Inferring Motivation from Dialogue</h2>
                    <p>Question: What motivates Sara’s training?</p>
                    <p>Step 1: Analyze dialogue: ‘Prove them wrong’ indicates defiance.</p>
                    <p>Step 2: Apply rule: Dialogue reveals unstated goals or emotions.</p>
                    <p>Solution: Sara is motivated by a desire to overcome the team’s doubts.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "‘I won’t let my family down,’ Tom muttered, working extra hours.",
                question: "What motivates Tom’s actions?",
                options: [
                    { text: "A) Duty to support his family", correct: true },
                    { text: "B) Desire for personal wealth", correct: false },
                    { text: "C) Fear of losing his job", correct: false },
                    { text: "D) Ambition for promotion", correct: false }
                ],
                explanation: "The dialogue suggests a commitment to family, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Motivation from Relationships",
                passage: "Emma apologized to her friend after a heated argument, despite her pride.",
                content: `
                    <h2>Example 3: Motivation from Relationships</h2>
                    <p>Question: What motivates Emma’s apology?</p>
                    <p>Step 1: Analyze context: Apologizing despite pride suggests valuing the relationship.</p>
                    <p>Step 2: Apply rule: Relationships often drive characters to act against personal traits.</p>
                    <p>Solution: Emma is motivated by a desire to maintain her friendship.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Jake helped his rival with a project, despite their competition.",
                question: "What motivates Jake’s actions?",
                options: [
                    { text: "A) A sense of fairness or teamwork", correct: true },
                    { text: "B) A desire to win the competition", correct: false },
                    { text: "C) A fear of losing the project", correct: false },
                    { text: "D) A need for recognition", correct: false }
                ],
                explanation: "Helping a rival suggests valuing fairness or collaboration, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Motivation from Emotions",
                passage: "Angry, Leo stormed out of the meeting after his idea was dismissed.",
                content: `
                    <h2>Example 4: Motivation from Emotions</h2>
                    <p>Question: What motivates Leo’s actions?</p>
                    <p>Step 1: Analyze emotion: Anger from dismissal drives his exit.</p>
                    <p>Step 2: Apply rule: Emotions often prompt impulsive character actions.</p>
                    <p>Solution: Leo is motivated by frustration and a sense of rejection.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Sofia cried quietly after receiving a low grade on her essay.",
                question: "What motivates Sofia’s reaction?",
                options: [
                    { text: "A) Disappointment in her performance", correct: true },
                    { text: "B) Joy at completing the essay", correct: false },
                    { text: "C) Indifference to her grade", correct: false },
                    { text: "D) Anger at her teacher", correct: false }
                ],
                explanation: "Crying suggests disappointment, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Inferring Hidden Motivations",
                passage: "Clara smiled politely but declined the invitation to the party.",
                content: `
                    <h2>Example 5: Inferring Hidden Motivations</h2>
                    <p>Question: What might motivate Clara’s refusal?</p>
                    <p>Step 1: Analyze behavior: Polite smiling but declining suggests a concealed reason.</p>
                    <p>Step 2: Apply rule: Subtle actions imply unstated motives.</p>
                    <p>Solution: Clara may be motivated by discomfort or a private issue, not openly shared.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Ben nodded but avoided committing to the group plan.",
                question: "What might motivate Ben’s hesitation?",
                options: [
                    { text: "A) Uncertainty or personal concerns", correct: true },
                    { text: "B) Enthusiasm for the plan", correct: false },
                    { text: "C) Desire to lead the group", correct: false },
                    { text: "D) Confidence in the plan", correct: false }
                ],
                explanation: "Avoiding commitment suggests reluctance or doubt, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Motivation from Context",
                passage: "In a war-torn village, Anya hid her family’s food supplies.",
                content: `
                    <h2>Example 6: Motivation from Context</h2>
                    <p>Question: What motivates Anya’s actions?</p>
                    <p>Step 1: Analyze context: A war-torn setting implies scarcity and danger.</p>
                    <p>Step 2: Apply rule: Context shapes characters’ survival-driven motives.</p>
                    <p>Solution: Anya is motivated by a need to protect her family’s survival.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "During a storm, Mia secured the windows before helping others.",
                question: "What motivates Mia’s actions?",
                options: [
                    { text: "A) Concern for safety", correct: true },
                    { text: "B) Desire for attention", correct: false },
                    { text: "C) Fear of criticism", correct: false },
                    { text: "D) Indifference to the storm", correct: false }
                ],
                explanation: "Securing windows in a storm suggests prioritizing safety, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Complex Motivations",
                passage: "Despite his fear, Kai volunteered to lead the rescue mission.",
                content: `
                    <h2>Example 7: Complex Motivations</h2>
                    <p>Question: What motivates Kai’s decision?</p>
                    <p>Step 1: Analyze conflict: Fear suggests reluctance, but volunteering shows duty.</p>
                    <p>Step 2: Apply rule: Complex motives balance personal emotions with external pressures.</p>
                    <p>Solution: Kai is motivated by a sense of responsibility, overcoming his fear.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Though exhausted, Elena stayed late to finish the team’s report.",
                question: "What motivates Elena’s actions?",
                options: [
                    { text: "A) Commitment to the team’s success", correct: true },
                    { text: "B) Desire for personal gain", correct: false },
                    { text: "C) Fear of punishment", correct: false },
                    { text: "D) Lack of other priorities", correct: false }
                ],
                explanation: "Staying late despite exhaustion shows team dedication, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "Sam ignored the party invitation and spent the evening reading.",
        question: "What motivates Sam’s actions?",
        answers: [
            { text: "A) Preference for solitude or study", correct: true },
            { text: "B) Desire to attend the party", correct: false },
            { text: "C) Fear of social events", correct: false },
            { text: "D) Lack of interest in reading", correct: false }
        ],
        explanation: "Choosing reading over a party suggests a preference for solitude or study, making A correct.",
        difficulty: "easy",
        category: "act-character-development"
    },
    {
        passage: "‘I’ll show I’m capable,’ Lisa said, taking on extra tasks.",
        question: "What motivates Lisa’s actions?",
        answers: [
            { text: "A) Desire to prove her abilities", correct: true },
            { text: "B) Need for rest", correct: false },
            { text: "C) Fear of failure", correct: false },
            { text: "D) Wish to avoid work", correct: false }
        ],
        explanation: "The dialogue indicates a drive to demonstrate capability, making A correct.",
        difficulty: "medium",
        category: "act-character-development"
    },
    {
        passage: "After a disagreement, Tim sent his sister a thoughtful gift.",
        question: "What motivates Tim’s actions?",
        answers: [
            { text: "A) Desire to repair the relationship", correct: true },
            { text: "B) Need to show off wealth", correct: false },
            { text: "C) Indifference to the disagreement", correct: false },
            { text: "D) Wish to escalate the conflict", correct: false }
        ],
        explanation: "A thoughtful gift post-disagreement suggests reconciliation, making A correct.",
        difficulty: "medium",
        category: "act-character-development"
    },
    {
        passage: "Frustrated, Nora slammed her book shut after a difficult chapter.",
        question: "What motivates Nora’s reaction?",
        answers: [
            { text: "A) Difficulty with the material", correct: true },
            { text: "B) Excitement about the book", correct: false },
            { text: "C) Indifference to studying", correct: false },
            { text: "D) Joy at finishing the chapter", correct: false }
        ],
        explanation: "Slamming the book in frustration suggests difficulty, making A correct.",
        difficulty: "easy",
        category: "act-character-development"
    },
    {
        passage: "Alex agreed to the plan but seemed distracted during the discussion.",
        question: "What might motivate Alex’s distraction?",
        answers: [
            { text: "A) Personal concerns or doubts", correct: true },
            { text: "B) Enthusiasm for the plan", correct: false },
            { text: "C) Confidence in the discussion", correct: false },
            { text: "D) Desire to lead the plan", correct: false }
        ],
        explanation: "Distraction despite agreement suggests underlying concerns, making A correct.",
        difficulty: "medium",
        category: "act-character-development"
    },
    {
        passage: "In a drought, Omar shared his water with stranded travelers.",
        question: "What motivates Omar’s actions?",
        answers: [
            { text: "A) Compassion for others", correct: true },
            { text: "B) Desire for recognition", correct: false },
            { text: "C) Fear of punishment", correct: false },
            { text: "D) Need to conserve water", correct: false }
        ],
        explanation: "Sharing water in a drought shows compassion, making A correct.",
        difficulty: "medium",
        category: "act-character-development"
    },
    {
        passage: "Despite her shyness, Zoe spoke up at the town hall meeting.",
        question: "What motivates Zoe’s actions?",
        answers: [
            { text: "A) Passion for the issue discussed", correct: true },
            { text: "B) Desire to remain unnoticed", correct: false },
            { text: "C) Fear of public speaking", correct: false },
            { text: "D) Indifference to the topic", correct: false }
        ],
        explanation: "Speaking despite shyness suggests strong motivation from passion, making A correct.",
        difficulty: "medium",
        category: "act-character-development"
    }
];

// Variables
let categoryStats = {
    "act-character-development": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "7";
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
        categoryStats["act-character-development"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-character-development"].incorrect++;
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
        case 7: return englishQuestions;
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
        category: "act-character-development",
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
    let totalCorrect = categoryStats["act-character-development"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-character-development"].incorrect;

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
    localStorage.setItem(`act-character-development-lessonScore-${lessonId}`, score);
    console.log(`Saved act-character-development-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-character-development-lessonScore-${lessonId}`) || "Not completed yet";
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