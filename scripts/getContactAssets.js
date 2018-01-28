// Commands:
//   hubot get contact assets - get the contact's known assets

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const logger = require("winston");
const RedTailContactsAssetsLiabilities = require("RedTailContactsAssetsLiabilities.js");
const ContactAssetLiability = require("ContactAssetLiability.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+assets\s*$/i, { id: "contact.get.assets" }, function(message) {
        var command = new GetContactAssetsCommand(robot, message);
        command.respond();
    });
};

class GetContactAssetsCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
        	var id = StoredContact.id(self.robot, self.message);
        	RedTailContactsAssetsLiabilities.get(id)
        	.then(function(als) {
        		als = als.map(function(al) {
        			var al = new ContactAssetLiability(al);
        			return al.model();
        		})
        		
        		logger.log("info", "all pretty assets and liabilities", als);

            	resolve({
            		assetsLiabilities: als
            	});
            })
	        .catch(function(error) {
        		logger.log("error", "error getting assets", error);
            	resolve({error:true});
	        });
        });
    }

    view() {
        return "getContactAssets.txt";
    }
}
