const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService, tokenService, authService } = require("../services");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateToken(user.id, user.fk_roleId);
  res.status(httpStatus.CREATED).send(token);
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.login(username, password);
  const token = await tokenService.generateToken(user.id, user.fk_roleId);
  res.status(httpStatus.CREATED).send(token);
});

module.exports = {
  register,
  login,
};
