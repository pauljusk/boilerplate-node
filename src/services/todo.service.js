const { Todo } = require("../models");

const addTodo = async (data) => {
  const todo = await Todo.create(data);
  return todo;
};

const getUserTodos = (fk_userId) => Todo.findAll({ where: { fk_userId } });

const updateTodo = async (todoBody) => {
  const todo = await Todo.update(
    {
      value: todoBody.value,
    },
    {
      where: {
        id: todoBody.id,
        fk_userId: todoBody.fk_userId,
      },
    }
  );
  return todo;
};

const deleteTodo = async (todoBody) => {
  const todo = await Todo.destroy({
    where: {
      id: todoBody.id,
      fk_userId: todoBody.fk_userId,
    },
  });
  return todo;
};

module.exports = {
  addTodo,
  getUserTodos,
  updateTodo,
  deleteTodo,
};
