const startingMinutes = 8;
const countdownEl = document.getElementById('countdown');

let time = startingMinutes * 60;
let refreshIntervalId;
let quizEnded = false; // Prevents multiple calls

function startTimer() {
    clearInterval(refreshIntervalId); // ✅ Clears any existing interval before starting a new one
    quizEnded = false; // ✅ Reset flag when the quiz restarts
    time = startingMinutes * 60; // ✅ Reset timer correctly
    refreshIntervalId = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${seconds}`;

    if (time <= 0) { 
        clearInterval(refreshIntervalId);
        endQuiz();
    } else {
        time--; 
    }
}

function endQuiz() {
    console.log("Quiz ended."); // Debugging log
    clearInterval(refreshIntervalId);
    clearTimeout(quizTimeout); // ✅ Ensure timeout is cleared on manual ending
    showScore();
}

function restartQuiz() {
    startTimer(); // ✅ Restart timer properly
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    nextButton.style.display = "none"; // Hide the button after clicking
    fetchQuestions();  // Reload questions
}

// ✅ Start timer when quiz loads
startTimer();

const questionsData = {
    1: [
        { question: "The museum, which houses ancient artifacts from various civilizations, attract thousands of visitors every year.<br/>Which choice best corrects the underlined portion?", options: ["attracts", "attract", "have attracted", "are attracting"], answer: "attracts" },
        { question: "She was so engrossed in her book that she barely noticed when someone set next to her on the bench.<br/>Which choice best corrects the underlined portion?", options: ["set", "has set", "sits", "sat"], answer: "sat" },
        { question: "In order to successfully complete the project, the team must cooperate together and communicate effectively.<br/>Which choice best corrects the underlined portion?", options: ["cooperate together and talk efficiently", "cooperate alongside one another and communicate effectively", "cooperating together and communicating effectively","cooperate and communicate effectively"], answer: "cooperate and communicate effectively" },
        { question: "Bees play a crucial role in pollination, transferring pollen between flowers to facilitate plant reproduction. Without bees, many crops would struggle to produce fruit, leading to significant food shortages.<br/>What is the main idea of the passage?", options: ["Bees are dangerous insects that harm crops.", "Bees are essential for plant reproduction and food production.","Many plants can reproduce without pollination.", "Bees only pollinate flowers in specific regions."], answer: "Bees are essential for plant reproduction and food production.",  },
        { question: "The scientist's theory was initially met with skepticism, but over time, the evidence became incontrovertible.<br/>In this context, 'incontrovertible' most nearly means:", options: ["debatable", "complicated", "undeniable","confusing"], answer: "undeniable" },
        { question: "Lena carefully wrapped the gift in bright paper, tied a ribbon around it, and wrote a heartfelt note before placing it on the table with a smile.", options: ["She is unsure about whether the gift is appropriate.", "She regrets buying the gift.", "She is worried the recipient won’t like the gift.","She is excited about giving the gift."], answer: "She is excited about giving the gift." },
        { question: "What is the value of x in the equation 3x + 5 = 14?", options: ["2", "3", "4","5"], answer: "3" },
        { question: "A store is offering a 20% discount on a jacket that originally costs $50. What is the sale price of the jacket?", options: ["$30", "35", "$40","$45"], answer: "$40" },
        { question: "A rectangle has a length of 8 units and a width of 5 units. What is its area?", options: ["13 square units", "30 square units", "40 square units","80 square units"], answer:  "40 square units" }
        
        
    ],
    2: [
        { question: "The group of students ___ planning a trip to the museum next week.", options: ["is","are", "were", "have been"], answer: "is" },
        { question: "After the storm, the hikers had to find an ___ route because their usual path was blocked.", options: ["alternating", "alternate","alteration", "alternative"], answer: "alternative" },
        { question: "The scientist conducted an experiment in order to test out a new hypothesis. Which choice best improves the sentence?", options: ["The scientist conducted an experiment to test a new hypothesis.", "The scientist conducted an experiment for testing out a new hypothesis.", "The scientist did an experiment to test a new hypothesis.","The scientist performed an experiment in order to test out a new hypothesis."], answer: "The scientist conducted an experiment to test a new hypothesis." },
        { question: "What is the main idea of the passage? 'Marie Curie’s groundbreaking research on radioactivity not only earned her two Nobel Prizes but also paved the way for advancements in medicine and energy. Her discoveries laid the foundation for modern cancer treatments and nuclear power generation.'", options: ["Marie Curie won two Nobel Prizes but faced many challenges.", "Marie Curie’s research significantly impacted medicine and energy.", "The dangers of radioactivity were unknown during Marie Curie’s time.","Marie Curie was the only scientist working on radioactivity."], answer: "Marie Curie’s research significantly impacted medicine and energy." },
        { question: "In this context, 'acquiesced' most nearly means: 'Despite his initial reluctance, James ultimately acquiesced to his friend’s request to join the debate team.'", options: ["refused", "suggested", "criticized", "agreed"], answer: "agreed" },
        { question: "What can be inferred about Sarah? 'As she stood at the edge of the diving board, Sarah took a deep breath, her hands trembling slightly. Below, the water shimmered in the sunlight, both inviting and intimidating.'", options: ["She is an experienced diver.", "She is nervous about jumping.", "She prefers swimming to diving.","She is afraid of the water."], answer: "She is nervous about jumping." },
        { question: "What is the value of x in the equation 4x - 6 = 10?", options: ["2", "3", "4","5"], answer: "5" },
        { question: "If 2/3 of a number is 12, what is the number?", options: ["16", "18", "20","24"], answer: "18" },
        { question: "A triangle has a base of 10 units and a height of 6 units. What is its area?", options: ["20 square units", "30 square units", "40 square units","60 square units"], answer: "30 square units" },
        
    ],
    3: [
        { question: "The collection of rare books ___ stored in a temperature-controlled room.", options: ["are", "is", "were","have been"], answer: "is" },
        { question: "To complete the science project, students must submit a report ___ their findings.", options: ["describing", "describes", "descriptive","description"], answer: "describing" },
        { question: "Which choice best improves the sentence? 'The manager carefully analyzed the data before to make a decision.'", options: ["before to deciding.", "before he make a decision.", "before making a decision.","before to make decision."], answer: "before making a decision." },
        { question: "What is the main idea of the passage? 'The Wright brothers revolutionized transportation by successfully inventing the first powered aircraft. Their innovations laid the foundation for modern aviation and changed how people travel around the world.'", options: ["The Wright brothers flew the longest flight in history.", "The Wright brothers only made minor contributions to aviation.", "The Wright brothers' airplane was never successful.","The Wright brothers' work led to modern aviation."], answer: "The Wright brothers' work led to modern aviation." },
        { question: "In this context, 'apprehensive' most nearly means: 'As the roller coaster climbed to its highest point, Jake felt apprehensive about the upcoming drop.'", options: ["nervous", "excited", "angry","confused"], answer: "nervous" },
        { question: "What can be inferred about Lisa? 'Lisa glanced at her watch and quickened her pace, weaving through the crowded streets as she clutched the invitation tightly in her hand.'", options: ["She is lost in an unfamiliar place.", "She is afraid of the crowd.", "She is running late for an event.","She forgot her invitation."], answer: "She is running late for an event." },
        { question: "Solve for x: 5x + 3 = 18", options: ["2", "3", "4","5"], answer: "3" },
        { question: "A rectangular garden has a length of 12 feet and a width of 5 feet. What is its area?", options: ["17 square feet", "24 square feet", "60 square feet","120 square feet"], answer: "60 square feet" },
        { question: "A book originally costs $30 and is on sale for 25% off. What is the sale price?", options: ["$20", "$22.50", "$25","$27"], answer: "$22.50" },
    ],
    4:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nShe completed the project **in an efficient and effective way**.",
            options: ["A) in an efficient and effective way", "B) efficiently and effectively", "C) in a manner that was both efficient and effective", "D) No change"],
            answer: "B) efficiently and effectively"
        },
        {  
            question: "Which option corrects the grammatical error?\nThe team **are** preparing for the big game.",
            options: ["A) are", "B) is", "C) have been", "D) No change"],
            answer: "B) is"
        },
        {  
            question: "Which revision improves sentence conciseness?\nThe reason that she applied for the scholarship was because she needed financial aid.",
            options: ["A) The reason that", "B) Because", "C) Due to the fact that", "D) No change"],
            answer: "B) Because"
        },
    
        // Reading Questions
        {  
            question: "Passage: Regular reading can enhance vocabulary and improve comprehension skills. Studies suggest that individuals who read frequently perform better on tests and have a broader knowledge base.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Reading regularly can improve vocabulary and comprehension.",
                "B) Reading is only beneficial for test-taking.",
                "C) Knowledge is gained solely through books.",
                "D) Vocabulary improvement is unrelated to reading."
            ],
            answer: "A) Reading regularly can improve vocabulary and comprehension."
        },
        {  
            question: "Passage: A healthy diet includes a variety of nutrients, such as vitamins and minerals, that help the body function properly. Eating balanced meals promotes overall well-being.\n\nWhich statement best supports the author’s claim?",
            options: [
                "A) A healthy diet consists of essential nutrients.",
                "B) Only certain foods contain nutrients.",
                "C) Meals should consist solely of vitamins.",
                "D) Minerals are not necessary for health."
            ],
            answer: "A) A healthy diet consists of essential nutrients."
        },
        {  
            question: "Passage: The young musician practiced for hours every day. Eventually, she became proficient and was invited to perform at a concert.\n\nWhat can be inferred about the musician?",
            options: [
                "A) She worked hard to improve her skills.",
                "B) She disliked practicing.",
                "C) She avoided performances.",
                "D) Her skills did not improve despite practice."
            ],
            answer: "A) She worked hard to improve her skills."
        },
    
        // Math Questions
        {  
            question: "If 2x + 5 = 13, what is the value of x?",
            options: ["A) 3", "B) 4", "C) 5", "D) 6"],
            answer: "B) 4"
        },
        {  
            question: "A triangle has a base of 10 and a height of 6. What is its area?",
            options: ["A) 30", "B) 40", "C) 50", "D) 60"],
            answer: "A) 30"
        },
        {  
            question: "If f(x) = x^2 - 2x + 1, what is f(3)?",
            options: ["A) 2", "B) 3", "C) 4", "D) 5"],
            answer: "A) 4"
        }
    ]
    
    ,
    5:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe teacher gave instructions **in a clear and concise manner** so that all students understood.",
            options: ["A) in a clear and concise manner", "B) clearly and concisely", "C) in an extremely clear way", "D) No change"],
            answer: "B) clearly and concisely"
        },
        {  
            question: "Which option corrects the grammatical error?\nThe group of friends **was** excited for the trip.",
            options: ["A) was", "B) were", "C) have been", "D) No change"],
            answer: "D) No change"
        },
        {  
            question: "Which revision improves sentence conciseness?\nShe made the decision to leave the party early because she was feeling tired.",
            options: ["A) made the decision to", "B) decided to", "C) came to the conclusion to", "D) No change"],
            answer: "B) decided to"
        },
    
        // Reading Questions
        {  
            question: "Passage: Exercise has numerous benefits, including improved cardiovascular health and increased energy levels. Many studies suggest that regular physical activity can also boost mental well-being.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Exercise has multiple benefits, including physical and mental health improvements.",
                "B) Exercise is only beneficial for cardiovascular health.",
                "C) Energy levels decrease with physical activity.",
                "D) Mental well-being does not improve with exercise."
            ],
            answer: "A) Exercise has multiple benefits, including physical and mental health improvements."
        },
        {  
            question: "Passage: A balanced diet consists of various nutrients, including proteins, carbohydrates, and fats. Eating a variety of foods helps ensure that the body gets all the essential vitamins and minerals it needs.\n\nWhich statement best supports the author’s claim?",
            options: [
                "A) A balanced diet provides essential nutrients.",
                "B) Only proteins are necessary for a healthy diet.",
                "C) Carbohydrates should be avoided.",
                "D) Vitamins and minerals are not important for health."
            ],
            answer: "A) A balanced diet provides essential nutrients."
        },
        {  
            question: "Passage: The young artist practiced painting every day. Over time, her skills improved, and she started showcasing her work at local galleries.\n\nWhat can be inferred about the artist?",
            options: [
                "A) She worked hard to improve her painting skills.",
                "B) She disliked painting.",
                "C) She never showcased her artwork.",
                "D) Her skills remained the same despite practicing."
            ],
            answer: "A) She worked hard to improve her painting skills."
        },
    
        // Math Questions
        {  
            question: "If 3x + 8 = 17, what is the value of x?",
            options: ["A) 2", "B) 3", "C) 4", "D) 5"],
            answer: "B) 3"
        },
        {  
            question: "A rectangle has a length of 12 and a width of 5. What is its area?",
            options: ["A) 50", "B) 55", "C) 60", "D) 65"],
            answer: "A) 50"
        },
        {  
            question: "If g(x) = x^2 - 4x + 3, what is g(3)?",
            options: ["A) 0", "B) 1", "C) 2", "D) 3"],
            answer: "B) 2"
        }
    ]
    ,
    6:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe manager will review the proposal **at this moment in time** before making a decision.",
            options: ["A) at this moment in time", "B) now", "C) eventually", "D) No change"],
            answer: "B) now"
        },
        {  
            question: "Which option corrects the grammatical error?\nNeither of the players **are** ready for the game.",
            options: ["A) are", "B) is", "C) were", "D) No change"],
            answer: "B) is"
        },
        {  
            question: "Which revision improves sentence conciseness?\nHe made a decision that was completely unexpected.",
            options: ["A) made a decision that was", "B) decided", "C) came to the conclusion that was", "D) No change"],
            answer: "B) decided"
        },
    
        // Reading Questions
        {  
            question: "Passage: Renewable energy sources, such as wind and solar power, are becoming more popular as alternatives to fossil fuels. Many countries are investing in clean energy to reduce carbon emissions.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Renewable energy is gaining popularity and reducing carbon emissions.",
                "B) Fossil fuels are better than renewable energy sources.",
                "C) Wind power is the best form of renewable energy.",
                "D) Solar power is unreliable."
            ],
            answer: "A) Renewable energy is gaining popularity and reducing carbon emissions."
        },
        {  
            question: "Passage: Studies show that students who read frequently develop stronger analytical skills. Reading helps expand vocabulary and enhances critical thinking abilities.\n\nWhich statement best supports the author's claim?",
            options: [
                "A) Reading improves vocabulary and analytical skills.",
                "B) Some people do not enjoy reading.",
                "C) Students should read only academic texts.",
                "D) Watching movies is better than reading."
            ],
            answer: "A) Reading improves vocabulary and analytical skills."
        },
        {  
            question: "Passage: The scientist hesitated before announcing her discovery. She wanted to verify her results to ensure accuracy.\n\nWhat can be inferred about the scientist?",
            options: [
                "A) She is careless about accuracy.",
                "B) She values precision in her work.",
                "C) She is eager to share her findings immediately.",
                "D) She does not trust scientific methods."
            ],
            answer: "B) She values precision in her work."
        },
    
        // Math Questions
        {  
            question: "If 4x + 7 = 19, what is the value of x?",
            options: ["A) 2", "B) 3", "C) 4", "D) 5"],
            answer: "B) 3"
        },
        {  
            question: "A triangle has a base of 10 and a height of 6. What is its area?",
            options: ["A) 30", "B) 40", "C) 50", "D) 60"],
            answer: "A) 30"
        },
        {  
            question: "If f(x) = x^2 - 5x + 6, what is f(2)?",
            options: ["A) 0", "B) 1", "C) 2", "D) 3"],
            answer: "B) 2"
        }
    ]
    ,
    7:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe committee will make a decision **at this point in time**, considering all available information.",
            options: ["A) at this point in time", "B) now", "C) at a future date", "D) No change"],
            answer: "B) now"
        },
        {  
            question: "Which option corrects the grammatical error?\nThe team **has** completed their assignments ahead of schedule.",
            options: ["A) has", "B) have", "C) is", "D) No change"],
            answer: "B) have"
        },
        {  
            question: "Which revision improves sentence conciseness?\nDue to the fact that he was late, he missed the introduction.",
            options: ["A) Due to the fact that", "B) Because", "C) Owing to", "D) No change"],
            answer: "B) Because"
        },
    
        // Reading Questions
        {  
            question: "Passage: As cities expand, green spaces become more limited. Many researchers argue that urban parks play a crucial role in maintaining biodiversity and improving mental well-being.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Urban parks are important for biodiversity and well-being.",
                "B) Cities should not expand further.",
                "C) Green spaces are not necessary in cities.",
                "D) Urban development has no impact on nature."
            ],
            answer: "A) Urban parks are important for biodiversity and well-being."
        },
        {  
            question: "Passage: Scientists studying ocean currents have discovered that changes in water temperature affect marine life. Many species migrate earlier than usual, disrupting ecosystems.\n\nWhich statement best supports the author’s claim about ocean temperature changes?",
            options: [
                "A) Warmer waters cause some species to migrate earlier.",
                "B) Marine life is not affected by temperature changes.",
                "C) Ocean currents do not impact ecosystems.",
                "D) Migration patterns remain unchanged."
            ],
            answer: "A) Warmer waters cause some species to migrate earlier."
        },
        {  
            question: "Passage: The young artist hesitated before displaying her painting. She worried about how others would react but knew she had to take a chance.\n\nWhat can be inferred about the artist’s feelings?",
            options: [
                "A) She is confident in her artwork.",
                "B) She is uncertain but willing to take a risk.",
                "C) She does not care about others' opinions.",
                "D) She regrets creating the painting."
            ],
            answer: "B) She is uncertain but willing to take a risk."
        },
    
        // Math Questions
        {  
            question: "If 3x + 4 = 19, what is the value of x?",
            options: ["A) 3", "B) 4", "C) 5", "D) 6"],
            answer: "C) 5"
        },
        {  
            question: "A rectangle has a length of 12 and a width of 5. What is its area?",
            options: ["A) 50", "B) 55", "C) 60", "D) 65"],
            answer: "A) 50"
        },
        {  
            question: "If g(x) = x^2 - 4x + 5, what is g(3)?",
            options: ["A) 2", "B) 3", "C) 4", "D) 5"],
            answer: "B) 2"
        }
    ]
    
    ,
    8:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe manager decided to schedule the meeting **at this particular point in time**, ensuring everyone could attend.",
            options: ["A) at this particular point in time", "B) now", "C) at some point", "D) No change"],
            answer: "B) now"
        },
        {  
            question: "Which option corrects the grammatical error?\nNeither of the candidates **are** qualified for the position.",
            options: ["A) are", "B) is", "C) were", "D) No change"],
            answer: "B) is"
        },
        {  
            question: "Which revision improves the sentence’s conciseness?\nIn order to successfully complete the project, the team must collaborate effectively.",
            options: ["A) In order to", "B) To", "C) For the purpose of", "D) No change"],
            answer: "B) To"
        },
    
        // Reading Questions
        {  
            question: "Passage: Over the years, renewable energy sources such as solar and wind power have become more accessible. As technology advances, these sources are expected to replace traditional fossil fuels, reducing environmental damage.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Renewable energy is becoming more accessible and may replace fossil fuels.",
                "B) Fossil fuels are not harmful to the environment.",
                "C) Renewable energy is too expensive to be widely used.",
                "D) Technology has had little impact on renewable energy."
            ],
            answer: "A) Renewable energy is becoming more accessible and may replace fossil fuels."
        },
        {  
            question: "Passage: The author describes the impact of social media on communication, emphasizing how it has altered the way people interact. While some believe social media enhances connectivity, others argue that it weakens genuine relationships.\n\nWhich statement best supports the author’s discussion of social media’s impact?",
            options: [
                "A) Social media increases connectivity but may weaken personal relationships.",
                "B) People do not use social media frequently.",
                "C) Social media has no effect on communication.",
                "D) Everyone agrees that social media is beneficial."
            ],
            answer: "A) Social media increases connectivity but may weaken personal relationships."
        },
        {  
            question: "Passage: The scientist hesitated before announcing her findings. She knew her research would challenge widely accepted theories, but she was determined to share the truth.\n\nWhat can be inferred about the scientist’s feelings?",
            options: [
                "A) She is confident and eager to share her findings.",
                "B) She is nervous but committed to presenting her research.",
                "C) She is indifferent about her discovery.",
                "D) She does not believe in her own research.",
            ],
            answer: "B) She is nervous but committed to presenting her research."
        },
    
        // Math Questions
        {  
            question: "If 4x - 5 = 19, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "D) 6"
        },
        {  
            question: "A triangle has a base of 10 and a height of 7. What is its area?",
            options: ["A) 35", "B) 40", "C) 45", "D) 50"],
            answer: "A) 35"
        },
        {  
            question: "If f(x) = x^2 - 3x + 4, what is f(6)?",
            options: ["A) 22", "B) 25", "C) 28", "D) 31"],
            answer: "C) 28"
        }
    ]
    ,
    9:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe scientist presented her findings **at this moment in time**, explaining the significance of her discovery.",
            options: ["A) at this moment in time", "B) now", "C) eventually", "D) No change"],
            answer: "B) now"
        },
        {  
            question: "Which option corrects the grammatical error?\nEither the manager or the employees **is** responsible for closing the store.",
            options: ["A) is", "B) are", "C) have been", "D) No change"],
            answer: "B) are"
        },
        {  
            question: "Which revision improves the sentence's conciseness?\nDue to the fact that she was exhausted, she decided to leave early.",
            options: ["A) Due to the fact that", "B) Because", "C) Since", "D) No change"],
            answer: "B) Because"
        },
    
        // Reading Questions
        {  
            question: "Passage: Over the past decade, the shift to digital communication has transformed the way people interact. Emails, text messages, and video calls have replaced traditional letters and face-to-face meetings. While these advancements improve efficiency, some argue they reduce the depth of human connection.\n\nWhat is the primary argument of the passage?",
            options: [
                "A) Digital communication is more efficient but may weaken human connections.",
                "B) Traditional letters are still widely used today.",
                "C) Video calls are the most effective form of communication.",
                "D) Face-to-face meetings are no longer necessary."
            ],
            answer: "A) Digital communication is more efficient but may weaken human connections."
        },
        {  
            question: "Passage: In recent years, urban gardening has gained popularity as more people seek sustainable food sources. Community gardens provide fresh produce while fostering social connections among neighbors. Experts suggest that urban gardening can help address food insecurity and improve city landscapes.\n\nWhich statement best supports the author's claim about urban gardening?",
            options: [
                "A) It helps improve local food security and fosters community bonds.",
                "B) It is an expensive hobby that only benefits the wealthy.",
                "C) It requires advanced gardening skills.",
                "D) It has little impact on city environments."
            ],
            answer: "A) It helps improve local food security and fosters community bonds."
        },
        {  
            question: "Passage: The explorer hesitated at the mouth of the cave, listening carefully. The map had indicated hidden dangers, but nothing in his experience could prepare him for what lay ahead. Taking a deep breath, he stepped inside, determined to uncover the cave’s secrets.\n\nWhat can be inferred about the explorer’s mindset?",
            options: [
                "A) He is fearful and unwilling to proceed.",
                "B) He is hesitant but determined to continue.",
                "C) He is overconfident and careless.",
                "D) He has no knowledge of potential dangers."
            ],
            answer: "B) He is hesitant but determined to continue."
        },
    
        // Math Questions
        {  
            question: "If 3x - 4 = 17, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "C) 7"
        },
        {  
            question: "A rectangle has a length of 12 and a width of 5. What is its area?",
            options: ["A) 50", "B) 55", "C) 60", "D) 65"],
            answer: "A) 50"
        },
        {  
            question: "If g(x) = x^2 - 4x + 6, what is g(5)?",
            options: ["A) 11", "B) 12", "C) 13", "D) 14"],
            answer: "B) 11"
        }
    ]
    
    ,
    10:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe manager will evaluate the proposals **at this point in time** before making a decision.",
            options: ["A) at this point in time", "B) now", "C) eventually", "D) No change"],
            answer: "B) now"
        },
        {  
            question: "Which option corrects the grammatical error?\nNeither the students nor the teacher **were** prepared for the sudden announcement.",
            options: ["A) were", "B) was", "C) have been", "D) No change"],
            answer: "B) was"
        },
        {  
            question: "Which revision improves the sentence's conciseness?\nIn spite of the fact that he was late, he still managed to complete the exam.",
            options: ["A) In spite of the fact that", "B) Despite", "C) Although", "D) No change"],
            answer: "B) Despite"
        },
    
        // Reading Questions
        {  
            question: "Passage: In recent years, the world has seen a growing shift toward renewable energy sources. Solar panels, wind turbines, and hydroelectric power are becoming more widespread, reducing dependence on fossil fuels. Researchers argue that this transition is crucial for combating climate change and ensuring a sustainable future.\n\nWhat is the author's primary argument in the passage?",
            options: [
                "A) That global warming is a hoax.",
                "B) That renewable energy is vital for sustainability.",
                "C) That ancient civilizations had advanced technology.",
                "D) That modern architecture lacks creativity."
            ],
            answer: "B) That renewable energy is vital for sustainability."
        },
        {  
            question: "Passage: Education has long been considered the foundation for personal and societal growth. Studies show that individuals with higher levels of education tend to earn more, experience lower unemployment rates, and contribute more effectively to their communities. In addition, access to quality education helps bridge economic and social inequalities.\n\nWhich statement best supports the author's claim about the importance of education?",
            options: [
                "A) Education helps individuals secure better job opportunities.",
                "B) Many people prefer online courses over traditional classrooms.",
                "C) Schools should increase their extracurricular activities.",
                "D) Learning a new language is beneficial."
            ],
            answer: "A) Education helps individuals secure better job opportunities."
        },
        {  
            question: "Passage: The protagonist stood at the crossroads, glancing at the map in their hands. Every choice led to a different future, yet deep down, they already knew the right path. With a determined breath, they took the first step forward, fully aware of the challenges ahead but confident in their decision.\n\nWhat can be inferred about the protagonist’s decision in the passage?",
            options: [
                "A) It was made under social pressure.",
                "B) It was purely accidental.",
                "C) It was driven by a deep understanding of the situation.",
                "D) It was based on outdated information."
            ],
            answer: "C) It was driven by a deep understanding of the situation."
        },
    
        // Math Questions
        {  
            question: "If 4x + 7 = 31, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "B) 6"
        },
        {  
            question: "A triangle has sides of length 6, 8, and 10. What type of triangle is it?",
            options: ["A) Equilateral", "B) Isosceles", "C) Right", "D) Scalene"],
            answer: "C) Right"
        },
        {  
            question: "If f(x) = 2x^2 - 3x + 5, what is f(3)?",
            options: ["A) 14", "B) 15", "C) 16", "D) 17"],
            answer: "A) 14"
        }
    ]
    ,
    11:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe committee made a decision that was both final and unchangeable.",
            options: ["A) final and unchangeable", "B) definitive", "C) final in nature and not subject to change", "D) No change"],
            answer: "B) definitive"
        },
        {  
            question: "Which option corrects the grammatical error?\nNeither of the solutions **are** effective in addressing the issue.",
            options: ["A) are", "B) is", "C) have been", "D) No change"],
            answer: "B) is"
        },
        {  
            question: "Which revision improves sentence conciseness?\nDue to the fact that the storm was approaching, the event was postponed.",
            options: ["A) Due to the fact that", "B) Because", "C) In light of the approaching storm", "D) No change"],
            answer: "B) Because"
        },
    
        // Reading Questions
        {  
            question: "Passage: Advances in artificial intelligence are transforming various industries, from healthcare to finance. Many experts argue that AI will significantly enhance productivity, while others caution against potential ethical concerns.\n\nWhat is the main idea of the passage?",
            options: [
                "A) AI is limited in its applications.",
                "B) AI has both benefits and potential drawbacks.",
                "C) AI is primarily used in healthcare.",
                "D) AI has already replaced most human jobs."
            ],
            answer: "B) AI has both benefits and potential drawbacks."
        },
        {  
            question: "Passage: Renewable energy sources, such as solar and wind power, have gained popularity due to their sustainability. Governments worldwide are investing in these technologies to reduce dependence on fossil fuels and combat climate change.\n\nWhich statement best supports the author’s claim?",
            options: [
                "A) Renewable energy is more expensive than fossil fuels.",
                "B) Governments are increasing funding for solar and wind power.",
                "C) Fossil fuels remain the most reliable source of energy.",
                "D) Solar panels work only in sunny conditions."
            ],
            answer: "B) Governments are increasing funding for solar and wind power."
        },
        {  
            question: "Passage: After years of research, scientists successfully developed a vaccine that significantly reduces the spread of a deadly virus. The breakthrough is expected to save millions of lives worldwide.\n\nWhat can be inferred from the passage?",
            options: [
                "A) The vaccine will completely eradicate the virus.",
                "B) The vaccine was developed without extensive research.",
                "C) The vaccine is expected to have a major impact on public health.",
                "D) The vaccine has not yet been tested."
            ],
            answer: "C) The vaccine is expected to have a major impact on public health."
        },
    
        // Math Questions
        {  
            question: "If 3x - 7 = 20, what is the value of x?",
            options: ["A) 8", "B) 9", "C) 10", "D) 11"],
            answer: "B) 9"
        },
        {  
            question: "A circle has a radius of 5. What is its area? (Use π ≈ 3.14)",
            options: ["A) 25", "B) 31.4", "C) 78.5", "D) 100"],
            answer: "C) 78.5"
        },
        {  
            question: "If g(x) = 2x^2 - 5x + 3, what is g(4)?",
            options: ["A) 19", "B) 21", "C) 25", "D) 27"],
            answer: "A) 19"
        }
    ],
    12:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe scientist conducted an experiment that was both thorough and complete.",
            options: ["A) thorough and complete", "B) comprehensive", "C) exhaustive in nature and fully detailed", "D) No change"],
            answer: "B) comprehensive"
        },
        {  
            question: "Which option corrects the grammatical error?\nEach of the students **have** submitted their assignments on time.",
            options: ["A) have", "B) has", "C) were", "D) No change"],
            answer: "B) has"
        },
        {  
            question: "Which revision improves sentence conciseness?\nIn order to successfully complete the project, the team needed to work together collaboratively.",
            options: ["A) In order to", "B) To", "C) For the purpose of", "D) No change"],
            answer: "B) To"
        },
    
        // Reading Questions
        {  
            question: "Passage: The rapid development of electric vehicles (EVs) has sparked a debate about their long-term impact. While proponents highlight reduced emissions and energy efficiency, critics argue that battery disposal and electricity production still pose environmental concerns.\n\nWhat is the main idea of the passage?",
            options: [
                "A) EVs are the ultimate solution to environmental issues.",
                "B) EVs have both advantages and environmental challenges.",
                "C) EVs are not practical for widespread use.",
                "D) Battery production is the only concern for EVs."
            ],
            answer: "B) EVs have both advantages and environmental challenges."
        },
        {  
            question: "Passage: Historical records indicate that early civilizations developed written language to facilitate trade, record events, and communicate laws. Archaeologists have discovered inscriptions that provide insights into these societies' social structures and daily lives.\n\nWhich statement best supports the author’s claim?",
            options: [
                "A) Written language was primarily used for artistic expression.",
                "B) Archaeological findings reveal written records of trade and laws.",
                "C) Early civilizations had no use for written communication.",
                "D) Laws were communicated only through oral traditions."
            ],
            answer: "B) Archaeological findings reveal written records of trade and laws."
        },
        {  
            question: "Passage: Recent studies on sleep patterns indicate that teenagers require more sleep than previously thought. Researchers suggest that later school start times could improve academic performance and overall well-being.\n\nWhat can be inferred from the passage?",
            options: [
                "A) Teenagers currently get enough sleep.",
                "B) School schedules may not align with teenagers' biological needs.",
                "C) Academic performance is not affected by sleep.",
                "D) Researchers believe school should start earlier."
            ],
            answer: "B) School schedules may not align with teenagers' biological needs."
        },
    
        // Math Questions
        {  
            question: "If 5x + 3 = 28, what is the value of x?",
            options: ["A) 4", "B) 5", "C) 6", "D) 7"],
            answer: "B) 5"
        },
        {  
            question: "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
            options: ["A) 10", "B) 12", "C) 14", "D) 16"],
            answer: "A) 10"
        },
        {  
            question: "If f(x) = x^2 - 4x + 7, what is f(3)?",
            options: ["A) 2", "B) 4", "C) 6", "D) 8"],
            answer: "D) 8"
        }
    ],
    13:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe researchers conducted a study that was both comprehensive and all-encompassing.",
            options: ["A) comprehensive and all-encompassing", "B) thorough", "C) extensive in nature and fully detailed", "D) No change"],
            answer: "B) thorough"
        },
        {  
            question: "Which option corrects the grammatical error?\nEither of the solutions **were** viable options for the project.",
            options: ["A) were", "B) was", "C) have been", "D) No change"],
            answer: "B) was"
        },
        {  
            question: "Which revision improves sentence conciseness?\nOwing to the fact that the deadline was approaching, the team worked quickly.",
            options: ["A) Owing to the fact that", "B) Because", "C) Due to the fact that", "D) No change"],
            answer: "B) Because"
        },
    
        // Reading Questions
        {  
            question: "Passage: The increasing reliance on automation in industries such as manufacturing and logistics has led to concerns about job displacement. While automation improves efficiency, some experts warn that it may also reduce employment opportunities for workers in certain sectors.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Automation has no impact on employment.",
                "B) Automation increases efficiency but raises employment concerns.",
                "C) Automation is unnecessary in modern industries.",
                "D) Workers are adapting to automation without difficulty."
            ],
            answer: "B) Automation increases efficiency but raises employment concerns."
        },
        {  
            question: "Passage: Studies on urban planning suggest that cities designed with green spaces and pedestrian-friendly areas contribute to improved mental health and lower stress levels among residents. Researchers advocate for integrating parks and walkable streets into urban developments.\n\nWhich statement best supports the author’s claim?",
            options: [
                "A) Urban areas should prioritize commercial expansion.",
                "B) Parks and walkable streets promote well-being.",
                "C) Cars are the primary mode of transportation in cities.",
                "D) High-rise buildings contribute to population growth."
            ],
            answer: "B) Parks and walkable streets promote well-being."
        },
        {  
            question: "Passage: Renewable energy sources such as wind and solar power have become increasingly viable alternatives to fossil fuels. Many governments are investing in these technologies to reduce carbon emissions and promote sustainability.\n\nWhat can be inferred from the passage?",
            options: [
                "A) Fossil fuels are more sustainable than renewable energy.",
                "B) Governments see renewable energy as a key to sustainability.",
                "C) Wind and solar power are inefficient energy sources.",
                "D) Renewable energy is no longer being developed."
            ],
            answer: "B) Governments see renewable energy as a key to sustainability."
        },
    
        // Math Questions
        {  
            question: "If 4x - 7 = 21, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "D) 7"
        },
        {  
            question: "A rectangle has a length of 12 and a width of 9. What is its perimeter?",
            options: ["A) 30", "B) 42", "C) 48", "D) 54"],
            answer: "C) 42"
        },
        {  
            question: "If h(x) = 3x^2 - 2x + 4, what is h(2)?",
            options: ["A) 10", "B) 12", "C) 14", "D) 16"],
            answer: "C) 14"
        }
    ],
    14:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe scientist conducted an experiment that was both new and unprecedented.",
            options: ["A) new and unprecedented", "B) innovative", "C) novel and unlike any before", "D) No change"],
            answer: "B) innovative"
        },
        {  
            question: "Which option corrects the grammatical error?\nEach of the students **have** completed their assignments.",
            options: ["A) have", "B) has", "C) had", "D) No change"],
            answer: "B) has"
        },
        {  
            question: "Which revision improves sentence conciseness?\nDespite the fact that she was tired, she continued to work on the project.",
            options: ["A) Despite the fact that", "B) Although", "C) Because she was tired", "D) No change"],
            answer: "B) Although"
        },
    
        // Reading Questions
        {  
            question: "Passage: Advances in space exploration have led to the discovery of planets with conditions that may support life. Scientists continue to search for evidence of extraterrestrial organisms.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Space exploration is a waste of resources.",
                "B) Scientists are interested in finding extraterrestrial life.",
                "C) No planets beyond Earth can support life.",
                "D) Space travel is dangerous and expensive."
            ],
            answer: "B) Scientists are interested in finding extraterrestrial life."
        },
        {  
            question: "Passage: Electric cars are becoming increasingly popular due to their environmental benefits and cost savings on fuel. However, concerns remain about battery disposal and charging infrastructure.\n\nWhich statement best supports the author’s claim?",
            options: [
                "A) Electric cars are more expensive than gasoline cars.",
                "B) Charging stations are being built to support electric vehicles.",
                "C) Most people prefer traditional cars.",
                "D) Electric cars are slower than gasoline cars."
            ],
            answer: "B) Charging stations are being built to support electric vehicles."
        },
        {  
            question: "Passage: After years of technological advancements, scientists have developed a new form of solar panel that is significantly more efficient than previous models. The innovation is expected to revolutionize renewable energy.\n\nWhat can be inferred from the passage?",
            options: [
                "A) The new solar panel technology will replace all other energy sources.",
                "B) The new solar panel technology will improve energy efficiency.",
                "C) Scientists no longer need to research solar power.",
                "D) The new solar panels are too expensive to be practical."
            ],
            answer: "B) The new solar panel technology will improve energy efficiency."
        },
    
        // Math Questions
        {  
            question: "If 5x - 8 = 27, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "C) 7"
        },
        {  
            question: "A cylinder has a radius of 3 and a height of 10. What is its volume? (Use π ≈ 3.14)",
            options: ["A) 282.6", "B) 94.2", "C) 113.1", "D) 314"],
            answer: "A) 282.6"
        },
        {  
            question: "If f(x) = x^2 - 4x + 6, what is f(5)?",
            options: ["A) 11", "B) 13", "C) 15", "D) 17"],
            answer: "B) 11"
        }
    ],
    15:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe manager attempted to try a new approach to increase efficiency.",
            options: ["A) attempted to try", "B) tried", "C) made an attempt to try", "D) No change"],
            answer: "B) tried"
        },
        {  
            question: "Which option corrects the grammatical error?\nNeither of the answers **are** correct.",
            options: ["A) are", "B) is", "C) were", "D) No change"],
            answer: "B) is"
        },
        {  
            question: "Which revision improves sentence conciseness?\nIn light of the fact that she was late, she missed the meeting.",
            options: ["A) In light of the fact that", "B) Since", "C) Due to the fact that", "D) No change"],
            answer: "B) Since"
        },
    
        // Reading Questions
        {  
            question: "Passage: Scientists studying marine life have discovered that certain deep-sea creatures have adapted to extreme conditions by developing bioluminescence. This ability allows them to attract prey and communicate in the dark depths of the ocean.\n\nWhat is the primary purpose of the passage?",
            options: [
                "A) To argue against the use of artificial lighting in deep-sea exploration.",
                "B) To describe how some marine creatures use bioluminescence.",
                "C) To explain the dangers of deep-sea habitats.",
                "D) To compare deep-sea and surface-level marine life."
            ],
            answer: "B) To describe how some marine creatures use bioluminescence."
        },
        {  
            question: "Passage: Urban planners are increasingly focusing on designing cities that prioritize pedestrian and cyclist accessibility. Studies suggest that walkable cities lead to improved public health, reduced traffic congestion, and lower pollution levels.\n\nWhich statement best supports the author’s claim?",
            options: [
                "A) Cities with more cars have fewer accidents.",
                "B) Walkable cities tend to have lower obesity rates.",
                "C) Cyclists are more likely to be injured in traffic.",
                "D) Public transportation is declining in many cities."
            ],
            answer: "B) Walkable cities tend to have lower obesity rates."
        },
        {  
            question: "Passage: Advances in battery technology have significantly extended the lifespan and efficiency of electric vehicles. With improved energy storage capabilities, modern electric cars can travel longer distances on a single charge than ever before.\n\nWhat can be inferred from the passage?",
            options: [
                "A) Electric vehicles are now cheaper than gasoline cars.",
                "B) Battery technology continues to improve over time.",
                "C) Gasoline cars are becoming obsolete.",
                "D) Electric vehicles no longer require charging stations."
            ],
            answer: "B) Battery technology continues to improve over time."
        },
    
        // Math Questions
        {  
            question: "If 3x + 7 = 25, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "A) 5"
        },
        {  
            question: "A sphere has a radius of 4. What is its volume? (Use \u03C0 \u2248 3.14 and formula V = 4/3 \u03C0r^3)",
            options: ["A) 267.95", "B) 201.06", "C) 150.72", "D) 268.08"],
            answer: "A) 267.95"
        },
        {  
            question: "If g(x) = 2x^2 - 3x + 4, what is g(3)?",
            options: ["A) 19", "B) 20", "C) 21", "D) 22"],
            answer: "C) 21"
        }
    ],
    16:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe scientist conducted an experiment in order to determine the results.",
            options: ["A) conducted an experiment in order to", "B) experimented to", "C) conducted an experiment to", "D) No change"],
            answer: "C) conducted an experiment to"
        },
        {  
            question: "Which option corrects the grammatical error?\nEach of the students **have** completed their assignments.",
            options: ["A) have", "B) has", "C) were", "D) No change"],
            answer: "B) has"
        },
        {  
            question: "Which revision improves sentence conciseness?\nDespite the fact that she was exhausted, she continued working.",
            options: ["A) Despite the fact that", "B) Even though", "C) Due to the fact that", "D) No change"],
            answer: "B) Even though"
        },
    
        // Reading Questions
        {  
            question: "Passage: A recent study suggests that regular exercise not only improves physical health but also enhances cognitive function. Researchers found that individuals who engage in moderate aerobic activity multiple times per week perform better on memory tests and exhibit increased neural connectivity.\n\nWhat is the primary purpose of the passage?",
            options: [
                "A) To argue that exercise should be mandatory for students.",
                "B) To highlight the mental benefits of physical activity.",
                "C) To compare different types of exercise routines.",
                "D) To explain how memory works in the brain."
            ],
            answer: "B) To highlight the mental benefits of physical activity."
        },
        {  
            question: "Passage: As cities continue to grow, many urban planners are advocating for the expansion of green spaces. Studies indicate that access to parks and natural environments reduces stress, improves air quality, and fosters social interaction.\n\nWhich statement best supports the author’s claim?",
            options: [
                "A) Green spaces can sometimes be expensive to maintain.",
                "B) People living near parks report higher happiness levels.",
                "C) City populations are increasing at an unprecedented rate.",
                "D) Some cities have fewer parks than others."
            ],
            answer: "B) People living near parks report higher happiness levels."
        },
        {  
            question: "Passage: Advances in renewable energy technology have made solar and wind power more efficient and cost-effective. As a result, more governments and businesses are investing in sustainable energy sources to reduce reliance on fossil fuels.\n\nWhat can be inferred from the passage?",
            options: [
                "A) Fossil fuels are no longer used anywhere in the world.",
                "B) Renewable energy sources are becoming more popular.",
                "C) Wind power is more effective than solar power.",
                "D) Businesses are avoiding sustainable energy sources."
            ],
            answer: "B) Renewable energy sources are becoming more popular."
        },
    
        // Math Questions
        {  
            question: "Solve for x: 4x - 5 = 19.",
            options: ["A) 6", "B) 5", "C) 7", "D) 8"],
            answer: "A) 6"
        },
        {  
            question: "A right triangle has legs of lengths 6 and 8. What is the length of the hypotenuse?",
            options: ["A) 10", "B) 12", "C) 14", "D) 16"],
            answer: "A) 10"
        },
        {  
            question: "If f(x) = x^2 - 4x + 7, what is f(5)?",
            options: ["A) 12", "B) 13", "C) 14", "D) 15"],
            answer: "B) 12"
        }
    ],
    17:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity and conciseness of the sentence?\nThe committee has reached a decision that is final and cannot be changed.",
            options: ["A) has reached a final decision", "B) has made a decision that is final", "C) has reached a decision which is final", "D) No change"],
            answer: "A) has reached a final decision"
        },
        {  
            question: "Which option corrects the error in subject-verb agreement?\nNeither the manager nor the employees **is** responsible for the scheduling conflict.",
            options: ["A) is", "B) are", "C) was", "D) No change"],
            answer: "B) are"
        },
        {  
            question: "Which revision best improves sentence structure and logical flow?\nNot only did the scientist conduct extensive research, but she also conducted detailed analyses.",
            options: [
                "A) Not only did the scientist conduct extensive research, but also detailed analyses.",
                "B) The scientist conducted extensive research and also detailed analyses.",
                "C) The scientist conducted both extensive research and detailed analyses.",
                "D) No change"
            ],
            answer: "C) The scientist conducted both extensive research and detailed analyses."
        },
    
        // Reading Questions
        {  
            question: "Passage: In a groundbreaking discovery, researchers have identified a species of bacteria that can break down plastic at a significantly faster rate than previously known organisms. These bacteria secrete enzymes that accelerate the decomposition process, offering a potential solution to plastic waste accumulation.\n\nWhich choice best describes the main idea of the passage?",
            options: [
                "A) A newly discovered bacteria may help reduce plastic waste.",
                "B) Scientists are concerned about the spread of bacteria in landfills.",
                "C) Plastic waste is increasing at an alarming rate.",
                "D) The decomposition of plastic releases harmful chemicals."
            ],
            answer: "A) A newly discovered bacteria may help reduce plastic waste."
        },
        {  
            question: "Passage: The 19th-century poet Emily Dickinson was known for her reclusive nature, yet her poetry reflects deep engagement with themes of love, nature, and mortality. Though only a few of her poems were published during her lifetime, she is now regarded as one of the most influential American poets.\n\nWhich statement is best supported by the passage?",
            options: [
                "A) Emily Dickinson published numerous poems during her lifetime.",
                "B) Emily Dickinson’s poetry was not well-received after her death.",
                "C) Despite her seclusion, Dickinson’s poetry explored profound themes.",
                "D) Most of Dickinson’s poetry was written in collaboration with others."
            ],
            answer: "C) Despite her seclusion, Dickinson’s poetry explored profound themes."
        },
        {  
            question: "Passage: Many marine species rely on coral reefs for food and shelter. However, rising ocean temperatures are causing widespread coral bleaching, which weakens the reefs and threatens marine biodiversity. Scientists are developing strategies to protect and restore coral populations to ensure the survival of these ecosystems.\n\nWhich conclusion is best supported by the passage?",
            options: [
                "A) Marine species can survive without coral reefs.",
                "B) Rising ocean temperatures have no effect on marine biodiversity.",
                "C) Scientists are taking action to combat coral bleaching.",
                "D) Coral reefs are not essential to ocean ecosystems."
            ],
            answer: "C) Scientists are taking action to combat coral bleaching."
        },
    
        // Math Questions
        {  
            question: "If (x - 3)(x + 5) = 0, what are the possible values of x?",
            options: ["A) -3 and 5", "B) 3 and -5", "C) -3 and -5", "D) 3 and 5"],
            answer: "B) 3 and -5"
        },
        {  
            question: "A circle has a diameter of 10. What is the area of the circle? (Use π ≈ 3.14)",
            options: ["A) 31.4", "B) 50", "C) 78.5", "D) 100"],
            answer: "C) 78.5"
        },
        {  
            question: "A train travels 120 miles in 3 hours at a constant speed. At this rate, how far will the train travel in 5 hours?",
            options: ["A) 180 miles", "B) 200 miles", "C) 220 miles", "D) 240 miles"],
            answer: "B) 200 miles"
        }
    ],
    18:[  
        // Writing Questions
        {  
            question: "Which choice best improves the sentence's clarity and conciseness?\nThe book, which was written by an anonymous author, quickly became a bestseller.",
            options: ["A) The book, which was anonymously written,", "B) The book, which an anonymous author wrote,", "C) The book, written by an anonymous author,", "D) No change"],
            answer: "C) The book, written by an anonymous author,"  
        },
        {  
            question: "Which option corrects the grammatical error?\nNeither of the solutions **were** effective in solving the issue.",
            options: ["A) were", "B) was", "C) had been", "D) No change"],
            answer: "B) was"  
        },
        {  
            question: "Which revision best maintains parallel structure?\nThe professor was known for his engaging lectures, clear explanations, and he inspired students.",
            options: ["A) and he inspired students", "B) and for inspiring students", "C) along with his ability to inspire students", "D) No change"],
            answer: "B) and for inspiring students"  
        },
    
        // Reading Questions
        {  
            question: "Passage: Scientists studying the migration patterns of monarch butterflies have discovered that these insects rely on the Earth’s magnetic field to navigate thousands of miles. The findings suggest that monarchs possess a biological compass, helping them travel consistently to their wintering grounds.\n\nWhat is the main purpose of the passage?",
            options: [
                "A) To explain how monarch butterflies use environmental cues to migrate.",
                "B) To argue that monarch butterfly populations are declining due to climate change.",
                "C) To compare the migration patterns of different butterfly species.",
                "D) To challenge the idea that butterflies migrate at all."
            ],
            answer: "A) To explain how monarch butterflies use environmental cues to migrate."
        },
        {  
            question: "Passage: Throughout history, engineers have looked to nature for inspiration. One example is the development of self-cleaning surfaces, inspired by the lotus leaf’s ability to repel water and dirt. This biomimicry has led to innovative coatings used on buildings and clothing.\n\nWhich statement best supports the passage’s main idea?",
            options: [
                "A) Engineers have always struggled to create durable materials.",
                "B) The lotus leaf’s self-cleaning ability has influenced modern technology.",
                "C) Natural materials are more effective than synthetic ones.",
                "D) Some buildings require frequent cleaning due to environmental factors."
            ],
            answer: "B) The lotus leaf’s self-cleaning ability has influenced modern technology."
        },
        {  
            question: "Passage: The introduction of electric vehicles (EVs) has been a major step toward reducing carbon emissions. However, some critics argue that the environmental impact of battery production offsets these benefits. Recent studies suggest that advancements in battery recycling could significantly reduce this issue.\n\nWhat can be inferred from the passage?",
            options: [
                "A) Electric vehicles are worse for the environment than gasoline-powered cars.",
                "B) Improvements in battery technology may enhance EV sustainability.",
                "C) Battery production has no negative environmental impact.",
                "D) Gasoline-powered cars are becoming obsolete."
            ],
            answer: "B) Improvements in battery technology may enhance EV sustainability."
        },
    
        // Math Questions
        {  
            question: "If 2x + 3 = 5x - 7, what is the value of x?",
            options: ["A) 2", "B) 3", "C) 4", "D) 5"],
            answer: "A) 2"  
        },
        {  
            question: "A rectangular prism has a length of 8 cm, a width of 5 cm, and a height of 10 cm. What is its volume?",
            options: ["A) 300 cm^3", "B) 400 cm^3", "C) 500 cm^3", "D) 600 cm^3"],
            answer: "C) 400 cm^3"  
        },
        {  
            question: "If f(x) = x^2 - 6x + 9, what is the minimum value of f(x)?",
            options: ["A) 0", "B) 1", "C) 3", "D) 9"],
            answer: "A) 0"  
        }
    ],
    19:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity of the sentence?\nThe committee discussed the proposal and made a decision to approve it.",
            options: ["A) discussed the proposal and made a decision to", "B) discussed and decided to", "C) had a discussion about the proposal and made a decision to", "D) No change"],
            answer: "B) discussed and decided to"
        },
        {  
            question: "Which option corrects the grammatical error?\nNeither of the solutions **are** viable given the budget constraints.",
            options: ["A) are", "B) is", "C) were", "D) No change"],
            answer: "B) is"
        },
        {  
            question: "Which revision improves sentence conciseness?\nIn light of the fact that the deadline was approaching, the team worked faster.",
            options: ["A) In light of the fact that", "B) Since", "C) Due to the fact that", "D) No change"],
            answer: "B) Since"
        },
    
        // Reading Questions
        {  
            question: "Passage: Scientists have discovered a new species of deep-sea fish that emits its own light through bioluminescence. The fish uses this ability to attract prey and communicate with others of its kind.\n\nWhat is the primary function of the fish’s bioluminescence?",
            options: [
                "A) To warm its body in cold water.",
                "B) To assist in its movement through the depths.",
                "C) To attract prey and communicate.",
                "D) To camouflage itself from predators."
            ],
            answer: "C) To attract prey and communicate."
        },
        {  
            question: "Passage: Economic analysts suggest that technological advancements in automation will continue to replace manual labor in several industries. However, they argue that new job opportunities in emerging fields will offset potential job losses.\n\nWhich statement best reflects the author’s point of view?",
            options: [
                "A) Automation will lead to mass unemployment with no benefits.",
                "B) Emerging industries will create jobs to counteract losses.",
                "C) Governments should ban automation to preserve jobs.",
                "D) The manual labor industry will remain unaffected."
            ],
            answer: "B) Emerging industries will create jobs to counteract losses."
        },
        {  
            question: "Passage: Research has shown that spending time in nature can significantly reduce stress levels. A study found that individuals who took daily walks in parks exhibited lower levels of cortisol, a hormone associated with stress, compared to those who remained in urban environments.\n\nWhat conclusion can be drawn from the passage?",
            options: [
                "A) Walking in parks has no effect on stress levels.",
                "B) Spending time in nature may reduce stress levels.",
                "C) Urban environments are healthier than parks.",
                "D) Cortisol is unrelated to stress."
            ],
            answer: "B) Spending time in nature may reduce stress levels."
        },
    
        // Math Questions
        {  
            question: "Solve for x: 5x - 7 = 3x + 9.",
            options: ["A) 8", "B) 7", "C) 9", "D) 10"],
            answer: "A) 8"
        },
        {  
            question: "A circle has a radius of 6. What is its circumference? (Use π = 3.14)",
            options: ["A) 18.84", "B) 37.68", "C) 28.26", "D) 12.56"],
            answer: "B) 37.68"
        },
        {  
            question: "If g(x) = 2x^2 - 3x + 4, what is g(3)?",
            options: ["A) 13", "B) 16", "C) 17", "D) 18"],
            answer: "A) 13"
        }
    ],
    20:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity and conciseness of the sentence?\nThe scientist conducted an experiment in order to be able to determine the effects of temperature changes on enzyme activity.",
            options: [
                "A) conducted an experiment in order to be able to determine",
                "B) conducted an experiment to determine",
                "C) was able to conduct an experiment to determine",
                "D) No change"
            ],
            answer: "B) conducted an experiment to determine"
        },
        {  
            question: "Which option correctly maintains parallel structure?\nThe new policy aims to promote efficiency, ensuring productivity, and reducing waste.",
            options: [
                "A) ensuring productivity, and reducing waste.",
                "B) to ensure productivity and reduce waste.",
                "C) for ensuring productivity while reducing waste.",
                "D) No change"
            ],
            answer: "B) to ensure productivity and reduce waste."
        },
        {  
            question: "Which revision corrects the misplaced modifier?\nRunning through the park, the fallen leaves crunched under Sarah’s feet.",
            options: [
                "A) Running through the park, the fallen leaves crunched under Sarah’s feet.",
                "B) Running through the park, Sarah’s feet crunched the fallen leaves.",
                "C) As Sarah ran through the park, the fallen leaves crunched under her feet.",
                "D) The fallen leaves crunched under Sarah’s feet as she ran through the park."
            ],
            answer: "D) The fallen leaves crunched under Sarah’s feet as she ran through the park."
        },
    
        // Reading Questions
        {  
            question: "Passage: Recent research on sleep patterns suggests that irregular sleep schedules can significantly impact cognitive function. Scientists found that participants with inconsistent bedtimes performed worse on memory and problem-solving tasks than those with regular sleep schedules.\n\nWhat can be inferred from the passage?",
            options: [
                "A) Sleeping more than 8 hours improves memory and problem-solving skills.",
                "B) Irregular sleep schedules may negatively affect cognitive function.",
                "C) People who wake up early are naturally better problem solvers.",
                "D) Memory performance is unrelated to sleep patterns."
            ],
            answer: "B) Irregular sleep schedules may negatively affect cognitive function."
        },
        {  
            question: "Passage: Archaeological findings indicate that ancient civilizations developed complex trade networks far earlier than previously believed. Artifacts originating from distant regions suggest that goods such as spices, textiles, and metals were exchanged over vast distances.\n\nWhich statement best summarizes the main idea of the passage?",
            options: [
                "A) Ancient civilizations rarely engaged in trade.",
                "B) Trade networks in ancient times were limited to local regions.",
                "C) Evidence suggests ancient civilizations had extensive trade routes.",
                "D) Only modern civilizations have developed widespread trade networks."
            ],
            answer: "C) Evidence suggests ancient civilizations had extensive trade routes."
        },
        {  
            question: "Passage: While many assume that creativity is an innate talent, recent studies show that it can be cultivated through practice. Experts argue that engaging in activities such as brainstorming, experimenting with new ideas, and taking creative risks can enhance one's creative abilities over time.\n\nWhat is the main claim of the passage?",
            options: [
                "A) Creativity is an inherited trait that cannot be developed.",
                "B) People can improve their creativity through deliberate practice.",
                "C) Brainstorming is the only effective method for increasing creativity.",
                "D) Creative risks often lead to failure rather than success."
            ],
            answer: "B) People can improve their creativity through deliberate practice."
        },
    
        // Math Questions
        {  
            question: "If f(x) = 3x² - 4x + 5, what is f(2)?",
            options: ["A) 9", "B) 10", "C) 11", "D) 12"],
            answer: "C) 11"
        },
        {  
            question: "A right triangle has legs of length 7 and 24. What is the length of the hypotenuse?",
            options: ["A) 25", "B) 26", "C) 23", "D) 24"],
            answer: "A) 25"
        },
        {  
            question: "The sum of two numbers is 30, and their product is 216. What is the larger number?",
            options: ["A) 12", "B) 15", "C) 18", "D) 20"],
            answer: "B) 18"
        }
    ],
    21:[  
        // Writing Questions
        {  
            question: "Which revision best improves the sentence's conciseness and clarity?\nDespite the fact that the experiment had failed, the researchers proceeded with their analysis.",
            options: ["A) Despite the fact that", "B) Even though", "C) Because", "D) No change"],
            answer: "B) Even though"
        },
        {  
            question: "Which option correctly addresses the misplaced modifier in the sentence?\nWalking through the museum, the ancient artifacts fascinated Maria.",
            options: ["A) Walking through the museum, the ancient artifacts fascinated Maria.", "B) Walking through the museum, Maria was fascinated by the ancient artifacts.", "C) The ancient artifacts fascinated Maria, walking through the museum.", "D) No change"],
            answer: "B) Walking through the museum, Maria was fascinated by the ancient artifacts."
        },
        {  
            question: "Which choice best corrects the sentence's logical inconsistency?\nHardly anyone failed the exam, but the teacher was disappointed with the overall scores.",
            options: ["A) Hardly anyone failed the exam, but the teacher was disappointed with the overall scores.", "B) Almost everyone failed the exam, but the teacher was disappointed with the overall scores.", "C) The teacher was disappointed with the overall scores, though hardly anyone failed the exam.", "D) No change"],
            answer: "C) The teacher was disappointed with the overall scores, though hardly anyone failed the exam."
        },
    
        // Reading Questions
        {  
            question: "Passage: In a landmark study, cognitive scientists found that decision-making is significantly influenced by emotions rather than logic. Participants were asked to choose between two financial options, one framed as a potential loss and the other as a gain. Despite identical expected values, most participants avoided loss, demonstrating the power of psychological framing.\n\nWhat is the primary conclusion of the study?",
            options: [
                "A) People always act rationally when making financial decisions.",
                "B) Emotions can heavily influence decision-making.",
                "C) Expected values are more important than framing effects.",
                "D) Financial choices are purely logical."
            ],
            answer: "B) Emotions can heavily influence decision-making."
        },
        {  
            question: "Passage: Historian Angela Thompson argues that the Industrial Revolution, rather than fostering innovation, actually slowed technological progress due to centralized production methods. However, other historians suggest that the period saw an unprecedented rise in mechanization.\n\nWhich choice best describes the relationship between the two viewpoints?",
            options: [
                "A) They completely contradict one another.",
                "B) They present differing perspectives on the impact of the Industrial Revolution.",
                "C) They agree that technological innovation was rapid.",
                "D) They suggest that mechanization had no effect on industrialization."
            ],
            answer: "B) They present differing perspectives on the impact of the Industrial Revolution."
        },
        {  
            question: "Passage: The philosopher John Stuart Mill maintained that the freedom of the individual should be preserved at all costs, as long as it does not harm others. However, his critics argue that complete personal liberty can lead to societal instability.\n\nWhat is the author’s stance on Mill’s philosophy?",
            options: [
                "A) The author agrees with Mill’s critics.",
                "B) The author presents both viewpoints without taking a side.",
                "C) The author strongly supports Mill’s argument.",
                "D) The author argues that freedom should have no restrictions."
            ],
            answer: "B) The author presents both viewpoints without taking a side."
        },
    
        // Math Questions
        {  
            question: "If 3^(x+1) = 27, what is the value of x?",
            options: ["A) 1", "B) 2", "C) 3", "D) 4"],
            answer: "B) 2"
        },
        {  
            question: "A function f(x) is defined as f(x) = 2x^2 - 5x + 3. What is the minimum value of f(x)?",
            options: ["A) -2.25", "B) -1.75", "C) -0.5", "D) -3.25"],
            answer: "A) -2.25"
        },
        {  
            question: "A right triangle has legs of lengths 8 and 15. What is the length of the hypotenuse?",
            options: ["A) 16", "B) 17", "C) 18", "D) 19"],
            answer: "B) 17"
        }
    ],
    22:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity and conciseness of the sentence?\nThe scientist conducted an experiment in order to test the hypothesis, which was proposed earlier.",
            options: ["A) conducted an experiment in order to test the hypothesis, which was proposed earlier.", "B) tested the hypothesis through an experiment that had been proposed earlier.", "C) conducted an experiment to test the previously proposed hypothesis.", "D) No change"],
            answer: "C) conducted an experiment to test the previously proposed hypothesis."
        },
        {  
            question: "Which revision corrects the error in subject-verb agreement?\nThe team of researchers **were** analyzing the data for inconsistencies.",
            options: ["A) were", "B) was", "C) have been", "D) No change"],
            answer: "B) was"
        },
        {  
            question: "Which option corrects the misplaced modifier?\nWalking through the museum, the paintings seemed almost lifelike to the visitors.",
            options: ["A) Walking through the museum, the paintings seemed almost lifelike to the visitors.", "B) The paintings seemed almost lifelike to the visitors walking through the museum.", "C) The visitors walking through the museum found the paintings almost lifelike.", "D) No change"],
            answer: "C) The visitors walking through the museum found the paintings almost lifelike."
        },
    
        // Reading Questions
        {  
            question: "Passage: The discovery of gravitational waves revolutionized our understanding of astrophysics. Scientists had long theorized their existence, but it wasn't until 2015 that an observatory successfully detected these ripples in spacetime, confirming Einstein’s century-old predictions. The detection opened new avenues for exploring cosmic events such as black hole mergers.\n\nWhat was the significance of the discovery of gravitational waves?",
            options: [
                "A) It disproved Einstein’s theories about relativity.",
                "B) It provided direct evidence supporting gravitational wave theories.",
                "C) It led to the immediate colonization of other planets.",
                "D) It proved that black holes do not exist."
            ],
            answer: "B) It provided direct evidence supporting gravitational wave theories."
        },
        {  
            question: "Passage: The industrial revolution brought about an era of rapid technological advancement and economic growth. However, the shift from agrarian to industrial societies also introduced numerous social challenges, including poor working conditions, child labor, and widening economic disparities. Reform movements arose to address these issues, advocating for labor rights and fair wages.\n\nWhat is the main purpose of the passage?",
            options: [
                "A) To describe how industrialization improved economic equality.",
                "B) To explain both the benefits and challenges of the industrial revolution.",
                "C) To argue against technological advancement in industry.",
                "D) To propose solutions for future economic growth."
            ],
            answer: "B) To explain both the benefits and challenges of the industrial revolution."
        },
        {  
            question: "Passage: Biologists have discovered a species of tree that thrives in high-salinity environments, where most plants struggle to survive. This unique adaptation allows the tree to absorb and filter salt, maintaining a balance that supports its growth. Scientists believe studying these trees could lead to advancements in agricultural practices for arid regions.\n\nWhat can be inferred about the significance of these trees?",
            options: [
                "A) They are the only trees capable of surviving in saltwater.",
                "B) Their adaptations may provide insights into improving agriculture in dry areas.",
                "C) They thrive by absorbing water from nearby freshwater sources.",
                "D) They are being genetically modified to grow in deserts."
            ],
            answer: "B) Their adaptations may provide insights into improving agriculture in dry areas."
        },
    
        // Math Questions
        {  
            question: "If 3x + 5 = 2x + 11, what is the value of x?",
            options: ["A) 6", "B) 5", "C) 4", "D) 3"],
            answer: "B) 5"
        },
        {  
            question: "A right triangle has legs of length 8 and 15. What is the length of the hypotenuse?",
            options: ["A) 17", "B) 18", "C) 20", "D) 22"],
            answer: "A) 17"
        },
        {  
            question: "A function f(x) is defined as f(x) = 2x^2 - 5x + 3. What is f(4)?",
            options: ["A) 19", "B) 21", "C) 23", "D) 25"],
            answer: "C) 23"
        }
    ],
    23:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity and conciseness of the sentence?\nThe committee members reached a consensus agreement on the issue after discussing it for several hours.",
            options: ["A) reached a consensus agreement on the issue after discussing it for several hours.", "B) reached a consensus after several hours of discussion.", "C) agreed on the issue after they had discussed it for several hours.", "D) No change"],
            answer: "B) reached a consensus after several hours of discussion."
        },
        {  
            question: "Which revision corrects the dangling modifier?\nRunning late for work, the traffic jam was frustrating to Maria.",
            options: ["A) Running late for work, the traffic jam was frustrating to Maria.", "B) The traffic jam, running late for work, frustrated Maria.", "C) Running late for work, Maria found the traffic jam frustrating.", "D) No change"],
            answer: "C) Running late for work, Maria found the traffic jam frustrating."
        },
        {  
            question: "Which choice best combines the two sentences?\nThe scientist presented her findings. The audience listened attentively.",
            options: ["A) The scientist presented her findings while the audience listened attentively.", "B) While the audience listened attentively, the scientist presented her findings.", "C) The scientist, presenting her findings, had the audience listen attentively.", "D) The audience listened attentively when the scientist presented her findings."],
            answer: "A) The scientist presented her findings while the audience listened attentively."
        },
    
        // Reading Questions
        {  
            question: "Passage: The Renaissance period marked a revival of art, science, and literature, driven by a renewed interest in classical antiquity. This era saw the rise of influential figures such as Leonardo da Vinci, Michelangelo, and Galileo, who pushed the boundaries of human knowledge. The printing press, invented by Johannes Gutenberg, played a crucial role in disseminating ideas and fostering intellectual growth.\n\nWhat was one major effect of the invention of the printing press?",
            options: [
                "A) It led to the immediate decline of handwritten manuscripts.",
                "B) It facilitated the rapid spread of knowledge and literacy.",
                "C) It limited access to scientific discoveries.",
                "D) It caused a decrease in artistic achievements."
            ],
            answer: "B) It facilitated the rapid spread of knowledge and literacy."
        },
        {  
            question: "Passage: In the 19th century, the expansion of the railway system revolutionized travel and trade. Goods that once took weeks to transport could now reach their destinations in days. Additionally, people could explore distant cities with unprecedented ease. However, the rapid industrialization brought environmental consequences, including pollution and deforestation.\n\nWhat is the primary purpose of the passage?",
            options: [
                "A) To highlight the environmental drawbacks of railroads.",
                "B) To explain the economic and societal impact of railroads.",
                "C) To argue for the preservation of forests against industrial growth.",
                "D) To describe how railroads eliminated the need for other forms of transportation."
            ],
            answer: "B) To explain the economic and societal impact of railroads."
        },
        {  
            question: "Passage: Scientists studying deep-sea ecosystems have discovered hydrothermal vents that support unique forms of life. These vents release mineral-rich water, creating an environment where organisms thrive without sunlight. The presence of chemosynthetic bacteria allows for an entire ecosystem to exist in the depths of the ocean.\n\nWhat can be inferred about hydrothermal vent ecosystems?",
            options: [
                "A) They depend on sunlight for energy like surface ecosystems.",
                "B) They are sustained by chemosynthetic organisms that convert minerals into energy.",
                "C) They are less biodiverse than other deep-sea environments.",
                "D) They are primarily inhabited by plant species that adapt to high temperatures."
            ],
            answer: "B) They are sustained by chemosynthetic organisms that convert minerals into energy."
        },
    
        // Math Questions
        {  
            question: "A store offers a discount of 20% on a jacket originally priced at $75. After the discount, a sales tax of 8% is applied. What is the final price of the jacket?",
            options: ["A) $64.80", "B) $60.00", "C) $62.40", "D) $65.00"],
            answer: "A) $64.80"
        },
        {  
            question: "A quadratic function is defined as f(x) = x^2 - 6x + 8. What are the x-intercepts of the function?",
            options: ["A) (2,0) and (4,0)", "B) (1,0) and (8,0)", "C) (2,0) and (3,0)", "D) (0,0) and (6,0)"],
            answer: "A) (2,0) and (4,0)"
        },
        {  
            question: "A right circular cone has a base radius of 5 cm and a height of 12 cm. What is the volume of the cone? (Use π ≈ 3.14)",
            options: ["A) 100.48 cm³", "B) 314.00 cm³", "C) 282.60 cm³", "D) 314.20 cm³"],
            answer: "C) 282.60 cm³"
        }
    ],
    24:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity and conciseness of the sentence?\nDespite the fact that the company had significant financial challenges, it still managed to expand its operations internationally.",
            options: ["A) Despite the fact that the company had significant financial challenges, it still managed to expand its operations internationally.", "B) Although the company faced financial challenges, it expanded internationally.", "C) The company had significant financial challenges, yet it still managed to expand operations internationally.", "D) No change"],
            answer: "B) Although the company faced financial challenges, it expanded internationally."
        },
        {  
            question: "Which revision corrects the pronoun-antecedent agreement error?\nEach student must submit their assignment before Friday.",
            options: ["A) Each student must submit their assignment before Friday.", "B) Each student must submit his or her assignment before Friday.", "C) All students must submit their assignment before Friday.", "D) No change"],
            answer: "B) Each student must submit his or her assignment before Friday."
        },
        {  
            question: "Which option corrects the parallelism error?\nThe manager was responsible for organizing meetings, overseeing budgets, and to ensure deadlines were met.",
            options: ["A) organizing meetings, overseeing budgets, and to ensure deadlines were met.", "B) organizing meetings, overseeing budgets, and ensuring deadlines were met.", "C) to organize meetings, overseeing budgets, and ensuring deadlines were met.", "D) No change"],
            answer: "B) organizing meetings, overseeing budgets, and ensuring deadlines were met."
        },
    
        // Reading Questions
        {  
            question: "Passage: Over the past decade, scientists have studied the migration patterns of Arctic terns, small seabirds known for their extraordinary annual journey. These birds travel over 44,000 miles each year, migrating from the Arctic to the Antarctic and back again. The study of their navigation has led to breakthroughs in understanding how animals detect the Earth's magnetic field and use it for orientation.\n\nWhat is the primary purpose of the passage?",
            options: [
                "A) To explain how Arctic terns contribute to climate change.",
                "B) To highlight the navigational abilities of Arctic terns and their scientific significance.",
                "C) To argue that Arctic terns should be classified as an endangered species.",
                "D) To describe the genetic adaptations that allow Arctic terns to migrate."
            ],
            answer: "B) To highlight the navigational abilities of Arctic terns and their scientific significance."
        },
        {  
            question: "Passage: In the early 20th century, Marie Curie became the first woman to win a Nobel Prize, recognized for her pioneering research on radioactivity. Despite facing significant gender biases in the scientific community, Curie remained committed to her work. Her discoveries led to advancements in medical treatments, particularly in the development of radiation therapy for cancer patients.\n\nWhich choice best describes the author’s perspective on Marie Curie?",
            options: [
                "A) The author views Curie’s achievements as impressive despite societal barriers.",
                "B) The author argues that Curie’s discoveries had minimal real-world impact.",
                "C) The author believes that Curie’s scientific work overshadowed her personal struggles.",
                "D) The author focuses on the ethical dilemmas of Curie’s research."
            ],
            answer: "A) The author views Curie’s achievements as impressive despite societal barriers."
        },
        {  
            question: "Passage: Urban planners are increasingly incorporating green spaces into city landscapes to improve public health. Research indicates that access to parks and natural environments reduces stress, promotes physical activity, and enhances overall well-being. However, balancing urban expansion with environmental preservation remains a challenge.\n\nWhich of the following is an implicit assumption in the passage?",
            options: [
                "A) People who live in cities generally dislike urban environments.",
                "B) Access to green spaces has no measurable effect on public health.",
                "C) Urban expansion often comes at the cost of environmental preservation.",
                "D) Green spaces are unnecessary in densely populated areas."
            ],
            answer: "C) Urban expansion often comes at the cost of environmental preservation."
        },
    
        // Math Questions
        {  
            question: "If 5x - 3 = 2x + 12, what is the value of x?",
            options: ["A) 4", "B) 5", "C) 6", "D) 7"],
            answer: "B) 5"
        },
        {  
            question: "A circle has a radius of 6. What is its circumference? (Use \u03C0 = 3.14)",
            options: ["A) 18.84", "B) 28.26", "C) 37.68", "D) 42.56"],
            answer: "C) 37.68"
        },
        {  
            question: "The function f(x) = 3x^2 - 4x + 5 is given. What is f(3)?",
            options: ["A) 20", "B) 22", "C) 23", "D) 24"],
            answer: "A) 20"
        }
    ],
    25:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity and conciseness of the sentence?\nThe reason why the committee postponed the meeting was due to the fact that many members were absent.",
            options: [
                "A) The reason why the committee postponed the meeting was due to the fact that many members were absent.", 
                "B) The committee postponed the meeting because many members were absent.", 
                "C) The reason the committee postponed the meeting was because many members were absent.", 
                "D) Due to the fact that many members were absent, the committee postponed the meeting."
            ],
            answer: "B) The committee postponed the meeting because many members were absent."
        },
        {  
            question: "Which revision corrects the misplaced modifier?\nRunning quickly to catch the bus, my backpack fell off my shoulder.",
            options: [
                "A) Running quickly to catch the bus, my backpack fell off my shoulder.", 
                "B) My backpack fell off my shoulder while running quickly to catch the bus.", 
                "C) As I ran quickly to catch the bus, my backpack fell off my shoulder.", 
                "D) My backpack, running quickly to catch the bus, fell off my shoulder."
            ],
            answer: "C) As I ran quickly to catch the bus, my backpack fell off my shoulder."
        },
        {  
            question: "Which option corrects the subject-verb agreement error?\nNeither the students nor the teacher were prepared for the sudden fire drill.",
            options: [
                "A) Neither the students nor the teacher were prepared for the sudden fire drill.", 
                "B) Neither the students nor the teacher was prepared for the sudden fire drill.", 
                "C) Neither the students nor the teacher have been prepared for the sudden fire drill.", 
                "D) No change."
            ],
            answer: "B) Neither the students nor the teacher was prepared for the sudden fire drill."
        },
    
        // Reading Questions
        {  
            question: "Passage: Scientists studying deep-sea ecosystems have discovered species that thrive in extreme conditions, such as hydrothermal vents, where temperatures can exceed 400°F. These organisms rely on chemosynthesis, a process by which they convert inorganic compounds into energy, instead of relying on sunlight like most life on Earth. Such discoveries challenge existing biological assumptions and open new possibilities for understanding life in extreme environments.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Deep-sea organisms demonstrate unique adaptations to survive in extreme conditions.", 
                "B) Scientists have found that sunlight is unnecessary for all forms of life on Earth.", 
                "C) Hydrothermal vents may provide new resources for human use.", 
                "D) Chemosynthesis is the only method by which deep-sea creatures can generate energy."
            ],
            answer: "A) Deep-sea organisms demonstrate unique adaptations to survive in extreme conditions."
        },
        {  
            question: "Passage: The invention of the printing press in the 15th century revolutionized the spread of knowledge. Before its introduction, books were painstakingly copied by hand, making them scarce and expensive. The ability to mass-produce written materials allowed for the rapid dissemination of ideas, contributing to movements such as the Renaissance and the Reformation.\n\nWhat can be inferred about the impact of the printing press?",
            options: [
                "A) It increased access to knowledge and contributed to significant cultural movements.", 
                "B) It immediately replaced all handwritten texts.", 
                "C) It led to a decline in literacy rates due to the oversaturation of books.", 
                "D) The Renaissance and the Reformation would not have occurred without the printing press."
            ],
            answer: "A) It increased access to knowledge and contributed to significant cultural movements."
        },
        {  
            question: "Passage: Over the past century, urbanization has led to rapid population growth in major cities. While this growth has resulted in economic and cultural benefits, it has also placed significant strain on infrastructure and housing. Many governments struggle to balance expansion with sustainability, as overpopulation contributes to traffic congestion, pollution, and inadequate public services.\n\nWhich choice best describes the tone of the passage?",
            options: [
                "A) Neutral and analytical, presenting both benefits and challenges of urbanization.", 
                "B) Strongly critical of urbanization and its negative effects.", 
                "C) Optimistic about urban growth despite potential drawbacks.", 
                "D) Persuasive, arguing that governments must take action immediately."
            ],
            answer: "A) Neutral and analytical, presenting both benefits and challenges of urbanization."
        },
    
        // Math Questions
        {  
            question: "If 3(2x - 4) = 5x + 8, what is the value of x?",
            options: ["A) 4", "B) 5", "C) 6", "D) 7"],
            answer: "B) 5"
        },
        {  
            question: "A cylinder has a radius of 4 and a height of 10. What is its volume? (Use π = 3.14)",
            options: ["A) 125.6", "B) 251.2", "C) 502.4", "D) 628.0"],
            answer: "C) 502.4"
        },
        {  
            question: "The function g(x) = 2x^2 - 3x + 7 is given. What is g(4)?",
            options: ["A) 25", "B) 27", "C) 29", "D) 31"],
            answer: "D) 31"
        }
    ],
    26:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity and conciseness of the sentence?\nThe new policy that was recently implemented by the company is going to take effect next month.",
            options: [
                "A) The new policy that was recently implemented by the company is going to take effect next month.", 
                "B) The company's new policy, recently implemented, will take effect next month.", 
                "C) The new policy of the company that was recently implemented is set to take effect next month.", 
                "D) The policy, which was newly implemented, is taking effect next month."
            ],
            answer: "B) The company's new policy, recently implemented, will take effect next month."
        },
        {  
            question: "Which option corrects the modifier error?\nWhile reading the novel, the themes of social justice and freedom fascinated Maria.",
            options: [
                "A) While reading the novel, the themes of social justice and freedom fascinated Maria.", 
                "B) While reading the novel, Maria was fascinated by the themes of social justice and freedom.", 
                "C) While reading the novel, Maria found the themes of social justice and freedom fascinating.", 
                "D) The themes of social justice and freedom fascinated Maria while she was reading the novel."
            ],
            answer: "B) While reading the novel, Maria was fascinated by the themes of social justice and freedom."
        },
        {  
            question: "Which sentence correctly uses parallel structure?\nThe internship program emphasizes developing technical skills, improving communication, and to foster teamwork.",
            options: [
                "A) The internship program emphasizes developing technical skills, improving communication, and to foster teamwork.", 
                "B) The internship program emphasizes developing technical skills, communication improvement, and fostering teamwork.", 
                "C) The internship program emphasizes developing technical skills, improving communication, and fostering teamwork.", 
                "D) No change."
            ],
            answer: "C) The internship program emphasizes developing technical skills, improving communication, and fostering teamwork."
        },
    
        // Reading Questions
        {  
            question: "Passage: In recent years, astronomers have discovered thousands of exoplanets, many of which exist in the 'habitable zone'—a region where conditions may support liquid water. However, the presence of water alone does not guarantee habitability. Factors such as atmospheric composition, radiation levels, and geological activity play crucial roles in determining whether a planet can support life.\n\nWhich of the following best summarizes the central idea of the passage?",
            options: [
                "A) The discovery of exoplanets in the habitable zone suggests they are capable of supporting life.", 
                "B) The presence of water is one of many factors that determine a planet's habitability.", 
                "C) Scientists have confirmed that many exoplanets contain liquid water.", 
                "D) The search for habitable planets is primarily focused on water detection."
            ],
            answer: "B) The presence of water is one of many factors that determine a planet's habitability."
        },
        {  
            question: "Passage: The 19th-century Industrial Revolution significantly transformed urban centers, increasing both economic productivity and social challenges. While technological advancements led to greater efficiency and mass production, they also contributed to overcrowded living conditions and labor exploitation. As cities grew rapidly, governments struggled to implement regulations that would balance economic growth with public welfare.\n\nWhat is the author’s perspective on the Industrial Revolution?",
            options: [
                "A) It brought undeniable benefits but also serious social challenges.", 
                "B) It was entirely beneficial, leading to economic expansion and innovation.", 
                "C) It led to economic prosperity but had little effect on social conditions.", 
                "D) It resulted in widespread suffering with no significant benefits."
            ],
            answer: "A) It brought undeniable benefits but also serious social challenges."
        },
        {  
            question: "Passage: Recent studies on sleep patterns indicate that individuals who maintain consistent sleep schedules tend to perform better on cognitive tasks. Disruptions in sleep cycles, such as those caused by irregular work hours or frequent travel, have been linked to decreased memory retention and slower reaction times. Researchers suggest that even minor inconsistencies in sleep habits can accumulate over time, negatively affecting long-term cognitive function.\n\nWhich of the following is an assumption underlying the passage’s argument?",
            options: [
                "A) Sleep consistency is more important than sleep duration for cognitive performance.", 
                "B) Memory retention is not influenced by other lifestyle factors.", 
                "C) Irregular sleep patterns directly cause cognitive decline.", 
                "D) Cognitive performance can improve with minor adjustments in sleep habits."
            ],
            answer: "A) Sleep consistency is more important than sleep duration for cognitive performance."
        },
    
        // Math Questions
        {  
            question: "If 4(3x - 5) = 2x + 22, what is the value of x?",
            options: ["A) 4", "B) 5", "C) 6", "D) 7"],
            answer: "C) 6"
        },
        {  
            question: "A triangle has sides of length 6, 8, and 10. What is the area of the triangle?",
            options: ["A) 24", "B) 30", "C) 40", "D) 48"],
            answer: "A) 24"
        },
        {  
            question: "The function h(x) = 4x^2 - 5x + 3 is given. What is h(2)?",
            options: ["A) 7", "B) 9", "C) 11", "D) 13"],
            answer: "B) 9"
        }
    ],
    27:[  
        // Writing Questions
        {  
            question: "Which choice best improves the clarity and conciseness of the sentence?\nThe scientist conducted an experiment in order to determine the effect that temperature has on reaction rates.",
            options: [
                "A) The scientist conducted an experiment in order to determine the effect that temperature has on reaction rates.", 
                "B) The scientist conducted an experiment to determine the effect of temperature on reaction rates.", 
                "C) The scientist did an experiment to see how temperature affects reaction rates.", 
                "D) The scientist experimented to determine the effect temperature has on reaction rates."
            ],
            answer: "B) The scientist conducted an experiment to determine the effect of temperature on reaction rates."
        },
        {  
            question: "Which option corrects the misplaced modifier?\nRunning through the park, the sudden rainstorm forced us to find shelter.",
            options: [
                "A) Running through the park, the sudden rainstorm forced us to find shelter.", 
                "B) Running through the park, we were forced to find shelter by the sudden rainstorm.", 
                "C) While running through the park, the sudden rainstorm made us find shelter.", 
                "D) The sudden rainstorm, running through the park, forced us to find shelter."
            ],
            answer: "B) Running through the park, we were forced to find shelter by the sudden rainstorm."
        },
        {  
            question: "Which choice best maintains parallel structure?\nThe new internship program focuses on improving teamwork, increasing productivity, and to enhance communication skills.",
            options: [
                "A) improving teamwork, increasing productivity, and to enhance communication skills.", 
                "B) improving teamwork, increasing productivity, and enhancing communication skills.", 
                "C) to improve teamwork, increasing productivity, and enhancing communication skills.", 
                "D) improving teamwork, productivity increase, and enhancing communication skills."
            ],
            answer: "B) improving teamwork, increasing productivity, and enhancing communication skills."
        },
    
        // Reading Questions
        {  
            question: "Passage: Marine biologists have long been fascinated by the intelligence of octopuses. These cephalopods demonstrate problem-solving abilities, tool use, and even exhibit signs of individual personalities. Recent studies suggest that their intelligence evolved separately from vertebrates, offering insights into the nature of cognition itself.\n\nWhich choice best captures the central idea of the passage?",
            options: [
                "A) Octopuses are among the most intelligent marine creatures, capable of using tools and solving problems.", 
                "B) Scientists study octopus intelligence to understand how different species evolve problem-solving skills.", 
                "C) The intelligence of octopuses is unique because it evolved separately from vertebrate cognition.", 
                "D) Octopuses demonstrate cognitive abilities that suggest they have complex thought processes."
            ],
            answer: "C) The intelligence of octopuses is unique because it evolved separately from vertebrate cognition."
        },
        {  
            question: "Passage: Advances in battery technology are transforming the renewable energy landscape. Energy storage systems are becoming more efficient, allowing for greater reliance on wind and solar power. While these improvements help stabilize the power grid, challenges such as cost and raw material availability remain significant hurdles to widespread adoption.\n\nWhat is the main idea of the passage?",
            options: [
                "A) Battery technology is improving, making renewable energy more reliable.", 
                "B) Advancements in battery efficiency are increasing the feasibility of renewable energy sources.", 
                "C) While energy storage is improving, economic and material challenges persist.", 
                "D) The development of better batteries is crucial to the expansion of wind and solar power."
            ],
            answer: "C) While energy storage is improving, economic and material challenges persist."
        },
        {  
            question: "Passage: Historical records indicate that ancient civilizations frequently adjusted their architectural designs in response to climate and environmental factors. The materials used, the orientation of buildings, and even the size of windows were all influenced by the need to regulate temperature and protect against harsh conditions. This adaptability allowed societies to thrive in a variety of environments.\n\nWhat is the passage primarily emphasizing?",
            options: [
                "A) Ancient civilizations made architectural choices based on climate considerations.", 
                "B) Environmental factors played a crucial role in shaping ancient architecture.", 
                "C) The need for temperature regulation influenced building design in ancient societies.", 
                "D) Architecture in ancient times was influenced by both climate and available materials."
            ],
            answer: "B) Environmental factors played a crucial role in shaping ancient architecture."
        },
    
        // Math Questions
        {  
            question: "Solve for x: 2(3x - 4) = 5x + 8",
            options: ["A) 4", "B) 6", "C) 8", "D) 10"],
            answer: "A) 4"
        },
        {  
            question: "A rectangle has a length of 12 and a width of 5. What is its diagonal?",
            options: ["A) 12", "B) 13", "C) 14", "D) 15"],
            answer: "B) 13"
        },
        {  
            question: "The function g(x) = x² - 6x + 8 is given. What is g(4)?",
            options: ["A) 2", "B) 4", "C) 6", "D) 8"],
            answer: "A) 2"
        }
    ],
    28:[  
        // Writing Questions
        {  
            question: "Which revision best eliminates redundancy while maintaining clarity?\nThe team collaborated together on the project to achieve a common goal.",
            options: [
                "A) The team collaborated together on the project to achieve a common goal.", 
                "B) The team collaborated on the project to achieve a common goal.", 
                "C) The team worked together on the project to achieve a goal.", 
                "D) No change"
            ],
            answer: "B) The team collaborated on the project to achieve a common goal."
        },
        {  
            question: "Which option corrects the verb tense inconsistency?\nWhile the chef prepared the ingredients, she realizes that she had forgotten the main spice.",
            options: [
                "A) While the chef prepared the ingredients, she realizes that she had forgotten the main spice.", 
                "B) While the chef was preparing the ingredients, she realized that she had forgotten the main spice.", 
                "C) While the chef prepared the ingredients, she had realized that she forgot the main spice.", 
                "D) While the chef prepared the ingredients, she was realizing that she had forgotten the main spice."
            ],
            answer: "B) While the chef was preparing the ingredients, she realized that she had forgotten the main spice."
        },
        {  
            question: "Which choice best maintains parallel structure?\nThe company’s strategy involves reducing waste, increasing efficiency, and to invest in sustainable materials.",
            options: [
                "A) reducing waste, increasing efficiency, and to invest in sustainable materials.", 
                "B) reducing waste, increasing efficiency, and investing in sustainable materials.", 
                "C) to reduce waste, increase efficiency, and investing in sustainable materials.", 
                "D) reducing waste, increasing efficiency, and ensuring sustainability."
            ],
            answer: "B) reducing waste, increasing efficiency, and investing in sustainable materials."
        },
    
        // Reading Questions
        {  
            question: "Passage: Studies on sleep patterns have shown that individuals who maintain consistent sleep schedules tend to have better cognitive performance and emotional regulation. This suggests that quality sleep plays a crucial role in overall mental well-being, regardless of total hours slept. However, disruptions to sleep cycles, even for short periods, can lead to decreased concentration and heightened stress levels.\n\nWhich choice best summarizes the main idea of the passage?",
            options: [
                "A) Consistent sleep schedules contribute to improved cognitive function and emotional stability.", 
                "B) Getting enough hours of sleep is the most important factor in maintaining mental health.", 
                "C) Sleep disruptions negatively affect mental performance, even if overall sleep hours are sufficient.", 
                "D) Research shows that individuals who sleep less are more prone to emotional instability."
            ],
            answer: "A) Consistent sleep schedules contribute to improved cognitive function and emotional stability."
        },
        {  
            question: "Passage: In the early 20th century, women’s access to higher education was still limited, yet some pioneers managed to break barriers. One such figure, Emily Greene Balch, pursued studies in economics and became an advocate for international peace. Despite resistance from traditional institutions, her work influenced policies on conflict resolution and social reform.\n\nWhich statement best describes the author’s view of Emily Greene Balch?",
            options: [
                "A) She overcame societal obstacles to make a lasting impact on global policies.", 
                "B) Her influence on international peace efforts was significant, but limited to academic circles.", 
                "C) She challenged traditional institutions but struggled to gain widespread recognition.", 
                "D) Her economic studies were more impactful than her contributions to international peace."
            ],
            answer: "A) She overcame societal obstacles to make a lasting impact on global policies."
        },
        {  
            question: "Passage: As cities expand, urban planners must consider how to balance development with environmental conservation. One approach involves integrating green spaces, which have been shown to improve air quality, reduce urban heat, and promote public health. However, maintaining these spaces requires funding and long-term commitment from local governments.\n\nWhich assumption underlies the author’s argument?",
            options: [
                "A) The benefits of green spaces outweigh the costs of maintaining them.", 
                "B) City residents generally support environmental conservation efforts.", 
                "C) Green spaces are the primary solution to urban pollution.", 
                "D) Local governments prioritize funding for public health initiatives."
            ],
            answer: "A) The benefits of green spaces outweigh the costs of maintaining them."
        },
    
        // Math Questions
        {  
            question: "If 4x - 7 = 2x + 9, what is the value of x?",
            options: ["A) 6", "B) 8", "C) 7", "D) 5"],
            answer: "A) 6"
        },
        {  
            question: "A right triangle has legs of length 8 and 15. What is the length of the hypotenuse?",
            options: ["A) 17", "B) 23", "C) 19", "D) 20"],
            answer: "A) 17"
        },
        {  
            question: "The function g(x) = 2x² - 5x + 4 is given. What is g(3)?",
            options: ["A) 10", "B) 11", "C) 13", "D) 14"],
            answer: "B) 11"
        }
    ],
    29:[  
        // Writing Questions
        {  
            question: "Which choice best improves clarity and eliminates unnecessary repetition?\nThe scientist made a discovery that was new and innovative.",
            options: [
                "A) The scientist made a discovery that was new and innovative.", 
                "B) The scientist made a new and innovative discovery.", 
                "C) The scientist made an innovative discovery.", 
                "D) No change"
            ],
            answer: "C) The scientist made an innovative discovery."
        },
        {  
            question: "Which option correctly maintains verb tense consistency?\nBy the time the guests arrived, the chef was preparing the main course and set the table.",
            options: [
                "A) By the time the guests arrived, the chef was preparing the main course and set the table.", 
                "B) By the time the guests arrived, the chef was preparing the main course and had set the table.", 
                "C) By the time the guests arrived, the chef prepared the main course and set the table.", 
                "D) No change"
            ],
            answer: "B) By the time the guests arrived, the chef was preparing the main course and had set the table."
        },
        {  
            question: "Which revision corrects the misplaced modifier?\nRunning down the street, the ice cream fell from the child’s cone.",
            options: [
                "A) Running down the street, the ice cream fell from the child’s cone.", 
                "B) Running down the street, the child’s ice cream fell from the cone.", 
                "C) The ice cream fell from the child’s cone while running down the street.", 
                "D) As the child ran down the street, the ice cream fell from the cone."
            ],
            answer: "D) As the child ran down the street, the ice cream fell from the cone."
        },
    
        // Reading Questions
        {  
            question: "Passage: Scientists studying deep-sea ecosystems have discovered that hydrothermal vents support complex food webs, even in total darkness. Instead of relying on sunlight, these ecosystems thrive through chemosynthesis—a process where bacteria convert minerals into energy. This has led researchers to reconsider the requirements for life on other planets.\n\nWhat is the central idea of the passage?",
            options: [
                "A) Hydrothermal vents provide an alternative to photosynthesis-based ecosystems.", 
                "B) The discovery of deep-sea ecosystems suggests that life can exist without sunlight.", 
                "C) Chemosynthesis allows bacteria to survive in deep-sea environments.", 
                "D) Scientists are exploring hydrothermal vents as potential habitats for marine species."
            ],
            answer: "B) The discovery of deep-sea ecosystems suggests that life can exist without sunlight."
        },
        {  
            question: "Passage: In the 19th century, novelists often wrote about social injustices in industrialized cities. Charles Dickens, for example, exposed harsh working conditions and economic inequalities through his characters. His work resonated with readers who were familiar with these struggles, ultimately influencing public opinion on labor reform.\n\nWhich choice best reflects the passage’s perspective on Charles Dickens?",
            options: [
                "A) Dickens’ novels provided a compelling critique of industrial-era social issues.", 
                "B) Dickens’ stories were entertaining but had little impact on society.", 
                "C) Dickens’ writing primarily focused on fictional characters rather than real social issues.", 
                "D) Dickens’ success was due to the vivid settings in his novels rather than their themes."
            ],
            answer: "A) Dickens’ novels provided a compelling critique of industrial-era social issues."
        },
        {  
            question: "Passage: The Great Wall of China, stretching thousands of miles, was initially built to protect against invasions. Over centuries, it evolved beyond its defensive role, symbolizing national unity and perseverance. Today, it stands as a cultural landmark attracting millions of visitors annually.\n\nWhich assumption underlies the passage’s discussion of the Great Wall?",
            options: [
                "A) The Great Wall’s original purpose has been overshadowed by its modern significance.", 
                "B) The Great Wall was never effective as a military defense.", 
                "C) The Great Wall has changed little since it was first built.", 
                "D) Tourists primarily visit the Great Wall for historical education rather than its scenic views."
            ],
            answer: "A) The Great Wall’s original purpose has been overshadowed by its modern significance."
        },
    
        // Math Questions
        {  
            question: "If 6x - 9 = 3x + 12, what is the value of x?",
            options: ["A) 5", "B) 6", "C) 7", "D) 8"],
            answer: "B) 7"
        },
        {  
            question: "A cylinder has a radius of 4 and a height of 10. What is its volume? (Use π = 3.14)",
            options: ["A) 125.6", "B) 502.4", "C) 251.2", "D) 628"],
            answer: "C) 502.4"
        },
        {  
            question: "If f(x) = x² - 3x + 2, what is f(4)?",
            options: ["A) 6", "B) 8", "C) 10", "D) 12"],
            answer: "A) 6"
        }
    ],
    30:[  
        // Writing Questions
        {  
            question: "Which choice best eliminates wordiness while maintaining meaning?\nThe experiment that was conducted by the researchers resulted in findings that were unexpected.",
            options: [
                "A) The experiment that was conducted by the researchers resulted in findings that were unexpected.", 
                "B) The experiment conducted by the researchers resulted in unexpected findings.", 
                "C) The researchers’ conducted experiment resulted in unexpected findings.", 
                "D) No change"
            ],
            answer: "B) The experiment conducted by the researchers resulted in unexpected findings."
        },
        {  
            question: "Which sentence correctly uses a semicolon?\nThe storm was approaching quickly; however, the pilots remained calm and followed protocol.",
            options: [
                "A) The storm was approaching quickly; however, the pilots remained calm and followed protocol.", 
                "B) The storm was approaching quickly; and the pilots remained calm and followed protocol.", 
                "C) The storm was approaching quickly, however; the pilots remained calm and followed protocol.", 
                "D) No change"
            ],
            answer: "A) The storm was approaching quickly; however, the pilots remained calm and followed protocol."
        },
        {  
            question: "Which sentence correctly maintains parallel structure?\nShe enjoys reading novels, writing poetry, and to paint landscapes.",
            options: [
                "A) She enjoys reading novels, writing poetry, and to paint landscapes.", 
                "B) She enjoys reading novels, writing poetry, and painting landscapes.", 
                "C) She enjoys to read novels, writing poetry, and painting landscapes.", 
                "D) No change"
            ],
            answer: "B) She enjoys reading novels, writing poetry, and painting landscapes."
        },
    
        // Reading Questions
        {  
            question: "Passage: Advances in artificial intelligence have sparked debates about the role of automation in the workforce. While AI-driven technologies improve efficiency, some argue they may lead to job displacement. However, others suggest that AI will create new opportunities by shifting human roles toward creative and analytical tasks.\n\nWhich choice best summarizes the central idea of the passage?",
            options: [
                "A) AI improves efficiency but may reduce human employment opportunities.", 
                "B) AI may displace workers, but it also has the potential to create new jobs.", 
                "C) AI-driven technology is transforming industries by automating tasks.", 
                "D) The rise of AI has sparked debates about its impact on the workforce."
            ],
            answer: "B) AI may displace workers, but it also has the potential to create new jobs."
        },
        {  
            question: "Passage: The 18th-century composer Wolfgang Amadeus Mozart was a musical prodigy, composing symphonies and operas from an early age. His ability to blend technical mastery with emotional depth set him apart from his contemporaries. While many of his works achieved great success, some compositions were underappreciated during his lifetime.\n\nWhich best describes the author’s perspective on Mozart?",
            options: [
                "A) Mozart’s music was widely celebrated, though some of his work was not fully appreciated at the time.", 
                "B) Mozart’s technical skills were superior to his emotional depth.", 
                "C) Mozart’s music, while technically impressive, lacked true emotional depth.", 
                "D) Mozart’s compositions were initially overlooked but later gained recognition."
            ],
            answer: "A) Mozart’s music was widely celebrated, though some of his work was not fully appreciated at the time."
        },
        {  
            question: "Passage: Urban planners often debate how best to integrate green spaces into cities. Studies suggest that access to parks can improve physical health, enhance mental well-being, and strengthen social ties. Despite these benefits, space constraints and funding issues often make it difficult to prioritize green infrastructure.\n\nWhich assumption is implicit in the passage?",
            options: [
                "A) City planners do not value green spaces as much as commercial development.", 
                "B) Green spaces positively affect both mental and physical well-being.", 
                "C) Without government funding, cities will not be able to build more parks.", 
                "D) Public parks are beneficial, but they are not necessary for a city’s success."
            ],
            answer: "B) Green spaces positively affect both mental and physical well-being."
        },
    
        // Math Questions
        {  
            question: "If 4(2x - 3) = 5x + 6, what is the value of x?",
            options: ["A) 2", "B) 3", "C) 4", "D) 5"],
            answer: "B) 3"
        },
        {  
            question: "A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?",
            options: ["A) 13", "B) 14", "C) 15", "D) 16"],
            answer: "C) 15"
        },
        {  
            question: "The function g(x) = 2x² - 5x + 3 is given. What is g(4)?",
            options: ["A) 13", "B) 15", "C) 17", "D) 19"],
            answer: "C) 17"
        }
    ],
   
31:[  
    // Writing Questions
    {  
        question: "Which choice best improves the clarity of the sentence?\nThe book, which was written by the author in 1852, is still considered a masterpiece today.",
        options: [
            "A) The book, which was written by the author in 1852, is still considered a masterpiece today.", 
            "B) The book, written by the author in 1852, is still considered a masterpiece today.", 
            "C) The book that was written in 1852 by the author is still considered a masterpiece today.", 
            "D) No change"
        ],
        answer: "B) The book, written by the author in 1852, is still considered a masterpiece today."
    },
    {  
        question: "Which option corrects the misplaced modifier error?\nRunning down the hallway, the backpack slipped off John’s shoulder.",
        options: [
            "A) Running down the hallway, the backpack slipped off John’s shoulder.", 
            "B) The backpack slipped off John’s shoulder while running down the hallway.", 
            "C) As John ran down the hallway, his backpack slipped off his shoulder.", 
            "D) No change"
        ],
        answer: "C) As John ran down the hallway, his backpack slipped off his shoulder."
    },
    {  
        question: "Which sentence correctly uses a colon?\nThe museum features several famous paintings: The Starry Night, The Mona Lisa, and The Scream.",
        options: [
            "A) The museum features several famous paintings: The Starry Night, The Mona Lisa, and The Scream.", 
            "B) The museum features several famous paintings; The Starry Night, The Mona Lisa, and The Scream.", 
            "C) The museum features several famous paintings, The Starry Night, The Mona Lisa, and The Scream.", 
            "D) No change"
        ],
        answer: "A) The museum features several famous paintings: The Starry Night, The Mona Lisa, and The Scream."
    },

    // Reading Questions
    {  
        question: "Passage: The introduction of the printing press revolutionized the spread of knowledge. Before its invention, books were copied by hand, making them rare and expensive. With the printing press, literacy rates increased, and information became more widely available. However, critics feared that easily accessible books would lead to misinformation and undermine traditional knowledge systems.\n\nWhich statement best summarizes the passage?",
        options: [
            "A) The printing press allowed more people to access knowledge, despite concerns about misinformation.", 
            "B) The printing press made books more common, increasing literacy rates worldwide.", 
            "C) The printing press was initially met with criticism due to concerns about information quality.", 
            "D) The printing press marked the beginning of modern information technology."
        ],
        answer: "A) The printing press allowed more people to access knowledge, despite concerns about misinformation."
    },
    {  
        question: "Passage: Eleanor Roosevelt redefined the role of First Lady, actively engaging in political and humanitarian efforts. Unlike her predecessors, she held press conferences, wrote a newspaper column, and worked on civil rights issues. Her advocacy extended beyond her time in the White House, influencing policies and social movements for decades.\n\nWhich statement best captures the author’s perspective on Eleanor Roosevelt?",
        options: [
            "A) Roosevelt was an active and politically engaged First Lady whose influence lasted beyond her time in office.", 
            "B) Roosevelt’s role as First Lady was unique because she engaged in humanitarian efforts.", 
            "C) Roosevelt used her position to shape American political policies in ways her predecessors had not.", 
            "D) Roosevelt’s actions redefined the expectations of a First Lady."
        ],
        answer: "A) Roosevelt was an active and politically engaged First Lady whose influence lasted beyond her time in office."
    },
    {  
        question: "Passage: Economists often debate the effects of minimum wage increases on employment rates. Some argue that higher wages lead to job loss as businesses struggle with labor costs, while others claim that higher wages stimulate the economy by increasing consumer spending. Recent studies suggest that the impact varies depending on the industry and economic conditions.\n\nWhich assumption underlies the arguments presented in the passage?",
        options: [
            "A) Raising the minimum wage always results in higher unemployment rates.", 
            "B) Consumer spending is influenced by changes in wage levels.", 
            "C) Businesses will always resist wage increases due to profit concerns.", 
            "D) The economy is primarily shaped by labor costs."
        ],
        answer: "B) Consumer spending is influenced by changes in wage levels."
    },

    // Math Questions
    {  
        question: "If 3(2x - 5) = 4x + 7, what is the value of x?",
        options: ["A) 3", "B) 4", "C) 5", "D) 6"],
        answer: "B) 4"
    },
    {  
        question: "A rectangle has a length of 10 and a width of 8. If its length is increased by 20% and its width is decreased by 25%, what is the new area?",
        options: ["A) 60", "B) 64", "C) 68", "D) 72"],
        answer: "B) 64"
    },
    {  
        question: "The function h(x) = x² - 4x + 7 is given. What is h(5)?",
        options: ["A) 12", "B) 13", "C) 14", "D) 15"],
        answer: "C) 14"
    }
],
32:[  
    // Writing Questions
    {  
        question: "Which choice best improves the clarity and conciseness of the sentence?\nThe scientist, who was known for her extensive research on marine biology, dedicated her career to studying ocean ecosystems.",
        options: [
            "A) The scientist, who was known for her extensive research on marine biology, dedicated her career to studying ocean ecosystems.", 
            "B) The scientist, known for her extensive marine biology research, dedicated her career to studying ocean ecosystems.", 
            "C) The scientist was known for her extensive research on marine biology and dedicated her career to studying ocean ecosystems.", 
            "D) No change"
        ],
        answer: "B) The scientist, known for her extensive marine biology research, dedicated her career to studying ocean ecosystems."
    },
    {  
        question: "Which option corrects the subject-verb agreement error?\nNeither of the candidates are qualified for the position.",
        options: [
            "A) Neither of the candidates are qualified for the position.", 
            "B) Neither of the candidates is qualified for the position.", 
            "C) None of the candidates is qualified for the position.", 
            "D) No change"
        ],
        answer: "B) Neither of the candidates is qualified for the position."
    },
    {  
        question: "Which sentence correctly uses a semicolon?\nThe storm intensified; consequently the roads became unsafe for travel.",
        options: [
            "A) The storm intensified; consequently the roads became unsafe for travel.", 
            "B) The storm intensified, consequently the roads became unsafe for travel.", 
            "C) The storm intensified; consequently, the roads became unsafe for travel.", 
            "D) No change"
        ],
        answer: "C) The storm intensified; consequently, the roads became unsafe for travel."
    },

    // Reading Questions
    {  
        question: "Passage: Throughout history, scientific discoveries have often been met with skepticism. When Galileo proposed that the Earth orbits the sun, his ideas were ridiculed. Similarly, when germ theory was introduced, many dismissed the notion that microscopic organisms could cause disease. Today, despite overwhelming evidence, some scientific advancements still face resistance.\n\nWhich statement best captures the central idea of the passage?",
        options: [
            "A) Scientific progress is often met with skepticism before being accepted.", 
            "B) Historical scientific discoveries were more controversial than modern ones.", 
            "C) Resistance to new scientific ideas is a thing of the past.", 
            "D) Theories like heliocentrism and germ theory changed society’s understanding of science."
        ],
        answer: "A) Scientific progress is often met with skepticism before being accepted."
    },
    {  
        question: "Passage: The Grand Canyon, one of the most remarkable natural formations on Earth, has fascinated geologists for centuries. Its vast layers of rock provide a record of millions of years of Earth’s history. While erosion from the Colorado River played a major role in shaping the canyon, tectonic activity also contributed significantly.\n\nWhat is the primary purpose of the passage?",
        options: [
            "A) To explain the geological significance of the Grand Canyon.", 
            "B) To describe how erosion formed the Grand Canyon.", 
            "C) To argue that tectonic activity is more important than erosion in shaping the Grand Canyon.", 
            "D) To highlight the beauty of the Grand Canyon."
        ],
        answer: "A) To explain the geological significance of the Grand Canyon."
    },
    {  
        question: "Passage: In the early 1900s, electric cars were nearly as common as gasoline-powered vehicles. However, gasoline engines eventually dominated the market due to longer driving ranges and the convenience of widespread fuel availability. Today, with advancements in battery technology, electric cars are making a resurgence as a viable alternative to traditional gasoline-powered vehicles.\n\nWhat assumption underlies the discussion in the passage?",
        options: [
            "A) Electric cars were never a practical transportation option in the past.", 
            "B) Battery technology has significantly improved over time.", 
            "C) Gasoline-powered vehicles are no longer the dominant form of transportation.", 
            "D) The decline of electric cars was inevitable."
        ],
        answer: "B) Battery technology has significantly improved over time."
    },

    // Math Questions
    {  
        question: "If 4x + 7 = 3x + 12, what is the value of x?",
        options: ["A) 4", "B) 5", "C) 6", "D) 7"],
        answer: "B) 5"
    },
    {  
        question: "A cylinder has a radius of 4 and a height of 10. What is its volume? (Use π = 3.14)",
        options: ["A) 125.6", "B) 150.8", "C) 502.4", "D) 628"],
        answer: "C) 502.4"
    },
    {  
        question: "The function g(x) = 2x² - 5x + 3 is given. What is g(4)?",
        options: ["A) 15", "B) 17", "C) 19", "D) 21"],
        answer: "B) 17"
    }
],
33:[  
    // Writing Questions
    {  
        question: "Which choice best improves the clarity and conciseness of the sentence?\nThe novel, which was published in 1925 and written by F. Scott Fitzgerald, remains one of the most celebrated books in American literature.",
        options: [
            "A) The novel, which was published in 1925 and written by F. Scott Fitzgerald, remains one of the most celebrated books in American literature.", 
            "B) The novel, published in 1925 by F. Scott Fitzgerald, remains one of the most celebrated in American literature.", 
            "C) The novel, written by F. Scott Fitzgerald in 1925, remains one of the most celebrated books in American literature.", 
            "D) No change"
        ],
        answer: "B) The novel, published in 1925 by F. Scott Fitzgerald, remains one of the most celebrated in American literature."
    },
    {  
        question: "Which revision corrects the modifier placement error?\nRunning down the street, Sarah’s hat flew off in the wind.",
        options: [
            "A) Running down the street, Sarah’s hat flew off in the wind.", 
            "B) Sarah’s hat flew off in the wind as she ran down the street.", 
            "C) Running down the street, the wind blew Sarah’s hat off.", 
            "D) No change"
        ],
        answer: "B) Sarah’s hat flew off in the wind as she ran down the street."
    },
    {  
        question: "Which sentence correctly uses a colon?\nThe following items are required for the trip a backpack, a water bottle, and a flashlight.",
        options: [
            "A) The following items are required for the trip a backpack, a water bottle, and a flashlight.", 
            "B) The following items are required for the trip: a backpack, a water bottle, and a flashlight.", 
            "C) The following items: a backpack, a water bottle, and a flashlight, are required for the trip.", 
            "D) No change"
        ],
        answer: "B) The following items are required for the trip: a backpack, a water bottle, and a flashlight."
    },

    // Reading Questions
    {  
        question: "Passage: Throughout history, technological advancements have reshaped the way people communicate. The printing press revolutionized access to information, radio and television connected distant communities, and the internet created a global network. However, with each advancement, concerns about misinformation and privacy have also emerged.\n\nWhich statement best captures the central idea of the passage?",
        options: [
            "A) Technological advancements have improved communication despite challenges.", 
            "B) The internet is the most significant advancement in communication history.", 
            "C) Every new communication technology has led to widespread misinformation.", 
            "D) Communication technology has only had a positive impact on society."
        ],
        answer: "A) Technological advancements have improved communication despite challenges."
    },
    {  
        question: "Passage: Eleanor Roosevelt redefined the role of First Lady by actively engaging in politics, advocating for civil rights, and influencing policy decisions. She traveled extensively, held press conferences, and wrote a widely read newspaper column, setting a precedent for future First Ladies.\n\nWhat is the primary purpose of the passage?",
        options: [
            "A) To emphasize Eleanor Roosevelt’s influence on the role of First Lady.", 
            "B) To highlight Eleanor Roosevelt’s involvement in international affairs.", 
            "C) To compare Eleanor Roosevelt to other First Ladies.", 
            "D) To explain how Eleanor Roosevelt changed American foreign policy."
        ],
        answer: "A) To emphasize Eleanor Roosevelt’s influence on the role of First Lady."
    },
    {  
        question: "Passage: Renewable energy sources, such as wind and solar power, are increasingly being adopted as alternatives to fossil fuels. While these sources reduce carbon emissions, they also present challenges related to energy storage and infrastructure development. Finding solutions to these challenges is essential for a sustainable future.\n\nWhat assumption underlies the discussion in the passage?",
        options: [
            "A) Renewable energy will eventually replace fossil fuels entirely.", 
            "B) The transition to renewable energy requires addressing technical obstacles.", 
            "C) Wind and solar power are the only viable renewable energy sources.", 
            "D) Carbon emissions have no impact on climate change."
        ],
        answer: "B) The transition to renewable energy requires addressing technical obstacles."
    },

    // Math Questions
    {  
        question: "If 6x - 8 = 4x + 10, what is the value of x?",
        options: ["A) 7", "B) 8", "C) 9", "D) 10"],
        answer: "A) 7"
    },
    {  
        question: "A cone has a radius of 5 and a height of 12. What is its volume? (Use π = 3.14)",
        options: ["A) 251", "B) 314", "C) 365", "D) 502"],
        answer: "B) 314"
    },
    {  
        question: "The function h(x) = 4x² - 6x + 7 is given. What is h(5)?",
        options: ["A) 73", "B) 81", "C) 89", "D) 97"],
        answer: "B) 81"
    }
],
34:[  
    // Writing Questions
    {  
        question: "Which choice best improves the clarity and conciseness of the sentence?\nMany scientists believe that, when it comes to the study of climate change, long-term data collection is absolutely essential for drawing accurate conclusions.",
        options: [
            "A) Many scientists believe that, when it comes to the study of climate change, long-term data collection is absolutely essential for drawing accurate conclusions.", 
            "B) Many scientists believe that long-term data collection is essential for accurately studying climate change.", 
            "C) Many scientists believe long-term data collection is critical to understanding climate change.", 
            "D) No change"
        ],
        answer: "C) Many scientists believe long-term data collection is critical to understanding climate change."
    },
    {  
        question: "Which sentence corrects the subject-verb agreement error?\nThe team of researchers, along with their advisor, were preparing the final report.",
        options: [
            "A) The team of researchers, along with their advisor, were preparing the final report.", 
            "B) The team of researchers, along with their advisor, was preparing the final report.", 
            "C) The researchers, along with their advisor, was preparing the final report.", 
            "D) No change"
        ],
        answer: "B) The team of researchers, along with their advisor, was preparing the final report."
    },
    {  
        question: "Which revision correctly uses a semicolon?\nThe experiment was successful however the results were unexpected.",
        options: [
            "A) The experiment was successful; however, the results were unexpected.", 
            "B) The experiment was successful, however the results were unexpected.", 
            "C) The experiment was successful however, the results were unexpected.", 
            "D) No change"
        ],
        answer: "A) The experiment was successful; however, the results were unexpected."
    },

    // Reading Questions
    {  
        question: "Passage: Advances in artificial intelligence (AI) are rapidly changing industries, from healthcare to finance. AI-driven algorithms can diagnose diseases, predict market trends, and even automate complex decision-making processes. While some fear job displacement, others argue that AI creates new opportunities and improves efficiency.\n\nWhich statement best summarizes the passage?",
        options: [
            "A) AI is revolutionizing multiple industries by improving efficiency and creating opportunities.", 
            "B) AI is primarily responsible for job displacement in industries such as healthcare and finance.", 
            "C) AI is developing rapidly, but its impact on industries remains uncertain.", 
            "D) AI has become the most important technological advancement of the century."
        ],
        answer: "A) AI is revolutionizing multiple industries by improving efficiency and creating opportunities."
    },
    {  
        question: "Passage: During the 19th century, railroads transformed transportation, making it faster and more accessible. This infrastructure expansion spurred economic growth by facilitating trade and the movement of people. However, it also led to environmental consequences, such as deforestation and pollution.\n\nWhat is the primary focus of the passage?",
        options: [
            "A) The benefits and drawbacks of railroad expansion in the 19th century.", 
            "B) The role of railroads in fostering international trade.", 
            "C) The economic impact of railroads on small towns and cities.", 
            "D) The environmental consequences of rapid industrialization."
        ],
        answer: "A) The benefits and drawbacks of railroad expansion in the 19th century."
    },
    {  
        question: "Passage: Marine biologists have observed significant changes in coral reef ecosystems due to rising ocean temperatures. Warmer waters cause coral bleaching, which weakens reef structures and threatens marine biodiversity. Although conservation efforts are underway, scientists warn that immediate action is necessary to mitigate further damage.\n\nWhich assumption is implicit in the passage?",
        options: [
            "A) Coral bleaching is a reversible process that can be easily stopped.", 
            "B) Rising ocean temperatures pose a significant threat to marine biodiversity.", 
            "C) Conservation efforts are not effective in preventing coral reef damage.", 
            "D) Scientists are divided on whether climate change is affecting coral reefs."
        ],
        answer: "B) Rising ocean temperatures pose a significant threat to marine biodiversity."
    },

    // Math Questions
    {  
        question: "If 7x - 4 = 3x + 12, what is the value of x?",
        options: ["A) 3.5", "B) 4", "C) 4.5", "D) 5"],
        answer: "D) 5"
    },
    {  
        question: "A cylinder has a radius of 4 and a height of 10. What is its volume? (Use π = 3.14)",
        options: ["A) 502.4", "B) 534.4", "C) 565.6", "D) 628"],
        answer: "A) 502.4"
    },
    {  
        question: "The function g(x) = 2x² - 5x + 6 is given. What is g(4)?",
        options: ["A) 14", "B) 18", "C) 22", "D) 26"],
        answer: "C) 22"
    }
],
35:[  
    // Writing Questions
    {  
        question: "Which choice best improves the clarity and conciseness of the sentence?\nIn order to successfully complete the project, the team needed to cooperate together closely and communicate effectively.",
        options: [
            "A) In order to successfully complete the project, the team needed to cooperate together closely and communicate effectively.", 
            "B) To successfully complete the project, the team needed to cooperate closely and communicate effectively.", 
            "C) To complete the project, the team needed to work together and communicate well.", 
            "D) No change"
        ],
        answer: "B) To successfully complete the project, the team needed to cooperate closely and communicate effectively."
    },
    {  
        question: "Which revision corrects the misplaced modifier?\nWalking through the park, the beautiful flowers caught Maria’s attention.",
        options: [
            "A) Walking through the park, the beautiful flowers caught Maria’s attention.", 
            "B) Walking through the park, Maria noticed the beautiful flowers.", 
            "C) The beautiful flowers caught Maria’s attention as she was walking through the park.", 
            "D) No change"
        ],
        answer: "B) Walking through the park, Maria noticed the beautiful flowers."
    },
    {  
        question: "Which sentence maintains parallel structure?\nThe company values innovation, collaboration, and employees who are dedicated.",
        options: [
            "A) The company values innovation, collaboration, and employees who are dedicated.", 
            "B) The company values innovation, collaboration, and dedication.", 
            "C) The company values innovation, working collaboratively, and employees who are dedicated.", 
            "D) No change"
        ],
        answer: "B) The company values innovation, collaboration, and dedication."
    },

    // Reading Questions
    {  
        question: "Passage: Scientific studies have shown that sleep plays a crucial role in memory retention. During deep sleep, the brain consolidates newly learned information, allowing individuals to recall details more effectively. While some argue that short naps can be just as beneficial, long-term research suggests that sustained sleep is more effective for memory consolidation.\n\nWhat is the primary claim of the passage?",
        options: [
            "A) Sleep plays a vital role in memory retention and consolidation.", 
            "B) Napping is just as beneficial as a full night’s sleep for memory retention.", 
            "C) Scientific studies have proven that sleep is the only way to improve memory.", 
            "D) Sleep is essential for memory, but naps can be equally effective."
        ],
        answer: "A) Sleep plays a vital role in memory retention and consolidation."
    },
    {  
        question: "Passage: Renewable energy sources, such as wind and solar power, are becoming more widespread as the world seeks alternatives to fossil fuels. While these energy sources provide environmental benefits, they also face challenges, such as energy storage limitations and inconsistent power generation. Despite these obstacles, technological advancements continue to improve their viability.\n\nWhich statement best captures the passage's central idea?",
        options: [
            "A) Renewable energy sources are gaining popularity despite their limitations.", 
            "B) Wind and solar power will replace fossil fuels in the near future.", 
            "C) The primary challenge of renewable energy is high cost and inefficiency.", 
            "D) Technological advancements have eliminated all problems with renewable energy."
        ],
        answer: "A) Renewable energy sources are gaining popularity despite their limitations."
    },
    {  
        question: "Passage: Studies suggest that a plant-based diet can lead to numerous health benefits, including lower risks of heart disease and improved digestion. However, some nutritionists caution that such diets may lack essential nutrients, requiring careful meal planning. Despite these concerns, many experts agree that a well-balanced plant-based diet can provide adequate nutrition.\n\nWhich answer best describes the passage’s perspective?",
        options: [
            "A) Plant-based diets offer health benefits but require careful nutritional planning.", 
            "B) A plant-based diet is the healthiest choice for everyone.", 
            "C) Experts are divided on whether plant-based diets are nutritionally adequate.", 
            "D) Nutritional deficiencies make plant-based diets unsustainable in the long run."
        ],
        answer: "A) Plant-based diets offer health benefits but require careful nutritional planning."
    },

    // Math Questions
    {  
        question: "If 4x - 7 = 2x + 9, what is the value of x?",
        options: ["A) 5", "B) 6", "C) 7", "D) 8"],
        answer: "B) 6"
    },
    {  
        question: "A right triangle has legs of 8 and 15. What is the length of the hypotenuse?",
        options: ["A) 16", "B) 17", "C) 18", "D) 19"],
        answer: "B) 17"
    },
    {  
        question: "The function h(x) = 4x² - 3x + 7 is given. What is h(5)?",
        options: ["A) 82", "B) 87", "C) 92", "D) 97"],
        answer: "B) 87"
    }
],
36:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nThe committee made a decision that was final and could not be changed.",
        options: [
            "A) The committee made a decision that was final and could not be changed.", 
            "B) The committee made an unchangeable final decision.", 
            "C) The committee’s decision was final and unchangeable.", 
            "D) No change"
        ],
        answer: "C) The committee’s decision was final and unchangeable."
    },
    {  
        question: "Which option corrects the misplaced modifier?\nRunning across the field, the ball was kicked by the player.",
        options: [
            "A) Running across the field, the ball was kicked by the player.", 
            "B) The ball was kicked by the player running across the field.", 
            "C) Running across the field, the player kicked the ball.", 
            "D) No change"
        ],
        answer: "C) Running across the field, the player kicked the ball."
    },
    {  
        question: "Which choice ensures parallel structure?\nThe new policy will increase efficiency, reduce costs, and it helps communication.",
        options: [
            "A) The new policy will increase efficiency, reduce costs, and it helps communication.", 
            "B) The new policy will increase efficiency, reduce costs, and improve communication.", 
            "C) The new policy increases efficiency, reducing costs, and helps communication.", 
            "D) No change"
        ],
        answer: "B) The new policy will increase efficiency, reduce costs, and improve communication."
    },

    // Reading Questions
    {  
        question: "Passage: Scientists have long studied the effects of caffeine on cognitive performance. Some research suggests that moderate caffeine intake enhances alertness and reaction time. However, excessive consumption can lead to restlessness and decreased focus. The overall impact of caffeine depends on individual tolerance and dosage.\n\nWhich answer best captures the central idea of the passage?",
        options: [
            "A) Caffeine improves cognitive function in all individuals.", 
            "B) Caffeine has both benefits and drawbacks depending on dosage and individual tolerance.", 
            "C) Too much caffeine leads to negative side effects such as restlessness.", 
            "D) Scientific studies have proven that caffeine always improves focus."
        ],
        answer: "B) Caffeine has both benefits and drawbacks depending on dosage and individual tolerance."
    },
    {  
        question: "Passage: Historical accounts of the American Revolution often emphasize the contributions of well-known figures like George Washington and Thomas Jefferson. However, lesser-known individuals, including women and people of diverse backgrounds, played essential roles in supporting the war effort through espionage, supply networks, and political advocacy.\n\nWhich statement best reflects the passage's focus?",
        options: [
            "A) The American Revolution was won due to the leadership of George Washington and Thomas Jefferson.", 
            "B) Many lesser-known individuals played critical roles in the American Revolution.", 
            "C) Political advocacy was the most significant contribution of lesser-known individuals.", 
            "D) Espionage was the primary reason the war was won."
        ],
        answer: "B) Many lesser-known individuals played critical roles in the American Revolution."
    },
    {  
        question: "Passage: The rise of electric vehicles (EVs) has sparked debates about their environmental impact. While EVs produce no tailpipe emissions, battery production requires significant raw materials and energy. Some argue that the overall benefit of EVs depends on how electricity is generated in different regions.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Electric vehicles are entirely environmentally friendly.", 
            "B) The impact of electric vehicles depends on electricity generation and battery production.", 
            "C) Electric vehicles have no negative environmental consequences.", 
            "D) EVs are worse for the environment than gas-powered cars."
        ],
        answer: "B) The impact of electric vehicles depends on electricity generation and battery production."
    },

    // Math Questions
    {  
        question: "If 7x - 5 = 3x + 15, what is the value of x?",
        options: ["A) 4", "B) 5", "C) 6", "D) 7"],
        answer: "B) 5"
    },
    {  
        question: "A circle has a diameter of 14. What is its area? (Use π ≈ 3.14)",
        options: ["A) 49π", "B) 98π", "C) 153.86", "D) 615.44"],
        answer: "C) 153.86"
    },
    {  
        question: "The function g(x) = 5x² - 2x + 4 is given. What is g(4)?",
        options: ["A) 78", "B) 80", "C) 82", "D) 84"],
        answer: "C) 82"
    }
],
37:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nDue to the fact that the project was behind schedule, adjustments had to be made.",
        options: [
            "A) Due to the fact that the project was behind schedule, adjustments had to be made.", 
            "B) Because the project was behind schedule, adjustments were necessary.", 
            "C) The project was behind schedule, so adjustments were required.", 
            "D) No change"
        ],
        answer: "C) The project was behind schedule, so adjustments were required."
    },
    {  
        question: "Which option corrects the ambiguous pronoun reference?\nAfter discussing the results with her supervisor, Sarah revised her report, which was confusing.",
        options: [
            "A) After discussing the results with her supervisor, Sarah revised her report, which was confusing.", 
            "B) After discussing the results with her supervisor, Sarah revised her confusing report.", 
            "C) After discussing the confusing results with her supervisor, Sarah revised her report.", 
            "D) No change"
        ],
        answer: "B) After discussing the results with her supervisor, Sarah revised her confusing report."
    },
    {  
        question: "Which choice ensures proper parallel structure?\nThe manager's responsibilities include training employees, scheduling shifts, and to oversee operations.",
        options: [
            "A) training employees, scheduling shifts, and to oversee operations.", 
            "B) training employees, scheduling shifts, and overseeing operations.", 
            "C) to train employees, scheduling shifts, and overseeing operations.", 
            "D) No change"
        ],
        answer: "B) training employees, scheduling shifts, and overseeing operations."
    },

    // Reading Questions
    {  
        question: "Passage: Recent studies suggest that sleep deprivation can negatively affect cognitive function. Participants in controlled experiments who received fewer than six hours of sleep per night performed worse on memory and problem-solving tasks than those who received at least seven hours. Researchers argue that sleep plays a crucial role in consolidating information and maintaining overall mental performance.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Sleep deprivation leads to long-term cognitive decline.", 
            "B) Sleep deprivation negatively impacts cognitive function in controlled studies.", 
            "C) Sleep helps consolidate information and maintain mental performance.", 
            "D) Lack of sleep causes immediate and permanent memory loss."
        ],
        answer: "B) Sleep deprivation negatively impacts cognitive function in controlled studies."
    },
    {  
        question: "Passage: The Great Fire of London in 1666 destroyed much of the city but ultimately led to improved urban planning. Before the fire, London’s streets were narrow and buildings were densely packed, contributing to the rapid spread of flames. Afterward, the city implemented new fire codes and wider streets, which reduced the risk of future fires.\n\nWhich statement best captures the central idea?",
        options: [
            "A) The Great Fire of London destroyed the city, forcing new urban planning efforts.", 
            "B) The fire led to significant changes in urban design and fire safety.", 
            "C) London’s narrow streets contributed to the fire’s spread.", 
            "D) The destruction of London led to the adoption of modern architecture."
        ],
        answer: "B) The fire led to significant changes in urban design and fire safety."
    },
    {  
        question: "Passage: Scientists studying migratory birds have found that some species use the Earth’s magnetic field to navigate. By sensing variations in magnetism, these birds maintain a consistent flight path over thousands of miles. However, some researchers argue that additional environmental cues, such as wind patterns and the position of the sun, also play a role in navigation.\n\nWhich choice best reflects the passage’s main point?",
        options: [
            "A) Migratory birds rely exclusively on the Earth's magnetic field to navigate.", 
            "B) The Earth’s magnetic field is one of several factors that help migratory birds navigate.", 
            "C) Some researchers doubt the role of magnetism in bird migration.", 
            "D) Environmental cues like wind and sunlight are the primary navigational tools for birds."
        ],
        answer: "B) The Earth’s magnetic field is one of several factors that help migratory birds navigate."
    },

    // Math Questions
    {  
        question: "If 8x - 6 = 2x + 18, what is the value of x?",
        options: ["A) 3", "B) 4", "C) 5", "D) 6"],
        answer: "D) 6"
    },
    {  
        question: "A rectangle has a width of 5 and a perimeter of 32. What is its length?",
        options: ["A) 8", "B) 10", "C) 11", "D) 12"],
        answer: "A) 8"
    },
    {  
        question: "The function h(x) = 4x² - 3x + 2 is given. What is h(5)?",
        options: ["A) 87", "B) 89", "C) 91", "D) 93"],
        answer: "C) 91"
    }
],
38:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nIn light of the fact that the event was postponed, the organizers decided to notify all attendees as soon as possible.",
        options: [
            "A) In light of the fact that the event was postponed, the organizers decided to notify all attendees as soon as possible.", 
            "B) Because the event was postponed, the organizers decided to notify all attendees immediately.", 
            "C) Since the event was postponed, the organizers quickly notified all attendees.", 
            "D) No change"
        ],
        answer: "C) Since the event was postponed, the organizers quickly notified all attendees."
    },
    {  
        question: "Which choice best eliminates redundancy?\nThe reason why the company saw increased profits was because of its new marketing strategy.",
        options: [
            "A) The reason why the company saw increased profits was because of its new marketing strategy.", 
            "B) The company saw increased profits because of its new marketing strategy.", 
            "C) Due to its new marketing strategy, the company experienced a rise in profits.", 
            "D) No change"
        ],
        answer: "B) The company saw increased profits because of its new marketing strategy."
    },
    {  
        question: "Which choice correctly maintains parallel structure?\nThe committee was responsible for drafting policies, conducting reviews, and to implement new procedures.",
        options: [
            "A) drafting policies, conducting reviews, and to implement new procedures.", 
            "B) drafting policies, conducting reviews, and implementing new procedures.", 
            "C) to draft policies, conducting reviews, and implementing new procedures.", 
            "D) No change"
        ],
        answer: "B) drafting policies, conducting reviews, and implementing new procedures."
    },

    // Reading Questions
    {  
        question: "Passage: Climate scientists have found that ocean temperatures have risen significantly over the past century, leading to disruptions in marine ecosystems. Species that once thrived in specific regions are migrating to cooler waters, affecting the food chain and local fishing industries. Researchers emphasize the importance of continued monitoring and global cooperation in addressing these environmental shifts.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Rising ocean temperatures are forcing marine species to migrate, disrupting ecosystems and industries.", 
            "B) Ocean temperatures have increased due to climate change, altering marine ecosystems.", 
            "C) Scientists are studying the effects of rising ocean temperatures on marine life and fishing industries.", 
            "D) Global cooperation is needed to prevent further marine species migration."
        ],
        answer: "A) Rising ocean temperatures are forcing marine species to migrate, disrupting ecosystems and industries."
    },
    {  
        question: "Passage: The invention of the printing press in the 15th century revolutionized the spread of information. Books became more accessible, leading to increased literacy rates across Europe. Scholars argue that this technological advancement played a crucial role in the Renaissance by making knowledge more widely available.\n\nWhich statement best reflects the central idea of the passage?",
        options: [
            "A) The printing press increased literacy and helped spread Renaissance ideas.", 
            "B) The invention of the printing press made books more accessible.", 
            "C) Increased literacy rates in Europe contributed to Renaissance advancements.", 
            "D) Scholars believe the printing press was the most significant invention of the 15th century."
        ],
        answer: "A) The printing press increased literacy and helped spread Renaissance ideas."
    },
    {  
        question: "Passage: Scientists researching deep-sea ecosystems have discovered new species that thrive in extreme conditions. These organisms survive without sunlight by relying on chemical processes near hydrothermal vents. Their unique adaptations challenge previous assumptions about the requirements for life and expand our understanding of biodiversity.\n\nWhich choice best captures the passage’s main point?",
        options: [
            "A) Hydrothermal vent ecosystems contain previously unknown species.", 
            "B) Deep-sea organisms survive without sunlight using chemical processes.", 
            "C) The discovery of deep-sea species has broadened scientists' understanding of life.", 
            "D) New species in deep-sea environments suggest the possibility of life on other planets."
        ],
        answer: "C) The discovery of deep-sea species has broadened scientists' understanding of life."
    },

    // Math Questions
    {  
        question: "If 7x - 5 = 3x + 15, what is the value of x?",
        options: ["A) 3", "B) 4", "C) 5", "D) 6"],
        answer: "C) 5"
    },
    {  
        question: "A circle has a diameter of 10. What is its area? (Use \u03C0 = 3.14)",
        options: ["A) 78.5", "B) 31.4", "C) 50.24", "D) 25.12"],
        answer: "A) 78.5"
    },
    {  
        question: "The function g(x) = 5x² - 2x + 3 is given. What is g(4)?",
        options: ["A) 77", "B) 79", "C) 81", "D) 83"],
        answer: "B) 79"
    }
],
39:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nDue to the fact that the store was out of stock, the customer had no other choice but to place an order online.",
        options: [
            "A) Due to the fact that the store was out of stock, the customer had no other choice but to place an order online.", 
            "B) Because the store was out of stock, the customer placed an order online.", 
            "C) Since the store was out of stock, the customer had to order online.", 
            "D) No change"
        ],
        answer: "C) Since the store was out of stock, the customer had to order online."
    },
    {  
        question: "Which choice eliminates unnecessary words while keeping the meaning intact?\nThe primary reason why the company increased its advertising budget was in order to boost sales.",
        options: [
            "A) The primary reason why the company increased its advertising budget was in order to boost sales.", 
            "B) The reason the company increased its advertising budget was to boost sales.", 
            "C) The company increased its advertising budget to boost sales.", 
            "D) No change"
        ],
        answer: "C) The company increased its advertising budget to boost sales."
    },
    {  
        question: "Which choice correctly maintains parallel structure?\nThe project manager’s duties include overseeing deadlines, managing the team, and to ensure project quality.",
        options: [
            "A) overseeing deadlines, managing the team, and to ensure project quality.", 
            "B) overseeing deadlines, managing the team, and ensuring project quality.", 
            "C) to oversee deadlines, managing the team, and ensuring project quality.", 
            "D) No change"
        ],
        answer: "B) overseeing deadlines, managing the team, and ensuring project quality."
    },

    // Reading Questions
    {  
        question: "Passage: Over the last decade, urban areas have increasingly adopted green infrastructure solutions, such as rooftop gardens and permeable pavements, to combat flooding and improve air quality. Research suggests that these strategies not only enhance environmental sustainability but also contribute to the well-being of city residents.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Cities are implementing green infrastructure to address environmental challenges and improve quality of life.", 
            "B) Urban planning now includes rooftop gardens and green spaces to promote sustainability.", 
            "C) Green infrastructure solutions primarily reduce flooding in cities.", 
            "D) Scientists have studied how green infrastructure affects urban environments."
        ],
        answer: "A) Cities are implementing green infrastructure to address environmental challenges and improve quality of life."
    },
    {  
        question: "Passage: In the late 19th century, Nikola Tesla experimented with wireless electricity transmission, aiming to develop a global wireless power system. Though his vision was never fully realized, his innovations laid the groundwork for later advancements in wireless communication and energy transfer technologies.\n\nWhich statement best reflects the central idea of the passage?",
        options: [
            "A) Tesla's experiments in wireless electricity influenced modern technology.", 
            "B) Wireless power was Tesla’s most successful invention.", 
            "C) Tesla’s ideas were groundbreaking but largely unsuccessful.", 
            "D) The development of wireless power remains an unfulfilled goal."
        ],
        answer: "A) Tesla's experiments in wireless electricity influenced modern technology."
    },
    {  
        question: "Passage: Researchers studying sleep patterns have found that consistent sleep schedules lead to better cognitive function and overall health. However, many individuals suffer from irregular sleep due to work schedules and lifestyle habits. Experts emphasize the importance of developing routines that support consistent sleep cycles.\n\nWhich of the following best captures the passage’s main argument?",
        options: [
            "A) Maintaining a regular sleep schedule has cognitive and health benefits.", 
            "B) Many people have irregular sleep schedules that affect their well-being.", 
            "C) Experts recommend changing work schedules to accommodate better sleep.", 
            "D) Sleep research has revealed the effects of lifestyle habits on health."
        ],
        answer: "A) Maintaining a regular sleep schedule has cognitive and health benefits."
    },

    // Math Questions
    {  
        question: "If 8x - 6 = 2x + 18, what is the value of x?",
        options: ["A) 3", "B) 4", "C) 5", "D) 6"],
        answer: "B) 4"
    },
    {  
        question: "A cylinder has a radius of 4 and a height of 10. What is its volume? (Use \u03C0 = 3.14)",
        options: ["A) 125.6", "B) 314", "C) 502.4", "D) 628"],
        answer: "C) 502.4"
    },
    {  
        question: "The function h(x) = 4x² - 3x + 2 is given. What is h(5)?",
        options: ["A) 87", "B) 89", "C) 92", "D) 94"],
        answer: "B) 89"
    }
],
39:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nDue to the fact that the store was out of stock, the customer had no other choice but to place an order online.",
        options: [
            "A) Due to the fact that the store was out of stock, the customer had no other choice but to place an order online.", 
            "B) Because the store was out of stock, the customer placed an order online.", 
            "C) Since the store was out of stock, the customer had to order online.", 
            "D) No change"
        ],
        answer: "C) Since the store was out of stock, the customer had to order online."
    },
    {  
        question: "Which choice eliminates unnecessary words while keeping the meaning intact?\nThe primary reason why the company increased its advertising budget was in order to boost sales.",
        options: [
            "A) The primary reason why the company increased its advertising budget was in order to boost sales.", 
            "B) The reason the company increased its advertising budget was to boost sales.", 
            "C) The company increased its advertising budget to boost sales.", 
            "D) No change"
        ],
        answer: "C) The company increased its advertising budget to boost sales."
    },
    {  
        question: "Which choice correctly maintains parallel structure?\nThe project manager’s duties include overseeing deadlines, managing the team, and to ensure project quality.",
        options: [
            "A) overseeing deadlines, managing the team, and to ensure project quality.", 
            "B) overseeing deadlines, managing the team, and ensuring project quality.", 
            "C) to oversee deadlines, managing the team, and ensuring project quality.", 
            "D) No change"
        ],
        answer: "B) overseeing deadlines, managing the team, and ensuring project quality."
    },

    // Reading Questions
    {  
        question: "Passage: Over the last decade, urban areas have increasingly adopted green infrastructure solutions, such as rooftop gardens and permeable pavements, to combat flooding and improve air quality. Research suggests that these strategies not only enhance environmental sustainability but also contribute to the well-being of city residents.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Cities are implementing green infrastructure to address environmental challenges and improve quality of life.", 
            "B) Urban planning now includes rooftop gardens and green spaces to promote sustainability.", 
            "C) Green infrastructure solutions primarily reduce flooding in cities.", 
            "D) Scientists have studied how green infrastructure affects urban environments."
        ],
        answer: "A) Cities are implementing green infrastructure to address environmental challenges and improve quality of life."
    },
    {  
        question: "Passage: In the late 19th century, Nikola Tesla experimented with wireless electricity transmission, aiming to develop a global wireless power system. Though his vision was never fully realized, his innovations laid the groundwork for later advancements in wireless communication and energy transfer technologies.\n\nWhich statement best reflects the central idea of the passage?",
        options: [
            "A) Tesla's experiments in wireless electricity influenced modern technology.", 
            "B) Wireless power was Tesla’s most successful invention.", 
            "C) Tesla’s ideas were groundbreaking but largely unsuccessful.", 
            "D) The development of wireless power remains an unfulfilled goal."
        ],
        answer: "A) Tesla's experiments in wireless electricity influenced modern technology."
    },
    {  
        question: "Passage: Researchers studying sleep patterns have found that consistent sleep schedules lead to better cognitive function and overall health. However, many individuals suffer from irregular sleep due to work schedules and lifestyle habits. Experts emphasize the importance of developing routines that support consistent sleep cycles.\n\nWhich of the following best captures the passage’s main argument?",
        options: [
            "A) Maintaining a regular sleep schedule has cognitive and health benefits.", 
            "B) Many people have irregular sleep schedules that affect their well-being.", 
            "C) Experts recommend changing work schedules to accommodate better sleep.", 
            "D) Sleep research has revealed the effects of lifestyle habits on health."
        ],
        answer: "A) Maintaining a regular sleep schedule has cognitive and health benefits."
    },

    // Math Questions
    {  
        question: "If 8x - 6 = 2x + 18, what is the value of x?",
        options: ["A) 3", "B) 4", "C) 5", "D) 6"],
        answer: "B) 4"
    },
    {  
        question: "A cylinder has a radius of 4 and a height of 10. What is its volume? (Use \u03C0 = 3.14)",
        options: ["A) 125.6", "B) 314", "C) 502.4", "D) 628"],
        answer: "C) 502.4"
    },
    {  
        question: "The function h(x) = 4x² - 3x + 2 is given. What is h(5)?",
        options: ["A) 87", "B) 89", "C) 92", "D) 94"],
        answer: "B) 89"
    }
],
40:[  
    // Writing Questions
    {  
        question: "Which choice best eliminates redundancy while maintaining the original meaning?\nThe new policy is expected to take effect and begin implementation starting next month.",
        options: [
            "A) The new policy is expected to take effect starting next month.", 
            "B) The new policy is expected to begin next month.", 
            "C) The new policy is expected to take effect and start next month.", 
            "D) No change"
        ],
        answer: "A) The new policy is expected to take effect starting next month."
    },
    {  
        question: "Which revision most improves clarity and parallel structure?\nThe committee values creativity, problem-solving skills, and people who can communicate effectively.",
        options: [
            "A) The committee values creativity, problem-solving skills, and effective communicators.", 
            "B) The committee values people who are creative, solve problems, and communicate effectively.", 
            "C) The committee values creativity, problem-solving, and communication skills.", 
            "D) No change"
        ],
        answer: "C) The committee values creativity, problem-solving, and communication skills."
    },
    {  
        question: "Which choice correctly corrects the subject-verb agreement issue?\nNeither the manager nor the employees was available to address the customer’s concern.",
        options: [
            "A) Neither the manager nor the employees were available to address the customer’s concern.", 
            "B) Neither the manager nor the employees was available to address the customer’s concern.", 
            "C) Neither the manager nor the employees is available to address the customer’s concern.", 
            "D) No change"
        ],
        answer: "A) Neither the manager nor the employees were available to address the customer’s concern."
    },

    // Reading Questions
    {  
        question: "Passage: Scientific studies suggest that a person’s ability to focus may be influenced by exposure to natural environments. Researchers found that individuals who spent time in green spaces performed better on cognitive tests compared to those in urban settings. Some scientists propose that the calming effect of nature may help replenish mental resources depleted by daily tasks.\n\nWhat is the most accurate summary of the passage?",
        options: [
            "A) Exposure to nature has been linked to improved cognitive function.", 
            "B) People who spend time outdoors tend to have higher intelligence.", 
            "C) Natural environments provide mental benefits that urban settings lack.", 
            "D) Researchers have proven that green spaces directly improve brain function."
        ],
        answer: "A) Exposure to nature has been linked to improved cognitive function."
    },
    {  
        question: "Passage: Throughout history, technological advancements have often sparked ethical debates. The printing press raised concerns about misinformation, the steam engine was feared to eliminate jobs, and modern artificial intelligence is scrutinized for its potential societal impact. Each of these innovations has ultimately reshaped industries and daily life in unpredictable ways.\n\nWhich choice best captures the passage’s central theme?",
        options: [
            "A) Technological advancements often lead to concerns about their impact on society.", 
            "B) Every major invention has faced resistance before being widely accepted.", 
            "C) The consequences of new technologies are difficult to predict.", 
            "D) Ethical concerns about technology have historically proven to be unfounded."
        ],
        answer: "C) The consequences of new technologies are difficult to predict."
    },
    {  
        question: "Passage: Despite its modern reputation as a common sweetener, honey has been used medicinally for thousands of years. Ancient civilizations valued honey for its antibacterial properties, using it to treat wounds and infections. Recent research confirms that honey’s natural enzymes help combat bacteria, making it a subject of interest in modern medical studies.\n\nWhich choice best conveys the main idea of the passage?",
        options: [
            "A) Honey has a long history of use as both a food and a medicine.", 
            "B) Modern science has validated honey’s medicinal properties.", 
            "C) Ancient civilizations used honey to treat a variety of ailments.", 
            "D) Honey’s antibacterial properties have made it an important research topic."
        ],
        answer: "B) Modern science has validated honey’s medicinal properties."
    },

    // Math Questions
    {  
        question: "If 3(2x - 5) = 4x + 7, what is the value of x?",
        options: ["A) 8", "B) 9", "C) 10", "D) 11"],
        answer: "C) 10"
    },
    {  
        question: "A sphere has a radius of 5. What is its surface area? (Use \u03C0 = 3.14)",
        options: ["A) 314", "B) 340", "C) 392", "D) 400"],
        answer: "A) 314"
    },
    {  
        question: "The function g(x) = 2x² - 5x + 6 is given. What is g(4)?",
        options: ["A) 18", "B) 19", "C) 20", "D) 21"],
        answer: "B) 19"
    }
],
41:[  
    // Writing Questions
    {  
        question: "Which choice best eliminates redundancy while maintaining the original meaning?\nThe scientist’s discovery was new and innovative, paving the way for future advancements.",
        options: [
            "A) The scientist’s discovery was innovative, paving the way for future advancements.", 
            "B) The scientist’s discovery was new, paving the way for future advancements.", 
            "C) The scientist’s discovery was both new and groundbreaking, paving the way for future advancements.", 
            "D) No change"
        ],
        answer: "A) The scientist’s discovery was innovative, paving the way for future advancements."
    },
    {  
        question: "Which revision improves conciseness without changing the meaning?\nIn order to gain access to the restricted area, one must first obtain prior approval.",
        options: [
            "A) To access the restricted area, one must first obtain approval.", 
            "B) To access the restricted area, prior approval must first be obtained.", 
            "C) One must get prior approval to gain access to the restricted area.", 
            "D) No change"
        ],
        answer: "A) To access the restricted area, one must first obtain approval."
    },
    {  
        question: "Which choice corrects the modifier placement error?\nWalking into the room, the aroma of fresh coffee was immediately noticeable.",
        options: [
            "A) The aroma of fresh coffee was immediately noticeable upon walking into the room.", 
            "B) Walking into the room, one could immediately notice the aroma of fresh coffee.", 
            "C) Walking into the room, there was an immediate aroma of fresh coffee.", 
            "D) No change"
        ],
        answer: "B) Walking into the room, one could immediately notice the aroma of fresh coffee."
    },

    // Reading Questions
    {  
        question: "Passage: Climate models suggest that ocean currents play a crucial role in regulating global temperatures. Some scientists believe that disruptions to these currents could accelerate climate change, while others argue that their impact remains uncertain. The debate continues as researchers gather more data.\n\nWhich choice best summarizes the central idea of the passage?",
        options: [
            "A) Scientists are studying how ocean currents influence climate change.", 
            "B) The relationship between ocean currents and climate change is still debated.", 
            "C) Disruptions in ocean currents are the primary cause of climate change.", 
            "D) Some scientists believe ocean currents may have no effect on climate change."
        ],
        answer: "B) The relationship between ocean currents and climate change is still debated."
    },
    {  
        question: "Passage: Throughout history, literature has served as both a reflection of society and a means of influencing it. Authors often embed social critiques in their works, addressing issues ranging from political corruption to human rights. While some literature directly challenges societal norms, other works subtly prompt readers to question the status quo.\n\nWhich choice best captures the passage’s main idea?",
        options: [
            "A) Literature often reflects societal issues and can shape public perception.", 
            "B) Authors use literature as a tool to criticize political corruption.", 
            "C) The primary purpose of literature is to influence social change.", 
            "D) Some books challenge norms, while others are purely entertainment."
        ],
        answer: "A) Literature often reflects societal issues and can shape public perception."
    },
    {  
        question: "Passage: Advances in artificial intelligence have transformed many industries, but some experts warn that unchecked AI development poses risks. While automation improves efficiency, concerns about job displacement and ethical dilemmas persist. The question of how to balance innovation with responsibility remains at the forefront of technological discussions.\n\nWhich of the following best expresses the passage’s primary argument?",
        options: [
            "A) AI development brings both opportunities and risks that must be managed.", 
            "B) AI technology is beneficial but could eliminate jobs.", 
            "C) Ethical concerns surrounding AI are often exaggerated.", 
            "D) The growth of AI is unstoppable and should not be restricted."
        ],
        answer: "A) AI development brings both opportunities and risks that must be managed."
    },

    // Math Questions
    {  
        question: "If 4(2x - 3) = 5x + 9, what is the value of x?",
        options: ["A) 7", "B) 8", "C) 9", "D) 10"],
        answer: "C) 9"
    },
    {  
        question: "A cylinder has a radius of 4 and a height of 10. What is its volume? (Use \u03C0 = 3.14)",
        options: ["A) 502.4", "B) 510.6", "C) 515.2", "D) 520.8"],
        answer: "A) 502.4"
    },
    {  
        question: "The function h(x) = x² - 6x + 8 is given. What is h(5)?",
        options: ["A) 2", "B) 3", "C) 4", "D) 5"],
        answer: "B) 3"
    }
],
42:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nThe committee members reached a unanimous agreement that the proposal should be approved.",
        options: [
            "A) The committee members reached an agreement that the proposal should be approved.", 
            "B) The committee unanimously agreed that the proposal should be approved.", 
            "C) The committee members all unanimously agreed to approve the proposal.", 
            "D) No change"
        ],
        answer: "B) The committee unanimously agreed that the proposal should be approved."
    },
    {  
        question: "Which revision corrects the misplaced modifier?\nCovered in thick snow, the hikers struggled to find the trail.",
        options: [
            "A) The hikers struggled to find the trail, covered in thick snow.", 
            "B) Covered in thick snow, the trail was difficult for the hikers to find.", 
            "C) The hikers, covered in thick snow, struggled to find the trail.", 
            "D) No change"
        ],
        answer: "C) The hikers, covered in thick snow, struggled to find the trail."
    },
    {  
        question: "Which sentence maintains proper parallel structure?\nShe enjoys hiking, reading, and to play the piano.",
        options: [
            "A) She enjoys hiking, reading, and playing the piano.", 
            "B) She enjoys to hike, read, and to play the piano.", 
            "C) She enjoys hiking, to read, and playing the piano.", 
            "D) No change"
        ],
        answer: "A) She enjoys hiking, reading, and playing the piano."
    },

    // Reading Questions
    {  
        question: "Passage: Advances in renewable energy technology have significantly reduced the cost of solar and wind power. Some researchers argue that these advancements could make fossil fuels obsolete, while others caution that challenges in energy storage and infrastructure still remain. The debate continues as governments and industries adapt to the changing energy landscape.\n\nWhich choice best summarizes the central idea of the passage?",
        options: [
            "A) Renewable energy technology has advanced, but challenges remain.", 
            "B) Solar and wind power are now more affordable than fossil fuels.", 
            "C) Energy storage is the main obstacle preventing the adoption of renewable energy.", 
            "D) The future of renewable energy depends entirely on government policies."
        ],
        answer: "A) Renewable energy technology has advanced, but challenges remain."
    },
    {  
        question: "Passage: The Renaissance period was marked by a resurgence of art, science, and philosophy. Thinkers such as Leonardo da Vinci and Galileo Galilei challenged existing beliefs, leading to breakthroughs in various fields. While some scholars see the Renaissance as an age of enlightenment, others argue that it was limited in its impact on the lower classes.\n\nWhich statement best reflects the passage’s main idea?",
        options: [
            "A) The Renaissance led to intellectual advancements, but its effects were not universally experienced.", 
            "B) The Renaissance was a period of scientific progress that changed the world forever.", 
            "C) Renaissance thinkers sought to challenge political authority through their discoveries.", 
            "D) The Renaissance primarily benefited the wealthy and had little effect on society as a whole."
        ],
        answer: "A) The Renaissance led to intellectual advancements, but its effects were not universally experienced."
    },
    {  
        question: "Passage: Marine biologists have long studied the communication patterns of dolphins. Recent research suggests that dolphins may use a form of complex language, with unique whistles assigned to individual members of their group. While some scientists believe this represents true linguistic ability, others argue that it is simply a sophisticated form of animal signaling.\n\nWhich choice best captures the central argument of the passage?",
        options: [
            "A) Dolphins may have their own language, but scientists are still debating this claim.", 
            "B) Dolphin communication is more advanced than that of any other species.", 
            "C) Scientists have proven that dolphins possess true linguistic ability.", 
            "D) Dolphins rely primarily on body language rather than vocalizations."
        ],
        answer: "A) Dolphins may have their own language, but scientists are still debating this claim."
    },

    // Math Questions
    {  
        question: "If 3(2x - 4) = 5x + 6, what is the value of x?",
        options: ["A) 2", "B) 3", "C) 4", "D) 5"],
        answer: "B) 3"
    },
    {  
        question: "A sphere has a radius of 5. What is its volume? (Use \u03C0 = 3.14, and volume formula V = 4/3πr³)",
        options: ["A) 510.6", "B) 514.3", "C) 523.3", "D) 526.4"],
        answer: "C) 523.3"
    },
    {  
        question: "The function g(x) = 2x² - 5x + 3 is given. What is g(4)?",
        options: ["A) 15", "B) 17", "C) 19", "D) 21"],
        answer: "B) 17"
    }
],
43:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nAt this point in time, scientists are currently researching ways to improve battery efficiency in electric vehicles.",
        options: [
            "A) At this point in time, scientists are currently researching ways to improve battery efficiency in electric vehicles.", 
            "B) Scientists are researching ways to improve battery efficiency in electric vehicles.", 
            "C) At this moment, scientists are researching and looking for ways to improve battery efficiency.", 
            "D) No change"
        ],
        answer: "B) Scientists are researching ways to improve battery efficiency in electric vehicles."
    },
    {  
        question: "Which sentence corrects the misplaced modifier?\nRunning late, the traffic jam made it impossible for Jake to arrive on time.",
        options: [
            "A) Running late, the traffic jam made it impossible for Jake to arrive on time.", 
            "B) The traffic jam, running late, made it impossible for Jake to arrive on time.", 
            "C) Running late, Jake found it impossible to arrive on time due to the traffic jam.", 
            "D) No change"
        ],
        answer: "C) Running late, Jake found it impossible to arrive on time due to the traffic jam."
    },
    {  
        question: "Which sentence maintains parallel structure?\nThe new program focuses on teaching students how to write effectively, to think critically, and developing problem-solving skills.",
        options: [
            "A) teaching students how to write effectively, to think critically, and developing problem-solving skills.", 
            "B) teaching students how to write effectively, think critically, and develop problem-solving skills.", 
            "C) to teach students how to write effectively, think critically, and developing problem-solving skills.", 
            "D) No change"
        ],
        answer: "B) teaching students how to write effectively, think critically, and develop problem-solving skills."
    },

    // Reading Questions
    {  
        question: "Passage: In the past decade, advancements in artificial intelligence have transformed various industries. While some experts celebrate AI’s potential to streamline tasks and enhance efficiency, others warn about the ethical implications, particularly concerning privacy and job displacement. The discussion continues as policymakers attempt to establish guidelines for responsible AI development.\n\nWhich choice best captures the main idea of the passage?",
        options: [
            "A) AI is revolutionizing industries, but concerns about ethics remain.", 
            "B) AI has completely replaced human labor in various industries.", 
            "C) Ethical concerns outweigh the benefits of AI in modern society.", 
            "D) Policymakers have successfully addressed all issues regarding AI."
        ],
        answer: "A) AI is revolutionizing industries, but concerns about ethics remain."
    },
    {  
        question: "Passage: The Great Depression of the 1930s was a period of severe economic hardship that affected millions worldwide. Governments responded with various policies, some of which successfully alleviated economic suffering, while others had unintended consequences. Economists continue to debate which strategies were most effective in fostering recovery.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) The Great Depression led to global economic hardship, prompting diverse government responses.", 
            "B) Government interventions during the Great Depression were ineffective and worsened the crisis.", 
            "C) The Great Depression was the first economic downturn to be caused by government policies.", 
            "D) Economists universally agree on the best approach to handling economic crises."
        ],
        answer: "A) The Great Depression led to global economic hardship, prompting diverse government responses."
    },
    {  
        question: "Passage: Over the years, studies have suggested that consuming a balanced diet rich in fruits and vegetables leads to improved health outcomes. However, some researchers argue that individual dietary needs vary widely based on genetics, lifestyle, and medical conditions. While nutrition guidelines provide general recommendations, they may not be universally applicable.\n\nWhich statement best reflects the passage’s argument?",
        options: [
            "A) A balanced diet is generally beneficial, but individual needs may differ.", 
            "B) Eating fruits and vegetables guarantees good health for everyone.", 
            "C) Genetics play no role in how a person responds to different diets.", 
            "D) Nutrition guidelines are unnecessary since every person has different needs."
        ],
        answer: "A) A balanced diet is generally beneficial, but individual needs may differ."
    },

    // Math Questions
    {  
        question: "If 4(2x - 3) = 5x + 9, what is the value of x?",
        options: ["A) 4", "B) 5", "C) 6", "D) 7"],
        answer: "B) 5"
    },
    {  
        question: "A cylinder has a radius of 3 and a height of 10. What is its volume? (Use \u03C0 = 3.14, and volume formula V = πr²h)",
        options: ["A) 278.4", "B) 282.6", "C) 289.2", "D) 301.4"],
        answer: "A) 278.4"
    },
    {  
        question: "The function h(x) = 4x² - 7x + 6 is given. What is h(5)?",
        options: ["A) 73", "B) 78", "C) 79", "D) 82"],
        answer: "B) 78"
    }
],
44:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nDue to the fact that the project was behind schedule, the team made the decision to work overtime.",
        options: [
            "A) Due to the fact that the project was behind schedule, the team made the decision to work overtime.", 
            "B) Because the project was behind schedule, the team decided to work overtime.", 
            "C) Since the project was behind schedule, the team chose to work overtime.", 
            "D) No change"
        ],
        answer: "B) Because the project was behind schedule, the team decided to work overtime."
    },
    {  
        question: "Which revision corrects the verb tense shift?\nBy the time the meeting starts, James was already presenting his report.",
        options: [
            "A) By the time the meeting starts, James was already presenting his report.", 
            "B) By the time the meeting started, James was already presenting his report.", 
            "C) By the time the meeting starts, James will have already been presenting his report.", 
            "D) No change"
        ],
        answer: "C) By the time the meeting starts, James will have already been presenting his report."
    },
    {  
        question: "Which sentence correctly maintains parallel structure?\nThe job candidate was confident in his ability to write effectively, communicate clearly, and that he could work well under pressure.",
        options: [
            "A) to write effectively, communicate clearly, and that he could work well under pressure.", 
            "B) to write effectively, to communicate clearly, and to work well under pressure.", 
            "C) writing effectively, communicating clearly, and working well under pressure.", 
            "D) No change"
        ],
        answer: "B) to write effectively, to communicate clearly, and to work well under pressure."
    },

    // Reading Questions
    {  
        question: "Passage: Advances in medical research have significantly increased the human lifespan. However, some scientists argue that extending longevity brings ethical dilemmas, such as overpopulation and resource distribution. Others contend that increasing lifespan enhances the quality of life and allows for more contributions to society. The debate continues as medical breakthroughs push boundaries further.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Medical advancements have extended human life but raise ethical concerns.", 
            "B) Scientists agree that increasing lifespan benefits society.", 
            "C) The debate on lifespan extension focuses only on economic impacts.", 
            "D) New research suggests humans may soon achieve immortality."
        ],
        answer: "A) Medical advancements have extended human life but raise ethical concerns."
    },
    {  
        question: "Passage: The development of renewable energy sources has transformed the global energy landscape. Solar, wind, and hydroelectric power are being adopted at an increasing rate. However, challenges remain, such as energy storage limitations and infrastructure costs. Researchers continue to explore solutions to make renewable energy more efficient and widespread.\n\nWhat is the primary purpose of the passage?",
        options: [
            "A) To argue that renewable energy will completely replace fossil fuels.", 
            "B) To highlight both the benefits and challenges of renewable energy.", 
            "C) To suggest that renewable energy sources are too costly to implement widely.", 
            "D) To explain why renewable energy cannot meet global demands."
        ],
        answer: "B) To highlight both the benefits and challenges of renewable energy."
    },
    {  
        question: "Passage: Throughout history, great inventions have often been met with skepticism. The telephone, for example, was once dismissed as impractical. Similarly, early computers were considered too complex for widespread use. Today, artificial intelligence faces similar doubts, yet it continues to develop rapidly, raising questions about its future role in society.\n\nWhich statement best reflects the passage’s main idea?",
        options: [
            "A) Groundbreaking inventions often face doubt before becoming widely accepted.", 
            "B) Early computers were more widely accepted than the telephone.", 
            "C) Artificial intelligence is the most important invention in history.", 
            "D) Skepticism has prevented many inventions from being successful."
        ],
        answer: "A) Groundbreaking inventions often face doubt before becoming widely accepted."
    },

    // Math Questions
    {  
        question: "If 3(2x - 5) = 4x + 9, what is the value of x?",
        options: ["A) 4", "B) 5", "C) 6", "D) 7"],
        answer: "A) 4"
    },
    {  
        question: "A right triangle has legs of 8 and 15. What is the length of the hypotenuse?",
        options: ["A) 16", "B) 17", "C) 18", "D) 19"],
        answer: "B) 17"
    },
    {  
        question: "The function g(x) = 2x² - 5x + 3 is given. What is g(4)?",
        options: ["A) 15", "B) 17", "C) 19", "D) 21"],
        answer: "C) 19"
    }
],
45:[  
    // Writing Questions
    {  
        question: "Which choice best improves clarity and conciseness?\nThe scientist conducted an experiment in order to determine the results of the study.",
        options: [
            "A) The scientist conducted an experiment in order to determine the results of the study.", 
            "B) The scientist experimented to determine the study’s results.", 
            "C) The scientist performed an experiment to analyze the study’s results.", 
            "D) No change"
        ],
        answer: "B) The scientist experimented to determine the study’s results."
    },
    {  
        question: "Which option corrects the misplaced modifier?\nHoping to catch the train, the station was reached just in time by Sarah.",
        options: [
            "A) Hoping to catch the train, the station was reached just in time by Sarah.", 
            "B) Hoping to catch the train, Sarah reached the station just in time.", 
            "C) Sarah, hoping to catch the train, was able to reach the station just in time.", 
            "D) No change"
        ],
        answer: "B) Hoping to catch the train, Sarah reached the station just in time."
    },
    {  
        question: "Which revision maintains proper subject-verb agreement?\nThe collection of rare books are displayed in the museum’s main hall.",
        options: [
            "A) The collection of rare books are displayed in the museum’s main hall.", 
            "B) The collection of rare books is displayed in the museum’s main hall.", 
            "C) The rare books collection are displayed in the museum’s main hall.", 
            "D) No change"
        ],
        answer: "B) The collection of rare books is displayed in the museum’s main hall."
    },

    // Reading Questions (SUPER MEAN 😈)
    {  
        question: "Passage: Advances in space exploration have led to the discovery of exoplanets—planets outside our solar system. While some scientists believe these planets could harbor life, others argue that current technology limits our ability to determine habitability with certainty. Despite these challenges, research continues to push the boundaries of what we know about the universe.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) The discovery of exoplanets has fueled debates about their potential to sustain life.", 
            "B) Scientists believe exoplanets could harbor life, but technological limitations prevent definitive conclusions.", 
            "C) Advances in space exploration have expanded our knowledge of the universe, particularly regarding exoplanets.", 
            "D) Researchers are confident that exoplanets can support life, despite current technological challenges."
        ],
        answer: "B) Scientists believe exoplanets could harbor life, but technological limitations prevent definitive conclusions."
    },
    {  
        question: "Passage: The Industrial Revolution brought unprecedented technological advancements, transforming economies worldwide. However, the rapid shift from agrarian to industrial societies created significant social and economic disparities. While some benefited from increased production and wealth, many workers faced harsh conditions and low wages, leading to widespread labor movements.\n\nWhat is the main idea of the passage?",
        options: [
            "A) The Industrial Revolution improved economies but also widened social inequalities.", 
            "B) Technological advancements in the Industrial Revolution led to economic prosperity and labor movements.", 
            "C) The shift from agrarian to industrial societies created both opportunities and challenges.", 
            "D) While the Industrial Revolution led to economic growth, it also resulted in exploitation of workers."
        ],
        answer: "C) The shift from agrarian to industrial societies created both opportunities and challenges."
    },
    {  
        question: "Passage: Climate scientists have long studied the effects of rising temperatures on ecosystems. As global temperatures increase, species migration patterns shift, and some habitats become uninhabitable. While some argue that adaptation is possible, others emphasize the urgency of reducing greenhouse gas emissions to mitigate long-term consequences.\n\nWhich of the following best captures the passage’s argument?",
        options: [
            "A) Climate change affects ecosystems by altering migration patterns and making some habitats uninhabitable.", 
            "B) Rising global temperatures have led to significant changes in species behavior and habitat conditions.", 
            "C) While species may adapt to climate change, reducing greenhouse gas emissions is necessary to prevent severe consequences.", 
            "D) Scientists are divided on whether species can adapt to climate change or whether action is needed."
        ],
        answer: "C) While species may adapt to climate change, reducing greenhouse gas emissions is necessary to prevent severe consequences."
    },

    // Math Questions
    {  
        question: "If 4(2x - 3) = 5x + 7, what is the value of x?",
        options: ["A) 5", "B) 6", "C) 7", "D) 8"],
        answer: "B) 6"
    },
    {  
        question: "A right triangle has legs of 9 and 12. What is the length of the hypotenuse?",
        options: ["A) 14", "B) 15", "C) 16", "D) 17"],
        answer: "B) 15"
    },
    {  
        question: "The function h(x) = 3x² - 7x + 4 is given. What is h(5)?",
        options: ["A) 48", "B) 50", "C) 52", "D) 54"],
        answer: "A) 48"
    }
],
46:[  
    // Writing Questions
    {  
        question: "Which choice best improves the clarity and conciseness of the sentence?\nThe committee made a decision to approve the new policy after much deliberation.",
        options: [
            "A) The committee made a decision to approve the new policy after much deliberation.", 
            "B) The committee decided to approve the new policy after deliberation.", 
            "C) The committee reached a decision to approve the new policy after much thought.", 
            "D) No change"
        ],
        answer: "B) The committee decided to approve the new policy after deliberation."
    },
    {  
        question: "Which sentence correctly fixes the dangling modifier?\nWalking through the museum, the ancient sculptures fascinated Lisa.",
        options: [
            "A) Walking through the museum, the ancient sculptures fascinated Lisa.", 
            "B) While Lisa was walking through the museum, the ancient sculptures fascinated her.", 
            "C) Walking through the museum, Lisa was fascinated by the ancient sculptures.", 
            "D) No change"
        ],
        answer: "C) Walking through the museum, Lisa was fascinated by the ancient sculptures."
    },
    {  
        question: "Which revision corrects the parallelism error?\nThe new program aims to reduce waste, increasing efficiency, and to promote sustainability.",
        options: [
            "A) The new program aims to reduce waste, increasing efficiency, and to promote sustainability.", 
            "B) The new program aims to reduce waste, increase efficiency, and promote sustainability.", 
            "C) The new program aims to reduce waste while increasing efficiency and to promote sustainability.", 
            "D) No change"
        ],
        answer: "B) The new program aims to reduce waste, increase efficiency, and promote sustainability."
    },

    // Reading Questions (Another Mean Set 😈)
    {  
        question: "Passage: The decline of bee populations has raised concerns about food security. Bees play a crucial role in pollinating crops, and their decline is linked to habitat loss, pesticide use, and climate change. Some scientists advocate for conservation programs, while others believe technological solutions, such as robotic pollinators, may be necessary.\n\nWhich choice best captures the central idea of the passage?",
        options: [
            "A) The decline of bee populations threatens food security, requiring either conservation or technological solutions.", 
            "B) Scientists debate whether bee population decline should be addressed with conservation efforts or alternative pollination methods.", 
            "C) Habitat loss, pesticide use, and climate change have contributed to the decline of bee populations, prompting conservation efforts.", 
            "D) The loss of bees is a major environmental issue, though technological advances may help counteract its effects."
        ],
        answer: "A) The decline of bee populations threatens food security, requiring either conservation or technological solutions."
    },
    {  
        question: "Passage: The development of antibiotics revolutionized medicine, drastically reducing deaths from bacterial infections. However, overuse has led to the emergence of antibiotic-resistant bacteria, creating a major public health concern. Some experts argue that stricter prescription regulations are necessary, while others emphasize the need for new drug development.\n\nWhat is the main takeaway from the passage?",
        options: [
            "A) The effectiveness of antibiotics has diminished due to bacterial resistance, leading to debate over solutions.", 
            "B) Antibiotic-resistant bacteria pose a significant health risk, prompting discussions on regulation and new drug research.", 
            "C) While antibiotics have historically reduced deaths, they are becoming less effective due to resistance.", 
            "D) Stricter prescription regulations and new drug development are both potential ways to address antibiotic resistance."
        ],
        answer: "B) Antibiotic-resistant bacteria pose a significant health risk, prompting discussions on regulation and new drug research."
    },
    {  
        question: "Passage: Artificial intelligence (AI) has transformed industries by automating complex tasks. While some view AI as a tool that enhances productivity and innovation, others warn about its impact on job markets. As AI systems become more sophisticated, discussions about ethical implications and workforce shifts are increasing.\n\nWhich statement best summarizes the passage?",
        options: [
            "A) AI is revolutionizing industries by automating tasks, though its impact on jobs is uncertain.", 
            "B) While AI enhances productivity, concerns exist regarding its influence on employment and ethics.", 
            "C) AI’s rapid development is creating both opportunities and challenges in various industries.", 
            "D) The ethical concerns surrounding AI outweigh its potential benefits in the workforce."
        ],
        answer: "B) While AI enhances productivity, concerns exist regarding its influence on employment and ethics."
    },

    // Math Questions
    {  
        question: "If 3(2x - 5) = 4x + 7, what is the value of x?",
        options: ["A) 6", "B) 7", "C) 8", "D) 9"],
        answer: "A) 6"
    },
    {  
        question: "A square has a diagonal of 10. What is the length of one of its sides?",
        options: ["A) 5", "B) 5√2", "C) 6", "D) 6√2"],
        answer: "B) 5√2"
    },
    {  
        question: "The function g(x) = 4x² - 6x + 3 is given. What is g(4)?",
        options: ["A) 38", "B) 40", "C) 42", "D) 44"],
        answer: "A) 38"
    }
],
47:[  
    // Writing Questions (Designed to Punish Careless Mistakes)
    {  
        question: "Which choice best improves the sentence for conciseness and clarity?\nThe scientists conducted an experiment that was designed to test the effectiveness of the new drug.",
        options: [
            "A) The scientists conducted an experiment that was designed to test the effectiveness of the new drug.", 
            "B) The scientists conducted an experiment testing the drug’s effectiveness.", 
            "C) The scientists tested the effectiveness of the new drug through an experiment.", 
            "D) No change"
        ],
        answer: "B) The scientists conducted an experiment testing the drug’s effectiveness."
    },
    {  
        question: "Which revision corrects the misplaced modifier?\nExhausted after a long day, the couch was the perfect place for Jason to relax.",
        options: [
            "A) Exhausted after a long day, the couch was the perfect place for Jason to relax.", 
            "B) The couch was the perfect place for Jason to relax after a long day of exhaustion.", 
            "C) Jason, exhausted after a long day, found the couch the perfect place to relax.", 
            "D) No change"
        ],
        answer: "C) Jason, exhausted after a long day, found the couch the perfect place to relax."
    },
    {  
        question: "Which choice correctly maintains parallel structure?\nThe software engineer’s responsibilities include writing code, debugging errors, and to optimize system performance.",
        options: [
            "A) writing code, debugging errors, and to optimize system performance.", 
            "B) writing code, debugging errors, and optimizing system performance.", 
            "C) writing code, debugging errors, and optimizing performance within the system.", 
            "D) No change"
        ],
        answer: "B) writing code, debugging errors, and optimizing system performance."
    },

    // Reading Questions (Pure Evil 😈)
    {  
        question: "Passage: The Great Barrier Reef, one of the world’s most biodiverse ecosystems, has faced severe coral bleaching due to rising ocean temperatures. Scientists have debated whether direct intervention—such as coral farming—can help restore damaged areas. Others argue that broader efforts to combat climate change are the only long-term solution.\n\nWhich statement best captures the main argument of the passage?",
        options: [
            "A) The Great Barrier Reef’s biodiversity is at risk due to climate change, sparking debates over solutions.", 
            "B) The Great Barrier Reef is experiencing coral bleaching, with scientists divided over intervention methods.", 
            "C) Rising ocean temperatures have harmed the Great Barrier Reef, leading to discussions about restoration strategies.", 
            "D) Some scientists believe coral farming could save the Great Barrier Reef, while others emphasize climate change solutions."
        ],
        answer: "A) The Great Barrier Reef’s biodiversity is at risk due to climate change, sparking debates over solutions."
    },
    {  
        question: "Passage: The advent of electric vehicles (EVs) has prompted discussions about their environmental impact. While EVs produce fewer emissions than gasoline-powered cars, concerns exist regarding the mining of lithium for batteries. Some experts advocate for stronger recycling programs to reduce environmental damage.\n\nWhat is the passage’s primary claim?",
        options: [
            "A) Electric vehicles are more environmentally friendly than gasoline-powered cars but have drawbacks.", 
            "B) Although electric vehicles lower emissions, concerns about lithium mining have led to debates on sustainability.", 
            "C) While electric vehicles reduce emissions, experts debate whether lithium mining offsets their benefits.", 
            "D) The push for electric vehicles has raised concerns about the sustainability of battery production."
        ],
        answer: "B) Although electric vehicles lower emissions, concerns about lithium mining have led to debates on sustainability."
    },
    {  
        question: "Passage: Research on sleep cycles suggests that maintaining a consistent bedtime can improve cognitive function. Studies indicate that erratic sleep schedules contribute to memory problems and reduced focus. Despite this, many people sacrifice sleep for work or entertainment.\n\nWhich of the following best summarizes the author’s viewpoint?",
        options: [
            "A) Inconsistent sleep patterns negatively impact cognitive function and focus.", 
            "B) While sleep consistency is beneficial, many people still prioritize other activities.", 
            "C) Maintaining a stable sleep schedule improves brain function, though many ignore this advice.", 
            "D) Sleep deprivation is a growing problem, though research suggests it can be managed with proper habits."
        ],
        answer: "C) Maintaining a stable sleep schedule improves brain function, though many ignore this advice."
    },

    // Math Questions (Trickiest Yet 🚨)
    {  
        question: "If 4x + 3 = 19, what is the value of x?",
        options: ["A) 4", "B) 5", "C) 6", "D) 7"],
        answer: "B) 4"
    },
    {  
        question: "A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?",
        options: ["A) 15", "B) 14", "C) 16", "D) 17"],
        answer: "A) 15"
    },
    {  
        question: "The function f(x) = 2x² - 3x + 4 is given. What is f(5)?",
        options: ["A) 42", "B) 43", "C) 44", "D) 45"],
        answer: "C) 44"
    }
],
48:[  
    // Writing Questions (Careless Mistakes = Instant Wrong)
    {  
        question: "Which revision best improves conciseness and clarity?\nThe company made the decision to expand internationally in order to increase revenue.",
        options: [
            "A) The company made the decision to expand internationally in order to increase revenue.", 
            "B) The company decided to expand internationally to increase revenue.", 
            "C) The company made a decision to expand internationally for increased revenue.", 
            "D) No change"
        ],
        answer: "B) The company decided to expand internationally to increase revenue."
    },
    {  
        question: "Which choice correctly fixes the subject-verb agreement error?\nNeither the employees nor the manager were available for the meeting.",
        options: [
            "A) Neither the employees nor the manager were available for the meeting.", 
            "B) Neither the employees nor the manager was available for the meeting.", 
            "C) Neither the employees nor the manager have been available for the meeting.", 
            "D) No change"
        ],
        answer: "B) Neither the employees nor the manager was available for the meeting."
    },
    {  
        question: "Which choice maintains parallel structure?\nThe job requires strong communication skills, the ability to work under pressure, and that one is adaptable.",
        options: [
            "A) strong communication skills, the ability to work under pressure, and that one is adaptable.", 
            "B) strong communication skills, working under pressure, and that one is adaptable.", 
            "C) strong communication skills, the ability to work under pressure, and adaptability.", 
            "D) No change"
        ],
        answer: "C) strong communication skills, the ability to work under pressure, and adaptability."
    },

    // Reading Questions (Every Answer Seems Right 😈)
    {  
        question: "Passage: The Amazon rainforest, home to millions of species, plays a crucial role in regulating Earth’s climate. However, rapid deforestation due to agriculture and logging has led to concerns about biodiversity loss and increased carbon emissions. Scientists warn that unless deforestation slows, the rainforest could reach an irreversible tipping point.\n\nWhich statement best captures the passage’s central idea?",
        options: [
            "A) The Amazon rainforest is vital to Earth's climate and is threatened by deforestation.", 
            "B) Rapid deforestation in the Amazon has caused concern over biodiversity and carbon emissions.", 
            "C) Scientists warn that continued deforestation may lead to an irreversible tipping point.", 
            "D) The Amazon’s deforestation is primarily due to agriculture and logging, raising environmental concerns."
        ],
        answer: "A) The Amazon rainforest is vital to Earth's climate and is threatened by deforestation."
    },
    {  
        question: "Passage: Artificial intelligence (AI) is transforming industries, from healthcare to finance. While some experts praise AI’s efficiency, others caution that increased reliance on automation could lead to job displacement and ethical dilemmas. The debate continues as technology advances rapidly.\n\nWhat is the passage’s primary claim?",
        options: [
            "A) AI is revolutionizing multiple industries but raises concerns about job displacement.", 
            "B) While AI increases efficiency, it also presents ethical and employment challenges.", 
            "C) The rapid advancement of AI has sparked discussions about its risks and benefits.", 
            "D) AI’s growing presence in industries like healthcare and finance has led to ethical debates."
        ],
        answer: "C) The rapid advancement of AI has sparked discussions about its risks and benefits."
    },
    {  
        question: "Passage: Research indicates that people who exercise regularly tend to have improved cognitive function. Studies suggest that aerobic activities, such as running and swimming, enhance memory and concentration. Despite these findings, many individuals struggle to maintain a consistent exercise routine.\n\nWhich statement best summarizes the passage’s argument?",
        options: [
            "A) Regular exercise is linked to improved cognitive function, but many fail to maintain it.", 
            "B) Studies show that aerobic activities help improve memory and concentration.", 
            "C) Although exercise enhances cognition, people often do not adhere to a routine.", 
            "D) Research suggests that running and swimming specifically contribute to mental sharpness."
        ],
        answer: "A) Regular exercise is linked to improved cognitive function, but many fail to maintain it."
    },

    // Math Questions (Time to Make a Tiny Mistake? Too Bad. 🚨)
    {  
        question: "If 3x - 7 = 2x + 5, what is the value of x?",
        options: ["A) 10", "B) 12", "C) 8", "D) 7"],
        answer: "D) 12"
    },
    {  
        question: "A rectangle has a length of 8 and a width of 6. What is its diagonal length?",
        options: ["A) 10", "B) 12", "C) 14", "D) 8√2"],
        answer: "A) 10"
    },
    {  
        question: "The function g(x) = x² - 5x + 6 is given. What is g(4)?",
        options: ["A) 2", "B) 3", "C) 4", "D) 5"],
        answer: "A) 2"
    }
],
49:[  
    // Writing Questions (Subtle Traps Everywhere)
    {  
        question: "Which revision best improves clarity and conciseness?\nDue to the fact that the meeting ran longer than expected, the team had to reschedule the client presentation.",
        options: [
            "A) Due to the fact that the meeting ran longer than expected, the team had to reschedule the client presentation.", 
            "B) Because the meeting ran long, the team rescheduled the client presentation.", 
            "C) The meeting ran longer than expected, leading to the rescheduling of the client presentation.", 
            "D) No change"
        ],
        answer: "B) Because the meeting ran long, the team rescheduled the client presentation."
    },
    {  
        question: "Which sentence correctly fixes the modifier placement error?\nWalking down the street, the bakery smelled delicious to Lisa.",
        options: [
            "A) Walking down the street, the bakery smelled delicious to Lisa.", 
            "B) Walking down the street, Lisa smelled the delicious bakery.", 
            "C) The bakery smelled delicious to Lisa as she walked down the street.", 
            "D) No change"
        ],
        answer: "C) The bakery smelled delicious to Lisa as she walked down the street."
    },
    {  
        question: "Which choice maintains parallel structure?\nThe professor’s lecture was engaging, informative, and he was also humorous.",
        options: [
            "A) engaging, informative, and he was also humorous.", 
            "B) engaging, informative, and humorous.", 
            "C) engaging and informative, and he was humorous.", 
            "D) No change"
        ],
        answer: "B) engaging, informative, and humorous."
    },

    // Reading Questions (All Answers Feel Right 😈)
    {  
        question: "Passage: As electric vehicles (EVs) become more common, experts debate their overall environmental impact. While EVs produce zero emissions while driving, battery production and electricity generation still contribute to pollution. Despite this, advocates argue that widespread EV adoption will significantly reduce carbon emissions over time.\n\nWhat is the passage’s primary claim?",
        options: [
            "A) EVs produce no emissions, but their production still causes pollution.", 
            "B) While EVs have environmental downsides, they ultimately reduce emissions.", 
            "C) EV battery production and electricity use raise concerns about pollution.", 
            "D) Experts continue to debate the true environmental impact of EVs."
        ],
        answer: "B) While EVs have environmental downsides, they ultimately reduce emissions."
    },
    {  
        question: "Passage: The ancient city of Pompeii, buried by a volcanic eruption in 79 AD, provides remarkable insights into Roman life. Archaeologists have uncovered well-preserved homes, shops, and artwork that reveal details of daily activities, social structure, and even cuisine. The sudden disaster paradoxically preserved a snapshot of history, offering scholars an unprecedented look into the past.\n\nWhich answer best captures the passage’s main idea?",
        options: [
            "A) Pompeii’s destruction has given modern historians an insight into Roman life.", 
            "B) Archaeologists have uncovered artifacts that detail Pompeii’s daily activities.", 
            "C) The volcanic eruption of 79 AD preserved Pompeii’s historical artifacts.", 
            "D) Pompeii provides insight into Roman civilization through its well-preserved ruins."
        ],
        answer: "D) Pompeii provides insight into Roman civilization through its well-preserved ruins."
    },
    {  
        question: "Passage: Scientific studies suggest that sleep deprivation can negatively impact memory, concentration, and decision-making. Despite this, many people continue to prioritize work and social activities over sleep. Experts warn that chronic sleep loss may contribute to long-term cognitive decline.\n\nWhich choice best summarizes the passage’s argument?",
        options: [
            "A) Sleep deprivation affects memory and concentration but remains common.", 
            "B) Studies indicate that inadequate sleep leads to cognitive impairment.", 
            "C) Experts warn that poor sleep habits may have long-term effects.", 
            "D) Many people prioritize work and social activities over sleep, harming cognition."
        ],
        answer: "C) Experts warn that poor sleep habits may have long-term effects."
    },

    // Math Questions (Tiny Mistakes = Instant Failure 😈)
    {  
        question: "Solve for x: 4x - 9 = 3x + 7.",
        options: ["A) 16", "B) 14", "C) 12", "D) 10"],
        answer: "D) 16"
    },
    {  
        question: "A triangle has sides of length 7, 24, and 25. What is its area?",
        options: ["A) 70", "B) 80", "C) 84", "D) 90"],
        answer: "C) 84"
    },
    {  
        question: "If f(x) = 2x² - 3x + 4, what is f(5)?",
        options: ["A) 39", "B) 41", "C) 43", "D) 45"],
        answer: "B) 41"
    }
],
50:[  
    // Writing Questions – Subtle grammar & conciseness traps 😈
    {  
        question: "Which revision best improves clarity and conciseness?\nConsidering the fact that the committee had already reached a decision, further discussion on the matter was unnecessary.",
        options: [
            "A) Considering the fact that the committee had already reached a decision, further discussion on the matter was unnecessary.", 
            "B) Since the committee had reached a decision, further discussion was unnecessary.", 
            "C) Given that the committee already made a decision, discussing it further wasn’t needed.", 
            "D) No change"
        ],
        answer: "B) Since the committee had reached a decision, further discussion was unnecessary."
    },
    {  
        question: "Which choice corrects the dangling modifier?\nWalking into the room, the sound of laughter filled the air.",
        options: [
            "A) Walking into the room, the sound of laughter filled the air.", 
            "B) Walking into the room, I heard the sound of laughter fill the air.", 
            "C) The sound of laughter filled the air as I walked into the room.", 
            "D) No change"
        ],
        answer: "B) Walking into the room, I heard the sound of laughter fill the air."
    },
    {  
        question: "Which option fixes the faulty parallelism?\nThe project requires creativity, problem-solving, and to have strong communication skills.",
        options: [
            "A) The project requires creativity, problem-solving, and to have strong communication skills.", 
            "B) The project requires being creative, solving problems, and strong communication skills.", 
            "C) The project requires creativity, problem-solving, and strong communication skills.", 
            "D) No change"
        ],
        answer: "C) The project requires creativity, problem-solving, and strong communication skills."
    },

    // Reading Questions – All answers feel correct 😈
    {  
        question: "Passage: Advances in artificial intelligence (AI) are transforming industries, from healthcare to finance. While AI-driven automation increases efficiency, concerns remain about job displacement and ethical decision-making in AI systems. Experts emphasize the need for regulations to balance technological benefits with social responsibility.\n\nWhat is the primary purpose of the passage?",
        options: [
            "A) To explain how AI increases efficiency while presenting certain risks.", 
            "B) To argue that AI automation should be strictly regulated.", 
            "C) To highlight the ethical and economic effects of AI advancements.", 
            "D) To discuss the impact of AI on both job markets and ethical concerns."
        ],
        answer: "C) To highlight the ethical and economic effects of AI advancements."
    },
    {  
        question: "Passage: In the late 1800s, Nikola Tesla and Thomas Edison engaged in a fierce rivalry over electrical power systems. Tesla promoted alternating current (AC), arguing that it was more efficient for long-distance transmission, while Edison defended direct current (DC), claiming it was safer. Ultimately, AC gained widespread adoption, shaping the future of electricity distribution.\n\nWhich choice best captures the passage’s central idea?",
        options: [
            "A) Tesla and Edison’s rivalry was centered on the debate between AC and DC power.", 
            "B) AC was ultimately favored over DC due to its efficiency for long-distance use.", 
            "C) Edison’s promotion of DC power was based on safety concerns.", 
            "D) The competition between AC and DC power had a lasting impact on electricity distribution."
        ],
        answer: "D) The competition between AC and DC power had a lasting impact on electricity distribution."
    },
    {  
        question: "Passage: Studies indicate that regular physical exercise improves cognitive function. Researchers have found that aerobic exercise, in particular, enhances memory retention and problem-solving skills. Despite this, many individuals fail to meet recommended exercise guidelines, often citing time constraints.\n\nWhich choice best summarizes the passage’s argument?",
        options: [
            "A) Aerobic exercise enhances cognitive function, but many people do not engage in enough of it.", 
            "B) Exercise improves memory retention and problem-solving skills.", 
            "C) Time constraints prevent many individuals from benefiting from aerobic exercise.", 
            "D) Research suggests that aerobic exercise is crucial for mental sharpness."
        ],
        answer: "A) Aerobic exercise enhances cognitive function, but many people do not engage in enough of it."
    },

    // Math Questions – Multi-step and tricky answers 😈
    {  
        question: "Solve for x: 3(2x - 4) = 5x + 8.",
        options: ["A) 8", "B) 10", "C) 12", "D) 14"],
        answer: "B) 10"
    },
    {  
        question: "A right triangle has legs of length 9 and 12. What is its hypotenuse?",
        options: ["A) 14", "B) 15", "C) 16", "D) 18"],
        answer: "B) 15"
    },
    {  
        question: "If g(x) = x² - 5x + 6, what is g(4)?",
        options: ["A) 2", "B) 4", "C) 6", "D) 8"],
        answer: "A) 2"
    }
],
51:[  
    // Writing Questions
    {  
        question: "Which revision best maintains conciseness while preserving meaning?\nThe scientist, who was widely respected for her groundbreaking research, made an important and significant discovery that changed the field forever.",
        options: [
            "A) The widely respected scientist made a significant discovery that changed the field.",
            "B) The scientist was widely respected and made an important discovery that changed the field forever.",
            "C) The groundbreaking scientist made an important and significant discovery that had lasting effects on the field.",
            "D) The scientist, widely respected, made a groundbreaking discovery that changed the field forever."
        ],
        answer: "A) The widely respected scientist made a significant discovery that changed the field."
    },
    {  
        question: "Which option correctly eliminates redundancy while keeping the meaning?\nThe committee members collaborated together to reach a mutual agreement that satisfied everyone.",
        options: [
            "A) The committee members collaborated to reach a mutual agreement.",
            "B) The members of the committee worked together to reach an agreement that satisfied everyone.",
            "C) The committee collaborated and came to an agreement that satisfied all.",
            "D) The committee members worked in conjunction to reach an agreement."
        ],
        answer: "A) The committee members collaborated to reach a mutual agreement."
    },
    {  
        question: "Which revision best improves clarity and parallel structure?\nThe new policy required employees to submit reports promptly, following guidelines precisely, and they must attend all weekly meetings.",
        options: [
            "A) The new policy required employees to submit reports promptly, to follow guidelines precisely, and to attend all weekly meetings.",
            "B) The new policy required employees to submit reports promptly, following guidelines precisely, and attending all weekly meetings.",
            "C) The new policy required employees to be prompt in submitting reports, precise in following guidelines, and they must attend all weekly meetings.",
            "D) The new policy required employees to submit reports promptly, to follow guidelines precisely, and they must attend all weekly meetings."
        ],
        answer: "A) The new policy required employees to submit reports promptly, to follow guidelines precisely, and to attend all weekly meetings."
    },

    // Reading Questions
    {  
        question: "Passage: The early 20th century saw a dramatic shift in industrial labor. While mechanization increased efficiency, it also led to growing concerns about worker rights and conditions. Many companies resisted change, arguing that increased wages and safer environments would threaten profits. However, a growing labor movement, supported by economic studies showing that fair wages increased productivity, challenged this notion.\n\nWhich choice best states the main idea of the passage?",
        options: [
            "A) Mechanization in the 20th century led to economic prosperity for workers.",
            "B) The rise of industrial labor movements was primarily driven by worker dissatisfaction.",
            "C) Companies resisted improving worker conditions, but economic research supported fair wages.",
            "D) Economic studies played a small role in advocating for fair labor policies."
        ],
        answer: "C) Companies resisted improving worker conditions, but economic research supported fair wages."
    },
    {  
        question: "Passage: In his groundbreaking work on genetics, Gregor Mendel identified dominant and recessive traits, yet his research was largely ignored until the early 20th century. His meticulous experiments on pea plants laid the foundation for modern genetics. However, misconceptions persisted, as some scientists misinterpreted his findings to suggest that single genes entirely determined complex traits.\n\nWhat is the author’s perspective on Mendel’s research?",
        options: [
            "A) Mendel’s work was fundamental but initially overlooked and sometimes misunderstood.",
            "B) Mendel’s research was flawed because it failed to account for genetic complexity.",
            "C) Mendel’s experiments were controversial but gained immediate recognition.",
            "D) Mendel’s findings were irrelevant until the discovery of DNA."
        ],
        answer: "A) Mendel’s work was fundamental but initially overlooked and sometimes misunderstood."
    },
    {  
        question: "Passage: Urban infrastructure has evolved significantly over the last century, incorporating technological advances to optimize efficiency. However, not all innovations have been universally beneficial. The widespread implementation of automated traffic systems, for instance, has led to reduced accidents but also to increased congestion in some metropolitan areas.\n\nWhich statement is best supported by the passage?",
        options: [
            "A) All technological advancements in urban planning have been beneficial.",
            "B) Automated traffic systems have only had positive effects on cities.",
            "C) Some urban innovations improve safety but create new challenges.",
            "D) Traffic congestion has significantly decreased due to automation."
        ],
        answer: "C) Some urban innovations improve safety but create new challenges."
    },

    // Math Questions
    {  
        question: "If f(x) = 2x² - 3x + 4, what is f(-2)?",
        options: [
            "A) 6", 
            "B) 10", 
            "C) 14", 
            "D) 16"
        ],
        answer: "C) 14"
    },
    {  
        question: "A right triangle has legs of lengths 7 and 24. What is the length of the hypotenuse?",
        options: [
            "A) 25", 
            "B) 26", 
            "C) 24√2", 
            "D) 24.5"
        ],
        answer: "A) 25"
    },
    {  
        question: "If (x - 4)(x + 3) = 0, what is the sum of all possible values of x?",
        options: [
            "A) -1", 
            "B) -7", 
            "C) 1", 
            "D) 4"
        ],
        answer: "A) -1"
    }
],
52:[  
    // Writing Questions
    {  
        question: "Which revision best eliminates wordiness while preserving meaning?\nThe book that she wrote in the span of only six months became an instant bestseller and was very widely praised by many critics.",
        options: [
            "A) The book she wrote in six months became a bestseller and received widespread praise.",  
            "B) The book, written in just six months, was an instant bestseller and praised by critics.",  
            "C) The book, completed in a short six-month period, became a bestseller and received great acclaim.",  
            "D) The book she authored in six months was widely praised and became an instant success."  
        ],
        answer: "A) The book she wrote in six months became a bestseller and received widespread praise."
    },
    {  
        question: "Which option best corrects the pronoun agreement error?\nEvery employee should complete their timesheet before leaving for the day.",
        options: [
            "A) Every employee should complete his or her timesheet before leaving for the day.",  
            "B) Every employee should complete their timesheets before they leave for the day.",  
            "C) All employees should complete their timesheets before leaving for the day.",  
            "D) Every employee should complete its timesheet before leaving for the day."  
        ],
        answer: "A) Every employee should complete his or her timesheet before leaving for the day."
    },
    {  
        question: "Which sentence correctly maintains parallel structure?\nThe project manager was responsible for organizing meetings, keeping track of budgets, and to ensure deadlines were met.",
        options: [
            "A) The project manager was responsible for organizing meetings, tracking budgets, and ensuring deadlines were met.",  
            "B) The project manager was responsible for organizing meetings, keeping track of budgets, and ensuring deadlines were met.",  
            "C) The project manager was responsible for the organizing of meetings, tracking budgets, and to ensure deadlines were met.",  
            "D) The project manager had the responsibility of organizing meetings, tracking budgets, and deadlines must be met."  
        ],
        answer: "B) The project manager was responsible for organizing meetings, keeping track of budgets, and ensuring deadlines were met."
    },

    // Reading Questions
    {  
        question: "Passage: The rapid expansion of artificial intelligence has led to widespread debate. While AI has streamlined processes in industries ranging from healthcare to finance, concerns remain regarding job displacement and ethical implications. Some experts argue that AI should be strictly regulated to prevent unintended consequences, while others maintain that excessive oversight may hinder progress.\n\nWhich choice best captures the central argument of the passage?",
        options: [
            "A) AI has greatly benefited industries but also raises concerns about job security and ethics.",  
            "B) The development of AI is largely positive, but opponents overstate their concerns.",  
            "C) While AI presents challenges, the benefits outweigh the potential drawbacks.",  
            "D) AI regulation is necessary to prevent widespread harm, but it must be balanced with innovation."  
        ],
        answer: "A) AI has greatly benefited industries but also raises concerns about job security and ethics."
    },
    {  
        question: "Passage: In the late 1800s, Nikola Tesla and Thomas Edison were at the forefront of the battle over electrical power. Edison, advocating for direct current (DC), saw Tesla’s alternating current (AC) as a dangerous alternative. Tesla’s innovations, however, proved to be more practical for large-scale electricity distribution, leading to AC becoming the standard.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Tesla and Edison both contributed to electricity, but AC ultimately became the preferred system.",  
            "B) Tesla’s AC system won over Edison’s DC because it was safer and more effective.",  
            "C) Edison opposed Tesla’s AC system, but Tesla's ideas were superior in large-scale energy distribution.",  
            "D) The debate between AC and DC led to long-term benefits for modern electrical engineering."  
        ],
        answer: "A) Tesla and Edison both contributed to electricity, but AC ultimately became the preferred system."
    },
    {  
        question: "Passage: Over the years, studies have shown a strong link between physical activity and mental well-being. Regular exercise has been associated with reduced stress, improved cognitive function, and a lower risk of depression. However, some researchers caution that excessive exercise, particularly in athletes, can sometimes contribute to anxiety and burnout.\n\nWhich conclusion is best supported by the passage?",
        options: [
            "A) Exercise is universally beneficial for mental health with no drawbacks.",  
            "B) Regular exercise generally improves mental well-being but can have risks if excessive.",  
            "C) Athletes are at risk of mental health issues due to exercise.",  
            "D) Exercise is linked to mental health benefits, but its effects are largely overstated."  
        ],
        answer: "B) Regular exercise generally improves mental well-being but can have risks if excessive."
    },

    // Math Questions
    {  
        question: "If 3x² - 5x - 2 = 0, what is the sum of the solutions for x?",
        options: [
            "A) -5/3",  
            "B) 5/3",  
            "C) 5",  
            "D) -5"  
        ],
        answer: "C) 5"
    },
    {  
        question: "A rectangle has a length of (2x + 3) and a width of (x - 2). If the area of the rectangle is 35, what is the value of x?",
        options: [
            "A) 5",  
            "B) 7",  
            "C) 4",  
            "D) 6"  
        ],
        answer: "A) 5"
    },
    {  
        question: "The function g(x) = x² - 4x + 7 is given. What is g(3)?",
        options: [
            "A) 4",  
            "B) 6",  
            "C) 7",  
            "D) 8"  
        ],
        answer: "D) 8"
    }
],
53:[  
    // Writing Questions
    {  
        question: "Which revision most effectively improves the conciseness of the sentence without changing its meaning?\nThe scientist, who was well-known for her research in genetic modification and had received multiple prestigious awards, continued her work on the revolutionary project.",
        options: [
            "A) The well-known scientist, awarded multiple times for genetic research, continued her revolutionary work.",  
            "B) The scientist, a celebrated genetic researcher with many awards, continued her revolutionary project.",  
            "C) The scientist, widely recognized for her genetic research, continued her groundbreaking work.",  
            "D) The scientist, known for genetic research and awards, kept working on her project."  
        ],
        answer: "C) The scientist, widely recognized for her genetic research, continued her groundbreaking work."
    },
    {  
        question: "Which sentence best corrects the misplaced modifier?\nExhausted from the long journey, the mountain’s peak seemed impossible to reach for the hikers.",
        options: [
            "A) Exhausted from the long journey, the hikers found the mountain’s peak impossible to reach.",  
            "B) The hikers, exhausted from the long journey, seemed to find the mountain’s peak impossible to reach.",  
            "C) The mountain’s peak seemed impossible to reach for the exhausted hikers after the long journey.",  
            "D) The hikers found the mountain’s peak impossible to reach because they were exhausted from the journey."  
        ],
        answer: "A) Exhausted from the long journey, the hikers found the mountain’s peak impossible to reach."
    },
    {  
        question: "Which option correctly maintains parallel structure?\nThe athlete was praised for his discipline, endurance, and how he strategized his matches.",
        options: [
            "A) The athlete was praised for his discipline, endurance, and strategic thinking during matches.",  
            "B) The athlete was praised for his discipline, endurance, and for how he strategized his matches.",  
            "C) The athlete was praised for his discipline, his endurance, and his ability to strategize in matches.",  
            "D) The athlete was praised for discipline, endurance, and his match strategies."  
        ],
        answer: "A) The athlete was praised for his discipline, endurance, and strategic thinking during matches."
    },

    // Reading Questions
    {  
        question: "Passage: In recent years, research into deep-sea ecosystems has uncovered a wealth of previously unknown species. Many of these creatures have evolved unique adaptations to survive in conditions of extreme pressure, limited light, and scarce food. Scientists argue that these discoveries not only expand our understanding of marine biodiversity but may also provide insights into life on other planets.\n\nWhat is the primary purpose of the passage?",
        options: [
            "A) To highlight recent discoveries in deep-sea ecosystems and their broader implications.",  
            "B) To argue that deep-sea research should be prioritized over space exploration.",  
            "C) To describe the physical adaptations of deep-sea creatures in extreme environments.",  
            "D) To challenge existing assumptions about where life can exist."  
        ],
        answer: "A) To highlight recent discoveries in deep-sea ecosystems and their broader implications."
    },
    {  
        question: "Passage: The advent of digital photography revolutionized the way images are captured, stored, and shared. Unlike film photography, which requires chemical processing and physical storage, digital images can be edited, duplicated, and transmitted instantly. However, some photographers argue that film still holds artistic and archival advantages over its digital counterpart.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Digital photography has largely replaced film, but film remains valued for artistic and archival reasons.",  
            "B) The rise of digital photography has made film obsolete in most situations.",  
            "C) While digital photography is convenient, its artistic value is debated among professionals.",  
            "D) The transition from film to digital photography has led to an irreversible shift in the industry."  
        ],
        answer: "A) Digital photography has largely replaced film, but film remains valued for artistic and archival reasons."
    },
    {  
        question: "Passage: Renewable energy sources such as wind and solar power have gained traction as viable alternatives to fossil fuels. However, critics point out that these energy sources are highly dependent on environmental conditions, which can lead to supply inconsistencies. As a result, researchers continue to explore battery storage technologies and grid improvements to address these challenges.\n\nWhich assumption is implicit in the passage?",
        options: [
            "A) Renewable energy sources alone cannot fully replace fossil fuels.",  
            "B) Battery storage solutions will eventually make renewable energy as reliable as fossil fuels.",  
            "C) Governments should invest more in renewable energy to counteract supply inconsistencies.",  
            "D) The adoption of renewable energy is largely driven by environmental concerns rather than practicality."  
        ],
        answer: "A) Renewable energy sources alone cannot fully replace fossil fuels."
    },

    // Math Questions
    {  
        question: "If 2x² - 7x + 3 = 0, what is the product of the solutions?",
        options: [
            "A) 3/2",  
            "B) -3/2",  
            "C) 3",  
            "D) -3"  
        ],
        answer: "C) 3"
    },
    {  
        question: "The length of a rectangle is 3 more than twice its width. If the area of the rectangle is 54, what is its width?",
        options: [
            "A) 3",  
            "B) 4",  
            "C) 6",  
            "D) 9"  
        ],
        answer: "B) 4"
    },
    {  
        question: "The function f(x) = 2x² - 3x + 1 is given. What is f(4)?",
        options: [
            "A) 19",  
            "B) 21",  
            "C) 23",  
            "D) 25"  
        ],
        answer: "A) 19"
    }
],
54:[  
    // Writing Questions
    {  
        question: "Which choice most effectively improves the clarity and conciseness of the sentence without altering its meaning?\nThe new policy, which was implemented in order to increase efficiency and to reduce unnecessary delays, was met with mixed reactions.",
        options: [
            "A) The new policy, implemented to increase efficiency and reduce delays, was met with mixed reactions.",  
            "B) The policy, which increased efficiency and reduced unnecessary delays, received mixed reactions.",  
            "C) In order to increase efficiency and reduce unnecessary delays, the new policy was implemented and met with mixed reactions.",  
            "D) The policy was met with mixed reactions due to its purpose of increasing efficiency and reducing unnecessary delays."  
        ],
        answer: "A) The new policy, implemented to increase efficiency and reduce delays, was met with mixed reactions."
    },
    {  
        question: "Which revision corrects the ambiguity in the sentence?\nAfter reviewing the reports, the manager told the employees they needed improvement.",
        options: [
            "A) After reviewing the reports, the manager told the employees that their performance needed improvement.",  
            "B) The manager told the employees, after reviewing the reports, they needed to improve.",  
            "C) The manager reviewed the reports and told the employees that improvement was needed.",  
            "D) The reports were reviewed by the manager, who then told the employees improvement was necessary."  
        ],
        answer: "A) After reviewing the reports, the manager told the employees that their performance needed improvement."
    },
    {  
        question: "Which option maintains the intended meaning and corrects the misplaced modifier?\nStruggling to stay awake, the professor’s lecture seemed unending to the students.",
        options: [
            "A) The professor’s lecture seemed unending to the students, who were struggling to stay awake.",  
            "B) Struggling to stay awake, the students found the professor’s lecture unending.",  
            "C) The students, struggling to stay awake, thought the professor’s lecture was unending.",  
            "D) The professor’s lecture, which seemed unending, made the students struggle to stay awake."  
        ],
        answer: "B) Struggling to stay awake, the students found the professor’s lecture unending."
    },

    // Reading Questions
    {  
        question: "Passage: In the late 1800s, Nikola Tesla experimented with wireless electricity transmission, envisioning a future where energy could be distributed globally without wires. Although his work laid the groundwork for modern wireless technology, his vision was never fully realized due to financial and technological limitations at the time.\n\nWhich choice best summarizes the passage?",
        options: [
            "A) Tesla's wireless electricity research influenced modern technology but faced financial and technical barriers.",  
            "B) Tesla successfully developed wireless electricity but was unable to implement it globally.",  
            "C) Tesla's work on wireless electricity was ahead of its time, and modern researchers continue his experiments today.",  
            "D) Tesla's discoveries in wireless transmission remain largely theoretical and unproven."  
        ],
        answer: "A) Tesla's wireless electricity research influenced modern technology but faced financial and technical barriers."
    },
    {  
        question: "Passage: The rapid expansion of urban areas has led to increased concerns about air quality. Studies have shown that cities with high levels of green spaces experience lower pollution levels and improved public health outcomes. However, implementing widespread green initiatives remains challenging due to space constraints and funding limitations.\n\nWhich statement is most strongly supported by the passage?",
        options: [
            "A) Increasing green spaces can improve air quality and public health.",  
            "B) Cities with fewer green spaces experience greater levels of pollution and disease.",  
            "C) Funding limitations prevent all cities from developing effective environmental solutions.",  
            "D) Urban air quality is primarily affected by factors other than green spaces."  
        ],
        answer: "A) Increasing green spaces can improve air quality and public health."
    },
    {  
        question: "Passage: Over the years, advancements in artificial intelligence have reshaped the workforce. Automation has replaced many routine tasks, raising concerns about job displacement. However, experts argue that while some jobs are eliminated, AI also creates new opportunities in emerging fields that require specialized skills.\n\nWhich assumption is implicit in the passage?",
        options: [
            "A) AI does not entirely replace human workers but shifts the demand for labor.",  
            "B) AI-driven automation is more beneficial than harmful to the workforce.",  
            "C) Job displacement due to AI is inevitable and cannot be mitigated.",  
            "D) Only high-tech industries will see job growth due to AI advancements."  
        ],
        answer: "A) AI does not entirely replace human workers but shifts the demand for labor."
    },

    // Math Questions
    {  
        question: "If x and y are real numbers such that x² + y² = 25 and xy = 12, what is the value of (x + y)²?",
        options: [
            "A) 49",  
            "B) 37",  
            "C) 31",  
            "D) 29"  
        ],
        answer: "B) 37"
    },
    {  
        question: "A circle is inscribed inside a square with side length 8. What is the ratio of the area of the circle to the area of the square? (Use π = 3.14)",
        options: [
            "A) 0.50",  
            "B) 0.62",  
            "C) 0.79",  
            "D) 0.85"  
        ],
        answer: "C) 0.79"
    },
    {  
        question: "The function f(x) = ax² + bx + c has a vertex at (3, -4). If a = 2, what is the value of b?",
        options: [
            "A) -12",  
            "B) -6",  
            "C) 6",  
            "D) 12"  
        ],
        answer: "B) -12"
    }
],
55:[  
    // Writing Questions  
    {  
        question: "Which revision best improves the sentence’s conciseness while preserving its meaning?\n\nThe committee, which was composed of several members, met in order to discuss the budget proposal that had been drafted by the finance team.",
        options: [
            "A) The committee, composed of several members, met to discuss the finance team’s budget proposal.",
            "B) The committee, which had several members, met for the purpose of discussing the budget proposal drafted by finance.",
            "C) The committee, with its various members, convened to have discussions regarding the budget proposal that the finance team had created.",
            "D) No change"
        ],
        answer: "A) The committee, composed of several members, met to discuss the finance team’s budget proposal."
    },
    {  
        question: "Which sentence corrects the misplaced modifier?\n\nWalking down the street, the bakery’s aroma was irresistible to Julia.",
        options: [
            "A) Walking down the street, Julia found the bakery’s aroma irresistible.",
            "B) Julia, while walking down the street, was irresistibly drawn to the bakery’s aroma.",
            "C) Walking down the street, the aroma of the bakery was irresistible to Julia.",
            "D) No change"
        ],
        answer: "A) Walking down the street, Julia found the bakery’s aroma irresistible."
    },
    {  
        question: "Which revision best maintains parallel structure?\n\nThe professor emphasized that students should take thorough notes, review the material regularly, and they needed to participate in class discussions.",
        options: [
            "A) take thorough notes, review the material regularly, and participate in class discussions.",
            "B) take thorough notes, reviewing the material regularly, and that participation in class discussions was necessary.",
            "C) taking thorough notes, reviewing the material regularly, and that class discussions were needed.",
            "D) No change"
        ],
        answer: "A) take thorough notes, review the material regularly, and participate in class discussions."
    },

    // Reading Questions  
    {  
        question: "Passage: The economic impact of automation has been a topic of debate among economists for decades. Some argue that technological advancements lead to job displacement, while others suggest they create new opportunities by fostering industries that never previously existed. However, historical data suggests that economies tend to adjust, though not without transitional difficulties.\n\nWhich choice best summarizes the central claim of the passage?",
        options: [
            "A) Automation inevitably leads to job displacement and long-term economic decline.",
            "B) Although automation disrupts industries, economies tend to adapt over time.",
            "C) Technological advancements in automation have only positive effects on job growth.",
            "D) Economic adjustments to automation occur instantly without disruption."
        ],
        answer: "B) Although automation disrupts industries, economies tend to adapt over time."
    },
    {  
        question: "Passage: A recent study on marine ecosystems has revealed that coral reefs are declining at an alarming rate due to rising ocean temperatures and acidification. Scientists warn that without intervention, marine biodiversity will suffer irreparable damage. Some experts advocate for artificial reef structures, while others stress the importance of reducing carbon emissions to mitigate further damage.\n\nWhich choice best describes the purpose of the passage?",
        options: [
            "A) To highlight the potential solutions to coral reef degradation.",
            "B) To emphasize the role of marine biodiversity in ecosystem stability.",
            "C) To argue that reducing carbon emissions is the only viable way to save coral reefs.",
            "D) To provide an overview of the challenges facing coral reefs and possible interventions."
        ],
        answer: "D) To provide an overview of the challenges facing coral reefs and possible interventions."
    },
    {  
        question: "Passage: In the late 19th century, as industrialization swept across Europe, many laborers found themselves working long hours under hazardous conditions. This gave rise to the labor movement, which sought fair wages, reasonable hours, and improved workplace safety. While early strikes were often met with resistance, they eventually led to legislative reforms that benefited workers.\n\nWhich inference is best supported by the passage?",
        options: [
            "A) Industrialization directly led to improved working conditions for laborers.",
            "B) The labor movement’s initial efforts were largely unsuccessful.",
            "C) Workplace safety was prioritized over fair wages in early reforms.",
            "D) Labor strikes played a crucial role in prompting workplace reforms."
        ],
        answer: "D) Labor strikes played a crucial role in prompting workplace reforms."
    },

    // Math Questions  
    {  
        question: "If 3x + 5 = 2(x + 6), what is the value of x?",
        options: ["A) -7", "B) -5", "C) 1", "D) 7"],
        answer: "C) 1"
    },
    {  
        question: "A right triangle has legs of length 7 and 24. What is the length of the hypotenuse?",
        options: ["A) 23", "B) 25", "C) 26", "D) 29"],
        answer: "B) 25"
    },
    {  
        question: "If f(x) = 2x² - 3x + 4, what is f(5)?",
        options: ["A) 39", "B) 41", "C) 43", "D) 47"],
        answer: "B) 41"
    }
]

};

// Get the current level from localStorage (default to 1 if not set)
const currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;
const questions = questionsData[currentLevel]; 

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

let quizTimeout; // Declare globally


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    clearInterval(refreshIntervalId); // ✅ Clear any existing timer
    clearTimeout(quizTimeout); // ✅ Prevent multiple quiz timeouts

    time = startingMinutes * 60; // ✅ Reset timer
    refreshIntervalId = setInterval(updateCountdown, 1000); // ✅ Restart countdown

    // ✅ Ensure questions exist before calling showQuestion
    if (!questions || questions.length === 0) {
        console.error("No questions found for this level!");
        return;
    }

    showQuestion(); // ✅ Show first question after restart
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (option === currentQuestion.answer) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });

    updateProgressBar(); // Update progress bar
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disable all buttons without highlighting the correct one
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState(); // ✅ Clears the previous question before adding buttons

    let percentageScore = Math.round((score / questions.length) * 100); 
    localStorage.setItem(`level${currentLevel}Score`, percentageScore);

    if (percentageScore >= 75) {
        questionElement.innerHTML = `🎉 Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>✅ Great job! You can move on to the next section.`;
        localStorage.setItem(`level${currentLevel + 1}Unlocked`, "true");
        
    } else {
        questionElement.innerHTML = `❌ Score: ${score} out of ${questions.length} (${percentageScore}%)!<br>⚠️ You need at least 75% to move on.<br>Would you like to try again or continue anyway?`;
    }

    // ✅ Create "Try Again" Button
    const tryAgainButton = document.createElement("button");
    tryAgainButton.innerHTML = "Try Again";
    tryAgainButton.classList.add("btn");
    tryAgainButton.onclick = () => startQuiz();

    // ✅ Create "Continue Anyway" Button
    const continueButton = document.createElement("button");
    continueButton.innerHTML = "Continue";
    continueButton.classList.add("btn");
    continueButton.onclick = () => location.href = "https://www.brainjelli.com/sat-rank-up-landing.html";

    // ✅ Append buttons AFTER clearing state
    answerButtons.appendChild(tryAgainButton);
    answerButtons.appendChild(continueButton);

    document.getElementById("progress-bar").style.width = "100%";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function ranklink() {
    location.href = "https://www.brainjelli.com/sat-rank-up-landing.html";
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        ranklink(); // Ensure this points to the correct URL
    }
});

startQuiz();