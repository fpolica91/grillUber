const mongoose = require("mongoose");
const locationSchema = require("./utils/point.schema");
const AddOnSchema = require("./utils/addOn.schema");

const GrillSchema = new mongoose.Schema({
  lender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hourlyRate: {
    type: Number,
    required: true
  },
  addOns: {
    type: AddOnSchema
  },
  location: {
    type: locationSchema,
    index: "2dsphere"
  },
  available: Boolean,
  requested: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      addOns: AddOnSchema
    }
  ],
  accepted: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Grill", GrillSchema);
