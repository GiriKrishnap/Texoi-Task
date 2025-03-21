// Entry point for the server
const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

// Connect to database
connectDB();

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