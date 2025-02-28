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


const questions = [
    {
        question: "Emma stepped into the grand ballroom, her gown brushing against the polished floor as chandeliers cast golden light across the room. The guests moved with ease, their conversations flowing effortlessly. She had imagined this moment countless times, yet standing there now, a strange unease settled in her chest. Adjusting her gloves, she forced a smile and took a hesitant step forward, unsure if she truly belonged.<br/><br/>What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "She is eager to impress others and makes a confident entrance into the event.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    }
    ,
{
    question: "Daniel stepped into the office, straightening his tie as he took in the bustling atmosphere. Conversations hummed around him, and the clatter of keyboards filled the air. He had spent weeks preparing for this moment, yet a small knot of doubt twisted in his stomach. He took a deep breath and walked toward his desk, reminding himself that everyone had to start somewhere.<br/><br/>What does the passage suggest about Daniel's attitude toward his new job?",
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
    question: "Sophia reread the email, tapping her fingers on the desk. Her mentor had suggested a different approach to her project, one that she hadn’t considered. She respected his experience, but something about his suggestion didn’t sit right with her. She sighed, making a note to discuss it with him further before making a final decision.<br/><br/>Based on the passage, what can be inferred about Sophia’s relationship with her mentor?",
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
    question: "Marcus stared at the letter in his hands, reading the words again as if they might change. He had been so sure of the outcome, had allowed himself to hope. A tight smile formed on his lips as he folded the paper and placed it back in the envelope. He nodded at his friend across the table. ‘Well,’ he said, ‘guess I’ll have to figure out a new plan.’<br/><br/>What does the passage imply about Marcus’s reaction to the unexpected news?",
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
    question: "Olivia closed the last box and looked around her empty apartment. The city she had called home for years now felt distant, like a chapter of a book she had finished reading. She had made the decision to move on her own, but that didn’t mean it was easy. As she picked up her suitcase, she smiled, a mixture of excitement and nervousness buzzing inside her.<br/><br/>What can be inferred about Olivia’s decision to move to a new city?",
    answers: [
        { text: "She is both excited and nervous about the challenges ahead.", correct: true },
        { text: "She is completely confident that the move will solve all her problems.", correct: false },
        { text: "She was forced to move against her will and resents the change.", correct: false },
        { text: "She regrets her decision and is already planning to return home.", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "inference"
},
{
    question: "Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript. Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind. He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.<br/><br/>Which choice provides the best evidence for the idea that Liam is uncertain about his work?",
    answers: [
        { text: "A) 'Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind.'", correct: true },
        { text: "B) 'He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.'", correct: false },
        { text: "C) 'Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript.'", correct: false },
        { text: "D) 'He had imagined this moment countless times, picturing the satisfaction of a completed draft.'", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Command of Evidence"
},
{
    question: "The scientist adjusted her glasses, peering at the data displayed on the screen. The results were unexpected—far different from what she and her team had predicted. She tapped her fingers against the desk, reviewing each calculation. There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.<br/><br/>Which sentence best supports the idea that the scientist is struggling to accept her findings?",
    answers: [
        { text: "A) 'The scientist adjusted her glasses, peering at the data displayed on the screen.'", correct: false },
        { text: "B) 'She tapped her fingers against the desk, reviewing each calculation.'", correct: false },
        { text: "C) 'The results were unexpected—far different from what she and her team had predicted.'", correct: false },
        { text: "D) 'There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.'", correct: true },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Command of Evidence"
},
{
    question: "Marcus hesitated before stepping onto the crowded train. The air was thick with conversation, the rhythmic hum of movement filling the space. He reached for a handrail but quickly withdrew, pressing himself against the door instead. The thought of being surrounded on all sides made his chest tighten.<br/><br/>Which sentence provides the strongest evidence that Marcus is experiencing discomfort?",
    answers: [
        { text: "A) 'Marcus hesitated before stepping onto the crowded train.'", correct: false },
        { text: "B) 'The air was thick with conversation, the rhythmic hum of movement filling the space.'", correct: false },
        { text: "C) 'He reached for a handrail but quickly withdrew, pressing himself against the door instead.'", correct: true },
        { text: "D) 'The thought of being surrounded on all sides made his chest tighten.'", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "Command of Evidence"
}
,{
    question: "Nina’s voice wavered as she stepped onto the stage, her heart pounding in her chest. The bright lights obscured the faces in the audience, but she knew they were there—watching, waiting. She took a deep breath, gripping the microphone tightly, and forced herself to begin.<br/><br/>Which choice provides the best evidence that Nina is nervous about performing?",
    answers: [
        { text: "A) 'Nina’s voice wavered as she stepped onto the stage, her heart pounding in her chest.'", correct: true },
        { text: "B) 'The bright lights obscured the faces in the audience, but she knew they were there—watching, waiting.'", correct: false },
        { text: "C) 'She took a deep breath, gripping the microphone tightly.'", correct: false },
        { text: "D) 'She forced herself to begin.'", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "Command of Evidence"
}
{
    question: "Oliver adjusted the straps of his backpack and took a deep breath. The forest stretched before him, an endless maze of towering trees and winding paths. He had studied the map thoroughly, yet now, standing here, he realized that the landmarks weren’t as clear as he had expected. Every direction looked the same.<br/><br/>Which sentence best supports the idea that Oliver is unsure of where to go?",
    answers: [
        { text: "A) 'Oliver adjusted the straps of his backpack and took a deep breath.'", correct: false },
        { text: "B) 'The forest stretched before him, an endless maze of towering trees and winding paths.'", correct: false },
        { text: "C) 'He had studied the map thoroughly, yet now, standing here, he realized that the landmarks weren’t as clear as he had expected.'", correct: true },
        { text: "D) 'Every direction looked the same.'", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Command of Evidence"
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
    location.href = "https://www.brainjelli.com/user-profile.html";
}

startQuiz();
