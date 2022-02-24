import { useState } from "react";

import styles from "./styles.module.css";

interface TransferProps {
  getOwner: (tokenId: number) => void;
}

const Owner = ({ getOwner }: TransferProps) => {
  const [wallet, setWallet] = useState("");
  const [tokenId, setTokenId] = useState(0);

  return (
    <div className={styles.container}>
      <h1>Get NFTee Owner</h1>
      <label htmlFor="tokenId">Type the NFTee ID:</label>
      <input
        name="tokenId"
        type="text"
        placeholder="23"
        onChange={(e) => setTokenId(parseInt(e.target.value))}
      />
      <button onClick={() => getOwner(tokenId)}>Get Owner</button>
    </div>
  );
};

export default Owner;
