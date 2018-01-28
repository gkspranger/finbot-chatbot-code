const Promise = require("promise");
const Log = require("Log.js");
const RedTailContactsImportantInfo = require("RedTailContactsImportantInfo.js");

class UpdatedContactImportantModel {
    constructor(contact, info) {
        this.contact = contact;
        this.info = info;
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                self._updateData(data)
                .then(function(data) {
                	Log.debug(`contact updated important data: ${data}`);
                	resolve({
                		"success": data,
                        "contact": self.contact,
                        "info": self.info
                	});
                })
                .catch(function(error) {
                    Log.error(`add updated contact important: ${error}`);
                    reject(error);
                });
            })
            .catch(function(error) {
                Log.error(`getting updated contact important: ${error}`);
                reject(error);
            });
        });
    }

    _addInfo(data) {
        var self = this;
        var curInfo = data.ImportantInformation;
        var newInfo = `${curInfo}<br /><br />${self.info}`;
        data.ImportantInformation = newInfo;
        Log.debug(`add contact important data: ${JSON.stringify(data)}`);
        return data;
    }

    _updateData(data) {
        var self = this;
        return new Promise(function(resolve, reject) {
        	data = self._addInfo(data);
            RedTailContactsImportantInfo.put(self.contact.id, data)
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
            	Log.error(error);
                reject(error);
            });
        });
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsImportantInfo.get(self.contact.id)
            .then(function(data) {
            	Log.debug(`just getting contact important data: ${JSON.stringify(data)}`);
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }
}

module.exports = UpdatedContactImportantModel;
