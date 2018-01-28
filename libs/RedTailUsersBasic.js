const Promise = require("promise");
const request = require("request");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");

class RedTailUsersBasic {
    static _url() {
        return `/users/basicv2`;
    }

    static get() {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url()}`
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

module.exports = RedTailUsersBasic;
