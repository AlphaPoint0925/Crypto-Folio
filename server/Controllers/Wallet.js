const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("../models/Transactions"); //we select the table
const Wallet = require("../models/Wallet"); //we select the table
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";

const getwalletAmount = async (req, res) => {
  try {
    console.log("Wallet amount request headers:", req.headers);
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication token is required" 
      });
    }
    
    const authToken = authHeader.split(' ')[1];
    
    let userdata;
    try {
      userdata = jwt.verify(authToken, jwtSecret);
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid or expired token" 
      });
    }
    
    console.log("User ID for wallet amount:", userdata.user.id);
    
    const walletData = await Wallet.find({ UserId: userdata.user.id });
    console.log("Wallet data:", walletData);
    
    if (!walletData || walletData.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Wallet not found" 
      });
    }
    
    res.json({ 
      success: true, 
      data: walletData 
    });
  } catch (error) {
    console.error("Error in getwalletAmount:", error);
    res.status(500).json({ 
      success: false, 
      message: "An error occurred while fetching wallet amount" 
    });
  }
};

const getallTransaction = async (req, res) => {
  try {
    console.log("Transaction request headers:", req.headers);
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication token is required" 
      });
    }
    
    const authToken = authHeader.split(' ')[1];
    
    let userdata;
    try {
      userdata = jwt.verify(authToken, jwtSecret);
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid or expired token" 
      });
    }
    
    console.log("User ID for transactions:", userdata.user.id);
    
    const transactionData = await Transaction.find({ UserId: userdata.user.id });
    console.log("Transaction data found:", transactionData.length > 0);
    
    if (transactionData.length === 0) {
      return res.json({ 
        success: true, 
        data: [] 
      });
    }
    
    res.json({ 
      success: true, 
      data: transactionData[0].Transaction 
    });
  } catch (error) {
    console.error("Error in getallTransaction:", error);
    res.status(500).json({ 
      success: false, 
      message: "An error occurred while fetching transactions" 
    });
  }
};

module.exports = { getwalletAmount, getallTransaction };
