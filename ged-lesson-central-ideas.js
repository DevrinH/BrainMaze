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
        title: "Identifying Main Ideas and Supporting Details",
        content: [
            {
                type: "example",
                title: "Example 1: Finding the Main Idea",
                content: `
                    <h2>Example 1: Finding the Main Idea</h2>
                    <p>Passage: 'The employee handbook outlines safety protocols to prevent workplace injuries. All staff must wear protective gear, report hazards, and attend training sessions.'</p>
                    <p>Question: What is the main idea?</p>
                    <p>Step 1: Identify the topic: Safety protocols in the handbook.</p>
                    <p>Step 2: Determine the focus: Outlining rules to prevent injuries.</p>
                    <p>Main Idea: The handbook provides safety rules to protect employees.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The new recycling program requires employees to sort waste into bins for paper, plastic, and glass.' What is the main idea?",
                options: [
                    { text: "A) The recycling program mandates sorting waste.", correct: true },
                    { text: "B) Employees dislike recycling.", correct: false },
                    { text: "C) The company produces too much waste.", correct: false },
                    { text: "D) Bins are available for paper only.", correct: false }
                ],
                explanation: "The passage focuses on the requirement to sort waste, making A the main idea."
            },
            {
                type: "example",
                title: "Example 2: Identifying Supporting Details",
                content: `
                    <h2>Example 2: Identifying Supporting Details</h2>
                    <p>Passage: 'Regular exercise improves health. It reduces stress, strengthens the heart, and boosts energy levels.'</p>
                    <p>Question: What are the supporting details?</p>
                    <p>Step 1: Find the main idea: Exercise improves health.</p>
                    <p>Step 2: List details that support it: Stress reduction, heart strength, energy boost.</p>
                    <p>Supporting Details: Exercise reduces stress, strengthens the heart, and boosts energy.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'The company’s training program enhances skills. It offers workshops, online courses, and mentorship.' What are the supporting details?",
                options: [
                    { text: "A) Workshops, online courses, mentorship", correct: true },
                    { text: "B) Enhanced skills", correct: false },
                    { text: "C) Company growth", correct: false },
                    { text: "D) Employee promotions", correct: false }
                ],
                explanation: "The details supporting skill enhancement are the specific offerings: workshops, courses, and mentorship."
            },
            {
                type: "example",
                title: "Example 3: Distinguishing Main Idea from Details",
                content: `
                    <h2>Example 3: Distinguishing Main Idea from Details</h2>
                    <p>Passage: 'The city’s public transit system is efficient. Buses run every 10 minutes, trains are rarely late, and fares are affordable.'</p>
                    <p>Question: What is the main idea?</p>
                    <p>Step 1: Separate the focus: Efficiency of transit.</p>
                    <p>Step 2: Identify details: Frequent buses, punctual trains, low fares.</p>
                    <p>Main Idea: The transit system is efficient.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The new policy promotes workplace diversity. It includes hiring initiatives, cultural training, and inclusive events.' What is the main idea?",
                options: [
                    { text: "A) The policy promotes workplace diversity.", correct: true },
                    { text: "B) Hiring initiatives are effective.", correct: false },
                    { text: "C) Cultural training is mandatory.", correct: false },
                    { text: "D) Events are inclusive.", correct: false }
                ],
                explanation: "The main idea is the policy’s focus on diversity, while the other options are supporting details."
            },
            {
                type: "example",
                title: "Example 4: Summarizing the Main Idea",
                content: `
                    <h2>Example 4: Summarizing the Main Idea</h2>
                    <p>Passage: 'Solar panels benefit the environment. They reduce carbon emissions, conserve fossil fuels, and promote clean energy.'</p>
                    <p>Question: What is the main idea?</p>
                    <p>Step 1: Focus on the subject: Solar panels.</p>
                    <p>Step 2: Identify the key point: Environmental benefits.</p>
                    <p>Main Idea: Solar panels help the environment.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The job fair connects employers with talent. It features booths, interviews, and networking sessions.' What is the main idea?",
                options: [
                    { text: "A) The job fair links employers and talent.", correct: true },
                    { text: "B) Booths attract talent.", correct: false },
                    { text: "C) Interviews are scheduled.", correct: false },
                    { text: "D) Networking is optional.", correct: false }
                ],
                explanation: "The main idea is the job fair’s purpose, while the other options are details."
            },
            {
                type: "example",
                title: "Example 5: Supporting Details in Context",
                content: `
                    <h2>Example 5: Supporting Details in Context</h2>
                    <p>Passage: 'Effective communication improves teamwork. Clear instructions, active listening, and feedback are key components.'</p>
                    <p>Question: What are the supporting details?</p>
                    <p>Step 1: Main idea: Communication improves teamwork.</p>
                    <p>Step 2: Details: Clear instructions, active listening, feedback.</p>
                    <p>Supporting Details: Instructions, listening, and feedback enhance communication.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The safety campaign reduces accidents. It includes posters, drills, and equipment checks.' What are the supporting details?",
                options: [
                    { text: "A) Posters, drills, equipment checks", correct: true },
                    { text: "B) Reduced accidents", correct: false },
                    { text: "C) Campaign costs", correct: false },
                    { text: "D) Employee feedback", correct: false }
                ],
                explanation: "The details supporting accident reduction are posters, drills, and checks."
            },
            {
                type: "example",
                title: "Example 6: Main Idea in Workplace Texts",
                content: `
                    <h2>Example 6: Main Idea in Workplace Texts</h2>
                    <p>Passage: 'The company memo urges staff to conserve resources. Employees should turn off lights, reduce printing, and recycle materials.'</p>
                    <p>Question: What is the main idea?</p>
                    <p>Step 1: Identify the focus: Resource conservation.</p>
                    <p>Step 2: Confirm with details: Actions like turning off lights and recycling.</p>
                    <p>Main Idea: The memo promotes resource conservation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The wellness program encourages healthy habits. It offers gym access, nutrition classes, and stress workshops.' What is the main idea?",
                options: [
                    { text: "A) The program promotes healthy habits.", correct: true },
                    { text: "B) Gym access is free.", correct: false },
                    { text: "C) Nutrition classes are popular.", correct: false },
                    { text: "D) Stress workshops are mandatory.", correct: false }
                ],
                explanation: "The main idea is promoting healthy habits, with other options as details."
            },
            {
                type: "example",
                title: "Example 7: Complex Supporting Details",
                content: `
                    <h2>Example 7: Complex Supporting Details</h2>
                    <p>Passage: 'Urban gardens benefit communities. They provide fresh produce, create green spaces, and foster social bonds.'</p>
                    <p>Question: What are the supporting details?</p>
                    <p>Step 1: Main idea: Urban gardens benefit communities.</p>
                    <p>Step 2: Details: Fresh produce, green spaces, social bonds.</p>
                    <p>Supporting Details: Gardens supply food, enhance spaces, and build community.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The training manual ensures compliance. It covers regulations, procedures, and penalties for violations.' What are the supporting details?",
                options: [
                    { text: "A) Regulations, procedures, penalties", correct: true },
                    { text: "B) Ensured compliance", correct: false },
                    { text: "C) Manual distribution", correct: false },
                    { text: "D) Employee satisfaction", correct: false }
                ],
                explanation: "The details supporting compliance are regulations, procedures, and penalties."
            }
        ]
    }
};

// Main idea and details question array
const mainIdeaDetailsQuestions = [
    {
        question: "Passage: 'The new policy promotes workplace diversity. It includes hiring initiatives, cultural training, and inclusive events.' What is the main idea?",
        answers: [
            { text: "A) The policy promotes workplace diversity.", correct: true },
            { text: "B) Hiring initiatives are effective.", correct: false },
            { text: "C) Cultural training is mandatory.", correct: false },
            { text: "D) Events are inclusive.", correct: false }
        ],
        explanation: "The main idea is the policy’s focus on diversity, while the other options are supporting details.",
        difficulty: "easy",
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
        case 1: return mainIdeaDetailsQuestions;
        default: return mainIdeaDetailsQuestions;
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