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
    const lessonId = urlParams.get('lesson') || 19;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    19: {
        title: "Conflicting Viewpoints",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying Viewpoints",
                passage: "Scientist A argues that climate change is primarily human-caused, citing CO2 emissions data. Scientist B claims natural cycles drive climate shifts, referencing historical temperature records.",
                content: `
                    <h2>Example 1: Identifying Viewpoints</h2>
                    <p>Question: What are the conflicting viewpoints on climate change?</p>
                    <p>Step 1: Analyze the passage: Identify each scientist’s claim.</p>
                    <p>Step 2: Apply rule: Conflicting viewpoints present opposing explanations for the same issue.</p>
                    <p>Solution: Scientist A believes climate change is human-caused, while Scientist B attributes it to natural cycles.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Economist X states that raising taxes boosts public services, citing infrastructure spending. Economist Y argues it harms growth, pointing to reduced business investment.",
                question: "What are the conflicting viewpoints on raising taxes?",
                options: [
                    { text: "A) X supports tax increases for services; Y says they harm growth.", correct: true },
                    { text: "B) X says taxes harm services; Y supports tax increases.", correct: false },
                    { text: "C) Both agree taxes boost services.", correct: false },
                    { text: "D) Both agree taxes harm growth.", correct: false }
                ],
                explanation: "X links taxes to better services, Y to economic harm, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Understanding Supporting Evidence",
                passage: "Dr. Lee claims screen time harms children’s sleep, citing studies showing delayed bedtimes. Dr. Patel argues it has minimal impact, referencing surveys of normal sleep durations.",
                content: `
                    <h2>Example 2: Understanding Supporting Evidence</h2>
                    <p>Question: What evidence supports Dr. Lee’s viewpoint?</p>
                    <p>Step 1: Identify Dr. Lee’s claim: Screen time harms sleep.</p>
                    <p>Step 2: Apply rule: Evidence is data or observations backing a viewpoint.</p>
                    <p>Solution: Dr. Lee’s evidence is studies showing delayed bedtimes linked to screen time.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Professor A supports urban green spaces, citing improved air quality data. Professor B opposes them, noting high maintenance costs from city budgets.",
                question: "What evidence supports Professor B’s viewpoint?",
                options: [
                    { text: "A) High maintenance costs from city budgets", correct: true },
                    { text: "B) Improved air quality data", correct: false },
                    { text: "C) Increased urban population", correct: false },
                    { text: "D) Public health surveys", correct: false }
                ],
                explanation: "Professor B cites maintenance costs, making A correct."
            },
            {
                type: "example",
                title: "Example 3: Comparing Viewpoints",
                passage: "Advocate M argues for electric cars, stating they reduce emissions by 50%. Advocate N prefers gas cars, claiming they are 30% cheaper to maintain.",
                content: `
                    <h2>Example 3: Comparing Viewpoints</h2>
                    <p>Question: How do the viewpoints differ in their priorities?</p>
                    <p>Step 1: Analyze claims: M focuses on emissions, N on cost.</p>
                    <p>Step 2: Apply rule: Comparing viewpoints reveals differing values or goals.</p>
                    <p>Solution: M prioritizes environmental benefits, while N prioritizes economic savings.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Researcher P supports organic farming, citing 20% higher soil health. Researcher Q favors conventional farming, noting 40% higher crop yields.",
                question: "How do the viewpoints differ in their priorities?",
                options: [
                    { text: "A) P values soil health; Q values crop yields.", correct: true },
                    { text: "B) P values crop yields; Q values soil health.", correct: false },
                    { text: "C) Both prioritize soil health.", correct: false },
                    { text: "D) Both prioritize crop yields.", correct: false }
                ],
                explanation: "P focuses on soil health, Q on yields, making A correct."
            },
            {
                type: "example",
                title: "Example 4: Analyzing Strengths",
                passage: "Policy A supports remote work, citing 25% higher employee satisfaction. Policy B favors office work, noting 15% better team collaboration.",
                content: `
                    <h2>Example 4: Analyzing Strengths</h2>
                    <p>Question: What is a strength of Policy A’s argument?</p>
                    <p>Step 1: Identify Policy A’s claim and evidence: Remote work improves satisfaction.</p>
                    <p>Step 2: Apply rule: Strengths are compelling evidence or clear benefits.</p>
                    <p>Solution: A strength is the 25% higher employee satisfaction, supported by data.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Viewpoint X endorses solar energy, citing 30% lower emissions. Viewpoint Y supports coal, noting 20% lower energy costs.",
                question: "What is a strength of Viewpoint X’s argument?",
                options: [
                    { text: "A) 30% lower emissions, supported by data", correct: true },
                    { text: "B) 20% lower energy costs", correct: false },
                    { text: "C) Increased energy demand", correct: false },
                    { text: "D) Coal’s availability", correct: false }
                ],
                explanation: "X’s strength is the 30% emissions reduction, making A correct."
            },
            {
                type: "example",
                title: "Example 5: Identifying Weaknesses",
                passage: "Dr. Kim claims antibiotics overuse harms immunity, citing patient surveys. Dr. Tan argues it’s necessary, referencing emergency cases but not long-term data.",
                content: `
                    <h2>Example 5: Identifying Weaknesses</h2>
                    <p>Question: What is a weakness in Dr. Tan’s argument?</p>
                    <p>Step 1: Analyze Dr. Tan’s evidence: Emergency cases lack long-term data.</p>
                    <p>Step 2: Apply rule: Weaknesses include missing evidence or limited scope.</p>
                    <p>Solution: A weakness is the lack of long-term data to support antibiotic necessity.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Expert R supports high-speed rail, citing travel time savings. Expert S opposes it, mentioning construction costs but not comparing benefits.",
                question: "What is a weakness in Expert S’s argument?",
                options: [
                    { text: "A) Not comparing costs to travel time benefits", correct: true },
                    { text: "B) Citing construction costs", correct: false },
                    { text: "C) Supporting high-speed rail", correct: false },
                    { text: "D) Mentioning travel time savings", correct: false }
                ],
                explanation: "S’s failure to compare costs to benefits is a weakness, making A correct."
            },
            {
                type: "example",
                title: "Example 6: Analyzing Implications",
                passage: "Viewpoint A supports banning plastic bags, citing 40% less ocean pollution. Viewpoint B opposes the ban, noting 50% higher production costs for alternatives.",
                content: `
                    <h2>Example 6: Analyzing Implications</h2>
                    <p>Question: What is an implication of adopting Viewpoint A?</p>
                    <p>Step 1: Analyze Viewpoint A: Banning plastic bags reduces pollution.</p>
                    <p>Step 2: Apply rule: Implications are potential outcomes of a viewpoint.</p>
                    <p>Solution: An implication is reduced ocean pollution but possibly higher costs for alternatives.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Advocate C supports free college, citing 30% higher graduation rates. Advocate D opposes it, noting 20% higher taxes needed.",
                question: "What is an implication of adopting Advocate C’s viewpoint?",
                options: [
                    { text: "A) Higher graduation rates but increased taxes", correct: true },
                    { text: "B) Lower graduation rates", correct: false },
                    { text: "C) No change in taxes", correct: false },
                    { text: "D) Reduced college access", correct: false }
                ],
                explanation: "Free college implies higher graduation but higher taxes, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Reconciling Viewpoints",
                passage: "Scientist P claims renewable energy is sustainable, citing low emissions. Scientist Q argues fossil fuels are reliable, pointing to consistent energy output.",
                content: `
                    <h2>Example 7: Reconciling Viewpoints</h2>
                    <p>Question: How could the viewpoints be reconciled?</p>
                    <p>Step 1: Analyze viewpoints: P values sustainability, Q reliability.</p>
                    <p>Step 2: Apply rule: Reconciliation finds common ground or hybrid solutions.</p>
                    <p>Solution: A hybrid energy system using renewables and fossil fuels could balance sustainability and reliability.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Policy X promotes online education, citing flexibility. Policy Y favors in-person classes, noting better engagement.",
                question: "How could the viewpoints be reconciled?",
                options: [
                    { text: "A) Blended learning combining online and in-person classes", correct: true },
                    { text: "B) Eliminating all online education", correct: false },
                    { text: "C) Focusing only on in-person classes", correct: false },
                    { text: "D) Ignoring engagement concerns", correct: false }
                ],
                explanation: "Blended learning balances flexibility and engagement, making A correct."
            }
        ]
    }
};

// ACT English question array (adapted for Conflicting Viewpoints)
const englishQuestions = [
    {
        passage: "Dr. Smith argues genetically modified crops increase yields by 20%, citing field trials. Dr. Jones claims they risk biodiversity, referencing native species decline.",
        question: "What are the conflicting viewpoints on genetically modified crops?",
        answers: [
            { text: "A) Smith supports GM crops for yields; Jones warns of biodiversity loss.", correct: true },
            { text: "B) Smith warns of biodiversity loss; Jones supports GM crops.", correct: false },
            { text: "C) Both support GM crops for yields.", correct: false },
            { text: "D) Both oppose GM crops for biodiversity.", correct: false }
        ],
        explanation: "Smith focuses on yields, Jones on biodiversity risks, making A correct.",
        difficulty: "easy",
        category: "act-conflicting-viewpoints"
    },
    {
        passage: "Expert A advocates for space exploration, citing technological advances. Expert B opposes it, noting high costs relative to Earth-based issues.",
        question: "What evidence supports Expert A’s viewpoint?",
        answers: [
            { text: "A) Technological advances", correct: true },
            { text: "B) High costs", correct: false },
            { text: "C) Earth-based issues", correct: false },
            { text: "D) Public opinion surveys", correct: false }
        ],
        explanation: "Expert A cites technological advances, making A correct.",
        difficulty: "medium",
        category: "act-conflicting-viewpoints"
    },
    {
        passage: "Viewpoint M supports nuclear energy, citing 50% lower emissions. Viewpoint N prefers renewables, emphasizing zero-emission potential.",
        question: "How do the viewpoints differ in their priorities?",
        answers: [
            { text: "A) M prioritizes low emissions; N prioritizes zero emissions.", correct: true },
            { text: "B) M prioritizes zero emissions; N prioritizes low emissions.", correct: false },
            { text: "C) Both prioritize low emissions.", correct: false },
            { text: "D) Both prioritize high emissions.", correct: false }
        ],
        explanation: "M focuses on low emissions, N on zero emissions, making A correct.",
        difficulty: "medium",
        category: "act-conflicting-viewpoints"
    },
    {
        passage: "Policy P encourages driverless cars, citing 30% fewer accidents. Policy Q opposes them, noting job losses for drivers.",
        question: "What is a strength of Policy P’s argument?",
        answers: [
            { text: "A) 30% fewer accidents, supported by data", correct: true },
            { text: "B) Job losses for drivers", correct: false },
            { text: "C) Increased car production", correct: false },
            { text: "D) Driver training programs", correct: false }
        ],
        explanation: "P’s strength is the 30% accident reduction, making A correct.",
        difficulty: "easy",
        category: "act-conflicting-viewpoints"
    },
    {
        passage: "Dr. Chen supports animal testing, citing medical breakthroughs. Dr. Park opposes it, referencing ethical concerns but lacking alternative solutions.",
        question: "What is a weakness in Dr. Park’s argument?",
        answers: [
            { text: "A) Lacking alternative solutions", correct: true },
            { text: "B) Citing ethical concerns", correct: false },
            { text: "C) Supporting animal testing", correct: false },
            { text: "D) Mentioning medical breakthroughs", correct: false }
        ],
        explanation: "Not offering alternatives weakens Park’s argument, making A correct.",
        difficulty: "medium",
        category: "act-conflicting-viewpoints"
    },
    {
        passage: "Advocate K supports single-use plastics bans, citing 25% less landfill waste. Advocate L opposes bans, noting 15% higher costs for alternatives.",
        question: "What is an implication of adopting Advocate K’s viewpoint?",
        answers: [
            { text: "A) Less landfill waste but higher costs", correct: true },
            { text: "B) More landfill waste", correct: false },
            { text: "C) No change in costs", correct: false },
            { text: "D) Reduced plastic use without trade-offs", correct: false }
        ],
        explanation: "Banning plastics reduces waste but raises costs, making A correct.",
        difficulty: "medium",
        category: "act-conflicting-viewpoints"
    },
    {
        passage: "Policy R promotes homeschooling, citing personalized learning. Policy S favors public schools, emphasizing social skills development.",
        question: "How could the viewpoints be reconciled?",
        answers: [
            { text: "A) Hybrid models combining homeschooling and public school activities", correct: true },
            { text: "B) Eliminating public schools", correct: false },
            { text: "C) Focusing only on homeschooling", correct: false },
            { text: "D) Ignoring social skills development", correct: false }
        ],
        explanation: "Hybrid models balance personalized learning and social skills, making A correct.",
        difficulty: "medium",
        category: "act-conflicting-viewpoints"
    }
];

// Variables
let categoryStats = {
    "act-conflicting-viewpoints": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "19";
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
        categoryStats["act-conflicting-viewpoints"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["act-conflicting-viewpoints"].incorrect++;
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
        case 19: return englishQuestions;
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
        category: "act-conflicting-viewpoints",
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
    let totalCorrect = categoryStats["act-conflicting-viewpoints"].correct;
    let totalAttempted = totalCorrect + categoryStats["act-conflicting-viewpoints"].incorrect;

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
    localStorage.setItem(`act-conflicting-viewpoints-lessonScore-${lessonId}`, score);
    console.log(`Saved act-conflicting-viewpoints-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`act-conflicting-viewpoints-lessonScore-${lessonId}`) || "Not completed yet";
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