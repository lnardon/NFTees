import { useState } from "react";
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
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState("");

  // invoke to connect to wallet account
  async function activate() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        checkAccount();
      } catch (err) {
        console.log("user did not add account...", err);
      }
    }
  }

  // invoke to check if account is already connected
  async function checkAccount() {
    let web3 = new Web3(window.ethereum);
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  async function buyStandardNFT() {
    alert("Work in Progress");
    console.log(web3);
  }

  return (
    <>
      <SplashSection />
      <CollectionSection
        getStandardEditionNFT={buyStandardNFT}
        getPinkEditionNFT={() => alert("Work in Progress")}
      />
      <ActionsSection connectMetamask={activate} userAddress={account} />
    </>
  );
}

export default App;
