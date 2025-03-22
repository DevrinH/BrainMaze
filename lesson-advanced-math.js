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
        title: "Nonlinear Equations and Functions",
        examples: [
            {
                title: "Example: Solving a Quadratic",
                content: `
                    <h2>Example: Solving a Quadratic</h2>
                    <p>Equation: x² - 5x + 6 = 0</p>
                    <p>Question: What are the solutions?</p>
                    <p>Step 1: Factor: (x - 2)(x - 3) = 0</p>
                    <p>Step 2: Solve: x - 2 = 0 or x - 3 = 0</p>
                    <p>Solution: x = 2 or x = 3</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Graphing a Parabola",
                content: `
                    <h2>Example: Graphing a Parabola</h2>
                    <p>Function: y = x² - 4</p>
                    <p>Question: Where does it cross the x-axis?</p>
                    <p>Step 1: Set y = 0: 0 = x² - 4</p>
                    <p>Step 2: Solve: x² = 4, so x = ±2</p>
                    <p>Answer: At x = -2 and x = 2</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Solve: x² - 9 = 0",
                options: [
                    { text: "A) x = ±3", correct: true },
                    { text: "B) x = 9", correct: false },
                    { text: "C) x = ±9", correct: false },
                    { text: "D) x = 0", correct: false }
                ],
                explanation: "x² = 9, so x = ±3."
            },
            {
                title: "Question 2",
                question: "Where does y = x² - 1 cross the x-axis?",
                options: [
                    { text: "A) x = ±1", correct: true },
                    { text: "B) x = 1", correct: false },
                    { text: "C) x = -1", correct: false },
                    { text: "D) x = 0", correct: false }
                ],
                explanation: "Set y = 0: x² - 1 = 0, x² = 1, x = ±1."
            }
        ],
        additionalExample: {
            title: "Example: Nonlinear Inequality",
            content: `
                <h2>Example: Nonlinear Inequality</h2>
                <p>Inequality: x² - 4 > 0</p>
                <p>Question: What’s the solution?</p>
                <p>Step 1: Solve: x² > 4, x < -2 or x > 2</p>
                <p>Step 2: Test: x = 0 gives -4 < 0, false</p>
                <p>Solution: x < -2 or x > 2</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Systems of Equations with Nonlinear Functions",
        examples: [
            {
                title: "Example: Linear and Quadratic",
                content: `
                    <h2>Example: Linear and Quadratic</h2>
                    <p>System: y = x + 1, y = x²</p>
                    <p>Question: What are the solutions?</p>
                    <p>Step 1: Substitute: x + 1 = x²</p>
                    <p>Step 2: Solve: x² - x - 1 = 0, x = (1 ± √5)/2</p>
                    <p>Solution: ( (1 + √5)/2 , (3 + √5)/2 ), ( (1 - √5)/2 , (3 - √5)/2 )</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Two Quadratics",
                content: `
                    <h2>Example: Two Quadratics</h2>
                    <p>System: y = x² - 4, y = 2 - x²</p>
                    <p>Question: What are the solutions?</p>
                    <p>Step 1: Set equal: x² - 4 = 2 - x²</p>
                    <p>Step 2: Solve: 2x² = 6, x² = 3, x = ±√3</p>
                    <p>Solution: (√3, -1), (-√3, -1)</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Solve: y = 2x, y = x² - 1",
                options: [
                    { text: "A) (1, 2) and (-1, -2)", correct: true },
                    { text: "B) (1, 1)", correct: false },
                    { text: "C) (0, 0)", correct: false },
                    { text: "D) No solutions", correct: false }
                ],
                explanation: "2x = x² - 1, x² - 2x - 1 = 0, x = 1 or -1."
            },
            {
                title: "Question 2",
                question: "Solve: y = x², y = 4 - x²",
                options: [
                    { text: "A) (√2, 2) and (-√2, 2)", correct: true },
                    { text: "B) (2, 4)", correct: false },
                    { text: "C) (0, 0)", correct: false },
                    { text: "D) (1, 1)", correct: false }
                ],
                explanation: "x² = 4 - x², 2x² = 4, x² = 2, x = ±√2."
            }
        ],
        additionalExample: {
            title: "Example: Circle and Line",
            content: `
                <h2>Example: Circle and Line</h2>
                <p>System: x² + y² = 4, y = x</p>
                <p>Question: What are the solutions?</p>
                <p>Step 1: Substitute: x² + x² = 4</p>
                <p>Step 2: Solve: 2x² = 4, x² = 2, x = ±√2</p>
                <p>Solution: (√2, √2), (-√2, -√2)</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Function Transformations and Composition",
        examples: [
            {
                title: "Example: Transformation",
                content: `
                    <h2>Example: Transformation</h2>
                    <p>Function: f(x) = x², g(x) = (x - 3)² + 2</p>
                    <p>Question: Describe the transformation.</p>
                    <p>Step 1: Analyze: x - 3 shifts right, +2 shifts up.</p>
                    <p>Answer: Right 3 units, up 2 units.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Composition",
                content: `
                    <h2>Example: Composition</h2>
                    <p>f(x) = 2x, g(x) = x + 1, (f ∘ g)(x) = ?</p>
                    <p>Question: Find the composition.</p>
                    <p>Step 1: Substitute: f(g(x)) = f(x + 1)</p>
                    <p>Step 2: Compute: 2(x + 1) = 2x + 2</p>
                    <p>Answer: 2x + 2</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "f(x) = x² becomes f(x) = (x + 1)² - 4. What’s the transformation?",
                options: [
                    { text: "A) Left 1, down 4", correct: true },
                    { text: "B) Right 1, up 4", correct: false },
                    { text: "C) Left 1, up 4", correct: false },
                    { text: "D) Right 1, down 4", correct: false }
                ],
                explanation: "x + 1 shifts left 1, -4 shifts down 4."
            },
            {
                title: "Question 2",
                question: "f(x) = x - 2, g(x) = x², (g ∘ f)(x) = ?",
                options: [
                    { text: "A) (x - 2)²", correct: true },
                    { text: "B) x² - 2", correct: false },
                    { text: "C) x² + 4", correct: false },
                    { text: "D) x - 4", correct: false }
                ],
                explanation: "g(f(x)) = g(x - 2) = (x - 2)²."
            }
        ],
        additionalExample: {
            title: "Example: Combined",
            content: `
                <h2>Example: Combined</h2>
                <p>f(x) = √x, g(x) = 2x + 3, (f ∘ g)(x) = ?</p>
                <p>Question: Find the composition.</p>
                <p>Step 1: Substitute: f(g(x)) = f(2x + 3)</p>
                <p>Step 2: Compute: √(2x + 3)</p>
                <p>Answer: √(2x + 3)</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Complex Numbers",
        examples: [
            {
                title: "Example: Adding Complex Numbers",
                content: `
                    <h2>Example: Adding Complex Numbers</h2>
                    <p>(3 + 2i) + (1 - 4i) = ?</p>
                    <p>Question: What’s the sum?</p>
                    <p>Step 1: Combine real: 3 + 1 = 4</p>
                    <p>Step 2: Combine imaginary: 2i - 4i = -2i</p>
                    <p>Answer: 4 - 2i</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Multiplying Complex Numbers",
                content: `
                    <h2>Example: Multiplying Complex Numbers</h2>
                    <p>(2 + i)(3 - i) = ?</p>
                    <p>Question: What’s the product?</p>
                    <p>Step 1: FOIL: 6 - 2i + 3i - i²</p>
                    <p>Step 2: Simplify: 6 + i - (-1) = 7 + i</p>
                    <p>Answer: 7 + i</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "(5 - 3i) + (2 + i) = ?",
                options: [
                    { text: "A) 7 - 2i", correct: true },
                    { text: "B) 7 + 2i", correct: false },
                    { text: "C) 3 - 4i", correct: false },
                    { text: "D) 5 - i", correct: false }
                ],
                explanation: "5 + 2 = 7, -3i + i = -2i."
            },
            {
                title: "Question 2",
                question: "(1 + 2i)(1 - 2i) = ?",
                options: [
                    { text: "A) 5", correct: true },
                    { text: "B) 1 - 4i", correct: false },
                    { text: "C) 4i", correct: false },
                    { text: "D) -3", correct: false }
                ],
                explanation: "1 - 2i + 2i - 4i² = 1 - 4(-1) = 5."
            }
        ],
        additionalExample: {
            title: "Example: Complex Conjugate",
            content: `
                <h2>Example: Complex Conjugate</h2>
                <p>Number: 3 + 4i</p>
                <p>Question: What’s the conjugate?</p>
                <p>Step 1: Flip sign of imaginary part.</p>
                <p>Answer: 3 - 4i</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    5: {
        title: "Polynomial Division and Remainder Theorem",
        examples: [
            {
                title: "Example: Polynomial Division",
                content: `
                    <h2>Example: Polynomial Division</h2>
                    <p>Divide: (x³ - 2x² + 3) ÷ (x - 1)</p>
                    <p>Question: What’s the quotient?</p>
                    <p>Step 1: Synthetic: 1 | 1 -2 0 3</p>
                    <p>Step 2: Compute: 1 1 -1 2, quotient x² + x - 1, remainder 2</p>
                    <p>Answer: x² + x - 1 + 2/(x - 1)</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Remainder Theorem",
                content: `
                    <h2>Example: Remainder Theorem</h2>
                    <p>P(x) = x³ - 8, find P(2)</p>
                    <p>Question: What’s the remainder?</p>
                    <p>Step 1: Substitute: 2³ - 8 = 8 - 8</p>
                    <p>Answer: 0 (so x - 2 is a factor)</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Divide (x² + 3x - 4) by (x + 1). What’s the quotient?",
                options: [
                    { text: "A) x + 2", correct: true },
                    { text: "B) x - 2", correct: false },
                    { text: "C) x + 4", correct: false },
                    { text: "D) x - 4", correct: false }
                ],
                explanation: "Synthetic: -1 | 1 3 -4, quotient x + 2, remainder -6."
            },
            {
                title: "Question 2",
                question: "P(x) = x² - 5x + 6, find P(3)",
                options: [
                    { text: "A) 0", correct: true },
                    { text: "B) 6", correct: false },
                    { text: "C) 3", correct: false },
                    { text: "D) -6", correct: false }
                ],
                explanation: "3² - 5(3) + 6 = 9 - 15 + 6 = 0."
            }
        ],
        additionalExample: {
            title: "Example: Factor Check",
            content: `
                <h2>Example: Factor Check</h2>
                <p>P(x) = x³ + 1, find P(-1)</p>
                <p>Question: Is x + 1 a factor?</p>
                <p>Step 1: Substitute: (-1)³ + 1 = -1 + 1</p>
                <p>Answer: 0 (yes, x + 1 is a factor)</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    6: {
        title: "Rational Exponents and Radical Equations",
        examples: [
            {
                title: "Example: Rational Exponent",
                content: `
                    <h2>Example: Rational Exponent</h2>
                    <p>Simplify: 16^(3/4)</p>
                    <p>Question: What’s the value?</p>
                    <p>Step 1: Rewrite: (16^(1/4))³</p>
                    <p>Step 2: Compute: (2)³ = 8</p>
                    <p>Answer: 8</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Radical Equation",
                content: `
                    <h2>Example: Radical Equation</h2>
                    <p>Solve: √(x + 2) = 3</p>
                    <p>Question: What’s the solution?</p>
                    <p>Step 1: Square both sides: x + 2 = 9</p>
                    <p>Step 2: Solve: x = 7</p>
                    <p>Answer: x = 7</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Simplify: 27^(2/3)",
                options: [
                    { text: "A) 9", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) 18", correct: false },
                    { text: "D) 27", correct: false }
                ],
                explanation: "(27^(1/3))² = 3² = 9."
            },
            {
                title: "Question 2",
                question: "Solve: √(x - 1) = 4",
                options: [
                    { text: "A) 17", correct: true },
                    { text: "B) 15", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) 1", correct: false }
                ],
                explanation: "x - 1 = 16, x = 17."
            }
        ],
        additionalExample: {
            title: "Example: Radical with Check",
            content: `
                <h2>Example: Radical with Check</h2>
                <p>Solve: √(2x - 1) = 5</p>
                <p>Question: What’s the solution?</p>
                <p>Step 1: Square: 2x - 1 = 25</p>
                <p>Step 2: Solve: 2x = 26, x = 13</p>
                <p>Check: √(26 - 1) = √25 = 5, true</p>
                <p>Answer: x = 13</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    7: {
        title: "Absolute Value and Piecewise Functions",
        examples: [
            {
                title: "Example: Absolute Value Equation",
                content: `
                    <h2>Example: Absolute Value Equation</h2>
                    <p>Solve: |x - 3| = 5</p>
                    <p>Question: What are the solutions?</p>
                    <p>Step 1: Split: x - 3 = 5 or x - 3 = -5</p>
                    <p>Step 2: Solve: x = 8 or x = -2</p>
                    <p>Answer: x = 8 or x = -2</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Piecewise Function",
                content: `
                    <h2>Example: Piecewise Function</h2>
                    <p>f(x) = { x + 1 if x < 0, 2x if x ≥ 0 }, find f(-1)</p>
                    <p>Question: What’s the value?</p>
                    <p>Step 1: Check: -1 < 0, use x + 1</p>
                    <p>Step 2: Compute: -1 + 1 = 0</p>
                    <p>Answer: 0</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Solve: |2x + 1| = 7",
                options: [
                    { text: "A) x = 3 or x = -4", correct: true },
                    { text: "B) x = 7 or x = -7", correct: false },
                    { text: "C) x = 3 only", correct: false },
                    { text: "D) x = -4 only", correct: false }
                ],
                explanation: "2x + 1 = 7 or 2x + 1 = -7, x = 3 or x = -4."
            },
            {
                title: "Question 2",
                question: "f(x) = { x if x > 0, -x if x ≤ 0 }, find f(-2)",
                options: [
                    { text: "A) 2", correct: true },
                    { text: "B) -2", correct: false },
                    { text: "C) 0", correct: false },
                    { text: "D) -1", correct: false }
                ],
                explanation: "-2 ≤ 0, so f(-2) = -(-2) = 2."
            }
        ],
        additionalExample: {
            title: "Example: Absolute Value Inequality",
            content: `
                <h2>Example: Absolute Value Inequality</h2>
                <p>Solve: |x + 2| < 4</p>
                <p>Question: What’s the solution?</p>
                <p>Step 1: Rewrite: -4 < x + 2 < 4</p>
                <p>Step 2: Solve: -6 < x < 2</p>
                <p>Answer: -6 < x < 2</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    8: {
        title: "Trigonometric Functions and Identities",
        examples: [
            {
                title: "Example: Solving Trig Equation",
                content: `
                    <h2>Example: Solving Trig Equation</h2>
                    <p>Solve: sin(x) = 0.5 (0 ≤ x < 2π)</p>
                    <p>Question: What are the solutions?</p>
                    <p>Step 1: Reference: sin(π/6) = 0.5</p>
                    <p>Step 2: Solve: x = π/6, 5π/6</p>
                    <p>Answer: x = π/6, 5π/6</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Identity Simplification",
                content: `
                    <h2>Example: Identity Simplification</h2>
                    <p>Simplify: sin²(x) + cos²(x)</p>
                    <p>Question: What’s the result?</p>
                    <p>Step 1: Use identity: sin²(x) + cos²(x) = 1</p>
                    <p>Answer: 1</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Solve: cos(x) = 0 (0 ≤ x < 2π)",
                options: [
                    { text: "A) π/2, 3π/2", correct: true },
                    { text: "B) 0, π", correct: false },
                    { text: "C) π/4, 3π/4", correct: false },
                    { text: "D) π/6, 5π/6", correct: false }
                ],
                explanation: "cos(x) = 0 at π/2 and 3π/2."
            },
            {
                title: "Question 2",
                question: "Simplify: 1 - sin²(x)",
                options: [
                    { text: "A) cos²(x)", correct: true },
                    { text: "B) sin²(x)", correct: false },
                    { text: "C) tan²(x)", correct: false },
                    { text: "D) 1", correct: false }
                ],
                explanation: "1 - sin²(x) = cos²(x) by Pythagorean identity."
            }
        ],
        additionalExample: {
            title: "Example: Trig Application",
            content: `
                <h2>Example: Trig Application</h2>
                <p>If tan(x) = 3/4, find sin(x) (assume x in Q1)</p>
                <p>Question: What’s sin(x)?</p>
                <p>Step 1: Hypotenuse: √(3² + 4²) = 5</p>
                <p>Step 2: sin(x) = opposite/hyp = 3/5</p>
                <p>Answer: 3/5</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Advanced Math question arrays
const nonlinearQuestions = [
    {
        question: "Solve: x² - 16 = 0",
        answers: [
            { text: "A) x = ±4", correct: true },
            { text: "B) x = 4", correct: false },
            { text: "C) x = -4", correct: false },
            { text: "D) x = 0", correct: false }
        ],
        explanation: "x² = 16, so x = ±4.",
        difficulty: "easy",
        category: "advanced-math"
    }
];

const nonlinearSystemsQuestions = [
    {
        question: "Solve: y = x² - 1, y = 3",
        answers: [
            { text: "A) (2, 3) and (-2, 3)", correct: true },
            { text: "B) (1, 3)", correct: false },
            { text: "C) (0, 0)", correct: false },
            { text: "D) No solutions", correct: false }
        ],
        explanation: "x² - 1 = 3, x² = 4, x = ±2.",
        difficulty: "medium",
        category: "advanced-math"
    }
];

const functionTransformQuestions = [
    {
        question: "f(x) = x² becomes f(x) = 2(x - 1)². What’s the transformation?",
        answers: [
            { text: "A) Right 1, stretch by 2", correct: true },
            { text: "B) Left 1, compress by 2", correct: false },
            { text: "C) Right 1, down 2", correct: false },
            { text: "D) Left 1, up 2", correct: false }
        ],
        explanation: "x - 1 shifts right 1, 2 stretches vertically.",
        difficulty: "medium",
        category: "advanced-math"
    }
];

const complexNumberQuestions = [
    {
        question: "(4 - i) + (2 + 3i) = ?",
        answers: [
            { text: "A) 6 + 2i", correct: true },
            { text: "B) 6 - 2i", correct: false },
            { text: "C) 2 + 4i", correct: false },
            { text: "D) 4 + i", correct: false }
        ],
        explanation: "4 + 2 = 6, -i + 3i = 2i.",
        difficulty: "easy",
        category: "advanced-math"
    }
];

const polynomialDivisionQuestions = [
    {
        question: "P(x) = x³ - 1, find P(1)",
        answers: [
            { text: "A) 0", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) -1", correct: false },
            { text: "D) 3", correct: false }
        ],
        explanation: "1³ - 1 = 0, so remainder is 0.",
        difficulty: "medium",
        category: "advanced-math"
    }
];

const rationalExponentQuestions = [
    {
        question: "Simplify: 8^(2/3)",
        answers: [
            { text: "A) 4", correct: true },
            { text: "B) 2", correct: false },
            { text: "C) 8", correct: false },
            { text: "D) 16", correct: false }
        ],
        explanation: "(8^(1/3))² = 2² = 4.",
        difficulty: "medium",
        category: "advanced-math"
    }
];

const absolutePiecewiseQuestions = [
    {
        question: "Solve: |x + 3| = 6",
        answers: [
            { text: "A) x = 3 or x = -9", correct: true },
            { text: "B) x = 6 or x = -6", correct: false },
            { text: "C) x = 3 only", correct: false },
            { text: "D) x = -9 only", correct: false }
        ],
        explanation: "x + 3 = 6 or x + 3 = -6, x = 3 or -9.",
        difficulty: "easy",
        category: "advanced-math"
    }
];

const trigFunctionQuestions = [
    {
        question: "Solve: sin(x) = 1 (0 ≤ x < 2π)",
        answers: [
            { text: "A) π/2", correct: true },
            { text: "B) π", correct: false },
            { text: "C) 0", correct: false },
            { text: "D) 3π/2", correct: false }
        ],
        explanation: "sin(x) = 1 at x = π/2.",
        difficulty: "medium",
        category: "advanced-math"
    }
];

// lesson-advanced-math.js

let categoryStats = {
    "advanced-math": { correct: 0, incorrect: 0 }
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
            categoryStats["advanced-math"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["advanced-math"].incorrect++;
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
            categoryStats["advanced-math"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["advanced-math"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = nonlinearQuestions; break;
        case 2: quizQuestions = nonlinearSystemsQuestions; break;
        case 3: quizQuestions = functionTransformQuestions; break;
        case 4: quizQuestions = complexNumberQuestions; break;
        case 5: quizQuestions = polynomialDivisionQuestions; break;
        case 6: quizQuestions = rationalExponentQuestions; break;
        case 7: quizQuestions = absolutePiecewiseQuestions; break;
        case 8: quizQuestions = trigFunctionQuestions; break;
        default: quizQuestions = nonlinearQuestions;
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
    localStorage.setItem(`advanced-math-lessonScore-${lessonId}`, score);
    console.log(`Saved advanced-math-lessonScore-${lessonId}: ${score}`);
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