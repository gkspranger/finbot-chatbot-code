const Promise = require("promise");
const logger = require("winston");

class RelatedCommandList {
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
        var text = self.message.message.text;
        logger.log('info', 'text in', text);
        var filter = '';
        if (text.match(/.*contact.*/i)) {
        	filter = 'contact';
        } else if (text.match(/.*user.*/i)) {
        	filter = 'user';
        } else if (text.match(/.*recent.*/i)) {
        	filter = 'recent';
        } else if (text.match(/.*load.*/i)) {
        	filter = 'load';
        }
        return filter;
    }

    _filter(commands) {
        var self = this;
        var query = self._query();
        if (query) {
            commands = commands.filter(function(command) {
                return command.match(new RegExp(query, 'i'));
            });
        } else {
        	commands = [];
        }
        logger.log('info', 'filter commands', commands);
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

module.exports = RelatedCommandList;
