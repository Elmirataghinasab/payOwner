import { http, createConfig } from "@wagmi/core";
import {
  mainnet,
  arbitrum,
  polygon,
  avalanche,
  bsc,
  fantom,
  sepolia,
  arbitrumSepolia,
  polygonAmoy,
} from "@wagmi/core/chains";

export const isMainnet = false;

export const config = isMainnet
  ? createConfig({
      chains: [mainnet, polygon, arbitrum, avalanche, bsc, fantom],
      transports: {
        [mainnet.id]: http(
          `https://eth-mainnet.g.alchemy.com/v2/7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz`
        ),
        [polygon.id]: http(
          `https://polygon-mainnet.g.alchemy.com/v2/7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz`
        ),
        [arbitrum.id]: http(
          `https://arb-mainnet.g.alchemy.com/v2/7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz`
        ),
        [avalanche.id]: http(
          `https://avalanche-mainnet.infura.io/v3/9a144f729f3c43d8bcf0607c627590dc`
        ),
        [bsc.id]: http(
          `https://bsc-mainnet.infura.io/v3/9a144f729f3c43d8bcf0607c627590dc`
        ),
        [fantom.id]: http(
          `https://fantom-mainnet.g.alchemy.com/v2/7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz`
        ),
      },
    })
  : createConfig({
      chains: [sepolia, polygonAmoy, arbitrumSepolia],
      transports: {
        [sepolia.id]: http(
          `https://eth-sepolia.g.alchemy.com/v2/7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz`
        ),
        [polygonAmoy.id]: http(
          `https://polygon-amoy.g.alchemy.com/v2/gOdtC9qkQfB5fq8LsaEiXDJyCWnEXXzd`
        ),
        [arbitrumSepolia.id]: http(
          `https://arb-sepolia.g.alchemy.com/v2/gOdtC9qkQfB5fq8LsaEiXDJyCWnEXXzd`
        ),
      },
    });

export let networkIds = isMainnet
  ? {
      ETH: 1,
      ARB: 42161,
      POL: 137,
      BNB: 56,
      AVAX: 43114,
      FTM: 250,
    }
  : {
      ETHSEPOLIA: 11155111,
      ARBSEPOLIA: 421614,
      POLAMOY: 80002,
    };

    export const ContractAddresses = isMainnet ? {
      ETH: "0xYourContractAddressForETH",
      ARB: "0xYourContractAddressForARB",
      POL: "0xYourContractAddressForPOL",
      BNB: "0xYourContractAddressForBNB",
      AVAX: "0xYourContractAddressForAVAX",
      FTM: "0xYourContractAddressForFTM",
    } :  {
      ETHSEPOLIA: "0x6e5BBa7242f8a118E9084b6CD69E70D89B1e0703",
      ARBSEPOLIA: "0x714eb3b934e07373a16184e3834ae37beba18def",
      POLAMOY: "0x78e3F1faA8919bD0e879c14894dCa8C020fa87CF",
    } 
