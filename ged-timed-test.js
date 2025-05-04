document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const countdownEl = document.getElementById("countdown");
    const gedIntroContainer = document.getElementById("ged-intro-container");
    const startTestButton = document.getElementById("start-test-btn");
    const continueButton = document.getElementById("continue-btn");

    // State Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let testCompleted = false;
    let time;
    let refreshIntervalId;
    let currentSection = "rla";
    let rlaResponses = [];
    let mathResponses = [];
    let scienceResponses = [];
    let socialStudiesResponses = [];

    // Sample Question Banks
    const rlaQuestions = [
        {
            "passage": "In 2024, the coastal town of Seaview grappled with rising sea levels. A 2020 report predicted that 30% of the town’s beaches would erode by 2030 without intervention. The town council proposed a $5 million seawall, but local fishermen, including Maria Gonzalez, argued it would disrupt marine ecosystems. At a public forum, scientist Dr. Alan Chen presented data showing seawalls reduced fish populations by 15% in similar towns. Mayor Lisa Patel countered with a plan for natural barriers, like dune restoration, which had preserved 80% of beaches in a nearby town. The debate divided residents, with no clear solution.",
            "question": "What is the primary purpose of including Dr. Alan Chen’s data in the passage?",
            "answers": [
                { "text": "A) To highlight the economic benefits of seawalls", "correct": false },
                { "text": "B) To support the fishermen’s concerns about marine ecosystems", "correct": true },
                { "text": "C) To argue for dune restoration as a solution", "correct": false },
                { "text": "D) To criticize the town council’s proposal", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "The small farming community of Greenvale faced a crisis in 2023 when a major drought depleted water reserves. A 2021 study showed the aquifer supplying 60% of the town’s water was at historic lows. Farmer Jane Kim proposed a water-sharing agreement with neighboring towns, but local business owner Tom Harris argued it would raise costs for residents. At a town meeting, Jane cited a case where a similar agreement saved a nearby town during a 2018 drought. Tom countered that Greenvale’s economy depended on low water rates. The council delayed the decision, leaving tensions high.",
            "question": "Which phrase best describes the tone of the passage?",
            "answers": [
                { "text": "A) Emotional and confrontational", "correct": false },
                { "text": "B) Critical and dismissive", "correct": false },
                { "text": "C) Optimistic and collaborative", "correct": false },
                { "text": "D) Neutral and informative", "correct": true }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "In 2025, the city of Riverton debated renovating its aging library. Built in 1920, the library was a historic landmark but lacked modern amenities. A 2022 survey showed 65% of residents wanted digital resources, like e-books and Wi-Fi. Librarian Sarah Lee advocated for a $2 million renovation, citing increased community engagement. However, taxpayer advocate Greg Olsen argued the funds should go to road repairs, which 55% of residents prioritized in the same survey. At a council meeting, Sarah proposed a phased renovation to balance costs. The council remained undecided.",
            "question": "What does the inclusion of the 2022 survey data suggest about the residents’ priorities?",
            "answers": [
                { "text": "A) They are indifferent to the library’s condition", "correct": false },
                { "text": "B) They value digital resources over road repairs", "correct": false },
                { "text": "C) They unanimously support library renovations", "correct": false },
                { "text": "D) They have competing priorities for city funds", "correct": true }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "The town of Oakridge faced a housing shortage in 2024. A 2023 report estimated a need for 500 new homes by 2030 to accommodate growth. Developer Emma Carter proposed a 200-unit apartment complex, but residents, led by retiree Paul Nguyen, worried about traffic congestion. At a zoning meeting, Emma presented a traffic study showing minimal impact, with only a 5% increase in peak-hour delays. Paul cited a 2020 survey where 68% of residents opposed high-density housing. The council approved a smaller 100-unit project, sparking mixed reactions.",
            "question": "Which word should replace 'proposed' in the sentence 'Developer Emma Carter proposed a 200-unit apartment complex' to maintain a formal tone?",
            "answers": [
                { "text": "A) urged", "correct": false },
                { "text": "B) pitched", "correct": false },
                { "text": "C) suggested", "correct": false },
                { "text": "D) recommended", "correct": true }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "In 2023, the city of Hilltop debated closing its century-old train station. A 2021 study showed only 10% of residents used the station, but historian Clara Evans argued it was a cultural treasure. She referenced a 2019 petition with 2,000 signatures supporting preservation. Commuter advocate Mark Lopez pushed for modernization, citing a 2022 report that upgraded stations increased ridership by 20% elsewhere. At a public hearing, Clara suggested a mixed-use development to fund restoration. The city council postponed the decision, citing budget constraints.",
            "question": "What is the main conflict described in the passage?",
            "answers": [
                { "text": "A) Public petition versus city council authority", "correct": false },
                { "text": "B) Historian versus commuter advocate leadership", "correct": false },
                { "text": "C) Preservation of history versus modernization", "correct": true },
                { "text": "D) Budget constraints versus commuter needs", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "The rural town of Fairmont faced a school consolidation debate in 2024. A 2022 report showed declining enrollment, with only 300 students across two schools. Superintendent Rachel Kim proposed merging them to save $1 million annually, but parent leader Omar Hassan argued it would harm community identity. Rachel cited a 2020 study showing consolidated schools improved test scores by 10%. Omar countered with a 2023 survey where 75% of parents opposed the merger. At a board meeting, a compromise to share facilities but keep both schools open was proposed but not voted on.",
            "question": "What assumption underlies Rachel Kim’s argument for school consolidation?",
            "answers": [
                { "text": "A) Enrollment will continue to decline indefinitely", "correct": false },
                { "text": "B) The community opposes shared facilities", "correct": false },
                { "text": "C) Parents prioritize community identity over cost savings", "correct": false },
                { "text": "D) Consolidation will improve educational outcomes", "correct": true }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "In 2025, the town of Crestwood debated a wind farm proposal. A 2023 study estimated it would power 5,000 homes but disrupt local wildlife. Environmentalist Laura Chen opposed the project, citing a 2021 report that wind turbines reduced bird populations by 12%. Developer Ian Brooks argued the farm would cut energy costs by 15%, referencing a 2024 survey where 60% of residents supported renewable energy. At a town hall, Laura suggested stricter turbine placement rules. The council approved the project with conditions, frustrating both sides.",
            "question": "How does the 2024 survey contribute to Ian Brooks’ argument?",
            "answers": [
                { "text": "A) It undermines the environmentalist’s concerns", "correct": false },
                { "text": "B) It highlights the economic drawbacks of wind farms", "correct": false },
                { "text": "C) It demonstrates community support for renewable energy", "correct": true },
                { "text": "D) It shows residents prioritize wildlife over energy costs", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "The city of Laketown faced a park renovation debate in 2024. A 2022 survey showed 70% of residents wanted more recreational facilities, but budget cuts limited funds. Councilmember Ava Singh proposed a $3 million plan for new playgrounds and trails, citing a 2020 study linking parks to a 10% drop in youth crime. Taxpayer advocate Eric Dunn argued for minimal upgrades to save costs, referencing a 2023 poll where 55% opposed tax increases. At a council meeting, Ava suggested private donations to offset costs, but no decision was made.",
            "question": "Which statement best summarizes the role of the 2020 study in Ava Singh’s argument?",
            "answers": [
                { "text": "A) It shows residents support tax increases for parks", "correct": false },
                { "text": "B) It refutes the taxpayer advocate’s position", "correct": false },
                { "text": "C) It proves parks are more important than budget concerns", "correct": false },
                { "text": "D) It connects park improvements to a social benefit", "correct": true }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "In 2023, the town of Pineview debated a factory expansion. A 2021 economic report predicted 200 new jobs, but resident Sophia Patel worried about air pollution. She cited a 2020 study linking factories to a 15% rise in respiratory issues. Factory manager Liam Scott argued the expansion included eco-friendly upgrades, referencing a 2022 audit showing a 20% emissions drop in similar facilities. At a zoning hearing, Sophia proposed stricter pollution controls. The council approved the expansion with added regulations, leaving some residents unsatisfied.",
            "question": "What is the effect of replacing 'worried' with 'speculated' in the sentence 'Resident Sophia Patel worried about air pollution'?",
            "answers": [
                { "text": "A) It shifts focus to the factory’s upgrades", "correct": false },
                { "text": "B) It maintains the sentence’s original tone", "correct": false },
                { "text": "C) It weakens her position by suggesting uncertainty", "correct": true },
                { "text": "D) It strengthens Sophia’s argument by citing evidence", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "The town of Elmwood faced a recycling program overhaul in 2024. A 2022 report showed only 25% of waste was recycled, far below the national average. Councilmember Noah Kim proposed a $1 million curbside sorting system, citing a 2021 study where similar programs boosted recycling by 30%. Resident Ellen Carter argued it would raise taxes, referencing a 2023 survey where 60% opposed new fees. At a town hall, Noah suggested subsidies to offset costs. The council delayed the vote, citing budget concerns.",
            "question": "What inference can be made about the council’s priorities based on the passage?",
            "answers": [
                { "text": "A) They aim to align with national recycling averages", "correct": false },
                { "text": "B) They support subsidies for all new programs", "correct": false },
                { "text": "C) They prioritize recycling over resident concerns", "correct": false },
                { "text": "D) They value cost management over environmental goals", "correct": true }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "In 2025, the city of Brookhaven debated a historic theater restoration. A 2023 report estimated $4 million in costs, but the theater drew only 5,000 visitors annually. Preservationist Mia Torres argued it symbolized cultural heritage, citing a 2021 petition with 3,000 signatures. Business owner Raj Patel pushed for demolition to build a convention center, referencing a 2022 study predicting $10 million in annual revenue. At a council meeting, Mia proposed a public-private partnership to fund restoration. The council’s indecision fueled public frustration.",
            "question": "Which statement best evaluates the strength of Raj Patel’s argument relative to Mia Torres’ argument?",
            "answers": [
                { "text": "A) Raj’s argument is weaker because it ignores cultural heritage", "correct": false },
                { "text": "B) Both arguments are equally strong due to their use of data", "correct": false },
                { "text": "C) Mia’s argument is stronger because it has more community support", "correct": false },
                { "text": "D) Raj’s argument is stronger because it relies on economic data rather than emotional appeals", "correct": true }
            ],
            "type": "rla",
            "difficulty": "really hard",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "The town of Willow Creek faced a water treatment plant upgrade in 2024. A 2022 study showed current facilities failed to meet 30% of federal standards. Engineer Zoe Khan proposed a $6 million overhaul, citing a 2020 case where upgrades reduced waterborne illnesses by 25%. Resident Carl Weaver argued the costs would burden low-income families, referencing a 2023 survey where 65% opposed rate hikes. At a public hearing, Zoe suggested federal grants to ease costs. The council’s delay in deciding deepened community divides.",
            "question": "What underlying assumption in Zoe Khan’s proposal might Carl Weaver’s argument challenge?",
            "answers": [
                { "text": "A) Waterborne illnesses are a significant issue in Willow Creek", "correct": false },
                { "text": "B) The 2020 case is irrelevant to Willow Creek’s situation", "correct": false },
                { "text": "C) Residents prioritize water quality over financial concerns", "correct": true },
                { "text": "D) Federal grants will fully cover the upgrade costs", "correct": false }
            ],
            "type": "rla",
            "difficulty": "really hard",
            "category": "ged-reading-comprehension"
        },
        {
            "passage": "In 2024, the town of Clearwater faced a public transportation crisis. A 2022 study showed that 40% of residents relied on buses, but the fleet was outdated, causing frequent delays. Mayor Anna Ruiz proposed a $3 million upgrade to electric buses, citing environmental benefits. Local merchant Tim Blake opposed the plan, arguing it would increase taxes. At a town meeting, Anna highlighted a 2021 survey showing 60% of residents supported green initiatives. The council approved a scaled-down plan, balancing costs and sustainability.",
            "question": "What is the central idea of the passage?",
            "answers": [
                { "text": "A) The importance of upgrading public transportation for environmental benefits", "correct": true },
                { "text": "B) The economic challenges of maintaining an outdated bus fleet", "correct": false },
                { "text": "C) The conflict between merchants and the town council", "correct": false },
                { "text": "D) The need for tax increases to fund public services", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-central-ideas"
        },
        {
            "passage": "The community of Pinehill debated a new community center in 2023. A 2020 report estimated it would serve 80% of residents but cost $4 million. Organizer Lila Chen argued it would foster youth programs, referencing a 2019 study linking such centers to a 15% drop in juvenile delinquency. Taxpayer advocate Greg Holt claimed the funds were better spent on road repairs. At a public forum, Lila proposed private donations to offset costs. The council delayed the decision, citing budget concerns.",
            "question": "What is the main idea conveyed by the passage?",
            "answers": [
                { "text": "A) The benefits of a community center in reducing youth crime", "correct": true },
                { "text": "B) The financial constraints of funding public projects", "correct": false },
                { "text": "C) The opposition to youth programs by taxpayers", "correct": false },
                { "text": "D) The role of private donations in community development", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-central-ideas"
        },
        {
            "passage": "In 2025, the city of Riverview debated preserving its historic waterfront. A 2023 study showed 70% of tourists visited for its heritage, but rising floods threatened the area. Preservationist Elena Cruz argued for a $5 million flood barrier, citing cultural significance. Developer Omar Syed pushed for modern condos, claiming they would boost the economy. At a council meeting, Elena referenced a 2022 survey showing 65% of residents valued heritage over development. The council opted for a partial barrier, leaving both sides dissatisfied.",
            "question": "What is the central focus of the passage?",
            "answers": [
                { "text": "A) Balancing cultural preservation with economic development", "correct": true },
                { "text": "B) The economic benefits of waterfront condos", "correct": false },
                { "text": "C) The impact of floods on tourism", "correct": false },
                { "text": "D) The role of surveys in city planning", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-central-ideas"
        },
        {
            "passage": "The town of Maplewood faced a landfill expansion debate in 2024. A 2021 report predicted the current landfill would be full by 2027. Environmentalist Noah Lee proposed a $2 million recycling program to extend its life, citing a 2020 study showing recycling cut waste by 25% in similar towns. Resident Paula Grant argued it would raise taxes, referencing a 2023 poll where 60% opposed new fees. At a town hall, Noah suggested composting as a cheaper alternative. The council postponed the vote.",
            "question": "What is the main idea of the passage?",
            "answers": [
                { "text": "A) The need for sustainable waste management solutions", "correct": true },
                { "text": "B) The financial burden of recycling programs", "correct": false },
                { "text": "C) The opposition to landfill expansion", "correct": false },
                { "text": "D) The role of composting in waste reduction", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-central-ideas"
        },
        {
            "passage": "In 2023, the city of Stonegate debated a bike lane expansion. A 2021 study showed cycling reduced traffic congestion by 10%, but the $1.5 million plan sparked controversy. Advocate Maya Torres argued it would promote health and sustainability, citing a 2020 survey where 55% of residents supported bike lanes. Business owner Carl Dunn claimed it would reduce parking, hurting sales. At a public hearing, Maya proposed narrower lanes to save space. The council approved a limited expansion, frustrating some residents.",
            "question": "What is the central idea presented in the passage?",
            "answers": [
                { "text": "A) Promoting sustainable transportation through bike lane expansion", "correct": true },
                { "text": "B) The economic impact of reduced parking spaces", "correct": false },
                { "text": "C) The controversy over city budget priorities", "correct": false },
                { "text": "D) The need for compromise in urban planning", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-central-ideas"
        },
        {
            "passage": "The rural town of Oakvale debated a solar farm in 2024. A 2022 report estimated it would power 3,000 homes but require 200 acres of farmland. Farmer Elena Kim supported the project, citing a 2021 study showing solar farms increased local revenue by 12%. Resident Sam Carter opposed it, arguing it would disrupt agriculture, referencing a 2023 survey where 70% valued farmland preservation. At a town meeting, Elena proposed leasing land to balance both needs. The council remained undecided.",
            "question": "What is the main focus of the passage?",
            "answers": [
                { "text": "A) Balancing renewable energy with agricultural preservation", "correct": true },
                { "text": "B) The economic benefits of solar farms", "correct": false },
                { "text": "C) The opposition to farmland development", "correct": false },
                { "text": "D) The role of surveys in rural decision-making", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-central-ideas"
        },
        {
            "passage": "In 2025, the town of Fairview debated a historic schoolhouse restoration. A 2023 report estimated $3 million in costs, but the building was unused since 1990. Historian Lila Patel argued it preserved cultural identity, citing a 2021 petition with 2,500 signatures. Developer Ian Brooks proposed a shopping plaza, referencing a 2022 study predicting 150 new jobs. At a council meeting, Lila suggested a museum to generate revenue while preserving the site. The council’s indecision deepened community tensions.",
            "question": "What is the central idea of the passage, and how do the arguments of Lila Patel and Ian Brooks contribute to it?",
            "answers": [
                { "text": "A) The tension between cultural preservation and economic development, with Lila emphasizing heritage and Ian focusing on jobs", "correct": true },
                { "text": "B) The economic potential of historic sites, with both advocating for revenue generation", "correct": false },
                { "text": "C) The community’s resistance to change, with both highlighting public support", "correct": false },
                { "text": "D) The council’s failure to act, with both proposing viable solutions", "correct": false }
            ],
            "type": "rla",
            "difficulty": "really hard",
            "category": "ged-central-ideas"
        },
        {
            "passage": "The city of Crestfield faced a hospital expansion debate in 2024. A 2022 study showed 20% of residents lacked local healthcare access. Dr. Omar Khan proposed a $10 million wing for specialty care, citing a 2020 report linking access to a 15% drop in emergency visits. Taxpayer advocate Sarah Lee argued it would raise property taxes, referencing a 2023 poll where 60% opposed increases. At a public forum, Omar suggested state grants to offset costs. The council delayed the decision, citing fiscal concerns.",
            "question": "What is the main idea of the passage, and how does the 2020 report support it?",
            "answers": [
                { "text": "A) Delaying critical infrastructure projects, with the 2020 report as evidence of urgency", "correct": false },
                { "text": "B) Overcoming public opposition to taxes, with the 2020 report proving community need", "correct": false },
                { "text": "C) Addressing healthcare access through hospital expansion, with the 2020 report showing its potential to reduce emergencies", "correct": true },
                { "text": "D) Managing fiscal responsibility in city planning, with the 2020 report highlighting costs", "correct": false }
            ],
            "type": "rla",
            "difficulty": "really hard",
            "category": "ged-central-ideas"
        },
        {
            "passage": "In 2024, the town of Bayview debated a new public art installation. A 2022 survey showed 55% of residents supported local art, but the $200,000 project sparked controversy. Artist Lena Kim argued it would boost community pride, citing a 2020 study linking public art to increased civic engagement. Taxpayer advocate Ryan Holt opposed it, claiming the funds should fix potholes. At a town meeting, Lena proposed a smaller mural to reduce costs. The council approved a compromise, but tensions remained.",
            "question": "Why does the author include the 2022 survey in the passage?",
            "answers": [
                { "text": "A) To show unanimous support for the art installation", "correct": false },
                { "text": "B) To highlight community interest in public art", "correct": true },
                { "text": "C) To emphasize the need for road repairs", "correct": false },
                { "text": "D) To criticize the council’s decision", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "The city of Greystone faced a zoning dispute in 2023 over a proposed factory. A 2021 report predicted 300 new jobs, but resident Clara Nguyen worried about noise pollution. She cited a 2020 study linking industrial zones to a 20% rise in sleep disturbances. Factory manager Ethan Brooks argued it would use soundproofing technology, referencing a 2022 audit showing a 15% noise reduction in similar facilities. At a public hearing, Clara suggested stricter noise regulations. The council approved the factory with conditions.",
            "question": "What can be inferred about Clara Nguyen’s priorities based on her actions?",
            "answers": [
                { "text": "A) She values economic growth over community well-being", "correct": false },
                { "text": "B) She prioritizes resident health and quality of life", "correct": true },
                { "text": "C) She supports industrial development with no restrictions", "correct": false },
                { "text": "D) She seeks to delay the factory’s construction indefinitely", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "In 2025, the town of Lakewood debated a curfew for teenagers. A 2023 police report showed a 10% rise in nighttime vandalism, prompting Councilmember Tara Singh to propose a 10 p.m. curfew. She cited a 2021 study linking curfews to a 12% drop in youth crime. Parent advocate Maria Gomez argued it would limit teens’ freedom, referencing a 2022 survey where 65% of parents opposed restrictions. At a town hall, Tara suggested exceptions for work or school events. The council delayed the vote.",
            "question": "What is the author’s purpose in mentioning Maria Gomez’s argument?",
            "answers": [
                { "text": "A) To advocate for unrestricted teen activities", "correct": false },
                { "text": "B) To criticize parents’ lack of discipline", "correct": false },
                { "text": "C) To highlight a counterargument to the curfew proposal", "correct": true },
                { "text": "D) To undermine the need for a curfew", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "The rural town of Cedarville debated a high-speed internet expansion in 2024. A 2022 study showed 40% of residents lacked reliable internet, hindering remote work. Tech advocate Omar Khan proposed a $2 million fiber-optic network, citing a 2020 report that broadband boosted local economies by 8%. Farmer Ellen Reed argued it would disrupt farmland, referencing a 2023 survey where 60% prioritized agriculture. At a council meeting, Omar suggested underground cables to minimize impact. The council remained undecided.",
            "question": "What can be inferred about the author’s purpose in including the 2020 report?",
            "answers": [
                { "text": "A) To emphasize the environmental risks of the project", "correct": false },
                { "text": "B) To support Omar’s argument for economic benefits", "correct": true },
                { "text": "C) To question the reliability of broadband technology", "correct": false },
                { "text": "D) To highlight the survey’s findings on agriculture", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "In 2023, the city of Hillcrest debated a downtown parking garage. A 2021 study showed parking shortages deterred 25% of shoppers, hurting businesses. Councilmember Noah Lee proposed a $5 million garage, citing a 2020 survey where 70% of merchants supported it. Resident Ava Carter argued it would increase traffic, referencing a 2022 report linking garages to a 10% rise in congestion. At a public forum, Noah suggested shuttle services to ease traffic. The council approved a smaller garage.",
            "question": "What can be inferred about Ava Carter’s stance based on her argument?",
            "answers": [
                { "text": "A) She prioritizes traffic management over business growth", "correct": true },
                { "text": "B) She supports merchant-driven initiatives", "correct": false },
                { "text": "C) She opposes any downtown development", "correct": false },
                { "text": "D) She seeks to reduce parking availability", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "The town of Fairmont faced a library budget cut in 2024. A 2022 report showed 60% of residents used the library, but funding was slashed by 20%. Librarian Zoe Patel argued for restoring funds, citing a 2021 study linking libraries to a 15% rise in literacy rates. Taxpayer advocate Greg Dunn supported the cuts, referencing a 2023 poll where 55% favored lower taxes. At a town hall, Zoe proposed community fundraisers to bridge the gap. The council delayed action.",
            "question": "Why does the author include the 2021 study in the passage?",
            "answers": [
                { "text": "A) To demonstrate the library’s lack of community support", "correct": false },
                { "text": "B) To bolster Zoe’s argument for maintaining library funding", "correct": true },
                { "text": "C) To criticize the taxpayer advocate’s position", "correct": false },
                { "text": "D) To highlight the need for tax reductions", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "In 2025, the city of Riverton debated a riverfront trail. A 2023 study showed trails increased property values by 5%, but the $1 million project faced opposition. Advocate Lila Chen argued it would promote health, citing a 2021 report linking trails to a 10% rise in physical activity. Business owner Sam Holt claimed it would disrupt commerce, referencing a 2022 survey where 60% of merchants feared construction delays. At a council meeting, Lila suggested phased construction. The council approved a shorter trail.",
            "question": "What can be inferred about Sam Holt’s priorities based on his argument?",
            "answers": [
                { "text": "A) He seeks to increase property values through construction", "correct": false },
                { "text": "B) He supports trail development with minimal restrictions", "correct": false },
                { "text": "C) He prioritizes business operations over recreational projects", "correct": true },
                { "text": "D) He values community health over economic stability", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "The town of Oakridge debated a historic mill restoration in 2024. A 2022 report estimated $3 million in costs, but the mill was a cultural landmark. Historian Maya Torres argued for preservation, citing a 2021 petition with 2,000 signatures. Developer Ian Brooks pushed for a retail complex, referencing a 2023 study predicting 100 new jobs. At a public hearing, Maya suggested a mixed-use restoration to balance heritage and commerce. The council postponed the decision.",
            "question": "What is the author’s purpose in presenting both Maya Torres’ and Ian Brooks’ arguments?",
            "answers": [
                { "text": "A) To emphasize the community’s lack of consensus", "correct": false },
                { "text": "B) To criticize the council’s indecision", "correct": false },
                { "text": "C) To advocate for the retail complex as the best solution", "correct": false },
                { "text": "D) To illustrate the competing values of heritage and economic growth", "correct": true }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "In 2023, the city of Crestwood debated a plastic bag ban. A 2021 study showed 30% of local waste was single-use plastics, prompting Councilmember Elena Cruz to propose the ban. She cited a 2020 report linking bans to a 25% drop in plastic pollution. Retailer Paula Grant opposed it, arguing it would raise costs for shoppers, referencing a 2022 survey where 60% opposed the ban. At a town hall, Elena suggested reusable bag incentives. The council delayed the vote, citing public division.",
            "question": "What can be inferred about the author’s purpose in including both the 2020 report and the 2022 survey, and how do they shape the passage’s perspective?",
            "answers": [
                { "text": "A) To present a balanced view of the ban’s environmental benefits and public opposition, highlighting the complexity of the debate", "correct": true },
                { "text": "B) To advocate for the plastic bag ban by emphasizing its environmental impact", "correct": false },
                { "text": "C) To criticize the council’s failure to act on public opinion", "correct": false },
                { "text": "D) To undermine the retailer’s argument by focusing on pollution data", "correct": false }
            ],
            "type": "rla",
            "difficulty": "really hard",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "The town of Willowbrook faced a school renovation debate in 2024. A 2022 report showed outdated facilities harmed test scores by 10%. Principal Omar Khan proposed a $4 million upgrade, citing a 2021 study linking modern schools to a 15% rise in student performance. Taxpayer advocate Sarah Dunn argued it would raise taxes, referencing a 2023 poll where 65% opposed increases. At a public forum, Omar suggested phased renovations to spread costs. The council’s indecision fueled frustration.",
            "question": "What can be inferred about Omar Khan’s priorities, and why does the author include the 2023 poll in the passage?",
            "answers": [
                { "text": "A) Omar prioritizes student outcomes, and the poll highlights public resistance to his plan, showing the debate’s complexity", "correct": true },
                { "text": "B) Omar seeks to raise taxes, and the poll supports his argument for funding", "correct": false },
                { "text": "C) Omar opposes renovations, and the poll undermines the need for upgrades", "correct": false },
                { "text": "D) Omar focuses on cost management, and the poll criticizes his proposal", "correct": false }
            ],
            "type": "rla",
            "difficulty": "really hard",
            "category": "ged-inference-and-authors-purpose"
        },
        {
            "passage": "In 2024, the town of Springvale debated a new community garden. A 2022 survey showed 65% of residents supported it, many wanted to grow their own food. Organizer Lena Patel argued it would promote healthy eating. Local resident Mark Thompson worried about maintenance costs, he claimed the town lacked funds. At a council meeting, Lena proposed volunteers manage upkeep, which eased concerns. The garden was approved, but tensions remained.",
            "question": "Which revision corrects the sentence 'A 2022 survey showed 65% of residents supported it, many wanted to grow their own food' to improve sentence structure?",
            "answers": [
                { "text": "A) A 2022 survey showed that 65% of residents supported it, and many wanted to grow their own food.", "correct": true },
                { "text": "B) A 2022 survey showed 65% of residents supported it, many wanting to grow their own food.", "correct": false },
                { "text": "C) A 2022 survey showed 65% of residents supported it; wanting to grow their own food.", "correct": false },
                { "text": "D) A 2022 survey showed 65% of residents supported it, with many wanted to grow their own food.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-grammar-sentence-structure"
        },
        {
            "passage": "The city of Hillcrest faced a library renovation debate in 2025. A 2023 report estimated costs at $2 million, the building needed modern upgrades. Librarian Sarah Kim argued it would increase community engagement. Taxpayer advocate Greg Lee opposed the plan, he prioritized road repairs. At a public forum, Sarah suggested a phased approach, it balanced costs and benefits. The council delayed the decision, citing budget concerns.",
            "question": "Which revision corrects the sentence 'A 2023 report estimated costs at $2 million, the building needed modern upgrades' to ensure proper sentence structure?",
            "answers": [
                { "text": "A) A 2023 report estimated costs at $2 million; the building needed modern upgrades.", "correct": false },
                { "text": "B) A 2023 report estimated costs at $2 million, but the building needed modern upgrades.", "correct": false },
                { "text": "C) A 2023 report estimated costs at $2 million because the building needed modern upgrades.", "correct": true },
                { "text": "D) A 2023 report estimated costs at $2 million, needing modern upgrades for the building.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-grammar-sentence-structure"
        },
        {
            "passage": "In 2023, the town of Oakwood debated a new recycling program. A 2021 study showed only 20% of waste was recycled, residents needed better options. Environmentalist Noah Carter proposed curbside sorting, it would cost $1 million. Resident Ellen Hayes argued it would raise taxes, she suggested composting instead. At a town hall, Noah offered subsidies to offset costs, which gained some support. The council postponed the vote.",
            "question": "Which revision corrects the sentence 'A 2021 study showed only 20% of waste was recycled, residents needed better options' to improve sentence clarity and structure?",
            "answers": [
                { "text": "A) A 2021 study showed only 20% of waste was recycled, residents needing better options.", "correct": false },
                { "text": "B) A 2021 study showed that only 20% of waste was recycled, so residents needed better options.", "correct": true },
                { "text": "C) A 2021 study showed only 20% of waste was recycled; needing better options for residents.", "correct": false },
                { "text": "D) A 2021 study showed only 20% of waste was recycled, with residents needed better options.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-grammar-sentence-structure"
        },
        {
            "passage": "The town of Fairmont debated a solar farm in 2024. A 2022 report predicted it would power 4,000 homes, farmland would be sacrificed. Farmer Mia Chen supported the project, she saw economic benefits. Resident Sam Reed opposed it, he valued agriculture. At a council meeting, Mia proposed leasing land for solar panels, it preserved some farmland. The council approved a smaller project, but debates continued.",
            "question": "Which revision corrects the sentence 'A 2022 report predicted it would power 4,000 homes, farmland would be sacrificed' to ensure proper sentence structure?",
            "answers": [
                { "text": "A) A 2022 report predicted it would power 4,000 homes, sacrificing farmland.", "correct": false },
                { "text": "B) A 2022 report predicted it would power 4,000 homes; however, farmland would be sacrificed.", "correct": false },
                { "text": "C) A 2022 report predicted it would power 4,000 homes, yet farmland would be sacrificed.", "correct": true },
                { "text": "D) A 2022 report predicted it would power 4,000 homes, with farmland being sacrificed.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-grammar-sentence-structure"
        },
        {
            "passage": "In 2025, the city of Riverton faced a park expansion debate. A 2023 survey showed 70% of residents wanted more green spaces, youth programs were also needed. Councilmember Ava Torres proposed a $3 million plan for trails and playgrounds. Taxpayer advocate Carl Dunn opposed it, he argued for lower taxes. At a public hearing, Ava suggested private donations, it reduced tax burdens. The council remained undecided.",
            "question": "Which revision corrects the sentence 'A 2023 survey showed 70% of residents wanted more green spaces, youth programs were also needed' to improve sentence structure and clarity?",
            "answers": [
                { "text": "A) A 2023 survey showed 70% of residents wanted more green spaces, with youth programs also needed.", "correct": false },
                { "text": "B) A 2023 survey showed 70% of residents wanted more green spaces; youth programs were also needed.", "correct": false },
                { "text": "C) A 2023 survey showed 70% of residents wanted more green spaces, and youth programs were also needed.", "correct": false },
                { "text": "D) A 2023 survey showed that 70% of residents wanted more green spaces and that youth programs were also needed.", "correct": true }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-grammar-sentence-structure"
        },
        {
            "passage": "The town of Crestwood debated a historic theater restoration in 2024. A 2022 report estimated $4 million in costs, the building was a cultural landmark. Historian Lila Khan argued it preserved heritage, she cited a 2021 petition. Developer Ian Brooks pushed for a shopping plaza, he predicted economic growth. At a council meeting, Lila proposed a museum, it could generate revenue. The council delayed the decision, citing budget issues.",
            "question": "Which revision corrects the sentence 'Historian Lila Khan argued it preserved heritage, she cited a 2021 petition' to ensure proper sentence structure?",
            "answers": [
                { "text": "A) Historian Lila Khan argued it preserved heritage; she cited a 2021 petition.", "correct": true },
                { "text": "B) Historian Lila Khan argued it preserved heritage, citing a 2021 petition.", "correct": false },
                { "text": "C) Historian Lila Khan argued it preserved heritage, with a 2021 petition cited.", "correct": false },
                { "text": "D) Historian Lila Khan argued it preserved heritage, she citing a 2021 petition.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-grammar-sentence-structure"
        },
        {
            "passage": "In 2023, the city of Laketown debated a bike lane expansion. A 2021 study showed cycling reduced congestion by 12%, businesses worried about parking. Advocate Maya Lee proposed a $1 million plan for new lanes. Merchant Tom Carter opposed it, he feared revenue losses. At a town hall, Maya suggested narrower lanes, it preserved parking spaces. The council approved a limited expansion, debates persisted.",
            "question": "Which revision corrects the sentence 'A 2021 study showed cycling reduced congestion by 12%, businesses worried about parking' to improve sentence structure?",
            "answers": [
                { "text": "A) A 2021 study showed cycling reduced congestion by 12%, yet businesses worried about parking.", "correct": false },
                { "text": "B) A 2021 study showed cycling reduced congestion by 12%; businesses worried about parking.", "correct": true },
                { "text": "C) A 2021 study showed cycling reduced congestion by 12%, with businesses worried about parking.", "correct": false },
                { "text": "D) A 2021 study showed cycling reduced congestion by 12%, businesses worrying about parking.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-grammar-sentence-structure"
        },
        {
            "passage": "The town of Willow Creek faced a water treatment upgrade in 2025. A 2023 study showed the plant failed 25% of federal standards, low-income families worried about costs. Engineer Zoe Patel proposed a $5 million overhaul, she cited health benefits. Resident Ellen Carter opposed it, she feared rate hikes. At a public hearing, Zoe suggested grants, it could offset expenses. The council delayed the vote, tensions remained high.",
            "question": "Which revision corrects the sentence 'A 2023 study showed the plant failed 25% of federal standards, low-income families worried about costs' to ensure proper sentence structure and clarity?",
            "answers": [
                { "text": "A) A 2023 study showed the plant failed 25% of federal standards, with low-income families worried about costs.", "correct": false },
                { "text": "B) A 2023 study showed the plant failed 25% of federal standards; low-income families worried about costs.", "correct": false },
                { "text": "C) A 2023 study showed that the plant failed 25% of federal standards, while low-income families worried about costs.", "correct": true },
                { "text": "D) A 2023 study showed the plant failed 25% of federal standards, low-income families worrying about costs.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "really hard",
            "category": "ged-grammar-sentence-structure"
        },
        {
            "passage": "In 2024, the town of Greystone debated a new public pool. A 2022 survey showed 60% of residents supported it many wanted summer recreation. Organizer Tara Chen argued it would boost community health. Local resident Paul Hayes opposed the plan he claimed it would raise taxes. At a council meeting Tara proposed a small entry fee to offset costs. The pool was approved but debates lingered.",
            "question": "Which revision correctly punctuates the sentence 'A 2022 survey showed 60% of residents supported it many wanted summer recreation'?",
            "answers": [
                { "text": "A) A 2022 survey showed 60% of residents supported it; many wanted summer recreation.", "correct": true },
                { "text": "B) A 2022 survey showed 60% of residents supported it, many wanted summer recreation.", "correct": false },
                { "text": "C) A 2022 survey showed 60% of residents supported it: many wanted summer recreation.", "correct": false },
                { "text": "D) A 2022 survey showed 60% of residents supported it many wanted summer recreation.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-punctuation-usage"
        },
        {
            "passage": "The city of Brookvale faced a traffic congestion issue in 2025. A 2023 study estimated a 15% increase in commute times residents demanded solutions. Engineer Liam Kim proposed a $2 million roundabout system. Business owner Clara Reed argued it would disrupt sales she prioritized parking. At a public forum Liam suggested timed traffic signals as an alternative. The council delayed the decision citing budget constraints.",
            "question": "Which revision correctly punctuates the sentence 'A 2023 study estimated a 15% increase in commute times residents demanded solutions'?",
            "answers": [
                { "text": "A) A 2023 study estimated a 15% increase in commute times, residents demanded solutions.", "correct": false },
                { "text": "B) A 2023 study estimated a 15% increase in commute times; residents demanded solutions.", "correct": true },
                { "text": "C) A 2023 study estimated a 15% increase in commute times: residents demanded solutions.", "correct": false },
                { "text": "D) A 2023 study estimated a 15% increase in commute times residents demanded solutions.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "medium",
            "category": "ged-punctuation-usage"
        },
        {
            "passage": "In 2023, the town of Elmfield debated a historic clock tower restoration. A 2021 report estimated $1 million in costs the structure was crumbling. Historian Maya Torres argued it preserved heritage. Developer Sam Carter pushed for demolition he proposed a modern plaza. At a council meeting Maya cited a 2020 petition with 1,500 signatures. The council approved partial restoration tensions remained.",
            "question": "Which revision correctly punctuates the sentence 'A 2021 report estimated $1 million in costs the structure was crumbling'?",
            "answers": [
                { "text": "A) A 2021 report estimated $1 million in costs; the structure was crumbling.", "correct": true },
                { "text": "B) A 2021 report estimated $1 million in costs, the structure was crumbling.", "correct": false },
                { "text": "C) A 2021 report estimated $1 million in costs: the structure was crumbling.", "correct": false },
                { "text": "D) A 2021 report estimated $1 million in costs the structure was crumbling.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-punctuation-usage"
        },
        {
            "passage": "The town of Pineview faced a school bus safety debate in 2024. A 2022 study showed 10% of buses lacked modern seatbelts parents were concerned. Superintendent Zoe Khan proposed a $500,000 upgrade. Taxpayer advocate Greg Lee opposed it he argued for lower taxes. At a board meeting Zoe suggested federal grants to cover costs. The plan was approved but some residents were skeptical.",
            "question": "Which revision correctly punctuates the sentence 'A 2022 study showed 10% of buses lacked modern seatbelts parents were concerned'?",
            "answers": [
                { "text": "A) A 2022 study showed 10% of buses lacked modern seatbelts, parents were concerned.", "correct": false },
                { "text": "B) A 2022 study showed 10% of buses lacked modern seatbelts; parents were concerned.", "correct": true },
                { "text": "C) A 2022 study showed 10% of buses lacked modern seatbelts: parents were concerned.", "correct": false },
                { "text": "D) A 2022 study showed 10% of buses lacked modern seatbelts parents were concerned.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-punctuation-usage"
        },
        {
            "passage": "In 2025, the city of Crestwood debated a new farmers market. A 2023 survey showed 75% of residents wanted local produce vendors needed space. Organizer Lena Patel proposed a $300,000 open-air market. Merchant Tom Hayes argued it would reduce parking he favored a smaller setup. At a council meeting Lena suggested a weekend-only market. The council approved the plan debates continued.",
            "question": "Which revision correctly punctuates the sentence 'A 2023 survey showed 75% of residents wanted local produce vendors needed space'?",
            "answers": [
                { "text": "A) A 2023 survey showed 75% of residents wanted local produce, vendors needed space.", "correct": false },
                { "text": "B) A 2023 survey showed 75% of residents wanted local produce: vendors needed space.", "correct": false },
                { "text": "C) A 2023 survey showed 75% of residents wanted local produce; vendors needed space.", "correct": true },
                { "text": "D) A 2023 survey showed 75% of residents wanted local produce vendors needed space.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-punctuation-usage"
        },
        {
            "passage": "The town of Fairview debated a wind turbine project in 2024. A 2022 report predicted it would power 2,000 homes wildlife could be affected. Environmentalist Noah Lee opposed the plan he cited bird migration risks. Developer Ava Kim supported it she emphasized clean energy. At a town hall Noah proposed stricter turbine placement rules. The council approved the project with conditions some residents were frustrated.",
            "question": "Which revision correctly punctuates the sentence 'A 2022 report predicted it would power 2,000 homes wildlife could be affected'?",
            "answers": [
                { "text": "A) A 2022 report predicted it would power 2,000 homes, wildlife could be affected.", "correct": false },
                { "text": "B) A 2022 report predicted it would power 2,000 homes; wildlife could be affected.", "correct": true },
                { "text": "C) A 2022 report predicted it would power 2,000 homes: wildlife could be affected.", "correct": false },
                { "text": "D) A 2022 report predicted it would power 2,000 homes wildlife could be affected.", "correct": false }
            ],
            "type": "rla",
            "difficulty": "hard",
            "category": "ged-punctuation-usage"
        },
        {
            "passage": "In 2023, the city of Riverton debated a historic bridge repair. A 2021 study showed it was unsafe repairs would cost $3 million. Engineer Clara Torres argued it was a cultural treasure she cited a 2020 petition. Business owner Ian Reed pushed for a new bridge he predicted tourism growth. At a council meeting Clara proposed a pedestrian bypass to save costs. The council delayed the decision budget concerns persisted.",
            "question": "Which revision correctly punctuates the sentence 'A 2021 study showed it was unsafe repairs would cost $3 million' to ensure proper punctuation and clarity?",
            "answers": [
                { "text": "A) A 2021 study showed it was unsafe, repairs would cost $3 million.", "correct": false },
                { "text": "B) A 2021 study showed it was unsafe: repairs would cost $3 million.", "correct": false },
                { "text": "C) A 2021 study showed it was unsafe; repairs would cost $3 million.", "correct": false },
                { "text": "D) A 2021 study showed that it was unsafe and that repairs would cost $3 million.", "correct": true }
            ],
            "type": "rla",
            "difficulty": "really hard",
            "category": "ged-punctuation-usage"
        }
    ];

    const mathQuestions = [
        {
            "passage": "",
            "question": "A store offers a 15% discount on a shirt originally priced at $40. What is the discount amount?",
            "answers": [
                { "text": "A) $6", "correct": true },
                { "text": "B) $5", "correct": false },
                { "text": "C) $8", "correct": false },
                { "text": "D) $10", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-basic-arithmetic"
        },
        {
            "passage": "",
            "question": "A recipe requires 2/3 cup of sugar for 4 servings. How much sugar is needed for 6 servings?",
            "answers": [
                { "text": "A) 1 cup", "correct": false },
                { "text": "B) 1/2 cup", "correct": false },
                { "text": "C) 1/3 cup", "correct": false },
                { "text": "D) 1/4 cup", "correct": true }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-basic-arithmetic"
        },
        {
            "passage": "",
            "question": "A worker earns $12.50 per hour. How much will they earn for working 6.5 hours?",
            "answers": [
                { "text": "A) $78.50", "correct": false },
                { "text": "B) $81.25", "correct": true },
                { "text": "C) $75.00", "correct": false },
                { "text": "D) $84.00", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-basic-arithmetic"
        },
        {
            "passage": "",
            "question": "A car travels 180 miles in 3 hours. What is the average speed in miles per hour?",
            "answers": [
                { "text": "A) 50", "correct": false },
                { "text": "B) 54", "correct": false },
                { "text": "C) 60", "correct": true },
                { "text": "D) 66", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-basic-arithmetic"
        },
        {
            "passage": "",
            "question": "A store sells apples at $0.80 per pound. If a customer buys 3.5 pounds and pays with a $5 bill, how much change will they receive?",
            "answers": [
                { "text": "A) $2.20", "correct": true },
                { "text": "B) $2.80", "correct": false },
                { "text": "C) $1.80", "correct": false },
                { "text": "D) $3.20", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-basic-arithmetic"
        },
        {
            "passage": "",
            "question": "A rectangular garden has a length of 12 meters and a width of 8 meters. If a fence costs $15 per meter, how much will it cost to fence the entire garden?",
            "answers": [
                { "text": "A) $360", "correct": false },
                { "text": "B) $480", "correct": false },
                { "text": "C) $600", "correct": true },
                { "text": "D) $720", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-basic-arithmetic"
        },
        {
            "passage": "",
            "question": "A bakery sells cookies at $1.50 each. If a customer buys 8 cookies and receives a 10% discount on the total, how much will they pay?",
            "answers": [
                { "text": "A) $10.80", "correct": true },
                { "text": "B) $12.00", "correct": false },
                { "text": "C) $9.60", "correct": false },
                { "text": "D) $11.50", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-basic-arithmetic"
        },
        {
            "passage": "",
            "question": "A tank holds 120 gallons of water. If 1/3 of the water is used and then 25% of the remaining water is added back, how many gallons are in the tank now?",
            "answers": [
                { "text": "A) 80", "correct": false },
                { "text": "B) 90", "correct": false },
                { "text": "C) 100", "correct": true },
                { "text": "D) 110", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-basic-arithmetic"
        },
        {
            "passage": "",
            "question": "If 3x - 7 = 11, what is the value of x?",
            "answers": [
                { "text": "A) 4", "correct": false },
                { "text": "B) 6", "correct": true },
                { "text": "C) 5", "correct": false },
                { "text": "D) 7", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "Solve for y: 2y + 9 = 5y - 3.",
            "answers": [
                { "text": "A) 4", "correct": true },
                { "text": "B) 3", "correct": false },
                { "text": "C) 5", "correct": false },
                { "text": "D) 6", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "What is the solution to the equation 4(x - 2) = 16?",
            "answers": [
                { "text": "A) 2", "correct": false },
                { "text": "B) 4", "correct": false },
                { "text": "C) 6", "correct": true },
                { "text": "D) 8", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "If 5x + 3 = 2x + 15, what is the value of x?",
            "answers": [
                { "text": "A) 3", "correct": false },
                { "text": "B) 4", "correct": true },
                { "text": "C) 5", "correct": false },
                { "text": "D) 6", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "Solve the system of equations: y = 2x + 1 and 3x - y = 4. What is the value of x?",
            "answers": [
                { "text": "A) 1", "correct": false },
                { "text": "B) 2", "correct": false },
                { "text": "C) 3", "correct": true },
                { "text": "D) 4", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "If 2(x + 3) - 5 = x + 4, what is the value of x?",
            "answers": [
                { "text": "A) 3", "correct": true },
                { "text": "B) 2", "correct": false },
                { "text": "C) 4", "correct": false },
                { "text": "D) 5", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "A line has a slope of -2 and passes through the point (1, 3). What is the y-intercept of the line?",
            "answers": [
                { "text": "A) 4", "correct": false },
                { "text": "B) 5", "correct": true },
                { "text": "C) 6", "correct": false },
                { "text": "D) 7", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "Solve the system of equations: 2x + 3y = 8 and x - 2y = -3. What is the value of y?",
            "answers": [
                { "text": "A) 1", "correct": false },
                { "text": "B) 2", "correct": true },
                { "text": "C) 3", "correct": false },
                { "text": "D) 4", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "If the equation of a line is 3x - 2y = 12, what is the slope of a line perpendicular to it?",
            "answers": [
                { "text": "A) -2/3", "correct": false },
                { "text": "B) 2/3", "correct": true },
                { "text": "C) 3/2", "correct": false },
                { "text": "D) -3/2", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "Solve the equation 3(x - 2)^2 = 27. What are the solutions for x?",
            "answers": [
                { "text": "A) x = 5, x = -1", "correct": true },
                { "text": "B) x = 4, x = 0", "correct": false },
                { "text": "C) x = 6, x = -2", "correct": false },
                { "text": "D) x = 3, x = 1", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-algebra"
        },
        {
            "passage": "",
            "question": "Solve the equation 5x - 8 = 12. What is the value of x?",
            "answers": [
                { "text": "A) 3", "correct": false },
                { "text": "B) 4", "correct": true },
                { "text": "C) 5", "correct": false },
                { "text": "D) 6", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-linear-equations"
        },
        {
            "passage": "",
            "question": "If 3y + 7 = 22, what is the value of y?",
            "answers": [
                { "text": "A) 4", "correct": false },
                { "text": "B) 5", "correct": true },
                { "text": "C) 6", "correct": false },
                { "text": "D) 7", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-linear-equations"
        },
        {
            "passage": "",
            "question": "A line has a slope of 2 and passes through the point (3, 5). What is the y-intercept of the line?",
            "answers": [
                { "text": "A) -1", "correct": true },
                { "text": "B) 0", "correct": false },
                { "text": "C) 1", "correct": false },
                { "text": "D) 2", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-linear-equations"
        },
        {
            "passage": "",
            "question": "Solve the system of equations: y = 3x - 2 and 2x + y = 13. What is the value of x?",
            "answers": [
                { "text": "A) 2", "correct": false },
                { "text": "B) 3", "correct": true },
                { "text": "C) 4", "correct": false },
                { "text": "D) 5", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-linear-equations"
        },
        {
            "passage": "",
            "question": "The equation of a line is 4x - 2y = 8. What is the slope of the line?",
            "answers": [
                { "text": "A) 1", "correct": false },
                { "text": "B) 2", "correct": true },
                { "text": "C) 3", "correct": false },
                { "text": "D) 4", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-linear-equations"
        },
        {
            "passage": "",
            "question": "Solve the system of equations: 3x + 2y = 7 and x - y = 1. What is the value of y?",
            "answers": [
                { "text": "A) 1", "correct": true },
                { "text": "B) 2", "correct": false },
                { "text": "C) 3", "correct": false },
                { "text": "D) 4", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-linear-equations"
        },
        {
            "passage": "",
            "question": "A line has a slope of -3 and passes through the point (2, -1). What is the equation of the line in slope-intercept form?",
            "answers": [
                { "text": "A) y = -3x + 5", "correct": true },
                { "text": "B) y = -3x + 7", "correct": false },
                { "text": "C) y = -3x + 3", "correct": false },
                { "text": "D) y = -3x + 1", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-linear-equations"
        },
        {
            "passage": "",
            "question": "The equation of a line is 2x + 5y = 10. What is the slope of a line perpendicular to it?",
            "answers": [
                { "text": "A) -5/2", "correct": false },
                { "text": "B) 5/2", "correct": true },
                { "text": "C) -2/5", "correct": false },
                { "text": "D) 2/5", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-linear-equations"
        },
        {
            "passage": "",
            "question": "A rectangle has a length of 10 meters and a width of 6 meters. What is its area?",
            "answers": [
                { "text": "A) 50 square meters", "correct": false },
                { "text": "B) 60 square meters", "correct": true },
                { "text": "C) 70 square meters", "correct": false },
                { "text": "D) 80 square meters", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-geometry"
        },
        {
            "passage": "",
            "question": "The perimeter of a square is 36 meters. What is the length of one side?",
            "answers": [
                { "text": "A) 6 meters", "correct": false },
                { "text": "B) 7 meters", "correct": false },
                { "text": "C) 8 meters", "correct": false },
                { "text": "D) 9 meters", "correct": true }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-geometry"
        },
        {
            "passage": "",
            "question": "A triangle has a base of 8 cm and a height of 5 cm. What is its area?",
            "answers": [
                { "text": "A) 20 square cm", "correct": true },
                { "text": "B) 25 square cm", "correct": false },
                { "text": "C) 30 square cm", "correct": false },
                { "text": "D) 40 square cm", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-geometry"
        },
        {
            "passage": "",
            "question": "A circle has a radius of 4 meters. What is its circumference? (Use π ≈ 3.14)",
            "answers": [
                { "text": "A) 12.56 meters", "correct": false },
                { "text": "B) 25.12 meters", "correct": true },
                { "text": "C) 50.24 meters", "correct": false },
                { "text": "D) 16 meters", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-geometry"
        },
        {
            "passage": "",
            "question": "A rectangular prism has a length of 5 cm, a width of 3 cm, and a height of 4 cm. What is its volume?",
            "answers": [
                { "text": "A) 60 cubic cm", "correct": true },
                { "text": "B) 50 cubic cm", "correct": false },
                { "text": "C) 70 cubic cm", "correct": false },
                { "text": "D) 80 cubic cm", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-geometry"
        },
        {
            "passage": "",
            "question": "A right triangle has legs of 6 cm and 8 cm. What is the length of the hypotenuse?",
            "answers": [
                { "text": "A) 9 cm", "correct": false },
                { "text": "B) 10 cm", "correct": true },
                { "text": "C) 11 cm", "correct": false },
                { "text": "D) 12 cm", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-geometry"
        },
        {
            "passage": "",
            "question": "A cylinder has a radius of 3 meters and a height of 5 meters. What is its surface area? (Use π ≈ 3.14)",
            "answers": [
                { "text": "A) 94.2 square meters", "correct": false },
                { "text": "B) 131.88 square meters", "correct": true },
                { "text": "C) 150.72 square meters", "correct": false },
                { "text": "D) 169.56 square meters", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-geometry"
        },
        {
            "passage": "A survey of 200 residents in a town showed the following preferences for a new park: 80 preferred a playground, 60 preferred a walking trail, 40 preferred a picnic area, and 20 had no preference.",
            "question": "What percentage of residents preferred a playground?",
            "answers": [
                { "text": "A) 30%", "correct": false },
                { "text": "B) 40%", "correct": true },
                { "text": "C) 50%", "correct": false },
                { "text": "D) 60%", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-data-interpretation"
        },
        {
            "passage": "A store recorded sales of four products over a week: Product A sold 150 units, Product B sold 200 units, Product C sold 100 units, and Product D sold 50 units.",
            "question": "What fraction of the total units sold were Product B?",
            "answers": [
                { "text": "A) 1/5", "correct": false },
                { "text": "B) 2/5", "correct": true },
                { "text": "C) 1/3", "correct": false },
                { "text": "D) 1/2", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-data-interpretation"
        },
        {
            "passage": "A company's monthly expenses are shown in a table: Rent: $2,000, Utilities: $500, Salaries: $4,500, Supplies: $1,000.",
            "question": "What is the ratio of rent to total expenses?",
            "answers": [
                { "text": "A) 1:3", "correct": false },
                { "text": "B) 1:4", "correct": true },
                { "text": "C) 1:5", "correct": false },
                { "text": "D) 1:6", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-data-interpretation"
        },
        {
            "passage": "A bar graph shows the number of books sold by a bookstore over four months: January: 120, February: 150, March: 180, April: 90.",
            "question": "What is the average number of books sold per month?",
            "answers": [
                { "text": "A) 130", "correct": true },
                { "text": "B) 140", "correct": false },
                { "text": "C) 150", "correct": false },
                { "text": "D) 160", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-data-interpretation"
        },
        {
            "passage": "A pie chart shows the distribution of a school's budget: 50% for salaries, 20% for facilities, 15% for supplies, 10% for extracurriculars, and 5% for other expenses.",
            "question": "If the total budget is $200,000, how much is allocated for supplies?",
            "answers": [
                { "text": "A) $20,000", "correct": false },
                { "text": "B) $30,000", "correct": true },
                { "text": "C) $40,000", "correct": false },
                { "text": "D) $50,000", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-data-interpretation"
        },
        {
            "passage": "A line graph shows a city's average monthly temperatures: January: 30°F, February: 35°F, March: 45°F, April: 55°F.",
            "question": "What is the percent increase in temperature from February to April?",
            "answers": [
                { "text": "A) 50%", "correct": false },
                { "text": "B) 57.14%", "correct": true },
                { "text": "C) 60%", "correct": false },
                { "text": "D) 66.67%", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-data-interpretation"
        },
        {
            "passage": "A table shows a company's sales data for three products over two years: Product X (Year 1: 500 units, Year 2: 600 units), Product Y (Year 1: 300 units, Year 2: 450 units), Product Z (Year 1: 200 units, Year 2: 150 units).",
            "question": "What is the percent change in total units sold from Year 1 to Year 2?",
            "answers": [
                { "text": "A) 10%", "correct": false },
                { "text": "B) 12.5%", "correct": true },
                { "text": "C) 15%", "correct": false },
                { "text": "D) 20%", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-data-interpretation"
        },
        {
            "passage": "",
            "question": "A store offers a 20% discount on a $50 jacket. After the discount, a 5% sales tax is applied. What is the final price?",
            "answers": [
                { "text": "A) $42.00", "correct": true },
                { "text": "B) $40.00", "correct": false },
                { "text": "C) $43.50", "correct": false },
                { "text": "D) $45.00", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-word-problems"
        },
        {
            "passage": "",
            "question": "A recipe calls for 3/4 cup of flour for 12 cookies. How many cups of flour are needed for 36 cookies?",
            "answers": [
                { "text": "A) 1.5 cups", "correct": false },
                { "text": "B) 2.25 cups", "correct": true },
                { "text": "C) 3 cups", "correct": false },
                { "text": "D) 2.5 cups", "correct": false }
            ],
            "type": "math",
            "difficulty": "medium",
            "category": "ged-word-problems"
        },
        {
            "passage": "",
            "question": "A car rental company charges $30 per day plus $0.25 per mile driven. If a customer rents a car for 2 days and drives 120 miles, what is the total cost?",
            "answers": [
                { "text": "A) $80", "correct": false },
                { "text": "B) $85", "correct": false },
                { "text": "C) $90", "correct": true },
                { "text": "D) $95", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-word-problems"
        },
        {
            "passage": "",
            "question": "A painter needs to cover a wall that is 12 feet wide and 8 feet tall. One can of paint covers 48 square feet. How many cans are needed to cover the wall with two coats?",
            "answers": [
                { "text": "A) 3", "correct": false },
                { "text": "B) 4", "correct": true },
                { "text": "C) 5", "correct": false },
                { "text": "D) 6", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-word-problems"
        },
        {
            "passage": "",
            "question": "A worker earns $15 per hour for the first 40 hours and $22.50 per hour for overtime. If they work 46 hours in a week, what are their total earnings?",
            "answers": [
                { "text": "A) $690", "correct": true },
                { "text": "B) $720", "correct": false },
                { "text": "C) $675", "correct": false },
                { "text": "D) $705", "correct": false }
            ],
            "type": "math",
            "difficulty": "hard",
            "category": "ged-word-problems"
        },
        {
            "passage": "",
            "question": "A store sells apples at $0.60 per pound and oranges at $0.80 per pound. If a customer buys 3.5 pounds of apples and 2 pounds of oranges and pays with a $5 bill, how much change will they receive?",
            "answers": [
                { "text": "A) $1.30", "correct": false },
                { "text": "B) $1.50", "correct": true },
                { "text": "C) $1.70", "correct": false },
                { "text": "D) $1.90", "correct": false }
            ],
            "type": "math",
            "difficulty": "really hard",
            "category": "ged-word-problems"
        }

    ];

    const scienceQuestions = [
        {
            passage: "A researcher studied plant growth under different light conditions. Plants were exposed to red, blue, or white light for 12 hours daily. After 4 weeks, plant height was measured. Results: red light (15 cm), blue light (20 cm), white light (18 cm).",
            question: "Which light condition resulted in the tallest plants?",
            answers: [
                { text: "A) Red", correct: false },
                { text: "B) Blue", correct: true },
                { text: "C) White", correct: false },
                { text: "D) None", correct: false }
            ],
            type: "science",
            difficulty: "medium",
            category: "ged-science"
        },
        {
            passage: "The researcher also tested water pH levels (5, 7, 9) on plant growth...",
            question: "If plants at pH 7 grew 18 cm, and pH 9 grew 15 cm, how does pH affect growth?",
            answers: [
                { text: "A) Higher pH increases growth", correct: false },
                { text: "B) Lower pH increases growth", correct: true },
                { text: "C) pH has no effect", correct: false },
                { text: "D) Neutral pH decreases growth", correct: false }
            ],
            type: "science",
            difficulty: "medium",
            category: "ged-science"
        }
    ];

    const socialStudiesQuestions = [
        {
            passage: "In 1963, the March on Washington drew over 200,000 people to demand civil rights. Martin Luther King Jr. delivered his 'I Have a Dream' speech, calling for racial equality. The event pressured Congress to pass the Civil Rights Act of 1964.",
            question: "What was the primary goal of the March on Washington?",
            answers: [
                { text: "A) Economic reform", correct: false },
                { text: "B) Civil rights legislation", correct: true },
                { text: "C) Voting rights", correct: false },
                { text: "D) Education reform", correct: false }
            ],
            type: "social studies",
            difficulty: "medium",
            category: "ged-social-studies"
        },
        {
            passage: "In 1963, the March on Washington drew over 200,000 people...",
            question: "What legislation was influenced by the March?",
            answers: [
                { text: "A) Voting Rights Act", correct: false },
                { text: "B) Civil Rights Act", correct: true },
                { text: "C) Fair Housing Act", correct: false },
                { text: "D) Equal Pay Act", correct: false }
            ],
            type: "social studies",
            difficulty: "medium",
            category: "ged-social-studies"
        }
    ];

    // Start Test
    function startTest() {
        if (!gedIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        gedIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startRlaSection();
    }

    // Section Starters
// Section Starters (with logging)
function startRlaSection() {
    console.log("Starting RLA section");
    currentSection = "rla";
    time = 150 * 60;
    rlaResponses = [];
    score = 0;
    correctAnswers = 0;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endRlaSection, 150 * 60 * 1000);
    startQuiz(rlaQuestions);
}

function startMathSection() {
    console.log("Starting Math section");
    currentSection = "math";
    time = 115 * 60;
    mathResponses = [];
    score = 0;
    correctAnswers = 0;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endMathSection, 115 * 60 * 1000);
    startQuiz(mathQuestions);
}

function startScienceSection() {
    console.log("Starting Science section");
    currentSection = "science";
    time = 90 * 60;
    scienceResponses = [];
    score = 0;
    correctAnswers = 0;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endScienceSection, 90 * 60 * 1000);
    passageElement.innerHTML = "";
    startQuiz(scienceQuestions);
}

function startSocialStudiesSection() {
    console.log("Starting Social Studies section");
    currentSection = "social studies";
    time = 70 * 60;
    socialStudiesResponses = [];
    score = 0;
    correctAnswers = 0;
    refreshIntervalId = setInterval(updateCountdown, 1000);
    setTimeout(endSocialStudiesSection, 70 * 60 * 1000);
    passageElement.innerHTML = "";
    startQuiz(socialStudiesQuestions);
}

    // Timer
    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        if (time === 0) {
            clearInterval(refreshIntervalId);
            switch (currentSection) {
                case "rla": endRlaSection(); break;
                case "math": endMathSection(); break;
                case "science": endScienceSection(); break;
                case "social studies": endSocialStudiesSection(); break;
            }
        } else {
            time--;
        }
    }

    // Section Enders
    function endRlaSection() {
        clearInterval(refreshIntervalId);
        recordTestResults();
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathSection() {
        clearInterval(refreshIntervalId);
        recordTestResults();
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endScienceSection() {
        clearInterval(refreshIntervalId);
        recordTestResults();
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endSocialStudiesSection() {
        clearInterval(refreshIntervalId);
        recordTestResults();
        resetState();
        showFinalScore();
        testCompleted = true;
        recordTestResults();
    }

    // Start Quiz
    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for", currentSection);
            return;
        }
        const missingPassages = questions.filter(q => !q.passage || q.passage.trim() === "");
        if (missingPassages.length > 0 && currentSection !== "math") {
            console.warn(`Warning: ${missingPassages.length} questions in ${currentSection} lack a valid passage`);
        }
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        categoryStats = {};
        selectedQuestions = questions;
        nextButton.innerHTML = "Next";

        document.querySelector(".question-row").classList.remove("score-display");

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("rla-section", "math-section", "science-section", "social-studies-section");
        questionRow.classList.add(`${currentSection.replace(" ", "-")}-section`);

        showQuestion();
    }

    // Show Question
    function showQuestion() {
        resetState();
        if (!selectedQuestions[currentQuestionIndex]) {
            console.error("No question available at index", currentQuestionIndex);
            return;
        }
        let currentQuestion = selectedQuestions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        console.log(`Displaying question ${questionNo} in ${currentSection}, passage:`, currentQuestion.passage || "No passage");
        passageElement.style.display = currentSection === "math" ? "none" : "block";
        passageElement.innerHTML = currentQuestion.passage || "";
        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

        const questionRow = document.querySelector(".question-row");
        questionRow.classList.remove("score-display");
        questionElement.classList.remove("centered-score");

        currentQuestion.answers.forEach((answer) => {
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

    // Reset State
    function resetState() {
        nextButton.style.display = "none";
        nextButton.classList.remove("centered-btn");
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    // Select Answer
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
        const safePassage = currentQuestion.passage || "No passage provided";
        const safeQuestion = currentQuestion.question || "No question provided";
        const responseQuestion = currentSection === "math" ? safeQuestion : safePassage + "<br/><br/>" + safeQuestion;

        console.log("Creating user response:", currentSection, ":", {
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        });

        const response = {
            section: currentSection,
            question: responseQuestion,
            userAnswer: selectedBtn.innerHTML,
            correctAnswer: correctAnswer,
            wasCorrect: isCorrect
        };

        if (currentSection === "rla") rlaResponses.push(response);
        else if (currentSection === "math") mathResponses.push(response);
        else if (currentSection === "science") scienceResponses.push(response);
        else if (currentSection === "social studies") socialStudiesResponses.push(response);

        if (isCorrect) {
            selectedBtn.classList.add("correct");
            correctAnswers++;
            if (questionDifficulty === "easy") score += 1;
            else if (questionDifficulty === "medium") score += 2;
            else if (questionDifficulty === "hard") score += 3;
            categoryStats[questionCategory].correct++;
        } else {
            selectedBtn.classList.add("incorrect");
            categoryStats[questionCategory].incorrect++;
        }

        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") button.classList.add("correct");
            button.disabled = true;
        });

        recordTestResults();

        nextButton.style.display = "block";
        nextButton.disabled = false;
    }

    // Show Score
// Show Score (with logging)
function showScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let maxPossibleScore = (10 * 1) + (10 * 2) + (10 * 3);
    let rawScore = score;
    let scaledScore = Math.round((rawScore / maxPossibleScore) * 100 + 100);

    console.log(`Saving ${currentSection} score: ${scaledScore}/200`);

    document.getElementById("question-container").classList.remove("hide");
    localStorage.setItem(currentSection + "Score", scaledScore);
    passageElement.innerHTML = "";
    questionElement.innerHTML = `${currentSection.toUpperCase()} GED Score: ${scaledScore} / 200`;
    questionElement.classList.add("centered-score");

    document.querySelector(".question-row").classList.add("score-display");
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");
}

    // Show Final Score
// Show Final Score (with logging and fallback)
function showFinalScore() {
    clearInterval(refreshIntervalId);
    resetState();

    let rlaScore = parseInt(localStorage.getItem("rlaScore") || 100, 10);
    let mathScore = parseInt(localStorage.getItem("mathScore") || 100, 10);
    let scienceScore = parseInt(localStorage.getItem("scienceScore") || 100, 10);
    let socialStudiesScore = parseInt(localStorage.getItem("socialStudiesScore") || 100, 10);

    let today = new Date().toLocaleDateString("en-CA");
    let scoreHistory = JSON.parse(localStorage.getItem("gedScoreHistory")) || {};
    scoreHistory[today] = {
        rla: rlaScore,
        math: mathScore,
        science: scienceScore,
        socialStudies: socialStudiesScore,
        total: rlaScore + mathScore + scienceScore + socialStudiesScore
    };
    localStorage.setItem("gedScoreHistory", JSON.stringify(scoreHistory));

    console.log(`Final GED scores saved for ${today}:`, scoreHistory[today]);

    saveTestCompletion("GED");

    document.getElementById("question-container").classList.remove("hide");
    passageElement.innerHTML = "";
    questionElement.innerHTML = `
        <p><strong>RLA GED Score:</strong> ${rlaScore} / 200</p>
        <p><strong>Math GED Score:</strong> ${mathScore} / 200</p>
        <p><strong>Science GED Score:</strong> ${scienceScore} / 200</p>
        <p><strong>Social Studies GED Score:</strong> ${socialStudiesScore} / 200</p>`;
    questionElement.classList.add("centered-score");
    document.querySelector(".question-row").classList.add("score-display");

    nextButton.innerHTML = "Review Incorrect Answers";
    nextButton.style.display = "block";
    nextButton.classList.add("centered-btn");
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", showExplanations);
}

    // Save Test Completion
    function saveTestCompletion(examType) {
        const completionData = {
            exam: examType,
            type: "test",
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("lastActivity", JSON.stringify(completionData));
    }

    // Show Explanations
    function showExplanations() {
        console.log("Entering showExplanations");
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "<h2>Review of Incorrect Answers</h2>";
        questionElement.style.overflowY = "scroll";
        questionElement.style.maxHeight = "80vh";

        const allResponses = [
            ...rlaResponses.map(r => ({ ...r, section: "rla" })),
            ...mathResponses.map(r => ({ ...r, section: "math" })),
            ...scienceResponses.map(r => ({ ...r, section: "science" })),
            ...socialStudiesResponses.map(r => ({ ...r, section: "social studies" }))
        ];

        const incorrectResponses = allResponses.filter(
            response => response && response.wasCorrect === false && response.section
        );
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);

        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            const sections = ["rla", "math", "science", "social studies"];
            sections.forEach(section => {
                const sectionResponses = incorrectResponses.filter(res => res.section === section);
                if (sectionResponses.length > 0) {
                    const sectionDiv = document.createElement("div");
                    sectionDiv.innerHTML = `<h3>${section.charAt(0).toUpperCase() + section.slice(1)} Section</h3>`;
                    sectionResponses.forEach((response, index) => {
                        console.log(`Processing ${section} response ${index + 1}:`, response);
                        const explanation = generateExplanation(response);
                        console.log(`Explanation for ${section} response ${index + 1}:`, explanation);
                        const div = document.createElement("div");
                        div.className = "explanation";
                        div.innerHTML = `
                            <h4>Question ${index + 1}</h4>
                            <p><strong>Question:</strong> ${response.question || "Missing question"}</p>
                            <p><strong>Your Answer:</strong> ${response.userAnswer || "N/A"}</p>
                            <p><strong>Correct Answer:</strong> ${response.correctAnswer || "N/A"}</p>
                            <p><strong>Explanation:</strong> ${explanation}</p>
                        `;
                        sectionDiv.appendChild(div);
                    });
                    fragment.appendChild(sectionDiv);
                }
            });
            console.log("Appending to questionElement:", questionElement);
            questionElement.appendChild(fragment);
        }

        console.log("Setting Finish button");
        nextButton.innerHTML = "Finish";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", showExplanations);
        nextButton.addEventListener("click", () => {
            window.location.href = "https://www.brainjelli.com/user-profile.html";
        });
    }

    // Generate Explanations
    function generateExplanation(response) {
        const questionText = response.question || "";
    
        // RLA Questions
        if (questionText === "What is the primary purpose of including Dr. Alan Chen’s data in the passage?") {
            return "Dr. Alan Chen’s data shows seawalls reduced fish populations by 15%, supporting the fishermen’s concerns about marine ecosystems. Option B is correct. A is incorrect as the data does not address economic benefits. C is incorrect as it focuses on dune restoration, not Chen’s data. D is incorrect as the data supports the fishermen, not a direct criticism of the council.";
        } else if (questionText === "Which phrase best describes the tone of the passage?") {
            return "The passage presents the drought debate factually, without emotional or critical language, making the tone neutral and informative. Option D is correct. A is incorrect as the passage lacks emotional confrontation. B is incorrect as it is not dismissive. C is incorrect as the debate shows tension, not optimism.";
        } else if (questionText === "What does the inclusion of the 2022 survey data suggest about the residents’ priorities?") {
            return "The 2022 survey shows 65% want digital resources and 55% prioritize road repairs, indicating competing priorities for city funds. Option D is correct. A is incorrect as residents are not indifferent. B is incorrect as the survey does not prioritize digital resources over repairs. C is incorrect as support is not unanimous.";
        } else if (questionText === "Which word should replace 'proposed' in the sentence 'Developer Emma Carter proposed a 200-unit apartment complex' to maintain a formal tone?") {
            return "‘Recommended’ maintains a formal tone suitable for a developer’s proposal. Option D is correct. A (‘urged’) is too insistent, B (‘pitched’) is informal, and C (‘suggested’) is less formal than ‘recommended.’";
        } else if (questionText === "What is the main conflict described in the passage?") {
            return "The conflict is between preserving the train station (Clara’s view) and modernizing it (Mark’s view). Option C is correct. A is incorrect as the petition is not the main issue. B is incorrect as it’s not about leadership. D is incorrect as budget constraints are secondary.";
        } else if (questionText === "What assumption underlies Rachel Kim’s argument for school consolidation?") {
            return "Rachel assumes consolidation improves educational outcomes, citing a study on test score improvements. Option D is correct. A is incorrect as she does not assume indefinite decline. B is incorrect as shared facilities are not discussed. C is incorrect as she does not address parents’ priorities.";
        } else if (questionText === "How does the 2024 survey contribute to Ian Brooks’ argument?") {
            return "The 2024 survey shows 60% support renewable energy, bolstering Ian’s case for the wind farm. Option C is correct. A is incorrect as it does not undermine environmental concerns. B is incorrect as it supports economic benefits. D is incorrect as it does not prioritize wildlife.";
        } else if (questionText === "Which statement best summarizes the role of the 2020 study in Ava Singh’s argument?") {
            return "The 2020 study links parks to a 10% drop in youth crime, supporting Ava’s argument for social benefits. Option D is correct. A is incorrect as it does not address taxes. B is incorrect as it does not refute Eric’s position. C is incorrect as it does not prioritize parks over budget.";
        } else if (questionText === "What is the effect of replacing 'worried' with 'speculated' in the sentence 'Resident Sophia Patel worried about air pollution'?") {
            return "‘Speculated’ suggests uncertainty, weakening Sophia’s position compared to the concern implied by ‘worried.’ Option C is correct. A is incorrect as it does not shift focus to upgrades. B is incorrect as the tone changes. D is incorrect as it does not strengthen her argument.";
        } else if (questionText === "What inference can be made about the council’s priorities based on the passage?") {
            return "The council’s delay due to budget concerns suggests they prioritize cost management over environmental goals. Option D is correct. A is incorrect as alignment with national averages is not stated. B is incorrect as subsidies are only suggested. C is incorrect as recycling is not prioritized.";
        } else if (questionText === "Which statement best evaluates the strength of Raj Patel’s argument relative to Mia Torres’ argument?") {
            return "Raj’s argument, based on economic data ($10 million revenue), is stronger than Mia’s emotional appeal to heritage. Option D is correct. A is incorrect as it assumes Raj’s argument is weaker. B is incorrect as Mia’s argument is less data-driven. C is incorrect as Mia’s support is not stronger.";
        } else if (questionText === "What underlying assumption in Zoe Khan’s proposal might Carl Weaver’s argument challenge?") {
            return "Zoe assumes residents prioritize water quality, which Carl challenges by highlighting cost concerns. Option C is correct. A is incorrect as Carl does not dispute illnesses. B is incorrect as the 2020 case is not questioned. D is incorrect as grants are a suggestion, not an assumption.";
        } else if (questionText === "What is the central idea of the passage?") {
            return "The passage centers on upgrading public transportation for environmental benefits, as Anna emphasizes electric buses. Option A is correct. B is incorrect as economic challenges are secondary. C is incorrect as merchant-council conflict is not central. D is incorrect as taxes are a concern, not the focus.";
        } else if (questionText === "What is the main idea conveyed by the passage?") {
            return "The passage focuses on the community center’s benefit in reducing youth crime, as Lila’s argument highlights. Option A is correct. B is incorrect as financial constraints are secondary. C is incorrect as taxpayers oppose costs, not programs. D is incorrect as donations are a suggestion.";
        } else if (questionText === "What is the central focus of the passage?") {
            return "The passage balances cultural preservation (Elena’s flood barrier) with economic development (Omar’s condos). Option A is correct. B is incorrect as it focuses only on condos. C is incorrect as floods are a context, not the focus. D is incorrect as surveys are supporting details.";
        } else if (questionText === "What is the main idea of the passage?") {
            return "The passage emphasizes sustainable waste management through Noah’s recycling proposal. Option A is correct. B is incorrect as financial burden is a counterargument. C is incorrect as landfill expansion is not the focus. D is incorrect as composting is a suggestion.";
        } else if (questionText === "What is the central idea presented in the passage?") {
            return "The passage focuses on promoting sustainable transportation via bike lanes, as Maya advocates. Option A is correct. B is incorrect as parking impact is a counterargument. C is incorrect as budget priorities are secondary. D is incorrect as compromise is an outcome, not the idea.";
        } else if (questionText === "What is the main focus of the passage?") {
            return "The passage balances renewable energy (solar farm) with agricultural preservation (farmland concerns). Option A is correct. B is incorrect as economic benefits are part of the argument. C is incorrect as opposition is a perspective. D is incorrect as surveys are supporting details.";
        } else if (questionText === "What is the central idea of the passage, and how do the arguments of Lila Patel and Ian Brooks contribute to it?") {
            return "The central idea is the tension between cultural preservation (Lila’s heritage focus) and economic development (Ian’s job creation). Option A is correct. B is incorrect as Lila’s plan is not primarily about revenue. C is incorrect as it misrepresents community resistance. D is incorrect as council indecision is an outcome.";
        } else if (questionText === "What is the main idea of the passage, and how does the 2020 report support it?") {
            return "The passage focuses on improving healthcare access via hospital expansion, with the 2020 report showing reduced emergencies as a benefit. Option C is correct. A is incorrect as delay is not the main idea. B is incorrect as it misrepresents the report’s role. D is incorrect as the report does not focus on costs.";
        } else if (questionText === "Why does the author include the 2022 survey in the passage?") {
            return "The 2022 survey (55% support local art) highlights community interest in public art, supporting Lena’s argument. Option B is correct. A is incorrect as support is not unanimous. C is incorrect as it does not address road repairs. D is incorrect as it does not criticize the council.";
        } else if (questionText === "What can be inferred about Clara Nguyen’s priorities based on her actions?") {
            return "Clara’s concern about noise pollution and suggestion of regulations indicate she prioritizes resident health and quality of life. Option B is correct. A is incorrect as she does not value economic growth. C is incorrect as she supports restricted development. D is incorrect as she does not seek indefinite delay.";
        } else if (questionText === "What is the author’s purpose in mentioning Maria Gomez’s argument?") {
            return "Maria’s argument against the curfew highlights a counterargument, showing the debate’s complexity. Option C is correct. A is incorrect as it does not advocate unrestricted activities. B is incorrect as it does not criticize parents. D is incorrect as it does not undermine the curfew’s need.";
        } else if (questionText === "What can be inferred about the author’s purpose in including the 2020 report?") {
            return "The 2020 report (broadband boosts economies) supports Omar’s argument for economic benefits of internet expansion. Option B is correct. A is incorrect as it does not address environmental risks. C is incorrect as it does not question reliability. D is incorrect as it does not highlight agriculture.";
        } else if (questionText === "What can be inferred about Ava Carter’s stance based on her argument?") {
            return "Ava’s concern about traffic congestion suggests she prioritizes traffic management over business growth. Option A is correct. B is incorrect as she does not support merchants. C is incorrect as she does not oppose all development. D is incorrect as she does not seek to reduce parking.";
        } else if (questionText === "Why does the author include the 2021 study in the passage?") {
            return "The 2021 study (libraries increase literacy) bolsters Zoe’s argument for maintaining library funding. Option B is correct. A is incorrect as it contradicts the study’s purpose. C is incorrect as it does not criticize Greg’s position. D is incorrect as it does not highlight tax reductions.";
        } else if (questionText === "What can be inferred about Sam Holt’s priorities based on his argument?") {
            return "Sam’s concern about construction delays indicates he prioritizes business operations over recreational projects. Option C is correct. A is incorrect as he does not seek property value increases. B is incorrect as he does not support trails. D is incorrect as he does not value health over economics.";
        } else if (questionText === "What is the author’s purpose in presenting both Maya Torres’ and Ian Brooks’ arguments?") {
            return "Presenting Maya’s preservation argument and Ian’s economic argument illustrates competing values of heritage and growth. Option D is correct. A is incorrect as it does not emphasize lack of consensus. B is incorrect as it does not criticize the council. C is incorrect as it does not advocate for the retail complex.";
        } else if (questionText === "What can be inferred about the author’s purpose in including both the 2020 report and the 2022 survey, and how do they shape the passage’s perspective?") {
            return "The 2020 report (plastic pollution reduction) and 2022 survey (60% oppose ban) present a balanced view of environmental benefits versus public opposition, highlighting the debate’s complexity. Option A is correct. B is incorrect as it does not advocate the ban. C is incorrect as it does not criticize the council. D is incorrect as it does not undermine the retailer.";
        } else if (questionText === "What can be inferred about Omar Khan’s priorities, and why does the author include the 2023 poll in the passage?") {
            return "Omar prioritizes student outcomes (school upgrades), and the 2023 poll (65% oppose tax increases) highlights public resistance, showing the debate’s complexity. Option A is correct. B is incorrect as Omar does not seek tax increases. C is incorrect as Omar supports renovations. D is incorrect as Omar does not focus on cost management.";
        } else if (questionText === "Which revision corrects the sentence 'A 2022 survey showed 65% of residents supported it, many wanted to grow their own food' to improve sentence structure?") {
            return "Option A (‘A 2022 survey showed that 65% of residents supported it, and many wanted to grow their own food.’) uses a conjunction (‘and’) and ‘that’ for clarity and proper structure. B is incorrect due to awkward phrasing. C is incorrect as it lacks a subject. D is incorrect due to incorrect grammar (‘wanted’).";
        } else if (questionText === "Which revision corrects the sentence 'A 2023 report estimated costs at $2 million, the building needed modern upgrades' to ensure proper sentence structure?") {
            return "Option C (‘A 2023 report estimated costs at $2 million because the building needed modern upgrades.’) uses ‘because’ to connect the clauses logically. A is incorrect as a semicolon does not show causation. B is incorrect as ‘but’ implies contrast. D is incorrect due to awkward phrasing.";
        } else if (questionText === "Which revision corrects the sentence 'A 2021 study showed only 20% of waste was recycled, residents needed better options' to improve sentence clarity and structure?") {
            return "Option B (‘A 2021 study showed that only 20% of waste was recycled, so residents needed better options.’) uses ‘that’ and ‘so’ for clarity and logical connection. A is incorrect due to awkward phrasing. C is incorrect as it lacks a subject. D is incorrect due to incorrect grammar.";
        } else if (questionText === "Which revision corrects the sentence 'A 2022 report predicted it would power 4,000 homes, farmland would be sacrificed' to ensure proper sentence structure?") {
            return "Option C (‘A 2022 report predicted it would power 4,000 homes, yet farmland would be sacrificed.’) uses ‘yet’ to show contrast clearly. A is incorrect as it lacks a conjunction. B is incorrect as ‘however’ is less concise. D is incorrect as it lacks proper connection.";
        } else if (questionText === "Which revision corrects the sentence 'A 2023 survey showed 70% of residents wanted more green spaces, youth programs were also needed' to improve sentence structure and clarity?") {
            return "Option D (‘A 2023 survey showed that 70% of residents wanted more green spaces and that youth programs were also needed.’) uses ‘that’ and ‘and’ for clarity and parallelism. A, B, and C are incorrect as they do not fully clarify the relationship between clauses.";
        } else if (questionText === "Which revision corrects the sentence 'Historian Lila Khan argued it preserved heritage, she cited a 2021 petition' to ensure proper sentence structure?") {
            return "Option A (‘Historian Lila Khan argued it preserved heritage; she cited a 2021 petition.’) uses a semicolon to join related independent clauses. B is less formal with a participle. C is awkward with ‘with.’ D is incorrect due to improper grammar (‘she citing’).";
        } else if (questionText === "Which revision corrects the sentence 'A 2021 study showed cycling reduced congestion by 12%, businesses worried about parking' to improve sentence structure?") {
            return "Option B (‘A 2021 study showed cycling reduced congestion by 12%; businesses worried about parking.’) uses a semicolon to join independent clauses. A is incorrect as ‘yet’ implies unnecessary contrast. C and D are incorrect due to awkward or improper phrasing.";
        } else if (questionText === "Which revision corrects the sentence 'A 2023 study showed the plant failed 25% of federal standards, low-income families worried about costs' to ensure proper sentence structure and clarity?") {
            return "Option C (‘A 2023 study showed that the plant failed 25% of federal standards, while low-income families worried about costs.’) uses ‘that’ and ‘while’ for clarity and contrast. A, B, and D are incorrect as they do not clearly connect the clauses.";
        } else if (questionText === "Which revision correctly punctuates the sentence 'A 2022 survey showed 60% of residents supported it many wanted summer recreation'?") {
            return "Option A (‘A 2022 survey showed 60% of residents supported it; many wanted summer recreation.’) uses a semicolon to separate independent clauses. B lacks punctuation. C uses an incorrect colon. D has no punctuation, causing a run-on.";
        } else if (questionText === "Which revision correctly punctuates the sentence 'A 2023 study estimated a 15% increase in commute times residents demanded solutions'?") {
            return "Option B (‘A 2023 study estimated a 15% increase in commute times; residents demanded solutions.’) uses a semicolon for independent clauses. A uses a comma incorrectly. C uses an incorrect colon. D lacks punctuation, causing a run-on.";
        } else if (questionText === "Which revision correctly punctuates the sentence 'A 2021 report estimated $1 million in costs the structure was crumbling'?") {
            return "Option A (‘A 2021 report estimated $1 million in costs; the structure was crumbling.’) uses a semicolon to join independent clauses. B uses a comma incorrectly. C uses an incorrect colon. D lacks punctuation, causing a run-on.";
        } else if (questionText === "Which revision correctly punctuates the sentence 'A 2022 study showed 10% of buses lacked modern seatbelts parents were concerned'?") {
            return "Option B (‘A 2022 study showed 10% of buses lacked modern seatbelts; parents were concerned.’) uses a semicolon for independent clauses. A uses a comma incorrectly. C uses an incorrect colon. D lacks punctuation, causing a run-on.";
        } else if (questionText === "Which revision correctly punctuates the sentence 'A 2023 survey showed 75% of residents wanted local produce vendors needed space'?") {
            return "Option C (‘A 2023 survey showed 75% of residents wanted local produce; vendors needed space.’) uses a semicolon for independent clauses. A uses a comma incorrectly. B uses an incorrect colon. D lacks punctuation, causing a run-on.";
        } else if (questionText === "Which revision correctly punctuates the sentence 'A 2022 report predicted it would power 2,000 homes wildlife could be affected'?") {
            return "Option B (‘A 2022 report predicted it would power 2,000 homes; wildlife could be affected.’) uses a semicolon for independent clauses. A uses a comma incorrectly. C uses an incorrect colon. D lacks punctuation, causing a run-on.";
        } else if (questionText === "Which revision correctly punctuates the sentence 'A 2021 study showed it was unsafe repairs would cost $3 million' to ensure proper punctuation and clarity?") {
            return "Option D (‘A 2021 study showed that it was unsafe and that repairs would cost $3 million.’) uses ‘that’ and ‘and’ for clarity and parallelism. A, B, and C are incorrect as they do not fully clarify the relationship between clauses.";
    
        // Math Questions
        } else if (questionText === "A store offers a 15% discount on a shirt originally priced at $40. What is the discount amount?") {
            return "Calculate 15% of $40: 0.15 × 40 = $6. Option A is correct. B ($5), C ($8), and D ($10) are incorrect as they miscalculate the percentage.";
        } else if (questionText === "A recipe requires 2/3 cup of sugar for 4 servings. How much sugar is needed for 6 servings?") {
            return "Sugar per serving: (2/3) ÷ 4 = 1/6 cup. For 6 servings: 1/6 × 6 = 1 cup. Option A is correct. B (1/2), C (1/3), and D (1/4) miscalculate the proportion.";
        } else if (questionText === "A worker earns $12.50 per hour. How much will they earn for working 6.5 hours?") {
            return "Earnings: 12.50 × 6.5 = 81.25. Option B is correct. A ($78.50), C ($75.00), and D ($84.00) are incorrect due to calculation errors.";
        } else if (questionText === "A car travels 180 miles in 3 hours. What is the average speed in miles per hour?") {
            return "Average speed: 180 ÷ 3 = 60 mph. Option C is correct. A (50), B (54), and D (66) are incorrect as they miscalculate the rate.";
        } else if (questionText === "A store sells apples at $0.80 per pound. If a customer buys 3.5 pounds and pays with a $5 bill, how much change will they receive?") {
            return "Cost: 0.80 × 3.5 = 2.80. Change: 5.00 − 2.80 = 2.20. Option A is correct. B ($2.80), C ($1.80), and D ($3.20) are incorrect due to calculation errors.";
        } else if (questionText === "A rectangular garden has a length of 12 meters and a width of 8 meters. If a fence costs $15 per meter, how much will it cost to fence the entire garden?") {
            return "Perimeter: 2(12 + 8) = 40 meters. Cost: 40 × 15 = 600. Option C is correct. A ($360), B ($480), and D ($720) miscalculate the perimeter or cost.";
        } else if (questionText === "A bakery sells cookies at $1.50 each. If a customer buys 8 cookies and receives a 10% discount on the total, how much will they pay?") {
            return "Total: 1.50 × 8 = 12.00. Discount: 0.10 × 12 = 1.20. Final cost: 12 − 1.20 = 10.80. Option A is correct. B ($12.00), C ($9.60), and D ($11.50) are incorrect.";
        } else if (questionText === "A tank holds 120 gallons of water. If 1/3 of the water is used and then 25% of the remaining water is added back, how many gallons are in the tank now?") {
            return "Used: 120 ÷ 3 = 40. Remaining: 120 − 40 = 80. Added back: 0.25 × 80 = 20. Final: 80 + 20 = 100. Option C is correct. A (80), B (90), and D (110) are incorrect.";
        } else if (questionText === "If 3x - 7 = 11, what is the value of x?") {
            return "Solve: 3x − 7 = 11. Add 7: 3x = 18. Divide by 3: x = 6. Option B is correct. A (4), C (5), and D (7) are incorrect solutions.";
        } else if (questionText === "Solve for y: 2y + 9 = 5y - 3.") {
            return "Solve: 2y + 9 = 5y − 3. Subtract 2y: 9 = 3y − 3. Add 3: 12 = 3y. Divide by 3: y = 4. Option A is correct. B (3), C (5), and D (6) are incorrect.";
        } else if (questionText === "What is the solution to the equation 4(x - 2) = 16?") {
            return "Solve: 4(x − 2) = 16. Divide by 4: x − 2 = 4. Add 2: x = 6. Option C is correct. A (2), B (4), and D (8) are incorrect solutions.";
        } else if (questionText === "If 5x + 3 = 2x + 15, what is the value of x?") {
            return "Solve: 5x + 3 = 2x + 15. Subtract 2x: 3x + 3 = 15. Subtract 3: 3x = 12. Divide by 3: x = 4. Option B is correct. A (3), C (5), and D (6) are incorrect.";
        } else if (questionText === "Solve the system of equations: y = 2x + 1 and 3x - y = 4. What is the value of x?") {
            return "Substitute y = 2x + 1 into 3x − y = 4: 3x − (2x + 1) = 4. Simplify: x − 1 = 4. Add 1: x = 5. Option C is correct. A (1), B (2), and D (4) are incorrect.";
        } else if (questionText === "If 2(x + 3) - 5 = x + 4, what is the value of x?") {
            return "Solve: 2(x + 3) − 5 = x + 4. Distribute: 2x + 6 − 5 = x + 4. Simplify: 2x + 1 = x + 4. Subtract x: x + 1 = 4. Subtract 1: x = 3. Option A is correct.";
        } else if (questionText === "A line has a slope of -2 and passes through the point (1, 3). What is the y-intercept of the line?") {
            return "Use y = mx + b. Slope m = −2, point (1, 3): 3 = −2(1) + b. Solve: 3 = −2 + b, b = 5. Option B is correct. A (4), C (6), and D (7) are incorrect.";
        } else if (questionText === "Solve the system of equations: 2x + 3y = 8 and x - 2y = -3. What is the value of y?") {
            return "Solve x − 2y = −3 for x: x = 2y − 3. Substitute into 2x + 3y = 8: 2(2y − 3) + 3y = 8. Simplify: 4y − 6 + 3y = 8, 7y − 6 = 8, 7y = 14, y = 2. Option B is correct.";
        } else if (questionText === "If the equation of a line is 3x - 2y = 12, what is the slope of a line perpendicular to it?") {
            return "Rewrite 3x − 2y = 12: −2y = −3x + 12, y = (3/2)x − 6. Slope = 3/2. Perpendicular slope = −2/3. Option B is correct. A, C, and D are incorrect slopes.";
        } else if (questionText === "Solve the equation 3(x - 2)^2 = 27. What are the solutions for x?") {
            return "Solve: 3(x − 2)^2 = 27. Divide by 3: (x − 2)^2 = 9. Take square root: x − 2 = ±3. Solutions: x = 5, x = −1. Option A is correct. B, C, and D are incorrect.";
        } else if (questionText === "Solve the equation 5x - 8 = 12. What is the value of x?") {
            return "Solve: 5x − 8 = 12. Add 8: 5x = 20. Divide by 5: x = 4. Option B is correct. A (3), C (5), and D (6) are incorrect solutions.";
        } else if (questionText === "If 3y + 7 = 22, what is the value of y?") {
            return "Solve: 3y + 7 = 22. Subtract 7: 3y = 15. Divide by 3: y = 5. Option B is correct. A (4), C (6), and D (7) are incorrect solutions.";
        } else if (questionText === "A line has a slope of 2 and passes through the point (3, 5). What is the y-intercept of the line?") {
            return "Use y = mx + b. Slope m = 2, point (3, 5): 5 = 2(3) + b. Solve: 5 = 6 + b, b = −1. Option A is correct. B (0), C (1), and D (2) are incorrect.";
        } else if (questionText === "Solve the system of equations: y = 3x - 2 and 2x + y = 13. What is the value of x?") {
            return "Substitute y = 3x − 2 into 2x + y = 13: 2x + (3x − 2) = 13. Simplify: 5x − 2 = 13, 5x = 15, x = 3. Option B is correct. A, C, and D are incorrect.";
        } else if (questionText === "The equation of a line is 4x - 2y = 8. What is the slope of the line?") {
            return "Rewrite 4x − 2y = 8: −2y = −4x + 8, y = 2x − 4. Slope = 2. Option B is correct. A (1), C (3), and D (4) are incorrect slopes.";
        } else if (questionText === "Solve the system of equations: 3x + 2y = 7 and x - y = 1. What is the value of y?") {
            return "Solve x − y = 1 for x: x = y + 1. Substitute into 3x + 2y = 7: 3(y + 1) + 2y = 7. Simplify: 3y + 3 + 2y = 7, 5y + 3 = 7, 5y = 4, y = 1. Option A is correct.";
        } else if (questionText === "A line has a slope of -3 and passes through the point (2, -1). What is the equation of the line in slope-intercept form?") {
            return "Use y = mx + b. Slope m = −3, point (2, −1): −1 = −3(2) + b. Solve: −1 = −6 + b, b = 5. Equation: y = −3x + 5. Option A is correct.";
        } else if (questionText === "The equation of a line is 2x + 5y = 10. What is the slope of a line perpendicular to it?") {
            return "Rewrite 2x + 5y = 10: 5y = −2x + 10, y = (−2/5)x + 2. Slope = −2/5. Perpendicular slope = 5/2. Option B is correct. A, C, and D are incorrect.";
        } else if (questionText === "A rectangle has a length of 10 meters and a width of 6 meters. What is its area?") {
            return "Area = length × width = 10 × 6 = 60 square meters. Option B is correct. A (50), C (70), and D (80) miscalculate the area.";
        } else if (questionText === "The perimeter of a square is 36 meters. What is the length of one side?") {
            return "Perimeter of a square: 4s = 36. Solve: s = 36 ÷ 4 = 9 meters. Option D is correct. A (6), B (7), and C (8) are incorrect.";
        } else if (questionText === "A triangle has a base of 8 cm and a height of 5 cm. What is its area?") {
            return "Area = (1/2) × base × height = (1/2) × 8 × 5 = 20 square cm. Option A is correct. B (25), C (30), and D (40) are incorrect.";
        } else if (questionText === "A circle has a radius of 4 meters. What is its circumference? (Use π ≈ 3.14)") {
            return "Circumference = 2πr = 2 × 3.14 × 4 = 25.12 meters. Option B is correct. A (12.56), C (50.24), and D (16) miscalculate the circumference.";
        } else if (questionText === "A rectangular prism has a length of 5 cm, a width of 3 cm, and a height of 4 cm. What is its volume?") {
            return "Volume = length × width × height = 5 × 3 × 4 = 60 cubic cm. Option A is correct. B (50), C (70), and D (80) are incorrect.";
        } else if (questionText === "A right triangle has legs of 6 cm and 8 cm. What is the length of the hypotenuse?") {
            return "Use Pythagorean theorem: 6^2 + 8^2 = c^2. Solve: 36 + 64 = 100, c = 10 cm. Option B is correct. A (9), C (11), and D (12) are incorrect.";
        } else if (questionText === "A cylinder has a radius of 3 meters and a height of 5 meters. What is its surface area? (Use π ≈ 3.14)") {
            return "Surface area = 2πr^2 + 2πrh = 2(3.14)(3^2) + 2(3.14)(3)(5) = 56.52 + 94.2 = 131.88 square meters. Option B is correct.";
        } else if (questionText === "What percentage of residents preferred a playground?") {
            return "Percentage: (80 ÷ 200) × 100 = 40%. Option B is correct. A (30%), C (50%), and D (60%) miscalculate the percentage.";
        } else if (questionText === "What fraction of the total units sold were Product B?") {
            return "Total units: 150 + 200 + 100 + 50 = 500. Fraction for Product B: 200 ÷ 500 = 2/5. Option B is correct. A, C, and D are incorrect fractions.";
        } else if (questionText === "What is the ratio of rent to total expenses?") {
            return "Total expenses: 2000 + 500 + 4500 + 1000 = 8000. Ratio of rent to total: 2000 ÷ 8000 = 1:4. Option B is correct. A, C, and D are incorrect.";
        } else if (questionText === "What is the average number of books sold per month?") {
            return "Total books: 120 + 150 + 180 + 90 = 540. Average: 540 ÷ 4 = 135. Option A is correct. B, C, and D are incorrect averages.";
        } else if (questionText === "If the total budget is $200,000, how much is allocated for supplies?") {
            return "Supplies: 15% of 200,000 = 0.15 × 200,000 = 30,000. Option B is correct. A, C, and D miscalculate the percentage.";
        } else if (questionText === "What is the percent increase in temperature from February to April?") {
            return "Increase: 55 − 35 = 20. Percent increase: (20 ÷ 35) × 100 = 57.14%. Option B is correct. A, C, and D are incorrect.";
        } else if (questionText === "What is the percent change in total units sold from Year 1 to Year 2?") {
            return "Year 1 total: 500 + 300 + 200 = 1000. Year 2 total: 600 + 450 + 150 = 1200. Percent change: [(1200 − 1000) ÷ 1000] × 100 = 20%. Option B is correct.";
        } else if (questionText === "A store offers a 20% discount on a $50 jacket. After the discount, a 5% sales tax is applied. What is the final price?") {
            return "Discount: 20% of $50 = 0.20 × 50 = $10. Discounted price: 50 − 10 = $40. Sales tax: 5% of $40 = 0.05 × 40 = $2. Final price: 40 + 2 = $42. Option A is correct. B ($40) omits tax, C ($43.50) and D ($45) miscalculate tax or discount.";
        } else if (questionText === "A recipe calls for 3/4 cup of flour for 12 cookies. How many cups of flour are needed for 36 cookies?") {
            return "Flour per cookie: (3/4) ÷ 12 = 1/16 cup. For 36 cookies: 1/16 × 36 = 36/16 = 2.25 cups. Option B is correct. A (1.5), C (3), and D (2.5) miscalculate the proportion.";
        } else if (questionText === "A car rental company charges $30 per day plus $0.25 per mile driven. If a customer rents a car for 2 days and drives 120 miles, what is the total cost?") {
            return "Daily cost: 30 × 2 = $60. Mileage cost: 0.25 × 120 = $30. Total: 60 + 30 = $90. Option C is correct. A ($80), B ($85), and D ($95) miscalculate daily or mileage costs.";
        } else if (questionText === "A painter needs to cover a wall that is 12 feet wide and 8 feet tall. One can of paint covers 48 square feet. How many cans are needed to cover the wall with two coats?") {
            return "Wall area: 12 × 8 = 96 square feet. Two coats: 96 × 2 = 192 square feet. Cans needed: 192 ÷ 48 = 4 cans. Option B is correct. A (3), C (5), and D (6) miscalculate area or cans.";
        } else if (questionText === "A worker earns $15 per hour for the first 40 hours and $22.50 per hour for overtime. If they work 46 hours in a week, what are their total earnings?") {
            return "Regular pay: 15 × 40 = $600. Overtime hours: 46 − 40 = 6. Overtime pay: 22.50 × 6 = $135. Total: 600 + 135 = $690. Option A is correct. B ($720), C ($675), and D ($705) miscalculate overtime or total.";
        } else if (questionText === "A store sells apples at $0.60 per pound and oranges at $0.80 per pound. If a customer buys 3.5 pounds of apples and 2 pounds of oranges and pays with a $5 bill, how much change will they receive?") {
            return "Apple cost: 0.60 × 3.5 = $2.10. Orange cost: 0.80 × 2 = $1.60. Total cost: 2.10 + 1.60 = $3.70. Change: 5 − 3.70 = $1.30. Option B is correct. A ($1.30), C ($1.70), and D ($1.90) miscalculate costs or change.";
    
        return "No explanation available for this question.";
    }
    // Handle Next Button
    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            switch (currentSection) {
                case "rla": endRlaSection(); break;
                case "math": endMathSection(); break;
                case "science": endScienceSection(); break;
                case "social studies": endSocialStudiesSection(); break;
            }
        }
    }

    // Update Progress Bar
    function updateProgressBar() {
        const progressBar = document.getElementById("progress-bar-test");
        let progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
        progressBar.firstElementChild.style.width = progress + "%";
    }

    // Record Test Results
    function recordTestResults() {
        let storedResults = localStorage.getItem("gedTestResults");
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
            console.log(`Saving category ${category}: Correct: ${results[category].correct}, Incorrect: ${results[category].incorrect}`);
        }

        localStorage.setItem("gedTestResults", JSON.stringify(results));
        console.log("Stored gedTestResults:", results);

        if (!testCompleted) {
            for (let category in categoryStats) {
                categoryStats[category].correct = 0;
                categoryStats[category].incorrect = 0;
            }
        }
    }

    // Show Intro Message
    function showIntroMessage() {
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "This is a timed GED Test. RLA: 150 min, Math: 115 min, Science: 90 min, Social Studies: 70 min.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startRlaSection();
        });
        answerButtons.appendChild(startButton);
    }

    // Event Listeners
    if (startTestButton) {
        startTestButton.addEventListener("click", startTest);
    } else {
        console.error("start-test-btn element not found");
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (nextButton.innerHTML === "Continue") {
                document.getElementById("break-message").classList.remove("hide");
                document.getElementById("question-container").classList.add("hide");
            } else {
                handleNextButton();
            }
        });
    } else {
        console.error("next-btn element not found");
    }

// Continue Button Handler (with logging)
if (continueButton) {
    continueButton.addEventListener("click", () => {
        console.log(`Continue button clicked, transitioning from ${currentSection}`);
        document.getElementById("break-message").classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        switch (currentSection) {
            case "rla":
                startMathSection();
                break;
            case "math":
                startScienceSection();
                break;
            case "science":
                startSocialStudiesSection();
                break;
            case "social studies":
                showFinalScore();
                break;
            default:
                console.error(`Unknown section: ${currentSection}`);
        }
    });
} else {
    console.error("continue-btn element not found");
}

    if (!countdownEl) {
        console.error("countdown element not found");
    }

    // Initialize
    showIntroMessage();
});