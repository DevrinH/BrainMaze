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
    const lessonId = urlParams.get('lesson') || 6;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    6: {
        title: "Inference",
        content: [
            {
                type: "example",
                title: "Example 1: Drawing Logical Conclusions",
                passage: "The scientist frowned as she reviewed the experiment’s unexpected results.",
                content: `
                    <h2>Example 1: Drawing Logical Conclusions</h2>
                    <p>Question: What can be inferred about the experiment?</p>
                    <p>Step 1: Analyze clues: The scientist’s frown suggests disappointment.</p>
                    <p>Step 2: Apply rule: Inferences use textual evidence to deduce unstated ideas.</p>
                    <p>Solution: The experiment likely failed or produced surprising outcomes.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The hiker smiled broadly as he reached the mountain peak.",
                question: "What can be inferred about the hiker’s experience?",
                options: [
                    { text: "A) The hike was successful and rewarding.", correct: true },
                    { text: "B) The hiker was lost.", correct: false },
                    { text: "C) The hike was easy.", correct: false },
                    { text: "D) The hiker was exhausted.", correct: false }
                ],
                explanation: "The broad smile suggests a positive, successful experience, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Inferring Author’s Perspective",
                passage: "The article describes urban sprawl with words like ‘chaotic’ and ‘unsustainable.’",
                content: `
                    <h2>Example 2: Inferring Author’s Perspective</h2>
                    <p>Question: What is the author’s view on urban sprawl?</p>
                    <p>Step 1: Analyze tone: Negative words like ‘chaotic’ imply disapproval.</p>
                    <p>Step 2: Apply rule: Word choice reveals the author’s unstated opinion.</p>
                    <p>Solution: The author views urban sprawl negatively, as problematic.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "The review praises a novel as ‘brilliant’ and ‘captivating.’",
                question: "What is the author’s view on the novel?",
                options: [
                    { text: "A) The author admires the novel.", correct: true },
                    { text: "B) The author finds the novel boring.", correct: false },
                    { text: "C) The author is neutral about the novel.", correct: false },
                    { text: "D) The author dislikes the novel.", correct: false }
                ],
                explanation: "Positive words like ‘brilliant’ imply admiration, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Predicting Outcomes",
                passage: "The team trained rigorously, but their star player was injured before the game.",
                content: `
                    <h2>Example 3: Predicting Outcomes</h2>
                    <p>Question: What can be inferred about the team’s game performance?</p>
                    <p>Step 1: Analyze clues: Rigorous training suggests strength, but the injury is a setback.</p>
                    <p>Step 2: Apply rule: Use evidence to predict likely outcomes.</p>
                    <p>Solution: The team may struggle in the game due to the star player’s injury.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "The chef prepared a new dish meticulously, but the main ingredient was missing.",
                question: "What can be inferred about the dish’s outcome?",
                options: [
                    { text: "A) The dish may not meet expectations.", correct: true },
                    { text: "B) The dish will be a success.", correct: false },
                    { text: "C) The chef will win an award.", correct: false },
                    { text: "D) The dish will be perfect.", correct: false }
                ],
                explanation: "Missing a main ingredient suggests a likely failure, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Inferring Relationships",
                passage: "Maria avoided eye contact with Tom after their meeting ended abruptly.",
                content: `
                    <h2>Example 4: Inferring Relationships</h2>
                    <p>Question: What can be inferred about Maria and Tom’s interaction?</p>
                    <p>Step 1: Analyze behavior: Avoiding eye contact and an abrupt end suggest tension.</p>
                    <p>Step 2: Apply rule: Actions imply unstated emotions or conflicts.</p>
                    <p>Solution: Maria and Tom likely had a disagreement or uncomfortable exchange.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Jake laughed nervously when Sarah mentioned the project deadline.",
                question: "What can be inferred about Jake’s feelings?",
                options: [
                    { text: "A) Jake is anxious about the deadline.", correct: true },
                    { text: "B) Jake is confident about the project.", correct: false },
                    { text: "C) Jake is amused by Sarah.", correct: false },
                    { text: "D) Jake is indifferent to the deadline.", correct: false }
                ],
                explanation: "Nervous laughter suggests anxiety, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Inferring Tone",
                passage: "The essay describes a festival with phrases like ‘vibrant celebration’ and ‘joyful chaos.’",
                content: `
                    <h2>Example 5: Inferring Tone</h2>
                    <p>Question: What is the implied tone of the passage?</p>
                    <p>Step 1: Analyze word choice: Positive, energetic phrases suggest enthusiasm.</p>
                    <p>Step 2: Apply rule: Tone is inferred from descriptive language.</p>
                    <p>Solution: The tone is positive and celebratory, reflecting excitement.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The report discusses pollution with terms like ‘alarming crisis’ and ‘urgent threat.’",
                question: "What is the implied tone?",
                options: [
                    { text: "A) Concerned and urgent", correct: true },
                    { text: "B) Neutral and factual", correct: false },
                    { text: "C) Humorous and light", correct: false },
                    { text: "D) Optimistic and hopeful", correct: false }
                ],
                explanation: "Alarmist terms suggest a concerned tone, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Inferring Implied Meanings",
                passage: "The politician smiled but dodged questions about the scandal.",
                content: `
                    <h2>Example 6: Inferring Implied Meanings</h2>
                    <p>Question: What can be inferred about the politician’s stance?</p>
                    <p>Step 1: Analyze behavior: Smiling but dodging suggests evasion.</p>
                    <p>Step 2: Apply rule: Actions imply unstated motives or discomfort.</p>
                    <p>Solution: The politician is likely hiding something or uncomfortable with the scandal.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The CEO nodded but quickly changed the topic when asked about layoffs.",
                question: "What can be inferred about the CEO’s stance?",
                options: [
                    { text: "A) The CEO is avoiding the layoff issue.", correct: true },
                    { text: "B) The CEO is confident about layoffs.", correct: false },
                    { text: "C) The CEO is amused by the question.", correct: false },
                    { text: "D) The CEO is indifferent to layoffs.", correct: false }
                ],
                explanation: "Changing the topic suggests avoidance, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Inferring Context",
                passage: "The crowd cheered wildly as the runner crossed the finish line first.",
                content: `
                    <h2>Example 7: Inferring Context</h2>
                    <p>Question: What can be inferred about the event?</p>
                    <p>Step 1: Analyze reaction: Wild cheering implies a significant achievement.</p>
                    <p>Step 2: Apply rule: Context is inferred from reactions and actions.</p>
                    <p>Solution: The event is likely a competitive race with a victorious outcome.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The audience gasped as the magician pulled a rabbit from the hat.",
                question: "What can be inferred about the event?",
                options: [
                    { text: "A) It is a surprising magic performance.", correct: true },
                    { text: "B) It is a scientific lecture.", correct: false },
                    { text: "C) It is a boring presentation.", correct: false },
                    { text: "D) It is a cooking demonstration.", correct: false }
                ],
                explanation: "The gasp suggests a surprising act, implying a magic show, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "The teacher sighed as students ignored the assignment instructions.",
        question: "What can be inferred about the teacher’s feelings?",
        answers: [
            { text: "A) The teacher is frustrated with the students.", correct: true },
            { text: "B) The teacher is pleased with the students.", correct: false },
            { text: "C) The teacher is indifferent to the students.", correct: false },
            { text: "D) The teacher is amused by the students.", correct: false }
        ],
        explanation: "Sighing suggests frustration, making A correct.",
        difficulty: "easy",
        category: "act-inference"
    },
    {
        passage: "The blog uses terms like ‘disastrous policy’ to describe new regulations.",
        question: "What is the author’s view on the regulations?",
        answers: [
            { text: "A) The author disapproves of the regulations.", correct: true },
            { text: "B) The author supports the regulations.", correct: false },
            { text: "C) The author is neutral about the regulations.", correct: false },
            { text: "D) The author is confused by the regulations.", correct: false }
        ],
        explanation: "Negative terms imply disapproval, making A correct.",
        difficulty: "medium",
        category: "act-inference"
    },
    {
        passage: "The team practiced daily, but their coach cancelled the final rehearsal.",
        question: "What can be inferred about the team’s preparation?",
        answers: [
            { text: "A) The team may be less prepared for the event.", correct: true },
            { text: "B) The team is fully prepared.", correct: false },
            { text: "C) The team will win the event.", correct: false },
            { text: "D) The team is unmotivated.", correct: false }
        ],
        explanation: "Cancelling the final rehearsal suggests a preparation setback, making A correct.",
        difficulty: "medium",
        category: "act-inference"
    },
    {
        passage: "Anna hesitated before answering the question about her recent trip.",
        question: "What can be inferred about Anna’s trip?",
        answers: [
            { text: "A) Anna may have had an uncomfortable experience.", correct: true },
            { text: "B) Anna enjoyed her trip immensely.", correct: false },
            { text: "C) Anna forgot about her trip.", correct: false },
            { text: "D) Anna is excited to share her trip.", correct: false }
        ],
        explanation: "Hesitation suggests discomfort or reluctance, making A correct.",
        difficulty: "medium",
        category: "act-inference"
    },
    {
        passage: "The article describes a storm with words like ‘furious winds’ and ‘relentless rain.’",
        question: "What is the implied tone?",
        answers: [
            { text: "A) Intense and dramatic", correct: true },
            { text: "B) Calm and soothing", correct: false },
            { text: "C) Humorous and light", correct: false },
            { text: "D) Neutral and factual", correct: false }
        ],
        explanation: "Vivid, strong terms suggest an intense tone, making A correct.",
        difficulty: "easy",
        category: "act-inference"
    },
    {
        passage: "The manager avoided discussing the budget cuts during the meeting.",
        question: "What can be inferred about the manager’s stance?",
        answers: [
            { text: "A) The manager is uncomfortable with the budget cuts.", correct: true },
            { text: "B) The manager supports the budget cuts.", correct: false },
            { text: "C) The manager is indifferent to the budget cuts.", correct: false },
            { text: "D) The manager is unaware of the budget cuts.", correct: false }
        ],
        explanation: "Avoidance suggests discomfort, making A correct.",
        difficulty: "medium",
        category: "act-inference"
    },
    {
        passage: "The crowd erupted in applause as the singer hit the final note.",
        question: "What can be inferred about the performance?",
        answers: [
            { text: "A) The performance was impressive and well-received.", correct: true },
            { text: "B) The performance was disappointing.", correct: false },
            { text: "C) The performance was confusing.", correct: false },
            { text: "D) The performance was average.", correct: false }
        ],
        explanation: "Erupting applause suggests a strong, positive reaction, making A correct.",
        difficulty: "easy",
        category: "act-inference"
    }
];

// Variables
let categoryStats = {
    "act-inference": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "6";
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
        categoryStats["act-inference"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-inference"].incorrect++;
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
        case 6: return englishQuestions;
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
        category: "act-inference",
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
    let totalCorrect = categoryStats["act-inference"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-inference"].incorrect;

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
    localStorage.setItem(`act-inference-lessonScore-${lessonId}`, score);
    console.log(`Saved act-inference-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-inference-lessonScore-${lessonId}`) || "Not completed yet";
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