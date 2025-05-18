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
// Define all lessons
const lessons = {
    1: {
        title: "Lines and Angles",
        content: [
            { type: "example", content: "<h2>Example 1: Supplementary Angles</h2><p>Two angles are supplementary, and one is 40°. Find the other.</p><p>Supplementary angles sum to 180°. 180° - 40° = 140°.</p><p>Answer: 140°</p>" },
            { type: "question", title: "Question 1", question: "Two angles are complementary, and one is 25°. What is the other?", options: [{ text: "A) 65°", correct: true }, { text: "B) 75°", correct: false }, { text: "C) 55°", correct: false }, { text: "D) 45°", correct: false }], explanation: "Complementary angles sum to 90°. 90° - 25° = 65°." },
            { type: "example", content: "<h2>Example 2: Parallel Lines</h2><p>Two parallel lines are cut by a transversal, and one angle is 65°. Find the corresponding angle.</p><p>Corresponding angles are equal. Thus, it’s 65°.</p><p>Answer: 65°</p>" },
            { type: "question", title: "Question 2", question: "If two parallel lines are cut by a transversal and an interior angle is 110°, what is the alternate interior angle?", options: [{ text: "A) 110°", correct: true }, { text: "B) 70°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 130°", correct: false }], explanation: "Alternate interior angles are equal. Thus, it’s 110°." },
            { type: "example", content: "<h2>Example 3: Vertical Angles</h2><p>Two lines intersect, and one angle is 72°. Find the vertical angle.</p><p>Vertical angles are equal. Thus, it’s 72°.</p><p>Answer: 72°</p>" },
            { type: "question", title: "Question 3", question: "An angle is twice its complement. What is the angle?", options: [{ text: "A) 60°", correct: true }, { text: "B) 30°", correct: false }, { text: "C) 45°", correct: false }, { text: "D) 90°", correct: false }], explanation: "Let angle = x, complement = 90° - x. x = 2(90° - x), x = 180° - 2x, 3x = 180°, x = 60°." },
            { type: "example", content: "<h2>Example 4: Transversal</h2><p>Parallel lines with a transversal, one angle is 130°. Find the same-side interior angle.</p><p>Same-side interior angles sum to 180°. 180° - 130° = 50°.</p><p>Answer: 50°</p>" },
            { type: "question", title: "Question 4", question: "Two angles are supplementary, and one is 85°. What is the other?", options: [{ text: "A) 95°", correct: true }, { text: "B) 105°", correct: false }, { text: "C) 85°", correct: false }, { text: "D) 75°", correct: false }], explanation: "180° - 85° = 95°." },
            { type: "example", content: "<h2>Example 5: Angle Sum</h2><p>Three angles on a straight line are 40°, 60°, and x°. Find x.</p><p>40° + 60° + x = 180°, x = 80°.</p><p>Answer: 80°</p>" },
            { type: "question", title: "Question 5", question: "If two parallel lines are cut by a transversal and an exterior angle is 140°, what is the corresponding angle?", options: [{ text: "A) 140°", correct: true }, { text: "B) 40°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 50°", correct: false }], explanation: "Corresponding angles are equal. Thus, it’s 140°." },
            { type: "example", content: "<h2>Example 6: Angle Pair</h2><p>An angle is 3 times its supplement. Find the angle.</p><p>x = 3(180° - x), 4x = 540°, x = 135°.</p><p>Answer: 135°</p>" },
            { type: "question", title: "Question 6", question: "Vertical angles are equal. If one is 45°, what is the other?", options: [{ text: "A) 45°", correct: true }, { text: "B) 135°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 60°", correct: false }], explanation: "Vertical angles are equal. Thus, it’s 45°." },
            { type: "example", content: "<h2>Example 7: Linear Pair</h2><p>Two angles form a linear pair, one is 35°. Find the other.</p><p>Linear pair sums to 180°. 180° - 35° = 145°.</p><p>Answer: 145°</p>" },
            { type: "question", title: "Question 7", question: "An angle is 4 times its complement. What is the angle?", options: [{ text: "A) 72°", correct: true }, { text: "B) 18°", correct: false }, { text: "C) 36°", correct: false }, { text: "D) 90°", correct: false }], explanation: "x = 4(90° - x), 5x = 360°, x = 72°." }
        ]
    },
    2: {
        title: "Triangles",
        content: [
            { type: "example", content: "<h2>Example 1: Angle Sum</h2><p>In a triangle, two angles are 50° and 60°. Find the third.</p><p>180° - (50° + 60°) = 70°.</p><p>Answer: 70°</p>" },
            { type: "question", title: "Question 1", question: "In a triangle, two angles are 45° and 75°. What is the third?", options: [{ text: "A) 60°", correct: true }, { text: "B) 50°", correct: false }, { text: "C) 70°", correct: false }, { text: "D) 45°", correct: false }], explanation: "180° - (45° + 75°) = 60°." },
            { type: "example", content: "<h2>Example 2: Pythagorean Theorem</h2><p>In a right triangle, legs are 3 and 4. Find the hypotenuse.</p><p>3² + 4² = c², 9 + 16 = 25, c = 5.</p><p>Answer: 5</p>" },
            { type: "question", title: "Question 2", question: "In a right triangle, one leg is 6 and the hypotenuse is 10. What is the other leg?", options: [{ text: "A) 8", correct: true }, { text: "B) 6", correct: false }, { text: "C) 10", correct: false }, { text: "D) 4", correct: false }], explanation: "6² + b² = 10² → 36 + b² = 100 → b = 8." },
            { type: "example", content: "<h2>Example 3: Isosceles Triangle</h2><p>An isosceles triangle has a base angle of 55°. Find the vertex angle.</p><p>180° - (55° + 55°) = 70°.</p><p>Answer: 70°</p>" },
            { type: "question", title: "Question 3", question: "An isosceles triangle has a vertex angle of 40°. What is each base angle?", options: [{ text: "A) 70°", correct: true }, { text: "B) 80°", correct: false }, { text: "C) 60°", correct: false }, { text: "D) 50°", correct: false }], explanation: "(180° - 40°) / 2 = 70°." },
            { type: "example", content: "<h2>Example 4: Right Triangle</h2><p>A right triangle has legs 5 and 12. Find the hypotenuse.</p><p>5² + 12² = c², 25 + 144 = 169, c = 13.</p><p>Answer: 13</p>" },
            { type: "question", title: "Question 4", question: "In a triangle, angles are in the ratio 2:3:4. What is the smallest angle?", options: [{ text: "A) 40°", correct: true }, { text: "B) 60°", correct: false }, { text: "C) 80°", correct: false }, { text: "D) 20°", correct: false }], explanation: "2x + 3x + 4x = 180°, 9x = 180°, x = 20°, smallest = 2x = 40°." },
            { type: "example", content: "<h2>Example 5: Equilateral Triangle</h2><p>Find the measure of each angle in an equilateral triangle.</p><p>180° ÷ 3 = 60°.</p><p>Answer: 60°</p>" },
            { type: "question", title: "Question 5", question: "A right triangle has a leg of 8 and hypotenuse of 17. What is the other leg?", options: [{ text: "A) 15", correct: true }, { text: "B) 12", correct: false }, { text: "C) 9", correct: false }, { text: "D) 10", correct: false }], explanation: "8² + b² = 17² → 64 + b² = 289 → b = 15." },
            { type: "example", content: "<h2>Example 6: Triangle Check</h2><p>Are sides 6, 8, 10 a right triangle?</p><p>6² + 8² = 36 + 64 = 100 = 10².</p><p>Answer: Yes</p>" },
            { type: "question", title: "Question 6", question: "An isosceles triangle has base angles of 65°. What is the vertex angle?", options: [{ text: "A) 50°", correct: true }, { text: "B) 65°", correct: false }, { text: "C) 115°", correct: false }, { text: "D) 25°", correct: false }], explanation: "180° - (65° + 65°) = 50°." },
            { type: "example", content: "<h2>Example 7: Angle Ratio</h2><p>A triangle’s angles are in the ratio 1:1:2. Find the largest angle.</p><p>1x + 1x + 2x = 180°, 4x = 180°, x = 45°, largest = 90°.</p><p>Answer: 90°</p>" },
            { type: "question", title: "Question 7", question: "A triangle has sides 5, 12, 13. Is it a right triangle?", options: [{ text: "A) Yes", correct: true }, { text: "B) No", correct: false }, { text: "C) Maybe", correct: false }, { text: "D) Not enough info", correct: false }], explanation: "5² + 12² = 25 + 144 = 169 = 13²." }
        ]
    },
    3: {
        title: "Quadrilaterals and Polygons",
        content: [
            { type: "example", content: "<h2>Example 1: Interior Angles</h2><p>Find the sum of interior angles in a pentagon.</p><p>(5 - 2) × 180° = 540°.</p><p>Answer: 540°</p>" },
            { type: "question", title: "Question 1", question: "What is the sum of interior angles in a hexagon?", options: [{ text: "A) 720°", correct: true }, { text: "B) 540°", correct: false }, { text: "C) 900°", correct: false }, { text: "D) 360°", correct: false }], explanation: "(6 - 2) × 180° = 720°." },
            { type: "example", content: "<h2>Example 2: Rectangle Diagonal</h2><p>A rectangle has sides 6 and 8. Find the diagonal.</p><p>d² = 6² + 8² = 36 + 64 = 100, d = 10.</p><p>Answer: 10</p>" },
            { type: "question", title: "Question 2", question: "A square has a side length of 5. What is its diagonal?", options: [{ text: "A) 5√2", correct: true }, { text: "B) 10", correct: false }, { text: "C) 5", correct: false }, { text: "D) 7", correct: false }], explanation: "d² = 5² + 5² = 50 → d = 5√2." },
            { type: "example", content: "<h2>Example 3: Parallelogram</h2><p>In a parallelogram, one angle is 70°. Find the adjacent angle.</p><p>180° - 70° = 110°.</p><p>Answer: 110°</p>" },
            { type: "question", title: "Question 3", question: "In a parallelogram, one angle is 50°. What is the opposite angle?", options: [{ text: "A) 50°", correct: true }, { text: "B) 130°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 40°", correct: false }], explanation: "Opposite angles are equal. Thus, it’s 50°." },
            { type: "example", content: "<h2>Example 4: Square</h2><p>A square has a side of 4. Find its diagonal.</p><p>d² = 4² + 4² = 32, d = 4√2.</p><p>Answer: 4√2</p>" },
            { type: "question", title: "Question 4", question: "What is the sum of interior angles in a heptagon?", options: [{ text: "A) 900°", correct: true }, { text: "B) 720°", correct: false }, { text: "C) 1080°", correct: false }, { text: "D) 540°", correct: false }], explanation: "(7 - 2) × 180° = 900°." },
            { type: "example", content: "<h2>Example 5: Regular Polygon</h2><p>Find each interior angle of a regular hexagon.</p><p>(6 - 2) × 180° = 720°, 720° ÷ 6 = 120°.</p><p>Answer: 120°</p>" },
            { type: "question", title: "Question 5", question: "A rectangle has sides 5 and 12. What is its diagonal?", options: [{ text: "A) 13", correct: true }, { text: "B) 15", correct: false }, { text: "C) 10", correct: false }, { text: "D) 17", correct: false }], explanation: "d² = 5² + 12² = 169 → d = 13." },
            { type: "example", content: "<h2>Example 6: Quadrilateral</h2><p>A quadrilateral has angles 80°, 100°, 120°. Find the fourth.</p><p>(4 - 2) × 180° = 360°, 360° - (80° + 100° + 120°) = 60°.</p><p>Answer: 60°</p>" },
            { type: "question", title: "Question 6", question: "In a regular octagon, what is each interior angle?", options: [{ text: "A) 135°", correct: true }, { text: "B) 120°", correct: false }, { text: "C) 150°", correct: false }, { text: "D) 108°", correct: false }], explanation: "(8 - 2) × 180° = 1080°, 1080° ÷ 8 = 135°." },
            { type: "example", content: "<h2>Example 7: Rhombus</h2><p>A rhombus has one angle of 60°. Find the adjacent angle.</p><p>180° - 60° = 120°.</p><p>Answer: 120°</p>" },
            { type: "question", title: "Question 7", question: "A parallelogram has one angle of 130°. What is an adjacent angle?", options: [{ text: "A) 50°", correct: true }, { text: "B) 130°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 40°", correct: false }], explanation: "180° - 130° = 50°." }
        ]
    },
    4: {
        title: "Circles",
        content: [
            { type: "example", content: "<h2>Example 1: Circumference</h2><p>A circle has a radius of 7. Find its circumference.</p><p>C = 2π(7) = 14π.</p><p>Answer: 14π</p>" },
            { type: "question", title: "Question 1", question: "A circle has a radius of 3. What is its circumference?", options: [{ text: "A) 6π", correct: true }, { text: "B) 9π", correct: false }, { text: "C) 3π", correct: false }, { text: "D) 12π", correct: false }], explanation: "C = 2π(3) = 6π." },
            { type: "example", content: "<h2>Example 2: Area</h2><p>A circle has a diameter of 10. Find its area.</p><p>Radius = 5, A = π(5)² = 25π.</p><p>Answer: 25π</p>" },
            { type: "question", title: "Question 2", question: "A circle has a diameter of 8. What is its area?", options: [{ text: "A) 16π", correct: true }, { text: "B) 64π", correct: false }, { text: "C) 8π", correct: false }, { text: "D) 32π", correct: false }], explanation: "Radius = 4, A = π(4)² = 16π." },
            { type: "example", content: "<h2>Example 3: Arc Length</h2><p>A circle has radius 6 and a 60° central angle. Find the arc length.</p><p>L = (60/360) × 2π(6) = 2π.</p><p>Answer: 2π</p>" },
            { type: "question", title: "Question 3", question: "A circle has a radius of 5 and a 90° central angle. What is the arc length?", options: [{ text: "A) 2.5π", correct: true }, { text: "B) 5π", correct: false }, { text: "C) 10π", correct: false }, { text: "D) 1.25π", correct: false }], explanation: "L = (90/360) × 2π(5) = 2.5π." },
            { type: "example", content: "<h2>Example 4: Sector Area</h2><p>A circle has radius 4 and a 90° angle. Find the sector area.</p><p>A = (90/360) × π(4)² = 4π.</p><p>Answer: 4π</p>" },
            { type: "question", title: "Question 4", question: "A circle’s area is 36π. What is its radius?", options: [{ text: "A) 6", correct: true }, { text: "B) 12", correct: false }, { text: "C) 3", correct: false }, { text: "D) 9", correct: false }], explanation: "πr² = 36π → r² = 36 → r = 6." },
            { type: "example", content: "<h2>Example 5: Diameter</h2><p>A circle’s circumference is 10π. Find its diameter.</p><p>C = πd, 10π = πd, d = 10.</p><p>Answer: 10</p>" },
            { type: "question", title: "Question 5", question: "A circle’s circumference is 18π. What is its radius?", options: [{ text: "A) 9", correct: true }, { text: "B) 18", correct: false }, { text: "C) 6", correct: false }, { text: "D) 12", correct: false }], explanation: "C = 2πr, 18π = 2πr, r = 9." },
            { type: "example", content: "<h2>Example 6: Area from Radius</h2><p>A circle has radius 2. Find its area.</p><p>A = π(2)² = 4π.</p><p>Answer: 4π</p>" },
            { type: "question", title: "Question 6", question: "A sector has radius 8 and central angle 45°. What is the arc length?", options: [{ text: "A) 2π", correct: true }, { text: "B) 4π", correct: false }, { text: "C) 8π", correct: false }, { text: "D) 1π", correct: false }], explanation: "L = (45/360) × 2π(8) = 2π." },
            { type: "example", content: "<h2>Example 7: Radius from Area</h2><p>A circle’s area is 9π. Find its radius.</p><p>πr² = 9π, r² = 9, r = 3.</p><p>Answer: 3</p>" },
            { type: "question", title: "Question 7", question: "A circle has radius 10 and a 180° central angle. What is the sector area?", options: [{ text: "A) 50π", correct: true }, { text: "B) 100π", correct: false }, { text: "C) 25π", correct: false }, { text: "D) 10π", correct: false }], explanation: "A = (180/360) × π(10)² = 50π." }
        ]
    },
    5: {
        title: "Coordinate geometry-and-trigonometry",
        content: [
            { type: "example", content: "<h2>Example 1: Distance</h2><p>Find the distance between (2, 3) and (5, 7).</p><p>d = √((5 - 2)² + (7 - 3)²) = √(9 + 16) = 5.</p><p>Answer: 5</p>" },
            { type: "question", title: "Question 1", question: "What is the distance between (0, 0) and (3, 4)?", options: [{ text: "A) 5", correct: true }, { text: "B) 4", correct: false }, { text: "C) 3", correct: false }, { text: "D) 6", correct: false }], explanation: "d = √(3² + 4²) = √25 = 5." },
            { type: "example", content: "<h2>Example 2: Midpoint</h2><p>Find the midpoint of (1, 2) and (3, 4).</p><p>M = ((1 + 3)/2, (2 + 4)/2) = (2, 3).</p><p>Answer: (2, 3)</p>" },
            { type: "question", title: "Question 2", question: "What is the midpoint of (-2, 1) and (4, 5)?", options: [{ text: "A) (1, 3)", correct: true }, { text: "B) (0, 2)", correct: false }, { text: "C) (2, 4)", correct: false }, { text: "D) (-1, 2)", correct: false }], explanation: "M = ((-2 + 4)/2, (1 + 5)/2) = (1, 3)." },
            { type: "example", content: "<h2>Example 3: Slope</h2><p>Find the slope between (2, 1) and (5, 7).</p><p>m = (7 - 1) / (5 - 2) = 6 / 3 = 2.</p><p>Answer: 2</p>" },
            { type: "question", title: "Question 3", question: "What is the slope of the line through (-1, 2) and (3, -2)?", options: [{ text: "A) -1", correct: true }, { text: "B) 1", correct: false }, { text: "C) 0", correct: false }, { text: "D) -2", correct: false }], explanation: "m = (-2 - 2) / (3 - (-1)) = -4 / 4 = -1." },
            { type: "example", content: "<h2>Example 4: Perpendicular Slope</h2><p>A line has slope 3. Find the slope of a perpendicular line.</p><p>Perpendicular slope = -1/3.</p><p>Answer: -1/3</p>" },
            { type: "question", title: "Question 4", question: "What is the slope of a line perpendicular to y = -4x + 2?", options: [{ text: "A) 1/4", correct: true }, { text: "B) -4", correct: false }, { text: "C) 4", correct: false }, { text: "D) -1/4", correct: false }], explanation: "Slope = -4, perpendicular slope = 1/4." },
            { type: "example", content: "<h2>Example 5: Line Equation</h2><p>A line has slope 2 and passes through (1, 1). Find y when x = 3.</p><p>y - 1 = 2(x - 1), y = 2x - 1, y = 5.</p><p>Answer: 5</p>" },
            { type: "question", title: "Question 5", question: "What is the distance between (-3, -2) and (1, 1)?", options: [{ text: "A) 5", correct: true }, { text: "B) 4", correct: false }, { text: "C) 6", correct: false }, { text: "D) 3", correct: false }], explanation: "d = √((1 - (-3))² + (1 - (-2))²) = √(16 + 9) = 5." },
            { type: "example", content: "<h2>Example 6: Midpoint</h2><p>Find the midpoint of (-4, 2) and (2, -6).</p><p>M = ((-4 + 2)/2, (2 + (-6))/2) = (-1, -2).</p><p>Answer: (-1, -2)</p>" },
            { type: "question", title: "Question 6", question: "A line has slope -2 and passes through (0, 3). What is y when x = 2?", options: [{ text: "A) -1", correct: true }, { text: "B) 1", correct: false }, { text: "C) 3", correct: false }, { text: "D) -3", correct: false }], explanation: "y = -2x + 3, at x = 2: y = -4 + 3 = -1." },
            { type: "example", content: "<h2>Example 7: Distance</h2><p>Find the distance between (0, 5) and (5, 0).</p><p>d = √((5 - 0)² + (0 - 5)²) = √(25 + 25) = 5√2.</p><p>Answer: 5√2</p>" },
            { type: "question", title: "Question 7", question: "What is the slope of a line parallel to y = 3x - 5?", options: [{ text: "A) 3", correct: true }, { text: "B) -3", correct: false }, { text: "C) 1/3", correct: false }, { text: "D) -1/3", correct: false }], explanation: "Parallel lines have the same slope. Thus, it’s 3." }
        ]
    },
    6: {
        title: "3D geometry-and-trigonometry (Solids)",
        content: [
            { type: "example", content: "<h2>Example 1: Cube Volume</h2><p>A cube has a side length of 4. Find its volume.</p><p>V = 4³ = 64.</p><p>Answer: 64</p>" },
            { type: "question", title: "Question 1", question: "What is the volume of a sphere with radius 3?", options: [{ text: "A) 36π", correct: true }, { text: "B) 27π", correct: false }, { text: "C) 9π", correct: false }, { text: "D) 108π", correct: false }], explanation: "V = (4/3)π(3)³ = 36π." },
            { type: "example", content: "<h2>Example 2: Cylinder SA</h2><p>A cylinder has radius 3 and height 5. Find its surface area.</p><p>SA = 2π(3)² + 2π(3)(5) = 18π + 30π = 48π.</p><p>Answer: 48π</p>" },
            { type: "question", title: "Question 2", question: "A rectangular prism has dimensions 2, 3, and 4. What is its volume?", options: [{ text: "A) 24", correct: true }, { text: "B) 20", correct: false }, { text: "C) 30", correct: false }, { text: "D) 18", correct: false }], explanation: "V = 2 × 3 × 4 = 24." },
            { type: "example", content: "<h2>Example 3: Cone Volume</h2><p>A cone has radius 2 and height 6. Find its volume.</p><p>V = (1/3)π(2)²(6) = 8π.</p><p>Answer: 8π</p>" },
            { type: "question", title: "Question 3", question: "A cylinder has radius 4 and height 7. What is its volume?", options: [{ text: "A) 112π", correct: true }, { text: "B) 56π", correct: false }, { text: "C) 28π", correct: false }, { text: "D) 16π", correct: false }], explanation: "V = π(4)²(7) = 112π." },
            { type: "example", content: "<h2>Example 4: Prism SA</h2><p>A rectangular prism has dimensions 3, 4, 5. Find its surface area.</p><p>SA = 2(3×4 + 3×5 + 4×5) = 2(12 + 15 + 20) = 94.</p><p>Answer: 94</p>" },
            { type: "question", title: "Question 4", question: "A cube has a side length of 6. What is its surface area?", options: [{ text: "A) 216", correct: true }, { text: "B) 36", correct: false }, { text: "C) 144", correct: false }, { text: "D) 108", correct: false }], explanation: "SA = 6(6)² = 216." },
            { type: "example", content: "<h2>Example 5: Sphere Volume</h2><p>A sphere has radius 1. Find its volume.</p><p>V = (4/3)π(1)³ = (4/3)π.</p><p>Answer: (4/3)π</p>" },
            { type: "question", title: "Question 5", question: "A cone has radius 5 and height 12. What is its volume?", options: [{ text: "A) 100π", correct: true }, { text: "B) 300π", correct: false }, { text: "C) 60π", correct: false }, { text: "D) 25π", correct: false }], explanation: "V = (1/3)π(5)²(12) = 100π." },
            { type: "example", content: "<h2>Example 6: Cylinder Volume</h2><p>A cylinder has radius 2 and height 3. Find its volume.</p><p>V = π(2)²(3) = 12π.</p><p>Answer: 12π</p>" },
            { type: "question", title: "Question 6", question: "A sphere has a volume of 288π. What is its radius?", options: [{ text: "A) 6", correct: true }, { text: "B) 12", correct: false }, { text: "C) 3", correct: false }, { text: "D) 9", correct: false }], explanation: "(4/3)πr³ = 288π → r³ = 216 → r = 6." },
            { type: "example", content: "<h2>Example 7: Cube SA</h2><p>A cube has a volume of 8. Find its surface area.</p><p>V = s³ = 8, s = 2, SA = 6(2)² = 24.</p><p>Answer: 24</p>" },
            { type: "question", title: "Question 7", question: "A rectangular prism has dimensions 1, 2, 3. What is its surface area?", options: [{ text: "A) 22", correct: true }, { text: "B) 24", correct: false }, { text: "C) 18", correct: false }, { text: "D) 26", correct: false }], explanation: "SA = 2(1×2 + 1×3 + 2×3) = 2(2 + 3 + 6) = 22." }
        ]
    },
    7: {
        title: "Transformations",
        content: [
            { type: "example", content: "<h2>Example 1: Translation</h2><p>Translate (3, 4) by (2, -1).</p><p>(3 + 2, 4 - 1) = (5, 3).</p><p>Answer: (5, 3)</p>" },
            { type: "question", title: "Question 1", question: "Translate (1, 5) by (-3, 2). What are the new coordinates?", options: [{ text: "A) (-2, 7)", correct: true }, { text: "B) (4, 3)", correct: false }, { text: "C) (1, 7)", correct: false }, { text: "D) (-2, 3)", correct: false }], explanation: "(1 - 3, 5 + 2) = (-2, 7)." },
            { type: "example", content: "<h2>Example 2: Reflection</h2><p>Reflect (2, 3) over the x-axis.</p><p>(x, y) → (x, -y), (2, 3) → (2, -3).</p><p>Answer: (2, -3)</p>" },
            { type: "question", title: "Question 2", question: "Reflect (4, -1) over the y-axis. What are the new coordinates?", options: [{ text: "A) (-4, -1)", correct: true }, { text: "B) (4, 1)", correct: false }, { text: "C) (-4, 1)", correct: false }, { text: "D) (1, -4)", correct: false }], explanation: "(x, y) → (-x, y), (4, -1) → (-4, -1)." },
            { type: "example", content: "<h2>Example 3: Rotation</h2><p>Rotate (1, 0) 90° counterclockwise around the origin.</p><p>(x, y) → (-y, x), (1, 0) → (0, 1).</p><p>Answer: (0, 1)</p>" },
            { type: "question", title: "Question 3", question: "Rotate (0, 2) 180° around the origin. What are the new coordinates?", options: [{ text: "A) (0, -2)", correct: true }, { text: "B) (2, 0)", correct: false }, { text: "C) (-2, 0)", correct: false }, { text: "D) (0, 2)", correct: false }], explanation: "(x, y) → (-x, -y), (0, 2) → (0, -2)." },
            { type: "example", content: "<h2>Example 4: Reflection</h2><p>Reflect (-3, 2) over the y-axis.</p><p>(x, y) → (-x, y), (-3, 2) → (3, 2).</p><p>Answer: (3, 2)</p>" },
            { type: "question", title: "Question 4", question: "Translate (-2, -3) by (4, 1). What are the new coordinates?", options: [{ text: "A) (2, -2)", correct: true }, { text: "B) (-6, -4)", correct: false }, { text: "C) (2, -3)", correct: false }, { text: "D) (-2, 1)", correct: false }], explanation: "(-2 + 4, -3 + 1) = (2, -2)." },
            { type: "example", content: "<h2>Example 5: Rotation</h2><p>Rotate (2, 0) 180° around the origin.</p><p>(x, y) → (-x, -y), (2, 0) → (-2, 0).</p><p>Answer: (-2, 0)</p>" },
            { type: "question", title: "Question 5", question: "Reflect (1, 4) over the x-axis. What are the new coordinates?", options: [{ text: "A) (1, -4)", correct: true }, { text: "B) (-1, 4)", correct: false }, { text: "C) (4, 1)", correct: false }, { text: "D) (-1, -4)", correct: false }], explanation: "(x, y) → (x, -y), (1, 4) → (1, -4)." },
            { type: "example", content: "<h2>Example 6: Translation</h2><p>Translate (0, 5) by (-2, -3).</p><p>(0 - 2, 5 - 3) = (-2, 2).</p><p>Answer: (-2, 2)</p>" },
            { type: "question", title: "Question 6", question: "Rotate (3, 0) 90° clockwise around the origin. What are the new coordinates?", options: [{ text: "A) (0, -3)", correct: true }, { text: "B) (0, 3)", correct: false }, { text: "C) (-3, 0)", correct: false }, { text: "D) (3, 0)", correct: false }], explanation: "90° CW: (x, y) → (y, -x), (3, 0) → (0, -3)." },
            { type: "example", content: "<h2>Example 7: Rotation</h2><p>Rotate (2, 2) 270° counterclockwise around the origin.</p><p>(x, y) → (y, -x), (2, 2) → (-2, 2).</p><p>Answer: (-2, 2)</p>" },
            { type: "question", title: "Question 7", question: "Reflect (-5, 3) over the line y = x. What are the new coordinates?", options: [{ text: "A) (3, -5)", correct: true }, { text: "B) (-5, -3)", correct: false }, { text: "C) (5, -3)", correct: false }, { text: "D) (-3, 5)", correct: false }], explanation: "Over y = x: (x, y) → (y, x), (-5, 3) → (3, -5)." }
        ]
    },
    8: {
        title: "Trigonometry (Basic Concepts)",
        content: [
            { type: "example", content: "<h2>Example 1: Sine</h2><p>In a right triangle, opposite = 3, hypotenuse = 5. Find sin(θ).</p><p>sin(θ) = 3 / 5 = 0.6.</p><p>Answer: 0.6</p>" },
            { type: "question", title: "Question 1", question: "In a right triangle, opposite = 6, hypotenuse = 10. What is sin(θ)?", options: [{ text: "A) 0.6", correct: true }, { text: "B) 0.8", correct: false }, { text: "C) 0.4", correct: false }, { text: "D) 1", correct: false }], explanation: "sin(θ) = 6 / 10 = 0.6." },
            { type: "example", content: "<h2>Example 2: Cosine</h2><p>In a right triangle, adjacent = 4, hypotenuse = 5. Find cos(θ).</p><p>cos(θ) = 4 / 5 = 0.8.</p><p>Answer: 0.8</p>" },
            { type: "question", title: "Question 2", question: "In a right triangle, adjacent = 8, hypotenuse = 10. What is cos(θ)?", options: [{ text: "A) 0.8", correct: true }, { text: "B) 0.6", correct: false }, { text: "C) 1", correct: false }, { text: "D) 0.4", correct: false }], explanation: "cos(θ) = 8 / 10 = 0.8." },
            { type: "example", content: "<h2>Example 3: Tangent</h2><p>In a right triangle, opposite = 3, adjacent = 4. Find tan(θ).</p><p>tan(θ) = 3 / 4 = 0.75.</p><p>Answer: 0.75</p>" },
            { type: "question", title: "Question 3", question: "In a right triangle, opposite = 5, adjacent = 12. What is tan(θ)?", options: [{ text: "A) 5/12", correct: true }, { text: "B) 12/5", correct: false }, { text: "C) 5/13", correct: false }, { text: "D) 12/13", correct: false }], explanation: "tan(θ) = 5 / 12." },
            { type: "example", content: "<h2>Example 4: Sine from Cosine</h2><p>If cos(θ) = 3/5, find sin(θ).</p><p>Hyp = 5, adj = 3, opp = √(5² - 3²) = 4, sin(θ) = 4/5.</p><p>Answer: 0.8</p>" },
            { type: "question", title: "Question 4", question: "If sin(θ) = 8/17, what is cos(θ)?", options: [{ text: "A) 15/17", correct: true }, { text: "B) 17/8", correct: false }, { text: "C) 8/15", correct: false }, { text: "D) 17/15", correct: false }], explanation: "Hyp = 17, opp = 8, adj = √(17² - 8²) = 15, cos(θ) = 15/17." },
            { type: "example", content: "<h2>Example 5: Tangent from Sine</h2><p>If sin(θ) = 5/13, adj = 12, find tan(θ).</p><p>tan(θ) = 5 / 12.</p><p>Answer: 5/12</p>" },
            { type: "question", title: "Question 5", question: "In a 3-4-5 triangle, what is sin(θ) for the angle opposite 4?", options: [{ text: "A) 4/5", correct: true }, { text: "B) 3/5", correct: false }, { text: "C) 3/4", correct: false }, { text: "D) 5/4", correct: false }], explanation: "sin(θ) = opp / hyp = 4 / 5." },
            { type: "example", content: "<h2>Example 6: Cosine from Tangent</h2><p>If tan(θ) = 15/8, find cos(θ).</p><p>Opp = 15, adj = 8, hyp = √(15² + 8²) = 17, cos(θ) = 8/17.</p><p>Answer: 8/17</p>" },
            { type: "question", title: "Question 6", question: "If tan(θ) = 7/24, what is sin(θ)?", options: [{ text: "A) 7/25", correct: true }, { text: "B) 24/25", correct: false }, { text: "C) 7/24", correct: false }, { text: "D) 24/7", correct: false }], explanation: "Opp = 7, adj = 24, hyp = √(7² + 24²) = 25, sin(θ) = 7/25." },
            { type: "example", content: "<h2>Example 7: Angle from Tangent</h2><p>If tan(θ) = 1, find θ.</p><p>tan(θ) = 1 when opp = adj, θ = 45°.</p><p>Answer: 45°</p>" },
            { type: "question", title: "Question 7", question: "In a right triangle, adjacent = 5, hypotenuse = 13. What is sin(θ)?", options: [{ text: "A) 12/13", correct: true }, { text: "B) 5/13", correct: false }, { text: "C) 13/12", correct: false }, { text: "D) 5/12", correct: false }], explanation: "Adj = 5, hyp = 13, opp = √(13² - 5²) = 12, sin(θ) = 12/13." }
        ]
    }
};

