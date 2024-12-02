import { WagmiProvider, createConfig, http } from "wagmi";
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
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { isMainnet } from "../modules/config";

const chains = isMainnet
  ? [mainnet, arbitrum, polygon, avalanche, bsc, fantom]
  : [sepolia,arbitrumSepolia, polygonAmoy];

export const config = isMainnet
  ? createConfig(
      getDefaultConfig({
        chains,
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
        walletConnectProjectId: " 7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz",
      })
    )
  : createConfig(
      getDefaultConfig({
        chains,
        transports: {
          [sepolia.id]: http(
            `https://eth-sepolia.g.alchemy.com/v2/7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz`
          ),
          [arbitrumSepolia.id]: http(
            `https://arb-sepolia.g.alchemy.com/v2/gOdtC9qkQfB5fq8LsaEiXDJyCWnEXXzd`
          ),
          [polygonAmoy.id]: http(
            `https://polygon-amoy.g.alchemy.com/v2/gOdtC9qkQfB5fq8LsaEiXDJyCWnEXXzd`
          ),
        },
        walletConnectProjectId: " 7PW6w16NTzgdT0NiWUFLJxLUL5XHGTMz",
      })
    );

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
