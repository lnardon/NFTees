import { useState, useEffect } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import NFTEEContract from "./contract/NFTEE.json";

import { SplashSection } from "./components/SplashSection";
import { CollectionSection } from "./components/CollectionSection";
import { ActionsSection } from "./components/ActionsSection";
import Modal from "./components/Modal";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [web3, setWeb3] = useState(new Web3());
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);

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

  async function checkAccount() {
    let web3 = new Web3(window.ethereum);
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  async function buyStandardNFT() {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      "0xCAE8090822704A19B3FE6ebae40F092b6B9eb624"
    );
    let t = await a.methods.mintStandard().call();
    alert(t);
  }

  async function getPinkEditionNFT() {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      "0xCAE8090822704A19B3FE6ebae40F092b6B9eb624"
    );
    let t = await a.methods.mintPinkEdition().call();
    alert(t);
  }

  async function getFoundersNFT() {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      "0xCAE8090822704A19B3FE6ebae40F092b6B9eb624"
    );
    let t = await a.methods.mintFoundersEdition().call();
    alert(t);
  }

  function scrollToSection() {
    let collectionDiv = document.getElementsByClassName("collectionRef")[0];
    window.scrollTo({
      left: 0,
      top: collectionDiv.getBoundingClientRect().top,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      "0xCAE8090822704A19B3FE6ebae40F092b6B9eb624"
    );
    setContract(a);
  }, []);

  const transferOwnership = () => {
    return (
      <div>
        <h1>Transfer ownership</h1>
        <input type="text" />
        <button onClick={() => console.log("e")}>Send</button>
      </div>
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        renderProps={transferOwnership}
      />
      <SplashSection scrollToSection={scrollToSection} />
      <CollectionSection
        getStandardEditionNFT={buyStandardNFT}
        getPinkEditionNFT={getPinkEditionNFT}
        getFoundersNFT={getFoundersNFT}
      />
      <ActionsSection
        connectMetamask={activate}
        userAddress={account}
        transferAction={() => setIsOpen(true)}
      />
    </>
  );
}

export default App;
