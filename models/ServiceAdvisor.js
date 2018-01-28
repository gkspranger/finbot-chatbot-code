const logger = require("winston");
const MappedData = require("MappedData.js");

class ServiceAdvisor {
    constructor(sa) {
        this.sa = sa;
    }

    _map() {
        return {
            "Code": "name"
        };
    }

    get() {
      var self = this;
      logger.log('debug', `contact email data: ${JSON.stringify(self.email)}`);
      return MappedData.map(self._map(), self.sa);
    }
}

module.exports = ServiceAdvisor;
