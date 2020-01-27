const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
    required: true
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
