const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");

dotenv.config({ path: "./.env" });
require("./Server");

const app = express();
app.use(cors());
app.use(express.json());

const port = 7000;
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log("Ready");
});
