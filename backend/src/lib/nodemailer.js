const nodemailer = require("nodemailer");

const sendEmail = async ({ to, joinLink }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "You've been invited to a coding session on InterVueX",
    text: `Hello,\n\nYou have been invited to join a coding interview session on InterVueX.\n\nNew to InterVueX? Visit our platform to sign up or log in first:\n${process.env.CLIENT_URL}\n\nOnce you're logged in, click the link below to join your session:\n${joinLink}\n\nThis is a 1:1 coding interview session. Make sure you are logged in before clicking the join link.\n\nSee you in the session!\nThe InterVueX Team`,
  });
};

module.exports = { sendEmail };
