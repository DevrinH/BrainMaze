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
             