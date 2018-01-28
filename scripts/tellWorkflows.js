// Commands:
//   hubot tell me about workflows

const Promise = require("promise");
const HubotCommand = require("HubotCommand.js");

module.exports = robot => {
  robot.respond(/tell.+workflow/i, { id: "tell.workflows" }, message => {
    var command = new TellWorkflowsCommand(robot, message);
    command.respond();
  });
};

class TellWorkflowsCommand extends HubotCommand {
  model() {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  view() {
    return "tellWorkflows.txt";
  }
}
