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

const { data, fieldLevels } = req.body;
//checks if rule field exist in data
//one level deep
 if(!Array.isArray(data) && !_.has(data,fieldLevels[0])){
  return res.status(400).json({
    message : `field ${fieldLevels[0]} is missing from data.`,
    status : "error",
    data : null
  });
 }
 
//  when data is an array one level deep
if(Array.isArray(data)  && !(data.indexOf(fieldLevels[0]) >= 0)){
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
 if(!Array.isArray(data[fieldLevels[0]]) && (!_.isEmpty(fieldLevels[1]) && !_.has(data[fieldLevels[0]],fieldLevels[1]))){
   return res.status(400).json({
    message : `field ${fieldLevels[0]}${field1} is missing from data.`,
    status : "error",
    data : null
   });
 }

//  when fieldlevel is an array two levels deep
// and field value is not found in data
if(Array.isArray(data[fieldLevels[0]])  && !_.isEmpty(fieldLevels[1]) && !(data[fieldLevels[0]].indexOf(fieldLevels[1]) >= 0)){
  return res.status(400).json({
    message : `field ${fieldLevels[0]}${field1} is missing from data.`,
    status : "error",
    data : null
   });
}

  next();
}
