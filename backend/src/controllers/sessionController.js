const { streamClient, chatClient } = require("../lib/stream");
const { Session } = require("../models/Session");
const { inngest } = require("../lib/inngest");

const createSession = async (req, res) => {
  try {
    const { problem, difficulty, participantEmail } = req.body;
    const { _id, clerkId } = req.user;

    if (!problem || !difficulty || !participantEmail) {
      return res.status(400).json({
        success: false,
        message: "Problem, difficulty and participant email are required",
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

    const channel = chatClient.channel("messaging", callId, {
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
    });

    await session.save();

    const joinLink = `${process.env.CLIENT_URL}/join/${session._id}`;

    session.link = joinLink;
    await session.save();

    await inngest.send({
      name: "session/invite.send",
      data: {
        to: participantEmail,
        joinLink,
      },
    });

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

    if (session.host.toString() === _id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Host cannot join their own session as participant",
      });
    }

    if (session.participant) {
      return res.status(400).json({
        success: false,
        message: "Session is already full",
      });
    }

    const channel = chatClient.channel("messaging", session.callId);
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
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.host.toString() !== _id.toString()) {
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

    await streamClient.video
      .call("default", session.callId)
      .delete({ hard: true });

    await chatClient.channel("messaging", session.callId).delete();

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
