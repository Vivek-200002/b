// Load environment variables from .env file
require('dotenv').config();

// Import libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Connect to the database
require('./database/connection');

// Import models and routes
const Product = require('./models/Product');
const router = require('./routes/router');

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Configure CORS to allow requests from the frontend
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Replace 'http://localhost:3000' with your Vercel frontend URL
}));

// Set up routes
app.use('/api', router);

// Start server
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

