const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lhoizxd.mongodb.net/Som-Home-rentals`
  )
  .then(() => console.log("Connected✅"));
