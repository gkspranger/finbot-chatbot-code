const Log = require("Log.js");
const MappedData = require("MappedData.js");

class ContactPhoneModel {
    constructor(phone) {
        this.phone = phone;
    }

    _map() {
        return {
            "Extension": "extension",
            "Label": "label",
            "Number_Formatted": "number",
            "Preferred": "preferred",
            "Type": "type"
        };
    }

    model() {
        var self = this;
        Log.debug(`contact phone data: ${JSON.stringify(self.phone)}`);
        return MappedData.map(self._map(), self.phone);
    }
}

module.exports = ContactPhoneModel;
