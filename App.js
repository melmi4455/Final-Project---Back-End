const express = require("express");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./Routes/userRoutes");
dotenv.config({ path: "./.env" });
require("./Server");

const port = 7000;
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log("Ready");
});
