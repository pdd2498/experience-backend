const errorHandler = (err ,req ,res ,next) => {
    console.log(err);
    return res.json({
        success: false,
        mess: "sumthing want wrong"
    })
}

const catchAsync = (fn)=>{
    return(req,res,next)=> {
        return Promise.resolve(fn(req,res,next)).catch((err)=>{
            console.log("error occured" , req.body  , err.message)
            next(err);
        });
    };
};

module.exports = {errorHandler , catchAsync};