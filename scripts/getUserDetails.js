// Commands:
//   hubot get user details - get all user details for whoever is in the brain
//   hubot get loaded user - get all user details for whoever is in the brain

const HubotCommand = require("HubotCommand.js");
const StoredUser = require("StoredUser.js");
const Log = require("Log.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?(user\s+detail(s)?|loaded\s+user)\s*$/i, { id: "user.get.details" }, function(message) {
        var command = new GetUserDetailsCommand(robot, message);
        command.respond();
    });
};

class GetUserDetailsCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var user = StoredUser.get(self.robot, self.message);
            Log.debug(`user details: ${JSON.stringify(user)}`);
            resolve(user);
        });
    }

    view() {
        return "getUserDetails.txt";
    }
}
