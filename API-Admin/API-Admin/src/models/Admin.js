const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Admin = sequelize.define('admin', {
    
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
   
});

module.exports = Admin;