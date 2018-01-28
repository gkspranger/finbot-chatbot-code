const Promise = require("promise");
const Log = require("Log.js");
const RedTailUsersBasic = require("RedTailUsersBasic.js");
const User = require("User.js");

class UserListModel {
    constructor(options) {
        this.search = options.search;
    }

    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._data()
            .then(function(data) {
                var users = data.Users.filter(function(user) {
                  return self._returnUser(user);
                }).map(function(user) {
                	return new User(user).get();
                });
                Log.debug(`users: ${JSON.stringify(users)}`);
                resolve({
                    "users": users
                });
            })
            .catch(function(error) {
                Log.error(`getting user list model: ${error}`);
                reject({error:  true});
            });
        });
    }

    _returnUser(user) {
      var self = this;
      var doReturn = true;
      if (self.search) {
        if (self._includes(user, self.search)) {
          doReturn = true;
        } else {
          doReturn = false;
        }
      }

      return doReturn;
    }

    _data() {
        var self = this;
        return new Promise(function(resolve, reject) {
        	RedTailUsersBasic.get()
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                Log.error(error);
                reject(error);
            });
        });
    }

    _includes(user, search) {
        var self = this;
        var all = self._all(user);
        if (all.includes(search.toLowerCase())) {
            Log.debug(`found this user: ${all}`);
        	return true
        } else {
        	return false
        }
    }

    _all(data) {
    	var all = "";
        for (var key in data) {
        	var value = data[key];
        	if (typeof(value) != "boolean") {
        		all = `${all} ${data[key]}`;
        	}
        }
        all = all.toLowerCase();
        Log.debug(`all user data: ${all}`);
        return all;
    }
}

module.exports = UserListModel;
