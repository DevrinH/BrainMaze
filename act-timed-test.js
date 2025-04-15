const passageElement = document.getElementById("passage");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const countdownEl = document.getElementById('countdown');
const actIntroContainer = document.getElementById("act-intro-container");
const startTestButton = document.getElementById("start-test-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {};
let results = localStorage.getItem("actResults");
results = results ? JSON.parse(results) : {};
let refreshIntervalId;
let time;
let userResponses = [];
let currentSection = "english";

const englishQuestions = [
    {
        passage: "When Sarah entered the old bookstore, dust motes floated in the sunlight streaming through cracked windows. Shelves groaned under the weight of forgotten novels. She traced a finger along a leather-bound spine, feeling a thrill at the thought of untold stories. Yet, a pang of sadness hit her, knowing many of these books might never be read again.",
        question: "The passage suggests Sarah feels:",
        answers: [
            { text: "A) excitement tempered by regret.", correct: true },
            { text: "B) fear of the bookstore’s condition.", correct: false },
            { text: "C) indifference toward the books.", correct: false },
            { text: "D) anger at the neglect of the store.", correct: false },
        ],
        type: "english",
        difficulty: "easy",
        category: "reading-comprehension"
    },
    {
        passage: "The team huddled in the lab, data streaming across the monitor. Years of research hinged on this moment. Dr. Ellis scanned the numbers, her pulse quickening. The results were unexpected, challenging every model they’d built. She exhaled slowly, torn between disbelief and the spark of discovery.",
        question: "What does the passage imply about Dr. Ellis’s reaction?",
        answers: [
            { text: "A) She is skeptical yet intrigued by the findings.", correct: true },
            { text: "B) She is certain the data is flawed.", correct: false },
            { text: "C) She feels defeated by the results.", correct: false },
            { text: "D) She is uninterested in the outcome.", correct: false },
        ],
        type: "english",
        difficulty: "medium",
        category: "reading-comprehension"
    },
];

function startTest() {
    actIntroContainer.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startEnglishSection();
}

function startEnglishSection() {
    currentSection = "english";
    time = 45 * 60;
    userResponses = [];
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endEnglishSection, 2700000);
    startQuiz(englishQuestions, 25, 25, 25);
}

function startMathSection() {
    currentSection = "math";
    time = 60 * 60;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endMathSection, 3600000);
    startQuiz(mathQuestions, 20, 20, 20);
}

function startReadingSection() {
    currentSection = "reading";
    time = 35 * 60;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endReadingSection, 2100000);
    startQuiz(readingQuestions, 13, 14, 13);
}

function startScienceSection() {
    currentSection = "science";
    time = 35 * 60;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endScienceSection, 2100000);
    startQuiz(scienceQuestions, 13, 14, 13);
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    if (time === 0) {
        clearInterval(refreshIntervalId);
        switch (currentSection) {
            case "english": endEnglishSection(); break;
            case "math": endMathSection(); break;
            case "reading": endReadingSection(); break;
            case "science": endScienceSection(); break;
        }
    } else {
        time--;
    }
}

function endEnglishSection() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
}

function endMathSection() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
}

function endReadingSection() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
}

function endScienceSection() {
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

function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (25 * 1) + (25 * 2) + (25 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 35 + 1);

    document.getElementById("question-container").classList.remove("hide");

    localStorage.setItem(currentSection + "Score", scaledScore);
    passageElement.innerHTML = "";
    questionElement.innerHTML = `${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} ACT Score: ${scaledScore} / 36`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");
}

function showFinalScore() {
    resetState();
    let englishScore = parseInt(localStorage.getItem("englishScore") || 0, 10);
    let mathScore = parseInt(localStorage.getItem("mathScore") || 0, 10);
    let readingScore = parseInt(localStorage.getItem("readingScore") || 0, 10);
    let scienceScore = parseInt(localStorage.getItem("scienceScore") || 0, 10);
    let compositeScore = Math.round((englishScore + mathScore + readingScore + scienceScore) / 4);

    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("actScoreHistory")) || {};
    scoreHistory[today] = {
        english: englishScore,
        math: mathScore,
        reading: readingScore,
        science: scienceScore,
        composite: compositeScore
    };
    localStorage.setItem("actScoreHistory", JSON.stringify(scoreHistory));

    passageElement.innerHTML = "";
    questionElement.innerHTML = `
        <p><strong>English ACT Score:</strong> ${englishScore} / 36</p>
        <p><strong>Math ACT Score:</strong> ${mathScore} / 36</p>
        <p><strong>Reading ACT Score:</strong> ${readingScore} / 36</p>
        <p><strong>Science ACT Score:</strong> ${scienceScore} / 36</p>
        <p><strong>Composite ACT Score:</strong> ${compositeScore} / 36</p>`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Review Incorrect Answers";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", showExplanations);
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
    const passageText = response.question.split("<br/><br/>")[0];

    if (passageText.includes("Sarah entered the old bookstore")) {
        return "Sarah’s thrill at 'untold stories' shows excitement, but the 'pang of sadness' about books never being read suggests regret, making A) correct. The passage doesn’t indicate fear (B), indifference (C), or anger (D).";
    } else if (passageText.includes("The team huddled in the lab")) {
        return "Dr. Ellis’s quickened pulse and spark of discovery suggest intrigue, while her disbelief indicates skepticism, supporting A). The passage doesn’t show certainty of error (B), defeat (C), or disinterest (D).";
    }
    return "No specific explanation available for this question.";
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
    const progressBar = document.getElementById("progress-bar-test");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.firstElementChild.style.width = progress + "%";
}

function recordTestResults() {
    let storedResults = localStorage.getItem("actResults");
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

    localStorage.setItem("actResults", JSON.stringify(results));

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

document.getElementById("continue-btn").addEventListener("click", () => {
    document.getElementById("break-message").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    switch (currentSection) {
        case "english": startMathSection(); break;
        case "math": startReadingSection(); break;
        case "reading": startScienceSection(); break;
        case "science": showFinalScore(); break;
    }
});

function showIntroMessage() {
    resetState();
    passageElement.innerHTML = "";
    questionElement.innerHTML = "This is a timed ACT Test. English: 45 min, Math: 60 min, Reading: 35 min, Science: 35 min.";
    questionElement.classList.add("centered-score");

    const startButton = document.createElement("button");
    startButton.innerHTML = "Start Test";
    startButton.classList.add("btn", "centered-btn");
    startButton.addEventListener("click", () => {
        questionElement.classList.remove("centered-score");
        startEnglishSection();
    });
    answerButtons.appendChild(startButton);
}

startTestButton.addEventListener("click", startTest);