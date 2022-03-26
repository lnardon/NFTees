import { useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import NFTEEContract from "./contract/NFTEE.json";

import { SplashSection } from "./components/SplashSection";
import { CollectionSection } from "./components/CollectionSection";
import { ActionsSection } from "./components/ActionsSection";
import Modal from "./components/Modal";
import Transfer from "./components/Modal/content/Transfer";
import Owner from "./components/Modal/content/Owner";
import MyNFTees from "./components/Modal/content/MyNFTees";
import BuyNFTee from "./components/Modal/content/BuyNFTee";

declare global {
  interface Window {
    ethereum: any;
  }

  interface INFTee {
    blockHash: string;
    blockNumber: string;
    hash: string;
    tokenID: string;
    confirmations: string;
    timestamp: string;
  }
}

function App() {
  const [web3, setWeb3] = useState(new Web3());
  const [account, setAccount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalContentIndex, setModalContentIndex] = useState(7);
  const contractAddress = "0x868c1bc5e4f58e34e4a85240c37b89dbfb46e07e";
  const contractInteraction = new web3.eth.Contract(
    NFTEEContract.abi as AbiItem[],
    contractAddress
  );

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
    scrollToSection("actionsRef");
  }

  function isLoggedIn() {
    if (account.length < 1) {
      activate();
      return false;
    }
    return true;
  }

  async function buyStandardNFT() {
    if (isLoggedIn()) {
      try {
        setModalContentIndex(3);
        setIsOpen(true);
        modalContent();
        let response = await contractInteraction.methods
          .mintStandard()
          .send({ from: account, value: 0 });
        alert(response);
        console.log(response);
      } catch (err: any) {
        alert(err.message);
      }
      setIsOpen(false);
    } else {
      alert("Please connect your Metamask Wallet to get you NFTee.");
    }
  }

  async function getPinkEditionNFT() {
    if (isLoggedIn()) {
      try {
        setModalContentIndex(3);
        setIsOpen(true);
        modalContent();
        let response = await contractInteraction.methods
          .mintPinkEdition()
          .send({ from: account, value: 1000000000000000000 });
        alert(response);
      } catch (err: any) {
        alert(err.message);
      }
      setIsOpen(false);
    } else {
      alert("Please connect your Metamask Wallet to get you NFTee.");
    }
  }

  async function getFoundersNFT() {
    if (isLoggedIn()) {
      try {
        setModalContentIndex(3);
        setIsOpen(true);
        modalContent();
        let response = await contractInteraction.methods
          .mintFoundersEdition()
          .send({ from: account, value: 5000000000000000000 });
        alert(response);
      } catch (err: any) {
        alert(err.message);
      }
      setIsOpen(false);
    } else {
      alert("Please connect your Metamask Wallet to get you NFTee.");
    }
  }

  async function getNFTeeData(tokenId: string) {
    if (isLoggedIn()) {
      try {
        let response = await contractInteraction.methods
          .tokenURI(tokenId)
          .call();
        window.open(response, "_blank");
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  function scrollToSection(classname: string) {
    let collectionDiv = document.getElementsByClassName(classname)[0];
    window.scrollTo({
      left: 0,
      top: collectionDiv.getBoundingClientRect().top,
      behavior: "smooth",
    });
  }

  function openModal(modalIndex: number) {
    setModalContentIndex(modalIndex);
    setIsOpen(true);
  }

  function modalContent() {
    switch (modalContentIndex) {
      case 0:
        return (
          <Transfer
            contractInteraction={contractInteraction}
            account={account}
            handleClose={() => setIsOpen(false)}
          />
        );
      case 1:
        return (
          <Owner
            contractInteraction={contractInteraction}
            handleClose={() => setIsOpen(false)}
          />
        );
      case 2:
        return (
          <MyNFTees
            account={account}
            contractAddress={contractAddress}
            handleClose={() => setIsOpen(false)}
            getNFTeeData={getNFTeeData}
          />
        );
      case 3:
        return <BuyNFTee handleClose={() => setIsOpen(false)} />;
      default:
        return null;
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        renderProps={modalContent}
      />
      <SplashSection scrollToSection={() => scrollToSection("collectionRef")} />
      <CollectionSection
        getStandardEditionNFT={buyStandardNFT}
        getPinkEditionNFT={getPinkEditionNFT}
        getFoundersNFT={getFoundersNFT}
      />
      <ActionsSection
        connectMetamask={activate}
        userAddress={account}
        openModal={openModal}
        contract={contractAddress}
      />
    </>
  );
}

export default App;
