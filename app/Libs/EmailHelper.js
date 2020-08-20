const nodemailer = require("nodemailer");
async function main(to, subject, text) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "btracker96@gmail.com",
      pass: "test@1234",
    },
  });
  let info = await transporter.sendMail({
    from: "btracker96@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });
  return info;
}
module.exports = { sendMail: main };
