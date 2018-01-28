const striptags = require("striptags");
const he = require("he");
const moment = require("moment");
const logger = require("winston");
const MappedData = require("MappedData.js");

class ContactNote {
    constructor(note) {
        this.note = note;
    }

    _map() {
        return {
            "Category": "category",
            "ContactName": "name",
            "Note": "note",
            "RecAddUserName": "addedBy"
        };
    }

    model() {
        var self = this;
        logger.log('debug', 'contact note', self.note);
        var note = MappedData.map(self._map(), self.note);
        note.note = self._clean(note);
        note.added = self._added(self.note);
        return note;
    }

    _added(data) {
        return moment(data.RecAdd).format("MM/DD/YYYY");
    }

    _workflowType(data) {
      var regex = /.*Workflow:(.+)OWNER.+/g;
      var match = regex.exec(data);
      logger.log('info', `workflow type: ${match[1]}`);
      return match[1].trim();
    }

    _workflowCompleted(data) {
      var regex = /.+COMPLETION DATE(.+)COMPLETED BY.+/g;
      var match = regex.exec(data);
      logger.log('info', `workflow completed: ${match[1]}`);
      return match[1].trim();
    }

    _workflowCompletedBy(data) {
      var regex = /.+COMPLETED BY(.+)/g;
      var match = regex.exec(data);
      logger.log('info', `workflow completed by: ${match[1]}`);
      return match[1].trim();
    }

    _cleanWorkflow(data) {
      var self = this;
      var type = self._workflowType(data);
      var completed = self._workflowCompleted(data);
      var completedBy = self._workflowCompletedBy(data);
      return `Workflow: ${type}    Completed On: ${completed}    Completed By: ${completedBy}`;
    }

    _clean(note) {
      var self = this;
    	var clean = striptags(note.note);
    	clean = he.decode(clean);
      clean = clean.replace(/\n/g, "");
      if (clean.match(/Workflow:/)) {
        logger.log('info', 'is workflow');
        clean = self._cleanWorkflow(clean);
      }
    	return clean;
    }
}

module.exports = ContactNote;
