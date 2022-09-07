const express = require("express");

const userController = require("../Controllers/userController");
const propertyController = require("../Controllers/propertyController");
const router = express.Router();
const upload = require("../Utils/multer");

router.route("/usersHouses").get(userController.protect,propertyController.usersHouses);
router.route("/filter").get(propertyController.filter);

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
  .put(upload.single("image"),propertyController.edit)
  .delete(propertyController.delete);

module.exports = router;
