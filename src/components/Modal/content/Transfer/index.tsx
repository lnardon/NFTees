import { useState } from "react";

import styles from "./styles.module.css";

interface TransferProps {
  handleTransfer: (wallet: string, tokenId: number) => void;
  handleClose: () => void;
}

const Transfer = ({ handleTransfer, handleClose }: TransferProps) => {
  const [wallet, setWallet] = useState("");
  const [tokenId, setTokenId] = useState(0);

  function hasContent(variable: string | number) {
    if (typeof variable === "number") {
      return variable > 0;
    } else {
      return variable.length > 0;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.closeDiv}>
        <img
          onClick={handleClose}
          src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
          alt="Close Icon"
          className={styles.closeBtn}
        />
      </div>
      <h1 className={styles.title}>Transfer ownership</h1>
      {
        <label
          htmlFor="tokenId"
          className={hasContent(tokenId) ? styles.label : styles.hiddenLabel}
        >
          Token ID:
        </label>
      }
      <input
        name="tokenId"
        type="number"
        placeholder="NFTee ID"
        onChange={(e) => setTokenId(parseInt(e.target.value))}
        className={styles.input}
      />
      {
        <label
          htmlFor="wallet"
          className={hasContent(wallet) ? styles.label : styles.hiddenLabel}
        >
          Receiving address:
        </label>
      }
      <input
        name="wallet"
        type="text"
        placeholder="Receiving address"
        onChange={(e) => setWallet(e.target.value)}
        className={styles.input}
      />
      <button
        onClick={() => handleTransfer(wallet, tokenId)}
        className={styles.btn}
      >
        Transfer
      </button>
    </div>
  );
};

export default Transfer;
