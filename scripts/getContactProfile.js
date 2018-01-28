// Commands:
//   hubot get contact profile - get all profile shit whoever is in the brain

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactProfileModel = require("ContactProfileModel.js");
const ContactImportantModel = require("ContactImportantModel.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+profile\s*$/i, { id: "contact.get.profile" }, function(message) {
        var command = new GetContactProfileCommand(robot, message);
        command.respond();
    });
};

class GetContactProfileCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var contact = StoredContact.get(self.robot, self.message);
            Promise.all([
            	new ContactProfileModel(contact.id).model(),
            	new ContactImportantModel(contact.id).model()
            ])
            .then(function(results) {
            	resolve({
            		profile: results[0],
            		important: results[1]
            	});
            })
            .catch(function(error) {
            	console.log(error);
            });
        });
    }

    view() {
        return "getContactProfile.txt";
    }
}
