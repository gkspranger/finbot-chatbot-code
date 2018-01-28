const moment = require("moment");

class Log {
    static _timestamp() {
        return moment().format("YYYY-DD-MM HH:mm:ss");
    }

    static _log(level, statement) {
        var self = this;
        console.log(`[${self._timestamp()}] ${level} ${statement}`);
    }

    static debug(statement) {
        var self = this;
        self._log("DEBUG", statement);
    }

    static info(statement) {
        var self = this;
        self._log("INFO", statement);
    }

    static warn(statement) {
        var self = this;
        self._log("WARN", statement);
    }

    static error(statement) {
        var self = this;
        self._log("ERROR", statement);
    }
}

module.exports = Log;
