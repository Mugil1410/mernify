const Product = require("../models/productModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utlis/errorHandler");
const APIFeatures = require("../utlis/APIFeatures");
const APIFeaturesf = require("../utlis/ApiFeaturesf");

//fetch data from db - /product?keyword=dell&category=Laptops&price[lt]=100&price[gt]=300&page=2
exports.getPrdoducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;

  let buildQuery = () => {
    return new APIFeaturesf(Product.find(), req.query).search().filter();
  };

  try {
    const filteredProductsCount = await buildQuery().query.countDocuments({});
    const totalProductsCount = await Product.countDocuments({});
    let productsCount = totalProductsCount;

    if (filteredProductsCount !== totalProductsCount) {
      productsCount = filteredProductsCount;
    }

    const products = await buildQuery().paginate(resPerPage).query;

    res.status(200).json({
      success: true,
      count: productsCount,
      resPerPage,
      products,
    });
  } catch (error) {
    console.error("Error in fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

//fetch single product by id - /product/:id
exports.getSinglePrdoduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('reviews.user','name email');
  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }
  res.status(201).json({
    success: true,
    product
  })
});

//create new product - /product
exports.newProduct = catchAsyncError(async (req, res, next) => {
  try {
      let images = [];
      if (req.files.length > 0) {
          req.files.forEach(file => {
              let url = `/uploads/product/${file.originalname}`;
              images.push({ image: url });
          });
      }
      req.body.images = images;
      req.body.user = req.user.id;
      const product = await Product.create(req.body);
      res.status(201).json({
          message: "Product created successfully",
          product,
      });
  } catch (error) {
    console.log("creating error ",error);
      res.status(500).json({ message: "Error creating product" }); 
  }
});


//update product - /product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  //uploading images
  let images = []

  //if images not cleared we keep existing images
  if(req.body.imagesCleared === 'false' ) {
      images = product.images;
  }
  let BASE_URL = process.env.BACKEND_URL;
  if(process.env.NODE_ENV === "production"){
      BASE_URL = `${req.protocol}://${req.get('host')}`
  }

  if(req.files.length > 0) {
      req.files.forEach( file => {
          let url = `${BASE_URL}/uploads/product/${file.originalname}`;
          images.push({ image: url })
      })
  }


  req.body.images = images;
  
  if(!product) {
      return res.status(404).json({
          success: false,
          message: "Product not found"
      });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
  })

  res.status(200).json({
      success: true,
      product
  })

})

//delete product - /product/:id
exports.deleteProducts = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error deleting product" });
    });
};

//Create Review - /review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
  };

  const product = await Product.findById(productId);
  //finding user review exists
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //updating the  review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //creating the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //find the average of the product reviews
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get Reviews - /reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    "reviews.user",
    "name email"
  );
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review - /review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  //filtering the reviews which does match the deleting review id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });
  //number of reviews
  const numOfReviews = reviews.length;

  //finding the average with the filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  //save the product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

// get admin products  - admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
  const products = await Product.find();
  res.status(200).send({
      success: true,
      products
  })
});
