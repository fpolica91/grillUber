const Grill = require("../../Models/grill.model");
const User = require("../user.models/User.model");

module.exports = {
  async create(req, res) {
    const { email, hourlyRate, addOns, longitude, latitude } = req.body;

    const lender = await User.findOne({ email });
    if (!lender) res.json({ message: "Please log in and try again" });

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };
    const arr = addOns ? addOns.split(",").map(item => item.trim()) : null;

    const grill = await Grill.create({
      lender,
      hourlyRate,
      location,
      addOns: { type: arr }
    });

    return res.json(grill);
  },
  async updateGrill(req, res) {
    try {
      const { id } = req.params;
      const grill = await Grill.findById(id);
      const { addOns, location, hourlyRate } = grill;

      const {
        hourlyRate: rate,
        addOns: updatedAdds,
        longitude,
        latitude
      } = req.body;

      const updateLocation = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const addOnArray = updatedAdds
        ? updatedAdds.split(",").map(item => item.trim())
        : null;

      const adds = {
        type: addOnArray
      };

      rate ? (grill.hourlyRate = rate) : hourlyRate;
      updatedAdds ? (grill.addOns = adds) : addOns;
      (longitude, latitude) ? (grill.location = updateLocation) : location;
      await grill.save();
      return res.json(grill);
    } catch (err) {
      throw new Error(err);
    }
  }
};
