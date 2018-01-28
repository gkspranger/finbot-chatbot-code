// Commands:
//   hubot get contact emails - get all contact emails

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactEmailModel = require("ContactEmailModel.js");
const RedTailContactsInternets = require("RedTailContactsInternets.js");
const logger = require("winston");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+emails(s)?\s*$/i, { id: "contact.get.emails" }, function(message) {
        var command = new GetContactEmailsCommand(robot, message);
        command.respond();
    });
};

class GetContactEmailsCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var id = StoredContact.id(self.robot, self.message);
        	RedTailContactsInternets.get(id)
        	.then(function(emails) {
        		emails = emails.map(function(email) {
        			return new ContactEmailModel(email).model();
        		})
        		logger.log("info", "all emails", emails);
            	resolve({
            		emails
            	});
            })
	        .catch(function(error) {
        		logger.log("error", "error getting emails", error);
            	resolve({error:true});
	        });
        });
    }

    view() {
        return "getContactEmails.txt";
    }
}
