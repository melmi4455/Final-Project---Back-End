const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lhoizxd.mongodb.net/home-app`
  )
  .then(() => console.log("connected successfully"));
