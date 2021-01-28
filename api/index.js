const express = require("express");
const bodyParser = require('body-parser');
const _ = require('lodash');

//middlewares
const ruleMiddleware = require('./middlewares/rule-middleware');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/',(req,res) => {
  res.status(200).json(
    {
     message : "My Rule-Validation API",
     status : "success",
     data : {
      name: "NURUDEEN Qoyyum Timilehin",
      github: "@abdul-qoyyum",
      email: "nurudeen96qoyyum@gmail.com",
      mobile: "08104676003",
      twitter: "@OfficialNQT"
     }
    }
   );
});


app.post('/validate-rule',ruleMiddleware,(req,res) => {
//checks if data field exist in req
 if(!_.has(req.body,"data")){
   return res.status(400).json({
    message : "data is required.",
    status : "error",
    data : null
    });
 }

console.log(req.body);
res.end("Received");

});

app.listen(3000,() => console.log("App is listening on port 3000"));
