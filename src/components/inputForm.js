import React from "react";
import Button from "@mui/material/Button";
import { Card, CardContent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
function InputForm({
  onSubmitClick,
  onInputChange,
  parentPage,
  validationErrors,
}) {
  let routeLink = parentPage === "Login" ? "register" : "login";
  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmitClick}>
          {parentPage !== "Login" ? (
            <TextField
              sx={{ width: "100%", mb: "10px" }}
              label="Full Name"
              variant="outlined"
              name="name"
              onChange={onInputChange}
              error={validationErrors && validationErrors.name !== undefined}
              helperText={validationErrors ? validationErrors.name : ""}
            />
          ) : (
            <></>
          )}
          <TextField
            sx={{ width: "100%", mb: "10px" }}
            label="Email"
            variant="outlined"
            name="email"
            onChange={onInputChange}
            error={validationErrors && validationErrors.email !== undefined}
            helperText={validationErrors ? validationErrors.email : ""}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            onChange={onInputChange}
            error={validationErrors && validationErrors.password !== undefined}
            helperText={validationErrors ? validationErrors.password : ""}
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: "10px" }}
          >
            <Button
              component={Link}
              to={"/" + routeLink}
              variant="outlined"
              sx={{ mr: "5px" }}
            >
              {routeLink.toUpperCase()}
            </Button>
            <Button variant="contained" type="submit">
              {parentPage}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default InputForm;
