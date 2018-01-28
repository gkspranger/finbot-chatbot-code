const Promise = require("promise");
const request = require("request");
const Log = require("Log.js");
const RedTailApi = require("RedTailApi.js");

class RedTailContactsSearch {
    static _url(query) {
        return `/contacts/search?value=${query}`;
    }

    static get(query) {
        var self = this;
        var options = RedTailApi.getOptions({
            "url": `${self._url(query)}`
        });

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    Log.error(error);
                    reject(error);
                } else {
                	Log.debug(body);
                    resolve(self._getIds(JSON.parse(body), query));
                }
            });
        });
    }

    static _getIds(data, query) {
        var ids = data.Contacts.map(function(contact) {
            return contact.ContactID;
        });
        if (ids.length == 0) {
            ids = [query];
        }
        return ids;
    }
}

module.exports = RedTailContactsSearch;
