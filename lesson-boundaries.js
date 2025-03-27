// Ensure scores display on page load by calling showScore
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start Lesson Button event listener added.");
    } else {
        console.error("Start lesson button not found.");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || 1;
    console.log(`Loading lesson ${lessonId}`);
    currentLesson = lessonId;

    showScore();
});

// Define all lessons
const lessons = {
    1: {
        title: "Avoiding Run-On Sentences and Comma Splices",
        content: [
            {
                type: "example",
                title: "Example 1: Run-On Sentence",
                content: `
                    <h2>Example 1: Run-On Sentence</h2>
                    <p>Wrong: 'She wanted to win she trained hard.'</p>
                    <p>Question: How to fix this run-on?</p>
                    <p>Step 1: Identify: Two independent clauses with no break.</p>
                    <p>Step 2: Fix: Add a period or conjunction.</p>
                    <p>Correct: 'She wanted to win, so she trained hard.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "'She studied all night, she passed the test.' How to fix this comma splice?",
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
                    <p>Wrong: 'He was tired, he kept running.'</p>
                    <p>Question: How to fix this comma splice?</p>
                    <p>Step 1: Identify: Two full sentences joined by a comma.</p>
                    <p>Step 2: Fix: Use a semicolon or period.</p>
                    <p>Correct: 'He was tired; he kept running.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "'The rain stopped we went outside.' How to fix this run-on?",
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
                    <p>Wrong: 'He was late, he ran fast he caught the bus.'</p>
                    <p>Question: How to fix this?</p>
                    <p>Step 1: Identify: Comma splice and run-on.</p>
                    <p>Step 2: Fix: Break into proper sentences.</p>
                    <p>Correct: 'He was late, so he ran fast. He caught the bus.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "'The dog barked, it scared me I jumped.' How to fix this?",
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
                    <p>Wrong: 'She loves cats she feeds them daily.'</p>
                    <p>Question: How to fix this run-on?</p>
                    <p>Step 1: Identify: Two related independent clauses.</p>
                    <p>Step 2: Fix: Use a semicolon.</p>
                    <p>Correct: 'She loves cats; she feeds them daily.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "'He missed the train, he was early.' How to fix this comma splice?",
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
                    <p>Wrong: 'She wanted to go, she stayed home.'</p>
                    <p>Question: How to fix this comma splice?</p>
                    <p>Step 1: Identify: Two contrasting full sentences.</p>
                    <p>Step 2: Fix: Use 'but' with a comma.</p>
                    <p>Correct: 'She wanted to go, but she stayed home.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "'The movie was long, I enjoyed it.' How to fix this comma splice?",
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
                    <p>Wrong: 'It rained all day we stayed inside.'</p>
                    <p>Question: How to fix this run-on?</p>
                    <p>Step 1: Identify: Cause-effect with no break.</p>
                    <p>Step 2: Fix: Add 'so' with a comma.</p>
                    <p>Correct: 'It rained all day, so we stayed inside.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "'The power went out we lit candles.' How to fix this run-on?",
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
                    <p>Wrong: 'She finished her homework, she went to bed.'</p>
                    <p>Question: How to fix this comma splice?</p>
                    <p>Step 1: Identify: Two full sentences in sequence.</p>
                    <p>Step 2: Fix: Use a period or 'and'.</p>
                    <p>Correct: 'She finished her homework. She went to bed.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "'He cooked dinner, he ate alone.' How to fix this comma splice?",
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
                    <p>Wrong: 'Running through the park.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No subject or complete thought.</p>
                    <p>Step 2: Fix: Add a subject and verb.</p>
                    <p>Correct: 'She was running through the park.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "'Hoping to win.' How to fix this fragment?",
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
                    <p>Wrong: 'Because he forgot his lines.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: 'Because' makes it incomplete.</p>
                    <p>Step 2: Fix: Add an independent clause.</p>
                    <p>Correct: 'Because he forgot his lines, he improvised.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "'Although the team tried hard.' How to fix this fragment?",
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
                    <p>Wrong: 'A loud crash in the night.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No verb or complete idea.</p>
                    <p>Step 2: Fix: Add a verb and subject.</p>
                    <p>Correct: 'A loud crash woke us in the night.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "'Swimming in the lake.' How to fix this fragment?",
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
                    <p>Wrong: 'When the bell rang.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: 'When' needs a main clause.</p>
                    <p>Step 2: Fix: Add a complete thought.</p>
                    <p>Correct: 'When the bell rang, we left.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "'If it snows.' How to fix this fragment?",
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
                    <p>Wrong: 'Under the bright stars.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No subject or verb.</p>
                    <p>Step 2: Fix: Add a complete clause.</p>
                    <p>Correct: 'We sat under the bright stars.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "'After the game ended.' How to fix this fragment?",
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
                    <p>Wrong: 'To finish the race.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No subject or finite verb.</p>
                    <p>Step 2: Fix: Add a subject and verb.</p>
                    <p>Correct: 'He wanted to finish the race.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "'To bake a cake.' How to fix this fragment?",
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
                    <p>Wrong: 'My friend, a great cook.'</p>
                    <p>Question: Why is this a fragment?</p>
                    <p>Step 1: Check: No verb or complete idea.</p>
                    <p>Step 2: Fix: Add a verb.</p>
                    <p>Correct: 'My friend, a great cook, made dinner.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "'The car, a red sedan.' How to fix this fragment?",
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
                    <p>Context: Two related full sentences.</p>
                    <p>Correct: 'She loved art; she painted daily.'</p>
                    <p>Question: Why use a semicolon?</p>
                    <p>Step 1: Check: Two independent clauses.</p>
                    <p>Step 2: Confirm: Closely related ideas.</p>
                    <p>Answer: Links related full sentences.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "'She was tired __ she kept going.' Which punctuation fits best?",
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
                    <p>Context: Introducing a list.</p>
                    <p>Correct: 'He packed three things: a book, a pen, a snack.'</p>
                    <p>Question: Why use a colon?</p>
                    <p>Step 1: Check: Introduces specifics.</p>
                    <p>Step 2: Confirm: Follows a complete sentence.</p>
                    <p>Answer: Sets up a list or explanation.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "'He had one goal __ to win.' Which punctuation fits best?",
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
                    <p>Context: Adding emphasis.</p>
                    <p>Correct: 'Her dream — to travel the world — inspired her.'</p>
                    <p>Question: Why use dashes?</p>
                    <p>Step 1: Check: Adds a dramatic pause.</p>
                    <p>Step 2: Confirm: Highlights key info.</p>
                    <p>Answer: Emphasizes an interruption or addition.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "'The test — very hard — scared him.' Which punctuation fits best?",
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
                    <p>Context: Related ideas with a transition.</p>
                    <p>Correct: 'He was late; however, he still won.'</p>
                    <p>Question: Why use a semicolon?</p>
                    <p>Step 1: Check: Two full sentences with contrast.</p>
                    <p>Step 2: Confirm: 'However' needs a semicolon before it.</p>
                    <p>Answer: Separates clauses with a conjunctive adverb.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "'She studied hard __ however, she failed.' Which punctuation fits best?",
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
                    <p>Context: Explaining a statement.</p>
                    <p>Correct: 'She had one fear: heights scared her.'</p>
                    <p>Question: Why use a colon?</p>
                    <p>Step 1: Check: Introduces an explanation.</p>
                    <p>Step 2: Confirm: Follows a complete idea.</p>
                    <p>Answer: Clarifies what the fear is.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "'They needed supplies __ food and water.' Which punctuation fits best?",
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
                    <p>Context: Breaking the flow.</p>
                    <p>Correct: 'The plan — risky but bold — worked.'</p>
                    <p>Question: Why use dashes?</p>
                    <p>Step 1: Check: Adds extra info with emphasis.</p>
                    <p>Step 2: Confirm: Sets off a descriptive phrase.</p>
                    <p>Answer: Highlights the interruption strongly.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "'His goal — to succeed — drove him.' Which punctuation fits best?",
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
                    <p>Context: Complex list items.</p>
                    <p>Correct: 'She visited Paris, France; Tokyo, Japan; and Rome, Italy.'</p>
                    <p>Question: Why use semicolons?</p>
                    <p>Step 1: Check: List items have commas within them.</p>
                    <p>Step 2: Confirm: Semicolons avoid confusion.</p>
                    <p>Answer: Separates items clearly in a list.</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "'They invited Bob, a chef __ Sue, a baker __ and Tim, a writer.' Which punctuation fits best?",
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
                    <p>Wrong: 'She cooked dinner after work was exhausting.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Boundary confusion — what’s exhausting?</p>
                    <p>Step 2: Fix: Separate ideas logically.</p>
                    <p>Correct: 'She cooked dinner after work. It was exhausting.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 1",
                question: "'She danced all night the party was fun.' How to clarify?",
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
                    <p>Wrong: 'He missed the bus running late.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Who’s running late?</p>
                    <p>Step 2: Fix: Clarify with boundaries.</p>
                    <p>Correct: 'He missed the bus because he was running late.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 2",
                question: "'He studied hard the test was easy.' How to clarify?",
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
                    <p>Wrong: 'The dog barked at the mailman wearing a hat.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Who’s wearing the hat?</p>
                    <p>Step 2: Fix: Set clear boundaries.</p>
                    <p>Correct: 'The dog barked at the mailman, who was wearing a hat.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 3",
                question: "'She fed the cat crying loudly.' How to clarify?",
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
                    <p>Wrong: 'He left early traffic was bad.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Cause or sequence unclear.</p>
                    <p>Step 2: Fix: Add a conjunction or punctuation.</p>
                    <p>Correct: 'He left early because traffic was bad.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 4",
                question: "'They played music the room filled up.' How to clarify?",
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
                    <p>Wrong: 'She almost drove her kids to school every day.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: 'Almost' placement confuses meaning.</p>
                    <p>Step 2: Fix: Move modifier for clarity.</p>
                    <p>Correct: 'She drove her kids to school almost every day.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 5",
                question: "'He only ate pizza on weekends.' How to clarify if he ate nothing else on weekends?",
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
                    <p>Wrong: 'She won the race training hard.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Sequence and cause muddled.</p>
                    <p>Step 2: Fix: Separate and clarify.</p>
                    <p>Correct: 'She trained hard and won the race.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 6",
                question: "'He scored a goal kicking the ball.' How to clarify?",
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
                    <p>Wrong: 'After finishing the book, the movie started.'</p>
                    <p>Question: Why is this unclear?</p>
                    <p>Step 1: Check: Who finished the book?</p>
                    <p>Step 2: Fix: Specify the subject.</p>
                    <p>Correct: 'After she finished the book, the movie started.'</p>
                    <button id="next-item">Next</button>
                `
            },
            {
                type: "question",
                title: "Question 7",
                question: "'While reading the news, the dog barked.' How to clarify?",
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

// Boundaries question arrays
const runOnSpliceQuestions = [
    {
        question: "'She was hungry, she ate fast.' How to fix this comma splice?",
        answers: [
            { text: "A) She was hungry; she ate fast.", correct: true },
            { text: "B) She was hungry, she ate fast, good.", correct: false },
            { text: "C) She was hungry, eating fast.", correct: false },
            { text: "D) She was hungry, she ate fast now.", correct: false }
        ],
        explanation: "A semicolon separates two full sentences correctly.",
        difficulty: "easy",
        category: "boundaries"
    }
];

const fragmentQuestions = [
    {
        question: "'Because it rained all day.' How to fix this fragment?",
        answers: [
            { text: "A) Because it rained all day, we stayed inside.", correct: true },
            { text: "B) Because it rained all day, wet.", correct: false },
            { text: "C) Because it rained all day and.", correct: false },
            { text: "D) Because it rained all day fast.", correct: false }
        ],
        explanation: "Adding 'we stayed inside' completes the sentence.",
        difficulty: "medium",
        category: "boundaries"
    }
];

const punctuationQuestions = [
    {
        question: "'She had one job __ to succeed.' Which punctuation fits best?",
        answers: [
            { text: "A) :", correct: true },
            { text: "B) ;", correct: false },
            { text: "C) ,", correct: false },
            { text: "D) .", correct: false }
        ],
        explanation: "A colon introduces 'to succeed' as an explanation.",
        difficulty: "easy",
        category: "boundaries"
    }
];

const clearBoundariesQuestions = [
    {
        question: "'He ran the race winning easily.' How to clarify?",
        answers: [
            { text: "A) He ran the race and won easily.", correct: true },
            { text: "B) He ran the race winning easily now.", correct: false },
            { text: "C) He ran the race, winning, easily.", correct: false },
            { text: "D) He ran the race winning easily fast.", correct: false }
        ],
        explanation: "'And' separates the actions for clarity.",
        difficulty: "medium",
        category: "boundaries"
    }
];

// lesson-boundaries.js
let categoryStats = {
    "boundaries": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;
let currentItemIndex = 0;
let progressSteps = 0;
let totalSteps = 15; // Default for Lesson 1: 14 items + 1 quiz
let isQuizPhase = false;

function updateProgressBar(step) {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const percentage = (step / totalSteps) * 100;
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
        totalSteps = lessons[currentLesson].content.length + 1;
        console.log(`Set totalSteps to ${totalSteps} for lesson ${currentLesson}`);
        showItem();
        progressSteps = 1;
        updateProgressBar(progressSteps);
    } else {
        console.error("Start lesson button not found!");
    }
}

function showItem() {
    console.log("Showing item for lesson:", currentLesson, "at index:", currentItemIndex);
    const lessonContent = document.getElementById('lesson-content');
    const currentLessonData = lessons[currentLesson];
    if (!lessonContent || !currentLessonData || !currentLessonData.content) {
        console.error("Lesson content or data missing!");
        return;
    }

    const item = currentLessonData.content[currentItemIndex];
    if (!item) {
        console.log("No more items, proceeding to quiz");
        showQuiz();
        return;
    }

    if (item.type === "example") {
        const passage = extractPassage(item.content);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">${item.content.replace(passage, '').replace(/<button id="next-item">Next<\/button>/, '')}</div>
                    <button id="next-item" class="btn next-btn">Next</button>
                </div>
            </div>
        `;
        const nextButton = document.getElementById('next-item');
        if (nextButton) {
            nextButton.addEventListener('click', nextItem, { once: true });
            console.log("Next button styled and listener added");
        } else {
            console.error("Next item button not found in example!");
        }
    } else if (item.type === "question") {
        const passage = extractPassage(item.question);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">${item.title}: ${item.question.replace(passage, '')}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="btn next-btn" style="display: none;">Next</button>
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
}

function extractPassage(content) {
    const passageMatch = content.match(/<p>Wrong:.*?(?=<p>Question:|$)/is) || 
                        content.match(/Context:.*?(?=<p>Correct:|$)/is) || 
                        content.match(/'.*?'(?=\s*How to fix|\s*Which punctuation)/is);
    return passageMatch ? passageMatch[0] : "";
}

function selectAnswer(selectedBtn, item) {
    const answerButtons = document.querySelectorAll('#answer-buttons .btn');
    const submitButton = document.getElementById('submit-answer');
    const lessonContent = document.getElementById('lesson-content');

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
        lessonContent.querySelector('.right-column').appendChild(explanationDiv);
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
    progressSteps = currentItemIndex + 1;
    updateProgressBar(progressSteps);
    console.log("nextItem called, currentItemIndex:", currentItemIndex);
    showItem();
}

function showQuiz() {
    console.log("Starting quiz for lesson:", currentLesson);
    isQuizPhase = true;
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = runOnSpliceQuestions; break;
        case 2: quizQuestions = fragmentQuestions; break;
        case 3: quizQuestions = punctuationQuestions; break;
        case 4: quizQuestions = clearBoundariesQuestions; break;
        default: quizQuestions = runOnSpliceQuestions;
    }
    progressSteps = totalSteps;
    updateProgressBar(progressSteps);
    showNextQuizQuestion(quizQuestions);
}

function showNextQuizQuestion(quizQuestions) {
    console.log("showNextQuizQuestion called, currentQuestionIndex:", currentQuestionIndex, "quizQuestions.length:", quizQuestions.length);
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        const passage = extractPassage(question.question);
        lessonContent.innerHTML = `
            <div class="question-row">
                <div class="passage-text">${passage}</div>
                <div class="right-column">
                    <div class="question-text">Question ${currentQuestionIndex + 1}: ${question.question.replace(passage, '')}</div>
                    <div class="answer-choices" id="answer-buttons"></div>
                    <button id="submit-answer" class="btn next-btn" style="display: none;">Next</button>
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
    } else {
        console.log("All quiz questions answered, showing final score");
        showFinalScore();
    }
}

function nextQuizItem() {
    currentQuestionIndex++;
    console.log("nextQuizItem called, currentQuestionIndex:", currentQuestionIndex);
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = runOnSpliceQuestions; break;
        case 2: quizQuestions = fragmentQuestions; break;
        case 3: quizQuestions = punctuationQuestions; break;
        case 4: quizQuestions = clearBoundariesQuestions; break;
        default: quizQuestions = runOnSpliceQuestions;
    }
    showNextQuizQuestion(quizQuestions);
}

function showFinalScore() {
    console.log("Running showFinalScore for lesson:", currentLesson);
    let totalCorrect = 0;
    let totalAttempted = 0;

    for (let category in categoryStats) {
        totalCorrect += categoryStats[category].correct;
        totalAttempted += categoryStats[category].correct + categoryStats[category].incorrect;
    }

    logFinalScore(totalCorrect, totalAttempted);

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const score = `${totalCorrect}/${totalAttempted} (${percentage}%)`;
    console.log("Saving score:", score);
    saveScore(currentLesson, score);

    const finalScoreElement = document.getElementById('final-score');
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = '';
    finalScoreElement.classList.remove('hide');
    finalScoreElement.innerHTML = `
        <h2>Final Score</h2>
        <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
        <p>Your score: ${percentage}%</p>
        <button id="continue-button" class="btn continue-btn">Continue</button>
    `;
    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    }, { once: true });

    recordTestResults();
}

function recordTestResults() {
    console.log("Recording results. Current categoryStats:", categoryStats);
    let storedResults = localStorage.getItem("testResults");
    let results = storedResults ? JSON.parse(storedResults) : {};
    for (let category in categoryStats) {
        if (!results[category]) results[category] = { correct: 0, incorrect: 0 };
        results[category].correct += categoryStats[category].correct || 0;
        results[category].incorrect += categoryStats[category].incorrect || 0;
    }
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Final stored testResults:", results);
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
    const finalScoreElement = document.getElementById('final-score');
    if (finalScoreElement) {
        const score = getScore(currentLesson);
        if (score !== "Not completed yet") {
            finalScoreElement.innerHTML = `
                <h2>Previous Score</h2>
                <p>Your previous score for this lesson: ${score}</p>
            `;
            finalScoreElement.classList.remove('hide');
        } else {
            finalScoreElement.classList.add('hide');
        }
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded, initializing lesson:", currentLesson);
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 1;
    console.log("Set currentLesson to:", currentLesson);

    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.addEventListener('click', startLesson);
        console.log("Start lesson button event listener added");
    } else {
        console.error("Start lesson button not found on page load!");
    }

    showScore();
});