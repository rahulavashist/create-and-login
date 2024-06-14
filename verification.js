const jwt= require("jsonwebtoken")

function verifyToken(req,res,next){
const token = req.headers.authorization
// console.log(token)
jwt.verify(token,process.env.SAULTKEY, (error)=>{
    if(error){
        res.status(400).send({result:"Fail",message:"YOu ar not a authorized person"})
    }
    else{
        next()
    }
})
}
module.exports =verifyToken()