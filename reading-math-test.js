const passageElement = document.getElementById("passage");  // Changed from questionElement
const questionElement = document.getElementById("question"); // New element for question
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const continueButton = document.getElementById("continue-btn");
const countdownEl = document.getElementById('countdown');
const satIntroContainer = document.getElementById("sat-intro-container");
const startTestButton = document.getElementById("start-test-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {}; // Tracks { category: { correct: 0, incorrect: 0 } }
let results = localStorage.getItem("testResults");
results = results ? JSON.parse(results) : {};
let refreshIntervalId;
let isMathTest = false;
let time;
let userResponses = []; // Stores { question, userAnswer, correctAnswer, wasCorrect }

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
    
    {
        passage: "Dr. Evelyn adjusted her telescope, her heart pounding. For years, she had tracked the celestial anomaly, and tonight was the closest it had ever been. But as she peered through the lens, a flicker of doubt crept in—was this truly an anomaly, or had she miscalculated? The data seemed inconsistent, the patterns slightly off. She hesitated before recording her findings, torn between excitement and uncertainty.",
        question: "Which choice provides the best evidence that Dr. Evelyn questions the validity of her findings?",
        answers: [
            { text: "A) 'But as she peered through the lens, a flicker of doubt crept in—was this truly an anomaly, or had she miscalculated?'",correct: true },
            { text: "B) 'For years, she had tracked the celestial anomaly, and tonight was the closest it had ever been.'", correct: false },
            { text: "C) 'She hesitated before recording her findings, torn between excitement and uncertainty.'", correct: false },
            { text: "D) 'The data seemed inconsistent, the patterns slightly off.'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "Jonah scanned the ancient manuscript, tracing his fingers over the faded ink. His mentor had always insisted that the text contained hidden wisdom, yet certain phrases seemed deliberately obscured. He furrowed his brow. Was he interpreting the words correctly, or was he merely seeing what he wanted to see? He turned the page, wary of his own biases.",
        question: "Which choice provides the best evidence that Jonah is uncertain about his interpretation?",
        answers: [
            { text: "A) 'Was he interpreting the words correctly, or was he merely seeing what he wanted to see?'",correct: true },
            { text: "B) 'Jonah scanned the ancient manuscript, tracing his fingers over the faded ink.'", correct: false },
            { text: "C) 'His mentor had always insisted that the text contained hidden wisdom.'", correct: false },
            { text: "D) 'He turned the page, wary of his own biases.'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "Amara hesitated before stepping onto the podium. The speech she had rehearsed was logical and well-structured, but a nagging feeling told her she was missing something. The audience’s expectant silence pressed down on her. Had she truly captured the full complexity of the issue, or had she oversimplified the nuances?",
        question: "Which choice provides the best evidence that Amara doubts the completeness of her speech?",
        answers: [
            { text: "A) 'Had she truly captured the full complexity of the issue, or had she oversimplified the nuances?'",correct: true },
            { text: "B) 'Amara hesitated before stepping onto the podium.'", correct: false },
            { text: "C) 'The speech she had rehearsed was logical and well-structured.'", correct: false },
            { text: "D) 'The audience’s expectant silence pressed down on her.'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The historian paused, her pen hovering above the page. She had gathered extensive accounts of the battle, but discrepancies lurked within them. Different sources provided conflicting details—one claimed the general had led the charge personally, another suggested he had remained at the rear. She sighed, unsure which version aligned with the truth.",
        question: "Which choice provides the best evidence that the historian is uncertain about the accuracy of the sources?",
        answers: [
            { text: "A) 'She sighed, unsure which version aligned with the truth.'", correct: true },
            { text: "B) 'The historian paused, her pen hovering above the page.'", correct: false },
            { text: "C) 'Different sources provided conflicting details.'", correct: false },
            { text: "D) 'One claimed the general had led the charge personally, another suggested he had remained at the rear.'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "Nia stepped back from her canvas, tilting her head. She had envisioned the painting as a bold statement, yet now, something felt off. The colors clashed in unexpected ways, and the balance seemed unsteady. She bit her lip, wondering if she had lost sight of her original vision or if she was being too harsh on herself.",
        question: "Which choice provides the best evidence that Nia is second-guessing her artistic choices?",
        answers: [
            { text: "A) 'She bit her lip, wondering if she had lost sight of her original vision or if she was being too harsh on herself.'", correct: true },
            { text: "B) 'Nia stepped back from her canvas, tilting her head.'", correct: false },
            { text: "C) 'The colors clashed in unexpected ways, and the balance seemed unsteady.'", correct: false },
            { text: "D) 'She had envisioned the painting as a bold statement, yet now, something felt off.'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "Dr. Aris Thorne surveyed the labyrinthine network of wires snaking across his laboratory floor. Years he'd spent chasing this phantom signal, this whisper from the void. Colleagues called it obsession, funders called it folly, but Thorne knew it was the key. The latest readings, however, showed an anomaly – not the structured pattern he sought, but a chaotic surge, mirroring the electrical storm raging outside. He adjusted a dial, his knuckles white. Was this interference, or was it something... responding?",
        question: "The passage implies that Dr. Thorne's reaction to the anomaly is primarily one of:",
        answers: [
            { text: "A) Frustration that external factors are corrupting his data.", correct: false },
            { text: "B) Resignation to the likelihood that his project is a failure.", correct: false },
            { text: "C) Cautious apprehension mixed with a dawning sense of possibility.", correct: true },
            { text: "D) Annoyance at his colleagues for doubting his methods.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference",

    },
    {
        passage: "The old cartographer traced a faded line on the parchment map, his finger hovering over a region marked only with swirling eddies and the notation 'Hic Dracones'—Here be Dragons. 'Most ships chart a wide course around this,' he murmured, his voice raspy like dry leaves. 'They see only the warning. But look closer at the currents, the way the ink suggests hidden landmasses just beneath the waves... The warning isn't just about peril; it's about what the peril guards.'",
        question: "It can be inferred from the cartographer's words that he believes the 'Hic Dracones' notation:",
        answers: [
            { text: "A) Is an outdated symbol that no longer holds any real meaning for navigation.", correct: false },
            { text: "B) Represents not only danger but also the potential for significant discovery.", correct: true },
            { text: "C) Was intentionally drawn inaccurately to mislead rival explorers.", correct: false },
            { text: "D) Primarily indicates treacherous weather patterns common to the area.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference",

    },
    {
        passage: "Lila watched the sculptor work, his hands moving with a surety that seemed almost involuntary. He chipped away at the marble block, not imposing a form, but revealing one he insisted was already there. 'You don't *create* the statue,' he’d told her once, eyes distant, 'you simply liberate it from the stone.' Yet, Lila saw the sweat on his brow, the calculations in his gaze, the discarded sketches piling up. The liberation, it seemed, required considerable human effort and intention.",
        question: "The passage suggests that Lila's perspective on the sculptor's process is characterized by:",
        answers: [
            { text: "A) Complete acceptance of his mystical view of creation.", correct: false },
            { text: "B) Skepticism towards the artistic merit of his work.", correct: false },
            { text: "C) Dismissal of his technical skills in favor of his philosophy.", correct: false },
            { text: "D) An acknowledgement of his philosophy tempered by an awareness of the practical labor involved.", correct: true },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference",

    },
    {
        passage: "The city ordinance declared all street music illegal after 10 p.m. Yet, every Tuesday, precisely at midnight, the faint, melancholic strains of a lone violin would drift from the vicinity of the old clock tower. No one ever saw the player, and patrols reported finding nothing. Some residents complained, others left small offerings of coins or flowers near the tower's base the next morning. The music, ethereal and mournful, seemed to weave itself into the city's sleeping consciousness, a secret shared.",
        question: "What does the passage imply about the community's reaction to the violinist?",
        answers: [
            { text: "A) Universal disapproval due to the violation of the city ordinance.", correct: false },
            { text: "B) Complete indifference, as the music is barely noticeable.", correct: false },
            { text: "C) A divided response, with some tolerating or even appreciating the music despite its illegality.", correct: true },
            { text: "D) Fear and superstition, attributing the music to supernatural origins.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference",

    },


    
        {
            passage: "Dr. Aris Thorne surveyed the labyrinthine network of wires snaking across his laboratory floor. Years he'd spent chasing this phantom signal, this whisper from the void. Colleagues called it obsession, funders called it folly, but Thorne knew it was the key. The latest readings, however, showed an anomaly – not the structured pattern he sought, but a chaotic surge, mirroring the electrical storm raging outside. He adjusted a dial, his knuckles white. Was this interference, or was it something... responding?",
            question: "The passage implies that Dr. Thorne's reaction to the anomaly is primarily one of:",
            answers: [
                { text: "A) Frustration that external factors are corrupting his data.", correct: false },
                { text: "B) Resignation to the likelihood that his project is a failure.", correct: false },
                { text: "C) Cautious apprehension mixed with a dawning sense of possibility.", correct: true },
                { text: "D) Annoyance at his colleagues for doubting his methods.", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",

        },
        {
            passage: "The old cartographer traced a faded line on the parchment map, his finger hovering over a region marked only with swirling eddies and the notation 'Hic Dracones'—Here be Dragons. 'Most ships chart a wide course around this,' he murmured, his voice raspy like dry leaves. 'They see only the warning. But look closer at the currents, the way the ink suggests hidden landmasses just beneath the waves... The warning isn't just about peril; it's about what the peril guards.'",
            question: "It can be inferred from the cartographer's words that he believes the 'Hic Dracones' notation:",
            answers: [
                { text: "A) Is an outdated symbol that no longer holds any real meaning for navigation.", correct: false },
                { text: "B) Represents not only danger but also the potential for significant discovery.", correct: true },
                { text: "C) Was intentionally drawn inaccurately to mislead rival explorers.", correct: false },
                { text: "D) Primarily indicates treacherous weather patterns common to the area.", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",

        },
        {
            passage: "Lila watched the sculptor work, his hands moving with a surety that seemed almost involuntary. He chipped away at the marble block, not imposing a form, but revealing one he insisted was already there. 'You don't *create* the statue,' he’d told her once, eyes distant, 'you simply liberate it from the stone.' Yet, Lila saw the sweat on his brow, the calculations in his gaze, the discarded sketches piling up. The liberation, it seemed, required considerable human effort and intention.",
            question: "The passage suggests that Lila's perspective on the sculptor's process is characterized by:",
            answers: [
                { text: "A) Complete acceptance of his mystical view of creation.", correct: false },
                { text: "B) Skepticism towards the artistic merit of his work.", correct: false },
                { text: "C) Dismissal of his technical skills in favor of his philosophy.", correct: false },
                { text: "D) An acknowledgement of his philosophy tempered by an awareness of the practical labor involved.", correct: true },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",

        },
        {
            passage: "The city ordinance declared all street music illegal after 10 p.m. Yet, every Tuesday, precisely at midnight, the faint, melancholic strains of a lone violin would drift from the vicinity of the old clock tower. No one ever saw the player, and patrols reported finding nothing. Some residents complained, others left small offerings of coins or flowers near the tower's base the next morning. The music, ethereal and mournful, seemed to weave itself into the city's sleeping consciousness, a secret shared.",
            question: "What does the passage imply about the community's reaction to the violinist?",
            answers: [
                { text: "A) Universal disapproval due to the violation of the city ordinance.", correct: false },
                { text: "B) Complete indifference, as the music is barely noticeable.", correct: false },
                { text: "C) A divided response, with some tolerating or even appreciating the music despite its illegality.", correct: true },
                { text: "D) Fear and superstition, attributing the music to supernatural origins.", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",

        },
        {
            passage: "Councillor Thorne argued passionately for the new conservation initiative, citing ecological collapse and dwindling resources. His opponent, Councillor Davies, listened patiently, then rose. 'Mr. Thorne paints a dire picture,' Davies began, adjusting his tie. 'And while his concerns for our natural spaces are noted, we must also consider the immediate economic impact. Halting the North Valley development project, as his initiative demands, means jobs lost *today*, families struggling *tomorrow*. Surely, a balance can be struck that doesn't sacrifice our present prosperity for a hypothetical future.'",
            question: "The passage suggests that Councillor Davies' primary rhetorical strategy is to:",
            answers: [
                { text: "A) Directly refute Thorne's ecological data with counter-evidence.", correct: false },
                { text: "B) Question Thorne's motives for proposing the initiative.", correct: false },
                { text: "C) Appeal to the audience's immediate, practical concerns over long-term environmental issues.", correct: true },
                { text: "D) Propose a detailed alternative plan that addresses both environmental and economic needs.", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",
            
        }
    


]

const mathQuestions = [
    {
        passage: "", // Empty passage for math questions
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

function startTest() {
    satIntroContainer.classList.add("hide"); // Hide the intro container
    document.getElementById("question-container").classList.remove("hide"); // Show the question container
    startReadingWritingTest(); // Start the test
}

function startReadingWritingTest() {
    isMathTest = false;
    time = 64 * 60;
    userResponses = []; // Reset userResponses only at the start of the full test
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endReadingWritingTest, 3840000); // 64 minutes in milliseconds
    startQuiz(readingWritingQuestions, 18, 18, 18);
}

function startMathTest() {
    isMathTest = true;
    time = 70 * 60;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endMathTest, 4200000); // 44 minutes in milliseconds
    startQuiz(mathQuestions, 14, 15, 15);
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    if (time === 0) {
        clearInterval(refreshIntervalId);
        if (isMathTest) {
            endMathTest();
        } else {
            endReadingWritingTest();
        }
    } else {
        time--;
    }
}

function endReadingWritingTest() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("break-message").classList.remove("hide");
    document.querySelector(".question-row").classList.remove("score-display");
    nextButton.classList.remove("centered-btn"); // Reset button centering
}

function endMathTest() {
    clearInterval(refreshIntervalId);
    resetState();
    showScore();
}

function startQuiz(questions, numEasy, numMedium, numHard) {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};
    // Removed userResponses = []; to preserve responses across sections
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
    passageElement.innerHTML = currentQuestion.passage;  // Display passage
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;  // Display question

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
    console.log("Resetting state...");
    nextButton.style.display = "none"; // Hide button initially
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

    // Debug logging
    console.log("Answer selected. Showing Next button...");
    nextButton.style.display = "block"; // Should show the button
    nextButton.disabled = false;
    console.log("Next button display:", nextButton.style.display); // Verify style
    console.log("Next button disabled:", nextButton.disabled); // Verify enabled state
}


function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore;
    if (!isMathTest) {
        maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3);
    } else {
        maxPossibleScore = (14 * 1) + (15 * 2) + (15 * 3);
    }
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    // Ensure question-container is visible when showing the score
    document.getElementById("question-container").classList.remove("hide");

    if (!isMathTest) {
        localStorage.setItem("readingScore", scaledScore);
        passageElement.innerHTML = "";  // Clear passage
        questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
        questionElement.classList.add("centered-score");
        // Adjust the question-row to center content
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn"); // Add class for centering
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

        passageElement.innerHTML = "";  // Clear passage
        questionElement.innerHTML = `<p><strong>Reading and Writing SAT Score:</strong> ${readingScore} / 800</p>
                                    <p><strong>Math SAT Score:</strong> ${mathScore} / 800</p>
                                    <p><strong>Total SAT Score:</strong> ${totalSATScore} / 1600</p>`;
        questionElement.classList.add("centered-score");
        // Adjust the question-row to center content
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Review Incorrect Answers";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn"); // Add class for centering
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", showExplanations);
    }
}
function showExplanations() {
    resetState();
    passageElement.innerHTML = "";  // Clear passage
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
    const passageText = response.passage || ""; // Include passage text for better context if needed
    const questionId = response.questionId || ""; // Use ID if available
    const followUp = response.followUpQuestion || ""; // Check if it's an evidence question

    // --- Existing Explanations (Keep ALL previous ones here) ---
    if (passageText.includes("Emma stepped into the grand ballroom")) {
        return "Emma’s unease and hesitation ('strange unease settled in her chest', 'hesitant step forward', 'unsure if she truly belonged') suggest she feels out of place, despite her anticipation ('imagined this moment countless times'). The text highlights her discomfort rather than excitement (B), immediate departure (C), or confidence (D).";
    } else if (passageText.includes("Daniel stepped into the office")) {
        return "Daniel’s doubt and deep breath indicate uncertainty, but his reminder that 'everyone had to start somewhere' shows determination, not disinterest or regret.";
    } else if (passageText.includes("Liam set his pen down")) {
        return "The best evidence is the explicit mention of 'nagging doubt,' directly showing his uncertainty about the manuscript’s quality.";
    } else if (passageText.includes("The scientist adjusted her glasses")) {
        return "The scientist’s struggle to accept the findings is best supported by her disbelief in the consistent results, despite repeated checks.";
    } else if (questionText.includes("An airplane is flying from City A to City B")) {
        return "The trip is split into two 750-mile segments. Time against the wind = 750 / 500 = 1.5 hours. Time with the wind = 750 / 600 = 1.25 hours. Total time = 1.5 + 1.25 = 2.75 hours.";
    } else if (questionText.includes("A car's value depreciates by 15%")) {
        return "Initial Value: $30,000. After Year 1: $30,000 × (1 - 0.15) = $30,000 × 0.85 = $25,500. After Year 2: $25,500 × 0.85 = $21,675. After Year 3: $21,675 × 0.85 = $18,423.75. Rounded to the nearest dollar is $18,424.";
    } else if (questionText.includes("The function f(x) is defined")) {
        return "Substitute x = 4 into f(x) = 2x² - 3x + 5: f(4) = 2(4²) - 3(4) + 5 = 2(16) - 12 + 5 = 32 - 12 + 5 = 25.";
    } else if (questionText.includes("A company rents out bicycles")) {
        return "Let h be the number of hours. The total cost is $12 (flat fee) + $3 × h (hourly charge). The budget is $45. So, the inequality is 12 + 3h ≤ 45. Subtract 12 from both sides: 3h ≤ 33. Divide by 3: h ≤ 11. The maximum number of full hours Sarah can rent the bicycle is 11 hours.";
    } else if (questionText.includes("Dr. Thorne's reaction to the anomaly")) {
         return "The passage describes Thorne's long dedication ('Years he'd spent') and belief in the signal's importance ('knew it was the key'). The anomaly is 'chaotic,' mirroring the storm, suggesting interference (apprehension). However, the description 'his knuckles white' and the final question 'Was this interference, or was it something... responding?' strongly suggest he hasn't dismissed it but considers it might be the signal itself reacting, indicating a 'dawning sense of possibility.' A) is plausible but ignores the 'responding?' thought. B) contradicts his dedication and the intensity of his reaction. D) mentions his colleagues' doubts but isn't his primary reaction *to the anomaly*.";
    } else if (questionText.includes("cartographer's words that he believes the 'Hic Dracones' notation")) {
        return "The cartographer explicitly states that while most see only 'warning' and 'peril,' he sees hints of 'hidden landmasses.' His concluding remark, 'The warning isn't just about peril; it's about what the peril guards,' directly implies that the danger (dragons/eddies) protects something valuable or undiscovered. This supports B). A) is incorrect because he is taking the notation seriously. C) is speculation not supported by the text. D) focuses only on one aspect (weather/currents) and misses the core inference about guarded discovery.";
    } else if (questionText.includes("Lila's perspective on the sculptor's process")) {
        return "Lila recounts the sculptor's philosophy ('liberate it from the stone') but contrasts it with her observations: 'sweat on his brow, the calculations in his gaze, the discarded sketches.' Her concluding thought emphasizes the 'considerable human effort and intention' required. This indicates she understands his stated philosophy but recognizes the underlying hard work and deliberate craft involved, matching D). A) is incorrect because she observes evidence contradicting his purely mystical view. B) is incorrect; she doesn't question the merit, only the description of the process. C) is the opposite; she clearly sees his technical effort.";
    } else if (questionText.includes("community's reaction to the violinist")) {
        return "The passage states the music is illegal ('ordinance declared... illegal'). However, it also mentions that while 'Some residents complained,' others 'left small offerings.' This contrast directly shows a divided community response. The description of the music weaving 'into the city's sleeping consciousness, a secret shared' further suggests tolerance and perhaps appreciation by at least part of the community. Therefore, C) accurately reflects this division. A) ignores the offerings. B) contradicts the complaints and offerings. D) mentions the mystery ('No one ever saw the player') but focuses on 'offerings' and 'shared secret,' not fear or superstition.";
    } else if (questionText.includes("Councillor Davies' primary rhetorical strategy")) {
        return "Davies acknowledges Thorne's concerns ('are noted') but immediately pivots to 'immediate economic impact,' 'jobs lost *today*,' and 'families struggling *tomorrow*.' He frames the issue as a conflict between present needs ('present prosperity') and future environmental concerns ('hypothetical future'). This is a direct appeal to the audience's practical, immediate worries (jobs, economy) as a counterweight to Thorne's environmental arguments. This aligns perfectly with C). A) is incorrect; Davies doesn't offer counter-data, he shifts the focus. B) is incorrect; he doesn't attack Thorne's motives. D) is incorrect; while he mentions striking a 'balance,' he doesn't propose a specific alternative plan in this excerpt, he primarily focuses on the economic argument against Thorne's current proposal.";
    } else if (questionId === "sharma_q1" && !followUp) {
         return "Sharma feels both 'reverence bordering on apprehension' (line 1) and recognizes the finding contradicts established knowledge (line 4). She considers mundane explanations (line 5) but also the possibility of rewriting history (line 6), feeling the 'weight of implication' (line 7). This mix of doubt, potential significance, and emotional weight points to 'troubled excitement' (C), not mere confidence (A), certainty of error (B), or indifference (D).";
    } else if (followUp === "sharma_q1") {
        return "The best evidence for Sharma's 'troubled excitement' is found in lines 6-7. Line 6 presents the exciting, history-altering possibility ('hold a secret that could rewrite history?'), while line 7 conveys the troubled aspect ('the weight of implication settling heavily upon her'). A) sets the scene but not her reaction to the specific finding. B) describes the anomaly itself. C) lists possible mundane explanations (the 'troubled' part) but misses the 'excitement'/'implication' part captured best by D).";
    } else if (questionId === "petrova_q1" && !followUp) {
        return "The passage states Petrova 'theorized' (line 4) a novel explanation for the terns' efficiency, which challenges existing models (line 3, 7). It explicitly mentions that 'direct proof remains elusive' (line 5) but that 'indirect evidence... lends credence' (line 6). This supports the idea that the hypothesis is 'speculative but plausible' (B). It's not proven (A), outdated (C), or just a minor refinement (D).";
    } else if (followUp === "petrova_q1") {
        return "Lines 5-6 directly address the status of Petrova's hypothesis. 'While direct proof remains elusive' shows it's speculative, and 'indirect evidence... lends credence' shows it's considered plausible. This perfectly supports answer B of the previous question. A) states the paradox. B) notes the failure of old models. D) describes the hypothesis's implication but not its current standing regarding proof.";
    } else if (questionId === "finch_q1" && !followUp) {
        return "Finch argues that 'even acts appearing selfless often harbor subtle, subconscious benefits for the actor' (line 2), listing examples like alleviating guilt or gaining virtue. This directly supports the idea that these actions involve 'indirect benefits' (B). While social bonds are mentioned as one benefit, he doesn't claim status is the sole or primary driver (A). He sees reciprocity as advantageous, not maladaptive (C). He reframes the value, not denying it if self-interest is present (D).";
    } else if (followUp === "finch_q1") {
        return "Line 2 is the most direct statement of Finch's core argument regarding seemingly altruistic acts: 'He contended that even acts appearing selfless often harbor subtle, subconscious benefits for the actor...'. This line explicitly introduces the concept of indirect benefits. A) introduces Finch's topic. C) gives his reasoning about evolutionary advantage. D) clarifies that he doesn't diminish the value of kindness.";
    } else if (questionId === "vance_q1" && !followUp) {
        return "The passage contrasts critics' views (line 3: 'dismissed this shift as creative exhaustion or a deliberate alienation') with Vance's intention revealed in her journals (line 5: 'distilling sound to its essence,' line 7: 'intensifying focus rather than diminishing content'). Critics saw a lack (exhaustion/diminishing), while Vance intended refinement/focus (essence/intensifying). This matches C). A) is wrong; critics lamented. B) is not mentioned. D) is wrong; critics didn't necessarily appreciate the depth, and Vance felt she was adding significance (line 6).";
    } else if (followUp === "vance_q1") {
        return "To support the contrast identified in Q1 (C), evidence for both Vance's intention and the critical reception is needed. Line 5 ('She described it as distilling sound to its essence') shows her goal of refinement. Line 7 ('aimed at intensifying focus rather than diminishing content') further clarifies her intent was not diminishment. Contrasting this with the critical dismissal mentioned in line 3 (creative exhaustion/alienation) requires referencing Vance's stated goals found in lines 5 and 7. Line 3 alone only gives the critics' view. Lines 4-5 start introducing her view but line 7 adds crucial clarification. Lines 1-2 describe the style, not the interpretation difference.";
     } else if (questionId === "smartcity_q1" && !followUp) {
         return "The passage outlines benefits (line 2) but focuses on drawbacks: 'profound privacy concerns' (line 2), lack of understanding leading to 'anxieties about surveillance and potential misuse' (line 3), and the potential to 'deepen the digital divide' (line 4). Line 5 explicitly states the 'central challenge' is 'Striking a balance between technological advancement and ethical considerations, particularly data sovereignty and equity'. This clearly points to C) as the significant obstacle. A), B), and D) are not mentioned as primary issues.";
     } else if (followUp === "smartcity_q1") {
         return "Line 5 provides the most direct and comprehensive evidence summarizing the central obstacle. It explicitly frames the core problem as 'Striking a balance between technological advancement and ethical considerations, particularly data sovereignty and equity,' which encapsulates the difficulty of ensuring ethical and equitable use described in Q1 (C). A) mentions benefits and privacy concerns but doesn't summarize the core challenge. B) describes citizen anxiety (part of the ethical concern). C) describes the equity issue (another part). Line 5 synthesizes these ethical/equitable issues as the main challenge.";
     } else if (questionId === "elara_q1" && !followUp) {
        return "Elara has prepared her refusal (line 5) indicating a personal desire, but finds it difficult because of Julian's expectation and the 'weight of family obligation' (line 6). This points directly to a conflict between what she wants and what she feels obligated to do for her family (B). Her difficulty isn't just articulation (A), primarily resentment (C), or uncertainty about her plans (D), but the conflict with perceived duty.";
    } else if (followUp === "elara_q1") {
        return "Lines 5-6 best illustrate the conflict. Line 5 shows her preparation ('practiced her refusal'), indicating her personal desire. Line 6 contrasts this with the external pressure ('faced with his expectation – the weight of family obligation pressing down') that makes her hesitate. This directly supports the clash between personal desire and family duty (B). A) sets the mood. B) shows her avoidance but not the core conflict. D) describes her feeling *about* the conflict, not the conflict itself.";
    } else if (questionId === "tanaka_q1" && !followUp) {
        return "Tanaka calls the findings 'alarming' (line 2) because they contradict models (line 3). He offers a hypothesis but calls it 'preliminary' (line 5) and emphasizes the data forces a reconsideration of 'fundamental assumptions' (line 6) requiring 'substantial further research' (line 7). This indicates he sees the results as a significant puzzle challenging current understanding and requiring more work (C), not as proof (A), an error (B), or simple confirmation (D).";
    } else if (followUp === "tanaka_q1") {
        return "Lines 5-6 encapsulate Tanaka's cautious but concerned view. He explicitly states the hypothesis is 'preliminary' (line 5), ruling out conclusion (A). Crucially, line 6 states the data 'forces us to reconsider fundamental assumptions,' highlighting the challenge to existing knowledge and implying the need for further investigation, directly supporting (C). A) shows alarm but not the view on existing knowledge. B) states the discrepancy. C) presents the hypothesis, not his overall view of the findings' implications.";
    } else if (questionId === "egan_q1" && !followUp) {
        return "The passage contrasts the previous system where craftspeople 'controlled their pace of work' (line 2) with the factory system which 'eroded the autonomy... associated with older forms of labor' (line 4). This directly supports the idea that a key consequence was reduced independence/autonomy for skilled workers (D). Task specialization (line 3) often implies lower, not higher, skill levels overall (A). Impersonal structures (line 3) and redefined community (line 5) suggest weakened, not strengthened, bonds (B). Regimented schedules (line 3) mean less control (C).";
    } else if (followUp === "egan_q1") {
        return "Line 4 provides the most direct evidence by explicitly stating that the factory system 'simultaneously eroded the autonomy and status associated with older forms of labor.' This directly supports the answer that worker independence (autonomy) was reduced (D). A) introduces the topic. B) describes the *previous* system's autonomy. D) discusses the broader cultural shift but line 4 specifies the impact on worker autonomy.";
    } else if (questionId === "endowment_q1" && !followUp) {
        return "The passage explains the endowment effect by citing behavioral economists who 'posit that ownership creates a psychological link, making loss feel more impactful than gain feels beneficial – an aspect of loss aversion' (line 4). This directly links the effect to the psychological pain of losing something, i.e., loss aversion (C). It explicitly contrasts this with rational calculation (A, line 3) and subjective experience of possession, not necessarily long-term sentiment (B, line 5). Participant experience (D) isn't mentioned as the cause.";
    } else if (followUp === "endowment_q1") {
        return "Line 4 offers the specific psychological explanation favored by behavioral economists: 'ownership creates a psychological link, making loss feel more impactful than gain feels beneficial – an aspect of loss aversion.' This directly attributes the effect to loss aversion (C). A) defines the effect. B) describes the experiment. D) discusses implications, not the cause.";
    } else if (questionId === "thorne_ai_q1" && !followUp) {
        return "Thorne distinguishes AI from human consciousness by stating AI processes are 'devoid of the subjective, qualitative experience – the *what-it-is-like* – that defines genuine consciousness' (line 3) and that AI doesn't '*feel* empathy' (line 4). He concludes the distinction lies in 'the nature of internal experience' (line 6). This clearly points to subjective experience (C) as the key difference, not processing speed (A), learning ability (B), or logical capacity (D), which AI might excel at mimicking.";
    } else if (followUp === "thorne_ai_q1") {
        return "Line 3 provides the most explicit statement of Thorne's core distinction. It defines AI processes as lacking the 'subjective, qualitative experience – the *what-it-is-like*' which he equates with 'genuine consciousness.' This directly identifies subjective experience (C) as the key differentiator. A) introduces his argument generally. C) provides an example (empathy) but line 3 gives the underlying principle. D) states his conclusion about moral status based on this difference.";
    }

    // --- NEW Explanations for the 5 Standalone Evidence Questions ---

    else if (questionText.includes("Dr. Evelyn questions the validity")) {
        return "The question asks for evidence that Dr. Evelyn questions her findings' validity. Choice A directly expresses this doubt: 'was this truly an anomaly, or had she miscalculated?'. This internal question shows her uncertainty about the validity. B describes the context. C describes her resulting action (hesitation) and emotional state, but not the *questioning* itself. D describes the data that *causes* the doubt, but A is the explicit expression of that doubt.";
    } else if (questionText.includes("Jonah is uncertain about his interpretation")) {
        return "The question asks for evidence of Jonah's uncertainty about his interpretation. Choice A explicitly voices this uncertainty: 'Was he interpreting the words correctly, or was he merely seeing what he wanted to see?'. This question directly reflects his doubt about his own interpretation. B describes his action. C provides background context about his mentor. D shows his awareness of bias and subsequent action, but A is the direct articulation of his uncertainty regarding interpretation.";
    } else if (questionText.includes("Amara doubts the completeness of her speech")) {
        return "The question asks for evidence that Amara doubts her speech's completeness. Choice A is the direct expression of this doubt: 'Had she truly captured the full complexity of the issue, or had she oversimplified the nuances?'. This question specifically addresses the completeness and complexity of her message. B shows hesitation. C describes the speech's perceived positive qualities. D describes the external pressure she feels. Only A directly voices the doubt about completeness.";
    } else if (questionText.includes("historian is uncertain about the accuracy of the sources")) {
        return "The question asks for evidence of the historian's uncertainty about source accuracy. Choice A directly states this uncertainty: 'She sighed, unsure which version aligned with the truth.' This shows her doubt about the accuracy or truthfulness of the conflicting versions presented by the sources. B describes her pause. C states the fact that sources conflict. D gives examples of the conflicting details. Only A explicitly expresses her uncertainty regarding the accuracy/truth.";
    } else if (questionText.includes("Nia is second-guessing her artistic choices")) {
        return "The question asks for evidence that Nia is second-guessing her artistic choices. Choice A directly reveals this internal debate: 'wondering if she had lost sight of her original vision or if she was being too harsh on herself.' This shows her questioning her process and judgment, which is the essence of second-guessing her choices. B describes her physical action. C describes the perceived flaws in the painting that *prompt* the doubt. D notes the general feeling that something is 'off'. Only A explicitly shows her internal process of second-guessing.";
    }


    // Fallback
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
    console.log("Recording results. Current categoryStats:", categoryStats);

    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};

    console.log("Previous testResults from localStorage:", results);

    if (typeof results !== "object" || Array.isArray(results)) {
        console.error("Error: results should be an object but got", results);
        results = {};
    }

    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }

        console.log(
            `Before update -> ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`
        );

        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;

        console.log(
            `After update -> ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`
        );
    }

    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Final stored testResults:", results);

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

continueButton.addEventListener("click", () => {
    document.getElementById("break-message").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startMathTest();
});

function showIntroMessage() {
    resetState();
    passageElement.innerHTML = ""; // Clear passage
    questionElement.innerHTML = "This is a timed SAT Test. The Reading portion will be 64 minutes and the math portion will be 44 minutes.";
    questionElement.classList.add("centered-score"); // Optional: Center the text if your CSS supports it

    const startButton = document.createElement("button");
    startButton.innerHTML = "Start Test";
    startButton.classList.add("btn", "centered-btn"); // Add styling classes
    startButton.addEventListener("click", () => {
        questionElement.classList.remove("centered-score"); // Remove centering class
        startReadingWritingTest();
    });
    answerButtons.appendChild(startButton);
}

startTestButton.addEventListener("click", startTest);