import { useState, useEffect } from "react";
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
  const [modalContentIndex, setModalContentIndex] = useState(23);
  const contractAddress = "0xCAE8090822704A19B3FE6ebae40F092b6B9eb624";

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
      contractAddress
    );
    let t = await a.methods.mintStandard().send({ from: account, value: 0 });
    window.open(`https://ropsten.etherscan.io/tx/${t.transactionHash}`);
  }

  async function getPinkEditionNFT() {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      contractAddress
    );
    let t = await a.methods
      .mintPinkEdition()
      .send({ from: account, value: 1000000000000000000 });
    alert(t);
  }

  async function getFoundersNFT() {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      contractAddress
    );
    let t = await a.methods
      .mintFoundersEdition()
      .send({ from: account, value: 5000000000000000000 });
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

  async function handleTransfer(wallet: string, tokenId: number) {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      contractAddress
    );
    let t = await a.methods
      .safeTransferFrom(account, wallet, tokenId)
      .send({ from: account, value: 0 });
    console.log(t);
  }

  async function getOwner(tokenId: number) {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      contractAddress
    );
    let t = await a.methods.ownerOf(tokenId).call();
    console.log(t);
  }

  async function getMyNFTees() {
    let a = new web3.eth.Contract(
      NFTEEContract.abi as AbiItem[],
      contractAddress
    );
    let t = await a.methods
      .balanceOf(account)
      .send({ from: account, value: 0 });
    console.log(t);
  }

  function modalContent() {
    switch (modalContentIndex) {
      case 0:
        return <Transfer handleTransfer={handleTransfer} />;
      case 1:
        return <Owner getOwner={getOwner} />;
      case 2:
        return <MyNFTees getMyNFTees={getMyNFTees} />;
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
