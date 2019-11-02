/**
 * @author afmika
 * @contact afmichael73@gmail.com
 */

const ToolsNLP = require("./ToolsNLP");
const DocNLP = require("./DocNLP");

module.exports = 
class ShioriNLP {
    constructor() {
        this.map = {};
    }
    // TODO
    loadFile(path) {}
    save(path){}
    ////////

    addGroup(language, group) {
        if(this.map[language] == undefined) {
            this.map[language] = {};
        }
        if(this.map[language][group] == undefined) {
            this.map[language][group] = {"input" : [], "output": [] };
        }
    }
    add(path, type, value) {
        path = path.split("/");
        let [language, group] = path;
        this.addGroup(language, group);
        this.map[language][group][type].push(value);
    }
    addInput(path, input) {
        this.add(path, "input", input);
    }

    addOutput(path, output) {
        this.add(path, "output", output);      
    }

    guessResponse(output) {
        let _class = this.classify(output, false);
        let ref = this.explore(_class.getPath() + "/output"); 
        let index = Math.floor( Math.random() * ref.length );
        return ref[index];
    }

    getMap() {
        return this.map;
    }

    explore(path) {
        path = path.split("/");
        let [language, group, type] = path;
        if(group == "*" && type == undefined) {
            return this.map[language];
        }
        if(type != undefined) {
            if(type == "*" ) {
                return this.map[language][group];
            }
            return this.map[language][group][type];
        }
        return this.map[language][group];
    }
    
    analyze(word_data, text) {
        // word_data {categ: [.... words]}
        text = text.toLowerCase();
        let tokens = ToolsNLP.tokenize(text);
        let result = {};
        for(let categ in word_data) {
            tokens.forEach(token => {
                for(let i = 0; i < word_data[categ].length; i++) {
                    let sample = word_data[categ][i].toLowerCase();
                    if(sample == token) {
                        result[token] = categ;
                        break;
                    }
                }
                if(result[token] == undefined) {
                    result[token] = "UNKNOWN";
                }
            });
        }
        return result;
    }

    // classify the usertext in a strict manner
    getGroupOf(usertext, case_sensitive) {
        if(case_sensitive) {
        } else {
            usertext = usertext.toLowerCase();
        }
        let found = null;
        for(let lang in this.map) {
            for(let group in this.map[lang]) {
                this.map[lang][group]["input"].forEach(input => {
                    input = case_sensitive ? input : input.toLowerCase();
                    if(input == usertext) {
                        found = new DocNLP(lang, group);
                        return;
                    }
                });
            }
        }
        return found;
    }

    // same as getgroupof
    // 'tries' to classify the usertext instead
    classify(usertext, case_sensitive) {
        if(case_sensitive) {
        } else {
            usertext = usertext.toLowerCase();
        }
        let found = null;
        let group_dist_hash = {};
        for(let lang in this.map) {
            for(let group in this.map[lang]) {
                group_dist_hash[group] = 0;
                this.map[lang][group]["input"].forEach(input => {
                    input = case_sensitive ? input : input.toLowerCase();
                    let dist = ToolsNLP.lenvenshtein(input, usertext);
                    if(group_dist_hash[group]) {           
                    } else {
                        group_dist_hash[group] = {score: +Infinity, language: ""};  
                    }
                    group_dist_hash[group] = {
                        score: Math.min(dist, group_dist_hash[group].score),
                        language: lang
                    }
                });
            }
        }
        // dist_min <=> inv_dist_max
        let dist_min = +Infinity;
        let _group = new DocNLP();
        for(let group in group_dist_hash) {
            let score = group_dist_hash[group].score;
            if(dist_min > score) {
                dist_min = score;
                _group.language = group_dist_hash[group].language;
                _group.group = group;
            }
        }

        return _group;
    }
}
