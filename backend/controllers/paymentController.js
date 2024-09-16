const catchAsyncError = require('../middlewares/catchAsyncError')
const stripe = require('stripe')("sk_test_51PbtbyRu57BrIIqqCyJkSq6dh7xaaip8RLihGE4qSGyDhuim5CXnbG3UdkFFFsqsTUzi14sfioGyNOwVjZC4Gqb8008kBaKp7j")

exports.paymentProcess = catchAsyncError(async(req,res,next)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount:req.body.amount, // amount in cents
        currency: "inr",
        description:"test payment",
        metadata : {integration_check :"accept payment"},
        //shipping:req.body.shipping
    })

    res.status(200).json({
        success:true,
        clientSecret:paymentIntent.client_secret
    })

})

exports.sendStripeApi = catchAsyncError(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"stripe api endpoint is ready",
        stripeApiKey: "pk_test_51PbtbyRu57BrIIqqAPLexiM7bHYV9mEF6aFQAZ7xXRsehlux8ZWkC4jTRmtMHmWrzTTwLHAlyaHaaS5Oy8wzkq1w00sNxdfcbq"
    })
 
})