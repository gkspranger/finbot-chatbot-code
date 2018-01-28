class SlackUser {
    constructor(message) {
        this.user = message.message.user;
    }
    
    id() {
        var self = this;
        return self.user.id;
    }
}

module.exports = SlackUser;
