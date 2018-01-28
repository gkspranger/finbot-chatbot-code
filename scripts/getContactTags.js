// Commands:
//   hubot get contact tags - get all contact tags

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactTagGroupList = require("ContactTagGroupList.js");
const logger = require("winston");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+tags?\s*$/i, { id: "contact.get.tags" }, function(message) {
        var command = new GetContactTagsCommand(robot, message);
        command.respond();
    });
};

class GetContactTagsCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
          var contact = StoredContact.get(self.robot, self.message);
        	new ContactTagGroupList(contact.id).get()
          .then(function(tagGroups) {
            resolve({
              contact,
              tagGroups
            });
          })
	        .catch(function(error) {
        		logger.log("error", "error tag groups", error);
            resolve({error:true});
          });
        });
    }

    view() {
        return "getContactTags.txt";
    }
}
