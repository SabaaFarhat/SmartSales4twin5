const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: false, unique: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'user' },
    image: { type: String, required: false },
    brand: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: String, required: false },
    countInStock: { type: String, required: false },
    numComments: { type: String, required: false },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }],
  },
  {
    timestamps: true,
  }
);

//generate model
const Product = mongoose.model("Product", productSchema);



//exports many model

module.exports =Product;
