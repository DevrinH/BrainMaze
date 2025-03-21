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
        title: "Determining Word Meaning from Context",
        examples: [
            {
                title: "Example: Basic Context Clues",
                content: `
                    <h2>Example: Basic Context Clues</h2>
                    <p>Passage: 'The arduous journey exhausted the travelers.'</p>
                    <p>Question: What does 'arduous' mean?</p>
                    <p>Step 1: Look at context: 'exhausted the travelers'.</p>
                    <p>Step 2: Infer: A tiring or difficult trip.</p>
                    <p>Meaning: 'Arduous' means challenging.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Context with Contrast",
                content: `
                    <h2>Example: Context with Contrast</h2>
                    <p>Passage: 'Unlike her timid brother, she was bold.'</p>
                    <p>Question: What does 'timid' mean?</p>
                    <p>Step 1: Contrast clue: 'unlike' bold sister.</p>
                    <p>Step 2: Infer: Shy or hesitant.</p>
                    <p>Meaning: 'Timid' means shy.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The serene lake soothed her nerves.' What does 'serene' mean?",
                options: [
                    { text: "A) Peaceful", correct: true },
                    { text: "B) Rough", correct: false },
                    { text: "C) Dirty", correct: false },
                    { text: "D) Cold", correct: false }
                ],
                explanation: "'Soothed her nerves' suggests a calm, peaceful quality."
            },
            {
                title: "Question 2",
                question: "Passage: 'His frugal habits saved him money.' What does 'frugal' mean?",
                options: [
                    { text: "A) Thrifty", correct: true },
                    { text: "B) Wasteful", correct: false },
                    { text: "C) Generous", correct: false },
                    { text: "D) Careless", correct: false }
                ],
                explanation: "Saving money implies careful spending, so 'frugal' means thrifty."
            }
        ],
        additionalExample: {
            title: "Example: Complex Context",
            content: `
                <h2>Example: Complex Context</h2>
                <p>Passage: 'The cryptic note left us puzzled.'</p>
                <p>Question: What does 'cryptic' mean?</p>
                <p>Step 1: Context: 'left us puzzled'.</p>
                <p>Step 2: Infer: Mysterious or unclear.</p>
                <p>Meaning: 'Cryptic' means confusing.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Recognizing Nuanced Word Meanings",
        examples: [
            {
                title: "Example: Subtle Differences",
                content: `
                    <h2>Example: Subtle Differences</h2>
                    <p>Passage: 'She asserted her opinion confidently.'</p>
                    <p>Question: What does 'asserted' mean here?</p>
                    <p>Step 1: Context: 'confidently'.</p>
                    <p>Step 2: Infer: Stated firmly, not just mentioned.</p>
                    <p>Meaning: 'Asserted' means declared boldly.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Context-Specific Meaning",
                content: `
                    <h2>Example: Context-Specific Meaning</h2>
                    <p>Passage: 'He cultivated friendships over years.'</p>
                    <p>Question: What does 'cultivated' mean?</p>
                    <p>Step 1: Context: 'friendships over years'.</p>
                    <p>Step 2: Infer: Nurtured, not farmed.</p>
                    <p>Meaning: 'Cultivated' means developed carefully.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The teacher illuminated the topic for us.' What does 'illuminated' mean?",
                options: [
                    { text: "A) Clarified", correct: true },
                    { text: "B) Lit up", correct: false },
                    { text: "C) Confused", correct: false },
                    { text: "D) Ignored", correct: false }
                ],
                explanation: "In a teaching context, 'illuminated' means made clear, not physically lit."
            },
            {
                title: "Question 2",
                question: "Passage: 'Her resolve strengthened after the setback.' What does 'resolve' mean?",
                options: [
                    { text: "A) Determination", correct: true },
                    { text: "B) Solution", correct: false },
                    { text: "C) Weakness", correct: false },
                    { text: "D) Agreement", correct: false }
                ],
                explanation: "Strengthening after a setback suggests 'resolve' means firmness, not a fix."
            }
        ],
        additionalExample: {
            title: "Example: Nuanced Emotional Meaning",
            content: `
                <h2>Example: Nuanced Emotional Meaning</h2>
                <p>Passage: 'His tone conveyed reluctance.'</p>
                <p>Question: What does 'conveyed' mean?</p>
                <p>Step 1: Context: 'tone' and 'reluctance'.</p>
                <p>Step 2: Infer: Expressed subtly, not transported.</p>
                <p>Meaning: 'Conveyed' means communicated.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Interpreting Figurative and Connotative Meanings",
        examples: [
            {
                title: "Example: Figurative Meaning",
                content: `
                    <h2>Example: Figurative Meaning</h2>
                    <p>Passage: 'Her words were a dagger to his heart.'</p>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Recognize figure: Not literal stabbing.</p>
                    <p>Step 2: Interpret: Emotionally hurtful.</p>
                    <p>Meaning: Her words caused deep pain.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Connotative Meaning",
                content: `
                    <h2>Example: Connotative Meaning</h2>
                    <p>Passage: 'He’s a snake in negotiations.'</p>
                    <p>Question: What does 'snake' imply?</p>
                    <p>Step 1: Context: Negotiations.</p>
                    <p>Step 2: Connotation: Sneaky, untrustworthy.</p>
                    <p>Meaning: Deceptive or cunning.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The news was a breath of fresh air.' What does this mean?",
                options: [
                    { text: "A) It was refreshing", correct: true },
                    { text: "B) It was cold", correct: false },
                    { text: "C) It smelled good", correct: false },
                    { text: "D) It was windy", correct: false }
                ],
                explanation: "'Breath of fresh air' figuratively means something positive and new."
            },
            {
                title: "Question 2",
                question: "Passage: 'Her smile was radiant.' What does 'radiant' connote?",
                options: [
                    { text: "A) Bright and joyful", correct: true },
                    { text: "B) Dim and sad", correct: false },
                    { text: "C) Angry and sharp", correct: false },
                    { text: "D) Quiet and shy", correct: false }
                ],
                explanation: "A smile with 'radiant' suggests happiness and energy."
            }
        ],
        additionalExample: {
            title: "Example: Combined Figurative and Connotative",
            content: `
                <h2>Example: Combined Figurative and Connotative</h2>
                <p>Passage: 'The storm of criticism battered him.'</p>
                <p>Question: What does this suggest?</p>
                <p>Step 1: Figurative: 'Storm' isn’t weather.</p>
                <p>Step 2: Connotation: Intense, harsh critique.</p>
                <p>Meaning: He faced overwhelming negativity.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Analyzing Word Choice and Rhetorical Effect",
        examples: [
            {
                title: "Example: Emotional Impact",
                content: `
                    <h2>Example: Emotional Impact</h2>
                    <p>Passage: 'The ruthless policy crushed their hopes.'</p>
                    <p>Question: Why use 'ruthless' and 'crushed'?</p>
                    <p>Step 1: Analyze 'ruthless': Harsh, merciless.</p>
                    <p>Step 2: 'Crushed': Total defeat, emotional weight.</p>
                    <p>Effect: Evokes strong negativity and despair.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Persuasive Effect",
                content: `
                    <h2>Example: Persuasive Effect</h2>
                    <p>Passage: 'We must unite to triumph over adversity.'</p>
                    <p>Question: Why use 'unite' and 'triumph'?</p>
                    <p>Step 1: 'Unite': Suggests collective strength.</p>
                    <p>Step 2: 'Triumph': Victory, inspires action.</p>
                    <p>Effect: Motivates and rallies the reader.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The vibrant festival energized the crowd.' Why use 'vibrant'?",
                options: [
                    { text: "A) To suggest liveliness", correct: true },
                    { text: "B) To imply dullness", correct: false },
                    { text: "C) To confuse readers", correct: false },
                    { text: "D) To describe sound", correct: false }
                ],
                explanation: "'Vibrant' with 'energized' creates a lively, positive image."
            },
            {
                title: "Question 2",
                question: "Passage: 'His plea pierced their apathy.' Why use 'pierced'?",
                options: [
                    { text: "A) To show emotional impact", correct: true },
                    { text: "B) To suggest physical harm", correct: false },
                    { text: "C) To indicate silence", correct: false },
                    { text: "D) To imply softness", correct: false }
                ],
                explanation: "'Pierced' implies breaking through indifference forcefully."
            }
        ],
        additionalExample: {
            title: "Example: Tone Setting",
            content: `
                <h2>Example: Tone Setting</h2>
                <p>Passage: 'The ominous clouds loomed overhead.'</p>
                <p>Question: Why use 'ominous' and 'loomed'?</p>
                <p>Step 1: 'Ominous': Threatening, foreboding.</p>
                <p>Step 2: 'Loomed': Imposing, suspenseful.</p>
                <p>Effect: Creates a tense, foreboding mood.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Words in Context question arrays
const wordMeaningQuestions = [
    {
        question: "Passage: 'The jovial host welcomed everyone warmly.' What does 'jovial' mean?",
        answers: [
            { text: "A) Cheerful", correct: true },
            { text: "B) Rude", correct: false },
            { text: "C) Shy", correct: false },
            { text: "D) Tired", correct: false }
        ],
        explanation: "'Welcomed warmly' suggests 'jovial' means friendly and happy.",
        difficulty: "easy",
        category: "words-in-context"
    }
];

const nuancedMeaningsQuestions = [
    {
        question: "Passage: 'She navigated the tricky situation skillfully.' What does 'navigated' mean?",
        answers: [
            { text: "A) Managed", correct: true },
            { text: "B) Sailed", correct: false },
            { text: "C) Ignored", correct: false },
            { text: "D) Lost", correct: false }
        ],
        explanation: "In this context, 'navigated' means handled carefully, not literal sailing.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

const figurativeConnotativeQuestions = [
    {
        question: "Passage: 'His temper flared like a wildfire.' What does this mean?",
        answers: [
            { text: "A) His anger grew quickly", correct: true },
            { text: "B) He started a fire", correct: false },
            { text: "C) He was calm", correct: false },
            { text: "D) He liked wildfires", correct: false }
        ],
        explanation: "'Flared like a wildfire' suggests rapid, intense anger figuratively.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

const wordChoiceQuestions = [
    {
        question: "Passage: 'The scandal tarnished his reputation.' Why use 'tarnished'?",
        answers: [
            { text: "A) To imply damage", correct: true },
            { text: "B) To suggest improvement", correct: false },
            { text: "C) To describe cleaning", correct: false },
            { text: "D) To indicate brightness", correct: false }
        ],
        explanation: "'Tarnished' connotes staining or ruining, fitting a scandal’s effect.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

// lesson-words-in-context.js

let categoryStats = {
    "words-in-context": { correct: 0, incorrect: 0 }
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
            categoryStats["words-in-context"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["words-in-context"].incorrect++;
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
            categoryStats["words-in-context"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["words-in-context"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = wordMeaningQuestions; break;
        case 2: quizQuestions = nuancedMeaningsQuestions; break;
        case 3: quizQuestions = figurativeConnotativeQuestions; break;
        case 4: quizQuestions = wordChoiceQuestions; break;
        default: quizQuestions = wordMeaningQuestions;
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
    localStorage.setItem(`words-in-context-lessonScore-${lessonId}`, score);
    console.log(`Saved words-in-context-lessonScore-${lessonId}: ${score}`);
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