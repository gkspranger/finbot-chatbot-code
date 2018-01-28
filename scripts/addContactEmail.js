// Commands:
//   hubot add contact email - Add email address for Contact

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
var Conversation = require('hubot-conversation');
const AddedContactEmail = require("AddedContactEmail.js");
const logger = require("winston");

module.exports = function(robot) {
  var self = this;
  var conversation = new Conversation(robot);
  robot.respond(/add\s+contact\s+email\s*$/i, { id: "contact.add.email" }, (message) => {
    var dialog = conversation.startDialog(message, 30000, 'It appears you are busy, so I am ending our current conversation ..');
    var contact = StoredContact.get(robot, message);
    var options = {
      robot,
      contact,
      id: contact.id,
      email: {
        ClientID: contact.id,
        TypeID: 1
      }
    };
    email(message, dialog, options);
  });
};

var email = (message, dialog, options) => {
  message.reply("What's the email address you want to add ?? e.g. bob@redtail.com");
  stop(message, dialog);
  dialog.addChoice(/([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/i, function (newMessage) {
    options.email.Address = newMessage.match[1];
    preferred(newMessage, dialog, options);
  });
  dialog.addChoice(/.*/i, function (newMessage) {
    newMessage.reply("I'm sorry .. That doesn't seem like a real email address .. Let's try again ..");
    setTimeout(() => {
      email(message, dialog, options);
    }, 100);
  });
}

var preferred = (message, dialog, options) => {
  message.reply("Is this a preferred email address ?? e.g. yes, no");
  stop(message, dialog);
  dialog.addChoice(/yeah|yes|yup/i, function (newMessage) {
    options.email.Preferred = true;
    add(newMessage, options);
    dialog.emit('timeout', '');
  });
  dialog.addChoice(/nah|no|nope/i, function (newMessage) {
    options.email.Preferred = false;
    add(newMessage, options);
    dialog.emit('timeout', '');
  });
}

var stop = (message, dialog) => {
  dialog.addChoice(/stop/i, function (newMessage) {
    dialog.emit('timeout', '');
  });
}

var add = (message, options) => {
  message.reply("OK .. Adding the email address now ..");
  logger.info('raw email data:', options);
  new AddedContactEmail(options).model()
  .then((email) => {
    logger.info('added email data:', email);
  });
}
