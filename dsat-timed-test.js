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
            { text: "A) She feels out of place despite having anticipated this moment.", correct: true },
            { text: "B) She is overwhelmed by the beauty and struggles to contain excitement.", correct: false },
            { text: "C) She is intimidated by the guests and decides to leave.", correct: false },
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
            { text: "B) She had spent months refining her methods.", correct: true },
            { text: "C) The numbers refused to align.", correct: false },
            { text: "D) She sighed while reviewing the data.", correct: false },
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
            { text: "A) He suspects it may not be entirely truthful.", correct: true },
            { text: "B) He accepts it but wants more details.", correct: false },
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
    }



];

const mathQuestions = [
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
            { text: "B) 29", correct: true },
            { text: "C) 31", correct: false },
            { text: "D) 25", correct: false }
        ],
        difficulty: "easy",
        category: "algebra"
    },
    {
        passage: "",
        question: "A company rents out bicycles for a flat fee of $12 plus $3 per hour. If a customer has $45 to spend, what is the maximum number of hours they can rent a bicycle?",
        answers: [
            { text: "A) 10 hours", correct: false },
            { text: "B) 11 hours", correct: false },
            { text: "C) 9 hours", correct: true },
            { text: "D) 8 hours", correct: false }
        ],
        difficulty: "medium",
        category: "algebra"
    },
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

