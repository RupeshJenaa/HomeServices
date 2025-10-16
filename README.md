# Home Services Platform

A full-stack web application for booking home services, connecting customers with service providers.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (customer, service provider, admin)
- Service browsing and booking
- Real-time chat between customers and providers
- Booking management
- Provider scheduling
- Admin dashboard
- Location-based service search
- Favorite services tracking
- Booking history

## Tech Stack

### Frontend
- **React 18** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router v7** - Declarative routing for React
- **Axios** - Promise based HTTP client

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **BCrypt.js** - Password hashing

### Dev Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restarting development server

## Project Structure

```
HomeServices/
├── home-services/         # Frontend React application
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configurations
│   │   └── styles/        # CSS stylesheets
│   └── ...
└── server/                # Backend Node.js application
    ├── controllers/       # Request handlers
    ├── models/            # Database models
    ├── routes/            # API route definitions
    ├── middleware/        # Custom middleware
    └── ...
```

## Getting Started

### Prerequisites

- Node.js >= 16.x
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd HomeServices
   ```

2. Install frontend dependencies:
   ```bash
   cd home-services
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

## Environment Variables

Create `.env` files in both `home-services` and `server` directories:

### Server Environment Variables (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homeservices
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Client Environment Variables (`home-services/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd home-services
   npm run dev
   ```

### Production Mode

1. Build the frontend:
   ```bash
   cd home-services
   npm run build
   ```

2. Start the backend server:
   ```bash
   cd server
   npm start
   ```

## Scripts

### Server Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed:admin` - Seed admin user
- `npm run seed:users` - Seed sample users
- `npm run reset:db` - Reset database

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.