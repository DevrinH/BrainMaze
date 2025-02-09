let readScore = localStorage.getItem("readingScore");
let readingWritingScore = Number(readScore);

setTimeout(function() {

    showScore();
    
    }, 4200000);
    
    const startingMinutes = 70;
    const countdownEl = document.getElementById('countdown');
    
    let time = startingMinutes * 60 + 1; //minutes * 60 seconds
    let refreshIntervalId = setInterval(updateCountdown, 1000);
    
    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
    
        if (time === 0) { 
            clearInterval(refreshIntervalId);
            return; // Stop execution to prevent going negative
        }
    
        time--; 
    };
    
updateCountdown();


const questions = [
    {
        
        question: "A store sells two types of pens: basic pens for $1.50 each and premium pens for $2.75 each. If a customer buys a total of 10 pens and spends exactly $21.50, how many premium pens did the customer buy?",
       
        answers: [
            { text: "3", correct: false},
            { text: "4", correct: true},
            { text: "5", correct: false},
            { text: "6", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "A rectangular swimming pool is twice as long as it is wide. If the perimeter of the pool is 72 meters, what is the length of the pool?",
       
        answers: [
            { text: "18", correct: false},
            { text: "24", correct: true},
            { text: "30", correct: false},
            { text: "36", correct: false},
        ],
        difficulty:"easy"
    },   
    {
        question: "A theater sells tickets for $8 each for adults and $5 each for children. If a family buys a total of 9 tickets and spends $59, how many adult tickets did they buy?",
        answers: [
            { text: "4", correct: false},
            { text: "5", correct: false},
            { text: "6", correct: true},
            { text: "97", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "A farmer has a total of 56 animals, consisting only of cows and chickens. If the animals have a total of 176 legs, how many cows does the farmer have?",
        answers: [
            { text: "28", correct: false},
            { text: "30", correct: false},
            { text: "32", correct: false},
            { text: "36", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "A factory produces small and large boxes. The total number of boxes produced in a day is 90. Each small box weighs 2 kg, and each large box weighs 5 kg. If the total weight of all the boxes is 230 kg, how many small boxes were produced?",
        answers: [
            { text: "40", correct: true},
            { text: "42", correct: false},
            { text: "45", correct: false},
            { text: "50", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "The sum of three consecutive even integers is 222. What is the smallest of these integers?",
        answers: [
            { text: "72", correct: true},
            { text: "74", correct: false},
            { text: "76", correct: false},
            { text: "78", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"easy"
    },


];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
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
    let questionDifficulty = questions[currentQuestionIndex].difficulty;

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
    resetState();

    let maxPossibleScore = (13 * 1) + (18 * 2) + (13 * 3); // 13 easy, 18 medium, 13 hard
    let rawScore = score;

    // Convert raw score to SAT scaled score (approximation)
    let mathScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    // Retrieve Reading and Writing score from local storage
    let readingScore = localStorage.getItem("readingScore");
    readingScore = readingScore ? parseInt(readingScore) : 200; // Default to 200 if not found

    // Calculate total SAT score (Reading + Math)
    let totalSATScore = readingScore + mathScore;

    // Display Math, Reading, and Total SAT Score
    questionElement.innerHTML = `
        <p><strong>Reading and Writing SAT Score:</strong> ${readingScore} / 800</p>
        <p><strong>Math SAT Score:</strong> ${mathScore} / 800</p>
        <p><strong>Total SAT Score:</strong> ${totalSATScore} / 1600</p>
    `;

    nextButton.innerHTML = "Finish";
    nextButton.style.display = "block";

    document.getElementById("progress-bar").style.width = "100%";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        homelink();
    }
});

function homelink() {
    location.href = "https://www.brainjelli.com";
}

startQuiz();