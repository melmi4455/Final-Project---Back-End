const express = require("express");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./Routes/userRoutes");
const propertyRoutes = require("./Routes/propertyRoutes")
dotenv.config({ path: "./.env" });
require("./Server");


app.use(express.json());
app.use("/user", userRoutes);
app.use("/property", propertyRoutes);


const port = 7000;
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log("Ready");
});
