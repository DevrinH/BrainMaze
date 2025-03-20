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
        title: "Lines and Angles",
        examples: [
            {
                title: "Example: Finding Angle Measures",
                content: `
                    <h2>Example: Finding Angle Measures</h2>
                    <p>Two angles are supplementary, and one angle is 40°. Find the other angle.</p>
                    <p>Step 1: Supplementary angles sum to 180°.</p>
                    <p>Step 2: Subtract the known angle: 180° - 40° = 140°</p>
                    <p>The other angle is 140°.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Parallel Lines and Transversals",
                content: `
                    <h2>Example: Parallel Lines and Transversals</h2>
                    <p>If two parallel lines are cut by a transversal, and one angle is 65°, find the corresponding angle.</p>
                    <p>Step 1: Corresponding angles are equal when lines are parallel.</p>
                    <p>Step 2: The corresponding angle is also 65°.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Two angles are complementary, and one is 25°. What is the other angle?",
                answer: "65",
                explanation: "Complementary angles sum to 90°. So, 90° - 25° = 65°."
            },
            {
                title: "Question 2",
                question: "If two parallel lines are cut by a transversal and an interior angle is 110°, what is the alternate interior angle?",
                answer: "110",
                explanation: "Alternate interior angles are equal when lines are parallel. Thus, it’s 110°."
            }
        ],
        additionalExample: {
            title: "Example: Vertical Angles",
            content: `
                <h2>Example: Vertical Angles</h2>
                <p>Two lines intersect, forming a vertical angle pair. If one angle is 72°, find the other.</p>
                <p>Step 1: Vertical angles are equal.</p>
                <p>Step 2: The other angle is 72°.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Triangles",
        examples: [
            {
                title: "Example: Finding a Missing Angle",
                content: `
                    <h2>Example: Finding a Missing Angle</h2>
                    <p>In a triangle, two angles are 50° and 60°. Find the third angle.</p>
                    <p>Step 1: The sum of angles in a triangle is 180°.</p>
                    <p>Step 2: Add known angles: 50° + 60° = 110°</p>
                    <p>Step 3: Subtract from 180°: 180° - 110° = 70°</p>
                    <p>The third angle is 70°.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Using the Pythagorean Theorem",
                content: `
                    <h2>Example: Using the Pythagorean Theorem</h2>
                    <p>In a right triangle, the legs are 3 and 4. Find the hypotenuse.</p>
                    <p>Step 1: Use the formula: a² + b² = c²</p>
                    <p>Step 2: Substitute: 3² + 4² = c²</p>
                    <p>Step 3: Calculate: 9 + 16 = 25</p>
                    <p>Step 4: Take the square root: c = √25 = 5</p>
                    <p>The hypotenuse is 5.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "In a triangle, two angles are 45° and 75°. What is the third angle?",
                answer: "60",
                explanation: "180° - (45° + 75°) = 180° - 120° = 60°."
            },
            {
                title: "Question 2",
                question: "In a right triangle, one leg is 6 and the hypotenuse is 10. What is the other leg?",
                answer: "8",
                explanation: "6² + b² = 10² → 36 + b² = 100 → b² = 64 → b = 8."
            }
        ],
        additionalExample: {
            title: "Example: Triangle Congruence",
            content: `
                <h2>Example: Triangle Congruence</h2>
                <p>Two triangles have sides 5, 12, 13. Are they congruent?</p>
                <p>Step 1: Check if they are right triangles: 5² + 12² = 25 + 144 = 169 = 13²</p>
                <p>Step 2: Since all sides match (SSS), they are congruent.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Quadrilaterals and Polygons",
        examples: [
            {
                title: "Example: Sum of Interior Angles",
                content: `
                    <h2>Example: Sum of Interior Angles</h2>
                    <p>Find the sum of interior angles in a pentagon.</p>
                    <p>Step 1: Use the formula: (n - 2) × 180°, where n = number of sides.</p>
                    <p>Step 2: For a pentagon (n = 5): (5 - 2) × 180° = 3 × 180° = 540°</p>
                    <p>The sum is 540°.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Rectangle Diagonal",
                content: `
                    <h2>Example: Rectangle Diagonal</h2>
                    <p>A rectangle has sides 6 and 8. Find the diagonal length.</p>
                    <p>Step 1: Use the Pythagorean theorem: d² = 6² + 8²</p>
                    <p>Step 2: Calculate: d² = 36 + 64 = 100</p>
                    <p>Step 3: Take the square root: d = √100 = 10</p>
                    <p>The diagonal is 10.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "What is the sum of interior angles in a hexagon?",
                answer: "720",
                explanation: "(6 - 2) × 180° = 4 × 180° = 720°."
            },
            {
                title: "Question 2",
                question: "A square has a side length of 5. What is its diagonal?",
                answer: "7.07",
                explanation: "d² = 5² + 5² = 50 → d = √50 ≈ 7.07 (to two decimals)."
            }
        ],
        additionalExample: {
            title: "Example: Parallelogram Properties",
            content: `
                <h2>Example: Parallelogram Properties</h2>
                <p>In a parallelogram, one angle is 70°. Find the other angles.</p>
                <p>Step 1: Opposite angles are equal: another angle is 70°.</p>
                <p>Step 2: Adjacent angles are supplementary: 180° - 70° = 110°</p>
                <p>Angles are 70°, 110°, 70°, 110°.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Circles",
        examples: [
            {
                title: "Example: Circumference",
                content: `
                    <h2>Example: Circumference</h2>
                    <p>A circle has a radius of 7. Find its circumference.</p>
                    <p>Step 1: Use the formula: C = 2πr</p>
                    <p>Step 2: Substitute: C = 2π(7) = 14π</p>
                    <p>The circumference is 14π (or ≈ 43.98).</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Area of a Circle",
                content: `
                    <h2>Example: Area of a Circle</h2>
                    <p>A circle has a diameter of 10. Find its area.</p>
                    <p>Step 1: Radius = diameter / 2 = 10 / 2 = 5</p>
                    <p>Step 2: Use the formula: A = πr²</p>
                    <p>Step 3: Substitute: A = π(5)² = 25π</p>
                    <p>The area is 25π (or ≈ 78.54).</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "A circle has a radius of 3. What is its circumference?",
                answer: "6π",
                explanation: "C = 2π(3) = 6π."
            },
            {
                title: "Question 2",
                question: "A circle has a diameter of 8. What is its area?",
                answer: "16π",
                explanation: "Radius = 8 / 2 = 4, A = π(4)² = 16π."
            }
        ],
        additionalExample: {
            title: "Example: Arc Length",
            content: `
                <h2>Example: Arc Length</h2>
                <p>A circle has a radius of 6, and a central angle of 60°. Find the arc length.</p>
                <p>Step 1: Use the formula: L = (θ/360°) × 2πr</p>
                <p>Step 2: Substitute: L = (60/360) × 2π(6) = (1/6) × 12π = 2π</p>
                <p>The arc length is 2π.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    5: {
        title: "Coordinate Geometry",
        examples: [
            {
                title: "Example: Distance Between Points",
                content: `
                    <h2>Example: Distance Between Points</h2>
                    <p>Find the distance between (2, 3) and (5, 7).</p>
                    <p>Step 1: Use the distance formula: d = √((x₂ - x₁)² + (y₂ - y₁)²)</p>
                    <p>Step 2: Substitute: d = √((5 - 2)² + (7 - 3)²) = √(3² + 4²) = √(9 + 16) = √25 = 5</p>
                    <p>The distance is 5.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Midpoint",
                content: `
                    <h2>Example: Midpoint</h2>
                    <p>Find the midpoint of (1, 2) and (3, 4).</p>
                    <p>Step 1: Use the midpoint formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</p>
                    <p>Step 2: Substitute: M = ((1 + 3)/2, (2 + 4)/2) = (4/2, 6/2) = (2, 3)</p>
                    <p>The midpoint is (2, 3).</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "What is the distance between (0, 0) and (3, 4)?",
                answer: "5",
                explanation: "d = √(3² + 4²) = √(9 + 16) = √25 = 5."
            },
            {
                title: "Question 2",
                question: "What is the midpoint of (-2, 1) and (4, 5)?",
                answer: "1,3",
                explanation: "M = ((-2 + 4)/2, (1 + 5)/2) = (2/2, 6/2) = (1, 3)."
            }
        ],
        additionalExample: {
            title: "Example: Slope of a Line",
            content: `
                <h2>Example: Slope of a Line</h2>
                <p>Find the slope between (2, 1) and (5, 7).</p>
                <p>Step 1: Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁)</p>
                <p>Step 2: Substitute: m = (7 - 1) / (5 - 2) = 6 / 3 = 2</p>
                <p>The slope is 2.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    6: {
        title: "3D Geometry (Solids)",
        examples: [
            {
                title: "Example: Volume of a Cube",
                content: `
                    <h2>Example: Volume of a Cube</h2>
                    <p>A cube has a side length of 4. Find its volume.</p>
                    <p>Step 1: Use the formula: V = s³</p>
                    <p>Step 2: Substitute: V = 4³ = 64</p>
                    <p>The volume is 64 cubic units.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Surface Area of a Cylinder",
                content: `
                    <h2>Example: Surface Area of a Cylinder</h2>
                    <p>A cylinder has a radius of 3 and height of 5. Find its surface area.</p>
                    <p>Step 1: Use the formula: SA = 2πr² + 2πrh</p>
                    <p>Step 2: Substitute: SA = 2π(3)² + 2π(3)(5) = 18π + 30π = 48π</p>
                    <p>The surface area is 48π (or ≈ 150.8).</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "What is the volume of a sphere with radius 3?",
                answer: "36π",
                explanation: "V = (4/3)πr³ = (4/3)π(3)³ = (4/3)π(27) = 36π."
            },
            {
                title: "Question 2",
                question: "A rectangular prism has dimensions 2, 3, and 4. What is its volume?",
                answer: "24",
                explanation: "V = l × w × h = 2 × 3 × 4 = 24."
            }
        ],
        additionalExample: {
            title: "Example: Volume of a Cone",
            content: `
                <h2>Example: Volume of a Cone</h2>
                <p>A cone has a radius of 2 and height of 6. Find its volume.</p>
                <p>Step 1: Use the formula: V = (1/3)πr²h</p>
                <p>Step 2: Substitute: V = (1/3)π(2)²(6) = (1/3)π(4)(6) = 8π</p>
                <p>The volume is 8π.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    7: {
        title: "Transformations",
        examples: [
            {
                title: "Example: Translation",
                content: `
                    <h2>Example: Translation</h2>
                    <p>Translate point (3, 4) by (2, -1). Find the new coordinates.</p>
                    <p>Step 1: Add the translation vector: (3 + 2, 4 + (-1))</p>
                    <p>Step 2: Simplify: (5, 3)</p>
                    <p>The new coordinates are (5, 3).</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Reflection",
                content: `
                    <h2>Example: Reflection</h2>
                    <p>Reflect point (2, 3) over the x-axis. Find the new coordinates.</p>
                    <p>Step 1: Over the x-axis, y changes sign: (x, y) → (x, -y)</p>
                    <p>Step 2: Apply: (2, 3) → (2, -3)</p>
                    <p>The new coordinates are (2, -3).</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Translate (1, 5) by (-3, 2). What are the new coordinates?",
                answer: "-2,7",
                explanation: "(1 + (-3), 5 + 2) = (-2, 7)."
            },
            {
                title: "Question 2",
                question: "Reflect (4, -1) over the y-axis. What are the new coordinates?",
                answer: "-4,-1",
                explanation: "Over the y-axis, x changes sign: (4, -1) → (-4, -1)."
            }
        ],
        additionalExample: {
            title: "Example: Rotation",
            content: `
                <h2>Example: Rotation</h2>
                <p>Rotate (1, 0) 90° counterclockwise around the origin. Find the new coordinates.</p>
                <p>Step 1: For 90° CCW: (x, y) → (-y, x)</p>
                <p>Step 2: Apply: (1, 0) → (0, 1)</p>
                <p>The new coordinates are (0, 1).</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    8: {
        title: "Trigonometry (Basic Concepts)",
        examples: [
            {
                title: "Example: Finding Sine",
                content: `
                    <h2>Example: Finding Sine</h2>
                    <p>In a right triangle, the opposite side is 3 and the hypotenuse is 5. Find sin(θ).</p>
                    <p>Step 1: Use the formula: sin(θ) = opposite / hypotenuse</p>
                    <p>Step 2: Substitute: sin(θ) = 3 / 5 = 0.6</p>
                    <p>sin(θ) = 0.6.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Finding Cosine",
                content: `
                    <h2>Example: Finding Cosine</h2>
                    <p>In a right triangle, the adjacent side is 4 and the hypotenuse is 5. Find cos(θ).</p>
                    <p>Step 1: Use the formula: cos(θ) = adjacent / hypotenuse</p>
                    <p>Step 2: Substitute: cos(θ) = 4 / 5 = 0.8</p>
                    <p>cos(θ) = 0.8.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "In a right triangle, the opposite side is 6 and the hypotenuse is 10. What is sin(θ)?",
                answer: "0.6",
                explanation: "sin(θ) = 6 / 10 = 0.6."
            },
            {
                title: "Question 2",
                question: "In a right triangle, the adjacent side is 8 and the hypotenuse is 10. What is cos(θ)?",
                answer: "0.8",
                explanation: "cos(θ) = 8 / 10 = 0.8."
            }
        ],
        additionalExample: {
            title: "Example: Finding Tangent",
            content: `
                <h2>Example: Finding Tangent</h2>
                <p>In a right triangle, the opposite side is 3 and the adjacent side is 4. Find tan(θ).</p>
                <p>Step 1: Use the formula: tan(θ) = opposite / adjacent</p>
                <p>Step 2: Substitute: tan(θ) = 3 / 4 = 0.75</p>
                <p>tan(θ) = 0.75.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Geometry question arrays
const linesAnglesQuestions = [
    {
        question: "Two angles are supplementary, and one is 75°. What is the other angle?",
        answers: [
            { text: "A) 105°", correct: true },
            { text: "B) 115°", correct: false },
            { text: "C) 95°", correct: false },
            { text: "D) 85°", correct: false }
        ],
        explanation: "Supplementary angles sum to 180°. 180° - 75° = 105°.",
        difficulty: "easy",
        category: "geometry"
    },
    {
        question: "If two parallel lines are cut by a transversal and a corresponding angle is 80°, what is another corresponding angle?",
        answers: [
            { text: "A) 80°", correct: true },
            { text: "B) 100°", correct: false },
            { text: "C) 90°", correct: false },
            { text: "D) 110°", correct: false }
        ],
        explanation: "Corresponding angles are equal. Thus, it’s 80°.",
        difficulty: "easy",
        category: "geometry"
    }
];

const trianglesQuestions = [
    {
        question: "In a triangle, two angles are 30° and 70°. What is the third angle?",
        answers: [
            { text: "A) 80°", correct: true },
            { text: "B) 90°", correct: false },
            { text: "C) 70°", correct: false },
            { text: "D) 60°", correct: false }
        ],
        explanation: "180° - (30° + 70°) = 80°.",
        difficulty: "easy",
        category: "geometry"
    },
    {
        question: "In a right triangle, one leg is 5 and the hypotenuse is 13. What is the other leg?",
        answers: [
            { text: "A) 12", correct: true },
            { text: "B) 10", correct: false },
            { text: "C) 8", correct: false },
            { text: "D) 6", correct: false }
        ],
        explanation: "5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12.",
        difficulty: "medium",
        category: "geometry"
    }
];

const quadrilateralsPolygonsQuestions = [
    {
        question: "What is the sum of interior angles in an octagon?",
        answers: [
            { text: "A) 1080°", correct: true },
            { text: "B) 900°", correct: false },
            { text: "C) 720°", correct: false },
            { text: "D) 1260°", correct: false }
        ],
        explanation: "(8 - 2) × 180° = 6 × 180° = 1080°.",
        difficulty: "medium",
        category: "geometry"
    },
    {
        question: "A rectangle has sides 9 and 12. What is its diagonal?",
        answers: [
            { text: "A) 15", correct: true },
            { text: "B) 13", correct: false },
            { text: "C) 10", correct: false },
            { text: "D) 18", correct: false }
        ],
        explanation: "d² = 9² + 12² = 81 + 144 = 225 → d = 15.",
        difficulty: "medium",
        category: "geometry"
    }
];

const circlesQuestions = [
    {
        question: "A circle has a radius of 5. What is its area?",
        answers: [
            { text: "A) 25π", correct: true },
            { text: "B) 20π", correct: false },
            { text: "C) 15π", correct: false },
            { text: "D) 10π", correct: false }
        ],
        explanation: "A = π(5)² = 25π.",
        difficulty: "easy",
        category: "geometry"
    }
];

const coordinateGeometryQuestions = [
    {
        question: "What is the distance between (1, 2) and (4, 6)?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 6", correct: false }
        ],
        explanation: "d = √((4 - 1)² + (6 - 2)²) = √(3² + 4²) = √25 = 5.",
        difficulty: "medium",
        category: "geometry"
    }
];

const threeDGeometryQuestions = [
    {
        question: "What is the volume of a cube with side length 5?",
        answers: [
            { text: "A) 125", correct: true },
            { text: "B) 100", correct: false },
            { text: "C) 150", correct: false },
            { text: "D) 75", correct: false }
        ],
        explanation: "V = 5³ = 125.",
        difficulty: "easy",
        category: "geometry"
    }
];

const transformationsQuestions = [
    {
        question: "Reflect (3, 2) over the x-axis. What are the new coordinates?",
        answers: [
            { text: "A) (3, -2)", correct: true },
            { text: "B) (-3, 2)", correct: false },
            { text: "C) (2, 3)", correct: false },
            { text: "D) (-3, -2)", correct: false }
        ],
        explanation: "Over the x-axis: (x, y) → (x, -y). So, (3, 2) → (3, -2).",
        difficulty: "easy",
        category: "geometry"
    }
];

const trigonometryQuestions = [
    {
        question: "In a right triangle, the opposite side is 8 and the hypotenuse is 17. What is sin(θ)?",
        answers: [
            { text: "A) 8/17", correct: true },
            { text: "B) 17/8", correct: false },
            { text: "C) 15/17", correct: false },
            { text: "D) 8/15", correct: false }
        ],
        explanation: "sin(θ) = opposite / hypotenuse = 8 / 17.",
        difficulty: "medium",
        category: "geometry"
    }
];

let categoryStats = {
    geometry: { correct: 0, incorrect: 0 }
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
        categoryStats.geometry.correct++;
        showNextExample3();
    } else {
        alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
        categoryStats.geometry.incorrect++;
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
        categoryStats.geometry.correct++;
        showQuiz();
    } else {
        alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
        categoryStats.geometry.incorrect++;
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = linesAnglesQuestions; break;
        case 2: quizQuestions = trianglesQuestions; break;
        case 3: quizQuestions = quadrilateralsPolygonsQuestions; break;
        case 4: quizQuestions = circlesQuestions; break;
        case 5: quizQuestions = coordinateGeometryQuestions; break;
        case 6: quizQuestions = threeDGeometryQuestions; break;
        case 7: quizQuestions = transformationsQuestions; break;
        case 8: quizQuestions = trigonometryQuestions; break;
        default: quizQuestions = linesAnglesQuestions;
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
    localStorage.setItem(`lessonScore-${lessonId}`, score);
    console.log(`Saved score ${score} for lesson ${lessonId}`);
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