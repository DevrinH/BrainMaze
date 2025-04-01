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
        title: "Identifying the Author’s Purpose",
        content: [
            {
                type: "example",
                title: "Example 1: Purpose of Persuasion",
                content: `
                    <h2>Example 1: Purpose of Persuasion</h2>
                    <p>Passage: 'We must act now to save our planet from climate change.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze intent: 'Must act now' urges action.</p>
                    <p>Step 2: Infer: Convincing readers to care and act.</p>
                    <p>Purpose: To persuade.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'Laughter is the best medicine for stress.' What is the author’s purpose?",
                options: [
                    { text: "A) To persuade", correct: true },
                    { text: "B) To entertain", correct: false },
                    { text: "C) To inform", correct: false },
                    { text: "D) To describe", correct: false }
                ],
                explanation: "'Best medicine' suggests convincing readers of laughter’s value."
            },
            {
                type: "example",
                title: "Example 2: Purpose of Information",
                content: `
                    <h2>Example 2: Purpose of Information</h2>
                    <p>Passage: 'The solar system has eight planets orbiting the sun.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Look at content: Factual, neutral statement.</p>
                    <p>Step 2: Infer: Sharing knowledge, not persuading.</p>
                    <p>Purpose: To inform.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'The battle lasted three days and ended in a truce.' What is the author’s purpose?",
                options: [
                    { text: "A) To inform", correct: true },
                    { text: "B) To persuade", correct: false },
                    { text: "C) To entertain", correct: false },
                    { text: "D) To criticize", correct: false }
                ],
                explanation: "Neutral facts about a battle aim to educate, not convince."
            },
            {
                type: "example",
                title: "Example 3: Purpose of Entertainment",
                content: `
                    <h2>Example 3: Purpose of Entertainment</h2>
                    <p>Passage: 'The dragon swooped down, sparking chaos and giggles.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Note tone: Playful, imaginative.</p>
                    <p>Step 2: Infer: Amusing readers with a fun story.</p>
                    <p>Purpose: To entertain.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'This policy will ruin us if unchanged.' What is the author’s purpose?",
                options: [
                    { text: "A) To persuade", correct: true },
                    { text: "B) To inform", correct: false },
                    { text: "C) To entertain", correct: false },
                    { text: "D) To describe", correct: false }
                ],
                explanation: "'Will ruin us' aims to convince readers to oppose the policy."
            },
            {
                type: "example",
                title: "Example 4: Purpose of Description",
                content: `
                    <h2>Example 4: Purpose of Description</h2>
                    <p>Passage: 'The sunset painted the sky with hues of orange and pink.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze: Vivid imagery, no argument.</p>
                    <p>Step 2: Infer: Creating a picture for the reader.</p>
                    <p>Purpose: To describe.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The clown juggled flaming torches to the crowd’s delight.' What is the author’s purpose?",
                options: [
                    { text: "A) To entertain", correct: true },
                    { text: "B) To persuade", correct: false },
                    { text: "C) To inform", correct: false },
                    { text: "D) To criticize", correct: false }
                ],
                explanation: "A fun, dramatic scene aims to amuse the reader."
            },
            {
                type: "example",
                title: "Example 5: Purpose of Criticism",
                content: `
                    <h2>Example 5: Purpose of Criticism</h2>
                    <p>Passage: 'The mayor’s plan is a reckless waste of funds.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Note tone: Negative, judgmental.</p>
                    <p>Step 2: Infer: Pointing out flaws to disapprove.</p>
                    <p>Purpose: To criticize.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'Water boils at 100°C under standard conditions.' What is the author’s purpose?",
                options: [
                    { text: "A) To inform", correct: true },
                    { text: "B) To persuade", correct: false },
                    { text: "C) To entertain", correct: false },
                    { text: "D) To describe", correct: false }
                ],
                explanation: "A factual statement educates without persuading."
            },
            {
                type: "example",
                title: "Example 6: Purpose of Inspiration",
                content: `
                    <h2>Example 6: Purpose of Inspiration</h2>
                    <p>Passage: 'You can overcome any obstacle with determination.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze: Uplifting, motivational tone.</p>
                    <p>Step 2: Infer: Encouraging readers to persevere.</p>
                    <p>Purpose: To inspire.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The forest was silent, dark, and vast.' What is the author’s purpose?",
                options: [
                    { text: "A) To describe", correct: true },
                    { text: "B) To persuade", correct: false },
                    { text: "C) To inform", correct: false },
                    { text: "D) To entertain", correct: false }
                ],
                explanation: "Vivid details aim to paint a scene, not convince."
            },
            {
                type: "example",
                title: "Example 7: Purpose of Warning",
                content: `
                    <h2>Example 7: Purpose of Warning</h2>
                    <p>Passage: 'Ignoring this issue will lead to disaster.'</p>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Note urgency: 'Will lead to disaster'.</p>
                    <p>Step 2: Infer: Cautioning readers to act.</p>
                    <p>Purpose: To warn.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'Trust me, this is the best choice for us all.' What is the author’s purpose?",
                options: [
                    { text: "A) To persuade", correct: true },
                    { text: "B) To inform", correct: false },
                    { text: "C) To entertain", correct: false },
                    { text: "D) To describe", correct: false }
                ],
                explanation: "'Trust me' and 'best choice' aim to convince."
            }
        ]
    },
    2: {
        title: "Recognizing Text Structures",
        content: [
            {
                type: "example",
                title: "Example 1: Cause and Effect",
                content: `
                    <h2>Example 1: Cause and Effect</h2>
                    <p>Passage: 'Heavy rain caused flooding in the city.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Identify pattern: Rain (cause), flooding (effect).</p>
                    <p>Step 2: Confirm: Explains why something happened.</p>
                    <p>Structure: Cause and effect.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'First, mix the ingredients; then, bake the cake.' What is the text structure?",
                options: [
                    { text: "A) Sequence", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Problem and solution", correct: false },
                    { text: "D) Description", correct: false }
                ],
                explanation: "'First' and 'then' indicate steps in order, a sequence."
            },
            {
                type: "example",
                title: "Example 2: Compare and Contrast",
                content: `
                    <h2>Example 2: Compare and Contrast</h2>
                    <p>Passage: 'Cats are independent, while dogs need more attention.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Spot clues: 'While' shows differences.</p>
                    <p>Step 2: Confirm: Highlights similarities and differences.</p>
                    <p>Structure: Compare and contrast.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'Unlike old methods, new tech saves time.' What is the text structure?",
                options: [
                    { text: "A) Compare and contrast", correct: true },
                    { text: "B) Sequence", correct: false },
                    { text: "C) Cause and effect", correct: false },
                    { text: "D) Description", correct: false }
                ],
                explanation: "'Unlike' shows a comparison between old and new."
            },
            {
                type: "example",
                title: "Example 3: Description",
                content: `
                    <h2>Example 3: Description</h2>
                    <p>Passage: 'The forest is lush, with tall trees and chirping birds.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Analyze: Details paint a picture.</p>
                    <p>Step 2: Confirm: No sequence or cause, just features.</p>
                    <p>Structure: Description.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The issue was hunger; the solution was food drives.' What is the text structure?",
                options: [
                    { text: "A) Problem and solution", correct: true },
                    { text: "B) Compare and contrast", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Cause and effect", correct: false }
                ],
                explanation: "Identifies a problem (hunger) and its fix (food drives)."
            },
            {
                type: "example",
                title: "Example 4: Sequence",
                content: `
                    <h2>Example 4: Sequence</h2>
                    <p>Passage: 'Plant the seeds, water them, and wait for growth.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Note order: Steps listed sequentially.</p>
                    <p>Step 2: Confirm: Instructions in a process.</p>
                    <p>Structure: Sequence.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The car broke down because of a flat tire.' What is the text structure?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Sequence", correct: false },
                    { text: "C) Description", correct: false },
                    { text: "D) Problem and solution", correct: false }
                ],
                explanation: "'Because' links a cause (tire) to an effect (breakdown)."
            },
            {
                type: "example",
                title: "Example 5: Problem and Solution",
                content: `
                    <h2>Example 5: Problem and Solution</h2>
                    <p>Passage: 'Traffic jams plagued the city, so they built a bypass.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Identify: Problem (jams), solution (bypass).</p>
                    <p>Step 2: Confirm: Offers a fix to an issue.</p>
                    <p>Structure: Problem and solution.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The room was bright, with large windows and white walls.' What is the text structure?",
                options: [
                    { text: "A) Description", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Sequence", correct: false },
                    { text: "D) Compare and contrast", correct: false }
                ],
                explanation: "Details describe the room’s features."
            },
            {
                type: "example",
                title: "Example 6: Order of Importance",
                content: `
                    <h2>Example 6: Order of Importance</h2>
                    <p>Passage: 'Safety is critical, followed by cost and convenience.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Note ranking: Safety first, then others.</p>
                    <p>Step 2: Confirm: Prioritizes elements.</p>
                    <p>Structure: Order of importance.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'Birds have feathers, unlike reptiles with scales.' What is the text structure?",
                options: [
                    { text: "A) Compare and contrast", correct: true },
                    { text: "B) Description", correct: false },
                    { text: "C) Cause and effect", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "'Unlike' contrasts birds and reptiles."
            },
            {
                type: "example",
                title: "Example 7: Spatial",
                content: `
                    <h2>Example 7: Spatial</h2>
                    <p>Passage: 'The park has a fountain in the center and benches around it.'</p>
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Analyze: Describes layout by position.</p>
                    <p>Step 2: Confirm: Location-based details.</p>
                    <p>Structure: Spatial.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'Studying hard leads to good grades.' What is the text structure?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Sequence", correct: false },
                    { text: "C) Description", correct: false },
                    { text: "D) Problem and solution", correct: false }
                ],
                explanation: "'Leads to' shows studying causes good grades."
            }
        ]
    },
    3: {
        title: "Understanding How Ideas are Organized",
        content: [
            {
                type: "example",
                title: "Example 1: Chronological Order",
                content: `
                    <h2>Example 1: Chronological Order</h2>
                    <p>Passage: 'In 1900, the town was founded; by 1950, it thrived.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Look for time: 1900, then 1950.</p>
                    <p>Step 2: Infer: Events in time order.</p>
                    <p>Organization: Chronological.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The fire started, then spread quickly.' How are ideas organized?",
                options: [
                    { text: "A) Chronological", correct: true },
                    { text: "B) Spatial", correct: false },
                    { text: "C) Importance", correct: false },
                    { text: "D) Logical", correct: false }
                ],
                explanation: "'Started, then spread' follows a time sequence."
            },
            {
                type: "example",
                title: "Example 2: Logical Order",
                content: `
                    <h2>Example 2: Logical Order</h2>
                    <p>Passage: 'Education improves skills, leading to better jobs.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Trace flow: Skills to jobs.</p>
                    <p>Step 2: Infer: Cause to result.</p>
                    <p>Organization: Logical (cause-effect).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'Poverty increased crime, which strained police.' How are ideas organized?",
                options: [
                    { text: "A) Cause to effect", correct: true },
                    { text: "B) Spatial", correct: false },
                    { text: "C) Chronological", correct: false },
                    { text: "D) Importance", correct: false }
                ],
                explanation: "Poverty causes crime, then strain—logical cause-effect flow."
            },
            {
                type: "example",
                title: "Example 3: Spatial Order",
                content: `
                    <h2>Example 3: Spatial Order</h2>
                    <p>Passage: 'The room’s left wall was blue, the right red.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Note layout: Left, then right.</p>
                    <p>Step 2: Infer: Describes by position.</p>
                    <p>Organization: Spatial.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The garden has roses in front and tulips in back.' How are ideas organized?",
                options: [
                    { text: "A) Spatial", correct: true },
                    { text: "B) Chronological", correct: false },
                    { text: "C) Logical", correct: false },
                    { text: "D) Importance", correct: false }
                ],
                explanation: "'In front and back' describes layout by location."
            },
            {
                type: "example",
                title: "Example 4: Order of Importance",
                content: `
                    <h2>Example 4: Order of Importance</h2>
                    <p>Passage: 'Safety is key, but cost matters too.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Note priority: Safety first, then cost.</p>
                    <p>Step 2: Infer: Ranked by significance.</p>
                    <p>Organization: Order of importance.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'Health is vital, followed by education and leisure.' How are ideas organized?",
                options: [
                    { text: "A) Importance", correct: true },
                    { text: "B) Chronological", correct: false },
                    { text: "C) Spatial", correct: false },
                    { text: "D) Logical", correct: false }
                ],
                explanation: "'Vital, followed by' ranks ideas by priority."
            },
            {
                type: "example",
                title: "Example 5: Problem-Solution Order",
                content: `
                    <h2>Example 5: Problem-Solution Order</h2>
                    <p>Passage: 'Noise was a problem, so they added insulation.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Identify: Problem (noise), solution (insulation).</p>
                    <p>Step 2: Infer: Issue then fix.</p>
                    <p>Organization: Problem-solution.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'Flooding was an issue, so they built dams.' How are ideas organized?",
                options: [
                    { text: "A) Problem-solution", correct: true },
                    { text: "B) Chronological", correct: false },
                    { text: "C) Spatial", correct: false },
                    { text: "D) Logical", correct: false }
                ],
                explanation: "Problem (flooding) followed by solution (dams)."
            },
            {
                type: "example",
                title: "Example 6: Comparison Order",
                content: `
                    <h2>Example 6: Comparison Order</h2>
                    <p>Passage: 'Trains are fast, unlike buses which are slow.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Spot contrast: Trains vs. buses.</p>
                    <p>Step 2: Infer: Differences highlighted.</p>
                    <p>Organization: Comparison.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'Summer is hot, while winter is cold.' How are ideas organized?",
                options: [
                    { text: "A) Comparison", correct: true },
                    { text: "B) Chronological", correct: false },
                    { text: "C) Spatial", correct: false },
                    { text: "D) Importance", correct: false }
                ],
                explanation: "'While' contrasts summer and winter."
            },
            {
                type: "example",
                title: "Example 7: Descriptive Order",
                content: `
                    <h2>Example 7: Descriptive Order</h2>
                    <p>Passage: 'The house has a red roof and green shutters.'</p>
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Analyze: Features listed.</p>
                    <p>Step 2: Infer: Details without sequence or cause.</p>
                    <p>Organization: Descriptive.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The cake was chocolate with creamy frosting.' How are ideas organized?",
                options: [
                    { text: "A) Descriptive", correct: true },
                    { text: "B) Chronological", correct: false },
                    { text: "C) Logical", correct: false },
                    { text: "D) Spatial", correct: false }
                ],
                explanation: "Details describe the cake’s features."
            }
        ]
    },
    4: {
        title: "Evaluating Rhetorical Strategies",
        content: [
            {
                type: "example",
                title: "Example 1: Emotional Appeal",
                content: `
                    <h2>Example 1: Emotional Appeal</h2>
                    <p>Passage: 'Imagine the despair of homeless children.'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Analyze: 'Despair' and 'imagine' evoke feelings.</p>
                    <p>Step 2: Infer: Appeals to empathy.</p>
                    <p>Strategy: Emotional appeal (pathos).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'Experts agree this plan works.' What rhetorical strategy is used?",
                options: [
                    { text: "A) Credibility (ethos)", correct: true },
                    { text: "B) Emotional appeal (pathos)", correct: false },
                    { text: "C) Logical appeal (logos)", correct: false },
                    { text: "D) Repetition", correct: false }
                ],
                explanation: "'Experts agree' builds trust using authority."
            },
            {
                type: "example",
                title: "Example 2: Logical Appeal",
                content: `
                    <h2>Example 2: Logical Appeal</h2>
                    <p>Passage: 'Studies show recycling cuts waste by 30%.'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Note: 'Studies' and '30%' provide evidence.</p>
                    <p>Step 2: Infer: Appeals to reason.</p>
                    <p>Strategy: Logical appeal (logos).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'Act now, or lose everything!' What rhetorical strategy is used?",
                options: [
                    { text: "A) Emotional appeal (pathos)", correct: true },
                    { text: "B) Logical appeal (logos)", correct: false },
                    { text: "C) Credibility (ethos)", correct: false },
                    { text: "D) Contrast", correct: false }
                ],
                explanation: "'Lose everything' stirs fear and urgency."
            },
            {
                type: "example",
                title: "Example 3: Repetition",
                content: `
                    <h2>Example 3: Repetition</h2>
                    <p>Passage: 'We will fight, we will win, we will rise.'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Spot pattern: Repeated 'we will'.</p>
                    <p>Step 2: Infer: Emphasizes determination.</p>
                    <p>Strategy: Repetition.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'Data proves this method succeeds.' What rhetorical strategy is used?",
                options: [
                    { text: "A) Logical appeal (logos)", correct: true },
                    { text: "B) Emotional appeal (pathos)", correct: false },
                    { text: "C) Credibility (ethos)", correct: false },
                    { text: "D) Repetition", correct: false }
                ],
                explanation: "'Data proves' uses evidence to appeal to reason."
            },
            {
                type: "example",
                title: "Example 4: Credibility",
                content: `
                    <h2>Example 4: Credibility</h2>
                    <p>Passage: 'As a doctor, I recommend this treatment.'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Note: 'As a doctor' establishes authority.</p>
                    <p>Step 2: Infer: Builds trust.</p>
                    <p>Strategy: Credibility (ethos).</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'Think of the joy this will bring!' What rhetorical strategy is used?",
                options: [
                    { text: "A) Emotional appeal (pathos)", correct: true },
                    { text: "B) Logical appeal (logos)", correct: false },
                    { text: "C) Credibility (ethos)", correct: false },
                    { text: "D) Repetition", correct: false }
                ],
                explanation: "'Joy' appeals to positive emotions."
            },
            {
                type: "example",
                title: "Example 5: Contrast",
                content: `
                    <h2>Example 5: Contrast</h2>
                    <p>Passage: 'Yesterday we struggled; today we thrive.'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Spot: Past vs. present.</p>
                    <p>Step 2: Infer: Highlights change for effect.</p>
                    <p>Strategy: Contrast.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'Unlike chaos, this brings order.' What rhetorical strategy is used?",
                options: [
                    { text: "A) Contrast", correct: true },
                    { text: "B) Emotional appeal (pathos)", correct: false },
                    { text: "C) Logical appeal (logos)", correct: false },
                    { text: "D) Credibility (ethos)", correct: false }
                ],
                explanation: "'Unlike' contrasts chaos and order."
            },
            {
                type: "example",
                title: "Example 6: Analogy",
                content: `
                    <h2>Example 6: Analogy</h2>
                    <p>Passage: 'Life is like a river, always flowing.'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Note: Compares life to a river.</p>
                    <p>Step 2: Infer: Clarifies through similarity.</p>
                    <p>Strategy: Analogy.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'Our team is a well-oiled machine.' What rhetorical strategy is used?",
                options: [
                    { text: "A) Analogy", correct: true },
                    { text: "B) Repetition", correct: false },
                    { text: "C) Emotional appeal (pathos)", correct: false },
                    { text: "D) Logical appeal (logos)", correct: false }
                ],
                explanation: "Compares team to a machine for clarity."
            },
            {
                type: "example",
                title: "Example 7: Hyperbole",
                content: `
                    <h2>Example 7: Hyperbole</h2>
                    <p>Passage: 'This task will take a million years!'</p>
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Recognize: Exaggeration for effect.</p>
                    <p>Step 2: Infer: Emphasizes difficulty.</p>
                    <p>Strategy: Hyperbole.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'I’ve told you a thousand times!' What rhetorical strategy is used?",
                options: [
                    { text: "A) Hyperbole", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Credibility (ethos)", correct: false },
                    { text: "D) Logical appeal (logos)", correct: false }
                ],
                explanation: "'Thousand times' exaggerates for emphasis."
            }
        ]
    }
};

// Text Structure and Purpose question arrays
const authorPurposeQuestions = [
    {
        question: "Passage: 'This policy will ruin us if unchanged.' What is the author’s purpose?",
        answers: [
            { text: "A) To persuade", correct: true },
            { text: "B) To inform", correct: false },
            { text: "C) To entertain", correct: false },
            { text: "D) To describe", correct: false }
        ],
        explanation: "'Will ruin us' aims to convince readers to oppose the policy.",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    }
];

const textStructureQuestions = [
    {
        question: "Passage: 'Unlike old methods, new tech saves time.' What is the text structure?",
        answers: [
            { text: "A) Compare and contrast", correct: true },
            { text: "B) Sequence", correct: false },
            { text: "C) Cause and effect", correct: false },
            { text: "D) Description", correct: false }
        ],
        explanation: "'Unlike' shows a comparison between old and new.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    }
];

const ideaOrganizationQuestions = [
    {
        question: "Passage: 'The fire started, then spread quickly.' How are ideas organized?",
        answers: [
            { text: "A) Chronological", correct: true },
            { text: "B) Spatial", correct: false },
            { text: "C) Importance", correct: false },
            { text: "D) Logical", correct: false }
        ],
        explanation: "'Started, then spread' follows a time sequence.",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    }
];

const rhetoricalStrategiesQuestions = [
    {
        question: "Passage: 'Data proves this method succeeds.' What rhetorical strategy is used?",
        answers: [
            { text: "A) Logical appeal (logos)", correct: true },
            { text: "B) Emotional appeal (pathos)", correct: false },
            { text: "C) Credibility (ethos)", correct: false },
            { text: "D) Repetition", correct: false }
        ],
        explanation: "'Data proves' uses evidence to appeal to reason.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    }
];

// lesson-text-structure-and-purpose.js

// Variables
let categoryStats = {
    "text-structure-and-purpose": { correct: 0, incorrect: 0 }
};
let currentItemIndex = 0;
let currentLesson = "1"; // Default as string to match lessons object keys
let progressSteps = 0;
let totalSteps = 0; // Set dynamically in startLesson
let isQuizPhase = false;
let showingQuizTransition = false; // Flag for quiz transition
let currentQuestionIndex = 0;

// Progress bar update function
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

// DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || '1'; // Ensure string
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

// Start lesson
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

// Show lesson item
function showItem() {
    console.log("Showing item for lesson:", currentLesson, "index:", currentItemIndex);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons && lessons[currentLesson] && lessons[currentLesson].content[currentItemIndex]) {
        const item = lessons[currentLesson].content[currentItemIndex];
        lessonContent.innerHTML = '';
        if (item.type === "example") {
            lessonContent.innerHTML = `
                <div class="question-row">
                    <div class="passage-text">${extractPassage(item.content)}</div>
                    <div class="right-column">
                        <div class="question-text">${item.content.replace(extractPassage(item.content), '')}</div>
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
        progressSteps = currentItemIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("No more lesson content, proceeding to quiz transition");
        showQuizTransition();
    }
}

// Extract passage from content
function extractPassage(content) {
    const passageMatch = content.match(/Passage:.*?['"].*?['"]/i) || content.match(/<p>Passage:.*?<\/p>/i);
    return passageMatch ? passageMatch[0] : "";
}

// Handle answer selection
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
        categoryStats["text-structure-and-purpose"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["text-structure-and-purpose"].incorrect++;
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

// Next lesson item
function nextItem() {
    currentItemIndex++;
    console.log("nextItem called, currentItemIndex:", currentItemIndex);
    if (currentItemIndex < lessons[currentLesson].content.length) {
        showItem();
    } else if (!showingQuizTransition) {
        showQuizTransition();
    }
}

// Show quiz transition screen
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
                    <button id="start-quiz-btn" class="btn next-btn">Next</button>
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

// Start quiz
function showQuiz() {
    console.log("Starting quiz for lesson:", currentLesson);
    isQuizPhase = true;
    currentQuestionIndex = 0;
    let quizQuestions = getQuizQuestions(currentLesson);
    progressSteps = lessons[currentLesson].content.length + 1;
    updateProgressBar(progressSteps);
    showNextQuizQuestion(quizQuestions);
}

// Get quiz questions based on lesson
function getQuizQuestions(lessonId) {
    switch (parseInt(lessonId)) {
        case 1: return authorPurposeQuestions;
        case 2: return textStructureQuestions;
        case 3: return ideaOrganizationQuestions;
        case 4: return rhetoricalStrategiesQuestions;
        default: return authorPurposeQuestions;
    }
}

// Show next quiz question
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
        progressSteps = lessons[currentLesson].content.length + currentQuestionIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("Quiz complete, showing final score");
        showFinalScore();
    }
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
}

// Show final score
function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["text-structure-and-purpose"].correct;
    let totalAttempted = totalCorrect + categoryStats["text-structure-and-purpose"].incorrect;

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
    if (finalScoreElement) finalScoreElement.classList.add('hide'); // Hide if exists
    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

// Record test results
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

// Log final score
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

// Save score
function saveScore(lessonId, score) {
    localStorage.setItem(`text-structure-and-purpose-lessonScore-${lessonId}`, score);
    console.log(`Saved text-structure-and-purpose-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`text-structure-and-purpose-lessonScore-${lessonId}`) || "Not completed yet";
}

// Show score on page load
function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        const score = getScore(currentLesson);
        scoreDisplay.innerHTML = `Previous Score for Lesson ${currentLesson}: ${score}`;
    } else {
        console.log("Score display element not found, skipping showScore");
    }
}