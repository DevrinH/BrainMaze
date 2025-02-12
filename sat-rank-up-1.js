const startingMinutes = 8;
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
setTimeout(endQuiz, 480000);

updateCountdown();


const questions = [
    {
        question: "Q1",
        answers: [
            { text: "Some bird species are capable of navigating vast distances without any visual guidance.", correct: false },
            { text: "Scientists have discovered that birds use Earth’s magnetic field to navigate long migrations.", correct: true },
            { text: "Bird migration patterns are unpredictable and vary based on seasonal factors.", correct: false },
            { text: "Birds use special proteins in their eyes to see at night and avoid getting lost.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "Q2",
        answers: [
            { text: "She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "She is eager to impress others and makes a confident entrance into the event.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "Q3",
        answers: [
            { text: "Green spaces in cities contribute to environmental and social well-being, but they face competition from urban development.", correct: true },
            { text: "City residents should prioritize parks and gardens over commercial expansion.", correct: false },
            { text: "Urban development should be halted to preserve more land for parks and gardens.", correct: false },
            { text: "Parks are primarily designed to reduce air pollution rather than serve a social purpose.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    },
    {
        question: "Q4",
        answers: [
            { text: "Streetcars initially shaped urban expansion but later declined due to the popularity of automobiles.", correct: true },
            { text: "The decline of streetcars in the 20th century was due to a lack of public interest in public transportation.", correct: false },
            { text: "Modern cities have rejected streetcars in favor of more efficient transportation systems.", correct: false },
            { text: "Electric streetcars were not widely used in the 20th century and only gained popularity recently.", correct: false },
        ],
        type: "reading",
        difficulty: "easy"
    }


 

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];

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
    let questionDifficulty = selectedQuestions[currentQuestionIndex].difficulty;

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;

        // Fixed weighted scoring based on difficulty (NO scaling)
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

function showScore() {
    clearInterval(refreshIntervalId); // ✅ Stops the countdown when test is completed early
    resetState();

    let maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3); // 18 easy, 18 medium, 18 hard
    let rawScore = score;

    // Convert raw score to SAT scaled score (approximation)
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    // Store in local storage for use in other sections
    localStorage.setItem("readingScore", scaledScore);

    questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";

    document.getElementById("progress-bar").style.width = "100%";
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