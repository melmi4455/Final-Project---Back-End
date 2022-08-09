const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();


router.route("/").post(userController.signUp)
router.route("/login").post(userController.login)







module.exports = router;
