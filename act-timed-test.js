document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const countdownEl = document.getElementById("countdown");
    const actIntroContainer = document.getElementById("act-intro-container");
    const startTestButton = document.getElementById("start-test-btn");
    const continueButton = document.getElementById("continue-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let results = localStorage.getItem("actResults");
    results = results ? JSON.parse(results) : {};
    let refreshIntervalId;
    let time;
    let userResponses = [];
    let currentSection = "english";
    let categoryScores = {};

    // Section-specific responses
    let englishResponses = [];
    let mathResponses = [];
    let readingResponses = [];
    let scienceResponses = [];

    // Sample questions (replace with full question banks)
    const englishQuestions = [
        {
            passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
            question: "Which punctuation corrects the sentence 'Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass'?",
            answers: [
                { text: "A) Aisha the team’s coder had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                { text: "B) Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: true },
                { text: "C) Aisha the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                { text: "D) Aisha, the team’s coder had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false }
            ],
            type: "english",
            difficulty: "easy",
            category: "act-conventions-of-standard-english"
        },
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
            difficulty: "medium",
            category: "act-algebra"
        },
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
            category: "act-functions"
        },
    ];

    const readingQuestions = [
        {
            passage: "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it Ascotia, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
            question: "What is the primary reason Clara is drawn to the house on Maple Street?",
            answers: [
                { text: "A) She wants to prove the house is haunted.", correct: false },
                { text: "B) She is researching Eliza Hawthorne’s life.", correct: true },
                { text: "C) She plans to renovate the property.", correct: false },
                { text: "D) She is following a family tradition.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "act-main-idea"
        },
    ];

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
    ];

    function startTest() {
        if (!actIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        // Reset actTestResults at the start of a new test
        localStorage.removeItem("actTestResults");
        console.log("Cleared actTestResults from localStorage at the start of a new test");
        actIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startEnglishSection();
    }

    function startEnglishSection() {
        currentSection = "english";
        time = 45 * 60;
        englishResponses = [];
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endEnglishSection, 2700000);
        startQuiz(englishQuestions);
    }

    function startMathSection() {
        currentSection = "math";
        time = 60 * 60;
        mathResponses = [];
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endMathSection, 3600000);
        startQuiz(mathQuestions);
    }

    function startReadingSection() {
        currentSection = "reading";
        time = 35 * 60;
        readingResponses = [];
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endReadingSection, 2100000);
        passageElement.innerHTML = "";
        startQuiz(readingQuestions);
    }

    function startScienceSection() {
        currentSection = "science";
        time = 35 * 60;
        scienceResponses = [];
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endScienceSection, 2100000);
        passageElement.innerHTML = "";
        startQuiz(scienceQuestions);
    }

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        if (time === 0) {
            clearInterval(refreshIntervalId);
            switch (currentSection) {
                case "english": endEnglishSection(); break;
                case "math": endMathSection(); break;
                case "reading": endReadingSection(); break;
                case "science": endScienceSection(); break;
            }
        } else {
            time--;
        }
    }

    function endEnglishSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
        categoryStats = {}; // Reset at the end of the section
    }

    function endMathSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
        categoryStats = {}; // Reset at the end of the section
    }

    function endReadingSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
        categoryStats = {}; // Reset at the end of the section
    }

    function endScienceSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showFinalScore();
        categoryStats = {}; // Reset at the end of the section
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
        score = 0;
        correctAnswers = 0;
        categoryStats = {}; // Reset categoryStats at the start of a new section
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

    function recordTestResults() {
        let storedResults = localStorage.getItem("actTestResults");
        let results = storedResults ? JSON.parse(storedResults) : {};

        if (typeof results !== "object" || Array.isArray(results)) {
            results = {};
        }

        // Update actTestResults with the current categoryStats
        for (let category in categoryStats) {
            if (!results[category]) {
                results[category] = { correct: 0, incorrect: 0 };
            }

            results[category].correct = (results[category].correct || 0) + (categoryStats[category].correct || 0);
            results[category].incorrect = (results[category].incorrect || 0) + (categoryStats[category].incorrect || 0);
        }

        localStorage.setItem("actTestResults", JSON.stringify(results));
        console.log("Updated actTestResults:", results);
    }

    function showScore() {
        clearInterval(refreshIntervalId);
        resetState();

        let maxPossibleScore;
        switch (currentSection) {
            case "english": maxPossibleScore = (25 * 1) + (25 * 2) + (25 * 3); break;
            case "math": maxPossibleScore = (20 * 1) + (20 * 2) + (20 * 3); break;
            case "reading": case "science": maxPossibleScore = (13 * 1) + (14 * 2) + (13 * 3); break;
        }
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 35 + 1);

        document.getElementById("question-container").classList.remove("hide");

        localStorage.setItem(currentSection + "Score", scaledScore);
        passageElement.innerHTML = "";
        questionElement.innerHTML = `${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} ACT Score: ${scaledScore} / 36`;
        questionElement.classList.add("centered-score");

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.add("score-display");

        if (currentSection === "math") {
            questionRow.classList.add("vertical-layout");
        }

        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
    }

    function saveTestResults(examType, progressKey, testResults) {
        console.log(`Saving ${examType} test results...`);

        let storedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
        let previousProgress = JSON.parse(localStorage.getItem("previousTestResults")) || {};

        Object.keys(testResults).forEach(category => {
            if (!storedProgress[category]) {
                storedProgress[category] = { correct: 0, incorrect: 0 };
            }
            storedProgress[category].correct += Number(testResults[category]?.correct || 0);
            storedProgress[category].incorrect += Number(testResults[category]?.incorrect || 0);
        });

        Object.keys(storedProgress).forEach(category => {
            const correct = storedProgress[category].correct;
            const incorrect = storedProgress[category].incorrect;
            const total = correct + incorrect;
            const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
            previousProgress[category] = { percentage };
        });

        localStorage.setItem(progressKey, JSON.stringify(storedProgress));
        localStorage.setItem("testResults", JSON.stringify(testResults));
        localStorage.setItem("previousTestResults", JSON.stringify(previousProgress));
        localStorage.setItem("lastActivity", JSON.stringify({ exam: examType, type: "test", timestamp: Date.now() }));

        console.log(`${examType} Test Results Saved:`, testResults);
        console.log(`${examType} Updated Progress:`, storedProgress);
        console.log(`${examType} Updated Previous Progress:`, previousProgress);
    }

    function getCategoryResults() {
        return categoryStats;
    }

    function showFinalScore() {
        clearInterval(refreshIntervalId);
        resetState();

        let englishScore = parseInt(localStorage.getItem("englishScore") || 0, 10);
        let mathScore = parseInt(localStorage.getItem("mathScore") || 0, 10);
        let readingScore = parseInt(localStorage.getItem("readingScore") || 0, 10);
        let scienceScore = parseInt(localStorage.getItem("scienceScore") || 0, 10);
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

        const testResults = getCategoryResults();
        saveTestResults("ACT", "actProgress", testResults);

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
            ...englishResponses.map(r => ({ ...r, section: "english" })),
            ...mathResponses.map(r => ({ ...r, section: "math" })),
            ...readingResponses.map(r => ({ ...r, section: "reading" })),
            ...scienceResponses.map(r => ({ ...r, section: "science" }))
        ];

        const incorrectResponses = allResponses.filter(
            response => response && response.wasCorrect === false && response.section
        );
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sections = ["english", "math", "reading", "science"];
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
            setTimeout(() => {
                window.location.href = "user-profile.html";
            }, 100);
        });
    }

    function generateExplanation(response) {
        // Truncated for brevity as per request
        const questionText = response.question || "";
        if (questionText.includes("What is the value of x in the equation 3x + 7 = 22?")) {
            return "Solve 3x + 7 = 22 by subtracting 7: 3x = 15. Divide by 3: x = 5. Option B) 5 is correct. A) 4, C) 6, and D) 7 do not satisfy the equation.";
        } else if (questionText.includes("If f(x) = x^2 + 3x - 4, what is f(2)?")) {
            return "Substitute x = 2 into f(x) = x^2 + 3x - 4: f(2) = 2^2 + 3(2) - 4 = 4 + 6 - 4 = 6. Option C) 6 is correct. A) 8, B) 4, and D) 10 are incorrect calculations.";
        }
        return "No specific explanation available for this question.";
    }

    function updateProgressBar() {
        const progressBar = document.getElementById("progress-bar");
        const progressText = document.getElementById("progress-text");
        const progress = (currentQuestionIndex / selectedQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentQuestionIndex + 1} / ${selectedQuestions.length}`;
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    startTestButton.addEventListener("click", startTest);
    continueButton.addEventListener("click", () => {
        document.getElementById("break-message").classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        if (currentSection === "english") {
            startMathSection();
        } else if (currentSection === "math") {
            startReadingSection();
        } else if (currentSection === "reading") {
            startScienceSection();
        }
    });

    nextButton.addEventListener("click", handleNextButton);
});