import { useState } from "react";

import styles from "./styles.module.css";

interface TransferProps {
  handleTransfer: (wallet: string, tokenId: number) => void;
}

const Transfer = ({ handleTransfer }: TransferProps) => {
  const [wallet, setWallet] = useState("");
  const [tokenId, setTokenId] = useState(0);

  return (
    <div className={styles.container}>
      <h1>Transfer ownership</h1>
      <label htmlFor="tokenId">Type the NFTEE ID to be transfered</label>
      <input
        name="tokenId"
        type="text"
        placeholder="23"
        onChange={(e) => setTokenId(parseInt(e.target.value))}
      />
      <label htmlFor="wallet">Paste the wallet to transfer the NFTEE</label>
      <input
        name="wallet"
        type="text"
        placeholder="0x44AfB6114a02D987c252868405fB61488318d282"
        onChange={(e) => setWallet(e.target.value)}
      />
      <button onClick={() => handleTransfer(wallet, tokenId)}>Transfer</button>
    </div>
  );
};

export default Transfer;
