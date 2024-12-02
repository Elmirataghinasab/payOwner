import axios from "axios";
import { isMainnet } from "./modules/config";

const apiKey = "cqt_rQ6BGHyb9VfxYJWgxxdPccjK44xV";

async function getNativeBalanceInUSD(chainId, walletAddress) {
  const url = `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/balances_v2/?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const balances = response.data.data.items;
    const nativeToken = balances.find(
      (token) =>
        token.contract_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );

    if (nativeToken) {
      const balanceInUSD = nativeToken.quote;
      return balanceInUSD;
      console.log(`Native Balance in USD: $${balanceInUSD.toFixed(2)}`);
    } else {
      console.log("No native balance found!");
    }
  } catch (error) {
    console.error("Error fetching native balance in USD:", error.message);
  }
}

async function getNativeBalance(chainId, walletAddress) {
  const url = `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/balances_v2/?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const balances = response.data.data.items;

    const nativeToken = balances.find(
      (token) =>
        token.contract_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );

    if (nativeToken) {
      console.log(
        `Native Balance: ${
          nativeToken.balance / 10 ** nativeToken.contract_decimals
        } ${nativeToken.contract_ticker_symbol}`
      );
      return nativeToken.balance / 10 ** nativeToken.contract_decimals;
    } else {
      console.log("No native balance found!");
    }
  } catch (error) {
    console.error("Error fetching native balance:", error.message);
  }
}

async function getBalance(chainId, walletAddress, symbol) {
  const nativeBalance = await getNativeBalance(chainId, walletAddress);
  const balanceInUSD = await getNativeBalanceInUSD(chainId, walletAddress);

  console.log(
    `Nativebalance in ${chainId} network for account: ${walletAddress} is ${nativeBalance} `
  );
  console.log(
    `USD balance of ${walletAddress} in ${chainId} network is ${balanceInUSD}`
  );

  return [balanceInUSD, symbol, nativeBalance];
}

async function getPOLNativeBalanceInUSD(chainId, walletAddress) {
  const url = `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/balances_v2/?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const balances = response.data.data.items;
    const nativeToken = balances.find(
      (token) =>
        token.contract_address === "0x0000000000000000000000000000000000001010"
    );

    if (nativeToken) {
      const balanceInUSD = nativeToken.quote;
      console.log(`Native Balance in USD: $${balanceInUSD.toFixed(2)}`);
      return balanceInUSD;
    } else {
      console.log("No native balance found!");
    }
  } catch (error) {
    console.error("Error fetching native balance in USD:", error.message);
  }
}
async function getPolNativeBalance(chainId, walletAddress) {
  const url = `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/balances_v2/?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const balances = response.data.data.items;

    const nativeToken = balances.find(
      (token) =>
        token.contract_address === "0x0000000000000000000000000000000000001010"
    );

    if (nativeToken) {
      console.log(
        `Native Balance: ${
          nativeToken.balance / 10 ** nativeToken.contract_decimals
        } ${nativeToken.contract_ticker_symbol}`
      );
      return nativeToken.balance / 10 ** nativeToken.contract_decimals;
    } else {
      console.log("No native balance found!");
    }
  } catch (error) {
    console.error("Error fetching native balance:", error.message);
  }
}

async function getPolbalance(walletAddress) {
  const balance = await getPolNativeBalance(137, walletAddress);
  const balanceInUSD = await getPOLNativeBalanceInUSD(137, walletAddress);
  return [balanceInUSD, "POL", balance];
}

export async function main(walletAddress) {
  if (isMainnet) {
    const ETH = await getBalance(1, walletAddress, "ETH");
    const ARB = await getBalance(42161, walletAddress, "ARB");
    const POL = await getPolbalance(walletAddress);
    const BSC = await getBalance(56, walletAddress, "BSC");
    const AVAX = await getBalance(43114, walletAddress, "AVAX");
    const FTM = await getBalance(250, walletAddress, "FTM");

    const Sort = [ETH, ARB, AVAX, BSC, FTM, POL];

    function sortBalances(arr) {
      return arr.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
    }

    const sortedBalances = await sortBalances(Sort);

    console.log(sortedBalances, sortedBalances[0]);

    return sortedBalances[0];
  } else {
    const ETHSepoliaBalance = await getNativeBalance(11155111, walletAddress);
    const ARBSepoliaBalance = await getNativeBalance(421614, walletAddress);
    const PolygonAmoyBalance = await getNativeBalance(80002, walletAddress);

    const ETHSepoliaInUSD = ETHSepoliaBalance * 3100;
    const ARBSepoliaInUSD = ARBSepoliaBalance * 3100;
    const POLAmoyUSD = PolygonAmoyBalance * 0.63;

    const ETHSepolia = [
      ETHSepoliaInUSD.toFixed(2),
      "ETHSEPOLIA",
      ETHSepoliaBalance,
    ];
    const ARBSepolia = [
      ARBSepoliaInUSD.toFixed(2),
      "ARBSEPOLIA",
      ARBSepoliaBalance,
    ];
    const POLAmoy = [POLAmoyUSD.toFixed(2), "POLAMOY", PolygonAmoyBalance];

    const Sort = [ETHSepolia, ARBSepolia, POLAmoy];

    function sortBalances(arr) {
      return arr.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
    }

    const sortedBalances = await sortBalances(Sort);

    console.log(sortedBalances, sortedBalances[0]);
    return sortedBalances[0];
  }
}
