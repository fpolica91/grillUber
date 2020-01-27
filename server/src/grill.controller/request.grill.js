const Grill = require("../../Models/grill.model");
const User = require("../user.models/User.model");

// make and accept request//
module.exports = {
  async request(req, res) {
    const { id } = req.params;
    const { email, addOns } = req.body;
    const user = await User.findOne({ email });
    const grill = await Grill.findById(id);
    if (!grill.available)
      res.json({ message: "Grill unavailable, try again later!" });
    if (!user) return res.json({ message: "Cannot find user" });
    if (grill.lender.equals(user._id))
      return res.json({ message: "This is your own grill" });
    if (grill.requested.some(item => item.user.equals(user._id)))
      return res.json({ message: "Waiting for user to respond" });

    const arr = addOns ? addOns.split(",").map(item => item.trim()) : null;

    const requested = {
      user,
      addOns: {
        type: arr
      }
    };

    grill.requested.push(requested);
    grill.save();
    res.json({ message: "Your request in on the way" });
  },
  async accept(req, res) {
    const { grillId, userId } = req.params;
    const grill = await Grill.findById(grillId);
    const user = await User.findById(userId);
    if (!grill) return res.json({ message: "Unable to find grill" });
    if (!user) return res.json({ message: "cannot verify user" });
    const accpt = grill.requested.findIndex(item => item.user.equals(userId));
    const accepted = grill.requested.splice(accpt, 1);
    grill.accepted = accepted;
    await grill.save();
    res.json({ message: "Request Accepted" });
  }
};
