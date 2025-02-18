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
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
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