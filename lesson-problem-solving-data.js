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
        title: "Ratios, Proportions, and Percentages",
        examples: [
            {
                title: "Example: Ratio",
                content: `
                    <h2>Example: Ratio</h2>
                    <p>A mix has 3 parts sugar to 5 parts flour.</p>
                    <p>Question: What’s the ratio of sugar to total?</p>
                    <p>Step 1: Total parts = 3 + 5 = 8</p>
                    <p>Step 2: Ratio = 3/8</p>
                    <p>Answer: 3:8</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Percentage",
                content: `
                    <h2>Example: Percentage</h2>
                    <p>A shirt costs $20 and is discounted 25%.</p>
                    <p>Question: What’s the sale price?</p>
                    <p>Step 1: Discount = 25% of 20 = 0.25 × 20 = 5</p>
                    <p>Step 2: Sale price = 20 - 5 = 15</p>
                    <p>Answer: $15</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "A recipe uses 2 cups of water to 6 cups of flour. What’s the ratio of water to total?",
                options: [
                    { text: "A) 1:4", correct: true },
                    { text: "B) 1:3", correct: false },
                    { text: "C) 2:6", correct: false },
                    { text: "D) 1:2", correct: false }
                ],
                explanation: "Total = 2 + 6 = 8, ratio = 2/8 = 1/4."
            },
            {
                title: "Question 2",
                question: "A $50 item is discounted by 10%. What’s the sale price?",
                options: [
                    { text: "A) $45", correct: true },
                    { text: "B) $40", correct: false },
                    { text: "C) $50", correct: false },
                    { text: "D) $55", correct: false }
                ],
                explanation: "Discount = 0.10 × 50 = 5, sale price = 50 - 5 = 45."
            }
        ],
        additionalExample: {
            title: "Example: Proportion",
            content: `
                <h2>Example: Proportion</h2>
                <p>If 4 pens cost $2, how much do 10 pens cost?</p>
                <p>Question: What’s the cost?</p>
                <p>Step 1: Ratio: 4/2 = 10/x</p>
                <p>Step 2: Solve: 4x = 20, x = 5</p>
                <p>Answer: $5</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Unit Conversions and Rates",
        examples: [
            {
                title: "Example: Unit Conversion",
                content: `
                    <h2>Example: Unit Conversion</h2>
                    <p>Convert 3 feet to inches (1 ft = 12 in).</p>
                    <p>Question: How many inches?</p>
                    <p>Step 1: Multiply: 3 × 12 = 36</p>
                    <p>Answer: 36 inches</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Rate",
                content: `
                    <h2>Example: Rate</h2>
                    <p>A car travels 120 miles in 2 hours.</p>
                    <p>Question: What’s the speed?</p>
                    <p>Step 1: Divide: 120 ÷ 2 = 60</p>
                    <p>Answer: 60 mph</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Convert 2 hours to minutes (1 hr = 60 min).",
                options: [
                    { text: "A) 120 minutes", correct: true },
                    { text: "B) 60 minutes", correct: false },
                    { text: "C) 2 minutes", correct: false },
                    { text: "D) 180 minutes", correct: false }
                ],
                explanation: "2 × 60 = 120 minutes."
            },
            {
                title: "Question 2",
                question: "A worker paints 300 sq ft in 5 hours. What’s the rate?",
                options: [
                    { text: "A) 60 sq ft/hr", correct: true },
                    { text: "B) 50 sq ft/hr", correct: false },
                    { text: "C) 300 sq ft/hr", correct: false },
                    { text: "D) 1500 sq ft/hr", correct: false }
                ],
                explanation: "300 ÷ 5 = 60 sq ft/hr."
            }
        ],
        additionalExample: {
            title: "Example: Combined Conversion",
            content: `
                <h2>Example: Combined Conversion</h2>
                <p>A speed is 30 mph. Convert to ft/s (1 mi = 5280 ft, 1 hr = 3600 s).</p>
                <p>Question: What’s the speed?</p>
                <p>Step 1: Convert: 30 × 5280 ÷ 3600</p>
                <p>Step 2: Simplify: 44 ft/s</p>
                <p>Answer: 44 ft/s</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Linear and Exponential Growth",
        examples: [
            {
                title: "Example: Linear Growth",
                content: `
                    <h2>Example: Linear Growth</h2>
                    <p>A plant grows 2 cm per day. Day 0 = 5 cm.</p>
                    <p>Question: Height on day 3?</p>
                    <p>Step 1: Formula: 5 + 2d</p>
                    <p>Step 2: Compute: 5 + 2 × 3 = 11</p>
                    <p>Answer: 11 cm</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Exponential Growth",
                content: `
                    <h2>Example: Exponential Growth</h2>
                    <p>Bacteria double every hour. Start with 100.</p>
                    <p>Question: Amount after 3 hours?</p>
                    <p>Step 1: Formula: 100 × 2^t</p>
                    <p>Step 2: Compute: 100 × 2³ = 800</p>
                    <p>Answer: 800</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "A car’s value drops $500/year. Start = $10,000. Value after 2 years?",
                options: [
                    { text: "A) $9,000", correct: true },
                    { text: "B) $8,000", correct: false },
                    { text: "C) $10,000", correct: false },
                    { text: "D) $9,500", correct: false }
                ],
                explanation: "10,000 - 500 × 2 = 9,000."
            },
            {
                title: "Question 2",
                question: "A population triples every year. Start = 50. Amount after 2 years?",
                options: [
                    { text: "A) 450", correct: true },
                    { text: "B) 150", correct: false },
                    { text: "C) 300", correct: false },
                    { text: "D) 50", correct: false }
                ],
                explanation: "50 × 3² = 50 × 9 = 450."
            }
        ],
        additionalExample: {
            title: "Example: Comparing Growth",
            content: `
                <h2>Example: Comparing Growth</h2>
                <p>Linear: y = 10 + 5t, Exponential: y = 10 × 2^t</p>
                <p>Question: Which is larger at t = 2?</p>
                <p>Step 1: Linear: 10 + 5 × 2 = 20</p>
                <p>Step 2: Exponential: 10 × 2² = 40</p>
                <p>Answer: Exponential (40 > 20)</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Data Interpretation (Tables, Graphs, and Charts)",
        examples: [
            {
                title: "Example: Table",
                content: `
                    <h2>Example: Table</h2>
                    <p>Table: Dogs - 4, Cats - 6</p>
                    <p>Question: Percent dogs?</p>
                    <p>Step 1: Total = 4 + 6 = 10</p>
                    <p>Step 2: Percent = (4 ÷ 10) × 100 = 40%</p>
                    <p>Answer: 40%</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Graph",
                content: `
                    <h2>Example: Graph</h2>
                    <p>Bar graph: Jan = 5, Feb = 10 units sold</p>
                    <p>Question: Percent increase?</p>
                    <p>Step 1: Increase = 10 - 5 = 5</p>
                    <p>Step 2: Percent = (5 ÷ 5) × 100 = 100%</p>
                    <p>Answer: 100%</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Table: Apples - 3, Oranges - 7. Percent apples?",
                options: [
                    { text: "A) 30%", correct: true },
                    { text: "B) 70%", correct: false },
                    { text: "C) 50%", correct: false },
                    { text: "D) 25%", correct: false }
                ],
                explanation: "Total = 10, (3 ÷ 10) × 100 = 30%."
            },
            {
                title: "Question 2",
                question: "Graph: Day 1 = 20, Day 2 = 25. Percent increase?",
                options: [
                    { text: "A) 25%", correct: true },
                    { text: "B) 20%", correct: false },
                    { text: "C) 50%", correct: false },
                    { text: "D) 5%", correct: false }
                ],
                explanation: "Increase = 5, (5 ÷ 20) × 100 = 25%."
            }
        ],
        additionalExample: {
            title: "Example: Chart",
            content: `
                <h2>Example: Chart</h2>
                <p>Pie chart: Red = 25%, Blue = 75%</p>
                <p>Question: If total = 80, how many red?</p>
                <p>Step 1: Red = 25% of 80</p>
                <p>Step 2: Compute: 0.25 × 80 = 20</p>
                <p>Answer: 20</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    5: {
        title: "Measures of Center and Spread (Statistics)",
        examples: [
            {
                title: "Example: Mean",
                content: `
                    <h2>Example: Mean</h2>
                    <p>Data: 2, 4, 6</p>
                    <p>Question: What’s the mean?</p>
                    <p>Step 1: Sum = 2 + 4 + 6 = 12</p>
                    <p>Step 2: Divide: 12 ÷ 3 = 4</p>
                    <p>Answer: 4</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Range",
                content: `
                    <h2>Example: Range</h2>
                    <p>Data: 3, 7, 1, 9</p>
                    <p>Question: What’s the range?</p>
                    <p>Step 1: Max = 9, Min = 1</p>
                    <p>Step 2: Range = 9 - 1 = 8</p>
                    <p>Answer: 8</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Data: 5, 10, 15. What’s the median?",
                options: [
                    { text: "A) 10", correct: true },
                    { text: "B) 5", correct: false },
                    { text: "C) 15", correct: false },
                    { text: "D) 30", correct: false }
                ],
                explanation: "Ordered: 5, 10, 15. Middle = 10."
            },
            {
                title: "Question 2",
                question: "Data: 2, 8, 3, 7. What’s the range?",
                options: [
                    { text: "A) 6", correct: true },
                    { text: "B) 8", correct: false },
                    { text: "C) 5", correct: false },
                    { text: "D) 2", correct: false }
                ],
                explanation: "Max = 8, Min = 2, 8 - 2 = 6."
            }
        ],
        additionalExample: {
            title: "Example: Standard Deviation Concept",
            content: `
                <h2>Example: Standard Deviation Concept</h2>
                <p>Data: 1, 1, 1 vs. 0, 1, 2</p>
                <p>Question: Which has larger spread?</p>
                <p>Step 1: First set: all same, SD = 0</p>
                <p>Step 2: Second set: range = 2, SD > 0</p>
                <p>Answer: 0, 1, 2</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    6: {
        title: "Probability and Expected Value",
        examples: [
            {
                title: "Example: Probability",
                content: `
                    <h2>Example: Probability</h2>
                    <p>A bag has 3 red, 2 blue balls.</p>
                    <p>Question: P(red)?</p>
                    <p>Step 1: Total = 3 + 2 = 5</p>
                    <p>Step 2: P(red) = 3/5</p>
                    <p>Answer: 3/5</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Expected Value",
                content: `
                    <h2>Example: Expected Value</h2>
                    <p>Game: Win $10 (P = 0.4), lose $5 (P = 0.6)</p>
                    <p>Question: What’s the expected value?</p>
                    <p>Step 1: EV = (10 × 0.4) + (-5 × 0.6)</p>
                    <p>Step 2: Compute: 4 - 3 = 1</p>
                    <p>Answer: $1</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "A die is rolled. P(odd)?",
                options: [
                    { text: "A) 1/2", correct: true },
                    { text: "B) 1/3", correct: false },
                    { text: "C) 2/3", correct: false },
                    { text: "D) 1/6", correct: false }
                ],
                explanation: "Odd: 1, 3, 5. P = 3/6 = 1/2."
            },
            {
                title: "Question 2",
                question: "Win $20 (P = 0.3), lose $10 (P = 0.7). Expected value?",
                options: [
                    { text: "A) -$1", correct: true },
                    { text: "B) $1", correct: false },
                    { text: "C) $6", correct: false },
                    { text: "D) -$6", correct: false }
                ],
                explanation: "(20 × 0.3) + (-10 × 0.7) = 6 - 7 = -1."
            }
        ],
        additionalExample: {
            title: "Example: Combined Probability",
            content: `
                <h2>Example: Combined Probability</h2>
                <p>2 coins flipped. P(both heads)?</p>
                <p>Step 1: Outcomes: HH, HT, TH, TT</p>
                <p>Step 2: P(HH) = 1/4</p>
                <p>Answer: 1/4</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    7: {
        title: "Two-Way Tables and Conditional Probability",
        examples: [
            {
                title: "Example: Two-Way Table",
                content: `
                    <h2>Example: Two-Way Table</h2>
                    <p>Table: Boys (Yes: 20, No: 10), Girls (Yes: 15, No: 5)</p>
                    <p>Question: P(Yes)?</p>
                    <p>Step 1: Total = 20 + 10 + 15 + 5 = 50</p>
                    <p>Step 2: Yes = 20 + 15 = 35, P = 35/50 = 7/10</p>
                    <p>Answer: 7/10</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Conditional Probability",
                content: `
                    <h2>Example: Conditional Probability</h2>
                    <p>Same table. P(Yes | Boy)?</p>
                    <p>Step 1: Boys = 20 + 10 = 30</p>
                    <p>Step 2: Yes Boys = 20, P = 20/30 = 2/3</p>
                    <p>Answer: 2/3</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Table: Men (A: 10, B: 20), Women (A: 5, B: 15). P(A)?",
                options: [
                    { text: "A) 1/3", correct: true },
                    { text: "B) 1/2", correct: false },
                    { text: "C) 1/4", correct: false },
                    { text: "D) 2/3", correct: false }
                ],
                explanation: "Total = 50, A = 10 + 5 = 15, P = 15/50 = 1/3."
            },
            {
                title: "Question 2",
                question: "Same table. P(B | Women)?",
                options: [
                    { text: "A) 3/4", correct: true },
                    { text: "B) 1/2", correct: false },
                    { text: "C) 2/3", correct: false },
                    { text: "D) 1/3", correct: false }
                ],
                explanation: "Women = 20, B Women = 15, P = 15/20 = 3/4."
            }
        ],
        additionalExample: {
            title: "Example: Reverse Conditional",
            content: `
                <h2>Example: Reverse Conditional</h2>
                <p>Same table. P(Boy | Yes)?</p>
                <p>Step 1: Yes = 35, Yes Boys = 20</p>
                <p>Step 2: P = 20/35 = 4/7</p>
                <p>Answer: 4/7</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    8: {
        title: "Experimental Design and Statistical Validity",
        examples: [
            {
                title: "Example: Sampling Bias",
                content: `
                    <h2>Example: Sampling Bias</h2>
                    <p>Survey at a gym about exercise habits.</p>
                    <p>Question: Why might this be biased?</p>
                    <p>Step 1: Population: Gym-goers already exercise.</p>
                    <p>Answer: Overestimates exercise frequency.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Causation vs. Correlation",
                content: `
                    <h2>Example: Causation vs. Correlation</h2>
                    <p>More ice cream sales, more drownings.</p>
                    <p>Question: Is this causation?</p>
                    <p>Step 1: Consider: Both rise in summer.</p>
                    <p>Answer: No, correlation (seasonal effect).</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Poll at a library about reading. What’s the bias?",
                options: [
                    { text: "A) Overestimates reading", correct: true },
                    { text: "B) Underestimates reading", correct: false },
                    { text: "C) No bias", correct: false },
                    { text: "D) Random error", correct: false }
                ],
                explanation: "Library users likely read more."
            },
            {
                title: "Question 2",
                question: "More sunscreen sales, more sunburns. Causation?",
                options: [
                    { text: "A) No, correlation", correct: true },
                    { text: "B) Yes, causation", correct: false },
                    { text: "C) No data", correct: false },
                    { text: "D) Yes, reverse causation", correct: false }
                ],
                explanation: "Both increase in summer, not causal."
            }
        ],
        additionalExample: {
            title: "Example: Randomization",
            content: `
                <h2>Example: Randomization</h2>
                <p>Drug test: Randomly assign to treatment/control.</p>
                <p>Question: Why randomize?</p>
                <p>Step 1: Reduces bias in group differences.</p>
                <p>Answer: Ensures fair comparison.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Problem Solving and Data Analysis question arrays
const ratioQuestions = [
    {
        question: "A mix is 2 parts A to 3 parts B. Ratio of A to total?",
        answers: [
            { text: "A) 2:5", correct: true },
            { text: "B) 2:3", correct: false },
            { text: "C) 3:5", correct: false },
            { text: "D) 1:2", correct: false }
        ],
        explanation: "Total = 2 + 3 = 5, ratio = 2/5.",
        difficulty: "easy",
        category: "problem-solving-data"
    }
];

const unitRateQuestions = [
    {
        question: "Convert 5 km to meters (1 km = 1000 m).",
        answers: [
            { text: "A) 5000 m", correct: true },
            { text: "B) 500 m", correct: false },
            { text: "C) 50 m", correct: false },
            { text: "D) 5 m", correct: false }
        ],
        explanation: "5 × 1000 = 5000 m.",
        difficulty: "easy",
        category: "problem-solving-data"
    }
];

const growthQuestions = [
    {
        question: "Population doubles every year. Start = 200. After 2 years?",
        answers: [
            { text: "A) 800", correct: true },
            { text: "B) 400", correct: false },
            { text: "C) 600", correct: false },
            { text: "D) 200", correct: false }
        ],
        explanation: "200 × 2² = 200 × 4 = 800.",
        difficulty: "medium",
        category: "problem-solving-data"
    }
];

const dataInterpretationQuestions = [
    {
        question: "Table: X = 8, Y = 12. Percent X?",
        answers: [
            { text: "A) 40%", correct: true },
            { text: "B) 60%", correct: false },
            { text: "C) 50%", correct: false },
            { text: "D) 20%", correct: false }
        ],
        explanation: "Total = 20, (8 ÷ 20) × 100 = 40%.",
        difficulty: "easy",
        category: "problem-solving-data"
    }
];

const statisticsQuestions = [
    {
        question: "Data: 4, 6, 8. What’s the mean?",
        answers: [
            { text: "A) 6", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 8", correct: false },
            { text: "D) 5", correct: false }
        ],
        explanation: "(4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6.",
        difficulty: "easy",
        category: "problem-solving-data"
    }
];

const probabilityQuestions = [
    {
        question: "Bag: 4 red, 6 blue. P(blue)?",
        answers: [
            { text: "A) 3/5", correct: true },
            { text: "B) 2/5", correct: false },
            { text: "C) 4/10", correct: false },
            { text: "D) 1/2", correct: false }
        ],
        explanation: "Total = 10, P = 6/10 = 3/5.",
        difficulty: "medium",
        category: "problem-solving-data"
    }
];

const twoWayTableQuestions = [
    {
        question: "Table: A (M: 5, F: 10), B (M: 15, F: 20). P(A | M)?",
        answers: [
            { text: "A) 1/4", correct: true },
            { text: "B) 1/2", correct: false },
            { text: "C) 3/4", correct: false },
            { text: "D) 1/3", correct: false }
        ],
        explanation: "Men = 20, A Men = 5, P = 5/20 = 1/4.",
        difficulty: "medium",
        category: "problem-solving-data"
    }
];

const experimentalDesignQuestions = [
    {
        question: "Survey at a mall about shopping. Bias?",
        answers: [
            { text: "A) Overestimates shopping", correct: true },
            { text: "B) Underestimates shopping", correct: false },
            { text: "C) No bias", correct: false },
            { text: "D) Random error", correct: false }
        ],
        explanation: "Mall-goers likely shop more.",
        difficulty: "medium",
        category: "problem-solving-data"
    }
];

// lesson-problem-solving-data.js

let categoryStats = {
    "problem-solving-data": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;

function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        showExample();
    } else {
        console.error("Start lesson button not found!");
    }
}

function showExample() {
    console.log("Showing example for lesson:", currentLesson);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons && lessons[currentLesson] && lessons[currentLesson].examples[0]) {
        lessonContent.innerHTML = lessons[currentLesson].examples[0].content;
        const nextExampleBtn = document.getElementById('next-example');
        if (nextExampleBtn) {
            nextExampleBtn.addEventListener('click', showNextExample);
        } else {
            console.error("Next example button not found!");
        }
    } else {
        console.error("Lesson content or lessons data missing!");
    }
}

function showNextExample() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].examples[1].content;
    document.getElementById('next-question').addEventListener('click', askQuestion);
}

function askQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLesson].questions[0];
    lessonContent.innerHTML = `
        <h2>${question.title}</h2>
        <p>${question.question}</p>
        ${question.options.map((option, index) => `
            <input type="radio" id="q1a${index}" name="q1" value="${option.correct}">
            <label for="q1a${index}">${option.text}</label><br>
        `).join('')}
        <button id="submit-answer1">Submit Answer</button>
    `;
    document.getElementById('submit-answer1').addEventListener('click', checkAnswer1);
}

function checkAnswer1() {
    const selectedAnswer = document.querySelector('input[name="q1"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats["problem-solving-data"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["problem-solving-data"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showNextExample3() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].additionalExample.content;
    document.getElementById('next-question').addEventListener('click', askNextQuestion);
}

function askNextQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLesson].questions[1];
    lessonContent.innerHTML = `
        <h2>${question.title}</h2>
        <p>${question.question}</p>
        ${question.options.map((option, index) => `
            <input type="radio" id="q2a${index}" name="q2" value="${option.correct}">
            <label for="q2a${index}">${option.text}</label><br>
        `).join('')}
        <button id="submit-answer2">Submit Answer</button>
    `;
    document.getElementById('submit-answer2').addEventListener('click', checkAnswer2);
}

