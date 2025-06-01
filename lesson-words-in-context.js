// Variables (aligned with SAT structure)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "words-in-context": { correct: 0, incorrect: 0 }
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
        title: "Determining Word Meaning from Context",
        content: [
            {
                type: "example",
                title: "Example 1: Basic Context Clues",
                content: `
                    <h2>Example 1: Basic Context Clues</h2>
                    <p>Question: What does 'arduous' mean?</p>
                    <p>Step 1: Look at context: 'exhausted the travelers'.</p>
                    <p>Step 2: Infer: A tiring or difficult trip.</p>
                    <p>Meaning: 'Arduous' means challenging.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Millville reported: 'The arduous journey through the mountains exhausted the travelers.' The journal discussed adventure tourism."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a travel journal in Greenvale reported: 'The serene lake soothed her nerves after a stressful journey.' The journal highlighted tranquil destinations.",
                question: "What does 'serene' mean?",
                options: [
                    { text: "A) Peaceful", correct: true },
                    { text: "B) Rough", correct: false },
                    { text: "C) Dirty", correct: false },
                    { text: "D) Cold", correct: false }
                ],
                explanation: "'Soothed her nerves' suggests a calm, peaceful quality."
            },
            {
                type: "example",
                title: "Example 2: Context with Contrast",
                content: `
                    <h2>Example 2: Context with Contrast</h2>
                    <p>Question: What does 'timid' mean?</p>
                    <p>Step 1: Contrast clue: 'unlike' bold sister.</p>
                    <p>Step 2: Infer: Shy or hesitant.</p>
                    <p>Meaning: 'Timid' means shy.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'Unlike her bold sister, she was timid in social settings.' The journal explored personality traits."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a financial journal in Millville reported: 'His frugal habits saved him a fortune over the years.' The journal discussed budgeting strategies.",
                question: "What does 'frugal' mean?",
                options: [
                    { text: "A) Thrifty", correct: true },
                    { text: "B) Wasteful", correct: false },
                    { text: "C) Generous", correct: false },
                    { text: "D) Careless", correct: false }
                ],
                explanation: "Saving a fortune implies careful spending, so 'frugal' means thrifty."
            },
            {
                type: "example",
                title: "Example 3: Complex Context",
                content: `
                    <h2>Example 3: Complex Context</h2>
                    <p>Question: What does 'cryptic' mean?</p>
                    <p>Step 1: Context: 'left us puzzled'.</p>
                    <p>Step 2: Infer: Mysterious or unclear.</p>
                    <p>Meaning: 'Cryptic' means confusing.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Greenvale reported: 'The cryptic note from the manager left us puzzled.' The journal analyzed workplace communication."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a community journal in Clearwater reported: 'The jovial host welcomed everyone warmly to the event.' The journal discussed local gatherings.",
                question: "What does 'jovial' mean?",
                options: [
                    { text: "A) Cheerful", correct: true },
                    { text: "B) Rude", correct: false },
                    { text: "C) Shy", correct: false },
                    { text: "D) Tired", correct: false }
                ],
                explanation: "'Welcomed warmly' suggests 'jovial' means friendly and happy."
            },
            {
                type: "example",
                title: "Example 4: Definition Clue",
                content: `
                    <h2>Example 4: Definition Clue</h2>
                    <p>Question: What does 'pungent' mean?</p>
                    <p>Step 1: Context: 'strong and sharp odor'.</p>
                    <p>Step 2: Infer: Intense and noticeable.</p>
                    <p>Meaning: 'Pungent' means strong-smelling.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a culinary journal in Millville reported: 'The pungent smell, a strong and sharp odor, filled the kitchen.' The journal explored food trends."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a social journal in Greenvale reported: 'Her candid response surprised the audience.' The journal analyzed public speaking.",
                question: "What does 'candid' mean?",
                options: [
                    { text: "A) Honest", correct: true },
                    { text: "B) Secretive", correct: false },
                    { text: "C) Rude", correct: false },
                    { text: "D) Confusing", correct: false }
                ],
                explanation: "Surprising suggests open or straightforward, so 'candid' means honest."
            },
            {
                type: "example",
                title: "Example 5: Synonym Clue",
                content: `
                    <h2>Example 5: Synonym Clue</h2>
                    <p>Question: What does 'tranquil' mean?</p>
                    <p>Step 1: Context: 'peaceful and quiet'.</p>
                    <p>Step 2: Infer: Calm and serene.</p>
                    <p>Meaning: 'Tranquil' means calm.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Clearwater reported: 'The tranquil forest was peaceful and quiet, a perfect retreat.' The journal promoted nature tourism."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a business journal in Millville reported: 'The meticulous worker checked every detail of the project.' The journal discussed workplace efficiency.",
                question: "What does 'meticulous' mean?",
                options: [
                    { text: "A) Careful", correct: true },
                    { text: "B) Careless", correct: false },
                    { text: "C) Quick", correct: false },
                    { text: "D) Lazy", correct: false }
                ],
                explanation: "Checking every detail implies precision, so 'meticulous' means careful."
            },
            {
                type: "example",
                title: "Example 6: Example Clue",
                content: `
                    <h2>Example 6: Example Clue</h2>
                    <p>Question: What does 'adept' mean?</p>
                    <p>Step 1: Context: 'skilled at solving problems'.</p>
                    <p>Step 2: Infer: Highly capable.</p>
                    <p>Meaning: 'Adept' means skilled.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a technology journal in Greenvale reported: 'He was adept, skilled at solving complex problems quickly.' The journal explored innovation."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a weather journal in Clearwater reported: 'The ominous warning about the storm made residents uneasy.' The journal discussed safety measures.",
                question: "What does 'ominous' mean?",
                options: [
                    { text: "A) Threatening", correct: true },
                    { text: "B) Cheerful", correct: false },
                    { text: "C) Clear", correct: false },
                    { text: "D) Simple", correct: false }
                ],
                explanation: "Making residents uneasy suggests 'ominous' means threatening."
            },
            {
                type: "example",
                title: "Example 7: Emotional Context",
                content: `
                    <h2>Example 7: Emotional Context</h2>
                    <p>Question: What does 'forlorn' mean?</p>
                    <p>Step 1: Context: 'deep sadness'.</p>
                    <p>Step 2: Infer: Lonely or hopeless.</p>
                    <p>Meaning: 'Forlorn' means desolate.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Millville reported: 'Her forlorn expression showed deep sadness after the loss.' The journal analyzed emotional responses."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a cultural journal in Greenvale reported: 'The vibrant colors of the artwork brightened the gallery.' The journal discussed art exhibitions.",
                question: "What does 'vibrant' mean?",
                options: [
                    { text: "A) Lively", correct: true },
                    { text: "B) Dull", correct: false },
                    { text: "C) Dark", correct: false },
                    { text: "D) Quiet", correct: false }
                ],
                explanation: "Brightening suggests 'vibrant' means lively or vivid."
            }
        ]
    },
    2: {
        title: "Recognizing Nuanced Word Meanings",
        content: [
            {
                type: "example",
                title: "Example 1: Subtle Differences",
                content: `
                    <h2>Example 1: Subtle Differences</h2>
                    <p>Question: What does 'asserted' mean here?</p>
                    <p>Step 1: Context: 'confidently'.</p>
                    <p>Step 2: Infer: Stated firmly, not just mentioned.</p>
                    <p>Meaning: 'Asserted' means declared boldly.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a political journal in Clearwater reported: 'She asserted her opinion confidently during the debate.' The journal analyzed public discourse."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, an academic journal in Greenvale reported: 'The professor illuminated the complex topic for the students.' The journal discussed teaching methods.",
                question: "What does 'illuminated' mean?",
                options: [
                    { text: "A) Clarified", correct: true },
                    { text: "B) Lit up", correct: false },
                    { text: "C) Confused", correct: false },
                    { text: "D) Ignored", correct: false }
                ],
                explanation: "In a teaching context, 'illuminated' means made clear, not physically lit."
            },
            {
                type: "example",
                title: "Example 2: Context-Specific Meaning",
                content: `
                    <h2>Example 2: Context-Specific Meaning</h2>
                    <p>Question: What does 'cultivated' mean?</p>
                    <p>Step 1: Context: 'friendships over years'.</p>
                    <p>Step 2: Infer: Nurtured, not farmed.</p>
                    <p>Meaning: 'Cultivated' means developed carefully.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Millville reported: 'He cultivated friendships over many years.' The journal explored interpersonal relationships."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a motivational journal in Clearwater reported: 'Her resolve strengthened after the setback.' The journal discussed resilience.",
                question: "What does 'resolve' mean?",
                options: [
                    { text: "A) Determination", correct: true },
                    { text: "B) Solution", correct: false },
                    { text: "C) Weakness", correct: false },
                    { text: "D) Agreement", correct: false }
                ],
                explanation: "Strengthening after a setback suggests 'resolve' means firmness, not a fix."
            },
            {
                type: "example",
                title: "Example 3: Nuanced Emotional Meaning",
                content: `
                    <h2>Example 3: Nuanced Emotional Meaning</h2>
                    <p>Question: What does 'conveyed' mean?</p>
                    <p>Step 1: Context: 'tone' and 'reluctance'.</p>
                    <p>Step 2: Infer: Expressed subtly, not transported.</p>
                    <p>Meaning: 'Conveyed' means communicated.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a communication journal in Greenvale reported: 'His tone conveyed reluctance during the meeting.' The journal analyzed nonverbal cues."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a business journal in Millville reported: 'She navigated the tricky negotiation skillfully.' The journal discussed leadership strategies.",
                question: "What does 'navigated' mean?",
                options: [
                    { text: "A) Managed", correct: true },
                    { text: "B) Sailed", correct: false },
                    { text: "C) Ignored", correct: false },
                    { text: "D) Lost", correct: false }
                ],
                explanation: "In this context, 'navigated' means handled carefully, not literal sailing."
            },
            {
                type: "example",
                title: "Example 4: Specific Action",
                content: `
                    <h2>Example 4: Specific Action</h2>
                    <p>Question: What does 'fabricated' mean?</p>
                    <p>Step 1: Context: 'excuse to leave'.</p>
                    <p>Step 2: Infer: Made up, not built physically.</p>
                    <p>Meaning: 'Fabricated' means invented.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'He fabricated an excuse to leave the meeting early.' The journal discussed workplace behaviors."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, an art journal in Greenvale reported: 'The artist infused the painting with deep emotion.' The journal discussed creative expression.",
                question: "What does 'infused' mean?",
                options: [
                    { text: "A) Filled", correct: true },
                    { text: "B) Removed", correct: false },
                    { text: "C) Painted", correct: false },
                    { text: "D) Hid", correct: false }
                ],
                explanation: "Adding emotion suggests 'infused' means filled or imbued."
            },
            {
                type: "example",
                title: "Example 5: Subtle Intensity",
                content: `
                    <h2>Example 5: Subtle Intensity</h2>
                    <p>Question: What does 'penetrated' mean?</p>
                    <p>Step 1: Context: 'gaze' and 'defenses'.</p>
                    <p>Step 2: Infer: Broke through emotionally, not physically.</p>
                    <p>Meaning: 'Penetrated' means pierced or saw through.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Millville reported: 'Her gaze penetrated his emotional defenses.' The journal analyzed character interactions."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a sports journal in Clearwater reported: 'He relished the challenge of the intense competition.' The journal discussed athletic motivation.",
                question: "What does 'relished' mean?",
                options: [
                    { text: "A) Enjoyed", correct: true },
                    { text: "B) Avoided", correct: false },
                    { text: "C) Feared", correct: false },
                    { text: "D) Finished", correct: false }
                ],
                explanation: "A challenge one 'relished' suggests enjoyment, not dread."
            },
            {
                type: "example",
                title: "Example 6: Contextual Shift",
                content: `
                    <h2>Example 6: Contextual Shift</h2>
                    <p>Question: What does 'eroded' mean?</p>
                    <p>Step 1: Context: 'debate' and 'friendship'.</p>
                    <p>Step 2: Infer: Wore away, not soil erosion.</p>
                    <p>Meaning: 'Eroded' means diminished.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Greenvale reported: 'The heated debate eroded their friendship.' The journal discussed interpersonal conflicts."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a business journal in Millville reported: 'The strategy evolved over several months.' The journal discussed corporate planning.",
                question: "What does 'evolved' mean?",
                options: [
                    { text: "A) Developed", correct: true },
                    { text: "B) Failed", correct: false },
                    { text: "C) Stayed the same", correct: false },
                    { text: "D) Ended", correct: false }
                ],
                explanation: "Changing over months suggests 'evolved' means grew or developed."
            },
            {
                type: "example",
                title: "Example 7: Emotional Nuance",
                content: `
                    <h2>Example 7: Emotional Nuance</h2>
                    <p>Question: What does 'exuded' mean?</p>
                    <p>Step 1: Context: 'confidence' and 'speech'.</p>
                    <p>Step 2: Infer: Radiated or displayed strongly.</p>
                    <p>Meaning: 'Exuded' means showed visibly.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a communication journal in Clearwater reported: 'She exuded confidence in her keynote speech.' The journal analyzed public speaking."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a social journal in Greenvale reported: 'His words soothed her anxiety during the crisis.' The journal discussed emotional support.",
                question: "What does 'soothed' mean?",
                options: [
                    { text: "A) Calmed", correct: true },
                    { text: "B) Increased", correct: false },
                    { text: "C) Confused", correct: false },
                    { text: "D) Ignored", correct: false }
                ],
                explanation: "Reducing anxiety suggests 'soothed' means calmed."
            }
        ]
    },
    3: {
        title: "Interpreting Figurative and Connotative Meanings",
        content: [
            {
                type: "example",
                title: "Example 1: Figurative Meaning",
                content: `
                    <h2>Example 1: Figurative Meaning</h2>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Recognize figure: Not literal stabbing.</p>
                    <p>Step 2: Interpret: Emotionally hurtful.</p>
                    <p>Meaning: Her words caused deep pain.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Millville reported: 'Her words were a dagger to his heart during the argument.' The journal analyzed emotional imagery."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a news journal in Greenvale reported: 'The announcement was a breath of fresh air to the community.' The journal discussed local developments.",
                question: "What does this mean?",
                options: [
                    { text: "A) It was refreshing", correct: true },
                    { text: "B) It was cold", correct: false },
                    { text: "C) It smelled good", correct: false },
                    { text: "D) It was windy", correct: false }
                ],
                explanation: "'Breath of fresh air' figuratively means something positive and new."
            },
            {
                type: "example",
                title: "Example 2: Connotative Meaning",
                content: `
                    <h2>Example 2: Connotative Meaning</h2>
                    <p>Question: What does 'snake' imply?</p>
                    <p>Step 1: Context: Negotiations.</p>
                    <p>Step 2: Connotation: Sneaky, untrustworthy.</p>
                    <p>Meaning: Deceptive or cunning.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Clearwater reported: 'He’s a snake in negotiations, always outsmarting opponents.' The journal discussed deal-making tactics."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a cultural journal in Millville reported: 'Her smile was radiant at the celebration.' The journal discussed community events.",
                question: "What does 'radiant' connote?",
                options: [
                    { text: "A) Bright and joyful", correct: true },
                    { text: "B) Dim and sad", correct: false },
                    { text: "C) Angry and sharp", correct: false },
                    { text: "D) Quiet and shy", correct: false }
                ],
                explanation: "A smile with 'radiant' suggests happiness and energy."
            },
            {
                type: "example",
                title: "Example 3: Combined Figurative and Connotative",
                content: `
                    <h2>Example 3: Combined Figurative and Connotative</h2>
                    <p>Question: What does this suggest?</p>
                    <p>Step 1: Figurative: 'Storm' isn’t weather.</p>
                    <p>Step 2: Connotation: Intense, harsh critique.</p>
                    <p>Meaning: He faced overwhelming negativity.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a political journal in Greenvale reported: 'The storm of criticism battered him after the decision.' The journal analyzed public reactions."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a literary journal in Clearwater reported: 'His temper flared like a wildfire during the dispute.' The journal discussed emotional imagery.",
                question: "What does this mean?",
                options: [
                    { text: "A) His anger grew quickly", correct: true },
                    { text: "B) He started a fire", correct: false },
                    { text: "C) He was calm", correct: false },
                    { text: "D) He liked wildfires", correct: false }
                ],
                explanation: "'Flared like a wildfire' suggests rapid, intense anger figuratively."
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
                passage: "In 2023, a literary journal in Millville reported: 'Time is a thief that steals our youth.' The journal explored poetic themes."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, an urban journal in Greenvale reported: 'The city was a jungle of concrete and steel.' The journal discussed metropolitan life.",
                question: "What does this mean?",
                options: [
                    { text: "A) It was crowded and chaotic", correct: true },
                    { text: "B) It had many trees", correct: false },
                    { text: "C) It was empty", correct: false },
                    { text: "D) It was peaceful", correct: false }
                ],
                explanation: "'Jungle of concrete' implies a busy, urban environment."
            },
            {
                type: "example",
                title: "Example 5: Positive Connotation",
                content: `
                    <h2>Example 5: Positive Connotation</h2>
                    <p>Question: What does 'melody' imply?</p>
                    <p>Step 1: Context: 'chaos'.</p>
                    <p>Step 2: Connotation: Soothing, pleasant sound.</p>
                    <p>Meaning: Her voice was comforting.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a cultural journal in Clearwater reported: 'Her voice was a melody in the chaos of the protest.' The journal discussed public events."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a social journal in Millville reported: 'He was a rock during the crisis, unwavering and strong.' The journal discussed leadership qualities.",
                question: "What does 'rock' imply?",
                options: [
                    { text: "A) Steady and reliable", correct: true },
                    { text: "B) Cold and hard", correct: false },
                    { text: "C) Weak and shaky", correct: false },
                    { text: "D) Loud and angry", correct: false }
                ],
                explanation: "In a crisis, 'rock' connotes strength and dependability."
            },
            {
                type: "example",
                title: "Example 6: Negative Connotation",
                content: `
                    <h2>Example 6: Negative Connotation</h2>
                    <p>Question: What does 'wolfish' imply?</p>
                    <p>Step 1: Context: 'grin' and 'dim light'.</p>
                    <p>Step 2: Connotation: Predatory, sly.</p>
                    <p>Meaning: His grin was menacing.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Greenvale reported: 'His grin was wolfish in the dim light of the meeting.' The journal analyzed character descriptions."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a business journal in Clearwater reported: 'The plan was a house of cards, ready to collapse.' The journal discussed corporate strategies.",
                question: "What does this mean?",
                options: [
                    { text: "A) It was fragile", correct: true },
                    { text: "B) It was strong", correct: false },
                    { text: "C) It was colorful", correct: false },
                    { text: "D) It was simple", correct: false }
                ],
                explanation: "'House of cards' suggests something easily collapsed."
            },
            {
                type: "example",
                title: "Example 7: Personification",
                content: `
                    <h2>Example 7: Personification</h2>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Figurative: Wind doesn’t whisper.</p>
                    <p>Step 2: Interpret: Soft, gentle sound.</p>
                    <p>Meaning: The wind made a quiet noise.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Millville reported: 'The wind whispered through the trees at dusk.' The journal explored nature imagery."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a cultural journal in Greenvale reported: 'Her eyes sparkled with hope at the festival.' The journal discussed community optimism.",
                question: "What does 'sparkled' connote?",
                options: [
                    { text: "A) Shined with optimism", correct: true },
                    { text: "B) Dimmed with fear", correct: false },
                    { text: "C) Closed tightly", correct: false },
                    { text: "D) Looked away", correct: false }
                ],
                explanation: "With hope, 'sparkled' suggests brightness and positivity."
            }
        ]
    },
    4: {
        title: "Analyzing Word Choice and Rhetorical Effect",
        content: [
            {
                type: "example",
                title: "Example 1: Emotional Impact",
                content: `
                    <h2>Example 1: Emotional Impact</h2>
                    <p>Question: Why use 'ruthless' and 'crushed'?</p>
                    <p>Step 1: Analyze 'ruthless': Harsh, merciless.</p>
                    <p>Step 2: 'Crushed': Total defeat, emotional weight.</p>
                    <p>Effect: Evokes strong negativity and despair.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a political journal in Clearwater reported: 'The ruthless policy crushed their hopes for reform.' The journal analyzed policy impacts."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a cultural journal in Millville reported: 'The vibrant festival energized the crowd with its colors.' The journal discussed community events.",
                question: "Why use 'vibrant'?",
                options: [
                    { text: "A) To suggest liveliness", correct: true },
                    { text: "B) To imply dullness", correct: false },
                    { text: "C) To confuse readers", correct: false },
                    { text: "D) To describe sound", correct: false }
                ],
                explanation: "'Vibrant' with 'energized' creates a lively, positive image."
            },
            {
                type: "example",
                title: "Example 2: Persuasive Effect",
                content: `
                    <h2>Example 2: Persuasive Effect</h2>
                    <p>Question: Why use 'unite' and 'triumph'?</p>
                    <p>Step 1: 'Unite': Suggests collective strength.</p>
                    <p>Step 2: 'Triumph': Victory, inspires action.</p>
                    <p>Effect: Motivates and rallies the reader.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Greenvale reported: 'We must unite to triumph over adversity.' The journal discussed community resilience."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a social journal in Clearwater reported: 'His plea pierced their apathy.' The journal discussed activism.",
                question: "Why use 'pierced'?",
                options: [
                    { text: "A) To show emotional impact", correct: true },
                    { text: "B) To suggest physical harm", correct: false },
                    { text: "C) To indicate silence", correct: false },
                    { text: "D) To imply softness", correct: false }
                ],
                explanation: "'Pierced' implies breaking through indifference forcefully."
            },
            {
                type: "example",
                title: "Example 3: Tone Setting",
                content: `
                    <h2>Example 3: Tone Setting</h2>
                    <p>Question: Why use 'ominous' and 'loomed'?</p>
                    <p>Step 1: 'Ominous': Threatening, foreboding.</p>
                    <p>Step 2: 'Loomed': Imposing, suspenseful.</p>
                    <p>Effect: Creates a tense, foreboding mood.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather journal in Millville reported: 'The ominous clouds loomed overhead before the storm.' The journal discussed atmospheric conditions."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a political journal in Greenvale reported: 'The scandal tarnished his reputation beyond repair.' The journal discussed public trust.",
                question: "Why use 'tarnished'?",
                options: [
                    { text: "A) To imply damage", correct: true },
                    { text: "B) To suggest improvement", correct: false },
                    { text: "C) To describe cleaning", correct: false },
                    { text: "D) To indicate brightness", correct: false }
                ],
                explanation: "'Tarnished' connotes staining or ruining, fitting a scandal’s effect."
            },
            {
                type: "example",
                title: "Example 4: Emphasis",
                content: `
                    <h2>Example 4: Emphasis</h2>
                    <p>Question: Why use 'shone'?</p>
                    <p>Step 1: Context: 'courage' and 'darkness'.</p>
                    <p>Step 2: 'Shone': Bright, standout quality.</p>
                    <p>Effect: Highlights her bravery vividly.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'Her courage shone through the darkness of the crisis.' The journal discussed leadership."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a cultural journal in Millville reported: 'The speech ignited their passion for change.' The journal discussed social movements.",
                question: "Why use 'ignited'?",
                options: [
                    { text: "A) To suggest excitement", correct: true },
                    { text: "B) To imply boredom", correct: false },
                    { text: "C) To describe burning", correct: false },
                    { text: "D) To indicate ending", correct: false }
                ],
                explanation: "'Ignited' conveys sparking enthusiasm, not literal fire."
            },
            {
                type: "example",
                title: "Example 5: Contrast Effect",
                content: `
                    <h2>Example 5: Contrast Effect</h2>
                    <p>Question: Why use 'prevailed'?</p>
                    <p>Step 1: Context: 'chaos' vs. 'calm'.</p>
                    <p>Step 2: 'Prevailed': Won out, stood firm.</p>
                    <p>Effect: Emphasizes strength over disorder.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Greenvale reported: 'Amid the chaos, her calm prevailed.' The journal discussed crisis management."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a business journal in Clearwater reported: 'The policy stifled innovation in the industry.' The journal discussed economic trends.",
                question: "Why use 'stifled'?",
                options: [
                    { text: "A) To suggest suppression", correct: true },
                    { text: "B) To imply growth", correct: false },
                    { text: "C) To describe noise", correct: false },
                    { text: "D) To indicate freedom", correct: false }
                ],
                explanation: "'Stifled' implies blocking or smothering creativity."
            },
            {
                type: "example",
                title: "Example 6: Sensory Impact",
                content: `
                    <h2>Example 6: Sensory Impact</h2>
                    <p>Question: Why use 'wafted'?</p>
                    <p>Step 1: Context: 'aroma'.</p>
                    <p>Step 2: 'Wafted': Gentle, floating movement.</p>
                    <p>Effect: Creates a soft, pleasant sensory image.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a culinary journal in Millville reported: 'The aroma of fresh bread wafted through the air.' The journal discussed dining experiences."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a literary journal in Greenvale reported: 'His words thundered across the auditorium.' The journal discussed oratory skills.",
                question: "Why use 'thundered'?",
                options: [
                    { text: "A) To suggest power", correct: true },
                    { text: "B) To imply quietness", correct: false },
                    { text: "C) To describe rain", correct: false },
                    { text: "D) To indicate weakness", correct: false }
                ],
                explanation: "'Thundered' conveys loudness and authority."
            },
            {
                type: "example",
                title: "Example 7: Emotional Nuance",
                content: `
                    <h2>Example 7: Emotional Nuance</h2>
                    <p>Question: Why use 'resonated'?</p>
                    <p>Step 1: Context: 'plea' and 'audience'.</p>
                    <p>Step 2: 'Resonated': Echoed, struck a chord.</p>
                    <p>Effect: Suggests deep emotional connection.</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a social journal in Clearwater reported: 'Her plea for justice resonated with the audience.' The journal discussed advocacy."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a social journal in Millville reported: 'The loss shattered their dreams of victory.' The journal discussed community resilience.",
                question: "Why use 'shattered'?",
                options: [
                    { text: "A) To imply destruction", correct: true },
                    { text: "B) To suggest repair", correct: false },
                    { text: "C) To describe sound", correct: false },
                    { text: "D) To indicate growth", correct: false }
                ],
                explanation: "'Shattered' conveys breaking apart completely."
            }
        ]
    }
};

// Quiz arrays (seven questions each, with 2 A, 2 B, 1 C, 1 D correct answers)
const wordMeaningQuestions = [
    // Original question
    {
        passage: "In 2024, a community journal in Clearwater reported: 'The jovial host welcomed everyone warmly to the event.' The journal discussed local gatherings.",
        question: "What does 'jovial' mean?",
        answers: [
            { text: "A) Cheerful", correct: true },
            { text: "B) Rude", correct: false },
            { text: "C) Shy", correct: false },
            { text: "D) Tired", correct: false }
        ],
        explanation: "'Welcomed warmly' suggests 'jovial' means friendly and happy.",
        difficulty: "easy",
        category: "words-in-context"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a travel journal in Greenvale reported: 'The tranquil valley offered a peaceful escape from city life.' The journal promoted rural tourism.",
        question: "What does 'tranquil' mean?",
        answers: [
            { text: "A) Calm", correct: true },
            { text: "B) Noisy", correct: false },
            { text: "C) Crowded", correct: false },
            { text: "D) Harsh", correct: false }
        ],
        explanation: "Offering a peaceful escape suggests 'tranquil' means calm.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a business journal in Millville reported: 'Her audacious proposal shocked the conservative board.' The journal discussed corporate innovation.",
        question: "What does 'audacious' mean?",
        answers: [
            { text: "A) Bold", correct: true },
            { text: "B) Timid", correct: false },
            { text: "C) Simple", correct: false },
            { text: "D) Traditional", correct: false }
        ],
        explanation: "Shocking a conservative board suggests 'audacious' means daring or bold.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a social journal in Clearwater reported: 'His frugal lifestyle allowed him to save for retirement.' The journal discussed financial habits.",
        question: "What does 'frugal' mean?",
        answers: [
            { text: "A) Wasteful", correct: false },
            { text: "B) Thrifty", correct: true },
            { text: "C) Extravagant", correct: false },
            { text: "D) Careless", correct: false }
        ],
        explanation: "Saving for retirement implies 'frugal' means careful with money.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a literary journal in Greenvale reported: 'The cryptic message baffled the scholars.' The journal discussed historical texts.",
        question: "What does 'cryptic' mean?",
        answers: [
            { text: "A) Clear", correct: false },
            { text: "B) Mysterious", correct: true },
            { text: "C) Simple", correct: false },
            { text: "D) Loud", correct: false }
        ],
        explanation: "Baffling scholars suggests 'cryptic' means puzzling or mysterious.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a cultural journal in Millville reported: 'Her candid speech surprised the audience with its honesty.' The journal discussed public discourse.",
        question: "What does 'candid' mean?",
        answers: [
            { text: "A) Deceptive", correct: false },
            { text: "B) Reserved", correct: false },
            { text: "C) Frank", correct: true },
            { text: "D) Confusing", correct: false }
        ],
        explanation: "Surprising with honesty suggests 'candid' means open or frank.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a social journal in Clearwater reported: 'The forlorn child sat alone after the event.' The journal discussed community support.",
        question: "What does 'forlorn' mean?",
        answers: [
            { text: "A) Cheerful", correct: false },
            { text: "B) Angry", correct: false },
            { text: "C) Curious", correct: false },
            { text: "D) Sad", correct: true }
        ],
        explanation: "Sitting alone suggests 'forlorn' means lonely or sad.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

const nuancedMeaningsQuestions = [
    // Original question
    {
        passage: "In 2024, a business journal in Millville reported: 'She navigated the tricky negotiation skillfully.' The journal discussed leadership strategies.",
        question: "What does 'navigated' mean?",
        answers: [
            { text: "A) Managed", correct: true },
            { text: "B) Sailed", correct: false },
            { text: "C) Ignored", correct: false },
            { text: "D) Lost", correct: false }
        ],
        explanation: "In this context, 'navigated' means handled carefully, not literal sailing.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a motivational journal in Greenvale reported: 'His resolve grew stronger after each challenge.' The journal discussed personal growth.",
        question: "What does 'resolve' mean?",
        answers: [
            { text: "A) Determination", correct: true },
            { text: "B) Solution", correct: false },
            { text: "C) Weakness", correct: false },
            { text: "D) Agreement", correct: false }
        ],
        explanation: "Growing stronger after challenges suggests 'resolve' means steadfast determination.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an art journal in Clearwater reported: 'She infused her sculptures with vibrant emotion.' The journal discussed artistic expression.",
        question: "What does 'infused' mean?",
        answers: [
            { text: "A) Imbued", correct: true },
            { text: "B) Removed", correct: false },
            { text: "C) Hid", correct: false },
            { text: "D) Painted", correct: false }
        ],
        explanation: "Adding vibrant emotion suggests 'infused' means filled or imbued.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a social journal in Millville reported: 'He exuded confidence during the presentation.' The journal discussed public speaking.",
        question: "What does 'exuded' mean?",
        answers: [
            { text: "A) Lacked", correct: false },
            { text: "B) Radiated", correct: true },
            { text: "C) Concealed", correct: false },
            { text: "D) Questioned", correct: false }
        ],
        explanation: "Showing confidence suggests 'exuded' means visibly displayed or radiated.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a business journal in Greenvale reported: 'The debate eroded their professional relationship.' The journal discussed workplace dynamics.",
        question: "What does 'eroded' mean?",
        answers: [
            { text: "A) Strengthened", correct: false },
            { text: "B) Weakened", correct: true },
            { text: "C) Maintained", correct: false },
            { text: "D) Initiated", correct: false }
        ],
        explanation: "Damaging a relationship suggests 'eroded' means gradually diminished.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a cultural journal in Clearwater reported: 'The artist cultivated a unique style over decades.' The journal discussed creative development.",
        question: "What does 'cultivated' mean?",
        answers: [
            { text: "A) Ignored", correct: false },
            { text: "B) Copied", correct: false },
            { text: "C) Nurtured", correct: true },
            { text: "D) Discarded", correct: false }
        ],
        explanation: "Developing a style over time suggests 'cultivated' means carefully nurtured.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a social journal in Millville reported: 'Her words soothed the team’s frustrations.' The journal discussed conflict resolution.",
        question: "What does 'soothed' mean?",
        answers: [
            { text: "A) Aggravated", correct: false },
            { text: "B) Ignored", correct: false },
            { text: "C) Confused", correct: false },
            { text: "D) Calmed", correct: true }
        ],
        explanation: "Reducing frustrations suggests 'soothed' means calmed or alleviated.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

const figurativeConnotativeQuestions = [
    // Original question
    {
        passage: "In 2024, a literary journal in Clearwater reported: 'His temper flared like a wildfire during the dispute.' The journal discussed emotional imagery.",
        question: "What does this mean?",
        answers: [
            { text: "A) His anger grew quickly", correct: true },
            { text: "B) He started a fire", correct: false },
            { text: "C) He was calm", correct: false },
            { text: "D) He liked wildfires", correct: false }
        ],
        explanation: "'Flared like a wildfire' suggests rapid, intense anger figuratively.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a community journal in Greenvale reported: 'The news was a ray of sunshine in tough times.' The journal discussed local morale.",
        question: "What does this mean?",
        answers: [
            { text: "A) It was uplifting", correct: true },
            { text: "B) It was hot", correct: false },
            { text: "C) It was blinding", correct: false },
            { text: "D) It was temporary", correct: false }
        ],
        explanation: "'Ray of sunshine' figuratively means something positive and cheering.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a business journal in Millville reported: 'She was a shark in the boardroom.' The journal discussed negotiation tactics.",
        question: "What does 'shark' imply?",
        answers: [
            { text: "A) Aggressive and cunning", correct: true },
            { text: "B) Friendly and cooperative", correct: false },
            { text: "C) Weak and hesitant", correct: false },
            { text: "D) Curious and observant", correct: false }
        ],
        explanation: "In a boardroom, 'shark' connotes a fierce, competitive nature.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a cultural journal in Clearwater reported: 'The festival was a tapestry of cultures.' The journal discussed diversity.",
        question: "What does this mean?",
        answers: [
            { text: "A) It was chaotic", correct: false },
            { text: "B) It was richly diverse", correct: true },
            { text: "C) It was simple", correct: false },
            { text: "D) It was brief", correct: false }
        ],
        explanation: "'Tapestry of cultures' suggests a complex, interwoven mix of diversity.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a social journal in Greenvale reported: 'His voice was a beacon in the confusion.' The journal discussed leadership.",
        question: "What does 'beacon' imply?",
        answers: [
            { text: "A) Weakness", correct: false },
            { text: "B) Guidance", correct: true },
            { text: "C) Silence", correct: false },
            { text: "D) Chaos", correct: false }
        ],
        explanation: "In confusion, 'beacon' connotes clarity and direction.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a literary journal in Millville reported: 'The decision was a house of cards, doomed to fall.' The journal discussed policy flaws.",
        question: "What does this mean?",
        answers: [
            { text: "A) It was strong", correct: false },
            { text: "B) It was colorful", correct: false },
            { text: "C) It was unstable", correct: true },
            { text: "D) It was permanent", correct: false }
        ],
        explanation: "'House of cards' implies fragility, likely to collapse.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a cultural journal in Clearwater reported: 'Her laughter was a melody amidst the tension.' The journal discussed community events.",
        question: "What does 'melody' imply?",
        answers: [
            { text: "A) Discord", correct: false },
            { text: "B) Silence", correct: false },
            { text: "C) Anger", correct: false },
            { text: "D) Harmony", correct: true }
        ],
        explanation: "Amidst tension, 'melody' connotes a soothing, pleasant quality.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

const wordChoiceQuestions = [
    // Original question
    {
        passage: "In 2024, a political journal in Greenvale reported: 'The scandal tarnished his reputation beyond repair.' The journal discussed public trust.",
        question: "Why use 'tarnished'?",
        answers: [
            { text: "A) To imply damage", correct: true },
            { text: "B) To suggest improvement", correct: false },
            { text: "C) To describe cleaning", correct: false },
            { text: "D) To indicate brightness", correct: false }
        ],
        explanation: "'Tarnished' connotes staining or ruining, fitting a scandal’s effect.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a cultural journal in Millville reported: 'The festival’s vibrant energy captivated the audience.' The journal discussed community engagement.",
        question: "Why use 'vibrant'?",
        answers: [
            { text: "A) To evoke excitement", correct: true },
            { text: "B) To suggest dullness", correct: false },
            { text: "C) To imply silence", correct: false },
            { text: "D) To describe size", correct: false }
        ],
        explanation: "'Vibrant' with 'captivated' creates a lively, engaging atmosphere.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a social journal in Clearwater reported: 'Her plea resonated with the crowd’s emotions.' The journal discussed advocacy.",
        question: "Why use 'resonated'?",
        answers: [
            { text: "A) To suggest connection", correct: true },
            { text: "B) To imply discord", correct: false },
            { text: "C) To describe loudness", correct: false },
            { text: "D) To indicate rejection", correct: false }
        ],
        explanation: "'Resonated' conveys a deep emotional alignment with the crowd.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a business journal in Greenvale reported: 'The policy stifled innovation in the sector.' The journal discussed economic trends.",
        question: "Why use 'stifled'?",
        answers: [
            { text: "A) To suggest growth", correct: false },
            { text: "B) To imply restriction", correct: true },
            { text: "C) To describe noise", correct: false },
            { text: "D) To indicate freedom", correct: false }
        ],
        explanation: "'Stifled' conveys suppression, highlighting the policy’s negative impact.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a literary journal in Millville reported: 'His words thundered through the hall, commanding attention.' The journal discussed oratory power.",
        question: "Why use 'thundered'?",
        answers: [
            { text: "A) To suggest weakness", correct: false },
            { text: "B) To convey authority", correct: true },
            { text: "C) To imply softness", correct: false },
            { text: "D) To describe weather", correct: false }
        ],
        explanation: "'Thundered' with 'commanding attention' emphasizes powerful delivery.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a social journal in Clearwater reported: 'Her courage shone brightly in the face of adversity.' The journal discussed resilience.",
        question: "Why use 'shone'?",
        answers: [
            { text: "A) To suggest dimness", correct: false },
            { text: "B) To imply failure", correct: false },
            { text: "C) To highlight bravery", correct: true },
            { text: "D) To describe darkness", correct: false }
        ],
        explanation: "'Shone' emphasizes her courage as a standout quality.",
        difficulty: "medium",
        category: "words-in-context"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a political journal in Greenvale reported: 'The decision shattered their hopes for progress.' The journal discussed policy impacts.",
        question: "Why use 'shattered'?",
        answers: [
            { text: "A) To suggest repair", correct: false },
            { text: "B) To imply growth", correct: false },
            { text: "C) To describe sound", correct: false },
            { text: "D) To convey devastation", correct: true }
        ],
        explanation: "'Shattered' conveys complete destruction of hopes, fitting the context.",
        difficulty: "medium",
        category: "words-in-context"
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
        categoryStats["words-in-context"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["words-in-context"].incorrect++;
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
        case 1: return wordMeaningQuestions;
        case 2: return nuancedMeaningsQuestions;
        case 3: return figurativeConnotativeQuestions;
        case 4: return wordChoiceQuestions;
        default: return wordMeaningQuestions;
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
    let totalCorrect = categoryStats["words-in-context"].correct;
    let totalAttempted = totalCorrect + categoryStats["words-in-context"].incorrect;

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
    localStorage.setItem(`words-in-context-lessonScore-${lessonId}`, score);
    console.log(`Saved words-in-context-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`words-in-context-lessonScore-${lessonId}`) || "Not completed yet";
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