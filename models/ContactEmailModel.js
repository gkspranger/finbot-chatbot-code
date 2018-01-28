const Log = require("Log.js");
const MappedData = require("MappedData.js");

class ContactEmailModel {
    constructor(email) {
        this.email = email;
    }

    _map() {
        return {
            "Address": "address",
            "Label": "label",
            "Preferred": "preferred",
            "Type": "type"
        };
    }

    model() {
        var self = this;
        Log.debug(`contact email data: ${JSON.stringify(self.email)}`);
        return MappedData.map(self._map(), self.email);
    }
}

module.exports = ContactEmailModel;
