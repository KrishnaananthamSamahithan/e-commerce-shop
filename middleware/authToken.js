const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const token = req.cookies.token

        if(!token){
            return res.json({
                message : "User not Login",
                data : [],
                error : true,
                success : false
            })
        }	

        jwt.verify(token, process.env.TOCKEN_SECRET_KEY, function(err, decoded) {

            console.log(err)
            console.log("decoded",decoded)

            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });


    }catch(err){
        return res.status(200).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}


module.exports = authToken