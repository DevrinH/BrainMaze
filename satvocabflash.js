const vocab = [
   { word: "Aberration", definition: "A departure from what is normal or expected." },
   { word: "Cacophony", definition: "A harsh, discordant mixture of sounds." },
   { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing." },
   { word: "Meticulous", definition: "Showing great attention to detail; very careful." },
   { word: "Ubiquitous", definition: "Present, appearing, or found everywhere." }
];

let index = 0;

function updateWord() {
   document.getElementById("word").textContent = vocab[index].word;
   document.getElementById("definition").textContent = vocab[index].definition;
}

function nextWord() {
   index = (index + 1) % vocab.length; // Loop back to the beginning
   updateWord();
}

function prevWord() {
   index = (index - 1 + vocab.length) % vocab.length; // Loop back to the end
   updateWord();
}

updateWord(); // Initialize the first word
