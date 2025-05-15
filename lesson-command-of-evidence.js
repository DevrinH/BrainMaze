// Variables (moved to top to prevent ReferenceError)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "command-of-evidence": { correct: 0, incorrect: 0 }
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
                    <p>Question: What evidence supports the claim that the policy was effective?</p>
                    <p>Step 1: Identify the claim: The policy was effective.</p>
                    <p>Step 2: Find supporting evidence: 'reduced emissions by 20% in its first year.'</p>
                    <p>The evidence is the specific reduction percentage.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a government report stated: 'The new policy reduced emissions by 20% in its first year.' The policy aimed to improve environmental outcomes through regulatory measures."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a conservation report in Greenvale stated: 'The forest grew denser after the conservation effort began.' The effort included protected zones and reforestation programs to restore ecosystems.",
                question: "What evidence supports the conservation effort’s success?",
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
                    <p>Question: Which evidence best supports improved academic performance?</p>
                    <p>Step 1: Focus on the claim: Improved academic performance.</p>
                    <p>Step 2: Evaluate: 'scored higher on tests' directly supports it; 'ran for 10 weeks' does not.</p>
                    <p>The evidence is 'scored higher on tests.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an educational study reported: 'Students who attended the program scored higher on tests. The program ran for 10 weeks.' The study aimed to assess program effectiveness."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a city council in Millville published: 'The law lowered crime rates significantly. It was passed in 2015.' The law introduced stricter penalties and community policing.",
                question: "What supports the claim of reduced crime?",
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
                    <p>Question: What evidence supports better health?</p>
                    <p>Step 1: Identify the claim: Better health outcomes.</p>
                    <p>Step 2: Find evidence: 'losing an average of 10 pounds' supports health improvement.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal reported: 'The diet improved health outcomes, with participants losing an average of 10 pounds.' The study evaluated dietary impacts on wellness."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a marketing agency in Clearwater stated: 'The campaign raised awareness, with 80% of people recognizing the brand.' The campaign used social media and public events to boost visibility.",
                question: "What supports the claim of increased awareness?",
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
                    <p>Question: What evidence supports the app’s success?</p>
                    <p>Step 1: Identify the claim: The app was successful.</p>
                    <p>Step 2: Find evidence: 'increased user engagement by 40% within three months.'</p>
                    <p>The evidence is the precise percentage and timeframe.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a tech review stated: 'The app increased user engagement by 40% within three months.' The app introduced new interactive features to retain users."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a corporate report in Greenvale noted: 'The training enhanced skills, as shown by a 25% productivity boost.' The training focused on technical and leadership skills.",
                question: "What supports the claim of skill enhancement?",
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
                    <p>Question: What evidence supports the event’s popularity?</p>
                    <p>Step 1: Identify the claim: The event was popular.</p>
                    <p>Step 2: Evaluate: '1,000 tickets sold' supports it; 'held on Saturday' does not.</p>
                    <p>The evidence is '1,000 tickets sold.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a festival organizer reported: 'The event drew crowds, with 1,000 tickets sold. It was held on Saturday.' The event featured live music and food stalls."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a health institute in Millville published: 'The therapy reduced stress, with patients reporting 30% fewer symptoms.' The therapy included mindfulness and counseling sessions.",
                question: "What supports the claim of stress reduction?",
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
                    <p>Question: What evidence supports grade improvement?</p>
                    <p>Step 1: Identify the claim: Grades improved.</p>
                    <p>Step 2: Find evidence: 'scores up by 15 points on average.'</p>
                    <p>The evidence is the specific score increase.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a school district reported: 'The class raised grades, with scores up by 15 points on average.' The class implemented new teaching methods."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, an economic review in Clearwater stated: 'The policy sped up recovery, with 90% of businesses reopening within a year.' The policy provided financial aid and tax relief.",
                question: "What supports the claim of faster recovery?",
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
                    <p>Question: What evidence supports project success?</p>
                    <p>Step 1: Identify the claim: The project succeeded.</p>
                    <p>Step 2: Find evidence: 'finishing under budget by $5,000 and on time.'</p>
                    <p>The evidence is specific and sufficient.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a project manager reported: 'The project succeeded, finishing under budget by $5,000 and on time.' The project streamlined operations."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, an education board in Greenvale noted: 'The book improved literacy, with reading scores rising by 20%.' The book was part of a reading initiative.",
                question: "What supports the claim of literacy improvement?",
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
// Command of Evidence question arrays
const textualEvidenceQuestions = [
    // Original question
    {
        passage: "In 2023, a wildlife agency in Clearwater reported: 'The species population increased by 30% after protections were enacted.' The protections included habitat restoration and poaching bans to support endangered species.",
        question: "What evidence supports the protections’ success?",
        answers: [
            { text: "A) increased by 30%", correct: true },
            { text: "B) protections were enacted", correct: false },
            { text: "C) species population", correct: false },
            { text: "D) after", correct: false }
        ],
        explanation: "'Increased by 30%' directly shows a successful outcome.",
        difficulty: "easy",
        category: "command-of-evidence"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2024, a public health study in Millville stated: 'The vaccination program decreased flu cases by 35% in one season.' The program included free clinics and awareness campaigns.",
        question: "What evidence supports the claim that the vaccination program was effective?",
        answers: [
            { text: "A) decreased flu cases by 35%", correct: true },
            { text: "B) free clinics were offered", correct: false },
            { text: "C) awareness campaigns", correct: false },
            { text: "D) one season", correct: false }
        ],
        explanation: "'Decreased flu cases by 35%' directly quantifies the program’s effectiveness.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2023, a technology journal reported: 'The new software reduced processing time by 40% for users.' The software was designed to optimize data analysis tasks.",
        question: "What evidence supports the claim of improved efficiency?",
        answers: [
            { text: "A) reduced processing time by 40%", correct: true },
            { text: "B) software was designed", correct: false },
            { text: "C) data analysis tasks", correct: false },
            { text: "D) users", correct: false }
        ],
        explanation: "'Reduced processing time by 40%' provides specific evidence of efficiency.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2024, an agricultural report in Greenvale noted: 'Crop yields increased by 25% after implementing sustainable practices.' The practices included organic fertilizers and crop rotation.",
        question: "Which evidence best supports the claim of successful sustainable practices?",
        answers: [
            { text: "A) organic fertilizers", correct: false },
            { text: "B) increased by 25%", correct: true },
            { text: "C) crop rotation", correct: false },
            { text: "D) sustainable practices", correct: false }
        ],
        explanation: "'Increased by 25%' directly measures the success of the practices.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2023, a community survey in Clearwater stated: 'Participation in local events rose by 15% after new promotions.' The promotions included flyers and social media ads.",
        question: "What evidence supports the claim that promotions increased participation?",
        answers: [
            { text: "A) flyers were distributed", correct: false },
            { text: "B) participation rose by 15%", correct: true },
            { text: "C) social media ads", correct: false },
            { text: "D) local events", correct: false }
        ],
        explanation: "'Participation rose by 15%' quantifies the impact of the promotions.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2024, an urban planning report in Millville reported: 'Public transport usage grew by 20% after adding new bus routes.' The new routes connected residential areas to downtown.",
        question: "What evidence supports the claim of improved public transport usage?",
        answers: [
            { text: "A) new bus routes", correct: false },
            { text: "B) residential areas", correct: false },
            { text: "C) usage grew by 20%", correct: true },
            { text: "D) downtown connections", correct: false }
        ],
        explanation: "'Usage grew by 20%' directly shows increased public transport usage.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2023, a fitness study in Greenvale stated: 'The exercise program improved endurance, with participants running 10% farther on average.' The program included weekly training sessions.",
        question: "What evidence supports the claim of improved endurance?",
        answers: [
            { text: "A) weekly training sessions", correct: false },
            { text: "B) exercise program", correct: false },
            { text: "C) participants", correct: false },
            { text: "D) running 10% farther", correct: true }
        ],
        explanation: "'Running 10% farther' provides specific evidence of endurance improvement.",
        difficulty: "medium",
        category: "command-of-evidence"
    }
];

