// Ensure scores display on page load by calling showScore
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
        title: "Grammar and Sentence Structure",
        content: [
            {
                type: "example",
                title: "Example 1: Subject-Verb Agreement",
                content: `
                    <h2>Example 1: Subject-Verb Agreement</h2>
                    <p>Sentence: 'The team (work/works) together to meet deadlines.'</p>
                    <p>Question: Which verb is correct?</p>
                    <p>Step 1: Identify the subject: 'The team' (singular).</p>
                    <p>Step 2: Choose the singular verb: 'works'.</p>
                    <p>Correct Sentence: The team works together to meet deadlines.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Sentence: 'The committee (decide/decides) on the budget each year.' Which verb is correct?",
                options: [
                    { text: "A) decides", correct: true },
                    { text: "B) decide", correct: false },
                    { text: "C) deciding", correct: false },
                    { text: "D) decided", correct: false }
                ],
                explanation: "The subject 'committee' is singular, so the singular verb 'decides' is correct."
            },
            {
                type: "example",
                title: "Example 2: Avoiding Sentence Fragments",
                content: `
                    <h2>Example 2: Avoiding Sentence Fragments</h2>
                    <p>Sentence: 'Because the employee handbook outlines safety rules.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check for a complete thought: Starts with 'Because', lacks a main clause.</p>
                    <p>Step 2: Fix by adding a main clause: 'Because the employee handbook outlines safety rules, staff must follow them.'</p>
                    <p>Correct Sentence: Because the employee handbook outlines safety rules, staff must follow them.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Sentence: 'Although the training session was informative.' Is this a complete sentence or a fragment?",
                options: [
                    { text: "A) Fragment", correct: true },
                    { text: "B) Complete sentence", correct: false },
                    { text: "C) Run-on sentence", correct: false },
                    { text: "D) Compound sentence", correct: false }
                ],
                explanation: "The sentence starts with 'Although' and lacks a main clause, making it a fragment."
            },
            {
                type: "example",
                title: "Example 3: Correcting Run-On Sentences",
                content: `
                    <h2>Example 3: Correcting Run-On Sentences</h2>
                    <p>Sentence: 'The meeting was long it covered many topics.'</p>
                    <p>Question: How can this run-on be fixed?</p>
                    <p>Step 1: Identify the issue: Two independent clauses without proper punctuation.</p>
                    <p>Step 2: Fix with a period or semicolon: 'The meeting was long. It covered many topics.'</p>
                    <p>Correct Sentence: The meeting was long. It covered many topics.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Sentence: 'The project is urgent we need to finish by Friday.' How should this run-on be corrected?",
                options: [
                    { text: "A) The project is urgent. We need to finish by Friday.", correct: true },
                    { text: "B) The project is urgent we need to finish by Friday.", correct: false },
                    { text: "C) The project is urgent, we need to finish by Friday.", correct: false },
                    { text: "D) The project is urgent and we need to finish by Friday.", correct: true }
                ],
                explanation: "The run-on can be fixed with a period (A) or a  (D), both separating the clauses correctly."
            },
            {
                type: "example",
                title: "Example 4: Pronoun-Antecedent Agreement",
                content: `
                    <h2>Example 4: Pronoun-Antecedent Agreement</h2>
                    <p>Sentence: 'Each employee must submit their report by Monday.'</p>
                    <p>Question: Is the pronoun correct?</p>
                    <p>Step 1: Identify the antecedent: 'Each employee' (singular).</p>
                    <p>Step 2: Check the pronoun: 'Their' (plural) is incorrect; use 'his or her'.</p>
                    <p>Correct Sentence: Each employee must submit his or her report by Monday.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Sentence: 'Every student should bring their own supplies.' Which pronoun is correct?",
                options: [
                    { text: "A) his or her", correct: true },
                    { text: "B) their", correct: false },
                    { text: "C) them", correct: false },
                    { text: "D) its", correct: false }
                ],
                explanation: "The singular antecedent 'Every student' requires the singular pronoun 'his or her'."
            },
            {
                type: "example",
                title: "Example 5: Proper Comma Usage",
                content: `
                    <h2>Example 5: Proper Comma Usage</h2>
                    <p>Sentence: 'The manager, who led the training, was very knowledgeable.'</p>
                    <p>Question: Is the comma usage correct?</p>
                    <p>Step 1: Identify the clause: 'who led the training' is nonessential.</p>
                    <p>Step 2: Confirm: Nonessential clauses need commas.</p>
                    <p>Correct Sentence: The manager, who led the training, was very knowledgeable.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Sentence: 'The report which was due last week is incomplete.' Is the comma usage correct?",
                options: [
                    { text: "A) Incorrect, needs commas around 'which was due last week'.", correct: true },
                    { text: "B) Correct, no commas needed.", correct: false },
                    { text: "C) Incorrect, needs a comma before 'which'.", correct: false },
                    { text: "D) Incorrect, needs a comma after 'week'.", correct: false }
                ],
                explanation: "The clause 'which was due last week' is nonessential and requires commas."
            },
            {
                type: "example",
                title: "Example 6: Verb Tense Consistency",
                content: `
                    <h2>Example 6: Verb Tense Consistency</h2>
                    <p>Sentence: 'The team meets weekly and discussed new projects.'</p>
                    <p>Question: Is the verb tense consistent?</p>
                    <p>Step 1: Identify verbs: 'meets' (present), 'discussed' (past).</p>
                    <p>Step 2: Fix for consistency: Use present tense 'discusses'.</p>
                    <p>Correct Sentence: The team meets weekly and discusses new projects.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Sentence: 'The company launched a new product and is planning a campaign.' Is the verb tense consistent?",
                options: [
                    { text: "A) Consistent, both are present tense.", correct: true },
                    { text: "B) Inconsistent, 'launched' is past tense.", correct: false },
                    { text: "C) Inconsistent, 'is planning' is present continuous.", correct: false },
                    { text: "D) Consistent, both are past tense.", correct: false }
                ],
                explanation: "Both 'launched' and 'is planning' describe current actions, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Combining Grammar and Structure",
                content: `
                    <h2>Example 7: Combining Grammar and Structure</h2>
                    <p>Sentence: 'The policy is strict employees must follow it or they face penalties.'</p>
                    <p>Question: What is wrong with this sentence?</p>
                    <p>Step 1: Check structure: Run-on sentence with no punctuation.</p>
                    <p>Step 2: Check grammar: Plural 'employees' matches 'they'.</p>
                    <p>Correct Sentence: The policy is strict; employees must follow it, or they face penalties.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Sentence: 'The training is mandatory all employees must attend or risk losing benefits.' How should this be corrected?",
                options: [
                    { text: "A) The training is mandatory; all employees must attend, or they risk losing benefits.", correct: true },
                    { text: "B) The training is mandatory all employees must attend or risk losing benefits.", correct: false },
                    { text: "C) The training is mandatory, all employees must attend or they risk losing benefits.", correct: false },
                    { text: "D) The training is mandatory all employees must attend, or they risks losing benefits.", correct: false }
                ],
                explanation: "The run-on needs a semicolon or period, and a comma before 'or' for clarity, making A correct."
            }
        ]
    }
};

// Grammar and sentence structure question array
const grammarSentenceStructureQuestions = [
    {
        question: "Sentence: 'The manager requires reports to be submitted on time otherwise delays affect the schedule.' How should this run-on sentence be corrected?",
        answers: [
            { text: "A) The manager requires reports to be submitted on time; otherwise, delays affect the schedule.", correct: true },
            { text: "B) The manager requires reports to be submitted on time otherwise delays affect the schedule.", correct: false },
            { text: "C) The manager requires reports to be submitted on time, otherwise delays affect the schedule.", correct: false },
            { text: "D) The manager requires reports to be submitted on time otherwise, delays affects the schedule.", correct: false }
        ],
        explanation: "The run-on sentence needs a semicolon to separate the clauses, and a comma after 'otherwise' for clarity, making A correct.",
        difficulty: "easy",
        category: "ged-grammar-sentence-structure"
    }
];

// Variables
let categoryStats = {
    "ged-grammar-sentence-structure": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "1"; // Default as string to match lessons object keys
let progressSteps = 0;
let totalSteps = 0; // Set dynamically in startLesson
let isQuizPhase = false;
let showingQuizTransition = false; // Flag for quiz transition
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

// DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || '1'; // Ensure string
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    showScore();
    updateProgressBar(0);
});

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
    const passageMatch = content.match(/Sentence:.*?['"].*?['"]/i) || content.match(/<p>Sentence:.*?<\/p>/i);
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
        categoryStats["ged-grammar-sentence-structure"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-grammar-sentence-structure"].incorrect++;
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
        case 1: return grammarSentenceStructureQuestions;
        default: return grammarSentenceStructureQuestions;
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
        exam: "GED",
        type: "lesson",
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("lastActivity", JSON.stringify(completionData));
    console.log("Saved lesson completion:", completionData);
}

// Show final score
function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["ged-grammar-sentence-structure"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-grammar-sentence-structure"].incorrect;

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
    if (finalScoreElement) finalScoreElement.classList.add('hide'); // Hide if exists
    document.getElementById('continue-button').addEventListener('click', () => {
        saveLessonCompletion();
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

// Record test results
function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("gedTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("gedTestResults", JSON.stringify(results));
    console.log("Final stored gedTestResults:", results);
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
    localStorage.setItem(`ged-grammar-sentence-structure-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-grammar-sentence-structure-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-grammar-sentence-structure-lessonScore-${lessonId}`) || "Not completed yet";
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