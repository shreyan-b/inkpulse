# InkPulse Blog Application

## Overview
InkPulse is a modern blogging platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Project Structure
```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── account/     # Authentication components
│   │   ├── banner/      # Banner components
│   │   ├── header/      # Header components
│   │   └── home/        # Home page components
│   ├── context/         # React Context
│   ├── constants/       # Constants and configurations
│   ├── service/         # API services
│   └── App.js          # Main React component
```

## Features
- User Authentication (Login/Signup)
- Blog Post Creation and Management
- Category-based Post Organization
- Responsive Design
- Material-UI Components

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Installation
1. Clone the repository
```bash
git clone https://github.com/your-username/inkpulse.git
```

2. Install dependencies
```bash
cd inkpulse
cd client
npm install
```

3. Start the development server
```bash
npm start
```

## Available Scripts
- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## Dependencies
- React
- React Router
- Material-UI
- Axios
- Other dependencies listed in package.json

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request