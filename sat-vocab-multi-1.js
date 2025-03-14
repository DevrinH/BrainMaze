const explanation = [
    {
        explanation: "Answer: B) Intended for or understood by a small, specialized group <br/>Explanation:<br/>The word esoteric refers to something that is highly specialized and not easily understood by the general public. In the sentence, the professor’s lectures were difficult for most students to comprehend, implying that they contained specialized knowledge. While A suggests the opposite meaning, C and D describe aspects that are not necessarily related to esoteric content.",
      
    },
    {
        explanation: "Answer: A) Honest and straightforward Explanation:The word candid means truthful, direct, and unfiltered in speech or expression. In the sentence, James initially hesitated but then provided a full and open account, indicating sincerity. B and C suggest a lack of clarity or openness, which contradicts the meaning of candid, while D implies embellishment rather than honesty.",
       
    },
    {
        explanation: "Answer: B) Original and creative Explanation:The word innovative refers to something new, groundbreaking, or creative. In the sentence, the artist is praised for introducing techniques that had never been seen before, which suggests originality. A is the opposite of innovative, while C implies a lack of distinction, and D does not relate to creativity or originality.",
       
    },
    {
        explanation: "Answer: B) Weak and flimsy. Explanation:The word tenuous describes something that is weak, insubstantial, or lacking a strong foundation. In the sentence, the lawyer’s argument is based on speculation rather than solid evidence, suggesting it is not strong or convincing. A and C contradict this meaning, while D describes an approach rather than the strength of the argument itself.",

    },  
    {
        explanation: "Answer: B) Shallow and insincere Explanation:The word superficial refers to something that is shallow, lacking depth, or only concerned with surface-level matters. In the sentence, Daniel’s apology is described as lacking sincerity, implying that it was not heartfelt. A is the opposite of superficial, C refers to length rather than depth, and D describes a tone rather than the level of sincerity.",

    },
    {
        explanation: "Answer: B) Fair and unbiased Explanation:The word impartial means treating all sides equally without favoritism or bias. In the sentence, the scientist is described as carefully considering both sides before deciding, which suggests fairness. A is the opposite of impartial, C implies a lack of concern rather than fairness, and D suggests uncertainty rather than neutrality.",

    }, 
    {
        explanation: "Answer: B) Able to recover quickly from difficulties Explanation:The word resilient refers to the ability to recover or bounce back from challenges or setbacks. In the sentence, the person's ability to overcome failure quickly shows resilience. A and C describe traits opposite to resilience, and D does not fit the context of overcoming difficulties.",

    }, 
    {
        explanation: "Answer: A) Lasting for a very short timeExplanation: The word ephemeral describes something that is fleeting or short-lived. The sentence emphasizes that the beauty of the sunset didn’t last long, indicating that the sunset was ephemeral. B, C, and D do not capture the fleeting nature implied by the word.",

    }, 
    {
        explanation: "Answer: B) Generous and kind-hearted Explanation:The word benevolent refers to a person who is kind-hearted, charitable, and generous. In the sentence, the CEO’s leadership is described as loved by employees due to his generous nature. A, C, and D do not describe the kindness or generosity associated with benevolent leadership.",

    }, 
    {
        explanation: "Answer: C) Delicate and difficult to detect Explanation:The word subtle refers to something that is not obvious, requiring careful attention to notice. In the sentence, the detective is the only one who noticed the clue, implying that it was delicate or difficult to detect. A is the opposite of subtle, B suggests intentional deception rather than faintness, and D implies confusion rather than something barely noticeable.",

    },
    { 
        explanation: "Answer: A) Dull and uninspiring. Explanation: The word lackluster describes something that is unexciting, uninspiring, or lacking brilliance. The sentence indicates that the comedian’s performance failed to impress, implying that it was dull."
    },
    { 
        explanation: "Answer: A) Calm and unemotional. Explanation: The word stoic refers to someone who endures pain or hardship without showing emotions. The sentence describes the judge as not reacting to dramatic testimony, indicating emotional control."
    },
    { 
        explanation: "Answer: B) Complex and difficult to follow. Explanation: The word convoluted means unnecessarily complicated or hard to understand. Since no one could comprehend his explanation, it must have been overly complex."
    },
    { 
        explanation: "Answer: A) Sensitivity and diplomacy. Explanation: The word tact refers to the ability to handle difficult situations with sensitivity and thoughtfulness. In the sentence, she carefully chooses her words, indicating diplomacy."
    },
    { 
        explanation: "Answer: B) Nervous and apprehensive. Explanation: The word trepidatious means feeling anxious or fearful about something. Since the student was feeling this way before an exam, it suggests worry."
    },
    { 
        explanation: "Answer: A) Secret or hidden. Explanation: The word covert refers to something concealed or undercover. Since the spy is trying to avoid detection, his identity must be hidden."
    },
    { 
        explanation: "Answer: A) Based on observation or experience. Explanation: The word empirical refers to knowledge derived from real-world observation or experience. The sentence contrasts this with speculation, reinforcing the idea that the theory was grounded in facts."
    },
    { 
        explanation: "Answer: A) Friendly and sociable. Explanation: The word gregarious describes someone who enjoys socializing and interacting with others. Since the host made guests feel welcome, this suggests an outgoing nature."
    },
    { 
        explanation: "Answer: A) Controversial and likely to cause arguments. Explanation: The word contentious refers to something that causes disagreements or disputes. Since the decision sparked a debate, it must have been controversial."
    },
    { 
        explanation: "Answer: A) Careful and detail-oriented. Explanation: The word meticulous describes someone who pays close attention to detail and strives for accuracy. The sentence states that the intern double-checked her work, indicating thoroughness."
    }
];
const questions = [
    {
        
        question: "The professor’s lectures were so esoteric that only a handful of students could truly comprehend the material.<br/><br/>Question: <br/>Which of the following best defines esoteric? ",
       
        answers: [
            { text: " Popular and widely understood", correct: false},
            { text: " Intended for or understood by a small, specialized group", correct: true},
            { text: " Boring and monotonous", correct: false},
            { text: "Outdated and irrelevant", correct: false},
        ]
    },
    {
        question: "Despite his initial reluctance, James eventually gave a candid account of the incident, revealing all the details without hesitation.<br/><br/>Question: <br/> Which of the following best defines candid? ",
       
        answers: [
            { text: " Honest and straightforward", correct: true},
            { text: "Vague and uncertain", correct: false},
            { text: " Reserved and secretive", correct: false},
            { text: "Exaggerated and dramatic.", correct: false},
        ]
    },   
    {
        question: "The artist’s work was praised for its innovative approach, as it introduced techniques never seen before in the industry.<br/><br/>Question:<br/>Which of the following best defines innovative?",
        answers: [
            { text: "Traditional and predictable", correct: false},
            { text: "Original and creative", correct: true},
            { text: " Simple and unremarkable", correct: false,},
            { text: "Confusing and unclear", correct: false},
        ]
    },
    {
        question: "The lawyer’s argument was tenuous, relying on speculation rather than solid evidence.<br/><br/>Question:<br/>Which of the following best defines tenuous?",
        answers: [
            { text: "Strong and well-supported", correct: false},
            { text: "Weak and flimsy", correct: true},
            { text: " Persuasive and compelling", correct: false},
            { text: "Aggressive and forceful", correct: false},
        ]
    },
    {
        question: "Rather than admitting his mistake, Daniel offered a superficial apology that lacked sincerity. <br/><br/>Question:<br/>Which of the following best defines superficial?",
        answers: [
            { text: " Deep and meaningful", correct: false},
            { text: " Shallow and insincere", correct: true},
            { text: "Long and detailed", correct: false},
            { text: "Harsh and critical", correct: false},
        ]
    },
    {
        question: "The scientist remained impartial throughout the debate, carefully considering both sides before drawing a conclusion.<br/><br/>Question:<br/>Which of the following best defines impartial?",
        answers: [
            { text: "Biased and opinionated", correct: false},
            { text: "Fair and unbiased", correct: true},
            { text: "Indifferent and uninterested", correct: false},
            { text: "Hesitant and uncertain", correct: false},
        ]
    },
    {
        question: "Her resilient nature allowed her to bounce back quickly from setbacks, never letting failure keep her down for long.<br/><br/>Question:Which of the following best defines resilient?",
        answers: [
            { text: "Easily discouraged", correct: false},
            { text: "Able to recover quickly from difficulties ", correct: true},
            { text: " Constantly pessimistic", correct: false},
            { text: "Reluctant to change", correct: false},
        ]
    },
    {
        question: "The ephemeral beauty of the sunset left them in awe, as they knew it would soon fade away.<br/><br/>Question:Which of the following best defines ephemeral?",
        answers: [
            { text: "Lasting for a very short time", correct: true},
            { text: "Extremely vibrant and bright", correct: false},
            { text: "Painful and unpleasant", correct: false},
            { text: "Easily noticeable", correct: false},
        ]
    },
    {
        question: "The CEO’s benevolent leadership style made him loved by employees, who appreciated his generous approach to workplace welfare.<br/><br/>Question:Which of the following best defines benevolent?",
        answers: [
            { text: "Strict and authoritarian", correct: false},
            { text: "Generous and kind-hearted", correct: true},
            { text: "Uninterested in others' needs", correct: false},
            { text: "Cautious and careful", correct: false},
        ]
    },
    {
        question: "The detective noticed a subtle clue that everyone else had overlooked, leading him to solve the case.<br/><br/>Question:Which of the following best defines subtle?",
        answers: [
            { text: "Obvious and easily noticed", correct: false},
            { text: "Clever and deceptive", correct: false},
            { text: "Delicate and difficult to detect", correct: true},
            { text: "Confusing and misleading", correct: false},
        ]
    },
    { 
        question: "Despite the comedian’s best efforts, his lackluster performance left the audience unimpressed.<br/><br/>Question: Which of the following best defines lackluster?",
        answers: [
            { text: "Dull and uninspiring", correct: true },
            { text: "Extremely energetic", correct: false },
            { text: "Loud and entertaining", correct: false },
            { text: "Confusing and chaotic", correct: false },
        ]
    },
    { 
        question: "The judge remained stoic, showing no visible reaction even when dramatic testimony was presented.<br/><br/>Question: Which of the following best defines stoic?",
        answers: [
            { text: "Calm and unemotional", correct: true },
            { text: "Outspoken and passionate", correct: false },
            { text: "Easily startled", correct: false },
            { text: "Confused and uncertain", correct: false },
        ]
    },
    { 
        question: "His explanation was so convoluted that nobody in the room could understand what he was trying to say.<br/><br/>Question: Which of the following best defines convoluted?",
        answers: [
            { text: "Clear and concise", correct: false },
            { text: "Complex and difficult to follow", correct: true },
            { text: "Short and straightforward", correct: false },
            { text: "Funny and lighthearted", correct: false },
        ]
    },
    { 
        question: "She handled the tense situation with tact, carefully choosing her words to avoid offending anyone.<br/><br/>Question: Which of the following best defines tact?",
        answers: [
            { text: "Sensitivity and diplomacy", correct: true },
            { text: "Carelessness and indifference", correct: false },
            { text: "Harshness and rudeness", correct: false },
            { text: "Uncertainty and hesitation", correct: false },
        ]
    },
    { 
        question: "Although he had prepared extensively, the student was still trepidatious before the big exam.<br/><br/>Question: Which of the following best defines trepidatious?",
        answers: [
            { text: "Confident and fearless", correct: false },
            { text: "Nervous and apprehensive", correct: true },
            { text: "Excited and optimistic", correct: false },
            { text: "Unconcerned and indifferent", correct: false },
        ]
    },
    { 
        question: "The spy used a covert identity to avoid detection while carrying out his mission.<br/><br/>Question: Which of the following best defines covert?",
        answers: [
            { text: "Secret or hidden", correct: true },
            { text: "Honest and open", correct: false },
            { text: "Reckless and careless", correct: false },
            { text: "Unimportant and irrelevant", correct: false },
        ]
    },
    { 
        question: "The scientist’s theory was based on empirical evidence rather than speculation.<br/><br/>Question: Which of the following best defines empirical?",
        answers: [
            { text: "Based on observation or experience", correct: true },
            { text: "Created through imagination", correct: false },
            { text: "False and misleading", correct: false },
            { text: "Lacking any proof", correct: false },
        ]
    },
    { 
        question: "The gregarious host made sure every guest felt welcome and engaged in conversation.<br/><br/>Question: Which of the following best defines gregarious?",
        answers: [
            { text: "Friendly and sociable", correct: true },
            { text: "Shy and reserved", correct: false },
            { text: "Rude and dismissive", correct: false },
            { text: "Quiet and uninterested", correct: false },
        ]
    },
    { 
        question: "The company’s decision to replace human workers with automation sparked a contentious debate.<br/><br/>Question: Which of the following best defines contentious?",
        answers: [
            { text: "Controversial and likely to cause arguments", correct: true },
            { text: "Easily resolved and undisputed", correct: false },
            { text: "Pointless and insignificant", correct: false },
            { text: "Boring and uninteresting", correct: false },
        ]
    },
    { 
        question: "The intern was meticulous, double-checking every detail to ensure perfection in her report.<br/><br/>Question: Which of the following best defines meticulous?",
        answers: [
            { text: "Careful and detail-oriented", correct: true },
            { text: "Disorganized and careless", correct: false },
            { text: "Rushed and impatient", correct: false },
            { text: "Lazy and uninterested", correct: false },
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentExplanationIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let explanationElement = document.getElementById("explanation"); //explain



function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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

    updateProgressBar(); // Update progress bar
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    explanationElement.style.display = "none";  // Hide explanation
    explanationElement.textContent = "";  // Clear explanation text
}
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        explanationElement.textContent = explanation[currentQuestionIndex].explanation; // Fix this line
    }
    
    explanationElement.style.display = "block"; // Show explanation

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}
var timer;
var elapsedTime = 0;  // Track elapsed time separately
var ele = document.getElementById('timer');

