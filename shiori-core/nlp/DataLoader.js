const fs = require('fs');
const default_path = "./shiori-core/data/shiori-data/en/";


module.exports = class DataLoader {
    constructor(path) {
        this.path = path || default_path;    
        this.data = {};
        this.dbfiles = {
            "adj" : "adj",
            "adv" : "adv",
            "noun" : "noun",
            "verb" : "verb",
            "prepositions" : "prepositions",

            "pronoun.demonstrative" : "pronoun.demonstrative",
            "pronoun.indefinite" : "pronoun.indefinite",
            "pronoun.intensive" : "pronoun.intensive",
            "pronoun.interrogative" : "pronoun.interrogative",
            "pronoun.objective" : "pronoun.objective",
            "pronoun.personal" : "pronoun.personal",
            "pronoun.possessive" : "pronoun.possessive",
            "pronoun.reciprocal" : "pronoun.reciprocal",
            "pronoun.reflexive" : "pronoun.reflexive",
            "pronoun.relative" : "pronoun.relative",
            "pronoun.subjective" : "pronoun.subjective"
        };
    }

    load() {
        let db_path = this.getDBFilesPath();

        for(let categ in db_path) {
            let categ_path = this.path + db_path[categ];
            this.data[categ] = [];
            try {
                let tmp = fs.readFileSync(categ_path);
                this.data[categ] = tmp.toString().split("\n");
            } catch(e) {
                console.log("ERROR ... Failed to read <"+categ_path+">");            
            }       

        }
        console.log("Loading done...");
    }

    getData() {
        return this.data;    
    }

    get(categ) {
        return this.data[categ];
    }

    getDBFilesPath() {
        return this.dbfiles;
    }
}



