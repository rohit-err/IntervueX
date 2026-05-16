const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const {
  createSession,
  getSessions,
  getSessionById,
  joinSession,
  endSession,
} = require("../controllers/sessionController");

const router = express.Router();

router.post("/", protectRoute, createSession);

router.get("/", protectRoute, getSessions);

router.get("/:sessionId", protectRoute, getSessionById);

router.post("/:sessionId/join", protectRoute, joinSession);

router.post("/:sessionId/end", protectRoute, endSession);

module.exports = router;
