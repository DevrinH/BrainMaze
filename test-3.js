const startingMinutes = 64;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60;
let refreshIntervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time === 0) { 
        clearInterval(refreshIntervalId);
        endQuiz();
    } else {
        time--; 
    }
}

// Function to handle quiz timeout
function endQuiz() {
    resetState();
    showScore();
}

// Automatically end test after 64 minutes
setTimeout(endQuiz, 3840000);

const questions = [
    {
        question: "Question goes here?", 
        answers: [
            { text: "A) Answer", correct: false }, 
            { text: "B) Answer.", correct: true },
            { text: "C) Answer.", correct: false },
            { text: "D) Answer.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },
    {
        question: "Question goes here?", 
        answers: [
            { text: "A) Answer", correct: false }, 
            { text: "B) Answer.", correct: true },
            { text: "C) Answer.", correct: false },
            { text: "D) Answer.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
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
    "Command of Evidence", "central-ideas", "inferences", "Words in Context", "text-structure", 
    "cross-text", "transitions", "rhetorical-synthesis", "boundaries", "algebra", 
    "advanced-math", "problem-solving", "geometry-trigonometry"
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


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};

    selectedQuestions = selectRandomQuestions(questions, 18, 18, 18);

    nextButton.innerHTML = "Next";
    showQuestion();
}



function selectRandomQuestions(questions, numEasy, numMedium, numHard) {
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

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

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

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionCategory = currentQuestion.category.toLowerCase().replace(/\s+/g, "-");

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        score += currentQuestion.difficulty === "easy" ? 1 :
                 currentQuestion.difficulty === "medium" ? 2 : 3;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Track correct/incorrect per category
    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        categoryStats[questionCategory].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats[questionCategory].incorrect++;
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block"; // Ensure Next button is visible
    nextButton.disabled = false; // Ensure Next button is enabled
}

function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    localStorage.setItem("readingScore", scaledScore);
    //localStorage.setItem("categoryTracking", JSON.stringify(categoryTracking));

    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = scaledScore;
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";

    document.getElementById("progress-bar").style.width = "100%";
   
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

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) {
        handleNextButton();
    } else {
        mathlink();
    }
});

function mathlink() {
    location.href = "https://www.brainjelli.com/math.html";
}

startQuiz();