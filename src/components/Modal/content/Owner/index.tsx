import { useState } from "react";

import styles from "./styles.module.css";

interface TransferProps {
  contractInteraction: any;
  handleClose: () => void;
}

const Transfer = ({ contractInteraction, handleClose }: TransferProps) => {
  const [tokenId, setTokenId] = useState(-1);
  const [owner, setOwner] = useState("");

  async function getOwner(tokenId: number) {
    try {
      let response = await contractInteraction.methods.ownerOf(tokenId).call();
      setOwner(response);
    } catch (err: any) {
      alert(err.message);
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
      <h1 className={styles.title}>Get NFTee Owner</h1>
      {owner.length > 0 ? (
        <h2 className={styles.ownerWallet}>
          {`NFTee ID ${tokenId} belongs to the wallet: `}
          <span
            onClick={() =>
              window.open(
                `https://ropsten.etherscan.io/address/${owner}`,
                "_blank"
              )
            }
          >
            {owner}
          </span>
        </h2>
      ) : (
        <>
          <label htmlFor="tokenId" className={styles.label}>
            Token ID:
          </label>
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
        </>
      )}
    </div>
  );
};

export default Transfer;
