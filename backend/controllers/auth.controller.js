const AuthRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require("nodemailer");
const UserModel = require("../models/auth.model.js");
const { verifyToken } = require("../middleware/auth.middleware.js");


//Get route to check if the server is running
AuthRouter.get("/", async (_, res) => {
  await UserModel.find();
  return res.status(200).json({
    message: "Authentication API is operational",
    success: true,
  });
});

//register
AuthRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required: name, email, and password",
      success: false,
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedpassowrd = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedpassowrd;

    const user = await UserModel.create(req.body);

    // Generate token for auto-login after registration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return res.status(201).json({
      message: "Register successfully",
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Account creation failed due to server error",
      success: false,
      error: error.message,
    });
  }
});

//login
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Both email and password are required",
      success: false,
    });
  }

  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Invalid login credentials",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Password",
        success: false,
      });
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Authentication service unavailable",
      success: false,
      error: error.message,
    });
  }
});

//logout
AuthRouter.post("/logout", verifyToken, async (req, res) => {
  try {
    const _id = req.user.id;
    await UserModel.updateOne({ _id }, { $set: { refreshToken: null } });
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
});

//forgot-password
// AuthRouter.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({
//       message: "Email is required",
//       success: false,
//     });
//   }

//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     // 🔐 Create reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");

//     user.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
//     await user.save({ validateBeforeSave: false });

//     const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     // 📧 Mail
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       to: user.email,
//       subject: "Password Reset",
//       html: `
//         <p>You requested password reset</p>
//         <p>Click below link:</p>
//         <a href="${resetURL}">${resetURL}</a>
//       `,
//     });

//     return res.status(200).json({
//       message: "Reset link sent to email",
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Forgot password failed",
//       success: false,
//       error: error.message,
//     });
//   }
// });

//reset-password
// AuthRouter.post("/reset-password/:token", async (req, res) => {
//   const { password } = req.body;

//   if (!password) {
//     return res.status(400).json({
//       message: "Password is required",
//       success: false,
//     });
//   }

//   try {
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     const user = await UserModel.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid or expired token",
//         success: false,
//       });
//     }

//     user.password = await bcrypt.hash(password, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     return res.status(200).json({
//       message: "Password reset successful",
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Reset password failed",
//       success: false,
//       error: error.message,
//     });
//   }
// });

// Google login
// AuthRouter.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// Google callback
// AuthRouter.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     const token = jwt.sign(
//       { id: req.user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES }
//     );

//     res.redirect(
//       `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
//     );
//   }
// );

//get user by id
// AuthRouter.get("/user/:id", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       message: "User found",
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to retrieve user",
//       success: false,
//       error: error.message,
//     });
//   }
// });

module.exports = AuthRouter;