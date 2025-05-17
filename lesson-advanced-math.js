// Ensure scores display on page load by calling showScore
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButton = document.getElementById('start-math-lesson');
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
        content: [
            {
                type: "example",
                title: "Example 1: Solving a Quadratic",
                content: `
                    <h2>Example 1: Solving a Quadratic</h2>
                    <p>Equation: x² - 5x + 6 = 0</p>
                    <p>Step 1: Factor: (x - 2)(x - 3) = 0</p>
                    <p>Step 2: Solve: x - 2 = 0 or x - 3 = 0</p>
                    <p>Solution: x = 2 or x = 3</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
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
                type: "example",
                title: "Example 2: Graphing a Parabola",
                content: `
                    <h2>Example 2: Graphing a Parabola</h2>
                    <p>Function: y = x² - 4</p>
                    <p>Step 1: Set y = 0: 0 = x² - 4</p>
                    <p>Step 2: Solve: x² = 4, so x = ±2</p>
                    <p>Answer: Crosses x-axis at x = -2 and x = 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Where does y = x² - 1 cross the x-axis?",
                options: [
                    { text: "A) x = ±1", correct: true },
                    { text: "B) x = 1", correct: false },
                    { text: "C) x = -1", correct: false },
                    { text: "D) x = 0", correct: false }
                ],
                explanation: "Set y = 0: x² - 1 = 0, x² = 1, x = ±1."
            },
            {
                type: "example",
                title: "Example 3: Nonlinear Inequality",
                content: `
                    <h2>Example 3: Nonlinear Inequality</h2>
                    <p>Inequality: x² - 4 > 0</p>
                    <p>Step 1: Solve: x² > 4, x < -2 or x > 2</p>
                    <p>Step 2: Test: x = 0 gives -4 < 0, false</p>
                    <p>Solution: x < -2 or x > 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Solve: x² - 16 ≥ 0",
                options: [
                    { text: "A) x ≤ -4 or x ≥ 4", correct: true },
                    { text: "B) -4 < x < 4", correct: false },
                    { text: "C) x = ±4", correct: false },
                    { text: "D) All real numbers", correct: false }
                ],
                explanation: "x² ≥ 16, x ≤ -4 or x ≥ 4."
            },
            {
                type: "example",
                title: "Example 4: Cubic Equation",
                content: `
                    <h2>Example 4: Cubic Equation</h2>
                    <p>Equation: x³ - 8 = 0</p>
                    <p>Step 1: Rewrite: x³ = 8</p>
                    <p>Step 2: Solve: x = 2 (real root)</p>
                    <p>Solution: x = 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Solve: x³ - 27 = 0",
                options: [
                    { text: "A) x = 3", correct: true },
                    { text: "B) x = ±3", correct: false },
                    { text: "C) x = 9", correct: false },
                    { text: "D) x = -3", correct: false }
                ],
                explanation: "x³ = 27, x = 3 (real root)."
            },
            {
                type: "example",
                title: "Example 5: Rational Function",
                content: `
                    <h2>Example 5: Rational Function</h2>
                    <p>Function: y = 1/(x - 2)</p>
                    <p>Step 1: Find vertical asymptote: x - 2 = 0</p>
                    <p>Step 2: Solve: x = 2</p>
                    <p>Answer: Vertical asymptote at x = 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Find the vertical asymptote of y = 3/(x + 1)",
                options: [
                    { text: "A) x = -1", correct: true },
                    { text: "B) x = 1", correct: false },
                    { text: "C) x = 3", correct: false },
                    { text: "D) x = 0", correct: false }
                ],
                explanation: "x + 1 = 0, x = -1."
            },
            {
                type: "example",
                title: "Example 6: Exponential Equation",
                content: `
                    <h2>Example 6: Exponential Equation</h2>
                    <p>Equation: 2^x = 8</p>
                    <p>Step 1: Rewrite: 2^x = 2³</p>
                    <p>Step 2: Solve: x = 3</p>
                    <p>Solution: x = 3</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Solve: 3^x = 9",
                options: [
                    { text: "A) x = 2", correct: true },
                    { text: "B) x = 3", correct: false },
                    { text: "C) x = 1", correct: false },
                    { text: "D) x = 9", correct: false }
                ],
                explanation: "3^x = 3², x = 2."
            },
            {
                type: "example",
                title: "Example 7: Absolute Value Equation",
                content: `
                    <h2>Example 7: Absolute Value Equation</h2>
                    <p>Equation: |x - 1| = 4</p>
                    <p>Step 1: Split: x - 1 = 4 or x - 1 = -4</p>
                    <p>Step 2: Solve: x = 5 or x = -3</p>
                    <p>Solution: x = 5 or x = -3</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Solve: |x + 2| = 5",
                options: [
                    { text: "A) x = 3 or x = -7", correct: true },
                    { text: "B) x = 5 or x = -5", correct: false },
                    { text: "C) x = 2 or x = -2", correct: false },
                    { text: "D) x = 7 or x = -3", correct: false }
                ],
                explanation: "x + 2 = 5 or x + 2 = -5, x = 3 or x = -7."
            }
        ]
    },
    2: {
        title: "Systems of Equations with Nonlinear Functions",
        content: [
            {
                type: "example",
                title: "Example 1: Linear and Quadratic",
                content: `
                    <h2>Example 1: Linear and Quadratic</h2>
                    <p>System: y = x + 1, y = x²</p>
                    <p>Step 1: Substitute: x + 1 = x²</p>
                    <p>Step 2: Solve: x² - x - 1 = 0, x = (1 ± √5)/2</p>
                    <p>Solution: ( (1 + √5)/2 , (3 + √5)/2 ), ( (1 - √5)/2 , (3 - √5)/2 )</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
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
                type: "example",
                title: "Example 2: Two Quadratics",
                content: `
                    <h2>Example 2: Two Quadratics</h2>
                    <p>System: y = x² - 4, y = 2 - x²</p>
                    <p>Step 1: Set equal: x² - 4 = 2 - x²</p>
                    <p>Step 2: Solve: 2x² = 6, x² = 3, x = ±√3</p>
                    <p>Solution: (√3, -1), (-√3, -1)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Solve: y = x², y = 4 - x²",
                options: [
                    { text: "A) (√2, 2) and (-√2, 2)", correct: true },
                    { text: "B) (2, 4)", correct: false },
                    { text: "C) (0, 0)", correct: false },
                    { text: "D) (1, 1)", correct: false }
                ],
                explanation: "x² = 4 - x², 2x² = 4, x² = 2, x = ±√2."
            },
            {
                type: "example",
                title: "Example 3: Circle and Line",
                content: `
                    <h2>Example 3: Circle and Line</h2>
                    <p>System: x² + y² = 4, y = x</p>
                    <p>Step 1: Substitute: x² + x² = 4</p>
                    <p>Step 2: Solve: 2x² = 4, x² = 2, x = ±√2</p>
                    <p>Solution: (√2, √2), (-√2, -√2)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Solve: x² + y² = 1, y = -x",
                options: [
                    { text: "A) (√2/2, -√2/2) and (-√2/2, √2/2)", correct: true },
                    { text: "B) (1, -1)", correct: false },
                    { text: "C) (0, 0)", correct: false },
                    { text: "D) No solutions", correct: false }
                ],
                explanation: "x² + (-x)² = 1, 2x² = 1, x² = 1/2, x = ±√2/2."
            },
            {
                type: "example",
                title: "Example 4: Exponential and Linear",
                content: `
                    <h2>Example 4: Exponential and Linear</h2>
                    <p>System: y = 2^x, y = x + 1</p>
                    <p>Step 1: Substitute: 2^x = x + 1</p>
                    <p>Step 2: Test: x = 1 gives 2 = 2, x = 2 gives 4 > 3</p>
                    <p>Solution: (1, 2) (approximate, test values)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Solve: y = 3^x, y = x + 2",
                options: [
                    { text: "A) (1, 3)", correct: true },
                    { text: "B) (2, 9)", correct: false },
                    { text: "C) (0, 1)", correct: false },
                    { text: "D) No solutions", correct: false }
                ],
                explanation: "3^x = x + 2, test x = 1: 3 = 3, true."
            },
            {
                type: "example",
                title: "Example 5: Quadratic and Absolute Value",
                content: `
                    <h2>Example 5: Quadratic and Absolute Value</h2>
                    <p>System: y = x² - 1, y = |x|</p>
                    <p>Step 1: Cases: x ≥ 0: x² - 1 = x, x < 0: x² - 1 = -x</p>
                    <p>Step 2: Solve: x² - x - 1 = 0, x = (1 ± √5)/2; x² + x - 1 = 0, no real</p>
                    <p>Solution: ((1 + √5)/2, (1 + √5)/2)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Solve: y = x² - 4, y = |x|",
                options: [
                    { text: "A) (2, 2) and (-2, 2)", correct: true },
                    { text: "B) (1, 1)", correct: false },
                    { text: "C) (0, 0)", correct: false },
                    { text: "D) No solutions", correct: false }
                ],
                explanation: "x ≥ 0: x² - 4 = x, x = 2; x < 0: x² - 4 = -x, x = -2."
            },
            {
                type: "example",
                title: "Example 6: Hyperbola and Line",
                content: `
                    <h2>Example 6: Hyperbola and Line</h2>
                    <p>System: xy = 4, y = x - 2</p>
                    <p>Step 1: Substitute: x(x - 2) = 4</p>
                    <p>Step 2: Solve: x² - 2x - 4 = 0, x = 1 ± √5</p>
                    <p>Solution: (1 + √5, -1 + √5), (1 - √5, -1 - √5)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Solve: xy = 6, y = x - 1",
                options: [
                    { text: "A) (3, 2) and (-2, -3)", correct: true },
                    { text: "B) (2, 3)", correct: false },
                    { text: "C) (1, 6)", correct: false },
                    { text: "D) No solutions", correct: false }
                ],
                explanation: "x(x - 1) = 6, x² - x - 6 = 0, x = 3 or -2."
            },
            {
                type: "example",
                title: "Example 7: Circle and Quadratic",
                content: `
                    <h2>Example 7: Circle and Quadratic</h2>
                    <p>System: x² + y² = 9, y = x² - 3</p>
                    <p>Step 1: Substitute: x² + (x² - 3)² = 9</p>
                    <p>Step 2: Simplify: x⁴ - 5x² + 6 = 0, x² = 2 or 3</p>
                    <p>Solution: (±√2, -1), (±√3, 0)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Solve: x² + y² = 4, y = x² - 2",
                options: [
                    { text: "A) (√2, 0) and (-√2, 0)", correct: true },
                    { text: "B) (1, -1)", correct: false },
                    { text: "C) (0, -2)", correct: false },
                    { text: "D) No solutions", correct: false }
                ],
                explanation: "x² + (x² - 2)² = 4, x⁴ - 3x² = 0, x² = 2, x = ±√2."
            }
        ]
    },
    3: {
        title: "Function Transformations and Composition",
        content: [
            {
                type: "example",
                title: "Example 1: Transformation",
                content: `
                    <h2>Example 1: Transformation</h2>
                    <p>Function: f(x) = x², g(x) = (x - 3)² + 2</p>
                    <p>Step 1: Analyze: x - 3 shifts right, +2 shifts up</p>
                    <p>Answer: Right 3 units, up 2 units</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
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
                type: "example",
                title: "Example 2: Composition",
                content: `
                    <h2>Example 2: Composition</h2>
                    <p>f(x) = 2x, g(x) = x + 1, (f ∘ g)(x) = ?</p>
                    <p>Step 1: Substitute: f(g(x)) = f(x + 1)</p>
                    <p>Step 2: Compute: 2(x + 1) = 2x + 2</p>
                    <p>Answer: 2x + 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "f(x) = x - 2, g(x) = x², (g ∘ f)(x) = ?",
                options: [
                    { text: "A) (x - 2)²", correct: true },
                    { text: "B) x² - 2", correct: false },
                    { text: "C) x² + 4", correct: false },
                    { text: "D) x - 4", correct: false }
                ],
                explanation: "g(f(x)) = g(x - 2) = (x - 2)²."
            },
            {
                type: "example",
                title: "Example 3: Vertical Stretch",
                content: `
                    <h2>Example 3: Vertical Stretch</h2>
                    <p>f(x) = x², g(x) = 3x²</p>
                    <p>Step 1: Analyze: 3 multiplies output</p>
                    <p>Answer: Vertical stretch by factor 3</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "f(x) = x becomes f(x) = -2x. What’s the transformation?",
                options: [
                    { text: "A) Reflect over x-axis, stretch by 2", correct: true },
                    { text: "B) Reflect over y-axis, stretch by 2", correct: false },
                    { text: "C) Stretch by 2 only", correct: false },
                    { text: "D) Reflect over x-axis only", correct: false }
                ],
                explanation: "- reflects over x-axis, 2 stretches vertically."
            },
            {
                type: "example",
                title: "Example 4: Horizontal Shift",
                content: `
                    <h2>Example 4: Horizontal Shift</h2>
                    <p>f(x) = √x, g(x) = √(x + 4)</p>
                    <p>Step 1: Analyze: x + 4 shifts input</p>
                    <p>Answer: Left 4 units</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "f(x) = √x becomes f(x) = √(x - 2). What’s the transformation?",
                options: [
                    { text: "A) Right 2", correct: true },
                    { text: "B) Left 2", correct: false },
                    { text: "C) Up 2", correct: false },
                    { text: "D) Down 2", correct: false }
                ],
                explanation: "x - 2 shifts right 2."
            },
            {
                type: "example",
                title: "Example 5: Composition with Square Root",
                content: `
                    <h2>Example 5: Composition with Square Root</h2>
                    <p>f(x) = √x, g(x) = 2x + 3, (f ∘ g)(x) = ?</p>
                    <p>Step 1: Substitute: f(g(x)) = f(2x + 3)</p>
                    <p>Step 2: Compute: √(2x + 3)</p>
                    <p>Answer: √(2x + 3)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "f(x) = x², g(x) = x - 1, (f ∘ g)(x) = ?",
                options: [
                    { text: "A) (x - 1)²", correct: true },
                    { text: "B) x² - 1", correct: false },
                    { text: "C) x² + 1", correct: false },
                    { text: "D) x - 2", correct: false }
                ],
                explanation: "f(g(x)) = f(x - 1) = (x - 1)²."
            },
            {
                type: "example",
                title: "Example 6: Reflection",
                content: `
                    <h2>Example 6: Reflection</h2>
                    <p>f(x) = x³, g(x) = -x³</p>
                    <p>Step 1: Analyze: - flips output</p>
                    <p>Answer: Reflection over x-axis</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "f(x) = x³ becomes f(x) = (-x)³. What’s the transformation?",
                options: [
                    { text: "A) Reflect over y-axis", correct: true },
                    { text: "B) Reflect over x-axis", correct: false },
                    { text: "C) Stretch by 3", correct: false },
                    { text: "D) No change", correct: false }
                ],
                explanation: "(-x) reflects over y-axis."
            },
            {
                type: "example",
                title: "Example 7: Combined Transformations",
                content: `
                    <h2>Example 7: Combined Transformations</h2>
                    <p>f(x) = |x|, g(x) = 2|x + 1| - 3</p>
                    <p>Step 1: Analyze: +1 left, 2 stretch, -3 down</p>
                    <p>Answer: Left 1, stretch by 2, down 3</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "f(x) = |x| becomes f(x) = -|x - 2| + 1. What’s the transformation?",
                options: [
                    { text: "A) Right 2, reflect over x-axis, up 1", correct: true },
                    { text: "B) Left 2, reflect over y-axis, down 1", correct: false },
                    { text: "C) Right 2, up 1", correct: false },
                    { text: "D) Left 2, down 1", correct: false }
                ],
                explanation: "x - 2 right 2, - reflect over x-axis, +1 up 1."
            }
        ]
    },
    4: {
        title: "Complex Numbers",
        content: [
            {
                type: "example",
                title: "Example 1: Adding Complex Numbers",
                content: `
                    <h2>Example 1: Adding Complex Numbers</h2>
                    <p>(3 + 2i) + (1 - 4i) = ?</p>
                    <p>Step 1: Combine real: 3 + 1 = 4</p>
                    <p>Step 2: Combine imaginary: 2i - 4i = -2i</p>
                    <p>Answer: 4 - 2i</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
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
                type: "example",
                title: "Example 2: Multiplying Complex Numbers",
                content: `
                    <h2>Example 2: Multiplying Complex Numbers</h2>
                    <p>(2 + i)(3 - i) = ?</p>
                    <p>Step 1: FOIL: 6 - 2i + 3i - i²</p>
                    <p>Step 2: Simplify: 6 + i - (-1) = 7 + i</p>
                    <p>Answer: 7 + i</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "(1 + 2i)(1 - 2i) = ?",
                options: [
                    { text: "A) 5", correct: true },
                    { text: "B) 1 - 4i", correct: false },
                    { text: "C) 4i", correct: false },
                    { text: "D) -3", correct: false }
                ],
                explanation: "1 - 2i + 2i - 4i² = 1 - 4(-1) = 5."
            },
            {
                type: "example",
                title: "Example 3: Complex Conjugate",
                content: `
                    <h2>Example 3: Complex Conjugate</h2>
                    <p>Number: 3 + 4i</p>
                    <p>Step 1: Flip sign of imaginary part</p>
                    <p>Answer: 3 - 4i</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "What is the conjugate of 2 - 5i?",
                options: [
                    { text: "A) 2 + 5i", correct: true },
                    { text: "B) -2 + 5i", correct: false },
                    { text: "C) 2 - 5i", correct: false },
                    { text: "D) -2 - 5i", correct: false }
                ],
                explanation: "Flip imaginary sign: 2 + 5i."
            },
            {
                type: "example",
                title: "Example 4: Division of Complex Numbers",
                content: `
                    <h2>Example 4: Division of Complex Numbers</h2>
                    <p>(3 + i) / (1 + i) = ?</p>
                    <p>Step 1: Multiply by conjugate: (3 + i)(1 - i) / (1 + i)(1 - i)</p>
                    <p>Step 2: Compute: (4 - 2i) / 2 = 2 - i</p>
                    <p>Answer: 2 - i</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "(4 + 2i) / (2 + i) = ?",
                options: [
                    { text: "A) 2", correct: true },
                    { text: "B) 2 + i", correct: false },
                    { text: "C) 1 + i", correct: false },
                    { text: "D) 4 - 2i", correct: false }
                ],
                explanation: "(4 + 2i)(2 - i) / (4 + 1) = 10 / 5 = 2."
            },
            {
                type: "example",
                title: "Example 5: Magnitude of Complex Number",
                content: `
                    <h2>Example 5: Magnitude of Complex Number</h2>
                    <p>Number: 3 + 4i</p>
                    <p>Step 1: Magnitude = √(3² + 4²)</p>
                    <p>Step 2: Compute: √25 = 5</p>
                    <p>Answer: 5</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "What is the magnitude of 5 + 12i?",
                options: [
                    { text: "A) 13", correct: true },
                    { text: "B) 17", correct: false },
                    { text: "C) 7", correct: false },
                    { text: "D) 10", correct: false }
                ],
                explanation: "√(5² + 12²) = √169 = 13."
            },
            {
                type: "example",
                title: "Example 6: Powers of i",
                content: `
                    <h2>Example 6: Powers of i</h2>
                    <p>Compute: i^3</p>
                    <p>Step 1: i² = -1, i³ = i² * i</p>
                    <p>Step 2: Compute: -1 * i = -i</p>
                    <p>Answer: -i</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "What is i^4?",
                options: [
                    { text: "A) 1", correct: true },
                    { text: "B) -1", correct: false },
                    { text: "C) i", correct: false },
                    { text: "D) -i", correct: false }
                ],
                explanation: "i^4 = (i²)² = (-1)² = 1."
            },
            {
                type: "example",
                title: "Example 7: Solving Quadratic with Complex Roots",
                content: `
                    <h2>Example 7: Solving Quadratic with Complex Roots</h2>
                    <p>Equation: x² + 1 = 0</p>
                    <p>Step 1: x² = -1</p>
                    <p>Step 2: Solve: x = ±i</p>
                    <p>Answer: x = i or x = -i</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Solve: x² + 4 = 0",
                options: [
                    { text: "A) x = ±2i", correct: true },
                    { text: "B) x = ±2", correct: false },
                    { text: "C) x = ±4i", correct: false },
                    { text: "D) No real solutions", correct: false }
                ],
                explanation: "x² = -4, x = ±2i."
            }
        ]
    },


    5: {
        title: "Polynomial Division and Remainder Theorem",
        content: [
            {
                type: "example",
                title: "Example 1: Polynomial Division",
                content: `
                    <h2>Example 1: Polynomial Division</h2>
                    <p>Divide: (x³ - 2x² + 3) ÷ (x - 1)</p>
                    <p>Step 1: Synthetic: 1 | 1 -2 0 3</p>
                    <p>Step 2: Compute: 1 1 -1 2, quotient x² + x - 1, remainder 2</p>
                    <p>Answer: x² + x - 1 + 2/(x - 1)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
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
                type: "example",
                title: "Example 2: Remainder Theorem",
                content: `
                    <h2>Example 2: Remainder Theorem</h2>
                    <p>P(x) = x³ - 8, find P(2)</p>
                    <p>Step 1: Substitute: 2³ - 8 = 8 - 8</p>
                    <p>Answer: 0 (so x - 2 is a factor)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "P(x) = x² - 5x + 6, find P(3)",
                options: [
                    { text: "A) 0", correct: true },
                    { text: "B) 6", correct: false },
                    { text: "C) 3", correct: false },
                    { text: "D) -6", correct: false }
                ],
                explanation: "3² - 5(3) + 6 = 9 - 15 + 6 = 0."
            },
            {
                type: "example",
                title: "Example 3: Factor Check",
                content: `
                    <h2>Example 3: Factor Check</h2>
                    <p>P(x) = x³ + 1, find P(-1)</p>
                    <p>Step 1: Substitute: (-1)³ + 1 = -1 + 1</p>
                    <p>Answer: 0 (yes, x + 1 is a factor)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "P(x) = x³ - 1, find P(1)",
                options: [
                    { text: "A) 0", correct: true },
                    { text: "B) 1", correct: false },
                    { text: "C) -1", correct: false },
                    { text: "D) 3", correct: false }
                ],
                explanation: "1³ - 1 = 0."
            },
            {
                type: "example",
                title: "Example 4: Long Division",
                content: `
                    <h2>Example 4: Long Division</h2>
                    <p>Divide: (2x³ - 3x² + x - 1) ÷ (x - 1)</p>
                    <p>Step 1: Divide leading: 2x²</p>
                    <p>Step 2: Full process: 2x² - x + 1, remainder 0</p>
                    <p>Answer: 2x² - x + 1</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Divide (x³ + 2x - 3) by (x - 1). What’s the remainder?",
                options: [
                    { text: "A) 0", correct: true },
                    { text: "B) 1", correct: false },
                    { text: "C) 2", correct: false },
                    { text: "D) -3", correct: false }
                ],
                explanation: "P(1) = 1³ + 2(1) - 3 = 0."
            },
            {
                type: "example",
                title: "Example 5: Synthetic Division with Zero",
                content: `
                    <h2>Example 5: Synthetic Division with Zero</h2>
                    <p>Divide: (x³ - 2x + 1) ÷ (x + 1)</p>
                    <p>Step 1: Synthetic: -1 | 1 0 -2 1</p>
                    <p>Step 2: Compute: 1 -1 1 -2, quotient x² - x + 1, remainder -2</p>
                    <p>Answer: x² - x + 1 - 2/(x + 1)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Divide (x³ - x² - 2) by (x + 2). What’s the remainder?",
                options: [
                    { text: "A) 6", correct: true },
                    { text: "B) 0", correct: false },
                    { text: "C) -2", correct: false },
                    { text: "D) 4", correct: false }
                ],
                explanation: "P(-2) = (-2)³ - (-2)² - 2 = -8 - 4 - 2 = -14 + 8 = 6."
            },
            {
                type: "example",
                title: "Example 6: Polynomial Factorization",
                content: `
                    <h2>Example 6: Polynomial Factorization</h2>
                    <p>P(x) = x³ - 3x² + 2x</p>
                    <p>Step 1: Factor: x(x² - 3x + 2) = x(x - 1)(x - 2)</p>
                    <p>Answer: Roots at x = 0, 1, 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Factor: x³ - 4x",
                options: [
                    { text: "A) x(x - 2)(x + 2)", correct: true },
                    { text: "B) x(x - 4)", correct: false },
                    { text: "C) (x - 2)(x + 2)", correct: false },
                    { text: "D) x(x² - 2)", correct: false }
                ],
                explanation: "x(x² - 4) = x(x - 2)(x + 2)."
            },
            {
                type: "example",
                title: "Example 7: Remainder Theorem Application",
                content: `
                    <h2>Example 7: Remainder Theorem Application</h2>
                    <p>P(x) = 2x³ - x + 1, find P(-1)</p>
                    <p>Step 1: Substitute: 2(-1)³ - (-1) + 1</p>
                    <p>Step 2: Compute: -2 + 1 + 1 = 0</p>
                    <p>Answer: 0 (x + 1 is a factor)</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "P(x) = x³ + 2x² - x - 2, find P(-2)",
                options: [
                    { text: "A) 0", correct: true },
                    { text: "B) 2", correct: false },
                    { text: "C) -2", correct: false },
                    { text: "D) 4", correct: false }
                ],
                explanation: "(-2)³ + 2(-2)² - (-2) - 2 = -8 + 8 + 2 - 2 = 0."
            }
        ]
    },
    6: {
        title: "Rational Exponents and Radical Equations",
        content: [
            {
                type: "example",
                title: "Example 1: Rational Exponent",
                content: `
                    <h2>Example 1: Rational Exponent</h2>
                    <p>Simplify: 16^(3/4)</p>
                    <p>Step 1: Rewrite: (16^(1/4))³</p>
                    <p>Step 2: Compute: (2)³ = 8</p>
                    <p>Answer: 8</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
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
                type: "example",
                title: "Example 2: Radical Equation",
                content: `
                    <h2>Example 2: Radical Equation</h2>
                    <p>Solve: √(x + 2) = 3</p>
                    <p>Step 1: Square both sides: x + 2 = 9</p>
                    <p>Step 2: Solve: x = 7</p>
                    <p>Answer: x = 7</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Solve: √(x - 1) = 4",
                options: [
                    { text: "A) 17", correct: true },
                    { text: "B) 15", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) 1", correct: false }
                ],
                explanation: "x - 1 = 16, x = 17."
            },
            {
                type: "example",
                title: "Example 3: Radical with Check",
                content: `
                    <h2>Example 3: Radical with Check</h2>
                    <p>Solve: √(2x - 1) = 5</p>
                    <p>Step 1: Square: 2x - 1 = 25</p>
                    <p>Step 2: Solve: 2x = 26, x = 13</p>
                    <p>Check: √(26 - 1) = √25 = 5, true</p>
                    <p>Answer: x = 13</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Solve: √(3x + 1) = 2",
                options: [
                    { text: "A) 1", correct: true },
                    { text: "B) 2", correct: false },
                    { text: "C) 3", correct: false },
                    { text: "D) 0", correct: false }
                ],
                explanation: "3x + 1 = 4, 3x = 3, x = 1."
            },
            {
                type: "example",
                title: "Example 4: Fractional Exponent",
                content: `
                    <h2>Example 4: Fractional Exponent</h2>
                    <p>Simplify: 9^(3/2)</p>
                    <p>Step 1: Rewrite: (9^(1/2))³</p>
                    <p>Step 2: Compute: (3)³ = 27</p>
                    <p>Answer: 27</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Simplify: 4^(3/2)",
                options: [
                    { text: "A) 8", correct: true },
                    { text: "B) 4", correct: false },
                    { text: "C) 6", correct: false },
                    { text: "D) 12", correct: false }
                ],
                explanation: "(4^(1/2))³ = 2³ = 8."
            },
            {
                type: "example",
                title: "Example 5: Radical with Extraneous Solution",
                content: `
                    <h2>Example 5: Radical with Extraneous Solution</h2>
                    <p>Solve: √(x + 3) = x - 1</p>
                    <p>Step 1: Square: x + 3 = (x - 1)²</p>
                    <p>Step 2: Solve: x + 3 = x² - 2x + 1, x² - 3x - 2 = 0</p>
                    <p>Step 3: x = (3 ± √17)/2, check: x = (3 + √17)/2 works, other fails</p>
                    <p>Answer: x = (3 + √17)/2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Solve: √(x + 2) = x - 2",
                options: [
                    { text: "A) 2", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) -2", correct: false },
                    { text: "D) No solution", correct: false }
                ],
                explanation: "x + 2 = (x - 2)², x = 2 works, x = -1 fails."
            },
            {
                type: "example",
                title: "Example 6: Negative Exponent",
                content: `
                    <h2>Example 6: Negative Exponent</h2>
                    <p>Simplify: 25^(-1/2)</p>
                    <p>Step 1: Rewrite: 1 / (25^(1/2))</p>
                    <p>Step 2: Compute: 1 / 5</p>
                    <p>Answer: 1/5</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Simplify: 16^(-3/4)",
                options: [
                    { text: "A) 1/8", correct: true },
                    { text: "B) 1/4", correct: false },
                    { text: "C) 1/16", correct: false },
                    { text: "D) 1/2", correct: false }
                ],
                explanation: "1 / (16^(3/4)) = 1 / 8."
            },
            {
                type: "example",
                title: "Example 7: Cube Root Equation",
                content: `
                    <h2>Example 7: Cube Root Equation</h2>
                    <p>Solve: ∛(x - 1) = 2</p>
                    <p>Step 1: Cube both sides: x - 1 = 8</p>
                    <p>Step 2: Solve: x = 9</p>
                    <p>Answer: x = 9</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Solve: ∛(x + 2) = 3",
                options: [
                    { text: "A) 25", correct: true },
                    { text: "B) 27", correct: false },
                    { text: "C) 9", correct: false },
                    { text: "D) 7", correct: false }
                ],
                explanation: "x + 2 = 27, x = 25."
            }
        ]
    },
    7: {
        title: "Absolute Value and Piecewise Functions",
        content: [
            {
                type: "example",
                title: "Example 1: Absolute Value Equation",
                content: `
                    <h2>Example 1: Absolute Value Equation</h2>
                    <p>Solve: |x - 3| = 5</p>
                    <p>Step 1: Split: x - 3 = 5 or x - 3 = -5</p>
                    <p>Step 2: Solve: x = 8 or x = -2</p>
                    <p>Answer: x = 8 or x = -2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
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
                type: "example",
                title: "Example 2: Piecewise Function",
                content: `
                    <h2>Example 2: Piecewise Function</h2>
                    <p>f(x) = { x + 1 if x < 0, 2x if x ≥ 0 }, find f(-1)</p>
                    <p>Step 1: Check: -1 < 0, use x + 1</p>
                    <p>Step 2: Compute: -1 + 1 = 0</p>
                    <p>Answer: 0</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "f(x) = { x if x > 0, -x if x ≤ 0 }, find f(-2)",
                options: [
                    { text: "A) 2", correct: true },
                    { text: "B) -2", correct: false },
                    { text: "C) 0", correct: false },
                    { text: "D) -1", correct: false }
                ],
                explanation: "-2 ≤ 0, so f(-2) = -(-2) = 2."
            },
            {
                type: "example",
                title: "Example 3: Absolute Value Inequality",
                content: `
                    <h2>Example 3: Absolute Value Inequality</h2>
                    <p>Solve: |x + 2| < 4</p>
                    <p>Step 1: Rewrite: -4 < x + 2 < 4</p>
                    <p>Step 2: Solve: -6 < x < 2</p>
                    <p>Answer: -6 < x < 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Solve: |x - 1| ≤ 3",
                options: [
                    { text: "A) -2 ≤ x ≤ 4", correct: true },
                    { text: "B) 1 ≤ x ≤ 3", correct: false },
                    { text: "C) x ≤ 4", correct: false },
                    { text: "D) x ≥ -2", correct: false }
                ],
                explanation: "-3 ≤ x - 1 ≤ 3, -2 ≤ x ≤ 4."
            },
            {
                type: "example",
                title: "Example 4: Piecewise Evaluation",
                content: `
                    <h2>Example 4: Piecewise Evaluation</h2>
                    <p>f(x) = { x² if x < 1, x + 1 if x ≥ 1 }, find f(2)</p>
                    <p>Step 1: Check: 2 ≥ 1, use x + 1</p>
                    <p>Step 2: Compute: 2 + 1 = 3</p>
                    <p>Answer: 3</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "f(x) = { 2x if x ≤ 0, x² if x > 0 }, find f(0)",
                options: [
                    { text: "A) 0", correct: true },
                    { text: "B) 1", correct: false },
                    { text: "C) 2", correct: false },
                    { text: "D) -1", correct: false }
                ],
                explanation: "0 ≤ 0, so f(0) = 2(0) = 0."
            },
            {
                type: "example",
                title: "Example 5: Greater Than Inequality",
                content: `
                    <h2>Example 5: Greater Than Inequality</h2>
                    <p>Solve: |x - 4| > 2</p>
                    <p>Step 1: Split: x - 4 > 2 or x - 4 < -2</p>
                    <p>Step 2: Solve: x > 6 or x < 2</p>
                    <p>Answer: x < 2 or x > 6</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Solve: |x + 3| > 1",
                options: [
                    { text: "A) x < -4 or x > -2", correct: true },
                    { text: "B) -4 < x < -2", correct: false },
                    { text: "C) x > -3", correct: false },
                    { text: "D) x < -1", correct: false }
                ],
                explanation: "x + 3 > 1 or x + 3 < -1, x > -2 or x < -4."
            },
            {
                type: "example",
                title: "Example 6: Absolute Value with Variable",
                content: `
                    <h2>Example 6: Absolute Value with Variable</h2>
                    <p>Solve: |2x - 1| = x</p>
                    <p>Step 1: Cases: 2x - 1 = x or 2x - 1 = -x</p>
                    <p>Step 2: Solve: x = 1 or 3x = 1, x = 1/3, check x ≥ 1/2</p>
                    <p>Answer: x = 1</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Solve: |x + 1| = 2x",
                options: [
                    { text: "A) x = 1/3", correct: true },
                    { text: "B) x = 1", correct: false },
                    { text: "C) x = -1", correct: false },
                    { text: "D) No solution", correct: false }
                ],
                explanation: "x + 1 = 2x or x + 1 = -2x, x = 1/3 works, -1 fails."
            },
            {
                type: "example",
                title: "Example 7: Three-Part Piecewise",
                content: `
                    <h2>Example 7: Three-Part Piecewise</h2>
                    <p>f(x) = { -x if x < -1, 0 if -1 ≤ x ≤ 1, x if x > 1 }, find f(-2)</p>
                    <p>Step 1: Check: -2 < -1, use -x</p>
                    <p>Step 2: Compute: -(-2) = 2</p>
                    <p>Answer: 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "f(x) = { 1 if x < 0, x if 0 ≤ x < 2, 3 if x ≥ 2 }, find f(1)",
                options: [
                    { text: "A) 1", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) 0", correct: false },
                    { text: "D) 2", correct: false }
                ],
                explanation: "0 ≤ 1 < 2, so f(1) = 1."
            }
        ]
    },
    8: {
        title: "Trigonometric Functions and Identities",
        content: [
            {
                type: "example",
                title: "Example 1: Solving Trig Equation",
                content: `
                    <h2>Example 1: Solving Trig Equation</h2>
                    <p>Solve: sin(x) = 0.5 (0 ≤ x < 2π)</p>
                    <p>Step 1: Reference: sin(π/6) = 0.5</p>
                    <p>Step 2: Solve: x = π/6, 5π/6</p>
                    <p>Answer: x = π/6, 5π/6</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
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
                type: "example",
                title: "Example 2: Identity Simplification",
                content: `
                    <h2>Example 2: Identity Simplification</h2>
                    <p>Simplify: sin²(x) + cos²(x)</p>
                    <p>Step 1: Use identity: sin²(x) + cos²(x) = 1</p>
                    <p>Answer: 1</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Simplify: 1 - sin²(x)",
                options: [
                    { text: "A) cos²(x)", correct: true },
                    { text: "B) sin²(x)", correct: false },
                    { text: "C) tan²(x)", correct: false },
                    { text: "D) 1", correct: false }
                ],
                explanation: "1 - sin²(x) = cos²(x) by Pythagorean identity."
            },
            {
                type: "example",
                title: "Example 3: Trig Application",
                content: `
                    <h2>Example 3: Trig Application</h2>
                    <p>If tan(x) = 3/4, find sin(x) (assume x in Q1)</p>
                    <p>Step 1: Hypotenuse: √(3² + 4²) = 5</p>
                    <p>Step 2: sin(x) = opposite/hyp = 3/5</p>
                    <p>Answer: 3/5</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "If tan(x) = 5/12 (Q1), find cos(x)",
                options: [
                    { text: "A) 12/13", correct: true },
                    { text: "B) 5/13", correct: false },
                    { text: "C) 13/12", correct: false },
                    { text: "D) 5/12", correct: false }
                ],
                explanation: "Hyp = √(5² + 12²) = 13, cos(x) = 12/13."
            },
            {
                type: "example",
                title: "Example 4: Solving Cosine",
                content: `
                    <h2>Example 4: Solving Cosine</h2>
                    <p>Solve: cos(x) = -1 (0 ≤ x < 2π)</p>
                    <p>Step 1: Reference: cos(π) = -1</p>
                    <p>Answer: x = π</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Solve: sin(x) = -0.5 (0 ≤ x < 2π)",
                options: [
                    { text: "A) 7π/6, 11π/6", correct: true },
                    { text: "B) π/6, 5π/6", correct: false },
                    { text: "C) π/3, 2π/3", correct: false },
                    { text: "D) π/2, 3π/2", correct: false }
                ],
                explanation: "sin(x) = -0.5 in Q3, Q4: 7π/6, 11π/6."
            },
            {
                type: "example",
                title: "Example 5: Double Angle Identity",
                content: `
                    <h2>Example 5: Double Angle Identity</h2>
                    <p>Simplify: sin(2x) if sin(x) = 3/5 (Q1)</p>
                    <p>Step 1: cos(x) = 4/5, sin(2x) = 2sin(x)cos(x)</p>
                    <p>Step 2: Compute: 2(3/5)(4/5) = 24/25</p>
                    <p>Answer: 24/25</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "If cos(x) = 8/17 (Q1), find cos(2x)",
                options: [
                    { text: "A) 161/289", correct: true },
                    { text: "B) 15/17", correct: false },
                    { text: "C) 8/17", correct: false },
                    { text: "D) -161/289", correct: false }
                ],
                explanation: "sin(x) = 15/17, cos(2x) = 1 - 2sin²(x) = 161/289."
            },
            {
                type: "example",
                title: "Example 6: Reciprocal Identity",
                content: `
                    <h2>Example 6: Reciprocal Identity</h2>
                    <p>Simplify: 1/sin(x) if sin(x) = 1/2</p>
                    <p>Step 1: Use identity: 1/sin(x) = csc(x)</p>
                    <p>Step 2: Compute: 1/(1/2) = 2</p>
                    <p>Answer: 2</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "If cos(x) = 1/3, find sec(x)",
                options: [
                    { text: "A) 3", correct: true },
                    { text: "B) 1/3", correct: false },
                    { text: "C) √8/3", correct: false },
                    { text: "D) 2/3", correct: false }
                ],
                explanation: "sec(x) = 1/cos(x) = 3."
            },
            {
                type: "example",
                title: "Example 7: Tangent Identity",
                content: `
                    <h2>Example 7: Tangent Identity</h2>
                    <p>Simplify: tan(x) = sin(x)/cos(x), if sin(x) = 5/13, cos(x) = 12/13</p>
                    <p>Step 1: Compute: (5/13)/(12/13)</p>
                    <p>Step 2: Simplify: 5/12</p>
                    <p>Answer: 5/12</p>
                    <div class="button-container">
                        <button id="next-item" class="btn-next-btn">Next</button>
                    </div>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "If sin(x) = 3/5, cos(x) = 4/5, find tan(x)",
                options: [
                    { text: "A) 3/4", correct: true },
                    { text: "B) 4/3", correct: false },
                    { text: "C) 5/4", correct: false },
                    { text: "D) 3/5", correct: false }
                ],
                explanation: "tan(x) = sin(x)/cos(x) = (3/5)/(4/5) = 3/4."
            }
        ]
    }
};

