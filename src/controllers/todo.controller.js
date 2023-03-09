const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { todoService } = require("../services");

const addTodo = catchAsync(async (req, res) => {
  const todo = await todoService.addTodo({ ...req.body });
  res.status(httpStatus.CREATED).send(todo);
});

const getUserTodos = catchAsync(async (req, res) => {
  const trip = await todoService.getUserTodos(req.params.fk_userId);
  res.status(httpStatus.CREATED).send(trip);
});

const updateTodo = catchAsync(async (req, res) => {
  const retval = await todoService.updateTodo(req.body);
  res.status(httpStatus.CREATED).send(retval);
});

const deleteTodo = catchAsync(async (req, res) => {
  await todoService.deleteTodo(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  addTodo,
  getUserTodos,
  updateTodo,
  deleteTodo,
};
