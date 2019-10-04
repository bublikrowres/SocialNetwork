const { DataTypes } = require('sequelize');

const Post = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    comments: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

module.exports = Post;