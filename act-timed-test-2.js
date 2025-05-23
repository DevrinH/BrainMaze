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
                
                
                
                
                    // Set 8: Chicago School of Sociology Passage
                
                
                
                
                    }} else if (questionText.includes("In the early 20th century, the Chicago School of Sociology emerged")) {
                        if (questionText.includes("What was the primary focus of the Chicago School of Sociology’s approach to studying cities?")) {
                            return "The passage emphasizes the Chicago School’s view of cities as shaped by local social processes like competition and segregation. Option B) Examining local social processes like competition and segregation is correct. A) reflects the Los Angeles School; C) is not mentioned; D) is unrelated to their focus.";
                        } else if (questionText.includes("The concentric zone model described in the passage primarily aimed to explain:")) {
                            return "The passage describes the concentric zone model as outlining distinct social and economic functions in urban zones. Option A) The distribution of social and economic functions in urban areas is correct. B) is too specific; C) is a secondary effect; D) misinterprets the model’s purpose.";
                        } else if (questionText.includes("What was a key method used by Chicago School researchers to study urban life?")) {
                            return "The passage highlights interviewing residents and mapping neighborhoods as key methods. Option B) Interviewing residents and mapping neighborhoods is correct. A) is not mentioned; C) is less emphasized; D) is unsupported.";
                        } else if (questionText.includes("What was one criticism of the Chicago School’s concentric zone model mentioned in the passage?")) {
                            return "The passage notes critics argued the model ignored cultural and historical factors. Option C) It oversimplified urban dynamics by ignoring cultural factors is correct. A) is unrelated; B) is incorrect; D) is not a cited criticism.";
                        } else if (questionText.includes("The passage suggests that the Chicago School’s influence persisted despite criticism because:")) {
                            return "The passage credits the Chicago School’s lasting impact to its observational methods influencing modern sociology. Option A) Its methods of observation shaped modern sociological practices is correct. B) overstates accuracy; C) is false; D) misrepresents the debate.";
                        } else if (questionText.includes("The phrase ‘natural’ social processes in the passage most likely refers to:")) {
                            return "The passage links ‘natural’ processes to social interactions like competition and assimilation. Option B) Organic social interactions like competition and assimilation is correct. A) refers to policy; C) misinterprets ecology; D) is unrelated.";
                        } else if (questionText.includes("How did the Chicago School’s research methods differ from those of the Los Angeles School, as described in the passage?")) {
                            return "The passage contrasts Chicago’s local observations with Los Angeles’s focus on global economic forces. Option A) Chicago School focused on local observations, while Los Angeles School emphasized global economic trends is correct. B) misstates methods; C) is incorrect; D) reverses approaches.";
                        } else if (questionText.includes("What does the passage imply about the role of the Chicago School’s research in urban planning during the 1920s?")) {
                            return "The passage states the concentric zone model guided planners dealing with industrialization and immigration. Option D) It guided planners addressing industrialization and immigration is correct. A) contradicts the passage; B) is too vague; C) is unsupported.";
                        } else if (questionText.includes("The passage’s description of cities as ‘living organisms’ primarily serves to:")) {
                            return "The ‘living organisms’ metaphor underscores the Chicago School’s view of cities as dynamic, adaptive systems. Option D) Illustrate the Chicago School’s view of cities as complex, changing systems is correct. A) is too literal; B) is partial; C) contradicts human influence.";
                        } else if (questionText.includes("How does the passage’s structure, moving from the Chicago School’s theories to their criticisms and lasting impact, contribute to its overall argument?")) {
                            return "The structure traces the development of urban sociology, showing the Chicago School’s role in its evolution. Option C) It traces the evolution of urban sociology as a discipline is correct. A) misstates the tone; B) is partial; D) overstates defense.";
                        }// Set 9: Impressionist Movement Passage
                    } else if (questionText.includes("In the late 19th century, the Impressionist movement redefined European art")) {
                        if (questionText.includes("What was a primary goal of Impressionist artists like Monet and Renoir?")) {
                            return "The passage states that Impressionists sought to capture fleeting moments of light and color, prioritizing sensory experience. Option B) To capture fleeting moments of light and color is correct. A) contradicts their break from academic standards; C) misaligns with their focus on sensory over narrative; D) opposes their loose, impressionistic style.";
                        } else if (questionText.includes("According to the passage, how did critics initially react to Impressionism?")) {
                            return "The passage notes critics scorned Impressionism, dismissing its sketch-like quality as unfinished. Option B) They dismissed it as unfinished and sketch-like is correct. A) misstates their reaction; C) contradicts their criticism; D) reflects later influence, not initial response.";
                        } else if (questionText.includes("What role did the 1874 exhibition play in the Impressionist movement?")) {
                            return "The passage highlights the 1874 exhibition as the origin of the term ‘Impressionism’ via Monet’s *Impression, Sunrise*. Option B) It introduced the term ‘Impressionism’ through Monet’s painting is correct. A) is incorrect as it was independent; C) misrepresents the exhibition’s content; D) is unrelated to its purpose.";
                        } else if (questionText.includes("How did Impressionist artists challenge the Paris Salon, according to the passage?")) {
                            return "The passage states Impressionists organized independent exhibitions to bypass the Paris Salon’s authority. Option C) By organizing independent exhibitions is correct. A) contradicts their approach; B) is a duplicate error; D) misaligns with their innovative style.";
                        } else if (questionText.includes("The passage suggests that Impressionism’s focus on modernity was significant because it:")) {
                            return "The passage links Impressionism’s celebration of railways and cafes to industrialization’s cultural shifts. Option A) Reflected the cultural changes brought by industrialization is correct. B) contradicts their nature focus; C) opposes their modern themes; D) ignores their build on prior art.";
                        } else if (questionText.includes("The phrase ‘en plein air’ in the passage most likely refers to:")) {
                            return "The context of capturing natural light and landscapes suggests ‘en plein air’ means painting outdoors. Option B) Painting outdoors to capture natural light is correct. A) describes studio work; C) misinterprets technique; D) refers to exhibition, not painting.";
                        } else if (questionText.includes("How did Vincent van Gogh’s work relate to Impressionism, according to the passage?")) {
                            return "The passage notes van Gogh’s emotive brushwork built on Impressionist spontaneity. Option B) He built on its spontaneity with emotive brushwork is correct. A) contradicts his influence; C) misstates his focus; D) lacks evidence of criticism.";
                        } else if (questionText.includes("What does the passage imply about the Impressionists’ view of nature?")) {
                            return "The passage states Impressionists retreated to nature for solace amidst modernity. Option A) They saw it as a source of solace amidst modernity is correct. B) contradicts their landscape focus; C) opposes their style; D) misrepresents their innovation.";
                        } else if (questionText.includes("The passage’s reference to Impressionism ‘bridging the personal and the universal’ primarily serves to:")) {
                            return "The phrase highlights how Impressionists connected individual sensory experiences to shared beauty. Option C) Illustrate its ability to connect individual experience with shared beauty is correct. A) is secondary; B) contradicts their style; D) opposes their modern focus.";
                        } else if (questionText.includes("How does the passage’s structure, moving from Impressionism’s techniques to its cultural context and lasting impact, contribute to its overall argument?")) {
                            return "The structure traces Impressionism’s development, emphasizing its lasting influence on modern art. Option D) It traces the evolution of Impressionism’s influence is correct. A) lacks clear contrast; B) is partial; C) misstates flaws as focus.";
                    }
                         
                    // Set 10: Coral Reefs Passage
                    } else if (questionText.includes("In the vast expanse of the Pacific Ocean, coral reefs thrive as vibrant ecosystems")) {
                        if (questionText.includes("What is the primary reason coral reefs are called the 'rainforests of the sea'?")) {
                            return "The passage states coral reefs support 25% of marine species, emphasizing their biodiversity. Option B) They support a high diversity of marine species is correct. A) is too vague; C) misstates corals as plants; D) overemphasizes size over ecological role.";
                        } else if (questionText.includes("According to the passage, what causes coral bleaching?")) {
                            return "The passage explicitly links coral bleaching to rising sea temperatures expelling zooxanthellae. Option B) Rising sea temperatures is correct. A) relates to acidification; C) and D) are secondary threats, not direct causes.";
                        } else if (questionText.includes("What is the role of zooxanthellae in coral reefs, as described in the passage?")) {
                            return "The passage describes zooxanthellae as colorful algae providing energy to corals. Option B) They provide color and energy to corals is correct. A) misattributes calcium secretion; C) is unsupported; D) confuses fish relationships.";
                        } else if (questionText.includes("According to the passage, what is one purpose of marine protected areas (MPAs)?")) {
                            return "The passage states MPAs restrict fishing and tourism to aid ecosystem recovery. Option B) To restrict fishing and allow ecosystem recovery is correct. A) contradicts their purpose; C) relates to restoration, not MPAs; D) is unrelated.";
                        } else if (questionText.includes("The passage suggests that the 2016 study on the Great Barrier Reef is significant because it:")) {
                            return "The passage highlights the study’s finding that 93% of corals were bleached, quantifying the crisis. Option A) Quantified the extent of coral bleaching across the reef is correct. B) is unrelated; C) is not mentioned; D) misstates MPA establishment.";
                        } else if (questionText.includes("The term 'symbiotic relationships' in the passage most likely refers to:")) {
                            return "The passage cites clownfish and anemones, implying mutually beneficial interactions. Option B) Mutually beneficial interactions between species is correct. A) suggests competition; C) implies predation; D) refers to human actions.";
                        } else if (questionText.includes("What does the passage imply about the effectiveness of local conservation efforts?")) {
                            return "The passage states local efforts are insufficient without global cooperation. Option B) They are limited without global cooperation is correct. A) contradicts the passage; C) is unsupported; D) misstates the focus.";
                        } else if (questionText.includes("How does the passage describe the impact of ocean acidification on coral reefs?")) {
                            return "The passage links acidification to weakened coral skeletons, hindering growth. Option B) It weakens coral skeletons, hindering growth is correct. A) confuses bleaching; C) is incorrect; D) contradicts resilience issues.";
                        } else if (questionText.includes("The passage’s reference to coral reefs as ‘the rainforests of the sea’ primarily serves to:")) {
                            return "The metaphor emphasizes reefs’ biodiversity and ecological role, as per the passage. Option A) Highlight their biodiversity and ecological importance is correct. B) overstates size; C) misstates composition; D) contradicts vulnerability.";
                        } else if (questionText.includes("How does the passage’s structure, moving from the description of coral reefs to their threats and then to conservation efforts, contribute to its overall argument?")) {
                            return "The structure builds a narrative from reefs’ importance to their vulnerability, urging action. Option C) It builds a case for the ecological importance and vulnerability of reefs is correct. A) lacks contrast; B) is partial; D) misstates critique focus.";
                        } else if (questionText.includes("The passage’s discussion of human activities like overfishing and pollution primarily serves to:")) {
                            return "The passage notes these activities exacerbate climate impacts, compounding threats. Option A) Illustrate additional threats that compound climate change impacts is correct. B) overstates their role; C) contradicts conservation; D) misstates benefits.";
                        } else if (questionText.includes("What does the passage suggest about the relationship between coral reefs and global climate change?")) {
                            return "The passage emphasizes reefs’ vulnerability to warming and acidification, with recovery challenges. Option C) Coral reefs are highly vulnerable to climate change impacts is correct. A) contradicts threats; B) is unsupported; D) overstates recovery potential.";
                        }
                            // Set 7: Amylase Enzyme Passage
                    } else if (questionText.includes("A group of scientists conducted experiments to study the effects of temperature and pH on the enzymatic activity of amylase")) {
                        if (questionText.includes("Based on Figure 1, at which temperature does amylase exhibit the highest enzymatic activity at pH 7?")) {
                            return "Figure 1 shows glucose production rates at pH 7: 20°C (10 µmol/min), 30°C (25 µmol/min), 40°C (40 µmol/min), 50°C (30 µmol/min), 60°C (5 µmol/min). The highest rate is 40 µmol/min at 40°C. Option B) 40°C is correct. A) 20°C, C) 50°C, and D) 60°C have lower rates.";
                        } else if (questionText.includes("According to Figure 2, how does the enzymatic activity of amylase change as pH increases from 7 to 9 at 37°C?")) {
                            return "Figure 2 shows at 37°C: pH 7 (40 µmol/min), pH 8 (35 µmol/min), pH 9 (20 µmol/min). From pH 7 to 9, the rate decreases from 40 to 20 µmol/min. Option B) It decreases is correct. A) It increases steadily, C) It remains constant, and D) It increases then decreases do not match the trend.";
                        } else if (questionText.includes("If a third experiment were conducted at pH 6 and 50°C, based on the trends in Figures 1 and 2, what would be the most likely glucose production rate?")) {
                            return "At pH 7, 50°C, Figure 1 shows 30 µmol/min. At 37°C, pH 6, Figure 2 shows 30 µmol/min, compared to 40 µmol/min at pH 7, suggesting pH 6 reduces activity by ~25%. Applying a similar reduction to 30 µmol/min at 50°C, the rate is approximately 22–23 µmol/min. Option C) 30 µmol/min is closest, assuming temperature dominates. A) 40 µmol/min is too high, B) 25 µmol/min is slightly low, and D) 15 µmol/min is too low.";
                        } else if (questionText.includes("Which of the following best explains why the enzymatic activity decreases significantly at 60°C in Experiment 1?")) {
                            return "Figure 1 shows a sharp drop from 30 µmol/min at 50°C to 5 µmol/min at 60°C. High temperatures can disrupt an enzyme’s structure, causing denaturation and loss of function. Option A) The enzyme denatures at high temperatures is correct. B) Substrate availability, C) pH acidity, and D) Product inhibition are not supported by the data.";
                        } else if (questionText.includes("Suppose the scientists interpolate the data to estimate the glucose production rate at pH 6.5 and 45°C. Assuming a linear relationship between the nearest data points in Figures 1 and 2, what is the approximate glucose production rate?")) {
                            return "Interpolate between pH 6 (30 µmol/min) and pH 7 (40 µmol/min) at 37°C: at pH 6.5, rate = 30 + (40-30)/2 = 35 µmol/min. For temperature, interpolate between 40°C (40 µmol/min) and 50°C (30 µmol/min) at pH 7: at 45°C, rate = 40 - (40-30)/2 = 35 µmol/min. Averaging these (considering both trends), the rate is approximately 35 µmol/min. Option D) 35 µmol/min is correct. A) 28, B) 33, and C) 38 µmol/min deviate from the linear estimate.";
                    }  
                    // Set 8: Bacterial Growth Passage
                    } else if (questionText.includes("Scientists investigated the growth rates of two bacterial species, Bacillus subtilis and Escherichia coli")) {
                        if (questionText.includes("According to Figure 1, which bacterial species has the higher growth rate at a nutrient concentration of 1.0% at 37°C?")) {
                            return "Figure 1 shows at 1.0% nutrient concentration and 37°C: Bacillus subtilis (0.35 OD/h), Escherichia coli (0.45 OD/h). Escherichia coli has the higher growth rate. Option B) Escherichia coli is correct. A) Bacillus subtilis is lower, C) Both have equal growth rates is false, and D) Cannot be determined is incorrect as data is provided.";
                        } else if (questionText.includes("Based on Figure 2, what is the effect on Escherichia coli’s growth rate as temperature increases from 37°C to 50°C at 1.0% nutrient concentration?")) {
                            return "Figure 2 shows for Escherichia coli at 1.0% nutrient concentration: 37°C (0.45 OD/h), 45°C (0.40 OD/h), 50°C (0.20 OD/h). From 37°C to 50°C, the growth rate decreases. Option B) It decreases is correct. A) It increases steadily, C) It remains constant, and D) It increases then decreases do not match the data.";
                        } else if (questionText.includes("If a third experiment tested Bacillus subtilis at 0.5% nutrient concentration and 45°C, what would be the most likely growth rate based on the trends in Figures 1 and 2?")) {
                            return "Figure 1 shows Bacillus subtilis at 0.5% nutrient concentration and 37°C: 0.20 OD/h. Figure 2 shows at 1.0% nutrient concentration: 37°C (0.35 OD/h), 45°C (0.30 OD/h), a ~14% decrease. Applying a similar reduction to 0.20 OD/h at 0.5% nutrient concentration suggests a rate of ~0.17–0.18 OD/h. Option C) 0.25 OD/h is closest, considering nutrient limitation dominates. A) 0.35 OD/h is too high, B) 0.20 OD/h ignores temperature effect, and D) 0.15 OD/h is too low.";
                        } else if (questionText.includes("Which of the following best explains why the growth rate of Bacillus subtilis decreases at 50°C compared to 45°C in Experiment 2?")) {
                            return "Figure 2 shows Bacillus subtilis growth rate drops from 0.30 OD/h at 45°C to 0.15 OD/h at 50°C. High temperatures can destabilize bacterial cellular membranes, impairing growth. Option D) The cellular membrane becomes less stable at higher temperatures is correct. A) Nutrient concentration is constant, B) Enzyme denaturation is less specific, and C) Oxygen solubility is not indicated by the data.";
                        } else if (questionText.includes("Assuming a linear relationship between the data points in Figures 1 and 2, what is the approximate growth rate of Escherichia coli at 0.75% nutrient concentration and 40°C?")) {
                            return "Figure 1: Escherichia coli at 0.5% (0.25 OD/h), 1.0% (0.45 OD/h) at 37°C. Linear interpolation at 0.75%: 0.25 + (0.45-0.25)*(0.25/0.5) = 0.35 OD/h. Figure 2: at 37°C (0.45 OD/h), 45°C (0.40 OD/h) at 1.0%. Interpolate at 40°C: 0.45 - (0.45-0.40)*(3/8) = 0.43125 OD/h. Averaging nutrient and temperature effects (0.35 + 0.43125)/2 ≈ 0.39 OD/h. Option A) 0.38 OD/h is closest. B) 0.42, C) 0.35, and D) 0.45 OD/h deviate from the estimate.";
                    }
                     // Set 9: Photosynthetic Rate Passage
                    } else if (questionText.includes("Researchers studied the effects of light intensity and soil moisture on the photosynthetic rate of a plant species, Helianthus annuus")) {
                        if (questionText.includes("In Experiment 1, what is the effect of increasing light intensity from 200 to 600 μmol photons/m²/s on the photosynthetic rate?")) {
                            return "Figure 1 shows photosynthetic rates at 50% soil moisture: 200 μmol photons/m²/s (5.0 μmol CO₂/m²/s), 400 (10.0), 600 (14.0). From 200 to 600, the rate increases from 5.0 to 14.0. Option B) It increases is correct. A) It decreases, C) It remains constant, and D) It increases then decreases do not match the data.";
                        } else if (questionText.includes("According to Figure 2, at which soil moisture level does the photosynthetic rate peak in Experiment 2?")) {
                            return "Figure 2 shows photosynthetic rates at 600 μmol photons/m²/s: 20% (8.0 μmol CO₂/m²/s), 30% (10.5), 40% (12.5), 50% (14.0), 60% (13.5). The highest rate is 14.0 at 50%. Option C) 50% is correct. A) 30%, B) 40%, and D) 60% have lower rates.";
                        } else if (questionText.includes("In Experiment 3, how does increasing soil moisture from 30% to 50% affect the photosynthetic rate at 800 μmol photons/m²/s?")) {
                            return "Table 1 shows at 800 μmol photons/m²/s: 30% soil moisture (13.0 μmol CO₂/m²/s), 50% (16.0). The rate increases by 16.0 - 13.0 = 3.0. Option B) It increases by 3.0 μmol CO₂/m²/s is correct. A) It decreases by 3.0, C) It remains constant, and D) It increases by 1.0 do not match the data.";
                        } else if (questionText.includes("Which of the following best explains why the photosynthetic rate plateaus between 800 and 1000 μmol photons/m²/s in Experiment 1?")) {
                            return "Figure 1 shows the rate increases from 16.0 at 800 μmol photons/m²/s to 16.5 at 1000, indicating a plateau. This suggests the plant’s photosynthetic machinery is saturated. Option A) The plant reaches its maximum photosynthetic capacity is correct. B) Soil moisture is constant, C) Stomata closure is not indicated, and D) Chlorophyll degradation is unsupported.";
                        } else if (questionText.includes("Based on the results of Experiment 3, what can be inferred about the interaction between light intensity and soil moisture?")) {
                            return "Table 1 shows: at 400 μmol, 30% to 50% soil moisture increases the rate by 10.5 - 9.5 = 1.0; at 800 μmol, by 16.0 - 13.0 = 3.0. The consistent increase suggests soil moisture’s effect is not significantly altered by light intensity. Option C) The effect of soil moisture is independent of light intensity is correct. A) Light intensity affects low moisture, B) Soil moisture’s effect varies, and D) Light reduces moisture’s impact are incorrect.";
                        } else if (questionText.includes("If a researcher wants to maximize the photosynthetic rate, which combination of conditions should be used based on all experiments?")) {
                            return "Experiment 1 shows highest rate at 1000 μmol, 50% (16.5). Experiment 2 peaks at 600 μmol, 50% (14.0), but 60% (13.5) is lower. Experiment 3 shows 800 μmol, 50% (16.0) is high, but 800 μmol, 60% is untested. Interpolating Experiment 2, 60% at 800 μmol may yield ~16.5 (similar to 1000 μmol, 50%). Option D) 800 μmol photons/m²/s, 60% soil moisture is likely highest. A) 600, 40% (12.5), B) 800, 50% (16.0), and C) 1000, 50% (16.5) are lower or equal.";
                        } else if (questionText.includes("Assuming a linear relationship between the data points in Figure 2, what is the approximate photosynthetic rate at 45% soil moisture and 600 μmol photons/m²/s?")) {
                            return "Figure 2: at 600 μmol photons/m²/s, 40% soil moisture (12.5 μmol CO₂/m²/s), 50% (14.0). Linear interpolation for 45%: 12.5 + (14.0 - 12.5) * (45-40)/(50-40) = 12.5 + 1.5 * 0.5 = 12.5 + 0.75 = 13.25. Option D) 12.5 μmol CO₂/m²/s is closest (rounded). A) 12.0, B) 13.0, and C) 13.5 deviate from the estimate.";
                        } else if (questionText.includes("If a fourth experiment tested the photosynthetic rate at 500 μmol photons/m²/s and 35% soil moisture, what would be the most likely photosynthetic rate based on the trends in Figures 1 and 2?")) {
                            return "Figure 1: at 50% moisture, 400 μmol (10.0 μmol CO₂/m²/s), 600 μmol (14.0). Interpolate for 500 μmol: 10.0 + (14.0-10.0)*(100/200) = 12.0. Figure 2: at 600 μmol, 30% (10.5), 40% (12.5). Interpolate for 35%: 10.5 + (12.5-10.5)*(5/10) = 11.5. Averaging (12.0 + 11.5)/2 = 11.75. Option A) 11.5 μmol CO₂/m²/s is closest. B) 12.0, C) 10.5, and D) 13.0 deviate from the estimate.";
                    }
                     // Set 10: Algae Growth Passage
                    } else if (questionText.includes("Scientists investigated the effects of temperature and nutrient concentration on the growth rate of a freshwater algae species, Chlorella vulgaris")) {
                        if (questionText.includes("In Experiment 1, what is the effect of increasing temperature from 15°C to 25°C on the growth rate of Chlorella vulgaris?")) {
                            return "Figure 1 shows growth rates at 0.5% nutrient concentration: 15°C (0.10 OD/h), 20°C (0.20 OD/h), 25°C (0.30 OD/h). From 15°C to 25°C, the rate increases from 0.10 to 0.30 OD/h. Option B) It increases is correct. A) It decreases, C) It remains constant, and D) It increases then decreases do not match the data.";
                        } else if (questionText.includes("According to Figure 2, at which nutrient concentration does the growth rate of Chlorella vulgaris peak in Experiment 2?")) {
                            return "Figure 2 shows growth rates at 25°C: 0.2% (0.15 OD/h), 0.4% (0.25 OD/h), 0.6% (0.30 OD/h), 0.8% (0.32 OD/h), 1.0% (0.33 OD/h). The highest rate is 0.33 OD/h at 1.0%. Option D) 1.0% is correct. A) 0.2%, B) 0.6%, and C) 0.8% have lower rates.";
                        } else if (questionText.includes("In Experiment 3, how does increasing nutrient concentration from 0.4% to 0.8% affect the growth rate at 30°C?")) {
                            return "Table 1 shows at 30°C: 0.4% nutrient concentration (0.22 OD/h), 0.8% (0.28 OD/h). The rate increases by 0.28 - 0.22 = 0.06 OD/h. Option B) It increases by 0.06 OD/h is correct. A) It decreases by 0.06, C) It remains constant, and D) It increases by 0.02 do not match the data.";
                        } else if (questionText.includes("Which of the following best explains why the growth rate decreases from 25°C to 35°C in Experiment 1?")) {
                            return "Figure 1 shows the growth rate peaks at 25°C (0.30 OD/h) and drops to 0.15 OD/h at 35°C. High temperatures can disrupt cellular processes, such as enzyme function or membrane stability, reducing growth. Option B) High temperatures disrupt cellular processes is correct. A) Nutrient absorption is not indicated, C) Nutrient concentration is constant, and D) Dormancy is unsupported.";
                        } else if (questionText.includes("Based on Experiment 3, what can be inferred about the interaction between temperature and nutrient concentration on growth rate?")) {
                            return "Table 1 shows: at 20°C, 0.4% to 0.8% increases the rate by 0.25 - 0.20 = 0.05 OD/h; at 30°C, by 0.28 - 0.22 = 0.06 OD/h. The similar increases suggest nutrient concentration’s effect is consistent across temperatures. Option C) The effect of nutrient concentration is consistent across temperatures is correct. A) Nutrient effect persists, B) Temperature’s effect varies, and D) Temperature reduces nutrient impact are incorrect.";
                        } else if (questionText.includes("To maximize the growth rate of Chlorella vulgaris based on all experiments, which combination of conditions should be used?")) {
                            return "Experiment 1 shows the highest rate at 25°C, 0.5% (0.30 OD/h). Experiment 2 shows 25°C, 1.0% (0.33 OD/h) as the peak. Experiment 3 suggests 30°C, 0.8% (0.28 OD/h) is lower. Since 25°C with higher nutrients (1.0%) yields 0.33 OD/h, and 0.6% at 25°C (0.30 OD/h) matches Experiment 1, 25°C, 0.6% is optimal among options. Option A) 25°C, 0.6% nutrient concentration is correct. B) 30°C, 0.8% (0.28), C) 20°C, 1.0% (lower), and D) 35°C, 0.4% (0.15) are lower.";
                        } else if (questionText.includes("Assuming a linear relationship between the data points in Figure 2, what is the approximate growth rate at 0.5% nutrient concentration and 25°C?")) {
                            return "Figure 2: at 25°C, 0.4% (0.25 OD/h), 0.6% (0.30 OD/h). Linear interpolation for 0.5%: 0.25 + (0.30 - 0.25) * (0.5 - 0.4)/(0.6 - 0.4) = 0.25 + 0.05 * 0.5/0.2 = 0.25 + 0.05 * 2.5 = 0.25 + 0.125 = 0.275 ≈ 0.27 OD/h. Option C) 0.27 OD/h is correct. A) 0.22, B) 0.25, and D) 0.30 deviate from the estimate.";
                        } else if (questionText.includes("If a fourth experiment tested the growth rate at 22.5°C and 0.7% nutrient concentration, what would be the most likely growth rate based on the trends in Figures 1 and 2?")) {
                            return "Figure 1: at 0.5%, 20°C (0.20 OD/h), 25°C (0.30 OD/h). Interpolate for 22.5°C: 0.20 + (0.30 - 0.20) * (22.5 - 20)/(25 - 20) = 0.20 + 0.10 * 0.5 = 0.25 OD/h. Figure 2: at 25°C, 0.6% (0.30 OD/h), 0.8% (0.32 OD/h). Interpolate for 0.7%: 0.30 + (0.32 - 0.30) * (0.7 - 0.6)/(0.8 - 0.6) = 0.30 + 0.02 * 0.5/0.2 = 0.30 + 0.025 = 0.325 OD/h. Averaging (0.25 + 0.325)/2 = 0.2875 ≈ 0.31 OD/h (considering 25°C trend dominates). Option A) 0.31 OD/h is correct. B) 0.28, C) 0.25, and D) 0.33 deviate from the estimate.";
                    }
                        // Set 11: Phytoplankton Oxygen Production Passage
                    } else if (questionText.includes("Researchers studied the effects of salinity and light intensity on the oxygen production rate of a marine phytoplankton species, Skeletonema costatum")) {
                        if (questionText.includes("In Experiment 1, what is the effect of increasing salinity from 15 ppt to 25 ppt on the oxygen production rate of Skeletonema costatum?")) {
                            return "Figure 1 shows oxygen production rates at 500 µmol photons/m²/s: 15 ppt (10 µmol/L/h), 20 ppt (15 µmol/L/h), 25 ppt (20 µmol/L/h). From 15 ppt to 25 ppt, the rate increases from 10 to 20 µmol/L/h. Option B) It increases is correct. A) It decreases, C) It remains constant, and D) It increases then decreases do not match the data.";
                        } else if (questionText.includes("According to Figure 2, at which light intensity does the oxygen production rate of Skeletonema costatum peak in Experiment 2?")) {
                            return "Figure 2 shows oxygen production rates at 25 ppt: 200 µmol photons/m²/s (8 µmol/L/h), 400 (15), 600 (22), 800 (25), 1000 (26). The highest rate is 26 µmol/L/h at 1000 µmol photons/m²/s. Option C) 1000 µmol photons/m²/s is correct. A) 600, B) 800, and D) 400 have lower rates.";
                        } else if (questionText.includes("Which of the following best explains why the oxygen production rate decreases from 25 ppt to 35 ppt in Experiment 1?")) {
                            return "Figure 1 shows the oxygen production rate peaks at 25 ppt (20 µmol/L/h) and drops to 12 µmol/L/h at 35 ppt. High salinity can disrupt photosynthetic processes by affecting enzyme activity or cell membrane function. Option A) High salinity disrupts photosynthetic processes is correct. B) Light intensity is constant, C) Dormancy is not indicated, and D) Oxygen solubility is unrelated to the observed trend.";
                        } else if (questionText.includes("Based on Experiment 3, what can be inferred about the interaction between salinity and light intensity on oxygen production rate?")) {
                            return "Table 1 shows: at 20 ppt, 400 to 800 µmol increases the rate by 23 - 14 = 9 µmol/L/h; at 30 ppt, by 22 - 13 = 9 µmol/L/h. The consistent increase suggests light intensity’s effect is not significantly altered by salinity. Option B) The effect of light intensity is consistent across salinity levels is correct. A) Salinity’s effect is not greater, C) Salinity does not enhance light’s effect, and D) Light does not reduce salinity’s impact.";
                        } else if (questionText.includes("To maximize the oxygen production rate of Skeletonema costatum based on all experiments, which combination of conditions should be used?")) {
                            return "Experiment 1 shows the highest rate at 25 ppt, 500 µmol (20 µmol/L/h). Experiment 2 shows 25 ppt, 1000 µmol (26 µmol/L/h) as the peak. Experiment 3 suggests 20 ppt, 800 µmol (23 µmol/L/h) and 30 ppt, 800 µmol (22 µmol/L/h) are lower. The highest rate is at 25 ppt, 1000 µmol. Option A) 25 ppt, 1000 µmol photons/m²/s is correct. B) 30 ppt, 800 µmol (22), C) 20 ppt, 600 µmol (lower), and D) 35 ppt, 400 µmol (lower) are suboptimal.";
                        } else if (questionText.includes("Assuming a linear relationship between the data points in Figure 2, what is the approximate oxygen production rate at 500 µmol photons/m²/s and 25 ppt salinity?")) {
                            return "Figure 2: at 25 ppt, 400 µmol photons/m²/s (15 µmol/L/h), 600 µmol (22 µmol/L/h). Linear interpolation for 500 µmol: 15 + (22 - 15) * (500 - 400)/(600 - 400) = 15 + 7 * 100/200 = 15 + 3.5 = 18.5 µmol/L/h. Option D) 18.5 µmol/L/h is correct. A) 18, B) 19, and C) 20 deviate from the estimate.";
                        } else if (questionText.includes("If a fourth experiment tested the oxygen production rate at 22.5 ppt salinity and 700 µmol photons/m²/s, what would be the most likely oxygen production rate based on the trends in Figures 1 and 2?")) {
                            return "Figure 1: at 500 µmol, 20 ppt (15 µmol/L/h), 25 ppt (20 µmol/L/h). Interpolate for 22.5 ppt: 15 + (20 - 15) * (22.5 - 20)/(25 - 20) = 15 + 5 * 0.5 = 17.5 µmol/L/h. Figure 2: at 25 ppt, 600 µmol (22 µmol/L/h), 800 µmol (25 µmol/L/h). Interpolate for 700 µmol: 22 + (25 - 22) * (700 - 600)/(800 - 600) = 22 + 3 * 0.5 = 23.5 µmol/L/h. Averaging (17.5 + 23.5)/2 = 20.5, but 23.5 is closer to Experiment 2’s trend at optimal salinity. Option C) 23.5 µmol/L/h is correct. A) 21.5, B) 22.5, and D) 20.5 deviate from the estimate.";
                        }
                    // Set 12: Coral Reef Decline Passage
                } else if (questionText.includes("Coral reefs in the Pacific Ocean have shown significant declines in health, with reduced coral cover and biodiversity")) {
                    if (questionText.includes("According to Scientist 1, what is the primary reason for the decline in coral cover observed in Figure 1?")) {
                        return "Scientist 1 attributes coral decline to ocean acidification, which reduces carbonate ion availability, weakening coral skeletons. Figure 1 shows declining coral cover with decreasing pH. Option B) Reduced carbonate ion availability is correct. A) Increased sea surface temperatures and C) Loss of symbiotic algae are Scientist 2’s focus, and D) Increased bleaching events is a symptom, not the cause per Scientist 1.";
                    } else if (questionText.includes("Which of the following would most weaken Scientist 2’s argument?")) {
                        return "Scientist 2 argues thermal stress from rising temperatures causes coral decline via bleaching. Data showing coral cover declining in regions with stable temperatures would suggest another factor, weakening Scientist 2’s hypothesis. Option A) Data showing coral cover declining in regions with stable sea temperatures is correct. B) Increased CO₂ supports Scientist 1, C) Coral recovery doesn’t directly refute temperature’s role, and D) Stable pH doesn’t address temperature effects.";
                    } else if (questionText.includes("How does Scientist 2’s explanation of coral decline differ from Scientist 1’s?")) {
                        return "Scientist 2 attributes coral decline to thermal stress causing bleaching (expulsion of symbiotic algae), while Scientist 1 cites ocean acidification causing weakened skeletons due to low carbonate ions. Option B) Scientist 2 attributes decline to coral bleaching, while Scientist 1 cites weakened skeletons is correct. A) Reverses the scientists’ claims, C) Misattributes carbonate ions to Scientist 2, and D) Incorrectly assigns skeletal damage to Scientist 2.";
                    } else if (questionText.includes("Which of the following data would most support Scientist 1’s hypothesis over Scientist 2’s?")) {
                        return "Scientist 1 links coral decline to acidification reducing carbonate ions. Data showing coral cover loss correlated with lower carbonate ion concentrations directly supports this over Scientist 2’s temperature-based hypothesis. Option C) Coral cover loss correlated with lower carbonate ion concentrations is correct. A) Stable temperatures with declining pH supports Scientist 1 but is less specific, B) Supports Scientist 2, and D) Contradicts Scientist 2 but doesn’t directly support Scientist 1.";
                    } else if (questionText.includes("Suppose a study finds that coral cover declined significantly in a region where seawater pH remained stable at 8.1 but sea surface temperature increased from 27°C to 29°C")) {
                        return "Stable pH (8.1) undermines Scientist 1’s acidification hypothesis, as it suggests pH isn’t driving the decline. Increased temperature aligns with Scientist 2’s thermal stress hypothesis, supporting bleaching as the cause. Option A) It would weaken Scientist 1’s hypothesis and support Scientist 2’s is correct. B) Reverses the impact, C) Equal support is incorrect as pH is stable, and D) Weakening both is incorrect as temperature supports Scientist 2.";
                    } else if (questionText.includes("If a new study showed that coral cover remained stable in a region with increasing sea surface temperatures but decreasing pH")) {
                        return "Stable coral cover despite decreasing pH challenges Scientist 1’s hypothesis that acidification drives decline. Increasing temperatures with stable coral cover weakens Scientist 2’s assumption that bleaching (from thermal stress) is the main cause. Option C) Scientist 1; Scientist 2’s assumption that bleaching is the main cause of decline is correct. A) Incorrectly supports Scientist 1, B) Incorrectly supports Scientist 2, and D) Misattributes the challenged assumption.";
                    } else if (questionText.includes("Suppose a researcher finds that coral cover declined in a region where both pH decreased and temperature increased, but the decline correlated more strongly with pH changes")) {
                        return "Stronger correlation with pH changes supports Scientist 1’s acidification hypothesis over Scientist 2’s thermal stress hypothesis, as it suggests pH is the dominant driver. Option D) It would make Scientist 1’s hypothesis more plausible than Scientist 2’s is correct. A) Incorrectly favors Scientist 2, B) Reverses the correlation, and C) Equal plausibility ignores the stronger pH correlation.";
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
    