const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Backup = new Schema(
  {
    src: { type: String, required: true },
    coll_name: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: Boolean, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("backups", Backup);
