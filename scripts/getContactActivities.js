// Commands:
//   hubot get contact open activities - get all open activities for a specific contact

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const RedTailContactsActivities = require("RedTailContactsActivities.js");
const ActivityModel = require("ActivityModel.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+open\s+activities\s*$/i, { id: "contact.get.activity" }, function(message) {
        var command = new GetContactActivitiesCommand(robot, message);
        command.respond();
    });
};

class GetContactActivitiesCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
        	var id = StoredContact.id(self.robot, self.message);
        	RedTailContactsActivities.get(id)
            .then(function(ids) {
                Promise.all(ids.map(function(id) {
                    return new ActivityModel(id).model();
                }))
                .then(function(models) {
                    resolve({
                        "activities": models
                    });
                });
            });
        });
    }

    view() {
        return "getContactActivities.txt";
    }
}
