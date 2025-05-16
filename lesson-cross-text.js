// Variables (aligned with SAT structure)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "cross-text-connections": { correct: 0, incorrect: 0 }
};

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

// Define all lessons (updated with explicit passage fields, SAT-focused)
const lessons = {
    1: {
        title: "Comparing Main Ideas and Arguments",
        content: [
            {
                type: "example",
                title: "Example 1: Comparing Main Ideas",
                content: `
                    <h2>Example 1: Comparing Main Ideas</h2>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Identify ideas: Text 1 pushes renewables, Text 2 defends fossils.</p>
                    <p>Step 2: Compare: Opposing views on energy sources.</p>
                    <p>Comparison: They disagree on the best energy approach.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, an environmental journal in Greenvale stated: 'Renewable energy is key to sustainability.' The journal advocated for green solutions.<br/><br/>Text 2: In 2023, an energy journal in Millville stated: 'Fossil fuels remain essential for current energy needs.' The journal analyzed global energy demands."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Text 1: In 2024, a technology journal in Clearwater stated: 'Social media connects people globally.' The journal explored digital communication.<br/><br/>Text 2: In 2024, a sociology journal in Greenvale stated: 'Social media isolates us from real connections.' The journal analyzed social trends.",
                question: "How do the main ideas compare?",
                options: [
                    { text: "A) They conflict", correct: true },
                    { text: "B) They agree", correct: false },
                    { text: "C) They are unrelated", correct: false },
                    { text: "D) They are identical", correct: false }
                ],
                explanation: "'Connects' vs. 'isolates' shows opposing views on social media."
            },
            {
                type: "example",
                title: "Example 2: Comparing Arguments",
                content: `
                    <h2>Example 2: Comparing Arguments</h2>
                    <p>Question: How do the arguments differ?</p>
                    <p>Step 1: Arguments: Text 1 sees benefit, Text 2 sees harm.</p>
                    <p>Step 2: Contrast: Opposite effects of homework.</p>
                    <p>Difference: Text 1 supports, Text 2 opposes homework.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, an education journal in Millville stated: 'Homework boosts learning through practice.' The journal supported traditional teaching.<br/><br/>Text 2: In 2023, a psychology journal in Clearwater stated: 'Homework overwhelms students, reducing learning.' The journal studied student stress."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Text 1: In 2024, a health journal in Greenvale stated: 'Exercise improves physical health.' The journal promoted fitness.<br/><br/>Text 2: In 2024, a sports journal in Millville stated: 'Exercise risks injury without proper care.' The journal discussed training safety.",
                question: "How do the arguments differ?",
                options: [
                    { text: "A) Benefits vs. risks", correct: true },
                    { text: "B) Methods vs. results", correct: false },
                    { text: "C) Time vs. effort", correct: false },
                    { text: "D) Health vs. fun", correct: false }
                ],
                explanation: "Text 1 highlights positives, Text 2 negatives of exercise."
            },
            {
                type: "example",
                title: "Example 3: Subtle Comparison",
                content: `
                    <h2>Example 3: Subtle Comparison</h2>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Ideas: Text 1 is positive, Text 2 is mixed.</p>
                    <p>Step 2: Compare: Partial agreement, but Text 2 adds a downside.</p>
                    <p>Comparison: Text 1 is optimistic, Text 2 is cautious.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a technology journal in Clearwater stated: 'Technology advances society.' The journal celebrated digital progress.<br/><br/>Text 2: In 2023, a sociology journal in Greenvale stated: 'Technology advances society but at a social cost.' The journal analyzed digital impacts."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Text 1: In 2024, a political journal in Millville stated: 'Voting shapes democracy.' The journal encouraged civic engagement.<br/><br/>Text 2: In 2024, a social journal in Clearwater stated: 'Voting is a waste of time due to corruption.' The journal critiqued political systems.",
                question: "How do the main ideas compare?",
                options: [
                    { text: "A) They oppose each other", correct: true },
                    { text: "B) They support each other", correct: false },
                    { text: "C) They are unrelated", correct: false },
                    { text: "D) They are neutral", correct: false }
                ],
                explanation: "'Shapes democracy' vs. 'waste' shows conflicting views on voting."
            },
            {
                type: "example",
                title: "Example 4: Similar Main Ideas",
                content: `
                    <h2>Example 4: Similar Main Ideas</h2>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Ideas: Both focus on education’s benefits.</p>
                    <p>Step 2: Compare: Aligned positive views.</p>
                    <p>Comparison: Both agree education is uplifting.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, an education journal in Greenvale stated: 'Education empowers individuals.' The journal promoted learning.<br/><br/>Text 2: In 2023, a social journal in Millville stated: 'Learning lifts people up.' The journal discussed personal growth."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Text 1: In 2024, a business journal in Clearwater stated: 'Cities foster innovation.' The journal analyzed urban economies.<br/><br/>Text 2: In 2024, a cultural journal in Greenvale stated: 'Urban areas spark creativity.' The journal explored artistic trends.",
                question: "How do the main ideas compare?",
                options: [
                    { text: "A) They agree", correct: true },
                    { text: "B) They conflict", correct: false },
                    { text: "C) They are unrelated", correct: false },
                    { text: "D) They are neutral", correct: false }
                ],
                explanation: "Both see cities as hubs of positive activity."
            },
            {
                type: "example",
                title: "Example 5: Argument Strength",
                content: `
                    <h2>Example 5: Argument Strength</h2>
                    <p>Question: How do the arguments differ?</p>
                    <p>Step 1: Arguments: Text 1 uses evidence, Text 2 personal experience.</p>
                    <p>Step 2: Contrast: Research vs. anecdote.</p>
                    <p>Difference: Text 1 is evidence-based, Text 2 is subjective.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a health journal in Clearwater stated: 'Diets work because studies prove it.' The journal supported nutrition plans.<br/><br/>Text 2: In 2023, a lifestyle journal in Greenvale stated: 'Diets fail, I tried one once.' The journal shared personal stories."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Text 1: In 2024, a psychology journal in Millville stated: 'Sleep aids memory, per research.' The journal discussed cognitive health.<br/><br/>Text 2: In 2024, a personal journal in Clearwater stated: 'Sleep is overrated, I’m fine without.' The journal shared individual experiences.",
                question: "How do the arguments differ?",
                options: [
                    { text: "A) Evidence vs. opinion", correct: true },
                    { text: "B) Benefits vs. risks", correct: false },
                    { text: "C) Time vs. effort", correct: false },
                    { text: "D) Health vs. fun", correct: false }
                ],
                explanation: "Text 1 cites research, Text 2 relies on personal view."
            },
            {
                type: "example",
                title: "Example 6: Mixed Arguments",
                content: `
                    <h2>Example 6: Mixed Arguments</h2>
                    <p>Question: How do the arguments compare?</p>
                    <p>Step 1: Arguments: Text 1 is positive, Text 2 balanced.</p>
                    <p>Step 2: Compare: Agreement on benefits, Text 2 adds cost.</p>
                    <p>Comparison: Text 1 is simpler, Text 2 nuanced.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a travel journal in Millville stated: 'Travel broadens horizons.' The journal promoted global exploration.<br/><br/>Text 2: In 2023, a finance journal in Clearwater stated: 'Travel is costly but enriching.' The journal analyzed vacation budgets."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Text 1: In 2024, a literary journal in Greenvale stated: 'Books enrich minds.' The journal celebrated reading.<br/><br/>Text 2: In 2024, an education journal in Millville stated: 'Books educate but can bore some readers.' The journal discussed learning tools.",
                question: "How do the main ideas compare?",
                options: [
                    { text: "A) Partial agreement with a twist", correct: true },
                    { text: "B) Complete disagreement", correct: false },
                    { text: "C) No relation", correct: false },
                    { text: "D) Identical views", correct: false }
                ],
                explanation: "Both value books, but Text 2 notes a downside."
            },
            {
                type: "example",
                title: "Example 7: Opposite Perspectives",
                content: `
                    <h2>Example 7: Opposite Perspectives</h2>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Ideas: Text 1 pro-rules, Text 2 anti-rules.</p>
                    <p>Step 2: Compare: Directly opposing stances.</p>
                    <p>Comparison: They clash on rules’ value.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a political journal in Greenvale stated: 'Rules ensure order.' The journal supported governance.<br/><br/>Text 2: In 2023, a social journal in Clearwater stated: 'Rules stifle freedom.' The journal critiqued regulations."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Text 1: In 2024, a technology journal in Millville stated: 'Phones aid communication.' The journal explored digital tools.<br/><br/>Text 2: In 2024, a sociology journal in Greenvale stated: 'Phones disrupt real conversation.' The journal analyzed social behavior.",
                question: "How do the arguments differ?",
                options: [
                    { text: "A) Positive vs. negative impact", correct: true },
                    { text: "B) Cost vs. benefit", correct: false },
                    { text: "C) Old vs. new", correct: false },
                    { text: "D) Effort vs. result", correct: false }
                ],
                explanation: "Text 1 sees benefits, Text 2 drawbacks of phones."
            }
        ]
    },
    2: {
        title: "Evaluating Evidence Across Texts",
        content: [
            {
                type: "example",
                title: "Example 1: Strength of Evidence",
                content: `
                    <h2>Example 1: Strength of Evidence</h2>
                    <p>Question: Which text has stronger evidence?</p>
                    <p>Step 1: Evaluate: Studies vs. anecdote.</p>
                    <p>Step 2: Infer: Research is more reliable.</p>
                    <p>Answer: Text 1 has stronger evidence.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, an environmental journal in Greenvale stated: 'Studies show recycling saves resources.' The journal promoted sustainability.<br/><br/>Text 2: In 2023, a personal journal in Millville stated: 'A friend said recycling is useless.' The journal shared community opinions."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Text 1: In 2024, a health journal in Clearwater stated: 'Surveys show diets improve health.' The journal supported nutrition plans.<br/><br/>Text 2: In 2024, a lifestyle journal in Greenvale stated: 'My cousin lost weight on a diet.' The journal shared personal stories.",
                question: "Which has stronger evidence?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither is strong", correct: false }
                ],
                explanation: "Surveys (broad data) outweigh a single anecdote."
            },
            {
                type: "example",
                title: "Example 2: Relevance of Evidence",
                content: `
                    <h2>Example 2: Relevance of Evidence</h2>
                    <p>Question: Which evidence better supports mask use today?</p>
                    <p>Step 1: Check relevance: Data vs. history.</p>
                    <p>Step 2: Infer: Current data is more applicable.</p>
                    <p>Answer: Text 1’s evidence is more relevant.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a medical journal in Millville stated: 'Data shows masks reduce virus spread.' The journal discussed public health.<br/><br/>Text 2: In 2023, a history journal in Clearwater stated: 'Masks were used during the 1918 flu pandemic.' The journal analyzed past pandemics."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Text 1: In 2024, an environmental journal in Greenvale stated: 'Tests prove cars pollute the environment.' The journal discussed emissions.<br/><br/>Text 2: In 2024, a car magazine in Millville stated: 'Cars look cool and stylish.' The magazine reviewed vehicle designs.",
                question: "Which evidence supports environmental impact?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "Tests on pollution are relevant; looks are not."
            },
            {
                type: "example",
                title: "Example 3: Consistency of Evidence",
                content: `
                    <h2>Example 3: Consistency of Evidence</h2>
                    <p>Question: How does the evidence align?</p>
                    <p>Step 1: Compare: Experts vs. one study.</p>
                    <p>Step 2: Infer: Both support sleep’s benefits.</p>
                    <p>Answer: Evidence is consistent but varies in scope.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a psychology journal in Clearwater stated: 'Experts say sleep aids learning.' The journal discussed cognitive benefits.<br/><br/>Text 2: In 2023, a science journal in Greenvale stated: 'One study found sleep improves memory.' The journal analyzed brain research."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Text 1: In 2024, a wellness journal in Millville stated: 'Experts say meditation reduces stress.' The journal promoted mindfulness.<br/><br/>Text 2: In 2024, a personal journal in Clearwater stated: 'I felt calm once after meditating.' The journal shared individual experiences.",
                question: "Which has stronger evidence?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither is strong", correct: false }
                ],
                explanation: "Expert consensus outweighs a single personal experience."
            },
            {
                type: "example",
                title: "Example 4: Conflicting Evidence",
                content: `
                    <h2>Example 4: Conflicting Evidence</h2>
                    <p>Question: How does the evidence compare?</p>
                    <p>Step 1: Evaluate: Research vs. report.</p>
                    <p>Step 2: Infer: Opposing claims on coffee.</p>
                    <p>Answer: Evidence conflicts on coffee’s effects.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a health journal in Greenvale stated: 'Research shows coffee boosts energy.' The journal discussed diet effects.<br/><br/>Text 2: In 2023, a medical journal in Millville stated: 'A report says coffee causes energy crashes.' The journal analyzed caffeine."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Text 1: In 2024, a psychology journal in Clearwater stated: 'Data proves phones distract from tasks.' The journal studied digital impacts.<br/><br/>Text 2: In 2024, a personal journal in Greenvale stated: 'My phone helps me focus on work.' The journal shared user experiences.",
                question: "Which has stronger evidence?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "Data is more reliable than personal opinion."
            },
            {
                type: "example",
                title: "Example 5: Source Credibility",
                content: `
                    <h2>Example 5: Source Credibility</h2>
                    <p>Question: Which evidence is more credible?</p>
                    <p>Step 1: Assess: Scientists vs. blogger.</p>
                    <p>Step 2: Infer: Expertise trumps opinion.</p>
                    <p>Answer: Text 1’s evidence is more credible.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, an environmental journal in Millville stated: 'Scientists say climate change is urgent.' The journal discussed global warming.<br/><br/>Text 2: In 2023, a blog in Clearwater stated: 'A blogger says climate change is a hoax.' The blog shared personal views."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Text 1: In 2024, a nutrition journal in Greenvale stated: 'Studies link sugar to obesity.' The journal discussed dietary health.<br/><br/>Text 2: In 2024, a personal journal in Millville stated: 'My friend eats sugar and is fine.' The journal shared anecdotes.",
                question: "Which has stronger evidence?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither is strong", correct: false }
                ],
                explanation: "Studies outweigh a single anecdote."
            },
            {
                type: "example",
                title: "Example 6: Quantity of Evidence",
                content: `
                    <h2>Example 6: Quantity of Evidence</h2>
                    <p>Question: Which evidence is stronger?</p>
                    <p>Step 1: Compare: Multiple vs. one.</p>
                    <p>Step 2: Infer: More data is more convincing.</p>
                    <p>Answer: Text 1 has stronger evidence.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a medical journal in Clearwater stated: 'Multiple trials show vaccines work.' The journal discussed immunization.<br/><br/>Text 2: In 2023, a health journal in Greenvale stated: 'One test had mixed results on vaccines.' The journal analyzed medical data."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Text 1: In 2024, a fitness journal in Millville stated: 'Reports say exercise improves mood.' The journal promoted wellness.<br/><br/>Text 2: In 2024, a history journal in Clearwater stated: 'History shows exercise was valued in ancient times.' The journal explored past cultures.",
                question: "Which supports mental health?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "Reports on mood are relevant; history isn’t."
            },
            {
                type: "example",
                title: "Example 7: Bias in Evidence",
                content: `
                    <h2>Example 7: Bias in Evidence</h2>
                    <p>Question: Which evidence is more reliable?</p>
                    <p>Step 1: Check bias: Neutral vs. company.</p>
                    <p>Step 2: Infer: Unbiased source is better.</p>
                    <p>Answer: Text 1’s evidence is more reliable.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, an environmental journal in Greenvale stated: 'Neutral studies show smoking harms health.' The journal discussed public health.<br/><br/>Text 2: In 2023, a corporate blog in Millville stated: 'Tobacco Co. says smoking is safe.' The blog promoted industry views."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Text 1: In 2024, a science journal in Clearwater stated: 'Labs say plastic pollutes oceans.' The journal discussed environmental issues.<br/><br/>Text 2: In 2024, a corporate journal in Greenvale stated: 'Plastic Inc. says plastic is safe.' The journal promoted industry perspectives.",
                question: "Which is more credible?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "Labs are neutral; Plastic Inc. is biased."
            }
        ]
    },
    3: {
        title: "Understanding Differences in Tone and Perspective",
        content: [
            {
                type: "example",
                title: "Example 1: Tone Difference",
                content: `
                    <h2>Example 1: Tone Difference</h2>
                    <p>Question: How do the tones differ?</p>
                    <p>Step 1: Analyze: 'Brilliant' vs. 'disaster'.</p>
                    <p>Step 2: Infer: Positive vs. negative.</p>
                    <p>Difference: Text 1 is enthusiastic, Text 2 is critical.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a political journal in Millville stated: 'The policy is a brilliant solution!' The journal supported reforms.<br/><br/>Text 2: In 2023, a social journal in Clearwater stated: 'This policy is a total disaster.' The journal critiqued governance."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Text 1: In 2024, a cultural journal in Greenvale stated: 'The festival was pure joy.' The journal celebrated community events.<br/><br/>Text 2: In 2024, a local journal in Millville stated: 'The festival was a noisy mess.' The journal discussed public complaints.",
                question: "How do the tones differ?",
                options: [
                    { text: "A) Positive vs. negative", correct: true },
                    { text: "B) Neutral vs. excited", correct: false },
                    { text: "C) Angry vs. calm", correct: false },
                    { text: "D) Sad vs. happy", correct: false }
                ],
                explanation: "'Joy' is upbeat, 'mess' is critical."
            },
            {
                type: "example",
                title: "Example 2: Perspective Difference",
                content: `
                    <h2>Example 2: Perspective Difference</h2>
                    <p>Question: How do perspectives differ?</p>
                    <p>Step 1: Views: Services vs. burden.</p>
                    <p>Step 2: Infer: Benefit vs. harm.</p>
                    <p>Difference: Text 1 supports, Text 2 opposes taxes.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a political journal in Greenvale stated: 'Taxes fund vital services.' The journal supported public spending.<br/><br/>Text 2: In 2023, a social journal in Millville stated: 'Taxes burden citizens unfairly.' The journal critiqued fiscal policy."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Text 1: In 2024, a technology journal in Clearwater stated: 'Technology improves quality of life.' The journal celebrated innovation.<br/><br/>Text 2: In 2024, a sociology journal in Greenvale stated: 'Technology controls and isolates us.' The journal analyzed social impacts.",
                question: "How do perspectives differ?",
                options: [
                    { text: "A) Optimistic vs. pessimistic", correct: true },
                    { text: "B) Factual vs. opinion", correct: false },
                    { text: "C) Past vs. present", correct: false },
                    { text: "D) Simple vs. complex", correct: false }
                ],
                explanation: "Text 1 sees benefits, Text 2 sees drawbacks."
            },
            {
                type: "example",
                title: "Example 3: Subtle Tone",
                content: `
                    <h2>Example 3: Subtle Tone</h2>
                    <p>Question: How do tones differ?</p>
                    <p>Step 1: Tone: 'Thankfully' (relief) vs. 'alas' (regret).</p>
                    <p>Step 2: Infer: Positive vs. negative.</p>
                    <p>Difference: Text 1 is hopeful, Text 2 mournful.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a cultural journal in Clearwater stated: 'Change is inevitable, thankfully.' The journal embraced progress.<br/><br/>Text 2: In 2023, a history journal in Millville stated: 'Change is coming, alas.' The journal reflected on traditions."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Text 1: In 2024, a political journal in Greenvale stated: 'The law is a triumph!' The journal supported legislation.<br/><br/>Text 2: In 2024, a social journal in Millville stated: 'The law fails us.' The journal critiqued policy.",
                question: "How do the tones differ?",
                options: [
                    { text: "A) Positive vs. negative", correct: true },
                    { text: "B) Neutral vs. angry", correct: false },
                    { text: "C) Sad vs. joyful", correct: false },
                    { text: "D) Calm vs. excited", correct: false }
                ],
                explanation: "'Triumph' is celebratory, 'fails' is critical."
            },
            {
                type: "example",
                title: "Example 4: Perspective Shift",
                content: `
                    <h2>Example 4: Perspective Shift</h2>
                    <p>Question: How do perspectives differ?</p>
                    <p>Step 1: Views: Wealth vs. trap.</p>
                    <p>Step 2: Infer: Positive vs. negative outlook.</p>
                    <p>Difference: Text 1 is pro-jobs, Text 2 anti-jobs.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a business journal in Millville stated: 'Jobs create wealth.' The journal supported economic growth.<br/><br/>Text 2: In 2023, a social journal in Clearwater stated: 'Jobs trap workers in routine.' The journal critiqued labor systems."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Text 1: In 2024, an education journal in Greenvale stated: 'School builds essential skills.' The journal promoted learning.<br/><br/>Text 2: In 2024, a social journal in Millville stated: 'School limits personal freedom.' The journal critiqued education systems.",
                question: "How do perspectives differ?",
                options: [
                    { text: "A) Positive vs. negative", correct: true },
                    { text: "B) Effort vs. reward", correct: false },
                    { text: "C) Time vs. result", correct: false },
                    { text: "D) Fact vs. fiction", correct: false }
                ],
                explanation: "Text 1 values school, Text 2 sees it as restrictive."
            },
            {
                type: "example",
                title: "Example 5: Emotional Tone",
                content: `
                    <h2>Example 5: Emotional Tone</h2>
                    <p>Question: How do tones differ?</p>
                    <p>Step 1: Analyze: 'Hurrah' vs. 'oh no'.</p>
                    <p>Step 2: Infer: Joy vs. despair.</p>
                    <p>Difference: Text 1 is jubilant, Text 2 sorrowful.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a sports journal in Greenvale stated: 'Victory is ours, hurrah!' The journal celebrated team success.<br/><br/>Text 2: In 2023, a local journal in Millville stated: 'We lost, oh no.' The journal reported community reactions."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Text 1: In 2024, a nature journal in Clearwater stated: 'Rain is a blessing for crops.' The journal discussed agriculture.<br/><br/>Text 2: In 2024, a community journal in Greenvale stated: 'Rain ruins our outdoor plans.' The journal reported local sentiments.",
                question: "How do the tones differ?",
                options: [
                    { text: "A) Positive vs. negative", correct: true },
                    { text: "B) Calm vs. angry", correct: false },
                    { text: "C) Neutral vs. sad", correct: false },
                    { text: "D) Excited vs. bored", correct: false }
                ],
                explanation: "'Blessing' is grateful, 'ruins' is annoyed."
            },
            {
                type: "example",
                title: "Example 6: Neutral vs. Charged Tone",
                content: `
                    <h2>Example 6: Neutral vs. Charged Tone</h2>
                    <p>Question: How do tones differ?</p>
                    <p>Step 1: Analyze: Factual vs. 'fiasco'.</p>
                    <p>Step 2: Infer: Neutral vs. negative.</p>
                    <p>Difference: Text 1 is flat, Text 2 upset.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a news journal in Clearwater stated: 'The event occurred yesterday.' The journal reported local happenings.<br/><br/>Text 2: In 2023, a community journal in Millville stated: 'What a fiasco yesterday!' The journal discussed public reactions."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Text 1: In 2024, a political journal in Millville stated: 'The vote happened yesterday.' The journal reported election news.<br/><br/>Text 2: In 2024, a social journal in Greenvale stated: 'The vote was a sham!' The journal critiqued electoral processes.",
                question: "How do the tones differ?",
                options: [
                    { text: "A) Neutral vs. negative", correct: true },
                    { text: "B) Positive vs. neutral", correct: false },
                    { text: "C) Angry vs. calm", correct: false },
                    { text: "D) Sad vs. happy", correct: false }
                ],
                explanation: "'Happened' is neutral, 'sham' is critical."
            },
            {
                type: "example",
                title: "Example 7: Mixed Perspective",
                content: `
                    <h2>Example 7: Mixed Perspective</h2>
                    <p>Question: How do perspectives differ?</p>
                    <p>Step 1: Views: Pure benefit vs. mixed.</p>
                    <p>Step 2: Infer: Agreement with a caveat.</p>
                    <p>Difference: Text 1 is straightforward, Text 2 nuanced.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a cultural journal in Greenvale stated: 'Art inspires us.' The journal celebrated creativity.<br/><br/>Text 2: In 2023, an education journal in Millville stated: 'Art inspires but confuses some viewers.' The journal discussed cultural education."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Text 1: In 2024, a travel journal in Clearwater stated: 'Travel opens minds.' The journal promoted exploration.<br/><br/>Text 2: In 2024, a finance journal in Greenvale stated: 'Travel opens minds but costs a fortune.' The journal discussed vacation budgets.",
                question: "How do perspectives differ?",
                options: [
                    { text: "A) Positive vs. balanced", correct: true },
                    { text: "B) Negative vs. positive", correct: false },
                    { text: "C) Neutral vs. excited", correct: false },
                    { text: "D) Simple vs. complex", correct: false }
                ],
                explanation: "Text 1 is all positive, Text 2 adds a downside."
            }
        ]
    },
    4: {
        title: "Synthesizing Information from Multiple Sources",
        content: [
            {
                type: "example",
                title: "Example 1: Combining Main Points",
                content: `
                    <h2>Example 1: Combining Main Points</h2>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Main ideas: Carbon storage, habitat loss.</p>
                    <p>Step 2: Combine: Forests’ role and risks.</p>
                    <p>Synthesis: Forests help climate but losing them hurts wildlife.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, an environmental journal in Clearwater stated: 'Forests store carbon, aiding climate stability.' The journal discussed climate solutions.<br/><br/>Text 2: In 2023, a wildlife journal in Millville stated: 'Deforestation harms wildlife habitats.' The journal advocated for conservation."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Text 1: In 2024, an education journal in Greenvale stated: 'Books educate us.' The journal promoted literacy.<br/><br/>Text 2: In 2024, a cultural journal in Millville stated: 'Books entertain us.' The journal discussed literature.",
                question: "What’s a synthesis?",
                options: [
                    { text: "A) Books educate and entertain", correct: true },
                    { text: "B) Books only educate", correct: false },
                    { text: "C) Books are boring", correct: false },
                    { text: "D) Books replace TV", correct: false }
                ],
                explanation: "Combines education and entertainment as dual roles."
            },
            {
                type: "example",
                title: "Example 2: Reconciling Evidence",
                content: `
                    <h2>Example 2: Reconciling Evidence</h2>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Evidence: Focus gain, jitter risk.</p>
                    <p>Step 2: Synthesize: Dual effects.</p>
                    <p>Synthesis: Coffee enhances focus but may cause jitters.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a health journal in Greenvale stated: 'Studies show coffee boosts focus.' The journal discussed diet effects.<br/><br/>Text 2: In 2023, a medical journal in Clearwater stated: 'Reports link coffee to jitters.' The journal analyzed caffeine."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Text 1: In 2024, an urban journal in Millville stated: 'Cities reduce travel time.' The journal discussed transportation.<br/><br/>Text 2: In 2024, an environmental journal in Greenvale stated: 'Cities increase air pollution.' The journal analyzed urban impacts.",
                question: "What’s a synthesis?",
                options: [
                    { text: "A) Cities cut travel but raise pollution", correct: true },
                    { text: "B) Cities are clean", correct: false },
                    { text: "C) Travel is slow in cities", correct: false },
                    { text: "D) Pollution is low in cities", correct: false }
                ],
                explanation: "Merges benefits and drawbacks of cities."
            },
            {
                type: "example",
                title: "Example 3: Complex Synthesis",
                content: `
                    <h2>Example 3: Complex Synthesis</h2>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Ideas: Efficiency vs. job loss.</p>
                    <p>Step 2: Combine: Trade-offs of AI.</p>
                    <p>Synthesis: AI boosts productivity but risks employment.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a technology journal in Millville stated: 'AI speeds up work processes.' The journal celebrated automation.<br/><br/>Text 2: In 2023, a social journal in Greenvale stated: 'AI threatens job security.' The journal analyzed labor trends."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Text 1: In 2024, a business journal in Clearwater stated: 'Trade boosts national economies.' The journal discussed global markets.<br/><br/>Text 2: In 2024, a labor journal in Millville stated: 'Trade harms local job markets.' The journal analyzed employment.",
                question: "What’s a synthesis?",
                options: [
                    { text: "A) Trade grows economies but costs jobs", correct: true },
                    { text: "B) Trade only helps economies", correct: false },
                    { text: "C) Jobs increase with trade", correct: false },
                    { text: "D) Trade has no effect", correct: false }
                ],
                explanation: "Combines economic gain with job loss for a balanced view."
            },
            {
                type: "example",
                title: "Example 4: Agreeing Points",
                content: `
                    <h2>Example 4: Agreeing Points</h2>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Ideas: Strength, endurance.</p>
                    <p>Step 2: Combine: Benefits of exercise.</p>
                    <p>Synthesis: Exercise enhances strength and endurance.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a fitness journal in Greenvale stated: 'Exercise builds physical strength.' The journal promoted workouts.<br/><br/>Text 2: In 2023, a health journal in Clearwater stated: 'Workouts improve endurance.' The journal discussed fitness benefits."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Text 1: In 2024, a cultural journal in Millville stated: 'Music lifts spirits.' The journal celebrated arts.<br/><br/>Text 2: In 2024, a psychology journal in Greenvale stated: 'Songs reduce stress.' The journal analyzed mental health.",
                question: "What’s a synthesis?",
                options: [
                    { text: "A) Music boosts mood and eases stress", correct: true },
                    { text: "B) Music only lifts spirits", correct: false },
                    { text: "C) Music causes stress", correct: false },
                    { text: "D) Music is loud", correct: false }
                ],
                explanation: "Merges mood lift and stress relief as music’s effects."
            },
            {
                type: "example",
                title: "Example 5: Opposing Views",
                content: `
                    <h2>Example 5: Opposing Views</h2>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Ideas: Information vs. misinformation.</p>
                    <p>Step 2: Combine: Dual potential.</p>
                    <p>Synthesis: TV can inform but also mislead.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a media journal in Clearwater stated: 'TV informs viewers with news.' The journal discussed broadcasting.<br/><br/>Text 2: In 2023, a social journal in Millville stated: 'TV misleads audiences with biases.' The journal critiqued media."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Text 1: In 2024, a technology journal in Greenvale stated: 'Phones connect us globally.' The journal discussed communication.<br/><br/>Text 2: In 2024, a sociology journal in Clearwater stated: 'Phones isolate us from in-person bonds.' The journal analyzed social trends.",
                question: "What’s a synthesis?",
                options: [
                    { text: "A) Phones link and distance us", correct: true },
                    { text: "B) Phones only connect", correct: false },
                    { text: "C) Phones only isolate", correct: false },
                    { text: "D) Phones are neutral", correct: false }
                ],
                explanation: "Combines connection and isolation as phone effects."
            },
            {
                type: "example",
                title: "Example 6: Evidence-Based Synthesis",
                content: `
                    <h2>Example 6: Evidence-Based Synthesis</h2>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Evidence: Health, energy.</p>
                    <p>Step 2: Combine: Diet benefits.</p>
                    <p>Synthesis: Diets improve health and energy.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, a health journal in Millville stated: 'Studies show diets aid health.' The journal supported nutrition.<br/><br/>Text 2: In 2023, a fitness journal in Greenvale stated: 'Data links diets to energy.' The journal discussed wellness."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Text 1: In 2024, a psychology journal in Clearwater stated: 'Sleep boosts focus.' The journal discussed cognitive benefits.<br/><br/>Text 2: In 2024, a health journal in Millville stated: 'Sleep reduces stress.' The journal promoted wellness.",
                question: "What’s a synthesis?",
                options: [
                    { text: "A) Sleep aids focus and reduces stress", correct: true },
                    { text: "B) Sleep only boosts focus", correct: false },
                    { text: "C) Sleep increases stress", correct: false },
                    { text: "D) Sleep is optional", correct: false }
                ],
                explanation: "Merges focus and stress benefits of sleep."
            },
            {
                type: "example",
                title: "Example 7: Balanced Synthesis",
                content: `
                    <h2>Example 7: Balanced Synthesis</h2>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Ideas: Time-saving, pollution.</p>
                    <p>Step 2: Combine: Pros and cons.</p>
                    <p>Synthesis: Cars speed travel but harm the environment.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Text 1: In 2023, an urban journal in Greenvale stated: 'Cars save time for commuters.' The journal discussed transportation.<br/><br/>Text 2: In 2023, an environmental journal in Millville stated: 'Cars pollute the air.' The journal analyzed emissions."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Text 1: In 2024, a business journal in Greenvale stated: 'Jobs pay well.' The journal discussed economic benefits.<br/><br/>Text 2: In 2024, a social journal in Clearwater stated: 'Jobs demand significant time.' The journal analyzed work-life balance.",
                question: "What’s a synthesis?",
                options: [
                    { text: "A) Jobs offer pay but take time", correct: true },
                    { text: "B) Jobs only pay well", correct: false },
                    { text: "C) Jobs are easy", correct: false },
                    { text: "D) Jobs waste time", correct: false }
                ],
                explanation: "Combines pay benefit with time cost."
            }
        ]
    }
};

