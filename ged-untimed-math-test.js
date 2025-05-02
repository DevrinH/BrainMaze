document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const gedIntroContainer = document.getElementById("ged-intro-container");
    const startTestButton = document.getElementById("start-test-btn");

    // State Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let testCompleted = false;
    let mathResponses = [];

    // Sample Question Bank
    const mathQuestions = [
        {
            passage: "",
            question: "If 2x + 5 = 13, what is the value of x?",
            answers: [
                { text: "A) 3", correct: false },
                { text: "B) 4", correct: true },
                { text: "C) 5", correct: false },
                { text: "D) 6", correct: false }
            ],
            type: "math",
            difficulty: "medium",
            category: "ged-algebra"
        },
        {
            passage: "",
            question: "What is the area of a rectangle with length 10 and width 6?",
            answers: [
                { text: "A) 16", correct: false },
                { text: "B) 60", correct: true },
                { text: "C) 36", correct: false },
                { text: "D) 48", correct: false }
            ],
            type: "math",
            difficulty: "easy",
            category: "ged-geometry"
        }
    ];

    // Start Test
    function startTest() {
        if (!gedIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        gedIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startMathSection();
    }

    // Math Section Starter
    function startMathSection() {
        console.log("Starting Math section");
        mathResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(mathQuestions);
    }

    // Start Quiz
    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for Math");
            return;
        }
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        document.querySelector(".question-row").classList.remove("score-display");
        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("math-section");
        questionRow.classList.add("math-section");

        showQuestion();
    }

    // Show Question
    function showQuestion() {
        resetState();
        if (!selectedQuestions[currentQuestionIndex]) {
            console.error("No question available at index", currentQuestionIndex);
            return;
        }
        let currentQuestion = selectedQuestions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        console.log(`Displaying question ${questionNo} in Math, passage:`, currentQuestion.passage || "No passage");
        passageElement.style.display = "none"; // Math questions have no passage
        passageElement.innerHTML = "";
        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("score-display");
        questionElement.classList.remove("centered-score");

        currentQuestion.answers.forEach((answer) => {
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

    // Reset State
    function resetState() {
        nextButton.style.display = "none";
        nextButton.classList.remove("centered-btn");
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    // Select Answer
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
        const safeQuestion = currentQuestion.question || "No question provided";
        const responseQuestion = safeQuestion;

        console.log("Creating user response: Math :", {
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        });

        const response = {
            section: "math",
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        };

        mathResponses.push(response);

        if (isCorrect) {
            selectedBtn.classList.add("correct");
            correctAnswers++;
            if (questionDifficulty === "easy") score += 1;
            else if (questionDifficulty === "medium") score += 2;
            else if (questionDifficulty === "hard") score += 3;
            categoryStats[questionCategory].correct++;
        } else {
            selectedBtn.classList.add("incorrect");
            categoryStats[questionCategory].incorrect++;
        }

        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") button.classList.add("correct");
            button.disabled = true;
        });

        recordTestResults();

        nextButton.style.display = "block";
        nextButton.disabled = false;
    }

    function showFinalScore() {
        resetState();
    
        let maxPossibleScore = (10 * 1) + (10 * 2) + (10 * 3);
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 100 + 100);
    
        console.log(`Saving Untimed Math score: ${scaledScore}/200`);
    
        localStorage.setItem("mathUntimedScore", scaledScore);
    
        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("gedScoreHistory")) || {};
        scoreHistory[today] = scoreHistory[today] || {};
        scoreHistory[today].mathUntimed = scaledScore; // Use distinct key for untimed math
        localStorage.setItem("gedScoreHistory", JSON.stringify(scoreHistory));
    
        console.log(`Untimed Math score saved for ${today}:`, scoreHistory[today]);
    
        saveTestCompletion("GED-Math-Untimed");
    
        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>Untimed Math GED Score:</strong> ${scaledScore} / 200</p>`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
    
        nextButton.innerHTML = "Review Incorrect Answers";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", showExplanations);
    }
    // Save Test Completion
    function saveTestCompletion(examType) {
        const completionData = {
            exam: examType,
            type: "test",
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("lastActivity", JSON.stringify(completionData));
    }

    // Show Explanations
    function showExplanations() {
        console.log("Entering showExplanations");
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "<h2>Review of Incorrect Answers</h2>";
        questionElement.style.overflowY = "scroll";
        questionElement.style.maxHeight = "80vh";

        const incorrectResponses = mathResponses.filter(response => response && response.wasCorrect === false);
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sectionDiv = document.createElement("div");
            sectionDiv.innerHTML = "<h3>Math Section</h3>";
            incorrectResponses.forEach((response, index) => {
                console.log(`Processing Math response ${index + 1}:`, response);
                const explanation = generateExplanation(response);
                console.log(`Explanation for Math response ${index + 1}:`, explanation);
                const div = document.createElement("div");
                div.className = "explanation";
                div.innerHTML = `
                    <h4>Question ${index + 1}</h4>
                    <p><strong>Question:</strong> ${response.question || "Missing question"}</p>
                    <p><strong>Your Answer:</strong> ${response.userAnswer || "N/A"}</p>
                    <p><strong>Correct Answer:</strong> ${response.correctAnswer || "N/A"}</p>
                    <p><strong>Explanation:</strong> ${explanation}</p>
                `;
                sectionDiv.appendChild(div);
            });
            fragment.appendChild(sectionDiv);
            console.log("Appending to questionElement:", questionElement);
            questionElement.appendChild(fragment);
        }

        console.log("Setting Finish button");
        nextButton.innerHTML = "Finish";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", showExplanations);
        nextButton.addEventListener("click", () => {
            window.location.href = "https://www.brainjelli.com/user-profile.html";
        });
    }

    // Generate Explanations
    function generateExplanation(response) {
        const questionText = response.question || "";

        if (questionText.includes("If 2x + 5 = 13")) {
            return "Solve 2x + 5 = 13: subtract 5 to get 2x = 8, then divide by 2 to get x = 4. Option B) 4 is correct.";
        } else if (questionText.includes("What is the area of a rectangle")) {
            return "Area = length × width = 10 × 6 = 60. Option B) 60 is correct.";
        }

        return "No explanation available for this question.";
    }

    // Handle Next Button
    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            testCompleted = true;
            recordTestResults();
            showFinalScore();
        }
    }

    // Update Progress Bar
    function updateProgressBar() {
        const progressBar = document.getElementById("progress-bar-test");
        let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
        progressBar.firstElementChild.style.width = progress + "%";
    }

    // Record Test Results
    function recordTestResults() {
        let storedResults = localStorage.getItem("gedTestResults");
        let results = storedResults ? JSON.parse(storedResults) : {};

        if (typeof results !== "object" || Array.isArray(results)) {
            results = {};
        }

        for (let category in categoryStats) {
            if (!results[category]) {
                results[category] = { correct: 0, incorrect: 0 };
            }
            results[category].correct += categoryStats[category].correct || 0;
            results[category].incorrect += categoryStats[category].incorrect || 0;
            console.log(`Saving category ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
        }

        localStorage.setItem("gedTestResults", JSON.stringify(results));
        console.log("Stored gedTestResults:", results);

        if (!testCompleted) {
            for (let category in categoryStats) {
                categoryStats[category].correct = 0;
                categoryStats[category].incorrect = 0;
            }
        }
    }

    // Show Intro Message
    function showIntroMessage() {
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "This is an untimed GED Mathematical Reasoning Test. Take your time to answer approximately 46 questions.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startMathSection();
        });
        answerButtons.appendChild(startButton);
    }

    // Event Listeners
    if (startTestButton) {
        startTestButton.addEventListener("click", startTest);
    } else {
        console.error("start-test-btn element not found");
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            handleNextButton();
        });
    } else {
        console.error("next-btn element not found");
    }

    // Initialize
    showIntroMessage();
});