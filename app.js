const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const port = "https://brave-wave-crm-crud-registration.netlify.app";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://abdullah:admin123@brainwavecrm.qejj1.mongodb.net/?retryWrites=true&w=majority";
app.post("/crud-registeration", (req, res, next) => {
  MongoClient.connect(url,  (err, db) => {
    if (err) throw err;
    var dbo = db.db("crm").collection("crud");
    let myobj = req.body;
    myobj.password.length >= 8 ? 
      dbo.findOne({email: myobj.email}, (err, ans)=>{
        ans?.email !== myobj.email ?
        dbo.insertOne(myobj, (err, set)=>{
          if (err) throw err;
          res.send("Registered succusfully!");
        }):
        res.send("email already exit");
      })
     : res.send("please enter 8 character password");

  })
})
app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
