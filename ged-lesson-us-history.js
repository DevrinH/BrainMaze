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
        title: "U.S. History",
        content: [
            {
                type: "example",
                title: "Example 1: American Revolution",
                content: `
                    <h2>Example 1: American Revolution</h2>
                    <p>Passage: The American Revolution (1775–1783) was driven by colonists’ desire for independence from British rule. Key events include the Declaration of Independence in 1776, drafted by Thomas Jefferson.</p>
                    <p>Question: What was a key cause of the American Revolution?</p>
                    <p>Step 1: Identify cause: Colonists’ desire for independence.</p>
                    <p>Step 2: Confirm: This motivated rebellion against British rule.</p>
                    <p>Solution: A key cause was the colonists’ desire for independence.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In the 1770s, tensions between American colonists and British authorities escalated in cities like Boston. The American Revolution began with conflicts such as the Boston Tea Party in 1773, where colonists protested British taxes on goods like tea, seeking greater autonomy.",
                question: "What was a primary cause of the revolution?",
                options: [
                    { text: "A) British taxation", correct: true },
                    { text: "B) French alliances", correct: false },
                    { text: "C) Native American conflicts", correct: false },
                    { text: "D) Religious disputes", correct: false }
                ],
                explanation: "The passage highlights protests against British taxes, making A correct."
            },
            {
                type: "example",
                title: "Example 2: U.S. Constitution",
                content: `
                    <h2>Example 2: U.S. Constitution</h2>
                    <p>Passage: The U.S. Constitution, ratified in 1788, established a federal government with three branches: legislative, executive, and judicial, to balance power.</p>
                    <p>Question: Why was the government divided into three branches?</p>
                    <p>Step 1: Identify purpose: Balance power.</p>
                    <p>Step 2: Explain: Separation prevents any branch from dominating.</p>
                    <p>Solution: The government was divided into three branches to balance power.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 1787, delegates in Philadelphia drafted the U.S. Constitution, creating a federal system with checks and balances. This system ensured no single branch—legislative, executive, or judicial—could gain excessive power, safeguarding the new republic from tyranny.",
                question: "What is the purpose of checks and balances?",
                options: [
                    { text: "A) Speed up legislation", correct: false },
                    { text: "B) Prevent power concentration", correct: true },
                    { text: "C) Limit voting rights", correct: false },
                    { text: "D) Increase taxes", correct: false }
                ],
                explanation: "The passage states checks and balances prevent excessive power, making B correct."
            },
            {
                type: "example",
                title: "Example 3: Civil War",
                content: `
                    <h2>Example 3: Civil War</h2>
                    <p>Passage: The Civil War (1861–1865) was fought between the Union and the Confederacy, largely over slavery. The Union’s victory preserved the nation and led to the abolition of slavery.</p>
                    <p>Question: What was a primary cause of the Civil War?</p>
                    <p>Step 1: Identify cause: Disagreement over slavery.</p>
                    <p>Step 2: Confirm: This divided the Union and Confederacy.</p>
                    <p>Solution: A primary cause was disagreement over slavery.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "By 1861, tensions between Northern and Southern states reached a breaking point, sparking the Civil War. The Confederacy defended states’ rights to maintain slavery, while the Union sought to preserve the nation and limit slavery’s expansion, making it a central issue of the conflict.",
                question: "What was a key issue of the war?",
                options: [
                    { text: "A) Trade tariffs", correct: false },
                    { text: "B) Immigration", correct: false },
                    { text: "C) Slavery", correct: true },
                    { text: "D) Foreign alliances", correct: false }
                ],
                explanation: "The passage identifies slavery as a key issue, making C correct."
            },
            {
                type: "example",
                title: "Example 4: Industrialization",
                content: `
                    <h2>Example 4: Industrialization</h2>
                    <p>Passage: In the late 19th century, industrialization transformed the U.S. economy. Factories grew, and innovations like the steam engine increased production, but workers faced poor conditions.</p>
                    <p>Question: What was one effect of industrialization?</p>
                    <p>Step 1: Identify effect: Growth of factories and increased production.</p>
                    <p>Step 2: Confirm: Innovations drove economic changes.</p>
                    <p>Solution: One effect was the growth of factories and increased production.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In the late 1800s, the U.S. underwent rapid industrialization, particularly in cities like Chicago and New York. While factories and innovations like the steam engine boosted production, workers faced challenges such as low wages and unsafe conditions, prompting labor movements to demand reforms.",
                question: "What was a challenge of industrialization?",
                options: [
                    { text: "A) Reduced production", correct: false },
                    { text: "B) Low wages", correct: true },
                    { text: "C) Fewer factories", correct: false },
                    { text: "D) Rural expansion", correct: false }
                ],
                explanation: "The passage mentions low wages as a labor challenge, making B correct."
            },
            {
                type: "example",
                title: "Example 5: Civil Rights Movement",
                content: `
                    <h2>Example 5: Civil Rights Movement</h2>
                    <p>Passage: The Civil Rights Movement (1950s–1960s) fought racial segregation. Leaders like Martin Luther King Jr. advocated nonviolent protest, leading to the Civil Rights Act of 1964.</p>
                    <p>Question: What was a key goal of the Civil Rights Movement?</p>
                    <p>Step 1: Identify goal: End racial segregation.</p>
                    <p>Step 2: Confirm: This drove protests and legislation.</p>
                    <p>Solution: A key goal was to end racial segregation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In the 1950s and 1960s, the Civil Rights Movement gained momentum across the U.S., particularly in Southern states. Activists, led by figures like Martin Luther King Jr., sought equal rights for African Americans, resulting in landmark legislation like the Voting Rights Act of 1965 to address systemic discrimination.",
                question: "What was a goal of the movement?",
                options: [
                    { text: "A) Economic expansion", correct: false },
                    { text: "B) Military reform", correct: false },
                    { text: "C) Equal rights", correct: true },
                    { text: "D) Foreign policy change", correct: false }
                ],
                explanation: "The passage highlights equal rights as a goal, making C correct."
            },
            {
                type: "example",
                title: "Example 6: Great Depression",
                content: `
                    <h2>Example 6: Great Depression</h2>
                    <p>Passage: The Great Depression (1929–1939) was triggered by the stock market crash. Unemployment soared, and President Roosevelt’s New Deal programs aimed to provide relief and recovery.</p>
                    <p>Question: What was the purpose of the New Deal?</p>
                    <p>Step 1: Identify purpose: Provide relief and recovery.</p>
                    <p>Step 2: Confirm: Programs addressed economic hardship.</p>
                    <p>Solution: The New Deal aimed to provide relief and recovery.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Following the 1929 stock market crash, the Great Depression devastated the U.S. economy, leading to mass unemployment. President Franklin Roosevelt introduced the New Deal, which included public works projects to create jobs and stimulate economic recovery during the 1930s.",
                question: "What was a goal of these New Deal projects?",
                options: [
                    { text: "A) Increase taxes", correct: false },
                    { text: "B) Reduce unemployment", correct: true },
                    { text: "C) Expand trade", correct: false },
                    { text: "D) Limit immigration", correct: false }
                ],
                explanation: "The passage states public works projects aimed to reduce unemployment, making B correct."
            },
            {
                type: "example",
                title: "Example 7: Women’s Suffrage",
                content: `
                    <h2>Example 7: Women’s Suffrage</h2>
                    <p>Passage: The women’s suffrage movement culminated in the 19th Amendment (1920), granting women the right to vote. Activists like Susan B. Anthony led decades of advocacy.</p>
                    <p>Question: What did the 19th Amendment achieve?</p>
                    <p>Step 1: Identify achievement: Granted women the right to vote.</p>
                    <p>Step 2: Confirm: This was the movement’s key outcome.</p>
                    <p>Solution: The 19th Amendment granted women the right to vote.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 1920, after decades of activism by leaders like Susan B. Anthony, the women’s suffrage movement achieved a major victory with the ratification of the 19th Amendment. This amendment expanded democratic participation by allowing women to engage in the electoral process nationwide.",
                question: "What right did the 19th Amendment grant?",
                options: [
                    { text: "A) Property ownership", correct: false },
                    { text: "B) Education access", correct: false },
                    { text: "C) Employment equality", correct: false },
                    { text: "D) Voting", correct: true }
                ],
                explanation: "The passage states the 19th Amendment granted voting rights, making D correct."
            }
        ]
    }
};

// U.S. history question array
const usHistoryQuestions = [
    {
        passage: "In 1791, the newly formed United States faced debates over individual freedoms versus government authority. The Bill of Rights, comprising the first ten amendments to the Constitution, was ratified to protect liberties such as freedom of speech, religion, and the press, ensuring citizens’ rights against federal overreach.",
        question: "What is the purpose of the Bill of Rights?",
        answers: [
            { text: "A) Protect individual liberties", correct: true },
            { text: "B) Establish trade policies", correct: false },
            { text: "C) Create a national army", correct: false },
            { text: "D) Regulate taxation", correct: false }
        ],
        explanation: "The passage states the Bill of Rights protects individual liberties, making A correct.",
        difficulty: "easy",
        category: "ged-us-history"
    },
    {
        passage: "In 1777, during the American Revolution, the Battle of Saratoga proved to be a critical moment for the American colonies. The colonial victory convinced France to form an alliance with the Americans, providing military and financial support that bolstered their fight against British forces.",
        question: "Why was the Battle of Saratoga significant?",
        answers: [
            { text: "A) It ended the war with a British surrender", correct: false },
            { text: "B) It secured French support for the American cause", correct: true },
            { text: "C) It established the U.S. Constitution", correct: false },
            { text: "D) It abolished colonial taxation", correct: false }
        ],
        explanation: "The passage states the Battle of Saratoga convinced France to ally with the colonies, making B correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        passage: "After the Civil War ended in 1865, the Reconstruction era (1865–1877) sought to rebuild the South and integrate millions of freed slaves into American society. However, Southern states resisted these efforts, enacting discriminatory laws like Black Codes to limit African American rights and maintain racial hierarchies.",
        question: "What was a major challenge of Reconstruction?",
        answers: [
            { text: "A) Rapid industrial growth", correct: false },
            { text: "B) Expansion of women’s suffrage", correct: false },
            { text: "C) Southern resistance to integration", correct: true },
            { text: "D) Decline in agricultural production", correct: false }
        ],
        explanation: "The passage highlights Southern resistance as a Reconstruction challenge, making C correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        passage: "In the late 19th and early 20th centuries, the Progressive Era addressed social and economic issues stemming from rapid industrialization. Reformers pushed for changes, including child labor laws and antitrust measures to break up monopolies, aiming to improve working conditions and promote fair competition.",
        question: "What was a key reform of the Progressive Era?",
        answers: [
            { text: "A) Expansion of slavery", correct: false },
            { text: "B) Reduction of federal power", correct: false },
            { text: "C) Antitrust measures against monopolies", correct: true },
            { text: "D) Promotion of urbanization", correct: false }
        ],
        explanation: "The passage notes antitrust measures as a Progressive Era reform, making C correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        passage: "In 1955, Rosa Parks’s arrest for refusing to give up her bus seat in Montgomery, Alabama, sparked the Montgomery Bus Boycott, a defining moment in the Civil Rights Movement. The boycott, led by activists, pressured the city to desegregate public buses, advancing the fight against racial discrimination.",
        question: "What was the impact of the Montgomery Bus Boycott?",
        answers: [
            { text: "A) It increased segregation laws", correct: false },
            { text: "B) It led to bus desegregation", correct: true },
            { text: "C) It expanded voting rights", correct: false },
            { text: "D) It reformed labor unions", correct: false }
        ],
        explanation: "The passage states the boycott led to bus desegregation, making B correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        passage: "The Great Depression, beginning with the 1929 stock market crash, caused widespread bank failures across the United States. In response, Congress established the Federal Deposit Insurance Corporation (FDIC) in 1933 to restore public confidence by insuring bank deposits against future losses.",
        question: "What was the purpose of the FDIC?",
        answers: [
            { text: "A) To regulate international trade", correct: false },
            { text: "B) To protect bank deposits", correct: true },
            { text: "C) To fund public works projects", correct: false },
            { text: "D) To promote stock market growth", correct: false }
        ],
        explanation: "The passage explains the FDIC was created to protect bank deposits, making B correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        passage: "Following the Union’s victory in the Civil War, the 13th Amendment was ratified in 1865, fundamentally altering the social fabric of the United States. By abolishing slavery, it addressed one of the war’s central issues, marking a significant step toward equality for African Americans.",
        question: "What did the 13th Amendment achieve?",
        answers: [
            { text: "A) Granted women’s suffrage", correct: false },
            { text: "B) Established equal protection", correct: false },
            { text: "C) Ended prohibition", correct: false },
            { text: "D) Abolished slavery", correct: true }
        ],
        explanation: "The passage states the 13th Amendment abolished slavery, making D correct.",
        difficulty: "medium",
        category: "ged-us-history"
    }
];

// Variables
let categoryStats = {
    "ged-us-history": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-us-history"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-us-history"].incorrect++;
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
        case 1: return usHistoryQuestions;
        default: return usHistoryQuestions;
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
    let totalCorrect = categoryStats["ged-us-history"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-us-history"].incorrect;

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
    localStorage.setItem(`ged-us-history-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-us-history-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-us-history-lessonScore-${lessonId}`) || "Not completed yet";
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