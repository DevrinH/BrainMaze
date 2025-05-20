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
    const lessonId = urlParams.get('lesson') || 12;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    12: {
        title: "Theme",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying the Theme",
                passage: "The story follows a farmer who, despite drought, plants seeds each spring, believing in renewal.",
                content: `
                    <h2>Example 1: Identifying the Theme</h2>
                    <p>Question: What is the theme of the passage?</p>
                    <p>Step 1: Analyze the narrative: The farmer’s persistence despite hardship emphasizes hope.</p>
                    <p>Step 2: Apply rule: A theme is the central message or insight about life.</p>
                    <p>Solution: The theme is resilience and hope in the face of adversity.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "A sailor braves storms to return home, driven by thoughts of family.",
                question: "What is the theme of the passage?",
                options: [
                    { text: "A) The power of love and family", correct: true },
                    { text: "B) The danger of storms", correct: false },
                    { text: "C) The skill of sailing", correct: false },
                    { text: "D) The fear of travel", correct: false }
                ],
                explanation: "The sailor’s drive for family suggests a theme of love, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Distinguishing Theme from Topic",
                passage: "The novel explores a community rebuilding after betrayal, learning to trust again.",
                content: `
                    <h2>Example 2: Distinguishing Theme from Topic</h2>
                    <p>Question: What is the theme, not the topic, of the passage?</p>
                    <p>Step 1: Identify the topic: Rebuilding a community after betrayal.</p>
                    <p>Step 2: Apply rule: The theme is the insight, not the subject.</p>
                    <p>Solution: The theme is the importance of rebuilding trust, not just betrayal.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "A story depicts siblings overcoming rivalry to unite for a cause.",
                question: "What is the theme, not the topic?",
                options: [
                    { text: "A) The value of unity over rivalry", correct: true },
                    { text: "B) Sibling rivalry", correct: false },
                    { text: "C) The cause they support", correct: false },
                    { text: "D) The struggle of siblings", correct: false }
                ],
                explanation: "Unity over rivalry is the insight, not the topic of rivalry, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Theme Through Characters",
                passage: "The protagonist sacrifices her dreams to care for her ill parent, finding peace in duty.",
                content: `
                    <h2>Example 3: Theme Through Characters</h2>
                    <p>Question: How do the character’s actions reveal the theme?</p>
                    <p>Step 1: Analyze actions: Sacrifice and finding peace suggest selflessness.</p>
                    <p>Step 2: Apply rule: Characters’ choices often embody the theme.</p>
                    <p>Solution: The theme of selflessness and duty is revealed through her sacrifice.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "A boy shares his only meal with a stranger, gaining a friend.",
                question: "How do the boy’s actions reveal the theme?",
                options: [
                    { text: "A) Generosity fosters connection.", correct: true },
                    { text: "B) Hunger leads to isolation.", correct: false },
                    { text: "C) Friendship requires wealth.", correct: false },
                    { text: "D) Sharing causes loss.", correct: false }
                ],
                explanation: "Sharing and gaining a friend suggest generosity, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Theme Through Symbols",
                passage: "A broken bridge in the story separates the village, until rebuilt by united efforts.",
                content: `
                    <h2>Example 4: Theme Through Symbols</h2>
                    <p>Question: How does the broken bridge support the theme?</p>
                    <p>Step 1: Analyze symbol: A broken bridge suggests division, its rebuilding unity.</p>
                    <p>Step 2: Apply rule: Symbols reinforce thematic messages.</p>
                    <p>Solution: The bridge symbolizes division overcome by unity, supporting a theme of community.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "A single candle burns in a dark room, guiding the lost traveler.",
                question: "How does the candle support the theme?",
                options: [
                    { text: "A) It symbolizes hope guiding through despair.", correct: true },
                    { text: "B) It represents danger in the dark.", correct: false },
                    { text: "C) It suggests wealth in isolation.", correct: false },
                    { text: "D) It symbolizes fear of the unknown.", correct: false }
                ],
                explanation: "Guiding in darkness suggests hope, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Theme Through Conflict",
                passage: "The hero faces betrayal but forgives, rebuilding trust with her friend.",
                content: `
                    <h2>Example 5: Theme Through Conflict</h2>
                    <p>Question: What theme emerges from the conflict?</p>
                    <p>Step 1: Analyze conflict: Betrayal resolved by forgiveness highlights redemption.</p>
                    <p>Step 2: Apply rule: Conflicts often reveal thematic insights.</p>
                    <p>Solution: The theme is forgiveness and the power of rebuilding trust.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "A leader faces rebellion but listens, uniting the group through compromise.",
                question: "What theme emerges from the conflict?",
                options: [
                    { text: "A) Compromise strengthens unity.", correct: true },
                    { text: "B) Rebellion leads to chaos.", correct: false },
                    { text: "C) Leadership requires control.", correct: false },
                    { text: "D) Listening causes weakness.", correct: false }
                ],
                explanation: "Compromise resolving rebellion suggests unity, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Theme in Context",
                passage: "In a war-torn land, a child plants a tree, believing in a peaceful future.",
                content: `
                    <h2>Example 6: Theme in Context</h2>
                    <p>Question: How does the context shape the theme?</p>
                    <p>Step 1: Analyze context: War contrasts with a child’s hopeful act.</p>
                    <p>Step 2: Apply rule: Context amplifies thematic significance.</p>
                    <p>Solution: The war context emphasizes a theme of hope and renewal through the child’s act.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In a divided city, a mural of harmony is painted on a wall.",
                question: "How does the context shape the theme?",
                options: [
                    { text: "A) Division highlights the theme of unity.", correct: true },
                    { text: "B) The city emphasizes conflict.", correct: false },
                    { text: "C) The mural suggests wealth.", correct: false },
                    { text: "D) Division implies isolation.", correct: false }
                ],
                explanation: "A mural of harmony in division emphasizes unity, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Theme and Narrative Arc",
                passage: "The story ends with the loner joining the festival, embraced by the community.",
                content: `
                    <h2>Example 7: Theme and Narrative Arc</h2>
                    <p>Question: How does the narrative arc reveal the theme?</p>
                    <p>Step 1: Analyze arc: A loner’s journey to belonging shows transformation.</p>
                    <p>Step 2: Apply rule: The narrative arc reflects the thematic resolution.</p>
                    <p>Solution: The arc reveals a theme of belonging and the value of community.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "A rebel softens, helping rebuild the village she once opposed.",
                question: "How does the narrative arc reveal the theme?",
                options: [
                    { text: "A) Redemption through contribution", correct: true },
                    { text: "B) Rebellion against change", correct: false },
                    { text: "C) Opposition to community", correct: false },
                    { text: "D) Destruction of the village", correct: false }
                ],
                explanation: "Softening to help suggests redemption, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "A woman rebuilds her life after loss, finding joy in small acts of kindness.",
        question: "What is the theme of the passage?",
        answers: [
            { text: "A) Healing through kindness", correct: true },
            { text: "B) The pain of loss", correct: false },
            { text: "C) The need for wealth", correct: false },
            { text: "D) The fear of change", correct: false }
        ],
        explanation: "Rebuilding through kindness suggests healing, making A correct.",
        difficulty: "easy",
        category: "act-theme"
    },
    {
        passage: "The poem describes a journey through darkness, ending in light.",
        question: "What is the theme, not the topic?",
        answers: [
            { text: "A) Hope overcoming despair", correct: true },
            { text: "B) A journey through darkness", correct: false },
            { text: "C) The beauty of light", correct: false },
            { text: "D) The danger of travel", correct: false }
        ],
        explanation: "Hope over despair is the insight, not the journey, making A correct.",
        difficulty: "medium",
        category: "act-theme"
    },
    {
        passage: "A thief returns stolen goods, seeking forgiveness from the victim.",
        question: "How do the thief’s actions reveal the theme?",
        answers: [
            { text: "A) Redemption through atonement", correct: true },
            { text: "B) The thrill of theft", correct: false },
            { text: "C) Fear of punishment", correct: false },
            { text: "D) Desire for wealth", correct: false }
        ],
        explanation: "Returning goods for forgiveness suggests redemption, making A correct.",
        difficulty: "medium",
        category: "act-theme"
    },
    {
        passage: "A cracked vase holds vibrant flowers, central to the story’s imagery.",
        question: "How does the vase support the theme?",
        answers: [
            { text: "A) It symbolizes beauty in imperfection.", correct: true },
            { text: "B) It represents wealth and luxury.", correct: false },
            { text: "C) It suggests chaos and ruin.", correct: false },
            { text: "D) It symbolizes fear of fragility.", correct: false }
        ],
        explanation: "A cracked vase with vibrant flowers suggests beauty in flaws, making A correct.",
        difficulty: "medium",
        category: "act-theme"
    },
    {
        passage: "A family faces division but reunites to save their home.",
        question: "What theme emerges from the conflict?",
        answers: [
            { text: "A) Unity through shared purpose", correct: true },
            { text: "B) Division destroys families", correct: false },
            { text: "C) Homes require wealth", correct: false },
            { text: "D) Conflict leads to loss", correct: false }
        ],
        explanation: "Reuniting to save the home suggests unity, making A correct.",
        difficulty: "medium",
        category: "act-theme"
    },
    {
        passage: "In a famine, a baker gives away bread, sustaining the town.",
        question: "How does the context shape the theme?",
        answers: [
            { text: "A) Famine emphasizes sacrifice for community.", correct: true },
            { text: "B) The town highlights wealth.", correct: false },
            { text: "C) Famine suggests despair.", correct: false },
            { text: "D) Bread implies greed.", correct: false }
        ],
        explanation: "Giving bread in famine emphasizes sacrifice, making A correct.",
        difficulty: "medium",
        category: "act-theme"
    },
    {
        passage: "The outcast finds acceptance by aiding the village in crisis.",
        question: "How does the narrative arc reveal the theme?",
        answers: [
            { text: "A) Acceptance through selflessness", correct: true },
            { text: "B) Rejection of outsiders", correct: false },
            { text: "C) Crisis causes isolation", correct: false },
            { text: "D) Selfishness in communities", correct: false }
        ],
        explanation: "From outcast to acceptance via aid suggests selflessness, making A correct.",
        difficulty: "medium",
        category: "act-theme"
    }
];

// Variables
let categoryStats = {
    "act-theme": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "12";
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
        categoryStats["act-theme"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-theme"].incorrect++;
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
        case 12: return englishQuestions;
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
        category: "act-theme",
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
    let totalCorrect = categoryStats["act-theme"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-theme"].incorrect;

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
    localStorage.setItem(`act-theme-lessonScore-${lessonId}`, score);
    console.log(`Saved act-theme-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-theme-lessonScore-${lessonId}`) || "Not completed yet";
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