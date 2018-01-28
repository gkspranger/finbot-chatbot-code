// Commands:
//   hubot add contact phone - Add phone number for Contact

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
var Conversation = require('hubot-conversation');
const AddedContactPhone = require("AddedContactPhone.js");
const logger = require("winston");

module.exports = function(robot) {
  var self = this;
  var conversation = new Conversation(robot);
  robot.respond(/add\s+contact\s+phone\s*$/i, { id: "contact.add.phone" }, (message) => {
    var dialog = conversation.startDialog(message, 30000, 'It appears you are busy, so I am ending our current conversation ..');
    var contact = StoredContact.get(robot, message);
    var options = {
      robot,
      contact,
      id: contact.id,
      phone: {
        ClientID: contact.id
      }
    };
    phone(message, dialog, options);
  });
};

var phone = (message, dialog, options) => {
  message.reply("What's the phone number you want to add ?? e.g. 2125671234");
  stop(message, dialog);
  dialog.addChoice(/([0-9]{10})/i, function (newMessage) {
    options.phone.Number = newMessage.match[1];
    type(newMessage, dialog, options);
  });
  dialog.addChoice(/.*/i, function (newMessage) {
    newMessage.reply("I'm sorry .. That doesn't seem like a real phone number .. Let's try again ..");
    setTimeout(() => {
      phone(message, dialog, options);
    }, 100);
  });
}

var type = (message, dialog, options) => {
  message.reply("What type of phone number is this ?? e.g. work, cellular, home, other");
  stop(message, dialog);
  dialog.addChoice(/(cellular|home|other|work)/i, function (newMessage) {
    var type = newMessage.match[1];
    options.phone.TypeID = typeId(type);
    preferred(newMessage, dialog, options);
  });
  dialog.addChoice(/.*/i, function (newMessage) {
    newMessage.reply("I'm sorry .. I don't recognize that phone type .. Let's try again ..");
    setTimeout(() => {
      type(message, dialog, options);
    }, 100);
  });
}

var preferred = (message, dialog, options) => {
  message.reply("Is this a preferred phone number ?? e.g. yes, no");
  stop(message, dialog);
  dialog.addChoice(/yeah|yes|yup/i, function (newMessage) {
    options.phone.Preferred = true;
    add(newMessage, options);
    dialog.emit('timeout', '');
  });
  dialog.addChoice(/nah|no|nope/i, function (newMessage) {
    options.phone.Preferred = false;
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
  message.reply("OK .. Adding the phone number now ..");
  new AddedContactPhone(options).model()
  .then((phone) => {
    logger.info('added phone data:', phone);
  });
}

var typeId = (type) => {
  var id = 'OT';
  switch (type.toLowerCase()) {
    case 'work':
      id = 'WK';
      break;
    case 'cellular':
      id = 'CL';
      break;
    case 'other':
      id = 'OT';
      break;
    case 'home':
      id = 'HM'
      break;
  }
  return id;
}
