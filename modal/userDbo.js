'use strict';
const sequelize = require('sequelize');
const db = require('../db')

const user = db.define('user', {
    user_id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fname: {
        type: sequelize.STRING,
        allowNull: true
    },
    lname: {
        type: sequelize.STRING,
        allowNull: true
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    is_active: {
        type: sequelize.INTEGER,
        allowNull: true
    },
    created_by: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: false,
    underscored: true,
    createdAt: 'created_dt',
    updatedAt: 'updated_dt',
    freezeTableName: true,
    tableName: 'USER',
    version: false
});

module.exports = {
    user: user
};
