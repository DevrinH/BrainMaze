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
        title: "Comparing Main Ideas and Arguments",
        content: [
            {
                type: "example",
                title: "Example 1: Comparing Main Ideas",
                content: `
                    <h2>Example 1: Comparing Main Ideas</h2>
                    <p>Text 1: 'Renewable energy is key to sustainability.'</p>
                    <p>Text 2: 'Fossil fuels remain essential for energy needs.'</p>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Identify ideas: Text 1 pushes renewables, Text 2 defends fossils.</p>
                    <p>Step 2: Compare: Opposing views on energy sources.</p>
                    <p>Comparison: They disagree on the best energy approach.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Text 1: 'Social media connects people.' Text 2: 'Social media isolates us.' How do the main ideas compare?",
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
                    <p>Text 1: 'Homework boosts learning through practice.'</p>
                    <p>Text 2: 'Homework overwhelms students, reducing learning.'</p>
                    <p>Question: How do the arguments differ?</p>
                    <p>Step 1: Arguments: Text 1 sees benefit, Text 2 sees harm.</p>
                    <p>Step 2: Contrast: Opposite effects of homework.</p>
                    <p>Difference: Text 1 supports, Text 2 opposes homework.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Text 1: 'Exercise improves health.' Text 2: 'Exercise risks injury.' How do the arguments differ?",
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
                    <p>Text 1: 'Tech advances society.'</p>
                    <p>Text 2: 'Tech advances but at a cost.'</p>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Ideas: Text 1 is positive, Text 2 is mixed.</p>
                    <p>Step 2: Compare: Partial agreement, but Text 2 adds a downside.</p>
                    <p>Comparison: Text 1 is optimistic, Text 2 is cautious.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Text 1: 'Voting shapes democracy.' Text 2: 'Voting is a waste of time.' How do the main ideas compare?",
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
                    <p>Text 1: 'Education empowers individuals.'</p>
                    <p>Text 2: 'Learning lifts people up.'</p>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Ideas: Both focus on education’s benefits.</p>
                    <p>Step 2: Compare: Aligned positive views.</p>
                    <p>Comparison: Both agree education is uplifting.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Text 1: 'Cities foster innovation.' Text 2: 'Urban areas spark creativity.' How do the main ideas compare?",
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
                    <p>Text 1: 'Diets work because studies prove it.'</p>
                    <p>Text 2: 'Diets fail, I tried one once.'</p>
                    <p>Question: How do the arguments differ?</p>
                    <p>Step 1: Arguments: Text 1 uses evidence, Text 2 personal experience.</p>
                    <p>Step 2: Contrast: Research vs. anecdote.</p>
                    <p>Difference: Text 1 is evidence-based, Text 2 is subjective.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Text 1: 'Sleep aids memory, per research.' Text 2: 'Sleep is overrated, I’m fine without.' How do the arguments differ?",
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
                    <p>Text 1: 'Travel broadens horizons.'</p>
                    <p>Text 2: 'Travel is costly but enriching.'</p>
                    <p>Question: How do the arguments compare?</p>
                    <p>Step 1: Arguments: Text 1 is positive, Text 2 balanced.</p>
                    <p>Step 2: Compare: Agreement on benefits, Text 2 adds cost.</p>
                    <p>Comparison: Text 1 is simpler, Text 2 nuanced.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Text 1: 'Books enrich minds.' Text 2: 'Books educate but can bore.' How do the main ideas compare?",
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
                    <p>Text 1: 'Rules ensure order.'</p>
                    <p>Text 2: 'Rules stifle freedom.'</p>
                    <p>Question: How do the main ideas compare?</p>
                    <p>Step 1: Ideas: Text 1 pro-rules, Text 2 anti-rules.</p>
                    <p>Step 2: Compare: Directly opposing stances.</p>
                    <p>Comparison: They clash on rules’ value.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Text 1: 'Phones aid communication.' Text 2: 'Phones disrupt real talk.' How do the arguments differ?",
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
                    <p>Text 1: 'Studies show recycling saves resources.'</p>
                    <p>Text 2: 'A friend said recycling is useless.'</p>
                    <p>Question: Which text has stronger evidence?</p>
                    <p>Step 1: Evaluate: Studies vs. anecdote.</p>
                    <p>Step 2: Infer: Research is more reliable.</p>
                    <p>Answer: Text 1 has stronger evidence.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Text 1: 'Surveys show diets improve health.' Text 2: 'My cousin lost weight.' Which has stronger evidence?",
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
                    <p>Text 1: 'Data shows masks reduce virus spread.'</p>
                    <p>Text 2: 'Masks were used in 1918.'</p>
                    <p>Question: Which evidence better supports mask use today?</p>
                    <p>Step 1: Check relevance: Data vs. history.</p>
                    <p>Step 2: Infer: Current data is more applicable.</p>
                    <p>Answer: Text 1’s evidence is more relevant.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Text 1: 'Tests prove cars pollute.' Text 2: 'Cars look cool.' Which evidence supports environmental impact?",
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
                    <p>Text 1: 'Experts say sleep aids learning.'</p>
                    <p>Text 2: 'One study found sleep helps memory.'</p>
                    <p>Question: How does the evidence align?</p>
                    <p>Step 1: Compare: Experts vs. one study.</p>
                    <p>Step 2: Infer: Both support sleep’s benefits.</p>
                    <p>Answer: Evidence is consistent but varies in scope.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Text 1: 'Experts say meditation calms.' Text 2: 'I felt calm once meditating.' Which has stronger evidence?",
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
                    <p>Text 1: 'Research shows coffee boosts energy.'</p>
                    <p>Text 2: 'A report says coffee causes crashes.'</p>
                    <p>Question: How does the evidence compare?</p>
                    <p>Step 1: Evaluate: Research vs. report.</p>
                    <p>Step 2: Infer: Opposing claims on coffee.</p>
                    <p>Answer: Evidence conflicts on coffee’s effects.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Text 1: 'Data proves phones distract.' Text 2: 'My phone helps me focus.' Which has stronger evidence?",
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
                    <p>Text 1: 'Scientists say climate change is urgent.'</p>
                    <p>Text 2: 'A blogger says it’s a hoax.'</p>
                    <p>Question: Which evidence is more credible?</p>
                    <p>Step 1: Assess: Scientists vs. blogger.</p>
                    <p>Step 2: Infer: Expertise trumps opinion.</p>
                    <p>Answer: Text 1’s evidence is more credible.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Text 1: 'Studies link sugar to obesity.' Text 2: 'My friend eats sugar and is fine.' Which has stronger evidence?",
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
                    <p>Text 1: 'Multiple trials show vaccines work.'</p>
                    <p>Text 2: 'One test had mixed results.'</p>
                    <p>Question: Which evidence is stronger?</p>
                    <p>Step 1: Compare: Multiple vs. one.</p>
                    <p>Step 2: Infer: More data is more convincing.</p>
                    <p>Answer: Text 1 has stronger evidence.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Text 1: 'Reports say exercise helps mood.' Text 2: 'History shows exercise was valued.' Which supports mental health?",
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
                    <p>Text 1: 'Neutral studies show smoking harms.'</p>
                    <p>Text 2: 'Tobacco Co. says smoking is safe.'</p>
                    <p>Question: Which evidence is more reliable?</p>
                    <p>Step 1: Check bias: Neutral vs. company.</p>
                    <p>Step 2: Infer: Unbiased source is better.</p>
                    <p>Answer: Text 1’s evidence is more reliable.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Text 1: 'Labs say plastic pollutes.' Text 2: 'Plastic Inc. says it’s fine.' Which is more credible?",
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
                    <p>Text 1: 'The policy is a brilliant solution!'</p>
                    <p>Text 2: 'This policy is a total disaster.'</p>
                    <p>Question: How do the tones differ?</p>
                    <p>Step 1: Analyze: 'Brilliant' vs. 'disaster'.</p>
                    <p>Step 2: Infer: Positive vs. negative.</p>
                    <p>Difference: Text 1 is enthusiastic, Text 2 is critical.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Text 1: 'The festival was pure joy.' Text 2: 'The festival was a noisy mess.' How do the tones differ?",
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
                    <p>Text 1: 'Taxes fund vital services.'</p>
                    <p>Text 2: 'Taxes burden citizens unfairly.'</p>
                    <p>Question: How do perspectives differ?</p>
                    <p>Step 1: Views: Services vs. burden.</p>
                    <p>Step 2: Infer: Benefit vs. harm.</p>
                    <p>Difference: Text 1 supports, Text 2 opposes taxes.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Text 1: 'Tech improves life.' Text 2: 'Tech controls us.' How do perspectives differ?",
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
                    <p>Text 1: 'Change is inevitable, thankfully.'</p>
                    <p>Text 2: 'Change is coming, alas.'</p>
                    <p>Question: How do tones differ?</p>
                    <p>Step 1: Tone: 'Thankfully' (relief) vs. 'alas' (regret).</p>
                    <p>Step 2: Infer: Positive vs. negative.</p>
                    <p>Difference: Text 1 is hopeful, Text 2 mournful.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Text 1: 'The law is a triumph!' Text 2: 'The law fails us.' How do the tones differ?",
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
                    <p>Text 1: 'Jobs create wealth.'</p>
                    <p>Text 2: 'Jobs trap workers.'</p>
                    <p>Question: How do perspectives differ?</p>
                    <p>Step 1: Views: Wealth vs. trap.</p>
                    <p>Step 2: Infer: Positive vs. negative outlook.</p>
                    <p>Difference: Text 1 is pro-jobs, Text 2 anti-jobs.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Text 1: 'School builds skills.' Text 2: 'School limits freedom.' How do perspectives differ?",
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
                    <p>Text 1: 'Victory is ours, hurrah!'</p>
                    <p>Text 2: 'We lost, oh no.'</p>
                    <p>Question: How do tones differ?</p>
                    <p>Step 1: Analyze: 'Hurrah' vs. 'oh no'.</p>
                    <p>Step 2: Infer: Joy vs. despair.</p>
                    <p>Difference: Text 1 is jubilant, Text 2 sorrowful.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Text 1: 'Rain is a blessing.' Text 2: 'Rain ruins plans.' How do the tones differ?",
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
                    <p>Text 1: 'The event occurred yesterday.'</p>
                    <p>Text 2: 'What a fiasco yesterday!'</p>
                    <p>Question: How do tones differ?</p>
                    <p>Step 1: Analyze: Factual vs. 'fiasco'.</p>
                    <p>Step 2: Infer: Neutral vs. negative.</p>
                    <p>Difference: Text 1 is flat, Text 2 upset.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Text 1: 'The vote happened.' Text 2: 'The vote was a sham!' How do the tones differ?",
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
                    <p>Text 1: 'Art inspires us.'</p>
                    <p>Text 2: 'Art inspires but confuses too.'</p>
                    <p>Question: How do perspectives differ?</p>
                    <p>Step 1: Views: Pure benefit vs. mixed.</p>
                    <p>Step 2: Infer: Agreement with a caveat.</p>
                    <p>Difference: Text 1 is straightforward, Text 2 nuanced.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Text 1: 'Travel opens minds.' Text 2: 'Travel opens minds but costs.' How do perspectives differ?",
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
                    <p>Text 1: 'Forests store carbon, aiding climate.'</p>
                    <p>Text 2: 'Deforestation harms wildlife habitats.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Main ideas: Carbon storage, habitat loss.</p>
                    <p>Step 2: Combine: Forests’ role and risks.</p>
                    <p>Synthesis: Forests help climate but losing them hurts wildlife.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Text 1: 'Books educate us.' Text 2: 'Books entertain us.' What’s a synthesis?",
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
                    <p>Text 1: 'Studies show coffee boosts focus.'</p>
                    <p>Text 2: 'Reports link coffee to jitters.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Evidence: Focus gain, jitter risk.</p>
                    <p>Step 2: Synthesize: Dual effects.</p>
                    <p>Synthesis: Coffee enhances focus but may cause jitters.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Text 1: 'Cities reduce travel time.' Text 2: 'Cities increase pollution.' What’s a synthesis?",
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
                    <p>Text 1: 'AI speeds up work.'</p>
                    <p>Text 2: 'AI threatens jobs.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Ideas: Efficiency vs. job loss.</p>
                    <p>Step 2: Combine: Trade-offs of AI.</p>
                    <p>Synthesis: AI boosts productivity but risks employment.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Text 1: 'Trade boosts economies.' Text 2: 'Trade harms local jobs.' What’s a synthesis?",
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
                    <p>Text 1: 'Exercise builds strength.'</p>
                    <p>Text 2: 'Workouts improve endurance.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Ideas: Strength, endurance.</p>
                    <p>Step 2: Combine: Benefits of exercise.</p>
                    <p>Synthesis: Exercise enhances strength and endurance.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Text 1: 'Music lifts spirits.' Text 2: 'Songs reduce stress.' What’s a synthesis?",
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
                    <p>Text 1: 'TV informs viewers.'</p>
                    <p>Text 2: 'TV misleads audiences.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Ideas: Information vs. misinformation.</p>
                    <p>Step 2: Combine: Dual potential.</p>
                    <p>Synthesis: TV can inform but also mislead.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Text 1: 'Phones connect us.' Text 2: 'Phones isolate us.' What’s a synthesis?",
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
                    <p>Text 1: 'Studies show diets aid health.'</p>
                    <p>Text 2: 'Data links diets to energy.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Evidence: Health, energy.</p>
                    <p>Step 2: Combine: Diet benefits.</p>
                    <p>Synthesis: Diets improve health and energy.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Text 1: 'Sleep boosts focus.' Text 2: 'Sleep cuts stress.' What’s a synthesis?",
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
                    <p>Text 1: 'Cars save time.'</p>
                    <p>Text 2: 'Cars pollute air.'</p>
                    <p>Question: What’s a synthesis?</p>
                    <p>Step 1: Ideas: Time-saving, pollution.</p>
                    <p>Step 2: Combine: Pros and cons.</p>
                    <p>Synthesis: Cars speed travel but harm the environment.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Text 1: 'Jobs pay well.' Text 2: 'Jobs demand time.' What’s a synthesis?",
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

// Cross Text Connections question arrays
const comparingIdeasQuestions = [
    {
        question: "Text 1: 'Voting shapes democracy.' Text 2: 'Voting is a waste of time.' How do the main ideas compare?",
        answers: [
            { text: "A) They oppose each other", correct: true },
            { text: "B) They support each other", correct: false },
            { text: "C) They are unrelated", correct: false },
            { text: "D) They are neutral", correct: false }
        ],
        explanation: "'Shapes democracy' vs. 'waste' shows conflicting views on voting.",
        difficulty: "easy",
        category: "cross-text-connections"
    }
];

const evaluatingEvidenceQuestions = [
    {
        question: "Text 1: 'Experts say meditation calms.' Text 2: 'I felt calm once meditating.' Which has stronger evidence?",
        answers: [
            { text: "A) Text 1", correct: true },
            { text: "B) Text 2", correct: false },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is strong", correct: false }
        ],
        explanation: "Expert consensus outweighs a single personal experience.",
        difficulty: "medium",
        category: "cross-text-connections"
    }
];

const tonePerspectiveQuestions = [
    {
        question: "Text 1: 'The law is a triumph!' Text 2: 'The law fails us.' How do the tones differ?",
        answers: [
            { text: "A) Positive vs. negative", correct: true },
            { text: "B) Neutral vs. angry", correct: false },
            { text: "C) Sad vs. joyful", correct: false },
            { text: "D) Calm vs. excited", correct: false }
        ],
        explanation: "'Triumph' is celebratory, 'fails' is critical.",
        difficulty: "easy",
        category: "cross-text-connections"
    }
];

const synthesizingQuestions = [
    {
        question: "Text 1: 'Trade boosts economies.' Text 2: 'Trade harms local jobs.' What’s a synthesis?",
        answers: [
            { text: "A) Trade grows economies but costs jobs", correct: true },
            { text: "B) Trade only helps economies", correct: false },
            { text: "C) Jobs increase with trade", correct: false },
            { text: "D) Trade has no effect", correct: false }
        ],
        explanation: "Combines economic gain with job loss for a balanced view.",
        difficulty: "medium",
        category: "cross-text-connections"
    }
];

// lesson-cross-text-connections.js
let categoryStats = {
    "cross-text-connections": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;
let currentItemIndex = 0;
let progressSteps = 0;
let totalSteps = 15; // Default for Lesson 1: 14 items + 1 quiz
let isQuizPhase = false;

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

function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        currentItemIndex = 0;
        isQuizPhase = false;
        totalSteps = lessons[currentLesson].content.length + 1;
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        showItem();
        progressSteps = 1;
        updateProgressBar(progressSteps);
    } else {
        console.error("Start lesson button not found!");
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
        console.log("No more items, proceeding to quiz");
        showQuiz();
        return;
    }

    if (item.type === "example") {
        const passage = extractPassage(item.content);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">${item.content.replace(passage, '').replace(/<button id="next-item">Next<\/button>/, '')}</div>
                    <button id="next-item" class="btn next-btn">Next</button>
                </div>
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
        const passage = extractPassage(item.question);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">${item.title}: ${item.question.replace(passage, '')}</div>
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
}

function extractPassage(content) {
    const passageMatch = content.match(/Text 1:.*?Text 2:.*?(?=<p>Question:|$)/is) || content.match(/<p>Text 1:.*?<p>Text 2:.*?<\/p>/is);
    return passageMatch ? passageMatch[0] : "";
}

function selectAnswer(selectedBtn, item) {
    const answerButtons = document.querySelectorAll('#answer-buttons .btn');
    const submitButton = document.getElementById('submit-answer');
    const lessonContent = document.getElementById('lesson-content');

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
        lessonContent.querySelector('.right-column').appendChild(explanationDiv);
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
    progressSteps = currentItemIndex + 1;
    updateProgressBar(progressSteps);
    console.log("nextItem called, currentItemIndex:", currentItemIndex);
    showItem();
}

function showQuiz() {
    console.log("Starting quiz for lesson:", currentLesson);
    isQuizPhase = true;
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = comparingIdeasQuestions; break;
        case 2: quizQuestions = evaluatingEvidenceQuestions; break;
        case 3: quizQuestions = tonePerspectiveQuestions; break;
        case 4: quizQuestions = synthesizingQuestions; break;
        default: quizQuestions = comparingIdeasQuestions;
    }
    progressSteps = totalSteps;
    updateProgressBar(progressSteps);
    showNextQuizQuestion(quizQuestions);
}

function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        const passage = extractPassage(question.question);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question.replace(passage, '')}</div>
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
    } else {
        console.log("All quiz questions answered, showing final score");
        showFinalScore();
    }
}

function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = comparingIdeasQuestions; break;
        case 2: quizQuestions = evaluatingEvidenceQuestions; break;
        case 3: quizQuestions = tonePerspectiveQuestions; break;
        case 4: quizQuestions = synthesizingQuestions; break;
        default: quizQuestions = comparingIdeasQuestions;
    }
    showNextQuizQuestion(quizQuestions);
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
        <button id="continue-button" class="btn continue-btn">Continue</button>
    `;
    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

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
    console.log("showScore called (placeholder)");
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