// geometry-and-trigonometry question arrays
// geometry-and-trigonometry question arrays
const linesAnglesQuestions = [
    { question: "Two angles are supplementary, and one is 75°. What is the other angle?", 
        answers: [{ text: "A) 105°", correct: true }, { text: "B) 115°", correct: false }, { text: "C) 95°", correct: false }, { text: "D) 85°", correct: false }], 
        explanation: "Supplementary angles sum to 180°. 180° - 75° = 105°.", 
        difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "Two angles are complementary, and one is 40°. What is the other angle?", 
        answers: [{ text: "A) 50°", correct: true }, { text: "B) 60°", correct: false }, { text: "C) 40°", correct: false }, { text: "D) 30°", correct: false }], explanation: "Complementary angles sum to 90°. 90° - 40° = 50°.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "If two parallel lines are cut by a transversal and a corresponding angle is 80°, what is another corresponding angle?", answers: [{ text: "A) 80°", correct: true }, { text: "B) 100°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 110°", correct: false }], explanation: "Corresponding angles are equal. Thus, it’s 80°.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "Vertical angles are formed by two intersecting lines. If one is 65°, what is the other?", answers: [{ text: "A) 65°", correct: true }, { text: "B) 115°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 25°", correct: false }], explanation: "Vertical angles are equal. Thus, it’s 65°.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "If two parallel lines are cut by a transversal and an alternate interior angle is 120°, what is the other?", answers: [{ text: "A) 120°", correct: true }, { text: "B) 60°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 180°", correct: false }], explanation: "Alternate interior angles are equal. Thus, it’s 120°.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "An angle is 3 times its supplement. What is the angle?", answers: [{ text: "A) 135°", correct: true }, { text: "B) 45°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 60°", correct: false }], explanation: "Let angle = x, supplement = 180° - x. Then, x = 3(180° - x), x = 540° - 3x, 4x = 540°, x = 135°.", difficulty: "hard", category: "geometry-and-trigonometry" },
    { question: "If a transversal crosses parallel lines and a same-side interior angle is 130°, what is the other?", answers: [{ text: "A) 50°", correct: true }, { text: "B) 130°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 180°", correct: false }], explanation: "Same-side interior angles sum to 180°. 180° - 130° = 50°.", difficulty: "medium", category: "geometry-and-trigonometry" }
];

