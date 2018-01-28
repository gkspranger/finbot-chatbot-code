const Log = require("Log.js");
const MappedData = require("MappedData.js");

class ContactAddressModel {
    constructor(address) {
        this.address = address;
    }

    _map() {
        return {
            "Address1": "address1",
            "Address2": "address2",
            "City": "city",
            "Label": "label",
            "Preferred": "preferred",
            "State": "state",
            "Type": "type",
            "Zip": "zipCode"
        };
    }

    model() {
        var self = this;
        Log.debug(`contact address data: ${JSON.stringify(self.address)}`);
        return MappedData.map(self._map(), self.address);
    }
}

module.exports = ContactAddressModel;
