// Variables (aligned with SAT structure)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "text-structure-and-purpose": { correct: 0, incorrect: 0 }
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
        title: "Identifying the Author’s Purpose",
        content: [
            {
                type: "example",
                title: "Example 1: Purpose of Persuasion",
                content: `
                    <h2>Example 1: Purpose of Persuasion</h2>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze intent: 'Must act now' urges action.</p>
                    <p>Step 2: Infer: Convincing readers to care and act.</p>
                    <p>Purpose: To persuade.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale stated: 'We must act now to save our planet from climate change.' The journal advocated for sustainable policies."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a health journal in Millville reported: 'Laughter is the best medicine for stress.' The journal promoted wellness practices.",
                question: "What is the author’s purpose?",
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
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Look at content: Factual, neutral statement.</p>
                    <p>Step 2: Infer: Sharing knowledge, not persuading.</p>
                    <p>Purpose: To inform.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a science journal in Clearwater reported: 'The solar system has eight planets orbiting the sun.' The journal provided astronomical facts."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a historical journal in Greenvale reported: 'The battle lasted three days and ended in a truce.' The journal documented regional conflicts.",
                question: "What is the author’s purpose?",
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
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Note tone: Playful, imaginative.</p>
                    <p>Step 2: Infer: Amusing readers with a fun story.</p>
                    <p>Purpose: To entertain.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Millville reported: 'The dragon swooped down, sparking chaos and giggles among the villagers.' The journal explored fantasy narratives."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a political journal in Clearwater reported: 'This policy will ruin our economy if unchanged.' The journal critiqued government decisions.",
                question: "What is the author’s purpose?",
                options: [
                    { text: "A) To persuade", correct: true },
                    { text: "B) To inform", correct: false },
                    { text: "C) To entertain", correct: false },
                    { text: "D) To describe", correct: false }
                ],
                explanation: "'Will ruin' aims to convince readers to oppose the policy."
            },
            {
                type: "example",
                title: "Example 4: Purpose of Description",
                content: `
                    <h2>Example 4: Purpose of Description</h2>
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze: Vivid imagery, no argument.</p>
                    <p>Step 2: Infer: Creating a picture for the reader.</p>
                    <p>Purpose: To describe.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Greenvale reported: 'The sunset painted the sky with hues of orange and pink.' The journal highlighted scenic destinations."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a cultural journal in Millville reported: 'The clown juggled flaming torches to the crowd’s delight.' The journal discussed festival performances.",
                question: "What is the author’s purpose?",
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
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Note tone: Negative, judgmental.</p>
                    <p>Step 2: Infer: Pointing out flaws to disapprove.</p>
                    <p>Purpose: To criticize.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a political journal in Clearwater reported: 'The mayor’s plan is a reckless waste of public funds.' The journal critiqued local governance."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a science journal in Greenvale reported: 'Water boils at 100°C under standard conditions.' The journal provided chemical properties.",
                question: "What is the author’s purpose?",
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
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Analyze: Uplifting, motivational tone.</p>
                    <p>Step 2: Infer: Encouraging readers to persevere.</p>
                    <p>Purpose: To inspire.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a motivational journal in Millville reported: 'You can overcome any obstacle with determination.' The journal promoted personal growth."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a nature journal in Clearwater reported: 'The forest was silent, dark, and vast, a timeless refuge.' The journal described wilderness areas.",
                question: "What is the author’s purpose?",
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
                    <p>Question: What is the author’s purpose?</p>
                    <p>Step 1: Note urgency: 'Will lead to disaster'.</p>
                    <p>Step 2: Infer: Cautioning readers to act.</p>
                    <p>Purpose: To warn.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale reported: 'Ignoring this pollution issue will lead to ecological disaster.' The journal urged conservation efforts."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a political journal in Millville reported: 'Trust me, this is the best choice for our community’s future.' The journal endorsed local policies.",
                question: "What is the author’s purpose?",
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
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Identify pattern: Rain (cause), flooding (effect).</p>
                    <p>Step 2: Confirm: Explains why something happened.</p>
                    <p>Structure: Cause and effect.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather journal in Clearwater reported: 'Heavy rainfall caused flooding in the city streets.' The journal analyzed climate impacts."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a cooking journal in Greenvale reported: 'First, mix the ingredients; then, bake the cake for 30 minutes.' The journal provided recipes.",
                question: "What is the text structure?",
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
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Spot clues: 'While' shows differences.</p>
                    <p>Step 2: Confirm: Highlights similarities and differences.</p>
                    <p>Structure: Compare and contrast.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a pet journal in Millville reported: 'Cats are independent, while dogs need more attention.' The journal discussed pet care."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a technology journal in Clearwater reported: 'Unlike traditional methods, new technology saves significant time.' The journal explored innovations.",
                question: "What is the text structure?",
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
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Analyze: Details paint a picture.</p>
                    <p>Step 2: Confirm: No sequence or cause, just features.</p>
                    <p>Structure: Description.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a nature journal in Greenvale reported: 'The forest is lush, with tall trees and chirping birds.' The journal described ecosystems."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a community journal in Millville reported: 'Hunger was a major issue, so food drives were organized.' The journal discussed local initiatives.",
                question: "What is the text structure?",
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
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Note order: Steps listed sequentially.</p>
                    <p>Step 2: Confirm: Instructions in a process.</p>
                    <p>Structure: Sequence.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a gardening journal in Clearwater reported: 'Plant the seeds, water them, and wait for growth.' The journal provided gardening tips."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a mechanical journal in Greenvale reported: 'The car broke down because of a flat tire.' The journal discussed vehicle maintenance.",
                question: "What is the text structure?",
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
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Identify: Problem (jams), solution (bypass).</p>
                    <p>Step 2: Confirm: Offers a fix to an issue.</p>
                    <p>Structure: Problem and solution.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an urban journal in Millville reported: 'Traffic jams plagued the city, so they built a bypass.' The journal discussed city planning."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, an interior design journal in Clearwater reported: 'The room was bright, with large windows and white walls.' The journal described home aesthetics.",
                question: "What is the text structure?",
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
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Note ranking: Safety first, then others.</p>
                    <p>Step 2: Confirm: Prioritizes elements.</p>
                    <p>Structure: Order of importance.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Greenvale reported: 'Safety is critical, followed by cost and convenience.' The journal discussed project priorities."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a biology journal in Millville reported: 'Birds have feathers, unlike reptiles with scales.' The journal compared animal traits.",
                question: "What is the text structure?",
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
                    <p>Question: What is the text structure?</p>
                    <p>Step 1: Analyze: Describes layout by position.</p>
                    <p>Step 2: Confirm: Location-based details.</p>
                    <p>Structure: Spatial.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a community journal in Clearwater reported: 'The park has a fountain in the center and benches around it.' The journal described public spaces."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, an education journal in Greenvale reported: 'Studying hard leads to good grades.' The journal discussed academic success.",
                question: "What is the text structure?",
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
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Look for time: 1900, then 1950.</p>
                    <p>Step 2: Infer: Events in time order.</p>
                    <p>Organization: Chronological.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a historical journal in Millville reported: 'In 1900, the town was founded; by 1950, it thrived as a trade hub.' The journal documented regional history."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a news journal in Greenvale reported: 'The fire started in the evening, then spread quickly overnight.' The journal covered local incidents.",
                question: "How are ideas organized?",
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
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Trace flow: Skills to jobs.</p>
                    <p>Step 2: Infer: Cause to result.</p>
                    <p>Organization: Logical (cause-effect).</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an education journal in Clearwater reported: 'Education improves skills, leading to better job opportunities.' The journal discussed career paths."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a sociology journal in Millville reported: 'Poverty increased crime rates, which strained police resources.' The journal analyzed urban issues.",
                question: "How are ideas organized?",
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
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Note layout: Left, then right.</p>
                    <p>Step 2: Infer: Describes by position.</p>
                    <p>Organization: Spatial.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an interior design journal in Greenvale reported: 'The room’s left wall was blue, the right wall red.' The journal described home decor."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a gardening journal in Clearwater reported: 'The garden has roses in front and tulips in the back.' The journal described landscaping.",
                question: "How are ideas organized?",
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
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Note priority: Safety first, then cost.</p>
                    <p>Step 2: Infer: Ranked by significance.</p>
                    <p>Organization: Order of importance.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Millville reported: 'Safety is the key priority, but cost matters too.' The journal discussed project management."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a health journal in Greenvale reported: 'Health is vital, followed by education and leisure.' The journal discussed wellness priorities.",
                question: "How are ideas organized?",
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
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Identify: Problem (noise), solution (insulation).</p>
                    <p>Step 2: Infer: Issue then fix.</p>
                    <p>Organization: Problem-solution.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an urban journal in Clearwater reported: 'Noise pollution was a problem, so they added soundproof insulation.' The journal discussed city improvements."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, an environmental journal in Millville reported: 'Flooding was a recurring issue, so they constructed dams.' The journal discussed infrastructure solutions.",
                question: "How are ideas organized?",
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
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Spot contrast: Trains vs. buses.</p>
                    <p>Step 2: Infer: Differences highlighted.</p>
                    <p>Organization: Comparison.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a transportation journal in Greenvale reported: 'Trains are fast and efficient, unlike buses which are slower.' The journal compared transit options."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a cultural journal in Clearwater reported: 'Summer is hot and vibrant, while winter is cold and quiet.' The journal discussed seasonal impacts.",
                question: "How are ideas organized?",
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
                    <p>Question: How are ideas organized?</p>
                    <p>Step 1: Analyze: Features listed.</p>
                    <p>Step 2: Infer: Details without sequence or cause.</p>
                    <p>Organization: Descriptive.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a culinary journal in Millville reported: 'The house has a red roof and green shutters.' The journal described architectural styles."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a food journal in Greenvale reported: 'The cake was chocolate with creamy frosting.' The journal described dessert trends.",
                question: "How are ideas organized?",
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
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Analyze: 'Despair' and 'imagine' evoke feelings.</p>
                    <p>Step 2: Infer: Appeals to empathy.</p>
                    <p>Strategy: Emotional appeal (pathos).</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'Imagine the despair of homeless children without shelter.' The journal advocated for charity."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a political journal in Greenvale reported: 'Experts agree this policy is effective.' The journal endorsed government reforms.",
                question: "What rhetorical strategy is used?",
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
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Note: 'Studies' and '30%' provide evidence.</p>
                    <p>Step 2: Infer: Appeals to reason.</p>
                    <p>Strategy: Logical appeal (logos).</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Millville reported: 'Studies show recycling cuts waste by 30%.' The journal promoted sustainable practices."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a social journal in Clearwater reported: 'Act now, or lose everything to this crisis!' The journal urged community action.",
                question: "What rhetorical strategy is used?",
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
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Spot pattern: Repeated 'we will'.</p>
                    <p>Step 2: Infer: Emphasizes determination.</p>
                    <p>Strategy: Repetition.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a political journal in Greenvale reported: 'We will fight, we will win, we will rise.' The journal rallied support for a cause."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a science journal in Millville reported: 'Data proves this conservation method succeeds.' The journal discussed environmental solutions.",
                question: "What rhetorical strategy is used?",
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
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Note: 'As a doctor' establishes authority.</p>
                    <p>Step 2: Infer: Builds trust.</p>
                    <p>Strategy: Credibility (ethos).</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Clearwater reported: 'As a doctor, I recommend this treatment for optimal health.' The journal discussed medical advice."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a community journal in Greenvale reported: 'Think of the joy this project will bring to our children!' The journal promoted local initiatives.",
                question: "What rhetorical strategy is used?",
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
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Spot: Past vs. present.</p>
                    <p>Step 2: Infer: Highlights change for effect.</p>
                    <p>Strategy: Contrast.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Millville reported: 'Yesterday we struggled; today we thrive.' The journal discussed community progress."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a political journal in Clearwater reported: 'Unlike chaos, this policy brings order.' The journal endorsed governance reforms.",
                question: "What rhetorical strategy is used?",
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
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Note: Compares life to a river.</p>
                    <p>Step 2: Infer: Clarifies through similarity.</p>
                    <p>Strategy: Analogy.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Greenvale reported: 'Life is like a river, always flowing forward.' The journal explored philosophical themes."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a business journal in Millville reported: 'Our team is a well-oiled machine, running smoothly.' The journal discussed workplace efficiency.",
                question: "What rhetorical strategy is used?",
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
                    <p>Question: What rhetorical strategy is used?</p>
                    <p>Step 1: Recognize: Exaggeration for effect.</p>
                    <p>Step 2: Infer: Emphasizes difficulty.</p>
                    <p>Strategy: Hyperbole.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'This task will take a million years to complete!' The journal discussed community projects."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a parenting journal in Greenvale reported: 'I’ve told you a thousand times to clean your room!' The journal discussed family dynamics.",
                question: "What rhetorical strategy is used?",
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

// Quiz arrays (seven questions each, with 2 A, 2 B, 1 C, 1 D correct answers)
const authorPurposeQuestions = [
    // Original question
    {
        passage: "In 2024, a political journal in Clearwater reported: 'This policy will ruin our economy if unchanged.' The journal critiqued government decisions.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To persuade", correct: true },
            { text: "B) To inform", correct: false },
            { text: "C) To entertain", correct: false },
            { text: "D) To describe", correct: false }
        ],
        explanation: "'Will ruin' aims to convince readers to oppose the policy.",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a health journal in Greenvale reported: 'Exercise is the key to a long, healthy life.' The journal promoted fitness routines.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To persuade", correct: true },
            { text: "B) To describe", correct: false },
            { text: "C) To entertain", correct: false },
            { text: "D) To criticize", correct: false }
        ],
        explanation: "'Key to a healthy life' aims to convince readers to exercise.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an environmental journal in Millville reported: 'We must protect our forests to save wildlife.' The journal advocated for conservation.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To persuade", correct: true },
            { text: "B) To inform", correct: false },
            { text: "C) To describe", correct: false },
            { text: "D) To entertain", correct: false }
        ],
        explanation: "'Must protect' urges readers to support conservation efforts.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a science journal in Clearwater reported: 'The moon orbits Earth every 27.3 days.' The journal provided astronomical data.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To persuade", correct: false },
            { text: "B) To inform", correct: true },
            { text: "C) To entertain", correct: false },
            { text: "D) To criticize", correct: false }
        ],
        explanation: "Factual data about the moon’s orbit aims to educate.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a cultural journal in Greenvale reported: 'The festival dazzled with lights and music, thrilling the crowd.' The journal highlighted local events.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To inform", correct: false },
            { text: "B) To entertain", correct: true },
            { text: "C) To persuade", correct: false },
            { text: "D) To describe", correct: false }
        ],
        explanation: "Vivid, thrilling imagery aims to amuse and engage readers.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a travel journal in Millville reported: 'The mountain trail was rugged, with steep paths and stunning views.' The journal described hiking routes.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To persuade", correct: false },
            { text: "B) To inform", correct: false },
            { text: "C) To describe", correct: true },
            { text: "D) To criticize", correct: false }
        ],
        explanation: "Detailed imagery of the trail aims to paint a vivid picture.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a political journal in Clearwater reported: 'The budget cuts are a reckless betrayal of public trust.' The journal critiqued fiscal policy.",
        question: "What is the author’s purpose?",
        answers: [
            { text: "A) To inform", correct: false },
            { text: "B) To entertain", correct: false },
            { text: "C) To persuade", correct: false },
            { text: "D) To criticize", correct: true }
        ],
        explanation: "'Reckless betrayal' aims to condemn the budget cuts.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    }
];

