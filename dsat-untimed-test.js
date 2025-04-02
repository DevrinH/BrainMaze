const passageElement = document.getElementById("passage");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const continueButton = document.getElementById("continue-btn");
const satIntroContainer = document.getElementById("sat-intro-container");
const startTestButton = document.getElementById("start-test-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {};
let results = localStorage.getItem("testResults");
results = results ? JSON.parse(results) : {};
let isMathTest = false;
let userResponses = [];
let currentModule = 1;
let module1Score = 0;

const readingWritingQuestions = {
    easy: [
        {
            passage: "Emma felt uneasy as she entered the ballroom, despite her excitement.",
            question: "What does the passage suggest about Emma’s feelings?",
            answers: [
                { text: "A) She feels out of place.", correct: true },
                { text: "B) She is eager to dance.", correct: false },
                { text: "C) She loves the chandeliers.", correct: false },
                { text: "D) She is confident.", correct: false },
            ],
            type: "reading",
            difficulty: "easy",
            category: "inference"
        },
        {
            passage: "The scientist stared at unexpected data, doubting her calculations.",
            question: "What word best describes the scientist’s reaction?",
            answers: [
                { text: "A) Skepticism", correct: true },
                { text: "B) Joy", correct: false },
                { text: "C) Relief", correct: false },
                { text: "D) Confidence", correct: false },
            ],
            type: "reading",
            difficulty: "easy",
            category: "vocabulary"
        }
    ],
    medium: [
        {
            passage: "Daniel took a deep breath before starting his new job, unsure but determined.",
            question: "What does the passage imply about Daniel?",
            answers: [
                { text: "A) He is hesitant yet motivated.", correct: true },
                { text: "B) He dislikes his job.", correct: false },
                { text: "C) He is overconfident.", correct: false },
                { text: "D) He plans to quit.", correct: false },
            ],
            type: "reading",
            difficulty: "medium",
            category: "inference"
        },
        {
            passage: "Liam doubted his manuscript’s impact after months of work.",
            question: "Which sentence best shows Liam’s uncertainty?",
            answers: [
                { text: "A) 'Liam doubted his manuscript’s impact.'", correct: true },
                { text: "B) 'He worked for months.'", correct: false },
                { text: "C) 'He set his pen down.'", correct: false },
                { text: "D) 'He exhaled slowly.'", correct: false },
            ],
            type: "reading",
            difficulty: "medium",
            category: "command-of-evidence"
        }
    ],
    hard: [
        {
            passage: "The data contradicted her hypothesis, leaving her perplexed.",
            question: "What evidence best supports her confusion?",
            answers: [
                { text: "A) 'The data contradicted her hypothesis.'", correct: false },
                { text: "B) 'Leaving her perplexed.'", correct: true },
                { text: "C) 'She adjusted her glasses.'", correct: false },
                { text: "D) 'She tapped her desk.'", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "command-of-evidence"
        }
    ]
};

const mathQuestions = {
    easy: [
        {
            passage: "",
            question: "If 2x + 5 = 13, what is x?",
            answers: [
                { text: "A) 4", correct: true },
                { text: "B) 5", correct: false },
                { text: "C) 6", correct: false },
                { text: "D) 3", correct: false }
            ],
            difficulty: "easy",
            category: "algebra"
        }
    ],
    medium: [
        {
            passage: "",
            question: "A bike rental costs $12 plus $3 per hour. Max budget: $45. Max hours?",
            answers: [
                { text: "A) 10", correct: false },
                { text: "B) 11", correct: false },
                { text: "C) 9", correct: true },
                { text: "D) 8", correct: false }
            ],
            difficulty: "medium",
            category: "algebra"
        }
    ],
    hard: [
        {
            passage: "",
            question: "Airplane flies 1,500 miles: 500 mph against wind, 600 mph with wind. Total time?",
            answers: [
                { text: "A) 2.5 hours", correct: false },
                { text: "B) 2.6 hours", correct: false },
                { text: "C) 2.8 hours", correct: false },
                { text: "D) 2.75 hours", correct: true }
            ],
            difficulty: "hard",
            category: "advanced-math"
        },
        {
            passage: "",
            question: "Car depreciates 15% yearly from $30,000. Value after 3 years?",
            answers: [
                { text: "A) $18,520", correct: false },
                { text: "B) $19,275", correct: true },
                { text: "C) $20,250", correct: false },
                { text: "D) $21,000", correct: false }
            ],
            difficulty: "hard",
            category: "advanced-math"
        }
    ]
};

function startTest() {
    satIntroContainer.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startReadingWritingTest();
}

function startReadingWritingTest() {
    isMathTest = false;
    currentModule = 1;
    userResponses = [];
    startModule(readingWritingQuestions, 2, 1, 1, "Reading and Writing Module 1");
}

function startMathTest() {
    isMathTest = true;
    currentModule = 1;
    startModule(mathQuestions, 1, 1, 1, "Math Module 1");
}

function startModule(questions, numEasy, numMedium, numHard, moduleName) {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};
    selectedQuestions = selectRandomQuestions(questions, numEasy, numMedium, numHard);
    nextButton.innerHTML = "Next";
    passageElement.innerHTML = `<h3>${moduleName}</h3>`;
    showQuestion();
}

function selectRandomQuestions(questions, numEasy, numMedium, numHard) {
    function getRandom(arr, num) {
        return arr.sort(() => 0.5 - Math.random()).slice(0, Math.min(num, arr.length));
    }
    const easy = getRandom(questions.easy || [], numEasy);
    const medium = getRandom(questions.medium || [], numMedium);
    const hard = getRandom(questions.hard || [], numHard);
    return [...easy, ...medium, ...hard];
}

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    passageElement.innerHTML += `<p>${currentQuestion.passage}</p>`;
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
    nextButton.classList.remove("centered-btn");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionCategory = currentQuestion.category.toLowerCase().replace(/\s+/g, "-");
    let questionDifficulty = currentQuestion.difficulty;

    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    const correctAnswer = currentQuestion.answers.find(ans => ans.correct).text;
    userResponses.push({
        question: currentQuestion.passage + "<br/>" + currentQuestion.question,
        userAnswer: selectedBtn.innerHTML,
        correctAnswer: correctAnswer,
        wasCorrect: isCorrect
    });

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        score += (questionDifficulty === "easy" ? 1 : questionDifficulty === "medium" ? 2 : 3);
        categoryStats[questionCategory].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats[questionCategory].incorrect++;
    }

    recordTestResults();

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.disabled = false;
}

