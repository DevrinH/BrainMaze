setTimeout(function() {

    showScore();
    
    }, 3840000);
    
    const startingMinutes = 64;
    const countdownEl = document.getElementById('countdown');
    
    let time = startingMinutes * 60 + 1; //minutes * 60 seconds
    let refreshIntervalId = setInterval(updateCountdown, 1000);
    
    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
    
        if (time === 0) { 
            clearInterval(refreshIntervalId);
            return; // Stop execution to prevent going negative
        }
    
        time--; 
    };
    
updateCountdown();



const questions = [
    {
        
        question: "The rapid advancement of artificial intelligence (AI) has led to significant changes in various industries. While some experts highlight the efficiency and innovation brought by AI, others express concerns about potential job displacement and ethical considerations.<br/><br/>Question: <br/>The author's attitude toward artificial intelligence can best be described as: ",
       
        answers: [
            { text: "Uncritically supportive", correct: false},
            { text: "Cautiously optimistic ", correct: true},
            { text: " Indifferent.", correct: false},
            { text: "Overwhelmingly negative", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "The small town had long been known for its quiet charm, but the recent construction of a major highway nearby brought unexpected changes. Local businesses saw an increase in customers, yet some longtime residents lamented the loss of the town’s peaceful atmosphere.<br/><br/>Question: <br/> Which choice best describes the impact of the highway on the town? ",
       
        answers: [
            { text: "It caused local businesses to struggle.", correct: false},
            { text: "It led to both benefits and drawbacks for the town.", correct: true},
            { text: " It was overwhelmingly positive for all residents.", correct: false},
            { text: "It had no significant effect on the town’s character.", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },   
    {
        question: "The ancient city of Alexandria was renowned for its vast library, which attracted scholars from across the world. This center of learning not only preserved countless manuscripts but also fostered significant advancements in science, philosophy, and literature.<br/><br/>Question:<br/>Based on the passage, the Library of Alexandria is best described as:",
        answers: [
            { text: "A commercial hub for international traders", correct: false},
            { text: "A military fortress protecting the city", correct: false},
            { text: " A cultural institution promoting knowledge", correct: true,},
            { text: "A political center for governmental affairs", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "In the early 20th century, astronomer Henrietta Leavitt made a groundbreaking discovery while studying Cepheid variable stars. By analyzing their brightness patterns, she identified a correlation between a star’s luminosity and its pulsation period. This relationship allowed astronomers to measure vast cosmic distances with far greater accuracy than before. Although Leavitt’s work was instrumental in shaping modern astronomy, she did not receive widespread recognition during her lifetime.<br/><br/>Question:<br/>Which of the following best expresses the significance of Leavitt’s discovery?",
        answers: [
            { text: "It led to the realization that the universe is constantly expanding. ", correct: false},
            { text: "It provided a method for determining the distance to celestial objects.", correct: true},
            { text: "It demonstrated that all stars have the same intrinsic brightness.", correct: false},
            { text: "It proved that stars change color as they age.", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "In her novel, the author portrays the protagonist as an individual torn between personal ambition and familial duty. As he stands before the threshold of opportunity, he hesitates, recalling the sacrifices his family has made for him. The imagery of a locked door and a distant horizon underscores his internal struggle—one between seizing his own future and honoring his past.<br/><br/>Question:<br/>What is the most reasonable inference about the protagonist?",
        answers: [
            { text: "He ultimately chooses ambition over family loyalty.", correct: false},
            { text: "He feels a sense of obligation that complicates his decision-making.", correct: true},
            { text: "He believes that success and family are entirely incompatible.", correct: false},
            { text: "He is indifferent to the sacrifices his family has made.", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "The rise of industrialization in the 19th century led to significant economic and social changes. While new manufacturing technologies improved efficiency and increased production, they also contributed to harsh working conditions. Factory laborers often worked long hours for minimal wages in hazardous environments, leading to widespread calls for labor reform. These challenges eventually spurred the development of labor unions, which sought to advocate for workers’ rights and fair treatment.<br/><br/>Question:<br/What was one major effect of 19th-century industrialization, as described in the passage?",
        answers: [
            { text: "It created a growing demand for labor unions to protect workers.", correct: true},
            { text: "It led to a decline in manufacturing efficiency.", correct: false},
            { text: "It eliminated economic disparities between factory workers and business owners.", correct: false},
            { text: "It resulted in a complete shift from agriculture to factory-based economies.", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "The recent study on urban green spaces revealed that access to parks and gardens significantly enhances residents' mental well-being. The researchers found that individuals living near these areas reported lower stress levels and improved mood compared to those without such access.<br/><br/>Question:<br/>According to the passage, what is the primary benefit of urban green spaces for residents?",
        answers: [
            { text: " Increased physical activity", correct: false},
            { text: "Enhanced mental well-being", correct: true},
            { text: "Improved air quality", correct: false},
            { text: "Greater social interaction", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "For decades, researchers have studied the migration patterns of monarch butterflies, which travel thousands of miles each year between North America and central Mexico. These delicate creatures rely on environmental cues, such as temperature and sunlight, to navigate their journey. However, recent changes in climate patterns have disrupted their migration, causing delays and shifts in their usual routes. Scientists warn that if these disruptions continue, monarch populations may decline significantly, threatening the stability of ecosystems that depend on them for pollination. <br/><br/>Question:<br/>Which statement best summarizes the central idea of the passage?",
        answers: [
            { text: "Monarch butterflies are resilient creatures that can easily adapt to changes in their migration patterns.", correct: false},
            { text: " Scientists have successfully found ways to prevent disruptions in monarch butterfly migration despite climate change.", correct: false},
            { text: "The migration of monarch butterflies is primarily determined by their physical strength rather than environmental factors.", correct: false},
            { text: "The annual migration of monarch butterflies is influenced by climate factors, which may pose a threat to their population", correct: true},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "Throughout history, innovations in transportation have reshaped human civilization. The invention of the steam engine in the 18th century led to the expansion of railroads, allowing goods and people to travel faster than ever before. In the 20th century, the development of automobiles and airplanes further revolutionized travel, shrinking distances and connecting societies in unprecedented ways. Today, advancements in electric and autonomous vehicles promise to transform transportation yet again, raising questions about efficiency, sustainability, and the future of mobility. <br/><br/>Question:<br/>Which choice best expresses the main idea of the passage?",
        answers: [
            { text: "Technological advancements in transportation have continuously shaped human society and will continue to do so.", correct: false},
            { text: "Railroads remain the most significant innovation in transportation history.", correct: false},
            { text: "The development of automobiles and airplanes has eliminated the need for future advancements in transportation.", correct: false},
            { text: "The primary goal of transportation innovations has always been to reduce travel costs rather than increase efficiency.", correct: true},
        ],
        section: "reading",
        difficulty:"easy"
    },

    {
        question: "The study of space has fascinated humans for centuries, leading to groundbreaking discoveries about the universe. In the mid-20th century, the space race between the United States and the Soviet Union led to rapid advancements in space exploration, culminating in the Apollo 11 moon landing. Today, private companies are playing a larger role in space travel, developing reusable rockets and planning future missions to Mars. While space exploration continues to push technological boundaries, some critics argue that resources should be directed toward pressing issues on Earth instead.<br/><br/>Question:<br/>Which choice best summarizes the central idea of the passage?",
        answers: [
            { text: "Space exploration has evolved from government-led initiatives to significant private sector involvement, sparking both enthusiasm and debate.", correct: true},
            { text: "The Apollo 11 moon landing remains the most important event in space exploration history, with little progress made since.", correct: false},
            { text: " The primary goal of space exploration has always been to establish human colonies on other planets.", correct: false},
            { text: "Governments no longer invest in space exploration due to the dominance of private companies.", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "The field of renewable energy has expanded significantly in recent decades, driven by concerns over climate change and the depletion of fossil fuel resources. Solar and wind power have become more efficient and affordable, leading to widespread adoption in many countries. However, some critics argue that these energy sources are not yet reliable enough to fully replace traditional power grids. As technology improves, researchers continue to explore ways to store renewable energy more effectively and integrate it into existing infrastructure<br/><br/>Question:<br/>Which choice best expresses the main idea of the passage?",
        answers: [
            { text: "Renewable energy has made progress but still faces challenges in becoming a complete replacement for traditional energy sources.", correct: true},
            { text: "The world will soon abandon fossil fuels entirely in favor of renewable energy.", correct: false},
            { text: "Solar and wind power are too unreliable to ever be used on a large scale.", correct: false},
            { text: "Governments have stopped investing in fossil fuels and now focus entirely on renewable energy.", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "Throughout history, technological advancements have often sparked debates about their long-term consequences. The invention of the printing press in the 15th century led to an explosion of knowledge, yet some feared it would diminish the value of oral storytelling. Similarly, the rise of the internet has revolutionized access to information, but critics argue that it has also contributed to shorter attention spans and the spread of misinformation. While new technologies inevitably transform society, their ultimate impact depends on how they are used and regulated.<br/><br/>Question:<br/>Which choice best reflects the passage’s perspective on technological advancements?",
        answers: [
            { text: "Technological advancements bring both progress and challenges, and their effects depend on how they are managed.", correct: true},
            { text: "New technologies ultimately cause more harm than good by disrupting traditional ways of learning and communication.", correct: false},
            { text: "Societies should resist technological changes to preserve the value of traditional knowledge-sharing methods.", correct: false},
            { text: "The internet has solved all information-related problems, just as the printing press did in its time.", correct: false},
        ],
        section: "reading",
        difficulty:"easy"
    },
    {
        question: "Researchers studying human memory have long debated the accuracy of recollections. Some scientists argue that memory functions like a recording device, capturing events as they occur. Others, however, contend that memory is reconstructive—meaning that each time a person recalls an event, details may be altered, omitted, or even fabricated. Studies have shown that external suggestions, emotions, and expectations can subtly influence recollections, leading to discrepancies between what actually occurred and what is remembered.<br/><br/>Question:<br/>Which statement best summarizes the central claim of the passage?",
        answers: [
            { text: "Memory is an unreliable system that distorts all recollections. ", correct: false},
            { text: "Recollections are influenced by various factors and are not always exact replicas of past events", correct: true},
            { text: "The accuracy of memory improves when individuals consciously attempt to recall details.", correct: false},
            { text: "Memory functions as an objective record of past experiences, though minor changes may occur.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "As the clock struck midnight, Eleanor found herself staring at the unopened letter on her desk. Its presence loomed in her thoughts, an invisible force pressing against her resolve. She had waited weeks for this response, yet now that it was before her, she hesitated. What if it contained a rejection? What if it changed everything? The uncertainty was unbearable, yet the idea of knowing—of confronting the truth—was somehow more terrifying.<br/><br/>Question:<br/>What can be inferred about Eleanor’s emotional state?",
        answers: [
            { text: "She is reluctant to open the letter because she fears an unfavorable outcome.", correct: true},
            { text: "She is confident that the letter will bring good news, but she enjoys the anticipation.", correct: false},
            { text: "She is indifferent to the letter’s contents and does not believe it will affect her.", correct: false},
            { text: "She is frustrated because she has waited too long for the letter to arrive.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "The rapid expansion of railroads in the 19th century transformed both commerce and society. Businesses gained access to new markets, enabling goods to be transported across vast distances at unprecedented speeds. However, this growth was not without consequences. Small, local producers found themselves unable to compete with larger companies that could transport goods cheaply and efficiently. At the same time, some railroad companies exploited their power, charging excessive fees to farmers and merchants who relied on their services. These challenges eventually led to public outcry and demands for government regulation.<br/><br/>Question:<br/>What was one major consequence of 19th-century railroad expansion, as described in the passage?",
        answers: [
            { text: "It eliminated competition among businesses by allowing all producers to thrive equally.", correct: false},
            { text: "It provided benefits for large companies but created challenges for smaller producers.", correct: true},
            { text: "It prevented monopolies by ensuring fair pricing for farmers and merchants.", correct: false},
            { text: " It resulted in immediate and widespread government regulations to protect consumers.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "The relationship between economic growth and environmental sustainability has long been a subject of debate. Historically, industrial expansion has been associated with rising carbon emissions and depletion of natural resources. However, recent innovations in renewable energy, sustainable agriculture, and eco-friendly manufacturing suggest that economic progress does not have to come at the expense of the environment. Some experts argue that with the right policies and technological advancements, nations can achieve both economic prosperity and environmental responsibility. Others caution that meaningful change requires significant sacrifices and a fundamental shift in consumption patterns.<br/><br/>Question:<br/>Which choice best captures the passage’s main argument?",
        answers: [
            { text: "Economic growth and environmental sustainability can coexist, but achieving this balance requires technological and policy changes.", correct: true},
            { text: "Industrial expansion is fundamentally incompatible with environmental sustainability, making economic growth unsustainable.", correct: false},
            { text: "Environmental concerns are secondary to economic progress, and technological innovation will naturally solve any ecological issues.", correct: false},
            { text: " Nations must abandon economic growth entirely if they wish to achieve true environmental sustainability.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "Historians have long debated the causes of the decline of ancient civilizations. While some attribute societal collapses to external factors such as invasions or natural disasters, others emphasize internal weaknesses like political corruption or economic instability. Recent research suggests that the fall of complex societies is rarely the result of a single event; rather, it is often a combination of interwoven factors. In many cases, environmental changes, resource depletion, and social unrest contribute to a gradual decline rather than an abrupt collapse. This perspective challenges the traditional notion that civilizations fall due to a single catastrophic event, instead portraying decline as a multifaceted process.<br/><br/>Question:<br/>Which choice best expresses the central claim of the passage",
        answers: [
            { text: "Civilizations that experience political corruption are always doomed to collapse.", correct: false},
            { text: "The decline of civilizations is typically caused by multiple interconnected factors rather than a single event", correct: true},
            { text: " Environmental changes have played a minimal role in the fall of ancient societies.", correct: false},
            { text: " The fall of civilizations is largely unpredictable and cannot be analyzed through historical patterns.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "The study of human decision-making has fascinated psychologists and economists alike. While traditional economic theories suggest that individuals make rational choices based on logic and self-interest, behavioral research has revealed that cognitive biases often lead to irrational decisions. Factors such as social pressure, emotional responses, and mental shortcuts influence choices in ways that defy purely logical reasoning. This growing body of research challenges long-held assumptions and suggests that understanding human behavior requires looking beyond simple economic models to consider the complexities of psychology.<br/><br/>Question:<br/>Which choice best expresses the main claim of the passage?",
        answers: [
            { text: "Economic models that assume purely rational decision-making are always accurate in predicting human behavior", correct: false},
            { text: "Social pressure and emotional responses play little to no role in the way people make decisions.", correct: false},
            { text: " Human decision-making is influenced by cognitive biases, challenging traditional economic theories of rational choice.", correct: true},
            { text: " Psychologists and economists generally agree that all human decisions are completely random and unpredictable.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "The relationship between scientific innovation and ethical responsibility has long been a subject of debate. Throughout history, advancements such as nuclear energy, genetic modification, and artificial intelligence have demonstrated both immense potential and significant risks. While some argue that technological progress should be pursued without restriction in the name of discovery, others contend that scientific breakthroughs must be carefully regulated to prevent unforeseen consequences. Ultimately, the challenge lies in striking a balance between fostering innovation and ensuring that ethical considerations are not overlooked.<br/><br/>Question:<br/>Which choice best characterizes the passage’s central argument?",
        answers: [
            { text: " Scientific progress should always be prioritized over ethical concerns, as restrictions hinder innovation.", correct: false},
            { text: "History has shown that scientific advancements are more dangerous than beneficial to society.", correct: false},
            { text: " The pursuit of scientific advancement must be balanced with ethical responsibility to minimize risks.", correct: true},
            { text: " The pursuit of scientific advancement must be balanced with ethical responsibility to minimize risks.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "Economic inequality has been a persistent issue in societies throughout history, with scholars debating its causes and consequences. Some argue that disparities in wealth are a natural result of market competition, where individuals who take greater risks or possess unique skills achieve financial success. Others contend that systemic factors—such as unequal access to education, historical injustices, and government policies—play a more significant role in determining economic outcomes. While certain levels of inequality may incentivize productivity and innovation, excessive disparities can lead to social unrest and hinder economic growth. Addressing this issue requires a nuanced approach that considers both individual effort and structural limitations.<br/><br/>Question:<br/>Which choice best describes the central claim of the passage?",
        answers: [
            { text: " Economic inequality is an unavoidable consequence of market competition and should not be considered a societal problem.", correct: false},
            { text: "Systemic factors, rather than individual effort, are solely responsible for economic inequality.", correct: false},
            { text: "  A combination of individual choices and systemic influences contributes to economic inequality, making the issue complex.", correct: true},
            { text: " Economic inequality has no significant effects on society and does not require intervention.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "The role of art in society has long been a subject of philosophical debate. Some argue that art serves primarily as a reflection of cultural values and historical events, preserving the beliefs and struggles of different eras. Others contend that art is inherently personal and should be understood as an expression of the artist’s emotions and unique perspective, independent of societal influence. Still, a third viewpoint suggests that while art may be shaped by both culture and personal experience, its true value lies in its ability to provoke thought and inspire change. These differing perspectives highlight the challenge of defining art’s ultimate purpose.<br/><br/>Question:<br/>Which choice best captures the central claim of the passage?",
        answers: [
            { text: " Art is valuable only when it accurately reflects cultural and historical realities.", correct: false},
            { text: "The meaning and purpose of art are widely debated, with perspectives ranging from cultural reflection to personal expression.", correct: true},
            { text: "  Artists should prioritize emotional expression over cultural commentary when creating meaningful work.", correct: false},
            { text: " Art’s ability to inspire change is more important than its connection to history or individual experience.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "The concept of free will has been a subject of philosophical inquiry for centuries, with thinkers debating the extent to which individuals truly control their actions. Some argue that free will is an illusion, as human behavior is dictated by biological processes, environmental conditioning, and subconscious influences. Others maintain that while external factors shape decisions, individuals still exercise agency in choosing between alternatives. A third perspective suggests that free will operates within constraints, meaning that people have a degree of choice but are ultimately limited by circumstances beyond their control. These competing viewpoints underscore the complexity of defining human autonomy.<br/><br/>Question:<br/>Which choice best summarizes the passage’s main argument?",
        answers: [
            { text: " Human behavior is entirely determined by biological and environmental factors, eliminating the possibility of free will.", correct: false},
            { text: "The question of free will is complex, with perspectives ranging from total determinism to partial autonomy.", correct: true},
            { text: "  Despite external influences, individuals always have complete control over their decisions.", correct: false},
            { text: " Philosophers generally agree that free will exists, but its exact nature remains difficult to define.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "The nature of scientific discovery is often misunderstood. While some portray it as a linear progression toward objective truth, history suggests that scientific theories are frequently revised or replaced. Paradigm shifts—such as the transition from Newtonian mechanics to Einstein’s relativity—demonstrate that scientific knowledge is not fixed but rather evolves over time. Critics argue that this constant revision undermines the reliability of scientific conclusions, while others contend that such changes are a strength, reflecting science’s ability to self-correct and refine its understanding of the natural world. Ultimately, the scientific process is characterized by both uncertainty and progress, making it a dynamic rather than a static endeavor.<br/><br/>Question:<br/>Which choice best expresses the central argument of the passage?",
        answers: [
            { text: "  Scientific knowledge is unreliable because theories are frequently revised.", correct: false},
            { text: "Scientific discovery progresses through constant refinement rather than a straightforward path to absolute truth.", correct: true},
            { text: "  Einstein’s theory of relativity proved that all previous scientific knowledge was incorrect.", correct: false},
            { text: " Theories that undergo revision are inherently weaker than those that remain unchanged over time.", correct: false},
        ],
        section: "reading",
        difficulty:"medium"
    },
    
    {
        question: "The relationship between technological advancement and human employment has been a subject of debate for centuries. Historically, innovations such as mechanized farming and automated manufacturing have displaced workers in certain industries while simultaneously creating new opportunities elsewhere. Some argue that automation inevitably leads to widespread unemployment, as machines and artificial intelligence become capable of performing tasks once reserved for humans. Others contend that while job displacement occurs in the short term, technological progress ultimately generates new industries and demand for skilled labor. The challenge lies in managing these transitions to ensure economic stability and workforce adaptation.<br/><br/>Question:<br/>Which choice best captures the passage’s central claim?",
        answers: [
            { text: "  Automation is a direct cause of permanent mass unemployment, making technological progress harmful to society.", correct: false},
            { text: "Technological advancements create new jobs at the same rate that they eliminate old ones, ensuring a stable job market.", correct: false},
            { text: "  Historically, technological innovation has had no significant impact on employment trends.", correct: false},
            { text: "  While technological advancements displace workers, their long-term effects depend on society’s ability to adapt.", correct: true},
        ],
        section: "reading",
        difficulty:"medium"
    },
    {
        question: "The study of human memory has revealed both its remarkable strengths and its surprising fallibility. While many assume that memory functions as an objective record of past events, research suggests that recollections are often reconstructed rather than retrieved in their original form. Studies have shown that memories can be influenced by suggestion, emotional state, and even subsequent experiences, leading to distortions or outright false memories. Some researchers argue that despite these flaws, memory remains a reliable guide for daily decision-making. Others contend that the inherent malleability of memory raises serious concerns about its reliability, particularly in contexts such as eyewitness testimony. This ongoing debate highlights the complexity of understanding how memory truly functions.<br/><br/>Question:<br/> Which choice best summarizes the central claim of the passage?",
        answers: [
            { text: "  Memory is a perfect record of past experiences and is rarely subject to distortion.", correct: false},
            { text: "Eyewitness testimony is the most reliable form of evidence due to the accuracy of human memory.", correct: false},
            { text: "  Human memory is not a flawless recording of events but a reconstructive process that is susceptible to distortion.", correct: true},
            { text: "   Despite occasional inaccuracies, memory is fundamentally reliable and rarely influenced by external factors.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "Student’s Research Notes: <li>The woolly mammoth was a prehistoric elephant species that lived during the Ice Age.</li> <li>In 2022, Dr. Emily Richardson examined preserved woolly mammoth hair samples from Siberia.</li><li>She analyzed the protein structures in the hair to determine how mammoths adapted to cold climates.</li><li>The study found that the proteins had unique chemical bonds that helped retain heat.</li><li>Richardson concluded that these adaptations were crucial for the survival of woolly mammoths in freezing temperatures.</li><br/><br/>Question:<br/> The student wants to present the study and its findings. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
        answers: [
            { text: "   Dr. Emily Richardson conducted a 2022 study on woolly mammoths, prehistoric elephants that lived during the Ice Age.", correct: false},
            { text: "A 2022 study analyzed preserved woolly mammoth hair samples from Siberia using advanced protein analysis.", correct: false},
            { text: " In a 2022 study, Dr. Emily Richardson examined preserved woolly mammoth hair and found that its protein structures had unique chemical bonds that helped the animals retain heat.", correct: true},
            { text: "Dr. Emily Richardson was interested in understanding woolly mammoth adaptations to cold temperatures and conducted research in 2022.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "Student’s Research Notes: <li>The Mariana Trench is the deepest part of the ocean, reaching nearly 36,000 feet below the surface.</li> <li>In 2023, marine biologist Dr. Alan Hayes led a study on microbial life in the trench.</li><li>His team collected sediment samples from the trench floor and analyzed microbial DNA.</li><li>The study revealed that certain microbes had genetic adaptations allowing them to survive under extreme pressure.</li><li>Hayes concluded that deep-sea microbes could provide insights into life in extreme environments, including other planets.</li><br/><br/>Question:<br/> The student wants to present the study and its findings. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
        answers: [
            { text: "Dr. Alan Hayes led a 2023 study that explored microbial life in extreme environments, such as the Mariana Trench.", correct: false},
            { text: " In 2023, researchers examined sediment samples from the Mariana Trench, the deepest part of the ocean, to study microbial DNA.", correct: false},
            { text: "Dr. Alan Hayes’s 2023 study of deep-sea microbes in the Mariana Trench found that they had genetic adaptations enabling them to survive extreme pressure.", correct: true},
            { text: "The Mariana Trench, which reaches nearly 36,000 feet below the ocean’s surface, was the site of a 2023 study on microbial life.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "Throughout history, societies have grappled with the tension between individual liberty and collective responsibility. Proponents of absolute personal freedom argue that any restriction imposed by a governing body is an infringement on natural rights, contending that individuals should be free to make decisions irrespective of societal consequences. Opponents, however, maintain that such an approach disregards the interconnected nature of human existence; the actions of one inevitably affect the well-being of others. They argue that a society devoid of some form of mutual accountability would inevitably descend into disorder.<br/>The challenge, then, is not merely identifying the value of freedom or order in isolation, but rather negotiating the complex interdependence of the two. True liberty, some suggest, is not the absence of constraint but the presence of a structure that ensures each person’s freedom does not come at the expense of another’s.<br/><br/>Question:<br/> Which choice best expresses the central claim of the passage?",
        answers: [
            { text: "The preservation of a stable society requires prioritizing collective responsibility over individual liberty.", correct: false},
            { text: "Absolute personal freedom is unsustainable because it disregards the interconnectedness of human society.", correct: false},
            { text: "While liberty and collective responsibility are often at odds, their coexistence is necessary for a functioning society.", correct: true},
            { text: "T A truly free society exists only when individuals can act without restriction or government intervention.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "The paradox of governance lies in the simultaneous necessity of authority and the inherent suspicion it provokes. A state must possess the power to enforce laws and maintain order, yet history repeatedly demonstrates that unchecked authority breeds oppression. Classical thinkers such as Rousseau and Locke theorized that legitimate governance arises only from the consent of the governed, a notion that underpins many modern democratic systems. However, even within democracies, the mechanisms designed to prevent tyranny—checks and balances, the separation of powers—often generate inefficiencies that some argue undermine governance itself.<br/>This tension between authority and accountability suggests a fundamental dilemma: a government powerful enough to be effective is at constant risk of overreach, while a government constrained by oversight may struggle to act decisively. Thus, the challenge of political philosophy is not merely to establish authority but to design institutions that wield it without succumbing to its corrupting influence.<br/><br/>Question:<br/> Which choice best expresses the central claim of the passage?",
        answers: [
            { text: "Governments must prioritize efficiency over oversight to remain effective.", correct: false},
            { text: "The legitimacy of a government depends on its ability to maintain order while avoiding the dangers of unchecked power.", correct: true},
            { text: "Democratic principles such as checks and balances create inefficiencies that threaten effective governance.", correct: false},
            { text: " A government’s power is justified only when it is explicitly derived from the consent of the governed.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "The moral complexity of governance often stems from its dual role as both a protector and a constraint. On one hand, governments are tasked with ensuring the safety and well-being of their citizens, defending them from internal and external threats. On the other, the very structures of power that allow for this protection are also the instruments through which personal freedoms are sometimes curtailed. The foundational principle of social contract theory posits that citizens give up certain liberties in exchange for security, but it leaves open the question of how much liberty one can forfeit without undermining the essential autonomy that defines the individual.<br/>In practice, the dynamics of governance often defy the neat dichotomy between freedom and control. The challenge, therefore, is not simply determining how much freedom should be surrendered in the face of state demands, but understanding how a state can exert its power without fundamentally altering the relationship between the individual and the collective. Some theorists argue that the state’s role is to create conditions that allow for the flourishing of individual liberty within a framework of mutual respect, while others assert that the state’s authority must always be tempered by careful vigilance and continuous checks to ensure it does not encroach upon too many personal freedoms.<br/><br/>Question:<br/> Which choice best expresses the central claim of the passage?",
        answers: [
            { text: "Governments must balance the need to protect citizens with the imperative of maintaining their individual freedoms.", correct: true},
            { text: "The role of government should be limited to ensuring security and defending citizens from external threats.", correct: false},
            { text: "While the social contract necessitates the sacrifice of liberty, this sacrifice is justified by the promise of protection.", correct: false},
            { text: "The state’s role is to establish a perfect balance between individual freedom and collective welfare.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "The notion of “justice” within society is frequently viewed through the lens of either retribution or rehabilitation. Historically, the prevailing model has been one of punitive justice, where wrongdoing is met with punishment, often disproportionately severe to ensure deterrence. However, a growing body of thought suggests that a system of justice based solely on retribution fails to account for the deeper, underlying causes of crime or injustice. Advocates of a rehabilitative model argue that justice should not merely be about punishing the wrongdoer but should also involve addressing the social, economic, and psychological factors that contribute to criminal behavior.<br/>Despite the apparent appeal of rehabilitation, it carries its own complexities. It assumes that individuals are capable of change and that the state has the means to facilitate that change. In doing so, it raises the question of whether the state can, or should, assume the role of moral educator, guiding citizens toward an ideal version of their potential. Furthermore, if the state chooses rehabilitation over retribution, it must reconcile its role as both a custodian of law and an active participant in moral and psychological transformation.<br>Thus, the problem of justice is not solely one of law enforcement or punishment but concerns the very nature of human agency and the state’s responsibility in shaping that agency.<br/><br/>Question:<br/> Which of the following best represents the central issue discussed in the passage?",
        answers: [
            { text: "The primary goal of justice is to deter future crimes through punishment, even at the expense of understanding underlying causes.", correct: false},
            { text: "Rehabilitation-based justice systems assume that individuals are capable of reform, but question the state’s role in facilitating such change.", correct: true},
            { text: "A punitive model of justice is superior to a rehabilitative one because it focuses on the direct consequences of crime.", correct: false},
            { text: "The state’s role in justice should be to punish wrongdoers without considering the broader social conditions that contribute to criminal behavior.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "The notion of “human nature” has long been debated by philosophers, with divergent views on whether it is inherently selfish or altruistic. Some argue that humans are driven primarily by self-interest, as evidenced by behaviors that suggest individuals are naturally inclined to maximize their own well-being, even at the expense of others. This perspective posits that cooperation and kindness are merely social constructs, designed to mitigate the inherent competition within human nature. Others, however, assert that humans are fundamentally cooperative creatures, capable of selflessness and empathy. According to this view, individuals possess an innate sense of moral duty that compels them to act in the interest of others, even when such actions do not directly benefit themselves.<br/>The challenge lies in reconciling these competing perspectives. If human nature is inherently selfish, how can we explain acts of unprovoked altruism? Conversely, if humans are innately altruistic, why do we frequently observe egocentric behavior? The answer may lie not in the nature of humanity itself, but in the complex interplay between individual predispositions and societal influences. The human experience is shaped not by one single aspect of our nature, but by the interaction of conflicting impulses—self-interest, empathy, and the desire to belong to a larger community.<br/><br/>Question:<br/> Which of the following best represents the central theme of the passage?",
        answers: [
            { text: " Human nature is defined by selfishness, and any acts of kindness are simply societal constructs meant to preserve order.", correct: false},
            { text: "Humans are inherently cooperative, but the complexity of human behavior can be traced to external factors such as socialization and cultural expectations.", correct: false},
            { text: "Human nature is not singular but exists in a tension between competing impulses, with individual behavior shaped by both innate qualities and external influences.", correct: true},
            { text: "Despite philosophical debates, humans are innately selfish, and altruism is merely a strategy to maximize individual gain in a complex society.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "The nature of consciousness has puzzled philosophers and scientists alike for centuries. Some theorists argue that consciousness is a mere byproduct of neural activity—a biological phenomenon with no inherent meaning beyond its evolutionary utility. This view suggests that our perception of reality is not an objective reflection of the world but rather a construct shaped by cognitive limitations and survival-driven biases. From this perspective, what we call 'reality' is a filtered interpretation of the external world, optimized for function rather than truth.<br/>Others, however, contend that consciousness is not reducible to neural activity alone. They argue that subjective experience—what is often referred to as “qualia”—cannot be fully explained by physical processes. This school of thought suggests that our awareness of reality might transcend mere sensory input and could be indicative of a deeper, possibly non-material dimension of existence.<br/>Yet, both perspectives must grapple with a fundamental question: if reality is either an illusion shaped by biological constraints or an entity beyond material explanation, can we ever claim to know it objectively? The debate ultimately forces us to reconsider whether the mind passively perceives an independent reality or actively constructs one based on its own internal framework.<br/><br/>Question:<br/> Which of the following best captures the central argument of the passage?",
        answers: [
            { text: "Human consciousness is an evolutionary adaptation that shapes perception, which prevents us from accessing reality as it truly is.", correct: false},
            { text: "The mind’s perception of reality may be either a filtered representation shaped by evolution or a reflection of something beyond physical processes, but both views raise questions about objectivity.", correct: true},
            { text: " Consciousness is best understood through its biological function, as subjective experience does not provide meaningful insight into reality.", correct: false},
            { text: "The debate over the nature of consciousness is inconsequential because reality remains unchanged regardless of how it is perceived.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "Many philosophers argue that morality is dictated by objective principles, independent of human perception. However, others contend that moral values are merely social constructs, shaped by cultural norms and historical context. This debate is particularly relevant when considering moral dilemmas that transcend time and geography. If morality were truly objective, then principles of justice and fairness should remain constant. Yet, history reveals a shifting landscape in which acts once deemed acceptable—such as public executions or slavery—are now widely condemned. Conversely, the notion of progress in moral reasoning implies an underlying standard toward which societies evolve, raising the question: if morality is entirely subjective, why does moral progress seem directional rather than arbitrary?<br/><br/>Question:<br/>Which statement best captures the complexity of the passage’s discussion on morality?",
        answers: [
            { text: "Moral standards evolve over time, proving that morality is entirely subjective. ", correct: false},
            { text: "The existence of moral progress suggests an underlying objective framework.", correct: false},
            { text: "Morality is solely determined by cultural norms, with no universal standards.", correct: false},
            { text: "Changes in moral values do not necessarily indicate whether morality is objective or subjective.", correct: true},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "Isabella had always considered herself a rational person. She meticulously planned every aspect of her life, never leaving room for uncertainty. Yet now, as she stood before the portrait, she felt an inexplicable unease. There was nothing outwardly unsettling about the painting—it was a simple depiction of a woman in a garden. But something about the eyes, the faint curve of the lips, seemed disturbingly familiar. It was as if the painting knew her. The rational part of her mind scoffed at the thought. And yet, the longer she stared, the harder it became to shake the feeling that the woman in the painting was staring back.<br/><br/>Question:<br/>What is the primary literary function of Isabella’s internal conflict in the passage?",
        answers: [
            { text: "It illustrates her struggle to reconcile logic with intuition.", correct: true},
            { text: "It highlights her realization that she has repressed an important memory.", correct: false},
            { text: "It serves as a metaphor for her reluctance to accept change.", correct: false},
            { text: "It demonstrates her fear of being judged by others.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },
    {
        question: "Democratic societies often pride themselves on the principle of majority rule, contending that it ensures fair governance by aligning policies with the preferences of the people. However, some political theorists caution that pure majoritarianism, unchecked by institutional safeguards, can devolve into the “tyranny of the majority,” where the rights of minority groups are systematically overlooked. They argue that constitutional protections, judicial oversight, and representative institutions serve not to undermine democracy but to refine it—ensuring that governance reflects not just the will of the majority, but the fundamental principles of justice and equality.<br/><br/>Question:<br/>What is the primary argument presented in the passage?",
        answers: [
            { text: "Majority rule is the most effective method of governance, as it directly represents the will of the people.", correct: false},
            { text: "Democratic systems should include safeguards to prevent the majority from infringing on minority rights.", correct: true},
            { text: "Judicial oversight weakens democracy by limiting the power of the majority.", correct: false},
            { text: "The principle of majority rule should be abandoned in favor of a more centralized system of governance.", correct: false},
        ],
        section: "reading",
        difficulty:"hard"
    },



//Writing Portion Below

    {
        question: "The committee <u>made a decision to approve</u> the new policy after several hours of deliberation.<br/><br/>Question:<br/>Which choice best maintains the sentence’s clarity and conciseness?",
        answers: [
            { text: "made a decision to approve ", correct: false},
            { text: "decided to approve", correct: true},
            { text: "came to the conclusion to approve", correct: false},
            { text: " reached a decision to approve", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "The scientist, along with her research assistants, <u>were</u> excited to present their findings at the conference.<br/><br/>Question:<br/>Which choice best corrects the underlined portion of the sentence?",
        answers: [
            { text: "were ", correct: false},
            { text: " was", correct: true},
            { text: "have been", correct: false},
            { text: "had been", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "The manager <u>gave an explanation regarding</u> the new policy changes to the employees.<br/><br/>Question:<br/>Which choice best improves the clarity and conciseness of the sentence?",
        answers: [
            { text: "gave an explanation regarding ", correct: false},
            { text: "explained", correct: true},
            { text: "provided an explanation about", correct: false},
            { text: "was giving an explanation regarding", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "Each of the team members were responsible for completing their assigned tasks before the deadline.<br/><br/>Question:<br/>Which choice best corrects the sentence?",
        answers: [
            { text: "were responsible for completing their assigned tasks before the deadline. ", correct: false},
            { text: "was responsible for completing their assigned tasks before the deadline.", correct: false},
            { text: "were responsible for completing his or her assigned tasks before the deadline.", correct: false},
            { text: "was responsible for completing his or her assigned tasks before the deadline.", correct: true},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "The scientist <u>made a prediction about what would happen in the experiment’s future outcomes based on the data collected.</u><br/><br/>Question:<br/>",
        answers: [
            { text: "made a prediction about what would happen in the experiment’s future outcomes", correct: false},
            { text: "predicted the outcomes of the experiment", correct: true},
            { text: "gave a prediction regarding the future outcomes of the experiment", correct: false},
            { text: "made a future prediction about what would happen in the experiment", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "Many people believe that drinking coffee late at night causes insomnia. ______, studies show that caffeine affects individuals differently, and some people can sleep soundly after consuming it.<br/><br/>Question:<br/Which choice best fills in the blank for logical flow?",
        answers: [
            { text: "However", correct: true},
            { text: "Therefore", correct: false},
            { text: "For example", correct: false},
            { text: "In addition", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "Neither of the two brothers ___ planning to attend the reunion this year.<br/><br/>Question:<br/>Which choice correctly completes the sentence?",
        answers: [
            { text: "is ", correct: true},
            { text: "are", correct: false},
            { text: "have been", correct: false},
            { text: "were", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "The book’s introduction is engaging, but its later chapters <u>fails to maintain</u> the same level of interest.<br/><br/>Question:<br/>Which choice best maintains logical and grammatical consistency?",
        answers: [
            { text: "fails to maintain ", correct: false},
            { text: "fail to maintain", correct: true},
            { text: "has failed in maintaining", correct: false},
            { text: "is failing to maintain", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "Unlike many of her colleagues, who prefer to analyze data behind a desk, Dr. Patel enjoys <u>conducting fieldwork, and she often travels</u> to remote locations to study wildlife.<br/><br/>Question:<br/>Which choice best maintains the sentence’s clarity and grammatical accuracy?",
        answers: [
            { text: "conducting fieldwork, and she often travels ", correct: false},
            { text: "conducting fieldwork and often travels", correct: true},
            { text: " to conduct fieldwork, and she often travels", correct: false},
            { text: "conducting fieldwork, often traveling", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "Many believe that <u>a person should pursue their dreams, even if they face obstacles</u> along the way.<br/><br/>Question:<br/>Which choice best corrects the underlined portion of the sentence?",
        answers: [
            { text: "a person should pursue their dreams, even if they face obstacles ", correct: false},
            { text: " a person should pursue his or her dreams, even if he or she faces obstacles", correct: false},
            { text: "people should pursue their dreams, even if they face obstacles", correct: true},
            { text: "a person should pursue their dreams, even if that person faces obstacles", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "The city’s new transportation plan, aimed at reducing traffic congestion, <u>require all commercial vehicles to be rerouted during peak hours.</u><br/><br/>Question:<br/>Which choice best maintains logical and grammatical consistency?",
        answers: [
            { text: "require all commercial vehicles to be rerouted during peak hours ", correct: false},
            { text: "requires all commercial vehicles to be rerouted during peak hours", correct: true},
            { text: "requiring all commercial vehicles to be rerouted during peak hours", correct: false},
            { text: "have required all commercial vehicles to be rerouted during peak hours", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "The professor emphasized that students should not only read the assigned texts <u>but also they should analyze them critically</u>.<br/><br/>Question:<br/>Which choice best maintains logical structure and parallelism?",
        answers: [
            { text: "but also they should analyze them critically ", correct: false},
            { text: "but they also should analyze them critically", correct: false},
            { text: "but also analyze them critically", correct: true},
            { text: "but also that they analyze them critically", correct: false},
        ],
        section: "writing",
        difficulty:"easy"
    },
    {
        question: "Running late for the meeting, the traffic jam made it impossible for Sarah to arrive on time.<br/><br/>Question:<br/>Which choice best corrects the sentence?",
        answers: [
            { text: "Running late for the meeting, the traffic jam made it impossible for Sarah to arrive on time. ", correct: false},
            { text: "Running late for the meeting, Sarah was unable to arrive on time due to the traffic jam.", correct: true},
            { text: "Because she was running late for the meeting, the traffic jam made it impossible for Sarah to arrive on time.", correct: false},
            { text: "Running late for the meeting, it was impossible for Sarah to arrive on time because of the traffic jam.", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "The manager emphasized that in order to be able to succeed, the team must work together and communicate effectively.<br/><br/>Question:<br/>Which choice best improves the sentence by eliminating unnecessary words?",
        answers: [
            { text: "in order to be able to succeed", correct: false},
            { text: "for the purpose of being successful", correct: false},
            { text: "to succeed", correct: true},
            { text: "so that success can be achieved", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "After the teachers spoke with the principal, they decided to revise the school's grading policy.<br/><br/>Question:<br/>Which choice best corrects the sentence to ensure clarity?",
        answers: [
            { text: "After the teachers spoke with the principal, they decided to revise the school's grading policy.", correct: false},
            { text: "After speaking with the principal, the teachers decided to revise the school's grading policy.", correct: true},
            { text: "The teachers spoke with the principal, who then decided to revise the school's grading policy.", correct: false},
            { text: "After the teachers spoke with the principal, the school's grading policy was decided to be revised by them.", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "Unlike traditional advertisements, which rely on direct messaging, viral marketing succeeds <u>by making use of social media to engage audiences.</u><br/><br/>Question:<br/>Which choice best corrects the underlined portion for clarity and conciseness?",
        answers: [
            { text: "by making use of social media to engage audiences ", correct: false},
            { text: "because it makes use of social media for audience engagement", correct: false},
            { text: "by using social media to engage audiences", correct: true},
            { text: " through the utilization of social media as a means to engage audiences", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "The documentary explores the lives of endangered species, focusing on how climate change has affected <u>their habitats, migration patterns, and the availability of food.</u><br/><br/>Question:<br/>Which choice best completes the sentence while maintaining grammatical accuracy?",
        answers: [
            { text: "their habitats, migration patterns, and the availability of food", correct: false},
            { text: "their habitats, their migration patterns, and their food availability", correct: false},
            { text: "habitats, migration patterns, and food availability", correct: true},
            { text: "their habitats, migration patterns, and food that is available to them", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "The company’s new policy, which was designed to reduce waste and promote sustainability, <u>have been met with mixed reactions from employees.</u><br/><br/>Question:<br/>Which choice best maintains clarity and grammatical correctness?",
        answers: [
            { text: "have been met with mixed reactions from employees ", correct: false},
            { text: "has been met with mixed reactions from employees", correct: true},
            { text: "met mixed reactions from employees", correct: false},
            { text: " was met with mixed reactions from employees", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "The committee debated the proposal for hours, but neither the chairperson nor the board members <u>was willing to approve it.</u><br/><br/>Question:<br/>Which choice best corrects the underlined portion for clarity and grammatical accuracy?",
        answers: [
            { text: "was willing to approve it ", correct: false},
            { text: "were willing to approve it", correct: true},
            { text: "was willing to approve them", correct: false},
            { text: "were willing to approve them", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "The new software update will increase efficiency, reduce errors, and <u>it will improve user satisfaction.</u><br/><br/>Question:<br/>Which choice best maintains clarity and conciseness while preserving the sentence’s meaning?",
        answers: [
            { text: "it will improve user satisfaction", correct: false},
            { text: "improve user satisfaction", correct: true},
            { text: "improving user satisfaction", correct: false},
            { text: "improvement of user satisfaction", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "The scientist's discovery was significant because it led to advancements in medicine, and also because it revolutionized treatment methods.<br/><br/>Question:<br/>Which choice best improves the clarity and conciseness of the sentence?",
        answers: [
            { text: "and also because it revolutionized treatment methods ", correct: false},
            { text: "and it also revolutionized treatment methods", correct: false},
            { text: "and it revolutionized treatment methods", correct: true},
            { text: "as well as revolutionizing treatment methods", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "Despite numerous warnings from scientists, the effects of climate change <u>has not been fully addressed by policymakers, who often cite economic concerns.</u><br/><br/>Question:<br/>Which choice best maintains grammatical accuracy and logical consistency?",
        answers: [
            { text: "has not been fully addressed by policymakers, who often cite economic concerns ", correct: false},
            { text: " have not been fully addressed by policymakers, who often cite economic concerns", correct: true},
            { text: "has not been fully addressed by policymakers, citing economic concerns", correct: false},
            { text: " have not fully been addressed by policymakers citing economic concerns", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "Scholars argue that the novel's central theme is<u> one that deals with the idea of personal identity and the way in which it is shaped by experiences.</u><br/><br/>Question:<br/>Which choice best improves clarity and conciseness?",
        answers: [
            { text: " one that deals with the idea of personal identity and the way in which it is shaped by experiences ", correct: false},
            { text: "the idea of personal identity and how experiences shape it", correct: true},
            { text: "a theme about personal identity and the way it is shaped by experiences", correct: false},
            { text: " about personal identity and its shaping through experiences", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "The workshop emphasized the importance of refining one’s writing, <u>clarifying arguments, and that sources should be cited properly.</u><br/><br/>Question:<br/>Which choice best maintains parallel structure and logical flow?",
        answers: [
            { text: "clarifying arguments, and that sources should be cited properly ", correct: false},
            { text: "clarifying arguments, and citing sources properly", correct: true},
            { text: " arguments should be clarified, and citing sources properly", correct: false},
            { text: "arguments being clarified, and citing sources properly", correct: false},
        ],
        section: "writing",
        difficulty:"medium"
    },
    {
        question: "Even though the artist’s early works were largely dismissed by critics, her later paintings, which blended realism with abstract elements,<u> was widely regarded as groundbreaking.</u><br/><br/>Question:<br/>Which choice best corrects the sentence while maintaining grammatical accuracy and logical clarity?",
        answers: [
            { text: "was widely regarded as groundbreaking ", correct: false},
            { text: "were widely regarded as groundbreaking", correct: true},
            { text: "was, in general, regarded as being groundbreaking", correct: false},
            { text: "were, in general, regarded to be groundbreaking", correct: false},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "The policy changes enacted by the government were controversial not only because they affected tax rates but also because <u>they resulted in the impact of healthcare costs rising significantly.</u><br/><br/>Question:<br/>Which choice best improves the clarity and conciseness of the sentence?",
        answers: [
            { text: " they resulted in the impact of healthcare costs rising significantly", correct: false},
            { text: "the impact on healthcare costs was significant due to them", correct: false},
            { text: " they caused healthcare costs to rise significantly", correct: true},
            { text: " there was a significant rise in healthcare costs that resulted from them", correct: false},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "To succeed in the program, students must demonstrate strong analytical skills, the ability to work collaboratively, and <u>that they can adapt to changing circumstances.</u><br/><br/>Question:<br/>Which choice best maintains parallelism and clarity?",
        answers: [
            { text: "that they can adapt to changing circumstances ", correct: false},
            { text: "the fact that they can adapt to changing circumstances", correct: false},
            { text: " adapting to changing circumstances", correct: false},
            { text: "an ability to adapt to changing circumstances", correct: true},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "The economic downturn not only affected small businesses, causing many to close, but it also had an impact on the employment rate, which was something that led to a significant increase in joblessness.<br/><br/>Question:<br/>Which choice best improves the sentence while maintaining conciseness and clarity?",
        answers: [
            { text: "which was something that led to a significant increase in joblessness ", correct: false},
            { text: "and this resulted in a significant increase in joblessness", correct: false},
            { text: "leading to a significant increase in joblessness", correct: true},
            { text: "which as a consequence meant there was a significant increase in joblessness", correct: false},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "The university’s research center, along with several faculty members, <u>are investigating new methods for reducing greenhouse gas emissions that has proven effective in preliminary trials.</u><br/><br/>Question:<br/>Which choice best corrects the sentence while maintaining grammatical accuracy and logical consistency?",
        answers: [
            { text: "are investigating new methods for reducing greenhouse gas emissions that has proven effective ", correct: false},
            { text: "is investigating new methods to reduce greenhouse gas emissions that has proven effective", correct: false},
            { text: "are investigating new methods to reduce greenhouse gas emissions, which has proven effective", correct: false},
            { text: "is investigating new methods for reducing greenhouse gas emissions that have proven effective", correct: true},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "By studying ancient civilizations, archaeologists have gained valuable insights into how societies develop, how cultures interact, and <u>the ways in which innovations, often occurring over centuries, led to transformations in social structures.</u><br/><br/>Question:<br/>Which choice best improves the sentence while maintaining logical accuracy and conciseness?",
        answers: [
            { text: " the ways in which innovations, often occurring over centuries, led to transformations in social structures ", correct: false},
            { text: "the way innovations, often occurring over centuries, have led to transformations in social structures", correct: false},
            { text: "how innovations, often occurring over centuries, have led to transformations in social structures", correct: true},
            { text: "innovations, which, occurring over centuries, have led to transformations in social structures", correct: false},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "Despite advancements in artificial intelligence, the notion that machines could exhibit true consciousness remains <u>both a subject of debate and is something that continues to challenge researchers.</u><br/><br/>Question:<br/>Which choice best corrects the sentence while preserving clarity and conciseness?",
        answers: [
            { text: "both a subject of debate and is something that continues to challenge researchers ", correct: false},
            { text: "a subject of debate while also continuing to challenge researchers", correct: false},
            { text: "both a subject of debate and a challenge for researchers", correct: true},
            { text: "a subject of debate and one that continues to challenge researchers", correct: false},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "Unlike most species of insects, whose lifespans are often measured in weeks, the cicada is remarkable for having a life cycle that extends <u>for as long as seventeen years before emerging from underground.</u><br/><br/>Question:<br/>Which choice best improves the sentence for grammatical accuracy and logical clarity?",
        answers: [
            { text: "for having a life cycle that extends for as long as seventeen years before emerging from underground ", correct: false},
            { text: "because its life cycle extends as long as seventeen years before it emerges from underground", correct: false},
            { text: "in that its life cycle, extending for as long as seventeen years, ends with it emerging from underground", correct: false},
            { text: "because it has a life cycle that extends up to seventeen years before emerging from underground", correct: true},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "The report not only highlighted deficiencies in the system but also <u>pointing out the lack of accountability among those responsible for oversight.</u></u><br/><br/>Question:<br/>Which choice best corrects the sentence while maintaining parallel structure and avoiding redundancy?",
        answers: [
            { text: "pointing out the lack of accountability among those responsible for oversight ", correct: false},
            { text: "pointed out the lack of accountability among those responsible for oversight", correct: true},
            { text: "in addition, it pointed out how there was a lack of accountability among those responsible for oversight", correct: false},
            { text: "pointed out that a lack of accountability existed among those responsible for oversight", correct: false},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "Unlike most classical composers, whose works remain confined to concert halls, the music of Beethoven is recognized by a wider audience, including through film scores and popular culture.<br/><br/>Question:<br/>Which choice best corrects the sentence?",
        answers: [
            { text: "the music of Beethoven is recognized by a wider audience, including through film scores and popular culture.", correct: false},
            { text: "Beethoven’s music is recognized by a wider audience, including film scores and popular culture.", correct: true},
            { text: "Beethoven is recognized by a wider audience, including through film scores and popular culture.", correct: false},
            { text: "Beethoven’s music is more widely recognized, including film scores and popular culture.", correct: false},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "Researchers investigating sleep patterns found that people who wake up earlier tend to be more productive, a result that suggests lifestyle habits may play a greater role than genetics.<br/><br/>Question:<br/>Which choice best improves the sentence’s clarity and logical flow?Which choice best improves the sentence’s clarity and logical flow?",
        answers: [
            { text: " a result that suggests lifestyle habits may play a greater role than genetics.", correct: false},
            { text: "a result which suggests lifestyle habits play a greater role than genetics do.", correct: false},
            { text: "suggesting that lifestyle habits may play a greater role than genetics.", correct: false},
            { text: "a result suggesting that lifestyle habits may play a greater role than genetics do.", correct: true},
        ],
        section: "writing",
        difficulty:"hard"
    },
    {
        question: "The committee members reached a mutual agreement together after hours of discussion.<br/><br/>Question:<br/>Which choice best eliminates unnecessary words while maintaining clarity?",
        answers: [
            { text: "mutual agreement together", correct: false},
            { text: "agreement together", correct: false},
            { text: "mutual agreement", correct: false},
            { text: "agreement", correct: true},
        ],
        section: "writing",
        difficulty:"hard"
    }

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let currentDifficulty = "medium";
let usedQuestions = { reading: [], writing: [] };
let recentAnswers = [];
let section = "reading"; // Start with Reading section
const totalQuestions = 54;
const sectionQuestionLimit = 27;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    usedQuestions = { reading: [], writing: [] };
    recentAnswers = [];
    section = "reading"; // Start with Reading
    nextButton.innerHTML = "Next";

    let nextQuestion = selectNextQuestion();
    if (nextQuestion) {
        showQuestion(nextQuestion);
    } else {
        showScore();
    }
}

function selectNextQuestion() {
    let questionPool = questions.filter(q => 
        q.section === section && q.difficulty === currentDifficulty && !usedQuestions[section].includes(q)
    );

    if (questionPool.length === 0) {
        questionPool = questions.filter(q => 
            q.section === section && !usedQuestions[section].includes(q)
        ); // Fallback if difficulty pool is empty
    }

    if (questionPool.length === 0) {
        return null;
    }

    let nextQuestion = questionPool[Math.floor(Math.random() * questionPool.length)];
    usedQuestions[section].push(nextQuestion);
    return nextQuestion;
}

function showQuestion(question) {
    resetState();

    if (currentQuestionIndex >= totalQuestions || !question) {
        showScore();
        return;
    }

    questionElement.innerHTML = question.question;

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", () => selectAnswer(button, question));
    });

    updateProgressBar();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(selectedBtn, question) {
    const isCorrect = selectedBtn.dataset.correct === "true";
    recentAnswers.push(isCorrect);
    if (recentAnswers.length > 5) recentAnswers.shift(); // Keep last 5 responses

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctAnswers++;
        score += question.difficulty === "easy" ? 1 : question.difficulty === "medium" ? 2 : 2.5;
    } else {
        selectedBtn.classList.add("incorrect");

        // Highlight correct answer
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => button.disabled = true);

    // Adaptive difficulty based on last 5 answers
    let correctCount = recentAnswers.filter(Boolean).length;
    if (correctCount >= 4) currentDifficulty = "hard";
    else if (correctCount >= 2) currentDifficulty = "medium";
    else currentDifficulty = "easy";

    nextButton.style.display = "block";
}

function showScore() { 
    resetState();

    let numEasy = usedQuestions.reading.filter(q => q.difficulty === "easy").length + usedQuestions.writing.filter(q => q.difficulty === "easy").length;
    let numMedium = usedQuestions.reading.filter(q => q.difficulty === "medium").length + usedQuestions.writing.filter(q => q.difficulty === "medium").length;
    let numHard = usedQuestions.reading.filter(q => q.difficulty === "hard").length + usedQuestions.writing.filter(q => q.difficulty === "hard").length;

    // Maximum possible score based on selected questions
    let maxPossibleScore = (numEasy * 1) + (numMedium * 2) + (numHard * 2.5);
    let rawScore = score;

    // Convert raw score into a scaled SAT score (200–800)
    let readingScore = Math.round((rawScore / maxPossibleScore) * 600 + 200);
    
    // Ensure score is within SAT range (200-800)
    readingScore = Math.min(800, Math.max(200, readingScore));

    // Store in local storage for use in other sections
    localStorage.setItem("readingScore", scaledScore);

    questionElement.innerHTML = `
        <p><strong>Reading and Writing SAT Score:</strong> ${readingScore} / 800</p>
        <p>Next up: Math section!</p>
    `;

    nextButton.innerHTML = "Proceed to Math";
    nextButton.style.display = "block";
    document.getElementById("progress-bar").style.width = "100%";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex === sectionQuestionLimit) {
        section = "writing"; // Switch to Writing section after 27 questions
    }

    let nextQuestion = selectNextQuestion();
    if (nextQuestion) {
        showQuestion(nextQuestion);
    } else {
        showScore();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBar.style.width = progress + "%";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < totalQuestions) {
        handleNextButton();
    } else {
        mathlink();
    }
});

function mathlink() {
    location.href = "https://www.brainjelli.com/dsatmath.html";
}

startQuiz();