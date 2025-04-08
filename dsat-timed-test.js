const passageElement = document.getElementById("passage");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const continueButton = document.getElementById("continue-btn");
const countdownEl = document.getElementById('countdown');
const satIntroContainer = document.getElementById("sat-intro-container");
const startTestButton = document.getElementById("start-test-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {};
let results = localStorage.getItem("testResults");
results = results ? JSON.parse(results) : {};
let refreshIntervalId;
let isMathTest = false;
let time;
let userResponses = [];
let currentModule = 1;
let module1Correct = 0;

const readingWritingQuestions = [
    {
        passage: "Emma stepped into the grand ballroom, her gown brushing against the polished floor as chandeliers cast golden light across the room. The guests moved with ease, their conversations flowing effortlessly. She had imagined this moment countless times, yet standing there now, a strange unease settled in her chest. Adjusting her gloves, she forced a smile and took a hesitant step forward, unsure if she truly belonged.",
        question: "What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "A) She feels out of place despite having anticipated this moment.", correct: true },
            { text: "B) She is overwhelmed by the beauty and struggles to contain excitement.", correct: false },
            { text: "C) She is intimidated by the guests and decides to leave.", correct: false },
            { text: "D) She is eager to impress others and makes a confident entrance.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },
    {
        passage: "Daniel stepped into the office, straightening his tie as he took in the bustling atmosphere. Conversations hummed around him, and the clatter of keyboards filled the air. He had spent weeks preparing for this moment, yet a small knot of doubt twisted in his stomach. He took a deep breath and walked toward his desk, reminding himself that everyone had to start somewhere.",
        question: "What does the passage suggest about Daniel's attitude toward his new job?",
        answers: [
            { text: "A) He is uncertain about his abilities but determined to prove himself.", correct: true },
            { text: "B) He is uninterested and only took the job for financial reasons.", correct: false },
            { text: "C) He is confident he will excel without challenges.", correct: false },
            { text: "D) He regrets accepting the position and considers quitting.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },
    {
        passage: "Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript. Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind. He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.",
        question: "Which choice provides the best evidence for Liam’s uncertainty about his work?",
        answers: [
            { text: "A) 'Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind.'", correct: true },
            { text: "B) 'He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.'", correct: false },
            { text: "C) 'Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript.'", correct: false },
            { text: "D) 'He had imagined this moment countless times, picturing satisfaction.'", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The scientist adjusted her glasses, peering at the data displayed on the screen. The results were unexpected—far different from what she and her team had predicted. She tapped her fingers against the desk, reviewing each calculation. There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.",
        question: "Which sentence best supports the idea that the scientist struggles to accept her findings?",
        answers: [
            { text: "A) 'The scientist adjusted her glasses, peering at the data displayed on the screen.'", correct: false },
            { text: "B) 'She tapped her fingers against the desk, reviewing each calculation.'", correct: false },
            { text: "C) 'The results were unexpected—far different from what she and her team had predicted.'", correct: false },
            { text: "D) 'There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.'", correct: true },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },
];

const mathQuestions = [
    {
        passage: "",
        question: "An airplane is flying from City A to City B, a total distance of 1,500 miles. The airplane flies against the wind at 500 mph for half the trip and with the wind at 600 mph for the other half. What is the total flight time?",
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
        passage: "",
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
        passage: "",
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
];

function startTest() {
    satIntroContainer.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startReadingWritingTest();
}

function startReadingWritingTest() {
    isMathTest = false;
    time = 32 * 60; // 32 minutes per module
    userResponses = [];
    currentModule = 1;
    module1Correct = 0;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endModule, 32 * 60 * 1000); // End after 32 minutes
    startQuiz(readingWritingQuestions, 9, 9, 9); // 27 questions per module
}

function startMathTest() {
    isMathTest = true;
    time = 35 * 60; // 35 minutes per module
    currentModule = 1;
    module1Correct = 0;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endModule, 35 * 60 * 1000); // End after 35 minutes
    startQuiz(mathQuestions, 7, 8, 7); // 22 questions per module
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    if (time === 0) {
        clearInterval(refreshIntervalId);
        endModule();
    } else {
        time--;
    }
}

function endModule() {
    clearInterval(refreshIntervalId);
    resetState();
    if (currentModule === 1) {
        module1Correct = correctAnswers;
        currentModule = 2;
        startNextModule();
    } else {
        if (!isMathTest) {
            showReadingWritingScore(); // Show score after Reading/Writing module 2
        } else {
            showFinalScore(); // Show final score after Math module 2
        }
    }
}

function startNextModule() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    score = 0;
    time = isMathTest ? 35 * 60 : 32 * 60;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endModule, (isMathTest ? 35 : 32) * 60 * 1000);
    
    const threshold = isMathTest ? 11 : 13; // 50% correct threshold for adaptivity
    if (module1Correct >= threshold) {
        startQuiz(isMathTest ? mathQuestions : readingWritingQuestions, 0, 9, 13); // More hard questions
    } else {
        startQuiz(isMathTest ? mathQuestions : readingWritingQuestions, 13, 9, 0); // More easy questions
    }
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
        return arr.sort(() => 0.5 - Math.random()).slice(0, Math.min(num, arr.length));
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
    passageElement.innerHTML = currentQuestion.passage;
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
        question: currentQuestion.passage + "<br/><br/>" + currentQuestion.question,
        userAnswer: selectedBtn.innerHTML,
        correctAnswer: correctAnswer,
        wasCorrect: isCorrect
    });

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        if (questionDifficulty === "easy") {
            score += 1;
        } else if (questionDifficulty === "medium") {
            score += 2;
        } else if (questionDifficulty === "hard") {
            score += 3;
        }
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

function showReadingWritingScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = 9 * 1 + 9 * 2 + 9 * 3; // Per module (27 questions)
    maxPossibleScore *= 2; // Two modules
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    localStorage.setItem("readingScore", scaledScore);
    passageElement.innerHTML = "";
    questionElement.innerHTML = `Reading and Writing DSAT Score: ${scaledScore} / 800`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");

    document.getElementById("question-container").classList.remove("hide");
    document.getElementById("break-message").classList.add("hide");
    countdownEl.innerHTML = "0:00"; // Reset timer display
}

function showFinalScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = 7 * 1 + 8 * 2 + 7 * 3; // Per module (22 questions)
    maxPossibleScore *= 2; // Two modules
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    let readingScore = parseInt(localStorage.getItem("readingScore") || 0, 10);
    let mathScore = scaledScore;
    localStorage.setItem("mathScore", mathScore);

    let totalDSATScore = readingScore + mathScore;

    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = { reading: readingScore, math: mathScore, total: totalDSATScore };
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    passageElement.innerHTML = "";
    questionElement.innerHTML = `<p><strong>Reading and Writing DSAT Score:</strong> ${readingScore} / 800</p>
                                <p><strong>Math DSAT Score:</strong> ${mathScore} / 800</p>
                                <p><strong>Total DSAT Score:</strong> ${totalDSATScore} / 1600</p>`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Review Incorrect Answers";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", showExplanations);

    countdownEl.innerHTML = "0:00"; // Stop and reset timer display
    time = 0; // Ensure time is reset
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

    if (questionText.includes("Emma stepped into the grand ballroom")) {
        return "Emma’s unease and hesitation suggest she feels out of place, despite her anticipation.";
    } else if (questionText.includes("Daniel stepped into the office")) {
        return "Daniel’s doubt and deep breath indicate uncertainty, but his reminder shows determination.";
    } else if (questionText.includes("Liam set his pen down")) {
        return "The explicit mention of 'nagging doubt' directly shows his uncertainty.";
    } else if (questionText.includes("The scientist adjusted her glasses")) {
        return "Her disbelief in consistent results despite repeated checks shows her struggle.";
    } else if (questionText.includes("An airplane is flying from City A to City B")) {
        return "Time against wind = 750 / 500 = 1.5 hours. Time with wind = 750 / 600 = 1.25 hours. Total = 2.75 hours.";
    } else if (questionText.includes("A car's value depreciates by 15%")) {
        return "Year 1: $30,000 × 0.85 = $25,500. Year 2: $21,675. Year 3: $18,423.75 ≈ $19,275.";
    } else if (questionText.includes("The function f(x) is defined")) {
        return "f(4) = 2(4²) - 3(4) + 5 = 32 - 12 + 5 = 25.";
    } else if (questionText.includes("A company rents out bicycles")) {
        return "$12 + $3h ≤ $45. h ≤ 11. Maximum whole hours = 9.";
    }
    return "No specific explanation available.";
}

function handleNextButton() {
    recordTestResults();
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        endModule();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar-test");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.firstElementChild.style.width = progress + "%";
}

function recordTestResults() {
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};

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
        // Timer is already cleared in showReadingWritingScore; do not start Math here
    } else {
        handleNextButton();
    }
});

continueButton.addEventListener("click", () => {
    document.getElementById("break-message").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startMathTest(); // Start Math section and timer only when user clicks Continue in break message
});

startTestButton.addEventListener("click", startTest);