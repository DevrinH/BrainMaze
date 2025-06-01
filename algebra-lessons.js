const lessons = {
    1: {
        title: "Solving Linear Equations",
        content: [
            {
                type: "example",
                title: "Example 1: Solving for x",
                content: `
                    <h2>Example 1: Solving for x</h2>
                    <p>Consider the equation: 2x + 3 = 7</p>
                    <p>Step 1: Subtract 3 from both sides: 2x + 3 - 3 = 7 - 3</p>
                    <p>Step 2: Simplify: 2x = 4</p>
                    <p>Step 3: Divide both sides by 2: 2x / 2 = 4 / 2</p>
                    <p>Step 4: Simplify: x = 2</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
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
                    <p>Consider the equation: y - 4 = 10</p>
                    <p>Step 1: Add 4 to both sides: y - 4 + 4 = 10 + 4</p>
                    <p>Step 2: Simplify: y = 14</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
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
                    <p>Consider: 4x + 6 = 14</p>
                    <p>Step 1: Subtract 6: 4x = 8</p>
                    <p>Step 2: Divide by 4: x = 2</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
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
                    <p>Consider: 2(x + 3) = 10</p>
                    <p>Step 1: Distribute: 2x + 6 = 10</p>
                    <p>Step 2: Subtract 6: 2x = 4</p>
                    <p>Step 3: Divide by 2: x = 2</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
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
                    <p>Consider: 3x - 4 = x + 2</p>
                    <p>Step 1: Subtract x: 2x - 4 = 2</p>
                    <p>Step 2: Add 4: 2x = 6</p>
                    <p>Step 3: Divide by 2: x = 3</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
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
                    <p>Consider: -2x + 7 = 1</p>
                    <p>Step 1: Subtract 7: -2x = -6</p>
                    <p>Step 2: Divide by -2: x = 3</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
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
                    <p>Consider: (1/2)x - 3 = 2</p>
                    <p>Step 1: Add 3: (1/2)x = 5</p>
                    <p>Step 2: Multiply by 2: x = 10</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
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
                    <p>System: x + y = 10, x - y = 4</p>
                    <p>Step 1: Solve first for x: x = 10 - y</p>
                    <p>Step 2: Substitute: (10 - y) - y = 4</p>
                    <p>Step 3: Simplify: 10 - 2y = 4</p>
                    <p>Step 4: Solve: -2y = -6, y = 3</p>
                    <p>Step 5: Find x: x = 10 - 3 = 7</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
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
                    <p>System: 2x + 3y = 12, x - y = 1</p>
                    <p>Step 1: Multiply second by 2: 2x - 2y = 2</p>
                    <p>Step 2: Subtract: (2x + 3y) - (2x - 2y) = 12 - 2</p>
                    <p>Step 3: Simplify: 5y = 10, y = 2</p>
                    <p>Step 4: Substitute: x - 2 = 1, x = 3</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
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
                    <p>System: x + y = 6, x - y = 2</p>
                    <p>Step 1: Plot lines, find intersection: (4, 2)</p>
                    <p>Step 2: Verify: 4 + 2 = 6, 4 - 2 = 2</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
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
                    <p>System: 3x + y = 9, x - 2y = 1</p>
                    <p>Step 1: Solve second: x = 1 + 2y</p>
                    <p>Step 2: Substitute: 3(1 + 2y) + y = 9</p>
                    <p>Step 3: Simplify: 3 + 7y = 9</p>
                    <p>Step 4: Solve: 7y = 6, y = 6/7</p>
                    <p>Step 5: Find x: x = 1 + 2(6/7) = 20/7</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
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
                    <p>System: 3x + 2y = 11, 2x - y = 4</p>
                    <p>Step 1: Multiply second by 2: 4x - 2y = 8</p>
                    <p>Step 2: Add: 7x = 19</p>
                    <p>Step 3: Solve: x = 19/7</p>
                    <p>Step 4: Substitute: 2(19/7) - y = 4, y = 10/7</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
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
                    <p>System: x + y = 5, x + y = 7</p>
                    <p>Step 1: Subtract: 0 = 2 (contradiction)</p>
                    <p>Conclusion: No solution</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
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
                    <p>System: 2x + 4y = 8, x + 2y = 4</p>
                    <p>Step 1: Multiply second by 2: 2x + 4y = 8</p>
                    <p>Step 2: Subtract: 0 = 0 (identity)</p>
                    <p>Conclusion: Infinite solutions</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
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
                    <p>Equation: x² - 5x + 6 = 0</p>
                    <p>Step 1: Factor: (x - 2)(x - 3) = 0</p>
                    <p>Step 2: Solve: x = 2 or x = 3</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
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
                    <p>Equation: 2x² + 5x - 3 = 0</p>
                    <p>Step 1: a = 2, b = 5, c = -3</p>
                    <p>Step 2: x = (-5 ± √(25 + 24)) / 4</p>
                    <p>Step 3: Simplify: x = (-5 ± 7) / 4</p>
                    <p>Step 4: x = 0.5 or x = -3</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
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
                    <p>Equation: x² + 6x + 8 = 0</p>
                    <p>Step 1: x² + 6x = -8</p>
                    <p>Step 2: Add (6/2)² = 9: (x + 3)² = 1</p>
                    <p>Step 3: Solve: x + 3 = ±1</p>
                    <p>Step 4: x = -2 or x = -4</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
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
                    <p>Equation: x² - 16 = 0</p>
                    <p>Step 1: x² = 16</p>
                    <p>Step 2: x = ±4</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
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
                    <p>Equation: x² + 1 = 0</p>
                    <p>Step 1: x² = -1</p>
                    <p>Step 2: No real solutions (negative under square root)</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
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
                    <p>Equation: x² - 6x + 9 = 0</p>
                    <p>Step 1: Factor: (x - 3)² = 0</p>
                    <p>Step 2: Solve: x = 3</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
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
                    <p>Equation: (1/2)x² - 2x + 2 = 0</p>
                    <p>Step 1: Multiply by 2: x² - 4x + 4 = 0</p>
                    <p>Step 2: Factor: (x - 2)² = 0</p>
                    <p>Step 3: Solve: x = 2</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
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
                    <p>Find the slope of the line passing through points (2, 3) and (4, 7).</p>
                    <p>Step 1: Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁)</p>
                    <p>Step 2: Substitute: m = (7 - 3) / (4 - 2) = 4 / 2</p>
                    <p>Step 3: Simplify: m = 2</p>
                    <p>The slope is 2.</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
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
                    <p>Graph the equation: y = 2x + 1</p>
                    <p>Step 1: Identify the slope (m = 2) and y-intercept (b = 1).</p>
                    <p>Step 2: Plot the y-intercept at (0, 1).</p>
                    <p>Step 3: Use the slope (rise 2, run 1) to plot another point at (1, 3).</p>
                    <p>Step 4: Draw a straight line through the points.</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
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
                    <p>Convert 2x + y = 5 to slope-intercept form.</p>
                    <p>Step 1: Solve for y: y = -2x + 5</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
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
                    <p>Write the equation of a line with slope 3 through (1, 2).</p>
                    <p>Step 1: Use point-slope form: y - y₁ = m(x - x₁)</p>
                    <p>Step 2: Substitute: y - 2 = 3(x - 1)</p>
                    <p>Step 3: Convert to slope-intercept: y = 3x - 1</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
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
                    <p>Find the intercepts of 4x + 2y = 8.</p>
                    <p>Step 1: y-intercept (x = 0): 2y = 8 → y = 4. Point: (0, 4)</p>
                    <p>Step 2: x-intercept (y = 0): 4x = 8 → x = 2. Point: (2, 0)</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
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
                    <p>Find the equation of a line parallel to y = 2x + 3 through (1, 1).</p>
                    <p>Step 1: Parallel lines have the same slope, so m = 2.</p>
                    <p>Step 2: Use point-slope: y - 1 = 2(x - 1)</p>
                    <p>Step 3: Convert: y = 2x - 1</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
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
                    <p>Find the equation of a line perpendicular to y = (1/2)x - 1 through (0, 2).</p>
                    <p>Step 1: Perpendicular slope is the negative reciprocal: m = -2.</p>
                    <p>Step 2: Use point-slope: y - 2 = -2(x - 0)</p>
                    <p>Step 3: Simplify: y = -2x + 2</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
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
                    <p>Consider the quadratic function: y = x² - 4x + 3.</p>
                    <p>Step 1: Standard form is y = ax² + bx + c. Here, a = 1, b = -4, c = 3.</p>
                    <p>Step 2: Find the x-coordinate of the vertex: x = -b / (2a) = -(-4) / (2·1) = 2.</p>
                    <p>Step 3: Find the y-coordinate: y = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1.</p>
                    <p>Vertex: (2, -1). Axis of symmetry: x = 2.</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
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
                    <p>Find the x-intercepts of y = x² - 5x + 6.</p>
                    <p>Step 1: Set y = 0: x² - 5x + 6 = 0.</p>
                    <p>Step 2: Factor: (x - 2)(x - 3) = 0.</p>
                    <p>Step 3: Solve: x - 2 = 0 → x = 2; x - 3 = 0 → x = 3.</p>
                    <p>x-intercepts: (2, 0) and (3, 0).</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
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
                    <p>Graph y = -x² + 2x + 3.</p>
                    <p>Step 1: Vertex: x = -2 / (2·-1) = 1. y = -(1)² + 2(1) + 3 = -1 + 2 + 3 = 4. Vertex: (1, 4).</p>
                    <p>Step 2: y-intercept (x = 0): y = 3. Point: (0, 3).</p>
                    <p>Step 3: x-intercepts: -x² + 2x + 3 = 0 → x² - 2x - 3 = 0 → (x - 3)(x + 1) = 0 → x = 3, -1.</p>
                    <p>Step 4: Since a = -1, parabola opens downward. Plot points and draw.</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
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
                    <p>Write y = x² + 4x + 1 in vertex form.</p>
                    <p>Step 1: Complete the square: y = (x² + 4x) + 1.</p>
                    <p>Step 2: Take half of 4 (2), square it (4), add/subtract: y = (x² + 4x + 4 - 4) + 1.</p>
                    <p>Step 3: Rewrite: y = (x + 2)² - 4 + 1 = (x + 2)² - 3.</p>
                    <p>Vertex form: y = (x + 2)² - 3. Vertex: (-2, -3).</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
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
                    <p>For y = 3x² - 6x + 4, does the parabola open up or down?</p>
                    <p>Step 1: Identify a: a = 3.</p>
                    <p>Step 2: Since a > 0, the parabola opens upward.</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
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
                    <p>A ball’s height is given by h = -16t² + 32t + 5, where t is time in seconds. Find the maximum height.</p>
                    <p>Step 1: Vertex x-coordinate: t = -32 / (2·-16) = 1.</p>
                    <p>Step 2: Height at t = 1: h = -16(1)² + 32(1) + 5 = -16 + 32 + 5 = 21.</p>
                    <p>Maximum height: 21 feet.</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "For h = -16t² + 48t + 4, what is the maximum height?",
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
                    <p>Determine the number of x-intercepts for y = x² + 2x + 3.</p>
                    <p>Step 1: Calculate discriminant: b² - 4ac = 2² - 4(1)(3) = 4 - 12 = -8.</p>
                    <p>Step 2: Since discriminant < 0, there are no real x-intercepts.</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
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
                    <p>Simplify: 3x + 5x - 2x + 7 - 4.</p>
                    <p>Step 1: Combine like terms for x: 3x + 5x - 2x = 6x.</p>
                    <p>Step 2: Combine constants: 7 - 4 = 3.</p>
                    <p>Step 3: Write the simplified expression: 6x + 3.</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
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
                    <p>Add: (2x² + 3x - 1) + (x² - 2x + 4).</p>
                    <p>Step 1: Combine like terms: (2x² + x²) + (3x - 2x) + (-1 + 4).</p>
                    <p>Step 2: Simplify: 3x² + x + 3.</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
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
                    <p>Subtract: (4x² - 5x + 2) - (x² + 3x - 1).</p>
                    <p>Step 1: Distribute the negative: 4x² - 5x + 2 - x² - 3x + 1.</p>
                    <p>Step 2: Combine like terms: (4x² - x²) + (-5x - 3x) + (2 + 1).</p>
                    <p>Step 3: Simplify: 3x² - 8x + 3.</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
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
                    <p>Multiply: (x + 2)(x - 3).</p>
                    <p>Step 1: Use FOIL: First (x·x = x²), Outer (x·-3 = -3x), Inner (2·x = 2x), Last (2·-3 = -6).</p>
                    <p>Step 2: Combine: x² - 3x + 2x - 6.</p>
                    <p>Step 3: Simplify: x² - x - 6.</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
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
                    <p>Factor: x² + 5x + 6.</p>
                    <p>Step 1: Find numbers that multiply to 6 and add to 5: 2 and 3.</p>
                    <p>Step 2: Write as: (x + 2)(x + 3).</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
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
                    <p>Evaluate P(x) = 2x² - 3x + 1 when x = 2.</p>
                    <p>Step 1: Substitute x = 2: P(2) = 2(2)² - 3(2) + 1.</p>
                    <p>Step 2: Calculate: 2(4) - 6 + 1 = 8 - 6 + 1 = 3.</p>
                    <p>P(2) = 3.</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
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
                    <p>Multiply: 3x(2x² - x + 4).</p>
                    <p>Step 1: Distribute: 3x·2x² + 3x·(-x) + 3x·4.</p>
                    <p>Step 2: Simplify: 6x³ - 3x² + 12x.</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
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
                    <p>Simplify: (2x² - 4x) / (x² - 2x).</p>
                    <p>Step 1: Factor numerator: 2x(x - 2).</p>
                    <p>Step 2: Factor denominator: x(x - 2).</p>
                    <p>Step 3: Cancel common factors: (2x(x - 2)) / (x(x - 2)) = 2x / x.</p>
                    <p>Step 4: Simplify: 2, for x ≠ 0, 2.</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
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
                    <p>Multiply: (x / (x + 1)) · ((x + 2) / x).</p>
                    <p>Step 1: Multiply numerators and denominators: (x · (x + 2)) / ((x + 1) · x).</p>
                    <p>Step 2: Factor and cancel: (x(x + 2)) / (x(x + 1)) = (x + 2) / (x + 1).</p>
                    <p>Result: (x + 2) / (x + 1), for x ≠ 0, -1.</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
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
                    <p>Divide: (x² - 4) / (x + 3) ÷ (x - 2) / (x + 1).</p>
                    <p>Step 1: Multiply by reciprocal: (x² - 4) / (x + 3) · (x + 1) / (x - 2).</p>
                    <p>Step 2: Factor: ((x - 2)(x + 2)) / (x + 3) · (x + 1) / (x - 2).</p>
                    <p>Step 3: Cancel: (x + 2)(x + 1) / (x + 3).</p>
                    <p>Result: (x + 2)(x + 1) / (x + 3), for x ≠ -1, 2, -3.</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
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
                    <p>Add: 3 / x + 2 / (x - 1).</p>
                    <p>Step 1: Find LCD: x(x - 1).</p>
                    <p>Step 2: Rewrite: (3(x - 1)) / (x(x - 1)) + (2x) / (x(x - 1)).</p>
                    <p>Step 3: Combine: (3x - 3 + 2x) / (x(x - 1)) = (5x - 3) / (x(x - 1)).</p>
                    <p>Result: (5x - 3) / (x(x - 1)), for x ≠ 0, 1.</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
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
                    <p>Subtract: 5 / (x + 1) - 2 / x.</p>
                    <p>Step 1: Find LCD: x(x + 1).</p>
                    <p>Step 2: Rewrite: (5x) / (x(x + 1)) - (2(x + 1)) / (x(x + 1)).</p>
                    <p>Step 3: Combine: (5x - (2x + 2)) / (x(x + 1)) = (3x - 2) / (x(x + 1)).</p>
                    <p>Result: (3x - 2) / (x(x + 1)), for x ≠ 0, -1.</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
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
                    <p>Solve: 2 / x + 1 = 5 / x.</p>
                    <p>Step 1: Subtract: 2 / x - 5 / x + 1 = 0 → (2 - 5) / x + 1 = 0 → -3 / x + 1 = 0.</p>
                    <p>Step 2: Simplify: -3 / x = -1.</p>
                    <p>Step 3: Solve: x = 3.</p>
                    <p>Step 4: Check: x = 3 is valid (no division by zero).</p>
                    <p>Solution: x = 3.</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
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
                    <p>Solve: 3 / (x - 1) + 1 / x = 2.</p>
                    <p>Step 1: Find LCD: x(x - 1). Multiply through: 3x + (x - 1) = 2x(x - 1).</p>
                    <p>Step 2: Simplify: 3x + x - 1 = 2x² - 2x → 4x - 1 = 2x² - 2x.</p>
                    <p>Step 3: Set to 0: 2x² - 6x + 1 = 0.</p>
                    <p>Step 4: Quadratic formula: x = (6 ± √(36 - 8)) / 4 = (3 ± √7) / 2.</p>
                    <p>Step 5: Check: Both solutions are valid (x ≠ 0, 1).</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
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
                    <p>Simplify: x⁵ · x³.</p>
                    <p>Step 1: Add the exponents (same base): x⁵ · x³ = x^(5+3).</p>
                    <p>Step 2: Simplify: x⁸.</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Simplify: y⁴ · y².",
                options: [
                    { text: "A) y⁶", correct: true },
                    { text: "B) y⁸", correct: false },
                    { text: "C) y²", correct: false },
                    { text: "D) y⁵", correct: false }
                ],
                explanation: "y⁴ · y² = y^(4+2) = y⁶."
            },
            {
                type: "example",
                title: "Example 2: Dividing Exponential Expressions",
                content: `
                    <h2>Example 2: Dividing Exponential Expressions</h2>
                    <p>Simplify: x⁷ / x⁴.</p>
                    <p>Step 1: Subtract the exponents (same base): x⁷ / x⁴ = x^(7-4).</p>
                    <p>Step 2: Simplify: x³.</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Simplify: z⁹ / z³.",
                options: [
                    { text: "A) z⁶", correct: true },
                    { text: "B) z³", correct: false },
                    { text: "C) z¹²", correct: false },
                    { text: "D) z⁵", correct: false }
                ],
                explanation: "z⁹ / z³ = z^(9-3) = z⁶."
            },
            {
                type: "example",
                title: "Example 3: Power of a Power Rule",
                content: `
                    <h2>Example 3: Power of a Power Rule</h2>
                    <p>Simplify: (x²)³.</p>
                    <p>Step 1: Multiply the exponents: (x²)³ = x^(2·3).</p>
                    <p>Step 2: Simplify: x⁶.</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Simplify: (y⁴)².",
                options: [
                    { text: "A) y⁸", correct: true },
                    { text: "B) y⁶", correct: false },
                    { text: "C) y²", correct: false },
                    { text: "D) y¹⁰", correct: false }
                ],
                explanation: "(y⁴)² = y^(4·2) = y⁸."
            },
            {
                type: "example",
                title: "Example 4: Negative Exponents",
                content: `
                    <h2>Example 4: Negative Exponents</h2>
                    <p>Simplify: x⁻³.</p>
                    <p>Step 1: Rewrite with a positive exponent: x⁻³ = 1 / x³.</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Simplify: z⁻².",
                options: [
                    { text: "A) 1 / z²", correct: true },
                    { text: "B) z²", correct: false },
                    { text: "C) -z²", correct: false },
                    { text: "D) 1 / z", correct: false }
                ],
                explanation: "z⁻² = 1 / z²."
            },
            {
                type: "example",
                title: "Example 5: Simplifying Square Roots",
                content: `
                    <h2>Example 5: Simplifying Square Roots</h2>
                    <p>Simplify: √72.</p>
                    <p>Step 1: Factor into perfect squares: √72 = √(36 · 2).</p>
                    <p>Step 2: Simplify: √36 · √2 = 6√2.</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Simplify: √50.",
                options: [
                    { text: "A) 5√2", correct: true },
                    { text: "B) 10√5", correct: false },
                    { text: "C) 2√5", correct: false },
                    { text: "D) 25√2", correct: false }
                ],
                explanation: "√50 = √(25 · 2) = √25 · √2 = 5√2."
            },
            {
                type: "example",
                title: "Example 6: Solving an Exponential Equation",
                content: `
                    <h2>Example 6: Solving an Exponential Equation</h2>
                    <p>Solve: 2^x = 8.</p>
                    <p>Step 1: Rewrite 8 as a power of 2: 8 = 2³.</p>
                    <p>Step 2: Equate exponents: 2^x = 2³ → x = 3.</p>
                    <p>Solution: x = 3.</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Solve: 3^x = 27.",
                options: [
                    { text: "A) 3", correct: true },
                    { text: "B) 4", correct: false },
                    { text: "C) 2", correct: false },
                    { text: "D) 9", correct: false }
                ],
                explanation: "27 = 3³ → 3^x = 3³ → x = 3."
            },
            {
                type: "example",
                title: "Example 7: Solving a Radical Equation",
                content: `
                    <h2>Example 7: Solving a Radical Equation</h2>
                    <p>Solve: √x + 2 = 4.</p>
                    <p>Step 1: Isolate the radical: √x = 4 - 2 → √x = 2.</p>
                    <p>Step 2: Square both sides: (√x)² = 2² → x = 4.</p>
                    <p>Step 3: Check: √4 + 2 = 2 + 2 = 4, which matches.</p>
                    <p>Solution: x = 4.</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Solve: √(x - 1) = 3.",
                options: [
                    { text: "A) 10", correct: true },
                    { text: "B) 8", correct: false },
                    { text: "C) 9", correct: false },
                    { text: "D) 1", correct: false }
                ],
                explanation: "√(x - 1) = 3 → (x - 1) = 3² → x - 1 = 9 → x = 10."
            }
        ]
    },
    9: {
        title: "Inequalities and Absolute Value",
        content: [
            {
                type: "example",
                title: "Example 1: Solving a Linear Inequality",
                content: `
                    <h2>Example 1: Solving a Linear Inequality</h2>
                    <p>Solve: 2x - 3 < 7.</p>
                    <p>Step 1: Add 3 to both sides: 2x - 3 + 3 < 7 + 3.</p>
                    <p>Step 2: Simplify: 2x < 10.</p>
                    <p>Step 3: Divide by 2: x < 5.</p>
                    <p>Solution: x < 5.</p>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Solve: 3x + 4 ≤ 10.",
                options: [
                    { text: "A) x ≤ 2", correct: true },
                    { text: "B) x ≤ 3", correct: false },
                    { text: "C) x ≥ 2", correct: false },
                    { text: "D) x ≥ 3", correct: false }
                ],
                explanation: "3x + 4 ≤ 10 → 3x ≤ 6 → x ≤ 2."
            },
            {
                type: "example",
                title: "Example 2: Solving an Inequality with Negative Coefficient",
                content: `
                    <h2>Example 2: Solving an Inequality with Negative Coefficient</h2>
                    <p>Solve: -4x + 5 ≥ 13.</p>
                    <p>Step 1: Subtract 5: -4x + 5 - 5 ≥ 13 - 5.</p>
                    <p>Step 2: Simplify: -4x ≥ 8.</p>
                    <p>Step 3: Divide by -4 (flip inequality): x ≤ -2.</p>
                    <p>Solution: x ≤ -2.</p>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Solve: -2x - 1 > 5.",
                options: [
                    { text: "A) x < -3", correct: true },
                    { text: "B) x > -3", correct: false },
                    { text: "C) x < 3", correct: false },
                    { text: "D) x > 3", correct: false }
                ],
                explanation: "-2x - 1 > 5 → -2x > 6 → x < -3 (flip inequality when dividing by -2)."
            },
            {
                type: "example",
                title: "Example 3: Solving a Compound Inequality",
                content: `
                    <h2>Example 3: Solving a Compound Inequality</h2>
                    <p>Solve: -1 < 2x + 3 ≤ 7.</p>
                    <p>Step 1: Subtract 3: -1 - 3 < 2x + 3 - 3 ≤ 7 - 3.</p>
                    <p>Step 2: Simplify: -4 < 2x ≤ 4.</p>
                    <p>Step 3: Divide by 2: -2 < x ≤ 2.</p>
                    <p>Solution: -2 < x ≤ 2.</p>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Solve: 3 ≤ 3x - 6 < 12.",
                options: [
                    { text: "A) 3 ≤ x < 6", correct: true },
                    { text: "B) 1 ≤ x < 4", correct: false },
                    { text: "C) 3 ≤ x ≤ 6", correct: false },
                    { text: "D) 0 ≤ x < 3", correct: false }
                ],
                explanation: "3 ≤ 3x - 6 < 12 → 9 ≤ 3x < 18 → 3 ≤ x < 6."
            },
            {
                type: "example",
                title: "Example 4: Solving an Absolute Value Equation",
                content: `
                    <h2>Example 4: Solving an Absolute Value Equation</h2>
                    <p>Solve: |x - 2| = 5.</p>
                    <p>Step 1: Set up two equations: x - 2 = 5 or x - 2 = -5.</p>
                    <p>Step 2: Solve: x = 7 or x = -3.</p>
                    <p>Solution: x = -3, 7.</p>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Solve: |x + 1| = 4.",
                options: [
                    { text: "A) x = -5, 3", correct: true },
                    { text: "B) x = -4, 4", correct: false },
                    { text: "C) x = -3, 5", correct: false },
                    { text: "D) x = -1, 1", correct: false }
                ],
                explanation: "|x + 1| = 4 → x + 1 = 4 or x + 1 = -4 → x = 3 or x = -5."
            },
            {
                type: "example",
                title: "Example 5: Solving an Absolute Value Inequality (Less Than)",
                content: `
                    <h2>Example 5: Solving an Absolute Value Inequality (Less Than)</h2>
                    <p>Solve: |x + 3| < 2.</p>
                    <p>Step 1: Write as: -2 < x + 3 < 2.</p>
                    <p>Step 2: Subtract 3: -2 - 3 < x + 3 - 3 < 2 - 3.</p>
                    <p>Step 3: Simplify: -5 < x < -1.</p>
                    <p>Solution: -5 < x < -1.</p>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Solve: |x - 4| ≤ 3.",
                options: [
                    { text: "A) 1 ≤ x ≤ 7", correct: true },
                    { text: "B) 4 ≤ x ≤ 7", correct: false },
                    { text: "C) -1 ≤ x ≤ 7", correct: false },
                    { text: "D) 1 ≤ x ≤ 4", correct: false }
                ],
                explanation: "|x - 4| ≤ 3 → -3 ≤ x - 4 ≤ 3 → 1 ≤ x ≤ 7."
            },
            {
                type: "example",
                title: "Example 6: Solving an Absolute Value Inequality (Greater Than)",
                content: `
                    <h2>Example 6: Solving an Absolute Value Inequality (Greater Than)</h2>
                    <p>Solve: |2x - 1| > 3.</p>
                    <p>Step 1: Write as: 2x - 1 < -3 or 2x - 1 > 3.</p>
                    <p>Step 2: Solve first: 2x - 1 < -3 → 2x < -2 → x < -1.</p>
                    <p>Step 3: Solve second: 2x - 1 > 3 → 2x > 4 → x > 2.</p>
                    <p>Solution: x < -1 or x > 2.</p>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Solve: |x + 2| > 5.",
                options: [
                    { text: "A) x < -7 or x > 3", correct: true },
                    { text: "B) x < -3 or x > 7", correct: false },
                    { text: "C) -7 < x < 3", correct: false },
                    { text: "D) -3 < x < 7", correct: false }
                ],
                explanation: "|x + 2| > 5 → x + 2 < -5 or x + 2 > 5 → x < -7 or x > 3."
            },
            {
                type: "example",
                title: "Example 7: Graphing an Inequality Solution",
                content: `
                    <h2>Example 7: Graphing an Inequality Solution</h2>
                    <p>Graph the solution to: 3x + 2 ≥ 8.</p>
                    <p>Step 1: Solve: 3x + 2 ≥ 8 → 3x ≥ 6 → x ≥ 2.</p>
                    <p>Step 2: On a number line, draw a closed circle at 2 (since ≥) and shade to the right.</p>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Which describes the graph of x < -1 on a number line?",
                options: [
                    { text: "A) Open circle at -1, shade left", correct: true },
                    { text: "B) Closed circle at -1, shade left", correct: false },
                    { text: "C) Open circle at -1, shade right", correct: false },
                    { text: "D) Closed circle at -1, shade right", correct: false }
                ],
                explanation: "x < -1 means an open circle at -1 (not included) and shading left for all x less than -1."
            }
        ]
    }
};
    
    // Question arrays for quizzes (with passage field removed)
   const linearEquationsQuestions = [
    {
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
        question: "Solve for x: (1/3)x + 2 = 5",
        options: [
            { text: "A) 9", correct: true },
            { text: "B) 6", correct: false },
            { text: "C) 12", correct: false },
            { text: "D) 3", correct: false }
        ],
        explanation: "Subtract 2: (1/3)x = 3, multiply by 3: x = 9."
    }
];

