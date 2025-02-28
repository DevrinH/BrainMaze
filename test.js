const startingMinutes = 64;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60; // No need for "+1", ensures exactly 64 minutes
let refreshIntervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time === 0) { 
        clearInterval(refreshIntervalId);
        endQuiz();  // ✅ Stops quiz when timer hits zero
    } else {
        time--; 
    }
}

// Function to handle quiz timeout
function endQuiz() {
    resetState();  // Removes answer buttons
    showScore();   // Shows final score immediately
}

// Automatically end test after 64 minutes (3,840,000 ms)
setTimeout(endQuiz, 3840000);

updateCountdown();


const questions = [{
    question: "What does the passage suggest about Emma’s feelings?",
    answers: [
        { text: "She feels out of place despite having anticipated this moment for a long time.", correct: true },
        { text: "She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
        { text: "She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
        { text: "She is eager to impress others and makes a confident entrance into the event.", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "inference"
}{
    question: "What does the passage suggest about Daniel's attitude toward his new job?",
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
{
    question: "Based on the passage, what can be inferred about Sophia’s relationship with her mentor?",
    answers: [
        { text: "She deeply respects her mentor’s advice, even when she disagrees.", correct: true },
        { text: "She finds her mentor’s guidance outdated and irrelevant.", correct: false },
        { text: "She feels pressured to always follow her mentor’s advice without question.", correct: false },
        { text: "She believes her mentor underestimates her abilities and does not value her input.", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "inference"
},
{
    question: "What does the passage imply about Marcus’s reaction to the unexpected news?",
    answers: [
        { text: "He struggles to hide his disappointment but remains polite.", correct: true },
        { text: "He is completely indifferent and unaffected by the situation.", correct: false },
        { text: "He immediately reacts with anger and refuses to accept the news.", correct: false },
        { text: "He is thrilled by the surprise and eagerly embraces the change.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "inference"
},
{
    question: "What can be inferred about Olivia’s decision to move to a new city?",
    answers: [
        { text: "She is both excited and nervous about the challenges ahead.", correct: true },
        { text: "She is completely confident that the move will solve all her problems.", correct: false },
        { text: "She was forced to move against her will and resents the change.", correct: false },
        { text: "She regrets her decision and is already planning to return home.", correct: false },
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


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;

    // Select 54 questions (ordered Easy → Medium → Hard)
    selectedQuestions = selectRandomQuestions(questions, 18, 18, 18);

    nextButton.innerHTML = "Next";
    showQuestion();
}

function selectRandomQuestions(questions, numEasy, numMedium, numHard) {
    // Separate questions by difficulty
    const easyQuestions = questions.filter(q => q.difficulty === "easy");
    const mediumQuestions = questions.filter(q => q.difficulty === "medium");
    const hardQuestions = questions.filter(q => q.difficulty === "hard");

    // Further separate by type (reading/writing)
    const easyReading = easyQuestions.filter(q => q.type === "reading");
    const easyWriting = easyQuestions.filter(q => q.type === "writing");

    const mediumReading = mediumQuestions.filter(q => q.type === "reading");
    const mediumWriting = mediumQuestions.filter(q => q.type === "writing");

    const hardReading = hardQuestions.filter(q => q.type === "reading");
    const hardWriting = hardQuestions.filter(q => q.type === "writing");

    // Function to get random questions
    function getRandom(arr, num) {
        return arr.sort(() => 0.5 - Math.random()).slice(0, num);
    }

    // Select 9 reading and 9 writing questions for each difficulty level
    const selectedEasy = [...getRandom(easyReading, numEasy / 2), ...getRandom(easyWriting, numEasy / 2)];
    const selectedMedium = [...getRandom(mediumReading, numMedium / 2), ...getRandom(mediumWriting, numMedium / 2)];
    const selectedHard = [...getRandom(hardReading, numHard / 2), ...getRandom(hardWriting, numHard / 2)];

    // Return ordered questions (Easy → Medium → Hard)
    return [...selectedEasy, ...selectedMedium, ...selectedHard];
}

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
    let questionCategory = currentQuestion.type; // Category (e.g., reading, writing)
    let questionDifficulty = currentQuestion.difficulty; // Difficulty level

    // Initialize category tracking if not already set
    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        categoryStats[questionCategory].correct++; // Track correct answer

        // Difficulty-based scoring
        if (questionDifficulty === "easy") {
            score += 1;
        } else if (questionDifficulty === "medium") {
            score += 2;
        } else if (questionDifficulty === "hard") {
            score += 3;
        }
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats[questionCategory].incorrect++; // Track incorrect answer
    }

    // Disable all buttons after selection & highlight correct answer
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Show next button
    nextButton.style.display = "block";

    // Save updated category stats in localStorage
    localStorage.setItem("categoryStats", JSON.stringify(categoryStats));
}


function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    // Save reading score before redirecting
    localStorage.setItem("readingScore", scaledScore);

    let today = new Date().toLocaleDateString("en-CA"); // Local timezone, formatted as YYYY-MM-DD

    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = scaledScore;
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";

    document.getElementById("progress-bar").style.width = "100%";
    updateScoreGraph();
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) { // ✅ FIXED: Now uses selectedQuestions
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
    if (currentQuestionIndex < selectedQuestions.length) { // ✅ FIXED: Now uses selectedQuestions
        handleNextButton();
    } else {
        mathlink();
    }
});

function mathlink() {
    location.href = "https://www.brainjelli.com/math.html";
}

startQuiz();
