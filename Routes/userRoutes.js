const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();


router.route("/").post(userController.signUp);
router.route("/login").post(userController.login);
router.route("/updateprofile").put(userController.protect,userController.update);
router.route("/check").get(userController.check);







module.exports = router;
