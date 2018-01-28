// Commands:
//   hubot get recent activities from <MM/DD/YYYY> - get all recent activities from a date to now

const HubotCommand = require("HubotCommand.js");
const RedTailCalendarActivitiesRecent = require("RedTailCalendarActivitiesRecent.js");
const ActivityModel = require("ActivityModel.js");

module.exports = function(robot) {
    robot.respond(/get\s+recent\s+activities\s+from\s+([0-9]{2}\/[0-9]{2}\/[0-9]{4})\s*/i, { id: "activity.recent" }, function(message) {
        var command = new GetRecentActivitiesCommand(robot, message);
        command.respond();
    });
};

class GetRecentActivitiesCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailCalendarActivitiesRecent.get(self._date())
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

    _date() {
        return this.message.match[1];
    }
}
