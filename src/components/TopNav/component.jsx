import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#3ba8d0",
    paddingRight: 10,
    background:
      "linear-gradient(90deg, #4F2A95 0%, #001F5A 51.56%, #0099CA 100%)",
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  leftHeading: {
    flex: 2,
    paddingRight: 250,
    "& > h6": {
      color: "white",
    },
  },
  rightHeading: {
    textDecoration: "none",
    "& > h6": {
      color: "white",
    },
  },
  icon: {
    color: "white",
  },
  menuItems: {
    color: "white",
    fontWeight: 300,
  },
  loader: {
    top: "74px",
    left: "256px",
  },
}));

const TopNav = (props) => {
  const classes = useStyles();

  return (
    <div data-test-id="navbar__wrapper">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.leftHeading}>
            <Typography variant="h6">Jibrel Test</Typography>
          </Link>
          <Link to="/account" className={classes.rightHeading}>
            <Typography variant="h6">Get Transactions by Account</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNav;