function handleNextButton() {
    recordTestResults();
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        if (currentModule === 1) {
            module1Score = correctAnswers;
            currentModule = 2;
            if (isMathTest) {
                startModule(mathQuestions, module1Score >= 2 ? 0 : 1, module1Score >= 2 ? 1 : 1, module1Score >= 2 ? 2 : 1, "Math Module 2");
            } else {
                startModule(readingWritingQuestions, module1Score >= 2 ? 0 : 1, module1Score >= 2 ? 1 : 1, module1Score >= 2 ? 2 : 1, "Reading and Writing Module 2");
            }
        } else {
            if (isMathTest) {
                endMathTest();
            } else {
                endReadingWritingTest();
            }
        }
    }
}

function endReadingWritingTest() {
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
    document.querySelector(".question-row").classList.remove("score-display");
    nextButton.classList.remove("centered-btn");
}

function endMathTest() {
    resetState();
    showScore();
}

function showScore() {
    resetState();
    let maxPossibleScore = (isMathTest ? 6 : 6);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    document.getElementById("question-container").classList.remove("hide");

    if (!isMathTest) {
        localStorage.setItem("readingScore", scaledScore);
        passageElement.innerHTML = "";
        questionElement.innerHTML = `Reading and Writing Score: ${scaledScore} / 800`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
    } else {
        let readingScore = parseInt(localStorage.getItem("readingScore") || 0, 10);
        let mathScore = scaledScore;
        localStorage.setItem("mathScore", mathScore);
        let totalSATScore = readingScore + mathScore;

        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
        scoreHistory[today] = { reading: readingScore, math: mathScore, total: totalSATScore };
        localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>Reading and Writing Score:</strong> ${readingScore} / 800</p>
                                    <p><strong>Math Score:</strong> ${mathScore} / 800</p>
                                    <p><strong>Total DSAT Score:</strong> ${totalSATScore} / 1600</p>`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Review Incorrect Answers";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", showExplanations);
    }
}

function showExplanations() {
    resetState();
    passageElement.innerHTML = "";
    questionElement.innerHTML = "<h2>Review of Incorrect Answers</h2>";

    const incorrectResponses = userResponses.filter(response => !response.wasCorrect);

    if (incorrectResponses.length === 0) {
        questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
    } else {
        incorrectResponses.forEach((response, index) => {
            const explanation = generateExplanation(response);
            questionElement.innerHTML += `
                <div class="explanation">
                    <h3>Question ${index + 1}</h3>
                    <p><strong>Question:</strong> ${response.question}</p>
                    <p><strong>Your Answer:</strong> ${response.userAnswer}</p>
                    <p><strong>Correct Answer:</strong> ${response.correctAnswer}</p>
                    <p><strong>Explanation:</strong> ${explanation}</p>
                </div>
            `;
        });
    }

    nextButton.innerHTML = "Finish";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", showExplanations);
    nextButton.addEventListener("click", () => {
        window.location.href = "https://www.brainjelli.com/user-profile";
    });
}

function generateExplanation(response) {
    const questionText = response.question;
    if (questionText.includes("Emma felt uneasy")) return "Emma’s unease despite excitement suggests discomfort.";
    if (questionText.includes("Daniel took a deep breath")) return "His hesitation and determination show resolve.";
    if (questionText.includes("Liam doubted his manuscript")) return "The doubt explicitly shows uncertainty.";
    if (questionText.includes("The scientist stared")) return "Skepticism fits her doubt in the data.";
    if (questionText.includes("Airplane flies 1,500 miles")) return "Time = 750/500 + 750/600 = 2.75 hours.";
    if (questionText.includes("Car depreciates 15%")) return "Value = $30,000 × 0.85³ ≈ $19,275.";
    if (questionText.includes("bike rental costs $12")) return "12 + 3h ≤ 45, h = 9 hours max.";
    if (questionText.includes("If 2x + 5 = 13")) return "2x = 8, x = 4.";
    return "No specific explanation available.";
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar-test");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.firstElementChild.style.width = progress + "%";
}

function recordTestResults() {
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};

    if (typeof results !== "object" || Array.isArray(results)) {
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

    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
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

function showIntroMessage() {
    resetState();
    passageElement.innerHTML = "";
    questionElement.innerHTML = "This is an untimed Digital SAT Test with adaptive modules.";
    questionElement.classList.add("centered-score");

    const startButton = document.createElement("button");
    startButton.innerHTML = "Start Test";
    startButton.classList.add("btn", "centered-btn");
    startButton.addEventListener("click", () => {
        questionElement.classList.remove("centered-score");
        startReadingWritingTest();
    });
    answerButtons.appendChild(startButton);
}

startTestButton.addEventListener("click", startTest);