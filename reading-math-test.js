const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const continueButton = document.getElementById("continue-btn");
const countdownEl = document.getElementById('countdown');

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {}; // Tracks { category: { correct: 0, incorrect: 0 } }
let results = localStorage.getItem("testResults");
results = results ? JSON.parse(results) : {};
let refreshIntervalId;
let isMathTest = false;
let time;

const readingWritingQuestions = [
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
    },
    {
        question: "Daniel stepped into the office, straightening his tie as he took in the bustling atmosphere. Conversations hummed around him, and the clatter of keyboards filled the air. He had spent weeks preparing for this moment, yet a small knot of doubt twisted in his stomach. He took a deep breath and walked toward his desk, reminding himself that everyone had to start somewhere.<br/><br/>What does the passage suggest about Daniel's attitude toward his new job?",
        answers: [
            { text: "He is uncertain about his abilities but determined to prove himself.", correct: true },
            { text: "He is uninterested in the work and only took the job for financial reasons.", correct: false },
            { text: "He is confident that he will excel without any major challenges.", correct: false },
            { text: "He regrets accepting the position and is considering quitting.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },
];

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
];

function startReadingWritingTest() {
    isMathTest = false;
    time = 64 * 60;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endReadingWritingTest, 3840000); // 64 minutes in milliseconds
    startQuiz(readingWritingQuestions, 18, 18, 18);
}

function startMathTest() {
    isMathTest = true;
    time = 44 * 60;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endMathTest, 2640000); // 44 minutes in milliseconds
    startQuiz(mathQuestions, 14, 15, 15);
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    if (time === 0) {
        clearInterval(refreshIntervalId);
        if (isMathTest) {
            endMathTest();
        } else {
            endReadingWritingTest();
        }
    } else {
        time--;
    }
}

function endReadingWritingTest() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
}

function endMathTest() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
}

function startQuiz(questions, numEasy, numMedium, numHard) {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};
    selectedQuestions = selectRandomQuestions(questions, numEasy, numMedium, numHard);
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

    nextButton.style.display = "block"; // Ensure Next button is visible
    nextButton.disabled = false; // Ensure Next button is enabled
}

function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (selectedQuestions.length) * 3;
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    if (!isMathTest) {
        localStorage.setItem("readingScore", scaledScore);
        questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
    } else {
        let readingScore = localStorage.getItem("readingScore") || 0;
        readingScore = parseInt(readingScore, 10);
        let mathScore = scaledScore;
        localStorage.setItem("mathScore", mathScore);

        let totalSATScore = readingScore + mathScore;

        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
        scoreHistory[today] = { reading: readingScore, math: mathScore, total: totalSATScore };

        localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

        questionElement.innerHTML = `<p><strong>Reading and Writing SAT Score:</strong> ${readingScore} / 800</p>
                                    <p><strong>Math SAT Score:</strong> ${mathScore} / 800</p>
                                    <p><strong>Total SAT Score:</strong> ${totalSATScore} / 1600</p>`;
        nextButton.innerHTML = "Finish";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", () => {
            window.location.href = "https://www.brainjelli.com/user-profile";
        });
        document.getElementById("progress-bar").style.width = "100%";
    }
}

function handleNextButton() {
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
    progressBar.firstElementChild.style.width = progress + "%";
}

function recordTestResults() {
    console.log("Recording results:", categoryStats); // Debugging step

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

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Continue") {
        document.getElementById("break-message").classList.remove("hide");
        document.getElementById("question-container").classList.add("hide");
    } else {
        handleNextButton();
    }
});

continueButton.addEventListener("click", () => {
    document.getElementById("break-message").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startMathTest();
});

// Start the reading and writing test
startReadingWritingTest();