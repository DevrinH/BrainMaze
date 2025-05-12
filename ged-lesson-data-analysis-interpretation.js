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
                question: "Problem: A table shows weekly production: Week 1: 200 units, Week 2: 250 units, Week 3: 230 units. What is the total production?",
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
                question: "Problem: A bar graph shows sales revenue: Store 1: $5000, Store 2: $6000, Store 3: $4500. What is the average revenue?",
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
                question: "Problem: A poll shows 75 out of 300 workers prefer remote work. What percentage prefer remote work?",
                options: [
                    { text: "A) 25%", correct: true },
                    { text: "B) 30%", correct: false },
                    { text: "C) 20%", correct: false },
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
                question: "Problem: A dataset of rainfall (mm) is: 30, 25, 35, 28, 32. What is the median rainfall?",
                options: [
                    { text: "A) 30 mm", correct: true },
                    { text: "B) 28 mm", correct: false },
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
                    <p>Step 1: Subtract Week 1 from Week 3: 10 cm - 5 cm = 5 cm.</p>
                    <p>Solution: The growth is 5 cm.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Problem: A line graph shows temperature: Day 1: 20°C, Day 2: 22°C, Day 3: 25°C. What is the temperature change from Day 1 to Day 3?",
                options: [
                    { text: "A) 5°C increase", correct: true },
                    { text: "B) 3°C increase", correct: false },
                    { text: "C) 5°C decrease", correct: false },
                    { text: "D) 2°C increase", correct: false }
                ],
                explanation: "Subtract: 25°C - 20°C = 5°C increase."
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
                question: "Problem: A pie chart shows expense distribution: Rent: 40%, Food: 25%, Transport: 35%. If the total expenses are $2000, how much is spent on rent?",
                options: [
                    { text: "A) $800", correct: true },
                    { text: "B) $700", correct: false },
                    { text: "C) $900", correct: false },
                    { text: "D) $600", correct: false }
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
                question: "Problem: A table shows test results: Method 1: 75%, Method 2: 82%, Method 3: 70%. Which method has the highest success rate?",
                options: [
                    { text: "A) Method 2", correct: true },
                    { text: "B) Method 1", correct: false },
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
        question: "Problem: A line graph shows monthly website visits: January: 1000, February: 1200, March: 1100. What is the percentage increase in visits from January to February?",
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
        question: "A recycling program tracks weekly plastic bottle collections: Week 1 (300 bottles), Week 2 (350 bottles), Week 3 (400 bottles), Week 4 (320 bottles). What is the mean number of bottles collected per week?",
        answers: [
            { text: "A) 342.5 bottles", correct: true },
            { text: "B) 350 bottles", correct: false },
            { text: "C) 340 bottles", correct: false },
            { text: "D) 360 bottles", correct: false }
        ],
        explanation: "To find the mean, sum the bottles: 300 + 350 + 400 + 320 = 1370. Divide by the number of weeks: 1370 ÷ 4 = 342.5 bottles. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        question: "A community garden records tomato yields: Plot 1 (15 kg), Plot 2 (20 kg), Plot 3 (18 kg), Plot 4 (22 kg), Plot 5 (17 kg). What is the median yield?",
        answers: [
            { text: "A) 20 kg", correct: false },
            { text: "B) 18 kg", correct: true },
            { text: "C) 19 kg", correct: false },
            { text: "D) 17 kg", correct: false }
        ],
        explanation: "Order the yields: 15, 17, 18, 20, 22. The median is the middle value: 18 kg. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        question: "A carpool group tracks fuel efficiency over 5 trips: Trip 1 (28 mpg), Trip 2 (30 mpg), Trip 3 (25 mpg), Trip 4 (32 mpg), Trip 5 (27 mpg). What is the range of fuel efficiencies?",
        answers: [
            { text: "A) 6 mpg", correct: false },
            { text: "B) 7 mpg", correct: true },
            { text: "C) 8 mpg", correct: false },
            { text: "D) 5 mpg", correct: false }
        ],
        explanation: "The range is the difference between the highest and lowest values: 32 - 25 = 7 mpg. Thus, option B is correct.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        question: "A library surveys 100 visitors about their reading preferences: Fiction (40%), Nonfiction (30%), Magazines (20%), Other (10%). How many visitors prefer nonfiction?",
        answers: [
            { text: "A) 30 visitors", correct: true },
            { text: "B) 40 visitors", correct: false },
            { text: "C) 20 visitors", correct: false },
            { text: "D) 25 visitors", correct: false }
        ],
        explanation: "Calculate 30% of 100: (30 ÷ 100) × 100 = 30 visitors. Thus, option A is correct.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        question: "A workshop tracks attendance over 6 sessions: Session 1 (25 people), Session 2 (30 people), Session 3 (28 people), Session 4 (22 people), Session 5 (35 people), Session 6 (20 people). What is the percent decrease in attendance from Session 5 to Session 6?",
        answers: [
            { text: "A) 40%", correct: false },
            { text: "B) 50%", correct: false },
            { text: "C) 42.86%", correct: true },
            { text: "D) 30%", correct: false }
        ],
        explanation: "Calculate the decrease: 35 - 20 = 15. Find the percent decrease: (15 ÷ 35) × 100 ≈ 42.86%. Thus, option C is correct.",
        difficulty: "medium",
        category: "ged-data-analysis-interpretation"
    },
    {
        question: "A volunteer group records hours worked by 4 members: Member 1 (10 hours), Member 2 (15 hours), Member 3 (12 hours), Member 4 (18 hours). What fraction of the total hours did Member 4 contribute?",
        answers: [
            { text: "A) 1/3", correct: false },
            { text: "B) 2/5", correct: false },
            { text: "C) 1/4", correct: false },
            { text: "D) 9/55", correct: true }
        ],
        explanation: "Sum the hours: 10 + 15 + 12 + 18 = 55. Fraction for Member 4: 18 ÷ 55 = 18/55, which simplifies to 9/55 (since 18 and 55 share no common factors). Thus, option D is correct.",
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
        } else if (item.type === "question") {
            const passage = extractPassage(item.question);
            lessonContent.innerHTML = `
                <div class="question-row">
                    <div class="passage-text">${passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question.replace(passage, '')}</div>
                        <div class="answer-choices" id="answer-buttons"></div>
                        <button id="submit-answer" class="btn next-btn" style="display: none;">Next</button>
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

// Extract passage from content
function extractPassage(content) {
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/Passage:.*?(\.(?=\s*What|\s*Which|\s*Why|\s*How)|$)/is);
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
        const passage = extractPassage(question.question);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question.replace(passage, '')}</div>
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