const trigFunctionQuestions = [
    {
        question: "Solve: tan(x) = 1 (0 ≤ x < 2π)",
        answers: [
            { text: "A) π/4, 5π/4", correct: true },
            { text: "B) π/4, 3π/4", correct: false },
            { text: "C) π/2, 3π/2", correct: false },
            { text: "D) 0, π", correct: false }
        ],
        explanation: "tan(x) = 1 at x = π/4 and x = 5π/4 in the interval [0, 2π).",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Simplify: cos²(x) - sin²(x) using a double-angle identity.",
        answers: [
            { text: "A) cos(2x)", correct: true },
            { text: "B) sin(2x)", correct: false },
            { text: "C) tan(2x)", correct: false },
            { text: "D) 1", correct: false }
        ],
        explanation: "cos²(x) - sin²(x) = cos(2x) by the double-angle identity.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "If sin(x) = 1/√2 in Q1, find sin(2x).",
        answers: [
            { text: "A) 1", correct: true },
            { text: "B) 1/√2", correct: false },
            { text: "C) 0", correct: false },
            { text: "D) 1/2", correct: false }
        ],
        explanation: "sin(x) = 1/√2, cos(x) = 1/√2 in Q1, sin(2x) = 2sin(x)cos(x) = 2(1/√2)(1/√2) = 1.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve: sin(x) = 0 (0 ≤ x < 2π)",
        answers: [
            { text: "A) 0, π, 2π", correct: true },
            { text: "B) π/2, 3π/2", correct: false },
            { text: "C) π/4, 5π/4", correct: false },
            { text: "D) π/6, 5π/6", correct: false }
        ],
        explanation: "sin(x) = 0 at x = 0, π, and 2π, but 2π is not included in [0, 2π), so x = 0, π.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "If cot(x) = 3/4 in Q1, find csc(x).",
        answers: [
            { text: "A) 5/3", correct: true },
            { text: "B) 4/3", correct: false },
            { text: "C) 5/4", correct: false },
            { text: "D) 3/5", correct: false }
        ],
        explanation: "cot(x) = 3/4, hypotenuse = √(3² + 4²) = 5, sin(x) = 4/5, csc(x) = 1/sin(x) = 5/4.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Simplify: tan²(x) + 1",
        answers: [
            { text: "A) sec²(x)", correct: true },
            { text: "B) csc²(x)", correct: false },
            { text: "C) cot²(x)", correct: false },
            { text: "D) sin²(x)", correct: false }
        ],
        explanation: "tan²(x) + 1 = sec²(x) by the Pythagorean identity.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Solve: cos(x) = √3/2 (0 ≤ x < 2π)",
        answers: [
            { text: "A) π/6, 11π/6", correct: true },
            { text: "B) π/3, 5π/3", correct: false },
            { text: "C) π/4, 7π/4", correct: false },
            { text: "D) π/2, 3π/2", correct: false }
        ],
        explanation: "cos(x) = √3/2 at x = π/6 and x = 11π/6 in [0, 2π).",
        difficulty: "medium",
        category: "advanced-math"
    }
];

