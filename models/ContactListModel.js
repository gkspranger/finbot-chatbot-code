const Promise = require("promise");
const Log = require("Log.js");
const MappedData = require("MappedData.js");
const MyString = require("MyString.js");
const RedTailContacts = require("RedTailContacts.js");

class ContactListModel {
    _map() {
        return {
            "Age": "age",
            "ClientID": "id",
            "FirstName": "firstName",
            "Gender": "gender",
            "LastName": "lastName",
            "MiddleName": "middleName",
            "TaxID": "taxId"
        };
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                var contacts = data.map(function(contact) {
                    return MappedData.map(self._map(), contact);
                });
                resolve({
                    "contacts": contacts
                });
            })
            .catch(function(error) {
                Log.error(`getting contacts list model: ${error}`);
                reject({
                    "error": true
                });
            });
        });
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContacts.get()
            .then(function(data) {
                resolve(self._filter(data));
            })
            .catch(function(error) {
                Log.error(error);
                reject(error);
            });
        });
    }

    _filter(data) {
        var contacts = data.Detail.filter(function(contact) {
            if (!MyString.empty(contact.LastName) || !MyString.empty(contact.FirstName)) {
                return contact;
            }
        });
        return contacts;
    }
}

module.exports = ContactListModel;
