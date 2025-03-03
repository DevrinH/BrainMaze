const startingMinutes = 64;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60; // No need for "+1", ensures exactly 64 minutes
let refreshIntervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time === 0) { 
        clearInterval(refreshIntervalId);
        endQuiz();  // ✅ Stops quiz when timer hits zero
    } else {
        time--; 
    }
}

// Function to handle quiz timeout
function endQuiz() {
    resetState();  // Removes answer buttons
    showScore();   // Shows final score immediately
}

// Automatically end test after 64 minutes (3,840,000 ms)
setTimeout(endQuiz, 3840000);

updateCountdown();


const questions = [
    {
        question: "Emma stepped into the grand ballroom, her gown brushing against the polished floor as chandeliers cast golden light across the room. The guests moved with ease, their conversations flowing effortlessly. She had imagined this moment countless times, yet standing there now, a strange unease settled in her chest. Adjusting her gloves, she forced a smile and took a hesitant step forward, unsure if she truly belonged.<br/><br/>What does the passage suggest about Emma’s feelings?",
        answers: [
            { text: "She feels out of place despite having anticipated this moment for a long time.", correct: true },
            { text: "She is overwhelmed by the beauty of the ballroom and struggles to contain her excitement.", correct: false },
            { text: "She is intimidated by the other guests and decides to leave before entering the ballroom.", correct: false },
            { text: "She is eager to impress others and makes a confident entrance into the event.", correct: false },
        ],
        type: "reading",
        difficulty: "easy",
        category: "inference"
    }
    ,
{
    question: "Daniel stepped into the office, straightening his tie as he took in the bustling atmosphere. Conversations hummed around him, and the clatter of keyboards filled the air. He had spent weeks preparing for this moment, yet a small knot of doubt twisted in his stomach. He took a deep breath and walked toward his desk, reminding himself that everyone had to start somewhere.<br/><br/>What does the passage suggest about Daniel's attitude toward his new job?",
    answers: [
        { text: "He is uncertain about his abilities but determined to prove himself.", correct: true },
        { text: "He is uninterested in the work and only took the job for financial reasons.", correct: false },
        { text: "He is confident that he will excel without any major challenges.", correct: false },
        { text: "He regrets accepting the position and is considering quitting.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "inference"
},
{
    question: "Sophia reread the email, tapping her fingers on the desk. Her mentor had suggested a different approach to her project, one that she hadn’t considered. She respected his experience, but something about his suggestion didn’t sit right with her. She sighed, making a note to discuss it with him further before making a final decision.<br/><br/>Based on the passage, what can be inferred about Sophia’s relationship with her mentor?",
    answers: [
        { text: "She deeply respects her mentor’s advice, even when she disagrees.", correct: true },
        { text: "She finds her mentor’s guidance outdated and irrelevant.", correct: false },
        { text: "She feels pressured to always follow her mentor’s advice without question.", correct: false },
        { text: "She believes her mentor underestimates her abilities and does not value her input.", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "inference"
},
{
    question: "Marcus stared at the letter in his hands, reading the words again as if they might change. He had been so sure of the outcome, had allowed himself to hope. A tight smile formed on his lips as he folded the paper and placed it back in the envelope. He nodded at his friend across the table. ‘Well,’ he said, ‘guess I’ll have to figure out a new plan.’<br/><br/>What does the passage imply about Marcus’s reaction to the unexpected news?",
    answers: [
        { text: "He struggles to hide his disappointment but remains polite.", correct: true },
        { text: "He is completely indifferent and unaffected by the situation.", correct: false },
        { text: "He immediately reacts with anger and refuses to accept the news.", correct: false },
        { text: "He is thrilled by the surprise and eagerly embraces the change.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "inference"
},
{
    question: "Olivia closed the last box and looked around her empty apartment. The city she had called home for years now felt distant, like a chapter of a book she had finished reading. She had made the decision to move on her own, but that didn’t mean it was easy. As she picked up her suitcase, she smiled, a mixture of excitement and nervousness buzzing inside her.<br/><br/>What can be inferred about Olivia’s decision to move to a new city?",
    answers: [
        { text: "She is both excited and nervous about the challenges ahead.", correct: true },
        { text: "She is completely confident that the move will solve all her problems.", correct: false },
        { text: "She was forced to move against her will and resents the change.", correct: false },
        { text: "She regrets her decision and is already planning to return home.", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "inference"
},
{
    question: "Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript. Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind. He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.<br/><br/>Which choice provides the best evidence for the idea that Liam is uncertain about his work?",
    answers: [
        { text: "A) 'Months of tireless effort had led to this moment, yet a nagging doubt lingered in his mind.'", correct: true },
        { text: "B) 'He reread the paragraph, then again, each time questioning whether his words carried the weight he had intended.'", correct: false },
        { text: "C) 'Liam set his pen down and exhaled slowly, his eyes scanning over the final sentence of his manuscript.'", correct: false },
        { text: "D) 'He had imagined this moment countless times, picturing the satisfaction of a completed draft.'", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Command of Evidence"
},
{
    question: "The scientist adjusted her glasses, peering at the data displayed on the screen. The results were unexpected—far different from what she and her team had predicted. She tapped her fingers against the desk, reviewing each calculation. There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.<br/><br/>Which sentence best supports the idea that the scientist is struggling to accept her findings?",
    answers: [
        { text: "A) 'The scientist adjusted her glasses, peering at the data displayed on the screen.'", correct: false },
        { text: "B) 'She tapped her fingers against the desk, reviewing each calculation.'", correct: false },
        { text: "C) 'The results were unexpected—far different from what she and her team had predicted.'", correct: false },
        { text: "D) 'There had to be a mistake, but no matter how many times she went through the figures, the numbers remained the same.'", correct: true },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Command of Evidence"
},
{
    question: "Marcus hesitated before stepping onto the crowded train. The air was thick with conversation, the rhythmic hum of movement filling the space. He reached for a handrail but quickly withdrew, pressing himself against the door instead. The thought of being surrounded on all sides made his chest tighten.<br/><br/>Which sentence provides the strongest evidence that Marcus is experiencing discomfort?",
    answers: [
        { text: "A) 'Marcus hesitated before stepping onto the crowded train.'", correct: false },
        { text: "B) 'The air was thick with conversation, the rhythmic hum of movement filling the space.'", correct: false },
        { text: "C) 'He reached for a handrail but quickly withdrew, pressing himself against the door instead.'", correct: true },
        { text: "D) 'The thought of being surrounded on all sides made his chest tighten.'", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "Command of Evidence"
}
,{
    question: "Nina’s voice wavered as she stepped onto the stage, her heart pounding in her chest. The bright lights obscured the faces in the audience, but she knew they were there—watching, waiting. She took a deep breath, gripping the microphone tightly, and forced herself to begin.<br/><br/>Which choice provides the best evidence that Nina is nervous about performing?",
    answers: [
        { text: "A) 'Nina’s voice wavered as she stepped onto the stage, her heart pounding in her chest.'", correct: true },
        { text: "B) 'The bright lights obscured the faces in the audience, but she knew they were there—watching, waiting.'", correct: false },
        { text: "C) 'She took a deep breath, gripping the microphone tightly.'", correct: false },
        { text: "D) 'She forced herself to begin.'", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "Command of Evidence"
},
{
    question: "Oliver adjusted the straps of his backpack and took a deep breath. The forest stretched before him, an endless maze of towering trees and winding paths. He had studied the map thoroughly, yet now, standing here, he realized that the landmarks weren’t as clear as he had expected. Every direction looked the same.<br/><br/>Which sentence best supports the idea that Oliver is unsure of where to go?",
    answers: [
        { text: "A) 'Oliver adjusted the straps of his backpack and took a deep breath.'", correct: false },
        { text: "B) 'The forest stretched before him, an endless maze of towering trees and winding paths.'", correct: false },
        { text: "C) 'He had studied the map thoroughly, yet now, standing here, he realized that the landmarks weren’t as clear as he had expected.'", correct: true },
        { text: "D) 'Every direction looked the same.'", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Command of Evidence"
},
{
    question: "Sophia sat at the old wooden table, running her fingers over the faded ink of a letter her grandmother had written decades ago. The words spoke of resilience, of sacrifices made for family, of dreams put on hold. As Sophia read, she felt an unshakable connection to the past, as if the struggles of generations before her still echoed in the present.<br/><br/>What is the central idea of the passage?",
    answers: [
        { text: "A) Sophia feels a deep connection to her family’s history and struggles.", correct: true },
        { text: "B) Sophia is trying to decipher the faded ink of an old letter.", correct: false },
        { text: "C) Sophia’s grandmother had an easy and carefree life.", correct: false },
        { text: "D) Sophia is determined to change her future by forgetting the past.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Central Ideas and Details"
},
{
    question: "The researchers stood at the edge of the ice shelf, their equipment humming softly as they recorded data. Towering glaciers stretched endlessly before them, a frozen expanse that had remained unchanged for thousands of years. But beneath the surface, the ice was shifting—melting slowly, almost imperceptibly, signaling a transformation that could reshape the planet.<br/><br/>What is the central idea of the passage?",
    answers: [
        { text: "A) Scientists are studying changes in glaciers that could have a significant impact.", correct: true },
        { text: "B) The ice shelf has remained unchanged for thousands of years.", correct: false },
        { text: "C) The researchers are using noisy equipment to gather data.", correct: false },
        { text: "D) The glaciers are growing at a rapid and unpredictable rate.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Central Ideas and Details"
},
{
    question: "Elijah gripped the railing tightly as the ship rocked beneath him. The vast ocean stretched in every direction, waves rising and falling with an unpredictable rhythm. He had always dreamed of adventure on the open sea, but now, surrounded by nothing but water, he felt an unfamiliar sense of isolation. It was beautiful—breathtaking even—but it also reminded him of how small he truly was.<br/><br/>What is the main idea conveyed in the passage?",
    answers: [
        { text: "A) Elijah is experiencing both awe and loneliness while at sea.", correct: true },
        { text: "B) Elijah regrets his decision to go on a sea voyage.", correct: false },
        { text: "C) The ocean is dangerous and unpredictable.", correct: false },
        { text: "D) The ship is unsteady, making Elijah feel sick.", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "Central Ideas and Details"
},
{
    question: "In the heart of the city, the old bookstore remained unchanged despite the modern buildings rising around it. The scent of aged paper and ink filled the air as customers wandered through the towering shelves, seeking stories from the past. The owner, an elderly man with kind eyes, greeted each visitor warmly, as if every book held a memory he was eager to share.<br/><br/>What is the main idea of the passage?",
    answers: [
        { text: "A) The old bookstore provides a nostalgic escape from the modern city.", correct: true },
        { text: "B) The bookstore owner dislikes the modern world.", correct: false },
        { text: "C) Customers visit the bookstore to buy the newest bestsellers.", correct: false },
        { text: "D) The bookstore is struggling to stay in business.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Central Ideas and Details"
},
{
    question: "The village had survived countless storms, its buildings reinforced by generations of careful craftsmanship. But this storm was different—stronger, relentless, unyielding. As rain pounded the rooftops and winds howled through the narrow streets, the villagers worked together, reinforcing walls and gathering supplies. They knew survival depended not on the strength of their homes alone, but on their unity.<br/><br/>Which choice best states the central idea of the passage?",
    answers: [
        { text: "A) The villagers rely on teamwork and resilience to endure the storm.", correct: true },
        { text: "B) The storm is the most powerful one the village has ever faced.", correct: false },
        { text: "C) The villagers are abandoning their homes in fear.", correct: false },
        { text: "D) The buildings in the village were poorly constructed.", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "Central Ideas and Details"
},
{
    question: "Lena carefully arranged the wildflowers in a glass vase, her fingers brushing against the delicate petals. The vibrant hues of yellow and violet contrasted beautifully against the dimly lit room, bringing a touch of warmth to the otherwise somber space. She sighed, knowing that even the most fleeting beauty had its place.<br/><br/>As used in the passage, the word 'fleeting' most nearly means:",
    answers: [
        { text: "A) temporary", correct: true },
        { text: "B) vibrant", correct: false },
        { text: "C) essential", correct: false },
        { text: "D) overwhelming", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Words in Context"
},
{
    question: "The professor’s explanation was so convoluted that even the most attentive students struggled to follow. His sentences twisted and turned, filled with jargon and unnecessary details, making the concept seem far more complicated than it actually was.<br/><br/>As used in the passage, the word 'convoluted' most nearly means:",
    answers: [
        { text: "A) complex", correct: true },
        { text: "B) fascinating", correct: false },
        { text: "C) redundant", correct: false },
        { text: "D) concise", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "Words in Context"
},

{
    question: "Jared watched as the storm clouds amassed on the horizon, their dark forms looming over the coastline. The air grew thick with humidity, and the scent of rain was unmistakable. He knew it was only a matter of time before the sky unleashed its fury.<br/><br/>As used in the passage, the word 'amassed' most nearly means:",
    answers: [
        { text: "A) gathered", correct: true },
        { text: "B) disappeared", correct: false },
        { text: "C) shrank", correct: false },
        { text: "D) evaporated", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Words in Context"
},
{
    question: "Though initially indifferent to the plight of the stray dog, Maya found herself growing increasingly empathetic as she observed its cautious movements and wary eyes. She had always dismissed sentimentality as weakness, but now, she felt an inexplicable need to help.<br/><br/>As used in the passage, the word 'indifferent' most nearly means:",
    answers: [
        { text: "A) unconcerned", correct: true },
        { text: "B) compassionate", correct: false },
        { text: "C) enthusiastic", correct: false },
        { text: "D) irritated", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "Words in Context"
},
{
    question: "Despite the artist’s initial hesitation, his latest sculpture was met with universal acclaim. Critics praised its intricate design, its masterful use of light and shadow, and its ability to evoke a deep emotional response.<br/><br/>As used in the passage, the word 'acclaim' most nearly means:",
    answers: [
        { text: "A) praise", correct: true },
        { text: "B) rejection", correct: false },
        { text: "C) controversy", correct: false },
        { text: "D) confusion", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Words in Context"
},
{
    question: "Lena unfolded the old letter, the ink faded but the words still legible. The careful handwriting and affectionate tone told of a love long past, yet preserved on paper. She traced the signature with her fingertips, wondering how different life might have been if history had taken another course.<br/><br/>What is the primary purpose of this passage?",
    answers: [
        { text: "A) To reflect on the emotional impact of a piece of personal history.", correct: true },
        { text: "B) To describe the process of preserving old documents.", correct: false },
        { text: "C) To explain the historical significance of letters in communication.", correct: false },
        { text: "D) To critique the fading nature of ink over time.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Text Structure and Purpose"
},
{
    question: "The scientist carefully recorded her observations, noting each reaction with precision. Every detail, from the color shift in the liquid to the faintest change in temperature, was documented. Her work required patience and attention to detail, for even the smallest oversight could alter the results.<br/><br/>What is the primary structure of this passage?",
    answers: [
        { text: "A) Description", correct: true },
        { text: "B) Compare and contrast", correct: false },
        { text: "C) Problem and solution", correct: false },
        { text: "D) Argumentative", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "Text Structure and Purpose"
},
{
    question: "At first, Nathan was unsure if he could finish the marathon. His legs ached, his breath came in ragged gasps, and doubt crept into his mind. But then, he thought of all the months of training, the early morning runs, and the sacrifices he had made. He focused on each step, pushing forward until, at last, he crossed the finish line.<br/><br/>What is the author's purpose in this passage?",
    answers: [
        { text: "A) To illustrate perseverance in the face of adversity.", correct: true },
        { text: "B) To critique the challenges of long-distance running.", correct: false },
        { text: "C) To argue that training for marathons is unnecessary.", correct: false },
        { text: "D) To compare different athletic endurance strategies.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Text Structure and Purpose"
},
{
    question: "In the early morning, the bakery buzzed with activity. The scent of freshly baked bread filled the air as workers kneaded dough, arranged pastries, and filled display cases. Customers lined up, eagerly awaiting their warm croissants and steaming coffee.<br/><br/>Which text structure best describes this passage?",
    answers: [
        { text: "A) Descriptive", correct: true },
        { text: "B) Cause and effect", correct: false },
        { text: "C) Problem and solution", correct: false },
        { text: "D) Chronological", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "Text Structure and Purpose"
},
{
    question: "Over the past century, transportation has evolved dramatically. In the early 1900s, most people relied on horse-drawn carriages. As automobiles became more affordable, they replaced carriages, revolutionizing travel. Today, electric vehicles and high-speed trains are shaping the future of transportation.<br/><br/>What is the primary structure of this passage?",
    answers: [
        { text: "A) Chronological", correct: true },
        { text: "B) Cause and effect", correct: false },
        { text: "C) Compare and contrast", correct: false },
        { text: "D) Problem and solution", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Text Structure and Purpose"
},
{
    question: "Passage 1: Maya sat on the edge of the stage, her script clutched tightly in her hands. She had rehearsed her lines countless times, yet now, with the audience beyond the curtain, doubt crept into her mind. What if she forgot her lines? What if she wasn’t good enough?<br/><br/>Passage 2: Andre adjusted his tie in the mirror, forcing himself to take slow, steady breaths. His speech was ready, but his hands trembled as he imagined all eyes on him. He had spent weeks preparing, but now, the pressure felt overwhelming.<br/><br/>What theme is shared by both passages?",
    answers: [
        { text: "A) The fear of failure despite thorough preparation.", correct: true },
        { text: "B) The excitement of achieving a lifelong dream.", correct: false },
        { text: "C) The desire to impress an audience at all costs.", correct: false },
        { text: "D) The relief that comes after facing one’s fears.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Cross-Text Connections"
},
{
    question: "Passage 1: In the heart of the rainforest, thousands of species rely on the delicate balance of their ecosystem to survive. Even the smallest changes in climate or deforestation can disrupt the intricate web of life, threatening biodiversity.<br/><br/>Passage 2: In the Arctic, rising temperatures are melting sea ice at an alarming rate. Polar bears struggle to find stable hunting grounds, and entire food chains are being altered as ice-dependent species decline.<br/><br/>What central idea is shared by both passages?",
    answers: [
        { text: "A) Environmental changes have widespread consequences on ecosystems.", correct: true },
        { text: "B) Climate change is only affecting colder regions of the world.", correct: false },
        { text: "C) Scientists have found solutions to prevent habitat destruction.", correct: false },
        { text: "D) Some animals are adapting quickly to new environmental conditions.", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "Cross-Text Connections"
},
{
    question: "Passage 1: As the Wright brothers launched their first successful flight, few could have predicted the rapid advancements that would follow. Within decades, airplanes became essential for travel and commerce, connecting the world in unprecedented ways.<br/><br/>Passage 2: The creation of the internet revolutionized communication, making instant global connections possible. Just as the telephone once transformed long-distance conversations, the internet has reshaped how people interact, learn, and conduct business.<br/><br/>How do the passages relate to each other?",
    answers: [
        { text: "A) Both discuss innovations that dramatically changed how people connect.", correct: true },
        { text: "B) Both emphasize the importance of preserving traditional communication methods.", correct: false },
        { text: "C) Both argue that technological advancements have made life more difficult.", correct: false },
        { text: "D) Both highlight failed experiments that led to eventual success.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Cross-Text Connections"
},
{
    question: "Passage 1: Sarah believed that success was earned through hard work and perseverance. No matter the obstacles, she pushed forward, trusting that effort would lead to achievement.<br/><br/>Passage 2: Lucas often attributed success to luck and external circumstances. Even when he worked hard, he felt that opportunity depended more on chance than effort.<br/><br/>How do the perspectives of the two passages differ?",
    answers: [
        { text: "A) Passage 1 emphasizes personal effort, while Passage 2 highlights the role of luck.", correct: true },
        { text: "B) Both passages argue that success is unpredictable.", correct: false },
        { text: "C) Passage 1 criticizes people who work too hard, while Passage 2 praises dedication.", correct: false },
        { text: "D) Both passages suggest that external factors have no impact on success.", correct: false },
    ],
    type: "reading",
    difficulty: "hard",
    category: "Cross-Text Connections"
},
{
    question: "Passage 1: The artist carefully mixed colors, layering brushstrokes to create depth and movement. Each hue blended seamlessly, turning a simple canvas into a vivid masterpiece.<br/><br/>Passage 2: The composer adjusted the notes in his symphony, ensuring that each instrument contributed to the harmony. The melodies intertwined, building toward a powerful crescendo.<br/><br/>What is a common theme in both passages?",
    answers: [
        { text: "A) The process of creation requires careful craftsmanship.", correct: true },
        { text: "B) Artists and musicians rely on spontaneity more than planning.", correct: false },
        { text: "C) Music is more emotionally expressive than visual art.", correct: false },
        { text: "D) Creating a masterpiece is effortless for skilled individuals.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Cross-Text Connections"
},
{
    question: "The experiment yielded promising initial results. ___, further testing is needed to confirm the findings and rule out potential errors.",
    answers: [
        { text: "A) However", correct: false },
        { text: "B) Therefore", correct: false },
        { text: "C) Nevertheless", correct: false },
        { text: "D) However", correct: true },
    ],
    type: "writing",
    difficulty: "easy",
    category: "Transitions"
},
{
    question: "The company’s profits have increased significantly over the past year. ___, employee salaries have remained stagnant, leading to growing frustration among workers.",
    answers: [
        { text: "A) Similarly", correct: false },
        { text: "B) In contrast", correct: true },
        { text: "C) As a result", correct: false },
        { text: "D) In addition", correct: false },
    ],
    type: "writing",
    difficulty: "medium",
    category: "Transitions"
},
{
    question: "Many species of birds migrate south for the winter. ___, some species remain in cold climates and adapt to harsh conditions.",
    answers: [
        { text: "A) For instance", correct: false },
        { text: "B) In contrast", correct: true },
        { text: "C) Therefore", correct: false },
        { text: "D) As a result", correct: false },
    ],
    type: "writing",
    difficulty: "easy",
    category: "Transitions"
},
{
    question: "The new smartphone model boasts an improved camera and longer battery life. ___, it is significantly more expensive than its predecessor.",
    answers: [
        { text: "A) For example", correct: false },
        { text: "B) However", correct: true },
        { text: "C) Moreover", correct: false },
        { text: "D) Consequently", correct: false },
    ],
    type: "writing",
    difficulty: "medium",
    category: "Transitions"
},
{
    question: "The athlete had been training rigorously for months. ___, she felt confident and prepared as she stepped onto the track for the championship race.",
    answers: [
        { text: "A) As a result", correct: true },
        { text: "B) Nevertheless", correct: false },
        { text: "C) In contrast", correct: false },
        { text: "D) For example", correct: false },
    ],
    type: "writing",
    difficulty: "easy",
    category: "Transitions"
},
{
    question: "A recent study found that students who take handwritten notes retain information better than those who type their notes. Researchers suggest that handwriting requires deeper cognitive processing, leading to better understanding and recall.<br/><br/>Which statement would best support the findings of the study?",
    answers: [
        { text: "A) Many college professors now encourage students to take notes by hand.", correct: false },
        { text: "B) A survey of top-performing students found that most relied on handwritten notes.", correct: true },
        { text: "C) Some students prefer typing because it is faster and more efficient.", correct: false },
        { text: "D) Studies on learning styles show that individuals process information differently.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Rhetorical Synthesis"
},
{
    question: "A city is considering implementing a bike-sharing program to reduce traffic congestion. City officials claim that similar programs in other major cities have led to decreased car usage and improved air quality.<br/><br/>Which piece of additional information would best strengthen the officials' argument?",
    answers: [
        { text: "A) Statistics showing a drop in car emissions in cities that adopted bike-sharing programs.", correct: true },
        { text: "B) The number of bike-sharing stations currently in operation worldwide.", correct: false },
        { text: "C) A statement from a local bike shop owner supporting the program.", correct: false },
        { text: "D) A report on the history of urban transportation systems.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Rhetorical Synthesis"
},
{
    question: "A nonprofit organization is campaigning to reduce food waste by encouraging grocery stores to donate unsold but edible food to local shelters. The organization argues that this initiative would help reduce both hunger and unnecessary waste.<br/><br/>Which additional detail would most effectively support the organization's argument?",
    answers: [
        { text: "A) Data showing that a large percentage of food waste comes from grocery stores.", correct: true },
        { text: "B) A survey about public opinions on reducing food waste.", correct: false },
        { text: "C) An interview with a grocery store manager about store policies.", correct: false },
        { text: "D) A historical account of food donation practices in the past century.", correct: false },
    ],
    type: "reading",
    difficulty: "easy",
    category: "Rhetorical Synthesis"
},
{
    question: "A school district is debating whether to start school an hour later to improve student performance. Advocates claim that later start times align better with adolescent sleep cycles, leading to increased alertness and academic success.<br/><br/>Which of the following would best support this argument?",
    answers: [
        { text: "A) Research showing that students who get more sleep perform better on tests.", correct: true },
        { text: "B) A comparison of school start times in different countries.", correct: false },
        { text: "C) A student's personal experience with waking up early for school.", correct: false },
        { text: "D) A news article about school budget changes.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Rhetorical Synthesis"
},
{
    question: "A company is considering switching to renewable energy sources for its production facilities. Executives argue that this change will not only benefit the environment but also reduce long-term costs.<br/><br/>Which additional evidence would most strengthen their claim?",
    answers: [
        { text: "A) A case study of a similar company that reduced costs by switching to renewable energy.", correct: true },
        { text: "B) A report on the overall benefits of renewable energy.", correct: false },
        { text: "C) A statement from an employee about the company's environmental policies.", correct: false },
        { text: "D) An article discussing the history of renewable energy development.", correct: false },
    ],
    type: "reading",
    difficulty: "medium",
    category: "Rhetorical Synthesis"
},
{
    question: "The scientist's research was groundbreaking__ it introduced a new way to harness solar energy efficiently.",
    answers: [
        { text: "A) NO CHANGE", correct: false },
        { text: "B) ; it", correct: true },
        { text: "C) : it", correct: false },
        { text: "D) , and it", correct: false },
    ],
    type: "writing",
    difficulty: "medium",
    category: "Boundaries"
},
{
    question: "Lena spent the summer interning at a law firm__ she gained valuable experience in legal research and case preparation.",
    answers: [
        { text: "A) NO CHANGE", correct: false },
        { text: "B) , where", correct: false },
        { text: "C) ; where", correct: false },
        { text: "D) , and she", correct: true },
    ],
    type: "writing",
    difficulty: "easy",
    category: "Boundaries"
},
{
    question: "The mountain climbers faced extreme conditions__ including freezing temperatures, high winds, and limited oxygen.",
    answers: [
        { text: "A) NO CHANGE", correct: false },
        { text: "B) ; including", correct: false },
        { text: "C) : including", correct: true },
        { text: "D) , including", correct: false },
    ],
    type: "writing",
    difficulty: "medium",
    category: "Boundaries"
},
{
    question: "Sophia is an exceptional pianist she practices for hours each day to perfect her technique.",
    answers: [
        { text: "A) NO CHANGE", correct: false },
        { text: "B) pianist, she", correct: true },
        { text: "C) pianist. And she", correct: false },
        { text: "D) pianist; and she", correct: false },
    ],
    type: "writing",
    difficulty: "easy",
    category: "Boundaries"
},
{
    question: "The new policy aims to reduce waste__ it encourages businesses to use biodegradable packaging.",
    answers: [
        { text: "A) NO CHANGE", correct: false },
        { text: "B) ; it", correct: true },
        { text: "C) , which", correct: false },
        { text: "D) : which", correct: false },
    ],
    type: "writing",
    difficulty: "hard",
    category: "Boundaries"
},
{
    question: "The ancient city of Caral, located in present-day Peru, is one of the oldest known civilizations in the Americas. Archaeologists have discovered that the city’s inhabitants engaged in complex trade networks, __ used advanced engineering techniques to construct pyramids.",
    answers: [
        { text: "A) and they", correct: true },
        { text: "B) but they", correct: false },
        { text: "C) who", correct: false },
        { text: "D) as they", correct: false },
    ],
    type: "writing",
    difficulty: "medium",
    category: "Form, Structure, and Sense"
},
{
    question: "Marie Curie made groundbreaking contributions to science, particularly in the study of radioactivity. Her research led to the discovery of polonium and radium, __ earned her two Nobel Prizes in different scientific fields.",
    answers: [
        { text: "A) discoveries that", correct: true },
        { text: "B) which", correct: false },
        { text: "C) a discovery that", correct: false },
        { text: "D) and she", correct: false },
    ],
    type: "writing",
    difficulty: "easy",
    category: "Form, Structure, and Sense"
},
{
    question: "The novel’s protagonist, an ambitious young lawyer, faces a moral dilemma when he learns that his client, __, may not be as innocent as he first believed.",
    answers: [
        { text: "A) who he is defending", correct: false },
        { text: "B) whom he is defending", correct: true },
        { text: "C) which he is defending", correct: false },
        { text: "D) that he is defending", correct: false },
    ],
    type: "writing",
    difficulty: "hard",
    category: "Form, Structure, and Sense"
},
{
    question: "Unlike most traditional forms of painting, pointillism relies on small dots of pure color, __, when viewed from a distance, blend together to form an image.",
    answers: [
        { text: "A) they", correct: false },
        { text: "B) which", correct: true },
        { text: "C) and", correct: false },
        { text: "D) that", correct: false },
    ],
    type: "writing",
    difficulty: "medium",
    category: "Form, Structure, and Sense"
},
{
    question: "The ancient Silk Road facilitated the exchange of goods, culture, and ideas between Europe and Asia, __ leading to significant advancements in science, technology, and art.",
    answers: [
        { text: "A) therefore", correct: false },
        { text: "B) as a result", correct: false },
        { text: "C) thus", correct: false },
        { text: "D) thereby", correct: true },
    ],
    type: "writing",
    difficulty: "hard",
    category: "Form, Structure, and Sense"
},
    {
        question: "If 3x - 5 = 16, what is the value of x?",
        answers: [
            { text: "A) 5", correct: false },
            { text: "B) 7", correct: true },
            { text: "C) 9", correct: false },
            { text: "D) 11", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "Algebra"
    },
    {
        question: "The expression (x + 3)(x - 2) is equivalent to which of the following?",
        answers: [
            { text: "A) x² + x - 6", correct: true },
            { text: "B) x² - x - 6", correct: false },
            { text: "C) x² + 5x - 6", correct: false },
            { text: "D) x² - 5x - 6", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Algebra"
    },
    {
        question: "If f(x) = 2x² - 3x + 4, what is f(3)?",
        answers: [
            { text: "A) 19", correct: true },
            { text: "B) 20", correct: false },
            { text: "C) 21", correct: false },
            { text: "D) 22", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Algebra"
    },
    {
        question: "Which of the following is equivalent to 4(x - 2) + 3(x + 1)?",
        answers: [
            { text: "A) 7x - 5", correct: false },
            { text: "B) 7x - 8", correct: true },
            { text: "C) 7x - 10", correct: false },
            { text: "D) 7x - 11", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "Algebra"
    },
    {
        question: "If 2x + 3 = 5x - 6, what is the value of x?",
        answers: [
            { text: "A) 1", correct: false },
            { text: "B) 2", correct: false },
            { text: "C) 3", correct: true },
            { text: "D) 4", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Algebra"
    },
    {
        question: "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
        answers: [
            { text: "A) 10", correct: true },
            { text: "B) 12", correct: false },
            { text: "C) 14", correct: false },
            { text: "D) 16", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "Geometry and Trigonometry"
    },
    {
        question: "A circle has a radius of 5. What is its circumference?",
        answers: [
            { text: "A) 5π", correct: false },
            { text: "B) 10π", correct: true },
            { text: "C) 25π", correct: false },
            { text: "D) 50π", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "Geometry and Trigonometry"
    },
    {
        question: "In a 30°-60°-90° triangle, the length of the shorter leg is 4. What is the length of the hypotenuse?",
        answers: [
            { text: "A) 4√3", correct: false },
            { text: "B) 8", correct: true },
            { text: "C) 6", correct: false },
            { text: "D) 4√2", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Geometry and Trigonometry"
    },
    {
        question: "A triangle has angles measuring 35° and 45°. What is the measure of the third angle?",
        answers: [
            { text: "A) 100°", correct: false },
            { text: "B) 90°", correct: false },
            { text: "C) 80°", correct: true },
            { text: "D) 75°", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "Geometry and Trigonometry"
    },
    {
        question: "If sin(θ) = 3/5, what is cos(θ) assuming θ is in the first quadrant?",
        answers: [
            { text: "A) 4/5", correct: true },
            { text: "B) 3/5", correct: false },
            { text: "C) 5/3", correct: false },
            { text: "D) 5/4", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Geometry and Trigonometry"
    },
    {
        question: "A survey found that 40% of 200 students prefer online learning over in-person classes. How many students prefer online learning?",
        answers: [
            { text: "A) 60", correct: false },
            { text: "B) 80", correct: true },
            { text: "C) 100", correct: false },
            { text: "D) 120", correct: false },
        ],
        type: "math",
        difficulty: "easy",
        category: "Problem Solving and Data Analysis"
    },
    {
        question: "The average score of five students on a math test is 82. If four students scored 85, 78, 90, and 80, what did the fifth student score?",
        answers: [
            { text: "A) 77", correct: true },
            { text: "B) 80", correct: false },
            { text: "C) 85", correct: false },
            { text: "D) 90", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Problem Solving and Data Analysis"
    },
    {
        question: "A store sells apples for $1.50 each or a bundle of 4 for $5.00. How much would a customer save by buying 8 apples in bundles instead of individually?",
        answers: [
            { text: "A) $2.00", correct: true },
            { text: "B) $3.00", correct: false },
            { text: "C) $4.00", correct: false },
            { text: "D) $5.00", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Problem Solving and Data Analysis"
    },
    {
        question: "A car rental company charges a base fee of $25 plus $0.20 per mile driven. If a customer pays $61, how many miles did they drive?",
        answers: [
            { text: "A) 150", correct: true },
            { text: "B) 160", correct: false },
            { text: "C) 180", correct: false },
            { text: "D) 200", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Problem Solving and Data Analysis"
    },
    {
        question: "A company’s profit increased from $12,000 to $15,000 in one year. What was the percentage increase in profit?",
        answers: [
            { text: "A) 20%", correct: false },
            { text: "B) 25%", correct: true },
            { text: "C) 30%", correct: false },
            { text: "D) 35%", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Problem Solving and Data Analysis"
    },
    {
        question: "If f(x) = 2x² - 3x + 5, what is f(4)?",
        answers: [
            { text: "A) 27", correct: false },
            { text: "B) 29", correct: true },
            { text: "C) 31", correct: false },
            { text: "D) 33", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Advanced Math"
    },
    {
        question: "The equation 3x² - 5x - 2 = 0 is factored as (ax + b)(cx + d) = 0. What is the value of a + b + c + d?",
        answers: [
            { text: "A) 1", correct: false },
            { text: "B) 3", correct: false },
            { text: "C) 5", correct: true },
            { text: "D) 7", correct: false },
        ],
        type: "math",
        difficulty: "hard",
        category: "Advanced Math"
    },
    {
        question: "If g(x) = 4x - 7 and h(x) = x² + 2x, what is (g ∘ h)(2)?",
        answers: [
            { text: "A) -3", correct: false },
            { text: "B) 5", correct: false },
            { text: "C) 9", correct: true },
            { text: "D) 15", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Advanced Math"
    },
    {
        question: "A function is defined as f(x) = (x - 3)(x + 5). What is the x-coordinate of the vertex of the parabola?",
        answers: [
            { text: "A) -4", correct: false },
            { text: "B) -1", correct: true },
            { text: "C) 1", correct: false },
            { text: "D) 4", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Advanced Math"
    },
    {
        question: "The function f(x) = 2(x - 4)² + 3 is transformed from its parent function y = x². What is the vertex of the function?",
        answers: [
            { text: "A) (4,3)", correct: true },
            { text: "B) (-4,-3)", correct: false },
            { text: "C) (3,4)", correct: false },
            { text: "D) (-3,4)", correct: false },
        ],
        type: "math",
        difficulty: "medium",
        category: "Advanced Math"
    }












];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedQuestions = [];
let categoryStats = {}; // Tracks { category: { correct: 0, incorrect: 0 } }


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;

    // Select 54 questions (ordered Easy → Medium → Hard)
    selectedQuestions = selectRandomQuestions(questions, 18, 18, 18);

    nextButton.innerHTML = "Next";
    showQuestion();
}

function selectRandomQuestions(questions, numEasy, numMedium, numHard) {
    // Separate questions by difficulty
    const easyQuestions = questions.filter(q => q.difficulty === "easy");
    const mediumQuestions = questions.filter(q => q.difficulty === "medium");
    const hardQuestions = questions.filter(q => q.difficulty === "hard");

    // Further separate by type (reading/writing)
    const easyReading = easyQuestions.filter(q => q.type === "reading");
    const easyWriting = easyQuestions.filter(q => q.type === "writing");

    const mediumReading = mediumQuestions.filter(q => q.type === "reading");
    const mediumWriting = mediumQuestions.filter(q => q.type === "writing");

    const hardReading = hardQuestions.filter(q => q.type === "reading");
    const hardWriting = hardQuestions.filter(q => q.type === "writing");

    // Function to get random questions
    function getRandom(arr, num) {
        return arr.sort(() => 0.5 - Math.random()).slice(0, num);
    }

    // Select 9 reading and 9 writing questions for each difficulty level
    const selectedEasy = [...getRandom(easyReading, numEasy / 2), ...getRandom(easyWriting, numEasy / 2)];
    const selectedMedium = [...getRandom(mediumReading, numMedium / 2), ...getRandom(mediumWriting, numMedium / 2)];
    const selectedHard = [...getRandom(hardReading, numHard / 2), ...getRandom(hardWriting, numHard / 2)];

    // Return ordered questions (Easy → Medium → Hard)
    return [...selectedEasy, ...selectedMedium, ...selectedHard];
}

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionCategory = currentQuestion.type; // Category (e.g., reading, writing)
    let questionDifficulty = currentQuestion.difficulty; // Difficulty level

    // Initialize category tracking if not already set
    if (!categoryStats[questionCategory]) {
        categoryStats[questionCategory] = { correct: 0, incorrect: 0 };
    }

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        categoryStats[questionCategory].correct++; // Track correct answer

        // Difficulty-based scoring
        if (questionDifficulty === "easy") {
            score += 1;
        } else if (questionDifficulty === "medium") {
            score += 2;
        } else if (questionDifficulty === "hard") {
            score += 3;
        }
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats[questionCategory].incorrect++; // Track incorrect answer
    }

    // Disable all buttons after selection & highlight correct answer
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Show next button
    nextButton.style.display = "block";

    // Save updated category stats in localStorage
    localStorage.setItem("categoryStats", JSON.stringify(categoryStats));
}


function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (18 * 1) + (18 * 2) + (18 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);

    // Save reading score before redirecting
    localStorage.setItem("readingScore", scaledScore);

    let today = new Date().toLocaleDateString("en-CA"); // Local timezone, formatted as YYYY-MM-DD

    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || {};
    scoreHistory[today] = scaledScore;
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

    questionElement.innerHTML = `Reading and Writing SAT Score: ${scaledScore} / 800`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";

    document.getElementById("progress-bar").style.width = "100%";
    updateScoreGraph();
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) { // ✅ FIXED: Now uses selectedQuestions
        showQuestion();
    } else {
        showScore();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) { // ✅ FIXED: Now uses selectedQuestions
        handleNextButton();
    } else {
        mathlink();
    }
});

function mathlink() {
    location.href = "https://www.brainjelli.com/user-profile.html";
}

startQuiz();
