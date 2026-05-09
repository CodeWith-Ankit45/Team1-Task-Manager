# Team Task Manager

A premium full-stack task management application built with **React (Vite)**, **Node.js (Express)**, and **MongoDB**.

## 🚀 Features
- **Role-Based Access Control**: Admins can create projects and assign tasks; Members can track and update task status.
- **Project Management**: Create and view team projects.
- **Kanban Task Board**: Drag-style status tracking (To Do -> In Progress -> Completed).
- **Premium UI**: Modern glassmorphism design with smooth animations and dark mode.

## ⚙️ Setup

### Prerequisites
- Node.js & npm
- MongoDB Atlas account (or local MongoDB)

### 1. Backend Setup
1. Navigate to the `server` directory.
2. Create a `.env` file (copy from `.env.example`).
3. Set your `MONGODB_URI` and `JWT_SECRET`.
4. Run `npm install`.
5. Run `npm run dev` (starts on port 5000).

### 2. Frontend Setup
1. Navigate to the `client` directory.
2. Run `npm install`.
3. Run `npm run dev` (starts on Vite default port).

## 🌐 Deployment (Railway)

1. Create a new project on [Railway](https://railway.app/).
2. Connect your GitHub repository.
3. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT=5000`
4. Railway will automatically detect the root directories. You may need to set the root directory to `server` for the backend and `client` for the frontend in separate services.

## 🛠 Tech Stack
- **Frontend**: Vite, React, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt.
- **Database**: MongoDB.
