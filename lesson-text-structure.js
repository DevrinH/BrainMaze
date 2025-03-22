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
        title: "Identifying the Author’s Purpose",
        examples: [
            {
                title: "Example: Purpose of Persuasion",
                content: `
                    <h2>Example: Purpose of Persuasion</h2>
                    <p>Passage: 'We must act now to save our planet from climate change.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze intent: 'Must act now' urges action.</p>
                    <p>Step 2: Infer: Convincing readers to care and act.</p>
                    <p>Purpose: To persuade.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Purpose of Information",
                content: `
                    <h2>Example: Purpose of Information</h2>
                    <p>Passage: 'The solar system has eight planets orbiting the sun.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Look at content: Factual, neutral statement.</p>
                    <p>Step 2: Infer: Sharing knowledge, not persuading.</p>
                    <p>Purpose: To inform.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'Laughter is the best medicine for stress.' What is the author’s purpose?",
                options: [
                    { text: "A) To persuade", correct: true },
                    { text: "B) To entertain", correct: false },
                    { text: "C) To inform", correct: false },
                    { text: "D) To describe", correct: false }
                ],
                explanation: "'Best medicine' suggests convincing readers of laughter’s value."
            },
            {
                title: "Question 2",
                question: "Passage: 'The battle lasted three days and ended in a truce.' What is the author’s purpose?",
                options: [
                    { text: "A) To inform", correct: true },
                    { text: "B) To persuade", correct: false },
                    { text: "C) To entertain", correct: false },
                    { text: "D) To criticize", correct: false }
                ],
                explanation: "Neutral facts about a battle aim to educate, not convince."
            }
        ],
        additionalExample: {
            title: "Example: Purpose of Entertainment",
            content: `
                <h2>Example: Purpose of Entertainment</h2>
                <p>Passage: 'The dragon swooped down, sparking chaos and giggles.'</p>
                <p>Question: What is the author’s purpose?</p>
                <p>Step 1: Note tone: Playful, imaginative.</p>
                <p>Step 2: Infer: Amusing readers with a fun story.</p>
                <p>Purpose: To entertain.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Recognizing Text Structures",
        examples: [
            {
                title: "Example: Cause and Effect",
                content: `
                    <h2>Example: Cause and Effect</h2>
                    <p>Passage: 'Heavy rain caused flooding in the city.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Identify pattern: Rain (cause), flooding (effect).</p>
                    <p>Step 2: Confirm: Explains why something happened.</p>
                    <p>Structure: Cause and effect.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Compare and Contrast",
                content: `
                    <h2>Example: Compare and Contrast</h2>
                    <p>Passage: 'Cats are independent, while dogs need more attention.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Spot clues: 'While' shows differences.</p>
                    <p>Step 2: Confirm: Highlights similarities and differences.</p>
                    <p>Structure: Compare and contrast.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'First, mix the ingredients; then, bake the cake.' What is the text structure?",
                options: [
                    { text: "A) Sequence", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Problem and solution", correct: false },
                    { text: "D) Description", correct: false }
                ],
                explanation: "'First' and 'then' indicate steps in order, a sequence."
            },
            {
                title: "Question 2",
                question: "Passage: 'The issue was hunger; the solution was food drives.' What is the text structure?",
                options: [
                    { text: "A) Problem and solution", correct: true },
                    { text: "B) Compare and contrast", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Cause and effect", correct: false }
                ],
                explanation: "Identifies a problem (hunger) and its fix (food drives)."
            }
        ],
        additionalExample: {
            title: "Example: Description",
            content: `
                <h2>Example: Description</h2>
                <p>Passage: 'The forest is lush, with tall trees and chirping birds.'</p>
                <p>Question: What is the text structure?</p>
                <p>Step 1: Analyze: Details paint a picture.</p>
                <p>Step 2: Confirm: No sequence or cause, just features.</p>
                <p>Structure: Description.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Understanding How Ideas are Organized",
        examples: [
            {
                title: "Example: Chronological Order",
                content: `
                    <h2>Example: Chronological Order</h2>
                    <p>Passage: 'In 1900, the town was founded; by 1950, it thrived.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Look for time: 1900, then 1950.</p>
                    <p>Step 2: Infer: Events in time order.</p>
                    <p>Organization: Chronological.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Logical Order",
                content: `
                    <h2>Example: Logical Order</h2>
                    <p>Passage: 'Education improves skills, leading to better jobs.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Trace flow: Skills to jobs.</p>
                    <p>Step 2: Infer: Cause to result.</p>
                    <p>Organization: Logical (cause-effect).</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'Poverty increased crime, which strained police.' How are ideas organized?",
                options: [
                    { text: "A) Cause to effect", correct: true },
                    { text: "B) Spatial", correct: false },
                    { text: "C) Chronological", correct: false },
                    { text: "D) Importance", correct: false }
                ],
                explanation: "Poverty causes crime, then strain—logical cause-effect flow."
            },
            {
                title: "Question 2",
                question: "Passage: 'The room’s left wall was blue, the right red.' How are ideas organized?",
                options: [
                    { text: "A) Spatial", correct: true },
                    { text: "B) Chronological", correct: false },
                    { text: "C) Logical", correct: false },
                    { text: "D) Problem-solution", correct: false }
                ],
                explanation: "Describes layout by location (left, right), a spatial order."
            }
        ],
        additionalExample: {
            title: "Example: Order of Importance",
            content: `
                <h2>Example: Order of Importance</h2>
                <p>Passage: 'Safety is key, but cost matters too.'</p>
                <p>Question: How are ideas organized?</p>
                <p>Step 1: Note priority: Safety first, then cost.</p>
                <p>Step 2: Infer: Ranked by significance.</p>
                <p>Organization: Order of importance.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Evaluating Rhetorical Strategies",
        examples: [
            {
                title: "Example: Emotional Appeal",
                content: `
                    <h2>Example: Emotional Appeal</h2>
                    <p>Passage: 'Imagine the despair of homeless children.'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Analyze: 'Despair' and 'imagine' evoke feelings.</p>
                    <p>Step 2: Infer: Appeals to empathy.</p>
                    <p>Strategy: Emotional appeal (pathos).</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Logical Appeal",
                content: `
                    <h2>Example: Logical Appeal</h2>
                    <p>Passage: 'Studies show recycling cuts waste by 30%.'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Note: 'Studies' and '30%' provide evidence.</p>
                    <p>Step 2: Infer: Appeals to reason.</p>
                    <p>Strategy: Logical appeal (logos).</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'Experts agree this plan works.' What rhetorical strategy is used?",
                options: [
                    { text: "A) Credibility (ethos)", correct: true },
                    { text: "B) Emotional appeal (pathos)", correct: false },
                    { text: "C) Logical appeal (logos)", correct: false },
                    { text: "D) Repetition", correct: false }
                ],
                explanation: "'Experts agree' builds trust using authority."
            },
            {
                title: "Question 2",
                question: "Passage: 'Act now, or lose everything!' What rhetorical strategy is used?",
                options: [
                    { text: "A) Emotional appeal (pathos)", correct: true },
                    { text: "B) Logical appeal (logos)", correct: false },
                    { text: "C) Credibility (ethos)", correct: false },
                    { text: "D) Contrast", correct: false }
                ],
                explanation: "'Lose everything' stirs fear and urgency."
            }
        ],
        additionalExample: {
            title: "Example: Repetition",
            content: `
                <h2>Example: Repetition</h2>
                <p>Passage: 'We will fight, we will win, we will rise.'</p>
                <p>Question: What rhetorical strategy is used?</p>
                <p>Step 1: Spot pattern: Repeated 'we will'.</p>
                <p>Step 2: Infer: Emphasizes determination.</p>
                <p>Strategy: Repetition.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Text Structure and Purpose question arrays
const authorPurposeQuestions = [
    {
        question: "Passage: 'This policy will ruin us if unchanged.' What is the author’s purpose?",
        answers: [
            { text: "A) To persuade", correct: true },
            { text: "B) To inform", correct: false },
            { text: "C) To entertain", correct: false },
            { text: "D) To describe", correct: false }
        ],
        explanation: "'Will ruin us' aims to convince readers to oppose the policy.",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    }
];

const textStructureQuestions = [
    {
        question: "Passage: 'Unlike old methods, new tech saves time.' What is the text structure?",
        answers: [
            { text: "A) Compare and contrast", correct: true },
            { text: "B) Sequence", correct: false },
            { text: "C) Cause and effect", correct: false },
            { text: "D) Description", correct: false }
        ],
        explanation: "'Unlike' shows a comparison between old and new.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    }
];

const ideaOrganizationQuestions = [
    {
        question: "Passage: 'The fire started, then spread quickly.' How are ideas organized?",
        answers: [
            { text: "A) Chronological", correct: true },
            { text: "B) Spatial", correct: false },
            { text: "C) Importance", correct: false },
            { text: "D) Logical", correct: false }
        ],
        explanation: "'Started, then spread' follows a time sequence.",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    }
];

const rhetoricalStrategiesQuestions = [
    {
        question: "Passage: 'Data proves this method succeeds.' What rhetorical strategy is used?",
        answers: [
            { text: "A) Logical appeal (logos)", correct: true },
            { text: "B) Emotional appeal (pathos)", correct: false },
            { text: "C) Credibility (ethos)", correct: false },
            { text: "D) Repetition", correct: false }
        ],
        explanation: "'Data proves' uses evidence to appeal to reason.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    }
];

// lesson-text-structure-and-purpose.js

let categoryStats = {
    "text-structure-and-purpose": { correct: 0, incorrect: 0 }
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
            categoryStats["text-structure-and-purpose"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["text-structure-and-purpose"].incorrect++;
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
            categoryStats["text-structure-and-purpose"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["text-structure-and-purpose"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = authorPurposeQuestions; break;
        case 2: quizQuestions = textStructureQuestions; break;
        case 3: quizQuestions = ideaOrganizationQuestions; break;
        case 4: quizQuestions = rhetoricalStrategiesQuestions; break;
        default: quizQuestions = authorPurposeQuestions;
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
    localStorage.setItem(`text-structure-and-purpose-lessonScore-${lessonId}`, score);
    console.log(`Saved text-structure-and-purpose-lessonScore-${lessonId}: ${score}`);
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