const express = require("express");
const userController = require("../Controllers/userController")
const propertyController = require("../Controllers/propertyController");
const router = express.Router();

router.route("/").post(userController.protect,propertyController.create).get(propertyController.getAll);
router.route("/:id").get(propertyController.getOne).put(userController.protect,propertyController.edit).delete(userController.protect,propertyController.delete);




module.exports = router;