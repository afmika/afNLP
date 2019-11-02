const fs = require('fs');
let path = "./shiori-core/data/shiori-data/other/adj";

console.log(new Date());
fs.readFile(path,
    (err, text) => { 
        console.log('Length:', text.length);
        let arr = text.toString().split("\n");
        console.log(arr.length, " words");
    }
);
