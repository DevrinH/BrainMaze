// Math Timer Setup (44 minutes)
setTimeout(function() {
    showScore();
}, 2640000); // 44 minutes in milliseconds

const startingMinutes = 44;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60 + 1; // Convert to seconds
let refreshIntervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time === 0) { 
        clearInterval(refreshIntervalId);
        return; // Stop execution to prevent going negative
    }

    time--; 
}
    
updateCountdown();

const questions = [

    { 
        question: "An airplane is flying from City A to City B, a total distance of 1,500 miles. The airplane flies against the wind at 500 mph for half the trip and with the wind at 600 mph for the other half. What is the total flight time?",
        answers: [
            { text: "2.5 hours", correct: false }, 
            { text: "2.6 hours", correct: false }, 
            { text: "2.8 hours", correct: false }, 
            { text: "2.75 hours", correct: true } 
        ],
        difficulty: "hard",
        category: "advanced-math"
    },
    {
        question: "A car's value depreciates by 15% each year. If the car was originally purchased for $30,000, what will its value be after 3 years, rounded to the nearest dollar?",
        answers: [
            { text: "A) $18,520", correct: false },
            { text: "B) $19,275", correct: true },
            { text: "C) $20,250", correct: false },
            { text: "D) $21,000", correct: false }
        ],
        difficulty: "hard",
        category: "advanced-math"
    },
    {
        question: "A farmer has a rectangular field that is 200 feet long and 150 feet wide. He wants to build a circular pond that takes up exactly 25% of the field’s area. What should the radius of the pond be, rounded to the nearest foot?",
        answers: [
            { text: "A) 30 feet", correct: false },
            { text: "B) 35 feet", correct: false },
            { text: "C) 40 feet", correct: false },
            { text: "D) 38 feet", correct: true }
        ],
        difficulty: "hard",
        category: "advanced-math"
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
        question: "A quadratic equation is given as x² - 6x + c = 0. If one of the roots of the equation is 4, what is the value of c?",
        answers: [
            { text: "A) 8", correct: false },
            { text: "B) 10", correct: true },
            { text: "C) 12", correct: false },
            { text: "D) 6", correct: false }
        ],
        difficulty: "hard",
        category: "advanced-math"
    },
    {
        question: "A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?",
        answers: [
            { text: "A) 15", correct: true },
            { text: "B) 18", correct: false },
            { text: "C) 21", correct: false },
            { text: "D) 13", correct: false }
        ],
        difficulty: "easy",
        category: "geometry-trigonometry"
    },
    {
        question: "A circle has a radius of 6 inches. What is the area of a sector that subtends a central angle of 120 degrees? (Round to the nearest tenth of a square inch.)",
        answers: [
            { text: "A) 37.7 square inches", correct: false },
            { text: "B) 45.2 square inches", correct: false },
            { text: "C) 48.0 square inches", correct: true },
            { text: "D) 50.5 square inches", correct: false }
        ],
        difficulty: "medium",
        category: "geometry-trigonometry"
    },
    {
        question: "In a triangle, two sides have lengths of 7 and 10. Which of the following could be the length of the third side?",
        answers: [
            { text: "A) 3", correct: false },
            { text: "B) 17", correct: false },
            { text: "C) 9", correct: true },
            { text: "D) 18", correct: false }
        ],
        difficulty: "hard",
        category: "geometry-trigonometry"
    }

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {}; // Tracks { category: { correct: 0, incorrect: 0 } }
let results = localStorage.getItem("testResults");
results = results ? JSON.parse(results) : [];

const categories = [
    "algebra", "advanced-math", "problem-solving", "geometry-trigonometry"
];

function getStoredScores() {
    return JSON.parse(localStorage.getItem("satScores")) || {};
}

function saveScores(scores) {
    localStorage.setItem("satScores", JSON.stringify(scores));
}

function recordTestResults() {
    let results = localStorage.getItem("testResults");

    // Ensure results is an object, not an array
    results = results ? JSON.parse(results) : {};

    if (typeof results !== "object" || Array.isArray(results)) {
        console.error("Error: results should be an object but got", results);
        results = {}; // Reset to an empty object if it's an array
    }

    // Update scores per category
    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        results[category].correct += categoryStats[category].correct;
        results[category].incorrect += categoryStats[category].incorrect;
    }

    // Save corrected object back to localStorage
    localStorage.setItem("testResults", JSON.stringify(results));

    console.log("Updated testResults saved to localStorage:", results);
}

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};

    // Select 44 random questions (14 easy, 15 medium, 15 hard)
    selectedQuestions = selectRandomMathQuestions(questions, 14, 15, 15);

    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to randomly select math questions
