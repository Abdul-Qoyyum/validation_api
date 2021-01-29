const _ = require('lodash');

module.exports = (req,res,next) => {
    const { rule, data, fieldLevels, successMessage, errorMessage } = req.body;
    const { condition, condition_value } = rule;
    
    if(condition == "contains"){
      //first level
      if(Array.isArray(data)  && data.indexOf(condition_value) >= 0){
        return res.status(200).json(successMessage);
      }

      if(Array.isArray(data)  && !(data.indexOf(condition_value) >= 0)){
        return res.status(400).json(errorMessage);
      }


      //second level
     if(Array.isArray(data[fieldLevels[0]][fieldLevels[1]])  && !_.isEmpty(fieldLevels[1]) && data[fieldLevels[0]][fieldLevels[1]].indexOf(condition_value) >= 0){
      return res.status(200).json(successMessage);
     }

     if(Array.isArray(data[fieldLevels[0]][fieldLevels[1]])  && !_.isEmpty(fieldLevels[1]) && !(data[fieldLevels[0]][fieldLevels[1]].indexOf(condition_value) >= 0)){
      return res.status(400).json(errorMessage);
     }
   
    //  second level direct array
    if(Array.isArray(data[fieldLevels[0]]) && data[fieldLevels[0]].indexOf(condition_value) >= 0){
      return res.status(200).json(successMessage);      
    }

    if(Array.isArray(data[fieldLevels[0]]) && !(data[fieldLevels[0]].indexOf(condition_value) >= 0)){
      return res.status(400).json(errorMessage);
    }
   
    }
    
    next();  
}