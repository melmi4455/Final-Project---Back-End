const express = require("express");
const propertyController = require("../Controllers/propertyController");
const router = express.Router();

router.route("/").post(propertyController.create).get(propertyController.getAll);
router.route("/:id").get(propertyController.getOne).put(propertyController.edit).delete(propertyController.delete);




module.exports = router;