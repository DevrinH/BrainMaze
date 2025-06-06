document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const countdownEl = document.getElementById("countdown");
    const actIntroContainer = document.getElementById("act-intro-container");
    const startTestButton = document.getElementById("start-test-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let results = localStorage.getItem("actResults");
    results = results ? JSON.parse(results) : {};
    let refreshIntervalId;
    let time;
    let scienceResponses = [];
    let scienceScore = 0;
    const currentSection = "science";

    // Science question bank
    const scienceQuestions = [
        {
            passage: "A group of scientists conducted experiments to study the effects of temperature and pH on the enzymatic activity of amylase, an enzyme that breaks down starch into glucose. They measured the rate of glucose production (in micromoles per minute) under various conditions. Experiment 1 tested the enzyme's activity at pH 7 across five temperatures: 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested the enzyme's activity at 37°C across five pH levels: 5, 6, 7, 8, and 9. The results are shown in Figures 1 and 2.\n\n**Figure 1: Glucose Production Rate vs. Temperature (pH 7)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 5 µmol/min\n\n**Figure 2: Glucose Production Rate vs. pH (37°C)**\n- pH 5: 15 µmol/min\n- pH 6: 30 µmol/min\n- pH 7: 40 µmol/min\n- pH 8: 35 µmol/min\n- pH 9: 20 µmol/min",
            question: "Based on Figure 1, at which temperature does amylase exhibit the highest enzymatic activity at pH 7?",
            answers: [
                { text: "A) 20°C", correct: false },
                { text: "B) 40°C", correct: true },
                { text: "C) 50°C", correct: false },
                { text: "D) 60°C", correct: false }
            ],
            type: "science",
            difficulty: "medium",
            category: "act-data-representation"
        },
        {
            passage: "A group of scientists conducted experiments to study the effects of temperature and pH on the enzymatic activity of amylase, an enzyme that breaks down starch into glucose. They measured the rate of glucose production (in micromoles per minute) under various conditions. Experiment 1 tested the enzyme's activity at pH 7 across five temperatures: 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested the enzyme's activity at 37°C across five pH levels: 5, 6, 7, 8, and 9. The results are shown in Figures 1 and 2.\n\n**Figure 1: Glucose Production Rate vs. Temperature (pH 7)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 5 µmol/min\n\n**Figure 2: Glucose Production Rate vs. pH (37°C)**\n- pH 5: 15 µmol/min\n- pH 6: 30 µmol/min\n- pH 7: 40 µmol/min\n- pH 8: 35 µmol/min\n- pH 9: 20 µmol/min",
            question: "According to Figure 2, how does the enzymatic activity of amylase change as pH increases from 7 to 9 at 37°C?",
            answers: [
                { text: "A) It increases steadily", correct: false },
                { text: "B) It decreases", correct: true },
                { text: "C) It remains constant", correct: false },
                { text: "D) It increases then decreases", correct: false }
            ],
            type: "science",
            difficulty: "medium",
            category: "act-data-representation"
        }
    ];

    function startTest() {
        if (!actIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        actIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startScienceSection();
    }

    function startScienceSection() {
        time = 35 * 60; // 35 minutes in seconds
        scienceResponses = [];
        score = 0;
        correctAnswers = 0;
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endScienceSection, 35 * 60 * 1000); // End after 35 minutes
        startQuiz(scienceQuestions);
    }

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        if (time === 0) {
            clearInterval(refreshIntervalId);
            endScienceSection();
        } else {
            time--;
        }
    }

    function endScienceSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showFinalScore();
    }

    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for Science section");
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

        // Reset layout classes
        document.querySelector(".question-row").classList.remove("score-display");

        // Add section-specific class
        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("science-section");
        questionRow.classList.add("science-section");

        showQuestion();
    }

    function showQuestion() {
        resetState();
        if (!selectedQuestions[currentQuestionIndex]) {
            console.error("No question available at index", currentQuestionIndex);
            return;
        }
        let currentQuestion = selectedQuestions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        console.log(`Displaying question ${questionNo} in Science, passage:`, currentQuestion.passage || "No passage");
        passageElement.style.display = "block";
        passageElement.innerHTML = currentQuestion.passage || "";
        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("score-display");
        questionElement.classList.remove("centered-score");

        // Display answer buttons without option letters
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
        const responseQuestion = safePassage + "<br/><br/>" + safeQuestion;

        console.log("Creating user response:", {
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

        nextButton.style.display = "block";
        nextButton.disabled = false;
    }

    function showFinalScore() {
        clearInterval(refreshIntervalId);
        resetState();

        // Calculate Science score
        let maxPossibleScore = (13 * 1) + (14 * 2) + (13 * 3); // Assume 40 questions (standard ACT Science)
        let rawScore = score;
        scienceScore = Math.round((rawScore / maxPossibleScore) * 35 + 1);

        // Store score in localStorage
        localStorage.setItem("actScienceScore", scienceScore);

        // Do not write to actScoreHistory to avoid affecting the chart
        console.log(`Timed Science score ${scienceScore} saved to actScienceScore for ${new Date().toLocaleDateString("en-CA")}`);

        // Save test completion metadata
        saveTestCompletion("ACT-Science");

        // Update UI
        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>ACT Science Score:</strong> ${scienceScore} / 36</p>`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");

        // Set up review button
        nextButton.innerHTML = "Review Incorrect Answers";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", showExplanations);
    }

    function saveTestCompletion(examType) {
        const completionData = {
            exam: "ACT", // Changed from examType to "GED"
            type: "test",
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("lastActivity", JSON.stringify(completionData));
    }

    function showExplanations() {
        console.log("Entering showExplanations");
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "<h2>Review of Incorrect Answers</h2>";
        questionElement.style.overflowY = "scroll";
        questionElement.style.maxHeight = "80vh";

        const incorrectResponses = scienceResponses.filter(
            response => response && response.wasCorrect === false
        );
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

    function generateExplanation(response) {
        const questionText = response.question || "";
        if (questionText.includes("Based on Figure 1, at which temperature does amylase exhibit the highest enzymatic activity at pH 7?")) {
            return "Figure 1 shows glucose production rates at pH 7: 20°C (10 µmol/min), 30°C (25 µmol/min), 40°C (40 µmol/min), 50°C (30 µmol/min), 60°C (5 µmol/min). The highest rate is 40 µmol/min at 40°C. Option B) 40°C is correct. A) 20°C, C) 50°C, and D) 60°C have lower rates.";
        } else if (questionText.includes("According to Figure 2, how does the enzymatic activity of amylase change as pH increases from 7 to 9 at 37°C?")) {
            return "Figure 2 shows glucose production rates at 37°C: pH 7 (40 µmol/min), pH 8 (35 µmol/min), pH 9 (20 µmol/min). From pH 7 to 9, the rate decreases from 40 to 20 µmol/min. Option B) It decreases is correct. A) is incorrect as the rate doesn’t increase; C) is wrong as it’s not constant; D) is false as there’s no increase.";
        }
        return "No explanation available for this question.";
    }

    function handleNextButton() {
        recordTestResults();
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            endScienceSection();
        }
    }

    function updateProgressBar() {
        const progressBar = document.getElementById("progress-bar-test");
        let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
        progressBar.firstElementChild.style.width = progress + "%";
    }

    function recordTestResults() {
        let storedResults = localStorage.getItem("actTestResults");
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
        }

        localStorage.setItem("actTestResults", JSON.stringify(results));

        for (let category in categoryStats) {
            categoryStats[category].correct = 0;
            categoryStats[category].incorrect = 0;
        }
    }

    function showIntroMessage() {
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "This is a timed ACT Science Test. You have 35 minutes to complete the section.";
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
        nextButton.addEventListener("click", handleNextButton);
    } else {
        console.error("next-btn element not found");
    }

    // Initialize the test by showing the intro message
    showIntroMessage();
});