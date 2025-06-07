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
    const lessonId = urlParams.get('lesson') || 16;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    16: {
        title: "Comparison",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying a Simile",
                passage: "Her laughter sparkled like diamonds in the sunlight, brightening the room.",
                content: `
                    <h2>Example 1: Identifying a Simile</h2>
                    <p>Question: What comparison is used, and what is its effect?</p>
                    <p>Step 1: Analyze the phrase: Laughter is compared to diamonds using 'like'.</p>
                    <p>Step 2: Apply rule: Similes use 'like' or 'as' to compare unlike things, enhancing imagery.</p>
                    <p>Solution: The simile compares laughter to sparkling diamonds, creating a vivid, joyful image.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "His anger burned like a wildfire, consuming all reason.",
                question: "What comparison is used?",
                options: [
                    { text: "A) Simile", correct: true },
                    { text: "B) Metaphor", correct: false },
                    { text: "C) Analogy", correct: false },
                    { text: "D) Contrast", correct: false }
                ],
                explanation: "Using 'like' to compare anger to a wildfire is a simile, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Analyzing a Metaphor",
                passage: "The city was a labyrinth, its streets twisting and turning endlessly.",
                content: `
                    <h2>Example 2: Analyzing a Metaphor</h2>
                    <p>Question: What is the purpose of the metaphor?</p>
                    <p>Step 1: Identify the metaphor: The city is directly called a labyrinth.</p>
                    <p>Step 2: Apply rule: Metaphors equate unlike things to emphasize qualities or mood.</p>
                    <p>Solution: The metaphor emphasizes the city’s complex, confusing nature, enhancing the sense of disorientation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Her mind was a fortress, guarding her deepest thoughts.",
                question: "What is the purpose of the metaphor?",
                options: [
                    { text: "A) To highlight her mental strength and privacy", correct: true },
                    { text: "B) To suggest her thoughts are weak", correct: false },
                    { text: "C) To describe her physical appearance", correct: false },
                    { text: "D) To imply she is lost", correct: false }
                ],
                explanation: "Comparing her mind to a fortress emphasizes strength and privacy, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Understanding Analogies",
                passage: "Learning is like planting a seed: it requires time and care to grow.",
                content: `
                    <h2>Example 3: Understanding Analogies</h2>
                    <p>Question: What relationship does the analogy illustrate?</p>
                    <p>Step 1: Analyze the analogy: Learning is compared to planting a seed.</p>
                    <p>Step 2: Apply rule: Analogies show parallel relationships to clarify concepts.</p>
                    <p>Solution: The analogy illustrates that learning, like planting, requires patience and nurturing to develop.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Writing a novel is like building a house: both need a strong foundation.",
                question: "What relationship does the analogy illustrate?",
                options: [
                    { text: "A) Both require structure and planning.", correct: true },
                    { text: "B) Both are quick tasks.", correct: false },
                    { text: "C) Both lack creativity.", correct: false },
                    { text: "D) Both are effortless.", correct: false }
                ],
                explanation: "Comparing novel-writing to house-building highlights structure, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Analyzing Contrasts",
                passage: "The hero was bold and reckless, while the villain was cautious and cunning.",
                content: `
                    <h2>Example 4: Analyzing Contrasts</h2>
                    <p>Question: What is the effect of contrasting the hero and villain?</p>
                    <p>Step 1: Identify contrast: Bold/reckless vs. cautious/cunning.</p>
                    <p>Step 2: Apply rule: Contrasts highlight differences to emphasize character traits or themes.</p>
                    <p>Solution: The contrast emphasizes their opposing approaches, heightening narrative tension.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "She was warm and open, unlike her reserved and distant brother.",
                question: "What is the effect of contrasting the siblings?",
                options: [
                    { text: "A) It highlights their differing personalities.", correct: true },
                    { text: "B) It suggests they are identical.", correct: false },
                    { text: "C) It implies they dislike each other.", correct: false },
                    { text: "D) It reduces narrative tension.", correct: false }
                ],
                explanation: "Contrasting warm/open with reserved/distant emphasizes personality differences, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Comparison Enhancing Tone",
                passage: "The storm’s roar was like a lion’s, shaking the fragile village.",
                content: `
                    <h2>Example 5: Comparison Enhancing Tone</h2>
                    <p>Question: How does the simile affect the tone?</p>
                    <p>Step 1: Analyze simile: The storm is compared to a lion’s roar.</p>
                    <p>Step 2: Apply rule: Comparisons shape tone through vivid imagery.</p>
                    <p>Solution: The simile creates a fierce, threatening tone, amplifying the storm’s power.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Her voice was as soft as a whisper of silk, calming the room.",
                question: "How does the simile affect the tone?",
                options: [
                    { text: "A) It creates a gentle, soothing tone.", correct: true },
                    { text: "B) It suggests a harsh, loud tone.", correct: false },
                    { text: "C) It implies a chaotic, tense tone.", correct: false },
                    { text: "D) It conveys a neutral, flat tone.", correct: false }
                ],
                explanation: "Comparing her voice to silk creates a soothing tone, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Comparison in Arguments",
                passage: "The article compared urban sprawl to a spreading disease, urging controlled growth.",
                content: `
                    <h2>Example 6: Comparison in Arguments</h2>
                    <p>Question: What is the purpose of the comparison?</p>
                    <p>Step 1: Analyze metaphor: Sprawl is equated to a disease.</p>
                    <p>Step 2: Apply rule: Comparisons in arguments emphasize urgency or perspective.</p>
                    <p>Solution: The metaphor underscores the harmful, uncontrolled nature of sprawl, strengthening the argument for control.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The essay likened pollution to a silent thief, stealing clean air.",
                question: "What is the purpose of the comparison?",
                options: [
                    { text: "A) To emphasize pollution’s insidious harm", correct: true },
                    { text: "B) To suggest pollution is beneficial", correct: false },
                    { text: "C) To describe clean air’s value", correct: false },
                    { text: "D) To imply pollution is visible", correct: false }
                ],
                explanation: "Comparing pollution to a thief highlights its harm, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Comparison and Theme",
                passage: "The story compared the hero’s journey to a river, flowing through obstacles to reach the sea.",
                content: `
                    <h2>Example 7: Comparison and Theme</h2>
                    <p>Question: How does the comparison support the theme?</p>
                    <p>Step 1: Analyze metaphor: The journey is a river overcoming obstacles.</p>
                    <p>Step 2: Apply rule: Comparisons reinforce thematic messages.</p>
                    <p>Solution: The metaphor supports a theme of perseverance, showing the hero’s journey as a natural, unstoppable flow.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The poem compared love to a fragile flame, easily extinguished but fiercely warm.",
                question: "How does the comparison support the theme?",
                options: [
                    { text: "A) It highlights love’s delicate yet powerful nature.", correct: true },
                    { text: "B) It suggests love is cold and distant.", correct: false },
                    { text: "C) It implies love is permanent.", correct: false },
                    { text: "D) It conveys love as destructive.", correct: false }
                ],
                explanation: "Comparing love to a fragile flame emphasizes its delicate power, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "Her courage shone like a beacon in the darkness, guiding others.",
        question: "What comparison is used?",
        answers: [
            { text: "A) Simile", correct: true },
            { text: "B) Metaphor", correct: false },
            { text: "C) Contrast", correct: false },
            { text: "D) Analogy", correct: false }
        ],
        explanation: "Using 'like' to compare courage to a beacon is a simile, making A correct.",
        difficulty: "easy",
        category: "act-comparison"
    },
    {
        passage: "The battlefield was a chessboard, each move calculated and deadly.",
        question: "What is the purpose of the metaphor?",
        answers: [
            { text: "A) To emphasize strategic intensity", correct: true },
            { text: "B) To suggest a playful game", correct: false },
            { text: "C) To describe the battlefield’s size", correct: false },
            { text: "D) To imply a lack of danger", correct: false }
        ],
        explanation: "Comparing the battlefield to a chessboard highlights strategy, making A correct.",
        difficulty: "medium",
        category: "act-comparison"
    },
    {
        passage: "Trust is like a bridge: it takes time to build but can collapse quickly.",
        question: "What relationship does the analogy illustrate?",
        answers: [
            { text: "A) Trust requires effort and is fragile.", correct: true },
            { text: "B) Trust is permanent and strong.", correct: false },
            { text: "C) Trust is effortless to maintain.", correct: false },
            { text: "D) Trust is irrelevant to relationships.", correct: false }
        ],
        explanation: "Comparing trust to a bridge shows effort and fragility, making A correct.",
        difficulty: "medium",
        category: "act-comparison"
    },
    {
        passage: "The leader was decisive and bold, unlike the hesitant advisor.",
        question: "What is the effect of contrasting the leader and advisor?",
        answers: [
            { text: "A) It highlights their differing leadership styles.", correct: true },
            { text: "B) It suggests they share the same traits.", correct: false },
            { text: "C) It implies they are allies.", correct: false },
            { text: "D) It reduces their conflict.", correct: false }
        ],
        explanation: "Contrasting decisive/bold with hesitant highlights differences, making A correct.",
        difficulty: "easy",
        category: "act-comparison"
    },
    {
        passage: "The wind howled like a wounded animal, unsettling the camp.",
        question: "How does the simile affect the tone?",
        answers: [
            { text: "A) It creates a haunting, intense tone.", correct: true },
            { text: "B) It suggests a calm, peaceful tone.", correct: false },
            { text: "C) It implies a joyful, lively tone.", correct: false },
            { text: "D) It conveys a neutral tone.", correct: false }
        ],
        explanation: "Comparing wind to a wounded animal creates intensity, making A correct.",
        difficulty: "medium",
        category: "act-comparison"
    },
    {
        passage: "The speech compared greed to a poison, eroding community trust.",
        question: "What is the purpose of the comparison?",
        answers: [
            { text: "A) To highlight greed’s destructive impact", correct: true },
            { text: "B) To suggest greed is beneficial", correct: false },
            { text: "C) To describe community trust", correct: false },
            { text: "D) To imply greed is harmless", correct: false }
        ],
        explanation: "Comparing greed to poison emphasizes harm, making A correct.",
        difficulty: "medium",
        category: "act-comparison"
    },
    {
        passage: "The story likened her struggle to a bird in a cage, yearning for freedom.",
        question: "How does the comparison support the theme?",
        answers: [
            { text: "A) It underscores a theme of seeking freedom.", correct: true },
            { text: "B) It suggests a theme of contentment.", correct: false },
            { text: "C) It implies a theme of captivity without hope.", correct: false },
            { text: "D) It conveys a theme of flight.", correct: false }
        ],
        explanation: "Comparing struggle to a caged bird emphasizes freedom, making A correct.",
        difficulty: "medium",
        category: "act-comparison"
    }
];

// Variables
let categoryStats = {
    "act-comparison": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "16";
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
        categoryStats["act-comparison"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-comparison"].incorrect++;
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
        case 16: return englishQuestions;
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
        category: "act-comparison",
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
    let totalCorrect = categoryStats["act-comparison"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-comparison"].incorrect;

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
    localStorage.setItem(`act-comparison-lessonScore-${lessonId}`, score);
    console.log(`Saved act-comparison-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-comparison-lessonScore-${lessonId}`) || "Not completed yet";
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