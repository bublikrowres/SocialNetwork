const { User } = require('../models/databaseConnector');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const config = require('config');

class AdminCommand {
    constructor() {

    }

    async allUsers() {
        const allUsers = await User.findAll({ options: Object });
        if (!allUsers) {
            throw new Error('No users found in DB')
        }
        const usersArray = [];
        allUsers.forEach(element => {
            usersArray.push(element.dataValues)
        });
        return { numberOfUsers: allUsers.length, usersArray }
    }
}
module.exports = AdminCommand;