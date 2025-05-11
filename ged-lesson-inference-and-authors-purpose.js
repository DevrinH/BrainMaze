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
        title: "Inference and Author's Purpose",
        content: [
            {
                type: "example",
                title: "Example 1: Making an Inference",
                content: `
                    <h2>Example 1: Making an Inference</h2>
                    <p>Passage: 'The manager sent an email urging employees to conserve energy by turning off lights and computers when not in use. She noted a recent spike in utility costs.'</p>
                    <p>Question: What can be inferred?</p>
                    <p>Step 1: Identify clues: Urging conservation, spike in utility costs.</p>
                    <p>Step 2: Draw a conclusion: The company is trying to reduce expenses.</p>
                    <p>Inference: The company is facing high energy costs.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The employee handbook emphasizes punctuality, stating that tardiness disrupts team schedules. It lists penalties for repeated lateness.' What can be inferred?",
                options: [
                    { text: "A) The company values timely work.", correct: true },
                    { text: "B) Employees are often late.", correct: false },
                    { text: "C) Penalties are rarely enforced.", correct: false },
                    { text: "D) Schedules are flexible.", correct: false }
                ],
                explanation: "The emphasis on punctuality and penalties suggests the company prioritizes timeliness, making A the correct inference."
            },
            {
                type: "example",
                title: "Example 2: Identifying Author's Purpose",
                content: `
                    <h2>Example 2: Identifying Author's Purpose</h2>
                    <p>Passage: 'This community newsletter highlights the benefits of our new recycling program, including reduced waste and cleaner streets. Join us at the launch event!'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze content: Highlights benefits, invites to event.</p>
                    <p>Step 2: Determine intent: Encourage participation.</p>
                    <p>Author’s Purpose: To persuade readers to support the recycling program.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'Our company’s safety manual details emergency procedures to ensure employee safety. Follow these steps to evacuate during a fire.' What is the author’s purpose?",
                options: [
                    { text: "A) To inform employees about safety procedures.", correct: true },
                    { text: "B) To persuade employees to leave the company.", correct: false },
                    { text: "C) To entertain with emergency stories.", correct: false },
                    { text: "D) To criticize unsafe practices.", correct: false }
                ],
                explanation: "The detailed procedures aim to educate employees on safety, making A the correct purpose."
            },
            {
                type: "example",
                title: "Example 3: Inferring from Tone",
                content: `
                    <h2>Example 3: Inferring from Tone</h2>
                    <p>Passage: 'The city’s budget cuts to public parks are shortsighted. Neglected green spaces harm community health and morale.'</p>
                    <p>Question: What can be inferred about the author’s view?</p>
                    <p>Step 1: Analyze tone: Words like “shortsighted” and “harm” suggest criticism.</p>
                    <p>Step 2: Draw conclusion: The author disapproves of the cuts.</p>
                    <p>Inference: The author believes budget cuts to parks are harmful.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The new software training is a waste of time. Employees already know the basics, and the sessions are repetitive.' What can be inferred about the author’s view?",
                options: [
                    { text: "A) The author disapproves of the training.", correct: true },
                    { text: "B) The author supports the training.", correct: false },
                    { text: "C) The author is neutral about the training.", correct: false },
                    { text: "D) The author created the training.", correct: false }
                ],
                explanation: "The negative tone and words like 'waste' and 'repetitive' indicate disapproval, making A the correct inference."
            },
            {
                type: "example",
                title: "Example 4: Author’s Purpose in Workplace Texts",
                content: `
                    <h2>Example 4: Author’s Purpose in Workplace Texts</h2>
                    <p>Passage: 'This memo outlines our new flexible work policy to boost productivity. Please review the guidelines and submit feedback by Friday.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze content: Outlines policy, requests feedback.</p>
                    <p>Step 2: Determine intent: Inform and engage employees.</p>
                    <p>Author’s Purpose: To inform employees about the policy and encourage feedback.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'Our employee newsletter celebrates recent achievements, including record sales and team awards. Share your success stories with us!' What is the author’s purpose?",
                options: [
                    { text: "A) To motivate employees by celebrating achievements.", correct: true },
                    { text: "B) To inform about sales data.", correct: false },
                    { text: "C) To criticize low performers.", correct: false },
                    { text: "D) To advertise products.", correct: false }
                ],
                explanation: "The celebratory tone and call for stories aim to motivate, making A the correct purpose."
            },
            {
                type: "example",
                title: "Example 5: Inferring from Context",
                content: `
                    <h2>Example 5: Inferring from Context</h2>
                    <p>Passage: 'The team worked overtime to meet the project deadline. Despite exhaustion, they delivered the report on time.'</p>
                    <p>Question: What can be inferred?</p>
                    <p>Step 1: Identify clues: Overtime, exhaustion, meeting deadline.</p>
                    <p>Step 2: Draw conclusion: The team was dedicated.</p>
                    <p>Inference: The team was committed to meeting the deadline.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The community center stayed open late for the annual festival. Volunteers decorated the halls and welcomed guests.' What can be inferred?",
                options: [
                    { text: "A) The community center valued the festival.", correct: true },
                    { text: "B) Volunteers were paid for their work.", correct: false },
                    { text: "C) The festival was unpopular.", correct: false },
                    { text: "D) The halls were undecorated.", correct: false }
                ],
                explanation: "Staying open late and volunteer efforts suggest the center valued the event, making A the correct inference."
            },
            {
                type: "example",
                title: "Example 6: Author’s Purpose with Persuasive Tone",
                content: `
                    <h2>Example 6: Author’s Purpose with Persuasive Tone</h2>
                    <p>Passage: 'Support our city’s bike lane expansion. It will reduce traffic, improve air quality, and promote fitness!'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze tone: Urgent, positive benefits listed.</p>
                    <p>Step 2: Determine intent: Convince readers to support.</p>
                    <p>Author’s Purpose: To persuade readers to support bike lane expansion.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'Join our wellness program today! It offers free gym access, nutrition tips, and stress relief workshops to improve your health.' What is the author’s purpose?",
                options: [
                    { text: "A) To persuade employees to join the wellness program.", correct: true },
                    { text: "B) To inform about gym facilities.", correct: false },
                    { text: "C) To entertain with health tips.", correct: false },
                    { text: "D) To criticize unhealthy habits.", correct: false }
                ],
                explanation: "The enthusiastic tone and call to join aim to persuade, making A the correct purpose."
            },
            {
                type: "example",
                title: "Example 7: Combining Inference and Purpose",
                content: `
                    <h2>Example 7: Combining Inference and Purpose</h2>
                    <p>Passage: 'The editorial criticizes the city’s delay in repairing roads, citing increased accidents. It urges residents to demand action.'</p>
                    <p>Question: What can be inferred, and what is the author’s purpose?</p>
                    <p>Step 1: Inference clues: Criticism, accidents, delay.</p>
                    <p>Step 2: Inference: The author believes delays are dangerous.</p>
                    <p>Step 3: Purpose: Urging action suggests advocacy.</p>
                    <p>Inference: Road delays cause safety issues; Purpose: To persuade residents to act.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The company memo warns of budget cuts, noting reduced hours for some staff. It asks employees to suggest cost-saving ideas.' What can be inferred, and what is the author’s purpose?",
                options: [
                    { text: "A) Inference: The company faces financial challenges; Purpose: To seek employee input.", correct: true },
                    { text: "B) Inference: Employees are overworked; Purpose: To inform about hours.", correct: false },
                    { text: "C) Inference: Budget cuts are minor; Purpose: To criticize staff.", correct: false },
                    { text: "D) Inference: Staff will be fired; Purpose: To warn employees.", correct: false }
                ],
                explanation: "The warning and request for ideas suggest financial issues and a goal to involve employees, making A correct."
            }
        ]
    }
};

// Inference and author's purpose question array
const inferenceAuthorsPurposeQuestions = [
    {
        question: "Passage: 'The town’s newsletter praises the new library, describing its modern facilities and community programs. It invites residents to a grand opening.' What can be inferred, and what is the author’s purpose?",
        answers: [
            { text: "A) Inference: The town values the library; Purpose: To encourage community participation.", correct: true },
            { text: "B) Inference: The library is outdated; Purpose: To inform about facilities.", correct: false },
            { text: "C) Inference: Residents dislike the library; Purpose: To criticize the community.", correct: false },
            { text: "D) Inference: The opening is canceled; Purpose: To warn residents.", correct: false }
        ],
        explanation: "The praise and invitation suggest the town values the library and aims to engage residents, making A the correct answer.",
        difficulty: "easy",
        category: "ged-inference-and-authors-purpose"
    },
    {
        question: "Passage: 'Green roofs, covered with plants, reduce urban heat and improve air quality. Cities are adopting them to combat climate change.' What can be inferred about the author's purpose?",
        answers: [
            { text: "A) To advocate for green roofs as a climate change solution.", correct: true },
            { text: "B) To describe the types of plants used on green roofs.", correct: false },
            { text: "C) To criticize urban heat management.", correct: false },
            { text: "D) To explain air quality regulations.", correct: false }
        ],
        explanation: "The author's purpose is to promote green roofs as a solution to climate change, inferred from the positive tone and focus on benefits, while other options are not supported by the passage.",
        difficulty: "medium",
        category: "ged-inference-and-authors-purpose"
    },
    {
        question: "Passage: 'Remote learning platforms offer flexibility but require self-discipline. Students must manage time effectively to succeed.' What can be inferred about the challenges of remote learning?",
        answers: [
            { text: "A) It is less flexible than in-person learning.", correct: false },
            { text: "B) It demands strong time management skills.", correct: true },
            { text: "C) It is unsuitable for most students.", correct: false },
            { text: "D) It eliminates the need for self-discipline.", correct: false }
        ],
        explanation: "The passage implies that remote learning requires self-discipline and time management, making B the correct inference, while other options contradict or exaggerate the passage.",
        difficulty: "medium",
        category: "ged-inference-and-authors-purpose"
    },
    {
        question: "Passage: 'Public libraries provide free access to knowledge. They offer books, digital resources, and community programs, leveling the educational playing field.' What is the author's purpose in this passage?",
        answers: [
            { text: "A) To argue that libraries are outdated.", correct: false },
            { text: "B) To highlight the role of libraries in equalizing education.", correct: true },
            { text: "C) To list the types of books in libraries.", correct: false },
            { text: "D) To promote digital resources over books.", correct: false }
        ],
        explanation: "The author's purpose is to emphasize libraries' role in providing equal educational access, inferred from the focus on free resources and community impact, while other options misalign with the passage.",
        difficulty: "medium",
        category: "ged-inference-and-authors-purpose"
    },
    {
        question: "Passage: 'Invasive species disrupt ecosystems by outcompeting native plants and animals. Controlling their spread is critical to preserving biodiversity.' What can be inferred about the impact of invasive species?",
        answers: [
            { text: "A) They threaten biodiversity by outcompeting native species.", correct: true },
            { text: "B) They enhance ecosystem stability.", correct: false },
            { text: "C) They have minimal impact on native plants.", correct: false },
            { text: "D) They are easily controlled.", correct: false }
        ],
        explanation: "The passage suggests invasive species harm biodiversity by outcompeting native species, making A the correct inference, while other options contradict the passage.",
        difficulty: "medium",
        category: "ged-inference-and-authors-purpose"
    },
    {
        question: "Passage: 'Volunteering builds stronger communities. It fosters empathy, encourages collaboration, and addresses local needs.' Why does the author emphasize volunteering?",
        answers: [
            { text: "A) To discourage individual efforts.", correct: false },
            { text: "B) To promote volunteering as a way to strengthen communities.", correct: false },
            { text: "C) To show how volunteering benefits communities.", correct: true },
            { text: "D) To explain the challenges of collaboration.", correct: false }
        ],
        explanation: "The author's purpose is to illustrate the benefits of volunteering for community strength, inferred from the positive outcomes listed, while other options misinterpret the intent.",
        difficulty: "medium",
        category: "ged-inference-and-authors-purpose"
    },
    {
        question: "Passage: 'Carpooling reduces traffic congestion and lowers carbon emissions. It also saves money on fuel and parking.' What can be inferred about the author's view on carpooling?",
        answers: [
            { text: "A) The author is neutral about carpooling.", correct: false },
            { text: "B) The author views carpooling as costly.", correct: false },
            { text: "C) The author sees carpooling as impractical.", correct: false },
            { text: "D) The author supports carpooling for its benefits.", correct: true }
        ],
        explanation: "The author's positive description of carpooling’s benefits implies support for it, making D the correct inference, while other options conflict with the passage’s tone.",
        difficulty: "medium",
        category: "ged-inference-and-authors-purpose"
    }
];

// Variables
let categoryStats = {
    "ged-inference-and-authors-purpose": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-inference-and-authors-purpose"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-inference-and-authors-purpose"].incorrect++;
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
        case 1: return inferenceAuthorsPurposeQuestions;
        default: return inferenceAuthorsPurposeQuestions;
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
    let totalCorrect = categoryStats["ged-inference-and-authors-purpose"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-inference-and-authors-purpose"].incorrect;

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
    localStorage.setItem(`ged-inference-and-authors-purpose-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-inference-and-authors-purpose-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-inference-and-authors-purpose-lessonScore-${lessonId}`) || "Not completed yet";
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