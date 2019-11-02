/**
 * @author afmika
 * @contact afmichael73@gmail.com
 */

const ShioriNLP = require("./shiori-core/nlp/ShioriNLP");
let nlp = new ShioriNLP();
nlp.addInput("en/greetings", "Hello");
nlp.addInput("en/greetings", "Hey");
nlp.addInput("en/greetings", "Hi");
nlp.addInput("jp/ohayo", "arigato");
nlp.addInput("fr/salutation", "Coucou");
nlp.addInput("fr/salutation", "Bonjour");
nlp.addInput("fr/salutation", "Salut");


nlp.addOutput("en/greetings", "Bro");
nlp.addOutput("en/greetings", "Bruh");
nlp.addOutput("en/greetings", "Dude");


console.log("Explore", nlp.explore("en/greetings/*"));
console.log("Explore", nlp.explore("en/greetings/output"));
console.log("Explore", nlp.explore("jp/*"));

// tests
let sentences = [
    "hello", "hey", "arigato", "watashi wa anata ga kirai desu", "hi", "Salut", "Bonsoir"
];
class Result {
    constructor(case_sens, path) {
        this.case_sens = case_sens;
        this.class = path;
    }
}
sentences.forEach(sentence => {
    let [g_res1, g_res2, g_res3, g_res4] = [
        nlp.getGroupOf(sentence, casesensitive = false),
        nlp.getGroupOf(sentence, casesensitive = true),
        nlp.classify(sentence, casesensitive = false),
        nlp.classify(sentence, casesensitive = false),
    ];
    console.log("SENTENCE ", sentence);
    console.log("getGroupOf", new Result(false, g_res1 == null ? "NOT FOUND" : g_res1.getPath()) );
    console.log("getGroupOf", new Result(true, g_res2 == null ? "NOT FOUND" : g_res2.getPath()) );
    console.log("classify", new Result(false, g_res3.getPath()) ) ;
    console.log("classify", new Result(true, g_res4.getPath()) );
});


