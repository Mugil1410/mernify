exports.ResetPasswordMail = (user, resetUrl) => {
    const mailusername = user.name

    // Convert the expiration time to a Date object
    const expireDate = user.resetPasswordTokenExpire;

    // Get the current time
    const now = new Date();

    // Calculate the difference in milliseconds
    const diff = expireDate - now;

    // Convert milliseconds to minutes
    const minutesLeft = Math.floor(diff / 1000 / 60);

    // Check if the token has already expired
    if (minutesLeft <= 0) {
        return res.status(200).json({ message: 'The token has expired.' });
    }

  return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Email</title>
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
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>MERNify</h2>
        </div>
        <div class="email-body">
            <p>Dear ${mailusername},</p>
            <p>A request to reset your password will expire in ${minutesLeft} minutes use the below link  to reset the password. If you did not make this request, please ignore this email. Otherwise, you can reset your password using the link below:</p>
            <p class="text-center"><a href="${resetUrl}" class="btn btn-primary ">Reset Password</a></p>
            <p>Thank you,<br>MERNify, Support Team</p>
        </div>
        <div class="email-footer">
            <p>© <script>document.write(new Date().getFullYear())</script> MERNify. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
