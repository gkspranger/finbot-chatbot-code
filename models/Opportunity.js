const logger = require("winston");
const MappedData = require("MappedData.js");
const moment = require("moment");
const numeral = require("numeral");
const UserListModel = require("UserListModel.js");

class Opportunity {
    constructor(opportunity) {
        this.opportunity = opportunity;
    }

    _map() {
        return {
          "Amount": "amount",
          "AssignedTo": "assigned",
          "CloseDate": "close",
          "Description": "description",
          "Name": "name",
          "NextStep": "next"
        };
    }

    get() {
      var self = this;
      return new Promise(function(resolve, reject) {
        logger.log('debug', 'opportunity data', self.opportunity);
        var opportunity = MappedData.map(self._map(), self.opportunity);
        opportunity.close = self._close(self.opportunity);
        opportunity.amount = numeral(opportunity.amount).format("$0,0.00");
        new UserListModel({"search": opportunity.assigned}).model()
        .then((userList) => {
          opportunity.assignedUser = userList.users[0];
          resolve(opportunity);
        });
      });
    }

    _close(data) {
      return moment(data.CloseDate).format("MM/DD/YYYY");
    }
}

module.exports = Opportunity;
