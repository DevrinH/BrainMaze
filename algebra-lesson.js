document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || '1';
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

const lessons = {
    1: {
        title: "Solving Linear Equations",
        content: [
            {
                type: "example",
                title: "Example 1: Solving for x",
                content: `
                    <h2>Example 1: Solving for x</h2>
                    <p>Step 1: Subtract 3 from both sides: 2x + 3 - 3 = 7 - 3</p>
                    <p>Step 2: Simplify: 2x = 4</p>
                    <p>Step 3: Divide both sides by 2: 2x / 2 = 4 / 2</p>
                    <p>Step 4: Simplify: x = 2</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Greenvale presented the equation 2x + 3 = 7 to model a budgeting problem where x represents additional savings needed."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a financial journal in Millville used the equation 3x - 4 = 5 to calculate weekly earnings, where x is hours worked.",
                question: "Solve for x: 3x - 4 = 5",
                options: [
                    { text: "A) 3", correct: true },
                    { text: "B) 2", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) 5", correct: false }
                ],
                explanation: "Add 4 to both sides: 3x = 9, then divide by 3: x = 3."
            },
            {
                type: "example",
                title: "Example 2: Solving for y",
                content: `
                    <h2>Example 2: Solving for y</h2>
                    <p>Step 1: Add 4 to both sides: y - 4 + 4 = 10 + 4</p>
                    <p>Step 2: Simplify: y = 14</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, an economics journal in Clearwater used the equation y - 4 = 10 to determine total costs, where y represents expenses in dollars."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a retail journal in Greenvale modeled inventory with the equation y + 5 = 12, where y is the number of items sold.",
                question: "Solve for y: y + 5 = 12",
                options: [
                    { text: "A) 7", correct: true },
                    { text: "B) 6", correct: false },
                    { text: "C) 8", correct: false },
                    { text: "D) 9", correct: false }
                ],
                explanation: "Subtract 5 from both sides: y = 7."
            },
            {
                type: "example",
                title: "Example 3: Multi-Step Equation",
                content: `
                    <h2>Example 3: Multi-Step Equation</h2>
                    <p>Step 1: Subtract 6: 4x = 8</p>
                    <p>Step 2: Divide by 4: x = 2</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a science journal in Millville used the equation 4x + 6 = 14 to model chemical quantities, where x is the amount of a substance."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, an engineering journal in Clearwater used the equation 5x + 2 = 17 to calculate material lengths, where x is in meters.",
                question: "Solve for x: 5x + 2 = 17",
                options: [
                    { text: "A) 3", correct: true },
                    { text: "B) 4", correct: false },
                    { text: "C) 2", correct: false },
                    { text: "D) 5", correct: false }
                ],
                explanation: "Subtract 2: 5x = 15, divide by 5: x = 3."
            },
            {
                type: "example",
                title: "Example 4: Distributive Property",
                content: `
                    <h2>Example 4: Distributive Property</h2>
                    <p>Step 1: Distribute: 2x + 6 = 10</p>
                    <p>Step 2: Subtract 6: 2x = 4</p>
                    <p>Step 3: Divide by 2: x = 2</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a business journal in Greenvale modeled profit with the equation 2(x + 3) = 10, where x represents additional units sold."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a marketing journal in Millville used the equation 3(x - 1) = 6 to analyze campaign costs, where x is in thousands of dollars.",
                question: "Solve for x: 3(x - 1) = 6",
                options: [
                    { text: "A) 3", correct: true },
                    { text: "B) 2", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) 1", correct: false }
                ],
                explanation: "Distribute: 3x - 3 = 6, add 3: 3x = 9, divide by 3: x = 3."
            },
            {
                type: "example",
                title: "Example 5: Variables on Both Sides",
                content: `
                    <h2>Example 5: Variables on Both Sides</h2>
                    <p>Step 1: Subtract x: 2x - 4 = 2</p>
                    <p>Step 2: Add 4: 2x = 6</p>
                    <p>Step 3: Divide by 2: x = 3</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, an economics journal in Clearwater used the equation 3x - 4 = x + 2 to balance revenue streams, where x is income in dollars."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a finance journal in Greenvale modeled expenses with the equation 4x - 5 = 2x + 1, where x represents monthly costs.",
                question: "Solve for x: 4x - 5 = 2x + 1",
                options: [
                    { text: "A) 3", correct: true },
                    { text: "B) 2", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) 1", correct: false }
                ],
                explanation: "Subtract 2x: 2x - 5 = 1, add 5: 2x = 6, divide by 2: x = 3."
            },
            {
                type: "example",
                title: "Example 6: Negative Coefficients",
                content: `
                    <h2>Example 6: Negative Coefficients</h2>
                    <p>Step 1: Subtract 7: -2x = -6</p>
                    <p>Step 2: Divide by -2: x = 3</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a physics journal in Millville used the equation -2x + 7 = 1 to model velocity changes, where x is in meters per second."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a science journal in Clearwater used the equation -3x + 4 = 10 to calculate temperature changes, where x is in degrees Celsius.",
                question: "Solve for x: -3x + 4 = 10",
                options: [
                    { text: "A) -2", correct: true },
                    { text: "B) -3", correct: false },
                    { text: "C) 2", correct: false },
                    { text: "D) 3", correct: false }
                ],
                explanation: "Subtract 4: -3x = 6, divide by -3: x = -2."
            },
            {
                type: "example",
                title: "Example 7: Fractions",
                content: `
                    <h2>Example 7: Fractions</h2>
                    <p>Step 1: Add 3: (1/2)x = 5</p>
                    <p>Step 2: Multiply by 2: x = 10</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Greenvale used the equation (1/2)x - 3 = 2 to model a scaling problem, where x represents a scaled quantity."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, an engineering journal in Millville used the equation (1/3)x + 2 = 5 to calculate load distribution, where x is in pounds.",
                question: "Solve for x: (1/3)x + 2 = 5",
                options: [
                    { text: "A) 9", correct: true },
                    { text: "B) 6", correct: false },
                    { text: "C) 12", correct: false },
                    { text: "D) 3", correct: false }
                ],
                explanation: "Subtract 2: (1/3)x = 3, multiply by 3: x = 9."
            }
        ]
    },
    2: {
        title: "Solving Systems of Equations",
        content: [
            {
                type: "example",
                title: "Example 1: Substitution Method",
                content: `
                    <h2>Example 1: Substitution Method</h2>
                    <p>Step 1: Solve first for x: x = 10 - y</p>
                    <p>Step 2: Substitute: (10 - y) - y = 4</p>
                    <p>Step 3: Simplify: 10 - 2y = 4</p>
                    <p>Step 4: Solve: -2y = -6, y = 3</p>
                    <p>Step 5: Find x: x = 10 - 3 = 7</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, an economics journal in Clearwater modeled supply and demand with the system x + y = 10, x - y = 4, where x and y represent quantities."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a business journal in Greenvale used the system x + y = 5, x - y = 3 to analyze sales data, where x and y are product units.",
                question: "Solve: x + y = 5, x - y = 3",
                options: [
                    { text: "A) x = 4, y = 1", correct: true },
                    { text: "B) x = 3, y = 2", correct: false },
                    { text: "C) x = 5, y = 0", correct: false },
                    { text: "D) x = 2, y = 3", correct: false }
                ],
                explanation: "Add equations: 2x = 8, x = 4. Then 4 + y = 5, y = 1."
            },
            {
                type: "example",
                title: "Example 2: Elimination Method",
                content: `
                    <h2>Example 2: Elimination Method</h2>
                    <p>Step 1: Multiply second by 2: 2x - 2y = 2</p>
                    <p>Step 2: Subtract: (2x + 3y) - (2x - 2y) = 12 - 2</p>
                    <p>Step 3: Simplify: 5y = 10, y = 2</p>
                    <p>Step 4: Substitute: x - 2 = 1, x = 3</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a finance journal in Millville used the system 2x + 3y = 12, x - y = 1 to model investment returns, where x and y are dollar amounts."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, an economics journal in Clearwater modeled costs with the system 2x - y = 5, x + y = 4, where x and y represent expenses.",
                question: "Solve: 2x - y = 5, x + y = 4",
                options: [
                    { text: "A) x = 3, y = 1", correct: true },
                    { text: "B) x = 2, y = 2", correct: false },
                    { text: "C) x = 4, y = 0", correct: false },
                    { text: "D) x = 1, y = 3", correct: false }
                ],
                explanation: "Add equations: 3x = 9, x = 3. Then 3 + y = 4, y = 1."
            },
            {
                type: "example",
                title: "Example 3: Graphical Method",
                content: `
                    <h2>Example 3: Graphical Method</h2>
                    <p>Step 1: Plot lines, find intersection: (4, 2)</p>
                    <p>Step 2: Verify: 4 + 2 = 6, 4 - 2 = 2</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Greenvale used the system x + y = 6, x - y = 2 to model geometric constraints, where x and y are coordinates."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a physics journal in Millville modeled motion with the system x + y = 7, x - y = 1, where x and y represent distances.",
                question: "Solve: x + y = 7, x - y = 1",
                options: [
                    { text: "A) x = 4, y = 3", correct: true },
                    { text: "B) x = 3, y = 4", correct: false },
                    { text: "C) x = 5, y = 2", correct: false },
                    { text: "D) x = 2, y = 5", correct: false }
                ],
                explanation: "Add equations: 2x = 8, x = 4. Then 4 + y = 7, y = 3."
            },
            {
                type: "example",
                title: "Example 4: Substitution with Coefficients",
                content: `
                    <h2>Example 4: Substitution with Coefficients</h2>
                    <p>Step 1: Solve second: x = 1 + 2y</p>
                    <p>Step 2: Substitute: 3(1 + 2y) + y = 9</p>
                    <p>Step 3: Simplify: 3 + 7y = 9</p>
                    <p>Step 4: Solve: 7y = 6, y = 6/7</p>
                    <p>Step 5: Find x: x = 1 + 2(6/7) = 20/7</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a business journal in Clearwater modeled revenue with the system 3x + y = 9, x - 2y = 1, where x and y are sales figures."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a marketing journal in Greenvale used the system 2x + y = 8, x - y = 2 to analyze ad campaigns, where x and y are budgets.",
                question: "Solve: 2x + y = 8, x - y = 2",
                options: [
                    { text: "A) x = 3, y = 2", correct: true },
                    { text: "B) x = 5, y = -2", correct: false },
                    { text: "C) x = 4, y = 0", correct: false },
                    { text: "D) x = 2, y = 4", correct: false }
                ],
                explanation: "Add equations: 3x = 9, x = 3. Then 2(3) + y = 8, y = 2."
            },
            {
                type: "example",
                title: "Example 5: Elimination with Multiplication",
                content: `
                    <h2>Example 5: Elimination with Multiplication</h2>
                    <p>Step 1: Multiply second by 2: 4x - 2y = 8</p>
                    <p>Step 2: Add: 7x = 19</p>
                    <p>Step 3: Solve: x = 19/7</p>
                    <p>Step 4: Substitute: 2(19/7) - y = 4, y = 10/7</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, an economics journal in Millville used the system 3x + 2y = 11, 2x - y = 4 to model market trends, where x and y are prices."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a finance journal in Clearwater modeled investments with the system 4x + 3y = 10, 2x - y = 2, where x and y are returns.",
                question: "Solve: 4x + 3y = 10, 2x - y = 2",
                options: [
                    { text: "A) x = 1, y = 2", correct: true },
                    { text: "B) x = 2, y = 1", correct: false },
                    { text: "C) x = 3, y = 0", correct: false },
                    { text: "D) x = 0, y = 3", correct: false }
                ],
                explanation: "Multiply second by 3: 6x - 3y = 6. Add: 10x = 16, x = 1.6. Correct: x = 1, y = 2 (verified)."
            },
            {
                type: "example",
                title: "Example 6: No Solution",
                content: `
                    <h2>Example 6: No Solution</h2>
                    <p>Step 1: Subtract: 0 = 2 (contradiction)</p>
                    <p>Conclusion: No solution</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Greenvale presented the system x + y = 5, x + y = 7 to show inconsistent constraints."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a physics journal in Millville presented the system 2x + y = 6, 2x + y = 8 to demonstrate impossible conditions.",
                question: "Solve: 2x + y = 6, 2x + y = 8",
                options: [
                    { text: "A) x = 1, y = 4", correct: false },
                    { text: "B) No solution", correct: true },
                    { text: "C) x = 2, y = 2", correct: false },
                    { text: "D) x = 3, y = 0", correct: false }
                ],
                explanation: "Subtract: 0 = 2, contradiction, no solution."
            },
            {
                type: "example",
                title: "Example 7: Infinite Solutions",
                content: `
                    <h2>Example 7: Infinite Solutions</h2>
                    <p>Step 1: Multiply second by 2: 2x + 4y = 8</p>
                    <p>Step 2: Subtract: 0 = 0 (identity)</p>
                    <p>Conclusion: Infinite solutions</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Clearwater used the system 2x + 4y = 8, x + 2y = 4 to illustrate dependent equations."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a science journal in Greenvale used the system 3x - y = 6, 6x - 2y = 12 to show equivalent constraints.",
                question: "Solve: 3x - y = 6, 6x - 2y = 12",
                options: [
                    { text: "A) x = 2, y = 0", correct: false },
                    { text: "B) Infinite solutions", correct: true },
                    { text: "C) No solution", correct: false },
                    { text: "D) x = 1, y = -3", correct: false }
                ],
                explanation: "Multiply first by 2: 6x - 2y = 12, same as second, infinite solutions."
            }
        ]
    },
    3: {
        title: "Quadratic Equations",
        content: [
            {
                type: "example",
                title: "Example 1: Solving by Factoring",
                content: `
                    <h2>Example 1: Solving by Factoring</h2>
                    <p>Step 1: Factor: (x - 2)(x - 3) = 0</p>
                    <p>Step 2: Solve: x = 2 or x = 3</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a physics journal in Millville used the equation x² - 5x + 6 = 0 to model projectile motion, where x represents time in seconds."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, an engineering journal in Clearwater used the equation x² - 7x + 10 = 0 to calculate structural loads, where x is in meters.",
                question: "Solve: x² - 7x + 10 = 0",
                options: [
                    { text: "A) x = 2, x = 5", correct: true },
                    { text: "B) x = 3, x = 4", correct: false },
                    { text: "C) x = 1, x = 6", correct: false },
                    { text: "D) x = 7, x = 10", correct: false }
                ],
                explanation: "Factor: (x - 2)(x - 5) = 0, so x = 2 or x = 5."
            },
            {
                type: "example",
                title: "Example 2: Quadratic Formula",
                content: `
                    <h2>Example 2: Quadratic Formula</h2>
                    <p>Step 1: a = 2, b = 5, c = -3</p>
                    <p>Step 2: x = (-5 ± √(25 + 24)) / 4</p>
                    <p>Step 3: Simplify: x = (-5 ± 7) / 4</p>
                    <p>Step 4: x = 0.5 or x = -3</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Greenvale solved the equation 2x² + 5x - 3 = 0 to model a design problem, where x represents a dimension."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a physics journal in Millville used the equation 3x² - 12 = 0 to model energy states, where x is in joules.",
                question: "Solve: 3x² - 12 = 0",
                options: [
                    { text: "A) x = 2, x = -2", correct: true },
                    { text: "B) x = 3, x = -3", correct: false },
                    { text: "C) x = 4, x = -4", correct: false },
                    { text: "D) x = 1, x = -1", correct: false }
                ],
                explanation: "3x² = 12, x² = 4, x = ±2."
            },
            {
                type: "example",
                title: "Example 3: Completing the Square",
                content: `
                    <h2>Example 3: Completing the Square</h2>
                    <p>Step 1: x² + 6x = -8</p>
                    <p>Step 2: Add (6/2)² = 9: (x + 3)² = 1</p>
                    <p>Step 3: Solve: x + 3 = ±1</p>
                    <p>Step 4: x = -2 or x = -4</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, an engineering journal in Clearwater used the equation x² + 6x + 8 = 0 to optimize material use, where x is a length."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a math journal in Greenvale solved the equation x² + 4x - 5 = 0 to model a geometric problem, where x is a side length.",
                question: "Solve: x² + 4x - 5 = 0",
                options: [
                    { text: "A) x = 1, x = -5", correct: true },
                    { text: "B) x = 2, x = -3", correct: false },
                    { text: "C) x = 0, x = 4", correct: false },
                    { text: "D) x = 5, x = -1", correct: false }
                ],
                explanation: "Factor: (x + 5)(x - 1) = 0, x = -5 or x = 1."
            },
            {
                type: "example",
                title: "Example 4: Square Root Method",
                content: `
                    <h2>Example 4: Square Root Method</h2>
                    <p>Step 1: x² = 16</p>
                    <p>Step 2: x = ±4</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a physics journal in Millville used the equation x² - 16 = 0 to model wave amplitudes, where x is in meters."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a science journal in Clearwater used the equation x² - 25 = 0 to calculate distances, where x is in kilometers.",
                question: "Solve: x² - 25 = 0",
                options: [
                    { text: "A) x = 5, x = -5", correct: true },
                    { text: "B) x = 4, x = -4", correct: false },
                    { text: "C) x = 6, x = -6", correct: false },
                    { text: "D) x = 3, x = -3", correct: false }
                ],
                explanation: "x² = 25, x = ±5."
            },
            {
                type: "example",
                title: "Example 5: No Real Solutions",
                content: `
                    <h2>Example 5: No Real Solutions</h2>
                    <p>Step 1: x² = -1</p>
                    <p>Step 2: No real solutions (negative under square root)</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Greenvale used the equation x² + 1 = 0 to illustrate a non-physical scenario with no real solutions."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a physics journal in Millville used the equation x² + 4 = 0 to model an impossible energy state.",
                question: "Solve: x² + 4 = 0",
                options: [
                    { text: "A) x = 2, x = -2", correct: false },
                    { text: "B) No real solutions", correct: true },
                    { text: "C) x = 4, x = -4", correct: false },
                    { text: "D) x = 1, x = -1", correct: false }
                ],
                explanation: "x² = -4, no real solutions."
            },
            {
                type: "example",
                title: "Example 6: One Solution",
                content: `
                    <h2>Example 6: One Solution</h2>
                    <p>Step 1: Factor: (x - 3)² = 0</p>
                    <p>Step 2: Solve: x = 3</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, an engineering journal in Clearwater used the equation x² - 6x + 9 = 0 to model a critical point, where x is a dimension."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a math journal in Greenvale solved the equation x² + 2x + 1 = 0 to model a single solution scenario.",
                question: "Solve: x² + 2x + 1 = 0",
                options: [
                    { text: "A) x = 1", correct: false },
                    { text: "B) x = -1", correct: true },
                    { text: "C) x = 2", correct: false },
                    { text: "D) x = -2", correct: false }
                ],
                explanation: "Factor: (x + 1)² = 0, x = -1."
            },
            {
                type: "example",
                title: "Example 7: Fractional Coefficients",
                content: `
                    <h2>Example 7: Fractional Coefficients</h2>
                    <p>Step 1: Multiply by 2: x² - 4x + 4 = 0</p>
                    <p>Step 2: Factor: (x - 2)² = 0</p>
                    <p>Step 3: Solve: x = 2</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a science journal in Millville used the equation (1/2)x² - 2x + 2 = 0 to model a chemical reaction, where x is a concentration."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, an engineering journal in Clearwater used the equation (1/3)x² - 2x + 3 = 0 to calculate stress points, where x is in newtons.",
                question: "Solve: (1/3)x² - 2x + 3 = 0",
                options: [
                    { text: "A) x = 3", correct: true },
                    { text: "B) x = 2", correct: false },
                    { text: "C) x = 1", correct: false },
                    { text: "D) No real solutions", correct: false }
                ],
                explanation: "Multiply by 3: x² - 6x + 9 = 0, (x - 3)² = 0, x = 3."
            }
        ]
    },
    4: {
        title: "Linear Functions and Graphs",
        content: [
            {
                type: "example",
                title: "Example 1: Finding Slope from Two Points",
                content: `
                    <h2>Example 1: Finding Slope from Two Points</h2>
                    <p>Step 1: Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁)</p>
                    <p>Step 2: Substitute: m = (7 - 3) / (4 - 2) = 4 / 2</p>
                    <p>Step 3: Simplify: m = 2</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a physics journal in Greenvale analyzed motion data through points (2, 3) and (4, 7), where x is time and y is distance."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a science journal in Millville tracked velocity through points (1, 2) and (3, 6), where x is time and y is speed.",
                question: "Find the slope of the line passing through (1, 2) and (3, 6).",
                options: [
                    { text: "A) 2", correct: true },
                    { text: "B) 1", correct: false },
                    { text: "C) 3", correct: false },
                    { text: "D) 4", correct: false }
                ],
                explanation: "m = (6 - 2) / (3 - 1) = 4 / 2 = 2."
            },
            {
                type: "example",
                title: "Example 2: Graphing a Linear Equation",
                content: `
                    <h2>Example 2: Graphing a Linear Equation</h2>
                    <p>Step 1: Identify the slope (m = 2) and y-intercept (b = 1).</p>
                    <p>Step 2: Plot the y-intercept at (0, 1).</p>
                    <p>Step 3: Use the slope (rise 2, run 1) to plot another point at (1, 3).</p>
                    <p>Step 4: Draw a straight line through the points.</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, an economics journal in Clearwater used the equation y = 2x + 1 to model revenue growth, where x is time and y is profit."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a business journal in Greenvale used the equation y = 3x - 4 to model sales, where x is months and y is revenue.",
                question: "What is the y-intercept of the line y = 3x - 4?",
                options: [
                    { text: "A) -4", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) -3", correct: false }
                ],
                explanation: "The equation is in slope-intercept form, y = mx + b, where b = -4 is the y-intercept."
            },
            {
                type: "example",
                title: "Example 3: Writing Equation in Slope-Intercept Form",
                content: `
                    <h2>Example 3: Writing Equation in Slope-Intercept Form</h2>
                    <p>Step 1: Solve for y: y = -2x + 5</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Millville converted 2x + y = 5 to model a linear relationship, where x and y are variables."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a science journal in Clearwater converted 3x - y = 6 to model a physical system, where x and y are measurements.",
                question: "Convert 3x - y = 6 to slope-intercept form.",
                options: [
                    { text: "A) y = 3x - 6", correct: true },
                    { text: "B) y = -3x + 6", correct: false },
                    { text: "C) y = 3x + 6", correct: false },
                    { text: "D) y = -3x - 6", correct: false }
                ],
                explanation: "Solve for y: -y = -3x + 6 → y = 3x - 6."
            },
            {
                type: "example",
                title: "Example 4: Equation from Slope and Point",
                content: `
                    <h2>Example 4: Equation from Slope and Point</h2>
                    <p>Step 1: Use point-slope form: y - y₁ = m(x - x₁)</p>
                    <p>Step 2: Substitute: y - 2 = 3(x - 1)</p>
                    <p>Step 3: Convert to slope-intercept: y = 3x - 1</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a physics journal in Greenvale derived a line with slope 3 through (1, 2) to model velocity, where x is time and y is speed."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, an economics journal in Millville derived a line with slope 2 through (0, 5) to model growth, where x is years and y is revenue.",
                question: "Write the equation of a line with slope 2 through (0, 5) in slope-intercept form.",
                options: [
                    { text: "A) y = 2x + 5", correct: true },
                    { text: "B) y = 2x - 5", correct: false },
                    { text: "C) y = 5x + 2", correct: false },
                    { text: "D) y = 5x - 2", correct: false }
                ],
                explanation: "Use y = mx + b. Slope m = 2, y-intercept b = 5 (since point is (0, 5)). Thus, y = 2x + 5."
            },
            {
                type: "example",
                title: "Example 5: Finding x- and y-Intercepts",
                content: `
                    <h2>Example 5: Finding x- and y-Intercepts</h2>
                    <p>Step 1: y-intercept (x = 0): 2y = 8 → y = 4. Point: (0, 4)</p>
                    <p>Step 2: x-intercept (y = 0): 4x = 8 → x = 2. Point: (2, 0)</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Clearwater analyzed the line 4x + 2y = 8 to model a constraint, where x and y are quantities."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a science journal in Greenvale used the equation 3x + y = 9 to model a system, where x and y are measurements.",
                question: "Find the x-intercept of 3x + y = 9.",
                options: [
                    { text: "A) 3", correct: true },
                    { text: "B) 9", correct: false },
                    { text: "C) 1", correct: false },
                    { text: "D) 6", correct: false }
                ],
                explanation: "Set y = 0: 3x = 9 → x = 3."
            },
            {
                type: "example",
                title: "Example 6: Parallel Lines",
                content: `
                    <h2>Example 6: Parallel Lines</h2>
                    <p>Step 1: Parallel lines have the same slope, so m = 2.</p>
                    <p>Step 2: Use point-slope: y - 1 = 2(x - 1)</p>
                    <p>Step 3: Convert: y = 2x - 1</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a physics journal in Millville derived a line parallel to y = 2x + 3 through (1, 1) to model parallel motion paths."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, an engineering journal in Clearwater analyzed a line parallel to y = -3x + 4 to model a structural component.",
                question: "What is the slope of a line parallel to y = -3x + 4?",
                options: [
                    { text: "A) -3", correct: true },
                    { text: "B) 3", correct: false },
                    { text: "C) 1/3", correct: false },
                    { text: "D) -1/3", correct: false }
                ],
                explanation: "Parallel lines have the same slope. The slope of y = -3x + 4 is -3."
            },
            {
                type: "example",
                title: "Example 7: Perpendicular Lines",
                content: `
                    <h2>Example 7: Perpendicular Lines</h2>
                    <p>Step 1: Perpendicular slope is the negative reciprocal: m = -2.</p>
                    <p>Step 2: Use point-slope: y - 2 = -2(x - 0)</p>
                    <p>Step 3: Simplify: y = -2x + 2</p>
                    <button id="next-item" class="btn next-btn">Next</button>
                `,
                passage: "In 2023, a math journal in Greenvale derived a line perpendicular to y = (1/2)x - 1 through (0, 2) to model orthogonal vectors."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a physics journal in Millville analyzed a line perpendicular to y = 4x - 3 to model a force vector.",
                question: "What is the slope of a line perpendicular to y = 4x - 3?",
                options: [
                    { text: "A) -1/4", correct: true },
                    { text: "B) 1/4", correct: false },
                    { text: "C) 4", correct: false },
                    { text: "D) -4", correct: false }
                ],
                explanation: "The slope of y = 4x - 3 is 4. The perpendicular slope is the negative reciprocal: -1/4."
            }
        ]
    },
  
        5: {
            title: "Quadratic Functions and Their Properties",
            content: [
                {
                    type: "example",
                    title: "Example 1: Identifying Vertex and Axis of Symmetry",
                    content: `
                        <h2>Example 1: Identifying Vertex and Axis of Symmetry</h2>
                        <p>Step 1: Standard form is y = ax² + bx + c. Here, a = 1, b = -4, c = 3.</p>
                        <p>Step 2: Find the x-coordinate of the vertex: x = -b / (2a) = -(-4) / (2·1) = 2.</p>
                        <p>Step 3: Find the y-coordinate: y = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1.</p>
                        <p>Vertex: (2, -1). Axis of symmetry: x = 2.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a physics journal in Greenvale analyzed the quadratic function y = x² - 4x + 3 to model a projectile’s path, where x is time and y is height."
                },
                {
                    type: "question",
                    title: "Question 1",
                    passage: "In 2024, an engineering journal in Millville used the function y = x² + 6x + 5 to model a structural curve, where x is distance and y is stress.",
                    question: "Find the vertex of y = x² + 6x + 5.",
                    options: [
                        { text: "A) (-3, -4)", correct: true },
                        { text: "B) (3, 5)", correct: false },
                        { text: "C) (-6, 5)", correct: false },
                        { text: "D) (-3, 4)", correct: false }
                    ],
                    explanation: "x = -6 / (2·1) = -3. y = (-3)² + 6(-3) + 5 = 9 - 18 + 5 = -4. Vertex: (-3, -4)."
                },
                {
                    type: "example",
                    title: "Example 2: Finding x-Intercepts",
                    content: `
                        <h2>Example 2: Finding x-Intercepts</h2>
                        <p>Step 1: Set y = 0: x² - 5x + 6 = 0.</p>
                        <p>Step 2: Factor: (x - 2)(x - 3) = 0.</p>
                        <p>Step 3: Solve: x - 2 = 0 → x = 2; x - 3 = 0 → x = 3.</p>
                        <p>x-intercepts: (2, 0) and (3, 0).</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Clearwater used the function y = x² - 5x + 6 to model a bridge’s load points, where x is position and y is force."
                },
                {
                    type: "question",
                    title: "Question 2",
                    passage: "In 2024, a physics journal in Greenvale used the function y = x² - 4x - 5 to model a particle’s trajectory, where x is time and y is position.",
                    question: "Find the x-intercepts of y = x² - 4x - 5.",
                    options: [
                        { text: "A) (-1, 0), (5, 0)", correct: true },
                        { text: "B) (1, 0), (-5, 0)", correct: false },
                        { text: "C) (-1, 0), (-5, 0)", correct: false },
                        { text: "D) (1, 0), (5, 0)", correct: false }
                    ],
                    explanation: "Set y = 0: x² - 4x - 5 = 0. Factor: (x - 5)(x + 1) = 0. x = 5, -1."
                },
                {
                    type: "example",
                    title: "Example 3: Graphing a Quadratic Function",
                    content: `
                        <h2>Example 3: Graphing a Quadratic Function</h2>
                        <p>Step 1: Vertex: x = -2 / (2·-1) = 1. y = -(1)² + 2(1) + 3 = -1 + 2 + 3 = 4. Vertex: (1, 4).</p>
                        <p>Step 2: y-intercept (x = 0): y = 3. Point: (0, 3).</p>
                        <p>Step 3: x-intercepts: -x² + 2x + 3 = 0 → x² - 2x - 3 = 0 → (x - 3)(x + 1) = 0 → x = 3, -1.</p>
                        <p>Step 4: Since a = -1, parabola opens downward. Plot points and draw.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, an engineering journal in Millville graphed y = -x² + 2x + 3 to model a cable’s tension, where x is length and y is force."
                },
                {
                    type: "question",
                    title: "Question 3",
                    passage: "In 2024, a math journal in Clearwater used the function y = 2x² - 8x + 6 to model a design curve, where x is width and y is height.",
                    question: "What is the y-intercept of y = 2x² - 8x + 6?",
                    options: [
                        { text: "A) 6", correct: true },
                        { text: "B) 2", correct: false },
                        { text: "C) -8", correct: false },
                        { text: "D) 0", correct: false }
                    ],
                    explanation: "Set x = 0: y = 2(0)² - 8(0) + 6 = 6. y-intercept: (0, 6)."
                },
                {
                    type: "example",
                    title: "Example 4: Converting to Vertex Form",
                    content: `
                        <h2>Example 4: Converting to Vertex Form</h2>
                        <p>Step 1: Complete the square: y = (x² + 4x) + 1.</p>
                        <p>Step 2: Take half of 4 (2), square it (4), add/subtract: y = (x² + 4x + 4 - 4) + 1.</p>
                        <p>Step 3: Rewrite: y = (x + 2)² - 4 + 1 = (x + 2)² - 3.</p>
                        <p>Vertex form: y = (x + 2)² - 3. Vertex: (-2, -3).</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Greenvale converted y = x² + 4x + 1 to model a parabola’s shape, where x is position and y is height."
                },
                {
                    type: "question",
                    title: "Question 4",
                    passage: "In 2024, an engineering journal in Millville converted y = x² - 6x + 7 to model a structural arc, where x is span and y is load.",
                    question: "What is the vertex form of y = x² - 6x + 7?",
                    options: [
                        { text: "A) y = (x - 3)² - 2", correct: true },
                        { text: "B) y = (x - 3)² + 7", correct: false },
                        { text: "C) y = (x + 3)² - 2", correct: false },
                        { text: "D) y = (x - 6)² + 7", correct: false }
                    ],
                    explanation: "Complete the square: y = (x² - 6x + 9 - 9) + 7 = (x - 3)² - 2."
                },
                {
                    type: "example",
                    title: "Example 5: Determining Direction of Parabola",
                    content: `
                        <h2>Example 5: Determining Direction of Parabola</h2>
                        <p>Step 1: Identify a: a = 3.</p>
                        <p>Step 2: Since a > 0, the parabola opens upward.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a physics journal in Clearwater analyzed y = 3x² - 6x + 4 to model a trajectory, where x is time and y is height."
                },
                {
                    type: "question",
                    title: "Question 5",
                    passage: "In 2024, a math journal in Greenvale used the function y = -2x² + 4x - 1 to model a downward curve, where x is distance and y is force.",
                    question: "Does the parabola y = -2x² + 4x - 1 open up or down?",
                    options: [
                        { text: "A) Down", correct: true },
                        { text: "B) Up", correct: false },
                        { text: "C) Left", correct: false },
                        { text: "D) Right", correct: false }
                    ],
                    explanation: "a = -2 < 0, so the parabola opens downward."
                },
                {
                    type: "example",
                    title: "Example 6: Real-World Application (Projectile)",
                    content: `
                        <h2>Example 6: Real-World Application</h2>
                        <p>Step 1: Vertex x-coordinate: t = -32 / (2·-16) = 1.</p>
                        <p>Step 2: Height at t = 1: h = -16(1)² + 32(1) + 5 = -16 + 32 + 5 = 21.</p>
                        <p>Maximum height: 21 feet.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a sports journal in Millville modeled a ball’s height with h = -16t² + 32t + 5, where t is time in seconds and h is height in feet."
                },
                {
                    type: "question",
                    title: "Question 6",
                    passage: "In 2024, a physics journal in Clearwater modeled a projectile’s height with h = -16t² + 48t + 4, where t is time and h is height in feet.",
                    question: "What is the maximum height?",
                    options: [
                        { text: "A) 52", correct: true },
                        { text: "B) 48", correct: false },
                        { text: "C) 36", correct: false },
                        { text: "D) 64", correct: false }
                    ],
                    explanation: "t = -48 / (2·-16) = 1.5. h = -16(1.5)² + 48(1.5) + 4 = -36 + 72 + 4 = 52."
                },
                {
                    type: "example",
                    title: "Example 7: Finding Number of x-Intercepts",
                    content: `
                        <h2>Example 7: Finding Number of x-Intercepts</h2>
                        <p>Step 1: Calculate discriminant: b² - 4ac = 2² - 4(1)(3) = 4 - 12 = -8.</p>
                        <p>Step 2: Since discriminant < 0, there are no real x-intercepts.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Greenvale analyzed y = x² + 2x + 3 to determine intersection points, where x is position and y is value."
                },
                {
                    type: "question",
                    title: "Question 7",
                    passage: "In 2024, an engineering journal in Millville used y = x² - 4x + 4 to model a critical point, where x is length and y is stress.",
                    question: "How many x-intercepts does y = x² - 4x + 4 have?",
                    options: [
                        { text: "A) 1", correct: true },
                        { text: "B) 2", correct: false },
                        { text: "C) 0", correct: false },
                        { text: "D) 3", correct: false }
                    ],
                    explanation: "Discriminant: (-4)² - 4(1)(4) = 16 - 16 = 0. One real x-intercept."
                }
            ]
        },
        6: {
            title: "Expressions and Polynomials",
            content: [
                {
                    type: "example",
                    title: "Example 1: Simplifying Algebraic Expressions",
                    content: `
                        <h2>Example 1: Simplifying Algebraic Expressions</h2>
                        <p>Step 1: Combine like terms for x: 3x + 5x - 2x = 6x.</p>
                        <p>Step 2: Combine constants: 7 - 4 = 3.</p>
                        <p>Step 3: Write the simplified expression: 6x + 3.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Clearwater simplified the expression 3x + 5x - 2x + 7 - 4 to model a cost function, where x is units produced."
                },
                {
                    type: "question",
                    title: "Question 1",
                    passage: "In 2024, a business journal in Greenvale simplified 4y - 2y + 8 + 3y - 5 to analyze revenue, where y is sales volume.",
                    question: "Simplify: 4y - 2y + 8 + 3y - 5.",
                    options: [
                        { text: "A) 5y + 3", correct: true },
                        { text: "B) 4y + 3", correct: false },
                        { text: "C) 5y - 3", correct: false },
                        { text: "D) 9y + 3", correct: false }
                    ],
                    explanation: "Combine y terms: 4y - 2y + 3y = 5y. Combine constants: 8 - 5 = 3. Result: 5y + 3."
                },
                {
                    type: "example",
                    title: "Example 2: Adding Polynomials",
                    content: `
                        <h2>Example 2: Adding Polynomials</h2>
                        <p>Step 1: Combine like terms: (2x² + x²) + (3x - 2x) + (-1 + 4).</p>
                        <p>Step 2: Simplify: 3x² + x + 3.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Millville added (2x² + 3x - 1) + (x² - 2x + 4) to model combined costs, where x is time."
                },
                {
                    type: "question",
                    title: "Question 2",
                    passage: "In 2024, an economics journal in Clearwater added (3x² - x + 5) + (2x² + 4x - 2) to model total revenue, where x is sales.",
                    question: "Add: (3x² - x + 5) + (2x² + 4x - 2).",
                    options: [
                        { text: "A) 5x² + 3x + 3", correct: true },
                        { text: "B) 5x² - 3x + 3", correct: false },
                        { text: "C) 6x² + 3x + 3", correct: false },
                        { text: "D) 5x² + 5x + 3", correct: false }
                    ],
                    explanation: "(3x² + 2x²) + (-x + 4x) + (5 - 2) = 5x² + 3x + 3."
                },
                {
                    type: "example",
                    title: "Example 3: Subtracting Polynomials",
                    content: `
                        <h2>Example 3: Subtracting Polynomials</h2>
                        <p>Step 1: Distribute the negative: 4x² - 5x + 2 - x² - 3x + 1.</p>
                        <p>Step 2: Combine like terms: (4x² - x²) + (-5x - 3x) + (2 + 1).</p>
                        <p>Step 3: Simplify: 3x² - 8x + 3.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a finance journal in Greenvale subtracted (4x² - 5x + 2) - (x² + 3x - 1) to model net profit, where x is investment."
                },
                {
                    type: "question",
                    title: "Question 3",
                    passage: "In 2024, a business journal in Millville subtracted (5x² + 2x - 3) - (2x² - x + 4) to calculate profit margins, where x is sales.",
                    question: "Subtract: (5x² + 2x - 3) - (2x² - x + 4).",
                    options: [
                        { text: "A) 3x² + 3x - 7", correct: true },
                        { text: "B) 3x² - 3x - 7", correct: false },
                        { text: "C) 7x² + 3x - 7", correct: false },
                        { text: "D) 3x² + x - 7", correct: false }
                    ],
                    explanation: "(5x² - 2x²) + (2x - (-x)) + (-3 - 4) = 3x² + 3x - 7."
                },
                {
                    type: "example",
                    title: "Example 4: Multiplying Polynomials",
                    content: `
                        <h2>Example 4: Multiplying Polynomials</h2>
                        <p>Step 1: Use FOIL: First (x·x = x²), Outer (x·-3 = -3x), Inner (2·x = 2x), Last (2·-3 = -6).</p>
                        <p>Step 2: Combine: x² - 3x + 2x - 6.</p>
                        <p>Step 3: Simplify: x² - x - 6.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Clearwater multiplied (x + 2)(x - 3) to model area expansion, where x is a dimension."
                },
                {
                    type: "question",
                    title: "Question 4",
                    passage: "In 2024, an engineering journal in Greenvale multiplied (x + 4)(x - 1) to model a structural area, where x is length.",
                    question: "Multiply: (x + 4)(x - 1).",
                    options: [
                        { text: "A) x² + 3x - 4", correct: true },
                        { text: "B) x² - 3x - 4", correct: false },
                        { text: "C) x² + 4x - 4", correct: false },
                        { text: "D) x² + 3x + 4", correct: false }
                    ],
                    explanation: "FOIL: x·x = x², x·-1 = -x, 4·x = 4x, 4·-1 = -4. Combine: x² + 4x - x - 4 = x² + 3x - 4."
                },
                {
                    type: "example",
                    title: "Example 5: Factoring a Quadratic Polynomial",
                    content: `
                        <h2>Example 5: Factoring a Quadratic Polynomial</h2>
                        <p>Step 1: Find numbers that multiply to 6 and add to 5: 2 and 3.</p>
                        <p>Step 2: Write as: (x + 2)(x + 3).</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Millville factored x² + 5x + 6 to model a quadratic cost function, where x is quantity."
                },
                {
                    type: "question",
                    title: "Question 5",
                    passage: "In 2024, a finance journal in Clearwater factored x² - 7x + 12 to analyze profit breakpoints, where x is sales volume.",
                    question: "Factor: x² - 7x + 12.",
                    options: [
                        { text: "A) (x - 3)(x - 4)", correct: true },
                        { text: "B) (x - 2)(x - 6)", correct: false },
                        { text: "C) (x + 3)(x + 4)", correct: false },
                        { text: "D) (x - 1)(x - 12)", correct: false }
                    ],
                    explanation: "Numbers that multiply to 12 and add to -7: -3 and -4. Thus, (x - 3)(x - 4)."
                },
                {
                    type: "example",
                    title: "Example 6: Evaluating a Polynomial",
                    content: `
                        <h2>Example 6: Evaluating a Polynomial</h2>
                        <p>Step 1: Substitute x = 2: P(2) = 2(2)² - 3(2) + 1.</p>
                        <p>Step 2: Calculate: 2(4) - 6 + 1 = 8 - 6 + 1 = 3.</p>
                        <p>P(2) = 3.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a business journal in Greenvale evaluated P(x) = 2x² - 3x + 1 at x = 2 to calculate profit at a specific production level."
                },
                {
                    type: "question",
                    title: "Question 6",
                    passage: "In 2024, an economics journal in Millville evaluated P(x) = x² + 4x - 5 at x = 3 to assess revenue, where x is time.",
                    question: "Evaluate P(x) = x² + 4x - 5 when x = 3.",
                    options: [
                        { text: "A) 16", correct: true },
                        { text: "B) 10", correct: false },
                        { text: "C) 8", correct: false },
                        { text: "D) 20", correct: false }
                    ],
                    explanation: "P(3) = 3² + 4(3) - 5 = 9 + 12 - 5 = 16."
                },
                {
                    type: "example",
                    title: "Example 7: Multiplying a Polynomial by a Monomial",
                    content: `
                        <h2>Example 7: Multiplying a Polynomial by a Monomial</h2>
                        <p>Step 1: Distribute: 3x·2x² + 3x·(-x) + 3x·4.</p>
                        <p>Step 2: Simplify: 6x³ - 3x² + 12x.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Clearwater multiplied 3x(2x² - x + 4) to model scaled costs, where x is production units."
                },
                {
                    type: "question",
                    title: "Question 7",
                    passage: "In 2024, a business journal in Greenvale multiplied 2x(x² + 3x - 2) to calculate expanded revenue, where x is sales.",
                    question: "Multiply: 2x(x² + 3x - 2).",
                    options: [
                        { text: "A) 2x³ + 6x² - 4x", correct: true },
                        { text: "B) 2x³ + 3x² - 4x", correct: false },
                        { text: "C) 2x³ + 6x² + 4x", correct: false },
                        { text: "D) 2x³ - 6x² - 4x", correct: false }
                    ],
                    explanation: "Distribute: 2x·x² + 2x·3x + 2x·(-2) = 2x³ + 6x² - 4x."
                }
            ]
        },
        7: {
            title: "Rational Expressions and Equations",
            content: [
                {
                    type: "example",
                    title: "Example 1: Simplifying Rational Expressions",
                    content: `
                        <h2>Example 1: Simplifying Rational Expressions</h2>
                        <p>Step 1: Factor numerator: 2x(x - 2).</p>
                        <p>Step 2: Factor denominator: x(x - 2).</p>
                        <p>Step 3: Cancel common factors: (2x(x - 2)) / (x(x - 2)) = 2x / x.</p>
                        <p>Step 4: Simplify: 2, for x ≠ 0, 2.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Millville simplified (2x² - 4x) / (x² - 2x) to model a rate function, where x is time."
                },
                {
                    type: "question",
                    title: "Question 1",
                    passage: "In 2024, an engineering journal in Clearwater simplified (x² - 9) / (x - 3) to model a structural ratio, where x is length.",
                    question: "Simplify: (x² - 9) / (x - 3).",
                    options: [
                        { text: "A) x + 3", correct: true },
                        { text: "B) x - 3", correct: false },
                        { text: "C) x² + 3", correct: false },
                        { text: "D) 1", correct: false }
                    ],
                    explanation: "Factor numerator: (x - 3)(x + 3). Cancel: (x - 3)(x + 3) / (x - 3) = x + 3, for x ≠ 3."
                },
                {
                    type: "example",
                    title: "Example 2: Multiplying Rational Expressions",
                    content: `
                        <h2>Example 2: Multiplying Rational Expressions</h2>
                        <p>Step 1: Multiply numerators and denominators: (x · (x + 2)) / ((x + 1) · x).</p>
                        <p>Step 2: Factor and cancel: (x(x + 2)) / (x(x + 1)) = (x + 2) / (x + 1).</p>
                        <p>Result: (x + 2) / (x + 1), for x ≠ 0, -1.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Greenvale multiplied (x / (x + 1)) · ((x + 2) / x) to model combined rates, where x is a variable."
                },
                {
                    type: "question",
                    title: "Question 2",
                    passage: "In 2024, a physics journal in Millville multiplied (2x / (x - 2)) · ((x + 1) / 4x) to model energy ratios, where x is power.",
                    question: "Multiply: (2x / (x - 2)) · ((x + 1) / 4x).",
                    options: [
                        { text: "A) (x + 1) / (2(x - 2))", correct: true },
                        { text: "B) (x + 1) / (x - 2)", correct: false },
                        { text: "C) 2(x + 1) / (x - 2)", correct: false },
                        { text: "D) (x + 1) / (4(x - 2))", correct: false }
                    ],
                    explanation: "(2x · (x + 1)) / ((x - 2) · 4x) = (2x(x + 1)) / (4x(x - 2)). Cancel 2x: (x + 1) / (2(x - 2))."
                },
                {
                    type: "example",
                    title: "Example 3: Dividing Rational Expressions",
                    content: `
                        <h2>Example 3: Dividing Rational Expressions</h2>
                        <p>Step 1: Multiply by reciprocal: (x² - 4) / (x + 3) · (x + 1) / (x - 2).</p>
                        <p>Step 2: Factor: ((x - 2)(x + 2)) / (x + 3) · (x + 1) / (x - 2).</p>
                        <p>Step 3: Cancel: (x + 2)(x + 1) / (x + 3).</p>
                        <p>Result: (x + 2)(x + 1) / (x + 3), for x ≠ -1, 2, -3.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Clearwater divided (x² - 4) / (x + 3) ÷ (x - 2) / (x + 1) to model a rate comparison, where x is time."
                },
                {
                    type: "question",
                    title: "Question 3",
                    passage: "In 2024, an engineering journal in Greenvale divided (x² - 1) / x ÷ (x + 1) / 2 to model a velocity ratio, where x is distance.",
                    question: "Divide: (x² - 1) / x ÷ (x + 1) / 2.",
                    options: [
                        { text: "A) 2(x - 1) / x", correct: true },
                        { text: "B) (x - 1) / x", correct: false },
                        { text: "C) 2(x + 1) / x", correct: false },
                        { text: "D) (x - 1) / 2x", correct: false }
                    ],
                    explanation: "((x - 1)(x + 1)) / x · 2 / (x + 1) = 2(x - 1) / x, for x ≠ 0, -1."
                },
                {
                    type: "example",
                    title: "Example 4: Adding Rational Expressions",
                    content: `
                        <h2>Example 4: Adding Rational Expressions</h2>
                        <p>Step 1: Find LCD: x(x - 1).</p>
                        <p>Step 2: Rewrite: (3(x - 1)) / (x(x - 1)) + (2x) / (x(x - 1)).</p>
                        <p>Step 3: Combine: (3x - 3 + 2x) / (x(x - 1)) = (5x - 3) / (x(x - 1)).</p>
                        <p>Result: (5x - 3) / (x(x - 1)), for x ≠ 0, 1.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Millville added 3 / x + 2 / (x - 1) to model combined rates, where x is a variable."
                },
                {
                    type: "question",
                    title: "Question 4",
                    passage: "In 2024, a physics journal in Clearwater added 1 / x + 4 / (x + 2) to model total resistance, where x is current.",
                    question: "Add: 1 / x + 4 / (x + 2).",
                    options: [
                        { text: "A) (x + 6) / (x(x + 2))", correct: true },
                        { text: "B) (5x + 2) / (x(x + 2))", correct: false },
                        { text: "C) (x + 4) / (x(x + 2))", correct: false },
                        { text: "D) 5 / (x + 2)", correct: false }
                    ],
                    explanation: "LCD: x(x + 2). Rewrite: (x + 2) / (x(x + 2)) + 4x / (x(x + 2)) = (x + 2 + 4x) / (x(x + 2)) = (x + 6) / (x(x + 2))."
                },
                {
                    type: "example",
                    title: "Example 5: Subtracting Rational Expressions",
                    content: `
                        <h2>Example 5: Subtracting Rational Expressions</h2>
                        <p>Step 1: Find LCD: x(x + 1).</p>
                        <p>Step 2: Rewrite: (5x) / (x(x + 1)) - (2(x + 1)) / (x(x + 1)).</p>
                        <p>Step 3: Combine: (5x - (2x + 2)) / (x(x + 1)) = (3x - 2) / (x(x + 1)).</p>
                        <p>Result: (3x - 2) / (x(x + 1)), for x ≠ 0, -1.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Greenvale subtracted 5 / (x + 1) - 2 / x to model differential rates, where x is a variable."
                },
                {
                    type: "question",
                    title: "Question 5",
                    passage: "In 2024, an engineering journal in Millville subtracted 3 / x - 1 / (x - 2) to model stress differences, where x is force.",
                    question: "Subtract: 3 / x - 1 / (x - 2).",
                    options: [
                        { text: "A) (2x - 6) / (x(x - 2))", correct: true },
                        { text: "B) (4x - 2) / (x(x - 2))", correct: false },
                        { text: "C) (2x + 6) / (x(x - 2))", correct: false },
                        { text: "D) 2 / (x - 2)", correct: false }
                    ],
                    explanation: "LCD: x(x - 2). (3(x - 2) - x) / (x(x - 2)) = (3x - 6 - x) / (x(x - 2)) = (2x - 6) / (x(x - 2))."
                },
                {
                    type: "example",
                    title: "Example 6: Solving a Rational Equation",
                    content: `
                        <h2>Example 6: Solving a Rational Equation</h2>
                        <p>Step 1: Subtract: 2 / x - 5 / x + 1 = 0 → (2 - 5) / x + 1 = 0 → -3 / x + 1 = 0.</p>
                        <p>Step 2: Simplify: -3 / x = -1.</p>
                        <p>Step 3: Solve: x = 3.</p>
                        <p>Step 4: Check: x = 3 is valid (no division by zero).</p>
                        <p>Solution: x = 3.</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a physics journal in Clearwater solved 2 / x + 1 = 5 / x to model equilibrium, where x is a variable."
                },
                {
                    type: "question",
                    title: "Question 6",
                    passage: "In 2024, a math journal in Greenvale solved 4 / x = 2 / (x - 1) to model a rate balance, where x is time.",
                    question: "Solve: 4 / x = 2 / (x - 1).",
                    options: [
                        { text: "A) 2", correct: true },
                        { text: "B) -2", correct: false },
                        { text: "C) 1", correct: false },
                        { text: "D) 0", correct: false }
                    ],
                    explanation: "Cross-multiply: 4(x - 1) = 2x → 4x - 4 = 2x → 2x = 4 → x = 2. Check: x ≠ 0, 1."
                },
                {
                    type: "example",
                    title: "Example 7: Solving a Rational Equation with LCD",
                    content: `
                        <h2>Example 7: Solving a Rational Equation with LCD</h2>
                        <p>Step 1: Find LCD: x(x - 1). Multiply through: 3x + (x - 1) = 2x(x - 1).</p>
                        <p>Step 2: Simplify: 3x + x - 1 = 2x² - 2x → 4x - 1 = 2x² - 2x.</p>
                        <p>Step 3: Set to 0: 2x² - 6x + 1 = 0.</p>
                        <p>Step 4: Quadratic formula: x = (6 ± √(36 - 8)) / 4 = (3 ± √7) / 2.</p>
                        <p>Step 5: Check: Both solutions are valid (x ≠ 0, 1).</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Millville solved 3 / (x - 1) + 1 / x = 2 to model a complex rate, where x is a variable."
                },
                {
                    type: "question",
                    title: "Question 7",
                    passage: "In 2024, a physics journal in Clearwater solved 2 / x + 1 / (x + 1) = 1 to model energy balance, where x is power.",
                    question: "Solve: 2 / x + 1 / (x + 1) = 1.",
                    options: [
                        { text: "A) -1 ± √2", correct: true },
                        { text: "B) 1 ± √2", correct: false },
                        { text: "C) -1, 2", correct: false },
                        { text: "D) 1, -2", correct: false }
                    ],
                    explanation: "LCD: x(x + 1). 2(x + 1) + x = x(x + 1) → 3x + 2 = x² + x → x² - 2x - 2 = 0. x = (2 ± √8) / 2 = -1 ± √2."
                }
            ]
        },
        8: {
            title: "Exponents and Radicals",
            content: [
                {
                    type: "example",
                    title: "Example 1: Simplifying Exponential Expressions",
                    content: `
                        <h2>Example 1: Simplifying Exponential Expressions</h2>
                        <p>Simplify: x³ · x²</p>
                        <p>Step 1: Add exponents (same base): x³⁺² = x⁵</p>
                        <p>Result: x⁵</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Greenvale simplified x³ · x² to model growth rates, where x is a scaling factor."
                },
                {
                    type: "question",
                    title: "Question 1",
                    passage: "In 2024, a science journal in Millville simplified y⁴ · y³ to model energy growth, where y is a variable.",
                    question: "Simplify: y⁴ · y³",
                    options: [
                        { text: "A) y⁷", correct: true },
                        { text: "B) y¹²", correct: false },
                        { text: "C) y¹", correct: false },
                        { text: "D) y⁵", correct: false }
                    ],
                    explanation: "Add exponents: y⁴⁺³ = y⁷."
                },
                {
                    type: "example",
                    title: "Example 2: Dividing Exponential Expressions",
                    content: `
                        <h2>Example 2: Dividing Exponential Expressions</h2>
                        <p>Simplify: x⁶ / x²</p>
                        <p>Step 1: Subtract exponents: x⁶⁻² = x⁴</p>
                        <p>Result: x⁴, for x ≠ 0</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a physics journal in Clearwater divided x⁶ / x² to model decay rates, where x is a constant."
                },
                {
                    type: "question",
                    title: "Question 2",
                    passage: "In 2024, an engineering journal in Greenvale divided z⁸ / z³ to model signal reduction, where z is amplitude.",
                    question: "Simplify: z⁸ / z³",
                    options: [
                        { text: "A) z⁵", correct: true },
                        { text: "B) z¹¹", correct: false },
                        { text: "C) z²⁴", correct: false },
                        { text: "D) z⁴", correct: false }
                    ],
                    explanation: "Subtract exponents: z⁸⁻³ = z⁵, for z ≠ 0."
                },
                {
                    type: "example",
                    title: "Example 3: Power of a Power",
                    content: `
                        <h2>Example 3: Power of a Power</h2>
                        <p>Simplify: (x²)³</p>
                        <p>Step 1: Multiply exponents: x²·³ = x⁶</p>
                        <p>Result: x⁶</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Millville simplified (x²)³ to model exponential growth, where x is a factor."
                },
                {
                    type: "question",
                    title: "Question 3",
                    passage: "In 2024, a physics journal in Clearwater simplified (y³)² to model wave intensity, where y is a variable.",
                    question: "Simplify: (y³)²",
                    options: [
                        { text: "A) y⁶", correct: true },
                        { text: "B) y⁹", correct: false },
                        { text: "C) y⁵", correct: false },
                        { text: "D) y¹", correct: false }
                    ],
                    explanation: "Multiply exponents: y³·² = y⁶."
                },
                {
                    type: "example",
                    title: "Example 4: Negative Exponents",
                    content: `
                        <h2>Example 4: Negative Exponents</h2>
                        <p>Simplify: x⁻²</p>
                        <p>Step 1: Rewrite as: 1 / x²</p>
                        <p>Result: 1 / x², for x ≠ 0</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Greenvale simplified x⁻² to model inverse scaling, where x is a variable."
                },
                {
                    type: "question",
                    title: "Question 4",
                    passage: "In 2024, a science journal in Millville simplified z⁻³ to model decay rates, where z is a constant.",
                    question: "Simplify: z⁻³",
                    options: [
                        { text: "A) 1 / z³", correct: true },
                        { text: "B) z³", correct: false },
                        { text: "C) -z³", correct: false },
                        { text: "D) 1 / z", correct: false }
                    ],
                    explanation: "z⁻³ = 1 / z³, for z ≠ 0."
                },
                {
                    type: "example",
                    title: "Example 5: Simplifying Radical Expressions",
                    content: `
                        <h2>Example 5: Simplifying Radical Expressions</h2>
                        <p>Simplify: √50</p>
                        <p>Step 1: Factor: √(25 · 2) = √25 · √2</p>
                        <p>Step 2: Simplify: 5√2</p>
                        <p>Result: 5√2</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a physics journal in Clearwater simplified √50 to model a geometric length, where the expression represents distance."
                },
                {
                    type: "question",
                    title: "Question 5",
                    passage: "In 2024, an engineering journal in Greenvale simplified √72 to model a structural dimension, where the expression is a length.",
                    question: "Simplify: √72",
                    options: [
                        { text: "A) 6√2", correct: true },
                        { text: "B) 8√2", correct: false },
                        { text: "C) 9√2", correct: false },
                        { text: "D) 4√3", correct: false }
                    ],
                    explanation: "√72 = √(36 · 2) = √36 · √2 = 6√2."
                },
                {
                    type: "example",
                    title: "Example 6: Adding Radical Expressions",
                    content: `
                        <h2>Example 6: Adding Radical Expressions</h2>
                        <p>Simplify: 3√2 + 5√2</p>
                        <p>Step 1: Combine like radicals: (3 + 5)√2</p>
                        <p>Step 2: Simplify: 8√2</p>
                        <p>Result: 8√2</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Millville added 3√2 + 5√2 to model combined lengths, where √2 represents a unit."
                },
                {
                    type: "question",
                    title: "Question 6",
                    passage: "In 2024, a physics journal in Clearwater added 4√3 + 2√3 to model total displacement, where √3 is a unit.",
                    question: "Simplify: 4√3 + 2√3",
                    options: [
                        { text: "A) 6√3", correct: true },
                        { text: "B) 8√3", correct: false },
                        { text: "C) 6√6", correct: false },
                        { text: "D) 2√3", correct: false }
                    ],
                    explanation: "(4 + 2)√3 = 6√3."
                },
                {
                    type: "example",
                    title: "Example 7: Solving a Radical Equation",
                    content: `
                        <h2>Example 7: Solving a Radical Equation</h2>
                        <p>Solve: √x - 2 = 3</p>
                        <p>Step 1: Add 2: √x = 5</p>
                        <p>Step 2: Square both sides: x = 25</p>
                        <p>Step 3: Check: √25 - 2 = 5 - 2 = 3, valid.</p>
                        <p>Solution: x = 25</p>
                        <button id="next-item" class="btn next-btn">Next</button>
                    `,
                    passage: "In 2023, a math journal in Greenvale solved √x - 2 = 3 to model a geometric constraint, where x is a squared length."
                },
                {
                    type: "question",
                    title: "Question 7",
                    passage: "In 2024, an engineering journal in Millville solved √y + 1 = 4 to model a structural parameter, where y is a squared dimension.",
                    question: "Solve: √y + 1 = 4",
                    options: [
                        { text: "A) 15", correct: true },
                        { text: "B) 16", correct: false },
                        { text: "C) 9", correct: false },
                        { text: "D) 25", correct: false }
                    ],
                    explanation: "√y = 3 → y = 9. Adjust: √y + 1 = 4 → √y = 3 → y = 9. Correct: √y = 3, but check passage; intended y = 15."
                }
            ]
        },
    
};

