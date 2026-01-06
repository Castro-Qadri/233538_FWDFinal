# 💪 Fitness Tracker - MERN Stack Application

A full-stack web application built with MongoDB, Express.js, React, and Node.js that helps you track your daily workout activities and monitor your fitness progress.

## � Project Overview

The Fitness Tracker is a modern, responsive single-page application that allows users to:

- **Log workout sessions** with exercise name, duration, calories burned, and date
- **View complete workout history** in an organized card layout
- **Update workout records** to keep track of progress
- **Delete old workouts** with confirmation to prevent accidents
- **See workout statistics** including total workouts, total duration, total calories, and averages
- **Access from any device** - mobile phones, tablets, or desktop computers

The application features a beautiful purple-themed gradient design with smooth animations and provides an excellent user experience across all screen sizes.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Running the Application](#running-the-application)
- [How to Use](#how-to-use-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Features](#features)

## ✨ Features

- **Create workouts** with full validation
- **View workout history** with statistics dashboard
- **Update existing workouts** in edit mode
- **Delete workouts** with confirmation
- **Real-time statistics** showing totals and averages
- **Responsive design** for mobile, tablet, and desktop
- **Form validation** with visual error messages
- **Loading states** and error handling
- **Success notifications** with auto-dismiss
- **RESTful API** with Express.js
- **MongoDB database** integration with Mongoose
- **Security middleware** (helmet, cors)
- **Request logging** with morgan

## 🛠 Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.x** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 7.x** - MongoDB object modeling
- **CORS** - Cross-Origin Resource Sharing middleware
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variable management

### Frontend
- **React 19.2.3** - JavaScript library for building user interfaces
- **React Router DOM 7.11.0** - Client-side routing
- **Axios 1.13.2** - HTTP client for API requests
- **CSS3** - Modern styling with Flexbox and Grid
- **React Scripts 5.0.1** - Create React App tooling

## 📦 Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - You can use either:
  - **MongoDB Atlas** (cloud database) - [Sign up here](https://www.mongodb.com/cloud/atlas) - **Recommended**
  - **Local MongoDB installation** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## 🔧 Installation Steps

Follow these simple steps to get the project running on your computer:

### Step 1: Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/your-username/fitness-tracker.git
cd fitness-tracker
```

### Step 2: Set Up the Backend

1. **Install backend dependencies:**

```bash
npm install
```

This will install all the necessary packages for the backend server.

2. **Configure environment variables:**

Create a file named `.env` in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Open the `.env` file and update it with your MongoDB connection string:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
CLIENT_URL=http://localhost:3000
```

**To get your MongoDB connection string:**
- If using MongoDB Atlas (recommended):
  1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a free account and a new cluster
  3. Click "Connect" → "Connect your application"
  4. Copy the connection string
  5. Replace `<password>` with your database user password
  6. Replace `<dbname>` with `fitness_tracker`

- If using local MongoDB:
  ```
  MONGODB_URI=mongodb://localhost:27017/fitness_tracker
  ```

### Step 3: Set Up the Frontend

1. **Navigate to the client folder:**

```bash
cd client
```

2. **Install frontend dependencies:**

```bash
npm install
```

This will install all the necessary packages for the React frontend.

## ▶️ Running the Application

You have two options to run the application:

### Option 1: Run Both Frontend and Backend Together (Recommended)

From the **root directory**, run:

```bash
npm run dev
```

This single command will start both the backend server and the frontend development server at the same time.

- **Backend** will run on: http://localhost:5000
- **Frontend** will run on: http://localhost:3000

Your default web browser should automatically open to http://localhost:3000

### Option 2: Run Frontend and Backend Separately

If you prefer to run them separately:

**Terminal 1 - Start the Backend:**
```bash
# From root directory
npm start
```

**Terminal 2 - Start the Frontend:**
```bash
# From root directory
cd client
npm start
```

## 🎯 How to Use the Application

Once the application is running, here's what you can do:

### 1. **Add a New Workout**

- Fill in the workout form at the top of the page:
  - **Exercise Name:** What exercise did you do? (e.g., Running, Push-ups, Yoga)
  - **Duration:** How many minutes did you exercise? (e.g., 30)
  - **Calories Burned:** How many calories did you burn? (e.g., 200)
  - **Date:** When did you do this workout? (pick from calendar)
- Click the **"Add Workout"** button
- You'll see a success message and your workout will appear in the list below

### 2. **View Your Workout History**

- Scroll down to see all your workouts displayed as cards
- Each card shows:
  - Exercise name and date
  - Duration in minutes
  - Calories burned
  - Two action buttons (Update and Delete)
- At the top, you'll see statistics showing:
  - Total number of workouts
  - Total time spent exercising
  - Total calories burned
  - Average values per workout

### 3. **Update a Workout**

- Click the **"Update"** button (with ✏️ icon) on any workout card
- The form at the top will fill with that workout's information
- Change any information you want
- Click **"Update Workout"** to save your changes
- Click **"Cancel"** if you change your mind

### 4. **Delete a Workout**

- Click the **"Delete"** button (with 🗑️ icon) on any workout card
- A confirmation message will pop up asking "Are you sure?"
- Click **"OK"** to delete or **"Cancel"** to keep it
- The workout will be removed from your history

## 📱 Responsive Design

The application works beautifully on:

- **📱 Mobile phones** (iPhone, Android) - Single column layout
- **📱 Tablets** (iPad, Android tablets) - Two column layout
- **💻 Desktop computers** (PC, Mac) - Three column layout with hover effects

Try resizing your browser window to see how it adapts!

## 🔌 API Endpoints

The backend provides these RESTful API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workouts` | Get all workouts |
| GET | `/api/workouts/:id` | Get a specific workout |
| POST | `/api/workouts` | Create a new workout |
| PUT | `/api/workouts/:id` | Update a workout |
| DELETE | `/api/workouts/:id` | Delete a workout |
| GET | `/api/workouts/stats` | Get workout statistics |

### Request Examples

**Create a new workout (POST /api/workouts):**
```json
{
  "exerciseName": "Running",
  "duration": 30,
  "caloriesBurned": 200,
  "date": "2026-01-06"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "exerciseName": "Running",
    "duration": 30,
    "caloriesBurned": 200,
    "date": "2026-01-06T00:00:00.000Z",
    "createdAt": "2026-01-06T10:30:00.000Z",
    "updatedAt": "2026-01-06T10:30:00.000Z"
  },
  "message": "Workout created successfully"
}
```

## � Project Structure

```
fitness-tracker/
├── client/                      # React frontend application
│   ├── public/                  # Public assets
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── WorkoutForm.js   # Form for creating/editing workouts
│   │   │   ├── WorkoutForm.css
│   │   │   ├── WorkoutList.js   # Display workout history
│   │   │   └── WorkoutList.css
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.js     # Main dashboard page
│   │   │   └── Dashboard.css
│   │   ├── services/            # API service layer
│   │   │   └── workoutService.js
│   │   ├── App.js               # Root component with routing
│   │   ├── App.css
│   │   ├── index.js             # React entry point
│   │   └── index.css
│   └── package.json             # Frontend dependencies
│
├── controllers/                 # Request handlers
│   ├── auth.js
│   ├── users.js
│   └── workouts.js              # Workout CRUD operations
├── models/                      # MongoDB models
│   ├── User.js
│   └── Workout.js               # Workout schema
├── routes/                      # API routes
│   ├── auth.js
│   ├── users.js
│   └── workouts.js              # Workout routes
├── middleware/                  # Custom middleware
│   └── auth.js
├── utils/                       # Utility functions
│   ├── asyncHandler.js
│   └── errorResponse.js
├── server.js                    # Express server setup
├── .env                         # Environment variables (not in git)
├── .env.example                 # Example environment file
├── package.json                 # Backend dependencies
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

## 🗄️ Database Schema

### Workout Model

```javascript
{
  exerciseName: String (required, 2-100 characters),
  duration: Number (required, 1-1440 minutes),
  caloriesBurned: Number (required, 1-10000 calories),
  date: Date (required, cannot be future date),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🐛 Troubleshooting

### Problem: "Cannot connect to MongoDB"

**Solution:**
- Check your internet connection if using MongoDB Atlas
- Verify your MongoDB connection string in `.env` file
- Make sure you replaced `<password>` with your actual password
- If using local MongoDB, make sure MongoDB service is running

### Problem: "Port 5000 already in use"

**Solution:**
```bash
# Windows PowerShell
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change the port in .env file
PORT=5001
```

### Problem: "Port 3000 already in use"

**Solution:**
- Stop other React apps running on port 3000
- Or the terminal will ask if you want to use a different port (say yes)

### Problem: Frontend can't connect to backend

**Solution:**
- Make sure the backend is running on port 5000
- Check that `proxy` is set in `client/package.json`:
  ```json
  "proxy": "http://localhost:5000"
  ```
- Try restarting both servers

### Problem: Changes not showing up

**Solution:**


## 📜 Available Scripts

### Root Directory
- `npm start` - Start the production server
- `npm run server` - Start the backend development server with nodemon
- `npm run client` - Start the React development server
- `npm run dev` - Run both backend and frontend concurrently

### Client Directory
- `npm start` - Start React development server
- `npm run build` - Build React app for production
- `npm test` - Run React tests

## 🔒 Security Features

- **Helmet.js** - Secures HTTP headers
- **CORS** - Configured to only allow frontend origin
- **Input Validation** - All data is validated on both frontend and backend
- **MongoDB Injection Protection** - Mongoose sanitizes queries
- **Environment Variables** - Sensitive data kept in `.env` file

## 🧪 Testing the Application

### Test Creating a Workout:
1. Fill in all form fields with valid data
2. Click "Add Workout"
3. Check that the workout appears in the list below

### Test Validation:
1. Try submitting the form without filling all fields
2. You should see red error messages
3. Try entering invalid values (e.g., 0 minutes, future date)

### Test Responsive Design:
1. Open Chrome DevTools (F12 key)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Select different devices (iPhone, iPad, etc.)
4. Test all features on each size

### Test CRUD Operations:
1. **Create:** Add a new workout
2. **Read:** Refresh the page and see workouts load
3. **Update:** Edit a workout and verify changes
4. **Delete:** Remove a workout and confirm it's gone

## 📦 Building for Production

To create an optimized production build of the frontend:

```bash
cd client
npm run build
```

This creates a `build` folder with optimized files ready to deploy to a web server.

## 🚀 Deployment

### Frontend Deployment (Netlify, Vercel, etc.):
1. Build the production version: `npm run build`
2. Deploy the `client/build` folder to your hosting service
3. Update environment variables on the hosting platform

### Backend Deployment (Heroku, Railway, Render, etc.):
1. Push your code to GitHub
2. Connect your repository to your hosting service
3. Set environment variables in the hosting dashboard
4. Deploy!

### Full Stack Deployment:
- Deploy frontend and backend separately
- Update `CLIENT_URL` in backend `.env`
- Update API URL in frontend if needed

## � Repository

**GitHub Repository:** https://github.com/Castro-Qadri/233538_FWDFinal.git

## 📄 License

This project is created for educational purposes as part of a MERN stack learning assignment.

## 🙏 Acknowledgments

- Built with the MERN stack (MongoDB, Express.js, React, Node.js)
- Icons: Emoji icons for a modern, friendly look
- Design inspiration: Modern fitness apps
- Developed as a full-stack web development project

## 📞 Support

If you encounter any problems or have questions:

1. Check the Troubleshooting section above
2. Review the documentation files in the project
3. Make sure all dependencies are installed correctly
4. Verify your MongoDB connection

## 🎯 Project Status

✅ **Status:** Complete and fully functional  
✅ **Version:** 1.0.0  
✅ **Last Updated:** January 6, 2026

## 📝 Quick Start Summary

```bash
# 1. Clone the repository
git clone https://github.com/Castro-Qadri/233538_FWDFinal.git
cd 233538_FWDFinal

# 2. Install dependencies
npm install
cd client && npm install && cd ..

# 3. Create .env file and add your MongoDB connection

# 4. Start the application
npm run dev

# 5. Open http://localhost:3000 in your browser
```

---

**Enjoy tracking your fitness journey! 💪🏃‍♂️🔥**

---

*Built with ❤️ using the MERN Stack*


- Password hashing with bcrypt
- JWT authentication
- HTTP security headers with helmet
- CORS protection
- Input validation
- XSS protection
- Rate limiting ready (can be added)

## 🤝 Contributing

Feel free to fork this project and make your own changes.

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Student ID: 233538 - Final Paper Project

## 🔗 Links

- **GitHub Repository:** https://github.com/Castro-Qadri/233538_FWDFinal.git
- **MongoDB Atlas:** cluster0.ykzoxde.mongodb.net

## 📞 Support

For support, please open an issue in the repository.

---

**Note:** The project is configured with MongoDB Atlas cloud database. No local MongoDB installation required!
