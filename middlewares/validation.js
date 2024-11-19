import validator  from 'validator'

const emptyValidation = function(txtdata){
    return( validator.isEmpty(txtdata))?
    true:false;
}

const emailValidation = function(txtdata){
    return( validator.isEmpty(txtdata) || !validator.isEmail(txtdata))?
    true:false;
}

const mobilevalidation = function(txtdata){
    return( validator.isEmpty(txtdata) || !validator.isMobilePhone(txtdata, 'en-IN'))?
    true:false;
}

export{
    emailValidation,
    mobilevalidation,
    emptyValidation
}