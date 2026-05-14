const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const { getStreamToken } = require("../controllers/chatController");
const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

module.exports = router;
