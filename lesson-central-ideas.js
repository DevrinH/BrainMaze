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
        title: "Identifying the Central Idea",
        content: [
            {
                type: "example",
                title: "Example 1: Finding the Central Idea",
                content: `
                    <h2>Example 1: Finding the Central Idea</h2>
                    <p>Passage: 'Renewable energy sources like solar and wind are increasingly adopted due to their environmental benefits and cost declines.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Look for the main focus: Adoption of renewable energy.</p>
                    <p>Step 2: Identify why: Environmental benefits and cost declines.</p>
                    <p>The central idea is the growing use of renewable energy for its advantages.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a community report in Millville highlighted: 'Urban gardens promote sustainability by reducing food transport costs and supporting local ecosystems.' The report aimed to inform residents about initiatives enhancing environmental responsibility.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Urban gardens promote sustainability", correct: true },
                    { text: "B) Food transport costs are high", correct: false },
                    { text: "C) Gardens are urban", correct: false },
                    { text: "D) Sustainability is important", correct: false }
                ],
                explanation: "The main focus is on urban gardens and sustainability; 'reducing food transport costs' is a detail."
            },
            {
                type: "example",
                title: "Example 2: Distinguishing Central Idea from Details",
                content: `
                    <h2>Example 2: Distinguishing Central Idea from Details</h2>
                    <p>Passage: 'Exercise improves health. Studies show it reduces stress and boosts heart function.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Separate main point: Exercise improves health.</p>
                    <p>Step 2: Recognize details: 'reduces stress' and 'boosts heart function' support it.</p>
                    <p>The central idea is exercise’s health benefits.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a workplace wellness program in Greenvale distributed a guide stating: 'Technology has transformed communication. Emails and text messages enable instant collaboration across teams.' The guide emphasized the role of digital tools in enhancing productivity.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Technology has transformed communication", correct: true },
                    { text: "B) Emails enable collaboration", correct: false },
                    { text: "C) Text messages are instant", correct: false },
                    { text: "D) Communication is digital", correct: false }
                ],
                explanation: "The central idea is the broad impact of technology on communication; specific examples are details."
            },
            {
                type: "example",
                title: "Example 3: Central Idea in Longer Texts",
                content: `
                    <h2>Example 3: Central Idea in Longer Texts</h2>
                    <p>Passage: 'Climate change affects ecosystems. Rising temperatures harm coral reefs, while droughts impact forests.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify the overarching topic: Climate change’s effects.</p>
                    <p>Step 2: Focus: On ecosystems, not just specific examples.</p>
                    <p>The central idea is climate change’s impact on ecosystems.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a city planner’s report in Clearwater noted: 'Public transit reduces traffic congestion. Buses and trains transport thousands of passengers daily, easing road pressure.' The report aimed to justify investments in transit infrastructure.",
                question: "What is the central idea?",
                answers: [
                    { text: "A) Public transit reduces traffic", correct: true },
                    { text: "B) Buses carry passengers", correct: false },
                    { text: "C) Trains run daily", correct: false },
                    { text: "D) Traffic is a problem", correct: false }
                ],
                explanation: "The main focus is transit reducing traffic; other options are details."
            },
            {
                type: "example",
                title: "Example 4: Central Idea Across Paragraphs",
                content: `
                    <h2>Example 4: Central Idea Across Paragraphs</h2>
                    <p>Passage: 'Education shapes society. Schools teach skills, and universities drive innovation.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Find the common theme: Education’s role.</p>
                    <p>Step 2: Broaden it: Impacts society through skills and innovation.</p>
                    <p>The central idea is education’s influence on society.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a health campaign in Millville distributed a pamphlet stating: 'Healthy diets prevent chronic diseases. Consuming fruits and vegetables lowers the risk of heart conditions.' The campaign sought to educate residents on nutrition’s role in long-term health.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Healthy diets prevent disease", correct: true },
                    { text: "B) Fruits are healthy", correct: false },
                    { text: "C) Vegetables lower risks", correct: false },
                    { text: "D) Disease is common", correct: false }
                ],
                explanation: "The main idea is about diets preventing disease; specifics are supporting details."
            },
            {
                type: "example",
                title: "Example 5: Implicit Central Idea",
                content: `
                    <h2>Example 5: Implicit Central Idea</h2>
                    <p>Passage: 'Kids play outside less now. Screens keep them indoors more often.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Look beyond stated facts: Shift in behavior.</p>
                    <p>Step 2: Infer: Technology reduces outdoor play.</p>
                    <p>The central idea is technology’s impact on kids’ playtime.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, an environmental journal in Greenvale published: 'Forests play a vital role in carbon storage. Trees absorb significant amounts of CO2 annually, helping mitigate climate change.' The article underscored the importance of forest conservation for global ecosystems.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Forests store carbon", correct: true },
                    { text: "B) Trees absorb CO2", correct: false },
                    { text: "C) Carbon is stored yearly", correct: false },
                    { text: "D) Forests are green", correct: false }
                ],
                explanation: "The central idea is forests’ role in carbon storage; CO2 absorption is a detail."
            },
            {
                type: "example",
                title: "Example 6: Central Idea with Multiple Points",
                content: `
                    <h2>Example 6: Central Idea with Multiple Points</h2>
                    <p>Passage: 'Remote work saves time. It cuts commutes and boosts productivity.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Identify focus: Remote work’s benefits.</p>
                    <p>Step 2: Generalize: It saves time through various means.</p>
                    <p>The central idea is remote work’s time-saving advantages.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a community center in Clearwater issued a brochure stating: 'Libraries foster lifelong learning. They provide access to books, digital resources, and educational programs for all ages.' The brochure aimed to promote the library’s role in community development.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Libraries support learning", correct: true },
                    { text: "B) Books are available", correct: false },
                    { text: "C) Internet is free", correct: false },
                    { text: "D) Learning needs support", correct: false }
                ],
                explanation: "The central idea is libraries’ role in learning; books and internet are examples."
            },
            {
                type: "example",
                title: "Example 7: Central Idea in Argumentative Texts",
                content: `
                    <h2>Example 7: Central Idea in Argumentative Texts</h2>
                    <p>Passage: 'Recycling is essential. It cuts waste and saves resources.'</p>
                    <p>Question: What is the central idea?</p>
                    <p>Step 1: Pinpoint argument: Recycling’s importance.</p>
                    <p>Step 2: Broaden: Benefits like waste and resource management.</p>
                    <p>The central idea is recycling’s critical role in sustainability.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, an arts council in Millville released a statement: 'Art inspires creativity in communities. Local museums and art classes spark innovative ideas among residents.' The statement aimed to advocate for increased arts funding to enhance cultural engagement.",
                question: "What is the central idea?",
                options: [
                    { text: "A) Art inspires creativity", correct: true },
                    { text: "B) Museums have art", correct: false },
                    { text: "C) Classes spark ideas", correct: false },
                    { text: "D) Creativity needs art", correct: false }
                ],
                explanation: "The central idea is art’s role in inspiring creativity; specifics are details."
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
                    <p>Passage: 'Volunteering helps communities by providing free labor and fostering social bonds.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Identify key points: Volunteering helps communities.</p>
                    <p>Step 2: Condense: Include benefits like labor and bonds.</p>
                    <p>Summary: Volunteering aids communities through labor and social connections.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a recycling initiative in Greenvale published a guide stating: 'Recycling reduces waste and saves resources like water and trees.' The guide aimed to educate residents on environmental conservation practices.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Recycling reduces waste and conserves resources", correct: true },
                    { text: "B) Water is saved by recycling", correct: false },
                    { text: "C) Trees are resources", correct: false },
                    { text: "D) Waste is a problem", correct: false }
                ],
                explanation: "The summary captures the main benefits without listing specific resources."
            },
            {
                type: "example",
                title: "Example 2: Avoiding Over-Detail",
                content: `
                    <h2>Example 2: Avoiding Over-Detail</h2>
                    <p>Passage: 'The festival drew 5,000 people. It featured music, food, and art over three days.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Focus on essence: Festival attracted many with diverse events.</p>
                    <p>Step 2: Omit specifics like numbers or days.</p>
                    <p>Summary: The festival attracted crowds with various activities.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a city council in Clearwater announced: 'The new law, passed in June, improved safety by limiting speeds.' The announcement highlighted the council’s commitment to public safety through legislative measures.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) New law improved safety", correct: true },
                    { text: "B) Law passed in June", correct: false },
                    { text: "C) Speeds were limited", correct: false },
                    { text: "D) Safety was a concern", correct: false }
                ],
                explanation: "Focus on the core idea (safety improvement), omitting details like 'June' or 'speeds.'"
            },
            {
                type: "example",
                title: "Example 3: Summarizing Complex Passages",
                content: `
                    <h2>Example 3: Summarizing Complex Passages</h2>
                    <p>Passage: 'Social media influences elections. It spreads information fast but also misinformation.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Capture essence: Social media’s election impact.</p>
                    <p>Step 2: Include key aspects: Information spread, including misinformation.</p>
                    <p>Summary: Social media affects elections by spreading information and misinformation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a tourism board in Millville reported: 'The park, built in 2015, attracts tourists with its trails and scenic views.' The report aimed to promote tourism by showcasing the park’s appeal to visitors.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) The park draws visitors with its features", correct: true },
                    { text: "B) The park was built in 2015", correct: false },
                    { text: "C) Trails are popular", correct: false },
                    { text: "D) Views are scenic", correct: false }
                ],
                explanation: "The summary captures the essence without specific details like the year."
            },
            {
                type: "example",
                title: "Example 4: Summarizing Cause and Effect",
                content: `
                    <h2>Example 4: Summarizing Cause and Effect</h2>
                    <p>Passage: 'Deforestation harms wildlife. It destroys habitats and food sources.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Core idea: Deforestation’s impact.</p>
                    <p>Step 2: Simplify: Affects wildlife negatively.</p>
                    <p>Summary: Deforestation damages wildlife by ruining their environment.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a health journal in Greenvale published: 'Exercise boosts mood. It releases endorphins and reduces stress, enhancing emotional well-being.' The journal sought to inform readers about the psychological benefits of physical activity.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Exercise improves mood", correct: true },
                    { text: "B) Endorphins are released", correct: false },
                    { text: "C) Stress is reduced", correct: false },
                    { text: "D) Mood needs boosting", correct: false }
                ],
                explanation: "The summary focuses on the main effect, omitting specific mechanisms."
            },
            {
                type: "example",
                title: "Example 5: Summarizing Multiple Benefits",
                content: `
                    <h2>Example 5: Summarizing Multiple Benefits</h2>
                    <p>Passage: 'Meditation aids health. It lowers blood pressure and improves sleep.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Main point: Meditation’s health benefits.</p>
                    <p>Step 2: Generalize: Positive health effects.</p>
                    <p>Summary: Meditation enhances health in various ways.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, an energy company in Clearwater distributed a flyer stating: 'Solar panels save money. They reduce electricity bills and have a long lifespan.' The flyer aimed to encourage residents to adopt renewable energy solutions.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Solar panels cut costs", correct: true },
                    { text: "B) Bills are reduced", correct: false },
                    { text: "C) Panels last decades", correct: false },
                    { text: "D) Money is important", correct: false }
                ],
                explanation: "The summary captures the cost-saving essence without details."
            },
            {
                type: "example",
                title: "Example 6: Summarizing Descriptive Texts",
                content: `
                    <h2>Example 6: Summarizing Descriptive Texts</h2>
                    <p>Passage: 'The city thrives on tourism. Beaches and museums draw crowds yearly.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Essence: City’s tourism success.</p>
                    <p>Step 2: Condense: Attractions bring visitors.</p>
                    <p>Summary: The city prospers due to tourist attractions.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a library association in Millville published a report stating: 'Books enrich minds. They offer knowledge and spark imagination, fostering intellectual growth.' The report aimed to advocate for increased library funding to support education.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Books enhance thinking", correct: true },
                    { text: "B) Knowledge is offered", correct: false },
                    { text: "C) Imagination is sparked", correct: false },
                    { text: "D) Minds need enriching", correct: false }
                ],
                explanation: "The summary covers the main benefit without listing specifics."
            },
            {
                type: "example",
                title: "Example 7: Summarizing Argumentative Texts",
                content: `
                    <h2>Example 7: Summarizing Argumentative Texts</h2>
                    <p>Passage: 'Biking reduces pollution. It cuts car use and emissions.'</p>
                    <p>Question: Summarize the passage.</p>
                    <p>Step 1: Core argument: Biking’s environmental benefit.</p>
                    <p>Step 2: Simplify: Lowers pollution.</p>
                    <p>Summary: Biking helps the environment by reducing pollution.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, an arts education program in Greenvale distributed a brochure stating: 'Art classes boost skills. They teach techniques and inspire creative projects, enhancing students’ abilities.' The brochure aimed to promote arts education for youth development.",
                question: "Summarize the passage.",
                options: [
                    { text: "A) Art classes improve abilities", correct: true },
                    { text: "B) Techniques are taught", correct: false },
                    { text: "C) Projects are inspired", correct: false },
                    { text: "D) Skills need boosting", correct: false }
                ],
                explanation: "The summary focuses on skill improvement, excluding details."
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
                    <p>Passage: 'The policy cut emissions by 30% in two years, mainly through factory regulations.'</p>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Look for specifics supporting the main idea: 30% cut, two years.</p>
                    <p>Step 2: Identify cause: Factory regulations.</p>
                    <p>Key details: 30% reduction, two-year span, factory regulations.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a sports league in Millville reported: 'The team won 10 games due to strong defense.' The report highlighted the team’s success to boost community support.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Strong defense", correct: true },
                    { text: "B) 10 games", correct: false },
                    { text: "C) Team", correct: false },
                    { text: "D) Winning", correct: false }
                ],
                explanation: "It explains the reason for winning, supporting the main idea."
            },
            {
                type: "example",
                title: "Example 2: Details vs. Minor Info",
                content: `
                    <h2>Example 2: Details vs. Minor Info</h2>
                    <p>Passage: 'The book sold 1 million copies. It was written in 2010 by a new author.'</p>
                    <p>Question: What are the key details for sales success?</p>
                    <p>Step 1: Focus on success: 1 million copies.</p>
                    <p>Step 2: Exclude minor info: '2010' and 'new author' are less relevant.</p>
                    <p>Key detail: 1 million copies sold.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a weather agency in Greenvale reported: 'The storm caused $5 billion in damage, mostly to coastal homes.' The report aimed to secure funding for disaster recovery.",
                question: "What is a key detail?",
                options: [
                    { text: "A) $5 billion in damage", correct: true },
                    { text: "B) Coastal homes", correct: false },
                    { text: "C) Storm", correct: false },
                    { text: "D) Mostly", correct: false }
                ],
                explanation: "It quantifies the storm’s impact, a critical specific."
            },
            {
                type: "example",
                title: "Example 3: Multiple Key Details",
                content: `
                    <h2>Example 3: Multiple Key Details</h2>
                    <p>Passage: 'The invention saved time with a 50% efficiency boost and reduced costs by $2 million.'</p>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Identify impact: 50% efficiency boost.</p>
                    <p>Step 2: Add specifics: $2 million cost reduction.</p>
                    <p>Key details: 50% efficiency, $2 million savings.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a tech company in Clearwater announced: 'The app gained 2 million users due to its easy interface.' The announcement aimed to attract investors by showcasing the app’s popularity.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Easy interface", correct: true },
                    { text: "B) 2 million users", correct: false },
                    { text: "C) App", correct: false },
                    { text: "D) Gained", correct: false }
                ],
                explanation: "The interface explains the user gain, making it a key detail."
            },
            {
                type: "example",
                title: "Example 4: Key Details Supporting Claims",
                content: `
                    <h2>Example 4: Key Details Supporting Claims</h2>
                    <p>Passage: 'The diet worked well. Users lost 20 pounds in three months.'</p>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Focus on proof: 20 pounds lost.</p>
                    <p>Step 2: Add context: In three months.</p>
                    <p>Key details: 20-pound loss, three months.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a fundraising campaign in Millville reported: 'The campaign raised $1 million through online ads.' The report aimed to demonstrate the campaign’s success to donors.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Online ads", correct: true },
                    { text: "B) $1 million", correct: false },
                    { text: "C) Campaign", correct: false },
                    { text: "D) Raised", correct: false }
                ],
                explanation: "Online ads explain how the money was raised, a key detail."
            },
            {
                type: "example",
                title: "Example 5: Key Details in Descriptions",
                content: `
                    <h2>Example 5: Key Details in Descriptions</h2>
                    <p>Passage: 'The festival succeeded with 10,000 attendees thanks to live music.'</p>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Success indicator: 10,000 attendees.</p>
                    <p>Step 2: Reason: Live music.</p>
                    <p>Key details: 10,000 attendees, live music.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, a transportation department in Greenvale reported: 'The bridge cut travel time by 15 minutes with its new design.' The report aimed to justify further infrastructure investments.",
                question: "What is a key detail?",
                options: [
                    { text: "A) New design", correct: true },
                    { text: "B) 15 minutes", correct: false },
                    { text: "C) Bridge", correct: false },
                    { text: "D) Travel", correct: false }
                ],
                explanation: "The new design is the reason for the time cut, a key detail."
            },
            {
                type: "example",
                title: "Example 6: Key Details in Arguments",
                content: `
                    <h2>Example 6: Key Details in Arguments</h2>
                    <p>Passage: 'Taxes fund schools. They provided $50 million last year.'</p>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Support for claim: $50 million.</p>
                    <p>Step 2: Context: Last year.</p>
                    <p>Key details: $50 million, last year.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, an education board in Clearwater reported: 'The program cut dropout rates by 20% with tutoring.' The report aimed to secure funding for expanded educational support.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Tutoring", correct: true },
                    { text: "B) 20%", correct: false },
                    { text: "C) Program", correct: false },
                    { text: "D) Dropout rates", correct: false }
                ],
                explanation: "Tutoring is the method behind the reduction, a key detail."
            },
            {
                type: "example",
                title: "Example 7: Key Details with Numbers",
                content: `
                    <h2>Example 7: Key Details with Numbers</h2>
                    <p>Passage: 'The law saved lives. It reduced accidents by 25% in one year.'</p>
                    <p>Question: What are the key details?</p>
                    <p>Step 1: Quantify impact: 25% reduction.</p>
                    <p>Step 2: Timeframe: One year.</p>
                    <p>Key details: 25% accident reduction, one year.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, a charity event in Millville reported: 'The sale raised $500,000 with celebrity endorsements.' The report aimed to highlight the event’s success to attract future sponsors.",
                question: "What is a key detail?",
                options: [
                    { text: "A) Celebrity endorsements", correct: true },
                    { text: "B) $500,000", correct: false },
                    { text: "C) Sale", correct: false },
                    { text: "D) Raised", correct: false }
                ],
                explanation: "Celebrity endorsements drove the fundraising, a key detail."
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
                    <p>Passage: 'Exercise benefits mental health. Studies show lower depression rates among active people.'</p>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Identify claim: Exercise benefits mental health.</p>
                    <p>Step 2: Find support: 'Studies show lower depression rates.'</p>
                    <p>The evidence is the study on depression rates.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a university in Greenvale published a study stating: 'Education boosts earnings. Graduates earn 20% more than non-graduates.' The study aimed to encourage higher education enrollment.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Graduates earn 20% more", correct: true },
                    { text: "B) Education is important", correct: false },
                    { text: "C) Earnings are boosted", correct: false },
                    { text: "D) Graduates study", correct: false }
                ],
                explanation: "It directly supports the claim of higher earnings."
            },
            {
                type: "example",
                title: "Example 2: Evidence Relevance",
                content: `
                    <h2>Example 2: Evidence Relevance</h2>
                    <p>Passage: 'The diet works. Participants lost 15 pounds on average over six months.'</p>
                    <p>Question: What evidence supports effectiveness?</p>
                    <p>Step 1: Claim: Diet works.</p>
                    <p>Step 2: Relevant evidence: '15 pounds lost' proves it.</p>
                    <p>Evidence: Average 15-pound weight loss.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2023, a city council in Clearwater reported: 'The law reduced crime. Arrests dropped by 25% in the first year.' The report aimed to justify the law’s continuation.",
                question: "What evidence supports it?",
                options: [
                    { text: "A) Arrests dropped by 25%", correct: true },
                    { text: "B) Law was passed", correct: false },
                    { text: "C) Crime is a problem", correct: false },
                    { text: "D) Arrests happened", correct: false }
                ],
                explanation: "The drop in arrests backs the claim of reduced crime."
            },
            {
                type: "example",
                title: "Example 3: Evidence in Context",
                content: `
                    <h2>Example 3: Evidence in Context</h2>
                    <p>Passage: 'Forests aid climate stability. They absorb 2 billion tons of CO2 yearly.'</p>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Forests aid climate stability.</p>
                    <p>Step 2: Evidence: 'Absorb 2 billion tons of CO2 yearly.'</p>
                    <p>The evidence is the CO2 absorption statistic.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a wellness center in Millville published: 'Meditation aids sleep. Research shows it lowers stress, promoting better rest.' The center aimed to promote mindfulness practices.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Research shows it lowers stress", correct: true },
                    { text: "B) Meditation is popular", correct: false },
                    { text: "C) Sleep is important", correct: false },
                    { text: "D) Stress is common", correct: false }
                ],
                explanation: "The research on stress reduction supports the sleep benefit claim."
            },
            {
                type: "example",
                title: "Example 4: Quantitative Evidence",
                content: `
                    <h2>Example 4: Quantitative Evidence</h2>
                    <p>Passage: 'The program cut costs. It saved $10 million in one year.'</p>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Program cut costs.</p>
                    <p>Step 2: Evidence: '$10 million saved in one year.'</p>
                    <p>The evidence is the specific savings amount.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2023, a corporate training program in Greenvale reported: 'Training improves performance. Employee scores rose by 30% after sessions.' The report aimed to secure funding for expanded training.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Scores rose by 30%", correct: true },
                    { text: "B) Training happened", correct: false },
                    { text: "C) Performance matters", correct: false },
                    { text: "D) Scores are high", correct: false }
                ],
                explanation: "The 30% score increase supports the performance claim."
            },
            {
                type: "example",
                title: "Example 5: Qualitative Evidence",
                content: `
                    <h2>Example 5: Qualitative Evidence</h2>
                    <p>Passage: 'The policy boosted morale. Workers reported higher satisfaction.'</p>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Policy boosted morale.</p>
                    <p>Step 2: Evidence: 'Workers reported higher satisfaction.'</p>
                    <p>The evidence is the workers’ feedback.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a tech startup in Clearwater reported: 'The app saves time. Users finish tasks 20% faster than before.' The report aimed to attract investors by showcasing efficiency gains.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Users finish tasks 20% faster", correct: true },
                    { text: "B) App is used", correct: false },
                    { text: "C) Time is saved", correct: false },
                    { text: "D) Tasks are fast", correct: false }
                ],
                explanation: "The 20% faster task completion supports the time-saving claim."
            },
            {
                type: "example",
                title: "Example 6: Evidence with Examples",
                content: `
                    <h2>Example 6: Evidence with Examples</h2>
                    <p>Passage: 'Gardening reduces stress. People feel calmer after planting flowers.'</p>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Gardening reduces stress.</p>
                    <p>Step 2: Evidence: 'People feel calmer after planting flowers.'</p>
                    <p>The evidence is the calming effect reported.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2023, an education institute in Millville reported: 'The course aids learning. Students scored 15% higher on tests after completing it.' The institute aimed to promote its courses to prospective students.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Students scored 15% higher on tests", correct: true },
                    { text: "B) Course was taken", correct: false },
                    { text: "C) Learning improved", correct: false },
                    { text: "D) Tests were hard", correct: false }
                ],
                explanation: "The 15% score increase supports the learning aid claim."
            },
            {
                type: "example",
                title: "Example 7: Evidence in Arguments",
                content: `
                    <h2>Example 7: Evidence in Arguments</h2>
                    <p>Passage: 'Bikes improve fitness. Cyclists have lower heart disease rates.'</p>
                    <p>Question: What evidence supports the claim?</p>
                    <p>Step 1: Claim: Bikes improve fitness.</p>
                    <p>Step 2: Evidence: 'Cyclists have lower heart disease rates.'</p>
                    <p>The evidence is the health outcome for cyclists.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a health magazine in Greenvale published: 'Reading boosts focus. Studies show readers have longer attention spans.' The magazine aimed to encourage reading for cognitive benefits.",
                question: "What is the supporting evidence?",
                options: [
                    { text: "A) Studies show longer attention spans", correct: true },
                    { text: "B) Reading is common", correct: false },
                    { text: "C) Focus is boosted", correct: false },
                    { text: "D) Studies were done", correct: false }
                ],
                explanation: "The studies on attention spans support the focus claim."
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
                    <p>Passage: 'The project saved money by cutting costs 10%.'</p>
                    <p>Question: Paraphrase the sentence.</p>
                    <p>Step 1: Identify meaning: Cost reduction saved money.</p>
                    <p>Step 2: Restate: The project reduced expenses by 10%, saving funds.</p>
                    <p>Paraphrase: The project lowered costs by 10%, preserving money.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2023, a literacy campaign in Clearwater published: 'Reading improves vocabulary through exposure to new words.' The campaign aimed to promote reading among youth.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) Reading enhances vocabulary by introducing new terms", correct: true },
                    { text: "B) Vocabulary grows with reading", correct: false },
                    { text: "C) New words are in books", correct: false },
                    { text: "D) Reading is educational", correct: false }
                ],
                explanation: "It keeps the meaning—reading boosts vocab with new words—in different phrasing."
            },
            {
                type: "example",
                title: "Example 2: Restating Complex Ideas",
                content: `
                    <h2>Example 2: Restating Complex Ideas</h2>
                    <p>Passage: 'Urban sprawl harms biodiversity by destroying habitats.'</p>
                    <p>Question: Restate the idea.</p>
                    <p>Step 1: Break it down: Urban growth affects nature.</p>
                    <p>Step 2: Rephrase: City expansion damages wildlife by ruining their homes.</p>
                    <p>Restatement: Urban development reduces biodiversity by eliminating habitats.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, an economic development board in Millville reported: 'The policy increased jobs by attracting businesses.' The report aimed to highlight economic growth strategies.",
                question: "Restate the passage.",
                options: [
                    { text: "A) The policy boosted employment by drawing companies", correct: true },
                    { text: "B) Jobs grew with the policy", correct: false },
                    { text: "C) Businesses were attracted", correct: false },
                    { text: "D) Employment rose", correct: false }
                ],
                explanation: "It rephrases job growth and business attraction accurately."
            },
            {
                type: "example",
                title: "Example 3: Paraphrasing with Evidence",
                content: `
                    <h2>Example 3: Paraphrasing with Evidence</h2>
                    <p>Passage: 'The drug cut symptoms by 40%, improving patient recovery.'</p>
                    <p>Question: Paraphrase the sentence.</p>
                    <p>Step 1: Core idea: Drug effectiveness aids recovery.</p>
                    <p>Step 2: Restate: The medication reduced symptoms by 40%, enhancing patient healing.</p>
                    <p>Paraphrase: The medicine lessened symptoms by 40%, speeding recovery.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2023, a film festival in Greenvale announced: 'The film won awards for its stunning visuals.' The announcement aimed to attract audiences to the festival.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) The movie earned prizes for its impressive graphics", correct: true },
                    { text: "B) The film had stunning actors", correct: false },
                    { text: "C) Awards were given in 2020", correct: false },
                    { text: "D) Visuals were colorful", correct: false }
                ],
                explanation: "The paraphrase restates the awards and visuals in new words."
            },
            {
                type: "example",
                title: "Example 4: Paraphrasing Descriptive Texts",
                content: `
                    <h2>Example 4: Paraphrasing Descriptive Texts</h2>
                    <p>Passage: 'The park offers peace with its quiet trails.'</p>
                    <p>Question: Paraphrase the sentence.</p>
                    <p>Step 1: Meaning: Park provides calm.</p>
                    <p>Step 2: Restate: The park gives tranquility through its serene paths.</p>
                    <p>Paraphrase: The park delivers peace via its calm walkways.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a fitness center in Clearwater published: 'Exercise lifts spirits by releasing endorphins.' The center aimed to promote physical activity for mental health.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) Working out cheers people up by producing endorphins", correct: true },
                    { text: "B) Spirits are lifted", correct: false },
                    { text: "C) Endorphins are released", correct: false },
                    { text: "D) Exercise is fun", correct: false }
                ],
                explanation: "It rephrases the mood boost and endorphin link accurately."
            },
            {
                type: "example",
                title: "Example 5: Paraphrasing Cause and Effect",
                content: `
                    <h2>Example 5: Paraphrasing Cause and Effect</h2>
                    <p>Passage: 'Rainforests support life by providing oxygen.'</p>
                    <p>Question: Paraphrase the sentence.</p>
                    <p>Step 1: Core: Rainforests sustain life.</p>
                    <p>Step 2: Restate: Rainforests sustain ecosystems by supplying oxygen.</p>
                    <p>Paraphrase: Rainforests nurture life through oxygen production.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2023, a neuroscience study in Millville stated: 'Sleep aids memory by strengthening brain connections.' The study aimed to highlight sleep’s cognitive benefits.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) Rest improves recall by enhancing neural links", correct: true },
                    { text: "B) Memory needs sleep", correct: false },
                    { text: "C) Brain connections grow", correct: false },
                    { text: "D) Sleep is restful", correct: false }
                ],
                explanation: "It restates sleep’s memory benefit with different wording."
            },
            {
                type: "example",
                title: "Example 6: Paraphrasing Arguments",
                content: `
                    <h2>Example 6: Paraphrasing Arguments</h2>
                    <p>Passage: 'Taxes fund education by supporting schools.'</p>
                    <p>Question: Paraphrase the sentence.</p>
                    <p>Step 1: Meaning: Taxes help education.</p>
                    <p>Step 2: Restate: Taxes finance learning by aiding schools.</p>
                    <p>Paraphrase: Taxes sustain education through school funding.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a wellness campaign in Greenvale published: 'Music boosts focus by calming the mind.' The campaign aimed to promote music for productivity.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) Tunes enhance concentration by soothing thoughts", correct: true },
                    { text: "B) Focus needs music", correct: false },
                    { text: "C) Minds are calmed", correct: false },
                    { text: "D) Music is loud", correct: false }
                ],
                explanation: "It rephrases focus enhancement and calming effect."
            },
            {
                type: "example",
                title: "Example 7: Paraphrasing with Numbers",
                content: `
                    <h2>Example 7: Paraphrasing with Numbers</h2>
                    <p>Passage: 'The plan cut emissions by 25% in two years.'</p>
                    <p>Question: Paraphrase the sentence.</p>
                    <p>Step 1: Core: Plan reduced emissions.</p>
                    <p>Step 2: Restate: The strategy lowered pollution by 25% over two years.</p>
                    <p>Paraphrase: The initiative decreased emissions by a quarter in two years.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2023, a charity auction in Clearwater reported: 'The sale raised $1 million through ads.' The report aimed to showcase fundraising success to donors.",
                question: "Paraphrase the passage.",
                options: [
                    { text: "A) The event collected $1 million via advertising", correct: true },
                    { text: "B) Ads raised money", correct: false },
                    { text: "C) $1 million was raised", correct: false },
                    { text: "D) Sales are promoted", correct: false }
                ],
                explanation: "It restates the fundraising and method in new words."
            }
        ]
    }
};

// Central Ideas question array
const centralIdeaQuestions = [
    {
        passage: "In 2024, a city planner’s report in Clearwater noted: 'Public transit reduces traffic congestion. Buses and trains transport thousands of passengers daily, easing road pressure.' The report aimed to justify investments in transit infrastructure to improve urban mobility.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Public transit reduces traffic", correct: true },
            { text: "B) Buses carry passengers", correct: false },
            { text: "C) Trains run daily", correct: false },
            { text: "D) Traffic is a problem", correct: false }
        ],
        explanation: "The main focus is transit reducing traffic; other options are details.",
        difficulty: "easy",
        category: "ged-central-ideas"
    },
    {
        passage: "In 2023, a health campaign in Millville distributed a pamphlet stating: 'Regular exercise enhances physical and mental health. It reduces stress, improves heart function, and boosts mood.' The campaign sought to encourage residents to adopt active lifestyles for overall well-being.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Exercise improves health", correct: true },
            { text: "B) Stress is reduced by exercise", correct: false },
            { text: "C) Heart function improves", correct: false },
            { text: "D) Mood needs boosting", correct: false }
        ],
        explanation: "The central idea is exercise’s health benefits; specifics like stress reduction are details.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        passage: "In 2024, an educational journal in Greenvale published: 'Technology revolutionizes education. Online platforms and digital tools enable personalized learning and global access to resources.' The journal aimed to highlight technology’s role in transforming modern education systems.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Technology revolutionizes education", correct: true },
            { text: "B) Online platforms enable learning", correct: false },
            { text: "C) Digital tools are global", correct: false },
            { text: "D) Education needs technology", correct: false }
        ],
        explanation: "The central idea is technology’s transformative impact on education; platforms and tools are examples.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        passage: "In 2023, a community newsletter in Clearwater reported: 'Volunteer programs strengthen community bonds. They organize cleanups, food drives, and youth mentorship, fostering unity.' The newsletter aimed to promote volunteerism to enhance local engagement.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Volunteer programs strengthen community bonds", correct: true },
            { text: "B) Cleanups are organized", correct: false },
            { text: "C) Food drives foster unity", correct: false },
            { text: "D) Communities need volunteers", correct: false }
        ],
        explanation: "The central idea is volunteer programs’ role in community bonding; specific activities are details.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        passage: "In 2024, an environmental agency in Millville stated: 'Wetlands protect against flooding. They absorb excess water and reduce storm damage in coastal areas.' The agency aimed to advocate for wetland preservation to mitigate natural disasters.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Wetlands protect against flooding", correct: true },
            { text: "B) Excess water is absorbed", correct: false },
            { text: "C) Storms damage coasts", correct: false },
            { text: "D) Flooding is a problem", correct: false }
        ],
        explanation: "The central idea is wetlands’ role in flood protection; water absorption is a detail.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        passage: "In 2023, a workplace policy guide in Greenvale noted: 'Flexible work arrangements increase productivity. Employees save time on commutes and balance personal tasks.' The guide aimed to promote flexible policies to improve workplace efficiency.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Flexible work arrangements increase productivity", correct: true },
            { text: "B) Commutes save time", correct: false },
            { text: "C) Employees balance tasks", correct: false },
            { text: "D) Productivity needs improvement", correct: false }
        ],
        explanation: "The central idea is flexible work’s productivity benefits; commuting and task balance are details.",
        difficulty: "medium",
        category: "ged-central-ideas"
    },
    {
        passage: "In 2024, an arts festival in Clearwater published: 'Cultural events enrich communities. Festivals and exhibitions celebrate diversity and spark creativity.' The publication aimed to encourage participation in cultural activities for community development.",
        question: "What is the central idea?",
        answers: [
            { text: "A) Cultural events enrich communities", correct: true },
            { text: "B) Festivals celebrate diversity", correct: false },
            { text: "C) Exhibitions spark creativity", correct: false },
            { text: "D) Communities need culture", correct: false }
        ],
        explanation: "The central idea is cultural events’ community enrichment; festivals and exhibitions are examples.",
        difficulty: "medium",
        category: "ged-central-ideas"
    }
];

// Variables
let categoryStats = {
    "ged-central-ideas": { correct: 0, incorrect: 0 }
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

// Extract passage from content (simplified for examples and questions)
function extractPassage(content) {
    const passageMatchWithTags = content.match(/<p>Passage:.*?(?:<\/p>|$)/is);
    if (passageMatchWithTags) {
        return passageMatchWithTags[0];
    }
    const passageMatchPlain = content.match(/Passage:.*?(\.(?=\s*What|\s*Why)|$)/is);
    return passageMatchPlain ? passageMatchPlain[0] : "";
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
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
        categoryStats["ged-central-ideas"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["ged-central-ideas"].incorrect++;
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
        case 1: return centralIdeaQuestions;
        case 2: return summarizingQuestions;
        case 3: return keyDetailsQuestions;
        case 4: return supportingEvidenceQuestions;
        case 5: return paraphrasingQuestions;
        default: return centralIdeaQuestions;
    }
}

// Show next quiz question
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

// Save lesson completion
function saveLessonCompletion() {
    const completionData = {
        exam: "GED",
        type: "lesson",
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("lastActivity", JSON.stringify(completionData));
    console.log("Saved lesson completion:", completionData);
}

// Show final score
function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["ged-central-ideas"].correct;
    let totalAttempted = totalCorrect + categoryStats["ged-central-ideas"].incorrect;

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
        saveLessonCompletion();
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

// Record test results
function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("gedTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("gedTestResults", JSON.stringify(results));
    console.log("Final stored gedTestResults:", results);
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
    localStorage.setItem(`ged-central-ideas-lessonScore-${lessonId}`, score);
    console.log(`Saved ged-central-ideas-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`ged-central-ideas-lessonScore-${lessonId}`) || "Not completed yet";
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