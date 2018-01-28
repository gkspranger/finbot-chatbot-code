// Commands:
//   hubot get user activities - get all recent activities for a specific user

const HubotCommand = require("HubotCommand.js");
const ActivityModel = require("ActivityModel.js");
const StoredUser = require("StoredUser.js");
const RedTailCalendar = require("RedTailCalendar.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?user\s+activities\s*$/i, { id: "user.get.activity" }, function(message) {
        var command = new GetUserActivitiesCommand(robot, message);
        command.respond();
    });
};

class GetUserActivitiesCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
        	var id = StoredUser.get(self.robot, self.message).id;
        	RedTailCalendar.get(id)
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
        return "getActivities.txt";
    }
}
