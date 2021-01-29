const express = require("express");
const bodyParser = require('body-parser');
const _ = require('lodash');
//const _c = require('lodash-contrib');

//middlewares
const ruleMiddleware = require('./middlewares/rule-middleware');
const dataMiddleware = require('./middlewares/data-middleware');
const equalMiddleware = require('./middlewares/equal-middleware');
const notEqualMiddleware = require('./middlewares/not-equal-middleware');
const greaterThanMiddleware = require('./middlewares/greater-than-middleware');
const greaterThanOrEqualToMiddleware = require('./middlewares/greater-than-or-equal-to-middleware');
const containsMiddleware = require('./middlewares/contains-middleware');
const messages = require('./messages');

const app = express();

//verify of an incoming payload is json
app.use(express.json({
  verify : (req,res,buf,encoding) => {
     JSON.parse(buf);
   }
}));

//parse application/x-www-form-urlencoded
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

//post route
app.post('/validate-rule',
            ruleMiddleware,
            dataMiddleware,
            messages,
            equalMiddleware,
            notEqualMiddleware,
            greaterThanMiddleware,
            greaterThanOrEqualToMiddleware,
            containsMiddleware,
            (req,res) => {
      console.log(req.body);
      res.end("Received");
});



//catch errors
app.use((err,req,res,next) => {
       return res.status(400).send({
          message : "Invalid JSON payload passed.",
          status : "error",
          data: null
         });
});

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.listen(port,() => console.log(`App is listening on port ${port}`));
