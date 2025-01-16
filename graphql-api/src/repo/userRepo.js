const { Sequelize } = require('sequelize');
const User = require('../model/user');

class UserRepo {

    constructor() {
        this.isLogicalDelete = false;
    }

    async getUsers(name, email) {
        try {
            const whereConditions = { isActive: true };
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

    async deleteUser(id) {
        if (this.isLogicalDelete) {
            return await this.logicalDelete(id); 
        } else {
            return await this.physicalDelete(id);
        }
    }

    async logicalDelete(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.update({ isActive: false });
            return user;  
        } catch (err) {
            console.error('Error performing logical delete:', err);
            throw new Error('Failed to delete user');
        }
    }

    async physicalDelete(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }

            const result = await User.destroy({
                where: { id },
            });
            if (result === 0) {
                throw new Error('Unable to delte user');
            }

            return user;;
        } catch (err) {
            console.error('Error performing physical delete:', err);
            throw new Error('Failed to delete user');
        }
    }
}

module.exports = new UserRepo();