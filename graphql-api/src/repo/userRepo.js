const { Sequelize } = require('sequelize');
const User = require('../model/user');

class UserRepo {

    async getUsers(name, email) {
        try {
            const whereConditions = {};
            if (name) {
                whereConditions.name = {
                    [Sequelize.Op.like]: `%${name}%`
                };
            }
            if (email) {
                whereConditions.email = {
                    [Sequelize.Op.like]: `%${email}%`
                };
            }

            const users = await User.findAll({
                where: whereConditions
            });
            return users;
        }
        catch (err) {
            console.error('Error getting users:', err);
            throw err;
        }
    }

    async addUser(name, email) {
        try {
            const newUser = await User.create({ name, email });
            return newUser;
        }
        catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                console.error('Duplicate email error:', err);
                throw new Error('Email already exists');
            }
            console.error('Error adding user:', err);
            throw err;
        }
    }
}

module.exports = new UserRepo();