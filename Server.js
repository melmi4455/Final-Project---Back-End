const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.g2l0z.mongodb.net/Home-rental-app`
  )
  .then(() => console.log("Connected to MongoDB")); 
