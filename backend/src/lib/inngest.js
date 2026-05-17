const { Inngest } = require("inngest");
const { connectDb } = require("./db");
const { User } = require("../models/User");
const { chatClient } = require("./stream");
const { sendEmail } = require("./nodemailer");

const inngest = new Inngest({
  id: "intervuex-backend",
});

const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    try {
      await connectDb();

      const newUser = new User({
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
        name: `${event.data.first_name || ""} ${event.data.last_name || ""}`.trim(),
        profileImage: event.data.image_url,
      });

      await newUser.save();

      await chatClient.upsertUser({
        id: newUser.clerkId,
        name: newUser.name,
        image: newUser.profileImage,
      });

      return { success: true };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
);

const deleteUser = inngest.createFunction(
  { id: "delete-user", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    try {
      await connectDb();

      await User.deleteOne({
        clerkId: event.data.id,
      });

      await chatClient.deleteUser(event.data.id);

      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
);

const sendSessionInvite = inngest.createFunction(
  {
    id: "send-session-invite",
    triggers: [{ event: "session/invite.send" }],
  },
  async ({ event }) => {
    try {
      await sendEmail({ to: event.data.to, joinLink: event.data.joinLink });
      return { success: true };
    } catch (error) {
      console.error("Error sending session invite:", error);
      throw error;
    }
  },
);

const functions = [syncUser, deleteUser, sendSessionInvite];
module.exports = { inngest, functions };
