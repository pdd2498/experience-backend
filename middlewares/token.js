const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");

dotenv.config();

const userData = async (req , res , next)=>{
    const token = req.headers;

    console.log("pass 3")
    if(!token.authorization){
        res.status(404).json({
            msg: "unvalid token"
        })
    }

    console.log("pass 4" , process.env.JWT_KEY);
    try{
        jwt.verify(token , process.env.JWT_KEY);
        console.log("pass 5")
    } catch(err){
        console.log("token teri ")
        return  res.status(404).json({
        msg: "jwt err"
       });
    };

    const tokenDecod = jwt.decode(token);

    // cheking token is exp or not

    const tokenExp = tokenDecod?.exp < Math.ceil(new Date().getTime()/1000);
    const tokenisu = tokenDecod?.iat > Math.ceil(new Date().getTime()/1000);

    if(tokenExp || tokenisu){
        return res.status(401).json({
            msg: "token exp"
        });
    };
        console.log("pass 6")
    // cheking is user id is valid or not

    const id = tokenDecod?.id;
    const userId = await UserModel.findById(id);
    if(!userId){
        return res.status(401).json({
            msg: "user id not found"
        });
    };

    console.log("pass 7")

    req.user = userId;
    next()
};

module.exports = userData;