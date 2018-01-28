const Promise = require("promise");
const MappedData = require("MappedData.js");
const RedTailContactsPhones = require("RedTailContactsPhones.js");
const logger = require("winston");

class AddedContactPhone {
  constructor(options) {
    this.options = options;
  }

  _map() {
      return {
          "Extension": "extension",
          "Label": "label",
          "Number_Formatted": "number",
          "Preferred": "preferred",
          "Type": "type"
      };
  }

  model() {
    var self = this;
    return new Promise(function(resolve, reject) {
      self._updateData()
      .then((data) => {
        var phone = MappedData.map(self._map(), data);
        resolve(phone);
      })
    });
  }

  _updateData() {
    var self = this;
    return new Promise(function(resolve, reject) {
      RedTailContactsPhones.put(self.options)
      .then((phone) => {
        logger.info('new phone data:', phone);
        resolve(phone);
      });
    });
  }
}

module.exports = AddedContactPhone;
