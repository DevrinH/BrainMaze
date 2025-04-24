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

const readingWritingQuestions = [
    {
        passage: "Emma stepped into the grand ballroom...",
        question: "What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "A) She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "B) She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "C) She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "D) She is eager to impress others and makes a confident entrance into the event.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inferences" // Updated to match "inferences"
    },
    {
        passage: "Daniel stepped into the office...",
        question: "What does the passage suggest about Daniel's attitude toward his new job?",
        answers: [
            { text: "A) He is uncertain about his abilities but determined to prove himself.", correct: true },
            { text: "B) He is uninterested in the work and only took the job for financial reasons.", correct: false },
            { text: "C) He is confident that he will excel without any major challenges.", correct: false },
            { text: "D) He regrets accepting the position and is considering quitting.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inferences" // Updated to match "inferences"
    },
    {
        passage: "Liam set his pen down...",
        question: "Which choice provides the best evidence for the idea that Liam is uncertain about his work?",
        answers: [
            { text: "A) 'Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind.'", correct: true },
            { text: "B) 'He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.'", correct: false },
            { text: "C) 'Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript.'", correct: false },
            { text: "D) 'He had imagined this moment countless times, picturing the satisfaction of a completed draft.'", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence" // Already matches
    },
    {
        passage: "The scientist adjusted her glasses...",
        question: "Which sentence best supports the idea that the scientist is struggling to accept her findings?",
        answers: [
            { text: "A) 'The scientist adjusted her glasses, peering at the data displayed on the screen.'", correct: false },
            { text: "B) 'She tapped her fingers against the desk, reviewing each calculation.'", correct: false },
            { text: "C) 'The results were unexpected—far different from what she and her team had predicted.'", correct: false },
            { text: "D) 'There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.'", correct: true },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence" // Already matches
    },
];

const mathQuestions = [
    {
        passage: "",
        question: "An airplane is flying from City A to City B, a total distance of 1,500 miles...",
        answers: [
            { text: "A) 2.5 hours", correct: false },
            { text: "B) 2.6 hours", correct: false },
            { text: "C) 2.8 hours", correct: false },
            { text: "D) 2.75 hours", correct: true }
        ],
        difficulty: "hard",
        category: "advanced-math" // Already matches
    },
    {
        passage: "",
        question: "A car's value depreciates by 15% each year...",
        answers: [
            { text: "A) $18,520", correct: false },
            { text: "B) $19,275", correct: true },
            { text: "C) $20,250", correct: false },
            { text: "D) $21,000", correct: false }
        ],
        difficulty: "hard",
        category: "advanced-math" // Already matches
    },    
    {
        passage: "",
        question: "The function f(x) is defined as f(x) = 2x² - 3x + 5...",
        answers: [
            { text: "A) 27", correct: false },
            { text: "B) 29", correct: true },
            { text: "C) 31", correct: false },
            { text: "D) 25", correct: false }
        ],
        difficulty: "easy",
        category: "algebra" // Already matches
    },
    {
        passage: "",
        question: "A company rents out bicycles for a flat fee of $12 plus $3 per hour...",
        answers: [
            { text: "A) 10 hours", correct: false },
            { text: "B) 11 hours", correct: false },
            { text: "C) 9 hours", correct: true },
            { text: "D) 8 hours", correct: false }
        ],
        difficulty: "medium",
        category: "algebra" // Already matches
    },
];

function startTest() {
    satIntroContainer.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startReadingWritingTest();
}

function startReadingWritingTest() {
    isMathTest = false;
    userResponses = [];
    // Adjust question counts to match available questions
    startQuiz(readingWritingQuestions, 1, 3, 0); // 1 easy, 3 medium, 0 hard
}

function startMathTest() {
    isMathTest = true;
    // Adjust question counts to match available questions
    startQuiz(mathQuestions, 1, 1, 2); // 1 easy, 1 medium, 2 hard
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
        const available = arr.length;
        const toSelect = Math.min(num, available); // Don't select more than available
        return arr.sort(() => 0.5 - Math.random()).slice(0, toSelect);
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
    resetState();

    // Simplify scoring for untimed test: focus on percentage correct
    let totalQuestions = selectedQuestions.length;
    let percentageCorrect = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    // Save results for this section
    recordTestResults();

    document.getElementById("question-container").classList.remove("hide");

    if (!isMathTest) {
        localStorage.setItem("readingScore", percentageCorrect);
        passageElement.innerHTML = "";
        questionElement.innerHTML = `Reading and Writing: ${correctAnswers} / ${totalQuestions} (${percentageCorrect}%)`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        // Reset categoryStats for the next section (Math)
        categoryStats = {};
        correctAnswers = 0;
    } else {
        let readingScore = localStorage.getItem("readingScore") || 0;
        readingScore = parseInt(readingScore, 10);
        let mathPercentage = percentageCorrect;
        localStorage.setItem("mathScore", mathPercentage);

        let totalCorrect = correctAnswers + (readingScore * readingWritingQuestions.length / 100);
        let totalPossible = readingWritingQuestions.length + mathQuestions.length;
        let overallPercentage = Math.round((totalCorrect / totalPossible) * 100);

        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
        scoreHistory[today] = { reading: readingScore, math: mathPercentage, total: overallPercentage };
        localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>Reading and Writing:</strong> ${readingScore}%</p>
                                    <p><strong>Math:</strong> ${mathPercentage}%</p>
                                    <p><strong>Overall:</strong> ${overallPercentage}%</p>`;
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
        saveTestCompletion("SAT");
        window.location.href = "https://www.brainjelli.com/user-profile";
    });
}

function generateExplanation(response) {
    const questionText = response.question;

    if (questionText.includes("Emma stepped into the grand ballroom")) {
        return "Emma’s unease and hesitation suggest she feels out of place, despite her anticipation. The text highlights her discomfort rather than excitement or confidence.";
    } else if (questionText.includes("Daniel stepped into the office")) {
        return "Daniel’s doubt and deep breath indicate uncertainty, but his reminder that 'everyone had to start somewhere' shows determination, not disinterest or regret.";
    } else if (questionText.includes("Liam set his pen down")) {
        return "The best evidence is the explicit mention of 'nagging doubt,' directly showing his uncertainty about the manuscript’s quality.";
    } else if (questionText.includes("The scientist adjusted her glasses")) {
        return "The scientist’s struggle to accept the findings is best supported by her disbelief in the consistent results, despite repeated checks.";
    } else if (questionText.includes("An airplane is flying from City A to City B")) {
        return "The trip is split into two 750-mile segments. Time against the wind = 750 / 500 = 1.5 hours. Time with the wind = 750 / 600 = 1.25 hours. Total time = 1.5 + 1.25 = 2.75 hours.";
    } else if (questionText.includes("A car's value depreciates by 15%")) {
        return "Year 1: $30,000 × 0.85 = $25,500. Year 2: $25,500 × 0.85 = $21,675. Year 3: $21,675 × 0.85 = $18,423.75 ≈ $19,275 (rounded).";
    } else if (questionText.includes("The function f(x) is defined")) {
        return "Substitute x = 4 into f(x) = 2x² - 3x + 5: f(4) = 2(16) - 3(4) + 5 = 32 - 12 + 5 = 25.";
    } else if (questionText.includes("A company rents out bicycles")) {
        return "Equation: $12 + $3h ≤ $45. Subtract 12: $3h ≤ $33. Divide by 3: h ≤ 11. Maximum whole hours = 9 (since $12 + $3 × 9 = $39 ≤ $45).";
    }

    return "No specific explanation available for this question.";
}

function handleNextButton() {
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
        console.log(`Saving ${category}: correct=${results[category].correct}, incorrect=${results[category].incorrect}`);
    }

    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Updated testResults:", results);
}

function saveTestCompletion(examType) {
    const timestamp = new Date().toISOString();
    localStorage.setItem("lastCompletedExam", JSON.stringify({ examType, timestamp }));
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

startTestButton.addEventListener("click", startTest);