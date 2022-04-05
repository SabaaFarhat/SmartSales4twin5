const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const app = express();
const { requireAuth } = require('./middleware/authMiddleware')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var orderRouter =require ( './routes/orderRoutes');
var productRoute =require ('./routes/productRouter');

app.use(cookieParser())


// middleware
//Integration bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security Configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// database connection
const dbURI = 'mongodb+srv://azz:azz@cluster0.znoua.mongodb.net/userManagement?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/api/orders', orderRouter);
app.use("/api/products", productRoute);



app.get('/smoothies', requireAuth, (req, res, next) => {
  res.send("done")
  next()
}
);

//khedma mte3i
const path = require('path');


const Publishable_Key = 'pk_test_51KlFKzDcL7yyX7KKWPH1qjsNGcozzG9oEwDXVAKY1XlXxbNUh9rt9932c3YLMoTpbP63mMyTUtKhyX0tOYjtK2DP00RRcqwtvI'; // 
const Secret_Key ="sk_test_51KlFKzDcL7yyX7KK0xaeO45teeIcRHB2udaxIwEek8IHGvUYFjOBLZruYCzpcfcO7dwiE98vbWcI8Uno8f4nOoMt00BF24lFT1";

const stripe = require('stripe')(Secret_Key)

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('Home', {
    key: Publishable_Key
    })
})


app.post('/payment', function(req, res){
 
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: 'User1',
      address: {
          line1: 'TC 9/4 Old MES colony',
          postal_code: '110092',
          city: 'Tunis',
          state: 'Tunis',
          country: 'Tunisia',
      }
  })
  .then((customer) => {

      return stripe.charges.create({
          amount: 7000,    // Charing Rs 25
          description: 'Web Development Product',
          currency: 'USD',
          customer: customer.id
      });
  })
  .then((charge) => {
      res.send("Success") // If no error occurs
  })
  .catch((err) => {
      res.send(err)    // If some error occurs
  });
}) 


//export
module.exports = app;



















// app.post('/signup', (req, res) => {
//   const { firstName, tel,
//     lastName, email, password } = req.body
//   if (!email || !password || !firstName || !tel ||
//     !lastName) {
//     return res.status(422).json({ error: "please add all the fields" })
//   }
//   User.findOne({ email: email })
//     .then((savedUser) => {
//       if (savedUser) {
//         return res.status(422).json({ error: "user already exists with that email" })
//       }
//       bcrypt.hash(password, 12)
//         .then(hashedpassword => {
//           const user = new User({
//             email,
//             password: hashedpassword,
//             firstName,
//             lastName,
//             tel,
//             role: "Client"

//           })

//           user.save()
//             .then(user => {
//               transporter.sendMail({
//                 to: user.email,
//                 from: "ouhibi.azer@esprit.tn",
//                 subject: "signup success",
//                 html: "<h1>WELCOME TO SMARTSALES</h1>"

//               })
//               res.json({ message: "saved successfully" })
//             })
//             .catch(err => {
//               console.log(err)
//             })
//         })

//     })
//     .catch(err => {
//       console.log(err)
//       res.end("message");
//     })
// })

// // create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'secret', {
//     expiresIn: maxAge
//   });
// };

// app.post("/login", (req, res) => {
//   console.log("Here in login", req.body);

//   User.findOne({ email: req.body.email }).then(
//     (resultEmail) => {
//       console.log("resultEmail", resultEmail);
//       if (!resultEmail) {
//         res.status(200).json({
//           findedUser: "Wrong Email"
//         });
//       }

//       return bcrypt.compare(req.body.password, resultEmail.password);
//     })
//     .then(
//       (resultPwd) => {
//         console.log("resultPwd", resultPwd);
//         if (!resultPwd) {
//           res.status(200).json({
//             findedUser: "Wrong password"
//           });
//         }
//         else {
//           User.findOne({ email: req.body.email }).then(
//             (result) => {

//               console.log("result", result._id);
//               const token = createToken(result._id);
//               res.cookie(jwt, token, { httpOnly: true, maxAge: maxAge * 1000 });

//               res.status(200).json({

//                 findedUser: result
//               })
//             }
//           )
//         }

//       })
// });

// app.get('/logout', requireAuth, (req, res, next) => {
//   res.cookie('jwt', '', { maxAge: 1 });
//   res.status(200).json({

//     message: "done"
//   })
//   next()

// }
// );

// app.post('/reset-password', (req, res) => {
//   crypto.randomBytes(32, (err, buffer) => {
//     if (err) {
//       console.log(err)
//     }
//     const token = buffer.toString("hex")
//     User.findOne({ email: req.body.email })
//       .then(user => {
//         if (!user) {
//           return res.status(422).json({ error: "User dont exists with that email" })
//         }
//         user.resetToken = token
//         user.expireToken = Date.now() + 86400000
//         user.save().then((result) => {
//           transporter.sendMail({
//             to: user.email,
//             from: "ouhibi.azer@esprit.tn",
//             subject: "password reset",
//             html: `
//                   <p>You requested for password reset</p>
//                   <h5>click in this <a href="http://localhost:3000/reset-password/${token}">link</a> to reset password</h5>
//                   `
//           })
//           res.json({ message: "check your email" })
//         })

//       })
//   })
// })

// app.post('/new-password', (req, res) => {
//   const newPassword = req.body.password
//   const sentToken = req.body.token
//   User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
//     .then(user => {
//       if (!user) {
//         return res.status(422).json({ error: "Try again session expired" })
//       }
//       bcrypt.hash(newPassword, 12).then(hashedpassword => {
//         user.password = hashedpassword
//         user.resetToken = undefined
//         user.expireToken = undefined
//         user.save().then((saveduser) => {
//           res.json({ message: "password updated success" })
//         })
//       })
//     }).catch(err => {
//       console.log(err)
//     })
// })

// app.put('/follow', checkUser, (req, res) => {
//   console.log(req.user._id)
//   console.log(req.body.followId)

//   //create cnst verifID (find followID)
//   User.findByIdAndUpdate(req.body.followId, {
//     $push: { followers: req.user._id } }, {new: true}, (err, result) => {
//     if (err) {
//       return res.status(422).json({ error: err })
//     }
//     User.findByIdAndUpdate(req.user._id, {
//       $push: { following: req.body.followId }

//     }, { new: true }).then(result => {
//       res.json("result")
//     }).catch(err => {
//       return res.status(422).json({ error: err })
//     })

//   }
//   )
// })

// app.put('/unfollow', checkUser, (req, res) => {
  

//   User.findByIdAndUpdate(req.body.unfollowId, {
//     $pull: { followers: req.user._id }
//   }, {
//     new: true
//   }, (err, result) => {
//     if (err) {
//       return res.status(422).json({ error: err })
//     }
//     User.findByIdAndUpdate(req.user._id, {
//       $pull: { following: req.body.unfollowId }

//     }, { new: true }).then(result => {
//       res.json(result)
//     }).catch(err => {
//       return res.status(422).json({ error: err })
//     })

//   }
//   )
// })

// app.post('/search-users',(req,res)=>{
//   let userPattern = new RegExp("^"+req.body.query)
//   User.find({email:{$regex:userPattern}})
  
//   .then(user=>{
//       res.json({user})
//   }).catch(err=>{
//       console.log(err)
//   })

// })

