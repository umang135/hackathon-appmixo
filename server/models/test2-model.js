const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Test2 = new Schema(
  {
    f1: { type: String, required: true },
    f2: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("test2", Test2);
