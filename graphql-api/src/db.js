const {Sequelize, DataTypes} = require('sequelize');

const  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/database.sqlite',
});

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Unable to connect to the database:', err));

module.exports = sequelize;