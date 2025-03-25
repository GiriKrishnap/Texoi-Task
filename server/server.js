const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const connectDB = require("./config/db");

const app = express();


const allowedOrigins = ["https://texoi-task.vercel.app"]; // Replace with your frontend URL

app.use(
    cors({
        origin: allowedOrigins,
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
    })
);
//Handle Preflight Requests
app.options("*", cors()); // This ensures all OPTIONS requests pass

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", authRoutes);
app.use("/questions", testRoutes);
app.use("/feedback", feedbackRoutes);

// Error handling middleware
app.use(errorHandler);

// Handle 404 routes
app.use("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

// Export the app for Netlify
module.exports = app;
