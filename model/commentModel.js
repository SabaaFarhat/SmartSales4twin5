const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema(
  {
    commentaire: { type: String, required: true },
   numReponses: { type: String, required: false },
   product : { type: mongoose.Schema.Types.ObjectId, ref: "Product" , required:true},
   reponses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reponse",
  }],
  },
  { timestamps: true }
);
//generate model
const Comment = mongoose.model("Comment", CommentSchema);

//export model
module.exports = Comment;