import request from "./APIService";
export const getTransactions = async (tokenAddress) => {
  try {
    const response = await request({
      method: "POST",
      url: `/transactions/${tokenAddress}`,
      data: {
        tokenAddress,
      },
    });

    return response;
  } catch (error) {
    console.log("getTransactions -> error", error);
  }
};
export const getTransactionsByAccount = async (
  tokenAddress,
  accountAddress
) => {
  try {
    const response = await request({
      method: "GET",
      url: `/transactions/${tokenAddress}`,
      params: {
        owner: accountAddress,
      },
    });

    return response;
  } catch (error) {
    console.log("getTransactions -> error", error);
  }
};
