import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ValidateInputForm from "./validateInputForm";
import InputForm from "./inputForm";
import { axiosCall } from "../utilities/axiosAPI";

export const Register = (props) => {
  const [registrationForm, setRegistrationForm] = useState({
    username: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (redirect) props.history.push("/login");
  }, [redirect]);

  const handleInputChange = (event) => {
    setRegistrationForm({
      ...registrationForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    const validationErrors = ValidateInputForm(registrationForm);
    if (!validationErrors) {
      let result = await axiosCall("/signup", "post", registrationForm).then(
        (response) => response.data
      );
      if (result) setRedirect(true);
    } else setErrors(validationErrors);
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
    </>
  );
};
