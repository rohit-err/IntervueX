const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { serve } = require("inngest/express");
const { connectDb } = require("./lib/db");
const { inngest } = require("./lib/inngest");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send({
    message: "All is well",
  });
});

const startServer = async () => {
  try {
    await connectDb();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(`Server failed to start: ${error.message}`);
  }
};

startServer();
