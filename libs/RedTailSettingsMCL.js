const Promise = require("promise");
const request = require("request");
const logger = require("winston");
const RedTailApi = require("RedTailApi.js");

class RedTailSettingsMCL {
    static _url(id) {
        return `/settings/mcl`;
    }

    static get() {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url()}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    logger.log('error', 'error getting MCL', error);
                    reject(error);
                } else {
                    logger.log('info', 'RT MCL', body);
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailSettingsMCL;
