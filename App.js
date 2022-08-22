const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
<<<<<<< HEAD

dotenv.config({ path: "./.env" });
require("./Server");

const app = express();
app.use(cors());
app.use(express.json());
=======
const propertyRoutes = require("./Routes/propertyRoutes")
dotenv.config({ path: "./.env" });
require("./Server");


app.use(express.json());
app.use("/user", userRoutes);
app.use("/property", propertyRoutes);

>>>>>>> 5e87344209f48a1cf3fe3110d06af52ca3aed598

const port = 7000;
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log("Ready");
});