function checkAnswer2() {
    const selectedAnswer = document.querySelector('input[name="q2"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats["problem-solving-data"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["problem-solving-data"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = ratioQuestions; break;
        case 2: quizQuestions = unitRateQuestions; break;
        case 3: quizQuestions = growthQuestions; break;
        case 4: quizQuestions = dataInterpretationQuestions; break;
        case 5: quizQuestions = statisticsQuestions; break;
        case 6: quizQuestions = probabilityQuestions; break;
        case 7: quizQuestions = twoWayTableQuestions; break;
        case 8: quizQuestions = experimentalDesignQuestions; break;
        default: quizQuestions = ratioQuestions;
    }
    showNextQuizQuestion(quizQuestions);
}

function showNextQuizQuestion(quizQuestions) {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <h2>Question ${currentQuestionIndex + 1}</h2>
            <p>${question.question}</p>
            ${question.answers.map((answer, index) => `
                <input type="radio" id="q${currentQuestionIndex}a${index}" name="q${currentQuestionIndex}" value="${answer.correct}">
                <label for="q${currentQuestionIndex}a${index}">${answer.text}</label><br>
            `).join('')}
            <button id="submit-answer">Submit Answer</button>
        `;
        document.getElementById('submit-answer').addEventListener('click', () => checkQuizAnswer(question, quizQuestions));
    } else {
        showFinalScore();
    }
}

function checkQuizAnswer(question, quizQuestions) {
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats[question.category].correct++;
        } else {
            alert(`Incorrect. ${question.explanation}`);
            categoryStats[question.category].incorrect++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showNextQuizQuestion(quizQuestions);
        } else {
            console.log("Quiz complete, calling showFinalScore");
            showFinalScore();
        }
    } else {
        alert('Please select an answer.');
    }
}

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

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = 0;
    let totalAttempted = 0;

    for (let category in categoryStats) {
        totalCorrect += categoryStats[category].correct;
        totalAttempted += categoryStats[category].correct + categoryStats[category].incorrect;
    }

    logFinalScore(totalCorrect, totalAttempted);

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    console.log("Saving score:", score);
    saveScore(currentLesson, score);

    const finalScoreElement = document.getElementById('final-score');
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = '';
    finalScoreElement.style.display = 'block';
    finalScoreElement.innerHTML = `
        <h2>Final Score</h2>
        <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
        <p>Your score: ${percentage}%</p>
        <button id="continue-button">Continue</button>
    `;

    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    });

    recordTestResults();
}

function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Final stored testResults:", results);
    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

function saveScore(lessonId, score) {
    localStorage.setItem(`problem-solving-data-lessonScore-${lessonId}`, score);
    console.log(`Saved problem-solving-data-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`lessonScore-${lessonId}`) || "Not completed yet";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded, initializing lesson:", currentLesson);
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 1;
    console.log("Set currentLesson to:", currentLesson);

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start lesson button event listener added");
    } else {
        console.error("Start lesson button not found on page load!");
    }
});