import { useState } from "react";

import styles from "./styles.module.css";

interface TransferProps {
  getOwner: (tokenId: number) => void;
  handleClose: () => void;
}

const Transfer = ({ getOwner, handleClose }: TransferProps) => {
  const [tokenId, setTokenId] = useState(-1);

  function hasContent(variable: number) {
    return variable >= 0;
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
      <h1 className={styles.title}>Get NFTee Owner</h1>
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
      <button onClick={() => getOwner(tokenId)} className={styles.btn}>
        Get Owner
      </button>
    </div>
  );
};

export default Transfer;
