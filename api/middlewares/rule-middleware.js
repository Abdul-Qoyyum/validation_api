const _ = require('lodash');

module.exports = (req, res, next) => {
//checks if rule field exist in req
 if(!_.has(req.body,"rule")){
   return res.status(400).json({
    message : "rule is required.",
    status : "error",
    data : null
    });
 }

 const { rule } = req.body;
//checks if the rule is a typeof object
 if(!_.isObjectLike(rule)){
   return res.status(400).json({
    message : "rule should be an object.",
    status : "error",
    data : null
   });
 }

let errors = {rule : []};
//validation variables
 const validators = ["field","condition","condition_value"];

validators.forEach((value,index)=>{
  if(!_.has(rule,value)){
    errors.rule.push({
       message : `${value} is required.`,
       status : "error",
       data : null
     });
   }
 });

//return if errors is empty
 if(!_.isEmpty(errors.rule)){
   return res.status(400).json(errors);
 }

//conditions should happen here

const { field, condition, condition_value } = rule;
//split field levels based on .
let fieldLevels = field.split(".");

let excludeFirst = [];
//store fieldLevels excluding the first variable
for(let i = 1; i < fieldLevels.length; i++){
   excludeFirst.push(fieldLevels[i]);
}

let secondFieldLevel = excludeFirst.join(".");

//pass field values to the req object
//to be handled by the data-middleware
//maximum of two levels deep
req.body.fieldLevels = [fieldLevels[0],secondFieldLevel];

//specify the allowed conditions
const conditions = ["et","neq","gt","gte","contains"];

//check if the supplied condition is available
  if(!(conditions.indexOf(condition) >= 0)){
    return res.status(400).json({
      condition : {
        message : `${condition} condition is invalid.`,
        status : "error",
        data : null
       }
     });
  }

  req.body.condition = condition;

  next();
}
