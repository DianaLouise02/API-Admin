const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('exemploapi', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;