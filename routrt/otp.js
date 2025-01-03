const express = require("express");
const product = require("../controler/otp");


const router = express.Router();

router.post("/send" , product.otp);
router.post("/chack" , product.app1);
router.post("/forgat" , product.forgat);
module.exports = router;