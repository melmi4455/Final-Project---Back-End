const property = require("../Models/propertyModel");
const jwt = require("jsonwebtoken");

exports.getOne = async (req, res) => {
  try {
    const found = await property.findById({});
    return res.status(200).json({ message: found });
  } catch (e) {
    console.log(e.message);
    res.status(200).json({ message: "getOne" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const getAll = await property.find();
    return res.status(200).json({ message: "get all post", data: getAll });
  } catch (e) {
    res.status(200).json({ message: " error getting all" });
  }
};
// create a new home
exports.create = async (req, res) => {
  try {
    const token = jwt.sign(
      {
        data: { email: req.body.email },
        expiresAt: "1h",
      },
      process.env.JWTSEC
    );
    req.body.image = req.file.filename;
    req.body.user = req.user.id;
    await property.create(req.body);
    // console.log(req.body);
    res.status(200).json({ message: "created successfully", token });
  } catch (e) {
    console.log(e.message);
    // res.status(404).json({ message: "error creating" });
  }
};
// update existing property
exports.edit = async (req, res) => {
  try {
    await property.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ message: "update" });
  } catch (e) {
    console.log(e.message);
    res.status(200).json({ message: "error " });
  }
};

// delete existing property
exports.delete = async (req, res) => {
  try {
    await property.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "delete" });
  } catch (e) {
    console.log(e.message);
    res.status(200).json({ message: "deleted error" });
  }
};
