
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
    question: "Sophia sat at the old wooden table, running her fingers over the faded ink of a letter her grandmother had written decades ago. The words spoke of resilience, of sacrifices made for family, of dreams put on hold. As Sophia read, she felt an unshakable connection to the past, as if the struggles of generations before her still echoed in the present.<br/><br/>What is the central idea of the passage?",
    answers: [
        { text: "A) Sophia feels a deep connection to her family’s history and struggles.", correct: true },
        { text: "B) Sophia is trying to decipher the faded ink of an old letter.", correct: false },
        { text: "C) Sophia’s grandmother had an easy and carefree life.", correct: false },
        { text: "D) Sophia is determined to change her future by forgetting the past.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Central Ideas and Details"
},
{
    question: "The researchers stood at the edge of the ice shelf, their equipment humming softly as they recorded data. Towering glaciers stretched endlessly before them, a frozen expanse that had remained unchanged for thousands of years. But beneath the surface, the ice was shifting—melting slowly, almost imperceptibly, signaling a transformation that could reshape the planet.<br/><br/>What is the central idea of the passage?",
    answers: [
        { text: "A) Scientists are studying changes in glaciers that could have a significant impact.", correct: true },
        { text: "B) The ice shelf has remained unchanged for thousands of years.", correct: false },
        { text: "C) The researchers are using noisy equipment to gather data.", correct: false },
        { text: "D) The glaciers are growing at a rapid and unpredictable rate.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Central Ideas and Details"
},
{
    question: "Lena carefully arranged the wildflowers in a glass vase, her fingers brushing against the delicate petals. The vibrant hues of yellow and violet contrasted beautifully against the dimly lit room, bringing a touch of warmth to the otherwise somber space. She sighed, knowing that even the most fleeting beauty had its place.<br/><br/>As used in the passage, the word 'fleeting' most nearly means:",
    answers: [
        { text: "A) temporary", correct: true },
        { text: "B) vibrant", correct: false },
        { text: "C) essential", correct: false },
        { text: "D) overwhelming", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Words in Context"
},
{
    question: "The professor’s explanation was so convoluted that even the most attentive students struggled to follow. His sentences twisted and turned, filled with jargon and unnecessary details, making the concept seem far more complicated than it actually was.<br/><br/>As used in the passage, the word 'convoluted' most nearly means:",
    answers: [
        { text: "A) complex", correct: true },
        { text: "B) fascinating", correct: false },
        { text: "C) redundant", correct: false },
        { text: "D) concise", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "Words in Context"
},
{
    question: "Lena unfolded the old letter, the ink faded but the words still legible. The careful handwriting and affectionate tone told of a love long past, yet preserved on paper. She traced the signature with her fingertips, wondering how different life might have been if history had taken another course.<br/><br/>What is the primary purpose of this passage?",
    answers: [
        { text: "A) To reflect on the emotional impact of a piece of personal history.", correct: true },
        { text: "B) To describe the process of preserving old documents.", correct: false },
        { text: "C) To explain the historical significance of letters in communication.", correct: false },
        { text: "D) To critique the fading nature of ink over time.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Text Structure and Purpose"
},
{
    question: "The scientist carefully recorded her observations, noting each reaction with precision. Every detail, from the color shift in the liquid to the faintest change in temperature, was documented. Her work required patience and attention to detail, for even the smallest oversight could alter the results.<br/><br/>What is the primary structure of this passage?",
    answers: [
        { text: "A) Description", correct: true },
        { text: "B) Compare and contrast", correct: false },
        { text: "C) Problem and solution", correct: false },
        { text: "D) Argumentative", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "Text Structure and Purpose"
}
];

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let categoryStats = {}; // Tracks { category: { correct: 0, incorrect: 0 } }

const categories = [
    "Command of Evidence", "central-ideas", "inferences", "Words in Context", "text-structure", 
    "cross-text", "transitions", "rhetorical-synthesis", "boundaries", "algebra", 
    "advanced-math", "problem-solving", "geometry-trigonometry"
];

function getStoredScores() {
    return JSON.parse(localStorage.getItem("satScores")) || {};
}

function saveScores(scores) {
    localStorage.setItem("satScores", JSON.stringify(scores));
}


function recordTestResults(results) {
    let scores = getStoredScores();
    
    Object.keys(results).forEach(category => {
        let formattedCategory = category.toLowerCase().replace(/\s+/g, "-"); // Match progress categories
        if (!scores[formattedCategory]) {
            scores[formattedCategory] = results[category];
        } else {
            let previousScore = scores[formattedCategory];
            scores[formattedCategory] = Math.round((previousScore + results[category]) / 2);
        }
    });
    
    saveScores(scores);
    
}

function startQuiz() {
    currentQuestionIndex = 0;
    categoryStats = {};
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
    let currentQuestion = questions[currentQuestionIndex];
    let questionCategory = currentQuestion.category.toLowerCase().replace(/\s+/g, "-");


    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    if (isCorrect) {
        selectedBtn.classList.add("correct");
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
}

function showResults() {
    resetState();
    questionElement.innerHTML = "Quiz Completed!";
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";

    let results = {};
    Object.keys(categoryStats).forEach(category => {
        const totalAttempts = categoryStats[category].correct + categoryStats[category].incorrect;
        if (totalAttempts > 0) {
            results[category] = Math.round((categoryStats[category].correct / totalAttempts) * 100);
        }
    });
    
    recordTestResults(results);
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}



nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        location.href = "https://www.brainjelli.com/user-profile.html";
    }
});

startQuiz();
