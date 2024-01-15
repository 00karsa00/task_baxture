
var mongoose = require("mongoose");

var TaskDetails= new mongoose.Schema({
  fileId: String,
  countWords: Number,
  countUniqueWords: Number,
  findTopKWords: String,
  findTopKWordCount: Number,
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("taskDetails", TaskDetails, "TaskDetails");
