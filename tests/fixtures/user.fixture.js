const { faker } = require("@faker-js/faker");
const { User } = require("../../src/models");
const tokenService = require("../../src/services/token.service");

const password = "password1";

const basicUser = {
  username: faker.internet.userName(),
  password,
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  fk_roleId: 1,
};

const managerUser = {
  username: faker.internet.userName(),
  password,
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  fk_roleId: 2,
};

const adminUser = {
  username: faker.internet.userName(),
  password,
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  fk_roleId: 3,
};

const createUserAndGetToken = async (userBody) => {
  const user = await User.create(userBody);
  const token = await tokenService.generateToken(user.id, user.fk_roleId);
  return { user, token };
};

module.exports = {
  basicUser,
  managerUser,
  adminUser,
  createUserAndGetToken,
};
