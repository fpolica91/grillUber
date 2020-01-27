const User = require("../user.models/User.model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const transport = require("../modules/mailer");
module.exports = {
  async forgot(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.json({ message: "user not found, sign up" });
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);
    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    });
    const mail = {
      from: "fabriciopolicarpo0@gmail.com",
      to: email,
      template: "<p>Follow this route to reset password</p> ",
      context: { token }
    };

    transport.sendMail(mail, (err, data) => {
      if (err) res.json({ message: "failed" });
      else res.json({ success: token });
    });
  },
  async resetPassword(req, res) {
    const { email, token, password } = req.body;
    const user = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );
    if (!user)
      res.json({ message: "please check your username and try again" });

    if (token !== user.passwordResetToken) res.json({ error: "Token Invalid" });

    const now = Date.now();
    if (now > user.passwordResetExpires) res.json({ message: "Token expired" });
    const encrypted = bcrypt.hashSync(password, 10);
    user.password = encrypted;

    await user.save();

    res.json({ message: "password change successful", user });
  }
};
