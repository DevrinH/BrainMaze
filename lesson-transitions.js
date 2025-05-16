// Variables (aligned with SAT structure)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "transitions": { correct: 0, incorrect: 0 }
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
        title: "Identifying the Correct Type of Transition",
        content: [
            {
                type: "example",
                title: "Example 1: Cause and Effect Transition",
                content: `
                    <h2>Example 1: Cause and Effect Transition</h2>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Rain caused flooding.</p>
                    <p>Step 2: Identify: Shows cause-effect.</p>
                    <p>Type: Cause and effect (e.g., 'therefore').</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather report in Greenvale stated: 'It rained heavily all day. The streets flooded rapidly.' The report discussed local weather impacts."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a sports journal in Millville reported: 'She practiced daily for months. She won the regional race.' The journal highlighted athletic achievements.",
                question: "What type of transition is needed?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Addition", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "Practice leading to winning suggests cause-effect."
            },
            {
                type: "example",
                title: "Example 2: Contrast Transition",
                content: `
                    <h2>Example 2: Contrast Transition</h2>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Effort vs. failure.</p>
                    <p>Step 2: Identify: Shows opposition.</p>
                    <p>Type: Contrast (e.g., 'however').</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an academic journal in Clearwater reported: 'She studied diligently for weeks. She failed the final exam.' The journal analyzed study habits."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a sports journal in Greenvale reported: 'The team was exhausted after the first half. They kept playing with determination.' The journal discussed team resilience.",
                question: "What type of transition is needed?",
                options: [
                    { text: "A) Contrast", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Example", correct: false }
                ],
                explanation: "Exhaustion vs. continuing shows opposition."
            },
            {
                type: "example",
                title: "Example 3: Sequence Transition",
                content: `
                    <h2>Example 3: Sequence Transition</h2>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Steps in order.</p>
                    <p>Step 2: Identify: Shows time sequence.</p>
                    <p>Type: Sequence (e.g., 'then').</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a culinary journal in Millville reported: 'She mixed the batter thoroughly. She baked the cake at 350°F.' The journal shared baking techniques."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a lifestyle journal in Clearwater reported: 'He woke up early each morning. He ate a healthy breakfast.' The journal discussed daily routines.",
                question: "What type of transition is needed?",
                options: [
                    { text: "A) Sequence", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Addition", correct: false },
                    { text: "D) Cause and effect", correct: false }
                ],
                explanation: "Waking up followed by eating suggests a sequence."
            },
            {
                type: "example",
                title: "Example 4: Addition Transition",
                content: `
                    <h2>Example 4: Addition Transition</h2>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Two related positive traits.</p>
                    <p>Step 2: Identify: Shows addition.</p>
                    <p>Type: Addition (e.g., 'and').</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Greenvale reported: 'The book was lengthy and detailed. It was captivating to readers.' The journal reviewed new releases."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, an entertainment journal in Millville reported: 'The movie was humorous. It was action-packed.' The journal reviewed recent films.",
                question: "What type of transition is needed?",
                options: [
                    { text: "A) Addition", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Example", correct: false }
                ],
                explanation: "Humorous and action-packed are added traits."
            },
            {
                type: "example",
                title: "Example 5: Example Transition",
                content: `
                    <h2>Example 5: Example Transition</h2>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Soccer as a specific case.</p>
                    <p>Step 2: Identify: Shows example.</p>
                    <p>Type: Example (e.g., 'for example').</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Clearwater reported: 'Sports are enjoyable activities. Soccer is thrilling to play.' The journal discussed athletic programs."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a pet journal in Greenvale reported: 'Pets require regular care. Dogs need daily walks.' The journal provided pet care tips.",
                question: "What type of transition is needed?",
                options: [
                    { text: "A) Example", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Contrast", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "Dogs are an example of pets needing care."
            },
            {
                type: "example",
                title: "Example 6: Comparison Transition",
                content: `
                    <h2>Example 6: Comparison Transition</h2>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Similarity between cats and dogs.</p>
                    <p>Step 2: Identify: Shows comparison.</p>
                    <p>Type: Comparison (e.g., 'similarly').</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a pet journal in Millville reported: 'Cats are quiet companions. Dogs are quiet at times too.' The journal compared pet behaviors."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a health journal in Clearwater reported: 'Apples are nutritious fruits. Oranges are equally nutritious.' The journal discussed dietary benefits.",
                question: "What type of transition is needed?",
                options: [
                    { text: "A) Comparison", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Addition", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "Both fruits share nutrition, suggesting comparison."
            },
            {
                type: "example",
                title: "Example 7: Conclusion Transition",
                content: `
                    <h2>Example 7: Conclusion Transition</h2>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Effort led to a final outcome.</p>
                    <p>Step 2: Identify: Shows conclusion.</p>
                    <p>Type: Conclusion (e.g., 'in conclusion').</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Greenvale reported: 'The team worked tirelessly for months. They succeeded in launching the product.' The journal analyzed project outcomes."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a political journal in Millville reported: 'They debated policy options all night. They reached a consensus.' The journal discussed governance.",
                question: "What type of transition is needed?",
                options: [
                    { text: "A) Conclusion", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Example", correct: false }
                ],
                explanation: "Debate ending in consensus suggests a conclusion."
            }
        ]
    },
    2: {
        title: "Choosing the Best Transition Word or Phrase",
        content: [
            {
                type: "example",
                title: "Example 1: Adding Information",
                content: `
                    <h2>Example 1: Adding Information</h2>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Additional detail about complexity.</p>
                    <p>Step 2: Choose: 'Moreover' adds related info.</p>
                    <p>Best: 'Moreover'.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Clearwater reported: 'The project was complex and time-consuming. It required extensive teamwork.' The journal discussed project management."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a project report in Greenvale stated: 'The plan failed to meet deadlines. We learned valuable lessons.' The report reviewed outcomes.",
                question: "What’s the best transition?",
                options: [
                    { text: "A) However", correct: true },
                    { text: "B) Therefore", correct: false },
                    { text: "C) First", correct: false },
                    { text: "D) For example", correct: false }
                ],
                explanation: "'However' fits the contrast between failure and learning."
            },
            {
                type: "example",
                title: "Example 2: Showing Contrast",
                content: `
                    <h2>Example 2: Showing Contrast</h2>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Tiredness vs. finishing.</p>
                    <p>Step 2: Choose: 'Nevertheless' shows defiance.</p>
                    <p>Best: 'Nevertheless'.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Millville reported: 'He was exhausted after hours of running. He crossed the finish line.' The journal highlighted endurance."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a financial journal in Clearwater reported: 'She saved money diligently. She purchased a new car.' The journal discussed personal finance.",
                question: "What’s the best transition?",
                options: [
                    { text: "A) As a result", correct: true },
                    { text: "B) On the other hand", correct: false },
                    { text: "C) Similarly", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'As a result' links saving to buying as cause-effect."
            },
            {
                type: "example",
                title: "Example 3: Giving an Example",
                content: `
                    <h2>Example 3: Giving an Example</h2>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Soccer as a specific case.</p>
                    <p>Step 2: Choose: 'For instance' introduces examples.</p>
                    <p>Best: 'For instance'.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Greenvale reported: 'Sports develop valuable skills. Soccer teaches teamwork and discipline.' The journal discussed youth athletics."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a pet journal in Millville reported: 'Pets provide companionship. Dogs remain loyal to their owners.' The journal shared pet care insights.",
                question: "What’s the best transition?",
                options: [
                    { text: "A) For example", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'For example' shows dogs as a case of companionship."
            },
            {
                type: "example",
                title: "Example 4: Showing Sequence",
                content: `
                    <h2>Example 4: Showing Sequence</h2>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Steps in order.</p>
                    <p>Step 2: Choose: 'Then' indicates next step.</p>
                    <p>Best: 'Then'.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Clearwater reported: 'She packed her bags carefully. She departed for the adventure.' The journal shared travel tips."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, an academic journal in Greenvale reported: 'He drafted the essay meticulously. He submitted it to the professor.' The journal discussed writing processes.",
                question: "What’s the best transition?",
                options: [
                    { text: "A) Next", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Moreover", correct: false },
                    { text: "D) Thus", correct: false }
                ],
                explanation: "'Next' shows the sequence of drafting then submitting."
            },
            {
                type: "example",
                title: "Example 5: Showing Cause",
                content: `
                    <h2>Example 5: Showing Cause</h2>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Ice caused sliding.</p>
                    <p>Step 2: Choose: 'Because' explains why.</p>
                    <p>Best: 'Because'.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather journal in Millville reported: 'The roads were icy during the storm. Several cars slid off the highway.' The journal analyzed road safety."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a lifestyle journal in Clearwater reported: 'The weather was scorching. We stayed indoors all day.' The journal discussed summer routines.",
                question: "What’s the best transition?",
                options: [
                    { text: "A) Because", correct: true },
                    { text: "B) On the contrary", correct: false },
                    { text: "C) Similarly", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'Because' links heat to staying indoors as a cause."
            },
            {
                type: "example",
                title: "Example 6: Showing Similarity",
                content: `
                    <h2>Example 6: Showing Similarity</h2>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Similar habits.</p>
                    <p>Step 2: Choose: 'Likewise' shows likeness.</p>
                    <p>Best: 'Likewise'.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a pet journal in Greenvale reported: 'Cats enjoy napping frequently. Dogs often rest during the day too.' The journal compared pet behaviors."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a nutrition journal in Millville reported: 'Apples are rich in vitamins. Pears provide similar nutritional benefits.' The journal discussed fruit diets.",
                question: "What’s the best transition?",
                options: [
                    { text: "A) Similarly", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) For instance", correct: false }
                ],
                explanation: "'Similarly' highlights shared nutritional benefits."
            },
            {
                type: "example",
                title: "Example 7: Concluding",
                content: `
                    <h2>Example 7: Concluding</h2>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Wrapping up efforts.</p>
                    <p>Step 2: Choose: 'Finally' ends the process.</p>
                    <p>Best: 'Finally'.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a project journal in Clearwater reported: 'We explored multiple strategies over weeks. One approach proved effective.' The journal reviewed project outcomes."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a community journal in Greenvale reported: 'They searched for solutions all day. They discovered a practical fix.' The journal discussed local initiatives.",
                question: "What’s the best transition?",
                options: [
                    { text: "A) Finally", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Moreover", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'Finally' concludes the search with a solution."
            }
        ]
    },
    3: {
        title: "Transitioning Between Sentences",
        content: [
            {
                type: "example",
                title: "Example 1: Logical Flow",
                content: `
                    <h2>Example 1: Logical Flow</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Storm caused road issues.</p>
                    <p>Step 2: Transition: 'As a result' shows effect.</p>
                    <p>Revised: 'The storm hit hard. As a result, roads were blocked.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather report in Millville stated: 'The storm hit the region hard. Roads were blocked by debris.' The report discussed storm impacts."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, an academic journal in Clearwater reported: 'She studied all night for the exam. She aced the test.' The journal analyzed study habits.",
                question: "How to transition?",
                options: [
                    { text: "A) Consequently", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Meanwhile", correct: false },
                    { text: "D) Similarly", correct: false }
                ],
                explanation: "'Consequently' connects studying to success as a result."
            },
            {
                type: "example",
                title: "Example 2: Contrast Flow",
                content: `
                    <h2>Example 2: Contrast Flow</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Effort vs. outcome.</p>
                    <p>Step 2: Transition: 'Despite this' shows contrast.</p>
                    <p>Revised: 'He trained for weeks. Despite this, he lost the match.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Greenvale reported: 'He trained rigorously for weeks. He lost the championship match.' The journal discussed athletic performance."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a sports journal in Millville reported: 'The team was small in size. They won the tournament.' The journal highlighted underdog victories.",
                question: "How to transition?",
                options: [
                    { text: "A) Nevertheless", correct: true },
                    { text: "B) Therefore", correct: false },
                    { text: "C) Next", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'Nevertheless' highlights the unexpected win despite size."
            },
            {
                type: "example",
                title: "Example 3: Adding Detail",
                content: `
                    <h2>Example 3: Adding Detail</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Growth led to more schools.</p>
                    <p>Step 2: Transition: 'Additionally' adds info.</p>
                    <p>Revised: 'The city grew fast. Additionally, new schools opened.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an urban journal in Clearwater reported: 'The city grew rapidly in population. New schools opened to accommodate students.' The journal discussed urban development."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a literary journal in Greenvale reported: 'The novel was dense with themes. It featured vivid imagery.' The journal reviewed modern literature.",
                question: "How to transition?",
                options: [
                    { text: "A) Also", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'Also' adds imagery to the novel’s themes."
            },
            {
                type: "example",
                title: "Example 4: Showing Sequence",
                content: `
                    <h2>Example 4: Showing Sequence</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Steps in writing process.</p>
                    <p>Step 2: Transition: 'Afterward' shows order.</p>
                    <p>Revised: 'She wrote a draft. Afterward, she revised it.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an academic journal in Millville reported: 'She wrote a rough draft of her thesis. She revised it extensively.' The journal discussed writing strategies."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a lifestyle journal in Clearwater reported: 'He cooked a gourmet dinner. He cleaned the kitchen.' The journal shared daily routines.",
                question: "How to transition?",
                options: [
                    { text: "A) Then", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Moreover", correct: false },
                    { text: "D) Thus", correct: false }
                ],
                explanation: "'Then' shows the order of cooking then cleaning."
            },
            {
                type: "example",
                title: "Example 5: Giving an Example",
                content: `
                    <h2>Example 5: Giving an Example</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Chess as a specific game.</p>
                    <p>Step 2: Transition: 'For instance' gives an example.</p>
                    <p>Revised: 'Games are fun. For instance, chess challenges the mind.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a recreation journal in Greenvale reported: 'Games are engaging activities. Chess challenges strategic thinking.' The journal discussed leisure activities."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a career journal in Millville reported: 'Jobs offer rewarding experiences. Teaching inspires students.' The journal discussed professions.",
                question: "How to transition?",
                options: [
                    { text: "A) For example", correct: true },
                    { text: "B) On the contrary", correct: false },
                    { text: "C) Because", correct: false },
                    { text: "D) Next", correct: false }
                ],
                explanation: "'For example' shows teaching as a job case."
            },
            {
                type: "example",
                title: "Example 6: Showing Similarity",
                content: `
                    <h2>Example 6: Showing Similarity</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Similar effects on crops.</p>
                    <p>Step 2: Transition: 'Likewise' shows similarity.</p>
                    <p>Revised: 'Rain helps crops. Likewise, snow aids them too.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an agriculture journal in Clearwater reported: 'Rain supports crop growth. Snow provides moisture for crops too.' The journal discussed farming techniques."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a pet journal in Greenvale reported: 'Dogs are loyal companions. Cats show loyalty to owners too.' The journal compared pet behaviors.",
                question: "How to transition?",
                options: [
                    { text: "A) Similarly", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'Similarly' connects shared loyalty of dogs and cats."
            },
            {
                type: "example",
                title: "Example 7: Concluding",
                content: `
                    <h2>Example 7: Concluding</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Final action after attempts.</p>
                    <p>Step 2: Transition: 'Ultimately' wraps it up.</p>
                    <p>Revised: 'We tried calling. Ultimately, we sent a text.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a communication journal in Millville reported: 'We tried calling several times. We sent a text message.' The journal discussed contact methods."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a community journal in Clearwater reported: 'They planned the event for weeks. They canceled due to weather.' The journal discussed local activities.",
                question: "How to transition?",
                options: [
                    { text: "A) In the end", correct: true },
                    { text: "B) For example", correct: false },
                    { text: "C) Because", correct: false },
                    { text: "D) Next", correct: false }
                ],
                explanation: "'In the end' concludes planning with cancellation."
            }
        ]
    },
    4: {
        title: "Transitioning Between Paragraphs",
        content: [
            {
                type: "example",
                title: "Example 1: Shifting Topics",
                content: `
                    <h2>Example 1: Shifting Topics</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Boom to unemployment shift.</p>
                    <p>Step 2: Transition: 'However' contrasts years.</p>
                    <p>Revised: '...boomed last year. However, unemployment rose this year.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Paragraph 1: In 2023, a business journal in Greenvale reported: 'The economy experienced a significant boom last year.' The journal analyzed growth trends.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'Unemployment rates rose sharply this year.' The journal discussed labor challenges."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "Paragraph 1: In 2024, a policy journal in Millville reported: 'The new policy saved millions in costs.' The journal reviewed budget impacts.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'It sparked widespread public discontent.' The journal discussed social reactions.",
                question: "How to transition?",
                options: [
                    { text: "A) On the other hand", correct: true },
                    { text: "B) As a result", correct: false },
                    { text: "C) First", correct: false },
                    { text: "D) For instance", correct: false }
                ],
                explanation: "'On the other hand' contrasts savings with discontent."
            },
            {
                type: "example",
                title: "Example 2: Building on Ideas",
                content: `
                    <h2>Example 2: Building on Ideas</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Health to mental health.</p>
                    <p>Step 2: Transition: 'Furthermore' extends benefits.</p>
                    <p>Revised: '...benefits health. Furthermore, mental health also improves.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Paragraph 1: In 2023, a health journal in Clearwater reported: 'Regular exercise benefits physical health.' The journal promoted fitness.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'Mental health also improves with exercise.' The journal discussed wellness."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "Paragraph 1: In 2024, a sports journal in Greenvale reported: 'The team trained rigorously for the season.' The journal discussed preparation.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'They developed innovative strategies.' The journal highlighted tactics.",
                question: "How to transition?",
                options: [
                    { text: "A) In addition", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Because", correct: false },
                    { text: "D) Meanwhile", correct: false }
                ],
                explanation: "'In addition' adds strategies to training efforts."
            },
            {
                type: "example",
                title: "Example 3: Summarizing",
                content: `
                    <h2>Example 3: Summarizing</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Costs to success despite issues.</p>
                    <p>Step 2: Transition: 'Overall' sums up outcome.</p>
                    <p>Revised: '...due to delays. Overall, the project still succeeded.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Paragraph 1: In 2023, a project journal in Millville reported: 'Project costs rose due to unexpected delays.' The journal analyzed challenges.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'The project still succeeded on time.' The journal discussed outcomes."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "Paragraph 1: In 2024, a business journal in Clearwater reported: 'Sales dropped significantly last quarter.' The journal analyzed market trends.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'Profits remained high due to cost cuts.' The journal discussed financial strategies.",
                question: "How to transition?",
                options: [
                    { text: "A) Despite this", correct: true },
                    { text: "B) As a result", correct: false },
                    { text: "C) Next", correct: false },
                    { text: "D) For example", correct: false }
                ],
                explanation: "'Despite this' contrasts sales drop with profit stability."
            },
            {
                type: "example",
                title: "Example 4: Giving an Example",
                content: `
                    <h2>Example 4: Giving an Example</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Phones as a tech example.</p>
                    <p>Step 2: Transition: 'For instance' introduces it.</p>
                    <p>Revised: '...improves lives. For instance, phones make communication easy.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Paragraph 1: In 2023, a technology journal in Greenvale reported: 'Technology improves daily life.' The journal discussed innovations.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'Smartphones make communication effortless.' The journal highlighted devices."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "Paragraph 1: In 2024, a sports journal in Millville reported: 'Sports build character in youth.' The journal discussed athletics.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'Soccer teaches teamwork and discipline.' The journal highlighted specific sports.",
                question: "How to transition?",
                options: [
                    { text: "A) For example", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'For example' shows soccer as a case of character building."
            },
            {
                type: "example",
                title: "Example 5: Showing Cause",
                content: `
                    <h2>Example 5: Showing Cause</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Rain caused floods.</p>
                    <p>Step 2: Transition: 'Consequently' shows effect.</p>
                    <p>Revised: '...fell all day. Consequently, floods damaged homes.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Paragraph 1: In 2023, a weather journal in Clearwater reported: 'Heavy rain fell all day.' The journal discussed storm patterns.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'Floods damaged numerous homes.' The journal analyzed impacts."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "Paragraph 1: In 2024, a business journal in Greenvale reported: 'The factory shut down operations.' The journal discussed industry trends.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'Hundreds of jobs were lost.' The journal analyzed employment.",
                question: "How to transition?",
                options: [
                    { text: "A) As a result", correct: true },
                    { text: "B) On the contrary", correct: false },
                    { text: "C) Similarly", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'As a result' links closure to job loss."
            },
            {
                type: "example",
                title: "Example 6: Showing Similarity",
                content: `
                    <h2>Example 6: Showing Similarity</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Similar educational roles.</p>
                    <p>Step 2: Transition: 'Likewise' shows similarity.</p>
                    <p>Revised: '...educate readers. Likewise, films teach lessons too.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Paragraph 1: In 2023, a literary journal in Millville reported: 'Books educate readers on diverse topics.' The journal discussed reading.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'Films teach valuable lessons too.' The journal analyzed media."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "Paragraph 1: In 2024, an environmental journal in Clearwater reported: 'Cars contribute to air pollution.' The journal discussed emissions.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'Trucks degrade air quality similarly.' The journal analyzed transport impacts.",
                question: "How to transition?",
                options: [
                    { text: "A) Similarly", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) For instance", correct: false }
                ],
                explanation: "'Similarly' connects pollution from cars and trucks."
            },
            {
                type: "example",
                title: "Example 7: Sequencing",
                content: `
                    <h2>Example 7: Sequencing</h2>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Steps in process.</p>
                    <p>Step 2: Transition: 'Subsequently' shows order.</p>
                    <p>Revised: '...was made. Subsequently, it was carried out.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "Paragraph 1: In 2023, a project journal in Greenvale reported: 'The team finalized the project plan.' The journal discussed planning.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'The plan was carried out successfully.' The journal analyzed execution."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "Paragraph 1: In 2024, a business journal in Millville reported: 'They brainstormed innovative ideas.' The journal discussed strategy.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'They selected the most viable option.' The journal analyzed decision-making.",
                question: "How to transition?",
                options: [
                    { text: "A) Next", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Moreover", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'Next' shows the sequence of brainstorming then selecting."
            }
        ]
    }
};

// Quiz arrays (seven questions each, with 2 A, 2 B, 1 C, 1 D correct answers)
const transitionTypeQuestions = [
    // Original question
    {
        passage: "In 2024, a transportation journal in Clearwater reported: 'She was late for work. She missed the morning bus.' The journal discussed commuting challenges.",
        question: "What type of transition is needed?",
        answers: [
            { text: "A) Cause and effect", correct: true },
            { text: "B) Contrast", correct: false },
            { text: "C) Addition", correct: false },
            { text: "D) Sequence", correct: false }
        ],
        explanation: "Being late caused missing the bus, a cause-effect link.",
        difficulty: "easy",
        category: "transitions"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a weather journal in Greenvale reported: 'The temperature dropped sharply overnight. The pipes froze.' The journal analyzed winter impacts.",
        question: "What type of transition is needed?",
        answers: [
            { text: "A) Cause and effect", correct: true },
            { text: "B) Contrast", correct: false },
            { text: "C) Sequence", correct: false },
            { text: "D) Addition", correct: false }
        ],
        explanation: "Temperature drop caused pipes to freeze, suggesting cause-effect.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an academic journal in Millville reported: 'He reviewed the material thoroughly. He passed the exam.' The journal discussed study strategies.",
        question: "What type of transition is needed?",
        answers: [
            { text: "A) Cause and effect", correct: true },
            { text: "B) Example", correct: false },
            { text: "C) Contrast", correct: false },
            { text: "D) Comparison", correct: false }
        ],
        explanation: "Reviewing led to passing, indicating cause-effect.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a sports journal in Clearwater reported: 'The team lacked experience. They performed exceptionally.' The journal highlighted unexpected outcomes.",
        question: "What type of transition is needed?",
        answers: [
            { text: "A) Cause and effect", correct: false },
            { text: "B) Contrast", correct: true },
            { text: "C) Addition", correct: false },
            { text: "D) Sequence", correct: false }
        ],
        explanation: "Lack of experience vs. strong performance shows opposition.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a culinary journal in Greenvale reported: 'She prepared the ingredients carefully. She cooked a delicious meal.' The journal shared cooking tips.",
        question: "What type of transition is needed?",
        answers: [
            { text: "A) Contrast", correct: false },
            { text: "B) Sequence", correct: true },
            { text: "C) Example", correct: false },
            { text: "D) Conclusion", correct: false }
        ],
        explanation: "Preparing followed by cooking suggests a sequence.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a pet journal in Millville reported: 'Pets enhance family life. Dogs offer unconditional love.' The journal discussed pet benefits.",
        question: "What type of transition is needed?",
        answers: [
            { text: "A) Cause and effect", correct: false },
            { text: "B) Contrast", correct: false },
            { text: "C) Example", correct: true },
            { text: "D) Comparison", correct: false }
        ],
        explanation: "Dogs are an example of pets enhancing life.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a health journal in Clearwater reported: 'Bananas are rich in potassium. Apples provide essential nutrients too.' The journal discussed fruit benefits.",
        question: "What type of transition is needed?",
        answers: [
            { text: "A) Sequence", correct: false },
            { text: "B) Contrast", correct: false },
            { text: "C) Addition", correct: false },
            { text: "D) Comparison", correct: true }
        ],
        explanation: "Both fruits share nutritional benefits, suggesting comparison.",
        difficulty: "medium",
        category: "transitions"
    }
];

const transitionWordQuestions = [
    // Original question (modified to fit new passage structure)
    {
        passage: "In 2024, an academic journal in Greenvale reported: 'The test was challenging for all students. Everyone passed with high scores.' The journal discussed exam outcomes.",
        question: "What’s the best transition?",
        answers: [
            { text: "A) Nevertheless", correct: true },
            { text: "B) Therefore", correct: false },
            { text: "C) First", correct: false },
            { text: "D) Similarly", correct: false }
        ],
        explanation: "'Nevertheless' fits the contrast between difficulty and success.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a financial journal in Millville reported: 'She worked two jobs to save money. She bought a house.' The journal discussed personal finance.",
        question: "What’s the best transition?",
        answers: [
            { text: "A) Consequently", correct: true },
            { text: "B) However", correct: false },
            { text: "C) Meanwhile", correct: false },
            { text: "D) For instance", correct: false }
        ],
        explanation: "'Consequently' links working to buying as cause-effect.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a sports journal in Clearwater reported: 'The team lacked proper equipment. They won the match.' The journal highlighted resilience.",
        question: "What’s the best transition?",
        answers: [
            { text: "A) Despite this", correct: true },
            { text: "B) As a result", correct: false },
            { text: "C) Next", correct: false },
            { text: "D) In addition", correct: false }
        ],
        explanation: "'Despite this' contrasts lack of equipment with victory.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a pet journal in Greenvale reported: 'Pets require regular attention. Cats need daily feeding.' The journal shared care tips.",
        question: "What’s the best transition?",
        answers: [
            { text: "A) However", correct: false },
            { text: "B) For example", correct: true },
            { text: "C) Then", correct: false },
            { text: "D) Because", correct: false }
        ],
        explanation: "'For example' shows cats as a case of pet care needs.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a lifestyle journal in Millville reported: 'She planned her day carefully. She completed all her tasks.' The journal discussed productivity.",
        question: "What’s the best transition?",
        answers: [
            { text: "A) On the contrary", correct: false },
            { text: "B) Subsequently", correct: true },
            { text: "C) Moreover", correct: false },
            { text: "D) Similarly", correct: false }
        ],
        explanation: "'Subsequently' shows the sequence of planning then completing.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a health journal in Clearwater reported: 'The weather was freezing. We stayed warm indoors.' The journal discussed winter coping strategies.",
        question: "What’s the best transition?",
        answers: [
            { text: "A) Nevertheless", correct: false },
            { text: "B) For instance", correct: false },
            { text: "C) Because", correct: true },
            { text: "D) Next", correct: false }
        ],
        explanation: "'Because' links freezing weather to staying indoors.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a nutrition journal in Greenvale reported: 'Oranges are packed with vitamin C. Lemons offer comparable health benefits.' The journal discussed citrus fruits.",
        question: "What’s the best transition?",
        answers: [
            { text: "A) However", correct: false },
            { text: "B) Therefore", correct: false },
            { text: "C) First", correct: false },
            { text: "D) Likewise", correct: true }
        ],
        explanation: "'Likewise' highlights shared health benefits of oranges and lemons.",
        difficulty: "medium",
        category: "transitions"
    }
];

const sentenceTransitionQuestions = [
    // Original question (modified to fit new passage structure)
    {
        passage: "In 2024, a theater journal in Millville reported: 'He forgot his lines during the performance. He improvised brilliantly.' The journal discussed acting techniques.",
        question: "How to transition?",
        answers: [
            { text: "A) However", correct: true },
            { text: "B) As a result", correct: false },
            { text: "C) Next", correct: false },
            { text: "D) In addition", correct: false }
        ],
        explanation: "'However' connects forgetting to surprising success.",
        difficulty: "easy",
        category: "transitions"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, an academic journal in Greenvale reported: 'She revised her essay multiple times. She earned a top grade.' The journal analyzed writing strategies.",
        question: "How to transition?",
        answers: [
            { text: "A) As a result", correct: true },
            { text: "B) Despite this", correct: false },
            { text: "C) Meanwhile", correct: false },
            { text: "D) Similarly", correct: false }
        ],
        explanation: "'As a result' connects revising to earning a high grade.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a sports journal in Clearwater reported: 'The team was underprepared for the game. They secured a narrow victory.' The journal discussed unexpected wins.",
        question: "How to transition?",
        answers: [
            { text: "A) Nevertheless", correct: true },
            { text: "B) For example", correct: false },
            { text: "C) Then", correct: false },
            { text: "D) Because", correct: false }
        ],
        explanation: "'Nevertheless' contrasts underpreparation with victory.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a lifestyle journal in Millville reported: 'The city offers many attractions. The museum showcases local art.' The journal discussed tourism.",
        question: "How to transition?",
        answers: [
            { text: "A) However", correct: false },
            { text: "B) For instance", correct: true },
            { text: "C) Thus", correct: false },
            { text: "D) Next", correct: false }
        ],
        explanation: "'For instance' shows the museum as an attraction example.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a cooking journal in Greenvale reported: 'He chopped the vegetables precisely. He cooked a flavorful stew.' The journal shared recipes.",
        question: "How to transition?",
        answers: [
            { text: "A) On the contrary", correct: false },
            { text: "B) Afterward", correct: true },
            { text: "C) Moreover", correct: false },
            { text: "D) Similarly", correct: false }
        ],
        explanation: "'Afterward' shows the sequence of chopping then cooking.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a health journal in Clearwater reported: 'The storm caused power outages. Residents used candles for light.' The journal discussed emergency preparedness.",
        question: "How to transition?",
        answers: [
            { text: "A) Nevertheless", correct: false },
            { text: "B) For instance", correct: false },
            { text: "C) As a result", correct: true },
            { text: "D) Next", correct: false }
        ],
        explanation: "'As a result' links outages to using candles.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a pet journal in Millville reported: 'Dogs are affectionate pets. Cats display affection in their own way.' The journal compared pet behaviors.",
        question: "How to transition?",
        answers: [
            { text: "A) However", correct: false },
            { text: "B) Therefore", correct: false },
            { text: "C) First", correct: false },
            { text: "D) Similarly", correct: true }
        ],
        explanation: "'Similarly' connects affection in dogs and cats.",
        difficulty: "medium",
        category: "transitions"
    }
];

const paragraphTransitionQuestions = [
    // Original question (modified to fit new passage structure)
    {
        passage: "Paragraph 1: In 2024, a business journal in Greenvale reported: 'The new plan reduced operational costs.' The journal reviewed financial strategies.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'It improved overall efficiency.' The journal discussed outcomes.",
        question: "How to transition?",
        answers: [
            { text: "A) Furthermore", correct: true },
            { text: "B) On the contrary", correct: false },
            { text: "C) Because", correct: false },
            { text: "D) Meanwhile", correct: false }
        ],
        explanation: "'Furthermore' adds efficiency to cost-cutting benefits.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 1 (Correct: A)
    {
        passage: "Paragraph 1: In 2023, a policy journal in Millville reported: 'The regulation lowered emissions.' The journal discussed environmental policies.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'It faced public opposition.' The journal analyzed reactions.",
        question: "How to transition?",
        answers: [
            { text: "A) However", correct: true },
            { text: "B) As a result", correct: false },
            { text: "C) Next", correct: false },
            { text: "D) For instance", correct: false }
        ],
        explanation: "'However' contrasts emissions reduction with opposition.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 2 (Correct: A)
    {
        passage: "Paragraph 1: In 2024, a health journal in Clearwater reported: 'Exercise strengthens the body.' The journal promoted fitness.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'It boosts mental well-being.' The journal discussed wellness.",
        question: "How to transition?",
        answers: [
            { text: "A) In addition", correct: true },
            { text: "B) On the other hand", correct: false },
            { text: "C) Because", correct: false },
            { text: "D) Meanwhile", correct: false }
        ],
        explanation: "'In addition' adds mental benefits to physical ones.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 3 (Correct: B)
    {
        passage: "Paragraph 1: In 2023, a project journal in Greenvale reported: 'The initiative faced budget overruns.' The journal analyzed challenges.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'It delivered significant results.' The journal discussed outcomes.",
        question: "How to transition?",
        answers: [
            { text: "A) As a result", correct: false },
            { text: "B) Despite this", correct: true },
            { text: "C) For example", correct: false },
            { text: "D) Next", correct: false }
        ],
        explanation: "'Despite this' contrasts overruns with successful results.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 4 (Correct: B)
    {
        passage: "Paragraph 1: In 2024, a technology journal in Millville reported: 'Innovations streamline daily tasks.' The journal discussed tech advances.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'Smart devices automate chores.' The journal highlighted specific tech.",
        question: "How to transition?",
        answers: [
            { text: "A) However", correct: false },
            { text: "B) For instance", correct: true },
            { text: "C) Thus", correct: false },
            { text: "D) Similarly", correct: false }
        ],
        explanation: "'For instance' shows smart devices as an example of innovations.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 5 (Correct: C)
    {
        passage: "Paragraph 1: In 2023, an environmental journal in Clearwater reported: 'Deforestation reduced forest cover.' The journal discussed land use.<br/><br/>Paragraph 2: In 2023, the same journal reported: 'Wildlife populations declined.' The journal analyzed ecosystem impacts.",
        question: "How to transition?",
        answers: [
            { text: "A) In addition", correct: false },
            { text: "B) On the other hand", correct: false },
            { text: "C) As a result", correct: true },
            { text: "D) Meanwhile", correct: false }
        ],
        explanation: "'As a result' links deforestation to wildlife decline.",
        difficulty: "medium",
        category: "transitions"
    },
    // New question 6 (Correct: D)
    {
        passage: "Paragraph 1: In 2024, a cultural journal in Greenvale reported: 'Museums preserve history.' The journal discussed heritage.<br/><br/>Paragraph 2: In 2024, the same journal reported: 'Libraries safeguard knowledge too.' The journal highlighted cultural institutions.",
        question: "How to transition?",
        answers: [
            { text: "A) However", correct: false },
            { text: "B) For example", correct: false },
            { text: "C) Next", correct: false },
            { text: "D) Likewise", correct: true }
        ],
        explanation: "'Likewise' connects preservation roles of museums and libraries.",
        difficulty: "medium",
        category: "transitions"
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
                <div class="question-row writing-section">
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
                <div class="question-row writing-section">
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
        categoryStats["transitions"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["transitions"].incorrect++;
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
        case 1: return transitionTypeQuestions;
        case 2: return transitionWordQuestions;
        case 3: return sentenceTransitionQuestions;
        case 4: return paragraphTransitionQuestions;
        default: return transitionTypeQuestions;
    }
}

function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row writing-section">
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
    let totalCorrect = categoryStats["transitions"].correct;
    let totalAttempted = totalCorrect + categoryStats["transitions"].incorrect;

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
    localStorage.setItem(`transitions-lessonScore-${lessonId}`, score);
    console.log(`Saved transitions-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`transitions-lessonScore-${lessonId}`) || "Not completed yet";
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