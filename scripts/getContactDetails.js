// Commands:
//   hubot get contact details - get all contact details for whoever is in the brain
//   hubot get loaded contact - get all contact details for whoever is in the brain

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactModel = require("ContactModel.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?(contact\s+detail(s)?|loaded\s+contact)\s*$/i, { id: "contact.get.details" }, function(message) {
        var command = new GetContactDetailsCommand(robot, message);
        command.respond();
    });
};

class GetContactDetailsCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var id = StoredContact.id(self.robot, self.message);
            var contact = new ContactModel(id);
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
        return "getContactDetails.txt";
    }
}
