// Commands:
//   hubot get contacts - get all contacts

const HubotCommand = require("HubotCommand.js");
const ContactListModel = require("ContactListModel.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contacts\s*$/i, { id: "contact.get" }, function(message) {
        var command = new GetContactsCommand(robot, message);
        command.respond();
    });
};

class GetContactsCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var contacts = new ContactListModel();
            contacts.model()
            .then(function(model) {
                resolve(model);
            });
        });
    }
    
    view() {
        return "getContacts.txt";
    }
}
