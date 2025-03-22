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
        title: "Avoiding Run-On Sentences and Comma Splices",
        examples: [
            {
                title: "Example: Run-On Sentence",
                content: `
                    <h2>Example: Run-On Sentence</h2>
                    <p>Wrong: 'She wanted to win she trained hard.'</p>
                    <p>Question: How to fix this run-on?</p>
                    <p>Step 1: Identify: Two independent clauses with no break.</p>
                    <p>Step 2: Fix: Add a period or conjunction.</p>
                    <p>Correct: 'She wanted to win, so she trained hard.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Comma Splice",
                content: `
                    <h2>Example: Comma Splice</h2>
                    <p>Wrong: 'He was tired, he kept running.'</p>
                    <p>Question: How to fix this comma splice?</p>
                    <p>Step 1: Identify: Two full sentences joined by a comma.</p>
                    <p>Step 2: Fix: Use a semicolon or period.</p>
                    <p>Correct: 'He was tired; he kept running.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "'She studied all night, she passed the test.' How to fix this comma splice?",
                options: [
                    { text: "A) She studied all night; she passed the test.", correct: true },
                    { text: "B) She studied all night, she passed the test, great.", correct: false },
                    { text: "C) She studied all night, passing the test.", correct: false },
                    { text: "D) She studied all night, and she passed the test.", correct: true }
                ],
                explanation: "A semicolon or 'and' fixes the splice between two full sentences."
            },
            {
                title: "Question 2",
                question: "'The rain stopped we went outside.' How to fix this run-on?",
                options: [
                    { text: "A) The rain stopped, so we went outside.", correct: true },
                    { text: "B) The rain stopped we went outside quick.", correct: false },
                    { text: "C) The rain stopped, we went outside, fun.", correct: false },
                    { text: "D) The rain stopped we went outside now.", correct: false }
                ],
                explanation: "'So' with a comma separates the clauses correctly."
            }
        ],
        additionalExample: {
            title: "Example: Mixed Error",
            content: `
                <h2>Example: Mixed Error</h2>
                <p>Wrong: 'He was late, he ran fast he caught the bus.'</p>
                <p>Question: How to fix this?</p>
                <p>Step 1: Identify: Comma splice and run-on.</p>
                <p>Step 2: Fix: Break into proper sentences.</p>
                <p>Correct: 'He was late, so he ran fast. He caught the bus.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Avoiding Sentence Fragments",
        examples: [
            {
                title: "Example: Missing Subject",
                content: `
                    <h2>Example: Missing Subject</h2>
                    <p>Wrong: 'Running through the park.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No subject or complete thought.</p>
                    <p>Step 2: Fix: Add a subject and verb.</p>
                    <p>Correct: 'She was running through the park.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Dependent Clause",
                content: `
                    <h2>Example: Dependent Clause</h2>
                    <p>Wrong: 'Because he forgot his lines.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: 'Because' makes it incomplete.</p>
                    <p>Step 2: Fix: Add an independent clause.</p>
                    <p>Correct: 'Because he forgot his lines, he improvised.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "'Hoping to win.' How to fix this fragment?",
                options: [
                    { text: "A) She was hoping to win.", correct: true },
                    { text: "B) Hoping to win, great.", correct: false },
                    { text: "C) Hoping to win fast.", correct: false },
                    { text: "D) Hoping to win, okay.", correct: false }
                ],
                explanation: "Adding 'She was' completes the sentence."
            },
            {
                title: "Question 2",
                question: "'Although the team tried hard.' How to fix this fragment?",
                options: [
                    { text: "A) Although the team tried hard, they lost.", correct: true },
                    { text: "B) Although the team tried hard, tough.", correct: false },
                    { text: "C) Although the team tried hard and.", correct: false },
                    { text: "D) Although the team tried hard quickly.", correct: false }
                ],
                explanation: "Adding 'they lost' completes the thought."
            }
        ],
        additionalExample: {
            title: "Example: Phrase Fragment",
            content: `
                <h2>Example: Phrase Fragment</h2>
                <p>Wrong: 'A loud crash in the night.'</p>
                <p>Question: Why is this a fragment?</p>
                <p>Step 1: Check: No verb or complete idea.</p>
                <p>Step 2: Fix: Add a verb and subject.</p>
                <p>Correct: 'A loud crash woke us in the night.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Proper Use of Semicolons, Colons, and Dashes",
        examples: [
            {
                title: "Example: Semicolon",
                content: `
                    <h2>Example: Semicolon</h2>
                    <p>Context: Two related full sentences.</p>
                    <p>Correct: 'She loved art; she painted daily.'</p>
                    <p>Question: Why use a semicolon?</p>
                    <p>Step 1: Check: Two independent clauses.</p>
                    <p>Step 2: Confirm: Closely related ideas.</p>
                    <p>Answer: Links related full sentences.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Colon",
                content: `
                    <h2>Example: Colon</h2>
                    <p>Context: Introducing a list.</p>
                    <p>Correct: 'He packed three things: a book, a pen, a snack.'</p>
                    <p>Question: Why use a colon?</p>
                    <p>Step 1: Check: Introduces specifics.</p>
                    <p>Step 2: Confirm: Follows a complete sentence.</p>
                    <p>Answer: Sets up a list or explanation.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "'She was tired __ she kept going.' Which punctuation fits best?",
                options: [
                    { text: "A) ;", correct: true },
                    { text: "B) :", correct: false },
                    { text: "C) —", correct: false },
                    { text: "D) ,", correct: false }
                ],
                explanation: "A semicolon joins two related full sentences."
            },
            {
                title: "Question 2",
                question: "'He had one goal __ to win.' Which punctuation fits best?",
                options: [
                    { text: "A) :", correct: true },
                    { text: "B) ;", correct: false },
                    { text: "C) ,", correct: false },
                    { text: "D) .", correct: false }
                ],
                explanation: "A colon introduces the goal as an explanation."
            }
        ],
        additionalExample: {
            title: "Example: Dash",
            content: `
                <h2>Example: Dash</h2>
                <p>Context: Adding emphasis.</p>
                <p>Correct: 'Her dream — to travel the world — inspired her.'</p>
                <p>Question: Why use dashes?</p>
                <p>Step 1: Check: Adds a dramatic pause.</p>
                <p>Step 2: Confirm: Highlights key info.</p>
                <p>Answer: Emphasizes an interruption or addition.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Maintaining Logical and Clear Sentence Boundaries",
        examples: [
            {
                title: "Example: Clear Boundary",
                content: `
                    <h2>Example: Clear Boundary</h2>
                    <p>Wrong: 'She cooked dinner after work was exhausting.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Boundary confusion — what’s exhausting?</p>
                    <p>Step 2: Fix: Separate ideas logically.</p>
                    <p>Correct: 'She cooked dinner after work. It was exhausting.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Logical Flow",
                content: `
                    <h2>Example: Logical Flow</h2>
                    <p>Wrong: 'He missed the bus running late.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Who’s running late?</p>
                    <p>Step 2: Fix: Clarify with boundaries.</p>
                    <p>Correct: 'He missed the bus because he was running late.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "'She danced all night the party was fun.' How to clarify?",
                options: [
                    { text: "A) She danced all night; the party was fun.", correct: true },
                    { text: "B) She danced all night the party fun.", correct: false },
                    { text: "C) She danced all night, the party, fun.", correct: false },
                    { text: "D) She danced all night the party was fun too.", correct: false }
                ],
                explanation: "A semicolon separates the ideas clearly."
            },
            {
                title: "Question 2",
                question: "'He studied hard the test was easy.' How to clarify?",
                options: [
                    { text: "A) He studied hard, so the test was easy.", correct: true },
                    { text: "B) He studied hard the test easy.", correct: false },
                    { text: "C) He studied hard, the test easy.", correct: false },
                    { text: "D) He studied hard the test was easy now.", correct: false }
                ],
                explanation: "'So' with a comma links cause and effect logically."
            }
        ],
        additionalExample: {
            title: "Example: Avoiding Ambiguity",
            content: `
                <h2>Example: Avoiding Ambiguity</h2>
                <p>Wrong: 'The dog barked at the mailman wearing a hat.'</p>
                <p>Question: Why is this unclear?</p>
                <p>Step 1: Check: Who’s wearing the hat?</p>
                <p>Step 2: Fix: Set clear boundaries.</p>
                <p>Correct: 'The dog barked at the mailman, who was wearing a hat.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Boundaries question arrays
const runOnSpliceQuestions = [
    {
        question: "'She was hungry, she ate fast.' How to fix this comma splice?",
        answers: [
            { text: "A) She was hungry; she ate fast.", correct: true },
            { text: "B) She was hungry, she ate fast, good.", correct: false },
            { text: "C) She was hungry, eating fast.", correct: false },
            { text: "D) She was hungry, she ate fast now.", correct: false }
        ],
        explanation: "A semicolon separates two full sentences correctly.",
        difficulty: "easy",
        category: "boundaries"
    }
];

const fragmentQuestions = [
    {
        question: "'Because it rained all day.' How to fix this fragment?",
        answers: [
            { text: "A) Because it rained all day, we stayed inside.", correct: true },
            { text: "B) Because it rained all day, wet.", correct: false },
            { text: "C) Because it rained all day and.", correct: false },
            { text: "D) Because it rained all day fast.", correct: false }
        ],
        explanation: "Adding 'we stayed inside' completes the sentence.",
        difficulty: "medium",
        category: "boundaries"
    }
];

const punctuationQuestions = [
    {
        question: "'She had one job __ to succeed.' Which punctuation fits best?",
        answers: [
            { text: "A) :", correct: true },
            { text: "B) ;", correct: false },
            { text: "C) ,", correct: false },
            { text: "D) .", correct: false }
        ],
        explanation: "A colon introduces 'to succeed' as an explanation.",
        difficulty: "easy",
        category: "boundaries"
    }
];

const clearBoundariesQuestions = [
    {
        question: "'He ran the race winning easily.' How to clarify?",
        answers: [
            { text: "A) He ran the race and won easily.", correct: true },
            { text: "B) He ran the race winning easily now.", correct: false },
            { text: "C) He ran the race, winning, easily.", correct: false },
            { text: "D) He ran the race winning easily fast.", correct: false }
        ],
        explanation: "'And' separates the actions for clarity.",
        difficulty: "medium",
        category: "boundaries"
    }
];

// lesson-boundaries.js

let categoryStats = {
    "boundaries": { correct: 0, incorrect: 0 }
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
            categoryStats["boundaries"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["boundaries"].incorrect++;
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
            categoryStats["boundaries"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["boundaries"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = runOnSpliceQuestions; break;
        case 2: quizQuestions = fragmentQuestions; break;
        case 3: quizQuestions = punctuationQuestions; break;
        case 4: quizQuestions = clearBoundariesQuestions; break;
        default: quizQuestions = runOnSpliceQuestions;
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
    localStorage.setItem(`boundaries-lessonScore-${lessonId}`, score);
    console.log(`Saved boundaries-lessonScore-${lessonId}: ${score}`);
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