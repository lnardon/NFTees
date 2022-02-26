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

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [web3, setWeb3] = useState(new Web3());
  const [account, setAccount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalContentIndex, setModalContentIndex] = useState(4);
  const contractAddress = "0xCAE8090822704A19B3FE6ebae40F092b6B9eb624";
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
        let response = await contractInteraction.methods
          .mintStandard()
          .send({ from: account, value: 0 });
        alert(response);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  async function getPinkEditionNFT() {
    if (isLoggedIn()) {
      try {
        let response = await contractInteraction.methods
          .mintPinkEdition()
          .send({ from: account, value: 1000000000000000000 });
        alert(response);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  async function getFoundersNFT() {
    if (isLoggedIn()) {
      try {
        let response = await contractInteraction.methods
          .mintFoundersEdition()
          .send({ from: account, value: 5000000000000000000 });
        alert(response);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  function scrollToSection() {
    let collectionDiv = document.getElementsByClassName("collectionRef")[0];
    window.scrollTo({
      left: 0,
      top: collectionDiv.getBoundingClientRect().top,
      behavior: "smooth",
    });
  }

  async function handleTransfer(wallet: string, tokenId: number) {
    try {
      let t = await contractInteraction.methods
        .safeTransferFrom(account, wallet, tokenId)
        .send({ from: account, value: 0 });
      alert(t);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function getOwner(tokenId: number) {
    try {
      let t = await contractInteraction.methods.ownerOf(tokenId).call();
      alert(`The NFTee ID ${tokenId} belongs to the wallet: ${t}`);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function getMyNFTees() {
    try {
      let response = await contractInteraction.methods
        .balanceOf(account)
        .send({ from: account, value: 0 });
      alert(response);
    } catch (err: any) {
      alert(err.message);
    }
  }

  function modalContent() {
    switch (modalContentIndex) {
      case 0:
        return (
          <Transfer
            handleTransfer={handleTransfer}
            handleClose={() => setIsOpen(false)}
          />
        );
      case 1:
        return (
          <Owner getOwner={getOwner} handleClose={() => setIsOpen(false)} />
        );
      case 2:
        return (
          <MyNFTees
            getMyNFTees={getMyNFTees}
            handleClose={() => setIsOpen(false)}
          />
        );
      default:
        return null;
    }
  }

  function openModal(modalIndex: number) {
    setModalContentIndex(modalIndex);
    setIsOpen(true);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        renderProps={modalContent}
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
        openModal={openModal}
      />
    </>
  );
}

export default App;
