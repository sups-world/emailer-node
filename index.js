import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

import { google } from "googleapis";

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  return res.status(200).send(`Hello hello!!!`);
});

app.post("/send-email", (req, res) => {
  // //set up Oauth2 client
  // const oauth2Client = new google.auth.OAuth2(
  //   process.env.OAUTH_CLIENT_ID,
  //   process.env.OAUTH_CLIENT_SECRET
  //   //redirect_uri
  // );

  // //set refresh token
  // oauth2Client.setCredentials({
  //   refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  // });
  // //extract information first
  // const { to, subject, text } = req.body;

  //create a transporter

  //for mailtrap
  //   host: 'smtp.mailtrap.io',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: 'your_mailtrap_username',
  //     pass: 'your_mailtrap_password',
  //   },
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.SIMPLE_PASS,
    },
  });

  //Define email options
  const mailOptions = {
    from: process.env.USERNAME,
    to,
    subject,
    text,
  };

  //send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error`, error);
      return res.status(500).send(`Internal server error`);
    } else {
      console.log(`Email sent::`, info.response);
      return res.status(200).send("Email sent successfully");
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
