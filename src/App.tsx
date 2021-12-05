import { useState, useEffect } from "react";
import Web3 from "web3";
declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  let web3: Web3 = new Web3();
  const [balance, setBalance] = useState(0);

  const ethEnabled = async () => {
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
  };

  // useEffect(() => {
  //   (async () => {
  //     if (!ethEnabled()) {
  //       alert("Please install MetaMask to use this dApp!");
  //     }

  //     const acc = await web3.eth.getAccounts();
  //     const balance = await web3.eth.getBalance(acc[0]);
  //     setBalance(parseInt(balance));
  //   })();
  // }, []);

  return (
    <div className="App">
      <h1>NFTee's</h1>
      {/* <h3>{`You account balance is : ${balance / 1000000000000000000} Eth`}</h3> */}
    </div>
  );
}

export default App;
