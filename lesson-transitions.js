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
        title: "Identifying the Correct Type of Transition",
        examples: [
            {
                title: "Example: Cause and Effect Transition",
                content: `
                    <h2>Example: Cause and Effect Transition</h2>
                    <p>Sentence: 'It rained heavily. The streets flooded.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Rain caused flooding.</p>
                    <p>Step 2: Identify: Shows cause-effect.</p>
                    <p>Type: Cause and effect (e.g., 'therefore').</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Contrast Transition",
                content: `
                    <h2>Example: Contrast Transition</h2>
                    <p>Sentence: 'She studied hard. She failed the test.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Effort vs. failure.</p>
                    <p>Step 2: Identify: Shows opposition.</p>
                    <p>Type: Contrast (e.g., 'however').</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Sentence: 'He practiced daily. He won the race.' What type of transition is needed?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Addition", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "Practice leading to winning suggests cause-effect."
            },
            {
                title: "Question 2",
                question: "Sentence: 'The team was tired. They kept playing.' What type of transition is needed?",
                options: [
                    { text: "A) Contrast", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Example", correct: false }
                ],
                explanation: "Tiredness vs. continuing shows opposition."
            }
        ],
        additionalExample: {
            title: "Example: Sequence Transition",
            content: `
                <h2>Example: Sequence Transition</h2>
                <p>Sentence: 'She mixed the batter. She baked the cake.'</p>
                <p>Question: What type of transition is needed?</p>
                <p>Step 1: Analyze: Steps in order.</p>
                <p>Step 2: Identify: Shows time sequence.</p>
                <p>Type: Sequence (e.g., 'then').</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Choosing the Best Transition Word or Phrase",
        examples: [
            {
                title: "Example: Adding Information",
                content: `
                    <h2>Example: Adding Information</h2>
                    <p>Sentence: 'The project was complex. It required teamwork.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Additional detail about complexity.</p>
                    <p>Step 2: Choose: 'Moreover' adds related info.</p>
                    <p>Best: 'Moreover'.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Showing Contrast",
                content: `
                    <h2>Example: Showing Contrast</h2>
                    <p>Sentence: 'He was tired. He finished the race.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Tiredness vs. finishing.</p>
                    <p>Step 2: Choose: 'Nevertheless' shows defiance.</p>
                    <p>Best: 'Nevertheless'.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Sentence: 'The plan failed. We learned a lot.' What’s the best transition?",
                options: [
                    { text: "A) However", correct: true },
                    { text: "B) Therefore", correct: false },
                    { text: "C) First", correct: false },
                    { text: "D) For example", correct: false }
                ],
                explanation: "'However' fits the contrast between failure and learning."
            },
            {
                title: "Question 2",
                question: "Sentence: 'She saved money. She bought a car.' What’s the best transition?",
                options: [
                    { text: "A) As a result", correct: true },
                    { text: "B) On the other hand", correct: false },
                    { text: "C) Similarly", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'As a result' links saving to buying as cause-effect."
            }
        ],
        additionalExample: {
            title: "Example: Giving an Example",
            content: `
                <h2>Example: Giving an Example</h2>
                <p>Sentence: 'Sports build skills. Soccer teaches teamwork.'</p>
                <p>Question: What’s the best transition?</p>
                <p>Step 1: Context: Soccer as a specific case.</p>
                <p>Step 2: Choose: 'For instance' introduces examples.</p>
                <p>Best: 'For instance'.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Transitioning Between Sentences",
        examples: [
            {
                title: "Example: Logical Flow",
                content: `
                    <h2>Example: Logical Flow</h2>
                    <p>Sentences: 'The storm hit hard. Roads were blocked.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Storm caused road issues.</p>
                    <p>Step 2: Transition: 'As a result' shows effect.</p>
                    <p>Revised: 'The storm hit hard. As a result, roads were blocked.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Contrast Flow",
                content: `
                    <h2>Example: Contrast Flow</h2>
                    <p>Sentences: 'He trained for weeks. He lost the match.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Effort vs. outcome.</p>
                    <p>Step 2: Transition: 'Despite this' shows contrast.</p>
                    <p>Revised: 'He trained for weeks. Despite this, he lost the match.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Sentences: 'She studied all night. She aced the test.' How to transition?",
                options: [
                    { text: "A) Consequently", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Meanwhile", correct: false },
                    { text: "D) Similarly", correct: false }
                ],
                explanation: "'Consequently' connects studying to success as a result."
            },
            {
                title: "Question 2",
                question: "Sentences: 'The team was small. They won the game.' How to transition?",
                options: [
                    { text: "A) Nevertheless", correct: true },
                    { text: "B) Therefore", correct: false },
                    { text: "C) Next", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'Nevertheless' highlights the unexpected win despite size."
            }
        ],
        additionalExample: {
            title: "Example: Adding Detail",
            content: `
                <h2>Example: Adding Detail</h2>
                <p>Sentences: 'The city grew fast. New schools opened.'</p>
                <p>Question: How to transition?</p>
                <p>Step 1: Link: Growth led to more schools.</p>
                <p>Step 2: Transition: 'Additionally' adds info.</p>
                <p>Revised: 'The city grew fast. Additionally, new schools opened.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Transitioning Between Paragraphs",
        examples: [
            {
                title: "Example: Shifting Topics",
                content: `
                    <h2>Example: Shifting Topics</h2>
                    <p>Paragraph 1: 'The economy boomed last year.'</p>
                    <p>Paragraph 2: 'Unemployment rose this year.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Boom to unemployment shift.</p>
                    <p>Step 2: Transition: 'However' contrasts years.</p>
                    <p>Revised: '...boomed last year. However, unemployment rose this year.'</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Building on Ideas",
                content: `
                    <h2>Example: Building on Ideas</h2>
                    <p>Paragraph 1: 'Exercise benefits health.'</p>
                    <p>Paragraph 2: 'Mental health also improves.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Health to mental health.</p>
                    <p>Step 2: Transition: 'Furthermore' extends benefits.</p>
                    <p>Revised: '...benefits health. Furthermore, mental health also improves.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Paragraph 1: 'The policy saved money.' Paragraph 2: 'It upset many people.' How to transition?",
                options: [
                    { text: "A) On the other hand", correct: true },
                    { text: "B) As a result", correct: false },
                    { text: "C) First", correct: false },
                    { text: "D) For instance", correct: false }
                ],
                explanation: "'On the other hand' contrasts savings with upset."
            },
            {
                title: "Question 2",
                question: "Paragraph 1: 'The team trained hard.' Paragraph 2: 'They developed new strategies.' How to transition?",
                options: [
                    { text: "A) In addition", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Because", correct: false },
                    { text: "D) Meanwhile", correct: false }
                ],
                explanation: "'In addition' adds strategies to training efforts."
            }
        ],
        additionalExample: {
            title: "Example: Summarizing",
            content: `
                <h2>Example: Summarizing</h2>
                <p>Paragraph 1: 'Costs rose due to delays.'</p>
                <p>Paragraph 2: 'The project still succeeded.'</p>
                <p>Question: How to transition?</p>
                <p>Step 1: Link: Costs to success despite issues.</p>
                <p>Step 2: Transition: 'Overall' sums up outcome.</p>
                <p>Revised: '...due to delays. Overall, the project still succeeded.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Transitions question arrays
const transitionTypeQuestions = [
    {
        question: "Sentence: 'She was late. She missed the bus.' What type of transition is needed?",
        answers: [
            { text: "A) Cause and effect", correct: true },
            { text: "B) Contrast", correct: false },
            { text: "C) Addition", correct: false },
            { text: "D) Sequence", correct: false }
        ],
        explanation: "Being late caused missing the bus, a cause-effect link.",
        difficulty: "easy",
        category: "transitions"
    }
];

const transitionWordQuestions = [
    {
        question: "Sentence: 'The test was tough. We all passed.' What’s the best transition?",
        answers: [
            { text: "A) Nevertheless", correct: true },
            { text: "B) Therefore", correct: false },
            { text: "C) First", correct: false },
            { text: "D) Similarly", correct: false }
        ],
        explanation: "'Nevertheless' fits the contrast between difficulty and success.",
        difficulty: "medium",
        category: "transitions"
    }
];

const sentenceTransitionQuestions = [
    {
        question: "Sentences: 'He forgot his lines. He improvised well.' How to transition?",
        answers: [
            { text: "A) However", correct: true },
            { text: "B) As a result", correct: false },
            { text: "C) Next", correct: false },
            { text: "D) In addition", correct: false }
        ],
        explanation: "'However' connects forgetting to surprising success.",
        difficulty: "easy",
        category: "transitions"
    }
];

const paragraphTransitionQuestions = [
    {
        question: "Paragraph 1: 'The plan cut costs.' Paragraph 2: 'It improved efficiency.' How to transition?",
        answers: [
            { text: "A) Furthermore", correct: true },
            { text: "B) On the contrary", correct: false },
            { text: "C) Because", correct: false },
            { text: "D) Meanwhile", correct: false }
        ],
        explanation: "'Furthermore' adds efficiency to cost-cutting benefits.",
        difficulty: "medium",
        category: "transitions"
    }
];

// lesson-transitions.js

let categoryStats = {
    "transitions": { correct: 0, incorrect: 0 }
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
            categoryStats["transitions"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["transitions"].incorrect++;
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
            categoryStats["transitions"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["transitions"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = transitionTypeQuestions; break;
        case 2: quizQuestions = transitionWordQuestions; break;
        case 3: quizQuestions = sentenceTransitionQuestions; break;
        case 4: quizQuestions = paragraphTransitionQuestions; break;
        default: quizQuestions = transitionTypeQuestions;
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
    localStorage.setItem(`transitions-lessonScore-${lessonId}`, score);
    console.log(`Saved transitions-lessonScore-${lessonId}: ${score}`);
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