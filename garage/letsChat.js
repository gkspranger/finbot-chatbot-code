// Commands:
//   hubot wake up - show how conversational chat is something we are working towards

var Conversation = require('hubot-conversation');

module.exports = function (robot) {
  var switchBoard = new Conversation(robot);

  robot.respond(/wake up/, function (message) {
    var dialog = switchBoard.startDialog(message, 30000, "I'm done here .. Going back to sleep ..");
    message.reply('Whoa .. Hello !! Sorry about that -- I was taking a quick nap .. What can I help you with ??');

    jumpCommand(dialog);
    nonJumpCommand(dialog);
  });
}

var validateJumpValue = (dialog, times) => {
  dialog.addChoice(/correct|yes|yup/i, function (message) {
    message.reply('OK .. I am going to start jumping then:');
    jump(message, times)
  });

  dialog.addChoice(/incorrect|no|nope/i, function (message) {
    message.reply('How many times would you like for me to jump ??');
    message.reply("Sorry .. Let's start over -- this time please respond with basic digits (e.g. 3 times) ..");

    jumpValue(dialog);
    nonJumpValue(dialog);
  });
}

var jump = (message, times) => {
  for (i = 0; i < times; i++) {
    console.log('I AM IN IT');
    setTimeout(() => {
      message.send('jump');
    }, 1000);
  }
}

var jumpValue = (dialog) => {
  dialog.addChoice(/[^0-9]*([0-9]+)[^0-9]*/i, function (message) {
    var times = message.match[1];
    message.reply(`I think you said you want me to jump ${times} times .. Is that correct ??`);

    validateJumpValue(dialog, times);
  });
}

var nonJumpValue = (dialog) => {
  dialog.addChoice(/.*/i, function (message) {
    message.reply('How many times would you like for me to jump ??');
    message.reply("I'm Sorry, but I don't understand your response .. Let's start over -- this time please respond with basic digits .. e.g. 3 times");

    jumpValue(dialog);
    nonJumpValue(dialog);
  });
}

var jumpCommand = (dialog) => {
  dialog.addChoice(/jump/i, function (message) {
    message.reply('Sure thing !! How many times would you like for me to jump ??');

    jumpValue(dialog);
    nonJumpValue(dialog);
  });
}

var stopCommand = (dialog) => {
  dialog.addChoice(/stop/i, function (message) {
    message.reply('OK .. Stopping interaction now');
  });
}

var nonJumpCommand = (dialog) => {
  dialog.addChoice(/.*/i, function (message) {
    message.reply('What can I help you with ?? Or say "stop" and I will leave you alone');
    message.reply("I'm Sorry, but I don't understand what you're asking .. I can jump, but that's about it for now ..");

    jumpCommand(dialog);
    stopCommand(dialog);
    nonJumpCommand(dialog);
  });
}