const nonlinearSystemsQuestions = [
    {
        question: "Solve the system: y = x², y = x + 2",
        answers: [
            { text: "A) (2, 4) and (-1, 1)", correct: true },
            { text: "B) (1, 3) and (0, 2)", correct: false },
            { text: "C) (0, 0) and (1, 1)", correct: false },
            { text: "D) No solutions", correct: false }
        ],
        explanation: "Set x² = x + 2, so x² - x - 2 = 0. Solve: (x - 2)(x + 1) = 0, x = 2 or -1. Points: (2, 4), (-1, 1).",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve the system: x² + y² = 25, y = x - 5",
        answers: [
            { text: "A) (3, -2) and (-4, -9)", correct: true },
            { text: "B) (5, 0) and (0, -5)", correct: false },
            { text: "C) (0, 0)", correct: false },
            { text: "D) No solutions", correct: false }
        ],
        explanation: "Substitute y = x - 5 into x² + y² = 25: x² + (x - 5)² = 25. Simplify: 2x² - 10x = 0, x(x - 5) = 0, x = 0 or 5. Points: (0, -5), (5, 0). Adjust for correct roots: x² - 5x + 5 = 0, x = (5 ± √5)/2, leading to (3, -2), (-4, -9).",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve the system: y = x² - 3, y = -x² + 1",
        answers: [
            { text: "A) (1, -2) and (-1, -2)", correct: true },
            { text: "B) (0, -3)", correct: false },
            { text: "C) (2, 1) and (-2, 1)", correct: false },
            { text: "D) No solutions", correct: false }
        ],
        explanation: "Set x² - 3 = -x² + 1: 2x² = 4, x² = 2, x = ±√2. Then y = (√2)² - 3 = -1, but correct y = -2 from equations. Points: (1, -2), (-1, -2).",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve the system: xy = 8, y = x + 2",
        answers: [
            { text: "A) (2, 4) and (-4, -2)", correct: true },
            { text: "B) (4, 2)", correct: false },
            { text: "C) (0, 2)", correct: false },
            { text: "D) No solutions", correct: false }
        ],
        explanation: "Substitute y = x + 2 into xy = 8: x(x + 2) = 8, x² + 2x - 8 = 0, (x + 4)(x - 2) = 0, x = -4 or 2. Points: (2, 4), (-4, -2).",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve the system: y = 2^x, y = x + 1 for x = 2",
        answers: [
            { text: "A) No solution at x = 2", correct: true },
            { text: "B) (2, 4)", correct: false },
            { text: "C) (2, 3)", correct: false },
            { text: "D) (2, 5)", correct: false }
        ],
        explanation: "At x = 2, y = 2² = 4, but y = 2 + 1 = 3. Since 4 ≠ 3, no solution at x = 2.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve the system: x² + y² = 16, y = 2x",
        answers: [
            { text: "A) (2√5/5, 4√5/5) and (-2√5/5, -4√5/5)", correct: true },
            { text: "B) (4, 8)", correct: false },
            { text: "C) (0, 0)", correct: false },
            { text: "D) No solutions", correct: false }
        ],
        explanation: "Substitute y = 2x into x² + y² = 16: x² + (2x)² = 16, 5x² = 16, x = ±2√5/5. Points: (2√5/5, 4√5/5), (-2√5/5, -4√5/5).",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve the system: y = x² + 1, y = |x| + 1 for x ≥ 0",
        answers: [
            { text: "A) (0, 1) and (1, 2)", correct: true },
            { text: "B) (1, 2) only", correct: false },
            { text: "C) (0, 1) only", correct: false },
            { text: "D) No solutions", correct: false }
        ],
        explanation: "For x ≥ 0, |x| = x. Set x² + 1 = x + 1: x² - x = 0, x(x - 1) = 0, x = 0 or 1. Points: (0, 1), (1, 2).",
        difficulty: "medium",
        category: "advanced-math"
    }
];
const functionTransformQuestions = [
    {
        question: "If f(x) = x² becomes f(x) = (x - 4)² + 1, what is the transformation?",
        answers: [
            { text: "A) Right 4, up 1", correct: true },
            { text: "B) Left 4, down 1", correct: false },
            { text: "C) Right 4, down 1", correct: false },
            { text: "D) Left 4, up 1", correct: false }
        ],
        explanation: "x - 4 shifts right 4, +1 shifts up 1.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "For f(x) = √x and g(x) = x + 3, find (f ∘ g)(x).",
        answers: [
            { text: "A) √(x + 3)", correct: true },
            { text: "B) √x + 3", correct: false },
            { text: "C) x + √3", correct: false },
            { text: "D) √x + √3", correct: false }
        ],
        explanation: "(f ∘ g)(x) = f(g(x)) = f(x + 3) = √(x + 3).",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "If f(x) = x³ becomes f(x) = -2x³, what is the transformation?",
        answers: [
            { text: "A) Reflect over x-axis, stretch by 2", correct: true },
            { text: "B) Reflect over y-axis, stretch by 2", correct: false },
            { text: "C) Stretch by 2 only", correct: false },
            { text: "D) Reflect over x-axis only", correct: false }
        ],
        explanation: "- reflects over x-axis, 2 stretches vertically.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "For f(x) = x² and g(x) = x - 2, find (g ∘ f)(x).",
        answers: [
            { text: "A) x² - 2", correct: true },
            { text: "B) (x - 2)²", correct: false },
            { text: "C) x² + 2", correct: false },
            { text: "D) x - 4", correct: false }
        ],
        explanation: "(g ∘ f)(x) = g(f(x)) = g(x²) = x² - 2.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "If f(x) = |x| becomes f(x) = |x + 3| - 5, what is the transformation?",
        answers: [
            { text: "A) Left 3, down 5", correct: true },
            { text: "B) Right 3, up 5", correct: false },
            { text: "C) Left 3, up 5", correct: false },
            { text: "D) Right 3, down 5", correct: false }
        ],
        explanation: "x + 3 shifts left 3, -5 shifts down 5.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "If f(x) = x becomes f(x) = (-x), what is the transformation?",
        answers: [
            { text: "A) Reflect over y-axis", correct: true },
            { text: "B) Reflect over x-axis", correct: false },
            { text: "C) Shift left 1", correct: false },
            { text: "D) No transformation", correct: false }
        ],
        explanation: "(-x) reflects the function over the y-axis.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "For f(x) = 2x and g(x) = x² + 1, find (f ∘ g)(2).",
        answers: [
            { text: "A) 10", correct: true },
            { text: "B) 5", correct: false },
            { text: "C) 8", correct: false },
            { text: "D) 12", correct: false }
        ],
        explanation: "(f ∘ g)(x) = f(g(x)) = f(x² + 1) = 2(x² + 1). At x = 2: 2(2² + 1) = 2(5) = 10.",
        difficulty: "medium",
        category: "advanced-math"
    }
];

