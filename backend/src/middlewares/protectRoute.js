const { requireAuth, getAuth } = require("@clerk/express");
const { User } = require("../models/User");

const protectRoute = [
  requireAuth(),

  async (req, res, next) => {
    try {
      const clerkId = getAuth(req).userId;

      if (!clerkId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Protect route error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
];

module.exports = { protectRoute };
