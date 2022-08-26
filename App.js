const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const propertyRoutes = require("./Routes/propertyRoutes");

dotenv.config({ path: "./.env" });

require("./server");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/property", propertyRoutes);

const port = 7000;

app.listen(port, () => {
  console.log("connection is working");
});
