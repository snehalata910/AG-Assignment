'use strict';
const sequelize = require('sequelize');
const db = require('../db');

const employee = db.define('employee', {
    employee_id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    organization_name: {        
        type: sequelize.STRING,
        allowNull: true
    },
    employee_code: {
        type: sequelize.INTEGER,
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
    tableName: 'EMPLOYEE',
    version: false
});

module.exports = {
    employee: employee
};
