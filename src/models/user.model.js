const { Sequelize, sequelize } = require("../config/db");
const tableName = "User";
class User extends Sequelize.Model {
  async isUsernameTaken() {
    const user = await User.findOne({
      where: {
        username: this.username,
      },
    });
    return !!user;
  }
  async isPasswordMatch(password) {
    const user = this;
    return password === user.password;
  }
}
User.init(
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    fk_roleId: {
      type: Sequelize.STRING,
      defaultValue: 1,
    },
  },
  { tableName, sequelize, timestamps: false }
);

module.exports = User;