function generateExplanation(response) {
    const questionText = response.question;

    // Mildly Hard Explanations
    if (questionText.includes("best supports the idea that Dr. Patel is persistent")) {
        return "Her months of refining methods show persistence despite setbacks.";
    } else if (questionText.includes("best indicates the explorer’s motivation")) {
        return "Pressing on driven by tales of a hidden temple directly shows his motivation.";
    } else if (questionText.includes("best demonstrates Clara overcoming her initial nervousness")) {
        return "Her voice growing steadier after being shaky shows she overcomes nervousness.";
    } else if (questionText.includes("best supports the baker’s commitment to his work")) {
        return "Pausing only briefly before returning to work highlights his commitment.";

    // Hard Explanations
    } else if (questionText.includes("best supports the economist’s credibility")) {
        return "Countering critics with multi-year evidence demonstrates her credibility.";
    } else if (questionText.includes("most clearly shows the climber’s resilience")) {
        return "Ignoring the wind and pushing upward directly shows her resilience.";
    } else if (questionText.includes("best strengthens the historian’s argument")) {
        return "Pointing to overlooked correspondence provides concrete support for her argument.";
    } else if (questionText.includes("best justifies the engineer’s confidence")) {
        return "Citing stress test results offers evidence backing her confidence.";

    // Extremely Hard Explanations
    } else if (questionText.includes("most directly undermines the team’s contamination hypothesis")) {
        return "Noting sterile conditions directly counters the idea of contamination.";
    } else if (questionText.includes("most effectively counters the critics’ accusation of stalling")) {
        return "Referencing an overlooked clause shows purposeful action, not stalling.";
    } else if (questionText.includes("most directly supports the poet’s explanation of her style")) {
        return "Her letter stating disorder was deliberate directly supports her explanation.";
    } else if (questionText.includes("most strongly refutes the peers’ suggestion of rounding errors")) {
        return "The calibration log confirming precision directly refutes rounding errors.";
    } 
       
        else if (questionText.includes("central idea of the passage") && response.passage.includes("old lighthouse")) {
            return "The lighthouse’s endurance despite storms highlights resilience.";
        } else if (questionText.includes("main idea conveyed by the passage") && response.passage.includes("annual harvest festival")) {
            return "The festival emphasizes community bonds over material gain.";
        } else if (questionText.includes("central theme of the passage") && response.passage.includes("inventor toiled")) {
            return "The inventor’s persistence through failure drives innovation.";
        } else if (questionText.includes("primary idea of the passage") && response.passage.includes("river wound through the valley")) {
            return "The river is central to the valley’s existence and identity.";
    
        // Hard Explanations (Central Ideas)
        } else if (questionText.includes("central idea of the passage") && response.passage.includes("playwright crafted")) {
            return "The playwright aims to redefine historical narratives.";
        } else if (questionText.includes("main idea of the passage") && response.passage.includes("desert stretched endlessly")) {
            return "The nomads’ survival hinges on deep environmental knowledge.";
        } else if (questionText.includes("central theme of the passage") && response.passage.includes("librarian curated")) {
            return "The librarian champions literature’s timeless impact.";
        } else if (questionText.includes("primary idea of the passage") && response.passage.includes("climber scaled the peak")) {
            return "The climb reveals the climber’s inner growth over external triumph.";
    
        // Extremely Hard Explanations (Central Ideas)
        } else if (questionText.includes("central idea of the passage") && response.passage.includes("philosopher argued")) {
            return "The philosopher posits truth as a subjective, perceptual construct.";
        } else if (questionText.includes("main idea of the passage") && response.passage.includes("artist painted decay")) {
            return "The artist links beauty with life’s transient nature.";
        } else if (questionText.includes("central theme of the passage") && response.passage.includes("economist viewed markets")) {
            return "The economist warns of markets’ vulnerability to imbalance.";
        } else if (questionText.includes("primary idea of the passage") && response.passage.includes("linguist traced language")) {
            return "The linguist sees language as a dynamic, negotiated process.";
        }
            // Mildly Hard Explanations (Inferences)
    else if (questionText.includes("inferred about the farmer’s attitude")) {
        return "His return to work with a grunt implies determination despite the drought.";
    } else if (questionText.includes("inferred about the librarian’s feelings")) {
        return "Her smile and prominent display suggest she cherishes the older books.";
    } else if (questionText.includes("inferred about the runner’s approach")) {
        return "Stretching longer after a loss implies greater care in preparation.";
    } else if (questionText.includes("inferred about the painter’s response")) {
        return "Adding crimson despite advice shows she prioritizes her own vision.";

    // Hard Explanations (Inferences)
    } else if (questionText.includes("inferred about the detective’s view")) {
        return "Noting the broken lock suggests he doubts the accident claim.";
    } else if (questionText.includes("inferred about the scientist’s reaction")) {
        return "Frowning and double-checking imply unease and a need to resolve anomalies.";
    } else if (questionText.includes("inferred about the merchant’s business strategy")) {
        return "Grinning despite fewer sales suggests he values profit over volume.";
    } else if (questionText.includes("inferred about the teacher’s perception")) {
        return "Assigning a solo project implies she sees untapped potential.";

    // Extremely Hard Explanations (Inferences)
    } else if (questionText.includes("inferred about the diplomat’s strategy")) {
        return "A surprise compromise amid tension suggests a calculated move for control.";
    } else if (questionText.includes("inferred about the poet’s creative process")) {
        return "Burning drafts and rejecting perfection imply she values raw imperfection.";
    } else if (questionText.includes("inferred about the engineer’s priorities")) {
        return "Delaying for a tweak shows precision trumps investor pressure.";
    } else if (questionText.includes("inferred about the historian’s approach")) {
        return "Focusing on one letter to upend a theory implies insight from detail.";
    }
        // Mildly Hard Explanations (Words in Context)
        else if (questionText.includes("what does 'elevate' most nearly mean")) {
            return "'Elevate' means to improve the sauce’s flavor, enhancing its quality.";
        } else if (questionText.includes("what does 'survey' most nearly mean")) {
            return "'Survey' means to observe the landscape, taking it in visually.";
        } else if (questionText.includes("what does 'refine' most nearly mean")) {
            return "'Refine' means to perfect the chaotic notes into a polished draft.";
        } else if (questionText.includes("what does 'restore' most nearly mean")) {
            return "'Restore' means to reestablish order in the neglected yard.";
    
        // Hard Explanations (Words in Context)
        } else if (questionText.includes("what does 'illuminated' most nearly mean")) {
            return "'Illuminated' means to explain theories clearly, making them understandable.";
        } else if (questionText.includes("what does 'penetrate' most nearly mean")) {
            return "'Penetrate' means to break through her composed demeanor, breaching it.";
        } else if (questionText.includes("what does 'synthesis' most nearly mean")) {
            return "'Synthesis' means a combination of art and utility in the design.";
        } else if (questionText.includes("what does 'defying' most nearly mean")) {
            return "'Defying' means resisting the rigid structure of the original score.";
    
        // Extremely Hard Explanations (Words in Context)
        } else if (questionText.includes("what does 'eludes' most nearly mean")) {
            return "'Eludes' means truth evades rigid definitions, slipping away.";
        } else if (questionText.includes("what does 'undermine' most nearly mean")) {
            return "'Undermine' means to weaken the research’s conclusions, not fully disprove.";
        } else if (questionText.includes("what does 'imbued' most nearly mean")) {
            return "'Imbued' means infused with layers of meaning in her lines.";
        } else if (questionText.includes("what does 'entrenched' most nearly mean")) {
            return "'Entrenched' means deeply established views held by her peers.";
        }
            // Mildly Hard Explanations (Text Structure and Purpose)
    else if (questionText.includes("primary purpose") && response.passage.includes("old bridge")) {
        return "The passage describes the bridge’s state and its ongoing assessment.";
    } else if (questionText.includes("primarily structured") && response.passage.includes("festival began")) {
        return "The passage follows the festival’s timeline from start to end.";
    } else if (questionText.includes("main purpose") && response.passage.includes("rainforests teem")) {
        return "The passage shows deforestation’s effects and pushes conservation.";
    } else if (questionText.includes("primarily structured") && response.passage.includes("recipe starts")) {
        return "The passage lists baking steps in order.";

    // Hard Explanations (Text Structure and Purpose)
    } else if (questionText.includes("primarily structured") && response.passage.includes("explorer’s journal")) {
        return "The passage tracks her emotional shift over time.";
    } else if (questionText.includes("primary purpose") && response.passage.includes("urban sprawl")) {
        return "The passage explores sprawl’s downsides and offers a solution.";
    } else if (questionText.includes("primarily structured") && response.passage.includes("novel opens")) {
        return "The passage follows the mystery’s progression chapter by chapter.";
    } else if (questionText.includes("main purpose") && response.passage.includes("climate change accelerates")) {
        return "The passage warns of climate impacts and calls for solutions.";

    // Extremely Hard Explanations (Text Structure and Purpose)
    } else if (questionText.includes("primarily structured") && response.passage.includes("essay starts with a paradox")) {
        return "The passage ties freedom across eras around a central theme.";
    } else if (questionText.includes("primary purpose") && response.passage.includes("poetry, she writes")) {
        return "The passage reveals her intent to reflect life’s ups and downs.";
    } else if (questionText.includes("primarily structured") && response.passage.includes("study lists data")) {
        return "The passage mixes stats and story to make a point.";
    } else if (questionText.includes("main purpose") && response.passage.includes("history, he argues")) {
        return "The passage aims to rethink history with linked examples.";
    }
    

    return "No specific explanation available.";
}

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