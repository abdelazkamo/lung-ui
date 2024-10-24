import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import React, { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/InputField";
import Button from "../../../components/Button";
import LOGO from "../../../assets/logo.png";
import FACEBOOK from "../../../assets/facebook.png";
import GOOGLE from "../../../assets/google.png";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER_QUERY } from "../../../queries/queries";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 5rem",
    height: "100vh",
  },
  logo: {
    width: "250px",
    margin: "1rem 0 3rem 0",
  },
  primaryLink: {
    color: "#00946c",
    fontWeight: "bold",
    margin: "10px 0",
    fontSize: "0.8rem",
  },
  register: {
    color: "#00946c",
    fontWeight: "bold",
    fontSize: "0.8rem",
    marginTop: "2rem",
  },
  registerBox: {
    display: "none",
  },
  facebook: {
    width: "40px",
    cursor: "pointer",
    height: "40px",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  google: {
    width: "40px",
    height: "40px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },

  "@media (max-width: 600px)": {
    container: {
      padding: "1.5rem 1.5rem 5rem 1.5rem",
    },
    registerBox: {
      display: "block",
    },
  },
}));

const notify = (text, background) =>
  toast(text, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: { background: background, color: "#fff" },
  });

const Form = () => {
  const classes = useStyles();
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const [login, { error }] = useLazyQuery(LOGIN_USER_QUERY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = getValues();

    await login({
      variables: { input: { email, password } },
      fetchPolicy: "network-only",
      onCompleted: (res) => {
        notify("Welcome back", "#90EE90");
        navigate("/");

        const user = res.login.user;
        const token = res.login.token;

        localStorage.setItem("authToken", token);

        console.log(token);
      },
    });

    if (error) {
      notify(error.message, "red");
    }
  };

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 5rem 5rem 5rem",
      }}
    >
      <Fragment>
        <Grid>
          {/* <img className={classes.logo} src={LOGO} alt="supa logo" /> */}
          <Typography
            style={{
              fontSize: "2rem",
              margin: "1rem 0 1rem 0",
              fontWeight: 800,
              color: "#00946c",
            }}
          >
            Lung Disease Detection
          </Typography>
        </Grid>
        <Typography
          style={{
            fontSize: "1.45rem",
            margin: "1rem 0 1rem 0",
            fontWeight: 600,
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #EBEBEB",
            color: "#fd5624",
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={3} style={{ marginTop: "0.5rem" }}>
            <Grid item xs={12}>
              <Input
                name="email"
                type="email"
                control={control}
                label="Email"
                rules={{
                  required: "email is required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} marginTop={4}>
              <Input
                name="password"
                label="Password"
                type="password"
                control={control}
                rules={{
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item container justifyContent="flex-end">
              <Link to="/forgot-password" className={classes.primaryLink}>
                Forget password
              </Link>
            </Grid>
          </Grid>
          <Button type="submit" label="Login" isPrimary disabled={!isValid} />
        </form>
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "14px",
          }}
        >
          Or login with your social media account
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <img src={FACEBOOK} alt="facebook" className={classes.facebook} />
            <img src={GOOGLE} alt="google" className={classes.google} />
          </div>
        </div>
        <div className={classes.registerBox}>
          <Grid
            item
            container
            justifyContent="center"
            style={{ display: "flex", gap: "5px" }}
          >
            <div style={{ fontSize: "0.8rem", marginTop: "2rem" }}>
              Don't have an account?
            </div>
            <Link to="/sign-up" className={classes.register}>
              Register
            </Link>
          </Grid>
        </div>
      </Fragment>
    </Grid>
  );
};

export default Form;
