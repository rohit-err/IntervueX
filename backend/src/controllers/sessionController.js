const { streamClient, chatClient } = require("../lib/stream");
const { Session } = require("../models/Session");

const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const { _id, clerkId } = req.user;

    if (!problem || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Problem and difficulty are required",
      });
    }

    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
      },
    });

    const channelId = `channel_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    const channel = chatClient.channel("messaging", channelId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();

    const session = new Session({
      problem,
      difficulty,
      host: _id,
      callId,
      channelId,
    });

    await session.save();

    return res.status(201).json({
      success: true,
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    console.error("Create session error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ host: req.user._id }, { participant: req.user._id }],
    })
      .populate("host", "name profileImage")
      .populate("participant", "name profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      sessions,
    });
  } catch (error) {
    console.error("Get sessions error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId)
      .populate("host", "name profileImage")
      .populate("participant", "name profileImage");

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Session fetched successfully",
      session,
    });
  } catch (error) {
    console.error("Get session by id error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const joinSession = async (req, res) => {
  const { sessionId } = req.params;
  const { _id, clerkId } = req.user;
  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Session is not active",
      });
    }

    if (session.participant) {
      return res.status(400).json({
        success: false,
        message: "Session is already full",
      });
    }

    const channel = chatClient.channel("messaging", session.channelId);
    await channel.addMembers([clerkId]);

    session.participant = _id;
    await session.save();

    return res.status(200).json({
      success: true,
      message: "Session joined successfully",
      session,
    });
  } catch (error) {
    console.error("Join session error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const endSession = async (req, res) => {
  const { sessionId } = req.params;
  const { _id } = req.user;
  try {
    const session = await Session.findById(sessionId)
      .populate("host", "clerkId")
      .populate("participant", "clerkId");

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.host._id.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to end this session",
      });
    }

    if (session.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Session is not active",
      });
    }

    await streamClient.video.call("default", session.callId).end();

    const members = [session.host.clerkId];
    if (session.participant) members.push(session.participant.clerkId);

    await chatClient
      .channel("messaging", session.channelId)
      .removeMembers(members);

    session.status = "completed";
    await session.save();

    return res.status(200).json({
      success: true,
      message: "Session ended successfully",
      session,
    });
  } catch (error) {
    console.error("End session error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  joinSession,
  endSession,
};
