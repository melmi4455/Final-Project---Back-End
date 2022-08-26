const express = require("express");
const propertyController = require("../Controllers/propertyController");
const router = express.Router();

const upload = require("../Utils/multer");
router
  .route("/")
  .get(propertyController.getAll)
  .post(upload.single("image"), propertyController.create);

router
  .route("/:id")
  .get(propertyController.getOne)
  .put(propertyController.edite)
  .delete(propertyController.delete);

module.exports = router;
