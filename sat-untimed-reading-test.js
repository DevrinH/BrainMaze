const passageElement = document.getElementById("passage");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const satIntroContainer = document.getElementById("sat-intro-container");
const startTestButton = document.getElementById("start-test-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {};
let results = localStorage.getItem("testResults");
results = results ? JSON.parse(results) : {};
let userResponses = [];

const readingWritingQuestions = [
    {
        passage: "Emma stepped into the grand ballroom, her gown brushing against the polished floor as chandeliers cast golden light across the room. The guests moved with ease, their conversations flowing effortlessly. She had imagined this moment countless times, yet standing there now, a strange unease settled in her chest. Adjusting her gloves, she forced a smile and took a hesitant step forward, unsure if she truly belonged.",
        question: "What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "A) She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "B) She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "C) She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "D) She is eager to impress others and makes a confident entrance into the event.", correct: false },
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
            { text: "B) He is uninterested in the work and only took the job for financial reasons.", correct: false },
            { text: "C) He is confident that he will excel without any major challenges.", correct: false },
            { text: "D) He regrets accepting the position and is considering quitting.", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "inference"
    },

//Command of Evidence EASY

    {
        passage: "The nutritionist argued that plant-based diets improve heart health, pointing to studies showing lower cholesterol levels among vegetarians. She noted that these diets often reduce saturated fat intake, a key factor in cardiovascular disease.",
        question: "Which of the following pieces of evidence from the passage best supports the nutritionist’s claim that plant-based diets benefit heart health?",
        answers: [
            { text: "A) 'studies showing lower cholesterol levels among vegetarians'", correct: true },
            { text: "B) 'The nutritionist argued that plant-based diets improve heart health'", correct: false },
            { text: "C) 'these diets often reduce saturated fat intake'", correct: false },
            { text: "D) 'a key factor in cardiovascular disease'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "command-of-evidence"
    },
    {
        passage: "The historian suggested that trade routes shaped ancient cities, emphasizing how access to goods spurred population growth. She cited evidence of bustling markets in cities like Damascus, located along key trade paths.",
        question: "Which of the following pieces of evidence from the passage best supports the idea that trade routes influenced urban development?",
        answers: [
            { text: "A) 'evidence of bustling markets in cities like Damascus, located along key trade paths'", correct: true },
            { text: "B) 'The historian suggested that trade routes shaped ancient cities'", correct: false },
            { text: "C) 'access to goods spurred population growth'", correct: false },
            { text: "D) 'emphasizing how access to goods'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "command-of-evidence"
    },
    {
        passage: "The ecologist claimed that urban green spaces reduce stress, referencing surveys where residents near parks reported better mental well-being. She also mentioned that trees filter air pollutants, improving overall health.",
        question: "Which of the following pieces of evidence from the passage best supports the ecologist’s claim about stress reduction?",
        answers: [
            { text: "A) 'surveys where residents near parks reported better mental well-being'", correct: true },
            { text: "B) 'The ecologist claimed that urban green spaces reduce stress'", correct: false },
            { text: "C) 'trees filter air pollutants'", correct: false },
            { text: "D) 'improving overall health'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "command-of-evidence"
    },
    {
        passage: "The economist asserted that remote work boosts productivity, citing data from firms showing a 15% increase in output after adopting flexible schedules. She added that reduced commuting time allows for more focused effort.",
        question: "Which of the following pieces of evidence from the passage best supports the economist’s assertion about productivity?",
        answers: [
            { text: "A) 'data from firms showing a 15% increase in output after adopting flexible schedules'", correct: true },
            { text: "B) 'The economist asserted that remote work boosts productivity'", correct: false },
            { text: "C) 'reduced commuting time allows for more focused effort'", correct: false },
            { text: "D) 'after adopting flexible schedules'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "command-of-evidence"
    },
    {
        passage: "The educator argued that smaller class sizes enhance learning, pointing to test scores that rose by 10% in reduced-size classrooms. She also noted that teachers could offer more individualized attention.",
        question: "Which of the following pieces of evidence from the passage best supports the educator’s argument about enhanced learning?",
        answers: [
            { text: "A) 'test scores that rose by 10% in reduced-size classrooms'", correct: true },
            { text: "B) 'The educator argued that smaller class sizes enhance learning'", correct: false },
            { text: "C) 'teachers could offer more individualized attention'", correct: false },
            { text: "D) 'in reduced-size classrooms'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "command-of-evidence"
    },
    {
        passage: "The biologist proposed that invasive species disrupt ecosystems, highlighting data showing a 20% decline in native fish populations after zebra mussels arrived. She also mentioned their rapid reproduction rates.",
        question: "Which of the following pieces of evidence from the passage best supports the biologist’s proposal about ecosystem disruption?",
        answers: [
            { text: "A) 'data showing a 20% decline in native fish populations after zebra mussels arrived'", correct: true },
            { text: "B) 'The biologist proposed that invasive species disrupt ecosystems'", correct: false },
            { text: "C) 'their rapid reproduction rates'", correct: false },
            { text: "D) 'after zebra mussels arrived'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "command-of-evidence"
    },


    //Coomand of Evidence MEDIUM
    {
        passage: "Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript. Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind. He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.",
        question: "Which choice provides the best evidence for the idea that Liam is uncertain about his work?",
        answers: [
            { text: "A) 'Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind.'", correct: true },
            { text: "B) 'He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.'", correct: false },
            { text: "C) 'Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript.'", correct: false },
            { text: "D) 'He had imagined this moment countless times, picturing the satisfaction of a completed draft.'", correct: false },
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    {
        passage: "The scientist adjusted her glasses, peering at the data displayed on the screen. The results were unexpected—far different from what she and her team had predicted. She tapped her fingers against the desk, reviewing each calculation. There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.",
        question: "Which sentence best supports the idea that the scientist is struggling to accept her findings?",
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
    
    {
        passage: "Dr. Evelyn adjusted her telescope, her heart pounding. For years, she had tracked the celestial anomaly, and tonight was the closest it had ever been. But as she peered through the lens, a flicker of doubt crept in—was this truly an anomaly, or had she miscalculated? The data seemed inconsistent, the patterns slightly off. She hesitated before recording her findings, torn between excitement and uncertainty.",
        question: "Which choice provides the best evidence that Dr. Evelyn questions the validity of her findings?",
        answers: [
            { text: "A) 'But as she peered through the lens, a flicker of doubt crept in—was this truly an anomaly, or had she miscalculated?'",correct: true },
            { text: "B) 'For years, she had tracked the celestial anomaly, and tonight was the closest it had ever been.'", correct: false },
            { text: "C) 'She hesitated before recording her findings, torn between excitement and uncertainty.'", correct: false },
            { text: "D) 'The data seemed inconsistent, the patterns slightly off.'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    {
        passage: "Jonah scanned the ancient manuscript, tracing his fingers over the faded ink. His mentor had always insisted that the text contained hidden wisdom, yet certain phrases seemed deliberately obscured. He furrowed his brow. Was he interpreting the words correctly, or was he merely seeing what he wanted to see? He turned the page, wary of his own biases.",
        question: "Which choice provides the best evidence that Jonah is uncertain about his interpretation?",
        answers: [
            { text: "A) 'Was he interpreting the words correctly, or was he merely seeing what he wanted to see?'",correct: true },
            { text: "B) 'Jonah scanned the ancient manuscript, tracing his fingers over the faded ink.'", correct: false },
            { text: "C) 'His mentor had always insisted that the text contained hidden wisdom.'", correct: false },
            { text: "D) 'He turned the page, wary of his own biases.'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    {
        passage: "Amara hesitated before stepping onto the podium. The speech she had rehearsed was logical and well-structured, but a nagging feeling told her she was missing something. The audience’s expectant silence pressed down on her. Had she truly captured the full complexity of the issue, or had she oversimplified the nuances?",
        question: "Which choice provides the best evidence that Amara doubts the completeness of her speech?",
        answers: [
            { text: "A) 'Had she truly captured the full complexity of the issue, or had she oversimplified the nuances?'",correct: true },
            { text: "B) 'Amara hesitated before stepping onto the podium.'", correct: false },
            { text: "C) 'The speech she had rehearsed was logical and well-structured.'", correct: false },
            { text: "D) 'The audience’s expectant silence pressed down on her.'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    {
        passage: "The historian paused, her pen hovering above the page. She had gathered extensive accounts of the battle, but discrepancies lurked within them. Different sources provided conflicting details—one claimed the general had led the charge personally, another suggested he had remained at the rear. She sighed, unsure which version aligned with the truth.",
        question: "Which choice provides the best evidence that the historian is uncertain about the accuracy of the sources?",
        answers: [
            { text: "A) 'She sighed, unsure which version aligned with the truth.'", correct: true },
            { text: "B) 'The historian paused, her pen hovering above the page.'", correct: false },
            { text: "C) 'Different sources provided conflicting details.'", correct: false },
            { text: "D) 'One claimed the general had led the charge personally, another suggested he had remained at the rear.'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },
    {
        passage: "Nia stepped back from her canvas, tilting her head. She had envisioned the painting as a bold statement, yet now, something felt off. The colors clashed in unexpected ways, and the balance seemed unsteady. She bit her lip, wondering if she had lost sight of her original vision or if she was being too harsh on herself.",
        question: "Which choice provides the best evidence that Nia is second-guessing her artistic choices?",
        answers: [
            { text: "A) 'She bit her lip, wondering if she had lost sight of her original vision or if she was being too harsh on herself.'", correct: true },
            { text: "B) 'Nia stepped back from her canvas, tilting her head.'", correct: false },
            { text: "C) 'The colors clashed in unexpected ways, and the balance seemed unsteady.'", correct: false },
            { text: "D) 'She had envisioned the painting as a bold statement, yet now, something felt off.'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "command-of-evidence"
    },

    //Command of evidence HARD

    {
        passage: "Dr. Voss scrutinized the fossil record, noting a sudden proliferation of species following mass extinctions. She posited that these events, though catastrophic, spurred evolutionary innovation by clearing ecological niches. Critics argued her view romanticized destruction, but Voss countered that the data—abrupt shifts in biodiversity metrics—suggested otherwise. Her analysis hinged on distinguishing short-term loss from long-term adaptive gains.",
        question: "Which of the following pieces of evidence from the passage best supports the claim that Dr. Voss sees mass extinctions as catalysts for evolutionary progress?",
        answers: [
            { text: "A) 'She posited that these events, though catastrophic, spurred evolutionary innovation by clearing ecological niches.'", correct: true },
            { text: "B) 'Dr. Voss scrutinized the fossil record, noting a sudden proliferation of species following mass extinctions.'", correct: false },
            { text: "C) 'Critics argued her view romanticized destruction'", correct: false },
            { text: "D) 'Her analysis hinged on distinguishing short-term loss from long-term adaptive gains.'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The economist traced wage stagnation to automation, observing that industries adopting robotics saw productivity soar while labor costs plummeted. Yet, he cautioned, the data also revealed a paradox: job growth in tech sectors offset losses elsewhere, albeit with a skill mismatch. This tension underpinned his call for retraining programs over blanket resistance to technological change.",
        question: "Which of the following pieces of evidence from the passage best supports the economist’s argument that automation’s impact on employment is complex rather than wholly negative?",
        answers: [
            { text: "A) 'job growth in tech sectors offset losses elsewhere, albeit with a skill mismatch'", correct: true },
            { text: "B) 'The economist traced wage stagnation to automation'", correct: false },
            { text: "C) 'industries adopting robotics saw productivity soar while labor costs plummeted'", correct: false },
            { text: "D) 'his call for retraining programs over blanket resistance to technological change'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The poet’s latest work baffled reviewers with its dense allusions to obscure myths, yet she insisted this opacity enriched the text’s meaning. Her defenders pointed to reader forums buzzing with interpretive debates, evidence of engagement rather than alienation. Skeptics, however, saw the complexity as a mask for incoherent intent.",
        question: "Which of the following pieces of evidence from the passage best supports the claim that the poet’s defenders view her work’s complexity as a strength?",
        answers: [
            { text: "A) 'reader forums buzzing with interpretive debates, evidence of engagement rather than alienation'", correct: true },
            { text: "B) 'The poet’s latest work baffled reviewers with its dense allusions to obscure myths'", correct: false },
            { text: "C) 'she insisted this opacity enriched the text’s meaning'", correct: false },
            { text: "D) 'Skeptics, however, saw the complexity as a mask for incoherent intent'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The biologist mapped coral bleaching to rising sea temperatures, noting that affected reefs lost 70% of their symbiotic algae within months. She argued this rapid decline threatened global marine biodiversity, though some peers suggested adaptation might mitigate the loss. Her rebuttal rested on data showing stalled recovery rates in warmer waters.",
        question: "Which of the following pieces of evidence from the passage best supports the biologist’s concern that coral bleaching poses a severe risk to marine ecosystems?",
        answers: [
            { text: "A) 'affected reefs lost 70% of their symbiotic algae within months'", correct: true },
            { text: "B) 'The biologist mapped coral bleaching to rising sea temperatures'", correct: false },
            { text: "C) 'some peers suggested adaptation might mitigate the loss'", correct: false },
            { text: "D) 'data showing stalled recovery rates in warmer waters'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The historian revisited the treaty’s legacy, arguing it sowed discord by redrawing borders without regard for ethnic ties. Contemporary accounts described chaos—villages split, families displaced—but later scholars noted economic gains in the reshaped regions. She maintained that these gains masked deeper social fractures.",
        question: "Which of the following pieces of evidence from the passage best supports the historian’s view that the treaty’s border changes had lasting negative consequences?",
        answers: [
            { text: "A) 'Contemporary accounts described chaos—villages split, families displaced'", correct: true },
            { text: "B) 'The historian revisited the treaty’s legacy, arguing it sowed discord'", correct: false },
            { text: "C) 'later scholars noted economic gains in the reshaped regions'", correct: false },
            { text: "D) 'She maintained that these gains masked deeper social fractures'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
    {
        passage: "The physicist proposed that dark matter influences galaxy formation more than previously thought, citing simulations where its density dictated star clustering patterns. Critics questioned the model’s assumptions, but she highlighted observational data—galactic rotations defying standard gravity—as corroboration. The debate underscored her reliance on indirect evidence.",
        question: "Which of the following pieces of evidence from the passage best supports the physicist’s assertion that dark matter plays a critical role in galaxy formation?",
        answers: [
            { text: "A) 'simulations where its density dictated star clustering patterns'", correct: true },
            { text: "B) 'The physicist proposed that dark matter influences galaxy formation'", correct: false },
            { text: "C) 'Critics questioned the model’s assumptions'", correct: false },
            { text: "D) 'observational data—galactic rotations defying standard gravity'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "command-of-evidence"
    },
//Central Ideas EASY 

    {
        passage: "The librarian promoted reading programs to boost community engagement, noting that book clubs doubled attendance at library events. She believed these efforts built stronger social ties among residents.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) Reading programs strengthen community connections through increased participation.", correct: true },
            { text: "B) Book clubs are the most popular library events.", correct: false },
            { text: "C) Libraries need more funding for reading programs.", correct: false },
            { text: "D) Social ties depend entirely on library attendance.", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "central-ideas"
    },
    {
        passage: "The gardener explained that composting reduces waste, highlighting how it turns kitchen scraps into nutrient-rich soil. She also mentioned that it lowers the need for chemical fertilizers.",
        question: "Which detail from the passage best supports the gardener’s explanation of waste reduction?",
        answers: [
            { text: "A) 'turns kitchen scraps into nutrient-rich soil'", correct: true },
            { text: "B) 'The gardener explained that composting reduces waste'", correct: false },
            { text: "C) 'lowers the need for chemical fertilizers'", correct: false },
            { text: "D) 'nutrient-rich soil'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "central-ideas"
    },
    {
        passage: "The coach emphasized teamwork in sports, stating that coordinated plays often lead to victories. He pointed to a recent game where collaboration scored the winning goal.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) Teamwork is key to success in sports through effective coordination.", correct: true },
            { text: "B) Winning games depends only on scoring goals.", correct: false },
            { text: "C) Coaches must focus on individual skills over teamwork.", correct: false },
            { text: "D) Collaboration is less important than strategy.", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "central-ideas"
    },
    {
        passage: "The teacher argued that hands-on projects improve science learning, noting that students who built models scored higher on tests. She added that these activities make lessons more engaging.",
        question: "Which detail from the passage best supports the teacher’s argument about improved learning?",
        answers: [
            { text: "A) 'students who built models scored higher on tests'", correct: true },
            { text: "B) 'The teacher argued that hands-on projects improve science learning'", correct: false },
            { text: "C) 'these activities make lessons more engaging'", correct: false },
            { text: "D) 'built models'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "central-ideas"
    },
    {
        passage: "The chef promoted local ingredients, claiming they enhance dish flavors with freshness. He cited a survey where diners preferred meals made with nearby produce.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) Local ingredients improve food quality due to their freshness.", correct: true },
            { text: "B) Diners always prefer nearby produce over imported goods.", correct: false },
            { text: "C) Freshness is the only factor in dish flavor.", correct: false },
            { text: "D) Chefs must use surveys to choose ingredients.", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "central-ideas"
    },
    {
        passage: "The musician valued practice, asserting it sharpens performance skills. She mentioned that daily rehearsals helped her master a difficult piece for a concert.",
        question: "Which detail from the passage best supports the musician’s assertion about sharpening skills?",
        answers: [
            { text: "A) 'daily rehearsals helped her master a difficult piece'", correct: true },
            { text: "B) 'The musician valued practice'", correct: false },
            { text: "C) 'asserting it sharpens performance skills'", correct: false },
            { text: "D) 'for a concert'", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "central-ideas"
    },


//Central Ideas Medium 
    {
        passage: "Dr. Evelyn stared at the data flickering on her screen, a pattern she’d chased for months now glaring back at her. The anomaly was undeniable – a spike where none should exist – yet she hesitated to call it a breakthrough. In her mind, a question gnawed: was this truly an anomaly, or had she miscalculated? The implications were staggering, potentially upending decades of atmospheric research, but the weight of that possibility made her pause. She traced the numbers again, her confidence wavering as the screen’s glow cast shadows across her furrowed brow.",
        question: "Which of the following pieces of evidence from the passage best supports the idea that Dr. Evelyn questions the validity of her findings?",
        answers: [
            { text: "A) 'In her mind, a question gnawed: was this truly an anomaly, or had she miscalculated?'", correct: true },
            { text: "B) 'Dr. Evelyn stared at the data flickering on her screen, a pattern she’d chased for months now glaring back at her.'", correct: false },
            { text: "C) 'yet she hesitated to call it a breakthrough'", correct: false },
            { text: "D) 'The anomaly was undeniable – a spike where none should exist'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "central-ideas"
    },
    {
        passage: "Jonah pored over the ancient manuscript, its faded ink a puzzle he’d vowed to solve. His mentor had dismissed it as folklore, but Jonah saw meaning in the cryptic phrases – or thought he did. Was he interpreting the words correctly, or was he merely seeing what he wanted to see? He set the text aside, aware that his bias toward discovery might cloud his judgment, and resolved to cross-check it against other sources before drawing conclusions.",
        question: "Which of the following pieces of evidence from the passage best supports the idea that Jonah is uncertain about his interpretation of the manuscript?",
        answers: [
            { text: "A) 'Was he interpreting the words correctly, or was he merely seeing what he wanted to see?'", correct: true },
            { text: "B) 'He set the text aside'", correct: false },
            { text: "C) 'His mentor had dismissed it as folklore'", correct: false },
            { text: "D) 'aware that his bias toward discovery might cloud his judgment'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "central-ideas"
    },
    {
        passage: "Amara stood before the crowd, her speech echoing through the hall with a clarity that belied her inner turmoil. She’d crafted each word to inspire, yet as applause swelled, she faltered. Had she truly captured the full complexity of the issue, or had she oversimplified the nuances? The stakes were high – policy would shift based on her address – and the expectation of her peers pressed heavily, urging perfection where she feared she’d fallen short.",
        question: "Which of the following pieces of evidence from the passage best supports the idea that Amara doubts the completeness of her speech?",
        answers: [
            { text: "A) 'Had she truly captured the full complexity of the issue, or had she oversimplified the nuances?'", correct: true },
            { text: "B) 'yet as applause swelled, she faltered'", correct: false },
            { text: "C) 'her speech echoing through the hall with a clarity'", correct: false },
            { text: "D) 'the expectation of her peers pressed heavily'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "central-ideas"
    },
    {
        passage: "The historian leaned back in her chair, surrounded by maps and letters from a forgotten era. Two primary sources told conflicting tales of the same event – one of triumph, the other of betrayal. She sighed, unsure which version aligned with the truth, if either did. Dates mismatched, names blurred into aliases, and motives tangled like vines across the centuries, leaving her to question whether the past could ever be fully known.",
        question: "Which of the following pieces of evidence from the passage best supports the idea that the historian is uncertain about the accuracy of the sources?",
        answers: [
            { text: "A) 'She sighed, unsure which version aligned with the truth'", correct: true },
            { text: "B) 'The historian leaned back in her chair'", correct: false },
            { text: "C) 'Two primary sources told conflicting tales of the same event'", correct: false },
            { text: "D) 'Dates mismatched, names blurred into aliases'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "central-ideas"
    },
    {
        passage: "Nia stepped back from the canvas, paintbrush trembling in her hand. The colors clashed in ways she hadn’t intended, and the composition felt off – too chaotic, perhaps, or not chaotic enough. She stared, wondering if she had lost sight of her original vision or if she was being too harsh on herself. The gallery opening loomed, amplifying every flaw, yet she couldn’t decide if the work was unfinished or simply imperfect.",
        question: "Which of the following pieces of evidence from the passage best supports the idea that Nia is second-guessing her artistic choices?",
        answers: [
            { text: "A) 'wondering if she had lost sight of her original vision or if she was being too harsh on herself'", correct: true },
            { text: "B) 'Nia stepped back from the canvas'", correct: false },
            { text: "C) 'The colors clashed in ways she hadn’t intended'", correct: false },
            { text: "D) 'the composition felt off'", correct: false }
        ],
        type: "reading",
        difficulty: "medium",
        category: "central-ideas"
    },
    //Central Ideas HARD

    {
        passage: "The urban theorist examined sprawl through a dual lens: as both a symptom of economic ambition and a catalyst for ecological decay. She argued that unchecked expansion devoured green spaces, yet simultaneously spurred innovations in infrastructure—highways and utilities threading through once-rural landscapes. This paradox, she suggested, demanded a reevaluation of growth’s true cost, beyond mere profit.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) Urban sprawl embodies a complex trade-off between economic progress and environmental loss, necessitating a deeper assessment of its impacts.", correct: true },
            { text: "B) Urban sprawl primarily benefits infrastructure development while neglecting ecological consequences.", correct: false },
            { text: "C) Economic ambition drives urban sprawl, overshadowing its potential for sustainable innovation.", correct: false },
            { text: "D) The ecological decay caused by urban sprawl outweighs any infrastructural gains it may provide.", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "central-ideas"
    },
    {
        passage: "The linguist traced slang’s evolution across decades, noting its roots in subcultures often dismissed as fringe. She contended that these informal lexicons, far from diluting language, enriched it by encoding resilience and identity—terms like ‘cool’ shifting from jazz circles to global vernacular. Yet, she warned, their rapid adoption risked eroding their original depth.",
        question: "Which detail from the passage best illustrates the linguist’s view that slang enhances language?",
        answers: [
            { text: "A) 'enriched it by encoding resilience and identity'", correct: true },
            { text: "B) 'noting its roots in subcultures often dismissed as fringe'", correct: false },
            { text: "C) 'terms like ‘cool’ shifting from jazz circles to global vernacular'", correct: false },
            { text: "D) 'their rapid adoption risked eroding their original depth'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "central-ideas"
    },
    {
        passage: "The ecologist studied invasive species, framing them as both disruptors and unwitting architects of ecosystems. She highlighted cases where non-native plants stabilized soil after disasters, yet disrupted native pollinators by outcompeting local flora. This duality, she argued, challenged simplistic narratives of ecological harm, urging a more granular understanding of adaptation.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) Invasive species play a multifaceted role in ecosystems, complicating traditional views of their ecological impact.", correct: true },
            { text: "B) Invasive species primarily benefit ecosystems by stabilizing environments after disruptions.", correct: false },
            { text: "C) The ecological harm from invasive species stems mainly from their competition with native plants.", correct: false },
            { text: "D) Adaptation to invasive species requires prioritizing their removal over studying their benefits.", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "central-ideas"
    },
    {
        passage: "The historian reinterpreted the industrial boom, casting it as a double-edged sword: a forge of progress that also hammered social bonds into fragments. She cited factory towns where wealth surged alongside child labor, and mechanization that boosted output while fracturing artisanal traditions. Her narrative wove these threads into a cautionary tapestry of modernity’s price.",
        question: "Which detail from the passage best supports the historian’s perspective that industrialization had significant social costs?",
        answers: [
            { text: "A) 'factory towns where wealth surged alongside child labor'", correct: true },
            { text: "B) 'a forge of progress that also hammered social bonds into fragments'", correct: false },
            { text: "C) 'mechanization that boosted output while fracturing artisanal traditions'", correct: false },
            { text: "D) 'Her narrative wove these threads into a cautionary tapestry'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "central-ideas"
    },
    {
        passage: "The physicist probed quantum entanglement, portraying it as a phenomenon that defies classical intuition yet anchors modern technology. She described particles linked across vast distances, their states instantaneously correlated—a spooky dance that baffled early theorists. Still, she emphasized, this strangeness powers quantum computing, hinting at a future where the bizarre becomes banal.",
        question: "What is the central idea of the passage?",
        answers: [
            { text: "A) Quantum entanglement, though counterintuitive, bridges theoretical mystery and practical innovation in technology.", correct: true },
            { text: "B) Quantum entanglement’s primary significance lies in its challenge to classical physics.", correct: false },
            { text: "C) The technological applications of quantum entanglement overshadow its theoretical complexity.", correct: false },
            { text: "D) Early theorists’ confusion about quantum entanglement delayed its use in modern computing.", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "central-ideas"
    },
    {
        passage: "The sociologist dissected gentrification, framing it as a process that polishes neighborhoods while sanding away their cultural grain. She pointed to rising property values that lured affluent newcomers, yet displaced long-time residents—coffee shops sprouting where bodegas once stood. Her analysis urged policymakers to weigh revitalization against erasure.",
        question: "Which detail from the passage best exemplifies the sociologist’s concern that gentrification erodes cultural identity?",
        answers: [
            { text: "A) 'coffee shops sprouting where bodegas once stood'", correct: true },
            { text: "B) 'rising property values that lured affluent newcomers'", correct: false },
            { text: "C) 'a process that polishes neighborhoods while sanding away their cultural grain'", correct: false },
            { text: "D) 'Her analysis urged policymakers to weigh revitalization against erasure'", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "central-ideas"
    },
    {
        passage: "Dr. Aris Thorne surveyed the labyrinthine network of wires snaking across his laboratory floor. Years he'd spent chasing this phantom signal, this whisper from the void. Colleagues called it obsession, funders called it folly, but Thorne knew it was the key. The latest readings, however, showed an anomaly – not the structured pattern he sought, but a chaotic surge, mirroring the electrical storm raging outside. He adjusted a dial, his knuckles white. Was this interference, or was it something... responding?",
        question: "The passage implies that Dr. Thorne's reaction to the anomaly is primarily one of:",
        answers: [
            { text: "A) Frustration that external factors are corrupting his data.", correct: false },
            { text: "B) Resignation to the likelihood that his project is a failure.", correct: false },
            { text: "C) Cautious apprehension mixed with a dawning sense of possibility.", correct: true },
            { text: "D) Annoyance at his colleagues for doubting his methods.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference",

    },
    {
        passage: "The old cartographer traced a faded line on the parchment map, his finger hovering over a region marked only with swirling eddies and the notation 'Hic Dracones'—Here be Dragons. 'Most ships chart a wide course around this,' he murmured, his voice raspy like dry leaves. 'They see only the warning. But look closer at the currents, the way the ink suggests hidden landmasses just beneath the waves... The warning isn't just about peril; it's about what the peril guards.'",
        question: "It can be inferred from the cartographer's words that he believes the 'Hic Dracones' notation:",
        answers: [
            { text: "A) Is an outdated symbol that no longer holds any real meaning for navigation.", correct: false },
            { text: "B) Represents not only danger but also the potential for significant discovery.", correct: true },
            { text: "C) Was intentionally drawn inaccurately to mislead rival explorers.", correct: false },
            { text: "D) Primarily indicates treacherous weather patterns common to the area.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference",

    },
    {
        passage: "Lila watched the sculptor work, his hands moving with a surety that seemed almost involuntary. He chipped away at the marble block, not imposing a form, but revealing one he insisted was already there. 'You don't *create* the statue,' he’d told her once, eyes distant, 'you simply liberate it from the stone.' Yet, Lila saw the sweat on his brow, the calculations in his gaze, the discarded sketches piling up. The liberation, it seemed, required considerable human effort and intention.",
        question: "The passage suggests that Lila's perspective on the sculptor's process is characterized by:",
        answers: [
            { text: "A) Complete acceptance of his mystical view of creation.", correct: false },
            { text: "B) Skepticism towards the artistic merit of his work.", correct: false },
            { text: "C) Dismissal of his technical skills in favor of his philosophy.", correct: false },
            { text: "D) An acknowledgement of his philosophy tempered by an awareness of the practical labor involved.", correct: true },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference",

    },
    {
        passage: "The city ordinance declared all street music illegal after 10 p.m. Yet, every Tuesday, precisely at midnight, the faint, melancholic strains of a lone violin would drift from the vicinity of the old clock tower. No one ever saw the player, and patrols reported finding nothing. Some residents complained, others left small offerings of coins or flowers near the tower's base the next morning. The music, ethereal and mournful, seemed to weave itself into the city's sleeping consciousness, a secret shared.",
        question: "What does the passage imply about the community's reaction to the violinist?",
        answers: [
            { text: "A) Universal disapproval due to the violation of the city ordinance.", correct: false },
            { text: "B) Complete indifference, as the music is barely noticeable.", correct: false },
            { text: "C) A divided response, with some tolerating or even appreciating the music despite its illegality.", correct: true },
            { text: "D) Fear and superstition, attributing the music to supernatural origins.", correct: false },
        ],
        type: "reading",
        difficulty: "hard",
        category: "inference",

    },


    
        {
            passage: "Dr. Aris Thorne surveyed the labyrinthine network of wires snaking across his laboratory floor. Years he'd spent chasing this phantom signal, this whisper from the void. Colleagues called it obsession, funders called it folly, but Thorne knew it was the key. The latest readings, however, showed an anomaly – not the structured pattern he sought, but a chaotic surge, mirroring the electrical storm raging outside. He adjusted a dial, his knuckles white. Was this interference, or was it something... responding?",
            question: "The passage implies that Dr. Thorne's reaction to the anomaly is primarily one of:",
            answers: [
                { text: "A) Frustration that external factors are corrupting his data.", correct: false },
                { text: "B) Resignation to the likelihood that his project is a failure.", correct: false },
                { text: "C) Cautious apprehension mixed with a dawning sense of possibility.", correct: true },
                { text: "D) Annoyance at his colleagues for doubting his methods.", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",

        },
        {
            passage: "The old cartographer traced a faded line on the parchment map, his finger hovering over a region marked only with swirling eddies and the notation 'Hic Dracones'—Here be Dragons. 'Most ships chart a wide course around this,' he murmured, his voice raspy like dry leaves. 'They see only the warning. But look closer at the currents, the way the ink suggests hidden landmasses just beneath the waves... The warning isn't just about peril; it's about what the peril guards.'",
            question: "It can be inferred from the cartographer's words that he believes the 'Hic Dracones' notation:",
            answers: [
                { text: "A) Is an outdated symbol that no longer holds any real meaning for navigation.", correct: false },
                { text: "B) Represents not only danger but also the potential for significant discovery.", correct: true },
                { text: "C) Was intentionally drawn inaccurately to mislead rival explorers.", correct: false },
                { text: "D) Primarily indicates treacherous weather patterns common to the area.", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",

        },
        {
            passage: "Lila watched the sculptor work, his hands moving with a surety that seemed almost involuntary. He chipped away at the marble block, not imposing a form, but revealing one he insisted was already there. 'You don't *create* the statue,' he’d told her once, eyes distant, 'you simply liberate it from the stone.' Yet, Lila saw the sweat on his brow, the calculations in his gaze, the discarded sketches piling up. The liberation, it seemed, required considerable human effort and intention.",
            question: "The passage suggests that Lila's perspective on the sculptor's process is characterized by:",
            answers: [
                { text: "A) Complete acceptance of his mystical view of creation.", correct: false },
                { text: "B) Skepticism towards the artistic merit of his work.", correct: false },
                { text: "C) Dismissal of his technical skills in favor of his philosophy.", correct: false },
                { text: "D) An acknowledgement of his philosophy tempered by an awareness of the practical labor involved.", correct: true },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",

        },
        {
            passage: "The city ordinance declared all street music illegal after 10 p.m. Yet, every Tuesday, precisely at midnight, the faint, melancholic strains of a lone violin would drift from the vicinity of the old clock tower. No one ever saw the player, and patrols reported finding nothing. Some residents complained, others left small offerings of coins or flowers near the tower's base the next morning. The music, ethereal and mournful, seemed to weave itself into the city's sleeping consciousness, a secret shared.",
            question: "What does the passage imply about the community's reaction to the violinist?",
            answers: [
                { text: "A) Universal disapproval due to the violation of the city ordinance.", correct: false },
                { text: "B) Complete indifference, as the music is barely noticeable.", correct: false },
                { text: "C) A divided response, with some tolerating or even appreciating the music despite its illegality.", correct: true },
                { text: "D) Fear and superstition, attributing the music to supernatural origins.", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",

        },
        {
            passage: "Councillor Thorne argued passionately for the new conservation initiative, citing ecological collapse and dwindling resources. His opponent, Councillor Davies, listened patiently, then rose. 'Mr. Thorne paints a dire picture,' Davies began, adjusting his tie. 'And while his concerns for our natural spaces are noted, we must also consider the immediate economic impact. Halting the North Valley development project, as his initiative demands, means jobs lost *today*, families struggling *tomorrow*. Surely, a balance can be struck that doesn't sacrifice our present prosperity for a hypothetical future.'",
            question: "The passage suggests that Councillor Davies' primary rhetorical strategy is to:",
            answers: [
                { text: "A) Directly refute Thorne's ecological data with counter-evidence.", correct: false },
                { text: "B) Question Thorne's motives for proposing the initiative.", correct: false },
                { text: "C) Appeal to the audience's immediate, practical concerns over long-term environmental issues.", correct: true },
                { text: "D) Propose a detailed alternative plan that addresses both environmental and economic needs.", correct: false },
            ],
            type: "reading",
            difficulty: "hard",
            category: "inference",
            
        },

    //Words in context EASY

        {
            passage: "The mayor’s speech was so verbose that many listeners lost interest, wishing she had kept her remarks brief and to the point.",
            question: "As used in the passage, 'verbose' most nearly means",
            answers: [
                { text: "A) wordy", correct: true },
                { text: "B) loud", correct: false },
                { text: "C) confusing", correct: false },
                { text: "D) inspiring", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "words-in-context"
        },
        {
            passage: "The hiker felt exhilarated after reaching the summit, her fatigue replaced by a surge of joy at the stunning view.",
            question: "As used in the passage, 'exhilarated' most nearly means",
            answers: [
                { text: "A) thrilled", correct: true },
                { text: "B) exhausted", correct: false },
                { text: "C) nervous", correct: false },
                { text: "D) relieved", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "words-in-context"
        },
        {
            passage: "The chef’s meticulous approach ensured every dish was perfect, with each ingredient carefully measured and arranged.",
            question: "As used in the passage, 'meticulous' most nearly means",
            answers: [
                { text: "A) precise", correct: true },
                { text: "B) creative", correct: false },
                { text: "C) quick", correct: false },
                { text: "D) casual", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "words-in-context"
        },
        {
            passage: "The debate grew contentious as both sides refused to compromise, raising their voices over each minor disagreement.",
            question: "As used in the passage, 'contentious' most nearly means",
            answers: [
                { text: "A) heated", correct: true },
                { text: "B) boring", correct: false },
                { text: "C) friendly", correct: false },
                { text: "D) quiet", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "words-in-context"
        },
        {
            passage: "The scientist’s theory seemed plausible given the initial data, though more experiments were needed to confirm it.",
            question: "As used in the passage, 'plausible' most nearly means",
            answers: [
                { text: "A) believable", correct: true },
                { text: "B) proven", correct: false },
                { text: "C) complicated", correct: false },
                { text: "D) unlikely", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "words-in-context"
        },
        {
            passage: "The old bridge was deemed obsolete after the new highway opened, no longer serving the town’s growing traffic needs.",
            question: "As used in the passage, 'obsolete' most nearly means",
            answers: [
                { text: "A) outdated", correct: true },
                { text: "B) dangerous", correct: false },
                { text: "C) sturdy", correct: false },
                { text: "D) narrow", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "words-in-context"
        },

    //Words in context MEDIUM Questions

        {
            passage: "The committee’s decision to allocate funds to the experimental project was met with vociferous opposition from the traditionalists, who argued that such untested ventures squandered resources better spent on proven methods. Yet the innovators, undeterred, pressed forward, their voices rising above the din to champion the potential of the unknown.",
            question: "As used in the passage, 'vociferous' most nearly means",
            answers: [
                { text: "A) loud and insistent", correct: true },
                { text: "B) carefully reasoned", correct: false },
                { text: "C) quietly resentful", correct: false },
                { text: "D) reluctantly supportive", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "words-in-context"
        },
        {
            passage: "Dr. Lin’s latest theory, though grounded in meticulous research, was dismissed by her peers as an ephemeral notion, unlikely to withstand the rigors of sustained scrutiny. She countered that its apparent fragility belied a resilience that would reveal itself over time, much like a seed beneath winter soil.",
            question: "As used in the passage, 'ephemeral' most nearly means",
            answers: [
                { text: "A) short-lived", correct: true },
                { text: "B) overly complex", correct: false },
                { text: "C) widely accepted", correct: false },
                { text: "D) fundamentally flawed", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "words-in-context"
        },
        {
            passage: "The diplomat navigated the negotiations with consummate skill, balancing concessions with firm resolve to secure an agreement that satisfied both parties. Her colleagues marveled at how she transformed potential discord into a harmonious accord, a testament to her years of experience.",
            question: "As used in the passage, 'consummate' most nearly means",
            answers: [
                { text: "A) highly proficient", correct: true },
                { text: "B) cautiously tentative", correct: false },
                { text: "C) aggressively confrontational", correct: false },
                { text: "D) unexpectedly fortunate", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "words-in-context"
        },
        {
            passage: "The artist’s latest exhibit was a paean to the natural world, each brushstroke celebrating the vitality of forests and rivers while subtly mourning their degradation. Critics praised the work for its emotional depth, noting how it elevated simple landscapes into profound reflections on humanity’s role.",
            question: "As used in the passage, 'paean' most nearly means",
            answers: [
                { text: "A) tribute", correct: true },
                { text: "B) critique", correct: false },
                { text: "C) imitation", correct: false },
                { text: "D) rejection", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "words-in-context"
        },
        {
            passage: "Faced with dwindling resources, the council adopted an austere budget, stripping away all but the most essential expenditures. Residents grumbled, but the council insisted that such measures were necessary to forestall financial collapse, even if they chilled the community’s usual vibrancy.",
            question: "As used in the passage, 'austere' most nearly means",
            answers: [
                { text: "A) severely simple", correct: true },
                { text: "B) recklessly extravagant", correct: false },
                { text: "C) cautiously optimistic", correct: false },
                { text: "D) deliberately deceptive", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "words-in-context"
        },

//Words in Context HARD Questions
        {
            passage: "The philosopher’s treatise was replete with abstruse arguments, weaving a labyrinth of logic that confounded even seasoned scholars. Yet, beneath this opacity lay a lucid intent: to challenge the facile assumptions of his peers.",
            question: "As used in the passage, 'abstruse' most nearly means",
            answers: [
                { text: "A) difficult to understand", correct: true },
                { text: "B) cleverly deceptive", correct: false },
                { text: "C) unnecessarily verbose", correct: false },
                { text: "D) subtly persuasive", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "words-in-context"
        },
        {
            passage: "The diplomat’s speech was an exercise in perspicuity, each word chosen to dispel the fog of misunderstanding that had long shrouded negotiations. Her clarity stood in stark relief against the obfuscation of her predecessors.",
            question: "As used in the passage, 'perspicuity' most nearly means",
            answers: [
                { text: "A) clear expression", correct: true },
                { text: "B) shrewd insight", correct: false },
                { text: "C) bold assertiveness", correct: false },
                { text: "D) intricate detail", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "words-in-context"
        },
        {
            passage: "The artist’s latest installation was a temerarious gamble, defying convention with its chaotic forms and jarring hues. Critics, however, lauded this audacity as a refreshing rupture from the staid norms of the gallery scene.",
            question: "As used in the passage, 'temerarious' most nearly means",
            answers: [
                { text: "A) recklessly bold", correct: true },
                { text: "B) quietly subversive", correct: false },
                { text: "C) meticulously planned", correct: false },
                { text: "D) unintentionally chaotic", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "words-in-context"
        },
        {
            passage: "The scientist’s hypothesis, though initially dismissed as quixotic, gained traction as experiments revealed its startling prescience. Her peers, once skeptical, now marveled at the vision that had seemed so impractical.",
            question: "As used in the passage, 'quixotic' most nearly means",
            answers: [
                { text: "A) unrealistically optimistic", correct: true },
                { text: "B) cautiously tentative", correct: false },
                { text: "C) rigorously empirical", correct: false },
                { text: "D) subtly misleading", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "words-in-context"
        },
        {
            passage: "The historian’s prose was suffused with lugubrious tones, each sentence a dirge for the lost ideals of a bygone era. Yet, this melancholy served to underscore the resilience of those who endured such times.",
            question: "As used in the passage, 'lugubrious' most nearly means",
            answers: [
                { text: "A) mournfully gloomy", correct: true },
                { text: "B) bitterly sarcastic", correct: false },
                { text: "C) dryly factual", correct: false },
                { text: "D) wistfully nostalgic", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "words-in-context"
        },
        {
            passage: "The critic excoriated the novel for its prolixity, arguing that its endless tangents diluted the narrative’s core. Fans, however, cherished these digressions as a tapestry of intricate subplots.",
            question: "As used in the passage, 'prolixity' most nearly means",
            answers: [
                { text: "A) excessive wordiness", correct: true },
                { text: "B) deliberate ambiguity", correct: false },
                { text: "C) stark simplicity", correct: false },
                { text: "D) vivid imagery", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "words-in-context"
        },

    //Text Structure EASY Questions

    {
        passage: "The travel writer began with a vivid description of a bustling market, then explained how local crafts reflect the region’s culture. Her goal was to draw readers into the area’s unique charm.",
        question: "The passage is structured primarily to",
        answers: [
            { text: "A) paint a picture of a place before connecting it to its cultural significance", correct: true },
            { text: "B) list the best markets for travelers to visit", correct: false },
            { text: "C) argue that crafts are more important than markets", correct: false },
            { text: "D) compare different regions’ cultures", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The scientist opened with a surprising fact: bees pollinate 70% of crops. She followed with details on how their decline threatens food security, aiming to highlight their critical role.",
        question: "The primary purpose of the passage is to",
        answers: [
            { text: "A) emphasize the importance of bees to agriculture", correct: true },
            { text: "B) explain how crops grow without bees", correct: false },
            { text: "C) list reasons for bee population decline", correct: false },
            { text: "D) compare bees to other pollinators", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The coach started by praising the team’s effort in a tough game, then outlined strategies that led to their win. His intent was to boost morale while reinforcing good habits.",
        question: "The passage is structured primarily to",
        answers: [
            { text: "A) commend past success before detailing what made it possible", correct: true },
            { text: "B) critique the team’s effort with new strategies", correct: false },
            { text: "C) focus only on strategies for future games", correct: false },
            { text: "D) compare the team to its opponents", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The historian described a famous battle, then noted its lasting impact on trade routes. Her aim was to show how single events can shape broader history.",
        question: "The primary purpose of the passage is to",
        answers: [
            { text: "A) illustrate the broader effects of a specific historical event", correct: true },
            { text: "B) detail the tactics used in a famous battle", correct: false },
            { text: "C) argue that trade routes caused the battle", correct: false },
            { text: "D) list all events that changed history", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The chef shared a recipe for a simple soup, then explained how it could be adapted with seasonal ingredients. She wanted to encourage home cooks to experiment.",
        question: "The passage is structured primarily to",
        answers: [
            { text: "A) provide a basic guide before suggesting creative variations", correct: true },
            { text: "B) argue that seasonal ingredients are best", correct: false },
            { text: "C) list all possible soup recipes", correct: false },
            { text: "D) compare simple and complex cooking", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },
    {
        passage: "The teacher began with a question about recycling, then presented data showing its environmental benefits. Her goal was to spark curiosity and inform students.",
        question: "The primary purpose of the passage is to",
        answers: [
            { text: "A) engage students’ interest while teaching about recycling’s value", correct: true },
            { text: "B) question the effectiveness of recycling", correct: false },
            { text: "C) list rules for classroom recycling", correct: false },
            { text: "D) compare recycling to other green practices", correct: false }
        ],
        type: "reading",
        difficulty: "easy",
        category: "text-structure-and-purpose"
    },


    //Text Structure MEDIUM Questions


        {
            passage: "For decades, urban planners viewed highways as the arteries of progress, channeling economic growth into sprawling cities. Yet recent studies reveal a paradox: these same highways often sever communities, isolating neighborhoods and stifling local commerce. In response, a new wave of architects advocates dismantling these concrete giants, proposing instead a network of green spaces and pedestrian pathways. Their vision, though radical, seeks to heal the social fabric torn by past infrastructure.",
            question: "The passage is structured primarily to",
            answers: [
                { text: "A) contrast past urban planning assumptions with emerging alternatives", correct: true },
                { text: "B) argue for the economic superiority of highways over green spaces", correct: false },
                { text: "C) chronicle the historical development of urban highway systems", correct: false },
                { text: "D) evaluate the technical feasibility of dismantling highways", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "text-structure-and-purpose"
        },
        {
            passage: "The scientist began her lecture with a startling claim: the smallest organisms wield the greatest influence on Earth’s climate. She then detailed the role of phytoplankton, microscopic algae that produce half the planet’s oxygen and regulate carbon cycles. Far from mere background players, these tiny powerhouses, she argued, dwarf the impact of forests or industrial emissions. Her closing plea urged policymakers to prioritize ocean conservation over terrestrial efforts.",
            question: "The primary purpose of the passage is to",
            answers: [
                { text: "A) advocate for a shift in environmental policy focus based on scientific evidence", correct: true },
                { text: "B) explain the biological processes of phytoplankton in technical detail", correct: false },
                { text: "C) critique the overemphasis on industrial emissions in climate discussions", correct: false },
                { text: "D) compare the oxygen production of various ecosystems", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "text-structure-and-purpose"
        },
        {
            passage: "Critics once hailed the novel as a groundbreaking exploration of identity, its fragmented narrative mirroring the protagonist’s fractured mind. But a closer look reveals a different intent: the author peppers the text with historical allusions – a battle here, a treaty there – weaving a subtle commentary on national division. The personal story, it seems, serves as a lens for a broader societal critique.",
            question: "The passage is structured primarily to",
            answers: [
                { text: "A) reinterpret the novel’s narrative focus by highlighting its historical context", correct: true },
                { text: "B) defend the novel’s fragmented style against critical misjudgments", correct: false },
                { text: "C) summarize the protagonist’s psychological journey in the story", correct: false },
                { text: "D) catalog historical events referenced in the novel", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "text-structure-and-purpose"
        },
        {
            passage: "In the 19th century, inventors raced to harness electricity, each breakthrough sparking both awe and apprehension. Today, we face a similar crossroads with artificial intelligence: its potential to transform medicine and education is undeniable, yet so too are the ethical shadows it casts. This parallel is no coincidence – technological leaps invariably provoke a dual response, blending hope with hesitation.",
            question: "The primary purpose of the passage is to",
            answers: [
                { text: "A) draw a comparison between historical and modern reactions to technological advances", correct: true },
                { text: "B) warn against the unchecked development of artificial intelligence", correct: false },
                { text: "C) celebrate the transformative power of electricity and AI in society", correct: false },
                { text: "D) analyze the ethical dilemmas unique to artificial intelligence", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "text-structure-and-purpose"
        },
        {
            passage: "The economist opened with a dry statistic: global trade volumes had dipped by 3%. She then painted a vivid picture – ships idling at docks, workers pacing empty warehouses – before circling back to explain how supply chain disruptions fueled the decline. Her narrative arc, far from a mere data dump, aimed to humanize the numbers and stir urgency in her audience.",
            question: "The passage is structured primarily to",
            answers: [
                { text: "A) illustrate an economic trend through a blend of data and storytelling", correct: true },
                { text: "B) propose solutions to reverse the decline in global trade", correct: false },
                { text: "C) critique the reliability of trade volume statistics", correct: false },
                { text: "D) document the daily experiences of workers affected by trade shifts", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "text-structure-and-purpose"
        },

        //Text Structure HARD Questions
        {
            passage: "The ecologist opened with a vivid tableau: a forest razed by wildfire, its ashes a testament to nature’s fury. She then pivoted to data—carbon emissions spiking post-blaze—before circling back to the scene, now framed as a call to curb deforestation. This oscillation between imagery and evidence aimed to meld emotion with reason.",
            question: "The passage is structured primarily to",
            answers: [
                { text: "A) weave descriptive scenes with scientific data to persuade readers of an environmental imperative", correct: true },
                { text: "B) chronicle the sequence of ecological changes following a wildfire", correct: false },
                { text: "C) contrast the emotional impact of nature’s destruction with its measurable causes", correct: false },
                { text: "D) present a scientific argument supported by anecdotal imagery", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "text-structure-and-purpose"
        },
        {
            passage: "The historian began with a paradox: a treaty hailed as a triumph yet reviled as a betrayal. She unpacked this through accounts of jubilant diplomats and furious citizens, threading their voices into a narrative that questioned victory’s cost. Her aim was less to resolve the contradiction than to expose its enduring resonance.",
            question: "The primary purpose of the passage is to",
            answers: [
                { text: "A) explore a historical treaty’s dual reception to highlight its complex legacy", correct: true },
                { text: "B) argue that the treaty’s celebratory framing overshadowed its negative outcomes", correct: false },
                { text: "C) reconcile opposing views of a treaty through historical testimonies", correct: false },
                { text: "D) critique the diplomatic process behind a controversial treaty", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "text-structure-and-purpose"
        },
        {
            passage: "The critic launched into a diatribe against modern cinema, decrying its reliance on spectacle over substance. Midstream, she shifted to an elegy for lost nuance, citing films where silence spoke louder than explosions. This juxtaposition framed her plea for a return to subtlety as both lament and rallying cry.",
            question: "The passage is structured primarily to",
            answers: [
                { text: "A) transition from broad critique to specific examples to advocate for a shift in cinematic priorities", correct: true },
                { text: "B) compare the strengths of silent films with the weaknesses of modern spectacle", correct: false },
                { text: "C) lament the decline of nuance in cinema through a series of historical references", correct: false },
                { text: "D) argue against spectacle by contrasting it with the emotional depth of earlier cinema", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "text-structure-and-purpose"
        },
        {
            passage: "The physicist posed a riddle: how could light bend without a medium? She traced this enigma from Newton’s corpuscles to Einstein’s spacetime, each theory a stepping stone in a winding ascent. Her purpose was to illuminate science’s iterative dance with mystery, not to crown a victor.",
            question: "The primary purpose of the passage is to",
            answers: [
                { text: "A) demonstrate the evolving understanding of light as a reflection of scientific progress", correct: true },
                { text: "B) resolve a historical debate about the nature of light through theoretical comparisons", correct: false },
                { text: "C) critique early theories of light in favor of modern explanations", correct: false },
                { text: "D) trace the chronological development of light theories to highlight Einstein’s triumph", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "text-structure-and-purpose"
        },
        {
            passage: "The sociologist sketched a city’s gentrification in broad strokes—rising rents, shifting demographics—then zoomed into a single block: a barber shop turned boutique, its old patrons priced out. This telescoping lens sought to ground abstract trends in palpable human stakes.",
            question: "The passage is structured primarily to",
            answers: [
                { text: "A) narrow from a general overview to a specific case to humanize the effects of gentrification", correct: true },
                { text: "B) document the demographic changes in a city through a detailed neighborhood study", correct: false },
                { text: "C) contrast economic trends with their cultural impacts across urban spaces", correct: false },
                { text: "D) illustrate gentrification’s progression by focusing on a single transformative example", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "text-structure-and-purpose"
        },
        {
            passage: "The poet prefaced her collection with a manifesto: art must unsettle, not soothe. She followed with verses that twisted familiar tropes—love as war, time as thief—into disquieting new shapes. This prelude and pivot aimed to prime readers for discomfort as a creative virtue.",
            question: "The primary purpose of the passage is to",
            answers: [
                { text: "A) establish a guiding philosophy that prepares readers for an unconventional poetic experience", correct: true },
                { text: "B) critique traditional poetry by showcasing innovative thematic twists", correct: false },
                { text: "C) argue for the superiority of unsettling art over comforting narratives", correct: false },
                { text: "D) introduce a collection by contrasting its style with conventional poetic forms", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "text-structure-and-purpose"
        },

//Cross Text EASY Questions

        {
            passage: "Passage 1: The nutritionist claimed that cutting sugar improves energy, citing studies where participants felt more alert.\nPassage 2: The trainer argued that sugar boosts energy for workouts, pointing to its quick conversion to fuel.",
            question: "How would the nutritionist from Passage 1 most likely respond to the trainer’s argument in Passage 2?",
            answers: [
                { text: "A) She would argue that sugar’s energy boost is short-lived compared to sustained alertness from cutting it.", correct: true },
                { text: "B) She would agree that sugar fuels workouts, but not daily energy.", correct: false },
                { text: "C) She would deny that sugar converts to fuel quickly.", correct: false },
                { text: "D) She would claim workouts don’t need energy boosts.", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The teacher said small classes help students focus, noting better grades in such settings.\nPassage 2: The principal believed large classes build independence, citing students who thrived without close supervision.",
            question: "Which of the following best describes a key difference between Passage 1 and Passage 2?",
            answers: [
                { text: "A) Passage 1 focuses on academic benefits of small classes, while Passage 2 emphasizes personal growth in large ones.", correct: true },
                { text: "B) Passage 1 discusses class size preferences, while Passage 2 lists school rules.", correct: false },
                { text: "C) Passage 1 supports large classes, while Passage 2 opposes them.", correct: false },
                { text: "D) Passage 1 uses data, while Passage 2 relies on opinions.", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The gardener favored organic methods, saying they protect soil health based on higher nutrient levels.\nPassage 2: The farmer preferred chemical fertilizers, arguing they increase crop yields with faster results.",
            question: "How would the gardener from Passage 1 likely respond to the farmer’s argument in Passage 2?",
            answers: [
                { text: "A) She would argue that soil health matters more than quick crop yields.", correct: true },
                { text: "B) She would agree that chemicals work faster but not better.", correct: false },
                { text: "C) She would claim fertilizers don’t increase yields.", correct: false },
                { text: "D) She would suggest organic methods are just as fast.", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The chef praised home cooking, noting it saves money compared to dining out.\nPassage 2: The critic valued restaurant meals, highlighting their unique flavors from skilled preparation.",
            question: "Which of the following best describes how the authors of Passage 1 and Passage 2 differ?",
            answers: [
                { text: "A) The chef emphasizes cost savings, while the critic focuses on culinary quality.", correct: true },
                { text: "B) The chef dislikes restaurants, while the critic dislikes home cooking.", correct: false },
                { text: "C) The chef discusses cooking skills, while the critic lists meal prices.", correct: false },
                { text: "D) The chef uses data, while the critic uses personal taste.", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The scientist linked exercise to better sleep, citing studies showing faster sleep onset.\nPassage 2: The doctor tied sleep quality to diet, mentioning how caffeine disrupts rest.",
            question: "How would the scientist from Passage 1 likely respond to the doctor’s focus in Passage 2?",
            answers: [
                { text: "A) She would argue that exercise has a stronger effect on sleep than diet.", correct: true },
                { text: "B) She would agree that caffeine disrupts sleep but not exercise.", correct: false },
                { text: "C) She would deny that diet affects sleep quality.", correct: false },
                { text: "D) She would suggest exercise and diet work the same way.", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The librarian promoted e-books, saying they’re convenient for instant access.\nPassage 2: The bookseller favored print books, noting their tactile appeal draws readers.",
            question: "Which of the following best describes a key difference between Passage 1 and Passage 2?",
            answers: [
                { text: "A) Passage 1 highlights practicality, while Passage 2 values sensory experience.", correct: true },
                { text: "B) Passage 1 discusses book costs, while Passage 2 lists reader ages.", correct: false },
                { text: "C) Passage 1 opposes print books, while Passage 2 opposes e-books.", correct: false },
                { text: "D) Passage 1 uses surveys, while Passage 2 uses sales data.", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "cross-text-connections"
        },


//Cross Text MEDIUM Questions

        {
            passage: "Passage 1: Dr. Patel argues that genetic engineering holds unparalleled potential to eradicate hereditary diseases, citing recent trials where gene edits reduced disease markers by 80%. She dismisses ethical concerns as secondary, insisting that the urgency of human suffering justifies bold action.\nPassage 2: Professor Kline warns that genetic engineering, while promising, risks unforeseen consequences, such as ecological imbalances from altered gene pools. He advocates a cautious approach, prioritizing long-term studies over immediate application to ensure safety.",
            question: "How would Dr. Patel from Passage 1 most likely respond to Professor Kline’s concerns in Passage 2?",
            answers: [
                { text: "A) She would argue that the immediate benefits to human health outweigh the speculative risks Kline highlights.", correct: true },
                { text: "B) She would concede that ecological risks deserve more study but maintain that trials should continue.", correct: false },
                { text: "C) She would dismiss Kline’s caution as irrelevant, focusing solely on technical feasibility.", correct: false },
                { text: "D) She would agree that long-term studies are necessary and propose delaying all genetic interventions.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The historian traces the rise of industrial cities to coal-powered factories, noting how they centralized labor and spurred economic growth, despite harsh working conditions. She views this as a necessary trade-off for progress.\nPassage 2: The sociologist examines the same cities, emphasizing how coal dependency entrenched social inequalities, as wealth concentrated among factory owners while workers faced poverty and pollution. He questions whether progress justified such costs.",
            question: "Which of the following best describes a key difference in how the authors of Passage 1 and Passage 2 evaluate the impact of coal-powered factories?",
            answers: [
                { text: "A) The historian accepts social costs as inevitable for economic gains, while the sociologist challenges this justification.", correct: true },
                { text: "B) The historian focuses on labor centralization, while the sociologist prioritizes technological innovation.", correct: false },
                { text: "C) The historian critiques working conditions, while the sociologist praises economic growth.", correct: false },
                { text: "D) The historian emphasizes pollution’s effects, while the sociologist highlights wealth distribution.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: A biologist asserts that invasive species often enhance biodiversity by filling ecological niches left vacant by native declines, citing examples like the zebra mussel’s water-filtering benefits. She downplays their disruptive reputation.\nPassage 2: An ecologist counters that invasive species destabilize ecosystems, pointing to the zebra mussel’s role in outcompeting native shellfish and altering food webs. He stresses the need for aggressive control measures.",
            question: "How do the authors of Passage 1 and Passage 2 differ in their assessment of the zebra mussel’s ecological role?",
            answers: [
                { text: "A) The biologist views it as a net positive for biodiversity, while the ecologist sees it as a threat to ecosystem stability.", correct: true },
                { text: "B) The biologist focuses on its decline of native species, while the ecologist highlights its water-filtering capacity.", correct: false },
                { text: "C) The biologist advocates for control measures, while the ecologist dismisses its ecological impact.", correct: false },
                { text: "D) The biologist emphasizes food web changes, while the ecologist praises its niche-filling potential.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The critic praises the poet’s latest collection for its raw emotionality, arguing that its unstructured form mirrors the chaos of human experience and invites reader interpretation.\nPassage 2: The reviewer finds the same collection indulgent, suggesting that its lack of structure reflects laziness rather than intent, and that it burdens readers with deciphering incoherent verses.",
            question: "How would the reviewer from Passage 2 likely critique the critic’s perspective in Passage 1?",
            answers: [
                { text: "A) By arguing that the critic misinterprets the poet’s lack of structure as purposeful rather than careless.", correct: true },
                { text: "B) By agreeing that the emotionality is raw but insisting it lacks interpretive depth.", correct: false },
                { text: "C) By claiming the critic overlooks the collection’s coherence and structured intent.", correct: false },
                { text: "D) By suggesting the critic undervalues the chaos as a deliberate artistic choice.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: An economist contends that automation boosts productivity and creates new job sectors, using historical data from the Industrial Revolution to predict a net gain in employment over time.\nPassage 2: A labor analyst disputes this, arguing that automation displaces workers faster than it generates jobs, citing current trends in manufacturing where robotics outpace human hiring.",
            question: "Which of the following best captures how the labor analyst in Passage 2 would challenge the economist’s argument in Passage 1?",
            answers: [
                { text: "A) By asserting that current automation trends contradict the historical precedent the economist relies on.", correct: true },
                { text: "B) By agreeing that productivity rises but denying that new job sectors emerge.", correct: false },
                { text: "C) By arguing that the Industrial Revolution data supports a net job loss, not gain.", correct: false },
                { text: "D) By claiming the economist ignores robotics’ role in historical job creation.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "cross-text-connections"
        },

//Cross Text HARD Questions
        {
            passage: "Passage 1: The sociologist argued that social media amplifies polarization by curating echo chambers, citing studies where users’ feeds reinforced pre-existing biases with a 75% overlap in content slant. She urged regulatory oversight to curb this trend.\nPassage 2: The technologist countered that social media’s algorithms foster connectivity, not division, pointing to data showing users encounter diverse views 60% more often than in offline networks. He advocated for user-driven curation over external controls.",
            question: "How would the sociologist from Passage 1 most likely respond to the technologist’s claim in Passage 2 that social media increases exposure to diverse views?",
            answers: [
                { text: "A) She would argue that the apparent diversity is superficial, as algorithmic reinforcement of biases still dominates user experience.", correct: true },
                { text: "B) She would concede that offline networks are less diverse but insist that social media’s scale amplifies its polarizing effect.", correct: false },
                { text: "C) She would reject the 60% statistic as unreliable, citing her own studies on content overlap.", correct: false },
                { text: "D) She would agree that connectivity increases but maintain that it fosters division by overwhelming users with conflicting views.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The historian claimed that industrialization catalyzed social mobility, evidenced by urban workers rising from poverty to middle-class status within a generation. She downplayed its disruptions as transient.\nPassage 2: The economist disputed this, asserting that industrialization entrenched inequality, with data showing factory owners amassed 80% of new wealth while workers’ wages stagnated relative to costs over decades.",
            question: "Which of the following best describes a key difference in how the authors of Passage 1 and Passage 2 assess industrialization’s social impact?",
            answers: [
                { text: "A) The historian emphasizes upward mobility as a primary outcome, while the economist highlights persistent wealth disparities.", correct: true },
                { text: "B) The historian focuses on urban growth, while the economist examines factory productivity.", correct: false },
                { text: "C) The historian views disruptions as significant, while the economist sees them as overstated.", correct: false },
                { text: "D) The historian prioritizes wage trends, while the economist stresses class transitions.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The biologist posited that climate change accelerates species adaptation, citing rapid genetic shifts in Arctic fish as ice melts. She saw this as a potential buffer against extinction.\nPassage 2: The ecologist warned that such adaptations are illusory, pointing to studies where altered traits in Arctic fish reduced reproductive success by 40%, signaling long-term vulnerability.",
            question: "How would the ecologist from Passage 2 likely critique the biologist’s perspective in Passage 1?",
            answers: [
                { text: "A) By arguing that the biologist overlooks how adaptive traits may compromise species survival in the long run.", correct: true },
                { text: "B) By agreeing that genetic shifts occur but denying they are linked to climate change.", correct: false },
                { text: "C) By asserting that the biologist’s focus on Arctic fish ignores broader extinction risks.", correct: false },
                { text: "D) By claiming the biologist misinterprets data on ice melt as evidence of adaptation.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The critic praised the novel’s labyrinthine structure, arguing its complexity mirrored the protagonist’s fractured psyche and invited deep reflection. She dismissed simpler narratives as trite.\nPassage 2: The reviewer decried the same novel as an indulgent maze, suggesting its convoluted form obscured any coherent insight, leaving readers lost rather than enlightened.",
            question: "Which of the following best captures how the reviewer in Passage 2 would challenge the critic’s argument in Passage 1?",
            answers: [
                { text: "A) By contending that the complexity the critic celebrates actually undermines the novel’s clarity and purpose.", correct: true },
                { text: "B) By agreeing that the structure reflects the psyche but arguing it alienates rather than engages readers.", correct: false },
                { text: "C) By rejecting the critic’s dismissal of simple narratives as inherently less valuable.", correct: false },
                { text: "D) By asserting that the protagonist’s psyche is not fractured, contradicting the critic’s premise.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The physicist maintained that quantum entanglement could revolutionize communication, citing experiments where entangled particles transmitted signals instantaneously across vast distances.\nPassage 2: The engineer cautioned that practical applications remain elusive, noting that current entanglement experiments falter under real-world conditions like noise and decoherence, limiting their utility.",
            question: "How do the authors of Passage 1 and Passage 2 differ in their views on quantum entanglement’s potential?",
            answers: [
                { text: "A) The physicist envisions transformative applications based on experimental success, while the engineer doubts feasibility due to practical constraints.", correct: true },
                { text: "B) The physicist focuses on particle behavior, while the engineer emphasizes signal transmission failures.", correct: false },
                { text: "C) The physicist sees entanglement as theoretical, while the engineer views it as experimentally validated.", correct: false },
                { text: "D) The physicist dismisses noise issues, while the engineer prioritizes theoretical over practical concerns.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "cross-text-connections"
        },
        {
            passage: "Passage 1: The ethicist endorsed autonomous vehicles, arguing they reduce human error, with crash rates in trials 50% lower than manual driving. She minimized privacy concerns as secondary.\nPassage 2: The policy analyst resisted this optimism, highlighting that AVs’ data collection—tracking every move—poses a surveillance risk that outweighs safety gains in public perception.",
            question: "How would the policy analyst from Passage 2 likely respond to the ethicist’s stance in Passage 1?",
            answers: [
                { text: "A) By asserting that the ethicist underestimates privacy risks, which could overshadow the safety benefits she champions.", correct: true },
                { text: "B) By agreeing that crash rates drop but arguing that human error is less ethically troubling than machine control.", correct: false },
                { text: "C) By challenging the 50% crash reduction statistic as insufficient to justify widespread adoption.", correct: false },
                { text: "D) By suggesting the ethicist ignores trial conditions that limit real-world safety improvements.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "cross-text-connections"
        },

    //Transitions EASY
    
        {
            passage: "The team practiced daily for weeks. [____], they won the championship game with ease.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) As a result", correct: true },
                { text: "B) For example", correct: false },
                { text: "C) However", correct: false },
                { text: "D) Meanwhile", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "transitions"
        },
        {
            passage: "The recipe called for fresh herbs. [____], the chef used dried ones due to a shortage.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Instead", correct: true },
                { text: "B) In addition", correct: false },
                { text: "C) Therefore", correct: false },
                { text: "D) Similarly", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "transitions"
        },
        {
            passage: "The park was quiet in the morning. [____], it grew noisy as families arrived by noon.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Later", correct: true },
                { text: "B) Because", correct: false },
                { text: "C) In contrast", correct: false },
                { text: "D) Besides", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "transitions"
        },
        {
            passage: "The student studied hard for the test. [____], she felt confident walking into the exam room.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Consequently", correct: true },
                { text: "B) On the other hand", correct: false },
                { text: "C) For instance", correct: false },
                { text: "D) Nevertheless", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "transitions"
        },
        {
            passage: "The town planned a festival to boost tourism. [____], rainy weather forced a cancellation.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) However", correct: true },
                { text: "B) In addition", correct: false },
                { text: "C) Thus", correct: false },
                { text: "D) Likewise", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "transitions"
        },
        {
            passage: "The book offered tips for beginners. [____], it included a section on advanced techniques for experts.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Additionally", correct: true },
                { text: "B) By contrast", correct: false },
                { text: "C) As a result", correct: false },
                { text: "D) In fact", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "transitions"
        },

    //Transitions MEDIUM     

        {
            passage: "The expedition faced relentless storms, forcing the team to halt their ascent midway. [____], once the weather cleared, they resumed with renewed determination, reaching the summit by dusk.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Nevertheless", correct: true },
                { text: "B) For instance", correct: false },
                { text: "C) Meanwhile", correct: false },
                { text: "D) Consequently", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "transitions"
        },
        {
            passage: "Critics argued that the new policy would stifle innovation by imposing strict regulations. [____], supporters claimed it would foster long-term stability, ensuring resources for future research.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) In contrast", correct: true },
                { text: "B) Similarly", correct: false },
                { text: "C) As a result", correct: false },
                { text: "D) Moreover", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "transitions"
        },
        {
            passage: "The experiment yielded inconsistent results, puzzling the research team. [____], they decided to refine their methodology, suspecting equipment malfunctions as the cause.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Accordingly", correct: true },
                { text: "B) However", correct: false },
                { text: "C) On the other hand", correct: false },
                { text: "D) In addition", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "transitions"
        },
        {
            passage: "Urban sprawl has degraded local ecosystems, reducing biodiversity in once-thriving habitats. [____], city planners are now prioritizing green spaces to mitigate these effects and restore ecological balance.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) In response", correct: true },
                { text: "B) Likewise", correct: false },
                { text: "C) By contrast", correct: false },
                { text: "D) Specifically", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "transitions"
        },
        {
            passage: "The novel’s dense prose initially deterred casual readers, who found it inaccessible. [____], its intricate themes and vivid imagery eventually earned it critical acclaim among literary scholars.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Despite this", correct: true },
                { text: "B) Therefore", correct: false },
                { text: "C) In fact", correct: false },
                { text: "D) Similarly", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "transitions"
        },

    //Transitions HARD Questions

        {
            passage: "The researcher’s initial hypothesis predicted a linear correlation between temperature and plant growth. [____], subsequent experiments revealed a threshold beyond which heat stunted development, prompting a revision of her model.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) However", correct: true },
                { text: "B) For example", correct: false },
                { text: "C) Consequently", correct: false },
                { text: "D) In addition", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "transitions"
        },
        {
            passage: "Critics lambasted the policy for its shortsightedness, arguing it ignored long-term fiscal risks. [____], proponents hailed its immediate economic stimulus, citing a 5% boost in local spending within months of implementation.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) By contrast", correct: true },
                { text: "B) Similarly", correct: false },
                { text: "C) As a result", correct: false },
                { text: "D) Moreover", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "transitions"
        },
        {
            passage: "The expedition endured relentless storms, delaying their summit attempt by weeks. [____], the team capitalized on a brief window of calm to deploy advanced gear, ultimately securing rare geological samples.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Nevertheless", correct: true },
                { text: "B) Meanwhile", correct: false },
                { text: "C) Specifically", correct: false },
                { text: "D) Thus", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "transitions"
        },
        {
            passage: "The novel’s dense prose initially repelled casual readers, who found its layers impenetrable. [____], scholars unearthed a trove of subtle allusions within its complexity, elevating its status in academic circles.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Conversely", correct: true },
                { text: "B) Therefore", correct: false },
                { text: "C) In fact", correct: false },
                { text: "D) Likewise", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "transitions"
        },
        {
            passage: "The city council proposed a tax hike to fund infrastructure, projecting a $10 million revenue increase. [____], opponents mobilized a petition drive, warning that the burden would disproportionately fall on low-income residents.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) In response", correct: true },
                { text: "B) For instance", correct: false },
                { text: "C) On the other hand", correct: false },
                { text: "D) Subsequently", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "transitions"
        },
        {
            passage: "The startup’s aggressive expansion yielded a 200% profit surge, dazzling investors with its meteoric rise. [____], analysts cautioned that such rapid growth masked underlying vulnerabilities, such as an overreliance on volatile markets.",
            question: "Which of the following transitions best fits in the blank to connect the ideas in the passage?",
            answers: [
                { text: "A) Despite this", correct: true },
                { text: "B) Accordingly", correct: false },
                { text: "C) In contrast", correct: false },
                { text: "D) As a result", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "transitions"
        },

//Rhetorical Synthesis EASY 
{
    passage: "A teacher is writing a newsletter to encourage parents to support a school garden. The teacher wants to highlight its benefits using these notes:\n- Students learn about plants hands-on.\n- Garden produce is used in school lunches.\n- 80% of students enjoy the garden activities.",
    question: "Which of the following sentences should the teacher use to highlight the garden’s benefits?",
    answers: [
        { text: "A) The school garden engages 80% of students in fun plant lessons while supplying fresh lunch produce.", correct: true },
        { text: "B) Students like the garden, which helps with lunches.", correct: false },
        { text: "C) The garden teaches plants and grows food for school.", correct: false },
        { text: "D) Most students enjoy gardening more than class.", correct: false }
    ],
    type: "reading",
    difficulty: "easy",
    category: "rhetorical-synthesis"
},
{
    passage: "A coach is drafting a speech to motivate a team before a game. The coach wants to emphasize preparation using these notes:\n- Team practiced 5 days a week.\n- Scored 10 goals in a practice match.\n- Learned opponents’ weaknesses.",
    question: "Which of the following sentences should the coach use to emphasize preparation?",
    answers: [
        { text: "A) With five days of practice, 10 practice goals, and insight into our opponents’ flaws, we’re ready to win.", correct: true },
        { text: "B) We practiced a lot and scored some goals.", correct: false },
        { text: "C) The team knows the opponents and practiced.", correct: false },
        { text: "D) Five days of practice helped us score well.", correct: false }
    ],
    type: "reading",
    difficulty: "easy",
    category: "rhetorical-synthesis"
},
{
    passage: "A librarian is writing a memo to justify a new reading program. The librarian wants to show its value using these notes:\n- 50% increase in book checkouts last month.\n- Kids spend 2 more hours weekly at the library.\n- Parents report better reading skills.",
    question: "Which of the following sentences should the librarian use to show the program’s value?",
    answers: [
        { text: "A) The reading program has boosted checkouts by 50%, kept kids in the library 2 hours longer weekly, and improved their skills per parents.", correct: true },
        { text: "B) Kids like the library more now with the program.", correct: false },
        { text: "C) Checkouts are up and kids stay longer.", correct: false },
        { text: "D) Parents say reading skills are better this month.", correct: false }
    ],
    type: "reading",
    difficulty: "easy",
    category: "rhetorical-synthesis"
},
{
    passage: "A gardener is creating a blog post to promote composting. The gardener wants to explain its ease using these notes:\n- Takes 5 minutes daily to add scraps.\n- Needs turning once a week.\n- Soil improves in 2 months.",
    question: "Which of the following sentences should the gardener use to explain composting’s ease?",
    answers: [
        { text: "A) Composting is simple, requiring just 5 minutes daily for scraps, a weekly turn, and yielding better soil in 2 months.", correct: true },
        { text: "B) It’s quick to compost and helps soil fast.", correct: false },
        { text: "C) Adding scraps daily makes composting easy.", correct: false },
        { text: "D) Soil gets better with little work.", correct: false }
    ],
    type: "reading",
    difficulty: "easy",
    category: "rhetorical-synthesis"
},
{
    passage: "A student is writing an essay to argue for more recess time. The student wants to stress its benefits using these notes:\n- 20% better focus in class after recess.\n- Kids burn 100 calories per session.\n- Teachers note happier students.",
    question: "Which of the following sentences should the student use to stress recess’s benefits?",
    answers: [
        { text: "A) More recess boosts focus by 20%, burns 100 calories per session, and makes students happier, per teachers.", correct: true },
        { text: "B) Kids focus better after recess.", correct: false },
        { text: "C) Recess helps kids burn calories and feel good.", correct: false },
        { text: "D) Teachers like happier kids after playtime.", correct: false }
    ],
    type: "reading",
    difficulty: "easy",
    category: "rhetorical-synthesis"
},
{
    passage: "A chef is preparing a menu note to highlight a dish’s appeal. The chef wants to focus on its flavor using these notes:\n- Uses fresh herbs from the garden.\n- Includes a tangy lemon sauce.\n- Customers order it 30% more than others.",
    question: "Which of the following sentences should the chef use to highlight the dish’s flavor appeal?",
    answers: [
        { text: "A) This dish, with garden-fresh herbs and tangy lemon sauce, is 30% more popular with customers.", correct: true },
        { text: "B) Customers like the dish with herbs.", correct: false },
        { text: "C) The lemon sauce makes it popular.", correct: false },
        { text: "D) Fresh herbs improve the dish a lot.", correct: false }
    ],
    type: "reading",
    difficulty: "easy",
    category: "rhetorical-synthesis"
},


//Rhetorical Synthesis MEDIUM 
        {
            passage: "A student is writing a report on the benefits of urban green spaces for a city planning committee. The student wants to conclude with a sentence that emphasizes the urgency of action based on the following notes:\n- Studies show green spaces reduce urban heat by up to 5°F.\n- Local surveys indicate 78% of residents support more parks.\n- Delaying implementation increases costs by 15% annually.",
            question: "Which of the following sentences should the student use to conclude the report and emphasize the urgency of action?",
            answers: [
                { text: "A) Given the proven cooling effects, strong public support, and rising costs of delay, the committee must prioritize green spaces now.", correct: true },
                { text: "B) Green spaces offer temperature relief and enjoy public favor, suggesting a potential area for future consideration.", correct: false },
                { text: "C) While costs rise with delay, the committee should weigh the 78% resident approval against other priorities.", correct: false },
                { text: "D) Studies on heat reduction and survey data provide a compelling case for green spaces, if funding allows.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "rhetorical-synthesis"
        },
        {
            passage: "A researcher is drafting a proposal to secure funding for a renewable energy project. The researcher wants to introduce the proposal with a sentence that highlights its innovative potential using these notes:\n- Project uses a new solar panel design increasing efficiency by 30%.\n- Prototype outperformed traditional models in three test regions.\n- Technology could reduce reliance on fossil fuels by 25% in a decade.",
            question: "Which of the following sentences should the researcher use to introduce the proposal and highlight its innovative potential?",
            answers: [
                { text: "A) This proposal unveils a groundbreaking solar technology that promises to redefine energy efficiency and sustainability.", correct: true },
                { text: "B) The project’s solar panels, tested across regions, aim to improve efficiency and reduce fossil fuel use over time.", correct: false },
                { text: "C) With a 30% efficiency boost, this technology offers a practical step toward sustainable energy solutions.", correct: false },
                { text: "D) Outperforming traditional models, our prototype suggests a reliable alternative for future energy needs.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "rhetorical-synthesis"
        },
        {
            passage: "An environmentalist is writing an op-ed to persuade readers to support reforestation efforts. The environmentalist wants to include a sentence that counters a common objection using these notes:\n- Objection: Reforestation is too costly and slow to show results.\n- Fact: New planting techniques cut costs by 40% and speed growth by 20%.\n- Benefit: Forests absorb 2.6 billion tons of CO2 yearly.",
            question: "Which of the following sentences should the environmentalist use to counter the objection and persuade readers?",
            answers: [
                { text: "A) Contrary to claims of high costs and slow progress, modern techniques make reforestation an affordable, rapid solution that tackles CO2 emissions effectively.", correct: true },
                { text: "B) While some see reforestation as expensive, its CO2 absorption makes it a worthwhile long-term investment.", correct: false },
                { text: "C) New methods may lower costs by 40%, suggesting reforestation could eventually address climate concerns.", correct: false },
                { text: "D) Forests’ ability to absorb 2.6 billion tons of CO2 annually outweighs concerns about initial costs and timelines.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "rhetorical-synthesis"
        },
        {
            passage: "A historian is preparing a lecture on technological revolutions for a university audience. The historian wants to include a sentence that connects past and present trends using these notes:\n- 19th-century railroads spurred economic growth and urbanization.\n- Today’s AI innovations drive job creation in tech sectors.\n- Both faced initial public skepticism before widespread adoption.",
            question: "Which of the following sentences should the historian use to connect past and present technological trends?",
            answers: [
                { text: "A) Just as railroads once transformed economies despite early doubts, AI today fuels job growth and urban progress amid similar skepticism.", correct: true },
                { text: "B) Railroads and AI both illustrate how technology can reshape society, though their impacts differ in scope.", correct: false },
                { text: "C) Economic growth from railroads parallels AI’s job creation, highlighting technology’s consistent benefits.", correct: false },
                { text: "D) Public skepticism delayed railroads and AI, yet each eventually proved essential to modern life.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "rhetorical-synthesis"
        },
        {
            passage: "A journalist is writing an article on community arts programs for a local newspaper. The journalist wants to end with a sentence that inspires action based on these notes:\n- Programs increased youth engagement by 60% in two years.\n- Local artists report higher visibility and sales.\n- Funding cuts threaten program continuation next year.",
            question: "Which of the following sentences should the journalist use to conclude the article and inspire action?",
            answers: [
                { text: "A) With youth thriving, artists prospering, and funding at risk, readers must rally now to save these vital programs.", correct: true },
                { text: "B) The 60% rise in engagement and artist success show the programs’ value, despite looming budget cuts.", correct: false },
                { text: "C) Funding cuts next year could end programs that boost youth and artists, a loss worth considering.", correct: false },
                { text: "D) Community arts have proven effective for youth and artists, suggesting a need for future support.", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "rhetorical-synthesis"
        },
//Rhetorical Synthesis HARD Questions
        {
        passage: "A scientist is writing a grant proposal to fund a study on deep-sea ecosystems. The scientist wants to emphasize the urgency of the research using these notes:\n- Ocean warming has increased 0.5°C in 20 years, stressing marine life.\n- Deep-sea species show a 30% decline in population over the same period.\n- Funding delays could miss a critical window to document these changes.",
        question: "Which of the following sentences should the scientist use to emphasize the urgency of the research?",
        answers: [
            { text: "A) With ocean warming accelerating and deep-sea populations plummeting by 30% in just two decades, we must act now before funding delays erase our chance to study these vanishing ecosystems.", correct: true },
            { text: "B) The 0.5°C rise in ocean temperature over 20 years and a 30% drop in deep-sea species suggest a need for timely research funding.", correct: false },
            { text: "C) Deep-sea ecosystems, declining by 30% as oceans warm, deserve study before funding delays complicate efforts.", correct: false },
            { text: "D) Given a 0.5°C temperature increase and population losses, urgent research is warranted to understand deep-sea changes.", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "rhetorical-synthesis"
        },
        {
            passage: "A historian is drafting an article on technological revolutions for a scholarly journal. The historian wants to connect past and present trends using these notes:\n- Steam engines in the 1800s tripled industrial output in a decade.\n- Artificial intelligence today enhances data processing by 40% annually.\n- Both faced resistance from workers fearing job loss.",
            question: "Which of the following sentences should the historian use to connect past and present technological trends?",
            answers: [
                { text: "A) Just as steam engines tripled output in the 1800s despite worker pushback, AI’s 40% annual data gains today echo that transformative power amid similar fears.", correct: true },
                { text: "B) Steam engines and AI, boosting output and data processing respectively, show how technology evolves despite resistance.", correct: false },
                { text: "C) The 1800s steam engine boom and today’s AI advances both overcame worker objections to increase efficiency.", correct: false },
                { text: "D) Workers resisted steam engines’ tripling of output and AI’s 40% data gains, linking past and present tech shifts.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "rhetorical-synthesis"
        },
        {
            passage: "An environmentalist is writing an op-ed to persuade readers to support wetland restoration. The environmentalist wants to counter a common objection using these notes:\n- Objection: Restoration is too expensive, costing $2 million per project.\n- Fact: Wetlands prevent flood damage, saving $5 million annually in affected areas.\n- Benefit: Restored wetlands boost biodiversity by 25% within five years.",
            question: "Which of the following sentences should the environmentalist use to counter the objection and persuade readers?",
            answers: [
                { text: "A) Far from being a $2 million burden, wetland restoration saves $5 million yearly in flood costs while enriching biodiversity by 25%, making it a cost-effective imperative.", correct: true },
                { text: "B) Wetlands’ $5 million flood savings and 25% biodiversity gain suggest the $2 million cost is a worthwhile investment.", correct: false },
                { text: "C) Though restoration costs $2 million, the $5 million saved from floods shows it’s not as expensive as critics claim.", correct: false },
                { text: "D) Critics decry the $2 million price tag, but wetlands’ flood protection and biodiversity benefits outweigh such concerns.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "rhetorical-synthesis"
        },
        {
            passage: "A journalist is crafting a feature on urban farming for a city magazine. The journalist wants to highlight its transformative potential using these notes:\n- Urban farms increased local food production by 15% in three years.\n- 60% of participants report stronger community ties from farm projects.\n- Vacant lots, once 20% of city land, are now 80% repurposed for farming.",
            question: "Which of the following sentences should the journalist use to highlight the transformative potential of urban farming?",
            answers: [
                { text: "A) Urban farming has revolutionized cities, slashing vacant lots from 20% to near zero while boosting food output by 15% and forging 60% stronger community bonds.", correct: true },
                { text: "B) With 15% more food and 60% of participants feeling connected, urban farming repurposes 80% of vacant lots effectively.", correct: false },
                { text: "C) Vacant lots dropping from 20% to a fifth, alongside food and community gains, show urban farming’s impact.", correct: false },
                { text: "D) Urban farming’s 15% food increase and lot repurposing highlight its potential to strengthen communities.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "rhetorical-synthesis"
        },
        {
            passage: "A policy analyst is preparing a report on renewable energy adoption for a government panel. The analyst wants to address a skepticism using these notes:\n- Skepticism: Solar power is unreliable due to weather variability.\n- Data: Modern solar grids maintain 95% uptime with battery backups.\n- Outcome: Solar adoption cut emissions by 30% in pilot regions.",
            question: "Which of the following sentences should the analyst use to address the skepticism about solar power reliability?",
            answers: [
                { text: "A) Contrary to doubts about weather-related unreliability, solar grids with 95% uptime and 30% emissions cuts prove their dependable impact.", correct: true },
                { text: "B) Solar power’s 95% uptime with batteries and 30% emissions reduction suggest it’s more reliable than skeptics assume.", correct: false },
                { text: "C) While skeptics question solar reliability, pilot regions show 30% lower emissions with steady power.", correct: false },
                { text: "D) Modern solar grids, achieving 95% uptime, counter skepticism by reducing emissions effectively.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "rhetorical-synthesis"
        },
        {
            passage: "A professor is writing a lecture on cultural preservation for a university course. The professor wants to underscore its global relevance using these notes:\n- 70% of indigenous languages face extinction by 2100.\n- UNESCO reports 40% of cultural heritage sites are at risk from climate change.\n- Preservation efforts have revitalized traditions in 25 countries.",
            question: "Which of the following sentences should the professor use to underscore the global relevance of cultural preservation?",
            answers: [
                { text: "A) With 70% of indigenous languages nearing extinction, 40% of heritage sites threatened, and successes in 25 nations, cultural preservation emerges as a pressing global priority.", correct: true },
                { text: "B) UNESCO’s 40% risk estimate and 70% language loss highlight preservation’s importance across 25 countries.", correct: false },
                { text: "C) Preservation’s success in 25 countries shows its relevance amid language and heritage threats.", correct: false },
                { text: "D) The loss of 70% of languages and 40% of sites makes preservation globally vital, as seen in revitalized traditions.", correct: false }
            ],
            type: "reading",
            difficulty: "hard",
            category: "rhetorical-synthesis"
        },
 //Boundaires EASY Questions  
 
        {
            passage: "The hiker packed essentials [____] water snacks and a map were all she needed for the trail.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) :", correct: true },
                { text: "B) ,", correct: false },
                { text: "C) ;", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "boundaries"
        },
        {
            passage: "The chef prepared a special dish [____] it featured fresh herbs and a tangy sauce.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) :", correct: true },
                { text: "B) ,", correct: false },
                { text: "C) ;", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "boundaries"
        },
        {
            passage: "The team trained hard all week [____] their effort paid off with a big win on Saturday.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) ;", correct: true },
                { text: "B) :", correct: false },
                { text: "C) ,", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "boundaries"
        },
        {
            passage: "The book club met monthly [____] members discussed their favorite novels and shared snacks.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) ;", correct: true },
                { text: "B) :", correct: false },
                { text: "C) ,", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "boundaries"
        },
        {
            passage: "The gardener planted flowers [____] roses tulips and daisies brightened the yard.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) :", correct: true },
                { text: "B) ,", correct: false },
                { text: "C) ;", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "boundaries"
        },
        {
            passage: "The concert was delayed by rain [____] the band played an extra song to thank patient fans.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) ;", correct: true },
                { text: "B) :", correct: false },
                { text: "C) ,", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "easy",
            category: "boundaries"
        },


 //Boundaires MEDIUM Questions       

        {
            passage: "The architect unveiled a bold design for the community center [____] a structure blending modern aesthetics with sustainable materials drew widespread praise.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) ;", correct: true },
                { text: "B) ,", correct: false },
                { text: "C) :", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "boundaries"
        },
        {
            passage: "Volunteers worked tirelessly to restore the wetland [____] their efforts resulted in a 40% increase in native bird populations within a year.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) ,", correct: true },
                { text: "B) ;", correct: false },
                { text: "C) .", correct: false },
                { text: "D) :", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "boundaries"
        },
        {
            passage: "The researcher identified two key factors driving climate shifts [____] rising ocean temperatures and deforestation both contribute significantly.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) :", correct: true },
                { text: "B) ,", correct: false },
                { text: "C) ;", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "boundaries"
        },
        {
            passage: "The festival featured an array of performances [____] musicians dancers and poets captivated the audience late into the night.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) :", correct: true },
                { text: "B) ,", correct: false },
                { text: "C) ;", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "boundaries"
        },
        {
            passage: "The team faced a critical decision after the prototype failed [____] they could either redesign it entirely or abandon the project.",
            question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
            answers: [
                { text: "A) ;", correct: true },
                { text: "B) ,", correct: false },
                { text: "C) :", correct: false },
                { text: "D) .", correct: false }
            ],
            type: "reading",
            difficulty: "medium",
            category: "boundaries"
        },
    //Boundaries HARD Questions
    {
        passage: "The expedition uncovered artifacts from a lost civilization [____] pottery shards and tools buried for centuries hinted at a sophisticated culture.",
        question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
        answers: [
            { text: "A) :", correct: true },
            { text: "B) ,", correct: false },
            { text: "C) ;", correct: false },
            { text: "D) .", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
    {
        passage: "Critics dismissed the theory as speculative [____] its proponents marshaled compelling evidence from newly digitized archives to refute such claims.",
        question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
        answers: [
            { text: "A) ;", correct: true },
            { text: "B) :", correct: false },
            { text: "C) ,", correct: false },
            { text: "D) .", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
    {
        passage: "The artist blended surrealism with stark realism [____] her latest work a dreamlike tableau pierced by gritty urban details captivated viewers.",
        question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
        answers: [
            { text: "A) :", correct: true },
            { text: "B) ,", correct: false },
            { text: "C) ;", correct: false },
            { text: "D) .", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
    {
        passage: "The storm disrupted supply chains across the region [____] manufacturers scrambled to reroute shipments while retailers faced empty shelves.",
        question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
        answers: [
            { text: "A) ;", correct: true },
            { text: "B) :", correct: false },
            { text: "C) ,", correct: false },
            { text: "D) .", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
    {
        passage: "Volunteers restored the historic site with meticulous care [____] their efforts yielding a pristine landmark drew tourists from afar.",
        question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
        answers: [
            { text: "A) ,", correct: true },
            { text: "B) ;", correct: false },
            { text: "C) :", correct: false },
            { text: "D) .", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
    {
        passage: "The debate hinged on a single contentious issue [____] whether funding should prioritize research or infrastructure divided the panel sharply.",
        question: "Which of the following punctuation marks should be inserted in the blank to correctly separate the clauses?",
        answers: [
            { text: "A) :", correct: true },
            { text: "B) ,", correct: false },
            { text: "C) ;", correct: false },
            { text: "D) .", correct: false }
        ],
        type: "reading",
        difficulty: "hard",
        category: "boundaries"
    },
];

function startTest() {
    satIntroContainer.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    startReadingWritingTest();
}

function startReadingWritingTest() {
    userResponses = [];
    startQuiz(readingWritingQuestions, 18, 18, 18); // Keeping your original question counts
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

function showScore() {
    resetState();

    let maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3); // Based on your original question counts
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    document.getElementById("question-container").classList.remove("hide");
    passageElement.innerHTML = "";
    questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");

    localStorage.setItem("readingScore", scaledScore);
    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = { reading: scaledScore };
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    nextButton.innerHTML = "Review Incorrect Answers";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", showExplanations);
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

    if (questionText.includes("Emma stepped into the grand ballroom")) {
        return "Emma’s unease and hesitation suggest she feels out of place, despite her anticipation. The text highlights her discomfort rather than excitement or confidence.";
    } else if (questionText.includes("Daniel stepped into the office")) {
        return "Daniel’s doubt and deep breath indicate uncertainty, but his reminder that 'everyone had to start somewhere' shows determination, not disinterest or regret.";
    } else if (questionText.includes("Liam set his pen down")) {
        return "The best evidence is the explicit mention of 'nagging doubt,' directly showing his uncertainty about the manuscript’s quality.";
    } else if (questionText.includes("The scientist adjusted her glasses")) {
        return "The scientist’s struggle to accept the findings is best supported by her disbelief in the consistent results, despite repeated checks.";
    }

    return "No specific explanation available for this question.";
}

function handleNextButton() {
    recordTestResults();
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
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

    if (typeof results !== "object" || Array.isArray(results)) {
        results = {};
    }

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

nextButton.addEventListener("click", handleNextButton);

function showIntroMessage() {
    resetState();
    passageElement.innerHTML = "";
    questionElement.innerHTML = "This is an untimed SAT Reading and Writing Test. Take as long as you need.";
    questionElement.classList.add("centered-score");

    const startButton = document.createElement("button");
    startButton.innerHTML = "Start Test";
    startButton.classList.add("btn", "centered-btn");
    startButton.addEventListener("click", () => {
        questionElement.classList.remove("centered-score");
        startReadingWritingTest();
    });
    answerButtons.appendChild(startButton);
}

startTestButton.addEventListener("click", startTest);