const Promise = require("promise");
const logger = require("winston");
const RedTailContactsDocuments = require("RedTailContactsDocuments.js");
const ContactDocument = require("ContactDocument.js");

class ContactDocumentList {
  constructor(id) {
      this.id = id;
  }

    get() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(docs) {
              Promise.all(docs.map(function(doc) {
                  return new ContactDocument(doc).get();
              }))
              .then(function(documents) {
                resolve(documents);
              })
              .catch(function(error) {
                logger.log('error', `getting docs: ${error}`);
                reject({error: true});
              });
            })
            .catch(function(error) {
              logger.log('error', `getting docs: ${error}`);
              reject({error: true});
            });
        });
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsDocuments.get(self.id)
            .then(function(data) {
              logger.log('info', 'contacts documents data:', data);
              resolve(data);
            })
            .catch(function(error) {
              logger.log('error', `gettign contact docs: ${error}`);
              reject({error: true});
            });
        });
    }
}

module.exports = ContactDocumentList;
