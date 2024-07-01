const {DataTypes} = require('sequelize');
const sequelize = require('../../database/database');
const Categories = require('../categories/Categorie');

const Articles = sequelize.define('content-table', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Articles.belongsTo(Categories);
Categories.hasMany(Articles);

module.exports = Articles;