// Quiz arrays (seven questions each, with 2 A, 2 B, 1 C, 1 D correct answers)
const comparingIdeasQuestions = [
    // Original question
    {
        passage: "Text 1: In 2024, a political journal in Millville stated: 'Voting shapes democracy.' The journal encouraged civic engagement.<br/><br/>Text 2: In 2024, a social journal in Clearwater stated: 'Voting is a waste of time due to corruption.' The journal critiqued political systems.",
        question: "How do the main ideas compare?",
        answers: [
            { text: "A) They oppose each other", correct: true },
            { text: "B) They support each other", correct: false },
            { text: "C) They are unrelated", correct: false },
            { text: "D) They are neutral", correct: false }
        ],
        explanation: "'Shapes democracy' vs. 'waste' shows conflicting views on voting.",
        difficulty: "easy",
        category: "cross-text-connections"
    },
    // New question 1 (Correct: A)
    {
        passage: "Text 1: In 2023, an environmental journal in Greenvale stated: 'Renewable energy is the future.' The journal promoted sustainability.<br/><br/>Text 2: In 2023, an energy journal in Millville stated: 'Fossil fuels are still necessary.' The journal analyzed energy demands.",
        question: "How do the main ideas compare?",
        answers: [
            { text: "A) They conflict", correct: true },
            { text: "B) They agree", correct: false },
            { text: "C) They are unrelated", correct: false },
            { text: "D) They are identical", correct: false }
        ],
        explanation: "'Renewables' vs. 'fossil fuels' shows opposing energy priorities.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 2 (Correct: A)
    {
        passage: "Text 1: In 2024, a health journal in Clearwater stated: 'Exercise enhances well-being.' The journal promoted fitness.<br/><br/>Text 2: In 2024, a sports journal in Greenvale stated: 'Exercise can lead to injuries.' The journal discussed training risks.",
        question: "How do the arguments differ?",
        answers: [
            { text: "A) Benefits vs. risks", correct: true },
            { text: "B) Methods vs. outcomes", correct: false },
            { text: "C) Time vs. effort", correct: false },
            { text: "D) Health vs. leisure", correct: false }
        ],
        explanation: "Text 1 emphasizes positives, Text 2 negatives of exercise.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 3 (Correct: B)
    {
        passage: "Text 1: In 2023, an education journal in Millville stated: 'Education empowers individuals.' The journal supported learning.<br/><br/>Text 2: In 2023, a social journal in Clearwater stated: 'Education uplifts communities.' The journal discussed societal benefits.",
        question: "How do the main ideas compare?",
        answers: [
            { text: "A) They conflict", correct: false },
            { text: "B) They agree", correct: true },
            { text: "C) They are unrelated", correct: false },
            { text: "D) They are neutral", correct: false }
        ],
        explanation: "Both view education positively, focusing on empowerment and upliftment.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 4 (Correct: B)
    {
        passage: "Text 1: In 2024, a technology journal in Greenvale stated: 'AI improves efficiency.' The journal celebrated automation.<br/><br/>Text 2: In 2024, a social journal in Millville stated: 'AI boosts productivity but raises ethical concerns.' The journal analyzed tech impacts.",
        question: "How do the main ideas compare?",
        answers: [
            { text: "A) Complete disagreement", correct: false },
            { text: "B) Partial agreement with a twist", correct: true },
            { text: "C) No relation", correct: false },
            { text: "D) Identical views", correct: false }
        ],
        explanation: "Both see AI benefits, but Text 2 adds ethical concerns.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 5 (Correct: C)
    {
        passage: "Text 1: In 2023, a psychology journal in Clearwater stated: 'Social media fosters connections.' The journal studied online behavior.<br/><br/>Text 2: In 2023, a health journal in Greenvale stated: 'Social media causes stress.' The journal discussed mental health.",
        question: "How do the arguments differ?",
        answers: [
            { text: "A) Methods vs. outcomes", correct: false },
            { text: "B) Benefits vs. costs", correct: false },
            { text: "C) Positive vs. negative impact", correct: true },
            { text: "D) Time vs. effort", correct: false }
        ],
        explanation: "Text 1 sees social media as connective, Text 2 as harmful.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 6 (Correct: D)
    {
        passage: "Text 1: In 2024, a science journal in Millville stated: 'Studies show diets improve health.' The journal supported nutrition.<br/><br/>Text 2: In 2024, a personal journal in Greenvale stated: 'My diet failed, it was too hard.' The journal shared personal experiences.",
        question: "How do the arguments differ?",
        answers: [
            { text: "A) Benefits vs. risks", correct: false },
            { text: "B) Positive vs. neutral", correct: false },
            { text: "C) Cost vs. benefit", correct: false },
            { text: "D) Evidence vs. opinion", correct: true }
        ],
        explanation: "Text 1 uses research, Text 2 relies on personal experience.",
        difficulty: "medium",
        category: "cross-text-connections"
    }
];

const evaluatingEvidenceQuestions = [
    // Original question
    {
        passage: "Text 1: In 2024, a wellness journal in Millville stated: 'Experts say meditation reduces stress.' The journal promoted mindfulness.<br/><br/>Text 2: In 2024, a personal journal in Clearwater stated: 'I felt calm once after meditating.' The journal shared individual experiences.",
        question: "Which has stronger evidence?",
        answers: [
            { text: "A) Text 1", correct: true },
            { text: "B) Text 2", correct: false },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is strong", correct: false }
        ],
        explanation: "Expert consensus outweighs a single personal experience.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 1 (Correct: A)
    {
        passage: "Text 1: In 2023, an environmental journal in Greenvale stated: 'Data shows recycling cuts waste by 40%.' The journal supported sustainability.<br/><br/>Text 2: In 2023, a personal journal in Millville stated: 'Recycling is pointless, I tried it.' The journal shared community opinions.",
        question: "Which has stronger evidence?",
        answers: [
            { text: "A) Text 1", correct: true },
            { text: "B) Text 2", correct: false },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is strong", correct: false }
        ],
        explanation: "Quantitative data outweighs a personal anecdote.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 2 (Correct: A)
    {
        passage: "Text 1: In 2024, a medical journal in Clearwater stated: 'Studies confirm masks reduce infections.' The journal discussed public health.<br/><br/>Text 2: In 2024, a history journal in Greenvale stated: 'Masks were worn in past pandemics.' The journal analyzed historical responses.",
        question: "Which evidence better supports mask use today?",
        answers: [
            { text: "A) Text 1", correct: true },
            { text: "B) Text 2", correct: false },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "Current studies are more relevant than historical context.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 3 (Correct: B)
    {
        passage: "Text 1: In 2023, a psychology journal in Millville stated: 'Experts say sleep improves cognition.' The journal discussed brain health.<br/><br/>Text 2: In 2023, a science journal in Clearwater stated: 'Studies show sleep enhances memory.' The journal analyzed neurological data.",
        question: "How does the evidence align?",
        answers: [
            { text: "A) They conflict", correct: false },
            { text: "B) They are consistent", correct: true },
            { text: "C) They are unrelated", correct: false },
            { text: "D) Neither is credible", correct: false }
        ],
        explanation: "Both support sleep’s cognitive benefits, varying in scope.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 4 (Correct: B)
    {
        passage: "Text 1: In 2024, a nutrition journal in Greenvale stated: 'Research links sugar to obesity.' The journal discussed dietary risks.<br/><br/>Text 2: In 2024, a corporate journal in Millville stated: 'Sugar Co. claims sugar is harmless.' The journal promoted industry views.",
        question: "Which is more credible?",
        answers: [
            { text: "A) Text 2", correct: false },
            { text: "B) Text 1", correct: true },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "Neutral research is more credible than a biased corporate claim.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 5 (Correct: C)
    {
        passage: "Text 1: In 2023, a medical journal in Clearwater stated: 'Multiple trials prove vaccines are effective.' The journal discussed immunization.<br/><br/>Text 2: In 2023, a personal journal in Greenvale stated: 'One vaccine trial had unclear results.' The journal shared community concerns.",
        question: "Which has stronger evidence?",
        answers: [
            { text: "A) Text 2", correct: false },
            { text: "B) Both equally", correct: false },
            { text: "C) Text 1", correct: true },
            { text: "D) Neither", correct: false }
        ],
        explanation: "Multiple trials outweigh a single unclear result.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 6 (Correct: D)
    {
        passage: "Text 1: In 2024, a health journal in Millville stated: 'Studies show coffee improves focus.' The journal discussed diet effects.<br/><br/>Text 2: In 2024, a medical journal in Clearwater stated: 'Reports suggest coffee causes jitters.' The journal analyzed caffeine.",
        question: "How does the evidence compare?",
        answers: [
            { text: "A) They are consistent", correct: false },
            { text: "B) They are unrelated", correct: false },
            { text: "C) Both are equally credible", correct: false },
            { text: "D) They conflict", correct: true }
        ],
        explanation: "Evidence conflicts, showing opposing effects of coffee.",
        difficulty: "medium",
        category: "cross-text-connections"
    }
];

const tonePerspectiveQuestions = [
    // Original question
    {
        passage: "Text 1: In 2024, a political journal in Greenvale stated: 'The law is a triumph!' The journal supported legislation.<br/><br/>Text 2: In 2024, a social journal in Millville stated: 'The law fails us.' The journal critiqued policy.",
        question: "How do the tones differ?",
        answers: [
            { text: "A) Positive vs. negative", correct: true },
            { text: "B) Neutral vs. angry", correct: false },
            { text: "C) Sad vs. joyful", correct: false },
            { text: "D) Calm vs. excited", correct: false }
        ],
        explanation: "'Triumph' is celebratory, 'fails' is critical.",
        difficulty: "easy",
        category: "cross-text-connections"
    },
    // New question 1 (Correct: A)
    {
        passage: "Text 1: In 2023, a cultural journal in Clearwater stated: 'The festival was a vibrant success.' The journal celebrated community events.<br/><br/>Text 2: In 2023, a local journal in Greenvale stated: 'The festival was a chaotic nuisance.' The journal reported resident complaints.",
        question: "How do the tones differ?",
        answers: [
            { text: "A) Positive vs. negative", correct: true },
            { text: "B) Neutral vs. excited", correct: false },
            { text: "C) Angry vs. calm", correct: false },
            { text: "D) Sad vs. happy", correct: false }
        ],
        explanation: "'Vibrant success' is upbeat, 'chaotic nuisance' is critical.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 2 (Correct: A)
    {
        passage: "Text 1: In 2024, a technology journal in Millville stated: 'AI is a game-changer for progress.' The journal celebrated innovation.<br/><br/>Text 2: In 2024, a social journal in Clearwater stated: 'AI threatens human autonomy.' The journal critiqued tech trends.",
        question: "How do the perspectives differ?",
        answers: [
            { text: "A) Optimistic vs. pessimistic", correct: true },
            { text: "B) Factual vs. opinion", correct: false },
            { text: "C) Past vs. present", correct: false },
            { text: "D) Simple vs. complex", correct: false }
        ],
        explanation: "Text 1 sees AI positively, Text 2 sees it negatively.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 3 (Correct: B)
    {
        passage: "Text 1: In 2023, a news journal in Greenvale stated: 'The election occurred yesterday.' The journal reported local events.<br/><br/>Text 2: In 2023, a political journal in Millville stated: 'Yesterday’s election was a travesty!' The journal critiqued electoral processes.",
        question: "How do the tones differ?",
        answers: [
            { text: "A) Positive vs. negative", correct: false },
            { text: "B) Neutral vs. negative", correct: true },
            { text: "C) Excited vs. calm", correct: false },
            { text: "D) Sad vs. joyful", correct: false }
        ],
        explanation: "'Occurred' is neutral, 'travesty' is critical.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 4 (Correct: B)
    {
        passage: "Text 1: In 2024, an education journal in Clearwater stated: 'Progress is welcome, thankfully.' The journal embraced reforms.<br/><br/>Text 2: In 2024, a cultural journal in Greenvale stated: 'Progress disrupts tradition, alas.' The journal reflected on heritage.",
        question: "How do the tones differ?",
        answers: [
            { text: "A) Neutral vs. negative", correct: false },
            { text: "B) Positive vs. negative", correct: true },
            { text: "C) Angry vs. calm", correct: false },
            { text: "D) Excited vs. sad", correct: false }
        ],
        explanation: "'Thankfully' is hopeful, 'alas' is regretful.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 5 (Correct: C)
    {
        passage: "Text 1: In 2023, a business journal in Millville stated: 'Jobs create prosperity.' The journal supported economic growth.<br/><br/>Text 2: In 2023, a labor journal in Clearwater stated: 'Jobs confine workers to monotony.' The journal critiqued work conditions.",
        question: "How do the perspectives differ?",
        answers: [
            { text: "A) Effort vs. reward", correct: false },
            { text: "B) Factual vs. opinion", correct: false },
            { text: "C) Positive vs. negative", correct: true },
            { text: "D) Past vs. present", correct: false }
        ],
        explanation: "Text 1 views jobs as beneficial, Text 2 as restrictive.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 6 (Correct: D)
    {
        passage: "Text 1: In 2024, a sports journal in Greenvale stated: 'The victory was exhilarating!' The journal celebrated team success.<br/><br/>Text 2: In 2024, a local journal in Millville stated: 'The loss was devastating.' The journal reported community reactions.",
        question: "How do the tones differ?",
        answers: [
            { text: "A) Neutral vs. negative", correct: false },
            { text: "B) Positive vs. neutral", correct: false },
            { text: "C) Calm vs. excited", correct: false },
            { text: "D) Positive vs. negative", correct: true }
        ],
        explanation: "'Exhilarating' is joyful, 'devastating' is sorrowful.",
        difficulty: "medium",
        category: "cross-text-connections"
    }
];

const synthesizingQuestions = [
    // Original question
    {
        passage: "Text 1: In 2024, a business journal in Clearwater stated: 'Trade boosts national economies.' The journal discussed global markets.<br/><br/>Text 2: In 2024, a labor journal in Millville stated: 'Trade harms local job markets.' The journal analyzed employment.",
        question: "What’s a synthesis?",
        answers: [
            { text: "A) Trade grows economies but costs jobs", correct: true },
            { text: "B) Trade only helps economies", correct: false },
            { text: "C) Jobs increase with trade", correct: false },
            { text: "D) Trade has no effect", correct: false }
        ],
        explanation: "Combines economic gain with job loss for a balanced view.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 1 (Correct: A)
    {
        passage: "Text 1: In 2023, an education journal in Greenvale stated: 'Books expand knowledge.' The journal promoted literacy.<br/><br/>Text 2: In 2023, a cultural journal in Millville stated: 'Books inspire imagination.' The journal discussed literature.",
        question: "What’s a synthesis?",
        answers: [
            { text: "A) Books educate and inspire", correct: true },
            { text: "B) Books only expand knowledge", correct: false },
            { text: "C) Books are uninspiring", correct: false },
            { text: "D) Books replace schools", correct: false }
        ],
        explanation: "Merges knowledge and inspiration as book benefits.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 2 (Correct: A)
    {
        passage: "Text 1: In 2024, an urban journal in Clearwater stated: 'Cities improve access to services.' The journal discussed urban planning.<br/><br/>Text 2: In 2024, an environmental journal in Greenvale stated: 'Cities contribute to pollution.' The journal analyzed urban impacts.",
        question: "What’s a synthesis?",
        answers: [
            { text: "A) Cities enhance services but increase pollution", correct: true },
            { text: "B) Cities are pollution-free", correct: false },
            { text: "C) Services are poor in cities", correct: false },
            { text: "D) Cities have no impact", correct: false }
        ],
        explanation: "Combines service access with environmental cost.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 3 (Correct: B)
    {
        passage: "Text 1: In 2023, a health journal in Millville stated: 'Exercise promotes heart health.' The journal supported fitness.<br/><br/>Text 2: In 2023, a sports journal in Clearwater stated: 'Exercise builds stamina.' The journal discussed training benefits.",
        question: "What’s a synthesis?",
        answers: [
            { text: "A) Exercise only helps the heart", correct: false },
            { text: "B) Exercise aids heart health and stamina", correct: true },
            { text: "C) Exercise is harmful", correct: false },
            { text: "D) Exercise is unnecessary", correct: false }
        ],
        explanation: "Merges heart health and stamina as exercise benefits.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 4 (Correct: B)
    {
        passage: "Text 1: In 2024, a technology journal in Greenvale stated: 'Social media fosters global networks.' The journal discussed digital communication.<br/><br/>Text 2: In 2024, a psychology journal in Millville stated: 'Social media increases anxiety.' The journal analyzed mental health.",
        question: "What’s a synthesis?",
        answers: [
            { text: "A) Social media only fosters networks", correct: false },
            { text: "B) Social media connects but may harm mental health", correct: true },
            { text: "C) Social media reduces anxiety", correct: false },
            { text: "D) Social media is neutral", correct: false }
        ],
        explanation: "Combines connectivity with mental health risks.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 5 (Correct: C)
    {
        passage: "Text 1: In 2023, a science journal in Clearwater stated: 'AI improves data analysis.' The journal celebrated automation.<br/><br/>Text 2: In 2023, a social journal in Greenvale stated: 'AI risks job displacement.' The journal analyzed labor trends.",
        question: "What’s a synthesis?",
        answers: [
            { text: "A) AI only improves analysis", correct: false },
            { text: "B) AI eliminates jobs", correct: false },
            { text: "C) AI enhances analysis but may cut jobs", correct: true },
            { text: "D) AI has no impact", correct: false }
        ],
        explanation: "Combines AI’s analytical benefits with job loss risks.",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    // New question 6 (Correct: D)
    {
        passage: "Text 1: In 2024, a business journal in Millville stated: 'Jobs provide financial stability.' The journal discussed economic benefits.<br/><br/>Text 2: In 2024, a social journal in Clearwater stated: 'Jobs require long hours.' The journal analyzed work-life balance.",
        question: "What’s a synthesis?",
        answers: [
            { text: "A) Jobs only provide stability", correct: false },
            { text: "B) Jobs are easy", correct: false },
            { text: "C) Jobs demand no time", correct: false },
            { text: "D) Jobs offer stability but demand time", correct: true }
        ],
        explanation: "Merges financial benefits with time demands of jobs.",
        difficulty: "medium",
        category: "cross-text-connections"
    }
];


// Functions
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
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        currentItemIndex = 0;
        isQuizPhase = false;
        showingQuizTransition = false;
        totalSteps = lessons[currentLesson].content.length + getQuizQuestions(currentLesson).length;
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        progressSteps = 1;
        updateProgressBar(progressSteps);
        showItem();
    } else {
        console.error("Start lesson button not found!");
    }
}

function showItem() {
    console.log("Showing item for lesson:", currentLesson, "index:", currentItemIndex);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons[currentLesson] && lessons[currentLesson].content[currentItemIndex]) {
        const item = lessons[currentLesson].content[currentItemIndex];
        lessonContent.innerHTML = '';
        if (item.type === "example") {
            lessonContent.innerHTML = `
                <div class="question-row reading-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.content}</div>
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
                <div class="question-row reading-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question}</div>
                        <div class="answer-choices" id="answer-buttons"></div>
                        <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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
    } else {
        console.log("No more lesson content, proceeding to quiz transition");
        showQuizTransition();
    }
}

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
        categoryStats["cross-text-connections"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["cross-text-connections"].incorrect++;
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
            <div class="transition-box">
                <div class="centered-content">
                    <h2>Lesson Complete!</h2>
                    <p>Now it's time for the quiz.</p>
                    <button id="start-quiz-btn" class="next-btn">Next</button>
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
        case 1: return comparingIdeasQuestions;
        case 2: return evaluatingEvidenceQuestions;
        case 3: return tonePerspectiveQuestions;
        case 4: return synthesizingQuestions;
        default: return comparingIdeasQuestions;
    }
}

function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row reading-section">
                <div class="passage-text">${question.passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
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
    } else {
        console.log("Quiz complete, showing final score");
        showFinalScore();
    }
}

function saveLessonCompletion() {
    const completionData = {
        exam: "SAT",
        type: "lesson",
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("lastActivity", JSON.stringify(completionData));
    console.log("Saved lesson completion:", completionData);
}

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["cross-text-connections"].correct;
    let totalAttempted = totalCorrect + categoryStats["cross-text-connections"].incorrect;

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
    localStorage.setItem(`cross-text-connections-lessonScore-${lessonId}`, score);
    console.log(`Saved cross-text-connections-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`cross-text-connections-lessonScore-${lessonId}`) || "Not completed yet";
}

function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        const score = getScore(currentLesson);
        scoreDisplay.innerHTML = `Previous Score for Lesson ${currentLesson}: ${score}`;
    } else {
        console.log("Score display element not found, skipping showScore");
    }
}

function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
}