const trianglesQuestions = [
    { question: "In a triangle, two angles are 30° and 70°. What is the third angle?", answers: [{ text: "A) 80°", correct: true }, { text: "B) 90°", correct: false }, { text: "C) 70°", correct: false }, { text: "D) 60°", correct: false }], explanation: "180° - (30° + 70°) = 80°.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "In a right triangle, one leg is 5 and the hypotenuse is 13. What is the other leg?", answers: [{ text: "A) 12", correct: true }, { text: "B) 10", correct: false }, { text: "C) 8", correct: false }, { text: "D) 6", correct: false }], explanation: "5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "An isosceles triangle has a base angle of 70°. What is the vertex angle?", answers: [{ text: "A) 40°", correct: true }, { text: "B) 70°", correct: false }, { text: "C) 110°", correct: false }, { text: "D) 50°", correct: false }], explanation: "Base angles are equal, so 180° - (70° + 70°) = 40°.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "In a triangle, angles are in the ratio 1:2:3. What is the largest angle?", answers: [{ text: "A) 90°", correct: true }, { text: "B) 60°", correct: false }, { text: "C) 120°", correct: false }, { text: "D) 45°", correct: false }], explanation: "1x + 2x + 3x = 180°, 6x = 180°, x = 30°, largest = 3x = 90°.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A triangle has sides 7, 8, and 10. Is it a right triangle?", answers: [{ text: "A) No", correct: true }, { text: "B) Yes", correct: false }, { text: "C) Maybe", correct: false }, { text: "D) Not enough info", correct: false }], explanation: "7² + 8² = 49 + 64 = 113 ≠ 100 = 10².", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "In an equilateral triangle, what is each angle?", answers: [{ text: "A) 60°", correct: true }, { text: "B) 90°", correct: false }, { text: "C) 45°", correct: false }, { text: "D) 120°", correct: false }], explanation: "All angles are equal, 180° ÷ 3 = 60°.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "A right triangle has legs 9 and 12. What is the hypotenuse?", answers: [{ text: "A) 15", correct: true }, { text: "B) 13", correct: false }, { text: "C) 10", correct: false }, { text: "D) 18", correct: false }], explanation: "9² + 12² = 81 + 144 = 225 → √225 = 15.", difficulty: "hard", category: "geometry-and-trigonometry" }
];

