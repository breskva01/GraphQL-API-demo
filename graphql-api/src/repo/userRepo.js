const { Sequelize } = require('sequelize');
const User = require('../model/user');

const deleteType = process.env.DELETE_TYPE || 'logical';

class UserRepo {

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
        if (deleteType === 'logical') {
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
            throw err;
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
            throw err;
        }
    }
}

module.exports = new UserRepo();