const authorUseOfEvidenceQuestions = [
    // Original question
    {
        passage: "In 2023, a scientific journal stated: 'Research spanning 20 years confirms the theory.' The study compiled data from multiple experiments to validate its findings.",
        question: "Why does the author include '20 years'?",
        answers: [
            { text: "A) To show reliability", correct: true },
            { text: "B) To confuse readers", correct: false },
            { text: "C) To fill space", correct: false },
            { text: "D) To mention time", correct: false }
        ],
        explanation: "'20 years' adds credibility by showing extensive research.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2024, a business review in Clearwater reported: 'Sales increased by 18%, according to audited financial statements.' The review aimed to highlight corporate growth.",
        question: "Why does the author mention 'audited financial statements'?",
        answers: [
            { text: "A) To enhance the data’s credibility", correct: true },
            { text: "B) To detail accounting methods", correct: false },
            { text: "C) To list financial auditors", correct: false },
            { text: "D) To complicate the claim", correct: false }
        ],
        explanation: "'Audited financial statements' adds reliability to the sales increase claim.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2023, an environmental report in Millville noted: 'Recycling rates rose by 22%, per city records.' The report emphasized sustainable waste management.",
        question: "Why does the author include 'per city records'?",
        answers: [
            { text: "A) To provide an authoritative source", correct: true },
            { text: "B) To describe city policies", correct: false },
            { text: "C) To mention waste types", correct: false },
            { text: "D) To avoid specific data", correct: false }
        ],
        explanation: "'Per city records' strengthens the claim with an official source.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2024, a health article in Greenvale stated: 'Dr. Lee, a nutrition expert, endorses the diet’s benefits.' The article discussed dietary impacts on wellness.",
        question: "Why does the author mention 'Dr. Lee, a nutrition expert'?",
        answers: [
            { text: "A) To list the doctor’s credentials", correct: false },
            { text: "B) To lend authority to the endorsement", correct: true },
            { text: "C) To promote Dr. Lee’s practice", correct: false },
            { text: "D) To fill article space", correct: false }
        ],
        explanation: "Mentioning Dr. Lee’s expertise adds credibility to the diet’s benefits.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2023, an education report in Clearwater stated: 'Test scores improved, backed by teacher testimonials.' The report focused on classroom interventions.",
        question: "Why does the author use 'teacher testimonials'?",
        answers: [
            { text: "A) To replace statistical data", correct: false },
            { text: "B) To provide relatable evidence", correct: true },
            { text: "C) To list teacher names", correct: false },
            { text: "D) To confuse the reader", correct: false }
        ],
        explanation: "Teacher testimonials offer personal, relatable support for the score improvement.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2024, a technology review in Millville reported: 'The device’s reliability is confirmed by five years of user data.' The review evaluated product performance.",
        question: "Why does the author include 'five years of user data'?",
        answers: [
            { text: "A) To mention the data collection period", correct: false },
            { text: "B) To list user complaints", correct: false },
            { text: "C) To strengthen the reliability claim", correct: true },
            { text: "D) To discuss device features", correct: false }
        ],
        explanation: "'Five years of user data' bolsters the claim with long-term evidence.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2023, an economic analysis in Greenvale stated: 'The policy boosted jobs, per a 2022 labor survey.' The analysis examined employment trends.",
        question: "Why does the author cite 'a 2022 labor survey'?",
        answers: [
            { text: "A) To describe survey methods", correct: false },
            { text: "B) To list job types", correct: false },
            { text: "C) To mention the survey year", correct: false },
            { text: "D) To add credibility to the job growth claim", correct: true }
        ],
        explanation: "Citing the survey enhances the reliability of the job growth claim.",
        difficulty: "medium",
        category: "command-of-evidence"
    }
];

