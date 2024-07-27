const User = require('../models/userModel')
exports.OrderReceivedMail =(order)=>{

    const customerName = User.findById(order.user)
    const totalPrice = order.itemsPrice


    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Received</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #febd69;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .email-body {
            padding: 20px;
        }
        .email-footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #6c757d;
        }
        .product-image {
            max-width: 100px;
            margin-right: 10px;
        }
        .product-details {
            display: flex;
            align-items: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>MERNify</h2>
        </div>
        <div class="email-body">
            <p>Dear ${customerName},</p>
            <p>Thank you for your order! Your order is currently being processed. Here are the details:</p>
            <div class="product-details">
                <img src="" alt="Product Image" class="product-image">
                <div>
                   
                    <p><strong>Price:</strong> ${totalPrice}</p>
                   
                </div>
            </div>
            <p>You can track the status of your order using the link below:</p>
            <p class="text-center"><a href="" class="btn btn-primary">Track Order</a></p>
            <p>Thank you for shopping with us!<br>MERNify, Support Team</p>
        </div>
        <div class="email-footer">
            <p>© <script>document.write(new Date().getFullYear())</script> MERNify. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

}