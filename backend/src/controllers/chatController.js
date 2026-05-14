const { chatClient } = require("../lib/stream");

const getStreamToken = async (req, res) => {
  try {
    const token = chatClient.createToken(req.user.clerkId);

    return res.status(200).json({
      success: true,
      message: "Stream token generated successfully",
      token,
    });
  } catch (error) {
    console.error("Get stream token error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getStreamToken };
