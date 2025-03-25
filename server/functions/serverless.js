const serverless = require("serverless-http");
const app = require("../server"); // Import the modified Express app

module.exports.handler = serverless(app);
