const express = require("express");
const router = require("./routrt/user");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routrt/expenses');
const  otp  = require("./routrt/otp");



const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://pdd2498:7Sx7Aloz3XQ0SlGf@cluster0.18ap8on.mongodb.net/").then(()=>console.log("data base conect successfull")).catch((err) => console.log(err , "mongose error conecting"));

app.get( '/', (req,res)=>{
    res.json({
        sucess: true,
    })
})
app.use("/api/otp" , otp)
app.use("/user" , router);
app.use('/expenses', expenseRoutes);

app.listen("10000" , ()=>console.log("server is runing at 10000"));