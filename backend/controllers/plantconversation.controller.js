// const express = require("express");
// const PlantConversation = require("../models/plantconversation.model");
// const PlantModel = require("../models/plant.model");
// const { verifyToken } = require("../middleware/auth.middleware");
// const { verifyPlantApiKey } = require("../middleware/plant.middleware");

// const PlantConversationRouter = express.Router();

// /**
//  * 🔐 GLOBAL PROTECTION
//  * ALL conversation routes require:
//  * - JWT
//  * - Plant API Key
//  */
// PlantConversationRouter.use(verifyToken);
// PlantConversationRouter.use(verifyPlantApiKey);

// /**
//  * ======================================================
//  * ASK QUESTION (ADD TO CONVERSATION)
//  * POST /plant/:plantId/assistant/question
//  * ======================================================
//  */
// PlantConversationRouter.post(
//   "/:plantId/assistant/question",
//   async (req, res) => {
//     try {
//       const { plantId } = req.params;
//       const { question } = req.body;

//       if (!question) {
//         return res.status(400).json({
//           success: false,
//           message: "Question is required",
//         });
//       }

//       // ✅ Check plant ownership
//       const plant = await PlantModel.findOne({
//         _id: plantId,
//         userId: req.user.id,
//       });

//       if (!plant) {
//         return res.status(404).json({
//           success: false,
//           message: "Plant not found",
//         });
//       }

//       // ✅ Get / Create conversation
//       let conversation = await PlantConversation.findOne({
//         plantId,
//         userId: req.user.id,
//       });

//       if (!conversation) {
//         conversation = await PlantConversation.create({
//           plantId,
//           userId: req.user.id,
//           messages: [],
//         });
//       }

//       // 🔥 TEMP ANSWER (later Gemini / Plant.id chatbot)
//       const answer = "THIS PLANT IS GENERALLY GROWN FOR ORNAMENTAL PURPOSES.";

//       conversation.messages.push(
//         { role: "user", message: question },
//         { role: "assistant", message: answer }
//       );

//       await conversation.save();

//       return res.json({
//         success: true,
//         question,
//         answer,
//       });
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         error: err.message,
//       });
//     }
//   }
// );

// /**
//  * ======================================================
//  * GET CONVERSATION
//  * GET /plant/:plantId/assistant/conversation
//  * ======================================================
//  */
// PlantConversationRouter.get(
//   "/:plantId/assistant/conversation",
//   async (req, res) => {
//     try {
//       const conversation = await PlantConversation.findOne({
//         plantId: req.params.plantId,
//         userId: req.user.id,
//       });

//       return res.json({
//         success: true,
//         messages: conversation?.messages || [],
//       });
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         error: err.message,
//       });
//     }
//   }
// );

// /**
//  * ======================================================
//  * CLEAR CONVERSATION
//  * DELETE /plant/:plantId/assistant/conversation
//  * ======================================================
//  */
// PlantConversationRouter.delete(
//   "/:plantId/assistant/conversation",
//   async (req, res) => {
//     try {
//       await PlantConversation.findOneAndDelete({
//         plantId: req.params.plantId,
//         userId: req.user.id,
//       });

//       return res.json({
//         success: true,
//         message: "Plant assistant conversation cleared",
//       });
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         error: err.message,
//       });
//     }
//   }
// );

// module.exports = PlantConversationRouter;
