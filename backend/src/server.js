const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { serve } = require("inngest/express");
const { clerkMiddleware, getAuth } = require("@clerk/express");
const { connectDb } = require("./lib/db");
const { inngest, functions } = require("./lib/inngest");
const { protectRoute } = require("./middlewares/protectRoute");
const chatRoutes = require("./routes/chatRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

app.use(clerkMiddleware());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://intervue-x-hazel.vercel.app"],
    credentials: true,
  }),
);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "All is well",
  });
});

const startServer = async () => {
  try {
    await connectDb();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.error(`Server failed to start: ${error.message}`);
  }
};

startServer();
