// Variables (aligned with SAT structure)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "inferences": { correct: 0, incorrect: 0 }
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
        title: "Drawing Logical Conclusions",
        content: [
            {
                type: "example",
                title: "Example 1: Making a Logical Conclusion",
                content: `
                    <h2>Example 1: Making a Logical Conclusion</h2>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Identify facts: Daily practice, consistent wins.</p>
                    <p>Step 2: Connect logically: Practice likely improved performance.</p>
                    <p>Conclusion: The team’s success is due to regular practice.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Millville reported: 'The team practiced daily and won every game this season.' The journal highlighted the team’s dedication."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a retail journal in Greenvale reported: 'The store sold out of coats after a cold snap hit the region.' The journal analyzed consumer trends.",
                question: "What can be concluded?",
                options: [
                    { text: "A) The cold snap increased coat demand", correct: true },
                    { text: "B) The store had no coats last year", correct: false },
                    { text: "C) People disliked the coats", correct: false },
                    { text: "D) The store closed after selling out", correct: false }
                ],
                explanation: "The sell-out after the cold snap logically suggests higher demand due to weather."
            },
            {
                type: "example",
                title: "Example 2: Avoiding Overreach",
                content: `
                    <h2>Example 2: Avoiding Overreach</h2>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Late studying, exam passed.</p>
                    <p>Step 2: Logical limit: Studying helped, but no guarantee of perfection.</p>
                    <p>Conclusion: Her studying contributed to passing.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an academic journal in Clearwater reported: 'She studied late into the night and passed the exam.' The journal discussed study habits."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a fitness journal in Millville reported: 'He trained for months and finished the marathon.' The journal emphasized training benefits.",
                question: "What can be concluded?",
                options: [
                    { text: "A) Training helped him complete the marathon", correct: true },
                    { text: "B) He won the marathon", correct: false },
                    { text: "C) He didn’t train enough", correct: false },
                    { text: "D) The marathon was easy", correct: false }
                ],
                explanation: "Training and finishing suggest effort paid off, but winning isn’t implied."
            },
            {
                type: "example",
                title: "Example 3: Complex Conclusions",
                content: `
                    <h2>Example 3: Complex Conclusions</h2>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Car ban, improved air quality.</p>
                    <p>Step 2: Logical link: Fewer cars likely reduced pollution.</p>
                    <p>Conclusion: The car ban improved air quality.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale reported: 'The city banned cars downtown, and air quality improved significantly.' The journal advocated for urban sustainability."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a weather journal in Clearwater reported: 'The lights flickered and then went out during the storm.' The journal analyzed storm impacts.",
                question: "What can be concluded?",
                options: [
                    { text: "A) The storm caused a power outage", correct: true },
                    { text: "B) The lights were faulty", correct: false },
                    { text: "C) Someone turned off the lights", correct: false },
                    { text: "D) The storm ended", correct: false }
                ],
                explanation: "Flickering then outage during a storm suggests a weather-related power loss."
            },
            {
                type: "example",
                title: "Example 4: Using Evidence",
                content: `
                    <h2>Example 4: Using Evidence</h2>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: No rain, crop failure.</p>
                    <p>Step 2: Logical link: Lack of water harmed crops.</p>
                    <p>Conclusion: Drought caused the crop failure.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an agricultural journal in Millville reported: 'The crops failed after weeks of no rainfall.' The journal discussed drought impacts."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a business journal in Greenvale reported: 'She smiled broadly after receiving the job offer.' The journal explored workplace dynamics.",
                question: "What can be concluded?",
                options: [
                    { text: "A) She was pleased with the job offer", correct: true },
                    { text: "B) She disliked the job", correct: false },
                    { text: "C) She always smiles", correct: false },
                    { text: "D) The job had a low salary", correct: false }
                ],
                explanation: "Smiling after a job offer logically suggests happiness."
            },
            {
                type: "example",
                title: "Example 5: Multiple Factors",
                content: `
                    <h2>Example 5: Multiple Factors</h2>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Exercise, diet, health.</p>
                    <p>Step 2: Logical link: Lifestyle choices supported health.</p>
                    <p>Conclusion: His habits kept him healthy.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Clearwater reported: 'He exercised daily and maintained a balanced diet, staying healthy all year.' The journal promoted healthy lifestyles."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a community journal in Millville reported: 'The dog barked loudly when the stranger approached the house.' The journal discussed neighborhood safety.",
                question: "What can be concluded?",
                options: [
                    { text: "A) The dog was protective", correct: true },
                    { text: "B) The stranger was friendly", correct: false },
                    { text: "C) The dog barked constantly", correct: false },
                    { text: "D) The stranger left quickly", correct: false }
                ],
                explanation: "Barking at a stranger suggests a protective instinct."
            },
            {
                type: "example",
                title: "Example 6: Time-Based Conclusion",
                content: `
                    <h2>Example 6: Time-Based Conclusion</h2>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Rushed work, errors.</p>
                    <p>Step 2: Logical link: Lack of time led to mistakes.</p>
                    <p>Conclusion: Rushing caused the errors.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Greenvale reported: 'The project was rushed and contained numerous errors.' The journal analyzed workplace efficiency."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a sports journal in Clearwater reported: 'The crowd cheered enthusiastically as the team scored the winning goal.' The journal highlighted fan engagement.",
                question: "What can be concluded?",
                options: [
                    { text: "A) The crowd supported the team", correct: true },
                    { text: "B) The team lost the game", correct: false },
                    { text: "C) The crowd was quiet", correct: false },
                    { text: "D) The score was low", correct: false }
                ],
                explanation: "Cheering during a goal suggests crowd support."
            },
            {
                type: "example",
                title: "Example 7: Implicit Conclusion",
                content: `
                    <h2>Example 7: Implicit Conclusion</h2>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Early exit, no farewell.</p>
                    <p>Step 2: Logical link: Possibly upset or in a hurry.</p>
                    <p>Conclusion: He may have been displeased or rushed.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Millville reported: 'He left the party early without saying goodbye.' The journal explored social behaviors."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a cultural journal in Greenvale reported: 'The room fell silent when she entered.' The journal analyzed social dynamics.",
                question: "What can be concluded?",
                options: [
                    { text: "A) Her presence commanded attention", correct: true },
                    { text: "B) The room was empty", correct: false },
                    { text: "C) She was unnoticed", correct: false },
                    { text: "D) People continued talking", correct: false }
                ],
                explanation: "Silence upon entry suggests her impact or authority."
            }
        ]
    },
    2: {
        title: "Inferring the Author’s Perspective and Tone",
        content: [
            {
                type: "example",
                title: "Example 1: Detecting Tone",
                content: `
                    <h2>Example 1: Detecting Tone</h2>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze word choice: 'so-called' and 'nothing' suggest doubt.</p>
                    <p>Step 2: Infer tone: Dismissive and critical.</p>
                    <p>Tone: Sarcastic and skeptical.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a political journal in Clearwater stated: 'These so-called experts know nothing about real solutions.' The journal critiqued policy debates."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a historical journal in Greenvale stated: 'The glorious past outshines our lackluster present.' The journal reflected on societal changes.",
                question: "What is the author’s tone?",
                options: [
                    { text: "A) Nostalgic", correct: true },
                    { text: "B) Optimistic", correct: false },
                    { text: "C) Angry", correct: false },
                    { text: "D) Neutral", correct: false }
                ],
                explanation: "'Glorious past' and 'lackluster present' suggest a longing for the past."
            },
            {
                type: "example",
                title: "Example 2: Inferring Perspective",
                content: `
                    <h2>Example 2: Inferring Perspective</h2>
                    <p>Question: What is the author’s perspective?</p>
                    <p>Step 1: Note balance: Positive ('saves time') and negative ('isolates').</p>
                    <p>Step 2: Infer: Mixed feelings about technology.</p>
                    <p>Perspective: Technology has benefits but also drawbacks.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a technology journal in Millville stated: 'Technology saves time, yet it isolates us from meaningful connections.' The journal explored digital impacts."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a business journal in Clearwater stated: 'We must embrace innovation to thrive in this market.' The journal analyzed economic trends.",
                question: "What is the author’s perspective?",
                options: [
                    { text: "A) Innovation is essential", correct: true },
                    { text: "B) Innovation is optional", correct: false },
                    { text: "C) Innovation is harmful", correct: false },
                    { text: "D) Innovation is temporary", correct: false }
                ],
                explanation: "'Must embrace' and 'thrive' show a belief in the necessity of innovation."
            },
            {
                type: "example",
                title: "Example 3: Tone and Perspective Together",
                content: `
                    <h2>Example 3: Tone and Perspective Together</h2>
                    <p>Question: What are the tone and perspective?</p>
                    <p>Step 1: Tone from 'pathetic': Frustrated, critical.</p>
                    <p>Step 2: Perspective from context: Urgency about environmental issues.</p>
                    <p>Tone: Frustrated; Perspective: Concerned about inaction.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale stated: 'Politicians bicker while the planet burns—pathetic.' The journal urged climate action."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a policy journal in Millville stated: 'These outdated regulations stifle progress.' The journal critiqued government policies.",
                question: "What is the author’s tone?",
                options: [
                    { text: "A) Critical", correct: true },
                    { text: "B) Supportive", correct: false },
                    { text: "C) Joyful", correct: false },
                    { text: "D) Neutral", correct: false }
                ],
                explanation: "'Outdated' and 'stifle' show disapproval, indicating a critical tone."
            },
            {
                type: "example",
                title: "Example 4: Positive Tone",
                content: `
                    <h2>Example 4: Positive Tone</h2>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze: 'Shines bright' and 'endless' are upbeat.</p>
                    <p>Step 2: Infer: Optimistic and hopeful.</p>
                    <p>Tone: Enthusiastic.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a cultural journal in Clearwater stated: 'The future shines bright with endless possibilities.' The journal celebrated artistic innovation."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a technology journal in Greenvale stated: 'Such breakthroughs will undoubtedly transform lives.' The journal explored scientific advancements.",
                question: "What is the author’s perspective?",
                options: [
                    { text: "A) Breakthroughs are transformative", correct: true },
                    { text: "B) Breakthroughs are risky", correct: false },
                    { text: "C) Breakthroughs are minor", correct: false },
                    { text: "D) Breakthroughs are temporary", correct: false }
                ],
                explanation: "'Undoubtedly transform' implies a positive view of breakthroughs."
            },
            {
                type: "example",
                title: "Example 5: Subtle Tone",
                content: `
                    <h2>Example 5: Subtle Tone</h2>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze: 'Perhaps' and 'someday' suggest uncertainty.</p>
                    <p>Step 2: Infer: Mild doubt or resignation.</p>
                    <p>Tone: Tentative.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Millville stated: 'Perhaps we’ll resolve these conflicts someday.' The journal discussed community tensions."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a business journal in Clearwater stated: 'The strategy might succeed if conditions align.' The journal analyzed market risks.",
                question: "What is the author’s tone?",
                options: [
                    { text: "A) Cautious", correct: true },
                    { text: "B) Confident", correct: false },
                    { text: "C) Angry", correct: false },
                    { text: "D) Excited", correct: false }
                ],
                explanation: "'Might' and 'if' suggest cautious uncertainty."
            },
            {
                type: "example",
                title: "Example 6: Mixed Perspective",
                content: `
                    <h2>Example 6: Mixed Perspective</h2>
                    <p>Question: What is the author’s perspective?</p>
                    <p>Step 1: Note duality: Positive (schools) and negative (burden).</p>
                    <p>Step 2: Infer: Balanced view on taxes.</p>
                    <p>Perspective: Taxes have pros and cons.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an economic journal in Greenvale stated: 'Taxes fund schools but burden families.' The journal explored fiscal policies."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a historical journal in Millville stated: 'The old traditions are gone, thankfully.' The journal reflected on cultural shifts.",
                question: "What is the author’s tone?",
                options: [
                    { text: "A) Relieved", correct: true },
                    { text: "B) Regretful", correct: false },
                    { text: "C) Neutral", correct: false },
                    { text: "D) Confused", correct: false }
                ],
                explanation: "'Thankfully' indicates relief about the change."
            },
            {
                type: "example",
                title: "Example 7: Strong Tone",
                content: `
                    <h2>Example 7: Strong Tone</h2>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze: 'Disaster' and 'incompetence' are harsh.</p>
                    <p>Step 2: Infer: Anger and blame.</p>
                    <p>Tone: Accusatory.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a political journal in Clearwater stated: 'This disaster proves their incompetence!' The journal critiqued leadership failures."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, an environmental journal in Greenvale stated: 'We cannot ignore this climate crisis any longer.' The journal urged immediate action.",
                question: "What is the author’s perspective?",
                options: [
                    { text: "A) Urgent action is needed", correct: true },
                    { text: "B) The crisis is minor", correct: false },
                    { text: "C) Ignoring the crisis is acceptable", correct: false },
                    { text: "D) Action is unnecessary", correct: false }
                ],
                explanation: "'Cannot ignore' and 'any longer' stress the urgency of action."
            }
        ]
    },
    3: {
        title: "Predicting Outcomes and Next Steps",
        content: [
            {
                type: "example",
                title: "Example 1: Predicting an Outcome",
                content: `
                    <h2>Example 1: Predicting an Outcome</h2>
                    <p>Question: What is likely to happen next?</p>
                    <p>Step 1: Assess situation: Weak dam, heavy rain.</p>
                    <p>Step 2: Predict: Increased risk of failure.</p>
                    <p>Outcome: The dam might break.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather journal in Clearwater reported: 'The dam weakened significantly after heavy rainfall.' The journal analyzed infrastructure risks."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a business journal in Greenvale reported: 'The research team lost funding after consistent poor results.' The journal discussed project management.",
                question: "What is a likely outcome?",
                options: [
                    { text: "A) The project will be discontinued", correct: true },
                    { text: "B) The team will receive awards", correct: false },
                    { text: "C) Funding will increase", correct: false },
                    { text: "D) Results will improve immediately", correct: false }
                ],
                explanation: "Lost funding logically suggests the project cannot continue."
            },
            {
                type: "example",
                title: "Example 2: Next Steps",
                content: `
                    <h2>Example 2: Next Steps</h2>
                    <p>Question: What is the next logical step?</p>
                    <p>Step 1: Identify issue: Flawed design caused failure.</p>
                    <p>Step 2: Infer action: Fix the design.</p>
                    <p>Next step: Redesign the experiment.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a science journal in Millville reported: 'The experiment failed due to a flawed design.' The journal discussed research methodologies."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a political journal in Clearwater reported: 'The new tax law passed without public support.' The journal analyzed public reactions.",
                question: "What is a likely next step?",
                options: [
                    { text: "A) Public protests will occur", correct: true },
                    { text: "B) Taxes will be reduced", correct: false },
                    { text: "C) Public support will increase", correct: false },
                    { text: "D) The law will be expanded", correct: false }
                ],
                explanation: "Lack of public support suggests backlash, such as protests."
            },
            {
                type: "example",
                title: "Example 3: Outcome with Evidence",
                content: `
                    <h2>Example 3: Outcome with Evidence</h2>
                    <p>Question: What is a likely outcome?</p>
                    <p>Step 1: Link cause and effect: Price hike, sales drop.</p>
                    <p>Step 2: Predict: Continued high prices may worsen sales.</p>
                    <p>Outcome: Sales may decline further.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Greenvale reported: 'Sales dropped significantly after prices rose by 20%.' The journal analyzed market trends."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, an engineering journal in Millville reported: 'The bridge creaked ominously under the heavy load.' The journal discussed structural safety.",
                question: "What is a likely outcome?",
                options: [
                    { text: "A) The bridge may collapse", correct: true },
                    { text: "B) The load will decrease", correct: false },
                    { text: "C) The bridge will be repaired immediately", correct: false },
                    { text: "D) Traffic will increase", correct: false }
                ],
                explanation: "Creaking under weight suggests potential structural failure."
            },
            {
                type: "example",
                title: "Example 4: Predicting Behavior",
                content: `
                    <h2>Example 4: Predicting Behavior</h2>
                    <p>Question: What is a likely outcome?</p>
                    <p>Step 1: Assess: Long wait, restless crowd.</p>
                    <p>Step 2: Predict: Impatience may lead to action.</p>
                    <p>Outcome: The crowd might leave or protest.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'The crowd grew restless after hours of waiting for the event.' The journal studied crowd behavior."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a technology journal in Greenvale reported: 'The app crashed repeatedly during user testing.' The journal analyzed software reliability.",
                question: "What is a likely next step?",
                options: [
                    { text: "A) Developers will address the bugs", correct: true },
                    { text: "B) The app will be released as is", correct: false },
                    { text: "C) Testing will be discontinued", correct: false },
                    { text: "D) Crashes will decrease naturally", correct: false }
                ],
                explanation: "Repeated crashes logically lead to debugging efforts."
            },
            {
                type: "example",
                title: "Example 5: Long-Term Outcome",
                content: `
                    <h2>Example 5: Long-Term Outcome</h2>
                    <p>Question: What is a likely outcome?</p>
                    <p>Step 1: Fact: Forest cleared, farming began.</p>
                    <p>Step 2: Predict: Environmental impact over time.</p>
                    <p>Outcome: Wildlife may decline.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Millville reported: 'The forest was cleared to create farmland.' The journal discussed ecological changes."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a political journal in Clearwater reported: 'The policy sparked voter outrage before the election.' The journal analyzed electoral impacts.",
                question: "What is a likely outcome?",
                options: [
                    { text: "A) The party may lose voter support", correct: true },
                    { text: "B) Voters will support the policy", correct: false },
                    { text: "C) The policy will be repealed", correct: false },
                    { text: "D) Outrage will subside quickly", correct: false }
                ],
                explanation: "Outrage before an election suggests electoral consequences."
            },
            {
                type: "example",
                title: "Example 6: Practical Next Step",
                content: `
                    <h2>Example 6: Practical Next Step</h2>
                    <p>Question: What is the next logical step?</p>
                    <p>Step 1: Situation: Car failure, remote area.</p>
                    <p>Step 2: Infer: Seek assistance.</p>
                    <p>Next step: Call for roadside help.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Greenvale reported: 'The car broke down on a remote road.' The journal discussed travel challenges."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a safety journal in Millville reported: 'The fire alarm sounded in the office building.' The journal discussed emergency protocols.",
                question: "What is a likely next step?",
                options: [
                    { text: "A) Occupants will evacuate the building", correct: true },
                    { text: "B) The alarm will be ignored", correct: false },
                    { text: "C) The building will catch fire", correct: false },
                    { text: "D) The alarm will stop automatically", correct: false }
                ],
                explanation: "A fire alarm typically prompts immediate evacuation."
            },
            {
                type: "example",
                title: "Example 7: Conditional Outcome",
                content: `
                    <h2>Example 7: Conditional Outcome</h2>
                    <p>Question: What is a likely outcome?</p>
                    <p>Step 1: Condition: Ongoing rain.</p>
                    <p>Step 2: Predict: Cancellation if condition holds.</p>
                    <p>Outcome: The event may not happen.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a community journal in Clearwater reported: 'If the rain continues, the outdoor event will be canceled.' The journal discussed event planning."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a sports journal in Greenvale reported: 'The team missed practice sessions before the championship game.' The journal analyzed team preparation.",
                question: "What is a likely outcome?",
                options: [
                    { text: "A) The team may perform poorly", correct: true },
                    { text: "B) The team will win easily", correct: false },
                    { text: "C) Practice will be rescheduled", correct: false },
                    { text: "D) The game will be postponed", correct: false }
                ],
                explanation: "Missing practice suggests weaker performance in the game."
            }
        ]
    },
    4: {
        title: "Understanding Relationships Between Ideas",
        content: [
            {
                type: "example",
                title: "Example 1: Cause and Effect",
                content: `
                    <h2>Example 1: Cause and Effect</h2>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Identify ideas: Factory closure, job loss.</p>
                    <p>Step 2: Link: 'So' indicates cause-effect.</p>
                    <p>Relationship: Closure caused job loss.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an economic journal in Millville reported: 'The factory closed, so workers lost their jobs.' The journal analyzed local employment trends."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a weather journal in Greenvale reported: 'Heavy rainfall delayed the outdoor concert, causing widespread disappointment.' The journal discussed event planning challenges.",
                question: "What is the relationship?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Similarity", correct: false },
                    { text: "C) Contrast", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "Rainfall caused delay and disappointment, showing cause-effect."
            },
            {
                type: "example",
                title: "Example 2: Contrast",
                content: `
                    <h2>Example 2: Contrast</h2>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Compare ideas: City vs. rural life.</p>
                    <p>Step 2: Note 'but': Signals opposition.</p>
                    <p>Relationship: Contrast between pace of life.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a cultural journal in Clearwater reported: 'City life is fast-paced, but rural life is calm and relaxed.' The journal explored lifestyle differences."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a political journal in Millville reported: 'Some residents support the new policy, while others strongly oppose it.' The journal analyzed community reactions.",
                question: "What is the relationship?",
                options: [
                    { text: "A) Contrast", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Support", correct: false },
                    { text: "D) Chronology", correct: false }
                ],
                explanation: "'While' highlights opposing views, indicating contrast."
            },
            {
                type: "example",
                title: "Example 3: Sequence",
                content: `
                    <h2>Example 3: Sequence</h2>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Order ideas: Studying, then acing.</p>
                    <p>Step 2: 'Then' shows time sequence.</p>
                    <p>Relationship: Studying preceded success.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an academic journal in Greenvale reported: 'She studied diligently, then aced the exam.' The journal discussed study habits."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a sports journal in Clearwater reported: 'He trained intensely, yet still lost the competition.' The journal analyzed athletic performance.",
                question: "What is the relationship?",
                options: [
                    { text: "A) Contrast", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Support", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "'Yet' shows an unexpected outcome, indicating contrast."
            },
            {
                type: "example",
                title: "Example 4: Similarity",
                content: `
                    <h2>Example 4: Similarity</h2>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Compare: Dogs and cats.</p>
                    <p>Step 2: 'Both' shows shared trait.</p>
                    <p>Relationship: Similarity in care needs.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a veterinary journal in Millville reported: 'Dogs and cats both require regular veterinary care.' The journal discussed pet health."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a community journal in Greenvale reported: 'The sun set, and darkness enveloped the town.' The journal described local events.",
                question: "What is the relationship?",
                options: [
                    { text: "A) Sequence", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Similarity", correct: false },
                    { text: "D) Cause and effect", correct: false }
                ],
                explanation: "'And' links events in order, showing sequence."
            },
            {
                type: "example",
                title: "Example 5: Support",
                content: `
                    <h2>Example 5: Support</h2>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Ideas: Exercise’s importance, health boost.</p>
                    <p>Step 2: 'As' shows evidence.</p>
                    <p>Relationship: Health boost supports exercise’s value.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Clearwater reported: 'Exercise is vital, as it boosts overall health.' The journal promoted physical activity."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a social journal in Millville reported: 'She felt exhausted because she worked late hours.' The journal explored work-life balance.",
                question: "What is the relationship?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Similarity", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "'Because' links work to exhaustion, showing cause-effect."
            },
            {
                type: "example",
                title: "Example 6: Complex Relationship",
                content: `
                    <h2>Example 6: Complex Relationship</h2>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Ideas: Effort, failure.</p>
                    <p>Step 2: 'Despite' shows unexpected contrast.</p>
                    <p>Relationship: Contrast between effort and result.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an academic journal in Greenvale reported: 'He failed the exam despite his diligent effort.' The journal discussed study outcomes."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, an environmental journal in Clearwater reported: 'Birds and fish alike thrive in clean water ecosystems.' The journal advocated for water conservation.",
                question: "What is the relationship?",
                options: [
                    { text: "A) Similarity", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Cause and effect", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "'Alike' shows a shared need, indicating similarity."
            },
            {
                type: "example",
                title: "Example 7: Cause with Support",
                content: `
                    <h2>Example 7: Cause with Support</h2>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Ideas: Flood, ruined crops.</p>
                    <p>Step 2: 'For' explains cause with evidence.</p>
                    <p>Relationship: Flood caused ruin, supported by submersion.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an agricultural journal in Millville reported: 'The flood ruined crops, for the fields were underwater.' The journal discussed climate impacts."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a community journal in Greenvale reported: 'He left the meeting early, then missed the key announcement.' The journal explored group dynamics.",
                question: "What is the relationship?",
                options: [
                    { text: "A) Sequence", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Similarity", correct: false },
                    { text: "D) Support", correct: false }
                ],
                explanation: "'Then' links events in order, indicating sequence."
            }
        ]
    },
    5: {
        title: "Interpreting Figurative Language and Symbolism",
        content: [
            {
                type: "example",
                title: "Example 1: Figurative Language",
                content: `
                    <h2>Example 1: Figurative Language</h2>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Recognize figure: 'Cut like a knife' isn’t literal.</p>
                    <p>Step 2: Interpret: Words were sharp, hurtful.</p>
                    <p>Meaning: Her words were painful.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Clearwater reported: 'Her words cut like a knife during the debate.' The journal analyzed rhetorical strategies."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a cultural journal in Greenvale reported: 'His temper was a volcano, erupting without warning.' The journal discussed emotional expression.",
                question: "What does this mean?",
                options: [
                    { text: "A) His anger was sudden and intense", correct: true },
                    { text: "B) He was physically warm", correct: false },
                    { text: "C) He admired volcanoes", correct: false },
                    { text: "D) He was always calm", correct: false }
                ],
                explanation: "A volcano implies explosive, unpredictable anger."
            },
            {
                type: "example",
                title: "Example 2: Symbolism",
                content: `
                    <h2>Example 2: Symbolism</h2>
                    <p>Question: What does the dove symbolize?</p>
                    <p>Step 1: Context: Battlefield (war).</p>
                    <p>Step 2: Symbol: Dove often means peace.</p>
                    <p>Symbolism: Hope for peace amid conflict.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a historical journal in Millville reported: 'The dove flew over the battlefield, a fleeting vision.' The journal explored war imagery."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a literary journal in Clearwater reported: 'The crown gleamed in the darkness, a beacon of hope.' The journal analyzed symbolic imagery.",
                question: "What does the crown symbolize?",
                options: [
                    { text: "A) Authority", correct: true },
                    { text: "B) Darkness", correct: false },
                    { text: "C) Jewelry", correct: false },
                    { text: "D) Light", correct: false }
                ],
                explanation: "A crown in darkness as a 'beacon' suggests power or leadership."
            },
            {
                type: "example",
                title: "Example 3: Combined Interpretation",
                content: `
                    <h2>Example 3: Combined Interpretation</h2>
                    <p>Question: What does this suggest?</p>
                    <p>Step 1: Figurative: 'Storm' implies intensity.</p>
                    <p>Step 2: Interpret: Argument was fierce, ongoing.</p>
                    <p>Meaning: Their dispute was loud and prolonged.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Greenvale reported: 'The storm of their argument raged all night.' The journal discussed conflict dynamics."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a literary journal in Millville reported: 'Her laughter was music to his ears.' The journal explored emotional imagery.",
                question: "What does this mean?",
                options: [
                    { text: "A) Her laughter was delightful", correct: true },
                    { text: "B) She sang beautifully", correct: false },
                    { text: "C) He disliked her laughter", correct: false },
                    { text: "D) Music played nearby", correct: false }
                ],
                explanation: "'Music to his ears' figuratively means something enjoyable."
            },
            {
                type: "example",
                title: "Example 4: Metaphor",
                content: `
                    <h2>Example 4: Metaphor</h2>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Figurative: 'Thief' isn’t literal.</p>
                    <p>Step 2: Interpret: Time takes youth away.</p>
                    <p>Meaning: Time causes aging.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Clearwater reported: 'Time is a thief that steals our youth.' The journal analyzed poetic themes."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a cultural journal in Greenvale reported: 'The road was a ribbon stretching into the horizon.' The journal discussed travel metaphors.",
                question: "What does this mean?",
                options: [
                    { text: "A) The road was long and winding", correct: true },
                    { text: "B) The road was made of fabric", correct: false },
                    { text: "C) The road was short", correct: false },
                    { text: "D) The road vanished", correct: false }
                ],
                explanation: "'Ribbon' suggests a long, flowing path."
            },
            {
                type: "example",
                title: "Example 5: Symbolism in Context",
                content: `
                    <h2>Example 5: Symbolism in Context</h2>
                    <p>Question: What does the flag symbolize?</p>
                    <p>Step 1: Context: Victory.</p>
                    <p>Step 2: Symbol: Flag often means pride or triumph.</p>
                    <p>Symbolism: National or team pride.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Millville reported: 'The flag waved proudly after the team’s victory.' The journal celebrated athletic achievements."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a historical journal in Clearwater reported: 'The chains fell as freedom dawned.' The journal analyzed liberation movements.",
                question: "What do the chains symbolize?",
                options: [
                    { text: "A) Oppression", correct: true },
                    { text: "B) Strength", correct: false },
                    { text: "C) Freedom", correct: false },
                    { text: "D) Dawn", correct: false }
                ],
                explanation: "Chains breaking with freedom suggest past bondage."
            },
            {
                type: "example",
                title: "Example 6: Personification",
                content: `
                    <h2>Example 6: Personification</h2>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Figurative: Wind doesn’t whisper.</p>
                    <p>Step 2: Interpret: Soft, mysterious sound.</p>
                    <p>Meaning: The wind made a gentle, intriguing noise.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Greenvale reported: 'The wind whispered secrets through the trees.' The journal explored nature imagery."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a community journal in Millville reported: 'The sun smiled down on the festival.' The journal described local celebrations.",
                question: "What does this mean?",
                options: [
                    { text: "A) The weather was bright and warm", correct: true },
                    { text: "B) The sun was harsh", correct: false },
                    { text: "C) The festival was gloomy", correct: false },
                    { text: "D) The sun moved", correct: false }
                ],
                explanation: "'Smiled' suggests pleasant, sunny conditions."
            },
            {
                type: "example",
                title: "Example 7: Hyperbole",
                content: `
                    <h2>Example 7: Hyperbole</h2>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Figurative: Not literally a million.</p>
                    <p>Step 2: Interpret: Exaggeration for emphasis.</p>
                    <p>Meaning: I’ve told you many times.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'I’ve told you a million times to stop.' The journal analyzed communication patterns."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a literary journal in Greenvale reported: 'His heart was a stone after the betrayal.' The journal explored emotional imagery.",
                question: "What does this mean?",
                options: [
                    { text: "A) He became emotionally cold", correct: true },
                    { text: "B) His heart stopped beating", correct: false },
                    { text: "C) He collected stones", correct: false },
                    { text: "D) He felt relieved", correct: false }
                ],
                explanation: "'Stone' implies emotional hardness or detachment."
            }
        ]
    },
    6: {
        title: "Inferring Meaning from Context",
        content: [
            {
                type: "example",
                title: "Example 1: Word Meaning",
                content: `
                    <h2>Example 1: Word Meaning</h2>
                    <p>Question: What does 'arduous' mean?</p>
                    <p>Step 1: Context: Took hours.</p>
                    <p>Step 2: Infer: Difficult or tiring.</p>
                    <p>Meaning: 'Arduous' means challenging.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Millville reported: 'The arduous task of reorganizing the company took hours to complete.' The journal discussed corporate efficiency."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a community journal in Greenvale reported: 'The jovial crowd cheered loudly at the festival.' The journal described local events.",
                question: "What does 'jovial' mean?",
                options: [
                    { text: "A) Cheerful", correct: true },
                    { text: "B) Angry", correct: false },
                    { text: "C) Silent", correct: false },
                    { text: "D) Sad", correct: false }
                ],
                explanation: "Cheering loudly suggests a joyful mood, so 'jovial' means cheerful."
            },
            {
                type: "example",
                title: "Example 2: Implied Idea",
                content: `
                    <h2>Example 2: Implied Idea</h2>
                    <p>Question: What can be inferred?</p>
                    <p>Step 1: Contrast: Smiling vs. grim news.</p>
                    <p>Step 2: Infer: He’s hiding feelings or staying positive.</p>
                    <p>Meaning: He’s masking sadness or being resilient.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'He smiled despite the grim news of the layoffs.' The journal explored emotional responses."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a sports journal in Millville reported: 'She hesitated before attempting the high jump.' The journal analyzed athletic performance.",
                question: "What can be inferred?",
                options: [
                    { text: "A) She was apprehensive", correct: true },
                    { text: "B) She was eager", correct: false },
                    { text: "C) She jumped immediately", correct: false },
                    { text: "D) She refused to jump", correct: false }
                ],
                explanation: "Hesitation implies nervousness or uncertainty."
            },
            {
                type: "example",
                title: "Example 3: Broader Context",
                content: `
                    <h2>Example 3: Broader Context</h2>
                    <p>Question: What does 'cryptic' mean?</p>
                    <p>Step 1: Clue: Puzzled everyone.</p>
                    <p>Step 2: Infer: Mysterious or unclear.</p>
                    <p>Meaning: 'Cryptic' means confusing.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Greenvale reported: 'The cryptic message from the CEO puzzled everyone at the meeting.' The journal discussed corporate communication."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a travel journal in Clearwater reported: 'The serene lake calmed her nerves after a long journey.' The journal described scenic destinations.",
                question: "What does 'serene' mean?",
                options: [
                    { text: "A) Tranquil", correct: true },
                    { text: "B) Turbulent", correct: false },
                    { text: "C) Polluted", correct: false },
                    { text: "D) Noisy", correct: false }
                ],
                explanation: "Calming nerves suggests a peaceful setting, so 'serene' means tranquil."
            },
            {
                type: "example",
                title: "Example 4: Emotional Context",
                content: `
                    <h2>Example 4: Emotional Context</h2>
                    <p>Question: What does 'stern' mean?</p>
                    <p>Step 1: Clue: Silenced the room.</p>
                    <p>Step 2: Infer: Harsh or authoritative.</p>
                    <p>Meaning: 'Stern' means strict.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Millville reported: 'His stern voice silenced the room during the discussion.' The journal analyzed group dynamics."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a cultural journal in Greenvale reported: 'The lavish gala amazed the attendees with its grandeur.' The journal discussed event planning.",
                question: "What does 'lavish' mean?",
                options: [
                    { text: "A) Extravagant", correct: true },
                    { text: "B) Modest", correct: false },
                    { text: "C) Quiet", correct: false },
                    { text: "D) Dull", correct: false }
                ],
                explanation: "Amazing attendees suggests grandeur, so 'lavish' means extravagant."
            },
            {
                type: "example",
                title: "Example 5: Action Context",
                content: `
                    <h2>Example 5: Action Context</h2>
                    <p>Question: What does 'deftly' mean?</p>
                    <p>Step 1: Clue: Avoided obstacle.</p>
                    <p>Step 2: Infer: Skillfully or quickly.</p>
                    <p>Meaning: 'Deftly' means with skill.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Clearwater reported: 'She deftly avoided the obstacle during the race.' The journal analyzed athletic techniques."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a business journal in Millville reported: 'He reluctantly agreed to the merger proposal.' The journal discussed corporate negotiations.",
                question: "What can be inferred?",
                options: [
                    { text: "A) He was hesitant about the merger", correct: true },
                    { text: "B) He was enthusiastic about the merger", correct: false },
                    { text: "C) He proposed the merger", correct: false },
                    { text: "D) He agreed eagerly", correct: false }
                ],
                explanation: "'Reluctantly' implies hesitation or lack of enthusiasm."
            },
            {
                type: "example",
                title: "Example 6: Descriptive Context",
                content: `
                    <h2>Example 6: Descriptive Context</h2>
                    <p>Question: What does 'quaint' mean?</p>
                    <p>Step 1: Clue: Charmed tourists.</p>
                    <p>Step 2: Infer: Picturesque or old-fashioned.</p>
                    <p>Meaning: 'Quaint' means attractively unusual.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Greenvale reported: 'The quaint village charmed tourists with its charm.' The journal promoted tourism destinations."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a weather journal in Clearwater reported: 'The ominous clouds gathered over the town.' The journal discussed storm patterns.",
                question: "What does 'ominous' mean?",
                options: [
                    { text: "A) Threatening", correct: true },
                    { text: "B) Bright", correct: false },
                    { text: "C) Gentle", correct: false },
                    { text: "D) Clear", correct: false }
                ],
                explanation: "Gathering clouds that worry suggest danger, so 'ominous' means threatening."
            },
            {
                type: "example",
                title: "Example 7: Subtle Implication",
                content: `
                    <h2>Example 7: Subtle Implication</h2>
                    <p>Question: What can be inferred?</p>
                    <p>Step 1: Clue: Avoiding eye contact.</p>
                    <p>Step 2: Infer: Guilt or evasion.</p>
                    <p>Meaning: He might be hiding something.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Millville reported: 'He glanced away when asked about the missing funds.' The journal analyzed behavioral cues."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a sports journal in Greenvale reported: 'The jubilant team celebrated their championship win.' The journal highlighted team spirit.",
                question: "What does 'jubilant' mean?",
                options: [
                    { text: "A) Ecstatic", correct: true },
                    { text: "B) Exhausted", correct: false },
                    { text: "C) Angry", correct: false },
                    { text: "D) Silent", correct: false }
                ],
                explanation: "Celebrating a win suggests extreme joy, so 'jubilant' means ecstatic."
            }
        ]
    }
};

// Quiz arrays (seven questions each, with 2 A, 2 B, 1 C, 1 D correct answers)
const logicalConclusionsQuestions = [
    // Original question
    {
        passage: "In 2024, a weather journal in Clearwater reported: 'The lights flickered and then went out during the storm.' The journal analyzed storm impacts.",
        question: "What can be concluded?",
        answers: [
            { text: "A) The storm caused a power outage", correct: true },
            { text: "B) The lights were faulty", correct: false },
            { text: "C) Someone turned off the lights", correct: false },
            { text: "D) The storm ended", correct: false }
        ],
        explanation: "Flickering then outage during a storm suggests a weather-related power loss.",
        difficulty: "easy",
        category: "inferences"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a retail journal in Greenvale reported: 'The store sold out of umbrellas after forecasts predicted heavy rain.' The journal discussed consumer behavior.",
        question: "What can be concluded?",
        answers: [
            { text: "A) The forecast increased umbrella demand", correct: true },
            { text: "B) Umbrellas were unpopular before", correct: false },
            { text: "C) The store closed after selling out", correct: false },
            { text: "D) Rain never arrived", correct: false }
        ],
        explanation: "Selling out after a rain forecast suggests higher demand due to weather predictions.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a community journal in Millville reported: 'The crowd grew silent when the mayor began speaking.' The journal analyzed public events.",
        question: "What can be concluded?",
        answers: [
            { text: "A) The mayor’s presence commanded attention", correct: true },
            { text: "B) The crowd disliked the mayor", correct: false },
            { text: "C) The speech was uninteresting", correct: false },
            { text: "D) The crowd left the event", correct: false }
        ],
        explanation: "Silence during the mayor’s speech suggests respect or focus on the speaker.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a technology journal in Clearwater reported: 'The app gained popularity after adding new features.' The journal discussed digital trends.",
        question: "What can be concluded?",
        answers: [
            { text: "A) The app was unpopular before", correct: false },
            { text: "B) New features boosted the app’s appeal", correct: true },
            { text: "C) The app was discontinued", correct: false },
            { text: "D) Features were removed", correct: false }
        ],
        explanation: "Popularity gain after new features suggests they enhanced user interest.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a health journal in Greenvale reported: 'She slept better after adopting a nightly routine.' The journal explored wellness practices.",
        question: "What can be concluded?",
        answers: [
            { text: "A) She never slept well before", correct: false },
            { text: "B) The routine improved her sleep", correct: true },
            { text: "C) The routine was complex", correct: false },
            { text: "D) Sleep was unimportant to her", correct: false }
        ],
        explanation: "Better sleep after a routine suggests it had a positive effect.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, an agricultural journal in Millville reported: 'The crops wilted after weeks without rain.' The journal discussed drought effects.",
        question: "What can be concluded?",
        answers: [
            { text: "A) The crops were overwatered", correct: false },
            { text: "B) Rain increased crop growth", correct: false },
            { text: "C) Lack of rain caused crop wilting", correct: true },
            { text: "D) Farmers ignored the crops", correct: false }
        ],
        explanation: "Wilting after no rain logically points to drought as the cause.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a social journal in Clearwater reported: 'He avoided eye contact when questioned about the incident.' The journal analyzed behavioral cues.",
        question: "What can be concluded?",
        answers: [
            { text: "A) He was confident about the incident", correct: false },
            { text: "B) He was unaware of the incident", correct: false },
            { text: "C) He enjoyed the questioning", correct: false },
            { text: "D) He might be hiding something", correct: true }
        ],
        explanation: "Avoiding eye contact during questioning suggests possible guilt or evasion.",
        difficulty: "medium",
        category: "inferences"
    }
];

const perspectiveToneQuestions = [
    // Original question
    {
        passage: "In 2024, a policy journal in Millville stated: 'These outdated regulations stifle progress.' The journal critiqued government policies.",
        question: "What is the author’s tone?",
        answers: [
            { text: "A) Critical", correct: true },
            { text: "B) Supportive", correct: false },
            { text: "C) Joyful", correct: false },
            { text: "D) Neutral", correct: false }
        ],
        explanation: "'Outdated' and 'stifle' show disapproval, indicating a critical tone.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, an environmental journal in Greenvale stated: 'The reckless destruction of forests must end now.' The journal advocated for conservation policies.",
        question: "What is the author’s tone?",
        answers: [
            { text: "A) Urgent", correct: true },
            { text: "B) Indifferent", correct: false },
            { text: "C) Humorous", correct: false },
            { text: "D) Optimistic", correct: false }
        ],
        explanation: "'Reckless' and 'must end now' convey a pressing, urgent tone.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a cultural journal in Clearwater stated: 'The vibrant arts scene breathes life into our city.' The journal celebrated local creativity.",
        question: "What is the author’s perspective?",
        answers: [
            { text: "A) The arts scene is vital to the city", correct: true },
            { text: "B) The arts scene is declining", correct: false },
            { text: "C) The city lacks creativity", correct: false },
            { text: "D) The arts are unimportant", correct: false }
        ],
        explanation: "'Vibrant' and 'breathes life' show a positive view of the arts’ importance.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a technology journal in Millville stated: 'Artificial intelligence offers solutions but raises ethical concerns.' The journal explored tech advancements.",
        question: "What is the author’s perspective?",
        answers: [
            { text: "A) AI is entirely beneficial", correct: false },
            { text: "B) AI has both benefits and drawbacks", correct: true },
            { text: "C) AI is unethical", correct: false },
            { text: "D) AI is irrelevant", correct: false }
        ],
        explanation: "The balanced mention of solutions and concerns suggests a mixed perspective.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a political journal in Greenvale stated: 'This scandal exposes their utter incompetence.' The journal critiqued government leadership.",
        question: "What is the author’s tone?",
        answers: [
            { text: "A) Neutral", correct: false },
            { text: "B) Accusatory", correct: true },
            { text: "C) Supportive", correct: false },
            { text: "D) Cheerful", correct: false }
        ],
        explanation: "'Scandal' and 'utter incompetence' convey a blaming, accusatory tone.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a social journal in Clearwater stated: 'Perhaps one day we’ll understand these cultural shifts.' The journal reflected on societal changes.",
        question: "What is the author’s tone?",
        answers: [
            { text: "A) Confident", correct: false },
            { text: "B) Angry", correct: false },
            { text: "C) Tentative", correct: true },
            { text: "D) Excited", correct: false }
        ],
        explanation: "'Perhaps' and 'one day' suggest uncertainty, indicating a tentative tone.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, an education journal in Millville stated: 'Traditional methods work, but digital tools open new possibilities.' The journal discussed teaching innovations.",
        question: "What is the author’s perspective?",
        answers: [
            { text: "A) Traditional methods are superior", correct: false },
            { text: "B) Digital tools are ineffective", correct: false },
            { text: "C) Only digital tools work", correct: false },
            { text: "D) Both methods have value", correct: true }
        ],
        explanation: "Acknowledging both traditional and digital methods suggests a balanced perspective.",
        difficulty: "medium",
        category: "inferences"
    }
];

const predictingOutcomesQuestions = [
    // Original question
    {
        passage: "In 2024, an engineering journal in Millville reported: 'The bridge creaked ominously under the heavy load.' The journal discussed structural safety.",
        question: "What is a likely outcome?",
        answers: [
            { text: "A) The bridge may collapse", correct: true },
            { text: "B) The load will decrease", correct: false },
            { text: "C) The bridge will be repaired immediately", correct: false },
            { text: "D) Traffic will increase", correct: false }
        ],
        explanation: "Creaking under weight suggests potential structural failure.",
        difficulty: "easy",
        category: "inferences"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a business journal in Clearwater reported: 'The company lost major clients after raising prices significantly.' The journal analyzed market strategies.",
        question: "What is a likely outcome?",
        answers: [
            { text: "A) Revenue may decline further", correct: true },
            { text: "B) Clients will return soon", correct: false },
            { text: "C) Prices will be lowered immediately", correct: false },
            { text: "D) The company will expand", correct: false }
        ],
        explanation: "Losing clients after a price hike suggests continued revenue loss if unchanged.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a community journal in Greenvale reported: 'The crowd grew agitated after waiting hours for the delayed concert.' The journal discussed event management.",
        question: "What is a likely outcome?",
        answers: [
            { text: "A) The crowd may leave or protest", correct: true },
            { text: "B) The concert will start early", correct: false },
            { text: "C) The crowd will remain calm", correct: false },
            { text: "D) The delay will be ignored", correct: false }
        ],
        explanation: "Agitation after a long wait suggests potential action like leaving or protesting.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a technology journal in Millville reported: 'The software failed during testing due to coding errors.' The journal analyzed development processes.",
        question: "What is a likely next step?",
        answers: [
            { text: "A) The software will be released", correct: false },
            { text: "B) Developers will fix the coding errors", correct: true },
            { text: "C) Testing will be abandoned", correct: false },
            { text: "D) Errors will be ignored", correct: false }
        ],
        explanation: "Failure due to coding errors logically leads to debugging efforts.",
        difficulty: "medium",
        category: "inferences"
    },
    // New question 4 (Correct: B)
   // New question 4 (Correct: B)
   {
    passage: "In 2024, a political journal in Clearwater reported: 'The unpopular policy sparked protests before the vote.' The journal discussed civic engagement.",
    question: "What is a likely outcome?",
    answers: [
        { text: "A) The policy will gain support", correct: false },
        { text: "B) The policy may be rejected", correct: true },
        { text: "C) Protests will cease immediately", correct: false },
        { text: "D) The vote will be postponed", correct: false }
    ],
    explanation: "Protests against an unpopular policy suggest potential rejection by voters or officials.",
    difficulty: "medium",
    category: "inferences"
},
// New question 5 (Correct: C)
{
    passage: "In 2023, an environmental journal in Greenvale reported: 'The river overflowed after continuous heavy rainfall.' The journal analyzed flood risks.",
    question: "What is a likely outcome?",
    answers: [
        { text: "A) The river will dry up", correct: false },
        { text: "B) Rainfall will stop", correct: false },
        { text: "C) Flooding may occur", correct: true },
        { text: "D) The river will be diverted", correct: false }
    ],
    explanation: "Overflowing after heavy rain suggests imminent flooding.",
    difficulty: "medium",
    category: "inferences"
},
// New question 6 (Correct: D)
{
    passage: "In 2024, a business journal in Millville reported: 'The startup ignored market feedback and lost investors.' The journal discussed entrepreneurial strategies.",
    question: "What is a likely outcome?",
    answers: [
        { text: "A) The startup will gain more investors", correct: false },
        { text: "B) Feedback will be adopted", correct: false },
        { text: "C) The startup will expand", correct: false },
        { text: "D) The startup may fail", correct: true }
    ],
    explanation: "Ignoring feedback and losing investors suggests financial instability, risking failure.",
    difficulty: "medium",
    category: "inferences"
}
];

const relationshipsQuestions = [
// Original question
{
    passage: "In 2024, a sports journal in Clearwater reported: 'He trained intensely, yet still lost the competition.' The journal analyzed athletic performance.",
    question: "What is the relationship?",
    answers: [
        { text: "A) Contrast", correct: true },
        { text: "B) Cause and effect", correct: false },
        { text: "C) Support", correct: false },
        { text: "D) Sequence", correct: false }
    ],
    explanation: "'Yet' shows an unexpected outcome, indicating contrast.",
    difficulty: "medium",
    category: "inferences"
},
// New question 1 (Correct: A)
{
    passage: "In 2023, an economic journal in Greenvale reported: 'The factory shutdown led to widespread unemployment in the region.' The journal discussed labor market trends.",
    question: "What is the relationship?",
    answers: [
        { text: "A) Cause and effect", correct: true },
        { text: "B) Similarity", correct: false },
        { text: "C) Contrast", correct: false },
        { text: "D) Chronology", correct: false }
    ],
    explanation: "Shutdown caused unemployment, showing a cause-effect relationship.",
    difficulty: "medium",
    category: "inferences"
},
// New question 2 (Correct: A)
{
    passage: "In 2024, a cultural journal in Millville reported: 'Urban areas thrive on innovation, while rural communities preserve tradition.' The journal explored regional differences.",
    question: "What is the relationship?",
    answers: [
        { text: "A) Contrast", correct: true },
        { text: "B) Support", correct: false },
        { text: "C) Sequence", correct: false },
        { text: "D) Cause and effect", correct: false }
    ],
    explanation: "'While' highlights differing characteristics, indicating contrast.",
    difficulty: "medium",
    category: "inferences"
},
// New question 3 (Correct: B)
{
    passage: "In 2023, a health journal in Clearwater reported: 'She exercised regularly, then noticed improved energy levels.' The journal discussed fitness benefits.",
    question: "What is the relationship?",
    answers: [
        { text: "A) Contrast", correct: false },
        { text: "B) Sequence", correct: true },
        { text: "C) Similarity", correct: false },
        { text: "D) Support", correct: false }
    ],
    explanation: "'Then' indicates exercise preceded energy improvement, showing sequence.",
    difficulty: "medium",
    category: "inferences"
},
// New question 4 (Correct: B)
{
    passage: "In 2024, an environmental journal in Greenvale reported: 'Forests and wetlands both support diverse ecosystems.' The journal advocated for habitat preservation.",
    question: "What is the relationship?",
    answers: [
        { text: "A) Cause and effect", correct: false },
        { text: "B) Similarity", correct: true },
        { text: "C) Contrast", correct: false },
        { text: "D) Sequence", correct: false }
    ],
    explanation: "'Both' highlights a shared trait, indicating similarity.",
    difficulty: "medium",
    category: "inferences"
},
// New question 5 (Correct: C)
{
    passage: "In 2023, a social journal in Millville reported: 'The policy is effective, as it reduced crime rates significantly.' The journal discussed public safety measures.",
    question: "What is the relationship?",
    answers: [
        { text: "A) Sequence", correct: false },
        { text: "B) Contrast", correct: false },
        { text: "C) Support", correct: true },
        { text: "D) Similarity", correct: false }
    ],
    explanation: "'As' provides evidence for effectiveness, indicating support.",
    difficulty: "medium",
    category: "inferences"
},
// New question 6 (Correct: D)
{
    passage: "In 2024, a business journal in Clearwater reported: 'The project succeeded because the team collaborated effectively.' The journal analyzed workplace dynamics.",
    question: "What is the relationship?",
    answers: [
        { text: "A) Similarity", correct: false },
        { text: "B) Sequence", correct: false },
        { text: "C) Contrast", correct: false },
        { text: "D) Cause and effect", correct: true }
    ],
    explanation: "'Because' links collaboration to success, showing cause-effect.",
    difficulty: "medium",
    category: "inferences"
}
];

const figurativeLanguageQuestions = [
// Original question
{
    passage: "In 2024, a literary journal in Millville reported: 'Her laughter was music to his ears.' The journal explored emotional imagery.",
    question: "What does this mean?",
    answers: [
        { text: "A) Her laughter was delightful", correct: true },
        { text: "B) She sang beautifully", correct: false },
        { text: "C) He disliked her laughter", correct: false },
        { text: "D) Music played nearby", correct: false }
    ],
    explanation: "'Music to his ears' figuratively means something enjoyable.",
    difficulty: "medium",
    category: "inferences"
},
// New question 1 (Correct: A)
{
    passage: "In 2023, a cultural journal in Greenvale reported: 'The city was a melting pot of cultures.' The journal discussed urban diversity.",
    question: "What does this mean?",
    answers: [
        { text: "A) The city was diverse and blended", correct: true },
        { text: "B) The city was extremely hot", correct: false },
        { text: "C) The city lacked culture", correct: false },
        { text: "D) The city was made of metal", correct: false }
    ],
    explanation: "'Melting pot' figuratively describes a mix of diverse cultures.",
    difficulty: "medium",
    category: "inferences"
},
// New question 2 (Correct: A)
{
    passage: "In 2024, a literary journal in Clearwater reported: 'His dreams were a castle in the sky.' The journal analyzed aspirational imagery.",
    question: "What does this mean?",
    answers: [
        { text: "A) His dreams were unrealistic", correct: true },
        { text: "B) He lived in a castle", correct: false },
        { text: "C) His dreams were modest", correct: false },
        { text: "D) He dreamed of flying", correct: false }
    ],
    explanation: "'Castle in the sky' suggests unattainable or fanciful dreams.",
    difficulty: "medium",
    category: "inferences"
},
// New question 3 (Correct: B)
{
    passage: "In 2023, a historical journal in Millville reported: 'The torch of liberty burned brightly.' The journal discussed freedom symbolism.",
    question: "What does the torch symbolize?",
    answers: [
        { text: "A) Conflict", correct: false },
        { text: "B) Freedom", correct: true },
        { text: "C) Fire", correct: false },
        { text: "D) Darkness", correct: false }
    ],
    explanation: "A burning torch often symbolizes liberty or enlightenment.",
    difficulty: "medium",
    category: "inferences"
},
// New question 4 (Correct: B)
{
    passage: "In 2024, a social journal in Greenvale reported: 'The storm of their disagreement shook the room.' The journal explored conflict dynamics.",
    question: "What does this mean?",
    answers: [
        { text: "A) A literal storm occurred", correct: false },
        { text: "B) Their disagreement was intense", correct: true },
        { text: "C) The room was damaged", correct: false },
        { text: "D) They agreed quickly", correct: false }
    ],
    explanation: "'Storm' figuratively indicates a heated, disruptive argument.",
    difficulty: "medium",
    category: "inferences"
},
// New question 5 (Correct: C)
{
    passage: "In 2023, a literary journal in Clearwater reported: 'The river of time flowed endlessly.' The journal analyzed temporal imagery.",
    question: "What does this mean?",
    answers: [
        { text: "A) Time was a physical river", correct: false },
        { text: "B) Time stopped flowing", correct: false },
        { text: "C) Time moves continuously", correct: true },
        { text: "D) Rivers represent eternity", correct: false }
    ],
    explanation: "'River of time' suggests time’s unstoppable, continuous progression.",
    difficulty: "medium",
    category: "inferences"
},
// New question 6 (Correct: D)
{
    passage: "In 2024, a cultural journal in Millville reported: 'The olive branch extended across the divide.' The journal discussed peace symbolism.",
    question: "What does the olive branch symbolize?",
    answers: [
        { text: "A) Conflict", correct: false },
        { text: "B) Division", correct: false },
        { text: "C) Nature", correct: false },
        { text: "D) Peace", correct: true }
    ],
    explanation: "An olive branch is a traditional symbol of peace or reconciliation.",
    difficulty: "medium",
    category: "inferences"
}
];

const contextMeaningQuestions = [
// Original question
{
    passage: "In 2024, a travel journal in Clearwater reported: 'The serene lake calmed her nerves after a long journey.' The journal described scenic destinations.",
    question: "What does 'serene' mean?",
    answers: [
        { text: "A) Tranquil", correct: true },
        { text: "B) Turbulent", correct: false },
        { text: "C) Polluted", correct: false },
        { text: "D) Noisy", correct: false }
    ],
    explanation: "Calming nerves suggests a peaceful setting, so 'serene' means tranquil.",
    difficulty: "easy",
    category: "inferences"
},
// New question 1 (Correct: A)
{
    passage: "In 2023, a business journal in Greenvale reported: 'The audacious plan surprised the cautious investors.' The journal discussed corporate strategies.",
    question: "What does 'audacious' mean?",
    answers: [
        { text: "A) Bold", correct: true },
        { text: "B) Timid", correct: false },
        { text: "C) Simple", correct: false },
        { text: "D) Expected", correct: false }
    ],
    explanation: "Surprising cautious investors suggests a daring plan, so 'audacious' means bold.",
    difficulty: "medium",
    category: "inferences"
},
// New question 2 (Correct: A)
{
    passage: "In 2024, a social journal in Millville reported: 'His evasive answers frustrated the interviewer.' The journal analyzed communication patterns.",
    question: "What can be inferred?",
    answers: [
        { text: "A) He was avoiding the questions", correct: true },
        { text: "B) He answered confidently", correct: false },
        { text: "C) The interviewer was pleased", correct: false },
        { text: "D) The answers were clear", correct: false }
    ],
    explanation: "'Evasive' and 'frustrated' suggest he was dodging questions.",
    difficulty: "medium",
    category: "inferences"
},
// New question 3 (Correct: B)
{
    passage: "In 2023, a cultural journal in Clearwater reported: 'The vibrant festival energized the attendees.' The journal discussed community events.",
    question: "What does 'vibrant' mean?",
    answers: [
        { text: "A) Dull", correct: false },
        { text: "B) Lively", correct: true },
        { text: "C) Quiet", correct: false },
        { text: "D) Empty", correct: false }
    ],
    explanation: "Energizing attendees suggests a dynamic event, so 'vibrant' means lively.",
    difficulty: "medium",
    category: "inferences"
},
// New question 4 (Correct: B)
{
    passage: "In 2024, a political journal in Greenvale reported: 'Her resolute stance inspired her supporters.' The journal analyzed leadership qualities.",
    question: "What does 'resolute' mean?",
    answers: [
        { text: "A) Uncertain", correct: false },
        { text: "B) Determined", correct: true },
        { text: "C) Weak", correct: false },
        { text: "D) Indifferent", correct: false }
    ],
    explanation: "Inspiring supporters suggests firmness, so 'resolute' means determined.",
    difficulty: "medium",
    category: "inferences"
},
// New question 5 (Correct: C)
{
    passage: "In 2023, a social journal in Millville reported: 'He flinched visibly when the topic was raised.' The journal discussed emotional responses.",
    question: "What can be inferred?",
    answers: [
        { text: "A) He was excited about the topic", correct: false },
        { text: "B) He was indifferent", correct: false },
        { text: "C) He was uncomfortable", correct: true },
        { text: "D) He raised the topic", correct: false }
    ],
    explanation: "Flinching suggests discomfort or unease with the topic.",
    difficulty: "medium",
    category: "inferences"
},
// New question 6 (Correct: D)
{
    passage: "In 2024, a literary journal in Clearwater reported: 'The austere setting reflected her somber mood.' The journal analyzed narrative settings.",
    question: "What does 'austere' mean?",
    answers: [
        { text: "A) Lavish", correct: false },
        { text: "B) Cheerful", correct: false },
        { text: "C) Colorful", correct: false },
        { text: "D) Stark", correct: true }
    ],
    explanation: "Reflecting a somber mood suggests a plain, severe setting, so 'austere' means stark.",
    difficulty: "medium",
    category: "inferences"
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
    categoryStats["inferences"].correct++;
} else {
    selectedBtn.classList.add("incorrect");
    categoryStats["inferences"].incorrect++;
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
    case 1: return logicalConclusionsQuestions;
    case 2: return perspectiveToneQuestions;
    case 3: return predictingOutcomesQuestions;
    case 4: return relationshipsQuestions;
    case 5: return figurativeLanguageQuestions;
    case 6: return contextMeaningQuestions;
    default: return logicalConclusionsQuestions;
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
let totalCorrect = categoryStats["inferences"].correct;
let totalAttempted = totalCorrect + categoryStats["inferences"].incorrect;

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
localStorage.setItem(`inferences-lessonScore-${lessonId}`, score);
console.log(`Saved inferences-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
return localStorage.getItem(`inferences-lessonScore-${lessonId}`) || "Not completed yet";
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