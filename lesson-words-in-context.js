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
        title: "Determining Word Meaning from Context",
        content: [
            {
                type: "example",
                title: "Example 1: Basic Context Clues",
                content: `
                    <h2>Example 1: Basic Context Clues</h2>
                    <p>Passage: 'The arduous journey exhausted the travelers.'</p>
                    <p>Question: What does 'arduous' mean?</p>
                    <p>Step 1: Look at context: 'exhausted the travelers'.</p>
                    <p>Step 2: Infer: A tiring or difficult trip.</p>
                    <p>Meaning: 'Arduous' means challenging.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The serene lake soothed her nerves.' What does 'serene' mean?",
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
                    <p>Passage: 'Unlike her timid brother, she was bold.'</p>
                    <p>Question: What does 'timid' mean?</p>
                    <p>Step 1: Contrast clue: 'unlike' bold sister.</p>
                    <p>Step 2: Infer: Shy or hesitant.</p>
                    <p>Meaning: 'Timid' means shy.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'His frugal habits saved him money.' What does 'frugal' mean?",
                options: [
                    { text: "A) Thrifty", correct: true },
                    { text: "B) Wasteful", correct: false },
                    { text: "C) Generous", correct: false },
                    { text: "D) Careless", correct: false }
                ],
                explanation: "Saving money implies careful spending, so 'frugal' means thrifty."
            },
            {
                type: "example",
                title: "Example 3: Complex Context",
                content: `
                    <h2>Example 3: Complex Context</h2>
                    <p>Passage: 'The cryptic note left us puzzled.'</p>
                    <p>Question: What does 'cryptic' mean?</p>
                    <p>Step 1: Context: 'left us puzzled'.</p>
                    <p>Step 2: Infer: Mysterious or unclear.</p>
                    <p>Meaning: 'Cryptic' means confusing.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The jovial host welcomed everyone warmly.' What does 'jovial' mean?",
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
                    <p>Passage: 'The pungent smell, a strong and sharp odor, filled the room.'</p>
                    <p>Question: What does 'pungent' mean?</p>
                    <p>Step 1: Context: 'strong and sharp odor'.</p>
                    <p>Step 2: Infer: Intense and noticeable.</p>
                    <p>Meaning: 'Pungent' means strong-smelling.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'Her candid response surprised them.' What does 'candid' mean?",
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
                    <p>Passage: 'The tranquil forest was peaceful and quiet.'</p>
                    <p>Question: What does 'tranquil' mean?</p>
                    <p>Step 1: Context: 'peaceful and quiet'.</p>
                    <p>Step 2: Infer: Calm and serene.</p>
                    <p>Meaning: 'Tranquil' means calm.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The meticulous worker checked every detail.' What does 'meticulous' mean?",
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
                    <p>Passage: 'He was adept, skilled at solving problems quickly.'</p>
                    <p>Question: What does 'adept' mean?</p>
                    <p>Step 1: Context: 'skilled at solving problems'.</p>
                    <p>Step 2: Infer: Highly capable.</p>
                    <p>Meaning: 'Adept' means skilled.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The ominous warning made them uneasy.' What does 'ominous' mean?",
                options: [
                    { text: "A) Threatening", correct: true },
                    { text: "B) Cheerful", correct: false },
                    { text: "C) Clear", correct: false },
                    { text: "D) Simple", correct: false }
                ],
                explanation: "Making them uneasy suggests 'ominous' means threatening."
            },
            {
                type: "example",
                title: "Example 7: Emotional Context",
                content: `
                    <h2>Example 7: Emotional Context</h2>
                    <p>Passage: 'Her forlorn expression showed deep sadness.'</p>
                    <p>Question: What does 'forlorn' mean?</p>
                    <p>Step 1: Context: 'deep sadness'.</p>
                    <p>Step 2: Infer: Lonely or hopeless.</p>
                    <p>Meaning: 'Forlorn' means desolate.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The vibrant colors brightened the room.' What does 'vibrant' mean?",
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
                    <p>Passage: 'She asserted her opinion confidently.'</p>
                    <p>Question: What does 'asserted' mean here?</p>
                    <p>Step 1: Context: 'confidently'.</p>
                    <p>Step 2: Infer: Stated firmly, not just mentioned.</p>
                    <p>Meaning: 'Asserted' means declared boldly.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The teacher illuminated the topic for us.' What does 'illuminated' mean?",
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
                    <p>Passage: 'He cultivated friendships over years.'</p>
                    <p>Question: What does 'cultivated' mean?</p>
                    <p>Step 1: Context: 'friendships over years'.</p>
                    <p>Step 2: Infer: Nurtured, not farmed.</p>
                    <p>Meaning: 'Cultivated' means developed carefully.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'Her resolve strengthened after the setback.' What does 'resolve' mean?",
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
                    <p>Passage: 'His tone conveyed reluctance.'</p>
                    <p>Question: What does 'conveyed' mean?</p>
                    <p>Step 1: Context: 'tone' and 'reluctance'.</p>
                    <p>Step 2: Infer: Expressed subtly, not transported.</p>
                    <p>Meaning: 'Conveyed' means communicated.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'She navigated the tricky situation skillfully.' What does 'navigated' mean?",
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
                    <p>Passage: 'He fabricated an excuse to leave early.'</p>
                    <p>Question: What does 'fabricated' mean?</p>
                    <p>Step 1: Context: 'excuse to leave'.</p>
                    <p>Step 2: Infer: Made up, not built physically.</p>
                    <p>Meaning: 'Fabricated' means invented.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The artist infused the painting with emotion.' What does 'infused' mean?",
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
                    <p>Passage: 'Her gaze penetrated his defenses.'</p>
                    <p>Question: What does 'penetrated' mean?</p>
                    <p>Step 1: Context: 'gaze' and 'defenses'.</p>
                    <p>Step 2: Infer: Broke through emotionally, not physically.</p>
                    <p>Meaning: 'Penetrated' means pierced or saw through.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'He relished the challenge of the task.' What does 'relished' mean?",
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
                    <p>Passage: 'The debate eroded their friendship.'</p>
                    <p>Question: What does 'eroded' mean?</p>
                    <p>Step 1: Context: 'debate' and 'friendship'.</p>
                    <p>Step 2: Infer: Wore away, not soil erosion.</p>
                    <p>Meaning: 'Eroded' means diminished.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The plan evolved over months.' What does 'evolved' mean?",
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
                    <p>Passage: 'She exuded confidence in her speech.'</p>
                    <p>Question: What does 'exuded' mean?</p>
                    <p>Step 1: Context: 'confidence' and 'speech'.</p>
                    <p>Step 2: Infer: Radiated or displayed strongly.</p>
                    <p>Meaning: 'Exuded' means showed visibly.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'His words soothed her anxiety.' What does 'soothed' mean?",
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
                    <p>Passage: 'Her words were a dagger to his heart.'</p>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Recognize figure: Not literal stabbing.</p>
                    <p>Step 2: Interpret: Emotionally hurtful.</p>
                    <p>Meaning: Her words caused deep pain.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The news was a breath of fresh air.' What does this mean?",
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
                    <p>Passage: 'He’s a snake in negotiations.'</p>
                    <p>Question: What does 'snake' imply?</p>
                    <p>Step 1: Context: Negotiations.</p>
                    <p>Step 2: Connotation: Sneaky, untrustworthy.</p>
                    <p>Meaning: Deceptive or cunning.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'Her smile was radiant.' What does 'radiant' connote?",
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
                    <p>Passage: 'The storm of criticism battered him.'</p>
                    <p>Question: What does this suggest?</p>
                    <p>Step 1: Figurative: 'Storm' isn’t weather.</p>
                    <p>Step 2: Connotation: Intense, harsh critique.</p>
                    <p>Meaning: He faced overwhelming negativity.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'His temper flared like a wildfire.' What does this mean?",
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
                question: "Passage: 'The city was a jungle of concrete.' What does this mean?",
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
                    <p>Passage: 'Her voice was a melody in the chaos.'</p>
                    <p>Question: What does 'melody' imply?</p>
                    <p>Step 1: Context: 'chaos'.</p>
                    <p>Step 2: Connotation: Soothing, pleasant sound.</p>
                    <p>Meaning: Her voice was comforting.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'He was a rock during the crisis.' What does 'rock' imply?",
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
                    <p>Passage: 'His grin was wolfish in the dim light.'</p>
                    <p>Question: What does 'wolfish' imply?</p>
                    <p>Step 1: Context: 'grin' and 'dim light'.</p>
                    <p>Step 2: Connotation: Predatory, sly.</p>
                    <p>Meaning: His grin was menacing.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'The plan was a house of cards.' What does this mean?",
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
                    <p>Passage: 'The wind whispered through the trees.'</p>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Figurative: Wind doesn’t whisper.</p>
                    <p>Step 2: Interpret: Soft, gentle sound.</p>
                    <p>Meaning: The wind made a quiet noise.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'Her eyes sparkled with hope.' What does 'sparkled' connote?",
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
                    <p>Passage: 'The ruthless policy crushed their hopes.'</p>
                    <p>Question: Why use 'ruthless' and 'crushed'?</p>
                    <p>Step 1: Analyze 'ruthless': Harsh, merciless.</p>
                    <p>Step 2: 'Crushed': Total defeat, emotional weight.</p>
                    <p>Effect: Evokes strong negativity and despair.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "Passage: 'The vibrant festival energized the crowd.' Why use 'vibrant'?",
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
                    <p>Passage: 'We must unite to triumph over adversity.'</p>
                    <p>Question: Why use 'unite' and 'triumph'?</p>
                    <p>Step 1: 'Unite': Suggests collective strength.</p>
                    <p>Step 2: 'Triumph': Victory, inspires action.</p>
                    <p>Effect: Motivates and rallies the reader.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "Passage: 'His plea pierced their apathy.' Why use 'pierced'?",
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
                    <p>Passage: 'The ominous clouds loomed overhead.'</p>
                    <p>Question: Why use 'ominous' and 'loomed'?</p>
                    <p>Step 1: 'Ominous': Threatening, foreboding.</p>
                    <p>Step 2: 'Loomed': Imposing, suspenseful.</p>
                    <p>Effect: Creates a tense, foreboding mood.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "Passage: 'The scandal tarnished his reputation.' Why use 'tarnished'?",
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
                    <p>Passage: 'Her courage shone through the darkness.'</p>
                    <p>Question: Why use 'shone'?</p>
                    <p>Step 1: Context: 'courage' and 'darkness'.</p>
                    <p>Step 2: 'Shone': Bright, standout quality.</p>
                    <p>Effect: Highlights her bravery vividly.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "Passage: 'The speech ignited their passion.' Why use 'ignited'?",
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
                    <p>Passage: 'Amid the chaos, her calm prevailed.'</p>
                    <p>Question: Why use 'prevailed'?</p>
                    <p>Step 1: Context: 'chaos' vs. 'calm'.</p>
                    <p>Step 2: 'Prevailed': Won out, stood firm.</p>
                    <p>Effect: Emphasizes strength over disorder.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "Passage: 'The policy stifled innovation.' Why use 'stifled'?",
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
                    <p>Passage: 'The aroma wafted through the air.'</p>
                    <p>Question: Why use 'wafted'?</p>
                    <p>Step 1: Context: 'aroma'.</p>
                    <p>Step 2: 'Wafted': Gentle, floating movement.</p>
                    <p>Effect: Creates a soft, pleasant sensory image.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "Passage: 'His words thundered across the room.' Why use 'thundered'?",
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
                    <p>Passage: 'Her plea resonated with the audience.'</p>
                    <p>Question: Why use 'resonated'?</p>
                    <p>Step 1: Context: 'plea' and 'audience'.</p>
                    <p>Step 2: 'Resonated': Echoed, struck a chord.</p>
                    <p>Effect: Suggests deep emotional connection.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "Passage: 'The loss shattered their dreams.' Why use 'shattered'?",
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

// Words in Context question arrays
const wordMeaningQuestions = [
    {
        question: "Passage: 'The jovial host welcomed everyone warmly.' What does 'jovial' mean?",
        answers: [
            { text: "A) Cheerful", correct: true },
            { text: "B) Rude", correct: false },
            { text: "C) Shy", correct: false },
            { text: "D) Tired", correct: false }
        ],
        explanation: "'Welcomed warmly' suggests 'jovial' means friendly and happy.",
        difficulty: "easy",
        category: "words-in-context"
    }
];

const nuancedMeaningsQuestions = [
    {
        question: "Passage: 'She navigated the tricky situation skillfully.' What does 'navigated' mean?",
        answers: [
            { text: "A) Managed", correct: true },
            { text: "B) Sailed", correct: false },
            { text: "C) Ignored", correct: false },
            { text: "D) Lost", correct: false }
        ],
        explanation: "In this context, 'navigated' means handled carefully, not literal sailing.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

const figurativeConnotativeQuestions = [
    {
        question: "Passage: 'His temper flared like a wildfire.' What does this mean?",
        answers: [
            { text: "A) His anger grew quickly", correct: true },
            { text: "B) He started a fire", correct: false },
            { text: "C) He was calm", correct: false },
            { text: "D) He liked wildfires", correct: false }
        ],
        explanation: "'Flared like a wildfire' suggests rapid, intense anger figuratively.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

const wordChoiceQuestions = [
    {
        question: "Passage: 'The scandal tarnished his reputation.' Why use 'tarnished'?",
        answers: [
            { text: "A) To imply damage", correct: true },
            { text: "B) To suggest improvement", correct: false },
            { text: "C) To describe cleaning", correct: false },
            { text: "D) To indicate brightness", correct: false }
        ],
        explanation: "'Tarnished' connotes staining or ruining, fitting a scandal’s effect.",
        difficulty: "medium",
        category: "words-in-context"
    }
];

// lesson-words-in-context.js
// Variables
let categoryStats = {
    "words-in-context": { correct: 0, incorrect: 0 }
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
    } else {
        console.log("No more lesson content, proceeding to quiz transition");
        showQuizTransition();
    }
}

// Extract passage from content
function extractPassage(content) {
    const passageMatch = content.match(/Passage:.*?['"].*?['"]/i) || content.match(/<p>Passage:.*?<\/p>/i);
    return passageMatch ? passageMatch[0] : "";
}

// Handle코코Handle answer selection
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
        case 1: return wordMeaningQuestions;
        case 2: return nuancedMeaningsQuestions;
        case 3: return figurativeConnotativeQuestions;
        case 4: return wordChoiceQuestions;
        default: return wordMeaningQuestions;
    }
}

// Show next quiz question
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
        console.log("Quiz complete, showing final score");
        showFinalScore();
    }
}

// Next quiz item
function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
}

// Show final score
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
    if (finalScoreElement) finalScoreElement.classList.add('hide'); // Hide if exists
    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

// Record test results
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
    localStorage.setItem(`words-in-context-lessonScore-${lessonId}`, score);
    console.log(`Saved words-in-context-lessonScore-${lessonId}: ${score}`);
}

// Get score
function getScore(lessonId) {
    return localStorage.getItem(`words-in-context-lessonScore-${lessonId}`) || "Not completed yet";
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