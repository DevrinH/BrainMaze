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
        title: "Civics and Government",
        content: [
            {
                type: "example",
                title: "Example 1: Structure of U.S. Government",
                content: `
                    <h2>Example 1: Structure of U.S. Government</h2>
                    <p>Passage: The U.S. government is divided into three branches: legislative (Congress), executive (President), and judicial (Supreme Court). This separation of powers prevents any branch from dominating.</p>
                    <p>Question: Why is the government divided into three branches?</p>
                    <p>Step 1: Identify purpose: Prevent any branch from dominating.</p>
                    <p>Step 2: Confirm: Separation balances power among branches.</p>
                    <p>Solution: The government is divided into three branches to prevent any one branch from dominating.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "The U.S. government operates through three distinct branches, as outlined in the Constitution. The legislative branch, Congress, is responsible for creating laws, while the executive enforces them, and the judicial interprets their constitutionality, ensuring a balanced system of governance.",
                question: "What is the role of Congress?",
                options: [
                    { text: "A) Make laws", correct: true },
                    { text: "B) Enforce laws", correct: false },
                    { text: "C) Interpret laws", correct: false },
                    { text: "D) Appoint judges", correct: false }
                ],
                explanation: "The passage states Congress makes laws, making A correct."
            },
            {
                type: "example",
                title: "Example 2: U.S. Constitution",
                content: `
                    <h2>Example 2: U.S. Constitution</h2>
                    <p>Passage: The U.S. Constitution, ratified in 1788, is the supreme law of the land. It outlines government structure and protects citizens’ rights through amendments like the Bill of Rights.</p>
                    <p>Question: What is the role of the Constitution?</p>
                    <p>Step 1: Identify role: Outlines government structure and protects rights.</p>
                    <p>Step 2: Confirm: It serves as the supreme law guiding governance.</p>
                    <p>Solution: The Constitution outlines government structure and protects citizens’ rights.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Ratified in 1788, the U.S. Constitution serves as the foundation for American governance, establishing the framework for the federal government’s operations. It includes checks and balances to distribute power and incorporates amendments like the Bill of Rights to safeguard individual freedoms.",
                question: "What is one function of the Constitution?",
                options: [
                    { text: "A) Regulate trade", correct: false },
                    { text: "B) Establish government framework", correct: true },
                    { text: "C) Conduct elections", correct: false },
                    { text: "D) Fund schools", correct: false }
                ],
                explanation: "The passage states the Constitution establishes the framework for governance, making B correct."
            },
            {
                type: "example",
                title: "Example 3: Civic Responsibilities",
                content: `
                    <h2>Example 3: Civic Responsibilities</h2>
                    <p>Passage: U.S. citizens have civic duties, such as voting, serving on juries, and paying taxes, which support democratic governance and public services.</p>
                    <p>Question: What is one civic responsibility of U.S. citizens?</p>
                    <p>Step 1: Identify duty: Voting is listed as a civic duty.</p>
                    <p>Step 2: Confirm: Voting supports democratic governance.</p>
                    <p>Solution: One civic responsibility is voting.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "U.S. citizens contribute to democracy through civic duties that sustain the justice system and public services. Jury service, for instance, ensures fair trials by involving citizens in the legal process, strengthening the judicial branch’s role in upholding the rule of law.",
                question: "What is one civic duty mentioned?",
                options: [
                    { text: "A) Running for office", correct: false },
                    { text: "B) Jury service", correct: true },
                    { text: "C) Writing laws", correct: false },
                    { text: "D) Teaching history", correct: false }
                ],
                explanation: "The passage mentions jury service as a civic duty, making B correct."
            },
            {
                type: "example",
                title: "Example 4: Federalism",
                content: `
                    <h2>Example 4: Federalism</h2>
                    <p>Passage: Federalism divides power between federal and state governments. The federal government handles national issues like defense, while states manage local matters like education.</p>
                    <p>Question: What is the role of state governments under federalism?</p>
                    <p>Step 1: Identify role: Manage local matters like education.</p>
                    <p>Step 2: Confirm: States have authority over local issues.</p>
                    <p>Solution: State governments manage local matters like education.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Federalism in the U.S. creates a dual system of governance, balancing power between national and state authorities. The federal government oversees interstate commerce and national defense, while states have authority over local policies, such as setting standards for public education systems.",
                question: "What do states control under federalism?",
                options: [
                    { text: "A) Interstate commerce", correct: false },
                    { text: "B) National defense", correct: false },
                    { text: "C) Public schools", correct: true },
                    { text: "D) Foreign policy", correct: false }
                ],
                explanation: "The passage states states control local policies like public schools, making C correct."
            },
            {
                type: "example",
                title: "Example 5: Bill of Rights",
                content: `
                    <h2>Example 5: Bill of Rights healthier plants.</h2>
                    <p>Passage: The Bill of Rights, the first ten amendments to the Constitution, protects freedoms like speech, religion, and the press, ensuring individual liberties.</p>
                    <p>Question: What does the Bill of Rights protect?</p>
                    <p>Step 1: Identify protections: Freedoms like speech, religion, and press.</p>
                    <p>Step 2: Confirm: These ensure individual liberties.</p>
                    <p>Solution: The Bill of Rights protects individual liberties like speech and religion.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "The Bill of Rights, ratified in 1791, safeguards essential freedoms for U.S. citizens. The First Amendment, in particular, guarantees the right to assemble and petition the government, enabling citizens to express collective grievances and influence policy.",
                question: "What does the First Amendment protect?",
                options: [
                    { text: "A) Right to bear arms", correct: false },
                    { text: "B) Freedom of assembly", correct: true },
                    { text: "C) Trial by jury", correct: false },
                    { text: "D) Search and seizure protections", correct: false }
                ],
                explanation: "The passage states the First Amendment protects freedom of assembly, making B correct."
            },
            {
                type: "example",
                title: "Example 6: Electoral Process",
                content: `
                    <h2>Example 6: Electoral Process</h2>
                    <p>Passage: The U.S. president is elected through the Electoral College, where electors from each state vote based on the state’s popular vote results.</p>
                    <p>Question: How is the president elected?</p>
                    <p>Step 1: Identify process: Electors vote in the Electoral College.</p>
                    <p>Step 2: Confirm: Votes reflect state popular vote results.</p>
                    <p>Solution: The president is elected through the Electoral College based on state popular votes.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "The Electoral College, established by the Constitution, determines the U.S. president through a system of electors. Each state’s number of electors is based on its population, reflected in congressional representation, ensuring larger states have greater influence in the electoral process.",
                question: "What determines the number of electors per state?",
                answers: [
                    { text: "A) State land area", correct: false },
                    { text: "B) State tax revenue", correct: false },
                    { text: "C) State population", correct: true },
                    { text: "D) State founding date", correct: false }
                ],
                explanation: "The passage states electors are based on state population, making C correct."
            },
            {
                type: "example",
                title: "Example 7: Checks and Balances",
                content: `
                    <h2>Example 7: Checks and Balances</h2>
                    <p>Passage: Checks and balances ensure no government branch gains excessive power. For example, the President can veto laws, but Congress can override the veto with a two-thirds vote.</p>
                    <p>Question: How can Congress counter a presidential veto?</p>
                    <p>Step 1: Identify mechanism: Congress can override with a two-thirds vote.</p>
                    <p>Step 2: Confirm: This balances executive power.</p>
                    <p>Solution: Congress can override a presidential veto with a two-thirds vote.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "The U.S. government’s checks and balances system maintains equilibrium among its branches. The judicial branch, through the Supreme Court, exercises judicial review, a power solidified in the 1803 case Marbury v. Madison, allowing it to invalidate laws that violate the Constitution.",
                question: "What is the significance of judicial review?",
                answers: [
                    { text: "A) It allows Congress to override vetoes", correct: false },
                    { text: "B) It enables the Supreme Court to check unconstitutional laws", correct: true },
                    { text: "C) It permits states to nullify federal laws", correct: false },
                    { text: "D) It ensures the president appoints judges", correct: false }
                ],
                explanation: "The passage explains judicial review as the Supreme Court’s power to check unconstitutional laws, making B correct."
            }
        ]
    }
};

// Civics and government question array
const civicsGovernmentQuestions = [
    {
        passage: "In 1868, the 14th Amendment was ratified to address citizenship and civil rights issues following the Civil War. It granted citizenship to all persons born in the U.S. and guaranteed equal protection under the law, significantly shaping modern legal interpretations of civil liberties.",
        question: "What does the 14th Amendment guarantee?",
        answers: [
            { text: "A) Equal protection", correct: true },
            { text: "B) Freedom of speech", correct: false },
            { text: "C) Right to bear arms", correct: false },
            { text: "D) Voting rights", correct: false }
        ],
        explanation: "The passage states the 14th Amendment ensures equal protection under the law, making A correct.",
        difficulty: "easy",
        category: "ged-civics-and-government"
    },
    {
        passage: "The U.S. Constitution delineates specific powers to maintain a balanced government. In Article I, it assigns Congress the authority to declare war, ensuring that major national decisions involve legislative deliberation, distinct from the executive’s role in conducting military operations.",
        question: "Why does Congress have the authority to declare war?",
        answers: [
            { text: "A) To oversee judicial appointments", correct: false },
            { text: "B) To balance power with the executive branch", correct: true },
            { text: "C) To regulate state militias", correct: false },
            { text: "D) To control foreign trade", correct: false }
        ],
        explanation: "The passage notes Congress’s war declaration power balances the executive’s military authority, making B correct.",
        difficulty: "medium",
        category: "ged-civics-and-government"
    },
    {
        passage: "Civic participation is a cornerstone of U.S. democracy, enabling citizens to influence government decisions. Voting in elections allows individuals to shape policies and choose leaders, fostering a responsive government that reflects the will of the people.",
        question: "How does voting impact the government?",
        answers: [
            { text: "A) It funds public services", correct: false },
            { text: "B) It appoints judges", correct: false },
            { text: "C) It shapes policies and leadership", correct: true },
            { text: "D) It regulates commerce", correct: false }
        ],
        explanation: "The passage states voting influences policies and leadership, making C correct.",
        difficulty: "medium",
        category: "ged-civics-and-government"
    },
    {
        passage: "Federalism in the U.S. creates a system where power is shared between national and state governments. The federal government handles issues like foreign policy and interstate commerce, while states manage local concerns, such as education standards, ensuring both levels address distinct needs.",
        question: "What is a key feature of federalism?",
        answers: [
            { text: "A) A single centralized government", correct: false },
            { text: "B) States controlling all federal laws", correct: false },
            { text: "C) Division of powers between national and state governments", correct: true },
            { text: "D) Elimination of state governments", correct: false }
        ],
        explanation: "The passage describes federalism as dividing powers between national and state governments, making C correct.",
        difficulty: "medium",
        category: "ged-civics-and-government"
    },
    {
        passage: "The Bill of Rights, enacted in 1791, protects fundamental liberties through its amendments. The Second Amendment, often debated in discussions of public safety and individual rights, ensures citizens’ right to bear arms, reflecting the era’s emphasis on personal security.",
        question: "What right does the Second Amendment protect?",
        answers: [
            { text: "A) Freedom of religion", correct: false },
            { text: "B) Right to bear arms", correct: true },
            { text: "C) Freedom of speech", correct: false },
            { text: "D) Right to a fair trial", correct: false }
        ],
        explanation: "The passage specifies the Second Amendment protects the right to bear arms, making B correct.",
        difficulty: "medium",
        category: "ged-civics-and-government"
    },
    {
        passage: "The Electoral College, a unique feature of U.S. presidential elections, allocates electors based on state population. While electors typically vote according to their state’s popular vote, rare instances of ‘faithless electors’ voting independently highlight the system’s complexity and flexibility.",
        question: "What is a characteristic of the Electoral College?",
        answers: [
            { text: "A) Direct election by popular vote", correct: false },
            { text: "B) Potential for faithless electors", correct: true },
            { text: "C) Equal votes for all states", correct: false },
            { text: "D) Appointment by the president", correct: false }
        ],
        explanation: "The passage notes the possibility of faithless electors, making B correct.",
        difficulty: "medium",
        category: "ged-civics-and-government"
    },
    {
        passage: "In 1803, the Supreme Court’s decision in Marbury v. Madison established judicial review, empowering the Court to strike down laws that violate the Constitution. This power ensures the judiciary can check the legislative and executive branches, preserving constitutional integrity.",
        question: "What is the significance of judicial review?",
        answers: [
            { text: "A) It permits states to nullify federal laws", correct: false },
            { text: "B) It allows Congress to override vetoes", correct: false },
            { text: "C) It ensures the president appoints judges", correct: false },
            { text: "D) It enables the Supreme Court to check unconstitutional laws", correct: true }
        ],
        explanation: "The passage explains judicial review as the Court’s power to check unconstitutional laws, making D correct.",
        difficulty: "medium",
        category: "ged-civics-and-government"
    }
];

// Variables
let categoryStats = {
    "ged-civics-and-government": { correct: 0, incorrect: 0 }
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
        console.error("Start lesson button not found!");
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
            lessonContent.innerHTML = `
                <div class="question-row social-studies-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question}</div>
                        <div class="answer-choices" id="answer-buttons"></div>
                        <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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

// Extract passage from content (simplified for examples and questions)
function extractPassage(content) {
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/In.*?(\.(?=\s*The\s|\s*This\s)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
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
        categoryStats["ged-civics-and-government"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-civics-and-government"].incorrect++;
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
                    <button id="start-quiz-btn" class="next-btn">Next</button>
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
        case 1: return civicsGovernmentQuestions;
        default: return civicsGovernmentQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row social-studies-section">
                <div class="passage-text">${question.passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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
    let totalCorrect = categoryStats["ged-civics-and-government"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-civics-and-government"].incorrect;

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
    localStorage.setItem(`ged-civics-and-government-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-civics-and-government-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-civics-and-government-lessonScore-${lessonId}`) || "Not completed yet";
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