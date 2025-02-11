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
        question: "What is the value of 3(4 + 2) - 5?", 
        answers: [
            { text: "10", correct: false }, 
            { text: "11", correct: false }, 
            { text: "12", correct: false }, 
            { text: "13", correct: true } 
        ],
        difficulty: "easy"
    },
    { 
        question: "A rectangle has a length of 10 cm and a width of 6 cm. What is its perimeter?", 
        answers: [
            { text: "24 cm", correct: false }, 
            { text: "30 cm", correct: false }, 
            { text: "32 cm", correct: true }, 
            { text: "36 cm", correct: false } 
        ],
        difficulty: "easy"
    },
    { 
        question: "If x + 7 = 15, what is the value of x?", 
        answers: [
            { text: "6", correct: false }, 
            { text: "7", correct: false }, 
            { text: "8", correct: false }, 
            { text: "8", correct: true } 
        ],
        difficulty: "easy"
    },
    { 
        question: "A store sells apples for $2 each. If James buys 5 apples, how much does he spend?", 
        answers: [
            { text: "$5", correct: false }, 
            { text: "$8", correct: false }, 
            { text: "$10", correct: false }, 
            { text: "$10", correct: true } 
        ],
        difficulty: "easy"
    },
    { 
        question: "What is the value of 15 ÷ 3 + 2 × 4?", 
        answers: [
            { text: "10", correct: false }, 
            { text: "12", correct: false }, 
            { text: "14", correct: false }, 
            { text: "14", correct: true } 
        ],
        difficulty: "easy"
    },

    {
        question: "A car travels 180 miles in 3 hours at a constant speed. What is the car’s speed in miles per hour?",
        answers: [
            { text: "30 mph", correct: false }, 
            { text: "45 mph", correct: false }, 
            { text: "50 mph", correct: false }, 
            { text: "60 mph", correct: true } 
        ],
        difficulty: "medium"
    },
    {
        question: "If 5x - 7 = 3x + 5, what is the value of x?",
        answers: [
            { text: "4", correct: true }, 
            { text: "5", correct: false }, 
            { text: "6", correct: false }, 
            { text: "7", correct: false } 
        ],
        difficulty: "medium"
    },
    {
        question: "A rectangular garden has a width of 8 feet and a length that is twice the width. What is the area of the garden?",
        answers: [
            { text: "64 square feet", correct: false }, 
            { text: "96 square feet", correct: false }, 
            { text: "128 square feet", correct: true }, 
            { text: "144 square feet", correct: false } 
        ],
        difficulty: "medium"
    },
    {
        question: "A store is offering a 20% discount on a jacket that originally costs $75. What is the sale price of the jacket?",
        answers: [
            { text: "$50", correct: false }, 
            { text: "$55", correct: false }, 
            { text: "$60", correct: true }, 
            { text: "$65", correct: false } 
        ],
        difficulty: "medium"
    },
    {
        question: "The sum of three consecutive even integers is 54. What is the smallest integer?",
        answers: [
            { text: "14", correct: false }, 
            { text: "16", correct: true }, 
            { text: "18", correct: false }, 
            { text: "20", correct: false } 
        ],
        difficulty: "medium"
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
    },    
    {
        question: "A bakery sells cupcakes for $2.50 each or a dozen for $24. If Lisa needs 30 cupcakes, how much will she save by buying in dozens instead of individually?",
        answers: [
            { text: "$6", correct: false},
            { text: "$9", correct: true},
            { text: "$12", correct: false},
            { text: "$15", correct: false},
        ],
        difficulty:"medium"
    },    
    {
        question: "Olivia is making fruit baskets. Each basket contains 5 apples, 3 oranges, and 2 bananas. If she has 80 apples, 60 oranges, and 40 bananas, what is the maximum number of full baskets she can make?",
        answers: [
            { text: "10", correct: true},
            { text: "12", correct: false},
            { text: "13", correct: false},
            { text: "16", correct: false},
        ],
        difficulty:"medium"
    },    
    {
        question: "A cyclist starts a race at 9:00 AM, riding at a constant speed of 18 miles per hour. A second cyclist starts at 9:30 AM, riding at a speed of 24 miles per hour. How long will it take for the second cyclist to catch the first?",
        answers: [
            { text: "1 hour", correct: false},
            { text: "1.5 hours", correct: true},
            { text: "2 hours", correct: false},
            { text: "2.5 hours", correct: false},
        ],
        difficulty:"medium"
    },    
    {
        question: "A farmer is planting trees in rows. Each row must have the same number of trees. If the farmer has 84 apple trees and 126 orange trees, what is the greatest number of rows they can be evenly divided into?",
        answers: [
            { text: "12", correct: false},
            { text: "14", correct: false},
            { text: "21", correct: true},
            { text: "28", correct: false},
        ],
        difficulty:"medium"
    },
    {
        question: "A rectangle has a length that is 4 times its width. If the perimeter of the rectangle is 80 cm, what is the area of the rectangle?",
        answers: [
            { text: "128 cm²", correct: false},
            { text: "160 cm²", correct: false},
            { text: "256 cm²", correct: true},
            { text: "320 cm²", correct: false},
        ],
        difficulty:"hard"
    },
    {
        question: "The sum of two numbers is 52, and their product is 640. What is the positive difference between the two numbers?",
        answers: [
            { text: "4", correct: false},
            { text: "6", correct: false},
            { text: "8", correct: true},
            { text: "10", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "A cone has a volume of 180π cubic inches and a height of 15 inches. What is the radius of the base?",
        answers: [
            { text: "3 inches", correct: false},
            { text: "4 inches", correct: false},
            { text: "5 inches", correct: false},
            { text: "6 inches", correct: true},
        ],
        difficulty:"hard"
    },    {
        question: "A function f(x) is defined as f(x) = 2x³ - 5x² + ax + 7. If f(2) = 9, what is the value of a?",
        answers: [
            { text: "-3", correct: true},
            { text: "-2", correct: false},
            { text: "1", correct: false},
            { text: "4", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "A circle with center O has a chord AB that is 8 cm long and is 3 cm away from the center. What is the radius of the circle?",
        answers: [
            { text: "4 cm", correct: false},
            { text: "5 cm", correct: true},
            { text: "6 cm", correct: false},
            { text: "7 cm", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "Liam is filling a cylindrical water tank with a hose that pumps water at a rate of 2 liters per second. The tank has a radius of 50 cm and a height of 1.2 meters. If the tank starts empty, how many minutes will it take to completely fill it? (1 liter = 1,000 cm³)",
        answers: [
            { text: "7.5 minutes", correct: false},
            { text: "8 minutes", correct: true},
            { text: "8.5 minutes", correct: false},
            { text: "9 minutes", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "Emma is running on a circular track that is 400 meters in circumference. She runs at a constant speed of 6 meters per second. Olivia starts running from the same point 20 seconds later at 8 meters per second. After how many seconds will Olivia catch up to Emma?",
        answers: [
            { text: "80", correct: false},
            { text: "100", correct: false},
            { text: "120", correct: true},
            { text: "140", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "A construction company is building a rectangular swimming pool. The length of the pool is 5 meters more than twice the width. The pool's area is 180 square meters. What is the width of the pool?",
        answers: [
            { text: "9 meters", correct: true},
            { text: "10 meters", correct: false},
            { text: "11 meters", correct: false},
            { text: "12 meters", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "A train travels from City A to City B at an average speed of 60 mph. On the return trip, due to track maintenance, the train travels at an average speed of 40 mph. If the total travel time for both trips is 5 hours, what is the distance between City A and City B?",
        answers: [
            { text: "100 miles", correct: false},
            { text: "120 miles", correct: true},
            { text: "140 miles", correct: false},
            { text: "150 miles", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "A sphere is inscribed inside a cube with a volume of 64 cubic inches. What is the ratio of the volume of the sphere to the volume of the cube?",
        answers: [
            { text: "π/6", correct: true},
            { text: "π/4", correct: false},
            { text: "π/3", correct: false},
            { text: "π/2", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "Sophia is designing a rectangular garden where the length is 3 meters longer than twice the width. To reduce costs, she decides to decrease both dimensions by 20%, which reduces the area by 32 square meters. What was the original width of the garden?",
        answers: [
            { text: "5 meters", correct: false},
            { text: "6 meters", correct: true},
            { text: "7 meters", correct: false},
            { text: "8 meters", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "Ethan and Mia are running a relay race. Ethan runs the first part at 8 meters per second, and Mia runs the second part at 12 meters per second. If the total distance is 400 meters and they finish in 40 seconds, how far did Ethan run?",
        answers: [
            { text: "150 meters", correct: false},
            { text: "160 meters", correct: true},
            { text: "175 meters", correct: false},
            { text: "180 meters", correct: false},
        ],
        difficulty:"hard"
    },    {
        question: "A cylindrical water tank is being filled by two pipes. Pipe A can fill the tank in 6 hours, while Pipe B can fill it in 9 hours. If both pipes are opened together but Pipe B is turned off after 3 hours, how much longer will Pipe A take to completely fill the tank?",
        answers: [
            { text: "1.5 hours", correct: false},
            { text: "2 hours", correct: true},
            { text: "2.5 hours", correct: false},
            { text: "3 hours", correct: false},
        ],
        difficulty:"hard"
    },
    { 
        question: "A scientist is studying bacteria growth. A bacteria culture doubles in population every 4 hours. If there were initially 500 bacteria, how many will there be after 24 hours?",
        answers: [
            { text: "16,000", correct: false }, 
            { text: "32,000", correct: false }, 
            { text: "64,000", correct: false }, 
            { text: "128,000", correct: true } 
        ],
        difficulty: "hard"
    },
    { 
        question: "A cylindrical water tank is being drained. It originally holds 500 gallons of water, but 10% of the remaining water is drained every hour. How much water remains after 5 hours, rounded to the nearest gallon?",
        answers: [
            { text: "275", correct: false }, 
            { text: "295", correct: false }, 
            { text: "328", correct: false }, 
            { text: "295", correct: true } 
        ],
        difficulty: "hard"
    },
    { 
        question: "An airplane is flying from City A to City B, a total distance of 1,500 miles. The airplane flies against the wind at 500 mph for half the trip and with the wind at 600 mph for the other half. What is the total flight time?",
        answers: [
            { text: "2.5 hours", correct: false }, 
            { text: "2.6 hours", correct: false }, 
            { text: "2.8 hours", correct: false }, 
            { text: "2.75 hours", correct: true } 
        ],
        difficulty: "hard"
    },
    { 
        question: "A car's value depreciates by 15% each year. If the car was originally purchased for $30,000, what will its value be after 3 years, rounded to the nearest dollar?",
        answers: [
            { text: "$18,520", correct: false }, 
            { text: "$19,275", correct: false }, 
            { text: "$20,250", correct: false }, 
            { text: "$19,275", correct: true } 
        ],
        difficulty: "hard"
    },
    { 
        question: "A farmer has a rectangular field that is 200 feet long and 150 feet wide. He wants to build a circular pond that takes up exactly 25% of the field’s area. What should the radius of the pond be, rounded to the nearest foot?",
        answers: [
            { text: "30 feet", correct: false }, 
            { text: "35 feet", correct: false }, 
            { text: "40 feet", correct: false }, 
            { text: "38 feet", correct: true } 
        ],
        difficulty: "hard"
    }    

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let currentDifficulty = "medium";
let usedQuestions = [];
let recentAnswers = [];
const totalQuestions = 44;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    usedQuestions = [];
    recentAnswers = [];
    nextButton.innerHTML = "Next";
    showQuestion(selectNextQuestion());
}

function selectNextQuestion() {
    let questionPool = questions.filter(q => q.difficulty === currentDifficulty && !usedQuestions.includes(q));
    
    if (questionPool.length === 0) {
        questionPool = questions.filter(q => !usedQuestions.includes(q)); // Fallback if difficulty pool is empty
    }

    let nextQuestion = getRandomQuestions(questionPool, 1)[0]; 
    usedQuestions.push(nextQuestion);
    return nextQuestion;
}

function getRandomQuestions(questionSet, num) {
    let shuffled = questionSet.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function showQuestion(question) {
    resetState();

    if (currentQuestionIndex >= totalQuestions) {
        showScore();
        return;
    }

    questionElement.innerHTML = question.question;
    
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", () => selectAnswer(button, question));
    });

    updateProgressBar();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(selectedBtn, question) {
    const isCorrect = selectedBtn.dataset.correct === "true";
    recentAnswers.push(isCorrect);
    if (recentAnswers.length > 5) recentAnswers.shift(); // Keep last 5 responses

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        score += question.difficulty === "easy" ? 1 : question.difficulty === "medium" ? 2 : 2.5;
    } else {
        selectedBtn.classList.add("incorrect");

        // Highlight the correct answer
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => button.disabled = true);

    // Adjust difficulty for next question
    let correctCount = recentAnswers.filter(Boolean).length;
    if (correctCount >= 4) currentDifficulty = "hard";
    else if (correctCount >= 2) currentDifficulty = "medium";
    else currentDifficulty = "easy";

    nextButton.style.display = "block";
}

function showScore() { 
    resetState();

    let numEasy = usedQuestions.filter(q => q.difficulty === "easy").length;
    let numMedium = usedQuestions.filter(q => q.difficulty === "medium").length;
    let numHard = usedQuestions.filter(q => q.difficulty === "hard").length;

    let expectedMaxScore = (14 * 1) + (15 * 2) + (15 * 2.5);
    let rawScore = score;
    let mathScore = Math.round((rawScore / expectedMaxScore) * 600 + 200);
    let readingScore = localStorage.getItem("readingScore") || 200;
    let totalSATScore = parseInt(readingScore) + mathScore;

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
    if (currentQuestionIndex < totalQuestions) {
        showQuestion(selectNextQuestion());
    } else {
        showScore();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < totalQuestions) {
        handleNextButton();
    } else {
        homelink();
    }
});

function homelink() {
    location.href = "https://www.brainjelli.com";
}

startQuiz();