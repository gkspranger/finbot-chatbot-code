const logger = require("winston");
const MappedData = require("MappedData.js");

class ContactTagGroup {
    constructor(tagGroup) {
        this.tagGroup = tagGroup;
    }

    _map() {
        return {
            "Name": "name"
        };
    }

    get() {
      var self = this;
      logger.log('debug', 'tag group data', self.tagGroup);
      return MappedData.map(self._map(), self.tagGroup);
    }
}

module.exports = ContactTagGroup;
