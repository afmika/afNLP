module.exports = 
class DocNLP {
    constructor(language, group) {
        this.language = language;
        this.group = group;
    }
    getPath() {
        return this.language + "/" + this.group;
    }
    toString() {
        return this.getPath();
    }
}
