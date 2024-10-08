const bcrypt = require("bcrypt");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");


async function userSingInController(req,res){
    try {
        const {email, password} = req.body;

        if (!email) {
            throw new Error("Please provide Email");
        }
        if (!password) {
            throw new Error("Please provide Password");
        }

        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }

        const checkPassword =await bcrypt.compare(password, user.password);

        console.log("checkPassword",checkPassword)

        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email
            }
        const token = await jwt.sign(tokenData, process.env.TOCKEN_SECRET_KEY, {expiresIn: 60 * 60 * 8})
        
        const tokenOption = {
            httpOnly : true,
            secure : true
        }
        res.cookie("token", token, tokenOption).json({
            message : "Login Successfully",
            data : token,
            success : true,
            error : false
        })

        }else{
            throw new Error("Please Check your password")
        }

    }catch(err){
        res.json({
            message: err.message || err, // Send the error message, not the error object
            error: true,
            success: false,
        });
    }
}

module.exports = userSingInController;