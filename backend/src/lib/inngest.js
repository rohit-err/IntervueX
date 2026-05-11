const { Inngest } = require("inngest");
const { connectDb } = require("./db");
const { User } = require("../models/User");

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

      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
);

const functions = [syncUser, deleteUser];
module.exports = { inngest, functions };
