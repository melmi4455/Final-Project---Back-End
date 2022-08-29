const express = require("express");

const userController = require("../Controllers/userController");
const propertyController = require("../Controllers/propertyController");
const router = express.Router();
const upload = require("../Utils/multer");

// router
//   .route("/")
//   .post(upload.single("image"), propertyController.create)
//   .get(propertyController.getAll);
// router
//   .route("/:id")
//   .get(userController.protect, propertyController.getOne)
//   // .put(propertyController.edit)
//   .delete(userController.protect, propertyController.delete);

router
  .route("/")
  .get(propertyController.getAll)
  .post(
    userController.protect,
    upload.single("image"),
    propertyController.create
  );

router
  .route("/:id")
  .get(propertyController.getOne)
  // .put(propertyController.edite)
  .delete(propertyController.delete);

module.exports = router;
