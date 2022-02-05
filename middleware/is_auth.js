const jwt = require('jsonwebtoken')

module.exports = function (req , res , next){
    const token = req.header('authorization')
    console.log(token)

    if(!token){
        res.status(401).send({
            code: 401,
            error: {
                "status": "Unaouthrized",
                "message": "User Login neded!" 
            }        
        })
    }else{
        try{
            const verified = jwt.verify(token , process.env.TOKEN_SECRET)
            req.user = verified
            next()
        }catch(err){
            res.status(401).send({
                code: 401,
                error: {
                    "status": "Unaouthrized",
                    "message": "User Login neded!" 
                }        
            })
        }
    }

   
}