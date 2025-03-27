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
        title: "Identifying the Correct Type of Transition",
        content: [
            {
                type: "example",
                title: "Example 1: Cause and Effect Transition",
                content: `
                    <h2>Example 1: Cause and Effect Transition</h2>
                    <p>Sentence: 'It rained heavily. The streets flooded.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Rain caused flooding.</p>
                    <p>Step 2: Identify: Shows cause-effect.</p>
                    <p>Type: Cause and effect (e.g., 'therefore').</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Sentence: 'He practiced daily. He won the race.' What type of transition is needed?",
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
                    <p>Sentence: 'She studied hard. She failed the test.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Effort vs. failure.</p>
                    <p>Step 2: Identify: Shows opposition.</p>
                    <p>Type: Contrast (e.g., 'however').</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Sentence: 'The team was tired. They kept playing.' What type of transition is needed?",
                options: [
                    { text: "A) Contrast", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Example", correct: false }
                ],
                explanation: "Tiredness vs. continuing shows opposition."
            },
            {
                type: "example",
                title: "Example 3: Sequence Transition",
                content: `
                    <h2>Example 3: Sequence Transition</h2>
                    <p>Sentence: 'She mixed the batter. She baked the cake.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Steps in order.</p>
                    <p>Step 2: Identify: Shows time sequence.</p>
                    <p>Type: Sequence (e.g., 'then').</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Sentence: 'He woke up early. He ate breakfast.' What type of transition is needed?",
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
                    <p>Sentence: 'The book was long. It was interesting.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Two related positive traits.</p>
                    <p>Step 2: Identify: Shows addition.</p>
                    <p>Type: Addition (e.g., 'and').</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Sentence: 'The movie was funny. It was exciting.' What type of transition is needed?",
                options: [
                    { text: "A) Addition", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Example", correct: false }
                ],
                explanation: "Funny and exciting are added traits."
            },
            {
                type: "example",
                title: "Example 5: Example Transition",
                content: `
                    <h2>Example 5: Example Transition</h2>
                    <p>Sentence: 'Sports are fun. Soccer is thrilling.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Soccer as a specific case.</p>
                    <p>Step 2: Identify: Shows example.</p>
                    <p>Type: Example (e.g., 'for example').</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Sentence: 'Pets need care. Dogs require walks.' What type of transition is needed?",
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
                    <p>Sentence: 'Cats are quiet. Dogs are quiet too.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Similarity between cats and dogs.</p>
                    <p>Step 2: Identify: Shows comparison.</p>
                    <p>Type: Comparison (e.g., 'similarly').</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Sentence: 'Apples are healthy. Oranges are healthy too.' What type of transition is needed?",
                options: [
                    { text: "A) Comparison", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Addition", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "Both fruits share a trait, suggesting comparison."
            },
            {
                type: "example",
                title: "Example 7: Conclusion Transition",
                content: `
                    <h2>Example 7: Conclusion Transition</h2>
                    <p>Sentence: 'We tried hard. We succeeded.'</p>
                    <p>Question: What type of transition is needed?</p>
                    <p>Step 1: Analyze: Effort led to a final outcome.</p>
                    <p>Step 2: Identify: Shows conclusion.</p>
                    <p>Type: Conclusion (e.g., 'in conclusion').</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Sentence: 'They debated all night. They reached an agreement.' What type of transition is needed?",
                options: [
                    { text: "A) Conclusion", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Example", correct: false }
                ],
                explanation: "Debate ending in agreement suggests a conclusion."
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
                    <p>Sentence: 'The project was complex. It required teamwork.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Additional detail about complexity.</p>
                    <p>Step 2: Choose: 'Moreover' adds related info.</p>
                    <p>Best: 'Moreover'.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Sentence: 'The plan failed. We learned a lot.' What’s the best transition?",
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
                    <p>Sentence: 'He was tired. He finished the race.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Tiredness vs. finishing.</p>
                    <p>Step 2: Choose: 'Nevertheless' shows defiance.</p>
                    <p>Best: 'Nevertheless'.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Sentence: 'She saved money. She bought a car.' What’s the best transition?",
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
                    <p>Sentence: 'Sports build skills. Soccer teaches teamwork.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Soccer as a specific case.</p>
                    <p>Step 2: Choose: 'For instance' introduces examples.</p>
                    <p>Best: 'For instance'.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Sentence: 'Pets are loyal. Dogs stay by your side.' What’s the best transition?",
                options: [
                    { text: "A) For example", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'For example' shows dogs as a case of loyalty."
            },
            {
                type: "example",
                title: "Example 4: Showing Sequence",
                content: `
                    <h2>Example 4: Showing Sequence</h2>
                    <p>Sentence: 'She packed her bags. She left for the trip.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Steps in order.</p>
                    <p>Step 2: Choose: 'Then' indicates next step.</p>
                    <p>Best: 'Then'.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Sentence: 'He wrote the essay. He submitted it.' What’s the best transition?",
                options: [
                    { text: "A) Next", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Moreover", correct: false },
                    { text: "D) Thus", correct: false }
                ],
                explanation: "'Next' shows the sequence of writing then submitting."
            },
            {
                type: "example",
                title: "Example 5: Showing Cause",
                content: `
                    <h2>Example 5: Showing Cause</h2>
                    <p>Sentence: 'The road was icy. Cars slid off.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Ice caused sliding.</p>
                    <p>Step 2: Choose: 'Because' explains why.</p>
                    <p>Best: 'Because'.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Sentence: 'It was hot. We stayed inside.' What’s the best transition?",
                options: [
                    { text: "A) Because", correct: true },
                    { text: "B) On the contrary", correct: false },
                    { text: "C) Similarly", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'Because' links heat to staying inside as a cause."
            },
            {
                type: "example",
                title: "Example 6: Showing Similarity",
                content: `
                    <h2>Example 6: Showing Similarity</h2>
                    <p>Sentence: 'Cats nap a lot. Dogs sleep often too.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Similar habits.</p>
                    <p>Step 2: Choose: 'Likewise' shows likeness.</p>
                    <p>Best: 'Likewise'.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Sentence: 'Apples are sweet. Pears taste sweet too.' What’s the best transition?",
                options: [
                    { text: "A) Similarly", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) For instance", correct: false }
                ],
                explanation: "'Similarly' highlights the shared sweetness."
            },
            {
                type: "example",
                title: "Example 7: Concluding",
                content: `
                    <h2>Example 7: Concluding</h2>
                    <p>Sentence: 'We tried many plans. One worked.'</p>
                    <p>Question: What’s the best transition?</p>
                    <p>Step 1: Context: Wrapping up efforts.</p>
                    <p>Step 2: Choose: 'Finally' ends the process.</p>
                    <p>Best: 'Finally'.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Sentence: 'They searched all day. They found the key.' What’s the best transition?",
                options: [
                    { text: "A) Finally", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Moreover", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'Finally' concludes the search with success."
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
                    <p>Sentences: 'The storm hit hard. Roads were blocked.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Storm caused road issues.</p>
                    <p>Step 2: Transition: 'As a result' shows effect.</p>
                    <p>Revised: 'The storm hit hard. As a result, roads were blocked.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Sentences: 'She studied all night. She aced the test.' How to transition?",
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
                    <p>Sentences: 'He trained for weeks. He lost the match.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Effort vs. outcome.</p>
                    <p>Step 2: Transition: 'Despite this' shows contrast.</p>
                    <p>Revised: 'He trained for weeks. Despite this, he lost the match.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Sentences: 'The team was small. They won the game.' How to transition?",
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
                    <p>Sentences: 'The city grew fast. New schools opened.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Growth led to more schools.</p>
                    <p>Step 2: Transition: 'Additionally' adds info.</p>
                    <p>Revised: 'The city grew fast. Additionally, new schools opened.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Sentences: 'The book was thick. It had great pictures.' How to transition?",
                options: [
                    { text: "A) Also", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'Also' adds pictures to the book’s traits."
            },
            {
                type: "example",
                title: "Example 4: Showing Sequence",
                content: `
                    <h2>Example 4: Showing Sequence</h2>
                    <p>Sentences: 'She wrote a draft. She revised it.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Steps in writing process.</p>
                    <p>Step 2: Transition: 'Afterward' shows order.</p>
                    <p>Revised: 'She wrote a draft. Afterward, she revised it.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Sentences: 'He cooked dinner. He cleaned up.' How to transition?",
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
                    <p>Sentences: 'Games are fun. Chess challenges the mind.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Chess as a specific game.</p>
                    <p>Step 2: Transition: 'For instance' gives an example.</p>
                    <p>Revised: 'Games are fun. For instance, chess challenges the mind.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Sentences: 'Jobs pay well. Teaching rewards you.' How to transition?",
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
                    <p>Sentences: 'Rain helps crops. Snow aids them too.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Similar effects on crops.</p>
                    <p>Step 2: Transition: 'Likewise' shows similarity.</p>
                    <p>Revised: 'Rain helps crops. Likewise, snow aids them too.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Sentences: 'Dogs are loyal. Cats are loyal too.' How to transition?",
                options: [
                    { text: "A) Similarly", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Then", correct: false },
                    { text: "D) In addition", correct: false }
                ],
                explanation: "'Similarly' connects the shared loyalty."
            },
            {
                type: "example",
                title: "Example 7: Concluding",
                content: `
                    <h2>Example 7: Concluding</h2>
                    <p>Sentences: 'We tried calling. We sent a text.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Final action after attempts.</p>
                    <p>Step 2: Transition: 'Ultimately' wraps it up.</p>
                    <p>Revised: 'We tried calling. Ultimately, we sent a text.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Sentences: 'They planned for days. They canceled.' How to transition?",
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
                    <p>Paragraph 1: 'The economy boomed last year.'</p>
                    <p>Paragraph 2: 'Unemployment rose this year.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Boom to unemployment shift.</p>
                    <p>Step 2: Transition: 'However' contrasts years.</p>
                    <p>Revised: '...boomed last year. However, unemployment rose this year.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Paragraph 1: 'The policy saved money.' Paragraph 2: 'It upset many people.' How to transition?",
                options: [
                    { text: "A) On the other hand", correct: true },
                    { text: "B) As a result", correct: false },
                    { text: "C) First", correct: false },
                    { text: "D) For instance", correct: false }
                ],
                explanation: "'On the other hand' contrasts savings with upset."
            },
            {
                type: "example",
                title: "Example 2: Building on Ideas",
                content: `
                    <h2>Example 2: Building on Ideas</h2>
                    <p>Paragraph 1: 'Exercise benefits health.'</p>
                    <p>Paragraph 2: 'Mental health also improves.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Health to mental health.</p>
                    <p>Step 2: Transition: 'Furthermore' extends benefits.</p>
                    <p>Revised: '...benefits health. Furthermore, mental health also improves.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Paragraph 1: 'The team trained hard.' Paragraph 2: 'They developed new strategies.' How to transition?",
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
                    <p>Paragraph 1: 'Costs rose due to delays.'</p>
                    <p>Paragraph 2: 'The project still succeeded.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Costs to success despite issues.</p>
                    <p>Step 2: Transition: 'Overall' sums up outcome.</p>
                    <p>Revised: '...due to delays. Overall, the project still succeeded.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Paragraph 1: 'Sales dropped last month.' Paragraph 2: 'Profits stayed high.' How to transition?",
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
                    <p>Paragraph 1: 'Tech improves lives.'</p>
                    <p>Paragraph 2: 'Phones make communication easy.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Phones as a tech example.</p>
                    <p>Step 2: Transition: 'For instance' introduces it.</p>
                    <p>Revised: '...improves lives. For instance, phones make communication easy.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Paragraph 1: 'Sports build character.' Paragraph 2: 'Soccer teaches teamwork.' How to transition?",
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
                    <p>Paragraph 1: 'Rain fell all day.'</p>
                    <p>Paragraph 2: 'Floods damaged homes.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Rain caused floods.</p>
                    <p>Step 2: Transition: 'Consequently' shows effect.</p>
                    <p>Revised: '...fell all day. Consequently, floods damaged homes.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Paragraph 1: 'The factory closed.' Paragraph 2: 'Jobs were lost.' How to transition?",
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
                    <p>Paragraph 1: 'Books educate readers.'</p>
                    <p>Paragraph 2: 'Films teach lessons too.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Similar educational roles.</p>
                    <p>Step 2: Transition: 'Likewise' shows similarity.</p>
                    <p>Revised: '...educate readers. Likewise, films teach lessons too.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Paragraph 1: 'Cars pollute.' Paragraph 2: 'Trucks harm air quality too.' How to transition?",
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
                    <p>Paragraph 1: 'The plan was made.'</p>
                    <p>Paragraph 2: 'It was carried out.'</p>
                    <p>Question: How to transition?</p>
                    <p>Step 1: Link: Steps in process.</p>
                    <p>Step 2: Transition: 'Subsequently' shows order.</p>
                    <p>Revised: '...was made. Subsequently, it was carried out.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Paragraph 1: 'They brainstormed ideas.' Paragraph 2: 'They chose the best one.' How to transition?",
                options: [
                    { text: "A) Next", correct: true },
                    { text: "B) However", correct: false },
                    { text: "C) Moreover", correct: false },
                    { text: "D) Because", correct: false }
                ],
                explanation: "'Next' shows the sequence of brainstorming then choosing."
            }
        ]
    }
};

// Transitions question arrays
const transitionTypeQuestions = [
    {
        question: "Sentence: 'She was late. She missed the bus.' What type of transition is needed?",
        answers: [
            { text: "A) Cause and effect", correct: true },
            { text: "B) Contrast", correct: false },
            { text: "C) Addition", correct: false },
            { text: "D) Sequence", correct: false }
        ],
        explanation: "Being late caused missing the bus, a cause-effect link.",
        difficulty: "easy",
        category: "transitions"
    }
];

const transitionWordQuestions = [
    {
        question: "Sentence: 'The test was tough. We all passed.' What’s the best transition?",
        answers: [
            { text: "A) Nevertheless", correct: true },
            { text: "B) Therefore", correct: false },
            { text: "C) First", correct: false },
            { text: "D) Similarly", correct: false }
        ],
        explanation: "'Nevertheless' fits the contrast between difficulty and success.",
        difficulty: "medium",
        category: "transitions"
    }
];

const sentenceTransitionQuestions = [
    {
        question: "Sentences: 'He forgot his lines. He improvised well.' How to transition?",
        answers: [
            { text: "A) However", correct: true },
            { text: "B) As a result", correct: false },
            { text: "C) Next", correct: false },
            { text: "D) In addition", correct: false }
        ],
        explanation: "'However' connects forgetting to surprising success.",
        difficulty: "easy",
        category: "transitions"
    }
];

const paragraphTransitionQuestions = [
    {
        question: "Paragraph 1: 'The plan cut costs.' Paragraph 2: 'It improved efficiency.' How to transition?",
        answers: [
            { text: "A) Furthermore", correct: true },
            { text: "B) On the contrary", correct: false },
            { text: "C) Because", correct: false },
            { text: "D) Meanwhile", correct: false }
        ],
        explanation: "'Furthermore' adds efficiency to cost-cutting benefits.",
        difficulty: "medium",
        category: "transitions"
    }
];

// lesson-transitions.js
let categoryStats = {
    "transitions": { correct: 0, incorrect: 0 }
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
    const passageMatch = content.match(/Sentence[s]?:.*?(?=<p>Question:|$)/is) || 
                        content.match(/Paragraph 1:.*?(?=Paragraph 2:|$)/is) || 
                        content.match(/<p>Sentence[s]?:.*?<\/p>/is);
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
        categoryStats["transitions"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["transitions"].incorrect++;
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
        case 1: quizQuestions = transitionTypeQuestions; break;
        case 2: quizQuestions = transitionWordQuestions; break;
        case 3: quizQuestions = sentenceTransitionQuestions; break;
        case 4: quizQuestions = paragraphTransitionQuestions; break;
        default: quizQuestions = transitionTypeQuestions;
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
        case 1: quizQuestions = transitionTypeQuestions; break;
        case 2: quizQuestions = transitionWordQuestions; break;
        case 3: quizQuestions = sentenceTransitionQuestions; break;
        case 4: quizQuestions = paragraphTransitionQuestions; break;
        default: quizQuestions = transitionTypeQuestions;
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
    localStorage.setItem(`transitions-lessonScore-${lessonId}`, score);
    console.log(`Saved transitions-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`transitions-lessonScore-${lessonId}`) || "Not completed yet";
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