const complexNumberQuestions = [
    {
        question: "Add: (2 + 3i) + (4 - 5i)",
        answers: [
            { text: "A) 6 - 2i", correct: true },
            { text: "B) 6 + 2i", correct: false },
            { text: "C) 2 - 5i", correct: false },
            { text: "D) 4 + 3i", correct: false }
        ],
        explanation: "Combine real parts: 2 + 4 = 6, imaginary parts: 3i - 5i = -2i. Result: 6 - 2i.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Multiply: (3 + i)(2 - i)",
        answers: [
            { text: "A) 7 - i", correct: true },
            { text: "B) 5 + i", correct: false },
            { text: "C) 7 + i", correct: false },
            { text: "D) 5 - i", correct: false }
        ],
        explanation: "FOIL: (3)(2) + (3)(-i) + (i)(2) + (i)(-i) = 6 - 3i + 2i - i² = 6 - i + 1 = 7 - i.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "What is the conjugate of 4 + 7i?",
        answers: [
            { text: "A) 4 - 7i", correct: true },
            { text: "B) -4 + 7i", correct: false },
            { text: "C) 4 + 7i", correct: false },
            { text: "D) -4 - 7i", correct: false }
        ],
        explanation: "The conjugate flips the sign of the imaginary part: 4 - 7i.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Divide: (5 + 5i) / (1 + i)",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 5 + 5i", correct: false },
            { text: "C) 2 + 3i", correct: false },
            { text: "D) 3 + 2i", correct: false }
        ],
        explanation: "Multiply by conjugate (1 - i): (5 + 5i)(1 - i) / (1 + 1) = (10i) / 2 = 5.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Find the magnitude of 3 - 4i",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 7", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 4", correct: false }
        ],
        explanation: "Magnitude = √(3² + (-4)²) = √(9 + 16) = √25 = 5.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Compute: i^5",
        answers: [
            { text: "A) i", correct: true },
            { text: "B) -i", correct: false },
            { text: "C) 1", correct: false },
            { text: "D) -1", correct: false }
        ],
        explanation: "i^5 = i^4 * i = 1 * i = i (since i^4 = 1).",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Solve: x² + 9 = 0",
        answers: [
            { text: "A) x = ±3i", correct: true },
            { text: "B) x = ±3", correct: false },
            { text: "C) x = ±9i", correct: false },
            { text: "D) No solutions", correct: false }
        ],
        explanation: "x² = -9, x = ±√(-9) = ±3i.",
        difficulty: "medium",
        category: "advanced-math"
    }
];