const dataInterpretationQuestions = [
    // Original question
    {
        passage: "In 2023, a financial report in Clearwater presented a graph: 'Profits rose from $100 to $150 in a year.' The report analyzed corporate performance.",
        question: "What does this indicate?",
        answers: [
            { text: "A) Profit growth", correct: true },
            { text: "B) Profit decline", correct: false },
            { text: "C) No change", correct: false },
            { text: "D) Data error", correct: false }
        ],
        explanation: "The increase from $100 to $150 shows profit growth.",
        difficulty: "easy",
        category: "command-of-evidence"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2024, a school district in Millville published a table: 'Math scores rose from 65 to 80 over two years.' The table tracked academic progress.",
        question: "What trend does the table suggest?",
        answers: [
            { text: "A) Consistent improvement", correct: true },
            { text: "B) Score decline", correct: false },
            { text: "C) No change", correct: false },
            { text: "D) Erratic scores", correct: false }
        ],
        explanation: "The rise from 65 to 80 indicates a consistent improvement trend.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2023, an environmental study in Greenvale showed a graph: 'Carbon emissions fell from 1,000 tons to 850 tons in 18 months.' The study evaluated pollution controls.",
        question: "What does the graph indicate about emissions?",
        answers: [
            { text: "A) Emissions reduction", correct: true },
            { text: "B) Emissions increase", correct: false },
            { text: "C) Stable emissions", correct: false },
            { text: "D) Data inconsistency", correct: false }
        ],
        explanation: "The drop from 1,000 to 850 tons shows a reduction in emissions.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2024, a marketing report in Clearwater presented a table: 'Brand recognition rose from 55% to 70% after a campaign.' The table measured campaign impact.",
        question: "What claim does the table support?",
        answers: [
            { text: "A) Campaign costs increased", correct: false },
            { text: "B) Improved brand recognition", correct: true },
            { text: "C) Reduced brand visibility", correct: false },
            { text: "D) Unchanged recognition", correct: false }
        ],
        explanation: "The rise from 55% to 70% supports a claim of improved brand recognition.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2023, a transit authority in Millville showed a graph: 'Ridership grew from 10,000 to 12,000 monthly passengers.' The graph assessed transit usage.",
        question: "What does the graph suggest about ridership?",
        answers: [
            { text: "A) Ridership declined", correct: false },
            { text: "B) Increased ridership", correct: true },
            { text: "C) No change", correct: false },
            { text: "D) Inconsistent data", correct: false }
        ],
        explanation: "The increase from 10,000 to 12,000 suggests growing ridership.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2024, a health survey in Greenvale presented a table: 'Exercise rates rose from 40% to 50% of adults over a year.' The survey tracked lifestyle changes.",
        question: "What does the table indicate?",
        answers: [
            { text: "A) Exercise rates declined", correct: false },
            { text: "B) No lifestyle changes", correct: false },
            { text: "C) Increased exercise rates", correct: true },
            { text: "D) Survey errors", correct: false }
        ],
        explanation: "The rise from 40% to 50% indicates increased exercise rates.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2023, an economic report in Clearwater showed a graph: 'Unemployment fell from 8% to 6% in two years.' The report analyzed labor market trends.",
        question: "What trend does the graph support?",
        answers: [
            { text: "A) Rising unemployment", correct: false },
            { text: "B) Stable labor market", correct: false },
            { text: "C) No trend", correct: false },
            { text: "D) Decreasing unemployment", correct: true }
        ],
        explanation: "The drop from 8% to 6% supports a trend of decreasing unemployment.",
        difficulty: "medium",
        category: "command-of-evidence"
    }
];

