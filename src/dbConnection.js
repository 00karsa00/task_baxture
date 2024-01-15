var mongoose = require("mongoose");

// Connecting to database
var query = "mongodb+srv://mytest:AVHK1juCXw8tS7c8@cluster0.hw2el.mongodb.net/interviewTask?retryWrites=true&w=majority";
  
const db = query;
mongoose.Promise = global.Promise;

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      console.log("Error!!!" + error);
      return;
    }
    console.log("Connected Successfylly...");
  }
);