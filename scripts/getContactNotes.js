// Commands:
//   hubot get contact notes - get all contact notes

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactNoteList = require("ContactNoteList.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+notes\s*$/i, { id: "contact.get.note" }, function(message) {
        var command = new GetContactNotesCommand(robot, message);
        command.respond();
    });
};

class GetContactNotesCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var id = StoredContact.id(self.robot, self.message);
            var notes = new ContactNoteList({"id": id});
            notes.model()
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
        return "getContactNotes.txt";
    }
}
