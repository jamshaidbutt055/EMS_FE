import { Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AddExpenseModal } from "./Modal/addExpense.modal";

function Dashboard() {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem("loggedUser");
    history.push("/login");
  };
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  return loggedUser !== null ? (
    <>
      <Grid container spacing={3}>
        <Grid container item style={{ backgroundColor: "white" }}>
          <Grid container item justifyContent="flex-start" xs={12} md={6}>
            <Item>{loggedUser.name}</Item>
          </Grid>
          <Grid container item justifyContent="flex-end" xs={12} md={6}>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </Grid>
        </Grid>

        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs>
          <AddExpenseModal loggedUserId={loggedUser.id} />
        </Grid>
      </Grid>
    </>
  ) : (
    <Redirect to="/login" />
  );
}

export default Dashboard;