function selectRandomMathQuestions(questions, numEasy, numMedium, numHard) {
    const easyQuestions = questions.filter(q => q.difficulty === "easy");
    const mediumQuestions = questions.filter(q => q.difficulty === "medium");
    const hardQuestions = questions.filter(q => q.difficulty === "hard");

    function getRandom(arr, num) {
        return arr.sort(() => 0.5 - Math.random()).slice(0, num);
    }

    const selectedEasy = getRandom(easyQuestions, numEasy);
    const selectedMedium = getRandom(mediumQuestions, numMedium);
    const selectedHard = getRandom(hardQuestions, numHard);

    return [...selectedEasy, ...selectedMedium, ...selectedHard];
}

// Function to display the current question
function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    updateProgressBar();
}

// Function to reset the state before showing a new question
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let questionDifficulty = selectedQuestions[currentQuestionIndex].difficulty;

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;

        // Fixed weighted scoring based on difficulty
        if (questionDifficulty === "easy") {
            score += 1;
        } else if (questionDifficulty === "medium") {
            score += 2;
        } else if (questionDifficulty === "hard") {
            score += 3;
        }
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Function to display the final score
function showScore() { 
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (14 * 1) + (15 * 2) + (15 * 3);
    let rawScore = score;

    let mathScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);
    localStorage.setItem("mathScore", mathScore);

    let readingScore = localStorage.getItem("readingScore") || 0;
    readingScore = parseInt(readingScore, 10);

    let totalSATScore = readingScore + mathScore;

    // Store scores with date
    let today = new Date().toLocaleDateString("en-CA"); // Local timezone, formatted as YYYY-MM-DD
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = { reading: readingScore, math: mathScore, total: totalSATScore };

    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    // Debugging logs
    console.log("Dates:", Object.keys(scoreHistory));
    console.log("Math Scores:", Object.values(scoreHistory).map(s => s.math));
    console.log("Reading Scores:", Object.values(scoreHistory).map(s => s.reading));
    console.log("Total Scores:", Object.values(scoreHistory).map(s => s.total));

    // Display the scores
    questionElement.innerHTML = `
        <p><strong>Reading and Writing SAT Score:</strong> ${readingScore} / 800</p>
        <p><strong>Math SAT Score:</strong> ${mathScore} / 800</p>
        <p><strong>Total SAT Score:</strong> ${totalSATScore} / 1600</p>
    `;

    nextButton.innerHTML = "Finish";
    nextButton.style.display = "block";
    document.getElementById("progress-bar").style.width = "100%";

    // Update the chart
    updateScoreChart();
}


function showResults(results) {
    console.log("Results received by showResults:", results);
    if (!Array.isArray(results)) {
        console.error("Error: results is not an array!", results);
        return;
    }
    results.forEach(result => {
        console.log(result);
    });
}

// Function to handle "Next" button click
function handleNextButton() {
    console.log("Handling next button click...");

    // Store results before proceeding
    recordTestResults();

    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = progress + "%";
}

// Event listener for Next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) {
        handleNextButton();
    } else {
        homelink();
    }
});

// Function to redirect to home
function homelink() {
    location.href = "https://www.brainjelli.com/user-profile";
}



// Start the quiz
startQuiz();