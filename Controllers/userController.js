const User = require ("../Models/userModel")
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");






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

        // 4. Token
        const token = await jwt.sign(
            {
                expiresIn: "2h",
                data:{email:req.body.email},
            },
            process.env.JWTSEC
        );
        // console.log(token)


    res.status(200).json({message:"Sign Up Successful",token})

    } catch (e){
        res.status(400).json({message:e.message});
    }
}

exports.login = async (req,res) => {
    try {
        // 1. Check if Email exists in Database
        const user = await User.findOne({email:req.body.email}) 
        if (!user) {
            return res.status(400).json({message:"Email in correct"})
        }

        // 2. Check if Password is correct
        const passwordCheck = await bcrypt.compare(req.body.password,user.password)
        if(passwordCheck==false) {
            return res.status(400).json({message:"Password incorrect"});
        }
            // 3.Token
            
            const token = await jwt.sign(
                {
                    expiresIn: "2h",
                    data:{email:req.body.email},
                },
                process.env.JWTSEC
            );


            // 4.Login Successful
            res.status(200).json({message:"Login Successful",token})
        

    } 
    catch(e){
        res.status(400).json({message:e.message});
        // res.status(400).json({message:"Error Login In"})
        
    }
}

exports.update = async (req,res) => {
    // 1.Check if email exists
    const user = await User.findOne({email:req.body.email})
        if (!user) {
            return res.status(400).json({message:"Email in correct"})
        }
    // // 2. Check if password is correct
    const passwordCheck = await bcrypt.compare(req.body.oldPassword,user.password)
        if(passwordCheck==false) {
            return res.status(400).json({message:"Password incorrect"});
        }

    // // 3. Hash the Password
    const encryptedPassword = await bcrypt.hash(req.body.newPassword , 10);
        req.body.password = encryptedPassword; 
        console.log(encryptedPassword)

    // 4. Update
    await User.findOneAndUpdate ( 
        {email:user.email},
        {password: encryptedPassword},
        {name:req.body.name}
    );

    res.status(200).json({message:"Profile Updated"});
}

exports.protect = (req,res,next) => {
    try{
        const token = req.headers.authentication;
        // 1.If token is empty
        if(!token){
            return res.status(400).message({message:"You are not logged in"})
        }

        // 2.Verify Token
        jwt.verify(token,process.env.JWTSEC,function(err,decoded){
            if(err){
                return res.status(400).json({message:"Login session expired"});
            }
            req.user=decoded.data
        });
        next();

    } catch(e){
        return res.status(404).json({message:"error"});
    }
}


exports.check = (req,res,next)=> {
    try{
        const token = req.headers.authentication;
        if(!token) {
            return res.status(400).message({message:"You not logged in"});
        }
        jwt.verify(token,process.env.JWTSEC,function(err,decoded){
            if(err) {
                return res.status(400).json({message:"Session Expired"});
            }
        });
        res.status(200).json({message:"Correct User"})
    } catch(e){
        res.status(404).json({message:"error"});
    }
}