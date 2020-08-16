/**
 * @author afmika
 * @contact afmichael73@gmail.com
 */

module.exports = 
class ToolsNLP {
    
    /**
     * @param {string} text
     * @returns {string} The trimmed text
     */
    static trim(text) {
        // removes extra spaces
        return text.replace(/[\s\t]+/gi, " ");
    }

    /**
     * @param {string} text
     * @returns {string[]} An array of tokens
     */
    static tokenize(text) {
        let tokens = [];
        text = this.trim(text);
        // takes everything inside a "", '' or <<>> as a single token
        let important = /".+"|'.+'|<<.+>>/gi;
        let quotes = /['"<>]/gi;
        let smth_in_quotes = text.match(important);
        let minus = text.split(important).join("[OBJECT]");
        let tmp = minus.split(/[\s.,;?]/gi);

        for(let i = 0, q = 0; i < tmp.length; i++) {
            let part  = tmp[i].split("[OBJECT]");
            if(part.length == 2) {
                tokens.push(part[0]); 
                tokens.push(smth_in_quotes[q].split(quotes).join(""));
                tokens.push(part[1]); 
                q++; 
            } else {
                tokens.push(part[0]);
            }
        }
        return tokens.filter(item => item != '');
    }

    /**
     * @param {string} a 
     * @param {string} b 
     * @returns {number} The levenshtein distance of (a, b)
     */
    static lenvenshtein(a, b) {
        let u = a.length,
            v = b.length;
        let tab = [];
        for (let k = -1; k < u; k++) {
            tab[k] = [];
            tab[k][ -1] = k + 1;
        }
        for (let j = -1; j < v; j++) {
            tab[ -1][j] = j + 1;
        }
        for (let k = 0; k < u; k++) {
            for (let j = 0; j < v; j++) {
                let cout = (a.charAt(k) === b.charAt(j)) ? 0 : 1;
                tab[k][j] = Math.min(
                    Math.min(1 + tab[k][j - 1], 1 + tab[k - 1][j]), 
                    cout + tab[k - 1][j - 1]
                );
            }
        }
        return tab[u - 1][v - 1];
    }
    
}