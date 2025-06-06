// Variables (aligned with SAT structure)
let currentItemIndex = 0;
let currentQuestionIndex = 0;
let currentLesson = "1";
let progressSteps = 0;
let totalSteps = 0;
let isQuizPhase = false;
let showingQuizTransition = false;
let categoryStats = {
    "boundaries": { correct: 0, incorrect: 0 }
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || '1';
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    showScore();
    updateProgressBar(0);
});

// Define all lessons (updated with explicit passage fields, SAT-focused)
const lessons = {
    1: {
        title: "Avoiding Run-On Sentences and Comma Splices",
        content: [
            {
                type: "example",
                title: "Example 1: Run-On Sentence",
                content: `
                    <h2>Example 1: Run-On Sentence</h2>
                    <p>Question: How to fix this run-on?</p>
                    <p>Step 1: Identify: Two independent clauses with no break.</p>
                    <p>Step 2: Fix: Add a period or conjunction.</p>
                    <p>Correct: 'She wanted to win, so she trained hard.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Greenvale reported: 'She wanted to win she trained hard.' The journal discussed athletic dedication but contained a run-on sentence."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, an academic journal in Millville stated: 'She studied all night, she passed the test.' The journal discussed study habits but used a comma splice.",
                question: "How to fix this comma splice?",
                options: [
                    { text: "A) She studied all night; she passed the test.", correct: true },
                    { text: "B) She studied all night, she passed the test, great.", correct: false },
                    { text: "C) She studied all night, passing the test.", correct: false },
                    { text: "D) She studied all night, and she passed the test.", correct: true }
                ],
                explanation: "A semicolon or 'and' fixes the splice between two full sentences."
            },
            {
                type: "example",
                title: "Example 2: Comma Splice",
                content: `
                    <h2>Example 2: Comma Splice</h2>
                    <p>Question: How to fix this comma splice?</p>
                    <p>Step 1: Identify: Two full sentences joined by a comma.</p>
                    <p>Step 2: Fix: Use a semicolon or period.</p>
                    <p>Correct: 'He was tired; he kept running.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a fitness journal in Clearwater reported: 'He was tired, he kept running.' The journal highlighted endurance but used a comma splice."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a weather journal in Greenvale stated: 'The rain stopped we went outside.' The journal discussed outdoor activities but contained a run-on.",
                question: "How to fix this run-on?",
                options: [
                    { text: "A) The rain stopped, so we went outside.", correct: true },
                    { text: "B) The rain stopped we went outside quick.", correct: false },
                    { text: "C) The rain stopped, we went outside, fun.", correct: false },
                    { text: "D) The rain stopped we went outside now.", correct: false }
                ],
                explanation: "'So' with a comma separates the clauses correctly."
            },
            {
                type: "example",
                title: "Example 3: Mixed Error",
                content: `
                    <h2>Example 3: Mixed Error</h2>
                    <p>Question: How to fix this?</p>
                    <p>Step 1: Identify: Comma splice and run-on.</p>
                    <p>Step 2: Fix: Break into proper sentences.</p>
                    <p>Correct: 'He was late, so he ran fast. He caught the bus.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a lifestyle journal in Millville reported: 'He was late, he ran fast he caught the bus.' The journal discussed daily routines but had boundary errors."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a community journal in Clearwater stated: 'The dog barked, it scared me I jumped.' The journal described neighborhood events but had boundary issues.",
                question: "How to fix this?",
                options: [
                    { text: "A) The dog barked; it scared me, so I jumped.", correct: true },
                    { text: "B) The dog barked, it scared me I jumped high.", correct: false },
                    { text: "C) The dog barked, it scared me, I jumped, okay.", correct: false },
                    { text: "D) The dog barked it scared me I jumped.", correct: false }
                ],
                explanation: "A semicolon and 'so' fix the splice and run-on."
            },
            {
                type: "example",
                title: "Example 4: Run-On with Similar Ideas",
                content: `
                    <h2>Example 4: Run-On with Similar Ideas</h2>
                    <p>Question: How to fix this run-on?</p>
                    <p>Step 1: Identify: Two related independent clauses.</p>
                    <p>Step 2: Fix: Use a semicolon.</p>
                    <p>Correct: 'She loves cats; she feeds them daily.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a pet journal in Greenvale reported: 'She loves cats she feeds them daily.' The journal discussed pet care but contained a run-on."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a transportation journal in Millville stated: 'He missed the train, he was early.' The journal discussed commuting but used a comma splice.",
                question: "How to fix this comma splice?",
                options: [
                    { text: "A) He missed the train; he was early.", correct: true },
                    { text: "B) He missed the train, he was early, strange.", correct: false },
                    { text: "C) He missed the train, being early.", correct: false },
                    { text: "D) He missed the train he was early.", correct: false }
                ],
                explanation: "A semicolon separates the two full sentences."
            },
            {
                type: "example",
                title: "Example 5: Comma Splice with Contrast",
                content: `
                    <h2>Example 5: Comma Splice with Contrast</h2>
                    <p>Question: How to fix this comma splice?</p>
                    <p>Step 1: Identify: Two contrasting full sentences.</p>
                    <p>Step 2: Fix: Use 'but' with a comma.</p>
                    <p>Correct: 'She wanted to go, but she stayed home.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a lifestyle journal in Clearwater reported: 'She wanted to go, she stayed home.' The journal discussed personal choices but used a comma splice."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, an entertainment journal in Greenvale stated: 'The movie was long, I enjoyed it.' The journal reviewed films but used a comma splice.",
                question: "How to fix this comma splice?",
                options: [
                    { text: "A) The movie was long, but I enjoyed it.", correct: true },
                    { text: "B) The movie was long, I enjoyed it, nice.", correct: false },
                    { text: "C) The movie was long I enjoyed it.", correct: false },
                    { text: "D) The movie was long, enjoying it.", correct: false }
                ],
                explanation: "'But' with a comma fixes the splice and shows contrast."
            },
            {
                type: "example",
                title: "Example 6: Run-On with Cause",
                content: `
                    <h2>Example 6: Run-On with Cause</h2>
                    <p>Question: How to fix this run-on?</p>
                    <p>Step 1: Identify: Cause-effect with no break.</p>
                    <p>Step 2: Fix: Add 'so' with a comma.</p>
                    <p>Correct: 'It rained all day, so we stayed inside.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a weather journal in Millville reported: 'It rained all day we stayed inside.' The journal discussed indoor activities but contained a run-on."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a community journal in Clearwater stated: 'The power went out we lit candles.' The journal described local events but had a run-on.",
                question: "How to fix this run-on?",
                options: [
                    { text: "A) The power went out, so we lit candles.", correct: true },
                    { text: "B) The power went out we lit candles fast.", correct: false },
                    { text: "C) The power went out, we lit candles, dark.", correct: false },
                    { text: "D) The power went out we lit candles now.", correct: false }
                ],
                explanation: "'So' with a comma links cause and effect."
            },
            {
                type: "example",
                title: "Example 7: Comma Splice with Sequence",
                content: `
                    <h2>Example 7: Comma Splice with Sequence</h2>
                    <p>Question: How to fix this comma splice?</p>
                    <p>Step 1: Identify: Two full sentences in sequence.</p>
                    <p>Step 2: Fix: Use a period or 'and'.</p>
                    <p>Correct: 'She finished her homework. She went to bed.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an academic journal in Greenvale reported: 'She finished her homework, she went to bed.' The journal discussed routines but used a comma splice."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a lifestyle journal in Millville stated: 'He cooked dinner, he ate alone.' The journal discussed daily life but used a comma splice.",
                question: "How to fix this comma splice?",
                options: [
                    { text: "A) He cooked dinner. He ate alone.", correct: true },
                    { text: "B) He cooked dinner, he ate alone, sad.", correct: false },
                    { text: "C) He cooked dinner he ate alone.", correct: false },
                    { text: "D) He cooked dinner, eating alone.", correct: false }
                ],
                explanation: "A period separates the two full sentences."
            }
        ]
    },
    2: {
        title: "Avoiding Sentence Fragments",
        content: [
            {
                type: "example",
                title: "Example 1: Missing Subject",
                content: `
                    <h2>Example 1: Missing Subject</h2>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No subject or complete thought.</p>
                    <p>Step 2: Fix: Add a subject and verb.</p>
                    <p>Correct: 'She was running through the park.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a fitness journal in Clearwater stated: 'Running through the park.' The journal discussed exercise but used a sentence fragment."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a sports journal in Greenvale stated: 'Hoping to win.' The journal discussed athlete motivation but used a fragment.",
                question: "How to fix this fragment?",
                options: [
                    { text: "A) She was hoping to win.", correct: true },
                    { text: "B) Hoping to win, great.", correct: false },
                    { text: "C) Hoping to win fast.", correct: false },
                    { text: "D) Hoping to win, okay.", correct: false }
                ],
                explanation: "Adding 'She was' completes the sentence."
            },
            {
                type: "example",
                title: "Example 2: Dependent Clause",
                content: `
                    <h2>Example 2: Dependent Clause</h2>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: 'Because' makes it incomplete.</p>
                    <p>Step 2: Fix: Add an independent clause.</p>
                    <p>Correct: 'Because he forgot his lines, he improvised.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a theater journal in Millville stated: 'Because he forgot his lines.' The journal discussed performances but used a fragment."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a sports journal in Clearwater stated: 'Although the team tried hard.' The journal discussed effort but used a fragment.",
                question: "How to fix this fragment?",
                options: [
                    { text: "A) Although the team tried hard, they lost.", correct: true },
                    { text: "B) Although the team tried hard, tough.", correct: false },
                    { text: "C) Although the team tried hard and.", correct: false },
                    { text: "D) Although the team tried hard quickly.", correct: false }
                ],
                explanation: "Adding 'they lost' completes the thought."
            },
            {
                type: "example",
                title: "Example 3: Phrase Fragment",
                content: `
                    <h2>Example 3: Phrase Fragment</h2>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No verb or complete idea.</p>
                    <p>Step 2: Fix: Add a verb and subject.</p>
                    <p>Correct: 'A loud crash woke us in the night.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a community journal in Greenvale stated: 'A loud crash in the night.' The journal discussed local events but used a fragment."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a travel journal in Millville stated: 'Swimming in the lake.' The journal discussed activities but used a fragment.",
                question: "How to fix this fragment?",
                options: [
                    { text: "A) They were swimming in the lake.", correct: true },
                    { text: "B) Swimming in the lake, fun.", correct: false },
                    { text: "C) Swimming in the lake fast.", correct: false },
                    { text: "D) Swimming in the lake, cool.", correct: false }
                ],
                explanation: "Adding 'They were' makes it a complete sentence."
            },
            {
                type: "example",
                title: "Example 4: Subordinate Clause",
                content: `
                    <h2>Example 4: Subordinate Clause</h2>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: 'When' needs a main clause.</p>
                    <p>Step 2: Fix: Add a complete thought.</p>
                    <p>Correct: 'When the bell rang, we left.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an academic journal in Clearwater stated: 'When the bell rang.' The journal discussed school routines but used a fragment."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a weather journal in Greenvale stated: 'If it snows.' The journal discussed winter plans but used a fragment.",
                question: "How to fix this fragment?",
                options: [
                    { text: "A) If it snows, we’ll stay home.", correct: true },
                    { text: "B) If it snows, cold.", correct: false },
                    { text: "C) If it snows and.", correct: false },
                    { text: "D) If it snows quickly.", correct: false }
                ],
                explanation: "Adding 'we’ll stay home' completes the idea."
            },
            {
                type: "example",
                title: "Example 5: Prepositional Phrase",
                content: `
                    <h2>Example 5: Prepositional Phrase</h2>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No subject or verb.</p>
                    <p>Step 2: Fix: Add a complete clause.</p>
                    <p>Correct: 'We sat under the bright stars.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Millville stated: 'Under the bright stars.' The journal described camping but used a fragment."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a sports journal in Clearwater stated: 'After the game ended.' The journal discussed events but used a fragment.",
                question: "How to fix this fragment?",
                options: [
                    { text: "A) After the game ended, we cheered.", correct: true },
                    { text: "B) After the game ended, loud.", correct: false },
                    { text: "C) After the game ended fast.", correct: false },
                    { text: "D) After the game ended, okay.", correct: false }
                ],
                explanation: "Adding 'we cheered' completes the sentence."
            },
            {
                type: "example",
                title: "Example 6: Infinitive Phrase",
                content: `
                    <h2>Example 6: Infinitive Phrase</h2>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No subject or finite verb.</p>
                    <p>Step 2: Fix: Add a subject and verb.</p>
                    <p>Correct: 'He wanted to finish the race.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a fitness journal in Greenvale stated: 'To finish the race.' The journal discussed goals but used a fragment."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a culinary journal in Millville stated: 'To bake a cake.' The journal discussed recipes but used a fragment.",
                question: "How to fix this fragment?",
                options: [
                    { text: "A) She planned to bake a cake.", correct: true },
                    { text: "B) To bake a cake, tasty.", correct: false },
                    { text: "C) To bake a cake fast.", correct: false },
                    { text: "D) To bake a cake, good.", correct: false }
                ],
                explanation: "Adding 'She planned' makes it complete."
            },
            {
                type: "example",
                title: "Example 7: Appositive Phrase",
                content: `
                    <h2>Example 7: Appositive Phrase</h2>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No verb or complete idea.</p>
                    <p>Step 2: Fix: Add a verb.</p>
                    <p>Correct: 'My friend, a great cook, made dinner.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a community journal in Clearwater stated: 'My friend, a great cook.' The journal discussed local talents but used a fragment."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a car journal in Greenvale stated: 'The car, a red sedan.' The journal discussed vehicles but used a fragment.",
                question: "How to fix this fragment?",
                options: [
                    { text: "A) The car, a red sedan, sped by.", correct: true },
                    { text: "B) The car, a red sedan, fast.", correct: false },
                    { text: "C) The car, a red sedan and.", correct: false },
                    { text: "D) The car, a red sedan, nice.", correct: false }
                ],
                explanation: "Adding 'sped by' completes the thought."
            }
        ]
    },
    3: {
        title: "Proper Use of Semicolons, Colons, and Dashes",
        content: [
            {
                type: "example",
                title: "Example 1: Semicolon",
                content: `
                    <h2>Example 1: Semicolon</h2>
                    <p>Question: Why use a semicolon?</p>
                    <p>Step 1: Check: Two independent clauses.</p>
                    <p>Step 2: Confirm: Closely related ideas.</p>
                    <p>Answer: Links related full sentences.</p>
                    <p>Correct: 'She loved art; she painted daily.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, an art journal in Millville stated: 'She loved art; she painted daily.' The journal discussed creative routines using proper punctuation."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a fitness journal in Greenvale discussed exercise habits. The journal aimed to connect related ideas clearly.",
                question: "Which punctuation fits best? 'She was tired __ she kept going.'",
                options: [
                    { text: "A) ;", correct: true },
                    { text: "B) :", correct: false },
                    { text: "C) —", correct: false },
                    { text: "D) ,", correct: false }
                ],
                explanation: "A semicolon joins two related full sentences."
            },
            {
                type: "example",
                title: "Example 2: Colon",
                content: `
                    <h2>Example 2: Colon</h2>
                    <p>Question: Why use a colon?</p>
                    <p>Step 1: Check: Introduces specifics.</p>
                    <p>Step 2: Confirm: Follows a complete sentence.</p>
                    <p>Answer: Sets up a list or explanation.</p>
                    <p>Correct: 'He packed three things: a book, a pen, a snack.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Clearwater stated: 'He packed three things: a book, a pen, a snack.' The journal listed travel essentials using a colon."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, a sports journal in Millville discussed an athlete’s ambition. The journal aimed to introduce goals clearly.",
                question: "Which punctuation fits best? 'He had one goal __ to win.'",
                options: [
                    { text: "A) :", correct: true },
                    { text: "B) ;", correct: false },
                    { text: "C) ,", correct: false },
                    { text: "D) .", correct: false }
                ],
                explanation: "A colon introduces the goal as an explanation."
            },
            {
                type: "example",
                title: "Example 3: Dash",
                content: `
                    <h2>Example 3: Dash</h2>
                    <p>Question: Why use dashes?</p>
                    <p>Step 1: Check: Adds a dramatic pause.</p>
                    <p>Step 2: Confirm: Highlights key info.</p>
                    <p>Answer: Emphasizes an interruption or addition.</p>
                    <p>Correct: 'Her dream — to travel the world — inspired her.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a lifestyle journal in Greenvale stated: 'Her dream — to travel the world — inspired her.' The journal used dashes to emphasize aspirations."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, an academic journal in Clearwater described a challenging exam. The journal aimed to emphasize difficulty.",
                question: "Which punctuation fits best? 'The test — very hard — scared him.'",
                options: [
                    { text: "A) —", correct: true },
                    { text: "B) ;", correct: false },
                    { text: "C) :", correct: false },
                    { text: "D) ,", correct: false }
                ],
                explanation: "Dashes emphasize 'very hard' dramatically."
            },
            {
                type: "example",
                title: "Example 4: Semicolon with Transition",
                content: `
                    <h2>Example 4: Semicolon with Transition</h2>
                    <p>Question: Why use a semicolon?</p>
                    <p>Step 1: Check: Two full sentences with contrast.</p>
                    <p>Step 2: Confirm: 'However' needs a semicolon before it.</p>
                    <p>Answer: Separates clauses with a conjunctive adverb.</p>
                    <p>Correct: 'He was late; however, he still won.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Millville stated: 'He was late; however, he still won.' The journal used a semicolon to clarify contrasting outcomes."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, an academic journal in Greenvale discussed study results. The journal aimed to contrast effort and outcome.",
                question: "Which punctuation fits best? 'She studied hard __ however, she failed.'",
                options: [
                    { text: "A) ;", correct: true },
                    { text: "B) :", correct: false },
                    { text: "C) —", correct: false },
                    { text: "D) ,", correct: false }
                ],
                explanation: "A semicolon precedes 'however' between full sentences."
            },
            {
                type: "example",
                title: "Example 5: Colon for Explanation",
                content: `
                    <h2>Example 5: Colon for Explanation</h2>
                    <p>Question: Why use a colon?</p>
                    <p>Step 1: Check: Introduces an explanation.</p>
                    <p>Step 2: Confirm: Follows a complete idea.</p>
                    <p>Answer: Clarifies what the fear is.</p>
                    <p>Correct: 'She had one fear: heights scared her.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a psychology journal in Clearwater stated: 'She had one fear: heights scared her.' The journal used a colon to explain phobias."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a survival journal in Millville listed camping needs. The journal aimed to introduce essentials clearly.",
                question: "Which punctuation fits best? 'They needed supplies __ food and water.'",
                options: [
                    { text: "A) :", correct: true },
                    { text: "B) ;", correct: false },
                    { text: "C) ,", correct: false },
                    { text: "D) —", correct: false }
                ],
                explanation: "A colon introduces the list of supplies."
            },
            {
                type: "example",
                title: "Example 6: Dash for Interruption",
                content: `
                    <h2>Example 6: Dash for Interruption</h2>
                    <p>Question: Why use dashes?</p>
                    <p>Step 1: Check: Adds extra info with emphasis.</p>
                    <p>Step 2: Confirm: Sets off a descriptive phrase.</p>
                    <p>Answer: Highlights the interruption strongly.</p>
                    <p>Correct: 'The plan — risky but bold — worked.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a business journal in Greenvale stated: 'The plan — risky but bold — worked.' The journal used dashes to highlight strategy."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a career journal in Clearwater described a professional’s ambition. The journal aimed to emphasize goals.",
                question: "Which punctuation fits best? 'His goal — to succeed — drove him.'",
                options: [
                    { text: "A) —", correct: true },
                    { text: "B) ;", correct: false },
                    { text: "C) :", correct: false },
                    { text: "D) ,", correct: false }
                ],
                explanation: "Dashes emphasize 'to succeed' as an aside."
            },
            {
                type: "example",
                title: "Example 7: Semicolon for List Clarity",
                content: `
                    <h2>Example 7: Semicolon for List Clarity</h2>
                    <p>Question: Why use semicolons?</p>
                    <p>Step 1: Check: List items have commas within them.</p>
                    <p>Step 2: Confirm: Semicolons avoid confusion.</p>
                    <p>Answer: Separates items clearly in a list.</p>
                    <p>Correct: 'She visited Paris, France; Tokyo, Japan; and Rome, Italy.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a travel journal in Millville stated: 'She visited Paris, France; Tokyo, Japan; and Rome, Italy.' The journal used semicolons to clarify a complex list."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a community journal in Greenvale listed event guests. The journal aimed to clarify a complex list.",
                question: "Which punctuation fits best? 'They invited Bob, a chef __ Sue, a baker __ and Tim, a writer.'",
                options: [
                    { text: "A) ;", correct: true },
                    { text: "B) :", correct: false },
                    { text: "C) ,", correct: false },
                    { text: "D) —", correct: false }
                ],
                explanation: "Semicolons clarify list items with internal commas."
            }
        ]
    },
    4: {
        title: "Maintaining Logical and Clear Sentence Boundaries",
        content: [
            {
                type: "example",
                title: "Example 1: Clear Boundary",
                content: `
                    <h2>Example 1: Clear Boundary</h2>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Boundary confusion — what’s exhausting?</p>
                    <p>Step 2: Fix: Separate ideas logically.</p>
                    <p>Correct: 'She cooked dinner after work. It was exhausting.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a lifestyle journal in Clearwater stated: 'She cooked dinner after work was exhausting.' The journal discussed routines but had unclear boundaries."
            },
            {
                type: "question",
                title: "Question 1",
                passage: "In 2024, a party journal in Millville stated: 'She danced all night the party was fun.' The journal described events but lacked clear boundaries.",
                question: "How to clarify?",
                options: [
                    { text: "A) She danced all night; the party was fun.", correct: true },
                    { text: "B) She danced all night the party fun.", correct: false },
                    { text: "C) She danced all night, the party, fun.", correct: false },
                    { text: "D) She danced all night the party was fun too.", correct: false }
                ],
                explanation: "A semicolon separates the ideas clearly."
            },
            {
                type: "example",
                title: "Example 2: Logical Flow",
                content: `
                    <h2>Example 2: Logical Flow</h2>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Who’s running late?</p>
                    <p>Step 2: Fix: Clarify with boundaries.</p>
                    <p>Correct: 'He missed the bus because he was running late.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a transportation journal in Greenvale stated: 'He missed the bus running late.' The journal discussed commuting but was unclear."
            },
            {
                type: "question",
                title: "Question 2",
                passage: "In 2024, an academic journal in Clearwater stated: 'He studied hard the test was easy.' The journal discussed preparation but lacked clarity.",
                question: "How to clarify?",
                options: [
                    { text: "A) He studied hard, so the test was easy.", correct: true },
                    { text: "B) He studied hard the test easy.", correct: false },
                    { text: "C) He studied hard, the test easy.", correct: false },
                    { text: "D) He studied hard the test was easy now.", correct: false }
                ],
                explanation: "'So' with a comma links cause and effect logically."
            },
            {
                type: "example",
                title: "Example 3: Avoiding Ambiguity",
                content: `
                    <h2>Example 3: Avoiding Ambiguity</h2>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Who’s wearing the hat?</p>
                    <p>Step 2: Fix: Set clear boundaries.</p>
                    <p>Correct: 'The dog barked at the mailman, who was wearing a hat.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a community journal in Millville stated: 'The dog barked at the mailman wearing a hat.' The journal described events but was ambiguous."
            },
            {
                type: "question",
                title: "Question 3",
                passage: "In 2024, a pet journal in Greenvale stated: 'She fed the cat crying loudly.' The journal discussed pet care but was unclear.",
                question: "How to clarify?",
                options: [
                    { text: "A) She fed the cat, which was crying loudly.", correct: true },
                    { text: "B) She fed the cat crying loudly now.", correct: false },
                    { text: "C) She fed the cat, crying, loudly.", correct: false },
                    { text: "D) She fed the cat crying loudly fast.", correct: false }
                ],
                explanation: "'Which was' clarifies the cat was crying."
            },
            {
                type: "example",
                title: "Example 4: Proper Clause Separation",
                content: `
                    <h2>Example 4: Proper Clause Separation</h2>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Cause or sequence unclear.</p>
                    <p>Step 2: Fix: Add a conjunction or punctuation.</p>
                    <p>Correct: 'He left early because traffic was bad.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a transportation journal in Clearwater stated: 'He left early traffic was bad.' The journal discussed commuting but lacked clear boundaries."
            },
            {
                type: "question",
                title: "Question 4",
                passage: "In 2024, a music journal in Millville stated: 'They played music the room filled up.' The journal described concerts but was unclear.",
                question: "How to clarify?",
                options: [
                    { text: "A) They played music, and the room filled up.", correct: true },
                    { text: "B) They played music the room filled up fast.", correct: false },
                    { text: "C) They played music, the room, filled up.", correct: false },
                    { text: "D) They played music the room filled up now.", correct: false }
                ],
                explanation: "'And' with a comma separates the actions clearly."
            },
            {
                type: "example",
                title: "Example 5: Avoiding Misplaced Modifier",
                content: `
                    <h2>Example 5: Avoiding Misplaced Modifier</h2>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: 'Almost' placement confuses meaning.</p>
                    <p>Step 2: Fix: Move modifier for clarity.</p>
                    <p>Correct: 'She drove her kids to school almost every day.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a parenting journal in Greenvale stated: 'She almost drove her kids to school every day.' The journal discussed routines but was ambiguous."
            },
            {
                type: "question",
                title: "Question 5",
                passage: "In 2024, a food journal in Clearwater stated: 'He only ate pizza on weekends.' The journal discussed diets but was unclear about exclusivity.",
                question: "How to clarify if he ate nothing else on weekends?",
                options: [
                    { text: "A) He ate only pizza on weekends.", correct: true },
                    { text: "B) He only ate pizza on weekends fast.", correct: false },
                    { text: "C) He only ate, pizza, on weekends.", correct: false },
                    { text: "D) He only ate pizza on weekends now.", correct: false }
                ],
                explanation: "Moving 'only' clarifies he ate just pizza."
            },
            {
                type: "example",
                title: "Example 6: Logical Sequence",
                content: `
                    <h2>Example 6: Logical Sequence</h2>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Sequence and cause muddled.</p>
                    <p>Step 2: Fix: Separate and clarify.</p>
                    <p>Correct: 'She trained hard and won the race.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a sports journal in Millville stated: 'She won the race training hard.' The journal discussed victories but lacked clear boundaries."
            },
            {
                type: "question",
                title: "Question 6",
                passage: "In 2024, a sports journal in Greenvale stated: 'He scored a goal kicking the ball.' The journal discussed matches but was unclear.",
                question: "How to clarify?",
                options: [
                    { text: "A) He scored a goal by kicking the ball.", correct: true },
                    { text: "B) He scored a goal kicking the ball fast.", correct: false },
                    { text: "C) He scored a goal, kicking, the ball.", correct: false },
                    { text: "D) He scored a goal kicking the ball now.", correct: false }
                ],
                explanation: "'By' clarifies how he scored."
            },
            {
                type: "example",
                title: "Example 7: Clear Subject Reference",
                content: `
                    <h2>Example 7: Clear Subject Reference</h2>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Who finished the book?</p>
                    <p>Step 2: Fix: Specify the subject.</p>
                    <p>Correct: 'After she finished the book, the movie started.'</p>
                    <button id="next-item">Next</button>
                `,
                passage: "In 2023, a literary journal in Clearwater stated: 'After finishing the book, the movie started.' The journal discussed reading but was ambiguous."
            },
            {
                type: "question",
                title: "Question 7",
                passage: "In 2024, a community journal in Millville stated: 'While reading the news, the dog barked.' The journal discussed daily life but was unclear.",
                question: "How to clarify?",
                options: [
                    { text: "A) While he was reading the news, the dog barked.", correct: true },
                    { text: "B) While reading the news the dog barked fast.", correct: false },
                    { text: "C) While reading the news, the dog, barked.", correct: false },
                    { text: "D) While reading the news the dog barked now.", correct: false }
                ],
                explanation: "Adding 'he was' clarifies who read."
            }
        ]
    }
};

// Quiz arrays (seven questions each, with 2 A, 2 B, 1 C, 1 D correct answers)
const runOnSpliceQuestions = [
    // Original question
    {
        passage: "In 2024, a health journal in Greenvale stated: 'She was hungry, she ate fast.' The journal discussed eating habits but used a comma splice.",
        question: "How to fix this comma splice?",
        answers: [
            { text: "A) She was hungry; she ate fast.", correct: true },
            { text: "B) She was hungry, she ate fast, good.", correct: false },
            { text: "C) She was hungry, eating fast.", correct: false },
            { text: "D) She was hungry, she ate fast now.", correct: false }
        ],
        explanation: "A semicolon separates two full sentences correctly.",
        difficulty: "easy",
        category: "boundaries"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a travel journal in Millville stated: 'The flight was delayed we missed the tour.' The journal discussed travel issues but contained a run-on.",
        question: "How to fix this run-on?",
        answers: [
            { text: "A) The flight was delayed, so we missed the tour.", correct: true },
            { text: "B) The flight was delayed we missed the tour, bad.", correct: false },
            { text: "C) The flight was delayed, missing the tour.", correct: false },
            { text: "D) The flight was delayed we missed the tour now.", correct: false }
        ],
        explanation: "'So' with a comma links cause and effect correctly.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a pet journal in Clearwater stated: 'The cat was playful, it chased the toy.' The journal discussed pet behavior but used a comma splice.",
        question: "How to fix this comma splice?",
        answers: [
            { text: "A) The cat was playful; it chased the toy.", correct: true },
            { text: "B) The cat was playful, it chased the toy, fun.", correct: false },
            { text: "C) The cat was playful, chasing the toy.", correct: false },
            { text: "D) The cat was playful it chased the toy.", correct: false }
        ],
        explanation: "A semicolon separates the two full sentences.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a community journal in Greenvale stated: 'The festival was loud, everyone danced they cheered.' The journal described events but had boundary errors.",
        question: "How to fix this?",
        answers: [
            { text: "A) The festival was loud, everyone danced they cheered loudly.", correct: false },
            { text: "B) The festival was loud; everyone danced and cheered.", correct: true },
            { text: "C) The festival was loud, everyone danced, cheering.", correct: false },
            { text: "D) The festival was loud everyone danced they cheered.", correct: false }
        ],
        explanation: "A semicolon and 'and' fix the splice and run-on.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a weather journal in Millville stated: 'The storm hit hard, trees fell it was chaotic.' The journal discussed impacts but used a comma splice and run-on.",
        question: "How to fix this?",
        answers: [
            { text: "A) The storm hit hard, trees fell it was chaotic now.", correct: false },
            { text: "B) The storm hit hard; trees fell, and it was chaotic.", correct: true },
            { text: "C) The storm hit hard, trees fell, it was chaotic, bad.", correct: false },
            { text: "D) The storm hit hard trees fell it was chaotic.", correct: false }
        ],
        explanation: "A semicolon and 'and' separate the clauses logically.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, an academic journal in Clearwater stated: 'He practiced daily, he didn’t improve.' The journal discussed effort but used a comma splice.",
        question: "How to fix this comma splice?",
        answers: [
            { text: "A) He practiced daily he didn’t improve.", correct: false },
            { text: "B) He practiced daily, not improving.", correct: false },
            { text: "C) He practiced daily, but he didn’t improve.", correct: true },
            { text: "D) He practiced daily, he didn’t improve, odd.", correct: false }
        ],
        explanation: "'But' with a comma fixes the splice and shows contrast.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a lifestyle journal in Greenvale stated: 'She loved hiking she climbed every weekend.' The journal discussed hobbies but contained a run-on.",
        question: "How to fix this run-on?",
        answers: [
            { text: "A) She loved hiking she climbed every weekend, great.", correct: false },
            { text: "B) She loved hiking, climbing every weekend.", correct: false },
            { text: "C) She loved hiking, she climbed every weekend now.", correct: false },
            { text: "D) She loved hiking, and she climbed every weekend.", correct: true }
        ],
        explanation: "'And' with a comma separates related clauses.",
        difficulty: "medium",
        category: "boundaries"
    }
];

const fragmentQuestions = [
    // Original question
    {
        passage: "In 2024, a weather journal in Greenvale stated: 'Because it rained all day.' The journal discussed indoor plans but used a sentence fragment.",
        question: "How to fix this fragment?",
        answers: [
            { text: "A) Because it rained all day, we stayed inside.", correct: true },
            { text: "B) Because it rained all day, wet.", correct: false },
            { text: "C) Because it rained all day and.", correct: false },
            { text: "D) Because it rained all day fast.", correct: false }
        ],
        explanation: "Adding 'we stayed inside' completes the sentence.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a fitness journal in Millville stated: 'Jogging in the morning.' The journal discussed routines but used a fragment.",
        question: "How to fix this fragment?",
        answers: [
            { text: "A) He was jogging in the morning.", correct: true },
            { text: "B) Jogging in the morning, nice.", correct: false },
            { text: "C) Jogging in the morning fast.", correct: false },
            { text: "D) Jogging in the morning, good.", correct: false }
        ],
        explanation: "Adding 'He was' completes the sentence.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, an academic journal in Clearwater stated: 'When the lecture ended.' The journal discussed classes but used a fragment.",
        question: "How to fix this fragment?",
        answers: [
            { text: "A) When the lecture ended, students left.", correct: true },
            { text: "B) When the lecture ended, done.", correct: false },
            { text: "C) When the lecture ended and.", correct: false },
            { text: "D) When the lecture ended quickly.", correct: false }
        ],
        explanation: "Adding 'students left' completes the thought.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a travel journal in Greenvale stated: 'Under the tall trees.' The journal described camping but used a fragment.",
        question: "How to fix this fragment?",
        answers: [
            { text: "A) Under the tall trees, beautiful.", correct: false },
            { text: "B) We camped under the tall trees.", correct: true },
            { text: "C) Under the tall trees fast.", correct: false },
            { text: "D) Under the tall trees, nice.", correct: false }
        ],
        explanation: "Adding 'We camped' makes it a complete sentence.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a music journal in Millville stated: 'To play the guitar.' The journal discussed hobbies but used a fragment.",
        question: "How to fix this fragment?",
        answers: [
            { text: "A) To play the guitar, awesome.", correct: false },
            { text: "B) She learned to play the guitar.", correct: true },
            { text: "C) To play the guitar fast.", correct: false },
            { text: "D) To play the guitar, cool.", correct: false }
        ],
        explanation: "Adding 'She learned' completes the sentence.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, a community journal in Clearwater stated: 'The chef, a local star.' The journal discussed talents but used a fragment.",
        question: "How to fix this fragment?",
        answers: [
            { text: "A) The chef, a local star, great.", correct: false },
            { text: "B) The chef, a local star and.", correct: false },
            { text: "C) The chef, a local star, cooked for us.", correct: true },
            { text: "D) The chef, a local star, nice.", correct: false }
        ],
        explanation: "Adding 'cooked for us' completes the thought.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a sports journal in Greenvale stated: 'After the match started.' The journal discussed games but used a fragment.",
        question: "How to fix this fragment?",
        answers: [
            { text: "A) After the match started, exciting.", correct: false },
            { text: "B) After the match started and.", correct: false },
            { text: "C) After the match started, fast.", correct: false },
            { text: "D) After the match started, the crowd cheered.", correct: true }
        ],
        explanation: "Adding 'the crowd cheered' completes the sentence.",
        difficulty: "medium",
        category: "boundaries"
    }
];

const punctuationQuestions = [
    // Original question
    {
        passage: "In 2024, a career journal in Clearwater discussed professional ambitions. The journal aimed to introduce goals clearly.",
        question: "Which punctuation fits best? 'She had one job __ to succeed.'",
        answers: [
            { text: "A) :", correct: true },
            { text: "B) ;", correct: false },
            { text: "C) ,", correct: false },
            { text: "D) .", correct: false }
        ],
        explanation: "A colon introduces 'to succeed' as an explanation.",
        difficulty: "easy",
        category: "boundaries"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a travel journal in Millville listed vacation destinations. The journal aimed to clarify complex lists.",
        question: "Which punctuation fits best? 'He visited Paris, France __ London, England __ and Berlin, Germany.'",
        answers: [
            { text: "A) ;", correct: true },
            { text: "B) :", correct: false },
            { text: "C) ,", correct: false },
            { text: "D) —", correct: false }
        ],
        explanation: "Semicolons clarify list items with internal commas.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a fitness journal in Greenvale discussed workout dedication. The journal aimed to connect related efforts.",
        question: "Which punctuation fits best? 'He trained daily __ he improved.'",
        answers: [
            { text: "A) ;", correct: true },
            { text: "B) :", correct: false },
            { text: "C) —", correct: false },
            { text: "D) ,", correct: false }
        ],
        explanation: "A semicolon joins two related full sentences.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a psychology journal in Clearwater described a student’s challenge. The journal aimed to emphasize struggles.",
        question: "Which punctuation fits best? 'Her exam — incredibly tough — tested her.'",
        answers: [
            { text: "A) ;", correct: false },
            { text: "B) —", correct: true },
            { text: "C) :", correct: false },
            { text: "D) ,", correct: false }
        ],
        explanation: "Dashes emphasize 'incredibly tough' dramatically.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a survival journal in Millville listed emergency supplies. The journal aimed to introduce essentials clearly.",
        question: "Which punctuation fits best? 'They packed essentials __ blankets and food.'",
        answers: [
            { text: "A) ;", correct: false },
            { text: "B) :", correct: true },
            { text: "C) ,", correct: false },
            { text: "D) —", correct: false }
        ],
        explanation: "A colon introduces the list of essentials.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, an academic journal in Greenvale discussed study outcomes. The journal aimed to contrast effort and results.",
        question: "Which punctuation fits best? 'She worked hard __ however, she struggled.'",
        answers: [
            { text: "A) :", correct: false },
            { text: "B) ,", correct: false },
            { text: "C) ;", correct: true },
            { text: "D) —", correct: false }
        ],
        explanation: "A semicolon precedes 'however' between full sentences.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a business journal in Clearwater described a risky venture. The journal aimed to highlight strategy.",
        question: "Which punctuation fits best? 'The project — bold but uncertain — succeeded.'",
        answers: [
            { text: "A) ;", correct: false },
            { text: "B) :", correct: false },
            { text: "C) ,", correct: false },
            { text: "D) —", correct: true }
        ],
        explanation: "Dashes emphasize 'bold but uncertain' as an aside.",
        difficulty: "medium",
        category: "boundaries"
    }
];

const clearBoundariesQuestions = [
    // Original question
    {
        passage: "In 2024, a sports journal in Greenvale stated: 'He ran the race winning easily.' The journal discussed victories but lacked clear boundaries.",
        question: "How to clarify?",
        answers: [
            { text: "A) He ran the race and won easily.", correct: true },
            { text: "B) He ran the race winning easily now.", correct: false },
            { text: "C) He ran the race, winning, easily.", correct: false },
            { text: "D) He ran the race winning easily fast.", correct: false }
        ],
        explanation: "'And' separates the actions for clarity.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 1 (Correct: A)
    {
        passage: "In 2023, a community journal in Millville stated: 'She painted the house it was tiring.' The journal discussed home projects but was unclear.",
        question: "How to clarify?",
        answers: [
            { text: "A) She painted the house, and it was tiring.", correct: true },
            { text: "B) She painted the house it was tiring fast.", correct: false },
            { text: "C) She painted the house, it was tiring, hard.", correct: false },
            { text: "D) She painted the house it was tiring now.", correct: false }
        ],
        explanation: "'And' with a comma separates the actions clearly.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 2 (Correct: A)
    {
        passage: "In 2024, a pet journal in Clearwater stated: 'The dog chased the ball barking loudly.' The journal discussed pet behavior but was ambiguous.",
        question: "How to clarify?",
        answers: [
            { text: "A) The dog chased the ball, barking loudly.", correct: true },
            { text: "B) The dog chased the ball barking loudly fast.", correct: false },
            { text: "C) The dog chased the ball, barking, loudly.", correct: false },
            { text: "D) The dog chased the ball barking loudly now.", correct: false }
        ],
        explanation: "A comma clarifies the dog was barking while chasing.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 3 (Correct: B)
    {
        passage: "In 2023, a travel journal in Greenvale stated: 'He hiked the trail exhausted.' The journal discussed adventures but lacked clarity.",
        question: "How to clarify?",
        answers: [
            { text: "A) He hiked the trail exhausted quickly.", correct: false },
            { text: "B) He hiked the trail, feeling exhausted.", correct: true },
            { text: "C) He hiked the trail, exhausted, hard.", correct: false },
            { text: "D) He hiked the trail exhausted now.", correct: false }
        ],
        explanation: "'Feeling' with a comma clarifies he was exhausted.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 4 (Correct: B)
    {
        passage: "In 2024, a food journal in Millville stated: 'She only cooked dinner on holidays.' The journal discussed traditions but was unclear about exclusivity.",
        question: "How to clarify if she cooked nothing else on holidays?",
        answers: [
            { text: "A) She only cooked dinner on holidays fast.", correct: false },
            { text: "B) She cooked only dinner on holidays.", correct: true },
            { text: "C) She only cooked, dinner, on holidays.", correct: false },
            { text: "D) She only cooked dinner on holidays now.", correct: false }
        ],
        explanation: "Moving 'only' clarifies she cooked just dinner.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 5 (Correct: C)
    {
        passage: "In 2023, an academic journal in Clearwater stated: 'After studying the notes, the exam began.' The journal discussed preparation but was ambiguous.",
        question: "How to clarify?",
        answers: [
            { text: "A) After studying the notes, the exam began fast.", correct: false },
            { text: "B) After studying the notes, the exam, began.", correct: false },
            { text: "C) After she studied the notes, the exam began.", correct: true },
            { text: "D) After studying the notes the exam began now.", correct: false }
        ],
        explanation: "Adding 'she' clarifies who studied.",
        difficulty: "medium",
        category: "boundaries"
    },
    // New question 6 (Correct: D)
    {
        passage: "In 2024, a music journal in Greenvale stated: 'She played the piano practicing daily.' The journal discussed practice but lacked clear boundaries.",
        question: "How to clarify?",
        answers: [
            { text: "A) She played the piano practicing daily fast.", correct: false },
            { text: "B) She played the piano, practicing, daily.", correct: false },
            { text: "C) She played the piano practicing daily now.", correct: false },
            { text: "D) She practiced daily and played the piano.", correct: true }
        ],
        explanation: "'And' separates the actions for logical clarity.",
        difficulty: "medium",
        category: "boundaries"
    }
];

// Functions
function updateProgressBar(step) {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const percentage = totalSteps > 0 ? (step / totalSteps) * 100 : 0;
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
        console.log(`Progress updated: ${step}/${totalSteps} (${percentage}%)`);
    } else {
        console.error("Progress bar element not found!");
    }
}

function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        currentItemIndex = 0;
        isQuizPhase = false;
        showingQuizTransition = false;
        totalSteps = lessons[currentLesson].content.length + getQuizQuestions(currentLesson).length;
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        progressSteps = 1;
        updateProgressBar(progressSteps);
        showItem();
    } else {
        console.error("Start lesson button not found!");
    }
}

function showItem() {
    console.log("Showing item for lesson:", currentLesson, "index:", currentItemIndex);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons[currentLesson] && lessons[currentLesson].content[currentItemIndex]) {
        const item = lessons[currentLesson].content[currentItemIndex];
        lessonContent.innerHTML = '';
        if (item.type === "example") {
            lessonContent.innerHTML = `
                <div class="question-row writing-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.content}</div>
                    </div>
                </div>
            `;
            const nextButton = document.getElementById('next-item');
            if (nextButton) {
                nextButton.classList.add('btn', 'next-btn');
                nextButton.addEventListener('click', nextItem, { once: true });
            } else {
                console.error("Next button not found in example!");
            }
        } else if (item.type === "question") {
            lessonContent.innerHTML = `
                <div class="question-row writing-section">
                    <div class="passage-text">${item.passage}</div>
                    <div class="right-column">
                        <div class="question-text">${item.title}: ${item.question}</div>
                        <div class="answer-choices" id="answer-buttons"></div>
                        <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
                    </div>
                </div>
            `;
            const answerButtons = document.getElementById('answer-buttons');
            item.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.innerHTML = option.text;
                button.classList.add("btn");
                button.dataset.correct = option.correct;
                button.addEventListener("click", () => selectAnswer(button, item));
                answerButtons.appendChild(button);
            });
        }
        progressSteps = currentItemIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("No more lesson content, proceeding to quiz transition");
        showQuizTransition();
    }
}

function selectAnswer(selectedBtn, item) {
    const answerButtons = document.querySelectorAll('#answer-buttons .btn');
    const submitButton = document.getElementById('submit-answer');
    const rightColumn = document.querySelector('.right-column');

    answerButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
    });

    if (selectedBtn.dataset.correct === "true") {
        selectedBtn.classList.add("correct");
        categoryStats["boundaries"].correct++;
    } else {
        selectedBtn.classList.add("incorrect");
        categoryStats["boundaries"].incorrect++;
        const explanationDiv = document.createElement("div");
        explanationDiv.classList.add("explanation");
        explanationDiv.innerHTML = item.explanation;
        rightColumn.appendChild(explanationDiv);
    }

    submitButton.style.display = 'inline-block';
    submitButton.addEventListener('click', () => {
        if (!isQuizPhase) {
            nextItem();
        } else {
            nextQuizItem();
        }
    }, { once: true });
}

function nextItem() {
    currentItemIndex++;
    console.log("nextItem called, currentItemIndex:", currentItemIndex);
    if (currentItemIndex < lessons[currentLesson].content.length) {
        showItem();
    } else if (!showingQuizTransition) {
        showQuizTransition();
    }
}

function showQuizTransition() {
    console.log("Showing quiz transition for lesson:", currentLesson);
    showingQuizTransition = true;
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent) {
        lessonContent.innerHTML = `
            <div class="transition-box">
                <div class="centered-content">
                    <h2>Lesson Complete!</h2>
                    <p>Now it's time for the quiz.</p>
                    <button id="start-quiz-btn" class="next-btn">Next</button>
                </div>
            </div>
        `;
        const startQuizBtn = document.getElementById('start-quiz-btn');
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                showingQuizTransition = false;
                showQuiz();
            }, { once: true });
        } else {
            console.error("Start quiz button not found in transition!");
        }
        progressSteps = lessons[currentLesson].content.length;
        updateProgressBar(progressSteps);
    } else {
        console.error("Lesson content element not found for quiz transition!");
    }
}

function showQuiz() {
    console.log("Starting quiz for lesson:", currentLesson);
    isQuizPhase = true;
    currentQuestionIndex = 0;
    let quizQuestions = getQuizQuestions(currentLesson);
    progressSteps = lessons[currentLesson].content.length + 1;
    updateProgressBar(progressSteps);
    showNextQuizQuestion(quizQuestions);
}

function getQuizQuestions(lessonId) {
    switch (parseInt(lessonId)) {
        case 1: return runOnSpliceQuestions;
        case 2: return fragmentQuestions;
        case 3: return punctuationQuestions;
        case 4: return clearBoundariesQuestions;
        default: return runOnSpliceQuestions;
    }
}

function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-row writing-section">
                <div class="passage-text">${question.passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="next-btn" style="display: none;">Next</button>
                </div>
            </div>
        `;
        const answerButtons = document.getElementById('answer-buttons');
        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            button.dataset.correct = answer.correct;
            button.addEventListener("click", () => selectAnswer(button, question));
            answerButtons.appendChild(button);
        });
        progressSteps = lessons[currentLesson].content.length + currentQuestionIndex + 1;
        updateProgressBar(progressSteps);
    } else {
        console.log("Quiz complete, showing final score");
        showFinalScore();
    }
}

