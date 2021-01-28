const express = require("express");
const bodyParser = require('body-parser');
const _ = require('lodash');
//const _c = require('lodash-contrib');

//middlewares
const ruleMiddleware = require('./middlewares/rule-middleware');
const dataMiddleware = require('./middlewares/data-middleware');

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
app.post('/validate-rule',ruleMiddleware,dataMiddleware,(req,res) => {
 console.log(req.body);
 const {
         rule,
         data,
         fieldLevels
        } = req.body;
  const { condition, condition_value } = rule;

let field1 = "";
let field_value =data[fieldLevels[0]];

if(!_.isEmpty(fieldLevels[1])){
//customize field1 value by preceeding it by a dot
   field1 += `.${fieldLevels[1]}`;
//deeply nested  field_value, two levels deep
   field_value = data[fieldLevels[0]][fieldLevels[1]];
}

//success messages
//level two success response
const successMessage =  {
         message : `field ${fieldLevels[0]}${field1} successfully validated.`,
         status : "success",
         data : {
         validation : {
           error : false,
           field : `${fieldLevels[0]}${field1}`,
           field_value,
           condition,
           condition_value,
       }
      }
    };

const errorMessage = {

};

//we have to validate for both the first
//and the second level

//checks for equal to
 if(condition == "et"){
//second level
   if(!_.isEmpty(fieldLevels[1]) && condition_value == data[fieldLevels[0]][fieldLevels[1]]){
      return  res.status(200).json(successMessage);
   }

//first level
  if(condition_value == data[fieldLevels[0]]){
     return res.status(200).json(successMessage);
  }
 }
//checks for not equal to
 if(condition == "neq"){
//second level
   if(!_.isEmpty(fieldLevels[1]) && condition_value != data[fieldLevels[ 0]][fieldLevels[1]]){
      return  res.status(200).json(successMessage);
   }

//first level
  if(condition_value != data[fieldLevels[0]]){
     return res.status(200).json(successMessage);
  }
 }

 if(condition == "gt"){
//second level
   if(!_.isEmpty(fieldLevels[1]) && data[fieldLevels[0]][fieldLevels[1]] > condition_value){
      return  res.status(200).json(successMessage);
   }

//first level
  if(data[fieldLevels[0]] > condition_value){
     return res.status(200).json(successMessage);
  }

 }

 if(condition == "gte"){
//second level
   if(!_.isEmpty(fieldLevels[1]) && data[fieldLevels[0]][fieldLevels[1]] >= condition_value){
      return  res.status(200).json(successMessage);
   }

//first level
  if(data[fieldLevels[0]] >= condition_value){
     return res.status(200).json(successMessage);
  }

 }

 if(condition == "contains"){
//second level
  if(!_.isEmpty(fieldLevels[1]) && _.has(data[fieldLevels[0]][fieldLevels[1]],condition_value)){
   return res.status(200).json(successMessage);
  }

//first level
  if(_.has(data[fieldLevels[0]],condition_value)){
   return res.status(200).json(successMessage);
  }

 }

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


app.listen(3000,() => console.log("App is listening on port 3000"));
