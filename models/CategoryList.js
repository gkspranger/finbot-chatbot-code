const Promise = require("promise");
const logger = require("winston");
const MappedData = require("MappedData.js");
const RedTailSettingsMCL = require("RedTailSettingsMCL.js");
const Category = require("Category.js");

class CategoryList {
    get(options) {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
              if (options && options.id) {
                var cl = self._filter(data, options.id);
                logger.log('info', 'MCL model', cl);
                resolve(cl);
              } else {
                var cl = self._map(data);
                logger.log('info', 'MCL model', cl);
                resolve(cl);
              }
            })
            .catch(function(error) {
                logger.log('error', `getting MCL: ${error}`);
                reject({error: true});
            });
        });
    }

    _map(data) {
      return data.map((mc) => new Category(mc).get());
    }

    _filter(data, id) {
      var mcl = data.filter((mc) => mc.MCLCode == id);
      return mcl.map((mc) => new Category(mc).get());
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailSettingsMCL.get()
            .then(function(data) {
              logger.log('info', 'MCL data:', data);
              resolve(data);
            })
            .catch(function(error) {
              logger.log('error', `getting MCL: ${error}`);
              reject({error: true});
            });
        });
    }
}

module.exports = CategoryList;
