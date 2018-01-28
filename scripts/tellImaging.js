// Commands:
//   hubot tell me about imaging

const Promise = require("promise");
const HubotCommand = require("HubotCommand.js");

module.exports = robot => {
  robot.respond(/tell.+imaging/i, { id: "tell.imaging" }, message => {
    var command = new TellImagingCommand(robot, message);
    command.respond();
  });
};

class TellImagingCommand extends HubotCommand {
  model() {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  view() {
    return "tellImaging.txt";
  }
}
