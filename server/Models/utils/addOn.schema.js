const mongoose = require("mongoose");

const AddOnSchema = new mongoose.Schema({
  type: {
    type: [String],
    enum: ["Chairs", "Table", "Turf", "Umbrella"]
  }
});

module.exports = AddOnSchema;