const quadrilateralsPolygonsQuestions = [
    { question: "What is the sum of interior angles in an octagon?", answers: [{ text: "A) 1080°", correct: true }, { text: "B) 900°", correct: false }, { text: "C) 720°", correct: false }, { text: "D) 1260°", correct: false }], explanation: "(8 - 2) × 180° = 6 × 180° = 1080°.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A rectangle has sides 9 and 12. What is its diagonal?", answers: [{ text: "A) 15", correct: true }, { text: "B) 13", correct: false }, { text: "C) 10", correct: false }, { text: "D) 18", correct: false }], explanation: "d² = 9² + 12² = 81 + 144 = 225 → d = 15.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "In a parallelogram, one angle is 80°. What is an adjacent angle?", answers: [{ text: "A) 100°", correct: true }, { text: "B) 80°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 110°", correct: false }], explanation: "Adjacent angles are supplementary: 180° - 80° = 100°.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "What is the sum of interior angles in a quadrilateral?", answers: [{ text: "A) 360°", correct: true }, { text: "B) 180°", correct: false }, { text: "C) 540°", correct: false }, { text: "D) 720°", correct: false }], explanation: "(4 - 2) × 180° = 360°.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "A square has a side of 6. What is its diagonal?", answers: [{ text: "A) 6√2", correct: true }, { text: "B) 6", correct: false }, { text: "C) 12", correct: false }, { text: "D) 9", correct: false }], explanation: "d² = 6² + 6² = 72 → d = √72 = 6√2.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "In a regular hexagon, what is each interior angle?", answers: [{ text: "A) 120°", correct: true }, { text: "B) 90°", correct: false }, { text: "C) 135°", correct: false }, { text: "D) 108°", correct: false }], explanation: "(6 - 2) × 180° = 720°, 720° ÷ 6 = 120°.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A rhombus has a diagonal of 10 and a side of 13. What is the other diagonal?", answers: [{ text: "A) 24", correct: true }, { text: "B) 12", correct: false }, { text: "C) 15", correct: false }, { text: "D) 20", correct: false }], explanation: "Half diagonals form right triangle with side: 5² + b² = 13² → 25 + b² = 169 → b = 12, full diagonal = 24.", difficulty: "hard", category: "geometry-and-trigonometry" }
];

