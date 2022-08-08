const express = require('express')
const dotenv = require ("dotenv")
const app = express();

dotenv.config({path: "./.env"});
require ("./Server");

const port = 7000;

app.listen(port,()=>{
    console.log("Ready")
})