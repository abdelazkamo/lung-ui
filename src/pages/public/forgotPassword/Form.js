import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/InputField";
import Button from "../../../components/Button";
import LOGO from "../../../assets/logo.png";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN_USER_QUERY } from "../../../queries/queries";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SEND_RESET_PASSWORD_MUTATION } from "../../../queries/mutations";

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
    },
  });

  const [sendResetLink] = useMutation(SEND_RESET_PASSWORD_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = getValues();

    await sendResetLink({
      variables: { email },
      fetchPolicy: "network-only",
      onCompleted: () => {
        notify("A reset link has been sent to your email", "#90EE90");
      },
    });
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
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid
            container
            spacing={3}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
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
          </Grid>

          <Button
            type="submit"
            label="Send Resset Link"
            isPrimary
            disabled={!isValid}
          />
        </form>
      </Fragment>
    </Grid>
  );
};

export default Form;
