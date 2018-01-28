const Promise = require("promise");
const MappedData = require("MappedData.js");
const RedTailContactsInternets = require("RedTailContactsInternets.js");
const logger = require("winston");

class AddedContactEmail {
  constructor(options) {
    this.options = options;
  }

  _map() {
      return {
          "Address": "address"
      };
  }

  model() {
    var self = this;
    return new Promise(function(resolve, reject) {
      self._updateData()
      .then((data) => {
        var email = MappedData.map(self._map(), data);
        resolve(email);
      })
    });
  }

  _updateData() {
    var self = this;
    return new Promise(function(resolve, reject) {
      RedTailContactsInternets.put(self.options)
      .then((email) => {
        logger.info('new email data:', email);
        resolve(email);
      });
    });
  }
}

module.exports = AddedContactEmail;
