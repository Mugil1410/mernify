

// Function to send a JWT token and user data in the response
const sendToken = (user, statusCode, res) => {
    try {
        // Generate a JWT token for the user
        const token = user.getJWTtoken();

        // Set a cookie with the token (expires after JWT expiration time)
        // Send the token and user data in the response
        try {
            res.status(statusCode).cookie('token', token, {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
                httpOnly: true, // Ensures the token is only accessible via HTTP requests
            }).json({ success: true, user, token });
            console.log("token set sucessfull");
            
        } catch (error) {
            console.log("tokken setter",error);
        }
        
    } catch (error) {
        // Handle any errors that occur during token generation or cookie setting
        console.error("setting token error",error);
        res.status(500).json({ success: false, message: 'setting token error' });
    }
};

module.exports = sendToken;
