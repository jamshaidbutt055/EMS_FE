const ValidateInputForm = (inputs) => {
  //username errors
  let errors = {};
  if (!inputs.username) {
    errors.username = "Invalid Username";
  }
  //Password Errors
  if (!inputs.password) {
    errors.password = "Invalid Password";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};
export default ValidateInputForm;
