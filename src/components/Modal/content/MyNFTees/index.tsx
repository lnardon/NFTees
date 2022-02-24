import { useState } from "react";

import styles from "./styles.module.css";

interface TransferProps {
  getMyNFTees: () => void;
}

const MyNFTees = ({ getMyNFTees }: TransferProps) => {
  const [wallet, setWallet] = useState("");
  const [tokenId, setTokenId] = useState(0);

  return (
    <div className={styles.container}>
      <h1>My NFTees</h1>
      <label htmlFor="tokenId">Type the NFTee ID:</label>
      <input
        name="tokenId"
        type="text"
        placeholder="23"
        onChange={(e) => setTokenId(parseInt(e.target.value))}
      />
      <button onClick={() => getMyNFTees()}>My NFTees</button>
    </div>
  );
};

export default MyNFTees;
