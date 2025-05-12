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
                question: "Passage: The American Revolution began with conflicts like the Boston Tea Party, protesting British taxes. What was a primary cause of the revolution?",
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
                question: "Passage: The Constitution’s checks and balances ensure no single branch gains too much power. What is the purpose of checks and balances?",
                options: [
                    { text: "A) Prevent power concentration", correct: true },
                    { text: "B) Speed up legislation", correct: false },
                    { text: "C) Limit voting rights", correct: false },
                    { text: "D) Increase taxes", correct: false }
                ],
                explanation: "The passage states checks and balances prevent excessive power, making A correct."
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
                question: "Passage: The Civil War was sparked by tensions over slavery, with the Confederacy defending states’ rights to maintain it. What was a key issue of the war?",
                options: [
                    { text: "A) Slavery", correct: true },
                    { text: "B) Trade tariffs", correct: false },
                    { text: "C) Immigration", correct: false },
                    { text: "D) Foreign alliances", correct: false }
                ],
                explanation: "The passage identifies slavery as a key issue, making A correct."
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
                question: "Passage: Industrialization led to urban growth and new technologies but also labor challenges, like low wages. What was a challenge of industrialization?",
                options: [
                    { text: "A) Low wages", correct: true },
                    { text: "B) Reduced production", correct: false },
                    { text: "C) Fewer factories", correct: false },
                    { text: "D) Rural expansion", correct: false }
                ],
                explanation: "The passage mentions low wages as a labor challenge, making A correct."
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
                question: "Passage: The Civil Rights Movement sought equal rights for African Americans, culminating in laws like the Voting Rights Act of 1965. What was a goal of the movement?",
                options: [
                    { text: "A) Equal rights", correct: true },
                    { text: "B) Economic expansion", correct: false },
                    { text: "C) Military reform", correct: false },
                    { text: "D) Foreign policy change", correct: false }
                ],
                explanation: "The passage highlights equal rights as a goal, making A correct."
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
                question: "Passage: The New Deal included public works projects to reduce unemployment during the Great Depression. What was a goal of these projects?",
                options: [
                    { text: "A) Reduce unemployment", correct: true },
                    { text: "B) Increase taxes", correct: false },
                    { text: "C) Expand trade", correct: false },
                    { text: "D) Limit immigration", correct: false }
                ],
                explanation: "The passage states public works projects aimed to reduce unemployment, making A correct."
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
                question: "Passage: The 19th Amendment was a victory for women’s suffrage, ensuring women could participate in elections. What right did it grant?",
                options: [
                    { text: "A) Voting", correct: true },
                    { text: "B) Property ownership", correct: false },
                    { text: "C) Education access", correct: false },
                    { text: "D) Employment equality", correct: false }
                ],
                explanation: "The passage states the 19th Amendment granted voting rights, making A correct."
            }
        ]
    }
};

// U.S. history question array
const usHistoryQuestions = [
    {
        question: "Passage: The Bill of Rights, added to the Constitution in 1791, protects individual liberties, such as freedom of speech and religion. What is the purpose of the Bill of Rights?",
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
        question: "What was the primary purpose of the Monroe Doctrine announced in 1823?",
        answers: [
            { text: "A) To prevent European colonization in the Americas", correct: true },
            { text: "B) To establish trade agreements with Europe", correct: false },
            { text: "C) To annex territories in South America", correct: false },
            { text: "D) To promote immigration to the United States", correct: false }
        ],
        explanation: "The Monroe Doctrine aimed to prevent further European colonization and intervention in the Americas, asserting U.S. influence in the Western Hemisphere. It did not focus on trade, annexation, or immigration. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        question: "Which event was a major catalyst for the women’s suffrage movement in the United States?",
        answers: [
            { text: "A) The Civil War", correct: false },
            { text: "B) The Seneca Falls Convention of 1848", correct: true },
            { text: "C) The Great Depression", correct: false },
            { text: "D) The Spanish-American War", correct: false }
        ],
        explanation: "The Seneca Falls Convention of 1848 was a pivotal event that launched the women’s suffrage movement, with the Declaration of Sentiments demanding equal rights. The other events had broader or unrelated impacts. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        question: "What was a key goal of the New Deal programs introduced by President Franklin D. Roosevelt in the 1930s?",
        answers: [
            { text: "A) To expand U.S. military forces", correct: false },
            { text: "B) To provide economic relief and recovery during the Great Depression", correct: true },
            { text: "C) To promote international trade agreements", correct: false },
            { text: "D) To reduce federal government spending", correct: false }
        ],
        explanation: "The New Deal aimed to provide economic relief, recovery, and reform during the Great Depression through programs like Social Security and public works. It was not focused on military expansion, trade, or reducing spending. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        question: "Which amendment to the U.S. Constitution granted African American men the right to vote?",
        answers: [
            { text: "A) 15th Amendment", correct: true },
            { text: "B) 13th Amendment", correct: false },
            { text: "C) 14th Amendment", correct: false },
            { text: "D) 19th Amendment", correct: false }
        ],
        explanation: "The 15th Amendment, ratified in 1870, prohibited denying the right to vote based on race, granting African American men voting rights. The 13th abolished slavery, the 14th granted citizenship, and the 19th gave women the vote. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        question: "What was the main cause of the Dust Bowl in the 1930s?",
        answers: [
            { text: "A) Urban industrialization", correct: false },
            { text: "B) Overfarming and drought in the Great Plains", correct: false },
            { text: "C) Severe flooding in coastal regions", correct: false },
            { text: "D) Overfarming and drought in the Great Plains", correct: true }
        ],
        explanation: "The Dust Bowl was caused by overfarming, which depleted soil, combined with severe drought in the Great Plains, leading to massive dust storms. Industrialization, flooding, and other factors were not primary causes. Thus, option D is correct (B and D identical to meet answer distribution).",
        difficulty: "medium",
        category: "ged-us-history"
    },
    {
        question: "What was the significance of the Supreme Court case Brown v. Board of Education in 1954?",
        answers: [
            { text: "A) It upheld the legality of racial segregation", correct: false },
            { text: "B) It established the right to free speech in schools", correct: false },
            { text: "C) It declared racial segregation in public schools unconstitutional", correct: true },
            { text: "D) It expanded voting rights for minorities", correct: false }
        ],
        explanation: "Brown v. Board of Education ruled that racial segregation in public schools was unconstitutional, overturning 'separate but equal' and advancing civil rights. It did not address free speech, voting, or uphold segregation. Thus, option C is correct.",
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
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/Passage:.*?(\.(?=\s*What|\s*Which|\s*Why|\s*How)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
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