// Ensure scores display on page load by calling showScore
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || 1;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    1: {
        title: "Grammar and Sentence Structure",
        content: [
            {
                type: "example",
                title: "Example 1: Subject-Verb Agreement",
                content: `
                    <h2>Example 1: Subject-Verb Agreement</h2>
                    <p>Sentence: 'The team (work/works) together to meet deadlines.'</p>
                    <p>Question: Which verb is correct?</p>
                    <p>Step 1: Identify the subject: 'The team' (singular).</p>
                    <p>Step 2: Choose the singular verb: 'works'.</p>
                    <p>Correct Sentence: The team works together to meet deadlines.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a company in Millville published an annual report stating: 'The committee (decide/decides) on the budget each year.' The editor needed to select the correct verb to ensure subject-verb agreement in the report, maintaining professionalism for stakeholders.",
                question: "Which verb is correct in the sentence 'The committee (decide/decides) on the budget each year.'?",
                options: [
                    { text: "A) decides", correct: true },
                    { text: "B) decide", correct: false },
                    { text: "C) deciding", correct: false },
                    { text: "D) decided", correct: false }
                ],
                explanation: "The subject 'committee' is singular, so the singular verb 'decides' is correct."
            },
            {
                type: "example",
                title: "Example 2: Avoiding Sentence Fragments",
                content: `
                    <h2>Example 2: Avoiding Sentence Fragments</h2>
                    <p>Sentence: 'Because the employee handbook outlines safety rules.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check for a complete thought: Starts with 'Because', lacks a main clause.</p>
                    <p>Step 2: Fix by adding a main clause: 'Because the employee handbook outlines safety rules, staff must follow them.'</p>
                    <p>Correct Sentence: Because the employee handbook outlines safety rules, staff must follow them.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a training manual in Greenvale included the sentence: 'Although the training session was informative.' The editor needed to determine if this was a complete sentence or a fragment to ensure the manual’s clarity for employees learning new procedures.",
                question: "Is the sentence 'Although the training session was informative.' a complete sentence or a fragment?",
                options: [
                    { text: "A) Fragment", correct: true },
                    { text: "B) Complete sentence", correct: false },
                    { text: "C) Run-on sentence", correct: false },
                    { text: "D) Compound sentence", correct: false }
                ],
                explanation: "The sentence starts with 'Although' and lacks a main clause, making it a fragment."
            },
            {
                type: "example",
                title: "Example 3: Correcting Run-On Sentences",
                content: `
                    <h2>Example 3: Correcting Run-On Sentences</h2>
                    <p>Sentence: 'The meeting was long it covered many topics.'</p>
                    <p>Question: How can this run-on be fixed?</p>
                    <p>Step 1: Identify the issue: Two independent clauses without proper punctuation.</p>
                    <p>Step 2: Fix with a period or semicolon: 'The meeting was long. It covered many topics.'</p>
                    <p>Correct Sentence: The meeting was long. It covered many topics.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a project manager in Clearwater sent an email stating: 'The project is urgent we need to finish by Friday.' The manager needed to correct the run-on sentence to maintain clarity and professionalism in the communication to the team.",
                question: "How should the run-on sentence 'The project is urgent we need to finish by Friday.' be corrected?",
                options: [
                    { text: "A) The project is urgent. We need to finish by Friday.", correct: true },
                    { text: "B) The project is urgent we need to finish by Friday.", correct: false },
                    { text: "C) The project is urgent, we need to finish by Friday.", correct: false },
                    { text: "D) The project is urgent and we need to finish by Friday.", correct: true }
                ],
                explanation: "The run-on can be fixed with a period (A) or a conjunction (D), both separating the clauses correctly."
            },
            {
                type: "example",
                title: "Example 4: Pronoun-Antecedent Agreement",
                content: `
                    <h2>Example 4: Pronoun-Antecedent Agreement</h2>
                    <p>Sentence: 'Each employee must submit their report by Monday.'</p>
                    <p>Question: Is the pronoun correct?</p>
                    <p>Step 1: Identify the antecedent: 'Each employee' (singular).</p>
                    <p>Step 2: Check the pronoun: 'Their' (plural) is incorrect; use 'his or her'.</p>
                    <p>Correct Sentence: Each employee must submit his or her report by Monday.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a company policy in Millville stated: 'Every student should bring their own supplies.' The human resources team needed to correct the pronoun usage to ensure agreement with the singular antecedent for clarity in the policy document.",
                question: "Which pronoun is correct in the sentence 'Every student should bring their own supplies.'?",
                options: [
                    { text: "A) his or her", correct: true },
                    { text: "B) their", correct: false },
                    { text: "C) them", correct: false },
                    { text: "D) its", correct: false }
                ],
                explanation: "The singular antecedent 'Every student' requires the singular pronoun 'his or her'."
            },
            {
                type: "example",
                title: "Example 5: Proper Comma Usage",
                content: `
                    <h2>Example 5: Proper Comma Usage</h2>
                    <p>Sentence: 'The manager, who led the training, was very knowledgeable.'</p>
                    <p>Question: Is the comma usage correct?</p>
                    <p>Step 1: Identify the clause: 'who led the training' is nonessential.</p>
                    <p>Step 2: Confirm: Nonessential clauses need commas.</p>
                    <p>Correct Sentence: The manager, who led the training, was very knowledgeable.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, a project report in Greenvale included the sentence: 'The report which was due last week is incomplete.' The editor needed to verify if the comma usage was correct for the clause providing additional information about the report’s status.",
                question: "Is the comma usage correct in the sentence 'The report which was due last week is incomplete.'?",
                options: [
                    { text: "A) Incorrect, needs commas around 'which was due last week'.", correct: true },
                    { text: "B) Correct, no commas needed.", correct: false },
                    { text: "C) Incorrect, needs a comma before 'which'.", correct: false },
                    { text: "D) Incorrect, needs a comma after 'week'.", correct: false }
                ],
                explanation: "The clause 'which was due last week' is nonessential and requires commas."
            },
            {
                type: "example",
                title: "Example 6: Verb Tense Consistency",
                content: `
                    <h2>Example 6: Verb Tense Consistency</h2>
                    <p>Sentence: 'The team meets weekly and discussed new projects.'</p>
                    <p>Question: Is the verb tense consistent?</p>
                    <p>Step 1: Identify verbs: 'meets' (present), 'discussed' (past).</p>
                    <p>Step 2: Fix for consistency: Use present tense 'discusses'.</p>
                    <p>Correct Sentence: The team meets weekly and discusses new projects.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a company newsletter in Clearwater stated: 'The company launched a new product and is planning a campaign.' The editor needed to confirm if the verb tenses were consistent to ensure the newsletter accurately described ongoing activities.",
                question: "Is the verb tense consistent in the sentence 'The company launched a new product and is planning a campaign.'?",
                options: [
                    { text: "A) Consistent, both are present tense.", correct: true },
                    { text: "B) Inconsistent, 'launched' is past tense.", correct: false },
                    { text: "C) Inconsistent, 'is planning' is present continuous.", correct: false },
                    { text: "D) Consistent, both are past tense.", correct: false }
                ],
                explanation: "Both 'launched' and 'is planning' describe current actions, making A correct."
            },
            {
                type: "example",
                title: "Example 7: Combining Grammar and Structure",
                content: `
                    <h2>Example 7: Combining Grammar and Structure</h2>
                    <p>Sentence: 'The policy is strict employees must follow it or they face penalties.'</p>
                    <p>Question: What is wrong with this sentence?</p>
                    <p>Step 1: Check structure: Run-on sentence with no punctuation.</p>
                    <p>Step 2: Check grammar: Plural 'employees' matches 'they'.</p>
                    <p>Correct Sentence: The policy is strict; employees must follow it, or they face penalties.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, a company memo in Millville stated: 'The training is mandatory all employees must attend or risk losing benefits.' The communications team needed to correct the sentence structure to ensure clarity and professionalism in the memo to employees.",
                question: "How should the sentence 'The training is mandatory all employees must attend or risk losing benefits.' be corrected?",
                options: [
                    { text: "A) The training is mandatory; all employees must attend, or they risk losing benefits.", correct: true },
                    { text: "B) The training is mandatory all employees must attend or risk losing benefits.", correct: false },
                    { text: "C) The training is mandatory, all employees must attend or they risk losing benefits.", correct: false },
                    { text: "D) The training is mandatory all employees must attend, or they risks losing benefits.", correct: false }
                ],
                explanation: "The run-on needs a semicolon or period, and a comma before 'or' for clarity, making A correct."
            }
        ]
    }
};

// Grammar and sentence structure question array
const grammarSentenceStructureQuestions = [
    {
        passage: "In 2024, a project coordinator in Millville sent an email to the team, stating: 'The manager requires reports to be submitted on time otherwise delays affect the schedule.' The coordinator needed to correct the run-on sentence to ensure clear communication and maintain a professional tone.",
        question: "How should the run-on sentence 'The manager requires reports to be submitted on time otherwise delays affect the schedule.' be corrected?",
        answers: [
            { text: "A) The manager requires reports to be submitted on time; otherwise, delays affect the schedule.", correct: true },
            { text: "B) The manager requires reports to be submitted on time otherwise delays affect the schedule.", correct: false },
            { text: "C) The manager requires reports to be submitted on time, otherwise delays affect the schedule.", correct: false },
            { text: "D) The manager requires reports to be submitted on time otherwise, delays affects the schedule.", correct: false }
        ],
        explanation: "The run-on sentence needs a semicolon to separate the clauses, and a comma after 'otherwise' for clarity, making A correct.",
        difficulty: "easy",
        category: "ged-grammar-sentence-structure"
    },
    {
        passage: "In 2023, a community newsletter in Greenvale described a local initiative: 'The community garden, thriving with vegetables, attract many visitors.' The editor needed to ensure the sentence was grammatically correct and properly structured to engage readers effectively.",
        question: "Which sentence is grammatically correct and uses proper sentence structure?",
        answers: [
            { text: "A) The community garden, thriving with vegetables, attract many visitors.", correct: false },
            { text: "B) The community garden, thriving with vegetables, attracts many visitors.", correct: true },
            { text: "C) The community garden thriving with vegetables attract many visitors.", correct: false },
            { text: "D) The community garden, thriving with vegetables, attracting many visitors.", correct: false }
        ],
        explanation: "Option B is correct because it uses the singular verb 'attracts' to agree with the singular subject 'garden' and includes proper comma usage for the appositive phrase. Option A has a subject-verb agreement error ('attract' should be 'attracts'). Option C lacks commas for the appositive phrase. Option D is a fragment, lacking a complete verb structure.",
        difficulty: "medium",
        category: "ged-grammar-sentence-structure"
    },
    {
        passage: "In 2024, a volunteer coordinator in Clearwater wrote a recruitment flyer stating: 'Volunteers can participate by hiking, swimming, or to garden.' The coordinator needed to revise the sentence to ensure parallel structure, making the flyer clear and appealing to potential volunteers.",
        question: "Which sentence correctly uses parallel structure?",
        answers: [
            { text: "A) Volunteers can participate by hiking, swimming, and to garden.", correct: false },
            { text: "B) Volunteers can participate by hiking, swimming, and gardening.", correct: true },
            { text: "C) Volunteers can participate by to hike, swimming, and gardening.", correct: false },
            { text: "D) Volunteers can participate by hiking, to swim, and gardening.", correct: false }
        ],
        explanation: "Option B is correct because it maintains parallel structure by using gerunds ('hiking,' 'swimming,' 'gardening') consistently. Options A, C, and D mix infinitives ('to garden,' 'to hike,' 'to swim') with gerunds, breaking parallelism.",
        difficulty: "medium",
        category: "ged-grammar-sentence-structure"
    },
    {
        passage: "In 2023, a library opening announcement in Millville included the sentence: 'The new library designed with modern features, opened last week.' The communications team needed to ensure the sentence was free of grammatical errors and used correct punctuation to reflect the library’s professional image.",
        question: "Which sentence is free of grammatical errors and uses correct punctuation?",
        answers: [
            { text: "A) The new library designed with modern features, opened last week.", correct: false },
            { text: "B) The new library designed with modern features opened last week.", correct: false },
            { text: "C) The new library, designed with modern features, opened last week.", correct: true },
            { text: "D) The new library, designed with modern features opened last week.", correct: false }
        ],
        explanation: "Option C is correct because it properly uses commas to set off the nonrestrictive phrase 'designed with modern features' and forms a complete sentence. Option A has a misplaced comma after 'library.' Option B lacks necessary commas. Option D is missing a comma after 'features.'",
        difficulty: "medium",
        category: "ged-grammar-sentence-structure"
    },
    {
        passage: "In 2024, a recycling program in Greenvale published a report stating: 'The recycling program is effective it reduces landfill waste significantly.' The editor needed to correct the sentence structure to properly join the independent clauses, ensuring clarity in the report for community stakeholders.",
        question: "Which sentence correctly uses a semicolon to join two independent clauses?",
        answers: [
            { text: "A) The recycling program is effective; it reduces landfill waste significantly.", correct: true },
            { text: "B) The recycling program is effective; reducing landfill waste significantly.", correct: false },
            { text: "C) The recycling program is effective, it reduces landfill waste significantly.", correct: false },
            { text: "D) The recycling program is effective; and reduces landfill waste significantly.", correct: false }
        ],
        explanation: "Option A is correct because it uses a semicolon to join two independent clauses ('The recycling program is effective' and 'it reduces landfill waste significantly'). Option B has a fragment after the semicolon. Option C incorrectly uses a comma (comma splice). Option D improperly includes 'and' after the semicolon.",
        difficulty: "medium",
        category: "ged-grammar-sentence-structure"
    },
    {
        passage: "In 2023, a volunteer handbook in Millville stated: 'Each of the volunteers bring their own tools to the project.' The editor needed to ensure the sentence had correct subject-verb agreement and pronoun usage to guide volunteers clearly and professionally.",
        question: "Which sentence has correct subject-verb agreement and pronoun usage?",
        answers: [
            { text: "A) Each of the volunteers bring their own tools to the project.", correct: false },
            { text: "B) Each of the volunteers brings their own tools to the project.", correct: false },
            { text: "C) Each of the volunteers brings his or her own tools to the project.", correct: true },
            { text: "D) Each of the volunteers bring his or her own tools to the project.", correct: false }
        ],
        explanation: "Option C is correct because 'Each' is singular, requiring the singular verb 'brings,' and the pronoun 'his or her' agrees with the singular subject. Options A and B use the incorrect verb 'bring' or the plural pronoun 'their,' which disagrees with the singular subject 'Each.' Option D uses the incorrect verb 'bring.'",
        difficulty: "medium",
        category: "ged-grammar-sentence-structure"
    },
    {
        passage: "In 2024, a commuter newsletter in Clearwater included the sentence: 'Running quickly, the bus was missed by the commuter.' The editor needed to revise the sentence to avoid a dangling modifier and ensure grammatical correctness for clear communication to readers.",
        question: "Which sentence avoids a dangling modifier and is grammatically correct?",
        answers: [
            { text: "A) Running quickly, the bus was missed by the commuter.", correct: false },
            { text: "B) Running quickly, the commuter missed the bus.", correct: true },
            { text: "C) The commuter, running quickly, the bus was missed.", correct: false },
            { text: "D) Running quickly, the bus missed the commuter.", correct: false }
        ],
        explanation: "Option B is correct because the modifier 'Running quickly' clearly modifies 'the commuter,' who is performing the action, and the sentence is complete. Option A has a dangling modifier, implying the bus was running. Option C is a fragmented sentence. Option D illogically suggests the bus was running quickly.",
        difficulty: "medium",
        category: "ged-grammar-sentence-structure"
    }
];

// Variables
let categoryStats = {
    "ged-grammar-sentence-structure": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "1"; // Default as string to match lessons object keys
let progressSteps = 0;
let totalSteps = 0; // Set dynamically in startLesson
let isQuizPhase = false;
let showingQuizTransition = false; // Flag for quiz transition
let currentQuestionIndex = 0;

// Progress bar update function
function updateProgressBar(step) {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const percentage = totalSteps > 0 ? (step / totalSteps) * 100 : 0;
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
        console.log(`Progress updated: ${step}/${totalSteps} (${percentage}%)`);
    } else {
        console.error("Progress bar element not found!");
    }
}

// DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || '1'; // Ensure string
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    showScore();
    updateProgressBar(0);
});

// Start lesson
function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        currentItemIndex = 0;
        isQuizPhase = false;
        showingQuizTransition = false;
        totalSteps = lessons[currentLesson].content.length + getQuizQuestions(currentLesson).length;
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        progressSteps = 1;
        updateProgressBar(progressSteps);
        showItem();
    } else {
        console.error("Start lesson button not found!");
    }
}

// Show lesson item
function showItem() {
    console.log("Showing item for lesson:", currentLesson, "index:", currentItemIndex);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons && lessons[currentLesson] && lessons[currentLesson].content[currentItemIndex]) {
        const item = lessons[currentLesson].content[currentItemIndex];
        lessonContent.innerHTML = '';
        if (item.type === "example") {
            lessonContent.innerHTML = `
                <div class="question-row">
                    <div class="passage-text">${extractPassage(item.content)}</div>
                    <div class="right-column">
                        <div class="question-text">${item.content.replace(extractPassage(item.content), '')}</div>
                    </div>
                </div>
            `;
            const nextButton = document.getElementById('next-item');
            if (nextButton) {
                nextButton.classList.add('btn', 'next-btn');
                nextButton.addEventListener('click', nextItem, { once: true });
            } else {
                console.error("Next button not found in example!");
            }
        }else if (item.type === "question") {
            lessonContent.innerHTML = `
            <div class="question-row english-section">
            <div class="passage-text">${item.passage}</div>
            <div class="right-column">
            <div class="question-text">${item.title}: ${item.question}</div>
            <div class="answer-choices" id="answer-buttons"></div>
            <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
            </div>
            </div>
            `;
            const answerButtons = document.getElementById('answer-buttons');
            item.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.innerHTML = option.text;
                button.classList.add("btn");
                button.dataset.correct = option.correct;
                button.addEventListener("click", () => selectAnswer(button, item));
                answerButtons.appendChild(button);
            });
        }
        progressSteps = currentItemIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("No more lesson content, proceeding to quiz transition");
        showQuizTransition();
    }
}

// Extract passage from content (simplified for examples and questions)
function extractPassage(content) {
    const passageMatchWithTags = content.match(/<p>Sentence:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/Sentence:.*?(\.(?=\s*Which|\s*Is|\s*How)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
}

// Handle answer selection
function selectAnswer(selectedBtn, item) {
    const answerButtons = document.querySelectorAll('#answer-buttons .btn');
    const submitButton = document.getElementById('submit-answer');
    const rightColumn = document.querySelector('.right-column');

    answerButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
    });

    if (selectedBtn.dataset.correct === "true") {
        selectedBtn.classList.add("correct");
        categoryStats["ged-grammar-sentence-structure"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-grammar-sentence-structure"].incorrect++;
        const explanationDiv = document.createElement("div");
        explanationDiv.classList.add("explanation");
        explanationDiv.innerHTML = item.explanation;
        rightColumn.appendChild(explanationDiv);
    }

    submitButton.style.display = 'inline-block';
    submitButton.addEventListener('click', () => {
        if (!isQuizPhase) {
            nextItem();
        } else {
            nextQuizItem();
        }
    }, { once: true });
}

// Next lesson item
function nextItem() {
    currentItemIndex++;
    console.log("nextItem called, currentItemIndex:", currentItemIndex);
    if (currentItemIndex < lessons[currentLesson].content.length) {
        showItem();
    } else if (!showingQuizTransition) {
        showQuizTransition();
    }
}

// Show quiz transition screen
function showQuizTransition() {
    console.log("Showing quiz transition for lesson:", currentLesson);
    showingQuizTransition = true;
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent) {
        lessonContent.innerHTML = `
            <div class="transition-box">
                <div class="centered-content">
                    <h2>Lesson Complete!</h2>
                    <p>Now it's time for the quiz.</p>
                    <button id="start-quiz-btn" class="btn next-btn">Next</button>
                </div>
            </div>
        `;
        const startQuizBtn = document.getElementById('start-quiz-btn');
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                showingQuizTransition = false;
                showQuiz();
            }, { once: true });
        } else {
            console.error("Start quiz button not found in transition!");
        }
        progressSteps = lessons[currentLesson].content.length;
        updateProgressBar(progressSteps);
    } else {
        console.error("Lesson content element not found for quiz transition!");
    }
}

// Start quiz
function showQuiz() {
    console.log("Starting quiz for lesson:", currentLesson);
    isQuizPhase = true;
    currentQuestionIndex = 0;
    let quizQuestions = getQuizQuestions(currentLesson);
    progressSteps = lessons[currentLesson].content.length + 1;
    updateProgressBar(progressSteps);
    showNextQuizQuestion(quizQuestions);
}

// Get quiz questions based on lesson
function getQuizQuestions(lessonId) {
    switch (parseInt(lessonId)) {
        case 1: return grammarSentenceStructureQuestions;
        default: return grammarSentenceStructureQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row english-section">
                <div class="passage-text">${question.passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="btn next-btn" style="display: none;">Next</button>
                </div>
            </div>
        `;
        const answerButtons = document.getElementById('answer-buttons');
        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            button.dataset.correct = answer.correct;
            button.addEventListener("click", () => selectAnswer(button, question));
            answerButtons.appendChild(button);
        });
        progressSteps = lessons[currentLesson].content.length + currentQuestionIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("Quiz complete, showing final score");
        showFinalScore();
    }
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
}

