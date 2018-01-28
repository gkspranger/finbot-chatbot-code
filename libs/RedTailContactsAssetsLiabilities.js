const Promise = require("promise");
const request = require("request");
const RedTailApi = require("RedTailApi.js");
const logger = require("winston");

class RedTailContactsAssetsLiabilities {
    static _url(id) {
        return `/contacts/${id}/assets-liabilities`;
    }

    static get(id) {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url(id)}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                	logger.log("error", "getting RedTailContactsAssetsLiabilities", error);
                    reject(error);
                } else {
                	logger.log("info", "getting RedTailContactsAssetsLiabilities", body);
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailContactsAssetsLiabilities;
