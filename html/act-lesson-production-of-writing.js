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
    const lessonId = urlParams.get('lesson') || 3;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    3: {
        title: "Production of Writing",
        content: [
            {
                type: "example",
                title: "Example 1: Essay Organization",
                passage: "The essay argues that recycling reduces waste, but its points are scattered across paragraphs.",
                content: `
                    <h2>Example 1: Essay Organization</h2>
                    <p>Question: How can the essay’s organization be improved?</p>
                    <p>Step 1: Identify issue: Scattered points reduce clarity.</p>
                    <p>Step 2: Apply rule: Group related ideas in cohesive paragraphs.</p>
                    <p>Solution: Reorganize the essay to discuss benefits in one paragraph and challenges in another.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The article on climate change mixes solutions and problems randomly throughout.",
                question: "How should the article be reorganized?",
                options: [
                    { text: "A) Separate problems and solutions into distinct sections", correct: true },
                    { text: "B) Keep the mixed structure for variety", correct: false },
                    { text: "C) Arrange by publication date", correct: false },
                    { text: "D) Combine all points into one paragraph", correct: false }
                ],
                explanation: "Separating problems and solutions enhances clarity, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Sentence Placement",
                passage: "Renewable energy is sustainable. Costs are decreasing. Fossil fuels are less reliable.",
                content: `
                    <h2>Example 2: Sentence Placement</h2>
                    <p>Question: Where should a sentence about renewable energy costs fit?</p>
                    <p>Step 1: Identify context: The passage discusses renewable energy benefits.</p>
                    <p>Step 2: Apply rule: Place sentences near related ideas.</p>
                    <p>Solution: Place it after 'Renewable energy is sustainable,' before 'Fossil fuels.' Renewable energy is sustainable. Costs are decreasing.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Exercise improves health. It reduces stress. Diet also matters.",
                question: "Where should a sentence about exercise frequency fit?",
                options: [
                    { text: "A) After 'Exercise improves health'", correct: true },
                    { text: "B) After 'Diet also matters'", correct: false },
                    { text: "C) Before 'Exercise improves health'", correct: false },
                    { text: "D) Omit it as irrelevant", correct: false }
                ],
                explanation: "Frequency relates to exercise benefits, so it fits after 'Exercise improves health,' making A correct."
            },
            {
                type: "example",
                title: "Example 3: Introductions",
                passage: "This essay will discuss recycling. It is important.",
                content: `
                    <h2>Example 3: Introductions</h2>
                    <p>Question: How can the introduction be improved?</p>
                    <p>Step 1: Assess effectiveness: The introduction is vague and lacks engagement.</p>
                    <p>Step 2: Apply rule: Strong introductions provide context and a thesis.</p>
                    <p>Solution: Revise to: 'Recycling reduces waste and conserves resources, making it vital for sustainability, as this essay explores.' </p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "This paper talks about urban farming. It’s a good idea.",
                question: "How can the introduction be strengthened?",
                options: [
                    { text: "A) Add context and a clear thesis", correct: true },
                    { text: "B) Keep it short and vague", correct: false },
                    { text: "C) List all sources", correct: false },
                    { text: "D) Remove the second sentence", correct: false }
                ],
                explanation: "Adding context and a thesis engages readers, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Conclusions",
                passage: "The essay ends with: 'Recycling is good.'",
                content: `
                    <h2>Example 4: Conclusions</h2>
                    <p>Question: How can the conclusion be improved?</p>
                    <p>Step 1: Evaluate: The conclusion is weak and lacks summary.</p>
                    <p>Step 2: Apply rule: Conclusions should summarize key points and reinforce the thesis.</p>
                    <p>Solution: Revise to: 'Recycling reduces waste and supports sustainability, urging communities to adopt it.' </p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "The article concludes: 'Solar energy is nice.'",
                question: "How can the conclusion be strengthened?",
                options: [
                    { text: "A) Summarize benefits and call to action", correct: true },
                    { text: "B) Keep it brief and generic", correct: false },
                    { text: "C) Add unrelated facts", correct: false },
                    { text: "D) Repeat the introduction", correct: false }
                ],
                explanation: "Summarizing benefits and adding a call to action strengthens the conclusion, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Supporting Details",
                passage: "Volunteering benefits communities. Many people participate.",
                content: `
                    <h2>Example 5: Supporting Details</h2>
                    <p>Question: What detail would strengthen the passage?</p>
                    <p>Step 1: Identify claim: Volunteering benefits communities.</p>
                    <p>Step 2: Apply rule: Add specific evidence to support claims.</p>
                    <p>Solution: Add: 'For example, volunteers cleaned 500 parks last year, improving public spaces.' </p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Public libraries promote literacy. They are popular.",
                question: "What detail would support the passage?",
                options: [
                    { text: "A) Libraries hosted 1,000 reading programs last year.", correct: true },
                    { text: "B) Libraries have many books.", correct: false },
                    { text: "C) Libraries are old buildings.", correct: false },
                    { text: "D) People like libraries.", correct: false }
                ],
                explanation: "Specific evidence like '1,000 reading programs' supports literacy promotion, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Transitions for Coherence",
                passage: "The policy reduced emissions. It faced opposition.",
                content: `
                    <h2>Example 6: Transitions for Coherence</h2>
                    <p>Question: Which transition improves coherence?</p>
                    <p>Step 1: Analyze: The sentences contrast success with opposition.</p>
                    <p>Step 2: Apply rule: Use contrast transitions to clarify relationships.</p>
                    <p>Solution: Add 'However,' to show contrast: The policy reduced emissions. However, it faced opposition.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The program increased voter turnout. Some criticized its cost.",
                question: "Which transition improves coherence?",
                options: [
                    { text: "A) Despite this", correct: true },
                    { text: "B) In addition", correct: false },
                    { text: "C) Therefore", correct: false },
                    { text: "D) Similarly", correct: false }
                ],
                explanation: "'Despite this' contrasts success with criticism, improving coherence, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Paragraph Unity",
                passage: "The essay discusses education reform, but one paragraph mentions sports funding.",
                content: `
                    <h2>Example 7: Paragraph Unity</h2>
                    <p>Question: How can paragraph unity be improved?</p>
                    <p>Step 1: Identify issue: Sports funding is off-topic.</p>
                    <p>Step 2: Apply rule: All sentences should support the paragraph’s main idea.</p>
                    <p>Solution: Remove the sports funding paragraph or revise it to focus on education.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The article on healthcare includes a paragraph about tax policies.",
                question: "How can paragraph unity be improved?",
                options: [
                    { text: "A) Remove or refocus the tax policy paragraph.", correct: true },
                    { text: "B) Keep the tax policy paragraph.", correct: false },
                    { text: "C) Add more tax policy details.", correct: false },
                    { text: "D) Move the paragraph to the introduction.", correct: false }
                ],
                explanation: "Removing or refocusing off-topic content ensures unity, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "The essay on renewable energy lacks a clear structure, jumping between topics.",
        question: "How should the essay be organized?",
        answers: [
            { text: "A) Group related ideas into cohesive paragraphs", correct: true },
            { text: "B) Maintain the current mixed structure", correct: false },
            { text: "C) List points alphabetically", correct: false },
            { text: "D) Combine all ideas into one paragraph", correct: false }
        ],
        explanation: "Grouping related ideas improves clarity and structure, making A correct.",
        difficulty: "easy",
        category: "act-production-of-writing"
    },
    {
        passage: "Public transportation is efficient. It saves time. Car use is declining.",
        question: "Where should a sentence about transportation costs fit?",
        answers: [
            { text: "A) After 'Public transportation is efficient'", correct: true },
            { text: "B) After 'Car use is declining'", correct: false },
            { text: "C) Before 'Public transportation is efficient'", correct: false },
            { text: "D) Omit as irrelevant", correct: false }
        ],
        explanation: "Costs relate to efficiency, so it fits after 'Public transportation is efficient,' making A correct.",
        difficulty: "medium",
        category: "act-production-of-writing"
    },
    {
        passage: "This paper will cover community gardens. They are beneficial.",
        question: "How can the introduction be improved?",
        answers: [
            { text: "A) Provide context and a clear thesis", correct: true },
            { text: "B) Keep it short and vague", correct: false },
            { text: "C) List all references", correct: false },
            { text: "D) Remove the second sentence", correct: false }
        ],
        explanation: "Adding context and a thesis engages readers, making A correct.",
        difficulty: "medium",
        category: "act-production-of-writing"
    },
    {
        passage: "The essay concludes: 'Exercise is great.'",
        question: "How can the conclusion be strengthened?",
        answers: [
            { text: "A) Summarize key points and reinforce the thesis", correct: true },
            { text: "B) Repeat the introduction", correct: false },
            { text: "C) Add unrelated facts", correct: false },
            { text: "D) Keep it brief and generic", correct: false }
        ],
        explanation: "Summarizing and reinforcing the thesis strengthens the conclusion, making A correct.",
        difficulty: "easy",
        category: "act-production-of-writing"
    },
    {
        passage: "Mentorship programs boost student success. Many schools offer them.",
        question: "What detail would support the passage?",
        answers: [
            { text: "A) Mentorship increased graduation rates by 20%.", correct: true },
            { text: "B) Schools have libraries.", correct: false },
            { text: "C) Mentors are nice people.", correct: false },
            { text: "D) Many students attend school.", correct: false }
        ],
        explanation: "Specific evidence like '20% increase' supports the claim, making A correct.",
        difficulty: "medium",
        category: "act-production-of-writing"
    },
    {
        passage: "The initiative improved literacy rates. It required significant funding.",
        question: "Which transition improves coherence?",
        answers: [
            { text: "A) However", correct: true },
            { text: "B) Furthermore", correct: false },
            { text: "C) Consequently", correct: false },
            { text: "D) Likewise", correct: false }
        ],
        explanation: "'However' contrasts success with a challenge, improving coherence, making A correct.",
        difficulty: "medium",
        category: "act-production-of-writing"
    },
    {
        passage: "The report on conservation includes a section on local politics.",
        question: "How can paragraph unity be improved?",
        answers: [
            { text: "A) Remove or refocus the politics section", correct: true },
            { text: "B) Expand the politics section", correct: false },
            { text: "C) Keep the politics section", correct: false },
            { text: "D) Move the section to the conclusion", correct: false }
        ],
        explanation: "Removing off-topic content ensures unity, making A correct.",
        difficulty: "easy",
        category: "act-production-of-writing"
    }
];

// Variables
let categoryStats = {
    "act-production-of-writing": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "3";
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
        categoryStats["act-production-of-writing"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-production-of-writing"].incorrect++;
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
        case 3: return englishQuestions;
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
        category: "act-production-of-writing",
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
    let totalCorrect = categoryStats["act-production-of-writing"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-production-of-writing"].incorrect;

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
    localStorage.setItem(`act-production-of-writing-lessonScore-${lessonId}`, score);
    console.log(`Saved act-production-of-writing-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-production-of-writing-lessonScore-${lessonId}`) || "Not completed yet";
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