function saveLessonCompletion() {
    const completionData = {
        exam: "SAT",
        type: "lesson",
        timestamp: new Date().toISOString()
    };
    localStorage.setItem("lastActivity", JSON.stringify(completionData));
    console.log("Saved lesson completion:", completionData);
}

function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions = getQuizQuestions(currentLesson);
    showNextQuizQuestion(quizQuestions);
}

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = categoryStats["boundaries"].correct;
    let totalAttempted = totalCorrect + categoryStats["boundaries"].incorrect;


    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    logFinalScore(totalCorrect, totalAttempted);
    saveScore(currentLesson, score);

    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = `
        <div class="score-box">
            <div class="centered-content">
                <h2>Final Score</h2>
                <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
                <p>Your score: ${percentage}%</p>
                <button id="continue-button" class="btn continue-btn">Continue</button>
            </div>
        </div>
    `;
    const finalScoreElement = document.getElementById('final-score');
    if (finalScoreElement) finalScoreElement.classList.add('hide');
    document.getElementById('continue-button').addEventListener('click', () => {
        saveLessonCompletion();
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("satTestResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("satTestResults", JSON.stringify(results));
    console.log("Final stored satTestResults:", results);
    for (let category in categoryStats) {
        categoryStats[category].correct = 0;
        categoryStats[category].incorrect = 0;
    }
}

function logFinalScore(totalCorrect, totalAttempted) {
    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    localStorage.setItem("finalScore", JSON.stringify({
        correct: totalCorrect,
        attempted: totalAttempted,
        percentage: percentage,
        lesson: currentLesson
    }));
    console.log("Final score logged:", { totalCorrect, totalAttempted, percentage, lesson: currentLesson });
}

function saveScore(lessonId, score) {
    localStorage.setItem(`boundaries-lessonScore-${lessonId}`, score);
    console.log(`Saved boundaries-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`boundaries-lessonScore-${lessonId}`) || "Not completed yet";
}

function showScore() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        const score = getScore(currentLesson);
        scoreDisplay.innerHTML = `Previous Score for Lesson ${currentLesson}: ${score}`;
    } else {
        console.log("Score display element not found, skipping showScore");
    }
}