const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
const User = require("../models/User");

const fetchuser = (req, res,next) => {
//   console.log(req.body);
  // Check for token in request body
  let authToken = req.body.Token;
  
  // If not in body, check Authorization header
  if (!authToken && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      authToken = authHeader.substring(7);
    }
  }
  
  if (!authToken) {
    console.log("tokennotfound");
    return res.status(401).json({ success: false, message: "Authentication token is required" });
  }
  try {
    const data = jwt.verify(authToken, jwtSecret);
    req.user=data.user;
    next();
   //  console.log(req.user);
    
  } catch (e) {
    console.error("Token verification failed:", e);
    return res.status(401).json({ success: false, message: "Invalid authentication token" });
  }
};
module.exports = { fetchuser };
