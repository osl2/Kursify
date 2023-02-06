const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    //googleId: String,
    firstName: {
      type: String,
      required: [true, "Please add a firstName"],
    },

    lastName: {
      type: String,
      required: [true, "Please add a lastName"],
    },

    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },

    picture: {
      type: String,
      required: [true, "Please add a picture"],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
