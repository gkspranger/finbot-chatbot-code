const Promise = require("promise");
const request = require("request");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");

class RedTailContactsImportantInfo {
    static _url(id) {
        return `/contacts/${id}/importantinfo`;
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

    static put(id, info) {
        var self = this;
        var options = RedTailApi.putOptions({
            "url": `${self._url(id)}`,
            "body": JSON.stringify(info)
        });
        Log.debug(`rt put contact import options: ${JSON.stringify(options)}`);
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    Log.error(error);
                    reject(error);
                } else {
                    Log.debug(`body: ${body}`);
                    resolve(body);
                }
            });
        });
    }
}

module.exports = RedTailContactsImportantInfo;