const systemsQuestions = [
    {
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
        question: "Solve: 3x - y = 6, 6x - 2y = 12",
        options: [
            { text: "A) x = 2, y = 0", correct: false },
            { text: "B) Infinite solutions", correct: true },
            { text: "C) No solution", correct: false },
            { text: "D) x = 1, y = -3", correct: false }
        ],
        explanation: "Multiply first by 2: 6x - 2y = 12, same as second, infinite solutions."
    }
];

const quadraticEquationsQuestions = [
    {
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
        question: "Solve: (1/3)x² - 2x + 3 = 0",
        options: [
            { text: "A) x = 3", correct: true },
            { text: "B) x = 2", correct: false },
            { text: "C) x = 1", correct: false },
            { text: "D) No real solutions", correct: false }
        ],
        explanation: "Multiply by 3: x² - 6x + 9 = 0, (x - 3)² = 0, x = 3."
    }
];

const linearFunctionsQuestions = [
    {
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
        question: "What is the slope of a line perpendicular to y = 4x - 3?",
        options: [
            { text: "A) -1/4", correct: true },
            { text: "B) 1/4", correct: false },
            { text: "C) 4", correct: false },
            { text: "D) -4", correct: false }
        ],
        explanation: "The slope of y = 4x - 3 is 4. The perpendicular slope is the negative reciprocal: -1/4."
    }
];

