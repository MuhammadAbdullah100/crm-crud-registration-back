const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://abdullah:admin123@brainwavecrm.qejj1.mongodb.net/?retryWrites=true&w=majority";

app.post("/crud-registeration", function (req, res, next) {
  // console.log("req", req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("crm");

    var myobj = req.body;
    if (myobj.password.length >= 8) {
      const controller = dbo.collection("crud");
      // controller.findOne({ email: myobj.email }).toArray(function (err, ans) {
      //   let email = "";
      //   console.log(ans)

      //   ans.map((res) => {
      //     email = res.email;
      //     if (email !== myobj.email) {
      //       controller.insertOne(myobj, function (err, set) {
      //         if (err) throw err;
      //         console.log("1 document inserted");
      //         console.log(set);

      //         res.send("Registered succusfully!");
      //       });
      //       console.log(true);
      //     } else {
      //       res.send("email already exit");
      //     }
      //   });
      // });
      controller.findOne({ email: myobj.email }, function (err, ans) {
        console.log(ans);
        if (ans?.email !== myobj.email) {
          controller.insertOne(myobj, function (err, set) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(set);

            res.send("Registered succusfully!");
          });
        } else {
          res.send("email already exit");
        }
      });
    } else {
      res.send("please enter 8 character password");
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
