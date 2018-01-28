// Commands:
//   hubot load contact <contact> - loads <contact> into the brain

var Promise = require("promise");
const HubotCommand = require("HubotCommand.js");
const RedTailContactsSearch = require("RedTailContactsSearch.js");
const StoredContact = require("StoredContact.js");
const ContactModel = require("ContactModel.js");

module.exports = function(robot) {
    robot.respond(/load\s+(me\s+)?contact\s+(.+)\s*$/i, { id: "contact.load" }, function(message) {
        var command = new LoadContactCommand(robot, message);
        command.respond();
    });
};

class LoadContactCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsSearch.get(self._contact())
            .then(function(ids) {
                Promise.all(ids.map(function(id) {
                    return new ContactModel(id).model();
                }))
                .then(function(models) {
                    if (ids.length == 1) StoredContact.store(self.robot, self.message, models[0]);
                    resolve({
                        "contacts": models,
                        "single": (models.length == 1 ? true : false),
                        "many": (models.length > 1 ? true : false)
                    });
                })
                .catch(function(error) {
                    console.log(error);
                    resolve({
                        "empty": true
                    });
                });
            });
        });
    }

    view() {
        return "loadContact.txt";
    }

    _contact() {
        return this.message.match[2];
    }
}
