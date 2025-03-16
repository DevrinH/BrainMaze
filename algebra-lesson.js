document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    showScore();
});

const mathQuestions = [
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
    {
        question: "A company rents out bicycles for a flat fee of $12 plus $3 per hour. If a customer has $45 to spend, what is the maximum number of hours they can rent a bicycle?",
        answers: [
            { text: "A) 10 hours", correct: false },
            { text: "B) 11 hours", correct: false },
            { text: "C) 9 hours", correct: true },
            { text: "D) 8 hours", correct: false }
        ],
        explanation: "The correct answer is C) 9 hours. $45 - $12 = $33. $33 / $3 per hour = 11 hours.",
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
        explanation: "The correct answer is B) 3. 5x + 3 = 18 -> 5x = 15 -> x = 3.",
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
        explanation: "The correct answer is A) 3. 3(x - 2) = 9 -> x - 2 = 3 -> x = 5.",
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
        explanation: "The correct answer is C) 7. y = 2(3) + 1 = 6 + 1 = 7.",
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
        explanation: "The correct answer is A) 18 and 19. 18 + 19 = 37.",
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
        explanation: "The correct answer is A) x > 4. 2x - 5 > 3 -> 2x > 8 -> x > 4.",
        difficulty: "medium",
        category: "algebra"
    }
];

let categoryStats = {
    algebra: { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;

function startLesson() {
    const startLessonButton = document.getElementById('start-lesson');
    startLessonButton.style.display = 'none';
    showExample();
}

function showExample() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <h2>Example: Solving for x</h2>
        <p>Consider the equation: 2x + 3 = 7</p>
        <p>To solve for x, we need to isolate x on one side of the equation.</p>
        <p>Step 1: Subtract 3 from both sides: 2x + 3 - 3 = 7 - 3</p>
        <p>Step 2: Simplify: 2x = 4</p>
        <p>Step 3: Divide both sides by 2: 2x / 2 = 4 / 2</p>
        <p>Step 4: Simplify: x = 2</p>
        <button id="next-example">Next Example</button>
    `;
    document.getElementById('next-example').addEventListener('click', showNextExample);
}

function showNextExample() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <h2>Example: Solving for y</h2>
        <p>Consider the equation: y - 4 = 10</p>
        <p>To solve for y, we need to isolate y on one side of the equation.</p>
        <p>Step 1: Add 4 to both sides: y - 4 + 4 = 10 + 4</p>
        <p>Step 2: Simplify: y = 14</p>
        <button id="next-question">Next Question</button>
    `;
    document.getElementById('next-question').addEventListener('click', askQuestion);
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
        showNextExample3();
    } else {
        alert('Incorrect. Try again.');
        categoryStats.algebra.incorrect++;
    }
}

function showNextExample3() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <h2>Example: Evaluating a Function</h2>
        <p>Consider the function f(x) = 3x² - 2x + 1. What is the value of f(3)?</p>
        <p>Step 1: Substitute x with 3: f(3) = 3(3)² - 2(3) + 1</p>
        <p>Step 2: Calculate the square: f(3) = 3(9) - 2(3) + 1</p>
        <p>Step 3: Multiply: f(3) = 27 - 6 + 1</p>
        <p>Step 4: Simplify: f(3) = 22</p>
        <button id="next-question">Next Question</button>
    `;
    document.getElementById('next-question').addEventListener('click', askNextQuestion);
}

function askNextQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <h2>Question 2</h2>
        <p>Solve for y: y + 5 = 12</p>
        <input type="text" id="answer2" placeholder="Your answer">
        <button id="submit-answer2">Submit Answer</button>
    `;
    document.getElementById('submit-answer2').addEventListener('click', checkAnswer2);
}

function checkAnswer2() {
    const answer = document.getElementById('answer2').value;
    if (answer == '7') {
        alert('Correct!');
        categoryStats.algebra.correct++;
        showQuiz();
    } else {
        alert('Incorrect. Try again.');
        categoryStats.algebra.incorrect++;
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    showNextQuizQuestion();
}

function showNextQuizQuestion() {
    if (currentQuestionIndex < mathQuestions.length) {
        const question = mathQuestions[currentQuestionIndex];
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
        document.getElementById('submit-answer').addEventListener('click', () => checkQuizAnswer(question));
    } else {
        showFinalScore();
    }
}

function checkQuizAnswer(question) {
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
        if (currentQuestionIndex < mathQuestions.length) {
            showNextQuizQuestion();
        } else {
            showFinalScore();
        }
    } else {
        alert('Please select an answer.');
    }
}

function logFinalScore(totalCorrect, totalAttempted) {
    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    
    // Store the final score in localStorage
    localStorage.setItem("finalScore", JSON.stringify({
        correct: totalCorrect,
        attempted: totalAttempted,
        percentage: percentage
    }));

    console.log("Final score logged:", { totalCorrect, totalAttempted, percentage });
}


function showFinalScore() {
    let totalCorrect = 0;
    let totalAttempted = 0;

    for (let category in categoryStats) {
        totalCorrect += categoryStats[category].correct;
        totalAttempted += categoryStats[category].correct + categoryStats[category].incorrect;
    }

    logFinalScore(totalCorrect, totalAttempted); // Log the score before redirecting

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



    // This function is no longer needed as we are grading each question individually
function gradeQuiz() {
    console.log("Grading quiz");
    let score = 0;
    let totalQuestions = mathQuestions.length;

    mathQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (!categoryStats[question.category]) {
            categoryStats[question.category] = { correct: 0, incorrect: 0 };
        }

        if (selectedAnswer) {
            if (selectedAnswer.value === "true") {
                score++;
                categoryStats[question.category].correct++;
            } else {
                categoryStats[question.category].incorrect++;
            }
        } else {
            console.log(`No answer selected for question ${index + 1}`);
        }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    console.log(`Quiz score: ${percentage}%`);
    
    localStorage.setItem("quizPercentage", percentage); // Store percentage in localStorage
    window.location.href = "results.html"; // Redirect to results page
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

function updateDisplayedPercentage(categoryStats) {
    console.log("Updating displayed percentages");
    let percentageElement = document.getElementById("algebra-percentage");
    if (percentageElement) {
        let correct = categoryStats["algebra"]?.correct || 0;
        let incorrect = categoryStats["algebra"]?.incorrect || 0;
        let total = correct + incorrect;
        let percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        percentageElement.innerText = `Correct Answers: ${percentage}%`;
    } else {
        console.warn("Percentage element not found.");
    }
}

function showScore(correct, incorrect) {
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