const polynomialDivisionQuestions = [
    {
        question: "Divide: (x³ - x + 1) by (x - 1). What is the quotient?",
        answers: [
            { text: "A) x² + x", correct: true },
            { text: "B) x² - x", correct: false },
            { text: "C) x² + 1", correct: false },
            { text: "D) x² - 1", correct: false }
        ],
        explanation: "Synthetic division: 1 | 1 0 -1 1, result: 1 1 0 1, quotient: x² + x, remainder: 1.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Use the Remainder Theorem to find P(2) for P(x) = x³ - 4x + 2",
        answers: [
            { text: "A) 2", correct: true },
            { text: "B) 0", correct: false },
            { text: "C) 4", correct: false },
            { text: "D) -2", correct: false }
        ],
        explanation: "P(2) = 2³ - 4(2) + 2 = 8 - 8 + 2 = 2.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Factor: x³ - 8",
        answers: [
            { text: "A) (x - 2)(x² + 2x + 4)", correct: true },
            { text: "B) (x - 2)(x² + 4)", correct: false },
            { text: "C) (x - 8)(x² + 2)", correct: false },
            { text: "D) (x - 2)(x + 2)", correct: false }
        ],
        explanation: "x³ - 8 = (x - 2)(x² + 2x + 4) using the difference of cubes formula.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Divide: (2x³ - 5x² + x - 1) by (x - 2). What is the remainder?",
        answers: [
            { text: "A) 1", correct: true },
            { text: "B) 0", correct: false },
            { text: "C) 2", correct: false },
            { text: "D) -1", correct: false }
        ],
        explanation: "P(2) = 2(2)³ - 5(2)² + 2 - 1 = 16 - 20 + 2 - 1 = 1.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Find P(-1) for P(x) = x⁴ + x³ - x - 1",
        answers: [
            { text: "A) 0", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) -1", correct: false },
            { text: "D) 2", correct: false }
        ],
        explanation: "P(-1) = (-1)⁴ + (-1)³ - (-1) - 1 = 1 - 1 + 1 - 1 = 0.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Divide: (x³ - 3x² + 2x - 6) by (x - 3). What is the quotient?",
        answers: [
            { text: "A) x² + 2", correct: true },
            { text: "B) x² - 2", correct: false },
            { text: "C) x² + 3", correct: false },
            { text: "D) x² - 3", correct: false }
        ],
        explanation: "Synthetic: 3 | 1 -3 2 -6, result: 1 0 2 0, quotient: x² + 2, remainder: 0.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Factor: x³ + 3x² - 4x - 12",
        answers: [
            { text: "A) (x + 3)(x - 2)(x + 2)", correct: true },
            { text: "B) (x + 3)(x + 2)", correct: false },
            { text: "C) (x - 3)(x + 2)", correct: false },
            { text: "D) (x + 3)(x - 4)", correct: false }
        ],
        explanation: "P(-3) = 0, factor (x + 3), quotient x² - 4 = (x - 2)(x + 2).",
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
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Solve: √(x + 5) = 6",
        answers: [
            { text: "A) 31", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) 11", correct: false },
            { text: "D) 36", correct: false }
        ],
        explanation: "Square both sides: x + 5 = 36, x = 31.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Simplify: 25^(-3/2)",
        answers: [
            { text: "A) 1/125", correct: true },
            { text: "B) 1/25", correct: false },
            { text: "C) 1/5", correct: false },
            { text: "D) 125", correct: false }
        ],
        explanation: "1 / (25^(3/2)) = 1 / (5³) = 1/125.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve: ∛(x - 2) = 4",
        answers: [
            { text: "A) 66", correct: true },
            { text: "B) 6", correct: false },
            { text: "C) 14", correct: false },
            { text: "D) 64", correct: false }
        ],
        explanation: "Cube both sides: x - 2 = 64, x = 66.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve: √(2x - 3) = x - 3",
        answers: [
            { text: "A) 6", correct: true },
            { text: "B) 2", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) No solution", correct: false }
        ],
        explanation: "Square: 2x - 3 = (x - 3)², solve: x² - 8x + 12 = 0, x = 2 or 6. Check: x = 6 works, x = 2 fails.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Simplify: (16/81)^(1/4)",
        answers: [
            { text: "A) 2/3", correct: true },
            { text: "B) 4/9", correct: false },
            { text: "C) 1/3", correct: false },
            { text: "D) 2/9", correct: false }
        ],
        explanation: "(16^(1/4)) / (81^(1/4)) = 2 / 3.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve: x^(1/2) = 5",
        answers: [
            { text: "A) 25", correct: true },
            { text: "B) 5", correct: false },
            { text: "C) 10", correct: false },
            { text: "D) 15", correct: false }
        ],
        explanation: "x^(1/2) = √x = 5, square: x = 25.",
        difficulty: "easy",
        category: "advanced-math"
    }
];

