// Ensure scores display on page load by calling showScore
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || 1;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    1: {
        title: "Identifying the Central Idea",
        examples: [
            {
                title: "Example: Finding the Central Idea",
                content: `
                    <h2>Example: Finding the Central Idea</h2>
                    <p>Passage: 'Renewable energy sources like solar and wind are increasingly adopted due to their environmental benefits and cost declines.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Look for the main focus: Adoption of renewable energy.</p>
                    <p>Step 2: Identify why: Environmental benefits and cost declines.</p>
                    <p>The central idea is the growing use of renewable energy for its advantages.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Distinguishing Central Idea from Details",
                content: `
                    <h2>Example: Distinguishing Central Idea from Details</h2>
                    <p>Passage: 'Exercise improves health. Studies show it reduces stress and boosts heart function.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Separate main point: Exercise improves health.</p>
                    <p>Step 2: Recognize details: 'reduces stress' and 'boosts heart function' support it.</p>
                    <p>The central idea is exercise’s health benefits.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'Urban gardens promote sustainability by reducing food transport costs.' What is the central idea?",
                answer: "urban gardens promote sustainability",
                explanation: "The main focus is on urban gardens and sustainability; 'reducing food transport costs' is a detail."
            },
            {
                title: "Question 2",
                question: "Passage: 'Technology has changed communication. Emails and texts are now common.' What is the central idea?",
                answer: "technology has changed communication",
                explanation: "The central idea is the broad impact of technology on communication; specific examples are details."
            }
        ],
        additionalExample: {
            title: "Example: Central Idea in Longer Texts",
            content: `
                <h2>Example: Central Idea in Longer Texts</h2>
                <p>Passage: 'Climate change affects ecosystems. Rising temperatures harm coral reefs, while droughts impact forests.'</p>
                <p>Question: What is the central idea?</p>
                <p>Step 1: Identify the overarching topic: Climate change’s effects.</p>
                <p>Step 2: Focus: On ecosystems, not just specific examples.</p>
                <p>The central idea is climate change’s impact on ecosystems.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Summarizing a Passage",
        examples: [
            {
                title: "Example: Basic Summarization",
                content: `
                    <h2>Example: Basic Summarization</h2>
                    <p>Passage: 'Volunteering helps communities by providing free labor and fostering social bonds.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Identify key points: Volunteering helps communities.</p>
                    <p>Step 2: Condense: Include benefits like labor and bonds.</p>
                    <p>Summary: Volunteering aids communities through labor and social connections.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Avoiding Over-Detail",
                content: `
                    <h2>Example: Avoiding Over-Detail</h2>
                    <p>Passage: 'The festival drew 5,000 people. It featured music, food, and art over three days.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Focus on essence: Festival attracted many with diverse events.</p>
                    <p>Step 2: Omit specifics like numbers or days.</p>
                    <p>Summary: The festival attracted crowds with various activities.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'Recycling reduces waste and saves resources like water and trees.' Summarize it.",
                answer: "recycling reduces waste and conserves resources",
                explanation: "The summary captures the main benefits without listing specific resources."
            },
            {
                title: "Question 2",
                question: "Passage: 'The new law, passed in June, improved safety by limiting speeds.' Summarize it.",
                answer: "new law improved safety",
                explanation: "Focus on the core idea (safety improvement), omitting details like 'June' or 'speeds.'"
            }
        ],
        additionalExample: {
            title: "Example: Summarizing Complex Passages",
            content: `
                <h2>Example: Summarizing Complex Passages</h2>
                <p>Passage: 'Social media influences elections. It spreads information fast but also misinformation.'</p>
                <p>Question: Summarize the passage.</p>
                <p>Step 1: Capture essence: Social media’s election impact.</p>
                <p>Step 2: Include key aspects: Information spread, including misinformation.</p>
                <p>Summary: Social media affects elections by spreading information and misinformation.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Identifying Key Details",
        examples: [
            {
                title: "Example: Spotting Key Details",
                content: `
                    <h2>Example: Spotting Key Details</h2>
                    <p>Passage: 'The policy cut emissions by 30% in two years, mainly through factory regulations.'</p>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Look for specifics supporting the main idea: 30% cut, two years.</p>
                    <p>Step 2: Identify cause: Factory regulations.</p>
                    <p>Key details: 30% reduction, two-year span, factory regulations.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Details vs. Minor Info",
                content: `
                    <h2>Example: Details vs. Minor Info</h2>
                    <p>Passage: 'The book sold 1 million copies. It was written in 2010 by a new author.'</p>
                    <p>Question: What are the key details for sales success?</p>
                    <p>Step 1: Focus on success: 1 million copies.</p>
                    <p>Step 2: Exclude minor info: '2010' and 'new author' are less relevant.</p>
                    <p>Key detail: 1 million copies sold.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The team won 10 games due to strong defense.' What is a key detail?",
                answer: "strong defense",
                explanation: "It explains the reason for winning, supporting the main idea."
            },
            {
                title: "Question 2",
                question: "Passage: 'The storm caused $5 billion in damage, mostly to coastal homes.' What is a key detail?",
                answer: "$5 billion in damage",
                explanation: "It quantifies the storm’s impact, a critical specific."
            }
        ],
        additionalExample: {
            title: "Example: Multiple Key Details",
            content: `
                <h2>Example: Multiple Key Details</h2>
                <p>Passage: 'The invention saved time with a 50% efficiency boost and reduced costs by $2 million.'</p>
                <p>Question: What are the key details?</p>
                <p>Step 1: Identify impact: 50% efficiency boost.</p>
                <p>Step 2: Add specifics: $2 million cost reduction.</p>
                <p>Key details: 50% efficiency, $2 million savings.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Understanding Supporting Evidence",
        examples: [
            {
                title: "Example: Recognizing Supporting Evidence",
                content: `
                    <h2>Example: Recognizing Supporting Evidence</h2>
                    <p>Passage: 'Exercise benefits mental health. Studies show lower depression rates among active people.'</p>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Identify claim: Exercise benefits mental health.</p>
                    <p>Step 2: Find support: 'Studies show lower depression rates.'</p>
                    <p>The evidence is the study on depression rates.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Evidence Relevance",
                content: `
                    <h2>Example: Evidence Relevance</h2>
                    <p>Passage: 'The diet works. Participants lost 15 pounds on average over six months.'</p>
                    <p>Question: What evidence supports effectiveness?</p>
                    <p>Step 1: Claim: Diet works.</p>
                    <p>Step 2: Relevant evidence: '15 pounds lost' proves it.</p>
                    <p>Evidence: Average 15-pound weight loss.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'Education boosts earnings. Graduates earn 20% more.' What is the supporting evidence?",
                answer: "graduates earn 20% more",
                explanation: "It directly supports the claim of higher earnings."
            },
            {
                title: "Question 2",
                question: "Passage: 'The law reduced crime. Arrests dropped by 25%.' What evidence supports it?",
                answer: "arrests dropped by 25%",
                explanation: "The drop in arrests backs the claim of reduced crime."
            }
        ],
        additionalExample: {
            title: "Example: Evidence in Context",
            content: `
                <h2>Example: Evidence in Context</h2>
                <p>Passage: 'Forests aid climate stability. They absorb 2 billion tons of CO2 yearly.'</p>
                <p>Question: What evidence supports the claim?</p>
                <p>Step 1: Claim: Forests aid climate stability.</p>
                <p>Step 2: Evidence: 'Absorb 2 billion tons of CO2 yearly.'</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    5: {
        title: "Paraphrasing and Restating Ideas",
        examples: [
            {
                title: "Example: Simple Paraphrase",
                content: `
                    <h2>Example: Simple Paraphrase</h2>
                    <p>Passage: 'The project saved money by cutting costs 10%.'</p>
                    <p>Question: Paraphrase the sentence.</p>
                    <p>Step 1: Identify meaning: Cost reduction saved money.</p>
                    <p>Step 2: Restate: The project reduced expenses by 10%, saving funds.</p>
                    <p>Paraphrase: The project lowered costs by 10%, preserving money.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Restating Complex Ideas",
                content: `
                    <h2>Example: Restating Complex Ideas</h2>
                    <p>Passage: 'Urban sprawl harms biodiversity by destroying habitats.'</p>
                    <p>Question: Restate the idea.</p>
                    <p>Step 1: Break it down: Urban growth affects nature.</p>
                    <p>Step 2: Rephrase: City expansion damages wildlife by ruining their homes.</p>
                    <p>Restatement: Urban development reduces biodiversity by eliminating habitats.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'Reading improves vocabulary through exposure to new words.' Paraphrase it.",
                answer: "reading enhances vocabulary by introducing new terms",
                explanation: "It keeps the meaning—reading boosts vocab with new words—in different phrasing."
            },
            {
                title: "Question 2",
                question: "Passage: 'The policy increased jobs by attracting businesses.' Restate it.",
                answer: "the policy boosted employment by drawing companies",
                explanation: "It rephrases job growth and business attraction accurately."
            }
        ],
        additionalExample: {
            title: "Example: Paraphrasing with Evidence",
            content: `
                <h2>Example: Paraphrasing with Evidence</h2>
                <p>Passage: 'The drug cut symptoms by 40%, improving patient recovery.'</p>
                <p>Question: Paraphrase the sentence.</p>
                <p>Step 1: Core idea: Drug effectiveness aids recovery.</p>
                <p>Step 2: Restate: The medication reduced symptoms by 40%, enhancing patient healing.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Central Ideas and Detail question arrays
const centralIdeaQuestions = [
    {
        question: "Passage: 'Public transit reduces traffic. Buses and trains carry many passengers daily.' What is the central idea?",
        answers: [
            { text: "A) Public transit reduces traffic", correct: true },
            { text: "B) Buses carry passengers", correct: false },
            { text: "C) Trains run daily", correct: false },
            { text: "D) Traffic is a problem", correct: false }
        ],
        explanation: "The main focus is transit reducing traffic; other options are details.",
        difficulty: "easy",
        category: "central-ideas-and-detail"
    }
];

const summarizingQuestions = [
    {
        question: "Passage: 'The park, built in 2015, attracts tourists with its trails and views.' Summarize it.",
        answers: [
            { text: "A) The park draws visitors with its features", correct: true },
            { text: "B) The park was built in 2015", correct: false },
            { text: "C) Trails are popular", correct: false },
            { text: "D) Views are scenic", correct: false }
        ],
        explanation: "The summary captures the essence without specific details like the year.",
        difficulty: "medium",
        category: "central-ideas-and-detail"
    }
];

const keyDetailsQuestions = [
    {
        question: "Passage: 'The app gained 2 million users due to its easy interface.' What is a key detail?",
        answers: [
            { text: "A) Easy interface", correct: true },
            { text: "B) App name", correct: false },
            { text: "C) Developer", correct: false },
            { text: "D) Release date", correct: false }
        ],
        explanation: "The interface explains the user gain, making it a key detail.",
        difficulty: "easy",
        category: "central-ideas-and-detail"
    }
];

const supportingEvidenceQuestions = [
    {
        question: "Passage: 'Meditation aids sleep. Research shows it lowers stress.' What is the supporting evidence?",
        answers: [
            { text: "A) Research shows it lowers stress", correct: true },
            { text: "B) Meditation is popular", correct: false },
            { text: "C) Sleep is important", correct: false },
            { text: "D) Stress is common", correct: false }
        ],
        explanation: "The research on stress reduction supports the sleep benefit claim.",
        difficulty: "medium",
        category: "central-ideas-and-detail"
    }
];

const paraphrasingQuestions = [
    {
        question: "Passage: 'The film won awards for its stunning visuals.' Paraphrase it.",
        answers: [
            { text: "A) The movie earned prizes for its impressive graphics", correct: true },
            { text: "B) The film had stunning actors", correct: false },
            { text: "C) Awards were given in 2020", correct: false },
            { text: "D) Visuals were colorful", correct: false }
        ],
        explanation: "The paraphrase restates the awards and visuals in new words.",
        difficulty: "medium",
        category: "central-ideas-and-detail"
    }
];

// lesson-central-ideas-and-detail.js

let categoryStats = {
    "central-ideas-and-detail": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;

function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        showExample();
    } else {
        console.error("Start lesson button not found!");
    }
}

function showExample() {
    console.log("Showing example for lesson:", currentLesson);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons && lessons[currentLesson] && lessons[currentLesson].examples[0]) {
        lessonContent.innerHTML = lessons[currentLesson].examples[0].content;
        const nextExampleBtn = document.getElementById('next-example');
        if (nextExampleBtn) {
            nextExampleBtn.addEventListener('click', showNextExample);
        } else {
            console.error("Next example button not found!");
        }
    } else {
        console.error("Lesson content or lessons data missing!");
    }
}

function showNextExample() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].examples[1].content;
    document.getElementById('next-question').addEventListener('click', askQuestion);
}

function askQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLesson].questions[0];
    lessonContent.innerHTML = `
        <h2>${question.title}</h2>
        <p>${question.question}</p>
        <input type="text" id="answer1" placeholder="Your answer">
        <button id="submit-answer1">Submit Answer</button>
    `;
    document.getElementById('submit-answer1').addEventListener('click', checkAnswer1);
}

function checkAnswer1() {
    const answer = document.getElementById('answer1').value;
    const correctAnswer = lessons[currentLesson].questions[0].answer;
    if (answer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase()) {
        alert('Correct!');
        categoryStats["central-ideas-and-detail"].correct++;
        showNextExample3();
    } else {
        alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
        categoryStats["central-ideas-and-detail"].incorrect++;
    }
}

function showNextExample3() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].additionalExample.content;
    document.getElementById('next-question').addEventListener('click', askNextQuestion);
}

function askNextQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLesson].questions[1];
    lessonContent.innerHTML = `
        <h2>${question.title}</h2>
        <p>${question.question}</p>
        <input type="text" id="answer2" placeholder="Your answer">
        <button id="submit-answer2">Submit Answer</button>
    `;
    document.getElementById('submit-answer2').addEventListener('click', checkAnswer2);
}

function checkAnswer2() {
    const answer = document.getElementById('answer2').value;
    const correctAnswer = lessons[currentLesson].questions[1].answer;
    if (answer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase()) {
        alert('Correct!');
        categoryStats["central-ideas-and-detail"].correct++;
        showQuiz();
    } else {
        alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
        categoryStats["central-ideas-and-detail"].incorrect++;
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = centralIdeaQuestions; break;
        case 2: quizQuestions = summarizingQuestions; break;
        case 3: quizQuestions = keyDetailsQuestions; break;
        case 4: quizQuestions = supportingEvidenceQuestions; break;
        case 5: quizQuestions = paraphrasingQuestions; break;
        default: quizQuestions = centralIdeaQuestions;
    }
    showNextQuizQuestion(quizQuestions);
}

function showNextQuizQuestion(quizQuestions) {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <h2>Question ${currentQuestionIndex + 1}</h2>
            <p>${question.question}</p>
            ${question.answers.map((answer, index) => `
                <input type="radio" id="q${currentQuestionIndex}a${index}" name="q${currentQuestionIndex}" value="${answer.correct}">
                <label for="q${currentQuestionIndex}a${index}">${answer.text}</label><br>
            `).join('')}
            <button id="submit-answer">Submit Answer</button>
        `;
        document.getElementById('submit-answer').addEventListener('click', () => checkQuizAnswer(question, quizQuestions));
    } else {
        showFinalScore();
    }
}

function checkQuizAnswer(question, quizQuestions) {
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats[question.category].correct++;
        } else {
            alert(`Incorrect. ${question.explanation}`);
            categoryStats[question.category].incorrect++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showNextQuizQuestion(quizQuestions);
        } else {
            console.log("Quiz complete, calling showFinalScore");
            showFinalScore();
        }
    } else {
        alert('Please select an answer.');
    }
}

function logFinalScore(totalCorrect, totalAttempted) {
    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    localStorage.setItem("finalScore", JSON.stringify({
        correct: totalCorrect,
        attempted: totalAttempted,
        percentage: percentage,
        lesson: currentLesson
    }));
    console.log("Final score logged:", { totalCorrect, totalAttempted, percentage, lesson: currentLesson });
}

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = 0;
    let totalAttempted = 0;

    for (let category in categoryStats) {
        totalCorrect += categoryStats[category].correct;
        totalAttempted += categoryStats[category].correct + categoryStats[category].incorrect;
    }

    logFinalScore(totalCorrect, totalAttempted);

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    console.log("Saving score:", score);
    saveScore(currentLesson, score);

    const finalScoreElement = document.getElementById('final-score');
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = '';
    finalScoreElement.style.display = 'block';
    finalScoreElement.innerHTML = `
        <h2>Final Score</h2>
        <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
        <p>Your score: ${percentage}%</p>
        <button id="continue-button">Continue</button>
    `;

    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    });

    recordTestResults();
}

function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Final stored testResults:", results);
    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

function saveScore(lessonId, score) {
    localStorage.setItem(`central-ideas-and-detail-lessonScore-${lessonId}`, score);
    console.log(`Saved central-ideas-and-detail-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`lessonScore-${lessonId}`) || "Not completed yet";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded, initializing lesson:", currentLesson);
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 1;
    console.log("Set currentLesson to:", currentLesson);

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start lesson button event listener added");
    } else {
        console.error("Start lesson button not found on page load!");
    }
});