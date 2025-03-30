// Consolidated DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || 1;
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
    updateProgressBar(0); // Initialize progress bar
});

// Define all lessons (unchanged from your code)
const lessons = {
    1: {
        title: "Textual Evidence",
        content: [
            {
                type: "example",
                title: "Example: Identifying Textual Evidence",
                content: `
                    <h2>Example: Identifying Textual Evidence</h2>
                    <p>Passage: 'The new policy reduced emissions by 20% in its first year.'</p>
                    <p>Question: What evidence supports the claim that the policy was effective?</p>
                    <p>Step 1: Identify the claim: The policy was effective.</p>
                    <p>Step 2: Find supporting evidence: 'reduced emissions by 20% in its first year.'</p>
                    <p>The evidence is the specific reduction percentage.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The forest grew denser after the conservation effort began.' What evidence supports the conservation effort’s success?",
                options: [
                    { text: "A) grew denser", correct: true },
                    { text: "B) conservation effort began", correct: false },
                    { text: "C) forest", correct: false },
                    { text: "D) after", correct: false }
                ],
                explanation: "The claim is about success, and 'grew denser' directly shows a positive outcome."
            },
            {
                type: "example",
                title: "Example: Evaluating Evidence Relevance",
                content: `
                    <h2>Example: Evaluating Evidence Relevance</h2>
                   
                    <p>Passage: 'Students who attended the program scored higher on tests. The program ran for 10 weeks.'</p>
                    
                    <p>Question: Which evidence best supports improved academic performance?</p>
                   
                    <p>Step 1: Focus on the claim: Improved academic performance.</p>
                   
                    <p>Step 2: Evaluate: 'scored higher on tests' directly supports it; 'ran for 10 weeks' does not.</p>
                   
                    <p>The evidence is 'scored higher on tests.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'The law lowered crime rates significantly. It was passed in 2015.' What supports the claim of reduced crime?",
                options: [
                    { text: "A) lowered crime rates", correct: true },
                    { text: "B) passed in 2015", correct: false },
                    { text: "C) significantly", correct: false },
                    { text: "D) law", correct: false }
                ],
                explanation: "The claim is about reduced crime, and 'lowered crime rates' is the direct evidence."
            },
            {
                type: "example",
                title: "Example: Matching Evidence to Claims",
                content: `
                    <h2>Example: Matching Evidence to Claims</h2>
                    <p>Passage: 'The diet improved health outcomes, with participants losing an average of 10 pounds.'</p>
                    <p>Question: What evidence supports better health?</p>
                    <p>Step 1: Identify the claim: Better health outcomes.</p>
                    <p>Step 2: Find evidence: 'losing an average of 10 pounds' supports health improvement.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The campaign raised awareness, with 80% of people recognizing the brand.' What supports the claim of increased awareness?",
                options: [
                    { text: "A) 80% of people recognizing the brand", correct: true },
                    { text: "B) campaign raised awareness", correct: false },
                    { text: "C) people", correct: false },
                    { text: "D) brand", correct: false }
                ],
                explanation: "'80% recognizing the brand' quantifies the awareness increase."
            },
            {
                type: "example",
                title: "Example: Specific Evidence",
                content: `
                    <h2>Example: Specific Evidence</h2>
                    <p>Passage: 'The app increased user engagement by 40% within three months.'</p>
                    <p>Question: What evidence supports the app’s success?</p>
                    <p>Step 1: Identify the claim: The app was successful.</p>
                    <p>Step 2: Find evidence: 'increased user engagement by 40% within three months.'</p>
                    <p>The evidence is the precise percentage and timeframe.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The training enhanced skills, as shown by a 25% productivity boost.' What supports the claim of skill enhancement?",
                options: [
                    { text: "A) 25% productivity boost", correct: true },
                    { text: "B) training enhanced skills", correct: false },
                    { text: "C) as shown", correct: false },
                    { text: "D) skills", correct: false }
                ],
                explanation: "'25% productivity boost' directly evidences improved skills."
            },
            {
                type: "example",
                title: "Example: Distinguishing Evidence",
                content: `
                    <h2>Example: Distinguishing Evidence</h2>
                    <p>Passage: 'The event drew crowds, with 1,000 tickets sold. It was held on Saturday.'</p>
                    <p>Question: What evidence supports the event’s popularity?</p>
                    <p>Step 1: Identify the claim: The event was popular.</p>
                    <p>Step 2: Evaluate: '1,000 tickets sold' supports it; 'held on Saturday' does not.</p>
                    <p>The evidence is '1,000 tickets sold.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The therapy reduced stress, with patients reporting 30% fewer symptoms.' What supports the claim of stress reduction?",
                options: [
                    { text: "A) 30% fewer symptoms", correct: true },
                    { text: "B) therapy reduced stress", correct: false },
                    { text: "C) patients reporting", correct: false },
                    { text: "D) stress", correct: false }
                ],
                explanation: "'30% fewer symptoms' directly shows stress reduction."
            },
            {
                type: "example",
                title: "Example: Evidence Precision",
                content: `
                    <h2>Example: Evidence Precision</h2>
                    <p>Passage: 'The class raised grades, with scores up by 15 points on average.'</p>
                    <p>Question: What evidence supports grade improvement?</p>
                    <p>Step 1: Identify the claim: Grades improved.</p>
                    <p>Step 2: Find evidence: 'scores up by 15 points on average.'</p>
                    <p>The evidence is the specific score increase.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The policy sped up recovery, with 90% of businesses reopening within a year.' What supports the claim of faster recovery?",
                options: [
                    { text: "A) 90% of businesses reopening", correct: true },
                    { text: "B) policy sped up recovery", correct: false },
                    { text: "C) within a year", correct: false },
                    { text: "D) businesses", correct: false }
                ],
                explanation: "'90% of businesses reopening' supports faster recovery."
            },
            {
                type: "example",
                title: "Example: Evidence Sufficiency",
                content: `
                    <h2>Example: Evidence Sufficiency</h2>
                    <p>Passage: 'The project succeeded, finishing under budget by $5,000 and on time.'</p>
                    <p>Question: What evidence supports project success?</p>
                    <p>Step 1: Identify the claim: The project succeeded.</p>
                    <p>Step 2: Find evidence: 'finishing under budget by $5,000 and on time.'</p>
                    <p>The evidence is specific and sufficient.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The book improved literacy, with reading scores rising by 20%.' What supports the claim of literacy improvement?",
                options: [
                    { text: "A) reading scores rising by 20%", correct: true },
                    { text: "B) book improved literacy", correct: false },
                    { text: "C) reading scores", correct: false },
                    { text: "D) improved", correct: false }
                ],
                explanation: "'Reading scores rising by 20%' directly proves literacy improvement."
            }
        ]
    },
    2: {
        title: "Understanding Author’s Use of Evidence",
        content: [
            {
                type: "example",
                title: "Example: Analyzing Evidence Purpose",
                content: `
                    <h2>Example: Analyzing Evidence Purpose</h2>
                    <p>Passage: 'Studies show a 15% increase in productivity after the change.'</p>
                    <p>Question: Why does the author include this evidence?</p>
                    <p>Step 1: Identify the evidence: '15% increase in productivity.'</p>
                    <p>Step 2: Determine purpose: To quantify and strengthen the claim of improvement.</p>
                    <p>The author uses it to provide concrete support.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The initiative cut costs by 30%, according to a recent survey.' Why include 'recent survey'?",
                options: [
                    { text: "A) To add credibility", correct: true },
                    { text: "B) To confuse readers", correct: false },
                    { text: "C) To fill space", correct: false },
                    { text: "D) To mention time", correct: false }
                ],
                explanation: "It adds reliability and timeliness to the 30% cost reduction claim."
            },
            {
                type: "example",
                title: "Example: Evidence Strength",
                content: `
                    <h2>Example: Evidence Strength</h2>
                    <p>Passage: 'Experts agree the method works, backed by decades of research.'</p>
                    <p>Question: How does this evidence strengthen the argument?</p>
                    <p>Step 1: Identify evidence: 'decades of research.'</p>
                    <p>Step 2: Analyze: It adds credibility and depth to the expert agreement.</p>
                    <p>It makes the claim more convincing.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'Historical data shows a consistent trend of growth.' How does this evidence help?",
                options: [
                    { text: "A) Shows consistency", correct: true },
                    { text: "B) Adds confusion", correct: false },
                    { text: "C) Repeats the claim", correct: false },
                    { text: "D) Weakens the point", correct: false }
                ],
                explanation: "It strengthens the claim by showing a reliable pattern over time."
            },
            {
                type: "example",
                title: "Example: Evidence Type",
                content: `
                    <h2>Example: Evidence Type</h2>
                    <p>Passage: 'Testimonials from users highlight the product’s ease of use.'</p>
                    <p>Question: What role do testimonials play?</p>
                    <p>Step 1: Identify evidence: 'testimonials from users.'</p>
                    <p>Step 2: Analyze: They provide personal, relatable support for the claim.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'Anecdotes from staff reveal improved morale.' Why use anecdotes?",
                options: [
                    { text: "A) To offer relatable examples", correct: true },
                    { text: "B) To replace data", correct: false },
                    { text: "C) To mislead readers", correct: false },
                    { text: "D) To shorten the text", correct: false }
                ],
                explanation: "Anecdotes make the morale improvement relatable and human."
            },
            {
                type: "example",
                title: "Example: Statistical Evidence",
                content: `
                    <h2>Example: Statistical Evidence</h2>
                    <p>Passage: 'The law reduced accidents by 25%, per official records.'</p>
                    <p>Question: Why include 'per official records'?</p>
                    <p>Step 1: Identify evidence: '25% reduction' and 'official records.'</p>
                    <p>Step 2: Analyze: It boosts credibility with an authoritative source.</p>
                    <p>It strengthens the argument’s reliability.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'Sales rose 50%, per industry reports.' Why mention 'industry reports'?",
                options: [
                    { text: "A) To enhance trustworthiness", correct: true },
                    { text: "B) To complicate the claim", correct: false },
                    { text: "C) To avoid details", correct: false },
                    { text: "D) To sound vague", correct: false }
                ],
                explanation: "It adds a credible source, making the 50% rise more convincing."
            },
            {
                type: "example",
                title: "Example: Expert Opinion",
                content: `
                    <h2>Example: Expert Opinion</h2>
                    <p>Passage: 'Dr. Smith, a climate expert, predicts rapid change.'</p>
                    <p>Question: How does this evidence help?</p>
                    <p>Step 1: Identify evidence: 'Dr. Smith, a climate expert.'</p>
                    <p>Step 2: Analyze: It lends authority to the prediction.</p>
                    <p>It bolsters the claim with expertise.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'A biologist notes species recovery.' Why include the biologist?",
                options: [
                    { text: "A) To provide expert credibility", correct: true },
                    { text: "B) To add a name", correct: false },
                    { text: "C) To distract readers", correct: false },
                    { text: "D) To lengthen the text", correct: false }
                ],
                explanation: "The biologist’s expertise strengthens the recovery claim."
            },
            {
                type: "example",
                title: "Example: Historical Evidence",
                content: `
                    <h2>Example: Historical Evidence</h2>
                    <p>Passage: 'Past reforms, like those in 1990, spurred growth.'</p>
                    <p>Question: Why use historical evidence?</p>
                    <p>Step 1: Identify evidence: 'reforms in 1990 spurred growth.'</p>
                    <p>Step 2: Analyze: It provides a precedent to support the claim.</p>
                    <p>It shows a proven outcome.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The 1980s policy cut inflation.' Why mention the 1980s?",
                options: [
                    { text: "A) To show a historical precedent", correct: true },
                    { text: "B) To confuse the timeline", correct: false },
                    { text: "C) To avoid current data", correct: false },
                    { text: "D) To sound old-fashioned", correct: false }
                ],
                explanation: "It supports the claim with a past example."
            },
            {
                type: "example",
                title: "Example: Comparative Evidence",
                content: `
                    <h2>Example: Comparative Evidence</h2>
                    <p>Passage: 'Unlike last year, output rose by 10% this year.'</p>
                    <p>Question: Why compare to last year?</p>
                    <p>Step 1: Identify evidence: 'unlike last year, output rose by 10%.'</p>
                    <p>Step 2: Analyze: It highlights improvement over a baseline.</p>
                    <p>It strengthens the claim with contrast.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'This model outperforms the old one by 20%.' Why compare models?",
                options: [
                    { text: "A) To show relative improvement", correct: true },
                    { text: "B) To criticize the old model", correct: false },
                    { text: "C) To add numbers", correct: false },
                    { text: "D) To repeat data", correct: false }
                ],
                explanation: "Comparison shows the new model’s superiority."
            }
        ]
    },
    3: {
        title: "Data Interpretation in Texts",
        content: [
            {
                type: "example",
                title: "Example: Reading a Graph",
                content: `
                    <h2>Example: Reading a Graph</h2>
                    <p>Graph: Shows a 25% rise in sales from 2019 to 2020.</p>
                    <p>Question: What does the graph indicate about sales?</p>
                    <p>Step 1: Examine the data: 25% rise.</p>
                    <p>Step 2: Interpret: Sales increased significantly in one year.</p>
                    <p>The graph shows growth.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'Population grew from 1,000 to 1,200 over 5 years.' What does this show?",
                options: [
                    { text: "A) Population growth", correct: true },
                    { text: "B) Population decline", correct: false },
                    { text: "C) No change", correct: false },
                    { text: "D) Data error", correct: false }
                ],
                explanation: "The increase from 1,000 to 1,200 indicates population growth."
            },
            {
                type: "example",
                title: "Example: Data and Claims",
                content: `
                    <h2>Example: Data and Claims</h2>
                    <p>Table: 60% of students passed in 2020 vs. 45% in 2019.</p>
                    <p>Question: What claim does this support?</p>
                    <p>Step 1: Compare data: 60% vs. 45%.</p>
                    <p>Step 2: Interpret: It supports a claim of improved pass rates.</p>
                    <p>The table backs academic improvement.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Table: Emissions dropped from 500 tons to 400 tons. What claim is supported?",
                options: [
                    { text: "A) Emissions reduction", correct: true },
                    { text: "B) Emissions increase", correct: false },
                    { text: "C) No change", correct: false },
                    { text: "D) Emissions doubled", correct: false }
                ],
                explanation: "The drop from 500 to 400 tons supports a claim of reduced emissions."
            },
            {
                type: "example",
                title: "Example: Data Trends",
                content: `
                    <h2>Example: Data Trends</h2>
                    <p>Graph: Test scores rose steadily from 70 to 85 over 3 years.</p>
                    <p>Question: What trend does this suggest?</p>
                    <p>Step 1: Analyze: Steady rise from 70 to 85.</p>
                    <p>Step 2: Conclude: It suggests consistent improvement.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Graph: Revenue increased from $50K to $75K over 2 years. What trend is shown?",
                options: [
                    { text: "A) Consistent growth", correct: true },
                    { text: "B) Sudden decline", correct: false },
                    { text: "C) Flat trend", correct: false },
                    { text: "D) Erratic change", correct: false }
                ],
                explanation: "The rise from $50K to $75K indicates steady growth."
            },
            {
                type: "example",
                title: "Example: Comparing Data Points",
                content: `
                    <h2>Example: Comparing Data Points</h2>
                    <p>Table: 80% liked Product A, 60% liked Product B.</p>
                    <p>Question: What does this suggest about preference?</p>
                    <p>Step 1: Compare: 80% vs. 60%.</p>
                    <p>Step 2: Interpret: Product A is preferred over Product B.</p>
                    <p>The table shows a clear preference.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Table: 70% passed Test X, 50% passed Test Y. What does this suggest?",
                options: [
                    { text: "A) Test X was easier", correct: true },
                    { text: "B) Test Y was easier", correct: false },
                    { text: "C) No difference", correct: false },
                    { text: "D) Both failed", correct: false }
                ],
                explanation: "Higher pass rate (70% vs. 50%) suggests Test X was easier."
            },
            {
                type: "example",
                title: "Example: Interpreting Percentages",
                content: `
                    <h2>Example: Interpreting Percentages</h2>
                    <p>Graph: Crime fell by 15% after new laws.</p>
                    <p>Question: What does this indicate?</p>
                    <p>Step 1: Examine: 15% decrease.</p>
                    <p>Step 2: Interpret: Crime reduced post-laws.</p>
                    <p>It suggests the laws were effective.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Graph: Attendance rose by 20% after ads. What does this show?",
                options: [
                    { text: "A) Ads increased attendance", correct: true },
                    { text: "B) Ads decreased attendance", correct: false },
                    { text: "C) No effect", correct: false },
                    { text: "D) Attendance dropped", correct: false }
                ],
                explanation: "A 20% rise links ads to increased attendance."
            },
            {
                type: "example",
                title: "Example: Absolute vs. Relative Data",
                content: `
                    <h2>Example: Absolute vs. Relative Data</h2>
                    <p>Table: Sales were 100 units in 2019, 120 in 2020 (20% increase).</p>
                    <p>Question: What does the percentage add?</p>
                    <p>Step 1: Compare: 100 to 120 units.</p>
                    <p>Step 2: Interpret: 20% shows the relative growth rate.</p>
                    <p>It clarifies the scale of increase.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Table: Users went from 200 to 250 (25% rise). What does 25% indicate?",
                options: [
                    { text: "A) Relative growth", correct: true },
                    { text: "B) Absolute decline", correct: false },
                    { text: "C) No change", correct: false },
                    { text: "D) Total users", correct: false }
                ],
                explanation: "25% shows the proportional increase."
            },
            {
                type: "example",
                title: "Example: Data Anomalies",
                content: `
                    <h2>Example: Data Anomalies</h2>
                    <p>Graph: Scores jumped from 60 to 90, then fell to 65.</p>
                    <p>Question: What does this suggest?</p>
                    <p>Step 1: Analyze: 60 to 90 to 65.</p>
                    <p>Step 2: Interpret: An inconsistent trend with a peak.</p>
                    <p>It shows instability.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Graph: Costs rose from $10K to $15K, then dropped to $12K. What trend is this?",
                options: [
                    { text: "A) Fluctuating", correct: true },
                    { text: "B) Steady rise", correct: false },
                    { text: "C) Steady drop", correct: false },
                    { text: "D) Flat", correct: false }
                ],
                explanation: "Rise then drop shows fluctuation."
            }
        ]
    },
    4: {
        title: "Cross-Text Evidence Comparison",
        content: [
            {
                type: "example",
                title: "Example: Comparing Evidence",
                content: `
                    <h2>Example: Comparing Evidence</h2>
                    <p>Text 1: 'The policy cut costs by 10%.' Text 2: 'Savings were minimal, around 5%.'</p>
                    <p>Question: How do the texts differ on the policy’s impact?</p>
                    <p>Step 1: Identify evidence: 10% vs. 5%.</p>
                    <p>Step 2: Compare: Text 1 claims a higher impact than Text 2.</p>
                    <p>They disagree on magnitude.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Text 1: 'Sales doubled.' Text 2: 'Sales grew by 50%.' Do they agree?",
                options: [
                    { text: "A) No", correct: true },
                    { text: "B) Yes", correct: false },
                    { text: "C) Partially", correct: false },
                    { text: "D) Unclear", correct: false }
                ],
                explanation: "Doubling (100%) is greater than 50%, so they conflict."
            },
            {
                type: "example",
                title: "Example: Evidence Alignment",
                content: `
                    <h2>Example: Evidence Alignment</h2>
                    <p>Text 1: 'Attendance rose by 20%.' Text 2: 'More people attended than ever before.'</p>
                    <p>Question: Do the texts agree?</p>
                    <p>Step 1: Compare: 20% rise vs. record attendance.</p>
                    <p>Step 2: Conclude: Both suggest an increase, though differently phrased.</p>
                    <p>They align on the trend.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Text 1: 'The drug worked in 80% of cases.' Text 2: 'Most patients recovered.' Do they align?",
                options: [
                    { text: "A) Yes", correct: true },
                    { text: "B) No", correct: false },
                    { text: "C) Partially", correct: false },
                    { text: "D) Unclear", correct: false }
                ],
                explanation: "80% and 'most' both indicate a high success rate."
            },
            {
                type: "example",
                title: "Example: Evidence Strength Comparison",
                content: `
                    <h2>Example: Evidence Strength Comparison</h2>
                    <p>Text 1: 'A study of 1,000 people showed benefits.' Text 2: 'Anecdotes suggest it works.'</p>
                    <p>Question: Which evidence is stronger?</p>
                    <p>Step 1: Compare: Study of 1,000 vs. anecdotes.</p>
                    <p>Step 2: Evaluate: The study is more rigorous and reliable.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Text 1: 'Data from 500 trials prove efficacy.' Text 2: 'A few users liked it.' Which is stronger?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both equal", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "500 trials outweigh a few opinions in rigor."
            },
            {
                type: "example",
                title: "Example: Contrasting Quantities",
                content: `
                    <h2>Example: Contrasting Quantities</h2>
                    <p>Text 1: 'Output rose by 30%.' Text 2: 'Output increased slightly, by 10%.'</p>
                    <p>Question: How do they differ?</p>
                    <p>Step 1: Compare: 30% vs. 10%.</p>
                    <p>Step 2: Interpret: Text 1 reports a larger increase.</p>
                    <p>They differ in scale.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Text 1: 'Costs fell by 25%.' Text 2: 'Costs dropped by 15%.' How do they differ?",
                options: [
                    { text: "A) Text 1 shows a bigger drop", correct: true },
                    { text: "B) Text 2 shows a bigger drop", correct: false },
                    { text: "C) They agree", correct: false },
                    { text: "D) No difference", correct: false }
                ],
                explanation: "25% is greater than 15%, showing a larger reduction in Text 1."
            },
            {
                type: "example",
                title: "Example: Evidence Type Difference",
                content: `
                    <h2>Example: Evidence Type Difference</h2>
                    <p>Text 1: 'Surveys show 70% approval.' Text 2: 'Experts predict success.'</p>
                    <p>Question: How do the evidence types differ?</p>
                    <p>Step 1: Identify: Surveys vs. expert opinion.</p>
                    <p>Step 2: Compare: Surveys are data-based; predictions are speculative.</p>
                    <p>They use different approaches.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Text 1: 'Stats show a 40% gain.' Text 2: 'Stories suggest improvement.' What’s the evidence difference?",
                options: [
                    { text: "A) Stats vs. anecdotes", correct: true },
                    { text: "B) Both are stats", correct: false },
                    { text: "C) Both are stories", correct: false },
                    { text: "D) No difference", correct: false }
                ],
                explanation: "Stats are quantitative; stories are qualitative."
            },
            {
                type: "example",
                title: "Example: Evidence Context",
                content: `
                    <h2>Example: Evidence Context</h2>
                    <p>Text 1: 'Rainfall rose by 15% in 2020.' Text 2: 'Rainfall rose by 15% over a decade.'</p>
                    <p>Question: How does context affect interpretation?</p>
                    <p>Step 1: Compare: 15% in one year vs. over 10 years.</p>
                    <p>Step 2: Interpret: Text 1 suggests a sharper increase.</p>
                    <p>Timeframe alters the impact.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Text 1: 'Scores rose 10% in a month.' Text 2: 'Scores rose 10% in 5 years.' How does time matter?",
                options: [
                    { text: "A) Text 1 shows faster change", correct: true },
                    { text: "B) Text 2 shows faster change", correct: false },
                    { text: "C) No difference", correct: false },
                    { text: "D) Both are slow", correct: false }
                ],
                explanation: "10% in a month is quicker than in 5 years."
            },
            {
                type: "example",
                title: "Example: Evidence Specificity",
                content: `
                    <h2>Example: Evidence Specificity</h2>
                    <p>Text 1: 'Growth was 12%, per a study.' Text 2: 'Growth occurred, experts say.'</p>
                    <p>Question: Which is more specific?</p>
                    <p>Step 1: Compare: 12% with source vs. vague claim.</p>
                    <p>Step 2: Evaluate: Text 1 provides precise data.</p>
                    <p>Text 1 is more detailed.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Text 1: 'Profit rose 8%, per records.' Text 2: 'Profit went up, per staff.' Which is more precise?",
                options: [
                    { text: "A) Text 1", correct: true },
                    { text: "B) Text 2", correct: false },
                    { text: "C) Both equal", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "8% with records is more exact than a vague rise."
            }
        ]
    }
};

// Command of Evidence question arrays (unchanged from your code)
const textualEvidenceQuestions = [
    {
        question: "Passage: 'The species population increased by 30% after protections were enacted.' What evidence supports the protections’ success?",
        answers: [
            { text: "A) increased by 30%", correct: true },
            { text: "B) protections were enacted", correct: false },
            { text: "C) species population", correct: false },
            { text: "D) after", correct: false }
        ],
        explanation: "'Increased by 30%' directly shows a successful outcome.",
        difficulty: "easy",
        category: "command-of-evidence"
    }
];

const authorUseOfEvidenceQuestions = [
    {
        question: "Passage: 'Research spanning 20 years confirms the theory.' Why does the author include '20 years'?",
        answers: [
            { text: "A) To show reliability", correct: true },
            { text: "B) To confuse readers", correct: false },
            { text: "C) To fill space", correct: false },
            { text: "D) To mention time", correct: false }
        ],
        explanation: "'20 years' adds credibility by showing extensive research.",
        difficulty: "medium",
        category: "command-of-evidence"
    }
];

const dataInterpretationQuestions = [
    {
        question: "Graph: Profits rose from $100 to $150 in a year. What does this indicate?",
        answers: [
            { text: "A) Profit growth", correct: true },
            { text: "B) Profit decline", correct: false },
            { text: "C) No change", correct: false },
            { text: "D) Data error", correct: false }
        ],
        explanation: "The increase from $100 to $150 shows profit growth.",
        difficulty: "easy",
        category: "command-of-evidence"
    }
];

const crossTextEvidenceQuestions = [
    {
        question: "Text 1: 'The program saved $1 million.' Text 2: 'Savings were negligible.' Do they agree?",
        answers: [
            { text: "A) No", correct: true },
            { text: "B) Yes", correct: false },
            { text: "C) Partially", correct: false },
            { text: "D) Unclear", correct: false }
        ],
        explanation: "$1 million is significant, contradicting 'negligible.'",
        difficulty: "medium",
        category: "command-of-evidence"
    }
];

// lesson-command-of-evidence.js
let categoryStats = {
    "command-of-evidence": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;
let currentItemIndex = 0;
let progressSteps = 0;
let totalSteps = 0; // Set dynamically in startLesson
let isQuizPhase = false;
let showingQuizTransition = false; // New flag for quiz transition

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
        console.log("Start Lesson button hidden with style.display = 'none'");
        currentItemIndex = 0;
        isQuizPhase = false;
        totalSteps = lessons[currentLesson].content.length + getQuizQuestions(currentLesson).length;
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
        console.log("No more items, proceeding to quiz transition");
        showQuizTransition();
        return;
    }

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
            console.log("Next button event listener added");
        } else {
            console.error("Next item button not found!");
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
}

function extractPassage(content) {
    const passageMatch = content.match(/Passage:.*?['"].*?['"]/i) || content.match(/<p>Passage:.*?<\/p>/i);
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
        categoryStats["command-of-evidence"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["command-of-evidence"].incorrect++;
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
        case 1: return textualEvidenceQuestions;
        case 2: return authorUseOfEvidenceQuestions;
        case 3: return dataInterpretationQuestions;
        case 4: return crossTextEvidenceQuestions;
        default: return textualEvidenceQuestions;
    }
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
        progressSteps = lessons[currentLesson].content.length + currentQuestionIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("All quiz questions answered, showing final score");
        showFinalScore();
    }
}

function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
}

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["command-of-evidence"].correct;
    let totalAttempted = totalCorrect + categoryStats["command-of-evidence"].incorrect;

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    logFinalScore(totalCorrect, totalAttempted);
    saveScore(currentLesson, score);

    const lessonContent = document.getElementById('lesson-content');
    const finalScoreElement = document.getElementById('final-score');
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
    finalScoreElement.classList.add('hide'); // Keep it hidden since we’re using lesson-content
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
    localStorage.setItem(`command-of-evidence-lessonScore-${lessonId}`, score);
    console.log(`Saved command-of-evidence-lessonScore-${lessonId}: ${score}`);
}

function showScore() {
    console.log("showScore called (placeholder)");
}