const _ = require('lodash');

module.exports = (req,res,next) => {
  const { rule, data, fieldLevels } = req.body;
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
    req.body.successMessage =  {
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

  req.body.errorMessage = {
    message: `field ${fieldLevels[0]}${field1} failed validation.`,
    status: "error",
    data: {
      validation: {
        error : true,
        field: `${fieldLevels[0]}${field1}`,
        field_value,
        condition,
        condition_value,
      }
    }
  };
   next();
}



