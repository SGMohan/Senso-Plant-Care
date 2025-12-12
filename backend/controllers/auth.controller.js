import express from 'express';
import UserModel from '../models/auth.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.middleware.js';

const AuthRouter = express.Router();

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
        email: user.email 
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
//reset-password
//get user by id 

export default AuthRouter;