const Promise = require("promise");
const Log = require("Log.js");
const ContactNote = require("ContactNote.js");
const RedTailContactsNotesRecent = require("RedTailContactsNotesRecent.js");
const RedTailContactsNotes = require("RedTailContactsNotes.js");

class ContactNoteList {
    constructor(options) {
        this.id = options.id;
        this.date = options.date;
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                Log.debug(`contact notes list data: ${JSON.stringify(data)}`);
                var notes = data.Notes.map(function(note) {
                    return new ContactNote(note).model();
                });
                Log.debug(`contact notes model: ${JSON.stringify(notes)}`);
                resolve({
                    "notes": notes
                });
            })
            .catch(function(error) {
                Log.error(`getting contact notes: ${error}`);
                reject(error);
            });
        });
    }

    _data() {
        var self = this;
    	if (self.id) {
    		return self._byId();
    	} else if (self.date) {
    		return self._byDate();
    	} else {
            return new Promise(function(resolve, reject) {
            	resolve("{}");
            });
    	}
    }

    _byId() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailContactsNotes.get(self.id)
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }

    _byDate() {
        var self = this;
        return new Promise(function(resolve, reject) {
        	RedTailContactsNotesRecent.get(self.date)
            .then(function(data) {
            	Log.debug(`getting contact notes by date: ${data}`);
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }
}

module.exports = ContactNoteList;
