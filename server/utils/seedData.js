const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Question = require('../models/questionModel');
const { questions } = require('./questions');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();


// Import data to DB
const importData = async () => {
    try {
        // Clear existing data
        await Question.deleteMany();

        // Insert new data
        await Question.insertMany(questions);

        console.log('Data imported successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Delete all data from DB
const deleteData = async () => {
    try {
        await Question.deleteMany();

        console.log('Data destroyed successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Run script based on command line argument
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log('Please use correct command: -i (import) or -d (delete)');
    process.exit();
}