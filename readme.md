# MERN Authentication & Test System - Backend

A RESTful API backend built with Node.js, Express, and MongoDB for a user authentication system with an MCQ-based test and feedback submission.

## Features

- User authentication (register/login with mobile number and password)
- JWT token-based authentication
- User role selection (Student/Employee)
- 5-question MCQ test system
- Score calculation (5 marks per question)
- Emoji-based feedback submission
- Clean architecture with separation of concerns

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
│
├── config/                 # Configuration files
│   ├── db.js               # Database connection
│   └── config.js           # Environment variables & app config
│
├── controllers/            # Request handlers
│   ├── authController.js   # Authentication logic
│   ├── testController.js   # Test management
│   └── feedbackController.js # Feedback logic
│
├── middlewares/            # Custom middlewares
│   ├── authMiddleware.js   # JWT verification middleware
│   └── errorMiddleware.js  # Error handling middleware
│
├── models/                 # Database models
│   ├── userModel.js        # User schema
│   ├── questionModel.js    # Question schema
│   ├── testResultModel.js  # Test results schema
│   └── feedbackModel.js    # Feedback schema
│
├── routes/                 # API routes
│   ├── authRoutes.js       # Auth endpoints
│   ├── testRoutes.js       # Test endpoints
│   └── feedbackRoutes.js   # Feedback endpoints
│
├── services/               # Business logic layer
│   ├── authService.js      # Auth service
│   ├── testService.js      # Test service 
│   └── feedbackService.js  # Feedback service
│
├── utils/                  # Utility functions
│   ├── jwtUtils.js         # JWT helper functions
│   ├── validators.js       # Validation helpers
│   └── seedData.js         # Database seeder
│
├── app.js                  # Express app setup
├── server.js               # Server entry point
└── .env                    # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   ```

2. Install dependencies
   ```
   cd server
   npm install
   ```

3. Set up environment variables
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your MongoDB connection string and JWT secret

4. Seed the database with sample questions
   ```
   node utils/seedData.js -i
   ```

5. Start the server
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile (protected)

### Tests

- `GET /api/tests/questions` - Get test questions (protected)
- `POST /api/tests/submit` - Submit test answers (protected)
- `GET /api/tests/:id` - Get specific test result (protected)
- `GET /api/tests` - Get all user's tests (protected)

### Feedback

- `POST /api/feedback` - Submit feedback for a test (protected)
- `GET /api/feedback/:testId` - Get feedback for a test (protected)

## Authentication

The API uses JWT (JSON Web Token) for authentication. To access protected routes:

1. Register or login to get a token
2. Include the token in the request header:
   ```
   Authorization: Bearer <token>
   ```

## Data Models

### User
- fullName
- email
- mobileNumber
- currentStatus (Student/Employee)
- password (hashed)

### Question
- text
- options (array of text and isCorrect)
- explanation
- pointValue

### TestResult
- user (reference to User)
- answers (array of question, selectedOption, isCorrect)
- totalScore
- totalQuestions
- completedAt

### Feedback
- user (reference to User)
- testResult (reference to TestResult)
- emoji
- comment

## License

This project is licensed under the MIT License.