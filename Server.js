const mongoose = require ("mongoose")

mongoose.connect(`mongodb+srv://melmi:123@cluster0.g2l0z.mongodb.net/HomeRentalApp`).then(()=>
console.log("Connected to Database"));

