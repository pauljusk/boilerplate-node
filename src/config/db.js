const { Sequelize } = require('sequelize');
const path = require("path");
const appRoot = path.resolve("./");

const sequelize = new Sequelize({
  validateOnly: true,
  dialect: 'sqlite',
  storage: `${appRoot}/database.db`
});
const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;
