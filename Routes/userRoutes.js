const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();

router.route("/signUp").post(userController.signUp);


router.route("/login").post(userController.logIn);

router
.route("/updateprofile")
.put(userController.protect, userController.update);
// router.route("/check").get(userController.check);

module.exports = router;
