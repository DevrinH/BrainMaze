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
        title: "Choosing the Best Sentence for Clarity and Impact",
        examples: [
            {
                title: "Example: Clarity in Sentence Choice",
                content: `
                    <h2>Example: Clarity in Sentence Choice</h2>
                    <p>Context: Explaining a recycling benefit.</p>
                    <p>A) 'Recycling cuts waste.' B) 'Trash goes down with recycling stuff.'</p>
                    <p>Question: Which is clearer?</p>
                    <p>Step 1: Analyze: A is concise, B is vague.</p>
                    <p>Step 2: Choose: A is direct and clear.</p>
                    <p>Best: 'Recycling cuts waste.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
        ],
            questions: [
                {
                    title: "Question 1",
                    question: "Context: Describing a study’s result. A) 'Data shows improvement.' B) 'Some numbers got better.' Which is clearer?",
                    options: [
                        { text: "A) Data shows improvement", correct: true },
                        { text: "B) Some numbers got better", correct: false },
                        { text: "C) Both are equal", correct: false },
                        { text: "D) Neither is clear", correct: false }
                    ],
                    explanation: "A is straightforward, while B is vague and informal."
                },
            ],


        questions: [
            {
                title: "Question 1",
                question: "Context: Describing a study’s result. A) 'Data shows improvement.' B) 'Some numbers got better.' Which is clearer?",
                options: [
                    { text: "A) Data shows improvement", correct: true },
                    { text: "B) Some numbers got better", correct: false },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither is clear", correct: false }
                ],
                explanation: "A is straightforward, while B is vague and informal."
            },
            {
                title: "Question 2",
                question: "Context: Motivating a team. A) 'We can win.' B) 'Victory is ours if we fight!' Which has more impact?",
                options: [
                    { text: "A) We can win", correct: false },
                    { text: "B) Victory is ours if we fight!", correct: true },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither has impact", correct: false }
                ],
                explanation: "B inspires with strong, vivid language."
            }
        ],
        additionalExample: {
            title: "Example: Balancing Clarity and Impact",
            content: `
                <h2>Example: Balancing Clarity and Impact</h2>
                <p>Context: Warning about pollution.</p>
                <p>A) 'Pollution is bad.' B) 'Pollution chokes our planet daily.'</p>
                <p>Question: Which is better?</p>
                <p>Step 1: Analyze: A is simple, B is vivid.</p>
                <p>Step 2: Choose: B is clear and striking.</p>
                <p>Best: 'Pollution chokes our planet daily.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Connecting Ideas Logically",
        examples: [
            {
                title: "Example: Cause and Effect Link",
                content: `
                    <h2>Example: Cause and Effect Link</h2>
                    <p>Sentences: 'Rain fell heavily. Streets flooded.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Rain caused flooding.</p>
                    <p>Step 2: Connect: Use 'thus' for effect.</p>
                    <p>Revised: 'Rain fell heavily, thus streets flooded.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Contrast Link",
                content: `
                    <h2>Example: Contrast Link</h2>
                    <p>Sentences: 'She practiced a lot. She didn’t win.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Effort vs. outcome.</p>
                    <p>Step 2: Connect: Use 'yet' for contrast.</p>
                    <p>Revised: 'She practiced a lot, yet she didn’t win.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Sentences: 'He studied hard. He passed.' How to connect logically?",
                options: [
                    { text: "A) He studied hard, so he passed", correct: true },
                    { text: "B) He studied hard, but he passed", correct: false },
                    { text: "C) He studied hard, or he passed", correct: false },
                    { text: "D) He studied hard, for he passed", correct: false }
                ],
                explanation: "'So' shows studying caused passing."
            },
            {
                title: "Question 2",
                question: "Sentences: 'The plan was simple. It failed.' How to connect logically?",
                options: [
                    { text: "A) The plan was simple, yet it failed", correct: true },
                    { text: "B) The plan was simple, so it failed", correct: false },
                    { text: "C) The plan was simple, and it failed", correct: false },
                    { text: "D) The plan was simple, because it failed", correct: false }
                ],
                explanation: "'Yet' highlights the unexpected failure."
            }
        ],
        additionalExample: {
            title: "Example: Addition Link",
            content: `
                <h2>Example: Addition Link</h2>
                <p>Sentences: 'The team worked late. They met the deadline.'</p>
                <p>Question: How to connect logically?</p>
                <p>Step 1: Identify: Extra effort aided success.</p>
                <p>Step 2: Connect: Use 'and' for addition.</p>
                <p>Revised: 'The team worked late, and they met the deadline.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Integrating Evidence and Supporting Details",
        examples: [
            {
                title: "Example: Adding Evidence",
                content: `
                    <h2>Example: Adding Evidence</h2>
                    <p>Claim: 'Exercise improves health.'</p>
                    <p>Evidence: 'Studies show lower heart disease rates.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Evidence supports claim.</p>
                    <p>Step 2: Integrate: Combine smoothly.</p>
                    <p>Revised: 'Exercise improves health, as studies show lower heart disease rates.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Adding Detail",
                content: `
                    <h2>Example: Adding Detail</h2>
                    <p>Claim: 'The policy saved money.'</p>
                    <p>Detail: 'It cut costs by 20%.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Detail explains savings.</p>
                    <p>Step 2: Integrate: Use specific example.</p>
                    <p>Revised: 'The policy saved money, cutting costs by 20%.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Claim: 'Reading boosts learning.' Evidence: 'Test scores rose 15%.' How to integrate?",
                options: [
                    { text: "A) Reading boosts learning, with test scores rising 15%", correct: true },
                    { text: "B) Reading boosts learning, but test scores rose 15%", correct: false },
                    { text: "C) Reading boosts learning, or test scores rose 15%", correct: false },
                    { text: "D) Reading boosts learning, test scores rose 15%", correct: false }
                ],
                explanation: "A smoothly ties the evidence to the claim."
            },
            {
                title: "Question 2",
                question: "Claim: 'The event was popular.' Detail: 'Over 500 attended.' How to integrate?",
                options: [
                    { text: "A) The event was popular, drawing over 500 attendees", correct: true },
                    { text: "B) The event was popular, yet over 500 attended", correct: false },
                    { text: "C) The event was popular, so over 500 attended", correct: false },
                    { text: "D) The event was popular, over 500 attended", correct: false }
                ],
                explanation: "A integrates the detail naturally with 'drawing'."
            }
        ],
        additionalExample: {
            title: "Example: Evidence and Detail",
            content: `
                <h2>Example: Evidence and Detail</h2>
                <p>Claim: 'Tech aids education.'</p>
                <p>Evidence: 'Studies prove better scores.' Detail: 'Math improved most.'</p>
                <p>Question: How to integrate?</p>
                <p>Step 1: Link: Evidence and detail support claim.</p>
                <p>Step 2: Integrate: Combine for flow.</p>
                <p>Revised: 'Tech aids education, as studies prove better scores, especially in math.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Maintaining the Author’s Purpose and Tone",
        examples: [
            {
                title: "Example: Persuasive Purpose",
                content: `
                    <h2>Example: Persuasive Purpose</h2>
                    <p>Context: Urging recycling (persuasive, urgent tone).</p>
                    <p>A) 'We must recycle now!' B) 'Recycling is an option.'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Persuasive needs urgency.</p>
                    <p>Step 2: Match: A is forceful, B is casual.</p>
                    <p>Best: 'We must recycle now!'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Informative Purpose",
                content: `
                    <h2>Example: Informative Purpose</h2>
                    <p>Context: Explaining weather (informative, neutral tone).</p>
                    <p>A) 'Rain falls often here.' B) 'Rain is super annoying!'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Informative needs facts, neutrality.</p>
                    <p>Step 2: Match: A is factual, B is opinionated.</p>
                    <p>Best: 'Rain falls often here.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Context: Convincing action (persuasive, serious tone). A) 'Act fast to save lives!' B) 'Maybe we should act.' Which fits?",
                options: [
                    { text: "A) Act fast to save lives!", correct: true },
                    { text: "B) Maybe we should act", correct: false },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "A matches the urgent, persuasive intent."
            },
            {
                title: "Question 2",
                question: "Context: Describing history (informative, neutral tone). A) 'Wars shaped the era.' B) 'Wars were totally wild!' Which fits?",
                options: [
                    { text: "A) Wars shaped the era", correct: true },
                    { text: "B) Wars were totally wild!", correct: false },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "A keeps the neutral, factual tone."
            }
        ],
        additionalExample: {
            title: "Example: Entertaining Purpose",
            content: `
                <h2>Example: Entertaining Purpose</h2>
                <p>Context: Storytelling (entertaining, playful tone).</p>
                <p>A) 'The cat napped.' B) 'The cat snoozed like a champ!'</p>
                <p>Question: Which fits the purpose and tone?</p>
                <p>Step 1: Check: Entertaining needs fun.</p>
                <p>Step 2: Match: B is lively, A is bland.</p>
                <p>Best: 'The cat snoozed like a champ!'</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    5: {
        title: "Strengthening Arguments and Explanations",
        examples: [
            {
                title: "Example: Adding Specificity",
                content: `
                    <h2>Example: Adding Specificity</h2>
                    <p>Argument: 'Education helps people.'</p>
                    <p>Weak: 'It’s good.' Strong: 'It raises incomes by 10%.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak is vague, strong is precise.</p>
                    <p>Step 2: Choose: Specific data bolsters.</p>
                    <p>Best: 'Education helps people, raising incomes by 10%.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Adding Reasoning",
                content: `
                    <h2>Example: Adding Reasoning</h2>
                    <p>Explanation: 'Trees reduce pollution.'</p>
                    <p>Weak: 'They just do.' Strong: 'They filter air particles.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak lacks why, strong explains.</p>
                    <p>Step 2: Choose: Reasoning adds depth.</p>
                    <p>Best: 'Trees reduce pollution by filtering air particles.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Argument: 'Exercise is beneficial.' A) 'It’s nice.' B) 'It cuts stress 30%.' Which strengthens it?",
                options: [
                    { text: "A) It’s nice", correct: false },
                    { text: "B) It cuts stress 30%", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B adds concrete evidence for strength."
            },
            {
                title: "Question 2",
                question: "Explanation: 'Sleep aids focus.' A) 'It’s true.' B) 'It restores brain function.' Which strengthens it?",
                options: [
                    { text: "A) It’s true", correct: false },
                    { text: "B) It restores brain function", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B provides a clear reason, enhancing the claim."
            }
        ],
        additionalExample: {
            title: "Example: Combining Evidence and Reason",
            content: `
                <h2>Example: Combining Evidence and Reason</h2>
                <p>Argument: 'Parks improve cities.'</p>
                <p>Weak: 'They’re cool.' Strong: 'They boost happiness, per surveys.'</p>
                <p>Question: Which strengthens it?</p>
                <p>Step 1: Analyze: Weak is vague, strong has proof.</p>
                <p>Step 2: Choose: Evidence and reason win.</p>
                <p>Best: 'Parks improve cities, boosting happiness, per surveys.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Rhetorical Synthesis question arrays
const clarityImpactQuestions = [
    {
        question: "Context: Warning about floods. A) 'Floods are risky.' B) 'Floods devastate homes fast!' Which is better?",
        answers: [
            { text: "A) Floods are risky", correct: false },
            { text: "B) Floods devastate homes fast!", correct: true },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is good", correct: false }
        ],
        explanation: "B is clear and impactful with vivid language.",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    }
];

const logicalConnectionsQuestions = [
    {
        question: "Sentences: 'She trained hard. She won gold.' How to connect logically?",
        answers: [
            { text: "A) She trained hard, thus she won gold", correct: true },
            { text: "B) She trained hard, yet she won gold", correct: false },
            { text: "C) She trained hard, or she won gold", correct: false },
            { text: "D) She trained hard, gold was won", correct: false }
        ],
        explanation: "'Thus' links training to winning as cause-effect.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

const evidenceIntegrationQuestions = [
    {
        question: "Claim: 'Music aids study.' Evidence: 'Scores rose 10%.' How to integrate?",
        answers: [
            { text: "A) Music aids study, with scores rising 10%", correct: true },
            { text: "B) Music aids study, but scores rose 10%", correct: false },
            { text: "C) Music aids study, scores rose 10%", correct: false },
            { text: "D) Music aids study, or scores rose 10%", correct: false }
        ],
        explanation: "A smoothly integrates evidence with the claim.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

const purposeToneQuestions = [
    {
        question: "Context: Persuading for change (urgent tone). A) 'We need change now!' B) 'Change might help.' Which fits?",
        answers: [
            { text: "A) We need change now!", correct: true },
            { text: "B) Change might help", correct: false },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "A aligns with the urgent, persuasive purpose.",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    }
];

const strengtheningArgumentsQuestions = [
    {
        question: "Argument: 'Diet improves health.' A) 'It’s good.' B) 'It lowers cholesterol 15%.' Which strengthens it?",
        answers: [
            { text: "A) It’s good", correct: false },
            { text: "B) It lowers cholesterol 15%", correct: true },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "B adds specific evidence, making it stronger.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

// lesson-rhetorical-synthesis.js

let categoryStats = {
    "rhetorical-synthesis": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;

function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        showExample();
    } else {
        console.error("Start lesson button not found!");
    }
}

function showExample() {
    console.log("Showing example for lesson:", currentLesson);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons && lessons[currentLesson] && lessons[currentLesson].examples[0]) {
        lessonContent.innerHTML = lessons[currentLesson].examples[0].content;
        const nextExampleBtn = document.getElementById('next-example');
        if (nextExampleBtn) {
            nextExampleBtn.addEventListener('click', showNextExample);
        } else {
            console.error("Next example button not found!");
        }
    } else {
        console.error("Lesson content or lessons data missing!");
    }
}

function showNextExample() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].examples[1].content;
    document.getElementById('next-question').addEventListener('click', askQuestion);
}

function askQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLesson].questions[0];
    lessonContent.innerHTML = `
        <h2>${question.title}</h2>
        <p>${question.question}</p>
        ${question.options.map((option, index) => `
            <input type="radio" id="q1a${index}" name="q1" value="${option.correct}">
            <label for="q1a${index}">${option.text}</label><br>
        `).join('')}
        <button id="submit-answer1">Submit Answer</button>
    `;
    document.getElementById('submit-answer1').addEventListener('click', checkAnswer1);
}

function checkAnswer1() {
    const selectedAnswer = document.querySelector('input[name="q1"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats["rhetorical-synthesis"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["rhetorical-synthesis"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showNextExample3() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].additionalExample.content;
    document.getElementById('next-question').addEventListener('click', askNextQuestion);
}

function askNextQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLesson].questions[1];
    lessonContent.innerHTML = `
        <h2>${question.title}</h2>
        <p>${question.question}</p>
        ${question.options.map((option, index) => `
            <input type="radio" id="q2a${index}" name="q2" value="${option.correct}">
            <label for="q2a${index}">${option.text}</label><br>
        `).join('')}
        <button id="submit-answer2">Submit Answer</button>
    `;
    document.getElementById('submit-answer2').addEventListener('click', checkAnswer2);
}

function checkAnswer2() {
    const selectedAnswer = document.querySelector('input[name="q2"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats["rhetorical-synthesis"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["rhetorical-synthesis"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = clarityImpactQuestions; break;
        case 2: quizQuestions = logicalConnectionsQuestions; break;
        case 3: quizQuestions = evidenceIntegrationQuestions; break;
        case 4: quizQuestions = purposeToneQuestions; break;
        case 5: quizQuestions = strengtheningArgumentsQuestions; break;
        default: quizQuestions = clarityImpactQuestions;
    }
    showNextQuizQuestion(quizQuestions);
}

function showNextQuizQuestion(quizQuestions) {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <h2>Question ${currentQuestionIndex + 1}</h2>
            <p>${question.question}</p>
            ${question.answers.map((answer, index) => `
                <input type="radio" id="q${currentQuestionIndex}a${index}" name="q${currentQuestionIndex}" value="${answer.correct}">
                <label for="q${currentQuestionIndex}a${index}">${answer.text}</label><br>
            `).join('')}
            <button id="submit-answer">Submit Answer</button>
        `;
        document.getElementById('submit-answer').addEventListener('click', () => checkQuizAnswer(question, quizQuestions));
    } else {
        showFinalScore();
    }
}

function checkQuizAnswer(question, quizQuestions) {
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats[question.category].correct++;
        } else {
            alert(`Incorrect. ${question.explanation}`);
            categoryStats[question.category].incorrect++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showNextQuizQuestion(quizQuestions);
        } else {
            console.log("Quiz complete, calling showFinalScore");
            showFinalScore();
        }
    } else {
        alert('Please select an answer.');
    }
}

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

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = 0;
    let totalAttempted = 0;

    for (let category in categoryStats) {
        totalCorrect += categoryStats[category].correct;
        totalAttempted += categoryStats[category].correct + categoryStats[category].incorrect;
    }

    logFinalScore(totalCorrect, totalAttempted);

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    console.log("Saving score:", score);
    saveScore(currentLesson, score);

    const finalScoreElement = document.getElementById('final-score');
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = '';
    finalScoreElement.style.display = 'block';
    finalScoreElement.innerHTML = `
        <h2>Final Score</h2>
        <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
        <p>Your score: ${percentage}%</p>
        <button id="continue-button">Continue</button>
    `;

    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    });

    recordTestResults();
}

function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Final stored testResults:", results);
    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

function saveScore(lessonId, score) {
    localStorage.setItem(`rhetorical-synthesis-lessonScore-${lessonId}`, score);
    console.log(`Saved rhetorical-synthesis-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`lessonScore-${lessonId}`) || "Not completed yet";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded, initializing lesson:", currentLesson);
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 1;
    console.log("Set currentLesson to:", currentLesson);

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start lesson button event listener added");
    } else {
        console.error("Start lesson button not found on page load!");
    }
});