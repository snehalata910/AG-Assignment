'use strict';

const db = require('../db');
const userDbModal = require('../modal/userDbo').user;
const employeeController = require('./employeeController')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');


// const promise = require('bluebird');
var salt = 10;
const SELECT_USER_LIST = "  SELECT U.USER_ID, U.FNAME, U.LNAME, U.EMAIL, U.IS_ACTIVE, E.EMPLOYEE_CODE, E.ORGANIZATION_NAME "+
" FROM USER U " +
" INNER JOIN EMPLOYEE E ON E.USER_ID = U.USER_ID " +
" WHERE U.IS_ACTIVE = 1 ";

var result = {
    status: "fail",
    message: "not found",
    data: {},
    token:""
}

const user = new function () {
    this.userLogin = function (inputJson) {
        return userDbModal
          .findOne({
            where: {
              email: inputJson.email
            },
          })
          .then(async (userData) => {                         
            if (userData){
                var data = userData.get();
                var userResult = {...result};
                var isSame = await bcrypt.compare(inputJson.password, data.password);
                console.log(isSame);
                if(isSame){
                    var token = await jwt.sign({ id: data.user_id }, config.secretKey, {
                        expiresIn: 86400 // expires in 24 hours
                      });
                    userResult.status = 'success';
                    userResult.message = 'user data';
                    userResult.data = data;
                    userResult.token = token;
                } else{
                    userResult.status = 'fail';
                    userResult.message = 'invalid password';
                    userResult.data = {};
                } 
                return userResult;         
            }   
            return result;            
          });
      }

    this.registerUser = async function (inputJson) {
        inputJson.updated_by = 1;
        inputJson.created_by = 1;
        inputJson.password = await bcrypt.hash(inputJson.password, salt);
        return userDbModal.create(inputJson)
        .then((userData) => {
            let user = userData.get();
            inputJson.user_id = user.user_id; 
            return employeeController.insertEmployee(inputJson);            
        })
        .then(async (employeeData) =>{            
            var data = await this.getUserDetails(employeeData);
            var userResult = {...result};           
            if (data){
                userResult.status = "success";        
                userResult.data = data;
                userResult.message = "user data";
                return userResult;
            }   
            return result;
        });        
    }

    this.getUserDetails = function (inputJson) {
        let userQuery = SELECT_USER_LIST;
        let queryReplacement = inputJson;
        if(inputJson.user_id){
            userQuery+= " AND U.USER_ID = :user_id ";
        }
        if(inputJson.searchStr){
            userQuery+= " AND (U.FNAME LIKE CONCAT('%', :searchStr, '%') OR U.LNAME LIKE CONCAT('%', :searchStr, '%') OR E.EMPLOYEE_CODE LIKE CONCAT('%', :searchStr, '%')) ";
        }
        if(inputJson.orderByField){
            userQuery+= " ORDER BY :orderByField :orderByValue ";
        }
        if(inputJson.page_size){
            let pageOffset = (inputJson.page_number - 1) * inputJson.page_size;
            userQuery += " LIMIT " + pageOffset + ", " + inputJson.page_size;
        }
        

        let userFull = {}

        return db.query(userQuery, {
            replacements: queryReplacement,
            type: db.QueryTypes.SELECT
        })
        .then((users) => {
            userFull = createUserList(users);
            var userResult = {...result};           
            if (userFull){
                userResult.status = "success";        
                userResult.data = userFull;
                userResult.message = "user data";
                return userResult;
            }  
            return result;
        })       
    }
    
    function createUserList(users){
        let userArray = [];
        let userDetail = {}
        for (let i = 0; i < users.length; i++) {
            userDetail = {
                user_id: users[i].USER_ID,
                fname: users[i].FNAME,                
                lname: users[i].LNAME,
                email: users[i].EMAIL,
                employee_code: users[i].EMPLOYEE_CODE,
                organization_name: users[i].ORGANIZATION_NAME,
            }
            userArray.push(userDetail);
        }
        return userArray
    }
}
module.exports = user
