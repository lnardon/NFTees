import { useMemo, useEffect, useCallback } from "react";
import Web3 from "web3";

import { SplashSection } from "./components/SplashSection";
import { CollectionSection } from "./components/CollectionSection";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  let web3: Web3 = useMemo(() => new Web3(), []);

  const ethEnabled = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.eth_requestAccounts();
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }, [web3]);

  useEffect(() => {
    (async () => {
      if (!ethEnabled()) {
        alert("Please install MetaMask to use this dApp!");
      }
    })();
  }, [web3, ethEnabled]);

  return (
    <>
      <SplashSection />
      <CollectionSection />
    </>
  );
}

export default App;
