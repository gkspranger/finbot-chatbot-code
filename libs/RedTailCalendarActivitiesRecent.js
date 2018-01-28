const Promise = require("promise");
const request = require("request");
const moment = require("moment");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");

class RedTailCalendarActivitiesRecent {
    static _url(date) {
        date = date.replace(/\//g, "-");
        Log.debug(`new date: ${date}`);
        return `/calendar/activities/recent?startdate=${date}`;
    }

    static get(date) {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url(date)}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    Log.error(error);
                    reject(error);
                } else {
                    resolve(self._getIds(JSON.parse(body), date));
                }
            });
        });
    }

    static _getIds(data, date) {
        var ids = data.Activities.map(function(activity) {
            return activity.RecID;
        });
        if (ids.length == 0) {
            ids = [date];
        }
        Log.debug(`activity ids: ${ids}`);
        return ids;
    }
}

module.exports = RedTailCalendarActivitiesRecent;
