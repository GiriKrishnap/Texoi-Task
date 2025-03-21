const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
    origin: ['https://texoi-task-ni1fgs84x-giri-krishna-ps-projects.vercel.app', 'http://localhost:5001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/tests', testRoutes);
app.use('/feedback', feedbackRoutes);


// Error handling middleware
app.use(errorHandler);

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

module.exports = app;