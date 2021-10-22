import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import InputForm from "./inputForm";
import ValidateInputForm from "./validateInputForm";
import { axiosCall } from "../utilities/axiosAPI";
import { toast } from "react-toastify";

export const Login = (props) => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [validationErrors, setValidationError] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || null;
    if (loggedUser || redirect) {
      props.history.push("/dashboard");
    }
  }, [redirect]);

  const handleInputChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    const validationResult = ValidateInputForm(loginForm);
    setValidationError(validationResult);
    if (!validationResult) {
      let response = await axiosCall("/signin", "post", loginForm, false).then(
        (response) => response.data
      );
      if (!response.error) {
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({
            id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            token: response.data.token,
          })
        );
        setRedirect(true);
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <>
      <Typography variant="h3" component="div" sx={{ width: "100%" }}>
        Login Form
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <InputForm
          onInputChange={handleInputChange}
          onSubmitClick={handleSubmitClick}
          parentPage={"Login"}
          validationErrors={validationErrors}
        />
      </Box>
    </>
  );
};
