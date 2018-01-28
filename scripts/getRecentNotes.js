// Commands:
//   hubot get recent notes from <MM/DD/YYYY> - get all recent notes from a date to now

const HubotCommand = require("HubotCommand.js");
const ContactNoteList = require("ContactNoteList.js");

module.exports = function(robot) {
    robot.respond(/get\s+recent\s+notes\s+from\s+([0-9]{2}\/[0-9]{2}\/[0-9]{4})\s*/i, { id: "notes.recent" }, function(message) {
        var command = new GetRecentNotesCommand(robot, message);
        command.respond();
    });
};

class GetRecentNotesCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var notes = new ContactNoteList({"date": self._date()});
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

    _date() {
        return this.message.match[1];
    }
}
