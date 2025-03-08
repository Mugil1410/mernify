const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utlis/errorHandler")
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");

//middelware used to enusure accesing resources after user login
exports.authenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    
    try {
        if (!token) {
            next(new ErrorHandler("Login first to handle this resource", 401));
            return
        }else{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            console.log('passed middlware');
            
            next();
        }
       
    } catch (error) {
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