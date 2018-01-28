// Commands:
//   hubot get contact addresses - get all contact addresses

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactAddressModel = require("ContactAddressModel.js");
const RedTailContactsAddresses = require("RedTailContactsAddresses.js");
const logger = require("winston");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+addresses(s)?\s*$/i, { id: "contact.get.addresses" }, function(message) {
        var command = new GetContactAddressesCommand(robot, message);
        command.respond();
    });
};

class GetContactAddressesCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var id = StoredContact.id(self.robot, self.message);
        	RedTailContactsAddresses.get(id)
        	.then(function(addresses) {
        		addresses = addresses.map(function(address) {
        			return new ContactAddressModel(address).model();
        		})
        		logger.log("info", "all addresses", addresses);
            	resolve({
            		addresses
            	});
            })
	        .catch(function(error) {
        		logger.log("error", "error getting addresses", error);
            	resolve({error:true});
	        });
        });
    }

    view() {
        return "getContactAddresses.txt";
    }
}
