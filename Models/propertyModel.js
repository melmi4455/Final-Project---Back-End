const mongoose = require("mongoose");
const propertySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  city:{
    type:String,
    required:true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const propertyModel = mongoose.model("Property", propertySchema);
module.exports = propertyModel;
