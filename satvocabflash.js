const vocab = [
   { word: "Aberration", definition: "A departure from what is normal or expected.", example: "She made an aberration." },
   { word: "Cacophony", definition: "A harsh, discordant mixture of sounds.", example: "The cacophony of the city kept me awake." },
   { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing.", example: "His speech was eloquent and moving." },
   { word: "Meticulous", definition: "Showing great attention to detail; very careful.", example: "She was meticulous in her research." },
   { word: "Ubiquitous", definition: "Present, appearing, or found everywhere.", example: "Smartphones have become ubiquitous in modern life." }
];

let filteredVocab = [...vocab]; // Copy of vocab list to filter
let index = 0;

function updateWord() {
   if (filteredVocab.length > 0) {
       document.getElementById("word").textContent = filteredVocab[index].word;
       document.getElementById("definition").textContent = filteredVocab[index].definition;
       document.getElementById("example").textContent = filteredVocab[index].example || "No example available.";
   } else {
       document.getElementById("word").textContent = "No words available";
       document.getElementById("definition").textContent = "";
       document.getElementById("example").textContent = "";
   }
}

function nextWord() {
   if (filteredVocab.length > 0) {
       index = (index + 1) % filteredVocab.length;
       updateWord();
   }
}

function prevWord() {
   if (filteredVocab.length > 0) {
       index = (index - 1 + filteredVocab.length) % filteredVocab.length;
       updateWord();
   }
}

function populateLetterFilter() {
   const select = document.getElementById("letterFilter");
   const letters = new Set(vocab.map(wordObj => wordObj.word.charAt(0).toUpperCase()));

   letters.forEach(letter => {
       const option = document.createElement("option");
       option.value = letter;
       option.textContent = letter;
       select.appendChild(option);
   });
}

function filterWords() {
   const selectedLetter = document.getElementById("letterFilter").value;
   if (selectedLetter === "") {
       filteredVocab = [...vocab]; // Reset to all words
   } else {
       filteredVocab = vocab.filter(wordObj => wordObj.word.startsWith(selectedLetter));
   }
   index = 0; // Reset index
   updateWord();
}
function searchWord() {
   const searchText = document.getElementById("searchInput").value.toLowerCase();
   
   // Find the word in the vocab list
   const foundWord = vocab.find(wordObj => wordObj.word.toLowerCase() === searchText);

   if (foundWord) {
       // Update the display with the found word
       document.getElementById("word").textContent = foundWord.word;
       document.getElementById("definition").textContent = foundWord.definition;
       document.getElementById("example").textContent = foundWord.example || "No example available.";
   } else {
       // Show a message if the word isn't found
       document.getElementById("word").textContent = "Word not found";
       document.getElementById("definition").textContent = "";
       document.getElementById("example").textContent = "";
   }
}

document.addEventListener("DOMContentLoaded", function () {
   populateLetterFilter();
   updateWord();
});