const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "your-secret-key"; // TODO: Move to environment variable

const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;
      
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "Account not found" 
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
      }

      // Generate token
      const tokenData = {
        user: {
          id: user._id,
          email: user.email
        }
      };
      
      const authToken = jwt.sign(tokenData, jwtSecret, { expiresIn: '24h' });

      // Send response
      res.json({ 
        success: true, 
        userdata: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }, 
        authToken 
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred during login" 
      });
    }
  }
);

module.exports = router;
