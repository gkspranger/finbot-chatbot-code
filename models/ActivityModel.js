const striptags = require("striptags");
const Promise = require("promise");
const moment = require("moment");
const logger = require("winston");
const MappedData = require("MappedData.js");
const RedTailCalendarActivities = require("RedTailCalendarActivities.js");

class ActivityModel {
    constructor(id) {
        this.id = id;
    }

    _map() {
        return {
            "Category": "category",
            "ClientName": "contact",
            "EndDate": "end",
            "Location": "location",
            "Note": "note",
            "RecAddUser": "addedById",
            "RecAddUserName": "addedByName",
            "StartDate": "start",
            "Subject": "subject",
            "Type": "type"
        };
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                logger.log('info', 'calendar activity data:', data);
                var activity = MappedData.map(self._map(), data);
                activity.start = self._start(data);
                activity.end = self._end(data);
                activity.note = self._note(data);
                logger.log('info', 'calendar activity model:', activity);
                resolve(activity);
            })
            .catch(function(error) {
                logger.log('error', `getting calendar activity model: ${error}`);
                reject(error);
            });
        });
    }
    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
            RedTailCalendarActivities.get(self.id)
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    }

    _start(data) {
        return moment(data.StartDate).format("MM/DD/YYYY @ hh:mma");
    }

    _end(data) {
    	return moment(data.EndDate).format("MM/DD/YYYY");
    }

    _note(data) {
      var self = this;
    	var clean = striptags(data.Note);
      return clean;
    }
}

module.exports = ActivityModel;
