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
    let scienceResponses = [];

    // Sample Question Bank
    const scienceQuestions = [
        {
            passage: "A researcher studied plant growth under different light conditions. Plants were exposed to red, blue, or white light for 12 hours daily. After 4 weeks, plant height was measured. Results: red light (15 cm), blue light (20 cm), white light (18 cm).",
            question: "Which light condition resulted in the tallest plants?",
            answers: [
                { text: "A) Red", correct: false },
                { text: "B) Blue", correct: true },
                { text: "C) White", correct: false },
                { text: "D) None", correct: false }
            ],
            type: "science",
            difficulty: "medium",
            category: "ged-science"
        },
        {
            passage: "The researcher also tested water pH levels (5, 7, 9) on plant growth. After 4 weeks, plant height was measured. Results: pH 5 (15 cm), pH 7 (18 cm), pH 9 (12 cm).",
            question: "If plants at pH 7 grew 18 cm, and pH 9 grew 12 cm, how does pH affect growth?",
            answers: [
                { text: "A) Higher pH increases growth", correct: false },
                { text: "B) Lower pH increases growth", correct: true },
                { text: "C) pH has no effect", correct: false },
                { text: "D) Neutral pH decreases growth", correct: false }
            ],
            type: "science",
            difficulty: "medium",
            category: "ged-science"
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
        startScienceSection();
    }

    // Science Section Starter
    function startScienceSection() {
        console.log("Starting Science section");
        scienceResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.innerHTML = "";
        startQuiz(scienceQuestions);
    }

    // Start Quiz
    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for Science");
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0) {
            console.warn(`Warning: ${missingPassages.length} questions in Science lack a valid passage`);
        }
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        document.querySelector(".question-row").classList.remove("score-display");
        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("science-section");
        questionRow.classList.add("science-section");

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
        console.log(`Displaying question ${questionNo} in Science, passage:`, currentQuestion.passage || "");
        passageElement.style.display = "block";
        passageElement.innerHTML = currentQuestion.passage || "";
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
        const safePassage = currentQuestion.passage || "No passage provided";
        const safeQuestion = currentQuestion.question || "No question provided";
        const responseQuestion = safePassage + "<br/><br/>" + safeQuestion;

        console.log("Creating user response: Science :", {
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        });

        const response = {
            section: "science",
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        };

        scienceResponses.push(response);

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

    // Show Final Score
    function showFinalScore() {
        resetState();

        let maxPossibleScore = (10 * 1) + (10 * 2) + (10 * 3);
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 100 + 100);

        console.log(`Saving Untimed Science score: ${scaledScore}/200`);

        // Store Science Untimed score for profile display
        localStorage.setItem("scienceUntimedScore", scaledScore);

        // Do not write to gedScoreHistory to avoid affecting the chart
        console.log(`Untimed Science score ${scaledScore} saved to scienceUntimedScore for ${new Date().toLocaleDateString("en-CA")}`);

        saveTestCompletion("GED-Science-Untimed");

        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>Untimed Science GED Score:</strong> ${scaledScore} / 200</p>`;
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
            exam: "GED", // Changed from examType to "GED"
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

        const incorrectResponses = scienceResponses.filter(response => response && response.wasCorrect === false);
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sectionDiv = document.createElement("div");
            sectionDiv.innerHTML = "<h3>Science Section</h3>";
            incorrectResponses.forEach((response, index) => {
                console.log(`Processing Science response ${index + 1}:`, response);
                const explanation = generateExplanation(response);
                console.log(`Explanation for Science response ${index + 1}:`, explanation);
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

        if (questionText.includes("Which light condition")) {
            return "Blue light resulted in 20 cm growth, the highest among red (15 cm) and white (18 cm). Option B) Blue is correct.";
        } else if (questionText.includes("how does pH affect growth")) {
            return "Growth decreased from 18 cm at pH 7 to 12 cm at pH 9, indicating lower pH increases growth. Option B) Lower pH is correct.";
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
        questionElement.innerHTML = "This is an untimed GED Science Test. Take your time to answer approximately 34 questions.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startScienceSection();
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