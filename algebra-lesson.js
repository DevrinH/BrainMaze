// Ensure scores display on page load by calling showScore
document.addEventListener("DOMContentLoaded", function() {
    // Existing DOMContentLoaded logic remains unchanged
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

    showScore(); // This call already exists, ensuring scores display on load
});

// Define all lessons
const lessons = {
    1: {
        title: "Solving Linear Equations",
        examples: [
            {
                title: "Example: Solving for x",
                content: `
                    <h2>Example: Solving for x</h2>
                    <p>Consider the equation: 2x + 3 = 7</p>
                    <p>To solve for x, we need to isolate x on one side of the equation.</p>
                    <p>Step 1: Subtract 3 from both sides: 2x + 3 - 3 = 7 - 3</p>
                    <p>Step 2: Simplify: 2x = 4</p>
                    <p>Step 3: Divide both sides by 2: 2x / 2 = 4 / 2</p>
                    <p>Step 4: Simplify: x = 2</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Solving for y",
                content: `
                    <h2>Example: Solving for y</h2>
                    <p>Consider the equation: y - 4 = 10</p>
                    <p>To solve for y, we need to isolate y on one side of the equation.</p>
                    <p>Step 1: Add 4 to both sides: y - 4 + 4 = 10 + 4</p>
                    <p>Step 2: Simplify: y = 14</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Solve for x: 3x - 4 = 5",
                answer: "3",
                explanation: "We solve this by adding 4 to both sides to get 3x = 9, then dividing by 3 to get x = 3."
            },
            {
                title: "Question 2", 
                question: "Solve for y: y + 5 = 12",
                answer: "7",
                explanation: "We solve this by subtracting 5 from both sides to get y = 7."
            }
        ],
        additionalExample: {
            title: "Example: Evaluating a Function",
            content: `
                <h2>Example: Evaluating a Function</h2>
                <p>Consider the function f(x) = 3x² - 2x + 1. What is the value of f(3)?</p>
                <p>Step 1: Substitute x with 3: f(3) = 3(3)² - 2(3) + 1</p>
                <p>Step 2: Calculate the square: f(3) = 3(9) - 2(3) + 1</p>
                <p>Step 3: Multiply: f(3) = 27 - 6 + 1</p>
                <p>Step 4: Simplify: f(3) = 22</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Solving Systems of Equations",
        examples: [
            {
                title: "Example: Substitution Method",
                content: `
                    <h2>Example: Substitution Method</h2>
                    <p>Consider the system of equations:</p>
                    <p>x + y = 10</p>
                    <p>x - y = 4</p>
                    <p>Step 1: Solve the first equation for x: x = 10 - y</p>
                    <p>Step 2: Substitute into the second equation: (10 - y) - y = 4</p>
                    <p>Step 3: Simplify: 10 - 2y = 4</p>
                    <p>Step 4: Solve for y: -2y = -6, y = 3</p>
                    <p>Step 5: Find x: x = 10 - 3 = 7</p>
                    <p>Solution: x = 7, y = 3</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Elimination Method",
                content: `
                    <h2>Example: Elimination Method</h2>
                    <p>Consider the system of equations:</p>
                    <p>2x + 3y = 12</p>
                    <p>x - y = 1</p>
                    <p>Step 1: Multiply the second equation by 2: 2x - 2y = 2</p>
                    <p>Step 2: Add the equations: 2x + 3y + 2x - 2y = 12 + 2</p>
                    <p>Step 3: Simplify: 4x + y = 14</p>
                    <p>Step 4: Solve for x using the equation x - y = 1: x = 1 + y</p>
                    <p>Step 5: Substitute: 4(1 + y) + y = 14</p>
                    <p>Step 6: Simplify: 4 + 4y + y = 14</p>
                    <p>Step 7: Solve for y: 4 + 5y = 14, 5y = 10, y = 2</p>
                    <p>Step 8: Find x: x = 1 + 2 = 3</p>
                    <p>Solution: x = 3, y = 2</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Solve the system: x + y = 5, x - y = 3",
                answer: "4,1",
                explanation: "Adding the equations: 2x = 8, so x = 4. Substituting: 4 + y = 5, so y = 1. The solution is x = 4, y = 1."
            },
            {
                title: "Question 2", 
                question: "Solve the system: 2x - y = 5, x + y = 4",
                answer: "3,1",
                explanation: "Adding the equations: 3x = 9, so x = 3. Substituting: 3 + y = 4, so y = 1. The solution is x = 3, y = 1."
            }
        ],
        additionalExample: {
            title: "Example: Graphical Method",
            content: `
                <h2>Example: Graphical Method</h2>
                <p>To solve a system of equations graphically, we plot both equations and find the intersection point.</p>
                <p>For the system:</p>
                <p>x + y = 6</p>
                <p>x - y = 2</p>
                <p>When we plot these lines, they intersect at the point (4, 2).</p>
                <p>We can verify this solution by substituting into both equations:</p>
                <p>4 + 2 = 6 ✓</p>
                <p>4 - 2 = 2 ✓</p>
                <p>Therefore, the solution is x = 4, y = 2.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Quadratic Equations",
        examples: [
            {
                title: "Example: Solving by Factoring",
                content: `
                    <h2>Example: Solving by Factoring</h2>
                    <p>Consider the equation: x² - 5x + 6 = 0</p>
                    <p>Step 1: Factor the expression: (x - 2)(x - 3) = 0</p>
                    <p>Step 2: Apply the zero product property:</p>
                    <p>Either x - 2 = 0 or x - 3 = 0</p>
                    <p>Step 3: Solve each equation:</p>
                    <p>x = 2 or x = 3</p>
                    <p>The solutions are x = 2 and x = 3.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Quadratic Formula",
                content: `
                    <h2>Example: Quadratic Formula</h2>
                    <p>Consider the equation: 2x² + 5x - 3 = 0</p>
                    <p>Step 1: Identify a, b, and c: a = 2, b = 5, c = -3</p>
                    <p>Step 2: Apply the quadratic formula: x = (-b ± √(b² - 4ac)) / (2a)</p>
                    <p>Step 3: Substitute the values: x = (-5 ± √(25 - 4(2)(-3))) / (2(2))</p>
                    <p>Step 4: Simplify: x = (-5 ± √(25 + 24)) / 4 = (-5 ± √49) / 4 = (-5 ± 7) / 4</p>
                    <p>Step 5: Calculate both solutions: x = (-5 + 7) / 4 = 2/4 = 0.5 or x = (-5 - 7) / 4 = -12/4 = -3</p>
                    <p>The solutions are x = 0.5 and x = -3.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Solve the quadratic equation: x² - 7x + 10 = 0",
                answer: "2,5",
                explanation: "We factor it to (x - 2)(x - 5) = 0, so x = 2 or x = 5."
            },
            {
                title: "Question 2", 
                question: "Solve the quadratic equation: 3x² - 12 = 0",
                answer: "2,-2",
                explanation: "We get 3x² = 12, so x² = 4, meaning x = 2 or x = -2."
            }
        ],
        additionalExample: {
            title: "Example: Completing the Square",
            content: `
                <h2>Example: Completing the Square</h2>
                <p>Consider the equation: x² + 6x + 8 = 0</p>
                <p>Step 1: Move the constant term: x² + 6x = -8</p>
                <p>Step 2: Take half of the coefficient of x and square it: (6/2)² = 9</p>
                <p>Step 3: Add this to both sides: x² + 6x + 9 = -8 + 9</p>
                <p>Step 4: Rewrite the left side as a perfect square: (x + 3)² = 1</p>
                <p>Step 5: Take the square root of both sides: x + 3 = ±1</p>
                <p>Step 6: Solve for x: x = -3 ± 1</p>
                <p>Step 7: Find both solutions: x = -2 or x = -4</p>
                <button id="next-question">Next Question</button>
            `
        }
    },


    // Existing lessons 1, 2, and 3 remain unchanged...
    // Add new lessons starting with ID 4
    4: {
        title: "Expressions and Polynomials",
        examples: [
            {
                title: "Example: Simplifying Expressions",
                content: `
                    <h2>Example: Simplifying Expressions</h2>
                    <p>Simplify the expression: 3x + 5x - 2 + 4</p>
                    <p>Step 1: Combine like terms (x terms): 3x + 5x = 8x</p>
                    <p>Step 2: Combine constants: -2 + 4 = 2</p>
                    <p>Step 3: Write the simplified expression: 8x + 2</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Adding Polynomials",
                content: `
                    <h2>Example: Adding Polynomials</h2>
                    <p>Add the polynomials: (2x² + 3x - 1) + (x² - 4x + 5)</p>
                    <p>Step 1: Combine like terms: (2x² + x²) + (3x - 4x) + (-1 + 5)</p>
                    <p>Step 2: Simplify: 3x² - x + 4</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Simplify: 4x + 2x - 7 + 3",
                answer: "6x - 4",
                explanation: "Combine like terms: 4x + 2x = 6x, and -7 + 3 = -4. So, 6x - 4."
            },
            {
                title: "Question 2",
                question: "Add the polynomials: (3x² - x + 2) + (2x² + 5x - 3)",
                answer: "5x² + 4x - 1",
                explanation: "Combine like terms: 3x² + 2x² = 5x², -x + 5x = 4x, 2 - 3 = -1. So, 5x² + 4x - 1."
            }
        ],
        additionalExample: {
            title: "Example: Multiplying Polynomials",
            content: `
                <h2>Example: Multiplying Polynomials</h2>
                <p>Multiply: (x + 2)(x - 3)</p>
                <p>Step 1: Use FOIL: x·x + x·(-3) + 2·x + 2·(-3)</p>
                <p>Step 2: Simplify: x² - 3x + 2x - 6</p>
                <p>Step 3: Combine like terms: x² - x - 6</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    5: {
        title: "Rational Expressions and Equations",
        examples: [
            {
                title: "Example: Simplifying Rational Expressions",
                content: `
                    <h2>Example: Simplifying Rational Expressions</h2>
                    <p>Simplify: (x² - 4) / (x - 2)</p>
                    <p>Step 1: Factor the numerator: (x - 2)(x + 2) / (x - 2)</p>
                    <p>Step 2: Cancel common factors (x ≠ 2): x + 2</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Solving Rational Equations",
                content: `
                    <h2>Example: Solving Rational Equations</h2>
                    <p>Solve: 3 / (x - 1) = 6</p>
                    <p>Step 1: Multiply both sides by (x - 1): 3 = 6(x - 1)</p>
                    <p>Step 2: Simplify: 3 = 6x - 6</p>
                    <p>Step 3: Solve for x: 9 = 6x, x = 1.5</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Simplify: (x² - 9) / (x + 3)",
                answer: "x - 3",
                explanation: "Factor the numerator: (x - 3)(x + 3) / (x + 3). Cancel (x + 3), so x - 3 (x ≠ -3)."
            },
            {
                title: "Question 2",
                question: "Solve: 5 / (x + 2) = 10",
                answer: "0.5",
                explanation: "Multiply by (x + 2): 5 = 10(x + 2). Simplify: 5 = 10x + 20, -15 = 10x, x = -1.5."
            }
        ],
        additionalExample: {
            title: "Example: Adding Rational Expressions",
            content: `
                <h2>Example: Adding Rational Expressions</h2>
                <p>Add: 2 / x + 3 / (x + 1)</p>
                <p>Step 1: Find a common denominator: x(x + 1)</p>
                <p>Step 2: Rewrite: (2(x + 1)) / (x(x + 1)) + (3x) / (x(x + 1))</p>
                <p>Step 3: Combine: (2x + 2 + 3x) / (x(x + 1)) = (5x + 2) / (x(x + 1))</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    6: {
        title: "Exponents and Radicals",
        examples: [
            {
                title: "Example: Simplifying Exponents",
                content: `
                    <h2>Example: Simplifying Exponents</h2>
                    <p>Simplify: x⁵ · x³</p>
                    <p>Step 1: Add the exponents (same base): x⁵⁺³</p>
                    <p>Step 2: Simplify: x⁸</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Simplifying Radicals",
                content: `
                    <h2>Example: Simplifying Radicals</h2>
                    <p>Simplify: √50</p>
                    <p>Step 1: Factor: √(25 · 2)</p>
                    <p>Step 2: Take the square root of 25: 5√2</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Simplify: x⁴ / x²",
                answer: "x²",
                explanation: "Subtract exponents: x⁴⁻² = x²."
            },
            {
                title: "Question 2",
                question: "Simplify: √72",
                answer: "6√2",
                explanation: "Factor: √(36 · 2) = 6√2."
            }
        ],
        additionalExample: {
            title: "Example: Rational Exponents",
            content: `
                <h2>Example: Rational Exponents</h2>
                <p>Simplify: 16^(1/2)</p>
                <p>Step 1: Recognize 1/2 as a square root: √16</p>
                <p>Step 2: Simplify: 4</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    7: {
        title: "Absolute Value and Inequalities",
        examples: [
            {
                title: "Example: Solving Absolute Value Equations",
                content: `
                    <h2>Example: Solving Absolute Value Equations</h2>
                    <p>Solve: |x - 3| = 5</p>
                    <p>Step 1: Set up two equations: x - 3 = 5 or x - 3 = -5</p>
                    <p>Step 2: Solve: x = 8 or x = -2</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Solving Inequalities",
                content: `
                    <h2>Example: Solving Inequalities</h2>
                    <p>Solve: 2x + 1 < 7</p>
                    <p>Step 1: Subtract 1: 2x < 6</p>
                    <p>Step 2: Divide by 2: x < 3</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Solve: |x + 2| = 4",
                answer: "2,-6",
                explanation: "x + 2 = 4 or x + 2 = -4. So, x = 2 or x = -6."
            },
            {
                title: "Question 2",
                question: "Solve: 3x - 4 > 5",
                answer: "x > 3",
                explanation: "3x > 9, so x > 3."
            }
        ],
        additionalExample: {
            title: "Example: Absolute Value Inequalities",
            content: `
                <h2>Example: Absolute Value Inequalities</h2>
                <p>Solve: |x - 1| < 3</p>
                <p>Step 1: Rewrite as: -3 < x - 1 < 3</p>
                <p>Step 2: Add 1: -2 < x < 4</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    // No comma after the last lesson
    8: {
        title: "Functions and Graphs",
        examples: [
            {
                title: "Example: Evaluating a Function",
                content: `
                    <h2>Example: Evaluating a Function</h2>
                    <p>Given f(x) = 2x + 3, find f(5).</p>
                    <p>Step 1: Substitute x = 5: f(5) = 2(5) + 3</p>
                    <p>Step 2: Simplify: f(5) = 10 + 3 = 13</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Graphing a Linear Function",
                content: `
                    <h2>Example: Graphing a Linear Function</h2>
                    <p>Graph y = 3x - 2.</p>
                    <p>Step 1: Find two points. If x = 0: y = 3(0) - 2 = -2 (point: (0, -2)).</p>
                    <p>Step 2: If x = 1: y = 3(1) - 2 = 1 (point: (1, 1)).</p>
                    <p>Step 3: Plot (0, -2) and (1, 1) and draw a straight line through them.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "If f(x) = x² - 4, what is f(3)?",
                answer: "5",
                explanation: "f(3) = 3² - 4 = 9 - 4 = 5."
            },
            {
                title: "Question 2",
                question: "What is the slope of the line y = -2x + 5?",
                answer: "-2",
                explanation: "In y = mx + b, m is the slope. Here, m = -2."
            }
        ],
        additionalExample: {
            title: "Example: Finding the Domain",
            content: `
                <h2>Example: Finding the Domain</h2>
                <p>Find the domain of f(x) = 1 / (x - 2).</p>
                <p>Step 1: The function is undefined when the denominator is 0: x - 2 = 0.</p>
                <p>Step 2: Solve: x = 2.</p>
                <p>Step 3: Domain is all real numbers except x ≠ 2.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    9: {
        title: "Exponential and Logarithmic Functions",
        examples: [
            {
                title: "Example: Simplifying an Exponential Expression",
                content: `
                    <h2>Example: Simplifying an Exponential Expression</h2>
                    <p>Simplify: 2³ · 2⁴.</p>
                    <p>Step 1: Add exponents (same base): 2³⁺⁴ = 2⁷</p>
                    <p>Step 2: Calculate: 2⁷ = 128</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Solving a Logarithmic Equation",
                content: `
                    <h2>Example: Solving a Logarithmic Equation</h2>
                    <p>Solve: log₂(x) = 3.</p>
                    <p>Step 1: Rewrite in exponential form: 2³ = x</p>
                    <p>Step 2: Simplify: x = 8</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "What is 5² · 5³?",
                answer: "3125",
                explanation: "5²⁺³ = 5⁵ = 25 · 125 = 3125."
            },
            {
                title: "Question 2",
                question: "Solve: log₃(9) = x",
                answer: "2",
                explanation: "log₃(9) = x means 3ˣ = 9. Since 3² = 9, x = 2."
            }
        ],
        additionalExample: {
            title: "Example: Exponential Growth",
            content: `
                <h2>Example: Exponential Growth</h2>
                <p>A population grows by 5% annually from 1000. What’s the population after 2 years?</p>
                <p>Step 1: Use P = P₀(1 + r)ᵗ: P = 1000(1 + 0.05)²</p>
                <p>Step 2: Simplify: P = 1000(1.05)² = 1000 · 1.1025 = 1102.5</p>
                <p>Population ≈ 1103 (rounded).</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    10: {
        title: "Mathematical Modeling and Word Problems",
        examples: [
            {
                title: "Example: Linear Model",
                content: `
                    <h2>Example: Linear Model</h2>
                    <p>A car rental costs $30/day plus $0.20/mile. Write a cost function.</p>
                    <p>Step 1: Define variables: Let C = cost, m = miles.</p>
                    <p>Step 2: Model: C = 30 + 0.20m</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Solving a Word Problem",
                content: `
                    <h2>Example: Solving a Word Problem</h2>
                    <p>Two numbers sum to 15, and their difference is 3. Find them.</p>
                    <p>Step 1: Let x and y be the numbers. x + y = 15, x - y = 3.</p>
                    <p>Step 2: Add equations: 2x = 18, x = 9.</p>
                    <p>Step 3: Substitute: 9 + y = 15, y = 6.</p>
                    <p>Numbers are 9 and 6.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "A phone plan costs $20/month plus $0.10/text. What’s the cost for 50 texts?",
                answer: "25",
                explanation: "C = 20 + 0.10(50) = 20 + 5 = 25."
            },
            {
                title: "Question 2",
                question: "A rectangle’s length is twice its width. If the perimeter is 24, what’s the width?",
                answer: "4",
                explanation: "Let w = width, l = 2w. Perimeter = 2l + 2w = 2(2w) + 2w = 6w = 24. So, w = 4."
            }
        ],
        additionalExample: {
            title: "Example: Quadratic Model",
            content: `
                <h2>Example: Quadratic Model</h2>
                <p>A ball’s height is h(t) = -16t² + 32t + 5. When does it hit the ground?</p>
                <p>Step 1: Set h(t) = 0: -16t² + 32t + 5 = 0.</p>
                <p>Step 2: Use quadratic formula: t = [-32 ± √(32² - 4(-16)(5))] / (2(-16))</p>
                <p>Step 3: Simplify: t = [-32 ± √(1024 + 320)] / -32 = [-32 ± √1344] / -32</p>
                <p>Step 4: Approximate: t ≈ 2.15 or t ≈ -0.15. Take t ≈ 2.15 seconds.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }

};

const mathQuestions = [
    {
        question: "The function f(x) is defined as f(x) = 2x² - 3x + 5. What is the value of f(4)?",
        answers: [
            { text: "A) 27", correct: false },
            { text: "B) 29", correct: true },
            { text: "C) 31", correct: false },
            { text: "D) 25", correct: false }
        ],
        explanation: "The correct answer is B) 29. f(4) = 2(4)² - 3(4) + 5 = 2(16) - 12 + 5 = 32 - 12 + 5 = 25.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "A company rents out bicycles for a flat fee of $12 plus $3 per hour. If a customer has $45 to spend, what is the maximum number of hours they can rent a bicycle?",
        answers: [
            { text: "A) 10 hours", correct: false },
            { text: "B) 11 hours", correct: false },
            { text: "C) 9 hours", correct: true },
            { text: "D) 8 hours", correct: false }
        ],
        explanation: "The correct answer is C) 9 hours. $45 - $12 = $33. $33 / $3 per hour = 11 hours.",
        difficulty: "medium",
        category: "algebra"
    },
    {
        question: "Solve for x: 5x + 3 = 18",
        answers: [
            { text: "A) 2", correct: false },
            { text: "B) 3", correct: true },
            { text: "C) 4", correct: false },
            { text: "D) 5", correct: false }
        ],
        explanation: "The correct answer is B) 3. 5x + 3 = 18 -> 5x = 15 -> x = 3.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "If 3(x - 2) = 9, what is the value of x?",
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 5", correct: false },
            { text: "D) 6", correct: false }
        ],
        explanation: "The correct answer is A) 3. 3(x - 2) = 9 -> x - 2 = 3 -> x = 5.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "If y = 2x + 1, what is the value of y when x = 3?",
        answers: [
            { text: "A) 5", correct: false },
            { text: "B) 6", correct: false },
            { text: "C) 7", correct: true },
            { text: "D) 8", correct: false }
        ],
        explanation: "The correct answer is C) 7. y = 2(3) + 1 = 6 + 1 = 7.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "The sum of two consecutive integers is 37. What are the integers?",
        answers: [
            { text: "A) 18 and 19", correct: true },
            { text: "B) 17 and 18", correct: false },
            { text: "C) 19 and 20", correct: false },
            { text: "D) 16 and 17", correct: false }
        ],
        explanation: "The correct answer is A) 18 and 19. 18 + 19 = 37.",
        difficulty: "medium",
        category: "algebra"
    },
    {
        question: "What is the solution to the inequality 2x - 5 > 3?",
        answers: [
            { text: "A) x > 4", correct: true },
            { text: "B) x < 4", correct: false },
            { text: "C) x > 1", correct: false },
            { text: "D) x < 1", correct: false }
        ],
        explanation: "The correct answer is A) x > 4. 2x - 5 > 3 -> 2x > 8 -> x > 4.",
        difficulty: "medium",
        category: "algebra"
    }
];

// Additional questions for other lessons
const systemsQuestions = [
    {
        question: "What is the solution to the system: 2x + y = 8, x - y = 1?",
        answers: [
            { text: "A) x = 3, y = 2", correct: true },
            { text: "B) x = 2, y = 4", correct: false },
            { text: "C) x = 4, y = 0", correct: false },
            { text: "D) x = 1, y = 6", correct: false }
        ],
        explanation: "The correct answer is A) x = 3, y = 2. From the second equation, we get x = 1 + y. Substituting into the first equation: 2(1 + y) + y = 8 → 2 + 2y + y = 8 → 2 + 3y = 8 → 3y = 6 → y = 2. Then x = 1 + 2 = 3.",
        difficulty: "medium",
        category: "algebra"
    },
    {
        question: "Which of these represents a system with no solution?",
        answers: [
            { text: "A) x + y = 5, x + y = 7", correct: true },
            { text: "B) 2x + y = 7, x - y = 2", correct: false },
            { text: "C) 3x + y = 8, 6x + 2y = 16", correct: false },
            { text: "D) x = 2y, y = 3", correct: false }
        ],
        explanation: "The correct answer is A) x + y = 5, x + y = 7. These equations are parallel lines with the same slope but different y-intercepts, so they never intersect.",
        difficulty: "medium",
        category: "algebra"
    }
];

const quadraticQuestions = [
    {
        question: "What are the roots of x² - 9 = 0?",
        answers: [
            { text: "A) x = 3, x = -3", correct: true },
            { text: "B) x = 3 only", correct: false },
            { text: "C) x = 9, x = -9", correct: false },
            { text: "D) x = 4.5, x = -4.5", correct: false }
        ],
        explanation: "The correct answer is A) x = 3, x = -3. We have x² = 9, so x = ±3.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "For the quadratic function f(x) = x² - 4x + 4, what is the vertex?",
        answers: [
            { text: "A) (0, 4)", correct: false },
            { text: "B) (2, 0)", correct: true },
            { text: "C) (4, 0)", correct: false },
            { text: "D) (0, 0)", correct: false }
        ],
        explanation: "The correct answer is B) (2, 0). The x-coordinate of the vertex is given by x = -b/(2a) = -(-4)/(2*1) = 2. The y-coordinate is f(2) = 2² - 4(2) + 4 = 4 - 8 + 4 = 0.",
        difficulty: "medium",
        category: "algebra"
    }
];
// Add new question arrays after quadraticQuestions
const expressionsPolynomialsQuestions = [
    {
        question: "Simplify: 7x - 3x + 2 + 5",
        answers: [
            { text: "A) 4x + 7", correct: true },
            { text: "B) 10x + 7", correct: false },
            { text: "C) 4x - 3", correct: false },
            { text: "D) 7x + 2", correct: false }
        ],
        explanation: "Combine like terms: 7x - 3x = 4x, 2 + 5 = 7. So, 4x + 7.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "Multiply: (x + 1)(x + 2)",
        answers: [
            { text: "A) x² + 3x + 2", correct: true },
            { text: "B) x² + 2x + 1", correct: false },
            { text: "C) x² + x + 2", correct: false },
            { text: "D) x² + 3x + 1", correct: false }
        ],
        explanation: "Use FOIL: x·x + x·2 + 1·x + 1·2 = x² + 2x + x + 2 = x² + 3x + 2.",
        difficulty: "medium",
        category: "algebra"
    }
];

const rationalExpressionsQuestions = [
    {
        question: "Simplify: (x² - 16) / (x + 4)",
        answers: [
            { text: "A) x - 4", correct: true },
            { text: "B) x + 4", correct: false },
            { text: "C) x² - 4", correct: false },
            { text: "D) x - 16", correct: false }
        ],
        explanation: "Factor: (x - 4)(x + 4) / (x + 4) = x - 4 (x ≠ -4).",
        difficulty: "medium",
        category: "algebra"
    }
];

const exponentsRadicalsQuestions = [
    {
        question: "Simplify: x⁶ · x²",
        answers: [
            { text: "A) x⁸", correct: true },
            { text: "B) x¹²", correct: false },
            { text: "C) x⁴", correct: false },
            { text: "D) x³", correct: false }
        ],
        explanation: "Add exponents: x⁶⁺² = x⁸.",
        difficulty: "easy",
        category: "algebra"
    }
];

const absoluteValueInequalitiesQuestions = [
    {
        question: "Solve: |x - 2| = 6",
        answers: [
            { text: "A) x = 8, x = -4", correct: true },
            { text: "B) x = 6, x = -6", correct: false },
            { text: "C) x = 2, x = -2", correct: false },
            { text: "D) x = 8, x = 4", correct: false }
        ],
        explanation: "x - 2 = 6 or x - 2 = -6. So, x = 8 or x = -4.",
        difficulty: "medium",
        category: "algebra"
    }
];
const functionsGraphsQuestions = [
    {
        question: "If f(x) = 3x - 1, what is f(2)?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 6", correct: false },
            { text: "C) 4", correct: false },
            { text: "D) 7", correct: false }
        ],
        explanation: "f(2) = 3(2) - 1 = 6 - 1 = 5.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "What is the y-intercept of y = 4x + 3?",
        answers: [
            { text: "A) 4", correct: false },
            { text: "B) 3", correct: true },
            { text: "C) 0", correct: false },
            { text: "D) -3", correct: false }
        ],
        explanation: "In y = mx + b, b is the y-intercept. Here, b = 3.",
        difficulty: "easy",
        category: "algebra"
    }
];

const exponentialLogarithmicQuestions = [
    {
        question: "Simplify: 3⁴ · 3²",
        answers: [
            { text: "A) 3⁶", correct: true },
            { text: "B) 3⁸", correct: false },
            { text: "C) 3⁵", correct: false },
            { text: "D) 9⁶", correct: false }
        ],
        explanation: "3⁴ · 3² = 3⁴⁺² = 3⁶.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "Solve: log₅(25) = x",
        answers: [
            { text: "A) 1", correct: false },
            { text: "B) 2", correct: true },
            { text: "C) 3", correct: false },
            { text: "D) 5", correct: false }
        ],
        explanation: "log₅(25) = x means 5ˣ = 25. Since 5² = 25, x = 2.",
        difficulty: "medium",
        category: "algebra"
    }
];

const mathematicalModelingQuestions = [
    {
        question: "A store charges $15 plus $2 per item. What’s the cost for 3 items?",
        answers: [
            { text: "A) $21", correct: true },
            { text: "B) $18", correct: false },
            { text: "C) $17", correct: false },
            { text: "D) $20", correct: false }
        ],
        explanation: "C = 15 + 2(3) = 15 + 6 = 21.",
        difficulty: "easy",
        category: "algebra"
    },
    {
        question: "Two numbers sum to 20, and one is 4 more than the other. What’s the smaller number?",
        answers: [
            { text: "A) 8", correct: true },
            { text: "B) 10", correct: false },
            { text: "C) 12", correct: false },
            { text: "D) 6", correct: false }
        ],
        explanation: "Let x = smaller number, x + 4 = larger. x + (x + 4) = 20 → 2x + 4 = 20 → 2x = 16 → x = 8.",
        difficulty: "medium",
        category: "algebra"
    }
];

let categoryStats = {
    algebra: { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;

function startLesson() {
    const startLessonButton = document.getElementById('start-lesson');
    startLessonButton.style.display = 'none';
    showExample();
}

function showExample() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].examples[0].content;
    document.getElementById('next-example').addEventListener('click', showNextExample);
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
        <input type="text" id="answer1" placeholder="Your answer">
        <button id="submit-answer1">Submit Answer</button>
    `;
    document.getElementById('submit-answer1').addEventListener('click', checkAnswer1);
}

function checkAnswer1() {
    const answer = document.getElementById('answer1').value;
    const correctAnswer = lessons[currentLesson].questions[0].answer;
    
    if (answer.toString().trim() === correctAnswer.toString().trim()) {
        alert('Correct!');
        categoryStats.algebra.correct++;
        showNextExample3();
    } else {
        alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
        categoryStats.algebra.incorrect++;
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
        <input type="text" id="answer2" placeholder="Your answer">
        <button id="submit-answer2">Submit Answer</button>
    `;
    document.getElementById('submit-answer2').addEventListener('click', checkAnswer2);
}

function checkAnswer2() {
    const answer = document.getElementById('answer2').value;
    const correctAnswer = lessons[currentLesson].questions[1].answer;
    
    if (answer.toString().trim() === correctAnswer.toString().trim()) {
        alert('Correct!');
        categoryStats.algebra.correct++;
        showQuiz();
    } else {
        alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
        categoryStats.algebra.incorrect++;
    }
}


// Update the showQuiz function
function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1:
            quizQuestions = mathQuestions;
            break;
        case 2:
            quizQuestions = systemsQuestions;
            break;
        case 3:
            quizQuestions = quadraticQuestions;
            break;
        case 4:
            quizQuestions = expressionsPolynomialsQuestions;
            break;
        case 5:
            quizQuestions = rationalExpressionsQuestions;
            break;
        case 6:
            quizQuestions = exponentsRadicalsQuestions;
            break;
        case 7:
            quizQuestions = absoluteValueInequalitiesQuestions;
            break;
        case 8:
            quizQuestions = functionsGraphsQuestions;
            break;
        case 9:
            quizQuestions = exponentialLogarithmicQuestions;
            break;
        case 10:
            quizQuestions = mathematicalModelingQuestions;
            break;
        default:
            quizQuestions = mathQuestions;
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
            showFinalScore(); // Ensure this runs
        }
    } else {
        alert('Please select an answer.');
    }
}

function logFinalScore(totalCorrect, totalAttempted) {
    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    
    // Store the final score in localStorage
    localStorage.setItem("finalScore", JSON.stringify({
        correct: totalCorrect,
        attempted: totalAttempted,
        percentage: percentage,
        lesson: currentLesson
    }));

    console.log("Final score logged:", { totalCorrect, totalAttempted, percentage, lesson: currentLesson });
}

function showFinalScore() {
    let totalCorrect = 0;
    let totalAttempted = 0;

    for (let category in categoryStats) {
        totalCorrect += categoryStats[category].correct;
        totalAttempted += categoryStats[category].correct + categoryStats[category].incorrect;
    }

    logFinalScore(totalCorrect, totalAttempted); // Log the score before redirecting

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    
    const finalScoreElement = document.getElementById('final-score');
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = ''; // Clear lesson content
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

    console.log("Previous testResults from localStorage:", results);

    if (typeof results !== "object" || Array.isArray(results)) {
        console.error("Error: results should be an object but got", results);
        results = {};
    }

    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        console.log(`Before update -> ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
        console.log(`After update -> ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
    }
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Final stored testResults:", results);

    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

function updateDisplayedPercentage(categoryStats) {
    console.log("Updating displayed percentages");
    let percentageElement = document.getElementById("algebra-percentage");
    if (percentageElement) {
        let correct = categoryStats["algebra"]?.correct || 0;
        let incorrect = categoryStats["algebra"]?.incorrect || 0;
        let total = correct + incorrect;
        let percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        percentageElement.innerText = `Correct Answers: ${percentage}%`;
    } else {
        console.warn("Percentage element not found.");
    }
}

function showScore() {
    const finalScore = JSON.parse(localStorage.getItem("finalScore"));
    if (!finalScore) return;

    const correct = finalScore.correct || 0;
    const attempted = finalScore.attempted || 0;
    const percentage = finalScore.percentage || 0;

    // Update UI if element exists
    const percentageElement = document.getElementById("quiz-percentage");
    if (percentageElement) {
        percentageElement.textContent = `Correct Answers: ${percentage}% (${correct}/${attempted})`;
    }
}

// Enhance the existing showScore function to update score summaries for all lessons
const originalShowScore = showScore; // Preserve the original function if it has other logic
showScore = function() {
    // Call the original showScore function if it does something else
    if (typeof originalShowScore === 'function') {
        originalShowScore();
    }
    
    // Update score summaries for lessons 1 through 10
    for (let i = 1; i <= 10; i++) {
        const scoreElement = document.getElementById(`score-summary-${i}`);
        if (scoreElement) {
            const score = getScore(i);
            scoreElement.textContent = `Last Score: ${score}`;
        } else {
            console.warn(`Score summary element for lesson ${i} not found`);
        }
    }
};

// Function to calculate and save score after quiz (add this to integrate with quiz logic)
function endQuiz(correctAnswers, totalQuestions) {
    const score = `${correctAnswers}/${totalQuestions} (${Math.round((correctAnswers / totalQuestions) * 100)}%)`;
    saveScore(currentLesson, score);
    showScore(); // Update the display immediately after saving
}

// Example integration with quiz logic (add this if not already present)
// Assuming you have a way to track correct answers in your quiz
let correctAnswers = 0; // Add this at the top of your script if not already defined

// Add this function if you don't already have a way to check answers
function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
    }
    // Move to next question or end quiz
    if (currentQuestionIndex + 1 < quizQuestions.length) {
        currentQuestionIndex++;
        showNextQuizQuestion(quizQuestions);
    } else {
        endQuiz(correctAnswers, quizQuestions.length);
        correctAnswers = 0; // Reset for next quiz
    }
}

// Hook into showFinalScore to save the score
const originalShowFinalScore = showFinalScore;
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

    // Save the score
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    console.log("Saving score:", score);
    saveScore(currentLesson, score);
}

function saveScore(lessonId, score) {
    localStorage.setItem(`lessonScore-${lessonId}`, score);
    console.log(`Saved score ${score} for lesson ${lessonId}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`lessonScore-${lessonId}`) || "Not completed yet";
}