const circlesQuestions = [
    { question: "A circle has a radius of 5. What is its area?", answers: [{ text: "A) 25π", correct: true }, { text: "B) 20π", correct: false }, { text: "C) 15π", correct: false }, { text: "D) 10π", correct: false }], explanation: "A = π(5)² = 25π.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "A circle has a diameter of 12. What is its circumference?", answers: [{ text: "A) 12π", correct: true }, { text: "B) 6π", correct: false }, { text: "C) 24π", correct: false }, { text: "D) 36π", correct: false }], explanation: "C = πd = 12π.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "A circle has a radius of 3. What is its circumference?", answers: [{ text: "A) 6π", correct: true }, { text: "B) 9π", correct: false }, { text: "C) 3π", correct: false }, { text: "D) 12π", correct: false }], explanation: "C = 2π(3) = 6π.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "A circle’s area is 16π. What is its radius?", answers: [{ text: "A) 4", correct: true }, { text: "B) 8", correct: false }, { text: "C) 2", correct: false }, { text: "D) 16", correct: false }], explanation: "πr² = 16π → r² = 16 → r = 4.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A circle has a radius of 10 and a central angle of 90°. What is the arc length?", answers: [{ text: "A) 5π", correct: true }, { text: "B) 10π", correct: false }, { text: "C) 2.5π", correct: false }, { text: "D) 20π", correct: false }], explanation: "L = (90/360) × 2π(10) = (1/4) × 20π = 5π.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A sector has a radius of 6 and an area of 12π. What is the central angle?", answers: [{ text: "A) 120°", correct: true }, { text: "B) 60°", correct: false }, { text: "C) 90°", correct: false }, { text: "D) 180°", correct: false }], explanation: "Area = (θ/360) × π(6)² = 12π → (θ/360) × 36π = 12π → θ = 120°.", difficulty: "hard", category: "geometry-and-trigonometry" },
    { question: "A circle’s circumference is 8π. What is its area?", answers: [{ text: "A) 16π", correct: true }, { text: "B) 8π", correct: false }, { text: "C) 4π", correct: false }, { text: "D) 64π", correct: false }], explanation: "C = 2πr = 8π → r = 4, A = π(4)² = 16π.", difficulty: "medium", category: "geometry-and-trigonometry" }
];

