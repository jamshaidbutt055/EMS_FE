import React from "react";
import { Redirect, useHistory } from "react-router-dom";

function Dashboard() {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem("loggedUser");
    history.push("/login");
  };
  return loggedUser !== null ? (
    <div>
      <h2>Dashboard</h2>
      <p>ID: {loggedUser.id}</p>
      <p>UserName: {loggedUser.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Dashboard;
