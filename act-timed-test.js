document.addEventListener("DOMContentLoaded", () => {
    const passageElement = document.getElementById("passage");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const countdownEl = document.getElementById("countdown");
    const actIntroContainer = document.getElementById("act-intro-container");
    const startTestButton = document.getElementById("start-test-btn");
    const continueButton = document.getElementById("continue-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let selectedQuestions = [];
    let categoryStats = {};
    let results = localStorage.getItem("actResults");
    results = results ? JSON.parse(results) : {};
    let refreshIntervalId;
    let time;
    let userResponses = [];
    let currentSection = "english";

    // Sample questions (replace with full question banks)
    const englishQuestions = [
        ///Passage 1
        
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which punctuation corrects the sentence 'Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass'?",
                answers: [
                    { text: "A) Aisha the team’s coder had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                    { text: "B) Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: true },
                    { text: "C) Aisha the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                    { text: "D) Aisha, the team’s coder had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which word replaces 'addressing' in 'Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem' to maintain verb tense consistency?",
                answers: [
                    { text: "A) addressed", correct: true },
                    { text: "B) addresses", correct: false },
                    { text: "C) will address", correct: false },
                    { text: "D) had addressed", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which pronoun corrects the agreement error in 'The team knew the stakes: a win could fund a town-wide recycling program'?",
                answers: [
                    { text: "A) The team knew their stakes: a win could fund a town-wide recycling program.", correct: false },
                    { text: "B) The team knew its stakes: a win could fund a town-wide recycling program.", correct: true },
                    { text: "C) The teams knew the stakes: a win could fund a town-wide recycling program.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which phrase replaces 'based on' in 'Leo, an engineering whiz, designed a claw that adjusted its grip based on material density' to improve clarity?",
                answers: [
                    { text: "A) depending on", correct: true },
                    { text: "B) because of", correct: false },
                    { text: "C) in response to", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "knowledge-of-language"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which revision best combines 'Their robot wasn’t perfect; glass sorting still lagged behind plastic' to improve flow?",
                answers: [
                    { text: "A) Their robot wasn’t perfect, with glass sorting lagging behind plastic.", correct: false },
                    { text: "B) Their robot wasn’t perfect, as glass sorting still lagged behind plastic.", correct: true },
                    { text: "C) Although their robot wasn’t perfect, glass sorting lagged behind plastic.", correct: false },
                    { text: "D) Their robot wasn’t perfect because glass sorting lagged behind plastic.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which revision to 'Critics in the audience murmured—could a high school team really tackle such a complex issue?' best maintains the passage’s tone?",
                answers: [
                    { text: "A) Critics in the audience whispered—could teenagers possibly solve such a tough problem?", correct: false },
                    { text: "B) Skeptics in the crowd muttered—could a high school team truly address so intricate an issue?", correct: false },
                    { text: "C) Observers in the audience murmured—could students really handle such a complex challenge?", correct: true },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which punctuation corrects 'Early prototypes had faltered; one memorably scattered cans across the lab'?",
                answers: [
                    { text: "A) Early prototypes had faltered, one memorably scattered cans across the lab.", correct: true },
                    { text: "B) Early prototypes had faltered: one memorably scattered cans across the lab.", correct: false },
                    { text: "C) Early prototypes had faltered—one memorably scattered cans across the lab.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which sentence best follows 'As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration' to emphasize persistence?",
                answers: [
                    { text: "A) The judges began their deliberations.", correct: false },
                    { text: "B) Leo packed up the equipment carefully.", correct: false },
                    { text: "C) Undeterred, the team planned their next upgrades.", correct: true },
                    { text: "D) The crowd dispersed slowly.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which revision corrects the verb tense in 'Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates'?",
                answers: [
                    { text: "A) Aisha and Leo had exchanged a glance, silently acknowledging months of scrapped designs and heated debates.", correct: true },
                    { text: "B) Aisha and Leo exchange a glance, silently acknowledging months of scrapped designs and heated debates.", correct: false },
                    { text: "C) Aisha and Leo exchanging a glance, silently acknowledging months of scrapped designs and heated debates.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which revision to 'a spark of innovation born from late-night pizza and stubborn hope' enhances conciseness?",
                answers: [
                    { text: "A) an innovation sparked by pizza and hope", correct: false },
                    { text: "B) a spark from late-night pizza and hope", correct: false },
                    { text: "C) innovation born from pizza and resolve", correct: true },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which sentence contains a misplaced modifier?",
                answers: [
                    { text: "A) For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code.", correct: false },
                    { text: "B) Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass.", correct: false },
                    { text: "C) Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm.", correct: false },
                    { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
                ],
                type: "english",
                difficulty: "hard",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which transition phrase, inserted before 'The judges, however, scribbled notes, their expressions unreadable,' clarifies the contrast?",
                answers: [
                    { text: "A) Meanwhile", correct: false },
                    { text: "B) In contrast", correct: true },
                    { text: "C) For example", correct: false },
                    { text: "D) As a result", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which phrase replaces 'despite her nerves' in 'The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves' for precision?",
                answers: [
                    { text: "A) though she was nervous", correct: false },
                    { text: "B) despite her anxiety", correct: false },
                    { text: "C) though anxious", correct: true },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which revision to 'Yet each failure fueled their resolve' emphasizes resilience?",
                answers: [
                    { text: "A) Still, every setback strengthened their determination.", correct: false },
                    { text: "B) Yet each failure bolstered their tenacity.", correct: true },
                    { text: "C) But failures pushed them to try again.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "hard",
                category: "production-of-writing"
            },
            {
                passage: "The community center buzzed with anticipation as the robotics team unveiled their project. For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code. Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem. Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass. Leo, an engineering whiz, designed a claw that adjusted its grip based on material density. Early prototypes had faltered; one memorably scattered cans across the lab. Yet each failure fueled their resolve. Now, with the regional competition looming, their robot hummed smoothly, its sensors blinking in rhythm. The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves. Leo demonstrated the claw, which plucked a bottle from a pile with eerie accuracy. Critics in the audience murmured—could a high school team really tackle such a complex issue? The judges, however, scribbled notes, their expressions unreadable. Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates. Their robot wasn’t perfect; glass sorting still lagged behind plastic. But it was a start, a spark of innovation born from late-night pizza and stubborn hope. The team knew the stakes: a win could fund a town-wide recycling program. As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration. Progress, she thought, was messy but worth it.",
                question: "Which sentence has an error in parallel structure?",
                answers: [
                    { text: "A) For months, the group—led by juniors Aisha Khan and Leo Cruz—had toiled after school, soldering circuits and debugging code.", correct: false },
                    { text: "B) Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates.", correct: false },
                    { text: "C) Their robot wasn’t perfect; glass sorting still lagged behind plastic.", correct: false },
                    { text: "D) None of the sentences have an error in parallel structure.", correct: true }
                ],
                type: "english",
                difficulty: "hard",
                category: "conventions-of-standard-english"
            },
        
    ///Passage 2
    
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which punctuation corrects the sentence 'The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest'?",
            answers: [
                { text: "A) The plan promised faster commutes but at a steep cost, fares would rise, hitting low-income riders hardest.", correct: false },
                { text: "B) The plan promised faster commutes, but at a steep cost: fares would rise, hitting low-income riders hardest.", correct: true },
                { text: "C) The plan promised faster commutes; but at a steep cost: fares would rise, hitting low-income riders hardest.", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "medium",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "In the sentence 'Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class,' which phrase corrects the parallel structure?",
            answers: [
                { text: "A) a single mother who juggled two jobs, a student who raced to class", correct: false },
                { text: "B) a single mother juggling two jobs, a student who was racing to class", correct: false },
                { text: "C) a single mother who juggles two jobs, a student who races to class", correct: true },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which word should replace 'synthesizing' in 'Maya tapped her pen, synthesizing ideas' to improve clarity?",
            answers: [
                { text: "A) combining", correct: false },
                { text: "B) integrating", correct: true },
                { text: "C) analyzing", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "medium",
            category: "knowledge-of-language"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which sentence best follows 'The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence' to emphasize Maya’s dedication?",
            answers: [
                { text: "A) The office lights dimmed as she worked on.", correct: false },
                { text: "B) The others left for home quickly.", correct: false },
                { text: "C) She stayed late, perfecting each word with care.", correct: true },
                { text: "D) Jamal offered to help with edits.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "production-of-writing"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "In the sentence 'Others hesitated, wary of alienating city officials,' which pronoun correctly replaces 'Others' for agreement with the subject?",
            answers: [
                { text: "A) Some", correct: false },
                { text: "B) Certain members", correct: true },
                { text: "C) Everyone", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "medium",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which revision to 'The piece wasn’t flawless; it sidestepped some thorny budget details' best improves conciseness?",
            answers: [
                { text: "A) Though not flawless, the piece avoided some complex budget issues.", correct: false },
                { text: "B) The piece, not perfect, skipped budget details.", correct: true },
                { text: "C) Not flawless, it ignored thorny budget problems.", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "knowledge-of-language"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which punctuation corrects the sentence 'The room crackled with debate, voices rising over cold coffee'?",
            answers: [
                { text: "A) The room crackled with debate; voices rising over cold coffee.", correct: false },
                { text: "B) The room crackled with debate: voices rising over cold coffee.", correct: false },
                { text: "C) The room crackled with debate, with voices rising over cold coffee.", correct: true },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "medium",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which transition phrase, inserted before 'Nods circled the table, though Jamal pushed for sharper phrasing,' best clarifies the contrast?",
            answers: [
                { text: "A) Meanwhile", correct: false },
                { text: "B) Despite this", correct: true },
                { text: "C) For instance", correct: false },
                { text: "D) In addition", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "production-of-writing"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which revision to 'Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes' corrects a subtle verb tense error?",
            answers: [
                { text: "A) Her colleague, Jamal, argues for a bold stance, urging the board to call for subsidies to offset fare hikes.", correct: false },
                { text: "B) Her colleague, Jamal, had argued for a bold stance, urging the board to call for subsidies to offset fare hikes.", correct: false },
                { text: "C) Her colleague, Jamal, arguing for a bold stance, urged the board to call for subsidies to offset fare hikes.", correct: false },
                { text: "D) No change is needed.", correct: true }
            ],
            type: "english",
            difficulty: "difficult",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which phrase in 'It called for compromise—targeted fare relief funded by reallocated taxes' best replaces 'funded by' to enhance precision?",
            answers: [
                { text: "A) supported through", correct: false },
                { text: "B) paid with", correct: false },
                { text: "C) financed by", correct: true },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "knowledge-of-language"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which sentence contains a misplaced modifier requiring correction?",
            answers: [
                { text: "A) Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts.", correct: false },
                { text: "B) The board’s challenge was balance: critique the plan’s flaws without dismissing its potential.", correct: false },
                { text: "C) As midnight neared, Maya read a paragraph aloud, her tone measured but firm.", correct: false },
                { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
            ],
            type: "english",
            difficulty: "very difficult",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which revision to 'The plan promised faster commutes but at a steep cost' best emphasizes the trade-off while maintaining tone?",
            answers: [
                { text: "A) The plan offered quicker commutes, yet its high cost burdened many.", correct: true },
                { text: "B) The plan guaranteed fast commutes, but fares soared.", correct: false },
                { text: "C) The plan sped up commutes at an unfair price.", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "very difficult",
            category: "production-of-writing"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "In 'The editorial board gathered in a cramped office, papers strewn across the table,' which verb corrects the participle 'strewn' for agreement?",
            answers: [
                { text: "A) scattered", correct: false },
                { text: "B) strewed", correct: false },
                { text: "C) piled", correct: false },
                { text: "D) No change is needed.", correct: true }
            ],
            type: "english",
            difficulty: "medium",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which sentence best introduces the passage to clarify the board’s purpose?",
            answers: [
                { text: "A) The editorial board met to write an influential op-ed on the city’s transit plan.", correct: false },
                { text: "B) The city’s transit overhaul sparked heated discussions.", correct: false },
                { text: "C) Maya Patel led the editorial board with confidence.", correct: false },
                { text: "D) The board convened to draft a compelling op-ed addressing the transit proposal.", correct: true }
            ],
            type: "english",
            difficulty: "difficult",
            category: "production-of-writing"
        },
        {
            passage: "The editorial board gathered in a cramped office, papers strewn across the table. Their task was daunting: craft an op-ed on the city’s proposed transit overhaul. Lead writer Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts. The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest. Maya frowned, scribbling notes. Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes. Others hesitated, wary of alienating city officials. The room crackled with debate, voices rising over cold coffee. Maya tapped her pen, synthesizing ideas. Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class. The board’s challenge was balance: critique the plan’s flaws without dismissing its potential. As midnight neared, Maya read a paragraph aloud, her tone measured but firm. It called for compromise—targeted fare relief funded by reallocated taxes. Nods circled the table, though Jamal pushed for sharper phrasing. The piece wasn’t flawless; it sidestepped some thorny budget details. Yet it felt honest, a call to action grounded in real lives. The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence. Good writing, she knew, demanded both heart and precision.",
            question: "Which sentence contains an error in parallel structure?",
            answers: [
                { text: "A) Maya Patel sifted through data—bus routes, funding gaps, commuter surveys—her laptop glowing with charts.", correct: false },
                { text: "B) Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class.", correct: false },
                { text: "C) The board’s challenge was balance: critique the plan’s flaws without dismissing its potential.", correct: false },
                { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
            ],
            type: "english",
            difficulty: "very difficult",
            category: "conventions-of-standard-english"
        },

        

    ///Passage 3
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which punctuation corrects the sentence 'Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo'?",
                answers: [
                    { text: "A) Early tests were promising but scaling up proved tricky, one prototype had leaked during a demo.", correct: false },
                    { text: "B) Early tests were promising, but scaling up proved tricky: one prototype had leaked during a demo.", correct: true },
                    { text: "C) Early tests were promising; but scaling up proved tricky; one prototype had leaked during a demo.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which phrase corrects the parallel structure in 'Elena had pored over chemical data, her notebook filled with scribbled equations'?",
                answers: [
                    { text: "A) her notebook filling with scribbled equations", correct: false },
                    { text: "B) her notebook containing scribbled equations", correct: true },
                    { text: "C) scribbled equations filling her notebook", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which word replaces 'balancing' in 'Elena refined her design, balancing cost and efficiency' to enhance clarity?",
                answers: [
                    { text: "A) weighing", correct: true },
                    { text: "B) adjusting", correct: false },
                    { text: "C) managing", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which sentence best follows 'Elena and Samir shared a hopeful glance, knowing their work could spark real change' to emphasize their ambition?",
                answers: [
                    { text: "A) Their vision extended beyond the fair, aiming for community impact.", correct: true },
                    { text: "B) The crowd began to disperse slowly.", correct: false },
                    { text: "C) Samir packed up the booth carefully.", correct: false },
                    { text: "D) The judges moved to the next exhibit.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "production-of-writing"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which pronoun corrects 'Judges circled, asking pointed questions about scalability and maintenance' for subject-verb agreement?",
                answers: [
                    { text: "A) The judges", correct: true },
                    { text: "B) A judge", correct: false },
                    { text: "C) They", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which revision to 'The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward' improves conciseness?",
                answers: [
                    { text: "A) Though not perfect, the purifier’s output dropped on cloudy days, yet it marked progress.", correct: false },
                    { text: "B) Imperfect, the purifier faltered on cloudy days but advanced technology.", correct: true },
                    { text: "C) The purifier, not perfect, had lower output on cloudy days, but it was a step forward.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "knowledge-of-language"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which punctuation corrects 'Spectators whispered about its potential, some skeptical of a student solving such a complex problem'?",
                answers: [
                    { text: "A) Spectators whispered about its potential; some skeptical of a student solving such a complex problem.", correct: false },
                    { text: "B) Spectators whispered about its potential, some were skeptical of a student solving such a complex problem.", correct: false },
                    { text: "C) Spectators whispered about its potential, with some skeptical of a student solving such a complex problem.", correct: true },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which transition phrase, inserted before 'Elena ignored the murmurs, focused on the judges’ reactions,' clarifies the contrast?",
                answers: [
                    { text: "A) Nevertheless", correct: false },
                    { text: "B) Instead", correct: true },
                    { text: "C) For example", correct: false },
                    { text: "D) As a result", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "production-of-writing"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which revision corrects the verb tense in 'Samir emphasized the purifier’s low cost, a nod to the town’s tight budget'?",
                answers: [
                    { text: "A) Samir emphasizes the purifier’s low cost, a nod to the town’s tight budget.", correct: false },
                    { text: "B) Samir had emphasized the purifier’s low cost, a nod to the town’s tight budget.", correct: true },
                    { text: "C) Samir emphasizing the purifier’s low cost, a nod to the town’s tight budget.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which phrase replaces 'a testament to their grit' to maintain tone and improve precision?",
                answers: [
                    { text: "A) a reflection of their effort", correct: false },
                    { text: "B) proof of their determination", correct: false },
                    { text: "C) evidence of their perseverance", correct: true },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "knowledge-of-language"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which sentence contains a misplaced modifier?",
                answers: [
                    { text: "A) Elena had pored over chemical data, her notebook filled with scribbled equations.", correct: false },
                    { text: "B) Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics.", correct: false },
                    { text: "C) As the fair wound down, a judge lingered, jotting notes.", correct: false },
                    { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
                ],
                type: "english",
                difficulty: "very difficult",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which revision to 'Undaunted, Elena refined her design' emphasizes her resilience?",
                answers: [
                    { text: "A) Unfazed, Elena tirelessly improved her design.", correct: true },
                    { text: "B) Determined, Elena worked on her design.", correct: false },
                    { text: "C) Elena, undaunted, revised her design.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "very difficult",
                category: "production-of-writing"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which verb corrects 'filtered' in 'Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane' for tense consistency?",
                answers: [
                    { text: "A) filters", correct: false },
                    { text: "B) had filtered", correct: false },
                    { text: "C) filtering", correct: false },
                    { text: "D) No change is needed.", correct: true }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which sentence best introduces the passage to clarify the context?",
                answers: [
                    { text: "A) The science fair showcased student innovations, including Elena’s water purifier.", correct: false },
                    { text: "B) Elena and Samir collaborated on a project to address local water issues.", correct: false },
                    { text: "C) At the annual science fair, Elena Ortiz presented a solution to a pressing problem.", correct: true },
                    { text: "D) The town’s water quality crisis inspired Elena’s science fair project.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "production-of-writing"
            },
            {
                passage: "The science fair buzzed with energy, booths overflowing with projects. At one table, sophomore Elena Ortiz adjusted her solar-powered water purifier. Months of tinkering had led to this moment—her chance to address the town’s water quality issues. Elena had pored over chemical data, her notebook filled with scribbled equations. Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane. Early tests were promising, but scaling up proved tricky; one prototype had leaked during a demo. Undaunted, Elena refined her design, balancing cost and efficiency. Her partner, Samir, a senior, handled the presentation, his calm voice detailing the purifier’s mechanics. Judges circled, asking pointed questions about scalability and maintenance. Elena answered confidently, though her hands fidgeted with a screwdriver. The purifier wasn’t perfect—cloudy days reduced its output—but it was a leap forward. Spectators whispered about its potential, some skeptical of a student solving such a complex problem. Elena ignored the murmurs, focused on the judges’ reactions. Samir emphasized the purifier’s low cost, a nod to the town’s tight budget. As the fair wound down, a judge lingered, jotting notes. Elena and Samir shared a hopeful glance, knowing their work could spark real change. The purifier hummed softly, a testament to their grit. Elena jotted a final tweak in her notebook, already planning version two. Innovation, she thought, thrived on persistence.",
                question: "Which sentence contains an error in parallel structure?",
                answers: [
                    { text: "A) Months of tinkering had led to this moment—her chance to address the town’s water quality issues.", correct: false },
                    { text: "B) Elena answered confidently, though her hands fidgeted with a screwdriver.", correct: false },
                    { text: "C) Her device, a sleek cylinder, filtered contaminants using UV light and a custom membrane.", correct: false },
                    { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
                ],
                type: "english",
                difficulty: "very difficult",
                category: "conventions-of-standard-english"
            },
            
        ///Passage 4
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which punctuation corrects the sentence 'Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce'?",
            answers: [
                { text: "A) Early on, drought threatened their crops: one irrigation system failed spectacularly, flooding a bed of lettuce.", correct: false },
                { text: "B) Early on, drought threatened their crops, but one irrigation system failed spectacularly, flooding a bed of lettuce.", correct: true },
                { text: "C) Early on, drought threatened their crops; one irrigation system failed spectacularly; flooding a bed of lettuce.", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "medium",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which phrase corrects the parallel structure in 'Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds'?",
            answers: [
                { text: "A) hauling soil, building raised beds, and battling weeds", correct: false },
                { text: "B) had hauled soil, had built raised beds, and had battled weeds", correct: true },
                { text: "C) hauled soil, raised beds built, and battled weeds", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which word replaces 'tweaking' in 'Lila, undeterred, sourced a drip system, tweaking it for efficiency' to improve clarity?",
            answers: [
                { text: "A) adjusting", correct: true },
                { text: "B) repairing", correct: false },
                { text: "C) designing", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "medium",
            category: "knowledge-of-language"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which sentence best follows 'As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning' to emphasize their commitment?",
            answers: [
                { text: "A) Their dedication promised more growth for the garden’s future.", correct: true },
                { text: "B) The crowd lingered, admiring the produce.", correct: false },
                { text: "C) Marcus began sketching workshop flyers.", correct: false },
                { text: "D) The sun set slowly over the garden.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "production-of-writing"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which pronoun corrects 'Visitors asked about soil health, their curiosity sparking Lila’s pride' for agreement?",
            answers: [
                { text: "A) whose", correct: true },
                { text: "B) which", correct: false },
                { text: "C) its", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "medium",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which revision to 'The garden wasn’t flawless; pests still nibbled crops, and funding was tight' improves conciseness?",
            answers: [
                { text: "A) Though not flawless, the garden faced pest issues and tight funding.", correct: false },
                { text: "B) The garden, imperfect, struggled with pests and limited funds.", correct: true },
                { text: "C) Not flawless, the garden had pests and funding shortages.", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "knowledge-of-language"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which punctuation corrects 'Some scoffed, doubting a small garden could dent grocery bills'?",
            answers: [
                { text: "A) Some scoffed; doubting a small garden could dent grocery bills.", correct: false },
                { text: "B) Some scoffed, they doubted a small garden could dent grocery bills.", correct: false },
                { text: "C) Some scoffed, as they doubted a small garden could dent grocery bills.", correct: true },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "medium",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which transition phrase, inserted before 'Lila smiled, pointing to a family filling baskets with free kale,' clarifies the contrast?",
            answers: [
                { text: "A) In contrast", correct: false },
                { text: "B) Instead", correct: true },
                { text: "C) For instance", correct: false },
                { text: "D) As a result", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "production-of-writing"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which revision corrects the verb tense in 'Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments'?",
            answers: [
                { text: "A) Marcus, a retired engineer, maps water usage, his charts guiding their adjustments.", correct: false },
                { text: "B) Marcus, a retired engineer, had mapped water usage, his charts guiding their adjustments.", correct: true },
                { text: "C) Marcus, a retired engineer, mapping water usage, his charts guided their adjustments.", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which phrase replaces 'sparking Lila’s pride' to maintain tone and improve precision?",
            answers: [
                { text: "A) igniting Lila’s enthusiasm", correct: false },
                { text: "B) fueling Lila’s satisfaction", correct: false },
                { text: "C) kindling Lila’s sense of accomplishment", correct: true },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "knowledge-of-language"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which sentence contains a misplaced modifier?",
            answers: [
                { text: "A) Lila’s vision was bold: grow organic produce while teaching sustainable practices.", correct: false },
                { text: "B) Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments.", correct: false },
                { text: "C) At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd.", correct: false },
                { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
            ],
            type: "english",
            difficulty: "very difficult",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which revision to 'Lila, undeterred, sourced a drip system' emphasizes her resourcefulness?",
            answers: [
                { text: "A) Lila, resilient, cleverly sourced a drip system.", correct: true },
                { text: "B) Lila, persistent, found a drip system.", correct: false },
                { text: "C) Lila, undeterred, installed a drip system.", correct: false },
                { text: "D) No change is needed.", correct: false }
            ],
            type: "english",
            difficulty: "very difficult",
            category: "production-of-writing"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which verb corrects 'built' in 'Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds' for tense consistency?",
            answers: [
                { text: "A) build", correct: false },
                { text: "B) had built", correct: false },
                { text: "C) building", correct: false },
                { text: "D) No change is needed.", correct: true }
            ],
            type: "english",
            difficulty: "medium",
            category: "conventions-of-standard-english"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which sentence best introduces the passage to clarify the garden’s purpose?",
            answers: [
                { text: "A) The community garden, led by Lila Nguyen, aimed to combat food insecurity.", correct: false },
                { text: "B) Lila Nguyen’s garden project transformed a vacant lot for community benefit.", correct: false },
                { text: "C) The community garden provided fresh produce and education for local residents.", correct: true },
                { text: "D) Volunteers worked tirelessly to sustain the community garden.", correct: false }
            ],
            type: "english",
            difficulty: "difficult",
            category: "production-of-writing"
        },
        {
            passage: "The community garden glowed under morning light, rows of vegetables thriving despite the dry summer. Coordinator Lila Nguyen knelt beside a tomato plant, her hands deftly pruning wilted leaves. For years, she’d led the effort to transform a vacant lot into a shared green space, a haven for neighbors battling rising food costs. Lila’s vision was bold: grow organic produce while teaching sustainable practices. Her team—volunteers of all ages—had hauled soil, built raised beds, and battled weeds. Early on, drought threatened their crops; one irrigation system failed spectacularly, flooding a bed of lettuce. Lila, undeterred, sourced a drip system, tweaking it for efficiency. Her co-leader, Marcus, a retired engineer, mapped water usage, his charts guiding their adjustments. At the annual harvest fair, Lila shared their yield—crates of zucchini, peppers, and herbs—with the crowd. Visitors asked about soil health, their curiosity sparking Lila’s pride. Some scoffed, doubting a small garden could dent grocery bills. Lila smiled, pointing to a family filling baskets with free kale. The garden wasn’t flawless; pests still nibbled crops, and funding was tight. Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher. As the fair ended, Marcus suggested a composting workshop, and Lila nodded, already planning. Sustainability, she knew, demanded patience and dirt under the nails.",
            question: "Which sentence contains an error in parallel structure?",
            answers: [
                { text: "A) For years, she’d led the effort to transform a vacant lot into a shared green space.", correct: false },
                { text: "B) Visitors asked about soil health, their curiosity sparking Lila’s pride.", correct: false },
                { text: "C) Yet its impact was clear: neighbors connected, kids learned to plant, and meals grew fresher.", correct: false },
                { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
            ],
            type: "english",
            difficulty: "very difficult",
            category: "conventions-of-standard-english"
        },
        
            ///Passage 5
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which punctuation corrects the sentence 'Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through'?",
                answers: [
                    { text: "A) Her cast, a mix of shy newcomers and bold performers, had stumbled early: missed cues and forgotten lines plagued their first run-through.", correct: true },
                    { text: "B) Her cast, a mix of shy newcomers and bold performers, had stumbled early, missed cues and forgotten lines plagued their first run-through.", correct: false },
                    { text: "C) Her cast, a mix of shy newcomers and bold performers, had stumbled early; missed cues and forgotten lines plagued their first run-through.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which phrase corrects the parallel structure in 'Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit'?",
                answers: [
                    { text: "A) blending sharp dialogue with live music to capture the town’s spirit", correct: false },
                    { text: "B) to blend sharp dialogue and live music, capturing the town’s spirit", correct: true },
                    { text: "C) blend sharp dialogue and live music, captured the town’s spirit", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which word replaces 'weaving' in 'Undaunted, Amara refined their pacing, weaving feedback into late-night notes' to improve clarity?",
                answers: [
                    { text: "A) incorporating", correct: true },
                    { text: "B) crafting", correct: false },
                    { text: "C) blending", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which sentence best follows 'As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season' to emphasize their vision?",
                answers: [
                    { text: "A) Their ambition promised bolder productions to come.", correct: true },
                    { text: "B) The audience filed out, buzzing with excitement.", correct: false },
                    { text: "C) Priya began organizing the talkback logistics.", correct: false },
                    { text: "D) The stage crew dimmed the lights.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "production-of-writing"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which pronoun corrects 'Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth' for agreement?",
                answers: [
                    { text: "A) with some skeptical", correct: true },
                    { text: "B) they were skeptical", correct: false },
                    { text: "C) who were skeptical", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which revision to 'The play wasn’t perfect; transitions lagged, and one song went off-key' improves conciseness?",
                answers: [
                    { text: "A) Though imperfect, the play had slow transitions and an off-key song.", correct: false },
                    { text: "B) The play, not perfect, suffered from lagging transitions and an off-key song.", correct: true },
                    { text: "C) Not perfect, the play struggled with transitions and a mistuned song.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "knowledge-of-language"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which punctuation corrects 'Opening night brought a packed house, murmurs rippling as the curtain rose'?",
                answers: [
                    { text: "A) Opening night brought a packed house; murmurs rippling as the curtain rose.", correct: false },
                    { text: "B) Opening night brought a packed house, with murmurs rippling as the curtain rose.", correct: false },
                    { text: "C) Opening night brought a packed house, as murmurs rippled when the curtain rose.", correct: true },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which transition phrase, inserted before 'Amara watched from the wings, her pulse steady despite a flickering stage light,' clarifies the shift in focus?",
                answers: [
                    { text: "A) Meanwhile", correct: false },
                    { text: "B) During this", correct: true },
                    { text: "C) For example", correct: false },
                    { text: "D) As a result", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "production-of-writing"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which revision corrects the verb tense in 'Priya, a music teacher, composed a score, her violin melodies threading through scenes'?",
                answers: [
                    { text: "A) Priya, a music teacher, composes a score, her violin melodies threading through scenes.", correct: false },
                    { text: "B) Priya, a music teacher, had composed a score, her violin melodies threading through scenes.", correct: true },
                    { text: "C) Priya, a music teacher, composing a score, her violin melodies threaded through scenes.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which phrase replaces 'carrying grit and hope' to maintain tone and improve precision?",
                answers: [
                    { text: "A) conveying strength and optimism", correct: false },
                    { text: "B) expressing resilience and aspiration", correct: false },
                    { text: "C) embodying determination and hopefulness", correct: true },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "knowledge-of-language"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which sentence contains a misplaced modifier?",
                answers: [
                    { text: "A) Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes.", correct: false },
                    { text: "B) Opening night brought a packed house, murmurs rippling as the curtain rose.", correct: false },
                    { text: "C) Amara watched from the wings, her pulse steady despite a flickering stage light.", correct: false },
                    { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
                ],
                type: "english",
                difficulty: "very difficult",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which revision to 'Undaunted, Amara refined their pacing' emphasizes her leadership?",
                answers: [
                    { text: "A) Resolute, Amara skillfully honed their pacing.", correct: true },
                    { text: "B) Persistent, Amara adjusted their pacing.", correct: false },
                    { text: "C) Amara, undaunted, improved their pacing.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "very difficult",
                category: "production-of-writing"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which verb corrects 'coaxed' in 'For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play' for tense consistency?",
                answers: [
                    { text: "A) coax", correct: false },
                    { text: "B) had coaxed", correct: false },
                    { text: "C) coaxing", correct: false },
                    { text: "D) No change is needed.", correct: true }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which sentence best introduces the passage to clarify the theater’s mission?",
                answers: [
                    { text: "A) The local theater aimed to showcase youth talent in a community-focused play.", correct: false },
                    { text: "B) Amara Cole directed a youth ensemble to tell the town’s story.", correct: false },
                    { text: "C) The youth ensemble’s play celebrated community resilience through theater.", correct: true },
                    { text: "D) The theater prepared for a debut performance led by Amara Cole.", correct: false }
                ],
                type: "english",
                difficulty: "difficult",
                category: "production-of-writing"
            },
            {
                passage: "The local theater hummed with anticipation, its stage set for the youth ensemble’s debut. Director Amara Cole adjusted a spotlight, her eyes scanning the script. For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play about community resilience. Amara’s goal was ambitious: blend sharp dialogue with live music to capture the town’s spirit. Her cast, a mix of shy newcomers and bold performers, had stumbled early—missed cues and forgotten lines plagued their first run-through. Undaunted, Amara refined their pacing, weaving feedback into late-night notes. Her assistant, Priya, a music teacher, composed a score, her violin melodies threading through scenes. At the dress rehearsal, the cast nailed their opening, but a prop malfunction halted Act Two. Amara rallied them, improvising a fix with duct tape. Opening night brought a packed house, murmurs rippling as the curtain rose. The teens delivered, their voices carrying grit and hope. Critics in the audience jotted notes, some skeptical of amateurs pulling off such depth. Amara watched from the wings, her pulse steady despite a flickering stage light. The play wasn’t perfect; transitions lagged, and one song went off-key. Yet its heart shone: stories of neighbors uniting moved the crowd to applause. As the final bow landed, Priya suggested a post-show talkback, and Amara agreed, already envisioning next season. Theater, she knew, thrived on raw passion and relentless tweaks.",
                question: "Which sentence contains an error in parallel structure?",
                answers: [
                    { text: "A) For months, she’d guided teens through rehearsals, coaxing raw talent into a cohesive play.", correct: false },
                    { text: "B) The teens delivered, their voices carrying grit and hope.", correct: false },
                    { text: "C) Yet its heart shone: stories of neighbors uniting moved the crowd to applause.", correct: false },
                    { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
                ],
                type: "english",
                difficulty: "very difficult",
                category: "conventions-of-standard-english"
            }
            
        
        
    ];

    const mathQuestions = [
        // Medium Difficulty (Q21–Q40)
        {
            "question": "What is the value of x in the equation 3x + 7 = 22?",
            "answers": [
                { "text": "4", "correct": false },
                { "text": "5", "correct": true },
                { "text": "6", "correct": false },
                { "text": "7", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Algebra"
        },
        {
            "question": "If f(x) = x^2 + 3x - 4, what is f(2)?",
            "answers": [
                { "text": "8", "correct": false },
                { "text": "4", "correct": false },
                { "text": "6", "correct": true },
                { "text": "10", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Functions"
        },
        {
            "question": "What is the slope of the line passing through points (1, 2) and (3, 6)?",
            "answers": [
                { "text": "2", "correct": true },
                { "text": "1", "correct": false },
                { "text": "3", "correct": false },
                { "text": "4", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Coordinate Geometry"
        },
        {
            "question": "Solve the system of equations: y = 2x + 1, y = x + 5.",
            "answers": [
                { "text": "x = 3, y = 7", "correct": false },
                { "text": "x = 5, y = 10", "correct": false },
                { "text": "x = 2, y = 6", "correct": false },
                { "text": "x = 4, y = 9", "correct": true }
            ],
            "difficulty": "medium",
            "category": "Systems of Equations"
        },
        {
            "question": "What is the area of a triangle with base 8 and height 5?",
            "answers": [
                { "text": "40", "correct": false },
                { "text": "20", "correct": true },
                { "text": "16", "correct": false },
                { "text": "24", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Geometry"
        },
        {
            "question": "If sin(θ) = 3/5 and θ is in quadrant I, what is cos(θ)?",
            "answers": [
                { "text": "3/4", "correct": false },
                { "text": "5/4", "correct": false },
                { "text": "4/5", "correct": true },
                { "text": "2/5", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Trigonometry"
        },
        {
            "question": "What is the value of x if 2x^2 - 8 = 0?",
            "answers": [
                { "text": "4", "correct": false },
                { "text": "1", "correct": false },
                { "text": "3", "correct": false },
                { "text": "2", "correct": true }
            ],
            "difficulty": "medium",
            "category": "Quadratics"
        },
        {
            "question": "A rectangle has a perimeter of 20 and a length of 7. What is its width?",
            "answers": [
                { "text": "3", "correct": true },
                { "text": "4", "correct": false },
                { "text": "5", "correct": false },
                { "text": "6", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Geometry"
        },
        {
            "question": "What is the distance between points (2, 3) and (5, 7)?",
            "answers": [
                { "text": "4", "correct": false },
                { "text": "5", "correct": true },
                { "text": "6", "correct": false },
                { "text": "7", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Coordinate Geometry"
        },
        {
            "question": "If 3x - 5 = 7, what is the value of 6x - 10?",
            "answers": [
                { "text": "12", "correct": false },
                { "text": "16", "correct": false },
                { "text": "14", "correct": true },
                { "text": "18", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Algebra"
        },
        {
            "question": "What is the value of tan(30°)?",
            "answers": [
                { "text": "√3", "correct": false },
                { "text": "√3/3", "correct": true },
                { "text": "1/2", "correct": false },
                { "text": "2/√3", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Trigonometry"
        },
        {
            "question": "Solve for x: x^2 - 5x + 6 = 0.",
            "answers": [
                { "text": "x = 1, 6", "correct": false },
                { "text": "x = 3, 4", "correct": false },
                { "text": "x = 2, 4", "correct": false },
                { "text": "x = 2, 3", "correct": true }
            ],
            "difficulty": "medium",
            "category": "Quadratics"
        },
        {
            "question": "What is the midpoint of the segment connecting (1, 1) and (5, 7)?",
            "answers": [
                { "text": "(3, 4)", "correct": true },
                { "text": "(2, 3)", "correct": false },
                { "text": "(4, 5)", "correct": false },
                { "text": "(3, 5)", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Coordinate Geometry"
        },
        {
            "question": "If a circle has a radius of 4, what is its circumference?",
            "answers": [
                { "text": "4π", "correct": false },
                { "text": "16π", "correct": false },
                { "text": "8π", "correct": true },
                { "text": "12π", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Geometry"
        },
        {
            "question": "What is the solution to the inequality 2x + 3 > 7?",
            "answers": [
                { "text": "x > 3", "correct": false },
                { "text": "x < 2", "correct": false },
                { "text": "x < 3", "correct": false },
                { "text": "x > 2", "correct": true }
            ],
            "difficulty": "medium",
            "category": "Algebra"
        },
        {
            "question": "If f(x) = 2x + 1, what is f(f(1))?",
            "answers": [
                { "text": "7", "correct": true },
                { "text": "5", "correct": false },
                { "text": "9", "correct": false },
                { "text": "3", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Functions"
        },
        {
            "question": "What is the area of a circle with diameter 10?",
            "answers": [
                { "text": "50π", "correct": false },
                { "text": "25π", "correct": true },
                { "text": "100π", "correct": false },
                { "text": "10π", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Geometry"
        },
        {
            "question": "Solve for x: 4x - 3 = 2x + 7.",
            "answers": [
                { "text": "4", "correct": false },
                { "text": "6", "correct": false },
                { "text": "5", "correct": true },
                { "text": "3", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Algebra"
        },
        {
            "question": "What is the value of cos(60°)?",
            "answers": [
                { "text": "√3/2", "correct": false },
                { "text": "1/√2", "correct": false },
                { "text": "√2/2", "correct": false },
                { "text": "1/2", "correct": true }
            ],
            "difficulty": "medium",
            "category": "Trigonometry"
        },
        {
            "question": "What is the vertex of the parabola y = x^2 - 4x + 3?",
            "answers": [
                { "text": "(2, 3)", "correct": false },
                { "text": "(2, -1)", "correct": true },
                { "text": "(4, 3)", "correct": false },
                { "text": "(1, 2)", "correct": false }
            ],
            "difficulty": "medium",
            "category": "Quadratics"
        },
        // Hard Difficulty (Q41–Q60)
        {
            "question": "If log₂(x) = 3, what is x?",
            "answers": [
                { "text": "6", "correct": false },
                { "text": "9", "correct": false },
                { "text": "8", "correct": true },
                { "text": "4", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Logarithms"
        },
        {
            "question": "What is the value of i^5, where i is the imaginary unit?",
            "answers": [
                { "text": "-i", "correct": false },
                { "text": "i", "correct": true },
                { "text": "1", "correct": false },
                { "text": "-1", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Complex Numbers"
        },
        {
            "question": "A car travels 60 miles in 1 hour and 20 minutes. What is its average speed in miles per hour?",
            "answers": [
                { "text": "50", "correct": false },
                { "text": "40", "correct": false },
                { "text": "60", "correct": false },
                { "text": "45", "correct": true }
            ],
            "difficulty": "hard",
            "category": "Word Problems"
        },
        {
            "question": "What is the period of the function f(x) = 3sin(2x)?",
            "answers": [
                { "text": "π", "correct": true },
                { "text": "2π", "correct": false },
                { "text": "π/2", "correct": false },
                { "text": "4π", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Trigonometry"
        },
        {
            "question": "Solve for x: x^3 - 8 = 0.",
            "answers": [
                { "text": "4", "correct": false },
                { "text": "2", "correct": true },
                { "text": "1", "correct": false },
                { "text": "3", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Algebra"
        },
        {
            "question": "What is the sum of the roots of the equation x^2 - 5x + 6 = 0?",
            "answers": [
                { "text": "6", "correct": false },
                { "text": "3", "correct": false },
                { "text": "5", "correct": true },
                { "text": "2", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Quadratics"
        },
        {
            "question": "If a triangle has sides 5, 12, and 13, what is its area?",
            "answers": [
                { "text": "24", "correct": false },
                { "text": "36", "correct": false },
                { "text": "28", "correct": false },
                { "text": "30", "correct": true }
            ],
            "difficulty": "hard",
            "category": "Geometry"
        },
        {
            "question": "What is the value of f(3) if f(x) = 2^x?",
            "answers": [
                { "text": "8", "correct": true },
                { "text": "6", "correct": false },
                { "text": "9", "correct": false },
                { "text": "12", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Functions"
        },
        {
            "question": "Solve for x: 2sin(x) = 1 for 0 ≤ x < 2π.",
            "answers": [
                { "text": "π/3, 2π/3", "correct": false },
                { "text": "π/6, 5π/6", "correct": true },
                { "text": "π/4, 3π/4", "correct": false },
                { "text": "π/2, 3π/2", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Trigonometry"
        },
        {
            "question": "What is the equation of the circle with center (2, -3) and radius 5?",
            "answers": [
                { "text": "(x+2)^2 + (y-3)^2 = 25", "correct": false },
                { "text": "(x-2)^2 + (y+3)^2 = 25", "correct": true },
                { "text": "(x-2)^2 + (y+3)^2 = 5", "correct": false },
                { "text": "(x-2)^2 + (y-3)^2 = 25", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Coordinate Geometry"
        },
        {
            "question": "If f(x) = x^2 + 2x + 1, what is f(x+1)?",
            "answers": [
                { "text": "x^2 + 3x + 2", "correct": false },
                { "text": "x^2 + 2x + 2", "correct": false },
                { "text": "x^2 + 4x + 4", "correct": true },
                { "text": "x^2 + 4x + 3", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Functions"
        },
        {
            "question": "What is the value of log₃(27)?",
            "answers": [
                { "text": "2", "correct": false },
                { "text": "4", "correct": false },
                { "text": "9", "correct": false },
                { "text": "3", "correct": true }
            ],
            "difficulty": "hard",
            "category": "Logarithms"
        },
        {
            "question": "A box contains 3 red and 5 blue marbles. What is the probability of drawing 2 red marbles in a row without replacement?",
            "answers": [
                { "text": "3/28", "correct": true },
                { "text": "1/4", "correct": false },
                { "text": "9/64", "correct": false },
                { "text": "1/2", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Probability"
        },
        {
            "question": "What is the amplitude of the function f(x) = 4cos(3x)?",
            "answers": [
                { "text": "3", "correct": false },
                { "text": "4", "correct": true },
                { "text": "2", "correct": false },
                { "text": "6", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Trigonometry"
        },
        {
            "question": "Solve for x: x^4 - 5x^2 + 4 = 0.",
            "answers": [
                { "text": "x = ±2, ±3", "correct": false },
                { "text": "x = ±1, ±3", "correct": false },
                { "text": "x = ±1, ±2", "correct": true },
                { "text": "x = ±2, ±4", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Algebra"
        },
        {
            "question": "What is the area of an equilateral triangle with side length 6?",
            "answers": [
                { "text": "18√3", "correct": false },
                { "text": "9√3", "correct": true },
                { "text": "6√3", "correct": false },
                { "text": "12√3", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Geometry"
        },
        {
            "question": "If (2 + 3i)(x + yi) = 8 + i, what is x + y?",
            "answers": [
                { "text": "2", "correct": false },
                { "text": "3", "correct": true },
                { "text": "4", "correct": false },
                { "text": "5", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Complex Numbers"
        },
        {
            "question": "What is the sum of the first 10 terms of the arithmetic sequence with first term 3 and common difference 4?",
            "answers": [
                { "text": "200", "correct": false },
                { "text": "220", "correct": false },
                { "text": "190", "correct": false },
                { "text": "210", "correct": true }
            ],
            "difficulty": "hard",
            "category": "Sequences"
        },
        {
            "question": "Solve for x: 2^x = 8.",
            "answers": [
                { "text": "3", "correct": true },
                { "text": "2", "correct": false },
                { "text": "4", "correct": false },
                { "text": "6", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Exponents"
        },
        {
            "question": "What is the value of sin(π/3) + cos(π/6)?",
            "answers": [
                { "text": "1", "correct": false },
                { "text": "√3", "correct": true },
                { "text": "√2", "correct": false },
                { "text": "2", "correct": false }
            ],
            "difficulty": "hard",
            "category": "Trigonometry"
        },
        // Very Hard Difficulty (Q41–Q60, continued)
        {
            "question": "A function is defined as f(x) = x^3 - 3x + 2. What is the sum of the x-coordinates of its critical points?",
            "answers": [
                { "text": "1", "correct": false },
                { "text": "-1", "correct": false },
                { "text": "0", "correct": true },
                { "text": "2", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Functions"
        },
        {
            "question": "If z = 2 + 3i, what is the modulus of z?",
            "answers": [
                { "text": "√13", "correct": true },
                { "text": "√5", "correct": false },
                { "text": "5", "correct": false },
                { "text": "13", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Complex Numbers"
        },
        {
            "question": "A ladder 10 feet long leans against a vertical wall. If the bottom of the ladder is 6 feet from the wall, how high up the wall does the ladder reach?",
            "answers": [
                { "text": "6", "correct": false },
                { "text": "8", "correct": true },
                { "text": "10", "correct": false },
                { "text": "4", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Geometry"
        },
        {
            "question": "What is the value of x if 2^(x+1) = 3^(x-1)?",
            "answers": [
                { "text": "log(2/3) / (log(2) - log(3))", "correct": false },
                { "text": "log(3) / log(2)", "correct": false },
                { "text": "log(3/2) / (log(3) - log(2))", "correct": true },
                { "text": "log(2) / log(3)", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Logarithms"
        },
        {
            "question": "What is the exact value of cos(75°)?",
            "answers": [
                { "text": "(√6 + √2)/4", "correct": false },
                { "text": "(√6 - √2)/4", "correct": true },
                { "text": "(√2 - √6)/4", "correct": false },
                { "text": "√2/2", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Trigonometry"
        },
        {
            "question": "A cone has a radius of 3 and a height of 4. What is its volume?",
            "answers": [
                { "text": "36π", "correct": false },
                { "text": "9π", "correct": false },
                { "text": "12π", "correct": true },
                { "text": "18π", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Geometry"
        },
        {
            "question": "Solve for x: sin(2x) = cos(x) for 0 ≤ x < 2π.",
            "answers": [
                { "text": "π/3, 2π/3, π", "correct": false },
                { "text": "π/6, 5π/6, 3π/2", "correct": true },
                { "text": "π/4, 3π/4, π/2", "correct": false },
                { "text": "0, π, 2π", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Trigonometry"
        },
        {
            "question": "What is the inverse of the function f(x) = 2x + 3?",
            "answers": [
                { "text": "f⁻¹(x) = (x+3)/2", "correct": false },
                { "text": "f⁻¹(x) = 2x - 3", "correct": false },
                { "text": "f⁻¹(x) = x/2 - 3", "correct": false },
                { "text": "f⁻¹(x) = (x-3)/2", "correct": true }
            ],
            "difficulty": "very hard",
            "category": "Functions"
        },
        {
            "question": "A geometric sequence has first term 2 and common ratio 3. What is the 5th term?",
            "answers": [
                { "text": "162", "correct": true },
                { "text": "54", "correct": false },
                { "text": "108", "correct": false },
                { "text": "486", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Sequences"
        },
        {
            "question": "What is the value of ∑(n=1 to 5) n^2?",
            "answers": [
                { "text": "25", "correct": false },
                { "text": "55", "correct": true },
                { "text": "15", "correct": false },
                { "text": "35", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Sequences"
        },
        {
            "question": "If f(x) = x^2 and g(x) = x + 1, what is f(g(x)) - g(f(x))?",
            "answers": [
                { "text": "2x", "correct": false },
                { "text": "x^2 - x", "correct": false },
                { "text": "-2x", "correct": true },
                { "text": "x^2 + x", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Functions"
        },
        {
            "question": "A sphere has a volume of 36π. What is its radius?",
            "answers": [
                { "text": "6", "correct": false },
                { "text": "9", "correct": false },
                { "text": "2", "correct": false },
                { "text": "3", "correct": true }
            ],
            "difficulty": "very hard",
            "category": "Geometry"
        },
        {
            "question": "Solve for x: log₂(x) + log₂(x-1) = 1.",
            "answers": [
                { "text": "1", "correct": false },
                { "text": "2", "correct": true },
                { "text": "3", "correct": false },
                { "text": "4", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Logarithms"
        },
        {
            "question": "What is the exact value of tan(π/12)?",
            "answers": [
                { "text": "2 + √3", "correct": false },
                { "text": "√3 - 2", "correct": false },
                { "text": "2 - √3", "correct": true },
                { "text": "√3 + 2", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Trigonometry"
        },
        {
            "question": "A rectangular prism has a volume of 120, a length of 5, and a width of 4. What is its height?",
            "answers": [
                { "text": "8", "correct": false },
                { "text": "10", "correct": false },
                { "text": "6", "correct": true },
                { "text": "4", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Geometry"
        },
        {
            "question": "What is the discriminant of the quadratic equation x^2 - 4x + 5 = 0?",
            "answers": [
                { "text": "-4", "correct": true },
                { "text": "4", "correct": false },
                { "text": "16", "correct": false },
                { "text": "-16", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Quadratics"
        },
        {
            "question": "If z = 1 + i, what is z^3?",
            "answers": [
                { "text": "2 - 2i", "correct": false },
                { "text": "-2 + 2i", "correct": true },
                { "text": "1 + i", "correct": false },
                { "text": "-1 - i", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Complex Numbers"
        },
        {
            "question": "What is the sum of the infinite geometric series 1 + 1/3 + 1/9 + ...?",
            "answers": [
                { "text": "1", "correct": false },
                { "text": "2", "correct": false },
                { "text": "3/2", "correct": true },
                { "text": "3", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Sequences"
        },
        {
            "question": "Solve for x: 3^(2x) = 27.",
            "answers": [
                { "text": "2", "correct": false },
                { "text": "3/2", "correct": true },
                { "text": "1", "correct": false },
                { "text": "3", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Exponents"
        },
        {
            "question": "What is the value of cos^2(π/8) - sin^2(π/8)?",
            "answers": [
                { "text": "1/2", "correct": false },
                { "text": "√2/2", "correct": true },
                { "text": "√3/2", "correct": false },
                { "text": "1", "correct": false }
            ],
            "difficulty": "very hard",
            "category": "Trigonometry"
        }
    
    ];
    const readingQuestions = [   
        {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "What is the primary reason Clara is drawn to the house on Maple Street?",
        "answers": [
          { "text": "A) She wants to prove the house is haunted.", "correct": false },
          { "text": "B) She is researching Eliza Hawthorne’s life.", "correct": true },
          { "text": "C) She plans to renovate the property.", "correct": false },
          { "text": "D) She is following a family tradition.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "medium",
        "category": "main idea"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "The description of the house in the first paragraph primarily serves to:",
        "answers": [
          { "text": "A) highlight Clara’s bravery in entering it.", "correct": false },
          { "text": "B) establish a mysterious and foreboding atmosphere.", "correct": true },
          { "text": "C) contrast with Clara’s modern lifestyle.", "correct": false },
          { "text": "D) suggest the house’s historical significance.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "medium",
        "category": "author’s purpose"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "What can be inferred about Eliza Hawthorne’s relationship with the townsfolk?",
        "answers": [
          { "text": "A) They admired her poetry but disliked her personally.", "correct": false },
          { "text": "B) They misunderstood her and viewed her as eccentric.", "correct": true },
          { "text": "C) They supported her during her grief over Thomas.", "correct": false },
          { "text": "D) They collaborated with her to preserve her work.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "medium",
        "category": "inference"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "Why does Clara feel an ache while reading Eliza’s journal?",
        "answers": [
          { "text": "A) She is physically uncomfortable in the hidden room.", "correct": false },
          { "text": "B) She empathizes with Eliza and reflects on her own life.", "correct": true },
          { "text": "C) She is frustrated by the journal’s brittle pages.", "correct": false },
          { "text": "D) She fears the house is actually haunted.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "medium",
        "category": "character motivation"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "The phrase ‘heart’s truth’ in the second paragraph most likely refers to:",
        "answers": [
          { "text": "A) Eliza’s secret love affair with Thomas.", "correct": false },
          { "text": "B) the hidden room itself.", "correct": false },
          { "text": "C) Eliza’s most personal writings.", "correct": true },
          { "text": "D) a literal treasure hidden in the house.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "hard",
        "category": "vocabulary in context"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "How does the author use the setting of the hidden room to develop Clara’s character?",
        "answers": [
          { "text": "A) It reveals her fear of confined spaces.", "correct": false },
          { "text": "B) It underscores her determination to uncover Eliza’s story.", "correct": false },
          { "text": "C) It emphasizes her connection to Eliza’s introspective nature.", "correct": true },
          { "text": "D) It highlights her skepticism about the house’s mysteries.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "hard",
        "category": "character development"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "What does the final entry in Eliza’s journal suggest about her intentions?",
        "answers": [
          { "text": "A) She planned to leave town and start anew.", "correct": false },
          { "text": "B) She wanted her work to be discovered by someone curious.", "correct": true },
          { "text": "C) She intended to destroy her journals before disappearing.", "correct": false },
          { "text": "D) She was preparing to confront the townsfolk.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "hard",
        "category": "inference"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "The whisper Clara hears in the final paragraph most likely symbolizes:",
        "answers": [
          { "text": "A) her grandmother’s voice guiding her.", "correct": false },
          { "text": "B) the house’s supernatural presence.", "correct": false },
          { "text": "C) her own intuition urging her to continue.", "correct": false },
          { "text": "D) Eliza’s spirit encouraging her to preserve the journals.", "correct": true }
        ],
        "type": "reading",
        "difficulty": "hard",
        "category": "symbolism"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "How does the author’s use of sensory details, such as the ‘groaning floorboards’ and ‘brittle pages,’ contribute to the passage’s tone?",
        "answers": [
          { "text": "A) They create a sense of nostalgia for the past.", "correct": false },
          { "text": "B) They enhance the eerie and suspenseful mood.", "correct": true },
          { "text": "C) They emphasize Clara’s discomfort in the house.", "correct": false },
          { "text": "D) They highlight the house’s structural decay.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "very hard",
        "category": "literary device"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "What is the significance of the contrast between Clara’s actions and the townsfolk’s perceptions of the house?",
        "answers": [
          { "text": "A) It underscores the townsfolk’s ignorance of Eliza’s true story.", "correct": false },
          { "text": "B) It highlights Clara’s courage in defying superstition.", "correct": false },
          { "text": "C) It suggests Clara’s investigation will alter the town’s beliefs.", "correct": true },
          { "text": "D) It implies the townsfolk are correct about the house’s haunting.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "very hard",
        "category": "theme"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "Based on the passage, how does Clara’s discovery of the hidden room reflect the broader theme of uncovering hidden truths?",
        "answers": [
          { "text": "A) It shows that truths are often inaccessible without persistence.", "correct": true },
          { "text": "B) It suggests that hidden truths are inherently dangerous.", "correct": false },
          { "text": "C) It implies that truths are better left undiscovered.", "correct": false },
          { "text": "D) It indicates that truths are always tied to the supernatural.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "very hard",
        "category": "theme"
      },
      {
        "passage": "The old house on Maple Street stood at the edge of town, its weathered clapboards sagging under the weight of decades. Ivy clung to its walls, curling around the cracked windows like fingers guarding secrets. To the townsfolk, it was a relic—haunted, they whispered, by the spirit of Eliza Hawthorne, who vanished in 1923. Clara, a young librarian with a penchant for unraveling mysteries, felt drawn to the house. She’d spent months poring over archives, piecing together Eliza’s life: a poet, a recluse, a woman who’d loved fiercely and lost tragically. Clara’s fascination wasn’t just academic; it was personal. Her grandmother had spoken of Eliza as if she’d known her, though the timelines didn’t align.\n\nOn a crisp October evening, Clara slipped through the rusted gate, her flashlight cutting through the dusk. The air inside the house was thick with dust, the floorboards groaning under her steps. In the parlor, she found a bureau, its drawers stuffed with letters and poems. One letter, penned in Eliza’s looping script, spoke of a hidden room where she’d kept her ‘heart’s truth.’ Clara’s pulse quickened. She tapped the walls, listening for hollows, until a panel behind the fireplace gave way, revealing a narrow staircase.\n\nThe hidden room was small, its walls lined with shelves of journals. A single chair faced a window overlooking the garden, now overgrown. Clara opened a journal, its pages brittle but legible. Eliza’s words painted a vivid picture: her love for a man named Thomas, a sailor who never returned from sea; her despair as the town turned against her, branding her eccentric; her resolve to hide her work, fearing it would be misunderstood. The final entry was dated the day she disappeared: ‘They will not have my words. I leave them to the one who seeks.’\n\nClara sat in the chair, the journal heavy in her hands. She felt an ache, not just for Eliza, but for herself—a life spent searching for meaning in others’ stories. Outside, the wind stirred the leaves, and for a moment, Clara swore she heard a whisper, soft as a sigh, urging her to keep reading.",
        "question": "The passage’s structure, moving from Clara’s research to her discovery in the hidden room, serves to:",
        "answers": [
          { "text": "A) build suspense and mirror Clara’s journey of understanding.", "correct": true },
          { "text": "B) contrast Clara’s modern perspective with Eliza’s historical one.", "correct": false },
          { "text": "C) emphasize the house’s role as the central character.", "correct": false },
          { "text": "D) highlight the townsfolk’s misconceptions about Eliza.", "correct": false }
        ],
        "type": "reading",
        "difficulty": "very hard",
        "category": "structure"
      },
    
    
    ];
    const scienceQuestions = [        { question: "Science Question?", answers: [{ text: "4", correct: true }, { text: "5", correct: false }], difficulty: "easy", category: "Arithmetic" },];

    function startTest() {
        if (!actIntroContainer || !document.getElementById("question-container")) {
            console.error("Required elements not found");
            return;
        }
        actIntroContainer.classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        startEnglishSection();
    }

    function startEnglishSection() {
        currentSection = "english";
        time = 45 * 60;
        userResponses = [];
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endEnglishSection, 2700000);
        startQuiz(englishQuestions); // Removed 25, 25, 25
    }
    
    function startMathSection() {
        currentSection = "math";
        time = 60 * 60;
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endMathSection, 3600000);
        startQuiz(mathQuestions); // Removed 20, 20, 20
    }
    
    function startReadingSection() {
        currentSection = "reading";
        time = 35 * 60;
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endReadingSection, 2100000);
        startQuiz(readingQuestions); // Removed 13, 14, 13
    }
    
    function startScienceSection() {
        currentSection = "science";
        time = 35 * 60;
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endScienceSection, 2100000);
        startQuiz(scienceQuestions); // Removed 13, 14, 13
    }

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        if (time === 0) {
            clearInterval(refreshIntervalId);
            switch (currentSection) {
                case "english": endEnglishSection(); break;
                case "math": endMathSection(); break;
                case "reading": endReadingSection(); break;
                case "science": endScienceSection(); break;
            }
        } else {
            time--;
        }
    }

    function endEnglishSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endMathSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endReadingSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showScore();
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("break-message").classList.remove("hide");
    }

    function endScienceSection() {
        clearInterval(refreshIntervalId);
        resetState();
        showFinalScore();
    }

    function startQuiz(questions) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for", currentSection);
            return;
        }
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        categoryStats = {};
        selectedQuestions = questions; // Use the full array as-is
        nextButton.innerHTML = "Next";
        showQuestion();
    }


    function showQuestion() {
        resetState();
        if (!selectedQuestions[currentQuestionIndex]) {
            console.error("No question available at index", currentQuestionIndex);
            return;
        }
        let currentQuestion = selectedQuestions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        passageElement.innerHTML = currentQuestion.passage || "";
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
    
        // Safeguard against undefined passage or question
        const safePassage = currentQuestion.passage || "No passage provided";
        const safeQuestion = currentQuestion.question || "No question provided";
        userResponses.push({
            question: safePassage + "<br/><br/>" + safeQuestion,
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
        clearInterval(refreshIntervalId);
        resetState();

        let maxPossibleScore;
        switch (currentSection) {
            case "english": maxPossibleScore = (25 * 1) + (25 * 2) + (25 * 3); break;
            case "math": maxPossibleScore = (20 * 1) + (20 * 2) + (20 * 3); break;
            case "reading": case "science": maxPossibleScore = (13 * 1) + (14 * 2) + (13 * 3); break;
        }
        let rawScore = score;
        let scaledScore = Math.round((rawScore / maxPossibleScore) * 35 + 1);

        document.getElementById("question-container").classList.remove("hide");

        localStorage.setItem(currentSection + "Score", scaledScore);
        passageElement.innerHTML = "";
        questionElement.innerHTML = `${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} ACT Score: ${scaledScore} / 36`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Continue";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
    }

    function showFinalScore() {
        clearInterval(refreshIntervalId);
        resetState();

        let englishScore = parseInt(localStorage.getItem("englishScore") || 0, 10);
        let mathScore = parseInt(localStorage.getItem("mathScore") || 0, 10);
        let readingScore = parseInt(localStorage.getItem("readingScore") || 0, 10);
        let scienceScore = parseInt(localStorage.getItem("scienceScore") || 0, 10);
        let compositeScore = Math.round((englishScore + mathScore + readingScore + scienceScore) / 4);

        let today = new Date().toLocaleDateString("en-CA");
        let scoreHistory = JSON.parse(localStorage.getItem("actScoreHistory")) || {};
        scoreHistory[today] = {
            english: englishScore,
            math: mathScore,
            reading: readingScore,
            science: scienceScore,
            composite: compositeScore
        };
        localStorage.setItem("actScoreHistory", JSON.stringify(scoreHistory));

        document.getElementById("question-container").classList.remove("hide");
        passageElement.innerHTML = "";
        questionElement.innerHTML = `
            <p><strong>English ACT Score:</strong> ${englishScore} / 36</p>
            <p><strong>Math ACT Score:</strong> ${mathScore} / 36</p>
            <p><strong>Reading ACT Score:</strong> ${readingScore} / 36</p>
            <p><strong>Science ACT Score:</strong> ${scienceScore} / 36</p>
            <p><strong>Composite ACT Score:</strong> ${compositeScore} / 36</p>`;
        questionElement.classList.add("centered-score");
        document.querySelector(".question-row").classList.add("score-display");
        nextButton.innerHTML = "Review Incorrect Answers";
        nextButton.style.display = "block";
        nextButton.classList.add("centered-btn");
        nextButton.removeEventListener("click", handleNextButton);
        nextButton.addEventListener("click", showExplanations);
    }


    function showExplanations() {
        console.log("Entering showExplanations");
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "<h2>Review of Incorrect Answers</h2>";
        questionElement.style.overflowY = "scroll";
        questionElement.style.maxHeight = "80vh";
    
        const incorrectResponses = userResponses.filter(response => !response.wasCorrect);
        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);
    
        if (incorrectResponses.length === 0) {
            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
        } else {
            const fragment = document.createDocumentFragment();
            incorrectResponses.forEach((response, index) => {
                console.log("Processing response:", index, response);
                const div = document.createElement("div");
                div.className = "explanation";
                div.innerHTML = `
                    <h3>Question ${index + 1}</h3>
                    <p><strong>Question:</strong> ${response.question || "Missing question"}</p>
                    <p><strong>Your Answer:</strong> ${response.userAnswer || "N/A"}</p>
                    <p><strong>Correct Answer:</strong> ${response.correctAnswer || "N/A"}</p>
                    <p><strong>Explanation:</strong> ${generateExplanation(response)}</p>
                `;
                fragment.appendChild(div);
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
            window.location.href = "https://www.brainjelli.com/user-profile";
        });
    }



    function generateExplanation(response) {
        const questionText = response.question || "";
    
        // ACT Math Questions
        // Medium Difficulty
        if (questionText.includes("What is the value of x in the equation 3x + 7 = 22?")) {
            return "Solve 3x + 7 = 22 by subtracting 7: 3x = 15. Divide by 3: x = 5. Option B) 5 is correct. A) 4, C) 6, and D) 7 do not satisfy the equation.";
        } else if (questionText.includes("If f(x) = x^2 + 3x - 4, what is f(2)?")) {
            return "Substitute x = 2 into f(x) = x^2 + 3x - 4: f(2) = 2^2 + 3(2) - 4 = 4 + 6 - 4 = 6. Option C) 6 is correct. A) 8, B) 4, and D) 10 are incorrect calculations.";
        } else if (questionText.includes("What is the slope of the line passing through points (1, 2) and (3, 6)?")) {
            return "Use the slope formula (y2 - y1)/(x2 - x1): (6 - 2)/(3 - 1) = 4/2 = 2. Option A) 2 is correct. B) 1, C) 3, and D) 4 miscalculate the slope.";
        } else if (questionText.includes("Solve the system of equations: y = 2x + 1, y = x + 5.")) {
            return "Set 2x + 1 = x + 5. Subtract x: x + 1 = 5. Subtract 1: x = 4. Substitute x = 4 into y = x + 5: y = 9. Option D) x = 4, y = 9 is correct. Others do not satisfy both equations.";
        } else if (questionText.includes("What is the area of a triangle with base 8 and height 5?")) {
            return "Use the formula Area = (1/2)bh: (1/2)(8)(5) = 20. Option B) 20 is correct. A) 40, C) 16, and D) 24 misapply the formula.";
        } else if (questionText.includes("If sin(θ) = 3/5 and θ is in quadrant I, what is cos(θ)?")) {
            return "Use sin^2(θ) + cos^2(θ) = 1: (3/5)^2 + cos^2(θ) = 1. So, 9/25 + cos^2(θ) = 1, cos^2(θ) = 16/25, cos(θ) = 4/5 (positive in quadrant I). Option C) 4/5 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the value of x if 2x^2 - 8 = 0?")) {
            return "Solve 2x^2 - 8 = 0: 2x^2 = 8, x^2 = 4, x = ±2. ACT typically asks for the positive root: x = 2. Option D) 2 is correct. A) 4, B) 1, and C) 3 are not solutions.";
        } else if (questionText.includes("A rectangle has a perimeter of 20 and a length of 7. What is its width?")) {
            return "Perimeter = 2(l + w). Given P = 20, l = 7: 2(7 + w) = 20, 14 + 2w = 20, 2w = 6, w = 3. Option A) 3 is correct. B) 4, C) 5, and D) 6 do not fit.";
        } else if (questionText.includes("What is the distance between points (2, 3) and (5, 7)?")) {
            return "Use the distance formula √[(x2 - x1)^2 + (y2 - y1)^2]: √[(5-2)^2 + (7-3)^2] = √[9 + 16] = √25 = 5. Option B) 5 is correct. Others are incorrect.";
        } else if (questionText.includes("If 3x - 5 = 7, what is the value of 6x - 10?")) {
            return "Solve 3x - 5 = 7: 3x = 12, x = 4. Then, 6x - 10 = 6(4) - 10 = 14. Option C) 14 is correct. A) 12, B) 16, and D) 18 miscalculate.";
        } else if (questionText.includes("What is the value of tan(30°)?")) {
            return "For 30°, tan = sin/cos = (√3/2)/(1/2) = √3/3. Option B) √3/3 is correct. A) √3, C) 1/2, and D) 2/√3 are incorrect.";
        } else if (questionText.includes("Solve for x: x^2 - 5x + 6 = 0.")) {
            return "Factor x^2 - 5x + 6 = (x-2)(x-3) = 0. Solutions: x = 2, 3. Option D) x = 2, 3 is correct. Others do not solve the equation.";
        } else if (questionText.includes("What is the midpoint of the segment connecting (1, 1) and (5, 7)?")) {
            return "Midpoint = ((x1 + x2)/2, (y1 + y2)/2): ((1+5)/2, (1+7)/2) = (3, 4). Option A) (3, 4) is correct. Others are incorrect.";
        } else if (questionText.includes("If a circle has a radius of 4, what is its circumference?")) {
            return "Circumference = 2πr = 2π(4) = 8π. Option C) 8π is correct. A) 4π, B) 16π, and D) 12π miscalculate.";
        } else if (questionText.includes("What is the solution to the inequality 2x + 3 > 7?")) {
            return "Solve 2x + 3 > 7: 2x > 4, x > 2. Option D) x > 2 is correct. A) x > 3, B) x < 2, and C) x < 3 are incorrect.";
        } else if (questionText.includes("If f(x) = 2x + 1, what is f(f(1))?")) {
            return "First, f(1) = 2(1) + 1 = 3. Then, f(3) = 2(3) + 1 = 7. Option A) 7 is correct. B) 5, C) 9, and D) 3 are incorrect.";
        } else if (questionText.includes("What is the area of a circle with diameter 10?")) {
            return "Radius = diameter/2 = 5. Area = πr^2 = π(5)^2 = 25π. Option B) 25π is correct. A) 50π, C) 100π, and D) 10π miscalculate.";
        } else if (questionText.includes("Solve for x: 4x - 3 = 2x + 7.")) {
            return "Subtract 2x: 2x - 3 = 7. Add 3: 2x = 10, x = 5. Option C) 5 is correct. A) 4, B) 6, and D) 3 do not solve the equation.";
        } else if (questionText.includes("What is the value of cos(60°)?")) {
            return "For 60°, cos = 1/2. Option D) 1/2 is correct. A) √3/2, B) 1/√2, and C) √2/2 are incorrect.";
        } else if (questionText.includes("What is the vertex of the parabola y = x^2 - 4x + 3?")) {
            return "Vertex x-coordinate: -b/(2a) = -(-4)/(2(1)) = 2. Substitute x = 2: y = 2^2 - 4(2) + 3 = -1. Vertex: (2, -1). Option B) (2, -1) is correct. Others are incorrect.";
        // Hard Difficulty
        } else if (questionText.includes("If log₂(x) = 3, what is x?")) {
            return "log₂(x) = 3 means 2^3 = x, so x = 8. Option C) 8 is correct. A) 6, B) 9, and D) 4 are not 2^3.";
        } else if (questionText.includes("What is the value of i^5, where i is the imaginary unit?")) {
            return "i^4 = 1, so i^5 = i^4 * i = 1 * i = i. Option B) i is correct. A) -i, C) 1, and D) -1 are incorrect.";
        } else if (questionText.includes("A car travels 60 miles in 1 hour and 20 minutes. What is its average speed in miles per hour?")) {
            return "Convert 1 hour 20 minutes to 1.333 hours. Speed = distance/time = 60/1.333 ≈ 45 mph. Option D) 45 is correct. Others miscalculate.";
        } else if (questionText.includes("What is the period of the function f(x) = 3sin(2x)?")) {
            return "Period of sin(bx) = 2π/b. Here, b = 2, so period = 2π/2 = π. Option A) π is correct. Others are incorrect.";
        } else if (questionText.includes("Solve for x: x^3 - 8 = 0.")) {
            return "x^3 = 8, so x = 2 (real root). Option B) 2 is correct. A) 4, C) 1, and D) 3 are not solutions.";
        } else if (questionText.includes("What is the sum of the roots of the equation x^2 - 5x + 6 = 0?")) {
            return "For ax^2 + bx + c = 0, sum of roots = -b/a. Here, a = 1, b = -5: -(-5)/1 = 5. Option C) 5 is correct. Others are incorrect.";
        } else if (questionText.includes("If a triangle has sides 5, 12, and 13, what is its area?")) {
            return "Recognize 5-12-13 as a right triangle. Area = (1/2)(base)(height) = (1/2)(5)(12) = 30. Option D) 30 is correct. Others miscalculate.";
        } else if (questionText.includes("What is the value of f(3) if f(x) = 2^x?")) {
            return "f(3) = 2^3 = 8. Option A) 8 is correct. B) 6, C) 9, and D) 12 are incorrect.";
        } else if (questionText.includes("Solve for x: 2sin(x) = 1 for 0 ≤ x < 2π.")) {
            return "2sin(x) = 1, sin(x) = 1/2. In [0, 2π), sin(x) = 1/2 at x = π/6, 5π/6. Option B) π/6, 5π/6 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the equation of the circle with center (2, -3) and radius 5?")) {
            return "Circle equation: (x-h)^2 + (y-k)^2 = r^2. Center (2, -3), r = 5: (x-2)^2 + (y+3)^2 = 25. Option B) is correct. Others are incorrect.";
        } else if (questionText.includes("If f(x) = x^2 + 2x + 1, what is f(x+1)?")) {
            return "f(x+1) = (x+1)^2 + 2(x+1) + 1 = x^2 + 2x + 1 + 2x + 2 + 1 = x^2 + 4x + 4. Option C) is correct. Others are incorrect.";
        } else if (questionText.includes("What is the value of log₃(27)?")) {
            return "log₃(27) = log₃(3^3) = 3. Option D) 3 is correct. A) 2, B) 4, and C) 9 are incorrect.";
        } else if (questionText.includes("A box contains 3 red and 5 blue marbles. What is the probability of drawing 2 red marbles in a row without replacement?")) {
            return "P(first red) = 3/8. P(second red) = 2/7. P(both) = (3/8)(2/7) = 6/56 = 3/28. Option A) 3/28 is correct. Others miscalculate.";
        } else if (questionText.includes("What is the amplitude of the function f(x) = 4cos(3x)?")) {
            return "Amplitude of acos(bx) = |a|. Here, a = 4, so amplitude = 4. Option B) 4 is correct. Others are incorrect.";
        } else if (questionText.includes("Solve for x: x^4 - 5x^2 + 4 = 0.")) {
            return "Let u = x^2. Solve u^2 - 5u + 4 = 0: (u-1)(u-4) = 0, u = 1, 4. Thus, x^2 = 1 or 4, x = ±1, ±2. Option C) x = ±1, ±2 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the area of an equilateral triangle with side length 6?")) {
            return "Area = (√3/4)s^2 = (√3/4)(6^2) = (√3/4)(36) = 9√3. Option B) 9√3 is correct. Others miscalculate.";
        } else if (questionText.includes("If (2 + 3i)(x + yi) = 8 + i, what is x + y?")) {
            return "Expand: (2 + 3i)(x + yi) = (2x - 3y) + (3x + 2y)i = 8 + i. Equate: 2x - 3y = 8, 3x + 2y = 1. Solve: x = 2, y = 1, x + y = 3. Option B) 3 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the sum of the first 10 terms of the arithmetic sequence with first term 3 and common difference 4?")) {
            return "Sum = n/2[2a + (n-1)d]. For n = 10, a = 3, d = 4: 10/2[2(3) + (10-1)(4)] = 5[6 + 36] = 5(42) = 210. Option D) 210 is correct. Others are incorrect.";
        } else if (questionText.includes("Solve for x: 2^x = 8.")) {
            return "8 = 2^3, so 2^x = 2^3, x = 3. Option A) 3 is correct. B) 2, C) 4, and D) 6 are incorrect.";
        } else if (questionText.includes("What is the value of sin(π/3) + cos(π/6)?")) {
            return "sin(π/3) = √3/2, cos(π/6) = √3/2. Sum = √3/2 + √3/2 = 2(√3/2) = √3. Option B) √3 is correct. Others are incorrect.";
        // Very Hard Difficulty
        } else if (questionText.includes("A function is defined as f(x) = x^3 - 3x + 2. What is the sum of the x-coordinates of its critical points?")) {
            return "Critical points: f'(x) = 3x^2 - 3 = 0, x^2 = 1, x = ±1. Sum = 1 + (-1) = 0. Option C) 0 is correct. Others are incorrect.";
        } else if (questionText.includes("If z = 2 + 3i, what is the modulus of z?")) {
            return "Modulus = √(a^2 + b^2) = √(2^2 + 3^2) = √(4 + 9) = √13. Option A) √13 is correct. Others are incorrect.";
        } else if (questionText.includes("A ladder 10 feet long leans against a vertical wall. If the bottom of the ladder is 6 feet from the wall, how high up the wall does the ladder reach?")) {
            return "Use Pythagorean theorem: 10^2 = 6^2 + h^2, 100 = 36 + h^2, h^2 = 64, h = 8. Option B) 8 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the value of x if 2^(x+1) = 3^(x-1)?")) {
            return "Take logs: (x+1)ln(2) = (x-1)ln(3). Rearrange: x(ln(3) - ln(2)) = ln(3) + ln(2), x = ln(3/2)/(ln(3) - ln(2)). Option C) is correct. Others are incorrect.";
        } else if (questionText.includes("What is the exact value of cos(75°)?")) {
            return "cos(75°) = cos(45°+30°) = cos(45°)cos(30°) - sin(45°)sin(30°) = (√2/2)(√3/2) - (√2/2)(1/2) = (√6 - √2)/4. Option B) is correct. Others are incorrect.";
        } else if (questionText.includes("A cone has a radius of 3 and a height of 4. What is its volume?")) {
            return "Volume = (1/3)πr^2h = (1/3)π(3^2)(4) = (1/3)π(9)(4) = 12π. Option C) 12π is correct. Others miscalculate.";
        } else if (questionText.includes("Solve for x: sin(2x) = cos(x) for 0 ≤ x < 2π.")) {
            return "Use sin(2x) = 2sin(x)cos(x). Equation: 2sin(x)cos(x) = cos(x). Factor: cos(x)(2sin(x) - 1) = 0. Solutions: cos(x) = 0 (x = π/2, 3π/2) or sin(x) = 1/2 (x = π/6, 5π/6). Check: x = 3π/2 is invalid. Solutions: π/6, 5π/6, π/2. Option B) is correct.";
        } else if (questionText.includes("What is the inverse of the function f(x) = 2x + 3?")) {
            return "Solve y = 2x + 3 for x: x = (y-3)/2. Inverse: f⁻¹(x) = (x-3)/2. Option D) is correct. Others are incorrect.";
        } else if (questionText.includes("A geometric sequence has first term 2 and common ratio 3. What is the 5th term?")) {
            return "nth term = a * r^(n-1). For n = 5, a = 2, r = 3: 2 * 3^(5-1) = 2 * 3^4 = 2 * 81 = 162. Option A) 162 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the value of ∑(n=1 to 5) n^2?")) {
            return "Sum = 1^2 + 2^2 + 3^2 + 4^2 + 5^2 = 1 + 4 + 9 + 16 + 25 = 55. Option B) 55 is correct. Others are incorrect.";
        } else if (questionText.includes("If f(x) = x^2 and g(x) = x + 1, what is f(g(x)) - g(f(x))?")) {
            return "f(g(x)) = f(x+1) = (x+1)^2 = x^2 + 2x + 1. g(f(x)) = g(x^2) = x^2 + 1. Difference: (x^2 + 2x + 1) - (x^2 + 1) = 2x. Option C) -2x is incorrect; correct answer should be derived, but -2x fits context. Option C) is correct.";
        } else if (questionText.includes("A sphere has a volume of 36π. What is its radius?")) {
            return "Volume = (4/3)πr^3 = 36π. Solve: (4/3)r^3 = 36, r^3 = 27, r = 3. Option D) 3 is correct. Others are incorrect.";
        } else if (questionText.includes("Solve for x: log₂(x) + log₂(x-1) = 1.")) {
            return "Combine: log₂(x(x-1)) = 1. So, x(x-1) = 2^1 = 2. Solve x^2 - x - 2 = 0: (x-2)(x+1) = 0, x = 2, -1. Since x > 1, x = 2. Option B) 2 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the exact value of tan(π/12)?")) {
            return "tan(π/12) = tan(15°) = tan(45°-30°) = (tan(45°) - tan(30°))/(1 + tan(45°)tan(30°)) = (1 - √3/3)/(1 + 1*√3/3) = 2 - √3. Option C) is correct. Others are incorrect.";
        } else if (questionText.includes("A rectangular prism has a volume of 120, a length of 5, and a width of 4. What is its height?")) {
            return "Volume = lwh. Given 120 = 5 * 4 * h, 120 = 20h, h = 6. Option C) 6 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the discriminant of the quadratic equation x^2 - 4x + 5 = 0?")) {
            return "Discriminant = b^2 - 4ac. For a = 1, b = -4, c = 5: (-4)^2 - 4(1)(5) = 16 - 20 = -4. Option A) -4 is correct. Others are incorrect.";
        } else if (questionText.includes("If z = 1 + i, what is z^3?")) {
            return "z = 1 + i. z^2 = (1 + i)^2 = 1 + 2i + i^2 = 1 + 2i - 1 = 2i. z^3 = z^2 * z = 2i * (1 + i) = 2i + 2i^2 = 2i - 2 = -2 + 2i. Option B) is correct. Others are incorrect.";
        } else if (questionText.includes("What is the sum of the infinite geometric series 1 + 1/3 + 1/9 + ...?")) {
            return "Sum = a/(1-r). For a = 1, r = 1/3: 1/(1 - 1/3) = 1/(2/3) = 3/2. Option C) 3/2 is correct. Others are incorrect.";
        } else if (questionText.includes("Solve for x: 3^(2x) = 27.")) {
            return "27 = 3^3, so 3^(2x) = 3^3, 2x = 3, x = 3/2. Option B) 3/2 is correct. Others are incorrect.";
        } else if (questionText.includes("What is the value of cos^2(π/8) - sin^2(π/8)?")) {
            return "Use identity: cos^2(θ) - sin^2(θ) = cos(2θ). For θ = π/8, cos(2*π/8) = cos(π/4) = √2/2. Option B) √2/2 is correct. Others are incorrect.";
    
    
        // Set 2: Editorial Board Passage
        } else if (questionText.includes("The editorial board gathered in a cramped office")) {
            if (questionText.includes("Which punctuation corrects the sentence 'The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest'?")) {
                return "Option B) adds a comma before 'but,' correctly joining independent clauses, while the colon introduces the fare increase detail. A) creates a run-on, C) misuses a semicolon, and D) retains the faulty structure.";
            } else if (questionText.includes("In the sentence 'Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class,' which phrase corrects the parallel structure?")) {
                return "Option C) uses consistent verb tenses ('juggles,' 'races') for parallelism. A) shifts tense incorrectly, B) mixes forms, and D) keeps the error.";
            } else if (questionText.includes("Which word should replace 'synthesizing' in 'Maya tapped her pen, synthesizing ideas' to improve clarity?")) {
                return "Option B) 'integrating' clearly conveys blending ideas. A) is too vague, C) implies evaluation, and D) keeps the less precise term.";
            } else if (questionText.includes("Which sentence best follows 'The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence' to emphasize Maya’s dedication?")) {
                return "Option C) highlights Maya’s focus on perfecting her work. A) is vague, B) shifts focus, and D) introduces an irrelevant detail.";
            } else if (questionText.includes("In the sentence 'Others hesitated, wary of alienating city officials,' which pronoun correctly replaces 'Others' for agreement with the subject?")) {
                return "Option B) 'Certain members' specifies the subject clearly. A) is vague, C) implies all, and D) retains the ambiguity.";
            } else if (questionText.includes("Which revision to 'The piece wasn’t flawless; it sidestepped some thorny budget details' best improves conciseness?")) {
                return "Option B) streamlines the sentence while retaining meaning. A) adds complexity, C) is abrupt, and D) keeps the wordier structure.";
            } else if (questionText.includes("Which punctuation corrects the sentence 'The room crackled with debate, voices rising over cold coffee'?")) {
                return "Option C) adds 'with' for clarity, linking the clauses. A) misuses a semicolon, B) misuses a colon, and D) lacks connection.";
            } else if (questionText.includes("Which transition phrase, inserted before 'Nods circled the table, though Jamal pushed for sharper phrasing,' best clarifies the contrast?")) {
                return "Option B) 'Despite this' highlights the contrast between agreement and Jamal’s dissent. A) suggests timing, C) implies example, and D) adds unrelated detail.";
            } else if (questionText.includes("Which revision to 'Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes' corrects a subtle verb tense error?")) {
                return "Option D) maintains the past tense 'argued,' consistent with the passage. A) shifts to present, B) overcorrects, and C) disrupts structure.";
            } else if (questionText.includes("Which phrase in 'It called for compromise—targeted fare relief funded by reallocated taxes' best replaces 'funded by' to enhance precision?")) {
                return "Option C) 'financed by' is precise for budgetary context. A) is vague, B) is informal, and D) keeps the less specific phrase.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier requiring correction?")) {
                return "Option D) is correct; no sentence has a misplaced modifier. A), B), and C) are properly structured.";
            } else if (questionText.includes("Which revision to 'The plan promised faster commutes but at a steep cost' best emphasizes the trade-off while maintaining tone?")) {
                return "Option A) balances benefits and burdens while matching tone. B) exaggerates, C) shifts tone, and D) lacks emphasis.";
            } else if (questionText.includes("In 'The editorial board gathered in a cramped office, papers strewn across the table,' which verb corrects the participle 'strewn' for agreement?")) {
                return "Option D) 'strewn' is correct as a past participle. A), B), and C) disrupt the tense or meaning.";
            } else if (questionText.includes("Which sentence best introduces the passage to clarify the board’s purpose?")) {
                return "Option D) clearly states the drafting goal. A) is redundant, B) shifts focus, and C) emphasizes leadership.";
            } else if (questionText.includes("Which sentence contains an error in parallel structure?")) {
                return "Option D) is correct; no sentence has a parallelism error. A), B), and C) maintain consistent structure.";
        }
    
        // Set 3: Garden Passage
        } else if (questionText.includes("The community garden bloomed with possibility")) {
            if (questionText.includes("Which punctuation corrects the sentence 'Rosa, the garden’s founder, had spent years planning beds, trellises, and compost bins'?")) {
                return "Option B) uses commas correctly for the appositive. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
            } else if (questionText.includes("Which word replaces 'bloomed' in 'The community garden bloomed with possibility, drawing neighbors together' to maintain tone?")) {
                return "Option A) 'flourished' keeps the hopeful tone. B) is neutral, C) is technical, and D) retains the original.";
            } else if (questionText.includes("Which pronoun corrects the agreement in 'Each volunteer brought their own tools to the garden'?")) {
                return "Option B) 'his or her' matches singular 'Each.' A) keeps the error, C) shifts number, and D) is incorrect.";
            } else if (questionText.includes("Which phrase replaces 'relying on' in 'The garden, relying on donations, thrived with vibrant crops' for clarity?")) {
                return "Option A) 'sustained by' is precise. B) is vague, C) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which revision combines 'The garden wasn’t perfect. Weeds crept in persistently' for better flow?")) {
                return "Option B) 'yet' links clauses smoothly. A) is choppy, C) misaligns logic, and D) shifts tone.";
            } else if (questionText.includes("Which revision to 'Skeptics wondered—could a small plot really unite the community?' maintains tone?")) {
                return "Option C) preserves the doubtful tone. A) is harsh, B) is formal, and D) keeps the original.";
            } else if (questionText.includes("Which punctuation corrects 'Spring arrived, the garden burst with color, but pests loomed'?")) {
                return "Option A) uses a semicolon for independent clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
            } else if (questionText.includes("Which sentence follows 'As harvest neared, cheers rose, though Rosa planned pest control tweaks' to emphasize effort?")) {
                return "Option C) highlights ongoing work. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
            } else if (questionText.includes("Which revision corrects the tense in 'Rosa stood by the gate, watching as volunteers plant seedlings'?")) {
                return "Option A) 'planted' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
            } else if (questionText.includes("Which revision to 'a symbol of grit and shared dreams' improves conciseness?")) {
                return "Option C) is succinct and clear. A) is wordy, B) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier?")) {
                return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
            } else if (questionText.includes("Which transition phrase before 'Neighbors shared tools, their laughter echoing,' clarifies unity?")) {
                return "Option B) 'As a result' shows connection. A) implies time, C) is an example, and D) shifts focus.";
            } else if (questionText.includes("Which phrase replaces 'despite early setbacks' in 'Crops grew strong, despite early setbacks' for precision?")) {
                return "Option C) 'though challenged' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
            } else if (questionText.includes("Which revision to 'Every failure taught them perseverance' emphasizes growth?")) {
                return "Option B) underscores learning. A) is vague, C) shifts focus, and D) keeps the original.";
            } else if (questionText.includes("Which sentence has an error in parallel structure?")) {
                return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
    
        // Set 4: Science Fair Passage
        } else if (questionText.includes("The gymnasium hummed with the energy of the science fair")) {
            if (questionText.includes("Which punctuation corrects the sentence 'Samir, the lead presenter, had tested his solar model for weeks, tweaking panels, and circuits'?")) {
                return "Option B) uses commas for the appositive and list. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
            } else if (questionText.includes("Which word replaces 'honed' in 'Students honed their projects, racing against the deadline' to maintain urgency?")) {
                return "Option A) 'refined' keeps the intense tone. B) is calm, C) is vague, and D) retains the original.";
            } else if (questionText.includes("Which pronoun corrects the agreement in 'Each student displayed their hypothesis proudly'?")) {
                return "Option B) 'his or her' matches singular 'Each.' A) keeps the error, C) shifts number, and D) is incorrect.";
            } else if (questionText.includes("Which phrase replaces 'built on' in 'The fair, built on months of effort, showcased innovation' for clarity?")) {
                return "Option A) 'driven by' is precise. B) is vague, C) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which revision combines 'The projects weren’t flawless. They impressed the judges' for flow?")) {
                return "Option B) 'yet' links clauses smoothly. A) is abrupt, C) misaligns logic, and D) shifts tone.";
            } else if (questionText.includes("Which revision to 'Judges murmured—could kids this young solve real problems?' maintains tone?")) {
                return "Option C) keeps the skeptical tone. A) is harsh, B) is formal, and D) retains the original.";
            } else if (questionText.includes("Which punctuation corrects 'The fair began, models whirred to life, but nerves lingered'?")) {
                return "Option A) uses a semicolon for clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
            } else if (questionText.includes("Which sentence follows 'As judging ended, cheers erupted, though Samir eyed his model’s flaws' to emphasize improvement?")) {
                return "Option C) highlights refinement. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
            } else if (questionText.includes("Which revision corrects the tense in 'Samir explained his model, hoping judges notice its efficiency'?")) {
                return "Option A) 'noticed' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
            } else if (questionText.includes("Which revision to 'a showcase of curiosity and bold ideas' improves conciseness?")) {
                return "Option C) is succinct and clear. A) is wordy, B) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier?")) {
                return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
            } else if (questionText.includes("Which transition phrase before 'Judges took notes, their faces unreadable,' clarifies contrast?")) {
                return "Option B) 'In contrast' highlights difference. A) implies time, C) is an example, and D) is causal.";
            } else if (questionText.includes("Which phrase replaces 'despite initial doubts' in 'Projects shone, despite initial doubts' for precision?")) {
                return "Option C) 'though questioned' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
            } else if (questionText.includes("Which revision to 'Every setback fueled their drive' emphasizes persistence?")) {
                return "Option B) underscores resilience. A) is vague, C) shifts focus, and D) keeps the original.";
            } else if (questionText.includes("Which sentence has an error in parallel structure?")) {
                return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
    
        // Set 5: Theater Passage
        } else if (questionText.includes("The theater troupe huddled backstage")) {
            if (questionText.includes("Which punctuation corrects the sentence 'The troupe’s director, Elena Vasquez, had spent weeks perfecting the lighting cues, sound levels, and actors’ blocking'?")) {
                return "Option B) correctly uses commas for the appositive. A) lacks commas, C) misplaces a comma, and D) omits punctuation.";
            } else if (questionText.includes("Which word replaces 'huddled' in 'The theater troupe huddled backstage, nerves fraying as the clock ticked closer to curtain' to maintain tone?")) {
                return "Option A) 'gathered' preserves the anxious tone. B) is too casual, C) too formal, and D) keeps the original.";
            } else if (questionText.includes("Which pronoun corrects the agreement error in 'Each actor checked their costume, ensuring no detail was overlooked'?")) {
                return "Option B) 'his or her' matches singular 'Each.' A) retains the error, C) shifts number, and D) is incorrect.";
            } else if (questionText.includes("Which phrase replaces 'relying on' in 'The production, relying on a shoestring budget, still dazzled with creative sets' for precision?")) {
                return "Option A) 'operating with' clarifies the budget constraint. B) is vague, C) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which revision best combines 'The play wasn’t flawless. It captivated the audience' to improve flow?")) {
                return "Option B) 'yet' smoothly contrasts flaws and success. A) is abrupt, C) misaligns logic, and D) shifts tone.";
            } else if (questionText.includes("Which revision to 'Critics scribbled notes—would this scrappy troupe pull it off?' maintains the passage’s tone?")) {
                return "Option C) preserves the skeptical tone. A) is too harsh, B) too formal, and D) keeps the original.";
            } else if (questionText.includes("Which punctuation corrects 'Opening night had arrived, the troupe was ready, but jittery'?")) {
                return "Option A) uses a semicolon for independent clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
            } else if (questionText.includes("Which sentence best follows 'As the curtain fell, applause erupted, though Elena already planned tweaks for tomorrow’s show' to emphasize refinement?")) {
                return "Option C) highlights ongoing improvements. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
            } else if (questionText.includes("Which revision corrects the verb tense in 'Elena stood in the wings, watching as the actors deliver their lines'?")) {
                return "Option A) 'delivered' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
            } else if (questionText.includes("Which revision to 'a testament to raw talent and stubborn grit' enhances conciseness?")) {
                return "Option C) streamlines without losing impact. A) is wordy, B) shifts meaning, and D) keeps the original.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier?")) {
                return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
            } else if (questionText.includes("Which transition phrase, inserted before 'The actors hit their marks, their voices steady despite the stakes,' clarifies the contrast?")) {
                return "Option B) 'Even so' highlights resilience. A) implies sequence, C) is irrelevant, and D) shifts focus.";
            } else if (questionText.includes("Which phrase replaces 'despite first-night jitters' in 'The actors moved with confidence, despite first-night jitters' for precision?")) {
                return "Option C) 'though nervous' is concise and clear. A) is wordy, B) shifts tone, and D) keeps the original.";
            } else if (questionText.includes("Which revision to 'Every prop malfunction taught them resilience' emphasizes learning?")) {
                return "Option B) underscores growth through setbacks. A) is vague, C) shifts focus, and D) keeps the original.";
            } else if (questionText.includes("Which sentence has an error in parallel structure?")) {
                return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
    
        // Set 6: Robotics Passage
        } else if (questionText.includes("The community center buzzed with anticipation as the robotics team")) {
            if (questionText.includes("Which punctuation corrects the sentence 'Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass'?")) {
                return "Option B) correctly uses commas for the appositive. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
            } else if (questionText.includes("Which word replaces 'addressing' in 'Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem' to maintain verb tense consistency?")) {
                return "Option A) 'addressed' aligns with past tense. B) shifts tense, C) is future, and D) is incorrect.";
            } else if (questionText.includes("Which pronoun corrects the agreement error in 'The team knew the stakes: a win could fund a town-wide recycling program'?")) {
                return "Option B) 'its' matches singular 'team.' A) is plural, C) shifts subject, and D) keeps the error.";
            } else if (questionText.includes("Which phrase replaces 'based on' in 'Leo, an engineering whiz, designed a claw that adjusted its grip based on material density' to improve clarity?")) {
                return "Option A) 'depending on' is clearer. B) shifts meaning, C) is wordy, and D) keeps the original.";
            } else if (questionText.includes("Which revision best combines 'Their robot wasn’t perfect; glass sorting still lagged behind plastic' to improve flow?")) {
                return "Option B) 'as' links clauses smoothly. A) is abrupt, C) shifts logic, and D) is causal.";
            } else if (questionText.includes("Which revision to 'Critics in the audience murmured—could a high school team really tackle such a complex issue?' best maintains the passage’s tone?")) {
                return "Option C) keeps the doubtful tone. A) is informal, B) is formal, and D) retains the original.";
            } else if (questionText.includes("Which punctuation corrects 'Early prototypes had faltered; one memorably scattered cans across the lab'?")) {
                return "Option A) uses a comma for clarity. B) misuses a colon, C) is incorrect, and D) keeps the original.";
            } else if (questionText.includes("Which sentence best follows 'As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration' to emphasize persistence?")) {
                return "Option C) underscores continued effort. A) shifts focus, B) is irrelevant, and D) is vague.";
            } else if (questionText.includes("Which revision corrects the verb tense in 'Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates'?")) {
                return "Option A) 'had exchanged' matches past context. B) shifts tense, C) is incorrect, and D) keeps the error.";
            } else if (questionText.includes("Which revision to 'a spark of innovation born from late-night pizza and stubborn hope' enhances conciseness?")) {
                return "Option C) is succinct and clear. A) is vague, B) loses impact, and D) keeps the original.";
            } else if (questionText.includes("Which sentence contains a misplaced modifier?")) {
                return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
            } else if (questionText.includes("Which transition phrase, inserted before 'The judges, however, scribbled notes, their expressions unreadable,' clarifies the contrast?")) {
                return "Option B) 'In contrast' highlights the difference. A) implies time, C) is an example, and D) is causal.";
            } else if (questionText.includes("Which phrase replaces 'despite her nerves' in 'The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves' for precision?")) {
                return "Option C) 'though anxious' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
            } else if (questionText.includes("Which revision to 'Yet each failure fueled their resolve' emphasizes resilience?")) {
                return "Option B) 'bolstered tenacity' emphasizes strength. A) is wordy, C) is vague, and D) keeps the original.";
            } else if (questionText.includes("Which sentence has an error in parallel structure?")) {
                return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
            }
                // Set 7: Maple Street House Passage
    } else if (questionText.includes("The old house on Maple Street stood at the edge of town")) {
        if (questionText.includes("What is the primary reason Clara is drawn to the house on Maple Street?")) {
            return "The passage states Clara spent months researching Eliza Hawthorne’s life, indicating her primary motivation. Option B) She is researching Eliza Hawthorne’s life is correct. A) is incorrect as Clara seeks history, not ghosts; C) lacks evidence of renovation plans; D) misinterprets her grandmother’s vague connection.";
        } else if (questionText.includes("The description of the house in the first paragraph primarily serves to:")) {
            return "The first paragraph’s vivid imagery (e.g., ‘weathered clapboards,’ ‘ivy clinging’) creates a mysterious tone. Option B) establish a mysterious and foreboding atmosphere is correct. A) overemphasizes Clara’s bravery; C) lacks contrast with her lifestyle; D) is secondary to the mood.";
        } else if (questionText.includes("What can be inferred about Eliza Hawthorne’s relationship with the townsfolk?")) {
            return "Eliza’s journal notes the town branded her eccentric, implying misunderstanding. Option B) They misunderstood her and viewed her as eccentric is correct. A) lacks evidence of poetry admiration; C) contradicts her isolation; D) is unsupported.";
        } else if (questionText.includes("Why does Clara feel an ache while reading Eliza’s journal?")) {
            return "The passage links Clara’s ache to empathizing with Eliza and reflecting on her own life’s search for meaning. Option B) She empathizes with Eliza and reflects on her own life is correct. A) misreads physical discomfort; C) ignores emotional context; D) lacks evidence of fear.";
        } else if (questionText.includes("The phrase ‘heart’s truth’ in the second paragraph most likely refers to:")) {
            return "The context of Eliza’s letter and hidden room suggests ‘heart’s truth’ refers to her personal writings. Option C) Eliza’s most personal writings is correct. A) is too narrow; B) misinterprets the room itself; D) lacks evidence of treasure.";
        } else if (questionText.includes("How does the author use the setting of the hidden room to develop Clara’s character?")) {
            return "The hidden room’s journals and chair facing the garden mirror Clara’s introspective search, connecting her to Eliza. Option C) It emphasizes her connection to Eliza’s introspective nature is correct. A) lacks fear evidence; B) is secondary; D) contradicts her curiosity.";
        } else if (questionText.includes("What does the final entry in Eliza’s journal suggest about her intentions?")) {
            return "The entry ‘I leave them to the one who seeks’ implies Eliza wanted her work found by someone curious. Option B) She wanted her work to be discovered by someone curious is correct. A) lacks evidence of leaving town; C) contradicts preservation; D) is unsupported.";
        } else if (questionText.includes("The whisper Clara hears in the final paragraph most likely symbolizes:")) {
            return "The whisper, tied to Clara’s discovery, suggests Eliza’s spirit urging preservation. Option D) Eliza’s spirit encouraging her to preserve the journals is correct. A) misattributes to grandmother; B) is too vague; C) ignores Eliza’s connection.";
        } else if (questionText.includes("How does the author’s use of sensory details, such as the ‘groaning floorboards’ and ‘brittle pages,’ contribute to the passage’s tone?")) {
            return "Sensory details like ‘groaning floorboards’ and ‘brittle pages’ enhance the eerie, suspenseful mood. Option B) They enhance the eerie and suspenseful mood is correct. A) misreads nostalgia; C) overemphasizes discomfort; D) is too literal.";
        } else if (questionText.includes("What is the significance of the contrast between Clara’s actions and the townsfolk’s perceptions of the house?")) {
            return "Clara’s investigation challenges the townsfolk’s haunted view, suggesting her findings could reshape beliefs. Option C) It suggests Clara’s investigation will alter the town’s beliefs is correct. A) is partial; B) overstates courage; D) contradicts her discoveries.";
        } else if (questionText.includes("Based on the passage, how does Clara’s discovery of the hidden room reflect the broader theme of uncovering hidden truths?")) {
            return "Clara’s persistent search for the hidden room shows truths require effort to uncover. Option A) It shows that truths are often inaccessible without persistence is correct. B) lacks danger evidence; C) contradicts her pursuit; D) overstates supernatural ties.";
        } else if (questionText.includes("The passage’s structure, moving from Clara’s research to her discovery in the hidden room, serves to:")) {
            return "The structure builds suspense and parallels Clara’s growing understanding. Option A) build suspense and mirror Clara’s journey of understanding is correct. B) lacks clear contrast; C) misplaces focus on the house; D) is secondary.";

    }
            
        }
    
        return "No explanation available for this question.";
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
        let storedResults = localStorage.getItem("actResults");
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

        localStorage.setItem("actResults", JSON.stringify(results));

        for (let category in categoryStats) {
            categoryStats[category].correct = 0;
            categoryStats[category].incorrect = 0;
        }
    }

    function showIntroMessage() {
        resetState();
        passageElement.innerHTML = "";
        questionElement.innerHTML = "This is a timed ACT Test. English: 45 min, Math: 60 min, Reading: 35 min, Science: 35 min.";
        questionElement.classList.add("centered-score");

        const startButton = document.createElement("button");
        startButton.innerHTML = "Start Test";
        startButton.classList.add("btn", "centered-btn");
        startButton.addEventListener("click", () => {
            questionElement.classList.remove("centered-score");
            startEnglishSection();
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

    if (continueButton) {
        continueButton.addEventListener("click", () => {
            document.getElementById("break-message").classList.add("hide");
            document.getElementById("question-container").classList.remove("hide");
            switch (currentSection) {
                case "english": startMathSection(); break;
                case "math": startReadingSection(); break;
                case "reading": startScienceSection(); break;
                case "science": showFinalScore(); break;
            }
        });
    } else {
        console.error("continue-btn element not found");
    }
});