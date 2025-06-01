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
    const lessonId = urlParams.get('lesson') || 14;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    14: {
        title: "Relationship",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying Character Relationships",
                passage: "Lila and her brother argued fiercely, but she still mended his torn coat that night.",
                content: `
                    <h2>Example 1: Identifying Character Relationships</h2>
                    <p>Question: What is the relationship between Lila and her brother?</p>
                    <p>Step 1: Analyze actions: Arguing shows conflict, mending shows care.</p>
                    <p>Step 2: Apply rule: Relationships are revealed through interactions and context.</p>
                    <p>Solution: Lila and her brother have a sibling relationship marked by conflict but underlying affection.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Mark teased his friend but rushed to help when she fell.",
                question: "What is the relationship between Mark and his friend?",
                options: [
                    { text: "A) Friendship with playful teasing", correct: true },
                    { text: "B) Rivalry with hostility", correct: false },
                    { text: "C) Strangers with indifference", correct: false },
                    { text: "D) Siblings with conflict", correct: false }
                ],
                explanation: "Teasing and helping suggest a friendly bond, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Analyzing Relationship Development",
                passage: "At first, Clara distrusted the newcomer, but their shared work built mutual respect.",
                content: `
                    <h2>Example 2: Analyzing Relationship Development</h2>
                    <p>Question: How does the relationship between Clara and the newcomer evolve?</p>
                    <p>Step 1: Analyze change: Distrust shifts to respect through collaboration.</p>
                    <p>Step 2: Apply rule: Relationships develop through shared experiences or actions.</p>
                    <p>Solution: The relationship evolves from distrust to mutual respect due to shared work.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Initially, Tom ignored his mentor, but their talks fostered trust.",
                question: "How does the relationship between Tom and his mentor evolve?",
                options: [
                    { text: "A) From indifference to trust", correct: true },
                    { text: "B) From trust to conflict", correct: false },
                    { text: "C) From friendship to rivalry", correct: false },
                    { text: "D) From respect to indifference", correct: false }
                ],
                explanation: "Ignoring to trusting shows a shift to trust, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Relationships Between Events",
                passage: "The flood destroyed the village, prompting neighbors to unite in rebuilding efforts.",
                content: `
                    <h2>Example 3: Relationships Between Events</h2>
                    <p>Question: What is the relationship between the flood and the rebuilding efforts?</p>
                    <p>Step 1: Analyze events: The flood is a cause, rebuilding a response.</p>
                    <p>Step 2: Apply rule: Event relationships are often causal or consequential.</p>
                    <p>Solution: The flood causes the neighbors’ united rebuilding efforts.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "A drought hit the farm, leading the family to dig a new well.",
                question: "What is the relationship between the drought and the well-digging?",
                options: [
                    { text: "A) The drought causes the well-digging.", correct: true },
                    { text: "B) The well-digging causes the drought.", correct: false },
                    { text: "C) The drought and well-digging are unrelated.", correct: false },
                    { text: "D) The well-digging prevents the drought.", correct: false }
                ],
                explanation: "The drought prompts the well-digging, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Relationships Between Ideas",
                passage: "The essay argued that innovation drives progress, but tradition preserves identity.",
                content: `
                    <h2>Example 4: Relationships Between Ideas</h2>
                    <p>Question: What is the relationship between innovation and tradition in the essay?</p>
                    <p>Step 1: Analyze ideas: Innovation and tradition have distinct roles.</p>
                    <p>Step 2: Apply rule: Idea relationships are often contrasting or complementary.</p>
                    <p>Solution: Innovation and tradition are contrasting, with innovation driving progress and tradition preserving identity.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "The article claimed freedom encourages creativity, while discipline ensures focus.",
                question: "What is the relationship between freedom and discipline?",
                options: [
                    { text: "A) They are complementary, balancing creativity and focus.", correct: true },
                    { text: "B) They are identical, both enhancing creativity.", correct: false },
                    { text: "C) Freedom opposes discipline entirely.", correct: false },
                    { text: "D) Discipline eliminates creativity.", correct: false }
                ],
                explanation: "Freedom and discipline balance different outcomes, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Significance of Relationships",
                passage: "The rival captains shook hands after the match, setting an example for their teams.",
                content: `
                    <h2>Example 5: Significance of Relationships</h2>
                    <p>Question: Why is the relationship between the captains significant?</p>
                    <p>Step 1: Analyze action: Shaking hands shows sportsmanship.</p>
                    <p>Step 2: Apply rule: Relationships impact narratives by influencing others or themes.</p>
                    <p>Solution: The captains’ respectful relationship promotes sportsmanship, influencing their teams positively.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The estranged sisters reconciled, inspiring the village to heal old grudges.",
                question: "Why is the relationship between the sisters significant?",
                options: [
                    { text: "A) It fosters community healing.", correct: true },
                    { text: "B) It deepens their estrangement.", correct: false },
                    { text: "C) It causes village conflict.", correct: false },
                    { text: "D) It is irrelevant to the village.", correct: false }
                ],
                explanation: "Reconciliation inspires the village, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Relationships Shaping Tone",
                passage: "The old man and child laughed together, their bond warming the cold evening.",
                content: `
                    <h2>Example 6: Relationships Shaping Tone</h2>
                    <p>Question: How does the relationship affect the tone?</p>
                    <p>Step 1: Analyze interaction: Laughter and bonding contrast the cold.</p>
                    <p>Step 2: Apply rule: Relationships influence tone through emotional dynamics.</p>
                    <p>Solution: The warm relationship creates a hopeful, comforting tone despite the cold setting.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The enemies glared silently, their tension chilling the room.",
                question: "How does the relationship affect the tone?",
                options: [
                    { text: "A) It creates a tense, hostile tone.", correct: true },
                    { text: "B) It fosters a warm, friendly tone.", correct: false },
                    { text: "C) It suggests a neutral, calm tone.", correct: false },
                    { text: "D) It conveys a joyful, lively tone.", correct: false }
                ],
                explanation: "Glaring enemies create tension, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Relationships and Narrative",
                passage: "The mentor’s betrayal pushed the hero to rely on her own strength, shaping her journey.",
                content: `
                    <h2>Example 7: Relationships and Narrative</h2>
                    <p>Question: How does the mentor-hero relationship shape the narrative?</p>
                    <p>Step 1: Analyze impact: Betrayal forces the hero’s independence.</p>
                    <p>Step 2: Apply rule: Relationships drive narrative progression or character growth.</p>
                    <p>Solution: The mentor’s betrayal shifts the hero toward self-reliance, driving her journey’s development.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The friend’s encouragement spurred the artist to complete her masterpiece.",
                question: "How does the friend-artist relationship shape the narrative?",
                options: [
                    { text: "A) It drives the artist’s success.", correct: true },
                    { text: "B) It hinders the artist’s work.", correct: false },
                    { text: "C) It causes the artist’s failure.", correct: false },
                    { text: "D) It is irrelevant to the masterpiece.", correct: false }
                ],
                explanation: "Encouragement leads to completion, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "Sara and her rival trained together, forging respect despite competition.",
        question: "What is the relationship between Sara and her rival?",
        answers: [
            { text: "A) Competitive but respectful", correct: true },
            { text: "B) Hostile and uncooperative", correct: false },
            { text: "C) Indifferent and distant", correct: false },
            { text: "D) Romantic and supportive", correct: false }
        ],
        explanation: "Training together with respect suggests a competitive bond, making A correct.",
        difficulty: "easy",
        category: "act-relationship"
    },
    {
        passage: "At first, the neighbors clashed over noise, but a shared crisis united them.",
        question: "How does the neighbors’ relationship evolve?",
        answers: [
            { text: "A) From conflict to unity", correct: true },
            { text: "B) From unity to conflict", correct: false },
            { text: "C) From friendship to rivalry", correct: false },
            { text: "D) From trust to indifference", correct: false }
        ],
        explanation: "Clashing to uniting shows a shift to unity, making A correct.",
        difficulty: "medium",
        category: "act-relationship"
    },
    {
        passage: "The fire razed the town, leading residents to share resources for survival.",
        question: "What is the relationship between the fire and resource sharing?",
        answers: [
            { text: "A) The fire causes resource sharing.", correct: true },
            { text: "B) Resource sharing causes the fire.", correct: false },
            { text: "C) The fire and sharing are unrelated.", correct: false },
            { text: "D) Resource sharing prevents the fire.", correct: false }
        ],
        explanation: "The fire prompts sharing, making A correct.",
        difficulty: "easy",
        category: "act-relationship"
    },
    {
        passage: "The speech argued that education empowers, while ignorance limits progress.",
        question: "What is the relationship between education and ignorance?",
        answers: [
            { text: "A) They are contrasting, with opposite effects.", correct: true },
            { text: "B) They are identical, both limiting progress.", correct: false },
            { text: "C) Education eliminates progress.", correct: false },
            { text: "D) Ignorance empowers individuals.", correct: false }
        ],
        explanation: "Education and ignorance have opposing impacts, making A correct.",
        difficulty: "medium",
        category: "act-relationship"
    },
    {
        passage: "The teammates apologized after a dispute, strengthening their bond.",
        question: "Why is the teammates’ relationship significant?",
        answers: [
            { text: "A) It fosters team unity.", correct: true },
            { text: "B) It weakens their performance.", correct: false },
            { text: "C) It causes further disputes.", correct: false },
            { text: "D) It is irrelevant to the team.", correct: false }
        ],
        explanation: "Apologizing strengthens the bond, promoting unity, making A correct.",
        difficulty: "medium",
        category: "act-relationship"
    },
    {
        passage: "The mother and son argued, their voices sharp, darkening the evening.",
        question: "How does the relationship affect the tone?",
        answers: [
            { text: "A) It creates a tense, strained tone.", correct: true },
            { text: "B) It fosters a joyful, warm tone.", correct: false },
            { text: "C) It suggests a neutral, calm tone.", correct: false },
            { text: "D) It conveys a hopeful, lively tone.", correct: false }
        ],
        explanation: "Arguing darkens the mood, creating tension, making A correct.",
        difficulty: "medium",
        category: "act-relationship"
    },
    {
        passage: "The stranger’s kindness helped the traveler, altering her cynical worldview.",
        question: "How does the stranger-traveler relationship shape the narrative?",
        answers: [
            { text: "A) It transforms the traveler’s perspective.", correct: true },
            { text: "B) It reinforces her cynicism.", correct: false },
            { text: "C) It causes her to distrust others.", correct: false },
            { text: "D) It is irrelevant to her journey.", correct: false }
        ],
        explanation: "Kindness alters her worldview, making A correct.",
        difficulty: "medium",
        category: "act-relationship"
    }
];

// Variables
let categoryStats = {
    "act-relationship": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "14";
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
        categoryStats["act-relationship"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-relationship"].incorrect++;
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
        case 14: return englishQuestions;
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
        category: "act-relationship",
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
    let totalCorrect = categoryStats["act-relationship"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-relationship"].incorrect;

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
    localStorage.setItem(`act-relationship-lessonScore-${lessonId}`, score);
    console.log(`Saved act-relationship-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-relationship-lessonScore-${lessonId}`) || "Not completed yet";
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