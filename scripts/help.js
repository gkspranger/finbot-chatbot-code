// Commands:
//   hubot help - gets all hubot commands
//   hubot help <filter> - get all hubot commands that match your <filter>

const HubotCommand = require("HubotCommand.js");
const CommandListModel = require("CommandListModel.js");

module.exports = function(robot) {
    robot.respond(/help(?:\s+(.*))?$/i, { id: "help" }, function(message) {
        var command = new HelpCommand(robot, message);
        command.respond();
    });
};

class HelpCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var commands = new CommandListModel(self.robot, self.message);
            commands.model()
            .then(function(model) {
                resolve(model);
            });
        });
    }
    
    view() {
        return "help.txt";
    }
}
