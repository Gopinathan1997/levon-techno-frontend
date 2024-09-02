Student-Teacher Management System

This project is a simple Student-Teacher Management System built using Express.js, SQLite, and React.js. The system allows users to manage students and teachers, view lists of both, and perform login operations.
Features

    User Roles: Support for student and teacher roles.
    User Management: Ability to create new users (students and teachers) with associated roles and additional details (grade for students, subject for teachers).
    Data Display: Lists all students and teachers separately on the frontend.
    Login: Basic login functionality for users.

Project Structure

bash

- backend/
  - database.db          # SQLite database file
  - index.js            # Express server setup and API routes

- frontend/
  - src/
    - components/
      - index.js     # React component for displaying user dashboard
      - index.js     # React component for displaying Login dashboard
      - NewUserForm.js   # React component for creating new users
    - index.js           # Main entry point for React application
    - App.js             # Main application component

- README.md              # Project documentation

Getting Started
Prerequisites

    Node.js (v14 or later)
    npm (v6 or later)

Installation

    Clone the repository:

    bash

git clone https://github.com/your-username/student-teacher-management.git
cd student-teacher-management

Backend Setup:

bash

    cd backend
    npm install
    node server.js

This will start the Express server on http://localhost:3001.

Frontend Setup:

bash

    cd ../frontend
    npm install
    npm start

    This will start the React development server on http://localhost:3000.

Usage

    Create Users: Use the NewUserForm component in the frontend to create new users. You can specify whether the user is a student or a teacher and provide additional details accordingly.

    View Users: The Scheduler component displays the list of students and teachers.

    Login: Users can log in using their username, password, and role.

API Endpoints

    POST /login: Authenticate users.
    GET /students: Retrieve all students.
    GET /teachers: Retrieve all teachers.
    POST /students: Create a new student.
    POST /teachers: Create a new teacher.

Technologies Used

    Backend: Node.js, Express.js, SQLite
    Frontend: React.js
