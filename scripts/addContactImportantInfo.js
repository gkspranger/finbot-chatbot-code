// Commands:
//   hubot add contact important info "<info>" - Add important information to a Contact

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const UpdatedContactImportantModel = require("UpdatedContactImportantModel.js");

module.exports = function(robot) {
    robot.respond(/add\s+contact\s+important\s+info\s+("|“)(.+)("|”)\s*$/i, { id: "contact.add.important" }, function(message) {
        var command = new AddContactImportantInfoCommand(robot, message);
        command.respond();
    });
};

class AddContactImportantInfoCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var contact = StoredContact.get(self.robot, self.message);
            var info = self._info();
            var updated = new UpdatedContactImportantModel(contact, info);
            updated.model()
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
        return "addContactImportantInfo.txt";
    }

    _info() {
        return this.message.match[2];
    }
}
