document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButtons = document.querySelectorAll('.start-lesson');
    startLessonButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const lessonLevel = event.target.dataset.lessonLevel;
            startLesson(lessonLevel);
        });
    });

    showScore();
});

const lessons = {
    beginner: {
        examples: [
            {
                title: "Example: Solving for x",
                content: `
                    <p>Consider the equation: 2x + 3 = 7</p>
                    <p>To solve for x, we need to isolate x on one side of the equation.</p>
                    <p>Step 1: Subtract 3 from both sides: 2x + 3 - 3 = 7 - 3</p>
                    <p>Step 2: Simplify: 2x = 4</p>
                    <p>Step 3: Divide both sides by 2: 2x / 2 = 4 / 2</p>
                    <p>Step 4: Simplify: x = 2</p>
                `
            },
            {
                title: "Example: Solving for y",
                content: `
                    <p>Consider the equation: y - 4 = 10</p>
                    <p>To solve for y, we need to isolate y on one side of the equation.</p>
                    <p>Step 1: Add 4 to both sides: y - 4 + 4 = 10 + 4</p>
                    <p>Step 2: Simplify: y = 14</p>
                `
            }
        ],
        questions: [
            {
                question: "Solve for x: 3x - 4 = 5",
                answers: [
                    { text: "A) 2", correct: false },
                    { text: "B) 3", correct: true },
                    { text: "C) 4", correct: false },
                    { text: "D) 5", correct: false }
                ],
                explanation: "The correct answer is B) 3. 3x - 4 = 5 -> 3x = 9 -> x = 3.",
                difficulty: "easy",
                category: "algebra"
            },
            // ... more beginner questions
        ]
    },
    intermediate: {
        examples: [
            {
                title: "Example: Evaluating a Function",
                content: `
                    <p>Consider the function f(x) = 3x² - 2x + 1. What is the value of f(3)?</p>
                    <p>Step 1: Substitute x with 3: f(3) = 3(3)² - 2(3) + 1</p>
                    <p>Step 2: Calculate the square: f(3) = 3(9) - 2(3) + 1</p>
                    <p>Step 3: Multiply: f(3) = 27 - 6 + 1</p>
                    <p>Step 4: Simplify: f(3) = 22</p>
                `
            },
            // ... more intermediate examples
        ],
        questions: [
            {
                question: "The function f(x) is defined as f(x) = 2x² - 3x + 5. What is the value of f(4)?",
                answers: [
                    { text: "A) 27", correct: false },
                    { text: "B) 29", correct: true },
                    { text: "C) 31", correct: false },
                    { text: "D) 25", correct: false }
                ],
                explanation: "The correct answer is B) 29. f(4) = 2(4)² - 3(4) + 5 = 32 - 12 + 5 = 25.",
                difficulty: "easy",
                category: "algebra"
            },
            // ... more intermediate questions
        ]
    },
    // ... add more lessons as needed
};

let categoryStats = {
    beginner: { correct: 0, incorrect: 0 },
    intermediate: { correct: 0, incorrect: 0 },
    // ... add more categories as needed
};

let currentLessonLevel = '';
let currentQuestionIndex = 0;

function startLesson(lessonLevel) {
    currentLessonLevel = lessonLevel;
    const startLessonButton = document.querySelector(`.start-lesson[data-lesson-level="${lessonLevel}"]`);
    startLessonButton.style.display = 'none';
    showExample(0);
}

function showExample(exampleIndex) {
    const lessonContent = document.getElementById('lesson-content');
    const example = lessons[currentLessonLevel].examples[exampleIndex];
    lessonContent.innerHTML = `
        <h2>${example.title}</h2>
        ${example.content}
        <button id="next-example">Next Example</button>
    `;
    document.getElementById('next-example').addEventListener('click', () => {
        if (exampleIndex + 1 < lessons[currentLessonLevel].examples.length) {
            showExample(exampleIndex + 1);
        } else {
            askQuestion(0);
        }
    });
}

function askQuestion(questionIndex) {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLessonLevel].questions[questionIndex];
    lessonContent.innerHTML = `
        <h2>Question ${questionIndex + 1}</h2>
        <p>${question.question}</p>
        ${question.answers.map((answer, index) => `
            <input type="radio" id="q${questionIndex}a${index}" name="q${questionIndex}" value="${answer.correct}">
            <label for="q${questionIndex}a${index}">${answer.text}</label><br>
        `).join('')}
        <button id="submit-answer">Submit Answer</button>
    `;
    document.getElementById('submit-answer').addEventListener('click', () => checkAnswer(question, questionIndex));
}

function checkAnswer(question, questionIndex) {
    const selectedAnswer = document.querySelector(`input[name="q${questionIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats[currentLessonLevel].correct++;
        } else {
            alert(`Incorrect. ${question.explanation}`);
            categoryStats[currentLessonLevel].incorrect++;
        }
        if (questionIndex + 1 < lessons[currentLessonLevel].questions.length) {
            askQuestion(questionIndex + 1);
        } else {
            showFinalScore();
        }
    } else {
        alert('Please select an answer.');
    }
}

function showFinalScore() {
    let totalCorrect = categoryStats[currentLessonLevel].correct;
    let totalAttempted = totalCorrect + categoryStats[currentLessonLevel].incorrect;
    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    const finalScoreElement = document.getElementById('final-score');
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = ''; // Clear lesson content
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

    console.log("Previous testResults from localStorage:", results);

    if (typeof results !== "object" || Array.isArray(results)) {
        console.error("Error: results should be an object but got", results);
        results = {};
    }

    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        console.log(`Before update -> ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
        console.log(`After update -> ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
    }
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Final stored testResults:", results);

    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

function showScore() {
    // Store only the latest quiz results
    let lastScore = { correct, incorrect };

    // Save last score to localStorage
    localStorage.setItem("lastQuizScore", JSON.stringify(lastScore));

    // Calculate percentage
    const total = correct + incorrect;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Update UI if element exists
    const percentageElement = document.getElementById("quiz-percentage");
    if (percentageElement) {
        percentageElement.textContent = `Correct Answers: ${percentage}% (${correct}/${total})`;
    }
}
