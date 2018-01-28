const Log = require("Log.js");
const MyString = require("MyString.js");

class MappedData {
    static map(map, data) {
        var mappedData = new Object();
        for (var key in map) {
            var name = map[key];
            var value = String(data[key]);
            if (MyString.empty(value)) {
                mappedData[name] = "";
            } else {
            	Log.debug(`${name}=${value}`);
                mappedData[name] = value;
            }
        }
        return mappedData;
    }
}

module.exports = MappedData
