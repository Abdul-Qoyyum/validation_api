const _ = require('lodash');


module.exports = (req,res,next) => {
//we have to validate for both the first
//and the second level

const { rule, data, fieldLevels, successMessage, errorMessage } = req.body;
const { condition, condition_value } = rule;

//checks for equal to
 if(condition == "eq"){
    //second level
       if(!_.isEmpty(fieldLevels[1]) && condition_value == data[fieldLevels[0]][fieldLevels[1]]){
          return  res.status(200).json(successMessage);
       }       

       if(!_.isEmpty(fieldLevels[1]) && condition_value != data[fieldLevels[0]][fieldLevels[1]]){
         return res.status(400).json(errorMessage);
       }
    
    //first level
      if(condition_value == data[fieldLevels[0]]){
         return res.status(200).json(successMessage);
      }
         
      if(condition_value != data[fieldLevels[0]]){
         return res.status(400).json(errorMessage);
      }
 }
     next();
}