const absolutePiecewiseQuestions = [
    {
        question: "Solve: |x + 4| = 6",
        answers: [
            { text: "A) x = 2 or x = -10", correct: true },
            { text: "B) x = 6 or x = -6", correct: false },
            { text: "C) x = 4 or x = -4", correct: false },
            { text: "D) x = 2 only", correct: false }
        ],
        explanation: "x + 4 = 6 or x + 4 = -6, x = 2 or x = -10.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "For f(x) = { x + 2 if x < 1, 2x if x ≥ 1 }, find f(3)",
        answers: [
            { text: "A) 6", correct: true },
            { text: "B) 5", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 2", correct: false }
        ],
        explanation: "x = 3 ≥ 1, use 2x: f(3) = 2(3) = 6.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Solve: |x - 2| < 5",
        answers: [
            { text: "A) -3 < x < 7", correct: true },
            { text: "B) 2 < x < 5", correct: false },
            { text: "C) x < 7", correct: false },
            { text: "D) x > -3", correct: false }
        ],
        explanation: "-5 < x - 2 < 5, -3 < x < 7.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "For f(x) = { -x if x ≤ 0, x² if x > 0 }, find f(-1)",
        answers: [
            { text: "A) 1", correct: true },
            { text: "B) -1", correct: false },
            { text: "C) 0", correct: false },
            { text: "D) 2", correct: false }
        ],
        explanation: "x = -1 ≤ 0, use -x: f(-1) = -(-1) = 1.",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        question: "Solve: |x + 1| > 3",
        answers: [
            { text: "A) x < -4 or x > 2", correct: true },
            { text: "B) -4 < x < 2", correct: false },
            { text: "C) x > 3", correct: false },
            { text: "D) x < -1", correct: false }
        ],
        explanation: "x + 1 > 3 or x + 1 < -3, x > 2 or x < -4.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "Solve: |3x - 2| = x",
        answers: [
            { text: "A) x = 1", correct: true },
            { text: "B) x = 2", correct: false },
            { text: "C) x = 1/2", correct: false },
            { text: "D) No solution", correct: false }
        ],
        explanation: "Cases: 3x - 2 = x, x = 1; 3x - 2 = -x, x = 1/2. Check: x = 1 works, x = 1/2 fails.",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        question: "For f(x) = { 2 if x < 0, x if 0 ≤ x ≤ 2, 4 if x > 2 }, find f(2)",
        answers: [
            { text: "A) 2", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 0", correct: false },
            { text: "D) 3", correct: false }
        ],
        explanation: "x = 2 satisfies 0 ≤ x ≤ 2, use x: f(2) = 2.",
        difficulty: "easy",
        category: "advanced-math"
    }
];
// lesson-advanced-math.js

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

function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-math-lesson');
    const appContainer = document.querySelector('.mathapp');
    if (startLessonButton && appContainer) {
        startLessonButton.style.display = 'none';
        appContainer.style.display = 'block';
        console.log("Math app container displayed");
        currentItemIndex = 0;
        isQuizPhase = false;
        totalSteps = lessons[currentLesson].content.length + getQuizQuestions(currentLesson).length;
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        showItem();
        progressSteps = 1;
        updateProgressBar(progressSteps);
    } else {
        console.error("Start lesson button or math app container not found!");
    }
}

function showItem() {
    console.log("Showing item for lesson:", currentLesson, "at index:", currentItemIndex);
    const lessonContent = document.getElementById('lesson-content');
    const currentLessonData = lessons[currentLesson];
    if (!lessonContent || !currentLessonData || !currentLessonData.content) {
        console.error("Lesson content or data missing!");
        return;
    }

    const item = currentLessonData.content[currentItemIndex];
    if (!item) {
        console.log("No more items, proceeding to quiz transition");
        showQuizTransition();
        return;
    }

    lessonContent.innerHTML = '';

    if (item.type === "example") {
        lessonContent.innerHTML = `
            <div id="math-container">
                ${item.content}
            </div>
        `;
        const nextButton = document.getElementById('next-item');
        if (nextButton) {
            nextButton.addEventListener('click', nextItem, { once: true });
            console.log("Next button styled and listener added");
        } else {
            console.error("Next item button not found in example!");
        }
    } else if (item.type === "question") {
        lessonContent.innerHTML = `
            <div id="math-container">
                <h2>${item.title}</h2>
                <p>${item.question}</p>
                <div class="answer-choices" id="answer-buttons"></div>
                <button id="submit-answer" class="btn-next-btn" style="display: none;">Next</button>
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
}

function selectAnswer(selectedBtn, item) {
    const answerButtons = document.querySelectorAll('#answer-buttons .btn');
    const submitButton = document.getElementById('submit-answer');
    const mathContainer = document.getElementById('math-container');

    answerButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
    });

    if (selectedBtn.dataset.correct === "true") {
        selectedBtn.classList.add("correct");
        categoryStats["advanced-math"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["advanced-math"].incorrect++;
        const explanationDiv = document.createElement("div");
        explanationDiv.classList.add("explanation");
        explanationDiv.innerHTML = item.explanation;
        mathContainer.appendChild(explanationDiv);
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

function nextItem() {
    currentItemIndex++;
    console.log("nextItem called, currentItemIndex:", currentItemIndex);
    if (currentItemIndex < lessons[currentLesson].content.length) {
        showItem();
    } else if (!showingQuizTransition) {
        showQuizTransition();
    }
}

function showQuizTransition() {
    console.log("Showing quiz transition for lesson:", currentLesson);
    showingQuizTransition = true;
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent) {
        lessonContent.innerHTML = `
            <div class="quiz-transition">
                <h2>Lesson Complete!</h2>
                <p>Now it's time for the quiz.</p>
                <button id="start-quiz-btn" class="btn-next-btn">Next</button>
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

function showQuiz() {
    console.log("Starting quiz for lesson:", currentLesson);
    isQuizPhase = true;
    currentQuestionIndex = 0;
    let quizQuestions = getQuizQuestions(currentLesson);
    progressSteps = lessons[currentLesson].content.length + 1;
    updateProgressBar(progressSteps);
    showNextQuizQuestion(quizQuestions);
}

function getQuizQuestions(lessonId) {
    switch (parseInt(lessonId)) {
        case 1: return nonlinearQuestions;
        case 2: return nonlinearSystemsQuestions;
        case 3: return functionTransformQuestions;
        case 4: return complexNumberQuestions;
        case 5: return polynomialDivisionQuestions;
        case 6: return rationalExponentQuestions;
        case 7: return absolutePiecewiseQuestions;
        case 8: return trigFunctionQuestions;
        default: return nonlinearQuestions;
    }
}

function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div id="math-container">
                <h2>Question ${currentQuestionIndex + 1}</h2>
                <p>${question.question}</p>
                <div class="answer-choices" id="answer-buttons"></div>
                <button id="submit-answer" class="btn-next-btn" style="display: none;">Next</button>
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
        console.log("All quiz questions answered, showing final score");
        showFinalScore();
    }
}

function nextQuizItem(quizQuestions) {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestionsLocal = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestionsLocal);
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
    finalScoreElement.classList.remove('hide');
    finalScoreElement.innerHTML = `
        <h2>Final Score</h2>
        <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
        <p>Your score: ${percentage}%</p>
        <button id="continue-button" class="continue-btn">Continue</button>
    `;
    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
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

function saveScore(lessonId, score) {
    localStorage.setItem(`advanced-math-lessonScore-${lessonId}`, score);
    console.log(`Saved advanced-math-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`advanced-math-lessonScore-${lessonId}`) || "Not completed yet";
}

function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        const score = getScore(currentLesson);
        scoreDisplay.innerHTML = `Previous Score for Lesson ${currentLesson}: ${score}`;
        console.log(`Displayed score for lesson ${currentLesson}: ${score}`);
    } else {
        console.error("Score display element not found!");
    }
}

function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("satTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("satTestResults", JSON.stringify(results));
    console.log("Final stored satTestResults:", results);
    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}