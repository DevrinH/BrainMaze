document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const gedIntroContainer = document.getElementById("ged-intro-container");
    const startTestButton = document.getElementById("start-test-btn");
    const continueButton = document.getElementById("continue-btn");

    // State Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let testCompleted = false;
    let currentSection = "rla";
    let rlaResponses = [];
    let mathResponses = [];
    let scienceResponses = [];
    let socialStudiesResponses = [];

    // Sample Question Banks
    const rlaQuestions = [
        {
            passage: "The small town of Millville faced a dilemma in 2023. A historic bridge, built in 1890, was crumbling, but replacing it would disrupt local businesses. The town council proposed a temporary ferry service, but residents worried about costs and delays. Mayor Elena Torres argued for restoration, citing the bridge’s cultural value. She referenced a 2019 study showing 70% of residents favored preservation. Opponents, led by shop owner Carl Reed, pushed for a modern bridge, claiming it would boost tourism. At a heated town meeting, Elena presented a compromise: restore the bridge while building a small pedestrian bypass. The plan passed narrowly, but tensions lingered.",
            question: "Which word should replace 'claiming' in the sentence 'Opponents, led by shop owner Carl Reed, pushed for a modern bridge, claiming it would boost tourism' to maintain tone consistency?",
            answers: [
                { text: "A) asserting", correct: true },
                { text: "B) insisting", correct: false },
                { text: "C) boasting", correct: false },
                { text: "D) guessing", correct: false }
            ],
            type: "rla",
            difficulty: "medium",
            category: "ged-language-arts"
        },
        {
            passage: "The small town of Millville faced a dilemma in 2023...",
            question: "What is the main idea of the passage?",
            answers: [
                { text: "A) The town council ignored residents’ concerns.", correct: false },
                { text: "B) A historic bridge sparked debate over preservation versus modernization.", correct: true },
                { text: "C) A ferry service was the preferred solution.", correct: false },
                { text: "D) Tourism declined due to bridge issues.", correct: false }
            ],
            type: "rla",
            difficulty: "medium",
            category: "ged-language-arts"
        },
        {
            "passage": "The small farming community of Greenvale faced a crisis in 2023 when a major drought depleted water reserves. A 2021 study showed the aquifer supplying 60% of the town’s water was at historic lows. Farmer Jane Kim proposed a water-sharing agreement with neighboring towns, but local business owner Tom Harris argued it would raise costs for residents. At a town meeting, Jane cited a case where a similar agreement saved a nearby town during a 2018 drought. Tom countered that Greenvale’s economy depended on low water rates. The council delayed the decision, leaving tensions high.",
            "question": "Which phrase best describes the tone of the passage?",
            "answers": [
                { "text": "A) Emotional and confrontational", "correct": false },
                { "text": "B) Critical and dismissive", "correct": false },
                { "text": "C) Optimistic and collaborative", "correct": false },
                { "text": "D) Neutral and informative", "correct": true }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "In 2024, the town of Clearwater faced a public transportation crisis. A 2022 study showed that 40% of residents relied on buses, but the fleet was outdated, causing frequent delays. Mayor Anna Ruiz proposed a $3 million upgrade to electric buses, citing environmental benefits. Local merchant Tim Blake opposed the plan, arguing it would increase taxes. At a town meeting, Anna highlighted a 2021 survey showing 60% of residents supported green initiatives. The council approved a scaled-down plan, balancing costs and sustainability.",
            "question": "What is the central idea of the passage?",
            "answers": [
                { "text": "A) The importance of upgrading public transportation for environmental benefits", "correct": true },
                { "text": "B) The economic challenges of maintaining an outdated bus fleet", "correct": false },
                { "text": "C) The conflict between merchants and the town council", "correct": false },
                { "text": "D) The need for tax increases to fund public services", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-central-ideas"
        },
    ];

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
            passage: "The researcher also tested water pH levels (5, 7, 9) on plant growth...",
            question: "If plants at pH 7 grew 18 cm, and pH 9 grew 15 cm, how does pH affect growth?",
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
        startRlaSection();
    }

    // Section Starters
    function startRlaSection() {
        currentSection = "rla";
        rlaResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(rlaQuestions);
    }

    function startMathSection() {
        currentSection = "math";
        mathResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(mathQuestions);
    }

    function startScienceSection() {
        currentSection = "science";
        scienceResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.innerHTML = "";
        startQuiz(scienceQuestions);
    }

    function startSocialStudiesSection() {
        currentSection = "social studies";
        socialStudiesResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.innerHTML = "";
        startQuiz(socialStudiesQuestions);
    }

    // Section Enders
    function endRlaSection() {
        recordTestResults();
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathSection() {
        recordTestResults();
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endScienceSection() {
        recordTestResults();
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endSocialStudiesSection() {
        recordTestResults();
        resetState();
        showFinalScore();
        testCompleted = true;
        recordTestResults();
    }

    // Start Quiz
    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for", currentSection);
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0 && currentSection !== "math") {
            console.warn(`Warning: ${missingPassages.length} questions in ${currentSection} lack a valid passage`);
        }
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        document.querySelector(".question-row").classList.remove("score-display");

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("rla-section", "math-section", "science-section", "social-studies-section");
        questionRow.classList.add(`${currentSection.replace(" ", "-")}-section`);

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
        console.log(`Displaying question ${questionNo} in ${currentSection}, passage:`, currentQuestion.passage || "No passage");
        passageElement.style.display = currentSection === "math" ? "none" : "block";
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

        if (currentSection === "rla") rlaResponses.push(response);
        else if (currentSection === "math") mathResponses.push(response);
        else if (currentSection === "science") scienceResponses.push(response);
        else if (currentSection === "social studies") socialStudiesResponses.push(response);

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

    // Show Score
    function showScore() {
        resetState();

        let maxPossibleScore = (10 * 1) + (10 * 2) + (10 * 3);
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 100 + 100);

        document.getElementById("question-container").classList.remove("hide");
        localStorage.setItem(currentSection + "Score", scaledScore);
        passageElement.innerHTML = "";
        questionElement.innerHTML = `${currentSection.toUpperCase()} GED Score: ${scaledScore} / 200`;
        questionElement.classList.add("centered-score");

        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
    }

    // Show Final Score
    function showFinalScore() {
        resetState();
    
        // Retrieve scores from localStorage (or calculate if set during test)
        let rlaScore = parseInt(localStorage.getItem("rlaScore") || 100, 10);
        let mathScore = parseInt(localStorage.getItem("mathScore") || 100, 10);
        let scienceScore = parseInt(localStorage.getItem("scienceScore") || 100, 10);
        let socialStudiesScore = parseInt(localStorage.getItem("socialStudiesScore") || 100, 10);
    
        // Save scores to gedScoreHistory with testType: "full"
        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("gedScoreHistory")) || {};
        scoreHistory[today] = {
            testType: "full", // Flag as full test for chart
            rla: rlaScore,
            math: mathScore,
            science: scienceScore,
            socialStudies: socialStudiesScore,
            total: rlaScore + mathScore + scienceScore + socialStudiesScore
        };
        localStorage.setItem("gedScoreHistory", JSON.stringify(scoreHistory));
    
        console.log(`Final GED Untimed Full Test scores saved for ${today}:`, scoreHistory[today]);
    
        // Save test completion metadata
        saveTestCompletion("GED-Full-Untimed");
    
        // Update UI to display scores
        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `
            <p><strong>RLA GED Score:</strong> ${rlaScore} / 200</p>
            <p><strong>Math GED Score:</strong> ${mathScore} / 200</p>
            <p><strong>Science GED Score:</strong> ${scienceScore} / 200</p>
            <p><strong>Social Studies GED Score:</strong> ${socialStudiesScore} / 200</p>`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
    
        // Set up review button
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

        const allResponses = [
            ...rlaResponses.map(r => ({ ...r, section: "rla" })),
            ...mathResponses.map(r => ({ ...r, section: "math" })),
            ...scienceResponses.map(r => ({ ...r, section: "science" })),
            ...socialStudiesResponses.map(r => ({ ...r, section: "social studies" }))
        ];

        const incorrectResponses = allResponses.filter(
            response => response && response.wasCorrect === false && response.section
        );
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sections = ["rla", "math", "science", "social studies"];
            sections.forEach(section => {
                const sectionResponses = incorrectResponses.filter(res => res.section === section);
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

    // Generate Explanations
    function generateExplanation(response) {
        const questionText = response.question || "";

        // RLA Questions
        if (questionText.includes("Which word should replace 'claiming'")) {
            return "The word 'asserting' maintains a formal tone consistent with the passage, while 'insisting' is too forceful, 'boasting' implies exaggeration, and 'guessing' is too tentative.";
        } else if (questionText.includes("What is the main idea of the passage")) {
            return "The passage focuses on the debate over preserving or replacing a historic bridge, making option B correct. Other options misrepresent the passage’s focus.";
        }

        // Math Questions
        if (questionText.includes("If 2x + 5 = 13")) {
            return "Solve 2x + 5 = 13: subtract 5 to get 2x = 8, then divide by 2 to get x = 4. Option B) 4 is correct.";
        } else if (questionText.includes("What is the area of a rectangle")) {
            return "Area = length × width = 10 × 6 = 60. Option B) 60 is correct.";
        }

        // Science Questions
        if (questionText.includes("Which light condition")) {
            return "Blue light resulted in 20 cm growth, the highest among red (15 cm) and white (18 cm). Option B) Blue is correct.";
        } else if (questionText.includes("how does pH affect growth")) {
            return "Growth decreased from 18 cm at pH 7 to 15 cm at pH 9, indicating lower pH increases growth. Option B) Lower pH is correct.";
        }

        // Social Studies Questions
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
            switch (currentSection) {
                case "rla": endRlaSection(); break;
                case "math": endMathSection(); break;
                case "science": endScienceSection(); break;
                case "social studies": endSocialStudiesSection(); break;
            }
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
        questionElement.innerHTML = "This is an untimed GED Test. Complete each section at your own pace.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startRlaSection();
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
                case "rla": startMathSection(); break;
                case "math": startScienceSection(); break;
                case "science": startSocialStudiesSection(); break;
                case "social studies": showFinalScore(); break;
            }
        });
    } else {
        console.error("continue-btn element not found");
    }

    // Initialize
    showIntroMessage();
});