'use strict';

const db = require('../db');
const employeeDbModal = require('../modal/employeeDbo').employee;

// const promise = require('bluebird');

const employee = new function () {
    this.insertEmployee = function (inputJson) {
        inputJson.updated_by = 1;
        inputJson.created_by = 1;
        return employeeDbModal.create(inputJson)
        .then((employeeData) => {
            return employeeData.get();
            
        })         
    }    
}
module.exports = employee
