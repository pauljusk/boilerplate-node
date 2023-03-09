const { Sequelize, sequelize } = require("../config/db");
const tableName = "Todo";

class Todo extends Sequelize.Model {}
Todo.init(
  {
    value: {
      type: Sequelize.STRING,
    },
    isDone: {
      type: Sequelize.INTEGER,
    },
    fk_userId: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName, sequelize, timestamps: false }
);

module.exports = Todo;
