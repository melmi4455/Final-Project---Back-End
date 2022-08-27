const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors")
const userRoutes = require("./Routes/userRoutes");
const propertyRoutes = require("./Routes/propertyRoutes");

dotenv.config({ path: "./.env" });

require("./server");
app.use(express.json()); 
app.use(cors());
app.use("/user", userRoutes);
app.use("/property", propertyRoutes);

const port = 7000;

app.listen(port, () => {
  console.log("connection is working");
});
