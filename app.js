const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User')
const productRoute = require("./routers/productRouter");
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const app = express();
const { requireAuth } = require('./middleware/authMiddleware')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const path = require("path");


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"

    }
}))
app.use(cookieParser())


// middleware
//Integration bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/products", productRoute);

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
const dbURI = 'mongodb+srv://fadi:fadi@cluster0.znoua.mongodb.net/smartSales?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Create User
// app.post("/signup", (req, res) => {
//   bcrypt.hash(req.body.password, 10).then(cryptedPwd => {
//     try {


//       let user = {};

//       user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: cryptedPwd,
//         tel: req.body.tel,
//         role: "Client"
//       });
//       //savegarde
//       user.save();

//       // const token = createToken(User._id);
//       // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//       //response
//       res.status(201).json({
//         message: "User created"
//       })
//     } catch (err) {
//       console.log(err)
//       res.status(404).send('User error')

//     }
//   })
// })


// accès aux fichiers
app.use('/images', express.static(path.join('/images')))


app.post('/signup',(req,res)=>{
  const {firstName,tel,
    lastName,email,password} = req.body 
  if(!email || !password || !firstName||!tel||
    !lastName){
     return res.status(422).json({error:"please add all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                firstName,
                lastName,
                tel,
                role: "Client"

            })
    
            user.save()
            .then(user=>{
              // transporter.sendMail({
              //   to:user.email,
              //   from:"smartSales@no-reply.com",
              //   subject:"signup success",
              //   html:"<h1>WELCOME TO SMARTSALES</h1>"

              //   })
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
})

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  });
};

//login 
app.post("/login", (req, res) => {
  console.log("Here in login", req.body);

  User.findOne({ email: req.body.email }).then(
    (resultEmail) => {
      console.log("resultEmail", resultEmail);
      if (!resultEmail) {
        res.status(200).json({
          findedUser: "Wrong Email"
        });
      }

      return bcrypt.compare(req.body.password, resultEmail.password);
    })
    .then(
      (resultPwd) => {
        console.log("resultPwd", resultPwd);
        if (!resultPwd) {
          res.status(200).json({
            findedUser: "Wrong password"
          });
        }
        else {
          User.findOne({ email: req.body.email }).then(
            (result) => {

              console.log("result", result);
              const token = createToken(User._id);
              res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
              
              res.status(200).json({
                
                findedUser: result
              })
            }
          )
        }

      })
});

app.get('/logout', (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
  next()

}
);

app.get('/smoothies', requireAuth, (req, res, next) => {

  res.send("done")
  next()
}
);


//export
module.exports = app;