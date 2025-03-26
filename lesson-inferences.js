
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
        title: "Drawing Logical Conclusions",
        content: [
            {
                type: "example",
                title: "Example 1: Making a Logical Conclusion",
                content: `
                    <h2>Example 1: Making a Logical Conclusion</h2>
                    <p>Passage: 'The team practiced daily and won every game this season.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Identify facts: Daily practice, consistent wins.</p>
                    <p>Step 2: Connect logically: Practice likely improved performance.</p>
                    <p>Conclusion: The team’s success is due to regular practice.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The store sold out of coats after a cold snap hit.' What can be concluded?",
                options: [
                    { text: "A) The cold snap increased coat demand", correct: true },
                    { text: "B) The store had no coats left last year", correct: false },
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
                    <p>Passage: 'She studied late and passed the exam.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Late studying, exam passed.</p>
                    <p>Step 2: Logical limit: Studying helped, but no guarantee of perfection.</p>
                    <p>Conclusion: Her studying contributed to passing.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'He trained for months and finished the race.' What can be concluded?",
                options: [
                    { text: "A) Training helped him complete the race", correct: true },
                    { text: "B) He won the race", correct: false },
                    { text: "C) He didn’t train enough", correct: false },
                    { text: "D) The race was easy", correct: false }
                ],
                explanation: "Training and finishing suggest effort paid off, but winning isn’t implied."
            },
            {
                type: "example",
                title: "Example 3: Complex Conclusions",
                content: `
                    <h2>Example 3: Complex Conclusions</h2>
                    <p>Passage: 'The city banned cars downtown, and air quality improved.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Car ban, better air quality.</p>
                    <p>Step 2: Logical link: Fewer cars likely reduced pollution.</p>
                    <p>Conclusion: The car ban improved air quality.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The lights flickered, then went out during the storm.' What can be concluded?",
                options: [
                    { text: "A) The storm caused a power outage", correct: true },
                    { text: "B) The lights were old", correct: false },
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
                    <p>Passage: 'The crops failed after weeks of no rain.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: No rain, crop failure.</p>
                    <p>Step 2: Logical link: Lack of water harmed crops.</p>
                    <p>Conclusion: Drought caused the crop failure.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'She smiled after getting the job offer.' What can be concluded?",
                options: [
                    { text: "A) She was happy about the job", correct: true },
                    { text: "B) She didn’t want the job", correct: false },
                    { text: "C) She always smiles", correct: false },
                    { text: "D) The job paid poorly", correct: false }
                ],
                explanation: "Smiling after a job offer logically suggests happiness."
            },
            {
                type: "example",
                title: "Example 5: Multiple Factors",
                content: `
                    <h2>Example 5: Multiple Factors</h2>
                    <p>Passage: 'He exercised daily and ate well, staying healthy all year.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Exercise, good diet, health.</p>
                    <p>Step 2: Logical link: Lifestyle choices supported health.</p>
                    <p>Conclusion: His habits kept him healthy.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The dog barked when the stranger approached.' What can be concluded?",
                options: [
                    { text: "A) The dog was protective", correct: true },
                    { text: "B) The stranger was friendly", correct: false },
                    { text: "C) The dog barked all day", correct: false },
                    { text: "D) The stranger left quickly", correct: false }
                ],
                explanation: "Barking at a stranger suggests a protective instinct."
            },
            {
                type: "example",
                title: "Example 6: Time-Based Conclusion",
                content: `
                    <h2>Example 6: Time-Based Conclusion</h2>
                    <p>Passage: 'The project was rushed and full of errors.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Rushed work, errors.</p>
                    <p>Step 2: Logical link: Lack of time led to mistakes.</p>
                    <p>Conclusion: Rushing caused the errors.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The crowd cheered as the team scored.' What can be concluded?",
                options: [
                    { text: "A) The crowd supported the team", correct: true },
                    { text: "B) The team lost the game", correct: false },
                    { text: "C) The crowd was silent", correct: false },
                    { text: "D) The score was low", correct: false }
                ],
                explanation: "Cheering during scoring suggests crowd support."
            },
            {
                type: "example",
                title: "Example 7: Implicit Conclusion",
                content: `
                    <h2>Example 7: Implicit Conclusion</h2>
                    <p>Passage: 'He left the party early without saying goodbye.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Early exit, no farewell.</p>
                    <p>Step 2: Logical link: Possibly upset or in a hurry.</p>
                    <p>Conclusion: He may have been displeased or rushed.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The room went silent when she entered.' What can be concluded?",
                options: [
                    { text: "A) Her presence commanded attention", correct: true },
                    { text: "B) The room was empty", correct: false },
                    { text: "C) She was unnoticed", correct: false },
                    { text: "D) People kept talking", correct: false }
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
                    <p>Passage: 'These so-called experts know nothing about real solutions.'</p>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze word choice: 'so-called' and 'nothing' suggest doubt.</p>
                    <p>Step 2: Infer tone: Dismissive and critical.</p>
                    <p>Tone: Sarcastic and skeptical.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The glorious past outshines our dull present.' What is the author’s tone?",
                options: [
                    { text: "A) Nostalgic", correct: true },
                    { text: "B) Cheerful", correct: false },
                    { text: "C) Angry", correct: false },
                    { text: "D) Neutral", correct: false }
                ],
                explanation: "'Glorious past' and 'dull present' suggest a longing for the past."
            },
            {
                type: "example",
                title: "Example 2: Inferring Perspective",
                content: `
                    <h2>Example 2: Inferring Perspective</h2>
                    <p>Passage: 'Technology saves time, yet it isolates us from real connections.'</p>
                    <p>Question: What is the author’s perspective?</p>
                    <p>Step 1: Note balance: Positive ('saves time') and negative ('isolates').</p>
                    <p>Step 2: Infer: Mixed feelings about technology.</p>
                    <p>Perspective: Technology has benefits but also drawbacks.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'We must embrace change to survive.' What is the author’s perspective?",
                options: [
                    { text: "A) Change is necessary", correct: true },
                    { text: "B) Change is optional", correct: false },
                    { text: "C) Change is harmful", correct: false },
                    { text: "D) Change is impossible", correct: false }
                ],
                explanation: "'Must embrace' and 'survive' show a belief in the need for change."
            },
            {
                type: "example",
                title: "Example 3: Tone and Perspective Together",
                content: `
                    <h2>Example 3: Tone and Perspective Together</h2>
                    <p>Passage: 'Politicians bicker while the planet burns—pathetic.'</p>
                    <p>Question: What are the tone and perspective?</p>
                    <p>Step 1: Tone from 'pathetic': Frustrated, critical.</p>
                    <p>Step 2: Perspective from context: Urgency about environmental issues.</p>
                    <p>Tone: Frustrated; Perspective: Concerned about inaction.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'These outdated rules hinder progress.' What is the author’s tone?",
                options: [
                    { text: "A) Critical", correct: true },
                    { text: "B) Supportive", correct: false },
                    { text: "C) Joyful", correct: false },
                    { text: "D) Neutral", correct: false }
                ],
                explanation: "'Outdated' and 'hinder' show disapproval, indicating a critical tone."
            },
            {
                type: "example",
                title: "Example 4: Positive Tone",
                content: `
                    <h2>Example 4: Positive Tone</h2>
                    <p>Passage: 'The future shines bright with endless possibilities.'</p>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze: 'Shines bright' and 'endless' are upbeat.</p>
                    <p>Step 2: Infer: Optimistic and hopeful.</p>
                    <p>Tone: Enthusiastic.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'Such innovation will surely save us all.' What is the author’s perspective?",
                options: [
                    { text: "A) Innovation is beneficial", correct: true },
                    { text: "B) Innovation is risky", correct: false },
                    { text: "C) Innovation is useless", correct: false },
                    { text: "D) Innovation is temporary", correct: false }
                ],
                explanation: "'Surely save' implies a positive view of innovation."
            },
            {
                type: "example",
                title: "Example 5: Subtle Tone",
                content: `
                    <h2>Example 5: Subtle Tone</h2>
                    <p>Passage: 'Perhaps we’ll figure this out someday.'</p>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze: 'Perhaps' and 'someday' suggest uncertainty.</p>
                    <p>Step 2: Infer: Mild doubt or resignation.</p>
                    <p>Tone: Tentative.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The plan might work if we’re lucky.' What is the author’s tone?",
                options: [
                    { text: "A) Doubtful", correct: true },
                    { text: "B) Confident", correct: false },
                    { text: "C) Angry", correct: false },
                    { text: "D) Excited", correct: false }
                ],
                explanation: "'Might' and 'lucky' suggest skepticism."
            },
            {
                type: "example",
                title: "Example 6: Mixed Perspective",
                content: `
                    <h2>Example 6: Mixed Perspective</h2>
                    <p>Passage: 'Taxes fund schools but burden families.'</p>
                    <p>Question: What is the author’s perspective?</p>
                    <p>Step 1: Note duality: Positive (schools) and negative (burden).</p>
                    <p>Step 2: Infer: Balanced view on taxes.</p>
                    <p>Perspective: Taxes have pros and cons.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The old ways are gone, thankfully.' What is the author’s tone?",
                options: [
                    { text: "A) Relieved", correct: true },
                    { text: "B) Sad", correct: false },
                    { text: "C) Neutral", correct: false },
                    { text: "D) Confused", correct: false }
                ],
                explanation: "'Thankfully' indicates relief about change."
            },
            {
                type: "example",
                title: "Example 7: Strong Tone",
                content: `
                    <h2>Example 7: Strong Tone</h2>
                    <p>Passage: 'This disaster proves their incompetence!'</p>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze: 'Disaster' and 'incompetence' are harsh.</p>
                    <p>Step 2: Infer: Anger and blame.</p>
                    <p>Tone: Accusatory.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'We can’t ignore this crisis any longer.' What is the author’s perspective?",
                options: [
                    { text: "A) Action is urgent", correct: true },
                    { text: "B) The crisis is minor", correct: false },
                    { text: "C) Ignoring it is fine", correct: false },
                    { text: "D) Action is optional", correct: false }
                ],
                explanation: "'Can’t ignore' and 'any longer' stress urgency."
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
                    <p>Passage: 'The dam weakened after heavy rain.'</p>
                    <p>Question: What is likely to happen next?</p>
                    <p>Step 1: Assess situation: Weak dam, heavy rain.</p>
                    <p>Step 2: Predict: Increased risk of failure.</p>
                    <p>Outcome: The dam might break.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The team lost funding after poor results.' What is a likely outcome?",
                options: [
                    { text: "A) The project will stop", correct: true },
                    { text: "B) The team will win awards", correct: false },
                    { text: "C) Funding will increase", correct: false },
                    { text: "D) Results will improve", correct: false }
                ],
                explanation: "Lost funding logically suggests the project can’t continue."
            },
            {
                type: "example",
                title: "Example 2: Next Steps",
                content: `
                    <h2>Example 2: Next Steps</h2>
                    <p>Passage: 'The experiment failed due to a flawed design.'</p>
                    <p>Question: What is the next logical step?</p>
                    <p>Step 1: Identify issue: Flawed design caused failure.</p>
                    <p>Step 2: Infer action: Fix the design.</p>
                    <p>Next step: Redesign the experiment.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'The law raised taxes with no public support.' What is a likely next step?",
                options: [
                    { text: "A) Protests will occur", correct: true },
                    { text: "B) Taxes will decrease", correct: false },
                    { text: "C) Support will rise", correct: false },
                    { text: "D) The law will expand", correct: false }
                ],
                explanation: "No support suggests public backlash, like protests."
            },
            {
                type: "example",
                title: "Example 3: Outcome with Evidence",
                content: `
                    <h2>Example 3: Outcome with Evidence</h2>
                    <p>Passage: 'Sales dropped after prices rose 20%.'</p>
                    <p>Question: What is a likely outcome?</p>
                    <p>Step 1: Link cause and effect: Price hike, sales drop.</p>
                    <p>Step 2: Predict: Continued high prices may worsen sales.</p>
                    <p>Outcome: Sales may decline further.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The bridge creaked under the heavy load.' What is a likely outcome?",
                options: [
                    { text: "A) The bridge may collapse", correct: true },
                    { text: "B) The load will lighten", correct: false },
                    { text: "C) The bridge will be repaired", correct: false },
                    { text: "D) Traffic will increase", correct: false }
                ],
                explanation: "Creaking under weight suggests structural failure is possible."
            },
            {
                type: "example",
                title: "Example 4: Predicting Behavior",
                content: `
                    <h2>Example 4: Predicting Behavior</h2>
                    <p>Passage: 'The crowd grew restless after hours of waiting.'</p>
                    <p>Question: What is a likely outcome?</p>
                    <p>Step 1: Assess: Long wait, restless crowd.</p>
                    <p>Step 2: Predict: Impatience may lead to action.</p>
                    <p>Outcome: The crowd might leave or protest.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The app crashed repeatedly during testing.' What is a likely next step?",
                options: [
                    { text: "A) Developers will fix the bugs", correct: true },
                    { text: "B) The app will be released", correct: false },
                    { text: "C) Testing will stop", correct: false },
                    { text: "D) Crashes will decrease", correct: false }
                ],
                explanation: "Repeated crashes logically lead to debugging."
            },
            {
                type: "example",
                title: "Example 5: Long-Term Outcome",
                content: `
                    <h2>Example 5: Long-Term Outcome</h2>
                    <p>Passage: 'The forest was cleared for farming land.'</p>
                    <p>Question: What is a likely outcome?</p>
                    <p>Step 1: Fact: Forest gone, farming begins.</p>
                    <p>Step 2: Predict: Environmental impact over time.</p>
                    <p>Outcome: Wildlife may decline.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The policy angered voters before the election.' What is a likely outcome?",
                options: [
                    { text: "A) The party may lose votes", correct: true },
                    { text: "B) Voters will forget it", correct: false },
                    { text: "C) The policy will pass", correct: false },
                    { text: "D) Anger will decrease", correct: false }
                ],
                explanation: "Anger before an election suggests electoral impact."
            },
            {
                type: "example",
                title: "Example 6: Practical Next Step",
                content: `
                    <h2>Example 6: Practical Next Step</h2>
                    <p>Passage: 'The car broke down on a remote road.'</p>
                    <p>Question: What is the next logical step?</p>
                    <p>Step 1: Situation: Car failure, isolated area.</p>
                    <p>Step 2: Infer: Seek assistance.</p>
                    <p>Next step: Call for roadside help.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The fire alarm sounded in the building.' What is a likely next step?",
                options: [
                    { text: "A) People will evacuate", correct: true },
                    { text: "B) The alarm will stop", correct: false },
                    { text: "C) People will ignore it", correct: false },
                    { text: "D) The building will burn", correct: false }
                ],
                explanation: "A fire alarm typically prompts evacuation."
            },
            {
                type: "example",
                title: "Example 7: Conditional Outcome",
                content: `
                    <h2>Example 7: Conditional Outcome</h2>
                    <p>Passage: 'If the rain continues, the event will be canceled.'</p>
                    <p>Question: What is a likely outcome?</p>
                    <p>Step 1: Condition: Ongoing rain.</p>
                    <p>Step 2: Predict: Cancellation if condition holds.</p>
                    <p>Outcome: The event may not happen.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The team missed practice before the big game.' What is a likely outcome?",
                options: [
                    { text: "A) They may perform poorly", correct: true },
                    { text: "B) They will win easily", correct: false },
                    { text: "C) Practice will resume", correct: false },
                    { text: "D) The game will be delayed", correct: false }
                ],
                explanation: "Missing practice suggests weaker performance."
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
                    <p>Passage: 'The factory closed, so workers lost jobs.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Identify ideas: Factory closure, job loss.</p>
                    <p>Step 2: Link: 'So' indicates cause-effect.</p>
                    <p>Relationship: Closure caused job loss.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'Rain delayed the game, causing frustration.' What is the relationship?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Similarity", correct: false },
                    { text: "C) Contrast", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "Rain caused delay and frustration, showing cause-effect."
            },
            {
                type: "example",
                title: "Example 2: Contrast",
                content: `
                    <h2>Example 2: Contrast</h2>
                    <p>Passage: 'City life is fast-paced, but rural life is calm.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Compare ideas: City vs. rural life.</p>
                    <p>Step 2: Note 'but': Signals opposition.</p>
                    <p>Relationship: Contrast between pace of life.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'Some support the plan, while others oppose it.' What is the relationship?",
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
                    <p>Passage: 'She studied, then aced the test.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Order ideas: Studying, then acing.</p>
                    <p>Step 2: 'Then' shows time sequence.</p>
                    <p>Relationship: Studying preceded success.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'He trained hard, yet still lost the match.' What is the relationship?",
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
                    <p>Passage: 'Dogs and cats both need regular care.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Compare: Dogs and cats.</p>
                    <p>Step 2: 'Both' shows shared trait.</p>
                    <p>Relationship: Similarity in care needs.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The sun set, and darkness fell.' What is the relationship?",
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
                    <p>Passage: 'Exercise is vital, as it boosts health.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Ideas: Exercise’s importance, health boost.</p>
                    <p>Step 2: 'As' shows evidence.</p>
                    <p>Relationship: Health boost supports exercise’s value.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'She was tired because she worked late.' What is the relationship?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Similarity", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "'Because' links work to tiredness, showing cause-effect."
            },
            {
                type: "example",
                title: "Example 6: Complex Relationship",
                content: `
                    <h2>Example 6: Complex Relationship</h2>
                    <p>Passage: 'He failed despite his effort.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Ideas: Effort, failure.</p>
                    <p>Step 2: 'Despite' shows unexpected contrast.</p>
                    <p>Relationship: Contrast between effort and result.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'Birds and fish alike thrive in clean water.' What is the relationship?",
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
                    <p>Passage: 'The flood ruined crops, for the fields were underwater.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Ideas: Flood, ruined crops.</p>
                    <p>Step 2: 'For' explains cause with evidence.</p>
                    <p>Relationship: Flood caused ruin, supported by submersion.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'He left early, then missed the speech.' What is the relationship?",
                options: [
                    { text: "A) Sequence", correct: true },
                    { text: "B) Contrast", correct: false },
                    { text: "C) Similarity", correct: false },
                    { text: "D) Support", correct: false }
                ],
                explanation: "'Then' shows events in order, indicating sequence."
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
                    <p>Passage: 'Her words cut like a knife.'</p>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Recognize figure: 'Cut like a knife' isn’t literal.</p>
                    <p>Step 2: Interpret: Words were sharp, hurtful.</p>
                    <p>Meaning: Her words were painful.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'His temper was a volcano.' What does this mean?",
                options: [
                    { text: "A) His anger was explosive", correct: true },
                    { text: "B) He was warm", correct: false },
                    { text: "C) He liked volcanoes", correct: false },
                    { text: "D) He was calm", correct: false }
                ],
                explanation: "A volcano implies sudden, intense anger."
            },
            {
                type: "example",
                title: "Example 2: Symbolism",
                content: `
                    <h2>Example 2: Symbolism</h2>
                    <p>Passage: 'The dove flew over the battlefield.'</p>
                    <p>Question: What does the dove symbolize?</p>
                    <p>Step 1: Context: Battlefield (war).</p>
                    <p>Step 2: Symbol: Dove often means peace.</p>
                    <p>Symbolism: Hope for peace amid conflict.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'The crown gleamed in the dark.' What does the crown symbolize?",
                options: [
                    { text: "A) Power", correct: true },
                    { text: "B) Darkness", correct: false },
                    { text: "C) Jewelry", correct: false },
                    { text: "D) Light", correct: false }
                ],
                explanation: "A crown typically represents authority or power."
            },
            {
                type: "example",
                title: "Example 3: Combined Interpretation",
                content: `
                    <h2>Example 3: Combined Interpretation</h2>
                    <p>Passage: 'The storm of their argument raged all night.'</p>
                    <p>Question: What does this suggest?</p>
                    <p>Step 1: Figurative: 'Storm' implies intensity.</p>
                    <p>Step 2: Interpret: Argument was fierce, ongoing.</p>
                    <p>Meaning: Their dispute was loud and prolonged.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'Her laughter was music to his ears.' What does this mean?",
                options: [
                    { text: "A) Her laughter was pleasant", correct: true },
                    { text: "B) She sang loudly", correct: false },
                    { text: "C) He disliked her laugh", correct: false },
                    { text: "D) Music played nearby", correct: false }
                ],
                explanation: "'Music to his ears' figuratively means something enjoyable."
            },
            {
                type: "example",
                title: "Example 4: Metaphor",
                content: `
                    <h2>Example 4: Metaphor</h2>
                    <p>Passage: 'Time is a thief that steals our youth.'</p>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Figurative: 'Thief' isn’t literal.</p>
                    <p>Step 2: Interpret: Time takes youth away.</p>
                    <p>Meaning: Time causes aging.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The road was a ribbon stretching into the distance.' What does this mean?",
                options: [
                    { text: "A) The road was long and winding", correct: true },
                    { text: "B) The road was made of fabric", correct: false },
                    { text: "C) The road was short", correct: false },
                    { text: "D) The road disappeared", correct: false }
                ],
                explanation: "'Ribbon' suggests a long, flowing path."
            },
            {
                type: "example",
                title: "Example 5: Symbolism in Context",
                content: `
                    <h2>Example 5: Symbolism in Context</h2>
                    <p>Passage: 'The flag waved proudly after the victory.'</p>
                    <p>Question: What does the flag symbolize?</p>
                    <p>Step 1: Context: Victory.</p>
                    <p>Step 2: Symbol: Flag often means pride or triumph.</p>
                    <p>Symbolism: National or team pride.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The chains fell as freedom dawned.' What do the chains symbolize?",
                options: [
                    { text: "A) Oppression", correct: true },
                    { text: "B) Strength", correct: false },
                    { text: "C) Dawn", correct: false },
                    { text: "D) Freedom", correct: false }
                ],
                explanation: "Chains breaking with freedom suggest past bondage."
            },
            {
                type: "example",
                title: "Example 6: Personification",
                content: `
                    <h2>Example 6: Personification</h2>
                    <p>Passage: 'The wind whispered secrets through the trees.'</p>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Figurative: Wind doesn’t whisper.</p>
                    <p>Step 2: Interpret: Soft, mysterious sound.</p>
                    <p>Meaning: The wind made a gentle, intriguing noise.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The sun smiled down on the festival.' What does this mean?",
                options: [
                    { text: "A) The weather was bright and warm", correct: true },
                    { text: "B) The sun was angry", correct: false },
                    { text: "C) The festival was dark", correct: false },
                    { text: "D) The sun moved", correct: false }
                ],
                explanation: "'Smiled' suggests pleasant, sunny conditions."
            },
            {
                type: "example",
                title: "Example 7: Hyperbole",
                content: `
                    <h2>Example 7: Hyperbole</h2>
                    <p>Passage: 'I’ve told you a million times to stop.'</p>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Figurative: Not literally a million.</p>
                    <p>Step 2: Interpret: Exaggeration for emphasis.</p>
                    <p>Meaning: I’ve told you many times.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'His heart was a stone after the betrayal.' What does this mean?",
                options: [
                    { text: "A) He became cold and unfeeling", correct: true },
                    { text: "B) His heart stopped", correct: false },
                    { text: "C) He loved stones", correct: false },
                    { text: "D) He felt better", correct: false }
                ],
                explanation: "'Stone' implies emotional hardness."
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
                    <p>Passage: 'The arduous task took hours to complete.'</p>
                    <p>Question: What does 'arduous' mean?</p>
                    <p>Step 1: Context: Took hours.</p>
                    <p>Step 2: Infer: Difficult or tiring.</p>
                    <p>Meaning: 'Arduous' means challenging.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The jovial crowd cheered loudly.' What does 'jovial' mean?",
                options: [
                    { text: "A) Happy", correct: true },
                    { text: "B) Angry", correct: false },
                    { text: "C) Quiet", correct: false },
                    { text: "D) Sad", correct: false }
                ],
                explanation: "Cheering loudly suggests a joyful, happy mood."
            },
            {
                type: "example",
                title: "Example 2: Implied Idea",
                content: `
                    <h2>Example 2: Implied Idea</h2>
                    <p>Passage: 'He smiled despite the grim news.'</p>
                    <p>Question: What can be inferred?</p>
                    <p>Step 1: Contrast: Smiling vs. grim news.</p>
                    <p>Step 2: Infer: He’s hiding feelings or staying positive.</p>
                    <p>Meaning: He’s masking sadness or being resilient.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'She hesitated before the leap.' What can be inferred?",
                options: [
                    { text: "A) She was nervous", correct: true },
                    { text: "B) She was excited", correct: false },
                    { text: "C) She jumped quickly", correct: false },
                    { text: "D) She didn’t leap", correct: false }
                ],
                explanation: "Hesitation implies uncertainty or fear."
            },
            {
                type: "example",
                title: "Example 3: Broader Context",
                content: `
                    <h2>Example 3: Broader Context</h2>
                    <p>Passage: 'The cryptic message puzzled everyone at the meeting.'</p>
                    <p>Question: What does 'cryptic' mean?</p>
                    <p>Step 1: Clue: Puzzled everyone.</p>
                    <p>Step 2: Infer: Mysterious or unclear.</p>
                    <p>Meaning: 'Cryptic' means confusing.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The serene lake calmed her nerves.' What does 'serene' mean?",
                options: [
                    { text: "A) Peaceful", correct: true },
                    { text: "B) Rough", correct: false },
                    { text: "C) Dirty", correct: false },
                    { text: "D) Loud", correct: false }
                ],
                explanation: "Calming nerves suggests the lake was tranquil, so 'serene' means peaceful."
            },
            {
                type: "example",
                title: "Example 4: Emotional Context",
                content: `
                    <h2>Example 4: Emotional Context</h2>
                    <p>Passage: 'His stern voice silenced the room.'</p>
                    <p>Question: What does 'stern' mean?</p>
                    <p>Step 1: Clue: Silenced the room.</p>
                    <p>Step 2: Infer: Harsh or authoritative.</p>
                    <p>Meaning: 'Stern' means strict.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The lavish party amazed the guests.' What does 'lavish' mean?",
                options: [
                    { text: "A) Extravagant", correct: true },
                    { text: "B) Simple", correct: false },
                    { text: "C) Quiet", correct: false },
                    { text: "D) Boring", correct: false }
                ],
                explanation: "Amazing guests suggests something grand, so 'lavish' means extravagant."
            },
            {
                type: "example",
                title: "Example 5: Action Context",
                content: `
                    <h2>Example 5: Action Context</h2>
                    <p>Passage: 'She deftly avoided the obstacle.'</p>
                    <p>Question: What does 'deftly' mean?</p>
                    <p>Step 1: Clue: Avoided obstacle.</p>
                    <p>Step 2: Infer: Skillfully or quickly.</p>
                    <p>Meaning: 'Deftly' means with skill.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'He reluctantly agreed to the plan.' What can be inferred?",
                options: [
                    { text: "A) He wasn’t enthusiastic", correct: true },
                    { text: "B) He loved the plan", correct: false },
                    { text: "C) He made the plan", correct: false },
                    { text: "D) He agreed quickly", correct: false }
                ],
                explanation: "'Reluctantly' implies hesitation or displeasure."
            },
            {
                type: "example",
                title: "Example 6: Descriptive Context",
                content: `
                    <h2>Example 6: Descriptive Context</h2>
                    <p>Passage: 'The quaint village charmed the tourists.'</p>
                    <p>Question: What does 'quaint' mean?</p>
                    <p>Step 1: Clue: Charmed tourists.</p>
                    <p>Step 2: Infer: Picturesque or old-fashioned.</p>
                    <p>Meaning: 'Quaint' means attractively unusual.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The ominous clouds gathered overhead.' What does 'ominous' mean?",
                options: [
                    { text: "A) Threatening", correct: true },
                    { text: "B) Bright", correct: false },
                    { text: "C) Soft", correct: false },
                    { text: "D) Clear", correct: false }
                ],
                explanation: "Gathering clouds that worry suggest danger, so 'ominous' means threatening."
            },
            {
                type: "example",
                title: "Example 7: Subtle Implication",
                content: `
                    <h2>Example 7: Subtle Implication</h2>
                    <p>Passage: 'He glanced away when asked about the money.'</p>
                    <p>Question: What can be inferred?</p>
                    <p>Step 1: Clue: Avoiding eye contact.</p>
                    <p>Step 2: Infer: Guilt or evasion.</p>
                    <p>Meaning: He might be hiding something.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The jubilant team celebrated their victory.' What does 'jubilant' mean?",
                options: [
                    { text: "A) Overjoyed", correct: true },
                    { text: "B) Tired", correct: false },
                    { text: "C) Angry", correct: false },
                    { text: "D) Quiet", correct: false }
                ],
                explanation: "Celebrating victory suggests happiness, so 'jubilant' means overjoyed."
            }
        ]
    }
};

// Inferences question arrays
const logicalConclusionsQuestions = [
    {
        question: "Passage: 'The lights flickered, then went out during the storm.' What can be concluded?",
        answers: [
            { text: "A) The storm caused a power outage", correct: true },
            { text: "B) The lights were old", correct: false },
            { text: "C) Someone turned off the lights", correct: false },
            { text: "D) The storm ended", correct: false }
        ],
        explanation: "Flickering then outage during a storm suggests a weather-related power loss.",
        difficulty: "easy",
        category: "inferences"
    }
];

const perspectiveToneQuestions = [
    {
        question: "Passage: 'These outdated rules hinder progress.' What is the author’s tone?",
        answers: [
            { text: "A) Critical", correct: true },
            { text: "B) Supportive", correct: false },
            { text: "C) Joyful", correct: false },
            { text: "D) Neutral", correct: false }
        ],
        explanation: "'Outdated' and 'hinder' show disapproval, indicating a critical tone.",
        difficulty: "medium",
        category: "inferences"
    }
];

const predictingOutcomesQuestions = [
    {
        question: "Passage: 'The bridge creaked under the heavy load.' What is a likely outcome?",
        answers: [
            { text: "A) The bridge may collapse", correct: true },
            { text: "B) The load will lighten", correct: false },
            { text: "C) The bridge will be repaired", correct: false },
            { text: "D) Traffic will increase", correct: false }
        ],
        explanation: "Creaking under weight suggests structural failure is possible.",
        difficulty: "easy",
        category: "inferences"
    }
];

const relationshipsQuestions = [
    {
        question: "Passage: 'He trained hard, yet still lost the match.' What is the relationship?",
        answers: [
            { text: "A) Contrast", correct: true },
            { text: "B) Cause and effect", correct: false },
            { text: "C) Support", correct: false },
            { text: "D) Sequence", correct: false }
        ],
        explanation: "'Yet' shows an unexpected outcome, indicating contrast.",
        difficulty: "medium",
        category: "inferences"
    }
];

const figurativeLanguageQuestions = [
    {
        question: "Passage: 'Her laughter was music to his ears.' What does this mean?",
        answers: [
            { text: "A) Her laughter was pleasant", correct: true },
            { text: "B) She sang loudly", correct: false },
            { text: "C) He disliked her laugh", correct: false },
            { text: "D) Music played nearby", correct: false }
        ],
        explanation: "'Music to his ears' figuratively means something enjoyable.",
        difficulty: "medium",
        category: "inferences"
    }
];

const contextMeaningQuestions = [
    {
        question: "Passage: 'The serene lake calmed her nerves.' What does 'serene' mean?",
        answers: [
            { text: "A) Peaceful", correct: true },
            { text: "B) Rough", correct: false },
            { text: "C) Dirty", correct: false },
            { text: "D) Loud", correct: false }
        ],
        explanation: "Calming nerves suggests the lake was tranquil, so 'serene' means peaceful.",
        difficulty: "easy",
        category: "inferences"
    }
];

// lesson-inferences.js
let categoryStats = {
    "inferences": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;
let currentItemIndex = 0;
let progressSteps = 0;
let totalSteps = 15; // Default for Lesson 1: 14 items + 1 quiz

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
        totalSteps = lessons[currentLesson].content.length + 1; // 14 items + quiz
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        showItem();
        progressSteps = 1; // First item
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
        lessonContent.innerHTML = item.content;
        const nextButton = document.getElementById('next-item');
        if (nextButton) {
            nextButton.addEventListener('click', nextItem);
        } else {
            console.error("Next item button not found!");
        }
    } else if (item.type === "question") {
        lessonContent.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.question}</p>
            ${item.options.map((option, index) => `
                <input type="radio" id="q${currentItemIndex}a${index}" name="q${currentItemIndex}" value="${option.correct}">
                <label for="q${currentItemIndex}a${index}">${option.text}</label><br>
            `).join('')}
            <button id="submit-answer${currentItemIndex}">Submit Answer</button>
        `;
        const submitButton = document.getElementById(`submit-answer${currentItemIndex}`);
        if (submitButton) {
            submitButton.addEventListener('click', () => checkItemAnswer(item));
        } else {
            console.error("Submit answer button not found!");
        }
    }
}

function nextItem() {
    currentItemIndex++;
    progressSteps = currentItemIndex + 1;
    updateProgressBar(progressSteps);
    showItem();
}

function checkItemAnswer(item) {
    const selectedAnswer = document.querySelector(`input[name="q${currentItemIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats["inferences"].correct++;
        } else {
            alert(`Incorrect. ${item.explanation}`);
            categoryStats["inferences"].incorrect++;
        }
        currentItemIndex++;
        progressSteps = currentItemIndex + 1;
        updateProgressBar(progressSteps);
        showItem();
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = logicalConclusionsQuestions; break;
        case 2: quizQuestions = perspectiveToneQuestions; break;
        case 3: quizQuestions = predictingOutcomesQuestions; break;
        case 4: quizQuestions = relationshipsQuestions; break;
        case 5: quizQuestions = figurativeLanguageQuestions; break;
        case 6: quizQuestions = contextMeaningQuestions; break;
        default: quizQuestions = logicalConclusionsQuestions;
    }
    progressSteps = totalSteps; // Final step (quiz)
    updateProgressBar(progressSteps);
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
    localStorage.setItem(`inferences-lessonScore-${lessonId}`, score);
    console.log(`Saved inferences-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`inferences-lessonScore-${lessonId}`) || "Not completed yet";
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