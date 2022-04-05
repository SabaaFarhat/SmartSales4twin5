const { requireAuth, checkUser, notReqAuthentication } = require('../middleware/authMiddleware')



module.exports = (app) => {
    const App = require("../controllers/complaintcontroller.js");
  
    app.post("/createcomp",checkUser, App.createcomp);
  
    app.get("/get-all-comps",checkUser, App.findAllcomp);
  
    app.get("/compaint/:complaintId",checkUser, App.findOnecomp);
  
    app.put("/complaint/:complaintId",checkUser, App.updatecomp);
  
    app.delete("/complaint/:complaintId",checkUser, App.deletecomp);

    app.get("/test" , (req,res)=>{
        res.send("it works on my machine")
    })
  };