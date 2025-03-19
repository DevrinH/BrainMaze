document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    // Get the lesson ID from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || 1;
    
    console.log(`Loading lesson ${lessonId}`);
    
    // Set the current lesson
    currentLesson = lessonId;

    showScore();
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
    }
    // No comma after the last lesson

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

// Update showQuiz function
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
            showFinalScore();
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