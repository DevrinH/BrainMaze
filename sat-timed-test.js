let categoryStats = {};
let testCompleted = false;
let time;
let refreshIntervalId;
let isMathTest = false;

function recordTestResults() {
    // Load existing test results from localStorage
    let existingResults = localStorage.getItem("satTestResults");
    let results = existingResults ? JSON.parse(existingResults) : {};

    // Accumulate new results into existing results
    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
        console.log(`SAT Category: ${category}, Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
    }

    localStorage.setItem("satTestResults", JSON.stringify(results));
    console.log("SAT Test Results Saved:", results);

    // Dispatch testSubmitted event
    window.dispatchEvent(new Event("testSubmitted"));

    // Reset categoryStats for the next question, but only if the test isn't completed
    if (!testCompleted) {
        categoryStats = {};
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const satIntroContainer = document.getElementById("sat-intro-container");
    const startTestButton = document.getElementById("start-test-btn");
    const continueButton = document.getElementById("continue-btn");
    const countdownEl = document.getElementById("countdown");

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let currentSection = "reading-writing";
    let readingWritingScore = 0, mathScore = 0;
    let readingWritingResponses = [];
    let mathResponses = [];

    const readingWritingQuestions = [
        {
            passage: "The following passage is adapted from a 19th-century novel. The narrator describes a young woman named Clara who has recently moved to a small village. Clara was known for her reserved nature, often spending her days reading in the garden. However, she had a keen interest in the village's history, frequently asking the elders about past events. One elder remarked, 'Clara's curiosity about our traditions is refreshing—she listens more than she speaks, which is rare for someone her age.'",
            question: "What can be inferred about Clara's personality based on the passage?",
            answers: [
                { text: "She is outgoing and talkative.", correct: false },
                { text: "She is curious and reserved.", correct: true },
                { text: "She is disinterested in the village.", correct: false },
                { text: "She is impatient and impulsive.", correct: false }
            ],
            type: "reading-writing",
            difficulty: "easy",
            category: "inferences"
        },
        {
            passage: "The following passage is adapted from a 20th-century essay on environmental conservation. The author writes, 'The rapid deforestation in the region has led to a 30% decline in local bird populations over the past decade. Studies show that these birds play a critical role in seed dispersal, which supports forest regeneration. Without intervention, the forest ecosystem may collapse within the next 20 years.'",
            question: "Which of the following pieces of evidence from the passage most directly supports the idea that deforestation has measurable impacts?",
            answers: [
                { text: "The rapid deforestation in the region has led to a 30% decline in local bird populations over the past decade.", correct: true },
                { text: "Studies show that these birds play a critical role in seed dispersal, which supports forest regeneration.", correct: false },
                { text: "Without intervention, the forest ecosystem may collapse within the next 20 years.", correct: false },
                { text: "The author writes, 'The rapid deforestation in the region has led to a 30% decline in local bird populations.'", correct: false }
            ],
            type: "reading-writing",
            difficulty: "medium",
            category: "command-of-evidence"
        }
    ];

    const mathQuestions = [
        {
            passage: "",
            question: "Solve for x: 2x + 3 = 7",
            answers: [
                { text: "x = 1", correct: false },
                { text: "x = 2", correct: true },
                { text: "x = 3", correct: false },
                { text: "x = 4", correct: false }
            ],
            type: "math",
            difficulty: "easy",
            category: "algebra"
        },
        {
            passage: "",
            question: "If f(x) = x² + 2x + 1, what is f(2)?",
            answers: [
                { text: "5", correct: false },
                { text: "7", correct: false },
                { text: "9", correct: true },
                { text: "11", correct: false }
            ],
            type: "math",
            difficulty: "hard",
            category: "advanced-math"
        }
    ];

    function startTest() {
        if (!satIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        satIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startReadingWritingSection();
    }

    function startReadingWritingSection() {
        currentSection = "reading-writing";
        readingWritingResponses = [];
        score = 0;
        correctAnswers = 0;
        isMathTest = false;
        time = 64 * 60; // 64 minutes for Reading/Writing
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endReadingWritingSection, 64 * 60 * 1000); // 64 minutes in milliseconds
        startQuiz(readingWritingQuestions, 1, 1, 0); // Adjust numbers for available questions
    }

    function startMathSection() {
        currentSection = "math";
        mathResponses = [];
        score = 0;
        correctAnswers = 0;
        isMathTest = true;
        time = 70 * 60; // 70 minutes for Math
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endMathSection, 70 * 60 * 1000); // 70 minutes in milliseconds
        passageElement.innerHTML = "";
        startQuiz(mathQuestions, 1, 0, 1); // Adjust numbers for available questions
    }

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        if (time === 0) {
            clearInterval(refreshIntervalId);
            if (isMathTest) {
                endMathSection();
            } else {
                endReadingWritingSection();
            }
        } else {
            time--;
        }
    }

    function endReadingWritingSection() {
        clearInterval(refreshIntervalId);
        recordTestResults();
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathSection() {
        clearInterval(refreshIntervalId);
        recordTestResults();
        resetState();
        showFinalScore();
        testCompleted = true;
        recordTestResults();
    }

    function startQuiz(questions, numEasy, numMedium, numHard) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for", currentSection);
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0 && currentSection !== "math") {
            console.warn(`Warning: ${missingPassages.length} questions in ${currentSection} lack a valid passage`);
        }
        currentQuestionIndex = 0;
        selectedQuestions = selectRandomQuestions(questions, numEasy, numMedium, numHard);
        nextButton.innerHTML = "Next";

        document.querySelector(".question-row").classList.remove("score-display");

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("reading-writing-section", "math-section");
        questionRow.classList.add(`${currentSection}-section`);

        showQuestion();
    }

    function selectRandomQuestions(questions, numEasy, numMedium, numHard) {
        const easyQuestions = questions.filter(q => q.difficulty === "easy");
        const mediumQuestions = questions.filter(q => q.difficulty === "medium");
        const hardQuestions = questions.filter(q => q.difficulty === "hard");

        function getRandom(arr, num) {
            return arr.sort(() => 0.5 - Math.random()).slice(0, Math.min(num, arr.length));
        }

        const selectedEasy = getRandom(easyQuestions, numEasy);
        const selectedMedium = getRandom(mediumQuestions, numMedium);
        const selectedHard = getRandom(hardQuestions, numHard);

        return [...selectedEasy, ...selectedMedium, ...selectedHard];
    }

    function showQuestion() {
        resetState();
        if (!selectedQuestions[currentQuestionIndex]) {
            console.error("No question available at index", currentQuestionIndex);
            return;
        }
        let currentQuestion = selectedQuestions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        console.log(`Displaying question ${questionNo} in ${currentSection}, passage:`, currentQuestion.passage || "No passage");
        passageElement.style.display = currentSection === "math" ? "none" : "block";
        passageElement.innerHTML = currentQuestion.passage || "";
        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("score-display");
        questionElement.classList.remove("centered-score");

        currentQuestion.answers.forEach((answer, index) => {
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

        const safePassage = currentQuestion.passage || "No passage provided";
        const safeQuestion = currentQuestion.question || "No question provided";
        const responseQuestion = currentSection === "math" ? safeQuestion : safePassage + "<br/><br/>" + safeQuestion;

        console.log("Creating user response:", currentSection, ":", {
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        });

        const response = {
            section: currentSection,
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        };

        if (currentSection === "reading-writing") {
            readingWritingResponses.push(response);
        } else if (currentSection === "math") {
            mathResponses.push(response);
        }

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

        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        recordTestResults();

        nextButton.style.display = "block";
        nextButton.disabled = false;
    }

    function showScore() {
        resetState();

        let maxPossibleScore;
        if (currentSection === "reading-writing") {
            maxPossibleScore = selectedQuestions.reduce((total, q) => {
                if (q.difficulty === "easy") return total + 1;
                if (q.difficulty === "medium") return total + 2;
                return total + 3;
            }, 0);
        } else {
            maxPossibleScore = selectedQuestions.reduce((total, q) => {
                if (q.difficulty === "easy") return total + 1;
                if (q.difficulty === "medium") return total + 2;
                return total + 3;
            }, 0);
        }
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

        document.getElementById("question-container").classList.remove("hide");

        if (currentSection === "reading-writing") {
            localStorage.setItem("readingWritingScore", scaledScore);
            readingWritingScore = scaledScore;
            passageElement.innerHTML = "";
            questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
            questionElement.classList.add("centered-score");
            document.querySelector(".question-row").classList.add("score-display");
            nextButton.innerHTML = "Continue";
            nextButton.style.display = "block";
            nextButton.classList.add("centered-btn");
        }
    }

    function showFinalScore() {
        resetState();
    
        let maxPossibleScore = selectedQuestions.reduce((total, q) => {
            if (q.difficulty === "easy") return total + 1;
            if (q.difficulty === "medium") return total + 2;
            return total + 3;
        }, 0);
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);
    
        mathScore = scaledScore;
        localStorage.setItem("mathScore", scaledScore);
    
        let totalSATScore = readingWritingScore + mathScore;
    
        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("satScoreHistory")) || {};
        scoreHistory[today] = {
            readingWriting: readingWritingScore,
            math: mathScore,
            total: totalSATScore
        };
        localStorage.setItem("satScoreHistory", JSON.stringify(scoreHistory));
    
        saveTestCompletion("SAT");
    
        // Safeguard to check if updateScoreChart is defined
        if (typeof updateScoreChart === "function") {
            updateScoreChart();
        } else {
            console.warn("updateScoreChart is not defined. Ensure scoreChart.js is included.");
        }
    
        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `
            <p><strong>Reading and Writing SAT Score:</strong> ${readingWritingScore} / 800</p>
            <p><strong>Math SAT Score:</strong> ${mathScore} / 800</p>
            <p><strong>Total SAT Score:</strong> ${totalSATScore} / 1600</p>`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Finish";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", () => {
            window.location.href = "https://www.brainjelli.com/user-profile.html";
        });
    }

    function saveTestCompletion(examType) {
        const completionData = {
            exam: examType,
            type: "test",
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("lastActivity", JSON.stringify(completionData));
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            switch (currentSection) {
                case "reading-writing": endReadingWritingSection(); break;
                case "math": endMathSection(); break;
            }
        }
    }

    function updateProgressBar() {
        const progressBar = document.getElementById("progress-bar-test");
        let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
        progressBar.firstElementChild.style.width = progress + "%";
    }

    function showIntroMessage() {
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "This is a timed SAT Test. The Reading/Writing section will be 64 minutes, and the Math section will be 70 minutes.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startReadingWritingSection();
        });
        answerButtons.appendChild(startButton);
    }

    if (startTestButton) {
        startTestButton.addEventListener("click", startTest);
    } else {
        console.error("start-test-btn element not found");
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (nextButton.innerHTML === "Continue") {
                document.getElementById("break-message").classList.remove("hide");
                document.getElementById("question-container").classList.add("hide");
            } else {
                handleNextButton();
            }
        });
    } else {
        console.error("next-btn element not found");
    }

    if (continueButton) {
        continueButton.addEventListener("click", () => {
            document.getElementById("break-message").classList.add("hide");
            document.getElementById("question-container").classList.remove("hide");
            startMathSection();
        });
    } else {
        console.error("continue-btn element not found");
    }

    if (!countdownEl) {
        console.error("countdown element not found");
    }

    showIntroMessage();
});