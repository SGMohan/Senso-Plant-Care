// const express = require("express");
// const multer = require("multer");
// const PlantModel = require("../models/plant.model.js");
// const { verifyToken } = require("../middleware/auth.middleware.js");
// require("dotenv").config();

// const upload = multer({ 
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files allowed'));
//     }
//   }
// });

// const PlantRouter = express.Router();

// // ================= HEALTH =================
// PlantRouter.get("/", (req, res) => {
//   res.json({
//     message: "Plant API working",
//     success: true,
//   });
// });

// // ================= IDENTIFY (AUTO SAVE IF SUCCESS) =================
// PlantRouter.post("/identify", verifyToken, upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "Image required",
//         success: false,
//       });
//     }

//     // 🔹 Convert image to base64
//     const base64Image = req.file.buffer.toString("base64");

//     // 🔹 Plant.id request body
//     const requestBody = {
//       images: [base64Image],
//       classification_level: "species",
//       similar_images: true,
//       health: "auto",
//       latitude: req.body.latitude,     // optional
//       longitude: req.body.longitude,   // optional
//     };

//     const response = await fetch(process.env.PLANT_ID_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Api-Key": process.env.PLANT_ID_API_KEY,
//       },
//       body: JSON.stringify(requestBody),
//     });

//     const data = await response.json();

//     // 🔴 AI FAIL → NO SUGGESTIONS
//     const suggestions = data?.result?.classification?.suggestions || [];

//     if (suggestions.length === 0) {
//       return res.status(200).json({
//         message: "AI identification failed. Please add plant manually.",
//         success: false,
//         requireManual: true,
//       });
//     }

//     // 🟢 AI SUCCESS → AUTO SAVE
//     const top = suggestions[0];

//     const savedPlant = await PlantModel.create({
//       userId: req.user.id,
//       plantName: top.name, // REQUIRED FIELD ✅
//       scientificName: top.name,
//       confidence: top.probability,
//       image: data.input.images?.[0],
//       identificationData: top,
//     });

//     return res.status(201).json({
//       message: "Plant identified and saved automatically",
//       success: true,
//       autoSaved: true,
//       data: savedPlant,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Identification failed. Please add plant manually.",
//       success: false,
//       requireManual: true,
//       error: err.message,
//     });
//   }
// });

// // ================= SAVE (MANUAL ONLY) =================
// PlantRouter.post("/save", verifyToken, async (req, res) => {
//   try {
//     const {
//       plantName,
//       scientificName,
//       commonNames,
//       confidence,
//       image,
//       careInstructions,
//       identificationData,
//     } = req.body;

//     // 🔴 REQUIRED CHECK
//     if (!plantName) {
//       return res.status(400).json({
//         message: "plantName is required for manual save",
//         success: false,
//       });
//     }

//     const plant = await PlantModel.create({
//       userId: req.user.id,
//       plantName,
//       scientificName,
//       commonNames,
//       confidence,
//       image,
//       careInstructions,
//       identificationData,
//     });

//     return res.status(201).json({
//       message: "Plant saved manually",
//       success: true,
//       data: plant,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Manual save failed",
//       success: false,
//       error: err.message,
//     });
//   }
// });

// // ================= GET MY PLANTS =================
// PlantRouter.get("/my_plants", verifyToken, async (req, res) => {
//   try {
//     const plants = await PlantModel.find({
//       userId: req.user.id,
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: plants,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch plants",
//       success: false,
//       error: err.message,
//     });
//   }
// });

// // ================= GET PLANT BY ID =================
// PlantRouter.get("/:plantId", verifyToken, async (req, res) => {
//   try {
//     const plant = await PlantModel.findOne({
//       _id: req.params.plantId,
//       userId: req.user.id,
//     });

//     if (!plant) {
//       return res.status(404).json({
//         message: "Plant not found",
//         success: false,
//       });
//     }

//     res.json({
//       success: true,
//       data: plant,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch plant",
//       success: false,
//       error: err.message,
//     });
//   }
// });

// // ================= PLANT HEALTH ASSESSMENT (OFFICIAL ENDPOINT) =================
// PlantRouter.post(
//   "/:plantId/health_assessment",
//   verifyToken,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({
//           success: false,
//           message: "Image required for health assessment",
//         });
//       }

//       // ✅ Verify plant belongs to user
//       const plant = await PlantModel.findOne({
//         _id: req.params.plantId,
//         userId: req.user.id,
//       });

//       if (!plant) {
//         return res.status(404).json({
//           success: false,
//           message: "Plant not found",
//         });
//       }

//       const base64Image = req.file.buffer.toString("base64");

//       // 🔥 EXACT payload same as curl
//       const requestBody = {
//         images: [`data:image/jpeg;base64,${base64Image}`],
//         latitude: req.body.latitude,     // optional
//         longitude: req.body.longitude,   // optional
//         similar_images: true,
//       };

//       const response = await fetch(
//         "https://plant.id/api/v3/health_assessment",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Api-Key": process.env.PLANT_ID_API_KEY,
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       const data = await response.json();

//       // 🚀 RETURN FULL RESPONSE AS-IS
//       return res.json(data);

//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         error: err.message,
//       });
//     }
//   }
// );


// // ================= DELETE =================
// PlantRouter.delete("/delete/:id", verifyToken, async (req, res) => {
//   try {
//     const plant = await PlantModel.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id,
//     });

//     if (!plant) {
//       return res.status(404).json({
//         message: "Plant not found",
//         success: false,
//       });
//     }

//     res.json({
//       message: "Plant deleted",
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Delete failed",
//       success: false,
//       error: err.message,
//     });
//   }
// });

// module.exports = PlantRouter;
