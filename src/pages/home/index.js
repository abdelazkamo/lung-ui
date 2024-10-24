import React, { useState, useEffect } from "react";
import { color, padding, styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import Clear from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg.jpg";
import { makeStyles } from "@mui/styles";

const Grow = styled("div")({
  flexGrow: 1,
});

const ClearButton = styled(Button)({
  width: "100%",
  borderRadius: "15px",
  padding: "15px 22px",
  color: "#000000a6",
  fontSize: "20px",
  fontWeight: 900,
});

const Media = styled(CardMedia)({
  height: 400,
});

const PaperContainer = styled(Paper)({
  padding: 16,
  margin: "auto",
  maxWidth: 500,
});

const GridContainer = styled(Grid)({
  justifyContent: "center",
  padding: "4em 1em 0 1em",
});

const MainContainer = styled(Container)({
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "91vh",
  marginTop: "8px",
});

const ImageCard = styled(Card)({
  margin: "auto",
  maxWidth: 400,
  height: 500,
  backgroundColor: "transparent",
  boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%)",
  borderRadius: "15px",
});

const ImageCardEmpty = styled(Card)({
  height: "auto",
});

const Detail = styled(CardContent)({
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const Appbar = styled(AppBar)({
  background: "#fff",
  boxShadow: "none",
  //color: "white",
});

const Loader = styled(CircularProgress)({
  color: "#be6a77",
});

const StyledTableCell = styled(TableCell)({
  fontSize: "22px",
  backgroundColor: "transparent",
  borderColor: "transparent",
  color: "#000000a6",
  fontWeight: "bolder",
  padding: "1px 24px 1px 16px",
});

const StyledTableCell1 = styled(TableCell)({
  fontSize: "14px",
  backgroundColor: "transparent",
  borderColor: "transparent",
  color: "#000000a6",
  fontWeight: "bolder",
  padding: "1px 24px 1px 16px",
});

const useStyles = makeStyles((theme) => ({
  logout: {
    "&:hover": {
      backgroundColor: "#fd5624",
      borderRadius: "5px",
      padding: 2,
    },
  },
}));

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const logmeout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  const classes = useStyles();

  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: "http://localhost:8000/predict",
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <Appbar position="static">
        <Toolbar>
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
          <Grow />
          <LogoutIcon
            color="success"
            className={classes.logout}
            onClick={logmeout}
          />
        </Toolbar>
      </Appbar>
      <MainContainer maxWidth={false} disableGutters>
        <GridContainer
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <ImageCard className={!image ? ImageCardEmpty : ""}>
              {image && (
                <CardActionArea>
                  <Media
                    image={preview}
                    component="image"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              )}
              {!image && (
                <CardContent>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={
                      "Drag and drop a CT scan of a lung to process"
                    }
                    onChange={onSelectFile}
                  />
                </CardContent>
              )}
              {data && (
                <Detail>
                  <TableContainer component={Paper} className={PaperContainer}>
                    <Table size="small" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell1>Disease:</StyledTableCell1>
                          <StyledTableCell1 align="right">
                            Confidence:
                          </StyledTableCell1>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <StyledTableCell component="th" scope="row">
                            {data.class}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {confidence}%
                          </StyledTableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Detail>
              )}
              {isLoading && (
                <Detail>
                  <Loader />
                  <Typography variant="h6" noWrap>
                    Processing
                  </Typography>
                </Detail>
              )}
            </ImageCard>
          </Grid>
          {data && (
            <Grid item className="buttonGrid">
              <ClearButton
                variant="contained"
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                Clear
              </ClearButton>
            </Grid>
          )}
        </GridContainer>
      </MainContainer>
    </React.Fragment>
  );
};
