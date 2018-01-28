const Promise = require("promise");
const logger = require("winston");
const MappedData = require("MappedData.js");
const RedTailContactsTagGroups = require("RedTailContactsTagGroups.js");
const ContactTagGroup = require("ContactTagGroup.js");

class ContactTagGroupList {
  constructor(id) {
      this.id = id;
  }

  get() {
      var self = this;
      return new Promise(function(resolve, reject) {
          self._data()
          .then(function(data) {
            var tagGroups = data.map((tagGroup) => {
              return new ContactTagGroup(tagGroup).get();
            });
            resolve(tagGroups);
          })
          .catch(function(error) {
              logger.log('error', `getting contact tag groups: ${error}`);
              reject({error: true});
          });
      });
  }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsTagGroups.get(self.id)
            .then(function(data) {
              logger.log('info', 'contacts tag group data:', data);
              resolve(data);
            })
            .catch(function(error) {
              logger.log('error', `gettign contact tag groups: ${error}`);
              reject({error: true});
            });
        });
    }
}

module.exports = ContactTagGroupList;
