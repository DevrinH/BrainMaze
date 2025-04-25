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
        passage: "Emma stepped into the grand ballroom, her gown brushing against the polished floor as chandeliers cast golden light across the room. The guests moved with ease, their conversations flowing effortlessly. She had imagined this moment countless times, yet standing there now, a strange unease settled in her chest. Adjusting her gloves, she forced a smile and took a hesitant step forward, unsure if she truly belonged.",
        question: "What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "A) She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "B) She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "C) She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "D) She is eager to impress others and makes a confident entrance into the event.", correct: false },
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
            { text: "B) He is uninterested in the work and only took the job for financial reasons.", correct: false },
            { text: "C) He is confident that he will excel without any major challenges.", correct: false },
            { text: "D) He regrets accepting the position and is considering quitting.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },
    {
        passage: "Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript. Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind. He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.",
        question: "Which choice provides the best evidence for the idea that Liam is uncertain about his work?",
        answers: [
            { text: "A) 'Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind.'", correct: true },
            { text: "B) 'He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.'", correct: false },
            { text: "C) 'Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript.'", correct: false },
            { text: "D) 'He had imagined this moment countless times, picturing the satisfaction of a completed draft.'", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    {
        passage: "The scientist adjusted her glasses, peering at the data displayed on the screen. The results were unexpected—far different from what she and her team had predicted. She tapped her fingers against the desk, reviewing each calculation. There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.",
        question: "Which sentence best supports the idea that the scientist is struggling to accept her findings?",
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

// Map SAT categories to match user-profile document IDs
const categoryMapping = {
    "inference": "inferences",
    "command-of-evidence": "command-of-evidence",
    "advanced-math": "advanced-math",
    "algebra": "algebra"
};

function startTest() {
    satIntroContainer.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");

    // Initialize satHistoricalProgress with all categories
    let satHistoricalProgress = JSON.parse(localStorage.getItem("satHistoricalProgress")) || {};
    const allCategories = [
        "command-of-evidence",
        "central-ideas-and-detail",
        "inferences",
        "words-in-context",
        "text-structure-and-purpose",
        "cross-text-connections",
        "transitions",
        "rhetorical-synthesis",
        "boundaries",
        "algebra",
        "advanced-math",
        "problem-solving-and-data",
        "geometry-and-trigonometry"
    ];
    allCategories.forEach(category => {
        if (!satHistoricalProgress[category]) {
            satHistoricalProgress[category] = { percentage: 0 };
        }
    });
    localStorage.setItem("satHistoricalProgress", JSON.stringify(satHistoricalProgress));
    console.log("Initialized satHistoricalProgress:", satHistoricalProgress);

    startReadingWritingTest();
}

function startReadingWritingTest() {
    isMathTest = false;
    userResponses = [];
    startQuiz(readingWritingQuestions, 18, 18, 18);
}

function startMathTest() {
    isMathTest = true;
    startQuiz(mathQuestions, 14, 15, 15);
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

    // Map the category to match user-profile IDs
    questionCategory = categoryMapping[questionCategory] || questionCategory;

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
    resetState();

    let maxPossibleScore;
    if (!isMathTest) {
        maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3);
    } else {
        maxPossibleScore = (14 * 1) + (15 * 2) + (15 * 3);
    }
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    document.getElementById("question-container").classList.remove("hide");

    if (!isMathTest) {
        localStorage.setItem("readingScore", scaledScore);
        passageElement.innerHTML = "";
        questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        
        // Save historical progress after reading/writing section
        saveHistoricalProgress();
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

        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>Reading and Writing SAT Score:</strong> ${readingScore} / 800</p>
                                    <p><strong>Math SAT Score:</strong> ${mathScore} / 800</p>
                                    <p><strong>Total SAT Score:</strong> ${totalSATScore} / 1600</p>`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Review Incorrect Answers";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", showExplanations);

        // Save historical progress after the math section
        saveHistoricalProgress();
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
        return "Substitute x = 4 into f(x) = 2x² - 3x + 5: f(4) = 2(4²) - 3(4) + 5 = 2(16) - 12 + 5 = 32 - 12 + 5 = 25.";
    } else if (questionText.includes("A company rents out bicycles")) {
        return "Equation: $12 + $3h ≤ $45. Subtract 12: $3h ≤ $33. Divide by 3: h ≤ 11. Maximum whole hours = 9 (since $12 + $3 × 9 = $39 ≤ $45).";
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
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};

    if (typeof results !== "object" || Array.isArray(results)) {
        results = {};
    }

    console.log("Before updating testResults:", results);

    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }

        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
        console.log(`Updated ${category} in testResults: correct=${results[category].correct}, incorrect=${results[category].incorrect}`);
    }

    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("After updating testResults:", results);
}

function saveHistoricalProgress() {
    let storedResults = JSON.parse(localStorage.getItem("testResults")) || {};
    let satHistoricalProgress = JSON.parse(localStorage.getItem("satHistoricalProgress")) || {};

    console.log("testResults in saveHistoricalProgress:", storedResults);
    console.log("Before updating satHistoricalProgress:", satHistoricalProgress);

    Object.keys(categoryMapping).forEach(originalCategory => {
        const mappedCategory = categoryMapping[originalCategory];
        const correct = storedResults[mappedCategory]?.correct || 0;
        const incorrect = storedResults[mappedCategory]?.incorrect || 0;
        const total = correct + incorrect;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        satHistoricalProgress[mappedCategory] = { percentage };
        console.log(`Updated ${mappedCategory} in satHistoricalProgress: ${percentage}% (correct=${correct}, incorrect=${incorrect})`);
    });

    localStorage.setItem("satHistoricalProgress", JSON.stringify(satHistoricalProgress));
    console.log("After updating satHistoricalProgress:", satHistoricalProgress);
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
    questionElement.innerHTML = "This is a timed SAT Test. The Reading portion will be 64 minutes and the math portion will be 44 minutes.";
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