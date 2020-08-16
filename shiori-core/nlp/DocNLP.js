/**
 * @author afmika
 * @contact afmichael73@gmail.com
 */

module.exports = 
class DocNLP {

    /**
     * @param {string} language 
     * @param {string} group 
     */
    constructor(language, group) {
        this.language = language;
        this.group = group;
    }

    /**
     * @returns {String}
     */
    getPath() {
        return this.language + "/" + this.group;
    }

    /**
     * @returns {String}
     */
    toString() {
        return this.getPath();
    }
}
