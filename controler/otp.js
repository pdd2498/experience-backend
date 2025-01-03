const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const fs = require("node:fs");
const userModule = require("../model/user");
dotenv.config();


const getOtp = ()=>{
    const a = '1234567890';
    let otp = "";
    for(let i = 0;i<6;i++){
        const b = Math.floor(Math.random()*10);
        otp += a[b];
    }
    return otp;
}

const sendOtp = (req , res)=>{
    const otp = getOtp();
        try {
        fs.writeFileSync("otpStore.txt" , otp);
        } catch (err) {
        console.error(err);
        }

    try{
        const senderEmail = req.body;
        console.log(senderEmail.email);
        var transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.PASSWORD
            }
        })

        const mail_configs = {
            form:'pdd2498@gmail.com',
            to: senderEmail.email,
            subject:'testing my app',
            text:`thish is your one time password ${otp}`
        }

        transport.sendMail(mail_configs , (err,inf)=>{
            if(err){
                console.log("i am error" , err);
                return res.json({
                    sucess: false,
                    message:"sumthing wrong"
                });
            }
            return res.json({
                sucess: true,
                message:"OTP sand successfull"
            });
        })
}catch{
    return res.json({
        sucess: false,
        message: "i am not good"
    });
}
}

const check = (req , res) => {

    const a = fs.readFileSync("otpStore.txt" , {encoding:"utf-8"});
    if(req.body.otp ===  a)return res.json({
        sucess: true
    })
    return res.json({
        success:false
    })
}

const forgat = async (req , res)=>{
    const {email , password , p}  = req.body;

    if(p === 'U'){
        try {
            const pass = await userModule.findOneAndUpdate(
              { Username: email },
              { $set: { password: password } },
              { new: true }
            );
            console.log('Password updated successfully:', pass);
            return res.json({
                sucess : true,
                message:pass
            });
          } catch (error) {
            return res.status(400).json({
                sucess : false,
                message:error
            });
            console.error('Error updating password:', error);
          }
    }
    else if(p === 'S'){
        try {
            const pass = await sallerModule.findOneAndUpdate(
              { Username: email },
              { $set: { password: password } },
              { new: true }
            );
            console.log('Password updated successfully:', pass);
            return res.json({
                sucess : true,
                message:pass
            });
          } catch (error) {
            return res.status(400).json({
                sucess : false,
                message:error
            });
            console.error('Error updating password:', error);
          }
    }
    else {
        return res.json({
            sucess : false,
            message:"p===u is  not working"
        });
    }
}




const product = {
    otp : sendOtp,
    app1 : check,
    forgat: forgat,
}

module.exports = product ;