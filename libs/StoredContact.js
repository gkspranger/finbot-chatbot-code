const Log = require("Log.js");
const MyString = require("MyString.js");
const SlackUser = require("SlackUser.js")

class StoredContact {
    static _storedContactIdKey(id) {
        return MyString.toBase64(`stored_contact_id_${id}`);
    }

    static _storedContactKey(id) {
        return MyString.toBase64(`stored_contact_${id}`);
    }

    static id(robot, message) {
        var self = this;
        var user = new SlackUser(message);
        var key = self._storedContactIdKey(user.id());
        return robot.brain.get(key);
    }

    static get(robot, message) {
        var self = this;
        var user = new SlackUser(message);
        var key = self._storedContactKey(user.id());
        return JSON.parse(robot.brain.get(key));
    }

    static store(robot, message, contact) {
        var self = this;
        var user = new SlackUser(message);
        var idKey = self._storedContactIdKey(user.id());
        var key = self._storedContactKey(user.id());
        Log.debug(`setting brain: ${key} = ${contact.id}`);
        robot.brain.set(idKey, contact.id);
        robot.brain.set(key, JSON.stringify(contact));
    }
}

module.exports = StoredContact;
