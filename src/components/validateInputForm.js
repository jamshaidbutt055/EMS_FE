import Validator from "validator";
const ValidateInputForm = (inputs) => {
  //username errors
  let errors = {};
  if (
    inputs.hasOwnProperty("name") &&
    Validator.isEmpty(inputs.name, { ignore_whitespace: true })
  ) {
    errors.name = "Invalid Name";
  }
  if (
    Validator.isEmpty(inputs.email, { ignore_whitespace: true }) ||
    !Validator.isEmail(inputs.email)
  ) {
    errors.email = "Invalid Email";
  }
  if (Validator.isEmpty(inputs.password, { ignore_whitespace: true })) {
    errors.password = "Invalid Password";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};
export default ValidateInputForm;
