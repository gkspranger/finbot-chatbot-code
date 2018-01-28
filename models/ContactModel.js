const Promise = require("promise");
const Log = require("Log.js");
const logger = require("winston");
const MappedData = require("MappedData.js");
const ServiceAdvisorList = require("ServiceAdvisorList.js");
const ContactAddressModel = require("ContactAddressModel.js");
const ContactEmailModel = require("ContactEmailModel.js");
const ContactPhoneModel = require("ContactPhoneModel.js");
const RedTailContactsMaster = require("RedTailContactsMaster.js");
const moment = require("moment");

class ContactModel {
    constructor(id) {
        this.id = id;
    }

    _map() {
        return {
            "Age": "age",
            "Category": "category",
            "ClientID": "id",
            "DateOfBirth": "dob",
            "Firstname": "firstName",
            "Lastname": "lastName",
            "Middlename": "middleName",
            "Name": "name",
            "ServicingAdvisorID": "salId",
            "Status": "status",
            "TaxID": "taxId"
        };
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                Log.debug(`contact details data: ${JSON.stringify(data)}`);
                var contact = MappedData.map(self._map(), data.ContactRecord);
                contact.dob = self._dob(data);
                contact.taxId = self._taxId(data);
                contact.phones = self._phones(data);
                contact.emails = self._emails(data);
                contact.addresses = self._addresses(data);
                self._salData(contact.salId)
                .then(function(sal) {
                  contact.sa = sal[0];
                  logger.log('info', 'completed contact model', contact);
                  resolve(contact);
                })
                .catch(function(error) {
                  reject(error);
                });
            })
            .catch(function(error) {
                Log.error(`getting contact model: ${error}`);
                reject(error);
            });
        });
    }

    _addresses(data) {
        var addresses = data.Address.map(function(address) {
            return new ContactAddressModel(address).model();
        });
        return addresses;
    }

    _emails(data) {
        var emails = data.Internet.map(function(internet) {
            return new ContactEmailModel(internet).model();
        });
        return emails;
    }

    _phones(data) {
        var phones = data.Phone.map(function(phone) {
            return new ContactPhoneModel(phone).model();
        });
        return phones;
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsMaster.get(self.id)
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }

    _salData(id) {
        var self = this;
        return new Promise(function(resolve, reject) {
            new ServiceAdvisorList().get({id})
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }

    _dob(data) {
        return moment(data.DateOfBirth).format("MM/DD/YYYY");
    }

    _taxId(data) {
        var taxId = data.ContactRecord.TaxID;
        return `${taxId.substr(0,3)}-${taxId.substr(3,2)}-${taxId.substr(5,4)}`;
    }
}

module.exports = ContactModel;
