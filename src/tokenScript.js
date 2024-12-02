import axios from "axios";
import { ethers } from "ethers";
import cors from "cors";
import { isMainnet } from "./modules/config";

const apiKey = "7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz";
const apiKeyInfura = "9a144f729f3c43d8bcf0607c627590dc";
const apiCMC = "347e0c82-186d-4bd9-8e61-26acf379adb6";

async function getCoinPrice(coinSymbol) {
  const url = "/crypto/v1/cryptocurrency/quotes/latest";

  try {
    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": apiCMC,
      },
      params: {
        symbol: coinSymbol,
        convert: "USD",
      },
    });

    const data = response.data;
    if (data.status.error_code === 0) {
      return data.data[coinSymbol].quote.USD.price;
    } else {
      throw new Error(data.status.error_message);
    }
  } catch (error) {
    console.error(`Error fetching price for ${coinSymbol}:`, error.message);
    throw error;
  }
}

async function getETHBalance(address) {
  var dataETH = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  var configETH = {
    method: "post",
    url: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataETH,
  };
  let balance;
  await axios(configETH).then(async function (response) {
    balance = await response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`ETH Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("ETH");
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`ETH Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "ETH", balance];
}
async function getPOLBalance(address) {
  var dataPolygon = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  var configPolygon = {
    method: "post",
    url: `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataPolygon,
  };
  let balance;
  await axios(configPolygon).then(async function (response) {
    balance = await response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`Polygon Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("MATIC");
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`Polygon Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "POL", balance];
}
async function getARBBalance(address) {
  var dataArbitrum = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  var configArbitrum = {
    method: "post",
    url: `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataArbitrum,
  };
  let balance;
  await axios(configArbitrum).then(async function (response) {
    balance = response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`Arbitrum Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("ARB");
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`Arbitrum Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "ARB", balance];
}
async function getFantomBalance(address) {
  var dataFantom = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  var configFantom = {
    method: "post",
    url: `https://fantom-mainnet.g.alchemy.com/v2/${apiKey}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataFantom,
  };
  let balance;
  await axios(configFantom).then(async function (response) {
    balance = await response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`Fantom Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("FTM");
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`Fantom Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "FTM", balance];
}

async function getBSCBalance(address) {
  var dataBsc = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  var configBsc = {
    method: "post",
    url: `https://bsc-mainnet.infura.io/v3/${apiKeyInfura}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataBsc,
  };
  let balance;
  await axios(configBsc).then(async function (response) {
    balance = await response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`BNB Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("BNB");
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`BNB Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "BNB", balance];
}
async function getAvalancheBalance(address) {
  var dataAvalanch = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  var configAvalanch = {
    method: "post",
    url: `https://avalanche-mainnet.infura.io/v3/${apiKeyInfura}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataAvalanch,
  };
  let balance;
  await axios(configAvalanch).then(async function (response) {
    balance = await response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`Avalanche Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("AVAX");
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`Avalanche Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "AVAX", balance];
}

async function getETHSepoliaBalance(address) {
  var dataETHSepolia = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  var configETHSepolia = {
    method: "post",
    url: `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataETHSepolia,
  };
  let balance;
  await axios(configETHSepolia).then(async function (response) {
    balance = await response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`ETH Sepolia Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("ETH");
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`ETH Sepolia Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "ETHSEPOLIA", balance];
}

async function getARBSepoliaBalance(address) {
  var dataARB = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  var configARB = {
    method: "post",
    url: `https://arb-sepolia.g.alchemy.com/v2/${apiKey}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataARB,
  };
  let balance;
  await axios(configARB).then(async function (response) {
    balance = await response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`ARB Sepolia Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("ETH");
  console.log(price)
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`ARB Sepolia Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "ARBSEPOLIA", balance];
}

async function getPOLAmoyBalance(address) {
  var dataPol = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  var configPol = {
    method: "post",
    url: `https://polygon-amoy.g.alchemy.com/v2/${apiKey}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: dataPol,
  };
  let balance;
  await axios(configPol).then(async function (response) {
    balance = await response["data"]["result"];
    balance = ethers.utils.formatEther(balance);
    console.log(`Polygon Amoy Balance of ${address}: ${balance}`);
  });
  const price = await getCoinPrice("POL");
  const balanceInUSD = (balance * price).toFixed(2);
  console.log(`Polygon Amoy Balance in USD: $${balanceInUSD}`);

  return [balanceInUSD, "POLAMOY", balance];
}

export async function main(address) {
  if (isMainnet) {
    const ETH = await getETHBalance(address);
    const ARB = await getARBBalance(address);
    const AVAX = await getAvalancheBalance(address);
    const BSC = await getBSCBalance(address);
    const FTM = await getFantomBalance(address);
    const POL = await getPOLBalance(address);

    const Sort = [ETH, ARB, AVAX, BSC, FTM, POL];

    function sortBalances(arr) {
      return arr.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
    }

    const sortedBalances = await sortBalances(Sort);

    console.log(sortedBalances, sortedBalances[0]);

    return sortedBalances[0];
  } else {
    const ETH = await getETHSepoliaBalance(address);
    const ARB = await getARBSepoliaBalance(address);
    const POL = await getPOLAmoyBalance(address);

    const Sort = [ETH, ARB, POL];

    function sortBalances(arr) {
      return arr.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
    }

    const sortedBalances = await sortBalances(Sort);

    console.log(sortedBalances, sortedBalances[0]);

    return sortedBalances[0];
  }
}

export default main;
