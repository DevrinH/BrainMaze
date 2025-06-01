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
    const lessonId = urlParams.get('lesson') || 5;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    5: {
        title: "Author's Purpose",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying Author's Purpose",
                passage: "The article explains how solar panels work, detailing their technology and efficiency.",
                content: `
                    <h2>Example 1: Identifying Author's Purpose</h2>
                    <p>Question: What is the author’s purpose in the passage?</p>
                    <p>Step 1: Analyze content: The passage provides technical details about solar panels.</p>
                    <p>Step 2: Apply rule: Authors explain to inform, persuade to convince, or entertain to amuse.</p>
                    <p>Solution: The author’s purpose is to inform readers about solar panel technology.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The brochure describes the benefits of recycling, highlighting reduced waste.",
                question: "What is the author’s purpose?",
                options: [
                    { text: "A) To inform about recycling benefits", correct: true },
                    { text: "B) To persuade readers to recycle", correct: false },
                    { text: "C) To entertain with recycling stories", correct: false },
                    { text: "D) To describe recycling processes", correct: false }
                ],
                explanation: "The focus on explaining benefits indicates an informative purpose, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Persuasive Purpose",
                passage: "The editorial urges city officials to fund bike lanes, citing safety data.",
                content: `
                    <h2>Example 2: Persuasive Purpose</h2>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Identify intent: The passage pushes for funding with evidence.</p>
                    <p>Step 2: Apply rule: Persuasive writing seeks to convince with arguments.</p>
                    <p>Solution: The author’s purpose is to persuade officials to fund bike lanes.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "The ad encourages consumers to buy electric cars, emphasizing low emissions.",
                question: "What is the author’s purpose?",
                options: [
                    { text: "A) To persuade consumers to buy electric cars", correct: true },
                    { text: "B) To inform about car emissions", correct: false },
                    { text: "C) To entertain with car stories", correct: false },
                    { text: "D) To describe electric car features", correct: false }
                ],
                explanation: "The ad aims to convince consumers, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Entertaining Purpose",
                passage: "The story vividly describes a haunted house, thrilling readers with spooky details.",
                content: `
                    <h2>Example 3: Entertaining Purpose</h2>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze tone: The vivid, thrilling description engages emotions.</p>
                    <p>Step 2: Apply rule: Entertaining writing aims to amuse or engage.</p>
                    <p>Solution: The author’s purpose is to entertain readers with a spooky narrative.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "The blog post humorously recounts a travel mishap, amusing readers.",
                question: "What is the author’s purpose?",
                options: [
                    { text: "A) To entertain with a humorous story", correct: true },
                    { text: "B) To inform about travel tips", correct: false },
                    { text: "C) To persuade readers to travel", correct: false },
                    { text: "D) To describe travel destinations", correct: false }
                ],
                explanation: "The humorous tone aims to amuse, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Tone and Purpose",
                passage: "The speech passionately calls for climate action, using urgent language.",
                content: `
                    <h2>Example 4: Tone and Purpose</h2>
                    <p>Question: How does the tone support the author’s purpose?</p>
                    <p>Step 1: Identify tone: Passionate and urgent.</p>
                    <p>Step 2: Apply rule: Tone reinforces purpose; urgency supports persuasion.</p>
                    <p>Solution: The urgent tone persuades the audience to act on climate issues.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "The article uses factual language to outline the history of libraries.",
                question: "How does the tone support the author’s purpose?",
                options: [
                    { text: "A) Factual tone informs about library history.", correct: true },
                    { text: "B) Factual tone persuades library use.", correct: false },
                    { text: "C) Factual tone entertains readers.", correct: false },
                    { text: "D) Factual tone describes library design.", correct: false }
                ],
                explanation: "The factual tone supports an informative purpose, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Distinguishing Purpose from Details",
                passage: "The guidebook details national park trails, aiming to help tourists plan visits.",
                content: `
                    <h2>Example 5: Distinguishing Purpose from Details</h2>
                    <p>Question: What is the author’s purpose, not a detail?</p>
                    <p>Step 1: Identify focus: Helping tourists plan.</p>
                    <p>Step 2: Apply rule: Purpose is the intent; details support it.</p>
                    <p>Solution: The purpose is to inform tourists for planning, not just list trails.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The pamphlet lists museum exhibits, aiming to attract visitors.",
                question: "What is the author’s purpose?",
                options: [
                    { text: "A) To persuade visitors to attend the museum", correct: true },
                    { text: "B) To list museum exhibits", correct: false },
                    { text: "C) To inform about art history", correct: false },
                    { text: "D) To entertain with exhibit stories", correct: false }
                ],
                explanation: "The intent is to attract visitors, not just list exhibits, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Purpose in Complex Texts",
                passage: "The essay argues for green spaces, citing health benefits but noting costs.",
                content: `
                    <h2>Example 6: Purpose in Complex Texts</h2>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze: The essay advocates with evidence and addresses counterpoints.</p>
                    <p>Step 2: Apply rule: Complex texts may persuade by balancing pros and cons.</p>
                    <p>Solution: The purpose is to persuade readers to support green spaces.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The report promotes literacy programs, citing success rates but noting funding issues.",
                question: "What is the author’s purpose?",
                options: [
                    { text: "A) To persuade for literacy program support", correct: true },
                    { text: "B) To inform about funding issues", correct: false },
                    { text: "C) To entertain with program stories", correct: false },
                    { text: "D) To describe success rates", correct: false }
                ],
                explanation: "The advocacy focus indicates persuasion, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Purpose and Audience",
                passage: "The letter urges parents to attend a school meeting, stressing student benefits.",
                content: `
                    <h2>Example 7: Purpose and Audience</h2>
                    <p>Question: Who is the audience, and what is the purpose?</p>
                    <p>Step 1: Identify audience: Parents.</p>
                    <p>Step 2: Apply rule: Purpose targets the audience’s action or understanding.</p>
                    <p>Solution: The purpose is to persuade parents to attend the meeting for student benefits.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The flyer invites residents to a park cleanup, emphasizing community pride.",
                question: "Who is the audience, and what is the purpose?",
                options: [
                    { text: "A) Residents, to persuade cleanup participation", correct: true },
                    { text: "B) Residents, to inform about park history", correct: false },
                    { text: "C) Visitors, to entertain with cleanup stories", correct: false },
                    { text: "D) Officials, to describe community pride", correct: false }
                ],
                explanation: "The flyer targets residents to encourage participation, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "The textbook outlines the process of photosynthesis, explaining each stage clearly.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To inform about photosynthesis", correct: true },
            { text: "B) To persuade readers to study biology", correct: false },
            { text: "C) To entertain with plant stories", correct: false },
            { text: "D) To describe plant structures", correct: false }
        ],
        explanation: "The clear explanation of a process indicates an informative purpose, making A correct.",
        difficulty: "easy",
        category: "act-authors-purpose"
    },
    {
        passage: "The op-ed argues that schools should adopt later start times, citing health benefits.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To persuade for later school start times", correct: true },
            { text: "B) To inform about school schedules", correct: false },
            { text: "C) To entertain with school anecdotes", correct: false },
            { text: "D) To describe health issues", correct: false }
        ],
        explanation: "The argumentative tone aims to convince, making A correct.",
        difficulty: "medium",
        category: "act-authors-purpose"
    },
    {
        passage: "The short story paints a vivid picture of a stormy night, captivating readers.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To entertain with a vivid narrative", correct: true },
            { text: "B) To inform about weather patterns", correct: false },
            { text: "C) To persuade against storms", correct: false },
            { text: "D) To describe storm science", correct: false }
        ],
        explanation: "The vivid, captivating tone aims to entertain, making A correct.",
        difficulty: "medium",
        category: "act-authors-purpose"
    },
    {
        passage: "The speech uses emotional appeals to rally support for animal shelters.",
        question: "How does the tone support the author’s purpose?",
        answers: [
            { text: "A) Emotional tone persuades support for shelters.", correct: true },
            { text: "B) Emotional tone informs about animals.", correct: false },
            { text: "C) Emotional tone entertains audiences.", correct: false },
            { text: "D) Emotional tone describes shelters.", correct: false }
        ],
        explanation: "The emotional tone drives persuasion, making A correct.",
        difficulty: "medium",
        category: "act-authors-purpose"
    },
    {
        passage: "The manual lists steps for assembling furniture, guiding users effectively.",
        question: "What is the author’s purpose, not a detail?",
        answers: [
            { text: "A) To inform users how to assemble furniture", correct: true },
            { text: "B) To list assembly steps", correct: false },
            { text: "C) To persuade furniture purchases", correct: false },
            { text: "D) To entertain with assembly stories", correct: false }
        ],
        explanation: "The intent is to guide users, not just list steps, making A correct.",
        difficulty: "easy",
        category: "act-authors-purpose"
    },
    {
        passage: "The essay advocates for renewable energy, balancing benefits with cost concerns.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To persuade for renewable energy adoption", correct: true },
            { text: "B) To inform about energy costs", correct: false },
            { text: "C) To entertain with energy facts", correct: false },
            { text: "D) To describe renewable sources", correct: false }
        ],
        explanation: "The advocacy focus indicates persuasion, making A correct.",
        difficulty: "medium",
        category: "act-authors-purpose"
    },
    {
        passage: "The notice calls on employees to join a wellness program, highlighting benefits.",
        question: "Who is the audience, and what is the purpose?",
        answers: [
            { text: "A) Employees, to persuade program participation", correct: true },
            { text: "B) Employees, to inform about wellness", correct: false },
            { text: "C) Managers, to entertain with benefits", correct: false },
            { text: "D) Public, to describe programs", correct: false }
        ],
        explanation: "The notice targets employees to encourage participation, making A correct.",
        difficulty: "medium",
        category: "act-authors-purpose"
    }
];

// Variables
let categoryStats = {
    "act-authors-purpose": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "5";
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
        categoryStats["act-authors-purpose"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-authors-purpose"].incorrect++;
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
        case 5: return englishQuestions;
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
        category: "act-authors-purpose",
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
    let totalCorrect = categoryStats["act-authors-purpose"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-authors-purpose"].incorrect;

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
    localStorage.setItem(`act-authors-purpose-lessonScore-${lessonId}`, score);
    console.log(`Saved act-authors-purpose-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-authors-purpose-lessonScore-${lessonId}`) || "Not completed yet";
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