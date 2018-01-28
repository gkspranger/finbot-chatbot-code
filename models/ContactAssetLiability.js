const logger = require("winston");
const MappedData = require("MappedData.js");
const numeral = require("numeral");

class ContactAssetLiability {
    constructor(al) {
        this.al = al;
    }

    _map() {
        return {
        	"CurrentBalance": "balance",
        	"Name": "name",
        	"Type": "type"
        };
    }

    model() {
        var self = this;
        logger.log("info", "contact asset", self.al);
        var al = MappedData.map(self._map(), self.al);
        al.balance = numeral(al.balance).format("$0,0.00");
        return al;
    }
}

module.exports = ContactAssetLiability;
