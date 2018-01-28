const moment = require("moment");
const Promise = require("promise");
const Log = require("Log.js");
const RedTailContactsPersonalProfile = require("RedTailContactsPersonalProfile.js");
const ContactModel = require("ContactModel.js");
const MappedData = require("MappedData.js");

class ContactProfileModel {
    constructor(id) {
        this.id = id;
    }

    _map() {
        return {
            "AnnualReview_Next": "nextAnnualReview",
            "AnnualReview_Frequency": "annualReviewFrequency",
            "ImportantInformation": "important",
            "Occupation": "occupation",
            "OccupationStartDate": "occupationStarted",
            "ProfessionalContact_Attorney": "attorney",
            "ProfessionalContact_CPA": "cpa",
            "ProfessionalContact_Doctor": "doctor",
            "ProfessionalContact_InsuranceAgent": "agent",
            "RecAdd": "added",
            "RetirementDate": "retirement"
        };
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                Log.debug(`contact profile data: ${JSON.stringify(data)}`);
                var profile = MappedData.map(self._map(), data);
                profile.nextAnnualReview = self._nextAnnualReview(data);
                profile.retirement = self._retirement(data);
                
                Promise.all(self._professionalContactsIds(data).map(function(id) {
                    return new ContactModel(id).model();
                }))
                .then(function(professionalContacts) {
                    profile = self._professionalContacts(profile, data, professionalContacts);
                    profile.added = self._added(data);
                    profile.occupationStarted = self._occupationStarted(data);
                    profile.firstAnnualReview = self._firstAnnualReview(data);
                    profile.reviewInterval = self._reviewInterval(data);
                    profile.reviewUnit = self._reviewUnit(data);
                    Log.debug(`contact profile model: ${JSON.stringify(profile)}`);
                    resolve(profile);
                })
                .catch(function(error) {
                    Log.error(`getting profile professional contacts: ${error}`);
                    Log.debug(`contact profile model: ${JSON.stringify(profile)}`);
                    resolve(profile);
                });
            })
            .catch(function(error) {
                Log.error(`getting contact profile: ${error}`);
                reject(error);
            });
        });
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsPersonalProfile.get(self.id)
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }

    _professionalContactsIds(data) {
        var ids = [data.ProfessionalContact_Attorney,
                    data.ProfessionalContact_CPA,
                    data.ProfessionalContact_Doctor,
                    data.ProfessionalContact_InsuranceAgent];
                    
        return ids.filter(function(id) {
            if (id !== 0) {
                Log.debug(`returning professional contact id: ${id}`);
                return id;
            }
        });
    }

    _professionalContacts(profile, data, professionalContacts) {
        var self = this;
        profile.attorney = self._mapProfessionalContact(data.ProfessionalContact_Attorney, professionalContacts);
        profile.cpa = self._mapProfessionalContact(data.ProfessionalContact_CPA, professionalContacts);
        profile.doctor = self._mapProfessionalContact(data.ProfessionalContact_Doctor, professionalContacts);
        profile.agent = self._mapProfessionalContact(data.ProfessionalContact_InsuranceAgent, professionalContacts);
        return profile;
    }

    _mapProfessionalContact(professionalContactId, professionalContacts) {
        var contact = professionalContacts.filter(function(professionalContact) {
            if (professionalContact.id == professionalContactId) {
                Log.debug(`found map for: ${professionalContactId}`);
                return professionalContact;
            }
        });
        
        if (contact.length == 0) {
            return {
                "empty": true
            };
        } else {
            return contact[0];
        }
    }

    _occupationStarted(data) {
        return moment(data.OccupationStartDate).format("MM/DD/YYYY");
    }

    _added(data) {
        return moment(data.RecAdd).format("MM/DD/YYYY");
    }
    
    _nextAnnualReview(data) {
        return moment(data.AnnualReview_Next).format("MM/DD/YYYY @ hh:mma");
    }

    _retirement(data) {
        return moment(data.RetirementDate).format("MM/DD/YYYY");
    }

    _firstAnnualReview(data) {
        var self = this;
        var value = self._parseAnnualReviewFrequency("start_time", data);
        var re = /.*([0-9]{4}-[0-9]{2}-[0-9]{2}).*/g;
        var match = re.exec(value);
        
        if (match[1]) {
            return moment(match[1]).format("MM/DD/YYYY");
        } else {
            return "";
        }
    }

    _reviewInterval(data) {
        var self = this;
        var value = self._parseAnnualReviewFrequency("interval", data);
        var re = /.*([0-9]+).*/g;
        var match = re.exec(value);
        
        if (match[1]) {
            return match[1];
        } else {
            return "";
        }
    }

    _reviewUnit(data) {
        var self = this;
        var value = self._parseAnnualReviewFrequency("rule_type", data);
        if (value.match(/daily/i)) {
            return "day";
        } else if (value.match(/weekly/i)) {
            return "week";
        } else if (value.match(/monthly/i)) {
            return "month";
        } else if (value.match(/yearly/i)) {
            return "year";
        } else {
            return "";
        }
    }

    _parseAnnualReviewFrequency(label, data) {
        var re = new RegExp(`.*${label}`, "g");
        var values = data.AnnualReview_Frequency.split("\n").filter(function(value) {
            Log.debug(`ARF line: ${value}`);
            if (value.match(re)) {
                Log.debug(`found ARF line match: ${value}`);
                return value;
            }
        });
        
        if (values.length == 1) {
            return values[0];
        } else {
            return "";
        }
    }
}

module.exports = ContactProfileModel;
