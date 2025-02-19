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