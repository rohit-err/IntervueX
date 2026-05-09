const express = require("express");
require("dotenv").config();
const { connectDb } = require("./lib/db");

const app = express();

app.use(express.json());

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
