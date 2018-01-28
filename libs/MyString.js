class MyString {
    static empty(string) {
        return (!string.trim() || "null" == string || "false" == string || 0 == string.length || typeof(string) == "undefined");
    }
    
    static toBase64(string) {
        return Buffer.from(string.trim()).toString("base64");
    }

    static fromBase64(string) {
        return Buffer.from(string.trim(), "base64");
    }
}

module.exports = MyString;
