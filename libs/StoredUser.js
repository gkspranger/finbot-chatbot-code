const Log = require("Log.js");
const MyString = require("MyString.js");
const SlackUser = require("SlackUser.js");

class StoredUser {
    static _storedUserKey(id) {
        return MyString.toBase64(`stored_user_${id}`);
    }

    static get(robot, message) {
        var self = this;
        var user = new SlackUser(message);
        var key = self._storedUserKey(user.id());
        return JSON.parse(robot.brain.get(key));
    }

    static store(robot, message, user) {
        var self = this;
        var slackUser = new SlackUser(message);
        var key = self._storedUserKey(slackUser.id());
        Log.debug(`storing user into brain: ${JSON.stringify(user)}`);
        robot.brain.set(key, JSON.stringify(user));
    }
}

module.exports = StoredUser;
