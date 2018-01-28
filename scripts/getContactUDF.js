// Commands:
//   hubot get contact udf - get all contact user defined fields

const HubotCommand = require("HubotCommand.js");
const StoredContact = require("StoredContact.js");
const ContactUDFList = require("ContactUDFList.js");

module.exports = function(robot) {
    robot.respond(/get\s+(me\s+)?contact\s+udf\s*$/i, { id: "contact.get.udf" }, function(message) {
        var command = new GetContactUDFCommand(robot, message);
        command.respond();
    });
};

class GetContactUDFCommand extends HubotCommand {
    model() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var id = StoredContact.id(self.robot, self.message);
            var udfs = new ContactUDFList(id);
            udfs.model()
            .then(function(model) {
                resolve(model);
            })
            .catch(function(error) {
                resolve({
                    "empty": true
                });
            });
        });
    }

    view() {
        return "getContactUDF.txt";
    }
}
