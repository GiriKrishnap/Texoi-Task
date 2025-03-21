# MERN Authentication & Test System

A full-stack MERN application featuring user authentication and an MCQ-based test system with feedback submission.

## 🚀 Features

- **User Authentication**
  - Register/Login with Mobile Number & Password
  - Password hashing with bcrypt
  - JWT token-based authentication
  - User role selection (Student/Employee)

- **MCQ Test System**
  - 5-question test with multiple-choice answers
  - Automatic score calculation (5 marks per question)
  - Display of final results

- **Feedback Collection**
  - Emoji-based feedback submission
  - Stored in database for future analysis


## 💻 Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Router for navigation
- Form validation using useForm
- Axios for API requests

### Backend
- Node.js + Express.js
- RESTful API architecture
- MongoDB with Mongoose
- JWT for authentication
- bcrypt.js for password hashing
- CORS & dotenv for security

## 🏗️ Project Structure

```

├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── assets/         # assets (image)
│   │   ├── components/     # Reusable components
│   │   ├── layout/         # header components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                # Environment variables
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Node.js application
│   ├── config/             # db configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # service logics
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GiriKrishnap/Texoi-Task.git
   cd Texoi-Task
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

2. Create a `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:5000/
   ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token

### Test
- `GET /test/questions` - Get test questions
- `POST /test/submit` - Submit test answers

### Feedback
- `POST /feedback` - Submit user feedback


## 🚢 Deployment

### Frontend
- Deployed on Vercel

### Backend
- Deployed on Vercel

### Database
- MongoDB Atlas


## 👨‍💻 Author

Giri krishna

---

Made with ❤️ using the MERN stack (MongoDB, Express, React, Node.js)