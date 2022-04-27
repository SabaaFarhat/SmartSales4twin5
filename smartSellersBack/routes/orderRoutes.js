const express = require('express');
var Router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const Order = require('../model/orderModel.js');
const User = require('../model/User.js');
const {
  requireAuth,
  checkUser,
  notReqAuthentication,
} = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');
const { default: Stripe } = require('stripe');

const stripe = require('stripe')(
  'sk_test_51KlFKzDcL7yyX7KK0xaeO45teeIcRHB2udaxIwEek8IHGvUYFjOBLZruYCzpcfcO7dwiE98vbWcI8Uno8f4nOoMt00BF24lFT1'
);

Router.post(
  '/addOrder',
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      // orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      orderItems: req.body.orderItems,
      // shippingAddress: req.body.shippingAddress,
      // paymentMethod: req.body.paymentMethod,
      // itemsPrice: req.body.itemsPrice,
      // shippingPrice: req.body.shippingPrice,
      // taxPrice: req.body.taxPrice,
      // totalPrice: req.body.totalPrice,
      //user: req.user._id,
    });


    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'smartSales4twin5@gmail.com',
    //     pass: 'smartSales',
    //   },
    // });

    // var gg = await User.findById(req.user._id, 'email').exec();

    // var mailOptions = {
    //   from: 'smartSales4twin5@gmail.com',
    //   to: gg,
    //   subject: 'smart Sales Order',
    //   text: 'Good morning im the app Smart Sales, i send this email for verifing your information',
    // };
    // // console.log("c",gg)

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

Router.get(
  '/orders',async (req, res) => {
    // const qNew = req.query.new;
    // const qCategory = req.query.category;
    try {
      let orders;
  
    //   if (qNew) {
    //     products = await Product.find().sort({ createdAt: -1 }).limit(1);
    //   } else if (qCategory) {
    //     products = await Product.find({
    //       categories: {
    //         $in: [qCategory],
    //       },
    //     });
    //   } else {
      orders = await Order.find();
    //   }
  
       res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  // expressAsyncHandler(async (req, res) => {
  //   /*const orders = await Order.find({ user: req.user._id });
  //   res.send(orders);*/
  //   if (req.query.page && req.query.limit) {
  //     Order.paginate({}, { page: req.query.page, limit: req.query.limit })
  //       .then((data) => {
  //         res.status(200).json({
  //           data,
  //         });
  //       })
  //       .catch((error) => {
  //         res.status(400).json({ error });
  //       });
  //   } else {
  //     Order.find()
  //       .then((data) => {
  //         res.status(200).json({
  //           data,
  //         });
  //       })
  //       .catch((error) => {
  //         res.status(400).json({ error });
  //       });
  //   }
  //})
  });

// Router.get(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params._id);
//     if (order) {
//       res.send(order);
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

Router.get("/findOrder/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});


Router.get('/recherche/:key', requireAuth, async (req, resp) => {
  let data = await Order.find({
    $or: [{ paymentMethod: { $regex: req.params.key } }],
  });
  resp.send(data);
});

Router.put(
  '/update/:id',
  checkUser,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
      .then((order) => {
        order.paymentMethod = req.body.paymentMethod;
        order
          .save()
          .then(() => res.json('Order updated!'))
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  })
);

module.exports = Router;