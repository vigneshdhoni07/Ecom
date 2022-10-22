const validator=require("./requestvalidator")
const signupvalidator=require("./signUpValidator")
const authvalidator=require("./authvalidator")
const validators={
    validator:validator,
    signupvalidator:signupvalidator,
    authvalidator:authvalidator
}
module.exports=validators;