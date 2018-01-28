const Promise = require("promise");
const Log = require("Log.js");

class CommandListModel {
    constructor(robot, message) {
        this.robot = robot;
        this.message = message;
    }
    
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var commands = self._rename(self.robot.helpCommands());
            commands = self._filter(commands);
            resolve({
                "commands": commands.sort(),
                "query": self._query()
            });
        });
    }
    
    _query() {
        var self = this;
        return self.message.match[1];
    }

    _filter(commands) {
        var self = this;
        if (self._query()) {
            commands = commands.filter(function(command) {
                return command.match(new RegExp(self._query(), 'i'));
            });
        }
        Log.debug(commands);
        return commands;
    }

    _rename(commands) {
        var self = this;
        commands = commands.map(function(command) {
            return command.replace(/hubot/gi, self.robot.name);
        });
        return commands;
    }
}

module.exports = CommandListModel;
