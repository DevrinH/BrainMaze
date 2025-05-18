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
                content: `
                    <h2>Example 1: Word Choice (Precision)</h2>
                    <p>Passage: The scientist’s discovery was (good/amazing) because it changed the field.</p>
                    <p>Question: Which word is more precise?</p>
                    <p>Step 1: Evaluate context: The discovery changed the field, suggesting a significant impact.</p>
                    <p>Step 2: Apply rule: Choose words that convey specific meaning. "Amazing" suggests awe-inspiring impact, while "good" is vague.</p>
                    <p>Solution: The correct word is "amazing." The scientist’s discovery was amazing because it changed the field.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: The chef created a (nice/delicious) dish for the guests. Which word is more precise?",
                options: [
                    { text: "A) delicious", correct: true },
                    { text: "B) nice", correct: false },
                    { text: "C) great", correct: false },
                    { text: "D) fine", correct: false }
                ],
                explanation: "The word 'delicious' specifically describes the dish’s taste, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Tone Consistency",
                content: `
                    <h2>Example 2: Tone Consistency</h2>
                    <p>Passage: The report thoroughly analyzes the data but then it (totally messes up/goes awry) in the conclusion.</p>
                    <p>Question: Which phrase matches the formal tone?</p>
                    <p>Step 1: Identify tone: The report is formal ("thoroughly analyzes").</p>
                    <p>Step 2: Apply rule: Maintain consistent tone. "Goes awry" is formal, while "totally messes up" is informal.</p>
                    <p>Solution: The correct phrase is "goes awry." The report thoroughly analyzes the data but then it goes awry in the conclusion.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: The lecture was insightful, but the speaker (blew it/faltered) during the Q&A. Which word matches the formal tone?",
                options: [
                    { text: "A) faltered", correct: true },
                    { text: "B) blew it", correct: false },
                    { text: "C) messed up", correct: false },
                    { text: "D) flopped", correct: false }
                ],
                explanation: "The word 'faltered' maintains the formal tone of 'insightful,' making A correct."
            },
            {
                type: "example",
                title: "Example 3: Transitions",
                content: `
                    <h2>Example 3: Transitions</h2>
                    <p>Passage: The experiment failed. (However/And) the team learned valuable lessons.</p>
                    <p>Question: Which transition is appropriate?</p>
                    <p>Step 1: Analyze relationship: The second sentence contrasts the failure with a positive outcome.</p>
                    <p>Step 2: Apply rule: Use contrast transitions (e.g., "however") for opposing ideas.</p>
                    <p>Solution: The correct transition is "however." The experiment failed. However, the team learned valuable lessons.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: The project was behind schedule. (Thus/Still) the team met the deadline. Which transition is appropriate?",
                options: [
                    { text: "A) Still", correct: true },
                    { text: "B) Thus", correct: false },
                    { text: "C) And", correct: false },
                    { text: "D) So", correct: false }
                ],
                explanation: "The second sentence contrasts the delay with success, so 'still' is correct, making A the answer."
            },
            {
                type: "example",
                title: "Example 4: Conciseness",
                content: `
                    <h2>Example 4: Conciseness</h2>
                    <p>Passage: The meeting was scheduled to take place at 2 p.m. in the afternoon.</p>
                    <p>Question: How can this sentence be made more concise?</p>
                    <p>Step 1: Identify redundancy: "2 p.m." already implies "in the afternoon."</p>
                    <p>Step 2: Apply rule: Remove redundant phrases to make sentences concise.</p>
                    <p>Solution: The concise version is: The meeting was scheduled for 2 p.m.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: She returned back to her hometown last summer. How can this sentence be made more concise?",
                options: [
                    { text: "A) She returned to her hometown last summer.", correct: true },
                    { text: "B) She went back to her hometown last summer.", correct: false },
                    { text: "C) She returned back home last summer.", correct: false },
                    { text: "D) She returned to her hometown.", correct: false }
                ],
                explanation: "The word 'back' is redundant with 'returned,' so A is the most concise and correct."
            },
            {
                type: "example",
                title: "Example 5: Word Choice (Context)",
                content: `
                    <h2>Example 5: Word Choice (Context)</h2>
                    <p>Passage: The politician’s decision to ignore the evidence was (unwise/stubborn).</p>
                    <p>Question: Which word best fits the context?</p>
                    <p>Step 1: Analyze context: Ignoring evidence suggests a refusal to consider facts.</p>
                    <p>Step 2: Apply rule: Choose the word that matches the behavior. "Stubborn" implies refusal, while "unwise" is broader.</p>
                    <p>Solution: The correct word is "stubborn." The politician’s decision to ignore the evidence was stubborn.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: The athlete’s effort to continue despite injury was (brave/risky). Which word best fits the context?",
                options: [
                    { text: "A) brave", correct: true },
                    { text: "B) risky", correct: false },
                    { text: "C) foolish", correct: false },
                    { text: "D) bold", correct: false }
                ],
                explanation: "Continuing despite injury suggests courage, so 'brave' is the best fit, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Style Consistency",
                content: `
                    <h2>Example 6: Style Consistency</h2>
                    <p>Passage: The novel’s prose is elegant and sophisticated, but the dialogue is (super casual/relaxed).</p>
                    <p>Question: Which phrase maintains the style?</p>
                    <p>Step 1: Identify style: The prose is described as "elegant and sophisticated."</p>
                    <p>Step 2: Apply rule: Dialogue should match the novel’s refined style. "Relaxed" is neutral, while "super casual" is informal.</p>
                    <p>Solution: The correct phrase is "relaxed." The novel’s prose is elegant and sophisticated, but the dialogue is relaxed.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: The article’s analysis is rigorous, but its conclusion is (kinda weak/somewhat tentative). Which phrase matches the style?",
                options: [
                    { text: "A) somewhat tentative", correct: true },
                    { text: "B) kinda weak", correct: false },
                    { text: "C) totally off", correct: false },
                    { text: "D) pretty vague", correct: false }
                ],
                explanation: "The rigorous analysis requires a formal style, so 'somewhat tentative' fits best, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Avoiding Redundancy",
                content: `
                    <h2>Example 7: Avoiding Redundancy</h2>
                    <p>Passage: The plan was completely finished and entirely done.</p>
                    <p>Question: How can this sentence be improved?</p>
                    <p>Step 1: Identify redundancy: "Completely finished" and "entirely done" repeat the same idea.</p>
                    <p>Step 2: Apply rule: Use one clear term to avoid redundancy.</p>
                    <p>Solution: The improved sentence is: The plan was finished.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: The event was absolutely essential and totally necessary. How can this sentence be improved?",
                options: [
                    { text: "A) The event was essential.", correct: true },
                    { text: "B) The event was absolutely necessary.", correct: false },
                    { text: "C) The event was totally essential.", correct: false },
                    { text: "D) The event was necessary and essential.", correct: false }
                ],
                explanation: "The phrases 'absolutely essential' and 'totally necessary' are redundant, so 'essential' alone is best, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        question: "Passage: The author’s argument was (compelling/okay) due to strong evidence. Which word is more precise?",
        answers: [
            { text: "A) compelling", correct: true },
            { text: "B) okay", correct: false },
            { text: "C) nice", correct: false },
            { text: "D) good", correct: false }
        ],
        explanation: "The word 'compelling' conveys strong persuasion, fitting the context of strong evidence, making A correct.",
        difficulty: "easy",
        category: "act-knowledge-of-language"
    },
    {
        question: "Passage: The presentation was detailed, but the speaker (bombed/stumbled) in delivery. Which word matches the formal tone?",
        answers: [
            { text: "A) stumbled", correct: true },
            { text: "B) bombed", correct: false },
            { text: "C) flopped", correct: false },
            { text: "D) crashed", correct: false }
        ],
        explanation: "The formal tone of 'detailed' is maintained by 'stumbled,' making A correct.",
        difficulty: "medium",
        category: "act-knowledge-of-language"
    },
    {
        question: "Passage: The team lost the game. (Nevertheless/Also) they showed great spirit. Which transition is appropriate?",
        answers: [
            { text: "A) Nevertheless", correct: true },
            { text: "B) Also", correct: false },
            { text: "C) And", correct: false },
            { text: "D) So", correct: false }
        ],
        explanation: "The contrast between losing and showing spirit requires 'nevertheless,' making A correct.",
        difficulty: "medium",
        category: "act-knowledge-of-language"
    },
    {
        question: "Passage: The company will expand its operations in the near future soon. How can this sentence be made more concise?",
        answers: [
            { text: "A) The company will expand its operations soon.", correct: true },
            { text: "B) The company will expand in the future.", correct: false },
            { text: "C) The company will expand operations soon.", correct: false },
            { text: "D) The company will expand its operations.", correct: false }
        ],
        explanation: "The phrase 'in the near future soon' is redundant; 'soon' is concise and sufficient, making A correct.",
        difficulty: "easy",
        category: "act-knowledge-of-language"
    },
    {
        question: "Passage: The researcher’s refusal to revise was (careless/stubborn). Which word best fits the context?",
        answers: [
            { text: "A) stubborn", correct: true },
            { text: "B) careless", correct: false },
            { text: "C) unwise", correct: false },
            { text: "D) reckless", correct: false }
        ],
        explanation: "Refusing to revise suggests inflexibility, so 'stubborn' is the best fit, making A correct.",
        difficulty: "medium",
        category: "act-knowledge-of-language"
    },
    {
        question: "Passage: The essay’s tone is academic, but its examples are (way too chill/slightly informal). Which phrase matches the style?",
        answers: [
            { text: "A) slightly informal", correct: true },
            { text: "B) way too chill", correct: false },
            { text: "C) super relaxed", correct: false },
            { text: "D) totally casual", correct: false }
        ],
        explanation: "The academic tone requires a formal style, so 'slightly informal' fits best, making A correct.",
        difficulty: "medium",
        category: "act-knowledge-of-language"
    },
    {
        question: "Passage: The task was fully completed and entirely done. How can this sentence be improved?",
        answers: [
            { text: "A) The task was completed.", correct: true },
            { text: "B) The task was fully done.", correct: false },
            { text: "C) The task was entirely completed.", correct: false },
            { text: "D) The task was done and completed.", correct: false }
        ],
        explanation: "The phrases 'fully completed' and 'entirely done' are redundant; 'completed' alone is sufficient, making A correct.",
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
                <div class="question-row">
                    <div class="passage-text">${extractPassage(item.content)}</div>
                    <div class="right-column">
                        <div class="question-text">${item.content.replace(extractPassage(item.content), '')}</div>
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
            const passage = extractPassage(item.question);
            lessonContent.innerHTML = `
                <div class="question-row">
                    <div class="passage-text">${passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question.replace(passage, '')}</div>
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

// Extract passage from content
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
        const passage = extractPassage(question.question);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question.replace(passage, '')}</div>
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