import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Loader from "react-loader-spinner";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import TabularData from "../../components/TabularData/component";
import { getTransactionsByAccount } from "../../services/request";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    maxWidth: "1400px",
    margin: "0 auto",
    minHeight: "70vh",
    paddingTop: "15vh",
    "@media screen and (min-width:1175px) and (max-width: 1400px)": {
      padding: "15vh",
    },
  },
  textField: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  textWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const TokenTransactions = () => {
  const classes = useStyles();
  const submitTokenData = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setloading(true);
    const response = await getTransactionsByAccount(tokenAddress, ownerAddress);
    if (response.error === null) {
      setTransaction(response.data);
    } else {
      setError(response.error);
    }
    setloading(false);
  };
  const [tokenAddress, settokenAddress] = useState("");
  const [ownerAddress, setownerAddress] = useState("");
  const [error, setError] = useState("No Blocks Yet!!");
  const [transactions, setTransaction] = useState([]);
  const [loading, setloading] = useState(false);
  return (
    <div>
      <div className={classes.wrapper}>
        <CssBaseline />
        <div className={classes.paper}>
          <form onSubmit={submitTokenData}>
            <div className={classes.textWrapper}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="token-address-input"
                type="input"
                label="Token Address"
                name="tokenAddress"
                style={{ width: "35%" }}
                autoFocus
                onChange={(e) => {
                  settokenAddress(e.target.value);
                }}
                placeholder="0xC7D299f600afCbD4cF72Dbfe9e77d04181b47b3f"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                style={{ width: "35%" }}
                id="token-address-input"
                type="input"
                label="Owner Address"
                name="ownerAddress"
                autoFocus
                onChange={(e) => {
                  setownerAddress(e.target.value);
                }}
                placeholder="0xC7D299f600afCbD4cF72Dbfe9e77d04181b47b3f"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
              style={{ marginTop: "100px" }}
            >
              Get Transactions
            </Button>
          </form>
        </div>
        {(transactions.length && loading) ||
        (!transactions.length && loading) ? (
          <div style={{ textAlign: "center", marginTop: 100 }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : transactions.length && !loading ? (
          <TabularData transactions={transactions} />
        ) : (
          <div>
            <Typography style={{ textAlign: "center", marginTop: 100 }}>
              {error}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
export default TokenTransactions;
