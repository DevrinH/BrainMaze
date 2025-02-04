document.onload = function() {
    const firstWord = allWords[0]
    updateWord(firstWord.word, firstWord.definition)
 } ()
 
 document.onclick = function(e) {
   const target = e.target.id
   if (target == 'addBtn') createModal('addWord')
   if (target == 'shuffleBtn') shuffle()
   if (target == 'editWord') createModal('edit')
 }
 
 rightBtn.onclick = function() {
   revealBtn.style.display = 'unset'
   wordDefinition.style.display = 'none'
   let nextIndex = allWords.findIndex(obj => obj.word.toLowerCase() == wordName.textContent.toLowerCase()) + 1
   if (nextIndex == allWords.length) nextIndex = 0
   updateWord(allWords[nextIndex].word, allWords[nextIndex].definition, nextIndex + 1)
 }
 leftBtn.onclick = function() {
   revealBtn.style.display = 'unset'
   wordDefinition.style.display = 'none'
   let prevIndex = allWords.findIndex(obj => obj.word.toLowerCase() == wordName.textContent.toLowerCase()) - 1
   if (prevIndex == -1) prevIndex = allWords.length - 1
   updateWord(allWords[prevIndex].word, allWords[prevIndex].definition, prevIndex + 1)
 }
 
 revealBtn.onclick = function() {
   revealBtn.style.display = 'none'
   wordDefinition.style.display = 'block'
 }
 removeWordBtn.onclick = function() {
   const index = cardPosition.textContent - 1 
   allWords.splice(index, 1)
   updateWord(allWords[0].word,allWords[0].definition)
 }