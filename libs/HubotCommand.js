const Promise = require("promise");
const handlebars = require("handlebars");
const fs = require("fs");
const Log = require("Log.js");
const footerSlogan = "Skynet is coming 2017";
const logo = "http://swilliamscdn.s3.amazonaws.com/redtail/redtail-logo.png";
const slackColor = "#b2292e";

class HubotCommand {
    constructor(robot, message) {
        this.robot = robot;
        this.message = message;
        this._loadTemplateHandlers();
    }

    model() {
        return new Promise(function(resolve, reject) {
            resolve({
                "output": "example"
            });
        });
    }

    _template(template) {
        return new Promise(function(resolve, reject) {
            fs.readFile(`./views/${template}`, "utf-8", function(error, source) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(source);
                }
            });
        });
    }

    _loadTemplateHandlers() {
        handlebars.registerHelper('escape', function(variable) {
            return variable.replace(/(["])/g, '\\\\$1');
        });

        handlebars.registerHelper('footer', function() {
            return footerSlogan;
        });

        handlebars.registerHelper('footerIcon', function() {
            return logo;
        });

        handlebars.registerHelper('slackColor', function() {
            return slackColor;
        });

        handlebars.registerHelper('escape', function(variable) {
            return variable.replace(/(["])/g, '\\\\$1');
        });

        handlebars.registerHelper('escape', function(variable) {
            return variable.replace(/(["])/g, '\\\\$1');
        });

        handlebars.registerHelper('listToJSON', function(items) {
            var outputString = "";

            items.forEach(function(item) {
                item = item.replace(/(["])/g, '\\$1');
                outputString = outputString + item + '\\n';
            });


            Log.debug('TEST');
            Log.debug(outputString);

            return outputString
        });
    }

    respond() {
        var self = this;
        self.model()
        .then(function(model) {
            self._template(self.view())
            .then(function(source) {
                var template = handlebars.compile(source);
                var output = template(model);

                try {
                    output = JSON.parse(output);
                } catch (exception) {}

                self.message.send(output);
            })
            .catch(function(error) {
                Log.error(`template(${template}) error: ${error}`);
            });
        })
        .catch(function(error) {
            Log.error(`model() error: ${error}`);
        });
    }

    view() {
        return "default.txt";
    }
}

module.exports = HubotCommand;
