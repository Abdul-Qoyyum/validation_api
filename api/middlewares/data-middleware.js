const _ = require('lodash');


module.exports = (req, res, next) => {
//checks if data field exist in req
 if(!_.has(req.body,"data")){
   return res.status(400).json({
    message : "data is required.",
    status : "error",
    data : null
    });
  }

const { data, fieldLevels, condition } = req.body;
//checks if rule field exist in data
//one levels deep
 if(!_.has(data,fieldLevels[0])){
  return res.status(400).json({
    message : `field ${fieldLevels[0]} is missing from data.`,
    status : "error",
    data : null
  });
 }

//custom field 1 value
 let field1 = "";
 if(!_.isEmpty(fieldLevels[1])){
//preceed field 1 value by a dot sign
//for customised response message
   field1 += `.${fieldLevels[1]}`;
 }

//two levels deep
 if(!_.isEmpty(fieldLevels[1]) && !_.has(data[fieldLevels[0]],fieldLevels[1])){
   return res.status(400).json({
    message : `field ${fieldLevels[0]}${field1} is missing from data.`,
    status : "error",
    data : null
   });
 }


  next();
}
