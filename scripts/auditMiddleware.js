// Description
//   logs all hubot interaction to the botlog channel

const Log = require("Log.js");

module.exports = function(robot) {
	var auditChannelId = process.env.SLACK_CHANNEL_botlog;

    robot.listenerMiddleware(function(context, next, done) {
        var channelId = context.response.message.user.room;
        var userName = context.response.message.user.name;
        var command = context.response.message.text;

    	var channelName = process.env[`SLACK_CHANNEL_${channelId}`];

        Log.debug(`message room: ${channelId} = ${channelName}`);
        Log.debug(`message issuer: ${userName}`);
        Log.debug(`message command: ${command}`);
        
        if (channelId != auditChannelId) {
        	robot.messageRoom("#botlog", `${channelName}: <${userName}> ${command}`);
        }

        next();
    });
};

