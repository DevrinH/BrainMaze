const questions = [
    {
        question: "Bird migration is one of nature’s most fascinating phenomena, with some species traveling thousands of miles annually. Scientists have long debated how birds navigate such vast distances with remarkable precision. Recent research suggests that birds may rely on Earth’s magnetic field, using special proteins in their eyes that react to magnetic forces. This ability, known as magnetoreception, allows them to maintain their course even when visual landmarks are unavailable.<br/><br/>Question: <br/>Which choice best summarizes the main idea of the passage?",
        answers: [
            { text: "Some bird species are capable of navigating vast distances without any visual guidance.", correct: false },
            { text: "Scientists have discovered that birds use Earth’s magnetic field to navigate long migrations.", correct: true },
            { text: "Bird migration patterns are unpredictable and vary based on seasonal factors.", correct: false },
            { text: "Birds use special proteins in their eyes to see at night and avoid getting lost.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        topic: "inference"
    },
    {
        question: "Emma hesitated before stepping into the grand ballroom. The air shimmered with golden light, and the murmur of conversation blended with the soft notes of a distant piano. She smoothed the fabric of her gown, willing her nerves to settle. The guests swirled past in elegant waves, their laughter light and effortless. Emma had spent years imagining this moment, yet standing here now, she felt like an outsider peering into a world that was not truly her own.<br/><br/>Question: <br/>What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "She is eager to impress others and makes a confident entrance into the event.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        topic: "big_picture"
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;

    // Select 22 questions (7 easy, 7 medium, 8 hard)
    selectedQuestions = selectRandomQuestions(questions, 7, 7, 8);

    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to select random questions from each difficulty
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

// Function to display a question
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

// Function to reset the question state
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = selectedQuestions[currentQuestionIndex];

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        score += getScoreValue(currentQuestion.difficulty);
    } else {
        selectedBtn.classList.add("incorrect");
        trackMistake(currentQuestion.type);
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Function to assign score values based on difficulty
function getScoreValue(difficulty) {
    return difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
}

// Function to track incorrect answers
function trackMistake(topic) {
    let storedMistakes = JSON.parse(localStorage.getItem("incorrectAnswers")) || {};
    storedMistakes[topic] = (storedMistakes[topic] || 0) + 1;
    localStorage.setItem("incorrectAnswers", JSON.stringify(storedMistakes));
}

// Function to determine the next lesson based on weak areas
function getNextLesson() {
    let storedMistakes = JSON.parse(localStorage.getItem("incorrectAnswers")) || {};
    let sortedTopics = Object.entries(storedMistakes)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    let nextTopic = sortedTopics.length ? sortedTopics[0] : "mixed_review";
    return `https://www.brainjelli.com/lessons/${nextTopic}.html`;
}

// Function to show final score
function showScore() {
    resetState();

    let maxPossibleScore = (7 * 1) + (7 * 2) + (8 * 3); // Max possible score
    let scaledScore = Math.round((score / maxPossibleScore) * 600 + 200);

    localStorage.setItem("readingScore", scaledScore);
    let today = new Date().toLocaleDateString("en-CA");

    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = scaledScore;
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    questionElement.innerHTML = `Final Score: ${scaledScore} / 800`;
    nextButton.innerHTML = "Next Lesson";
    nextButton.style.display = "block";
}

// Function to handle next button clicks
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = progress + "%";
}

// Event listener for next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) {
        handleNextButton();
    } else {
        window.location.href = getNextLesson();
    }
});

startQuiz();
