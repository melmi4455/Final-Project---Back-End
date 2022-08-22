const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();

<<<<<<< HEAD
router.route("/signUp").post(userController.signUp);
=======

router.route("/").post(userController.signUp)
router.route("/login").post(userController.login)






>>>>>>> 5e87344209f48a1cf3fe3110d06af52ca3aed598

module.exports = router;
