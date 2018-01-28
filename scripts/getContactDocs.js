// Commands:
//   hubot get contact docs - get all contact documents

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactDocumentList = require("ContactDocumentList.js");
const logger = require("winston");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+docs\s*$/i, { id: "contact.get.docs" }, function(message) {
        var command = new GetContactDocsCommand(robot, message);
        command.respond();
    });
};

class GetContactDocsCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
          var contact = StoredContact.get(self.robot, self.message);
        	new ContactDocumentList(contact.id).get()
          .then(function(documents) {
            resolve({
              contact,
              documents
            });
          })
	        .catch(function(error) {
        		logger.log("error", "error documents", error);
            resolve({error:true});
          });
        });
    }

    view() {
        return "getContactDocs.txt";
    }
}
