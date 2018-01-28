// Description:
//   trys to get contact info IF it sees the pattern - "call <person>"

var Promise = require("promise");
const HubotCommand = require("HubotCommand.js");
const RedTailContactsSearch = require("RedTailContactsSearch.js");
const ContactModel = require("ContactModel.js");
const logger = require("winston");

module.exports = function(robot) {
    robot.hear(/(call|email)\s+([a-zA-Z]{2,})/i, { id: "contact.call" }, function(message) {
        var command = new CallContactCommand(robot, message);
        command.respond();
    });
};

class CallContactCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsSearch.get(self._contact())
            .then(function(ids) {
                Promise.all(ids.map(function(id) {
                    return new ContactModel(id).model();
                }))
                .then(function(models) {
                  resolve({
                    "contacts": models,
                    "call": self._call(),
                    "contact": self._contact()
                  });
                })
                .catch(function(error) {
                  logger.info(`no users return for search value: ${self._contact()}`);
                });
            });
        });
    }

    view() {
        return "callContact.txt";
    }

    _call() {
      var call = false;
      if (this.message.match[1].trim() == "call") {
        call = true;
      };
      logger.info(`call type: ${call}`);
      return call;
    }

    _contact() {
        return this.message.match[2];
    }
}
