const vocab = [
   { word: "Aberration", definition: "A departure from what is normal or expected.", example: "She made an aberration." },
   { word: "Cacophony", definition: "A harsh, discordant mixture of sounds.", example: "The cacophony of the city kept me awake." },
   { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing.", example: "His speech was eloquent and moving." },
   { word: "Meticulous", definition: "Showing great attention to detail; very careful.", example: "She was meticulous in her research." },
   { word: "Ubiquitous", definition: "Present, appearing, or found everywhere.", example: "Smartphones have become ubiquitous in modern life." }
];

let index = 0;

function updateWord() {
   document.getElementById("word").textContent = vocab[index].word;
   document.getElementById("definition").textContent = vocab[index].definition;
   document.getElementById("example").textContent = vocab[index].example || "No example available.";
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