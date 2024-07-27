const express=require('express')
const Router=express.Router()
const { getPrdoducts, newProduct, getSinglePrdoduct, updateProduct, deleteProducts, createReview, getReviews, deleteReview, getAdminProducts } = require('../controllers/productsController')
const { authenticatedUser,authorizeRoles } = require('../middlewares/authenticate')
const multer = require('multer');
const path = require('path')


const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..', 'uploads/product' ) )
    },
    filename: function(req, file, cb) {
        cb(null, `${file.originalname}`)
    }  
})})



Router.get('/product',getPrdoducts)
Router.get('/product/:id',getSinglePrdoduct)
Router.put('/review',authenticatedUser,createReview)


//Admin routes
Router.post('/admin/product/new',authenticatedUser,upload.array('images'), authorizeRoles('admin'), newProduct);
Router.get('/admin/products',authenticatedUser, authorizeRoles('admin'), getAdminProducts);

Router.route('/admin/product/:id').put(authenticatedUser,upload.array('images'), authorizeRoles('admin'),updateProduct)
                                  .delete(authenticatedUser, authorizeRoles('admin'),deleteProducts);

Router.route('/admin/reviews').get(authenticatedUser, authorizeRoles('admin'),getReviews)  
Router.delete('/admin/review',authenticatedUser, authorizeRoles('admin'),deleteReview)                                
                            

                           

module.exports=Router