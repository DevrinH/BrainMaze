let categoryStats = {};
let testCompleted = false;

function recordTestResults() {
    // Load existing test results from localStorage
    let existingResults = localStorage.getItem("actTestResults");
    let results = existingResults ? JSON.parse(existingResults) : {};

    // Accumulate new results into existing results
    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
        console.log(`ACT Category: ${category}, Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
    }

    localStorage.setItem("actTestResults", JSON.stringify(results));
    console.log("ACT Test Results Saved:", results);

    // Dispatch testSubmitted event
    window.dispatchEvent(new Event("testSubmitted"));

    // Reset categoryStats for the next question
    if (!testCompleted) {
        categoryStats = {};
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const actIntroContainer = document.getElementById("act-intro-container");
    const startTestButton = document.getElementById("start-test-btn");
    const continueButton = document.getElementById("continue-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let currentSection = "english";
    let englishScore = 0, mathScore = 0, readingScore = 0, scienceScore = 0;

    const englishQuestions = [
        {
            passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
            question: "Which sentence best supports the idea that Aisha contributed to the project by refining algorithms to distinguish plastic from glass?",
            answers: [
                { text: "A) For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code.", correct: false },
                { text: "B) Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: true },
                { text: "C) The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves.", correct: false },
                { text: "D) As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration.", correct: false }
            ],
            type: "english",
            difficulty: "easy",
            category: "act-conventions-of-standard-english"
        }
    ];

    const mathQuestions = [
        {
            passage: "",
            question: "What is the value of x in the equation 3x + 7 = 22?",
            answers: [
                { text: "4", correct: false },
                { text: "5", correct: true },
                { text: "6", correct: false },
                { text: "7", correct: false }
            ],
            type: "math",
            difficulty: "easy",
            category: "act-algebra"
        },
        {
            passage: "",
            question: "If f(x) = x^2 + 3x - 4, what is f(2)?",
            answers: [
                { text: "4", correct: false },
                { text: "6", correct: true },
                { text: "8", correct: false },
                { text: "10", correct: false }
            ],
            type: "math",
            difficulty: "medium",
            category: "act-functions"
        }
    ];

    const readingQuestions = [
        {
            passage: "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align. On a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase. The hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’ Clara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
            question: "What is the main reason Clara is drawn to the house on Maple Street?",
            answers: [
                { text: "A) She believes it is haunted by Eliza Hawthorne.", correct: false },
                { text: "B) She is researching Eliza Hawthorne’s life.", correct: true },
                { text: "C) She wants to find a hidden treasure.", correct: false },
                { text: "D) She is looking for a new place to live.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "act-main-idea"
        }
    ];

    const scienceQuestions = [
        {
            passage: "A group of scientists conducted experiments to study the effects of temperature and pH on the enzymatic activity of amylase, an enzyme that breaks down starch into glucose. They measured the rate of glucose production (in micromoles per minute) under various conditions. Experiment 1 tested the enzyme's activity at pH 7 across five temperatures: 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested the enzyme's activity at 37°C across five pH levels: 5, 6, 7, 8, and 9. The results are shown in Figures 1 and 2. **Figure 1: Glucose Production Rate vs. Temperature (pH 7)** - 20°C: 10 µmol/min - 30°C: 25 µmol/min - 40°C: 40 µmol/min - 50°C: 30 µmol/min - 60°C: 5 µmol/min **Figure 2: Glucose Production Rate vs. pH (37°C)** - pH 5: 15 µmol/min - pH 6: 30 µmol/min - pH 7: 40 µmol/min - pH 8: 35 µmol/min - pH 9: 20 µmol/min",
            question: "At which temperature does the enzyme exhibit the highest enzymatic activity at pH 7?",
            answers: [
                { text: "A) 20°C", correct: false },
                { text: "B) 40°C", correct: true },
                { text: "C) 50°C", correct: false },
                { text: "D) 60°C", correct: false }
            ],
            type: "science",
            difficulty: "easy",
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
        startEnglishSection();
    }

    let englishResponses = [];
    let mathResponses = [];
    let readingResponses = [];
    let scienceResponses = [];

    function startEnglishSection() {
        currentSection = "english";
        englishResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(englishQuestions);
    }

    function startMathSection() {
        currentSection = "math";
        mathResponses = [];
        score = 0;
        correctAnswers = 0;
        passageElement.innerHTML = "";
        startQuiz(mathQuestions);
    }

    function startReadingSection() {
        currentSection = "reading";
        readingResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(readingQuestions);
    }

    function startScienceSection() {
        currentSection = "science";
        scienceResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(scienceQuestions);
    }

    function endEnglishSection() {
        recordTestResults();
        resetState();
        showScore("English");
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathSection() {
        recordTestResults();
        resetState();
        showScore("Math");
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endReadingSection() {
        recordTestResults();
        resetState();
        showScore("Reading");
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endScienceSection() {
        recordTestResults();
        resetState();
        showFinalScore();
    }

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
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        document.querySelector(".question-row").classList.remove("score-display");

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("english-section", "math-section", "reading-section", "science-section");
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

        if (currentSection === "english") {
            englishResponses.push(response);
        } else if (currentSection === "math") {
            mathResponses.push(response);
        } else if (currentSection === "reading") {
            readingResponses.push(response);
        } else if (currentSection === "science") {
            scienceResponses.push(response);
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

    function showScore(section) {
        resetState();

        let maxPossibleScore = selectedQuestions.reduce((total, q) => {
            if (q.difficulty === "easy") return total + 1;
            if (q.difficulty === "medium") return total + 2;
            return total + 3;
        }, 0);
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 36);

        document.getElementById("question-container").classList.remove("hide");

        if (section === "English") englishScore = scaledScore;
        else if (section === "Math") mathScore = scaledScore;
        else if (section === "Reading") readingScore = scaledScore;
        else if (section === "Science") scienceScore = scaledScore;

        localStorage.setItem(`${section.toLowerCase()}Score`, scaledScore);

        passageElement.innerHTML = "";
        questionElement.innerHTML = `${section} ACT Score: ${scaledScore} / 36`;
        questionElement.classList.add("centered-score");

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.add("score-display");

        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
    }

    function showFinalScore() {
        resetState();

        let compositeScore = Math.round((englishScore + mathScore + readingScore + scienceScore) / 4);
        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("actScoreHistory")) || {};
        scoreHistory[today] = {
            english: englishScore,
            math: mathScore,
            reading: readingScore,
            science: scienceScore,
            composite: compositeScore
        };
        localStorage.setItem("actScoreHistory", JSON.stringify(scoreHistory));

        saveTestCompletion("ACT");

        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `
            <p><strong>English ACT Score:</strong> ${englishScore} / 36</p>
            <p><strong>Math ACT Score:</strong> ${mathScore} / 36</p>
            <p><strong>Reading ACT Score:</strong> ${readingScore} / 36</p>
            <p><strong>Science ACT Score:</strong> ${scienceScore} / 36</p>
            <p><strong>Composite ACT Score:</strong> ${compositeScore} / 36</p>`;
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
                case "english": endEnglishSection(); break;
                case "math": endMathSection(); break;
                case "reading": endReadingSection(); break;
                case "science": endScienceSection(); break;
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
        questionElement.innerHTML = "This is an untimed ACT Test. Complete each section at your own pace.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startEnglishSection();
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
                case "english": startMathSection(); break;
                case "math": startReadingSection(); break;
                case "reading": startScienceSection(); break;
                case "science": showFinalScore(); break;
            }
        });
    } else {
        console.error("continue-btn element not found");
    }

    showIntroMessage();
});