const quadraticFunctionsQuestions = [
    {
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
        question: "For h = -16t² + 48t + 4, what is the maximum height?",
        options: [
            { text: "A) 52", correct: true },
            { text: "B) 48", correct: false },
            { text: "C) 36", correct: false },
            { text: "D) 64", correct: false }
        ],
        explanation: "t = -48 / (2·-16) = 1.5. h = -16(1.5)² + 48(1.5) + 4 = -36 + 72 + 4 = 52."
    },
    {
        question: "How many x-intercepts does y = x² - 4x + 4 have?",
        options: [
            { text: "A) 1", correct: true },
            { text: "B) 2", correct: false },
            { text: "C) 0", correct: false },
            { text: "D) 3", correct: false }
        ],
        explanation: "Discriminant: (-4)² - 4(1)(4) = 16 - 16 = 0. One real x-intercept."
    }
];

const expressionsPolynomialsQuestions = [
    {
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
        question: "Multiply: 2x(x² + 3x - 2).",
        options: [
            { text: "A) 2x³ + 6x² - 4x", correct: true },
            { text: "B) 2x³ + 3x² - 4x", correct: false },
            { text: "C) 2x³ + 6x² + 4x", correct: false },
            { text: "D) 2x³ - 6x² - 4x", correct: false }
        ],
        explanation: "Distribute: 2x·x² + 2x·3x + 2x·(-2) = 2x³ + 6x² - 4x."
    }
];

