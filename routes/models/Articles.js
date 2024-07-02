const {DataTypes} = require('sequelize');
const sequelize = require('../../database/database');
const Categories = require('./Categorie');

const Articles = sequelize.define('article', {
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
    categorieId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Categories.hasMany(Articles);
Articles.belongsTo(Categories);


module.exports = Articles;