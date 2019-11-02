const fs = require('fs');
const default_path = "./shiori-core/data/shiori-data/en/";


module.exports = class DataLoader {
    constructor(path) {
        this.path = path || default_path;    
        this.data = {};
        this.dbfiles = {
            // it will run faster this way
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
            "pronoun.subjective" : "pronoun.subjective",

            "adj" : "adj",
            "adv" : "adv",
            "noun" : "noun",
            "verb" : "verb"
        };
    }

    loadSync() {
        let db_path = this.getDBFilesPath();

        for(let categ in db_path) {
            let categ_path = this.path + db_path[categ];
            this.data[categ] = [];
            try {
                let tmp = fs.readFileSync(categ_path);
                this.data[categ] = tmp.toString().split("\n");
            } catch(e) {
                console.log("ERROR ... Failed to read "+categ_path);
                return false; 
            }
        }
        console.log("Loading done...");
        return true;
    }

    load(callback) {
        let that = this;
        new Promise((resolve, reject) => {
            if(that.loadSync()) {
                resolve(that);
            } else {
                reject("Loading failed :(");
            }
        }).then(loader_obj => {
            callback(loader_obj.getData());
        }).catch(err => {
            console.log(err);
        });
    }

    getGrammarItems() {
        let res = [];
        for(let categ in this.dbfiles) {
            res.push(categ);
        }
        return res;
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



