const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String },
        name: { type: String, required: true },
        quantity: { type: Number, },
        image: { type: String, },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'Product'
        },
      },
    ],
    shippingAddress: [{
      fullName: { type: String },
      address: { type: String },
      city: { type: String},
      postalCode: { type: String },
      country: { type: String },
      location: {
        lat: Number,
        lng: Number,
        address: String,
        name: String,
        vicinity: String,
        googleAddressId: String,
      },
    }],
    paymentMethod: { type: String,  },
    paymentResult: [{
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    }],
    itemsPrice: { type: Number,  },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number,},
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'user' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;