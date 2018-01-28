const logger = require("winston");
const MappedData = require("MappedData.js");

class Category {
    constructor(category) {
        this.category = category;
    }

    _map() {
        return {
            "Code": "name"
        };
    }

    get() {
      var self = this;
      logger.log('info', 'category data', self.category);
      return MappedData.map(self._map(), self.category);
    }
}

module.exports = Category;
