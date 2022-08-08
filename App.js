const express = require("express");
const dotenv = require("dotenv");

const userRoutes = require("./Routes/userRoutes");
dotenv.config({ path: "./.env" });
require("./Server");

const app = express();
app.use(express.json());

const port = 7000;
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log("Ready");
});
