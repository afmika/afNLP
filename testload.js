const DataLoader = require("./shiori-core/nlp/DataLoader");
let data = new DataLoader();
// data.path = "./shiori-core/data/shiori-data/";

// meth 1
console.log("Sync");
data.loadSync();
console.log("Card VERB ", data.get('verb').length);

// meth 2
console.log("Async");
data.load(function(dico) {
    console.log("Card VERB ", dico['verb'].length);
});
