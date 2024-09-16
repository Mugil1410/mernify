const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

// Function to send an email using Nodemailer
const sendEmail = async (options) => {
    // Configure the email transport settings (SMTP)
    const transport = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    };

    // Create a transporter using the configured settings
    const transporter = nodemailer.createTransport(transport);

    // Compose the email message
    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // Sender information
        to: options.email, // Recipient email address
        subject: options.subject, // Email subject
        //text: options.message, // Plain text version of the email content
        html:options.html,
    };

    // Send the email using the transporter
    await transporter.sendMail(message);
};

module.exports = sendEmail;
