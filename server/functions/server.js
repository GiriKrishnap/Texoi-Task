const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const connectDB = require("./config/db");
const serverless = require("serverless-http");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/.netlify/functions/server/auth", authRoutes);
app.use("/.netlify/functions/server/questions", testRoutes);
app.use("/.netlify/functions/server/feedback", feedbackRoutes);

// Error handling middleware
app.use(errorHandler);

// Handle 404 routes
app.use("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

// Export the app as a serverless function
module.exports.handler = serverless(app);