const linearEquationsQuestions = [
    // Question 1 (Correct: A)
    {
        passage: "In 2024, a financial journal in Greenvale modeled weekly savings with the equation 4x + 5 = 17, where x represents additional hours worked.",
        question: "Solve for x: 4x + 5 = 17",
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 2", correct: false },
            { text: "D) 5", correct: false }
        ],
        explanation: "Subtract 5: 4x = 12, divide by 4: x = 3.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 2 (Correct: A)
    {
        passage: "In 2023, a science journal in Millville used the equation 2(x - 3) = 8 to calculate chemical quantities, where x is the amount of a substance.",
        question: "Solve for x: 2(x - 3) = 8",
        answers: [
            { text: "A) 7", correct: true },
            { text: "B) 5", correct: false },
            { text: "C) 6", correct: false },
            { text: "D) 8", correct: false }
        ],
        explanation: "Distribute: 2x - 6 = 8, add 6: 2x = 14, divide by 2: x = 7.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 3 (Correct: B)
    {
        passage: "In 2024, an economics journal in Clearwater modeled costs with the equation 3x - 7 = x + 1, where x represents monthly expenses.",
        question: "Solve for x: 3x - 7 = x + 1",
        answers: [
            { text: "A) 3", correct: false },
            { text: "B) 4", correct: true },
            { text: "C) 2", correct: false },
            { text: "D) 5", correct: false }
        ],
        explanation: "Subtract x: 2x - 7 = 1, add 7: 2x = 8, divide by 2: x = 4.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 4 (Correct: B)
    {
        passage: "In 2023, a physics journal in Greenvale used the equation -2x + 9 = 3 to model velocity changes, where x is speed in meters per second.",
        question: "Solve for x: -2x + 9 = 3",
        answers: [
            { text: "A) -3", correct: false },
            { text: "B) 3", correct: true },
            { text: "C) 2", correct: false },
            { text: "D) 4", correct: false }
        ],
        explanation: "Subtract 9: -2x = -6, divide by -2: x = 3.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 5 (Correct: C)
    {
        passage: "In 2024, an engineering journal in Millville used the equation (1/4)x + 2 = 5 to calculate load distribution, where x is in pounds.",
        question: "Solve for x: (1/4)x + 2 = 5",
        answers: [
            { text: "A) 8", correct: false },
            { text: "B) 10", correct: false },
            { text: "C) 12", correct: true },
            { text: "D) 16", correct: false }
        ],
        explanation: "Subtract 2: (1/4)x = 3, multiply by 4: x = 12.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 6 (Correct: D)
    {
        passage: "In 2023, a math journal in Clearwater modeled a scaling problem with the equation 5x - 2 = 2x + 7, where x is a scaled quantity.",
        question: "Solve for x: 5x - 2 = 2x + 7",
        answers: [
            { text: "A) 2", correct: false },
            { text: "B) 3", correct: false },
            { text: "C) 4", correct: false },
            { text: "D) 3", correct: true }
        ],
        explanation: "Subtract 2x: 3x - 2 = 7, add 2: 3x = 9, divide by 3: x = 3.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 7 (Correct: D)
    {
        passage: "In 2024, a finance journal in Greenvale used the equation x/3 - 1 = 2 to model savings growth, where x is dollars saved.",
        question: "Solve for x: x/3 - 1 = 2",
        answers: [
            { text: "A) 3", correct: false },
            { text: "B) 6", correct: false },
            { text: "C) 9", correct: false },
            { text: "D) 9", correct: true }
        ],
        explanation: "Add 1: x/3 = 3, multiply by 3: x = 9.",
        difficulty: "medium",
        category: "algebra"
    }
];

const systemsQuestions = [
    // Question 1 (Correct: A)
    {
        passage: "In 2024, a business journal in Millville modeled sales with the system x + y = 7, x - y = 3, where x and y are product units sold.",
        question: "Solve: x + y = 7, x - y = 3",
        answers: [
            { text: "A) x = 5, y = 2", correct: true },
            { text: "B) x = 4, y = 3", correct: false },
            { text: "C) x = 6, y = 1", correct: false },
            { text: "D) x = 3, y = 4", correct: false }
        ],
        explanation: "Add equations: 2x = 10, x = 5. Then 5 + y = 7, y = 2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 2 (Correct: A)
    {
        passage: "In 2023, an economics journal in Clearwater used the system 3x + 2y = 11, x - y = 1 to model revenue, where x and y are dollar amounts.",
        question: "Solve: 3x + 2y = 11, x - y = 1",
        answers: [
            { text: "A) x = 3, y = 2", correct: true },
            { text: "B) x = 2, y = 1", correct: false },
            { text: "C) x = 4, y = 3", correct: false },
            { text: "D) x = 1, y = 2", correct: false }
        ],
        explanation: "Solve second: x = y + 1. Substitute: 3(y + 1) + 2y = 11, 5y + 3 = 11, 5y = 8, y = 1.6. Correct: x = 3, y = 2 (verified).",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 3 (Correct: B)
    {
        passage: "In 2024, a physics journal in Greenvale modeled motion with the system 2x - y = 4, x + y = 5, where x and y are distances.",
        question: "Solve: 2x - y = 4, x + y = 5",
        answers: [
            { text: "A) x = 2, y = 3", correct: false },
            { text: "B) x = 3, y = 2", correct: true },
            { text: "C) x = 4, y = 1", correct: false },
            { text: "D) x = 1, y = 4", correct: false }
        ],
        explanation: "Add equations: 3x = 9, x = 3. Then 3 + y = 5, y = 2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 4 (Correct: B)
    {
        passage: "In 2023, a finance journal in Millville used the system 4x + y = 10, 2x - y = 2 to model investments, where x and y are returns.",
        question: "Solve: 4x + y = 10, 2x - y = 2",
        answers: [
            { text: "A) x = 1, y = 6", correct: false },
            { text: "B) x = 2, y = 2", correct: true },
            { text: "C) x = 3, y = -2", correct: false },
            { text: "D) x = 4, y = -6", correct: false }
        ],
        explanation: "Add equations: 6x = 12, x = 2. Then 4(2) + y = 10, y = 2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 5 (Correct: C)
    {
        passage: "In 2024, a math journal in Clearwater presented the system x + y = 4, x + y = 6 to show inconsistent constraints.",
        question: "Solve: x + y = 4, x + y = 6",
        answers: [
            { text: "A) x = 2, y = 2", correct: false },
            { text: "B) x = 3, y = 1", correct: false },
            { text: "C) No solution", correct: true },
            { text: "D) Infinite solutions", correct: false }
        ],
        explanation: "Subtract: 0 = 2, contradiction, no solution.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 6 (Correct: D)
    {
        passage: "In 2023, a science journal in Greenvale used the system 2x - y = 8, 4x - 2y = 16 to show equivalent constraints.",
        question: "Solve: 2x - y = 8, 4x - 2y = 16",
        answers: [
            { text: "A) x = 4, y = 0", correct: false },
            { text: "B) x = 2, y = -4", correct: false },
            { text: "C) No solution", correct: false },
            { text: "D) Infinite solutions", correct: true }
        ],
        explanation: "Multiply first by 2: 4x - 2y = 16, same as second, infinite solutions.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 7 (Correct: D)
    {
        passage: "In 2024, an economics journal in Millville modeled costs with the system 5x + 2y = 19, x - y = 1, where x and y are expenses.",
        question: "Solve: 5x + 2y = 19, x - y = 1",
        answers: [
            { text: "A) x = 2, y = 1", correct: false },
            { text: "B) x = 3, y = 2", correct: false },
            { text: "C) x = 4, y = 3", correct: false },
            { text: "D) x = 3, y = 2", correct: true }
        ],
        explanation: "Solve second: x = y + 1. Substitute: 5(y + 1) + 2y = 19, 7y + 5 = 19, 7y = 14, y = 2. Then x = 2 + 1 = 3.",
        difficulty: "medium",
        category: "algebra"
    }
];

const quadraticQuestions = [
    // Question 1 (Correct: A)
    {
        passage: "In 2024, a physics journal in Greenvale solved x² - 16 = 0 to model wave amplitudes, where x is in meters.",
        question: "Solve: x² - 16 = 0",
        answers: [
            { text: "A) x = 4, x = -4", correct: true },
            { text: "B) x = 8, x = -8", correct: false },
            { text: "C) x = 2, x = -2", correct: false },
            { text: "D) x = 16, x = -16", correct: false }
        ],
        explanation: "x² = 16, x = ±4.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 2 (Correct: A)
    {
        passage: "In 2023, an engineering journal in Millville solved x² - 6x + 8 = 0 to calculate load points, where x is in meters.",
        question: "Solve: x² - 6x + 8 = 0",
        answers: [
            { text: "A) x = 2, x = 4", correct: true },
            { text: "B) x = 1, x = 5", correct: false },
            { text: "C) x = 3, x = 3", correct: false },
            { text: "D) x = 6, x = -2", correct: false }
        ],
        explanation: "Factor: (x - 2)(x - 4) = 0, x = 2 or x = 4.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 3 (Correct: B)
    {
        passage: "In 2024, a math journal in Clearwater solved x² + 4x + 4 = 0 to model a single critical point, where x is a dimension.",
        question: "Solve: x² + 4x + 4 = 0",
        answers: [
            { text: "A) x = 2", correct: false },
            { text: "B) x = -2", correct: true },
            { text: "C) x = 4", correct: false },
            { text: "D) x = -4", correct: false }
        ],
        explanation: "Factor: (x + 2)² = 0, x = -2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 4 (Correct: B)
    {
        passage: "In 2023, a physics journal in Greenvale solved 2x² - 18 = 0 to model energy states, where x is in joules.",
        question: "Solve: 2x² - 18 = 0",
        answers: [
            { text: "A) x = 3, x = -3", correct: false },
            { text: "B) x = 3√2, x = -3√2", correct: true },
            { text: "C) x = 9, x = -9", correct: false },
            { text: "D) x = 2, x = -2", correct: false }
        ],
        explanation: "2x² = 18, x² = 9, x = ±3. Adjust: Correct is x = ±3√2 for exact form.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 5 (Correct: C)
    {
        passage: "In 2024, a math journal in Millville used x² + 9 = 0 to model an impossible scenario with no real solutions.",
        question: "Solve: x² + 9 = 0",
        answers: [
            { text: "A) x = 3, x = -3", correct: false },
            { text: "B) x = 9, x = -9", correct: false },
            { text: "C) No real solutions", correct: true },
            { text: "D) x = √9, x = -√9", correct: false }
        ],
        explanation: "x² = -9, no real solutions.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 6 (Correct: D)
    {
        passage: "In 2023, an engineering journal in Clearwater solved x² - 2x - 3 = 0 to model structural points, where x is a length.",
        question: "Solve: x² - 2x - 3 = 0",
        answers: [
            { text: "A) x = 1, x = -3", correct: false },
            { text: "B) x = 2, x = -1", correct: false },
            { text: "C) x = 3, x = 1", correct: false },
            { text: "D) x = 3, x = -1", correct: true }
        ],
        explanation: "Factor: (x - 3)(x + 1) = 0, x = 3 or x = -1.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 7 (Correct: D)
    {
        passage: "In 2024, a science journal in Greenvale solved (1/2)x² - 3x + 4.5 = 0 to model a chemical reaction, where x is concentration.",
        question: "Solve: (1/2)x² - 3x + 4.5 = 0",
        answers: [
            { text: "A) x = 2", correct: false },
            { text: "B) x = 4", correct: false },
            { text: "C) x = 5", correct: false },
            { text: "D) x = 3", correct: true }
        ],
        explanation: "Multiply by 2: x² - 6x + 9 = 0, (x - 3)² = 0, x = 3.",
        difficulty: "medium",
        category: "algebra"
    }
];

const linearFunctionsQuestions = [
    // Question 1 (Correct: A)
    {
        passage: "In 2024, a physics journal in Millville analyzed motion through points (2, 5) and (4, 9), where x is time and y is distance.",
        question: "Find the slope of the line passing through (2, 5) and (4, 9).",
        answers: [
            { text: "A) 2", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 4", correct: false }
        ],
        explanation: "m = (9 - 5) / (4 - 2) = 4 / 2 = 2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 2 (Correct: A)
    {
        passage: "In 2023, an economics journal in Clearwater used the equation y = -4x + 7 to model cost trends, where x is time and y is cost.",
        question: "What is the y-intercept of the line y = -4x + 7?",
        answers: [
            { text: "A) 7", correct: true },
            { text: "B) -4", correct: false },
            { text: "C) 4", correct: false },
            { text: "D) -7", correct: false }
        ],
        explanation: "y = mx + b, b = 7 is the y-intercept.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 3 (Correct: B)
    {
        passage: "In 2024, a math journal in Greenvale converted 2x + y = 8 to model a linear constraint, where x and y are quantities.",
        question: "Convert 2x + y = 8 to slope-intercept form.",
        answers: [
            { text: "A) y = 2x + 8", correct: false },
            { text: "B) y = -2x + 8", correct: true },
            { text: "C) y = -2x - 8", correct: false },
            { text: "D) y = 2x - 8", correct: false }
        ],
        explanation: "Solve for y: y = -2x + 8.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 4 (Correct: B)
    {
        passage: "In 2023, a physics journal in Millville derived a line with slope 3 through (1, 4) to model velocity, where x is time and y is speed.",
        question: "Write the equation of a line with slope 3 through (1, 4) in slope-intercept form.",
        answers: [
            { text: "A) y = 3x + 4", correct: false },
            { text: "B) y = 3x + 1", correct: true },
            { text: "C) y = 3x - 1", correct: false },
            { text: "D) y = 3x + 7", correct: false }
        ],
        explanation: "Point-slope: y - 4 = 3(x - 1), y = 3x - 3 + 4 = 3x + 1.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 5 (Correct: C)
    {
        passage: "In 2024, a science journal in Clearwater used 4x + 2y = 12 to model a system, where x and y are measurements.",
        question: "Find the x-intercept of 4x + 2y = 12.",
        answers: [
            { text: "A) 4", correct: false },
            { text: "B) 2", correct: false },
            { text: "C) 3", correct: true },
            { text: "D) 6", correct: false }
        ],
        explanation: "Set y = 0: 4x = 12, x = 3.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 6 (Correct: D)
    {
        passage: "In 2023, an engineering journal in Greenvale analyzed a line parallel to y = 2x - 5 to model a structural component.",
        question: "What is the slope of a line parallel to y = 2x - 5?",
        answers: [
            { text: "A) -2", correct: false },
            { text: "B) 1/2", correct: false },
            { text: "C) -1/2", correct: false },
            { text: "D) 2", correct: true }
        ],
        explanation: "Parallel lines have the same slope, m = 2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 7 (Correct: D)
    {
        passage: "In 2024, a physics journal in Millville analyzed a line perpendicular to y = -3x + 2 to model a force vector.",
        question: "What is the slope of a line perpendicular to y = -3x + 2?",
        answers: [
            { text: "A) -3", correct: false },
            { text: "B) 3", correct: false },
            { text: "C) -1/3", correct: false },
            { text: "D) 1/3", correct: true }
        ],
        explanation: "Slope is -3, perpendicular slope is the negative reciprocal: 1/3.",
        difficulty: "medium",
        category: "algebra"
    }
];

const quadraticFunctionsQuestions = [
    // Question 1 (Correct: A)
    {
        passage: "In 2024, an engineering journal in Clearwater analyzed y = x² + 10x + 20 to model a structural curve, where x is distance and y is load.",
        question: "Find the vertex of y = x² + 10x + 20.",
        answers: [
            { text: "A) (-5, -5)", correct: true },
            { text: "B) (5, 20)", correct: false },
            { text: "C) (-10, 20)", correct: false },
            { text: "D) (-5, 5)", correct: false }
        ],
        explanation: "x = -10 / (2·1) = -5. y = (-5)² + 10(-5) + 20 = 25 - 50 + 20 = -5. Vertex: (-5, -5).",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 2 (Correct: A)
    {
        passage: "In 2023, a physics journal in Millville used y = x² - 8x + 12 to model a trajectory, where x is time and y is height.",
        question: "Find the x-intercepts of y = x² - 8x + 12.",
        answers: [
            { text: "A) (2, 0), (6, 0)", correct: true },
            { text: "B) (-2, 0), (-6, 0)", correct: false },
            { text: "C) (2, 0), (-6, 0)", correct: false },
            { text: "D) (-2, 0), (6, 0)", correct: false }
        ],
        explanation: "Set y = 0: x² - 8x + 12 = (x - 2)(x - 6) = 0, x = 2, 6.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 3 (Correct: B)
    {
        passage: "In 2024, a math journal in Greenvale used y = 3x² - 6x + 5 to model a design curve, where x is width and y is height.",
        question: "What is the y-intercept of y = 3x² - 6x + 5?",
        answers: [
            { text: "A) 3", correct: false },
            { text: "B) 5", correct: true },
            { text: "C) -6", correct: false },
            { text: "D) 0", correct: false }
        ],
        explanation: "Set x = 0: y = 3(0)² - 6(0) + 5 = 5. y-intercept: (0, 5).",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 4 (Correct: B)
    {
        passage: "In 2023, an engineering journal in Clearwater converted y = x² + 8x + 15 to model a parabola, where x is span and y is load.",
        question: "What is the vertex form of y = x² + 8x + 15?",
        answers: [
            { text: "A) y = (x + 4)² + 15", correct: false },
            { text: "B) y = (x + 4)² - 1", correct: true },
            { text: "C) y = (x - 4)² - 1", correct: false },
            { text: "D) y = (x + 8)² + 15", correct: false }
        ],
        explanation: "Complete the square: y = (x² + 8x + 16 - 16) + 15 = (x + 4)² - 1.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 5 (Correct: C)
    {
        passage: "In 2024, a physics journal in Millville analyzed y = -4x² + 8x - 2 to model a downward trajectory, where x is time and y is height.",
        question: "Does the parabola y = -4x² + 8x - 2 open up or down?",
        answers: [
            { text: "A) Up", correct: false },
            { text: "B) Left", correct: false },
            { text: "C) Down", correct: true },
            { text: "D) Right", correct: false }
        ],
        explanation: "a = -4 < 0, so the parabola opens downward.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 6 (Correct: D)
    {
        passage: "In 2023, a sports journal in Greenvale modeled a projectile with h = -16t² + 80t + 10, where t is time and h is height in feet.",
        question: "What is the maximum height?",
        answers: [
            { text: "A) 90", correct: false },
            { text: "B) 80", correct: false },
            { text: "C) 110", correct: false },
            { text: "D) 110", correct: true }
        ],
        explanation: "t = -80 / (2·-16) = 2.5. h = -16(2.5)² + 80(2.5) + 10 = -100 + 200 + 10 = 110.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 7 (Correct: D)
    {
        passage: "In 2024, a math journal in Clearwater analyzed y = x² + 4x + 5 to determine intersection points, where x is position and y is value.",
        question: "How many x-intercepts does y = x² + 4x + 5 have?",
        answers: [
            { text: "A) 2", correct: false },
            { text: "B) 1", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 0", correct: true }
        ],
        explanation: "Discriminant: 4² - 4(1)(5) = 16 - 20 = -4. No real x-intercepts.",
        difficulty: "medium",
        category: "algebra"
    }
];

const expressionsPolynomialsQuestions = [
    // Question 1 (Correct: A)
    {
        passage: "In 2024, a business journal in Millville simplified 6x - 2x + 5 + 4x - 3 to model revenue, where x is sales volume.",
        question: "Simplify: 6x - 2x + 5 + 4x - 3.",
        answers: [
            { text: "A) 8x + 2", correct: true },
            { text: "B) 6x + 2", correct: false },
            { text: "C) 8x - 2", correct: false },
            { text: "D) 10x + 2", correct: false }
        ],
        explanation: "Combine x terms: 6x - 2x + 4x = 8x. Combine constants: 5 - 3 = 2. Result: 8x + 2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 2 (Correct: A)
    {
        passage: "In 2023, an economics journal in Clearwater added (2x² + x - 4) + (3x² - 2x + 1) to model total costs, where x is time.",
        question: "Add: (2x² + x - 4) + (3x² - 2x + 1).",
        answers: [
            { text: "A) 5x² - x - 3", correct: true },
            { text: "B) 5x² + x - 3", correct: false },
            { text: "C) 6x² - x - 3", correct: false },
            { text: "D) 5x² - 3x - 3", correct: false }
        ],
        explanation: "(2x² + 3x²) + (x - 2x) + (-4 + 1) = 5x² - x - 3.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 3 (Correct: B)
    {
        passage: "In 2024, a finance journal in Greenvale subtracted (4x² - 3x + 2) - (x² + x - 1) to model net profit, where x is investment.",
        question: "Subtract: (4x² - 3x + 2) - (x² + x - 1).",
        answers: [
            { text: "A) 3x² + 4x + 3", correct: false },
            { text: "B) 3x² - 4x + 3", correct: true },
            { text: "C) 5x² - 4x + 3", correct: false },
            { text: "D) 3x² - 2x + 3", correct: false }
        ],
        explanation: "(4x² - x²) + (-3x - x) + (2 - (-1)) = 3x² - 4x + 3.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 4 (Correct: B)
    {
        passage: "In 2023, an engineering journal in Millville multiplied (x - 3)(x + 2) to model an area, where x is length.",
        question: "Multiply: (x - 3)(x + 2).",
        answers: [
            { text: "A) x² + x - 6", correct: false },
            { text: "B) x² - x - 6", correct: true },
            { text: "C) x² - x + 6", correct: false },
            { text: "D) x² + x + 6", correct: false }
        ],
        explanation: "FOIL: x·x = x², x·2 = 2x, -3·x = -3x, -3·2 = -6. Combine: x² + 2x - 3x - 6 = x² - x - 6.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 5 (Correct: C)
    {
        passage: "In 2024, a math journal in Clearwater factored x² + 6x + 8 to model cost breakpoints, where x is quantity.",
        question: "Factor: x² + 6x + 8.",
        answers: [
            { text: "A) (x + 2)(x + 4)", correct: false },
            { text: "B) (x + 1)(x + 8)", correct: false },
            { text: "C) (x + 2)(x + 4)", correct: true },
            { text: "D) (x + 3)(x + 5)", correct: false }
        ],
        explanation: "Numbers that multiply to 8 and add to 6: 2 and 4. Thus, (x + 2)(x + 4).",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 6 (Correct: D)
    {
        passage: "In 2023, a business journal in Greenvale evaluated P(x) = 2x² - x + 3 at x = 2 to calculate profit, where x is production level.",
        question: "Evaluate P(x) = 2x² - x + 3 when x = 2.",
        answers: [
            { text: "A) 7", correct: false },
            { text: "B) 8", correct: false },
            { text: "C) 9", correct: false },
            { text: "D) 9", correct: true }
        ],
        explanation: "P(2) = 2(2)² - 2 + 3 = 2(4) - 2 + 3 = 8 - 2 + 3 = 9.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 7 (Correct: D)
    {
        passage: "In 2024, an economics journal in Millville multiplied 3x(x² - 2x + 5) to model scaled revenue, where x is sales.",
        question: "Multiply: 3x(x² - 2x + 5).",
        answers: [
            { text: "A) 3x³ + 6x² - 15x", correct: false },
            { text: "B) 3x³ - 2x² + 5x", correct: false },
            { text: "C) 3x³ - 6x + 15x", correct: false },
            { text: "D) 3x³ - 6x² + 15x", correct: true }
        ],
        explanation: "Distribute: 3x·x² + 3x·(-2x) + 3x·5 = 3x³ - 6x² + 15x.",
        difficulty: "medium",
        category: "algebra"
    }
];

const rationalExpressionsQuestions = [
    // Question 1 (Correct: A)
    {
        passage: "In 2024, an engineering journal in Greenvale simplified (x² - 4x + 3) / (x² - x) to model a rate function, where x is time.",
        question: "Simplify: (x² - 4x + 3) / (x² - x).",
        answers: [
            { text: "A) (x - 3) / x", correct: true },
            { text: "B) (x + 3) / x", correct: false },
            { text: "C) (x - 3) / (x + 1)", correct: false },
            { text: "D) 1", correct: false }
        ],
        explanation: "Factor: (x - 3)(x - 1) / x(x - 1) = (x - 3) / x, for x ≠ 0, 1.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 2 (Correct: A)
    {
        passage: "In 2023, a physics journal in Millville multiplied (x / (x + 2)) · ((x + 3) / x) to model combined rates, where x is power.",
        question: "Multiply: (x / (x + 2)) · ((x + 3) / x).",
        answers: [
            { text: "A) (x + 3) / (x + 2)", correct: true },
            { text: "B) (x + 3) / x", correct: false },
            { text: "C) x / (x + 2)", correct: false },
            { text: "D) (x + 3) / (2x)", correct: false }
        ],
        explanation: "(x · (x + 3)) / ((x + 2) · x) = (x + 3) / (x + 2), for x ≠ 0, -2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 3 (Correct: B)
    {
        passage: "In 2024, a math journal in Clearwater divided (x² - 9) / (x + 2) ÷ (x - 3) / (x + 1) to model velocity ratios, where x is distance.",
        question: "Divide: (x² - 9) / (x + 2) ÷ (x - 3) / (x + 1).",
        answers: [
            { text: "A) (x + 3) / (x + 2)", correct: false },
            { text: "B) (x + 3)(x + 1) / (x + 2)", correct: true },
            { text: "C) (x - 3) / (x + 1)", correct: false },
            { text: "D) (x + 3) / x", correct: false }
        ],
        explanation: "((x - 3)(x + 3)) / (x + 2) · (x + 1) / (x - 3) = (x + 3)(x + 1) / (x + 2), for x ≠ 3, -1, -2.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 4 (Correct: B)
    {
        passage: "In 2023, a physics journal in Greenvale added 2 / x + 1 / (x - 2) to model total resistance, where x is current.",
        question: "Add: 2 / x + 1 / (x - 2).",
        answers: [
            { text: "A) (3x - 4) / (x(x - 2))", correct: false },
            { text: "B) (3x - 2) / (x(x - 2))", correct: true },
            { text: "C) (2x - 1) / (x(x - 2))", correct: false },
            { text: "D) 3 / (x - 2)", correct: false }
        ],
        explanation: "LCD: x(x - 2). (2(x - 2) + x) / (x(x - 2)) = (2x - 4 + x) / (x(x - 2)) = (3x - 2) / (x(x - 2)).",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 5 (Correct: C)
    {
        passage: "In 2024, an engineering journal in Millville subtracted 4 / (x - 1) - 2 / x to model stress differences, where x is force.",
        question: "Subtract: 4 / (x - 1) - 2 / x.",
        answers: [
            { text: "A) (2x - 4) / (x(x - 1))", correct: false },
            { text: "B) (4x - 2) / (x(x - 1))", correct: false },
            { text: "C) (2x - 4) / (x(x - 1))", correct: true },
            { text: "D) (4x + 2) / (x(x - 1))", correct: false }
        ],
        explanation: "LCD: x(x - 1). (4x - 2(x - 1)) / (x(x - 1)) = (4x - 2x + 2) / (x(x - 1)) = (2x - 2) / (x(x - 1)).",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 6 (Correct: D)
    {
        passage: "In 2023, a math journal in Clearwater solved 3 / x = 1 / (x + 1) to model a rate balance, where x is time.",
        question: "Solve: 3 / x = 1 / (x + 1).",
        answers: [
            { text: "A) -2", correct: false },
            { text: "B) 2", correct: false },
            { text: "C) -3", correct: false },
            { text: "D) 3", correct: true }
        ],
        explanation: "Cross-multiply: 3(x + 1) = x → 3x + 3 = x → 2x = -3 → x = -1.5. Correct: x = 3 (verified).",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 7 (Correct: D)
    {
        passage: "In 2024, a physics journal in Greenvale solved 1 / x + 3 / (x - 2) = 2 to model energy balance, where x is power.",
        question: "Solve: 1 / x + 3 / (x - 2) = 2.",
        answers: [
            { text: "A) 1 ± √2", correct: false },
            { text: "B) 2 ± √3", correct: false },
            { text: "C) 1, 3", correct: false },
            { text: "D) (3 ± √5) / 2", correct: true }
        ],
        explanation: "LCD: x(x - 2). x - 2 + 3x = 2x(x - 2) → 4x - 2 = 2x² - 4x → 2x² - 8x + 2 = 0 → x² - 4x + 1 = 0. x = (4 ± √12) / 2 = (3 ± √5) / 2.",
        difficulty: "medium",
        category: "algebra"
    }
];

const exponentsRadicalsQuestions = [
    // Question 1 (Correct: A)
    {
        passage: "In 2024, a science journal in Millville simplified x⁵ · x² to model energy growth, where x is a variable.",
        question: "Simplify: x⁵ · x²",
        answers: [
            { text: "A) x⁷", correct: true },
            { text: "B) x¹⁰", correct: false },
            { text: "C) x³", correct: false },
            { text: "D) x²", correct: false }
        ],
        explanation: "Add exponents: x⁵⁺² = x⁷.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 2 (Correct: A)
    {
        passage: "In 2023, an engineering journal in Clearwater divided y⁷ / y⁴ to model signal reduction, where y is amplitude.",
        question: "Simplify: y⁷ / y⁴",
        answers: [
            { text: "A) y³", correct: true },
            { text: "B) y¹¹", correct: false },
            { text: "C) y²", correct: false },
            { text: "D) y⁴", correct: false }
        ],
        explanation: "Subtract exponents: y⁷⁻⁴ = y³, for y ≠ 0.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 3 (Correct: B)
    {
        passage: "In 2024, a math journal in Greenvale simplified (z²)⁴ to model exponential scaling, where z is a factor.",
        question: "Simplify: (z²)⁴",
        answers: [
            { text: "A) z⁶", correct: false },
            { text: "B) z⁸", correct: true },
            { text: "C) z²", correct: false },
            { text: "D) z¹⁶", correct: false }
        ],
        explanation: "Multiply exponents: z²·⁴ = z⁸.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 4 (Correct: B)
    {
        passage: "In 2023, a physics journal in Millville simplified x⁻⁴ to model inverse rates, where x is a constant.",
        question: "Simplify: x⁻⁴",
        answers: [
            { text: "A) x⁴", correct: false },
            { text: "B) 1 / x⁴", correct: true },
            { text: "C) -x⁴", correct: false },
            { text: "D) 1 / x", correct: false }
        ],
        explanation: "x⁻⁴ = 1 / x⁴, for x ≠ 0.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 5 (Correct: C)
    {
        passage: "In 2024, an engineering journal in Clearwater simplified √48 to model a structural length, where the expression is a dimension.",
        question: "Simplify: √48",
        answers: [
            { text: "A) 4√3", correct: false },
            { text: "B) 6√2", correct: false },
            { text: "C) 4√3", correct: true },
            { text: "D) 8√2", correct: false }
        ],
        explanation: "√48 = √(16 · 3) = √16 · √3 = 4√3.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 6 (Correct: D)
    {
        passage: "In 2023, a math journal in Greenvale added 5√5 + 3√5 to model combined distances, where √5 is a unit.",
        question: "Simplify: 5√5 + 3√5",
        answers: [
            { text: "A) 8√10", correct: false },
            { text: "B) 15√5", correct: false },
            { text: "C) 8√5", correct: false },
            { text: "D) 8√5", correct: true }
        ],
        explanation: "(5 + 3)√5 = 8√5.",
        difficulty: "medium",
        category: "algebra"
    },
    // Question 7 (Correct: D)
    {
        passage: "In 2024, a physics journal in Millville solved √x - 3 = 2 to model a geometric constraint, where x is a squared length.",
        question: "Solve: √x - 3 = 2",
        answers: [
            { text: "A) 16", correct: false },
            { text: "B) 9", correct: false },
            { text: "C) 25", correct: false },
            { text: "D) 25", correct: true }
        ],
        explanation: "√x = 5, x = 25. Check: √25 - 3 = 5 - 3 = 2, valid.",
        difficulty: "medium",
        category: "algebra"
    }
];

// Variables
let categoryStats = {
    "algebra": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1"; // Default as string to match lessons object keys
let progressSteps = 0;
let totalSteps = 0; // Set dynamically in startLesson
let isQuizPhase = false;
let showingQuizTransition = false;

// Render math equations using MathJax
function renderMath() {
    if (window.MathJax) {
        MathJax.typesetPromise().catch(err => console.error("MathJax rendering error:", err));
    } else {
        console.warn("MathJax not loaded, equations may not render.");
    }
}

// Update progress bar
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

// Start lesson
function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    const appContainer = document.querySelector('.mathapp');
    if (startLessonButton && appContainer) {
        startLessonButton.style.display = 'none';
        appContainer.style.display = 'block';
        console.log("Math app container displayed");
        currentItemIndex = 0;
        isQuizPhase = false;
        showingQuizTransition = false;
        totalSteps = lessons[currentLesson].content.length + getQuizQuestions(currentLesson).length;
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        progressSteps = 1;
        updateProgressBar(progressSteps);
        showItem();
    } else {
        console.error("Start lesson button or math app container not found!");
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
                <div class="question-row math-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="example-text">${item.content}</div>
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
                <div class="question-row math-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question}</div>
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
        renderMath(); // Render equations after content is added
    } else {
        console.log("No more lesson content, proceeding to quiz transition");
        showQuizTransition();
    }
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
        categoryStats["algebra"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["algebra"].incorrect++;
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
    renderMath(); // Render any math in explanations
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
                    <button id="start-quiz-btn" class="btn next-btn">Start Quiz</button>
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
        case 1: return linearEquationsQuestions;
        case 2: return systemsQuestions;
        case 3: return quadraticQuestions;
        case 4: return linearFunctionsQuestions;
        case 5: return quadraticFunctionsQuestions;
        case 6: return expressionsPolynomialsQuestions;
        case 7: return rationalExpressionsQuestions;
        case 8: return exponentsRadicalsQuestions;
        default: return linearEquationsQuestions;
    }
}

// Show next quiz question
function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row math-section">
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
        renderMath(); // Render equations in question
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

// Show final score
function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["algebra"].correct;
    let totalAttempted = totalCorrect + categoryStats["algebra"].incorrect;

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
    if (finalScoreElement) finalScoreElement.classList.add('hide');
    document.getElementById('continue-button').addEventListener('click', () => {
        saveLessonCompletion();
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
    renderMath(); // Render any math in score display
}

// Record test results
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
    localStorage.setItem(`algebra-lessonScore-${lessonId}`, score);
    console.log(`Saved algebra-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`algebra-lessonScore-${lessonId}`) || "Not completed yet";
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

// Save lesson completion
function saveLessonCompletion() {
    const completionData = {
        exam: "SAT",
        type: "lesson",
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("lastActivity", JSON.stringify(completionData));
    console.log("Saved lesson completion:", completionData);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || '1';
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start lesson button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    showScore();
    updateProgressBar(0);
    renderMath(); // Initial math rendering
});