const textStructureQuestions = [
    // Original question
    {
        passage: "In 2024, a technology journal in Clearwater reported: 'Unlike traditional methods, new technology saves significant time.' The journal explored innovations.",
        question: "What is the text structure?",
        answers: [
            { text: "A) Compare and contrast", correct: true },
            { text: "B) Sequence", correct: false },
            { text: "C) Cause and effect", correct: false },
            { text: "D) Description", correct: false }
        ],
        explanation: "'Unlike' shows a comparison between old and new.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, an environmental journal in Greenvale reported: 'Deforestation caused soil erosion in the region.' The journal discussed ecological impacts.",
        question: "What is the text structure?",
        answers: [
            { text: "A) Cause and effect", correct: true },
            { text: "B) Sequence", correct: false },
            { text: "C) Description", correct: false },
            { text: "D) Problem and solution", correct: false }
        ],
        explanation: "'Caused' links deforestation to erosion, showing cause-effect.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a cooking journal in Millville reported: 'First, knead the dough; then, let it rise.' The journal provided baking techniques.",
        question: "What is the text structure?",
        answers: [
            { text: "A) Sequence", correct: true },
            { text: "B) Compare and contrast", correct: false },
            { text: "C) Cause and effect", correct: false },
            { text: "D) Description", correct: false }
        ],
        explanation: "'First' and 'then' outline steps in order, indicating sequence.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a community journal in Clearwater reported: 'Littering was a problem, so volunteers organized cleanups.' The journal discussed civic initiatives.",
        question: "What is the text structure?",
        answers: [
            { text: "A) Cause and effect", correct: false },
            { text: "B) Problem and solution", correct: true },
            { text: "C) Compare and contrast", correct: false },
            { text: "D) Sequence", correct: false }
        ],
        explanation: "Problem (littering) is followed by solution (cleanups).",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a design journal in Greenvale reported: 'The building features tall columns and arched windows.' The journal described architectural trends.",
        question: "What is the text structure?",
        answers: [
            { text: "A) Sequence", correct: false },
            { text: "B) Description", correct: true },
            { text: "C) Cause and effect", correct: false },
            { text: "D) Problem and solution", correct: false }
        ],
        explanation: "Details about columns and windows describe the building’s features.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a pet journal in Millville reported: 'Dogs are loyal, while cats are more independent.' The journal compared pet behaviors.",
        question: "What is the text structure?",
        answers: [
            { text: "A) Description", correct: false },
            { text: "B) Sequence", correct: false },
            { text: "C) Compare and contrast", correct: true },
            { text: "D) Cause and effect", correct: false }
        ],
        explanation: "'While' contrasts dogs and cats, showing comparison.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a business journal in Clearwater reported: 'Efficiency is the top priority, followed by cost and flexibility.' The journal discussed project goals.",
        question: "What is the text structure?",
        answers: [
            { text: "A) Cause and effect", correct: false },
            { text: "B) Description", correct: false },
            { text: "C) Compare and contrast", correct: false },
            { text: "D) Order of importance", correct: true }
        ],
        explanation: "'Top priority, followed by' ranks elements by significance.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    }
];

const ideaOrganizationQuestions = [
    // Original question
    {
        passage: "In 2024, a news journal in Greenvale reported: 'The fire started in the evening, then spread quickly overnight.' The journal covered local incidents.",
        question: "How are ideas organized?",
        answers: [
            { text: "A) Chronological", correct: true },
            { text: "B) Spatial", correct: false },
            { text: "C) Importance", correct: false },
            { text: "D) Logical", correct: false }
        ],
        explanation: "'Started, then spread' follows a time sequence.",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a historical journal in Millville reported: 'In 1800, the city was established; by 1900, it became a trade center.' The journal documented urban growth.",
        question: "How are ideas organized?",
        answers: [
            { text: "A) Chronological", correct: true },
            { text: "B) Spatial", correct: false },
            { text: "C) Logical", correct: false },
            { text: "D) Importance", correct: false }
        ],
        explanation: "'In 1800, by 1900' follows a timeline of events.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an environmental journal in Clearwater reported: 'Pollution harmed the river, reducing fish populations.' The journal discussed ecological issues.",
        question: "How are ideas organized?",
        answers: [
            { text: "A) Cause to effect", correct: true },
            { text: "B) Spatial", correct: false },
            { text: "C) Chronological", correct: false },
            { text: "D) Importance", correct: false }
        ],
        explanation: "Pollution causes reduced fish populations, a logical cause-effect flow.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a design journal in Greenvale reported: 'The museum’s front entrance is grand, with statues flanking the doors.' The journal described architecture.",
        question: "How are ideas organized?",
        answers: [
            { text: "A) Chronological", correct: false },
            { text: "B) Spatial", correct: true },
            { text: "C) Logical", correct: false },
            { text: "D) Importance", correct: false }
        ],
        explanation: "'Front entrance' and 'flanking' describe layout by location.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a business journal in Millville reported: 'Profit is the primary goal, followed by growth and sustainability.' The journal discussed corporate priorities.",
        question: "How are ideas organized?",
        answers: [
            { text: "A) Chronological", correct: false },
            { text: "B) Importance", correct: true },
            { text: "C) Spatial", correct: false },
            { text: "D) Logical", correct: false }
        ],
        explanation: "'Primary, followed by' ranks goals by priority.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a community journal in Clearwater reported: 'Traffic congestion was a challenge, so new roads were built.' The journal discussed urban solutions.",
        question: "How are ideas organized?",
        answers: [
            { text: "A) Spatial", correct: false },
            { text: "B) Chronological", correct: false },
            { text: "C) Problem-solution", correct: true },
            { text: "D) Importance", correct: false }
        ],
        explanation: "Problem (congestion) followed by solution (roads).",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a cultural journal in Greenvale reported: 'Traditional art uses bold colors, unlike modern art’s minimalism.' The journal compared artistic styles.",
        question: "How are ideas organized?",
        answers: [
            { text: "A) Chronological", correct: false },
            { text: "B) Spatial", correct: false },
            { text: "C) Importance", correct: false },
            { text: "D) Comparison", correct: true }
        ],
        explanation: "'Unlike' compares traditional and modern art styles.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    }
];

const rhetoricalStrategiesQuestions = [
    // Original question
    {
        passage: "In 2024, a science journal in Millville reported: 'Data proves this conservation method succeeds.' The journal discussed environmental solutions.",
        question: "What rhetorical strategy is used?",
        answers: [
            { text: "A) Logical appeal (logos)", correct: true },
            { text: "B) Emotional appeal (pathos)", correct: false },
            { text: "C) Credibility (ethos)", correct: false },
            { text: "D) Repetition", correct: false }
        ],
        explanation: "'Data proves' uses evidence to appeal to reason.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a social journal in Greenvale reported: 'Picture the sorrow of families affected by this tragedy.' The journal advocated for aid programs.",
        question: "What rhetorical strategy is used?",
        answers: [
            { text: "A) Emotional appeal (pathos)", correct: true },
            { text: "B) Logical appeal (logos)", correct: false },
            { text: "C) Credibility (ethos)", correct: false },
            { text: "D) Contrast", correct: false }
        ],
        explanation: "'Picture the sorrow' evokes empathy to spur action.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a health journal in Clearwater reported: 'As a physician, I endorse this diet for heart health.' The journal discussed nutrition.",
        question: "What rhetorical strategy is used?",
        answers: [
            { text: "A) Credibility (ethos)", correct: true },
            { text: "B) Emotional appeal (pathos)", correct: false },
            { text: "C) Repetition", correct: false },
            { text: "D) Analogy", correct: false }
        ],
        explanation: "'As a physician' establishes authority to build trust.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a political journal in Millville reported: 'We will stand, we will fight, we will prevail.' The journal rallied public support.",
        question: "What rhetorical strategy is used?",
        answers: [
            { text: "A) Logical appeal (logos)", correct: false },
            { text: "B) Repetition", correct: true },
            { text: "C) Emotional appeal (pathos)", correct: false },
            { text: "D) Hyperbole", correct: false }
        ],
        explanation: "Repeated 'we will' emphasizes determination for impact.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a cultural journal in Greenvale reported: 'The past was dark, but the future shines bright.' The journal discussed societal progress.",
        question: "What rhetorical strategy is used?",
        answers: [
            { text: "A) Repetition", correct: false },
            { text: "B) Contrast", correct: true },
            { text: "C) Logical appeal (logos)", correct: false },
            { text: "D) Credibility (ethos)", correct: false }
        ],
        explanation: "Contrasting past and future highlights change for effect.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a business journal in Clearwater reported: 'Success is a ladder, each step a challenge.' The journal discussed career growth.",
        question: "What rhetorical strategy is used?",
        answers: [
            { text: "A) Emotional appeal (pathos)", correct: false },
            { text: "B) Repetition", correct: false },
            { text: "C) Analogy", correct: true },
            { text: "D) Hyperbole", correct: false }
        ],
        explanation: "Comparing success to a ladder clarifies through similarity.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a social journal in Millville reported: 'This project will take forever to finish!' The journal discussed community efforts.",
        question: "What rhetorical strategy is used?",
        answers: [
            { text: "A) Contrast", correct: false },
            { text: "B) Logical appeal (logos)", correct: false },
            { text: "C) Credibility (ethos)", correct: false },
            { text: "D) Hyperbole", correct: true }
        ],
        explanation: "'Forever' exaggerates to emphasize the project’s difficulty.",
        difficulty: "medium",
        category: "text-structure-and-purpose"
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
        case 1: return authorPurposeQuestions;
        case 2: return textStructureQuestions;
        case 3: return ideaOrganizationQuestions;
        case 4: return rhetoricalStrategiesQuestions;
        default: return authorPurposeQuestions;
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
    localStorage.setItem(`text-structure-and-purpose-lessonScore-${lessonId}`, score);
    console.log(`Saved text-structure-and-purpose-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`text-structure-and-purpose-lessonScore-${lessonId}`) || "Not completed yet";
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