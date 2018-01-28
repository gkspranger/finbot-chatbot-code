const Promise = require("promise");
const request = require("request");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");
const MyString = require("MyString.js");

class RedTailContacts {
    static _url() {
        return `/contacts`;
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
                    Log.debug(JSON.stringify(response));
                    Log.debug(body);
                    console.log(body);
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = RedTailContacts
