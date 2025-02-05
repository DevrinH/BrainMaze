const vocab = [ 
   { word: "Aberration", definition: "A departure from what is normal or expected.", example: "She made an aberration." },
   { word: "Austere", definition: "Severe or strict in manner or attitude.", example: "The principal had an austere demeanor." },
   { word: "Benevolent", definition: "Well-meaning and kindly.", example: "The benevolent king helped his people." },
   { word: "Brusque", definition: "Abrupt or offhand in speech or manner.", example: "His brusque response caught her off guard." },
   { word: "Cacophony", definition: "A harsh, discordant mixture of sounds.", example: "The cacophony of the city kept me awake." },
   { word: "Capitulate", definition: "To surrender or give up.", example: "After hours of debate, he capitulated." },
   { word: "Circuitous", definition: "Long and indirect; roundabout.", example: "His circuitous explanation confused the audience." },
   { word: "Dauntless", definition: "Showing fearlessness and determination.", example: "She was dauntless in the face of adversity." },
   { word: "Deride", definition: "To mock or ridicule.", example: "The critics derided his latest film." },
   { word: "Disparate", definition: "Essentially different in kind; not allowing comparison.", example: "Their disparate opinions led to conflict." },
   { word: "Ebullient", definition: "Cheerful and full of energy.", example: "Her ebullient personality made everyone smile." },
   { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing.", example: "His speech was eloquent and moving." },
   { word: "Flummox", definition: "To bewilder or confuse.", example: "The complex puzzle flummoxed even the experts." },
   { word: "Fortuitous", definition: "Happening by chance or luck.", example: "Their meeting was fortuitous." },
   { word: "Gregarious", definition: "Fond of company; sociable.", example: "He was a gregarious and outgoing person." },
   { word: "Hapless", definition: "Unfortunate or unlucky.", example: "The hapless traveler lost his passport." },
   { word: "Harbinger", definition: "A person or thing that signals the approach of something else.", example: "The flowers were a harbinger of spring." },
   { word: "Iconoclast", definition: "A person who attacks cherished beliefs or institutions.", example: "The artist was an iconoclast who challenged traditional styles." },
   { word: "Indolent", definition: "Wanting to avoid activity or exertion; lazy.", example: "The indolent student procrastinated his work." },
   { word: "Juxtapose", definition: "To place side by side for comparison.", example: "The author juxtaposed light and dark themes in the novel." },
   { word: "Kaleidoscopic", definition: "Constantly changing patterns or colors.", example: "The fireworks created a kaleidoscopic display." },
   { word: "Lethargic", definition: "Lacking energy or enthusiasm.", example: "She felt lethargic after staying up late." },
   { word: "Lugubrious", definition: "Looking or sounding sad and dismal.", example: "His lugubrious tone made the meeting somber." },
   { word: "Meticulous", definition: "Showing great attention to detail; very careful.", example: "She was meticulous in her research." },
   { word: "Munificent", definition: "Very generous.", example: "The billionaire was munificent in his donations." },
   { word: "Nefarious", definition: "Wicked or criminal.", example: "The villain’s nefarious plot was foiled." },
   { word: "Noxious", definition: "Harmful, poisonous, or very unpleasant.", example: "The noxious fumes forced the evacuation of the building." },
   { word: "Obfuscate", definition: "To deliberately make something difficult to understand.", example: "The politician obfuscated the details of the policy." },
   { word: "Obstinate", definition: "Stubbornly refusing to change one’s opinion.", example: "He remained obstinate despite the clear evidence." },
   { word: "Perfunctory", definition: "Carried out with minimal effort or reflection.", example: "Her perfunctory apology did not seem sincere." },
   { word: "Plethora", definition: "An excessive amount of something.", example: "There was a plethora of options at the buffet." },
   { word: "Quixotic", definition: "Exceedingly idealistic; unrealistic and impractical.", example: "His quixotic quest for world peace was admirable but naive." },
   { word: "Rancorous", definition: "Characterized by bitterness or resentment.", example: "The debate became increasingly rancorous." },
   { word: "Recalcitrant", definition: "Resisting authority or control.", example: "The recalcitrant student refused to follow the rules." },
   { word: "Surreptitious", definition: "Kept secret, especially because it would not be approved of.", example: "They exchanged surreptitious glances in the meeting." },
   { word: "Sycophant", definition: "A person who acts obsequiously toward someone important to gain advantage.", example: "The sycophant flattered his boss constantly." },
   { word: "Tenacious", definition: "Holding firm to something; persistent.", example: "She was tenacious in pursuing her dreams." },
   { word: "Truculent", definition: "Eager or quick to argue or fight.", example: "His truculent attitude made negotiations difficult." },
   { word: "Ubiquitous", definition: "Present, appearing, or found everywhere.", example: "Smartphones have become ubiquitous in modern life." },
   { word: "Unctuous", definition: "Excessively or ingratiatingly flattering.", example: "His unctuous compliments seemed insincere." },
   { word: "Vacillate", definition: "To waver between different opinions or actions.", example: "She vacillated between two career options." },
   { word: "Voracious", definition: "Having a very eager approach to an activity.", example: "She was a voracious reader." },
   { word: "Wane", definition: "To decrease in size, extent, or degree.", example: "His enthusiasm began to wane after a few weeks." },
   { word: "Wistful", definition: "Having or showing a feeling of vague or regretful longing.", example: "He gave a wistful glance at his childhood home." },
   { word: "Xenophobic", definition: "Having or showing a dislike of or prejudice against people from other countries.", example: "His xenophobic views were widely criticized." },
   { word: "Yearn", definition: "To have an intense feeling of longing for something.", example: "She yearned for adventure." },
   { word: "Yoke", definition: "To join or link together.", example: "The two companies were yoked in a merger." },
   { word: "Zealous", definition: "Showing great energy or enthusiasm in pursuit of a cause or objective.", example: "The scientist was zealous in his research." },
   { word: "Zenith", definition: "The highest point or peak.", example: "Her career reached its zenith when she won the award." }
   { word: "Abate", definition: "To lessen in intensity or degree.", example: "The storm began to abate after midnight." },
   { word: "Acumen", definition: "Keen insight or judgment.", example: "Her business acumen led to great success." },
   { word: "Affable", definition: "Friendly and easy to talk to.", example: "He was an affable host at the party." },
   { word: "Altruistic", definition: "Selflessly concerned for the well-being of others.", example: "Her altruistic nature led her to volunteer." },
   { word: "Belligerent", definition: "Hostile and aggressive.", example: "His belligerent attitude started an argument." },
   { word: "Bequeath", definition: "To leave something in a will.", example: "He bequeathed his estate to his children." },
   { word: "Callous", definition: "Emotionally insensitive or unfeeling.", example: "His callous remarks hurt her feelings." },
   { word: "Circumspect", definition: "Wary and unwilling to take risks.", example: "She was circumspect in making business decisions." },
   { word: "Debilitate", definition: "To weaken or impair.", example: "The illness debilitated him for weeks." },
   { word: "Disparage", definition: "To belittle or criticize unfairly.", example: "She disparaged his efforts despite his hard work." },
   { word: "Eclectic", definition: "Deriving ideas or styles from a broad range.", example: "His music taste was eclectic, spanning genres." },
   { word: "Elucidate", definition: "To explain or clarify.", example: "She elucidated the complex theory in simple terms." },
   { word: "Fervent", definition: "Having passionate intensity.", example: "His fervent speech inspired the crowd." },
   { word: "Furtive", definition: "Attempting to avoid notice or attention.", example: "He cast a furtive glance at the notes." },
   { word: "Garrulous", definition: "Excessively talkative.", example: "Her garrulous nature made meetings last longer." },
   { word: "Guile", definition: "Sly or cunning intelligence.", example: "He used guile to escape the situation." },
   { word: "Haughty", definition: "Arrogantly superior and disdainful.", example: "His haughty demeanor made him unpopular." },
   { word: "Impetuous", definition: "Acting quickly without thought.", example: "His impetuous decision led to mistakes." },
   { word: "Intransigent", definition: "Unwilling to compromise.", example: "The negotiator faced an intransigent opponent." },
   { word: "Jubilant", definition: "Feeling or expressing great joy.", example: "The team was jubilant after their victory." },
   { word: "Knave", definition: "A dishonest or unscrupulous person.", example: "The knave deceived everyone for his gain." },
   { word: "Laconic", definition: "Using very few words.", example: "His laconic reply left much unsaid." },
   { word: "Mollify", definition: "To appease or soothe.", example: "He tried to mollify the angry customer." },
   { word: "Nascent", definition: "Just coming into existence.", example: "The nascent company showed great promise." },
   { word: "Obsequious", definition: "Excessively submissive or eager to please.", example: "The obsequious assistant agreed with everything." },
   { word: "Pernicious", definition: "Having a harmful effect.", example: "His pernicious influence led to bad decisions." },
   { word: "Prosaic", definition: "Lacking poetic beauty; dull.", example: "His prosaic writing style was uninspiring." },
   { word: "Querulous", definition: "Complaining in a whining manner.", example: "His querulous tone annoyed everyone." },
   { word: "Rescind", definition: "To revoke or cancel.", example: "The offer was rescinded after the error." },
   { word: "Sagacious", definition: "Having good judgment; wise.", example: "Her sagacious advice helped the team." },
   { word: "Soporific", definition: "Tending to induce sleep.", example: "The lecture was so soporific that I dozed off." },
   { word: "Trepidation", definition: "A feeling of fear or anxiety.", example: "She entered the dark alley with trepidation." },
   { word: "Urbane", definition: "Suave, courteous, and refined.", example: "The urbane diplomat handled the situation well." },
   { word: "Vapid", definition: "Offering nothing stimulating or challenging.", example: "His speech was vapid and uninteresting." },
   { word: "Wary", definition: "Cautious or alert.", example: "She was wary of strangers in the area." },
   { word: "Zealous", definition: "Showing great enthusiasm.", example: "The zealous supporter cheered loudly." }

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

   if (searchText === "") {
       // If input is empty, reset to the first word
       index = 0;
       updateWord();
       return;
   }

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