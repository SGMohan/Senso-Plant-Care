const nodemailer = require("nodemailer");

/**
 * Sends an email using Gmail SMTP
 * @param {Object} options - Email configuration
 * @param {String} options.to - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.text - Plain text email body
 */
const sendEmail = async ({ to, subject, text }) => {
  try {
    // Create transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Message structure
    const mailOptions = {
      from: `"Senso Plant Care" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
