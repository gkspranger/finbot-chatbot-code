// Commands:
//   hubot get open opportunities - get all open ops

const HubotCommand = require("HubotCommand.js");
const OpportunityList = require("OpportunityList.js");
const logger = require("winston");

module.exports = function(robot) {
    robot.respond(/get\s+open\s+opportunities\s*$/i, { id: "opportunity.open" }, function(message) {
        var command = new GetOpenOpportunitiesCommand(robot, message);
        command.respond();
    });
};

class GetOpenOpportunitiesCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
        	new OpportunityList().get()
          .then(function(opportunities) {
            logger.log('info', 'open opps', opportunities);
            resolve({
              opportunities
            });
          })
	        .catch(function(error) {
        		logger.log("error", "error open opps", error);
            resolve({error:true});
          });
        });
    }

    view() {
        return "getOpenOpportunities.txt";
    }
}
