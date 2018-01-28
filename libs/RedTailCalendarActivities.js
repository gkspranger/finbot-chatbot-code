const Promise = require("promise");
const request = require("request");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");

class RedTailCalendarActivities {
    static _url(id) {
        return `/calendar/activities/${id}`;
    }

    static get(id) {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url(id)}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    Log.error(error);
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailCalendarActivities;
