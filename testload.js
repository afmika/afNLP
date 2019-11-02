const DataLoader = require("./shiori-core/nlp/DataLoader");
let data = new DataLoader();
// data.path = "./shiori-core/data/shiori-data/";
data.load();
// test
console.log("Card VERB ", data.get('verb').length);
