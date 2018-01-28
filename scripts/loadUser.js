// Commands:
//   hubot load user <user> - loads <user> into the brain

var Promise = require("promise");
const HubotCommand = require("HubotCommand.js");
const UserListModel = require("UserListModel.js");
const StoredUser = require("StoredUser.js");

module.exports = function(robot) {
    robot.respond(/load\s+(me\s+)?user\s+(.+)\s*$/i, { id: "user.load" }, function(message) {
        var command = new LoadUserCommand(robot, message);
        command.respond();
    });
};

class LoadUserCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var users = new UserListModel({"search": self._user()});
            users.model()
            .then(function(user) {
            	if (user.users.length == 1) StoredUser.store(self.robot, self.message, user.users[0]);
            	user.empty = (user.users.length == 0 ? true : false);
            	user.single = (user.users.length == 1 ? true : false);
            	user.many = (user.users.length > 1 ? true : false);
                resolve(user);
            });
        });
    }

    view() {
        return "loadUser.txt";
    }

    _user() {
        return this.message.match[2];
    }
}
