const Promise = require("promise");
const request = require("request");
const logger = require("winston");
const RedTailApi = require("RedTailApi.js");

class RedTailContactsPhones {
    static _url(id) {
        return `/contacts/${id}/phones`;
    }

    static get(id) {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url(id)}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    logger.log('error', 'error getting RT phones', error);
                    reject(error);
                } else {
                    logger.log('info', 'RT phones body', body);
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    static put(options) {
        var self = this;
        var options = RedTailApi.putOptions({
            "url": `${self._url(options.id)}/0`,
            "body": JSON.stringify(options.phone)
        });
        logger.info('rt put contact phone options:', options.phone);
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    logger.error(error);
                    reject(error);
                } else {
                    logger.info(`body: ${body}`);
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailContactsPhones;
