const Sequelize = require("sequelize");

const dbConfig= {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "ag_assignmant",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// console.log(sequelize.define());
module.exports = db;
 

  