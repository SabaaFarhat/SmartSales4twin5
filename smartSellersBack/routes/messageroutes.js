const { requireAuth, checkUser, notReqAuthentication } = require('../middleware/authMiddleware')


module.exports = (app) => {
    const App = require("../controllers/messagecontroller.js");
  
    app.post("/create",checkUser, App.create);
  
    app.get("/get-all",checkUser, App.findAll);
  
    app.get("/message/:messageId",checkUser, App.findOne);
  
    app.put("/message/:messageId",checkUser, App.update);
  
    app.delete("/message/:messageId",checkUser, App.delete);

    app.get("/test" , (req,res)=>{
        res.send("it works on my machine")
    })
  };