// Save lesson completion
function saveLessonCompletion() {
    const completionData = {
        exam: "GED",
        type: "lesson",
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("lastActivity", JSON.stringify(completionData));
    console.log("Saved lesson completion:", completionData);
}

// Show final score
function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["ged-grammar-sentence-structure"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-grammar-sentence-structure"].incorrect;

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    logFinalScore(totalCorrect, totalAttempted);
    saveScore(currentLesson, score);

    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <div class="score-box">
            <div class="centered-content">
                <h2>Final Score</h2>
                <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
                <p>Your score: ${percentage}%</p>
                <button id="continue-button" class="btn continue-btn">Continue</button>
            </div>
        </div>
    `;
    const finalScoreElement = document.getElementById('final-score');
    if (finalScoreElement) finalScoreElement.classList.add('hide'); // Hide if exists
    document.getElementById('continue-button').addEventListener('click', () => {
        saveLessonCompletion();
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

// Record test results
function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("gedTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("gedTestResults", JSON.stringify(results));
    console.log("Final stored gedTestResults:", results);
    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

// Log final score
function logFinalScore(totalCorrect, totalAttempted) {
    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    localStorage.setItem("finalScore", JSON.stringify({
        correct: totalCorrect,
        attempted: totalAttempted,
        percentage: percentage,
        lesson: currentLesson
    }));
    console.log("Final score logged:", { totalCorrect, totalAttempted, percentage, lesson: currentLesson });
}

// Save score
function saveScore(lessonId, score) {
    localStorage.setItem(`ged-grammar-sentence-structure-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-grammar-sentence-structure-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-grammar-sentence-structure-lessonScore-${lessonId}`) || "Not completed yet";
}

// Show score on page load
function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        const score = getScore(currentLesson);
        scoreDisplay.innerHTML = `Previous Score for Lesson ${currentLesson}: ${score}`;
    } else {
        console.log("Score display element not found, skipping showScore");
    }
}