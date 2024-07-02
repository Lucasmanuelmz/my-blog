const {DataTypes} = require('sequelize');
const sequelize = require('../../database/database');

const Categories = sequelize.define(
    'categorie', 
    {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Categories;