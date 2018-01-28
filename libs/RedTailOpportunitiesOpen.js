const Promise = require("promise");
const request = require("request");
const logger = require("winston");
const RedTailApi = require("RedTailApi.js");

class RedTailOpportunitiesOpen {
    static _url() {
        return '/opportunities/open?page=1';
    }

    static get() {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url()}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    logger.log('error', `getting open ops ${error}`);
                    reject(error);
                } else {
                  logger.log('info', `open ops: ${body}`);
                  resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailOpportunitiesOpen;
