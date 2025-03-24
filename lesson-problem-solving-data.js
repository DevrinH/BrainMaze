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
        content: [
            { type: "example", content: "<h2>Example 1: Ratio</h2><p>A mix has 3 parts sugar to 5 parts flour. Ratio of sugar to total?</p><p>Total = 3 + 5 = 8, ratio = 3/8.</p><p>Answer: 3:8</p>" },
            { type: "question", title: "Question 1", question: "2 cups water, 6 cups flour. Water to total?", options: [{ text: "A) 1:4", correct: true }, { text: "B) 1:3", correct: false }, { text: "C) 2:6", correct: false }, { text: "D) 1:2", correct: false }], explanation: "Total = 2 + 6 = 8, 2/8 = 1/4." },
            { type: "example", content: "<h2>Example 2: Percentage</h2><p>$20 shirt, 25% off. Sale price?</p><p>Discount = 0.25 × 20 = 5, 20 - 5 = 15.</p><p>Answer: $15</p>" },
            { type: "question", title: "Question 2", question: "$50 item, 10% off. Sale price?", options: [{ text: "A) $45", correct: true }, { text: "B) $40", correct: false }, { text: "C) $50", correct: false }, { text: "D) $55", correct: false }], explanation: "Discount = 0.10 × 50 = 5, 50 - 5 = 45." },
            { type: "example", content: "<h2>Example 3: Proportion</h2><p>4 pens cost $2, 10 pens cost?</p><p>4/2 = 10/x, 4x = 20, x = 5.</p><p>Answer: $5</p>" },
            { type: "question", title: "Question 3", question: "3 books = $12, 5 books?", options: [{ text: "A) $20", correct: true }, { text: "B) $15", correct: false }, { text: "C) $25", correct: false }, { text: "D) $10", correct: false }], explanation: "3/12 = 5/x, 3x = 60, x = 20." },
            { type: "example", content: "<h2>Example 4: Percent Increase</h2><p>Price from $40 to $48. % increase?</p><p>(48 - 40) / 40 × 100 = 20%.</p><p>Answer: 20%</p>" },
            { type: "question", title: "Question 4", question: "$30 to $36. % increase?", options: [{ text: "A) 20%", correct: true }, { text: "B) 15%", correct: false }, { text: "C) 25%", correct: false }, { text: "D) 10%", correct: false }], explanation: "(36 - 30) / 30 × 100 = 20%." },
            { type: "example", content: "<h2>Example 5: Ratio Scaling</h2><p>Ratio 2:3, total = 10. Parts?</p><p>2x + 3x = 10, 5x = 10, x = 2. Parts = 4 and 6.</p><p>Answer: 4, 6</p>" },
            { type: "question", title: "Question 5", question: "Ratio 1:4, total = 15. Part 1?", options: [{ text: "A) 3", correct: true }, { text: "B) 4", correct: false }, { text: "C) 5", correct: false }, { text: "D) 12", correct: false }], explanation: "1x + 4x = 15, 5x = 15, x = 3, Part 1 = 3." },
            { type: "example", content: "<h2>Example 6: Percent Decrease</h2><p>$80 to $60. % decrease?</p><p>(80 - 60) / 80 × 100 = 25%.</p><p>Answer: 25%</p>" },
            { type: "question", title: "Question 6", question: "$100 to $85. % decrease?", options: [{ text: "A) 15%", correct: true }, { text: "B) 20%", correct: false }, { text: "C) 10%", correct: false }, { text: "D) 25%", correct: false }], explanation: "(100 - 85) / 100 × 100 = 15%." },
            { type: "example", content: "<h2>Example 7: Inverse Proportion</h2><p>6 workers, 12 days. 8 workers, days?</p><p>6 × 12 = 8x, 72 = 8x, x = 9.</p><p>Answer: 9 days</p>" },
            { type: "question", title: "Question 7", question: "5 workers, 20 days. 10 workers?", options: [{ text: "A) 10 days", correct: true }, { text: "B) 15 days", correct: false }, { text: "C) 20 days", correct: false }, { text: "D) 5 days", correct: false }], explanation: "5 × 20 = 10x, 100 = 10x, x = 10." }
        ]
    },
    2: {
        title: "Unit Conversions and Rates",
        content: [
            { type: "example", content: "<h2>Example 1: Unit Conversion</h2><p>Convert 3 feet to inches (1 ft = 12 in).</p><p>3 × 12 = 36.</p><p>Answer: 36 inches</p>" },
            { type: "question", title: "Question 1", question: "Convert 2 hours to minutes (1 hr = 60 min).", options: [{ text: "A) 120 minutes", correct: true }, { text: "B) 60 minutes", correct: false }, { text: "C) 2 minutes", correct: false }, { text: "D) 180 minutes", correct: false }], explanation: "2 × 60 = 120 minutes." },
            { type: "example", content: "<h2>Example 2: Rate</h2><p>120 miles in 2 hours. Speed?</p><p>120 ÷ 2 = 60.</p><p>Answer: 60 mph</p>" },
            { type: "question", title: "Question 2", question: "300 sq ft in 5 hours. Rate?", options: [{ text: "A) 60 sq ft/hr", correct: true }, { text: "B) 50 sq ft/hr", correct: false }, { text: "C) 300 sq ft/hr", correct: false }, { text: "D) 1500 sq ft/hr", correct: false }], explanation: "300 ÷ 5 = 60 sq ft/hr." },
            { type: "example", content: "<h2>Example 3: Combined Conversion</h2><p>30 mph to ft/s (1 mi = 5280 ft, 1 hr = 3600 s).</p><p>30 × 5280 ÷ 3600 = 44.</p><p>Answer: 44 ft/s</p>" },
            { type: "question", title: "Question 3", question: "60 mph to ft/s (1 mi = 5280 ft, 1 hr = 3600 s).", options: [{ text: "A) 88 ft/s", correct: true }, { text: "B) 60 ft/s", correct: false }, { text: "C) 44 ft/s", correct: false }, { text: "D) 100 ft/s", correct: false }], explanation: "60 × 5280 ÷ 3600 = 88 ft/s." },
            { type: "example", content: "<h2>Example 4: Rate Calculation</h2><p>$180 for 6 hours. Hourly rate?</p><p>180 ÷ 6 = 30.</p><p>Answer: $30/hr</p>" },
            { type: "question", title: "Question 4", question: "$240 for 8 hours. Hourly rate?", options: [{ text: "A) $30/hr", correct: true }, { text: "B) $25/hr", correct: false }, { text: "C) $40/hr", correct: false }, { text: "D) $20/hr", correct: false }], explanation: "240 ÷ 8 = 30 $/hr." },
            { type: "example", content: "<h2>Example 5: Distance Rate</h2><p>15 gal for 300 miles. Mi/gal?</p><p>300 ÷ 15 = 20.</p><p>Answer: 20 mi/gal</p>" },
            { type: "question", title: "Question 5", question: "10 gal for 250 miles. Mi/gal?", options: [{ text: "A) 25 mi/gal", correct: true }, { text: "B) 20 mi/gal", correct: false }, { text: "C) 30 mi/gal", correct: false }, { text: "D) 15 mi/gal", correct: false }], explanation: "250 ÷ 10 = 25 mi/gal." },
            { type: "example", content: "<h2>Example 6: Time Conversion</h2><p>4 days to hours (1 day = 24 hr).</p><p>4 × 24 = 96.</p><p>Answer: 96 hours</p>" },
            { type: "question", title: "Question 6", question: "3 days to hours (1 day = 24 hr).", options: [{ text: "A) 72 hours", correct: true }, { text: "B) 48 hours", correct: false }, { text: "C) 96 hours", correct: false }, { text: "D) 24 hours", correct: false }], explanation: "3 × 24 = 72 hours." },
            { type: "example", content: "<h2>Example 7: Complex Rate</h2><p>400 km in 5 hours to m/s (1 km = 1000 m, 1 hr = 3600 s).</p><p>400 × 1000 ÷ (5 × 3600) = 22.22.</p><p>Answer: 22.22 m/s</p>" },
            { type: "question", title: "Question 7", question: "200 km in 4 hours to m/s (1 km = 1000 m, 1 hr = 3600 s).", options: [{ text: "A) 13.89 m/s", correct: true }, { text: "B) 20 m/s", correct: false }, { text: "C) 50 m/s", correct: false }, { text: "D) 10 m/s", correct: false }], explanation: "200 × 1000 ÷ (4 × 3600) = 13.89 m/s." }
        ]
    },
    3: {
        title: "Linear and Exponential Growth",
        content: [
            { type: "example", content: "<h2>Example 1: Linear Growth</h2><p>Plant grows 2 cm/day. Day 0 = 5 cm. Day 3?</p><p>5 + 2 × 3 = 11.</p><p>Answer: 11 cm</p>" },
            { type: "question", title: "Question 1", question: "Car drops $500/year. Start = $10,000. After 2 years?", options: [{ text: "A) $9,000", correct: true }, { text: "B) $8,000", correct: false }, { text: "C) $10,000", correct: false }, { text: "D) $9,500", correct: false }], explanation: "10,000 - 500 × 2 = 9,000." },
            { type: "example", content: "<h2>Example 2: Exponential Growth</h2><p>Bacteria double every hour. Start = 100. After 3 hours?</p><p>100 × 2³ = 100 × 8 = 800.</p><p>Answer: 800</p>" },
            { type: "question", title: "Question 2", question: "Population triples every year. Start = 50. After 2 years?", options: [{ text: "A) 450", correct: true }, { text: "B) 150", correct: false }, { text: "C) 300", correct: false }, { text: "D) 50", correct: false }], explanation: "50 × 3² = 50 × 9 = 450." },
            { type: "example", content: "<h2>Example 3: Comparing Growth</h2><p>Linear: y = 10 + 5t, Exponential: y = 10 × 2^t, t = 2?</p><p>Linear: 10 + 5 × 2 = 20, Exp: 10 × 2² = 40.</p><p>Answer: Exponential (40 > 20)</p>" },
            { type: "question", title: "Question 3", question: "Linear: y = 5 + 3t, t = 3?", options: [{ text: "A) 14", correct: true }, { text: "B) 15", correct: false }, { text: "C) 12", correct: false }, { text: "D) 18", correct: false }], explanation: "5 + 3 × 3 = 14." },
            { type: "example", content: "<h2>Example 4: Linear Decrease</h2><p>Water drops 4 L/day. Start = 20 L. Day 2?</p><p>20 - 4 × 2 = 12.</p><p>Answer: 12 L</p>" },
            { type: "question", title: "Question 4", question: "Value drops $200/year. Start = $1000. After 3 years?", options: [{ text: "A) $400", correct: true }, { text: "B) $600", correct: false }, { text: "C) $800", correct: false }, { text: "D) $200", correct: false }], explanation: "1000 - 200 × 3 = 400." },
            { type: "example", content: "<h2>Example 5: Exponential Decay</h2><p>Substance halves every day. Start = 16 g. Day 2?</p><p>16 × (1/2)² = 16 × 1/4 = 4.</p><p>Answer: 4 g</p>" },
            { type: "question", title: "Question 5", question: "Decays 10%/year. Start = 100. After 1 year?", options: [{ text: "A) 90", correct: true }, { text: "B) 80", correct: false }, { text: "C) 100", correct: false }, { text: "D) 85", correct: false }], explanation: "100 × (1 - 0.1) = 90." },
            { type: "example", content: "<h2>Example 6: Linear Rate</h2><p>Savings increase $50/month. Start = $200. Month 4?</p><p>200 + 50 × 4 = 400.</p><p>Answer: $400</p>" },
            { type: "question", title: "Question 6", question: "Grows 5 cm/day. Start = 10 cm. Day 4?", options: [{ text: "A) 30 cm", correct: true }, { text: "B) 25 cm", correct: false }, { text: "C) 35 cm", correct: false }, { text: "D) 20 cm", correct: false }], explanation: "10 + 5 × 4 = 30 cm." },
            { type: "example", content: "<h2>Example 7: Exponential Increase</h2><p>Price rises 20%/year. Start = $100. Year 2?</p><p>100 × 1.2² = 100 × 1.44 = 144.</p><p>Answer: $144</p>" },
            { type: "question", title: "Question 7", question: "Doubles every hour. Start = 10. After 2 hours?", options: [{ text: "A) 40", correct: true }, { text: "B) 20", correct: false }, { text: "C) 30", correct: false }, { text: "D) 80", correct: false }], explanation: "10 × 2² = 10 × 4 = 40." }
        ]
    },
    4: {
        title: "Data Interpretation (Tables, Graphs, and Charts)",
        content: [
            { type: "example", content: "<h2>Example 1: Table</h2><p>Table: Dogs = 4, Cats = 6. Percent dogs?</p><p>Total = 10, (4 ÷ 10) × 100 = 40%.</p><p>Answer: 40%</p>" },
            { type: "question", title: "Question 1", question: "Table: Apples = 3, Oranges = 7. Percent apples?", options: [{ text: "A) 30%", correct: true }, { text: "B) 70%", correct: false }, { text: "C) 50%", correct: false }, { text: "D) 25%", correct: false }], explanation: "Total = 10, (3 ÷ 10) × 100 = 30%." },
            { type: "example", content: "<h2>Example 2: Graph</h2><p>Bar: Jan = 5, Feb = 10. Percent increase?</p><p>(10 - 5) / 5 × 100 = 100%.</p><p>Answer: 100%</p>" },
            { type: "question", title: "Question 2", question: "Graph: Day 1 = 20, Day 2 = 25. Percent increase?", options: [{ text: "A) 25%", correct: true }, { text: "B) 20%", correct: false }, { text: "C) 50%", correct: false }, { text: "D) 5%", correct: false }], explanation: "(25 - 20) / 20 × 100 = 25%." },
            { type: "example", content: "<h2>Example 3: Pie Chart</h2><p>Pie: Red = 25%, Blue = 75%, total = 80. Red?</p><p>0.25 × 80 = 20.</p><p>Answer: 20</p>" },
            { type: "question", title: "Question 3", question: "Pie: A = 40%, total = 50. How many A?", options: [{ text: "A) 20", correct: true }, { text: "B) 10", correct: false }, { text: "C) 40", correct: false }, { text: "D) 25", correct: false }], explanation: "0.4 × 50 = 20." },
            { type: "example", content: "<h2>Example 4: Percent Decrease</h2><p>Graph: Q1 = 40, Q2 = 32. % decrease?</p><p>(40 - 32) / 40 × 100 = 20%.</p><p>Answer: 20%</p>" },
            { type: "question", title: "Question 4", question: "Graph: Q1 = 50, Q2 = 40. % decrease?", options: [{ text: "A) 20%", correct: true }, { text: "B) 25%", correct: false }, { text: "C) 10%", correct: false }, { text: "D) 15%", correct: false }], explanation: "(50 - 40) / 50 × 100 = 20%." },
            { type: "example", content: "<h2>Example 5: Table Total</h2><p>Table: X = 15, Y = 25. Percent Y?</p><p>Total = 40, (25 ÷ 40) × 100 = 62.5%.</p><p>Answer: 62.5%</p>" },
            { type: "question", title: "Question 5", question: "Table: M = 30, F = 20. Percent M?", options: [{ text: "A) 60%", correct: true }, { text: "B) 40%", correct: false }, { text: "C) 50%", correct: false }, { text: "D) 70%", correct: false }], explanation: "Total = 50, 30 / 50 × 100 = 60%." },
            { type: "example", content: "<h2>Example 6: Bar Difference</h2><p>Bar: A = 60, B = 45. Difference?</p><p>60 - 45 = 15.</p><p>Answer: 15</p>" },
            { type: "question", title: "Question 6", question: "Bar: X = 80, Y = 50. Difference?", options: [{ text: "A) 30", correct: true }, { text: "B) 20", correct: false }, { text: "C) 40", correct: false }, { text: "D) 15", correct: false }], explanation: "80 - 50 = 30." },
            { type: "example", content: "<h2>Example 7: Pie Comparison</h2><p>Pie: P = 30%, Q = 70%, total = 100. Diff?</p><p>P = 30, Q = 70, 70 - 30 = 40.</p><p>Answer: 40</p>" },
            { type: "question", title: "Question 7", question: "Pie: B = 40%, C = 60%, total = 150. Diff B to C?", options: [{ text: "A) 30", correct: true }, { text: "B) 60", correct: false }, { text: "C) 90", correct: false }, { text: "D) 15", correct: false }], explanation: "B = 60, C = 90, 90 - 60 = 30." }
        ]
    },
    5: {
        title: "Measures of Center and Spread (Statistics)",
        content: [
            { type: "example", content: "<h2>Example 1: Mean</h2><p>Data: 2, 4, 6. Mean?</p><p>(2 + 4 + 6) ÷ 3 = 12 ÷ 3 = 4.</p><p>Answer: 4</p>" },
            { type: "question", title: "Question 1", question: "Data: 5, 10, 15. Median?", options: [{ text: "A) 10", correct: true }, { text: "B) 5", correct: false }, { text: "C) 15", correct: false }, { text: "D) 30", correct: false }], explanation: "Ordered: 5, 10, 15. Middle = 10." },
            { type: "example", content: "<h2>Example 2: Range</h2><p>Data: 3, 7, 1, 9. Range?</p><p>Max = 9, Min = 1, 9 - 1 = 8.</p><p>Answer: 8</p>" },
            { type: "question", title: "Question 2", question: "Data: 2, 8, 3, 7. Range?", options: [{ text: "A) 6", correct: true }, { text: "B) 8", correct: false }, { text: "C) 5", correct: false }, { text: "D) 2", correct: false }], explanation: "Max = 8, Min = 2, 8 - 2 = 6." },
            { type: "example", content: "<h2>Example 3: Median</h2><p>Data: 1, 3, 5, 7. Median?</p><p>(3 + 5) ÷ 2 = 4.</p><p>Answer: 4</p>" },
            { type: "question", title: "Question 3", question: "Data: 4, 6, 8. Mean?", options: [{ text: "A) 6", correct: true }, { text: "B) 4", correct: false }, { text: "C) 8", correct: false }, { text: "D) 5", correct: false }], explanation: "(4 + 6 + 8) ÷ 3 = 6." },
            { type: "example", content: "<h2>Example 4: Mode</h2><p>Data: 2, 2, 3, 4. Mode?</p><p>Most frequent = 2.</p><p>Answer: 2</p>" },
            { type: "question", title: "Question 4", question: "Data: 1, 1, 2, 3. Mode?", options: [{ text: "A) 1", correct: true }, { text: "B) 2", correct: false }, { text: "C) 3", correct: false }, { text: "D) None", correct: false }], explanation: "Most frequent = 1." },
            { type: "example", content: "<h2>Example 5: Spread</h2><p>Data: 1, 1, 1 vs. 0, 1, 2. Larger spread?</p><p>First: SD = 0, Second: SD > 0.</p><p>Answer: 0, 1, 2</p>" },
            { type: "question", title: "Question 5", question: "Data: 10, 10, 10. SD?", options: [{ text: "A) 0", correct: true }, { text: "B) 10", correct: false }, { text: "C) 5", correct: false }, { text: "D) 1", correct: false }], explanation: "All same, SD = 0." },
            { type: "example", content: "<h2>Example 6: Mean with Outlier</h2><p>Data: 2, 3, 4, 20. Mean?</p><p>(2 + 3 + 4 + 20) ÷ 4 = 29 ÷ 4 = 7.25.</p><p>Answer: 7.25</p>" },
            { type: "question", title: "Question 6", question: "Data: 1, 2, 3, 10. Mean?", options: [{ text: "A) 4", correct: true }, { text: "B) 3", correct: false }, { text: "C) 5", correct: false }, { text: "D) 10", correct: false }], explanation: "(1 + 2 + 3 + 10) ÷ 4 = 4." },
            { type: "example", content: "<h2>Example 7: Range with Negative</h2><p>Data: -2, 5, 3. Range?</p><p>Max = 5, Min = -2, 5 - (-2) = 7.</p><p>Answer: 7</p>" },
            { type: "question", title: "Question 7", question: "Data: -1, 4, 2. Range?", options: [{ text: "A) 5", correct: true }, { text: "B) 4", correct: false }, { text: "C) 3", correct: false }, { text: "D) 6", correct: false }], explanation: "Max = 4, Min = -1, 4 - (-1) = 5." }
        ]
    },
    6: {
        title: "Probability and Expected Value",
        content: [
            { type: "example", content: "<h2>Example 1: Probability</h2><p>Bag: 3 red, 2 blue. P(red)?</p><p>Total = 5, P = 3/5.</p><p>Answer: 3/5</p>" },
            { type: "question", title: "Question 1", question: "Die roll. P(odd)?", options: [{ text: "A) 1/2", correct: true }, { text: "B) 1/3", correct: false }, { text: "C) 2/3", correct: false }, { text: "D) 1/6", correct: false }], explanation: "Odd: 1, 3, 5, P = 3/6 = 1/2." },
            { type: "example", content: "<h2>Example 2: Expected Value</h2><p>Win $10 (P = 0.4), lose $5 (P = 0.6). EV?</p><p>(10 × 0.4) + (-5 × 0.6) = 4 - 3 = 1.</p><p>Answer: $1</p>" },
            { type: "question", title: "Question 2", question: "Win $20 (P = 0.3), lose $10 (P = 0.7). EV?", options: [{ text: "A) -$1", correct: true }, { text: "B) $1", correct: false }, { text: "C) $6", correct: false }, { text: "D) -$6", correct: false }], explanation: "(20 × 0.3) + (-10 × 0.7) = 6 - 7 = -1." },
            { type: "example", content: "<h2>Example 3: Combined Probability</h2><p>2 coins. P(both heads)?</p><p>HH, HT, TH, TT, P = 1/4.</p><p>Answer: 1/4</p>" },
            { type: "question", title: "Question 3", question: "Bag: 4 red, 6 blue. P(blue)?", options: [{ text: "A) 3/5", correct: true }, { text: "B) 2/5", correct: false }, { text: "C) 4/10", correct: false }, { text: "D) 1/2", correct: false }], explanation: "Total = 10, P = 6/10 = 3/5." },
            { type: "example", content: "<h2>Example 4: Complement</h2><p>5 cards, 2 aces. P(not ace)?</p><p>Total = 5, not ace = 3, P = 3/5.</p><p>Answer: 3/5</p>" },
            { type: "question", title: "Question 4", question: "3 red, 2 green. P(not red)?", options: [{ text: "A) 2/5", correct: true }, { text: "B) 3/5", correct: false }, { text: "C) 1/5", correct: false }, { text: "D) 4/5", correct: false }], explanation: "Total = 5, not red = 2, P = 2/5." },
            { type: "example", content: "<h2>Example 5: Dice Sum</h2><p>2 dice. P(sum = 7)?</p><p>Pairs: (1,6), (2,5), (3,4), etc., 6/36 = 1/6.</p><p>Answer: 1/6</p>" },
            { type: "question", title: "Question 5", question: "Die roll. P(even)?", options: [{ text: "A) 1/2", correct: true }, { text: "B) 1/3", correct: false }, { text: "C) 2/3", correct: false }, { text: "D) 1/6", correct: false }], explanation: "Even: 2, 4, 6, P = 3/6 = 1/2." },
            { type: "example", content: "<h2>Example 6: EV with Multiple Outcomes</h2><p>Win $5 (0.5), $2 (0.3), lose $1 (0.2). EV?</p><p>(5 × 0.5) + (2 × 0.3) + (-1 × 0.2) = 2.5 + 0.6 - 0.2 = 2.9.</p><p>Answer: $2.90</p>" },
            { type: "question", title: "Question 6", question: "Win $5 (0.6), lose $2 (0.4). EV?", options: [{ text: "A) $2.20", correct: true }, { text: "B) $3", correct: false }, { text: "C) $1.80", correct: false }, { text: "D) $2", correct: false }], explanation: "(5 × 0.6) + (-2 × 0.4) = 3 - 0.8 = 2.20." },
            { type: "example", content: "<h2>Example 7: Independent Events</h2><p>P(A) = 0.5, P(B) = 0.4, independent. P(A and B)?</p><p>0.5 × 0.4 = 0.2.</p><p>Answer: 0.2</p>" },
            { type: "question", title: "Question 7", question: "P(A) = 0.3, P(B) = 0.4, independent. P(A and B)?", options: [{ text: "A) 0.12", correct: true }, { text: "B) 0.7", correct: false }, { text: "C) 0.1", correct: false }, { text: "D) 0.5", correct: false }], explanation: "0.3 × 0.4 = 0.12." }
        ]
    },
    7: {
        title: "Two-Way Tables and Conditional Probability",
        content: [
            { type: "example", content: "<h2>Example 1: Two-Way Table</h2><p>Table: Boys (Yes: 20, No: 10), Girls (Yes: 15, No: 5). P(Yes)?</p><p>Total = 50, Yes = 35, P = 35/50 = 7/10.</p><p>Answer: 7/10</p>" },
            { type: "question", title: "Question 1", question: "Table: Men (A: 10, B: 20), Women (A: 5, B: 15). P(A)?", options: [{ text: "A) 1/3", correct: true }, { text: "B) 1/2", correct: false }, { text: "C) 1/4", correct: false }, { text: "D) 2/3", correct: false }], explanation: "Total = 50, A = 15, P = 15/50 = 1/3." },
            { type: "example", content: "<h2>Example 2: Conditional Probability</h2><p>Same table. P(Yes | Boy)?</p><p>Boys = 30, Yes Boys = 20, P = 20/30 = 2/3.</p><p>Answer: 2/3</p>" },
            { type: "question", title: "Question 2", question: "Same table. P(B | Women)?", options: [{ text: "A) 3/4", correct: true }, { text: "B) 1/2", correct: false }, { text: "C) 2/3", correct: false }, { text: "D) 1/3", correct: false }], explanation: "Women = 20, B Women = 15, P = 15/20 = 3/4." },
            { type: "example", content: "<h2>Example 3: Reverse Conditional</h2><p>Same table. P(Boy | Yes)?</p><p>Yes = 35, Yes Boys = 20, P = 20/35 = 4/7.</p><p>Answer: 4/7</p>" },
            { type: "question", title: "Question 3", question: "Table: X (Y: 8, N: 2), Z (Y: 4, N: 6). P(X | Y)?", options: [{ text: "A) 2/3", correct: true }, { text: "B) 1/3", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 3/4", correct: false }], explanation: "Y = 12, X Y = 8, P = 8/12 = 2/3." },
            { type: "example", content: "<h2>Example 4: Total Probability</h2><p>Table: A (M: 5, F: 5), B (M: 10, F: 10). P(B)?</p><p>Total = 30, B = 20, P = 20/30 = 2/3.</p><p>Answer: 2/3</p>" },
            { type: "question", title: "Question 4", question: "Table: P (M: 10, F: 5), Q (M: 20, F: 15). P(Q)?", options: [{ text: "A) 7/10", correct: true }, { text: "B) 5/12", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 2/3", correct: false }], explanation: "Total = 50, Q = 35, P = 35/50 = 7/10." },
            { type: "example", content: "<h2>Example 5: Conditional</h2><p>Table: X (Y: 6, N: 4), Z (Y: 3, N: 7). P(N | Z)?</p><p>Z = 10, N Z = 7, P = 7/10.</p><p>Answer: 7/10</p>" },
            { type: "question", title: "Question 5", question: "Same table. P(Y)?", options: [{ text: "A) 3/5", correct: true }, { text: "B) 2/5", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 4/5", correct: false }], explanation: "Total = 20, Y = 12, P = 12/20 = 3/5." },
            { type: "example", content: "<h2>Example 6: Reverse</h2><p>Same table. P(Z | N)?</p><p>N = 11, Z N = 7, P = 7/11.</p><p>Answer: 7/11</p>" },
            { type: "question", title: "Question 6", question: "Table: A (M: 5, F: 10), B (M: 15, F: 20). P(A | M)?", options: [{ text: "A) 1/4", correct: true }, { text: "B) 1/2", correct: false }, { text: "C) 3/4", correct: false }, { text: "D) 1/3", correct: false }], explanation: "Men = 20, A Men = 5, P = 5/20 = 1/4." },
            { type: "example", content: "<h2>Example 7: Total</h2><p>Table: P (Y: 12, N: 8), Q (Y: 6, N: 4). P(Y)?</p><p>Total = 30, Y = 18, P = 18/30 = 3/5.</p><p>Answer: 3/5</p>" },
            { type: "question", title: "Question 7", question: "Same table. P(P | Y)?", options: [{ text: "A) 2/3", correct: true }, { text: "B) 1/3", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 3/4", correct: false }], explanation: "Y = 18, P Y = 12, P = 12/18 = 2/3." }
        ]
    },
    8: {
        title: "Experimental Design and Statistical Validity",
        content: [
            { type: "example", content: "<h2>Example 1: Sampling Bias</h2><p>Survey at gym about exercise. Bias?</p><p>Gym-goers already exercise.</p><p>Answer: Overestimates exercise frequency</p>" },
            { type: "question", title: "Question 1", question: "Poll at library about reading. Bias?", options: [{ text: "A) Overestimates reading", correct: true }, { text: "B) Underestimates reading", correct: false }, { text: "C) No bias", correct: false }, { text: "D) Random error", correct: false }], explanation: "Library users likely read more." },
            { type: "example", content: "<h2>Example 2: Causation vs. Correlation</h2><p>More ice cream, more drownings. Causation?</p><p>Both rise in summer, not causal.</p><p>Answer: No, correlation</p>" },
            { type: "question", title: "Question 2", question: "More sunscreen, more sunburns. Causation?", options: [{ text: "A) No, correlation", correct: true }, { text: "B) Yes, causation", correct: false }, { text: "C) No data", correct: false }, { text: "D) Yes, reverse causation", correct: false }], explanation: "Both increase in summer, not causal." },
            { type: "example", content: "<h2>Example 3: Randomization</h2><p>Drug test: Randomly assign groups. Why?</p><p>Reduces bias in group differences.</p><p>Answer: Ensures fair comparison</p>" },
            { type: "question", title: "Question 3", question: "Randomized drug trial. Why randomize?", options: [{ text: "A) Reduces bias", correct: true }, { text: "B) Increases sample size", correct: false }, { text: "C) Speeds up results", correct: false }, { text: "D) Simplifies analysis", correct: false }], explanation: "Balances groups." },
            { type: "example", content: "<h2>Example 4: Sample Size</h2><p>Survey 10 people vs. 1000. Which is better?</p><p>Larger sample reduces variability.</p><p>Answer: 1000</p>" },
            { type: "question", title: "Question 4", question: "Small sample size issue?", options: [{ text: "A) Less reliable", correct: true }, { text: "B) More accurate", correct: false }, { text: "C) Faster results", correct: false }, { text: "D) No issue", correct: false }], explanation: "Small samples increase variability." },
            { type: "example", content: "<h2>Example 5: Time Bias</h2><p>Survey on weekends about free time. Bias?</p><p>Weekends skew free time higher.</p><p>Answer: Overestimates free time</p>" },
            { type: "question", title: "Question 5", question: "Survey on weekends. Bias?", options: [{ text: "A) Overestimates free time", correct: true }, { text: "B) Underestimates free time", correct: false }, { text: "C) No bias", correct: false }, { text: "D) Random error", correct: false }], explanation: "Weekends skew free time higher." },
            { type: "example", content: "<h2>Example 6: Causation</h2><p>More rain, more umbrellas. Causation?</p><p>Rain causes umbrella use.</p><p>Answer: Yes, causation</p>" },
            { type: "question", title: "Question 6", question: "More coffee, more productivity. Causation?", options: [{ text: "A) No, correlation", correct: true }, { text: "B) Yes, causation", correct: false }, { text: "C) No data", correct: false }, { text: "D) Reverse causation", correct: false }], explanation: "Could be due to work demands." },
            { type: "example", content: "<h2>Example 7: Selection Bias</h2><p>Phone survey during work hours. Bias?</p><p>Misses working people.</p><p>Answer: Underestimates employed responses</p>" },
            { type: "question", title: "Question 7", question: "Survey at mall about shopping. Bias?", options: [{ text: "A) Overestimates shopping", correct: true }, { text: "B) Underestimates shopping", correct: false }, { text: "C) No bias", correct: false }, { text: "D) Random error", correct: false }], explanation: "Mall-goers likely shop more." }
        ]
    }
};

// Problem Solving and Data Analysis question arrays
// Problem Solving and Data Analysis question arrays
const ratioQuestions = [
    { question: "A mix is 2 parts A to 3 parts B. Ratio of A to total?", answers: [{ text: "A) 2:5", correct: true }, { text: "B) 2:3", correct: false }, { text: "C) 3:5", correct: false }, { text: "D) 1:2", correct: false }], explanation: "Total = 2 + 3 = 5, ratio = 2/5.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Ratio of 4 boys to 6 girls. Boys to total?", answers: [{ text: "A) 4:10", correct: true }, { text: "B) 4:6", correct: false }, { text: "C) 6:10", correct: false }, { text: "D) 2:3", correct: false }], explanation: "Total = 10, 4/10 = 2/5, or 4:10.", difficulty: "easy", category: "problem-solving-data" },
    { question: "3 cups water, 7 cups flour. Water to flour?", answers: [{ text: "A) 3:7", correct: true }, { text: "B) 7:3", correct: false }, { text: "C) 3:10", correct: false }, { text: "D) 10:7", correct: false }], explanation: "Direct ratio = 3:7.", difficulty: "easy", category: "problem-solving-data" },
    { question: "A $40 item is 80% off. Sale price?", answers: [{ text: "A) $8", correct: true }, { text: "B) $32", correct: false }, { text: "C) $10", correct: false }, { text: "D) $4", correct: false }], explanation: "Discount = 0.8 × 40 = 32, 40 - 32 = 8.", difficulty: "medium", category: "problem-solving-data" },
    { question: "5 red, 5 blue marbles. P(red)?", answers: [{ text: "A) 1/2", correct: true }, { text: "B) 1/5", correct: false }, { text: "C) 5/1", correct: false }, { text: "D) 2/5", correct: false }], explanation: "Total = 10, P = 5/10 = 1/2.", difficulty: "medium", category: "problem-solving-data" },
    { question: "If 2x = 3y, what’s x:y?", answers: [{ text: "A) 3:2", correct: true }, { text: "B) 2:3", correct: false }, { text: "C) 1:1", correct: false }, { text: "D) 3:1", correct: false }], explanation: "x/y = 3/2, so x:y = 3:2.", difficulty: "medium", category: "problem-solving-data" },
    { question: "A price rises 20% to $60. Original price?", answers: [{ text: "A) $50", correct: true }, { text: "B) $48", correct: false }, { text: "C) $72", correct: false }, { text: "D) $40", correct: false }], explanation: "1.2x = 60, x = 60 / 1.2 = 50.", difficulty: "hard", category: "problem-solving-data" }
];

const unitRateQuestions = [
    { question: "Convert 5 km to meters (1 km = 1000 m).", answers: [{ text: "A) 5000 m", correct: true }, { text: "B) 500 m", correct: false }, { text: "C) 50 m", correct: false }, { text: "D) 5 m", correct: false }], explanation: "5 × 1000 = 5000 m.", difficulty: "easy", category: "problem-solving-data" },
    { question: "3 hours to seconds (1 hr = 3600 s).", answers: [{ text: "A) 10800 s", correct: true }, { text: "B) 3600 s", correct: false }, { text: "C) 1800 s", correct: false }, { text: "D) 7200 s", correct: false }], explanation: "3 × 3600 = 10800 s.", difficulty: "easy", category: "problem-solving-data" },
    { question: "240 miles in 4 hours. Speed?", answers: [{ text: "A) 60 mph", correct: true }, { text: "B) 40 mph", correct: false }, { text: "C) 80 mph", correct: false }, { text: "D) 120 mph", correct: false }], explanation: "240 / 4 = 60 mph.", difficulty: "easy", category: "problem-solving-data" },
    { question: "15 gal in 3 min. Rate in gal/min?", answers: [{ text: "A) 5 gal/min", correct: true }, { text: "B) 3 gal/min", correct: false }, { text: "C) 15 gal/min", correct: false }, { text: "D) 45 gal/min", correct: false }], explanation: "15 / 3 = 5 gal/min.", difficulty: "medium", category: "problem-solving-data" },
    { question: "50 km/h to m/s (1 km = 1000 m, 1 h = 3600 s).", answers: [{ text: "A) 13.89 m/s", correct: true }, { text: "B) 50 m/s", correct: false }, { text: "C) 180 m/s", correct: false }, { text: "D) 5 m/s", correct: false }], explanation: "50 × 1000 / 3600 = 13.89 m/s.", difficulty: "medium", category: "problem-solving-data" },
    { question: "A job pays $120 for 8 hours. Hourly rate?", answers: [{ text: "A) $15/hr", correct: true }, { text: "B) $12/hr", correct: false }, { text: "C) $10/hr", correct: false }, { text: "D) $20/hr", correct: false }], explanation: "120 / 8 = 15 $/hr.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Car uses 12 gal for 300 mi. Mi/gal?", answers: [{ text: "A) 25 mi/gal", correct: true }, { text: "B) 12 mi/gal", correct: false }, { text: "C) 30 mi/gal", correct: false }, { text: "D) 20 mi/gal", correct: false }], explanation: "300 / 12 = 25 mi/gal.", difficulty: "hard", category: "problem-solving-data" }
];

const growthQuestions = [
    { question: "Population doubles every year. Start = 200. After 2 years?", answers: [{ text: "A) 800", correct: true }, { text: "B) 400", correct: false }, { text: "C) 600", correct: false }, { text: "D) 200", correct: false }], explanation: "200 × 2² = 200 × 4 = 800.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Value drops $200/year. Start = $1000. After 3 years?", answers: [{ text: "A) $400", correct: true }, { text: "B) $600", correct: false }, { text: "C) $800", correct: false }, { text: "D) $200", correct: false }], explanation: "1000 - 200 × 3 = 400.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Grows 5 cm/day. Start = 10 cm. Day 4?", answers: [{ text: "A) 30 cm", correct: true }, { text: "B) 25 cm", correct: false }, { text: "C) 35 cm", correct: false }, { text: "D) 20 cm", correct: false }], explanation: "10 + 5 × 4 = 30 cm.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Triples every hour. Start = 10. After 2 hours?", answers: [{ text: "A) 90", correct: true }, { text: "B) 30", correct: false }, { text: "C) 60", correct: false }, { text: "D) 270", correct: false }], explanation: "10 × 3² = 10 × 9 = 90.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Decays 10%/year. Start = 100. After 1 year?", answers: [{ text: "A) 90", correct: true }, { text: "B) 80", correct: false }, { text: "C) 100", correct: false }, { text: "D) 85", correct: false }], explanation: "100 × (1 - 0.1) = 90.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Linear: y = 5 + 3t, t = 3?", answers: [{ text: "A) 14", correct: true }, { text: "B) 15", correct: false }, { text: "C) 12", correct: false }, { text: "D) 18", correct: false }], explanation: "5 + 3 × 3 = 14.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Exp: y = 2 × 4^t, t = 2?", answers: [{ text: "A) 32", correct: true }, { text: "B) 16", correct: false }, { text: "C) 64", correct: false }, { text: "D) 8", correct: false }], explanation: "2 × 4² = 2 × 16 = 32.", difficulty: "hard", category: "problem-solving-data" }
];

const dataInterpretationQuestions = [
    { question: "Table: X = 8, Y = 12. Percent X?", answers: [{ text: "A) 40%", correct: true }, { text: "B) 60%", correct: false }, { text: "C) 50%", correct: false }, { text: "D) 20%", correct: false }], explanation: "Total = 20, (8 ÷ 20) × 100 = 40%.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Graph: Jan = 10, Feb = 15. Percent increase?", answers: [{ text: "A) 50%", correct: true }, { text: "B) 25%", correct: false }, { text: "C) 75%", correct: false }, { text: "D) 15%", correct: false }], explanation: "(15 - 10) / 10 × 100 = 50%.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Pie: A = 25%, total = 200. How many A?", answers: [{ text: "A) 50", correct: true }, { text: "B) 25", correct: false }, { text: "C) 75", correct: false }, { text: "D) 100", correct: false }], explanation: "0.25 × 200 = 50.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Table: M = 30, F = 20. Percent M?", answers: [{ text: "A) 60%", correct: true }, { text: "B) 40%", correct: false }, { text: "C) 50%", correct: false }, { text: "D) 70%", correct: false }], explanation: "Total = 50, 30 / 50 × 100 = 60%.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Graph: Q1 = 40, Q2 = 48. Percent change?", answers: [{ text: "A) 20%", correct: true }, { text: "B) 15%", correct: false }, { text: "C) 25%", correct: false }, { text: "D) 10%", correct: false }], explanation: "(48 - 40) / 40 × 100 = 20%.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Pie: B = 40%, C = 60%, total = 150. Diff B to C?", answers: [{ text: "A) 30", correct: true }, { text: "B) 60", correct: false }, { text: "C) 90", correct: false }, { text: "D) 15", correct: false }], explanation: "B = 0.4 × 150 = 60, C = 90, 90 - 60 = 30.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Bar: Day 1 = 100, Day 2 = 85. Percent decrease?", answers: [{ text: "A) 15%", correct: true }, { text: "B) 20%", correct: false }, { text: "C) 10%", correct: false }, { text: "D) 25%", correct: false }], explanation: "(100 - 85) / 100 × 100 = 15%.", difficulty: "hard", category: "problem-solving-data" }
];

const statisticsQuestions = [
    { question: "Data: 4, 6, 8. What’s the mean?", answers: [{ text: "A) 6", correct: true }, { text: "B) 4", correct: false }, { text: "C) 8", correct: false }, { text: "D) 5", correct: false }], explanation: "(4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Data: 3, 5, 7. Median?", answers: [{ text: "A) 5", correct: true }, { text: "B) 3", correct: false }, { text: "C) 7", correct: false }, { text: "D) 6", correct: false }], explanation: "Middle value = 5.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Data: 2, 9, 4. Range?", answers: [{ text: "A) 7", correct: true }, { text: "B) 9", correct: false }, { text: "C) 4", correct: false }, { text: "D) 2", correct: false }], explanation: "9 - 2 = 7.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Data: 10, 10, 10. SD?", answers: [{ text: "A) 0", correct: true }, { text: "B) 10", correct: false }, { text: "C) 5", correct: false }, { text: "D) 1", correct: false }], explanation: "All same, SD = 0.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Data: 1, 3, 5, 7. Mean?", answers: [{ text: "A) 4", correct: true }, { text: "B) 5", correct: false }, { text: "C) 3", correct: false }, { text: "D) 6", correct: false }], explanation: "(1 + 3 + 5 + 7) / 4 = 16 / 4 = 4.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Data: 2, 4, 6, 8. Median?", answers: [{ text: "A) 5", correct: true }, { text: "B) 4", correct: false }, { text: "C) 6", correct: false }, { text: "D) 3", correct: false }], explanation: "(4 + 6) / 2 = 5.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Data: 5, 10, 15, 20. Range?", answers: [{ text: "A) 15", correct: true }, { text: "B) 20", correct: false }, { text: "C) 10", correct: false }, { text: "D) 5", correct: false }], explanation: "20 - 5 = 15.", difficulty: "hard", category: "problem-solving-data" }
];

const probabilityQuestions = [
    { question: "Bag: 4 red, 6 blue. P(blue)?", answers: [{ text: "A) 3/5", correct: true }, { text: "B) 2/5", correct: false }, { text: "C) 4/10", correct: false }, { text: "D) 1/2", correct: false }], explanation: "Total = 10, P = 6/10 = 3/5.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Die roll. P(even)?", answers: [{ text: "A) 1/2", correct: true }, { text: "B) 1/3", correct: false }, { text: "C) 2/3", correct: false }, { text: "D) 1/6", correct: false }], explanation: "Even: 2, 4, 6, P = 3/6 = 1/2.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Coin flip twice. P(both heads)?", answers: [{ text: "A) 1/4", correct: true }, { text: "B) 1/2", correct: false }, { text: "C) 3/4", correct: false }, { text: "D) 1/3", correct: false }], explanation: "HH, HT, TH, TT, P = 1/4.", difficulty: "easy", category: "problem-solving-data" },
    { question: "3 red, 2 green. P(not red)?", answers: [{ text: "A) 2/5", correct: true }, { text: "B) 3/5", correct: false }, { text: "C) 1/5", correct: false }, { text: "D) 4/5", correct: false }], explanation: "Total = 5, not red = 2, P = 2/5.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Win $5 (0.6), lose $2 (0.4). EV?", answers: [{ text: "A) $2.20", correct: true }, { text: "B) $3", correct: false }, { text: "C) $1.80", correct: false }, { text: "D) $2", correct: false }], explanation: "(5 × 0.6) + (-2 × 0.4) = 3 - 0.8 = 2.20.", difficulty: "medium", category: "problem-solving-data" },
    { question: "2 dice. P(sum = 7)?", answers: [{ text: "A) 1/6", correct: true }, { text: "B) 1/12", correct: false }, { text: "C) 1/4", correct: false }, { text: "D) 1/3", correct: false }], explanation: "6/36 = 1/6.", difficulty: "medium", category: "problem-solving-data" },
    { question: "P(A) = 0.3, P(B) = 0.4, independent. P(A and B)?", answers: [{ text: "A) 0.12", correct: true }, { text: "B) 0.7", correct: false }, { text: "C) 0.1", correct: false }, { text: "D) 0.5", correct: false }], explanation: "0.3 × 0.4 = 0.12.", difficulty: "hard", category: "problem-solving-data" }
];

const twoWayTableQuestions = [
    { question: "Table: A (M: 5, F: 10), B (M: 15, F: 20). P(A | M)?", answers: [{ text: "A) 1/4", correct: true }, { text: "B) 1/2", correct: false }, { text: "C) 3/4", correct: false }, { text: "D) 1/3", correct: false }], explanation: "Men = 20, A Men = 5, P = 5/20 = 1/4.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Table: X (Y: 8, N: 2), Z (Y: 4, N: 6). P(Y)?", answers: [{ text: "A) 3/5", correct: true }, { text: "B) 2/5", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 4/5", correct: false }], explanation: "Total = 20, Y = 12, P = 12/20 = 3/5.", difficulty: "easy", category: "problem-solving-data" },
    { question: "Same table. P(X | Y)?", answers: [{ text: "A) 2/3", correct: true }, { text: "B) 1/3", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 3/4", correct: false }], explanation: "Y = 12, X Y = 8, P = 8/12 = 2/3.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Table: P (M: 10, F: 5), Q (M: 20, F: 15). P(M | P)?", answers: [{ text: "A) 2/3", correct: true }, { text: "B) 1/3", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 3/4", correct: false }], explanation: "P = 15, M P = 10, P = 10/15 = 2/3.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Same table. P(Q)?", answers: [{ text: "A) 7/12", correct: true }, { text: "B) 5/12", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 2/3", correct: false }], explanation: "Total = 50, Q = 35, P = 35/50 = 7/10.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Table: A (Y: 6, N: 4), B (Y: 3, N: 7). P(N | B)?", answers: [{ text: "A) 7/10", correct: true }, { text: "B) 3/10", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 4/10", correct: false }], explanation: "B = 10, N B = 7, P = 7/10.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Same table. P(A | N)?", answers: [{ text: "A) 4/11", correct: true }, { text: "B) 7/11", correct: false }, { text: "C) 1/2", correct: false }, { text: "D) 6/11", correct: false }], explanation: "N = 11, A N = 4, P = 4/11.", difficulty: "hard", category: "problem-solving-data" }
];

const experimentalDesignQuestions = [
    { question: "Survey at a mall about shopping. Bias?", answers: [{ text: "A) Overestimates shopping", correct: true }, { text: "B) Underestimates shopping", correct: false }, { text: "C) No bias", correct: false }, { text: "D) Random error", correct: false }], explanation: "Mall-goers likely shop more.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Poll at school about homework. Bias?", answers: [{ text: "A) Overestimates homework", correct: true }, { text: "B) Underestimates homework", correct: false }, { text: "C) No bias", correct: false }, { text: "D) Random error", correct: false }], explanation: "Students likely do more homework.", difficulty: "easy", category: "problem-solving-data" },
    { question: "More coffee, more productivity. Causation?", answers: [{ text: "A) No, correlation", correct: true }, { text: "B) Yes, causation", correct: false }, { text: "C) No data", correct: false }, { text: "D) Reverse causation", correct: false }], explanation: "Could be due to work demands.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Randomized drug trial. Why randomize?", answers: [{ text: "A) Reduces bias", correct: true }, { text: "B) Increases sample size", correct: false }, { text: "C) Speeds up results", correct: false }, { text: "D) Simplifies analysis", correct: false }], explanation: "Balances groups.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Survey on weekends. Bias?", answers: [{ text: "A) Overestimates free time", correct: true }, { text: "B) Underestimates free time", correct: false }, { text: "C) No bias", correct: false }, { text: "D) Random error", correct: false }], explanation: "Weekends skew free time higher.", difficulty: "medium", category: "problem-solving-data" },
    { question: "More rain, more umbrellas. Causation?", answers: [{ text: "A) Yes, causation", correct: true }, { text: "B) No, correlation", correct: false }, { text: "C) No data", correct: false }, { text: "D) Reverse causation", correct: false }], explanation: "Rain causes umbrella use.", difficulty: "medium", category: "problem-solving-data" },
    { question: "Small sample size issue?", answers: [{ text: "A) Less reliable", correct: true }, { text: "B) More accurate", correct: false }, { text: "C) Faster results", correct: false }, { text: "D) No issue", correct: false }], explanation: "Small samples increase variability.", difficulty: "hard", category: "problem-solving-data" }
];
// lesson-problem-solving-data.js

// lesson-problem-solving-data.js

let categoryStats = {
    "problem-solving-data": { correct: 0, incorrect: 0 }
};

let currentContentIndex = 0;
let currentLesson = 1;
let progressSteps = 0;
const totalSteps = 14; // 7 examples + 7 questions

function updateProgressBar(step) {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const percentage = (step / totalSteps) * 100;
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
        console.log(`Progress updated: ${step}/${totalSteps} (${percentage}%)`);
    } else {
        console.error("Progress bar element not found!");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 1;
    console.log("Set currentLesson to:", currentLesson);
    showScore();
    updateProgressBar(0);

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start lesson button event listener added");
    } else {
        console.error("Start lesson button not found on page load!");
    }
});

function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        currentContentIndex = 0;
        showContent();
    } else {
        console.error("Start lesson button not found!");
    }
}

function showContent() {
    console.log("Showing content for lesson:", currentLesson, "index:", currentContentIndex);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons && lessons[currentLesson] && lessons[currentLesson].content[currentContentIndex]) {
        const item = lessons[currentLesson].content[currentContentIndex];
        if (item.type === "example") {
            lessonContent.innerHTML = item.content + '<button id="next-item">Next</button>';
            document.getElementById('next-item').addEventListener('click', nextContent);
        } else if (item.type === "question") {
            lessonContent.innerHTML = `
                <h2>${item.title}</h2>
                <p>${item.question}</p>
                ${item.options.map((option, index) => `
                    <input type="radio" id="q${currentContentIndex}a${index}" name="q${currentContentIndex}" value="${option.correct}">
                    <label for="q${currentContentIndex}a${index}">${option.text}</label><br>
                `).join('')}
                <button id="submit-answer">Submit Answer</button>
            `;
            document.getElementById('submit-answer').addEventListener('click', () => checkAnswer(item));
        }
        updateProgressBar(currentContentIndex + 1);
    } else {
        console.error("Lesson content or data missing!");
        showQuiz();
    }
}

function nextContent() {
    currentContentIndex++;
    if (currentContentIndex < lessons[currentLesson].content.length) {
        showContent();
    } else {
        showQuiz();
    }
}

function checkAnswer(question) {
    const selectedAnswer = document.querySelector(`input[name="q${currentContentIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats["problem-solving-data"].correct++;
        } else {
            alert(`Incorrect. ${question.explanation}`);
            categoryStats["problem-solving-data"].incorrect++;
        }
        nextContent();
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentContentIndex = 0;
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
    if (currentContentIndex < quizQuestions.length) {
        const question = quizQuestions[currentContentIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <h2>Question ${currentContentIndex + 1}</h2>
            <p>${question.question}</p>
            ${question.answers.map((answer, index) => `
                <input type="radio" id="q${currentContentIndex}a${index}" name="q${currentContentIndex}" value="${answer.correct}">
                <label for="q${currentContentIndex}a${index}">${answer.text}</label><br>
            `).join('')}
            <button id="submit-answer">Submit Answer</button>
        `;
        document.getElementById('submit-answer').addEventListener('click', () => checkQuizAnswer(question, quizQuestions));
    } else {
        showFinalScore();
    }
}

function checkQuizAnswer(question, quizQuestions) {
    const selectedAnswer = document.querySelector(`input[name="q${currentContentIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats[question.category].correct++;
        } else {
            alert(`Incorrect. ${question.explanation}`);
            categoryStats[question.category].incorrect++;
        }
        currentContentIndex++;
        if (currentContentIndex < quizQuestions.length) {
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
    return localStorage.getItem(`problem-solving-data-lessonScore-${lessonId}`) || "Not completed yet";
}

function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        const score = getScore(currentLesson);
        scoreDisplay.innerHTML = `Previous Score for Lesson ${currentLesson}: ${score}`;
    }
}