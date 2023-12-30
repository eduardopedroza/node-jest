/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chain = {}
    for(let i = 0; i < this.words.length; i++){
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (!this.chain[word]) {
        this.chain[word] = [];
      }

      this.chain[word].push(nextWord);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    if (Object.keys(this.chain).length === 0) {
      return ''; 
    }

    let newText = '';
    let currentWord = this.getRandomKey(this.chain);
    let wordsCount = 1;

    while (wordsCount < numWords) {
      const nextWords = this.chain[currentWord];
      
      if (nextWords && nextWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * nextWords.length);
        const nextWord = nextWords[randomIndex];

        if (nextWord === null) break;

        newText += ' ' + nextWord;
        currentWord = nextWord;
        wordsCount++;
      } else {
        break;
      }
    }
    return newText;
  }
  
  getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
  }
}

module.exports = {MarkovMachine};