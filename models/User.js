const logger = require("winston");
const MappedData = require("MappedData.js");

class User {
    constructor(user) {
        this.user = user;
    }

    _map() {
      return {
        "FirstName": "firstName",
        "LastName": "lastName",
        "NameShort": "short",
        "UserID": "id"
      };
    }

    get() {
      var self = this;
      logger.log('info', 'user data', self.user);
      return MappedData.map(self._map(), self.user);
    }
}

module.exports = User;
