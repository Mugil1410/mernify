const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utlis/errorHandler")
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");

//middelware used to enusure accesing resources after user login
exports.authenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    console.log(process.env.JWT_SECRET);
    
    try {
        if (!token) {
            next(new ErrorHandler("Login first to handle this resource", 401));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.log("error from middleware",error);
        next(new ErrorHandler("Middleware->Invalid token", 401));
    }
});

//middleware to authorize user roles  e.g admin, seller, customer
exports.authorizeRoles = (...roles) => {
    return  (req, res, next) => {
         if(!roles.includes(req.user.role)){
             return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
         }
         next()
     }
 }  