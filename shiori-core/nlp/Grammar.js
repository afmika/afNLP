module.exports = 
class Grammar {
    constructor(rule) {
        this.rule = rule || "";
        this.alias = {};
    }
    defineRule(rule) {
        // X means anything ;)
        // ex: <noun>?<verb>{1}<X>?
        this.rule = rule;
        this.tmp =true;
    }

    defineAlias(obj) {
        for(let i in obj) {
            this.setAlias(i, obj[i]);
        }
    }

    setAlias(key, item) {
        if(this.alias[key] == undefined) {
            this.alias[key] = [];
        }
        if(typeof(item) == "string") {
            this.alias[key].push(item);            
        } else {
            // array
            this.alias[key] = item;
        }
    }

    containsAlias(_rule) {
        let alias_count = 0;
        for(let key in this.alias) {
            // reduce the matching probability
            // for example if the key is 'SUB' and there is also
            let fix = "[|()]?";
            let rg = new RegExp(fix+key+fix, "g");
            if(_rule.match(rg) != null) {
                alias_count++;
            }
        }
        return alias_count > 0;
    }
    adjustRule(rule) {
        //console.log(rule);
        for(let key in this.alias) {
            let tab = this.alias[key];
            let vals = "(" + tab.join("|") + ")";
            rule = rule.replace(new RegExp(key, "g"), vals);
        }

        // recurs
        if( this.containsAlias(rule) ) {
            rule = this.adjustRule(rule);
        }
        
        return rule;
    }
    test(analyzed_word) {
        if(this.rule == "" || this.rule == undefined) {
            throw "Grammar.rule must be defined!";
        }
        let tmp = this.adjustRule(this.rule);
        let rule_reg = new RegExp(tmp, "gi");

        // ex : I am Michael => <noun><verb><noun>        
        let ph = "";
        for(let word in analyzed_word) {
            ph += "<"+analyzed_word[word]+">";
        }
        //console.log(ph, "rule", tmp);
        return ph.match(rule_reg) != null;
    }
}