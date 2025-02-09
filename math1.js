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
        question: "A right triangle has legs of lengths 6 and 8. What is the length of the hypotenuse?",
        answers: [
            { text: "10", correct: true},
            { text: "12", correct: false},
            { text: "14", correct: false},
            { text: "16", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "A school is ordering chairs and tables. Each chair costs $15, and each table costs $40. If the school spends exactly $520 on a total of 20 chairs and tables combined, how many tables did they buy?",
        answers: [
            { text: "6", correct: false},
            { text: "7", correct: false},
            { text: "8", correct: false},
            { text: "10", correct: true},
        ],
        difficulty:"easy"
    },
    {
        question: "Jason is renting a car from a rental company that charges $45 per day plus tax. A sales tax of 10% is applied to the total rental cost, and an additional one-time service fee of $12 is charged without tax. Which of the following represents Jason’s total cost, in dollars, for renting the car for d days?",
        answers: [
            { text: "45d+12+0.10d", correct: false},
            { text: "1.10(45d+12)", correct: false},
            { text: "1.10(45d)+12", correct: true},
            { text: "1.10(45d)+1.10(12)", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "A circle has center 𝑂, and points 𝐶 and 𝐷 lie on the circle. The measure of arc 𝐶𝐷 is 60°, and the length of arc CD is 4π inches. What is the circumference of the circle, in inches?",
        answers: [
            { text: "12π", correct: false},
            { text: "18π", correct: false},
            { text: "24π", correct: true},
            { text: "30π", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "The density of a certain metal is 500 kilograms per cubic meter. A solid sample of this metal is in the shape of a cube and has a mass of 1,000 kilograms. To the nearest hundredth of a meter, what is the length of one edge of this sample?",
        answers: [
            { text: "1.14", correct: false},
            { text: "1.26", correct: true},
            { text: "1.44", correct: false},
            { text: "1.58", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "A car travels 150 miles using 5 gallons of gasoline. At this rate, how many gallons of gasoline will the car need to travel 420 miles?",
        answers: [
            { text: "12", correct: false},
            { text: "14", correct: true},
            { text: "16", correct: false},
            { text: "18", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "A rectangle has a length that is 3 times its width. If the perimeter of the rectangle is 64 inches, what is the area of the rectangle?",
        answers: [
            { text: "96", correct: true},
            { text: "108", correct: false},
            { text: "112", correct: false},
            { text: "120", correct: false},
        ],
        difficulty:"easy"
    },
    {
        question: "A circle has center 𝑂 and radius 10. A tangent line is drawn from a point 𝑃 outside the circle to touch the circle at point 𝐴. If OP=26, what is the length of PA?",
        answers: [
            { text: "16", correct: false},
            { text: "18", correct: false},
            { text: "20", correct: true},
            { text: "24", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "A function 𝑓(𝑥) is defined as 𝑓(𝑥)=𝑥2−4𝑥+7. If the function is transformed to 𝑔(𝑥)=𝑓(𝑥−3)+2, what is the value of 𝑔(2)?",
        answers: [
            { text: "4", correct: false},
            { text: "5", correct: true},
            { text: "6", correct: false},
            { text: "7", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "If 3^(2x+1) = 81, what is the value of x?,",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: false},
            { text: "3", correct: false},
            { text: "4", correct: true},
        ],
        difficulty:"medium"
    },
    {
        question: "If 5^(x+1) = 125, what is the value of x?",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: false},
            { text: "3", correct: true},
            { text: "4", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
        answers: [
            { text: "9", correct: false},
            { text: "10", correct: true},
            { text: "11", correct: false},
            { text: "12", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "A train travels 180 miles in 3 hours. At this rate, how far will it travel in 7 hours?",
        answers: [
            { text: "300 miles", correct: false},
            { text: "360 miles", correct: false},
            { text: "420 miles", correct: true},
            { text: "450 miles", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "A circle has a circumference of 36π. What is its radius?",
        answers: [
            { text: "9", correct: false},
            { text: "10", correct: false},
            { text: "12", correct: false},
            { text: "18", correct: true},
        ],
        difficulty:"medium"
    },
    {
        question: "Emma is filling water bottles for a marathon. Each bottle holds 0.75 liters of water. She needs to fill 120 bottles. If water is sold in 18-liter jugs, how many jugs will she need?",
        answers: [
            { text: "4", correct: false},
            { text: "5", correct: true},
            { text: "6", correct: false},
            { text: "7", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "A farmer plants 3 types of crops in a field. Wheat takes up 40% of the land, corn takes up 35%, and the remaining 15 acres are for soybeans. How large is the entire field?",
        answers: [
            { text: "50 acres", correct: false},
            { text: "60 acres", correct: false},
            { text: "75 acres", correct: true},
            { text: "90 acres", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "Liam is painting a fence. He paints at a rate of 12 square feet per hour. If the fence is 96 feet long and 4 feet high, how many hours will it take him to complete the entire fence?",
        answers: [
            { text: "24", correct: true},
            { text: "28", correct: false},
            { text: "30", correct: false},
            { text: "32", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "A bookstore sells a novel for $12. After applying a discount, the price is $9.60. What is the discount percentage?",
        answers: [
            { text: "10%", correct: false},
            { text: "15%", correct: false},
            { text: "20%", correct: true},
            { text: "25%", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "Sophia is filling gift bags for a party. Each bag contains 3 pencils and 2 erasers. If she prepares 48 bags and each pencil costs $0.50 while each eraser costs $0.75, what is the total cost of all the supplies?",
        answers: [
            { text: "$180", correct: false},
            { text: "$192", correct: false},
            { text: "$204", correct: false},
            { text: "$216", correct: true},
        ],
        difficulty:"medium"
    },
    {
        question: "A train leaves City A at 8:00 AM, traveling toward City B at a constant speed of 60 miles per hour. A second train leaves City B at 9:30 AM, traveling toward City A at a speed of 75 miles per hour. If the two cities are 315 miles apart, at what time will the two trains meet?",
        answers: [
            { text: "11:00AM", correct: false},
            { text: "11:30AM", correct: true},
            { text: "12:00pm", correct: false},
            { text: "12:30pm", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "David is stacking boxes. Each box is 8 inches tall. If the total height of the stacked boxes is 6 feet, how many boxes are in the stack?",
        answers: [
            { text: "6", correct: false},
            { text: "8", correct: false},
            { text: "9", correct: true},
            { text: "10", correct: false},
        ],
        difficulty:"medium"
    },    {
        question: "A bakery sells cupcakes for $2.50 each or a dozen for $24. If Lisa needs 30 cupcakes, how much will she save by buying in dozens instead of individually?",
        answers: [
            { text: "$6", correct: false},
            { text: "$9", correct: true},
            { text: "$12", correct: false},
            { text: "$15", correct: false},
        ],
        difficulty:"medium"
    },    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"medium"
    },    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"medium"
    },    {
        question: "",
        answers: [
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: false},
            { text: "", correct: true},
        ],
        difficulty:"medium"
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