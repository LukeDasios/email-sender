require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();

const { PORT, USER, PASS } = process.env;

function sendEmail() {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    const mail_configs = {
      from: USER,
      to: USER,
      subject: "Sent an email",
      text: "sent from NodeJS!",
    };

    transporter.sendMail(mail_configs, (err, info) => {
      if (err) {
        console.log(err);
        return reject({ message: err });
      } else {
        console.log("Email sent with information: ", info);
        return resolve({ message: "email sent" });
      }
    });
  });
}

app.get("/", (req, res) => {
  sendEmail()
    .then((response) => res.send(response.message))
    .catch((err) => res.status(500).send(err.message));
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}...`));
