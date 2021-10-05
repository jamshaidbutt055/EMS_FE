import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ValidateInputForm from "./validateInputForm";
import InputForm from "./inputForm";

export const Register = (props) => {
  const [registrationForm, setRegistrationForm] = useState({
    id: 0,
    username: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (redirect) props.history.push("/login");
  }, [redirect]);

  useEffect(() => {
    if (registrationForm.id) {
      let userList = JSON.parse(localStorage.getItem("users")) || [];
      userList.push(registrationForm);
      localStorage.setItem("users", JSON.stringify(userList));
      setRedirect(true);
    }
  }, [registrationForm.id]);

  const handleInputChange = (event) => {
    setRegistrationForm({
      ...registrationForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitClick = (event) => {
    const min = 1,
      max = 100;
    const random = Math.round(min + Math.random() * (max - min));
    event.preventDefault();
    const validationErrors = ValidateInputForm(registrationForm);
    !validationErrors
      ? setRegistrationForm({
          ...registrationForm,
          id: random,
        })
      : setErrors(validationErrors);
  };

  return (
    <>
      <Typography variant="h3" component="div" sx={{ width: "100%" }}>
        Registration Form
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <InputForm
          onInputChange={handleInputChange}
          onSubmitClick={handleSubmitClick}
          parentPage={"Register"}
          validationErrors={errors}
        />
      </Box>
      {/* <Link to="/login">Login</Link> */}
    </>
  );
};
