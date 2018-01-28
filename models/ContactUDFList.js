const Promise = require("promise");
const Log = require("Log.js");
const RedTailContactsUDF = require("RedTailContactsUDF.js");
const ContactUDF = require("ContactUDF.js");

class ContactUDFList {
    constructor(id) {
        this.id = id;
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                Log.debug(`contact udf list data: ${JSON.stringify(data)}`);
                var udfs = data.map(function(udf) {
                    return new ContactUDF(udf).model();
                });
                Log.debug(`contact udfs model: ${JSON.stringify(udfs)}`);
                resolve({
                    "udfs": udfs
                });
            })
            .catch(function(error) {
                Log.error(`getting contact udf: ${error}`);
                reject(error);
            });
        });
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsUDF.get(self.id)
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }
}

module.exports = ContactUDFList;
