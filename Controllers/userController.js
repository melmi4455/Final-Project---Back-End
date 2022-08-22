const express = require("express");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    //1.check if the email is already registered
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ messages: "this email is already taken" });
    }
    //2 if the password is emty
    if (req.body.password == "") {
      return res.status(400).json({ messages: "password is required" });
    }

    //3. check if the password and confirmPassword is matched
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        messages: "your password and confirmPassword are not the same",
      });
    }
    if (req.body.confirmPassword == "") {
      return res.status(400).json({ messages: "password is required" });
    }
    //3. check if password is less than 7 caracters
    if (req.body.password.length < 7) {
      return res
        .status(400)
        .json({ messages: "password must be less than 7 characters" });
    }
    //4. encrypt password
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashpassword;
    await User.create(req.body);
    res.status(200).json({ message: " user created successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "signUp failed" });
  }
};
