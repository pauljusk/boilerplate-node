const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .post(auth("manageUser"), validate(userValidation.createUser), userController.createUser)
  .get(auth("manageUser"), validate(userValidation.getUsers), userController.getUsers);

router.route("/roles").get(auth(), userController.getRoles);

router
  .route("/:userId")
  .get(auth("getUser"), validate(userValidation.getUser), userController.getUser)
  .patch(auth("manageUser"), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth("manageUser"), userController.deleteUser);

module.exports = router;
