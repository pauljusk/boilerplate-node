const Joi = require("joi");

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().allow(""),
    lastname: Joi.string().allow(""),
    fk_roleId: Joi.number().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({}),
  params: Joi.object().keys({}),
  body: Joi.object().keys({}),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().allow(""),
    lastname: Joi.string().allow(""),
    fk_roleId: Joi.number().required(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
