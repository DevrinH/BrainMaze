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
        title: "Identifying Central Ideas",
        content: [
            {
                type: "example",
                title: "Example 1: Finding the Central Idea",
                content: `
                    <h2>Example 1: Finding the Central Idea</h2>
                    <p>Passage: 'The company’s new policy encourages remote work to improve employee satisfaction. It allows flexible hours, provides technology stipends, and promotes virtual collaboration tools.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the topic: Remote work policy.</p>
                    <p>Step 2: Determine the focus: Encouraging remote work to enhance satisfaction.</p>
                    <p>Central Idea: The policy promotes remote work to boost employee satisfaction.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The community garden project aims to improve local health. It offers fresh vegetables, hosts nutrition workshops, and encourages physical activity.' What is the central idea?",
                options: [
                    { text: "A) The garden project enhances community health.", correct: true },
                    { text: "B) Nutrition workshops are popular.", correct: false },
                    { text: "C) The community grows vegetables.", correct: false },
                    { text: "D) Physical activity is mandatory.", correct: false }
                ],
                explanation: "The passage focuses on the garden project’s goal to improve health, making A the central idea."
            },
            {
                type: "example",
                title: "Example 2: Distinguishing Central Idea from Details",
                content: `
                    <h2>Example 2: Distinguishing Central Idea from Details</h2>
                    <p>Passage: 'Recycling programs reduce environmental waste. They collect plastics, paper, and glass, educate residents, and lower landfill use.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the topic: Recycling programs.</p>
                    <p>Step 2: Determine the focus: Reducing environmental waste.</p>
                    <p>Central Idea: Recycling programs decrease environmental waste.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'The employee wellness program supports mental health. It offers counseling, stress management classes, and mindfulness sessions.' What is the central idea?",
                options: [
                    { text: "A) The wellness program promotes mental health.", correct: true },
                    { text: "B) Counseling is available to employees.", correct: false },
                    { text: "C) Stress management classes are effective.", correct: false },
                    { text: "D) Mindfulness sessions are mandatory.", correct: false }
                ],
                explanation: "The central idea is the program’s focus on mental health, while other options are supporting details."
            },
            {
                type: "example",
                title: "Example 3: Summarizing the Central Idea",
                content: `
                    <h2>Example 3: Summarizing the Central Idea</h2>
                    <p>Passage: 'Public libraries enhance community learning. They provide free books, host educational workshops, and offer internet access.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Focus on the subject: Public libraries.</p>
                    <p>Step 2: Identify the key point: Enhancing community learning.</p>
                    <p>Central Idea: Public libraries support community learning.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The safety training program prevents workplace accidents. It includes hazard identification, emergency drills, and equipment safety checks.' What is the central idea?",
                options: [
                    { text: "A) The training program reduces workplace accidents.", correct: true },
                    { text: "B) Hazard identification is critical.", correct: false },
                    { text: "C) Emergency drills are frequent.", correct: false },
                    { text: "D) Equipment checks are mandatory.", correct: false }
                ],
                explanation: "The central idea is the program’s goal to prevent accidents, with other options as details."
            },
            {
                type: "example",
                title: "Example 4: Central Idea in Informational Texts",
                content: `
                    <h2>Example 4: Central Idea in Informational Texts</h2>
                    <p>Passage: 'Renewable energy sources benefit the planet. Solar panels, wind turbines, and hydroelectric dams reduce reliance on fossil fuels.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the topic: Renewable energy sources.</p>
                    <p>Step 2: Determine the focus: Environmental benefits.</p>
                    <p>Central Idea: Renewable energy sources help the environment.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The mentorship program fosters career growth. It pairs employees with experienced leaders, offers skill workshops, and provides networking opportunities.' What is the central idea?",
                options: [
                    { text: "A) The mentorship program supports career development.", correct: true },
                    { text: "B) Experienced leaders mentor employees.", correct: false },
                    { text: "C) Skill workshops are effective.", correct: false },
                    { text: "D) Networking opportunities are optional.", correct: false }
                ],
                explanation: "The central idea is the program’s focus on career growth, while other options are details."
            },
            {
                type: "example",
                title: "Example 5: Central Idea in Workplace Contexts",
                content: `
                    <h2>Example 5: Central Idea in Workplace Contexts</h2>
                    <p>Passage: 'The company’s diversity training improves workplace inclusion. It teaches cultural sensitivity, addresses biases, and promotes teamwork.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the topic: Diversity training.</p>
                    <p>Step 2: Determine the focus: Improving workplace inclusion.</p>
                    <p>Central Idea: Diversity training enhances workplace inclusion.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The volunteer program strengthens community ties. It organizes clean-up events, charity drives, and youth mentorship.' What is the central idea?",
                options: [
                    { text: "A) The volunteer program builds community connections.", correct: true },
                    { text: "B) Clean-up events are popular.", correct: false },
                    { text: "C) Charity drives raise funds.", correct: false },
                    { text: "D) Youth mentorship is required.", correct: false }
                ],
                explanation: "The central idea is the program’s role in strengthening community ties, with other options as details."
            },
            {
                type: "example",
                title: "Example 6: Avoiding Incorrect Central Ideas",
                content: `
                    <h2>Example 6: Avoiding Incorrect Central Ideas</h2>
                    <p>Passage: 'Urban bike lanes promote sustainable transport. They reduce traffic congestion, lower emissions, and encourage exercise.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the topic: Urban bike lanes.</p>
                    <p>Step 2: Determine the focus: Promoting sustainable transport.</p>
                    <p>Central Idea: Urban bike lanes support sustainable transportation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The financial literacy program empowers employees. It teaches budgeting, saving strategies, and debt management.' What is the central idea?",
                options: [
                    { text: "A) The program enhances employees’ financial skills.", correct: true },
                    { text: "B) Budgeting is the main focus.", correct: false },
                    { text: "C) Saving strategies are effective.", correct: false },
                    { text: "D) Debt management is mandatory.", correct: false }
                ],
                explanation: "The central idea is empowering employees through financial literacy, while other options are details."
            },
            {
                type: "example",
                title: "Example 7: Complex Central Ideas",
                content: `
                    <h2>Example 7: Complex Central Ideas</h2>
                    <p>Passage: 'Community centers foster social cohesion. They offer recreational programs, host cultural events, and provide spaces for civic engagement.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the topic: Community centers.</p>
                    <p>Step 2: Determine the focus: Fostering social cohesion.</p>
                    <p>Central Idea: Community centers promote social cohesion.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The internship program prepares students for careers. It provides hands-on experience, professional mentoring, and industry workshops.' What is the central idea?",
                options: [
                    { text: "A) The internship program equips students for professional careers.", correct: true },
                    { text: "B) Hands-on experience is valuable.", correct: false },
                    { text: "C) Mentoring is the main focus.", correct: false },
                    { text: "D) Workshops are mandatory.", correct: false }
                ],
                explanation: "The central idea is preparing students for careers, with other options as supporting details."
            }
        ]
    }
};

// Central ideas question array
const centralIdeasQuestions = [
    {
        question: "Passage: 'The public transit initiative improves urban mobility. It expands bus routes, upgrades train systems, and offers discounted fares.' What is the central idea?",
        answers: [
            { text: "A) The transit initiative enhances urban mobility.", correct: true },
            { text: "B) Bus routes are expanded.", correct: false },
            { text: "C) Train systems are modern.", correct: false },
            { text: "D) Discounted fares are popular.", correct: false }
        ],
        explanation: "The central idea is improving urban mobility through the transit initiative, while other options are supporting details.",
        difficulty: "easy",
        category: "ged-central-ideas"
    },
    {
        question: "Passage: 'Renewable energy adoption reduces carbon emissions. Solar panels and wind turbines are increasingly installed, and government subsidies support clean energy projects.' What is the central idea?",
        answers: [
            { text: "A) Renewable energy adoption lowers carbon emissions.", correct: true },
            { text: "B) Solar panels are widely used.", correct: false },
            { text: "C) Wind turbines are efficient.", correct: false },
            { text: "D) Government subsidies fund projects.", correct: false }
        ],
        explanation: "The central idea is the reduction of carbon emissions through renewable energy adoption, while other options are specific details supporting this goal.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        question: "Passage: 'Community gardens promote social cohesion. They provide fresh produce, encourage neighborly interaction, and offer educational workshops.' What is the central idea?",
        answers: [
            { text: "A) Community gardens supply fresh produce.", correct: false },
            { text: "B) Community gardens foster social cohesion.", correct: true },
            { text: "C) Neighborly interaction is common.", correct: false },
            { text: "D) Workshops teach gardening skills.", correct: false }
        ],
        explanation: "The central idea is promoting social cohesion through community gardens, with other options being benefits that contribute to this purpose.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        question: "Passage: 'Telecommuting boosts workplace flexibility. Employees work from home, use digital collaboration tools, and balance personal responsibilities.' What is the central idea?",
        answers: [
            { text: "A) Employees use digital tools.", correct: false },
            { text: "B) Telecommuting enhances workplace flexibility.", correct: true },
            { text: "C) Remote work saves time.", correct: false },
            { text: "D) Personal responsibilities are balanced.", correct: false }
        ],
        explanation: "The central idea is that telecommuting increases workplace flexibility, while other options are specific aspects of this practice.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        question: "Passage: 'Urban reforestation mitigates heat islands. Planting trees cools cities, improves air quality, and enhances aesthetics.' What is the central idea?",
        answers: [
            { text: "A) Urban reforestation reduces heat islands.", correct: true },
            { text: "B) Trees improve air quality.", correct: false },
            { text: "C) Cities are aesthetically enhanced.", correct: false },
            { text: "D) Tree planting cools urban areas.", correct: false }
        ],
        explanation: "The central idea is mitigating heat islands through urban reforestation, with other options as secondary benefits.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        question: "Passage: 'Financial literacy programs empower individuals. They teach budgeting, debt management, and investment strategies.' What is the central idea?",
        answers: [
            { text: "A) Budgeting is a key skill.", correct: false },
            { text: "B) Debt management is taught.", correct: false },
            { text: "C) Financial literacy programs empower individuals.", correct: true },
            { text: "D) Investments are strategic.", correct: false }
        ],
        explanation: "The central idea is empowering individuals through financial literacy programs, while other options are components of the curriculum.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        question: "Passage: 'Recycling initiatives conserve natural resources. They reduce landfill waste, promote material reuse, and encourage sustainable habits.' What is the central idea?",
        answers: [
            { text: "A) Landfill waste is reduced.", correct: false },
            { text: "B) Materials are reused.", correct: false },
            { text: "C) Sustainable habits are encouraged.", correct: false },
            { text: "D) Recycling initiatives conserve natural resources.", correct: true }
        ],
        explanation: "The central idea is conserving natural resources through recycling initiatives, with other options as outcomes of this effort.",
        difficulty: "medium",
        category: "ged-central-ideas"
    }
];

// Variables
let categoryStats = {
    "ged-central-ideas": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-central-ideas"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-central-ideas"].incorrect++;
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
        case 1: return centralIdeasQuestions;
        default: return centralIdeasQuestions;
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
    let totalCorrect = categoryStats["ged-central-ideas"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-central-ideas"].incorrect;

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
    localStorage.setItem(`ged-central-ideas-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-central-ideas-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-central-ideas-lessonScore-${lessonId}`) || "Not completed yet";
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