const coordinategeometryQuestions = [
    { question: "What is the distance between (1, 2) and (4, 6)?", answers: [{ text: "A) 5", correct: true }, { text: "B) 4", correct: false }, { text: "C) 3", correct: false }, { text: "D) 6", correct: false }], explanation: "d = √((4 - 1)² + (6 - 2)²) = √(3² + 4²) = √25 = 5.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "What is the midpoint of (2, 3) and (6, 7)?", answers: [{ text: "A) (4, 5)", correct: true }, { text: "B) (2, 5)", correct: false }, { text: "C) (6, 3)", correct: false }, { text: "D) (3, 4)", correct: false }], explanation: "M = ((2 + 6)/2, (3 + 7)/2) = (4, 5).", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "What is the slope of the line through (1, 1) and (3, 5)?", answers: [{ text: "A) 2", correct: true }, { text: "B) 1", correct: false }, { text: "C) 3", correct: false }, { text: "D) 0", correct: false }], explanation: "m = (5 - 1) / (3 - 1) = 4 / 2 = 2.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "What is the distance between (-2, 3) and (1, -1)?", answers: [{ text: "A) 5", correct: true }, { text: "B) 4", correct: false }, { text: "C) 6", correct: false }, { text: "D) 3", correct: false }], explanation: "d = √((1 - (-2))² + (-1 - 3)²) = √(3² + (-4)²) = √25 = 5.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A line has slope 3 and passes through (1, 2). What is the y-coordinate at x = 3?", answers: [{ text: "A) 8", correct: true }, { text: "B) 6", correct: false }, { text: "C) 5", correct: false }, { text: "D) 10", correct: false }], explanation: "y - 2 = 3(x - 1) → y = 3x - 1, at x = 3: y = 9 - 1 = 8.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "What is the slope of a line perpendicular to y = 2x + 1?", answers: [{ text: "A) -1/2", correct: true }, { text: "B) 2", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) -2", correct: false }], explanation: "Slope = 2, perpendicular slope = -1/2.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "What is the midpoint of (-4, -2) and (2, 6)?", answers: [{ text: "A) (-1, 2)", correct: true }, { text: "B) (0, 0)", correct: false }, { text: "C) (-2, 4)", correct: false }, { text: "D) (1, 3)", correct: false }], explanation: "M = ((-4 + 2)/2, (-2 + 6)/2) = (-1, 2).", difficulty: "hard", category: "geometry-and-trigonometry" }
];

