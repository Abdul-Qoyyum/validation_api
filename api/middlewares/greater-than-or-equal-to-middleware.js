const _ = require('lodash');

module.exports = (req,res,next) => {
    const { rule, data, fieldLevels,successMessage,errorMessage } = req.body;
    const { condition, condition_value } = rule;

    if(condition == "gte"){
        //second level
           if(!_.isEmpty(fieldLevels[1]) && data[fieldLevels[0]][fieldLevels[1]] >= condition_value){
              return  res.status(200).json(successMessage);
           }

           if(!_.isEmpty(fieldLevels[1]) && data[fieldLevels[0]][fieldLevels[1]] < condition_value){
              return res.status(400).json(errorMessage);
           }
        
        //first level
          if(data[fieldLevels[0]] >= condition_value){
             return res.status(200).json(successMessage);
          }

          if(data[fieldLevels[0]] < condition_value){
             return res.status(400).json(errorMessage);
          }

    }

         next();   
}