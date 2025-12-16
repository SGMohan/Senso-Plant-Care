// const mongoose = require("mongoose");

// const plantSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     plantName: {
//       type: String,
//       required: true,
//     },
//     scientificName: String,
//     commonNames: [String],
//     confidence: Number,
//     image: String,
//     careInstructions: {
//       watering: String,
//       light: String,
//       temperature: String,
//     },
//     identificationData: mongoose.Schema.Types.Mixed,
//     assistantConversation: [
//       {
//         role: {
//           type: String,
//           enum: ["user", "assistant"],
//           required: true,
//         },
//         message: {
//           type: String,
//           required: true,
//         },
//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// const PlantModel = mongoose.model("plants", plantSchema);
// console.log("Plant Model Created Successfully", PlantModel);
// module.exports = PlantModel;