const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// token function

exports.signUp = async (req, res) => {
  try {
    // 1- Check if the Email exists
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body);
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //    2-Encrypt Password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = encryptedPassword;

    // 3. Token
    const token = await jwt.sign(
      {
        expiresIn: "2h",
        data: { email: req.body.email },
      },
      process.env.JWTSEC
    );
    // 4.Create New User

    await User.create(req.body);

    res.status(200).json({ message: "Sign Up Successful", token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// LOG IN
exports.logIn = async (req, res) => {
  try {
    //1. check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Email or password incorrect" });
    }
    // 2. password correct
    const password = await bcrypt.compare(req.body.password, user.password);
    if (password === false) {
      return res
        .status(404)
        .json({ message: "Passwords   or email incorrect" });
    }
    // 3. login success
    // 4. Token
    const token = await jwt.sign(
      {
        expiresIn: "2h",
        data: { id: user.id, email: user.email },
      },
      process.env.JWTSEC
    );
    res.status(200).json({ message: "login Successful!", token });
  } catch (e) {
    res.status(404).json({ message: "logn error" });
    console.log(e)
  }
};

exports.update = async (req, res) => {
  // 1.Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Email in correct" });
  }
  // // 2. Check if password is correct
  const passwordCheck = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (passwordCheck === false) {
    return res.status(400).json({ message: "Password incorrect" });
  }

  // // 3. Hash the Password
  const encryptedPassword = await bcrypt.hash(req.body.newPassword, 10);
  req.body.password = encryptedPassword;
  console.log(encryptedPassword);

  // 4. Update
  await User.findOneAndUpdate(
    { email: user.email },
    { password: encryptedPassword },
    { name: req.body.name }
  );

  res.status(200).json({ message: "Profile Updated" });
};

exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // 1.If token is empty
    if (!token) {
      return res.status(400).message({ message: "You are not logged in" });
    }

    // 2.Verify Token
    jwt.verify(token, process.env.JWTSEC, function (err, decoded) {
      console.log(decoded.data);
      if (err) {
        return res.status(400).json({ message: "Login session expired" });
      }

      req.user = decoded.data;
    });
    next();
  } catch (e) {
    return res.status(404).json({ message: "error" });
  }
};

// exports.check = (req, res, next) => {
//   try {
//     const token = req.headers.authentication;
//     if (!token) {
//       return res.status(400).message({ message: "You not logged in" });
//     }
//     jwt.verify(token, process.env.JWTSEC, function (err, decoded) {
//       if (err) {
//         return res.status(400).json({ message: "Session Expired" });
//       }
//       req.user = decoded.data;
//     });
//     res.status(200).json({ message: "Correct User" });
//   } catch (e) {
//     res.status(404).json({ message: "error" });
//   }
// };

// async function createToken(value) {
//   const token = await jwt.sign(
//     {
//       data: value,
//     },
//     "process.env.JWTSECRET",
//     { expiresIn: "1h" }
//   );
//   return token;
// };
