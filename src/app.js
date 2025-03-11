require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');

const logger = require('./utils/logger');

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan middleware CORS
app.use(cors());

// Middleware untuk logging setiap request
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/cars', carRoutes);

// Koneksi ke database
connectDB();

if (process.env.NODE_ENV === 'development') {
    console.log('Server is running in development mode');
} else {
    console.log('Server is running in production mode');
}
  

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
