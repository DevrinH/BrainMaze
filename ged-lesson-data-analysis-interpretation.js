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
        title: "Data Analysis and Interpretation",
        content: [
            {
                type: "example",
                title: "Example 1: Reading a Table",
                content: `
                    <h2>Example 1: Reading a Table</h2>
                    <p>Problem: A table shows monthly energy usage: January: 500 kWh, February: 450 kWh, March: 480 kWh. What is the total energy usage for the quarter?</p>
                    <p>Question: Calculate the total energy usage.</p>
                    <p>Step 1: Sum the monthly values: 500 + 450 + 480.</p>
                    <p>Step 2: Calculate: 500 + 450 = 950; 950 + 480 = 1430 kWh.</p>
                    <p>Solution: The total energy usage is 1430 kWh.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a factory in Millville tracked weekly production in a table: Week 1: 200 units, Week 2: 250 units, Week 3: 230 units. The manager needed to calculate the total production to assess output efficiency and plan inventory for the upcoming quarter.",
                question: "What is the total production?",
                options: [
                    { text: "A) 680 units", correct: true },
                    { text: "B) 650 units", correct: false },
                    { text: "C) 700 units", correct: false },
                    { text: "D) 620 units", correct: false }
                ],
                explanation: "Sum: 200 + 250 = 450; 450 + 230 = 680 units. The total production is 680 units."
            },
            {
                type: "example",
                title: "Example 2: Interpreting a Bar Graph",
                content: `
                    <h2>Example 2: Interpreting a Bar Graph</h2>
                    <p>Problem: A bar graph shows test scores: Group A: 85, Group B: 90, Group C: 80. What is the average score across groups?</p>
                    <p>Question: Calculate the average score.</p>
                    <p>Step 1: Sum the scores: 85 + 90 + 80 = 255.</p>
                    <p>Step 2: Divide by number of groups (3): 255 ÷ 3 = 85.</p>
                    <p>Solution: The average score is 85.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a retail chain in Greenvale displayed sales revenue on a bar graph: Store 1: $5000, Store 2: $6000, Store 3: $4500. The regional manager needed to calculate the average revenue to evaluate store performance and set sales targets for the next quarter.",
                question: "What is the average revenue?",
                options: [
                    { text: "A) $5166.67", correct: true },
                    { text: "B) $5500", correct: false },
                    { text: "C) $5000", correct: false },
                    { text: "D) $6000", correct: false }
                ],
                explanation: "Sum: $5000 + $6000 + $4500 = $15,500. Average: $15,500 ÷ 3 ≈ $5166.67."
            },
            {
                type: "example",
                title: "Example 3: Calculating Percentages",
                content: `
                    <h2>Example 3: Calculating Percentages</h2>
                    <p>Problem: A survey shows 120 out of 400 respondents prefer solar energy. What percentage prefer solar energy?</p>
                    <p>Question: Calculate the percentage.</p>
                    <p>Step 1: Divide respondents by total: 120 ÷ 400 = 0.3.</p>
                    <p>Step 2: Convert to percentage: 0.3 × 100 = 30%.</p>
                    <p>Solution: 30% prefer solar energy.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a workplace survey in Clearwater found that 75 out of 300 workers preferred remote work arrangements. The human resources team needed to determine the percentage of workers favoring remote work to inform policy decisions and improve employee satisfaction.",
                question: "What percentage prefer remote work?",
                options: [
                    { text: "A) 20%", correct: false },
                    { text: "B) 25%", correct: true },
                    { text: "C) 30%", correct: false },
                    { text: "D) 35%", correct: false }
                ],
                explanation: "Divide: 75 ÷ 300 = 0.25. Convert: 0.25 × 100 = 25%. So, 25% prefer remote work."
            },
            {
                type: "example",
                title: "Example 4: Finding the Median",
                content: `
                    <h2>Example 4: Finding the Median</h2>
                    <p>Problem: A dataset of temperatures (°C) is: 15, 18, 20, 17, 19. What is the median temperature?</p>
                    <p>Question: Calculate the median.</p>
                    <p>Step 1: Order the data: 15, 17, 18, 19, 20.</p>
                    <p>Step 2: Find the middle value (3rd value): 18.</p>
                    <p>Solution: The median temperature is 18°C.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a weather station in Millville recorded daily rainfall (mm): 30, 25, 35, 28, 32. The meteorologist needed to find the median rainfall to understand typical precipitation levels for the region, aiding in flood risk assessments and water management planning.",
                question: "What is the median rainfall?",
                options: [
                    { text: "A) 28 mm", correct: false },
                    { text: "B) 30 mm", correct: true },
                    { text: "C) 32 mm", correct: false },
                    { text: "D) 35 mm", correct: false }
                ],
                explanation: "Order the data: 25, 28, 30, 32, 35. The middle value (3rd) is 30 mm."
            },
            {
                type: "example",
                title: "Example 5: Interpreting a Line Graph",
                content: `
                    <h2>Example 5: Interpreting a Line Graph</h2>
                    <p>Problem: A line graph shows plant growth: Week 1: 5 cm, Week 2: 7 cm, Week 3: 10 cm. What is the growth from Week 1 to Week 3?</p>
                    <p>Question: Calculate the growth.</p>
                    <p>Step 1: Subtract Week 1 from Week 3:izante, 10 cm - 5 cm = 5 cm.</p>
                    <p>Solution: The growth is 5 cm.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, a botanical study in Greenvale tracked plant height over three days using a line graph: Day 1: 20 cm, Day 2: 22 cm, Day 3: 25 cm. Researchers calculated the total growth from Day 1 to Day 3 to evaluate the plant’s response to a new nutrient solution.",
                question: "What is the total growth from Day 1 to Day 3?",
                options: [
                    { text: "A) 3 cm", correct: false },
                    { text: "B) 5 cm", correct: true },
                    { text: "C) 2 cm", correct: false },
                    { text: "D) 7 cm", correct: false }
                ],
                explanation: "Subtract: 25 cm - 20 cm = 5 cm increase."
            },
            {
                type: "example",
                title: "Example 6: Analyzing a Pie Chart",
                content: `
                    <h2>Example 6: Analyzing a Pie Chart</h2>
                    <p>Problem: A pie chart shows budget allocation: Salaries: 50%, Supplies: 30%, Utilities: 20%. If the total budget is $10,000, how much is allocated to salaries?</p>
                    <p>Question: Calculate the salary allocation.</p>
                    <p>Step 1: Calculate percentage: 50% of $10,000 = 0.5 × $10,000 = $5000.</p>
                    <p>Solution: $5000 is allocated to salaries.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a community center in Clearwater used a pie chart to show expense distribution: Rent: 40%, Food: 25%, Transport: 35%. With total expenses of $2000, the treasurer needed to calculate the rent expenditure to manage the center’s financial planning effectively.",
                question: "How much is spent on rent?",
                options: [
                    { text: "A) $600", correct: false },
                    { text: "B) $700", correct: false },
                    { text: "C) $800", correct: true },
                    { text: "D) $900", correct: false }
                ],
                explanation: "Rent: 40% of $2000 = 0.4 × $2000 = $800."
            },
            {
                type: "example",
                title: "Example 7: Drawing Conclusions from Data",
                content: `
                    <h2>Example 7: Drawing Conclusions from Data</h2>
                    <p>Problem: A table shows battery life: Brand A: 10 hours, Brand B: 12 hours, Brand C: 8 hours. Which brand has the longest battery life?</p>
                    <p>Question: Identify the brand with the longest battery life.</p>
                    <p>Step 1: Compare values: 10 hours (A), 12 hours (B), 8 hours (C).</p>
                    <p>Step 2: Identify highest: 12 hours.</p>
                    <p>Solution: Brand B has the longest battery life.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, a quality control study in Millville compared test results for three production methods: Method 1: 75% success rate, Method 2: 82% success rate, Method 3: 70% success rate. The team needed to identify the method with the highest success rate to optimize production processes.",
                question: "Which method has the highest success rate?",
                options: [
                    { text: "A) Method 1", correct: false },
                    { text: "B) Method 2", correct: true },
                    { text: "C) Method 3", correct: false },
                    { text: "D) All equal", correct: false }
                ],
                explanation: "Compare: 75% (Method 1), 82% (Method 2), 70% (Method 3). Method 2 has the highest success rate."
            }
        ]
    }
};

// Data analysis and interpretation question array
const dataAnalysisQuestions = [
    {
        passage: "In 2023, a digital marketing team in Millville tracked monthly website visits using a line graph: January: 1000 visits, February: 1200 visits, March: 1100 visits. The team needed to calculate the percentage increase in visits from January to February to assess the impact of a new campaign.",
        question: "What is the percentage increase in visits from January to February?",
        answers: [
            { text: "A) 20%", correct: true },
            { text: "B) 10%", correct: false },
            { text: "C) 25%", correct: false },
            { text: "D) 15%", correct: false }
        ],
        explanation: "Increase: 1200 - 1000 = 200. Percentage increase: (200 ÷ 1000) × 100 = 20%.",
        difficulty: "easy",
        category: "ged-data-analysis-interpretation"
    },
    {
        passage: "In 2024, a volunteer program in Greenvale recorded weekly volunteer hours in a table: Week 1: 12 hours, Week 2: 15 hours, Week 3: 10 hours, Week 4: 18 hours. The coordinator needed to calculate the average hours per week to plan future volunteer schedules effectively.",
        question: "What is the average number of volunteer hours per week?",
        answers: [
            { text: "A) 13 hours", correct: false },
            { text: "B) 13.75 hours", correct: true },
            { text: "C) 14 hours", correct: false },
            { text: "D) 15 hours", correct: false }
        ],
        explanation: "Sum: 12 + 15 + 10 + 18 = 55. Average: 55 ÷ 4 = 13.75 hours.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        passage: "In 2023, an environmental initiative in Clearwater tracked monthly recycling rates with a bar graph: April: 60 kg, May: 75 kg, June: 50 kg. The program manager calculated the percentage decrease from May to June to evaluate the effectiveness of recycling campaigns.",
        question: "What is the percentage decrease from May to June?",
        answers: [
            { text: "A) 25%", correct: false },
            { text: "B) 30%", correct: false },
            { text: "C) 33.33%", correct: true },
            { text: "D) 40%", correct: false }
        ],
        explanation: "Decrease: 75 - 50 = 25 kg. Percentage decrease: (25 ÷ 75) × 100 ≈ 33.33%.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        passage: "In 2024, a weather station in Millville collected daily temperatures (°F): 68, 72, 65, 70, 74. The meteorologist needed to determine the median temperature to understand typical weather conditions for the region, aiding in climate trend analysis.",
        question: "What is the median temperature?",
        answers: [
            { text: "A) 65°F", correct: false },
            { text: "B) 68°F", correct: false },
            { text: "C) 70°F", correct: true },
            { text: "D) 72°F", correct: false }
        ],
        explanation: "Order: 65, 68, 70, 72, 74. Median: 70°F.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        passage: "In 2023, a school board in Greenvale used a pie chart to display its budget: Teachers: 45%, Facilities: 25%, Supplies: 20%, Other: 10%. With a total budget of $80,000, the board needed to calculate the facilities allocation to plan infrastructure upgrades.",
        question: "How much is allocated to facilities?",
        answers: [
            { text: "A) $16,000", correct: false },
            { text: "B) $20,000", correct: true },
            { text: "C) $18,000", correct: false },
            { text: "D) $22,000", correct: false }
        ],
        explanation: "Facilities: 25% of $80,000 = 0.25 × $80,000 = $20,000.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        passage: "In 2024, a botanical experiment in Clearwater recorded a plant’s height on a line graph: Day 1: 10 cm, Day 2: 12 cm, Day 3: 15 cm, Day 4: 14 cm. The researcher calculated the total growth from Day 1 to Day 4 to assess the plant’s response to environmental conditions.",
        question: "What is the total growth from Day 1 to Day 4?",
        answers: [
            { text: "A) 2 cm", correct: false },
            { text: "B) 3 cm", correct: false },
            { text: "C) 4 cm", correct: true },
            { text: "D) 5 cm", correct: false }
        ],
        explanation: "Total growth: 14 cm - 10 cm = 4 cm.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        passage: "In 2023, a household in Millville recorded energy consumption for appliances in a table: Fridge: 200 kWh, AC: 300 kWh, Heater: 250 kWh, TV: 150 kWh. The homeowner needed to identify the appliance with the highest energy consumption to optimize electricity usage.",
        question: "Which appliance consumes the most energy?",
        answers: [
            { text: "A) Fridge", correct: false },
            { text: "B) Heater", correct: false },
            { text: "C) TV", correct: false },
            { text: "D) AC", correct: true }
        ],
        explanation: "Compare: Fridge (200 kWh), AC (300 kWh), Heater (250 kWh), TV (150 kWh). AC has the highest consumption at 300 kWh.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    }
];

// Variables
let categoryStats = {
    "ged-data-analysis-interpretation": { correct: 0, incorrect: 0 }
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
        console.error("Start lesson button not found!");
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
        } else if (item.type === "question") {
            lessonContent.innerHTML = `
                <div class="question-row science-section">
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
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/In.*?(\.(?=\s*The\s|\s*This\s)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
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
        categoryStats["ged-data-analysis-interpretation"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-data-analysis-interpretation"].incorrect++;
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
                    <button id="start-quiz-btn" class="next-btn">Next</button>
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
        case 1: return dataAnalysisQuestions;
        default: return dataAnalysisQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row science-section">
                <div class="passage-text">${question.passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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
    let totalCorrect = categoryStats["ged-data-analysis-interpretation"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-data-analysis-interpretation"].incorrect;

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
    localStorage.setItem(`ged-data-analysis-interpretation-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-data-analysis-interpretation-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-data-analysis-interpretation-lessonScore-${lessonId}`) || "Not completed yet";
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