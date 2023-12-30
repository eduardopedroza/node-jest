const { MarkovMachine } = require('./markov');



describe('Markov Machine', () => {

    test('should return correct number of words', () => {
        let mm = new MarkovMachine('the cat in the hat');
        let newText = mm.makeText(3);
        let wordCount = newText.trim().split(/\s+/).length;
    
        expect(wordCount).toBeLessThanOrEqual(3);
        expect(wordCount).toBeGreaterThan(0);
    });
    
    test('chain generation with known text', () => {
        const text = "the cat in the hat";
        const mm = new MarkovMachine(text);
        expect(mm.chain).toEqual({
          "the": ["cat", "hat"],
          "cat": ["in"],
          "in": ["the"],
          "hat": [null]
        });
    });

    test('validity of each word in generated text', () => {
        const text = "I am Sam";
        const mm = new MarkovMachine(text);
        const generatedText = mm.makeText(10);
        const words = generatedText.trim().split(/\s+/);
        
        words.forEach(word => {
          expect(["I", "am", "Sam", null]).toContain(word);
        });
    });
})
