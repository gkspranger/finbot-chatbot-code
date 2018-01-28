// Commands:
//   hubot get contact important info - get all contact important information

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactImportantModel = require("ContactImportantModel.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+important\s+info\s*$/i, { id: "contact.get.important" }, function(message) {
        var command = new GetContactImportantInfoCommand(robot, message);
        command.respond();
    });
};

class GetContactImportantInfoCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var id = StoredContact.id(self.robot, self.message);
            var contact = new ContactImportantModel(id);
            contact.model()
            .then(function(model) {
                resolve(model);
            })
            .catch(function(error) {
                resolve({
                    "empty": true
                });
            });
        });
    }

    view() {
        return "getContactImportantInfo.txt";
    }
}
