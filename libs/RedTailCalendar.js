const Promise = require("promise");
const request = require("request");
const moment = require("moment");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");

class RedTailCalendar {
    static _url(id) {
    	var now = moment().format("MM-DD-YYYY");
    	var url = `/calendar/${id}/basic?startdate=01-01-2000&enddate=${now}`;
    	Log.debug(`getting URL: ${url}`);
    	return url;
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
                    Log.debug(`calendar activity for [${id}]: ${body}`);
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

module.exports = RedTailCalendar;
