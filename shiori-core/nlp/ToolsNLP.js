module.exports = 
class ToolsNLP {
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