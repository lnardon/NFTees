import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

import { SplashSection } from "./components/SplashSection";
import { CollectionSection } from "./components/CollectionSection";
import { ActionsSection } from "./components/ActionsSection";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  async function connect(onConnected: (arg0: any) => void) {
    if (!window.ethereum) {
      alert("This website requires a Metamask wallet to unlock its features!");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    onConnected(accounts[0]);
  }

  async function checkIfWalletIsConnected() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const account = accounts[0];
        return;
      }
    }
  }

  return (
    <>
      <SplashSection />
      <CollectionSection />
      <ActionsSection
        connectMetamask={() => connect(setUserAddress)}
        userAddress={userAddress}
      />
    </>
  );
}

export default App;
