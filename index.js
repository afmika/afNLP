/**
 * @author afmika
 */

 let DataLoader = require("./shiori-core/nlp/DataLoader");
let ShioriNLP = require("./shiori-core/nlp/ShioriNLP");
let Grammar = require("./shiori-core/nlp/Grammar");

let nlp = new ShioriNLP();
let db = new DataLoader();

let grammar = new Grammar();
grammar.defineAlias({
    "PRN" : [
        "pronoun.demonstrative",
        "pronoun.indefinite",
        "pronoun.intensive",
        "pronoun.interrogative",
        "pronoun.objective",
        "pronoun.personal",
        "pronoun.possessive",
        "pronoun.reciprocal",
        "pronoun.reflexive",
        "pronoun.relative",
        "pronoun.subjective"
    ],
    "PP" : "prepositions",//

    // recursive definition works too
    "SUB" : ["PRN", "PP"],
    "Smthg" : ["SUB", "verb"]
});

db.load(function(data) {
    let text = `they want coffee`;
    let res = nlp.analyze(data, text);
    console.log( res );

    grammar.defineRule("<PRN>?<verb><noun>");
    let msg = ! grammar.test(res) ? " DOES NOT " : "";
    console.log("'"+text+"'" + msg + " matches the rule " + grammar.rule);
    
    grammar.defineRule("<SUB><Smthg>?<noun>");
    msg = ! grammar.test(res) ? " DOES NOT " : "";
    console.log("'"+text+"'" + msg + " match(es) the rule " + grammar.rule);
});