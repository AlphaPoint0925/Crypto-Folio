const express = require("express");
const router = express.Router();
const { getwalletAmount,getallTransaction } = require("../Controllers/Wallet");

router.get("/getwalletAmount", getwalletAmount);
router.get("/getwalletTransaction", getallTransaction);

module.exports = router;