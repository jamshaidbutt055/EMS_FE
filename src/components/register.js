import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ValidateInputForm from "./validateInputForm";
import InputForm from "./inputForm";
import { axiosCall } from "../utilities/axiosAPI";
import { toast } from "react-toastify";

export const Register = (props) => {
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
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
      let result = await axiosCall("/signup", "post", registrationForm, false)
        .then((response) => response.data)
        .catch((err) => console.log(err));
      if (!result.error) {
        toast.success(result.message);
        setRedirect(true);
      } else toast.warning(result.message);
    } else {
      setErrors(validationErrors);
    }
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
