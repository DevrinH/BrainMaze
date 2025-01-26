let allWords = [
    {word: 'excited', definition: 'to be happy and eager to for someone/something'},     
    {word: 'dash', definition: 'to run very fast'},
    {word: 'enormous', definition: 'VERY LARGE'},
    {word: 'hallucinate', definition: 'to see something that doesnt exist'},
    {word: 'elucidate', definition: 'to explain something'},
    {word: 'decimate', definition: 'to reduce something to 10% of what it was'}
 ]
 
 function updateWord(word, def, position = 1) {
    wordName.textContent = word
    wordDefinition.textContent = def
    cardPosition.textContent = position
 }
 
 function createModal(type) {
    myModal.style.display = 'block'
    if (type == 'addWord') {
       myModal.innerHTML = `
       <div class="modal-content">
         <span id="closeModal" class="close">&times;</span>
         New Vocab Word: <input id="newWord">
         Definition: <input id="newWordDef">
         <button id="saveNewWordBtn" type="submit">Save New Word</button>
       </div>
       `
       closeModal.onclick = () => myModal.style.display = 'none'
       saveNewWordBtn.onclick = function() {
          allWords.push({word: newWord.value, definition: newWordDef.value})
          myModal.style.display = 'none'
          updateWord(allWords[allWords.length - 1].word , allWords[allWords.length - 1].definition, allWords.length)
       }
    }
    if (type == 'edit') {
       myModal.innerHTML = 
       `
       <div class="modal-content">
         <span id="closeModal" class="close">&times;</span>
         Current Word: <input id="currentWord">
         Definition: <input id="currentDef">
         <button id="updateWordBtn" type="submit">Update</button>
       </div>
       ` 
       closeModal.onclick = () => myModal.style.display = 'none'
       currentWord.value = wordName.textContent
       currentDef.value = wordDefinition.textContent
       updateWordBtn.onclick = function() {
          myModal.style.display = 'none'
          const index = cardPosition.textContent - 1
          allWords[index] = {word: currentWord.value, definition: currentDef.value}
          updateWord( allWords[index].word,  allWords[index].definition, index + 1)
       }
    }
 }
 
 function shuffle() {
    allWords = allWords.sort((a,b) => 0.5 - Math.random())
    updateWord(allWords[0].word, allWords[0].definition)
 }
 