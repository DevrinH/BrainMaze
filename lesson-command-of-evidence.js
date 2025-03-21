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
        title: "Textual Evidence",
        examples: [
            {
                title: "Example: Identifying Textual Evidence",
                content: `
                    <h2>Example: Identifying Textual Evidence</h2>
                    <p>Passage: 'The new policy reduced emissions by 20% in its first year.'</p>
                    <p>Question: What evidence supports the claim that the policy was effective?</p>
                    <p>Step 1: Identify the claim: The policy was effective.</p>
                    <p>Step 2: Find supporting evidence: 'reduced emissions by 20% in its first year.'</p>
                    <p>The evidence is the specific reduction percentage.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Evaluating Evidence Relevance",
                content: `
                    <h2>Example: Evaluating Evidence Relevance</h2>
                    <p>Passage: 'Students who attended the program scored higher on tests. The program ran for 10 weeks.'</p>
                    <p>Question: Which evidence best supports improved academic performance?</p>
                    <p>Step 1: Focus on the claim: Improved academic performance.</p>
                    <p>Step 2: Evaluate: 'scored higher on tests' directly supports it; 'ran for 10 weeks' does not.</p>
                    <p>The evidence is 'scored higher on tests.'</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The forest grew denser after the conservation effort began.' What evidence supports the conservation effort’s success?",
                answer: "grew denser",
                explanation: "The claim is about success, and 'grew denser' directly shows a positive outcome."
            },
            {
                title: "Question 2",
                question: "Passage: 'The law lowered crime rates significantly. It was passed in 2015.' What supports the claim of reduced crime?",
                answer: "lowered crime rates",
                explanation: "The claim is about reduced crime, and 'lowered crime rates' is the direct evidence."
            }
        ],
        additionalExample: {
            title: "Example: Matching Evidence to Claims",
            content: `
                <h2>Example: Matching Evidence to Claims</h2>
                <p>Passage: 'The diet improved health outcomes, with participants losing an average of 10 pounds.'</p>
                <p>Question: What evidence supports better health?</p>
                <p>Step 1: Identify the claim: Better health outcomes.</p>
                <p>Step 2: Find evidence: 'losing an average of 10 pounds' supports health improvement.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Understanding Author’s Use of Evidence",
        examples: [
            {
                title: "Example: Analyzing Evidence Purpose",
                content: `
                    <h2>Example: Analyzing Evidence Purpose</h2>
                    <p>Passage: 'Studies show a 15% increase in productivity after the change.'</p>
                    <p>Question: Why does the author include this evidence?</p>
                    <p>Step 1: Identify the evidence: '15% increase in productivity.'</p>
                    <p>Step 2: Determine purpose: To quantify and strengthen the claim of improvement.</p>
                    <p>The author uses it to provide concrete support.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Evidence Strength",
                content: `
                    <h2>Example: Evidence Strength</h2>
                    <p>Passage: 'Experts agree the method works, backed by decades of research.'</p>
                    <p>Question: How does this evidence strengthen the argument?</p>
                    <p>Step 1: Identify evidence: 'decades of research.'</p>
                    <p>Step 2: Analyze: It adds credibility and depth to the expert agreement.</p>
                    <p>It makes the claim more convincing.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The initiative cut costs by 30%, according to a recent survey.' Why include 'recent survey'?",
                answer: "credibility",
                explanation: "It adds reliability and timeliness to the 30% cost reduction claim."
            },
            {
                title: "Question 2",
                question: "Passage: 'Historical data shows a consistent trend of growth.' How does this evidence help?",
                answer: "consistency",
                explanation: "It strengthens the claim by showing a reliable pattern over time."
            }
        ],
        additionalExample: {
            title: "Example: Evidence Type",
            content: `
                <h2>Example: Evidence Type</h2>
                <p>Passage: 'Testimonials from users highlight the product’s ease of use.'</p>
                <p>Question: What role do testimonials play?</p>
                <p>Step 1: Identify evidence: 'testimonials from users.'</p>
                <p>Step 2: Analyze: They provide personal, relatable support for the claim.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Data Interpretation in Texts",
        examples: [
            {
                title: "Example: Reading a Graph",
                content: `
                    <h2>Example: Reading a Graph</h2>
                    <p>Graph: Shows a 25% rise in sales from 2019 to 2020.</p>
                    <p>Question: What does the graph indicate about sales?</p>
                    <p>Step 1: Examine the data: 25% rise.</p>
                    <p>Step 2: Interpret: Sales increased significantly in one year.</p>
                    <p>The graph shows growth.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Data and Claims",
                content: `
                    <h2>Example: Data and Claims</h2>
                    <p>Table: 60% of students passed in 2020 vs. 45% in 2019.</p>
                    <p>Question: What claim does this support?</p>
                    <p>Step 1: Compare data: 60% vs. 45%.</p>
                    <p>Step 2: Interpret: It supports a claim of improved pass rates.</p>
                    <p>The table backs academic improvement.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Graph: Population grew from 1,000 to 1,200 over 5 years. What does this show?",
                answer: "growth",
                explanation: "The increase from 1,000 to 1,200 indicates population growth."
            },
            {
                title: "Question 2",
                question: "Table: Emissions dropped from 500 tons to 400 tons. What claim is supported?",
                answer: "reduction",
                explanation: "The drop from 500 to 400 tons supports a claim of reduced emissions."
            }
        ],
        additionalExample: {
            title: "Example: Data Trends",
            content: `
                <h2>Example: Data Trends</h2>
                <p>Graph: Test scores rose steadily from 70 to 85 over 3 years.</p>
                <p>Question: What trend does this suggest?</p>
                <p>Step 1: Analyze: Steady rise from 70 to 85.</p>
                <p>Step 2: Conclude: It suggests consistent improvement.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Cross-Text Evidence Comparison",
        examples: [
            {
                title: "Example: Comparing Evidence",
                content: `
                    <h2>Example: Comparing Evidence</h2>
                    <p>Text 1: 'The policy cut costs by 10%.' Text 2: 'Savings were minimal, around 5%.'</p>
                    <p>Question: How do the texts differ on the policy’s impact?</p>
                    <p>Step 1: Identify evidence: 10% vs. 5%.</p>
                    <p>Step 2: Compare: Text 1 claims a higher impact than Text 2.</p>
                    <p>They disagree on magnitude.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Evidence Alignment",
                content: `
                    <h2>Example: Evidence Alignment</h2>
                    <p>Text 1: 'Attendance rose by 20%.' Text 2: 'More people attended than ever before.'</p>
                    <p>Question: Do the texts agree?</p>
                    <p>Step 1: Compare: 20% rise vs. record attendance.</p>
                    <p>Step 2: Conclude: Both suggest an increase, though differently phrased.</p>
                    <p>They align on the trend.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Text 1: 'Sales doubled.' Text 2: 'Sales grew by 50%.' Do they agree?",
                answer: "no",
                explanation: "Doubling (100%) is greater than 50%, so they conflict."
            },
            {
                title: "Question 2",
                question: "Text 1: 'The drug worked in 80% of cases.' Text 2: 'Most patients recovered.' Do they align?",
                answer: "yes",
                explanation: "80% and 'most' both indicate a high success rate."
            }
        ],
        additionalExample: {
            title: "Example: Evidence Strength Comparison",
            content: `
                <h2>Example: Evidence Strength Comparison</h2>
                <p>Text 1: 'A study of 1,000 people showed benefits.' Text 2: 'Anecdotes suggest it works.'</p>
                <p>Question: Which evidence is stronger?</p>
                <p>Step 1: Compare: Study of 1,000 vs. anecdotes.</p>
                <p>Step 2: Evaluate: The study is more rigorous and reliable.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Command of Evidence question arrays
const textualEvidenceQuestions = [
    {
        question: "Passage: 'The species population increased by 30% after protections were enacted.' What evidence supports the protections’ success?",
        answers: [
            { text: "A) increased by 30%", correct: true },
            { text: "B) protections were enacted", correct: false },
            { text: "C) species population", correct: false },
            { text: "D) after", correct: false }
        ],
        explanation: "'Increased by 30%' directly shows a successful outcome.",
        difficulty: "easy",
        category: "command-of-evidence"
    }
];

const authorUseOfEvidenceQuestions = [
    {
        question: "Passage: 'Research spanning 20 years confirms the theory.' Why does the author include '20 years'?",
        answers: [
            { text: "A) To show reliability", correct: true },
            { text: "B) To confuse readers", correct: false },
            { text: "C) To fill space", correct: false },
            { text: "D) To mention time", correct: false }
        ],
        explanation: "'20 years' adds credibility by showing extensive research.",
        difficulty: "medium",
        category: "command-of-evidence"
    }
];

const dataInterpretationQuestions = [
    {
        question: "Graph: Profits rose from $100 to $150 in a year. What does this indicate?",
        answers: [
            { text: "A) Profit growth", correct: true },
            { text: "B) Profit decline", correct: false },
            { text: "C) No change", correct: false },
            { text: "D) Data error", correct: false }
        ],
        explanation: "The increase from $100 to $150 shows profit growth.",
        difficulty: "easy",
        category: "command-of-evidence"
    }
];

const crossTextEvidenceQuestions = [
    {
        question: "Text 1: 'The program saved $1 million.' Text 2: 'Savings were negligible.' Do they agree?",
        answers: [
            { text: "A) No", correct: true },
            { text: "B) Yes", correct: false },
            { text: "C) Partially", correct: false },
            { text: "D) Unclear", correct: false }
        ],
        explanation: "$1 million is significant, contradicting 'negligible.'",
        difficulty: "medium",
        category: "command-of-evidence"
    }
];

// lesson-command-of-evidence.js

let categoryStats = {
    "command-of-evidence": { correct: 0, incorrect: 0 }
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
        <input type="text" id="answer1" placeholder="Your answer">
        <button id="submit-answer1">Submit Answer</button>
    `;
    document.getElementById('submit-answer1').addEventListener('click', checkAnswer1);
}

function checkAnswer1() {
    const answer = document.getElementById('answer1').value;
    const correctAnswer = lessons[currentLesson].questions[0].answer;
    if (answer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase()) {
        alert('Correct!');
        categoryStats["command-of-evidence"].correct++;
        showNextExample3();
    } else {
        alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
        categoryStats["command-of-evidence"].incorrect++;
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
        <input type="text" id="answer2" placeholder="Your answer">
        <button id="submit-answer2">Submit Answer</button>
    `;
    document.getElementById('submit-answer2').addEventListener('click', checkAnswer2);
}

function checkAnswer2() {
    const answer = document.getElementById('answer2').value;
    const correctAnswer = lessons[currentLesson].questions[1].answer;
    if (answer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase()) {
        alert('Correct!');
        categoryStats["command-of-evidence"].correct++;
        showQuiz();
    } else {
        alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
        categoryStats["command-of-evidence"].incorrect++;
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = textualEvidenceQuestions; break;
        case 2: quizQuestions = authorUseOfEvidenceQuestions; break;
        case 3: quizQuestions = dataInterpretationQuestions; break;
        case 4: quizQuestions = crossTextEvidenceQuestions; break;
        default: quizQuestions = textualEvidenceQuestions;
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
    localStorage.setItem(`command-of-evidence-lessonScore-${lessonId}`, score);
    console.log(`Saved command-of-evidence-lessonScore-${lessonId}: ${score}`);
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