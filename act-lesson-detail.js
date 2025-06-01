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
    const lessonId = urlParams.get('lesson') || 13;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    13: {
        title: "Detail",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying Key Details",
                passage: "The scientist recorded the temperature every hour, noting a sudden drop at midnight, which sparked her curiosity.",
                content: `
                    <h2>Example 1: Identifying Key Details</h2>
                    <p>Question: What key detail supports the scientist’s curiosity?</p>
                    <p>Step 1: Analyze the passage: Look for specific information driving the narrative.</p>
                    <p>Step 2: Apply rule: Key details are specific facts that support the main idea or action.</p>
                    <p>Solution: The sudden drop in temperature at midnight is the key detail sparking her curiosity.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The hiker noticed fresh paw prints in the mud, prompting her to move cautiously.",
                question: "What key detail prompts the hiker’s caution?",
                options: [
                    { text: "A) Fresh paw prints in the mud", correct: true },
                    { text: "B) The hiker’s movement", correct: false },
                    { text: "C) The muddy terrain", correct: false },
                    { text: "D) The time of day", correct: false }
                ],
                explanation: "Fresh paw prints directly cause caution, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Detail Supporting Main Idea",
                passage: "The festival was vibrant, with colorful banners waving and musicians playing lively tunes, drawing crowds from afar.",
                content: `
                    <h2>Example 2: Detail Supporting Main Idea</h2>
                    <p>Question: Which detail supports the main idea of the festival’s vibrancy?</p>
                    <p>Step 1: Identify main idea: The festival is vibrant and attractive.</p>
                    <p>Step 2: Apply rule: Supporting details provide evidence for the main idea.</p>
                    <p>Solution: Colorful banners waving supports the festival’s vibrant atmosphere.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "The library was a haven, with soft lighting and rows of books inviting readers to linger.",
                question: "Which detail supports the main idea of the library as a haven?",
                options: [
                    { text: "A) Soft lighting", correct: true },
                    { text: "B) Rows of books", correct: false },
                    { text: "C) Readers lingering", correct: false },
                    { text: "D) The library’s location", correct: false }
                ],
                explanation: "Soft lighting creates a calming atmosphere, supporting the haven idea, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Distinguishing Relevant Details",
                passage: "The debate was heated, with speakers citing data and raising voices. The room had blue curtains.",
                content: `
                    <h2>Example 3: Distinguishing Relevant Details</h2>
                    <p>Question: Which detail is irrelevant to the debate’s intensity?</p>
                    <p>Step 1: Identify focus: The debate’s heated nature.</p>
                    <p>Step 2: Apply rule: Irrelevant details do not support the main focus.</p>
                    <p>Solution: The blue curtains are irrelevant to the debate’s intensity.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "The protest was passionate, with signs waving and chants echoing. A nearby tree bloomed pink.",
                question: "Which detail is irrelevant to the protest’s passion?",
                options: [
                    { text: "A) A nearby tree bloomed pink.", correct: true },
                    { text: "B) Signs waving", correct: false },
                    { text: "C) Chants echoing", correct: false },
                    { text: "D) The protest’s location", correct: false }
                ],
                explanation: "The blooming tree does not affect passion, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Detail and Tone",
                passage: "The abandoned house creaked, its dusty windows reflecting a fading sunset.",
                content: `
                    <h2>Example 4: Detail and Tone</h2>
                    <p>Question: How does a detail contribute to the tone?</p>
                    <p>Step 1: Analyze tone: The description feels eerie and melancholic.</p>
                    <p>Step 2: Apply rule: Details shape tone through sensory or emotional cues.</p>
                    <p>Solution: Dusty windows reflecting a fading sunset create a melancholic, desolate tone.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "The battlefield was silent, littered with broken swords under a gray sky.",
                question: "How does a detail contribute to the tone?",
                options: [
                    { text: "A) Broken swords create a somber tone.", correct: true },
                    { text: "B) The gray sky suggests joy.", correct: false },
                    { text: "C) Silence conveys excitement.", correct: false },
                    { text: "D) The battlefield feels hopeful.", correct: false }
                ],
                explanation: "Broken swords evoke loss, creating a somber tone, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Detail Supporting Purpose",
                passage: "The article praised the invention, noting its sleek design and energy efficiency.",
                content: `
                    <h2>Example 5: Detail Supporting Purpose</h2>
                    <p>Question: Which detail supports the article’s purpose of praising the invention?</p>
                    <p>Step 1: Identify purpose: To highlight the invention’s value.</p>
                    <p>Step 2: Apply rule: Details align with the author’s intent.</p>
                    <p>Solution: Energy efficiency supports the purpose by emphasizing the invention’s benefits.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The review lauded the novel, highlighting its vivid characters and intricate plot.",
                question: "Which detail supports the review’s purpose of lauding the novel?",
                options: [
                    { text: "A) Intricate plot", correct: true },
                    { text: "B) The novel’s length", correct: false },
                    { text: "C) The author’s name", correct: false },
                    { text: "D) The publication date", correct: false }
                ],
                explanation: "Intricate plot highlights quality, supporting praise, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Detail in Narrative",
                passage: "As the hero fled, a single feather fell from her cloak, unnoticed in the chaos.",
                content: `
                    <h2>Example 6: Detail in Narrative</h2>
                    <p>Question: What is the significance of the detail in the narrative?</p>
                    <p>Step 1: Analyze detail: A feather falling suggests a subtle clue.</p>
                    <p>Step 2: Apply rule: Narrative details often foreshadow or reveal character traits.</p>
                    <p>Solution: The feather may foreshadow a later discovery or symbolize the hero’s vulnerability.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "During the escape, a locket slipped from his pocket, glinting in the moonlight.",
                question: "What is the significance of the locket in the narrative?",
                options: [
                    { text: "A) It foreshadows a future revelation.", correct: true },
                    { text: "B) It describes the moonlight.", correct: false },
                    { text: "C) It explains the escape route.", correct: false },
                    { text: "D) It highlights his wealth.", correct: false }
                ],
                explanation: "A slipping locket suggests a future plot point, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Detail and Argument",
                passage: "The essay argued for conservation, citing 50% habitat loss in a decade.",
                content: `
                    <h2>Example 7: Detail and Argument</h2>
                    <p>Question: How does the detail strengthen the argument?</p>
                    <p>Step 1: Identify argument: Conservation is urgent.</p>
                    <p>Step 2: Apply rule: Specific details provide evidence for claims.</p>
                    <p>Solution: The 50% habitat loss statistic emphasizes urgency, strengthening the conservation argument.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The report urged recycling, noting 2 million tons of waste annually.",
                question: "How does the detail strengthen the argument?",
                options: [
                    { text: "A) It highlights the scale of the waste problem.", correct: true },
                    { text: "B) It describes recycling methods.", correct: false },
                    { text: "C) It suggests waste is minimal.", correct: false },
                    { text: "D) It explains recycling costs.", correct: false }
                ],
                explanation: "2 million tons emphasizes the waste issue, making A correct."
            }
        ]
    }
};

// ACT English question array
const englishQuestions = [
    {
        passage: "The chef perfected her dish, tasting it repeatedly until the flavors balanced.",
        question: "What key detail explains the chef’s perfectionism?",
        answers: [
            { text: "A) Tasting it repeatedly", correct: true },
            { text: "B) The balanced flavors", correct: false },
            { text: "C) The type of dish", correct: false },
            { text: "D) The chef’s experience", correct: false }
        ],
        explanation: "Repeated tasting shows perfectionism, making A correct.",
        difficulty: "easy",
        category: "act-detail"
    },
    {
        passage: "The concert was electric, with flashing lights and a roaring crowd energizing the band.",
        question: "Which detail supports the main idea of the concert’s energy?",
        answers: [
            { text: "A) Flashing lights", correct: true },
            { text: "B) The band’s performance", correct: false },
            { text: "C) The concert’s duration", correct: false },
            { text: "D) The venue’s size", correct: false }
        ],
        explanation: "Flashing lights enhance the energetic atmosphere, making A correct.",
        difficulty: "medium",
        category: "act-detail"
    },
    {
        passage: "The trial was tense, with lawyers arguing fiercely. The judge wore a black robe.",
        question: "Which detail is irrelevant to the trial’s tension?",
        answers: [
            { text: "A) The judge wore a black robe.", correct: true },
            { text: "B) Lawyers arguing fiercely", correct: false },
            { text: "C) The tense atmosphere", correct: false },
            { text: "D) The trial’s duration", correct: false }
        ],
        explanation: "The judge’s robe does not affect tension, making A correct.",
        difficulty: "easy",
        category: "act-detail"
    },
    {
        passage: "The forest was eerie, with twisted branches casting long shadows in the fog.",
        question: "How does a detail contribute to the tone?",
        answers: [
            { text: "A) Twisted branches create an eerie tone.", correct: true },
            { text: "B) Long shadows suggest joy.", correct: false },
            { text: "C) Fog conveys excitement.", correct: false },
            { text: "D) The forest feels welcoming.", correct: false }
        ],
        explanation: "Twisted branches enhance eeriness, making A correct.",
        difficulty: "medium",
        category: "act-detail"
    },
    {
        passage: "The speech advocated equality, citing 20% wage gaps in industries.",
        question: "Which detail supports the speech’s purpose of advocating equality?",
        answers: [
            { text: "A) 20% wage gaps", correct: true },
            { text: "B) The speech’s length", correct: false },
            { text: "C) The speaker’s name", correct: false },
            { text: "D) The audience size", correct: false }
        ],
        explanation: "Wage gaps highlight inequality, supporting the purpose, making A correct.",
        difficulty: "medium",
        category: "act-detail"
    },
    {
        passage: "As the villain escaped, a torn map fragment fell, unseen in the alley.",
        question: "What is the significance of the map fragment in the narrative?",
        answers: [
            { text: "A) It foreshadows a future discovery.", correct: true },
            { text: "B) It describes the alley.", correct: false },
            { text: "C) It explains the escape.", correct: false },
            { text: "D) It highlights the villain’s wealth.", correct: false }
        ],
        explanation: "A falling fragment suggests a plot point, making A correct.",
        difficulty: "medium",
        category: "act-detail"
    },
    {
        passage: "The proposal urged urban gardens, noting 500 tons of produce grown yearly.",
        question: "How does the detail strengthen the argument?",
        answers: [
            { text: "A) It shows the productivity of gardens.", correct: true },
            { text: "B) It describes garden locations.", correct: false },
            { text: "C) It suggests low productivity.", correct: false },
            { text: "D) It explains garden costs.", correct: false }
        ],
        explanation: "500 tons of produce emphasizes benefits, making A correct.",
        difficulty: "medium",
        category: "act-detail"
    }
];

// Variables
let categoryStats = {
    "act-detail": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "13";
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
        categoryStats["act-detail"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-detail"].incorrect++;
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
        case 13: return englishQuestions;
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
        category: "act-detail",
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
    let totalCorrect = categoryStats["act-detail"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-detail"].incorrect;

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
    localStorage.setItem(`act-detail-lessonScore-${lessonId}`, score);
    console.log(`Saved act-detail-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-detail-lessonScore-${lessonId}`) || "Not completed yet";
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