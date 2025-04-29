const express = require("express");
const router = express.Router();
const User = require("../models/User"); //we select the table

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
const { fetchuser } = require("../middleware/fetchuser");

router.post("/dashboard", fetchuser, async (req, res) => {
  try {
    console.log("dashboard data");
    const id = req.user.id;
    console.log("User ID:", id);

    const userdata = await User.find({ _id: id })
      .select("-password")
      .select("-mob");
    
    if (!userdata || userdata.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, id: id, user: userdata[0] });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ success: false, message: "An error occurred while fetching dashboard data" });
  }
});

module.exports = router;
