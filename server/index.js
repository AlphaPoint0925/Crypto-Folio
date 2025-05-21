const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { header } = require("express-validator");
const dashboardRouter = require("./Routes/Dashboard");
require('dotenv').config();

const app = express();

// Request logging middleware with more details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  next();
});

// CORS configuration with explicit options
app.use(cors({
  origin: 'http://localhost:3000', // React app's URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

//---------------mongoose connection----------------//

const Connection_url = process.env.MONGODB_URI || "mongodb+srv://jynt_1401:858923788@cluster0.ai09p2x.mongodb.net/crypto?retryWrites=true&w=majority";
const PORT = 3004;

// Set strictQuery before connecting to suppress deprecation warning
mongoose.set("strictQuery", true);

// Add error handling for server startup
const startServer = async () => {
  try {
    await mongoose.connect(Connection_url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

//here are routes for backend calls

app.use(express.json());
app.use("/dashboard", dashboardRouter);
app.use("/dashboard", require("./Routes/Userdetails"));
app.use("/dashboard", require("./Routes/ProfileUpdate"));

app.use("/register", require("./Routes/CreatUser"));
app.use("/register", require("./Routes/Signup"));

app.use("/transactions", require("./Routes/Transactions"));
app.use("/wallet", require("./Routes/Wallet"));

// Add CoinGecko API proxy endpoint
const axios = require('axios');
app.get('/api/coingecko/*', async (req, res) => {
  try {
    const path = req.params[0];
    const params = req.query;
    
    // Log the incoming request
    console.log('Incoming request:', {
      path,
      params,
      headers: req.headers
    });

    // Construct the CoinGecko URL
    const coingeckoUrl = `https://api.coingecko.com/api/v3/${path}`;
    
    // Log the outgoing request
    console.log('Requesting CoinGecko:', {
      url: coingeckoUrl,
      params
    });

    // Make the request to CoinGecko
    const response = await axios({
      method: 'get',
      url: coingeckoUrl,
      params: params,
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      timeout: 10000 // 10 second timeout
    });

    // Log successful response
    console.log('CoinGecko response status:', response.status);
    
    // Send the response back to client
    res.json(response.data);
  } catch (error) {
    // Detailed error logging
    console.error('CoinGecko API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        params: error.config?.params,
        headers: error.config?.headers
      }
    });

    // Send detailed error response
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Error fetching data from CoinGecko',
      details: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        path,
        params: req.query
      }
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'An error occurred while processing your request'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Add error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Gracefully shutdown
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  // Gracefully shutdown
  process.exit(1);
});

//---------------mongoose connection----------------//
