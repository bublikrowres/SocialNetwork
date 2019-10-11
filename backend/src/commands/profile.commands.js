const { User } = require('../models/databaseConnector');

class ProfileCommand {
    constructor() {

    }
    async getUser(id) {
        return await User.findOne({ where: { id } })
    }

    async updateUser(editedUser) {
        try {
            await User.update(editedUser, { where: { id: editedUser.id }, })
            return { message: 'Post updated successfully' };
        } catch (e) {
            return { message: 'error' + e }
        }
    }
}

module.exports = ProfileCommand;