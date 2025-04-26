Alright, let's transform this ACT script into an SAT-style test. We'll keep the core functionality intact but adjust the content, structure, and scoring to align with the SAT. Here's the modified JavaScript:
document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const satIntroContainer = document.getElementById("act-intro-container"); // Reusing the container, update HTML if needed
    const startTestButton = document.getElementById("start-test-btn"); // Reusing the button, update HTML if needed
    const continueButton = document.getElementById("continue-btn"); // Reusing the button, update HTML if needed

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let results = localStorage.getItem("satResults");
    results = results ? JSON.parse(results) : {};
    let currentSection = "reading"; // SAT starts with Reading
    let readingScore = 0, writingScore = 0, mathNoCalcScore = 0, mathCalcScore = 0;

    // Sample SAT-style questions
    const readingQuestions = [
        {
            passage: "The passage below is adapted from a speech delivered by a Nobel Prize laureate.\n\n'The pursuit of knowledge is an endeavor that transcends the boundaries of nations and generations. It is a flame passed from one mind to another, illuminating the darkest corners of ignorance and prejudice. Our understanding of the universe, of ourselves, and of our place within the grand tapestry of existence is constantly evolving, driven by the relentless curiosity of the human spirit. This quest is not always easy; it demands rigor, perseverance, and a willingness to challenge established norms. Yet, the rewards are immeasurable. Each discovery, each insight, brings us closer to a more profound comprehension of the world around us and our capacity to shape its future. It is through this shared journey of inquiry that we build bridges of understanding and foster a more interconnected and peaceful world.'",
            question: "The primary purpose of the passage is to:",
            answers: [
                { text: "A) criticize the limitations of current scientific research.", correct: false },
                { text: "B) emphasize the importance and impact of the pursuit of knowledge.", correct: true },
                { text: "C) describe the personal struggles of a life dedicated to science.", correct: false },
                { text: "D) argue for increased funding for international research collaborations.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "sat-understanding-central-ideas-and-themes"
        },
    ];

    const writingQuestions = [
        {
            passage: "Many studies have shown the benefits of regular exercise. People who engage in physical activity tend to have lower rates of heart disease, diabetes, and certain types of cancer. Regular exercise can also improve mood, reduce stress, and increase energy levels. *Therefore, it is important for individuals to incorporate physical activity into their daily routines.*",
            question: "Which of the following best maintains the style and tone of the passage?",
            answers: [
                { text: "A) So, you should really try to work out more, okay?", correct: false },
                { text: "B) Consequently, the integration of physical activity into one's daily life is of considerable significance.", correct: true },
                { text: "C) Getting some exercise is a pretty good idea for most folks.", correct: false },
                { text: "D) To sum up, moving your body on the regular is a key to staying healthy and happy.", correct: false }
            ],
            type: "writing",
            difficulty: "medium",
            category: "sat-expression-of-ideas"
        },
    ];

    const mathNoCalcQuestions = [
        {
            passage: "",
            question: "If $y = 3x - 5$, what is the value of $x$ when $y = 7$?",
            answers: [
                { text: "A) 2", correct: false },
                { text: "B) 4", correct: true },
                { text: "C) 6", correct: false },
                { text: "D) 8", correct: false }
            ],
            type: "math-no-calc",
            difficulty: "easy",
            category: "sat-algebra"
        },
    ];

    const mathCalcQuestions = [
        {
            passage: "",
            question: "A store sells bags of popcorn in two sizes: large and small. A large bag costs $5.25 and a small bag costs $3.00. On a certain day, the store sold 15 large bags and 22 small bags of popcorn. What was the total revenue from popcorn sales that day?",
            answers: [
                { text: "$148.25", correct: false },
                { text: "$144.75", correct: true },
                { text: "$135.00", correct: false },
                { text: "$115.50", correct: false }
            ],
            type: "math-calc",
            difficulty: "medium",
            category: "sat-problem-solving-and-data-analysis"
        },
    ];

    function startTest() {
        if (!satIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        satIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startReadingSection();
    }

    let readingResponses = [];
    let writingResponses = [];
    let mathNoCalcResponses = [];
    let mathCalcResponses = [];

    function startReadingSection() {
        currentSection = "reading";
        readingResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.style.display = "block";
        startQuiz(readingQuestions);
    }

    function startWritingSection() {
        currentSection = "writing";
        writingResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.style.display = "block";
        startQuiz(writingQuestions);
    }

    function startMathNoCalcSection() {
        currentSection = "math-no-calc";
        mathNoCalcResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.style.display = "none";
        startQuiz(mathNoCalcQuestions);
    }

    function startMathCalcSection() {
        currentSection = "math-calc";
        mathCalcResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.style.display = "none";
        startQuiz(mathCalcQuestions);
    }

    function endReadingSection() {
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endWritingSection() {
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathNoCalcSection() {
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathCalcSection() {
        resetState();
        showFinalScore();
    }

    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for", currentSection);
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0 && !currentSection.startsWith("math")) {
            console.warn(`Warning: ${missingPassages.length} questions in ${currentSection} lack a valid passage`);
        }
        currentQuestionIndex = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        // Reset layout classes
        document.querySelector(".question-row").classList.remove("score-display");

        // Add section-specific class
        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("reading-section", "writing-section", "math-no-calc-section", "math-calc-section");
        questionRow.classList.add(`${currentSection}-section`);

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
        console.log(`Displaying question ${questionNo} in ${currentSection}, passage:`, currentQuestion.passage || "No passage");
        passageElement.style.display = currentSection.startsWith("math") ? "none" : "block";
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
        const responseQuestion = currentSection.startsWith("math") ? safeQuestion : safePassage + "<br/><br/>" + safeQuestion;

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

        if (currentSection === "reading") {
            readingResponses.push(response);
        } else if (currentSection === "writing") {
            writingResponses.push(response);
        } else if (currentSection === "math-no-calc") {
            mathNoCalcResponses.push(response);
        } else if (currentSection === "math-calc") {
            mathCalcResponses.push(response);
        }

        if (isCorrect) {
            selectedBtn.classList.add("correct");
            correctAnswers++;
            if (questionDifficulty === "easy") {
                score += 1;
            } else if (questionDifficulty === "medium") {
                score += 1;
            } else if (questionDifficulty === "hard") {
                score += 1;
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

    function showScore() {
        resetState();

        let rawScore = correctAnswers; // SAT scoring is primarily based on number correct
        let scaledScore;
        const maxPossible = selectedQuestions.length;

        // Basic linear scaling for demonstration - SAT scaling is more complex
        scaledScore = Math.round((rawScore / maxPossible) * 800 / 2 + 200); // Roughly scale to 200-800 range

        document.getElementById("question-container").classList.remove("hide");

        localStorage.setItem(currentSection + "Score", scaledScore);
        if (currentSection === "reading") readingScore = scaledScore;
        else if (currentSection === "writing") writingScore = scaledScore;
        else if (currentSection === "math-no-calc") mathNoCalcScore = scaledScore;
        else if (currentSection === "math-calc") mathCalcScore = scaledScore;

        passageElement.innerHTML = "";
        questionElement.innerHTML = `${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} SAT Score: ${scaledScore} / 800`;
        questionElement.classList.add("centered-score");

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.add("score-display");

        if (currentSection.startsWith("math")) {
            questionRow.classList.add("vertical-layout");
        }

        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
    }

    function showFinalScore() {
        resetState();

        let mathSectionScore = Math.round((mathNoCalcScore + mathCalcScore) / 2); // Approximate Math section score
        let evidenceBasedReadingAndWriting = readingScore + writingScore;
        let totalScore = evidenceBasedReadingAndWriting + mathSectionScore;

        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("satScoreHistory")) || {};
        scoreHistory[today] = {
            reading: readingScore,
            writing: writingScore,
            mathNoCalc: mathNoCalcScore,
            mathCalc: mathCalcScore,
            math: mathSectionScore,
            ebrw: evidenceBasedReadingAndWriting,
            total: totalScore
        };
        localStorage.setItem("satScoreHistory", JSON.stringify(scoreHistory));

        saveTestCompletion("SAT");

        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `
            <p><strong>Reading SAT Score:</strong> ${readingScore} / 800</p>
            <p><strong>Writing and Language SAT Score:</strong> ${writingScore} / 800</p>
            <p><strong>Math (No Calculator) SAT Score:</strong> ${mathNoCalcScore} / 800</p>
            <p><strong>Math (Calculator) SAT Score:</strong> ${mathCalcScore} / 800</p>
            <p><strong>Evidence-Based Reading and Writing:</strong> ${evidenceBasedReadingAndWriting} / 1600</p>
            <p><strong>Math Total:</strong> ${mathSectionScore} / 800</p>
            <p><strong>Total SAT Score (Estimate):</strong> ${totalScore} / 1600</p>`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Review Incorrect Answers";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", showExplanations);
    }

    function saveTestCompletion(examType) {
        const completionData = {
            exam: examType,
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

        const allResponses = [
            ...readingResponses.map(r => ({ ...r, section: "reading" })),
            ...writingResponses.map(r => ({ ...r, section: "writing" })),
            ...mathNoCalcResponses.map(r => ({

            ...mathCalcResponses.map(r => ({ ...r, section: "math" }))
        ];

        const incorrectResponses = allResponses.filter(
            response => response && response.wasCorrect === false && response.section
        );
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sections = ["reading", "writing", "math"];
            sections.forEach(section => {
                const sectionResponses = incorrectResponses.filter(res => {
                    return section === "math" ? res.section.startsWith("math") : res.section === section;
                });
                if (sectionResponses.length > 0) {
                    const sectionDiv = document.createElement("div");
                    sectionDiv.innerHTML = `<h3>${section.charAt(0).toUpperCase() + section.slice(1)} Section</h3>`;
                    sectionResponses.forEach((response, index) => {
                        console.log(`Processing ${section} response ${index + 1}:`, response);
                        const explanation = generateExplanation(response);
                        console.log(`Explanation for ${section} response ${index + 1}:`, explanation);
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
                }
            });
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

    function generateExplanation(response) {
        const questionText = response.question || "";
        if (questionText.includes("If $y = 3x - 5$, what is the value of $x$ when $y = 7$?")) {
            return "Substitute $y = 7$ into the equation: $7 = 3x - 5$. Add 5 to both sides: $12 = 3x$. Divide by 3: $x = 4$. Option B) 4 is correct.";
        } else if (questionText.includes("A store sells bags of popcorn...")) {
            return "Calculate the revenue from large bags: 15 bags * $5.25/bag = $78.75. Calculate the revenue from small bags: 22 bags * $3.00/bag = $66.00. Total revenue = $78.75 + $66.00 = $144.75. Option B) $144.75 is correct.";
        } else if (questionText.includes("The primary purpose of the passage is:")) {
            return "The passage emphasizes the importance and impact of the pursuit of knowledge, highlighting its role in understanding the world and fostering peace. Option B is the most accurate summary.";
        } else if (questionText.includes("Which of the following best maintains the style and tone of the passage?")) {
            return "The original passage uses formal and academic language. Option B, 'Consequently, the integration of physical activity into one's daily life is of considerable significance,' best reflects this style and tone.";
        }
        return "No explanation available for this question.";
    }

    function handleNextButton() {
        recordTestResults();
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            switch (currentSection) {
                case "reading": endReadingSection(); break;
                case "writing": endWritingSection(); break;
                case "math-no-calc": endMathNoCalcSection(); break;
                case "math-calc": endMathCalcSection(); break;
            }
        }
    }

    function updateProgressBar() {
        const progressBar = document.getElementById("progress-bar-test");
        let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
        progressBar.firstElementChild.style.width = progress + "%";
    }

    function recordTestResults() {
        let storedResults = localStorage.getItem("satTestResults");
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

        localStorage.setItem("satTestResults", JSON.stringify(results));

        for (let category in categoryStats) {
            categoryStats[category].correct = 0;
            categoryStats[category].incorrect = 0;
        }
    }

    function showIntroMessage() {
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "This is an untimed SAT Practice Test. Complete each section at your own pace.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startReadingSection();
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
            switch (currentSection) {
                case "reading": startWritingSection(); break;
                case "writing": startMathNoCalcSection(); break;
                case "math-no-calc": startMathCalcSection(); break;
                case "math-calc": showFinalScore(); break;
            }
        });
    } else {
        console.error("continue-btn element not found");
    }

    // Initialize the test by showing the intro message
    showIntroMessage();
});
