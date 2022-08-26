const property = require("../Models/propertyModel");

exports.getOne = async (req, res) => {
  try {
    const property = await property.findById(req.params.id);
    return res.status(200).json({ message: property });
  } catch (e) {
    console.log(e.message);
    res.status(200).json({ message: "getOne" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const getAll = await property.find();
    return res.status(200).json({ message: "getAll" });
  } catch (e) {
    res.status(200).json({ message: " error getting all" });
  }
};
// create a new home
exports.create = async (req, res) => {
  try {
    req.body.image = req.file.filename;
    await property.create(req.body);
    console.log(req.body);
    res.status(200).json({ message: "created successfully" });
  } catch (e) {
    console.log(e.message);
    // res.status(404).json({ message: "error creating" });
  }
};
// update existing property
exports.edite = async (req, res) => {
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
