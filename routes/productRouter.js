const Product = require("../model/productModel");
const Comment = require("../model/commentModel");
const User = require("../model/User");

var express = require('express');

const { requireAuth, checkUser, notReqAuthentication } = require('../middleware/authMiddleware')
const bodyParser = require("body-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

var Router = express.Router();

//MailKey
//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

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
// Multer config ************************************************
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    //Affecter la destination
    cb(null, "/images");
  },
  //file name
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "--" + "." + extension;
    //Affecter file name
    cb(null, imgName);
  },
});

// ***************************************************************

// const {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// } = require("./verifyToken");


//CREATE
//with token
//Router.post("/", verifyTokenAndAdmin, async (req, res) => {

//ma8ir token
Router.post(
  "/",
  checkUser,
  multer({ storage: storage }).single("img"),
  async (req, res) => {
    console.log("product", req.body);
    let url = req.protocol + "://" + req.get("host");
    // const newProduct = new Product(req.body);
    //*********************************************************************** */
    User.findById(req.user._id).then(result => {
      if (!result) {
        console.log("eerr")
      }
      console.log("ee", result.firstName)
    })
    //*********************************************************************** */

    const newProduct = new Product({

      name: req.body.name,
      user: req.user._id,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      comments: req.body.comments,
      countInStock: req.body.countInStock,
      //image: url + "/images/" + req.file.filename,
      //req.body
    });

    try {
      const savedProduct = await newProduct.save().then((result) => {
        transporter.sendMail({
          to: "bouricha.fadi@esprit.tn",
          from: "fadiasg01@gmail.com",
          subject: "product ajoutee",
          html: `
          <p>Product Added</p> `,
          //  <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
        });
        // res.json({message:"check your email"})
      });
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//UPDATE
Router.put("/:id", checkUser, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
Router.delete("/:id", checkUser, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
Router.get("/find/:id", checkUser, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
Router.get("/afficheProducts", checkUser, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

/********************* Commentaires ******************************** */

//reponse
Router.post("/addreponse/:idProd/:id", checkUser, async (req, res) => {
  const commentId = req.params.id;
  const productId = req.params.idProd;

  const comment = await Comment.findById(commentId);
  const product = await Product.findById(productId);
  if (product) {
    if (comment) {
      const reponse = {
        //  name: req.user.name,
        reponse: req.body.reponse,
      };
      comment.reponses.push(reponse);
      //product.comments.reponses.push(reponse);

      comment.numReponses = comment.reponses.length;
      // product.rating =
      //   product.reviews.reduce((a, c) => c.rating + a, 0) /
      //   product.reviews.length;






      const updatedComment = await comment.save();
      // const updatedProduct = await product.save();

      console.log(updatedComment);
      res.status(201).send({
        message: "reponse Created",
        //review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    }

    else {
      res.status(404).send({ message: "Commentaire Not Found" });
    }
  }
  else {
    res.status(404).send({ message: "Product Not Found" });

  }
});

//CREATE
//with token
//Router.post("/", verifyTokenAndAdmin, async (req, res) => {
//ma8ir token
Router.post("/addComment/:id", checkUser, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  const commentaire = req.body.commentaire;

  const newComment = new Comment({
    commentaire,
    product,
  });
  newComment
    .save()
    .then(() => res.json("comment added!"))
    .catch((err) => res.status(400).json("Error: " + err));
  Product.findById(productId)
    .then((productt) => {
      productt.comments.push(newComment);
      productt
        .save()
        .then(() => res.json("comment added to product"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
  // if (product) {
  //   const commentaire = {
  //     //   //  name: req.user.name,
  //     commentaire: req.body.commentaire,
  //   };
  //   console.log(commentaire);
  //   console.log(product);
  //   product.comments.push(commentaire);
  //   product.numComments = product.comments.length;
  //   // product.rating =
  //   //   product.reviews.reduce((a, c) => c.rating + a, 0) /
  //   //   product.reviews.length;
  //   const newComment = new Comment(
  //     req.body
  //   );
  //   const savedComment = await newComment.save()
  //   const updatedProduct = await product.save();
  //   res.status(201).send({
  //     message: "commentaire Created",
  //     //review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
  //   });
  // } else {
  //   res.status(404).send({ message: "Product Not Found" });
  // }
});

//UPDATE
Router.put("/:id", checkUser, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
Router.delete("/:id", checkUser, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
Router.get("/find/:id", checkUser, (req, res) => {
  const comment = Comment.findById(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

/** afficher touts les Commentaires
 */

Router.get("/afficheComments", checkUser, (req, res) => {
  let comments;
  //const commentt =  Product.findById("624a4ce3489b8051ecbd6acc");
  //console.log(commentt.commentId);

  comments = Comment.find((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

Router.route("/countDocuments").get(function (req, res) {
  Comment.count({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = Router;
