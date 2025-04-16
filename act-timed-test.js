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

    // Placeholder question arrays (add actual questions)
    const mathQuestions = [];
    const readingQuestions = [];
    const scienceQuestions = [];

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
        startQuiz(englishQuestions, 25, 25, 25); // Adjust numbers as needed
    }

    function startMathSection() {
        currentSection = "math";
        time = 60 * 60;
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endMathSection, 3600000);
        startQuiz(mathQuestions, 20, 20, 20);
    }

    function startReadingSection() {
        currentSection = "reading";
        time = 35 * 60;
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endReadingSection, 2100000);
        startQuiz(readingQuestions, 13, 14, 13);
    }

    function startScienceSection() {
        currentSection = "science";
        time = 35 * 60;
        refreshIntervalId = setInterval(updateCountdown, 1000);
        setTimeout(endScienceSection, 2100000);
        startQuiz(scienceQuestions, 13, 14, 13);
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

    function startQuiz(questions, numEasy, numMedium, numHard) {
        if (!questions || questions.length === 0) {
            console.error("No questions available for", currentSection);
            return;
        }
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
            return arr.sort(() => 0.5 - Math.random()).slice(0, num);
        }

        const selectedEasy = getRandom(easyQuestions, Math.min(numEasy, easyQuestions.length));
        const selectedMedium = getRandom(mediumQuestions, Math.min(numMedium, mediumQuestions.length));
        const selectedHard = getRandom(hardQuestions, Math.min(numHard, hardQuestions.length));

        return [...selectedEasy, ...selectedMedium, ...selectedHard];
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
        userResponses.push({
            question: (currentQuestion.passage || "") + "<br/><br/>" + currentQuestion.question,
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
    const passageText = response.passage;

    // Set 2: Editorial Board Passage
    if (passageText.includes("The editorial board gathered in a cramped office")) {
        if (response.question.includes("Which punctuation corrects the sentence 'The plan promised faster commutes but at a steep cost: fares would rise, hitting low-income riders hardest'?")) {
            return "Option B) adds a comma before 'but,' correctly joining independent clauses, while the colon introduces the fare increase detail. A) creates a run-on, C) misuses a semicolon, and D) retains the faulty structure.";
        } else if (response.question.includes("In the sentence 'Her draft began to take shape, weaving hard numbers with stories of daily commuters—a single mother juggling two jobs, a student racing to class,' which phrase corrects the parallel structure?")) {
            return "Option C) uses consistent verb tenses ('juggles,' 'races') for parallelism. A) shifts tense incorrectly, B) mixes forms, and D) keeps the error.";
        } else if (response.question.includes("Which word should replace 'synthesizing' in 'Maya tapped her pen, synthesizing ideas' to improve clarity?")) {
            return "Option B) 'integrating' clearly conveys blending ideas. A) is too vague, C) implies evaluation, and D) keeps the less precise term.";
        } else if (response.question.includes("Which sentence best follows 'The board agreed to refine it tomorrow, but Maya lingered, tweaking a sentence' to emphasize Maya’s dedication?")) {
            return "Option C) highlights Maya’s focus on perfecting her work. A) is vague, B) shifts focus, and D) introduces an irrelevant detail.";
        } else if (response.question.includes("In the sentence 'Others hesitated, wary of alienating city officials,' which pronoun correctly replaces 'Others' for agreement with the subject?")) {
            return "Option B) 'Certain members' specifies the subject clearly. A) is vague, C) implies all, and D) retains the ambiguity.";
        } else if (response.question.includes("Which revision to 'The piece wasn’t flawless; it sidestepped some thorny budget details' best improves conciseness?")) {
            return "Option B) streamlines the sentence while retaining meaning. A) adds complexity, C) is abrupt, and D) keeps the wordier structure.";
        } else if (response.question.includes("Which punctuation corrects the sentence 'The room crackled with debate, voices rising over cold coffee'?")) {
            return "Option C) adds 'with' for clarity, linking the clauses. A) misuses a semicolon, B) misuses a colon, and D) lacks connection.";
        } else if (response.question.includes("Which transition phrase, inserted before 'Nods circled the table, though Jamal pushed for sharper phrasing,' best clarifies the contrast?")) {
            return "Option B) 'Despite this' highlights the contrast between agreement and Jamal’s dissent. A) suggests timing, C) implies example, and D) adds unrelated detail.";
        } else if (response.question.includes("Which revision to 'Her colleague, Jamal, argued for a bold stance, urging the board to call for subsidies to offset fare hikes' corrects a subtle verb tense error?")) {
            return "Option D) maintains the past tense 'argued,' consistent with the passage. A) shifts to present, B) overcorrects, and C) disrupts structure.";
        } else if (response.question.includes("Which phrase in 'It called for compromise—targeted fare relief funded by reallocated taxes' best replaces 'funded by' to enhance precision?")) {
            return "Option C) 'financed by' is precise for budgetary context. A) is vague, B) is informal, and D) keeps the less specific phrase.";
        } else if (response.question.includes("Which sentence contains a misplaced modifier requiring correction?")) {
            return "Option D) is correct; no sentence has a misplaced modifier. A), B), and C) are properly structured.";
        } else if (response.question.includes("Which revision to 'The plan promised faster commutes but at a steep cost' best emphasizes the trade-off while maintaining tone?")) {
            return "Option A) balances benefits and burdens while matching tone. B) exaggerates, C) shifts tone, and D) lacks emphasis.";
        } else if (response.question.includes("In 'The editorial board gathered in a cramped office, papers strewn across the table,' which verb corrects the participle 'strewn' for agreement?")) {
            return "Option D) 'strewn' is correct as a past participle. A), B), and C) disrupt tense or meaning.";
        } else if (response.question.includes("Which sentence best introduces the passage to clarify the board’s purpose?")) {
            return "Option D) clearly states the drafting goal. A) is redundant, B) shifts focus, and C) emphasizes leadership.";
        } else if (response.question.includes("Which sentence contains an error in parallel structure?")) {
            return "Option D) is correct; no sentence has a parallelism error. A), B), and C) maintain consistent structure.";
        }
    }

    // Set 3: Garden Passage
    if (passageText.includes("The community garden bloomed with possibility")) {
        if (response.question.includes("Which punctuation corrects the sentence 'Rosa, the garden’s founder, had spent years planning beds, trellises, and compost bins'?")) {
            return "Option B) uses commas correctly for the appositive. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
        } else if (response.question.includes("Which word replaces 'bloomed' in 'The community garden bloomed with possibility, drawing neighbors together' to maintain tone?")) {
            return "Option A) 'flourished' keeps the hopeful tone. B) is neutral, C) is technical, and D) retains the original.";
        } else if (response.question.includes("Which pronoun corrects the agreement in 'Each volunteer brought their own tools to the garden'?")) {
            return "Option B) 'his or her' matches singular 'Each.' A) keeps the error, C) shifts number, and D) is incorrect.";
        } else if (response.question.includes("Which phrase replaces 'relying on' in 'The garden, relying on donations, thrived with vibrant crops' for clarity?")) {
            return "Option A) 'sustained by' is precise. B) is vague, C) shifts meaning, and D) keeps the original.";
        } else if (response.question.includes("Which revision combines 'The garden wasn’t perfect. Weeds crept in persistently' for better flow?")) {
            return "Option B) 'yet' links clauses smoothly. A) is choppy, C) misaligns logic, and D) shifts tone.";
        } else if (response.question.includes("Which revision to 'Skeptics wondered—could a small plot really unite the community?' maintains tone?")) {
            return "Option C) preserves the doubtful tone. A) is harsh, B) is formal, and D) keeps the original.";
        } else if (response.question.includes("Which punctuation corrects 'Spring arrived, the garden burst with color, but pests loomed'?")) {
            return "Option A) uses a semicolon for independent clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
        } else if (response.question.includes("Which sentence follows 'As harvest neared, cheers rose, though Rosa planned pest control tweaks' to emphasize effort?")) {
            return "Option C) highlights ongoing work. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
        } else if (response.question.includes("Which revision corrects the tense in 'Rosa stood by the gate, watching as volunteers plant seedlings'?")) {
            return "Option A) 'planted' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
        } else if (response.question.includes("Which revision to 'a symbol of grit and shared dreams' improves conciseness?")) {
            return "Option C) is succinct and clear. A) is wordy, B) shifts meaning, and D) keeps the original.";
        } else if (response.question.includes("Which sentence contains a misplaced modifier?")) {
            return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
        } else if (response.question.includes("Which transition phrase before 'Neighbors shared tools, their laughter echoing,' clarifies unity?")) {
            return "Option B) 'As a result' shows connection. A) implies time, C) is an example, and D) shifts focus.";
        } else if (response.question.includes("Which phrase replaces 'despite early setbacks' in 'Crops grew strong, despite early setbacks' for precision?")) {
            return "Option C) 'though challenged' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
        } else if (response.question.includes("Which revision to 'Every failure taught them perseverance' emphasizes growth?")) {
            return "Option B) underscores learning. A) is vague, C) shifts focus, and D) keeps the original.";
        } else if (response.question.includes("Which sentence has an error in parallel structure?")) {
            return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
    }

    // Set 4: Science Fair Passage
    if (passageText.includes("The gymnasium hummed with the energy of the science fair")) {
        if (response.question.includes("Which punctuation corrects the sentence 'Samir, the lead presenter, had tested his solar model for weeks, tweaking panels, and circuits'?")) {
            return "Option B) uses commas for the appositive and list. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
        } else if (response.question.includes("Which word replaces 'honed' in 'Students honed their projects, racing against the deadline' to maintain urgency?")) {
            return "Option A) 'refined' keeps the intense tone. B) is calm, C) is vague, and D) retains the original.";
        } else if (response.question.includes("Which pronoun corrects the agreement in 'Each student displayed their hypothesis proudly'?")) {
            return "Option B) 'his or her' matches singular 'Each.' A) keeps the error, C) shifts number, and D) is incorrect.";
        } else if (response.question.includes("Which phrase replaces 'built on' in 'The fair, built on months of effort, showcased innovation' for clarity?")) {
            return "Option A) 'driven by' is precise. B) is vague, C) shifts meaning, and D) keeps the original.";
        } else if (response.question.includes("Which revision combines 'The projects weren’t flawless. They impressed the judges' for flow?")) {
            return "Option B) 'yet' links clauses smoothly. A) is abrupt, C) misaligns logic, and D) shifts tone.";
        } else if (response.question.includes("Which revision to 'Judges murmured—could kids this young solve real problems?' maintains tone?")) {
            return "Option C) keeps the skeptical tone. A) is harsh, B) is formal, and D) retains the original.";
        } else if (response.question.includes("Which punctuation corrects 'The fair began, models whirred to life, but nerves lingered'?")) {
            return "Option A) uses a semicolon for clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
        } else if (response.question.includes("Which sentence follows 'As judging ended, cheers erupted, though Samir eyed his model’s flaws' to emphasize improvement?")) {
            return "Option C) highlights refinement. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
        } else if (response.question.includes("Which revision corrects the tense in 'Samir explained his model, hoping judges notice its efficiency'?")) {
            return "Option A) 'noticed' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
        } else if (response.question.includes("Which revision to 'a showcase of curiosity and bold ideas' improves conciseness?")) {
            return "Option C) is succinct and clear. A) is wordy, B) shifts meaning, and D) keeps the original.";
        } else if (response.question.includes("Which sentence contains a misplaced modifier?")) {
            return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
        } else if (response.question.includes("Which transition phrase before 'Judges took notes, their faces unreadable,' clarifies contrast?")) {
            return "Option B) 'In contrast' highlights difference. A) implies time, C) is an example, and D) is causal.";
        } else if (response.question.includes("Which phrase replaces 'despite initial doubts' in 'Projects shone, despite initial doubts' for precision?")) {
            return "Option C) 'though questioned' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
        } else if (response.question.includes("Which revision to 'Every setback fueled their drive' emphasizes persistence?")) {
            return "Option B) underscores resilience. A) is vague, C) shifts focus, and D) keeps the original.";
        } else if (response.question.includes("Which sentence has an error in parallel structure?")) {
            return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
    }

    // Set 5: Theater Passage
    if (passageText.includes("The theater troupe huddled backstage")) {
        if (response.question.includes("Which punctuation corrects the sentence 'The troupe’s director, Elena Vasquez, had spent weeks perfecting the lighting cues, sound levels, and actors’ blocking'?")) {
            return "Option B) correctly uses commas for the appositive. A) lacks commas, C) misplaces a comma, and D) omits punctuation.";
        } else if (response.question.includes("Which word replaces 'huddled' in 'The theater troupe huddled backstage, nerves fraying as the clock ticked closer to curtain' to maintain tone?")) {
            return "Option A) 'gathered' preserves the anxious tone. B) is too casual, C) too formal, and D) keeps the original.";
        } else if (response.question.includes("Which pronoun corrects the agreement error in 'Each actor checked their costume, ensuring no detail was overlooked'?")) {
            return "Option B) 'his or her' matches singular 'Each.' A) retains the error, C) shifts number, and D) is incorrect.";
        } else if (response.question.includes("Which phrase replaces 'relying on' in 'The production, relying on a shoestring budget, still dazzled with creative sets' for precision?")) {
            return "Option A) 'operating with' clarifies the budget constraint. B) is vague, C) shifts meaning, and D) keeps the original.";
        } else if (response.question.includes("Which revision best combines 'The play wasn’t flawless. It captivated the audience' to improve flow?")) {
            return "Option B) 'yet' smoothly contrasts flaws and success. A) is abrupt, C) misaligns logic, and D) shifts tone.";
        } else if (response.question.includes("Which revision to 'Critics scribbled notes—would this scrappy troupe pull it off?' maintains the passage’s tone?")) {
            return "Option C) preserves the skeptical tone. A) is too harsh, B) too formal, and D) keeps the original.";
        } else if (response.question.includes("Which punctuation corrects 'Opening night had arrived, the troupe was ready, but jittery'?")) {
            return "Option A) uses a semicolon for independent clauses. B) misuses a colon, C) creates a run-on, and D) keeps the error.";
        } else if (response.question.includes("Which sentence best follows 'As the curtain fell, applause erupted, though Elena already planned tweaks for tomorrow’s show' to emphasize refinement?")) {
            return "Option C) highlights ongoing improvements. A) shifts focus, B) is irrelevant, and D) lacks emphasis.";
        } else if (response.question.includes("Which revision corrects the verb tense in 'Elena stood in the wings, watching as the actors deliver their lines'?")) {
            return "Option A) 'delivered' matches past tense. B) shifts tense, C) is incorrect, and D) keeps the error.";
        } else if (response.question.includes("Which revision to 'a testament to raw talent and stubborn grit' enhances conciseness?")) {
            return "Option C) streamlines without losing impact. A) is wordy, B) shifts meaning, and D) keeps the original.";
        } else if (response.question.includes("Which sentence contains a misplaced modifier?")) {
            return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
        } else if (response.question.includes("Which transition phrase, inserted before 'The actors hit their marks, their voices steady despite the stakes,' clarifies the contrast?")) {
            return "Option B) 'Even so' highlights resilience. A) implies sequence, C) is irrelevant, and D) shifts focus.";
        } else if (response.question.includes("Which phrase replaces 'despite first-night jitters' in 'The actors moved with confidence, despite first-night jitters' for precision?")) {
            return "Option C) 'though nervous' is concise and clear. A) is wordy, B) shifts tone, and D) keeps the original.";
        } else if (response.question.includes("Which revision to 'Every prop malfunction taught them resilience' emphasizes learning?")) {
            return "Option B) underscores growth through setbacks. A) is vague, C) shifts focus, and D) keeps the original.";
        } else if (response.question.includes("Which sentence has an error in parallel structure?")) {
            return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
        }
    }

    // Set 6: Robotics Passage
    if (passageText.includes("The community center buzzed with anticipation as the robotics team")) {
        if (response.question.includes("Which punctuation corrects the sentence 'Aisha, the team’s coder, had spent sleepless nights refining algorithms to distinguish plastic from glass'?")) {
            return "Option B) correctly uses commas for the appositive. A) omits commas, C) misplaces a comma, and D) lacks punctuation.";
        } else if (response.question.includes("Which word replaces 'addressing' in 'Their goal was ambitious: a robot that could sort recyclables with precision, addressing the town’s overflowing landfill problem' to maintain verb tense consistency?")) {
            return "Option A) 'addressed' aligns with past tense. B) shifts tense, C) is future, and D) is incorrect.";
        } else if (response.question.includes("Which pronoun corrects the agreement error in 'The team knew the stakes: a win could fund a town-wide recycling program'?")) {
            return "Option B) 'its' matches singular 'team.' A) is plural, C) shifts subject, and D) keeps the error.";
        } else if (response.question.includes("Which phrase replaces 'based on' in 'Leo, an engineering whiz, designed a claw that adjusted its grip based on material density' to improve clarity?")) {
            return "Option A) 'depending on' is clearer. B) shifts meaning, C) is wordy, and D) keeps the original.";
        } else if (response.question.includes("Which revision best combines 'Their robot wasn’t perfect; glass sorting still lagged behind plastic' to improve flow?")) {
            return "Option B) 'as' links clauses smoothly. A) is abrupt, C) shifts logic, and D) is causal.";
        } else if (response.question.includes("Which revision to 'Critics in the audience murmured—could a high school team really tackle such a complex issue?' best maintains the passage’s tone?")) {
            return "Option C) keeps the doubtful tone. A) is informal, B) is formal, and D) retains the original.";
        } else if (response.question.includes("Which punctuation corrects 'Early prototypes had faltered; one memorably scattered cans across the lab'?")) {
            return "Option A) uses a comma for clarity. B) misuses a colon, C) is incorrect, and D) keeps the original.";
        } else if (response.question.includes("Which sentence best follows 'As the demo ended, applause erupted, though Aisha already mentally tweaked code for the next iteration' to emphasize persistence?")) {
            return "Option C) underscores continued effort. A) shifts focus, B) is irrelevant, and D) is vague.";
        } else if (response.question.includes("Which revision corrects the verb tense in 'Aisha and Leo exchanged a glance, silently acknowledging months of scrapped designs and heated debates'?")) {
            return "Option A) 'had exchanged' matches past context. B) shifts tense, C) is incorrect, and D) keeps the error.";
        } else if (response.question.includes("Which revision to 'a spark of innovation born from late-night pizza and stubborn hope' enhances conciseness?")) {
            return "Option C) is succinct and clear. A) is vague, B) loses impact, and D) keeps the original.";
        } else if (response.question.includes("Which sentence contains a misplaced modifier?")) {
            return "Option D) is correct; no misplaced modifiers exist. A), B), and C) are clear.";
        } else if (response.question.includes("Which transition phrase, inserted before 'The judges, however, scribbled notes, their expressions unreadable,' clarifies the contrast?")) {
            return "Option B) 'In contrast' highlights the difference. A) implies time, C) is an example, and D) is causal.";
        } else if (response.question.includes("Which phrase replaces 'despite her nerves' in 'The crowd leaned closer as Aisha explained the machine’s logic, her voice steady despite her nerves' for precision?")) {
            return "Option C) 'though anxious' is concise. A) is wordy, B) shifts tone, and D) keeps the original.";
        } else if (response.question.includes("Which revision to 'Yet each failure fueled their resolve' emphasizes resilience?")) {
            return "Option B) 'bolstered tenacity' emphasizes strength. A) is wordy, C) is vague, and D) keeps the original.";
        } else if (response.question.includes("Which sentence has an error in parallel structure?")) {
            return "Option D) is correct; no parallelism errors exist. A), B), and C) are consistent.";
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