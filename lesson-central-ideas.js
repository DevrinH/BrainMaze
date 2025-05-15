// Variables (aligned with SAT structure)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "central-ideas": { correct: 0, incorrect: 0 }
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
        title: "Identifying the Central Idea",
        content: [
            {
                type: "example",
                title: "Example 1: Finding the Central Idea",
                content: `
                    <h2>Example 1: Finding the Central Idea</h2>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the main focus: Renewable energy adoption.</p>
                    <p>Step 2: Determine why: Due to environmental and economic benefits.</p>
                    <p>The central idea is the increasing adoption of renewable energy for its benefits.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an energy journal reported: 'Renewable energy sources, such as solar and wind, are gaining popularity due to their environmental benefits and decreasing costs.' The journal aimed to highlight sustainable energy trends."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a community report in Greenvale stated: 'Urban gardens enhance sustainability by reducing food transport emissions and supporting local ecosystems.' The report aimed to promote eco-friendly community initiatives.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Urban gardens enhance sustainability", correct: true },
                    { text: "B) Food transport emissions are high", correct: false },
                    { text: "C) Ecosystems are local", correct: false },
                    { text: "D) Sustainability is critical", correct: false }
                ],
                explanation: "The central idea focuses on urban gardens’ role in sustainability; emissions and ecosystems are supporting details."
            },
            {
                type: "example",
                title: "Example 2: Distinguishing Central Idea from Details",
                content: `
                    <h2>Example 2: Distinguishing Central Idea from Details</h2>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the main point: Exercise improves health.</p>
                    <p>Step 2: Exclude details: Stress reduction and heart health are specifics.</p>
                    <p>The central idea is the health benefits of exercise.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health study in Clearwater noted: 'Regular exercise improves overall health. It reduces stress and strengthens cardiovascular function.' The study emphasized the importance of physical activity."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a technology review in Millville reported: 'Digital communication tools have transformed workplaces. Video conferencing and instant messaging enable rapid collaboration.' The review highlighted productivity gains from technology.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Digital tools transform workplaces", correct: true },
                    { text: "B) Video conferencing enables collaboration", correct: false },
                    { text: "C) Messaging is instant", correct: false },
                    { text: "D) Workplaces need technology", correct: false }
                ],
                explanation: "The central idea is the transformative impact of digital tools; conferencing and messaging are details."
            },
            {
                type: "example",
                title: "Example 3: Central Idea in Complex Texts",
                content: `
                    <h2>Example 3: Central Idea in Complex Texts</h2>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the overarching topic: Climate change impacts ecosystems.</p>
                    <p>Step 2: Focus on the broad effect: Not specific examples like reefs or forests.</p>
                    <p>The central idea is the impact of climate change on ecosystems.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental report in Greenvale stated: 'Climate change disrupts ecosystems. Rising temperatures damage coral reefs, and droughts threaten forest biodiversity.' The report called for urgent conservation efforts."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a city planning journal in Clearwater noted: 'Public transit alleviates urban congestion. High-capacity buses and trains reduce road traffic significantly.' The journal advocated for expanded transit infrastructure.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Public transit alleviates congestion", correct: true },
                    { text: "B) Buses have high capacity", correct: false },
                    { text: "C) Trains reduce traffic", correct: false },
                    { text: "D) Congestion is an urban issue", correct: false }
                ],
                explanation: "The central idea is transit’s role in reducing congestion; bus and train specifics are details."
            },
            {
                type: "example",
                title: "Example 4: Central Idea Across Multiple Points",
                content: `
                    <h2>Example 4: Central Idea Across Multiple Points</h2>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the common theme: Education’s societal impact.</p>
                    <p>Step 2: Generalize: Drives progress through skills and innovation.</p>
                    <p>The central idea is education’s role in societal progress.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an academic journal in Millville stated: 'Education drives societal progress. Schools develop critical skills, and universities foster innovation.' The journal emphasized education’s broad impact."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a health magazine in Greenvale published: 'Healthy diets reduce chronic disease risk. Regular intake of fruits and vegetables lowers heart disease incidence.' The magazine promoted nutritional awareness.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Healthy diets reduce disease risk", correct: true },
                    { text: "B) Fruits lower heart disease", correct: false },
                    { text: "C) Vegetables are nutritious", correct: false },
                    { text: "D) Chronic diseases are common", correct: false }
                ],
                explanation: "The central idea is diets’ role in disease prevention; fruit and vegetable intake is a detail."
            },
            {
                type: "example",
                title: "Example 5: Implicit Central Idea",
                content: `
                    <h2>Example 5: Implicit Central Idea</h2>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Infer beyond facts: Shift in children’s behavior.</p>
                    <p>Step 2: Generalize: Technology’s influence on playtime.</p>
                    <p>The central idea is technology’s impact on reducing outdoor play.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a child psychology study in Clearwater noted: 'Children spend less time playing outdoors. Digital devices increasingly occupy their leisure time.' The study explored technology’s effects on youth."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, an environmental journal in Millville published: 'Forests are crucial for carbon sequestration. Trees absorb millions of tons of CO2 annually, mitigating climate change.' The journal advocated for forest preservation.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Forests aid carbon sequestration", correct: true },
                    { text: "B) Trees absorb CO2", correct: false },
                    { text: "C) CO2 is absorbed annually", correct: false },
                    { text: "D) Climate change needs mitigation", correct: false }
                ],
                explanation: "The central idea is forests’ role in carbon sequestration; CO2 absorption is a detail."
            },
            {
                type: "example",
                title: "Example 6: Central Idea with Multiple Benefits",
                content: `
                    <h2>Example 6: Central Idea with Multiple Benefits</h2>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify focus: Remote work’s advantages.</p>
                    <p>Step 2: Generalize: Enhances efficiency through various means.</p>
                    <p>The central idea is remote work’s efficiency benefits.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a workplace study in Greenvale reported: 'Remote work enhances efficiency. It eliminates commutes and increases productivity.' The study promoted flexible work policies."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a library association in Clearwater published: 'Libraries promote lifelong learning. They offer books, online resources, and workshops for all ages.' The association aimed to boost library usage.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Libraries promote lifelong learning", correct: true },
                    { text: "B) Books are available", correct: false },
                    { text: "C) Workshops are offered", correct: false },
                    { text: "D) Learning requires libraries", correct: false }
                ],
                explanation: "The central idea is libraries’ role in learning; books and workshops are details."
            },
            {
                type: "example",
                title: "Example 7: Central Idea in Argumentative Texts",
                content: `
                    <h2>Example 7: Central Idea in Argumentative Texts</h2>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify argument: Recycling’s importance.</p>
                    <p>Step 2: Generalize: Supports environmental sustainability.</p>
                    <p>The central idea is recycling’s role in sustainability.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Millville stated: 'Recycling supports sustainability. It reduces landfill waste and conserves natural resources.' The journal advocated for recycling programs."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, an arts council in Greenvale published: 'Art fosters community creativity. Museums and local classes inspire innovative expression.' The council aimed to increase arts funding.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Art fosters community creativity", correct: true },
                    { text: "B) Museums inspire expression", correct: false },
                    { text: "C) Classes are local", correct: false },
                    { text: "D) Creativity needs funding", correct: false }
                ],
                explanation: "The central idea is art’s role in creativity; museums and classes are details."
            }
        ]
    },
    2: {
        title: "Summarizing a Passage",
        content: [
            {
                type: "example",
                title: "Example 1: Basic Summarization",
                content: `
                    <h2>Example 1: Basic Summarization</h2>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Identify key points: Volunteering strengthens communities.</p>
                    <p>Step 2: Condense: Highlight labor and social benefits.</p>
                    <p>Summary: Volunteering strengthens communities through labor and social ties.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a community journal in Clearwater reported: 'Volunteering strengthens communities by providing free labor and fostering social connections.' The journal aimed to encourage civic engagement."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, an environmental report in Greenvale stated: 'Recycling reduces waste and conserves resources like water and timber.' The report promoted sustainable waste management practices.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Recycling reduces waste and saves resources", correct: true },
                    { text: "B) Water is conserved by recycling", correct: false },
                    { text: "C) Timber is a resource", correct: false },
                    { text: "D) Waste needs reduction", correct: false }
                ],
                explanation: "The summary captures the main benefits without specific resources."
            },
            {
                type: "example",
                title: "Example 2: Avoiding Over-Detail",
                content: `
                    <h2>Example 2: Avoiding Over-Detail</h2>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Focus on essence: Festival attracts crowds with events.</p>
                    <p>Step 2: Omit specifics: Exclude numbers or event types.</p>
                    <p>Summary: The festival draws crowds with diverse attractions.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a tourism report in Millville stated: 'The annual festival attracts 5,000 visitors with music, art, and food events.' The report aimed to boost tourism revenue."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a city council in Clearwater reported: 'The safety law, enacted in 2023, reduced accidents by enforcing speed limits.' The council highlighted its commitment to public safety.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) The safety law reduced accidents", correct: true },
                    { text: "B) Speed limits were enforced", correct: false },
                    { text: "C) The law was enacted in 2023", correct: false },
                    { text: "D) Safety is a priority", correct: false }
                ],
                explanation: "The summary focuses on accident reduction, omitting details like enactment year."
            },
            {
                type: "example",
                title: "Example 3: Summarizing Complex Passages",
                content: `
                    <h2>Example 3: Summarizing Complex Passages</h2>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Capture essence: Social media’s electoral influence.</p>
                    <p>Step 2: Include key aspects: Spreads information and misinformation.</p>
                    <p>Summary: Social media influences elections through information and misinformation.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a political journal in Greenvale reported: 'Social media shapes elections. It rapidly spreads campaign messages but also misinformation.' The journal analyzed digital media’s impact."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a tourism board in Millville reported: 'The state park, opened in 2018, attracts visitors with hiking trails and scenic views.' The board promoted the park as a tourism destination.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) The state park attracts visitors", correct: true },
                    { text: "B) The park opened in 2018", correct: false },
                    { text: "C) Trails are popular", correct: false },
                    { text: "D) Views are scenic", correct: false }
                ],
                explanation: "The summary captures the park’s appeal, excluding specifics like the opening year."
            },
            {
                type: "example",
                title: "Example 4: Summarizing Cause and Effect",
                content: `
                    <h2>Example 4: Summarizing Cause and Effect</h2>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Core idea: Deforestation’s wildlife impact.</p>
                    <p>Step 2: Simplify: Destroys habitats, harming animals.</p>
                    <p>Summary: Deforestation harms wildlife by destroying habitats.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental study in Clearwater reported: 'Deforestation threatens wildlife. It destroys habitats and disrupts food chains.' The study called for forest protection."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a health journal in Greenvale reported: 'Exercise enhances mental health. It reduces anxiety and improves mood through endorphin release.' The journal promoted active lifestyles.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Exercise improves mental health", correct: true },
                    { text: "B) Anxiety is reduced", correct: false },
                    { text: "C) Endorphins improve mood", correct: false },
                    { text: "D) Mental health needs improvement", correct: false }
                ],
                explanation: "The summary focuses on mental health benefits, omitting mechanisms like endorphins."
            },
            {
                type: "example",
                title: "Example 5: Summarizing Multiple Benefits",
                content: `
                    <h2>Example 5: Summarizing Multiple Benefits</h2>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Main point: Meditation’s health benefits.</p>
                    <p>Step 2: Generalize: Improves well-being broadly.</p>
                    <p>Summary: Meditation improves health in multiple ways.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a wellness journal in Millville reported: 'Meditation improves health. It reduces blood pressure and enhances sleep quality.' The journal advocated for mindfulness practices."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, an energy report in Clearwater stated: 'Solar panels reduce costs. They lower electricity bills and require minimal maintenance.' The report encouraged renewable energy adoption.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Solar panels lower costs", correct: true },
                    { text: "B) Electricity bills are reduced", correct: false },
                    { text: "C) Maintenance is minimal", correct: false },
                    { text: "D) Costs need reduction", correct: false }
                ],
                explanation: "The summary captures cost reduction, excluding specific benefits."
            },
            {
                type: "example",
                title: "Example 6: Summarizing Descriptive Texts",
                content: `
                    <h2>Example 6: Summarizing Descriptive Texts</h2>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Essence: City’s tourism appeal.</p>
                    <p>Step 2: Condense: Attractions draw visitors.</p>
                    <p>Summary: The city attracts tourists with its landmarks.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a tourism journal in Greenvale reported: 'The city draws tourists with its historic landmarks and vibrant festivals.' The journal promoted tourism growth."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a library journal in Millville reported: 'Libraries foster intellectual growth. They provide access to books and digital learning tools.' The journal advocated for library funding.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Libraries foster intellectual growth", correct: true },
                    { text: "B) Books are accessible", correct: false },
                    { text: "C) Digital tools aid learning", correct: false },
                    { text: "D) Intellect needs growth", correct: false }
                ],
                explanation: "The summary captures intellectual growth, excluding specific resources."
            },
            {
                type: "example",
                title: "Example 7: Summarizing Argumentative Texts",
                content: `
                    <h2>Example 7: Summarizing Argumentative Texts</h2>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Core argument: Biking’s environmental benefit.</p>
                    <p>Step 2: Simplify: Reduces pollution.</p>
                    <p>Summary: Biking reduces environmental pollution.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Clearwater reported: 'Biking reduces pollution. It decreases car usage and emissions.' The journal promoted sustainable transportation."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, an arts journal in Greenvale reported: 'Art education enhances creativity. Classes and workshops inspire innovative thinking.' The journal advocated for arts programs in schools.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Art education enhances creativity", correct: true },
                    { text: "B) Classes inspire thinking", correct: false },
                    { text: "C) Workshops are creative", correct: false },
                    { text: "D) Creativity needs enhancement", correct: false }
                ],
                explanation: "The summary focuses on creativity enhancement, excluding specific methods."
            }
        ]
    },
    3: {
        title: "Identifying Key Details",
        content: [
            {
                type: "example",
                title: "Example 1: Spotting Key Details",
                content: `
                    <h2>Example 1: Spotting Key Details</h2>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Identify specifics supporting the main idea: 30% emissions reduction.</p>
                    <p>Step 2: Determine cause: Factory regulations.</p>
                    <p>Key details: 30% reduction, factory regulations.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale reported: 'The policy reduced emissions by 30%, primarily through stricter factory regulations.' The journal highlighted effective pollution controls."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a sports journal in Millville reported: 'The team won 12 games due to improved coaching strategies.' The journal aimed to boost fan support with the team’s success.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Improved coaching strategies", correct: true },
                    { text: "B) 12 games won", correct: false },
                    { text: "C) Team competed", correct: false },
                    { text: "D) Fans were supportive", correct: false }
                ],
                explanation: "Coaching strategies explain the wins, making it a key detail."
            },
            {
                type: "example",
                title: "Example 2: Details vs. Minor Information",
                content: `
                    <h2>Example 2: Details vs. Minor Information</h2>
                    <p>Question: What are the key details for sales success?</p>
                    <p>Step 1: Focus on success: 1 million copies sold.</p>
                    <p>Step 2: Exclude minor info: Publication year and author are less relevant.</p>
                    <p>Key detail: 1 million copies sold.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a publishing journal in Clearwater reported: 'The novel sold 1 million copies. It was published in 2020 by a debut author.' The journal celebrated the novel’s success."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a weather journal in Greenvale reported: 'The hurricane caused $3 billion in damage due to high winds.' The journal aimed to secure disaster relief funding.",
                question: "What is a key detail?",
                options: [
                    { text: "A) High winds", correct: true },
                    { text: "B) $3 billion in damage", correct: false },
                    { text: "C) Hurricane occurred", correct: false },
                    { text: "D) Relief funding needed", correct: false }
                ],
                explanation: "High winds explain the damage, making it a key detail."
            },
            {
                type: "example",
                title: "Example 3: Multiple Key Details",
                content: `
                    <h2>Example 3: Multiple Key Details</h2>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Identify impact: 40% efficiency increase.</p>
                    <p>Step 2: Add specifics: $1.5 million savings.</p>
                    <p>Key details: 40% efficiency increase, $1.5 million savings.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a technology journal in Millville reported: 'The new system increased efficiency by 40% and saved $1.5 million annually.' The journal aimed to promote technological innovation."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a tech journal in Clearwater reported: 'The app gained 1.5 million users due to its user-friendly interface.' The journal aimed to highlight the app’s market success.",
                question: "What is a key detail?",
                options: [
                    { text: "A) User-friendly interface", correct: true },
                    { text: "B) 1.5 million users", correct: false },
                    { text: "C) App was developed", correct: false },
                    { text: "D) Market success reported", correct: false }
                ],
                explanation: "The interface explains the user gain, making it a key detail."
            },
            {
                type: "example",
                title: "Example 4: Key Details Supporting Claims",
                content: `
                    <h2>Example 4: Key Details Supporting Claims</h2>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Focus on proof: 15-pound weight loss.</p>
                    <p>Step 2: Add context: Over six months.</p>
                    <p>Key details: 15-pound weight loss, six months.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Greenvale reported: 'The diet program was effective. Participants lost 15 pounds over six months.' The journal promoted the diet’s benefits."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a fundraising journal in Millville reported: 'The campaign raised $2 million through targeted social media ads.' The journal aimed to showcase fundraising strategies.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Targeted social media ads", correct: true },
                    { text: "B) $2 million raised", correct: false },
                    { text: "C) Campaign was launched", correct: false },
                    { text: "D) Fundraising was strategic", correct: false }
                ],
                explanation: "Social media ads explain the fundraising success, a key detail."
            },
            {
                type: "example",
                title: "Example 5: Key Details in Descriptive Texts",
                content: `
                    <h2>Example 5: Key Details in Descriptive Texts</h2>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Success indicator: 12,000 attendees.</p>
                    <p>Step 2: Reason: Live performances.</p>
                    <p>Key details: 12,000 attendees, live performances.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a cultural journal in Clearwater reported: 'The festival drew 12,000 attendees with its live performances.' The journal promoted cultural events."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a transportation journal in Greenvale reported: 'The new subway line cut commute times by 20 minutes with its express routes.' The journal advocated for transit expansion.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Express routes", correct: true },
                    { text: "B) 20 minutes saved", correct: false },
                    { text: "C) Subway line opened", correct: false },
                    { text: "D) Commutes are long", correct: false }
                ],
                explanation: "Express routes explain the time reduction, a key detail."
            },
            {
                type: "example",
                title: "Example 6: Key Details in Arguments",
                content: `
                    <h2>Example 6: Key Details in Arguments</h2>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Support for claim: $40 million funding.</p>
                    <p>Step 2: Context: Previous year.</p>
                    <p>Key details: $40 million funding, previous year.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an education journal in Millville reported: 'Taxes support education. They provided $40 million for schools last year.' The journal justified education funding."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, an education journal in Clearwater reported: 'The tutoring program reduced dropout rates by 15% through personalized lessons.' The journal promoted educational interventions.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Personalized lessons", correct: true },
                    { text: "B) 15% dropout reduction", correct: false },
                    { text: "C) Program was implemented", correct: false },
                    { text: "D) Dropouts are a concern", correct: false }
                ],
                explanation: "Personalized lessons explain the dropout reduction, a key detail."
            },
            {
                type: "example",
                title: "Example 7: Key Details with Quantitative Data",
                content: `
                    <h2>Example 7: Key Details with Quantitative Data</h2>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Quantify impact: 20% accident reduction.</p>
                    <p>Step 2: Reason: Safety measures.</p>
                    <p>Key details: 20% accident reduction, safety measures.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a safety journal in Greenvale reported: 'The law reduced accidents by 20% through enhanced safety measures.' The journal promoted safety regulations."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a charity journal in Millville reported: 'The fundraiser raised $750,000 through celebrity endorsements.' The journal aimed to highlight effective fundraising strategies.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Celebrity endorsements", correct: true },
                    { text: "B) $750,000 raised", correct: false },
                    { text: "C) Fundraiser was held", correct: false },
                    { text: "D) Strategies were effective", correct: false }
                ],
                explanation: "Celebrity endorsements explain the fundraising success, a key detail."
            }
        ]
    },
    4: {
        title: "Understanding Supporting Evidence",
        content: [
            {
                type: "example",
                title: "Example 1: Recognizing Supporting Evidence",
                content: `
                    <h2>Example 1: Recognizing Supporting Evidence</h2>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Identify claim: Exercise improves mental health.</p>
                    <p>Step 2: Find support: Reduced depression rates.</p>
                    <p>The evidence is the reduction in depression rates.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Clearwater reported: 'Exercise improves mental health. Studies show a 25% reduction in depression rates among active individuals.' The journal promoted physical activity."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, an academic journal in Greenvale reported: 'Higher education increases earnings. Graduates earn 20% more than non-graduates annually.' The journal encouraged college enrollment.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Graduates earn 20% more", correct: true },
                    { text: "B) Education is valuable", correct: false },
                    { text: "C) Earnings increase", correct: false },
                    { text: "D) Graduates attend college", correct: false }
                ],
                explanation: "The 20% earnings increase directly supports the claim."
            },
            {
                type: "example",
                title: "Example 2: Evidence Relevance",
                content: `
                    <h2>Example 2: Evidence Relevance</h2>
                    <p>Question: What evidence supports effectiveness?</p>
                    <p>Step 1: Claim: Diet is effective.</p>
                    <p>Step 2: Evidence: 12-pound weight loss proves it.</p>
                    <p>The evidence is the 12-pound average weight loss.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a nutrition journal in Millville reported: 'The diet is effective. Participants lost an average of 12 pounds over four months.' The journal promoted the diet’s benefits."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a city journal in Clearwater reported: 'The law reduced crime. Police reported a 30% decrease in thefts last year.' The journal supported law enforcement policies.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) 30% decrease in thefts", correct: true },
                    { text: "B) Police reported data", correct: false },
                    { text: "C) Crime was reduced", correct: false },
                    { text: "D) Law was enforced", correct: false }
                ],
                explanation: "The 30% theft decrease directly supports the crime reduction claim."
            },
            {
                type: "example",
                title: "Example 3: Evidence in Context",
                content: `
                    <h2>Example 3: Evidence in Context</h2>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Forests mitigate climate change.</p>
                    <p>Step 2: Evidence: CO2 absorption statistic.</p>
                    <p>The evidence is the absorption of 1.8 billion tons of CO2.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale reported: 'Forests mitigate climate change. They absorb 1.8 billion tons of CO2 annually.' The journal advocated for forest conservation."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a wellness journal in Millville reported: 'Meditation enhances sleep quality. Studies show a 20% reduction in insomnia symptoms.' The journal promoted mindfulness practices.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) 20% reduction in insomnia symptoms", correct: true },
                    { text: "B) Meditation is practiced", correct: false },
                    { text: "C) Sleep quality is important", correct: false },
                    { text: "D) Studies were conducted", correct: false }
                ],
                explanation: "The 20% reduction in insomnia supports the sleep quality claim."
            },
            {
                type: "example",
                title: "Example 4: Quantitative Evidence",
                content: `
                    <h2>Example 4: Quantitative Evidence</h2>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Program reduced costs.</p>
                    <p>Step 2: Evidence: $8 million savings.</p>
                    <p>The evidence is the $8 million in savings.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Clearwater reported: 'The efficiency program reduced costs. It saved $8 million in one year.' The journal highlighted corporate savings."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a corporate journal in Greenvale reported: 'Training improves productivity. Employee output increased by 25% after workshops.' The journal supported training investments.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Employee output increased by 25%", correct: true },
                    { text: "B) Workshops were held", correct: false },
                    { text: "C) Productivity is valuable", correct: false },
                    { text: "D) Training occurred", correct: false }
                ],
                explanation: "The 25% output increase supports the productivity claim."
            },
            {
                type: "example",
                title: "Example 5: Qualitative Evidence",
                content: `
                    <h2>Example 5: Qualitative Evidence</h2>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Policy improved morale.</p>
                    <p>Step 2: Evidence: Employee satisfaction reports.</p>
                    <p>The evidence is the reported increase in satisfaction.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a workplace journal in Millville reported: 'The policy improved employee morale. Surveys showed increased satisfaction among workers.' The journal promoted employee-friendly policies."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a technology journal in Clearwater reported: 'The app enhances efficiency. Users completed tasks 15% faster with its intuitive design.' The journal highlighted the app’s benefits.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Users completed tasks 15% faster", correct: true },
                    { text: "B) Intuitive design was used", correct: false },
                    { text: "C) Efficiency is enhanced", correct: false },
                    { text: "D) App was developed", correct: false }
                ],
                explanation: "The 15% faster task completion supports the efficiency claim."
            },
            {
                type: "example",
                title: "Example 6: Evidence with Examples",
                content: `
                    <h2>Example 6: Evidence with Examples</h2>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Gardening reduces stress.</p>
                    <p>Step 2: Evidence: Reported relaxation after gardening.</p>
                    <p>The evidence is the reported relaxation.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a wellness journal in Greenvale reported: 'Gardening reduces stress. Participants reported feeling relaxed after tending plants.' The journal promoted therapeutic activities."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, an education journal in Millville reported: 'The course improves academic performance. Students scored 10% higher on exams after interactive lessons.' The journal promoted innovative teaching methods.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Students scored 10% higher", correct: true },
                    { text: "B) Interactive lessons were used", correct: false },
                    { text: "C) Performance is academic", correct: false },
                    { text: "D) Course was offered", correct: false }
                ],
                explanation: "The 10% score increase supports the performance claim."
            },
            {
                type: "example",
                title: "Example 7: Evidence in Arguments",
                content: `
                    <h2>Example 7: Evidence in Arguments</h2>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Cycling improves fitness.</p>
                    <p>Step 2: Evidence: Lower cholesterol levels.</p>
                    <p>The evidence is the reduction in cholesterol levels.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Clearwater reported: 'Cycling improves fitness. Cyclists showed a 15% reduction in cholesterol levels.' The journal promoted active lifestyles."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a wellness journal in Greenvale reported: 'Reading enhances focus. Studies show readers sustain attention 20% longer.' The journal advocated for reading habits.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Readers sustain attention 20% longer", correct: true },
                    { text: "B) Studies were conducted", correct: false },
                    { text: "C) Focus is enhanced", correct: false },
                    { text: "D) Reading is common", correct: false }
                ],
                explanation: "The 20% longer attention span supports the focus enhancement claim."
            }
        ]
    },
    5: {
        title: "Paraphrasing and Restating Ideas",
        content: [
            {
                type: "example",
                title: "Example 1: Simple Paraphrase",
                content: `
                    <h2>Example 1: Simple Paraphrase</h2>
                    <p>Question: Paraphrase the passage.</p>
                    <p>Step 1: Identify meaning: Cost reduction saved money.</p>
                    <p>Step 2: Restate: The initiative cut expenses, saving funds.</p>
                    <p>Paraphrase: The initiative lowered costs by 10%, conserving money.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Millville reported: 'The initiative saved money by reducing costs 10%.' The journal highlighted financial efficiency."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a literacy journal in Clearwater reported: 'Reading expands vocabulary by exposing readers to new words.' The journal promoted reading for language development.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) Reading boosts vocabulary through new word exposure", correct: true },
                    { text: "B) New words expand vocabulary", correct: false },
                    { text: "C) Readers learn words", correct: false },
                    { text: "D) Vocabulary needs expansion", correct: false }
                ],
                explanation: "It restates reading’s vocabulary benefit in different phrasing."
            },
            {
                type: "example",
                title: "Example 2: Restating Complex Ideas",
                content: `
                    <h2>Example 2: Restating Complex Ideas</h2>
                    <p>Question: Paraphrase the passage.</p>
                    <p>Step 1: Break down: Urban growth harms nature.</p>
                    <p>Step 2: Rephrase: City expansion damages ecosystems.</p>
                    <p>Paraphrase: Urban development threatens biodiversity by destroying habitats.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale reported: 'Urban sprawl harms biodiversity by destroying natural habitats.' The journal advocated for sustainable urban planning."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, an economic journal in Millville reported: 'The policy boosted employment by attracting businesses.' The journal highlighted economic growth strategies.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) The policy increased jobs by drawing companies", correct: true },
                    { text: "B) Businesses create jobs", correct: false },
                    { text: "C) Employment was boosted", correct: false },
                    { text: "D) Policies attract businesses", correct: false }
                ],
                explanation: "It restates job growth and business attraction in new words."
            },
            {
                type: "example",
                title: "Example 3: Paraphrasing with Evidence",
                content: `
                    <h2>Example 3: Paraphrasing with Evidence</h2>
                    <p>Question: Paraphrase the passage.</p>
                    <p>Step 1: Core idea: Drug improves recovery.</p>
                    <p>Step 2: Restate: Medication reduces symptoms, aiding healing.</p>
                    <p>Paraphrase: The medication cut symptoms by 35%, enhancing recovery.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a medical journal in Clearwater reported: 'The drug improved recovery by reducing symptoms 35%.' The journal promoted the drug’s efficacy."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a cultural journal in Greenvale reported: 'The film earned awards for its innovative cinematography.' The journal aimed to promote the film festival.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) The movie won prizes for its creative visuals", correct: true },
                    { text: "B) Cinematography is innovative", correct: false },
                    { text: "C) Awards were earned", correct: false },
                    { text: "D) Films need awards", correct: false }
                ],
                explanation: "It restates the awards and cinematography in different phrasing."
            },
            {
                type: "example",
                title: "Example 4: Paraphrasing Descriptive Texts",
                content: `
                    <h2>Example 4: Paraphrasing Descriptive Texts</h2>
                    <p>Question: Paraphrase the passage.</p>
                    <p>Step 1: Meaning: Park offers tranquility.</p>
                    <p>Step 2: Restate: Park provides calm with serene paths.</p>
                    <p>Paraphrase: The park fosters peace with its quiet trails.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a tourism journal in Millville reported: 'The park provides tranquility with its serene trails.' The journal promoted the park as a peaceful destination."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a health journal in Clearwater reported: 'Exercise improves mood by triggering endorphin release.' The journal promoted physical activity for mental health.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) Physical activity enhances mood by releasing endorphins", correct: true },
                    { text: "B) Endorphins improve mood", correct: false },
                    { text: "C) Exercise is healthy", correct: false },
                    { text: "D) Mood needs enhancement", correct: false }
                ],
                explanation: "It restates the mood benefit and endorphin link in new words."
            },
            {
                type: "example",
                title: "Example 5: Paraphrasing Cause and Effect",
                content: `
                    <h2>Example 5: Paraphrasing Cause and Effect</h2>
                    <p>Question: Paraphrase the passage.</p>
                    <p>Step 1: Core: Rainforests sustain ecosystems.</p>
                    <p>Step 2: Restate: Rainforests support life via oxygen.</p>
                    <p>Paraphrase: Rainforests promote biodiversity through oxygen production.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale reported: 'Rainforests sustain ecosystems by producing oxygen.' The journal advocated for rainforest conservation."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a neuroscience journal in Millville reported: 'Sleep enhances memory by strengthening neural connections.' The journal promoted sleep for cognitive health.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) Rest improves memory by enhancing brain links", correct: true },
                    { text: "B) Neural connections strengthen", correct: false },
                    { text: "C) Memory needs sleep", correct: false },
                    { text: "D) Sleep is cognitive", correct: false }
                ],
                explanation: "It restates the memory benefit and neural link in different phrasing."
            },
            {
                type: "example",
                title: "Example 6: Paraphrasing Arguments",
                content: `
                    <h2>Example 6: Paraphrasing Arguments</h2>
                    <p>Question: Paraphrase the passage.</p>
                    <p>Step 1: Meaning: Taxes fund education.</p>
                    <p>Step 2: Restate: Taxes support schools financially.</p>
                    <p>Paraphrase: Taxes finance education by supporting schools.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an education journal in Clearwater reported: 'Taxes fund education by providing resources for schools.' The journal justified education funding."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a wellness journal in Greenvale reported: 'Music enhances focus by calming the mind.' The journal promoted music for productivity.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) Music improves concentration by soothing thoughts", correct: true },
                    { text: "B) Minds are calmed", correct: false },
                    { text: "C) Focus needs music", correct: false },
                    { text: "D) Music is productive", correct: false }
                ],
                explanation: "It restates the focus benefit and calming effect in new words."
            },
            {
                type: "example",
                title: "Example 7: Paraphrasing with Quantitative Data",
                content: `
                    <h2>Example 7: Paraphrasing with Quantitative Data</h2>
                    <p>Question: Paraphrase the passage.</p>
                    <p>Step 1: Core: Policy reduced emissions.</p>
                    <p>Step 2: Restate: Initiative cut pollution significantly.</p>
                    <p>Paraphrase: The initiative lowered emissions by 25% in two years.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Millville reported: 'The policy reduced emissions by 25% over two years.' The journal promoted sustainable policies."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a charity journal in Clearwater reported: 'The fundraiser collected $1.2 million through social media campaigns.' The journal highlighted effective fundraising strategies.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) The event raised $1.2 million via social media efforts", correct: true },
                    { text: "B) Social media raised money", correct: false },
                    { text: "C) $1.2 million was collected", correct: false },
                    { text: "D) Fundraising is effective", correct: false }
                ],
                explanation: "It restates the fundraising success and method in new phrasing."
            }
        ]
    }
};

// Quiz arrays (seven questions each, with 2 A, 2 B, 1 C, 1 D correct answers)
const centralIdeaQuestions = [
    // Original question (adapted from GED script)
    {
        passage: "In 2024, a city planning journal in Clearwater reported: 'Public transit alleviates urban congestion. High-capacity buses and trains reduce road traffic significantly.' The journal advocated for expanded transit infrastructure to improve urban mobility.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Public transit alleviates urban congestion", correct: true },
            { text: "B) Buses have high capacity", correct: false },
            { text: "C) Trains reduce traffic", correct: false },
            { text: "D) Urban congestion is a problem", correct: false }
        ],
        explanation: "The central idea is transit’s role in reducing congestion; bus and train specifics are details.",
        difficulty: "easy",
        category: "central-ideas"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a health journal in Millville reported: 'Regular physical activity promotes well-being. It reduces stress and enhances cardiovascular health.' The journal aimed to encourage active lifestyles.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Physical activity promotes well-being", correct: true },
            { text: "B) Stress is reduced by activity", correct: false },
            { text: "C) Cardiovascular health improves", correct: false },
            { text: "D) Well-being needs promotion", correct: false }
        ],
        explanation: "The central idea is physical activity’s role in well-being; stress and heart health are details.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an education journal in Greenvale reported: 'Online learning platforms broaden educational access. They offer flexible courses and global resources.' The journal promoted digital education innovations.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Online platforms broaden educational access", correct: true },
            { text: "B) Courses are flexible", correct: false },
            { text: "C) Resources are global", correct: false },
            { text: "D) Education needs broadening", correct: false }
        ],
        explanation: "The central idea is online platforms’ role in access; courses and resources are details.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a community journal in Clearwater reported: 'Community gardens foster sustainability. They reduce carbon footprints and support local biodiversity.' The journal aimed to promote eco-friendly initiatives.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Carbon footprints are reduced", correct: false },
            { text: "B) Community gardens foster sustainability", correct: true },
            { text: "C) Biodiversity is supported", correct: false },
            { text: "D) Sustainability is essential", correct: false }
        ],
        explanation: "The central idea is gardens’ role in sustainability; carbon and biodiversity are details.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, an environmental journal in Millville reported: 'Wetlands reduce flood risks. They absorb excess water and protect coastal communities.' The journal advocated for wetland conservation.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Excess water causes floods", correct: false },
            { text: "B) Wetlands reduce flood risks", correct: true },
            { text: "C) Coastal communities are protected", correct: false },
            { text: "D) Flood risks need reduction", correct: false }
        ],
        explanation: "The central idea is wetlands’ role in flood reduction; water absorption is a detail.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a workplace journal in Greenvale reported: 'Flexible work policies enhance productivity. They reduce commuting time and improve employee satisfaction.' The journal promoted flexible work arrangements.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Commuting time is reduced", correct: false },
            { text: "B) Employee satisfaction improves", correct: false },
            { text: "C) Flexible policies enhance productivity", correct: true },
            { text: "D) Productivity needs enhancement", correct: false }
        ],
        explanation: "The central idea is flexible policies’ productivity benefit; commuting and satisfaction are details.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a cultural journal in Clearwater reported: 'Arts programs enrich communities. They promote cultural diversity and creative expression.' The journal advocated for arts funding.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Cultural diversity is promoted", correct: false },
            { text: "B) Creative expression is encouraged", correct: false },
            { text: "C) Communities need arts", correct: false },
            { text: "D) Arts programs enrich communities", correct: true }
        ],
        explanation: "The central idea is arts programs’ community enrichment; diversity and expression are details.",
        difficulty: "medium",
        category: "central-ideas"
    }
];

const summarizingQuestions = [
    // Original question (adapted from GED script)
    {
        passage: "In 2024, an environmental journal in Greenvale reported: 'Recycling reduces waste and conserves resources like water and timber.' The journal promoted sustainable waste management practices.",
        question: "Summarize the passage.",
        answers: [
            { text: "A) Recycling reduces waste and conserves resources", correct: true },
            { text: "B) Water is conserved by recycling", correct: false },
            { text: "C) Timber is a resource", correct: false },
            { text: "D) Waste needs reduction", correct: false }
        ],
        explanation: "The summary captures the main benefits without listing specific resources.",
        difficulty: "easy",
        category: "central-ideas"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a tourism journal in Millville reported: 'The festival attracts thousands with its diverse cultural performances and exhibits.' The journal aimed to boost tourism through cultural events.",
        question: "Summarize the passage.",
        answers: [
            { text: "A) The festival draws crowds with cultural events", correct: true },
            { text: "B) Performances are diverse", correct: false },
            { text: "C) Exhibits attract thousands", correct: false },
            { text: "D) Tourism needs boosting", correct: false }
        ],
        explanation: "The summary focuses on the festival’s appeal, omitting specific event types.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a health journal in Clearwater reported: 'Physical activity improves mental health by reducing stress and enhancing mood.' The journal promoted active lifestyles for psychological benefits.",
        question: "Summarize the passage.",
        answers: [
            { text: "A) Physical activity boosts mental health", correct: true },
            { text: "B) Stress is reduced", correct: false },
            { text: "C) Mood is enhanced", correct: false },
            { text: "D) Mental health needs improvement", correct: false }
        ],
        explanation: "The summary captures the mental health benefit, excluding specific effects.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a city planning journal in Greenvale reported: 'The new transit policy reduced traffic congestion by improving bus routes.' The journal advocated for sustainable urban mobility.",
        question: "Summarize the passage.",
        answers: [
            { text: "A) Bus routes reduce congestion", correct: false },
            { text: "B) The transit policy reduces traffic congestion", correct: true },
            { text: "C) Traffic is a concern", correct: false },
            { text: "D) Urban mobility is sustainable", correct: false }
        ],
        explanation: "The summary focuses on congestion reduction, omitting specific improvements.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, an education journal in Clearwater reported: 'Online learning platforms expand access to education through flexible courses.' The journal promoted digital education solutions.",
        question: "Summarize the passage.",
        answers: [
            { text: "A) Courses are flexible", correct: false },
            { text: "B) Online platforms expand educational access", correct: true },
            { text: "C) Education is accessible", correct: false },
            { text: "D) Access needs expansion", correct: false }
        ],
        explanation: "The summary captures the core idea of access, excluding specific features.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a wellness journal in Millville reported: 'Meditation promotes well-being by reducing stress and improving sleep.' The journal encouraged mindfulness practices.",
        question: "Summarize the passage.",
        answers: [
            { text: "A) Stress is reduced by meditation", correct: false },
            { text: "B) Sleep is improved", correct: false },
            { text: "C) Meditation promotes well-being", correct: true },
            { text: "D) Well-being needs promotion", correct: false }
        ],
        explanation: "The summary focuses on well-being, omitting specific benefits.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a community journal in Greenvale reported: 'Volunteer programs enhance community cohesion through cleanups and social events.' The journal encouraged civic participation.",
        question: "Summarize the passage.",
        answers: [
            { text: "A) Cleanups enhance cohesion", correct: false },
            { text: "B) Social events unite communities", correct: false },
            { text: "C) Volunteers are needed", correct: false },
            { text: "D) Volunteer programs enhance community cohesion", correct: true }
        ],
        explanation: "The summary captures the core idea of cohesion, excluding specific activities.",
        difficulty: "medium",
        category: "central-ideas"
    }
];

const keyDetailsQuestions = [
    // Original question (adapted from GED script)
    {
        passage: "In 2024, a sports journal in Millville reported: 'The team won 12 games due to improved coaching strategies.' The journal aimed to boost fan support with the team’s success.",
        question: "What is a key detail?",
        answers: [
            { text: "A) Improved coaching strategies", correct: true },
            { text: "B) 12 games won", correct: false },
            { text: "C) Team competed", correct: false },
            { text: "D) Fans were supportive", correct: false }
        ],
        explanation: "Coaching strategies explain the wins, making it a key detail.",
        difficulty: "easy",
        category: "central-ideas"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a weather journal in Greenvale reported: 'The storm caused $4 billion in damage due to severe flooding.' The journal aimed to secure disaster relief funding.",
        question: "What is a key detail?",
        answers: [
            { text: "A) Severe flooding", correct: true },
            { text: "B) $4 billion in damage", correct: false },
            { text: "C) Storm occurred", correct: false },
            { text: "D) Relief funding was sought", correct: false }
        ],
        explanation: "Severe flooding explains the damage, a key detail.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a technology journal in Clearwater reported: 'The app gained 2 million users due to its seamless interface.' The journal highlighted the app’s market success.",
        question: "What is a key detail?",
        answers: [
            { text: "A) Seamless interface", correct: true },
            { text: "B) 2 million users", correct: false },
            { text: "C) App was launched", correct: false },
            { text: "D) Market success was reported", correct: false }
        ],
        explanation: "The interface explains the user gain, a key detail.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a health journal in Millville reported: 'The diet lowered cholesterol by 10% through plant-based meals.' The journal promoted dietary changes.",
        question: "What is a key detail?",
        answers: [
            { text: "A) 10% cholesterol reduction", correct: false },
            { text: "B) Plant-based meals", correct: true },
            { text: "C) Diet was followed", correct: false },
            { text: "D) Cholesterol is a concern", correct: false }
        ],
        explanation: "Plant-based meals explain the cholesterol reduction, a key detail.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a fundraising journal in Greenvale reported: 'The campaign raised $1.5 million through targeted online ads.' The journal aimed to showcase effective fundraising strategies.",
        question: "What is a key detail?",
        answers: [
            { text: "A) $1.5 million raised", correct: false },
            { text: "B) Targeted online ads", correct: true },
            { text: "C) Campaign was held", correct: false },
            { text: "D) Strategies were effective", correct: false }
        ],
        explanation: "Online ads explain the fundraising success, a key detail.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a transportation journal in Clearwater reported: 'The new rail line reduced commute times by 15 minutes with its high-speed trains.' The journal advocated for transit investments.",
        question: "What is a key detail?",
        answers: [
            { text: "A) 15 minutes saved", correct: false },
            { text: "B) Rail line was built", correct: false },
            { text: "C) High-speed trains", correct: true },
            { text: "D) Commutes are long", correct: false }
        ],
        explanation: "High-speed trains explain the time reduction, a key detail.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, an education journal in Millville reported: 'The mentorship program cut dropout rates by 12% through one-on-one guidance.' The journal promoted educational support programs.",
        question: "What is a key detail?",
        answers: [
            { text: "A) 12% dropout reduction", correct: false },
            { text: "B) Program was implemented", correct: false },
            { text: "C) Dropouts were reduced", correct: false },
            { text: "D) One-on-one guidance", correct: true }
        ],
        explanation: "One-on-one guidance explains the dropout reduction, a key detail.",
        difficulty: "medium",
        category: "central-ideas"
    }
];

const supportingEvidenceQuestions = [
    // Original question (adapted from GED script)
    {
        passage: "In 2024, an academic journal in Greenvale reported: 'Higher education increases earnings. Graduates earn 20% more than non-graduates annually.' The journal encouraged college enrollment.",
        question: "What is the supporting evidence?",
        answers: [
            { text: "A) Graduates earn 20% more", correct: true },
            { text: "B) Education is valuable", correct: false },
            { text: "C) Earnings increase", correct: false },
            { text: "D) Graduates attend college", correct: false }
        ],
        explanation: "The 20% earnings increase directly supports the claim.",
        difficulty: "easy",
        category: "central-ideas"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a city journal in Clearwater reported: 'The safety ordinance reduced crime. Police reported a 25% drop in burglaries last year.' The journal supported law enforcement policies.",
        question: "What is the supporting evidence?",
        answers: [
            { text: "A) 25% drop in burglaries", correct: true },
            { text: "B) Police reported data", correct: false },
            { text: "C) Ordinance was enforced", correct: false },
            { text: "D) Crime is a concern", correct: false }
        ],
        explanation: "The 25% drop in burglaries supports the crime reduction claim.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a wellness journal in Millville reported: 'Meditation improves focus. Studies show a 15% increase in attention span among meditators.' The journal promoted mindfulness practices.",
        question: "What is the supporting evidence?",
        answers: [
            { text: "A) 15% increase in attention span", correct: true },
            { text: "B) Meditation is practiced", correct: false },
            { text: "C) Focus is important", correct: false },
            { text: "D) Studies were conducted", correct: false }
        ],
        explanation: "The 15% attention span increase supports the focus improvement claim.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a business journal in Greenvale reported: 'Training boosts productivity. Employee output rose by 20% after intensive workshops.' The journal advocated for training investments.",
        question: "What is the supporting evidence?",
        answers: [
            { text: "A) Workshops were intensive", correct: false },
            { text: "B) Employee output rose by 20%", correct: true },
            { text: "C) Productivity is valuable", correct: false },
            { text: "D) Training was conducted", correct: false }
        ],
        explanation: "The 20% output increase supports the productivity claim.",
        difficulty: "medium",
        category: "central-ideas"
    },
    // New question 4 (Correct: B)
   // New question 4 (Correct: B)
   {
    passage: "In 2024, a technology journal in Clearwater reported: 'The software enhances efficiency. Users completed tasks 18% faster with its streamlined features.' The journal highlighted software benefits.",
    question: "What is the supporting evidence?",
    answers: [
        { text: "A) Streamlined features were used", correct: false },
        { text: "B) Users completed tasks 18% faster", correct: true },
        { text: "C) Efficiency is enhanced", correct: false },
        { text: "D) Software was developed", correct: false }
    ],
    explanation: "The 18% faster task completion directly supports the efficiency claim.",
    difficulty: "medium",
    category: "central-ideas"
},
// New question 5 (Correct: C)
{
    passage: "In 2023, an education journal in Millville reported: 'The course improves student performance. Test scores increased by 12% after interactive lessons.' The journal promoted innovative teaching methods.",
    question: "What is the supporting evidence?",
    answers: [
        { text: "A) Interactive lessons were used", correct: false },
        { text: "B) Course was offered", correct: false },
        { text: "C) Test scores increased by 12%", correct: true },
        { text: "D) Performance is important", correct: false }
    ],
    explanation: "The 12% score increase supports the performance improvement claim.",
    difficulty: "medium",
    category: "central-ideas"
},
// New question 6 (Correct: D)
{
    passage: "In 2024, a wellness journal in Greenvale reported: 'Reading enhances concentration. Studies show readers maintain focus 15% longer than non-readers.' The journal advocated for reading habits.",
    question: "What is the supporting evidence?",
    answers: [
        { text: "A) Reading is common", correct: false },
        { text: "B) Studies were conducted", correct: false },
        { text: "C) Concentration is improved", correct: false },
        { text: "D) Readers maintain focus 15% longer", correct: true }
    ],
    explanation: "The 15% longer focus duration supports the concentration claim.",
    difficulty: "medium",
    category: "central-ideas"
}
];

const paraphrasingQuestions = [
// Original question (adapted from GED script)
{
    passage: "In 2024, a literacy journal in Clearwater reported: 'Reading expands vocabulary by exposing readers to new words.' The journal promoted reading for language development.",
    question: "Paraphrase the passage.",
    answers: [
        { text: "A) Reading boosts vocabulary through new word exposure", correct: true },
        { text: "B) Vocabulary grows with reading", correct: false },
        { text: "C) New words are in books", correct: false },
        { text: "D) Reading is educational", correct: false }
    ],
    explanation: "It restates reading’s vocabulary benefit in different phrasing.",
    difficulty: "easy",
    category: "central-ideas"
},
// New question 1 (Correct: A)
{
    passage: "In 2023, an economic journal in Millville reported: 'The policy increased employment by attracting new businesses.' The journal highlighted economic growth strategies.",
    question: "Paraphrase the passage.",
    answers: [
        { text: "A) The policy boosted jobs by drawing companies", correct: true },
        { text: "B) Businesses create jobs", correct: false },
        { text: "C) Employment increased", correct: false },
        { text: "D) Policies attract businesses", correct: false }
    ],
    explanation: "It restates job growth and business attraction in new words.",
    difficulty: "medium",
    category: "central-ideas"
},
// New question 2 (Correct: A)
{
    passage: "In 2024, a health journal in Clearwater reported: 'Exercise improves mood by triggering endorphin release.' The journal promoted physical activity for mental health.",
    question: "Paraphrase the passage.",
    answers: [
        { text: "A) Physical activity enhances mood by releasing endorphins", correct: true },
        { text: "B) Endorphins improve mood", correct: false },
        { text: "C) Exercise is healthy", correct: false },
        { text: "D) Mood needs improvement", correct: false }
    ],
    explanation: "It restates the mood benefit and endorphin link in different phrasing.",
    difficulty: "medium",
    category: "central-ideas"
},
// New question 3 (Correct: B)
{
    passage: "In 2023, a cultural journal in Greenvale reported: 'The festival attracts crowds with its vibrant performances.' The journal aimed to promote cultural tourism.",
    question: "Paraphrase the passage.",
    answers: [
        { text: "A) Performances draw crowds", correct: false },
        { text: "B) The festival draws visitors with lively shows", correct: true },
        { text: "C) Crowds attend festivals", correct: false },
        { text: "D) Tourism needs promotion", correct: false }
    ],
    explanation: "It restates the festival’s appeal and performances in new phrasing.",
    difficulty: "medium",
    category: "central-ideas"
},
// New question 4 (Correct: B)
{
    passage: "In 2024, an environmental journal in Millville reported: 'Wetlands reduce flooding by absorbing excess water.' The journal advocated for wetland conservation.",
    question: "Paraphrase the passage.",
    answers: [
        { text: "A) Excess water causes flooding", correct: false },
        { text: "B) Wetlands prevent floods by taking in surplus water", correct: true },
        { text: "C) Flooding is reduced", correct: false },
        { text: "D) Wetlands need conservation", correct: false }
    ],
    explanation: "It restates flood reduction and water absorption in different words.",
    difficulty: "medium",
    category: "central-ideas"
},
// New question 5 (Correct: C)
{
    passage: "In 2023, a workplace journal in Greenvale reported: 'Flexible schedules enhance productivity by improving work-life balance.' The journal promoted flexible work policies.",
    question: "Paraphrase the passage.",
    answers: [
        { text: "A) Work-life balance boosts productivity", correct: false },
        { text: "B) Flexible schedules are productive", correct: false },
        { text: "C) Flexible hours increase efficiency by balancing work and life", correct: true },
        { text: "D) Productivity needs schedules", correct: false }
    ],
    explanation: "It restates productivity and balance in different phrasing.",
    difficulty: "medium",
    category: "central-ideas"
},
// New question 6 (Correct: D)
{
    passage: "In 2024, a cultural journal in Clearwater reported: 'Arts programs spark creativity through diverse workshops.' The journal advocated for arts education.",
    question: "Paraphrase the passage.",
    answers: [
        { text: "A) Workshops are diverse", correct: false },
        { text: "B) Creativity needs arts", correct: false },
        { text: "C) Arts programs are creative", correct: false },
        { text: "D) Arts initiatives foster creativity with varied workshops", correct: true }
    ],
    explanation: "It restates creativity and workshops in new phrasing.",
    difficulty: "medium",
    category: "central-ideas"
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
    categoryStats["central-ideas"].correct++;
} else {
    selectedBtn.classList.add("incorrect");
    categoryStats["central-ideas"].incorrect++;
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
    case 1: return centralIdeaQuestions;
    case 2: return summarizingQuestions;
    case 3: return keyDetailsQuestions;
    case 4: return supportingEvidenceQuestions;
    case 5: return paraphrasingQuestions;
    default: return centralIdeaQuestions;
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
let totalCorrect = categoryStats["central-ideas"].correct;
let totalAttempted = totalCorrect + categoryStats["central-ideas"].incorrect;

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
localStorage.setItem(`central-ideas-lessonScore-${lessonId}`, score);
console.log(`Saved central-ideas-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
return localStorage.getItem(`central-ideas-lessonScore-${lessonId}`) || "Not completed yet";
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