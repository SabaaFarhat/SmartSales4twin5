const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  message: String, 
  analysis_scoring : Number
});

module.exports = mongoose.model("message", MessageSchema);