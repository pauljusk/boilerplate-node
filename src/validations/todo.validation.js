const Joi = require("joi");

const createTodo = {
  body: Joi.object().keys({
    value: Joi.string().required(),
    isDone: Joi.number().required(),
    id: Joi.any(),
    fk_userId: Joi.number().required(),
  }),
};

const updateTodo = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    value: Joi.string().required(),
    isDone: Joi.number(),
    fk_userId: Joi.number().required(),
  }),
};

const deleteTodo = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    fk_userId: Joi.number().required(),
  }),
};
const getTodos = {
  params: Joi.object().keys({
    fk_userId: Joi.number().required(),
  }),
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
};
