const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const todoValidation = require("../validations/todo.validation");
const todoController = require("../controllers/todo.controller");

const router = express.Router();

router
  .route("/")
  .post(auth("manageTodo", "allowSelf"), validate(todoValidation.createTodo), todoController.addTodo)
  .put(auth("manageTodo", "allowSelf"), validate(todoValidation.updateTodo), todoController.updateTodo)
  .put(auth("manageTodo", "allowSelf"), validate(todoValidation.updateTodo), todoController.updateTodo)
  .delete(auth("manageTodo", "allowSelf"), validate(todoValidation.deleteTodo), todoController.deleteTodo);

router
  .route("/:fk_userId")
  .get(auth("manageTodo", "allowSelf"), validate(todoValidation.getTodos), todoController.getUserTodos);

module.exports = router;
