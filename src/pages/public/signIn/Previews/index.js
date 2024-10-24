import React from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import IMG from "../../../../assets/login.svg";

const useStyles = makeStyles(() => ({
  register: {
    color: "#00946c",
    fontWeight: "bold",
    fontSize: "1rem",
    marginTop: "2rem",
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        item
        container
        justifyContent="center"
        style={{ display: "flex", gap: "5px" }}
      >
        <div style={{ fontSize: "1rem", marginTop: "2rem" }}>
          Don't have an account?
        </div>
        <Link to="/sign-up" className={classes.register}>
          Register
        </Link>
      </Grid>
      <Grid item container justifyContent="center" style={{ margin: "5rem 0" }}>
        <img src={IMG} alt="login" style={{ width: "500px" }} />
      </Grid>
      <Grid item container justifyContent="center" style={{ margin: "5rem 0" }}>
        <div style={{ fontWeight: 500, fontSize: "20px" }}>
          Use <span style={{ color: "#fd5624" }}>LUNG APP</span> and save a life
        </div>
      </Grid>
    </div>
  );
};

export default Index;
