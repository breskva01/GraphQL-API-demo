const User = require('../model/user');

class UserRepo {

    async getUsers() {
        try {
            const users = await User.findAll();
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