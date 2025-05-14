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
        title: "Reading and Analyzing Historical Documents",
        content: [
            {
                type: "example",
                title: "Example 1: Identifying Main Idea",
                content: `
                    <h2>Example 1: Identifying Main Idea</h2>
                    <p>Passage: In the Declaration of Independence (1776), Thomas Jefferson wrote, "All men are created equal," asserting the colonies’ right to self-governance due to British violations of natural rights.</p>
                    <p>Question: What is the main idea of this passage?</p>
                    <p>Step 1: Identify key assertion: Colonies’ right to self-governance.</p>
                    <p>Step 2: Confirm: This is justified by equality and British violations.</p>
                    <p>Solution: The main idea is the colonies’ right to self-governance due to British violations.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 1863, during the Civil War, Abraham Lincoln delivered the Gettysburg Address, emphasizing the preservation of the Union and the principle of equality. He stated that government should be 'of the people, by the people, for the people,' underscoring democratic ideals amidst national division.",
                question: "What is the main idea of the Gettysburg Address according to the passage?",
                options: [
                    { text: "A) Preserving the Union and equality", correct: true },
                    { text: "B) Ending all wars", correct: false },
                    { text: "C) Expanding territories", correct: false },
                    { text: "D) Limiting government power", correct: false }
                ],
                explanation: "The passage highlights Lincoln’s focus on preserving the Union and equality, making A correct."
            },
            {
                type: "example",
                title: "Example 2: Historical Context",
                content: `
                    <h2>Example 2: Historical Context</h2>
                    <p>Passage: The Federalist Papers (1787–1788), written by Hamilton, Madison, and Jay, defended the proposed U.S. Constitution during debates over its ratification.</p>
                    <p>Question: What was the historical context of the Federalist Papers?</p>
                    <p>Step 1: Identify context: Debates over Constitution ratification.</p>
                    <p>Step 2: Confirm: The papers were written to support ratification.</p>
                    <p>Solution: The historical context was debates over the ratification of the U.S. Constitution.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 1848, the Seneca Falls Convention in New York produced the Declaration of Sentiments, demanding women’s rights, including suffrage. Written during an era of limited gender equality, it challenged societal norms and sparked the women’s rights movement.",
                question: "What was the historical context of the Seneca Falls Declaration?",
                options: [
                    { text: "A) Civil War debates", correct: false },
                    { text: "B) Fight for women’s rights", correct: true },
                    { text: "C) Industrial expansion", correct: false },
                    { text: "D) Colonial independence", correct: false }
                ],
                explanation: "The passage describes the demand for women’s rights in an era of gender inequality, making B correct."
            },
            {
                type: "example",
                title: "Example 3: Author’s Purpose",
                content: `
                    <h2>Example 3: Author’s Purpose</h2>
                    <p>Passage: In a 1963 speech, Martin Luther King Jr. said, 'I have a dream,' urging racial equality and an end to segregation in America.</p>
                    <p>Question: What was the author’s purpose?</p>
                    <p>Step 1: Identify goal: Urging racial equality and ending segregation.</p>
                    <p>Step 2: Confirm: The speech aimed to inspire change.</p>
                    <p>Solution: The author’s purpose was to urge racial equality and end segregation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 1776, Thomas Paine published 'Common Sense,' a pamphlet that passionately argued for American independence from British rule. Written to galvanize colonists, it criticized monarchy and rallied support for a free and self-governing nation.",
                question: "What was Thomas Paine’s purpose in 'Common Sense'?",
                options: [
                    { text: "A) Defend British rule", correct: false },
                    { text: "B) Inspire independence", correct: true },
                    { text: "C) Promote trade", correct: false },
                    { text: "D) Establish laws", correct: false }
                ],
                explanation: "The passage states Paine argued for independence to rally colonists, making B correct."
            },
            {
                type: "example",
                title: "Example 4: Identifying Bias",
                content: `
                    <h2>Example 4: Identifying Bias</h2>
                    <p>Passage: A 1850s pro-slavery editorial claims, 'Slavery benefits both master and slave, providing economic stability.' This reflects the author’s support for slavery.</p>
                    <p>Question: What bias is present in the passage?</p>
                    <p>Step 1: Identify perspective: The author supports slavery.</p>
                    <p>Step 2: Confirm: Claiming mutual benefits shows pro-slavery bias.</p>
                    <p>Solution: The bias is pro-slavery, favoring its continuation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In the 1920s, a pamphlet distributed in New York argued, 'Immigrants threaten American jobs and culture, overburdening our cities and diluting our values.' This rhetoric fueled restrictive immigration laws, reflecting the author’s negative stance on immigration.",
                question: "What bias does the pamphlet reflect?",
                options: [
                    { text: "A) Pro-immigration", correct: false },
                    { text: "B) Neutral", correct: false },
                    { text: "C) Anti-immigration", correct: true },
                    { text: "D) Economic neutrality", correct: false }
                ],
                explanation: "The passage’s negative portrayal of immigrants reflects anti-immigration bias, making C correct."
            },
            {
                type: "example",
                title: "Example 5: Evaluating Arguments",
                content: `
                    <h2>Example 5: Evaluating Arguments</h2>
                    <p>Passage: In a 1919 letter, a labor leader argues, 'Workers deserve fair wages because their labor drives industry profits.' The argument links wages to industry success.</p>
                    <p>Question: What is the main argument?</p>
                    <p>Step 1: Identify argument: Workers deserve fair wages.</p>
                    <p>Step 2: Confirm: This is supported by their role in profits.</p>
                    <p>Solution: The main argument is that workers deserve fair wages because their labor drives profits.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 1873, Susan B. Anthony delivered a speech after her arrest for voting, asserting, 'Women should vote because they are equal citizens under the Constitution.' Her argument connected women’s suffrage to constitutional equality, rallying support for the cause.",
                question: "What is Susan B. Anthony’s main argument in the speech?",
                options: [
                    { text: "A) Women should not vote", correct: false },
                    { text: "B) Women should vote due to equality", correct: true },
                    { text: "C) Voting is unimportant", correct: false },
                    { text: "D) Men are unequal", correct: false }
                ],
                explanation: "The passage states Anthony argued for women’s voting rights based on equality, making B correct."
            },
            {
                type: "example",
                title: "Example 6: Supporting Details",
                content: `
                    <h2>Example 6: Supporting Details</h2>
                    <p>Passage: The Emancipation Proclamation (1863) freed slaves in Confederate states. Lincoln justified it as a war measure to weaken the Confederacy and promote Union victory.</p>
                    <p>Question: What detail supports the Proclamation’s purpose?</p>
                    <p>Step 1: Identify purpose: Weaken the Confederacy.</p>
                    <p>Step 2: Find detail: War measure to promote Union victory.</p>
                    <p>Solution: The detail that it was a war measure supports the Proclamation’s purpose.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 1823, President James Monroe issued the Monroe Doctrine, warning European powers against further colonization in the Americas. This policy aimed to protect U.S. interests by asserting regional dominance and preventing foreign interference in the Western Hemisphere.",
                question: "What detail supports the Monroe Doctrine’s purpose?",
                options: [
                    { text: "A) Promoting colonization", correct: false },
                    { text: "B) Warning European powers", correct: true },
                    { text: "C) Expanding trade", correct: false },
                    { text: "D) Limiting U.S. influence", correct: false }
                ],
                explanation: "The passage states the Doctrine warned European powers to protect U.S. interests, making B correct."
            },
            {
                type: "example",
                title: "Example 7: Comparing Documents",
                content: `
                    <h2>Example 7: Comparing Documents</h2>
                    <p>Passage: The Declaration of Independence (1776) emphasizes individual rights, while the Articles of Confederation (1781) focus on state sovereignty and a weak central government.</p>
                    <p>Question: How do the Declaration and Articles differ?</p>
                    <p>Step 1: Identify focus: Declaration on individual rights, Articles on state sovereignty.</p>
                    <p>Step 2: Confirm: They prioritize different aspects of governance.</p>
                    <p>Solution: The Declaration emphasizes individual rights, while the Articles focus on state sovereignty.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 1788, the U.S. Constitution established a federal government with balanced powers, while the Bill of Rights, added in 1791, focused on protecting individual liberties such as freedom of speech and religion to address concerns about government overreach.",
                question: "How do the Constitution and Bill of Rights differ?",
                options: [
                    { text: "A) Constitution protects liberties, Bill of Rights sets structure", correct: false },
                    { text: "B) Both protect liberties", correct: false },
                    { text: "C) Constitution sets structure, Bill of Rights protects liberties", correct: true },
                    { text: "D) Both set government structure", correct: false }
                ],
                explanation: "The passage states the Constitution establishes government structure and the Bill of Rights protects liberties, making C correct."
            }
        ]
    }
};

// Reading and analyzing historical documents question array
const historicalDocsQuestions = [
    {
        passage: "In January 1941, with World War II escalating, President Franklin D. Roosevelt delivered a speech outlining 'Four Freedoms'—freedom of speech, worship, want, and fear. He proposed these as universal human rights to inspire global support for democracy and counter totalitarian regimes.",
        question: "What was Roosevelt’s purpose in proposing the 'Four Freedoms'?",
        answers: [
            { text: "A) Promote global human rights", correct: true },
            { text: "B) Declare war", correct: false },
            { text: "C) Limit freedoms", correct: false },
            { text: "D) Restrict trade", correct: false }
        ],
        explanation: "The passage states Roosevelt proposed the freedoms to promote human rights globally, making A correct.",
        difficulty: "easy",
        category: "ged-reading-and-analyzing-historical-docs"
    },
    {
        passage: "In 1787, delegates in Philadelphia crafted the Preamble to the U.S. Constitution, stating, 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution.' This introduced a framework for a unified government.",
        question: "What is the main idea of the Preamble according to the passage?",
        answers: [
            { text: "A) Declare independence from foreign powers", correct: false },
            { text: "B) Establish a government that promotes justice and liberty", correct: true },
            { text: "C) Limit the rights of citizens", correct: false },
            { text: "D) Prioritize military defense over welfare", correct: false }
        ],
        explanation: "The passage outlines the Preamble’s purpose to create a government promoting justice, liberty, and welfare, making B correct.",
        difficulty: "medium",
        category: "ged-reading-and-analyzing-historical-docs"
    },
    {
        passage: "In 1850, Frederick Douglass, a former slave and abolitionist, wrote in a letter, 'The arm of the slaveholder is strengthened by the silence of the North,' urging Northerners to actively oppose slavery. This was written during a time of intense national debate over slavery’s expansion.",
        question: "What was Douglass’s purpose in this statement?",
        answers: [
            { text: "A) Praise Northern silence", correct: false },
            { text: "B) Defend slaveholders’ rights", correct: false },
            { text: "C) Encourage Northern opposition to slavery", correct: true },
            { text: "D) Describe Southern agriculture", correct: false }
        ],
        explanation: "The passage states Douglass urged Northerners to oppose slavery, criticizing their silence, making C correct.",
        difficulty: "medium",
        category: "ged-reading-and-analyzing-historical-docs"
    },
    {
        passage: "In the 1830s, editorials supporting President Andrew Jackson’s Indian Removal Act claimed, 'Westward expansion is essential for American prosperity, and Native tribes must relocate to ensure national progress.' These writings influenced the passage of policies like the Trail of Tears.",
        question: "What bias does the editorial reflect?",
        answers: [
            { text: "A) Pro-Native American rights", correct: false },
            { text: "B) Pro-Westward expansion", correct: true },
            { text: "C) Neutral on expansion", correct: false },
            { text: "D) Anti-American prosperity", correct: false }
        ],
        explanation: "The editorial justifies Native relocation for American prosperity, reflecting a pro-westward expansion bias, making B correct.",
        difficulty: "medium",
        category: "ged-reading-and-analyzing-historical-docs"
    },
    {
        passage: "Following the Civil War, the 14th Amendment (1868) was ratified, stating, 'No State shall make or enforce any law which shall abridge the privileges or immunities of citizens of the United States; nor shall any State deprive any person of life, liberty, or property, without due process of law.' This addressed the rights of newly freed slaves.",
        question: "What historical context led to the 14th Amendment?",
        answers: [
            { text: "A) Expansion of voting rights for women", correct: false },
            { text: "B) Protection of freed slaves’ rights after the Civil War", correct: true },
            { text: "C) Establishment of a national currency", correct: false },
            { text: "D) Demand for industrial regulations", correct: false }
        ],
        explanation: "The passage notes the amendment addressed freed slaves’ rights post-Civil War, making B correct.",
        difficulty: "medium",
        category: "ged-reading-and-analyzing-historical-docs"
    },
    {
        passage: "In 1916, as World War I raged in Europe, President Woodrow Wilson delivered a speech arguing, 'The world must be made safe for democracy.' He promoted U.S. involvement to protect democratic ideals, rallying support for entering the war to counter authoritarian threats.",
        question: "What detail supports Wilson’s purpose in the speech?",
        answers: [
            { text: "A) Promoting U.S. involvement to protect democracy", correct: true },
            { text: "B) Describing military strategies", correct: false },
            { text: "C) Criticizing democratic governments", correct: false },
            { text: "D) Discussing economic benefits of war", correct: false }
        ],
        explanation: "The passage states Wilson promoted U.S. involvement to protect democratic ideals, making A correct.",
        difficulty: "medium",
        category: "ged-reading-and-analyzing-historical-docs"
    },
    {
        passage: "The Articles of Confederation (1781) created a loose alliance of states with a weak central government, prioritizing state sovereignty. In contrast, the U.S. Constitution (1787) established a stronger federal system with balanced powers to unify the nation effectively.",
        question: "What is a key difference between the Articles of Confederation and the Constitution?",
        answers: [
            { text: "A) Articles promoted individual rights, Constitution limited them", correct: false },
            { text: "B) Articles had a strong central government, Constitution weakened it", correct: false },
            { text: "C) Articles had a weak central government, Constitution strengthened it", correct: true },
            { text: "D) Both established a strong federal government", correct: false }
        ],
        explanation: "The passage describes the Articles’ weak central government and the Constitution’s stronger federal system, making C correct.",
        difficulty: "medium",
        category: "ged-reading-and-analyzing-historical-docs"
    }
];

// Variables
let categoryStats = {
    "ged-reading-and-analyzing-historical-docs": { correct: 0, incorrect: 0 }
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
        categoryStats["ged-reading-and-analyzing-historical-docs"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-reading-and-analyzing-historical-docs"].incorrect++;
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
        case 1: return historicalDocsQuestions;
        default: return historicalDocsQuestions;
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
    let totalCorrect = categoryStats["ged-reading-and-analyzing-historical-docs"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-reading-and-analyzing-historical-docs"].incorrect;

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
    localStorage.setItem(`ged-reading-and-analyzing-historical-docs-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-reading-and-analyzing-historical-docs-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-reading-and-analyzing-historical-docs-lessonScore-${lessonId}`) || "Not completed yet";
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