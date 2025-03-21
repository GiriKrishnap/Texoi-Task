const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Question = require('../models/questionModel');



const questions = [
    {
        text: 'What does HTML stand for?',
        options: [
            {
                text: 'Hyper Text Markup Language',
                isCorrect: true,
            },
            {
                text: 'Home Tool Markup Language',
                isCorrect: false,
            },
            {
                text: 'Hyperlinks and Text Markup Language',
                isCorrect: false,
            },
            {
                text: 'Hyper Technical Modern Language',
                isCorrect: false,
            },
        ],
        explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for creating Web pages.',
        pointValue: 5,
    },
    {
        text: 'Which of the following is a JavaScript framework?',
        options: [
            {
                text: 'HTML',
                isCorrect: false,
            },
            {
                text: 'CSS',
                isCorrect: false,
            },
            {
                text: 'React',
                isCorrect: true,
            },
            {
                text: 'SQL',
                isCorrect: false,
            },
        ],
        explanation: 'React is a JavaScript library developed by Facebook for building user interfaces.',
        pointValue: 5,
    },
    {
        text: 'Which of the following is NOT a valid HTTP method?',
        options: [
            {
                text: 'GET',
                isCorrect: false,
            },
            {
                text: 'POST',
                isCorrect: false,
            },
            {
                text: 'SEND',
                isCorrect: true,
            },
            {
                text: 'DELETE',
                isCorrect: false,
            },
        ],
        explanation: 'SEND is not a valid HTTP method. The standard HTTP methods include GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, etc.',
        pointValue: 5,
    },
    {
        text: 'Which database is a NoSQL database?',
        options: [
            {
                text: 'MySQL',
                isCorrect: false,
            },
            {
                text: 'PostgreSQL',
                isCorrect: false,
            },
            {
                text: 'MongoDB',
                isCorrect: true,
            },
            {
                text: 'Oracle',
                isCorrect: false,
            },
        ],
        explanation: 'MongoDB is a NoSQL database that uses JSON-like documents with optional schemas.',
        pointValue: 5,
    },
    {
        text: 'What does JWT stand for?',
        options: [
            {
                text: 'JSON Web Token',
                isCorrect: true,
            },
            {
                text: 'Java Web Toolkit',
                isCorrect: false,
            },
            {
                text: 'JavaScript Working Tokens',
                isCorrect: false,
            },
            {
                text: 'Joint Web Technologies',
                isCorrect: false,
            },
        ],
        explanation: 'JWT stands for JSON Web Token. It is a compact, URL-safe means of representing claims to be transferred between two parties.',
        pointValue: 5,
    },
    {
        text: 'Which CSS property is used to change the text color?',
        options: [
            {
                text: 'background-color',
                isCorrect: false,
            },
            {
                text: 'color',
                isCorrect: true,
            },
            {
                text: 'font-color',
                isCorrect: false,
            },
            {
                text: 'text-color',
                isCorrect: false,
            },
        ],
        explanation: 'The "color" property in CSS is used to change the text color.',
        pointValue: 5,
    },
    {
        text: 'Which keyword is used to declare a variable in JavaScript?',
        options: [
            {
                text: 'var',
                isCorrect: false,
            },
            {
                text: 'let',
                isCorrect: false,
            },
            {
                text: 'const',
                isCorrect: false,
            },
            {
                text: 'All of the above',
                isCorrect: true,
            },
        ],
        explanation: 'JavaScript allows declaring variables using var, let, and const, each with different scope rules.',
        pointValue: 5,
    },
    {
        text: 'Which of the following is a front-end framework?',
        options: [
            {
                text: 'Node.js',
                isCorrect: false,
            },
            {
                text: 'Express.js',
                isCorrect: false,
            },
            {
                text: 'Angular',
                isCorrect: true,
            },
            {
                text: 'Django',
                isCorrect: false,
            },
        ],
        explanation: 'Angular is a front-end framework developed by Google for building web applications.',
        pointValue: 5,
    },
    {
        text: 'Which of the following is NOT a programming language?',
        options: [
            {
                text: 'Python',
                isCorrect: false,
            },
            {
                text: 'Java',
                isCorrect: false,
            },
            {
                text: 'HTML',
                isCorrect: true,
            },
            {
                text: 'C++',
                isCorrect: false,
            },
        ],
        explanation: 'HTML is not a programming language; it is a markup language used to structure web pages.',
        pointValue: 5,
    },
    {
        text: 'Which operator is used for strict equality comparison in JavaScript?',
        options: [
            {
                text: '==',
                isCorrect: false,
            },
            {
                text: '===',
                isCorrect: true,
            },
            {
                text: '!=',
                isCorrect: false,
            },
            {
                text: '!==',
                isCorrect: false,
            },
        ],
        explanation: 'The "===" operator in JavaScript checks both value and type, making it a strict equality comparison operator.',
        pointValue: 5,
    }
];

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