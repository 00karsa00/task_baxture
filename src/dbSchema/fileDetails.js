var mongoose = require("mongoose");

var FileDetails= new mongoose.Schema({
  originalName: String,
  fileName: String,
  fileDetails: String,
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("fileDetails", FileDetails, "FileDetails");
