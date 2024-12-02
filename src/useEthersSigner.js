import { providers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useConnectorClient, useChainId } from "wagmi";

export function clientToSigner(client) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export function useEthersSigner({ chainId } = {}) {
  const { data: client } = useConnectorClient({ chainId });
  const { chain } = useChainId();
  const [signer, setSigner] = useState();

  useEffect(() => {
    if (client) {
      const newSigner = clientToSigner(client);
      setSigner(newSigner);
    } else {
      setSigner(undefined);
    }
  }, [client, chain?.id]); // React to changes in the client or chain ID

  return useMemo(() => signer, [signer]);
}
