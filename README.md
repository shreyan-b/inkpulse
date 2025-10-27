# InkPulse Blog Application

## Overview
InkPulse is a full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a modern interface for creating, reading, and managing blog posts with user authentication.

## Project Structure
```
inkpulse/
├── client/           # Frontend React application
└── server/           # Backend Node.js server
```

## Features
- User Authentication
- Blog Post Management
- Category Organization
- Responsive Design
- JWT-based Security
- MongoDB Integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/inkpulse.git
cd inkpulse
```

2. Install Server Dependencies
```bash
cd server
npm install
```

3. Configure Server Environment
Create .env file in server directory with:
```
PORT=8000
ACCESS_SECRET_KEY=your_access_secret
REFRESH_SECRET_KEY=your_refresh_secret
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
MONGODB_URI=your_mongodb_uri
```

4. Install Client Dependencies
```bash
cd ../client
npm install
```

5. Start Development Servers
```bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm start
```

## Tech Stack
- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- API: REST

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

