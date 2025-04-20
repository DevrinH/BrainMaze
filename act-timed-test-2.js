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

    // Sample questions (replace with full question banks)
    const englishQuestions = [
        ///Passage 1
        
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
                category: "conventions-of-standard-english"
            },

            
            
        
        
    ];

    const mathQuestions = [
        // Medium Difficulty (Q21–Q40)
        {   
            question: "What is the value of x in the equation 3x + 7 = 22?",
            answers: [
                { "text": "4", "correct": false },
                { "text": "5", "correct": true },
                { "text": "6", "correct": false },
                { "text": "7", "correct": false }
            ],
            difficulty: "medium",
            category: "Algebra",
            passage: ""
        },

    
    ];
    const readingQuestions = [   
        {
        passage: "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        question: "What is the primary reason Clara is drawn to the house on Maple Street?",
        "answers": [
          { "text": "A) She wants to prove the house is haunted.", "correct": false },
          { "text": "B) She is researching Eliza Hawthorne’s life.", "correct": true },
          { "text": "C) She plans to renovate the property.", "correct": false },
          { "text": "D) She is following a family tradition.", "correct": false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "main idea"
      },

    ];


    const scienceQuestions = [          
        
        {
        passage: "A group of scientists conducted experiments to study the effects of temperature and pH on the enzymatic activity of amylase, an enzyme that breaks down starch into glucose. They measured the rate of glucose production (in micromoles per minute) under various conditions. Experiment 1 tested the enzyme's activity at pH 7 across five temperatures: 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested the enzyme's activity at 37°C across five pH levels: 5, 6, 7, 8, and 9. The results are shown in Figures 1 and 2.\n\n**Figure 1: Glucose Production Rate vs. Temperature (pH 7)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 5 µmol/min\n\n**Figure 2: Glucose Production Rate vs. pH (37°C)**\n- pH 5: 15 µmol/min\n- pH 6: 30 µmol/min\n- pH 7: 40 µmol/min\n- pH 8: 35 µmol/min\n- pH 9: 20 µmol/min",
        question: "Based on Figure 1, at which temperature does amylase exhibit the highest enzymatic activity at pH 7?",
        answers: [
            { "text": "A) 20°C", "correct": false },
            { "text": "B) 40°C", "correct": true },
            { "text": "C) 50°C", "correct": false },
            { "text": "D) 60°C", "correct": false }
        ],
        type: "science",
        difficulty: "medium",
        category: "data representation"
    },


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

    function startEnglishSection() {
        currentSection = "english";
        time = 45 * 60;
        userResponses = [];
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endEnglishSection, 2700000);
        startQuiz(englishQuestions); // Removed 25, 25, 25
    }
    
    function startMathSection() {
        currentSection = "math";
        time = 60 * 60; // 60 minutes
        userResponses = [];
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endMathSection, 3600000);
        startQuiz(mathQuestions);
    }
    
    function startReadingSection() {
        currentSection = "reading";
        time = 35 * 60;
        userResponses = [];
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endReadingSection, 2100000);
        passageElement.innerHTML = "";
        startQuiz(readingQuestions);
    }
    
    function startScienceSection() {
        currentSection = "science";
        time = 35 * 60;
        userResponses = [];
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
    }

    function endMathSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endReadingSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endScienceSection() {
        clearInterval(refreshIntervalId);
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
        score = 0;
        correctAnswers = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";
    
        document.querySelector(".question-row").classList.remove("score-display");
    
        showQuestion();
    }
    


    function showQuestion() {
        resetState();
        let currentQuestion = selectedQuestions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        passageElement.innerHTML = currentQuestion.passage; // Revert to exact old code
        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    
        currentQuestion.answers.forEach(answer => {
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
    
        // Safeguard against undefined passage or question
        const safePassage = currentQuestion.passage || "No passage provided";
        const safeQuestion = currentQuestion.question || "No question provided";
        userResponses.push({
            question: safePassage + "<br/><br/>" + safeQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        });
    
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
    
        // Apply vertical layout for Math section even in score display
        if (currentSection === "math") {
            questionRow.classList.add("vertical-layout");
        }
    
        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
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


    function showExplanations() {
        console.log("Entering showExplanations");
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "<h2>Review of Incorrect Answers</h2>";
        questionElement.style.overflowY = "scroll";
        questionElement.style.maxHeight = "80vh";
    
        const incorrectResponses = userResponses.filter(response => !response.wasCorrect);
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);
    
        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            incorrectResponses.forEach((response, index) => {
                console.log("Processing response:", index, response);
                const div = document.createElement("div");
                div.className = "explanation";
                div.innerHTML = `
                    <h3>Question ${index + 1}</h3>
                    <p><strong>Question:</strong> ${response.question || "Missing question"}</p>
                    <p><strong>Your Answer:</strong> ${response.userAnswer || "N/A"}</p>
                    <p><strong>Correct Answer:</strong> ${response.correctAnswer || "N/A"}</p>
                    <p><strong>Explanation:</strong> ${generateExplanation(response)}</p>
                `;
                fragment.appendChild(div);
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
            window.location.href = "https://www.brainjelli.com/user-profile";
        });
    }



    function generateExplanation(response) {
        const questionText = response.question || "";
    
        // ACT Math Questions
        // Medium Difficulty
        if (questionText.includes("What is the value of x in the equation 3x + 7 = 22?")) {
            return "Solve 3x + 7 = 22 by subtracting 7: 3x = 15. Divide by 3: x = 5. Option B) 5 is correct. A) 4, C) 6, and D) 7 do not satisfy the equation.";
        } else if (questionText.includes("If f(x) = x^2 + 3x - 4, what is f(2)?")) {
            return "Substitute x = 2 into f(x) = x^2 + 3x - 4: f(2) = 2^2 + 3(2) - 4 = 4 + 6 - 4 = 6. Option C) 6 is correct. A) 8, B) 4, and D) 10 are incorrect calculations.";
        } else if (questionText.includes("What is the slope of the line passing through points (1, 2) and (3, 6)?")) {
            return "Use the slope formula (y2 - y1)/(x2 - x1): (6 - 2)/(3 - 1) = 4/2 = 2. Option A) 2 is correct. B) 1, C) 3, and D) 4 miscalculate the slope.";
        } else if (questionText.includes("Solve the system of equations: y = 2x + 1, y = x + 5.")) {
            return "Set 2x + 1 = x + 5. Subtract x: x + 1 = 5. Subtract 1: x = 4. Substitute x = 4 into y = x + 5: y = 9. Option D) x = 4, y = 9 is correct. Others do not satisfy both equations.";
        } else if (questionText.includes("What is the area of a triangle with base 8 and height 5?")) {
            return "Use the formula Area = (1/2)bh: (1/2)(8)(5) = 20. Option B) 20 is correct. A) 40, C) 16, and D) 24 misapply the formula.";
        } else if (questionText.includes("If sin(θ) = 3/5 and θ is in quadrant I, what is cos(θ)?")) {
            return "Use sin^2(θ) + cos^2(θ) = 1: (3/5)^2 + cos^2(θ) = 1. So, 9/25 + cos^2(θ) = 1, cos^2(θ) = 16/25, cos(θ) = 4/5 (positive in quadrant I). Option C) 4/5 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the value of x if 2x^2 - 8 = 0?")) {
            return "Solve 2x^2 - 8 = 0: 2x^2 = 8, x^2 = 4, x = ±2. ACT typically asks for the positive root: x = 2. Option D) 2 is correct. A) 4, B) 1, and C) 3 are not solutions.";
        } else if (questionText.includes("A rectangle has a perimeter of 20 and a length of 7. What is its width?")) {
            return "Perimeter = 2(l + w). Given P = 20, l = 7: 2(7 + w) = 20, 14 + 2w = 20, 2w = 6, w = 3. Option A) 3 is correct. B) 4, C) 5, and D) 6 do not fit.";
        } else if (questionText.includes("What is the distance between points (2, 3) and (5, 7)?")) {
            return "Use the distance formula √[(x2 - x1)^2 + (y2 - y1)^2]: √[(5-2)^2 + (7-3)^2] = √[9 + 16] = √25 = 5. Option B) 5 is correct. Others are incorrect.";
        } else if (questionText.includes("If 3x - 5 = 7, what is the value of 6x - 10?")) {
            return "Solve 3x - 5 = 7: 3x = 12, x = 4. Then, 6x - 10 = 6(4) - 10 = 14. Option C) 14 is correct. A) 12, B) 16, and D) 18 miscalculate.";
        } else if (questionText.includes("What is the value of tan(30°)?")) {
            return "For 30°, tan = sin/cos = (√3/2)/(1/2) = √3/3. Option B) √3/3 is correct. A) √3, C) 1/2, and D) 2/√3 are incorrect.";
        } else if (questionText.includes("Solve for x: x^2 - 5x + 6 = 0.")) {
            return "Factor x^2 - 5x + 6 = (x-2)(x-3) = 0. Solutions: x = 2, 3. Option D) x = 2, 3 is correct. Others do not solve the equation.";
        } else if (questionText.includes("What is the midpoint of the segment connecting (1, 1) and (5, 7)?")) {
            return "Midpoint = ((x1 + x2)/2, (y1 + y2)/2): ((1+5)/2, (1+7)/2) = (3, 4). Option A) (3, 4) is correct. Others are incorrect.";
        } else if (questionText.includes("If a circle has a radius of 4, what is its circumference?")) {
            return "Circumference = 2πr = 2π(4) = 8π. Option C) 8π is correct. A) 4π, B) 16π, and D) 12π miscalculate.";
        } else if (questionText.includes("What is the solution to the inequality 2x + 3 > 7?")) {
            return "Solve 2x + 3 > 7: 2x > 4, x > 2. Option D) x > 2 is correct. A) x > 3, B) x < 2, and C) x < 3 are incorrect.";
        } else if (questionText.includes("If f(x) = 2x + 1, what is f(f(1))?")) {
            return "First, f(1) = 2(1) + 1 = 3. Then, f(3) = 2(3) + 1 = 7. Option A) 7 is correct. B) 5, C) 9, and D) 3 are incorrect.";
        } else if (questionText.includes("What is the area of a circle with diameter 10?")) {
            return "Radius = diameter/2 = 5. Area = πr^2 = π(5)^2 = 25π. Option B) 25π is correct. A) 50π, C) 100π, and D) 10π miscalculate.";
        } else if (questionText.includes("Solve for x: 4x - 3 = 2x + 7.")) {
            return "Subtract 2x: 2x - 3 = 7. Add 3: 2x = 10, x = 5. Option C) 5 is correct. A) 4, B) 6, and D) 3 do not solve the equation.";
        } else if (questionText.includes("What is the value of cos(60°)?")) {
            return "For 60°, cos = 1/2. Option D) 1/2 is correct. A) √3/2, B) 1/√2, and C) √2/2 are incorrect.";
        } else if (questionText.includes("What is the vertex of the parabola y = x^2 - 4x + 3?")) {
            return "Vertex x-coordinate: -b/(2a) = -(-4)/(2(1)) = 2. Substitute x = 2: y = 2^2 - 4(2) + 3 = -1. Vertex: (2, -1). Option B) (2, -1) is correct. Others are incorrect.";
        
    
        }
        
    
        return "No explanation available for this question.";
    }

    
    function handleNextButton() {
        recordTestResults();
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    function updateProgressBar() {
        const progressBar = document.getElementById("progress-bar-test");
        let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
        progressBar.firstElementChild.style.width = progress + "%";
    }

    function recordTestResults() {
        let storedResults = localStorage.getItem("actResults");
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

        localStorage.setItem("actResults", JSON.stringify(results));

        for (let category in categoryStats) {
            categoryStats[category].correct = 0;
            categoryStats[category].incorrect = 0;
        }
    }

    function showIntroMessage() {
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "This is a timed ACT Test. English: 45 min, Math: 60 min, Reading: 35 min, Science: 35 min.";
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
                case "english": startMathSection(); break;
                case "math": startReadingSection(); break;
                case "reading": startScienceSection(); break;
                case "science": showFinalScore(); break;
            }
        });
    } else {
        console.error("continue-btn element not found");
    }
});