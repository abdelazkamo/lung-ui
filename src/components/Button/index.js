import { makeStyles } from "@mui/styles";
import { Button as MatButton } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  defaultRoot: {
    height: "40px",
    minWidth: "150px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderColor: "#00946c",
    backgroundColor: "#00946c",
    "&:hover": {
      backgroundColor: "#1d614f",
    },
    "&$disabled": {
      background: "rgba(143, 245, 197, 0.678);",
      cursor: "not-allowed",
    },
    paddingTop: 10,
  },
  secondaryRoot: {
    height: "40px",
    fontSize: "1rem",
    minWidth: "150px",
    fontWeight: "bold",
    borderColor: "#fd5624",
    backgroundColor: "#fd5624",
    "&:hover": {
      backgroundColor: "#D4603D",
    },
    "&$disabled": {
      background: "#EE8464",
      cursor: "not-allowed",
    },
    paddingTop: 10,
  },
  thirdRoot: {
    borderColor: (props) => props.color,
    height: "40px",
    minWidth: "150px",
    fontSize: "1rem",
    fontWeight: "bold",
    paddingTop: 10,
  },
  labelDefault: {
    color: "white",
  },
  labelThird: {
    color: "#000",
  },
  labelSecondary: {
    color: "#000",
  },
  disabled: {
    background: "rgba(1, 140, 249, 0.4)",
    cursor: "not-allowed",
  },
}));

const Button = (props) => {
  const { label, isSecondary, isThird, onClick, style, disabled, type } = props;
  const classes = useStyles(props);
  return (
    <MatButton
      classes={{
        root: isSecondary
          ? classes.secondaryRoot
          : isThird
          ? classes.thirdRoot
          : classes.defaultRoot,
        label: isSecondary
          ? classes.labelSecondary
          : isThird
          ? classes.labelThird
          : classes.labelDefault,
        disabled: classes.disabled,
      }}
      disabled={disabled}
      variant={isThird ? "outlined" : "contained"}
      fullWidth
      type={type || "button"}
      style={style}
      onClick={onClick}
    >
      {label}
    </MatButton>
  );
};

export default Button;
