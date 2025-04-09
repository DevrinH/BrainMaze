const passageElement = document.getElementById("passage");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const continueButton = document.getElementById("continue-btn");
const satIntroContainer = document.getElementById("sat-intro-container");
const startTestButton = document.getElementById("start-test-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {};
let results = localStorage.getItem("testResults");
results = results ? JSON.parse(results) : {};
let isMathTest = false;
let userResponses = [];
let currentModule = 1;
let module1Correct = 0;

const readingWritingQuestions = [
    {
        passage: "Emma stepped into the grand ballroom, her gown brushing against the polished floor as chandeliers cast golden light across the room. The guests moved with ease, their conversations flowing effortlessly. She had imagined this moment countless times, yet standing there now, a strange unease settled in her chest. Adjusting her gloves, she forced a smile and took a hesitant step forward, unsure if she truly belonged.",
        question: "What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "A) She feels out of place despite having anticipated this moment.", correct: true },
            { text: "B) She is overwhelmed by the beauty and struggles to contain excitement.", correct: false },
            { text: "C) She is intimidated by the guests and decides to leave.", correct: false },
            { text: "D) She is eager to impress others and makes a confident entrance.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },
    {
        passage: "Daniel stepped into the office, straightening his tie as he took in the bustling atmosphere. Conversations hummed around him, and the clatter of keyboards filled the air. He had spent weeks preparing for this moment, yet a small knot of doubt twisted in his stomach. He took a deep breath and walked toward his desk, reminding himself that everyone had to start somewhere.",
        question: "What does the passage suggest about Daniel's attitude toward his new job?",
        answers: [
            { text: "A) He is uncertain about his abilities but determined to prove himself.", correct: true },
            { text: "B) He is uninterested and only took the job for financial reasons.", correct: false },
            { text: "C) He is confident he will excel without challenges.", correct: false },
            { text: "D) He regrets accepting the position and considers quitting.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },
    {
        passage: "Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript. Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind. He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.",
        question: "Which choice provides the best evidence for Liam’s uncertainty about his work?",
        answers: [
            { text: "A) 'Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind.'", correct: true },
            { text: "B) 'He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.'", correct: false },
            { text: "C) 'Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript.'", correct: false },
            { text: "D) 'He had imagined this moment countless times, picturing satisfaction.'", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The scientist adjusted her glasses, peering at the data displayed on the screen. The results were unexpected—far different from what she and her team had predicted. She tapped her fingers against the desk, reviewing each calculation. There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.",
        question: "Which sentence best supports the idea that the scientist struggles to accept her findings?",
        answers: [
            { text: "A) 'The scientist adjusted her glasses, peering at the data displayed on the screen.'", correct: false },
            { text: "B) 'She tapped her fingers against the desk, reviewing each calculation.'", correct: false },
            { text: "C) 'The results were unexpected—far different from what she and her team had predicted.'", correct: false },
            { text: "D) 'There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.'", correct: true },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },
];

const mathQuestions = [
    {
        passage: "",
        question: "An airplane is flying from City A to City B, a total distance of 1,500 miles. The airplane flies against the wind at 500 mph for half the trip and with the wind at 600 mph for the other half. What is the total flight time?",
        answers: [
            { text: "A) 2.5 hours", correct: false },
            { text: "B) 2.6 hours", correct: false },
            { text: "C) 2.8 hours", correct: false },
            { text: "D) 2.75 hours", correct: true }
        ],
        difficulty: "hard",
        category: "advanced-math"
    },
    {
        passage: "",
        question: "A car's value depreciates by 15% each year. If the car was originally purchased for $30,000, what will its value be after 3 years, rounded to the nearest dollar?",
        answers: [
            { text: "A) $18,520", correct: false },
            { text: "B) $19,275", correct: true },
            { text: "C) $20,250", correct: false },
            { text: "D) $21,000", correct: false }
        ],
        difficulty: "hard",
        category: "advanced-math"
    },    
    {
        passage: "",
        question: "The function f(x) is defined as f(x) = 2x² - 3x + 5. What is the value of f(4)?",
        answers: [
            { text: "A) 27", correct: false },
            { text: "B) 29", correct: true },
            { text: "C) 31", correct: false },
            { text: "D) 25", correct: false }
        ],
        difficulty: "easy",
        category: "algebra"
    },
    {
        passage: "",
        question: "A company rents out bicycles for a flat fee of $12 plus $3 per hour. If a customer has $45 to spend, what is the maximum number of hours they can rent a bicycle?",
        answers: [
            { text: "A) 10 hours", correct: false },
            { text: "B) 11 hours", correct: false },
            { text: "C) 9 hours", correct: true },
            { text: "D) 8 hours", correct: false }
        ],
        difficulty: "medium",
        category: "algebra"
    },
];

function startTest() {
    satIntroContainer.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startReadingWritingTest();
}

function startReadingWritingTest() {
    isMathTest = false;
    userResponses = [];
    currentModule = 1;
    module1Correct = 0;
    startQuiz(readingWritingQuestions, 9, 9, 9); // 27 questions per module
}

function startMathTest() {
    isMathTest = true;
    currentModule = 1;
    module1Correct = 0;
    startQuiz(mathQuestions, 7, 8, 7); // 22 questions per module
}

function endModule() {
    resetState();
    if (currentModule === 1) {
        module1Correct = correctAnswers;
        currentModule = 2;
        startNextModule();
    } else {
        if (!isMathTest) {
            // Show Reading/Writing score immediately after module 2
            showReadingWritingScore();
        } else {
            // Show final combined score after Math module 2
            showFinalScore();
        }
    }
}

function startNextModule() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    score = 0;
    
    const threshold = isMathTest ? 11 : 13; // 50% correct threshold for adaptivity
    if (module1Correct >= threshold) {
        // Harder module 2
        startQuiz(isMathTest ? mathQuestions : readingWritingQuestions, 0, 9, 13); // More hard questions
    } else {
        // Easier module 2
        startQuiz(isMathTest ? mathQuestions : readingWritingQuestions, 13, 9, 0); // More easy questions
    }
}

function startQuiz(questions, numEasy, numMedium, numHard) {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};
    selectedQuestions = selectRandomQuestions(questions, numEasy, numMedium, numHard);
    nextButton.innerHTML = "Next";
    showQuestion();
}

function selectRandomQuestions(questions, numEasy, numMedium, numHard) {
    const easyQuestions = questions.filter(q => q.difficulty === "easy");
    const mediumQuestions = questions.filter(q => q.difficulty === "medium");
    const hardQuestions = questions.filter(q => q.difficulty === "hard");

    function getRandom(arr, num) {
        return arr.sort(() => 0.5 - Math.random()).slice(0, Math.min(num, arr.length));
    }

    const selectedEasy = getRandom(easyQuestions, numEasy);
    const selectedMedium = getRandom(mediumQuestions, numMedium);
    const selectedHard = getRandom(hardQuestions, numHard);

    return [...selectedEasy, ...selectedMedium, ...selectedHard];
}

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    passageElement.innerHTML = currentQuestion.passage;
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

function showReadingWritingScore() {
    resetState();

    let maxPossibleScore = 9 * 1 + 9 * 2 + 9 * 3; // Per module (27 questions)
    maxPossibleScore *= 2; // Two modules
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    localStorage.setItem("readingScore", scaledScore);
    passageElement.innerHTML = "";
    questionElement.innerHTML = `Reading and Writing DSAT Score: ${scaledScore} / 800`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");

    document.getElementById("question-container").classList.remove("hide");
    document.getElementById("break-message").classList.add("hide"); // Ensure break message stays hidden
}

function showFinalScore() {
    resetState();

    let maxPossibleScore = 7 * 1 + 8 * 2 + 7 * 3; // Per module (22 questions)
    maxPossibleScore *= 2; // Two modules
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    let readingScore = parseInt(localStorage.getItem("readingScore") || 0, 10);
    let mathScore = scaledScore;
    localStorage.setItem("mathScore", mathScore);

    let totalDSATScore = readingScore + mathScore;

    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = { reading: readingScore, math: mathScore, total: totalDSATScore };
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    passageElement.innerHTML = "";
    questionElement.innerHTML = `<p><strong>Reading and Writing DSAT Score:</strong> ${readingScore} / 800</p>
                                <p><strong>Math DSAT Score:</strong> ${mathScore} / 800</p>
                                <p><strong>Total DSAT Score:</strong> ${totalDSATScore} / 1600</p>`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Review Incorrect Answers";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", showExplanations);

    document.getElementById("question-container").classList.remove("hide");
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
    const questionText = response.question || ""; // Contains passage + question

    // Mildly Hard Explanations
    if (questionText.includes("best supports the idea that Dr. Patel is persistent")) {
        return "Her months of refining methods show persistence despite setbacks.";
    } else if (questionText.includes("best indicates the explorer’s motivation")) {
        return "Pressing on driven by tales of a hidden temple directly shows his motivation.";
    } else if (questionText.includes("best demonstrates Clara overcoming her initial nervousness")) {
        return "Her voice growing steadier after being shaky shows she overcomes nervousness.";
    } else if (questionText.includes("best supports the baker’s commitment to his work")) {
        return "Pausing only briefly before returning to work highlights his commitment.";

    // Hard Explanations
    } else if (questionText.includes("best supports the economist’s credibility")) {
        return "Countering critics with multi-year evidence demonstrates her credibility.";
    } else if (questionText.includes("most clearly shows the climber’s resilience")) {
        return "Ignoring the wind and pushing upward directly shows her resilience.";
    } else if (questionText.includes("best strengthens the historian’s argument")) {
        return "Pointing to overlooked correspondence provides concrete support for her argument.";
    } else if (questionText.includes("best justifies the engineer’s confidence")) {
        return "Citing stress test results offers evidence backing her confidence.";

    // Extremely Hard Explanations
    } else if (questionText.includes("most directly undermines the team’s contamination hypothesis")) {
        return "Noting sterile conditions directly counters the idea of contamination.";
    } else if (questionText.includes("most effectively counters the critics’ accusation of stalling")) {
        return "Referencing an overlooked clause shows purposeful action, not stalling.";
    } else if (questionText.includes("most directly supports the poet’s explanation of her style")) {
        return "Her letter stating disorder was deliberate directly supports her explanation.";
    } else if (questionText.includes("most strongly refutes the peers’ suggestion of rounding errors")) {
        return "The calibration log confirming precision directly refutes rounding errors.";
    } 
    // Passage-based conditions now use questionText
    else if (questionText.includes("central idea of the passage") && questionText.includes("old lighthouse")) {
        return "The lighthouse’s endurance despite storms highlights resilience.";
    } else if (questionText.includes("main idea conveyed by the passage") && questionText.includes("annual harvest festival")) {
        return "The festival emphasizes community bonds over material gain.";
    } else if (questionText.includes("central theme of the passage") && questionText.includes("inventor toiled")) {
        return "The inventor’s persistence through failure drives innovation.";
    } else if (questionText.includes("primary idea of the passage") && questionText.includes("river wound through the valley")) {
        return "The river is central to the valley’s existence and identity.";
    
    // Hard Explanations (Central Ideas)
    } else if (questionText.includes("central idea of the passage") && questionText.includes("playwright crafted")) {
        return "The playwright aims to redefine historical narratives.";
    } else if (questionText.includes("main idea of the passage") && questionText.includes("desert stretched endlessly")) {
        return "The nomads’ survival hinges on deep environmental knowledge.";
    } else if (questionText.includes("central theme of the passage") && questionText.includes("librarian curated")) {
        return "The librarian champions literature’s timeless impact.";
    } else if (questionText.includes("primary idea of the passage") && questionText.includes("climber scaled the peak")) {
        return "The climb reveals the climber’s inner growth over external triumph.";
    
    // Extremely Hard Explanations (Central Ideas)
    } else if (questionText.includes("central idea of the passage") && questionText.includes("philosopher argued")) {
        return "The philosopher posits truth as a subjective, perceptual construct.";
    } else if (questionText.includes("main idea of the passage") && questionText.includes("artist painted decay")) {
        return "The artist links beauty with life’s transient nature.";
    } else if (questionText.includes("central theme of the passage") && questionText.includes("economist viewed markets")) {
        return "The economist warns of markets’ vulnerability to imbalance.";
    } else if (questionText.includes("primary idea of the passage") && questionText.includes("linguist traced language")) {
        return "The linguist sees language as a dynamic, negotiated process.";
    }
    // Inferences
    else if (questionText.includes("inferred about the farmer’s attitude")) {
        return "His return to work with a grunt implies determination despite the drought.";
    } else if (questionText.includes("inferred about the librarian’s feelings")) {
        return "Her smile and prominent display suggest she cherishes the older books.";
    } else if (questionText.includes("inferred about the runner’s approach")) {
        return "Stretching longer after a loss implies greater care in preparation.";
    } else if (questionText.includes("inferred about the painter’s response")) {
        return "Adding crimson despite advice shows she prioritizes her own vision.";

    // Hard Explanations (Inferences)
    } else if (questionText.includes("inferred about the detective’s view")) {
        return "Noting the broken lock suggests he doubts the accident claim.";
    } else if (questionText.includes("inferred about the scientist’s reaction")) {
        return "Frowning and double-checking imply unease and a need to resolve anomalies.";
    } else if (questionText.includes("inferred about the merchant’s business strategy")) {
        return "Grinning despite fewer sales suggests he values profit over volume.";
    } else if (questionText.includes("inferred about the teacher’s perception")) {
        return "Assigning a solo project implies she sees untapped potential.";

    // Extremely Hard Explanations (Inferences)
    } else if (questionText.includes("inferred about the diplomat’s strategy")) {
        return "A surprise compromise amid tension suggests a calculated move for control.";
    } else if (questionText.includes("inferred about the poet’s creative process")) {
        return "Burning drafts and rejecting perfection imply she values raw imperfection.";
    } else if (questionText.includes("inferred about the engineer’s priorities")) {
        return "Delaying for a tweak shows precision trumps investor pressure.";
    } else if (questionText.includes("inferred about the historian’s approach")) {
        return "Focusing on one letter to upend a theory implies insight from detail.";
    }
    // Words in Context
    else if (questionText.includes("what does 'elevate' most nearly mean")) {
        return "'Elevate' means to improve the sauce’s flavor, enhancing its quality.";
    } else if (questionText.includes("what does 'survey' most nearly mean")) {
        return "'Survey' means to observe the landscape, taking it in visually.";
    } else if (questionText.includes("what does 'refine' most nearly mean")) {
        return "'Refine' means to perfect the chaotic notes into a polished draft.";
    } else if (questionText.includes("what does 'restore' most nearly mean")) {
        return "'Restore' means to reestablish order in the neglected yard.";
    
    // Hard Explanations (Words in Context)
    } else if (questionText.includes("what does 'illuminated' most nearly mean")) {
        return "'Illuminated' means to explain theories clearly, making them understandable.";
    } else if (questionText.includes("what does 'penetrate' most nearly mean")) {
        return "'Penetrate' means to break through her composed demeanor, breaching it.";
    } else if (questionText.includes("what does 'synthesis' most nearly mean")) {
        return "'Synthesis' means a combination of art and utility in the design.";
    } else if (questionText.includes("what does 'defying' most nearly mean")) {
        return "'Defying' means resisting the rigid structure of the original score.";
    
    // Extremely Hard Explanations (Words in Context)
    } else if (questionText.includes("what does 'eludes' most nearly mean")) {
        return "'Eludes' means truth evades rigid definitions, slipping away.";
    } else if (questionText.includes("what does 'undermine' most nearly mean")) {
        return "'Undermine' means to weaken the research’s conclusions, not fully disprove.";
    } else if (questionText.includes("what does 'imbued' most nearly mean")) {
        return "'Imbued' means infused with layers of meaning in her lines.";
    } else if (questionText.includes("what does 'entrenched' most nearly mean")) {
        return "'Entrenched' means deeply established views held by her peers.";
    }
    // Text Structure and Purpose
    else if (questionText.includes("primary purpose") && questionText.includes("old bridge")) {
        return "The passage describes the bridge’s state and its ongoing assessment.";
    } else if (questionText.includes("primarily structured") && questionText.includes("festival began")) {
        return "The passage follows the festival’s timeline from start to end.";
    } else if (questionText.includes("main purpose") && questionText.includes("rainforests teem")) {
        return "The passage shows deforestation’s effects and pushes conservation.";
    } else if (questionText.includes("primarily structured") && questionText.includes("recipe starts")) {
        return "The passage lists baking steps in order.";

    // Hard Explanations (Text Structure and Purpose)
    } else if (questionText.includes("primarily structured") && questionText.includes("explorer’s journal")) {
        return "The passage tracks her emotional shift over time.";
    } else if (questionText.includes("primary purpose") && questionText.includes("urban sprawl")) {
        return "The passage explores sprawl’s downsides and offers a solution.";
    } else if (questionText.includes("primarily structured") && questionText.includes("novel opens")) {
        return "The passage follows the mystery’s progression chapter by chapter.";
    } else if (questionText.includes("main purpose") && questionText.includes("climate change accelerates")) {
        return "The passage warns of climate impacts and calls for solutions.";

    // Extremely Hard Explanations (Text Structure and Purpose)
    } else if (questionText.includes("primarily structured") && questionText.includes("essay starts with a paradox")) {
        return "The passage ties freedom across eras around a central theme.";
    } else if (questionText.includes("primary purpose") && questionText.includes("poetry, she writes")) {
        return "The passage reveals her intent to reflect life’s ups and downs.";
    } else if (questionText.includes("primarily structured") && questionText.includes("study lists data")) {
        return "The passage mixes stats and story to make a point.";
    } else if (questionText.includes("main purpose") && questionText.includes("history, he argues")) {
        return "The passage aims to rethink history with linked examples.";
    }
    // Transitions
    else if (questionText.includes("transition") && questionText.includes("storm hit late")) {
        return "'As a result' connects the flooding to residents’ discovery.";
    } else if (questionText.includes("transition") && questionText.includes("team practiced daily")) {
        return "'Consequently' links practice to the successful outcome.";
    } else if (questionText.includes("transition") && questionText.includes("garden thrived in spring")) {
        return "'However' contrasts the thriving spring with summer’s drought.";
    } else if (questionText.includes("transition") && questionText.includes("recipe called for fresh herbs")) {
        return "'Alternatively' offers dried herbs as a substitute.";
    
    // Hard Explanations (Transitions)
    } else if (questionText.includes("transition") && questionText.includes("experiment yielded consistent")) {
        return "'Nevertheless' contrasts consistency with the unexpected malfunction.";
    } else if (questionText.includes("transition") && questionText.includes("city planned a new park")) {
        return "'Unfortunately' introduces the setback of budget cuts.";
    } else if (questionText.includes("transition") && questionText.includes("novel’s early chapters")) {
        return "'By contrast' highlights the shift from slow suspense to rapid twists.";
    } else if (questionText.includes("transition") && questionText.includes("runner trained hard")) {
        return "'Furthermore' adds diet changes to her training efforts.";
    
    // Extremely Hard Explanations (Transitions)
    } else if (questionText.includes("transition") && questionText.includes("theory relied on stable")) {
        return "'In practice' shifts from theory to real-world challenges.";
    } else if (questionText.includes("transition") && questionText.includes("critics praised the film’s visuals")) {
        return "'Conversely' contrasts praise for visuals with debate over narrative.";
    } else if (questionText.includes("transition") && questionText.includes("poet aimed for clarity")) {
        return "'In contrast' highlights the shift from clarity to ambiguity.";
    } else if (questionText.includes("transition") && questionText.includes("policy aimed to reduce emissions")) {
        return "'On the other hand' introduces industries’ opposing perspective.";
    }
    // Rhetorical Synthesis
    else if (questionText.includes("park’s benefits")) {
        return "A emphasizes recreation and tourism with specific features, aligning with the goal.";
    } else if (questionText.includes("program’s success")) {
        return "A highlights the 20% trash reduction, showcasing measurable success.";
    } else if (questionText.includes("expansion’s appeal")) {
        return "A ties demand to offerings and timing, making the expansion enticing.";
    } else if (questionText.includes("garden’s community impact")) {
        return "A connects volunteers, output, and bonds, emphasizing community strength.";

    // Hard Explanations (Rhetorical Synthesis)
    } else if (questionText.includes("app’s value to its audience")) {
        return "A targets young adults with features and accessibility, meeting the pitch’s aim.";
    } else if (questionText.includes("initiative’s environmental and financial benefits")) {
        return "A links emissions cuts and savings, spotlighting dual benefits.";
    } else if (questionText.includes("exhibit’s appeal and impact")) {
        return "A combines attendance and engagement with features, boosting appeal.";
    } else if (questionText.includes("support for refugees")) {
        return "A details services and reach with donor ties, underlining support.";

    // Extremely Hard Explanations (Rhetorical Synthesis)
    } else if (questionText.includes("relevance to climate challenges")) {
        return "A ties heat waves to cooling and energy data, showing climate relevance.";
    } else if (questionText.includes("technology’s potential benefits")) {
        return "A highlights safety and efficiency with trial success, focusing on benefits.";
    } else if (questionText.includes("tax’s dual benefits")) {
        return "A pairs emissions reduction with tech funding, advocating both goals.";
    } else if (questionText.includes("global artistic impact")) {
        return "A links diverse artists and works to creativity and exchange, showing global reach.";
    }
    // Boundaries
    else if (questionText.includes("fair’s attractions")) {
        return "A ties the petting zoo and fair’s appeal to its ongoing tradition.";
    } else if (questionText.includes("story hours")) {
        return "A keeps focus on the story hours’ impact on kids’ reading.";
    } else if (questionText.includes("bakery’s bread")) {
        return "A links the bread’s quality to the bakery’s popularity.";
    } else if (questionText.includes("trail’s features")) {
        return "A summarizes the trail’s accessibility and natural appeal.";
    
    // Hard Explanations (Boundaries)
    } else if (questionText.includes("recycling program’s impact")) {
        return "A extends the program’s success within its current scope.";
    } else if (questionText.includes("murals’ role")) {
        return "A reinforces the murals’ purpose in preserving history.";
    } else if (questionText.includes("app’s functionality")) {
        return "A ties simplicity to the app’s fitness tracking goal.";
    } else if (questionText.includes("festival’s emphasis")) {
        return "A connects local talent to the festival’s community focus.";
    
    // Extremely Hard Explanations (Boundaries)
    } else if (questionText.includes("study’s findings")) {
        return "A links the data to urban sustainability, staying on topic.";
    } else if (questionText.includes("approach to grief")) {
        return "A ties structure to the novel’s grief theme, avoiding externals.";
    } else if (questionText.includes("policy’s effects")) {
        return "A focuses on the policy’s initial air quality impact.";
    } else if (questionText.includes("lecture’s insights")) {
        return "A concludes with myths’ role in identity, not logistics.";
    }
    // Algebra
    else if (questionText.includes("total cost")) {
        return "Sale price = $15 - $5 = $10 per shirt. Total = 3 × $10 = $30.";
    } else if (questionText.includes("value of x") && questionText.includes("2x + 7 = 15")) {
        return "2x + 7 = 15 → 2x = 8 → x = 4.";
    } else if (questionText.includes("y-intercept")) {
        return "y = mx + b. Using (2, 5) and m = 3: 5 = 3(2) + b → b = -1.";
    } else if (questionText.includes("hours did they rent")) {
        return "20 + 10h = 50 → 10h = 30 → h = 3.";

    // Hard Explanations (Algebra)
    } else if (questionText.includes("minimum value")) {
        return "Vertex at x = -b/(2a) = 8/(4) = 2. f(2) = 2(4) - 8(2) + 5 = -3.";
    } else if (questionText.includes("value of x") && questionText.includes("3x + y = 7")) {
        return "Solve: x - 2y = 1 → x = 2y + 1. Then 3(2y + 1) + y = 7 → 7y + 3 = 7 → y = 4/7, x = 3.";
    } else if (questionText.includes("second car catch up")) {
        return "Distance = 60t. Second car: 75(t - 1). Set equal: 60t = 75(t - 1) → t = 4.";
    } else if (questionText.includes("solution to this inequality")) {
        return "4x - 3 > 9 → 4x > 12 → x > 3.";

    // Extremely Hard Explanations (Algebra)
    } else if (questionText.includes("value of k") && questionText.includes("vertex")) {
        return "Vertex at x = 3, y = 0. f(3) = 9 - 18 + k = 0 → k = 9.";
    } else if (questionText.includes("larger of the two numbers")) {
        return "x + y = 15, xy = 36. Quadratic: t² - 15t + 36 = 0 → t = 12 or 3. Larger = 12.";
    } else if (questionText.includes("value of k") && questionText.includes("infinitely many solutions")) {
        return "Equations proportional: (2/-3) = (k/-9) → k = 6.";
    } else if (questionText.includes("value of h(0)")) {
        return "g(x) = x² + x - 6. Shift left 1: (x + 1), up 4: h(x) = (x + 1)² + x - 2. h(0) = 1 - 0 - 2 = -2.";
    }
    // Advanced Math
    else if (questionText.includes("value of x") && questionText.includes("2^x")) {
        return "2^x = 16 → 2^4 = 16 → x = 4.";
    } else if (questionText.includes("population after 15 years")) {
        return "P(15) = 100 * 2^(15/5) = 100 * 2^3 = 100 * 8 = 800.";
    } else if (questionText.includes("value of x") && questionText.includes("log₃(x)")) {
        return "log₃(x) = 2 → x = 3^2 = 9.";
    } else if (questionText.includes("sine of the smallest angle")) {
        return "Hypotenuse = √(3² + 4²) = 5. Smallest angle opposite 3: sin = 3/5.";
    
    // Hard Explanations (Advanced Math)
    } else if (questionText.includes("value of x") && questionText.includes("4^(x+1)")) {
        return "4^(x+1) = 64 → 4^(x+1) = 4^2 → x + 1 = 2 → x = 1.";
    } else if (questionText.includes("distinct real critical points")) {
        return "f'(x) = 4x^3 - 8x = 4x(x² - 2). Roots: x = 0, ±√2. Three distinct points.";
    } else if (questionText.includes("result") && questionText.includes("3 + 4i")) {
        return "(3 + 4i)(3 - 4i) = 9 - 16i² = 9 + 16 = 25.";
    } else if (questionText.includes("tangent of that angle")) {
        return "cos = 5/13, adjacent = 5, hypotenuse = 13. Opposite = 12. tan = 12/5.";
    
    // Extremely Hard Explanations (Advanced Math)
    } else if (questionText.includes("sum of all real solutions")) {
        return "Let u = 2^x. Then u² - 5u + 4 = 0 → (u - 4)(u - 1) = 0. u = 4 → x = 2, u = 1 → x = 0. Sum = 2.";
    } else if (questionText.includes("value of x") && questionText.includes("log₂(x)")) {
        return "log₂(x) + log₂(x - 1) = log₂(x(x - 1)) = 3 → x(x - 1) = 8 → x² - x - 8 = 0. x = (1 + √33)/2 ≈ 3.";
    } else if (questionText.includes("radius of the circle")) {
        return "Complete the square: (x - 3)² + (y + 2)² = 25. Radius = √25 = 5.";
    } else if (questionText.includes("how many solutions")) {
        return "sin(x) + cos(x) = √2 * sin(x + π/4). sin(x + π/4) = 1 → x + π/4 = π/2 → x = π/4. One solution.";
    }
    // Problem Solving and Data Analysis
    else if (questionText.includes("percentage")) {
        return "(30 / 120) * 100 = 25%.";
    } else if (questionText.includes("average speed")) {
        return "Speed = distance / time = 240 / 4 = 60 mph.";
    } else if (questionText.includes("ratio of tea drinkers")) {
        return "Tea = 80, coffee = 120. Ratio = 80:120 = 2:3.";
    } else if (questionText.includes("amount of flour needed")) {
        return "Flour per cookie = 3 / 12 = 0.25 cups. For 20: 20 * 0.25 = 5 cups.";

    // Hard Explanations (Problem Solving and Data Analysis)
    } else if (questionText.includes("new mean")) {
        return "Old sum = 9 * 5 = 45. New sum = 45 + 15 = 60. New mean = 60 / 6 = 10.";
    } else if (questionText.includes("hours did they work")) {
        return "40 * 12 = 480. 600 - 480 = 120. 120 / 18 = 5. Total = 40 + 5 = 45.";
    } else if (questionText.includes("empty the tank")) {
        return "Net rate = 2 - 1 = 1 gal/min. Time = 50 / 1 = 50 minutes.";
    } else if (questionText.includes("probability both are red")) {
        return "P(first red) = 5/10, P(second red) = 4/9. Total = (5/10) * (4/9) = 2/9.";

    // Extremely Hard Explanations (Problem Solving and Data Analysis)
    } else if (questionText.includes("standard deviation of the new data set")) {
        return "Doubling values multiplies SD by 2: 4 * 2 = 8.";
    } else if (questionText.includes("expected number of non-defective units")) {
        return "Machine 1: 300 * 2 * 0.95 = 570. Machine 2: 400 * 2 * 0.97 = 776. Total = 1358.";
    } else if (questionText.includes("central angle for spring")) {
        return "Spring proportion = 150 / 500 = 0.3. Angle = 0.3 * 360 = 108 degrees.";
    } else if (questionText.includes("sales in year 4")) {
        return "Year 3: 50,000 * 2^3 = 400,000. Year 4: 400,000 * 1.5 = 600,000.";
    }
    // Geometry and Trigonometry
    else if (questionText.includes("area of the rectangle")) {
        return "Area = length * width = 8 * 5 = 40 square units.";
    } else if (questionText.includes("length of the hypotenuse") && questionText.includes("6 and 8")) {
        return "Hypotenuse = √(6² + 8²) = √(36 + 64) = √100 = 10.";
    } else if (questionText.includes("circumference of the circle")) {
        return "Circumference = 2πr = 2 * 3.14 * 7 = 43.96 units.";
    } else if (questionText.includes("leg opposite the 30° angle")) {
        return "sin(30°) = opposite / hypotenuse = 1/2. Opposite = 12 * 1/2 = 6.";
    
    // Hard Explanations (Geometry and Trigonometry)
    } else if (questionText.includes("volume of the cylinder")) {
        return "Volume = πr²h = 3.14 * 3² * 10 = 3.14 * 90 = 282.6 cubic units.";
    } else if (questionText.includes("area of the larger triangle")) {
        return "Area ratio = (side ratio)² = (5/2)² = 25/4. Larger area = 8 * 25/4 = 50.";
    } else if (questionText.includes("cosine of the angle opposite")) {
        return "Other leg = √(13² - 5²) = 12. cos = adjacent / hypotenuse = 12/13.";
    } else if (questionText.includes("area of the sector")) {
        return "Area = (θ/360) * πr² = (60/360) * 3.14 * 6² = (1/6) * 113.04 = 18.84.";
    
    // Extremely Hard Explanations (Geometry and Trigonometry)
    } else if (questionText.includes("volume of the cone")) {
        return "Height = √(5² - 4²) = 3. Volume = (1/3)πr²h = (1/3) * 3.14 * 16 * 3 = 50.24.";
    } else if (questionText.includes("length of side AB")) {
        return "Angle C = 75°. Law of Sines: AB / sin(75°) = 10 / sin(45°). AB = 10√6 / (√2 + √3).";
    } else if (questionText.includes("shortest distance from P")) {
        return "Original slope = 2, rotated slope = -1/2. New line: y = (-1/2)x. Distance from (3, -4) = |(-1/2)(3) - 4 - 0| / √(1 + 1/4) = 1.";
    } else if (questionText.includes("distinct solutions")) {
        return "Let u = sin(x). 2u² - u - 1 = 0 → (2u + 1)(u - 1) = 0. u = -1/2 (x = 7π/6, 11π/6), u = 1 (no solution). Two solutions.";
    }

    return "No specific explanation available.";
}

function handleNextButton() {
    recordTestResults();
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        endModule();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar-test");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.firstElementChild.style.width = progress + "%";
}

function recordTestResults() {
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};

    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }

    localStorage.setItem("testResults", JSON.stringify(results));

    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Continue") {
        document.getElementById("break-message").classList.remove("hide");
        document.getElementById("question-container").classList.add("hide");
        startMathTest(); // Start Math section immediately after clicking Continue
    } else {
        handleNextButton();
    }
});

continueButton.addEventListener("click", () => {
    document.getElementById("break-message").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startMathTest();
});

startTestButton.addEventListener("click", startTest);