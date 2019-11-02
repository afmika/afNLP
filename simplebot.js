let ShioriNLP = require("./shiori-core/nlp/ShioriNLP");

let nlp = new ShioriNLP();

// user input
nlp.addInput("en/greetings", "Hello");
nlp.addInput("en/greetings", "Hey");
nlp.addInput("en/greetings", "Hi");
nlp.addInput("en/thanks", "Thank you");

// associated output
nlp.addOutput("en/greetings", "Bro!");
nlp.addOutput("en/greetings", "Bruh!");
nlp.addOutput("en/greetings", "Dude!");
nlp.addOutput("en/greetings", "hi how are ya ahaha.");
nlp.addOutput("en/thanks", "You're welcome ;)");
nlp.addOutput("en/thanks", "Nah that's fine");


// test with a NEW sentence
let user_input = "thank ya";
console.log(nlp.classify(user_input));
console.log("Output", nlp.guessResponse(user_input));