const threeDgeometryQuestions = [
    { question: "What is the volume of a cube with side length 5?", answers: [{ text: "A) 125", correct: true }, { text: "B) 100", correct: false }, { text: "C) 150", correct: false }, { text: "D) 75", correct: false }], explanation: "V = 5³ = 125.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "A cylinder has radius 3 and height 4. What is its volume?", answers: [{ text: "A) 36π", correct: true }, { text: "B) 12π", correct: false }, { text: "C) 48π", correct: false }, { text: "D) 24π", correct: false }], explanation: "V = π(3)²(4) = 36π.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "A sphere has radius 2. What is its volume?", answers: [{ text: "A) (32/3)π", correct: true }, { text: "B) 8π", correct: false }, { text: "C) 16π", correct: false }, { text: "D) 4π", correct: false }], explanation: "V = (4/3)π(2)³ = (4/3)π(8) = (32/3)π.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A rectangular prism has dimensions 3, 4, 5. What is its surface area?", answers: [{ text: "A) 94", correct: true }, { text: "B) 60", correct: false }, { text: "C) 120", correct: false }, { text: "D) 80", correct: false }], explanation: "SA = 2(3×4 + 3×5 + 4×5) = 2(12 + 15 + 20) = 94.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A cone has radius 3 and height 8. What is its volume?", answers: [{ text: "A) 24π", correct: true }, { text: "B) 72π", correct: false }, { text: "C) 12π", correct: false }, { text: "D) 36π", correct: false }], explanation: "V = (1/3)π(3)²(8) = 24π.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "A cylinder has a volume of 100π and height 4. What is its radius?", answers: [{ text: "A) 5", correct: true }, { text: "B) 4", correct: false }, { text: "C) 6", correct: false }, { text: "D) 10", correct: false }], explanation: "πr²(4) = 100π → r² = 25 → r = 5.", difficulty: "hard", category: "geometry-and-trigonometry" },
    { question: "A cube has a volume of 27. What is its surface area?", answers: [{ text: "A) 54", correct: true }, { text: "B) 36", correct: false }, { text: "C) 18", correct: false }, { text: "D) 72", correct: false }], explanation: "V = s³ = 27 → s = 3, SA = 6s² = 6(9) = 54.", difficulty: "medium", category: "geometry-and-trigonometry" }
];

const transformationsQuestions = [
    { question: "Reflect (3, 2) over the x-axis. What are the new coordinates?", answers: [{ text: "A) (3, -2)", correct: true }, { text: "B) (-3, 2)", correct: false }, { text: "C) (2, 3)", correct: false }, { text: "D) (-3, -2)", correct: false }], explanation: "Over x-axis: (x, y) → (x, -y). So, (3, 2) → (3, -2).", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "Translate (2, 4) by (-1, 3). What are the new coordinates?", answers: [{ text: "A) (1, 7)", correct: true }, { text: "B) (3, 1)", correct: false }, { text: "C) (2, 7)", correct: false }, { text: "D) (1, 4)", correct: false }], explanation: "(2 - 1, 4 + 3) = (1, 7).", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "Rotate (1, 0) 90° counterclockwise around the origin. What are the new coordinates?", answers: [{ text: "A) (0, 1)", correct: true }, { text: "B) (-1, 0)", correct: false }, { text: "C) (0, -1)", correct: false }, { text: "D) (1, 0)", correct: false }], explanation: "90° CCW: (x, y) → (-y, x). So, (1, 0) → (0, 1).", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "Reflect (-2, 3) over the y-axis. What are the new coordinates?", answers: [{ text: "A) (2, 3)", correct: true }, { text: "B) (-2, -3)", correct: false }, { text: "C) (2, -3)", correct: false }, { text: "D) (-3, 2)", correct: false }], explanation: "Over y-axis: (x, y) → (-x, y). So, (-2, 3) → (2, 3).", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "Rotate (0, 2) 180° around the origin. What are the new coordinates?", answers: [{ text: "A) (0, -2)", correct: true }, { text: "B) (2, 0)", correct: false }, { text: "C) (-2, 0)", correct: false }, { text: "D) (0, 2)", correct: false }], explanation: "180°: (x, y) → (-x, -y). So, (0, 2) → (0, -2).", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "Translate (5, -1) by (2, -3). What are the new coordinates?", answers: [{ text: "A) (7, -4)", correct: true }, { text: "B) (3, 2)", correct: false }, { text: "C) (7, -1)", correct: false }, { text: "D) (5, -4)", correct: false }], explanation: "(5 + 2, -1 - 3) = (7, -4).", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "Rotate (2, 2) 270° counterclockwise around the origin. What are the new coordinates?", answers: [{ text: "A) (-2, 2)", correct: true }, { text: "B) (2, -2)", correct: false }, { text: "C) (-2, -2)", correct: false }, { text: "D) (2, 2)", correct: false }], explanation: "270° CCW: (x, y) → (y, -x). So, (2, 2) → (-2, 2).", difficulty: "hard", category: "geometry-and-trigonometry" }
];

