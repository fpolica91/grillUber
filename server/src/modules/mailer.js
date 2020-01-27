const nodemailer = require("nodemailer");
const { host, port, user, pass } = require("../config/mailer.json");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

module.exports = transport;

// host: "smtp.mailtrap.io",
// port: 2525,
// auth: {
//   user: "ab9e133b930cca",
//   pass: "009e3baa9bc39c"
