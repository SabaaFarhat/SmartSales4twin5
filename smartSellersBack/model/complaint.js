const mongoose = require("mongoose");

const ComplaintSchema = mongoose.Schema({
  object:String , 
  user: { type: mongoose.Schema.Types.ObjectID, ref: 'user' },
  content : String , 
  compdate : Date 
});

module.exports = mongoose.model("complaint", ComplaintSchema);