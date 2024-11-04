const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Hello World function
exports.helloWorld = onRequest((req, res) => {
  logger.info("Hello logs!", {structuredData: true});
  res.send("Hello from Firebase!");
});
