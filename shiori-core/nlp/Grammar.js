/**
 * @author afmika
 * @contact afmichael73@gmail.com
 */

module.exports = 
class Grammar {

    /**
     * Instanciates a new Grammar object with the specified rule
     * @param {string} rule 
     */
    constructor(rule) {
        this.rule = rule || "";
        this.alias = {};
    }

    /**
     * Specifies a new grammar rule expressed as a regular expression
     * ex: <noun>?<verb>{1}<X>?
     * @param {string} rule 
     */
    defineRule(rule) {
        this.rule = rule;
        this.tmp =true;
    }

    /**
     * Defines aliases from a map object
     * @param {JSON} obj string map 
     */
    defineAliases(obj) {
        for(let i in obj) {
            this.setAlias(i, obj[i]);
        }
    }

    /**
     * Defines an alias for a single item or an array of item
     * @param {string} key 
     * @param {string|string[]} item
     */
    setAlias(key, item) {
        if(this.alias[key] == undefined) {
            this.alias[key] = [];
        }
        if(typeof(item) == 'string' ) {
            this.alias[key].push(item);            
        } else {
            // array
            this.alias[key] = item;
        }
    }

    /**
     * @param {string} _alias 
     * @returns true if this object contains the specified alias
     */
    containsAlias( _alias ) {
        for(let key in this.alias) {
            // reduce the matching probability
            let fix = "[|()]?";
            let rg = new RegExp(fix+key+fix, "g");
            if(_alias.match(rg) != null) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {string} rule 
     */
    adjustRule(rule) {
        for(let key in this.alias) {
            let tab = this.alias[key];
            let values = `( ${ tab.join('|') } )`;
            rule = rule.replace(new RegExp(key, "g"), values);
        }
        // search recursively
        if( this.containsAlias(rule) ) {
            rule = this.adjustRule(rule);
        }
        return rule;
    }
    
    /**
     * @param {JSON} analyzed_word 
     */
    test(analyzed_word) {
        if(this.rule == "" || this.rule == undefined) {
            throw "Grammar.rule must be defined!";
        }
        let tmp = this.adjustRule(this.rule);
        let rule_reg = new RegExp(tmp, "gi");

        // ex : I am Michael => <noun><verb><noun>        
        let ph = "";
        for(let word in analyzed_word) {
            ph += `<${analyzed_word[word]}>`;
        }
        //console.log(ph, "rule", tmp);
        return ph.match(rule_reg) != null;
    }
}