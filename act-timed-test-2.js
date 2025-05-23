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

    const englishQuestions = [
        {
            passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
            question: "Which punctuation corrects the sentence 'For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps'?",
            answers: [
                { text: "A) For weeks the group led by seniors Maya Lin and Jamal Carter had planned meticulously, calibrating telescopes and designing star maps.", correct: false },
                { text: "B) For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps.", correct: true },
                { text: "C) For weeks, the group led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps.", correct: false },
                { text: "D) For weeks the group, led by seniors Maya Lin and Jamal Carter had planned meticulously calibrating telescopes and designing star maps.", correct: false }
            ],
            type: "english",
            difficulty: "easy",
            category: "conventions-of-standard-english",
            explanation: "The original sentence is correctly punctuated. The commas around 'led by seniors Maya Lin and Jamal Carter' set off a nonessential appositive phrase, and the comma before 'calibrating' separates the main clause from the participial phrase. Option B retains this correct punctuation."
        },
        {
            passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
            question: "Which word replaces 'sparking' in 'Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike' to maintain verb consistency?",
            answers: [
                { text: "A) sparked", correct: true },
                { text: "B) sparks", correct: false },
                { text: "C) will spark", correct: false },
                { text: "D) had sparked", correct: false }
            ],
            type: "english",
            difficulty: "easy",
            category: "conventions-of-standard-english",
            explanation: "The verb 'introduce' in the infinitive phrase 'to introduce' is in the present tense, so the parallel verb should also be in the present tense for consistency. 'Sparked' (A) is past tense, but the context requires the present 'sparking' or a similar form. However, since 'sparked' aligns with the infinitive structure in some ACT contexts, it’s the best fit among the options."
        },

         // Previous 2 questions (already provided)
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which punctuation corrects the sentence 'For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps'?",
                answers: [
                    { text: "A) For weeks the group led by seniors Maya Lin and Jamal Carter had planned meticulously, calibrating telescopes and designing star maps.", correct: false },
                    { text: "B) For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps.", correct: true },
                    { text: "C) For weeks, the group led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps.", correct: false },
                    { text: "D) For weeks the group, led by seniors Maya Lin and Jamal Carter had planned meticulously calibrating telescopes and designing star maps.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english",
                explanation: "The original sentence is correctly punctuated. The commas around 'led by seniors Maya Lin and Jamal Carter' set off a nonessential appositive phrase, and the comma before 'calibrating' separates the main clause from the participial phrase. Option B retains this correct punctuation."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which word replaces 'sparking' in 'Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike' to maintain verb consistency?",
                answers: [
                    { text: "A) sparked", correct: true },
                    { text: "B) sparks", correct: false },
                    { text: "C) will spark", correct: false },
                    { text: "D) had sparked", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english",
                explanation: "The verb 'introduce' in the infinitive phrase 'to introduce' suggests a timeless goal, so the parallel verb should align. 'Sparked' (A) maintains consistency in the infinitive structure, though 'sparking' is also correct in the original. Among the options, 'sparked' fits best."
            },
            // New questions for Passage 1
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which pronoun corrects the agreement error in 'The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant'?",
                answers: [
                    { text: "A) The club’s faculty advisor nodded approvingly, jotting notes for their next year’s grant.", correct: false },
                    { text: "B) The club’s faculty advisors nodded approvingly, jotting notes for next year’s grant.", correct: false },
                    { text: "C) The club’s faculty advisor, however, nodded approvingly, jotting notes for his or her next year’s grant.", correct: true },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english",
                explanation: "The singular 'faculty advisor' requires a singular pronoun. The original sentence lacks a pronoun, but 'next year’s grant' implies the advisor’s action. Option C clarifies with 'his or her,' ensuring agreement, as the advisor’s gender is unspecified."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which phrase replaces 'without losing their awe' in 'Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe' to improve clarity?",
                answers: [
                    { text: "A) while retaining their wonder", correct: true },
                    { text: "B) despite reducing their impact", correct: false },
                    { text: "C) by diminishing their complexity", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "knowledge-of-language",
                explanation: "The phrase 'without losing their awe' is clear but can be refined for precision. 'While retaining their wonder' (A) maintains the positive tone and clarifies that the theories’ inspiring quality is preserved, enhancing readability."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which revision best combines 'The night wasn’t flawless; one telescope jammed briefly' to improve flow?",
                answers: [
                    { text: "A) The night wasn’t flawless, with one telescope jamming briefly.", correct: false },
                    { text: "B) Though the night wasn’t flawless, one telescope jammed briefly.", correct: true },
                    { text: "C) The night wasn’t flawless because one telescope jammed briefly.", correct: false },
                    { text: "D) One telescope jammed briefly, making the night not flawless.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing",
                explanation: "Combining the sentences requires a conjunction that maintains the passage’s tone. Option B uses 'though' to smoothly connect the ideas, indicating a minor flaw without implying causation, unlike C or D. Option A is less cohesive."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which revision to 'Skeptics whispered—could teenagers really pull off such an ambitious event?' best maintains the passage’s tone?",
                answers: [
                    { text: "A) Doubters muttered—could kids manage such a grand event?", correct: false },
                    { text: "B) Critics murmured—could teens truly execute so bold an event?", correct: true },
                    { text: "C) Onlookers questioned—could students handle such a big show?", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language",
                explanation: "The original tone is skeptical yet subtle, conveyed by 'whispered.' Option B’s 'murmured' and 'truly execute' maintain this tone, while 'muttered' (A) feels harsher and 'questioned' (C) less secretive. Option D retains the original, but B enhances formality."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which punctuation corrects 'Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event'?",
                answers: [
                    { text: "A) Early attempts at outreach had stumbled, a cloudy forecast last year canceled the event.", correct: true },
                    { text: "B) Early attempts at outreach had stumbled: a cloudy forecast last year canceled the event.", correct: false },
                    { text: "C) Early attempts at outreach had stumbled—a cloudy forecast last year canceled the event.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english",
                explanation: "The semicolon in the original separates two independent clauses, but a comma (A) is correct here, as the second clause explains the first, creating a closer relationship. A colon (B) suggests a list or elaboration, and a dash (C) is too informal."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which sentence best follows 'But as stars twinkled above, the crowd’s gasps echoed Maya’s hope' to emphasize the event’s success?",
                answers: [
                    { text: "A) The library staff began packing up chairs.", correct: false },
                    { text: "B) Inspired, the club planned a follow-up workshop.", correct: true },
                    { text: "C) Jamal adjusted the telescope’s alignment.", correct: false },
                    { text: "D) The crowd dispersed quietly.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing",
                explanation: "The sentence should reinforce the event’s positive impact. Option B highlights the club’s inspiration and future plans, aligning with Maya’s hope and the crowd’s enthusiasm. Options A, C, and D focus on logistics or neutrality, diluting the emphasis on success."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which revision corrects the verb tense in 'Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus'?",
                answers: [
                    { text: "A) Families had arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus.", correct: true },
                    { text: "B) Families arrive, kids clutching glow-in-the-dark star charts, while Maya tests a telescope’s focus.", correct: false },
                    { text: "C) Families arriving, kids clutching glow-in-the-dark star charts, while Maya testing a telescope’s focus.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english",
                explanation: "The passage uses past perfect ('had planned') for earlier actions and simple past for the event. 'Arrived' and 'tested' should be 'had arrived' and 'had tested' to indicate actions before the main narrative, but 'had arrived' (A) corrects the primary verb, aligning with the sequence."
            },
            {
                passage: "The town library buzzed with excitement as the archaeology club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which revision to 'a math prodigy' in 'Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major' enhances specificity?",
                answers: [
                    { text: "A) an exceptional mathematician", correct: true },
                    { text: "B) a skilled student", correct: false },
                    { text: "C) a talented individual", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language",
                explanation: "The term 'math prodigy' is specific but can be refined for precision. 'An exceptional mathematician' (A) conveys Maya’s advanced skill in a more formal, specific way, aligning with her role in calculating viewing times."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which sentence contains a misplaced modifier?",
                answers: [
                    { text: "A) For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps.", correct: false },
                    { text: "B) Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus.", correct: false },
                    { text: "C) The night wasn’t flawless; one telescope jammed briefly.", correct: false },
                    { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
                ],
                type: "english",
                difficulty: "hard",
                category: "conventions-of-standard-english",
                explanation: "A misplaced modifier incorrectly modifies the wrong word. All listed sentences have clear modifier placement: A’s appositive is correctly placed, B’s participial phrase modifies 'kids,' and C has no modifiers. Option D is correct."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which transition phrase, inserted before 'The club’s faculty advisor, however, nodded approvingly,' clarifies the contrast?",
                answers: [
                    { text: "A) Meanwhile", correct: false },
                    { text: "B) In contrast", correct: true },
                    { text: "C) For instance", correct: false },
                    { text: "D) Consequently", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing",
                explanation: "The advisor’s approval contrasts with the skeptics’ doubts. 'In contrast' (B) clearly signals this opposition, while 'Meanwhile' (A) suggests simultaneity, 'For instance' (C) implies an example, and 'Consequently' (D) suggests causation."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which phrase replaces 'with contagious enthusiasm' in 'Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm' for precision?",
                answers: [
                    { text: "A) with infectious excitement", correct: true },
                    { text: "B) with loud clarity", correct: false },
                    { text: "C) with scientific precision", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language",
                explanation: "The phrase 'with contagious enthusiasm' conveys Jamal’s engaging delivery. 'With infectious excitement' (A) sharpens this by emphasizing the emotional impact, while B and C shift focus to volume or accuracy, and D retains a less precise term."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which revision to 'Yet their determination held firm' emphasizes resilience?",
                answers: [
                    { text: "A) Still, their resolve remained unshaken.", correct: true },
                    { text: "B) But their efforts continued.", correct: false },
                    { text: "C) However, they stayed committed.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "hard",
                category: "production-of-writing",
                explanation: "The original emphasizes perseverance. 'Still, their resolve remained unshaken' (A) intensifies this with stronger language, highlighting resilience. Options B and C are weaker, and D doesn’t enhance the emphasis."
            },
            {
                passage: "The town library buzzed with excitement as the astronomy club prepared for its annual stargazing event. For weeks, the group, led by seniors Maya Lin and Jamal Carter, had planned meticulously, calibrating telescopes and designing star maps. Their aim was bold: to introduce the community to the wonders of the cosmos, sparking curiosity in young and old alike. Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major. Jamal, an aspiring astrophysicist, crafted a presentation on black holes, simplifying complex theories without losing their awe. Early attempts at outreach had stumbled; a cloudy forecast last year canceled the event. Yet their determination held firm. Now, with clear skies forecast, volunteers set up equipment on the library lawn. Families arrived, kids clutching glow-in-the-dark star charts, while Maya tested a telescope’s focus. Jamal’s voice carried over the crowd, explaining a supernova’s lifecycle with contagious enthusiasm. Skeptics whispered—could teenagers really pull off such an ambitious event? The club’s faculty advisor, however, nodded approvingly, jotting notes for next year’s grant. The night wasn’t flawless; one telescope jammed briefly. But as stars twinkled above, the crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.",
                question: "Which sentence contains an error in parallel structure?",
                answers: [
                    { text: "A) Maya, a math prodigy, calculated precise viewing times for constellations like Orion and Ursa Major.", correct: false },
                    { text: "B) Volunteers set up equipment on the library lawn.", correct: false },
                    { text: "C) The crowd’s gasps echoed Maya’s hope: curiosity, she thought, could light up even the darkest skies.", correct: false },
                    { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
                ],
                type: "english",
                difficulty: "hard",
                category: "conventions-of-standard-english",
                explanation: "Parallel structure requires consistent grammatical forms in a series. All sentences maintain proper structure: A uses a single verb phrase, B is a simple sentence, and C has no series. Option D is correct."
            },
        
            // Passage 2: Community Mural Project
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which punctuation corrects the sentence 'For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers'?",
                answers: [
                    { text: "A) For months the team guided by juniors Sofia Ruiz and Ethan Kim had sketched designs, mixed paints, and rallied volunteers.", correct: false },
                    { text: "B) For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers.", correct: true },
                    { text: "C) For months, the team, guided by juniors Sofia Ruiz and Ethan Kim had sketched designs, mixed paints, and rallied volunteers.", correct: false },
                    { text: "D) For months the team—guided by juniors Sofia Ruiz and Ethan Kim, had sketched designs, mixed paints, and rallied volunteers.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english",
                explanation: "The original sentence is correctly punctuated with dashes setting off the nonessential phrase 'guided by juniors Sofia Ruiz and Ethan Kim' and commas separating the series. Option B retains this correct structure."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which word replaces 'celebrating' in 'Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity' to maintain verb form?",
                answers: [
                    { text: "A) celebrated", correct: true },
                    { text: "B) celebrates", correct: false },
                    { text: "C) will celebrate", correct: false },
                    { text: "D) had celebrated", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english",
                explanation: "The noun 'mural' is modified by the participle 'celebrating,' which acts as an adjective. 'Celebrated' (A) maintains this adjectival form, ensuring consistency, while other options shift tense inappropriately."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which pronoun corrects the agreement in 'The mayor, however, praised the effort, snapping photos for the town newsletter'?",
                answers: [
                    { text: "A) The mayor praised their effort, snapping photos for the town newsletter.", correct: false },
                    { text: "B) The mayor, however, praised the effort, snapping photos for his or her town newsletter.", correct: true },
                    { text: "C) The mayors praised the effort, snapping photos for the town newsletter.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english",
                explanation: "The singular 'mayor' requires a singular pronoun. Option B clarifies ownership of the newsletter with 'his or her,' matching the mayor’s unspecified gender, while A uses plural 'their,' and C incorrectly pluralizes 'mayor.'"
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which phrase replaces 'cross-referencing' in 'Ethan, a history buff, ensured accuracy, cross-referencing archives for details' to improve clarity?",
                answers: [
                    { text: "A) consulting", correct: true },
                    { text: "B) reviewing", correct: false },
                    { text: "C) compiling", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "knowledge-of-language",
                explanation: "'Cross-referencing' is specific but technical. 'Consulting' (A) simplifies the action while clearly conveying Ethan’s use of archives, enhancing accessibility without losing meaning."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which revision best combines 'The mural wasn’t perfect; a paint spill marred one corner' to improve flow?",
                answers: [
                    { text: "A) The mural wasn’t perfect, with a paint spill marring one corner.", correct: false },
                    { text: "B) The mural wasn’t perfect, as a paint spill marred one corner.", correct: true },
                    { text: "C) Because a paint spill marred one corner, the mural wasn’t perfect.", correct: false },
                    { text: "D) A paint spill marred one corner, so the mural wasn’t perfect.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing",
                explanation: "Option B uses 'as' to link the clauses smoothly, indicating the reason for imperfection without implying strong causation, fitting the passage’s tone. A is less cohesive, and C and D suggest stronger causality."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which revision to 'Doubters murmured—could a student-led mural capture the town’s spirit?' maintains the passage’s tone?",
                answers: [
                    { text: "A) Skeptics whispered—could kids create such a meaningful mural?", correct: false },
                    { text: "B) Naysayers muttered—could students depict the town’s essence?", correct: true },
                    { text: "C) Observers questioned—could teens paint a true town portrait?", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language",
                explanation: "The original’s 'murmured' conveys quiet doubt. Option B’s 'muttered' and 'depict the town’s essence' preserve this subtle skepticism, while A’s 'whispered' and C’s 'questioned' shift tone slightly. B aligns best."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which punctuation corrects 'Initial plans had faltered; a funding shortfall nearly halted the project'?",
                answers: [
                    { text: "A) Initial plans had faltered, a funding shortfall nearly halted the project.", correct: true },
                    { text: "B) Initial plans had faltered: a funding shortfall nearly halted the project.", correct: false },
                    { text: "C) Initial plans had faltered—a funding shortfall nearly halted the project.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "easy",
                category: "conventions-of-standard-english",
                explanation: "The semicolon is incorrect, as the second clause explains the first. A comma (A) better reflects this relationship, while a colon (B) or dash (C) implies a different emphasis."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which sentence best follows 'Yet as colors bloomed, Sofia felt the town’s pride' to emphasize community unity?",
                answers: [
                    { text: "A) The mayor planned a dedication ceremony.", correct: false },
                    { text: "B) Neighbors vowed to protect the mural’s legacy.", correct: true },
                    { text: "C) Ethan cleaned up the paint cans.", correct: false },
                    { text: "D) The artists took a group photo.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing",
                explanation: "Option B emphasizes unity by showing collective commitment, aligning with Sofia’s vision. A, C, and D focus on logistics or celebration, not reinforcing community cohesion."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which revision corrects the verb tense in 'Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience'?",
                answers: [
                    { text: "A) Residents had watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience.", correct: true },
                    { text: "B) Residents watch, some offering suggestions, as Sofia outlines a towering oak symbolizing resilience.", correct: false },
                    { text: "C) Residents watching, some offering suggestions, as Sofia outlining a towering oak symbolizing resilience.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "conventions-of-standard-english",
                explanation: "The past perfect 'had watched' (A) aligns with the passage’s earlier actions (e.g., 'had sketched'), placing the residents’ watching before the main event. B and C shift tenses incorrectly."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which revision to 'symbolizing resilience' enhances conciseness?",
                answers: [
                    { text: "A) representing strength", correct: true },
                    { text: "B) embodying community spirit", correct: false },
                    { text: "C) reflecting endurance", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "knowledge-of-language",
                explanation: "'Symbolizing resilience' is clear but wordy. 'Representing strength' (A) is concise and retains meaning, while B and C are less direct or add complexity."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which sentence contains a misplaced modifier?",
                answers: [
                    { text: "A) Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals.", correct: false },
                    { text: "B) Ethan explained the mural’s timeline, his enthusiasm drawing nods.", correct: false },
                    { text: "C) Now, with donations secured, artists gathered on the center’s wall, brushes in hand.", correct: false },
                    { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
                ],
                type: "english",
                difficulty: "hard",
                category: "conventions-of-standard-english",
                explanation: "All modifiers are correctly placed: A’s appositive modifies Sofia, B’s phrase modifies Ethan, and C’s phrase modifies the artists’ action. Option D is correct."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which transition phrase, inserted before 'The mayor, however, praised the effort,' clarifies the contrast?",
                answers: [
                    { text: "A) Meanwhile", correct: false },
                    { text: "B) In contrast", correct: true },
                    { text: "C) For example", correct: false },
                    { text: "D) As a result", correct: false }
                ],
                type: "english",
                difficulty: "medium",
                category: "production-of-writing",
                explanation: "'In contrast' (B) highlights the mayor’s praise against the doubters’ skepticism, while A suggests timing, C implies an example, and D suggests causation."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which revision to 'Still, their passion persisted' emphasizes dedication?",
                answers: [
                    { text: "A) Yet their commitment endured.", correct: true },
                    { text: "B) But their efforts continued.", correct: false },
                    { text: "C) However, their interest remained.", correct: false },
                    { text: "D) No change is needed.", correct: false }
                ],
                type: "english",
                difficulty: "hard",
                category: "production-of-writing",
                explanation: "'Yet their commitment endured' (A) strengthens the focus on dedication, while B and C are less intense, and D doesn’t enhance the emphasis."
            },
            {
                passage: "The community center glowed with creativity as the art club unveiled its mural project. For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers. Their vision was daring: a vibrant mural celebrating the town’s history, from its founding to its modern diversity. Sofia, a gifted illustrator, drafted scenes of early settlers and local festivals. Ethan, a history buff, ensured accuracy, cross-referencing archives for details. Initial plans had faltered; a funding shortfall nearly halted the project. Still, their passion persisted. Now, with donations secured, artists gathered on the center’s wall, brushes in hand. Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience. Ethan explained the mural’s timeline, his enthusiasm drawing nods. Doubters murmured—could a student-led mural capture the town’s spirit? The mayor, however, praised the effort, snapping photos for the town newsletter. The mural wasn’t perfect; a paint spill marred one corner. Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.",
                question: "Which sentence contains an error in parallel structure?",
                answers: [
                    { text: "A) For months, the team—guided by juniors Sofia Ruiz and Ethan Kim—had sketched designs, mixed paints, and rallied volunteers.", correct: false },
                    { text: "B) Residents watched, some offering suggestions, as Sofia outlined a towering oak symbolizing resilience.", correct: false },
                    { text: "C) Yet as colors bloomed, Sofia felt the town’s pride: art, she thought, could weave a community together.", correct: false },
                    { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
                ],
                type: "english",
                difficulty: "hard",
                category: "conventions-of-standard-english",
                explanation: "All sentences maintain parallel structure: A’s series uses past perfect verbs, B has no series, and C is structurally sound. Option D is correct."
            },
        
            // Passage 3: Robotics Competition
        
                // Previous questions for Passage 1 (15 questions) and Passage 2 (15 questions) are retained but not repeated here for brevity.
                // Previous 7 questions for Passage 3 (already provided)
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which punctuation corrects the sentence 'For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears'?",
                    answers: [
                        { text: "A) For months the squad mentored by sophomores Ava Chen and Lucas Patel had toiled in the lab, programming sensors and assembling gears.", correct: false },
                        { text: "B) For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears.", correct: true },
                        { text: "C) For months, the squad, mentored by sophomores Ava Chen and Lucas Patel had toiled in the lab, programming sensors and assembling gears.", correct: false },
                        { text: "D) For months the squad—mentored by sophomores Ava Chen and Lucas Patel, had toiled in the lab, programming sensors and assembling gears.", correct: false }
                    ],
                    type: "english",
                    difficulty: "easy",
                    category: "conventions-of-standard-english",
                    explanation: "The original uses dashes correctly to set off the nonessential phrase and commas for the series. Option B retains this structure."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which word replaces 'mimicking' in 'Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup' to maintain consistency?",
                    answers: [
                        { text: "A) imitating", correct: true },
                        { text: "B) mimics", correct: false },
                        { text: "C) will mimic", correct: false },
                        { text: "D) had mimicked", correct: false }
                    ],
                    type: "english",
                    difficulty: "easy",
                    category: "conventions-of-standard-english",
                    explanation: "'Mimicking' modifies 'robot' as a participle. 'Imitating' (A) maintains this form, aligning with 'navigating' and 'capable.' Other options disrupt the structure."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which pronoun corrects 'The coach, however, took notes, impressed by the innovation' for agreement?",
                    answers: [
                        { text: "A) The coach took their notes, impressed by the innovation.", correct: false },
                        { text: "B) The coaches took notes, impressed by the innovation.", correct: false },
                        { text: "C) The coach, however, took notes, impressed by his or her innovation.", correct: true },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "conventions-of-standard-english",
                    explanation: "The singular 'coach' requires a singular pronoun. Option C uses 'his or her' to clarify, matching the unspecified gender."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which phrase replaces 'to optimize' in 'Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding' for clarity?",
                    answers: [
                        { text: "A) to improve", correct: true },
                        { text: "B) to design", correct: false },
                        { text: "C) to control", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "easy",
                    category: "knowledge-of-language",
                    explanation: "'To optimize' is technical. 'To improve' (A) clarifies Ava’s goal of enhancing pathfinding, making it more accessible."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which revision best combines 'The demo wasn’t flawless; a sensor misfired once' to improve flow?",
                    answers: [
                        { text: "A) The demo wasn’t flawless, with a sensor misfiring once.", correct: false },
                        { text: "B) The demo wasn’t flawless, as a sensor misfired once.", correct: true },
                        { text: "C) A sensor misfired once, so the demo wasn’t flawless.", correct: false },
                        { text: "D) Because a sensor misfired once, the demo wasn’t flawless.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "production-of-writing",
                    explanation: "'As' (B) links the clauses smoothly, explaining the flaw without strong causation, fitting the tone."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which revision to 'Naysayers whispered—could students solve real-world problems?' maintains the tone?",
                    answers: [
                        { text: "A) Critics muttered—could kids tackle such issues?", correct: false },
                        { text: "B) Skeptics murmured—could students address complex challenges?", correct: true },
                        { text: "C) Observers questioned—could teens fix big problems?", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "knowledge-of-language",
                    explanation: "'Murmured' and 'address complex challenges' (B) preserve the subtle doubt, while A and C shift tone or specificity."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which punctuation corrects 'Past prototypes had failed; one crashed during a test run, scattering parts'?",
                    answers: [
                        { text: "A) Past prototypes had failed, one crashed during a test run, scattering parts.", correct: true },
                        { text: "B) Past prototypes had failed: one crashed during a test run, scattering parts.", correct: false },
                        { text: "C) Past prototypes had failed—one crashed during a test run, scattering parts.", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "easy",
                    category: "conventions-of-standard-english",
                    explanation: "A comma (A) better links the explanatory clause, while a colon (B) or dash (C) shifts emphasis."
                },
                // New questions for Passage 3
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which sentence best follows 'Yet as the robot completed its course, Ava sensed victory' to emphasize the team’s success?",
                    answers: [
                        { text: "A) The coach began packing up the equipment.", correct: false },
                        { text: "B) The team planned to refine the robot further.", correct: true },
                        { text: "C) Lucas adjusted the robot’s sensors.", correct: false },
                        { text: "D) Spectators left the gym quietly.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "production-of-writing",
                    explanation: "Option B reinforces success by showing the team’s forward momentum, aligning with Ava’s sense of victory. A, C, and D focus on logistics or neutrality, not emphasizing achievement."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which revision corrects the verb tense in 'Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering'?",
                    answers: [
                        { text: "A) Spectators had leaned in as Ava detailed the code’s logic, her confidence unwavering.", correct: true },
                        { text: "B) Spectators lean in as Ava details the code’s logic, her confidence unwavering.", correct: false },
                        { text: "C) Spectators leaning in as Ava detailing the code’s logic, her confidence unwavering.", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "conventions-of-standard-english",
                    explanation: "The past perfect 'had leaned' (A) aligns with the passage’s earlier actions (e.g., 'had toiled'), placing the spectators’ action before the main event. B and C shift tenses incorrectly."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which revision to 'a mechanical wizard' in 'Lucas, a mechanical wizard, engineered a lightweight frame for agility' enhances specificity?",
                    answers: [
                        { text: "A) a skilled engineer", correct: true },
                        { text: "B) a talented student", correct: false },
                        { text: "C) a creative individual", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "knowledge-of-language",
                    explanation: "'A mechanical wizard' is vivid but vague. 'A skilled engineer' (A) specifies Lucas’s expertise, aligning with his role in engineering the frame."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which sentence contains a misplaced modifier?",
                    answers: [
                        { text: "A) Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding.", correct: false },
                        { text: "B) Lucas demonstrated the robot’s arm, which scooped mock debris with precision.", correct: false },
                        { text: "C) Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly.", correct: false },
                        { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
                    ],
                    type: "english",
                    difficulty: "hard",
                    category: "conventions-of-standard-english",
                    explanation: "All modifiers are correctly placed: A’s appositive modifies Ava, B’s clause modifies the arm, and C’s phrase modifies the robot’s action. Option D is correct."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which transition phrase, inserted before 'The coach, however, took notes,' clarifies the contrast?",
                    answers: [
                        { text: "A) Meanwhile", correct: false },
                        { text: "B) In contrast", correct: true },
                        { text: "C) For instance", correct: false },
                        { text: "D) Consequently", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "production-of-writing",
                    explanation: "'In contrast' (B) highlights the coach’s approval against the naysayers’ doubts, while A suggests timing, C implies an example, and D suggests causation."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which phrase replaces 'with precision' in 'Lucas demonstrated the robot’s arm, which scooped mock debris with precision' for precision?",
                    answers: [
                        { text: "A) with accuracy", correct: true },
                        { text: "B) with speed", correct: false },
                        { text: "C) with strength", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "knowledge-of-language",
                    explanation: "'With precision' is clear, but 'with accuracy' (A) sharpens the focus on the arm’s exactness, aligning with the technical context."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which revision to 'Nevertheless, their resolve strengthened' emphasizes perseverance?",
                    answers: [
                        { text: "A) Yet their determination endured.", correct: true },
                        { text: "B) But their efforts continued.", correct: false },
                        { text: "C) However, their focus remained.", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "hard",
                    category: "production-of-writing",
                    explanation: "'Yet their determination endured' (A) intensifies perseverance, while B and C are less forceful, and D doesn’t enhance the emphasis."
                },
                {
                    passage: "The high school gym thrummed with energy as the robotics team showcased its creation for the state competition. For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears. Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup. Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding. Lucas, a mechanical wizard, engineered a lightweight frame for agility. Past prototypes had failed; one crashed during a test run, scattering parts. Nevertheless, their resolve strengthened. Now, with the competition nearing, the robot glided across the gym floor, its motors whirring smoothly. Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering. Lucas demonstrated the robot’s arm, which scooped mock debris with precision. Naysayers whispered—could students solve real-world problems? The coach, however, took notes, impressed by the innovation. The demo wasn’t flawless; a sensor misfired once. Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.",
                    question: "Which sentence contains an error in parallel structure?",
                    answers: [
                        { text: "A) For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears.", correct: false },
                        { text: "B) Spectators leaned in as Ava detailed the code’s logic, her confidence unwavering.", correct: false },
                        { text: "C) Yet as the robot completed its course, Ava sensed victory: ingenuity, she thought, could transform challenges into triumphs.", correct: false },
                        { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
                    ],
                    type: "english",
                    difficulty: "hard",
                    category: "conventions-of-standard-english",
                    explanation: "All sentences maintain parallel structure: A’s series uses past perfect verbs, B has no series, and C is structurally sound. Option D is correct."
                },
            
                // Passage 4: Community Garden Initiative
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which punctuation corrects the sentence 'For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds'?",
                    answers: [
                        { text: "A) For weeks the group led by seniors Mia Torres and Noah Lee had prepared tirelessly, tilling soil and selecting seeds.", correct: false },
                        { text: "B) For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds.", correct: true },
                        { text: "C) For weeks, the group, led by seniors Mia Torres and Noah Lee had prepared tirelessly, tilling soil and selecting seeds.", correct: false },
                        { text: "D) For weeks the group—led by seniors Mia Torres and Noah Lee, had prepared tirelessly, tilling soil and selecting seeds.", correct: false }
                    ],
                    type: "english",
                    difficulty: "easy",
                    category: "conventions-of-standard-english",
                    explanation: "The original uses dashes correctly to set off the nonessential phrase and commas for the series. Option B retains this structure."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which word replaces 'fostering' in 'Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health' to maintain verb form?",
                    answers: [
                        { text: "A) promoting", correct: true },
                        { text: "B) fosters", correct: false },
                        { text: "C) will foster", correct: false },
                        { text: "D) had fostered", correct: false }
                    ],
                    type: "english",
                    difficulty: "easy",
                    category: "conventions-of-standard-english",
                    explanation: "'Fostering' modifies 'garden' as a participle. 'Promoting' (A) maintains this form, aligning with 'supply.' Other options disrupt the structure."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which pronoun corrects 'The park manager, however, nodded approvingly, sketching plans for expansion' for agreement?",
                    answers: [
                        { text: "A) The park manager nodded approvingly, sketching their plans for expansion.", correct: false },
                        { text: "B) The park managers nodded approvingly, sketching plans for expansion.", correct: false },
                        { text: "C) The park manager, however, nodded approvingly, sketching his or her plans for expansion.", correct: true },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "conventions-of-standard-english",
                    explanation: "The singular 'park manager' requires a singular pronoun. Option C uses 'his or her' to clarify, matching the unspecified gender."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which phrase replaces 'to maximize' in 'Mia, a botany enthusiast, designed planting layouts to maximize yield' for clarity?",
                    answers: [
                        { text: "A) to increase", correct: true },
                        { text: "B) to plan", correct: false },
                        { text: "C) to ensure", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "easy",
                    category: "knowledge-of-language",
                    explanation: "'To maximize' is technical. 'To increase' (A) clarifies Mia’s goal of boosting yield, making it more accessible."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which revision best combines 'The garden wasn’t perfect; a few plants wilted' to improve flow?",
                    answers: [
                        { text: "A) The garden wasn’t perfect, with a few plants wilting.", correct: false },
                        { text: "B) The garden wasn’t perfect, as a few plants wilted.", correct: true },
                        { text: "C) A few plants wilted, so the garden wasn’t perfect.", correct: false },
                        { text: "D) Because a few plants wilted, the garden wasn’t perfect.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "production-of-writing",
                    explanation: "'As' (B) links the clauses smoothly, explaining the imperfection without strong causation, fitting the tone."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which revision to 'Critics muttered—could students sustain such a project?' maintains the tone?",
                    answers: [
                        { text: "A) Doubters whispered—could kids maintain such a garden?", correct: false },
                        { text: "B) Skeptics murmured—could students uphold such an initiative?", correct: true },
                        { text: "C) Observers questioned—could teens manage such a task?", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "knowledge-of-language",
                    explanation: "'Murmured' and 'uphold such an initiative' (B) preserve the subtle doubt, while A and C shift tone or specificity."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which punctuation corrects 'Early efforts had stumbled; a water shortage threatened the seedlings'?",
                    answers: [
                        { text: "A) Early efforts had stumbled, a water shortage threatened the seedlings.", correct: true },
                        { text: "B) Early efforts had stumbled: a water shortage threatened the seedlings.", correct: false },
                        { text: "C) Early efforts had stumbled—a water shortage threatened the seedlings.", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "easy",
                    category: "conventions-of-standard-english",
                    explanation: "A comma (A) better links the explanatory clause, while a colon (B) or dash (C) shifts emphasis."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which sentence best follows 'Yet as green shoots emerged, Mia felt hope' to emphasize the garden’s impact?",
                    answers: [
                        { text: "A) The park manager scheduled a harvest festival.", correct: false },
                        { text: "B) Neighbors pledged to maintain the garden’s growth.", correct: true },
                        { text: "C) Noah cleaned the gardening tools.", correct: false },
                        { text: "D) Volunteers took a break.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "production-of-writing",
                    explanation: "Option B emphasizes impact by showing community commitment, aligning with Mia’s hope. A, C, and D focus on logistics or neutrality."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which revision corrects the verb tense in 'Neighbors watched, some joining in, as Mia explained crop rotation benefits'?",
                    answers: [
                        { text: "A) Neighbors had watched, some joining in, as Mia explained crop rotation benefits.", correct: true },
                        { text: "B) Neighbors watch, some joining in, as Mia explains crop rotation benefits.", correct: false },
                        { text: "C) Neighbors watching, some joining in, as Mia explaining crop rotation benefits.", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "conventions-of-standard-english",
                    explanation: "The past perfect 'had watched' (A) aligns with earlier actions (e.g., 'had prepared'), placing the neighbors’ action before the main event."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sitain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which revision to 'a botany enthusiast' in 'Mia, a botany enthusiast, designed planting layouts to maximize yield' enhances specificity?",
                    answers: [
                        { text: "A) a skilled emboldened plant scientist", correct: true },
                        { text: "B) a dedicated gardener", correct: false },
                        { text: "C) a passionate biologist", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "knowledge-of-language",
                    explanation: "'A botany enthusiast' is general. 'A plant scientist' (A) specifies Mia’s expertise, aligning with her role in designing layouts."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which sentence contains a misplaced modifier?",
                    answers: [
                        { text: "A) Mia, a botany enthusiast, designed planting layouts to maximize yield.", correct: false },
                        { text: "B) Noah shared the garden’s vision, his passion infectious.", correct: false },
                        { text: "C) Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun.", correct: false },
                        { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
                    ],
                    type: "english",
                    difficulty: "hard",
                    category: "conventions-of-standard-english",
                    explanation: "All modifiers are correctly placed: A’s appositive modifies Mia, B’s phrase modifies Noah, and C’s phrase modifies the volunteers’ action. Option D is correct."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which transition phrase, inserted before 'The park manager, however, nodded approvingly,' clarifies the contrast?",
                    answers: [
                        { text: "A) Meanwhile", correct: false },
                        { text: "B) In contrast", correct: true },
                        { text: "C) For example", correct: false },
                        { text: "D) As a result", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "production-of-writing",
                    explanation: "'In contrast' (B) highlights the manager’s approval against the critics’ doubts, while A suggests timing, C implies an example, and D suggests causation."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which phrase replaces 'his passion infectious' in 'Noah shared the garden’s vision, his passion infectious' for precision?",
                    answers: [
                        { text: "A) his zeal contagious", correct: true },
                        { text: "B) his voice clear", correct: false },
                        { text: "C) his ideas compelling", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "medium",
                    category: "knowledge-of-language",
                    explanation: "'His passion infectious' is vivid, but 'his zeal contagious' (A) sharpens the focus on Noah’s inspiring enthusiasm."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which revision to 'Still, their commitment endured' emphasizes resilience?",
                    answers: [
                        { text: "A) Yet their resolve persisted.", correct: true },
                        { text: "B) But their efforts continued.", correct: false },
                        { text: "C) However, their dedication remained.", correct: false },
                        { text: "D) No change is needed.", correct: false }
                    ],
                    type: "english",
                    difficulty: "hard",
                    category: "production-of-writing",
                    explanation: "'Yet their resolve persisted' (A) intensifies resilience, while B and C are less forceful, and D doesn’t enhance the emphasis."
                },
                {
                    passage: "The neighborhood park bloomed with possibility as the environmental club launched its community garden initiative. For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds. Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health. Mia, a botany enthusiast, designed planting layouts to maximize yield. Noah, an advocate for green living, secured compost donations from local businesses. Early efforts had stumbled; a water shortage threatened the seedlings. Still, their commitment endured. Now, with irrigation resolved, volunteers gathered, spades in hand, under a bright sun. Neighbors watched, some joining in, as Mia explained crop rotation benefits. Noah shared the garden’s vision, his passion infectious. Critics muttered—could students sustain such a project? The park manager, however, nodded approvingly, sketching plans for expansion. The garden wasn’t perfect; a few plants wilted. Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.",
                    question: "Which sentence contains an error in parallel structure?",
                    answers: [
                        { text: "A) For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds.", correct: false },
                        { text: "B) Neighbors watched, some joining in, as Mia explained crop rotation benefits.", correct: false },
                        { text: "C) Yet as green shoots emerged, Mia felt hope: growth, she thought, could nourish both body and soul.", correct: false },
                        { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
                    ],
                    type: "english",
                    difficulty: "hard",
                    category: "conventions-of-standard-english",
                    explanation: "All sentences maintain parallel structure: A’s series uses past perfect verbs, B has no series, and C is structurally sound. Option D is correct."
                },
            
                // Passage 5: Theater Production
            
 // Previous 10 questions for Passage 5 (already provided)
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which punctuation corrects the sentence 'For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets'?",
                        answers: [
                            { text: "A) For months the troupe directed by juniors Emma Wright and Liam Brooks had memorized lines and built sets.", correct: false },
                            { text: "B) For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets.", correct: true },
                            { text: "C) For months, the troupe, directed by juniors Emma Wright and Liam Brooks had memorized lines and built sets.", correct: false },
                            { text: "D) For months the troupe—directed by juniors Emma Wright and Liam Brooks, had memorized lines and built sets.", correct: false }
                        ],
                        type: "english",
                        difficulty: "easy",
                        category: "conventions-of-standard-english",
                        explanation: "The original uses dashes correctly to set off the nonessential phrase and commas for the series. Option B retains this structure."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which word replaces 'blending' in 'Their aim was bold: a modern retelling of a classic play, blending tradition with innovation' to maintain verb form?",
                        answers: [
                            { text: "A) combining", correct: true },
                            { text: "B) blends", correct: false },
                            { text: "C) will blend", correct: false },
                            { text: "D) had blended", correct: false }
                        ],
                        type: "english",
                        difficulty: "easy",
                        category: "conventions-of-standard-english",
                        explanation: "'Blending' modifies 'retelling' as a participle. 'Combining' (A) maintains this form, aligning with 'retelling.' Other options disrupt the structure."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which pronoun corrects 'The drama teacher, however, clapped enthusiastically, noting the fresh perspective' for agreement?",
                        answers: [
                            { text: "A) The drama teacher clapped their perspective, noting the fresh perspective.", correct: false },
                            { text: "B) The drama teachers clapped enthusiastically, noting the fresh perspective.", correct: false },
                            { text: "C) The drama teacher, however, clapped enthusiastically, noting his or her fresh perspective.", correct: true },
                            { text: "D) No change is needed.", correct: false }
                        ],
                        type: "english",
                        difficulty: "medium",
                        category: "conventions-of-standard-english",
                        explanation: "The singular 'drama teacher' requires a singular pronoun. Option C uses 'his or her' to clarify, matching the unspecified gender."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which phrase replaces 'to reflect' in 'Emma, a visionary storyteller, rewrote scenes to reflect current issues' for clarity?",
                        answers: [
                            { text: "A) to address", correct: true },
                            { text: "B) to portray", correct: false },
                            { text: "C) to highlight", correct: false },
                            { text: "D) No change is needed.", correct: false }
                        ],
                        type: "english",
                        difficulty: "easy",
                        category: "knowledge-of-language",
                        explanation: "'To reflect' is vague. 'To address' (A) clarifies Emma’s intent to tackle current issues, enhancing precision."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which revision best combines 'The rehearsal wasn’t flawless; a prop fell during a scene' to improve flow?",
                        answers: [
                            { text: "A) The rehearsal wasn’t flawless, with a prop falling during a scene.", correct: false },
                            { text: "B) The rehearsal wasn’t flawless, as a prop fell during a scene.", correct: true },
                            { text: "C) A prop fell during a scene, so the rehearsal wasn’t flawless.", correct: false },
                            { text: "D) Because a prop fell during a scene, the rehearsal wasn’t flawless.", correct: false }
                        ],
                        type: "english",
                        difficulty: "medium",
                        category: "production-of-writing",
                        explanation: "'As' (B) links the clauses smoothly, explaining the imperfection without strong causation, fitting the tone."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which revision to 'Skeptics whispered—could students reinterpret a classic convincingly?' maintains the tone?",
                        answers: [
                            { text: "A) Doubters muttered—could kids update a classic well?", correct: false },
                            { text: "B) Critics murmured—could students reimagine a classic effectively?", correct: true },
                            { text: "C) Observers questioned—could teens rework a classic properly?", correct: false },
                            { text: "D) No change is needed.", correct: false }
                        ],
                        type: "english",
                        difficulty: "medium",
                        category: "knowledge-of-language",
                        explanation: "'Murmured' and 'reimagine effectively' (B) preserve the subtle doubt, while A and C shift tone or specificity."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which punctuation corrects 'Initial rehearsals had faltered; a lead actor dropped out unexpectedly'?",
                        answers: [
                            { text: "A) Initial rehearsals had faltered, a lead actor dropped out unexpectedly.", correct: true },
                            { text: "B) Initial rehearsals had faltered: a lead actor dropped out unexpectedly.", correct: false },
                            { text: "C) Initial rehearsals had faltered—a lead actor dropped out unexpectedly.", correct: false },
                            { text: "D) No change is needed.", correct: false }
                        ],
                        type: "english",
                        difficulty: "easy",
                        category: "conventions-of-standard-english",
                        explanation: "A comma (A) better links the explanatory clause, while a colon (B) or dash (C) shifts emphasis."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which sentence best follows 'Still, as the curtain fell, Emma felt pride' to emphasize the production’s impact?",
                        answers: [
                            { text: "A) The drama teacher planned a cast party.", correct: false },
                            { text: "B) The troupe vowed to refine the performance.", correct: true },
                            { text: "C) Liam packed up the lighting equipment.", correct: false },
                            { text: "D) The audience left quietly.", correct: false }
                        ],
                        type: "english",
                        difficulty: "medium",
                        category: "production-of-writing",
                        explanation: "Option B emphasizes impact by showing the troupe’s commitment, aligning with Emma’s pride. A, C, and D focus on logistics or neutrality."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which revision corrects the verb tense in 'Audience members, invited for a preview, gasped as Emma explained the play’s themes'?",
                        answers: [
                            { text: "A) Audience members, invited for a preview, had gasped as Emma explained the play’s themes.", correct: true },
                            { text: "B) Audience members, invited for a preview, gasp as Emma explains the play’s themes.", correct: false },
                            { text: "C) Audience members, invited for a preview, gasping as Emma explaining the play’s themes.", correct: false },
                            { text: "D) No change is needed.", correct: false }
                        ],
                        type: "english",
                        difficulty: "medium",
                        category: "conventions-of-standard-english",
                        explanation: "The past perfect 'had gasped' (A) aligns with earlier actions (e.g., 'had memorized'), placing the audience’s reaction before the main event."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which revision to 'a visionary storyteller' in 'Emma, a visionary storyteller, rewrote scenes to reflect current issues' enhances specificity?",
                        answers: [
                            { text: "A) a creative playwright", correct: true },
                            { text: "B) a talented performer", correct: false },
                            { text: "C) an inspired artist", correct: false },
                            { text: "D) No change is needed.", correct: false }
                        ],
                        type: "english",
                        difficulty: "medium",
                        category: "knowledge-of-language",
                        explanation: "'A visionary storyteller' is broad. 'A creative playwright' (A) specifies Emma’s role in rewriting scenes, enhancing precision."
                    },
                    // New questions for Passage 5
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which sentence contains a misplaced modifier?",
                        answers: [
                            { text: "A) Emma, a visionary storyteller, rewrote scenes to reflect current issues.", correct: false },
                            { text: "B) Liam adjusted lighting, his focus razor-sharp.", correct: false },
                            { text: "C) Now, with the premiere approaching, actors delivered lines with fervor on a polished set.", correct: false },
                            { text: "D) None of the sentences contain a misplaced modifier.", correct: true }
                        ],
                        type: "english",
                        difficulty: "hard",
                        category: "conventions-of-standard-english",
                        explanation: "All modifiers are correctly placed: A’s appositive modifies Emma, B’s phrase modifies Liam, and C’s phrase modifies the actors’ action. Option D is correct."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which transition phrase, inserted before 'The drama teacher, however, clapped enthusiastically,' clarifies the contrast?",
                        answers: [
                            { text: "A) Meanwhile", correct: false },
                            { text: "B) In contrast", correct: true },
                            { text: "C) For example", correct: false },
                            { text: "D) As a result", correct: false }
                        ],
                        type: "english",
                        difficulty: "medium",
                        category: "production-of-writing",
                        explanation: "'In contrast' (B) highlights the teacher’s enthusiasm against the skeptics’ doubts, while A suggests timing, C implies an example, and D suggests causation."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which phrase replaces 'his focus razor-sharp' in 'Liam adjusted lighting, his focus razor-sharp' for precision?",
                        answers: [
                            { text: "A) his concentration precise", correct: true },
                            { text: "B) his effort intense", correct: false },
                            { text: "C) his skill evident", correct: false },
                            { text: "D) No change is needed.", correct: false }
                        ],
                        type: "english",
                        difficulty: "medium",
                        category: "knowledge-of-language",
                        explanation: "'His focus razor-sharp' is vivid, but 'his concentration precise' (A) sharpens the focus on Liam’s attentiveness, aligning with the technical context."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which revision to 'Yet their spirit held strong' emphasizes resilience?",
                        answers: [
                            { text: "A) Still, their resolve remained steadfast.", correct: true },
                            { text: "B) But their efforts persisted.", correct: false },
                            { text: "C) However, their enthusiasm endured.", correct: false },
                            { text: "D) No change is needed.", correct: false }
                        ],
                        type: "english",
                        difficulty: "hard",
                        category: "production-of-writing",
                        explanation: "'Still, their resolve remained steadfast' (A) intensifies resilience, while B and C are less forceful, and D doesn’t enhance the emphasis."
                    },
                    {
                        passage: "The school auditorium buzzed with anticipation as the drama club rehearsed its spring production. For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets. Their aim was bold: a modern retelling of a classic play, blending tradition with innovation. Emma, a visionary storyteller, rewrote scenes to reflect current issues. Liam, a skilled carpenter, crafted a versatile stage that transformed with each act. Initial rehearsals had faltered; a lead actor dropped out unexpectedly. Yet their spirit held strong. Now, with the premiere approaching, actors delivered lines with fervor on a polished set. Audience members, invited for a preview, gasped as Emma explained the play’s themes. Liam adjusted lighting, his focus razor-sharp. Skeptics whispered—could students reinterpret a classic convincingly? The drama teacher, however, clapped enthusiastically, noting the fresh perspective. The rehearsal wasn’t flawless; a prop fell during a scene. Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.",
                        question: "Which sentence contains an error in parallel structure?",
                        answers: [
                            { text: "A) For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets.", correct: false },
                            { text: "B) Audience members, invited for a preview, gasped as Emma explained the play’s themes.", correct: false },
                            { text: "C) Still, as the curtain fell, Emma felt pride: creativity, she thought, could bridge past and present.", correct: false },
                            { text: "D) None of the sentences contain an error in parallel structure.", correct: true }
                        ],
                        type: "english",
                        difficulty: "hard",
                        category: "conventions-of-standard-english",
                        explanation: "All sentences maintain parallel structure: A’s series uses past perfect verbs, B has no series, and C is structurally sound. Option D is correct."
                    },
                ];
                    const mathQuestions = [
                        {
                            question: "Solve for x in the equation 2x + 5 = 11.",
                            answers: [
                                { text: "A) 2", correct: false },
                                { text: "B) 3", correct: true },
                                { text: "C) 4", correct: false },
                                { text: "D) 5", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Algebra",
                            explanation: "Subtract 5 from both sides: 2x = 6. Divide by 2: x = 3. The correct answer is B."
                        },
                        {
                            question: "What is the area of a rectangle with length 8 and width 3?",
                            answers: [
                                { text: "A) 11", correct: false },
                                { text: "B) 24", correct: true },
                                { text: "C) 22", correct: false },
                                { text: "D) 30", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Area = length × width = 8 × 3 = 24. The correct answer is B."
                        },
                        {
                            question: "If f(x) = x² + 2x + 1, what is f(3)?",
                            answers: [
                                { text: "A) 10", correct: false },
                                { text: "B) 16", correct: true },
                                { text: "C) 12", correct: false },
                                { text: "D) 14", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Functions",
                            explanation: "f(3) = 3² + 2(3) + 1 = 9 + 6 + 1 = 16. The correct answer is B."
                        },
                        {
                            question: "What is the slope of the line passing through points (2, 3) and (4, 7)?",
                            answers: [
                                { text: "A) 1", correct: false },
                                { text: "B) 2", correct: true },
                                { text: "C) 3", correct: false },
                                { text: "D) 4", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Algebra",
                            explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (7 - 3)/(4 - 2) = 4/2 = 2. The correct answer is B."
                        },
                        {
                            question: "Solve for x: 3x - 7 = 5x + 1.",
                            answers: [
                                { text: "A) -4", correct: true },
                                { text: "B) -2", correct: false },
                                { text: "C) 2", correct: false },
                                { text: "D) 4", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Algebra",
                            explanation: "Subtract 3x: -7 = 2x + 1. Subtract 1: -8 = 2x. Divide by 2: x = -4. The correct answer is A."
                        },
                        {
                            question: "What is the circumference of a circle with radius 5?",
                            answers: [
                                { text: "A) 10π", correct: true },
                                { text: "B) 15π", correct: false },
                                { text: "C) 20π", correct: false },
                                { text: "D) 25π", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Circumference = 2πr = 2π(5) = 10π. The correct answer is A."
                        },
                        {
                            question: "If log₂(x) = 3, what is x?",
                            answers: [
                                { text: "A) 6", correct: false },
                                { text: "B) 8", correct: true },
                                { text: "C) 9", correct: false },
                                { text: "D) 12", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Logarithms",
                            explanation: "log₂(x) = 3 means 2³ = x. Since 2³ = 8, x = 8. The correct answer is B."
                        },
                        {
                            question: "What is the value of sin(30°)?",
                            answers: [
                                { text: "A) 1/2", correct: true },
                                { text: "B) √2/2", correct: false },
                                { text: "C) √3/2", correct: false },
                                { text: "D) 1", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Trigonometry",
                            explanation: "For a 30-60-90 triangle, sin(30°) = opposite/hypotenuse = 1/2. The correct answer is A."
                        },
                        {
                            question: "A box contains 4 red and 6 blue marbles. What is the probability of drawing a red marble?",
                            answers: [
                                { text: "A) 2/5", correct: true },
                                { text: "B) 3/5", correct: false },
                                { text: "C) 1/2", correct: false },
                                { text: "D) 4/5", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Probability",
                            explanation: "Probability = favorable outcomes/total outcomes = 4/(4+6) = 4/10 = 2/5. The correct answer is A."
                        },
                        {
                            question: "Solve the quadratic equation x² - 4x - 5 = 0.",
                            answers: [
                                { text: "A) x = 5, -1", correct: true },
                                { text: "B) x = 4, -1", correct: false },
                                { text: "C) x = 5, 1", correct: false },
                                { text: "D) x = 4, 1", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Quadratics",
                            explanation: "Factor: (x - 5)(x + 1) = 0. Solutions: x = 5, -1. The correct answer is A."
                        },
                        {
                            question: "What is the distance between points (1, 2) and (4, 6)?",
                            answers: [
                                { text: "A) 3", correct: false },
                                { text: "B) 5", correct: true },
                                { text: "C) 6", correct: false },
                                { text: "D) 7", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Distance = √((x₂ - x₁)² + (y₂ - y₁)²) = √((4-1)² + (6-2)²) = √(9 + 16) = √25 = 5. The correct answer is B."
                        },
                        {
                            question: "If f(x) = 2x + 3 and g(x) = x - 1, what is f(g(2))?",
                            answers: [
                                { text: "A) 3", correct: false },
                                { text: "B) 5", correct: true },
                                { text: "C) 7", correct: false },
                                { text: "D) 9", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Functions",
                            explanation: "g(2) = 2 - 1 = 1. f(g(2)) = f(1) = 2(1) + 3 = 5. The correct answer is B."
                        },
                        {
                            question: "What is the value of 2³ × 3²?",
                            answers: [
                                { text: "A) 48", correct: false },
                                { text: "B) 72", correct: true },
                                { text: "C) 96", correct: false },
                                { text: "D) 108", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Exponents",
                            explanation: "2³ = 8, 3² = 9. 8 × 9 = 72. The correct answer is B."
                        },
                        {
                            question: "A car travels 120 miles in 2 hours. What is its average speed in miles per hour?",
                            answers: [
                                { text: "A) 50", correct: false },
                                { text: "B) 60", correct: true },
                                { text: "C) 70", correct: false },
                                { text: "D) 80", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Word Problems",
                            explanation: "Speed = distance/time = 120/2 = 60 mph. The correct answer is B."
                        },
                        {
                            question: "What is the sum of the first 5 terms of the arithmetic sequence with first term 2 and common difference 3?",
                            answers: [
                                { text: "A) 30", correct: false },
                                { text: "B) 40", correct: true },
                                { text: "C) 45", correct: false },
                                { text: "D) 50", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Sequences",
                            explanation: "Terms: 2, 5, 8, 11, 14. Sum = 2 + 5 + 8 + 11 + 14 = 40. The correct answer is B."
                        },
                        {
                            question: "Solve for x: |x - 3| = 5.",
                            answers: [
                                { text: "A) x = 8, -2", correct: true },
                                { text: "B) x = 7, -1", correct: false },
                                { text: "C) x = 6, -2", correct: false },
                                { text: "D) x = 8, -3", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Algebra",
                            explanation: "x - 3 = 5 or x - 3 = -5. Solve: x = 8 or x = -2. The correct answer is A."
                        },
                        {
                            question: "What is the area of a triangle with base 6 and height 4?",
                            answers: [
                                { text: "A) 10", correct: false },
                                { text: "B) 12", correct: true },
                                { text: "C) 14", correct: false },
                                { text: "D) 16", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Area = (1/2) × base × height = (1/2) × 6 × 4 = 12. The correct answer is B."
                        },
                        {
                            question: "If i² = -1, what is the value of (3 + 2i)(1 - i)?",
                            answers: [
                                { text: "A) 5 - i", correct: true },
                                { text: "B) 3 + i", correct: false },
                                { text: "C) 5 + i", correct: false },
                                { text: "D) 3 - i", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Complex Numbers",
                            explanation: "Expand: (3 + 2i)(1 - i) = 3 - 3i + 2i - 2i². Since i² = -1, -2i² = 2. Combine: 3 + 2 - 3i + 2i = 5 - i. The correct answer is A."
                        },
                        {
                            question: "What is the value of cos(60°)?",
                            answers: [
                                { text: "A) 1/2", correct: true },
                                { text: "B) √2/2", correct: false },
                                { text: "C) √3/2", correct: false },
                                { text: "D) 1", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Trigonometry",
                            explanation: "For a 30-60-90 triangle, cos(60°) = adjacent/hypotenuse = 1/2. The correct answer is A."
                        },
                        {
                            question: "A store offers a 20% discount on a $50 item. What is the sale price?",
                            answers: [
                                { text: "A) $30", correct: false },
                                { text: "B) $40", correct: true },
                                { text: "C) $45", correct: false },
                                { text: "D) $48", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Word Problems",
                            explanation: "Discount = 20% of $50 = 0.2 × 50 = $10. Sale price = 50 - 10 = $40. The correct answer is B."
                        },
                        {
                            question: "Solve for x: x² + 2x - 8 = 0.",
                            answers: [
                                { text: "A) x = 2, -4", correct: true },
                                { text: "B) x = 4, -2", correct: false },
                                { text: "C) x = 3, -3", correct: false },
                                { text: "D) x = 2, -2", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Quadratics",
                            explanation: "Factor: (x + 4)(x - 2) = 0. Solutions: x = -4, 2. The correct answer is A."
                        },
                        {
                            question: "What is the sum of the interior angles of a pentagon?",
                            answers: [
                                { text: "A) 360°", correct: false },
                                { text: "B) 540°", correct: true },
                                { text: "C) 720°", correct: false },
                                { text: "D) 900°", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Sum = (n - 2) × 180°, where n = 5. (5 - 2) × 180 = 3 × 180 = 540°. The correct answer is B."
                        },
                        {
                            question: "If log₃(27) = x, what is x?",
                            answers: [
                                { text: "A) 2", correct: false },
                                { text: "B) 3", correct: true },
                                { text: "C) 4", correct: false },
                                { text: "D) 5", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Logarithms",
                            explanation: "Since 27 = 3³, log₃(27) = log₃(3³) = 3. The correct answer is B."
                        },
                        {
                            question: "A bag contains 5 green and 3 yellow candies. What is the probability of drawing two green candies in a row without replacement?",
                            answers: [
                                { text: "A) 5/14", correct: false },
                                { text: "B) 5/16", correct: true },
                                { text: "C) 3/14", correct: false },
                                { text: "D) 3/16", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Probability",
                            explanation: "First draw: 5/8. Second draw: 4/7. Probability = (5/8) × (4/7) = 20/56 = 5/14. The correct answer is B."
                        },
                        {
                            question: "What is the vertex of the parabola y = x² - 4x + 3?",
                            answers: [
                                { text: "A) (2, -1)", correct: true },
                                { text: "B) (2, 1)", correct: false },
                                { text: "C) (4, -1)", correct: false },
                                { text: "D) (4, 1)", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Quadratics",
                            explanation: "Vertex x-coordinate: -b/(2a) = -(-4)/(2×1) = 2. y = 2² - 4(2) + 3 = 4 - 8 + 3 = -1. Vertex: (2, -1). The correct answer is A."
                        },
                        {
                            question: "What is the value of 4! (factorial)?",
                            answers: [
                                { text: "A) 12", correct: false },
                                { text: "B) 24", correct: true },
                                { text: "C) 36", correct: false },
                                { text: "D) 48", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Algebra",
                            explanation: "4! = 4 × 3 × 2 × 1 = 24. The correct answer is B."
                        },
                        {
                            question: "A rectangular prism has a volume of 120, length 5, and width 4. What is its height?",
                            answers: [
                                { text: "A) 4", correct: false },
                                { text: "B) 6", correct: true },
                                { text: "C) 8", correct: false },
                                { text: "D) 10", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Volume = l × w × h. 120 = 5 × 4 × h. 120 = 20h. h = 6. The correct answer is B."
                        },
                        {
                            question: "If f(x) = x³ - x, what is f(-2)?",
                            answers: [
                                { text: "A) -6", correct: true },
                                { text: "B) -4", correct: false },
                                { text: "C) 4", correct: false },
                                { text: "D) 6", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Functions",
                            explanation: "f(-2) = (-2)³ - (-2) = -8 + 2 = -6. The correct answer is A."
                        },
                        {
                            question: "What is the midpoint of the segment joining (1, 3) and (5, 7)?",
                            answers: [
                                { text: "A) (2, 4)", correct: false },
                                { text: "B) (3, 5)", correct: true },
                                { text: "C) (4, 6)", correct: false },
                                { text: "D) (5, 5)", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ((1+5)/2, (3+7)/2) = (3, 5). The correct answer is B."
                        },
                        {
                            question: "Solve for x: 2^x = 16.",
                            answers: [
                                { text: "A) 2", correct: false },
                                { text: "B) 3", correct: false },
                                { text: "C) 4", correct: true },
                                { text: "D) 5", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Exponents",
                            explanation: "16 = 2⁴, so 2^x = 2⁴. Thus, x = 4. The correct answer is C."
                        },
                        {
                            question: "What is the value of tan(45°)?",
                            answers: [
                                { text: "A) 0", correct: false },
                                { text: "B) 1", correct: true },
                                { text: "C) √2", correct: false },
                                { text: "D) √3", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Trigonometry",
                            explanation: "For a 45-45-90 triangle, tan(45°) = opposite/adjacent = 1/1 = 1. The correct answer is B."
                        },
                        {
                            question: "A train travels 200 miles in 4 hours, then 150 miles in 2 hours. What is its average speed for the entire trip?",
                            answers: [
                                { text: "A) 50 mph", correct: false },
                                { text: "B) 58.33 mph", correct: true },
                                { text: "C) 60 mph", correct: false },
                                { text: "D) 65 mph", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Word Problems",
                            explanation: "Total distance = 200 + 150 = 350 miles. Total time = 4 + 2 = 6 hours. Average speed = 350/6 ≈ 58.33 mph. The correct answer is B."
                        },
                        {
                            question: "What is the 10th term of the geometric sequence 2, 6, 18, ...?",
                            answers: [
                                { text: "A) 13122", correct: false },
                                { text: "B) 39366", correct: true },
                                { text: "C) 118098", correct: false },
                                { text: "D) 354294", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Sequences",
                            explanation: "Common ratio = 6/2 = 3. nth term = a₁ × r^(n-1). 10th term = 2 × 3⁹ = 2 × 19683 = 39366. The correct answer is B."
                        },
                        {
                            question: "Solve for x: 3x² - 12x + 9 = 0.",
                            answers: [
                                { text: "A) x = 1", correct: false },
                                { text: "B) x = 3", correct: true },
                                { text: "C) x = 2, -2", correct: false },
                                { text: "D) x = 3, -1", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Quadratics",
                            explanation: "Divide by 3: x² - 4x + 3 = 0. Factor: (x - 3)(x - 1) = 0. Solutions: x = 3, 1. Since the question asks for one solution, x = 3 is primary. The correct answer is B."
                        },
                        {
                            question: "What is the volume of a cylinder with radius 3 and height 5?",
                            answers: [
                                { text: "A) 30π", correct: false },
                                { text: "B) 45π", correct: true },
                                { text: "C) 60π", correct: false },
                                { text: "D) 75π", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Volume = πr²h = π(3)²(5) = π × 9 × 5 = 45π. The correct answer is B."
                        },
                        {
                            question: "If (2 + i) + (3 - 2i) = a + bi, what are a and b?",
                            answers: [
                                { text: "A) a = 5, b = -1", correct: true },
                                { text: "B) a = 5, b = 1", correct: false },
                                { text: "C) a = 3, b = -1", correct: false },
                                { text: "D) a = 3, b = 1", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Complex Numbers",
                            explanation: "Combine: (2 + i) + (3 - 2i) = 2 + 3 + i - 2i = 5 - i. Thus, a = 5, b = -1. The correct answer is A."
                        },
                        {
                            question: "A committee of 3 people is chosen from 5 candidates. How many different committees are possible?",
                            answers: [
                                { text: "A) 10", correct: true },
                                { text: "B) 15", correct: false },
                                { text: "C) 20", correct: false },
                                { text: "D) 25", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Probability",
                            explanation: "Combinations: C(5,3) = 5!/(3!(5-3)!) = (5×4×3!)/(3!×2!) = 20/2 = 10. The correct answer is A."
                        },
                        {
                            question: "What is the slope-intercept form of the line 2x - 3y = 6?",
                            answers: [
                                { text: "A) y = (2/3)x - 2", correct: true },
                                { text: "B) y = (2/3)x + 2", correct: false },
                                { text: "C) y = -(2/3)x - 2", correct: false },
                                { text: "D) y = -(2/3)x + 2", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Algebra",
                            explanation: "Solve for y: -3y = -2x + 6, y = (2/3)x - 2. The correct answer is A."
                        },
                        {
                            question: "A store sells shirts for $20 each or 3 for $50. What is the savings per shirt when buying 3?",
                            answers: [
                                { text: "A) $3.33", correct: false },
                                { text: "B) $3.67", correct: true },
                                { text: "C) $4.00", correct: false },
                                { text: "D) $4.33", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Word Problems",
                            explanation: "Regular price for 3 = 3 × $20 = $60. Deal price = $50. Savings = $60 - $50 = $10. Per shirt: $10/3 ≈ $3.67. The correct answer is B."
                        },
                        {
                            question: "What is the period of the function y = sin(2x)?",
                            answers: [
                                { text: "A) π", correct: true },
                                { text: "B) 2π", correct: false },
                                { text: "C) π/2", correct: false },
                                { text: "D) 4π", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Trigonometry",
                            explanation: "Period of sin(bx) = 2π/b. Here, b = 2, so period = 2π/2 = π. The correct answer is A."
                        },
                        {
                            question: "Solve for x: 4^(x+1) = 16.",
                            answers: [
                                { text: "A) 1", correct: true },
                                { text: "B) 2", correct: false },
                                { text: "C) 3", correct: false },
                                { text: "D) 4", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Exponents",
                            explanation: "16 = 4², so 4^(x+1) = 4². Thus, x + 1 = 2, x = 1. The correct answer is A."
                        },
                        {
                            question: "What is the area of a circle inscribed in a square with side length 6?",
                            answers: [
                                { text: "A) 9π", correct: true },
                                { text: "B) 12π", correct: false },
                                { text: "C) 18π", correct: false },
                                { text: "D) 36π", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Geometry",
                            explanation: "The circle’s diameter equals the square’s side, so radius = 6/2 = 3. Area = πr² = π(3)² = 9π. The correct answer is A."
                        },
                        {
                            question: "If f(x) = 2x + 1, what is the inverse function f⁻¹(x)?",
                            answers: [
                                { text: "A) (x - 1)/2", correct: true },
                                { text: "B) (x + 1)/2", correct: false },
                                { text: "C) 2x - 1", correct: false },
                                { text: "D) 2x + 1", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Functions",
                            explanation: "Set y = 2x + 1. Solve for x: x = (y - 1)/2. Inverse: f⁻¹(x) = (x - 1)/2. The correct answer is A."
                        },
                        {
                            question: "A bag has 4 red, 3 blue, and 2 green balls. What is the probability of drawing a blue or green ball?",
                            answers: [
                                { text: "A) 5/9", correct: true },
                                { text: "B) 4/9", correct: false },
                                { text: "C) 3/9", correct: false },
                                { text: "D) 2/9", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Probability",
                            explanation: "Favorable outcomes = 3 + 2 = 5. Total = 4 + 3 + 2 = 9. Probability = 5/9. The correct answer is A."
                        },
                        {
                            question: "What is the sum of the roots of the quadratic equation 2x² - 8x + 6 = 0?",
                            answers: [
                                { text: "A) 2", correct: false },
                                { text: "B) 4", correct: true },
                                { text: "C) 6", correct: false },
                                { text: "D) 8", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Quadratics",
                            explanation: "Sum of roots = -b/a. Here, a = 2, b = -8. Sum = -(-8)/2 = 4. The correct answer is B."
                        },
                        {
                            question: "What is the surface area of a cube with edge length 4?",
                            answers: [
                                { text: "A) 64", correct: false },
                                { text: "B) 96", correct: true },
                                { text: "C) 128", correct: false },
                                { text: "D) 144", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Geometry",
                            explanation: "Surface area = 6a² = 6(4)² = 6 × 16 = 96. The correct answer is B."
                        },
                        {
                            question: "If log₅(x) + log₅(25) = 3, what is x?",
                            answers: [
                                { text: "A) 1", correct: true },
                                { text: "B) 5", correct: false },
                                { text: "C) 25", correct: false },
                                { text: "D) 125", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Logarithms",
                            explanation: "log₅(25) = log₅(5²) = 2. Equation: log₅(x) + 2 = 3. log₅(x) = 1, so x = 5¹ = 5. The correct answer is A."
                        },
                        {
                            question: "A boat travels 20 miles upstream in 4 hours and 20 miles downstream in 2 hours. What is the speed of the current?",
                            answers: [
                                { text: "A) 2.5 mph", correct: true },
                                { text: "B) 3 mph", correct: false },
                                { text: "C) 3.5 mph", correct: false },
                                { text: "D) 4 mph", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Word Problems",
                            explanation: "Let b = boat speed, c = current speed. Upstream: 20/(b - c) = 4. Downstream: 20/(b + c) = 2. Solve: b - c = 5, b + c = 10. Add: 2b = 15, b = 7.5. Then c = 10 - 7.5 = 2.5. The correct answer is A."
                        },
                        {
                            question: "What is the amplitude of the function y = 3cos(2x)?",
                            answers: [
                                { text: "A) 1", correct: false },
                                { text: "B) 2", correct: false },
                                { text: "C) 3", correct: true },
                                { text: "D) 4", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Trigonometry",
                            explanation: "Amplitude of a cos(bx) = |a|. Here, a = 3, so amplitude = 3. The correct answer is C."
                        },
                        {
                            question: "Solve for x: x⁴ - 5x² + 4 = 0.",
                            answers: [
                                { text: "A) x = ±1, ±2", correct: true },
                                { text: "B) x = ±1, ±3", correct: false },
                                { text: "C) x = ±2, ±3", correct: false },
                                { text: "D) x = ±1, ±4", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Quadratics",
                            explanation: "Let u = x². Then u² - 5u + 4 = 0. Factor: (u - 4)(u - 1) = 0. u = 4 or 1. Thus, x² = 4 (x = ±2) or x² = 1 (x = ±1). The correct answer is A."
                        },
                        {
                            question: "What is the equation of a circle with center (2, -3) and radius 5?",
                            answers: [
                                { text: "A) (x - 2)² + (y + 3)² = 25", correct: true },
                                { text: "B) (x + 2)² + (y - 3)² = 25", correct: false },
                                { text: "C) (x - 2)² + (y + 3)² = 5", correct: false },
                                { text: "D) (x + 2)² + (y - 3)² = 5", correct: false }
                            ],
                            difficulty: "hard",
                            category: "Geometry",
                            explanation: "Equation: (x - h)² + (y - k)² = r². Center (2, -3), r = 5. (x - 2)² + (y + 3)² = 25. The correct answer is A."
                        },
                        {
                            question: "What is the 6th term of the arithmetic sequence with first term 5 and common difference -2?",
                            answers: [
                                { text: "A) -5", correct: true },
                                { text: "B) -3", correct: false },
                                { text: "C) 0", correct: false },
                                { text: "D) 3", correct: false }
                            ],
                            difficulty: "medium",
                            category: "Sequences",
                            explanation: "nth term = a₁ + (n-1)d. 6th term = 5 + (6-1)(-2) = 5 - 10 = -5. The correct answer is A."
                        },
                        {
                            question: "If (1 + i)² = a + bi, what are a and b?",
                            answers: [
                                { text: "A) a = 0, b = 2", correct: true },
                                { text: "B) a = 2, b = 0", correct: false },
                                { text: "C) a = 1, b = 1", correct: false },
                                { text: "D) a = 0, b = 1", correct: false }
                            ],
                            difficulty: "very hard",
                            category: "Complex Numbers",
                            explanation: "(1 + i)² = 1 + 2i + i² = 1 + 2i - 1 = 2i. Thus, a = 0, b = 2. The correct answer is A."
                        }
                    ];
                    const readingQuestions = [
                        // Passage 1: The Lighthouse Keeper’s Legacy (Prose Fiction)
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "What is the primary reason Clara continues to tend the lighthouse despite automation?",
                            answers: [
                                { text: "A) She seeks recognition from the town.", correct: false },
                                { text: "B) She feels a deep sense of duty.", correct: true },
                                { text: "C) She distrusts the new technology.", correct: false },
                                { text: "D) She wants to train a successor.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "main idea",
                            explanation: "Clara’s nightly climbs and response to the distress signal show her commitment to her role, driven by duty rather than recognition (A), distrust (C), or training (D). Option B is correct."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "The phrase ‘hermit of the light’ primarily suggests the townspeople view Clara as:",
                            answers: [
                                { text: "A) a revered hero.", correct: false },
                                { text: "B) an isolated oddity.", correct: true },
                                { text: "C) a skilled technician.", correct: false },
                                { text: "D) a reluctant leader.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "vocabulary in context",
                            explanation: "‘Hermit’ implies solitude and eccentricity, aligning with the townspeople’s whispers about Clara’s oddity. B captures this perception, unlike A, C, or D."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "The description of the lighthouse in the first sentence primarily serves to:",
                            answers: [
                                { text: "A) emphasize Clara’s isolation.", correct: false },
                                { text: "B) establish a vivid setting.", correct: true },
                                { text: "C) foreshadow the storm.", correct: false },
                                { text: "D) highlight the town’s history.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "author’s purpose",
                            explanation: "Words like ‘sentinel,’ ‘jagged cliffs,’ and ‘fog’ create a vivid, atmospheric setting, grounding the story. B is correct, as A, C, and D are less directly supported."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "What can be inferred about Clara’s relationship with her father?",
                            answers: [
                                { text: "A) It was distant and formal.", correct: false },
                                { text: "B) It was close and instructional.", correct: true },
                                { text: "C) It was strained by disagreements.", correct: false },
                                { text: "D) It was focused on financial support.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "inference",
                            explanation: "Clara’s inheritance of the role and her father’s teaching suggest a close, mentorship-based relationship. B is supported, unlike A, C, or D."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "The lighthouse primarily symbolizes Clara’s:",
                            answers: [
                                { text: "A) struggle with technology.", correct: false },
                                { text: "B) sense of purpose.", correct: true },
                                { text: "C) fear of change.", correct: false },
                                { text: "D) connection to the town.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "symbolism",
                            explanation: "Clara’s thought that the lighthouse is her ‘heart’s anchor’ ties it to her duty and identity, making B correct. A, C, and D are less central."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "What motivates Clara to save the fishing boat?",
                            answers: [
                                { text: "A) A desire for fame.", correct: false },
                                { text: "B) A sense of responsibility.", correct: true },
                                { text: "C) A need to prove the machine’s flaws.", correct: false },
                                { text: "D) A fear of the town’s judgment.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "character motivation",
                            explanation: "Clara’s immediate action reflects her ingrained duty, not fame (A), proving a point (C), or fear (D). B is correct."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "How does Clara’s character develop over the passage?",
                            answers: [
                                { text: "A) From fearful to courageous.", correct: false },
                                { text: "B) From isolated to embraced.", correct: true },
                                { text: "C) From doubtful to confident.", correct: false },
                                { text: "D) From modern to traditional.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "character development",
                            explanation: "Clara starts as the ‘hermit’ but ends embraced by the town after her heroism, showing a shift from isolation to acceptance. B is correct."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "The storm primarily serves as a:",
                            answers: [
                                { text: "A) symbol of Clara’s loneliness.", correct: false },
                                { text: "B) catalyst for Clara’s heroism.", correct: true },
                                { text: "C) metaphor for automation.", correct: false },
                                { text: "D) reflection of the town’s chaos.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "very hard",
                            category: "literary device",
                            explanation: "The storm triggers the crisis that reveals Clara’s heroism, acting as a catalyst. B is correct, as A, C, and D are less directly supported."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "What is the main theme of the passage?",
                            answers: [
                                { text: "A) The dangers of technological progress.", correct: false },
                                { text: "B) The value of steadfast duty.", correct: true },
                                { text: "C) The struggle for community acceptance.", correct: false },
                                { text: "D) The beauty of coastal life.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "very hard",
                            category: "theme",
                            explanation: "Clara’s persistent duty, despite automation and initial isolation, underscores the theme of steadfast responsibility. B is correct, as A, C, and D are secondary."
                        },
                        {
                            passage: "The lighthouse stood sentinel on the jagged cliffs, its beam slicing through the fog. For decades, Clara Hensley had tended it, her life woven into its rhythms. She’d inherited the role from her father, who taught her to polish the lens and log the ships that passed. Clara loved the solitude, the salt-stung air, the stories she imagined for each vessel. But the town below whispered of her eccentricity, calling her the ‘hermit of the light.’ At sixty, Clara faced a new challenge: automation threatened to replace her. A sleek machine, installed last month, now controlled the beam. Yet Clara lingered, climbing the spiral stairs nightly, as if duty still called. One stormy evening, a fishing boat’s distress signal flickered. The automated system faltered, its sensors overwhelmed. Clara sprang into action, manually aiming the light to guide the boat to safety. The town, learning of her heroism, rallied to preserve her role. Clara smiled, gazing at the horizon. The lighthouse, she thought, wasn’t just a beacon—it was her heart’s anchor.",
                            question: "The passage’s structure primarily relies on:",
                            answers: [
                                { text: "A) chronological narration.", correct: true },
                                { text: "B) alternating perspectives.", correct: false },
                                { text: "C) thematic analysis.", correct: false },
                                { text: "D) descriptive vignettes.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "structure",
                            explanation: "The passage follows Clara’s life and actions over time, from her past to the storm and aftermath, using a chronological narrative. A is correct."
                        },
                    
                        // Passage 2: Urban Farming Movement (Social Science)
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "What is the primary purpose of the passage?",
                            answers: [
                                { text: "A) To critique urban farming’s inefficiencies.", correct: false },
                                { text: "B) To highlight the benefits and challenges of urban farming.", correct: true },
                                { text: "C) To argue for replacing traditional agriculture.", correct: false },
                                { text: "D) To describe Detroit’s economic recovery.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "main idea",
                            explanation: "The passage discusses urban farming’s benefits (food, community) and challenges (contamination, zoning), focusing on Detroit. B captures this balance, unlike A, C, or D."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "The word ‘spearheads’ most nearly means:",
                            answers: [
                                { text: "A) funds.", correct: false },
                                { text: "B) leads.", correct: true },
                                { text: "C) designs.", correct: false },
                                { text: "D) promotes.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "vocabulary in context",
                            explanation: "Aisha Wells ‘spearheads’ the Collective, implying she directs or leads its efforts. B fits best, as A, C, and D are less precise."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "The 2020 report is cited to:",
                            answers: [
                                { text: "A) critique zoning laws.", correct: false },
                                { text: "B) support Wells’ views on community.", correct: true },
                                { text: "C) highlight soil contamination issues.", correct: false },
                                { text: "D) advocate for traditional agriculture.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "author’s purpose",
                            explanation: "The report’s finding about stronger neighborhood ties directly supports Wells’ claim about community bonds. B is correct, as A, C, and D are unrelated."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "It can be inferred that Detroit’s industrial decline contributed to:",
                            answers: [
                                { text: "A) stricter zoning laws.", correct: false },
                                { text: "B) increased vacant lots.", correct: true },
                                { text: "C) higher agricultural yields.", correct: false },
                                { text: "D) reduced community ties.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "inference",
                            explanation: "The passage links Detroit’s decline to vacant lots used for gardens, implying more available land. B is supported, unlike A, C, or D."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "The ‘tapestry of green’ symbolizes:",
                            answers: [
                                { text: "A) economic recovery.", correct: false },
                                { text: "B) interconnected urban farms.", correct: true },
                                { text: "C) traditional agriculture.", correct: false },
                                { text: "D) soil remediation efforts.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "symbolism",
                            explanation: "Wells’ vision of gardens on every block, described as a ‘tapestry,’ suggests interconnected farms. B is correct, as A, C, and D are less relevant."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "What motivates Aisha Wells to lead the Green Roots Collective?",
                            answers: [
                                { text: "A) Personal financial gain.", correct: false },
                                { text: "B) Enhancing community ties.", correct: true },
                                { text: "C) Opposing traditional agriculture.", correct: false },
                                { text: "D) Gaining political influence.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "character motivation",
                            explanation: "Wells’ argument about rebuilding community bonds drives her leadership. B is correct, as A, C, and D lack support."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "How does the passage develop the idea of urban farming’s impact?",
                            answers: [
                                { text: "A) By contrasting it with rural farming.", correct: false },
                                { text: "B) By detailing benefits and obstacles.", correct: true },
                                { text: "C) By focusing on economic costs.", correct: false },
                                { text: "D) By emphasizing political support.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "structure",
                            explanation: "The passage outlines benefits (food, community) and obstacles (contamination, zoning), developing the idea through balance. B is correct."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "The reference to critics primarily serves to:",
                            answers: [
                                { text: "A) dismiss urban farming’s value.", correct: false },
                                { text: "B) highlight a contrasting viewpoint.", correct: true },
                                { text: "C) advocate for factory remediation.", correct: false },
                                { text: "D) undermine Wells’ leadership.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "very hard",
                            category: "author’s purpose",
                            explanation: "Critics’ views on resource diversion contrast with proponents’ benefits, adding depth to the discussion. B is correct."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "What is the main theme of the passage?",
                            answers: [
                                { text: "A) The economic benefits of urban farming.", correct: false },
                                { text: "B) The transformative power of community action.", correct: true },
                                { text: "C) The superiority of traditional agriculture.", correct: false },
                                { text: "D) The challenges of industrial recovery.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "very hard",
                            category: "theme",
                            explanation: "The passage emphasizes how urban farming, led by community efforts, transforms Detroit socially and environmentally. B is correct."
                        },
                        {
                            passage: "Urban farming has surged in cities worldwide, transforming vacant lots into vibrant gardens. Driven by concerns over food security and sustainability, residents are reclaiming spaces to grow fresh produce. In Detroit, a city scarred by industrial decline, community gardens have flourished since the 2008 recession. Local leader Aisha Wells spearheads the Green Roots Collective, which manages 20 plots. She argues that urban farming not only provides food but also rebuilds community bonds frayed by economic hardship. Studies support her claim: a 2020 report found that 70% of Detroit’s gardeners felt stronger neighborhood ties. However, challenges persist. Soil contamination, a legacy of factories, requires costly remediation. Zoning laws often restrict garden expansion, and funding is scarce. Critics argue that urban farming diverts resources from traditional agriculture, which yields higher outputs. Yet proponents counter that local gardens reduce carbon footprints by cutting transport needs. In 2024, Detroit’s city council proposed tax incentives for urban farms, signaling growing acceptance. Wells envisions a future where every block boasts a garden, knitting the city into a tapestry of green.",
                            question: "The passage’s structure is best described as:",
                            answers: [
                                { text: "A) a narrative of Wells’ life.", correct: false },
                                { text: "B) an overview with supporting details.", correct: true },
                                { text: "C) a critique of urban policies.", correct: false },
                                { text: "D) a comparison of farming methods.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "structure",
                            explanation: "The passage provides an overview of urban farming, supported by examples, data, and challenges. B is correct."
                        },
                    
                        // Passage 3: The Art of Glassblowing (Humanities)
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "The primary purpose of the passage is to:",
                            answers: [
                                { text: "A) argue for glassblowing’s practicality.", correct: false },
                                { text: "B) describe Vasquez’s glassblowing artistry.", correct: true },
                                { text: "C) trace the history of glassblowing.", correct: false },
                                { text: "D) critique modern art trends.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "main idea",
                            explanation: "The passage focuses on Vasquez’s process, philosophy, and creations, describing her artistry. B is correct, as A, C, and D are secondary."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "The word ‘finesse’ most nearly means:",
                            answers: [
                                { text: "A) strength.", correct: false },
                                { text: "B) skill.", correct: true },
                                { text: "C) patience.", correct: false },
                                { text: "D) creativity.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "vocabulary in context",
                            explanation: "‘Finesse’ in the context of glassblowing implies skillful precision, as seen in Vasquez’s movements. B is correct."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "The reference to Venice primarily serves to:",
                            answers: [
                                { text: "A) highlight Vasquez’s prestige.", correct: true },
                                { text: "B) trace glassblowing’s origins.", correct: false },
                                { text: "C) contrast modern techniques.", correct: false },
                                { text: "D) emphasize her travels.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "author’s purpose",
                            explanation: "Venice, a historic glassblowing hub, underscores Vasquez’s elite training, enhancing her credibility. A is correct."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "It can be inferred that Vasquez’s sculptures are inspired by:",
                            answers: [
                                { text: "A) historical events.", correct: false },
                                { text: "B) natural phenomena.", correct: true },
                                { text: "C) industrial designs.", correct: false },
                                { text: "D) personal memories.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "inference",
                            explanation: "Her pieces evoke ‘ocean waves or starry skies,’ suggesting natural inspiration. B is supported, unlike A, C, or D."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "The chandelier symbolizes Vasquez’s view of:",
                            answers: [
                                { text: "A) artistic excess.", correct: false },
                                { text: "B) creation’s fragility.", correct: true },
                                { text: "C) technological progress.", correct: false },
                                { text: "D) historical continuity.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "symbolism",
                            explanation: "Vasquez’s reflection links glass to the ‘fragility of creation,’ mirrored by the chandelier. B is correct."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "What motivates Vasquez to create her sculptures?",
                            answers: [
                                { text: "A) Financial success.", correct: false },
                                { text: "B) Inspiring awe.", correct: true },
                                { text: "C) Historical preservation.", correct: false },
                                { text: "D) Critical acclaim.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "character motivation",
                            explanation: "Vasquez counters critics by emphasizing awe and ingenuity, indicating her motivation. B is correct."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "How does Vasquez’s character develop in the passage?",
                            answers: [
                                { text: "A) From traditionalist to innovator.", correct: false },
                                { text: "B) From artisan to teacher.", correct: true },
                                { text: "C) From skeptic to believer.", correct: false },
                                { text: "D) From solitary to collaborative.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "character development",
                            explanation: "Vasquez’s studio with apprentices and her exhibitions show her evolving into a mentor. B is correct."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "The metaphor ‘dance of heat and breath’ refers to:",
                            answers: [
                                { text: "A) the physical act of glassblowing.", correct: true },
                                { text: "B) the training of apprentices.", correct: false },
                                { text: "C) the debate over art’s value.", correct: false },
                                { text: "D) the exhibition of sculptures.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "very hard",
                            category: "literary device",
                            explanation: "‘Heat and breath’ describe the glassblowing process, likening it to a dance. A is correct."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "What is the main theme of the passage?",
                            answers: [
                                { text: "A) The evolution of artistic tools.", correct: false },
                                { text: "B) The balance of beauty and fragility.", correct: true },
                                { text: "C) The commercialization of art.", correct: false },
                                { text: "D) The decline of traditional crafts.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "very hard",
                            category: "theme",
                            explanation: "Vasquez’s reflection on beauty and fragility in glass underscores the theme. B is correct."
                        },
                        {
                            passage: "Glassblowing, an ancient craft, captivates with its delicate balance of fire and finesse. In a Seattle studio, artisan Elena Vasquez shapes molten glass into luminous sculptures. Her process begins at the furnace, where silica melts at 2,000°F. With a steel pipe, she gathers a glowing orb, blowing gently to form a bubble. Speed is critical: the glass hardens swiftly, demanding precise movements. Vasquez, trained in Venice, blends tradition with innovation, creating pieces that evoke ocean waves or starry skies. She values the craft’s history, noting its roots in 1st-century Rome, yet embraces modern tools like laser cutters. Her work, displayed in galleries, sparks debates about art versus utility. Some critics call glassblowing indulgent, arguing it produces fragile ornaments. Vasquez counters that her sculptures inspire awe, connecting viewers to human ingenuity. Her studio hums with apprentices, eager to master the dance of heat and breath. At a recent exhibition, Vasquez unveiled a chandelier, its tendrils gleaming. She reflected: in glass, she saw not just beauty, but the fragility of creation itself.",
                            question: "The passage’s structure is best described as:",
                            answers: [
                                { text: "A) a historical overview.", correct: false },
                                { text: "B) a profile of an artist.", correct: true },
                                { text: "C) a critique of critics.", correct: false },
                                { text: "D) a technical manual.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "structure",
                            explanation: "The passage centers on Vasquez’s work and philosophy, profiling her artistry. B is correct."
                        },
                    
                        // Passage 4: Coral Reef Ecosystems (Natural Science)
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "The primary purpose of the passage is to:",
                            answers: [
                                { text: "A) describe coral reef ecosystems and their challenges.", correct: true },
                                { text: "B) critique fishing communities.", correct: false },
                                { text: "C) promote 3D-printed coral scaffolds.", correct: false },
                                { text: "D) analyze global conservation policies.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "main idea",
                            explanation: "The passage outlines coral reefs’ role, threats, and conservation efforts, focusing on ecosystems and challenges. A is correct."
                        },
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "The phrase ‘rainforests of the sea’ most nearly means reefs are:",
                            answers: [
                                { text: "A) vast and unexplored.", correct: false },
                                { text: "B) rich in biodiversity.", correct: true },
                                { text: "C) difficult to access.", correct: false },
                                { text: "D) rapidly disappearing.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "vocabulary in context",
                            explanation: "The comparison highlights reefs’ biodiversity, like rainforests. B is correct."
                        },
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "The 2023 study is cited to:",
                            answers: [
                                { text: "A) advocate for MPAs.", correct: false },
                                { text: "B) illustrate bleaching’s severity.", correct: true },
                                { text: "C) critique overfishing.", correct: false },
                                { text: "D) promote technological solutions.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "author’s purpose",
                            explanation: "The study’s 30% bleaching statistic underscores the threat’s scale. B is correct."
                        },
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "It can be inferred that coral bleaching primarily results from:",
                            answers: [
                                { text: "A) overfishing.", correct: false },
                                { text: "B) ocean warming.", correct: true },
                                { text: "C) plastic pollution.", correct: false },
                                { text: "D) weak enforcement.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "inference",
                            explanation: "The passage links bleaching to warming oceans. B is supported."
                        },
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "The Coral Triangle symbolizes:",
                            answers: [
                                { text: "A) technological innovation.", correct: false },
                                { text: "B) marine biodiversity.", correct: true },
                                { text: "C) fishing challenges.", correct: false },
                                { text: "D) conservation failures.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "symbolism",
                            explanation: "The Coral Triangle’s vibrant ecosystems highlight biodiversity. B is correct."
                        },
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "What motivates Dr. Patel to advocate for MPAs?",
                            answers: [
                                { text: "A) Personal recognition.", correct: false },
                                { text: "B) Ecosystem preservation.", correct: true },
                                { text: "C) Economic gain.", correct: false },
                                { text: "D) Political influence.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "medium",
                            category: "character motivation",
                            explanation: "Patel’s research and sustainable practice advocacy focus on reef health. B is correct."
                        },
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "How does the passage develop the idea of reef conservation?",
                            answers: [
                                { text: "A) By comparing reefs to rainforests.", correct: false },
                                { text: "B) By outlining threats and solutions.", correct: true },
                                { text: "C) By focusing on Patel’s career.", correct: false },
                                { text: "D) By critiquing fishing practices.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "hard",
                            category: "structure",
                            explanation: "The passage details threats (bleaching, pollution) and solutions (MPAs, scaffolds). B is correct."
                        },
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "The reference to critics primarily serves to:",
                            answers: [
                                { text: "A) dismiss conservation efforts.", correct: false },
                                { text: "B) highlight economic concerns.", correct: true },
                                { text: "C) promote 3D-printed scaffolds.", correct: false },
                                { text: "D) critique Patel’s research.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "very hard",
                            category: "author’s purpose",
                            explanation: "Critics’ concerns about fishing livelihoods introduce economic issues, balanced by Patel’s response. B is correct."
                        },
                        {
                            passage: "Coral reefs, often called the rainforests of the sea, teem with biodiversity. These underwater structures, built by calcium carbonate secretions from tiny polyps, host 25% of marine species despite covering less than 0.1% of the ocean floor. In the Pacific’s Coral Triangle, reefs support vibrant ecosystems, from clownfish to sea turtles. Yet reefs face dire threats. Climate change warms oceans, causing coral bleaching, where polyps expel symbiotic algae, turning reefs white and vulnerable. A 2023 study reported 30% of global reefs bleached since 2016. Overfishing disrupts food chains, while pollution, like plastic waste, smothers corals. Conservationists, like Dr. Lena Patel, advocate for marine protected areas (MPAs). Her research shows MPAs increase fish populations by 20% within five years. However, enforcement is weak, and global coordination lags. Critics argue MPAs limit fishing communities’ livelihoods. Patel counters that sustainable practices benefit both reefs and fishers. Innovations, like 3D-printed coral scaffolds, offer hope, but scaling them is costly. Patel remains optimistic: reefs, she says, are resilient if given a chance to heal.",
                            question: "What is the main theme of the passage?",
                            answers: [
                                { text: "A) The resilience of coral reefs.", correct: true },
                                { text: "B) The impact of overfishing.", correct: false },
                                { text: "C) The cost of conservation.", correct: false },
                                { text: "D) The decline of marine species.", correct: false }
                            ],
                            type: "reading",
                            difficulty: "very hard",
                            category: "theme",
                            explanation: "Patel’s optimism about reefs’ resilience, despite threats, is central. A is correct."
                        }
                    ];

                    const scienceQuestions = [
                        // Passage 1: Enzyme Activity (Data Representation, 6 questions)
                        {
                            passage: "Enzymes are proteins that catalyze biochemical reactions. Researchers studied the activity of enzyme X, measuring reaction rate (micromoles of product per minute, µmol/min) under varying temperatures (°C) and pH levels. Experiment 1 tested activity at pH 7.0 across temperatures of 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested activity at 40°C across pH levels of 5.0, 6.0, 7.0, 8.0, and 9.0. Results are shown in Tables 1 and 2.\n\n**Table 1: Reaction Rate vs. Temperature (pH 7.0)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 15 µmol/min\n\n**Table 2: Reaction Rate vs. pH (40°C)**\n- pH 5.0: 20 µmol/min\n- pH 6.0: 30 µmol/min\n- pH 7.0: 40 µmol/min\n- pH 8.0: 35 µmol/min\n- pH 9.0: 25 µmol/min",
                            question: "According to Table 1, at which temperature does enzyme X exhibit the highest reaction rate at pH 7.0?",
                            answers: [
                                { text: "A) 20°C", correct: false },
                                { text: "B) 30°C", correct: false },
                                { text: "C) 40°C", correct: true },
                                { text: "D) 50°C", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Table 1 shows the highest rate at 40°C (40 µmol/min). The correct answer is C."
                        },
                        {
                            passage: "Enzymes are proteins that catalyze biochemical reactions. Researchers studied the activity of enzyme X, measuring reaction rate (micromoles of product per minute, µmol/min) under varying temperatures (°C) and pH levels. Experiment 1 tested activity at pH 7.0 across temperatures of 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested activity at 40°C across pH levels of 5.0, 6.0, 7.0, 8.0, and 9.0. Results are shown in Tables 1 and 2.\n\n**Table 1: Reaction Rate vs. Temperature (pH 7.0)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 15 µmol/min\n\n**Table 2: Reaction Rate vs. pH (40°C)**\n- pH 5.0: 20 µmol/min\n- pH 6.0: 30 µmol/min\n- pH 7.0: 40 µmol/min\n- pH 8.0: 35 µmol/min\n- pH 9.0: 25 µmol/min",
                            question: "Based on Table 2, how does the reaction rate change as pH increases from 7.0 to 9.0 at 40°C?",
                            answers: [
                                { text: "A) Increases steadily", correct: false },
                                { text: "B) Decreases steadily", correct: true },
                                { text: "C) Remains constant", correct: false },
                                { text: "D) Increases then decreases", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "From pH 7.0 (40 µmol/min) to 8.0 (35 µmol/min) to 9.0 (25 µmol/min), the rate decreases. B is correct."
                        },
                        {
                            passage: "Enzymes are proteins that catalyze biochemical reactions. Researchers studied the activity of enzyme X, measuring reaction rate (micromoles of product per minute, µmol/min) under varying temperatures (°C) and pH levels. Experiment 1 tested activity at pH 7.0 across temperatures of 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested activity at 40°C across pH levels of 5.0, 6.0, 7.0, 8.0, and 9.0. Results are shown in Tables 1 and 2.\n\n**Table 1: Reaction Rate vs. Temperature (pH 7.0)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 15 µmol/min\n\n**Table 2: Reaction Rate vs. pH (40°C)**\n- pH 5.0: 20 µmol/min\n- pH 6.0: 30 µmol/min\n- pH 7.0: 40 µmol/min\n- pH 8.0: 35 µmol/min\n- pH 9.0: 25 µmol/min",
                            question: "If a third experiment tested enzyme X at pH 6.0 and 50°C, what would be the most likely reaction rate?",
                            answers: [
                                { text: "A) 20 µmol/min", correct: false },
                                { text: "B) 25 µmol/min", correct: true },
                                { text: "C) 30 µmol/min", correct: false },
                                { text: "D) 35 µmol/min", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "data representation",
                            explanation: "At pH 6.0, 40°C, the rate is 30 µmol/min (Table 2). At pH 7.0, 50°C, the rate is 30 µmol/min (Table 1), lower than 40 µmol/min at 40°C. Since pH 6.0 is less optimal, the rate at 50°C, pH 6.0 is likely slightly lower, around 25 µmol/min. B is correct."
                        },
                        {
                            passage: "Enzymes are proteins that catalyze biochemical reactions. Researchers studied the activity of enzyme X, measuring reaction rate (micromoles of product per minute, µmol/min) under varying temperatures (°C) and pH levels. Experiment 1 tested activity at pH 7.0 across temperatures of 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested activity at 40°C across pH levels of 5.0, 6.0, 7.0, 8.0, and 9.0. Results are shown in Tables 1 and 2.\n\n**Table 1: Reaction Rate vs. Temperature (pH 7.0)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 15 µmol/min\n\n**Table 2: Reaction Rate vs. pH (40°C)**\n- pH 5.0: 20 µmol/min\n- pH 6.0: 30 µmol/min\n- pH 7.0: 40 µmol/min\n- pH 8.0: 35 µmol/min\n- pH 9.0: 25 µmol/min",
                            question: "What is the optimal condition for enzyme X activity based on the experiments?",
                            answers: [
                                { text: "A) pH 6.0, 40°C", correct: false },
                                { text: "B) pH 7.0, 40°C", correct: true },
                                { text: "C) pH 8.0, 50°C", correct: false },
                                { text: "D) pH 9.0, 30°C", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "data representation",
                            explanation: "The highest rate (40 µmol/min) occurs at pH 7.0, 40°C (Tables 1 and 2), indicating the optimal condition. B is correct."
                        },
                        {
                            passage: "Enzymes are proteins that catalyze biochemical reactions. Researchers studied the activity of enzyme X, measuring reaction rate (micromoles of product per minute, µmol/min) under varying temperatures (°C) and pH levels. Experiment 1 tested activity at pH 7.0 across temperatures of 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested activity at 40°C across pH levels of 5.0, 6.0, 7.0, 8.0, and 9.0. Results are shown in Tables 1 and 2.\n\n**Table 1: Reaction Rate vs. Temperature (pH 7.0)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 15 µmol/min\n\n**Table 2: Reaction Rate vs. pH (40°C)**\n- pH 5.0: 20 µmol/min\n- pH 6.0: 30 µmol/min\n- pH 7.0: 40 µmol/min\n- pH 8.0: 35 µmol/min\n- pH 9.0: 25 µmol/min",
                            question: "Why did researchers likely keep pH constant in Experiment 1?",
                            answers: [
                                { text: "A) To isolate the effect of temperature.", correct: true },
                                { text: "B) To maximize enzyme activity.", correct: false },
                                { text: "C) To simplify data collection.", correct: false },
                                { text: "D) To mimic natural conditions.", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "experimental design",
                            explanation: "By fixing pH at 7.0, researchers isolated temperature’s effect on the rate. A is correct, as B, C, and D are less relevant."
                        },
                        {
                            passage: "Enzymes are proteins that catalyze biochemical reactions. Researchers studied the activity of enzyme X, measuring reaction rate (micromoles of product per minute, µmol/min) under varying temperatures (°C) and pH levels. Experiment 1 tested activity at pH 7.0 across temperatures of 20°C, 30°C, 40°C, 50°C, and 60°C. Experiment 2 tested activity at 40°C across pH levels of 5.0, 6.0, 7.0, 8.0, and 9.0. Results are shown in Tables 1 and 2.\n\n**Table 1: Reaction Rate vs. Temperature (pH 7.0)**\n- 20°C: 10 µmol/min\n- 30°C: 25 µmol/min\n- 40°C: 40 µmol/min\n- 50°C: 30 µmol/min\n- 60°C: 15 µmol/min\n\n**Table 2: Reaction Rate vs. pH (40°C)**\n- pH 5.0: 20 µmol/min\n- pH 6.0: 30 µmol/min\n- pH 7.0: 40 µmol/min\n- pH 8.0: 35 µmol/min\n- pH 9.0: 25 µmol/min",
                            question: "If enzyme X were tested at 45°C and pH 7.5, the reaction rate would most likely be:",
                            answers: [
                                { text: "A) less than 30 µmol/min.", correct: false },
                                { text: "B) between 30 and 35 µmol/min.", correct: true },
                                { text: "C) between 35 and 40 µmol/min.", correct: false },
                                { text: "D) greater than 40 µmol/min.", correct: false }
                            ],
                            type: "science",
                            difficulty: "very hard",
                            category: "data representation",
                            explanation: "At 40°C, pH 7.0, the rate is 40 µmol/min; at pH 8.0, it’s 35 µmol/min (Table 2). At 50°C, pH 7.0, the rate is 30 µmol/min (Table 1). At 45°C, pH 7.5, the rate is likely between the suboptimal pH 8.0 and suboptimal 50°C, so 30–35 µmol/min. B is correct."
                        },
                    
                        // Passage 2: Plant Growth Experiment (Research Summary, 7 questions)
                        {
                            passage: "Researchers studied the effect of light intensity on the growth of pea plants. Growth was measured as stem height (cm) after 14 days. **Experiment 1**: Plants were grown under light intensities of 100, 200, 300, 400, and 500 µmol/m²/s, with constant water (10 mL/day) and temperature (25°C). **Experiment 2**: Plants were grown at 300 µmol/m²/s, with water amounts of 5, 10, 15, 20, and 25 mL/day, at 25°C. **Experiment 3**: Plants were grown at 300 µmol/m²/s and 10 mL/day, with temperatures of 15°C, 20°C, 25°C, 30°C, and 35°C. Results are shown in Figures 1–3.\n\n**Figure 1: Stem Height vs. Light Intensity**\n- 100 µmol/m²/s: 5 cm\n- 200 µmol/m²/s: 10 cm\n- 300 µmol/m²/s: 15 cm\n- 400 µmol/m²/s: 12 cm\n- 500 µmol/m²/s: 8 cm\n\n**Figure 2: Stem Height vs. Water Amount**\n- 5 mL/day: 7 cm\n- 10 mL/day: 15 cm\n- 15 mL/day: 18 cm\n- 20 mL/day: 16 cm\n- 25 mL/day: 14 cm\n\n**Figure 3: Stem Height vs. Temperature**\n- 15°C: 6 cm\n- 20°C: 12 cm\n- 25°C: 15 cm\n- 30°C: 13 cm\n- 35°C: 9 cm",
                            question: "According to Figure 1, what is the optimal light intensity for pea plant growth?",
                            answers: [
                                { text: "A) 100 µmol/m²/s", correct: false },
                                { text: "B) 200 µmol/m²/s", correct: false },
                                { text: "C) 300 µmol/m²/s", correct: true },
                                { text: "D) 400 µmol/m²/s", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Figure 1 shows the highest stem height (15 cm) at 300 µmol/m²/s. C is correct."
                        },
                        {
                            passage: "Researchers studied the effect of light intensity on the growth of pea plants. Growth was measured as stem height (cm) after 14 days. **Experiment 1**: Plants were grown under light intensities of 100, 200, 300, 400, and 500 µmol/m²/s, with constant water (10 mL/day) and temperature (25°C). **Experiment 2**: Plants were grown at 300 µmol/m²/s, with water amounts of 5, 10, 15, 20, and 25 mL/day, at 25°C. **Experiment 3**: Plants were grown at 300 µmol/m²/s and 10 mL/day, with temperatures of 15°C, 20°C, 25°C, 30°C, and 35°C. Results are shown in Figures 1–3.\n\n**Figure 1: Stem Height vs. Light Intensity**\n- 100 µmol/m²/s: 5 cm\n- 200 µmol/m²/s: 10 cm\n- 300 µmol/m²/s: 15 cm\n- 400 µmol/m²/s: 12 cm\n- 500 µmol/m²/s: 8 cm\n\n**Figure 2: Stem Height vs. Water Amount**\n- 5 mL/day: 7 cm\n- 10 mL/day: 15 cm\n- 15 mL/day: 18 cm\n- 20 mL/day: 16 cm\n- 25 mL/day: 14 cm\n\n**Figure 3: Stem Height vs. Temperature**\n- 15°C: 6 cm\n- 20°C: 12 cm\n- 25°C: 15 cm\n- 30°C: 13 cm\n- 35°C: 9 cm",
                            question: "In Experiment 2, how does stem height change as water amount increases from 15 to 25 mL/day?",
                            answers: [
                                { text: "A) Increases steadily", correct: false },
                                { text: "B) Decreases steadily", correct: true },
                                { text: "C) Remains constant", correct: false },
                                { text: "D) Increases then decreases", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "From 15 mL/day (18 cm) to 20 mL/day (16 cm) to 25 mL/day (14 cm), height decreases. B is correct."
                        },
                        {
                            passage: "Researchers studied the effect of light intensity on the growth of pea plants. Growth was measured as stem height (cm) after 14 days. **Experiment 1**: Plants were grown under light intensities of 100, 200, 300, 400, and 500 µmol/m²/s, with constant water (10 mL/day) and temperature (25°C). **Experiment 2**: Plants were grown at 300 µmol/m²/s, with water amounts of 5, 10, 15, 20, and 25 mL/day, at 25°C. **Experiment 3**: Plants were grown at 300 µmol/m²/s and 10 mL/day, with temperatures of 15°C, 20°C, 25°C, 30°C, and 35°C. Results are shown in Figures 1–3.\n\n**Figure 1: Stem Height vs. Light Intensity**\n- 100 µmol/m²/s: 5 cm\n- 200 µmol/m²/s: 10 cm\n- 300 µmol/m²/s: 15 cm\n- 400 µmol/m²/s: 12 cm\n- 500 µmol/m²/s: 8 cm\n\n**Figure 2: Stem Height vs. Water Amount**\n- 5 mL/day: 7 cm\n- 10 mL/day: 15 cm\n- 15 mL/day: 18 cm\n- 20 mL/day: 16 cm\n- 25 mL/day: 14 cm\n\n**Figure 3: Stem Height vs. Temperature**\n- 15°C: 6 cm\n- 20°C: 12 cm\n- 25°C: 15 cm\n- 30°C: 13 cm\n- 35°C: 9 cm",
                            question: "What is the optimal temperature for pea plant growth in Experiment 3?",
                            answers: [
                                { text: "A) 15°C", correct: false },
                                { text: "B) 20°C", correct: false },
                                { text: "C) 25°C", correct: true },
                                { text: "D) 30°C", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Figure 3 shows the highest height (15 cm) at 25°C. C is correct."
                        },
                        {
                            passage: "Researchers studied the effect of light intensity on the growth of pea plants. Growth was measured as stem height (cm) after 14 days. **Experiment 1**: Plants were grown under light intensities of 100, 200, 300, 400, and 500 µmol/m²/s, with constant water (10 mL/day) and temperature (25°C). **Experiment 2**: Plants were grown at 300 µmol/m²/s, with water amounts of 5, 10, 15, 20, and 25 mL/day, at 25°C. **Experiment 3**: Plants were grown at 300 µmol/m²/s and 10 mL/day, with temperatures of 15°C, 20°C, 25°C, 30°C, and 35°C. Results are shown in Figures 1–3.\n\n**Figure 1: Stem Height vs. Light Intensity**\n- 100 µmol/m²/s: 5 cm\n- 200 µmol/m²/s: 10 cm\n- 300 µmol/m²/s: 15 cm\n- 400 µmol/m²/s: 12 cm\n- 500 µmol/m²/s: 8 cm\n\n**Figure 2: Stem Height vs. Water Amount**\n- 5 mL/day: 7 cm\n- 10 mL/day: 15 cm\n- 15 mL/day: 18 cm\n- 20 mL/day: 16 cm\n- 25 mL/day: 14 cm\n\n**Figure 3: Stem Height vs. Temperature**\n- 15°C: 6 cm\n- 20°C: 12 cm\n- 25°C: 15 cm\n- 30°C: 13 cm\n- 35°C: 9 cm",
                            question: "If a fourth experiment tested plants at 200 µmol/m²/s, 15 mL/day, and 20°C, what would be the most likely stem height?",
                            answers: [
                                { text: "A) 8 cm", correct: false },
                                { text: "B) 10 cm", correct: true },
                                { text: "C) 12 cm", correct: false },
                                { text: "D) 14 cm", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "data representation",
                            explanation: "At 200 µmol/m²/s, height is 10 cm (Figure 1). At 15 mL/day, height is 18 cm (Figure 2). At 20°C, height is 12 cm (Figure 3). Since 200 µmol/m²/s and 20°C are suboptimal compared to 300 µmol/m²/s and 25°C, height is likely close to 10 cm. B is correct."
                        },
                        {
                            passage: "Researchers studied the effect of light intensity on the growth of pea plants. Growth was measured as stem height (cm) after 14 days. **Experiment 1**: Plants were grown under light intensities of 100, 200, 300, 400, and 500 µmol/m²/s, with constant water (10 mL/day) and temperature (25°C). **Experiment 2**: Plants were grown at 300 µmol/m²/s, with water amounts of 5, 10, 15, 20, and 25 mL/day, at 25°C. **Experiment 3**: Plants were grown at 300 µmol/m²/s and 10 mL/day, with temperatures of 15°C, 20°C, 25°C, 30°C, and 35°C. Results are shown in Figures 1–3.\n\n**Figure 1: Stem Height vs. Light Intensity**\n- 100 µmol/m²/s: 5 cm\n- 200 µmol/m²/s: 10 cm\n- 300 µmol/m²/s: 15 cm\n- 400 µmol/m²/s: 12 cm\n- 500 µmol/m²/s: 8 cm\n\n**Figure 2: Stem Height vs. Water Amount**\n- 5 mL/day: 7 cm\n- 10 mL/day: 15 cm\n- 15 mL/day: 18 cm\n- 20 mL/day: 16 cm\n- 25 mL/day: 14 cm\n\n**Figure 3: Stem Height vs. Temperature**\n- 15°C: 6 cm\n- 20°C: 12 cm\n- 25°C: 15 cm\n- 30°C: 13 cm\n- 35°C: 9 cm",
                            question: "What was the purpose of keeping water constant in Experiment 1?",
                            answers: [
                                { text: "A) To isolate the effect of light intensity.", correct: true },
                                { text: "B) To ensure plant survival.", correct: false },
                                { text: "C) To reduce experimental costs.", correct: false },
                                { text: "D) To replicate natural conditions.", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "experimental design",
                            explanation: "Constant water (10 mL/day) isolates light intensity’s effect. A is correct."
                        },
                        {
                            passage: "Researchers studied the effect of light intensity on the growth of pea plants. Growth was measured as stem height (cm) after 14 days. **Experiment 1**: Plants were grown under light intensities of 100, 200, 300, 400, and 500 µmol/m²/s, with constant water (10 mL/day) and temperature (25°C). **Experiment 2**: Plants were grown at 300 µmol/m²/s, with water amounts of 5, 10, 15, 20, and 25 mL/day, at 25°C. **Experiment 3**: Plants were grown at 300 µmol/m²/s and 10 mL/day, with temperatures of 15°C, 20°C, 25°C, 30°C, and 35°C. Results are shown in Figures 1–3.\n\n**Figure 1: Stem Height vs. Light Intensity**\n- 100 µmol/m²/s: 5 cm\n- 200 µmol/m²/s: 10 cm\n- 300 µmol/m²/s: 15 cm\n- 400 µmol/m²/s: 12 cm\n- 500 µmol/m²/s: 8 cm\n\n**Figure 2: Stem Height vs. Water Amount**\n- 5 mL/day: 7 cm\n- 10 mL/day: 15 cm\n- 15 mL/day: 18 cm\n- 20 mL/day: 16 cm\n- 25 mL/day: 14 cm\n\n**Figure 3: Stem Height vs. Temperature**\n- 15°C: 6 cm\n- 20°C: 12 cm\n- 25°C: 15 cm\n- 30°C: 13 cm\n- 35°C: 9 cm",
                            question: "Which variable was controlled in all three experiments?",
                            answers: [
                                { text: "A) Light intensity", correct: false },
                                { text: "B) Water amount", correct: false },
                                { text: "C) Temperature", correct: false },
                                { text: "D) None were controlled in all.", correct: true }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "experimental design",
                            explanation: "Each experiment varied one variable (light, water, temperature) while controlling others, but no single variable was controlled across all. D is correct."
                        },
                        {
                            passage: "Researchers studied the effect of light intensity on the growth of pea plants. Growth was measured as stem height (cm) after 14 days. **Experiment 1**: Plants were grown under light intensities of 100, 200, 300, 400, and 500 µmol/m²/s, with constant water (10 mL/day) and temperature (25°C). **Experiment 2**: Plants were grown at 300 µmol/m²/s, with water amounts of 5, 10, 15, 20, and 25 mL/day, at 25°C. **Experiment 3**: Plants were grown at 300 µmol/m²/s and 10 mL/day, with temperatures of 15°C, 20°C, 25°C, 30°C, and 35°C. Results are shown in Figures 1–3.\n\n**Figure 1: Stem Height vs. Light Intensity**\n- 100 µmol/m²/s: 5 cm\n- 200 µmol/m²/s: 10 cm\n- 300 µmol/m²/s: 15 cm\n- 400 µmol/m²/s: 12 cm\n- 500 µmol/m²/s: 8 cm\n\n**Figure 2: Stem Height vs. Water Amount**\n- 5 mL/day: 7 cm\n- 10 mL/day: 15 cm\n- 15 mL/day: 18 cm\n- 20 mL/day: 16 cm\n- 25 mL/day: 14 cm\n\n**Figure 3: Stem Height vs. Temperature**\n- 15°C: 6 cm\n- 20°C: 12 cm\n- 25°C: 15 cm\n- 30°C: 13 cm\n- 35°C: 9 cm",
                            question: "If plants were grown at 350 µmol/m²/s, 12 mL/day, and 22°C, the stem height would most likely be:",
                            answers: [
                                { text: "A) less than 12 cm.", correct: false },
                                { text: "B) between 12 and 15 cm.", correct: true },
                                { text: "C) between 15 and 18 cm.", correct: false },
                                { text: "D) greater than 18 cm.", correct: false }
                            ],
                            type: "science",
                            difficulty: "very hard",
                            category: "data representation",
                            explanation: "At 300 µmol/m²/s, height is 15 cm (Figure 1); at 400 µmol/m²/s, it’s 12 cm. At 15 mL/day, height is 18 cm (Figure 2). At 20°C, height is 12 cm (Figure 3). Conditions are slightly suboptimal, so height is likely 12–15 cm. B is correct."
                        },
                    
                        // Passage 3: Pendulum Motion (Data Representation, 6 questions)
                        {
                            passage: "A pendulum’s period (time for one swing, in seconds) depends on its length and gravitational acceleration. Researchers tested pendulums of lengths 0.5 m, 1.0 m, 1.5 m, 2.0 m, and 2.5 m. **Experiment 1**: Pendulums swung on Earth (g = 9.8 m/s²). **Experiment 2**: Pendulums swung on the Moon (g = 1.6 m/s²). The period was calculated using T = 2π√(L/g), where L is length (m) and g is gravitational acceleration (m/s²). Results are shown in Table 1.\n\n**Table 1: Pendulum Period (s)**\n| Length (m) | Earth (g = 9.8 m/s²) | Moon (g = 1.6 m/s²) |\n|------------|----------------------|---------------------|\n| 0.5        | 1.42                 | 3.52                |\n| 1.0        | 2.01                 | 4.98                |\n| 1.5        | 2.46                 | 6.10                |\n| 2.0        | 2.84                 | 7.03                |\n| 2.5        | 3.18                 | 7.87                |",
                            question: "According to Table 1, what is the period of a 1.5 m pendulum on the Moon?",
                            answers: [
                                { text: "A) 2.46 s", correct: false },
                                { text: "B) 4.98 s", correct: false },
                                { text: "C) 6.10 s", correct: true },
                                { text: "D) 7.03 s", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Table 1 shows 6.10 s for a 1.5 m pendulum on the Moon. C is correct."
                        },
                        {
                            passage: "A pendulum’s period (time for one swing, in seconds) depends on its length and gravitational acceleration. Researchers tested pendulums of lengths 0.5 m, 1.0 m, 1.5 m, 2.0 m, and 2.5 m. **Experiment 1**: Pendulums swung on Earth (g = 9.8 m/s²). **Experiment 2**: Pendulums swung on the Moon (g = 1.6 m/s²). The period was calculated using T = 2π√(L/g), where L is length (m) and g is gravitational acceleration (m/s²). Results are shown in Table 1.\n\n**Table 1: Pendulum Period (s)**\n| Length (m) | Earth (g = 9.8 m/s²) | Moon (g = 1.6 m/s²) |\n|------------|----------------------|---------------------|\n| 0.5        | 1.42                 | 3.52                |\n| 1.0        | 2.01                 | 4.98                |\n| 1.5        | 2.46                 | 6.10                |\n| 2.0        | 2.84                 | 7.03                |\n| 2.5        | 3.18                 | 7.87                |",
                            question: "How does the period change as pendulum length increases on Earth?",
                            answers: [
                                { text: "A) Decreases", correct: false },
                                { text: "B) Increases", correct: true },
                                { text: "C) Remains constant", correct: false },
                                { text: "D) Varies unpredictably", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Table 1 shows Earth periods increasing from 1.42 s (0.5 m) to 3.18 s (2.5 m). B is correct."
                        },
                        {
                            passage: "A pendulum’s period (time for one swing, in seconds) depends on its length and gravitational acceleration. Researchers tested pendulums of lengths 0.5 m, 1.0 m, 1.5 m, 2.0 m, and 2.5 m. **Experiment 1**: Pendulums swung on Earth (g = 9.8 m/s²). **Experiment 2**: Pendulums swung on the Moon (g = 1.6 m/s²). The period was calculated using T = 2π√(L/g), where L is length (m) and g is gravitational acceleration (m/s²). Results are shown in Table 1.\n\n**Table 1: Pendulum Period (s)**\n| Length (m) | Earth (g = 9.8 m/s²) | Moon (g = 1.6 m/s²) |\n|------------|----------------------|---------------------|\n| 0.5        | 1.42                 | 3.52                |\n| 1.0        | 2.01                 | 4.98                |\n| 1.5        | 2.46                 | 6.10                |\n| 2.0        | 2.84                 | 7.03                |\n| 2.5        | 3.18                 | 7.87                |",
                            question: "Why is the period longer on the Moon than on Earth for the same pendulum length?",
                            answers: [
                                { text: "A) Lower gravitational acceleration", correct: true },
                                { text: "B) Higher air resistance", correct: false },
                                { text: "C) Increased pendulum mass", correct: false },
                                { text: "D) Different atmospheric pressure", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "T = 2π√(L/g). Lower g (1.6 m/s² vs. 9.8 m/s²) increases T. A is correct."
                        },
                        {
                            passage: "A pendulum’s period (time for one swing, in seconds) depends on its length and gravitational acceleration. Researchers tested pendulums of lengths 0.5 m, 1.0 m, 1.5 m, 2.0 m, and 2.5 m. **Experiment 1**: Pendulums swung on Earth (g = 9.8 m/s²). **Experiment 2**: Pendulums swung on the Moon (g = 1.6 m/s²). The period was calculated using T = 2π√(L/g), where L is length (m) and g is gravitational acceleration (m/s²). Results are shown in Table 1.\n\n**Table 1: Pendulum Period (s)**\n| Length (m) | Earth (g = 9.8 m/s²) | Moon (g = 1.6 m/s²) |\n|------------|----------------------|---------------------|\n| 0.5        | 1.42                 | 3.52                |\n| 1.0        | 2.01                 | 4.98                |\n| 1.5        | 2.46                 | 6.10                |\n| 2.0        | 2.84                 | 7.03                |\n| 2.5        | 3.18                 | 7.87                |",
                            question: "If a pendulum of length 1.0 m were tested on a planet with g = 4.9 m/s², what would be the period?",
                            answers: [
                                { text: "A) 2.01 s", correct: false },
                                { text: "B) 2.84 s", correct: true },
                                { text: "C) 4.98 s", correct: false },
                                { text: "D) 6.10 s", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "data representation",
                            explanation: "T = 2π√(L/g) = 2π√(1.0/4.9) ≈ 2π√0.204 ≈ 2.84 s. B is correct."
                        },
                        {
                            passage: "A pendulum’s period (time for one swing, in seconds) depends on its length and gravitational acceleration. Researchers tested pendulums of lengths 0.5 m, 1.0 m, 1.5 m, 2.0 m, and 2.5 m. **Experiment 1**: Pendulums swung on Earth (g = 9.8 m/s²). **Experiment 2**: Pendulums swung on the Moon (g = 1.6 m/s²). The period was calculated using T = 2π√(L/g), where L is length (m) and g is gravitational acceleration (m/s²). Results are shown in Table 1.\n\n**Table 1: Pendulum Period (s)**\n| Length (m) | Earth (g = 9.8 m/s²) | Moon (g = 1.6 m/s²) |\n|------------|----------------------|---------------------|\n| 0.5        | 1.42                 | 3.52                |\n| 1.0        | 2.01                 | 4.98                |\n| 1.5        | 2.46                 | 6.10                |\n| 2.0        | 2.84                 | 7.03                |\n| 2.5        | 3.18                 | 7.87                |",
                            question: "What assumption underlies the formula T = 2π√(L/g)?",
                            answers: [
                                { text: "A) Pendulum mass affects period.", correct: false },
                                { text: "B) Air resistance is negligible.", correct: true },
                                { text: "C) Gravity varies with length.", correct: false },
                                { text: "D) The pendulum swings indefinitely.", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "experimental design",
                            explanation: "The formula assumes small-angle swings and no air resistance, simplifying the system. B is correct."
                        },
                        {
                            passage: "A pendulum’s period (time for one swing, in seconds) depends on its length and gravitational acceleration. Researchers tested pendulums of lengths 0.5 m, 1.0 m, 1.5 m, 2.0 m, and 2.5 m. **Experiment 1**: Pendulums swung on Earth (g = 9.8 m/s²). **Experiment 2**: Pendulums swung on the Moon (g = 1.6 m/s²). The period was calculated using T = 2π√(L/g), where L is length (m) and g is gravitational acceleration (m/s²). Results are shown in Table 1.\n\n**Table 1: Pendulum Period (s)**\n| Length (m) | Earth (g = 9.8 m/s²) | Moon (g = 1.6 m/s²) |\n|------------|----------------------|---------------------|\n| 0.5        | 1.42                 | 3.52                |\n| 1.0        | 2.01                 | 4.98                |\n| 1.5        | 2.46                 | 6.10                |\n| 2.0        | 2.84                 | 7.03                |\n| 2.5        | 3.18                 | 7.87                |",
                            question: "If a 2.0 m pendulum were tested on a planet with a period of 4.0 s, what is the gravitational acceleration?",
                            answers: [
                                { text: "A) 3.9 m/s²", correct: true },
                                { text: "B) 4.9 m/s²", correct: false },
                                { text: "C) 5.9 m/s²", correct: false },
                                { text: "D) 6.9 m/s²", correct: false }
                            ],
                            type: "science",
                            difficulty: "very hard",
                            category: "data representation",
                            explanation: "T = 2π√(L/g). Solve: 4.0 = 2π√(2.0/g). Square: 16 = 4π²(2.0/g). g = 8π²/16 ≈ 3.9 m/s². A is correct."
                        },
                    
                        // Passage 4: Chemical Reaction Rates (Research Summary, 7 questions)
                        {
                            passage: "Researchers studied the rate of a chemical reaction between substances A and B, measuring the initial reaction rate (mol/L/s). **Experiment 1**: Varied [A] (molarity, mol/L) while keeping [B] at 0.1 M and temperature at 25°C. **Experiment 2**: Varied [B] while keeping [A] at 0.2 M and temperature at 25°C. **Experiment 3**: Varied temperature while keeping [A] at 0.2 M and [B] at 0.1 M. Results are shown in Tables 1–3.\n\n**Table 1: Rate vs. [A]**\n| [A] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.1     | 0.02           |\n| 0.2     | 0.08           |\n| 0.3     | 0.18           |\n| 0.4     | 0.32           |\n\n**Table 2: Rate vs. [B]**\n| [B] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.05    | 0.04           |\n| 0.10    | 0.08           |\n| 0.15    | 0.12           |\n| 0.20    | 0.16           |\n\n**Table 3: Rate vs. Temperature**\n| Temp (°C) | Rate (mol/L/s) |\n|-----------|----------------|\n| 15        | 0.04           |\n| 25        | 0.08           |\n| 35        | 0.16           |\n| 45        | 0.32           |",
                            question: "According to Table 1, how does the reaction rate change as [A] increases?",
                            answers: [
                                { text: "A) Increases linearly", correct: false },
                                { text: "B) Increases quadratically", correct: true },
                                { text: "C) Decreases", correct: false },
                                { text: "D) Remains constant", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Doubling [A] from 0.1 M (0.02 mol/L/s) to 0.2 M (0.08 mol/L/s) quadruples the rate, suggesting a quadratic relationship. B is correct."
                        },
                        {
                            passage: "Researchers studied the rate of a chemical reaction between substances A and B, measuring the initial reaction rate (mol/L/s). **Experiment 1**: Varied [A] (molarity, mol/L) while keeping [B] at 0.1 M and temperature at 25°C. **Experiment 2**: Varied [B] while keeping [A] at 0.2 M and temperature at 25°C. **Experiment 3**: Varied temperature while keeping [A] at 0.2 M and [B] at 0.1 M. Results are shown in Tables 1–3.\n\n**Table 1: Rate vs. [A]**\n| [A] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.1     | 0.02           |\n| 0.2     | 0.08           |\n| 0.3     | 0.18           |\n| 0.4     | 0.32           |\n\n**Table 2: Rate vs. [B]**\n| [B] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.05    | 0.04           |\n| 0.10    | 0.08           |\n| 0.15    | 0.12           |\n| 0.20    | 0.16           |\n\n**Table 3: Rate vs. Temperature**\n| Temp (°C) | Rate (mol/L/s) |\n|-----------|----------------|\n| 15        | 0.04           |\n| 25        | 0.08           |\n| 35        | 0.16           |\n| 45        | 0.32           |",
                            question: "What is the reaction rate when [B] is 0.15 M at 25°C with [A] = 0.2 M?",
                            answers: [
                                { text: "A) 0.04 mol/L/s", correct: false },
                                { text: "B) 0.08 mol/L/s", correct: false },
                                { text: "C) 0.12 mol/L/s", correct: true },
                                { text: "D) 0.16 mol/L/s", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Table 2 shows 0.12 mol/L/s at [B] = 0.15 M, [A] = 0.2 M, 25°C. C is correct."
                        },
                        {
                            passage: "Researchers studied the rate of a chemical reaction between substances A and B, measuring the initial reaction rate (mol/L/s). **Experiment 1**: Varied [A] (molarity, mol/L) while keeping [B] at 0.1 M and temperature at 25°C. **Experiment 2**: Varied [B] while keeping [A] at 0.2 M and temperature at 25°C. **Experiment 3**: Varied temperature while keeping [A] at 0.2 M and [B] at 0.1 M. Results are shown in Tables 1–3.\n\n**Table 1: Rate vs. [A]**\n| [A] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.1     | 0.02           |\n| 0.2     | 0.08           |\n| 0.3     | 0.18           |\n| 0.4     | 0.32           |\n\n**Table 2: Rate vs. [B]**\n| [B] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.05    | 0.04           |\n| 0.10    | 0.08           |\n| 0.15    | 0.12           |\n| 0.20    | 0.16           |\n\n**Table 3: Rate vs. Temperature**\n| Temp (°C) | Rate (mol/L/s) |\n|-----------|----------------|\n| 15        | 0.04           |\n| 25        | 0.08           |\n| 35        | 0.16           |\n| 45        | 0.32           |",
                            question: "How does temperature affect the reaction rate in Experiment 3?",
                            answers: [
                                { text: "A) Increases linearly", correct: false },
                                { text: "B) Increases exponentially", correct: true },
                                { text: "C) Decreases", correct: false },
                                { text: "D) Remains constant", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Table 3 shows the rate doubling every 10°C (0.04 to 0.08 to 0.16 to 0.32), indicating exponential growth. B is correct."
                        },
                        {
                            passage: "Researchers studied the rate of a chemical reaction between substances A and B, measuring the initial reaction rate (mol/L/s). **Experiment 1**: Varied [A] (molarity, mol/L) while keeping [B] at 0.1 M and temperature at 25°C. **Experiment 2**: Varied [B] while keeping [A] at 0.2 M and temperature at 25°C. **Experiment 3**: Varied temperature while keeping [A] at 0.2 M and [B] at 0.1 M. Results are shown in Tables 1–3.\n\n**Table 1: Rate vs. [A]**\n| [A] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.1     | 0.02           |\n| 0.2     | 0.08           |\n| 0.3     | 0.18           |\n| 0.4     | 0.32           |\n\n**Table 2: Rate vs. [B]**\n| [B] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.05    | 0.04           |\n| 0.10    | 0.08           |\n| 0.15    | 0.12           |\n| 0.20    | 0.16           |\n\n**Table 3: Rate vs. Temperature**\n| Temp (°C) | Rate (mol/L/s) |\n|-----------|----------------|\n| 15        | 0.04           |\n| 25        | 0.08           |\n| 35        | 0.16           |\n| 45        | 0.32           |",
                            question: "If [A] = 0.3 M, [B] = 0.05 M, and temperature = 35°C, what is the most likely reaction rate?",
                            answers: [
                                { text: "A) 0.09 mol/L/s", correct: true },
                                { text: "B) 0.12 mol/L/s", correct: false },
                                { text: "C) 0.16 mol/L/s", correct: false },
                                { text: "D) 0.18 mol/L/s", correct: false }
                            ],
                            type: "science",
                            difficulty: "very hard",
                            category: "data representation",
                            explanation: "Rate = k[A]²[B]. From Table 1, rate at [A] = 0.3 M, [B] = 0.1 M is 0.18 mol/L/s. Halving [B] to 0.05 M halves the rate to 0.09 mol/L/s at 25°C. At 35°C, rate doubles (Table 3: 0.08 to 0.16), but [A] = 0.3 M, [B] = 0.05 M yields 0.09 mol/L/s, adjusted for temperature. A is correct."
                        },
                        {
                            passage: "Researchers studied the rate of a chemical reaction between substances A and B, measuring the initial reaction rate (mol/L/s). **Experiment 1**: Varied [A] (molarity, mol/L) while keeping [B] at 0.1 M and temperature at 25°C. **Experiment 2**: Varied [B] while keeping [A] at 0.2 M and temperature at 25°C. **Experiment 3**: Varied temperature while keeping [A] at 0.2 M and [B] at 0.1 M. Results are shown in Tables 1–3.\n\n**Table 1: Rate vs. [A]**\n| [A] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.1     | 0.02           |\n| 0.2     | 0.08           |\n| 0.3     | 0.18           |\n| 0.4     | 0.32           |\n\n**Table 2: Rate vs. [B]**\n| [B] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.05    | 0.04           |\n| 0.10    | 0.08           |\n| 0.15    | 0.12           |\n| 0.20    | 0.16           |\n\n**Table 3: Rate vs. Temperature**\n| Temp (°C) | Rate (mol/L/s) |\n|-----------|----------------|\n| 15        | 0.04           |\n| 25        | 0.08           |\n| 35        | 0.16           |\n| 45        | 0.32           |",
                            question: "What is the order of the reaction with respect to [A]?",
                            answers: [
                                { text: "A) First", correct: false },
                                { text: "B) Second", correct: true },
                                { text: "C) Third", correct: false },
                                { text: "D) Zero", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "data representation",
                            explanation: "Doubling [A] from 0.1 M to 0.2 M (Table 1) quadruples the rate (0.02 to 0.08), indicating second-order dependence. B is correct."
                        },
                        {
                            passage: "Researchers studied the rate of a chemical reaction between substances A and B, measuring the initial reaction rate (mol/L/s). **Experiment 1**: Varied [A] (molarity, mol/L) while keeping [B] at 0.1 M and temperature at 25°C. **Experiment 2**: Varied [B] while keeping [A] at 0.2 M and temperature at 25°C. **Experiment 3**: Varied temperature while keeping [A] at 0.2 M and [B] at 0.1 M. Results are shown in Tables 1–3.\n\n**Table 1: Rate vs. [A]**\n| [A] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.1     | 0.02           |\n| 0.2     | 0.08           |\n| 0.3     | 0.18           |\n| 0.4     | 0.32           |\n\n**Table 2: Rate vs. [B]**\n| [B] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.05    | 0.04           |\n| 0.10    | 0.08           |\n| 0.15    | 0.12           |\n| 0.20    | 0.16           |\n\n**Table 3: Rate vs. Temperature**\n| Temp (°C) | Rate (mol/L/s) |\n|-----------|----------------|\n| 15        | 0.04           |\n| 25        | 0.08           |\n| 35        | 0.16           |\n| 45        | 0.32           |",
                            question: "Why was temperature kept constant in Experiment 2?",
                            answers: [
                                { text: "A) To isolate the effect of [B]", correct: true },
                                { text: "B) To ensure reaction stability", correct: false },
                                { text: "C) To reduce measurement errors", correct: false },
                                { text: "D) To mimic industrial conditions", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "experimental design",
                            explanation: "Constant temperature isolates [B]’s effect on the rate. A is correct."
                        },
                        {
                            passage: "Researchers studied the rate of a chemical reaction between substances A and B, measuring the initial reaction rate (mol/L/s). **Experiment 1**: Varied [A] (molarity, mol/L) while keeping [B] at 0.1 M and temperature at 25°C. **Experiment 2**: Varied [B] while keeping [A] at 0.2 M and temperature at 25°C. **Experiment 3**: Varied temperature while keeping [A] at 0.2 M and [B] at 0.1 M. Results are shown in Tables 1–3.\n\n**Table 1: Rate vs. [A]**\n| [A] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.1     | 0.02           |\n| 0.2     | 0.08           |\n| 0.3     | 0.18           |\n| 0.4     | 0.32           |\n\n**Table 2: Rate vs. [B]**\n| [B] (M) | Rate (mol/L/s) |\n|---------|----------------|\n| 0.05    | 0.04           |\n| 0.10    | 0.08           |\n| 0.15    | 0.12           |\n| 0.20    | 0.16           |\n\n**Table 3: Rate vs. Temperature**\n| Temp (°C) | Rate (mol/L/s) |\n|-----------|----------------|\n| 15        | 0.04           |\n| 25        | 0.08           |\n| 35        | 0.16           |\n| 45        | 0.32           |",
                            question: "If the reaction were tested at [A] = 0.2 M, [B] = 0.1 M, and 40°C, what would be the most likely rate?",
                            answers: [
                                { text: "A) 0.12 mol/L/s", correct: false },
                                { text: "B) 0.24 mol/L/s", correct: true },
                                { text: "C) 0.32 mol/L/s", correct: false },
                                { text: "D) 0.48 mol/L/s", correct: false }
                            ],
                            type: "science",
                            difficulty: "very hard",
                            category: "data representation",
                            explanation: "At 25°C, [A] = 0.2 M, [B] = 0.1 M, rate is 0.08 mol/L/s (Table 3). From 25°C to 35°C, rate doubles to 0.16 mol/L/s. At 40°C, rate is likely between 0.16 and 0.32 (45°C), approximately 0.24 mol/L/s. B is correct."
                        },
                    
                        // Passage 5: Soil Permeability (Research Summary, 7 questions)
                        {
                            passage: "Soil permeability measures how easily water flows through soil, affecting irrigation and drainage. Researchers tested permeability (cm/hour) in three soil types: sand, loam, and clay. **Experiment 1**: Varied water pressure (kPa) at 10, 20, 30, and 40 kPa, with constant temperature (20°C). **Experiment 2**: Varied temperature at 10°C, 20°C, 30°C, and 40°C, with constant pressure (20 kPa). **Experiment 3**: Varied soil compaction (low, medium, high) at 20 kPa and 20°C. Results are shown in Tables 1–3.\n\n**Table 1: Permeability vs. Pressure**\n| Pressure (kPa) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|----------------|-------------|-------------|-------------|\n| 10             | 50          | 20          | 5           |\n| 20             | 55          | 22          | 6           |\n| 30             | 58          | 23          | 7           |\n| 40             | 60          | 24          | 8           |\n\n**Table 2: Permeability vs. Temperature**\n| Temp (°C) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|-----------|-------------|-------------|-------------|\n| 10        | 52          | 21          | 5.5         |\n| 20        | 55          | 22          | 6           |\n| 30        | 57          | 23          | 6.5         |\n| 40        | 59          | 24          | 7           |\n\n**Table 3: Permeability vs. Compaction**\n| Compaction | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|------------|-------------|-------------|-------------|\n| Low        | 60          | 25          | 8           |\n| Medium     | 55          | 22          | 6           |\n| High       | 50          | 20          | 5           |",
                            question: "According to Table 1, which soil has the highest permeability at 30 kPa?",
                            answers: [
                                { text: "A) Sand", correct: true },
                                { text: "B) Loam", correct: false },
                                { text: "C) Clay", correct: false },
                                { text: "D) All equal", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Table 1 shows sand at 58 cm/h, higher than loam (23 cm/h) and clay (7 cm/h) at 30 kPa. A is correct."
                        },
                        {
                            passage: "Soil permeability measures how easily water flows through soil, affecting irrigation and drainage. Researchers tested permeability (cm/hour) in three soil types: sand, loam, and clay. **Experiment 1**: Varied water pressure (kPa) at 10, 20, 30, and 40 kPa, with constant temperature (20°C). **Experiment 2**: Varied temperature at 10°C, 20°C, 30°C, and 40°C, with constant pressure (20 kPa). **Experiment 3**: Varied soil compaction (low, medium, high) at 20 kPa and 20°C. Results are shown in Tables 1–3.\n\n**Table 1: Permeability vs. Pressure**\n| Pressure (kPa) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|----------------|-------------|-------------|-------------|\n| 10             | 50          | 20          | 5           |\n| 20             | 55          | 22          | 6           |\n| 30             | 58          | 23          | 7           |\n| 40             | 60          | 24          | 8           |\n\n**Table 2: Permeability vs. Temperature**\n| Temp (°C) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|-----------|-------------|-------------|-------------|\n| 10        | 52          | 21          | 5.5         |\n| 20        | 55          | 22          | 6           |\n| 30        | 57          | 23          | 6.5         |\n| 40        | 59          | 24          | 7           |\n\n**Table 3: Permeability vs. Compaction**\n| Compaction | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|------------|-------------|-------------|-------------|\n| Low        | 60          | 25          | 8           |\n| Medium     | 55          | 22          | 6           |\n| High       | 50          | 20          | 5           |",
                            question: "How does temperature affect loam’s permeability in Experiment 2?",
                            answers: [
                                { text: "A) Increases linearly", correct: true },
                                { text: "B) Decreases linearly", correct: false },
                                { text: "C) Remains constant", correct: false },
                                { text: "D) Varies unpredictably", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Table 2 shows loam’s permeability increasing from 21 cm/h (10°C) to 24 cm/h (40°C) linearly. A is correct."
                        },
                        {
                            passage: "Soil permeability measures how easily water flows through soil, affecting irrigation and drainage. Researchers tested permeability (cm/hour) in three soil types: sand, loam, and clay. **Experiment 1**: Varied water pressure (kPa) at 10, 20, 30, and 40 kPa, with constant temperature (20°C). **Experiment 2**: Varied temperature at 10°C, 20°C, 30°C, and 40°C, with constant pressure (20 kPa). **Experiment 3**: Varied soil compaction (low, medium, high) at 20 kPa and 20°C. Results are shown in Tables 1–3.\n\n**Table 1: Permeability vs. Pressure**\n| Pressure (kPa) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|----------------|-------------|-------------|-------------|\n| 10             | 50          | 20          | 5           |\n| 20             | 55          | 22          | 6           |\n| 30             | 58          | 23          | 7           |\n| 40             | 60          | 24          | 8           |\n\n**Table 2: Permeability vs. Temperature**\n| Temp (°C) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|-----------|-------------|-------------|-------------|\n| 10        | 52          | 21          | 5.5         |\n| 20        | 55          | 22          | 6           |\n| 30        | 57          | 23          | 6.5         |\n| 40        | 59          | 24          | 7           |\n\n**Table 3: Permeability vs. Compaction**\n| Compaction | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|------------|-------------|-------------|-------------|\n| Low        | 60          | 25          | 8           |\n| Medium     | 55          | 22          | 6           |\n| High       | 50          | 20          | 5           |",
                            question: "What is the effect of compaction on clay’s permeability in Experiment 3?",
                            answers: [
                                { text: "A) Increases with compaction", correct: false },
                                { text: "B) Decreases with compaction", correct: true },
                                { text: "C) Remains constant", correct: false },
                                { text: "D) Varies unpredictably", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "data representation",
                            explanation: "Table 3 shows clay’s permeability decreasing from 8 cm/h (low) to 5 cm/h (high). B is correct."
                        },
                        // New questions for Passage 5
                        {
                            passage: "Soil permeability measures how easily water flows through soil, affecting irrigation and drainage. Researchers tested permeability (cm/hour) in three soil types: sand, loam, and clay. **Experiment 1**: Varied water pressure (kPa) at 10, 20, 30, and 40 kPa, with constant temperature (20°C). **Experiment 2**: Varied temperature at 10°C, 20°C, 30°C, and 40°C, with constant pressure (20 kPa). **Experiment 3**: Varied soil compaction (low, medium, high) at 20 kPa and 20°C. Results are shown in Tables 1–3.\n\n**Table 1: Permeability vs. Pressure**\n| Pressure (kPa) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|----------------|-------------|-------------|-------------|\n| 10             | 50          | 20          | 5           |\n| 20             | 55          | 22          | 6           |\n| 30             | 58          | 23          | 7           |\n| 40             | 60          | 24          | 8           |\n\n**Table 2: Permeability vs. Temperature**\n| Temp (°C) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|-----------|-------------|-------------|-------------|\n| 10        | 52          | 21          | 5.5         |\n| 20        | 55          | 22          | 6           |\n| 30        | 57          | 23          | 6.5         |\n| 40        | 59          | 24          | 7           |\n\n**Table 3: Permeability vs. Compaction**\n| Compaction | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|------------|-------------|-------------|-------------|\n| Low        | 60          | 25          | 8           |\n| Medium     | 55          | 22          | 6           |\n| High       | 50          | 20          | 5           |",
                            question: "If loam is tested at 15 kPa, 25°C, and low compaction, what is the most likely permeability?",
                            answers: [
                                { text: "A) 20 cm/h", correct: false },
                                { text: "B) 22 cm/h", correct: false },
                                { text: "C) 24 cm/h", correct: true },
                                { text: "D) 26 cm/h", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "data representation",
                            explanation: "At 10 kPa, loam’s permeability is 20 cm/h; at 20 kPa, it’s 22 cm/h (Table 1), so at 15 kPa, it’s ~21 cm/h. At 20°C, it’s 22 cm/h; at 30°C, 23 cm/h (Table 2), so at 25°C, it’s ~22.5 cm/h. At low compaction, it’s 25 cm/h (Table 3). Combining slightly suboptimal pressure and temperature with optimal compaction, permeability is ~24 cm/h. C is correct."
                        },
                        {
                            passage: "Soil permeability measures how easily water flows through soil, affecting irrigation and drainage. Researchers tested permeability (cm/hour) in three soil types: sand, loam, and clay. **Experiment 1**: Varied water pressure (kPa) at 10, 20, 30, and 40 kPa, with constant temperature (20°C). **Experiment 2**: Varied temperature at 10°C, 20°C, 30°C, and 40°C, with constant pressure (20 kPa). **Experiment 3**: Varied soil compaction (low, medium, high) at 20 kPa and 20°C. Results are shown in Tables 1–3.\n\n**Table 1: Permeability vs. Pressure**\n| Pressure (kPa) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|----------------|-------------|-------------|-------------|\n| 10             | 50          | 20          | 5           |\n| 20             | 55          | 22          | 6           |\n| 30             | 58          | 23          | 7           |\n| 40             | 60          | 24          | 8           |\n\n**Table 2: Permeability vs. Temperature**\n| Temp (°C) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|-----------|-------------|-------------|-------------|\n| 10        | 52          | 21          | 5.5         |\n| 20        | 55          | 22          | 6           |\n| 30        | 57          | 23          | 6.5         |\n| 40        | 59          | 24          | 7           |\n\n**Table 3: Permeability vs. Compaction**\n| Compaction | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|------------|-------------|-------------|-------------|\n| Low        | 60          | 25          | 8           |\n| Medium     | 55          | 22          | 6           |\n| High       | 50          | 20          | 5           |",
                            question: "Why was pressure kept constant in Experiment 2?",
                            answers: [
                                { text: "A) To isolate the effect of temperature", correct: true },
                                { text: "B) To ensure consistent water flow", correct: false },
                                { text: "C) To reduce experimental costs", correct: false },
                                { text: "D) To replicate natural conditions", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "experimental design",
                            explanation: "Constant pressure (20 kPa) isolates temperature’s effect on permeability. A is correct."
                        },
                        {
                            passage: "Soil permeability measures how easily water flows through soil, affecting irrigation and drainage. Researchers tested permeability (cm/hour) in three soil types: sand, loam, and clay. **Experiment 1**: Varied water pressure (kPa) at 10, 20, 30, and 40 kPa, with constant temperature (20°C). **Experiment 2**: Varied temperature at 10°C, 20°C, 30°C, and 40°C, with constant pressure (20 kPa). **Experiment 3**: Varied soil compaction (low, medium, high) at 20 kPa and 20°C. Results are shown in Tables 1–3.\n\n**Table 1: Permeability vs. Pressure**\n| Pressure (kPa) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|----------------|-------------|-------------|-------------|\n| 10             | 50          | 20          | 5           |\n| 20             | 55          | 22          | 6           |\n| 30             | 58          | 23          | 7           |\n| 40             | 60          | 24          | 8           |\n\n**Table 2: Permeability vs. Temperature**\n| Temp (°C) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|-----------|-------------|-------------|-------------|\n| 10        | 52          | 21          | 5.5         |\n| 20        | 55          | 22          | 6           |\n| 30        | 57          | 23          | 6.5         |\n| 40        | 59          | 24          | 7           |\n\n**Table 3: Permeability vs. Compaction**\n| Compaction | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|------------|-------------|-------------|-------------|\n| Low        | 60          | 25          | 8           |\n| Medium     | 55          | 22          | 6           |\n| High       | 50          | 20          | 5           |",
                            question: "Which soil type shows the greatest relative change in permeability due to pressure in Experiment 1?",
                            answers: [
                                { text: "A) Sand", correct: false },
                                { text: "B) Loam", correct: false },
                                { text: "C) Clay", correct: true },
                                { text: "D) All equal", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "data representation",
                            explanation: "Relative change = (final - initial)/initial. Sand: (60 - 50)/50 = 20%. Loam: (24 - 20)/20 = 20%. Clay: (8 - 5)/5 = 60%. Clay has the greatest change. C is correct."
                        },
                        {
                            passage: "Soil permeability measures how easily water flows through soil, affecting irrigation and drainage. Researchers tested permeability (cm/hour) in three soil types: sand, loam, and clay. **Experiment 1**: Varied water pressure (kPa) at 10, 20, 30, and 40 kPa, with constant temperature (20°C). **Experiment 2**: Varied temperature at 10°C, 20°C, 30°C, and 40°C, with constant pressure (20 kPa). **Experiment 3**: Varied soil compaction (low, medium, high) at 20 kPa and 20°C. Results are shown in Tables 1–3.\n\n**Table 1: Permeability vs. Pressure**\n| Pressure (kPa) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|----------------|-------------|-------------|-------------|\n| 10             | 50          | 20          | 5           |\n| 20             | 55          | 22          | 6           |\n| 30             | 58          | 23          | 7           |\n| 40             | 60          | 24          | 8           |\n\n**Table 2: Permeability vs. Temperature**\n| Temp (°C) | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|-----------|-------------|-------------|-------------|\n| 10        | 52          | 21          | 5.5         |\n| 20        | 55          | 22          | 6           |\n| 30        | 57          | 23          | 6.5         |\n| 40        | 59          | 24          | 7           |\n\n**Table 3: Permeability vs. Compaction**\n| Compaction | Sand (cm/h) | Loam (cm/h) | Clay (cm/h) |\n|------------|-------------|-------------|-------------|\n| Low        | 60          | 25          | 8           |\n| Medium     | 55          | 22          | 6           |\n| High       | 50          | 20          | 5           |",
                            question: "If clay is tested at 35 kPa, 15°C, and high compaction, what is the most likely permeability?",
                            answers: [
                                { text: "A) 5 cm/h", correct: false },
                                { text: "B) 6 cm/h", correct: true },
                                { text: "C) 7 cm/h", correct: false },
                                { text: "D) 8 cm/h", correct: false }
                            ],
                            type: "science",
                            difficulty: "very hard",
                            category: "data representation",
                            explanation: "At 30 kPa, clay’s permeability is 7 cm/h; at 40 kPa, 8 cm/h (Table 1), so at 35 kPa, it’s ~7.5 cm/h. At 10°C, it’s 5.5 cm/h; at 20°C, 6 cm/h (Table 2), so at 15°C, it’s ~5.75 cm/h. At high compaction, it’s 5 cm/h (Table 3). Combining these, permeability is ~6 cm/h due to suboptimal conditions. B is correct."
                        },
                    
                        // Passage 6: Theories of Cloud Formation (Conflicting Viewpoints, 7 questions)
                        {
                            passage: "Cloud formation is critical to weather patterns, yet its mechanisms are debated. Two scientists propose different theories for how clouds form in the troposphere. **Scientist 1**: Cloud formation is driven by aerosol particles, such as dust or pollen, acting as cloud condensation nuclei (CCN). Water vapor condenses around these particles when relative humidity exceeds 100%, forming droplets. A 2024 study found that 75% of low-altitude clouds in the Pacific had CCN from natural sources like sea salt. Scientist 1 argues that increasing aerosol concentrations, even from pollution, enhances cloud formation, citing a 70% correlation between urban aerosol levels and cloud cover. However, high aerosol levels can reduce droplet size, leading to less precipitation. **Scientist 2**: Cloud formation primarily results from atmospheric turbulence, which cools air parcels adiabatically, causing condensation without relying on aerosols. A 2025 experiment in the Rockies showed turbulence-driven clouds formed in 80% of observed cases with low aerosol levels. Scientist 2 claims this mechanism explains high-altitude clouds better, though turbulence is harder to measure and predict.",
                            question: "What is the primary difference between the scientists’ theories?",
                            answers: [
                                { text: "A) Scientist 1 emphasizes turbulence, Scientist 2 emphasizes aerosols.", correct: false },
                                { text: "B) Scientist 1 focuses on aerosols, Scientist 2 on turbulence.", correct: true },
                                { text: "C) Scientist 1 studies high-altitude clouds, Scientist 2 low-altitude.", correct: false },
                                { text: "D) Scientist 1 uses humidity, Scientist 2 uses temperature.", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "conflicting viewpoints",
                            explanation: "Scientist 1’s theory centers on aerosol particles as CCN, while Scientist 2 emphasizes turbulence-driven cooling. B is correct."
                        },
                        {
                            passage: "Cloud formation is critical to weather patterns, yet its mechanisms are debated. Two scientists propose different theories for how clouds form in the troposphere. **Scientist 1**: Cloud formation is driven by aerosol particles, such as dust or pollen, acting as cloud condensation nuclei (CCN). Water vapor condenses around these particles when relative humidity exceeds 100%, forming droplets. A 2024 study found that 75% of low-altitude clouds in the Pacific had CCN from natural sources like sea salt. Scientist 1 argues that increasing aerosol concentrations, even from pollution, enhances cloud formation, citing a 70% correlation between urban aerosol levels and cloud cover. However, high aerosol levels can reduce droplet size, leading to less precipitation. **Scientist 2**: Cloud formation primarily results from atmospheric turbulence, which cools air parcels adiabatically, causing condensation without relying on aerosols. A 2025 experiment in the Rockies showed turbulence-driven clouds formed in 80% of observed cases with low aerosol levels. Scientist 2 claims this mechanism explains high-altitude clouds better, though turbulence is harder to measure and predict.",
                            question: "What evidence supports Scientist 1’s theory?",
                            answers: [
                                { text: "A) Turbulence in the Rockies", correct: false },
                                { text: "B) 75% of clouds with natural CCN", correct: true },
                                { text: "C) 80% turbulence-driven clouds", correct: false },
                                { text: "D) Reduced precipitation in urban areas", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "conflicting viewpoints",
                            explanation: "The 2024 study showing 75% of low-altitude clouds with natural CCN supports Scientist 1’s aerosol-based theory. B is correct."
                        },
                        {
                            passage: "Cloud formation is critical to weather patterns, yet its mechanisms are debated. Two scientists propose different theories for how clouds form in the troposphere. **Scientist 1**: Cloud formation is driven by aerosol particles, such as dust or pollen, acting as cloud condensation nuclei (CCN). Water vapor condenses around these particles when relative humidity exceeds 100%, forming droplets. A 2024 study found that 75% of low-altitude clouds in the Pacific had CCN from natural sources like sea salt. Scientist 1 argues that increasing aerosol concentrations, even from pollution, enhances cloud formation, citing a 70% correlation between urban aerosol levels and cloud cover. However, high aerosol levels can reduce droplet size, leading to less precipitation. **Scientist 2**: Cloud formation primarily results from atmospheric turbulence, which cools air parcels adiabatically, causing condensation without relying on aerosols. A 2025 experiment in the Rockies showed turbulence-driven clouds formed in 80% of observed cases with low aerosol levels. Scientist 2 claims this mechanism explains high-altitude clouds better, though turbulence is harder to measure and predict.",
                            question: "What is a weakness of Scientist 1’s theory?",
                            answers: [
                                { text: "A) Turbulence is hard to measure.", correct: false },
                                { text: "B) High aerosols reduce precipitation.", correct: true },
                                { text: "C) Clouds form without aerosols.", correct: false },
                                { text: "D) Humidity is unpredictable.", correct: false }
                            ],
                            type: "science",
                            difficulty: "medium",
                            category: "conflicting viewpoints",
                            explanation: "High aerosol levels reducing droplet size and precipitation is a noted drawback of Scientist 1’s theory. B is correct."
                        },
                        {
                            passage: "Cloud formation is critical to weather patterns, yet its mechanisms are debated. Two scientists propose different theories for how clouds form in the troposphere. **Scientist 1**: Cloud formation is driven by aerosol particles, such as dust or pollen, acting as cloud condensation nuclei (CCN). Water vapor condenses around these particles when relative humidity exceeds 100%, forming droplets. A 2024 study found that 75% of low-altitude clouds in the Pacific had CCN from natural sources like sea salt. Scientist 1 argues that increasing aerosol concentrations, even from pollution, enhances cloud formation, citing a 70% correlation between urban aerosol levels and cloud cover. However, high aerosol levels can reduce droplet size, leading to less precipitation. **Scientist 2**: Cloud formation primarily results from atmospheric turbulence, which cools air parcels adiabatically, causing condensation without relying on aerosols. A 2025 experiment in the Rockies showed turbulence-driven clouds formed in 80% of observed cases with low aerosol levels. Scientist 2 claims this mechanism explains high-altitude clouds better, though turbulence is harder to measure and predict.",
                            question: "Which scientist’s theory is better suited for predicting high-altitude clouds?",
                            answers: [
                                { text: "A) Scientist 1", correct: false },
                                { text: "B) Scientist 2", correct: true },
                                { text: "C) Both equally", correct: false },
                                { text: "D) Neither", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "conflicting viewpoints",
                            explanation: "Scientist 2 claims turbulence explains high-altitude clouds better, supported by the Rockies experiment. B is correct."
                        },
                        {
                            passage: "Cloud formation is critical to weather patterns, yet its mechanisms are debated. Two scientists propose different theories for how clouds form in the troposphere. **Scientist 1**: Cloud formation is driven by aerosol particles, such as dust or pollen, acting as cloud condensation nuclei (CCN). Water vapor condenses around these particles when relative humidity exceeds 100%, forming droplets. A 2024 study found that 75% of low-altitude clouds in the Pacific had CCN from natural sources like sea salt. Scientist 1 argues that increasing aerosol concentrations, even from pollution, enhances cloud formation, citing a 70% correlation between urban aerosol levels and cloud cover. However, high aerosol levels can reduce droplet size, leading to less precipitation. **Scientist 2**: Cloud formation primarily results from atmospheric turbulence, which cools air parcels adiabatically, causing condensation without relying on aerosols. A 2025 experiment in the Rockies showed turbulence-driven clouds formed in 80% of observed cases with low aerosol levels. Scientist 2 claims this mechanism explains high-altitude clouds better, though turbulence is harder to measure and predict.",
                            question: "A study finds that 90% of clouds form with low aerosol levels. How would this affect Scientist 1’s theory?",
                            answers: [
                                { text: "A) Strengthen it", correct: false },
                                { text: "B) Weaken it", correct: true },
                                { text: "C) Have no effect", correct: false },
                                { text: "D) Align it with Scientist 2’s", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "conflicting viewpoints",
                            explanation: "Scientist 1 relies on aerosols for cloud formation. A 90% rate of low-aerosol clouds undermines this, weakening the theory. B is correct."
                        },
                        {
                            passage: "Cloud formation is critical to weather patterns, yet its mechanisms are debated. Two scientists propose different theories for how clouds form in the troposphere. **Scientist 1**: Cloud formation is driven by aerosol particles, such as dust or pollen, acting as cloud condensation nuclei (CCN). Water vapor condenses around these particles when relative humidity exceeds 100%, forming droplets. A 2024 study found that 75% of low-altitude clouds in the Pacific had CCN from natural sources like sea salt. Scientist 1 argues that increasing aerosol concentrations, even from pollution, enhances cloud formation, citing a 70% correlation between urban aerosol levels and cloud cover. However, high aerosol levels can reduce droplet size, leading to less precipitation. **Scientist 2**: Cloud formation primarily results from atmospheric turbulence, which cools air parcels adiabatically, causing condensation without relying on aerosols. A 2025 experiment in the Rockies showed turbulence-driven clouds formed in 80% of observed cases with low aerosol levels. Scientist 2 claims this mechanism explains high-altitude clouds better, though turbulence is harder to measure and predict.",
                            question: "Which method is likely more challenging to implement for real-time prediction?",
                            answers: [
                                { text: "A) Scientist 1’s method", correct: false },
                                { text: "B) Scientist 2’s method", correct: true },
                                { text: "C) Both equally challenging", correct: false },
                                { text: "D) Cannot be determined", correct: false }
                            ],
                            type: "science",
                            difficulty: "hard",
                            category: "conflicting viewpoints",
                            explanation: "Scientist 2 notes that turbulence is harder to measure and predict, making real-time implementation challenging. B is correct."
                        },
                        {
                            passage: "Cloud formation is critical to weather patterns, yet its mechanisms are debated. Two scientists propose different theories for how clouds form in the troposphere. **Scientist 1**: Cloud formation is driven by aerosol particles, such as dust or pollen, acting as cloud condensation nuclei (CCN). Water vapor condenses around these particles when relative humidity exceeds 100%, forming droplets. A 2024 study found that 75% of low-altitude clouds in the Pacific had CCN from natural sources like sea salt. Scientist 1 argues that increasing aerosol concentrations, even from pollution, enhances cloud formation, citing a 70% correlation between urban aerosol levels and cloud cover. However, high aerosol levels can reduce droplet size, leading to less precipitation. **Scientist 2**: Cloud formation primarily results from atmospheric turbulence, which cools air parcels adiabatically, causing condensation without relying on aerosols. A 2025 experiment in the Rockies showed turbulence-driven clouds formed in 80% of observed cases with low aerosol levels. Scientist 2 claims this mechanism explains high-altitude clouds better, though turbulence is harder to measure and predict.",
                            question: "If high aerosol levels are detected but no turbulence occurs, which scientist would predict cloud formation?",
                            answers: [
                                { text: "A) Scientist 1", correct: true },
                                { text: "B) Scientist 2", correct: false },
                                { text: "C) Both", correct: false },
                                { text: "D) Neither", correct: false }
                            ],
                            type: "science",
                            difficulty: "very hard",
                            category: "conflicting viewpoints",
                            explanation: "Scientist 1 relies on aerosols for cloud formation, so would predict clouds. Scientist 2 needs turbulence, which is absent. A is correct."
                        }
                    ];

                    function startTest() {
                        if (!actIntroContainer || !document.getElementById("question-container")) {
                            console.error("Required elements not found");
                            return;
                        }
                        actIntroContainer.classList.add("hide");
                        document.getElementById("question-container").classList.remove("hide");
                        startEnglishSection();
                    }
                
                
                    let englishResponses = [];
                    let mathResponses = [];
                    let readingResponses = [];
                    let scienceResponses = [];
                 
                   
                    function startEnglishSection() {
                        currentSection = "english";
                        time = 45 * 60;
                        englishResponses = []; // Reset only English responses
                        refreshIntervalId = setInterval(updateCountdown, 1000);
                        setTimeout(endEnglishSection, 2700000);
                        startQuiz(englishQuestions);
                    }
                   
                    function startMathSection() {
                        currentSection = "math";
                        time = 60 * 60;
                        mathResponses = []; // Reset only Math responses
                        refreshIntervalId = setInterval(updateCountdown, 1000);
                        setTimeout(endMathSection, 3600000);
                        startQuiz(mathQuestions);
                    }
                   
                    function startReadingSection() {
                        currentSection = "reading";
                        time = 35 * 60;
                        readingResponses = []; // Reset only Reading responses
                        refreshIntervalId = setInterval(updateCountdown, 1000);
                        setTimeout(endReadingSection, 2100000);
                        passageElement.innerHTML = "";
                        startQuiz(readingQuestions);
                    }
                   
                    function startScienceSection() {
                        currentSection = "science";
                        time = 35 * 60;
                        scienceResponses = []; // Reset only Science responses
                        refreshIntervalId = setInterval(updateCountdown, 1000);
                        setTimeout(endScienceSection, 2100000);
                        passageElement.innerHTML = "";
                        startQuiz(scienceQuestions);
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
                   
                        // Reset layout classes
                        document.querySelector(".question-row").classList.remove("score-display");
                   
                        // Add section-specific class
                        const questionRow = document.querySelector(".question-row");
                        questionRow.classList.remove("english-section", "math-section", "reading-section", "science-section");
                        questionRow.classList.add(`${currentSection}-section`);
                   
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
                        console.log(`Displaying question ${questionNo} in ${currentSection}, passage:`, currentQuestion.passage || "No passage");
                        passageElement.style.display = currentSection === "math" ? "none" : "block";
                        passageElement.innerHTML = currentQuestion.passage || "";
                        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
                   
                        const questionRow = document.querySelector(".question-row");
                        questionRow.classList.remove("score-display");
                        questionElement.classList.remove("centered-score");
                   
                        // Display answer buttons without option letters
                        currentQuestion.answers.forEach((answer, index) => {
                            const button = document.createElement("button");
                            button.innerHTML = answer.text; // Display only the answer text (e.g., "4")
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
                
                
                    if (currentSection === "english") {
                        englishResponses.push(response);
                    } else if (currentSection === "math") {
                        mathResponses.push(response);
                    } else if (currentSection === "reading") {
                        readingResponses.push(response);
                    } else if (currentSection === "science") {
                        scienceResponses.push(response);
                    }
                
                
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
                   
                        const questionRow = document.querySelector(".question-row");
                        questionRow.classList.add("score-display");
                   
                        // Apply vertical layout for Math section even in score display
                        if (currentSection === "math") {
                            questionRow.classList.add("vertical-layout");
                        }
                   
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
                   
                        // Save test completion metadata
                        saveTestCompletion("ACT");
                   
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
                
                
                    function saveTestCompletion(examType) {
                        const completionData = {
                            exam: "ACT", // Changed from examType to "GED"
                            type: "test",
                            timestamp: new Date().toISOString()
                        };
                        localStorage.setItem("lastActivity", JSON.stringify(completionData));
                    }
                
                
                
                
                    function showExplanations() {
                        console.log("Entering showExplanations");
                        resetState();
                        passageElement.innerHTML = "";
                        questionElement.innerHTML = "<h2>Review of Incorrect Answers</h2>";
                        questionElement.style.overflowY = "scroll";
                        questionElement.style.maxHeight = "80vh";
                   
                        // Combine responses from all sections
                        const allResponses = [
                            ...englishResponses.map(r => ({ ...r, section: "english" })),
                            ...mathResponses.map(r => ({ ...r, section: "math" })),
                            ...readingResponses.map(r => ({ ...r, section: "reading" })),
                            ...scienceResponses.map(r => ({ ...r, section: "science" }))
                        ];
                   
                        const incorrectResponses = allResponses.filter(
                            response => response && response.wasCorrect === false && response.section
                        );
                        console.log("Incorrect responses:", incorrectResponses.length, incorrectResponses);
                   
                        if (incorrectResponses.length === 0) {
                            questionElement.innerHTML += "<p>Congratulations! You got all answers correct.</p>";
                        } else {
                            const fragment = document.createDocumentFragment();
                            const sections = ["english", "math", "reading", "science"];
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
                    
                        // English Questions (Passage 1: Astronomy Club)
                        if (questionText.includes("Which punctuation corrects the sentence 'For months, the club—led by juniors Priya Sharma and Ethan Cole—had charted constellations, tracked meteors, and logged data'")) {
                            return "Option B retains correct dashes for the appositive and commas for the series. A omits commas, C misplaces a comma, and D disrupts the structure. B is correct.";
                        } else if (questionText.includes("Which word replaces 'capturing' in 'Their goal was bold: a telescope powerful enough to detect exoplanets, capturing data once reserved for professionals'")) {
                            return "Option A 'collecting' maintains the participle form and clarity. B shifts tense, C is future, and D disrupts structure. A is correct.";
                        } else if (questionText.includes("Which pronoun corrects 'The advisor, however, took notes, impressed by the ambition'")) {
                            return "Option C 'his or her' matches the singular 'advisor.' A is plural, B shifts number, and D keeps the original. C is correct.";
                        } else if (questionText.includes("Which phrase replaces 'to identify' in 'Priya, an aspiring astrophysicist, wrote code to identify faint star wobbles'")) {
                            return "Option A 'to detect' clarifies Priya’s goal. B is vague, C shifts meaning, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision best combines 'The demo wasn’t perfect; the lens misaligned slightly'")) {
                            return "Option B 'as' links clauses smoothly. A is wordy, C shifts logic, and D is causal. B is correct.";
                        } else if (questionText.includes("Which revision to 'Skeptics whispered—could students really spot distant worlds?'")) {
                            return "Option B preserves the doubtful tone. A is informal, C shifts tone, and D keeps the original. B is correct.";
                        } else if (questionText.includes("Which punctuation corrects 'Past attempts had faltered; one telescope wobbled during a test'")) {
                            return "Option A uses a comma for clarity. B misuses a colon, C is incorrect, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence best follows 'Yet as the telescope locked onto its target, Priya sensed success'")) {
                            return "Option B reinforces success with continued effort. A is logistical, C is neutral, and D shifts focus. B is correct.";
                        } else if (questionText.includes("Which revision corrects the verb tense in 'Spectators watched as Ethan adjusts the lens'")) {
                            return "Option A 'adjusted' matches past tense. B shifts tense, C is incorrect, and D keeps the error. A is correct.";
                        } else if (questionText.includes("Which revision to 'a stargazing prodigy' enhances specificity")) {
                            return "Option A 'a skilled astronomer' specifies Ethan’s expertise. B is vague, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains a misplaced modifier")) {
                            return "Option D is correct; no misplaced modifiers exist. A, B, and C are properly structured. D is correct.";
                        } else if (questionText.includes("Which transition phrase, inserted before 'The advisor, however, nodded approvingly'")) {
                            return "Option B 'In contrast' highlights approval vs. skepticism. A suggests timing, C is an example, and D is causal. B is correct.";
                        } else if (questionText.includes("Which phrase replaces 'with precision' in 'Ethan demonstrated the telescope’s focus, which locked onto stars with precision'")) {
                            return "Option A 'with accuracy' sharpens technical focus. B shifts meaning, C is vague, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision to 'Yet their ambition held firm' emphasizes determination")) {
                            return "Option A 'resolve stood unwavering' intensifies perseverance. B is weaker, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains an error in parallel structure")) {
                            return "Option D is correct; no parallelism errors exist. A’s series is consistent, B and C are sound. D is correct.";
                        }
                    
                        // English Questions (Passage 2: Community Mural)
                        if (questionText.includes("Which punctuation corrects the sentence 'For weeks, the team—guided by seniors Maya Alvarez and Jamal Carter—had sketched designs, mixed paints, and planned layouts'")) {
                            return "Option B retains correct dashes and commas. A omits commas, C misplaces a comma, and D disrupts structure. B is correct.";
                        } else if (questionText.includes("Which word replaces 'reflecting' in 'Their aim was bold: a mural that unified the neighborhood, reflecting its history and hopes'")) {
                            return "Option A 'depicting' maintains participle form. B shifts tense, C is future, and D disrupts structure. A is correct.";
                        } else if (questionText.includes("Which pronoun corrects 'The curator, however, took photos, impressed by the creativity'")) {
                            return "Option C 'his or her' matches singular 'curator.' A is plural, B shifts number, and D keeps the original. C is correct.";
                        } else if (questionText.includes("Which phrase replaces 'to capture' in 'Maya, a budding artist, chose colors to capture the neighborhood’s vibrancy'")) {
                            return "Option A 'to convey' clarifies Maya’s intent. B is vague, C shifts meaning, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision best combines 'The mural wasn’t perfect; a few lines smudged'")) {
                            return "Option B 'as' links clauses smoothly. A is wordy, C shifts logic, and D is causal. B is correct.";
                        } else if (questionText.includes("Which revision to 'Doubters murmured—could students create something lasting?'")) {
                            return "Option B preserves skeptical tone. A is informal, C shifts tone, and D keeps the original. B is correct.";
                        } else if (questionText.includes("Which punctuation corrects 'Early sketches had faltered; one design clashed with the wall’s texture'")) {
                            return "Option A uses a comma for clarity. B misuses a colon, C is incorrect, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence best follows 'Yet as the mural took shape, Maya felt pride'")) {
                            return "Option B emphasizes community involvement. A is logistical, C is neutral, and D shifts focus. B is correct.";
                        } else if (questionText.includes("Which revision corrects the verb tense in 'Neighbors watched as Jamal paints a vibrant scene'")) {
                            return "Option A 'painted' matches past tense. B shifts tense, C is incorrect, and D keeps the error. A is correct.";
                        } else if (questionText.includes("Which revision to 'a creative visionary' enhances specificity")) {
                            return "Option A 'a talented muralist' specifies Jamal’s role. B is vague, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains a misplaced modifier")) {
                            return "Option D is correct; no misplaced modifiers exist. A, B, and C are clear. D is correct.";
                        } else if (questionText.includes("Which transition phrase, inserted before 'The curator, however, smiled approvingly'")) {
                            return "Option B 'In contrast' highlights approval vs. doubt. A suggests timing, C is an example, and D is causal. B is correct.";
                        } else if (questionText.includes("Which phrase replaces 'with care' in 'Jamal outlined figures, which came alive with care'")) {
                            return "Option A 'with precision' sharpens artistic focus. B shifts meaning, C is vague, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision to 'Still, their vision endured' emphasizes resilience")) {
                            return "Option A 'resolve persisted' intensifies perseverance. B is weaker, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains an error in parallel structure")) {
                            return "Option D is correct; no parallelism errors exist. A, B, and C are consistent. D is correct.";
                        }
                    
                        // English Questions (Passage 3: Robotics Competition)
                        if (questionText.includes("Which punctuation corrects the sentence 'For months, the squad—mentored by sophomores Ava Chen and Lucas Patel—had toiled in the lab, programming sensors and assembling gears'")) {
                            return "Option B retains correct dashes and commas. A omits commas, C misplaces a comma, and D disrupts structure. B is correct.";
                        } else if (questionText.includes("Which word replaces 'mimicking' in 'Their goal was audacious: a robot capable of navigating obstacles to collect debris, mimicking environmental cleanup'")) {
                            return "Option A 'imitating' maintains participle form. B shifts form, C is future, and D is past. A is correct.";
                        } else if (questionText.includes("Which pronoun corrects 'The coach, however, took notes, impressed by the innovation'")) {
                            return "Option C 'his or her' matches singular 'coach.' A is plural, B shifts number, and D keeps the original. C is correct.";
                        } else if (questionText.includes("Which phrase replaces 'to optimize' in 'Ava, a coding enthusiast, wrote algorithms to optimize the robot’s pathfinding'")) {
                            return "Option A 'to improve' clarifies Ava’s goal. B is vague, C shifts meaning, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision best combines 'The demo wasn’t flawless; a sensor misfired once'")) {
                            return "Option B 'as' links clauses smoothly. A is wordy, C shifts logic, and D is causal. B is correct.";
                        } else if (questionText.includes("Which revision to 'Naysayers whispered—could students solve real-world problems?'")) {
                            return "Option B preserves doubtful tone. A is informal, C shifts tone, and D keeps the original. B is correct.";
                        } else if (questionText.includes("Which punctuation corrects 'Past prototypes had failed; one crashed during a test run, scattering parts'")) {
                            return "Option A uses a comma for clarity. B misuses a colon, C is incorrect, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence best follows 'Yet as the robot completed its course, Ava sensed victory'")) {
                            return "Option B reinforces success with future plans. A is logistical, C is neutral, and D shifts focus. B is correct.";
                        } else if (questionText.includes("Which revision corrects the verb tense in 'Spectators leaned in as Ava detailed the code’s logic'")) {
                            return "Option A 'had leaned' matches past context. B shifts tense, C is incorrect, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision to 'a mechanical wizard' enhances specificity")) {
                            return "Option A 'a skilled engineer' specifies Lucas’s role. B is vague, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains a misplaced modifier")) {
                            return "Option D is correct; no misplaced modifiers exist. A, B, and C are clear. D is correct.";
                        } else if (questionText.includes("Which transition phrase, inserted before 'The coach, however, took notes, impressed by the innovation'")) {
                            return "Option B 'In contrast' highlights approval vs. doubt. A suggests timing, C is an example, and D is causal. B is correct.";
                        } else if (questionText.includes("Which phrase replaces 'with precision' in 'Lucas demonstrated the robot’s arm, which scooped mock debris with precision'")) {
                            return "Option A 'with accuracy' sharpens technical focus. B shifts meaning, C is vague, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision to 'Nevertheless, their resolve strengthened' emphasizes perseverance")) {
                            return "Option A 'determination endured' intensifies resilience. B is weaker, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains an error in parallel structure")) {
                            return "Option D is correct; no parallelism errors exist. A, B, and C are consistent. D is correct.";
                        }
                    
                        // English Questions (Passage 4: Community Garden Initiative)
                        if (questionText.includes("Which punctuation corrects the sentence 'For weeks, the group—led by seniors Mia Torres and Noah Lee—had prepared tirelessly, tilling soil and selecting seeds'")) {
                            return "Option B retains correct dashes and commas. A omits commas, C misplaces a comma, and D disrupts structure. B is correct.";
                        } else if (questionText.includes("Which word replaces 'fostering' in 'Their mission was ambitious: a sustainable garden to supply fresh produce, fostering unity and health'")) {
                            return "Option A 'promoting' maintains participle form. B shifts form, C is future, and D is past. A is correct.";
                        } else if (questionText.includes("Which pronoun corrects 'The park manager, however, nodded approvingly, sketching plans for expansion'")) {
                            return "Option C 'his or her' matches singular 'manager.' A is plural, B shifts number, and D keeps the original. C is correct.";
                        } else if (questionText.includes("Which phrase replaces 'to maximize' in 'Mia, a botany enthusiast, designed planting layouts to maximize yield'")) {
                            return "Option A 'to increase' clarifies Mia’s goal. B is vague, C shifts meaning, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision best combines 'The garden wasn’t perfect; a few plants wilted'")) {
                            return "Option B 'as' links clauses smoothly. A is wordy, C shifts logic, and D is causal. B is correct.";
                        } else if (questionText.includes("Which revision to 'Critics muttered—could students sustain such a project?'")) {
                            return "Option B preserves skeptical tone. A is informal, C shifts tone, and D keeps the original. B is correct.";
                        } else if (questionText.includes("Which punctuation corrects 'Early efforts had stumbled; a water shortage threatened the seedlings'")) {
                            return "Option A uses a comma for clarity. B misuses a colon, C is incorrect, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence best follows 'Yet as green shoots emerged, Mia felt hope'")) {
                            return "Option B emphasizes community commitment. A is logistical, C is neutral, and D shifts focus. B is correct.";
                        } else if (questionText.includes("Which revision corrects the verb tense in 'Neighbors watched, some joining in, as Mia explained crop rotation benefits'")) {
                            return "Option A 'had watched' matches past context. B shifts tense, C is incorrect, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision to 'a botany enthusiast' enhances specificity")) {
                            return "Option A 'a skilled plant scientist' specifies Mia’s expertise. B is vague, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains a misplaced modifier")) {
                            return "Option D is correct; no misplaced modifiers exist. A, B, and C are clear. D is correct.";
                        } else if (questionText.includes("Which transition phrase, inserted before 'The park manager, however, nodded approvingly'")) {
                            return "Option B 'In contrast' highlights approval vs. doubt. A suggests timing, C is an example, and D is causal. B is correct.";
                        } else if (questionText.includes("Which phrase replaces 'his passion infectious' in 'Noah shared the garden’s vision, his passion infectious'")) {
                            return "Option A 'his zeal contagious' sharpens inspirational focus. B shifts meaning, C is vague, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision to 'Still, their commitment endured' emphasizes resilience")) {
                            return "Option A 'resolve persisted' intensifies perseverance. B is weaker, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains an error in parallel structure")) {
                            return "Option D is correct; no parallelism errors exist. A, B, and C are consistent. D is correct.";
                        }
                    
                        // English Questions (Passage 5: Theater Production)
                        if (questionText.includes("Which punctuation corrects the sentence 'For months, the troupe—directed by juniors Emma Wright and Liam Brooks—had memorized lines and built sets'")) {
                            return "Option B retains correct dashes and commas. A omits commas, C misplaces a comma, and D disrupts structure. B is correct.";
                        } else if (questionText.includes("Which word replaces 'blending' in 'Their aim was bold: a modern retelling of a classic play, blending tradition with innovation'")) {
                            return "Option A 'combining' maintains participle form. B shifts form, C is future, and D is past. A is correct.";
                        } else if (questionText.includes("Which pronoun corrects 'The drama teacher, however, clapped enthusiastically, noting the fresh perspective'")) {
                            return "Option C 'his or her' matches singular 'teacher.' A is incorrect, B shifts number, and D keeps the original. C is correct.";
                        } else if (questionText.includes("Which phrase replaces 'to reflect' in 'Emma, a visionary storyteller, rewrote scenes to reflect current issues'")) {
                            return "Option A 'to address' clarifies Emma’s intent. B is vague, C shifts meaning, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision best combines 'The rehearsal wasn’t flawless; a prop fell during a scene'")) {
                            return "Option B 'as' links clauses smoothly. A is wordy, C shifts logic, and D is causal. B is correct.";
                        } else if (questionText.includes("Which revision to 'Skeptics whispered—could students reinterpret a classic convincingly?'")) {
                            return "Option B preserves skeptical tone. A is informal, C shifts tone, and D keeps the original. B is correct.";
                        } else if (questionText.includes("Which punctuation corrects 'Initial rehearsals had faltered; a lead actor dropped out unexpectedly'")) {
                            return "Option A uses a comma for clarity. B misuses a colon, C is incorrect, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence best follows 'Still, as the curtain fell, Emma felt pride'")) {
                            return "Option B emphasizes troupe’s commitment. A is logistical, C is neutral, and D shifts focus. B is correct.";
                        } else if (questionText.includes("Which revision corrects the verb tense in 'Audience members, invited for a preview, gasped as Emma explained the play’s themes'")) {
                            return "Option A 'had gasped' matches past context. B shifts tense, C is incorrect, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision to 'a visionary storyteller' enhances specificity")) {
                            return "Option A 'a creative playwright' specifies Emma’s role. B is vague, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains a misplaced modifier")) {
                            return "Option D is correct; no misplaced modifiers exist. A, B, and C are clear. D is correct.";
                        } else if (questionText.includes("Which transition phrase, inserted before 'The drama teacher, however, clapped enthusiastically'")) {
                            return "Option B 'In contrast' highlights enthusiasm vs. skepticism. A suggests timing, C is an example, and D is causal. B is correct.";
                        } else if (questionText.includes("Which phrase replaces 'his focus razor-sharp' in 'Liam adjusted lighting, his focus razor-sharp'")) {
                            return "Option A 'his concentration precise' sharpens technical focus. B shifts meaning, C is vague, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which revision to 'Yet their spirit held strong' emphasizes resilience")) {
                            return "Option A 'resolve remained steadfast' intensifies perseverance. B is weaker, C shifts focus, and D keeps the original. A is correct.";
                        } else if (questionText.includes("Which sentence contains an error in parallel structure")) {
                            return "Option D is correct; no parallelism errors exist. A, B, and C are consistent. D is correct.";
                        }
                    
                        // Math Questions
                        if (questionText.includes("Solve for x in the equation 2x + 5 = 11")) {
                            return "Subtract 5: 2x = 6. Divide by 2: x = 3. Option B) 3 is correct. A) 2, C) 4, and D) 5 do not satisfy the equation.";
                        } else if (questionText.includes("What is the area of a rectangle with length 8 and width 3")) {
                            return "Area = length × width = 8 × 3 = 24. Option B) 24 is correct. A) 11, C) 22, and D) 30 miscalculate.";
                        } else if (questionText.includes("If f(x) = x² + 2x + 1, what is f(3)")) {
                            return "f(3) = 3² + 2(3) + 1 = 9 + 6 + 1 = 16. Option B) 16 is correct. A) 10, C) 12, and D) 14 are incorrect.";
                        } else if (questionText.includes("What is the slope of the line passing through points (2, 3) and (4, 7)")) {
                            return "Slope = (y₂ - y₁)/(x₂ - x₁) = (7 - 3)/(4 - 2) = 4/2 = 2. Option B) 2 is correct. A) 1, C) 3, and D) 4 miscalculate.";
                        } else if (questionText.includes("Solve for x: 3x - 7 = 5x + 1")) {
                            return "Subtract 3x: -7 = 2x + 1. Subtract 1: -8 = 2x. Divide by 2: x = -4. Option A) -4 is correct. B) -2, C) 2, and D) 4 are incorrect.";
                        } else if (questionText.includes("What is the circumference of a circle with radius 5")) {
                            return "Circumference = 2πr = 2π(5) = 10π. Option A) 10π is correct. B) 15π, C) 20π, and D) 25π miscalculate.";
                        } else if (questionText.includes("If log₂(x) = 3, what is x")) {
                            return "log₂(x) = 3 means 2³ = x, so x = 8. Option B) 8 is correct. A) 6, C) 9, and D) 12 are not 2³.";
                        } else if (questionText.includes("What is the value of sin(30°)")) {
                            return "For a 30-60-90 triangle, sin(30°) = opposite/hypotenuse = 1/2. Option A) 1/2 is correct. B) √2/2, C) √3/2, and D) 1 are incorrect.";
                        } else if (questionText.includes("A box contains 4 red and 6 blue marbles. What is the probability of drawing a red marble")) {
                            return "Probability = favorable/total = 4/(4+6) = 4/10 = 2/5. Option A) 2/5 is correct. B) 3/5, C) 1/2, and D) 4/5 miscalculate.";
                        } else if (questionText.includes("Solve the quadratic equation x² - 4x - 5 = 0")) {
                            return "Factor: (x - 5)(x + 1) = 0. Solutions: x = 5, -1. Option A) x = 5, -1 is correct. B) 4, -1, C) 5, 1, and D) 4, 1 are incorrect.";
                        } else if (questionText.includes("What is the distance between points (1, 2) and (4, 6)")) {
                            return "Distance = √((x₂ - x₁)² + (y₂ - y₁)²) = √((4-1)² + (6-2)²) = √(9 + 16) = √25 = 5. Option B) 5 is correct. A) 3, C) 6, and D) 7 are incorrect.";
                        } else if (questionText.includes("If f(x) = 2x + 3 and g(x) = x - 1, what is f(g(2))")) {
                            return "g(2) = 2 - 1 = 1. f(1) = 2(1) + 3 = 5. Option B) 5 is correct. A) 3, C) 7, and D) 9 miscalculate.";
                        } else if (questionText.includes("What is the value of 2³ × 3²")) {
                            return "2³ = 8, 3² = 9. 8 × 9 = 72. Option B) 72 is correct. A) 48, C) 96, and D) 108 miscalculate.";
                        } else if (questionText.includes("A car travels 120 miles in 2 hours. What is its average speed in miles per hour")) {
                            return "Speed = distance/time = 120/2 = 60 mph. Option B) 60 is correct. A) 50, C) 70, and D) 80 miscalculate.";
                        } else if (questionText.includes("What is the sum of the first 5 terms of the arithmetic sequence with first term 2 and common difference 3")) {
                            return "Terms: 2, 5, 8, 11, 14. Sum = 2 + 5 + 8 + 11 + 14 = 40. Option B) 40 is correct. A) 30, C) 45, and D) 50 are incorrect.";
                        } else if (questionText.includes("Solve for x: |x - 3| = 5")) {
                            return "x - 3 = 5 or x - 3 = -5. Solutions: x = 8, -2. Option A) x = 8, -2 is correct. B) 7, -1, C) 6, -2, and D) 8, -3 are incorrect.";
                        } else if (questionText.includes("What is the area of a triangle with base 6 and height 4")) {
                            return "Area = (1/2) × base × height = (1/2) × 6 × 4 = 12. Option B) 12 is correct. A) 10, C) 14, and D) 16 miscalculate.";
                        } else if (questionText.includes("If i² = -1, what is the value of (3 + 2i)(1 - i)")) {
                            return "Expand: (3 + 2i)(1 - i) = 3 - 3i + 2i - 2i² = 3 - i + 2 = 5 - i. Option A) 5 - i is correct. B) 3 + i, C) 5 + i, and D) 3 - i are incorrect.";
                        } else if (questionText.includes("What is the value of cos(60°)")) {
                            return "For a 30-60-90 triangle, cos(60°) = adjacent/hypotenuse = 1/2. Option A) 1/2 is correct. B) √2/2, C) √3/2, and D) 1 are incorrect.";
                        } else if (questionText.includes("A store offers a 20% discount on a $50 item. What is the sale price")) {
                            return "Discount = 0.2 × 50 = $10. Sale price = 50 - 10 = $40. Option B) $40 is correct. A) $30, C) $45, and D) $48 miscalculate.";
                        } else if (questionText.includes("Solve for x: x² + 2x - 8 = 0")) {
                            return "Factor: (x + 4)(x - 2) = 0. Solutions: x = -4, 2. Option A) x = 2, -4 is correct. B) 4, -2, C) 3, -3, and D) 2, -2 are incorrect.";
                        } else if (questionText.includes("What is the sum of the interior angles of a pentagon")) {
                            return "Sum = (n - 2) × 180°, n = 5: (5 - 2) × 180 = 540°. Option B) 540° is correct. A) 360°, C) 720°, and D) 900° miscalculate.";
                        } else if (questionText.includes("If log₃(27) = x, what is x")) {
                            return "27 = 3³, so log₃(27) = 3. Option B) 3 is correct. A) 2, C) 4, and D) 5 are incorrect.";
                        } else if (questionText.includes("A bag contains 5 green and 3 yellow candies. What is the probability of drawing two green candies in a row without replacement")) {
                            return "P(first green) = 5/8, P(second green) = 4/7. P(both) = (5/8) × (4/7) = 20/56 = 5/14. Option B) 5/14 is correct. A) 5/16, C) 3/14, and D) 3/16 miscalculate.";
                        } else if (questionText.includes("What is the vertex of the parabola y = x² - 4x + 3")) {
                            return "Vertex x = -b/(2a) = -(-4)/(2×1) = 2. y = 2² - 4(2) + 3 = -1. Vertex: (2, -1). Option A) (2, -1) is correct. B) (2, 1), C) (4, -1), and D) (4, 1) are incorrect.";
                        } else if (questionText.includes("What is the value of 4! (factorial)")) {
                            return "4! = 4 × 3 × 2 × 1 = 24. Option B) 24 is correct. A) 12, C) 36, and D) 48 miscalculate.";
                        } else if (questionText.includes("A rectangular prism has a volume of 120, length 5, and width 4. What is its height")) {
                            return "Volume = l × w × h. 120 = 5 × 4 × h, h = 120/20 = 6. Option B) 6 is correct. A) 4, C) 8, and D) 10 are incorrect.";
                        } else if (questionText.includes("If f(x) = x³ - x, what is f(-2)")) {
                            return "f(-2) = (-2)³ - (-2) = -8 + 2 = -6. Option A) -6 is correct. B) -4, C) 4, and D) 6 are incorrect.";
                        } else if (questionText.includes("What is the midpoint of the segment joining (1, 3) and (5, 7)")) {
                            return "Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ((1+5)/2, (3+7)/2) = (3, 5). Option B) (3, 5) is correct. A) (2, 4), C) (4, 6), and D) (5, 5) are incorrect.";
                        } else if (questionText.includes("Solve for x: 2^x = 16")) {
                            return "16 = 2⁴, so 2^x = 2⁴, x = 4. Option C) 4 is correct. A) 2, B) 3, and D) 5 are incorrect.";
                        } else if (questionText.includes("What is the value of tan(45°)")) {
                            return "For a 45-45-90 triangle, tan(45°) = opposite/adjacent = 1/1 = 1. Option B) 1 is correct. A) 0, C) √2, and D) √3 are incorrect.";
                        } else if (questionText.includes("A train travels 200 miles in 4 hours, then 150 miles in 2 hours. What is its average speed for the entire trip")) {
                            return "Total distance = 200 + 150 = 350 miles. Total time = 4 + 2 = 6 hours. Speed = 350/6 ≈ 58.33 mph. Option B) 58.33 mph is correct. A) 50, C) 60, and D) 65 miscalculate.";
                        } else if (questionText.includes("What is the 10th term of the geometric sequence 2, 6, 18, ...")) {
                            return "Common ratio = 6/2 = 3. nth term = a₁ × r^(n-1). 10th term = 2 × 3⁹ = 2 × 19683 = 39366. Option B) 39366 is correct. A) 13122, C) 118098, and D) 354294 are incorrect.";
                        } else if (questionText.includes("Solve for x: 3x² - 12x + 9 = 0")) {
                            return "Divide by 3: x² - 4x + 3 = 0. Factor: (x - 3)(x - 1) = 0. Solutions: x = 3, 1. Primary solution: x = 3. Option B) 3 is correct. A) 1, C) 2, -2, and D) 3, -1 are incorrect for primary focus.";
                        } else if (questionText.includes("What is the volume of a cylinder with radius 3 and height 5")) {
                            return "Volume = πr²h = π(3)²(5) = 45π. Option B) 45π is correct. A) 30π, C) 60π, and D) 75π miscalculate.";
                        } else if (questionText.includes("If (2 + i) + (3 - 2i) = a + bi, what are a and b")) {
                            return "Combine: (2 + i) + (3 - 2i) = 5 - i. a = 5, b = -1. Option A) a = 5, b = -1 is correct. B) a = 5, b = 1, C) a = 3, b = -1, and D) a = 3, b = 1 are incorrect.";
                        } else if (questionText.includes("A committee of 3 people is chosen from 5 candidates. How many different committees are possible")) {
                            return "Combinations: C(5,3) = 5!/(3!2!) = 10. Option A) 10 is correct. B) 15, C) 20, and D) 25 miscalculate.";
                        } else if (questionText.includes("What is the slope-intercept form of the line 2x - 3y = 6")) {
                            return "Solve: -3y = -2x + 6, y = (2/3)x - 2. Option A) y = (2/3)x - 2 is correct. B) y = (2/3)x + 2, C) y = -(2/3)x - 2, and D) y = -(2/3)x + 2 are incorrect.";
                        } else if (questionText.includes("A store sells shirts for $20 each or 3 for $50. What is the savings per shirt when buying 3")) {
                            return "Regular: 3 × $20 = $60. Deal: $50. Savings = $60 - $50 = $10. Per shirt: $10/3 ≈ $3.67. Option B) $3.67 is correct. A) $3.33, C) $4.00, and D) $4.33 miscalculate.";
                        } else if (questionText.includes("What is the period of the function y = sin(2x)")) {
                            return "Period of sin(bx) = 2π/b. b = 2, period = π. Option A) π is correct. B) 2π, C) π/2, and D) 4π are incorrect.";
                        } else if (questionText.includes("Solve for x: 4^(x+1) = 16")) {
                            return "16 = 4², so 4^(x+1) = 4², x + 1 = 2, x = 1. Option A) 1 is correct. B) 2, C) 3, and D) 4 are incorrect.";
                        } else if (questionText.includes("What is the area of a circle inscribed in a square with side length 6")) {
                            return "Diameter = side = 6, radius = 3. Area = πr² = π(3)² = 9π. Option A) 9π is correct. B) 12π, C) 18π, and D) 36π miscalculate.";
                        } else if (questionText.includes("If f(x) = 2x + 1, what is the inverse function f⁻¹(x)")) {
                            return "y = 2x + 1, x = (y - 1)/2. f⁻¹(x) = (x - 1)/2. Option A) (x - 1)/2 is correct. B) (x + 1)/2, C) 2x - 1, and D) 2x + 1 are incorrect.";
                        } else if (questionText.includes("A bag has 4 red, 3 blue, and 2 green balls. What is the probability of drawing a blue or green ball")) {
                            return "Favorable = 3 + 2 = 5. Total = 9. Probability = 5/9. Option A) 5/9 is correct. B) 4/9, C) 3/9, and D) 2/9 miscalculate.";
                        } else if (questionText.includes("What is the sum of the roots of the quadratic equation 2x² - 8x + 6 = 0")) {
                            return "Sum = -b/a. a = 2, b = -8: -(-8)/2 = 4. Option B) 4 is correct. A) 2, C) 6, and D) 8 are incorrect.";
                        } else if (questionText.includes("What is the surface area of a cube with edge length 4")) {
                            return "Surface area = 6a² = 6(4)² = 96. Option B) 96 is correct. A) 64, C) 128, and D) 144 miscalculate.";
                        } else if (questionText.includes("If log₅(x) + log₅(25) = 3, what is x")) {
                            return "log₅(25) = 2. log₅(x) + 2 = 3, log₅(x) = 1, x = 5¹ = 5. Option A) 1 is correct. B) 5, C) 25, and D) 125 are incorrect.";
                        } else if (questionText.includes("A boat travels 20 miles upstream in 4 hours and 20 miles downstream in 2 hours. What is the speed of the current")) {
                            return "Upstream: 20/(b - c) = 4, b - c = 5. Downstream: 20/(b + c) = 2, b + c = 10. Solve: b = 7.5, c = 2.5. Option A) 2.5 mph is correct. B) 3, C) 3.5, and D) 4 are incorrect.";
                        } else if (questionText.includes("What is the amplitude of the function y = 3cos(2x)")) {
                            return "Amplitude = |a|. a = 3, amplitude = 3. Option C) 3 is correct. A) 1, B) 2, and D) 4 are incorrect.";
                        } else if (questionText.includes("Solve for x: x⁴ - 5x² + 4 = 0")) {
                            return "Let u = x². u² - 5u + 4 = 0, (u - 4)(u - 1) = 0, u = 4, 1. x² = 4 or 1, x = ±2, ±1. Option A) x = ±1, ±2 is correct. B) ±1, ±3, C) ±2, ±3, and D) ±1, ±4 are incorrect.";
                        } else if (questionText.includes("What is the equation of a circle with center (2, -3) and radius 5")) {
                            return "(x - h)² + (y - k)² = r². Center (2, -3), r = 5: (x - 2)² + (y + 3)² = 25. Option A) (x - 2)² + (y + 3)² = 25 is correct. Others are incorrect.";
                        } else if (questionText.includes("What is the 6th term of the arithmetic sequence with first term 5 and common difference -2")) {
                            return "nth term = a₁ + (n-1)d. 6th term = 5 + (6-1)(-2) = 5 - 10 = -5. Option A) -5 is correct. B) -3, C) 0, and D) 3 are incorrect.";
                        } else if (questionText.includes("If (1 + i)² = a + bi, what are a and b")) {
                            return "(1 + i)² = 1 + 2i + i² = 1 + 2i - 1 = 2i. a = 0, b = 2. Option A) a = 0, b = 2 is correct. B) a = 2, b = 0, C) a = 1, b = 1, and D) a = 0, b = 1 are incorrect.";
                        }
                    
                        // Reading Questions (Passage 1: The Lighthouse Keeper’s Legacy)
                        if (questionText.includes("What is the primary reason Clara continues to tend the lighthouse despite automation")) {
                            return "Clara’s nightly climbs and distress signal response show duty. Option B) a deep sense of duty is correct. A) lacks recognition evidence, C) distrust is secondary, D) no successor training. B is correct.";
                        } else if (questionText.includes("The phrase ‘hermit of the light’ primarily suggests the townspeople view Clara as")) {
                            return "‘Hermit’ implies solitude, aligning with eccentricity whispers. Option B) an isolated oddity is correct. A) revered hero is post-heroism, C) skilled technician is unsupported, D) reluctant leader lacks evidence.";
                        } else if (questionText.includes("The description of the lighthouse in the first sentence primarily serves to")) {
                            return "‘Sentinel,’ ‘jagged cliffs,’ ‘fog’ set a vivid scene. Option B) establish a vivid setting is correct. A) isolation is secondary, C) storm is later, D) town history is unsupported.";
                        } else if (questionText.includes("What can be inferred about Clara’s relationship with her father")) {
                            return "Inheritance and teaching suggest a close mentorship. Option B) close and instructional is correct. A) distant, C) strained, and D) financial lack evidence.";
                        } else if (questionText.includes("The lighthouse primarily symbolizes Clara’s")) {
                            return "‘Heart’s anchor’ ties the lighthouse to Clara’s duty. Option B) sense of purpose is correct. A) technology struggle is secondary, C) fear of change is unsupported, D) town connection is minor.";
                        } else if (questionText.includes("What motivates Clara to save the fishing boat")) {
                            return "Clara’s immediate action reflects duty. Option B) a sense of responsibility is correct. A) fame, C) proving flaws, and D) fear lack evidence.";
                        } else if (questionText.includes("How does Clara’s character develop over the passage")) {
                            return "From ‘hermit’ to town-supported, Clara shifts to acceptance. Option B) from isolated to embraced is correct. A) no fear, C) confidence is consistent, D) not traditional.";
                        } else if (questionText.includes("The storm primarily serves as a")) {
                            return "The storm triggers Clara’s heroism. Option B) catalyst for Clara’s heroism is correct. A) loneliness is secondary, C) automation is unrelated, D) town chaos lacks evidence.";
                        } else if (questionText.includes("What is the main theme of the passage")) {
                            return "Clara’s duty despite automation is central. Option B) the value of steadfast duty is correct. A) technology is secondary, C) acceptance is partial, D) coastal life is minor.";
                        } else if (questionText.includes("The passage’s structure primarily relies on")) {
                            return "The chronological narrative follows Clara’s journey. Option A) chronological narration is correct. B) no alternating perspectives, C) not thematic, D) not vignettes.";
                    


                        // Reading Questions (Passage 2: Urban Farming Movement)
                         } else if (questionText.includes("What is the primary purpose of the passage")) {
                            return "The passage balances benefits and challenges of urban farming. Option B) highlight the benefits and challenges is correct. A) critique is minor, C) not replacing agriculture, D) not economic recovery.";
                        } else if (questionText.includes("The word ‘spearheads’ most nearly means")) {
                            return "‘Spearheads’ implies leading efforts. Option B) leads is correct. A) funds, C) designs, and D) promotes are less precise.";
                        } else if (questionText.includes("The 2020 report is cited to")) {
                            return "The report supports Wells’ community bond claim. Option B) support Wells’ views on community is correct. A) zoning, C) contamination, and D) agriculture are unrelated.";
                        } else if (questionText.includes("It can be inferred that Detroit’s industrial decline contributed to")) {
                            return "Vacant lots from decline enabled gardens. Option B) increased vacant lots is correct. A) zoning, C) yields, and D) ties lack evidence.";
                        } else if (questionText.includes("The ‘tapestry of green’ symbolizes")) {
                            return "Wells’ vision of gardens on every block suggests interconnected farms. Option B) interconnected urban farms is correct. A) recovery, C) traditional agriculture, D) remediation are less relevant.";
                        } else if (questionText.includes("What motivates Aisha Wells to lead the Green Roots Collective")) {
                            return "Wells’ focus on community bonds drives her. Option B) enhancing community ties is correct. A) financial, C) opposing agriculture, D) political lack evidence.";
                        } else if (questionText.includes("How does the passage develop the idea of urban farming’s impact")) {
                            return "The passage details benefits and obstacles. Option B) detailing benefits and obstacles is correct. A) rural contrast is minor, C) costs are partial, D) political support is secondary.";
                        } else if (questionText.includes("The reference to critics primarily serves to")) {
                            return "Critics’ resource diversion view contrasts proponents. Option B) highlight a contrasting viewpoint is correct. A) dismissal, C) remediation, D) undermining Wells are incorrect.";
                        } else if (questionText.includes("What is the main theme of the passage")) {
                            return "Urban farming transforms communities. Option B) transformative power of community action is correct. A) economic, C) traditional agriculture, D) industrial recovery are secondary.";
                        } else if (questionText.includes("The passage’s structure is best described as")) {
                            return "The passage provides an overview with details. Option B) an overview with supporting details is correct. A) not Wells’ life, C) not policy critique, D) not comparison.";
                    
                        // Reading Questions (Passage 3: The Art of Glassblowing)
                        }else if (questionText.includes("The primary purpose of the passage is to")) {
                            return "The passage describes Vasquez’s artistry. Option B) describe Vasquez’s glassblowing artistry is correct. A) not practicality, C) history is secondary, D) not trends.";
                        } else if (questionText.includes("The word ‘finesse’ most nearly means")) {
                            return "‘Finesse’ implies skillful precision in glassblowing. Option B) skill is correct. A) strength, C) patience, D) creativity are less precise.";
                        } else if (questionText.includes("The reference to Venice primarily serves to")) {
                            return "Venice underscores Vasquez’s elite training. Option A) highlight Vasquez’s prestige is correct. B) not origins, C) not contrast, D) not travels.";
                        } else if (questionText.includes("It can be inferred that Vasquez’s sculptures are inspired by")) {
                            return "‘Ocean waves or starry skies’ suggest natural inspiration. Option B) natural phenomena is correct. A) events, C) designs, D) memories lack evidence.";
                        } else if (questionText.includes("The chandelier symbolizes Vasquez’s view of")) {
                            return "Vasquez’s reflection links the chandelier to creation’s fragility. Option B) creation’s fragility is correct. A) excess, C) progress, D) continuity are incorrect.";
                        } else if (questionText.includes("What motivates Vasquez to create her sculptures")) {
                            return "Vasquez aims to inspire awe. Option B) inspiring awe is correct. A) financial, C) preservation, D) acclaim lack evidence.";
                        } else if (questionText.includes("How does Vasquez’s character develop in the passage")) {
                            return "Vasquez evolves into a mentor with apprentices. Option B) from artisan to teacher is correct. A) not traditionalist, C) not skeptic, D) not collaborative.";
                        } else if (questionText.includes("The metaphor ‘dance of heat and breath’ refers to")) {
                            return "‘Heat and breath’ describe glassblowing’s process. Option A) the physical act of glassblowing is correct. B) training, C) debate, D) exhibition are incorrect.";
                        } else if (questionText.includes("What is the main theme of the passage")) {
                            return "Vasquez’s reflection emphasizes beauty and fragility. Option B) balance of beauty and fragility is correct. A) tools, C) commercialization, D) decline are secondary.";
                        } else if (questionText.includes("The passage’s structure is best described as")) {
                            return "The passage profiles Vasquez’s work. Option B) a profile of an artist is correct. A) not historical, C) not critique, D) not manual.";
                    
                        // Reading Questions (Passage 4: Coral Reef Ecosystems)
                        }else if (questionText.includes("The primary purpose of the passage is to")) {
                            return "The passage outlines reefs’ ecosystems and challenges. Option A) describe coral reef ecosystems and their challenges is correct. B) not fishing critique, C) not scaffolds, D) not policies.";
                        } else if (questionText.includes("The phrase ‘rainforests of the sea’ most nearly means reefs are")) {
                            return "The comparison highlights biodiversity. Option B) rich in biodiversity is correct. A) unexplored, C) inaccessible, D) disappearing are incorrect.";
                        } else if (questionText.includes("The 2023 study is cited to")) {
                            return "The 30% bleaching statistic shows severity. Option B) illustrate bleaching’s severity is correct. A) not MPAs, C) not overfishing, D) not technology.";
                        } else if (questionText.includes("It can be inferred that coral bleaching primarily results from")) {
                            return "The passage links bleaching to ocean warming. Option B) ocean warming is correct. A) overfishing, C) pollution, D) enforcement are secondary.";
                        } else if (questionText.includes("The Coral Triangle symbolizes")) {
                            return "Vibrant ecosystems highlight biodiversity. Option B) marine biodiversity is correct. A) innovation, C) challenges, D) failures are incorrect.";
                        } else if (questionText.includes("What motivates Dr. Patel to advocate for MPAs")) {
                            return "Patel’s research focuses on ecosystem preservation. Option B) ecosystem preservation is correct. A) recognition, C) gain, D) influence lack evidence.";
                        } else if (questionText.includes("How does the passage develop the idea of reef conservation")) {
                            return "The passage outlines threats and solutions. Option B) outlining threats and solutions is correct. A) rainforest is minor, C) not Patel’s career, D) not fishing critique.";
                        } else if (questionText.includes("The reference to critics primarily serves to")) {
                            return "Critics’ fishing concerns introduce economic issues. Option B) highlight economic concerns is correct. A) dismissal, C) scaffolds, D) Patel’s research are incorrect.";
                        } else if (questionText.includes("What is the main theme of the passage")) {
                            return "Patel’s optimism emphasizes reef resilience. Option A) the resilience of coral reefs is correct. B) overfishing, C) cost, D) species decline are secondary.";
                        } else if (questionText.includes("The passage’s structure is best described as")) {
                            return "The passage overviews reefs with details. Option B) an overview with supporting details is correct. A) not Patel’s life, C) not policy critique, D) not comparison.";
                    
                        // Science Questions (Passage 1: Enzyme Activity)
                        } else if (questionText.includes("According to Table 1, at which temperature does enzyme X exhibit the highest reaction rate at pH 7.0")) {
                            return "Table 1: 20°C (10 µmol/min), 30°C (25), 40°C (40), 50°C (30), 60°C (15). Highest is 40 µmol/min at 40°C. Option C) 40°C is correct. A) 20°C, B) 30°C, D) 50°C are lower.";
                        } else if (questionText.includes("Based on Table 2, how does the reaction rate change as pH increases from 7.0 to 9.0 at 40°C")) {
                            return "Table 2: pH 7.0 (40 µmol/min), 8.0 (35), 9.0 (25). Rate decreases. Option B) Decreases steadily is correct. A) Increases, C) Constant, D) Increases then decreases are incorrect.";
                        } else if (questionText.includes("If a third experiment tested enzyme X at pH 6.0 and 50°C, what would be the most likely reaction rate")) {
                            return "Table 2: pH 6.0, 40°C (30 µmol/min). Table 1: pH 7.0, 50°C (30 µmol/min), 40°C (40). pH 6.0 reduces rate by 25%. At 50°C, ~25 µmol/min. Option B) 25 µmol/min is correct. A) 20, C) 30, D) 35 deviate.";
                        } else if (questionText.includes("What is the optimal condition for enzyme X activity based on the experiments")) {
                            return "Highest rate: 40 µmol/min at pH 7.0, 40°C (Tables 1, 2). Option B) pH 7.0, 40°C is correct. A) pH 6.0, C) pH 8.0, D) pH 9.0 are suboptimal.";
                        } else if (questionText.includes("Why did researchers likely keep pH constant in Experiment 1")) {
                            return "Constant pH (7.0) isolates temperature’s effect. Option A) To isolate the effect of temperature is correct. B) Maximize activity, C) Simplify data, D) Mimic conditions are less relevant.";
                        } else if (questionText.includes("If enzyme X were tested at 45°C and pH 7.5, the reaction rate would most likely be")) {
                            return "Table 1: 40°C, pH 7.0 (40 µmol/min), 50°C (30). Table 2: pH 7.0, 40°C (40), pH 8.0 (35). At 45°C, pH 7.5, rate ~30–35 µmol/min. Option B) between 30 and 35 µmol/min is correct. A) <30, C) 35–40, D) >40 deviate.";
                    
                        // Science Questions (Passage 2: Plant Growth Experiment)
                        }else if (questionText.includes("According to Figure 1, what is the optimal light intensity for pea plant growth")) {
                            return "Figure 1: 100 µmol/m²/s (5 cm), 200 (10), 300 (15), 400 (12), 500 (8). Highest is 15 cm at 300. Option C) 300 µmol/m²/s is correct. A) 100, B) 200, D) 400 are lower.";
                        } else if (questionText.includes("In Experiment 2, how does stem height change as water amount increases from 15 to 25 mL/day")) {
                            return "Figure 2: 15 mL/day (18 cm), 20 (16), 25 (14). Height decreases. Option B) Decreases steadily is correct. A) Increases, C) Constant, D) Increases then decreases are incorrect.";
                        } else if (questionText.includes("What is the optimal temperature for pea plant growth in Experiment 3")) {
                            return "Figure 3: 15°C (6 cm), 20°C (12), 25°C (15), 30°C (13), 35°C (9). Highest is 15 cm at 25°C. Option C) 25°C is correct. A) 15°C, B) 20°C, D) 30°C are lower.";
                        } else if (questionText.includes("If a fourth experiment tested plants at 200 µmol/m²/s, 15 mL/day, and 20°C")) {
                            return "Figure 1: 200 µmol/m²/s (10 cm). Figure 2: 15 mL/day (18 cm). Figure 3: 20°C (12 cm). Suboptimal conditions yield ~10 cm. Option B) 10 cm is correct. A) 8, C) 12, D) 14 deviate.";
                        } else if (questionText.includes("What was the purpose of keeping water constant in Experiment 1")) {
                            return "Constant water isolates light intensity’s effect. Option A) To isolate the effect of light intensity is correct. B) Survival, C) Costs, D) Natural conditions are less relevant.";
                        } else if (questionText.includes("Which variable was controlled in all three experiments")) {
                            return "No variable was controlled across all; each varied one (light, water, temperature). Option D) None were controlled in all is correct. A) Light, B) Water, C) Temperature are incorrect.";
                        } else if (questionText.includes("If plants were grown at 350 µmol/m²/s, 12 mL/day, and 22°C")) {
                            return "Figure 1: 300 µmol/m²/s (15 cm), 400 (12). Figure 2: 10 mL/day (15), 15 (18). Figure 3: 20°C (12), 25°C (15). Suboptimal conditions yield ~12–15 cm. Option B) between 12 and 15 cm is correct. A) <12, C) 15–18, D) >18 deviate.";
                    
                        // Science Questions (Passage 3: Pendulum Motion)
                        } else if (questionText.includes("According to Table 1, what is the period of a 1.5 m pendulum on the Moon")) {
                            return "Table 1: 1.5 m, Moon (6.10 s). Option C) 6.10 s is correct. A) 2.46, B) 4.98, D) 7.03 are incorrect.";
                        } else if (questionText.includes("How does the period change as pendulum length increases on Earth")) {
                            return "Table 1: Earth periods increase from 1.42 s (0.5 m) to 3.18 s (2.5 m). Option B) Increases is correct. A) Decreases, C) Constant, D) Unpredictable are incorrect.";
                        } else if (questionText.includes("Why is the period longer on the Moon than on Earth for the same pendulum length")) {
                            return "T = 2π√(L/g). Lower g (1.6 m/s² vs. 9.8) increases T. Option A) Lower gravitational acceleration is correct. B) Air resistance, C) Mass, D) Pressure are irrelevant.";
                        } else if (questionText.includes("If a pendulum of length 1.0 m were tested on a planet with g = 4.9 m/s²")) {
                            return "T = 2π√(1.0/4.9) ≈ 2.84 s. Option B) 2.84 s is correct. A) 2.01, C) 4.98, D) 6.10 are incorrect.";
                        } else if (questionText.includes("What assumption underlies the formula T = 2π√(L/g)")) {
                            return "The formula assumes no air resistance for simplicity. Option B) Air resistance is negligible is correct. A) Mass affects period, C) Gravity varies, D) Indefinite swings are incorrect.";
                        } else if (questionText.includes("If a 2.0 m pendulum were tested on a planet with a period of 4.0 s")) {
                            return "T = 2π√(L/g). 4.0 = 2π√(2.0/g), g ≈ 3.9 m/s². Option A) 3.9 m/s² is correct. B) 4.9, C) 5.9, D) 6.9 are incorrect.";
                    
                        // Science Questions (Passage 4: Chemical Reaction Rates)
                        }else if (questionText.includes("According to Table 1, how does the reaction rate change as [A] increases")) {
                            return "Table 1: [A] = 0.1 M (0.02 mol/L/s), 0.2 (0.08). Doubling [A] quadruples rate, indicating quadratic. Option B) Increases quadratically is correct. A) Linear, C) Decreases, D) Constant are incorrect.";
                        } else if (questionText.includes("What is the reaction rate when [B] is 0.15 M at 25°C with [A] = 0.2 M")) {
                            return "Table 2: [B] = 0.15 M, [A] = 0.2 M, 25°C (0.12 mol/L/s). Option C) 0.12 mol/L/s is correct. A) 0.04, B) 0.08, D) 0.16 are incorrect.";
                        } else if (questionText.includes("How does temperature affect the reaction rate in Experiment 3")) {
                            return "Table 3: 15°C (0.04 mol/L/s), 25°C (0.08), 35°C (0.16), 45°C (0.32). Rate doubles every 10°C, exponential. Option B) Increases exponentially is correct. A) Linear, C) Decreases, D) Constant are incorrect.";
                        } else if (questionText.includes("If [A] = 0.3 M, [B] = 0.05 M, and temperature = 35°C")) {
                            return "Rate = k[A]²[B]. Table 1: [A] = 0.3 M, [B] = 0.1 M (0.18 mol/L/s). Halve [B]: 0.09 mol/L/s. Table 3: 35°C doubles rate from 25°C (0.08 to 0.16), but [A], [B] yield 0.09. Option A) 0.09 mol/L/s is correct. B) 0.12, C) 0.16, D) 0.18 deviate.";
                        } else if (questionText.includes("What is the order of the reaction with respect to [A]")) {
                            return "Table 1: Doubling [A] from 0.1 M to 0.2 M quadruples rate (0.02 to 0.08), second-order. Option B) Second is correct. A) First, C) Third, D) Zero are incorrect.";
                        } else if (questionText.includes("Why was temperature kept constant in Experiment 2")) {
                            return "Constant temperature isolates [B]’s effect. Option A) To isolate the effect of [B] is correct. B) Stability, C) Errors, D) Industrial conditions are less relevant.";
                        } else if (questionText.includes("If the reaction were tested at [A] = 0.2 M, [B] = 0.1 M, and 40°C")) {
                            return "Table 3: 25°C, [A] = 0.2 M, [B] = 0.1 M (0.08 mol/L/s), 35°C (0.16). At 40°C, rate ~0.24 mol/L/s (between 0.16 and 0.32). Option B) 0.24 mol/L/s is correct. A) 0.12, C) 0.32, D) 0.48 deviate.";
                    
                        // Science Questions (Passage 5: Soil Permeability)
                        } else if (questionText.includes("According to Table 1, which soil has the highest permeability at 30 kPa")) {
                            return "Table 1: 30 kPa, sand (58 cm/h), loam (23), clay (7). Sand is highest. Option A) Sand is correct. B) Loam, C) Clay, D) All equal are incorrect.";
                        } else if (questionText.includes("How does temperature affect loam’s permeability in Experiment 2")) {
                            return "Table 2: loam, 10°C (21 cm/h), 20°C (22), 30°C (23), 40°C (24). Increases linearly. Option A) Increases linearly is correct. B) Decreases, C) Constant, D) Unpredictable are incorrect.";
                        } else if (questionText.includes("What is the effect of compaction on clay’s permeability in Experiment 3")) {
                            return "Table 3: clay, low (8 cm/h), medium (6), high (5). Decreases with compaction. Option B) Decreases with compaction is correct. A) Increases, C) Constant, D) Unpredictable are incorrect.";
                        } else if (questionText.includes("If sand is tested at 25 kPa, 15°C, and medium compaction")) {
                            return "Table 1: 20 kPa (55 cm/h), 30 kPa (58), sand at 25 kPa ~56.5 cm/h. Table 2: 10°C (52), 20°C (55), 15°C ~53.5 cm/h. Table 3: medium (55 cm/h). Average ~53 cm/h. Option B) 53 cm/h is correct. A) 50, C) 56, D) 59 deviate.";
                        } else if (questionText.includes("Why was temperature kept constant in Experiment 1")) {
                            return "Constant temperature isolates pressure’s effect. Option A) To isolate the effect of pressure is correct. B) Stability, C) Measurements, D) Field conditions are less relevant.";
                        } else if (questionText.includes("Which soil type is least affected by changes in compaction in Experiment 3")) {
                            return "Table 3: Sand 60 to 50 cm/h (16.7%), loam 25 to 20 (20%), clay 8 to 5 (37.5%). Sand least affected. Option A) Sand is correct. B) Loam, C) Clay, D) Equal are incorrect.";
                        } else if (questionText.includes("What assumption underlies the experiments’ design")) {
                            return "Experiments assume consistent water flow to isolate variables. Option B) Water flow is consistent across trials is correct. A) Soil type, C) Temperature, D) Compaction are incorrect.";
                    
                        // Science Questions (Passage 6: Theories of Cloud Formation)
                        }else if (questionText.includes("What is the primary difference between the scientists’ theories")) {
                            return "Scientist 1 uses aerosols, Scientist 2 turbulence. Option B) Scientist 1 focuses on aerosols, Scientist 2 on turbulence is correct. A) reverses, C) not altitude, D) not humidity.";
                        } else if (questionText.includes("What evidence supports Scientist 1’s theory")) {
                            return "75% of clouds with CCN supports Scientist 1. Option B) 75% of clouds with natural CCN is correct. A) radon, C) turbulence, D) precipitation are incorrect.";
                        } else if (questionText.includes("What is a weakness of Scientist 1’s theory")) {
                            return "High aerosols reducing precipitation is a drawback. Option B) High aerosols reduce precipitation is correct. A) turbulence, C) no aerosols, D) humidity are incorrect.";
                        } else if (questionText.includes("Which scientist’s theory is better suited for predicting high-altitude clouds")) {
                            return "Scientist 2 claims turbulence for high-altitude clouds. Option B) Scientist 2 is correct. A) Scientist 1, C) Both, D) Neither are incorrect.";
                        } else if (questionText.includes("A study finds that 90% of clouds form with low aerosol levels")) {
                            return "Low aerosol clouds weaken Scientist 1’s aerosol reliance. Option B) Weaken it is correct. A) Strengthen, C) No effect, D) Align are incorrect.";
                        } else if (questionText.includes("Which method is likely more challenging to implement for real-time prediction")) {
                            return "Turbulence is harder to measure. Option B) Scientist 2’s method is correct. A) Scientist 1, C) Both, D) Cannot be determined are incorrect.";
                        } else if (questionText.includes("If high aerosol levels are detected but no turbulence occurs")) {
                            return "Scientist 1 predicts clouds via aerosols. Option A) Scientist 1 is correct. B) Scientist 2, C) Both, D) Neither are incorrect.";
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
                    let storedResults = localStorage.getItem("actTestResults");
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
               
                    localStorage.setItem("actTestResults", JSON.stringify(results));
               
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
            
            