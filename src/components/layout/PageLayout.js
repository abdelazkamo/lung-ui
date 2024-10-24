import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

const useStyles = makeStyles(() => ({
  pageLayoutContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  mainContainer: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 0,
    height: "100vh",
    overflow: "hidden",
  },
  previewContainer: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    paddingLeft: "20px",
  },
  modalButtons: {
    fontSize: "18px",
    textTransform: "none",
    paddingBlock: 5,
    paddingInline: 15,
    minWidth: 140,
    height: 44,
    borderRadius: 6,
    transition: "all .5s",
    "&:disabled": {
      opacity: "0.7",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 1.8rem",
  },

  "@media (max-width: 700px)": {
    mainContainer: {
      flex: "1",
    },
    previewContainer: {
      display: "none",
    },
  },
}));

const PageLayout = ({ form, previews }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageLayoutContainer}>
      <div style={{ display: "flex", height: "100%" }}>
        <Paper elevation={1} className={classes.mainContainer}>
          {form}
        </Paper>
        <div className={classes.previewContainer}>{previews}</div>
      </div>
    </div>
  );
};

export default PageLayout;
