// Commands:
//   hubot tell me about future changes

const Promise = require("promise");
const HubotCommand = require("HubotCommand.js");

module.exports = robot => {
  robot.respond(/tell.+change/i, { id: "tell.changes" }, message => {
    var command = new TellChangesCommand(robot, message);
    command.respond();
  });
};

class TellChangesCommand extends HubotCommand {
  model() {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  view() {
    return "tellChanges.txt";
  }
}
