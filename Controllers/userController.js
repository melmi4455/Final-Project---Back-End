const User = require ("../Models/userModel")
const bcrypt = require("bcrypt")


exports.signUp = async (req,res) => {
    try{

        // 1- Check if the Email exists
        const user = await User.findOne({email:req.body.email})
        console.log(req.body);
        if(user) {
            return res.status(400).json({message:"Email already exists"})
        }

        //    2-Encrypt Password
        const encryptedPassword = await bcrypt.hash(req.body.password , 10);
        req.body.password = encryptedPassword;

        // 3.Create New User

        await User.create(req.body);
    res.status(200).json({message:"Sign Up Successful"})

    } catch (e){
        res.status(400).json({message:e.message});
    }
}

exports.login = async (req,res) => {
    try {
        // 1. Check if Email exists in Database
        const user = User.findOne(req.body.email) 
        if (!user) {
            res.status(400).json({message:"Email in correct"})
        }

        // 2. Check if Password is correct
        const passwordCheck = await bcrypt.compare(req.body.password,user.password)
        if(passwordCheck==false) {
            res.status(400).json({message:"Password incorrect"});

            // 3.Login Successful
            res.status(200).json({message:"Login Successful"})
        }

    } 
    catch(e){
        res.status(400).json({message:"Error Login In"})
    }
}