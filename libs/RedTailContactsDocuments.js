const Promise = require("promise");
const request = require("request");
const logger = require("winston");
const RedTailApi = require("RedTailApi.js");

class RedTailContactsDocuments {
    static _url(id) {
        return `/contacts/${id}/documents`;
    }

    static get(id) {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url(id)}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                  logger.log('error', 'error getting RT docs', error);
                  reject(error);
                } else {
                  logger.log('info', `getting RT docs: ${body}`);
                  resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailContactsDocuments;
