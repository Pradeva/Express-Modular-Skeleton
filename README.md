# Express Modular Skeleton

This project is a modular skeleton structure for building scalable and maintainable Express.js applications. It provides a clean separation of concerns by organizing the codebase into modules, such as routes, controllers, services, and models.

## Features

- Modular structure for maintainability
- Built-in CORS middleware
- JWT-based authentication
- Centralized logging with Winston
- Secure password hashing with bcrypt
- Sequelize ORM for database management
- Environment variable management with `dotenv`
- Development-friendly tools like Nodemon

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A relational database (e.g., MySQL, PostgreSQL, SQLite)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Pradeva/Express-Modular-Skeleton.git
cd Express-Modular-Skeleton
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the required environment variables based on `.env.example` file.

### 4. Set Up the Database

Ensure your database server is running and create the database defined in the `.env` file.

### 5. Start the Application

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The application will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── src
│   ├── app.js              # Main application entry point
│   ├── config              # Configuration files (e.g., database)
│   ├── controllers         # Route handlers
│   ├── middlewares         # Custom middleware (e.g., auth, logger)
│   ├── models              # Sequelize models
│   ├── routes              # API route definitions
│   ├── services            # Business logic
│   └── utils               # Utility functions (e.g., JWT, logger)
├── migrations              # Database migrations
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
└── README.md               # Documentation
```

## Tools and Libraries

- **Express.js**: Web framework for Node.js
- **Sequelize**: Promise-based ORM for SQL databases
- **JWT (jsonwebtoken)**: For token-based authentication
- **bcrypt**: For hashing passwords securely
- **dotenv**: For managing environment variables
- **Winston**: For logging application events
- **Nodemon**: For automatic server reload in development

## Logging

Logs are managed using Winston and are stored in the `logs` directory:

- `logs/combined.log` - Combined logs
- `logs/error.log` - Error logs

## Notes

This modular skeleton is still in the development phase. Features and implementations may change as improvements are made.
