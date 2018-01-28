const Promise = require("promise");
const request = require("request");
const logger = require("winston");
const RedTailApi = require("RedTailApi.js");

class RedTailContactsTagGroups {
    static _url(id) {
        return `/contacts/${id}/taggroups`;
    }

    static get(id) {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url(id)}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    logger.log('error', 'error getting RT tag groups', error);
                    reject(error);
                } else {
                    logger.log('info', `RT tag groups body: ${body}`);
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailContactsTagGroups;