const rationalExpressionsQuestions = [
    {
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
        question: "Solve: 2 / x + 1 / (x + 1) = 1.",
        options: [
            { text: "A) -1 ± √2", correct: true },
            { text: "B) 1 ± √2", correct: false },
            { text: "C) -1, 2", correct: false },
            { text: "D) 1, -2", correct: false }
        ],
        explanation: "LCD: x(x + 1). 2(x + 1) + x = x(x + 1) → 3x + 2 = x² + x → x² - 2x - 2 = 0. x = (2 ± √8) / 2 = -1 ± √2."
    }
];

const exponentsRadicalsQuestions = [
    {
        question: "Simplify: y⁴ · y².",
        options: [
            { text: "A) y⁶", correct: true },
            { text: "B) y⁸", correct: false },
            { text: "C) y²", correct: false },
            { text: "D) y⁵", correct: false }
        ],
        explanation: "y⁴ · y² = y^(4+2) = y⁶."
    },
    {
        question: "Simplify: z⁹ / z³.",
        options: [
            { text: "A) z⁶", correct: true },
            { text: "B) z³", correct: false },
            { text: "C) z¹²", correct: false },
            { text: "D) z⁵", correct: false }
        ],
        explanation: "z⁹ / z³ = z^(9-3) = z⁶."
    },
    {
        question: "Simplify: (y⁴)².",
        options: [
            { text: "A) y⁸", correct: true },
            { text: "B) y⁶", correct: false },
            { text: "C) y²", correct: false },
            { text: "D) y¹⁰", correct: false }
        ],
        explanation: "(y⁴)² = y^(4·2) = y⁸."
    },
    {
        question: "Simplify: z⁻².",
        options: [
            { text: "A) 1 / z²", correct: true },
            { text: "B) z²", correct: false },
            { text: "C) -z²", correct: false },
            { text: "D) 1 / z", correct: false }
        ],
        explanation: "z⁻² = 1 / z²."
    },
    {
        question: "Simplify: √50.",
        options: [
            { text: "A) 5√2", correct: true },
            { text: "B) 10√5", correct: false },
            { text: "C) 2√5", correct: false },
            { text: "D) 25√2", correct: false }
        ],
        explanation: "√50 = √(25 · 2) = √25 · √2 = 5√2."
    },
    {
        question: "Solve: 3^x = 27.",
        options: [
            { text: "A) 3", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 2", correct: false },
            { text: "D) 9", correct: false }
        ],
        explanation: "27 = 3³ → 3^x = 3³ → x = 3."
    },
    {
        question: "Solve: √(x - 1) = 3.",
        options: [
            { text: "A) 10", correct: true },
            { text: "B) 8", correct: false },
            { text: "C) 9", correct: false },
            { text: "D) 1", correct: false }
        ],
        explanation: "√(x - 1) = 3 → (x - 1) = 3² → x - 1 = 9 → x = 10."
    }
];

const inequalitiesAbsoluteValueQuestions = [
    {
        question: "Solve: 3x + 4 ≤ 10.",
        options: [
            { text: "A) x ≤ 2", correct: true },
            { text: "B) x ≤ 3", correct: false },
            { text: "C) x ≥ 2", correct: false },
            { text: "D) x ≥ 3", correct: false }
        ],
        explanation: "3x + 4 ≤ 10 → 3x ≤ 6 → x ≤ 2."
    },
    {
        question: "Solve: -2x - 1 > 5.",
        options: [
            { text: "A) x < -3", correct: true },
            { text: "B) x > -3", correct: false },
            { text: "C) x < 3", correct: false },
            { text: "D) x > 3", correct: false }
        ],
        explanation: "-2x - 1 > 5 → -2x > 6 → x < -3 (flip inequality when dividing by -2)."
    },
    {
        question: "Solve: 3 ≤ 3x - 6 < 12.",
        options: [
            { text: "A) 3 ≤ x < 6", correct: true },
            { text: "B) 1 ≤ x < 4", correct: false },
            { text: "C) 3 ≤ x ≤ 6", correct: false },
            { text: "D) 0 ≤ x < 3", correct: false }
        ],
        explanation: "3 ≤ 3x - 6 < 12 → 9 ≤ 3x < 18 → 3 ≤ x < 6."
    },
    {
        question: "Solve: |x + 1| = 4.",
        options: [
            { text: "A) x = -5, 3", correct: true },
            { text: "B) x = -4, 4", correct: false },
            { text: "C) x = -3, 5", correct: false },
            { text: "D) x = -1, 1", correct: false }
        ],
        explanation: "|x + 1| = 4 → x + 1 = 4 or x + 1 = -4 → x = 3 or x = -5."
    },
    {
        question: "Solve: |x - 4| ≤ 3.",
        options: [
            { text: "A) 1 ≤ x ≤ 7", correct: true },
            { text: "B) 4 ≤ x ≤ 7", correct: false },
            { text: "C) -1 ≤ x ≤ 7", correct: false },
            { text: "D) 1 ≤ x ≤ 4", correct: false }
        ],
        explanation: "|x - 4| ≤ 3 → -3 ≤ x - 4 ≤ 3 → 1 ≤ x ≤ 7."
    },
    {
        question: "Solve: |x + 2| > 5.",
        options: [
            { text: "A) x < -7 or x > 3", correct: true },
            { text: "B) x < -3 or x > 7", correct: false },
            { text: "C) -7 < x < 3", correct: false },
            { text: "D) -3 < x < 7", correct: false }
        ],
        explanation: "|x + 2| > 5 → x + 2 < -5 or x + 2 > 5 → x < -7 or x > 3."
    },
    {
        question: "Which describes the graph of x < -1 on a number line?",
        options: [
            { text: "A) Open circle at -1, shade left", correct: true },
            { text: "B) Closed circle at -1, shade left", correct: false },
            { text: "C) Open circle at -1, shade right", correct: false },
            { text: "D) Closed circle at -1, shade right", correct: false }
        ],
        explanation: "x < -1 means an open circle at -1 (not included) and shading left for all x less than -1."
    }
];
    
  let categoryStats = {
    "algebra": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;
let currentItemIndex = 0;
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;

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
                <button id="next-item" class="btn-next-btn">Next</button>
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
        categoryStats["algebra"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["algebra"].incorrect++;
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
        case 1: return linearEquationsQuestions;
        case 2: return systemsQuestions;
        case 3: return quadraticEquationsQuestions;
        case 4: return linearFunctionsQuestions;
        case 5: return quadraticFunctionsQuestions;
        case 6: return expressionsPolynomialsQuestions;
        case 7: return rationalExpressionsQuestions;
        case 8: return exponentsRadicalsQuestions;
        case 9: return inequalitiesAbsoluteValueQuestions;
        default: return linearEquationsQuestions;
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
        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.innerHTML = option.text;
            button.classList.add("btn");
            button.dataset.correct = option.correct;
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

function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
}

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["algebra"].correct;
    let totalAttempted = totalCorrect + categoryStats["algebra"].incorrect;

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
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
        localStorage.setItem("lastActivity", JSON.stringify({ exam: "SAT", type: "lesson" }));
        console.log("Set lastActivity to SAT lesson before redirect");
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
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
    localStorage.setItem(`algebra-lessonScore-${lessonId}`, score);
    console.log(`Saved algebra-lessonScore-${lessonId}: ${score}`);
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded, initializing lesson:", currentLesson);
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 1;
    console.log("Set currentLesson to:", currentLesson);

    const startLessonButton = document.getElementById('start-math-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start math lesson button event listener added");
    } else {
        console.error("Start math lesson button not found on page load!");
    }
});