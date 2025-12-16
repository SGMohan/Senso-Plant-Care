

// const verifyPlantApiKey = (req, res, next) => {
//   const apiKey = req.headers["x-plant-api-key"];

//   if (!apiKey) {
//     return res.status(401).json({
//       message: "Plant API key missing",
//       success: false,
//     });
//   }

//   if (apiKey !== process.env.PLANT_API_KEY) {
//     return res.status(403).json({
//       message: "Invalid Plant API key",
//       success: false,
//     });
//   }

//   next();
// };

// module.exports = { verifyPlantApiKey };
