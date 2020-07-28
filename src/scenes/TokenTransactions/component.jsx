import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Loader from "react-loader-spinner";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import TabularData from "../../components/TabularData/component";
import { getTransactions } from "../../services/request";
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
    marginTop: "100px",
  },
}));

const TokenTransactions = () => {
  const getUniqueValuesAndSort = (arr, key) => {
    return [
      ...new Map(arr.map((item) => [item[key], item])).values(),
    ].sort((a, b) => (a.blockNumber > b.blockNumber ? -1 : 1));
  };
  const classes = useStyles();
  const submitTokenData = async (e) => {
    setTransaction([]);
    e.stopPropagation();
    e.preventDefault();
    setloading(true);
    const response = await getTransactions(tokenAddress);
    if (response.error === null) {
      setTransaction(getUniqueValuesAndSort(response.data, "transactionHash"));
      localStorage.setItem("transactions", JSON.stringify(response.data));
    } else {
      setTransaction([]);
      localStorage.clear();
      setError(response.error);
    }
    setloading(false);
  };
  const getMoreTransactions = async (e) => {
    const previousTransactions = JSON.parse(
      localStorage.getItem("transactions")
    );
    e.stopPropagation();
    e.preventDefault();
    setloading(true);
    const response = await getTransactions(tokenAddress);
    if (response.error === null) {
      setTransaction(
        getUniqueValuesAndSort(
          [...previousTransactions, ...response.data],
          "transactionHash"
        )
      );

      localStorage.setItem("transactions", JSON.stringify(transactions));
    } else {
      setTransaction([]);
      localStorage.clear();
      setError(response.error);
    }
    setloading(false);
  };
  const [tokenAddress, settokenAddress] = useState("");
  const [transactions, setTransaction] = useState([]);
  const [error, setError] = useState("No Blocks Yet!!");
  const [loading, setloading] = useState(false);
  return (
    <div>
      <div className={classes.wrapper}>
        <CssBaseline />
        <div className={classes.paper}>
          <form onSubmit={submitTokenData}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="token-address-input"
              type="input"
              label="Token Address"
              name="tokenAddress"
              autoFocus
              onChange={(e) => {
                settokenAddress(e.target.value);
              }}
              placeholder="0xC7D299f600afCbD4cF72Dbfe9e77d04181b47b3f"
            />
            <div className={classes.buttonWrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Submit Address
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={getMoreTransactions}
                disabled={!transactions.length || loading}
              >
                Get Latest Data
              </Button>
            </div>
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
