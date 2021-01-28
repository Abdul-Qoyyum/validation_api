const _ = require('lodash');
const _c = require('lodash-contrib');

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


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
/*
 if(!_.isObjectLike(rule)){
   return res.status(400).json({
    message : "rule should be an object.",
    status : "error",
    data : null
   });
 }
*/

//checks if rule is a valid JSON type
 if(!_c.isJSON(rule)){
   return res.status(400).json({
     message: "Invalid JSON payload passed.",
     status: "error",
     data: null
    });
 }





  next();
}
