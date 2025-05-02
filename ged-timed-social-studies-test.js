document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const countdownEl = document.getElementById("countdown");
    const gedIntroContainer = document.getElementById("ged-intro-container");
    const startTestButton = document.getElementById("start-test-btn");

    // State Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let testCompleted = false;
    let time;
    let refreshIntervalId;
    let socialStudiesResponses = [];

    // Sample Question Bank
    const socialStudiesQuestions = [
        {
            passage: "In 1963, the March on Washington drew over 200,000 people to demand civil rights. Martin Luther King Jr. delivered his 'I Have a Dream' speech, calling for racial equality. The event pressured Congress to pass the Civil Rights Act of 1964.",
            question: "What was the primary goal of the March on Washington?",
            answers: [
                { text: "A) Economic reform", correct: false },
                { text: "B) Civil rights legislation", correct: true },
                { text: "C) Voting rights", correct: false },
                { text: "D) Education reform", correct: false }
            ],
            type: "social studies",
            difficulty: "medium",
            category: "ged-social-studies"
        },
        {
            passage: "In 1963, the March on Washington drew over 200,000 people...",
            question: "What legislation was influenced by the March?",
            answers: [
                { text: "A) Voting Rights Act", correct: false },
                { text: "B) Civil Rights Act", correct: true },
                { text: "C) Fair Housing Act", correct: false },
                { text: "D) Equal Pay Act", correct: false }
            ],
            type: "social studies",
            difficulty: "medium",
            category: "ged-social-studies"
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
        startSocialStudiesSection();
    }

    // Social Studies Section Starter
    function startSocialStudiesSection() {
        console.log("Starting Social Studies section");
        time = 70 * 60; // 70 minutes
        socialStudiesResponses = [];
        score = 0;
        correctAnswers = 0;
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endSocialStudiesSection, 70 * 60 * 1000);
        passageElement.innerHTML = "";
        startQuiz(socialStudiesQuestions);
    }

    // Timer
    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        if (time === 0) {
            clearInterval(refreshIntervalId);
            endSocialStudiesSection();
        } else {
            time--;
        }
    }

    // Section Ender
    function endSocialStudiesSection() {
        clearInterval(refreshIntervalId);
        recordTestResults();
        resetState();
        showFinalScore();
        testCompleted = true;
        recordTestResults();
    }

    // Start Quiz
    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for Social Studies");
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0) {
            console.warn(`Warning: ${missingPassages.length} questions in Social Studies lack a valid passage`);
        }
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        document.querySelector(".question-row").classList.remove("score-display");
        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("social-studies-section");
        questionRow.classList.add("social-studies-section");

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
        console.log(`Displaying question ${questionNo} in Social Studies, passage:`, currentQuestion.passage || "");
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

        console.log("Creating user response: Social Studies :", {
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        });

        const response = {
            section: "social studies",
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        };

        socialStudiesResponses.push(response);

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
        clearInterval(refreshIntervalId);
        resetState();
    
        let maxPossibleScore = (10 * 1) + (10 * 2) + (10 * 3);
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 100 + 100);
    
        console.log(`Saving Social Studies score: ${scaledScore}/200`);
    
        localStorage.setItem("socialStudiesScore", scaledScore);
    
        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("gedScoreHistory")) || {};
        scoreHistory[today] = scoreHistory[today] || {};
        scoreHistory[today].socialStudies = scaledScore;
        localStorage.setItem("gedScoreHistory", JSON.stringify(scoreHistory));
    
        console.log(`Social Studies score saved for ${today}:`, scoreHistory[today]);
    
        saveTestCompletion("GED-Social-Studies");
    
        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>Social Studies GED Score:</strong> ${scaledScore} / 200</p>`;
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

        const incorrectResponses = socialStudiesResponses.filter(response => response && response.wasCorrect === false);
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sectionDiv = document.createElement("div");
            sectionDiv.innerHTML = "<h3>Social Studies Section</h3>";
            incorrectResponses.forEach((response, index) => {
                console.log(`Processing Social Studies response ${index + 1}:`, response);
                const explanation = generateExplanation(response);
                console.log(`Explanation for Social Studies response ${index + 1}:`, explanation);
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

        if (questionText.includes("What was the primary goal")) {
            return "The March on Washington aimed to push for civil rights legislation, as stated in the passage. Option B) Civil rights legislation is correct.";
        } else if (questionText.includes("What legislation was influenced")) {
            return "The passage explicitly mentions the Civil Rights Act of 1964 as influenced by the March. Option B) Civil Rights Act is correct.";
        }

        return "No explanation available for this question.";
    }

    // Handle Next Button
    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            endSocialStudiesSection();
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
        questionElement.innerHTML = "This is a timed GED Social Studies Test. Duration: 70 minutes with approximately 35 questions.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startSocialStudiesSection();
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

    if (!countdownEl) {
        console.error("countdown element not found");
    }

    // Initialize
    showIntroMessage();
});