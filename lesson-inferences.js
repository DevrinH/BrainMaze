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
        title: "Drawing Logical Conclusions",
        examples: [
            {
                title: "Example: Making a Logical Conclusion",
                content: `
                    <h2>Example: Making a Logical Conclusion</h2>
                    <p>Passage: 'The team practiced daily and won every game this season.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Identify facts: Daily practice, consistent wins.</p>
                    <p>Step 2: Connect logically: Practice likely improved performance.</p>
                    <p>Conclusion: The team’s success is due to regular practice.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Avoiding Overreach",
                content: `
                    <h2>Example: Avoiding Overreach</h2>
                    <p>Passage: 'She studied late and passed the exam.'</p>
                    <p>Question: What can be concluded?</p>
                    <p>Step 1: Facts: Late studying, exam passed.</p>
                    <p>Step 2: Logical limit: Studying helped, but no guarantee of perfection.</p>
                    <p>Conclusion: Her studying contributed to passing.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The store sold out of coats after a cold snap hit.' What can be concluded?",
                options: [
                    { text: "A) The cold snap increased coat demand", correct: true },
                    { text: "B) The store had no coats left last year", correct: false },
                    { text: "C) People disliked the coats", correct: false },
                    { text: "D) The store closed after selling out", correct: false }
                ],
                explanation: "The sell-out after the cold snap logically suggests higher demand due to weather."
            },
            {
                title: "Question 2",
                question: "Passage: 'He trained for months and finished the race.' What can be concluded?",
                options: [
                    { text: "A) Training helped him complete the race", correct: true },
                    { text: "B) He won the race", correct: false },
                    { text: "C) He didn’t train enough", correct: false },
                    { text: "D) The race was easy", correct: false }
                ],
                explanation: "Training and finishing suggest effort paid off, but winning isn’t implied."
            }
        ],
        additionalExample: {
            title: "Example: Complex Conclusions",
            content: `
                <h2>Example: Complex Conclusions</h2>
                <p>Passage: 'The city banned cars downtown, and air quality improved.'</p>
                <p>Question: What can be concluded?</p>
                <p>Step 1: Facts: Car ban, better air quality.</p>
                <p>Step 2: Logical link: Fewer cars likely reduced pollution.</p>
                <p>Conclusion: The car ban improved air quality.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    2: {
        title: "Inferring the Author’s Perspective and Tone",
        examples: [
            {
                title: "Example: Detecting Tone",
                content: `
                    <h2>Example: Detecting Tone</h2>
                    <p>Passage: 'These so-called experts know nothing about real solutions.'</p>
                    <p>Question: What is the author’s tone?</p>
                    <p>Step 1: Analyze word choice: 'so-called' and 'nothing' suggest doubt.</p>
                    <p>Step 2: Infer tone: Dismissive and critical.</p>
                    <p>Tone: Sarcastic and skeptical.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Inferring Perspective",
                content: `
                    <h2>Example: Inferring Perspective</h2>
                    <p>Passage: 'Technology saves time, yet it isolates us from real connections.'</p>
                    <p>Question: What is the author’s perspective?</p>
                    <p>Step 1: Note balance: Positive ('saves time') and negative ('isolates').</p>
                    <p>Step 2: Infer: Mixed feelings about technology.</p>
                    <p>Perspective: Technology has benefits but also drawbacks.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The glorious past outshines our dull present.' What is the author’s tone?",
                options: [
                    { text: "A) Nostalgic", correct: true },
                    { text: "B) Cheerful", correct: false },
                    { text: "C) Angry", correct: false },
                    { text: "D) Neutral", correct: false }
                ],
                explanation: "'Glorious past' and 'dull present' suggest a longing for the past."
            },
            {
                title: "Question 2",
                question: "Passage: 'We must embrace change to survive.' What is the author’s perspective?",
                options: [
                    { text: "A) Change is necessary", correct: true },
                    { text: "B) Change is optional", correct: false },
                    { text: "C) Change is harmful", correct: false },
                    { text: "D) Change is impossible", correct: false }
                ],
                explanation: "'Must embrace' and 'survive' show a belief in the need for change."
            }
        ],
        additionalExample: {
            title: "Example: Tone and Perspective Together",
            content: `
                <h2>Example: Tone and Perspective Together</h2>
                <p>Passage: 'Politicians bicker while the planet burns—pathetic.'</p>
                <p>Question: What are the tone and perspective?</p>
                <p>Step 1: Tone from 'pathetic': Frustrated, critical.</p>
                <p>Step 2: Perspective from context: Urgency about environmental issues.</p>
                <p>Tone: Frustrated; Perspective: Concerned about inaction.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    3: {
        title: "Predicting Outcomes and Next Steps",
        examples: [
            {
                title: "Example: Predicting an Outcome",
                content: `
                    <h2>Example: Predicting an Outcome</h2>
                    <p>Passage: 'The dam weakened after heavy rain.'</p>
                    <p>Question: What is likely to happen next?</p>
                    <p>Step 1: Assess situation: Weak dam, heavy rain.</p>
                    <p>Step 2: Predict: Increased risk of failure.</p>
                    <p>Outcome: The dam might break.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Next Steps",
                content: `
                    <h2>Example: Next Steps</h2>
                    <p>Passage: 'The experiment failed due to a flawed design.'</p>
                    <p>Question: What is the next logical step?</p>
                    <p>Step 1: Identify issue: Flawed design caused failure.</p>
                    <p>Step 2: Infer action: Fix the design.</p>
                    <p>Next step: Redesign the experiment.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The team lost funding after poor results.' What is a likely outcome?",
                options: [
                    { text: "A) The project will stop", correct: true },
                    { text: "B) The team will win awards", correct: false },
                    { text: "C) Funding will increase", correct: false },
                    { text: "D) Results will improve", correct: false }
                ],
                explanation: "Lost funding logically suggests the project can’t continue."
            },
            {
                title: "Question 2",
                question: "Passage: 'The law raised taxes with no public support.' What is a likely next step?",
                options: [
                    { text: "A) Protests will occur", correct: true },
                    { text: "B) Taxes will decrease", correct: false },
                    { text: "C) Support will rise", correct: false },
                    { text: "D) The law will expand", correct: false }
                ],
                explanation: "No support suggests public backlash, like protests."
            }
        ],
        additionalExample: {
            title: "Example: Outcome with Evidence",
            content: `
                <h2>Example: Outcome with Evidence</h2>
                <p>Passage: 'Sales dropped after prices rose 20%.'</p>
                <p>Question: What is a likely outcome?</p>
                <p>Step 1: Link cause and effect: Price hike, sales drop.</p>
                <p>Step 2: Predict: Continued high prices may worsen sales.</p>
                <p>Outcome: Sales may decline further.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    4: {
        title: "Understanding Relationships Between Ideas",
        examples: [
            {
                title: "Example: Cause and Effect",
                content: `
                    <h2>Example: Cause and Effect</h2>
                    <p>Passage: 'The factory closed, so workers lost jobs.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Identify ideas: Factory closure, job loss.</p>
                    <p>Step 2: Link: 'So' indicates cause-effect.</p>
                    <p>Relationship: Closure caused job loss.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Contrast",
                content: `
                    <h2>Example: Contrast</h2>
                    <p>Passage: 'City life is fast-paced, but rural life is calm.'</p>
                    <p>Question: What is the relationship?</p>
                    <p>Step 1: Compare ideas: City vs. rural life.</p>
                    <p>Step 2: Note 'but': Signals opposition.</p>
                    <p>Relationship: Contrast between pace of life.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'Rain delayed the game, causing frustration.' What is the relationship?",
                options: [
                    { text: "A) Cause and effect", correct: true },
                    { text: "B) Similarity", correct: false },
                    { text: "C) Contrast", correct: false },
                    { text: "D) Sequence", correct: false }
                ],
                explanation: "Rain caused delay and frustration, showing cause-effect."
            },
            {
                title: "Question 2",
                question: "Passage: 'Some support the plan, while others oppose it.' What is the relationship?",
                options: [
                    { text: "A) Contrast", correct: true },
                    { text: "B) Cause and effect", correct: false },
                    { text: "C) Support", correct: false },
                    { text: "D) Chronology", correct: false }
                ],
                explanation: "'While' highlights opposing views, indicating contrast."
            }
        ],
        additionalExample: {
            title: "Example: Sequence",
            content: `
                <h2>Example: Sequence</h2>
                <p>Passage: 'She studied, then aced the test.'</p>
                <p>Question: What is the relationship?</p>
                <p>Step 1: Order ideas: Studying, then acing.</p>
                <p>Step 2: 'Then' shows time sequence.</p>
                <p>Relationship: Studying preceded success.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    5: {
        title: "Interpreting Figurative Language and Symbolism",
        examples: [
            {
                title: "Example: Figurative Language",
                content: `
                    <h2>Example: Figurative Language</h2>
                    <p>Passage: 'Her words cut like a knife.'</p>
                    <p>Question: What does this mean?</p>
                    <p>Step 1: Recognize figure: 'Cut like a knife' isn’t literal.</p>
                    <p>Step 2: Interpret: Words were sharp, hurtful.</p>
                    <p>Meaning: Her words were painful.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Symbolism",
                content: `
                    <h2>Example: Symbolism</h2>
                    <p>Passage: 'The dove flew over the battlefield.'</p>
                    <p>Question: What does the dove symbolize?</p>
                    <p>Step 1: Context: Battlefield (war).</p>
                    <p>Step 2: Symbol: Dove often means peace.</p>
                    <p>Symbolism: Hope for peace amid conflict.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'His temper was a volcano.' What does this mean?",
                options: [
                    { text: "A) His anger was explosive", correct: true },
                    { text: "B) He was warm", correct: false },
                    { text: "C) He liked volcanoes", correct: false },
                    { text: "D) He was calm", correct: false }
                ],
                explanation: "A volcano implies sudden, intense anger."
            },
            {
                title: "Question 2",
                question: "Passage: 'The crown gleamed in the dark.' What does the crown symbolize?",
                options: [
                    { text: "A) Power", correct: true },
                    { text: "B) Darkness", correct: false },
                    { text: "C) Jewelry", correct: false },
                    { text: "D) Light", correct: false }
                ],
                explanation: "A crown typically represents authority or power."
            }
        ],
        additionalExample: {
            title: "Example: Combined Interpretation",
            content: `
                <h2>Example: Combined Interpretation</h2>
                <p>Passage: 'The storm of their argument raged all night.'</p>
                <p>Question: What does this suggest?</p>
                <p>Step 1: Figurative: 'Storm' implies intensity.</p>
                <p>Step 2: Interpret: Argument was fierce, ongoing.</p>
                <p>Meaning: Their dispute was loud and prolonged.</p>
                <button id="next-question">Next Question</button>
            `
        }
    },
    6: {
        title: "Inferring Meaning from Context",
        examples: [
            {
                title: "Example: Word Meaning",
                content: `
                    <h2>Example: Word Meaning</h2>
                    <p>Passage: 'The arduous task took hours to complete.'</p>
                    <p>Question: What does 'arduous' mean?</p>
                    <p>Step 1: Context: Took hours.</p>
                    <p>Step 2: Infer: Difficult or tiring.</p>
                    <p>Meaning: 'Arduous' means challenging.</p>
                    <button id="next-example">Next Example</button>
                `
            },
            {
                title: "Example: Implied Idea",
                content: `
                    <h2>Example: Implied Idea</h2>
                    <p>Passage: 'He smiled despite the grim news.'</p>
                    <p>Question: What can be inferred?</p>
                    <p>Step 1: Contrast: Smiling vs. grim news.</p>
                    <p>Step 2: Infer: He’s hiding feelings or staying positive.</p>
                    <p>Meaning: He’s masking sadness or being resilient.</p>
                    <button id="next-question">Next Question</button>
                `
            }
        ],
        questions: [
            {
                title: "Question 1",
                question: "Passage: 'The jovial crowd cheered loudly.' What does 'jovial' mean?",
                options: [
                    { text: "A) Happy", correct: true },
                    { text: "B) Angry", correct: false },
                    { text: "C) Quiet", correct: false },
                    { text: "D) Sad", correct: false }
                ],
                explanation: "Cheering loudly suggests a joyful, happy mood."
            },
            {
                title: "Question 2",
                question: "Passage: 'She hesitated before the leap.' What can be inferred?",
                options: [
                    { text: "A) She was nervous", correct: true },
                    { text: "B) She was excited", correct: false },
                    { text: "C) She jumped quickly", correct: false },
                    { text: "D) She didn’t leap", correct: false }
                ],
                explanation: "Hesitation implies uncertainty or fear."
            }
        ],
        additionalExample: {
            title: "Example: Broader Context",
            content: `
                <h2>Example: Broader Context</h2>
                <p>Passage: 'The cryptic message puzzled everyone at the meeting.'</p>
                <p>Question: What does 'cryptic' mean?</p>
                <p>Step 1: Clue: Puzzled everyone.</p>
                <p>Step 2: Infer: Mysterious or unclear.</p>
                <p>Meaning: 'Cryptic' means confusing.</p>
                <button id="next-question">Next Question</button>
            `
        }
    }
};

// Inferences question arrays
const logicalConclusionsQuestions = [
    {
        question: "Passage: 'The lights flickered, then went out during the storm.' What can be concluded?",
        answers: [
            { text: "A) The storm caused a power outage", correct: true },
            { text: "B) The lights were old", correct: false },
            { text: "C) Someone turned off the lights", correct: false },
            { text: "D) The storm ended", correct: false }
        ],
        explanation: "Flickering then outage during a storm suggests a weather-related power loss.",
        difficulty: "easy",
        category: "inferences"
    }
];

const perspectiveToneQuestions = [
    {
        question: "Passage: 'These outdated rules hinder progress.' What is the author’s tone?",
        answers: [
            { text: "A) Critical", correct: true },
            { text: "B) Supportive", correct: false },
            { text: "C) Joyful", correct: false },
            { text: "D) Neutral", correct: false }
        ],
        explanation: "'Outdated' and 'hinder' show disapproval, indicating a critical tone.",
        difficulty: "medium",
        category: "inferences"
    }
];

const predictingOutcomesQuestions = [
    {
        question: "Passage: 'The bridge creaked under the heavy load.' What is a likely outcome?",
        answers: [
            { text: "A) The bridge may collapse", correct: true },
            { text: "B) The load will lighten", correct: false },
            { text: "C) The bridge will be repaired", correct: false },
            { text: "D) Traffic will increase", correct: false }
        ],
        explanation: "Creaking under weight suggests structural failure is possible.",
        difficulty: "easy",
        category: "inferences"
    }
];

const relationshipsQuestions = [
    {
        question: "Passage: 'He trained hard, yet still lost the match.' What is the relationship?",
        answers: [
            { text: "A) Contrast", correct: true },
            { text: "B) Cause and effect", correct: false },
            { text: "C) Support", correct: false },
            { text: "D) Sequence", correct: false }
        ],
        explanation: "'Yet' shows an unexpected outcome, indicating contrast.",
        difficulty: "medium",
        category: "inferences"
    }
];

const figurativeLanguageQuestions = [
    {
        question: "Passage: 'Her laughter was music to his ears.' What does this mean?",
        answers: [
            { text: "A) Her laughter was pleasant", correct: true },
            { text: "B) She sang loudly", correct: false },
            { text: "C) He disliked her laugh", correct: false },
            { text: "D) Music played nearby", correct: false }
        ],
        explanation: "'Music to his ears' figuratively means something enjoyable.",
        difficulty: "medium",
        category: "inferences"
    }
];

const contextMeaningQuestions = [
    {
        question: "Passage: 'The serene lake calmed her nerves.' What does 'serene' mean?",
        answers: [
            { text: "A) Peaceful", correct: true },
            { text: "B) Rough", correct: false },
            { text: "C) Dirty", correct: false },
            { text: "D) Loud", correct: false }
        ],
        explanation: "Calming nerves suggests the lake was tranquil, so 'serene' means peaceful.",
        difficulty: "easy",
        category: "inferences"
    }
];

// lesson-inferences.js

let categoryStats = {
    "inferences": { correct: 0, incorrect: 0 }
};

let currentQuestionIndex = 0;
let currentLesson = 1;

function startLesson() {
    console.log("startLesson called for lesson:", currentLesson);
    const startLessonButton = document.getElementById('start-lesson');
    if (startLessonButton) {
        startLessonButton.style.display = 'none';
        showExample();
    } else {
        console.error("Start lesson button not found!");
    }
}

function showExample() {
    console.log("Showing example for lesson:", currentLesson);
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent && lessons && lessons[currentLesson] && lessons[currentLesson].examples[0]) {
        lessonContent.innerHTML = lessons[currentLesson].examples[0].content;
        const nextExampleBtn = document.getElementById('next-example');
        if (nextExampleBtn) {
            nextExampleBtn.addEventListener('click', showNextExample);
        } else {
            console.error("Next example button not found!");
        }
    } else {
        console.error("Lesson content or lessons data missing!");
    }
}

function showNextExample() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].examples[1].content;
    document.getElementById('next-question').addEventListener('click', askQuestion);
}

function askQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLesson].questions[0];
    lessonContent.innerHTML = `
        <h2>${question.title}</h2>
        <p>${question.question}</p>
        ${question.options.map((option, index) => `
            <input type="radio" id="q1a${index}" name="q1" value="${option.correct}">
            <label for="q1a${index}">${option.text}</label><br>
        `).join('')}
        <button id="submit-answer1">Submit Answer</button>
    `;
    document.getElementById('submit-answer1').addEventListener('click', checkAnswer1);
}

function checkAnswer1() {
    const selectedAnswer = document.querySelector('input[name="q1"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats["inferences"].correct++;
            showNextExample3();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[0].explanation}`);
            categoryStats["inferences"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showNextExample3() {
    const lessonContent = document.getElementById('lesson-content');
    lessonContent.innerHTML = lessons[currentLesson].additionalExample.content;
    document.getElementById('next-question').addEventListener('click', askNextQuestion);
}

function askNextQuestion() {
    const lessonContent = document.getElementById('lesson-content');
    const question = lessons[currentLesson].questions[1];
    lessonContent.innerHTML = `
        <h2>${question.title}</h2>
        <p>${question.question}</p>
        ${question.options.map((option, index) => `
            <input type="radio" id="q2a${index}" name="q2" value="${option.correct}">
            <label for="q2a${index}">${option.text}</label><br>
        `).join('')}
        <button id="submit-answer2">Submit Answer</button>
    `;
    document.getElementById('submit-answer2').addEventListener('click', checkAnswer2);
}

function checkAnswer2() {
    const selectedAnswer = document.querySelector('input[name="q2"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats["inferences"].correct++;
            showQuiz();
        } else {
            alert(`Incorrect. ${lessons[currentLesson].questions[1].explanation}`);
            categoryStats["inferences"].incorrect++;
        }
    } else {
        alert('Please select an answer.');
    }
}

function showQuiz() {
    currentQuestionIndex = 0;
    let quizQuestions;
    switch (parseInt(currentLesson)) {
        case 1: quizQuestions = logicalConclusionsQuestions; break;
        case 2: quizQuestions = perspectiveToneQuestions; break;
        case 3: quizQuestions = predictingOutcomesQuestions; break;
        case 4: quizQuestions = relationshipsQuestions; break;
        case 5: quizQuestions = figurativeLanguageQuestions; break;
        case 6: quizQuestions = contextMeaningQuestions; break;
        default: quizQuestions = logicalConclusionsQuestions;
    }
    showNextQuizQuestion(quizQuestions);
}

function showNextQuizQuestion(quizQuestions) {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <h2>Question ${currentQuestionIndex + 1}</h2>
            <p>${question.question}</p>
            ${question.answers.map((answer, index) => `
                <input type="radio" id="q${currentQuestionIndex}a${index}" name="q${currentQuestionIndex}" value="${answer.correct}">
                <label for="q${currentQuestionIndex}a${index}">${answer.text}</label><br>
            `).join('')}
            <button id="submit-answer">Submit Answer</button>
        `;
        document.getElementById('submit-answer').addEventListener('click', () => checkQuizAnswer(question, quizQuestions));
    } else {
        showFinalScore();
    }
}

function checkQuizAnswer(question, quizQuestions) {
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === "true") {
            alert('Correct!');
            categoryStats[question.category].correct++;
        } else {
            alert(`Incorrect. ${question.explanation}`);
            categoryStats[question.category].incorrect++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showNextQuizQuestion(quizQuestions);
        } else {
            console.log("Quiz complete, calling showFinalScore");
            showFinalScore();
        }
    } else {
        alert('Please select an answer.');
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
    finalScoreElement.style.display = 'block';
    finalScoreElement.innerHTML = `
        <h2>Final Score</h2>
        <p>You answered ${totalCorrect} out of ${totalAttempted} questions correctly.</p>
        <p>Your score: ${percentage}%</p>
        <button id="continue-button">Continue</button>
    `;

    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'https://www.brainjelli.com/user-profile.html';
    });

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

function saveScore(lessonId, score) {
    localStorage.setItem(`inferences-lessonScore-${lessonId}`, score);
    console.log(`Saved inferences-lessonScore-${lessonId}: ${score}`);
}

function getScore(lessonId) {
    return localStorage.getItem(`lessonScore-${lessonId}`) || "Not completed yet";
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
});