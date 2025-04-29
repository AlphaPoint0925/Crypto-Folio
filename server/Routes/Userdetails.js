const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";

router.post("/userdetails", async (req, res) => {
  try {
    const { UserId } = req.body;
    
    if (!UserId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    // Find user data
    const Data = await User.findOne({ _id: UserId }).select("-password");
    if (!Data) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Find user profile
    const userProfile = await Profile.find({ userId: UserId });
    
    // Send response
    res.json({ 
      success: true,
      Data, 
      userProfile 
    });

  } catch (error) {
    console.error("Error in userdetails:", error);
    res.status(500).json({ 
      success: false, 
      message: "An error occurred while fetching user details" 
    });
  }
});

module.exports = router;
