const Log = require("Log.js");
const MyString = require("MyString.js");

class RedTailApi {
    static _url() {
        return process.env.REDTAIL_URL;
    }

    static docsUrl() {
        return process.env.REDTAIL_DOCS_URL;
    }

    static _key() {
        return process.env.REDTAIL_KEY;
    }

    static _username() {
        return process.env.REDTAIL_USERNAME;
    }

    static _password() {
        return process.env.REDTAIL_PASSWORD;
    }

    static _authorizationHeader() {
        var self = this;
        var credentials = `${self._key()}:${self._username()}:${self._password()}`;
        var formattedCredentials = `Basic ${MyString.toBase64(credentials)}`;
        Log.debug(`auth header = [${formattedCredentials}]`);
        return formattedCredentials;
    }

    static getOptions(options) {
        var self = this;
        return {
            "url": `${self._url()}${options.url}`,
            "headers": {
                "Authorization": `${self._authorizationHeader()}`,
                "Accept": "application/json",
                "Accept-Charset": "utf-8",
                "User-Agent": "Logistful/1.0"
            },
            "encoding": "utf-8",
        };
    }

    static putOptions(options) {
        var self = this;
        return {
            "url": `${self._url()}${options.url}`,
            "method": "PUT",
            "headers": {
                "Authorization": `${self._authorizationHeader()}`,
                "Accept": "application/json",
                "Content-Type": "text/json",
                "Accept-Charset": "utf-8",
                "User-Agent": "Logistful/1.0"
            },
            "encoding": "utf-8",
            "body": options.body
        };
    }
}

module.exports = RedTailApi;
