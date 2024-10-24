import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/InputField";
import Button from "../../../components/Button";
import LOGO from "../../../assets/logo.png";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN_USER_QUERY } from "../../../queries/queries";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RESET_PASSWORD_MUTATION } from "../../../queries/mutations";

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
    watch,
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const [resetLink] = useMutation(RESET_PASSWORD_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password } = getValues();
    const token = id;

    await resetLink({
      variables: { input: { password, token } },
      fetchPolicy: "network-only",
      onCompleted: () => {
        localStorage.clear();
        notify("Your Password has been updated", "#90EE90");
        navigate("/");
      },
    });
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
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid
            container
            spacing={3}
            style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
          >
            <Grid item xs={12}>
              <Input
                name="password"
                label="New Password"
                type="password"
                control={control}
                rules={{
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:;<>,.?])(?!.*\s).{8,}$/,
                    message:
                      "Password should have at least 1 uppercase letter, 1 lowercase letter, and 1 special symbol.",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} marginTop={4}>
              <Input
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                control={control}
                rules={{
                  required: "Repeat Password required",
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            label="Save"
            isPrimary
            disabled={!isValid || !samePass}
          />
        </form>
      </Fragment>
    </Grid>
  );
};

export default Form;