const crossTextEvidenceQuestions = [
    // Original question
    {
        passage: "In 2023, two reports evaluated a program in Millville. Text 1: 'The program saved $1 million.' Text 2: 'Savings were negligible.' The reports assessed financial impacts.",
        question: "Do the texts agree on the program’s savings?",
        answers: [
            { text: "A) No", correct: true },
            { text: "B) Yes", correct: false },
            { text: "C) Partially", correct: false },
            { text: "D) Unclear", correct: false }
        ],
        explanation: "$1 million is significant, contradicting 'negligible.'",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2024, two studies in Greenvale assessed a health initiative. Text 1: 'The initiative reduced hospital visits by 15%.' Text 2: 'Hospital visits dropped slightly, by 5%.' The studies evaluated healthcare outcomes.",
        question: "How do the texts differ on the initiative’s impact?",
        answers: [
            { text: "A) Text 1 reports a larger reduction", correct: true },
            { text: "B) Text 2 reports a larger reduction", correct: false },
            { text: "C) They report the same reduction", correct: false },
            { text: "D) They don’t discuss reductions", correct: false }
        ],
        explanation: "Text 1’s 15% reduction is greater than Text 2’s 5%, showing a difference in magnitude.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2023, two articles in Clearwater reviewed a tech upgrade. Text 1: 'The upgrade improved system speed by 25%.' Text 2: 'System speed increased marginally, by 10%.' The articles analyzed performance.",
        question: "Do the texts agree on the upgrade’s effect?",
        answers: [
            { text: "A) No, they differ in scale", correct: true },
            { text: "B) Yes, they report similar gains", correct: false },
            { text: "C) Partially, they both note speed", correct: false },
            { text: "D) Unclear, data is missing", correct: false }
        ],
        explanation: "Text 1’s 25% is significantly higher than Text 2’s 10%, indicating disagreement on scale.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2024, two reports in Millville evaluated a training program. Text 1: 'Employee skills improved, per a survey of 200 workers.' Text 2: 'Skills slightly enhanced, based on manager feedback.' The reports assessed training outcomes.",
        question: "How do the evidence types differ between the texts?",
        answers: [
            { text: "A) Both use surveys", correct: false },
            { text: "B) Survey vs. manager feedback", correct: true },
            { text: "C) Both use manager feedback", correct: false },
            { text: "D) No evidence provided", correct: false }
        ],
        explanation: "Text 1 uses a survey, while Text 2 relies on manager feedback, showing different evidence types.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2023, two studies in Greenvale examined a recycling program. Text 1: 'Recycling increased by 30%, per official data.' Text 2: 'Recycling grew, according to resident reports.' The studies measured environmental impact.",
        question: "Which text provides more precise evidence?",
        answers: [
            { text: "A) Text 2", correct: false },
            { text: "B) Text 1", correct: true },
            { text: "C) Both are equally precise", correct: false },
            { text: "D) Neither is precise", correct: false }
        ],
        explanation: "Text 1’s '30%, per official data' is more precise than Text 2’s vague 'grew.'",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2024, two analyses in Clearwater reviewed a safety policy. Text 1: 'Accidents decreased by 20% in one year.' Text 2: 'Safety improved over several years.' The analyses evaluated workplace safety.",
        question: "How does the time context affect the interpretation?",
        answers: [
            { text: "A) Text 2 shows a quicker change", correct: false },
            { text: "B) Both show the same timeframe", correct: false },
            { text: "C) Text 1 suggests a faster change", correct: true },
            { text: "D) Timeframe is irrelevant", correct: false }
        ],
        explanation: "Text 1’s one-year decrease is faster than Text 2’s several-year improvement.",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2023, two reports in Millville assessed an education reform. Text 1: 'Student attendance rose by 10%.' Text 2: 'More students attended classes regularly.' The reports focused on school engagement.",
        question: "Do the texts align on the reform’s impact?",
        answers: [
            { text: "A) No, they contradict", correct: false },
            { text: "B) Partially, they differ in detail", correct: false },
            { text: "C) Unclear, data is vague", correct: false },
            { text: "D) Yes, both show increased attendance", correct: true }
        ],
        explanation: "Both texts indicate increased attendance, with Text 1 quantifying it at 10%.",
        difficulty: "medium",
        category: "command-of-evidence"
    }
];

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
        categoryStats["command-of-evidence"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["command-of-evidence"].incorrect++;
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
    let totalCorrect = categoryStats["command-of-evidence"].correct;
    let totalAttempted = totalCorrect + categoryStats["command-of-evidence"].incorrect;

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
    localStorage.setItem(`command-of-evidence-lessonScore-${lessonId}`, score);
    console.log(`Saved command-of-evidence-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`command-of-evidence-lessonScore-${lessonId}`) || "Not completed yet";
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