function startTimer() {
    clearInterval(timer); // Ensure no duplicate timers are running
    elapsedTime = 0; // Reset time at the start
    timer = setInterval(() => {
        elapsedTime++;  // Increment time first to avoid display lag

        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime % 60;

        // Format the timer display (MM:SS)
        let formattedTime = 
            (minutes < 10 ? "0" : "") + minutes + ":" + 
            (seconds < 10 ? "0" : "") + seconds;
        
        if (ele) {
            ele.innerHTML = formattedTime;
        }
    }, 1000);
}

function showScore() {
    resetState();
    clearInterval(timer); // Stop the timer
    
    // Ensure elapsedTime is still correct
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;
    let formattedTime = `${minutes} minutes and ${seconds} seconds`;

    // Round the percentage to avoid decimals
    let percentage = Math.round((score / questions.length) * 100);

    questionElement.innerHTML = `Score: ${score} out of ${questions.length} (${percentage}%)!<br/>Time: ${formattedTime}`;
    nextButton.innerHTML = "Continue";
    nextButton.style.display = "block";

    // Set progress bar to 100% when finished
    document.getElementById("progress-bar").style.width = "100%";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        clearInterval(timer);  // Stop timer before showing score
        showScore();
        localStorage.setItem("readingScore", score);  // Store score
        localStorage.setItem("readingTime", elapsedTime);  // Store time in seconds
    }
}

function startQuiz() {
    elapsedTime = 0;  // Ensure timer starts fresh
    startTimer();  // Start the timer when quiz begins
    showQuestion();
}

nextButton.addEventListener("click", handleNextButton);
startQuiz();








nextButton.addEventListener("click", handleNextButton);

startQuiz();