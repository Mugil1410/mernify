const express = require('express')
const Router = express.Router()
const { registerUser, loginuser, logoutUser, forgotPassword, resetPassword, getUserProfile, changePassword, updateProfile, getUser, updateUser, deleteUser, getAllUsers } = require("../controllers/authController");
const { authenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..', 'uploads/user' ) )
    },
    filename: function(req, file, cb) {
        cb(null, `${file.originalname}`)
    }  
})})
//User routes
Router.post('/register',upload.single('avatar'), registerUser);
Router.post('/login',loginuser)
Router.get('/logout',authenticatedUser,logoutUser)
Router.post('/password/forgot',forgotPassword)
Router.post('/password/reset/:token',resetPassword)
Router.get('/userprofile',authenticatedUser,getUserProfile)
Router.put('/change/password',authenticatedUser,changePassword)
Router.put('/update/profile',authenticatedUser,upload.single('avatar'),updateProfile)

//Admin routes
Router.get('/admin/users',authenticatedUser,authorizeRoles('admin'), getAllUsers);
Router.route('/admin/user/:id').get(authenticatedUser,authorizeRoles('admin'), getUser)
                               .put(authenticatedUser,authorizeRoles('admin'), updateUser)
                               .delete(authenticatedUser,authorizeRoles('admin'), deleteUser);

module.exports = Router;
