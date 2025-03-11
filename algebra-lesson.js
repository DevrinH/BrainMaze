const mathQuestions = [
    {
        question: "The function f(x) is defined as f(x) = 2x² - 3x + 5. What is the value of f(4)?",
        answers: [
            { text: "A) 27", correct: false },
            { text: "B) 29", correct: true },
            { text: "C) 31", correct: false },
            { text: "D) 25", correct: false }
        ],
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "A company rents out bicycles for a flat fee of $12 plus $3 per hour. If a customer has $45 to spend, what is the maximum number of hours they can rent a bicycle?",
        answers: [
            { text: "A) 10 hours", correct: false },
            { text: "B) 11 hours", correct: false },
            { text: "C) 9 hours", correct: true },
            { text: "D) 8 hours", correct: false }
        ],
        difficulty: "medium",
        category: "algebra"
    },
    {
        question: "Solve for x: 5x + 3 = 18",
        answers: [
            { text: "A) 2", correct: false },
            { text: "B) 3", correct: true },
            { text: "C) 4", correct: false },
            { text: "D) 5", correct: false }
        ],
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "If 3(x - 2) = 9, what is the value of x?",
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 5", correct: false },
            { text: "D) 6", correct: false }
        ],
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "If y = 2x + 1, what is the value of y when x = 3?",
        answers: [
            { text: "A) 5", correct: false },
            { text: "B) 6", correct: false },
            { text: "C) 7", correct: true },
            { text: "D) 8", correct: false }
        ],
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "The sum of two consecutive integers is 37. What are the integers?",
        answers: [
            { text: "A) 18 and 19", correct: true },
            { text: "B) 17 and 18", correct: false },
            { text: "C) 19 and 20", correct: false },
            { text: "D) 16 and 17", correct: false }
        ],
        difficulty: "medium",
        category: "algebra"
    },
    {
        question: "What is the solution to the inequality 2x - 5 > 3?",
        answers: [
            { text: "A) x > 4", correct: true },
            { text: "B) x < 4", correct: false },
            { text: "C) x > 1", correct: false },
            { text: "D) x < 1", correct: false }
        ],
        difficulty: "medium",
        category: "algebra"
    }
];

let categoryStats = {
    algebra: { correct: 0, incorrect: 0 }
};

document.getElementById('start-lesson').addEventListener('click', startLesson);

function startLesson() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <h2>Understanding Algebra</h2>
        <p>Algebra is the study of mathematical symbols and the rules for manipulating these symbols.</p>
        <button id="next-step">Next</button>
    `;
    document.getElementById('next-step').addEventListener('click', showExample);
}

function showExample() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <h2>Example: Solving for x</h2>
        <p>Consider the equation: 2x + 3 = 7</p>
        <p>To solve for x, we need to isolate x on one side of the equation.</p>
        <button id="next-example">Next Example</button>
    `;
    document.getElementById('next-example').addEventListener('click', askQuestion);
}

function askQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <h2>Question 1</h2>
        <p>Solve for x: 3x - 4 = 5</p>
        <input type="text" id="answer1" placeholder="Your answer">
        <button id="submit-answer1">Submit Answer</button>
    `;
    document.getElementById('submit-answer1').addEventListener('click', checkAnswer1);
}

function checkAnswer1() {
    const answer = document.getElementById('answer1').value;
    if (answer == '3') {
        alert('Correct!');
        categoryStats.algebra.correct++;
        showQuiz();
    } else {
        alert('Incorrect. Try again.');
        categoryStats.algebra.incorrect++;
    }
}

function showQuiz() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <h2>Final Quiz</h2>
        ${mathQuestions.map((question, index) => `
            <div class="question">
                <p>${index + 1}. ${question.question}</p>
                ${question.answers.map(answer => `
                    <input type="radio" id="q${index}a${answer.text[0]}" name="q${index}" value="${answer.correct}">
                    <label for="q${index}a${answer.text[0]}">${answer.text}</label><br>
                `).join('')}
            </div>
        `).join('')}
        <button id="submit-quiz">Submit Quiz</button>
    `;
    document.getElementById('submit-quiz').addEventListener('click', gradeQuiz);
}

function gradeQuiz() {
    let score = 0;
    mathQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === 'true') {
            score++;
            categoryStats[question.category].correct++;
        } else {
            categoryStats[question.category].incorrect++;
        }
    });

    alert(`You scored ${score}/${mathQuestions.length}`);
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
function startLesson() {
    console.log("startLesson function called");
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent) {
        lessonContent.innerHTML = "test";
    } else {
        console.log("lesson-content element not found");
    }
}
console.log("Start Lesson Button:", document.getElementById('start-lesson'));
document.getElementById('start-lesson').addEventListener('click', startLesson);