# InkPulse Server

## Overview
Backend server for the InkPulse blog application, built with Node.js, Express, and MongoDB.

## Project Structure
```
server/
├── controller/        # Request handlers
├── model/            # Database schemas
├── routes/           # API routes
├── middleware/       # Custom middleware
├── database/         # Database configuration
└── index.js         # Server entry point
```

## Features
- JWT-based Authentication
- MongoDB Integration
- RESTful API Design
- Secure Password Handling
- Token-based Authorization

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation
1. Install dependencies
```bash
npm install
```

2. Set up environment variables
Create a .env file in the root directory with:
```
PORT=8000
ACCESS_SECRET_KEY=your_access_secret_key
REFRESH_SECRET_KEY=your_refresh_secret_key
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
MONGODB_URI=your_mongodb_uri
```

3. Start the server
```bash
npm start
```

## API Endpoints

### Authentication
- POST /signup - Register new user
- POST /login - User login
- POST /token - Refresh access token

### Protected Routes
- GET /profile - Get user profile (requires authentication)

## Dependencies
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv

## Security Features
- Password Hashing
- JWT Authentication
- Protected Routes
- Environment Variables
- CORS Configuration