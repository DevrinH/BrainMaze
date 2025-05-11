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
        title: "Punctuation Usage",
        content: [
            {
                type: "example",
                title: "Example 1: Using Commas in Lists",
                content: `
                    <h2>Example 1: Using Commas in Lists</h2>
                    <p>Sentence: 'The training covers safety teamwork and communication skills.'</p>
                    <p>Question: Is the comma usage correct?</p>
                    <p>Step 1: Check the list: 'safety', 'teamwork', 'communication skills' (three items).</p>
                    <p>Step 2: Apply rule: Commas separate items, with 'and' before the last item.</p>
                    <p>Correct Sentence: The training covers safety, teamwork, and communication skills.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Sentence: 'The report includes data charts and graphs.' Is the comma usage correct?",
                options: [
                    { text: "A) Incorrect, needs a comma after 'charts'.", correct: true },
                    { text: "B) Correct, no commas needed.", correct: false },
                    { text: "C) Incorrect, needs a comma after 'data'.", correct: false },
                    { text: "D) Incorrect, needs a comma after 'graphs'.", correct: false }
                ],
                explanation: "In a list of three items ('data', 'charts', 'graphs'), a comma is needed after 'charts' before 'and'."
            },
            {
                type: "example",
                title: "Example 2: Semicolons in Compound Sentences",
                content: `
                    <h2>Example 2: Semicolons in Compound Sentences</h2>
                    <p>Sentence: 'The meeting was canceled, employees were not informed.'</p>
                    <p>Question: Is the punctuation correct?</p>
                    <p>Step 1: Identify clauses: Two independent clauses ('The meeting was canceled', 'employees were not informed').</p>
                    <p>Step 2: Apply rule: Use a semicolon or period, not a comma, to avoid a comma splice.</p>
                    <p>Correct Sentence: The meeting was canceled; employees were not informed.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Sentence: 'The project is behind schedule, the team needs more time.' How should this be corrected?",
                options: [
                    { text: "A) The project is behind schedule; the team needs more time.", correct: true },
                    { text: "B) The project is behind schedule, the team needs more time.", correct: false },
                    { text: "C) The project is behind schedule the team needs more time.", correct: false },
                    { text: "D) The project is behind schedule: the team needs more time.", correct: false }
                ],
                explanation: "A semicolon is needed to join two independent clauses, avoiding a comma splice."
            },
            {
                type: "example",
                title: "Example 3: Using Colons for Lists",
                content: `
                    <h2>Example 3: Using Colons for Lists</h2>
                    <p>Sentence: 'The training requires the following, laptops, notebooks, and pens.'</p>
                    <p>Question: Is the colon usage correct?</p>
                    <p>Step 1: Check the sentence: The colon should follow a complete sentence before introducing a list.</p>
                    <p>Step 2: Fix punctuation: Replace the comma with a colon after 'following'.</p>
                    <p>Correct Sentence: The training requires the following: laptops, notebooks, and pens.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Sentence: 'The job posting lists these skills, communication, teamwork, and problem-solving.' How should this be corrected?",
                options: [
                    { text: "A) The job posting lists these skills: communication, teamwork, and problem-solving.", correct: true },
                    { text: "B) The job posting lists these skills, communication, teamwork, and problem-solving.", correct: false },
                    { text: "C) The job posting lists these skills; communication, teamwork, and problem-solving.", correct: false },
                    { text: "D) The job posting lists these skills communication, teamwork, and problem-solving.", correct: false }
                ],
                explanation: "A colon is needed after 'skills' to introduce the list, following a complete sentence."
            },
            {
                type: "example",
                title: "Example 4: Apostrophes for Possession",
                content: `
                    <h2>Example 4: Apostrophes for Possession</h2>
                    <p>Sentence: 'The employees handbook is outdated.'</p>
                    <p>Question: Is the apostrophe usage correct?</p>
                    <p>Step 1: Identify possession: The handbook belongs to the employee(s).</p>
                    <p>Step 2: Apply rule: Singular 'employee' needs 'employee’s'; plural 'employees' needs 'employees’'.</p>
                    <p>Correct Sentence: The employee’s handbook is outdated.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Sentence: 'The teams performance was impressive.' Which is the correct apostrophe usage?",
                options: [
                    { text: "A) The team’s performance was impressive.", correct: true },
                    { text: "B) The teams’ performance was impressive.", correct: false },
                    { text: "C) The teams performance was impressive.", correct: false },
                    { text: "D) The team performance was impressive.", correct: false }
                ],
                explanation: "The singular 'team' requires 'team’s' for possession."
            },
            {
                type: "example",
                title: "Example 5: Quotation Marks for Dialogue",
                content: `
                    <h2>Example 5: Quotation Marks for Dialogue</h2>
                    <p>Sentence: 'The manager said, Training starts at 9 AM.'</p>
                    <p>Question: Is the quotation mark usage correct?</p>
                    <p>Step 1: Check dialogue: The quoted text is a direct statement.</p>
                    <p>Step 2: Apply rule: Comma before the quote, period inside quotation marks.</p>
                    <p>Correct Sentence: The manager said, "Training starts at 9 AM."</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Sentence: 'The employee asked, When is the deadline.' How should this be corrected?",
                options: [
                    { text: "A) The employee asked, 'When is the deadline?'", correct: true },
                    { text: "B) The employee asked, 'When is the deadline.'", correct: false },
                    { text: "C) The employee asked 'When is the deadline?'", correct: false },
                    { text: "D) The employee asked, When is the deadline?", correct: false }
                ],
                explanation: "Dialogue requires quotation marks around the spoken words, with a question mark inside."
            },
            {
                type: "example",
                title: "Example 6: Commas in Nonessential Clauses",
                content: `
                    <h2>Example 6: Commas in Nonessential Clauses</h2>
                    <p>Sentence: 'The CEO who founded the company is retiring.'</p>
                    <p>Question: Is the comma usage correct?</p>
                    <p>Step 1: Identify the clause: 'who founded the company' is essential (identifies which CEO).</p>
                    <p>Step 2: Apply rule: Essential clauses do not need commas.</p>
                    <p>Correct Sentence: The CEO who founded the company is retiring.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Sentence: 'The project, which was launched last month, is on track.' Is the comma usage correct?",
                options: [
                    { text: "A) Correct, commas surround a nonessential clause.", correct: true },
                    { text: "B) Incorrect, no commas needed.", correct: false },
                    { text: "C) Incorrect, needs a comma after 'project'.", correct: false },
                    { text: "D) Incorrect, needs a comma after 'month'.", correct: false }
                ],
                explanation: "The clause 'which was launched last month' is nonessential, requiring commas."
            },
            {
                type: "example",
                title: "Example 7: Combining Punctuation Rules",
                content: `
                    <h2>Example 7: Combining Punctuation Rules</h2>
                    <p>Sentence: 'The companys policy states, Employees must submit reports by Friday, or face penalties.'</p>
                    <p>Question: What is wrong with the punctuation?</p>
                    <p>Step 1: Check apostrophe: 'companys' should be 'company’s'.</p>
                    <p>Step 2: Check quotation: Comma before 'Employees', period inside.</p>
                    <p>Correct Sentence: The company’s policy states, "Employees must submit reports by Friday, or they face penalties."</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Sentence: 'The managers memo warns, Budget cuts are coming employees must prepare.' How should this be corrected?",
                options: [
                    { text: "A) The manager’s memo warns, 'Budget cuts are coming; employees must prepare.'", correct: true },
                    { text: "B) The managers’ memo warns, 'Budget cuts are coming employees must prepare.'", correct: false },
                    { text: "C) The manager’s memo warns, Budget cuts are coming; employees must prepare.", correct: false },
                    { text: "D) The manager’s memo warns 'Budget cuts are coming, employees must prepare.'", correct: false }
                ],
                explanation: "Needs 'manager’s' for possession, quotation marks around dialogue, and a semicolon to join clauses."
            }
        ]
    }
};

// Punctuation usage question array
const punctuationUsageQuestions = [
    {
        question: "Sentence: 'The training session, scheduled for Monday, includes safety and teamwork.' Is the comma usage correct?",
        answers: [
            { text: "A) Correct, commas surround a nonessential clause.", correct: true },
            { text: "B) Incorrect, no commas needed.", correct: false },
            { text: "C) Incorrect, needs a comma after 'safety'.", correct: false },
            { text: "D) Incorrect, needs a comma after 'teamwork'.", correct: false }
        ],
        explanation: "The clause 'scheduled for Monday' is nonessential, requiring commas, making A correct.",
        difficulty: "easy",
        category: "ged-punctuation-usage"
    },
    {
        question: "Which sentence uses commas correctly to set off a nonrestrictive clause?",
        answers: [
            { text: "A) The solar panels, which generate clean energy, were installed last month.", correct: true },
            { text: "B) The solar panels which generate clean energy, were installed last month.", correct: false },
            { text: "C) The solar panels, which generate clean energy were installed last month.", correct: false },
            { text: "D)—The solar panels which generate, clean energy were installed last month.", correct: false }
        ],
        explanation: "Option A is correct because it uses commas to properly set off the nonrestrictive clause 'which generate clean energy.' Option B has a misplaced comma after 'energy.' Option C is missing a comma after 'energy.' Option D incorrectly uses a dash and a comma within the clause.",
        difficulty: "medium",
        category: "ged-punctuation-usage"
    },
    {
        question: "Which sentence correctly uses a semicolon to separate two independent clauses?",
        answers: [
            { text: "A) The community center offers workshops; they teach valuable skills.", correct: true },
            { text: "B) The community center offers workshops, they teach valuable skills.", correct: false },
            { text: "C) The community center offers workshops; and they teach valuable skills.", correct: false },
            { text: "D) The community center offers workshops: they teach valuable skills.", correct: false }
        ],
        explanation: "Option A is correct because it uses a semicolon to join two independent clauses ('The community center offers workshops' and 'they teach valuable skills'). Option B creates a comma splice. Option C incorrectly includes 'and' after the semicolon. Option D uses a colon, which is incorrect for joining independent clauses here.",
        difficulty: "medium",
        category: "ged-punctuation-usage"
    },
    {
        question: "Which sentence uses apostrophes correctly to show possession?",
        answers: [
            { text: "A) The volunteers' efforts made the parks' cleanup a success.", correct: false },
            { text: "B) The volunteers' efforts made the park's cleanup a success.", correct: true },
            { text: "C) The volunteers efforts made the parks cleanup a success.", correct: false },
            { text: "D) The volunteer's efforts made the park's cleanup a success.", correct: false }
        ],
        explanation: "Option B is correct because 'volunteers'' shows plural possession and 'park's' shows singular possession. Option A incorrectly uses 'parks'' (implying multiple parks). Option C lacks necessary apostrophes. Option D incorrectly uses 'volunteer's' (singular) for a plural subject.",
        difficulty: "medium",
        category: "ged-punctuation-usage"
    },
    {
        question: "Which sentence correctly uses parentheses to include additional information?",
        answers: [
            { text: "A) The recycling program (launched last year) has reduced waste.", correct: true },
            { text: "B) The recycling program, launched last year, has reduced waste.", correct: false },
            { text: "C) The recycling program (launched last year, has reduced waste).", correct: false },
            { text: "D) The recycling program launched last year (has reduced waste.)", correct: false }
        ],
        explanation: "Option A is correct because parentheses are used to enclose the additional information 'launched last year' without disrupting the sentence. Option B incorrectly uses commas for nonessential information better suited for parentheses in this context. Option C has incorrect punctuation inside the parentheses. Option D misplaces the period and disrupts sentence structure.",
        difficulty: "medium",
        category: "ged-punctuation-usage"
    },
    {
        question: "Which sentence uses a colon correctly to introduce a list?",
        answers: [
            { text: "A) The workshop covers: budgeting, investing, and saving.", correct: false },
            { text: "B) The workshop covers several topics, budgeting, investing, and saving.", correct: false },
            { text: "C) The workshop covers several topics: budgeting, investing, and saving.", correct: true },
            { text: "D) The workshop covers several topics; budgeting, investing, and saving.", correct: false }
        ],
        explanation: "Option C is correct because the colon follows a complete sentence ('The workshop covers several topics') and introduces the list. Option A lacks a complete sentence before the colon. Option B uses a comma incorrectly for a list introduction. Option D uses a semicolon, which is incorrect for introducing a list.",
        difficulty: "medium",
        category: "ged-punctuation-usage"
    },
    {
        question: "Which sentence uses quotation marks correctly for a direct quote?",
        answers: [
            { text: "A) The organizer said, The event starts at noon.", correct: false },
            { text: "B) The organizer said, 'The event starts at noon.'", correct: true },
            { text: "C) The organizer said 'The event starts at noon.'", correct: false },
            { text: "D) The organizer said, 'The event starts at noon'!", correct: false }
        ],
        explanation: "Option B is correct because it uses quotation marks to enclose the direct quote and places the period inside the closing quotation mark. Option A lacks quotation marks around the quote. Option C is missing a comma before the quote. Option D incorrectly places an exclamation point outside the quotation marks, altering the quote's punctuation.",
        difficulty: "medium",
        category: "ged-punctuation-usage"
    }
];

// Variables
let categoryStats = {
    "ged-punctuation-usage": { correct: 0, incorrect: 0 }
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
    const passageMatch = content.match(/Sentence:.*?['"].*?['"]/i) || content.match(/<p>Sentence:.*?<\/p>/i);
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
        categoryStats["ged-punctuation-usage"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-punctuation-usage"].incorrect++;
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
        case 1: return punctuationUsageQuestions;
        default: return punctuationUsageQuestions;
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
    let totalCorrect = categoryStats["ged-punctuation-usage"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-punctuation-usage"].incorrect;

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
    localStorage.setItem(`ged-punctuation-usage-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-punctuation-usage-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-punctuation-usage-lessonScore-${lessonId}`) || "Not completed yet";
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