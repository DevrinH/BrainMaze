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
        title: "Conventions of Standard English",
        content: [
            {
                type: "example",
                title: "Example 1: Subject-Verb Agreement",
                passage: "The team of researchers is presenting their findings tomorrow.",
                content: `
                    <h2>Example 1: Subject-Verb Agreement</h2>
                    <p>Question: Which verb form is correct in the passage?</p>
                    <p>Step 1: Identify the subject: The team (singular).</p>
                    <p>Step 2: Apply rule: Singular subjects take singular verbs.</p>
                    <p>Solution: The correct form is "is." The team of researchers is presenting their findings tomorrow.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The group of students was excited about the field trip.",
                question: "Which verb form is correct?",
                options: [
                    { text: "A) was", correct: true },
                    { text: "B) were", correct: false },
                    { text: "C) is", correct: false },
                    { text: "D) are", correct: false }
                ],
                explanation: "The subject 'group' is singular, requiring the singular verb 'was,' making A correct."
            },
            {
                type: "example",
                title: "Example 2: Pronoun-Antecedent Agreement",
                passage: "Each student must bring his or her own calculator.",
                content: `
                    <h2>Example 2: Pronoun-Antecedent Agreement</h2>
                    <p>Question: Which pronoun is correct in the passage?</p>
                    <p>Step 1: Identify the antecedent: Each student (singular).</p>
                    <p>Step 2: Apply rule: Singular antecedents require singular pronouns.</p>
                    <p>Solution: The correct pronoun is "his or her." Each student must bring his or her own calculator.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Every athlete should check his or her equipment before the game.",
                question: "Which pronoun is correct?",
                options: [
                    { text: "A) his or her", correct: true },
                    { text: "B) their", correct: false },
                    { text: "C) its", correct: false },
                    { text: "D) them", correct: false }
                ],
                explanation: "The antecedent 'every athlete' is singular, requiring the singular pronoun 'his or her,' making A correct."
            },
            {
                type: "example",
                title: "Example 3: Comma Usage",
                passage: "Maria wanted to attend the concert, but she had to finish her homework first.",
                content: `
                    <h2>Example 3: Comma Usage</h2>
                    <p>Question: Does the passage need a comma?</p>
                    <p>Step 1: Identify structure: Two independent clauses joined by "but."</p>
                    <p>Step 2: Apply rule: Use a comma before a coordinating conjunction linking independent clauses.</p>
                    <p>Solution: The sentence is correct with a comma: Maria wanted to attend the concert, but she had to finish her homework first.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "John wanted to join the club but he was too busy.",
                question: "Does the passage need a comma?",
                options: [
                    { text: "A) Yes, before 'but'", correct: true },
                    { text: "B) No, it’s correct as is", correct: false },
                    { text: "C) Yes, after 'club'", correct: false },
                    { text: "D) Yes, after 'he'", correct: false }
                ],
                explanation: "Two independent clauses joined by 'but' require a comma before the conjunction, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Sentence Structure",
                passage: "Running quickly to catch the bus, Sarah left her backpack behind.",
                content: `
                    <h2>Example 4: Sentence Structure</h2>
                    <p>Question: Is the sentence structure correct in the passage?</p>
                    <p>Step 1: Identify issue: The modifier "Running quickly" correctly describes Sarah.</p>
                    <p>Step 2: Apply rule: Place modifiers close to the word they describe.</p>
                    <p>Solution: The sentence is correct: Running quickly to catch the bus, Sarah left her backpack behind.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Studying late into the night, the book was left open by Tom.",
                question: "What’s wrong with the passage?",
                options: [
                    { text: "A) Misplaced modifier", correct: true },
                    { text: "B) Incorrect verb tense", correct: false },
                    { text: "C) Missing comma", correct: false },
                    { text: "D) Pronoun error", correct: false }
                ],
                explanation: "The modifier 'Studying late' describes Tom, not the book, making it a misplaced modifier, so A is correct."
            },
            {
                type: "example",
                title: "Example 5: Parallel Structure",
                passage: "She enjoys hiking, swimming, and riding bikes.",
                content: `
                    <h2>Example 5: Parallel Structure</h2>
                    <p>Question: Is the parallel structure correct in the passage?</p>
                    <p>Step 1: Identify list: Hiking, swimming, and riding (all gerunds).</p>
                    <p>Step 2: Apply rule: Items in a list should have parallel structure.</p>
                    <p>Solution: The sentence is correct: She enjoys hiking, swimming, and riding bikes.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "He likes to read books, watch movies, and painting.",
                question: "What’s wrong with the passage?",
                options: [
                    { text: "A) Lack of parallel structure", correct: true },
                    { text: "B) Comma error", correct: false },
                    { text: "C) Subject-verb disagreement", correct: false },
                    { text: "D) Pronoun error", correct: false }
                ],
                explanation: "The list items are not parallel (infinitive, infinitive, gerund), making A correct."
            },
            {
                type: "example",
                title: "Example 6: Apostrophe Usage",
                passage: "The dog’s toys were scattered across the yard.",
                content: `
                    <h2>Example 6: Apostrophe Usage</h2>
                    <p>Question: Is the apostrophe used correctly in the passage?</p>
                    <p>Step 1: Identify possession: The toys belong to one dog.</p>
                    <p>Step 2: Apply rule: Singular possessive is dog’s.</p>
                    <p>Solution: The apostrophe is correct: The dog’s toys were scattered across the yard.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The cats’ whiskers were twitching.",
                question: "Is the apostrophe correct if referring to one cat?",
                options: [
                    { text: "A) No, it should be cat’s", correct: true },
                    { text: "B) Yes, it’s correct", correct: false },
                    { text: "C) No, no apostrophe needed", correct: false },
                    { text: "D) No, it should be cats", correct: false }
                ],
                explanation: "For one cat, the singular possessive is 'cat’s,' not 'cats’,' making A correct."
            },
            {
                type: "example",
                title: "Example 7: Verb Tense Consistency",
                passage: "She walked to the store and bought milk.",
                content: `
                    <h2>Example 7: Verb Tense Consistency</h2>
                    <p>Question: Is the verb tense consistent in the passage?</p>
                    <p>Step 1: Identify tenses: "walked" (past) and "bought" (past).</p>
                    <p>Step 2: Apply rule: Maintain consistent verb tense.</p>
                    <p>Solution: The sentence is correct: She walked to the store and bought milk.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "He runs every morning and lifted weights yesterday.",
                question: "What’s wrong with the passage?",
                options: [
                    { text: "A) Inconsistent verb tense", correct: true },
                    { text: "B) Missing comma", correct: false },
                    { text: "C) Pronoun error", correct: false },
                    { text: "D) Subject-verb disagreement", correct: false }
                ],
                explanation: "The sentence shifts from present ('runs') to past ('lifted') without justification, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "The committee has decided to postpone the event.",
        question: "Which verb is correct in the passage?",
        answers: [
            { text: "A) has", correct: true },
            { text: "B) have", correct: false },
            { text: "C) is", correct: false },
            { text: "D) are", correct: false }
        ],
        explanation: "The subject 'committee' is singular, requiring the singular verb 'has,' making A correct.",
        difficulty: "easy",
        category: "act-conventions-of-standard-english"
    },
    {
        passage: "Neither of the boys wants to join the choir.",
        question: "Which verb is correct in the passage?",
        answers: [
            { text: "A) wants", correct: true },
            { text: "B) want", correct: false },
            { text: "C) is wanting", correct: false },
            { text: "D) are wanting", correct: false }
        ],
        explanation: "'Neither' is singular, requiring the singular verb 'wants,' making A correct.",
        difficulty: "medium",
        category: "act-conventions-of-standard-english"
    },
    {
        passage: "Before leaving, Sarah packed her bags and locked the door.",
        question: "Which verb is correct in the passage?",
        answers: [
            { text: "A) locked", correct: true },
            { text: "B) locks", correct: false },
            { text: "C) is locking", correct: false },
            { text: "D) lock", correct: false }
        ],
        explanation: "The past tense 'packed' requires consistent past tense 'locked,' making A correct.",
        difficulty: "medium",
        category: "act-conventions-of-standard-english"
    },
    {
        passage: "The book, which was on the shelf, belongs to Anna.",
        question: "Which verb is correct in the passage?",
        answers: [
            { text: "A) belongs", correct: true },
            { text: "B) belong", correct: false },
            { text: "C) is belonging", correct: false },
            { text: "D) are belonging", correct: false }
        ],
        explanation: "The subject 'book' is singular, requiring the singular verb 'belongs,' making A correct.",
        difficulty: "easy",
        category: "act-conventions-of-standard-english"
    },
    {
        passage: "To prepare for the exam, she studies, exercises, and sleeps well.",
        question: "Which verb is correct in the passage?",
        answers: [
            { text: "A) sleeps", correct: true },
            { text: "B) sleep", correct: false },
            { text: "C) sleeping", correct: false },
            { text: "D) is sleeping", correct: false }
        ],
        explanation: "Parallel structure requires 'sleeps' to match the present tense verbs 'studies' and 'exercises,' making A correct.",
        difficulty: "medium",
        category: "act-conventions-of-standard-english"
    },
    {
        passage: "The childrens toys were scattered.",
        question: "What’s wrong with the passage?",
        answers: [
            { text: "A) Apostrophe error", correct: true },
            { text: "B) Verb tense error", correct: false },
            { text: "C) Comma error", correct: false },
            { text: "D) Pronoun error", correct: false }
        ],
        explanation: "The possessive form of 'children' is 'children’s,' not 'childrens,' making A correct.",
        difficulty: "medium",
        category: "act-conventions-of-standard-english"
    },
    {
        passage: "After winning the race, the trophy was held high by the runner.",
        question: "What’s wrong with the passage?",
        answers: [
            { text: "A) Misplaced modifier", correct: true },
            { text: "B) Subject-verb disagreement", correct: false },
            { text: "C) Incorrect tense", correct: false },
            { text: "D) Missing comma", correct: false }
        ],
        explanation: "The modifier 'After winning' describes the runner, not the trophy, making it a misplaced modifier, so A is correct.",
        difficulty: "medium",
        category: "act-conventions-of-standard-english"
    }
];

// Variables
let categoryStats = {
    "act-conventions-of-standard-english": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "1";
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
        categoryStats["act-conventions-of-standard-english"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-conventions-of-standard-english"].incorrect++;
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
        case 1: return englishQuestions;
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
        category: "act-conventions-of-standard-english",
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
    let totalCorrect = categoryStats["act-conventions-of-standard-english"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-conventions-of-standard-english"].incorrect;

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
    localStorage.setItem(`act-conventions-of-standard-english-lessonScore-${lessonId}`, score);
    console.log(`Saved act-conventions-of-standard-english-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-conventions-of-standard-english-lessonScore-${lessonId}`) || "Not completed yet";
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