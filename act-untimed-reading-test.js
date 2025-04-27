document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const actIntroContainer = document.getElementById("act-intro-container");
    const startTestButton = document.getElementById("start-test-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let results = localStorage.getItem("actResults");
    results = results ? JSON.parse(results) : {};
    let readingResponses = [];
    let readingScore = 0;
    const currentSection = "reading";

// Reading question bank (unchanged)
const readingQuestions = [  
    {
    "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
    "question": "What is the primary reason Clara is drawn to the house on Maple Street?",
    "answers": [
      { "text": "A) She wants to prove the house is haunted.", "correct": false },
      { "text": "B) She is researching Eliza Hawthorne’s life.", "correct": true },
      { "text": "C) She plans to renovate the property.", "correct": false },
      { "text": "D) She is following a family tradition.", "correct": false }
    ],
    "type": "reading",
    "difficulty": "medium",
    "category": "main idea"
  },
  {
    "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
    "question": "The description of the house in the first paragraph primarily serves to:",
    "answers": [
      { "text": "A) highlight Clara’s bravery in entering it.", "correct": false },
      { "text": "B) establish a mysterious and foreboding atmosphere.", "correct": true },
      { "text": "C) contrast with Clara’s modern lifestyle.", "correct": false },
      { "text": "D) suggest the house’s historical significance.", "correct": false }
    ],
    "type": "reading",
    "difficulty": "medium",
    "category": "author’s purpose"
  },
];

    function startTest() {
        if (!actIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        actIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startReadingSection();
    }

    function startReadingSection() {
        readingResponses = [];
        score = 0;
        correctAnswers = 0;
        startQuiz(readingQuestions);
    }

    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for Reading section");
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0) {
            console.warn(`Warning: ${missingPassages.length} questions in Reading lack a valid passage`);
        }
        currentQuestionIndex = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        // Reset layout classes
        document.querySelector(".question-row").classList.remove("score-display");

        // Add section-specific class
        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("reading-section");
        questionRow.classList.add("reading-section");

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
        console.log(`Displaying question ${questionNo} in Reading, passage:`, currentQuestion.passage || "No passage");
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
            section: "reading",
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        };

        readingResponses.push(response);

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
        resetState();

        // Calculate Reading score
        let maxPossibleScore = (25 * 1) + (25 * 2) + (25 * 3); // Assume 75 questions
        let rawScore = score;
        readingScore = Math.round((rawScore / maxPossibleScore) * 35 + 1);

        // Store score in localStorage
        localStorage.setItem("readingScore", readingScore);

        // Update score history
        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("actScoreHistory")) || {};
        scoreHistory[today] = { reading: readingScore };
        localStorage.setItem("actScoreHistory", JSON.stringify(scoreHistory));

        // Save test completion metadata
        saveTestCompletion("ACT");

        // Update UI
        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>Reading ACT Score:</strong> ${readingScore} / 36</p>`;
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

        const incorrectResponses = readingResponses.filter(
            response => response && response.wasCorrect === false
        );
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sectionDiv = document.createElement("div");
            sectionDiv.innerHTML = "<h3>Reading Section</h3>";
            incorrectResponses.forEach((response, index) => {
                console.log(`Processing Reading response ${index + 1}:`, response);
                const explanation = generateExplanation(response);
                console.log(`Explanation for Reading response ${index + 1}:`, explanation);
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
        return "No explanation available for this question.";
    }

    function handleNextButton() {
        recordTestResults();
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showFinalScore();
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
        questionElement.innerHTML = "This is an untimed ACT Reading Test. Complete the section at your own pace.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startReradingSection();
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