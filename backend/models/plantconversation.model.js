// const mongoose = require("mongoose");

// const plantConversationSchema = new mongoose.Schema(
//   {
//     plantId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "plants",
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     messages: [
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
//   { timestamps: true }
// );

// const ConversationModel = mongoose.model("plantconversation", plantConversationSchema);
// console.log("Plant Conversation Model Created Successfully", ConversationModel);
// module.exports = ConversationModel;
