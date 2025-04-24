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
    let englishResponses = [];
    const currentSection = "english";

    // English question bank (unchanged from original)
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
        time = 45 * 60; // 45 minutes in seconds
        englishResponses = []; // Reset English responses
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endEnglishSection, 2700000); // End after 45 minutes
        startQuiz(englishQuestions);
    }

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        if (time === 0) {
            clearInterval(refreshIntervalId);
            endEnglishSection();
        } else {
            time--;
        }
    }

    function endEnglishSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showFinalScore();
    }

    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for English section");
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0) {
            console.warn(`Warning: ${missingPassages.length} questions in English lack a valid passage`);
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
        questionRow.classList.remove("english-section");
        questionRow.classList.add("english-section");

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
        console.log(`Displaying question ${questionNo} in English, passage:`, currentQuestion.passage || "No passage");
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
            section: "english",
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        };

        englishResponses.push(response);

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

        let maxPossibleScore = (25 * 1) + (25 * 2) + (25 * 3); // Assuming 75 questions for scaling
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 35 + 1);

        document.getElementById("question-container").classList.remove("hide");

        localStorage.setItem("englishScore", scaledScore);

        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("actScoreHistory")) || {};
        scoreHistory[today] = { english: scaledScore };
        localStorage.setItem("actScoreHistory", JSON.stringify(scoreHistory));

        saveTestCompletion("ACT English");

        passageElement.innerHTML = "";
        questionElement.innerHTML = `<p><strong>English ACT Score:</strong> ${scaledScore} / 36</p>`;
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

        const incorrectResponses = englishResponses.filter(
            response => response && response.wasCorrect === false
        );
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sectionDiv = document.createElement("div");
            sectionDiv.innerHTML = "<h3>English Section</h3>";
            incorrectResponses.forEach((response, index) => {
                console.log(`Processing English response ${index + 1}:`, response);
                const explanation = generateExplanation(response);
                console.log(`Explanation for English response ${index + 1}:`, explanation);
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
 // ACT Math Questions
        // Medium Difficulty
        if (questionText.includes("What is the value of x in the equation 3x + 7 = 22?")) {
            return "Solve 3x + 7 = 22 by subtracting 7: 3x = 15. Divide by 3: x = 5. Option B) 5 is correct. A) 4, C) 6, and D) 7 do not satisfy the equation.";
        } else if (questionText.includes("If f(x) = x^2 + 3x - 4, what is f(2)?")) {
            return "Substitute x = 2 into f(x) = x^2 + 3x - 4: f(2) = 2^2 + 3(2) - 4 = 4 + 6 - 4 = 6. Option C) 6 is correct. A) 8, B) 4, and D) 10 are incorrect calculations.";
        } 
   
        // Set 2: Editorial Board Passage
         else if (questionText.includes("The editorial board gathered in a cramped office")) {
            if (questionText.includes("Which punctuation corrects the sentence 'The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest'?")) {
                return "Option B) adds a comma before 'but,' correctly joining independent clauses, while the colon introduces the fare increase detail. A) creates a run-on, C) misuses a semicolon, and D) retains the faulty structure.";
            } else if (questionText.includes("In the sentence 'Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class,' which phrase corrects the parallel structure?")) {
                return "Option C) uses consistent verb tenses ('juggles,' 'races') for parallelism. A) shifts tense incorrectly, B) mixes forms, and D) keeps the error.";
            } else if (questionText.includes("Which word should replace 'synthesizing' in 'Maya tapped her pen, synthesizing ideas' to improve clarity?")) {
                return "Option B) 'integrating' clearly conveys blending ideas. A) is too vague, C) implies evaluation, and D) keeps the less precise term.";
            } else if (questionText.includes("Which sentence best follows 'The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence' to emphasize Maya’s dedication?")) {
                return "Option C) highlights Maya’s focus on perfecting her work. A) is vague, B) shifts focus, and D) introduces an irrelevant detail.";
            } else if (questionText.includes("In the sentence 'Others hesitated, wary of alienating city officials,' which pronoun correctly replaces 'Others' for agreement with the subject?")) {
                return "Option B) 'Certain members' specifies the subject clearly. A) is vague, C) implies all, and D) retains the ambiguity.";
            } else if (questionText.includes("Which revision to 'The piece wasn’t flawless; it sidestepped some thorny budget details' best improves conciseness?")) {
                return "Option B) streamlines the sentence while retaining meaning. A) adds complexity, C) is abrupt, and D) keeps the wordier structure.";
            } else if (questionText.includes("Which punctuation corrects the sentence 'The room crackled with debate, voices rising over cold coffee'?")) {
                return "Option C) adds 'with' for clarity, linking the clauses. A) misuses a semicolon, B) misuses a colon, and D) lacks connection.";
            } else if (questionText.includes("Which transition phrase, inserted before 'Nods circled the table, though Jamal pushed for sharper phrasing,' best clarifies the contrast?")) {
                return "Option B) 'Despite this' highlights the contrast between agreement and Jamal’s dissent. A) suggests timing, C) implies example, and D) adds unrelated detail.";
            } else if (questionText.includes("Which revision to 'Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes' corrects a subtle verb tense error?")) {
                return "Option D) maintains the past tense 'argued,' consistent with the passage. A) shifts to present, B) overcorrects, and C) disrupts structure.";
            } else if (questionText.includes("Which phrase in 'It called for compromise—targeted fare relief funded by reallocated taxes' best replaces 'funded by' to enhance precision?")) {
                return "Option C) 'financed by' is precise for budgetary context. A) is vague, B) is informal, and D) keeps the less specific phrase.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier requiring correction?")) {
                return "Option D) is correct; no sentence has a misplaced modifier. A), B), and C) are properly structured.";
            } else if (questionText.includes("Which revision to 'The plan promised faster commutes but at a steep cost' best emphasizes the trade-off while maintaining tone?")) {
                return "Option A) balances benefits and burdens while matching tone. B) exaggerates, C) shifts tone, and D) lacks emphasis.";
            } else if (questionText.includes("In 'The editorial board gathered in a cramped office, papers strewn across the table,' which verb corrects the participle 'strewn' for agreement?")) {
                return "Option D) 'strewn' is correct as a past participle. A), B), and C) disrupt the tense or meaning.";
            } else if (questionText.includes("Which sentence best introduces the passage to clarify the board’s purpose?")) {
                return "Option D) clearly states the drafting goal. A) is redundant, B) shifts focus, and C) emphasizes leadership.";
            } else if (questionText.includes("Which sentence contains an error in parallel structure?")) {
                return "Option D) is correct; no sentence has a parallelism error. A), B), and C) maintain consistent structure.";
        }
   
        // Set 3: Garden Passage
        } else if (questionText.includes("The community garden bloomed with possibility")) {
            if (questionText.includes("Which punctuation corrects the sentence 'Rosa, the garden’s founder, had spent years planning beds, trellises, and compost bins'?")) {
                return "Option B) uses commas correctly for the appositive. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
            } else if (questionText.includes("Which word replaces 'bloomed' in 'The community garden bloomed with possibility, drawing neighbors together' to maintain tone?")) {
                return "Option A) 'flourished' keeps the hopeful tone. B) is neutral, C) is technical, and D) retains the original.";
            } else if (questionText.includes("Which pronoun corrects the agreement in 'Each volunteer brought their own tools to the garden'?")) {
                return "Option B) 'his or her' matches singular 'Each.' A) keeps the error, C) shifts number, and D) is incorrect.";
            } else if (questionText.includes("Which phrase replaces 'relying on' in 'The garden, relying on donations, thrived with vibrant crops' for clarity?")) {
                return "Option A) 'sustained by' is precise. B) is vague, C) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which revision combines 'The garden wasn’t perfect. Weeds crept in persistently' for better flow?")) {
                return "Option B) 'yet' links clauses smoothly. A) is choppy, C) misaligns logic, and D) shifts tone.";
            } else if (questionText.includes("Which revision to 'Skeptics wondered—could a small plot really unite the community?' maintains tone?")) {
                return "Option C) preserves the doubtful tone. A) is harsh, B) is formal, and D) keeps the original.";
            } else if (questionText.includes("Which punctuation corrects 'Spring arrived, the garden burst with color, but pests loomed'?")) {
                return "Option A) uses a semicolon for independent clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
            } else if (questionText.includes("Which sentence follows 'As harvest neared, cheers rose, though Rosa planned pest control tweaks' to emphasize effort?")) {
                return "Option C) highlights ongoing work. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
            } else if (questionText.includes("Which revision corrects the tense in 'Rosa stood by the gate, watching as volunteers plant seedlings'?")) {
                return "Option A) 'planted' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
            } else if (questionText.includes("Which revision to 'a symbol of grit and shared dreams' improves conciseness?")) {
                return "Option C) is succinct and clear. A) is wordy, B) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier?")) {
                return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
            } else if (questionText.includes("Which transition phrase before 'Neighbors shared tools, their laughter echoing,' clarifies unity?")) {
                return "Option B) 'As a result' shows connection. A) implies time, C) is an example, and D) shifts focus.";
            } else if (questionText.includes("Which phrase replaces 'despite early setbacks' in 'Crops grew strong, despite early setbacks' for precision?")) {
                return "Option C) 'though challenged' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
            } else if (questionText.includes("Which revision to 'Every failure taught them perseverance' emphasizes growth?")) {
                return "Option B) underscores learning. A) is vague, C) shifts focus, and D) keeps the original.";
            } else if (questionText.includes("Which sentence has an error in parallel structure?")) {
                return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
   
        // Set 4: Science Fair Passage
        } else if (questionText.includes("The gymnasium hummed with the energy of the science fair")) {
            if (questionText.includes("Which punctuation corrects the sentence 'Samir, the lead presenter, had tested his solar model for weeks, tweaking panels, and circuits'?")) {
                return "Option B) uses commas for the appositive and list. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
            } else if (questionText.includes("Which word replaces 'honed' in 'Students honed their projects, racing against the deadline' to maintain urgency?")) {
                return "Option A) 'refined' keeps the intense tone. B) is calm, C) is vague, and D) retains the original.";
            } else if (questionText.includes("Which pronoun corrects the agreement in 'Each student displayed their hypothesis proudly'?")) {
                return "Option B) 'his or her' matches singular 'Each.' A) keeps the error, C) shifts number, and D) is incorrect.";
            } else if (questionText.includes("Which phrase replaces 'built on' in 'The fair, built on months of effort, showcased innovation' for clarity?")) {
                return "Option A) 'driven by' is precise. B) is vague, C) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which revision combines 'The projects weren’t flawless. They impressed the judges' for flow?")) {
                return "Option B) 'yet' links clauses smoothly. A) is abrupt, C) misaligns logic, and D) shifts tone.";
            } else if (questionText.includes("Which revision to 'Judges murmured—could kids this young solve real problems?' maintains tone?")) {
                return "Option C) keeps the skeptical tone. A) is harsh, B) is formal, and D) retains the original.";
            } else if (questionText.includes("Which punctuation corrects 'The fair began, models whirred to life, but nerves lingered'?")) {
                return "Option A) uses a semicolon for clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
            } else if (questionText.includes("Which sentence follows 'As judging ended, cheers erupted, though Samir eyed his model’s flaws' to emphasize improvement?")) {
                return "Option C) highlights refinement. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
            } else if (questionText.includes("Which revision corrects the tense in 'Samir explained his model, hoping judges notice its efficiency'?")) {
                return "Option A) 'noticed' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
            } else if (questionText.includes("Which revision to 'a showcase of curiosity and bold ideas' improves conciseness?")) {
                return "Option C) is succinct and clear. A) is wordy, B) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier?")) {
                return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
            } else if (questionText.includes("Which transition phrase before 'Judges took notes, their faces unreadable,' clarifies contrast?")) {
                return "Option B) 'In contrast' highlights difference. A) implies time, C) is an example, and D) is causal.";
            } else if (questionText.includes("Which phrase replaces 'despite initial doubts' in 'Projects shone, despite initial doubts' for precision?")) {
                return "Option C) 'though questioned' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
            } else if (questionText.includes("Which revision to 'Every setback fueled their drive' emphasizes persistence?")) {
                return "Option B) underscores resilience. A) is vague, C) shifts focus, and D) keeps the original.";
            } else if (questionText.includes("Which sentence has an error in parallel structure?")) {
                return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
   
        // Set 5: Theater Passage
        } else if (questionText.includes("The theater troupe huddled backstage")) {
            if (questionText.includes("Which punctuation corrects the sentence 'The troupe’s director, Elena Vasquez, had spent weeks perfecting the lighting cues, sound levels, and actors’ blocking'?")) {
                return "Option B) correctly uses commas for the appositive. A) lacks commas, C) misplaces a comma, and D) omits punctuation.";
            } else if (questionText.includes("Which word replaces 'huddled' in 'The theater troupe huddled backstage, nerves fraying as the clock ticked closer to curtain' to maintain tone?")) {
                return "Option A) 'gathered' preserves the anxious tone. B) is too casual, C) too formal, and D) keeps the original.";
            } else if (questionText.includes("Which pronoun corrects the agreement error in 'Each actor checked their costume, ensuring no detail was overlooked'?")) {
                return "Option B) 'his or her' matches singular 'Each.' A) retains the error, C) shifts number, and D) is incorrect.";
            } else if (questionText.includes("Which phrase replaces 'relying on' in 'The production, relying on a shoestring budget, still dazzled with creative sets' for precision?")) {
                return "Option A) 'operating with' clarifies the budget constraint. B) is vague, C) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which revision best combines 'The play wasn’t flawless. It captivated the audience' to improve flow?")) {
                return "Option B) 'yet' smoothly contrasts flaws and success. A) is abrupt, C) misaligns logic, and D) shifts tone.";
            } else if (questionText.includes("Which revision to 'Critics scribbled notes—would this scrappy troupe pull it off?' maintains the passage’s tone?")) {
                return "Option C) preserves the skeptical tone. A) is too harsh, B) too formal, and D) keeps the original.";
            } else if (questionText.includes("Which punctuation corrects 'Opening night had arrived, the troupe was ready, but jittery'?")) {
                return "Option A) uses a semicolon for independent clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
            } else if (questionText.includes("Which sentence best follows 'As the curtain fell, applause erupted, though Elena already planned tweaks for tomorrow’s show' to emphasize refinement?")) {
                return "Option C) highlights ongoing improvements. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
            } else if (questionText.includes("Which revision corrects the verb tense in 'Elena stood in the wings, watching as the actors deliver their lines'?")) {
                return "Option A) 'delivered' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
            } else if (questionText.includes("Which revision to 'a testament to raw talent and stubborn grit' enhances conciseness?")) {
                return "Option C) streamlines without losing impact. A) is wordy, B) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier?")) {
                return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
            } else if (questionText.includes("Which transition phrase, inserted before 'The actors hit their marks, their voices steady despite the stakes,' clarifies the contrast?")) {
                return "Option B) 'Even so' highlights resilience. A) implies sequence, C) is irrelevant, and D) shifts focus.";
            } else if (questionText.includes("Which phrase replaces 'despite first-night jitters' in 'The actors moved with confidence, despite first-night jitters' for precision?")) {
                return "Option C) 'though nervous' is concise and clear. A) is wordy, B) shifts tone, and D) keeps the original.";
            } else if (questionText.includes("Which revision to 'Every prop malfunction taught them resilience' emphasizes learning?")) {
                return "Option B) underscores growth through setbacks. A) is vague, C) shifts focus, and D) keeps the original.";
            } else if (questionText.includes("Which sentence has an error in parallel structure?")) {
                return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
       // Set 6: Robotics Passage
        } else if (questionText.includes("The community center buzzed with anticipation as the robotics team")) {
            if (questionText.includes("Which punctuation corrects the sentence 'Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass'?")) {
                return "Option B) correctly uses commas for the appositive. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
            } else if (questionText.includes("Which word replaces 'addressing' in 'Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem' to maintain verb tense consistency?")) {
                return "Option A) 'addressed' aligns with past tense. B) shifts tense, C) is future, and D) is incorrect.";
            } else if (questionText.includes("Which pronoun corrects the agreement error in 'The team knew the stakes: a win could fund a town-wide recycling program'?")) {
                return "Option B) 'its' matches singular 'team.' A) is plural, C) shifts subject, and D) keeps the error.";
            } else if (questionText.includes("Which phrase replaces 'based on' in 'Leo, an engineering whiz, designed a claw that adjusted its grip based on material density' to improve clarity?")) {
                return "Option A) 'depending on' is clearer. B) shifts meaning, C) is wordy, and D) keeps the original.";
            } else if (questionText.includes("Which revision best combines 'Their robot wasn’t perfect; glass sorting still lagged behind plastic' to improve flow?")) {
                return "Option B) 'as' links clauses smoothly. A) is abrupt, C) shifts logic, and D) is causal.";
            } else if (questionText.includes("Which revision to 'Critics in the audience murmured—could a high school team really tackle such a complex issue?' best maintains the passage’s tone?")) {
                return "Option C) keeps the doubtful tone. A) is informal, B) is formal, and D) retains the original.";
            } else if (questionText.includes("Which punctuation corrects 'Early prototypes had faltered; one memorably scattered cans across the lab'?")) {
                return "Option A) uses a comma for clarity. B) misuses a colon, C) is incorrect, and D) keeps the original.";
            } else if (questionText.includes("Which sentence best follows 'As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration' to emphasize persistence?")) {
                return "Option C) underscores continued effort. A) shifts focus, B) is irrelevant, and D) is vague.";
            } else if (questionText.includes("Which revision corrects the verb tense in 'Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates'?")) {
                return "Option A) 'had exchanged' matches past context. B) shifts tense, C) is incorrect, and D) keeps the error.";
            } else if (questionText.includes("Which revision to 'a spark of innovation born from late-night pizza and stubborn hope' enhances conciseness?")) {
                return "Option C) is succinct and clear. A) is vague, B) loses impact, and D) keeps the original.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier?")) {
                return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
            } else if (questionText.includes("Which transition phrase, inserted before 'The judges, however, scribbled notes, their expressions unreadable,' clarifies the contrast?")) {
                return "Option B) 'In contrast' highlights the difference. A) implies time, C) is an example, and D) is causal.";
            } else if (questionText.includes("Which phrase replaces 'despite her nerves' in 'The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves' for precision?")) {
                return "Option C) 'though anxious' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
            } else if (questionText.includes("Which revision to 'Yet each failure fueled their resolve' emphasizes resilience?")) {
                return "Option B) 'bolstered tenacity' emphasizes strength. A) is wordy, C) is vague, and D) keeps the original.";
            } else if (questionText.includes("Which sentence has an error in parallel structure?")) {
                return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
            }
                // Set 7: Maple Street House Passage
    } else if (questionText.includes("The old house on Maple Street stood at the edge of town")) {
        if (questionText.includes("What is the primary reason Clara is drawn to the house on Maple Street?")) {
            return "The passage states Clara spent months researching Eliza Hawthorne’s life, indicating her primary motivation. Option B) She is researching Eliza Hawthorne’s life is correct. A) is incorrect as Clara seeks history, not ghosts; C) lacks evidence of renovation plans; D) misinterprets her grandmother’s vague connection.";
        } else if (questionText.includes("The description of the house in the first paragraph primarily serves to:")) {
            return "The first paragraph’s vivid imagery (e.g., ‘weathered clapboards,’ ‘ivy clinging’) creates a mysterious tone. Option B) establish a mysterious and foreboding atmosphere is correct. A) overemphasizes Clara’s bravery; C) lacks contrast with her lifestyle; D) is secondary to the mood.";
        } else if (questionText.includes("What can be inferred about Eliza Hawthorne’s relationship with the townsfolk?")) {
            return "Eliza’s journal notes the town branded her eccentric, implying misunderstanding. Option B) They misunderstood her and viewed her as eccentric is correct. A) lacks evidence of poetry admiration; C) contradicts her isolation; D) is unsupported.";
        } else if (questionText.includes("Why does Clara feel an ache while reading Eliza’s journal?")) {
            return "The passage links Clara’s ache to empathizing with Eliza and reflecting on her own life’s search for meaning. Option B) She empathizes with Eliza and reflects on her own life is correct. A) misreads physical discomfort; C) ignores emotional context; D) lacks evidence of fear.";
        } else if (questionText.includes("The phrase ‘heart’s truth’ in the second paragraph most likely refers to:")) {
            return "The context of Eliza’s letter and hidden room suggests ‘heart’s truth’ refers to her personal writings. Option C) Eliza’s most personal writings is correct. A) is too narrow; B) misinterprets the room itself; D) lacks evidence of treasure.";
        } else if (questionText.includes("How does the author use the setting of the hidden room to develop Clara’s character?")) {
            return "The hidden room’s journals and chair facing the garden mirror Clara’s introspective search, connecting her to Eliza. Option C) It emphasizes her connection to Eliza’s introspective nature is correct. A) lacks fear evidence; B) is secondary; D) contradicts her curiosity.";
        } else if (questionText.includes("What does the final entry in Eliza’s journal suggest about her intentions?")) {
            return "The entry ‘I leave them to the one who seeks’ implies Eliza wanted her work found by someone curious. Option B) She wanted her work to be discovered by someone curious is correct. A) lacks evidence of leaving town; C) contradicts preservation; D) is unsupported.";
        } else if (questionText.includes("The whisper Clara hears in the final paragraph most likely symbolizes:")) {
            return "The whisper, tied to Clara’s discovery, suggests Eliza’s spirit urging preservation. Option D) Eliza’s spirit encouraging her to preserve the journals is correct. A) misattributes to grandmother; B) is too vague; C) ignores Eliza’s connection.";
        } else if (questionText.includes("How does the author’s use of sensory details, such as the ‘groaning floorboards’ and ‘brittle pages,’ contribute to the passage’s tone?")) {
            return "Sensory details like ‘groaning floorboards’ and ‘brittle pages’ enhance the eerie, suspenseful mood. Option B) They enhance the eerie and suspenseful mood is correct. A) misreads nostalgia; C) overemphasizes discomfort; D) is too literal.";
        } else if (questionText.includes("What is the significance of the contrast between Clara’s actions and the townsfolk’s perceptions of the house?")) {
            return "Clara’s investigation challenges the townsfolk’s haunted view, suggesting her findings could reshape beliefs. Option C) It suggests Clara’s investigation will alter the town’s beliefs is correct. A) is partial; B) overstates courage; D) contradicts her discoveries.";
        } else if (questionText.includes("Based on the passage, how does Clara’s discovery of the hidden room reflect the broader theme of uncovering hidden truths?")) {
            return "Clara’s persistent search for the hidden room shows truths require effort to uncover. Option A) It shows that truths are often inaccessible without persistence is correct. B) lacks danger evidence; C) contradicts her pursuit; D) overstates supernatural ties.";
        } else if (questionText.includes("The passage’s structure, moving from Clara’s research to her discovery in the hidden room, serves to:")) {
            return "The structure builds suspense and parallels Clara’s growing understanding. Option A) build suspense and mirror Clara’s journey of understanding is correct. B) lacks clear contrast; C) misplaces focus on the house; D) is secondary.";


    // Set 8: Chicago School of Sociology Passage


    }} else if (questionText.includes("In the early 20th century, the Chicago School of Sociology emerged")) {
        if (questionText.includes("What was the primary focus of the Chicago School of Sociology’s approach to studying cities?")) {
            return "The passage emphasizes the Chicago School’s view of cities as shaped by local social processes like competition and segregation. Option B) Examining local social processes like competition and segregation is correct. A) reflects the Los Angeles School; C) is not mentioned; D) is unrelated to their focus.";
        } else if (questionText.includes("The concentric zone model described in the passage primarily aimed to explain:")) {
            return "The passage describes the concentric zone model as outlining distinct social and economic functions in urban zones. Option A) The distribution of social and economic functions in urban areas is correct. B) is too specific; C) is a secondary effect; D) misinterprets the model’s purpose.";
        } else if (questionText.includes("What was a key method used by Chicago School researchers to study urban life?")) {
            return "The passage highlights interviewing residents and mapping neighborhoods as key methods. Option B) Interviewing residents and mapping neighborhoods is correct. A) is not mentioned; C) is less emphasized; D) is unsupported.";
        } else if (questionText.includes("What was one criticism of the Chicago School’s concentric zone model mentioned in the passage?")) {
            return "The passage notes critics argued the model ignored cultural and historical factors. Option C) It oversimplified urban dynamics by ignoring cultural factors is correct. A) is unrelated; B) is incorrect; D) is not a cited criticism.";
        } else if (questionText.includes("The passage suggests that the Chicago School’s influence persisted despite criticism because:")) {
            return "The passage credits the Chicago School’s lasting impact to its observational methods influencing modern sociology. Option A) Its methods of observation shaped modern sociological practices is correct. B) overstates accuracy; C) is false; D) misrepresents the debate.";
        } else if (questionText.includes("The phrase ‘natural’ social processes in the passage most likely refers to:")) {
            return "The passage links ‘natural’ processes to social interactions like competition and assimilation. Option B) Organic social interactions like competition and assimilation is correct. A) refers to policy; C) misinterprets ecology; D) is unrelated.";
        } else if (questionText.includes("How did the Chicago School’s research methods differ from those of the Los Angeles School, as described in the passage?")) {
            return "The passage contrasts Chicago’s local observations with Los Angeles’s focus on global economic forces. Option A) Chicago School focused on local observations, while Los Angeles School emphasized global economic trends is correct. B) misstates methods; C) is incorrect; D) reverses approaches.";
        } else if (questionText.includes("What does the passage imply about the role of the Chicago School’s research in urban planning during the 1920s?")) {
            return "The passage states the concentric zone model guided planners dealing with industrialization and immigration. Option D) It guided planners addressing industrialization and immigration is correct. A) contradicts the passage; B) is too vague; C) is unsupported.";
        } else if (questionText.includes("The passage’s description of cities as ‘living organisms’ primarily serves to:")) {
            return "The ‘living organisms’ metaphor underscores the Chicago School’s view of cities as dynamic, adaptive systems. Option D) Illustrate the Chicago School’s view of cities as complex, changing systems is correct. A) is too literal; B) is partial; C) contradicts human influence.";
        } else if (questionText.includes("How does the passage’s structure, moving from the Chicago School’s theories to their criticisms and lasting impact, contribute to its overall argument?")) {
            return "The structure traces the development of urban sociology, showing the Chicago School’s role in its evolution. Option C) It traces the evolution of urban sociology as a discipline is correct. A) misstates the tone; B) is partial; D) overstates defense.";
        }// Set 9: Impressionist Movement Passage
    } else if (questionText.includes("In the late 19th century, the Impressionist movement redefined European art")) {
        if (questionText.includes("What was a primary goal of Impressionist artists like Monet and Renoir?")) {
            return "The passage states that Impressionists sought to capture fleeting moments of light and color, prioritizing sensory experience. Option B) To capture fleeting moments of light and color is correct. A) contradicts their break from academic standards; C) misaligns with their focus on sensory over narrative; D) opposes their loose, impressionistic style.";
        } else if (questionText.includes("According to the passage, how did critics initially react to Impressionism?")) {
            return "The passage notes critics scorned Impressionism, dismissing its sketch-like quality as unfinished. Option B) They dismissed it as unfinished and sketch-like is correct. A) misstates their reaction; C) contradicts their criticism; D) reflects later influence, not initial response.";
        } else if (questionText.includes("What role did the 1874 exhibition play in the Impressionist movement?")) {
            return "The passage highlights the 1874 exhibition as the origin of the term ‘Impressionism’ via Monet’s *Impression, Sunrise*. Option B) It introduced the term ‘Impressionism’ through Monet’s painting is correct. A) is incorrect as it was independent; C) misrepresents the exhibition’s content; D) is unrelated to its purpose.";
        } else if (questionText.includes("How did Impressionist artists challenge the Paris Salon, according to the passage?")) {
            return "The passage states Impressionists organized independent exhibitions to bypass the Paris Salon’s authority. Option C) By organizing independent exhibitions is correct. A) contradicts their approach; B) is a duplicate error; D) misaligns with their innovative style.";
        } else if (questionText.includes("The passage suggests that Impressionism’s focus on modernity was significant because it:")) {
            return "The passage links Impressionism’s celebration of railways and cafes to industrialization’s cultural shifts. Option A) Reflected the cultural changes brought by industrialization is correct. B) contradicts their nature focus; C) opposes their modern themes; D) ignores their build on prior art.";
        } else if (questionText.includes("The phrase ‘en plein air’ in the passage most likely refers to:")) {
            return "The context of capturing natural light and landscapes suggests ‘en plein air’ means painting outdoors. Option B) Painting outdoors to capture natural light is correct. A) describes studio work; C) misinterprets technique; D) refers to exhibition, not painting.";
        } else if (questionText.includes("How did Vincent van Gogh’s work relate to Impressionism, according to the passage?")) {
            return "The passage notes van Gogh’s emotive brushwork built on Impressionist spontaneity. Option B) He built on its spontaneity with emotive brushwork is correct. A) contradicts his influence; C) misstates his focus; D) lacks evidence of criticism.";
        } else if (questionText.includes("What does the passage imply about the Impressionists’ view of nature?")) {
            return "The passage states Impressionists retreated to nature for solace amidst modernity. Option A) They saw it as a source of solace amidst modernity is correct. B) contradicts their landscape focus; C) opposes their style; D) misrepresents their innovation.";
        } else if (questionText.includes("The passage’s reference to Impressionism ‘bridging the personal and the universal’ primarily serves to:")) {
            return "The phrase highlights how Impressionists connected individual sensory experiences to shared beauty. Option C) Illustrate its ability to connect individual experience with shared beauty is correct. A) is secondary; B) contradicts their style; D) opposes their modern focus.";
        } else if (questionText.includes("How does the passage’s structure, moving from Impressionism’s techniques to its cultural context and lasting impact, contribute to its overall argument?")) {
            return "The structure traces Impressionism’s development, emphasizing its lasting influence on modern art. Option D) It traces the evolution of Impressionism’s influence is correct. A) lacks clear contrast; B) is partial; C) misstates flaws as focus.";
    }
         
    // Set 10: Coral Reefs Passage
    } else if (questionText.includes("In the vast expanse of the Pacific Ocean, coral reefs thrive as vibrant ecosystems")) {
        if (questionText.includes("What is the primary reason coral reefs are called the 'rainforests of the sea'?")) {
            return "The passage states coral reefs support 25% of marine species, emphasizing their biodiversity. Option B) They support a high diversity of marine species is correct. A) is too vague; C) misstates corals as plants; D) overemphasizes size over ecological role.";
        } else if (questionText.includes("According to the passage, what causes coral bleaching?")) {
            return "The passage explicitly links coral bleaching to rising sea temperatures expelling zooxanthellae. Option B) Rising sea temperatures is correct. A) relates to acidification; C) and D) are secondary threats, not direct causes.";
        } else if (questionText.includes("What is the role of zooxanthellae in coral reefs, as described in the passage?")) {
            return "The passage describes zooxanthellae as colorful algae providing energy to corals. Option B) They provide color and energy to corals is correct. A) misattributes calcium secretion; C) is unsupported; D) confuses fish relationships.";
        } else if (questionText.includes("According to the passage, what is one purpose of marine protected areas (MPAs)?")) {
            return "The passage states MPAs restrict fishing and tourism to aid ecosystem recovery. Option B) To restrict fishing and allow ecosystem recovery is correct. A) contradicts their purpose; C) relates to restoration, not MPAs; D) is unrelated.";
        } else if (questionText.includes("The passage suggests that the 2016 study on the Great Barrier Reef is significant because it:")) {
            return "The passage highlights the study’s finding that 93% of corals were bleached, quantifying the crisis. Option A) Quantified the extent of coral bleaching across the reef is correct. B) is unrelated; C) is not mentioned; D) misstates MPA establishment.";
        } else if (questionText.includes("The term 'symbiotic relationships' in the passage most likely refers to:")) {
            return "The passage cites clownfish and anemones, implying mutually beneficial interactions. Option B) Mutually beneficial interactions between species is correct. A) suggests competition; C) implies predation; D) refers to human actions.";
        } else if (questionText.includes("What does the passage imply about the effectiveness of local conservation efforts?")) {
            return "The passage states local efforts are insufficient without global cooperation. Option B) They are limited without global cooperation is correct. A) contradicts the passage; C) is unsupported; D) misstates the focus.";
        } else if (questionText.includes("How does the passage describe the impact of ocean acidification on coral reefs?")) {
            return "The passage links acidification to weakened coral skeletons, hindering growth. Option B) It weakens coral skeletons, hindering growth is correct. A) confuses bleaching; C) is incorrect; D) contradicts resilience issues.";
        } else if (questionText.includes("The passage’s reference to coral reefs as ‘the rainforests of the sea’ primarily serves to:")) {
            return "The metaphor emphasizes reefs’ biodiversity and ecological role, as per the passage. Option A) Highlight their biodiversity and ecological importance is correct. B) overstates size; C) misstates composition; D) contradicts vulnerability.";
        } else if (questionText.includes("How does the passage’s structure, moving from the description of coral reefs to their threats and then to conservation efforts, contribute to its overall argument?")) {
            return "The structure builds a narrative from reefs’ importance to their vulnerability, urging action. Option C) It builds a case for the ecological importance and vulnerability of reefs is correct. A) lacks contrast; B) is partial; D) misstates critique focus.";
        } else if (questionText.includes("The passage’s discussion of human activities like overfishing and pollution primarily serves to:")) {
            return "The passage notes these activities exacerbate climate impacts, compounding threats. Option A) Illustrate additional threats that compound climate change impacts is correct. B) overstates their role; C) contradicts conservation; D) misstates benefits.";
        } else if (questionText.includes("What does the passage suggest about the relationship between coral reefs and global climate change?")) {
            return "The passage emphasizes reefs’ vulnerability to warming and acidification, with recovery challenges. Option C) Coral reefs are highly vulnerable to climate change impacts is correct. A) contradicts threats; B) is unsupported; D) overstates recovery potential.";
        }

   
        }
       
   
        return "No explanation available for this question.";
    }


    function handleNextButton() {
        recordTestResults();
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            endEnglishSection();
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
        questionElement.innerHTML = "This is a timed ACT English Test. You have 45 minutes to complete the section.";
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
        nextButton.addEventListener("click", handleNextButton);
    } else {
        console.error("next-btn element not found");
    }

    // Initialize the test by showing the intro message
    showIntroMessage();
});