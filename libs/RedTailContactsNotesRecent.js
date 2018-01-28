const Promise = require("promise");
const request = require("request");
const moment = require("moment");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");

class RedTailContactsNotesRecent {
    static _url(date) {
        date = date.replace(/\//g, "-");
        Log.debug(`new date: ${date}`);
        return `/contacts/notes/recent?startdate=${date}`;
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
                    Log.debug(body);
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailContactsNotesRecent;
