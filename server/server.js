const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const config = require('./config/config');
const connectDB = require('./config/db');

// Initialize express app
const app = express();
// Middleware
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/questions', testRoutes);
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


// Start the server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});