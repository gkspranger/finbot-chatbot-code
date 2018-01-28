const Promise = require("promise");
const logger = require("winston");
const MappedData = require("MappedData.js");
const MyString = require("MyString.js");
const RedTailSettingsSAL = require("RedTailSettingsSAL.js");
const ServiceAdvisor = require("ServiceAdvisor.js");

class ServiceAdvisorList {
    get(options) {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
              if (options && options.id) {
                resolve(self._filter(data, options.id));
              } else {
                resolve(self._map(data, options.id));
              }
            })
            .catch(function(error) {
                logger.log('error', `getting SAL: ${error}`);
                reject({error: true});
            });
        });
    }

    _map(data) {
      return data.map((sa) => new ServiceAdvisor(sa).get());
    }

    _filter(data, id) {
      var csa = data.filter((sa) => sa.SALCode == id);
      return csa.map((sa) => new ServiceAdvisor(sa).get());
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailSettingsSAL.get()
            .then(function(data) {
              logger.log('info', 'SAL data:', data);
              resolve(data);
            })
            .catch(function(error) {
              logger.log('error', `getting SAL: ${error}`);
              reject({error: true});
            });
        });
    }
}

module.exports = ServiceAdvisorList;
