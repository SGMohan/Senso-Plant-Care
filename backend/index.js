const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const AuthRouter = require('./controllers/auth.controller.js');
const PlantRouter = require('./controllers/plant.controller.js');
const PlantConversationRouter = require('./controllers/plantconversation.controller.js');
const { GoogleAuth } = require('google-auth-library');

dotenv.config();


connectDB();


const app = express();


// CORS must come before routes
app.use(cors({
  origin: [
    'http://localhost:8081',
    'http://192.168.1.3:8081', 
    'exp://192.168.1.3:8081',
    'exp://localhost:8081',
    /^exp:\/\/.*$/,  // Allow all Expo origins
    /^http:\/\/192\.168\..*$/,  // Allow all local network IPs
    /^http:\/\/10\..*$/,  // Allow 10.x.x.x network
    /^http:\/\/172\..*$/  // Allow 172.x.x.x network
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", AuthRouter);
// app.use("/api/plant", PlantRouter);
// app.use("/plant", PlantConversationRouter);

// Start the server
app.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`);
});

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "Welcome to the Senso Plant Care API",
    success: true,
    timestamp: new Date().toISOString()
  });
});

app.get("/api", (_, res) => {
  return res.status(200).json({
    message: "Senso Plant Care API v1.0",
    success: true,
    endpoints: {
      auth: "/api/auth",
      register: "/api/auth/register",
      login: "/api/auth/login",
      logout: "/api/auth/logout",
      // forgotPassword: "/api/auth/forgot-password",
      // resetPassword: "/api/auth/reset-password/:token",
      // googleAuth: "/api/auth/google",
      // googleCallback: "/api/auth/google/callback",
      // plant: "/api/plant",
      // identify: "/api/plant/identify"
    }
  });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal server error',
    success: false,
    error: err.message
  });
});





