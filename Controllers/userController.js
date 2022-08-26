const express = require("express");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// token function

async function createToken(value) {
  const token = await jwt.sign(
    {
      data: value,
    },
    "process.env.JWTSECRET",
    { expiresIn: "1h" }
  );
  return token;
}
exports.signUp = async (req, res) => {
  try {
    //1.check email if is it already taken
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ messages: "email already exists" });
    }

    //2. password === config.passwor
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ messages: "password does not match" });
    }
    //3. password.length >7
    if (req.body.password.length < 7) {
      return res.status(400).json({ messages: "password too short" });
    }
    //4. encrypt password
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashpassword;

    //5 jsonwebtoken

    await User.create(req.body);

    const token = await createToken({ email: req.body.email });
    console.log(token);
    res.status(200).json({ message: "created successfully", token });
    console.log(token);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "signUp error try again" });
  }
};

// Login part
exports.Login = async (req, res) => {
  try {
    //1. check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Email or password incorrect" });
    }
    // 2. password correct
    const password = await bcrypt.password(req.body.password, user.password);
    if (!password) {
      return res
        .status(404)
        .json({ message: "Passwords   or email incorrect" });
    }
    // 3. login success
    const token = await createToken({ email: user.email });
    console.log(token);
    //
    res.status(200).json({ message: "login Successful!", token });
  } catch (e) {
    res.status(404).json({ message: "login Error" });
  }
};
