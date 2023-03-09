const { Sequelize, sequelize } = require("../config/db");
const tableName = "role";

class Role extends Sequelize.Model {}
Role.init(
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
  },
  { timestamps: false, tableName, sequelize }
);

module.exports = Role;
