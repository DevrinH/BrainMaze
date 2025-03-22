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
        title: "Comparing Main Ideas and Arguments",
        examples: [
            {
                title: "Example: Comparing Main Ideas",
                content: `
                    <h2>Example: Comparing Main Ideas</h2>
                    <p>Text 1: 'Renewable energy is key to sustainability.'</p>
                    <p>Text 2: 'Fossil fuels remain essential for energy needs.'</p>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Identify ideas: Text 1 pushes renewables, Text 2 defends fossils.</p>
                    <p>Step 2: Compare: Opposing views on energy sources.</p>
                    <p>Comparison: They disagree on the best energy approach.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Comparing Arguments",
                content: `
                    <h2>Example: Comparing Arguments</h2>
                    <p>Text 1: 'Homework boosts learning through practice.'</p>
                    <p>Text 2: 'Homework overwhelms students, reducing learning.'</p>
                    <p>Question: How do the arguments differ?</p>
                    <p>Step 1: Arguments: Text 1 sees benefit, Text 2 sees harm.</p>
                    <p>Step 2: Contrast: Opposite effects of homework.</p>
                    <p>Difference: Text 1 supports, Text 2 opposes homework.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Text 1: 'Social media connects people.' Text 2: 'Social media isolates us.' How do the main ideas compare?",
                options: [
                    { text: "A) They conflict", correct: true },
                    { text: "B) They agree", correct: false },
                    { text: "C) They are unrelated", correct: false },
                    { text: "D) They are identical", correct: false }
                ],
                explanation: "'Connects' vs. 'isolates' shows opposing views on social media."
            },
            {
                title: "Question 2",
                question: "Text 1: 'Exercise improves health.' Text 2: 'Exercise risks injury.' How do the arguments differ?",
                options: [
                    { text: "A) Benefits vs. risks", correct: true },
                    { text: "B) Methods vs. results", correct: false },
                    { text: "C) Time vs. effort", correct: false },
                    { text: "D) Health vs. fun", correct: false }
                ],
                explanation: "Text 1 highlights positives, Text 2 negatives of exercise."
            }
        ],
        additionalExample: {
            title: "Example: Subtle Comparison",
            content: `
                <h2>Example: Subtle Comparison</h2>
                <p>Text 1: 'Tech advances society.' Text 2: 'Tech advances but at a cost.'</p>
                <p>Question: How do the main ideas compare?</p>
                <p>Step 1: Ideas: Text 1 is positive, Text 2 is mixed.</p>
                <p>Step 2: Compare: Partial agreement, but Text 2 adds a downside.</p>
                <p>Comparison: Text 1 is optimistic, Text 2 is cautious.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Evaluating Evidence Across Texts",
        examples: [
            {
                title: "Example: Strength of Evidence",
                content: `
                    <h2>Example: Strength of Evidence</h2>
                    <p>Text 1: 'Studies show recycling saves resources.'</p>
                    <p>Text 2: 'A friend said recycling is useless.'</p>
                    <p>Question: Which text has stronger evidence?</p>
                    <p>Step 1: Evaluate: Studies vs. anecdote.</p>
                    <p>Step 2: Infer: Research is more reliable.</p>
                    <p>Answer: Text 1 has stronger evidence.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Relevance of Evidence",
                content: `
                    <h2>Example: Relevance of Evidence</h2>
                    <p>Text 1: 'Data shows masks reduce virus spread.'</p>
                    <p>Text 2: 'Masks were used in 1918.'</p>
                    <p>Question: Which evidence better supports mask use today?</p>
                    <p>Step 1: Check relevance: Data vs. history.</p>
                    <p>Step 2: Infer: Current data is more applicable.</p>
                    <p>Answer: Text 1’s evidence is more relevant.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Text 1: 'Surveys show diets improve health.' Text 2: 'My cousin lost weight.' Which has stronger evidence?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither is strong", correct: false }
                ],
                explanation: "Surveys (broad data) outweigh a single anecdote."
            },
            {
                title: "Question 2",
                question: "Text 1: 'Tests prove cars pollute.' Text 2: 'Cars look cool.' Which evidence supports environmental impact?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "Tests on pollution are relevant; looks are not."
            }
        ],
        additionalExample: {
            title: "Example: Consistency of Evidence",
            content: `
                <h2>Example: Consistency of Evidence</h2>
                <p>Text 1: 'Experts say sleep aids learning.'</p>
                <p>Text 2: 'One study found sleep helps memory.'</p>
                <p>Question: How does the evidence align?</p>
                <p>Step 1: Compare: Experts vs. one study.</p>
                <p>Step 2: Infer: Both support sleep’s benefits.</p>
                <p>Answer: Evidence is consistent but varies in scope.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Understanding Differences in Tone and Perspective",
        examples: [
            {
                title: "Example: Tone Difference",
                content: `
                    <h2>Example: Tone Difference</h2>
                    <p>Text 1: 'The policy is a brilliant solution!'</p>
                    <p>Text 2: 'This policy is a total disaster.'</p>
                    <p>Question: How do the tones differ?</p>
                    <p>Step 1: Analyze: 'Brilliant' vs. 'disaster'.</p>
                    <p>Step 2: Infer: Positive vs. negative.</p>
                    <p>Difference: Text 1 is enthusiastic, Text 2 is critical.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Perspective Difference",
                content: `
                    <h2>Example: Perspective Difference</h2>
                    <p>Text 1: 'Taxes fund vital services.'</p>
                    <p>Text 2: 'Taxes burden citizens unfairly.'</p>
                    <p>Question: How do perspectives differ?</p>
                    <p>Step 1: Views: Services vs. burden.</p>
                    <p>Step 2: Infer: Benefit vs. harm.</p>
                    <p>Difference: Text 1 supports, Text 2 opposes taxes.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Text 1: 'The festival was pure joy.' Text 2: 'The festival was a noisy mess.' How do the tones differ?",
                options: [
                    { text: "A) Positive vs. negative", correct: true },
                    { text: "B) Neutral vs. excited", correct: false },
                    { text: "C) Angry vs. calm", correct: false },
                    { text: "D) Sad vs. happy", correct: false }
                ],
                explanation: "'Joy' is upbeat, 'mess' is critical."
            },
            {
                title: "Question 2",
                question: "Text 1: 'Tech improves life.' Text 2: 'Tech controls us.' How do perspectives differ?",
                options: [
                    { text: "A) Optimistic vs. pessimistic", correct: true },
                    { text: "B) Factual vs. opinion", correct: false },
                    { text: "C) Past vs. present", correct: false },
                    { text: "D) Simple vs. complex", correct: false }
                ],
                explanation: "Text 1 sees benefits, Text 2 sees drawbacks."
            }
        ],
        additionalExample: {
            title: "Example: Subtle Tone and Perspective",
            content: `
                <h2>Example: Subtle Tone and Perspective</h2>
                <p>Text 1: 'Change is inevitable, thankfully.'</p>
                <p>Text 2: 'Change is coming, alas.'</p>
                <p>Question: How do tone and perspective differ?</p>
                <p>Step 1: Tone: 'Thankfully' (relief) vs. 'alas' (regret).</p>
                <p>Step 2: Perspective: Positive vs. negative on change.</p>
                <p>Difference: Text 1 welcomes, Text 2 laments change.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Synthesizing Information from Multiple Sources",
        examples: [
            {
                title: "Example: Combining Main Points",
                content: `
                    <h2>Example: Combining Main Points</h2>
                    <p>Text 1: 'Forests store carbon, aiding climate.'</p>
                    <p>Text 2: 'Deforestation harms wildlife habitats.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Main ideas: Carbon storage, habitat loss.</p>
                    <p>Step 2: Combine: Forests’ role and risks.</p>
                    <p>Synthesis: Forests help climate but losing them hurts wildlife.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Reconciling Evidence",
                content: `
                    <h2>Example: Reconciling Evidence</h2>
                    <p>Text 1: 'Studies show coffee boosts focus.'</p>
                    <p>Text 2: 'Reports link coffee to jitters.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Evidence: Focus gain, jitter risk.</p>
                    <p>Step 2: Synthesize: Dual effects.</p>
                    <p>Synthesis: Coffee enhances focus but may cause jitters.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Text 1: 'Books educate us.' Text 2: 'Books entertain us.' What’s a synthesis?",
                options: [
                    { text: "A) Books educate and entertain", correct: true },
                    { text: "B) Books only educate", correct: false },
                    { text: "C) Books are boring", correct: false },
                    { text: "D) Books replace TV", correct: false }
                ],
                explanation: "Combines education and entertainment as dual roles."
            },
            {
                title: "Question 2",
                question: "Text 1: 'Cities reduce travel time.' Text 2: 'Cities increase pollution.' What’s a synthesis?",
                options: [
                    { text: "A) Cities cut travel but raise pollution", correct: true },
                    { text: "B) Cities are clean", correct: false },
                    { text: "C) Travel is slow in cities", correct: false },
                    { text: "D) Pollution is low in cities", correct: false }
                ],
                explanation: "Merges benefits and drawbacks of cities."
            }
        ],
        additionalExample: {
            title: "Example: Complex Synthesis",
            content: `
                <h2>Example: Complex Synthesis</h2>
                <p>Text 1: 'AI speeds up work.'</p>
                <p>Text 2: 'AI threatens jobs.'</p>
                <p>Question: What’s a synthesis?</p>
                <p>Step 1: Ideas: Efficiency vs. job loss.</p>
                <p>Step 2: Combine: Trade-offs of AI.</p>
                <p>Synthesis: AI boosts productivity but risks employment.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Cross Text Connections question arrays
const comparingIdeasQuestions = [
    {
        question: "Text 1: 'Voting shapes democracy.' Text 2: 'Voting is a waste of time.' How do the main ideas compare?",
        answers: [
            { text: "A) They oppose each other", correct: true },
            { text: "B) They support each other", correct: false },
            { text: "C) They are unrelated", correct: false },
            { text: "D) They are neutral", correct: false }
        ],
        explanation: "'Shapes democracy' vs. 'waste' shows conflicting views on voting.",
        difficulty: "easy",
        category: "cross-text-connections"
    }
];

const evaluatingEvidenceQuestions = [
    {
        question: "Text 1: 'Experts say meditation calms.' Text 2: 'I felt calm once meditating.' Which has stronger evidence?",
        answers: [
            { text: "A) Text 1", correct: true },
            { text: "B) Text 2", correct: false },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is strong", correct: false }
        ],
        explanation: "Expert consensus outweighs a single personal experience.",
        difficulty: "medium",
        category: "cross-text-connections"
    }
];

const tonePerspectiveQuestions = [
    {
        question: "Text 1: 'The law is a triumph!' Text 2: 'The law fails us.' How do the tones differ?",
        answers: [
            { text: "A) Positive vs. negative", correct: true },
            { text: "B) Neutral vs. angry", correct: false },
            { text: "C) Sad vs. joyful", correct: false },
            { text: "D) Calm vs. excited", correct: false }
        ],
        explanation: "'Triumph' is celebratory, 'fails' is critical.",
        difficulty: "easy",
        category: "cross-text-connections"
    }
];

const synthesizingQuestions = [
    {
        question: "Text 1: 'Trade boosts economies.' Text 2: 'Trade harms local jobs.' What’s a synthesis?",
        answers: [
            { text: "A) Trade grows economies but costs jobs", correct: true },
            { text: "B) Trade only helps economies", correct: false },
            { text: "C) Jobs increase with trade", correct: false },
            { text: "D) Trade has no effect", correct: false }
        ],
        explanation: "Combines economic gain with job loss for a balanced view.",
        difficulty: "medium",
        category: "cross-text-connections"
    }
];

// lesson-cross-text-connections.js

let categoryStats = {
    "cross-text-connections": { correct: 0, incorrect: 0 }
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
            categoryStats["cross-text-connections"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["cross-text-connections"].incorrect++;
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
            categoryStats["cross-text-connections"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["cross-text-connections"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = comparingIdeasQuestions; break;
        case 2: quizQuestions = evaluatingEvidenceQuestions; break;
        case 3: quizQuestions = tonePerspectiveQuestions; break;
        case 4: quizQuestions = synthesizingQuestions; break;
        default: quizQuestions = comparingIdeasQuestions;
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
    localStorage.setItem(`cross-text-connections-lessonScore-${lessonId}`, score);
    console.log(`Saved cross-text-connections-lessonScore-${lessonId}: ${score}`);
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