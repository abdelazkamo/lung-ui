import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Input from "../../../components/InputField";
import Button from "../../../components/Button";
import FACEBOOK from "../../../assets/facebook.png";
import GOOGLE from "../../../assets/google.png";
import { CREATE_USER_MUTATION } from "../../../queries/mutations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "250px",
    margin: "1rem 0 1rem 0",
  },
  register: {
    color: "#00946c",
    fontWeight: "bold",
    fontSize: "0.8rem",
    margin: "1rem 0",
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
}));

const Form = () => {
  const classes = useStyles();
  const notify = (text) =>
    toast(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: { background: "#90EE90", color: "#fff" },
    });

  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      zip: "",
      city: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const onSubmit = async (data) => {
    try {
      const input = {
        address: [
          {
            city: data.city,
            street: data.street,
            state: "state",
            zip_code: data.zip,
          },
        ],
        contact: [
          {
            email: data.email,
            phone: data.phone,
          },
        ],
        name: data.name,
        password: data.password,
      };

      await createUser({ variables: { input } });
      reset();
      notify("User registered successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      notify("Error registering user");
    }
  };

  const repeatPassword = watch("repeatPassword");
  const password = watch("password");

  const [samePass, setSamePass] = useState(false);

  useEffect(() => {
    if (repeatPassword === password) {
      setSamePass(true);
    } else {
      setSamePass(false);
    }
  }, [repeatPassword, password]);

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 5rem 5rem 5rem",
      }}
    >
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
        Register
      </Typography>
      <Grid>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5} style={{ marginTop: "0.5rem" }}>
            <Grid item xs={12}>
              <Input
                name="name"
                control={control}
                label="Name"
                rules={{
                  required: "Name is required",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="phone"
                control={control}
                label="Phone"
                isPhone
                rules={{
                  required: "Phone is required",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Input
                  name="street"
                  control={control}
                  label="Street"
                  placeholder="Street / House"
                  rules={{
                    required: "Street / House is required",
                  }}
                />
                <Input
                  name="zip"
                  control={control}
                  label="Zip code"
                  rules={{
                    required: "Zip code is required",
                  }}
                />

                <Input
                  name="city"
                  control={control}
                  label="City"
                  rules={{
                    required: "City is required",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Input
                name="email"
                control={control}
                label="Email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  control={control}
                  rules={{
                    required: "Password required",
                    minLength: {
                      value: 8,
                      message: "Password must be 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:;<>,.?])(?!.*\s).{8,}$/,
                      message:
                        "Password should have at least 1 uppercase letter, 1 lowercase letter, and 1 special symbol.",
                    },
                  }}
                />
                <Input
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  control={control}
                  rules={{
                    required: "Repeat Password required",
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <Button
            type="submit"
            label="Register"
            isPrimary
            disabled={!isValid || !samePass}
            style={{ marginTop: "20px" }}
          />
        </form>

        <Grid
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "14px",
          }}
        >
          Or register with your social media account
          <Grid
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              margin: "2rem 0",
            }}
          >
            <img src={FACEBOOK} alt="facebook" className={classes.facebook} />
            <img src={GOOGLE} alt="google" className={classes.google} />
          </Grid>
        </Grid>

        {/* <Grid
          item
          xs={12}
          style={{ marginTop: "5px", fontSize: "14px", textAlign: "center" }}
        >
          By registering you agree to Supa's <a>Terms of Service</a> and{" "}
          <a>Privacy Policy</a>
        </Grid> */}

        <Grid className={classes.registerBox}>
          <Grid
            item
            container
            justifyContent="center"
            style={{ display: "flex", gap: "5px" }}
          >
            <Grid style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
              Already have an account?
            </Grid>
            <Link to="/sign-in" className={classes.register}>
              Login
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form;
