import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
    wordBreak: "break-all",
    textAlign: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TabularData = ({ transactions }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Typography>Number of transactions: {transactions.length}</Typography>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">blockHash</StyledTableCell>
            <StyledTableCell align="center">transactionHash</StyledTableCell>
            <StyledTableCell align="center">blockNumber</StyledTableCell>
            <StyledTableCell align="center">From</StyledTableCell>
            <StyledTableCell align="center">To</StyledTableCell>
            <StyledTableCell align="center">Value</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <StyledTableRow key={transaction.transactionHash}>
              <StyledTableCell component="th" scope="row" align="center">
                {transaction.address}
              </StyledTableCell>
              <StyledTableCell align="center">
                {transaction.blockHash}
              </StyledTableCell>
              <StyledTableCell align="center">
                {transaction.transactionHash}
              </StyledTableCell>
              <StyledTableCell align="center">
                {transaction.blockNumber}
              </StyledTableCell>
              <StyledTableCell align="center">
                {transaction.from}
              </StyledTableCell>
              <StyledTableCell align="center">{transaction.to}</StyledTableCell>
              <StyledTableCell align="center">
                {transaction.value} ETH
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabularData;
