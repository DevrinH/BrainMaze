const passageElement = document.getElementById("passage");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const continueButton = document.getElementById("continue-btn");
const countdownEl = document.getElementById('countdown');
const satIntroContainer = document.getElementById("sat-intro-container");
const startTestButton = document.getElementById("start-test-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {};
let results = localStorage.getItem("testResults");
results = results ? JSON.parse(results) : {};
let refreshIntervalId;
let isMathTest = false;
let time;
let userResponses = [];
let currentModule = 1;
let module1Correct = 0;

const readingWritingQuestions = [
    {
        passage: "Emma stepped into the grand ballroom, her gown brushing against the polished floor as chandeliers cast golden light across the room. The guests moved with ease, their conversations flowing effortlessly. She had imagined this moment countless times, yet standing there now, a strange unease settled in her chest. Adjusting her gloves, she forced a smile and took a hesitant step forward, unsure if she truly belonged.",
        question: "What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "A) She is overwhelmed by the beauty and struggles to contain excitement.", correct: false },
            { text: "B) She is intimidated by the guests and decides to leave.", correct: false },
            { text: "C) She feels out of place despite having anticipated this moment.", correct: true },
            { text: "D) She is eager to impress others and makes a confident entrance.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },
    {
        passage: "Daniel stepped into the office, straightening his tie as he took in the bustling atmosphere. Conversations hummed around him, and the clatter of keyboards filled the air. He had spent weeks preparing for this moment, yet a small knot of doubt twisted in his stomach. He took a deep breath and walked toward his desk, reminding himself that everyone had to start somewhere.",
        question: "What does the passage suggest about Daniel's attitude toward his new job?",
        answers: [
            { text: "A) He is uncertain about his abilities but determined to prove himself.", correct: true },
            { text: "B) He is uninterested and only took the job for financial reasons.", correct: false },
            { text: "C) He is confident he will excel without challenges.", correct: false },
            { text: "D) He regrets accepting the position and considers quitting.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },
    {
        passage: "Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript. Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind. He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.",
        question: "Which choice provides the best evidence for Liam’s uncertainty about his work?",
        answers: [
            { text: "A) 'Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind.'", correct: true },
            { text: "B) 'He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.'", correct: false },
            { text: "C) 'Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript.'", correct: false },
            { text: "D) 'He had imagined this moment countless times, picturing satisfaction.'", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The scientist adjusted her glasses, peering at the data displayed on the screen. The results were unexpected—far different from what she and her team had predicted. She tapped her fingers against the desk, reviewing each calculation. There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.",
        question: "Which sentence best supports the idea that the scientist struggles to accept her findings?",
        answers: [
            { text: "A) 'The scientist adjusted her glasses, peering at the data displayed on the screen.'", correct: false },
            { text: "B) 'She tapped her fingers against the desk, reviewing each calculation.'", correct: false },
            { text: "C) 'The results were unexpected—far different from what she and her team had predicted.'", correct: false },
            { text: "D) 'There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.'", correct: true },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },

    //Command Of Evidence EASY
    {
        passage: "Dr. Patel reviewed the data from her latest experiment, her brow furrowing as the results contradicted her hypothesis. She had spent months refining her methods, yet the numbers refused to align. Sighing, she scribbled a note to recheck the controls, unwilling to accept the outcome just yet.",
        question: "Which detail in the passage best supports the idea that Dr. Patel is persistent?",
        answers: [
            { text: "A) Her brow furrowing as the results contradicted her hypothesis.", correct: false },
            { text: "B) The numbers refused to align.", correct: false },
            { text: "C) She sighed while reviewing the data.", correct: false },
            { text: "D) She had spent months refining her methods.", correct: true },
        ],
        type: "reading",
        difficulty: "easy",
        category: "command of evidence"
    },
    {
        passage: "The explorer trudged through the dense jungle, sweat dripping from his brow as he consulted his worn map. The path had vanished hours ago, but he pressed on, driven by tales of a hidden temple. His boots sank into the mud, yet his eyes gleamed with determination.",
        question: "What evidence from the passage best indicates the explorer’s motivation?",
        answers: [
            { text: "A) Sweat dripping from his brow.", correct: false },
            { text: "B) He pressed on, driven by tales of a hidden temple.", correct: true },
            { text: "C) His boots sank into the mud.", correct: false },
            { text: "D) He consulted his worn map.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "command of evidence"
    },
    {
        passage: "Clara stood at the edge of the stage, her script trembling in her hands. The audience waited in silence, their eyes fixed on her. She had rehearsed for weeks, but now, the words seemed to blur. Taking a deep breath, she began, her voice shaky but growing steadier.",
        question: "Which detail best demonstrates Clara overcoming her initial nervousness?",
        answers: [
            { text: "A) Her script trembling in her hands.", correct: false },
            { text: "B) The audience waited in silence.", correct: false },
            { text: "C) Her voice shaky but growing steadier.", correct: true },
            { text: "D) She had rehearsed for weeks.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "command of evidence"
    },
    {
        passage: "The baker kneaded the dough with practiced hands, flour dusting the air around him. Orders had piled up since dawn, and the oven hummed relentlessly. He paused only to wipe his brow, then returned to his task, determined to finish before the market opened.",
        question: "What evidence best supports the baker’s commitment to his work?",
        answers: [
            { text: "A) Flour dusting the air around him.", correct: false },
            { text: "B) Orders had piled up since dawn.", correct: false },
            { text: "C) He paused only to wipe his brow, then returned to his task.", correct: true },
            { text: "D) The oven hummed relentlessly.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "command of evidence"
    },

    //  Command of Evidence MEDIUM
    {
        passage: "The economist pored over the charts, noting a sharp decline in consumer spending. Critics argued the data was skewed by seasonal trends, but she countered with evidence of a consistent pattern across multiple years. Her findings, though controversial, gained traction among policymakers.",
        question: "Which detail best supports the economist’s credibility in her field?",
        answers: [
            { text: "A) Noting a sharp decline in consumer spending.", correct: false },
            { text: "B) Critics argued the data was skewed by seasonal trends.", correct: false },
            { text: "C) She countered with evidence of a consistent pattern across multiple years.", correct: true },
            { text: "D) Her findings gained traction among policymakers.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command of evidence"
    },
    {
        passage: "The climber gripped the icy ledge, her breath visible in the frigid air. She had trained for this ascent, but the storm’s sudden arrival tested her resolve. Ignoring the wind’s howl, she adjusted her gear and pushed upward, her focus unwavering.",
        question: "What evidence most clearly shows the climber’s resilience?",
        answers: [
            { text: "A) Her breath visible in the frigid air.", correct: false },
            { text: "B) She had trained for this ascent.", correct: false },
            { text: "C) Ignoring the wind’s howl, she pushed upward.", correct: true },
            { text: "D) The storm’s sudden arrival tested her resolve.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command of evidence"
    },
    {
        passage: "The historian sifted through dusty archives, piecing together a timeline from fragmented letters. Many dismissed her theory as speculation, but she pointed to a overlooked correspondence that corroborated her claims. Her peers remained skeptical, yet intrigued.",
        question: "Which detail best strengthens the historian’s argument?",
        answers: [
            { text: "A) Sifted through dusty archives.", correct: false },
            { text: "B) Many dismissed her theory as speculation.", correct: false },
            { text: "C) She pointed to a overlooked correspondence that corroborated her claims.", correct: true },
            { text: "D) Her peers remained skeptical, yet intrigued.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command of evidence"
    },
    {
        passage: "The engineer stared at the blueprint, tracing the lines where the design had failed. Colleagues urged a complete overhaul, but she insisted the flaw was minor, citing stress test results that showed stability. The project deadline loomed, adding pressure to her decision.",
        question: "What evidence best justifies the engineer’s confidence in her design?",
        answers: [
            { text: "A) Tracing the lines where the design had failed.", correct: false },
            { text: "B) Colleagues urged a complete overhaul.", correct: false },
            { text: "C) Citing stress test results that showed stability.", correct: true },
            { text: "D) The project deadline loomed.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command of evidence"
    },

    // Command Of Evidence Hard
    {
        passage: "The biologist examined the samples, perplexed by the inconsistent growth rates across trials. Her team hypothesized contamination, but she rejected this, noting the sterile conditions maintained throughout. Instead, she proposed an untested variable—temperature fluctuations—might explain the anomaly, a theory met with raised eyebrows.",
        question: "Which detail most directly undermines the team’s contamination hypothesis?",
        answers: [
            { text: "A) Inconsistent growth rates across trials.", correct: false },
            { text: "B) She noted the sterile conditions maintained throughout.", correct: true },
            { text: "C) She proposed an untested variable—temperature fluctuations.", correct: false },
            { text: "D) A theory met with raised eyebrows.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "command of evidence"
    },
    {
        passage: "The diplomat navigated the tense negotiations, her words measured as she addressed the assembly. Critics accused her of stalling, but she referenced a prior agreement’s overlooked clause that shifted the discussion. The room fell silent, reevaluating her strategy.",
        question: "What evidence most effectively counters the critics’ accusation of stalling?",
        answers: [
            { text: "A) Her words measured as she addressed the assembly.", correct: false },
            { text: "B) She referenced a prior agreement’s overlooked clause.", correct: true },
            { text: "C) The room fell silent, reevaluating her strategy.", correct: false },
            { text: "D) Critics accused her of stalling.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "command of evidence"
    },
    {
        passage: "The poet scribbled furiously, her notebook filling with fragmented lines. Scholars debated her intent—some saw chaos, others brilliance. She once wrote in a letter that her disorder was deliberate, a mirror to life’s unpredictability, a claim few accepted at face value.",
        question: "Which detail most directly supports the poet’s explanation of her style?",
        answers: [
            { text: "A) Her notebook filling with fragmented lines.", correct: false },
            { text: "B) Scholars debated her intent.", correct: false },
            { text: "C) She once wrote in a letter that her disorder was deliberate.", correct: true },
            { text: "D) A claim few accepted at face value.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "command of evidence"
    },
    {
        passage: "The physicist reviewed the equations, troubled by a discrepancy in the energy outputs. Peers suggested rounding errors, but she dismissed this, pointing to a calibration log that confirmed precision. She theorized an undetected particle, a bold leap that sparked heated debate.",
        question: "What evidence most strongly refutes the peers’ suggestion of rounding errors?",
        answers: [
            { text: "A) Troubled by a discrepancy in the energy outputs.", correct: false },
            { text: "B) Pointing to a calibration log that confirmed precision.", correct: true },
            { text: "C) She theorized an undetected particle.", correct: false },
            { text: "D) A bold leap that sparked heated debate.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "command of evidence"
    },
    // Ceentral Ideas EASY
    {
        passage: "The old lighthouse stood weathered but proud, its beam cutting through the fog each night. Sailors relied on its steady glow, a silent promise of safety amid the rocky coast. Though storms had battered its walls, it remained a symbol of endurance.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) The lighthouse represents resilience in the face of adversity.", correct: true },
            { text: "B) Sailors depend on lighthouses to navigate dangerous waters.", correct: false },
            { text: "C) Storms pose a constant threat to coastal structures.", correct: false },
            { text: "D) The lighthouse’s beauty inspires awe in those who see it.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "central ideas"
    },
    {
        passage: "In the quiet village, the annual harvest festival brought everyone together. Children raced through the fields, while elders shared stories of lean years survived. The celebration was less about the crops and more about the bonds that held the community strong.",
        question: "What is the main idea conveyed by the passage?",
        answers: [
            { text: "A) The festival highlights the importance of community unity.", correct: true },
            { text: "B) Children enjoy the harvest festival more than adults.", correct: false },
            { text: "C) The village relies heavily on successful crop yields.", correct: false },
            { text: "D) Elders use the festival to teach historical lessons.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "central ideas"
    },
    {
        passage: "The inventor toiled in his cluttered workshop, sketches strewn across every surface. Each failed prototype taught him something new, pushing him closer to success. To him, setbacks were not defeats but steps toward innovation.",
        question: "What is the central theme of the passage?",
        answers: [
            { text: "A) The inventor views failure as a necessary part of progress.", correct: true },
            { text: "B) A cluttered workspace fosters creativity.", correct: false },
            { text: "C) Success requires avoiding repeated mistakes.", correct: false },
            { text: "D) The inventor’s sketches are his most valuable asset.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "central ideas"
    },
    {
        passage: "The river wound through the valley, its waters sustaining farms and wildlife alike. Generations had built their lives around it, adapting to its floods and droughts. It was more than a resource—it was the heart of their existence.",
        question: "What is the primary idea of the passage?",
        answers: [
            { text: "A) The river is essential to the valley’s way of life.", correct: true },
            { text: "B) Floods and droughts challenge the valley’s residents.", correct: false },
            { text: "C) Wildlife depends more on the river than humans do.", correct: false },
            { text: "D) The river’s beauty defines the valley’s identity.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "central ideas"
    },

    // Central Ideas MEDIUM
    {
        passage: "The playwright crafted her stories from forgotten histories, breathing life into voices long silenced. Critics praised her vivid characters but missed her deeper intent: to challenge the narratives that shaped society’s memory. Her work was a quiet rebellion against oblivion.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) The playwright seeks to reshape how history is remembered.", correct: true },
            { text: "B) Critics fail to appreciate the depth of the playwright’s characters.", correct: false },
            { text: "C) Forgotten histories inspire the most compelling stories.", correct: false },
            { text: "D) The playwright’s rebellion is misunderstood by society.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "central ideas"
    },
    {
        passage: "The desert stretched endlessly before the nomads, its sands hiding both danger and sustenance. They moved with the seasons, their survival tied to an intimate knowledge of the land. To outsiders, it was a wasteland; to them, a vast, living map.",
        question: "What is the main idea of the passage?",
        answers: [
            { text: "A) The nomads’ survival depends on understanding their environment.", correct: true },
            { text: "B) The desert is more dangerous than it appears to outsiders.", correct: false },
            { text: "C) Seasonal movement defines the nomads’ way of life.", correct: false },
            { text: "D) Outsiders underestimate the desert’s hidden resources.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "central ideas"
    },
    {
        passage: "The librarian curated her collection with care, preserving books others deemed obsolete. She believed stories held power beyond their pages, shaping minds across time. Her small library became a refuge for those seeking wisdom in a distracted world.",
        question: "What is the central theme of the passage?",
        answers: [
            { text: "A) The librarian values the enduring influence of literature.", correct: true },
            { text: "B) Old books are more valuable than modern ones.", correct: false },
            { text: "C) The library serves as a retreat from modern distractions.", correct: false },
            { text: "D) The librarian’s curation skills attract a unique audience.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "central ideas"
    },
    {
        passage: "The climber scaled the peak not for glory, but to confront her own limits. Each step tested her strength and fear, revealing more about herself than the mountain. At the summit, triumph was secondary to the clarity she gained.",
        question: "What is the primary idea of the passage?",
        answers: [
            { text: "A) The climb is a journey of self-discovery for the climber.", correct: true },
            

            { text: "B) The mountain poses a greater challenge than expected.", correct: false },
            { text: "C) Fear prevents most climbers from reaching the summit.", correct: false },
            { text: "D) The view from the summit is worth the effort.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "central ideas"
    },

    // Command of Evidence HARD
    {
        passage: "The philosopher argued that truth is not absolute but a construct shaped by perception. He cited optical illusions, where the mind interprets conflicting images, to suggest reality is negotiated rather than given. His critics countered that some truths—gravity, death—resist reinterpretation.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) The philosopher believes truth is subjective and dependent on perception.", correct: true },
            { text: "B) Optical illusions prove that reality is an illusion.", correct: false },
            { text: "C) Critics disprove the philosopher’s theory with undeniable facts.", correct: false },
            { text: "D) Truth and reality are entirely separate concepts.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "central ideas"
    },
    {
        passage: "The artist painted decay—rotting fruit, wilting flowers—not for morbidity but to capture time’s fleeting nature. Her canvases, vibrant yet somber, suggested that beauty and loss are inseparable. Viewers saw only gloom; she saw life’s fragile pulse.",
        question: "What is the main idea of the passage?",
        answers: [
            { text: "A) The artist portrays the interconnection of beauty and impermanence.", correct: true },
            { text: "B) Viewers misinterpret the artist’s focus on decay.", correct: false },
            { text: "C) Decay is a more compelling subject than vitality.", correct: false },
            { text: "D) The artist’s use of vibrant colors contradicts her theme.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "central ideas"
    },
    {
        passage: "The economist viewed markets as ecosystems, self-regulating yet prone to collapse if imbalances grew unchecked. She compared speculative bubbles to overgrazing, where excess depletes stability. Her model urged restraint, a lesson few heeded until crises struck.",
        question: "What is the central theme of the passage?",
        answers: [
            { text: "A) The economist sees markets as fragile systems requiring balance.", correct: true },
            { text: "B) Speculative bubbles inevitably lead to economic collapse.", correct: false },
            { text: "C) People ignore economic warnings until it’s too late.", correct: false },
            { text: "D) Markets function best without regulation.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "central ideas"
    },
    {
        passage: "The linguist traced language’s evolution, noting how words shift meaning across cultures and eras. She argued that communication is less about fixed definitions and more about shared negotiation, a dance of intent and interpretation. Precision, she claimed, is an illusion.",
        question: "What is the primary idea of the passage?",
        answers: [
            { text: "A) The linguist views language as a fluid, interpretive process.", correct: true },
            { text: "B) Words lose meaning as cultures evolve.", correct: false },
            { text: "C) Communication fails without precise definitions.", correct: false },
            { text: "D) Language evolution reflects cultural superiority.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "central ideas"
    },

    //Inferences 

    // Inferences EASY
    {
        passage: "The farmer surveyed his fields, the dry soil crumbling between his fingers. Rain hadn’t come in weeks, and the crops drooped under the relentless sun. He squinted at the horizon, then turned back to his work with a quiet grunt.",
        question: "What can be inferred about the farmer’s attitude toward the situation?",
        answers: [
            { text: "A) He remains determined despite the drought.", correct: true },
            { text: "B) He is frustrated and ready to abandon his crops.", correct: false },
            { text: "C) He blames himself for the lack of rain.", correct: false },
            { text: "D) He is hopeful that rain will come soon.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },
    {
        passage: "The librarian dusted the shelves, pausing to linger over a worn novel. Patrons rarely checked out these older titles anymore, yet she kept them prominently displayed. A faint smile crossed her face as she moved on.",
        question: "What can be inferred about the librarian’s feelings toward the older books?",
        answers: [
            { text: "A) She values them despite their lack of popularity.", correct: true },
            { text: "B) She finds them outdated and irrelevant.", correct: false },
            { text: "C) She is annoyed that patrons ignore them.", correct: false },
            { text: "D) She plans to replace them with newer titles.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },
    {
        passage: "The runner laced up her shoes, her breath visible in the cold morning air. She’d lost the last race by seconds, a memory that still stung. Today, she stretched longer than usual before starting.",
        question: "What can be inferred about the runner’s approach to this race?",
        answers: [
            { text: "A) She is more thorough in her preparation after her recent loss.", correct: true },
            { text: "B) She is nervous and likely to underperform again.", correct: false },
            { text: "C) She believes the cold weather will slow her down.", correct: false },
            { text: "D) She is indifferent to the outcome of this race.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },
    {
        passage: "The painter stepped back from the canvas, brush in hand, studying the bold strokes. Friends had urged softer colors, but she added another layer of crimson. Her jaw tightened as she worked.",
        question: "What can be inferred about the painter’s response to her friends’ advice?",
        answers: [
            { text: "A) She deliberately rejects it in favor of her own vision.", correct: true },
            { text: "B) She is unsure but follows their suggestions reluctantly.", correct: false },
            { text: "C) She feels pressured to change her style completely.", correct: false },
            { text: "D) She agrees with them but struggles to adjust.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    },

    // Inferences MEDIUM
    {
        passage: "The detective scanned the room, noting the overturned chair and scattered papers. The witness claimed it was an accident, but the broken lock on the window caught his eye. He scribbled a note without a word.",
        question: "What can be inferred about the detective’s view of the witness’s story?",
        answers: [
            { text: "A) He accepts it but wants more details.", correct: false },
            { text: "B) He suspects it may not be entirely truthful.", correct: true },
            { text: "C) He dismisses it as irrelevant to the case.", correct: false },
            { text: "D) He is confused by the conflicting evidence.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },
    {
        passage: "The scientist adjusted her equipment, frowning at the erratic readings. Colleagues had praised her earlier findings, but these anomalies defied explanation. She double-checked her notes, her pen tapping restlessly.",
        question: "What can be inferred about the scientist’s reaction to the new data?",
        answers: [
            { text: "A) She is unsettled and determined to understand the discrepancies.", correct: true },
            { text: "B) She is confident the anomalies will resolve themselves.", correct: false },
            { text: "C) She regrets sharing her earlier findings.", correct: false },
            { text: "D) She blames her equipment for the inconsistencies.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },
    {
        passage: "The merchant haggled fiercely, his voice rising over the market’s din. Customers often walked away, but he never lowered his prices. By day’s end, his stall was half-empty, yet he grinned as he packed up.",
        question: "What can be inferred about the merchant’s business strategy?",
        answers: [
            { text: "A) He prioritizes profit margins over high sales volume.", correct: true },
            { text: "B) He enjoys bargaining more than making sales.", correct: false },
            { text: "C) He expects customers to return despite his high prices.", correct: false },
            { text: "D) He is unaware that his approach drives people away.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },
    {
        passage: "The teacher paced the classroom, her gaze lingering on the quiet student in the back. His assignments were flawless, yet he never spoke up. She assigned him a solo project, watching him closely.",
        question: "What can be inferred about the teacher’s perception of the student?",
        answers: [
            { text: "A) She believes he has potential that he doesn’t fully express.", correct: true },
            { text: "B) She thinks he is disengaged and needs motivation.", correct: false },
            { text: "C) She is frustrated by his lack of participation.", correct: false },
            { text: "D) She assumes he struggles with group work.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },

    // Inferences HARD
    {
        passage: "The diplomat smiled thinly, her words polite but clipped as she addressed the council. Tensions had risen after the failed talks, and her counterparts shifted uneasily. She proposed a compromise no one expected.",
        question: "What can be inferred about the diplomat’s strategy in this situation?",
        answers: [
            { text: "A) She uses an unexpected tactic to regain control amid strained relations.", correct: true },
            { text: "B) She is desperate to appease her counterparts.", correct: false },
            { text: "C) She hides her frustration to maintain appearances.", correct: false },
            { text: "D) She intends to escalate tensions further.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference"
    },
    {
        passage: "The poet scribbled in the margins, her lines jagged and incomplete. Readers praised her raw emotion, but she burned half her drafts. In a rare interview, she called perfection a cage.",
        question: "What can be inferred about the poet’s creative process?",
        answers: [
            { text: "A) She embraces imperfection as a core part of her artistry.", correct: true },
            { text: "B) She struggles with self-doubt despite external praise.", correct: false },
            { text: "C) She destroys work she deems too emotional.", correct: false },
            { text: "D) She seeks approval through her unfinished drafts.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference"
    },
    {
        passage: "The engineer tested the prototype, its hum steady but weaker than planned. Investors pressed for results, yet she delayed the demonstration. Later, she tweaked a single gear with meticulous care.",
        question: "What can be inferred about the engineer’s priorities?",
        answers: [
            { text: "A) She values precision over meeting external deadlines.", correct: true },
            { text: "B) She fears the prototype will fail under scrutiny.", correct: false },
            { text: "C) She is indifferent to the investors’ demands.", correct: false },
            { text: "D) She delays to impress with a dramatic reveal.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference"
    },
    {
        passage: "The historian sifted through fragments, her notes dense with cross-references. Colleagues favored broad narratives, but she lingered on a single, obscure letter. Her latest paper upended a decades-old theory.",
        question: "What can be inferred about the historian’s approach to her work?",
        answers: [
            { text: "A) She uncovers significant insights through meticulous detail.", correct: true },
            { text: "B) She rejects traditional methods to stand out.", correct: false },
            { text: "C) She focuses on obscure details to confuse her peers.", correct: false },
            { text: "D) She struggles to align her findings with broader trends.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference"
    },

    //Words in Context EASY

    // Mildly Hard Questions
    {
        passage: "The chef inspected the dish, her brow furrowed as she tasted the sauce. It lacked the zest she’d envisioned, so she reached for a pinch of spice to elevate the flavor. Satisfied, she nodded and moved on.",
        question: "As used in the passage, what does 'elevate' most nearly mean?",
        answers: [
            { text: "A) Improve", correct: true },
            { text: "B) Lift", correct: false },
            { text: "C) Celebrate", correct: false },
            { text: "D) Examine", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "words in context"
    },
    {
        passage: "The hiker trudged up the steep trail, her legs aching from the ascent. At the summit, she paused to survey the vast landscape below. The view was a fitting reward for her effort.",
        question: "As used in the passage, what does 'survey' most nearly mean?",
        answers: [
            { text: "A) Observe", correct: true },
            { text: "B) Measure", correct: false },
            { text: "C) Question", correct: false },
            { text: "D) Explore", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "words in context"
    },
    {
        passage: "The writer scribbled notes in a frenzy, her ideas spilling onto the page. Later, she would refine the chaos into a polished draft. For now, she let her thoughts run wild.",
        question: "As used in the passage, what does 'refine' most nearly mean?",
        answers: [
            { text: "A) Perfect", correct: true },
            { text: "B) Reduce", correct: false },
            { text: "C) Rewrite", correct: false },
            { text: "D) Restrict", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "words in context"
    },
    {
        passage: "The gardener pruned the overgrown bushes, her shears slicing through tangled branches. She aimed to restore order to the neglected yard. By noon, the space looked revitalized.",
        question: "As used in the passage, what does 'restore' most nearly mean?",
        answers: [
            { text: "A) Reestablish", correct: true },
            { text: "B) Repair", correct: false },
            { text: "C) Replace", correct: false },
            { text: "D) Redesign", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "words in context"
    },

    // Words in Contect MEDIUM
    {
        passage: "The professor delivered her lecture with authority, her voice cutting through the room’s murmur. She didn’t just recite facts; she illuminated complex theories with clarity. Students scribbled notes, captivated.",
        question: "As used in the passage, what does 'illuminated' most nearly mean?",
        answers: [
            { text: "A) Explained", correct: true },
            { text: "B) Brightened", correct: false },
            { text: "C) Criticized", correct: false },
            { text: "D) Decorated", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "words in context"
    },
    {
        passage: "The politician navigated the debate with skill, deflecting tough questions with ease. Her opponents grew flustered, unable to penetrate her composed demeanor. She emerged unscathed.",
        question: "As used in the passage, what does 'penetrate' most nearly mean?",
        answers: [
            { text: "A) Break through", correct: true },
            { text: "B) Understand", correct: false },
            { text: "C) Enter", correct: false },
            { text: "D) Challenge", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "words in context"
    },
    {
        passage: "The architect pored over the blueprints, tracing lines that fused form and function. Critics had dismissed the design as impractical, but she saw it as a bold synthesis of art and utility. Construction began soon after.",
        question: "As used in the passage, what does 'synthesis' most nearly mean?",
        answers: [
            { text: "A) Combination", correct: true },
            { text: "B) Analysis", correct: false },
            { text: "C) Simplification", correct: false },
            { text: "D) Separation", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "words in context"
    },
    {
        passage: "The musician improvised on stage, her fingers dancing across the keys. The melody swelled, defying the rigid structure of the original score. The audience leaned forward, entranced.",
        question: "As used in the passage, what does 'defying' most nearly mean?",
        answers: [
            { text: "A) Resisting", correct: true },
            { text: "B) Destroying", correct: false },
            { text: "C) Defining", correct: false },
            { text: "D) Delaying", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "words in context"
    },

    // Words in Context HARD
    {
        passage: "The philosopher grappled with the paradox, her mind wrestling with its implications. Truth, she argued, often eludes rigid definitions, slipping through the grasp of language. Her treatise left readers pondering.",
        question: "As used in the passage, what does 'eludes' most nearly mean?",
        answers: [
            { text: "A) Evades", correct: true },
            { text: "B) Confuses", correct: false },
            { text: "C) Reveals", correct: false },
            { text: "D) Enhances", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "words in context"
    },
    {
        passage: "The scientist scrutinized the data, her hypothesis teetering on the edge of collapse. A single outlier could undermine years of research, rendering her conclusions suspect. She adjusted her model with caution.",
        question: "As used in the passage, what does 'undermine' most nearly mean?",
        answers: [
            { text: "A) Weaken", correct: true },
            { text: "B) Overturn", correct: false },
            { text: "C) Underestimate", correct: false },
            { text: "D) Underline", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "words in context"
    },
    {
        passage: "The poet wielded words with precision, each line imbued with layers of meaning. Critics lauded her ambiguity, a quality that invited endless interpretation. Her verses lingered in the mind.",
        question: "As used in the passage, what does 'imbued' most nearly mean?",
        answers: [
            { text: "A) Infused", correct: true },
            { text: "B) Hidden", correct: false },
            { text: "C) Imitated", correct: false },
            { text: "D) Inspired", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "words in context"
    },
    {
        passage: "The historian excavated the archives, unearthing letters that recast a familiar narrative. Her peers resisted, clinging to entrenched views despite the evidence. She pressed on, undeterred.",
        question: "As used in the passage, what does 'entrenched' most nearly mean?",
        answers: [
            { text: "A) Deeply established", correct: true },
            { text: "B) Confused", correct: false },
            { text: "C) Entrapped", correct: false },
            { text: "D) Enriched", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "words in context"
    },

    //Text Structure 
    // EASY
    {
        passage: "The old bridge creaked under the weight of passing trucks. Built decades ago, it had served the town well, but cracks now spiderwebbed its supports. Engineers arrived last week to assess the damage. Their report will determine its fate.",
        question: "What is the primary purpose of the passage?",
        answers: [
            { text: "A) To describe the condition of an aging bridge and its current evaluation", correct: true },
            { text: "B) To argue for the replacement of an outdated bridge", correct: false },
            { text: "C) To explain how engineers assess structural damage", correct: false },
            { text: "D) To highlight the history of a town’s infrastructure", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The festival began with a burst of color—parades winding through the streets. Vendors sold trinkets, and musicians played late into the night. By morning, the town was quiet again, the celebration a fleeting memory.",
        question: "How is the passage primarily structured?",
        answers: [
            { text: "A) Chronologically, detailing the progression of a festival", correct: true },
            { text: "B) By comparing the festival to other town events", correct: false },
            { text: "C) Through a problem-solution framework about noise", correct: false },
            { text: "D) Spatially, describing different festival locations", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    {
        passage: "Rainforests teem with life, from towering trees to tiny insects. Deforestation, however, threatens this biodiversity. Logging clears vast areas, leaving animals homeless. Conservationists urge sustainable practices to protect these ecosystems.",
        question: "What is the main purpose of the passage?",
        answers: [
            { text: "A) To outline the impact of deforestation on rainforests and advocate for conservation", correct: true },
            { text: "B) To detail the variety of species in rainforests", correct: false },
            { text: "C) To criticize logging companies for their practices", correct: false },
            { text: "D) To explain how conservationists study ecosystems", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The recipe starts with simple ingredients: flour, water, yeast. Knead the dough until smooth, then let it rise. Bake at 400 degrees for a golden crust. The result is a loaf both rustic and satisfying.",
        question: "How is the passage primarily structured?",
        answers: [
            { text: "A) Sequentially, providing steps to bake bread", correct: true },
            { text: "B) By comparing different baking techniques", correct: false },
            { text: "C) Through a cause-and-effect analysis of ingredients", correct: false },
            { text: "D) Descriptively, focusing on the loaf’s qualities", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },

    // Text Structure MEDIUM 
    {
        passage: "The explorer’s journal begins with optimism: vast plains stretched before her, ripe for discovery. Midway, the tone shifts—harsh winds and scarce food test her resolve. By the end, she reflects on resilience gained through hardship.",
        question: "How is the passage primarily structured?",
        answers: [
            { text: "A) Chronologically, tracing the explorer’s emotional journey", correct: true },
            { text: "B) Thematically, focusing on resilience in exploration", correct: false },
            { text: "C) By contrasting the plains with other landscapes", correct: false },
            { text: "D) Through a problem-solution lens of survival", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    {
        passage: "Urban sprawl has reshaped cities, often at a cost. Traffic clogs highways, and green spaces vanish. Yet some planners see opportunity: mixed-use developments can curb these issues. The debate continues over growth’s true price.",
        question: "What is the primary purpose of the passage?",
        answers: [
            { text: "A) To examine the effects of urban sprawl and present a potential solution", correct: true },
            { text: "B) To argue against the expansion of cities", correct: false },
            { text: "C) To describe the history of urban planning", correct: false },
            { text: "D) To critique planners’ optimism about development", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The novel opens with a murder, gripping readers instantly. Clues unfold across chapters, each revelation twisting the plot. The final page delivers a surprise, upending earlier assumptions.",
        question: "How is the passage primarily structured?",
        answers: [
            { text: "A) Sequentially, following the unfolding of a mystery", correct: true },
            { text: "B) By comparing different characters’ perspectives", correct: false },
            { text: "C) Through a cause-and-effect analysis of the murder", correct: false },
            { text: "D) Descriptively, focusing on the novel’s tone", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },
    {
        passage: "Climate change accelerates, driven by emissions. Scientists warn of rising seas and shrinking ice caps. Solutions exist—renewable energy, reforestation—but adoption lags. The stakes, they say, could not be higher.",
        question: "What is the main purpose of the passage?",
        answers: [
            { text: "A) To highlight climate change’s consequences and urge action", correct: true },
            { text: "B) To explain the science behind rising sea levels", correct: false },
            { text: "C) To criticize the slow adoption of renewable energy", correct: false },
            { text: "D) To compare climate change to other global issues", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "text-structure-and-purpose"
    },

    // Extremely Hard Questions
    {
        passage: "The essay starts with a paradox: freedom restricts us. It weaves through philosophy, citing Locke and Rousseau, then pivots to modern surveillance. The conclusion ties both eras, questioning liberty’s cost.",
        question: "How is the passage primarily structured?",
        answers: [
            { text: "A) Thematically, exploring freedom across time with philosophical support", correct: true },
            { text: "B) Chronologically, tracing the history of liberty", correct: false },
            { text: "C) By contrasting philosophical and modern views", correct: false },
            { text: "D) Through a problem-solution framework for surveillance", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "text-structure-and-purpose"
    },
    {
        passage: "Poetry, she writes, mirrors life’s chaos. Her first stanza evokes joy, the next despair, each shift deliberate. Critics miss this intent, fixating on form. She aims to unsettle, not soothe.",
        question: "What is the primary purpose of the passage?",
        answers: [
            { text: "A) To convey the poet’s goal of reflecting life’s complexity through shifting tones", correct: true },
            { text: "B) To critique critics’ focus on poetic form", correct: false },
            { text: "C) To explain how poetry mirrors everyday experiences", correct: false },
            { text: "D) To argue for emotional variety in poetry", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The study lists data: species decline, habitat loss. Then it shifts, weaving a narrative of a single bird’s struggle. Numbers return, paired with policy suggestions. It ends on a question—can we act in time?",
        question: "How is the passage primarily structured?",
        answers: [
            { text: "A) By blending data and narrative to engage and persuade", correct: true },
            { text: "B) Sequentially, detailing species decline over time", correct: false },
            { text: "C) Through a cause-and-effect analysis of habitat loss", correct: false },
            { text: "D) Descriptively, focusing on the bird’s plight", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "text-structure-and-purpose"
    },
    {
        passage: "History, he argues, is no straight line. Events loop and fracture—wars echo across centuries. He cites Rome, then skips to the Cold War, linking patterns. His goal: to disrupt tidy timelines.",
        question: "What is the main purpose of the passage?",
        answers: [
            { text: "A) To challenge linear views of history with interconnected examples", correct: true },
            { text: "B) To compare ancient and modern conflicts", correct: false },
            { text: "C) To trace the evolution of historical patterns", correct: false },
            { text: "D) To critique oversimplified historical narratives", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "text-structure-and-purpose"
    },

    //Cross Text Connections 
    // EASY 
    {
        passage: "Passage 1: The town’s library was a relic, its shelves lined with dusty books. Few visited, but the librarian kept it open, believing in its quiet value. Passage 2: The new community center buzzed with activity—workshops, games, and chatter. Residents flocked to its bright, modern space.",
        question: "How do the two passages differ in their portrayal of community spaces?",
        answers: [
            { text: "A) Passage 1 depicts a quiet, underused space, while Passage 2 shows a lively, popular one.", correct: true },
            { text: "B) Passage 1 focuses on books, while Passage 2 emphasizes workshops.", correct: false },
            { text: "C) Passage 1 criticizes the librarian, while Passage 2 praises the residents.", correct: false },
            { text: "D) Passage 1 highlights modernity, while Passage 2 values tradition.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The forest trail was serene, with birdsong filling the air. Hikers moved slowly, savoring the calm. Passage 2: The mountain path was rugged, wind whipping through the cliffs. Climbers pushed hard, chasing the thrill of the summit.",
        question: "What is a key difference in how the passages describe outdoor experiences?",
        answers: [
            { text: "A) Passage 1 emphasizes tranquility, while Passage 2 highlights challenge.", correct: true },
            { text: "B) Passage 1 focuses on wildlife, while Passage 2 describes weather.", correct: false },
            { text: "C) Passage 1 portrays hikers as lazy, while Passage 2 sees climbers as brave.", correct: false },
            { text: "D) Passage 1 values nature’s beauty, while Passage 2 ignores it.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The baker worked alone, kneading dough in silence. His bread was simple but cherished. Passage 2: The chef commanded a bustling kitchen, directing a team to craft elaborate dishes. Her restaurant drew crowds.",
        question: "How do the passages contrast the approaches to food preparation?",
        answers: [
            { text: "A) Passage 1 shows a solitary, simple process, while Passage 2 depicts a collaborative, complex one.", correct: true },
            { text: "B) Passage 1 values tradition, while Passage 2 focuses on innovation.", correct: false },
            { text: "C) Passage 1 criticizes the baker, while Passage 2 admires the chef.", correct: false },
            { text: "D) Passage 1 describes bread, while Passage 2 details restaurant management.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The festival featured folk music, a nod to the town’s roots. Attendees swayed to familiar tunes. Passage 2: The concert showcased experimental beats, pushing boundaries. Listeners marveled at the bold sounds.",
        question: "What is a primary difference in how the passages portray musical events?",
        answers: [
            { text: "A) Passage 1 emphasizes tradition, while Passage 2 highlights innovation.", correct: true },
            { text: "B) Passage 1 focuses on dancing, while Passage 2 describes listening.", correct: false },
            { text: "C) Passage 1 portrays a small event, while Passage 2 depicts a large one.", correct: false },
            { text: "D) Passage 1 admires the music, while Passage 2 critiques it.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "cross-text-connections"
    },

    // Cross-Text MEDIUM 
    {
        passage: "Passage 1: The scientist recorded data methodically, trusting repeated trials to reveal truth. Precision was her cornerstone. Passage 2: The researcher embraced uncertainty, arguing that anomalies often spark breakthroughs. She valued intuition.",
        question: "How do the passages differ in their views on scientific discovery?",
        answers: [
            { text: "A) Passage 1 prioritizes systematic accuracy, while Passage 2 values creative insight.", correct: true },
            { text: "B) Passage 1 focuses on data, while Passage 2 emphasizes experiments.", correct: false },
            { text: "C) Passage 1 distrusts anomalies, while Passage 2 ignores precision.", correct: false },
            { text: "D) Passage 1 admires repetition, while Passage 2 rejects it outright.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The mayor touted new roads, claiming they’d boost trade. He cited economic projections. Passage 2: The activist warned of sprawl, noting lost farmland and traffic woes. She pointed to local surveys.",
        question: "What is a key difference in how the passages approach urban development?",
        answers: [
            { text: "A) Passage 1 sees it as economically beneficial, while Passage 2 views it as environmentally harmful.", correct: true },
            { text: "B) Passage 1 uses data, while Passage 2 relies on opinions.", correct: false },
            { text: "C) Passage 1 focuses on trade, while Passage 2 discusses traffic.", correct: false },
            { text: "D) Passage 1 supports progress, while Passage 2 favors stagnation.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The poet crafted structured verse, finding freedom in rhyme. Order shaped her art. Passage 2: The writer scribbled freeform lines, rejecting rules as stifling. Chaos fueled her voice.",
        question: "How do the passages contrast attitudes toward artistic expression?",
        answers: [
            { text: "A) Passage 1 embraces structure as liberating, while Passage 2 sees it as restrictive.", correct: true },
            { text: "B) Passage 1 values rhyme, while Passage 2 prefers prose.", correct: false },
            { text: "C) Passage 1 admires discipline, while Passage 2 critiques creativity.", correct: false },
            { text: "D) Passage 1 focuses on form, while Passage 2 emphasizes content.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The teacher drilled facts, preparing students for tests. Mastery meant recall. Passage 2: The mentor posed questions, pushing learners to think critically. Understanding trumped memorization.",
        question: "What is a primary difference in how the passages depict education?",
        answers: [
            { text: "A) Passage 1 focuses on rote learning, while Passage 2 prioritizes critical thinking.", correct: true },
            { text: "B) Passage 1 emphasizes tests, while Passage 2 discusses questions.", correct: false },
            { text: "C) Passage 1 values teachers, while Passage 2 favors mentors.", correct: false },
            { text: "D) Passage 1 supports structure, while Passage 2 rejects all guidance.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "cross-text-connections"
    },

    // Cross Text HARD
    {
        passage: "Passage 1: The historian traced events linearly, arguing that progress builds on the past. Causality was key. Passage 2: The philosopher saw history as cyclical, with patterns repeating across eras. Time looped, not climbed.",
        question: "How do the passages differ in their conceptualization of history?",
        answers: [
            { text: "A) Passage 1 views it as a progressive sequence, while Passage 2 sees it as a recurring cycle.", correct: true },
            { text: "B) Passage 1 focuses on events, while Passage 2 examines eras.", correct: false },
            { text: "C) Passage 1 values facts, while Passage 2 relies on theories.", correct: false },
            { text: "D) Passage 1 supports change, while Passage 2 denies progress.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The economist praised markets, claiming competition drives efficiency. Self-regulation worked. Passage 2: The sociologist critiqued capitalism, arguing it widens inequality. Oversight was essential.",
        question: "What is a key difference in how the passages evaluate economic systems?",
        answers: [
            { text: "A) Passage 1 sees markets as naturally effective, while Passage 2 views them as flawed and needing control.", correct: true },
            { text: "B) Passage 1 focuses on competition, while Passage 2 discusses wealth.", correct: false },
            { text: "C) Passage 1 admires efficiency, while Passage 2 ignores it.", correct: false },
            { text: "D) Passage 1 supports freedom, while Passage 2 favors socialism.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The biologist studied adaptation, noting species evolve through gradual shifts. Stability mattered. Passage 2: The ecologist tracked disruptions, asserting crises spur rapid change. Upheaval drove evolution.",
        question: "How do the passages contrast theories of evolution?",
        answers: [
            { text: "A) Passage 1 emphasizes slow, steady adaptation, while Passage 2 highlights rapid change from disturbance.", correct: true },
            { text: "B) Passage 1 focuses on species, while Passage 2 examines ecosystems.", correct: false },
            { text: "C) Passage 1 values consistency, while Passage 2 rejects science.", correct: false },
            { text: "D) Passage 1 supports evolution, while Passage 2 denies it.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "cross-text-connections"
    },
    {
        passage: "Passage 1: The critic lauded art for its beauty, a mirror to human ideals. Aesthetics reigned. Passage 2: The theorist saw art as a tool, revealing power and struggle. Meaning outweighed form.",
        question: "What is a primary difference in how the passages interpret art’s purpose?",
        answers: [
            { text: "A) Passage 1 views it as an expression of beauty, while Passage 2 sees it as a reflection of societal dynamics.", correct: true },
            { text: "B) Passage 1 focuses on form, while Passage 2 discusses content.", correct: false },
            { text: "C) Passage 1 admires artists, while Passage 2 critiques them.", correct: false },
            { text: "D) Passage 1 values ideals, while Passage 2 ignores beauty.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "cross-text-connections"
    },

    //Transitions
    // EASY
    {
        passage: "The storm hit late at night, flooding the streets. _____, residents woke to find their homes surrounded by water. They began sandbagging doors to limit the damage.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) As a result", correct: true },
            { text: "B) For example", correct: false },
            { text: "C) In contrast", correct: false },
            { text: "D) Meanwhile", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "transitions"
    },
    {
        passage: "The team practiced daily, perfecting their routine. _____, their efforts paid off with a flawless performance at the competition.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) Consequently", correct: true },
            { text: "B) However", correct: false },
            { text: "C) On the other hand", correct: false },
            { text: "D) Similarly", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "transitions"
    },
    {
        passage: "The garden thrived in spring, bursting with color. _____, summer brought drought, and the plants began to wilt.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) However", correct: true },
            { text: "B) In addition", correct: false },
            { text: "C) Therefore", correct: false },
            { text: "D) Likewise", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "transitions"
    },
    {
        passage: "The recipe called for fresh herbs to enhance flavor. _____, dried herbs could work if fresh ones weren’t available.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) Alternatively", correct: true },
            { text: "B) Because", correct: false },
            { text: "C) Thus", correct: false },
            { text: "D) Moreover", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "transitions"
    },

    // Transitions MEDIUM
    {
        passage: "The experiment yielded consistent results over weeks. _____, a sudden equipment malfunction threw the data into question.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) Nevertheless", correct: true },
            { text: "B) In fact", correct: false },
            { text: "C) As a result", correct: false },
            { text: "D) Likewise", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "transitions"
    },
    {
        passage: "The city planned a new park to boost recreation. _____, budget cuts forced officials to scale back the project.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) Unfortunately", correct: true },
            { text: "B) Similarly", correct: false },
            { text: "C) For instance", correct: false },
            { text: "D) Therefore", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "transitions"
    },
    {
        passage: "The novel’s early chapters built suspense slowly. _____, the climax delivered a rapid series of twists that stunned readers.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) By contrast", correct: true },
            { text: "B) In addition", correct: false },
            { text: "C) Because", correct: false },
            { text: "D) Meanwhile", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "transitions"
    },
    {
        passage: "The runner trained hard to improve her speed. _____, she adjusted her diet to increase endurance for the race.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) Furthermore", correct: true },
            { text: "B) On the contrary", correct: false },
            { text: "C) Thus", correct: false },
            { text: "D) Otherwise", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "transitions"
    },

    // Transitions HARD
    {
        passage: "The theory relied on stable conditions to hold true. _____, real-world variables like weather often disrupted its predictions, challenging its validity.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) In practice", correct: true },
            { text: "B) For example", correct: false },
            { text: "C) Consequently", correct: false },
            { text: "D) Likewise", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "transitions"
    },
    {
        passage: "Critics praised the film’s visuals as groundbreaking. _____, they debated its narrative, unsure if style masked a weak plot.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) Conversely", correct: true },
            { text: "B) In addition", correct: false },
            { text: "C) Therefore", correct: false },
            { text: "D) Similarly", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "transitions"
    },
    {
        passage: "The poet aimed for clarity in her early work. _____, her later verses embraced ambiguity, reflecting life’s complexity.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) In contrast", correct: true },
            { text: "B) As a result", correct: false },
            { text: "C) Meanwhile", correct: false },
            { text: "D) Moreover", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "transitions"
    },
    {
        passage: "The policy aimed to reduce emissions through strict rules. _____, industries lobbied for flexibility, citing economic pressures that demanded compromise.",
        question: "Which transition best fits the blank?",
        answers: [
            { text: "A) On the other hand", correct: true },
            { text: "B) Because", correct: false },
            { text: "C) Thus", correct: false },
            { text: "D) In fact", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "transitions"
    },

    //Rhetorical Synthesis 
    // EASY
    {
        passage: "Notes: City council proposes a new park. Goals: improve recreation, attract tourists. Features: playground, walking trails, picnic areas. Budget: $500,000. Public feedback: mostly positive, some concern about cost.",
        question: "The council needs a sentence for a press release to emphasize the park’s benefits. Which option best achieves this?",
        answers: [
            { text: "A) The new park will offer playgrounds, trails, and picnic areas to enhance recreation and draw visitors.", correct: true },
            { text: "B) Costing $500,000, the park has sparked some debate over its funding.", correct: false },
            { text: "C) Public feedback on the park has been mixed, with cost concerns noted.", correct: false },
            { text: "D) The council is reviewing a $500,000 plan for a park with various features.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    },
    {
        passage: "Notes: School launches recycling program. Aims: reduce waste, educate students. Methods: bins in classrooms, weekly lessons. Results so far: 20% less trash. Challenges: student participation varies.",
        question: "The school wants a sentence for a newsletter to highlight the program’s success. Which option best achieves this?",
        answers: [
            { text: "A) The recycling program has cut school trash by 20% through bins and lessons.", correct: true },
            { text: "B) Student participation in recycling remains inconsistent despite efforts.", correct: false },
            { text: "C) The school is tackling waste with bins and lessons in a new program.", correct: false },
            { text: "D) Challenges persist in getting all students to join the recycling effort.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    },
    {
        passage: "Notes: Local bakery expands. Reasons: rising demand, new location. Offerings: cakes, bread, coffee. Staff: hiring 5 more workers. Timeline: opens next month.",
        question: "The bakery needs a sentence for an ad to announce the expansion’s appeal. Which option best achieves this?",
        answers: [
            { text: "A) Due to growing demand, our bakery will open a new spot next month with cakes, bread, and coffee.", correct: true },
            { text: "B) The bakery is hiring five workers for its expansion next month.", correct: false },
            { text: "C) A new location is set to open as the bakery grows its staff.", correct: false },
            { text: "D) Next month, the bakery will expand to meet demand with a bigger team.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "rhetorical-ynthesis"
    },
    {
        passage: "Notes: Community garden project. Purpose: grow food, build bonds. Participants: 30 volunteers. Output: 200 lbs of produce last year. Future: add composting next season.",
        question: "The organizers want a sentence for a flyer to promote the garden’s community impact. Which option best achieves this?",
        answers: [
            { text: "A) With 30 volunteers, the garden grew 200 lbs of food last year, strengthening community ties.", correct: true },
            { text: "B) The garden plans to start composting next season with volunteer help.", correct: false },
            { text: "C) Last year, 200 lbs of produce came from the efforts of 30 gardeners.", correct: false },
            { text: "D) The community garden relies on 30 participants to grow food annually.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "rhetorical-synthesis"
    },

    // Rhetorical Synthesis MEDIUM
    {
        passage: "Notes: Tech startup develops app. Focus: mental health support. Features: meditation, mood tracking, therapist chat. Target: young adults. Reception: praised for accessibility, some note privacy risks.",
        question: "The startup needs a sentence for a pitch to emphasize the app’s value to its audience. Which option best achieves this?",
        answers: [
            { text: "A) Aimed at young adults, our app offers meditation, mood tracking, and therapist chats for accessible mental health support.", correct: true },
            { text: "B) The app, praised for accessibility, also raises privacy concerns among some users.", correct: false },
            { text: "C) Young adults can use our app’s features despite noted privacy risks.", correct: false },
            { text: "D) Our startup’s app includes tools like meditation and a therapist chat option.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    {
        passage: "Notes: City installs solar panels. Goals: cut emissions, save costs. Scale: 50 buildings. Savings: $100,000 projected annually. Obstacles: high initial cost, weather dependency.",
        question: "The city wants a sentence for a report to highlight the initiative’s environmental and financial benefits. Which option best achieves this?",
        answers: [
            { text: "A) Solar panels on 50 buildings aim to reduce emissions and save $100,000 yearly.", correct: true },
            { text: "B) Despite high costs and weather issues, the city projects $100,000 in savings.", correct: false },
            { text: "C) The city’s 50 solar-paneled buildings face installation and weather challenges.", correct: false },
            { text: "D) Solar panels will cut costs by $100,000 annually once obstacles are overcome.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    {
        passage: "Notes: Museum hosts art exhibit. Theme: climate change. Displays: paintings, sculptures, interactive pieces. Attendance: 5,000 visitors in first month. Feedback: engaging, some call it preachy.",
        question: "The museum needs a sentence for a blog to showcase the exhibit’s appeal and impact. Which option best achieves this?",
        answers: [
            { text: "A) The climate change exhibit, with paintings and interactive pieces, drew 5,000 engaged visitors in its first month.", correct: true },
            { text: "B) Some found the exhibit preachy, though 5,000 visited in a month.", correct: false },
            { text: "C) Featuring sculptures and more, the exhibit explores climate change themes.", correct: false },
            { text: "D) The museum’s new show saw 5,000 attendees despite mixed reviews.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },
    {
        passage: "Notes: Nonprofit aids refugees. Services: housing, job training, language classes. Reach: 200 families last year. Funding: grants, donations. Need: more volunteers.",
        question: "The nonprofit wants a sentence for a donor appeal to underscore its support for refugees. Which option best achieves this?",
        answers: [
            { text: "A) Last year, we provided housing, job training, and language classes to 200 refugee families with your support.", correct: true },
            { text: "B) Funded by grants and donations, we need more volunteers to help refugees.", correct: false },
            { text: "C) Our services reached 200 families, but volunteer shortages persist.", correct: false },
            { text: "D) We offer refugees housing and training, relying on donor generosity.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "rhetorical-synthesis"
    },

    // Rhetorical Synthesis HARD
    {
        passage: "Notes: Research team studies urban heat. Findings: green roofs cool cities, reduce energy use. Data: 5°C drop, 15% less power. Context: climate change worsens heat waves. Limitation: installation costs high.",
        question: "The team needs a sentence for a journal abstract to emphasize the study’s relevance to climate challenges. Which option best achieves this?",
        answers: [
            { text: "A) As climate change intensifies heat waves, our study shows green roofs lower urban temperatures by 5°C and cut energy use by 15%.", correct: true },
            { text: "B) Green roofs reduce power by 15%, though high costs limit their use.", correct: false },
            { text: "C) We found a 5°C temperature drop with green roofs despite installation challenges.", correct: false },
            { text: "D) Our research on urban heat highlights green roofs’ cooling effect.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "rhetorical-synthesis"
    },
    {
        passage: "Notes: Company tests self-driving cars. Purpose: improve safety, efficiency. Tech: sensors, AI navigation. Trials: 90% success rate over 10,000 miles. Concerns: ethics of AI decisions, job loss fears.",
        question: "The company needs a sentence for a press kit to stress the technology’s potential benefits. Which option best achieves this?",
        answers: [
            { text: "A) Our self-driving cars, with sensors and AI, achieved a 90% success rate over 10,000 miles, promising safer and more efficient roads.", correct: true },
            { text: "B) Though AI ethics raise concerns, our cars succeeded in 90% of trials.", correct: false },
            { text: "C) Over 10,000 miles, our technology showed efficiency despite job loss fears.", correct: false },
            { text: "D) Sensors and AI navigation yielded a 90% success rate in our trials.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "rhetorical-synthesis"
    },
    {
        passage: "Notes: Policy proposes carbon tax. Aims: lower emissions, fund green tech. Impact: 10% emissions drop predicted. Opposition: businesses cite profit loss. Support: environmentalists endorse revenue use.",
        question: "The policymakers need a sentence for a speech to advocate the tax’s dual benefits. Which option best achieves this?",
        answers: [
            { text: "A) The carbon tax could cut emissions by 10% while generating funds for green technology, tackling climate change on two fronts.", correct: true },
            { text: "B) Despite business pushback, the tax may reduce emissions by 10%.", correct: false },
            { text: "C) Environmentalists back the tax for its revenue, projected to aid tech.", correct: false },
            { text: "D) A 10% emissions drop is possible, though profits may suffer.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "rhetorical-synthesis"
    },
    {
        passage: "Notes: Artist residency program. Goals: foster creativity, cultural exchange. Participants: 15 artists from 5 countries. Output: 30 works exhibited. Critique: some say focus is too broad.",
        question: "The program needs a sentence for a grant proposal to highlight its global artistic impact. Which option best achieves this?",
        answers: [
            { text: "A) Bringing 15 artists from 5 countries together, our residency produced 30 exhibited works, enriching global creativity and exchange.", correct: true },
            { text: "B) Though criticized for broad focus, we hosted 15 diverse artists.", correct: false },
            { text: "C) Our program yielded 30 works despite a wide-ranging approach.", correct: false },
            { text: "D) Artists from 5 countries created 30 pieces in our residency.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "rhetorical-synthesis"
    },

    //Boundaries
    // EASY
    {
        passage: "The town’s annual fair draws crowds with its games and food stalls. Families enjoy rides, while vendors sell homemade treats. This year, organizers added a petting zoo, delighting children. _____",
        question: "Which sentence best concludes the passage while staying within its focus on the fair’s attractions?",
        answers: [
            { text: "A) The fair remains a cherished tradition, offering fun for all ages.", correct: true },
            { text: "B) Next year, the town plans to build a new park near the fairgrounds.", correct: false },
            { text: "C) Local farmers benefit greatly from selling their crops at the fair.", correct: false },
            { text: "D) Petting zoos are increasingly popular at events across the region.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "boundaries"
    },
    {
        passage: "The library hosts weekly story hours for kids. Volunteers read aloud, sparking imagination with tales of adventure. Parents appreciate the free activity during busy schedules. _____",
        question: "Which sentence best concludes the passage while maintaining its focus on the story hours?",
        answers: [
            { text: "A) These sessions create a love of reading that lasts a lifetime.", correct: true },
            { text: "B) The library also offers adult book clubs on weekends.", correct: false },
            { text: "C) Volunteers often train for months to become skilled readers.", correct: false },
            { text: "D) Many parents wish schools had similar programs.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "boundaries"
    },
    {
        passage: "The bakery specializes in artisan bread, baked fresh each morning. Customers line up for crusty loaves made with simple ingredients. The owner takes pride in traditional methods. _____",
        question: "Which sentence best concludes the passage while keeping its focus on the bakery’s bread?",
        answers: [
            { text: "A) This dedication keeps the bakery a local favorite.", correct: true },
            { text: "B) The owner plans to open a second shop next year.", correct: false },
            { text: "C) Artisan bread is healthier than mass-produced options.", correct: false },
            { text: "D) Customers also enjoy the bakery’s coffee selection.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "boundaries"
    },
    {
        passage: "The hiking trail winds through dense forest, offering scenic views. Signs mark the path, guiding newcomers past streams and cliffs. Most finish the loop in two hours. _____",
        question: "Which sentence best concludes the passage while staying within its focus on the trail’s features?",
        answers: [
            { text: "A) The trail provides an accessible escape into nature.", correct: true },
            { text: "B) Nearby trails are more challenging for experienced hikers.", correct: false },
            { text: "C) The forest is home to rare bird species.", correct: false },
            { text: "D) Hikers should bring water and snacks for safety.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "boundaries"
    },

    // Boundaries MEDIUM
    {
        passage: "The city’s new recycling program places bins on every corner. Residents sort waste into categories, reducing landfill use. Early data shows a 15% drop in trash volume. _____",
        question: "Which sentence best concludes the passage while maintaining its focus on the recycling program’s impact?",
        answers: [
            { text: "A) This success suggests the program could expand further.", correct: true },
            { text: "B) Other cities struggle to manage their waste effectively.", correct: false },
            { text: "C) Sorting waste takes time but becomes a habit.", correct: false },
            { text: "D) Landfills pose a growing environmental threat nationwide.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "boundaries"
    },
    {
        passage: "The artist paints murals that reflect local history. Each piece captures forgotten stories, from old mills to community heroes. Passersby stop to admire the vivid colors. _____",
        question: "Which sentence best concludes the passage while keeping its focus on the murals’ role?",
        answers: [
            { text: "A) Her work keeps the past alive in the public’s eye.", correct: true },
            { text: "B) She hopes to exhibit smaller paintings in a gallery.", correct: false },
            { text: "C) Local schools teach history using her art as a resource.", correct: false },
            { text: "D) The city’s history dates back over 200 years.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "boundaries"
    },
    {
        passage: "The app tracks fitness goals with daily reminders. Users log steps and calories, syncing data to their phones. Reviews praise its simple design. _____",
        question: "Which sentence best concludes the passage while staying within its focus on the app’s functionality?",
        answers: [
            { text: "A) This ease of use makes fitness tracking approachable for all.", correct: true },
            { text: "B) Competitors offer more advanced features at a higher cost.", correct: false },
            { text: "C) Regular exercise improves overall health, studies say.", correct: false },
            { text: "D) The developers plan a major update next year.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "boundaries"
    },
    {
        passage: "The festival celebrates regional music with live bands. Attendees enjoy folk tunes and dance under the stars. Organizers highlight local talent over big names. _____",
        question: "Which sentence best concludes the passage while maintaining its focus on the festival’s emphasis?",
        answers: [
            { text: "A) This choice keeps the event rooted in community spirit.", correct: true },
            { text: "B) Folk music has deep historical roots in the region.", correct: false },
            { text: "C) Famous bands often draw larger crowds elsewhere.", correct: false },
            { text: "D) The festival also offers food from local vendors.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "boundaries"
    },

    // Boundaries HARD
    {
        passage: "The study examines how urban gardens reduce heat. Data shows a 3°C drop in areas with greenery. Researchers link this to less energy use for cooling. _____",
        question: "Which sentence best concludes the passage while staying within its focus on the study’s findings?",
        answers: [
            { text: "A) These results underscore gardens’ role in sustainable cities.", correct: true },
            { text: "B) Urban heat waves are worsening due to climate change.", correct: false },
            { text: "C) Planting trees could further enhance these cooling effects.", correct: false },
            { text: "D) Cities worldwide face rising energy costs annually.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
    {
        passage: "The novel explores grief through a single character’s lens. Her memories unfold in fragmented chapters, mirroring her pain. Critics note its emotional depth. _____",
        question: "Which sentence best concludes the passage while maintaining its focus on the novel’s approach to grief?",
        answers: [
            { text: "A) This structure amplifies the rawness of her loss.", correct: true },
            { text: "B) The author drew from personal tragedy to write it.", correct: false },
            { text: "C) Readers often find fragmented narratives hard to follow.", correct: false },
            { text: "D) Grief is a common theme in modern literature.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
    {
        passage: "The policy caps factory emissions to curb pollution. Firms must adopt cleaner tech, tracked by monthly reports. Air quality has improved slightly since implementation. _____",
        question: "Which sentence best concludes the passage while staying within its focus on the policy’s effects?",
        answers: [
            { text: "A) This early progress hints at the policy’s potential.", correct: true },
            { text: "B) Cleaner tech is expensive but widely available.", correct: false },
            { text: "C) Factories have long resisted environmental regulations.", correct: false },
            { text: "D) Air pollution remains a global challenge.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
    {
        passage: "The lecture analyzes how myths shape cultural identity. The speaker traces tales across centuries, tying them to values like honor and resilience. Attendees leave with a deeper sense of heritage. _____",
        question: "Which sentence best concludes the passage while maintaining its focus on the lecture’s insights?",
        answers: [
            { text: "A) Such stories reveal the enduring threads of human belief.", correct: true },
            { text: "B) The speaker plans more talks on folklore next year.", correct: false },
            { text: "C) Myths vary widely between Eastern and Western cultures.", correct: false },
            { text: "D) Attendees enjoyed the lecture’s engaging delivery.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },


];

const mathQuestions = [
    // Algebra
    {
        passage: "A store sells shirts for $15 each. During a sale, they offer a $5 discount per shirt. If a customer buys 3 shirts during the sale, how much will they pay?",
        question: "A store sells shirts for $15 each. During a sale, they offer a $5 discount per shirt. If a customer buys 3 shirts during the sale, how much will they pay? What is the total cost?",
        answers: [
            { text: "A) $30", correct: true },
            { text: "B) $45", correct: false },
            { text: "C) $40", correct: false },
            { text: "D) $15", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "algebra"
    },
    {
        passage: "The equation 2x + 7 = 15 represents a number increased by 7, then doubled, resulting in 15.",
        question: "The equation 2x + 7 = 15 represents a number increased by 7, then doubled, resulting in 15. What is the value of x?",
        answers: [
            { text: "A) 4", correct: true },
            { text: "B) 8", correct: false },
            { text: "C) 11", correct: false },
            { text: "D) 1", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "algebra"
    },
    {
        passage: "A line has a slope of 3 and passes through the point (2, 5).",
        question: "A line has a slope of 3 and passes through the point (2, 5). What is the y-intercept of this line?",
        answers: [
            { text: "A) -1", correct: true },
            { text: "B) 5", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 11", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "algebra"
    },
    {
        passage: "A rental company charges a flat fee of $20 plus $10 per hour to rent a bike.",
        question: "A rental company charges a flat fee of $20 plus $10 per hour to rent a bike. If a customer spends $50, how many hours did they rent the bike for?",
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 5", correct: false },
            { text: "C) 2", correct: false },
            { text: "D) 7", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "algebra"
    },

    // Algebra MEDIUM
    {
        passage: "The function f(x) = 2x² - 8x + 5 represents a parabola.",
        question: "The function f(x) = 2x² - 8x + 5 represents a parabola. What is the minimum value of this function?",
        answers: [
            { text: "A) -3", correct: true },
            { text: "B) 5", correct: false },
            { text: "C) 2", correct: false },
            { text: "D) 0", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "algebra"
    },
    {
        passage: "A system of equations is given: 3x + y = 7 and x - 2y = 1.",
        question: "A system of equations is given: 3x + y = 7 and x - 2y = 1. What is the value of x?",
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) 7", correct: false },
            { text: "D) 5", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "algebra"
    },
    {
        passage: "A car travels 60 miles per hour. Another car, leaving 1 hour later, travels 75 miles per hour to catch up.",
        question: "A car travels 60 miles per hour. Another car, leaving 1 hour later, travels 75 miles per hour to catch up. How long after the first car starts will the second car catch up?",
        answers: [
            { text: "A) 4 hours", correct: true },
            { text: "B) 3 hours", correct: false },
            { text: "C) 5 hours", correct: false },
            { text: "D) 2 hours", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "algebra"
    },
    {
        passage: "The inequality 4x - 3 > 9 describes a set of values for x.",
        question: "The inequality 4x - 3 > 9 describes a set of values for x. What is the solution to this inequality?",
        answers: [
            { text: "A) x > 3", correct: true },
            { text: "B) x < 3", correct: false },
            { text: "C) x > 6", correct: false },
            { text: "D) x < 1.5", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "algebra"
    },

    // Algebra HARD
    {
        passage: "A quadratic function is defined as f(x) = x² - 6x + k, where k is a constant. The vertex of this parabola lies on the x-axis.",
        question: "A quadratic function is defined as f(x) = x² - 6x + k, where k is a constant. The vertex of this parabola lies on the x-axis. What is the value of k?",
        answers: [
            { text: "A) 9", correct: true },
            { text: "B) 6", correct: false },
            { text: "C) 0", correct: false },
            { text: "D) -9", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "algebra"
    },
    {
        passage: "Two numbers have a sum of 15 and a product of 36.",
        question: "Two numbers have a sum of 15 and a product of 36. What is the larger of the two numbers?",
        answers: [
            { text: "A) 12", correct: true },
            { text: "B) 9", correct: false },
            { text: "C) 15", correct: false },
            { text: "D) 6", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "algebra"
    },
    {
        passage: "A system of equations has infinitely many solutions: 2x - 3y = 6 and kx - 9y = 18, where k is a constant.",
        question: "A system of equations has infinitely many solutions: 2x - 3y = 6 and kx - 9y = 18, where k is a constant. What is the value of k?",
        answers: [
            { text: "A) 6", correct: true },
            { text: "B) 3", correct: false },
            { text: "C) 9", correct: false },
            { text: "D) 2", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "algebra"
    },
    {
        passage: "The function g(x) = (x - 2)(x + 3) is shifted 4 units up and 1 unit left to form a new function h(x).",
        question: "The function g(x) = (x - 2)(x + 3) is shifted 4 units up and 1 unit left to form a new function h(x). What is the value of h(0)?",
        answers: [
            { text: "A) 0", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 6", correct: false },
            { text: "D) -6", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "algebra"
    },



    
    {
        passage: "",
        question: "An airplane is flying from City A to City B, a total distance of 1,500 miles. The airplane flies against the wind at 500 mph for half the trip and with the wind at 600 mph for the other half. What is the total flight time?",
        answers: [
            { text: "A) 2.5 hours", correct: false },
            { text: "B) 2.6 hours", correct: false },
            { text: "C) 2.8 hours", correct: false },
            { text: "D) 2.75 hours", correct: true }
        ],
        difficulty: "hard",
        category: "advanced-math"
    },
    {
        passage: "",
        question: "A car's value depreciates by 15% each year. If the car was originally purchased for $30,000, what will its value be after 3 years, rounded to the nearest dollar?",
        answers: [
            { text: "A) $18,520", correct: false },
            { text: "B) $19,275", correct: true },
            { text: "C) $20,250", correct: false },
            { text: "D) $21,000", correct: false }
        ],
        difficulty: "hard",
        category: "advanced-math"
    },    
    {
        passage: "",
        question: "The function f(x) is defined as f(x) = 2x² - 3x + 5. What is the value of f(4)?",
        answers: [
            { text: "A) 27", correct: false },
            { text: "B) 29", correct: false },
            { text: "C) 31", correct: false },
            { text: "D) 25", correct: true }
        ],
        difficulty: "easy",
        category: "algebra"
    },
    {
        passage: "",
        question: "A company rents out bicycles for a flat fee of $12 plus $3 per hour. If a customer has $45 to spend, what is the maximum number of hours they can rent a bicycle?",
        answers: [
            { text: "A) 10 hours", correct: false },
            { text: "B) 11 hours", correct: true },
            { text: "C) 9 hours", correct: false },
            { text: "D) 8 hours", correct: false }
        ],
        difficulty: "medium",
        category: "algebra"
    },

    //Advanced Math
    // Mildly Hard Questions
    {
        passage: "The function f(x) = 2^x models exponential growth. If f(x) = 16, what is the value of x?",
        question: "The function f(x) = 2^x models exponential growth. If f(x) = 16, what is the value of x?",
        answers: [
            { text: "A) 4", correct: true },
            { text: "B) 8", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 16", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        passage: "A population doubles every 5 years. If it starts at 100, the function P(t) = 100 * 2^(t/5) gives the population after t years.",
        question: "A population doubles every 5 years. If it starts at 100, the function P(t) = 100 * 2^(t/5) gives the population after t years. What is the population after 15 years?",
        answers: [
            { text: "A) 800", correct: true },
            { text: "B) 400", correct: false },
            { text: "C) 200", correct: false },
            { text: "D) 1600", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        passage: "The equation log₃(x) = 2 describes a logarithmic relationship.",
        question: "The equation log₃(x) = 2 describes a logarithmic relationship. What is the value of x?",
        answers: [
            { text: "A) 9", correct: true },
            { text: "B) 6", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 12", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "advanced-math"
    },
    {
        passage: "A right triangle has legs of length 3 and 4.",
        question: "A right triangle has legs of length 3 and 4. What is the sine of the smallest angle?",
        answers: [
            { text: "A) 3/5", correct: true },
            { text: "B) 4/5", correct: false },
            { text: "C) 5/3", correct: false },
            { text: "D) 3/4", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "advanced-math"
    },

    // Advanced Math MEDIUM
    {
        passage: "The equation 4^(x+1) = 64 can be solved for x.",
        question: "The equation 4^(x+1) = 64 can be solved for x. What is the value of x?",
        answers: [
            { text: "A) 1", correct: true },
            { text: "B) 2", correct: false },
            { text: "C) 0", correct: false },
            { text: "D) 3", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        passage: "For the function f(x) = x^4 - 4x^2, the critical points occur where the derivative is zero.",
        question: "For the function f(x) = x^4 - 4x^2, the critical points occur where the derivative is zero. How many distinct real critical points does f(x) have?",
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 2", correct: false },
            { text: "C) 1", correct: false },
            { text: "D) 4", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        passage: "The complex number z = 3 + 4i is multiplied by its conjugate.",
        question: "The complex number z = 3 + 4i is multiplied by its conjugate. What is the result?",
        answers: [
            { text: "A) 25", correct: true },
            { text: "B) 9 + 16i", correct: false },
            { text: "C) 7", correct: false },
            { text: "D) -7", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "advanced-math"
    },
    {
        passage: "In a right triangle, the cosine of an angle is 5/13.",
        question: "In a right triangle, the cosine of an angle is 5/13. What is the tangent of that angle?",
        answers: [
            { text: "A) 12/5", correct: true },
            { text: "B) 5/12", correct: false },
            { text: "C) 13/5", correct: false },
            { text: "D) 5/13", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "advanced-math"
    },

    // Advanced Math HARD
    {
        passage: "The equation 2^(2x) - 5 * 2^x + 4 = 0 can be solved by substitution.",
        question: "The equation 2^(2x) - 5 * 2^x + 4 = 0 can be solved by substitution. What is the sum of all real solutions for x?",
        answers: [
            { text: "A) 2", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 0", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "advanced-math"
    },
    {
        passage: "The function f(x) = log₂(x) + log₂(x - 1) is defined for x > 1.",
        question: "The function f(x) = log₂(x) + log₂(x - 1) is defined for x > 1. If f(x) = 3, what is the value of x?",
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 2", correct: false },
            { text: "D) 5", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "advanced-math"
    },
    {
        passage: "A circle’s equation is x² + y² - 6x + 4y - 12 = 0.",
        question: "A circle’s equation is x² + y² - 6x + 4y - 12 = 0. What is the radius of the circle?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 6", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "advanced-math"
    },
    {
        passage: "The equation sin(x) + cos(x) = √2 is solved for x over the interval [0, 2π).",
        question: "The equation sin(x) + cos(x) = √2 is solved for x over the interval [0, 2π). How many solutions exist?",
        answers: [
            { text: "A) 1", correct: true },
            { text: "B) 2", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 0", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "advanced-math"
    },
    //problem solving

    // Mildly Hard Questions
    {
        passage: "A store sold 120 shirts in a week. Of these, 30 were blue. What percent of the shirts sold were blue?",
        question: "What is the percentage?",
        answers: [
            { text: "A) 25%", correct: true },
            { text: "B) 30%", correct: false },
            { text: "C) 20%", correct: false },
            { text: "D) 15%", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "problem-solving"
    },
    {
        passage: "A car travels 240 miles in 4 hours.",
        question: "What is the car’s average speed in miles per hour?",
        answers: [
            { text: "A) 60", correct: true },
            { text: "B) 48", correct: false },
            { text: "C) 80", correct: false },
            { text: "D) 24", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "problem-solving"
    },
    {
        passage: "A survey of 200 people found that 80 prefer tea over coffee.",
        question: "What is the ratio of tea drinkers to coffee drinkers?",
        answers: [
            { text: "A) 2:3", correct: true },
            { text: "B) 3:2", correct: false },
            { text: "C) 1:2", correct: false },
            { text: "D) 4:5", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "problem-solving"
    },
    {
        passage: "A recipe requires 3 cups of flour to make 12 cookies. How many cups of flour are needed to make 20 cookies?",
        question: "What is the amount of flour needed?",
        answers: [
            { text: "A) 5", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 6", correct: false },
            { text: "D) 3", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "problem-solving"
    },

    // Problem Solving MEDIUM
    {
        passage: "A data set has values: 5, 7, 9, 11, 13. The mean is 9.",
        question: "If a value of 15 is added, what is the new mean?",
        answers: [
            { text: "A) 10", correct: true },
            { text: "B) 9", correct: false },
            { text: "C) 11", correct: false },
            { text: "D) 8", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "problem-solving"
    },
    {
        passage: "A worker earns $12 per hour for the first 40 hours and $18 per hour for overtime. Last week, they earned $600.",
        question: "How many hours did they work?",
        answers: [
            { text: "A) 45", correct: true },
            { text: "B) 40", correct: false },
            { text: "C) 50", correct: false },
            { text: "D) 42", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "problem-solving"
    },
    {
        passage: "A tank holds 50 gallons of water. A pump removes water at 2 gallons per minute, while a faucet adds 1 gallon per minute.",
        question: "How many minutes will it take to empty the tank?",
        answers: [
            { text: "A) 50", correct: true },
            { text: "B) 25", correct: false },
            { text: "C) 100", correct: false },
            { text: "D) 75", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "problem-solving"
    },
    {
        passage: "A box contains 5 red, 3 blue, and 2 green marbles. Two marbles are drawn without replacement.",
        question: "What is the probability both are red?",
        answers: [
            { text: "A) 2/9", correct: true },
            { text: "B) 1/4", correct: false },
            { text: "C) 5/18", correct: false },
            { text: "D) 1/2", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "problem-solving"
    },

    // Extremely Hard Questions
    {
        passage: "A data set has a mean of 20 and a standard deviation of 4. A new data set is created by doubling each value.",
        question: "What is the standard deviation of the new data set?",
        answers: [
            { text: "A) 8", correct: true },
            { text: "B) 4", correct: false },
            { text: "C) 16", correct: false },
            { text: "D) 40", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "problem-solving"
    },
    {
        passage: "A machine produces 300 units per hour with a 5% defect rate. A second machine produces 400 units per hour with a 3% defect rate.",
        question: "If both run for 2 hours, what is the expected number of non-defective units?",
        answers: [
            { text: "A) 1358", correct: true },
            { text: "B) 1400", correct: false },
            { text: "C) 1300", correct: false },
            { text: "D) 1450", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "problem-solving"
    },
    {
        passage: "A survey asks 500 people their favorite season: 150 choose spring, 120 summer, 100 fall, 130 winter. Results are shown in a circle graph.",
        question: "What is the measure in degrees of the central angle for spring?",
        answers: [
            { text: "A) 108", correct: true },
            { text: "B) 90", correct: false },
            { text: "C) 120", correct: false },
            { text: "D) 72", correct: false },
        ],
        type: "math",
        difficulty: "extremely hard",
        category: "problem solving and data analysis"
    },
    {
        passage: "A company’s sales doubled each year for 3 years, starting at $50,000. In year 4, sales increased by 50%.",
        question: "What were the sales in year 4?",
        answers: [
            { text: "A) $600,000", correct: true },
            { text: "B) $400,000", correct: false },
            { text: "C) $800,000", correct: false },
            { text: "D) $300,000", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "problem-solving"
    },

    // Geometry and Trigonometry
    // Mildly Hard Questions
    {
        passage: "A rectangle has a length of 8 units and a width of 5 units.",
        question: "What is the area of the rectangle?",
        answers: [
            { text: "A) 40", correct: true },
            { text: "B) 26", correct: false },
            { text: "C) 13", correct: false },
            { text: "D) 80", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "geometry"
    },
    {
        passage: "A right triangle has legs of length 6 and 8.",
        question: "What is the length of the hypotenuse?",
        answers: [
            { text: "A) 10", correct: true },
            { text: "B) 14", correct: false },
            { text: "C) 12", correct: false },
            { text: "D) 8", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "geometry"
    },
    {
        passage: "A circle has a radius of 7 units.",
        question: "What is the circumference of the circle? (Use π ≈ 3.14)",
        answers: [
            { text: "A) 43.96", correct: true },
            { text: "B) 49", correct: false },
            { text: "C) 21.98", correct: false },
            { text: "D) 153.86", correct: false },
        ],
        type: "math",
        difficulty: "mildly hard",
        category: "geometry and trigonometry"
    },
    {
        passage: "In a right triangle, one angle measures 30° and the hypotenuse is 12 units.",
        question: "What is the length of the leg opposite the 30° angle?",
        answers: [
            { text: "A) 6", correct: true },
            { text: "B) 12", correct: false },
            { text: "C) 10", correct: false },
            { text: "D) 3", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "geometry"
    },

    // Hard Questions
    {
        passage: "A cylinder has a radius of 3 units and a height of 10 units.",
        question: "What is the volume of the cylinder? (Use π ≈ 3.14)",
        answers: [
            { text: "A) 282.6", correct: true },
            { text: "B) 94.2", correct: false },
            { text: "C) 188.4", correct: false },
            { text: "D) 30", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "geometry"
    },
    {
        passage: "Two similar triangles have corresponding side lengths in the ratio 2:5. The smaller triangle has an area of 8 square units.",
        question: "What is the area of the larger triangle?",
        answers: [
            { text: "A) 50", correct: true },
            { text: "B) 20", correct: false },
            { text: "C) 32", correct: false },
            { text: "D) 80", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "geometry"
    },
    {
        passage: "A right triangle has a hypotenuse of 13 units and one leg of 5 units.",
        question: "What is the cosine of the angle opposite the 5-unit leg?",
        answers: [
            { text: "A) 12/13", correct: true },
            { text: "B) 5/13", correct: false },
            { text: "C) 13/12", correct: false },
            { text: "D) 5/12", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "geometry"
    },
    {
        passage: "A sector of a circle has a radius of 6 units and a central angle of 60°.",
        question: "What is the area of the sector? (Use π ≈ 3.14)",
        answers: [
            { text: "A) 18.84", correct: true },
            { text: "B) 37.68", correct: false },
            { text: "C) 6.28", correct: false },
            { text: "D) 12.56", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "geometry"
    },

    // Extremely Hard Questions
    {
        passage: "A cone has a radius of 4 units and a slant height of 5 units.",
        question: "What is the volume of the cone? (Use π ≈ 3.14)",
        answers: [
            { text: "A) 50.24", correct: true },
            { text: "B) 75.36", correct: false },
            { text: "C) 25.12", correct: false },
            { text: "D) 100.48", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "geometry"
    },
    {
        passage: "In triangle ABC, angle A = 45°, angle B = 60°, and side BC = 10 units.",
        question: "What is the length of side AB?",
        answers: [
            { text: "A) 10√6 / (√2 + √3)", correct: true },
            { text: "B) 10", correct: false },
            { text: "C) 5√2", correct: false },
            { text: "D) 10√3", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "geometry"
    },
    {
        passage: "A point P has coordinates (3, -4). The line y = 2x - 1 is rotated 90° counterclockwise about the origin.",
        question: "What is the shortest distance from P to the rotated line?",
        answers: [
            { text: "A) 1", correct: true },
            { text: "B) 2", correct: false },
            { text: "C) √5", correct: false },
            { text: "D) 3", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "geometry"
    },
    {
        passage: "The equation 2sin²(x) - sin(x) - 1 = 0 is solved over the interval [0, 2π).",
        question: "How many distinct solutions exist?",
        answers: [
            { text: "A) 2", correct: true },
            { text: "B) 1", correct: false },
            { text: "C) 3", correct: false },
            { text: "D) 4", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "geometry"
    }

];

function startTest() {
    satIntroContainer.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startReadingWritingTest();
}

function startReadingWritingTest() {
    isMathTest = false;
    time = 32 * 60; // 32 minutes per module
    userResponses = [];
    currentModule = 1;
    module1Correct = 0;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endModule, 32 * 60 * 1000); // End after 32 minutes
    startQuiz(readingWritingQuestions, 9, 9, 9); // 27 questions per module
}

function startMathTest() {
    isMathTest = true;
    time = 35 * 60; // 35 minutes per module
    currentModule = 1;
    module1Correct = 0;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endModule, 35 * 60 * 1000); // End after 35 minutes
    startQuiz(mathQuestions, 7, 8, 7); // 22 questions per module
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    if (time === 0) {
        clearInterval(refreshIntervalId);
        endModule();
    } else {
        time--;
    }
}

function endModule() {
    clearInterval(refreshIntervalId);
    resetState();
    if (currentModule === 1) {
        module1Correct = correctAnswers;
        currentModule = 2;
        startNextModule();
    } else {
        if (!isMathTest) {
            showReadingWritingScore(); // Show score after Reading/Writing module 2
        } else {
            showFinalScore(); // Show final score after Math module 2
        }
    }
}

function startNextModule() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    score = 0;
    time = isMathTest ? 35 * 60 : 32 * 60;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endModule, (isMathTest ? 35 : 32) * 60 * 1000);
    
    const threshold = isMathTest ? 11 : 13; // 50% correct threshold for adaptivity
    if (module1Correct >= threshold) {
        startQuiz(isMathTest ? mathQuestions : readingWritingQuestions, 0, 9, 13); // More hard questions
    } else {
        startQuiz(isMathTest ? mathQuestions : readingWritingQuestions, 13, 9, 0); // More easy questions
    }
}

function startQuiz(questions, numEasy, numMedium, numHard) {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    categoryStats = {};
    selectedQuestions = selectRandomQuestions(questions, numEasy, numMedium, numHard);
    nextButton.innerHTML = "Next";
    showQuestion();
}

function selectRandomQuestions(questions, numEasy, numMedium, numHard) {
    const easyQuestions = questions.filter(q => q.difficulty === "easy");
    const mediumQuestions = questions.filter(q => q.difficulty === "medium");
    const hardQuestions = questions.filter(q => q.difficulty === "hard");

    function getRandom(arr, num) {
        return arr.sort(() => 0.5 - Math.random()).slice(0, Math.min(num, arr.length));
    }

    const selectedEasy = getRandom(easyQuestions, numEasy);
    const selectedMedium = getRandom(mediumQuestions, numMedium);
    const selectedHard = getRandom(hardQuestions, numHard);

    return [...selectedEasy, ...selectedMedium, ...selectedHard];
}

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    passageElement.innerHTML = currentQuestion.passage;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    updateProgressBar();
}

function resetState() {
    nextButton.style.display = "none";
    nextButton.classList.remove("centered-btn");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionCategory = currentQuestion.category.toLowerCase().replace(/\s+/g, "-");
    let questionDifficulty = currentQuestion.difficulty;

    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    const correctAnswer = currentQuestion.answers.find(ans => ans.correct).text;
    userResponses.push({
        question: currentQuestion.passage + "<br/><br/>" + currentQuestion.question,
        userAnswer: selectedBtn.innerHTML,
        correctAnswer: correctAnswer,
        wasCorrect: isCorrect
    });

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        if (questionDifficulty === "easy") {
            score += 1;
        } else if (questionDifficulty === "medium") {
            score += 2;
        } else if (questionDifficulty === "hard") {
            score += 3;
        }
        categoryStats[questionCategory].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats[questionCategory].incorrect++;
    }

    recordTestResults();

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.disabled = false;
}

function showReadingWritingScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = 9 * 1 + 9 * 2 + 9 * 3; // Per module (27 questions)
    maxPossibleScore *= 2; // Two modules
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    localStorage.setItem("readingScore", scaledScore);
    passageElement.innerHTML = "";
    questionElement.innerHTML = `Reading and Writing DSAT Score: ${scaledScore} / 800`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");

    document.getElementById("question-container").classList.remove("hide");
    document.getElementById("break-message").classList.add("hide");
    countdownEl.innerHTML = "0:00"; // Reset timer display
}

function showFinalScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = 7 * 1 + 8 * 2 + 7 * 3; // Per module (22 questions)
    maxPossibleScore *= 2; // Two modules
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    let readingScore = parseInt(localStorage.getItem("readingScore") || 0, 10);
    let mathScore = scaledScore;
    localStorage.setItem("mathScore", mathScore);

    let totalDSATScore = readingScore + mathScore;

    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = { reading: readingScore, math: mathScore, total: totalDSATScore };
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    passageElement.innerHTML = "";
    questionElement.innerHTML = `<p><strong>Reading and Writing DSAT Score:</strong> ${readingScore} / 800</p>
                                <p><strong>Math DSAT Score:</strong> ${mathScore} / 800</p>
                                <p><strong>Total DSAT Score:</strong> ${totalDSATScore} / 1600</p>`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Review Incorrect Answers";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", showExplanations);

    countdownEl.innerHTML = "0:00"; // Stop and reset timer display
    time = 0; // Ensure time is reset
}

function showExplanations() {
    resetState();
    passageElement.innerHTML = "";
    questionElement.innerHTML = "<h2>Review of Incorrect Answers</h2>";

    const incorrectResponses = userResponses.filter(response => !response.wasCorrect);

    if (incorrectResponses.length === 0) {
        questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
    } else {
        incorrectResponses.forEach((response, index) => {
            const explanation = generateExplanation(response);
            questionElement.innerHTML += `
                <div class="explanation">
                    <h3>Question ${index + 1}</h3>
                    <p><strong>Question:</strong> ${response.question}</p>
                    <p><strong>Your Answer:</strong> ${response.userAnswer}</p>
                    <p><strong>Correct Answer:</strong> ${response.correctAnswer}</p>
                    <p><strong>Explanation:</strong> ${explanation}</p>
                </div>
            `;
        });
    }

    nextButton.innerHTML = "Finish";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", showExplanations);
    nextButton.addEventListener("click", () => {
        window.location.href = "https://www.brainjelli.com/user-profile";
    });
}
const allQuestions = [...readingWritingQuestions, ...mathQuestions];

// Function to shuffle and reassign correct answers
function shuffleAnswers(questions) {
    const letterMap = ['A', 'B', 'C', 'D'];
    let letterCounts = { A: 0, B: 0, C: 0, D: 0 };

    questions.forEach((q, index) => {
        const originalAnswers = [...q.answers];
        const correctAnswer = originalAnswers.find(a => a.correct);
        const incorrectAnswers = originalAnswers.filter(a => !a.correct);

        // Target letter for even distribution (approx. 42 per letter for 168 questions)
        const targetLetter = letterMap[Math.floor(index / (questions.length / 4))] || 'D';
        if (letterCounts[targetLetter] >= Math.ceil(questions.length / 4)) {
            const minCount = Math.min(...Object.values(letterCounts));
            const available = Object.keys(letterCounts).filter(k => letterCounts[k] === minCount);
            targetLetter = available[0];
        }

        // Rebuild answers array
        const newAnswers = [];
        let incorrectIndex = 0;
        for (let i = 0; i < 4; i++) {
            if (letterMap[i] === targetLetter) {
                newAnswers.push({ text: correctAnswer.text, correct: true });
            } else {
                newAnswers.push({ text: incorrectAnswers[incorrectIndex].text, correct: false });
                incorrectIndex++;
            }
        }

        q.answers = newAnswers;
        letterCounts[targetLetter]++;
    });

    return questions;
}

// Shuffle all questions
shuffleAnswers(allQuestions);


function generateExplanation(response) {
    const questionText = response.question;
    const correctAnswer = response.answers.find(a => a.correct).text.split(') ')[1]; // Extract text after letter

    // READING/WRITING EXPLANATIONS
    if (response.type === "reading") {
        // Command of Evidence (Mildly Hard)
        if (questionText.includes("best supports the idea that Dr. Patel is persistent")) {
            return `Her months of refining methods show persistence despite setbacks. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("best indicates the explorer’s motivation")) {
            return `Pressing on driven by tales of a hidden temple directly shows his motivation. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("best demonstrates Clara overcoming her initial nervousness")) {
            return `Her voice growing steadier after being shaky shows she overcomes nervousness. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("best supports the baker’s commitment to his work")) {
            return `Pausing only briefly before returning to work highlights his commitment. Correct answer: "${correctAnswer}".`;

        // Command of Evidence (Hard)
        } else if (questionText.includes("best supports the economist’s credibility")) {
            return `Countering critics with multi-year evidence demonstrates her credibility. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("most clearly shows the climber’s resilience")) {
            return `Ignoring the wind and pushing upward directly shows her resilience. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("best strengthens the historian’s argument")) {
            return `Pointing to overlooked correspondence provides concrete support for her argument. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("best justifies the engineer’s confidence")) {
            return `Citing stress test results offers evidence backing her confidence. Correct answer: "${correctAnswer}".`;

        // Command of Evidence (Extremely Hard)
        } else if (questionText.includes("most directly undermines the team’s contamination hypothesis")) {
            return `Noting sterile conditions directly counters the idea of contamination. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("most effectively counters the critics’ accusation of stalling")) {
            return `Referencing an overlooked clause shows purposeful action, not stalling. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("most directly supports the poet’s explanation of her style")) {
            return `Her letter stating disorder was deliberate directly supports her explanation. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("most strongly refutes the peers’ suggestion of rounding errors")) {
            return `The calibration log confirming precision directly refutes rounding errors. Correct answer: "${correctAnswer}".`;

        // Central Ideas (Mildly Hard)
        } else if (questionText.includes("central idea of the passage") && response.passage.includes("old lighthouse")) {
            return `The lighthouse’s endurance despite storms highlights resilience. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("main idea conveyed by the passage") && response.passage.includes("annual harvest festival")) {
            return `The festival emphasizes community bonds over material gain. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("central theme of the passage") && response.passage.includes("inventor toiled")) {
            return `The inventor’s persistence through failure drives innovation. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primary idea of the passage") && response.passage.includes("river wound through the valley")) {
            return `The river is central to the valley’s existence and identity. Correct answer: "${correctAnswer}".`;

        // Central Ideas (Hard)
        } else if (questionText.includes("central idea of the passage") && response.passage.includes("playwright crafted")) {
            return `The playwright aims to redefine historical narratives. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("main idea of the passage") && response.passage.includes("desert stretched endlessly")) {
            return `The nomads’ survival hinges on deep environmental knowledge. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("central theme of the passage") && response.passage.includes("librarian curated")) {
            return `The librarian champions literature’s timeless impact. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primary idea of the passage") && response.passage.includes("climber scaled the peak")) {
            return `The climb reveals the climber’s inner growth over external triumph. Correct answer: "${correctAnswer}".`;

        // Central Ideas (Extremely Hard)
        } else if (questionText.includes("central idea of the passage") && response.passage.includes("philosopher argued")) {
            return `The philosopher posits truth as a subjective, perceptual construct. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("main idea of the passage") && response.passage.includes("artist painted decay")) {
            return `The artist links beauty with life’s transient nature. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("central theme of the passage") && response.passage.includes("economist viewed markets")) {
            return `The economist warns of markets’ vulnerability to imbalance. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primary idea of the passage") && response.passage.includes("linguist traced language")) {
            return `The linguist sees language as a dynamic, negotiated process. Correct answer: "${correctAnswer}".`;

        // Inferences (Mildly Hard)
        } else if (questionText.includes("inferred about the farmer’s attitude")) {
            return `His return to work with a grunt implies determination despite the drought. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the librarian’s feelings")) {
            return `Her smile and prominent display suggest she cherishes the older books. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the runner’s approach")) {
            return `Stretching longer after a loss implies greater care in preparation. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the painter’s response")) {
            return `Adding crimson despite advice shows she prioritizes her own vision. Correct answer: "${correctAnswer}".`;

        // Inferences (Hard)
        } else if (questionText.includes("inferred about the detective’s view")) {
            return `Noting the broken lock suggests he doubts the accident claim. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the scientist’s reaction")) {
            return `Frowning and double-checking imply unease and a need to resolve anomalies. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the merchant’s business strategy")) {
            return `Grinning despite fewer sales suggests he values profit over volume. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the teacher’s perception")) {
            return `Assigning a solo project implies she sees untapped potential. Correct answer: "${correctAnswer}".`;

        // Inferences (Extremely Hard)
        } else if (questionText.includes("inferred about the diplomat’s strategy")) {
            return `A surprise compromise amid tension suggests a calculated move for control. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the poet’s creative process")) {
            return `Burning drafts and rejecting perfection imply she values raw imperfection. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the engineer’s priorities")) {
            return `Delaying for a tweak shows precision trumps investor pressure. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("inferred about the historian’s approach")) {
            return `Focusing on one letter to upend a theory implies insight from detail. Correct answer: "${correctAnswer}".`;

        // Words in Context (Mildly Hard)
        } else if (questionText.includes("what does 'elevate' most nearly mean")) {
            return `"'Elevate' means to improve the sauce’s flavor, enhancing its quality. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'survey' most nearly mean")) {
            return `"'Survey' means to observe the landscape, taking it in visually. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'refine' most nearly mean")) {
            return `"'Refine' means to perfect the chaotic notes into a polished draft. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'restore' most nearly mean")) {
            return `"'Restore' means to reestablish order in the neglected yard. Correct answer: "${correctAnswer}".`;

        // Words in Context (Hard)
        } else if (questionText.includes("what does 'illuminated' most nearly mean")) {
            return `"'Illuminated' means to explain theories clearly, making them understandable. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'penetrate' most nearly mean")) {
            return `"'Penetrate' means to break through her composed demeanor, breaching it. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'synthesis' most nearly mean")) {
            return `"'Synthesis' means a combination of art and utility in the design. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'defying' most nearly mean")) {
            return `"'Defying' means resisting the rigid structure of the original score. Correct answer: "${correctAnswer}".`;

        // Words in Context (Extremely Hard)
        } else if (questionText.includes("what does 'eludes' most nearly mean")) {
            return `"'Eludes' means truth evades rigid definitions, slipping away. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'undermine' most nearly mean")) {
            return `"'Undermine' means to weaken the research’s conclusions, not fully disprove. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'imbued' most nearly mean")) {
            return `"'Imbued' means infused with layers of meaning in her lines. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("what does 'entrenched' most nearly mean")) {
            return `"'Entrenched' means deeply established views held by her peers. Correct answer: "${correctAnswer}".`;

        // Text Structure and Purpose (Mildly Hard)
        } else if (questionText.includes("primary purpose") && response.passage.includes("old bridge")) {
            return `The passage describes the bridge’s state and its ongoing assessment. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primarily structured") && response.passage.includes("festival began")) {
            return `The passage follows the festival’s timeline from start to end. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("main purpose") && response.passage.includes("rainforests teem")) {
            return `The passage shows deforestation’s effects and pushes conservation. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primarily structured") && response.passage.includes("recipe starts")) {
            return `The passage lists baking steps in order. Correct answer: "${correctAnswer}".`;

        // Text Structure and Purpose (Hard)
        } else if (questionText.includes("primarily structured") && response.passage.includes("explorer’s journal")) {
            return `The passage tracks her emotional shift over time. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primary purpose") && response.passage.includes("urban sprawl")) {
            return `The passage explores sprawl’s downsides and offers a solution. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primarily structured") && response.passage.includes("novel opens")) {
            return `The passage follows the mystery’s progression chapter by chapter. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("main purpose") && response.passage.includes("climate change accelerates")) {
            return `The passage warns of climate impacts and calls for solutions. Correct answer: "${correctAnswer}".`;

        // Text Structure and Purpose (Extremely Hard)
        } else if (questionText.includes("primarily structured") && response.passage.includes("essay starts with a paradox")) {
            return `The passage ties freedom across eras around a central theme. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primary purpose") && response.passage.includes("poetry, she writes")) {
            return `The passage reveals her intent to reflect life’s ups and downs. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("primarily structured") && response.passage.includes("study lists data")) {
            return `The passage mixes stats and story to make a point. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("main purpose") && response.passage.includes("history, he argues")) {
            return `The passage aims to rethink history with linked examples. Correct answer: "${correctAnswer}".`;

        // Transitions (Mildly Hard)
        } else if (questionText.includes("transition") && response.passage.includes("storm hit late")) {
            return `"'As a result' connects the flooding to residents’ discovery. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("team practiced daily")) {
            return `"'Consequently' links practice to the successful outcome. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("garden thrived in spring")) {
            return `"'However' contrasts the thriving spring with summer’s drought. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("recipe called for fresh herbs")) {
            return `"'Alternatively' offers dried herbs as a substitute. Correct answer: "${correctAnswer}".`;

        // Transitions (Hard)
        } else if (questionText.includes("transition") && response.passage.includes("experiment yielded consistent")) {
            return `"'Nevertheless' contrasts consistency with the unexpected malfunction. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("city planned a new park")) {
            return `"'Unfortunately' introduces the setback of budget cuts. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("novel’s early chapters")) {
            return `"'By contrast' highlights the shift from slow suspense to rapid twists. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("runner trained hard")) {
            return `"'Furthermore' adds diet changes to her training efforts. Correct answer: "${correctAnswer}".`;

        // Transitions (Extremely Hard)
        } else if (questionText.includes("transition") && response.passage.includes("theory relied on stable")) {
            return `"'In practice' shifts from theory to real-world challenges. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("critics praised the film’s visuals")) {
            return `"'Conversely' contrasts praise for visuals with debate over narrative. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("poet aimed for clarity")) {
            return `"'In contrast' highlights the shift from clarity to ambiguity. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("transition") && response.passage.includes("policy aimed to reduce emissions")) {
            return `"'On the other hand' introduces industries’ opposing perspective. Correct answer: "${correctAnswer}".`;

        // Rhetorical Synthesis (Mildly Hard)
        } else if (questionText.includes("park’s benefits")) {
            return `A emphasizes recreation and tourism with specific features, aligning with the goal. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("program’s success")) {
            return `A highlights the 20% trash reduction, showcasing measurable success. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("expansion’s appeal")) {
            return `A ties demand to offerings and timing, making the expansion enticing. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("garden’s community impact")) {
            return `A connects volunteers, output, and bonds, emphasizing community strength. Correct answer: "${correctAnswer}".`;

        // Rhetorical Synthesis (Hard)
        } else if (questionText.includes("app’s value to its audience")) {
            return `A targets young adults with features and accessibility, meeting the pitch’s aim. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("initiative’s environmental and financial benefits")) {
            return `A links emissions cuts and savings, spotlighting dual benefits. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("exhibit’s appeal and impact")) {
            return `A combines attendance and engagement with features, boosting appeal. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("support for refugees")) {
            return `A details services and reach with donor ties, underlining support. Correct answer: "${correctAnswer}".`;

        // Rhetorical Synthesis (Extremely Hard)
        } else if (questionText.includes("relevance to climate challenges")) {
            return `A ties heat waves to cooling and energy data, showing climate relevance. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("technology’s potential benefits")) {
            return `A highlights safety and efficiency with trial success, focusing on benefits. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("tax’s dual benefits")) {
            return `A pairs emissions reduction with tech funding, advocating both goals. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("global artistic impact")) {
            return `A links diverse artists and works to creativity and exchange, showing global reach. Correct answer: "${correctAnswer}".`;

        // Boundaries (Mildly Hard)
        } else if (questionText.includes("fair’s attractions")) {
            return `A ties the petting zoo and fair’s appeal to its ongoing tradition. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("story hours")) {
            return `A keeps focus on the story hours’ impact on kids’ reading. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("bakery’s bread")) {
            return `A links the bread’s quality to the bakery’s popularity. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("trail’s features")) {
            return `A summarizes the trail’s accessibility and natural appeal. Correct answer: "${correctAnswer}".`;

        // Boundaries (Hard)
        } else if (questionText.includes("recycling program’s impact")) {
            return `A extends the program’s success within its current scope. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("murals’ role")) {
            return `A reinforces the murals’ purpose in preserving history. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("app’s functionality")) {
            return `A ties simplicity to the app’s fitness tracking goal. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("festival’s emphasis")) {
            return `A connects local talent to the festival’s community focus. Correct answer: "${correctAnswer}".`;

        // Boundaries (Extremely Hard)
        } else if (questionText.includes("study’s findings")) {
            return `A links the data to urban sustainability, staying on topic. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("approach to grief")) {
            return `A ties structure to the novel’s grief theme, avoiding externals. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("policy’s effects")) {
            return `A focuses on the policy’s initial air quality impact. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("lecture’s insights")) {
            return `A concludes with myths’ role in identity, not logistics. Correct answer: "${correctAnswer}".`;
        }
    }

    // MATH EXPLANATIONS
    if (response.type === "math") {
        // Algebra (Mildly Hard)
        if (questionText.includes("total cost")) {
            return `Sale price = $15 - $5 = $10 per shirt. Total = 3 × $10 = $30. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("value of x") && response.passage.includes("2x + 7 = 15")) {
            return `2x + 7 = 15 → 2x = 8 → x = 4. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("y-intercept")) {
            return `y = mx + b. Using (2, 5) and m = 3: 5 = 3(2) + b → b = -1. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("hours did they rent")) {
            return `20 + 10h = 50 → 10h = 30 → h = 3. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("value of f(4)")) {
            return `f(4) = 2(4)² - 3(4) + 5 = 32 - 12 + 5 = 25. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("maximum number of hours")) {
            return `12 + 3h = 45 → 3h = 33 → h = 11. Correct answer: "${correctAnswer}".`;

        // Algebra (Hard)
        } else if (questionText.includes("minimum value")) {
            return `Vertex at x = -b/(2a) = 8/(4) = 2. f(2) = 2(4) - 8(2) + 5 = -3. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("value of x") && response.passage.includes("3x + y = 7")) {
            return `Solve: x - 2y = 1 → x = 2y + 1. Then 3(2y + 1) + y = 7 → 7y + 3 = 7 → y = 4/7, x = 3. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("second car catch up")) {
            return `Distance = 60t. Second car: 75(t - 1). Set equal: 60t = 75(t - 1) → t = 4. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("solution to this inequality")) {
            return `4x - 3 > 9 → 4x > 12 → x > 3. Correct answer: "${correctAnswer}".`;

        // Algebra (Extremely Hard)
        } else if (questionText.includes("value of k") && response.passage.includes("vertex")) {
            return `Vertex at x = 3, y = 0. f(3) = 9 - 18 + k = 0 → k = 9. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("larger of the two numbers")) {
            return `x + y = 15, xy = 36. Quadratic: t² - 15t + 36 = 0 → t = 12 or 3. Larger = 12. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("value of k") && response.passage.includes("infinitely many solutions")) {
            return `Equations proportional: (2/-3) = (k/-9) → k = 6. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("value of h(0)")) {
            return `g(x) = x² + x - 6. Shift left 1: (x + 1), up 4: h(x) = (x + 1)² + x + 2. h(0) = 1 + 0 + 2 = 3. Correct answer: "${correctAnswer}".`;

        // Advanced Math (Mildly Hard)
        } else if (questionText.includes("value of x") && response.passage.includes("2^x")) {
            return `2^x = 16 → 2^4 = 16 → x = 4. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("population after 15 years")) {
            return `P(15) = 100 * 2^(15/5) = 100 * 2^3 = 100 * 8 = 800. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("value of x") && response.passage.includes("log₃(x)")) {
            return `log₃(x) = 2 → x = 3^2 = 9. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("sine of the smallest angle")) {
            return `Hypotenuse = √(3² + 4²) = 5. Smallest angle opposite 3: sin = 3/5. Correct answer: "${correctAnswer}".`;

        // Advanced Math (Hard)
        } else if (questionText.includes("value of x") && response.passage.includes("4^(x+1)")) {
            return `4^(x+1) = 64 → 4^(x+1) = 4^3 → x + 1 = 3 → x = 2. Correct answer: "${correctAnswer}".`; // Corrected from 1 to 2
        } else if (questionText.includes("distinct real critical points")) {
            return `f'(x) = 4x^3 - 8x = 4x(x² - 2). Roots: x = 0, ±√2. Three distinct points. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("result") && response.passage.includes("3 + 4i")) {
            return `(3 + 4i)(3 - 4i) = 9 - 16i² = 9 + 16 = 25. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("tangent of that angle")) {
            return `cos = 5/13, adjacent = 5, hypotenuse = 13. Opposite = 12. tan = 12/5. Correct answer: "${correctAnswer}".`;

        // Advanced Math (Extremely Hard)
        } else if (questionText.includes("sum of all real solutions")) {
            return `Let u = 2^x. Then u² - 5u + 4 = 0 → (u - 4)(u - 1) = 0. u = 4 → x = 2, u = 1 → x = 0. Sum = 2. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("value of x") && response.passage.includes("log₂(x)")) {
            return `log₂(x) + log₂(x - 1) = 3 → log₂(x(x - 1)) = 3 → x(x - 1) = 8 → x² - x - 8 = 0. x = (1 + √33)/2 ≈ 3. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("radius of the circle")) {
            return `Complete the square: (x - 3)² + (y + 2)² = 25. Radius = √25 = 5. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("sin(x) + cos(x) = √2")) {
            return `sin(x) + cos(x) = √2 * sin(x + π/4). sin(x + π/4) = 1 → x + π/4 = π/2 → x = π/4. One solution. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("total flight time")) {
            return `Half trip = 750 miles. Against wind: 750/500 = 1.5 hrs. With wind: 750/600 = 1.25 hrs. Total = 1.5 + 1.25 = 2.75 hrs. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("value be after 3 years")) {
            return `$30,000 * (1 - 0.15)^3 = $30,000 * 0.85^3 ≈ $19,275. Correct answer: "${correctAnswer}".`;

        // Problem Solving and Data Analysis (Mildly Hard)
        } else if (questionText.includes("percentage")) {
            return `(30 / 120) * 100 = 25%. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("average speed")) {
            return `Speed = distance / time = 240 / 4 = 60 mph. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("ratio of tea drinkers")) {
            return `Tea = 80, coffee = 120. Ratio = 80:120 = 2:3. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("amount of flour needed")) {
            return `Flour per cookie = 3 / 12 = 0.25 cups. For 20: 20 * 0.25 = 5 cups. Correct answer: "${correctAnswer}".`;

        // Problem Solving and Data Analysis (Hard)
        } else if (questionText.includes("new mean")) {
            return `Old sum = 9 * 5 = 45. New sum = 45 + 15 = 60. New mean = 60 / 6 = 10. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("hours did they work")) {
            return `40 * 12 = 480. 600 - 480 = 120. 120 / 18 = 5. Total = 40 + 5 = 45. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("empty the tank")) {
            return `Net rate = 2 - 1 = 1 gal/min. Time = 50 / 1 = 50 minutes. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("probability both are red")) {
            return `P(first red) = 5/10, P(second red) = 4/9. Total = (5/10) * (4/9) = 2/9. Correct answer: "${correctAnswer}".`;

        // Problem Solving and Data Analysis (Extremely Hard)
        } else if (questionText.includes("standard deviation of the new data set")) {
            return `Doubling values multiplies SD by 2: 4 * 2 = 8. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("expected number of non-defective units")) {
            return `Machine 1: 300 * 2 * 0.95 = 570. Machine 2: 400 * 2 * 0.97 = 776. Total = 1358. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("central angle for spring")) {
            return `Spring proportion = 150 / 500 = 0.3. Angle = 0.3 * 360 = 108 degrees. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("sales in year 4")) {
            return `Year 3: 50,000 * 2^3 = 400,000. Year 4: 400,000 * 1.5 = 600,000. Correct answer: "${correctAnswer}".`;

        // Geometry and Trigonometry (Mildly Hard)
        } else if (questionText.includes("area of the rectangle")) {
            return `Area = length * width = 8 * 5 = 40 square units. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("length of the hypotenuse") && response.passage.includes("6 and 8")) {
            return `Hypotenuse = √(6² + 8²) = √(36 + 64) = √100 = 10. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("circumference of the circle")) {
            return `Circumference = 2πr = 2 * 3.14 * 7 = 43.96 units. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("leg opposite the 30° angle")) {
            return `sin(30°) = opposite / hypotenuse = 1/2. Opposite = 12 * 1/2 = 6. Correct answer: "${correctAnswer}".`;

        // Geometry and Trigonometry (Hard)
        } else if (questionText.includes("volume of the cylinder")) {
            return `Volume = πr²h = 3.14 * 3² * 10 = 3.14 * 90 = 282.6 cubic units. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("area of the larger triangle")) {
            return `Area ratio = (side ratio)² = (5/2)² = 25/4. Larger area = 8 * 25/4 = 50. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("cosine of the angle opposite")) {
            return `Other leg = √(13² - 5²) = 12. cos = adjacent / hypotenuse = 12/13. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("area of the sector")) {
            return `Area = (θ/360) * πr² = (60/360) * 3.14 * 6² = (1/6) * 113.04 = 18.84. Correct answer: "${correctAnswer}".`;

        // Geometry and Trigonometry (Extremely Hard)
        } else if (questionText.includes("volume of the cone")) {
            return `Height = √(5² - 4²) = 3. Volume = (1/3)πr²h = (1/3) * 3.14 * 16 * 3 = 50.24. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("length of side AB")) {
            return `Angle C = 75°. Law of Sines: AB / sin(75°) = 10 / sin(45°). AB = 10√6 / (√2 + √3). Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("shortest distance from P")) {
            return `Original slope = 2, rotated slope = -1/2. New line: y = (-1/2)x. Distance from (3, -4) = |(-1/2)(3) - 4 - 0| / √(1 + 1/4) = 1. Correct answer: "${correctAnswer}".`;
        } else if (questionText.includes("distinct solutions") && response.passage.includes("2sin²(x)")) {
            return `Let u = sin(x). 2u² - u - 1 = 0 → (2u + 1)(u - 1) = 0. u = -1/2 (x = 7π/6, 11π/6), u = 1 (no solution). Two solutions. Correct answer: "${correctAnswer}".`;
        }
    }

    // Fallback for unhandled questions
    return `The correct answer is "${correctAnswer}" based on the passage and question context.`;
}
// Test distribution
const distribution = { A: 0, B: 0, C: 0, D: 0 };
allQuestions.forEach(q => {
    const correctLetter = ['A', 'B', 'C', 'D'][q.answers.findIndex(a => a.correct)];
    distribution[correctLetter]++;
});
console.log("Distribution:", distribution);

function handleNextButton() {
    recordTestResults();
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        endModule();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar-test");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.firstElementChild.style.width = progress + "%";
}

function recordTestResults() {
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};

    for (let category in categoryStats) {
        if (!results[category]) {
            results[category] = { correct: 0, incorrect: 0 };
        }
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }

    localStorage.setItem("testResults", JSON.stringify(results));

    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Continue") {
        document.getElementById("break-message").classList.remove("hide");
        document.getElementById("question-container").classList.add("hide");
        // Do not start Math section here; wait for continueButton click
    } else {
        handleNextButton();
    }
});

continueButton.addEventListener("click", () => {
    document.getElementById("break-message").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startMathTest();
});

startTestButton.addEventListener("click", startTest);