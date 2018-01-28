const Promise = require("promise");
const request = require("request");
const moment = require("moment");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");

class RedTailContactsActivities {
    static _url(id) {
    	var now = moment().add(10, 'years').format("MM-DD-YYYY");
        return `/contacts/${id}/activities?page=1&startdate=01-01-2000&enddate=${now}`;
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
                    Log.debug(`contact activity: ${body}`);
                    resolve(self._getIds(JSON.parse(body)));
                }
            });
        });
    }

    static _getIds(data) {
        var ids = data.Activities.map(function(activity) {
            return activity.RecID;
        });
        Log.debug(`activity ids: ${ids}`);
        return ids;
    }
}

module.exports = RedTailContactsActivities;
