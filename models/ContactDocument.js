const logger = require("winston");
const MappedData = require("MappedData.js");
const UserListModel = require("UserListModel.js");
const CategoryList = require("CategoryList.js");
const RedTailApi = require("RedTailApi.js");
const moment = require("moment");

class ContactDocument {
    constructor(document) {
        this.document = document;
    }

    _map() {
        return {
          "Category": "category",
          "CategoryID": "categoryId",
          "Description": "description",
          "FileExtension": "extension",
          "FileName": "name",
          "RecAddUser": "userId",
          "RecID": "id",
          "Title": "title"
        };
    }

    get() {
      var self = this;
      return new Promise(function(resolve, reject) {
        logger.log('info', 'doc data', self.document);
        var document = MappedData.map(self._map(), self.document);
        document.added = self._added(self.document);
        document.downloadUrl = `${RedTailApi.docsUrl()}/${document.id}/download`
        Promise.all([
          new UserListModel({"search": document.userId}).model(),
          new CategoryList().get({"id": document.categoryId})
        ])
        .then(function(results) {
          document.user = results[0].users[0];
          document.category = results[1][0].name;
          logger.log('info', 'doc model', document);
          resolve(document);
        });
      });
    }

    _added(data) {
        return moment(data.RecAdd).format("MM/DD/YYYY");
    }
}

module.exports = ContactDocument;
