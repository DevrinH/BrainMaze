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
    const lessonId = urlParams.get('lesson') || 4;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    4: {
        title: "Main Idea",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying the Main Idea",
                passage: "Solar panels reduce energy costs and promote sustainability, though installation can be expensive.",
                content: `
                    <h2>Example 1: Identifying the Main Idea</h2>
                    <p>Question: What is the main idea of the passage?</p>
                    <p>Step 1: Identify the focus: The passage discusses solar panels’ benefits and a drawback.</p>
                    <p>Step 2: Apply rule: The main idea is the primary point, not a detail or counterpoint.</p>
                    <p>Solution: The main idea is that solar panels offer significant benefits despite high installation costs.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Urban gardens improve community health and provide fresh produce, but they require maintenance.",
                question: "What is the main idea of the passage?",
                options: [
                    { text: "A) Urban gardens benefit communities despite maintenance needs.", correct: true },
                    { text: "B) Urban gardens are difficult to maintain.", correct: false },
                    { text: "C) Fresh produce is important.", correct: false },
                    { text: "D) Communities need more gardens.", correct: false }
                ],
                explanation: "The primary focus is the benefits of urban gardens with a mention of maintenance, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Summarizing the Main Idea",
                passage: "Recycling programs conserve resources and reduce landfill waste, though public participation varies.",
                content: `
                    <h2>Example 2: Summarizing the Main Idea</h2>
                    <p>Question: Which summary best captures the main idea?</p>
                    <p>Step 1: Determine the core message: Recycling programs have environmental benefits.</p>
                    <p>Step 2: Apply rule: A summary should concisely state the main point, excluding minor details.</p>
                    <p>Solution: Recycling programs benefit the environment despite varying participation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Exercise boosts physical and mental health, but many lack time to do it regularly.",
                question: "Which summary best captures the main idea?",
                options: [
                    { text: "A) Exercise improves health despite time constraints.", correct: true },
                    { text: "B) Many people lack time for exercise.", correct: false },
                    { text: "C) Mental health is important.", correct: false },
                    { text: "D) Exercise requires a lot of time.", correct: false }
                ],
                explanation: "The main idea is exercise’s health benefits despite challenges, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Distinguishing Main Idea from Details",
                passage: "Public libraries offer free resources, like books and workshops. They promote literacy.",
                content: `
                    <h2>Example 3: Distinguishing Main Idea from Details</h2>
                    <p>Question: Which statement is the main idea?</p>
                    <p>Step 1: Identify the focus: Libraries promote literacy.</p>
                    <p>Step 2: Apply rule: The main idea is the overarching point; details support it.</p>
                    <p>Solution: The main idea is that public libraries promote literacy. 'Books and workshops' are supporting details.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Community centers host events and classes. They foster social connections.",
                question: "Which is the main idea?",
                options: [
                    { text: "A) Community centers foster social connections.", correct: true },
                    { text: "B) Community centers host events.", correct: false },
                    { text: "C) Classes are popular.", correct: false },
                    { text: "D) Events attract people.", correct: false }
                ],
                explanation: "The primary focus is fostering social connections, not the supporting detail of events, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Author’s Purpose and Main Idea",
                passage: "The article highlights how mentorship improves student outcomes, urging schools to adopt programs.",
                content: `
                    <h2>Example 4: Author’s Purpose and Main Idea</h2>
                    <p>Question: What is the author’s main purpose?</p>
                    <p>Step 1: Analyze intent: The article promotes mentorship benefits and encourages action.</p>
                    <p>Step 2: Apply rule: The main purpose aligns with the main idea and call to action.</p>
                    <p>Solution: The author’s purpose is to advocate for mentorship programs to improve student outcomes.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "The report emphasizes that green spaces reduce stress, encouraging city planners to invest in parks.",
                question: "What is the author’s main purpose?",
                options: [
                    { text: "A) To advocate for green spaces to reduce stress", correct: true },
                    { text: "B) To describe types of green spaces", correct: false },
                    { text: "C) To list city planning challenges", correct: false },
                    { text: "D) To explain stress causes", correct: false }
                ],
                explanation: "The purpose is to promote green spaces for stress reduction, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Main Idea in Complex Passages",
                passage: "Electric cars reduce emissions but face challenges like battery production costs. They are gaining popularity.",
                content: `
                    <h2>Example 5: Main Idea in Complex Passages</h2>
                    <p>Question: What is the main idea?</p>
                    <p>Step 1: Identify the focus: Electric cars’ benefits and challenges.</p>
                    <p>Step 2: Apply rule: The main idea encompasses the primary point, not secondary details.</p>
                    <p>Solution: The main idea is that electric cars offer environmental benefits despite challenges.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Online learning offers flexibility but requires self-discipline. It’s widely used in schools.",
                question: "What is the main idea?",
                options: [
                    { text: "A) Online learning is flexible but challenging.", correct: true },
                    { text: "B) Self-discipline is important.", correct: false },
                    { text: "C) Schools use online learning.", correct: false },
                    { text: "D) Flexibility is valuable.", correct: false }
                ],
                explanation: "The focus is online learning’s benefits and challenges, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Excluding Irrelevant Details",
                passage: "Volunteering builds community spirit. Last week, a volunteer wore a red shirt.",
                content: `
                    <h2>Example 6: Excluding Irrelevant Details</h2>
                    <p>Question: Which detail is irrelevant to the main idea?</p>
                    <p>Step 1: Identify the main idea: Volunteering builds community spirit.</p>
                    <p>Step 2: Apply rule: Irrelevant details do not support the main idea.</p>
                    <p>Solution: The detail about the red shirt is irrelevant, as it doesn’t relate to community spirit.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Public transit reduces traffic congestion. The buses are often blue.",
                question: "Which detail is irrelevant?",
                options: [
                    { text: "A) The buses are often blue.", correct: true },
                    { text: "B) Public transit reduces congestion.", correct: false },
                    { text: "C) Traffic is a problem.", correct: false },
                    { text: "D) Public transit is used.", correct: false }
                ],
                explanation: "The bus color is unrelated to reducing congestion, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Main Idea in Argumentative Texts",
                passage: "The editorial argues that bike lanes improve safety, citing data and addressing cost concerns.",
                content: `
                    <h2>Example 7: Main Idea in Argumentative Texts</h2>
                    <p>Question: What is the main idea?</p>
                    <p>Step 1: Identify the argument: Bike lanes improve safety.</p>
                    <p>Step 2: Apply rule: The main idea is the central claim, not evidence or counterpoints.</p>
                    <p>Solution: The main idea is that bike lanes enhance safety, supported by evidence.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The article claims that arts education boosts creativity, providing examples and noting budget issues.",
                question: "What is the main idea?",
                options: [
                    { text: "A) Arts education enhances creativity.", correct: true },
                    { text: "B) Budget issues affect schools.", correct: false },
                    { text: "C) Examples support claims.", correct: false },
                    { text: "D) Creativity is important.", correct: false }
                ],
                explanation: "The central claim is that arts education boosts creativity, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "Community recycling programs conserve resources, though they require public effort.",
        question: "What is the main idea of the passage?",
        answers: [
            { text: "A) Recycling programs benefit the environment despite effort.", correct: true },
            { text: "B) Public effort is needed for recycling.", correct: false },
            { text: "C) Resources are scarce.", correct: false },
            { text: "D) Recycling is challenging.", correct: false }
        ],
        explanation: "The focus is recycling’s benefits with a mention of effort, making A correct.",
        difficulty: "easy",
        category: "act-main-idea"
    },
    {
        passage: "Telecommuting saves commuting time but poses collaboration challenges.",
        question: "Which summary best captures the main idea?",
        answers: [
            { text: "A) Telecommuting offers benefits but has drawbacks.", correct: true },
            { text: "B) Collaboration is difficult.", correct: false },
            { text: "C) Commuting time is valuable.", correct: false },
            { text: "D) Telecommuting is popular.", correct: false }
        ],
        explanation: "The main idea covers benefits and challenges of telecommuting, making A correct.",
        difficulty: "medium",
        category: "act-main-idea"
    },
    {
        passage: "Museums preserve history and offer tours. They educate visitors.",
        question: "Which is the main idea?",
        answers: [
            { text: "A) Museums educate visitors.", correct: true },
            { text: "B) Museums offer tours.", correct: false },
            { text: "C) History is preserved.", correct: false },
            { text: "D) Visitors enjoy museums.", correct: false }
        ],
        explanation: "The primary focus is education, not the detail of tours, making A correct.",
        difficulty: "medium",
        category: "act-main-idea"
    },
    {
        passage: "The article promotes urban farming to improve diets, urging policy changes.",
        question: "What is the author’s main purpose?",
        answers: [
            { text: "A) To advocate for urban farming to improve diets", correct: true },
            { text: "B) To describe farming techniques", correct: false },
            { text: "C) To list policy challenges", correct: false },
            { text: "D) To explain diet issues", correct: false }
        ],
        explanation: "The purpose is to promote urban farming for better diets, making A correct.",
        difficulty: "medium",
        category: "act-main-idea"
    },
    {
        passage: "Renewable energy reduces pollution but involves high setup costs.",
        question: "What is the main idea?",
        answers: [
            { text: "A) Renewable energy has benefits and challenges.", correct: true },
            { text: "B) Setup costs are high.", correct: false },
            { text: "C) Pollution is a problem.", correct: false },
            { text: "D) Renewable energy is popular.", correct: false }
        ],
        explanation: "The focus is renewable energy’s benefits and challenges, making A correct.",
        difficulty: "easy",
        category: "act-main-idea"
    },
    {
        passage: "Volunteering strengthens communities. One event raised $1,000.",
        question: "Which detail is irrelevant?",
        answers: [
            { text: "A) One event raised $1,000.", correct: true },
            { text: "B) Volunteering strengthens communities.", correct: false },
            { text: "C) Communities benefit.", correct: false },
            { text: "D) Volunteering is common.", correct: false }
        ],
        explanation: "The fundraising detail is unrelated to community strength, making A correct.",
        difficulty: "medium",
        category: "act-main-idea"
    },
    {
        passage: "The editorial argues that coding classes boost innovation, citing studies and addressing costs.",
        question: "What is the main idea?",
        answers: [
            { text: "A) Coding classes promote innovation.", correct: true },
            { text: "B) Studies support claims.", correct: false },
            { text: "C) Costs are a concern.", correct: false },
            { text: "D) Innovation is valuable.", correct: false }
        ],
        explanation: "The central claim is that coding classes boost innovation, making A correct.",
        difficulty: "medium",
        category: "act-main-idea"
    }
];

// Variables
let categoryStats = {
    "act-main-idea": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "4";
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
        categoryStats["act-main-idea"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-main-idea"].incorrect++;
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
        case 4: return englishQuestions;
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
        category: "act-main-idea",
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
    let totalCorrect = categoryStats["act-main-idea"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-main-idea"].incorrect;

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
    localStorage.setItem(`act-main-idea-lessonScore-${lessonId}`, score);
    console.log(`Saved act-main-idea-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-main-idea-lessonScore-${lessonId}`) || "Not completed yet";
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