const trigonometryQuestions = [
    { question: "In a right triangle, the opposite side is 8 and the hypotenuse is 17. What is sin(θ)?", answers: [{ text: "A) 8/17", correct: true }, { text: "B) 17/8", correct: false }, { text: "C) 15/17", correct: false }, { text: "D) 8/15", correct: false }], explanation: "sin(θ) = opposite / hypotenuse = 8 / 17.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "In a right triangle, the adjacent side is 3 and the hypotenuse is 5. What is cos(θ)?", answers: [{ text: "A) 3/5", correct: true }, { text: "B) 5/3", correct: false }, { text: "C) 4/5", correct: false }, { text: "D) 3/4", correct: false }], explanation: "cos(θ) = adjacent / hypotenuse = 3 / 5.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "In a right triangle, the opposite side is 6 and the adjacent side is 8. What is tan(θ)?", answers: [{ text: "A) 3/4", correct: true }, { text: "B) 4/3", correct: false }, { text: "C) 6/10", correct: false }, { text: "D) 8/6", correct: false }], explanation: "tan(θ) = opposite / adjacent = 6 / 8 = 3/4.", difficulty: "easy", category: "geometry-and-trigonometry" },
    { question: "If sin(θ) = 12/13 and θ is acute, what is cos(θ)?", answers: [{ text: "A) 5/13", correct: true }, { text: "B) 13/12", correct: false }, { text: "C) 12/5", correct: false }, { text: "D) 5/12", correct: false }], explanation: "Hyp = 13, opp = 12, adj = √(13² - 12²) = 5, cos(θ) = 5/13.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "In a 3-4-5 triangle, what is tan(θ) for the angle opposite the side of 3?", answers: [{ text: "A) 3/4", correct: true }, { text: "B) 4/3", correct: false }, { text: "C) 3/5", correct: false }, { text: "D) 5/4", correct: false }], explanation: "tan(θ) = opp / adj = 3 / 4.", difficulty: "medium", category: "geometry-and-trigonometry" },
    { question: "If cos(θ) = 8/17, what is sin(θ)?", answers: [{ text: "A) 15/17", correct: true }, { text: "B) 17/8", correct: false }, { text: "C) 8/15", correct: false }, { text: "D) 15/8", correct: false }], explanation: "Hyp = 17, adj = 8, opp = √(17² - 8²) = 15, sin(θ) = 15/17.", difficulty: "hard", category: "geometry-and-trigonometry" },
    { question: "In a right triangle, tan(θ) = 1. What is θ?", answers: [{ text: "A) 45°", correct: true }, { text: "B) 30°", correct: false }, { text: "C) 60°", correct: false }, { text: "D) 90°", correct: false }], explanation: "tan(θ) = 1 when opp = adj, so θ = 45°.", difficulty: "medium", category: "geometry-and-trigonometry" }
];


// lesson-geometry-and-trigonometry.js

// lesson-geometry.js

let categoryStats = {
    "geometry-and-trigonometry": { correct: 0, incorrect: 0 }
};

let currentItemIndex = 0; // For lesson content
let currentQuestionIndex = 0; // For quiz questions
let currentLesson = 1;
let progressSteps = 0;
let totalSteps = 0; // Set dynamically in startLesson
let isQuizPhase = false;
let showingQuizTransition = false; // New flag for quiz transition

// Define lessons and quiz question arrays (already provided)
// ... (lessons array remains unchanged)


// ... (update trianglesQuestions, quadrilateralsPolygonsQuestions, circlesQuestions, coordinateGeometryQuestions, threeDGeometryQuestions, transformationsQuestions, trigonometryQuestions similarly)

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

    lessonContent.innerHTML = ''; // Clear previous content

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
        categoryStats["geometry-and-trigonometry"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["geometry-and-trigonometry"].incorrect++;
        const explanationDiv = document.createElement("div");
        explanationDiv.classList.add("explanation");
        explanationDiv.innerHTML = item.explanation;
        mathContainer.appendChild(explanationDiv);
    }

    submitButton.style.display = 'inline-block';
    submitButton.addEventListener('click', nextItem, { once: true });
}

function selectQuizAnswer(selectedBtn, question, quizQuestions) {
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
        categoryStats["geometry-and-trigonometry"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["geometry-and-trigonometry"].incorrect++;
        const explanationDiv = document.createElement("div");
        explanationDiv.classList.add("explanation");
        explanationDiv.innerHTML = question.explanation;
        mathContainer.appendChild(explanationDiv);
    }

    submitButton.style.display = 'inline-block';
    submitButton.addEventListener('click', () => {
        nextQuizItem(quizQuestions);
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
        case 1: return linesAnglesQuestions;
        case 2: return trianglesQuestions;
        case 3: return quadrilateralsPolygonsQuestions;
        case 4: return circlesQuestions;
        case 5: return coordinateGeometryQuestions;
        case 6: return threeDGeometryQuestions;
        case 7: return transformationsQuestions;
        case 8: return trigonometryQuestions;
        default: return linesAnglesQuestions;
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
            button.addEventListener("click", () => selectQuizAnswer(button, question, quizQuestions));
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
    showNextQuizQuestion(quizQuestions);
}

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["geometry-and-trigonometry"].correct;
    let totalAttempted = totalCorrect + categoryStats["geometry-and-trigonometry"].incorrect;

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
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("satTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    if (!results["geometry-and-trigonometry"]) results["geometry-and-trigonometry"] = { correct: 0, incorrect: 0 };
    results["geometry-and-trigonometry"].correct += categoryStats["geometry-and-trigonometry"].correct || 0;
    results["geometry-and-trigonometry"].incorrect += categoryStats["geometry-and-trigonometry"].incorrect || 0;
    localStorage.setItem("satTestResults", JSON.stringify(results));
    console.log("Stored satTestResults:", JSON.stringify(results));
    categoryStats["geometry-and-trigonometry"] = { correct: 0, incorrect: 0 };
}

function saveScore(lessonId, score) {
    localStorage.setItem(`geometry-and-trigonometry-lessonScore-${lessonId}`, score);
    console.log(`Saved geometry-and-trigonometry-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`geometry-and-trigonometry-lessonScore-${lessonId}`) || "Not completed yet";
}

function showScore() {
    console.log("Showing scores for all lessons");
    const scoresElement = document.getElementById('scores');
    if (scoresElement) {
        scoresElement.innerHTML = Object.keys(lessons).map(lessonId => `
            <p>Lesson ${lessonId}: ${getScore(lessonId)}</p>
        `).join('');
    } else {
        console.error("Scores element not found!");
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded, initializing lesson:", currentLesson);
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 1;
    console.log("Set currentLesson to:", currentLesson);

    const startLessonButton = document.getElementById('start-math-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start lesson button event listener added");
    } else {
        console.error("Start lesson button not found on page load!");
    }
    showScore();
    updateProgressBar(0);
});