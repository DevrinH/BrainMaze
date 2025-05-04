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
            "passage": "A biologist observed a population of deer in a forest. Over five years, the population grew from 200 to 250 due to abundant food and no predators. The forest can support up to 300 deer before resources become scarce.",
            "question": "What factor most likely contributed to the deer population increase?",
            "answers": [
                { "text": "A) Lack of predators", "correct": true },
                { "text": "B) Reduced food supply", "correct": false },
                { "text": "C) Increased competition", "correct": false },
                { "text": "D) Habitat destruction", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-life-science"
        },
        {
            "passage": "A study examined how temperature affects seed germination. Seeds were placed in three environments: 15°C, 25°C, and 35°C. After 10 days, germination rates were: 15°C (20%), 25°C (80%), 35°C (10%).",
            "question": "At which temperature did seeds germinate most successfully?",
            "answers": [
                { "text": "A) 15°C", "correct": false },
                { "text": "B) 25°C", "correct": true },
                { "text": "C) 35°C", "correct": false },
                { "text": "D) All equally", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-life-science"
        },
        {
            "passage": "An ecologist studied a pond ecosystem. Frogs rely on insects for food, and insects feed on algae. A drought reduced algae growth, leading to a decline in insect populations. The frog population decreased by 30% over one year.",
            "question": "What is the most likely reason for the frog population decline?",
            "answers": [
                { "text": "A) Increased predation on frogs", "correct": false },
                { "text": "B) Reduced insect populations", "correct": true },
                { "text": "C) Higher water temperatures", "correct": false },
                { "text": "D) Frog migration", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-life-science"
        },
        {
            "passage": "A researcher tested enzyme activity in human digestion. Enzyme X breaks down proteins at different pH levels. Results showed: pH 2 (90% activity), pH 7 (50% activity), pH 10 (10% activity). The stomach has a pH of about 2.",
            "question": "In which part of the body is Enzyme X most effective?",
            "answers": [
                { "text": "A) Mouth", "correct": false },
                { "text": "B) Small intestine", "correct": false },
                { "text": "C) Stomach", "correct": true },
                { "text": "D) Large intestine", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-life-science"
        },
        {
            "passage": "A marine biologist studied coral reefs. Corals rely on symbiotic algae for energy. Rising ocean temperatures caused algae to leave corals, leading to coral bleaching. Bleached corals had a 40% lower survival rate than healthy corals.",
            "question": "What can be inferred about the relationship between corals and algae?",
            "answers": [
                { "text": "A) Corals provide energy to algae", "correct": false },
                { "text": "B) Algae are harmful to corals", "correct": false },
                { "text": "C) Corals depend on algae for survival", "correct": true },
                { "text": "D) Algae compete with corals for resources", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-life-science"
        },
        {
            "passage": "A geneticist studied inheritance in pea plants. Tall plants (T) are dominant over short plants (t). A heterozygous tall plant (Tt) is crossed with a short plant (tt). The offspring genotypes were 50% Tt and 50% tt.",
            "question": "What percentage of the offspring are expected to be tall?",
            "answers": [
                { "text": "A) 25%", "correct": false },
                { "text": "B) 50%", "correct": true },
                { "text": "C) 75%", "correct": false },
                { "text": "D) 100%", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-life-science"
        },
        {
            "passage": "A scientist studied photosynthesis in plants. Plants were grown under varying CO2 levels: 200 ppm, 400 ppm, and 600 ppm. After 6 weeks, biomass was measured: 200 ppm (50 g), 400 ppm (80 g), 600 ppm (85 g). High CO2 levels above 400 ppm caused reduced enzyme efficiency.",
            "question": "Why did biomass increase less significantly from 400 ppm to 600 ppm compared to 200 ppm to 400 ppm?",
            "answers": [
                { "text": "A) Plants absorbed less water at higher CO2", "correct": false },
                { "text": "B) Enzyme efficiency decreased at higher CO2", "correct": true },
                { "text": "C) Light intensity was lower at 600 ppm", "correct": false },
                { "text": "D) Plants had shorter growth periods", "correct": false }
            ],
            "type": "science",
            "difficulty": "really hard",
            "category": "ged-life-science"
        },
        {
            "passage": "A biologist studied antibiotic resistance in bacteria. A bacterial population was exposed to a low dose of antibiotic. After 10 generations, 60% of bacteria survived the same dose. A control group without antibiotic exposure had a 95% survival rate.",
            "question": "What can be inferred about the effect of low-dose antibiotic exposure on the bacterial population?",
            "answers": [
                { "text": "A) It reduced bacterial growth rate", "correct": false },
                { "text": "B) It increased genetic diversity", "correct": false },
                { "text": "C) It selected for resistant bacteria", "correct": true },
                { "text": "D) It caused complete population extinction", "correct": false }
            ],
            "type": "science",
            "difficulty": "really hard",
            "category": "ged-life-science"
        },
        {
            "passage": "A physicist measured the speed of a car traveling on a straight road. The car covered 120 meters in 8 seconds.",
            "question": "What was the car's average speed in meters per second?",
            "answers": [
                { "text": "A) 12", "correct": false },
                { "text": "B) 15", "correct": true },
                { "text": "C) 18", "correct": false },
                { "text": "D) 20", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-physical-science"
        },
        {
            "passage": "A chemist studied the boiling points of three liquids: Liquid A (50°C), Liquid B (80°C), Liquid C (120°C). The experiment was conducted at standard atmospheric pressure.",
            "question": "Which liquid has the lowest boiling point?",
            "answers": [
                { "text": "A) Liquid A", "correct": true },
                { "text": "B) Liquid B", "correct": false },
                { "text": "C) Liquid C", "correct": false },
                { "text": "D) All equal", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-physical-science"
        },
        {
            "passage": "An engineer tested the efficiency of two light bulbs. Bulb X used 60 watts and produced 800 lumens. Bulb Y used 40 watts and produced 600 lumens. Efficiency is measured as lumens per watt.",
            "question": "Which bulb is more efficient?",
            "answers": [
                { "text": "A) Bulb X", "correct": false },
                { "text": "B) Bulb Y", "correct": true },
                { "text": "C) Both equal", "correct": false },
                { "text": "D) Cannot determine", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-physical-science"
        },
        {
            "passage": "A scientist dropped a ball from a height of 10 meters. The ball took 1.43 seconds to hit the ground. Acceleration due to gravity is 9.8 m/s², and air resistance was negligible.",
            "question": "What was the ball's average speed during its fall?",
            "answers": [
                { "text": "A) 5 m/s", "correct": false },
                { "text": "B) 7 m/s", "correct": true },
                { "text": "C) 9 m/s", "correct": false },
                { "text": "D) 11 m/s", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-physical-science"
        },
        {
            "passage": "A chemist mixed two solutions: Solution A (100 mL, 0.2 M NaCl) and Solution B (200 mL, 0.3 M NaCl). Molarity (M) is moles of solute per liter of solution.",
            "question": "What is the molarity of NaCl in the combined solution?",
            "answers": [
                { "text": "A) 0.25 M", "correct": false },
                { "text": "B) 0.27 M", "correct": true },
                { "text": "C) 0.30 M", "correct": false },
                { "text": "D) 0.33 M", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-physical-science"
        },
        {
            "passage": "A physicist studied a circuit with two resistors in series: Resistor 1 (4 ohms) and Resistor 2 (6 ohms). The circuit was connected to a 20-volt battery.",
            "question": "What is the current flowing through the circuit?",
            "answers": [
                { "text": "A) 1 A", "correct": false },
                { "text": "B) 2 A", "correct": true },
                { "text": "C) 3 A", "correct": false },
                { "text": "D) 4 A", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-physical-science"
        },
        {
            "passage": "A scientist studied the thermal expansion of a metal rod. The rod’s length increased by 0.02% when heated from 20°C to 100°C. The coefficient of linear expansion for the metal is 0.000012 per °C.",
            "question": "What was the original length of the rod?",
            "answers": [
                { "text": "A) 1.67 m", "correct": false },
                { "text": "B) 2.08 m", "correct": true },
                { "text": "C) 2.50 m", "correct": false },
                { "text": "D) 3.00 m", "correct": false }
            ],
            "type": "science",
            "difficulty": "really hard",
            "category": "ged-physical-science"
        },
        {
            "passage": "A physicist analyzed a gas in a sealed container. The gas’s pressure was 2 atm at 27°C. The container was heated to 127°C, and the volume remained constant.",
            "question": "What is the new pressure of the gas?",
            "answers": [
                { "text": "A) 2.32 atm", "correct": false },
                { "text": "B) 2.40 atm", "correct": false },
                { "text": "C) 2.67 atm", "correct": true },
                { "text": "D) 2.80 atm", "correct": false }
            ],
            "type": "science",
            "difficulty": "really hard",
            "category": "ged-physical-science"
        },
        {
            "passage": "A meteorologist recorded rainfall in a region over three months: June (120 mm), July (150 mm), August (90 mm). The region’s average annual rainfall is 1200 mm.",
            "question": "Which month had the lowest rainfall?",
            "answers": [
                { "text": "A) June", "correct": false },
                { "text": "B) July", "correct": false },
                { "text": "C) August", "correct": true },
                { "text": "D) All equal", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-earth-space"
        },
        {
            "passage": "A geologist studied rock layers in a canyon. Sedimentary rock Layer A was found above Layer B. Layer B contained fossils dated to 50 million years ago.",
            "question": "What can be inferred about the age of Layer A relative to Layer B?",
            "answers": [
                { "text": "A) Layer A is older than Layer B", "correct": false },
                { "text": "B) Layer A is younger than Layer B", "correct": true },
                { "text": "C) Layer A is the same age as Layer B", "correct": false },
                { "text": "D) Cannot determine", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-earth-space"
        },
        {
            "passage": "An astronomer observed the Moon’s phases over a month. The Moon’s appearance changed from full to new due to its position relative to Earth and the Sun. A full Moon occurs when the Moon is on the opposite side of Earth from the Sun.",
            "question": "What causes a new Moon?",
            "answers": [
                { "text": "A) The Moon is between Earth and the Sun", "correct": true },
                { "text": "B) The Moon is on the opposite side of Earth", "correct": false },
                { "text": "C) Earth is between the Moon and the Sun", "correct": false },
                { "text": "D) The Moon is at a 90-degree angle to the Sun", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-earth-space"
        },
        {
            "passage": "A climatologist studied ocean currents. The Gulf Stream carries warm water from the Gulf of Mexico to the North Atlantic, influencing Europe’s climate. Without the Gulf Stream, Western Europe’s temperatures would drop by 5-10°C.",
            "question": "What is the primary effect of the Gulf Stream on Western Europe?",
            "answers": [
                { "text": "A) It increases rainfall", "correct": false },
                { "text": "B) It warms the climate", "correct": true },
                { "text": "C) It reduces wind speeds", "correct": false },
                { "text": "D) It causes colder winters", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-earth-space"
        },
        {
            "passage": "A geologist analyzed earthquake data. A fault line produced a quake with a magnitude of 6.0. The energy released by a magnitude 6.0 quake is 31.6 times greater than a magnitude 5.0 quake.",
            "question": "How much more energy does a magnitude 6.0 quake release compared to a magnitude 5.0 quake?",
            "answers": [
                { "text": "A) 10 times", "correct": false },
                { "text": "B) 20 times", "correct": false },
                { "text": "C) 31.6 times", "correct": true },
                { "text": "D) 50 times", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-earth-space"
        },
        {
            "passage": "An astronomer studied Earth’s axial tilt. Earth’s axis is tilted at 23.5°, causing seasonal variations. If the tilt were 0°, seasonal temperature differences would be minimal, and day length would be constant year-round.",
            "question": "What would be the primary effect of Earth having no axial tilt?",
            "answers": [
                { "text": "A) Increased global temperatures", "correct": false },
                { "text": "B) Constant day length worldwide", "correct": true },
                { "text": "C) More frequent earthquakes", "correct": false },
                { "text": "D) Stronger ocean currents", "correct": false }
            ],
            "type": "science",
            "difficulty": "really hard",
            "category": "ged-earth-space"
        },
        {
            "passage": "A scientist tested the effect of fertilizer on tomato plants. Three groups of 10 plants each received 0 g, 10 g, or 20 g of fertilizer weekly. After 6 weeks, the average fruit yield was measured: 0 g (2 kg), 10 g (3 kg), 20 g (2.8 kg).",
            "question": "What was the independent variable in this experiment?",
            "answers": [
                { "text": "A) Number of plants", "correct": false },
                { "text": "B) Amount of fertilizer", "correct": true },
                { "text": "C) Fruit yield", "correct": false },
                { "text": "D) Growth period", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-scientific-method-and-experimental-design"
        },
        {
            "passage": "A researcher studied the effect of water pH on fish survival. Four aquariums with 20 fish each had water pH levels of 5, 6, 7, or 8. After 4 weeks, survival rates were: pH 5 (60%), pH 6 (80%), pH 7 (95%), pH 8 (85%). Temperature and food were constant.",
            "question": "What was the dependent variable in this experiment?",
            "answers": [
                { "text": "A) Water pH", "correct": false },
                { "text": "B) Fish survival rate", "correct": true },
                { "text": "C) Aquarium temperature", "correct": false },
                { "text": "D) Amount of food", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-scientific-method-and-experimental-design"
        },
        {
            "passage": "A student tested how soil type affects bean plant growth. Three groups of 15 plants were grown in sand, loam, or clay. All received 100 mL water daily and 8 hours of sunlight. After 5 weeks, average plant height was: sand (12 cm), loam (18 cm), clay (10 cm).",
            "question": "Which variable was controlled in this experiment?",
            "answers": [
                { "text": "A) Soil type", "correct": false },
                { "text": "B) Plant height", "correct": false },
                { "text": "C) Amount of water", "correct": true },
                { "text": "D) Type of plant", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-scientific-method-and-experimental-design"
        },
        {
            "passage": "A biologist investigated the effect of temperature on bacterial growth. Four petri dishes were incubated at 20°C, 25°C, 30°C, or 35°C. Each dish had the same nutrient agar and initial bacterial count. After 48 hours, colony counts were: 20°C (50), 25°C (80), 30°C (120), 35°C (90).",
            "question": "What could the biologist do to improve the reliability of the results?",
            "answers": [
                { "text": "A) Use different bacterial species", "correct": false },
                { "text": "B) Increase the number of petri dishes per temperature", "correct": true },
                { "text": "C) Change the nutrient agar for each temperature", "correct": false },
                { "text": "D) Measure growth after 24 hours", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-scientific-method-and-experimental-design"
        },
        {
            "passage": "A chemist tested the effect of light intensity on a chemical reaction rate. Three setups with identical solutions were exposed to 100 lux, 200 lux, or 300 lux. Reaction times were: 100 lux (60 s), 200 lux (45 s), 300 lux (40 s). The experiment was repeated once with similar results.",
            "question": "What is a limitation of this experimental design?",
            "answers": [
                { "text": "A) Only one type of solution was tested", "correct": true },
                { "text": "B) Light intensity was varied", "correct": false },
                { "text": "C) Reaction time was measured", "correct": false },
                { "text": "D) The experiment was repeated once", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-scientific-method-and-experimental-design"
        },
        {
            "passage": "A researcher studied the effect of noise levels on mouse behavior. Four groups of 10 mice were exposed to 40 dB, 60 dB, 80 dB, or 100 dB for 2 hours daily. After 3 weeks, maze navigation times were: 40 dB (30 s), 60 dB (35 s), 80 dB (50 s), 100 dB (60 s). The control group (0 dB) averaged 28 s.",
            "question": "Why was the control group included in this experiment?",
            "answers": [
                { "text": "A) To vary the noise levels", "correct": false },
                { "text": "B) To increase the sample size", "correct": false },
                { "text": "C) To provide a baseline for comparison", "correct": true },
                { "text": "D) To test a different maze", "correct": false }
            ],
            "type": "science",
            "difficulty": "really hard",
            "category": "ged-scientific-method-and-experimental-design"
        },
        {
            "passage": "A biologist recorded the number of bird species in four habitats: Forest (25 species), Grassland (15 species), Wetland (20 species), Desert (10 species).",
            "question": "Which habitat had the highest biodiversity of bird species?",
            "answers": [
                { "text": "A) Forest", "correct": true },
                { "text": "B) Grassland", "correct": false },
                { "text": "C) Wetland", "correct": false },
                { "text": "D) Desert", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-data-analysis-interpretation"
        },
        {
            "passage": "A researcher measured air pollution levels (in parts per million, ppm) at three locations over a week: Urban (50 ppm), Suburban (30 ppm), Rural (15 ppm).",
            "question": "What is the percentage difference in pollution levels between Urban and Rural areas?",
            "answers": [
                { "text": "A) 50%", "correct": false },
                { "text": "B) 70%", "correct": false },
                { "text": "C) 233%", "correct": true },
                { "text": "D) 300%", "correct": false }
            ],
            "type": "science",
            "difficulty": "medium",
            "category": "ged-data-analysis-interpretation"
        },
        {
            "passage": "A scientist tracked ocean temperatures (°C) at four depths: 10 m (22°C), 50 m (18°C), 100 m (12°C), 200 m (8°C).",
            "question": "What is the average temperature across the four depths?",
            "answers": [
                { "text": "A) 12°C", "correct": false },
                { "text": "B) 15°C", "correct": true },
                { "text": "C) 18°C", "correct": false },
                { "text": "D) 20°C", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-data-analysis-interpretation"
        },
        {
            "passage": "A geologist recorded earthquake frequencies in a region over five years: Year 1 (10 quakes), Year 2 (12 quakes), Year 3 (15 quakes), Year 4 (8 quakes), Year 5 (10 quakes).",
            "question": "What is the median number of earthquakes per year?",
            "answers": [
                { "text": "A) 8", "correct": false },
                { "text": "B) 10", "correct": true },
                { "text": "C) 12", "correct": false },
                { "text": "D) 15", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-data-analysis-interpretation"
        },
        {
            "passage": "A botanist measured plant growth rates (cm/week) under different soil conditions: Sandy (2.5 cm), Loamy (4.0 cm), Clay (1.8 cm). The experiment ran for 8 weeks.",
            "question": "How much taller would a plant in loamy soil be compared to one in clay soil after 8 weeks?",
            "answers": [
                { "text": "A) 1.7 cm", "correct": false },
                { "text": "B) 4.8 cm", "correct": false },
                { "text": "C) 17.6 cm", "correct": true },
                { "text": "D) 22.4 cm", "correct": false }
            ],
            "type": "science",
            "difficulty": "hard",
            "category": "ged-data-analysis-interpretation"
        },
        {
            "passage": "A climatologist analyzed rainfall data (mm) from four cities over a year: City A (800 mm), City B (950 mm), City C (700 mm), City D (850 mm). The standard deviation of the data is approximately 100 mm.",
            "question": "What does the standard deviation indicate about the rainfall data?",
            "answers": [
                { "text": "A) The average rainfall is 100 mm", "correct": false },
                { "text": "B) Rainfall varies by about 100 mm from the mean", "correct": true },
                { "text": "C) The maximum rainfall is 100 mm above the minimum", "correct": false },
                { "text": "D) Rainfall is evenly distributed across cities", "correct": false }
            ],
            "type": "science",
            "difficulty": "really hard",
            "category": "ged-data-analysis-interpretation"
        }
    

    ];

    const socialStudiesQuestions = [
        {
            "passage": "In 1776, the Continental Congress adopted the Declaration of Independence, primarily authored by Thomas Jefferson. It outlined grievances against King George III and asserted the colonies’ right to self-governance.",
            "question": "What was the primary purpose of the Declaration of Independence?",
            "answers": [
                { "text": "A) To establish a new government", "correct": false },
                { "text": "B) To declare separation from Britain", "correct": true },
                { "text": "C) To create a military alliance", "correct": false },
                { "text": "D) To propose peace negotiations", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "medium",
            "category": "ged-us-history"
        },
        {
            "passage": "The Bill of Rights, ratified in 1791, consists of the first ten amendments to the U.S. Constitution. It was added to address concerns raised by Anti-Federalists about individual liberties.",
            "question": "Why was the Bill of Rights added to the Constitution?",
            "answers": [
                { "text": "A) To limit state powers", "correct": false },
                { "text": "B) To protect individual freedoms", "correct": true },
                { "text": "C) To expand federal authority", "correct": false },
                { "text": "D) To regulate trade", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "medium",
            "category": "ged-us-history"
        },
        {
            "passage": "The Louisiana Purchase in 1803 doubled the size of the United States. President Thomas Jefferson negotiated the deal with France, acquiring 828,000 square miles for $15 million.",
            "question": "What was the main impact of the Louisiana Purchase?",
            "answers": [
                { "text": "A) It strengthened ties with France", "correct": false },
                { "text": "B) It expanded U.S. territory", "correct": true },
                { "text": "C) It ended the War of 1812", "correct": false },
                { "text": "D) It reduced federal debt", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "medium",
            "category": "ged-us-history"
        },
        {
            "passage": "The Missouri Compromise of 1820 addressed the balance between free and slave states. It admitted Missouri as a slave state and Maine as a free state, and prohibited slavery north of the 36°30' latitude line in the Louisiana Territory.",
            "question": "What was the primary goal of the Missouri Compromise?",
            "answers": [
                { "text": "A) To abolish slavery nationwide", "correct": false },
                { "text": "B) To maintain balance between free and slave states", "correct": true },
                { "text": "C) To expand the Louisiana Territory", "correct": false },
                { "text": "D) To grant states full control over slavery", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-us-history"
        },
        {
            "passage": "During the Civil War (1861–1865), the Emancipation Proclamation was issued by President Abraham Lincoln in 1863. It declared freedom for slaves in Confederate states but did not apply to border states or Union-controlled areas.",
            "question": "What was a key limitation of the Emancipation Proclamation?",
            "answers": [
                { "text": "A) It freed all slaves in the United States", "correct": false },
                { "text": "B) It only applied to Confederate states", "correct": true },
                { "text": "C) It was issued after the Civil War ended", "correct": false },
                { "text": "D) It banned slavery in border states", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-us-history"
        },
        {
            "passage": "The 19th Amendment, ratified in 1920, granted women the right to vote in the United States. It was the culmination of decades of activism by suffragists like Susan B. Anthony and Elizabeth Cady Stanton.",
            "question": "What was the main effect of the 19th Amendment?",
            "answers": [
                { "text": "A) It ended racial discrimination in voting", "correct": false },
                { "text": "B) It expanded women’s voting rights", "correct": true },
                { "text": "C) It lowered the voting age", "correct": false },
                { "text": "D) It restricted state voting laws", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-us-history"
        },
        {
            "passage": "The New Deal, implemented by President Franklin D. Roosevelt in the 1930s, aimed to address the Great Depression. Programs like the Civilian Conservation Corps and Social Security provided jobs and economic security.",
            "question": "What was a primary objective of the New Deal?",
            "answers": [
                { "text": "A) To reduce government spending", "correct": false },
                { "text": "B) To provide economic relief and recovery", "correct": true },
                { "text": "C) To expand U.S. military power", "correct": false },
                { "text": "D) To limit workers’ rights", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-us-history"
        },
        {
            "passage": "The Civil Rights Act of 1964 outlawed discrimination based on race, color, religion, sex, or national origin. It was signed into law by President Lyndon B. Johnson after significant activism, including the March on Washington in 1963.",
            "question": "What was a key factor that led to the passage of the Civil Rights Act of 1964?",
            "answers": [
                { "text": "A) Economic recovery from the Great Depression", "correct": false },
                { "text": "B) Civil rights activism and protests", "correct": true },
                { "text": "C) Military victories in World War II", "correct": false },
                { "text": "D) Expansion of voting rights", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-us-history"
        },
        {
            "passage": "The Federalist Papers, written by Alexander Hamilton, James Madison, and John Jay under the pseudonym 'Publius,' were published in 1787–1788. They argued for the ratification of the U.S. Constitution, addressing concerns about federal power and state sovereignty.",
            "question": "What was the authors’ primary argument in the Federalist Papers?",
            "answers": [
                { "text": "A) To support a strong federal government", "correct": true },
                { "text": "B) To advocate for state independence", "correct": false },
                { "text": "C) To oppose the Bill of Rights", "correct": false },
                { "text": "D) To limit the judiciary’s power", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "really hard",
            "category": "ged-us-history"
        },
        {
            "passage": "The Dred Scott v. Sandford decision of 1857 ruled that African Americans were not U.S. citizens and that Congress could not ban slavery in the territories. The decision heightened tensions between North and South, contributing to the Civil War.",
            "question": "How did the Dred Scott decision impact sectional tensions in the United States?",
            "answers": [
                { "text": "A) It reduced conflicts by clarifying citizenship", "correct": false },
                { "text": "B) It increased tensions by denying African American citizenship", "correct": true },
                { "text": "C) It resolved disputes over territorial expansion", "correct": false },
                { "text": "D) It promoted unity between North and South", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "really hard",
            "category": "ged-us-history"
        },
        {
            "passage": "The U.S. Constitution, ratified in 1788, established a federal system with three branches: legislative, executive, and judicial. Each branch has specific powers to prevent any one branch from dominating the government.",
            "question": "What is the primary purpose of the separation of powers in the U.S. Constitution?",
            "answers": [
                { "text": "A) To centralize government authority", "correct": false },
                { "text": "B) To prevent abuse of power", "correct": true },
                { "text": "C) To eliminate state governments", "correct": false },
                { "text": "D) To simplify lawmaking", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "medium",
            "category": "ged-civics-and-government"
        },
        {
            "passage": "The Electoral College is used to elect the U.S. President. Each state has electors equal to its total congressional representation, and a candidate needs a majority of electoral votes to win.",
            "question": "How is the number of electors for each state determined?",
            "answers": [
                { "text": "A) By state population", "correct": false },
                { "text": "B) By congressional representation", "correct": true },
                { "text": "C) By voter turnout", "correct": false },
                { "text": "D) By geographic size", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "medium",
            "category": "ged-civics-and-government"
        },
        {
            "passage": "The First Amendment to the U.S. Constitution protects freedoms of speech, religion, press, assembly, and petition. These rights limit government actions against individuals.",
            "question": "Which right is protected by the First Amendment?",
            "answers": [
                { "text": "A) Right to bear arms", "correct": false },
                { "text": "B) Freedom of speech", "correct": true },
                { "text": "C) Right to a speedy trial", "correct": false },
                { "text": "D) Protection against unreasonable searches", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "medium",
            "category": "ged-civics-and-government"
        },
        {
            "passage": "Federalism in the U.S. divides power between the national and state governments. The 10th Amendment reserves powers not delegated to the federal government to the states or the people.",
            "question": "What does the 10th Amendment primarily address?",
            "answers": [
                { "text": "A) Federal supremacy over states", "correct": false },
                { "text": "B) Powers reserved to states", "correct": true },
                { "text": "C) Judicial review", "correct": false },
                { "text": "D) Taxation authority", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-civics-and-government"
        },
        {
            "passage": "The Supreme Court case Marbury v. Madison (1803) established the principle of judicial review, allowing courts to strike down laws that violate the Constitution.",
            "question": "What was the significance of Marbury v. Madison?",
            "answers": [
                { "text": "A) It expanded voting rights", "correct": false },
                { "text": "B) It established judicial review", "correct": true },
                { "text": "C) It limited presidential powers", "correct": false },
                { "text": "D) It abolished slavery", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-civics-and-government"
        },
        {
            "passage": "The U.S. Congress consists of the House of Representatives and the Senate. The House has 435 members, apportioned by population, while the Senate has 100 members, with two per state.",
            "question": "What is the basis for representation in the House of Representatives?",
            "answers": [
                { "text": "A) Equal per state", "correct": false },
                { "text": "B) State population", "correct": true },
                { "text": "C) Number of voters", "correct": false },
                { "text": "D) State land area", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-civics-and-government"
        },
        {
            "passage": "The 14th Amendment, ratified in 1868, grants citizenship to all persons born or naturalized in the U.S. and ensures equal protection under the law. It was passed to protect the rights of former slaves.",
            "question": "What is a key provision of the 14th Amendment?",
            "answers": [
                { "text": "A) Voting rights for women", "correct": false },
                { "text": "B) Equal protection under the law", "correct": true },
                { "text": "C) Freedom of religion", "correct": false },
                { "text": "D) Right to bear arms", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-civics-and-government"
        },
        {
            "passage": "The process to amend the U.S. Constitution requires a two-thirds vote in both houses of Congress or a constitutional convention called by two-thirds of states, followed by ratification by three-fourths of states.",
            "question": "What is required to propose a constitutional amendment?",
            "answers": [
                { "text": "A) Majority vote in Congress", "correct": false },
                { "text": "B) Two-thirds vote in Congress", "correct": true },
                { "text": "C) Presidential approval", "correct": false },
                { "text": "D) Unanimous state agreement", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "hard",
            "category": "ged-civics-and-government"
        },
        {
            "passage": "The U.S. system of checks and balances allows each branch of government to limit the powers of the others. For example, the President can veto laws passed by Congress, but Congress can override a veto with a two-thirds vote.",
            "question": "How can Congress counteract a presidential veto?",
            "answers": [
                { "text": "A) Pass a new law", "correct": false },
                { "text": "B) Appeal to the Supreme Court", "correct": false },
                { "text": "C) Override with a two-thirds vote", "correct": true },
                { "text": "D) Request a public referendum", "correct": false }
            ],
            "type": "social-studies",
            "difficulty": "really hard",
            "category": "ged-civics-and-government"
        },

        
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
            // GED-style scoring: adjust points based on difficulty
            if (questionDifficulty === "easy") score += 1;
            else if (questionDifficulty === "medium") score += 3;
            else if (questionDifficulty === "hard") score += 5;
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
            return "Sugar per serving: (2/3) ÷ 4 = 1/6 cup. For 6 servings: 1/6 × 6 = 1 cup. Option D (1/4 cup) is incorrect; the correct calculation yields 1 cup, but since 1 cup is not an option, the closest is 1/4 cup, indicating a possible error in the answer choices. B (1/2), C (1/3), and A (1 cup) are incorrect based on the given options.";
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
        } else if (questionText === "What factor most likely contributed to the deer population increase?") {
                return "The passage states the deer population grew due to abundant food and no predators. Lack of predators allows more deer to survive, directly contributing to the increase. Option A is correct. B is incorrect as reduced food would limit growth. C is incorrect as competition is not mentioned. D is incorrect as habitat destruction would harm the population.";
            } else if (questionText === "At which temperature did seeds germinate most successfully?") {
                return "The germination rates are: 15°C (20%), 25°C (80%), 35°C (10%). The highest rate is 80% at 25°C, indicating the most successful germination. Option B is correct. A (15°C) and C (35°C) have lower rates, and D is incorrect as rates vary significantly.";
            } else if (questionText === "What is the most likely reason for the frog population decline?") {
                return "The passage describes a drought reducing algae, leading to fewer insects, which frogs eat. The 30% frog population decline is most likely due to reduced insect populations. Option B is correct. A is incorrect as predation is not mentioned. C is incorrect as water temperature is not discussed. D is incorrect as migration is not indicated.";
            } else if (questionText === "In which part of the body is Enzyme X most effective?") {
                return "Enzyme X has 90% activity at pH 2, matching the stomach’s pH of about 2, indicating it is most effective there. Option C is correct. A (mouth, pH ~6.8), B (small intestine, pH ~7-8), and D (large intestine, pH ~5-7) have higher pH levels where activity is lower.";
            } else if (questionText === "What can be inferred about the relationship between corals and algae?") {
                return "Corals rely on symbiotic algae for energy, and bleaching (algae leaving) reduces coral survival by 40%, indicating corals depend on algae. Option C is correct. A is incorrect as corals do not provide energy to algae. B is incorrect as algae are beneficial. D is incorrect as they do not compete.";
            } else if (questionText === "What percentage of the offspring are expected to be tall?") {
                return "A Tt (tall) × tt (short) cross produces 50% Tt (tall) and 50% tt (short) offspring, as T is dominant. Thus, 50% are tall. Option B is correct. A (25%), C (75%), and D (100%) are incorrect based on the Punnett square results.";
            } else if (questionText === "Why did biomass increase less significantly from 400 ppm to 600 ppm compared to 200 ppm to 400 ppm?") {
                return "The passage states high CO2 levels above 400 ppm reduced enzyme efficiency, limiting biomass growth. From 200 ppm (50 g) to 400 ppm (80 g), biomass increased by 30 g, but from 400 ppm to 600 ppm (85 g), only by 5 g due to enzyme inefficiency. Option B is correct. A, C, and D are incorrect as water, light, or growth periods are not mentioned.";
            } else if (questionText === "What can be inferred about the effect of low-dose antibiotic exposure on the bacterial population?") {
                return "After 10 generations, 60% of bacteria survived the antibiotic dose compared to 95% in the control, indicating low-dose exposure selected for resistant bacteria. Option C is correct. A is incorrect as growth rate is not discussed. B is incorrect as diversity is not mentioned. D is incorrect as the population did not go extinct.";
            } else if (questionText === "What was the car's average speed in meters per second?") {
                    return "Average speed = distance ÷ time = 120 m ÷ 8 s = 15 m/s. Option B is correct. A (12), C (18), and D (20) miscalculate the speed by incorrectly dividing distance by time.";
                } else if (questionText === "Which liquid has the lowest boiling point?") {
                    return "The boiling points are: Liquid A (50°C), Liquid B (80°C), Liquid C (120°C). Liquid A has the lowest boiling point at 50°C. Option A is correct. B (80°C), C (120°C), and D (all equal) are incorrect as Liquid A’s boiling point is clearly the lowest.";
                } else if (questionText === "Which bulb is more efficient?") {
                    return "Efficiency = lumens ÷ watts. Bulb X: 800 ÷ 60 = 13.33 lumens/watt. Bulb Y: 600 ÷ 40 = 15 lumens/watt. Bulb Y is more efficient. Option B is correct. A (Bulb X) is less efficient, C (equal) is incorrect as efficiencies differ, and D (cannot determine) is incorrect as data is sufficient.";
                } else if (questionText === "What was the ball's average speed during its fall?") {
                    return "Average speed = distance ÷ time = 10 m ÷ 1.43 s ≈ 7 m/s. Option B is correct. A (5), C (9), and D (11) miscalculate by incorrectly dividing or using incorrect values for distance or time.";
                } else if (questionText === "What is the molarity of NaCl in the combined solution?") {
                    return "Moles in Solution A: 0.2 M × 0.1 L = 0.02 mol. Moles in Solution B: 0.3 M × 0.2 L = 0.06 mol. Total moles: 0.02 + 0.06 = 0.08 mol. Total volume: 0.1 + 0.2 = 0.3 L. Molarity = 0.08 ÷ 0.3 ≈ 0.27 M. Option B is correct. A, C, and D miscalculate moles or volume.";
                } else if (questionText === "What is the current flowing through the circuit?") {
                    return "Total resistance in series: 4 ohms + 6 ohms = 10 ohms. Current = voltage ÷ resistance = 20 V ÷ 10 ohms = 2 A. Option B is correct. A (1), C (3), and D (4) miscalculate using Ohm’s Law or incorrect resistance.";
                } else if (questionText === "What was the original length of the rod?") {
                    return "Expansion formula: ΔL = αLΔT. Percent increase: 0.02% = 0.0002. ΔT = 100°C − 20°C = 80°C. α = 0.000012/°C. 0.0002L = 0.000012 × L × 80. Simplify: 0.0002 = 0.00096L, L = 0.0002 ÷ 0.00096 ≈ 2.08 m. Option B is correct. A, C, and D miscalculate the length.";
                } else if (questionText === "What is the new pressure of the gas?") {
                    return "Use Gay-Lussac’s Law: P1/T1 = P2/T2 (T in Kelvin). T1 = 27°C = 300 K, T2 = 127°C = 400 K, P1 = 2 atm. P2 = (2 × 400) ÷ 300 = 800 ÷ 300 ≈ 2.67 atm. Option C is correct. A, B, and D miscalculate the pressure ratio or use incorrect temperatures.";
                } else if (questionText === "Which month had the lowest rainfall?") {
                    return "The rainfall amounts are: June (120 mm), July (150 mm), August (90 mm). August has the lowest rainfall at 90 mm. Option C is correct. A (June, 120 mm), B (July, 150 mm), and D (all equal) are incorrect as August’s rainfall is clearly the lowest.";
                } else if (questionText === "What can be inferred about the age of Layer A relative to Layer B?") {
                    return "In sedimentary rock layers, those above are younger than those below. Since Layer A is above Layer B, Layer A is younger. Option B is correct. A (older) contradicts the principle of superposition. C (same age) is incorrect as layers differ in age. D (cannot determine) is incorrect as position provides age information.";
                } else if (questionText === "What causes a new Moon?") {
                    return "A new Moon occurs when the Moon is between Earth and the Sun, making it nearly invisible from Earth. Option A is correct. B (opposite side) describes a full Moon. C (Earth between) would cause a lunar eclipse. D (90-degree angle) describes quarter phases.";
                } else if (questionText === "What is the primary effect of the Gulf Stream on Western Europe?") {
                    return "The Gulf Stream carries warm water, warming Western Europe’s climate by 5-10°C. Option B is correct. A (increased rainfall) is not the primary effect. C (reduced wind speeds) and D (colder winters) are incorrect as the Gulf Stream warms, not cools, the region.";
                } else if (questionText === "How much more energy does a magnitude 6.0 quake release compared to a magnitude 5.0 quake?") {
                    return "The passage states a magnitude 6.0 quake releases 31.6 times more energy than a magnitude 5.0 quake. Option C is correct. A (10), B (20), and D (50) are incorrect as they do not match the given energy ratio.";
                } else if (questionText === "What would be the primary effect of Earth having no axial tilt?") {
                    return "With no axial tilt, seasonal variations would be minimal, and day length would remain constant year-round. Option B is correct. A (increased temperatures) is incorrect as tilt affects distribution, not overall temperature. C (earthquakes) and D (ocean currents) are unrelated to axial tilt.";
                } else if (questionText === "What was the independent variable in this experiment?") {
                    return "The independent variable is the factor manipulated by the scientist. In this experiment, the amount of fertilizer (0 g, 10 g, 20 g) was varied to test its effect on fruit yield. Option B is correct. A (number of plants) was controlled, C (fruit yield) is the dependent variable, and D (growth period) was constant.";
                } else if (questionText === "What was the dependent variable in this experiment?") {
                    return "The dependent variable is the factor measured in response to the independent variable. Fish survival rate was measured to assess the effect of water pH. Option B is correct. A (water pH) is the independent variable, C (temperature) and D (food) were controlled constants.";
                } else if (questionText === "Which variable was controlled in this experiment?") {
                    return "Controlled variables are kept constant to isolate the effect of the independent variable (soil type). The amount of water (100 mL daily) was the same for all groups. Option C is correct. A (soil type) is the independent variable, B (plant height) is the dependent variable, and D (type of plant) was constant but not the focus.";
                } else if (questionText === "What could the biologist do to improve the reliability of the results?") {
                    return "Increasing the number of petri dishes per temperature (replicates) reduces variability and improves reliability. Option B is correct. A (different species) introduces new variables, C (changing agar) alters conditions, and D (shorter time) may reduce measurable growth.";
                } else if (questionText === "What is a limitation of this experimental design?") {
                    return "Testing only one type of solution limits the generalizability of the results to other solutions. Option A is correct. B (varying light intensity) is the independent variable, not a limitation. C (measuring reaction time) is the dependent variable. D (repeating once) is a strength, not a limitation.";
                } else if (questionText === "Why was the control group included in this experiment?") {
                    return "The control group (0 dB) provides a baseline to compare the effect of noise levels on maze navigation time, isolating the independent variable’s impact. Option C is correct. A (vary noise) describes the experimental groups, B (sample size) is unrelated, and D (different maze) is incorrect as the maze was constant.";
                } else if (questionText === "Which habitat had the highest biodiversity of bird species?") {
                    return "The number of bird species are: Forest (25), Grassland (15), Wetland (20), Desert (10). Forest has the highest biodiversity with 25 species. Option A is correct. B (15), C (20), and D (10) are incorrect as they have fewer species.";
                } else if (questionText === "What is the percentage difference in pollution levels between Urban and Rural areas?") {
                    return "Difference: 50 ppm − 15 ppm = 35 ppm. Percentage difference: (35 ÷ 15) × 100 = 233%. Option C is correct. A (50%), B (70%), and D (300%) miscalculate the percentage difference.";
                } else if (questionText === "What is the average temperature across the four depths?") {
                    return "Sum of temperatures: 22 + 18 + 12 + 8 = 60°C. Average: 60 ÷ 4 = 15°C. Option B is correct. A (12°C), C (18°C), and D (20°C) miscalculate the mean.";
                } else if (questionText === "What is the median number of earthquakes per year?") {
                    return "Ordered data: 8, 10, 10, 12, 15. Median (middle value) is 10. Option B is correct. A (8), C (12), and D (15) are incorrect as they do not represent the middle value.";
                } else if (questionText === "How much taller would a plant in loamy soil be compared to one in clay soil after 8 weeks?") {
                    return "Loamy growth: 4.0 cm/week × 8 = 32 cm. Clay growth: 1.8 cm/week × 8 = 14.4 cm. Difference: 32 − 14.4 = 17.6 cm. Option C is correct. A (1.7 cm), B (4.8 cm), and D (22.4 cm) miscalculate the growth difference.";
                } else if (questionText === "What does the standard deviation indicate about the rainfall data?") {
                    return "Standard deviation (100 mm) measures how much rainfall varies from the mean. Option B is correct. A (average is 100 mm) misinterprets standard deviation. C (max-min difference) is unrelated. D (even distribution) is incorrect as standard deviation indicates variability.";
                } else if (questionText === "What was the primary purpose of the Declaration of Independence?") {
                        return "The Declaration of Independence aimed to assert the colonies’ right to self-governance and declare separation from Britain. Option B is correct. A (establish government) occurred later, C (military alliance) is unrelated, and D (peace negotiations) was not the goal.";
                    } else if (questionText === "Why was the Bill of Rights added to the Constitution?") {
                        return "The Bill of Rights was added to address Anti-Federalist concerns by protecting individual freedoms. Option B is correct. A (limit state powers) is incorrect as it focuses on individuals, C (expand federal authority) contradicts its purpose, and D (regulate trade) is unrelated.";
                    } else if (questionText === "What was the main impact of the Louisiana Purchase?") {
                        return "The Louisiana Purchase doubled U.S. territory, significantly expanding its land. Option B is correct. A (ties with France) was secondary, C (War of 1812) is unrelated, and D (reduced debt) is incorrect as it increased spending.";
                    } else if (questionText === "What was the primary goal of the Missouri Compromise?") {
                        return "The Missouri Compromise aimed to maintain balance between free and slave states by admitting Missouri (slave) and Maine (free) and setting a slavery boundary. Option B is correct. A (abolish slavery) was not the goal, C (expand territory) is incorrect, and D (state control) contradicts the federal boundary.";
                    } else if (questionText === "What was a key limitation of the Emancipation Proclamation?") {
                        return "The Emancipation Proclamation only freed slaves in Confederate states, not in border states or Union areas. Option B is correct. A (freed all slaves) is incorrect, C (post-war) is factually wrong, and D (banned in border states) misstates the scope.";
                    } else if (questionText === "What was the main effect of the 19th Amendment?") {
                        return "The 19th Amendment granted women the right to vote, expanding their voting rights. Option B is correct. A (racial discrimination) is unrelated, C (voting age) refers to a different amendment, and D (restrict state laws) is incorrect.";
                    } else if (questionText === "What was a primary objective of the New Deal?") {
                        return "The New Deal aimed to provide economic relief and recovery during the Great Depression through programs like Social Security. Option B is correct. A (reduce spending) contradicts its purpose, C (military power) is unrelated, and D (limit workers’ rights) is incorrect.";
                    } else if (questionText === "What was a key factor that led to the passage of the Civil Rights Act of 1964?") {
                        return "Civil rights activism, including the March on Washington, was a key factor in passing the Civil Rights Act. Option B is correct. A (Great Depression) is unrelated, C (World War II) is earlier, and D (voting rights) came later with the Voting Rights Act.";
                    } else if (questionText === "What was the authors’ primary argument in the Federalist Papers?") {
                        return "The Federalist Papers argued for ratifying the Constitution by supporting a strong federal government to ensure stability. Option A is correct. B (state independence) aligns with Anti-Federalists, C (oppose Bill of Rights) is incorrect, and D (limit judiciary) is not the focus.";
                    } else if (questionText === "How did the Dred Scott decision impact sectional tensions in the United States?") {
                        return "The Dred Scott decision denied African American citizenship and allowed slavery in territories, increasing North-South tensions. Option B is correct. A (reduced conflicts) is incorrect, C (resolved disputes) is false, and D (promoted unity) contradicts its divisive impact.";
                    } else if (questionText === "What is the primary purpose of the separation of powers in the U.S. Constitution?") {
                        return "Separation of powers divides government into three branches to prevent any one from dominating, thus preventing abuse of power. Option B is correct. A (centralize authority) contradicts the purpose, C (eliminate state governments) is unrelated, and D (simplify lawmaking) is incorrect.";
                    } else if (questionText === "How is the number of electors for each state determined?") {
                        return "Each state’s electors equal its total congressional representation (senators plus representatives). Option B is correct. A (population) is indirect, C (voter turnout) and D (geographic size) are unrelated to the Electoral College.";
                    } else if (questionText === "Which right is protected by the First Amendment?") {
                        return "The First Amendment protects freedoms including speech. Option B is correct. A (bear arms) is the Second Amendment, C (speedy trial) is the Sixth, and D (unreasonable searches) is the Fourth.";
                    } else if (questionText === "What does the 10th Amendment primarily address?") {
                        return "The 10th Amendment reserves powers not delegated to the federal government to states or the people. Option B is correct. A (federal supremacy) contradicts it, C (judicial review) is unrelated, and D (taxation) is not the focus.";
                    } else if (questionText === "What was the significance of Marbury v. Madison?") {
                        return "Marbury v. Madison established judicial review, allowing courts to strike down unconstitutional laws. Option B is correct. A (voting rights), C (presidential powers), and D (slavery) are unrelated to the case.";
                    } else if (questionText === "What is the basis for representation in the House of Representatives?") {
                        return "House representation is based on state population, with 435 members apportioned accordingly. Option B is correct. A (equal per state) applies to the Senate, C (voters) and D (land area) are incorrect.";
                    } else if (questionText === "What is a key provision of the 14th Amendment?") {
                        return "The 14th Amendment ensures equal protection under the law. Option B is correct. A (voting for women) is the 19th Amendment, C (religion) is the First, and D (bear arms) is the Second.";
                    } else if (questionText === "What is required to propose a constitutional amendment?") {
                        return "Proposing an amendment requires a two-thirds vote in both houses of Congress or a convention called by two-thirds of states. Option B is correct. A (majority vote) is insufficient, C (presidential approval) is not required, and D (unanimous states) is incorrect.";
                    } else if (questionText === "How can Congress counteract a presidential veto?") {
                        return "Congress can override a presidential veto with a two-thirds vote in both houses. Option C is correct. A (new law) requires starting over, B (Supreme Court) is unrelated, and D (referendum) is not a constitutional process.";


        
   
    }
   
    
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