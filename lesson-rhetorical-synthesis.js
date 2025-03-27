// Ensure scores display on page load by calling showScore


// Declare global variables at the top
let totalItems = 0;
let completedItems = 0;
let categoryStats = {
    "rhetorical-synthesis": { correct: 0, incorrect: 0 }
};
let currentQuestionIndex = 0;
let currentLesson = 1;
let currentItemIndex = 0;
// Define all lessons
// Define all lessons
const lessons = {
    1: {
        title: "Choosing the Best Sentence for Clarity and Impact",
        content: [
            {
                type: "example",
                title: "Example: Clarity in Sentence Choice",
                content: `
                    <h2>Example: Clarity in Sentence Choice</h2>
                    <p>Context: Explaining a recycling benefit.</p>
                    <p>A) 'Recycling cuts waste.' B) 'Trash goes down with recycling stuff.'</p>
                    <p>Question: Which is clearer?</p>
                    <p>Step 1: Analyze: A is concise, B is vague.</p>
                    <p>Step 2: Choose: A is direct and clear.</p>
                    <p>Best: 'Recycling cuts waste.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Context: Describing a study’s result. A) 'Data shows improvement.' B) 'Some numbers got better.' Which is clearer?",
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
                    <p>Context: Urging action on climate.</p>
                    <p>A) 'We should act now.' B) 'Act now, or lose everything!'</p>
                    <p>Question: Which has more impact?</p>
                    <p>Step 1: Analyze: A is mild, B is urgent.</p>
                    <p>Step 2: Choose: B grabs attention.</p>
                    <p>Best: 'Act now, or lose everything!'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Context: Motivating a team. A) 'We can win.' B) 'Victory is ours if we fight!' Which has more impact?",
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
                    <p>Context: Giving directions to a meeting.</p>
                    <p>A) 'Turn left at the big tree.' B) 'At the oak by the park, go left.'</p>
                    <p>Question: Which is clearer?</p>
                    <p>Step 1: Analyze: A is general, B is specific.</p>
                    <p>Step 2: Choose: B reduces confusion.</p>
                    <p>Best: 'At the oak by the park, go left.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Context: Explaining a safety rule. A) 'Wear helmets.' B) 'Helmets save heads—wear them!' Which is better?",
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
                    <p>Context: Encouraging donations for a cause.</p>
                    <p>A) 'Give money to help.' B) 'Your gift saves lives today.'</p>
                    <p>Question: Which has more impact?</p>
                    <p>Step 1: Analyze: A is bland, B is personal.</p>
                    <p>Step 2: Choose: B stirs emotion.</p>
                    <p>Best: 'Your gift saves lives today.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Context: Announcing a sale. A) 'Discounts start tomorrow.' B) 'Tomorrow, snag deals before they’re gone!' Which has more impact?",
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
                    <p>Context: Explaining a tech benefit.</p>
                    <p>A) 'It optimizes system efficiency.' B) 'It makes your device run faster.'</p>
                    <p>Question: Which is clearer?</p>
                    <p>Step 1: Analyze: A is technical, B is simple.</p>
                    <p>Step 2: Choose: B is easier to grasp.</p>
                    <p>Best: 'It makes your device run faster.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Context: Describing a health tip. A) 'Exercise helps you.' B) 'Daily walks boost your heart.' Which is clearer?",
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
                    <p>Context: Announcing a project due date.</p>
                    <p>A) 'Finish by Friday.' B) 'Friday’s the line—get it done!'</p>
                    <p>Question: Which has more impact?</p>
                    <p>Step 1: Analyze: A is plain, B is forceful.</p>
                    <p>Step 2: Choose: B pushes action.</p>
                    <p>Best: 'Friday’s the line—get it done!'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Context: Warning about a storm. A) 'Be ready for rain.' B) 'Brace for the downpour—it’s coming!' Which has more impact?",
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
                    <p>Context: Warning about pollution.</p>
                    <p>A) 'Pollution is bad.' B) 'Pollution chokes our planet daily.'</p>
                    <p>Question: Which is better?</p>
                    <p>Step 1: Analyze: A is simple, B is vivid.</p>
                    <p>Step 2: Choose: B is clear and striking.</p>
                    <p>Best: 'Pollution chokes our planet daily.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Context: Explaining a new policy. A) 'Rules changed.' B) 'Our policy just got a clear upgrade.' Which is clearer?",
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
                    <p>Sentences: 'Rain fell heavily. Streets flooded.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Rain caused flooding.</p>
                    <p>Step 2: Connect: Use 'thus' for effect.</p>
                    <p>Revised: 'Rain fell heavily, thus streets flooded.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Sentences: 'He studied hard. He passed.' How to connect logically?",
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
                    <p>Sentences: 'She practiced a lot. She didn’t win.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Effort vs. outcome.</p>
                    <p>Step 2: Connect: Use 'yet' for contrast.</p>
                    <p>Revised: 'She practiced a lot, yet she didn’t win.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Sentences: 'The plan was simple. It failed.' How to connect logically?",
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
                    <p>Sentences: 'She wrote the code. She tested it.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Steps in order.</p>
                    <p>Step 2: Connect: Use 'then' for sequence.</p>
                    <p>Revised: 'She wrote the code, then she tested it.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Sentences: 'He cooked dinner. He ate.' How to connect logically?",
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
                    <p>Sentences: 'The team worked late. They met the deadline.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Extra effort aided success.</p>
                    <p>Step 2: Connect: Use 'and' for addition.</p>
                    <p>Revised: 'The team worked late, and they met the deadline.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Sentences: 'She saved money. She bought a car.' How to connect logically?",
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
                    <p>Sentences: 'He was tired. He went to bed early.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Tiredness caused early sleep.</p>
                    <p>Step 2: Connect: Use 'because' for reason.</p>
                    <p>Revised: 'He went to bed early because he was tired.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Sentences: 'The road was icy. She drove slowly.' How to connect logically?",
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
                    <p>Sentences: 'It rains. We’ll stay inside.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Rain triggers staying in.</p>
                    <p>Step 2: Connect: Use 'if' for condition.</p>
                    <p>Revised: 'If it rains, we’ll stay inside.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Sentences: 'You finish early. You can leave.' How to connect logically?",
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
                    <p>Sentences: 'We can walk. We can drive.'</p>
                    <p>Question: How to connect logically?</p>
                    <p>Step 1: Identify: Two options presented.</p>
                    <p>Step 2: Connect: Use 'or' for alternatives.</p>
                    <p>Revised: 'We can walk, or we can drive.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Sentences: 'She can call. She can text.' How to connect logically?",
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
                    <p>Claim: 'Exercise improves health.'</p>
                    <p>Evidence: 'Studies show lower heart disease rates.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Evidence supports claim.</p>
                    <p>Step 2: Integrate: Combine smoothly.</p>
                    <p>Revised: 'Exercise improves health, as studies show lower heart disease rates.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Claim: 'Reading boosts learning.' Evidence: 'Test scores rose 15%.' How to integrate?",
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
                    <p>Claim: 'The policy saved money.'</p>
                    <p>Detail: 'It cut costs by 20%.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Detail explains savings.</p>
                    <p>Step 2: Integrate: Use specific example.</p>
                    <p>Revised: 'The policy saved money, cutting costs by 20%.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Claim: 'The event was popular.' Detail: 'Over 500 attended.' How to integrate?",
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
                    <p>Claim: 'Diet affects mood.'</p>
                    <p>Evidence: 'Research links sugar to anxiety.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Evidence supports claim.</p>
                    <p>Step 2: Integrate: Add evidence directly.</p>
                    <p>Revised: 'Diet affects mood, as research links sugar to anxiety.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Claim: 'Sleep improves memory.' Evidence: 'Studies show better recall.' How to integrate?",
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
                    <p>Claim: 'Parks benefit cities.'</p>
                    <p>Detail: 'They increase property values.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Detail shows benefit.</p>
                    <p>Step 2: Integrate: Use a participle.</p>
                    <p>Revised: 'Parks benefit cities, increasing property values.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Claim: 'Training boosts skills.' Detail: 'It improves accuracy.' How to integrate?",
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
                    <p>Claim: 'Recycling helps the environment.'</p>
                    <p>Evidence: 'It reduces landfill use by 30%.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Evidence quantifies benefit.</p>
                    <p>Step 2: Integrate: Add directly.</p>
                    <p>Revised: 'Recycling helps the environment, reducing landfill use by 30%.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Claim: 'Education reduces crime.' Evidence: 'Crime drops 25% with schooling.' How to integrate?",
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
                    <p>Claim: 'Art inspires creativity.'</p>
                    <p>Detail: 'It sparks new ideas.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Detail explains inspiration.</p>
                    <p>Step 2: Integrate: Use a phrase.</p>
                    <p>Revised: 'Art inspires creativity, sparking new ideas.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Claim: 'Travel broadens perspectives.' Detail: 'It exposes people to cultures.' How to integrate?",
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
                    <p>Claim: 'Tech aids education.'</p>
                    <p>Evidence: 'Studies prove better scores.' Detail: 'Math improved most.'</p>
                    <p>Question: How to integrate?</p>
                    <p>Step 1: Link: Evidence and detail support claim.</p>
                    <p>Step 2: Integrate: Combine for flow.</p>
                    <p>Revised: 'Tech aids education, as studies prove better scores, especially in math.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Claim: 'Music reduces stress.' Evidence: 'Research shows calm.' Detail: 'Heart rates drop.' How to integrate?",
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
                    <p>Context: Urging recycling (persuasive, urgent tone).</p>
                    <p>A) 'We must recycle now!' B) 'Recycling is an option.'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Persuasive needs urgency.</p>
                    <p>Step 2: Match: A is forceful, B is casual.</p>
                    <p>Best: 'We must recycle now!'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Context: Convincing action (persuasive, serious tone). A) 'Act fast to save lives!' B) 'Maybe we should act.' Which fits?",
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
                    <p>Context: Explaining weather (informative, neutral tone).</p>
                    <p>A) 'Rain falls often here.' B) 'Rain is super annoying!'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Informative needs facts, neutrality.</p>
                    <p>Step 2: Match: A is factual, B is opinionated.</p>
                    <p>Best: 'Rain falls often here.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Context: Describing history (informative, neutral tone). A) 'Wars shaped the era.' B) 'Wars were totally wild!' Which fits?",
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
                    <p>Context: Storytelling (entertaining, playful tone).</p>
                    <p>A) 'The cat napped.' B) 'The cat snoozed like a champ!'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Entertaining needs fun.</p>
                    <p>Step 2: Match: B is lively, A is bland.</p>
                    <p>Best: 'The cat snoozed like a champ!'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Context: Joking about food (entertaining, light tone). A) 'Pizza is tasty.' B) 'Pizza’s the king of munchies!' Which fits?",
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
                    <p>Context: Cautioning about danger (persuasive, stern tone).</p>
                    <p>A) 'Watch out for ice!' B) 'Ice might be there.'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Warning needs authority.</p>
                    <p>Step 2: Match: A is direct, B is weak.</p>
                    <p>Best: 'Watch out for ice!'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Context: Alerting to risk (persuasive, stern tone). A) 'Don’t swim—sharks!' B) 'Swimming could be risky.' Which fits?",
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
                    <p>Context: Painting a scene (descriptive, vivid tone).</p>
                    <p>A) 'The sky was blue.' B) 'The sky shimmered sapphire.'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Descriptive needs imagery.</p>
                    <p>Step 2: Match: B is vivid, A is plain.</p>
                    <p>Best: 'The sky shimmered sapphire.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Context: Depicting a forest (descriptive, vivid tone). A) 'Trees were tall.' B) 'Trees towered like giants.' Which fits?",
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
                    <p>Context: Teaching a task (instructional, clear tone).</p>
                    <p>A) 'Mix the stuff.' B) 'Stir the ingredients well.'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Instructions need clarity.</p>
                    <p>Step 2: Match: B is precise, A is vague.</p>
                    <p>Best: 'Stir the ingredients well.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Context: Guiding setup (instructional, clear tone). A) 'Plug it in right.' B) 'Insert the cord into the outlet.' Which fits?",
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
                    <p>Context: Sharing a lesson (reflective, thoughtful tone).</p>
                    <p>A) 'Life teaches us.' B) 'Life reveals wisdom through struggle.'</p>
                    <p>Question: Which fits the purpose and tone?</p>
                    <p>Step 1: Check: Reflective needs depth.</p>
                    <p>Step 2: Match: B is thoughtful, A is basic.</p>
                    <p>Best: 'Life reveals wisdom through struggle.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Context: Pondering time (reflective, thoughtful tone). A) 'Time goes fast.' B) 'Time slips away, leaving lessons.' Which fits?",
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
                    <p>Argument: 'Education helps people.'</p>
                    <p>Weak: 'It’s good.' Strong: 'It raises incomes by 10%.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak is vague, strong is precise.</p>
                    <p>Step 2: Choose: Specific data bolsters.</p>
                    <p>Best: 'Education helps people, raising incomes by 10%.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Argument: 'Exercise is beneficial.' A) 'It’s nice.' B) 'It cuts stress 30%.' Which strengthens it?",
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
                    <p>Explanation: 'Trees reduce pollution.'</p>
                    <p>Weak: 'They just do.' Strong: 'They filter air particles.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak lacks why, strong explains.</p>
                    <p>Step 2: Choose: Reasoning adds depth.</p>
                    <p>Best: 'Trees reduce pollution by filtering air particles.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Explanation: 'Sleep aids focus.' A) 'It’s true.' B) 'It restores brain function.' Which strengthens it?",
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
                    <p>Argument: 'Sports build teamwork.'</p>
                    <p>Weak: 'It’s obvious.' Strong: 'Soccer teams coordinate plays.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak assumes, strong shows.</p>
                    <p>Step 2: Choose: Examples clarify.</p>
                    <p>Best: 'Sports build teamwork, like soccer teams coordinating plays.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Argument: 'Reading improves knowledge.' A) 'It does.' B) 'Biographies teach history.' Which strengthens it?",
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
                    <p>Argument: 'Parks improve cities.'</p>
                    <p>Weak: 'They’re cool.' Strong: 'They boost happiness, per surveys.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak is vague, strong has proof.</p>
                    <p>Step 2: Choose: Evidence and reason win.</p>
                    <p>Best: 'Parks improve cities, boosting happiness, per surveys.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Argument: 'Meditation helps health.' A) 'It’s great.' B) 'It lowers blood pressure, studies say.' Which strengthens it?",
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
                    <p>Argument: 'Remote work is effective.'</p>
                    <p>Weak: 'It works fine.' Strong: 'Productivity rises despite less oversight.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak ignores doubts, strong addresses them.</p>
                    <p>Step 2: Choose: Countering strengthens.</p>
                    <p>Best: 'Remote work is effective, with productivity rising despite less oversight.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Argument: 'Public transit saves money.' A) 'It’s cheap.' B) 'It cuts fuel costs despite fares.' Which strengthens it?",
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
                    <p>Argument: 'Vaccines are safe.'</p>
                    <p>Weak: 'People say so.' Strong: 'Experts at CDC confirm it.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak is hearsay, strong cites authority.</p>
                    <p>Step 2: Choose: Authority adds credibility.</p>
                    <p>Best: 'Vaccines are safe, as experts at CDC confirm.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Argument: 'Solar power is reliable.' A) 'It’s fine.' B) 'Engineers at MIT endorse it.' Which strengthens it?",
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
                    <p>Argument: 'Shelters save pets.'</p>
                    <p>Weak: 'They’re useful.' Strong: 'They rescue abandoned pups daily.'</p>
                    <p>Question: Which strengthens it?</p>
                    <p>Step 1: Analyze: Weak is dry, strong tugs heartstrings.</p>
                    <p>Step 2: Choose: Emotion reinforces.</p>
                    <p>Best: 'Shelters save pets, rescuing abandoned pups daily.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Argument: 'Donations help kids.' A) 'They do good.' B) 'They feed hungry children nightly.' Which strengthens it?",
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

// Rhetorical Synthesis question arrays
const clarityImpactQuestions = [
    {
        question: "Context: Warning about floods. A) 'Floods are risky.' B) 'Floods devastate homes fast!' Which is better?",
        answers: [
            { text: "A) Floods are risky", correct: false },
            { text: "B) Floods devastate homes fast!", correct: true },
            { text: "C) Both are equal", correct: false },
            { text: "D) Neither is good", correct: false }
        ],
        explanation: "B is clear and impactful with vivid language.",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    }
];

const logicalConnectionsQuestions = [
    {
        question: "Sentences: 'She trained hard. She won gold.' How to connect logically?",
        answers: [
            { text: "A) She trained hard, thus she won gold", correct: true },
            { text: "B) She trained hard, yet she won gold", correct: false },
            { text: "C) She trained hard, or she won gold", correct: false },
            { text: "D) She trained hard, gold was won", correct: false }
        ],
        explanation: "'Thus' links training to winning as cause-effect.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

const evidenceIntegrationQuestions = [
    {
        question: "Claim: 'Music aids study.' Evidence: 'Scores rose 10%.' How to integrate?",
        answers: [
            { text: "A) Music aids study, with scores rising 10%", correct: true },
            { text: "B) Music aids study, but scores rose 10%", correct: false },
            { text: "C) Music aids study, scores rose 10%", correct: false },
            { text: "D) Music aids study, or scores rose 10%", correct: false }
        ],
        explanation: "A smoothly integrates evidence with the claim.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

const purposeToneQuestions = [
    {
        question: "Context: Persuading for change (urgent tone). A) 'We need change now!' B) 'Change might help.' Which fits?",
        answers: [
            { text: "A) We need change now!", correct: true },
            { text: "B) Change might help", correct: false },
            { text: "C) Both fit", correct: false },
            { text: "D) Neither fits", correct: false }
        ],
        explanation: "A aligns with the urgent, persuasive purpose.",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    }
];

const strengtheningArgumentsQuestions = [
    {
        question: "Argument: 'Diet improves health.' A) 'It’s good.' B) 'It lowers cholesterol 15%.' Which strengthens it?",
        answers: [
            { text: "A) It’s good", correct: false },
            { text: "B) It lowers cholesterol 15%", correct: true },
            { text: "C) Both equally", correct: false },
            { text: "D) Neither", correct: false }
        ],
        explanation: "B adds specific evidence, making it stronger.",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    }
];

// lesson-rhetorical-synthesis.js

let categoryStats = {
    "rhetorical-synthesis": { correct: 0, incorrect: 0 }
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
    const passageMatch = content.match(/Context:.*?(?=<p>Question:|$)/is) || 
                        content.match(/Sentences:.*?(?=<p>Question:|$)/is) || 
                        content.match(/Claim:.*?(?=Evidence:|$)/is) || 
                        content.match(/Argument:.*?(?=<p>Weak:|$)/is) || 
                        content.match(/<p>Context:.*?<\/p>/is);
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
        categoryStats["rhetorical-synthesis"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["rhetorical-synthesis"].incorrect++;
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
        case 1: quizQuestions = clarityImpactQuestions; break;
        case 2: quizQuestions = logicalConnectionsQuestions; break;
        case 3: quizQuestions = evidenceIntegrationQuestions; break;
        case 4: quizQuestions = purposeToneQuestions; break;
        case 5: quizQuestions = strengtheningArgumentsQuestions; break;
        default: quizQuestions = clarityImpactQuestions;
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
        case 1: quizQuestions = clarityImpactQuestions; break;
        case 2: quizQuestions = logicalConnectionsQuestions; break;
        case 3: quizQuestions = evidenceIntegrationQuestions; break;
        case 4: quizQuestions = purposeToneQuestions; break;
        case 5: quizQuestions = strengtheningArgumentsQuestions; break;
        default: quizQuestions = clarityImpactQuestions;
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
    localStorage.setItem(`rhetorical-synthesis-lessonScore-${lessonId}`, score);
    console.log(`Saved rhetorical-synthesis-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`rhetorical-synthesis-lessonScore-${lessonId}`) || "Not completed yet";
}

function showScore() {
    const finalScoreElement = document.getElementById('final-score');
    if (finalScoreElement) {
        const score = getScore(currentLesson);
        if (score !== "Not completed yet") {
            finalScoreElement.innerHTML = `
                <h2>Previous Score</h2>
                <p>Your previous score for this lesson: ${score}</p>
            `;
            finalScoreElement.classList.remove('hide');
        } else {
            finalScoreElement.classList.add('hide');
        }
    }
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

    showScore();
});