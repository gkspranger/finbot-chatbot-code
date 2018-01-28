// Commands:
//   hubot get users - get all in the system

const HubotCommand = require("HubotCommand.js");
const UserListModel = require("UserListModel.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?users\s*$/i, { id: "user.get" }, function(message) {
        var command = new GetUsersCommand(robot, message);
        command.respond();
    });
};

class GetUsersCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var users = new UserListModel({});
            users.model()
            .then(function(model) {
            	resolve(model);
            });
        });
    }
    
    view() {
        return "getUsers.txt";
    }
}
