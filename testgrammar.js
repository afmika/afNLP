/**
 * @author afmika
 * @contact afmichael73@gmail.com
 */
let ShioriNLP = require("./shiori-core/nlp/ShioriNLP");
let Grammar = require("./shiori-core/nlp/Grammar");

let nlp = new ShioriNLP();
let grammar = new Grammar();

let word_data = {
    'adj': ["clever", "tall", "red", "smart"],
    'pronoun' : ['I' , 'he', 'she'],
    'verb' : ['be', 'am', 'are', 'want', 'go'],
    'noun' : ['michael', 'apple']
};

grammar.defineAlias({
    "subject" : "pronoun",
    "object" : ["adj", "noun"],
    "V": "verb",

    // test pour la definition recursive
    "S" : "subject", // S = non seulement signifie subject mais aussi pronoun
    "O" : "object" // O = non seulement signifie object mais aussi (adj ou noun)
})

// 
let text = `I am smart`; // true
// let text = `I am not very smart`; // false
let res = nlp.analyze(word_data, text);
console.log(res);
grammar.defineRule("<S><V><O>$");
if(grammar.test(res)) {
    console.log("the input matches");
} else {
    console.log("the input doesn't match");
}