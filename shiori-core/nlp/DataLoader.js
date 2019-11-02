const fs = require('fs');
const default_path = "./shiori-core/data/shiori-data/";


module.exports = class DataLoader {
    constructor(path) {
        this.path = path || default_path;    
        this.data = {};
    }

    load() {
        let db_path = this.getDBPath();

        for(let categ in db_path) {
            let categ_path = db_path[categ];
            this.data[categ] = [];
            try {
                console.log(categ_path);
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

    getDBPath() {
        return {
            "adj" : this.path + "en/adj",
            "adv" : this.path + "en/adv",
            "noun" : this.path + "en/noun",
            "verb" : this.path + "en/verb",
            "prepositions" : this.path + "en/prepositions",

            "pronoun.demonstrative" : this.path + "en/pronoun.demonstrative",
            "pronoun.indefinite" : this.path + "en/pronoun.indefinite",
            "pronoun.intensive" : this.path + "en/pronoun.intensive",
            "pronoun.interrogative" : this.path + "en/pronoun.interrogative",
            "pronoun.objective" : this.path + "en/pronoun.objective",
            "pronoun.personal" : this.path + "en/pronoun.personal",
            "pronoun.possessive" : this.path + "en/pronoun.possessive",
            "pronoun.reciprocal" : this.path + "en/pronoun.reciprocal",
            "pronoun.reflexive" : this.path + "en/pronoun.reflexive",
            "pronoun.relative" : this.path + "en/pronoun.relative",
            "pronoun.subjective" : this.path + "en/pronoun.subjective"
        }
    }
}



