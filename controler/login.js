const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const catchAsync = require("../middlewares/errorHandiling");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();



const addNewAdmin = async (req , res) =>{

    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(req.body.password , salt);

    const user = {
        ...req.body,
        password: hash,
    };

    await userModel.create(user);
    console.log(req.body.username,);

    const jwtPayload = {
        username: req.body.username,
    };

    // Generate JWT token with expiration time of 1 hour
    const token = jwt.sign(jwtPayload, process.env.JWT_KEY, { expiresIn: '1h' });
    console.log(process.env.JWT_KEY);

    return res.json({
        sucess: true,
        message: user,
        token,
    });

};
const loginUser = async (req , res) =>{

    const {username , password} = req.body;

    const user = await userModel.findOne({username});

    if(!user){
        return res.status(402).json({
            success: false,
            message: "Inavlid username or password"
        });
    }
    console.log("pass 1")
    const isPassword = bcrypt.compareSync(password , user.password);

    // const isPassword = (password === user.password);

    if(!isPassword){
        return res.status(404).json({
            success: false,
            message: "Inavlid password"
        })
    }
    console.log("pass 2")

    console.log(req.body.username,);
    const jwtPayload = {
        username: req.body.username,
    };

    // Generate JWT token with expiration time of 1 hour
    const token = jwt.sign(jwtPayload, process.env.JWT_KEY, { expiresIn: '1h' });
    console.log(process.env.JWT_KEY);

    return res.json({
        sucess: true,
        username: req.body.username,
        token,
    });
};

const userController = {
    // addNewAdmin: catchAsync.catchAsync(addNewAdmin),
    addNewAdmin : addNewAdmin,
    loginUser: catchAsync.catchAsync(loginUser),
}

module.exports = userController;