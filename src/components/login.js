import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import InputForm from "./inputForm";
import ValidateInputForm from "./validateInputForm";

export const Login = (props) => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
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

  const handleSubmitClick = (event) => {
    event.preventDefault();
    const validationResult = ValidateInputForm(loginForm);
    setValidationError(validationResult);
    if (!validationResult) {
      let userList = JSON.parse(localStorage.getItem("users")) || [];
      let userFound = userList.filter((user) => {
        return (
          user.username === loginForm.username &&
          user.password === loginForm.password
        );
      });

      if (userFound.length) {
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({
            id: userFound[0].id,
            username: userFound[0].username,
          })
        );
        setRedirect(true);
      } else {
        setError("User not found");
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
        <div>{error}</div>
      </Box>
      {/* <Link to="/register">Register new user</Link> */}
    </>
  );
};
