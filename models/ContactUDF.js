const Log = require("Log.js");
const MappedData = require("MappedData.js");

class ContactUDF {
    constructor(udf) {
        this.udf = udf;
    }

    _map() {
        return {
            "FieldName": "name",
            "Value": "value"
        };
    }

    model() {
        var self = this;
        Log.debug(`contact udf data: ${JSON.stringify(self.udf)}`);
        return MappedData.map(self._map(), self.udf);
    }
}

module.exports = ContactUDF;
