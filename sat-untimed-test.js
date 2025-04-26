document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const satIntroContainer = document.getElementById("sat-intro-container");
    const startTestButton = document.getElementById("start-test-btn");
    const continueButton = document.getElementById("continue-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let results = localStorage.getItem("satResults");
    results = results ? JSON.parse(results) : {};
    let currentSection = "reading";
    let readingScore = 0, writingScore = 0, mathScore = 0;

    // SAT-specific questions
    const readingQuestions = [
        {
            passage: "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades...",
            question: "What is the primary reason Clara is drawn to the house on Maple Street?",
            answers: [
                { text: "A) She wants to prove the house is haunted.", correct: false },
                { text: "B) She is researching Eliza Hawthorne’s life.", correct: true },
                { text: "C) She plans to renovate the property.", correct: false },
                { text: "D) She is following a family tradition.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "sat-reading-main-idea"
        },
    ];

    const writingQuestions = [
        {
            passage: "The community center buzzed with anticipation as the robotics team unveiled their project...",
            question: "Which punctuation correctly completes the sentence 'Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass'?",
            answers: [
                { text: "A) Aisha the team’s coder had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                { text: "B) Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: true },
                { text: "C) Aisha the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                { text: "D) Aisha, the team’s coder had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false }
            ],
            type: "writing",
            difficulty: "easy",
            category: "sat-writing-conventions"
        },
    ];

    const mathNoCalcQuestions = [
        {
            passage: "",
            question: "What is the value of x in the equation 3x + 7 = 22?",
            answers: [
                { text: "4", correct: false },
                { text: "5", correct: true },
                { text: "6", correct: false },
                { text: "7", correct: false }
            ],
            difficulty: "medium",
            category: "sat-math-algebra"
        },
    ];

    const mathWithCalcQuestions = [
        {
            passage: "",
            question: "If f(x) = x^2 + 3x - 4, what is f(2)?",
            answers: [
                { text: "8", correct: false },
                { text: "4", correct: false },
                { text: "6", correct: true },
                { text: "10", correct: false }
            ],
            difficulty: "medium",
            category: "sat-math-functions"
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
    let mathWithCalcResponses = [];

    function startReadingSection() {
        currentSection = "reading";
        readingResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(readingQuestions);
    }

    function startWritingSection() {
        currentSection = "writing";
        writingResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(writingQuestions);
    }

    function startMathNoCalcSection() {
        currentSection = "math-no-calc";
        mathNoCalcResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.innerHTML = "";
        startQuiz(mathNoCalcQuestions);
    }

    function startMathWithCalcSection() {
        currentSection = "math-with-calc";
        mathWithCalcResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.innerHTML = "";
        startQuiz(mathWithCalcQuestions);
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

    function endMathWithCalcSection() {
        resetState();
        showFinalScore();
    }

    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for", currentSection);
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0 && currentSection !== "math-no-calc" && currentSection !== "math-with-calc") {
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
        questionRow.classList.remove("reading-section", "writing-section", "math-no-calc", "math-with-calc");
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

        nextButton.style.display = "block";
        nextButton.disabled = false;
    }

    function showScore() {
        resetState();

        let maxPossibleScore = (1 * 1) + (3 * 2) + (0 * 3);
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

        document.getElementById("question-container").classList.remove("hide");

        localStorage.setItem("readingWritingScore", scaledScore);
        readingWritingScore = scaledScore;

        passageElement.innerHTML = "";
        questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
        questionElement.classList.add("centered-score");

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.add("score-display");

        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
    }

    function showFinalScore() {
        resetState();

        let maxPossibleScore = (1 * 1) + (1 * 2) + (2 * 3);
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

        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `
            <p><strong>Reading and Writing SAT Score:</strong> ${readingWritingScore} / 800</p>
            <p><strong>Math SAT Score:</strong> ${mathScore} / 800</p>
            <p><strong>Total SAT Score:</strong> ${totalSATScore} / 1600</p>`;
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
            ...readingWritingResponses.map(r => ({ ...r, section: "reading-writing" })),
            ...mathResponses.map(r => ({ ...r, section: "math" }))
        ];

        const incorrectResponses = allResponses.filter(
            response => response && response.wasCorrect === false && response.section
        );
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sections = ["reading-writing", "math"];
            sections.forEach(section => {
                const sectionResponses = incorrectResponses.filter(res => res.section === section);
                if (sectionResponses.length > 0) {
                    const sectionDiv = document.createElement("div");
                    sectionDiv.innerHTML = `<h3>${section === "reading-writing" ? "Reading and Writing" : "Math"} Section</h3>`;
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
            console.log("Final satTestResults before redirect:", localStorage.getItem("satTestResults"));
            window.location.href = "https://www.brainjelli.com/user-profile.html";
        });
    }

    function generateExplanation(response) {
        const questionText = response.question || "";
        if (questionText.includes("Solve for x: 2x + 3 = 7")) {
            return "Solve 2x + 3 = 7 by subtracting 3: 2x = 4. Divide by 2: x = 2. The correct answer is x = 2.";
        } else if (questionText.includes("Solve the system of equations: y = 2x + 1, y = x + 3")) {
            return "Set the equations equal: 2x + 1 = x + 3. Subtract x: x + 1 = 3. Subtract 1: x = 2. Substitute x = 2 into y = x + 3: y = 2 + 3 = 5. The correct answer is x = 2, y = 5.";
        } else if (questionText.includes("What is the value of sin(π/3)?")) {
            return "The value of sin(π/3) is a standard trigonometric value. π/3 radians is 60 degrees, and sin(60°) = √3/2. The correct answer is √3/2.";
        } else if (questionText.includes("If f(x) = x² + 2x + 1, what is f(2)?")) {
            return "Substitute x = 2 into f(x) = x² + 2x + 1: f(2) = 2² + 2(2) + 1 = 4 + 4 + 1 = 9. The correct answer is 9.";
        } else if (questionText.includes("What can be inferred about Clara's personality based on the passage?")) {
            return "The passage states Clara is reserved and spends her days reading, but she has a keen interest in the village's history. This suggests she is curious and reserved. The correct answer is 'She is curious and reserved.'";
        } else if (questionText.includes("What can be inferred about the elder's opinion of younger people in general?")) {
            return "The elder says Clara 'listens more than she speaks, which is rare for someone her age,' implying younger people typically speak more than they listen. The correct answer is 'They often speak more than they listen.'";
        } else if (questionText.includes("Which of the following statements from the passage best supports the claim that deforestation threatens the forest ecosystem?")) {
            return "The statement 'Studies show that these birds play a critical role in seed dispersal, which supports forest regeneration' directly links the decline in bird populations (caused by deforestation) to impaired forest regeneration, supporting the claim. This is the correct answer.";
        } else if (questionText.includes("Which of the following pieces of evidence from the passage most directly supports the idea that deforestation has measurable impacts?")) {
            return "The statement 'The rapid deforestation in the region has led to a 30% decline in local bird populations over the past decade' provides a specific, measurable impact (30% decline) of deforestation, making it the correct answer.";
        }
        return "No explanation available for this question.";
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

    function recordTestResults() {
        let results = {};
    
        for (let category in categoryStats) {
            results[category] = {
                correct: categoryStats[category].correct || 0,
                incorrect: categoryStats[category].incorrect || 0
            };
            console.log(`SAT Category: ${category}, Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
        }
    
        localStorage.setItem("satTestResults", JSON.stringify(results));
        console.log("SAT Test Results Saved:", results);
    
        for (let category in categoryStats) {
            categoryStats[category].correct = 0;
            categoryStats[category].incorrect = 0;
        }
    }

    function showIntroMessage() {
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "This is an untimed SAT Test. Complete each section at your own pace.";
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
            switch (currentSection) {
                case "reading-writing": startMathSection(); break;
                case "math": showFinalScore(); break;
            }
        });
    } else {
        console.error("continue-btn element not found");
    }

    showIntroMessage();
});