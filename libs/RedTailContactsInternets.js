const Promise = require("promise");
const request = require("request");
const logger = require("winston");
const RedTailApi = require("RedTailApi.js");

class RedTailContactsInternets {
    static _url(id) {
        return `/contacts/${id}/internets`;
    }

    static get(id) {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url(id)}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    logger.log('error', 'error getting RT internets', error);
                    reject(error);
                } else {
                    logger.log('info', 'RT internets body', body);
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    static put(options) {
        var self = this;
        var reqOptions = RedTailApi.putOptions({
            "url": `${self._url(options.id)}/0`,
            "body": JSON.stringify(options.email)
        });
        logger.info('rt put contact email options:', options.email);
        return new Promise(function (resolve, reject) {
            request(reqOptions, function (error, response, body) {
                if (error) {
                    logger.error(error);
                    reject(error);
                } else {
                    logger.info(`put email body: ${body}`);
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailContactsInternets;
