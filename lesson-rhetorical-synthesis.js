// Variables (aligned with SAT structure)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "rhetorical-synthesis": { correct: 0, incorrect: 0 }
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
        title: "Choosing the Best Sentence for Clarity and Impact",
        content: [
            {
                type: "example",
                title: "Example: Clarity in Sentence Choice",
                content: `
                    <h2>Example: Clarity in Sentence Choice</h2>
                    <p>Question: Which sentence is clearer?</p>
                    <p>Option A: 'Recycling cuts waste.' Option B: 'Trash goes down with recycling stuff.'</p>
                    <p>Step 1: Analyze: A is concise, B is vague.</p>
                    <p>Step 2: Choose: A is direct and clear.</p>
                    <p>Best: 'Recycling cuts waste.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale emphasized the benefits of recycling programs. The journal aimed to inform readers clearly about waste reduction."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a research journal in Millville reported on a study’s outcomes. The journal sought to present findings in a clear, concise manner.",
                question: "Which sentence is clearer? A) 'Data shows improvement.' B) 'Some numbers got better.'",
                options: [
                    { text: "A) Data shows improvement", correct: true },
                    { text: "B) Some numbers got better", correct: false },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither is clear", correct: false }
                ],
                explanation: "A is straightforward, while B is vague and informal."
            },
            {
                type: "example",
                title: "Example: Impact in Sentence Choice",
                content: `
                    <h2>Example: Impact in Sentence Choice</h2>
                    <p>Question: Which sentence has more impact?</p>
                    <p>Option A: 'We should act now.' Option B: 'Act now, or lose everything!'</p>
                    <p>Step 1: Analyze: A is mild, B is urgent.</p>
                    <p>Step 2: Choose: B grabs attention.</p>
                    <p>Best: 'Act now, or lose everything!'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental advocacy journal in Clearwater urged immediate action on climate change. The journal aimed to inspire readers with impactful messaging."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a sports journal in Greenvale motivated a team before a championship. The journal aimed to inspire with powerful language.",
                question: "Which sentence has more impact? A) 'We can win.' B) 'Victory is ours if we fight!'",
                options: [
                    { text: "A) We can win", correct: false },
                    { text: "B) Victory is ours if we fight!", correct: true },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither has impact", correct: false }
                ],
                explanation: "B inspires with strong, vivid language."
            },
            {
                type: "example",
                title: "Example: Precision in Instructions",
                content: `
                    <h2>Example: Precision in Instructions</h2>
                    <p>Question: Which sentence is clearer?</p>
                    <p>Option A: 'Turn left at the big tree.' Option B: 'At the oak by the park, go left.'</p>
                    <p>Step 1: Analyze: A is general, B is specific.</p>
                    <p>Step 2: Choose: B reduces confusion.</p>
                    <p>Best: 'At the oak by the park, go left.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a community journal in Millville provided directions to a local meeting. The journal aimed to ensure clarity for attendees."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a safety journal in Clearwater explained workplace protocols. The journal aimed to convey rules with precision and impact.",
                question: "Which sentence is better? A) 'Wear helmets.' B) 'Helmets save heads—wear them!'",
                options: [
                    { text: "A) Wear helmets", correct: false },
                    { text: "B) Helmets save heads—wear them!", correct: true },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither works", correct: false }
                ],
                explanation: "B is clear and adds impact with a reason."
            },
            {
                type: "example",
                title: "Example: Emotional Resonance",
                content: `
                    <h2>Example: Emotional Resonance</h2>
                    <p>Question: Which sentence has more impact?</p>
                    <p>Option A: 'Give money to help.' Option B: 'Your gift saves lives today.'</p>
                    <p>Step 1: Analyze: A is bland, B is personal.</p>
                    <p>Step 2: Choose: B stirs emotion.</p>
                    <p>Best: 'Your gift saves lives today.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a charity journal in Greenvale encouraged donations for disaster relief. The journal sought to evoke strong emotional responses."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a business journal in Millville announced a retail promotion. The journal aimed to excite customers with impactful messaging.",
                question: "Which sentence has more impact? A) 'Discounts start tomorrow.' B) 'Tomorrow, snag deals before they’re gone!'",
                options: [
                    { text: "A) Discounts start tomorrow", correct: false },
                    { text: "B) Tomorrow, snag deals before they’re gone!", correct: true },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither has impact", correct: false }
                ],
                explanation: "B creates urgency and excitement."
            },
            {
                type: "example",
                title: "Example: Simplifying Complex Ideas",
                content: `
                    <h2>Example: Simplifying Complex Ideas</h2>
                    <p>Question: Which sentence is clearer?</p>
                    <p>Option A: 'It optimizes system efficiency.' Option B: 'It makes your device run faster.'</p>
                    <p>Step 1: Analyze: A is technical, B is simple.</p>
                    <p>Step 2: Choose: B is easier to grasp.</p>
                    <p>Best: 'It makes your device run faster.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a technology journal in Clearwater explained smartphone upgrades. The journal aimed to communicate benefits clearly to a broad audience."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a health journal in Greenvale provided wellness advice. The journal sought to make health tips accessible and clear.",
                question: "Which sentence is clearer? A) 'Exercise helps you.' B) 'Daily walks boost your heart.'",
                options: [
                    { text: "A) Exercise helps you", correct: false },
                    { text: "B) Daily walks boost your heart", correct: true },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither is clear", correct: false }
                ],
                explanation: "B is specific and easy to understand."
            },
            {
                type: "example",
                title: "Example: Urgency in Deadlines",
                content: `
                    <h2>Example: Urgency in Deadlines</h2>
                    <p>Question: Which sentence has more impact?</p>
                    <p>Option A: 'Finish by Friday.' Option B: 'Friday’s the line—get it done!'</p>
                    <p>Step 1: Analyze: A is plain, B is forceful.</p>
                    <p>Step 2: Choose: B pushes action.</p>
                    <p>Best: 'Friday’s the line—get it done!'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Millville announced a project deadline. The journal aimed to motivate teams with urgent, impactful language."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a weather journal in Clearwater issued a storm alert. The journal aimed to convey urgency to ensure public safety.",
                question: "Which sentence has more impact? A) 'Be ready for rain.' B) 'Brace for the downpour—it’s coming!'",
                options: [
                    { text: "A) Be ready for rain", correct: false },
                    { text: "B) Brace for the downpour—it’s coming!", correct: true },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither has impact", correct: false }
                ],
                explanation: "B uses vivid words to heighten urgency."
            },
            {
                type: "example",
                title: "Example: Balancing Clarity and Impact",
                content: `
                    <h2>Example: Balancing Clarity and Impact</h2>
                    <p>Question: Which sentence is better?</p>
                    <p>Option A: 'Pollution is bad.' Option B: 'Pollution chokes our planet daily.'</p>
                    <p>Step 1: Analyze: A is simple, B is vivid.</p>
                    <p>Step 2: Choose: B is clear and striking.</p>
                    <p>Best: 'Pollution chokes our planet daily.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Greenvale warned about pollution’s effects. The journal sought to balance clarity and emotional impact."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a policy journal in Millville introduced a new regulation. The journal aimed to explain changes clearly and engagingly.",
                question: "Which sentence is clearer? A) 'Rules changed.' B) 'Our policy just got a clear upgrade.'",
                options: [
                    { text: "A) Rules changed", correct: false },
                    { text: "B) Our policy just got a clear upgrade", correct: true },
                    { text: "C) Both are equal", correct: false },
                    { text: "D) Neither is clear", correct: false }
                ],
                explanation: "B provides more context and clarity."
            }
        ]
    },
    2: {
        title: "Connecting Ideas Logically",
        content: [
            {
                type: "example",
                title: "Example: Cause and Effect Link",
                content: `
                    <h2>Example: Cause and Effect Link</h2>
                    <p>Question: How to connect logically?</p>
                    <p>Sentences: 'Rain fell heavily. Streets flooded.'</p>
                    <p>Step 1: Identify: Rain caused flooding.</p>
                    <p>Step 2: Connect: Use 'thus' for effect.</p>
                    <p>Revised: 'Rain fell heavily, thus streets flooded.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather journal in Clearwater reported on a local storm. The journal aimed to explain weather impacts logically."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, an academic journal in Millville discussed study habits. The journal sought to connect efforts and outcomes logically.",
                question: "How to connect logically? Sentences: 'He studied hard. He passed.'",
                options: [
                    { text: "A) He studied hard, so he passed", correct: true },
                    { text: "B) He studied hard, but he passed", correct: false },
                    { text: "C) He studied hard, or he passed", correct: false },
                    { text: "D) He studied hard, for he passed", correct: false }
                ],
                explanation: "'So' shows studying caused passing."
            },
            {
                type: "example",
                title: "Example: Contrast Link",
                content: `
                    <h2>Example: Contrast Link</h2>
                    <p>Question: How to connect logically?</p>
                    <p>Sentences: 'She practiced a lot. She didn’t win.'</p>
                    <p>Step 1: Identify: Effort vs. outcome.</p>
                    <p>Step 2: Connect: Use 'yet' for contrast.</p>
                    <p>Revised: 'She practiced a lot, yet she didn’t win.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Greenvale reported on a competition. The journal aimed to highlight logical contrasts in outcomes."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a business journal in Clearwater evaluated a project. The journal sought to contrast expectations and results logically.",
                question: "How to connect logically? Sentences: 'The plan was simple. It failed.'",
                options: [
                    { text: "A) The plan was simple, yet it failed", correct: true },
                    { text: "B) The plan was simple, so it failed", correct: false },
                    { text: "C) The plan was simple, and it failed", correct: false },
                    { text: "D) The plan was simple, because it failed", correct: false }
                ],
                explanation: "'Yet' highlights the unexpected failure."
            },
            {
                type: "example",
                title: "Example: Sequence Link",
                content: `
                    <h2>Example: Sequence Link</h2>
                    <p>Question: How to connect logically?</p>
                    <p>Sentences: 'She wrote the code. She tested it.'</p>
                    <p>Step 1: Identify: Steps in order.</p>
                    <p>Step 2: Connect: Use 'then' for sequence.</p>
                    <p>Revised: 'She wrote the code, then she tested it.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a technology journal in Millville described a programming process. The journal aimed to present steps in a logical sequence."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a culinary journal in Greenvale outlined a recipe. The journal aimed to sequence actions logically for readers.",
                question: "How to connect logically? Sentences: 'He cooked dinner. He ate.'",
                options: [
                    { text: "A) He cooked dinner, then he ate", correct: true },
                    { text: "B) He cooked dinner, so he ate", correct: false },
                    { text: "C) He cooked dinner, but he ate", correct: false },
                    { text: "D) He cooked dinner, or he ate", correct: false }
                ],
                explanation: "'Then' shows the order of events."
            },
            {
                type: "example",
                title: "Example: Addition Link",
                content: `
                    <h2>Example: Addition Link</h2>
                    <p>Question: How to connect logically?</p>
                    <p>Sentences: 'The team worked late. They met the deadline.'</p>
                    <p>Step 1: Identify: Extra effort aided success.</p>
                    <p>Step 2: Connect: Use 'and' for addition.</p>
                    <p>Revised: 'The team worked late, and they met the deadline.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Clearwater reported on a project team. The journal aimed to connect related efforts logically."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a financial journal in Millville discussed personal savings. The journal aimed to link financial actions logically.",
                question: "How to connect logically? Sentences: 'She saved money. She bought a car.'",
                options: [
                    { text: "A) She saved money, and she bought a car", correct: true },
                    { text: "B) She saved money, yet she bought a car", correct: false },
                    { text: "C) She saved money, because she bought a car", correct: false },
                    { text: "D) She saved money, or she bought a car", correct: false }
                ],
                explanation: "'And' adds related actions logically."
            },
            {
                type: "example",
                title: "Example: Reason Link",
                content: `
                    <h2>Example: Reason Link</h2>
                    <p>Question: How to connect logically?</p>
                    <p>Sentences: 'He was tired. He went to bed early.'</p>
                    <p>Step 1: Identify: Tiredness caused early sleep.</p>
                    <p>Step 2: Connect: Use 'because' for reason.</p>
                    <p>Revised: 'He went to bed early because he was tired.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Greenvale discussed sleep habits. The journal aimed to explain behaviors with logical reasoning."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a safety journal in Clearwater reported on driving conditions. The journal aimed to justify actions logically.",
                question: "How to connect logically? Sentences: 'The road was icy. She drove slowly.'",
                options: [
                    { text: "A) She drove slowly because the road was icy", correct: true },
                    { text: "B) She drove slowly, yet the road was icy", correct: false },
                    { text: "C) She drove slowly, and the road was icy", correct: false },
                    { text: "D) She drove slowly, or the road was icy", correct: false }
                ],
                explanation: "'Because' explains why she drove slowly."
            },
            {
                type: "example",
                title: "Example: Condition Link",
                content: `
                    <h2>Example: Condition Link</h2>
                    <p>Question: How to connect logically?</p>
                    <p>Sentences: 'It rains. We’ll stay inside.'</p>
                    <p>Step 1: Identify: Rain triggers staying in.</p>
                    <p>Step 2: Connect: Use 'if' for condition.</p>
                    <p>Revised: 'If it rains, we’ll stay inside.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a lifestyle journal in Millville planned a weekend activity. The journal aimed to present conditional plans logically."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a workplace journal in Greenvale outlined employee schedules. The journal aimed to set logical conditions for tasks.",
                question: "How to connect logically? Sentences: 'You finish early. You can leave.'",
                options: [
                    { text: "A) If you finish early, you can leave", correct: true },
                    { text: "B) You finish early, so you can leave", correct: false },
                    { text: "C) You finish early, but you can leave", correct: false },
                    { text: "D) You finish early, then you can leave", correct: false }
                ],
                explanation: "'If' sets a condition for leaving."
            },
            {
                type: "example",
                title: "Example: Alternative Link",
                content: `
                    <h2>Example: Alternative Link</h2>
                    <p>Question: How to connect logically?</p>
                    <p>Sentences: 'We can walk. We can drive.'</p>
                    <p>Step 1: Identify: Two options presented.</p>
                    <p>Step 2: Connect: Use 'or' for alternatives.</p>
                    <p>Revised: 'We can walk, or we can drive.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Clearwater planned a trip itinerary. The journal aimed to offer logical travel options."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a communication journal in Millville discussed contact methods. The journal aimed to present alternative actions logically.",
                question: "How to connect logically? Sentences: 'She can call. She can text.'",
                options: [
                    { text: "A) She can call, or she can text", correct: true },
                    { text: "B) She can call, and she can text", correct: false },
                    { text: "C) She can call, so she can text", correct: false },
                    { text: "D) She can call, because she can text", correct: false }
                ],
                explanation: "'Or' presents two valid options."
            }
        ]
    },
    3: {
        title: "Integrating Evidence and Supporting Details",
        content: [
            {
                type: "example",
                title: "Example: Adding Evidence",
                content: `
                    <h2>Example: Adding Evidence</h2>
                    <p>Question: How to integrate?</p>
                    <p>Claim: 'Exercise improves health.'</p>
                    <p>Evidence: 'Studies show lower heart disease rates.'</p>
                    <p>Step 1: Link: Evidence supports claim.</p>
                    <p>Step 2: Integrate: Combine smoothly.</p>
                    <p>Revised: 'Exercise improves health, as studies show lower heart disease rates.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Greenvale promoted physical activity. The journal aimed to support claims with credible evidence."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, an education journal in Millville advocated for literacy programs. The journal aimed to bolster arguments with evidence.",
                question: "How to integrate? Claim: 'Reading boosts learning.' Evidence: 'Test scores rose 15%.'",
                options: [
                    { text: "A) Reading boosts learning, with test scores rising 15%", correct: true },
                    { text: "B) Reading boosts learning, but test scores rose 15%", correct: false },
                    { text: "C) Reading boosts learning, or test scores rose 15%", correct: false },
                    { text: "D) Reading boosts learning, test scores rose 15%", correct: false }
                ],
                explanation: "A smoothly ties the evidence to the claim."
            },
            {
                type: "example",
                title: "Example: Adding Detail",
                content: `
                    <h2>Example: Adding Detail</h2>
                    <p>Question: How to integrate?</p>
                    <p>Claim: 'The policy saved money.'</p>
                    <p>Detail: 'It cut costs by 20%.'</p>
                    <p>Step 1: Link: Detail explains savings.</p>
                    <p>Step 2: Integrate: Use specific example.</p>
                    <p>Revised: 'The policy saved money, cutting costs by 20%.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a policy journal in Clearwater evaluated budget reforms. The journal aimed to clarify claims with precise details."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a community journal in Greenvale reported on a local festival. The journal aimed to support claims with vivid details.",
                question: "How to integrate? Claim: 'The event was popular.' Detail: 'Over 500 attended.'",
                options: [
                    { text: "A) The event was popular, drawing over 500 attendees", correct: true },
                    { text: "B) The event was popular, yet over 500 attended", correct: false },
                    { text: "C) The event was popular, so over 500 attended", correct: false },
                    { text: "D) The event was popular, over 500 attended", correct: false }
                ],
                explanation: "A integrates the detail naturally with 'drawing'."
            },
            {
                type: "example",
                title: "Example: Combining Evidence",
                content: `
                    <h2>Example: Combining Evidence</h2>
                    <p>Question: How to integrate?</p>
                    <p>Claim: 'Diet affects mood.'</p>
                    <p>Evidence: 'Research links sugar to anxiety.'</p>
                    <p>Step 1: Link: Evidence supports claim.</p>
                    <p>Step 2: Integrate: Add evidence directly.</p>
                    <p>Revised: 'Diet affects mood, as research links sugar to anxiety.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a psychology journal in Millville explored dietary impacts. The journal aimed to back claims with scientific evidence."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a health journal in Clearwater promoted better sleep habits. The journal aimed to reinforce claims with research.",
                question: "How to integrate? Claim: 'Sleep improves memory.' Evidence: 'Studies show better recall.'",
                options: [
                    { text: "A) Sleep improves memory, as studies show better recall", correct: true },
                    { text: "B) Sleep improves memory, but studies show better recall", correct: false },
                    { text: "C) Sleep improves memory, studies show better recall", correct: false },
                    { text: "D) Sleep improves memory, or studies show better recall", correct: false }
                ],
                explanation: "A connects evidence logically with 'as'."
            },
            {
                type: "example",
                title: "Example: Specific Detail",
                content: `
                    <h2>Example: Specific Detail</h2>
                    <p>Question: How to integrate?</p>
                    <p>Claim: 'Parks benefit cities.'</p>
                    <p>Detail: 'They increase property values.'</p>
                    <p>Step 1: Link: Detail shows benefit.</p>
                    <p>Step 2: Integrate: Use a participle.</p>
                    <p>Revised: 'Parks benefit cities, increasing property values.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an urban journal in Greenvale advocated for green spaces. The journal aimed to clarify benefits with specific details."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a business journal in Millville promoted employee training. The journal aimed to support claims with precise details.",
                question: "How to integrate? Claim: 'Training boosts skills.' Detail: 'It improves accuracy.'",
                options: [
                    { text: "A) Training boosts skills, improving accuracy", correct: true },
                    { text: "B) Training boosts skills, yet it improves accuracy", correct: false },
                    { text: "C) Training boosts skills, so it improves accuracy", correct: false },
                    { text: "D) Training boosts skills, or it improves accuracy", correct: false }
                ],
                explanation: "A uses a participle for smooth integration."
            },
            {
                type: "example",
                title: "Example: Quantitative Evidence",
                content: `
                    <h2>Example: Quantitative Evidence</h2>
                    <p>Question: How to integrate?</p>
                    <p>Claim: 'Recycling helps the environment.'</p>
                    <p>Evidence: 'It reduces landfill use by 30%.'</p>
                    <p>Step 1: Link: Evidence quantifies benefit.</p>
                    <p>Step 2: Integrate: Add directly.</p>
                    <p>Revised: 'Recycling helps the environment, reducing landfill use by 30%.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Clearwater supported recycling initiatives. The journal aimed to use data to reinforce claims."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a sociology journal in Greenvale examined education’s societal impacts. The journal aimed to back claims with data.",
                question: "How to integrate? Claim: 'Education reduces crime.' Evidence: 'Crime drops 25% with schooling.'",
                options: [
                    { text: "A) Education reduces crime, dropping crime 25% with schooling", correct: true },
                    { text: "B) Education reduces crime, but crime drops 25% with schooling", correct: false },
                    { text: "C) Education reduces crime, crime drops 25% with schooling", correct: false },
                    { text: "D) Education reduces crime, or crime drops 25% with schooling", correct: false }
                ],
                explanation: "A integrates the evidence clearly."
            },
            {
                type: "example",
                title: "Example: Qualitative Detail",
                content: `
                    <h2>Example: Qualitative Detail</h2>
                    <p>Question: How to integrate?</p>
                    <p>Claim: 'Art inspires creativity.'</p>
                    <p>Detail: 'It sparks new ideas.'</p>
                    <p>Step 1: Link: Detail explains inspiration.</p>
                    <p>Step 2: Integrate: Use a phrase.</p>
                    <p>Revised: 'Art inspires creativity, sparking new ideas.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a cultural journal in Millville celebrated artistic expression. The journal aimed to enrich claims with vivid details."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a travel journal in Clearwater promoted global exploration. The journal aimed to enhance claims with descriptive details.",
                question: "How to integrate? Claim: 'Travel broadens perspectives.' Detail: 'It exposes people to cultures.'",
                options: [
                    { text: "A) Travel broadens perspectives, exposing people to cultures", correct: true },
                    { text: "B) Travel broadens perspectives, yet it exposes people to cultures", correct: false },
                    { text: "C) Travel broadens perspectives, so it exposes people to cultures", correct: false },
                    { text: "D) Travel broadens perspectives, or it exposes people to cultures", correct: false }
                ],
                explanation: "A integrates the detail naturally."
            },
            {
                type: "example",
                title: "Example: Evidence and Detail",
                content: `
                    <h2>Example: Evidence and Detail</h2>
                    <p>Question: How to integrate?</p>
                    <p>Claim: 'Tech aids education.'</p>
                    <p>Evidence: 'Studies prove better scores.' Detail: 'Math improved most.'</p>
                    <p>Step 1: Link: Evidence and detail support claim.</p>
                    <p>Step 2: Integrate: Combine for flow.</p>
                    <p>Revised: 'Tech aids education, as studies prove better scores, especially in math.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an education journal in Greenvale explored technology’s classroom impact. The journal aimed to combine evidence and details effectively."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a psychology journal in Millville examined music’s effects. The journal aimed to integrate evidence and details seamlessly.",
                question: "How to integrate? Claim: 'Music reduces stress.' Evidence: 'Research shows calm.' Detail: 'Heart rates drop.'",
                options: [
                    { text: "A) Music reduces stress, as research shows calm, with heart rates dropping", correct: true },
                    { text: "B) Music reduces stress, but research shows calm, heart rates drop", correct: false },
                    { text: "C) Music reduces stress, research shows calm, heart rates drop", correct: false },
                    { text: "D) Music reduces stress, or research shows calm, heart rates drop", correct: false }
                ],
                explanation: "A combines evidence and detail smoothly."
            }
        ]
    },
    4: {
        title: "Maintaining the Author’s Purpose and Tone",
        content: [
            {
                type: "example",
                title: "Example: Persuasive Purpose",
                content: `
                    <h2>Example: Persuasive Purpose</h2>
                    <p>Question: Which sentence fits the purpose and tone?</p>
                    <p>Option A: 'We must recycle now!' Option B: 'Recycling is an option.'</p>
                    <p>Step 1: Check: Persuasive needs urgency.</p>
                    <p>Step 2: Match: A is forceful, B is casual.</p>
                    <p>Best: 'We must recycle now!'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Clearwater urged immediate recycling action. The journal used a persuasive, urgent tone to engage readers."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a community journal in Greenvale called for urgent policy reforms. The journal adopted a persuasive, serious tone to spur action.",
                question: "Which sentence fits the purpose and tone? A) 'Act fast to save lives!' B) 'Maybe we should act.'",
                options: [
                    { text: "A) Act fast to save lives!", correct: true },
                    { text: "B) Maybe we should act", correct: false },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "A matches the urgent, persuasive intent."
            },
            {
                type: "example",
                title: "Example: Informative Purpose",
                content: `
                    <h2>Example: Informative Purpose</h2>
                    <p>Question: Which sentence fits the purpose and tone?</p>
                    <p>Option A: 'Rain falls often here.' Option B: 'Rain is super annoying!'</p>
                    <p>Step 1: Check: Informative needs facts, neutrality.</p>
                    <p>Step 2: Match: A is factual, B is opinionated.</p>
                    <p>Best: 'Rain falls often here.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather journal in Millville explained regional climate patterns. The journal used a neutral, informative tone to educate readers."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a history journal in Clearwater documented past conflicts. The journal maintained a neutral, informative tone to present facts.",
                question: "Which sentence fits the purpose and tone? A) 'Wars shaped the era.' B) 'Wars were totally wild!'",
                options: [
                    { text: "A) Wars shaped the era", correct: true },
                    { text: "B) Wars were totally wild!", correct: false },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "A keeps the neutral, factual tone."
            },
            {
                type: "example",
                title: "Example: Entertaining Purpose",
                content: `
                    <h2>Example: Entertaining Purpose</h2>
                    <p>Question: Which sentence fits the purpose and tone?</p>
                    <p>Option A: 'The cat napped.' Option B: 'The cat snoozed like a champ!'</p>
                    <p>Step 1: Check: Entertaining needs fun.</p>
                    <p>Step 2: Match: B is lively, A is bland.</p>
                    <p>Best: 'The cat snoozed like a champ!'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Greenvale published a humorous story. The journal used a playful, entertaining tone to engage readers."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a food journal in Millville shared a lighthearted article on dining. The journal adopted a playful, entertaining tone to amuse readers.",
                question: "Which sentence fits the purpose and tone? A) 'Pizza is tasty.' B) 'Pizza’s the king of munchies!'",
                options: [
                    { text: "A) Pizza is tasty", correct: false },
                    { text: "B) Pizza’s the king of munchies!", correct: true },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "B uses playful language for entertainment."
            },
            {
                type: "example",
                title: "Example: Warning Purpose",
                content: `
                    <h2>Example: Warning Purpose</h2>
                    <p>Question: Which sentence fits the purpose and tone?</p>
                    <p>Option A: 'Watch out for ice!' Option B: 'Ice might be there.'</p>
                    <p>Step 1: Check: Warning needs authority.</p>
                    <p>Step 2: Match: A is direct, B is weak.</p>
                    <p>Best: 'Watch out for ice!'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a safety journal in Clearwater cautioned about winter hazards. The journal used a stern, persuasive tone to ensure compliance."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a coastal journal in Greenvale warned about marine dangers. The journal used a stern, persuasive tone to protect swimmers.",
                question: "Which sentence fits the purpose and tone? A) 'Don’t swim—sharks!' B) 'Swimming could be risky.'",
                options: [
                    { text: "A) Don’t swim—sharks!", correct: true },
                    { text: "B) Swimming could be risky", correct: false },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "A conveys urgency and sternness."
            },
            {
                type: "example",
                title: "Example: Descriptive Purpose",
                content: `
                    <h2>Example: Descriptive Purpose</h2>
                    <p>Question: Which sentence fits the purpose and tone?</p>
                    <p>Option A: 'The sky was blue.' Option B: 'The sky shimmered sapphire.'</p>
                    <p>Step 1: Check: Descriptive needs imagery.</p>
                    <p>Step 2: Match: B is vivid, A is plain.</p>
                    <p>Best: 'The sky shimmered sapphire.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Millville described scenic landscapes. The journal used a vivid, descriptive tone to captivate readers."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a nature journal in Clearwater portrayed forest ecosystems. The journal used a vivid, descriptive tone to engage readers.",
                question: "Which sentence fits the purpose and tone? A) 'Trees were tall.' B) 'Trees towered like giants.'",
                options: [
                    { text: "A) Trees were tall", correct: false },
                    { text: "B) Trees towered like giants", correct: true },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "B uses imagery for a vivid description."
            },
            {
                type: "example",
                title: "Example: Instructional Purpose",
                content: `
                    <h2>Example: Instructional Purpose</h2>
                    <p>Question: Which sentence fits the purpose and tone?</p>
                    <p>Option A: 'Mix the stuff.' Option B: 'Stir the ingredients well.'</p>
                    <p>Step 1: Check: Instructions need clarity.</p>
                    <p>Step 2: Match: B is precise, A is vague.</p>
                    <p>Best: 'Stir the ingredients well.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a culinary journal in Greenvale provided cooking instructions. The journal used a clear, instructional tone to guide readers."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a technology journal in Millville offered setup instructions for devices. The journal used a clear, instructional tone to assist users.",
                question: "Which sentence fits the purpose and tone? A) 'Plug it in right.' B) 'Insert the cord into the outlet.'",
                options: [
                    { text: "A) Plug it in right", correct: false },
                    { text: "B) Insert the cord into the outlet", correct: true },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "B is clear and specific."
            },
            {
                type: "example",
                title: "Example: Reflective Purpose",
                content: `
                    <h2>Example: Reflective Purpose</h2>
                    <p>Question: Which sentence fits the purpose and tone?</p>
                    <p>Option A: 'Life teaches us.' Option B: 'Life reveals wisdom through struggle.'</p>
                    <p>Step 1: Check: Reflective needs depth.</p>
                    <p>Step 2: Match: B is thoughtful, A is basic.</p>
                    <p>Best: 'Life reveals wisdom through struggle.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a philosophy journal in Clearwater shared insights on personal growth. The journal used a thoughtful, reflective tone to inspire readers."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a literary journal in Greenvale reflected on the passage of time. The journal used a thoughtful, reflective tone to engage readers.",
                question: "Which sentence fits the purpose and tone? A) 'Time goes fast.' B) 'Time slips away, leaving lessons.'",
                options: [
                    { text: "A) Time goes fast", correct: false },
                    { text: "B) Time slips away, leaving lessons", correct: true },
                    { text: "C) Both fit", correct: false },
                    { text: "D) Neither fits", correct: false }
                ],
                explanation: "B conveys a thoughtful tone."
            }
        ]
    },
    5: {
        title: "Strengthening Arguments and Explanations",
        content: [
            {
                type: "example",
                title: "Example: Adding Specificity",
                content: `
                    <h2>Example: Adding Specificity</h2>
                    <p>Question: Which sentence strengthens the argument?</p>
                    <p>Argument: 'Education helps people.'</p>
                    <p>Option A: 'It’s good.' Option B: 'It raises incomes by 10%.'</p>
                    <p>Step 1: Analyze: A is vague, B is precise.</p>
                    <p>Step 2: Choose: Specific data bolsters.</p>
                    <p>Best: 'Education helps people, raising incomes by 10%.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an education journal in Millville supported schooling reforms. The journal aimed to strengthen arguments with specific data."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a health journal in Greenvale promoted physical activity. The journal aimed to reinforce claims with precise evidence.",
                question: "Which sentence strengthens the argument? Argument: 'Exercise is beneficial.' A) 'It’s nice.' B) 'It cuts stress 30%.'",
                options: [
                    { text: "A) It’s nice", correct: false },
                    { text: "B) It cuts stress 30%", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B adds concrete evidence for strength."
            },
            {
                type: "example",
                title: "Example: Adding Reasoning",
                content: `
                    <h2>Example: Adding Reasoning</h2>
                    <p>Question: Which sentence strengthens the explanation?</p>
                    <p>Explanation: 'Trees reduce pollution.'</p>
                    <p>Option A: 'They just do.' Option B: 'They filter air particles.'</p>
                    <p>Step 1: Analyze: A lacks why, B explains.</p>
                    <p>Step 2: Choose: Reasoning adds depth.</p>
                    <p>Best: 'Trees reduce pollution by filtering air particles.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an environmental journal in Clearwater explained ecological benefits. The journal aimed to clarify claims with reasoning."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a psychology journal in Millville explored cognitive benefits. The journal aimed to deepen explanations with reasoning.",
                question: "Which sentence strengthens the explanation? Explanation: 'Sleep aids focus.' A) 'It’s true.' B) 'It restores brain function.'",
                options: [
                    { text: "A) It’s true", correct: false },
                    { text: "B) It restores brain function", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B provides a clear reason, enhancing the claim."
            },
            {
                type: "example",
                title: "Example: Adding Examples",
                content: `
                    <h2>Example: Adding Examples</h2>
                    <p>Question: Which sentence strengthens the argument?</p>
                    <p>Argument: 'Sports build teamwork.'</p>
                    <p>Option A: 'It’s obvious.' Option B: 'Soccer teams coordinate plays.'</p>
                    <p>Step 1: Analyze: A assumes, B shows.</p>
                    <p>Step 2: Choose: Examples clarify.</p>
                    <p>Best: 'Sports build teamwork, like soccer teams coordinating plays.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Greenvale advocated for youth athletics. The journal aimed to support arguments with concrete examples."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, an education journal in Clearwater promoted reading programs. The journal aimed to bolster claims with specific examples.",
                question: "Which sentence strengthens the argument? Argument: 'Reading improves knowledge.' A) 'It does.' B) 'Biographies teach history.'",
                options: [
                    { text: "A) It does", correct: false },
                    { text: "B) Biographies teach history", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B provides a specific example."
            },
            {
                type: "example",
                title: "Example: Combining Evidence and Reason",
                content: `
                    <h2>Example: Combining Evidence and Reason</h2>
                    <p>Question: Which sentence strengthens the argument?</p>
                    <p>Argument: 'Parks improve cities.'</p>
                    <p>Option A: 'They’re cool.' Option B: 'They boost happiness, per surveys.'</p>
                    <p>Step 1: Analyze: A is vague, B has proof.</p>
                    <p>Step 2: Choose: Evidence and reason win.</p>
                    <p>Best: 'Parks improve cities, boosting happiness, per surveys.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an urban journal in Millville supported park development. The journal aimed to reinforce claims with evidence and reasoning."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a health journal in Greenvale advocated for mindfulness practices. The journal aimed to strengthen arguments with data and reasoning.",
                question: "Which sentence strengthens the argument? Argument: 'Meditation helps health.' A) 'It’s great.' B) 'It lowers blood pressure, studies say.'",
                options: [
                    { text: "A) It’s great", correct: false },
                    { text: "B) It lowers blood pressure, studies say", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B uses evidence and reasoning."
            },
            {
                type: "example",
                title: "Example: Countering Objections",
                content: `
                    <h2>Example: Countering Objections</h2>
                    <p>Question: Which sentence strengthens the argument?</p>
                    <p>Argument: 'Remote work is effective.'</p>
                    <p>Option A: 'It works fine.' Option B: 'Productivity rises despite less oversight.'</p>
                    <p>Step 1: Analyze: A ignores doubts, B addresses them.</p>
                    <p>Step 2: Choose: Countering strengthens.</p>
                    <p>Best: 'Remote work is effective, with productivity rising despite less oversight.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Clearwater supported flexible work arrangements. The journal aimed to address objections with evidence."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a transportation journal in Millville promoted public transit. The journal aimed to counter cost concerns with specifics.",
                question: "Which sentence strengthens the argument? Argument: 'Public transit saves money.' A) 'It’s cheap.' B) 'It cuts fuel costs despite fares.'",
                options: [
                    { text: "A) It’s cheap", correct: false },
                    { text: "B) It cuts fuel costs despite fares", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B addresses cost concerns with specifics."
            },
            {
                type: "example",
                title: "Example: Adding Authority",
                content: `
                    <h2>Example: Adding Authority</h2>
                    <p>Question: Which sentence strengthens the argument?</p>
                    <p>Argument: 'Vaccines are safe.'</p>
                    <p>Option A: 'People say so.' Option B: 'Experts at CDC confirm it.'</p>
                    <p>Step 1: Analyze: A is hearsay, B cites authority.</p>
                    <p>Step 2: Choose: Authority adds credibility.</p>
                    <p>Best: 'Vaccines are safe, as experts at CDC confirm.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a health journal in Greenvale supported immunization. The journal aimed to enhance claims with authoritative sources."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, an energy journal in Clearwater endorsed renewable energy. The journal aimed to boost credibility with expert endorsements.",
                question: "Which sentence strengthens the argument? Argument: 'Solar power is reliable.' A) 'It’s fine.' B) 'Engineers at MIT endorse it.'",
                options: [
                    { text: "A) It’s fine", correct: false },
                    { text: "B) Engineers at MIT endorse it", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B boosts credibility with authority."
            },
            {
                type: "example",
                title: "Example: Emotional Appeal",
                content: `
                    <h2>Example: Emotional Appeal</h2>
                    <p>Question: Which sentence strengthens the argument?</p>
                    <p>Argument: 'Shelters save pets.'</p>
                    <p>Option A: 'They’re useful.' Option B: 'They rescue abandoned pups daily.'</p>
                    <p>Step 1: Analyze: A is dry, B tugs heartstrings.</p>
                    <p>Step 2: Choose: Emotion reinforces.</p>
                    <p>Best: 'Shelters save pets, rescuing abandoned pups daily.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a community journal in Millville supported animal shelters. The journal aimed to evoke emotion to strengthen arguments."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a charity journal in Greenvale encouraged donations for youth programs. The journal used emotional appeals to reinforce claims.",
                question: "Which sentence strengthens the argument? Argument: 'Donations help kids.' A) 'They do good.' B) 'They feed hungry children nightly.'",
                options: [
                    { text: "A) They do good", correct: false },
                    { text: "B) They feed hungry children nightly", correct: true },
                    { text: "C) Both equally", correct: false },
                    { text: "D) Neither", correct: false }
                ],
                explanation: "B uses emotional detail to strengthen."
            }
        ]
    }
};

// Quiz arrays (seven questions each, with 2 A, 2 B, 1 C, 1 D correct answers)
const clarityImpactQuestions = [
    // Original question (modified to fit new passage structure)
    {
        passage: "In 2024, a weather journal in Greenvale issued a flood warning. The journal aimed to convey urgency and clarity to protect residents.",
        question: "Which sentence is better? A) 'Floods are risky.' B) 'Floods devastate homes fast!'",
        answers: [
            { text: "A) Floods are risky", correct: false },
            { text: "B) Floods devastate homes fast!", correct: true },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is good", correct: false }
        ],
        explanation: "B is clear and impactful with vivid language.",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a health journal in Millville explained vaccination benefits. The journal aimed to present information clearly to a general audience.",
        question: "Which sentence is clearer? A) 'Vaccines prevent diseases.' B) 'Shots keep you from getting sick.'",
        answers: [
            { text: "A) Vaccines prevent diseases", correct: true },
            { text: "B) Shots keep you from getting sick", correct: false },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is clear", correct: false }
        ],
        explanation: "A is concise and formal, fitting the journal’s clarity goal.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an environmental journal in Clearwater urged action on deforestation. The journal used impactful language to motivate readers.",
        question: "Which sentence has more impact? A) 'Stop deforestation now, or forests vanish!' B) 'We should reduce tree cutting.'",
        answers: [
            { text: "A) Stop deforestation now, or forests vanish!", correct: true },
            { text: "B) We should reduce tree cutting", correct: false },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither has impact", correct: false }
        ],
        explanation: "A uses urgent, vivid language to drive action.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a community journal in Greenvale provided directions to a festival. The journal aimed to ensure precision and clarity for attendees.",
        question: "Which sentence is clearer? A) 'Go right at the statue.' B) 'Turn right at the bronze statue on Main Street.'",
        answers: [
            { text: "A) Go right at the statue", correct: false },
            { text: "B) Turn right at the bronze statue on Main Street", correct: true },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is clear", correct: false }
        ],
        explanation: "B is more specific, reducing confusion.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a charity journal in Millville sought donations for homeless shelters. The journal used emotionally resonant language to inspire giving.",
        question: "Which sentence has more impact? A) 'Donate to help people.' B) 'Your donation warms hearts this winter.'",
        answers: [
            { text: "A) Donate to help people", correct: false },
            { text: "B) Your donation warms hearts this winter", correct: true },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither has impact", correct: false }
        ],
        explanation: "B evokes emotion and urgency, aligning with the journal’s goal.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a technology journal in Clearwater explained a software update. The journal aimed to simplify technical concepts for readers.",
        question: "Which sentence is clearer? A) 'It enhances functionality.' B) 'It speeds up your apps.'",
        answers: [
            { text: "A) It enhances functionality", correct: false },
            { text: "B) It speeds up your apps", correct: true },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is clear", correct: false }
        ],
        explanation: "B is straightforward and relatable, meeting the clarity goal.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a business journal in Greenvale announced a tight project deadline. The journal used impactful language to motivate teams.",
        question: "Which sentence has more impact? A) 'Complete it soon.' B) 'Finish by Monday, or we lose the client!'",
        answers: [
            { text: "A) Complete it soon", correct: false },
            { text: "B) Finish by Monday, or we lose the client!", correct: true },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither has impact", correct: false }
        ],
        explanation: "B conveys urgency and stakes, driving action.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

const logicalConnectionsQuestions = [
    // Original question (modified to fit new passage structure)
    {
        passage: "In 2024, a sports journal in Millville reported on an athlete’s success. The journal aimed to connect training and outcomes logically.",
        question: "How to connect logically? Sentences: 'She trained hard. She won gold.'",
        answers: [
            { text: "A) She trained hard, thus she won gold", correct: true },
            { text: "B) She trained hard, yet she won gold", correct: false },
            { text: "C) She trained hard, or she won gold", correct: false },
            { text: "D) She trained hard, gold was won", correct: false }
        ],
        explanation: "'Thus' links training to winning as cause-effect.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a weather journal in Greenvale described a storm’s impact. The journal aimed to show cause-and-effect logically.",
        question: "How to connect logically? Sentences: 'Snow fell heavily. Roads closed.'",
        answers: [
            { text: "A) Snow fell heavily, so roads closed", correct: true },
            { text: "B) Snow fell heavily, but roads closed", correct: false },
            { text: "C) Snow fell heavily, or roads closed", correct: false },
            { text: "D) Snow fell heavily, then roads closed", correct: false }
        ],
        explanation: "'So' shows snow caused road closures.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an academic journal in Clearwater evaluated a study program. The journal aimed to highlight logical contrasts in results.",
        question: "How to connect logically? Sentences: 'He studied nightly. He failed the test.'",
        answers: [
            { text: "A) He studied nightly, yet he failed the test", correct: true },
            { text: "B) He studied nightly, so he failed the test", correct: false },
            { text: "C) He studied nightly, and he failed the test", correct: false },
            { text: "D) He studied nightly, because he failed the test", correct: false }
        ],
        explanation: "'Yet' contrasts effort with failure.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a lifestyle journal in Millville outlined a daily routine. The journal aimed to sequence actions logically.",
        question: "How to connect logically? Sentences: 'She exercised. She showered.'",
        answers: [
            { text: "A) She exercised, so she showered", correct: false },
            { text: "B) She exercised, then she showered", correct: true },
            { text: "C) She exercised, but she showered", correct: false },
            { text: "D) She exercised, or she showered", correct: false }
        ],
        explanation: "'Then' shows the sequence of exercising and showering.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a financial journal in Greenvale discussed investment strategies. The journal aimed to connect related financial actions logically.",
        question: "How to connect logically? Sentences: 'He invested wisely. He earned profits.'",
        answers: [
            { text: "A) He invested wisely, yet he earned profits", correct: false },
            { text: "B) He invested wisely, and he earned profits", correct: true },
            { text: "C) He invested wisely, because he earned profits", correct: false },
            { text: "D) He invested wisely, or he earned profits", correct: false }
        ],
        explanation: "'And' links related actions of investing and profiting.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a safety journal in Clearwater reported on winter driving. The journal aimed to explain driving choices with logical reasoning.",
        question: "How to connect logically? Sentences: 'The fog was thick. She used low beams.'",
        answers: [
            { text: "A) She used low beams, yet the fog was thick", correct: false },
            { text: "B) She used low beams, and the fog was thick", correct: false },
            { text: "C) She used low beams because the fog was thick", correct: true },
            { text: "D) She used low beams, or the fog was thick", correct: false }
        ],
        explanation: "'Because' explains why she used low beams.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a workplace journal in Millville outlined task options. The journal aimed to present logical alternatives for employees.",
        question: "How to connect logically? Sentences: 'You can email. You can call.'",
        answers: [
            { text: "A) You can email, and you can call", correct: false },
            { text: "B) You can email, so you can call", correct: false },
            { text: "C) You can email, then you can call", correct: false },
            { text: "D) You can email, or you can call", correct: true }
        ],
        explanation: "'Or' offers two valid communication options.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

const evidenceIntegrationQuestions = [
    // Original question (modified to fit new passage structure)
    {
        passage: "In 2024, an education journal in Greenvale supported music in schools. The journal aimed to integrate evidence to bolster claims.",
        question: "How to integrate? Claim: 'Music aids study.' Evidence: 'Scores rose 10%.'",
        answers: [
            { text: "A) Music aids study, with scores rising 10%", correct: true },
            { text: "B) Music aids study, but scores rose 10%", correct: false },
            { text: "C) Music aids study, scores rose 10%", correct: false },
            { text: "D) Music aids study, or scores rose 10%", correct: false }
        ],
        explanation: "A smoothly integrates evidence with the claim.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a health journal in Millville promoted fitness programs. The journal aimed to support claims with quantitative evidence.",
        question: "How to integrate? Claim: 'Exercise reduces obesity.' Evidence: 'BMI drops 5% with workouts.'",
        answers: [
            { text: "A) Exercise reduces obesity, with BMI dropping 5% with workouts", correct: true },
            { text: "B) Exercise reduces obesity, but BMI drops 5% with workouts", correct: false },
            { text: "C) Exercise reduces obesity, or BMI drops 5% with workouts", correct: false },
            { text: "D) Exercise reduces obesity, BMI drops 5% with workouts", correct: false }
        ],
        explanation: "A integrates the evidence clearly and logically.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a community journal in Clearwater highlighted a local event’s success. The journal aimed to use vivid details to support claims.",
        question: "How to integrate? Claim: 'The festival was vibrant.' Detail: 'Colorful floats filled the streets.'",
        answers: [
            { text: "A) The festival was vibrant, with colorful floats filling the streets", correct: true },
            { text: "B) The festival was vibrant, yet colorful floats filled the streets", correct: false },
            { text: "C) The festival was vibrant, so colorful floats filled the streets", correct: false },
            { text: "D) The festival was vibrant, colorful floats filled the streets", correct: false }
        ],
        explanation: "A naturally integrates the detail to enhance the claim.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a psychology journal in Greenvale explored meditation’s benefits. The journal aimed to back claims with scientific evidence.",
        question: "How to integrate? Claim: 'Meditation improves focus.' Evidence: 'Brain scans show enhanced activity.'",
        answers: [
            { text: "A) Meditation improves focus, but brain scans show enhanced activity", correct: false },
            { text: "B) Meditation improves focus, as brain scans show enhanced activity", correct: true },
            { text: "C) Meditation improves focus, or brain scans show enhanced activity", correct: false },
            { text: "D) Meditation improves focus, brain scans show enhanced activity", correct: false }
        ],
        explanation: "B uses 'as' to logically connect evidence to the claim.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, an urban journal in Millville supported green initiatives. The journal aimed to clarify claims with specific details.",
        question: "How to integrate? Claim: 'Trees enhance cities.' Detail: 'They reduce air pollution.'",
        answers: [
            { text: "A) Trees enhance cities, yet they reduce air pollution", correct: false },
            { text: "B) Trees enhance cities, reducing air pollution", correct: true },
            { text: "C) Trees enhance cities, so they reduce air pollution", correct: false },
            { text: "D) Trees enhance cities, or they reduce air pollution", correct: false }
        ],
        explanation: "B uses a participle for seamless integration.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a sociology journal in Greenvale examined community programs. The journal aimed to quantify social benefits.",
        question: "How to integrate? Claim: 'Mentoring helps youth.' Evidence: 'Graduation rates rose 20%.'",
        answers: [
            { text: "A) Mentoring helps youth, but graduation rates rose 20%", correct: false },
            { text: "B) Mentoring helps youth, or graduation rates rose 20%", correct: false },
            { text: "C) Mentoring helps youth, with graduation rates rising 20%", correct: true },
            { text: "D) Mentoring helps youth, graduation rates rose 20%", correct: false }
        ],
        explanation: "C smoothly ties the evidence to the claim with 'with'.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a business journal in Clearwater promoted workplace training. The journal aimed to combine evidence and details for impact.",
        question: "How to integrate? Claim: 'Training boosts productivity.' Evidence: 'Output increased 15%.' Detail: 'Team collaboration improved.'",
        answers: [
            { text: "A) Training boosts productivity, but output increased 15%, with better collaboration", correct: false },
            { text: "B) Training boosts productivity, output increased 15%, with better collaboration", correct: false },
            { text: "C) Training boosts productivity, or output increased 15%, with better collaboration", correct: false },
            { text: "D) Training boosts productivity, as output increased 15%, especially in team collaboration", correct: true }
        ],
        explanation: "D integrates evidence and detail logically and smoothly.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];





const purposeToneQuestions = [
    // Original question
    {
        passage: "In 2024, a community journal in Greenvale called for urgent policy reforms. The journal adopted a persuasive, serious tone to spur action.",
        question: "Which sentence fits the purpose and tone? A) 'We need change now!' B) 'Change might help.'",
        answers: [
            { text: "A) We need change now!", correct: true },
            { text: "B) Change might help", correct: false },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "A aligns with the urgent, persuasive purpose.",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a science journal in Clearwater explained planetary cycles. The journal used a neutral, informative tone to educate readers.",
        question: "Which sentence fits the purpose and tone? A) 'Mars orbits every 687 days.' B) 'Mars’s orbit is totally awesome!'",
        answers: [
            { text: "A) Mars orbits every 687 days", correct: true },
            { text: "B) Mars’s orbit is totally awesome!", correct: false },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "A is factual and neutral, matching the informative tone.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a safety journal in Millville warned about fire hazards. The journal used a stern, persuasive tone to ensure safety compliance.",
        question: "Which sentence fits the purpose and tone? A) 'Check alarms now!' B) 'Alarms might need checking.'",
        answers: [
            { text: "A) Check alarms now!", correct: true },
            { text: "B) Alarms might need checking", correct: false },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "A is direct and stern, aligning with the warning purpose.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a travel journal in Greenvale shared a humorous travel story. The journal used a playful, entertaining tone to engage readers.",
        question: "Which sentence fits the purpose and tone? A) 'The beach was sandy.' B) 'The beach was a sandy paradise for flip-flops!'",
        answers: [
            { text: "A) The beach was sandy", correct: false },
            { text: "B) The beach was a sandy paradise for flip-flops!", correct: true },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "B uses playful language for entertainment.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a nature journal in Clearwater described a mountain range. The journal used a vivid, descriptive tone to captivate readers.",
        question: "Which sentence fits the purpose and tone? A) 'Mountains are high.' B) 'Mountains pierce the sky like jagged spears.'",
        answers: [
            { text: "A) Mountains are high", correct: false },
            { text: "B) Mountains pierce the sky like jagged spears", correct: true },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "B uses vivid imagery, matching the descriptive tone.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a workplace journal in Millville provided task instructions. The journal used a clear, instructional tone to guide employees.",
        question: "Which sentence fits the purpose and tone? A) 'Do the task quick.' B) 'Complete the task efficiently.'",
        answers: [
            { text: "A) Do the task quick", correct: false },
            { text: "B) Complete the task efficiently", correct: true },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "B is precise and clear, aligning with the instructional tone.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a philosophy journal in Greenvale reflected on personal growth. The journal used a thoughtful, reflective tone to inspire readers.",
        question: "Which sentence fits the purpose and tone? A) 'Challenges happen.' B) 'Challenges forge resilience through adversity.'",
        answers: [
            { text: "A) Challenges happen", correct: false },
            { text: "B) Challenges forge resilience through adversity", correct: true },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "B conveys depth and thoughtfulness, matching the reflective tone.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

const strengtheningArgumentsQuestions = [
    // Original question
    {
        passage: "In 2024, a health journal in Greenvale promoted dietary improvements. The journal aimed to strengthen claims with specific evidence.",
        question: "Which sentence strengthens the argument? Argument: 'Diet improves health.' A) 'It’s good.' B) 'It lowers cholesterol 15%.'",
        answers: [
            { text: "A) It’s good", correct: false },
            { text: "B) It lowers cholesterol 15%", correct: true },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "B adds specific evidence, making it stronger.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a business journal in Millville supported flexible work policies. The journal aimed to counter objections with evidence.",
        question: "Which sentence strengthens the argument? Argument: 'Flexible hours boost productivity.' A) 'Output rises 10%, studies show.' B) 'It’s helpful.'",
        answers: [
            { text: "A) Output rises 10%, studies show", correct: true },
            { text: "B) It’s helpful", correct: false },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "A provides concrete data, strengthening the argument.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an environmental journal in Clearwater explained recycling’s benefits. The journal aimed to clarify claims with reasoning.",
        question: "Which sentence strengthens the explanation? Explanation: 'Recycling conserves resources.' A) 'It reuses materials like aluminum.' B) 'It’s awesome.'",
        answers: [
            { text: "A) It reuses materials like aluminum", correct: true },
            { text: "B) It’s awesome", correct: false },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "A provides specific reasoning, enhancing the explanation.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a sports journal in Greenvale promoted youth athletics. The journal aimed to support arguments with examples.",
        question: "Which sentence strengthens the argument? Argument: 'Sports teach discipline.' A) 'It’s true.' B) 'Basketball drills build routine.'",
        answers: [
            { text: "A) It’s true", correct: false },
            { text: "B) Basketball drills build routine", correct: true },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "B provides a specific example, strengthening the argument.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a health journal in Millville advocated for wellness programs. The journal aimed to use data and reasoning to bolster claims.",
        question: "Which sentence strengthens the argument? Argument: 'Yoga reduces stress.' A) 'It’s relaxing.' B) 'It lowers cortisol, per research.'",
        answers: [
            { text: "A) It’s relaxing", correct: false },
            { text: "B) It lowers cortisol, per research", correct: true },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "B uses evidence and reasoning, making it stronger.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a community journal in Clearwater supported local libraries. The journal aimed to evoke emotion to strengthen arguments.",
        question: "Which sentence strengthens the argument? Argument: 'Libraries enrich communities.' A) 'They’re useful.' B) 'They inspire young readers daily.'",
        answers: [
            { text: "A) They’re useful", correct: false },
            { text: "B) They inspire young readers daily", correct: true },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "B uses emotional appeal, aligning with the journal’s goal.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a science journal in Greenvale endorsed clean energy. The journal aimed to boost credibility with authoritative sources.",
        question: "Which sentence strengthens the argument? Argument: 'Wind power is viable.' A) 'It’s okay.' B) 'Experts at NASA support it.'",
        answers: [
            { text: "A) It’s okay", correct: false },
            { text: "B) Experts at NASA support it", correct: true },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "B adds authoritative credibility, strengthening the argument.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
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
        categoryStats["rhetorical-synthesis"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["rhetorical-synthesis"].incorrect++;
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
        case 1: return clarityImpactQuestions;
        case 2: return logicalConnectionsQuestions;
        case 3: return evidenceIntegrationQuestions;
        case 4: return purposeToneQuestions;
        case 5: return strengtheningArgumentsQuestions;
        default: return clarityImpactQuestions;
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
    let totalCorrect = categoryStats["rhetorical-synthesis"].correct;
    let totalAttempted = totalCorrect + categoryStats["rhetorical-synthesis"].incorrect;

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
    localStorage.setItem(`rhetorical-synthesis-lessonScore-${lessonId}`, score);
    console.log(`Saved rhetorical-synthesis-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`rhetorical-synthesis-lessonScore-${lessonId}`) || "Not completed yet";
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