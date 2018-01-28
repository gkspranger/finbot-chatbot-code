const Promise = require("promise");
const Log = require("Log.js");
const MappedData = require("MappedData.js");
const MyString = require("MyString.js");
const RedTailContactsImportantInfo = require("RedTailContactsImportantInfo.js");
const striptags = require('striptags');

class ContactImportantModel {
    constructor(id) {
        this.id = id;
    }

    _map() {
        return {
            "ImportantInformation": "important"
        };
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                Log.debug(`contact important data: ${JSON.stringify(data)}`);
                var important = MappedData.map(self._map(), data);
                important.important = self._toArray(important);
                Log.debug(`contact important model: ${JSON.stringify(important)}`);
                resolve(important);
            })
            .catch(function(error) {
                Log.error(`getting contact important: ${error}`);
                reject(error);
            });
        });
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsImportantInfo.get(self.id)
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }

    _toArray(important) {
        var important = important.important.replace(/<br \/>/gi, "#LBR#");
        important = striptags(important);
        Log.debug(`see clean important data: ${important}`);
        return important.split("#LBR#").filter(function(item) {
            if (!MyString.empty(item.trim())) {
                return item.trim();
            }
        });
    }
}

module.exports = ContactImportantModel;
