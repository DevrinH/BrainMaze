// Combined JavaScript for Reading/Writing and Math Tests

// --- General Setup ---
const countdownEl = document.getElementById('countdown');
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

function recordTestResults() {
    console.log("Recording results:", categoryStats);
    let results = localStorage.getItem("testResults");
    results = results ? JSON.parse(results) : {};

    if (typeof results !== "object" || Array.isArray(results)) {
        console.error("Error: results should be an object but got", results);
        results = {};
    }

    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }

    localStorage.setItem("testResults", JSON.stringify(results));
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
        score += currentQuestion.difficulty === "easy" ? 1 : currentQuestion.difficulty === "medium" ? 2 : 3;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    if (isCorrect) {
        categoryStats[questionCategory].correct++;
    } else {
        categoryStats[questionCategory].incorrect++;
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.disabled = false;
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = progress + "%";
}

// --- Reading and Writing Test ---
const readingQuestions = [
    {
        question: "Emma stepped into the grand ballroom, her gown brushing against the polished floor as chandeliers cast golden light across the room. The guests moved with ease, their conversations flowing effortlessly. She had imagined this moment countless times, yet standing there now, a strange unease settled in her chest. Adjusting her gloves, she forced a smile and took a hesitant step forward, unsure if she truly belonged.<br/><br/>What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "She is eager to impress others and makes a confident entrance into the event.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    }
];

function startReadingQuiz() {
    const startingMinutes = 64;
    let time = startingMinutes * 60;
    let refreshIntervalId = setInterval(updateReadingCountdown, 1000);

    function updateReadingCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;

        if (time === 0) {
            clearInterval(refreshIntervalId);
            endReadingQuiz();
        } else {
            time--;
        }
    }

    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};
    selectedQuestions = selectRandomQuestions(readingQuestions, 18, 18, 18);
    nextButton.innerHTML = "Next";
    showQuestion();

    setTimeout(endReadingQuiz, 3840000); // 64 minutes
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

function endReadingQuiz() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    localStorage.setItem("readingScore", scaledScore);

    questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
    nextButton.innerHTML = "Continue to Math";
    nextButton.style.display = "block";
    document.getElementById("progress-bar").style.width = "100%";
}

// --- Math Test ---
const mathQuestions = [
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
    }
];

function startMathQuiz() {
    const startingMinutes = 44;
    let time = startingMinutes * 60;
    let refreshIntervalId = setInterval(updateMathCountdown, 1000);

    function updateMathCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;

        if (time === 0) {
            clearInterval(refreshIntervalId);
            endMathQuiz();
        } else {
            time--;
        }
    }

    currentQuestionIndex = 0;
    score = 0;