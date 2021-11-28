import Web3 from "web3";
declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  let web3: Web3 = new Web3();

  const ethEnabled = async () => {
    if (typeof window.ethereum !== "undefined") {
      // Instance web3 with the provided information from the MetaMask provider information
      web3 = new Web3(window.ethereum);
      try {
        // Request account access
        await window.ethereum.enable();

        return true;
      } catch (e) {
        // User denied access
        return false;
      }
    }

    return false;
  };
  const load = async () => {
    if (await !ethEnabled()) {
      alert("Please install MetaMask to use this dApp!");
    }

    const acc = await web3.eth.getAccounts();
    const t = await web3.eth.sendTransaction({
      from: acc[0],
      to: "0x6264F80B3D37Ad12b29Fe7CB372BC3b57C2D6900",
      value: 1,
    });
    console.log(t);
  };
  load();

  return <div className="App">NFTee's</div>;
}

export default App;
