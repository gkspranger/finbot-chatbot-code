// Commands:
//   hubot get contact phones - get all contact phones

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactPhoneModel = require("ContactPhoneModel.js");
const RedTailContactsPhones = require("RedTailContactsPhones.js");
const logger = require("winston");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+phone(s)?\s*$/i, { id: "contact.get.phones" }, function(message) {
        var command = new GetContactPhonesCommand(robot, message);
        command.respond();
    });
};

class GetContactPhonesCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var id = StoredContact.id(self.robot, self.message);
        	RedTailContactsPhones.get(id)
        	.then(function(phones) {
        		phones = phones.map(function(phone) {
        			return new ContactPhoneModel(phone).model();
        		})
        		logger.log("info", "all phones", phones);
            	resolve({
            		phones
            	});
            })
	        .catch(function(error) {
        		logger.log("error", "error getting phones", error);
            	resolve({error:true});
	        });
        });
    }

    view() {
        return "getContactPhones.txt";
    }
}
