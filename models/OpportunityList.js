const Promise = require("promise");
const logger = require("winston");
const RedTailOpportunitiesOpen = require("RedTailOpportunitiesOpen.js");
const Opportunity = require("Opportunity.js");

class OpportunityList {
  get() {
      var self = this;
      return new Promise(function(resolve, reject) {
          self._data()
          .then(function(data) {
            Promise.all(data.Opportunities.map((opportunity) => {
              return new Opportunity(opportunity).get();
            }))
            .then(function(opportunities) {
              resolve(opportunities);
            });
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
        RedTailOpportunitiesOpen.get()
        .then(function(data) {
          logger.log('info', 'opps open data:', data);
          resolve(data);
        })
        .catch(function(error) {
          logger.log('error', `gettign ops open: ${error}`);
          reject({error: true});
        });
    });
  }
}

module.exports = OpportunityList;
